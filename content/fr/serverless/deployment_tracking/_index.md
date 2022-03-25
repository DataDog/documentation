---
title: Suivi des déploiements pour les applications sans serveur
kind: documentation
further_reading:
  - link: /serverless/distributed_tracing
    tag: Documentation
    text: Tracing distribué pour les applications sans serveur
  - link: /serverless/serverless_tagging
    tag: Documentation
    text: Tagging de fonctions sans serveur
---
{{< img src="serverless/deployment_tracking.jpeg" alt="Suivi des déploiements sans serveur"  style="width:100%;">}}

Le suivi des déploiements vous aide à identifier lorsqu'une nouvelle version de code ou un changement de configuration entraîne une hausse soudaine d'erreurs, une dégradation des performances ou un changement d'état de votre environnement cloud.

Pour accéder au suivi des déploiements pour vos applications sans serveur, sélectionnez une fonction dans la [vue Serverless][1] et cliquez sur l'onglet **Deployments**. Cette page présente des métriques sans serveur clés, telles que les appels, la durée d'exécution et le nombre d'erreurs. Des événements sont automatiquement superposés à ces données afin de repérer les déploiements de code et les changements de configuration associés à la fonction.

Pour consulter plus facilement l'ancien code et les changements de configuration, ajustez l'intervalle global en haut à droite de la vue. 

## Configuration

Datadog recueille des événements de changement de code et de configuration pour vos fonctions Lambda AWS à partir d'AWS CloudTrail.

Si vous ne l'avez pas déjà fait, configurez d'abord l'intégration [Amazon Web Services][2]. Ajoutez ensuite les autorisations suivantes au document de stratégie pour votre rôle AWS/Datadog :

```text
cloudtrail:LookupEvents
```

Si vous avez ajouté l'autorisation, mais que les événements de vos fonctions AWS Lambda ne s'affichent pas, activez le suivi des déploiements depuis le carré de l'intégration AWS Lambda.

{{< img src="serverless/lambda_integration_settings.png" alt="Paramètres de l'intégration Lambda"  style="width:100%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/functions
[2]: /fr/integrations/amazon_web_services/#setup