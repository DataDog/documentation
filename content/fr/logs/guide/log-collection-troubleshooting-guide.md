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
Plusieurs problèmes courants peuvent survenir lors de [l'envoi de nouveaux logs à Datadog][1] via le collecteur de logs dans `dd-agent`. Si vous rencontrez des problèmes lors de l'envoi de nouveaux logs à Datadog, cette liste vous permettra de les dépanner. Si vous ne parvenez pas à résoudre votre problème, [contactez-nous][2] pour obtenir de l'aide.

## L'Agent doit être redémarré

Les modifications de la configuration de l'Agent `datadog-agent` prennent uniquement effet une fois l'Agent Datadog redémarré.

## Le trafic sortant du port 10516 est bloqué

L'Agent Datadog envoie ses logs à Datadog par tcp via le port 10516. Si cette connexion n'est pas disponible, les logs ne sont pas envoyés et une erreur est enregistrée dans le fichier `agent.log`.

Testez manuellement votre connexion en exécutant une commande telnet ou openssl comme suit (le port 10514 fonctionne également, mais cette méthode est moins sécurisée) :

* `openssl s_client -connect intake.logs.datadoghq.com:10516`
* `telnet intake.logs.datadoghq.com 10514`

Envoyez ensuite un log comme suit :

```
<CLÉ_API> Ceci est un message test
```

- Si vous ne pouvez pas ouvrir le port 10514 ou 10516, vous pouvez demander à l'Agent Datadog d'utiliser le port `443` pour transférer les logs (disponible uniquement avec l'Agent Datadog) en ajoutant ce qui suit à `datadog.yaml`:

```
logs_config:
  use_port_443: true
```

## Aucun nouveau log écrit

L'Agent Datadog recueille uniquement les logs qui ont été écrits une fois qu'il a commencé à les recueillir (en les suivant ou en les écoutant). Afin de vous assurer que la collecte de logs est bien configurée, vérifiez que de nouveaux logs ont été écrits.

## Problèmes d'autorisation lors du suivi de fichiers de log

`datadog-agent` n'est pas exécuté en mode root (et nous vous déconseillons de le faire, de façon générale). C'est pourquoi lorsque vous configurez votre `datadog-agent` afin de suivre des fichiers de log (pour les logs personnalisés ou pour les intégrations), vous devez vous assurer que l'utilisateur `datadog-agent` bénéficie d'un accès en lecture aux fichiers de log dont vous souhaitez recueillir les données.

Sans accès en lecture, vous verrez un message de ce type dans le `status` de l'Agent :

{{< img src="logs/agent-log-executable-permission-issue.png" alt="Problème d'autorisation" responsive="true" style="width:70%;">}}

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
Ajoutez les autorisations manquantes via la [commande chmod][3].

{{< img src="logs/agent-log-permission-ok.png" alt="Autorisation OK" responsive="true" style="width:70%;">}}

**Remarque** : lorsque vous ajoutez les autorisations de lecture appropriées, assurez-vous que ces autorisations sont correctement configurées dans votre configuration de rotation de log. Dans le cas contraire, à la prochaine rotation de log, l'Agent Datadog peut perdre ses autorisations de lecture.
Définissez les autorisations sur `644` dans la configuration de la rotation de log pour vous assurer que l'Agent dispose d'un accès en lecture aux fichiers.

## Problème d'autorisation et Journald

Lorsque vous recueillez des logs à partir de journald, assurez-vous que l'utilisateur de l'Agent Datadog est ajouté au groupe systemd en suivant les instructions de l'[intégration journald][4].

Notez que journald envoie une charge utile vide si les autorisations du fichier sont incorrectes. Il n'est donc pas possible de générer ou d'envoyer un message d'erreur explicite dans ce cas.

## Problèmes de configuration

Nous vous conseillons de vérifier plusieurs fois les problèmes de configuration les plus courants dans l'implémentation de votre `datadog-agent` :

1. Lancez la commande de statut de l'Agent pour détecter les problèmes de configuration majeurs : `datadog-agent status`.

2. Vérifiez si la clé d'API `api_key` est définie dans `datadog.yaml`.

3. Par défaut, l'Agent ne recueille aucun log. Vérifiez qu'au moins un fichier .yaml du répertoire `conf.d/` de l'Agent inclut une section logs et les valeurs adéquates.

4. Des erreurs se produisent peut-être durant le parsing de vos fichiers de configuration .yaml. Le format YAML étant relativement rigide, utilisez un bon [validateur YAML][5] en cas de doute.

5. Vérifiez que votre `datadog.yaml` contient la ligne `logs_enabled: true`

### Rechercher des erreurs dans les logs de l'Agent

Les logs peuvent contenir une erreur, ce qui expliquerait le problème. Pour rechercher des erreurs, exécutez simplement la commande suivante :

```
sudo cat /var/log/datadog/agent.log | grep ERROR
```

## Environnement Docker

### La collecte de logs n'est pas activée

1. Assurez-vous que l'Agent Datadog a accès au socket Docker
2. Vérifiez que l'utilisateur de l'Agent est dans le groupe Docker : `usermod -a -G docker dd-agent`.
3. Vérifiez que la collecte de logs a été activée `DD_LOGS_ENABLED=true`

### Problèmes de configuration

Au moins une configuration de log valide doit être définie pour commencer la collecte de logs. Il existe plusieurs façon de configurer la collecte de logs. Assurez-vous qu'au moins l'une d'entre elles est activée :

1. `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true`, qui recueille les logs à partir de tous les conteneurs (découvrez [comment exclure un sous-ensemble ici][6])

2. Autodiscovery via les [étiquettes de conteneur][7]. Dans ce cas, assurez-vous que `datadog.yaml` dispose d'un écouteur Docker et d'un fournisseur de configuration :

```
listeners:
  - name: docker
config_providers:
  - name: docker
    polling: true
```

3. Autodiscovery dans Kubernetes via les [annotations de pods][8]. Dans ce cas, assurez-vous que `datadog.yaml` dispose d'un écouteur kubelet et d'un fournisseur de configuration :

```
listeners:
  - name: kubelet
config_providers:
  - name: kubelet
    polling: true
```

### Journald

Lorsque vous utilisez Journald dans un environnement conteneurisé, suivez les instructions de l'[intégration journald][4] : un fichier spécifique est utilisé pour le montage sur l'Agent.

## Environnement sans serveur

### Les logs des fonctions lambda ne sont pas visibles sur la page Log Explorer

Consultez l'[intégration Datadog/AWS][9] pour configurer votre environnement. Si vous ne voyez toujours pas vos logs, vérifiez à nouveau les points suivants :

#### Configuration de la fonction lambda

Vérifiez le paramètre de configuration lambda de Datadog :

* `<CLÉ_API>` : doit être remplacé par votre [clé d'API Datadog][10], soit directement dans le code Python, soit via une variable d'environnement. Si vous gérez plusieurs plateformes, vérifiez à nouveau que vous utilisez la bonne clé d'API `<API_KEY>` pour chaque plateforme.


#### La fonction lambda est déclenchée

Vérifiez que la fonction lambda de Datadog est bien déclenchée en utilisant les métriques `aws.lambda.invocations` et `aws.lambda.errors` avec le tag `functionname` de votre fonction lambda dans Datadog. Vous pouvez également vérifier la présence d'erreurs dans les logs lambda de Datadog dans Cloudwatch.

## Filtrage attendu des logs

Vérifiez que les logs apparaissent bien sur la page [Live Tail de Datadog][11]. Si c'est le cas, recherchez sur la page de configuration des index tout [filtre d'exclusion][12] qui pourrait entraîner le filtrage de vos logs.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/logs
[2]: /fr/help
[3]: https://en.wikipedia.org/wiki/Chmod
[4]: https://docs.datadoghq.com/fr/integrations/journald/#pagetitle
[5]: https://codebeautify.org/yaml-validator
[6]: /fr/agent/docker/log/?tab=containerinstallation#filter-containers
[7]: /fr/agent/autodiscovery/integrations/?tab=dockerlabel#configuration
[8]: /fr/agent/autodiscovery/integrations/?tab=kubernetespodannotations#configuration
[9]: /fr/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[10]: https://app.datadoghq.com/account/settings#api
[11]: https://app.datadoghq.com/logs/livetail
[12]: /fr/logs/indexes/#exclusion-filters