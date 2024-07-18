---
aliases:
- /fr/serverless/installation/installing_the_library/
- /fr/serverless/installation
further_reading:
- link: /serverless/configuration/
  tag: Documentation
  text: Configurer la surveillance sans serveur
- link: /integrations/amazon_lambda/
  tag: Documentation
  text: Intégration AWS Lambda
title: Installer la surveillance sans serveur pour AWS Lambda
---

## Prise en main rapide

Si vous débutez sur la plateforme Datadog, [créez un compte Datadog][1], puis suivez les instructions d'installation de l'Agent Datadog pour [AWS Lambda][2]. Vous pourrez ainsi instrumenter votre fonction Lambda et l'utiliser avec Datadog sans plus tarder. Suivez les étapes pour configurer vos fonctions Lambda afin d'envoyer en temps réel des métriques, logs et traces à Datadog.

{{< beta-callout-private url="https://docs.google.com/forms/d/e/1FAIpQLScw8XBxCyN_wjBVU2tWm-zX5oPIGF7BwUKcLSHY6MJsem259g/viewform?usp=sf_link" >}}
Vous souhaitez instrumenter plusieurs fonctions Lambda AWS directement depuis l'interface Datadog ? Faites-le-nous savoir : vous pourrez participer à la future bêta privée de l'instrumentation Lambda à distance.
{{< /beta-callout-private >}}

Le processus de prise en main rapide configure vos fonctions Lambda de façon temporaire. Pour instrumenter de façon permanente vos fonctions Lambda, consultez les instructions d'installation détaillées de la prochaine section.

## Instructions d'installation

Pour obtenir des instructions d'installation détaillées, sélectionnez votre runtime Lambda ci-dessous :

{{< partial name="serverless/getting-started-languages.html" >}}

## Configurations avancées

Une fois l'installation terminée et la collecte des données de télémétrie configurée, vous pouvez utiliser des [configurations avancées][3] pour :

- Associer vos métriques, traces et logs à l'aide de tags
- Recueillir des données de télémétrie à partir de ressource AWS, comme API Gateway, AppSync et Step Functions
- Capturer les charges utiles des requêtes et des réponses d'invocations Lambda individuelles
- Associer les erreurs de vos fonctions Lambda à votre code source
- Filtrer ou nettoyer des informations sensibles des logs ou des traces

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/signup/
[2]: https://app.datadoghq.com/signup/agent#lambda
[3]: /fr/serverless/configuration/