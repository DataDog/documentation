---
description: Téléchargez des maps source JavaScript pour améliorer le suivi des erreurs
  avec des traces de pile lisibles et un meilleur débogage pour le code minifié.
further_reading:
- link: /real_user_monitoring/error_tracking
  tag: Documentation
  text: Débuter avec Error Tracking
- link: /real_user_monitoring/error_tracking/explorer
  tag: Documentation
  text: Visualiser vos données Error Tracking dans l'Explorer
- link: https://learn.datadoghq.com/courses/tracking-errors-rum-javascript
  tag: Centre d'apprentissage
  text: Suivi des erreurs avec RUM pour les applications Web JavaScript
- link: https://www.datadoghq.com/blog/a-practical-guide-to-react-error-monitoring/
  tag: Blog
  text: Un guide pratique pour la surveillance des erreurs React
- link: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/sourcemaps
  tag: Code source
  text: Référence des commandes de maps source
title: Importer des maps source JavaScript
---
## Présentation {#overview}

Si votre code source JavaScript front-end est minifié, téléchargez vos maps source sur Datadog pour désobfusquer vos différentes traces de pile. Pour toute erreur donnée, vous pouvez accéder au chemin du fichier, au numéro de ligne et à l'extrait de code pour chaque frame de la trace de pile associée. Datadog peut également lier les frames de pile à votre code source dans votre dépôt.

<div class="alert alert-info"><ul><li>Seules les erreurs collectées par <a href="/error_tracking/">Error Tracking</a>, <a href="/real_user_monitoring/">Real User Monitoring (RUM)</a> et les logs issus de <a href="/logs/log_collection/javascript/">Browser Logs Collection</a> peuvent être déminifiées.</li><li>Pour automatiser les téléchargements de maps source dans le cadre de votre processus de build, consultez <a href="/real_user_monitoring/application_monitoring/browser/build_plugins/source_maps">Build Plugins: maps source</a>.</li></ul></div>

## Instrumentez votre code {#instrument-your-code}

Configurez votre bundler JavaScript de sorte que, lors de la minification de votre code source, il génère des maps source qui incluent directement le code source associé dans l'attribut `sourcesContent`.

<div class="alert alert-danger">
Assurez-vous que la taille de chaque map source augmentée de la taille du fichier minifié associé ne dépasse pas la limite de <b>500 Mo</b>.
</div>

Consultez les configurations suivantes qui reposent sur des bundlers JavaScript populaires.

{{< tabs >}}
{{% tab "WebpackJS" %}}

Vous pouvez générer des maps source à l'aide du plug-in webpack intégré [SourceMapDevToolPlugin][1].

Consultez l'exemple de configuration dans votre fichier `webpack.config.js` :

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

**Remarque** : Si vous utilisez TypeScript, définissez `compilerOptions.sourceMap` sur `true` dans votre fichier `tsconfig.json`.

[1]: https://webpack.js.org/plugins/source-map-dev-tool-plugin/
{{% /tab %}}
{{% tab "ParcelJS" %}}

Parcel génère des maps source par défaut lorsque vous exécutez la commande de build : `parcel build <entry file>`.

{{% /tab %}}
{{% tab "Vite" %}}

Vous pouvez générer des maps source en configurant l'option `build.sourcemap` dans votre fichier `vite.config.js`.

Consultez l'exemple de configuration :

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

**Remarque** : Si vous utilisez TypeScript, assurez-vous que `compilerOptions.sourceMap` est défini sur `true` dans votre fichier `tsconfig.json`.

{{% /tab %}}
{{< /tabs >}}

Après avoir généré votre application, les bundlers créent un répertoire (généralement nommé `dist`) contenant des fichiers JavaScript minifiés, placés avec leurs maps source correspondantes.

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
Si la somme de la taille des fichiers pour <code>javascript.364758.min.js</code> et <code>javascript.364758.js.map</code> dépasse la limite de <b>500 Mo</b>, réduisez-la en configurant votre bundler pour diviser le code source en plusieurs sections plus petites. Pour plus d'informations, consultez <a href="https://webpack.js.org/guides/code-splitting/">Code Splitting with WebpackJS</a>.
</div>

## Téléchargez vos maps source {#upload-your-source-maps}

Pour télécharger vos maps source, choisissez l'une des méthodes de correspondance suivantes : Debug ID (recommandé) ou service et version. Les debug IDs permettent la résolution des maps source entre les micro-frontends.

{{< tabs >}}
{{% tab "Debug ID (Recommandé)" %}}

Les debug IDs associent un bundle JavaScript à sa map source sans dépendre de l'URL du bundle, du service ou de la version de release.

Choisissez l'une des méthodes de téléchargement suivantes.

#### Plugins de build Datadog {#datadog-build-plugins}

Les plugins de build Datadog peuvent injecter des debug IDs et télécharger les maps source directement pendant le build. Vous n'avez pas besoin d'installer ou d'exécuter `datadog-ci` séparément.

La prise en charge des debug IDs nécessite [Datadog Build Plugins version 3.3.0](https://github.com/DataDog/build-plugins/releases/tag/v3.3.0) ou ultérieure.

Activez l'injection de debug ID et le téléchargement des maps source dans votre plugin de build :

```javascript
datadogWebpackPlugin({
  auth: {
    apiKey: process.env.DATADOG_API_KEY,
    site: 'datadoghq.com',
  },
  sourcemaps: {
    debugId: true,
    upload: true,
  },
});
```

Le plugin télécharge chaque map source avec le debug ID injecté dans son bundle JavaScript correspondant.

Cet exemple utilise webpack. Consultez [Datadog Build Plugins][8] pour obtenir les instructions d'installation et de configuration pour les autres bundlers pris en charge.

#### `datadog-ci` {#datadog-ci}

La prise en charge des debug IDs nécessite [`@datadog/datadog-ci` version 5.24.0](https://github.com/DataDog/datadog-ci/releases/tag/v5.24.0) ou ultérieure.

1. Ajoutez `@datadog/datadog-ci` à votre fichier `package.json` (assurez-vous d'utiliser la dernière version).
2. [Créez une clé d'API Datadog dédiée][6] et exportez-la en tant que variable d'environnement nommée `DD_API_KEY`.
3. Pour les sites autres que US1, configurez l'interface de ligne de commande en exportant `DD_SITE` avec votre [site Datadog][7].
4. Injectez les ID de débogage après la build :

   ```bash
   datadog-ci sourcemaps inject /path/to/dist
   ```

5. Téléchargez les maps source et les bundles JavaScript correspondants :

   ```bash
   datadog-ci sourcemaps upload /path/to/dist --debug-id
   ```

Ne transmettez pas `--service`, `--release-version` ou `--minified-path-prefix` avec `--debug-id`.

La commande `inject` modifie les bundles JavaScript et les maps source sur place. Exécutez-la après la build et avant de générer des artefacts dépendants des octets tels que les hachages SRI, les ressources compressées, les signatures ou les manifestes de somme de contrôle. Déployez les mêmes artefacts modifiés que ceux que vous téléchargez.

[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: /fr/getting_started/site/
[8]: /fr/real_user_monitoring/application_monitoring/browser/build_plugins/source_maps/

{{% /tab %}}
{{% tab "Service et version" %}}

Pour télécharger des maps source en utilisant un service et une version, ajoutez une étape supplémentaire à votre pipeline CI qui exécute la commande `datadog-ci sourcemaps upload`. Elle analyse le répertoire `dist` et ses sous-répertoires pour télécharger automatiquement les maps source avec les fichiers minifiés correspondants.

{{< site-region region="us" >}}
1. Ajoutez `@datadog/datadog-ci` à votre fichier `package.json` (assurez-vous d'utiliser la dernière version).
2. [Créez une clé d'API Datadog dédiée][1] et exportez-la en tant que variable d'environnement nommée `DD_API_KEY`.
3. Exécutez la commande suivante une fois par service dans votre application :

   ```bash
   datadog-ci sourcemaps upload /path/to/dist \
     --service my-service \
     --release-version v35.2395005 \
     --minified-path-prefix https://hostname.com/static/js
   ```


[1]: https://app.datadoghq.com/organization-settings/api-keys
{{< /site-region >}}

{{< site-region region="eu,us3,us5,gov,gov2,ap1,ap2,uk1" >}}
1. Ajoutez `@datadog/datadog-ci` à votre fichier `package.json` (assurez-vous d'utiliser la dernière version).
2. [Créez une clé d'API Datadog dédiée][1] et exportez-la en tant que variable d'environnement nommée `DD_API_KEY`.
3. Configurez l'interface de ligne de commande pour télécharger des fichiers vers le {{<region-param key="dd_site_name">}} site en exportant deux variables d'environnement : `export DATADOG_SITE=`{{<region-param key="dd_site" code="true">}} et `export DATADOG_API_HOST=api.`{{<region-param key="dd_site" code="true">}}.
4. Exécutez la commande suivante une fois par service dans votre application :
   ```bash
   datadog-ci sourcemaps upload /path/to/dist \
     --service my-service \
     --release-version v35.2395005 \
     --minified-path-prefix https://hostname.com/static/js
   ```


[1]: https://app.datadoghq.com/organization-settings/api-keys
{{< /site-region >}}

Pour minimiser l'impact sur les performances de votre CI, l'interface de ligne de commande est optimisée pour permettre l'importation d'autant de maps source que nécessaires en peu de temps (généralement quelques secondes).

**Remarque** : le re-téléversement d'une map source ne remplace pas celle existante si la version n'a pas changé.

Les paramètres `--service` et `--release-version` doivent correspondre aux tags `service` et `version` sur vos événements Error Tracking, vos événements RUM et vos logs de navigateur. Pour plus d'informations sur la configuration de ces tags, reportez-vous à la [documentation d'initialisation du SDK Browser][2] ou à la [documentation de collecte des logs de navigateur][3].

<div class="alert alert-info">Si vous avez défini plusieurs services dans votre application, exécutez la commande CI autant de fois qu'il y a de services, même si vous avez un seul ensemble de maps source pour l'ensemble de l'application.</div>

En exécutant la commande sur le répertoire `dist` exemple, Datadog s'attend à ce que votre serveur ou CDN livre les fichiers JavaScript à `https://hostname.com/static/js/javascript.364758.min.js` et `https://hostname.com/static/js/subdirectory/javascript.464388.min.js`.

Seules les maps source avec l'extension `.js.map` fonctionnent pour déminifier correctement les traces de pile. Les maps source avec d'autres extensions telles que `.mjs.map` sont acceptées mais ne déminifient pas les traces de pile.

<div class="alert alert-info">Si vous servez les mêmes fichiers source JavaScript à partir de différents sous-domaines, téléchargez la map source associée une fois et faites-la fonctionner pour plusieurs sous-domaines en utilisant le chemin de préfixe absolu au lieu de l'URL complète. Par exemple, spécifiez <code>/static/js</code> au lieu de <code>https://hostname.com/static/js</code>.</div>

[2]: /fr/real_user_monitoring/application_monitoring/browser/setup/#initialization-parameters
[3]: /fr/logs/log_collection/javascript/#initialization-parameters

{{% /tab %}}
{{< /tabs >}}

Consultez tous les symboles téléchargés et gérez vos maps source sur la page [{{< ui >}}Explore RUM Debug Symbols{{< /ui >}}][5].

### Lier les frames de pile à votre code source {#link-stack-frames-to-your-source-code}

Si vous exécutez `datadog-ci sourcemaps upload` dans un répertoire de travail Git, Datadog collecte les métadonnées du dépôt. La commande `datadog-ci` collecte l'URL du dépôt, le hash du commit actuel et la liste des chemins de fichiers dans le dépôt qui se rapportent à vos maps source. Pour plus de détails sur la collecte des métadonnées Git, consultez la [documentation datadog-ci][4].

Datadog affiche des liens vers votre code source dans des stack frames non minifiés.

## Dépannage des téléversements d'ID de débogage {#troubleshooting-debug-id-uploads}

### Inspecter les maps source locales {#inspect-local-source-maps}

Pour trouver la map source locale pour un ID de débogage spécifique, exécutez :

```bash
datadog-ci sourcemaps find /path/to/dist --debug-id 12345678-1234-1234-1234-123456789abc
```

Pour trouver les maps source qui ne contiennent pas d'ID de débogage, exécutez :

```bash
datadog-ci sourcemaps find /path/to/dist --missing-debug-id
```

La commande `find` inspecte uniquement les fichiers `*.js.map` locaux. Elle ne confirme pas si Datadog a reçu un artefact.

## Résolvez les erreurs en toute simplicité {#troubleshoot-errors-with-ease}

Sans accès au chemin d'accès du fichier et au numéro de ligne, une trace de pile minifiée n'est pas utile pour résoudre les problèmes de votre base de code. De plus, l'extrait de code est minifié (ce qui signifie qu'il y a une longue ligne de code transformé), ce qui rend le processus de résolution des problèmes plus difficile.

L'exemple suivant représente une trace de pile minifiée :

{{< img src="real_user_monitoring/error_tracking/minified_stacktrace.png" alt="Trace de pile minifiée d'Error Tracking" >}}

En revanche, une trace de pile non minifiée vous fournit tout le contexte dont vous avez besoin pour une résolution rapide et transparente des problèmes. Pour les frames de pile qui se rapportent à votre code source, Datadog génère également un lien direct vers votre dépôt :

{{< img src="real_user_monitoring/error_tracking/unminified_stacktrace.png" alt="Trace de pile non minifiée d'Error Tracking" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/sourcemaps
[4]: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/sourcemaps#link-errors-with-your-source-code
[5]: https://app.datadoghq.com/source-code/setup/rum