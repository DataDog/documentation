---
dependencies:
- https://github.com/DataDog/datadog-cdk-constructs/blob/main/README.md
title: CDK Construct Datadog
---
[![NPM](https://img.shields.io/npm/v/datadog-cdk-constructs?color=blue&label=npm+cdk+v1)](https://www.npmjs.com/package/datadog-cdk-constructs)
[![NPM](https://img.shields.io/npm/v/datadog-cdk-constructs-v2?color=39a356&label=npm+cdk+v2)](https://www.npmjs.com/package/datadog-cdk-constructs-v2)
[![PyPI](https://img.shields.io/pypi/v/datadog-cdk-constructs?color=blue&label=pypi+cdk+v1)](https://pypi.org/project/datadog-cdk-constructs/)
[![PyPI](https://img.shields.io/pypi/v/datadog-cdk-constructs-v2?color=39a356&label=pypi+cdk+v2)](https://pypi.org/project/datadog-cdk-constructs-v2/)
[![Slack](https://chat.datadoghq.com/badge.svg?bg=632CA6)](https://chat.datadoghq.com/)
[![Licence](https://img.shields.io/badge/license-Apache--2.0-blue)](https://github.com/DataDog/datadog-cdk-constructs/blob/main/LICENSE)

Utilisez la bibliothèque CDK Construct Datadog pour déployer des applications sans serveur à l'aide d'AWS CDK.

Cette bibliothèque CDK configure automatiquement l'ingestion de métriques, traces et logs depuis vos applications sans serveur en effectuant les opérations suivantes :

- Installation et configuration de la bibliothèque Lambda Datadog pour vos fonctions Lambda [Python][1] et [Node.js][2].
- Activation de la collecte de traces et de métriques custom à partir de vos fonctions Lambda
- Gestion des abonnements du Forwarder Datadog aux groupes de logs des ressources Lambda et non Lambda

## Différences entre la v1 et la v2 d'AWS CDK
Il existe deux versions distinctes de CDK Construct : `datadog-cdk-constructs` et `datadog-cdk-constructs-v2`. Chaque version a été conçue spécifiquement pour `AWS CDK v1` et `AWS CDK v2`, respectivement.

- `datadog-cdk-constructs-v2` requiert Node 14+, tandis que `datadog-cdk-constructs-v1` prend en charge Node 12+.
- Mis à part cela, les deux packages s'utilisent de la même façon.

## Installation du package avec npm :

Pour une utilisation avec AWS CDK v2 :
```
yarn add --dev datadog-cdk-constructs-v2
# ou
npm install datadog-cdk-constructs-v2 --save-dev
```

Pour une utilisation avec AWS CDK v1 :
```
yarn add --dev datadog-cdk-constructs
# ou
npm install datadog-cdk-constructs --save-dev
```

## Installation du package avec PyPI

Pour une utilisation avec AWS CDK v2 :
```
pip install datadog-cdk-constructs-v2
```

Pour une utilisation avec AWS CDK v1 :
```
pip install datadog-cdk-constructs
```

### Remarque :

Vérifiez la sortie de votre gestionnaire de packages, car la bibliothèque CDK Construct Datadog possède des dépendances de pairs.

## Utilisation

### AWS CDK

- _Si vous débutez avec AWS CDK, consultez cet [atelier][14] (en anglais)._
- _Les exemples de ce guide sont basés sur AWS CDK v2. Si vous utilisez CDK v1, importez `datadog-cdk-constructs` au lieu de `datadog-cdk-constructs-v2`._

Ajoutez ce qui suit à votre pile CDK :

```typescript
import { Datadog } from "datadog-cdk-constructs-v2";

const datadog = new Datadog(this, "Datadog", {
  nodeLayerVersion: <VERSION_COUCHE>,
  pythonLayerVersion: <VERSION_COUCHE>,
  addLayers: <BOOLÉEN>,
  extensionLayerVersion: "<VERSION_EXTENSION>",
  forwarderArn: "<ARN_FORWARDER>",
  flushMetricsToLogs: <BOOLÉEN>,
  site: "<SITE>",
  apiKey: "{Datadog_API_Key}",
  apiKeySecretArn: "{Secret_ARN_Datadog_API_Key}",
  apiKmsKey: "{Encrypted_Datadog_API_Key}",
  enableDatadogTracing: <BOOLÉEN>,
  enableDatadogLogs: <BOOLÉEN>,
  injectLogContext: <BOOLÉEN>,
  logLevel: <CHAÎNE>,
  env: <CHAÎNE>, // Facultatif
  service: <CHAÎNE>, // Facultatif
  version: <CHAÎNE>, // Facultatif
  tags: <CHAÎNE>, // Facultatif
});
datadog.addLambdaFunctions([<FONCTIONS_LAMBDA>])
datadog.addForwarderToNonLambdaLogGroups([<GROUPES_DE_LOGS>])
```

Si vous souhaitez activer [l'intégration du code source](https://docs.datadoghq.com/integrations/guide/source-code-integration/) (Typescript uniquement), vous devez apporter quelques modifications à la configuration de votre pile. En effet, AWS CDK ne prend pas en charge les fonctions asynchrones.

Indiquez ce qui suit dans votre fonction d'initialisation, afin de passer la valeur `gitHash` au CDK :

```typescript
async function main() {
  // Bien ajouter @datadog/datadog-ci via votre gestionnaire de packages
  const datadogCi = require("@datadog/datadog-ci");
  const gitHash = await datadogCi.gitMetadata.uploadGitCommitHash('{Datadog_API_Key}', '<SITE>')

  const app = new cdk.App();
  // Passer la valeur au constructor ExampleStack dans le hash
  new ExampleStack(app, "ExampleStack", {}, gitHash);
}
```

Indiquez ce qui suit dans le constructor de votre pile afin d'ajouter un paramètre `gitHash` facultatif et d'appeler `addGitCommitMetadata()` :

```typescript
export class ExampleStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps, gitHash?: string) {
    ...
    ...
    datadog.addGitCommitMetadata([<VOS_FONCTIONS>], gitHash)
  }
}
```

## Configuration

Pour poursuivre la configuration de votre construct Datadog, utilisez les paramètres personnalisés suivants :

_Remarque_: les descriptions font référence aux paramètres de package pour npm, mais les paramètres de package pour PyPI sont également valables.

| Paramètre de package pour npm | Paramètre de package pour PyPI | Description |
| --- | --- | --- |
| `addLayers` | `add_layers` | Détermine si les couches Lambda doivent être ajoutées ou si l'utilisateur ajoutera les siennes. Valeur par défaut : true. Lorsque ce paramètre est défini sur true, les variables de version de bibliothèque Lambda sont également requises. Lorsqu'il est défini sur false, vous devez ajouter la bibliothèque Lambda Datadog aux packages de déploiement de vos fonctions. |
| `pythonLayerVersion` | `python_layer_version` | Version de la couche Lambda Python à installer, par exemple 21. Obligatoire si vous déployez au moins une fonction Lambda écrite en Python et que le paramètre `addLayers` est défini sur true. Pour trouver le numéro de version le plus récent, consultez [cette page][5]. |
| `nodeLayerVersion` | `node_layer_version` | Version de la couche Lambda Node.js à installer, par exemple 29. Obligatoire si vous déployez au moins une fonction Lambda écrite en Node.js et que le paramètre `addLayers` est défini sur true. Pour trouver le numéro de version le plus récent, consultez [cette page][6]. |
| `extensionLayerVersion` | `extension_layer_version` | Version de la couche d'extension Lambda Datadog à installer, par exemple 5. Lorsque le paramètre `extensionLayerVersion` est défini, `apiKey` (ou, en cas de chiffrement, `apiKMSKey` ou `apiKeySecretArn`) doit également être défini. Si les groupes de logs des fonctions Lambda sont activés, le Forwarder ne s'y abonne pas. Consultez [cette page][12] pour en savoir plus sur l'extension Lambda. |
| `forwarderArn` | `forwarder_arn` | Lorsque ce paramètre est défini, le plug-in abonne automatiquement le Forwarder Datadog aux groupes de logs des fonctions. Ne définissez pas `forwarderArn` si `extensionLayerVersion` est défini. |
| `flushMetricsToLogs` | `flush_metrics_to_logs` | Permet d'envoyer des métriques custom à l'aide des logs via la fonction Lambda du Forwarder Datadog (recommandé). Valeur par défaut : `true`. Si vous désactivez ce paramètre, vous devez définir `apiKey` (ou, en cas de chiffrement, `apiKMSKey` ou `apiKeySecretArn`). |
| `site` | `site` | Permet de définir le site Datadog auquel envoyer les données. Ce paramètre est uniquement utilisé lorsque `flushMetricsToLogs` est défini sur `false` ou lorsque `extensionLayerVersion` est défini. Valeurs acceptées : `datadoghq.com`, `datadoghq.eu`, `us3.datadoghq.com`, `us5.datadoghq.com` et `ddog-gov.com`. Valeur par défaut : `datadoghq.com`. |
| `apiKey` | `api_key` | Clé d'API Datadog, nécessaire uniquement lorsque `flushMetricsToLogs` est défini sur `false` ou lorsque `extensionLayerVersion` est défini. Pour savoir comment obtenir une clé d'API Datadog, consultez la [documentation dédiée aux clés d'API][8]. |
| `apiKeySecretArn` | `api_key_secret_arn` | ARN du secret dans lequel est stockée la clé d'API Datadog dans AWS Secrets Manager. Utilisez ce paramètre au lieu de `apiKey` lorsque `flushMetricsToLogs` est défini sur `false` ou lorsque `extensionLayer` est défini. N'oubliez pas d'ajouter l'autorisation `secretsmanager:GetSecretValue` au rôle d'exécution Lambda. |
| `apiKmsKey` | `api_kms_key` | Clé d'API Datadog chiffrée via KMS. Utilisez ce paramètre au lieu de `apiKey` lorsque `flushMetricsToLogs` est défini sur `false` ou lorsque `extensionLayerVersion` est défini et que vous utilisez le chiffrement KMS. |
| `enableDatadogTracing` | `enable_datadog_tracing` | Permet d'activer le tracing Datadog sur vos fonctions Lambda. Valeur par défaut : `true`. |
| `enableDatadogLogs` | `enable_datadog_logs` | Permet d'envoyer des logs de fonction Lambda à Datadog via l'extension Lambda Datadog. Valeur par défaut : `true`. Remarque : ce paramètre n'a aucune incidence sur les logs envoyés via le Forwarder Datadog. |
| `injectLogContext` | `inject_log_context` | Lorsque ce paramètre est défini, la couche Lambda corrige automatiquement console.log en indiquant les ID de trace de Datadog. Valeur par défaut : `true`. |
| `logLevel` | `log_level` | Lorsque ce paramètre est défini sur `debug`, la bibliothèque et l'extension Lambda Datadog ajoutent des informations supplémentaires dans les logs afin de simplifier le dépannage des problèmes. |
| `env` | `env` | Lorsque ce paramètre et `extensionLayerVersion` sont définis, une variable d'environnement `DD_ENV` est ajoutée à toutes les fonctions Lambda avec la valeur fournie. Lorsque ce paramètre et `forwarderArn` sont définis, un tag `env` est ajouté à toutes les fonctions Lambda avec la valeur fournie. |
| `service` | `service` | Lorsque ce paramètre et `extensionLayerVersion` sont définis, une variable d'environnement `DD_SERVICE` est ajoutée à toutes les fonctions Lambda avec la valeur fournie. Lorsque ce paramètre et `forwarderArn` sont définis, un tag `service` est ajouté à toutes les fonctions Lambda avec la valeur fournie. |
| `version` | `version` | Lorsque ce paramètre et `extensionLayerVersion` sont définis, une variable d'environnement `DD_VERSION` est ajoutée à toutes les fonctions Lambda avec la valeur fournie. Lorsque ce paramètre et `forwarderArn` sont définis, un tag `version` est ajouté à toutes les fonctions Lambda avec la valeur fournie. |
| `tags` | `tags` | Chaîne unique composée de paires key:value séparées par des virgules. Lorsque ce paramètre et `extensionLayerVersion` sont définis, une variable d'environnement `DD_TAGS` est ajoutée à toutes les fonctions Lambda avec la valeur fournie. Lorsque ce paramètre et `forwarderArn` sont définis, le CDK parse la chaîne et définit chaque paire key:value sous la forme d'un tag pour toutes les fonctions Lambda. |

**Remarque** : les paramètres `env`, `service`, `version` et `tags` sont prioritaires par rapport aux variables d'environnement `DD_XXX` au niveau des fonctions.
### Tracing

Activez le tracing X-Ray sur vos fonctions Lambda. Pour en savoir plus, consultez la [documentation d'AWS CDK][9] (en anglais).

```typescript
import * as lambda from "aws-cdk-lib/aws-lambda";

const lambda_function = new lambda.Function(this, "HelloHandler", {
  runtime: lambda.Runtime.NODEJS_14_X,
  code: lambda.Code.fromAsset("lambda"),
  handler: "hello.handler",
  tracing: lambda.Tracing.ACTIVE,
});
```

### Piles imbriquées

Ajoutez le CDK Construct Datadog à chaque pile que vous souhaitez instrumenter avec Datadog. L'exemple ci-dessous initialise le CDK Construct Datadog et appelle `addLambdaFunctions()` dans les piles `RootStack` et `NestedStack`.

```typescript
import { Datadog } from "datadog-cdk-constructs-v2";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

class RootStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    new NestedStack(this, "NestedStack");

    const datadog = new Datadog(this, "Datadog", {
      nodeLayerVersion: <VERSION_COUCHE>,
      pythonLayerVersion: <VERSION_COUCHE>,
      addLayers: <BOOLÉEN>,
      forwarderArn: "<ARN_FORWARDER>",
      flushMetricsToLogs: <BOOLÉEN>,
      site: "<SITE>",
      apiKey: "{Datadog_API_Key}",
      apiKeySecretArn: "{Secret_ARN_Datadog_API_Key}",
      apiKmsKey: "{Encrypted_Datadog_API_Key}",
      enableDatadogTracing: <BOOLÉEN>,
      enableDatadogLogs: <BOOLÉEN>,
      injectLogContext: <BOOLÉEN>
    });
    datadog.addLambdaFunctions([<FONCTIONS_LAMBDA>]);

  }
}

class NestedStack extends cdk.NestedStack {
  constructor(scope: Construct, id: string, props?: cdk.NestedStackProps) {
    super(scope, id, props);

    const datadog = new Datadog(this, "Datadog", {
      nodeLayerVersion: <VERSION_COUCHE>,
      pythonLayerVersion: <VERSION_COUCHE>,
      addLayers: <BOOLÉEN>,
      forwarderArn: "<ARN_FORWARDER>",
      flushMetricsToLogs: <BOOLÉEN>,
      site: "<SITE>",
      apiKey: "{Datadog_API_Key}",
      apiKeySecretArn: "{Secret_ARN_Datadog_API_Key}",
      apiKmsKey: "{Encrypted_Datadog_API_Key}",
      enableDatadogTracing: <BOOLÉEN>,
      enableDatadogLogs: <BOOLÉEN>,
      injectLogContext: <BOOLÉEN>
    });
    datadog.addLambdaFunctions([<FONCTIONS_LAMBDA>]);

  }
}
```

### Tags

Ajoutez des tags à vos constructs. Il est recommandé de définir les tags `env` et `service` afin de lier les données de télémétrie Datadog entre elles. Pour en savoir plus, consultez [cette page][10] et [cette autre page][11] de la documentation AWS CDK (en anglais).

## Fonctionnement

Le CDK Construct Datadog se base sur une liste des fonctions Lambda et installe la bibliothèque Lambda Datadog, en associant les couches Lambda pour [Node.js][2] et [Python][1] à vos fonctions. Il effectue une redirection vers un gestionnaire de remplacement, qui initialise la bibliothèque Lambda sans avoir à modifier le code. Les configurations supplémentaires ajoutées au CDK Construct Datadog sont converties en variables d'environnement pertinentes sous chaque fonction Lambda (le cas échéant).

Tandis que les groupes de logs basés sur les fonctions Lambda sont gérés automatiquement par la méthode `addLambdaFunctions`, le construct possède une autre fonction, `addForwarderToNonLambdaLogGroups`, qui abonne le Forwarder aux groupes de logs supplémentaires de votre choix.


## Ressources pédagogiques sur le CDK

- [Atelier TypeScript sur le CDK](https://cdkworkshop.com/20-typescript.html)
- [Vidéo de présentation et de démonstration du CDK par AWS](https://youtu.be/ZWCvNFUN-sU)
- [Concepts liés au CDK](https://youtu.be/9As_ZIjUGmY)

## Structure du référentiel

Dans ce référentiel, les dossiers `v1` et `v2` correspondent aux packages `datadog-cdk-constructs` et `datadog-cdk-contructs-v2`. Chacun d'entre eux peut être considéré comme un projet unique (il s'agit d'un projet Projen avec des dépendances, fichiers de configuration, tests et scripts distincts).

Le référentiel comprend également le dossier `common`, qui contient les logiques communes aux packages `v1` et `v2`. À cette fin, un lien symbolique est créé entre le dossier `common` de `v1/src` et `v2/src` et le dossier `common` à la racine du référentiel.

## Utiliser Projen

Les bibliothèques CDK Construct Datadog `v1` et `v2` utilisent toutes les deux Projen pour gérer les fichiers de configuration des projets, par exemple `package.json`, `.gitignore`, `.npmignore`, etc. La plupart de ces fichiers sont protégés par Projen via des autorisations de lecture seule. Pour pouvoir y apporter des modifications, modifiez le fichier `.projenrc.js` du dossier `v1` ou `v2`, puis exécutez `npx projen` (dans `v1` ou `v2`) afin de synthétiser les nouveaux changements. Consultez le [réferentiel Projen][13] pour en savoir plus.

## Créer un ticket

Si vous rencontrez un bug avec ce package, faites-le-nous savoir. Avant de créer un ticket, vérifiez que le problème n'a pas déjà été signalé dans les tickets existants pour éviter les doublons.

Lorsque vous créez un ticket, indiquez la version du CDK Construct Datadog, la version de Node et la stack trace, si possible. Spécifiez aussi les étapes à reproduire le cas échéant.

Vous pouvez également créer un ticket pour demander l'ajout d'une fonctionnalité.

## Contributions

Si vous rencontrez un problème avec ce package et que vous avez un correctif, n'hésitez pas à faire une pull request en suivant la [procédure](https://github.com/DataDog/datadog-cdk-constructs/blob/main/CONTRIBUTING.md).

## Effectuer des tests

Si vous avez contribué à ce package, vous pouvez exécuter des tests à l'aide de la commande `yarn test` dans le dossier `v1` ou `v2`. Ce package inclut également un exemple d'application pour effectuer des tests manuels :

1. Ouvrez une fenêtre de terminal distincte et accédez à `v1` ou `v2` via la commande `cd`.
2. Exécutez `yarn watch` pour vérifier que les fichiers Typescript dans le répertoire `src` sont compilés en Javascript dans le répertoire `lib`.
3. Accédez à `src/sample`, puis modifiez `index.ts` pour tester manuellement vos contributions.
4. À la racine du répertoire `v1` ou `v2` (selon le répertoire sur lequel vous travaillez), exécutez `npx cdk --app lib/sample/index.js <COMMANDE_CDK>`, en prenant soin de remplacer `<COMMANDE_CDK>` par des commandes CDK standard, comme `synth`, `diff` ou `deploy`.

- Si vous recevez l'erreur « … is not authorized to perform: … », sachez que vous devrez peut-être autoriser les commandes avec vos identifiants AWS.

### Logs de debugging

Pour afficher les logs de debugging de cette bibliothèque, définissez la variable d'environnement `DD_CONSTRUCT_DEBUG_LOGS` sur `true` lors de l'exécution de `cdk synth` (indiquez `--quiet` pour ne pas afficher la sortie du modèle généré).

Exemple :
_Vérifiez que vous vous trouvez à la racine du répertoire `v1` ou `v2`_

```
DD_CONSTRUCT_DEBUG_LOGS=true npx cdk --app lib/sample/index.js synth --quiet
```

## Communauté

Si vous avez des commentaires ou des questions concernant les fonctionnalités, rejoignez le canal `#serverless` de la [communauté Slack Datadog](https://chat.datadoghq.com/).

## Licence

Sauf indication contraire, tous les fichiers de ce référentiel sont distribués sous licence Apache version 2.0.

Ce produit inclut un logiciel développé par Datadog (https://www.datadoghq.com/). Copyright 2021 Datadog, Inc.

[1]: https://github.com/DataDog/datadog-lambda-layer-python
[2]: https://github.com/DataDog/datadog-lambda-layer-js
[3]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-macros.html
[4]: https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_core.Stack.html
[5]: https://github.com/DataDog/datadog-lambda-python/releases
[6]: https://github.com/DataDog/datadog-lambda-js/releases
[7]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-logs-subscriptionfilter.html
[8]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#api-keys
[9]: https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-lambda.Tracing.html
[10]: https://docs.aws.amazon.com/cdk/latest/guide/tagging.html
[11]: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.Tags.html
[12]: https://docs.datadoghq.com/fr/serverless/datadog_lambda_library/extension/
[13]: https://github.com/projen/projen
[14]: https://cdkworkshop.com/15-prerequisites.html