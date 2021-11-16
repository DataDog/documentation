---
title: Utilisation du Forwarder Datadog avec Node
kind: guide
---
Si vous découvrez tout juste les capacités sans serveur de Datadog, nous vous recommandons d'utiliser les [fonctionnalités Lambda clés en main][1]. À l'inverse, si vous avez configuré les fonctionnalités sans serveur Datadog à l'aide du Forwarder Datadog, avant que les fonctionnalités Lambda clés en main ne soient proposées, lisez ce guide pour gérer votre instance.

## Configuration requise

Si vous ne l'avez pas encore fait :

- Installez [l'intégration AWS][2]. Datadog pourra ainsi ingérer les métriques Lambda depuis AWS.
- Installez la [fonction Lambda du Forwarder Datadog][3], qui est nécessaire pour l'ingestion des traces, des métriques optimisées, des métriques custom et des logs AWS Lambda.

Après avoir installé l'[intégration AWS][2] et le [Forwarder Datadog][3], suivez les étapes suivantes pour instrumenter votre application afin d'envoyer des métriques, des logs et des traces à Datadog.

## Configuration

{{< tabs >}}
{{% tab "Framework Serverless" %}}

Le [plug-in Serverless Datadog][1] ajoute automatiquement la bibliothèque Lambda Datadog à vos fonctions à l'aide des couches. Il configure également vos fonctions de façon à envoyer des métriques, traces et logs à Datadog par l'intermédiaire du [Forwarder Datadog][2].

Si votre fonction Lambda est configurée de façon à utiliser la signature de code, vous devez ajouter l'ARN du profil de signature de Datadog (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) à la [configuration de la signature de code][3] de votre fonction avant d'installer le plug-in Serverless Datadog.

Pour installer et configurer le plug-in Serverless Datadog, suivez les étapes suivantes :

1. Pour installer le plug-in Serverless Datadog :
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
        forwarderArn: # The Datadog Forwarder ARN goes here.
    ```
    Pour en savoir plus sur l'ARN du Forwarder Datadog ou sur l'installation, cliquez [ici][2]. Pour obtenir des paramètres supplémentaires, consultez la [documentation du plug-in][1].

**Remarque** : si votre fonction Lambda utilise à la fois les bibliothèques de tracing de Datadog et le [webpack][5], vous devez suivre ces [étapes de configuration supplémentaires][4].


[1]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/fr/serverless/forwarder/
[3]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
[4]: /fr/serverless/troubleshooting/serverless_tracing_and_webpack/
[5]: https://webpack.js.org/
{{% /tab %}}
{{% tab "AWS SAM" %}}

La [macro CloudFormation Datadog][1] transforme automatiquement votre modèle d'application SAM dans le but d'ajouter la bibliothèque Lambda Datadog à vos fonctions à l'aide de couches. Elle configure également vos fonctions de façon à envoyer des métriques, traces et logs à Datadog par l'intermédiaire du [Forwarder Datadog][2].

### Installation

Exécutez la commande suivante avec vos [identifiants AWS][3] pour déployer une pile CloudFormation qui installe la ressource AWS de la macro. Vous ne devez installer la macro qu'une seule fois par région de votre compte. Remplacez `create-stack` par `update-stack` pour mettre à jour la macro vers la dernière version.

```sh
aws cloudformation create-stack \
  --stack-name datadog-serverless-macro \
  --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
  --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

La macro est désormais déployée et utilisable.

### Instrumentation

Dans votre fichier `template.yml`, ajoutez ce qui suit dans la section `Transform`, **après** la transformation `AWS::Serverless` pour SAM.

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      stackName: !Ref "AWS::StackName"
      nodeLayerVersion: "<VERSION_COUCHE>"
      forwarderArn: "<ARN_FORWARDER>"
      service: "<SERVICE>" # Facultatif
      env: "<ENVIRONNEMENT>" # Facultatif
```

Remplacez `<SERVICE>` et `<ENVIRONNEMENT>` par les valeurs appropriées, `<VERSION_COUCHE>` par la version de votre choix de la couche Lambda Datadog (voir les [dernières versions][4]) et `<ARN_FORWARDER>` par l'ARN du Forwarder (consultez la [documentation relative au Forwarder][2]).

Si votre fonction Lambda est configurée de façon à utiliser la signature de code, vous devez ajouter l'ARN du profil de signature de Datadog (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) à la [configuration de la signature de code][5] de votre fonction avant de pouvoir utiliser la macro.

Pour obtenir plus de détails ainsi que des paramètres supplémentaires, consultez la [documentation relative à la macro][1].

[1]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/macro
[2]: https://docs.datadoghq.com/fr/serverless/forwarder/
[3]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
[4]: https://github.com/DataDog/datadog-lambda-js/releases
[5]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "AWS CDK" %}}

Les [Constructs CDK Datadog][1] configurent automatiquement l'ingestion des métriques, traces et logs provenant de vos applications sans serveur. Pour ce faire, ils suivent la procédure suivante :

- Installation et configuration de la bibliothèque Lambda Datadog pour vos fonctions Lambda Python et Node.js
- Activation de la collecte de traces et de métriques custom à partir de vos fonctions Lambda
- Gestion des abonnements du Forwarder Datadog aux groupes de logs de votre fonction Lambda

### Installation

Exécutez la commande Yarn ou NPM suivante dans votre projet CDK pour installer la bibliothèque CDK Constructs Datadog :

```sh
#Yarn
yarn add --dev datadog-cdk-constructs

#NPM
npm install datadog-cdk-constructs --save-dev
```

### Instrumentation

Pour instrumenter la fonction, importez le module `datadog-cdk-construct` dans votre application AWS CDK et ajoutez les configurations suivantes (cet exemple est en TypeScript ; la logique est similaire dans d'autres langages) :

```typescript
import * as cdk from "@aws-cdk/core";
import { Datadog } from "datadog-cdk-constructs";

class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const datadog = new Datadog(this, "Datadog", {
      nodeLayerVersion: <VERSION_COUCHE>,
      pythonLayerVersion: <VERSION_COUCHE>,
      addLayers: <BOOLÉEN>,
      forwarderArn: "<ARN_FORWARDER>",
      flushMetricsToLogs: <BOOLÉEN>,
      site: "<SITE>",
      apiKey: "{Clé_API_Datadog}",
      apiKMSKey: "{Clé_API_Datadog_Chiffrée}",
      enableDDTracing: <BOOLÉEN>,
      injectLogContext: <BOOLÉEN>
    });
    datadog.addLambdaFunctions([<FONCTIONS_LAMBDA>])
  }
}
```

Remplacez `<SERVICE>` et `<ENV>` par les valeurs adéquates, `<LAYER_VERSION>` par la version de la couche Lambda Datadog de votre choix (voir les [dernières versions][2]) et `<FORWARDER_ARN>` par l'ARN du Forwarder (voir la [documentation relative au Forwarder][3]).

Si votre fonction Lambda est configurée de façon à utiliser la signature de code, vous devez ajouter l'ARN du profil de signature de Datadog (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) à la [configuration de la signature de code][4] de votre fonction avant de pouvoir utiliser la macro.

Pour en savoir plus et obtenir des paramètres supplémentaires, consultez la [page NPM relative au CDK Datadog][1] (en anglais).


[1]: https://www.npmjs.com/package/datadog-cdk-constructs
[2]: https://github.com/DataDog/datadog-lambda-js/releases
[3]: https://docs.datadoghq.com/fr/serverless/forwarder/
[4]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "Interface de ligne de commande Datadog" %}}

<div class="alert alert-warning">Ce service est en bêta publique. Si vous souhaitez nous faire part de vos remarques, contactez l'<a href="/help">assistance Datadog</a>.</div>

Utilisez l'interface de ligne de commande Datadog pour configurer l'instrumentation sur vos fonctions Lambda dans vos pipelines CI/CD. La commande de l'interface de ligne de commande ajoute automatiquement la bibliothèque Lambda Datadog à vos fonctions à l'aide des couches. Elle configure également vos fonctions de façon à envoyer des métriques, traces et logs à Datadog.

### Installation

Installez l'interface de ligne de commande Datadog avec NPM ou Yarn :

```sh
# NPM
npm install -g @datadog/datadog-ci

# Yarn
yarn global add @datadog/datadog-ci
```

### Instrumentation

Pour instrumenter la fonction, exécutez la commande suivante avec vos [identifiants AWS][1]. Remplacez `<nomfonction>` et `<autre_nomfonction>` par le nom de vos fonctions Lambda, `<région_aws>` par le nom de la région AWS, `<version_couche>` par la version de votre choix de la couche Lambda Datadog (voir les [dernières versions][2]) et `<arn_forwarder>` par l'ARN du Forwarder (consultez la [documentation relative au Forwarder][3]).

```sh
datadog-ci lambda instrument -f <nomfonction> -f <autre_nomfonction> -r <région_aws> -v <version_couche> --forwarder <arn_forwarder>
```

Par exemple :

```sh
datadog-ci lambda instrument -f my-function -f another-function -r us-east-1 -v 26 --forwarder arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder
```

Si votre fonction Lambda est configurée de façon à utiliser la signature de code, vous devez ajouter l'ARN du profil de signature de Datadog (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) à la [configuration de la signature de code][4] de votre fonction avant de pouvoir l'instrumenter avec l'interface de ligne de commande Datadog.

Pour obtenir plus de détails ainsi que des paramètres supplémentaires, consultez la [documentation relative à l'interface de ligne de commande][5].

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://github.com/DataDog/datadog-lambda-js/releases
[3]: https://docs.datadoghq.com/fr/serverless/forwarder/
[4]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
[5]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Image de conteneur" %}}

### Installation

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

### Configuration

Pour configurer la fonction, suivez les étapes ci-dessous :

1. Définissez la valeur `CMD` de votre image sur `node_modules/datadog-lambda-js/dist/handler.handler`. Vous pouvez effectuer cette opération dans AWS ou directement dans votre Dockerfile. **Remarque** : la valeur définie dans AWS remplace la valeur définie dans le Dockerfile, si vous avez défini les deux.
2. Définissez les variables d'environnement suivantes dans  AWS :
  - Définissez `DD_LAMBDA_HANDLER` sur votre gestionnaire d'origine, par exemple `myfunc.handler`.
  - Définissez `DD_TRACE_ENABLED` sur `true`.
  - Définissez `DD_FLUSH_TO_LOG` sur `true`.
3. Si vous le souhaitez, ajoutez des tags `service` et `env` avec les valeurs appropriées dans votre fonction.

### Abonnement

Pour pouvoir envoyer des métriques, traces et logs à Datadog, abonnez la fonction Lambda du Forwarder Datadog à chaque groupe de logs de votre fonction.

1. [Si ce n'est pas déjà fait, installez le Forwarder Datadog][1].
2. [Abonnez le Forwarder Datadog aux groupes de logs de votre fonction][2].


[1]: https://docs.datadoghq.com/fr/serverless/forwarder/
[2]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
{{% /tab %}}
{{% tab "Personnalisé" %}}

### Installation

La bibliothèque Lambda Datadog peut être importée en tant que couche ou en tant que package JavaScript.

La version mineure du package `datadog-lambda-js` correspond toujours à la version de la couche. Par exemple, datadog-lambda-js v0.5.0 correspond au contenu de la version 5 de la couche.

#### Utilisation de la couche

[Configurez les couches][1] pour votre fonction Lambda à l'aide de l'ARN en suivant le format suivant.

```
# Pour les régions standard
arn:aws:lambda:<RÉGION_AWS>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>

# Pour les régions us-gov
arn:aws-us-gov:lambda:<RÉGION_AWS>:002406178527:layer:Datadog-<RUNTIME>:<VERSION>
```

Les options `RUNTIME` disponibles sont `Node10-x` et `Node12-x`. Pour `VERSION`, consultez la [dernière version][2]. Exemple :

```
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Node12-x:25
```

Si votre fonction Lambda est configurée de façon à utiliser la signature de code, vous devez ajouter l'ARN du profil de signature de Datadog (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) à la [configuration de la signature de code][3] de votre fonction avant de pouvoir ajouter la bibliothèque Lambda Datadog en tant que couche.

#### Utilisation du package

**NPM** :

```
npm install --save datadog-lambda-js
```

**Yarn** :

```
yarn add datadog-lambda-js
```

Consultez la [dernière version][4].

### Configuration

Pour configurer la fonction, suivez les étapes ci-dessous :

1. Définissez le gestionnaire de votre fonction sur `/opt/nodejs/node_modules/datadog-lambda-js/handler.handler` si vous utilisez la couche, ou sur `node_modules/datadog-lambda-js/dist/handler.handler` si vous utilisez le package.
2. Définissez la variable d'environnement `DD_LAMBDA_HANDLER` sur votre gestionnaire d'origine, comme `myfunc.handler`.
3. Définissez la variable d'environnement `DD_TRACE_ENABLED` sur `true`.
4. Définissez la variable d'environnement `DD_FLUSH_TO_LOG` sur `true`.
5. Vous pouvez également définir des tags `service` et `env` pour votre fonction avec des valeurs correspondantes.

**Remarque** : si votre fonction Lambda utilise à la fois les bibliothèques de tracing de Datadog et le [webpack][5], vous devez suivre ces [étapes de configuration supplémentaires][6].

### Abonnement

Pour pouvoir envoyer des métriques, traces et logs à Datadog, abonnez la fonction Lambda du Forwarder Datadog à chaque groupe de logs de votre fonction.

1. [Si ce n'est pas déjà fait, installez le Forwarder Datadog][7].
2. [Abonnez le Forwarder Datadog aux groupes de logs de votre fonction][8].


[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://github.com/DataDog/datadog-lambda-layer-js/releases
[3]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
[4]: https://www.npmjs.com/package/datadog-lambda-js
[5]: /fr/serverless/troubleshooting/serverless_tracing_and_webpack/
[6]: https://webpack.js.org/
[7]: https://docs.datadoghq.com/fr/serverless/forwarder/
[8]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
{{% /tab %}}
{{< /tabs >}}

### Tag

Bien que cette opération soit facultative, Datadog vous recommande fortement d'ajouter les tags `env`, `service` et `version` à vos applications sans serveur. Pour ce faire, suivez la [documentation relative au tagging de service unifié][4].

## Utilisation

Une fois votre fonction configurée, suivez les étapes suivantes pour visualiser vos métriques logs et traces sur la [page Serverless principale][5].

## Surveiller une logique opérationnelle personnalisée

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

Pour en savoir plus sur l'envoi de métriques custom, consultez [cette page][6]. Pour obtenir plus d'informations sur l'instrumentation personnalisée, consultez la documentation de l'APM Datadog sur l'[instrumentation personnalisée][7].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/serverless/installation
[2]: /fr/integrations/amazon_web_services/
[3]: /fr/serverless/forwarder
[4]: /fr/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[5]: https://app.datadoghq.com/functions
[6]: /fr/serverless/custom_metrics?tab=nodejs
[7]: /fr/tracing/custom_instrumentation/nodejs/