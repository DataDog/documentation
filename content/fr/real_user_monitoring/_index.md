---
title: Real User Monitoring
kind: documentation
description: 'Visualisez et analysez les performances de vos applications frontend, telles qu''elles sont perçues par vos utilisateurs.'
disable_sidebar: true
aliases:
  - /fr/real_user_monitoring/installation
further_reading:
  - link: 'https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/'
    tag: Blog
    text: Présentation du service Real User Monitoring (RUM) de Datadog
  - link: 'https://www.datadoghq.com/blog/datadog-mobile-rum/'
    tag: Blog
    text: Améliorer l'expérience utilisateur sur mobile avec le service Mobile Real User Monitoring de Datadog
  - link: 'https://www.datadoghq.com/blog/error-tracking/'
    tag: Blog
    text: Analyser les problèmes affectant vos applications avec le suivi des erreurs Datadog
  - link: 'https://www.datadoghq.com/blog/unify-apm-rum-datadog/'
    tag: Blog
    text: Unifier les données RUM et APM pour optimiser votre visibilité sur l'ensemble de votre stack
  - link: 'https://www.datadoghq.com/blog/datadog-geomaps/'
    tag: Blog
    text: Utiliser les geomaps pour visualiser les données de votre application par région
  - link: /real_user_monitoring/browser/data_collected/
    tag: Documentation
    text: Données de navigateur RUM recueillies
---
{{< img src="real_user_monitoring/rum_full_dashboard.png" alt="Dashboard RUM"  >}}

## Qu'est-ce que le Real User Monitoring ?


Le service Real User Monitoring (RUM) de Datadog vous offre une visibilité de bout en bout sur les activités et l'expérience en temps réel de chaque utilisateur. Conçu pour les applications Web et mobiles, il répond à quatre besoins différents :

* **Mesure des performances** : suivez les performances des pages Web, des écrans d'applications mobiles, des actions utilisateur, des requêtes réseau, ainsi que de votre code frontend.
* **Gestion des erreurs** : surveillez les bugs et problèmes en cours et suivez leur évolution et leurs versions.
* **Analyses/Utilisation** : analysez le profil des utilisateurs de votre application (pays, appareil, système d'exploitation), surveillez les parcours utilisateur individuels et analysez les interactions des utilisateurs avec votre application (page couramment consultée, clics, interactions, utilisation des fonctionnalités).
* **Assistance** : récupérez toutes les informations associées à une session utilisateur afin de dépanner un problème (durée de session, pages consultées, interactions, ressources chargées, erreurs).



## Prise en main

Sélectionnez votre type d'application pour commencer à recueillir des données RUM :

{{< partial name="rum/rum-getting-started.html" >}}
</br>
## Explorer le service RUM de Datadog

### Dashboards prêts à l'emploi

Analysez les informations sur les parcours utilisateur, les performances, les requêtes réseau et les erreurs recueillies automatiquement à l'aide de [dashboards prêts à l'emploi][1].

{{< img src="real_user_monitoring/dashboards/rum_dashboard.png" alt="Dashboard RUM" >}}

### RUM Explorer et analyses

Affichez les sessions utilisateur associées à des segments spécifiques, par exemple pour vérifier les niveaux de latence ayant un impact sur vos clients privilégiés avec des [widgets d'analyse personnalisables][2]. Explorez, enregistrez des vues et créez des monitors sur vos recherches personnalisées.

{{< img src="real_user_monitoring/explorer/analytics/rum_analytics.gif" alt="Analyses RUM"  >}}

### Intégration directe avec les logs, l'APM et le profileur

Affinez vos [métriques d'infrastructure, vos logs et vos traces backend][1] jusqu'à identifier la ligne de code exacte qui a un impact sur les performances de votre application, en tenant compte des expériences des utilisateurs et des problèmes signalés.

{{< img src="real_user_monitoring/connect_rum_and_traces/rum_apm_logs.png" alt="RUM et APM">}}

### Suivi des erreurs et rapports de crash

Recevez des alertes automatisées en cas d'anomalies et de groupes d'erreurs, de timeouts et de crashs pour réduire considérablement votre MTTR avec le [suivi des erreurs][4].

{{< img src="real_user_monitoring/error_tracking/rum_errors.gif" alt="Suivi des erreurs RUM">}}


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]:/fr/real_user_monitoring/dashboards
[2]:/fr/real_user_monitoring/explorer/analytics
[4]:/fr/real_user_monitoring/error_tracking
[1]: /fr/real_user_monitoring/connect_rum_and_traces