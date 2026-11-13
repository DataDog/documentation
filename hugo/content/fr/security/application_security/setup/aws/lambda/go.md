---
further_reading:
- link: /security/application_security/how-it-works/
  tag: Documentation
  text: Fonctionnement de la protection des applications et des API
- link: /security/default_rules/?category=cat-application-security
  tag: Documentation
  text: Règles de protection des applications et des API prêtes à l'emploi
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Dépannage de la protection des applications et des API
- link: /security/application_security/threats/
  tag: Documentation
  text: Protection des applications et des API
- link: https://www.datadoghq.com/blog/datadog-security-google-cloud/
  tag: Blog
  text: Datadog Security propose davantage de fonctionnalités de conformité et de
    protection contre les menaces pour Google Cloud
title: Activation de la protection App and API pour les fonctions AWS Lambda en Go
---
La configuration de la protection App and API pour AWS Lambda implique :

1. L'identification des fonctions vulnérables ou attaquées, qui bénéficieraient le plus de la protection App and API. Trouvez-les sur [l'onglet Security de votre catalogue][1].
2. La configuration de l'instrumentation de la protection App and API en utilisant soit la [CLI Datadog][8], [AWS CDK][9], le [plugin Datadog Serverless Framework][2], ou manuellement en utilisant les couches de tracing Datadog.
3. Le déclenchement de signaux de sécurité dans votre application et l'observation de la manière dont Datadog affiche les informations résultantes.

## Types de déclencheurs pris en charge {#supported-trigger-types}
La détection des menaces prend en charge les requêtes HTTP en tant qu'entrée de fonction uniquement, car ce canal présente la plus forte probabilité que des attaquants exploitent une application serverless. Les requêtes HTTP proviennent généralement de services AWS tels que :
- Application Load Balancer (ALB)
- API Gateway v1 (API REST)
- API Gateway v2 (API HTTP)
- URL de fonction

<div class="alert alert-info">Si vous souhaitez que la prise en charge soit ajoutée pour l'une des fonctionnalités non prises en charge, remplissez ce <a href="https://forms.gle/gHrxGQMEnAobukfn7">formulaire</a> pour envoyer vos commentaires.</div>


## Démarrez {#get-started}

{{< tabs >}}
{{% tab "Serverless Framework" %}}

Le [plugin Datadog Serverless Framework][1] peut être utilisé pour configurer et déployer automatiquement votre fonction Lambda avec la protection App and API.

Pour installer et configurer le plug-in Serverless Framework Datadog, procédez comme suit :

1. Installez le plugin Datadog Serverless Framework :
   ```sh
   serverless plugin install --name serverless-plugin-datadog
   ```

2. Activez la protection App and API en mettant à jour votre `serverless.yml` avec le paramètre de configuration `enableASM` :
   ```yaml
   custom:
     datadog:
       appSecMode: on
   ```

   Dans l'ensemble, votre nouveau fichier `serverless.yml` devrait contenir au moins :
   ```yaml
   custom:
     datadog:
       apiKeySecretArn: "{Datadog_API_Key_Secret_ARN}" # or apiKey
       appSecMode: on
   ```
   Consultez également la liste complète des [paramètres du plugin][2] pour configurer davantage les paramètres de votre fonction Lambda.

4. Redéployez la fonction et invoquez-la. Après quelques minutes, elle apparaît dans les [vues App and API Protection][3].

[1]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/fr/serverless/libraries_integrations/plugin/#configuration-parameters
[3]: https://app.datadoghq.com/security/appsec?column=time&order=desc
{{% /tab %}}
{{% tab "Datadog CLI" %}}

L'interface de ligne de commande Datadog modifie les configurations des fonctions Lambda existantes pour activer l'instrumentation sans nécessiter de nouveau déploiement. C'est le moyen le plus rapide de commencer avec Datadog Serverless Monitoring.

**Si vous configurez le traçage initial pour vos fonctions**, effectuez les étapes suivantes :

1. Installez le client de l'interface de ligne de commande Datadog :

    ```sh
    npm install -g @datadog/datadog-ci
    ```

2. Si vous débutez avec la surveillance serverless de Datadog, lancez l'interface de ligne de commande Datadog en mode interactif pour vous guider lors de votre première installation pour un démarrage rapide, et vous pouvez ignorer les étapes restantes. Pour installer Datadog de manière permanente pour vos applications de production, ignorez cette étape et suivez les étapes restantes pour exécuter la commande de l'interface de ligne de commande Datadog dans vos pipelines CI/CD après votre déploiement normal.

    ```sh
    datadog-ci lambda instrument -i --appsec
    ```

3. Configurez les identifiants AWS :

    La CLI Datadog nécessite un accès au service AWS Lambda et dépend du SDK JavaScript AWS pour [résoudre les identifiants][1]. Assurez-vous que vos identifiants AWS sont configurés en utilisant la même méthode que celle que vous utiliseriez lors de l'appel de l'interface de ligne de commande AWS.

4. Configurez le site Datadog :

    ```sh
    export DATADOG_SITE="<DATADOG_SITE>"
    ```

    Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (assurez-vous que le **site Datadog** correct est sélectionné sur le côté droit de cette page).

5. Configurez la clé d'API Datadog :

    Datadog recommande d'enregistrer la clé d'API Datadog dans AWS Secrets Manager pour des raisons de sécurité. La clé doit être stockée sous forme de chaîne en texte brut (pas un blob JSON). Assurez-vous que vos fonctions Lambda disposent de l'autorisation `secretsmanager:GetSecretValue` IAM requise.

    ```sh
    export DATADOG_API_KEY_SECRET_ARN="<DATADOG_API_KEY_SECRET_ARN>"
    ```

    For testing purposes, you can also set the Datadog API key in plaintext:

    ```sh
    export DATADOG_API_KEY="<DATADOG_API_KEY>"
    ```

6. Instrumentez vos fonctions Lambda :

    Pour instrumenter vos fonctions Lambda, lancez la commande suivante.

    ```sh
    datadog-ci lambda instrument --appsec -f <functionname> -f <another_functionname> -r <aws_region> -e {{< latest-lambda-layer-version layer="extension" >}}
    

```

    To fill in the placeholders:
    - Replace `<functionname>` and `<another_functionname>` with your Lambda function names.
    - Alternatively, you can use `--functions-regex` to automatically instrument multiple functions whose names match the given regular expression.
    - Replace `<aws_region>` with the AWS region name.

   **Remarque** : instrumentez d'abord vos fonctions Lambda dans un environnement de développement ou de pré-production. Si le résultat de l'instrumentation n'est pas satisfaisant, exécutez `uninstrument` avec les mêmes arguments pour annuler les modifications. Une fois l'exécution de l'interface de ligne de commande terminée, mettez à jour votre code source pour qu'il dépende de la dernière version du module `datadog-lambda-go` afin d'activer App and API Protection.

    Additional parameters can be found in the [CLI documentation][2].

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "AWS CDK" %}}

La [bibliothèque CDK Construct Datadog][1] installe automatiquement Datadog sur vos fonctions à l'aide des couches Lambda, et configure vos fonctions de sorte à ce qu'elles envoient les métriques, les traces et les logs à Datadog via la Datadog Lambda Extension.

1. Installez la bibliothèque CDK Construct Datadog :

    ```sh
    npm install datadog-cdk-constructs-v2 --save-dev
    ```

2. Instrumentez vos fonctions Lambda

    ```typescript
    import { Datadog, DatadogAppSecMode } from "datadog-cdk-constructs-v2";

    const datadog = new Datadog(this, "Datadog", {
        extension_layer_version: {{< latest-lambda-layer-version layer="extension" >}},
        site : \"<DATADOG_SITE>\",
        api_key_secret_arn : \"<DATADOG_API_KEY_SECRET_ARN>\", // ou api_key
        enable_asm : true,
        datadog_app_sec_mode: DatadogAppSecMode.ON,
      });
    datadog.add_lambda_functions([<LAMBDA_FUNCTIONS>]);
    ```

    To fill in the placeholders:
    - Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (assurez-vous que le SITE correct est sélectionné sur la droite).
    - Remplacez `<DATADOG_API_KEY_SECRET_ARN>` par l'ARN du secret AWS où votre [clé d'API Datadog][2] est stockée en toute sécurité. La clé doit être stockée sous forme de chaîne en texte brut (pas un blob JSON). L'autorisation `secretsmanager:GetSecretValue` est requise. Pour des tests rapides, vous pouvez utiliser `apiKey` à la place et définir la clé d'API Datadog en texte brut.

    More information and additional parameters can be found on the [Datadog CDK documentation][1].

[1]: https://github.com/DataDog/datadog-cdk-constructs
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Custom" %}}

1. Mettez à jour le code de votre fonction pour utiliser le dernier traceur Go :
   ```sh
   go get -u github.com/DataDog/datadog-lambda-go
   ```

2. Installez la Datadog Lambda Extension en configurant les couches pour votre fonction Lambda à l'aide de l'ARN dans l'un des formats suivants. Remplacez `<AWS_REGION>` par une région AWS valide telle que `us-east-1` :
   ```sh
   # x86-based Lambda in AWS commercial regions
   arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}
   # Lambda basée sur arm64 dans les régions commerciales AWS
   arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
   # Lambda basée sur x86 dans les régions AWS GovCloud
   arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}
   # Lambda basée sur arm64 dans les régions AWS GovCloud
   arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
   ```

3. Enable App and API Protection by adding the following environment variables on your function deployment:
   ```yaml
   environment:
     AWS_LAMBDA_EXEC_WRAPPER: /opt/datadog_wrapper
     DD_SERVERLESS_APPSEC_ENABLED: true
   ```

4. Redéployez la fonction et invoquez-la. Après quelques minutes, elle apparaît dans les [vues App and API protection][1].
[1]: https://app.datadoghq.com/security/appsec?column=time&order=desc

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services?query=type%3Afunction%20&env=prod&groupBy=&hostGroup=%2A&lens=Security&sort=-attackExposure&view=list
[2]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/plugin
[5]: https://docs.datadoghq.com/fr/serverless/libraries_integrations/plugin/#configuration-parameters
[6]: https://app.datadoghq.com/security/appsec?column=time&order=desc
[7]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[8]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/cli
[9]: https://github.com/DataDog/datadog-cdk-constructs
[10]: https://app.datadoghq.com/organization-settings/api-keys