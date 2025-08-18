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
    - alertes
    - alerter
    - surveillance
description: Créez des monitors, configurez des notifications et des automations,
  et gérez vos monitors à l'aide de la plateforme d'alertes
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Alerting
  tag: Notes de version
  text: Découvrez les dernières versions des alertes Datadog (connexion à l'application
    requise).
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Participer à une session interactive sur la création de monitors efficaces
- link: https://www.datadoghq.com/blog/monitoring-101-alerting/
  tag: Blog
  text: 'Monitoring 101 : définir des alertes pertinentes'
- link: /api/v1/monitors/
  tag: Documentation
  text: API Monitors Datadog
- link: https://www.datadoghq.com/blog/monitor-notification-rules/
  tag: Blog
  text: Acheminer vos alertes de monitor grâce aux règles de notification des monitors
    Datadog
title: Monitors
---

## Section Overview

Les Monitors Datadog offrent une visibilité essentielle sur votre infrastructure, permettant une détection proactive et une réponse en temps réel aux problèmes de performance et aux interruptions de service. En configurant des monitors pour suivre des métriques et seuils clés, les organisations reçoivent des alertes immédiates et peuvent résoudre les problèmes avant qu'ils n'affectent les utilisateurs ou ne provoquent des pannes.

Surveillez les changements critiques en vérifiant les métriques, la disponibilité des intégrations et les points de terminaison réseau grâce à la plateforme d'alertes. Avec les monitors de Datadog, vous pouvez :
- Simplifier les processus de surveillance et de réponse
- Améliorer l'efficacité opérationnelle
- Optimiser les performances

## Prise en main

La façon la plus rapide de commencer avec les monitors de Datadog est d'utiliser les [monitors recommandés][1], une collection de monitors préconfigurés par Datadog et ses partenaires d'intégration.

Vous pouvez aussi créer vos propres monitors à partir de zéro dans des environnements de test dans le Learning Center, ou directement dans votre application en suivant le guide « Débuter avec les monitors ».

{{< whatsnext desc="Utilisez les ressources suivantes pour créer un monitor :" >}}
    {{< nextlink href="/getting_started/monitors/" >}}Débuter avec les monitors : guide de création d'un monitor basé sur une métrique{{< /nextlink >}}
    {{< nextlink href="/monitors/types/" >}}Créer un monitor à partir des types de monitors{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/getting-started-monitors" >}}Learning Center : créer un monitor dans un environnement de test{{< /nextlink >}}
{{< /whatsnext >}}

## Analyser les données agrégées

Les données doivent être bien comprises, granulaires, étiquetées par périmètre et durables. Utilisez différents types de données pour les alertes et le diagnostic, en fonction du niveau d'urgence. Instrumentez toutes vos applications et collectez un maximum de données pertinentes pour une observabilité complète des systèmes complexes.

Mesurez la santé de vos applications et l'état de votre infrastructure avec Datadog. Utilisez les données de l'ensemble de la plateforme Datadog pour créer des alertes sur les problèmes potentiels.

## Déclencher des alertes pertinentes

Configurez les [notifications de monitor][2] pour tenir votre équipe informée des problèmes et fournir des indications de dépannage. Dirigez les notifications vers les bonnes personnes, utilisez des variables de modèle pour inclure des détails, et joignez des captures d'écran lors de l'envoi des alertes par email ou Slack.

Réduisez la fatigue liée aux alertes afin que les équipes puissent se concentrer sur leur résolution lorsqu'elles comptent vraiment. Créez des [périodes de silence][3] pour désactiver temporairement les alertes pendant les phases de maintenance.

## Et ensuite ?

Les monitors et les alertes sont des outils essentiels pour garantir la fiabilité, les performances et la disponibilité des systèmes informatiques et des applications. Ils permettent de maintenir l'efficacité opérationnelle, d'améliorer l'expérience utilisateur et de limiter les risques en assurant une détection et une réponse rapides aux problèmes avant qu'ils ne s'aggravent.
1. [Programmer des périodes de silence pour désactiver les monitors][4]
1. [Organiser et gérer les monitors][5]
1. [Analyser les alertes via la page de statut][6] 
1. [Corriger les monitors mal configurés via la page Qualité des monitors][7]

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/recommended
[2]: /fr/monitors/notify
[3]: /fr/monitors/downtimes
[4]: /fr/monitors/downtimes/?tab=bymonitorname
[5]: /fr/monitors/manage
[6]: /fr/monitors/status/status_page
[7]: /fr/monitors/quality/