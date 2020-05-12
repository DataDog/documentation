---
title: Collecte de logs de l'Agent
kind: documentation
description: Utilisez l'Agent Datadog pour recueillir vos logs et envoyez-les à Datadog
further_reading:
  - link: 'agent/logs/advanced_log_collection/#filtrer-les-logs'
    tag: Documentation
    text: Filtrer les logs envoyés à Datadog
  - link: 'agent/logs/advanced_log_collection/#nettoyer-les-donnees-sensibles-de-vos-logs'
    tag: Documentation
    text: Nettoyer les données sensibles de vos logs
  - link: 'agent/logs/advanced_log_collection/#agregation-multiligne'
    tag: Documentation
    text: Agrégation de logs multiligne
  - link: 'agent/logs/advanced_log_collection/#suivre-des-repertoires-a-l-aide-de-wildcards'
    tag: Documentation
    text: Suivre des répertoires à l'aide de wildcards
  - link: 'agent/logs/advanced_log_collection/#regles-globales-de-traitement'
    tag: Documentation
    text: Règles globales de traitement
---
La collecte de logs nécessite la version 6.0+ de l'Agent. Les anciennes versions de l'Agent n'incluent pas l'interface `log collection`. Si vous n'utilisez pas encore l'Agent, suivez les [instructions d'installation de l'Agent][1].

## Activer la collecte de logs

La collecte de logs est **désactivée** par défaut dans l'Agent Datadog.

{{< tabs >}}
{{% tab "HTTP avec compression" %}}

Datadog vous conseille d'envoyer les logs compressés via HTTPS avec l'Agent Datadog v6.14+. Activez la collecte de logs dans le [fichier de configuration principal][1] de l'Agent (`datadog.yaml`) :

```yaml
logs_enabled: true
logs_config:
  use_http: true
  use_compression: true
```

Pour envoyer des logs avec des variables d'environnement, configurez les éléments suivants :

* `DD_LOGS_ENABLED`
* `DD_LOGS_CONFIG_USE_HTTP`
* `DD_LOGS_CONFIG_USE_COMPRESSION`

Pour en savoir plus sur les performances de compression et les tailles de lot, consultez la [section HTTPS][2].


[1]: /fr/agent/guide/agent-configuration-files
[2]: /fr/agent/logs/#send-logs-over-https
{{% /tab %}}
{{% tab "HTTP sans compression" %}}

Pour envoyer des logs via HTTPS avec l'Agent Datadog v6.14+, activez la collecte de logs dans le [fichier de configuration principal][1] de l'Agent (`datadog.yaml`) :

```yaml
logs_enabled: true
logs_config:
  use_http: true
```

Utilisez `DD_LOGS_CONFIG_USE_HTTP` pour configurer cela via une variable d'environnement.

Pour en savoir plus sur les performances de compression et les tailles de lot, consultez la [section HTTPS][2].

[1]: /fr/agent/guide/agent-configuration-files
[2]: /fr/agent/logs/#send-logs-over-https
{{% /tab %}}
{{% tab "TCP" %}}

L'envoi de logs via TCP est le comportement par défaut de l'Agent Datadog. Activez la collecte de logs dans le [fichier de configuration principal][1] de l'Agent (`datadog.yaml`) :

```yaml
logs_enabled: true
```

Par défaut, l'Agent Datadog envoie ses logs à Datadog via le protocole TCP chiffré par TLS. Cela nécessite une communication sortante sur le port `10516`.

[1]: /fr/agent/guide/agent-configuration-files
{{% /tab %}}
{{< /tabs >}}

Une fois la collecte de logs activée, l'Agent est prêt à envoyer ses logs à Datadog. Configurez ensuite l'Agent afin de définir les sources de collecte des logs.

## Activer la collecte de logs à partir d'intégrations

Pour recueillir les logs d'une intégration donnée, supprimez la mise en commentaire de la section logs du fichier `conf.yaml` de cette intégration et configurez-la pour votre environnement.

<div class="alert alert-warning">
Consultez la <a href="/integrations/#collecte-de-log-cat">liste des intégrations prises en charge</a> qui intègrent une configuration de log par défaut.
</div>

Si vous utilisez Kubernetes, assurez-vous d'[activer la collecte de logs dans votre configuration DaemonSet][2]. Si vous utilisez Docker, [activez la collecte de logs pour l'Agent conteneurisé][3]. Pour en savoir plus sur la collecte de logs à partir d'environnements conteneurisés, consultez la section [Collecte de logs depuis un conteneur][4]. Si une intégration ne prend pas en charge les logs par défaut, utilisez la collecte de logs personnalisée.

## Collecte de logs personnalisée

L'Agent Datadog v6 peut recueillir des logs et les transférer à Datadog à partir de fichiers, du réseau (TCP ou UDP), de journald et des canaux Windows :

1. Créez un dossier `<SOURCE_LOGS_PERSONNALISÉE>.d/` dans le répertoire `conf.d/` à la racine du [répertoire de configuration de votre Agent][5].
2. Créez un fichier `conf.yaml` dans ce nouveau dossier.
3. Ajoutez un groupe de configuration de collecte de logs personnalisée avec les paramètres ci-dessous.
4. [Redémarrez votre Agent][6] pour appliquer cette nouvelle configuration.
5. Lancez la [sous-commande status de l'Agent][7] et cherchez `<SOURCE_LOGS_PERSONNALISÉE>` dans la section Checks.

Voici des exemples de configurations de collecte de logs personnalisée ci-dessous :

{{< tabs >}}
{{% tab "Suivre des fichiers" %}}

Pour recueillir les logs de votre application `<NOM_APP>` stockés dans `<CHEMIN_FICHIER_LOG>/<NOM_FICHIER_LOG>.log`, créez un fichier `<NOM_APP>.d/conf.yaml` à la racine du [répertoire de configuration de votre Agent][1] avec le contenu suivant :

```yaml
logs:
  - type: file
    path: "<CHEMIN_FICHIER_LOG>/<NOM_FICHIER_LOG>.log"
    service: "<NOM_APP>"
    source: "<SOURCE>"
```

**Remarque** : si vous lisez les logs d'un fichier avec l'Agent v6 sous **Windows**, vérifiez que ces fichiers sont encodés au format UTF8.

[1]: /fr/agent/guide/agent-configuration-files
{{% /tab %}}

{{% tab "TCP/UDP" %}}

Pour recueillir les logs de votre application `<NOM_APP>` qui transfert ses logs via TCP sur le port **10518**, créez un fichier `<NOM_APP>.d/conf.yaml` à la racine du [répertoire de configuration de votre Agent][1] avec le contenu suivant :

```yaml
logs:
  - type: tcp
    port: 10518
    service: "<NOM_APP>"
    source: "<SOURCE_PERSONNALISÉE>"
```

Si vous utilisez Serilog, vous disposez de l'option `Serilog.Sinks.Network` pour une connexion via UDP.

**Remarque** : l'Agent prend en charge les logs aux formats brut, JSON et Syslog. Si vous envoyez des logs en lot, séparez vos logs par des caractères de saut de ligne.

[1]: /fr/agent/guide/agent-configuration-files
{{% /tab %}}
{{% tab "journald" %}}

Pour recueillir les logs depuis journald, créez un fichier `journald.d/conf.yaml` à la racine du [répertoire de configuration de votre Agent][1] avec le contenu suivant :

```yaml
logs:
  - type: journald
    path: /var/log/journal/
```

Consultez la documentation relative à l'[intégration journald][2] pour en savoir plus sur la configuration des environnements conteneurisés et du filtrage des unités.

[1]: /fr/agent/guide/agent-configuration-files
[2]: /fr/integrations/journald
{{% /tab %}}
{{% tab "Événements Windows" %}}

Pour envoyer des événements Windows à Datadog en tant que logs, ajoutez des canaux au fichier `conf.d/win32_event_log.d/conf.yaml` manuellement ou via Datadog Agent Manager.

Pour consulter la liste de vos canaux, exécutez la commande suivante dans PowerShell :

```text
Get-WinEvent -ListLog *
```

Pour connaître les canaux les plus actifs, exécutez la commande suivante dans PowerShell :

```text
Get-WinEvent -ListLog * | sort RecordCount -Descending
```

Ajoutez ensuite les canaux dans votre fichier de configuration `win32_event_log.d/conf.yaml` :

```yaml
logs:
  - type: windows_event
    channel_path: "<CANAL_1>"
    source: "<CANAL_1>"
    service: "<SERVICE>"
    sourcecategory: windowsevent

  - type: windows_event
    channel_path: "<CANAL_2>"
    source: "<CANAL_2>"
    service: "<SERVICE>"
    sourcecategory: windowsevent
```

Remplacez les paramètres `<CANAL_X>` par le nom du canal Windows pour lequel vous souhaitez recueillir des événements.
Définissez le même nom de canal pour le paramètre `source` correspondant afin de bénéficier de la [configuration de pipeline de traitement d'intégration automatique][1].

Pour terminer, [redémarrez l'Agent][2].

[1]: /fr/logs/processing/pipelines/#integration-pipelines
[2]: /fr/agent/basic_agent_usage/windows
{{% /tab %}}
{{< /tabs >}}

Liste complète des paramètres disponibles pour la collecte de logs :

| Paramètre        | Obligatoire | Description                                                                                                                                                                                                                                                                                                                                             |
|------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`           | Oui      | Le type de source d'entrée de log. Valeurs autorisées : `tcp`, `udp`, `file`, `windows_event`, `docker` ou `journald`.                                                                                                                                                                                                                                         |
| `port`           | Oui      | Si `type` est défini sur **tcp** ou **udp**, configurez le port sur lequel l'écoute des logs est effectuée.                                                                                                                                                                                                                                                                                    |
| `path`           | Oui      | Si `type` est défini sur **file** ou **journald**, configurez le chemin du fichier à partir duquel les logs sont recueillis.                                                                                                                                                                                                                                                                            |
| `channel_path`   | Oui      | Si `type` est défini sur **windows_event**, énumérez les canaux d'événements Windows à partir desquels les logs doivent être recueillis.                                                                                                                                                                                                                                                                    |
| `service`        | Oui      | Le nom du service propriétaire du log. Si vous avez instrumenté votre service avec l'[APM Datadog][8], ce paramètre doit correspondre au même nom de service.                                                                                                                                                                                                                     |
| `source`         | Oui      | Un attribut qui définit l'intégration qui envoie les logs. Si les logs ne proviennent pas d'une intégration existante, vous pouvez spécifier le nom d'une source personnalisée. Toutefois, nous vous conseillons d'utiliser la valeur de l'espace de nommage des [métriques custom][9] recueillies, par exemple : `myapp` pour `myapp.request.count`. |
| `include_units`  | Non       | Si `type` est défini sur **journald**, il s'agit de la liste des unités journald spécifiques à inclure.                                                                                                                                                                                                                                                                              |
| `exclude_units`  | Non       | Si `type` est défini sur **journald**, il s'agit de la liste des unités journald spécifiques à exclure.                                                                                                                                                                                                                                                                              |
| `sourcecategory` | Non       | Un attribut à valeur multiple utilisé pour préciser l'attribut source, par exemple : `source:mongodb, sourcecategory:db_slow_logs`.                                                                                                                                                                                                                             |
| `tags`           | Non       | La liste des tags à ajouter à chaque log recueilli ([en savoir plus sur le tagging][10]).                                                                                                                                                                                                                                                                             |

## Envoyer des logs via HTTPS

**Nous vous conseillons de compresser les logs transférés via HTTPS**, car une réponse 200 est uniquement renvoyée si les logs ont été écrits dans le stockage de Datadog :

{{< img src="agent/HTTPS_intake_reliability_schema.png" alt="Schéma du processus d'admission HTTPS"  style="width:80%;">}}


```yaml
logs_enabled: true
logs_config:
  use_http: true
  use_compression: true
  compression_level: 6
```

L'Agent envoie les lots HTTPS en appliquant les limites suivantes :

* Taille maximale du contenu par charge utile : 1 Mo
* Taille maximale d'un log : 256 Ko
* Taille maximale d'un tableau en cas d'envoi de plusieurs logs dans un tableau : 200 entrées de log

### Compression des logs

Le paramètre `compression_level` (ou `DD_LOGS_CONFIG_COMPRESSION_LEVEL`) accepte les valeurs comprises entre `0` (aucune compression) et `9` (compression maximale, impliquant une plus forte utilisation des ressources). La valeur par défaut est `6`.

Consultez la [section sur la charge système de l'Agent Datadog][10] pour en savoir plus sur les ressources utilisées par l'Agent lorsque la compression est activée.

### Configurer le temps d'attente d'un lot

L'Agent patiente jusqu'à 5 secondes afin de satisfaire l'une de ces limites (la taille du contenu ou le nombre de logs). Par conséquent, dans le pire des cas (lorsque le nombre de logs générés est très faible), le passage au HTTPS entraîne une latence accrue de 5 secondes par rapport au TCP, qui envoie l'ensemble des logs en temps réel.

Pour modifier le délai maximal que l'Agent Datadog applique avant le remplissage de chaque lot, ajoutez la ligne suivante dans le [fichier de configuration principal][3] de l'Agent (`datadog.yaml`) :

```yaml
logs_config:
  batch_wait: 2
```

Vous pouvez également utiliser la variable d'environnement `DD_LOGS_CONFIG_BATCH_WAIT`.
La valeur doit être un nombre entier compris entre `1` et `10` correspondant au nombre de secondes.

### Configuration d'un proxy HTTPS

Lorsque les logs sont envoyés via HTTPS et doivent transiter par un proxy web, utilisez les mêmes [paramètres de proxy][11] que ceux utilisés pour l'envoi d'autres types de données.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /fr/agent/kubernetes/log
[3]: /fr/agent/docker/log
[4]: /fr/logs/log_collection/#container-log-collection
[5]: /fr/agent/guide/agent-configuration-files
[6]: /fr/agent/guide/agent-commands/#agent-status-and-information
[7]: /fr/tracing
[8]: /fr/developers/metrics/custom_metrics
[9]: /fr/tagging
[10]: /fr/agent/basic_agent_usage/#agent-overhead
[11]: /fr/agent/proxy