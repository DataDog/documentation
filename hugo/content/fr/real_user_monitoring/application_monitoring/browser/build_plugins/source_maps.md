---
algolia:
  tags:
  - source maps
  - build plugins
  - error tracking
description: Téléchargez automatiquement les maps source JavaScript vers Datadog lors
  de votre build pour désobfusquer les traces de pile dans Error Tracking et RUM.
further_reading:
- link: /real_user_monitoring/guide/upload-javascript-source-maps
  tag: Documentation
  text: Téléchargez les maps source JavaScript (méthode manuelle)
- link: /real_user_monitoring/error_tracking
  tag: Documentation
  text: Error Tracking
- link: https://github.com/DataDog/build-plugins
  tag: Code source
  text: Dépôt GitHub des plugins de build Datadog
title: Maps source
---
## Présentation {#overview}

Le plugin de build Source Maps télécharge automatiquement les maps source JavaScript vers Datadog pendant votre build, permettant d'obtenir des traces de pile désobfusquées dans [Error Tracking][1] et [RUM][2]. Cela évite d'avoir à exécuter manuellement `datadog-ci sourcemaps upload` ou à configurer des pipelines CI/CD pour les téléchargements de maps source.

Le plugin s'intègre au processus de build, détecte tous les fichiers `.js` avec les fichiers maps source `.map` correspondants à partir de la sortie de build, et les télécharge vers Datadog avec les métadonnées git. Il peut associer les maps source aux événements par ID de débogage ou par service et version.

## Prérequis {#prerequisites}

- Une clé Datadog API, définie avec `auth.apiKey` ou la variable d'environnement `DATADOG_API_KEY`.
- Maps source activées dans la configuration de votre bundler. Le plugin télécharge les maps source mais ne les génère pas. Consultez [Upload JavaScript Source Maps][3] pour la configuration de génération de maps source spécifique au bundler.
- Pour les téléchargements par ID de débogage, activez l'injection d'ID de débogage dans le plugin de build.
- Pour les téléchargements par service et version, initialisez le SDK RUM avec les paramètres `service` et `version` qui correspondent à la configuration du plugin.
- Le plugin de build Datadog installé et enregistré auprès de votre bundler. Consultez [Build Plugins][4] pour les instructions d'installation.

## Configuration {#configuration}

Les variables d'environnement suivantes remplacent les valeurs de configuration :

- `DATADOG_SITE` ou `DD_SITE` : Remplace `auth.site` pour l'URL d'ingestion.
- `DATADOG_SOURCEMAP_INTAKE_URL` : Remplace directement l'URL d'ingestion complète.

Choisissez une méthode de correspondance pour le téléchargement des maps source : ID de débogage ou service et version. Ces méthodes de téléchargement sont mutuellement exclusives.

{{< tabs >}}
{{% tab "ID de débogage (recommandé)" %}}

Les ID de débogage associent chaque bundle JavaScript à sa map source sans dépendre de l'URL du bundle, du service ou de la version. Utilisez cette méthode pour les nouvelles configurations.

La prise en charge des ID de débogage nécessite [Datadog Build Plugins version 3.3.0](https://github.com/DataDog/build-plugins/releases/tag/v3.3.0) ou ultérieure.

Configurez les options suivantes dans `sourcemaps` :

| Paramètre | Type | Requis | Par défaut | Description |
|-----------|------|----------|---------|-------------|
| `debugId` | Booléen | Oui | Aucun | Définissez sur `true` pour injecter un ID de débogage dans chaque bundle JavaScript. |
| `upload` | Booléen | Oui, pour télécharger | `false` | Définissez sur `true` pour télécharger les maps source pendant la build. Si omis, le plugin injecte uniquement les ID de débogage. |
| `bailOnError` | Booléen | Non | `false` | Si `true`, la build échoue lorsqu'une erreur de téléchargement d'une map source se produit. |
| `dryRun` | Booléen | Non | `false` | Si `true`, le plugin exécute le processus de téléchargement sans envoyer de données à Datadog. Utilisez cette option pour vérifier votre configuration. |
| `maxConcurrency` | Nombre | Non | `20` | Nombre maximal de téléchargements simultanés de maps source. |

Définissez `debugId` et `upload` sur `true` pour injecter des ID de débogage et télécharger des maps source pendant la build :

```javascript
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
  plugins: [
    datadogWebpackPlugin({
      auth: {
        apiKey: process.env.DATADOG_API_KEY,
        site: 'datadoghq.com', // Optional: defaults to datadoghq.com
      },
      sourcemaps: {
        debugId: true,
        upload: true,
      },
    }),
  ],
};
```

{{% /tab %}}
{{% tab "Service et version" %}}

Configurez l'objet `errorTracking.sourcemaps` pour télécharger des maps source en utilisant la correspondance de service et de version :

| Paramètre | Type | Requis | Par défaut | Description |
|-----------|------|----------|---------|-------------|
| `service` | Chaîne | Oui | Aucun | Nom du service. Doit correspondre au paramètre d'initialisation `service` du SDK RUM. |
| `releaseVersion` | Chaîne | Oui, sauf si `metadata.version` est défini | Aucun | Version de la release. Doit correspondre au paramètre d'initialisation `version` du SDK RUM. |
| `minifiedPathPrefix` | Chaîne | Oui | Aucun | URL ou préfixe de chemin relatif à la racine où vos fichiers JavaScript minifiés sont servis. Par exemple, `https://example.com/static/` ou `/static/`. |
| `bailOnError` | Booléen | Non | `false` | Si `true`, la build échoue lorsqu'une erreur de téléchargement d'une map source se produit. |
| `dryRun` | Booléen | Non | `false` | Si `true`, le plugin exécute le processus de téléchargement sans envoyer de données à Datadog. Utilisez cette option pour vérifier votre configuration. |
| `maxConcurrency` | Nombre | Non | `20` | Nombre maximal de téléchargements simultanés de maps source. |

```javascript
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
  plugins: [
    datadogWebpackPlugin({
      auth: {
        apiKey: process.env.DATADOG_API_KEY,
        site: 'datadoghq.com', // Optional: defaults to datadoghq.com
      },
      errorTracking: {
        sourcemaps: {
          service: 'my-application',
          releaseVersion: '1.0.0',
          minifiedPathPrefix: 'https://example.com/static/',
        },
      },
    }),
  ],
};
```

Pour afficher également le code source en ligne dans les traces de pile d'Error Tracking, associez les téléchargements de maps source de service et de version au plugin [Source Code Context][5].

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">Ces exemples utilisent webpack. L'objet de configuration est identique pour tous les bundlers pris en charge — seuls le nom de l'import et celui de la fonction du plugin diffèrent. Consultez <a href="/real_user_monitoring/application_monitoring/browser/build_plugins/">Build Plugins</a> pour obtenir les instructions d'installation pour votre bundler.</div>

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/error_tracking
[2]: /fr/real_user_monitoring/
[3]: /fr/real_user_monitoring/guide/upload-javascript-source-maps#instrument-your-code
[4]: /fr/real_user_monitoring/application_monitoring/browser/build_plugins/
[5]: /fr/real_user_monitoring/application_monitoring/browser/build_plugins/source_code_context