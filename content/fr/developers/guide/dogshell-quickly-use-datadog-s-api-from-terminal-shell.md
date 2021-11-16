---
title: Utilisez rapidement l'API de Datadog à partir du terminal/shell avec Dogshell
kind: guide
aliases:
  - /fr/developers/faq/dogshell-quickly-use-datadog-s-api-from-terminal-shell
---
Vous pouvez utiliser l'API Datadog directement à partir du terminal/shell en utilisant un wrapper appelé `dogshell`.

## Configuration :

Dogshell est inclus dans la [bibliothèque Python datadogpy][1], qui est officiellement prise en charge et fréquemment utilisée pour envoyer des données à Datadog via [DogStatsD][2]. [Elle peut être installée en suivant ces instructions][3].

Une fois la bibliothèque installée, la commande `dog` est disponible dans votre terminal/shell. Mais cette commande doit encore être « initialisée » : vous devez spécifier une clé d'API et une clé d'application afin qu'elle puisse être utilisée pour envoyer/recevoir des données vers et à partir de votre compte. Lorsque vous essayez d'exécuter une commande `dog` pour la première fois, celle-ci reconnaît qu'elle a besoin d'être initialisée et vous guide à travers ce processus en deux étapes.

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
What is your api key? (Get it here: https://app.datadoghq.com/account/settings#api)
```

Collez votre clé d'API pour accéder à l'étape suivante :

```text
What is your application key? (Generate one here: https://app.datadoghq.com/account/settings#api)
```

Collez alors votre clé d'application. Vous obtenez enfin ceci :

```text
Wrote ~/.dogrc.
```

Vous êtes maintenant prêt à utiliser vos commandes `dog` pour tirer rapidement parti de l'API Datadog à partir de votre terminal/shell. Si vous avez besoin d'aide ou d'informations supplémentaires sur les commandes `dog`, exécutez `dog -h`.

Si vous préférez rédiger vous-même votre fichier `.dogrc` (par exemple pour appliquer le fichier à plusieurs de vos serveurs par programmation de façon à pouvoir exécuter les commandes `dog` à partir de n'importe quel serveur), le contenu du fichier doit ressembler à ceci :

```text
[Connection]
apikey = <VOTRE_CLÉ_API>
appkey = <VOTRE_CLÉ_APPLICATION>
```

## Commandes Dogshell

Vous pouvez [consulter le code de Dogshell][4] à des fins de référence. Toutefois, une fois Dogshell installé et initialisé, il vous suffit d'ajouter l'option `-h` aux commandes suivantes pour en savoir plus sur les utilisations spécifiques de Dogshell :

* `dog metric`
* `dog event`
* `dog status_check`
* `dog monitor`
* `dog downtime`
* `dog timeboard`
* `dog screenboard`
* `dog host`
* `dog tag`
* `dog search`
* `dog comment`

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
[2]: /fr/metrics/dogstatsd_metrics_submission/
[3]: https://github.com/DataDog/datadogpy#installation
[4]: https://github.com/DataDog/datadogpy/tree/master/datadog/dogshell