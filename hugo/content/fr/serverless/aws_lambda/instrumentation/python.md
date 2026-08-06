---
algolia:
  tags:
  - python lambda traces
aliases:
- /fr/serverless/datadog_lambda_library/python/
- /fr/serverless/guide/python/
- /fr/serverless/installation/python
- /fr/serverless/aws_lambda/installation/python
further_reading:
- link: /serverless/configuration
  tag: Documentation
  text: Configurer la surveillance sans serveur
- link: /serverless/guide/troubleshoot_serverless_monitoring
  tag: Documentation
  text: Dépannage de la surveillance sans serveur
- link: serverless/custom_metrics/
  tag: Documentation
  text: Envoyer des métriques custom depuis des applications sans serveur
title: Instrumenter des applications Python sans serveur
---
<div class="alert alert-info">La version 67+ de l'extension Datadog Lambda est optimisée pour réduire considérablement la durée de démarrage à froid. <a href="/serverless/aws_lambda/configuration/?tab=datadogcli#using-datadog-lambda-extension-v67">En savoir plus</a>.</div>

## Configuration {#setup}

{{< tabs >}}
{{% tab "Datadog UI" %}}
Vous pouvez instrumenter votre application Python AWS Lambda directement dans Datadog. Accédez à la page [Serverless > AWS Lambda][2] et sélectionnez [**Instrumenter les fonctions**][3].

Pour plus d'informations, consultez [Instrumentation à distance pour AWS Lambda][1].

[1]: /fr/serverless/aws_lambda/remote_instrumentation
[2]: https://app.datadoghq.com/functions?cloud=aws
[3]: https://app.datadoghq.com/serverless/aws/lambda/setup
{{% /tab %}}
{{% tab "Datadog CLI" %}}

La CLI Datadog modifie les configurations des fonctions Lambda existantes pour permettre l'instrumentation sans nécessiter un nouveau déploiement. C'est le moyen le plus rapide de commencer avec la surveillance sans serveur de Datadog.

1. Installez le client CLI Datadog

    ```sh
    npm install -g @datadog/datadog-ci @datadog/datadog-ci-plugin-lambda
    ```

2. Si vous êtes nouveau dans la surveillance sans serveur de Datadog, lancez la CLI Datadog en mode interactif pour guider votre première installation pour un démarrage rapide, et ignorez les étapes restantes. Pour installer Datadog de manière permanente pour vos applications de production, ignorez cette étape et suivez les étapes restantes pour exécuter la commande CLI Datadog dans vos pipelines CI/CD _après_ votre déploiement normal.

    ```sh
    datadog-ci lambda instrument -i
    ```

3. Configurez les identifiants AWS

    La CLI Datadog nécessite un accès au service AWS Lambda et dépend du SDK JavaScript AWS pour [résoudre les identifiants][1]. Assurez-vous que vos identifiants AWS sont configurés en utilisant la même méthode que celle que vous utiliseriez pour invoquer la CLI AWS.

4. Configurez le site Datadog

    ```sh
    export DATADOG_SITE="<DATADOG_SITE>"
    ```

    Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (assurez-vous que le bon SITE est sélectionné à droite).

5. Configurez la clé API Datadog

    Datadog recommande de sauvegarder la clé API Datadog dans AWS Secrets Manager pour des raisons de sécurité et de rotation facile. La clé doit être stockée sous forme de chaîne de texte brut (pas un blob JSON). Assurez-vous que vos fonctions Lambda disposent des autorisations IAM requises `secretsmanager:GetSecretValue`.

    ```sh
    export DATADOG_API_KEY_SECRET_ARN="<DATADOG_API_KEY_SECRET_ARN>"
    ```

    For quick testing purposes, you can also set the Datadog API key in plaintext:

    ```sh
    export DATADOG_API_KEY="<DATADOG_API_KEY>"
    ```

6. Instrumentez vos fonctions Lambda

    **Remarque** : Instrumentez d'abord vos fonctions Lambda dans un environnement de développement ou de staging. Si le résultat de l'instrumentation est insatisfaisant, exécutez `uninstrument` avec les mêmes arguments pour annuler les modifications.

    Pour instrumenter vos fonctions Lambda, lancez la commande suivante.

    ```sh
    datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v {{< latest-lambda-layer-version layer="python" >}} -e {{< latest-lambda-layer-version layer="extension" >}}
    

```

    To fill in the placeholders:
    - Replace `<functionname>` and `<another_functionname>` with your Lambda function names. Alternatively, you can use `--functions-regex` to automatically instrument multiple functions whose names match the given regular expression.
    - Replace `<aws_region>` with the AWS region name.

    Additional parameters can be found in the [CLI documentation][2].


[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

Le [plug-in Serverless Datadog][1] configure vos fonctions de sorte à ce qu'elles envoient les métriques, les traces et les logs à Datadog via l'[extension Lambda Datadog][2].

Pour installer et configurer le plug-in Serverless Datadog, suivez les étapes suivantes :

1. Installez le plugin Datadog Serverless :

    ```sh
    serverless plugin install --name serverless-plugin-datadog
    ```

2. Mettez à jour votre `serverless.yml` :

    ```yaml
    custom:
      datadog:
        site: <DATADOG_SITE>
        apiKeySecretArn: <DATADOG_API_KEY_SECRET_ARN>
    ```

    To fill in the placeholders:
    - Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (assurez-vous que le bon SITE est sélectionné à droite).
    - Remplacez `<DATADOG_API_KEY_SECRET_ARN>` par l'ARN du secret AWS où votre [clé API Datadog][3] est stockée en toute sécurité. La clé doit être stockée sous forme de chaîne de texte brut (pas un blob JSON). L'autorisation `secretsmanager:GetSecretValue` est requise. Pour des tests rapides, vous pouvez plutôt utiliser `apiKey` et définir la clé API Datadog en texte brut.

    For more information and additional settings, see the [plugin documentation][1].

[1]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/fr/serverless/libraries_integrations/extension
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "AWS SAM" %}}

La [macro CloudFormation Datadog][1] transforme automatiquement votre modèle d'application SAM dans le but d'installer Datadog sur vos fonctions à l'aide des couches Lambda. De plus, elle configure vos fonctions de sorte à ce qu'elles envoient des métriques, des traces et des logs à Datadog via l'[extension Lambda Datadog][2].

1. Installez la macro Datadog CloudFormation

    Exécutez la commande suivante avec vos [identifiants AWS][3] pour déployer une pile CloudFormation qui installe la ressource macro AWS. Vous n'avez besoin d'installer la macro **qu'une seule fois** pour une région donnée dans votre compte. Remplacez `create-stack` par `update-stack` pour mettre à jour la macro vers la dernière version.

    ```sh
    aws cloudformation create-stack \
      --stack-name datadog-serverless-macro \
      --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
      --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
    ```

    The macro is now deployed and ready to use.

2. Instrumentez vos fonctions Lambda

    Ajoutez la transformation `DatadogServerless` **après** la transformation `AWS::Serverless` dans la section `Transform` de votre fichier `template.yml` pour SAM.

    ```yaml
    Transform:
      - AWS::Serverless-2016-10-31
      - Name: DatadogServerless
        Parameters:
          stackName: !Ref "AWS::StackName"
          pythonLayerVersion: {{< latest-lambda-layer-version layer="python" >}}
          extensionLayerVersion: {{< latest-lambda-layer-version layer="extension" >}}
          site: "<DATADOG_SITE>"
          apiKeySecretArn: "<DATADOG_API_KEY_SECRET_ARN>"
    ```

    To fill in the placeholders:
    - Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (assurez-vous que le bon SITE est sélectionné à droite).
    - Remplacez `<DATADOG_API_KEY_SECRET_ARN>` par l'ARN du secret AWS où votre [clé API Datadog][4] est stockée en toute sécurité. La clé doit être stockée sous forme de chaîne de texte brut (pas un blob JSON). L'autorisation `secretsmanager:GetSecretValue` est requise. Pour des tests rapides, vous pouvez utiliser `apiKey` à la place et définir la clé API Datadog en texte brut.

    More information and additional parameters can be found in the [macro documentation][1].


[1]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/macro
[2]: https://docs.datadoghq.com/fr/serverless/libraries_integrations/extension
[3]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
[4]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}

{{% tab "AWS CDK" %}}
{{< lambda-install-cdk language="python" layer="python" layerParamTypescript="pythonLayerVersion" layerParamPython="python_layer_version">}}

{{% /tab %}}
{{% tab "Image de conteneur" %}}

1. Installez la bibliothèque Lambda de Datadog

    Si vous déployez votre fonction Lambda en tant qu'image de conteneur, vous ne pouvez pas utiliser la bibliothèque Lambda de Datadog en tant que couche Lambda. Au lieu de cela, vous devez installer la bibliothèque Lambda de Datadog en tant que dépendance de votre fonction dans l'image.

    ```sh
    pip install datadog-lambda
    ```

    Note that the minor version of the `datadog-lambda` package always matches the layer version. For example, `datadog-lambda v0.5.0` matches the content of layer version 5.

2. Installez l'extension Lambda de Datadog

    Ajoutez l'extension Lambda Datadog à votre image de conteneur en ajoutant ce qui suit à votre Dockerfile :

    ```dockerfile
    COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/. /opt/
    ```

    Replace `<TAG>` with either a specific version number (for example, `{{< latest-lambda-layer-version layer="extension" >}}`) or with `dernier`. Alpine is also supported with specific version numbers (such as `{{< latest-lambda-layer-version layer="extension" >}}-alpine`) or with `dernier-alpine`. Vous pouvez voir une liste complète des balises possibles dans le [dépôt Amazon ECR][1].

3. Redirigez la fonction gestionnaire

    - Définissez la valeur `CMD` de votre image sur `datadog_lambda.handler.handler`. Vous pouvez définir cela dans AWS ou directement dans votre Dockerfile. Notez que la valeur définie dans AWS remplace la valeur dans le Dockerfile si vous définissez les deux.
    - Définissez la variable d'environnement `DD_LAMBDA_HANDLER` sur votre gestionnaire d'origine, par exemple, `myfunc.handler`.

    **Remarque** : Si vous utilisez un outil de sécurité ou de surveillance tiers qui est incompatible avec la redirection du gestionnaire Datadog, vous pouvez [appliquer l'enveloppe Datadog dans votre code de fonction][2] à la place.

4. Configurez le site Datadog, la clé API et le traçage dans votre Dockerfile

    - Définissez la variable d'environnement `DD_SITE` sur {{< region-param key="dd_site" code="true" >}} (assurez-vous que le bon SITE est sélectionné à droite).
    - Définissez la variable d'environnement `DD_API_KEY_SECRET_ARN` avec l'ARN du secret AWS où votre [clé API Datadog][3] est stockée en toute sécurité. La clé doit être stockée sous forme de chaîne de texte brut (pas un blob JSON). L'autorisation `secretsmanager:GetSecretValue` est requise. Pour des tests rapides, vous pouvez utiliser `DD_API_KEY` à la place et définir la clé API Datadog en texte brut.
    - Définissez la variable d'environnement `DD_TRACE_ENABLED` sur `true`.


[1]: https://gallery.ecr.aws/datadog/lambda-extension
[2]: https://docs.datadoghq.com/fr/serverless/guide/handler_wrapper
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Terraform" %}}

Le module Terraform [`lambda-datadog`][1] enveloppe la ressource [`aws_lambda_function`][2] et configure automatiquement votre fonction Lambda pour la surveillance sans serveur de Datadog en :

- Ajout des couches Lambda de Datadog
- Redirection du gestionnaire Lambda
- Activer la collecte et l'envoi de métriques, de traces et de journaux à Datadog

```tf
module "lambda-datadog" {
  source  = "DataDog/lambda-datadog/aws"
  version = "4.0.0"

  environment_variables = {
    "DD_API_KEY_SECRET_ARN" : "<DATADOG_API_KEY_SECRET_ARN>"
    "DD_ENV" : "<ENVIRONMENT>"
    "DD_SERVICE" : "<SERVICE_NAME>"
    "DD_SITE": "<DATADOG_SITE>"
    "DD_VERSION" : "<VERSION>"
  }

  datadog_extension_layer_version = {{< latest-lambda-layer-version layer="extension" >}}
  datadog_python_layer_version = {{< latest-lambda-layer-version layer="python" >}}

  # aws_lambda_function arguments
}
```

1. Remplacez la ressource `aws_lambda_function` par le module Terraform `lambda-datadog`. Ensuite, spécifiez le `source` et le `version` du module.

2. Définissez les arguments `aws_lambda_function` :

   Tous les arguments disponibles dans la ressource `aws_lambda_function` sont disponibles dans ce module Terraform. Les arguments définis comme blocs dans la ressource `aws_lambda_function` sont redéfinis comme des variables avec leurs arguments imbriqués.

   Par exemple, dans `aws_lambda_function`, `environment` est défini comme un bloc avec un argument `variables`. Dans le module Terraform `lambda-datadog`, la valeur pour le `environment_variables` est transmise à l'argument `environment.variables` dans `aws_lambda_function`. Voir [inputs][3] pour une liste complète des variables dans ce module.

3. Remplissez les espaces réservés des variables d'environnement :

   - Remplacez `<DATADOG_API_KEY_SECRET_ARN>` par l'ARN du secret AWS où votre clé API Datadog est stockée en toute sécurité. La clé doit être stockée sous forme de chaîne de texte brut (pas un blob JSON). La permission `secretsmanager:GetSecretValue` est requise. Pour des tests rapides, vous pouvez plutôt utiliser la variable d'environnement `DD_API_KEY` et définir votre clé API Datadog en texte clair.
   - Remplacez `<ENVIRONMENT>` par l'environnement de la fonction Lambda, tel que `prod` ou `staging`
   - Remplacez `<SERVICE_NAME>` par le nom du service de la fonction Lambda
   - Remplacez `<DATADOG_SITE>` par {{< region-param key="dd_site" code="true" >}}. (Assurez-vous que le bon [site Datadog][4] est sélectionné sur cette page).
   - Remplacez `<VERSION>` par le numéro de version de la fonction Lambda

4. Sélectionnez les versions de la couche Datadog Extension Lambda et de la couche Datadog Python Lambda à utiliser. Si laissé vide, les dernières versions des couches seront utilisées.

```
  datadog_extension_layer_version = {{< latest-lambda-layer-version layer="extension" >}}
  datadog_python_layer_version = {{< latest-lambda-layer-version layer="python" >}}
```

[1]: https://registry.terraform.io/modules/DataDog/lambda-datadog/aws/latest
[2]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function
[3]: https://github.com/DataDog/terraform-aws-lambda-datadog?tab=readme-ov-file#inputs
[4]: /fr/getting_started/site/
{{% /tab %}}
{{% tab "SST v3" %}}

Pour configurer Datadog en utilisant SST v3, suivez ces étapes :

  ```ts
  const app = new sst.aws.Function("MyApp", {
    handler: "lambda_function.lambda_handler",
    runtime: "python3.13",
    environment: {
      DD_ENV: "<ENVIRONMENT>",
      DD_SERVICE: "<SERVICE_NAME>",
      DD_VERSION: "<VERSION>",
      DATADOG_API_KEY_SECRET_ARN: "<DATADOG_API_KEY_SECRET_ARN>",
      DD_SITE: "<DATADOG_SITE>",
    },
    layers: [
      $interpolate`arn:aws:lambda:${aws.getRegionOutput().name}:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}`,
      $interpolate`arn:aws:lambda:${aws.getRegionOutput().name}:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="python" >}}`
    ],
  });
  ```

  1. Configure the Datadog Lambda Library and Datadog Lambda Extension layers

     - The available `<RUNTIME>` options are: {{< latest-lambda-layer-version layer="python-versions" >}}.

  2. Remplissez les espaces réservés des variables d'environnement :
     - Remplacez `<DATADOG_API_KEY_SECRET_ARN>` par l'ARN du secret AWS où votre clé API Datadog est stockée en toute sécurité. La clé doit être stockée sous forme de chaîne de texte brut (pas un blob JSON). L'autorisation `secretsmanager:GetSecretValue` est requise. Pour des tests rapides, vous pouvez plutôt utiliser la variable d'environnement `DD_API_KEY` et définir votre clé API Datadog en texte brut.
     - Remplacez `<ENVIRONMENT>` par l'environnement de la fonction Lambda, tel que `prod` ou `staging`
     - Remplacez `<SERVICE_NAME>` par le nom du service de la fonction Lambda
     - Remplacez `<DATADOG_SITE>` par {{< region-param key="dd_site" code="true" >}}. (Assurez-vous que le bon [site Datadog][1] est sélectionné sur cette page).
     - Remplacez `<VERSION>` par le numéro de version de la fonction Lambda

  3. [Appliquez le wrapper Datadog dans votre code de fonction][2]

[1]: /fr/getting_started/site/
[2]: https://docs.datadoghq.com/fr/serverless/guide/handler_wrapper

{{% /tab %}}
{{% tab "Custom" %}}

<div class="alert alert-info">Si vous n'utilisez pas un outil de développement sans serveur que Datadog prend en charge, tel que le Serverless Framework ou AWS CDK, Datadog vous encourage fortement à instrumenter vos applications sans serveur avec le <a href="./?tab=datadogcli">Datadog CLI</a>.</div>

1. Installez la bibliothèque Datadog Lambda

    La bibliothèque Datadog Lambda peut être importée soit en tant que couche (recommandé) _OU_ en tant que package Python.

    La version mineure du package `datadog-lambda` correspond toujours à la version de la couche. Par exemple, datadog-lambda v0.5.0 correspond au contenu de la version de la couche 5.

    - Option A : [Configurez les couches][1] pour votre fonction Lambda en utilisant l'ARN dans le format suivant :

      ```sh
      # Use this format for x86-based Lambda deployed in AWS commercial regions
      arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="python" >}}

      # Use this format for arm64-based Lambda deployed in AWS commercial regions
      arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>-ARM:{{< latest-lambda-layer-version layer="python" >}}

      # Use this format for x86-based Lambda deployed in AWS GovCloud regions
      arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="python" >}}

      # Use this format for arm64-based Lambda deployed in AWS GovCloud regions
      arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>-ARM:{{< latest-lambda-layer-version layer="python" >}}
      ```

      Replace `<AWS_REGION>` with a valid AWS region, such as `us-east-1`. The available `<RUNTIME>` options are: {{< latest-lambda-layer-version layer="python-versions" >}}.

    - Option B: If you cannot use the prebuilt Datadog Lambda layer, alternatively install the `datadog-lambda` package and its dependencies locally to your function project folder using your favorite Python package manager, such as `pip`.

      ```sh
      pip install datadog-lambda -t ./
      ```

      **Note**: `datadog-lambda` depends on `ddtrace`, which uses native extensions; therefore it must be installed and compiled in a Linux environment on the right architecture (`x86_64` or `arm64`). For example, you can use [dockerizePip][2] for the Serverless Framework and [--use-container][3] for AWS SAM. For more details, see [how to add dependencies to your function deployment package][4].

      See the [latest release][5].

2. Installez l'extension Lambda de Datadog

    [Configurez les couches][1] pour votre fonction Lambda à l'aide de l'ARN, en respectant le format suivant :

    ```sh
    # Use this format for x86-based Lambda deployed in AWS commercial regions
    arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}

    # Use this format for arm64-based Lambda deployed in AWS commercial regions
    arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}

    # Use this format for x86-based Lambda deployed in AWS GovCloud regions
    arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}

    # Use this format for arm64-based Lambda deployed in AWS GovCloud regions
    arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
    

```

    Replace `<AWS_REGION>` with a valid AWS region, such as `us-east-1`.

3. Redirigez la fonction gestionnaire

    - Définissez le gestionnaire de votre fonction sur `datadog_lambda.handler.handler`.
    - Définissez la variable d'environnement `DD_LAMBDA_HANDLER` sur votre gestionnaire d'origine, par exemple, `myfunc.handler`.

    **Remarque** : Si vous utilisez un outil de sécurité ou de surveillance tiers qui est incompatible avec la redirection du gestionnaire Datadog, vous pouvez [appliquer l'enveloppe Datadog dans votre code de fonction][6] à la place.

4. Configurez le site Datadog, la clé API et le traçage

    - Définissez la variable d'environnement `DD_SITE` sur {{< region-param key="dd_site" code="true" >}} (assurez-vous que le bon SITE est sélectionné à droite).
    - Définissez la variable d'environnement `DD_API_KEY_SECRET_ARN` avec l'ARN du secret AWS où votre [clé API Datadog][7] est stockée en toute sécurité. La clé doit être stockée sous forme de chaîne de texte brut, au lieu d'être à l'intérieur d'un blob json. L'autorisation `secretsmanager:GetSecretValue` est requise. Pour des tests rapides, vous pouvez utiliser `DD_API_KEY` à la place et définir la clé API Datadog en texte brut.
    - Définissez la variable d'environnement `DD_TRACE_ENABLED` sur `true`.

5. (AWS Chalice uniquement) Enregistrez le middleware

    Si vous utilisez [AWS Chalice][8], vous devez installer `datadog-lambda` en utilisant `pip`, et enregistrer `datadog_lambda_wrapper` en tant que [middleware][9] dans votre `app.py` :

    ```python
    from chalice import Chalice, ConvertToMiddleware
    from datadog_lambda.wrapper import datadog_lambda_wrapper

    app = Chalice(app_name='hello-chalice')

    app.register_middleware(ConvertToMiddleware(datadog_lambda_wrapper))

    @app.route('/')
    def index():
        return {'hello': 'world'}
    ```

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://github.com/UnitedIncome/serverless-python-requirements#cross-compiling
[3]: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-build.html
[4]: https://docs.aws.amazon.com/lambda/latest/dg/python-package.html#python-package-dependencies
[5]: https://pypi.org/project/datadog-lambda/
[6]: https://docs.datadoghq.com/fr/serverless/guide/handler_wrapper
[7]: https://app.datadoghq.com/organization-settings/api-keys
[8]: https://aws.github.io/chalice/
[9]: https://aws.github.io/chalice/topics/middleware.html
{{% /tab %}}
{{< /tabs >}}

{{% svl-tracing-env %}}

## Conformité FIPS {#fips-compliance}

{{% svl-lambda-fips %}}

## AWS Lambda et VPC {#aws-lambda-and-vpc}

{{% svl-lambda-vpc %}}

## Quelle est la suite ? {#whats-next}

- Ajoutez des balises personnalisées à votre télémétrie en utilisant la variable d'environnement `DD_TAGS`
- Configurez [la collecte de payload][12] pour capturer les payloads JSON de requête et de réponse de vos fonctions
- Si vous utilisez l'extension Lambda de Datadog, désactivez les journaux Lambda du Forwarder Datadog
- Voir [Configurer la surveillance sans serveur pour AWS Lambda][3] pour d'autres capacités

### Surveillez la logique métier personnalisée {#monitor-custom-business-logic}

Pour surveiller votre logique métier personnalisée, soumettez une métrique ou un span personnalisé en utilisant le code d'exemple ci-dessous. Pour des options supplémentaires, consultez [la soumission de métriques personnalisées pour les applications sans serveur][4] et le guide APM pour [l'instrumentation personnalisée][5].

```python
import time
from ddtrace import tracer
from datadog_lambda.metric import lambda_metric

def lambda_handler(event, context):
    # add custom tags to the lambda function span,
    # does NOT work when X-Ray tracing is enabled
    current_span = tracer.current_span()
    if current_span:
        current_span.set_tag('customer.id', '123456')

    # submit a custom span
    with tracer.trace("hello.world"):
        print('Hello, World!')

    # submit a custom metric
    lambda_metric(
        metric_name='coffee_house.order_value',
        value=12.45,
        tags=['product:latte', 'order:online']
    )

    return {
        'statusCode': 200,
        'body': get_message()
    }

# trace a function
@tracer.wrap()
def get_message():
    return 'Hello from serverless!'
```

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/functions
[2]: /fr/serverless/guide/troubleshoot_serverless_monitoring/
[3]: /fr/serverless/configuration/
[4]: /fr/serverless/aws_lambda/metrics/?code-lang=python
[5]: /fr/tracing/custom_instrumentation/python/
[6]: /fr/security/application_security/serverless/
[7]: https://github.com/DataDog/datadog-lambda-extension
[8]: https://github.com/DataDog/datadog-lambda-extension/issues
[9]: /fr/serverless/aws_lambda/distributed_tracing/#span-auto-linking
[10]: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html
[11]: /fr/serverless/aws_lambda/remote_instrumentation
[12]: /fr/serverless/aws_lambda/configuration?tab=datadogcli#collect-the-request-and-response-payloads