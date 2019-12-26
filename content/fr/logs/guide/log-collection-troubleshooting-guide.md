---
title: Dépannage pour la collecte de logs
kind: guide
aliases:
  - /fr/logs/faq/log-collection-troubleshooting-guide
further_reading:
  - link: /logs/log_collection
    tag: Documentation
    text: Apprendre à recueillir vos logs
  - link: /logs/explorer
    tag: Documentation
    text: Apprendre à explorer vos logs
  - link: /logs/faq/why-do-my-logs-not-have-the-expected-timestamp/
    tag: FAQ
    text: "Pourquoi mes logs n'ont-ils pas le timestamp attendu\_?"
  - link: /logs/faq/why-do-my-logs-show-up-with-an-info-status-even-for-warnings-or-errors/
    tag: FAQ
    text: "Pourquoi mes logs s'affichent avec un statut Info même lorsqu'il s'agit d'un avertissement ou d'une erreur\_?"
---
Plusieurs problèmes courants peuvent survenir lors de [l'envoi de nouveaux logs à Datadog][1] via le collecteur de logs dans `dd-agent`. Si vous rencontrez des problèmes lors de l'envoi de nouveaux logs à Datadog, la liste suivante peut vous aider à les corriger. Si vous ne parvenez pas à résoudre votre problème, [contactez l'assistance Datadog][2] pour obtenir de l'aide.

## L'Agent doit être redémarré

Les modifications de la configuration de `datadog-agent` prennent uniquement effet une fois [l'Agent Datadog redémarré][3].

## Le trafic sortant du port 10516 est bloqué

L'Agent Datadog envoie ses logs à Datadog par tcp via le port 10516. Si cette connexion n'est pas disponible, les logs ne sont pas envoyés et une erreur est enregistrée dans le fichier `agent.log`.

Testez manuellement votre connexion en exécutant une commande telnet ou openssl comme suit (le port 10514 fonctionne également, mais cette méthode est moins sécurisée) :

* `openssl s_client -connect intake.logs.datadoghq.com:10516`
* `telnet intake.logs.datadoghq.com 10514`

Envoyez ensuite un log comme suit :

```
<CLÉ_API> Ceci est un message test
```

- Si vous ne pouvez pas ouvrir le port 10514 ou 10516, vous pouvez configurer l'Agent Datadog de façon à envoyer des logs via HTTPS en ajoutant ce qui suit à `datadog.yaml` :

```
logs_config:
  use_http: true
```

Consultez la [section Envoyer des logs via HTTPS][15] pour en savoir plus.

## Vérifier le statut de l'Agent

Il est souvent utile d'exécuter la [commande status de l'Agent][4] pour mieux comprendre votre problème.

## Aucun nouveau log créé

L'Agent Datadog recueille uniquement les logs qui ont été écrits une fois qu'il a commencé à les recueillir (en les suivant ou en les écoutant). Afin de vous assurer que la collecte de logs est bien configurée, vérifiez que de nouveaux logs ont été écrits.

## Problèmes d'autorisation lors du suivi de fichiers de log

`datadog-agent` n'est pas exécuté en mode root (et nous vous déconseillons de le faire, de façon générale). C'est pourquoi lorsque vous configurez votre `datadog-agent` afin de suivre des fichiers de log (pour les logs personnalisés ou pour les intégrations), vous devez vous assurer que l'utilisateur `datadog-agent` bénéficie d'un accès en lecture aux fichiers de log dont vous souhaitez recueillir les données.

Le message d'erreur suivant devrait alors s'afficher lorsque vous consultez le [statut de l'Agent][4] :

```
==========
Logs Agent
==========

  test
  ----
    Type: file
    Path: /var/log/application/error.log
    Status: Error: file /var/log/application/error.log does not exist
```

Lancez la commande `namei` pour obtenir plus d'informations sur les autorisations du fichier :

```
> namei -m /var/log/application/error.log
> f: /var/log/application/error.log
 drwxr-xr-x /
 drwxr-xr-x var
 drwxrwxr-x log
 drw-r--r-- application
 -rw-r----- error.log
```

Dans cet exemple, le dossier `application` n'est pas exécutable, l'Agent ne peut donc pas récupérer la liste de ses fichiers. De plus, l'Agent ne dispose pas des autorisations de lecture pour le fichier `error.log`.
Ajoutez les autorisations manquantes via la [commande chmod][5].

{{< img src="logs/agent-log-permission-ok.png" alt="Autorisation OK" responsive="true" style="width:70%;">}}

**Remarque** : lorsque vous ajoutez les autorisations de lecture appropriées, assurez-vous que ces autorisations sont correctement configurées dans votre configuration de rotation de log. Dans le cas contraire, à la prochaine rotation de log, l'Agent Datadog peut perdre ses autorisations de lecture.
Définissez les autorisations sur `644` dans la configuration de la rotation de log pour vous assurer que l'Agent dispose d'un accès en lecture aux fichiers.

## Problème d'autorisation et Journald

Lorsque vous recueillez des logs à partir de journald, assurez-vous que l'utilisateur de l'Agent Datadog est ajouté au groupe systemd en suivant les instructions de l'[intégration journald][6].

Notez que journald envoie une charge utile vide si les autorisations du fichier sont incorrectes. Il n'est donc pas possible de générer ou d'envoyer un message d'erreur explicite dans ce cas.

## Problèmes de configuration

Nous vous conseillons de vérifier plusieurs fois les problèmes de configuration les plus courants dans l'implémentation de votre `datadog-agent` :

1. Vérifiez si la clé d'API `api_key` est définie dans `datadog.yaml`.

2. Vérifiez que votre `datadog.yaml` contient la ligne `logs_enabled: true`

3. Par défaut, l'Agent ne recueille aucun log. Vérifiez qu'au moins un fichier .yaml du répertoire `conf.d/` de l'Agent inclut une section logs et les valeurs adéquates.

4. Des erreurs peuvent se produire durant le parsing de vos fichiers de configuration .yaml. Le format YAML étant relativement rigide, utilisez un [validateur YAML][7] en cas de doute.

### Rechercher des erreurs dans les logs de l'Agent

Les logs peuvent contenir une erreur capable d'expliquer le problème. Pour rechercher des erreurs, exécutez la commande suivante :

```
sudo cat /var/log/datadog/agent.log | grep ERROR
```

## Environnement Docker

### Collecte de logs désactivée

1. Assurez-vous que l'Agent Datadog a accès au socket Docker.
2. Vérifiez que l'utilisateur de l'Agent est dans le groupe Docker : `usermod -a -G docker dd-agent`.
3. Vérifiez que la collecte de logs a été activée avec `DD_LOGS_ENABLED=true` dans la configuration.

### Problèmes de configuration

Au moins une configuration de log valide doit être définie pour commencer la collecte de logs. Il existe plusieurs façons de configurer la collecte de logs. Assurez-vous qu'au moins l'une d'entre elles est activée :

1. `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true`, qui recueille les logs à partir de tous les conteneurs (découvrez [comment exclure un sous-ensemble ici][8]).

2. Autodiscovery grâce aux [étiquettes de conteneur][9] ; dans ce cas, assurez-vous que `datadog.yaml` dispose d'un écouteur Docker et d'un fournisseur de configuration :

```
listeners:
  - name: docker
config_providers:
  - name: docker
    polling: true
```

3. Autodiscovery dans Kubernetes grâce aux [annotations de pods][10] ; dans ce cas, assurez-vous que `datadog.yaml` dispose d'un écouteur kubelet et d'un fournisseur de configuration :

```
listeners:
  - name: kubelet
config_providers:
  - name: kubelet
    polling: true
```

### Journald

Lorsque vous utilisez Journald dans un environnement conteneurisé, suivez les instructions de l'[intégration journald][6] : un fichier spécifique est utilisé pour le montage sur l'Agent.

## Environnement sans serveur

### Les logs des fonctions lambda ne sont pas visibles sur la page Log Explorer

Consultez l'[intégration Datadog/AWS][11] pour configurer votre environnement. Si vous ne voyez toujours pas vos logs, vérifiez à nouveau les points suivants :

#### Configuration de la fonction lambda

Vérifiez le paramètre de configuration du lambda de Datadog :

* `<API_KEY>` : doit être remplacé par votre [clé d'API Datadog][12], soit directement dans le code Python, soit via une variable d'environnement. Si vous gérez plusieurs plateformes, vérifiez à nouveau que vous utilisez la bonne clé d'API `<API_KEY>` pour chaque plateforme.


#### Fonction lambda déclenchée

Vérifiez que la fonction lambda de Datadog est bien déclenchée en utilisant les métriques `aws.lambda.invocations` et `aws.lambda.errors` avec le tag `functionname` de votre fonction lambda dans Datadog. Vous pouvez également vérifier la présence d'erreurs dans les logs lambda de Datadog dans Cloudwatch.

## Filtrage attendu des logs

Vérifiez que les logs apparaissent bien sur la page [Live Tail de Datadog][13]. Si c'est le cas, recherchez sur la page de configuration des index tout [filtre d'exclusion][14] qui pourrait entraîner le filtrage de vos logs.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/logs
[2]: /fr/help
[3]: /fr/agent/guide/agent-commands/#restart-the-agent
[4]: /fr/agent/guide/agent-commands/#agent-status-and-information
[5]: https://en.wikipedia.org/wiki/Chmod
[6]: https://docs.datadoghq.com/fr/integrations/journald/
[7]: https://codebeautify.org/yaml-validator
[8]: /fr/agent/docker/log/?tab=containerinstallation#filter-containers
[9]: /fr/agent/autodiscovery/integrations/?tab=dockerlabel#configuration
[10]: /fr/agent/autodiscovery/integrations/?tab=kubernetespodannotations#configuration
[11]: /fr/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[12]: https://app.datadoghq.com/account/settings#api
[13]: https://app.datadoghq.com/logs/livetail
[14]: /fr/logs/indexes/#exclusion-filters
[15]: https://docs.datadoghq.com/fr/agent/logs/?tab=tailexistingfiles#send-logs-over-https