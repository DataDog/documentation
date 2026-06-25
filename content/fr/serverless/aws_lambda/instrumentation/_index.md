---
aliases:
- /fr/serverless/installation/installing_the_library/
- /fr/serverless/installation
- /fr/serverless/aws_lambda/installation
further_reading:
- link: /serverless/configuration/
  tag: Documentation
  text: Configurer la surveillance sans serveur
- link: /integrations/amazon_lambda/
  tag: Documentation
  text: Intégration AWS Lambda
title: Instrumenter les applications AWS Lambda
---
## Aperçu {#overview}

Instrumentez vos applications AWS Lambda avec une extension Datadog Lambda pour collecter des traces, des métriques améliorées et des métriques personnalisées. L'extension Datadog Lambda est analogue à l'utilisation de l'agent Datadog et des SDK Datadog pour les infrastructures et applications basées sur des hôtes.

{{< img src="serverless/serverless_tracing_installation_instructions.png" alt="Un diagramme montrant comment Datadog reçoit la télémétrie de votre application AWS Lambda instrumentée. Votre application Lambda, instrumentée avec une bibliothèque Datadog Lambda, envoie des journaux, des traces, des métriques améliorées et des métriques personnalisées à l'extension Datadog Lambda, qui pousse ensuite ces données vers Datadog." style="width:100%;" >}}

## Démarrage rapide {#quick-start}

Pour commencer, [inscrivez-vous pour un compte Datadog][1] si vous n'en avez pas déjà un. Ensuite, suivez le [flux d'installation in-app dans Fleet Automation][8] pour AWS Lambda afin d'instrumenter vos fonctions Lambda. Cette configuration de démarrage rapide permet à vos fonctions d'envoyer des métriques, des journaux et des traces en temps réel à Datadog.

Une application d'exemple est [disponible sur GitHub][6] avec des instructions sur la façon de déployer avec plusieurs environnements d'exécution et des outils d'infrastructure en tant que code.

Le processus de démarrage rapide configure vos fonctions Lambda à la volée. Pour instrumenter les fonctions Lambda de manière permanente, consultez les instructions détaillées dans la section suivante.

## Utiliser le serveur MCP Datadog {#use-the-datadog-mcp-server}

Utilisez le [serveur MCP Datadog][9] pour configurer la surveillance de vos conteneurs AWS Lambda avec l'assistance de l'IA. Après vous être connecté, essayez une invite comme :

```shell
Help me monitor my AWS Lambda functions with Datadog
```

## Instructions d'instrumentation {#instrumentation-instructions}

{{< card-grid card_width="30%" image_width="200" >}}
  {{< image-card href="/serverless/installation/python/" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/serverless/installation/nodejs/" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="/serverless/installation/ruby/" src="integrations_logos/ruby.png" alt="Ruby" >}}
  {{< image-card href="/serverless/installation/java/" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/serverless/installation/go/" src="integrations_logos/go-metro.png" alt="go" >}}
  {{< image-card href="/serverless/installation/dotnet/" src="integrations_logos/dotnet_text.png" alt=".NET" >}}
{{< /card-grid >}}

## Configurations avancées {#advanced-configurations}

Une fois que vous avez terminé l'instrumentation et que vous avez configuré la collecte de télémétrie, vous pouvez utiliser [Configurer la surveillance sans serveur pour AWS Lambda][3] pour :

- connecter vos métriques, traces et journaux à l'aide de balises
- collecter la télémétrie des ressources AWS telles que API Gateway, AppSync et Step Functions
- capturer les charges utiles de requête et de réponse pour chaque invocation de Lambda
- lier les erreurs de vos fonctions Lambda à votre code source
- filtrer ou nettoyer les informations sensibles des journaux ou des traces

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/signup/
[3]: /fr/serverless/aws_lambda/configuration/
[4]: /fr/serverless/aws_lambda/fips-compliance/
[5]: /fr/serverless/aws_lambda/remote_instrumentation
[6]: https://github.com/DataDog/serverless-sample-app
[8]: https://app.datadoghq.com/fleet/install-agent/latest?platform=lambda
[9]: /fr/agentic_onboarding/setup