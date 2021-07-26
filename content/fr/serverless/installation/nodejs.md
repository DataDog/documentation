---
title: Instrumenter des applications Node.js
kind: documentation
further_reading:
  - link: /serverless/serverless_integrations/plugin/
    tag: Documentation
    text: Plug-in Serverless Datadog
  - link: /serverless/serverless_integrations/macro/
    tag: Documentation
    text: Macro Serverless Datadog
  - link: /serverless/serverless_integrations/cli/
    tag: Documentation
    text: CLI Serverless Datadog
  - link: serverless/serverless_tagging/
    tag: Documentation
    text: Tagging d'applications sans serveur
  - link: serverless/distributed_tracing/
    tag: Documentation
    text: Tracing d'applications sans serveur
  - link: serverless/custom_metrics/
    tag: Documentation
    text: Envoyer des métriques custom depuis des applications sans serveur
aliases:
  - /fr/serverless/datadog_lambda_library/nodejs/
  - /fr/serverless/guide/nodejs/
---
## Configuration requise

Si vous ne l'avez pas encore fait, installez l'[intégration AWS][1]. Datadog pourra ainsi ingérer les métriques Lambda depuis AWS. Après avoir installé l'[intégration AWS][1], suivez ces étapes pour instrumenter votre application afin d'envoyer des métriques, des logs et des traces à Datadog.

{{< img src="serverless/serverless_monitoring_installation_instructions.png" alt="Instrumenter des applications sans serveur AWS"  style="width:100%;">}}

Si vous avez déjà configuré le plug-in Serverless Datadog à l'aide du Forwarder Datadog ou si vos fonctions Lambda sont déployées dans la région AWS GovCloud, consultez les [instructions d'installation ici][2].

## Configuration

{{< tabs >}}
{{% tab "Framework Serverless" %}}

Le [plug-in Serverless Datadog][1] ajoute automatiquement la bibliothèque Lambda Datadog à vos fonctions à l'aide des couches Lambda, et configure vos fonctions de sorte à ce qu'elles envoient les métriques, les traces et les logs à Datadog via l'[extension Lambda Datadog][2].

Pour installer et configurer le plug-in Serverless Datadog, suivez les étapes suivantes :

1. Installez le plug-in Serverless Datadog :
      ```
    yarn add --dev serverless-plugin-datadog
    ```
2. Ajoutez ce qui suit dans votre fichier `serverless.yml` :
    ```
    plugins:
      - serverless-plugin-datadog
    ```
3. Ajoutez également la section suivante dans votre fichier `serverless.yml` :
    ```
    custom:
      datadog:
        addExtension: true
        apiKey: # Your Datadog API Key goes here.
    ```
   Recherchez votre clé d'API Datadog sur la [page de gestion des API][3]. Pour prendre connaissance des paramètres supplémentaires, consultez la [documentation du plug-in][1].


[1]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/plugin
[2]: /fr/serverless/libraries_integrations/extension
[3]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "AWS SAM" %}}

La [macro CloudFormation Datadog][1] transforme automatiquement votre modèle d'application SAM dans le but d'ajouter la bibliothèque Lambda Datadog à vos fonctions à l'aide des couches. De plus, elle configure vos fonctions de sorte à ce qu'elles envoient des métriques, des traces et des logs à Datadog via l'[extension Lambda Datadog][2].

### Install

Exécutez la commande suivante avec vos [identifiants AWS][3] pour déployer une pile CloudFormation qui installe la ressource AWS de la macro. Vous ne devez installer la macro qu'une seule fois par région de votre compte. Remplacez `create-stack` par `update-stack` pour mettre à jour la macro vers la dernière version.

```sh
aws cloudformation create-stack \
  --stack-name datadog-serverless-macro \
  --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
  --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

La macro est désormais déployée et utilisable.

### Instrumenter

Dans votre fichier `template.yml`, ajoutez ce qui suit dans la section `Transform`, **après** la transformation `AWS::Serverless` pour SAM.

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      stackName: !Ref "AWS::StackName"
      nodeLayerVersion: "<VERSION_COUCHE>"
      extensionLayerVersion: "<VERSION_EXTENSION>"
      service: "<SERVICE>" # Facultatif
      env: "<ENV>" # Facultatif
```

Remplacez `<SERVICE>` et `<ENV>` par les valeurs appropriées, `<VERSION_COUCHE>` par la [version de votre choix][4] de la bibliothèque Lambda Datadog, et `<VERSION_EXTENSION>` par la [version de votre choix][5] de l'extension Lambda Datadog.

Pour obtenir plus de détails ainsi que des paramètres supplémentaires, consultez la [documentation relative à la macro][1].


[1]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/macro
[2]: /fr/serverless/libraries_integrations/extension
[3]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
[4]: https://github.com/DataDog/datadog-lambda-js/releases
[5]: https://gallery.ecr.aws/datadog/lambda-extension
{{% /tab %}}
{{% tab "AWS CDK" %}}

La [bibliothèque CDK Constructs Datadog][1] ajoute automatiquement la bibliothèque Lambda Datadog à vos fonctions à l'aide des couches Lambda, et configure vos fonctions de sorte à ce qu'elles envoient les métriques, les traces et les logs à Datadog via l'[extension Lambda Datadog][2].

### Installer la bibliothèque CDK Constructs Datadog

Exécutez la commande Yarn ou NPM suivante dans votre projet CDK pour installer la bibliothèque CDK Constructs Datadog :

```sh
#Yarn
yarn add --dev datadog-cdk-constructs

#NPM
npm install datadog-cdk-constructs --save-dev
```

### Instrumenter la fonction

Importez le module `datadog-cdk-construct` dans votre application AWS CDK et ajoutez les configurations suivantes :

```typescript
import * as cdk from "@aws-cdk/core";
import { Datadog } from "datadog-cdk-constructs";

class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const datadog = new Datadog(this, "Datadog", { 
        nodeLayerVersion: <VERSION_COUCHE>, 
        extensionLayerVersion: <VERSION_EXTENSION>, 
        apiKey: <CLÉ_API_DATADOG>,
    });
    datadog.addLambdaFunctions([<FONCTIONS_LAMBDA>]);    
  }
}
```

Pour remplir les paramètres fictifs, procédez comme suit :

- Remplacez `<DATADOG_API_KEY>` par votre clé d'API Datadog sur la [page de gestion des API][3].
- Remplacez `<VERSION_COUCHE>` par la version de votre choix de la couche Lambda Datadog (consultez les [dernières versions][2]).
- Remplacez `<VERSION_EXTENSION>` par la version de votre choix de l'extension Lambda Datadog (consultez les [dernières versions][4]).

Pour obtenir plus de détails ainsi que des paramètres supplémentaires, consultez la [page NPM relative au CDK Datadog][1] (en anglais).


[1]: https://www.npmjs.com/package/datadog-cdk-constructs
[2]: https://github.com/DataDog/datadog-lambda-js/releases
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://gallery.ecr.aws/datadog/lambda-extension
{{% /tab %}}
{{% tab "Interface de ligne de commande Datadog" %}}

<div class="alert alert-warning">Ce service est en bêta publique. Si vous souhaitez nous faire part de vos remarques, contactez l'<a href="/help">assistance Datadog</a>.</div>

Utilisez l'interface de ligne de commande Datadog pour configurer l'instrumentation sur vos fonctions Lambda dans vos pipelines CI/CD. La commande de l'interface de ligne de commande ajoute automatiquement la bibliothèque Lambda Datadog à vos fonctions à l'aide des couches Lambda. Elle configure vos fonctions de façon à envoyer des métriques, traces et logs à Datadog.

### Install

Installez l'interface de ligne de commande Datadog avec NPM ou Yarn :

```sh
# NPM
npm install -g @datadog/datadog-ci

# Yarn
yarn global add @datadog/datadog-ci
```

### Instrumenter

Pour instrumenter la fonction, exécutez la commande suivante avec vos [identifiants AWS][1]. Remplacez `<nomfonction>` et `<autre_nomfonction>` par les noms de vos fonctions Lambda, `<région_aws>` par le nom de la région AWS, `<version_couche>` par la [version de votre choix][2] de la bibliothèque Lambda Datadog et `<version_extension>` par la [version de votre choix][3] de l'extension Lambda Datadog.

```sh
datadog-ci lambda instrument -f <nomfonction> -f <autre_nomfonction> -r <région_aws> -v <version_couche> -e <version_extension>
```

Par exemple :

{{< site-region region="us,us3,eu" >}}

```sh
datadog-ci lambda instrument -f my-function -f another-function -r us-east-1 -v 26 -e 8
```

{{< /site-region >}}
{{< site-region region="gov" >}}

```sh
datadog-ci lambda instrument -f my-function -f another-function -r us-east-1 -v 26 -e 8
```
{{< /site-region >}}

Pour obtenir plus de détails ainsi que des paramètres supplémentaires, consultez la [documentation relative à l'interface de ligne de commande][4].

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://github.com/DataDog/datadog-lambda-js/releases
[3]: https://gallery.ecr.aws/datadog/lambda-extension
[4]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Image de conteneur" %}}

### Install

Si vous déployez votre fonction Lambda en tant qu'image de conteneur, vous ne pouvez pas utiliser la bibliothèque Lambda Datadog en tant que couche Lambda. À la place, vous devez installer la bibliothèque Lambda Datadog en tant que dépendance de votre fonction directement dans l'image. Si vous utilisez le tracing Datadog, vous devez également installer `dd-trace`.

**NPM** :

```sh
npm install --save datadog-lambda-js dd-trace
```

**Yarn** :

```sh
yarn add datadog-lambda-js dd-trace
```

**Remarque** : la version mineure du package `datadog-lambda-js` correspond toujours à la version de la couche. Par exemple, `datadog-lambda-js v0.5.0` correspond au contenu de la version 5 de la couche.

### Configurer


### Installer l'extension Lambda Datadog

Ajoutez l'extension Lambda Datadog à votre image de conteneur en ajoutant ce qui suit à votre Dockerfile :

```
COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/extensions/ /opt/extensions
```

Remplacez `<TAG>` par un numéro de version spécifique (par exemple, `7`) ou par `latest`. Accédez au [référentiel Amazon ECR][1] pour consulter la liste complète des tags disponibles.

### Configurer la fonction

1. Définissez la valeur `CMD` de votre image sur `node_modules/datadog-lambda-js/dist/handler.handler`. Vous pouvez effectuer cette opération dans AWS ou directement dans votre Dockerfile. **Remarque** : la valeur définie dans AWS remplace la valeur définie dans le Dockerfile, si vous avez défini les deux.
2. Définissez les variables d'environnement suivantes dans  AWS :
  - Définissez `DD_LAMBDA_HANDLER` sur votre gestionnaire d'origine, par exemple `myfunc.handler`.
  - Définissez `DD_TRACE_ENABLED` sur `true`.
  - Définissez `DD_FLUSH_TO_LOG` sur `true`.
  - Définissez `DD_API_KEY` sur votre clé d'API Datadog sur la [page de gestion des API][2]. 
3. Si vous le souhaitez, ajoutez des tags `service` et `env` avec les valeurs appropriées dans votre fonction.

[1]: https://gallery.ecr.aws/datadog/lambda-extension
[2]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Personnalisé" %}}

### Install

La bibliothèque Lambda Datadog peut être importée en tant que couche ou en tant que package JavaScript.

La version mineure du package `datadog-lambda-js` correspond toujours à la version de la couche. Par exemple, datadog-lambda-js v0.5.0 correspond au contenu de la version 5 de la couche.

#### Utiliser la couche

[Configurez les couches][1] pour votre fonction Lambda à l'aide de l'ARN, en respectant le format suivant :

{{< site-region region="us,us3,eu" >}} 

```
arn:aws:lambda:<RÉGION_AWS>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>
```

{{< /site-region >}}
{{< site-region region="gov" >}}

```
arn:aws-us-gov:lambda:<RÉGION_AWS>:002406178527:layer:Datadog-<RUNTIME>:<VERSION>
```
{{< /site-region >}}

Les options `RUNTIME` disponibles sont `Node10-x` et `Node12-x`. Pour `VERSION`, consultez la [dernière version][2]. Exemple :

{{< site-region region="us,us3,eu" >}} 

```
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Node12-x:25
```

{{< /site-region >}}
{{< site-region region="gov" >}}

```
arn:aws-us-gov:lambda:us-gov-east-1:002406178527::layer:Datadog-Node12-x:25
```

{{< /site-region >}}

#### Utiliser le package

**NPM** :

```
npm install --save datadog-lambda-js
```

**Yarn** :

```
yarn add datadog-lambda-js
```

Consultez la [dernière version][3].


### Installer l'extension Lambda Datadog

[Configurez les couches][1] pour votre fonction Lambda à l'aide de l'ARN, en respectant le format suivant :

{{< site-region region="us,us3,eu" >}} 

```
arn:aws:lambda:<RÉGION_AWS>:464622532012:layer:Datadog-Extension:<VERSION_EXTENSION>
```

{{< /site-region >}}
{{< site-region region="gov" >}}

```
arn:aws-us-gov:lambda:<RÉGION_AWS>:002406178527:layer:Datadog-Extension:<VERSION_EXTENSION>
```

{{< /site-region >}}

Pour `VERSION_EXTENSION`, consultez la [dernière version][4].

### Configurer

Pour configurer la fonction, suivez les étapes ci-dessous :

1. Définissez le gestionnaire de votre fonction sur `/opt/nodejs/node_modules/datadog-lambda-js/handler.handler` si vous utilisez la couche, ou sur `node_modules/datadog-lambda-js/dist/handler.handler` si vous utilisez le package.
2. Définissez la variable d'environnement `DD_LAMBDA_HANDLER` sur votre gestionnaire d'origine, comme `myfunc.handler`.
3. Définissez la variable d'environnement `DD_TRACE_ENABLED` sur `true`.
4. Définissez la variable d'environnement `DD_API_KEY` sur votre clé d'API Datadog, disponible sur la [page de gestion des API][5]. 
5. Vous pouvez également définir des tags `service` et `env` pour votre fonction avec des valeurs correspondantes.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://github.com/DataDog/datadog-lambda-layer-js/releases
[3]: https://www.npmjs.com/package/datadog-lambda-js
[4]: https://gallery.ecr.aws/datadog/lambda-extension
[5]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{< /tabs >}}

## Explorer la surveillance sans serveur de Datadog

Après avoir configuré votre fonction en suivant la procédure ci-dessus, vous pouvez visualiser vos métriques, logs et traces sur la [page Serverless principale][3].

### Tagging de service unifié

Bien que cette opération soit facultative, Datadog vous recommande fortement d'ajouter les tags `env`, `service` et `version` à vos applications sans serveur. Pour ce faire, suivez la [documentation relative au tagging de service unifié][4].

### Collecter les logs à partir des ressources sans serveur AWS

Les logs d'un environnement sans serveur générés par des ressources gérées, outre les fonctions Lambda AWS, peuvent être très utiles pour identifier la cause d'origine des problèmes liés à vos applications sans serveur. Nous vous recommandons de transmettre les logs provenant des ressources gérées suivantes à votre environnement :
- API : API Gateway, AppSync, ALB
- Files d'attente et flux : SQS, SNS, Kinesis
- Datastores : DynamoDB, S3, RDS, etc.

Pour collecter des logs depuis des ressources AWS autres que des fonctions Lambda, installez le [Forwarder Datadog][5] et configurez-le de façon à l'abonner à tous les groupes de logs CloudWatch des ressources gérées.

### Surveiller une logique opérationnelle personnalisée

Si vous souhaitez envoyer une métrique custom ou une span personnalisée, consultez l'exemple de code ci-dessous :

```javascript
const { sendDistributionMetric, sendDistributionMetricWithDate } = require("datadog-lambda-js");
const tracer = require("dd-trace");

// Envoyer une span personnalisée appelée "sleep"
const sleep = tracer.wrap("sleep", (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
});

exports.handler = async (event) => {
  // Ajouter des tags personnalisés à la span de la fonction Lambda,
  // ne fonctionne PAS si le tracing X-Ray est activé
  const span = tracer.scope().active();
  span.setTag('customer_id', '123456');

  await sleep(100);

  // Envoyer une span personnalisée
  const sandwich = tracer.trace('hello.world', () => {
    console.log('Hello, World!');
  });

  // Envoyer une métrique custom
  sendDistributionMetric(
    "coffee_house.order_value", // nom de la métrique
    12.45, // valeur de la métrique
    "product:latte", // tag
    "order:online", // autre tag
  );

  // Envoyer une métrique custom avec un timestamp
  sendDistributionMetricWithDate(
    "coffee_house.order_value", // nom de la métrique
    12.45, // valeur de la métrique
    new Date(Date.now()), // date, doit être dans les 20 dernières minutes
    "product:latte", // tag
    "order:online", // autre tag
  );

  const response = {
    statusCode: 200,
    body: JSON.stringify("Hello from serverless!"),
  };
  return response;
};
```

Pour en savoir plus sur l'envoi de métriques custom, consultez [cette page][6]. Pour obtenir plus d'informations sur l'instrumentation personnalisée, consultez la [documentation dédiée][7].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/amazon_web_services/
[2]: /fr/serverless/guide/datadog_forwarder_node
[3]: https://app.datadoghq.com/functions
[4]: /fr/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[5]: /fr/serverless/libraries_integrations/forwarder
[6]: /fr/serverless/custom_metrics?tab=nodejs
[7]: /fr/tracing/custom_instrumentation/nodejs/