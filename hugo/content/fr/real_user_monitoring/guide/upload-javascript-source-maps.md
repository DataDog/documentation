---
description: Téléchargez les cartes source JavaScript pour améliorer le suivi des
  erreurs avec des traces de pile lisibles et un meilleur débogage pour le code minifié.
further_reading:
- link: /real_user_monitoring/error_tracking
  tag: Documentation
  text: Débuter avec le suivi des erreurs
- link: /real_user_monitoring/error_tracking/explorer
  tag: Documentation
  text: Visualiser vos données de suivi des erreurs dans l'Explorateur
- link: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/sourcemaps
  tag: Code source
  text: Référence de commande des cartes sources
- link: https://learn.datadoghq.com/courses/tracking-errors-rum-javascript
  tag: Centre d'apprentissage
  text: Suivi des erreurs avec RUM pour les applications Web JavaScript
title: Importer des source maps JavaScript
---
## Aperçu {#overview}

Si votre code source JavaScript côté client est minifié, téléchargez vos cartes sources sur Datadog pour déobfusquer vos différentes traces de pile. Pour chaque erreur donnée, vous pouvez accéder au chemin du fichier, au numéro de ligne et à l'extrait de code pour chaque cadre de la trace de pile associée. Datadog peut également lier les cadres de pile à votre code source dans votre dépôt.

<div class="alert alert-info"><ul><li>Seules les erreurs collectées par <a href="/error_tracking/">Suivi des Erreurs</a>, <a href="/real_user_monitoring/">Surveillance des Utilisateurs Réels (RUM)</a>, et les journaux de <a href="/logs/log_collection/javascript/">Collecte des Journaux de Navigateur</a> peuvent être déminifiées.</li><li>Pour automatiser les téléchargements de cartes source dans le cadre de votre processus de construction, consultez <a href="/real_user_monitoring/application_monitoring/browser/build_plugins/source_maps">Plugins de Construction : Cartes Source</a>.</li></ul></div>

## Instrumentez votre code {#instrument-your-code}

Configurez votre JavaScript bundler de manière à ce que lors de la minification de votre code source, il génère des cartes sources qui incluent directement le code source associé dans l'attribut `sourcesContent`.

<div class="alert alert-danger">
Assurez-vous que la taille de chaque carte source augmentée de la taille du fichier minifié associé ne dépasse pas la limite de <b>500 MB</b>.
</div>

Consultez les configurations suivantes qui reposent sur des bundlers JavaScript populaires.

{{< tabs >}}
{{% tab "WebpackJS" %}}

Vous pouvez générer des source maps à l'aide du plug-in webpack intégré [SourceMapDevToolPlugin][1].

Voir la configuration d'exemple dans votre fichier `webpack.config.js` :

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

**Remarque** : Si vous utilisez TypeScript, définissez `compilerOptions.sourceMap` sur `true` dans votre fichier `tsconfig.json`.

[1]: https://webpack.js.org/plugins/source-map-dev-tool-plugin/
{{% /tab %}}
{{% tab "ParcelJS" %}}

Parcel génère des cartes sources par défaut lorsque vous exécutez la commande de construction : `parcel build <entry file>`.

{{% /tab %}}
{{% tab "Vite" %}}

Vous pouvez générer des cartes sources en configurant l'option `build.sourcemap` dans votre fichier `vite.config.js`.

Voir la configuration d'exemple :

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    sourcemap: true, // generates .js.map files
    minify: 'terser', // or 'esbuild'
  }
})
```

**Remarque** : Si vous utilisez TypeScript, assurez-vous que `compilerOptions.sourceMap` est défini sur `true` dans votre fichier `tsconfig.json`.

{{% /tab %}}
{{< /tabs >}}

Après avoir construit votre application, les bundlers génèrent un répertoire (généralement nommé `dist`) avec des fichiers JavaScript minifiés co-localisés avec leurs cartes sources correspondantes.

Vous trouverez un exemple ci-dessous :

```bash
./dist
    javascript.364758.min.js
    javascript.364758.js.map
    ./subdirectory
        javascript.464388.min.js
        javascript.464388.js.map
```

<div class="alert alert-danger">
Si la taille totale des fichiers pour <code>javascript.364758.min.js</code> et <code>javascript.364758.js.map</code> dépasse la limite de <b>500 MB</b>, réduisez-la en configurant votre bundler pour diviser le code source en plusieurs morceaux plus petits. Pour plus d'informations, voir <a href="https://webpack.js.org/guides/code-splitting/">Code Splitting avec WebpackJS</a>.
</div>

## Téléchargez vos cartes sources {#upload-your-source-maps}

La meilleure façon de télécharger des cartes sources est d'ajouter une étape supplémentaire dans votre pipeline CI et d'exécuter la commande dédiée depuis le [Datadog CLI][1]. Il scanne le répertoire `dist` et les sous-répertoires pour télécharger automatiquement les cartes sources avec les fichiers minifiés pertinents.

{{< site-region region="us" >}}
1. Ajoutez `@datadog/datadog-ci` à votre fichier `package.json` (assurez-vous d'utiliser la dernière version).
2. [Créez une clé API Datadog dédiée][1] et exportez-la en tant que variable d'environnement nommée `DATADOG_API_KEY`.
3. Exécutez la commande suivante une fois par service dans votre application :

   ```bash
   datadog-ci sourcemaps upload /path/to/dist \
     --service my-service \
     --release-version v35.2395005 \
     --minified-path-prefix https://hostname.com/static/js
   ```


[1]: https://app.datadoghq.com/organization-settings/api-keys
{{< /site-region >}}

{{< site-region region="eu,us3,us5,gov,gov2,ap1,ap2" >}}
1. Ajoutez `@datadog/datadog-ci` à votre fichier `package.json` (assurez-vous d'utiliser la dernière version).
2. [Créez une clé API Datadog dédiée][1] et exportez-la en tant que variable d'environnement nommée `DATADOG_API_KEY`.
3. Configurez l'outil CLI pour téléverser des fichiers vers le {{<region-param key="dd_site_name">}} site en exportant deux variables d'environnement : `export DATADOG_SITE=`{{<region-param key="dd_site" code="true">}} et `export DATADOG_API_HOST=api.`{{<region-param key="dd_site" code="true">}}.
4. Exécutez la commande suivante une fois par service dans votre application :
   ```bash
   datadog-ci sourcemaps upload /path/to/dist \
     --service my-service \
     --release-version v35.2395005 \
     --minified-path-prefix https://hostname.com/static/js
   ```


[1]: https://app.datadoghq.com/organization-settings/api-keys
{{< /site-region >}}

Pour minimiser l'impact sur les performances de votre intégration continue, l'interface de ligne de commande est optimisée pour permettre l'importation d'autant de source maps que nécessaires en peu de temps (généralement quelques secondes).

**Remarque** : Le téléchargement d'une carte source ne remplace pas l'existante si la version n'a pas changé.

Les paramètres `--service` et `--release-version` doivent correspondre aux balises `service` et `version` sur vos événements de suivi d'erreurs, événements RUM et journaux de navigateur. Pour plus d'informations sur la façon de configurer ces balises, consultez la [documentation d'initialisation du SDK de navigateur][2] ou la [documentation de collecte des journaux de navigateur][3].

<div class="alert alert-info">Si vous avez défini plusieurs services dans votre application, exécutez la commande CI autant de fois qu'il y a de services, même si vous avez un ensemble de cartes sources pour l'ensemble de l'application.</div>

En exécutant la commande contre le répertoire exemple `dist`, Datadog s'attend à ce que votre serveur ou CDN livre les fichiers JavaScript à `https://hostname.com/static/js/javascript.364758.min.js` et `https://hostname.com/static/js/subdirectory/javascript.464388.min.js`.

Seules les cartes sources avec l'extension `.js.map` fonctionnent pour déminifier correctement les traces de pile. Les cartes sources avec d'autres extensions telles que `.mjs.map` sont acceptées mais ne déminifient pas les traces de pile.

<div class="alert alert-info">Si vous servez les mêmes fichiers sources JavaScript à partir de différents sous-domaines, téléchargez la carte source associée une fois et faites-la fonctionner pour plusieurs sous-domaines en utilisant le chemin d'accès absolu au lieu de l'URL complète. Par exemple, spécifiez <code>/static/js</code> au lieu de <code>https://hostname.com/static/js</code>.</div>

Voir tous les symboles téléchargés et gérer vos cartes sources sur la page [Explorer les symboles de débogage RUM][5].

### Liez les cadres de pile à votre code source {#link-stack-frames-to-your-source-code}

Si vous exécutez `datadog-ci sourcemaps upload` dans un répertoire de travail Git, Datadog collecte les métadonnées du dépôt. La commande `datadog-ci` collecte l'URL du dépôt, le hachage du commit actuel et la liste des chemins de fichiers dans le dépôt qui se rapportent à vos cartes sources. Pour plus de détails sur la collecte des métadonnées Git, consultez la [documentation datadog-ci][4].

Datadog affiche des liens vers votre code source dans des stack frames non minifiés.

## Résolvez les erreurs facilement {#troubleshoot-errors-with-ease}

Sans accès au chemin de fichier et au numéro de ligne, une trace de pile minifiée n'est pas utile pour le dépannage de votre base de code. De plus, l'extrait de code est minifié (ce qui signifie qu'il y a une longue ligne de code transformé), rendant le processus de dépannage plus difficile.

L'exemple suivant représente une stack trace minifiée :

{{< img src="real_user_monitoring/error_tracking/minified_stacktrace.png" alt="Suivi des erreurs : trace de pile minifiée" >}}

En revanche, une trace de pile non minifiée vous fournit tout le contexte nécessaire pour un dépannage rapide et sans heurts. Pour les cadres de pile qui se rapportent à votre code source, Datadog génère également un lien direct vers votre dépôt :

{{< img src="real_user_monitoring/error_tracking/unminified_stacktrace.png" alt="Suivi des erreurs : trace de pile non minifiée" >}}

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/sourcemaps
[2]: https://docs.datadoghq.com/fr/real_user_monitoring/application_monitoring/browser/setup/#initialization-parameters
[3]: https://docs.datadoghq.com/fr/logs/log_collection/javascript/#initialization-parameters
[4]: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/sourcemaps#link-errors-with-your-source-code
[5]: https://app.datadoghq.com/source-code/setup/rum