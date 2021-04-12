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
---
## Configuration requise

Si vous n'avez pas encore réalisé la configuration :

- Installez [l'intégration AWS][1]. Datadog pourra ainsi ingérer les métriques Lambda depuis AWS.
- Installez la [fonction Lambda du Forwarder Datadog][2], qui est nécessaire pour l'ingestion des traces, des métriques optimisées, des métriques custom et des logs AWS Lambda.

Après avoir installé l'[intégration AWS][1] et le [Forwarder Datadog][2], suivez ces étapes pour instrumenter votre application afin d'envoyer des métriques, des logs et des traces à Datadog.

## Configuration

{{< tabs >}}
{{% tab "Framework Serverless" %}}

Le [plug-in Serverless Datadog][1] ajoute automatiquement la bibliothèque Lambda Datadog à vos fonctions à l'aide d'une couche. Il configure également vos fonctions de façon à envoyer des métriques, traces et logs à Datadog par l'intermédiaire du [Forwarder Datadog][2].

Si votre fonction Lambda est configurée de façon à utiliser la signature de code, vous devez ajouter l'ARN du profil de signature de Datadog (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) à la [configuration de la signature de code][3] de votre fonction avant d'installer le plug-in Serverless Datadog.

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
        forwarder: # The Datadog Forwarder ARN goes here.
    ```
    Pour en savoir plus sur l'ARN du Forwarder Datadog ou sur l'installation, cliquez [ici][2]. Pour obtenir des paramètres supplémentaires, consultez la [documentation du plug-in][1].

[1]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/fr/serverless/forwarder/
[3]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "AWS SAM" %}}

La [macro CloudFormation Datadog][1] transforme automatiquement votre modèle d'application SAM dans le but d'ajouter la bibliothèque Lambda Datadog à vos fonctions à l'aide de couches. Elle configure également vos fonctions de façon à envoyer des métriques, traces et logs à Datadog par l'intermédiaire du [Forwarder Datadog][2].

### Installer la macro CloudFormation Datadog

Exécutez la commande suivante avec vos [identifiants AWS][3] pour déployer une pile CloudFormation qui installe la ressource AWS de la macro. Vous ne devez installer la macro qu'**une seule fois** par région de votre compte. Remplacez `create-stack` par `update-stack` pour mettre à jour la macro vers la dernière version.

```sh
aws cloudformation create-stack \
  --stack-name datadog-serverless-macro \
  --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
  --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

La macro est désormais déployée et utilisable.

### Instrumenter la fonction

Dans votre fichier `template.yml`, ajoutez ce qui suit dans la section `Transform`, **après** la transformation `AWS::Serverless` pour SAM.

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      pythonLayerVersion: "<VERSION_COUCHE>"
      stackName: !Ref "AWS::StackName"
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
[4]: https://github.com/DataDog/datadog-lambda-python/releases
[5]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "AWS CDK" %}}

La [macro CloudFormation Datadog][1] transforme automatiquement le modèle CloudFormation généré par AWS CDK dans le but d'ajouter la bibliothèque Lambda Datadog à vos fonctions à l'aide de couches. Elle configure également vos fonctions de façon à envoyer des métriques, traces et logs à Datadog par l'intermédiaire du [Forwarder Datadog][2].

### Installer la macro CloudFormation Datadog

Exécutez la commande suivante avec vos [identifiants AWS][3] pour déployer une pile CloudFormation qui installe la ressource AWS de la macro. Vous ne devez installer la macro qu'**une seule fois** par région de votre compte. Remplacez `create-stack` par `update-stack` pour mettre à jour la macro vers la dernière version.

```sh
aws cloudformation create-stack \
  --stack-name datadog-serverless-macro \
  --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
  --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

La macro est désormais déployée et utilisable.

### Instrumenter la fonction

Ajoutez la transformation `DatadogServerless` ainsi que `CfnMapping` à votre objet `Stack` dans votre application AWS CDK. Consultez l'exemple de code ci-dessous en Python (le fonctionnement est similaire dans d'autres langages).

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
          "env": "<ENVIRONNEMENT>",  # Facultatif
        }
      })
```

Remplacez `<SERVICE>` et `<ENVIRONNEMENT>` par les valeurs appropriées, `<VERSION_COUCHE>` par la version de votre choix de la couche Lambda Datadog (voir les [dernières versions][4]) et `<ARN_FORWARDER>` par l'ARN du Forwarder (consultez la [documentation relative au Forwarder][2]).

Si votre fonction Lambda est configurée de façon à utiliser la signature de code, vous devez ajouter l'ARN du profil de signature de Datadog (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) à la [configuration de la signature de code][5] de votre fonction avant de pouvoir utiliser la macro.

Pour obtenir plus de détails ainsi que des paramètres supplémentaires, consultez la [documentation relative à la macro][1].

[1]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/macro
[2]: https://docs.datadoghq.com/fr/serverless/forwarder/
[3]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
[4]: https://github.com/DataDog/datadog-lambda-python/releases
[5]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "Zappa" %}}

### Mettre à jour les paramètres Zappa

1. Ajoutez les paramètres suivants à votre fichier `zappa_settings.json` :
    ```json
    {
        "dev": {
            "layers": ["arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>"],
            "lambda_handler": "datadog_lambda.handler.handler",
            "aws_environment_variables": {
                "DD_LAMBDA_HANDLER": "handler.lambda_handler",
                "DD_TRACE_ENABLED": "true",
                "DD_FLUSH_TO_LOG": "true",
            },
        }
    }
    ```
1. Remplacez les paramètres fictifs `<AWS_REGION>`, `<RUNTIME>` et `<VERSION>` dans l'ARN de couche par les valeurs appropriées. Les options `RUNTIME` disponibles sont `Python27`, `Python36`, `Python37` et `Python38`. Pour `VERSION`, consultez la [dernière version][1]. Exemple :
    ```
    # For regular regions
    arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Python37:19

    # For us-gov regions
    arn:aws-us-gov:lambda:us-gov-east-1:002406178527:layer:Datadog-Python37:19
    ```
1. Si votre fonction Lambda est configurée de façon à utiliser la signature de code, ajoutez l'ARN du profil de signature de Datadog (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) à la [configuration de la signature de code][2] de votre fonction.

### Abonner le Forwarder Datadog aux groupes de logs

Pour pouvoir envoyer des métriques, traces et logs à Datadog, vous devez abonner la fonction Lambda du Forwarder Datadog à chaque groupe de logs de votre fonction.

1. Si ce n'est pas déjà fait, [installez le Forwarder Datadog][3].
2. [Abonnez le Forwarder Datadog aux groupes de logs de votre fonction][4].


[1]: https://github.com/DataDog/datadog-lambda-python/releases
[2]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
[3]: https://docs.datadoghq.com/fr/serverless/forwarder/
[4]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
{{% /tab %}}
{{% tab "Interface de ligne de commande Datadog" %}}

<div class="alert alert-warning">Ce service est en bêta publique. Si vous souhaitez nous faire part de vos remarques, contactez l'<a href="/help">assistance Datadog</a>.</div>

Utilisez l'interface de ligne de commande Datadog pour configurer l'instrumentation sur vos fonctions Lambda dans vos pipelines CI/CD. La commande de l'interface de ligne de commande ajoute automatiquement la bibliothèque Lambda Datadog à vos fonctions à l'aide des couches. Elle configure également vos fonctions de façon à envoyer des métriques, traces et logs à Datadog.

### Installer l'interface de ligne de commande Datadog

Installez l'interface de ligne de commande Datadog avec NPM ou Yarn :

```sh
# NPM
npm install -g @datadog/datadog-ci

# Yarn
yarn global add @datadog/datadog-ci
```

### Instrumenter la fonction

Exécutez la commande suivante avec vos [identifiants AWS][1]. Remplacez `<nomfonction>` et `<autre_nomfonction>` par le nom de vos fonctions Lambda, `<région_aws>` par le nom de la région AWS, `<version_couche>` par la version de votre choix de la couche Lambda Datadog (voir les [dernières versions][2]) et `<arn_forwarder>` par l'ARN du Forwarder (voir la [documentation relative au Forwarder][3]).

```sh
datadog-ci lambda instrument -f <nomfonction> -f <autre_nomfonction> -r <région_aws> -v <version_couche> --forwarder <arn_forwarder>
```

Par exemple :

```sh
datadog-ci lambda instrument -f ma-fonction -f autre-fonction -r us-east-1 -v 19 --forwarder arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder
```

Si votre fonction Lambda est configurée de façon à utiliser la signature de code, vous devez ajouter l'ARN du profil de signature de Datadog (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) à la [configuration de la signature de code][4] de votre fonction avant de pouvoir l'instrumenter avec l'interface de ligne de commande Datadog.

Pour obtenir plus de détails ainsi que des paramètres supplémentaires, consultez la [documentation relative à l'interface de ligne de commande][5].

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://github.com/DataDog/datadog-lambda-python/releases
[3]: https://docs.datadoghq.com/fr/serverless/forwarder/
[4]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
[5]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Image de conteneur" %}}

### Installer la bibliothèque Lambda Datadog

Si vous déployez votre fonction Lambda en tant qu'image de conteneur, vous ne pourrez pas utiliser la bibliothèque Lambda Datadog en tant que couche. À la place, il vous faudra installer la bibliothèque Lambda Datadog directement dans l'image.


```sh
pip install datadog-lambda
```

Veuillez noter que la version mineure du package `datadog-lambda` correspond toujours à la version de la couche. Par exemple, `datadog-lambda v0.5.0` correspond au contenu de la version 5 de la couche.

### Configurer la fonction

1. Définissez la valeur `CMD` de votre image sur `datadog_lambda.handler.handler`. Pour ce faire, modifiez directement votre Dockerfile ou remplacez la valeur à l'aide d'AWS.
2. Définissez la variable d'environnement `DD_LAMBDA_HANDLER` sur votre gestionnaire d'origine, comme `myfunc.handler`.
3. Définissez la variable d'environnement `DD_TRACE_ENABLED` sur `true`.
4. Définissez la variable d'environnement `DD_FLUSH_TO_LOG` sur `true`.
5. Vous pouvez également définir des tags `service` et `env` pour votre fonction avec des valeurs correspondantes.

### Abonner le Forwarder Datadog aux groupes de logs

Pour pouvoir envoyer des métriques, traces et logs à Datadog, vous devez abonner la fonction Lambda du Forwarder Datadog à chaque groupe de logs de votre fonction.

1. [Si ce n'est pas déjà fait, installez le Forwarder Datadog][1].
2. [Abonnez le Forwarder Datadog aux groupes de logs de votre fonction][2].


[1]: https://docs.datadoghq.com/fr/serverless/forwarder/
[2]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
{{% /tab %}}
{{% tab "Personnalisé" %}}

### Installer la bibliothèque Lambda Datadog

Vous pouvez installer la bibliothèque Lambda Datadog en tant que couche (conseillé) ou en tant que package Python.

La version mineure du package `datadog-lambda` correspond toujours à la version de la couche. Par exemple, datadog-lambda v0.5.0 correspond au contenu de la version 5 de la couche.

#### Utiliser la couche

[Configurez les couches][1] pour votre fonction Lambda à l'aide de l'ARN, en respectant le format suivant :

```
# Pour les régions standard
arn:aws:lambda:<RÉGION_AWS>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>

# Pour les régions us-gov
arn:aws-us-gov:lambda:<RÉGION_AWS>:002406178527:layer:Datadog-<RUNTIME>:<VERSION>
```

Les options `RUNTIME` disponibles sont  `Python27`, `Python36`, `Python37` et `Python38`.  Pour `VERSION`, consultez la [dernière version][2]. Exemple :

```
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Python37:19
```

Si votre fonction Lambda est configurée de façon à utiliser la signature de code, vous devez ajouter l'ARN du profil de signature de Datadog (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) à la [configuration de la signature de code][3] de votre fonction avant de pouvoir ajouter la bibliothèque Lambda Datadog en tant que couche.

#### Utiliser le package

Installez `datadog-lambda` et ses dépendances localement dans le dossier du projet de votre fonction. **Remarque** : `datadog-lambda` dépend de `ddtrace`, qui a recours à des extensions natives ; ces extensions doivent donc être installées et compilées dans un environnement Linux. Par exemple, vous pouvez utiliser [dockerizePip][4] pour le plug-in Framework sans serveur et [--use-container][5] pour AWS SAM. Pour en savoir plus, consultez [la documentation relative à l'ajout de dépendances à votre package de déploiement de fonction][6].

```
pip install datadog-lambda -t ./
```

Consultez la [dernière version][7].

### Configurer la fonction

1. Définissez le gestionnaire de votre fonction sur `datadog_lambda.handler.handler`.
2. Définissez la variable d'environnement `DD_LAMBDA_HANDLER` sur votre gestionnaire d'origine, comme `myfunc.handler`.
3. Définissez la variable d'environnement `DD_TRACE_ENABLED` sur `true`.
4. Définissez la variable d'environnement `DD_FLUSH_TO_LOG` sur `true`.
5. Vous pouvez également définir des tags `service` et `env` pour votre fonction avec des valeurs correspondantes.

### Abonner le Forwarder Datadog aux groupes de logs

Pour pouvoir envoyer des métriques, traces et logs à Datadog, vous devez abonner la fonction Lambda du Forwarder Datadog à chaque groupe de logs de votre fonction.

1. Si ce n'est pas déjà fait, [installez le Forwarder Datadog][8].
2. [Abonnez le Forwarder Datadog aux groupes de logs de votre fonction][9].


[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://github.com/DataDog/datadog-lambda-python/releases
[3]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
[4]: https://github.com/UnitedIncome/serverless-python-requirements#cross-compiling
[5]: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-build.html
[6]: https://docs.aws.amazon.com/lambda/latest/dg/python-package.html#python-package-dependencies
[7]: https://pypi.org/project/datadog-lambda/
[8]: https://docs.datadoghq.com/fr/serverless/forwarder/
[9]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
{{% /tab %}}
{{< /tabs >}}

### Tagging de service unifié

Bien que cette opération soit facultative, nous vous recommandons fortement d'ajouter les tags `env`, `service` et `version` à vos applications sans serveur. Pour ce faire, suivez les instructions de la [documentation relative au tagging de service unifié][3].

## Explorer la surveillance sans serveur de Datadog

Après avoir configuré votre fonction en suivant la procédure ci-dessus, vous pouvez visualiser vos métriques, logs et traces sur la [page Serverless principale][4].

## Surveiller une logique opérationnelle personnalisée

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

Pour en savoir plus sur l'envoi de métriques custom, consultez [cette page][5]. Pour obtenir plus d'informations sur l'instrumentation personnalisée, consultez la documentation de l'APM Datadog [à ce sujet][6].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/amazon_web_services/
[2]: /fr/serverless/forwarder
[3]: /fr/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[4]: https://app.datadoghq.com/functions
[5]: /fr/serverless/custom_metrics?tab=python
[6]: /fr/tracing/custom_instrumentation/python/