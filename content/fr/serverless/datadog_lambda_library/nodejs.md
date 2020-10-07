---
dependencies:
- "https://github.com/DataDog/datadog-lambda-js/blob/master/README.md"
kind: documentation
title: Bibliothèque Lambda Datadog pour Node.js
---
![CircleCI](https://img.shields.io/circleci/build/github/DataDog/datadog-lambda-js)
[![Code Coverage](https://img.shields.io/codecov/c/github/DataDog/datadog-lambda-js)](https://codecov.io/gh/DataDog/datadog-lambda-js)
[![NPM](https://img.shields.io/npm/v/datadog-lambda-js)](https://www.npmjs.com/package/datadog-lambda-js)
[![Slack](https://img.shields.io/badge/slack-%23serverless-blueviolet?logo=slack)](https://datadoghq.slack.com/channels/serverless/)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue)](https://github.com/DataDog/datadog-lambda-js/blob/master/LICENSE)

La bibliothèque Lambda Datadog pour Node.js permet de recueillir des métriques Lambda optimisées, d'activer le tracing distribué et d'envoyer des métriques custom à partir de fonctions AWS Lambda.

## Installation

Suivez les [instructions d'installation](https://docs.datadoghq.com/serverless/installation/nodejs/) et consultez les métriques optimisées, les traces et les logs de votre fonction dans Datadog.

## Métriques custom

Une fois [installée](#installation), vous devriez pouvoir envoyer des métriques custom à partir de votre fonction Lambda.

Consultez les instructions relatives à l'[envoi de métriques custom à partir de fonctions AWS Lambda] (https://docs.datadoghq.com/integrations/amazon_lambda/?tab=nodejs#custom-metrics).

## Tracing

Une fois la bibliothèque [installée](#installation), vous devriez pouvoir consulter les traces de votre fonction dans Datadog.

Pour en savoir plus sur la collecte de traces, consultez la documentation sur la [collecte de traces à partir de fonctions AWS Lambda](https://docs.datadoghq.com/integrations/amazon_lambda/?tab=nodejs#trace-collection).

Pour en savoir plus sur l'association de vos traces à vos logs, consultez la [documentation officielle du client de tracing Datadog](https://datadoghq.dev/dd-trace-js/).

Le module `fs` est désactivé par défaut. Pour l'activer, vous devez définir la variable d'environnement `DD_TRACE_DISABLED_PLUGINS` sur `''` ou sur une liste séparée par des virgules des plug-ins que vous souhaitez désactiver. La liste complète des plug-ins pris en charge est disponible [ici](https://docs.datadoghq.com/tracing/compatibility_requirements/nodejs/).

### Corréler vos traces et vos logs

Si vous utiliser la `console` ou une bibliothèque de logging qui prend en charge l'injection automatique des ID de trace, l'ID de trace Datadog est automatiquement injecté par défaut dans les logs à des fins de corrélation. Si vous utilisez d'autres bibliothèques de logging, vous devez injecter l'ID de trace manuellement. Pour en savoir plus sur l'[association des logs et des traces], consultez la page https://docs.datadoghq.com/tracing/connect_logs_and_traces/nodejs/.

Définissez la variable d'environnement `DD_LOGS_INJECTION` sur `false` pour désactiver cette fonction.

## Logger personnalisé

Vous pouvez utiliser votre propre logger pour enregistrer les logs d'erreur et de debugging au lieu d'utiliser la `console` par défaut.

Par exemple, vous pouvez utiliser le logger [Pino](https://getpino.io/) :

```typescript
const { datadog } = require("datadog-lambda-js");
const logger = require("pino")();

// convertir la chaîne de message en métadonnées objet et en message
const messageToObject = (stringMessage) => {
  const { message, status, ...metadata } = JSON.parse(stringMessage);

  return [metadata, message];
};

async function myHandler(event, context) {
  // ...
}

// Utiliser votre propre logger
module.exports.myHandler = datadog(myHandler, {
  logger: {
    debug: (message) => logger.debug(...messageToObject(message)),
    error: (message) => logger.error(...messageToObject(message)),
  },
});
```

## Variables d'environnement

### DD_FLUSH_TO_LOG

Définissez cette variable sur `true` (conseillé) pour envoyer vos métriques custom de façon asynchrone (l'exécution de votre fonction Lambda n'est pas retardée) via CloudWatch Logs avec l'aide du [Forwarder Datadog](https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring). Définie sur `false` par défaut. Si elle est définie sur `false`, vous devrez configurer `DD_API_KEY` et `DD_SITE`.

### DD_API_KEY

Si `DD_FLUSH_TO_LOG` est défini sur `false` (non conseillé), la clé d'API Datadog doit être définie en configurant l'une des variables d'environnement suivantes :

- DD_API_KEY : la clé d'API Datadog en texte brut, NON conseillé
- DD_KMS_API_KEY : la clé d'API avec chiffrement KMS, nécessite l'autorisation `kms:Decrypt`

### DD_SITE

Si `DD_FLUSH_TO_LOG` est définie sur `false` (non conseillé) et que vos données doivent être envoyées au site européen de Datadog, vous devez définir `DD_SITE` sur `datadoghq.eu`. Valeur par défaut : `datadoghq.com`.

### DD_LOG_LEVEL

Définir sur `debug` pour activer les logs de debugging à partir de la bibliothèque Lambda Datadog. Valeur par défaut : `info`.

### DD_ENHANCED_METRICS

Générer des métriques d'intégration Lambda Datadog optimisées, telles que `aws.lambda.enhanced.invocations` et `aws.lambda.enhanced.errors`. Valeur par défaut : `true`.

### DD_LAMBDA_HANDLER

Emplacement de votre gestionnaire Lambda d'origine.

### DD_TRACE_ENABLED

Définir sur `true` pour lancer le traceur Datadog. Valeur par défaut : `false`.

### DD_LOGS_INJECTION

Injecter l'ID de trace Datadog dans les logs pour la corrélation. Valeur par défaut : `true`.

### DD_MERGE_XRAY_TRACES

Définir sur `true` pour fusionner la trace X-Ray et la trace Datadog lorsque les tracings X-Ray et Datadog sont tous les deux utilisés. Valeur par défaut : `false`.

## Ouvrir un ticket

Si vous rencontrez un bug avec ce package, faites-le nous savoir. Avant de créer un ticket, vérifiez que le problème n'a pas déjà été signalé dans les tickets existants pour éviter les doublons.

Lorsque vous créez un ticket, indiquez la version de la couche Lambda Datadog, la version de Node et la stack trace, si possible. Indiquez aussi les étapes à reproduire le cas échéant.

Vous pouvez également créer un ticket pour demander l'ajout d'une fonctionnalité.

## Contributions

Si vous rencontrez un problème avec ce package et que vous avez un correctif, n'hésitez pas à faire une pull request en suivant la [procédure](https://github.com/DataDog/dd-lambda-js/blob/master/CONTRIBUTING.md).

## Licence

Sauf indication contraire, tous les fichiers de ce référentiel sont distribués sous licence Apache version 2.0.

Ce produit inclut un logiciel développé chez Datadog (https://www.datadoghq.com/). Copyright 2019 Datadog, Inc.
