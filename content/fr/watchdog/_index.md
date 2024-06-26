---
algolia:
  tags:
  - watchdog
aliases:
- /fr/tracing/watchdog
cascade:
  algolia:
    rank: 70
description: Détectez automatiquement les problèmes d'application et d'infrastructure
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Watchdog
  tag: Notes de version
  text: Découvrez les dernières versions de la solution Watchdog Datadog (connexion
    à l'application requise).
- link: https://www.datadoghq.com/blog/datadog-bits-generative-ai/
  tag: Blog
  text: Présentation de Bits AI, votre nouvel outil d'assistance DevOps
- link: /logs/
  tag: Documentation
  text: Recueillir vos logs
- link: /tracing/
  tag: Documentation
  text: Recueillir vos traces
- link: https://www.datadoghq.com/blog/datadog-watchdog-automated-root-cause-analysis/
  tag: Blog
  text: Analyse automatisée des causes d'origine avec Watchdog RCA
- link: https://www.datadoghq.com/blog/watchdog-impact-analysis/
  tag: Blog
  text: Mesurer l'impact utilisateur avec l'analyse de l'impact Watchdog
- link: https://www.datadoghq.com/blog/watchdog-live-processes/
  tag: Blog
  text: Correction des anomalies liées aux performances des workloads avec Watchdog Insights
    pour les live processes
kind: Documentation
title: Datadog WatchdogTM
---
## Présentation

Le moteur IA de Datadog, Watchdog, vous fournit des alertes automatiques, des informations exploitables, ainsi que des analyses des causes à l'origine de vos problèmes. Ces précieuses informations sont obtenues à partir des données d'observabilité provenant de l'ensemble de la plateforme Datadog. Watchdog surveille constamment votre infrastructure et attire votre attention sur les signaux les plus importants. Vous pouvez ainsi détecter, étudier et résoudre plus facilement vos problèmes.

Toutes les fonctionnalités Watchdog sont automatiquement intégrées et ne nécessitent pas la moindre configuration.

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/781921620/rendition/1080p/file.mp4?loc=external&signature=8889419b739e3398d03a72edca4f96909144567e045d30deeb8f9345c43a682d" poster="/images/poster/watchdog.png" >}}

<br/>

### Alertes proactives

Watchdog détermine de façon proactive le comportement attendu de vos systèmes, applications et déploiements. Ce cadre de référence permet ainsi de détecter tout comportement anormal.

{{< whatsnext desc="">}}
  {{< nextlink href="/watchdog/alerts">}}<u>Alertes Watchdog Alerts</u> : découvrez comment visualiser et interpréter des alertes Datadog et familiarisez-vous avec les informations fournies par les alertes, la portée de chaque alerte ainsi que leurs emplacements dans la plateforme Datadog.{{< /nextlink >}}
  {{< nextlink href="/watchdog/faulty_deployment_detection">}}<u>Détection des déploiements défectueux</u> : découvrez comment Watchdog identifie les déploiements de code défectueux.{{< /nextlink >}}
{{< /whatsnext >}}

Pour personnaliser les algorithmes Watchdog, consultez les rubriques suivantes :
  * [Algorithme pour les anomalies][7]
  * [Algorithme pour les prévisions][8]
  * [Algorithmes pour les singularités][9]

### Informations facilitant les enquêtes

Pour que vous puissiez enquêter plus efficacement sur vos problèmes, Watchdog affiche des informations utiles basées sur le contexte dans toutes les vues Explorer, recherche les causes fondamentales et détermine l'impact utilisateur.

{{< whatsnext desc="">}}
  {{< nextlink href="/watchdog/insights">}}<u>Watchdog Insights</u> : Watchdog Insights est un moteur de recommandations vous aidant à identifier et à résoudre vos problèmes.{{< /nextlink >}}
  {{< nextlink href="/watchdog/rca">}}<u>Root Cause Analysis</u> : découvrez comment la fonctionnalité Root Cause Analysis (RCA) Watchdog identifie la cause fondamentale d'une anomalie et apprenez à exploiter les informations fournies.{{< /nextlink >}}
  {{< nextlink href="/watchdog/impact_analysis">}}<u>Analyse de l'impact</u> : découvrez comment Watchdog détermine qu'une anomalie a une incidence sur l'expérience des utilisateurs.{{< /nextlink >}}
{{< /whatsnext >}}

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][1].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/help/
[2]: /fr/watchdog/alerts
[3]: /fr/watchdog/faulty_deployment_detection/
[4]: /fr/watchdog/insights?tab=logmanagement
[5]: /fr/watchdog/rca/
[6]: /fr/watchdog/impact_analysis/
[7]: /fr/monitors/types/anomaly/#anomaly-detection-algorithms
[8]: /fr/monitors/types/forecasts/?tab=linear#algorithms
[9]: /fr/monitors/types/outlier/?tab=dbscan#algorithms