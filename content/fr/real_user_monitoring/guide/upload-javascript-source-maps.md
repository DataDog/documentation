---
further_reading:
- link: /real_user_monitoring/error_tracking
  tag: Documentation
  text: Débuter avec le suivi des erreurs
- link: /real_user_monitoring/error_tracking/explorer
  tag: Documentation
  text: Visualiser vos données de suivi des erreurs dans l'Explorateur
kind: guide
title: Importer des source maps JavaScript
---

## Présentation

Si votre code source JavaScript frontend est minifié, importez vos source maps dans Datadog pour désobfusquer vos différentes stack traces. Pour une erreur donnée, vous avez accès au chemin du fichier, au numéro de ligne ainsi qu'à un extrait de code pour chaque frame de la stack trace associée. Datadog peut également associer des stack frames à votre code source dans votre référentiel. 

<div class="alert alert-info">Seules les erreurs recueillies par la solution <a href="/real_user_monitoring/">Real User Monitoring (RUM)</a> et les logs de <a href="/logs/log_collection/javascript/">la collecte de logs à partir des navigateurs
</a> peuvent être déminifiés.</div>

## Instrumenter votre code

Configurez votre bundler JavaScript de façon à ce qu'il génère des source maps lorsque vous minifiez votre code source. Ces source maps inclueront directement le code source associé dans l'attribut `sourcesContent`. 

<div class="alert alert-warning">
{{< site-region region="us,us3,us5,eu" >}}
Vérifiez que la taille de chaque source map, à laquelle sʼajoute la taille du fichier minifié associé, ne dépasse pas la limite de **300** Mo.
{{< /site-region >}}
{{< site-region region="ap1,gov" >}}
Vérifiez que la taille de chaque source map, à laquelle sʼajoute la taille du fichier minifié associé, ne dépasse pas la limite de **50** Mo.
{{< /site-region >}}
</div>

Consultez les configurations suivantes qui reposent sur des bundlers JavaScript populaires.

{{< tabs >}}
{{% tab "WebpackJS" %}}

Vous pouvez générer des source maps à l'aide du plug-in webpack intégré [SourceMapDevToolPlugin][1].

Consultez l'exemple de configuration ci-dessous dans votre fichier `webpack.config.js` :

```javascript
// ...
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  devtool: false,
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      noSources: false,
      filename: '[file].map'
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

**Remarque** : si vous utilisez le langage TypeScript, définissez `compilerOptions.sourceMap` sur `true` dans votre fichier `tsconfig.json`.

[1]: https://webpack.js.org/plugins/source-map-dev-tool-plugin/
{{% /tab %}}
{{% tab "ParcelJS" %}}

Parcel génère des source maps par défaut lorsque vous exécutez la commande build `parcel build <fichier d'entrée>`

{{% /tab %}}
{{< /tabs >}}

Une fois le build de votre application créé, les bundlers génèrent un répertoire (généralement intitulé `dist`) contenant les fichiers JavaScript minifiés avec leurs source maps correspondantes.

Vous trouverez un exemple ci-dessous :

```bash
./dist
    javascript.364758.min.js
    javascript.364758.js.map
    ./subdirectory
        javascript.464388.min.js
        javascript.464388.js.map
```

<div class="alert alert-warning">
{{< site-region region="us,us3,us5,eu" >}}
Si le total de la taille du fichier correspondant à <code>javascript.364758.min.js</code> et <code>javascript.364758.js.map</code> dépasse <b>la limite de **300** Mo</b>, réduisez-le en configurant votre bundler de façon à scinder le code source en plus petites parties. Pour en savoir plus, consultez <a href="https://webpack.js.org/guides/code-splitting/">Code Splitting with WebpackJS</a>.
{{< /site-region >}}
{{< site-region region="ap1,gov" >}}
Si le total de la taille du fichier correspondant à <code>javascript.364758.min.js</code> et <code>javascript.364758.js.map</code> dépasse <b>la limite de **50** Mo</b>, réduisez-le en configurant votre bundler de façon à scinder le code source en plus petites parties. Pour en savoir plus, consultez <a href="https://webpack.js.org/guides/code-splitting/">Code Splitting with WebpackJS</a>.
{{< /site-region >}}
</div>

## Importer vos source maps

Le meilleur moyen d'importer des source maps est d'ajouter une étape supplémentaire dans votre pipeline de CI et d'exécuter la commande dédiée depuis l'[interface de ligne de commande Datadog][1]. Cette commande analyse le répertoire `dist` et ses sous-répertoires pour importer automatiquement les source maps avec leurs fichiers minifiés associés.

{{< site-region region="us" >}}
1. Ajoutez `@datadog/datadog-ci` à votre fichier `package.json` (assurez-vous d'utiliser la dernière version).
2. [Créez une clé d'API Datadog dédiée][1] et exportez-la en tant que variable d'environnement `DATADOG_API_KEY`.
3. Exécutez la commande suivante une fois par service dans votre application RUM :

   ```bash
   datadog-ci sourcemaps upload /path/to/dist \
     --service=my-service \
     --release-version=v35.2395005 \
     --minified-path-prefix=https://hostname.com/static/js
   ```


[1]: https://app.datadoghq.com/organization-settings/api-keys
{{< /site-region >}}

{{< site-region region="eu,us3,us5,gov,ap1" >}}
1. Ajoutez `@datadog/datadog-ci` à votre fichier `package.json` (assurez-vous d'utiliser la dernière version).
2. [Créez une clé d'API Datadog dédiée][1] et exportez-la en tant que variable d'environnement `DATADOG_API_KEY`.
3. Configurez le CLI de façon à importer des fichiers sur le site {{<region-param key="dd_site_name">}} en exportant deux variables dʼenvironnement : `export DATADOG_SITE=`{{<region-param key="dd_site" code="true">}} et `export DATADOG_API_HOST=api.`{{<region-param key="dd_site" code="true">}}.
4. Exécutez la commande suivante une fois par service dans votre application RUM :
   ```bash
   datadog-ci sourcemaps upload /path/to/dist \
     --service=my-service \
     --release-version=v35.2395005 \
     --minified-path-prefix=https://hostname.com/static/js
   ```


[1]: https://app.datadoghq.com/organization-settings/api-keys
{{< /site-region >}}

Pour minimiser l'impact sur les performances de votre intégration continue, l'interface de ligne de commande est optimisée pour permettre l'importation d'autant de source maps que nécessaires en peu de temps (généralement quelques secondes).

**Remarque** : la réimportation d'une source map ne remplace pas lʼancienne si la version n'a pas changé.

Les paramètres `--service` et `--release-version` doivent correspondre aux tags `service` et `version` de vos événements RUM et logs de browser. Pour en savoir plus sur la configuration de ces tags, consultez la [documentation relative à l'initialisation du SDK Browser RUM][2] ou la [documentation relative à la collecte de logs à partir des navigateurs][3].

<div class="alert alert-info">Si vous avez défini plusieurs services dans votre application RUM, exécutez la commande CI autant de fois qu'il y a de services, même si vous n'avez qu'un seul ensemble de sourcemaps pour l'ensemble de l'application RUM.</div>

Lorsque vous exécutez la commande sur l'exemple de répertoire `dist`, Datadog s'attend à ce que votre serveur ou CDN fournissent les fichiers JavaScript sur `https://hostname.com/static/js/javascript.364758.min.js` et `https://hostname.com/static/js/subdirectory/javascript.464388.min.js`.

Seules les source maps avec l'extension `.js.map` peuvent déminifier des stack traces. Les sources maps ayant une autre extension (comme `.mjs.map`) sont acceptées, mais ne peuvent pas déminifier de stack traces.

<div class="alert alert-info">Si vous distribuez les mêmes fichiers source JavaScript depuis différents sous-domaines, importez la source map associée une seule fois, et utilisez-la pour les différents sous-domaines en spécifiant le chemin du préfixe absolu plutôt que l'URL complète. Par exemple, indiquez <code>/static/js</code> plutôt que <code>https://hostname.com/static/js</code>).</div>

### Associer des stack frames à votre code source

Si vous exécutez la commande `datadog-ci sourcemaps upload` dans un répertoire Git fonctionnel, Datadog recueille des métadonnées sur ce répertoire. La commande `datadog-ci` recueille l'URL du répertoire, le hash du commit actuel ainsi que la liste des chemins de fichier du répertoire qui sont associés à vos source maps. Pour en savoir plus sur la collecte de métadonnées Git, consultez la [documentation datadog-ci][3].

Datadog affiche des liens vers votre code source dans des stack frames non minifiés.

## Dépanner les erreurs plus facilement

Sans chemin de fichier ni numéro de ligne, une stack trace minifiée ne permet pas de résoudre les problèmes concernant votre codebase. De plus, l'extrait de code est également minifié (il s'agit donc d'une longue ligne de code transformé), ce qui complexifie encore plus le processus de dépannage.

L'exemple suivant représente une stack trace minifiée :

{{< img src="real_user_monitoring/error_tracking/minified_stacktrace.png" alt="Stack trace minifiée pour le suivi des erreurs" >}}

À l'inverse, une stack trace non minifiée fournit tout le contexte dont vous avez besoin pour corriger rapidement et aisément votre problème. Pour les stack frames associés à votre code source, Datadog génère également un lien direct vers votre référentiel :

{{< img src="real_user_monitoring/error_tracking/unminified_stacktrace.png" alt="Stack trace non minifiée pour le suivi des erreurs" >}}

## Documentation complète (EN)

Une [documentation complète de la commande sourcemap](https://github.com/DataDog/datadog-ci/tree/457d25821e838db9067dbe376d0f34fb1a197869/src/commands/sourcemaps) en anglais est disponible sur Github.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps
[2]: https://docs.datadoghq.com/fr/real_user_monitoring/browser/#initialization-parameters
[3]: https://docs.datadoghq.com/fr/logs/log_collection/javascript/#initialization-parameters
[4]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps#link-errors-with-your-source-code
