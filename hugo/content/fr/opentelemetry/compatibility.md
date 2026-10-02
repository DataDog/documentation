---
disable_sidebar: false
further_reading:
- link: /opentelemetry/troubleshooting/
  tag: Documentation
  text: Dépannage d'OpenTelemetry
title: Compatibilité entre Datadog et OpenTelemetry
---
## Présentation {#overview}

Datadog propose plusieurs options de configuration pour répondre à divers cas d'utilisation, allant des implémentations OpenTelemetry (OTel) complètes aux configurations hybrides utilisant à la fois des composants OpenTelemetry et Datadog. Cette page couvre la compatibilité entre différentes configurations ainsi que les produits et fonctionnalités Datadog pris en charge, vous aidant à choisir la configuration la mieux adaptée à vos besoins.

## Configurations {#setups}

Datadog prend en charge plusieurs configurations pour l'utilisation d'OpenTelemetry. La principale différence entre ces configurations réside dans le choix du SDK (OpenTelemetry ou Datadog) et du collecteur utilisé pour traiter et transférer les données de télémétrie.

| Type de configuration                                           | API                     | SDK         | Collecteur/Agent                               |
|------------------------------------------------------|-------------------------|-------------|-----------------------------------------------|
| [**SDK Datadog + DDOT (Recommandé)**][29]           | API Datadog ou API OTel | SDK Datadog | Distribution Datadog du collecteur OTel (DDOT) |
| [**SDK OTel + DDOT**][29]                            | API OTel                | SDK OTel    | Distribution Datadog du collecteur OTel (DDOT) |
| [**SDK OTel + collecteur OTLP OTel**][7]         | API OTel                | SDK OTel    | Collecteur OTLP OTel                      |
| [**Direct OTLP Ingest**][28]                         | API OTel                | SDK OTel    | N/A (Direct to Datadog endpoint)              |

## Compatibilité des fonctionnalités {#feature-compatibility}

Le tableau suivant présente la compatibilité des fonctionnalités selon les différentes configurations :

| Fonctionnalité | SDK Datadog + DDOT (Recommandé) | SDK OTel + DDOT | SDK OTel + collecteur OTLP OTel | Ingestion OTLP directe |
|---|---|---|---|---|
| [Cloud SIEM][18] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Traces, métriques et logs corrélés][19] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Traçage distribué][27] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Agent Observability][38] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Runtime Metrics][23] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Span Links][25] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Métrique de trace][26] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}}<br>({{< tooltip text="Sampled" tooltip="Calculé à partir des spans qui atteignent Datadog ; reflète tout échantillonnage côté OTel que vous configurez." >}}) |
| [Database Monitoring][14] (DBM) | {{< X >}} | {{< X >}} |  |  |
| [Infrastructure Host List][30] | {{< X >}} | {{< X >}} | {{< X >}} |  |
| [Cloud Network Monitoring][21] (CNM) | {{< X >}} | {{< X >}} | | |
| [Kubernetes Monitoring][20] | {{< X >}} | {{< X >}} | {{< X >}} | |
| [Live Container Monitoring][46] | {{< X >}} | {{< X >}} | | |
| [Live Processes][16] | {{< X >}} | {{< X >}} | | |
| [Universal Service Monitoring][17] (USM) | {{< X >}} | {{< X >}} | | |
| [App and API Protection][11] (AAP) | {{< X >}} | | | |
| [Continuous Profiler][12] | {{< X >}} | | | |
| [Data Observability: Jobs Monitoring][13] (DJM) | {{< X >}} | | | |
| [Data Streams Monitoring][15] (DSM) | {{< X >}} | | {{< tooltip text="N/A" tooltip="OTel n'offre pas de fonctionnalité DSM" >}} | {{< tooltip text="N/A" tooltip="OTel n'offre pas de fonctionnalité DSM" >}} |
| [Real User Monitoring][22] (RUM) | {{< X >}} | | | |
| [Source code integration][24] | {{< X >}} | | | |

## Prise en charge de l'API {#api-support}

Les SDK Datadog prennent en charge les API de traces, de métriques et de logs OpenTelemetry dans divers langages. Trouvez votre langage dans le tableau ci-dessous pour accéder aux guides de configuration et aux détails de prise en charge.

| Language | Traces API | Metrics API | Logs API |
| :--- | :---: | :---: | :---: |
| [.NET][31] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Python][32] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Node.js][33] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Java][34] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Go][35] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Ruby][36] | {{< X >}} | Alpha | {{< X >}} |
| [PHP][37] | {{< X >}} | {{< X >}} | {{< X >}} |

## Plus de détails {#more-details}

### Agent Observability {#agent-observability}

Les traces OpenTelemetry qui possèdent des [attributs d'IA générative](https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-spans/) sont automatiquement converties en Agent Observability traces. Pour désactiver cette conversion, consultez [Disabling Agent Observability conversion][38].

### Métriques runtime {#runtime-metrics}

- **Configurations des SDK Datadog** : émettez des [Métriques Runtime][23] via DogStatsD (port UDP 8125). Assurez-vous que DogStatsD est activé dans votre Datadog Agent.
- **Configurations du SDK OpenTelemetry** : Suivent la spécification [Métriques Runtime OpenTelemetry][1] et sont généralement envoyées via OTLP (port 4317/4318).

### Real User Monitoring (RUM){#real-user-monitoring-rum}

Pour activer la fonctionnalité RUM complète, vous devez [injecter les en-têtes pris en charge][2] afin de corréler RUM et les traces.

### Cloud Network Monitoring (CNM) {#cloud-network-monitoring-cnm}

La surveillance au niveau du span ou du endpoint **n'est pas** prise en charge.

Pour plus d'informations, consultez [Cloud Network Monitoring Setup][3].

### Source Code Integration {#source-code-integration}

Pour les langages non pris en charge dans les configurations OpenTelemetry, [configurez le marquage de télémétrie][5] pour lier les données à un commit spécifique.

## Niveaux de prise en charge {#support-levels}

Datadog fournit différents niveaux de prise en charge pour les composants et configurations OpenTelemetry :

- **Datadog Supported Components** : Composants appartenant à Datadog tels que le [Datadog Connector][39], [Datadog Exporter][40] et [Infra Attribute Processor][41]. Ces composants sont maintenus par Datadog, reçoivent des mises à jour régulières et sont prioritaires pour les corrections de bugs et les améliorations de fonctionnalités.

- **Composants pris en charge par la communauté** : composants OpenTelemetry [inclus dans le collecteur DDOT][42] par défaut. Datadog aide à garantir que ces composants sont sécurisés, stables et compatibles.

- **Composants personnalisés** : composants ou configurations OpenTelemetry qui ne sont pas inclus par défaut, tels que des [composants de collecteur personnalisés][43] ou l'[instrumentation d’exécutions non prise en charge][44]. Datadog fournit des conseils et une documentation comme point de départ, mais ne prend pas directement en charge la fonctionnalité de ces composants. Pour les problèmes liés aux composants personnalisés, adressez-vous à la [communauté OpenTelemetry][45] ou aux responsables des composants.

## Prise en charge des plateformes et des environnements{#platform-and-environment-support}

Bien que l'OpenTelemetry Collector puisse être déployé dans de nombreux environnements, certaines plateformes présentent des limitations ou des exigences de prise en charge spécifiques.

* **AWS EKS Fargate** : Cet environnement **n'est actuellement pas pris en charge** et entraînera une facturation incorrecte du host d'infrastructure lorsqu'il est utilisé avec le OpenTelemetry Collector. Une prise en charge officielle est prévue pour une version ultérieure. Consultez le [Collector setup guide][7] pour obtenir les informations les plus récentes.

## Bonnes pratiques {#best-practices}

Lorsque vous utilisez Datadog et OpenTelemetry ensemble, Datadog recommande les bonnes pratiques suivantes pour garantir des performances optimales et éviter les problèmes potentiels :

- **Évitez l'instrumentation mixte** : Dans la plupart des cas, vous ne devez pas utiliser à la fois un SDK Datadog et un SDK OpenTelemetry dans la même application, car cela entraîne un comportement indéfini.
  - **Exception** : La prise en charge de certains langages, tels que Python, nécessite l'installation à la fois du SDK Datadog et du SDK OpenTelemetry.
  - Suivez toujours la [documentation d'instrumentation spécifique au langage][8] pour vous assurer d'utiliser la configuration correcte et prise en charge.
- **Évitez d’exécuter Agent et Collector séparément sur le même host** : N’exécutez pas l’Agent Datadog et un Collector OpenTelemetry séparé sur le même host, car cela pourrait causer des problèmes. Cependant, vous pouvez exécuter des Agents et des Collectors sur des hôtes différents au sein du même parc.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/opentelemetry/integrations/runtime_metrics/
[2]: /fr/real_user_monitoring/correlate_with_other_telemetry/apm/
[3]: /fr/network_monitoring/cloud_network_monitoring/setup/
[4]: /fr/infrastructure/process/
[5]: /fr/integrations/guide/source-code-integration/?tab=go#configure-telemetry-tagging
[6]: /fr/opentelemetry/interoperability/otlp_ingest_in_the_agent/
[7]: /fr/opentelemetry/collector_exporter/
[8]: /fr/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[9]: /fr/opentelemetry/agent
[10]: /fr/tracing/trace_collection/
[11]: /fr/security/application_security/
[12]: /fr/profiler/
[13]: /fr/data_jobs/
[14]: /fr/opentelemetry/correlate/dbm_and_traces/
[15]: /fr/data_streams/
[16]: /fr/infrastructure/process/
[17]: /fr/universal_service_monitoring/
[18]: /fr/security/cloud_siem/
[19]: /fr/opentelemetry/correlate/
[20]: /fr/containers/monitoring/kubernetes_explorer/
[21]: /fr/network_monitoring/performance/
[22]: /fr/opentelemetry/correlate/rum_and_traces/?tab=browserrum#opentelemetry-support
[23]: /fr/tracing/metrics/runtime_metrics/
[24]: /fr/integrations/guide/source-code-integration/
[25]: /fr/tracing/trace_collection/span_links/
[26]: /fr/tracing/metrics/metrics_namespace/
[27]: /fr/tracing/trace_collection/
[28]: /fr/opentelemetry/setup/agentless
[29]: /fr/opentelemetry/setup/ddot_collector
[30]: /fr/infrastructure/list/
[31]: /fr/opentelemetry/instrument/api_support/dotnet/
[32]: /fr/opentelemetry/instrument/api_support/python/
[33]: /fr/opentelemetry/instrument/api_support/nodejs/
[34]: /fr/opentelemetry/instrument/api_support/java/
[35]: /fr/opentelemetry/instrument/api_support/go/
[36]: /fr/opentelemetry/instrument/api_support/ruby/
[37]: /fr/opentelemetry/instrument/api_support/php/
[38]: /fr/llm_observability/instrument/otel_instrumentation/
[39]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/datadogconnector/README.md
[40]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/README.md
[41]: https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/otlp/components/processor/infraattributesprocessor#readme
[42]: /fr/opentelemetry/setup/ddot_collector/#opentelemetry-collector-components
[43]: /fr/opentelemetry/setup/ddot_collector/custom_components
[44]: /fr/opentelemetry/guide/instrument_unsupported_runtimes
[45]: https://opentelemetry.io/community/
[46]: /fr/containers/