---
algolia:
  tags:
  - apm
  - application performance monitoring
  - distributed tracing
aliases:
- /fr/tracing/faq/terminology
- /fr/tracing/guide/terminology
- /fr/tracing/guide/distributed_tracing/
- /fr/tracing/advanced/
- /fr/tracing/api
- /fr/tracing/faq/distributed-tracing/
cascade:
  algolia:
    rank: 70
description: Instrumenter votre code pour améliorer ses performances
further_reading:
- link: https://app.datadoghq.com/release-notes?category=APM
  tag: Notes de version
  text: Découvrez les dernières versions de la solution APM Datadog (connexion à l'application
    requise).
- link: /tracing/guide/setting_primary_tags_to_scope/
  tag: Documentation
  text: Ajouter des tags primaires et secondaires à vos traces
- link: /tracing/guide/add_span_md_and_graph_it/
  tag: Documentation
  text: Ajouter des tags personnalisés à vos spans pour filtrer et regrouper les données
    de performance
- link: /tracing/guide/security/
  tag: Documentation
  text: Nettoyer automatiquement les informations personnelles de vos traces
- link: /tracing/metrics/metrics_namespace/
  tag: Documentation
  text: En savoir plus sur les métriques de trace et leurs tags
- link: /tracing/glossary/
  tag: Documentation
  text: Se familiariser avec les concepts de la solution APM et la terminologie associée
- link: https://www.datadoghq.com/blog/span-based-metrics/
  tag: Blog
  text: Générer des métriques basées sur des spans pour suivre les tendances historiques
    relatives aux performances des applications
- link: https://www.datadoghq.com/blog/apm-security-view/
  tag: Blog
  text: Gagner en visibilité sur les risques, vulnérabilités et attaques avec la vue
    Security d'APM
- link: https://www.datadoghq.com/blog/monitor-azure-app-service-linux/
  tag: Blog
  text: Surveiller vos applications Web Linux sur Azure App Service avec Datadog
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Participer à une session interactive pour maîtriser la solution APM
title: APM
---

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/381554158/rendition/1080p/file.mp4?loc=external&signature=e19b4e64632c3b1a42b11cb27fca2682dfadecd4690774c005ba2f5079b6a416" poster="/images/poster/tracing.png" >}}

</br>

La solution Application Performance Monitoring (APM) de Datadog permet d'analyser en détail vos applications grâce à des **dashboards de performance prêts à l'emploi** qui surveillent les requêtes, les erreurs et la latence de vos services Web, vos files d'attente et vos bases de données. Les traces distribuées sont **automatiquement mises en corrélation** avec les sessions de navigateur, les logs, les profils, les checks Synthetic ainsi que les métriques réseau, de processus et d'infrastructure sur l'ensemble de vos hosts, conteneurs, proxies et fonctions sans serveur. Passez directement de l'analyse d'une trace lente à l'**identification de la ligne de code spécifique** à l'origine des goulots d'étranglement limitant les performances avec les hotspots de code.

Pour découvrir la terminologie en lien avec la solution APM Datadog, consultez la section [Termes et concepts d'APM][1].

## Envoyer des traces à Datadog

Lorsque vous passez d'une application monolithique à une architecture de microservices, l'implémentation de la solution APM Datadog sur l'ensemble de vos hosts, conteneurs et fonctions sans serveur ne prend que quelques minutes.

<div class="alert alert-info">
<strong>Bêta : instrumentation APM en une seule étape</strong>. Activez l'instrumentation APM lors de l'installation de l'Agent Datadog pour profiter au plus vite de la surveillance des performances de votre application. Cette fonctionnalité permet d'instrumenter automatiquement vos services, sans avoir à modifier le code. Pour en savoir plus, consultez la section <a href="/tracing/trace_collection/single-step-apm">Instrumentation APM en une seule étape</a>.
</div>

**Pour commencer, consultez la section [Envoyer des traces à Datadog][2].**

Ajoutez la bibliothèque de tracing Datadog pour votre environnement et langage, que ce soit pour [tracer un proxy][3], tracer des [fonctions Lambda AWS][4], tirer profit de l'instrumentation automatique ou personnalisée, ou encore instrumenter votre application avec [OpenTelemetry][5].

## Contrôler et gérer les données transmises et conservées par Datadog

{{< img src="tracing/apm_lifecycle/apm_lifecycle_0.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Cycle de vie d'APM" >}}

Les traces sont créées dans vos applications instrumentées et sont transmises à Datadog. Dans le cas de services caractérisés par un débit élevé, vous pouvez visualiser et contrôler l'ingestion à l'aide des [paramètres d'ingestion][6]. Toutes les traces ingérées peuvent être utilisées afin de rechercher et d'analyser des données en temps réel sur une durée de 15 minutes. Vous pouvez utiliser des [filtres de rétention][7] personnalisés basés sur des tags afin de conserver uniquement les traces pertinentes pour votre entreprise. Ainsi, vous pourrez rechercher et analyser ces traces pendant 15 jours.

{{< img src="tracing/index/RetentionFilterTracingPage.png" alt="Rétention et ingestion des traces" style="width:100%;">}}

## Générer des métriques custom à partir de spans

[Générez des métriques][8] avec une période de rétention de 15 mois à partir de l'ensemble des spans ingérées, afin de créer des indicateurs de performance et d'activité clés et de surveiller leur évolution.

{{< img src="tracing/index/SpantoMetricsPreview.png" alt="Générer des métriques custom à partir des spans ingérées" style="width:100%;">}}

## Associer des traces à d'autres données de télémétrie

[Visualisez vos logs d'application][9] en même temps que la trace associée pour une requête distribuée spécifique grâce à l'injection automatique de l'ID de trace. [Associez vos sessions][10] à vos traces pour visualiser les traces spécifiques qui correspondent aux expériences utilisateur ainsi qu'aux problèmes signalés. [Associez les tests simulés][11] aux traces pour identifier l'origine des échecs parmi vos requêtes frontend, réseau et backend.

{{< img src="tracing/index/ConnectLogsWithTraces.png" alt="Associer vos logs à vos traces" style="width:100%;">}}

## Explorer des requêtes en temps réel et des requêtes indexées

[Effectuez une recherche sur vos traces ingérées][12] lors des 15 dernières minutes en vous basant sur n'importe quel tag. Lors d'une panne, analysez les performances par tag sur n'importe quelle span afin d'identifier les utilisateurs ou transactions concernés. Visualisez des cartes illustrant les flux de requêtes ainsi que d'autres représentations, afin de mieux comprendre l'impact de votre code et de déterminer plus facilement comment améliorer ses performances.

{{< img src="tracing/live_search/live-search.mp4" alt="Live Search avec vue sous forme de liste" video="true" >}}

## Tout savoir sur vos services

[Analysez les dépendances entre les services][13] grâce à une service map générée automatiquement à partir de vos traces, et consultez les métriques de performance liées à vos services ainsi que les statuts d'alerte des monitors associés.

{{< img src="tracing/index/ServiceMapInspect.mp4" alt="Service Map" video=true style="width:100%;">}}

[Surveillez les métriques liées à vos services][14] pour détecter des requêtes, erreurs et centiles de latence. Analysez des requêtes de base de données ou des endpoints mis en corrélation avec les données de votre infrastructure.

{{< img src="tracing/index/ServicePage.png" alt="Page Service" style="width:100%;">}}

[Surveillez les performances de vos services][15] et comparez les versions pour les déploiements progressifs, bleus/verts, shadow et Canary.

{{< img src="tracing/deployment_tracking/VersionComparison.png" alt="Versions sur la page Service"  style="width:100%;">}}

## Effectuer le profiling de votre code de production

[Améliorez la latence des applications][16] et optimisez les ressources de calcul avec le profiling continu en production. Vous pourrez ainsi identifier les lignes de code qui sollicitent le plus le processeur, la mémoire et l'E/S.

{{< img src="tracing/index/Profiling.png" alt="Profiling" style="width:100%;">}}


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/glossary/
[2]: /fr/tracing/trace_collection/
[3]: /fr/tracing/trace_collection/proxy_setup/
[4]: /fr/serverless/distributed_tracing
[5]: /fr/tracing/trace_collection/otel_instrumentation/
[6]: /fr/tracing/trace_pipeline/ingestion_controls/
[7]: /fr/tracing/trace_pipeline/trace_retention/#retention-filters
[8]: /fr/tracing/trace_pipeline/generate_metrics/
[9]: /fr/tracing/other_telemetry/connect_logs_and_traces/
[10]: /fr/real_user_monitoring/connect_rum_and_traces
[11]: /fr/synthetics/apm/
[12]: /fr/tracing/trace_explorer/#live-search-for-15-minutes
[13]: /fr/tracing/services/services_map/
[14]: /fr/tracing/services/service_page/
[15]: /fr/tracing/services/deployment_tracking/
[16]: /fr/profiler/