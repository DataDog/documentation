---
algolia:
  tags:
  - action names
  - build plugins
  - privacy
  - deobfuscation
description: Restaurez des noms d'action RUM lisibles dans les builds minifiés en
  générant un dictionnaire de confidentialité au moment de la compilation qui fait
  correspondre les valeurs obfusquées au texte original.
further_reading:
- link: /real_user_monitoring/application_monitoring/browser/tracking_user_actions
  tag: Documentation
  text: Suivi des actions utilisateur
- link: /data_security/real_user_monitoring
  tag: Documentation
  text: Sécurité des données RUM
- link: https://www.datadoghq.com/blog/rum-build-time-privacy-allowlist/
  tag: Blog
  text: 'Réduisez l''exposition des données sensibles au moment de la compilation
    avec des listes d''autorisation :'
- link: https://github.com/DataDog/build-plugins
  tag: Code source
  text: Dépôt GitHub des plugins de build Datadog
title: Désobfuscation des noms d'action
---
## Présentation {#overview}

Lorsque vous activez le paramètre d'initialisation [`enablePrivacyForActionName`][1], les noms d'action sont masqués pour des raisons de confidentialité. Dans les builds minifiés, les noms d'action peuvent également devenir illisibles car les bundlers obfusquent le texte et les attributs des éléments DOM que RUM utilise pour générer les noms d'action.

Le plugin de build de désobfuscation des noms d'action résout ces deux problèmes en instrumentant votre code source au moment de la compilation pour générer un dictionnaire de confidentialité qui fait correspondre les valeurs obfusquées à leur texte original. Le SDK RUM utilise ce dictionnaire pour résoudre les noms d'action lisibles.

## Prérequis {#prerequisites}

- Le SDK RUM initialisé avec `trackUserInteractions: true` et `enablePrivacyForActionName: true`. Consultez [Masquer tous les noms d'action][1].
- Le plugin de build Datadog installé et enregistré auprès de votre bundler. Consultez [Plugins de build][2] pour les instructions d'installation.

## Configuration {#configuration}

Configurez l'objet `rum.privacy` dans les options de votre plugin de build :

| Paramètre | Type | Requis | Par défaut | Description |
|-----------|------|----------|---------|-------------|
| `rum.privacy.include` | Tableau de RegExp ou de String | Non | Fichiers JS/TS (.js, .ts, .jsx, .tsx, .mjs, .cjs et variantes) | Modèles de fichiers à traiter pour la désobfuscation des noms d'action. |
| `rum.privacy.exclude` | Tableau de RegExp ou de String | Non | `node_modules`, `.preval.` fichiers | Modèles de fichiers à ignorer. |

## Exemple {#example}

Avec les paramètres par défaut (traite tous les fichiers JS/TS, exclut `node_modules`) :

```javascript
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
  plugins: [
    datadogWebpackPlugin({
      rum: {
        privacy: {},
      },
    }),
  ],
};
```

Avec des modèles d'inclusion et d'exclusion personnalisés :

```javascript
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
  plugins: [
    datadogWebpackPlugin({
      rum: {
        privacy: {
          include: [/\.jsx?$/, /\.tsx?$/],
          exclude: [/\/node_modules\//, /\/test\//],
        },
      },
    }),
  ],
};
```

<div class="alert alert-info">Ces exemples utilisent webpack. L'objet de configuration est identique pour tous les bundlers pris en charge. Consultez <a href="/real_user_monitoring/application_monitoring/browser/build_plugins/">Plugins de build</a> pour les instructions d'installation.</div>

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/application_monitoring/browser/tracking_user_actions#mask-all-action-names
[2]: /fr/real_user_monitoring/application_monitoring/browser/build_plugins/