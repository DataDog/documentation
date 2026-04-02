---
aliases:
- /fr/developers/faq/dogshell-quickly-use-datadog-s-api-from-terminal-shell
- /fr/developers/guide/dogshell-quickly-use-datadog-s-api-from-terminal-shell
description: Utiliser l'API de Datadog à partir du terminal ou du shell
title: Dogshell
---

Vous pouvez utiliser l'API Datadog en ligne de commande à l'aide d'un wrapper appelé Dogshell.

## Installer Dogshell

Dogshell est fourni avec la [bibliothèque Python `datadogpy`][1] officiellement prise en charge, souvent utilisée pour envoyer des données à Datadog avec [`DogStatsD`][2]. Pour installer la bibliothèque avec PIP, exécutez la commande suivante :

{{< code-block lang="shell" >}}
pip install datadog
{{< /code-block >}}

Selon votre environnement, vous devrez peut-être ajouter la bibliothèque à votre PATH. Consultez le [référentiel GitHub `datadogpy`][3] pour d'autres instructions d'installation.

## Configurer Dogshell

Dogshell utilise un fichier de configuration appelé `.dogrc` pour stocker votre clé d'API, votre clé d'application et votre site Datadog.

Pour configurer Dogshell :
1. Créer un fichier `.dogrc` dans votre répertoire personnel :
   {{< code-block lang="shell" >}}
touch ~/.dogrc
{{< /code-block >}}

1. Ajouter le contenu suivant dans le fichier, en remplaçant `MY_API_KEY` et `MY_APP_KEY` par votre clé d'API et votre clé d'application respectivement :
   ```conf
   [Connection]
   apikey = MY_API_KEY
   appkey = MY_APP_KEY
   api_host = {{< region-param key="dd_api">}}
   ```

   <div class="alert alert-info">Vous pouvez créer plusieurs fichiers de configuration si vous devez exécuter des commandes dans différents environnements. Utilisez le flag <code>--config</code> pour spécifier le chemin d'accès à un autre fichier de configuration.</div>

1. Tester la commande `dogshell` en publiant une métrique de test :
   {{< code-block lang="shell" >}}
dog metric post test_metric 1
{{< /code-block >}}

## Commandes Dogshell

Utiliser le flag `-h` pour obtenir la liste complète des commandes Dogshell disponibles :

{{< code-block lang="shell" >}}
dog -h
{{< /code-block >}}

Vous pouvez ajouter l'option `-h` aux commandes suivantes pour obtenir plus d'informations sur l'utilisation spécifique de Dogshell :

* `dog metric`
* `dog event`
* `dog service_check`
* `dog monitor`
* `dog downtime`
* `dog timeboard`
* `dog screenboard`
* `dog dashboard`
* `dog host`
* `dog tag`
* `dog search`
* `dog comment`

Pour en savoir plus, consultez le [code Dogshell][4].

### Exemple Dogshell

La syntaxe suivante publie une métrique sur votre compte Datadog :

{{< code-block lang="shell" disable_copy="true">}}
dog metric post MY_METRIC_NAME METRIC_VALUE --tags "TAG_KEY_1:TAG_VALUE_1,TAG_KEY_2:TAG_VALUE_2"
{{< /code-block >}}

Par exemple, la commande suivante envoie une métrique nommée `test_dogshell_metric` sur votre compte avec une valeur de `1.0` et les tags `test:one` et `example:one` :

{{< code-block lang="shell" >}}
dog metric post test_dogshell_metric 1.0 --tags "test:one,example:one"
{{< /code-block >}}

Une fois la commande exécutée, recherchez `test_dogshell_metric` dans le [Metrics Explorer][5].

{{< img src="developers/guide/dogshell_test1.png" alt="Observation de test_dogshell_metric depuis le Metrics Explorer" >}}

[1]: https://github.com/DataDog/datadogpy
[2]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/
[3]: https://github.com/DataDog/datadogpy#installation
[4]: https://github.com/DataDog/datadogpy/tree/master/datadog/dogshell
[5]: https://app.datadoghq.com/metric/explorer