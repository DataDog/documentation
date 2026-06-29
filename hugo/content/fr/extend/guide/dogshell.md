---
aliases:
- /fr/developers/faq/dogshell-quickly-use-datadog-s-api-from-terminal-shell
- /fr/developers/guide/dogshell-quickly-use-datadog-s-api-from-terminal-shell
- /fr/developers/guide/dogshell/
description: Utiliser l'API de Datadog à partir du terminal ou du shell
title: Dogshell
---
<div class="alert alert-danger">Dogshell est obsolète et a été remplacé par <a href="/cli/">Pup CLI</a>, une CLI complète, prête à être déployée avec un agent AI pour interagir avec les APIs de Datadog.</div>

Vous pouvez utiliser l'API Datadog en ligne de commande à l'aide d'un wrapper appelé Dogshell.

## Installez Dogshell {#install-dogshell}

Dogshell est livré avec la [`datadogpy` bibliothèque Python][1] officiellement supportée, qui est souvent utilisée pour envoyer des données à Datadog avec [`DogStatsD`][2]. Pour installer la bibliothèque avec PIP, exécutez la commande suivante :

{{< code-block lang="shell" >}}
pip install datadog
{{< /code-block >}}

Selon votre environnement, vous devrez peut-être ajouter la bibliothèque à votre PATH. Consultez le [`datadogpy` dépôt GitHub][3] pour des instructions d'installation alternatives.

## Configurez Dogshell {#configure-dogshell}

Dogshell utilise un fichier de configuration appelé `.dogrc` pour stocker votre clé API, votre clé d'application et le site Datadog.

Pour configurer Dogshell :
1. Créez un fichier `.dogrc` dans votre répertoire personnel :
   {{< code-block lang="shell" >}}
touch ~/.dogrc
{{< /code-block >}}

1. Ajoutez le contenu suivant au fichier, en remplaçant `MY_API_KEY` et `MY_APP_KEY` par votre clé API et votre clé d'application respectivement :
   ```conf
   [Connection]
   apikey = MY_API_KEY
   appkey = MY_APP_KEY
   api_host = {{< region-param key="dd_api">}}
   ```

   <div class="alert alert-info">You can create multiple configuration files if you need to run commands against different environments. Use the <code>--config</code> flag to specify the path to an alternative configuration file.</div>

1. Test the `dogshell` command by posting a test metric:
   {{< code-block lang="shell" >}}
dog metric post test_metric 1
{{< /code-block >}}

## Dogshell commands 

Use the `-h` flag for a full list of the available Dogshell commands:

{{< code-block lang="shell" >}}
dog -h
{{< /code-block >}}

You can append the `-h` option to the following commands to get more information on specific Dogshell usage:

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

For additional information, see the [Dogshell code][4].

### Dogshell example 

The following syntax posts a metric to your Datadog account:

{{< code-block lang="shell" disable_copy="true">}}
dog metric post MY_METRIC_NAME METRIC_VALUE --tags "TAG_KEY_1:TAG_VALUE_1,TAG_KEY_2:TAG_VALUE_2"
{{< /code-block >}}

For example, the following command sends a metric named `test_dogshell_metric` to your account with a value of `1.0` and the tags `test:one` and `example:one`:

{{< code-block lang="shell" >}}
dog metric post test_dogshell_metric 1.0 --tags "test:one,example:one"
{{< /code-block >}}

After you run the command, search for `test_dogshell_metric` using the [Metrics Explorer][5].

{{< img src="extend/guide/dogshell_test1.png" alt="Observation de la métrique test_dogshell_metric depuis l'explorateur de métriques." >}}

[1]: https://github.com/DataDog/datadogpy
[2]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/
[3]: https://github.com/DataDog/datadogpy#installation
[4]: https://github.com/DataDog/datadogpy/tree/master/datadog/dogshell
[5]: https://app.datadoghq.com/metric/explorer