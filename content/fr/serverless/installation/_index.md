---
aliases:
- /fr/serverless/installation/installing_the_library/
further_reading:
- link: /serverless/configuration/
  tag: Documentation
  text: Configurer la surveillance sans serveur
- link: /integrations/amazon_lambda/
  tag: Documentation
  text: Intégration AWS Lambda
kind: documentation
title: Installation de la surveillance sans serveur
---

## Prise en main rapide

Si vous débutez sur la plateforme Datadog, [créez un compte Datadog][1], puis suivez les instructions d'installation de l'Agent Datadog pour [AWS Lambda][2]. Vous pourrez ainsi instrumenter votre fonction Lambda et l'utiliser avec Datadog sans plus tarder. Suivez les étapes pour configurer vos fonctions Lambda afin d'envoyer en temps réel des métriques, logs et traces à Datadog.

Le processus de prise en main rapide configure vos fonctions Lambda de façon temporaire. Pour instrumenter de façon permanente vos fonctions Lambda, consultez les instructions d'installation détaillées de la prochaine section.

## Instructions d'installation

Pour obtenir des instructions d'installation détaillées, sélectionnez votre runtime Lambda ci-dessous :

{{< partial name="serverless/getting-started-languages.html" >}}

## Configurations avancées

Une fois l'installation terminée et la collecte des données de télémétrie configurée, vous pouvez utiliser des [configurations avancées][3] pour :

- Associer vos métriques, traces et logs à l'aide de tags
- Recueillir des données de télémétrie à partir de ressource AWS, comme API Gateway, AppSync et Step Functions
- Capturer les charges utiles des requêtes et des réponses d'invocations Lambda individuelles
- associer les erreurs de vos fonctions Lambda à votre code source
- filtrer ou nettoyer des informations sensibles des logs ou des traces

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/signup/
[2]: https://app.datadoghq.com/signup/agent#lambda
[3]: /fr/serverless/configuration/