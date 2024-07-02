---
aliases:
- /fr/real_user_monitoring/installation
description: Visualisez, observez et analysez les performances de vos applications
  frontend, telles qu'elles sont perçues par vos utilisateurs.
disable_sidebar: true
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Real%20User%20Monitoring
  tag: Notes de version
  text: Découvrez les dernières versions de la solution RUM Datadog (connexion à l'application
    requise).
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: Blog
  text: Présentation du service Real User Monitoring (RUM) de Datadog
- link: https://www.datadoghq.com/blog/datadog-mobile-rum/
  tag: Blog
  text: Améliorer l'expérience utilisateur sur mobile avec le service Mobile Real
    User Monitoring de Datadog
- link: https://www.datadoghq.com/blog/mobile-monitoring-best-practices/
  tag: Blog
  text: Recommandations pour la surveillance des performances des applications mobiles
- link: https://www.datadoghq.com/blog/error-tracking/
  tag: Blog
  text: Analyser les problèmes affectant vos applications avec le suivi des erreurs
    Datadog
- link: https://www.datadoghq.com/blog/unify-apm-rum-datadog/
  tag: Blog
  text: Unifier les données RUM et APM pour optimiser votre visibilité sur l'ensemble
    de votre stack
- link: https://www.datadoghq.com/blog/datadog-geomaps/
  tag: Blog
  text: Utiliser les geomaps pour visualiser les données de votre application par
    région
- link: https://www.datadoghq.com/blog/datadog-rum-react-components/#tune-up-your-react-data-collection
  tag: Blog
  text: Bénéficier de données RUM plus utiles grâce à nos composants React personnalisés
- link: /real_user_monitoring/browser/data_collected/
  tag: Documentation
  text: Données RUM recueillies (Browser)
- link: https://www.datadoghq.com/blog/hybrid-app-monitoring/
  tag: Blog
  text: Surveiller vos applications mobiles hybrides avec Datadog
title: RUM et Session Replay
---

{{< img src="real_user_monitoring/RUM-perf-dashboard.jpeg" alt="Dashboard RUM" >}}

## En quoi consiste la solution Real User Monitoring ?

Le service *Real User Monitoring (RUM)* de Datadog vous offre une visibilité de bout en bout sur les activités et l'expérience en temps réel de chaque utilisateur. Cette solution de surveillance d'applications Web et mobiles répond à quatre besoins différents : 

* **Mesure des performances** : suivez les performances des pages Web, des écrans d'applications mobiles, des actions utilisateur, des requêtes réseau, ainsi que de votre code frontend.
* **Gestion des erreurs** : surveillez les bugs et problèmes en cours et suivez leur évolution et leurs versions.
* **Analyses/Utilisation** : analysez le profil des utilisateurs de votre application (pays, appareil, système d'exploitation), surveillez des parcours utilisateur individuels et examinez les interactions des utilisateurs avec votre application (pages couramment consultées, clics, interactions et utilisation des fonctionnalités).
* **Assistance** : récupérez toutes les informations associées à une session utilisateur (durée de session, pages consultées, interactions, ressources chargées et erreurs) afin de diagnostiquer un problème.

## En quoi consiste la solution Session Replay ?

La solution *Session Replay* de Datadog vous permet d'enregistrer et de revoir l'expérience de navigation de vos utilisateurs.

Conjointement aux données de performance RUM, Session Replay facilite l'identification, la reproduction et la résolution des erreurs et vous fournit de précieuses données sur les tendances d'utilisation et les défauts de conception de votre application Web.

## Prise en main

Sélectionnez votre type d'application pour commencer à recueillir des données RUM :

{{< partial name="rum/rum-getting-started.html" >}}

</br>

## Explorer le service RUM de Datadog

### Dashboards prêts à l'emploi

Analysez des informations sur les parcours utilisateur, les performances, les requêtes réseau et les erreurs recueillies automatiquement à l'aide de [dashboards prêts à l'emploi][1].

{{< img src="real_user_monitoring/RUM-session-dashboard.jpeg" alt="Dashboard RUM" >}}

### RUM Explorer et visualisations

Affichez les sessions utilisateur associées à des segments spécifiques. Utilisez par exemple des [visualisations][2] pour vérifier les niveaux de latence ayant un impact sur vos clients privilégiés. Explorez vos données, enregistrez des vues et créez des [monitors][3] basés sur vos recherches personnalisées.

{{< img src="real_user_monitoring/explorer/analytics/rum_analytics.mp4" alt="Analyses RUM" video=true >}}

### Intégration aux logs, à l'APM et au profileur

Affinez vos [métriques d'infrastructure, vos logs et vos traces backend][4] jusqu'à identifier la ligne de code précise qui nuit aux performances de votre application, en tenant compte des expériences des utilisateurs et des problèmes signalés.

{{< img src="real_user_monitoring/connect_rum_and_traces/rum_apm_logs.png" alt="RUM et APM" >}}

### Suivi des erreurs et rapports de crash

Recevez des alertes automatisées en cas d'anomalies, de groupes d'erreurs, de timeouts et de crashs pour réduire considérablement votre MTTR avec le [suivi des erreurs][5].

{{< img src="real_user_monitoring/error_tracking/errors_rum.mp4" alt="Suivi des erreurs RUM" video=true >}}

### Suivi des vues Web

Recueillez des informations à propos de vos applications Web natives et consultez des vues hybrides grâce au suivi des vues Web pour [iOS][6] et [Android][7].

{{< img src="real_user_monitoring/webview_tracking/webview_tracking_light.png" alt="Vues Web enregistrées lors une session utilisateur et affichées dans le RUM Explorer" >}}

## Explorer les enregistrements Session Replay Datadog

### Session replays

Visionnez des [enregistrements du navigateur][8] d'utilisateurs réels qui interagissent avec votre site Web et définissez des [options de confidentialité][9] pour votre organisation.

### Outils de développement

Les [outils de développement Browser][6] vous permettent de consulter les logs et les erreurs générés, ainsi que des données de performance, pendant que vous résolvez les problèmes de vos applications.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/dashboards/
[2]: /fr/real_user_monitoring/explorer/visualize/
[3]: /fr/monitors/create/types/real_user_monitoring/
[4]: /fr/real_user_monitoring/connect_rum_and_traces/
[5]: /fr/real_user_monitoring/error_tracking/
[6]: /fr/real_user_monitoring/ios/web_view_tracking/
[7]: /fr/real_user_monitoring/android/web_view_tracking/
[8]: /fr/real_user_monitoring/session_replay/
[9]: /fr/real_user_monitoring/session_replay/privacy_options/