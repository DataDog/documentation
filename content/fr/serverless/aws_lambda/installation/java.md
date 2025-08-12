---
aliases:
- /fr/serverless/datadog_lambda_library/java/
- /fr/serverless/installation/java
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
title: Instrumenter des applications Java sans serveur
---

Pour instrumenter entièrement votre application sans serveur grâce au tracing distribué, vos fonctions Lambda Java doivent utiliser le runtime Java 8 Corretto (`java8.al2`), Java 11 (`java11`), Java 17 (`java17`) ou Java 21 (`java21`) avec au moins 1 024 Mo de mémoire.

Si vos fonctions Lambda sont déployées dans un VPC sans accès à Internet, vous pouvez envoyer vos données [via AWS PrivateLink][6] pour le [site Datadog][7] `datadoghq.com` ou [via un proxy][8] pour tous les autres sites.

Si vous avez déjà configuré vos fonctions Lambda à l'aide du Datadog Forwarder, consultez la documentation relative à l'[instrumentation avec le Forwarder Datadog][9]. Vous pouvez également suivre les instructions fournies dans ce guide pour instrumenter vos applications avec l'extension Lambda Datadog.

Si vous utilisez les couches Lambda Datadog `dd-trace-java:4` (ou des versions antérieures) et `Datadog-Extension:24` (ou des versions antérieures), suivez les [instructions de mise à niveau spéciales][10].

## Installation

Datadog propose de nombreuses méthodes différentes pour instrumenter vos applications sans serveur. Choisissez celle qui répond le mieux à vos besoins ci-dessous. Nous vous conseillons d'utiliser l'interface de ligne de commande Datadog. Vous *devez* suivre les instructions fournies pour "Image de conteneur" si votre application est déployée en tant qu'image de conteneur.

{{< tabs >}}
{{% tab "Interface de ligne de commande Datadog" %}}

L'interface de ligne de commande Datadog permet de modifier les configurations des fonctions Lambda existantes pour instrumenter vos applications sans les redéployer. Il s'agit du moyen le plus rapide de tirer parti de la surveillance sans serveur de Datadog.

1. Installer l'interface de ligne de commande Datadog

    ```sh
    npm install -g @datadog/datadog-ci
    ```

2. Si vous commencez tout juste à utiliser la surveillance sans serveur Datadog, lancez l'interface de ligne de commande Datadog en mode interactif pour procéder rapidement à la première installation. Vous pouvez ignorer les autres étapes indiquées sur cette page. Pour installer définitivement Datadog pour vos applications de production, ignorez cette étape et suivez les autres étapes pour exécuter la commande de l'interface de ligne de commande Datadog dans vos pipelines de CI/CD _après_ un déploiement normal.

    ```sh
    datadog-ci lambda instrument -i
    ```

3. Configurer les identifiants AWS

    L'interface de ligne de commande Datadog nécessite un accès au service AWS Lambda et dépend du SDK JavaScript AWS pour [résoudre les identifiants][1]. Assurez-vous de configurer vos identifiants AWS à l'aide de la même méthode que celle utilisée lors de l'appel de l'interface de ligne de commande AWS.

4. Configurer le site Datadog

    ```sh
    export DATADOG_SITE="<DATADOG_SITE>"
    ```

    Remplacez `<DATADOG_SITE>` par {{< region-param key="dd_site" code="true" >}} (assurez-vous que le SITE sélectionné à droite est correct).

5. Configurez votre clé d'API Datadog

    Datadog vous recommande d'enregistrer la clé d'API Datadog dans AWS Secrets Manager pour améliorer la sécurité et pour faciliter la rotation. La clé doit être stockée sous forme de chaîne de texte brut (et non en tant que blob JSON). Assurez-vous que vos fonctions Lambda disposent de l'autorisation IAM `secretsmanager:GetSecretValue` requise.

    ```sh
    export DATADOG_API_KEY_SECRET_ARN="<DATADOG_API_KEY_SECRET_ARN>"
    ```

    Pour effectuer un test rapide, vous pouvez également définir la clé d'API Datadog sous forme de texte brut :

    ```sh
    export DATADOG_API_KEY="<DATADOG_API_KEY>"
    ```

6. Instrumenter vos fonctions Lambda

    **Remarque** : instrumentez d'abord vos fonctions Lambda dans un environnement de type dev ou staging. Si les résultats de votre instrumentation ne vous conviennent pas, exécutez `uninstrument` avec les mêmes arguments pour annuler les modifications.

    Pour instrumenter vos fonctions Lambda, exécutez la commande suivante.

    ```sh
    datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v {{< latest-lambda-layer-version layer="dd-trace-java" >}} -e {{< latest-lambda-layer-version layer="extension" >}}
    ```

    Renseignez les paramètres fictifs comme suit :
    - Remplacez `<functionname>` et `<another_functionname>` par les noms de vos fonctions Lambda. Vous pouvez également utiliser `--functions-regex` pour instrumenter automatiquement plusieurs fonctions dont les noms correspondent à l'expression régulière fournie.
    - Remplacez `<aws_region>` par le nom de la région AWS.

    Pour obtenir des paramètres supplémentaires, consultez la [documentation relative à l'interface de ligne de commande][2].

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

Le [plug-in Serverless Datadog][1] configure vos fonctions afin qu'elles envoient des métriques, traces et logs à Datadog via l'[extension Lambda Datadog][2].

Pour installer et configurer le plug-in Serverless Datadog, suivez les étapes suivantes :

1. Pour installer le plug-in Serverless Datadog :

    ```sh
    serverless plugin install --name serverless-plugin-datadog
    ```

2. Modifiez votre fichier `serverless.yml` :

    ```yaml
    custom:
      datadog:
        site: <DATADOG_SITE>
        apiKeySecretArn: <DATADOG_API_KEY_SECRET_ARN>
    ```

    Renseignez les paramètres fictifs comme suit :
    - Remplacez `<SITE_DATADOG>` par {{< region-param key="dd_site" code="true" >}} (assurez-vous que le SITE sélectionné à droite est correct).
    - Remplacez `<DATADOG_API_KEY_SECRET_ARN>` par l'ARN du secret AWS où votre [clé d'API Datadog][3] est stockée en toute sécurité. La clé doit être stockée sous forme de chaîne de texte brut (et non en tant que blob JSON). L'autorisation `secretsmanager:GetSecretValue` est requise. Pour effectuer un test rapide, vous pouvez également utiliser `apiKey` et définir la clé d'API Datadog sous forme de texte brut.

    Pour obtenir plus de détails ainsi que des paramètres supplémentaires, consultez la [documentation relative au plug-in][1].

[1]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/fr/serverless/libraries_integrations/extension
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "AWS SAM" %}}

La [macro CloudFormation Datadog][1] transforme automatiquement votre modèle d'application SAM dans le but d'installer Datadog sur vos fonctions à l'aide des couches Lambda. De plus, elle configure vos fonctions afin qu'elles envoient des métriques, traces et logs à Datadog via l'[extension Lambda Datadog][2].

1. Installer la macro CloudFormation Datadog

    Exécutez la commande suivante avec vos [identifiants AWS][3] pour déployer une pile CloudFormation qui installe la ressource AWS de la macro. Vous ne devez installer la macro qu'**une seule fois** par région de votre compte. Remplacez `create-stack` par `update-stack` pour installer la dernière version de la macro.

    ```sh
    aws cloudformation create-stack \
      --stack-name datadog-serverless-macro \
      --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
      --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
    ```

    La macro est désormais déployée et utilisable.

2. Instrumenter vos fonctions Lambda

    Ajoutez la transformation `DatadogServerless` **après** la transformation `AWS::Serverless` sous la section `Transform` de votre fichier `template.yml` pour SAM.

    ```yaml
    Transform:
      - AWS::Serverless-2016-10-31
      - Name: DatadogServerless
        Parameters:
          stackName: !Ref "AWS::StackName"
          javaLayerVersion: {{< latest-lambda-layer-version layer="dd-trace-java" >}}
          extensionLayerVersion: {{< latest-lambda-layer-version layer="extension" >}}
          site: "<DATADOG_SITE>"
          apiKeySecretArn: "<DATADOG_API_KEY_SECRET_ARN>"
    ```

    Renseignez les paramètres fictifs comme suit :
    - Remplacez `<SITE_DATADOG>` par {{< region-param key="dd_site" code="true" >}} (assurez-vous que le SITE sélectionné à droite est correct).
    - Remplacez `<DATADOG_API_KEY_SECRET_ARN>` par l'ARN du secret AWS où votre [clé d'API Datadog][4] est stockée en toute sécurité. La clé doit être stockée sous forme de chaîne de texte brut (et non en tant que blob JSON). L'autorisation `secretsmanager:GetSecretValue` est requise. Pour effectuer un test rapide, vous pouvez utiliser `apiKey` et définir la clé d'API Datadog sous forme de texte brut.

    Pour obtenir plus de détails ainsi que des paramètres supplémentaires, consultez la [documentation relative à la macro][1].


[1]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/macro
[2]: https://docs.datadoghq.com/fr/serverless/libraries_integrations/extension
[3]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
[4]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "AWS CDK" %}}

<div class="alert alert-info">L'instrumentation de fonctions Java via le CDK Construct Datadog est disponible uniquement pour les applications AWS CDK écrites en Node.js et Python.</div>

La [bibliothèque CDK Construct Datadog][1] installe automatiquement Datadog sur vos fonctions à l'aide des couches Lambda. Elle configure vos fonctions afin qu'elles envoient des métriques, traces et logs à Datadog via l'extension Lambda Datadog.

1. Installer la bibliothèque CDK Construct Datadog

    **Node.js** :
    ```sh
    # For AWS CDK v1
    npm install datadog-cdk-constructs --save-dev

    # For AWS CDK v2
    npm install datadog-cdk-constructs-v2 --save-dev
    ```

    **Python** :
    ```sh
    # For AWS CDK v1
    pip install datadog-cdk-constructs

    # For AWS CDK v2
    pip install datadog-cdk-constructs-v2
    ```

2. Instrumenter vos fonctions Lambda

    **Node.js** :
    ```javascript
    // For AWS CDK v1
    import { Datadog } from "datadog-cdk-constructs";

    // For AWS CDK v2
    import { Datadog } from "datadog-cdk-constructs-v2";

    const datadog = new Datadog(this, "Datadog", {
        javaLayerVersion: {{< latest-lambda-layer-version layer="dd-trace-java" >}},
        extensionLayerVersion: {{< latest-lambda-layer-version layer="extension" >}},
        site: "<DATADOG_SITE>",
        apiKeySecretArn: "<DATADOG_API_KEY_SECRET_ARN>"
    });
    datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>])
    ```

    **Python** :
    ```python
    # For AWS CDK v1
    from datadog_cdk_constructs import Datadog

    # For AWS CDK v2
    from datadog_cdk_constructs_v2 import Datadog

    datadog = Datadog(self, "Datadog",
        java_layer_version={{< latest-lambda-layer-version layer="dd-trace-java" >}},
        extension_layer_version={{< latest-lambda-layer-version layer="extension" >}},
        site="<DATADOG_SITE>",
        api_key_secret_arn="<DATADOG_API_KEY_SECRET_ARN>",
      )
    datadog.add_lambda_functions([<LAMBDA_FUNCTIONS>])
    ```

    Renseignez les paramètres fictifs comme suit :
    - Remplacez `<SITE_DATADOG>` par {{< region-param key="dd_site" code="true" >}} (assurez-vous que le SITE sélectionné à droite est correct).
    - Remplacez `<DATADOG_API_KEY_SECRET_ARN>` par l'ARN du secret AWS où votre [clé d'API Datadog][2] est stockée de façon sécurisée. La clé doit être stockée sous forme de chaîne de texte brut (et non en tant que blob JSON). Assurez-vous que le rôle d'exécution de votre fonction Lambda dispose de l'autorisation IAM `secretsmanager:GetSecretValue` pour lire la valeur du secret. Pour effectuer un test rapide, vous pouvez utiliser `apiKey` et définir la clé d'API Datadog sous forme de texte brut.

    Pour obtenir plus de détails ainsi que des paramètres supplémentaires, consultez la [documentation relative à la bibliothèque CDK Datadog][1].

[1]: https://github.com/DataDog/datadog-cdk-constructs
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Image de conteneur" %}}

1. Installer l'extension Lambda Datadog

    ```dockerfile
    COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/. /opt/
    ```

   Remplacez `<TAG>` par un numéro de version spécifique (par exemple,  `{{< latest-lambda-layer-version layer="extension" >}}`) ou par `latest`. Il en va de même pour Alpine : indiquez un numéro de version spécifique (par exemple, `{{< latest-lambda-layer-version layer="extension" >}}-alpine`) ou `latest-alpine`. Consultez le [référentiel Amazon ECR][1] pour découvrir la liste complète des tags autorisés.

2. Installer le client APM Java Datadog

    ```dockerfile
    RUN yum -y install tar wget gzip
    RUN wget -O /opt/java/lib/dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
    ```

3. Définir les variables d'environnement requises

    - Définissez `AWS_LAMBDA_EXEC_WRAPPER` sur `/opt/datadog_wrapper`.
    - Définissez `DD_SITE` sur {{< region-param key="dd_site" code="true" >}} (assurez-vous que le SITE sélectionné à droite est correct).
    - Définissez `DD_API_KEY_SECRET_ARN` sur l'ARN du secret AWS où votre [clé d'API Datadog][2] est stockée de façon sécurisée. La clé doit être stockée sous forme de chaîne de texte brut (et non en tant que blob JSON). L'autorisation `secretsmanager:GetSecretValue` est requise. Pour effectuer un test rapide, vous pouvez également utiliser `DD_API_KEY` et définir la clé d'API Datadog sous forme de texte brut.

[1]: https://gallery.ecr.aws/datadog/lambda-extension
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Terraform" %}}

Le module Terraform [`lambda-datadog`][1] enveloppe la ressource [`aws_lambda_function`][2] et configure automatiquement votre fonction Lambda pour la surveillance sans serveur Datadog en :

- Ajoutant les couches Lambda Datadog
- Redirigeant le gestionnaire Lambda
- Activant la collecte et l'envoi de métriques, traces, et logs à Datadog

```tf
module "lambda-datadog" {
  source  = "DataDog/lambda-datadog/aws"
  version = "3.2.1"

  environment_variables = {
    "DD_API_KEY_SECRET_ARN" : "<ARN_SECRET_CLÉ_API_DATADOG>"
    "DD_ENV" : "<ENVIRONNEMENT>"
    "DD_SERVICE" : "<NOM_SERVICE>"
    "DD_SITE": "<SITE_DATADOG>"
    "DD_VERSION" : "<VERSION>"
  }

  datadog_extension_layer_version = {{< latest-lambda-layer-version layer="extension" >}}
  datadog_java_layer_version = {{< latest-lambda-layer-version layer="dd-trace-java" >}}

  # aws_lambda_function arguments
}
```

1. Remplacez la ressource `aws_lambda_function` par le module Terraform `lambda-datadog`. Indiquez ensuite le `source` et la `version` du module.

2. Définissez les arguments de `aws_lambda_function` :

   Tous les arguments disponibles dans la ressource `aws_lambda_function` sont disponibles dans ce module Terraform. Les arguments définis comme des blocs dans la ressource `aws_lambda_function` sont redéfinis comme des variables avec leurs arguments imbriqués.

   Par exemple, dans `aws_lambda_function`, `environment` est défini comme un bloc avec un argument `variables`. Dans le module Terraform `lambda-datadog`, la valeur de `environment_variables` est transmise à l'argument `environment.variables` dans `aws_lambda_function`. Référez-vous à la section [entrées][3] pour une liste complète des variables de ce module.

3. Remplissez les paramètres fictifs de la variable d'environnement :

   - Remplacez `<DATADOG_API_KEY_SECRET_ARN>` par l'ARN du secret AWS où votre [clé d'API Datadog][3] est stockée en toute sécurité. La clé doit être stockée sous forme de chaîne de texte brut (et non en tant que blob JSON). L'autorisation `secretsmanager:GetSecretValue` est requise. Pour effectuer un test rapide, vous pouvez également utiliser la variable d'environnement `DD_API_KEY` et définir votre clé d'API Datadog sous forme de texte brut.
   - Remplacez `<ENVIRONMENT>` par l'environnement de la fonction Lambda, comme `prod` ou `staging`
   - Remplacez `<NOM_SERVICE>` par le nom du service de la fonction Lambda
   - Remplacez `<SITE_DATADOG>` par {{< region-param key="dd_site" code="true" >}} (assurez-vous que le [site Datadog][4] est sélectionné sur cette page).
   - Remplacez `<VERSION>` par le numéro de version de la fonction Lambda

4. Sélectionnez les versions de la couche de l'extension Lambda Datadog et de la couche Datadog Lambda Java à utiliser. Si rien n'est indiqué, les dernières versions de la couche seront utilisées.

```
  datadog_extension_layer_version = {{< latest-lambda-layer-version layer="extension" >}}
  datadog_java_layer_version = {{< latest-lambda-layer-version layer="dd-trace-java" >}}
```

[1]: https://registry.terraform.io/modules/DataDog/lambda-datadog/aws/latest
[2]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function
[3]: https://github.com/DataDog/terraform-aws-lambda-datadog?tab=readme-ov-file#inputs
[4]: /fr/getting_started/site/
{{% /tab %}}
{{% tab "Configuration personnalisée" %}}

1. Installer le traceur Datadog

    [Configurez les couches][1] pour votre fonction Lambda à l'aide de l'ARN, en respectant le format suivant :

    ```sh
    # Use this format for Lambda deployed in AWS commercial regions
    arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-java:{{< latest-lambda-layer-version layer="dd-trace-java" >}}

    # Use this format for Lambda deployed in AWS GovCloud regions
    arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-java:{{< latest-lambda-layer-version layer="dd-trace-java" >}}
    ```

    Remplacez `<AWS_REGION>` par une région AWS valide, telle que `us-east-1`.

2. Installer l'extension Lambda Datadog

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

    Remplacez `<AWS_REGION>` par une région AWS valide, telle que `us-east-1`.

3. Définir les variables d'environnement requises

    - Définissez `AWS_LAMBDA_EXEC_WRAPPER` sur `/opt/datadog_wrapper`.
    - Définissez `DD_SITE` sur {{< region-param key="dd_site" code="true" >}} (assurez-vous que le SITE sélectionné à droite est correct).
    - Définissez `DD_API_KEY_SECRET_ARN` sur l'ARN du secret AWS où votre [clé d'API Datadog][2] est stockée de façon sécurisée. La clé doit être stockée sous forme de chaîne de texte brut (et non en tant que blob JSON). L'autorisation `secretsmanager:GetSecretValue` est requise. Pour effectuer un test rapide, vous pouvez également utiliser `DD_API_KEY` et définir la clé d'API Datadog sous forme de texte brut.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

## Et ensuite ?

- Vous pouvez désormais visualiser vos métriques, logs et traces sur la [page d'accueil Serverless][1].
- Activez la [surveillance des menaces][11] pour recevoir des alertes en cas d'attaques ciblant votre service.
- Envoyez une [métrique custom][2] ou une [span APM][3] pour surveiller votre logique opérationnelle.
- Consultez le [guide de dépannage][4] si vous ne parvenez pas à recueillir les données de télémétrie.
- Examinez les [configurations avancées][5] pour :
    - Associer des données de télémétrie à l'aide de tags
    - recueillir des données télémétriques pour Amazon API Gateway, SQS, etc.
    - Capturer les charges utiles des requêtes et des réponses Lambda
    - Associer les erreurs de vos fonctions Lambda à votre code source
    - Filtrer ou nettoyer des informations sensibles des logs ou des traces

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/functions
[2]: https://docs.datadoghq.com/fr/metrics/dogstatsd_metrics_submission/
[3]: /fr/tracing/custom_instrumentation/java/
[4]: /fr/serverless/guide/troubleshoot_serverless_monitoring/
[5]: /fr/serverless/configuration/
[6]: /fr/agent/guide/private-link/
[7]: /fr/getting_started/site/
[8]: /fr/agent/configuration/proxy/
[9]: /fr/serverless/guide/datadog_forwarder_java
[10]: /fr/serverless/guide/upgrade_java_instrumentation
[11]: /fr/security/application_security/serverless/
