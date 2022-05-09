---
aliases:
  - /fr/serverless/serverless_integrations/plugin/
dependencies:
  - 'https://github.com/DataDog/serverless-plugin-datadog/blob/master/README.md'
kind: documentation
title: Plug-in Serverless Datadog
---
[![sans serveur](http://public.serverless.com/badges/v1.svg)](https://www.serverless.com)
![build](https://github.com/DataDog/serverless-plugin-datadog/workflows/build/badge.svg)
[![Couverture du code](https://img.shields.io/codecov/c/github/DataDog/serverless-plugin-datadog)](https://codecov.io/gh/DataDog/serverless-plugin-datadog)
[![NPM](https://img.shields.io/npm/v/serverless-plugin-datadog)](https://www.npmjs.com/package/serverless-plugin-datadog)
[![Slack](https://chat.datadoghq.com/badge.svg?bg=632CA6)](https://chat.datadoghq.com/)
[![Licence](https://img.shields.io/badge/license-Apache--2.0-blue)](https://github.com/DataDog/serverless-plugin-datadog/blob/master/LICENSE)

Datadog recommande le plug-in Serverless Framework pour les développeurs qui utilisent le Serverless Framework afin de déployer leurs applications sans serveur.
Le plug-in configure automatiquement l'ingestion de métriques, de traces et de logs depuis vos applications sans serveur en effectuant les opérations suivantes :

- Installation et configuration de la bibliothèque Lambda Datadog pour vos fonctions Lambda Python et Node.js
- Activation de la collecte de métriques Lambda optimisées et de métriques custom depuis vos fonctions Lambda.
- Gestion des abonnements du Forwarder Datadog aux groupes de logs de votre fonction Lambda

## Prise en main

Pour vous lancer rapidement, suivez les instructions d'installation pour [Python][1] ou [Node.js][2], et consultez les métriques optimisées, les traces et les logs de votre fonction dans Datadog. Ces instructions permettent d'obtenir une configuration basique, mais fonctionnelle.

## Options de configuration supplémentaires

Pour réaliser une configuration avancée de votre plug-in, utilisez les paramètres personnalisés suivants dans votre fichier `serverless.yml` :

| Paramètre              | Description                                                                                                                                                                                                                                                                                                                                                                                                         |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `flushMetricsToLogs`   | Permet d'envoyer des métriques custom via les logs avec la fonction Lambda du Forwarder Datadog (recommandé). Valeur par défaut : `true`. Si vous désactivez ce paramètre, vous devez définir les paramètres `apiKey` (ou `apiKMSKey` en cas de chiffrement). Lorsque `addExtension` est défini sur true, `flushMetricsToLogs` est ignoré.                                                                                                                                            |
| `site`                 | Définit le site Datadog auquel envoyer les données. Ce paramètre est uniquement utilisé lorsque `flushMetricsToLogs` est défini sur `false` ou `addExtension` sur `true`. Valeurs acceptées : `datadoghq.com`, `datadoghq.eu`, `us3.datadoghq.com` et `ddog-gov.com`. Valeur par défaut : `datadoghq.com`.                                                                                                                                                               |
| `apiKey`               | Clé d'API Datadog, nécessaire uniquement lorsque `flushMetricsToLogs` est défini sur `false` ou `addExtension` sur `true`. Lorsque ce paramètre est défini, la clé d'API Datadog est ajoutée directement à vos fonctions Lambda en tant que variable d'environnement. Pour découvrir comment obtenir une clé d'API Datadog, consultez la [documentation dédiée aux clés d'API][3].                                                                                                                                                                                                                            |
| `apiKMSKey`            | La clé d'API Datadog chiffrée via KMS. Utilisez ce paramètre au lieu de `apiKey` lorsque `flushMetricsToLogs` est défini sur `false` ou `addExtension` sur `true`, et que vous utilisez le chiffrement KMS. Lorsque ce paramètre est défini, la clé d'API Datadog est ajoutée directement à vos fonctions Lambda en tant que variable d'environnement.                                                                                                                                                                                                                                    |
| `monitorsApiKey`       | Clé d'API Datadog. Uniquement nécessaire si vous utilisez le plug-in pour créer des monitors pour vos fonctions, et si `monitors` est défini. Paramètre distinct de `apiKey` avec votre fonction. `monitorsApiKey` est uniquement utilisé pour créer des monitors via les API Monitors de Datadog. Vous pouvez utiliser la même clé d'API pour `apiKey` et `monitorsApiKey`.                                                                                                                                                                               |
| `monitorsAppKey`       | Clé d'application Datadog. Uniquement nécessaire si vous utilisez le plug-in pour créer des monitors pour vos fonctions, et si `monitors` est défini.                                                                                                                                                                                                                                   |
| `addLayers`            | Détermine s'il faut ou non installer la bibliothèque Lambda Datadog en tant que couche. Valeur par défaut : `true`. Définissez ce paramètre sur `false` si vous souhaitez associer vous-même la bibliothèque Lambda Datadog au package de déploiement de votre fonction afin de pouvoir installer une version spécifique de la bibliothèque Lambda Datadog ([Python][4] ou [Node.js][5]).                                                                                                          |
| `addExtension`         | Indique si l'extension Lambda Datadog doit être installée en tant que couche. Valeur par défaut : `false`. Pour activer cette option, il est nécessaire de définir le paramètre `apiKey` (ou `apiKMSKey`). La couche de l'extension Lambda Datadog est disponible sous forme de préversion publique. Consultez [cette page][8] pour en savoir plus sur la couche de l'extension Lambda.                                                                                   |
| `logLevel`             | Le niveau de log. Définir sur `DEBUG` pour une journalisation étendue.                                                                                                                                                                                                                                                                                                                                             |
| `enableXrayTracing`    | Définir sur `true` pour activer le tracing X-Ray sur les fonctions Lambda et les intégrations API Gateway. Valeur par défaut : `false`.                                                                                                                                                                                                                                                                                                       |
| `enableDDTracing`      | Permet d'activer le tracing Datadog sur la fonction Lambda. Valeur par défaut : `true`.                                                                                                                                                                                                                                                                                                                                                  |
| `subscribeToApiGatewayLogs` | Permet d'activer l'abonnement automatique du Forwarder Datadog aux groupes de logs API Gateway. Valeur par défaut : `true`.                                                                                                                                                                                                                                                                                                                 |
| `subscribeToHttpApiLogs` | Permet d'activer l'abonnement automatique du Forwarder Datadog aux groupes de logs de l'API HTTP. Valeur par défaut : `true`.                                                                                                                                                                                                                                                                                                                 |
| `subscribeToWebsocketLogs` | Permet d'activer l'abonnement automatique du Forwarder Datadog aux groupes de logs Websocket. Valeur par défaut : `true`.                                                                                                                                                                                                                                                                                                                 |
| `forwarderArn`         | Définissez ce paramètre pour abonner le Forwarder Datadog aux groupes de logs CloudWatch des fonctions Lambda. Obligatoire lorsque `enableDDTracing` est défini sur `true`, sauf si l'abonnement est appliqué d'une autre manière. Par exemple, si un abonnement pour le Forwarder Datadog est appliqué via l'intégration AWS de Datadog, `forwarderArn` n'est pas requis.         |
| `integrationTesting`   | Définissez ce paramètre sur `true` lorsque vous effectuez des tests d'intégration. Cela vous permet d'ignorer la validation de l'ARN du Forwarder et de ne pas ajouter les liens de sortie des monitors Datadog. Valeur par défaut : `false`.                                                                                                                                                                                                                                              |
| `enableTags`           | Lorsque ce paramètre est défini, les fonctions Lambda reçoivent automatiquement les tags `service` et `env` en utilisant les valeurs `service` et `stage` issues de la définition de l'application sans serveur. Cela n'écrase PAS les éventuels tags `service` ou `env` existants. Valeur par défaut : `true`.                                                                                                                                                          |
| `injectLogContext`     | Lorsque ce paramètre est défini, la couche Lambda corrige automatiquement console.log avec les ID de tracing de Datadog. Valeur par défaut : `true`.                                                                                                                                                                                                                                                                                                     |
| `exclude`              | Lorsque ce paramètre est défini, le plug-in ignore toutes les fonctions spécifiées. Utilisez ce paramètre pour exclure des fonctions de votre déploiement Datadog. Valeur par défaut : `[]`.                                                                                                                                                                                                                                            |
| `enabled`              | Lorsque ce paramètre est défini sur false, le plug-in Datadog reste inactif. Valeur par défaut : `true`. Vous pouvez contrôler cette option à l'aide d'une variable d'environnement (p. ex., `enabled: ${strToBool(${env:DD_PLUGIN_ENABLED, true})}`, afin d'activer ou de désactiver le plug-in lors du déploiement. Il est également possible d'utiliser la valeur transmise avec `--stage` pour contrôler cette option. Pour en savoir plus, consultez [cet exemple](#desactiver-le-plug-in-pour-un-environnement-specifique).
| `monitors`             | Lorsque ce paramètre est défini, le plug-in Datadog configure des monitors pour la fonction déployée. Vous devez également définir `monitorsApiKey` et `monitorsAppKey`. Pour découvrir comment définir des monitors, consultez la rubrique [Activer et configurer un monitor sans serveur recommandé](#activer-et-configurer-un-monitor-sans-serveur-recommande).  |

Pour utiliser n'importe lequel de ces paramètres, ajoutez une section `custom` > `datadog` dans votre fichier `serverless.yml` qui est semblable à l'exemple ci-dessous :

```yaml
custom:
  datadog:
    flushMetricsToLogs: true
    apiKey: "{Clé_API_Datadog}"
    apiKMSKey: "{Clé_API_Datadog_chiffrée}"
    monitorsApiKey: "{Clé_API_Datadog}"
    monitorsAppKey: "{Clé_application_Datadog}"
    addLayers: true
    addExtension: true
    logLevel: "info"
    enableXrayTracing: false
    enableDDTracing: true
    enableAPIGatewayLogs: true
    enableTags: true
    injectLogContext: true
    exclude:
      - dd-excluded-function
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

```javascript
var nodeExternals = require("webpack-node-externals");

module.exports = {
  // On utilise webpack-node-externals pour exclure toutes les dépendances des nœuds.
  // Vous pouvez également définir manuellement les externals.
  externals: [nodeExternals(), "dd-trace", "datadog-lambda-js"],
};
```

**serverless.yml**

```yaml
custom:
  webpack:
    includeModules:
      forceExclude:
        - dd-trace
        - datadog-lambda-js
```

### Forwarder

La [fonction Lambda du Forwarder Datadog][7] doit être installée et abonnée aux groupes de logs de vos fonctions Lambda. Lorsque l'ARN est fourni à l'aide de l'option `forwarderArn`, le plug-in crée automatiquement les abonnements aux logs.

Si vous rencontrez l'erreur ci-dessous, vérifiez que l'ARN du Forwarder fourni est bien correct et qu'il provient de la même région et du même compte que votre application sans serveur.

```
An error occurred: GetaccountapiLogGroupSubscription - Could not execute the lambda function. Make sure you have given CloudWatch Logs permission to execute your function. (Service: AWSLogs; Status Code: 400; Error Code: InvalidParameterException).
```

### Désactiver le plug-in pour un environnement spécifique

SI vous souhaitez désactiver le plug-in en fonction de l'environnement (transmis via `--stage`), vous pouvez vous baser sur l'exemple ci-dessous :

```yaml
provider:
  stage: ${self:opt.stage, 'dev'}

custom:
  staged: ${self:custom.stageVars.${self:provider.stage}, {}}

  stageVars:
    dev:
      dd_enabled: false

  datadog:
    enabled: ${self:custom.staged.dd_enabled, true}
```
### Monitors sans serveur

Il existe sept monitors recommandés avec des valeurs par défaut prédéfinies.

| Surveiller              | Métriques                                                                                   | Seuil | ID du monitor sans serveur |
|:--------------------:|:-----------------------------------------------------------------------------------------:|:-----------------:|:---------------------:|
| Taux d'erreur élevé      | `aws.lambda.errors`/`aws.lambda.invocations`                                              | >= 10 %            | `high_error_rate`     |
| Délai d'expiration              | `aws.lambda.duration.max`/`aws.lambda.timeout`                                            | >= 1              | `timeout`             |
| Mémoire insuffisante        | `aws.lambda.lambda.enhanced.max_memory_used`/<br>`aws.lambda.memorysize`                  | >= 1              | `out_of_memory`       |
| Âge élevé de l'itérateur    | `aws.lambda.iterator_age.maximum`                                                         | >= 24 h         | `high_iterator_age`   |
| Taux de démarrage à froid élevé | `aws.lambda.enhanced.invaocations(cold_start:true)`/<br>`aws.lambda.enhanced.invocations` | >= 20 %            | `high_cold_start_rate`|
| Limitations élevées       | `aws.lambda.throttles`/`aws.lambda.invocations`                                           | >= 20 %            | `high_throttles`      |
| Augmentation de coût       | `aws.lambda.enhanced.estimated_cost`                                                      | &#8593;20 %        | `increased_cost`      |

#### Activer et configurer un monitor sans serveur recommandé

Pour créer un monitor sans serveur recommandé, vous devez utiliser son ID. Attention : vous devez également définir les paramètres `monitorApiKey` et `monitorAppKey`.

Si vous souhaitez configurer davantage de paramètres pour un monitor recommandé, définissez leur valeur sous l'ID du monitor. Les paramètres qui ne sont pas spécifiés à cet endroit seront définis sur la valeur recommandée par défaut. Le paramètre `query` pour les monitors recommandés ne peut pas être modifié directement. Il prend donc la valeur par défaut, comme les autres paramètres non spécifiés. Toutefois, vous pouvez modifier la valeur seuil de `query` en la redéfinissant dans le paramètre `options`. Pour supprimer un monitor, retirez-le du modèle `serverless.yml`. Pour en savoir plus sur la définition des paramètres de monitor, consultez la documentation relative aux [API Monitors de Datadog](https://docs.datadoghq.com/api/latest/monitors/#creer-un-monitor).

La création du monitor a lieu après le déploiement de la fonction. Si jamais elle échoue, le déploiement de la fonction n'est donc pas perturbé.

##### Créer un monitor recommandé avec les valeurs par défaut
Définissez l'ID du monitor sans serveur de votre choix, sans spécifier de valeur pour les paramètres.

```yaml
custom:
 datadog:
   addLayers: true
   monitorsApiKey: "{Clé_API_Datadog}"
   monitorsAppKey: "{Clé_application_Datadog}"
   monitors:
     - high_error_rate:
```

##### Configurer un monitor recommand&
```yaml
custom:
 datadog:
   addLayers: true
   monitorsApiKey: "{Clé_API_Datadog}"
   monitorsAppKey: "{Clé_application_Datadog}"
   monitors:
     - high_error_rate:
        name: "Taux d'erreur élevé avec seuil d'avertissement modifié"
        message: "Plus de 10 % des appels de la fonction ont entrainé des erreurs lors de l'intervalle sélectionné. Prévenir @data.dog@datadoghq.com @slack-serverless-                 monitors."
        tags: ["modified_error_rate", "serverless", "error_rate"]
        require_full_window: true
        priority: 2
        options: {
          include_tags: true
          notify_audit:true
          thresholds: {
            ok: 0.025
            warning: 0.05
          }
        }
```

##### Supprimer un monitor
Pour supprimer un monitor, supprimez l'ID du monitor sans serveur et ses paramètres.

#### Activer et configurer un monitor custom

Pour créer un monitor custom, vous devez définir une chaîne d'ID de monitor sans serveur unique, et transmettre la clé d'API et la clé d'application. Le paramètre `query` est requis, mais tous les autres sont facultatifs. Définissez une chaîne d'ID et spécifiez les paramètres de votre choix ci-dessous. Pour en savoir plus sur les paramètres de monitor, consultez la documentation relative aux [API Monitors de Datadog](https://docs.datadoghq.com/api/latest/monitors/#creer-un-monitor).

```yaml
custom:
  datadog:
    addLayers: true
    monitorsApiKey: "{Clé_API_Datadog}"
    monitorsAppKey: "{Clé_application_Datadog}"
    monitors:
      - custom_monitor_id:
          name: "Monitor custom"
          query: "max(next_1w):forecast(avg:system.load.1{*}, 'linear', 1, interval='60m', history='1w', model='default') >= 3"
          message: "Message personnalisé pour le monitor custom. Prévenir @data.dog@datadoghq.com @slack-serverless-monitors."
          tags: ["custom_monitor", "serverless"]
          priority: 3
          options: {
            enable_logs_sample: true
            require_full_window: true
            include_tags: false
            notify_audit:true
            notify_no_data: false
            thresholds: {
              ok: 1
              warning: 2
            }
          }
```

## Ouvrir un ticket

Si vous rencontrez un bug avec ce package, faites-le-nous savoir en créant un ticket. Avant de créer un ticket, vérifiez que le problème n'a pas déjà été signalé dans les tickets existants pour éviter les doublons.

Lorsque vous créez un ticket, indiquez la version de Serverless Framework, la version de Python/Node.js et la stack trace, si possible. Indiquez aussi les étapes à reproduire le cas échéant.

Vous pouvez également créer un ticket pour demander l'ajout d'une fonctionnalité.

## Contributions

Si vous rencontrez un problème avec ce package et que vous avez un correctif, n'hésitez pas à faire une pull request en suivant la [procédure](CONTRIBUTING.md).

## Communauté

Si vous avez des commentaires ou des questions concernant les fonctionnalités, rejoignez le canal `#serverless` de la [communauté Slack Datadog](https://chat.datadoghq.com/).

## Licence

Sauf indication contraire, tous les fichiers de ce référentiel sont distribués sous licence Apache version 2.0.

Ce produit inclut un logiciel développé chez Datadog (https://www.datadoghq.com/). Copyright 2019 Datadog, Inc.

[1]: https://docs.datadoghq.com/fr/serverless/installation/python/?tab=serverlessframework
[2]: https://docs.datadoghq.com/fr/serverless/installation/nodejs/?tab=serverlessframework
[3]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#api-keys
[4]: https://pypi.org/project/datadog-lambda/
[5]: https://www.npmjs.com/package/datadog-lambda-js
[6]: https://webpack.js.org/configuration/externals/
[7]: https://docs.datadoghq.com/fr/serverless/forwarder/
[8]: https://docs.datadoghq.com/fr/serverless/libraries_integrations/extension/
