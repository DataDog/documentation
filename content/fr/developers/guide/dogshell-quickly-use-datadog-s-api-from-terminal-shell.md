---
aliases:
- /fr/developers/faq/dogshell-quickly-use-datadog-s-api-from-terminal-shell
description: Utiliser l'API de Datadog à partir du terminal ou du shell
kind: guide
title: Dogshell
---

Vous pouvez utiliser l'API Datadog directement à partir du terminal/shell en utilisant un wrapper appelé `dogshell`.

## Configuration :

Dogshell est inclus dans la [bibliothèque Python datadogpy][1], qui est fréquemment utilisée pour envoyer des données à Datadog avec [DogStatsD][2]. Consultez le [référentiel GitHub datadogpy][3] pour obtenir les instructions d'installation.

Une fois la bibliothèque installée, la commande `dog` est disponible dans votre terminal/shell. Mais cette commande doit encore être « initialisée » : vous devez spécifier une clé d'API et une clé d'application afin qu'elle puisse être utilisée pour envoyer et recevoir des données vers et à partir de votre compte. Lorsque vous essayez d'exécuter une commande `dog` pour la première fois, celle-ci reconnaît qu'elle a besoin d'être initialisée et vous guide à travers ce processus en deux étapes.

Voici un exemple de commande `dog` permettant de déclencher l'initialisation de la configuration (bien que n'importe quelle ancienne commande dog puisse être utilisée) :

```text
dog metric post test_metric 1
```

Si votre fichier `.dogrc` n'a pas encore été créé (c'est-à-dire, le dogshell n'a pas encore été initialisé), voici ce qui s'affiche :

```text
~/.dogrc does not exist. Would you like to create it? [Y/n]
```

Choisissez « Y ». La réponse suivante s'affiche :

```text
What is your api key? (Get it here: https://app.datadoghq.com/organization-settings/api-keys)
```

Collez votre clé d'API pour accéder à l'étape suivante :

```text
What is your application key? (Generate one here: https://app.datadoghq.com/organization-settings/api-keys)
```

Collez alors votre clé d'application. Vous obtenez enfin ceci :

```text
Wrote ~/.dogrc.
```

Utilisez ensuite vos commandes `dog` pour utiliser rapidement l'API Datadog à partir de votre terminal/shell. Si vous avez besoin d'aide ou d'informations supplémentaires sur les commandes `dog`, exécutez `dog -h`.

Si vous préférez écrire vous-même le fichier `.dogrc`, le contenu du fichier doit ressembler à ceci :

{{< site-region region="us" >}}
```text
[Connection]
apikey = <DATADOG_API_KEY>
appkey = <YOUR_APPLICATION_KEY>
api_host = https://datadoghq.com
```
{{< /site-region >}}
{{< site-region region="us3" >}}
```text
apikey = <DATADOG_API_KEY>
appkey = <YOUR_APPLICATION_KEY>
api_host = https://us3.datadoghq.com
```
{{< /site-region >}}
{{< site-region region="us5" >}}
```text
apikey = <DATADOG_API_KEY>
appkey = <YOUR_APPLICATION_KEY>
api_host = https://us5.datadoghq.com
{{< /site-region >}}
{{< site-region region="eu" >}}
```text
apikey = <DATADOG_API_KEY>
appkey = <YOUR_APPLICATION_KEY>
api_host = https://datadoghq.eu
```
{{< /site-region >}}
{{< site-region region="gov" >}}
```text
apikey = <DATADOG_API_KEY>
appkey = <YOUR_APPLICATION_KEY>
api_host = https://ddog-gov.com
```
{{< /site-region >}}
{{< site-region region="ap1" >}}
```text
apikey = <DATADOG_API_KEY>
appkey = <YOUR_APPLICATION_KEY>
api_host = https://ap1.datadoghq.com
```
{{< /site-region >}}

Cette méthode vous permet d'appliquer le fichier à plusieurs serveurs par programmation pour que vous puissiez exécuter les commandes `dog` depuis n'importe lequel de vos serveurs.

## Commandes Dogshell

Vous pouvez [consulter le code de Dogshell][4] à des fins de référence. Toutefois, une fois Dogshell installé et initialisé, il vous suffit d'ajouter l'option `-h` aux commandes suivantes pour en savoir plus sur les utilisations spécifiques de Dogshell :

* `dog metric`
* `dog event`
* `dog status_check`
* `dog monitor`
* `dog downtime`
* `dog timeboard`
* `dog screenboard`
* `dog dashboard`
* `dog host`
* `dog tag`
* `dog search`
* `dog comment`

**Remarque** : La commande `dogshell` envoie des données au site US1 de Datadog par défaut. Si vous souhaitez envoyer des données vers un autre site, vous devez utiliser le fichier `--api_host` option or by specificying an api_host in your `.dogrc`.

### Utilisation de Dogshell

Vous pouvez envoyer des métriques vers votre compte Datadog en utilisant ceci :

```text
dog metric post <NOM_MÉTRIQUE> <VALEUR_MÉTRIQUE> --tags "<CLÉ_TAG_1>:<VALEUR_TAG_1>,<CLÉ_TAG_2>:<VALEUR_TAG_2>"
```

Par exemple, la commande suivante envoie une métrique appelée `test_dogshell_metric` vers votre compte avec une valeur de 1.0 ainsi que les tags `test:one` et `another_test` :

```text
dog metric post test_dogshell_metric 1.0 --tags "test:one,another_test"
```

Pour en savoir plus sur l'envoi de métriques à partir de Dogshell, exécutez ceci :

```text
dog metric post -h
```

{{< img src="developers/faq/dogshell_test.png" alt="dogshell_test" >}}

[1]: https://github.com/DataDog/datadogpy
[2]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/
[3]: https://github.com/DataDog/datadogpy#installation
[4]: https://github.com/DataDog/datadogpy/tree/master/datadog/dogshell