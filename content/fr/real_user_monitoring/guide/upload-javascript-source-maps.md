---
title: Importer des source maps Javascript
kind: guide
further_reading:
- link: /real_user_monitoring/error_tracking
  tag: Documentation
  text: Débuter avec le suivi des erreurs
- link: /real_user_monitoring/error_tracking/explorer
  tag: Documentation
  text: Visualiser vos données de suivi des erreurs dans l'Explorateur
---

## Présentation

Si votre code source Javascript frontend est minifié, vous devrez importer vos source maps dans Datadog pour nous permettre de désobfusquer vos différentes stack traces. Pour une erreur donnée, vous aurez alors accès au chemin du fichier, au numéro de ligne, ainsi qu'à un extrait de code pour chaque frame de la stack trace associée.

## Instrumenter votre code
Vous devez configurer votre bundler Javascript de façon à ce qu'il génère des source maps lorsque vous minifiez votre code source. Ces source maps inclueront directement le code source associé dans l'attribut `sourcesContent`. Veillez également à ce que la taille de chaque source map combinée à la taille du fichier minifié associé ne dépasse pas __la limite de 50 Mo__.  Vous trouverez ci-dessous quelques configurations pour les bundlers Javascript les plus utilisés.

{{< tabs >}}
{{% tab "WebpackJS" %}}

Vous pouvez générer des source maps à l'aide du plug-in webpack intégré [SourceMapDevToolPlugin][1]. Découvrez ci-dessous comment le configurer dans votre fichier `webpack.config.js` :

```javascript
// ...
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  devtool: false,
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      noSources: false,
      filename: '[name].[hash].js.map'
    }),
    // ...
  ],
  optimization: {
    minimize: true,
    // ...
  },
  // ...
};
```

**Remarque** : si vous utilisez le langage TypeScript, assurez-vous de définir `compilerOptions.sourceMap` sur `true` lors de la configuration de votre fichier `tsconfig.json`.

[1]: https://webpack.js.org/plugins/source-map-dev-tool-plugin/
{{% /tab %}}
{{% tab "ParcelJS" %}}

Parcel génère des source maps par défaut lorsque vous exécutez la commande build : `parcel build <fichier d'entrée>`

{{% /tab %}}
{{< /tabs >}}

Une fois le build de votre application créé, les bundlers génèrent un répertoire, la plupart du temps nommé `dist`, contenant les fichiers Javascript minifiés avec leurs source maps correspondantes. Vous trouverez un exemple ci-dessous :

```bash
./dist
    javascript.364758.min.js
    javascript.364758.js.map
    ./subdirectory
        javascript.464388.min.js
        javascript.464388.js.map
```

<div class="alert alert-info">Par exemple, si la taille totale des fichiers <code>javascript.364758.min.js</code> et <code>javascript.364758.js.map</code> dépasse <i>la limite de 50 Mo</i>, réduisez-la en configurant votre bundler de façon à diviser le code source en plusieurs blocs de plus petite taille (<a href="https://webpack.js.org/guides/code-splitting/">découvrez comment y parvenir avec WebpackJS</a>).</div>

## Importer vos source maps

Le meilleur moyen d'importer des source maps est d'ajouter une étape supplémentaire dans votre pipeline d'intégration continue et d'exécuter la commande dédiée depuis l'[interface de ligne de commande Datadog][1]. Cette commande analyse le répertoire `dist` et ses sous-répertoires pour importer automatiquement les source maps avec leurs fichiers minifiés associés. Voici la procédure à suivre :

{{< tabs >}}
{{% tab "Site américain de Datadog" %}}

1. Ajoutez `@datadog/datadog-ci` à votre fichier `package.json` (assurez-vous d'utiliser la dernière version).
2. [Créez une nouvelle clé d'API Datadog dédiée][1] et exportez-la en tant que variable d'environnement appelée `DATADOG_API_KEY`.
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
2. [Créez une nouvelle clé d'API Datadog dédiée][1] et exportez-la en tant que variable d'environnement appelée `DATADOG_API_KEY`.
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

**Remarque** : l'interface de ligne de commande a été optimisée pour permettre l'importation d'autant de source maps que nécessaire en très peu de temps (généralement en quelques secondes) afin de minimiser l'impact sur les performances de votre intégration continue.

Lorsque cette commande est exécutée sur le répertoire `dist` obtenu dans notre exemple (voir la section précédente), Datadog s'attend à ce que votre serveur ou votre CDN envoie les fichiers JavaScript vers les URL `https://hostname.com/static/js/javascript.364758.min.js` et `https://hostname.com/static/js/subdirectory/javascript.464388.min.js`. Lorsqu'une erreur se produit dans une session d'un de vos utilisateurs, le SDK RUM la collecte instantanément. Lorsque l'erreur provient d'un fichier téléchargé à partir d'une de ces URL et qu'elle se voit également assigner les tags `version:v35.2395005` et `service:my-service`, la source map correspondante est utilisée pour désobfusquer la stack trace (ici, le fichier `javascript.464388.js.map`).

**Remarque** : seules les source maps avec l'extension `.js.map` peuvent déminifier des stack traces dans l'interface de suivi des erreurs. Les sources maps ayant une autre extension (comme `.mjs.map`) sont acceptées, mais ne peuvent pas déminifier de stack traces.

<div class="alert alert-info">Un fichier source JavaScript donné peut être envoyé à partir de différents sous-domaines, selon l'environnement (par exemple, staging ou production). Vous pouvez importer une seule fois la source map associée, puis l'utiliser pour plusieurs sous-domaines. Pour ce faire, utilisez le chemin de préfixe absolu à la place de l'URL complète (indiquez <code>/static/js</code> au lieu de <code>https://hostname.com/static/js</code>).</div>

## Dépanner les erreurs plus facilement

Une stack trace minifiée est peu utile, puisque vous n'avez pas accès au chemin du fichier et au numéro de ligne. Il est alors difficile d'identifier l'origine de l'erreur dans votre codebase. De plus, l'extrait de code est toujours minifié (il s'agit d'une longue ligne de code transformé), ce qui rend le processus de dépannage encore plus difficile. Voici un exemple de stack trace minifiée :

{{< img src="real_user_monitoring/error_tracking/minified_stacktrace.png" alt="Stack trace minifiée réduite dans l'explorateur de suivi des erreurs"  >}}

À l'inverse, une stack trace non minifiée vous donne tout le contexte dont vous avez besoin pour dépanner le problème rapidement et facilement :

{{< img src="real_user_monitoring/error_tracking/unminified_stacktrace.gif" alt="Stack trace non minifiée dans l'explorateur de suivi des erreurs"  >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps
