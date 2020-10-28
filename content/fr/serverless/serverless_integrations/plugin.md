---
dependencies:
  - 'https://github.com/DataDog/serverless-plugin-datadog/blob/master/README.md'
kind: documentation
title: Plug-in Serverless Datadog
---
[![serverless](http://public.serverless.com/badges/v1.svg)](https://www.serverless.com)
![build](https://github.com/DataDog/serverless-plugin-datadog/workflows/build/badge.svg)
[![Code Coverage](https://img.shields.io/codecov/c/github/DataDog/serverless-plugin-datadog)](https://codecov.io/gh/DataDog/serverless-plugin-datadog)
[![NPM](https://img.shields.io/npm/v/serverless-plugin-datadog)](https://www.npmjs.com/package/serverless-plugin-datadog)
[![Slack](https://img.shields.io/badge/slack-%23serverless-blueviolet?logo=slack)](https://datadoghq.slack.com/channels/serverless/)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue)](https://github.com/DataDog/serverless-plugin-datadog/blob/master/LICENSE)

Datadog recommande le plug-in Serverless Framework pour les développeurs qui utilisent le Serverless Framework afin de déployer leurs applications sans serveur.
Le plug-in configure automatiquement l'ingestion de métriques, de traces et de logs depuis vos applications sans serveur en effectuant les opérations suivantes :

- Installation et configuration de la bibliothèque Lambda Datadog pour vos fonctions Lambda Python et Node.js.
- Activation de la collecte de métriques Lambda optimisées et de métriques custom depuis vos fonctions Lambda.
- Gestion des abonnements du Forwarder Datadog aux groupes de logs de votre fonction Lambda.

## Prise en main

Pour vous lancer rapidement, suivez les instructions d'installation pour [Python][1] ou [Node.js][2], et consultez les métriques optimisées, les traces et les logs de votre fonction dans Datadog. Ces instructions permettent d'obtenir une configuration basique, mais fonctionnelle.

## Options de configuration supplémentaires

Pour réaliser une configuration plus poussée de votre plug-in, utilisez les paramètres personnalisés suivants dans votre fichier `serverless.yml` :

| Paramètre            | Description                                                                                                                                                                                                                                                                                                                                                                                     |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `flushMetricsToLogs` | Permet d'envoyer les métriques custom via les logs avec la fonction Lambda du Forwarder Datadog (recommandé). Valeur par défaut : `true`. Si vous désactivez ce paramètre, vous devez définir les paramètres `site` et `apiKey` (ou `apiKMSKey` en cas de chiffrement).                                                                                                                                                            |
| `site`               | Définit le site Datadog auquel envoyer les données. Nécessaire uniquement lorsque flushMetricsToLogs est défini sur `false`. Valeur par défaut : `datadoghq.com`. Définissez ce paramètre sur `datadoghq.eu` pour le site européen de Datadog.                                                                                                                                                                                                                                |
| `apiKey`             | Clé d'API Datadog, nécessaire uniquement lorsque `flushMetricsToLogs` est défini sur `false`. Pour savoir comment obtenir une clé d'API Datadog, consultez la [documentation dédiée aux clés d'API][3].                                                                                                                                                                                                                                    |
| `apiKMSKey`          | La clé d'API Datadog chiffrée via KMS. Utilisez ce paramètre au lieu de `apiKey` lorsque `flushMetricsToLogs` est défini sur `false` et que vous utilisez le chiffrement KMS.                                                                                                                                                                                                                                             |
| `addLayers`          | Détermine s'il faut ou non installer la bibliothèque Lambda Datadog en tant que couche. Valeur par défaut : `true`. Définissez ce paramètre sur `false` si vous souhaitez associer vous-même la bibliothèque Lambda Datadog au package de déploiement de votre fonction afin de pouvoir installer une version spécifique de la bibliothèque Lambda Datadog ([Python][4] ou [Node.js][5]). |
| `logLevel`           | Le niveau de log. Définir sur `DEBUG` pour un logging étendu. Valeur par défaut : `info`.                                                                                                                                                                                                                                                                                                                           |
| `enableXrayTracing`  | Définir sur `true` pour activer le tracing X-Ray sur les fonctions Lambda et les intégrations API Gateway. Valeur par défaut : `false`.                                                                                                                                                                                                                                                                                   |
| `enableDDTracing`    | Permet d'activer le tracing Datadog sur la fonction Lambda. Valeur par défaut : `true`. Lorsque cette option est activée, le paramètre `forwarder` doit être défini.                                                                                                                                                                                                                                                                         |
| `forwarder`          | Définir ce paramètre pour abonner la fonction Lambda du Forwarder Datadog spécifiée aux groupes de logs CloudWatch des fonctions Lambda. Paramètre requis lorsque `enableDDTracing` est défini sur `true`.                                                                                                                                                                                                                 |
| `enableTags`         | Lorsque ce paramètre est défini, les fonctions Lambda reçoivent automatiquement les tags `service` et `env` en utilisant les valeurs `service` et `stage` issues de la définition de l'application sans serveur. Cela n'écrase PAS les éventuels tags `service` ou `env` existants. Valeur par défaut : `true`.                                                                                                                                      |
| `injectLogContext`         | Lorsque ce paramètre est défini, la couche Lambda corrige automatiquement console.log avec les ID de tracing de Datadog. Valeur par défaut : `true`.                                                                                                                                      |

Pour utiliser l'un de ces paramètres, ajoutez une section `custom` > `datadog` dans votre fichier `serverless.yml` comme dans cet exemple :

```yaml
custom:
  datadog:
    flushMetricsToLogs: true
    apiKey: "{clé_API_Datadog}"
    apiKMSKey: "{clé_API_Datadog_chiffrée}"
    addLayers: true
    logLevel: "info"
    enableXrayTracing: false
    enableDDTracing: true
    forwarder: arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder
    enableTags: true
    injectLogContext: true
```

**Remarque** : si vous utilisez webpack, Datadog recommande d'utiliser les couches prédéfinies en définissant `addLayers` sur `true`, ce qui correspond à la valeur par défaut, et d'ajouter `datadog-lambda-js` et `dd-trace` à la section [externals][6] de votre configuration webpack.

### TypeScript

Si vous utilisez serverless-typescript, assurez-vous que `serverless-datadog` est bien placé au-dessus de l'entrée `serverless-typescript` dans votre fichier `serverless.yml`. Le plug-in détecte automatiquement les fichiers `.ts`.

```yaml
plugins:
  - serverless-plugin-datadog
  - serverless-typescript
```

Si vous utilisez TypeScript, il se peut que vous rencontriez une erreur en raison de définitions de type manquantes. Cette erreur survient lorsque vous utilisez les couches prédéfinies (par exemple, lorsque vous définissez `addLayers` sur `true`, ce qui correspond à la valeur par défaut) et que vous devez importer des fonctions auxiliaires à partir des packages `datadog-lambda-js` et `dd-trace` afin d'envoyer des métriques custom ou d'instrumenter une fonction spécifique. Pour corriger cette erreur, ajoutez `datadog-lambda-js` et `dd-trace` à la liste `devDependencies` du fichier package.json de votre projet.

### Webpack

`dd-trace` n'est pas compatible avec webpack en raison de l'utilisation de l'importation conditionnelle et d'autres problèmes. Si vous utilisez webpack, assurez-vous d'ajouter `datadog-lambda-js` et `dd-trace` dans la section [externals] (https://webpack.js.org/configuration/externals/) de la configuration afin que webpack sache que ces dépendances seront disponibles dans le runtime. Nous vous conseillons également de retirer `datadog-lambda-js` et `dd-trace` du fichier `package.json` et du processus de build pour être sûr d'utiliser les versions fournies par la couche Lambda Datadog.

#### serverless-webpack

Si vous utilisez  `serverless-webpack`, pensez non seulement à ajouter `datadog-lambda-js` et `dd-trace` dans la section externals de votre configuration webpack, mais aussi et surtout à les exclure de votre fichier `serverless.yml`.

**webpack.config.js**
```
var nodeExternals = require('webpack-node-externals')

module.exports = {
  // On utilise webpack-node-externals pour exclure toutes les dépendances de nœud.
  // Vous pouvez également définir manuellement les externals.
  externals: [nodeExternals(), 'dd-trace', 'datadog-lambda-js'],
}
```

**serverless.yml**
```
custom:
  webpack:
    includeModules:
      forceExclude:
        - dd-trace
        - datadog-lambda-js
```


## Ouvrir un ticket

Si vous rencontrez un bug avec ce package, faites-le-nous savoir en créant un ticket. Avant de créer un ticket, vérifiez que le problème n'a pas déjà été signalé dans les tickets existants pour éviter les doublons.

Lorsque vous créez un ticket, indiquez la version de Serverless Framework, la version de Python/Node.js et la stack trace, si possible. Indiquez aussi les étapes à reproduire le cas échéant.

Vous pouvez également créer un ticket pour demander l'ajout d'une fonctionnalité.

## Contributions

Si vous rencontrez un problème avec ce package et que vous avez un correctif, n'hésitez pas à faire une pull request en suivant la [procédure](CONTRIBUTING.md).

## Licence

Sauf indication contraire, tous les fichiers de ce référentiel sont distribués sous licence Apache version 2.0.

Ce produit inclut un logiciel développé chez Datadog (https://www.datadoghq.com/). Copyright 2019 Datadog, Inc.

[1]: https://docs.datadoghq.com/fr/serverless/installation/python/?tab=serverlessframework
[2]: https://docs.datadoghq.com/fr/serverless/installation/nodejs/?tab=serverlessframework
[3]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#api-keys
[4]: https://pypi.org/project/datadog-lambda/
[5]: https://www.npmjs.com/package/datadog-lambda-js
[6]: https://webpack.js.org/configuration/externals/