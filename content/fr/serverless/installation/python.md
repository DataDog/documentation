---
title: Instrumenter des applications Python
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
  - /fr/serverless/datadog_lambda_library/python/
  - /fr/serverless/guide/python/
---
## Configuration requise

Si vous ne l'avez pas encore fait, installez l'[intégration AWS][1]. Datadog pourra ainsi ingérer les métriques Lambda depuis AWS. Après avoir installé l'[intégration AWS][1], suivez ces étapes pour instrumenter votre application afin d'envoyer des métriques, des logs et des traces à Datadog.

{{< img src="serverless/serverless_monitoring_installation_instructions.png" alt="Instrumenter des applications sans serveur AWS"  style="width:100%;">}}

Si vos fonctions Lambda sont écrites en code [Python 3.6 ou version antérieure][2], si vous avez déjà configuré la fonction Serverless de Datadog à l'aide du Forwarder Datadog, ou si vos fonctions Lambda sont déployées dans la région AWS GovCloud, reportez-vous aux [instructions d'installation disponibles ici][3].

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
[2]: https://docs.datadoghq.com/fr/serverless/libraries_integrations/extension
[3]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "AWS SAM" %}}

La [macro CloudFormation Datadog][1] transforme automatiquement votre modèle d'application SAM dans le but d'ajouter la bibliothèque Lambda Datadog à vos fonctions à l'aide des couches. De plus, elle configure vos fonctions de sorte à ce qu'elles envoient des métriques, des traces et des logs à Datadog via l'[extension Lambda Datadog][2].

### Installation

Exécutez la commande suivante avec vos [identifiants AWS][3] pour déployer une pile CloudFormation qui installe la ressource AWS de la macro. Vous ne devez installer la macro qu'**une seule fois** par région de votre compte. Remplacez `create-stack` par `update-stack` pour mettre à jour la macro vers la dernière version.

```sh
aws cloudformation create-stack \
  --stack-name datadog-serverless-macro \
  --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
  --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

La macro est désormais déployée et utilisable.

### Instrumentation

Pour instrumenter une fonction, ajoutez ce qui suit dans la section `Transform` de votre fichier `template.yml`, **après** la transformation `AWS::Serverless` pour SAM.

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
[2]: https://docs.datadoghq.com/fr/serverless/libraries_integrations/extension
[3]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
[4]: https://github.com/DataDog/datadog-lambda-python/releases
[5]: https://gallery.ecr.aws/datadog/lambda-extension
{{% /tab %}}
{{% tab "AWS CDK" %}}


La [bibliothèque CDK Constructs Datadog][1] ajoute automatiquement la bibliothèque Lambda Datadog à vos fonctions à l'aide des couches Lambda, et configure vos fonctions de sorte à ce qu'elles envoient les métriques, les traces et les logs à Datadog via l'[extension Lambda Datadog][2].

### Installer la bibliothèque CDK Constructs Datadog

Exécutez la commande suivante dans votre projet CDK :

```sh
#PyPI
pip install datadog-cdk-constructs
```

### Instrumenter la fonction

Importez le module `datadog-cdk-construct` dans votre application AWS CDK et ajoutez les configurations suivantes :

```python
from datadog_cdk_constructs import Datadog

datadog = Datadog(self, "Datadog",
    python_layer_version=<VERSION_COUCHE>,
    extension_layer_version=<VERSION_COUCHE_EXTENSION>,
    dd_api_key=<CLÉ_API_DATADOG>
)
datadog.add_lambda_functions([<FONCTIONS_LAMBDA>])
```

Pour remplir les paramètres fictifs, procédez comme suit :

- Remplacez `<CLÉ_API_DATADOG>` par votre clé d'API Datadog, disponible sur la [page de gestion des API][3].
- Remplacez `<VERSION_COUCHE>` par la version de votre choix de la couche Lambda Datadog (consultez les [dernières versions][2]).
- Remplacez `<VERSION_EXTENSION>` par la version de votre choix de l'extension Lambda Datadog (consultez les [dernières versions][4]).

Pour en savoir plus et obtenir des paramètres supplémentaires, consultez la [page NPM relative au CDK Datadog][1] (en anglais).


[1]: https://www.npmjs.com/package/datadog-cdk-constructs
[2]: https://github.com/DataDog/datadog-lambda-python/releases
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://gallery.ecr.aws/datadog/lambda-extension
{{% /tab %}}
{{% tab "Zappa" %}}

### Mettre à jour les paramètres

1. Ajoutez les paramètres suivants à votre fichier `zappa_settings.json` :
   {{< site-region region="us,us3,eu" >}}  
    ```json
    {
        "dev": {
            "layers": ["arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<LIBRARY_VERSION>", "arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:<EXTENSION_VERSION>"],
            "lambda_handler": "datadog_lambda.handler.handler",
            "aws_environment_variables": {
                "DD_LAMBDA_HANDLER": "handler.lambda_handler",
                "DD_TRACE_ENABLED": "true",
                "DD_FLUSH_TO_LOG": "true",
                "DD_API_KEY": "<DATADOG_API_KEY>",
            },
        }
    }
    ```
  {{< /site-region >}}
  {{< site-region region="gov" >}}
      ```json
    {
        "dev": {
            "layers": ["arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:<LIBRARY_VERSION>", "arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:<EXTENSION_VERSION>"],
            "lambda_handler": "datadog_lambda.handler.handler",
            "aws_environment_variables": {
                "DD_LAMBDA_HANDLER": "handler.lambda_handler",
                "DD_TRACE_ENABLED": "true",
                "DD_FLUSH_TO_LOG": "true",
                "DD_API_KEY": "<DATADOG_API_KEY>",
            },
        }
    }
    ```
  {{< /site-region >}}
2. Remplacez les paramètres fictifs suivants par les valeurs appropriées : 

- Remplacez `<AWS_REGION>` par la région AWS où vos fonctions Lambda sont déployées.
- Remplacez `<RUNTIME>` par le runtime Python approprié. Les options `RUNTIME` disponibles sont `Python27`, `Python36`, `Python37` et `Python38`.
- Remplacez `<LIBRARY_VERSION>` par la [dernière version de la bibliothèque Lambda Datadog][1]. 
- Remplacez `<EXTENSION_VERSION>` par la [dernière version de l'extension Lambda Datadog][2].
- Remplacez `<DATADOG_API_KEY>` par votre clé d'API Datadog, disponible sur la [page de gestion des API][3]. 

Par exemple :

{{< site-region region="us,us3,eu" >}} 
    ```
    arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Python38:36
    arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Extension:7
    ```
{{< /site-region >}}
{{< site-region region="gov" >}}
    ```
    arn:aws-us-gov:lambda:us-gov-east-1:002406178527:layer:Datadog-Python38:36
    arn:aws-us-gov:lambda:us-gov-east-1:002406178527:layer:Datadog-Extension:7
    ```
{{< /site-region >}}


[1]: https://github.com/DataDog/datadog-lambda-python/releases
[2]: https://gallery.ecr.aws/datadog/lambda-extension
[3]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Chalice" %}}

### Mettre à jour le projet

1. Ajoutez l'[extension Lambda Datadog][1] et les variables d'environnement suivantes dans votre fichier `config.json` :
    {{< site-region region="us,us3,eu" >}} 
    ```json
    {
      "version": "2.0",
      "app_name": "hello-chalice",
      "stages": {
        "dev": {
          "api_gateway_stage": "api",
          "environment_variables": {
            "DD_TRACE_ENABLED": "true",
            "DD_FLUSH_TO_LOG": "true",
            "DD_API_KEY_SECRET_ARN": "<SECRET_ARN_DATADOG_API_KEY>",
          },
          "layers": ["arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:<EXTENSION_VERSION>"],
        }
      }
    }
    ```
    {{< /site-region >}}
    {{< site-region region="gov" >}}
    ```json
    {
      "version": "2.0",
      "app_name": "hello-chalice",
      "stages": {
        "dev": {
          "api_gateway_stage": "api",
          "environment_variables": {
            "DD_TRACE_ENABLED": "true",
            "DD_FLUSH_TO_LOG": "true",
            "DD_API_KEY_SECRET_ARN": "<SECRET_ARN_DATADOG_API_KEY>",
          },
          "layers": ["arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:<VERSION_NUMBER>"],
        }
      }
    }
    ```
    {{< /site-region >}}
2. Remplacez les paramètres fictifs suivants par les valeurs appropriées : 

- Remplacez `<DD_API_KEY_SECRET_ARN>` du secret de Secret Manager qui contient votre clé API de Datadog.
- Remplacez `<AWS_REGION>` par la région AWS où vos fonctions Lambda sont déployées.
- Remplacez `<EXTENSION_VERSION>` par la [dernière version de l'extension Lambda Datadog][3].

3. Ajoutez `datadog_lambda` à votre fichier `requirements.txt`.
4. Enregistrez `datadog_lambda_wrapper` en tant que [middleware][4] dans `app.py` :
    ```python
    from chalice import Chalice, ConvertToMiddleware
    from datadog_lambda.wrapper import datadog_lambda_wrapper

    app = Chalice(app_name='hello-chalice')

    app.register_middleware(ConvertToMiddleware(datadog_lambda_wrapper))

    @app.route('/')
    def index():
        return {'hello': 'world'}
    ```

[1]: /fr/serverless/libraries_integrations/extension/
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://gallery.ecr.aws/datadog/lambda-extension
[4]: https://aws.github.io/chalice/topics/middleware.html?highlight=handler#registering-middleware
{{% /tab %}}
{{% tab "Interface de ligne de commande Datadog" %}}

<div class="alert alert-warning">Ce service est en bêta publique. Si vous souhaitez nous faire part de vos remarques, contactez l'<a href="/help">assistance Datadog</a>.</div>

Utilisez l'interface de ligne de commande Datadog pour configurer l'instrumentation sur vos fonctions Lambda dans vos pipelines CI/CD. La commande de l'interface de ligne de commande ajoute automatiquement la bibliothèque Lambda Datadog à vos fonctions à l'aide des couches Lambda. Elle configure vos fonctions de façon à envoyer des métriques, traces et logs à Datadog.

### Installation

Installez l'interface de ligne de commande Datadog avec NPM ou Yarn :

```sh
# NPM
npm install -g @datadog/datadog-ci

# Yarn
yarn global add @datadog/datadog-ci
```

### Instrumentation

Pour instrumenter la fonction, exécutez la commande suivante avec vos [identifiants AWS][1]. Remplacez `<nomfonction>` et `<autre_nomfonction>` par les noms de vos fonctions Lambda, `<région_aws>` par le nom de la région AWS, `<version_couche>` par la [version de votre choix][2] de la bibliothèque Lambda Datadog et `<version_extension>` par la [version de votre choix][3] de l'extension Lambda Datadog.

```sh
datadog-ci lambda instrument -f <nomfonction> -f <autre_nomfonction> -r <région_aws> -v <version_couche> -e <version_extension>
```

Par exemple :

{{< site-region region="us,us3,eu" >}}
```sh
datadog-ci lambda instrument -f my-function -f another-function -r us-east-1 -v 19 -e 8
```
{{< /site-region >}}
{{< site-region region="gov" >}}
```sh
datadog-ci lambda instrument -f my-function -f another-function -r us-east-1 -v 19 -e 8
```
{{< /site-region >}}

Pour obtenir plus de détails ainsi que des paramètres supplémentaires, consultez la [documentation relative à l'interface de ligne de commande][4].

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://github.com/DataDog/datadog-lambda-python/releases
[3]: https://gallery.ecr.aws/datadog/lambda-extension
[4]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Image de conteneur" %}}

### Installation

Si vous déployez votre fonction Lambda en tant qu'image de conteneur, vous ne pouvez pas utiliser la bibliothèque Lambda Datadog en tant que couche Lambda. À la place, vous devez installer la bibliothèque Lambda Datadog en tant que dépendance de votre fonction directement dans l'image.

```sh
pip install datadog-lambda
```

Veuillez noter que la version mineure du package `datadog-lambda` correspond toujours à la version de la couche. Par exemple, `datadog-lambda v0.5.0` correspond au contenu de la version 5 de la couche.

### Installer l'extension Lambda Datadog

Ajoutez l'extension Lambda Datadog à votre image de conteneur en ajoutant ce qui suit à votre Dockerfile :

```
COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/extensions/ /opt/extensions
```

Remplacez `<TAG>` par un numéro de version spécifique (par exemple, `7`) ou par `latest`. Accédez au [référentiel Amazon ECR][1] pour consulter la liste complète des tags disponibles.

### Configurer la fonction

1. Définissez la valeur `CMD` de votre image sur `datadog_lambda.handler.handler`. Vous pouvez effectuer cette opération dans AWS ou directement dans votre Dockerfile. Notez que la valeur définie dans AWS remplace la valeur définie dans le Dockerfile, si vous avez défini les deux.
2. Définissez les variables d'environnement suivantes dans AWS :
  - Définissez `DD_LAMBDA_HANDLER` sur votre gestionnaire d'origine, par exemple `myfunc.handler`.
  - Définissez `DD_TRACE_ENABLED` sur `true`.
  - Définissez `DD_API_KEY` sur votre clé d'API Datadog, disponible sur la [page de gestion des API][2]. 
3. Si vous le souhaitez, ajoutez des tags `service` et `env` avec les valeurs appropriées dans votre fonction.

[1]: https://gallery.ecr.aws/datadog/lambda-extension
[2]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Personnalisé" %}}

### Installation

Vous pouvez installer la bibliothèque Lambda Datadog en tant que couche (option recommandée) ou en tant que package Python.

La version mineure du package `datadog-lambda` correspond toujours à la version de la couche. Par exemple, datadog-lambda v0.5.0 correspond au contenu de la version 5 de la couche.

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

Les options `RUNTIME` disponibles sont  `Python27`, `Python36`, `Python37` et `Python38`.  Pour `VERSION`, consultez la [dernière version][2]. Exemple :

{{< site-region region="us,us3,eu" >}} 
```
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Python37:19
```
{{< /site-region >}}
{{< site-region region="gov" >}}
```
arn:aws-us-gov:lambda:us-gov-east-1:002406178527:layer:Datadog-Python37:19
```
{{< /site-region >}}

#### Utiliser le package

Installez `datadog-lambda` et ses dépendances localement dans le dossier du projet de votre fonction. **Remarque** : `datadog-lambda` dépend de `ddtrace`, qui a recours à des extensions natives ; ces extensions doivent donc être installées et compilées dans un environnement Linux. Par exemple, vous pouvez utiliser [dockerizePip][3] pour le plug-in Serverless Framework et [--use-container][4] pour AWS SAM. Pour en savoir plus, consultez [la documentation relative à l'ajout de dépendances à votre package de déploiement de fonction][5].

```
pip install datadog-lambda -t ./
```

Consultez la [dernière version][6].

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

Pour `VERSION_EXTENSION`, consultez la [dernière version][7].

### Configuration

Pour configurer la fonction, suivez les étapes ci-dessous :

1. Définissez le gestionnaire de votre fonction sur `datadog_lambda.handler.handler`.
2. Définissez la variable d'environnement `DD_LAMBDA_HANDLER` sur votre gestionnaire d'origine, comme `myfunc.handler`.
3. Définissez la variable d'environnement `DD_TRACE_ENABLED` sur `true`.
4. Définissez la variable d'environnement `DD_API_KEY` sur votre clé d'API Datadog, disponible sur la [page de gestion des API][8]. 
5. Vous pouvez également définir des tags `service` et `env` pour votre fonction avec des valeurs correspondantes.


[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://github.com/DataDog/datadog-lambda-python/releases
[3]: https://github.com/UnitedIncome/serverless-python-requirements#cross-compiling
[4]: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-build.html
[5]: https://docs.aws.amazon.com/lambda/latest/dg/python-package.html#python-package-dependencies
[6]: https://pypi.org/project/datadog-lambda/
[7]: https://gallery.ecr.aws/datadog/lambda-extension
[8]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{< /tabs >}}

## Explorer la surveillance sans serveur de Datadog

Après avoir configuré votre fonction en suivant la procédure ci-dessus, vous pouvez visualiser vos métriques, logs et traces sur la [page Serverless principale][4].

### Tagging de service unifié

Bien que cette opération soit facultative, Datadog vous recommande fortement d'ajouter les tags `env`, `service` et `version` à vos applications sans serveur. Pour ce faire, suivez la [documentation relative au tagging de service unifié][5].

### Collecter les logs à partir de ressources sans serveur AWS

Les logs d'un environnement sans serveur générés par des ressources gérées (outre les fonctions Lambda AWS) peuvent être très utiles pour identifier la cause d'origine des problèmes liés à vos applications sans serveur. Nous vous conseillons de transmettre les logs associés à vos ressources gérées suivantes :
- API : API Gateway, AppSync, ALB
- Files d'attente et flux : SQS, SNS, Kinesis
- Datastores : DynamoDB, S3, RDS, etc.

Pour collecter des logs depuis des ressources AWS autres que des fonctions Lambda, installez le [Forwarder Datadog][6] et configurez-le de façon à l'abonner à tous les groupes de logs CloudWatch des ressources gérées.

### Surveiller une logique opérationnelle personnalisée

Si vous souhaitez envoyer une métrique custom ou une span personnalisée, consultez l'exemple de code ci-dessous :

```python
import time
from ddtrace import tracer
from datadog_lambda.metric import lambda_metric

def lambda_handler(event, context):
    # ajouter des tags personnalisés à la span de la fonction Lambda,
    # ne fonctionne PAS lorsque le tracing X-Ray est activé
    current_span = tracer.current_span()
    if current_span:
        current_span.set_tag('customer.id', '123456')

    # envoyer une span personnalisée
    with tracer.trace("hello.world"):
        print('Hello, World!')

    # envoyer une métrique custom
    lambda_metric(
        metric_name='coffee_house.order_value',
        value=12.45,
        timestamp=int (time.time()), # facultatif, doit correspondre aux 20 dernières minutes
        tags=['product:latte', 'order:online']
    )

    return {
        'statusCode': 200,
        'body': get_message()
    }

# tracer une fonction
@tracer.wrap()
def get_message():
    return 'Hello from serverless!'
```

Pour en savoir plus sur l'envoi de métriques custom, consultez [cette page][7]. Pour obtenir plus d'informations sur l'instrumentation personnalisée, consultez la [documentation dédiée][8].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/amazon_web_services/
[2]: https://docs.aws.amazon.com/lambda/latest/dg/runtimes-extensions-api.html
[3]: /fr/serverless/guide/datadog_forwarder_python
[4]: https://app.datadoghq.com/functions
[5]: /fr/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[6]: /fr/serverless/libraries_integrations/forwarder
[7]: /fr/serverless/custom_metrics?tab=python
[8]: /fr/tracing/custom_instrumentation/python/