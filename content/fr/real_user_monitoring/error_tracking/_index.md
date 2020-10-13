---
title: Suivi des erreurs RUM
kind: documentation
beta: true
further_reading:
  - link: /real_user_monitoring/error_tracking/explorer
    tag: Documentation
    text: Explorateur de suivi des erreurs RUM
  - link: /real_user_monitoring/guide/upload-javascript-source-maps
    tag: Guide
    text: Importer des source maps JavaScript
  - link: 'https://app.datadoghq.com/error-tracking'
    tag: IU
    text: Suivi des erreurs
---
{{< img src="real_user_monitoring/error_tracking/page.png" alt="Page de suivi des erreurs"  >}}

## En quoi consiste le suivi des erreurs ?

Datadog recueille un grand nombre d'erreurs, et la surveillance de ces erreurs est essentielle pour assurer le bon fonctionnement de votre système. Pourtant, ces événements d'erreur sont parfois si nombreux qu'il peut s'avérer difficile d'identifier ceux qui méritent votre attention et qui doivent être corrigés en priorité.

Le suivi des erreurs permet de simplifier la surveillance grâce aux techniques suivantes :

- __Regroupement des erreurs similaires dans des problèmes__ pour réduire le bruit et aider à identifier celles qui sont les plus importantes.
- __Suivi des problèmes au fil du temps__ pour savoir à quel moment ils ont commencé, s'ils sont toujours en cours et la fréquence à laquelle ils se produisent.
- __Regroupement de l'ensemble du contexte nécessaire au même endroit__ pour faciliter le dépannage du problème.

## Prise en main

Le suivi des erreurs traite les erreurs recueillies à partir du navigateur par le SDK RUM (erreurs avec [origine dans la source][1]).

Pour démarrer rapidement le suivi des erreurs, procédez comme suit :

1. Téléchargez la version `v1.11.5+` du [SDK RUM Browser][2].
2. Configurez les paramètres __version__, __env__ et __service__ lors de l'[initialisation de votre SDK][3].

### Importer des fichiers de mappage

Le code source de certaines applications est parfois obfusqué ou minifié lors d'un déploiement en production, pour des raisons d'optimisation des performances et de sécurité.
Par conséquent, les traces de pile d'erreurs générées par ces applications sont elles aussi obfusquées. Le processus de dépannage devient alors plus difficile, car les traces de pile ne peuvent pas être utilisées pour déterminer le fichier et la ligne du code à l'origine d'une erreur donnée. 

Datadog vous permet d'importer vos source maps en toute sécurité afin de retirer l'obfuscation de vos traces de pile :

#### Source maps JavaScript

Les source maps sont des fichiers de mappage générés lors de la minification de code source Javascript. L'[interface de ligne de commande Datadog][4] peut être utilisée pour importer ces fichiers de mappage à partir du répertoire de votre build : elle analyse le répertoire du build et ses sous-répertoires pour importer automatiquement les source maps avec leurs fichiers minifiés associés. Importez vos source maps directement à partir de votre pipeline d'intégration continue :

{{< site-region region="eu" >}}

1. Ajoutez `@datadog/datadog-ci` à votre fichier `package.json` (assurez-vous d'utiliser la dernière version).
2. [Créez une nouvelle clé d'API Datadog dédiée][1] et exportez-la en tant que variable d'environnement appelée  `DATADOG_API_KEY`.
3. Configurez l'interface de ligne de commande de façon à importer les fichiers sur le site européen en exportant deux variables d'environnement supplémentaires : `export DATADOG_SITE="datadoghq.eu"` et `export DATADOG_API_HOST="api.datadoghq.eu"`.
4. Exécutez la commande suivante :
```bash
datadog-ci sourcemaps upload /path/to/dist \
    --service=my-service \
    --release-version=v35.2395005 \
    --minified-path-prefix=https://hostname.com/static/js
```

[1]: https://app.datadoghq.com/account/settings#api
{{< /site-region >}}

{{< site-region region="us" >}}

1. Ajoutez `@datadog/datadog-ci` à votre fichier `package.json` (assurez-vous d'utiliser la dernière version).
2. [Créez une nouvelle clé d'API Datadog dédiée][1] et exportez-la en tant que variable d'environnement appelée  `DATADOG_API_KEY`.
3. Exécutez la commande suivante :
```bash
datadog-ci sourcemaps upload /path/to/dist \
    --service=my-service \
    --release-version=v35.2395005 \
    --minified-path-prefix=https://hostname.com/static/js
```

[1]: https://app.datadoghq.com/account/settings#api
{{< /site-region >}}

Pour en savoir plus sur les paramètres de l'interface de ligne de commande, consultez le [référentiel Github officiel][5].

<div class="alert alert-warning">Vous devez configurer votre bundler Javascript de façon à ce que les <strong>source maps créées incluent directement le code source associé</strong>. Assurez-vous que l'attribut <code>sourcesContent</code> dans vos source maps n'est pas vide avant de les importer.</div>

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/data_collected/error#error-origins
[2]: https://www.npmjs.com/package/@datadog/browser-rum
[3]: /fr/real_user_monitoring/installation/?tab=us#initialization-parameters
[4]: https://github.com/DataDog/datadog-ci/
[5]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps