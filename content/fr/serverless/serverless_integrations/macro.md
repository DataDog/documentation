---
dependencies:
- "https://github.com/DataDog/datadog-cloudformation-macro/blob/master/serverless/README.md"
kind: documentation
title: Macro Serverless Datadog
---
![build_sans_serveur](https://github.com/DataDog/datadog-cloudformation-macro/workflows/build_serverless/badge.svg)
[![Slack](https://chat.datadoghq.com/badge.svg?bg=632CA6)](https://chat.datadoghq.com/)

Datadog recommande la macro Serverless CloudFormation pour les clients qui utilisent AWS SAM ou AWS CDK pour déployer leurs applications sans serveur.

Le plug-in configure automatiquement l'ingestion de métriques, de traces et de logs depuis vos applications sans serveur en effectuant les opérations suivantes :

- Installation et configuration de la bibliothèque Lambda Datadog pour vos fonctions Lambda [Python][1] et [Node.js][2].
- Activation de la collecte de métriques Lambda optimisées et de métriques custom depuis vos fonctions Lambda.
- Gestion des abonnements du Forwarder Datadog aux groupes de logs de votre fonction Lambda.

## Installation

Pour activer la macro dans votre compte AWS, vous devez déployer une pile CloudFormation avec un modèle fourni par Datadog. Ce déploiement comprend une ressource de macro CloudFormation et une fonction Lambda qui est invoquée lorsque la macro est exécutée. Le déploiement de cette pile vous permet d'utiliser la macro sur d'autres piles CloudFormation déployées dans le même compte. Pour découvrir comment définir une macro dans votre compte, consultez la [documentation de CloudFormation][3].

S'il s'agit d'une première installation, procédez au déploiement comme suit :
```bash
aws cloudformation create-stack \
  --stack-name datadog-serverless-macro \
  --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
  --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

Si vous mettez à jour la macro après la sortie d'une nouvelle version, utilisez plutôt la méthode `update-stack` avec les mêmes paramètres. Vous pouvez également installer la version de votre choix en consultant la page des [dernières versions](https://github.com/DataDog/datadog-cloudformation-macro/releases) et en remplaçant `latest.yml` par le nom de la version. Exemple : `0.1.2.yml`.
```bash
aws cloudformation update-stack \
  --stack-name datadog-serverless-macro \
  --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
  --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

**Remarque :** il vous suffit de déployer la macro une fois pour une région donnée dans votre compte pour pouvoir l'utiliser pour toutes les piles CloudFormation déployées dans cette même région.

## Utilisation

### AWS SAM

Pour déployer votre application sans serveur avec SAM, ajoutez la macro Serverless CloudFormation de Datadog dans la section `Transform` de votre fichier `template.yml`, après la transformation SAM requise :

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      pythonLayerVersion: "<VERSION_COUCHE>" # Utiliser nodeLayerVersion pour Node.js
      stackName: !Ref "AWS::StackName"
      forwarderArn: "<ARN_FORWARDER>"
      service: "<SERVICE>" # Facultatif
      env: "<ENV>" # Facultatif
      # Pour des paramètres supplémentaires, consultez la section Configuration
```

### AWS CDK

Pour déployer votre application sans serveur avec CDK, ajoutez la macro Serverless CloudFormation de Datadog à votre constructeur d'[objet Stack][4].

**TypeScript**
```typescript
import * as cdk from "@aws-cdk/core";

class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    this.addTransform("DatadogServerless");

    new cdk.CfnMapping(this, "Datadog", {
      mapping: {
        Parameters: {
          nodeLayerVersion: "<VERSION_COUCHE>",
          forwarderArn: "<ARN_FORWARDER>",
          stackName: this.stackName,
          service: "<SERVICE>", // Facultatif
          env: "<ENV>", // Facultatif
          // Pour des paramètres supplémentaires, consultez la section Configuration
        },
      },
    });
  }
}
```

**Python**
```python
from aws_cdk import core

class CdkStack(core.Stack):
  def __init__(self, scope: core.Construct, id: str, **kwargs) -> None:
    super().__init__(scope, id, **kwargs)
    self.add_transform("DatadogServerless")

    mapping = core.CfnMapping(self, "Datadog",
      mapping={
        "Parameters": {
          "pythonLayerVersion": "<VERSION_COUCHE>",
          "forwarderArn": "<ARN_FORWARDER>",
          "stackName": self.stackName,
          "service": "<SERVICE>",  # Facultatif
          "env": "<ENV>",  # Facultatif
          # Pour des paramètres supplémentaires, consultez la section Configuration
        }
      })
```

Remarque : pour les déploiements SAM et CDK, si vous n'avez pas modifié le fichier `template.yml` fourni lorsque vous avez installé la macro, le nom de la macro défini dans votre compte sera alors `DatadogServerless`. Si vous avez modifié le modèle d'origine, assurez-vous que le nom de la transformation que vous ajoutez ici correspond à celui indiqué dans la propriété `Name` de la ressource `AWS::CloudFormation::Macro`.

## Configuration

Pour réaliser une configuration plus poussée de votre plug-in, utilisez les paramètres personnalisés suivants :

| Paramètre               | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|-------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `addLayers`             | Détermine si les couches Lambda doivent être ajoutées ou si l'utilisateur ajoutera les siennes. Valeur par défaut : true. Lorsque ce paramètre est défini sur true, les variables de version de bibliothèque Lambda sont également requises. Lorsqu'il est défini sur false, vous devez ajouter la bibliothèque Lambda Datadog aux packages de déploiement de vos fonctions.                                                                                                                                                                                                                                    |
| `pythonLayerVersion`    | Version de la couche Lambda Python à installer : par exemple, « 21 ». Obligatoire si vous déployez au moins une fonction Lambda écrite en Python et que le paramètre `addLayers` est défini sur true. Pour trouver le numéro de version le plus récent, consultez la page [https://github.com/DataDog/datadog-lambda-python/releases][5].                                                                                                                                                                                                                           |
| `nodeLayerVersion`      | Version de la couche Lambda Node.js à installer : par exemple, « 29 ». Obligatoire si vous déployez au moins une fonction Lambda écrite en Note.js et que le paramètre `addLayers` est défini sur true. Pour trouver le numéro de version le plus récent, consultez la page [https://github.com/DataDog/datadog-lambda-js/releases][6].                                                                                                                                                                                                                             |
| `forwarderArn:`         | Lorsque ce paramètre est défini, le plug-in abonne automatiquement le Forwarder Datadog aux groupes de logs des fonctions. Vous pouvez également définir l'abonnement aux logs à l'aide de la ressource [AWS::Logs::SubscriptionFilter][7]. **Remarque** : la propriété `FunctionName` doit être définie pour les fonctions qui sont déployées pour la première fois, car la macro a besoin du nom de la fonction pour créer les groupes de logs et les filtres d'abonnement. La valeur de la propriété `FunctionName` ne doit contenir AUCUNE fonction CloudFormation, telle que `!Sub`. |
| `stackName`             | Le nom de la pile CloudFormation à déployer. Requis uniquement lorsqu'un `forwarderArn` est spécifié et que le nom des fonctions Lambda est dynamique (lorsque la propriété `FunctionName` n'est pas spécifiée pour une fonction Lambda). Pour en savoir plus sur l'ajout de ce paramètre pour SAM et CDK, consultez les exemples ci-dessous.                                                                                                                                                                                           |
| `flushMetricsToLogs`    | Permet d'envoyer les métriques custom via les logs avec la fonction Lambda du Forwarder Datadog (recommandé). Valeur par défaut : `true`. Lorsque ce paramètre est défini sur `false`, la clé d'API Datadog doit être définie à l'aide de `apiKey` ou `apiKMSKey`.                                                                                                                                                                                                                                                                                       |
| `site`                  | Définit le site Datadog auquel envoyer les données. Nécessaire uniquement lorsque flushMetricsToLogs est défini sur `false`. Valeurs acceptées : `datadoghq.com`, `datadoghq.eu`, `us3.datadoghq.com` et `ddog-gov.com`. Valeur par défaut : `datadoghq.com`.                                                                                                                                                                                                                                                                                                                                 |
| `apiKey`                | La clé d'API Datadog. Nécessaire uniquement lorsque `flushMetricsToLogs` est défini sur `false`.                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `apiKMSKey`             | La clé d'API Datadog chiffrée via KMS. Utilisez ce paramètre au lieu de `apiKey` lorsque `flushMetricsToLogs` est défini sur false et que vous utilisez le chiffrement KMS.                                                                                                                                                                                                                                                                                                                                               |
| `enableEnhancedMetrics` | Permet d'activer les métriques optimisées pour les fonctions Lambda. Valeur par défaut : `true`. La fonction Lambda du Forwarder Datadog doit être abonnée aux groupes de logs des fonctions.                                                                                                                                                                                                                                                                                                                                            |
| `enableXrayTracing`     | Permet d'activer le tracing sur les fonctions Lambda. Valeur par défaut : false.                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `enableDDTracing`       | Permet d'activer le tracing sur les fonctions Lambda via dd-trace, la bibliothèque APM de Datadog. Valeur par défaut : `true`. La fonction Lambda du Forwarder Datadog doit être abonnée aux groupes de logs des fonctions.                                                                                                                                                                                                                                                                                                                       |
| `service`               | Lorsque ce paramètre est défini, la macro ajoute un tag `service` à toutes les fonctions Lambda avec la valeur spécifiée.                                                                                                                                                                                                                                                                                                                                                                                                        |
| `env`                   | Lorsque ce paramètre est défini, la macro ajoute un tag `env` à toutes les fonctions Lambda avec la valeur spécifiée.                                                                                                                                                                                                                                                                                                                                                                                                           |
| `logLevel`              | Le niveau de log. Définir sur `DEBUG` pour un logging étendu. Valeur par défaut : `info`.                                                                                                                                                                                                                                                                                                                                                                                                                          |

## Fonctionnement

Cette macro modifie votre modèle CloudFormation pour installer la bibliothèque Lambda Datadog en associant les couches Lambda pour [Node.js][2] et [Python][1] à vos fonctions. Elle redirige vers un handler de remplacement qui initialise la bibliothèque Lambda sans aucune modification de code requise.


## Dépannage

### Message d'erreur : 'FunctionName' property is undefined for…

Cette erreur se produit lorsque vous spécifiez un `forwarderArn` et que vous déployez votre fonction Lambda pour la première fois : aucun groupe de logs n'existe actuellement et la macro ne peut pas créer ce groupe de logs ni abonner le Forwarder au groupe. Pour corriger ce problème, vous pouvez définir explicitement la propriété `FunctionName` sur votre fonction Lambda (voir l'exemple ci-dessous).

**AWS SAM**
```yml
Resources:
  MyLambda:
    Type: AWS::Serverless::Function
    Properties:
      Handler: index.handler
      Runtime: nodejs12.x
      FunctionName: MyFunctionName # Ajoutez cette propriété à vos fonctions Lambda
```

**AWS CDK (Node.js)**
```js
import * as lambda from "@aws-cdk/aws-lambda";

const myLambda = new lambda.Function(this, "function-id", {
  runtime: lambda.Runtime.NODEJS_12_X,
  code: lambda.Code.fromAsset("lambda"),
  handler: "index.handler",
  functionName: "MyFunctionName", // Ajoutez cette propriété à vos fonctions Lambda
});
```

Si vous ne pouvez pas (ou ne souhaitez pas) définir la propriété `FunctionName` explicitement, supprimez le paramètre `forwarderArn` du modèle SAM ou du code source CDK, et définissez plutôt les filtres d'abonnement à l'aide de la ressource [AWS::Logs::SubscriptionFilter][7] comme indiqué ci-dessous.

**AWS SAM**
```yaml
Resources:
  MyLogSubscriptionFilter:
    Type: "AWS::Logs::SubscriptionFilter"
    Properties:
      DestinationArn: "<ARN_FORWARDER_DATADOG>"
      LogGroupName: "<NOM_GROUPE_LOGS_CLOUDWATCH>"
      FilterPattern: ""
```

**AWS CDK (Node.js)**
```js
import {CfnSubscriptionFilter} from '@aws-cdk/aws-logs';

const subscription = new CfnSubscriptionFilter(this, `DatadogForwarderSubscriptionFilter`, {
    logGroupName: '<NOM_GROUPE_LOGS_CLOUDWATCH>',
    destinationArn: '<ARN_FORWARDER_DATADOG>',
    filterPattern: ''
});
```

### Message d'erreur : 'logGroupNamePrefix' failed to satisfy constraint…

L'option `forwarderArn` ne fonctionne pas lorsque `FunctionName` contient des fonctions CloudFormation, telles que `!Sub`. Dans ce cas, la macro n'a pas accès au nom de fonction réel (CloudFormation exécute les fonctions après les transformations). Par conséquent, elle ne peut pas créer de groupes de logs ni de filtres d'abonnement pour vos fonctions. 

Supprimez le paramètre `forwarderArn` du modèle SAM ou du code source CDK, et définissez plutôt les filtres d'abonnement à l'aide de la ressource [AWS::Logs::SubscriptionFilter][7] comme indiqué ci-dessous.

**AWS SAM**
```yaml
Resources:
  MyLogSubscriptionFilter:
    Type: "AWS::Logs::SubscriptionFilter"
    Properties:
      DestinationArn: "<ARN_FORWARDER_DATADOG>"
      LogGroupName: "<NOM_GROUPE_LOGS_CLOUDWATCH>"
      FilterPattern: ""
```

**AWS CDK (Node.js)**
```js
import {CfnSubscriptionFilter} from '@aws-cdk/aws-logs';

const subscription = new CfnSubscriptionFilter(this, `DatadogForwarderSubscriptionFilter`, {
    logGroupName: '<NOM_GROUPE_LOGS_CLOUDWATCH>',
    destinationArn: '<ARN_FORWARDER_DATADOG>',
    filterPattern: ''
});
```

## Communauté

Si vous avez des commentaires ou des questions concernant les fonctionnalités, rejoignez le canal `#serverless` de la [communauté Slack Datadog](https://chat.datadoghq.com/).

[1]: https://github.com/DataDog/datadog-lambda-layer-python
[2]: https://github.com/DataDog/datadog-lambda-layer-js
[3]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-macros.html
[4]: https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_core.Stack.html
[5]: https://github.com/DataDog/datadog-lambda-python/releases
[6]: https://github.com/DataDog/datadog-lambda-js/releases
[7]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-logs-subscriptionfilter.html
