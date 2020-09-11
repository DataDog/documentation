---
title: APM et tracing distribué
kind: documentation
description: Instrumenter votre code pour améliorer ses performances
further_reading:
  - link: /tracing/guide/setting_primary_tags_to_scope/
    tag: Documentation
    text: Ajouter des tags primaires et secondaires à vos traces
  - link: /tracing/guide/add_span_md_and_graph_it/
    tag: Documentation
    text: Ajouter des tags personnalisés à vos spans pour filtrer les données de performance
  - link: /tracing/guide/security/
    tag: Documentation
    text: Nettoyer automatiquement les informations personnelles de vos traces
  - link: /tracing/guide/metrics_namespace/
    tag: Documentation
    text: En savoir plus sur les métriques de trace et leurs tags
  - link: /tracing/visualization/
    tag: Documentation
    text: Apprendre à utiliser l'UI de l'APM
aliases:
  - /fr/tracing/faq/terminology
  - /fr/tracing/guide/terminology
  - /fr/tracing/guide/distributed_tracing/
  - /fr/tracing/advanced/
  - /fr/tracing/api
  - /fr/tracing/faq/distributed-tracing/
---
{{< vimeo 381554158 >}}

</br>

L'APM et le tracing distribué de Datadog permettent d'analyser en détail vos applications grâce à des **dashboards de performance prêts à l'emploi** qui surveillent les requêtes, les erreurs et la latence de vos services Web, vos files d'attente et vos bases de données. Les traces distribuées sont **automatiquement mises en corrélation** avec les sessions de navigateur, les logs, les checks Synthetics ainsi que les métriques réseau, de processus et d'infrastructure sur l'ensemble de vos hosts, conteneurs, proxies et fonctions sans serveur. Effectuez des recherches parmi **l'ensemble de vos traces ingérées sans aucun échantillonnage** pendant une panne, et laissez Datadog conserver intelligemment les traces correspondant à une erreur, une latence élevée ou des chemins de code uniques en vue de leur analyse.

## Prise en main

Lorsque que vous passez d'une application monolithique à une architecture de microservices, implémenter l'APM Datadog sur l'ensemble de vos hosts, conteneurs et fonctions sans serveur ne prend que quelques minutes.

### 1. Configurer l'Agent Datadog

[Installez et configurez l'Agent Datadog][1] dans AWS, GCP, Azure, Kubernetes, ECS, Fargate, PCF, Heroku, sur site et plus encore.

### 2. Instrumenter votre application

Ajoutez une bibliothèque de tracing à votre application ou service proxy pour commencer à envoyer des traces à l'Agent Datadog.

{{< partial name="apm/apm-languages.html" >}}
<br>
## Explorer l'APM Datadog

Maintenant que vous avez configuré votre application pour qu'elle envoie des traces à Datadog, vous pouvez commencer à analyser les performances de votre application :

### Service Map

[Analysez les dépendances entre les services][2] avec une service map générée automatiquement à partir de vos traces, ainsi que des métriques de performance des services et des statuts d'alerte de monitor.

{{< img src="tracing/index/ServiceMapInspect.gif" alt="Service Map"  style="width:100%;">}}

### Dashboards des performances de service

[Surveillez les métriques de services][3] pour détecter des requêtes, erreurs et centiles de latence. Analysez en détail les requêtes de base de données ou les endpoints mis en corrélation avec les données de votre infrastructure.

{{< img src="tracing/index/ServicePage.gif" alt="Pages Service"  style="width:100%;">}}

### Suivi des versions

[Surveillez les performances de vos services][4] en définissant des tags de version pour les déploiements progressifs, bleu/vert, fantôme et canary.

{{< img src="tracing/version_tracking/rolling.png" alt="Versions sur la page Service"  style="width:100%;">}}

### Live Search

[Sur n'importe quelle span, effectuez une recherche][5] par tag sur l'ensemble de vos traces ingérées, en temps réel et sans aucun échantillonnage, pendant 15 minutes.

{{< img src="tracing/live_search/livesearchmain.gif" alt="Live Search" >}}

### Associer vos logs à vos traces distribuées

[Visualisez vos logs d'application][6] en même temps que la trace associée pour une requête distribuée spécifique grâce à l'injection automatique de l'ID de trace.

{{< img src="tracing/index/ConnectLogsWithTraces.png" alt="Associer vos logs à vos traces"  style="width:100%;">}}

### Tracer des fonctions sans serveur

[Tracez vos fonctions AWS Lambda et vos hosts][7] pour visualiser l'intégralité des traces au sein de votre infrastructure hybride.

{{< img src="tracing/serverless_functions/ServerlessDistributedTrace.png" alt="Tracer des fonctions sans serveur"  style="width:100%;">}}

### App Analytics

[Analysez les performances][8] par tags d'application, tags d'infrastructure ou tags personnalisés, tels que le centre de données, la zone de disponibilité, la version de déploiement, le domaine, l'utilisateur, le montant du paiement, le client, et plus encore.

{{< img src="tracing/index/SearchAppAnalytics.gif" alt="App Analytics"  style="width:100%;">}}

### Associer vos données de test Synthetics à vos traces

[Associez les tests d'API simulés][9] aux traces pour identifier l'origine des échecs parmi vos requêtes frontend, réseau et backend.

{{< img src="tracing/index/Synthetics.gif" alt="Tests Synthetics"  style="width:100%;">}}

### Profileur en continu

[Améliorez l'efficacité du code][10] avec le profiling continu en production, qui vous permet d'identifier les lignes de code qui sollicitent le plus le processeur, la mémoire et l'E/S.

{{< img src="tracing/index/Profiling.png" alt="Profiling"  style="width:100%;">}}

### Personnaliser votre instrumentation ou ajouter OpenTracing

[Connectez automatiquement votre instrumentation][11] entre l'instrumentation automatique, dd-trace-api, OpenTracing et les exportateurs OpenTelemetry.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/send_traces/
[2]: /fr/tracing/visualization/services_map/
[3]: /fr/tracing/visualization/service/
[4]: /fr/tracing/version_tracking/
[5]: /fr/tracing/livesearch/
[6]: /fr/tracing/connect_logs_and_traces/
[7]: /fr/tracing/serverless_functions/
[8]: /fr/tracing/app_analytics/
[9]: /fr/synthetics/apm/
[10]: /fr/tracing/profiler/
[11]: /fr/tracing/manual_instrumentation/