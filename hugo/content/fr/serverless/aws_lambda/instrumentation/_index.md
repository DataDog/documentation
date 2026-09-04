---
aliases:
- /fr/serverless/installation/installing_the_library/
- /fr/serverless/installation
- /fr/serverless/aws_lambda/installation
further_reading:
- link: /serverless/configuration/
  tag: Documentation
  text: Configurer Serverless Monitoring
- link: /integrations/amazon_lambda/
  tag: Documentation
  text: Intégration AWS Lambda
- link: https://learn.datadoghq.com/courses/visibility-aws-lambda
  tag: Centre d'apprentissage
  text: Configurer AWS Lambda pour Serverless Monitoring avec Datadog
- link: /mcp_server/tools/#serverless_onboarding
  tag: Documentation
  text: 'Datadog MCP Server : serverless_onboarding tool'
title: Instrumentez les applications AWS Lambda
---
## Présentation {#overview}

Instrumentez vos applications AWS Lambda avec la Datadog Lambda Extension pour collecter des traces, des métriques améliorées et des métriques personnalisées. La Datadog Lambda Extension est analogue à l'utilisation du Datadog Agent et des Datadog SDKs pour l'infrastructure et les applications basées sur des hosts.

{{< img src="serverless/serverless_tracing_installation_instructions.png" alt="Un diagramme qui montre comment Datadog reçoit la télémétrie de votre application AWS Lambda instrumentée. Votre application Lambda, instrumentée avec la Datadog Lambda Library, envoie des logs, des traces, des métriques améliorées et des métriques personnalisées à la Datadog Lambda Extension, qui transmet ensuite ces données à Datadog." style="width:100%;" >}}

## Démarrage rapide {#quick-start}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Cette fonctionnalité n'est pas prise en charge pour votre <a href="/getting_started/site">site Datadog sélectionné</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Pour commencer, [créez un compte Datadog][1] si vous n'en avez pas déjà un. Ensuite, suivez le [flux d'installation dans l'application via Fleet Automation][8] pour AWS Lambda afin d'instrumenter vos fonctions Lambda. Cette configuration de démarrage rapide permet à vos fonctions d'envoyer des métriques, des logs et des traces en temps réel à Datadog.

Un exemple d'application est [disponible sur GitHub][6] avec des instructions sur la façon de déployer avec plusieurs runtimes et outils d'infrastructure-as-code.

Le processus de démarrage rapide configure vos fonctions Lambda à la volée. Pour instrumenter les fonctions Lambda de manière permanente, consultez les sections ci-dessous pour l'onboarding assisté par agent ou l'instrumentation manuelle.

## Configuration avec l'onboarding assisté par agent {#set-up-with-agentic-onboarding}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Cette fonctionnalité n'est pas prise en charge pour votre <a href="/getting_started/site">site Datadog sélectionné</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Utilisez l'onboarding assisté par agent pour configurer la surveillance de vos fonctions Lambda avec l'assistance de l'IA. L'onboarding assisté par agent détecte les frameworks de votre projet, applique la configuration requise sur place et vérifie que les données circulent. Deux chemins complémentaires utilisent le même compte Datadog :

- **AI Setup CLI** : un outil de terminal autonome. Utilisez-le lorsque vous ne souhaitez pas installer de serveur MCP.
- **MCP Server** : Configurez-le depuis votre IDE via un assistant de codage tel que Claude Code ou Cursor.

{{< tabs >}}
{{% tab "AI Setup CLI" %}}

Exécutez la CLI dans le répertoire de votre projet (nécessite Node.js 22+). Il lie votre compte Datadog, puis instrumente votre fonction Lambda :

```shell
npx @datadog/ai-setup-cli --product serverless --serverless-compute-type=aws-lambda
```

Omettez `--product` pour exécuter de manière interactive, ou ajoutez `--site` pour cibler votre site Datadog.

{{% /tab %}}
{{% tab "MCP Server" %}}

Utilisez l'outil [`serverless_onboarding`](https://docs.datadoghq.com/fr/agentic_onboarding/setup/?tab=serverlessmonitoring#mcp-server) du Datadog MCP Server pour configurer la surveillance de vos fonctions Lambda avec l'assistance de l'IA. Une fois connecté, essayez une invite telle que :

```
Help me monitor my AWS Lambda functions with Datadog.
```

{{% /tab %}}
{{< /tabs >}}

## Instrumentation manuelle {#manual-instrumentation}

{{< card-grid card_width="30%" image_width="200" >}}
  {{< image-card href="/serverless/installation/python/" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/serverless/installation/nodejs/" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="/serverless/installation/ruby/" src="integrations_logos/ruby.png" alt="Ruby" >}}
  {{< image-card href="/serverless/installation/java/" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/serverless/installation/go/" src="integrations_logos/go-metro.png" alt="go" >}}
  {{< image-card href="/serverless/installation/dotnet/" src="integrations_logos/dotnet_text.png" alt=".NET" >}}
{{< /card-grid >}}

## Configurations avancées {#advanced-configurations}

Une fois l'instrumentation terminée et la collecte de télémétrie configurée, vous pouvez utiliser [Configure Serverless Monitoring for AWS Lambda][3] pour :

- Connectez vos métriques, traces et logs à l'aide d'étiquettes
- collecter la télémétrie à partir de ressources AWS telles qu'API Gateway, AppSync et Step Functions
- capturer les charges utiles de requête et de réponse pour des invocations Lambda individuelles
- lier les erreurs de vos fonctions Lambda à votre code source
- filtrer ou nettoyer les informations sensibles des logs ou des traces

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/signup/
[3]: /fr/serverless/aws_lambda/configuration/
[4]: /fr/serverless/aws_lambda/fips-compliance/
[5]: /fr/serverless/aws_lambda/remote_instrumentation
[6]: https://github.com/DataDog/serverless-sample-app
[8]: https://app.datadoghq.com/fleet/install-agent/latest?platform=lambda
[9]: /fr/mcp_server/tools/#serverless_onboarding