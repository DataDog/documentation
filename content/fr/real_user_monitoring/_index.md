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
    text: Real User Monitoring
  - link: /logs/processing/attributes_naming_convention/
    tag: Documentation
    text: Attributs standards Datadog
---
{{< img src="real_user_monitoring/rum_full_dashboard.png" alt="Dashboard RUM"  >}}

## Qu'est-ce que le Real User Monitoring ?


Le service Real User Monitoring (RUM) de Datadog vous offre une visibilité de bout en bout sur les activités et l'expérience en temps réel de chaque utilisateur. Conçu pour les applications Web et mobiles, il répond à quatre besoins différents :

* **Mesure des performances** : suivez les performances des pages Web, des écrans d'application, mais également des actions utilisateur, des requêtes réseau,ainsi que de votre code frontend
* **Gestion des erreurs** : surveillez les bugs et problèmes en cours et suivez leur évolution
* **Analyses/Utilisation** : analysez le profil des utilisateurs de votre application (pays, appareil, système d'exploitation…), surveillez les parcours utilisateur individuels et analysez les interactions des utilisateurs avec votre application (page couramment consultée, clics, interactions, utilisation des fonctionnalités…)
* **Assistance** : récupérez toutes les informations associées à une session utilisateur afin de dépanner un problème (durée de session, pages consultées, interactions, ressources chargées, erreurs…)

{{< whatsnext desc="Prise en main de la fonctionnalité RUM :">}}
  {{< nextlink href="/real_user_monitoring/browser">}}<u>Surveillance Browser</u> : créez une application en configurant le SDK Browser.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/android">}}<u>Surveillance Android</u> : créez une application en configurant le SDK Android.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/dashboards">}}<u>Dashboards</u> : visualisez toutes les données recueillies par défaut grâce à nos dashboards.{{< /nextlink >}}
{{< /whatsnext >}}
{{< whatsnext desc="Exploration de vos événements RUM :">}}
  {{< nextlink href="/real_user_monitoring/explorer/">}}<u>Recherche RUM</u> : effectuez des recherches parmi vos vues de page.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/explorer/analytics">}}<u>RUM Analytics</u> : obtenez des informations exploitables à partir de l'ensemble de vos événements.{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}