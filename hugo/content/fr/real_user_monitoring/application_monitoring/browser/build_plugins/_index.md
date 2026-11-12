---
algolia:
  tags:
  - build plugins
  - webpack
  - vite
  - esbuild
  - rollup
  - rspack
  - bundler
description: Intégrez les plugins de build Datadog à votre bundler JavaScript pour
  automatiser le téléchargement des maps source, la désobfuscation des noms d'action
  et d'autres tâches RUM au moment de la compilation.
further_reading:
- link: https://github.com/DataDog/build-plugins
  tag: Code source
  text: Dépôt GitHub des plugins de build Datadog
- link: /real_user_monitoring/application_monitoring/browser/setup/client
  tag: Documentation
  text: Configuration côté client du navigateur RUM
title: Plugins de build
---
## Présentation {#overview}

Les plugins de build Datadog s'intègrent à votre bundler JavaScript pour automatiser les tâches RUM courantes pendant votre processus de build. Ils sont disponibles pour webpack, Vite, esbuild, Rollup et Rspack.

Les plugins de build sont complémentaires au SDK RUM Browser. Vous devez toujours configurer le SDK comme décrit dans la [Configuration de la surveillance du navigateur][1].

## Installation {#installation}

Installez le package du plugin de build Datadog pour votre bundler:

{{< tabs >}}
{{% tab "Webpack" %}}

```bash
npm install --save-dev @datadog/webpack-plugin
```

```javascript
// webpack.config.js
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
  plugins: [
    datadogWebpackPlugin({
      // configuration
    }),
  ],
};
```

{{% /tab %}}
{{% tab "Vite" %}}

```bash
npm install --save-dev @datadog/vite-plugin
```

```javascript
// vite.config.js
import { datadogVitePlugin } from '@datadog/vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    datadogVitePlugin({
      // configuration
    }),
  ],
});
```

{{% /tab %}}
{{% tab "esbuild" %}}

```bash
npm install --save-dev @datadog/esbuild-plugin
```

```javascript
// esbuild.config.js
const { datadogEsbuildPlugin } = require('@datadog/esbuild-plugin');

require('esbuild').build({
  plugins: [
    datadogEsbuildPlugin({
      // configuration
    }),
  ],
});
```

{{% /tab %}}
{{% tab "Cumul" %}}

```bash
npm install --save-dev @datadog/rollup-plugin
```

```javascript
// rollup.config.js
import { datadogRollupPlugin } from '@datadog/rollup-plugin';

export default {
  plugins: [
    datadogRollupPlugin({
      // configuration
    }),
  ],
};
```

{{% /tab %}}
{{% tab "Rspack" %}}

```bash
npm install --save-dev @datadog/rspack-plugin
```

```javascript
// rspack.config.js
const { datadogRspackPlugin } = require('@datadog/rspack-plugin');

module.exports = {
  plugins: [
    datadogRspackPlugin({
      // configuration
    }),
  ],
};
```

{{% /tab %}}
{{< /tabs >}}

## Configuration {#configuration}

Les options de configuration partagées suivantes s'appliquent à tous les plugins :

| Paramètre | Type | Requis | Par défaut | Description |
|-----------|------|----------|---------|-------------|
| `auth.apiKey` | Chaîne | Oui (Source Maps uniquement) | Aucune | Votre clé d'API Datadog. Peut également être défini avec la variable d'environnement `DATADOG_API_KEY`. |
| `auth.site` | Chaîne | Non | `datadoghq.com` | Votre site Datadog. Peut également être défini avec la variable d'environnement `DATADOG_SITE` ou `DD_SITE`. |
| `logLevel` | Chaîne | Non | `warn` | Niveau de verbosité des logs. L'une des valeurs suivantes : `debug`, `info`, `warn`, `error` ou `none`. |

L'exemple suivant montre la structure de configuration complète :

```javascript
datadogWebpackPlugin({
  auth: {
    apiKey: process.env.DATADOG_API_KEY,
    site: 'datadoghq.com',
  },
  logLevel: 'warn',
  // Source map uploads by debug ID (see Source Maps plugin page)
  sourcemaps: { /* ... */ },
  // Source map uploads by service and version (see Source Maps plugin page)
  errorTracking: {
    sourcemaps: { /* ... */ },
  },
  // RUM build-time features (see individual plugin pages)
  rum: {
    privacy: { /* ... */ },
    sourceCodeContext: { /* ... */ },
  },
})
```

`sourcemaps` et `errorTracking.sourcemaps` sont mutuellement exclusifs : définissez-en un, en fonction de la méthode de correspondance que vous choisissez. Consultez [Source Maps][2] pour plus de détails.

## Plugins disponibles {#available-plugins}

{{< whatsnext desc="Configurez les plugins de build individuels:" >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/build_plugins/source_maps" >}}<u>Source Maps</u> : téléversez automatiquement les source maps vers Datadog pendant votre build, ce qui permet d'obtenir des stack traces désobfusquées.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/build_plugins/action_name_deobfuscation" >}}<u>Désobfuscation du nom de l'action</u> : restaurez des noms d'action lisibles dans les builds minifiés.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/build_plugins/source_code_context" >}}<u>Contexte du code source</u> : affichez le code source en ligne dans les stack traces d'Error Tracking.{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/application_monitoring/browser/setup/
[2]: /fr/real_user_monitoring/application_monitoring/browser/build_plugins/source_maps/