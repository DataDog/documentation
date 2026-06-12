---
algolia:
  tags:
  - monitors
  - alerts
aliases:
- /fr/guides/monitors/
- /fr/guides/monitoring/
- /fr/guides/alerting/
- /fr/guides/monitors/the-conditions
- /fr/monitoring
cascade:
  algolia:
    rank: 70
    tags:
    - alerts
    - alerting
    - monitoring
description: Créez des moniteurs, configurez des notifications et des automatisations,
  et gérez vos moniteurs à l'aide de la plateforme d'alerte
further_reading:
- link: /api/v1/monitors/
  tag: Documentation
  text: API Monitors Datadog
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Participez à une session interactive sur la création de moniteurs efficaces
- link: https://www.datadoghq.com/blog/monitoring-101-alerting/
  tag: Blog
  text: 'Monitoring 101 : déclencher des alertes sur les éléments importants'
- link: https://www.datadoghq.com/blog/monitor-notification-rules/
  tag: Blog
  text: Dirigez vos alertes de monitor avec les règles de notification des monitors
    Datadog
- link: https://www.datadoghq.com/blog/ecs-default-monitors/
  tag: Blog
  text: Détectez et remédiez aux problèmes ECS plus rapidement avec des moniteurs
    par défaut et l'ECS Explorer
- link: https://www.datadoghq.com/blog/zendesk-cost-optimization
  tag: Blog
  text: 'Optimiser Datadog à grande échelle : observabilité rentable chez Zendesk'
- link: https://www.datadoghq.com/blog/human-name-detection
  tag: Blog
  text: Détectez les noms humains dans les journaux avec ML dans Sensitive Data Scanner
- link: https://app.datadoghq.com/release-notes?category=Alerting
  tag: Notes de version
  text: Découvrez les dernières versions de Datadog Alerting ! (Connexion à l'application
    requise).
- link: https://learn.datadoghq.com/courses/apm-monitors-and-alerting
  tag: Centre d'apprentissage
  text: Moniteurs APM et Alerting
title: Les monitors
---
## Aperçu {#overview}

Les moniteurs Datadog offrent une visibilité essentielle sur votre infrastructure, permettant une détection proactive et une réponse en temps réel aux problèmes de performance et aux pannes. En configurant des moniteurs pour suivre des indicateurs clés et des seuils, les organisations peuvent recevoir des alertes immédiates et résoudre les problèmes avant qu'ils n'impactent les clients ou ne causent des temps d'arrêt du système.

Surveillez les changements critiques en vérifiant les indicateurs, la disponibilité des intégrations et les points de terminaison réseau via la plateforme d'alerte. Avec les moniteurs Datadog, vous pouvez :
- Simplifier les processus de surveillance et de réponse
- Améliorer l'efficacité opérationnelle
- Optimiser la performance

## Commencer {#get-started}

Le moyen le plus rapide de commencer avec les moniteurs Datadog est d'utiliser [les modèles de moniteurs][1]. Ce sont une collection de moniteurs dans Datadog qui sont préconfigurés par Datadog et ses partenaires d'intégration.

Vous pouvez aussi créer vos propres monitors à partir de zéro dans des environnements de test dans le Learning Center, ou directement dans votre application en suivant le guide « Débuter avec les monitors ».

{{< whatsnext desc="Utilisez les ressources suivantes pour créer un moniteur :" >}}
    {{< nextlink href="/getting_started/monitors/" >}}Commencer avec les Moniteurs : Guide sur la façon de créer un moniteur basé sur des métriques{{< /nextlink >}}
    {{< nextlink href="/monitors/types/" >}}Créer un moniteur à partir des Types de Moniteurs{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/getting-started-monitors" >}}Centre d'apprentissage : Construire un moniteur dans un environnement de laboratoire sandbox{{< /nextlink >}}
{{< /whatsnext >}}

## Analyser les données agrégées {#analyze-aggregate-data}

Les données doivent être bien comprises, granulaires, étiquetées par portée et de longue durée. Utiliser différents types de données pour les alertes et les diagnostics, en fonction du niveau d'urgence. Instrumenter toutes les applications et collecter autant de données pertinentes que possible pour des mesures complètes et une observabilité des systèmes complexes.

Mesurer la santé de vos applications et l'état de votre infrastructure avec Datadog. Utiliser les données de l'ensemble de la plateforme Datadog pour créer des alertes sur des problèmes potentiels.

## Alerter sur ce qui compte {#alert-on-what-matters}

Configurer [Monitor Notifications][2] pour tenir votre équipe informée des problèmes et fournir des conseils de dépannage. Acheminer les notifications vers les bonnes personnes, utiliser des variables de modèle pour inclure des détails et joindre des instantanés lors de l'envoi des alertes par e-mail ou Slack.

Réduire la fatigue des alertes afin que les équipes puissent se concentrer sur la résolution des alertes lorsque cela est nécessaire. Créer [downtimes][3] pour couper les alertes pendant la maintenance des applications.

## Quelles sont les prochaines étapes {#whats-next}

Les moniteurs et les alertes sont des outils essentiels pour garantir la fiabilité, la performance et la disponibilité des systèmes et applications informatiques. Ils aident à maintenir l'efficacité opérationnelle, à améliorer l'expérience utilisateur et à atténuer les risques potentiels en permettant une détection et une réponse rapides aux problèmes avant qu'ils ne s'aggravent. En savoir plus sur les fonctionnalités du Moniteur : 
1. [Planifier des downtimes pour couper les moniteurs.][4]
1. [Organiser et gérer les moniteurs.][5]
1. [Enquêter sur les alertes via la page d'état.][6]
1. [Résoudre les moniteurs mal configurés sur la Monitor Quality page.][7]

## Lecture complémentaire {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/templates
[2]: /fr/monitors/notify
[3]: /fr/monitors/downtimes
[4]: /fr/monitors/downtimes/?tab=bymonitorname
[5]: /fr/monitors/manage
[6]: /fr/monitors/status/status_page
[7]: /fr/monitors/quality/