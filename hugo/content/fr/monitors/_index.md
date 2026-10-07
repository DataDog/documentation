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
description: Créez des monitors, configurez des notifications et des automatisations,
  et gérez vos monitors à l'aide de la plateforme d'alerte
further_reading:
- link: /api/v1/monitors/
  tag: Documentation
  text: API Monitors Datadog
- link: https://learn.datadoghq.com/courses/apm-monitors-and-alerting
  tag: Centre d'apprentissage
  text: Monitors et alertes APM
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Rejoignez une session interactive sur la création de monitors efficaces
- link: https://www.datadoghq.com/blog/monitoring-101-alerting/
  tag: Blog
  text: 'Monitoring 101 : déclencher des alertes sur les éléments importants'
- link: https://www.datadoghq.com/blog/monitor-notification-rules/
  tag: Blog
  text: Dirigez vos alertes de monitor avec les règles de notification des monitors
    Datadog
- link: https://www.datadoghq.com/blog/ecs-default-monitors/
  tag: Blog
  text: Détectez et corrigez les problèmes ECS plus rapidement avec les monitors par
    défaut et ECS Explorer.
- link: https://www.datadoghq.com/blog/zendesk-cost-optimization
  tag: Blog
  text: 'Optimisation de Datadog à grande échelle : une observabilité économique chez
    Zendesk'
- link: https://www.datadoghq.com/blog/human-name-detection
  tag: Blog
  text: Détectez les noms de personnes dans les logs grâce au ML dans Sensitive Data
    Scanner.
- link: https://www.datadoghq.com/blog/how-to-audit-and-clean-up-monitors/
  tag: Blog
  text: Comment auditer et nettoyer efficacement les monitors
- link: https://app.datadoghq.com/release-notes?category=Alerting
  tag: Notes de version
  text: Découvrez les dernières versions de Datadog Alerting ! (Connexion à l'application
    requise).
title: Les monitors
---
## Présentation {#overview}

Les monitors Datadog offrent une visibilité essentielle sur votre infrastructure, permettant une détection proactive et une réponse en temps réel aux problèmes de performance et aux pannes. En configurant des monitors pour suivre les métriques et seuils clés, les organisations peuvent recevoir des alertes immédiates et résoudre les problèmes avant qu'ils n'affectent les clients ou ne provoquent un downtime système.

Surveillez les changements critiques en vérifiant les métriques, la disponibilité des intégrations et les endpoints réseau via la plateforme Alerting. Avec les monitors Datadog, vous pouvez :
- Simplifier les processus de surveillance et de réponse
- Améliorer l'efficacité opérationnelle
- Optimiser les performances

## Démarrez {#get-started}

Le moyen le plus rapide de commencer avec Datadog Monitors est d'utiliser les [Monitor templates][1]. Il s'agit d'une collection de monitors au sein de Datadog qui sont préconfigurés par Datadog et ses partenaires d'intégration.

Vous pouvez aussi créer vos propres monitors à partir de zéro dans des environnements de test dans le Learning Center, ou directement dans votre application en suivant le guide « Débuter avec les monitors ».

{{< whatsnext desc="Utilisez les ressources suivantes pour créer un monitor :" >}}
    {{< nextlink href="/getting_started/monitors/" >}}Prise en main des monitors : guide sur la création d'un monitor basé sur des métriques{{< /nextlink >}}
    {{< nextlink href="/monitors/types/" >}}Créez un Monitor à partir des Monitor Types.{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/getting-started-monitors" >}}Centre d'apprentissage : créer un monitor dans un environnement de laboratoire sandbox{{< /nextlink >}}
{{< /whatsnext >}}

## Analyser les données agrégées {#analyze-aggregate-data}

Les données doivent être bien comprises, granulaires, étiquetées par périmètre et pérennes. Utilisez différents types de données pour les alertes et les diagnostics, en fonction du niveau d'urgence. Instrumentez toutes les applications et collectez autant de données pertinentes que possible pour des mesures complètes et une observabilité des systèmes complexes.

Mesurez la santé de vos applications et l'état de votre infrastructure avec Datadog. Utilisez les données de toute la plateforme Datadog pour créer des alertes sur les problèmes potentiels.

## Alertez sur ce qui compte {#alert-on-what-matters}

Configurez des [Monitor Notifications][2] pour tenir votre équipe informée des problèmes et fournir des conseils de dépannage. Acheminez les notifications aux bonnes personnes, exploitez les variables de modèle pour inclure des détails et joignez des instantanés lors de l'envoi des alertes par e-mail ou Slack.

Réduisez la fatigue liée aux alertes afin que les équipes puissent se concentrer sur la résolution des alertes lorsque cela est important. Créez des [downtimes][3] pour désactiver les alertes pendant la maintenance des applications.

## Prochaines étapes {#whats-next}

Les monitors et les alertes sont des outils essentiels pour garantir la fiabilité, les performances et la disponibilité des systèmes informatiques et des applications. Ils aident à maintenir l'efficacité opérationnelle, à améliorer l'expérience utilisateur et à atténuer les risques potentiels en permettant une détection et une réponse rapides aux problèmes avant qu'ils ne s'aggravent. En savoir plus sur les fonctionnalités de Monitor : 
1. [Planifiez des downtimes pour désactiver vos monitors.][4]
1. [Organisez et gérez vos monitors.][5]
1. [Analysez les alertes via la page de statut.][6]
1. [Résolvez les monitors mal configurés sur la page Monitor Quality.][7]

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/templates
[2]: /fr/monitors/notify
[3]: /fr/monitors/downtimes
[4]: /fr/monitors/downtimes/?tab=bymonitorname
[5]: /fr/monitors/manage
[6]: /fr/monitors/status/status_page
[7]: /fr/monitors/quality/