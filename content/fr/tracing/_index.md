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
---
{{< wistia 2kgmb9wbsr >}}

</br>

L'APM et le tracing distribué de Datadog permettent d'analyser en détail votre application grâce à des **dashboards de performance prêts à l'emploi** qui surveillent les requêtes, les erreurs et la latence de vos services Web, vos files d'attente et vos bases de données. Les traces distribuées sont **automatiquement mises en corrélation** avec les sessions de navigateur, les logs ainsi que les métriques réseau, de processus et d'infrastructure sur l'ensemble de vos hosts, conteneurs, proxies et fonctions sans serveur. Effectuez des recherches parmi **l'ensemble de vos traces sans aucun échantillonnage** pendant une panne, et laissez Datadog conserver intelligemment les traces correspondant à une erreur, une latence élevée ou des chemins de code uniques en vue de leur analyse.

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


### App Analytics

[Analysez les performances][2] par tags d'application, tags d'infrastructure ou tags personnalisés, tels que le centre de données, la zone de disponibilité, la version de déploiement, le domaine, l'utilisateur, le montant du paiement, le client, et plus encore.

{{< img src="tracing/index/SearchAppAnalytics.gif" alt="App Analytics"  style="width:100%;">}}

### Associer vos logs à vos traces

[Visualisez vos logs d'application][3] en même temps que la trace associée pour une requête distribuée spécifique grâce à l'injection automatique de l'ID de trace.

{{< img src="tracing/index/ConnectLogsWithTraces.png" alt="Associer vos logs à vos traces"  style="width:100%;">}}

### Profiling en continu

[Améliorez l'efficacité du code][4] avec le profiling permanent en production, qui vous permet d'identifier les lignes de code qui sollicitent le plus le processeur, la mémoire et l'E/S.

{{< img src="tracing/index/Profiling.png" alt="Profiling"  style="width:100%;">}}

### Live Tail

[Effectuez une recherche par tag][5] sur l'ensemble de vos traces, en temps réel et sans aucun échantillonnage.

{{< img src="tracing/index/SearchLiveTail.gif" alt="LiveTail"  style="width:100%;">}}

### Intégrez OpenTracing à votre instrumentation

[Intégrez][6] OpenTracing et l'APM Datadog à votre instrumentation en toute simplicité.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/send_traces/
[2]: /fr/tracing/app_analytics/
[3]: /fr/tracing/connect_logs_and_traces/
[4]: /fr/tracing/profiling/
[5]: /fr/tracing/livetail/
[6]: /fr/tracing/opentracing/