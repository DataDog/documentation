---
description: Enquêtez sur les données de log non lues signalées après la rotation
  des fichiers et identifiez la contre-pression dans le pipeline des logs du Datadog
  Agent.
further_reading:
- link: /agent/logs/log_transport/
  tag: Documentation
  text: Transport de l'Agent pour les logs
- link: /agent/logs/advanced_log_collection/
  tag: Documentation
  text: Collecte de logs avancée
- link: /logs/guide/mechanisms-ensure-logs-not-lost/
  tag: Guide
  text: Mécanismes permettant d'éviter toute perte de log
- link: /agent/troubleshooting/send_a_flare/
  tag: Documentation
  text: Envoyer un flare de l'Agent
title: Résolvez les octets de log manquants
---
## Présentation {#overview}

Le Datadog Agent collecte les logs d'application et les envoie à Datadog. Pour les applications qui écrivent des logs dans des fichiers, l'Agent lit ces fichiers au fur et à mesure que de nouvelles entrées sont ajoutées. Les applications effectuent souvent une rotation de leurs fichiers logs, remplaçant le fichier actif par un nouveau lorsqu'il atteint une limite de taille ou d'âge.

Si l'Agent arrête de lire un fichier ayant subi une rotation avant d'atteindre la fin, les données restantes ne sont pas envoyées à Datadog. L'Agent signale cela comme **octets de log manquants**. Vous pouvez remarquer des lacunes dans le [Log Explorer][11] ou voir un avertissement dans [le fichier log de l'Agent][10] :

```text
WARN | After rotation close timeout (60s), there were 148213 bytes remaining unread for file "/var/log/app/app.log". These unread logs are now lost. Consider increasing DD_LOGS_CONFIG_CLOSE_TIMEOUT
```

L'Agent continue de lire un fichier ayant subi une rotation pendant `logs_config.close_timeout` (60 secondes par défaut) après avoir détecté la rotation. Si des données non lues subsistent à l'expiration de ce délai, l'Agent ferme le fichier et écrit l'avertissement ci-dessus.

## Causes possibles {#possible-causes}

La contre-pression se produit lorsqu'une phase du pipeline de logs de l'Agent ne peut pas suivre le rythme, ralentissant les étapes précédentes et la lecture des fichiers. Une rotation fréquente ou un volume de logs élevé peut également empêcher l'Agent de terminer dans le délai imparti.

- L'Agent ne peut pas transmettre les charges utiles à l'ingestion Datadog en raison d'erreurs de réseau, de proxy, d'authentification ou d'ingestion.
- La latence du réseau ou de l'ingestion ralentit la soumission réussie des logs.
- Le codage, le traitement par lots ou la compression limitent un pipeline de logs.
- Les règles de traitement ou le traitement multiligne limitent un pipeline de logs.
- Le débit de logs dépasse la capacité CPU ou réseau disponible pour l'Agent.
- Le fichier concerné effectue une rotation avant que l'Agent ne puisse lire les données écrites pendant l'intervalle de rotation, même lorsque le pipeline en aval n'est pas saturé.

## Diagnostiquer les octets de log manquants {#diagnose-missing-log-bytes}

1. Recherchez l'avertissement de rotation dans le [fichier log de l'Agent][10]. Enregistrez les chemins d'accès aux fichiers concernés, les horodatages et le nombre d'octets non lus.
2. Si vous utilisez l'Agent 7.82.0 ou une version ultérieure, exécutez la [commande status][1] et lisez la section [Interpret Logs Agent Backpressure](#interpret-logs-agent-backpressure). Comparez l'historique conservé avec les horodatages des avertissements.
3. Si plusieurs lignes du tableau **Logs Agent Backpressure** sont saturées, examinez-les dans cet ordre : `destination_reliable_N`, `worker`, `strategy` et `processor`. Utilisez la section [Choose a tuning action](#choose-a-tuning-action) pour sélectionner l'étape suivante pour le premier composant saturé de cette liste.
4. Appliquez un changement pertinent, puis suivez la section [Vérifiez le résultat](#verify-the-result) sous un volume de logs représentatif avant de traiter un autre composant.
5. Si l'Agent reste incapable de traiter le volume requis, suivez la section [Reduce log volume](#reduce-log-volume).

### Interpret Logs Agent Backpressure {#interpret-logs-agent-backpressure}

Les versions 7.82.0 et ultérieures de l'Agent incluent une section **Logs Agent Backpressure** dans la [commande status][1]. La section indique l'utilisation récente du processeur, de la stratégie de traitement par lots, des processus d'envoi et des destinations. Elle conserve l'utilisation maximale pendant environ 10 heures et la durée détaillée de saturation pendant 30 minutes.

{{< code-block lang="shell" >}}sudo datadog-agent status{{< /code-block >}}

Vous pouvez également trouver cette section dans `status.log` à l'intérieur [d'un flare d'Agent][2]. Comme l'historique est réinitialisé au redémarrage de l'Agent, générez un flare avant de redémarrer.

```text
Logs Agent Backpressure
=======================

  Overall state: SATURATED
  Reason: destination_reliable_0 pipeline q0s0 is currently saturated (saturated for 3m20s in the last 30m)

  Component              Instance Current   5m avg/max    30m avg/max    2h max    5h max    10h max    30m saturated    Last saturated
  processor              0        20%       18/26%        15/41%         55%       55%       55%        0s               -
  strategy               0        14%       12/19%        13/22%         22%       22%       22%        0s               -
  worker                 q0s0     46%       43/63%        27/63%         63%       63%       63%        0s               -
  destination_reliable_0 q0s0     93%       82/93%        71/93%         93%       93%       93%        3m20s            12:09:42
```

Comme `destination_reliable_0` est saturé, suivez la section [Résolvez les erreurs de livraison](#resolve-delivery-errors) avant de modifier les paramètres du processeur ou du traitement par lots.

#### État global {#overall-state}

| État | Signification |
| --- | --- |
| `HEALTHY` | Aucun composant n'est saturé et aucun ne l'a été au cours des 30 dernières minutes. |
| `WARNING` | Aucun composant n'est saturé, mais au moins un l'a été au cours des 30 dernières minutes. Comparez `Last saturated` avec les horodatages des avertissements concernant les octets manquants. |
| `SATURATED` | Au moins un composant a atteint le seuil de saturation dans la fenêtre actuelle de 15 secondes. |

La saturation signifie qu'un composant a passé au moins 90 % de son temps d'échantillonnage à travailler au lieu d'attendre. Utilisez l'avertissement de rotation pour confirmer la perte et le tableau pour identifier une contrainte possible.

#### Colonnes du tableau {#table-columns}

| Colonne | Signification |
| --- | --- |
| `Component` | La phase du pipeline de logs. Consultez la section [Choose a tuning action](#choose-a-tuning-action). |
| `Instance` | Le pipeline ou l'instance de destination. |
| `Current` | Utilisation lissée sur environ 15 secondes. |
| `5m avg/max` et `30m avg/max` | Utilisation moyenne et maximale pendant la fenêtre indiquée. |
| `2h max`, `5h max` et `10h max` | Utilisation maximale pendant la fenêtre indiquée. |
| `30m saturated` | Temps passé à une utilisation égale ou supérieure à 90 % au cours des 30 dernières minutes. |
| `Last saturated` | Heure du dernier échantillon de saturation conservé. Un `-` signifie qu'aucun échantillon conservé n'est disponible. |

## Donnez à l'Agent plus de temps pour lire les fichiers ayant subi une rotation {#give-the-agent-more-time-to-read-rotated-files}

Augmentez `logs_config.close_timeout` lorsque l'Agent a besoin de plus que les 60 secondes par défaut pour terminer la lecture d'un fichier ayant subi une rotation. Pour utiliser un délai d'attente de 180 secondes :

{{< tabs >}}
{{% tab "Fichier de configuration" %}}

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  close_timeout: 180
{{< /code-block >}}

{{% /tab %}}
{{% tab "Variable d'environnement" %}}

```shell
DD_LOGS_CONFIG_CLOSE_TIMEOUT=180
```

{{% /tab %}}
{{< /tabs >}}

Après avoir modifié le délai d'attente, recherchez dans le [fichier log de l'Agent][10] de nouveaux avertissements de rotation pendant un volume de logs représentatif. Si les avertissements persistent, augmentez à nouveau le délai d'attente ou utilisez la section [Choisir une action de réglage](#choose-a-tuning-action) pour sélectionner une action pour le composant saturé. Des délais d'attente plus longs maintiennent les fichiers ayant subi une rotation ouverts et peuvent augmenter l'utilisation des descripteurs de fichiers et du disque.

Si l'Agent n'effectue pas le suivi de tous les fichiers correspondants, vérifiez `logs_config.open_files_limit` à la place. Pour plus de détails sur la configuration, consultez [Augmenter le nombre de fichiers logs suivis par l'Agent][3].

## Optimiser l'Agent {#tune-the-agent}

### Choisir une action d'optimisation {#choose-a-tuning-action}

| Composant | Interprétation | Commencer par cette section |
| --- | --- | --- |
| `destination_reliable_N` | Les soumissions de logs sont retardées ou réessayées. | [Résolvez les erreurs de livraison](#resolve-delivery-errors) |
| `worker` | Des charges utiles sont en attente d'envoi. | [Résolvez les erreurs de livraison](#resolve-delivery-errors) |
| `strategy` | Le travail d'encodage, de traitement par lots ou de compression est à pleine capacité. | [Désactivez la compression](#disable-compression) ou [augmentez le parallélisme du pipeline](#increase-pipeline-parallelism) |
| `processor` | Le traitement des logs est à pleine capacité. | [Réduisez le traitement des logs](#reduce-log-processing) ou [augmentez le parallélisme du pipeline](#increase-pipeline-parallelism) |

### Résolvez les erreurs de livraison {#resolve-delivery-errors}

Si `destination_reliable_N` est saturé, ouvrez le [fichier log de l'Agent][10] et inspectez les entrées près de l'horodatage de l'avertissement d'octets manquants pour les soumissions ayant échoué ou ayant été réessayées. Résolvez les erreurs d'authentification, de rejet, de proxy, DNS et de connexion. Vérifiez la [configuration du proxy][5], [l'accès réseau aux endpoints Datadog][6] et le [site Datadog][4].

### Désactiver la compression {#disable-compression}

Pour la livraison HTTPS, la compression est activée par défaut. Si `strategy` est saturé et que l'utilisation du processeur de l'Agent est élevée, envisagez de désactiver la compression. Cela réduit le travail de compression, mais augmente la taille de la charge utile et le nombre d'octets envoyés vers l'ingestion des logs :

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  use_compression: false
{{< /code-block >}}

Après la modification, exécutez la [commande status][1] et confirmez que `strategy` passe moins de temps en état saturé. Réactivez la compression si l'utilisation du réseau atteint sa capacité ou si le [fichier log de l'Agent][10] affiche de nouvelles erreurs de livraison.

### Augmentez le parallélisme du pipeline {#increase-pipeline-parallelism}

Par défaut, l'Agent exécute un pipeline de logs par processeur logique disponible, jusqu'à quatre pipelines.

Si `processor` ou `strategy` est saturé et que le processeur du host est en dessous de sa capacité, augmentez `logs_config.pipelines`. Par exemple, sur un host avec huit processeurs logiques disponibles pour l'Agent :

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  pipelines: 8
{{< /code-block >}}

Des pipelines supplémentaires sont utiles lorsque l'Agent collecte à partir de sources de logs multiples. Une source unique reste sur un pipeline. Davantage de pipelines peuvent augmenter l'utilisation du processeur, de la mémoire et la concurrence totale d'envoi HTTP de l'Agent. Après la modification, exécutez la [commande status][1] et confirmez que le composant ciblé passe moins de temps en état saturé.

### Réduire le traitement des logs {#reduce-log-processing}

Si `processor` est saturé, passez en revue les [règles de traitement][7] configurées. Les règles globales s'appliquent à chaque log collecté par l'Agent. Lorsqu'une règle s'applique à une seule source, déplacez-la vers la configuration d'intégration de cette source :

{{< code-block lang="yaml" filename="conf.d/myapp.d/conf.yaml" >}}
logs:
  - type: file
    path: /var/log/app/app.log
    service: myapp
    source: myapp
    log_processing_rules:
      - type: exclude_at_match
        name: exclude_debug
        pattern: \[DEBUG\]
{{< /code-block >}}

Supprimez les règles en double de la configuration globale `logs_config.processing_rules` et de la configuration au niveau de la source `log_processing_rules`. À partir de l'Agent 7.82.0, la [détection multi-ligne automatique][8] est activée par défaut. Si le composant `processor` est saturé et que vos logs ne nécessitent pas d'agrégation multi-ligne, envisagez de la désactiver :

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  auto_multi_line_detection: false
{{< /code-block >}}

Si une source a un format multi-ligne connu, [configurez une règle de traitement `multi_line` au niveau de la source][12] au lieu d'utiliser la détection automatique. Après la modification, exécutez la [commande status][1] pour comparer la saturation du processeur et vérifiez dans [Log Explorer][11] que les lignes associées restent correctement regroupées.

## Réduire le volume de logs {#reduce-log-volume}

Si l'Agent ne peut pas traiter le volume requis avec la capacité du host et du réseau disponible, filtrez les logs dont vous n'avez pas besoin. Une règle de traitement `exclude_at_match` supprime les logs correspondants avant qu'ils ne quittent le host :

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  processing_rules:
    - type: exclude_at_match
      name: exclude_health_checks
      pattern: GET /health
{{< /code-block >}}

Utilisez plutôt une entrée `log_processing_rules` au niveau de la source lorsque le filtre ne s'applique qu'à une seule source de logs.

## Vérifiez le résultat {#verify-the-result}

Testez chaque modification avec un volume de logs représentatif :

1. Exécutez la commande status :
   {{< code-block lang="shell" >}}sudo datadog-agent status{{< /code-block >}}
2. Confirmez que le composant ciblé passe moins de temps à un taux d'utilisation supérieur ou égal à 90 %. L'état global reste `WARNING` pendant une durée maximale de 30 minutes après la disparition de la saturation.
3. Recherchez dans le [log file de l'Agent][10] les nouveaux avertissements `remaining unread`.

Si une modification ne réduit pas la saturation ou la fréquence des nouveaux avertissements de rotation, annulez-la. Sélectionnez ensuite l'action suivante dans la section [Choisir une action de réglage](#choose-a-tuning-action). Si la saturation se déplace vers un autre composant, utilisez l'action indiquée pour ce composant.

## Contactez le support Datadog {#contact-datadog-support}

Si les étapes décrites sur cette page ne résolvent pas le problème, [contactez le support Datadog][9]. Envoyez [un flare][2] pendant que le pipeline est saturé et avant de redémarrer l'Agent.


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/configuration/agent-commands/#agent-status-and-information
[2]: /fr/agent/troubleshooting/send_a_flare/
[3]: /fr/logs/guide/increase-number-of-log-files-tailed/
[4]: /fr/getting_started/site/
[5]: /fr/agent/configuration/proxy/
[6]: /fr/agent/configuration/network/
[7]: /fr/agent/logs/advanced_log_collection/
[8]: /fr/agent/logs/auto_multiline_detection/
[9]: /fr/help/
[10]: /fr/agent/configuration/agent-log-files/
[11]: /fr/logs/explorer/
[12]: /fr/agent/logs/advanced_log_collection/#manually-aggregate-multi-line-logs