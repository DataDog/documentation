---
title: Suivi des erreurs RUM
kind: documentation
beta: true
further_reading:
  - link: /real_user_monitoring/error_tracking/explorer
    tag: Documentation
    text: Explorateur de suivi des erreurs RUM
  - link: 'https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps'
    tag: Documentation
    text: Référentiel officiel de l'interface de ligne de commande Datadog
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
- __Suivi des problèmes au fil du temps__ pour identifier à quel moment ils sont apparus, s'ils surviennent toujours ainsi que la fréquence à laquelle ils se produisent.
- __Regroupement de l'ensemble du contexte nécessaire au même endroit__ pour faciliter le dépannage du problème.

## Prise en main

Le suivi des erreurs traite les erreurs recueillies à partir du navigateur par le SDK RUM. Dès lors qu'une erreur [source][1] ou [personnalisée][2] contenant une stack trace est recueillie, le suivi des erreurs assure son traitement et lui attribue une catégorie de problème afin de la rassembler avec des erreurs similaires.

Pour démarrer rapidement le suivi des erreurs, procédez comme suit :

1. Téléchargez la dernière version du [SDK RUM Browser][3].
2. Configurez les paramètres __version__, __env__ et __service__ lors de l'[initialisation de votre SDK][4].

### Importer des fichiers de mappage

Le code source de certaines applications est parfois obfusqué ou minifié lors d'un déploiement en production, pour des raisons d'optimisation des performances et de sécurité.
Par conséquent, les stack traces d'erreurs générées par ces applications sont elles aussi obfusquées, ce qui complexifie le processus de dépannage.

#### Source maps JavaScript

Les source maps sont des fichiers de mappage générés lors de la minification de code source Javascript. L'[interface de ligne de commande Datadog][5] peut être utilisée pour importer ces fichiers de mappage à partir du répertoire de votre build : elle analyse le répertoire du build et ses sous-répertoires pour importer automatiquement les source maps avec leurs fichiers minifiés associés. Importez vos source maps directement à partir de votre pipeline d'intégration continue :

{{< tabs >}}
{{% tab "Site américain de Datadog" %}}

1. Ajoutez `@datadog/datadog-ci` à votre fichier `package.json` (assurez-vous d'utiliser la dernière version).
2. [Créez une nouvelle clé d'API Datadog dédiée][1] et exportez-la en tant que variable d'environnement `DATADOG_API_KEY`.
3. Exécutez la commande suivante :
```bash
datadog-ci sourcemaps upload /path/to/dist \
    --service=my-service \
    --release-version=v35.2395005 \
    --minified-path-prefix=https://hostname.com/static/js
```


[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Site européen de Datadog" %}}

1. Ajoutez `@datadog/datadog-ci` à votre fichier `package.json` (assurez-vous d'utiliser la dernière version).
2. [Créez une nouvelle clé d'API Datadog dédiée][1] et exportez-la en tant que variable d'environnement `DATADOG_API_KEY`.
3. Configurez l'interface de ligne de commande de façon à importer les fichiers sur le site européen en exportant deux variables d'environnement supplémentaires : `export DATADOG_SITE="datadoghq.eu"` et `export DATADOG_API_HOST="api.datadoghq.eu"`.
4. Exécutez la commande suivante :
```bash
datadog-ci sourcemaps upload /path/to/dist \
    --service=my-service \
    --release-version=v35.2395005 \
    --minified-path-prefix=https://hostname.com/static/js
```


[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{< /tabs >}}

Pour que le suivi des erreurs fonctionne correctement avec vos source maps, vous devez configurer votre bundler Javascript en respectant les consignes suivantes :

-   Les source maps doivent inclure directement le code source associé. Assurez-vous que l'attribut <code>sourceContent</code> n'est pas vide avant de les importer.
-   La taille de chaque source map combinée à la taille du fichier minifié associé ne doit pas dépasser __la limite de 50 Mo__. La taille totale peut être réduite en configurant votre bundler de manière à diviser votre code source en plusieurs blocs de plus petite taille ([découvrez comment y parvenir avec WebpackJS][6]).

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/browser/data_collected/?tab=error#error-origins
[2]: /fr/real_user_monitoring/browser/advanced_configuration#custom-errors
[3]: https://www.npmjs.com/package/@datadog/browser-rum
[4]: /fr/real_user_monitoring/browser/#initialization-parameters
[5]: https://github.com/DataDog/datadog-ci/
[6]: https://webpack.js.org/guides/code-splitting/