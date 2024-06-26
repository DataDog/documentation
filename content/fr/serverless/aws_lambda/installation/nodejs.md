---
aliases:
- /fr/serverless/datadog_lambda_library/nodejs/
- /fr/serverless/guide/nodejs/
- /fr/serverless/installation/nodejs
further_reading:
- link: /serverless/configuration
  tag: Documentation
  text: Configurer la surveillance sans serveur
- link: /serverless/guide/serverless_tracing_and_bundlers/
  tag: Documentation
  text: Tracing Lambda Node.js et compatibilité de bundlers
- link: /serverless/guide/troubleshoot_serverless_monitoring
  tag: Documentation
  text: Dépannage de la surveillance sans serveur
- link: serverless/custom_metrics/
  tag: Documentation
  text: Envoyer des métriques custom depuis des applications sans serveur
kind: documentation
title: Instrumenter des applications Node.js sans serveur
---

<div class="alert alert-warning">Si vous avez déjà configuré vos fonctions Lambda à l'aide du Datadog Forwarder, consultez la documentation relative à l'<a href="https://docs.datadoghq.com/serverless/guide/datadog_forwarder_node">instrumentation avec le Forwarder Datadog</a>. Vous pouvez également suivre les instructions fournies dans ce guide pour instrumenter vos applications avec l'extension Lambda Datadog.</div>

<div class="alert alert-warning">Si vos fonctions Lambda sont déployées dans un VPC sans accès à Internet, vous pouvez transmettre des données avec <a href="/agent/guide/private-link/">AWS PrivateLink</a> pour le <a href="/getting_started/site/">site Datadog</a> <code>datadoghq.com</code>, ou avec <a href="/agent/configuration/proxy/">un proxy</a> pour tous les autres sites.</div>

<div class="alert alert-warning">Si vous créez un bundle avec webpack ou esbuild, vous devrez peut-être <a href="/serverless/guide/serverless_tracing_and_bundlers/">marquer les bibliothèques Datadog comme externes</a>.</div>

## Azure App Service

Datadog propose de nombreuses méthodes différentes pour instrumenter vos applications sans serveur. Choisissez celle qui répond le mieux à vos besoins ci-dessous. Nous vous conseillons d'utiliser l'interface de ligne de commande Datadog. Vous *devez* suivre les instructions fournies pour "Image de conteneur" si votre application est déployée en tant qu'image de conteneur.

{{< tabs >}}
{{% tab "Interface de ligne de commande Datadog" %}}

L'interface de ligne de commande Datadog permet de modifier les configurations des fonctions Lambda existantes pour instrumenter vos applications sans les redéployer. Il s'agit du moyen le plus rapide de tirer parti de la surveillance sans serveur de Datadog.

1. Installer l'interface de ligne de commande Datadog

    ```sh
    npm install -g @datadog/datadog-ci
    ```

2. Si vous commencez tout juste à utiliser la surveillance sans serveur Datadog, lancez l'interface de ligne de commande Datadog en mode interactif pour procéder rapidement à la première installation. Vous pouvez ignorer les autres étapes. Pour installer définitivement Datadog pour vos applications de production, ignorez cette étape et suivez les autres étapes afin d'exécuter la commande de l'interface de ligne de commande Datadog dans vos pipelines de CI/CD _après_ un déploiement normal.

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

5. Configurer la clé d'API Datadog

    Datadog vous recommande d'enregistrer la clé d'API Datadog dans AWS Secrets Manager pour améliorer la sécurité et pour faciliter la rotation. La clé doit être stockée sous forme de chaîne de texte brut (et non en tant que blob JSON). Assurez-vous que vos fonctions Lambda disposent de l'autorisation IAM `secretsmanager:GetSecretValue` requise.

    ```sh
    export DATADOG_API_KEY_SECRET_ARN="<DATADOG_API_KEY_SECRET_ARN>"
    ```

    Pour effectuer un test rapide, vous pouvez également définir la clé d'API Datadog sous forme de texte brut :

    ```sh
    export DATADOG_API_KEY="<DATADOG_API_KEY>"
    ```

6. Instrumenter vos fonctions Lambda

    **Remarque** : instrumentez d'abord vos fonctions Lambda dans un environnement de type dev ou staging. Si les résultats de l'instrumentation ne vous conviennent pas, exécutez `uninstrument` avec les mêmes arguments pour annuler les modifications.

    Pour instrumenter vos fonctions Lambda, exécutez la commande suivante.

    ```sh
    datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v {{< latest-lambda-layer-version layer="node" >}} -e {{< latest-lambda-layer-version layer="extension" >}}
    ```

    Renseignez les paramètres fictifs comme suit :
    - Remplacez `<functionname>` et `<another_functionname>` par les noms de vos fonctions Lambda. Vous pouvez également utiliser `--functions-regex` pour instrumenter automatiquement plusieurs fonctions dont les noms correspondent à l'expression régulière fournie.
    - Remplacez `<aws_region>` par le nom de la région AWS.

    Pour obtenir des paramètres supplémentaires, consultez la [documentation relative à l'interface de ligne de commande][2].


[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

<div class="alert alert-info">Si vous choisissez plutôt de déployer votre application Serverless  Framework <a href="https://www.serverless.com/framework/docs/providers/aws/guide/intro">en exportant nativement un objet JSON à partir d'un fichier JavaScript</a> (en utilisant par exemple un fichier <code>serverless.ts</code>), suivez les <a href="./?tab=custom">instructions d'installation personnalisées</a>.</div>

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

    Ajoutez la transformation `DatadogServerless` **après** la transformation `AWS::Serverless` sous la section `Transform` dans votre fichier `template.yml`.

    ```yaml
    Transform:
      - AWS::Serverless-2016-10-31
      - Name: DatadogServerless
        Parameters:
          stackName: !Ref "AWS::StackName"
          nodeLayerVersion: {{< latest-lambda-layer-version layer="node" >}}
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

La [bibliothèque CDK Construct Datadog][1] installe automatiquement Datadog sur vos fonctions à l'aide des couches Lambda. De plus, elle configure vos fonctions afin qu'elles envoient des métriques, traces et logs à Datadog via l'extension Lambda Datadog.

1. Installer la bibliothèque CDK Construct Datadog

    ```sh
    # For AWS CDK v1
    npm install datadog-cdk-constructs --save-dev

    # For AWS CDK v2
    npm install datadog-cdk-constructs-v2 --save-dev
    ```

2. Instrumenter vos fonctions Lambda

    ```javascript
    // For AWS CDK v1
    import { Datadog } from "datadog-cdk-constructs";

    // For AWS CDK v2
    import { Datadog } from "datadog-cdk-constructs-v2";

    const datadog = new Datadog(this, "Datadog", {
        nodeLayerVersion: {{< latest-lambda-layer-version layer="node" >}},
        extensionLayerVersion: {{< latest-lambda-layer-version layer="extension" >}},
        site: "<DATADOG_SITE>",
        apiKeySecretArn: "<DATADOG_API_KEY_SECRET_ARN>"
    });
    datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>])
    ```

    Renseignez les paramètres fictifs comme suit :
    - Remplacez `<SITE_DATADOG>` par {{< region-param key="dd_site" code="true" >}} (assurez-vous que le SITE sélectionné à droite est correct).
    - Remplacez `<DATADOG_API_KEY_SECRET_ARN>` par l'ARN du secret AWS où votre [clé d'API Datadog][2] est stockée en toute sécurité. La clé doit être stockée sous forme de chaîne de texte brut (et non en tant que blob JSON). L'autorisation `secretsmanager:GetSecretValue` est requise. Pour effectuer un test rapide, vous pouvez utiliser `apiKey` et définir la clé d'API Datadog sous forme de texte brut.

    Pour obtenir plus de détails ainsi que des paramètres supplémentaires, consultez la [documentation relative à la bibliothèque CDK Datadog][1].

[1]: https://github.com/DataDog/datadog-cdk-constructs
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Image de conteneur" %}}

1. Installer la bibliothèque Lambda Datadog

    Si vous déployez votre fonction Lambda en tant qu'image de conteneur, vous ne pourrez pas utiliser la bibliothèque Lambda Datadog en tant que couche Lambda. À la place, il vous faudra grouper la bibliothèque Lambda Datadog et les bibliothèques de tracing dans l'image.

    ```sh
    npm install datadog-lambda-js dd-trace
    ```

    Veuillez noter que la version mineure du package `datadog-lambda-js` correspond toujours à la version de la couche. Par exemple, `datadog-lambda-js v0.5.0` correspond au contenu de la version 5 de la couche.

2. Installer l'extension Lambda Datadog

    Ajoutez l'extension Lambda Datadog à votre image de conteneur en ajoutant ce qui suit à votre Dockerfile :

    ```dockerfile
    COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/extensions/ /opt/extensions
    ```

   Remplacez `<TAG>` par un numéro de version spécifique (par exemple,  `{{< latest-lambda-layer-version layer="extension" >}}`) ou par `latest`. Il en va de même pour Alpine : indiquez un numéro de version spécifique (par exemple, `{{< latest-lambda-layer-version layer="extension" >}}-alpine`) ou `latest-alpine`. Consultez le [référentiel Amazon ECR][1] pour découvrir la liste complète des tags autorisés.

3. Rediriger la fonction du gestionnaire

    - Définissez la valeur `CMD` de votre image sur `node_modules/datadog-lambda-js/dist/handler.handler`. Vous pouvez effectuer cette opération dans AWS ou directement dans votre Dockerfile. Notez que la valeur définie dans AWS remplace celle définie dans le Dockerfile, si vous avez défini les deux.
    - Définissez la variable d'environnement `DD_LAMBDA_HANDLER` sur votre gestionnaire d'origine, comme `myfunc.handler`.
    - Si vous utilisez ESModule avec le conteneur, vous devrez supprimer le fichier `handler.js`. Ce dernier existe pour Node 12 et sera supprimé lorsque AWS ne prendra plus en charge Node 12.
      ```dockerfile
      RUN rm node_modules/datadog-lambda-js/dist/handler.js
      CMD ["node_modules/datadog-lambda-js/dist/handler.handler"]
      ```

    **Remarque** : si votre fonction Lambda s'exécute sur `arm64`, vous devez créer votre image de conteneur dans un environnement Amazon Linux basé sur arm64 ou [appliquer le wrapper Datadog dans le code de votre fonction][2]. Vous devrez peut-être procéder de la sorte si vous utilisez un outil de sécurité ou de surveillance tiers qui n'est pas compatible avec la redirection du gestionnaire Datadog.

4. Configurer la clé d'API et le site Datadog

    - Définissez la variable d'environnement `DD_SITE` sur {{< region-param key="dd_site" code="true" >}} (assurez-vous que le SITE sélectionné à droite est correct).
    - Définissez la variable d'environnement `DD_API_KEY_SECRET_ARN` sur l'ARN du secret AWS où votre [clé d'API Datadog][3] est stockée en toute sécurité. La clé doit être stockée sous forme de chaîne de texte brut (et non en tant que blob JSON). L'autorisation `secretsmanager:GetSecretValue` est requise. Pour effectuer un test rapide, vous pouvez également utiliser `DD_API_KEY` et définir la clé d'API Datadog sous forme de texte brut.


[1]: https://gallery.ecr.aws/datadog/lambda-extension
[2]: https://docs.datadoghq.com/fr/serverless/guide/handler_wrapper
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Terraform" %}}

Pour utiliser Terraform, [incorporez votre gestionnaire de fonction Lambda][2] avec la bibliothèque Lambda Datadog. Définissez le gestionnaire de votre fonction sur la fonction de gestion de Datadog, à savoir `/opt/nodejs/node_modules/datadog-lambda-js/handler.handler`.

Utilisez le format suivant pour votre [ressource Terraform][1] :
```sh
resource "aws_lambda_function" "lambda" {
  "function_name" = ...
  ...

  # Assurez-vous de choisir les couches adéquates en fonction de votre architecture Lambda et de vos régions

  layers = [
    <ARN_TRACEUR_DATADOG>,
    <ARN_EXTENSION_DATADOG>
  ]

  handler = "/opt/nodejs/node_modules/datadog-lambda-js/handler.handler"

  environment {
    variables = {
      DD_SITE                     = <SITE_DATADOG>
      DD_API_KEY_SECRET_ARN       = <CLÉ_API>
      DD_LAMBDA_HANDLER           = <GESTIONNAIRE_LAMBDA>
    }
  }
}
```

Renseignez les variables adéquates :

1. Remplacez `<ARN_TRACEUR_DATADOG>` par l'ARN du traceur Datadog adéquat en fonction de votre type de région :

    <table>
        <tr>
            <th>AWS REGIONS</th>
            <th>LAYERS</th>
        </tr>
        <tr>
            <td>Commercial</td>
            <td>
                <code>
                arn:aws:lambda:&lt;AWS_REGION&gt;:464622532012:layer:Datadog-&lt;RUNTIME&gt;:{{< latest-lambda-layer-version layer="node" >}}
                </code>
            </td>
        </tr>
        <tr>
            <td>GovCloud</td>
            <td>
                <code>
                arn:aws-us-gov:lambda:&lt;AWS_REGION&gt;:002406178527:layer:Datadog-&lt;RUNTIME&gt;:{{< latest-lambda-layer-version layer="node" >}}
                </code>
                </td>
        </tr>
    </table>

   Dans l'ARN, remplacez `<AWS_REGION>` par une région AWS valide, comme `us-east-1`. Remplacez `<RUNTIME>` par l'une des valeurs suivantes : {{< latest-lambda-layer-version layer="node-versions" >}}.

2. Remplacez `<ARN_EXTENSION_DATADOG>` par l'ARN de l'extension Lambda Datadog adéquate en fonction de votre région et de votre architecture.

    <table>
        <tr>
            <th>AWS REGIONS</th>
            <th>ARCHITECTURE</th>
            <th>LAYERS</th>
        </tr>
        <tr>
            <td rowspan=2>Commercial</td>
            <td>x86_64</td>
            <td>
                <code>
                arn:aws:lambda:&lt;AWS_REGION&gt;:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}
                </code>
            </td>
        <tr>
            <td>arm64</td>
            <td>
                <code>
                arn:aws:lambda:&lt;AWS_REGION&gt;:464622532012:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
                </code>
                </td>
        </tr>
        <tr>
            <td rowspan=2>GovCloud</td>
            <td>x86_64</td>
            <td>
                <code>
                arn:aws-us-gov:lambda:&lt;AWS_REGION&gt;:002406178527:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}
                </code>
                </td>
        <tr>
            <td>arm64</td>
            <td>
                <code>
                arn:aws-us-gov:lambda:&lt;AWS_REGION&gt;:002406178527:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
                </code>
            </td>
        </tr>
    </table>

3. Remplacez `<SITE_DATADOG>` par {{< region-param key="dd_site" code="true" >}} (assurez-vous que le SITE sélectionné à droite est correct).

4. Remplacez `CLÉ_API` par l'ARN du secret AWS où votre clé d'API Datadog est stockée de façon sécurisée. La clé doit être stockée sous forme de chaîne de texte brut (et non en tant que blob JSON). L'autorisation `secretsmanager:GetSecretValue` est requise. Pour effectuer un test rapide, vous pouvez également utiliser `DD_API_KEY` au lieu de `DD_API_KEY_SECRET_ARN` et définir la valeur sur votre clé d'API Datadog sous forme de texte brut.

5. Remplacez `GESTIONNAIRE_LAMBDA` par votre gestionnaire d'origine, par exemple `myfunc.handler`.

#### Exemple complet

```sh
resource "aws_lambda_function" "lambda" {
  "function_name" = ...
  ...

  # Veiller à choisir les couches adéquates en fonction de votre architecture Lambda et de vos régions AWS

  layers = [
    "arn:aws:lambda:us-east-1:464622532012:layer:Datadog-{{< latest-lambda-layer-version layer="node-example-version" >}}:{{< latest-lambda-layer-version layer="node" >}}",
    "arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}"
  ]

  handler = "/opt/nodejs/node_modules/datadog-lambda-js/handler.handler"

  environment {
    variables = {
      DD_SITE                     = datadoghq.com
      DD_API_KEY_SECRET_ARN       = "arn:aws..."
      DD_LAMBDA_HANDLER           = "myfunc.handler"
    }
  }
}
```

- Définissez la variable d'environnement DD_LAMBDA_HANDLER sur votre gestionnaire d'origine, comme `myfunc.handler`.

[1]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function.html#lambda-layers
[2]: /fr/serverless/guide/handler_wrapper/
{{% /tab %}}
{{% tab "Configuration personnalisée" %}}

<div class="alert alert-info">Si vous n'utilisez pas l'un des outils de développement sans serveur pris en charge par Datadog, tels que Serverless Framework ou AWS CDK, Datadog vous recommande vivement d'instrumenter vos applications sans serveur avec l'<a href="./?tab=datadogcli">interface de ligne de commande Datadog</a>.</div>

1. Installer la bibliothèque Lambda Datadog

    La bibliothèque Lambda Datadog peut être importée en tant que couche (conseillé) _OU_ en tant que package JavaScript.

    La version mineure du pack`datadog-lambda-js` correspond toujours à la version de la couche. Par exemple, datadog-lambda-js v0.5.0 correspond au contenu de la version 5 de la couche.

    - Option A : [configurez les couches][1] pour votre fonction Lambda à l'aide de l'ARN, en respectant le format ci-dessous :

      ```sh
      # Use this format for AWS commercial regions
      arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}

      # Use this format for AWS GovCloud regions
      arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}
      ```

      Remplacez `<AWS_REGION>` par une région AWS valide, comme `us-east-1`. Voici la liste des options disponibles pour `<RUNTIME>` : {{< latest-lambda-layer-version layer="node-versions" >}}.

    - Option B : si vous ne pouvez pas utiliser la couche Lambda Datadog prédéfinie, vous avez la possibilité d'installer les packages `datadog-lambda-js` via `dd-trace` via le gestionnaire de packages de votre choix.

      ```
      npm install datadog-lambda-js dd-trace
      ```

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

3. Rediriger la fonction du gestionnaire

    - Définissez le gestionnaire de votre fonction sur `/opt/nodejs/node_modules/datadog-lambda-js/handler.handler` si vous utilisez la couche, ou sur `node_modules/datadog-lambda-js/dist/handler.handler` si vous utilisez le package.
    - Définissez la variable d'environnement `DD_LAMBDA_HANDLER` sur votre gestionnaire d'origine, comme `myfunc.handler`.

    **Remarque** : si votre fonction Lambda s'exécute sur `arm64` et si la bibliothèque `datadog-lambda-js` est installée en tant que package NPM (option B de l'étape 1), vous devez [appliquer le wrapper Datadog dans le code de votre fonction][2]. Par ailleurs, vous devrez peut-être procéder de la sorte si vous utilisez un outil de sécurité ou de surveillance tiers qui n'est pas compatible avec la redirection du gestionnaire Datadog.

4. Configurer la clé d'API et le site Datadog

    - Définissez la variable d'environnement `DD_SITE` sur {{< region-param key="dd_site" code="true" >}} (assurez-vous que le SITE sélectionné à droite est correct).
    - Définissez la variable d'environnement `DD_API_KEY_SECRET_ARN` sur l'ARN du secret AWS où votre [clé d'API Datadog][3] est stockée en toute sécurité. La clé doit être stockée sous forme de chaîne de texte brut (et non en tant que blob JSON). L'autorisation `secretsmanager:GetSecretValue` est requise. Pour effectuer un test rapide, vous pouvez également utiliser `DD_API_KEY` et définir la clé d'API Datadog sous forme de texte brut.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://docs.datadoghq.com/fr/serverless/guide/handler_wrapper
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

## Et ensuite ?

- Félicitations, vous pouvez désormais visualiser des métriques, logs et traces sur la [page d'accueil Serverless][1].
- Activez la [surveillance des menaces][6] pour recevoir des alertes en cas d'attaques ciblant votre service.
- Consultez l'exemple de code pour [surveiller une logique opérationnelle personnalisée](#surveiller-une-logique operationnelle-personnalisee).
- Consultez le [guide de dépannage][2] si vous ne parvenez pas à recueillir les données de télémétrie.
- Examinez les [configurations avancées][3] pour :
    - Associer des données de télémétrie à l'aide de tags
    - Recueillir des données de télémétrie pour Amazon API Gateway, SQS, etc.
    - Capturer les charges utiles des requêtes et des réponses Lambda
    - Associer les erreurs de vos fonctions Lambda à votre code source
    - Filtrer ou nettoyer des informations sensibles des logs ou des traces

### Surveiller une logique opérationnelle personnalisée

Pour surveiller votre logique opérationnelle personnalisée, envoyez une métrique custom ou une span via l'exemple de code ci-dessous. Pour découvrir plus d'options, consultez la documentation relative à l'[envoi de métriques custom pour des applications sans serveur][4] ainsi que le [guide APM pour l'instrumentation personnalisée][5].

```javascript
const { sendDistributionMetric, sendDistributionMetricWithDate } = require('datadog-lambda-js');
const tracer = require('dd-trace');

// Envoyer une span personnalisée appelée "sleep"
const sleep = tracer.wrap('sleep', (ms) => {
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
        'coffee_house.order_value', // nom de la métrique
        12.45, // valeur de la métrique
        'product:latte', // tag
        'order:online' // autre tag
    );

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from serverless!')
    };
    return response;
};
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/functions
[2]: /fr/serverless/guide/troubleshoot_serverless_monitoring/
[3]: /fr/serverless/configuration/
[4]: /fr/serverless/custom_metrics?tab=nodejs
[5]: /fr/tracing/custom_instrumentation/nodejs/
[6]: /fr/security/application_security/enabling/serverless/?tab=serverlessframework