---
aliases:
- /fr/serverless/datadog_lambda_library/java/
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
title: Instrumenter des applications Java sans serveur
---

<div class="alert alert-warning">Pour instrumenter entièrement votre application sans serveur grâce au tracing distribué, vos fonctions Lambda Java doivent utiliser le runtime Java 8 Corretto (<code>java8.al2</code>) ou Java 11 (<code>java11</code>) avec au moins 1 024 Mo de mémoire.</div>

<div class="alert alert-warning">Si vos fonctions Lambda sont déployées dans un VPC sans accès à Internet, vous pouvez transmettre des données avec <a href="/agent/guide/private-link/">AWS PrivateLink</a> pour le site <code>datadoghq.com</code> <a href="/getting_started/site/">Datadog</a> ou avec <a href="/agent/proxy/">un proxy</a> pour tous les autres sites.</div>

<div class="alert alert-warning">Si vous avez déjà configuré vos fonctions Lambda à l'aide du Datadog Forwarder, consultez la documentation relative à l'<a href="https://docs.datadoghq.com/serverless/guide/datadog_forwarder_java">Instrumentation avec le Forwarder Datadog</a>.</div>

<div class="alert alert-warning">Si vous utilisez les couches Lambda Datadog `dd-trace-java:4` et `Datadog-Extension:24` (ou des versions antérieures), suivez les <a href="https://docs.datadoghq.com/serverless/guide/upgrade_java_instrumentation">instructions de mise à niveau spéciales</a>.</div>

## Installation

Datadog propose de nombreuses méthodes différentes pour instrumenter vos applications sans serveur. Choisissez ci-dessous l'approche qui répond le mieux à vos besoins. Datadog recommande généralement d'utiliser l'interface de ligne de commande Datadog.

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

Le [plug-in Serverless Datadog][1] configure automatiquement vos fonctions afin qu'elles envoient les métriques, traces et logs à Datadog via l'[extension Lambda Datadog][2].

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
    - Remplacez `<DATADOG_SITE>` par {{< region-param key="dd_site" code="true" >}} (assurez-vous que le SITE sélectionné à droite est correct).
    - Remplacez `<DATADOG_API_KEY_SECRET_ARN>` par l'ARN du secret AWS où votre [clé d'API Datadog][3] est stockée en toute sécurité. La clé doit être stockée sous forme de chaîne de texte brut (et non en tant que blob JSON). L'autorisation `secretsmanager:GetSecretValue` est requise. Pour effectuer un test rapide, vous pouvez également utiliser `apiKey` et définir la clé d'API Datadog sous forme de texte brut.

    Pour obtenir plus de détails ainsi que des paramètres supplémentaires, consultez la [documentation relative au plug-in][1].

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

2. Installer le client APM Java Datadog

    ```dockerfile
    RUN yum -y install tar wget gzip
    RUN wget -O /opt/java/lib/dd-java-agent.jar https://dtdg.co/latest-java-tracer
    ```

3. Définir les variables d'environnement requises

    - Définissez `AWS_LAMBDA_EXEC_WRAPPER` sur `/opt/datadog_wrapper`.
    - Définissez `DD_SITE` sur {{< region-param key="dd_site" code="true" >}} (assurez-vous que le SITE sélectionné à droite est correct).
    - Définissez `DD_API_KEY_SECRET_ARN` sur l'ARN du secret AWS où votre [clé d'API Datadog][2] est stockée en toute sécurité. La clé doit être stockée sous forme de chaîne de texte brut (et non en tant que blob JSON). L'autorisation `secretsmanager:GetSecretValue` est requise. Pour effectuer un test rapide, vous pouvez également utiliser `DD_API_KEY` et définir la clé d'API Datadog sous forme de texte brut.

[1]: https://gallery.ecr.aws/datadog/lambda-extension
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Configuration personnalisée" %}}

1. Installer le Tracer Datadog

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

    - Définir `AWS_LAMBDA_EXEC_WRAPPER` sur`/opt/datadog_wrapper`.
    - Définissez `DD_SITE` sur {{< region-param key="dd_site" code="true" >}} (assurez-vous que le SITE sélectionné à droite est correct).
    - Définissez `DD_API_KEY_SECRET_ARN` sur l'ARN du secret AWS où votre [clé d'API Datadog][2] est stockée en toute sécurité. La clé doit être stockée sous forme de chaîne de texte brut (et non un blob JSON). L'autorisation `secretsmanager:GetSecretValue` est requise. Pour un test rapide, vous pouvez également utiliser `DD_API_KEY` et définir la clé d'API Datadog sous forme de texte brut.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

## Et ensuite ?

- Vous pouvez désormais visualiser des métriques, logs et traces sur la [page d'accueil Serverless][1].
- Envoyez une [métrique custom][2] ou une [span APM][3] pour surveiller votre logique opérationnelle.
- Consultez le [guide de dépannage][4] si vous ne parvenez pas à recueillir les données de télémétrie.
- Examinez les [configurations avancées][5] pour :
    - Associer des données de télémétrie à l'aide de tags
    - Recueillir des données de télémétrie pour AWS API Gateway, SQS, etc.
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