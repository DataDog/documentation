---
disable_sidebar: false
further_reading:
- link: /opentelemetry/troubleshooting/
  tag: Documentation
  text: Dépannage OpenTelemetry
title: Compatibilité entre Datadog et OpenTelemetry
---
## Aperçu {#overview}

Datadog propose plusieurs options de configuration pour s'adapter à divers cas d'utilisation, allant des implémentations complètes d'OpenTelemetry (OTel) aux configurations hybrides utilisant à la fois OpenTelemetry et des composants Datadog. Cette page couvre la compatibilité entre différentes configurations et les produits et fonctionnalités Datadog pris en charge, vous aidant à choisir la meilleure configuration pour vos besoins.

## Configurations {#setups}

Datadog prend en charge plusieurs configurations pour utiliser OpenTelemetry. La principale différence entre ces configurations réside dans le choix du SDK (OpenTelemetry ou Datadog) et le collecteur utilisé pour traiter et transmettre les données de télémétrie.

| Type de configuration | API | SDK | Collecteur/Agent |
|--------------------------------------------|-------------------------|-------------|-----------------------------------------------|
| [**SDK Datadog + DDOT (Recommandé)**][29] | API Datadog ou API OTel | SDK Datadog | Distribution Datadog du collecteur OTel (DDOT) |
| [**SDK OTel + DDOT**][29] | API OTel | SDK OTel | Distribution Datadog du collecteur OTel (DDOT) |
| [**SDK OTel + Collecteur OSS**][7] | API OTel | SDK OTel | Collecteur OTel (OSS) |
| [**Ingestion directe OTLP**][28] | API OTel | SDK OTel | N/A (Direct vers le point de terminaison Datadog) |

## Compatibilité des fonctionnalités {#feature-compatibility}

Le tableau suivant montre la compatibilité des fonctionnalités à travers différentes configurations :

| Fonctionnalité | SDK Datadog + DDOT (Recommandé) | SDK OTel + DDOT | SDK OTel + Collecteur OSS | Ingestion directe OTLP |
|---|---|---|---|---|
| [Cloud SIEM][18] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Traces, métriques, journaux corrélés][19] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Traçage distribué][27] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Observabilité LLM][38] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Métriques d'exécution][23] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Liens de span][25] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Métriques de trace][26] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}}<br>({{< tooltip text="Sampled" tooltip="Calculated from spans that reach Datadog; reflects any OTel-side sampling you configure." >}}) |
| [Surveillance de base de données][14] (DBM) | {{< X >}} | {{< X >}} |  |  |
| [Liste des hôtes d'infrastructure][30] | {{< X >}} | {{< X >}} | {{< X >}} |  |
| [Surveillance du réseau cloud][21] (CNM) | {{< X >}} | {{< X >}} | | |
| [Surveillance des conteneurs en direct/Explorateur Kubernetes][20] | {{< X >}} | {{< X >}} | | |
| [Processus en direct][16] | {{< X >}} | {{< X >}} | | |
| [Surveillance des services universels][17] (USM) | {{< X >}} | {{< X >}} | | |
| [Protection des applications et des API][11] (AAP) | {{< X >}} | | | |
| [Profileur continu][12] | {{< X >}} | | | |
| [Observabilité des données : Surveillance des travaux][13] (DJM) | {{< X >}} | | | |
| [Surveillance des flux de données][15] (DSM) | {{< X >}} | | {{< tooltip text="N/A" tooltip="OTel does not offer DSM functionality" >}} | {{< tooltip text="N/A" tooltip="OTel does not offer DSM functionality" >}} |
| [Surveillance des utilisateurs réels][22] (RUM) | {{< X >}} | | | |
| [Intégration du code source][24] | {{< X >}} | | | |

## Prise en charge de l’API {#api-support}

Les SDK Datadog fournissent une prise en charge des API OpenTelemetry Traces, Metrics et Logs dans différents langages. Recherchez votre langue dans le tableau ci-dessous pour les guides de configuration et les détails de support.

| Langue | API Traces | API Metrics | API Logs |
| :--- | :---: | :---: | :---: |
| [.NET][31] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Python][32] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Node.js][33] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Java][34] | {{< X >}} | {{< X >}} | *Pas encore supporté* |
| [Go][35] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Ruby][36] | {{< X >}} | Alpha | *Pas encore supporté* |
| [PHP][37] | {{< X >}} | {{< X >}} | *Pas encore supporté* |

## Plus de détails {#more-details}

### Observabilité LLM {#llm-observability}

Les traces OpenTelemetry qui ont [des attributs d'IA générative](https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-spans/) sont automatiquement converties en traces d'Observabilité LLM. Pour désactiver cette conversion, voir [Désactivation de la conversion d'Observabilité LLM][38].

### Métriques d'exécution {#runtime-metrics}

- **Configurations du SDK Datadog** : Émettre des [Métriques d'exécution][23] en utilisant DogStatsD (port UDP 8125). Assurez-vous que DogStatsD est activé dans votre Agent Datadog.
- **Configurations du SDK OpenTelemetry** : Suivez la spécification des [Métriques d'exécution OpenTelemetry][1] et elles sont généralement envoyées en utilisant OTLP (port 4317/4318).

### Surveillance des utilisateurs réels (RUM) {#real-user-monitoring-rum}

Pour activer la fonctionnalité complète de RUM, vous devez [injecter les en-têtes pris en charge][2] pour corréler RUM et traces.

### Surveillance du réseau cloud (CNM) {#cloud-network-monitoring-cnm}

La surveillance au niveau des spans ou des points de terminaison n'est **pas** prise en charge.

Pour plus d'informations, consultez [Configuration de la surveillance du réseau cloud][3].

### Intégration du code source {#source-code-integration}

Pour les langages non pris en charge dans les configurations OpenTelemetry, [configurez le marquage de télémétrie][5] pour lier les données à un commit spécifique.

## Niveaux de support {#support-levels}

Datadog fournit différents niveaux de prise en charge pour les composants et configurations OpenTelemetry :

- **Composants Datadog pris en charge** : Composants Datadog tels que le [Connecteur Datadog][39], l'[Exportateur Datadog][40] et le [Processeur d'attributs Infra][41]. Ces composants sont maintenus par Datadog, reçoivent des mises à jour régulières et sont prioritaires pour les corrections de bogues et les améliorations de fonctionnalités.

- **Composants pris en charge par la communauté** : Composants OpenTelemetry [inclus avec le Collecteur DDOT][42] par défaut. Datadog aide à garantir que ces composants sont sécurisés, stables et compatibles.

- **Composants personnalisés** : Composants ou configurations OpenTelemetry non inclus par défaut, tels que [composants de Collecteur personnalisés][43] ou [instrumentation de runtimes non pris en charge][44]. Datadog fournit des conseils et de la documentation comme point de départ mais ne prend pas directement en charge la fonctionnalité de ces composants. Pour les problèmes liés aux composants personnalisés, engagez-vous avec la [communauté OpenTelemetry][45] ou les mainteneurs des composants.

## Support de la plateforme et de l'environnement {#platform-and-environment-support}

Bien que le Collecteur OpenTelemetry puisse être déployé dans de nombreux environnements, certaines plateformes ont des limitations spécifiques ou des exigences de support.

* **AWS EKS Fargate** : Cet environnement n'est **pas actuellement supporté** et entraînera une facturation incorrecte des hôtes d'infrastructure lorsqu'il est utilisé avec le Collecteur OpenTelemetry. Un support officiel est prévu pour une future version. Consultez le [guide de configuration du Collecteur][7] pour les informations les plus récentes.

## Meilleures pratiques {#best-practices}

Lors de l'utilisation de Datadog et d'OpenTelemetry ensemble, Datadog recommande les meilleures pratiques suivantes pour garantir des performances optimales et éviter d'éventuels problèmes :

- **Évitez l'instrumentation mixte** : Dans la plupart des cas, vous ne devez pas utiliser à la fois un SDK Datadog et un SDK OpenTelemetry dans la même application, car cela entraîne un comportement indéfini.
  - **Exception** : Le support de certains langages, comme Python, nécessite que le SDK Datadog et le SDK OpenTelemetry soient installés.
  - Suivez toujours la documentation d'instrumentation spécifique à chaque langage[8] pour vous assurer que vous utilisez la configuration correcte et prise en charge.
- **Évitez l'Agent et le Collecteur séparé sur le même hôte** : Ne faites pas fonctionner l'Agent Datadog et un Collecteur OpenTelemetry séparé sur le même hôte, car cela peut causer des problèmes. Cependant, vous pouvez exécuter des Agents et des Collecteurs sur des hôtes différents au sein de la même flotte.

## Lectures complémentaires {#further-reading}

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
[20]: /fr/containers/
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
[38]: /fr/llm_observability/instrumentation/otel_instrumentation/
[39]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/datadogconnector/README.md
[40]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/README.md
[41]: https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/otlp/components/processor/infraattributesprocessor#readme
[42]: /fr/opentelemetry/setup/ddot_collector/#opentelemetry-collector-components
[43]: /fr/opentelemetry/setup/ddot_collector/custom_components
[44]: /fr/opentelemetry/guide/instrument_unsupported_runtimes
[45]: https://opentelemetry.io/community/