---
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
kind: documentation
title: Instrumenter des applications .NET sans serveur
---

<div class="alert alert-warning">Si vos fonctions Lambda sont déployées dans un VPC sans accès à Internet, vous pouvez transmettre des données <a href="/agent/guide/private-link/">en utilisant soit AWS PrivateLink</a> pour le site <code>datadoghq.com</code> de <a href="/getting_started/site/">Datadog</a>, soit <a href="/agent/proxy/">un proxy</a> pour tous les autres sites.</div>

## Installation

Datadog propose de nombreuses méthodes différentes pour instrumenter vos applications sans serveur. Choisissez celle qui répond le mieux à vos besoins ci-dessous. Nous vous conseillons d'utiliser l'interface de ligne de commande Datadog.

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

   L'interface de ligne de commande Datadog nécessite un accès au service AWS Lambda et dépend du SDK AWS pour JavaScript pour [résoudre les identifiants][1]. Assurez-vous de configurer vos identifiants AWS en utilisant la même méthode que celle utilisée lors de l'appel de l'interface de ligne de commande AWS.

4. Configurer le site Datadog

    ```sh
    export DATADOG_SITE="<DATADOG_SITE>"
    ```

   Remplacez `<DATADOG_SITE>` par {{< region-param key="dd_site" code="true" >}} (assurez-vous que le SITE sélectionné à droite est correct).

5. Configurer la clé d'API Datadog

   Datadog vous recommande d'enregistrer la clé d'API Datadog dans AWS Secrets Manager pour plus de sécurité et pour faciliter la rotation. La clé doit être stockée sous forme de chaîne de texte brut (et non un blob JSON). Assurez-vous que vos fonctions Lambda disposent de l'autorisation IAM `secretsmanager:GetSecretValue` requise.

    ```sh
    export DATADOG_API_KEY_SECRET_ARN="<DATADOG_API_KEY_SECRET_ARN>"
    ```

   À des fins de test rapide, vous pouvez également définir la clé d'API Datadog en texte brut :

    ```sh
    export DATADOG_API_KEY="<DATADOG_API_KEY>"
    ```

6. Instrumenter vos fonctions Lambda

    **Remarque** : instrumentez d'abord vos fonctions Lambda dans un environnement de type dev ou staging. Si les résultats de l'instrumentation ne vous conviennent pas, exécutez `uninstrument` avec les mêmes arguments pour annuler les modifications.

   Pour instrumenter vos fonctions Lambda, lancez la commande suivante.

    ```sh
    datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v {{< latest-lambda-layer-version layer="dd-trace-dotnet" >}} -e {{< latest-lambda-layer-version layer="extension" >}}
    ```

   Renseignez les paramètres fictifs comme suit :
    - Remplacez `<functionname>` et `<another_functionname>` par les noms de vos fonctions Lambda. Vous pouvez également utiliser `--functions-regex` pour instrumenter automatiquement plusieurs fonctions dont les noms correspondent à l'expression régulière fournie.
    - Remplacez `<région_aws>` par le nom de la région AWS.

    Pour obtenir des paramètres supplémentaires, consultez la [documentation relative à l'interface de ligne de commande][2].

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

Le [plug-in Serverless Datadog][1] configure vos fonctions de sorte à ce qu'elles envoient les métriques, les traces et les logs à Datadog via l'[extension Lambda Datadog][2].

Pour installer et configurer le plug-in Serverless Datadog, suivez les étapes suivantes :

1. Pour installer le plug-in Serverless Datadog :

    ```sh
    serverless plugin install --name serverless-plugin-datadog
    ```

2. Mettez à jour votre fichier`serverless.yml` :

    ```yaml
    custom:
      datadog:
        site: <DATADOG_SITE>
        apiKeySecretArn: <DATADOG_API_KEY_SECRET_ARN>
    ```

   Renseignez les paramètres fictifs comme suit :
    - Remplacez `<DATADOG_SITE>` par {{< region-param key="dd_site" code="true" >}} (assurez-vous que le SITE sélectionné à droite est correct).
    - Remplacez `<DATADOG_API_KEY_SECRET_ARN>` par l'ARN du secret AWS où votre [clé d'API Datadog][3] est stockée en toute sécurité. La clé doit être stockée sous forme de chaîne de texte brut (et non un blob JSON). L'autorisation `secretsmanager:GetSecretValue` est requise. Pour un test rapide, vous pouvez également utiliser `apiKey` et définir la clé d'API Datadog sous forme de texte brut.

    Pour obtenir plus de détails ainsi que des paramètres supplémentaires, consultez la [documentation du plug-in][4].

[1]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/fr/serverless/libraries_integrations/extension
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Image de conteneur" %}}

1. Installer l'extension Lambda Datadog

    ```dockerfile
    COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/. /opt/
    ```

    Remplacez `<TAG>` par un numéro de version spécifique (par exemple, `{{< latest-lambda-layer-version layer="extension" >}}`) ou par `latest`. Accédez au [référentiel Amazon ECR][1] pour consulter la liste complète des tags disponibles.

2. Installer le client APM .NET Datadog

    ```dockerfile
    RUN yum -y install tar wget gzip
    RUN wget https://github.com/DataDog/dd-trace-dotnet/releases/download/v<TRACER_VERSION>/datadog-dotnet-apm-<TRACER_VERSION>.tar.gz
    RUN mkdir /opt/datadog
    RUN tar -C /opt/datadog -xzf datadog-dotnet-apm-<TRACER_VERSION>.tar.gz
    ENV AWS_LAMBDA_EXEC_WRAPPER /opt/datadog_wrapper
    ```

    Remplacez `<TRACER_VERSION>` par le numéro de version de `dd-trace-dotnet` à utiliser (par exemple, `2.3.0`, à savoir la version minimale prise en charge). Les dernières versions de `dd-trace-dotnet` sont fournies sur [GitHub][2].

3. Définir les variables d'environnement requises

    - Définissez la variable d'environnement `DD_SITE` sur {{< region-param key="dd_site" code="true" >}} (assurez-vous que le SITE sélectionné à droite est correct).
    - Définissez la variable d'environnement `DD_API_KEY_SECRET_ARN` avec l'ARN du secret AWS où votre [clé d'API Datadog][3] est stockée en toute sécurité. La clé doit être stockée sous forme de chaîne de texte brut (et non un blob JSON). L'autorisation `secretsmanager:GetSecretValue` est requise. Pour un test rapide, vous pouvez également utiliser `DD_API_KEY` et définir la clé d'API Datadog sous forme de texte brut.

[1]: https://gallery.ecr.aws/datadog/lambda-extension
[2]: https://github.com/DataDog/dd-trace-dotnet/releases
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Configuration personnalisée" %}}

1. Installer le Tracer Datadog

   [Configurez les couches][1] pour votre fonction Lambda à l'aide de l'ARN, en respectant le format suivant :

    ```sh
    # Use this format for x86-based Lambda deployed in AWS commercial regions
    arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-dotnet:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}

    # Use this format for arm64-based Lambda deployed in AWS commercial regions
    arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-dotnet-ARM:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}

    # Use this format for x86-based Lambda deployed in AWS GovCloud regions
    arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-dotnet:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}

    # Use this format for arm64-based Lambda deployed in AWS GovCloud regions
    arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-dotnet-ARM:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
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

    - Définir `AWS_LAMBDA_EXEC_WRAPPER` sur`/opt/datadog_wrapper`.
    - Définissez `DD_SITE` sur {{< region-param key="dd_site" code="true" >}} (assurez-vous que le SITE sélectionné à droite est correct).
    - Définissez `DD_API_KEY_SECRET_ARN` sur l'ARN du secret AWS où votre [clé d'API Datadog][2] est stockée en toute sécurité. La clé doit être stockée sous forme de chaîne de texte brut (et non un blob JSON). L'autorisation `secretsmanager:GetSecretValue` est requise. Pour un test rapide, vous pouvez également utiliser `DD_API_KEY` et définir la clé d'API Datadog sous forme de texte brut.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

## Et ensuite ?

- Vous pouvez désormais afficher les métriques, les logs et les traces sur la [Page d'accueil sans serveur][1].
- Envoyez une [métrique custom][2] ou un [span APM][3] pour surveiller votre logique opérationnelle.
- Consultez le [guide de dépannage][4] si vous ne parvenez pas à recueillir les données de télémétrie
- Vérifiez les [configurations avancées][5] pour
    - associer des données de télémétrie à l'aide de tags
    - recueillir les données de télémétrie pour AWS API Gateway, SQS, etc.
    - capturer les charges utiles des requêtes et des réponses de Lambda
    - associer les erreurs de vos fonctions Lambda à votre code source
    - filtrer ou nettoyer des informations sensibles des logs ou des traces

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/functions
[2]: https://docs.datadoghq.com/fr/metrics/dogstatsd_metrics_submission/
[3]: /fr/tracing/custom_instrumentation/dotnet/
[4]: /fr/serverless/guide/troubleshoot_serverless_monitoring/
[5]: /fr/serverless/configuration/