---
aliases:
- /fr/opentelemetry/agent/
further_reading:
- link: https://learn.datadoghq.com/courses/using-ddot
  tag: Centre d'apprentissage
  text: Distribution Datadog du collecteur OpenTelemetry
- link: https://www.datadoghq.com/blog/boomi-observability-opentelemetry-datadog/
  tag: Blog
  text: Instrumentez et surveillez les flux d'intégration Boomi avec OpenTelemetry
    et Datadog
- link: https://www.datadoghq.com/blog/llm-otel-semantic-convention
  tag: Blog
  text: Datadog LLM Observability prend nativement en charge les conventions sémantiques
    GenAI d'OpenTelemetry.
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: Blog
  text: Centralisez et gérez votre pipeline OpenTelemetry avec la passerelle DDOT
- link: https://www.datadoghq.com/blog/datadog-distribution-otel-collector/
  tag: Blog
  text: Unifiez OpenTelemetry et Datadog avec le collecteur DDOT
- link: https://www.datadoghq.com/architecture/monitoring-kubernetes-with-datadog-distribution/
  tag: Architecture Center
  text: Surveillance de Kubernetes avec la distribution Datadog du collecteur OpenTelemetry
    (DDOT)
title: Distribution Datadog du collecteur OpenTelemetry
---
{{< callout url="https://www.datadoghq.com/product-preview/remote-configuration-for-datadogs-distribution-of-opentelemetry-collector-ddot/" >}}
La configuration à distance pour le collecteur DDOT est <strong>en version préliminaire</strong>. Utilisez ce formulaire pour demander l'accès.
{{< /callout >}}

## Présentation {#overview}

La distribution Datadog du collecteur OpenTelemetry (DDOT) est une solution open source qui combine la flexibilité d'OpenTelemetry (OTel) avec les capacités d'observabilité complètes de Datadog. Cette solution intégrée comprend :

- Un ensemble sélectionné de [composants OpenTelemetry](#included-components) optimisés pour les performances et la fiabilité avec Datadog, avec la possibilité d'ajouter des composants supplémentaires de votre choix
- Fonctionnalités complètes de collecte et de traitement des données de Datadog Agent pour une intégration transparente et une surveillance robuste, incluant la prise en charge de [Datadog Fleet Automation][9] pour le collecteur DDOT (voir [Avantages clés](#key-benefits))
- [Composants Datadog personnalisés](#custom-datadog-components) conçus pour offrir la meilleure expérience d'intégration

{{< img src="/opentelemetry/setup/ddot-collector-2.png" alt="Présentation de l'architecture du collecteur DDOT, qui est intégré au Datadog Agent." style="width:100%;" >}}

## Avantages clés {#key-benefits}

Le collecteur DDOT offre :

### Observabilité complète {#comprehensive-observability}

- Accès {{< translate key="integration_count" >}} Intégrations Datadog, [Live Container Monitoring][3], [Cloud Network Monitoring][7] et [Universal Service Monitoring][5] (avec eBPF) et plus encore
- Tirez parti des intégrations fournies par la communauté OpenTelemetry pour collecter la télémétrie au format natif OpenTelemetry Protocol (OTLP)
- Contrôlez vos données OTLP grâce aux capacités de traitement et de routage du collecteur

### Gestion de parc simplifiée {#simplified-fleet-management}

- Gérez à distance des parcs de collecteurs DDOT avec [Datadog Fleet Automation][9]
- Obtenez une visibilité sur l'ensemble de votre configuration, de vos dépendances et de votre environnement d'exécution
- Intégrez-vous plus rapidement grâce à l'enrichissement des tags prêt à l'emploi pour les données OTLP, activant automatiquement le [unified service tagging][1]

### Fiabilité et ressources d'entreprise {#enterprise-reliability-and-resources}

- Bénéficiez des pratiques de sécurité robustes de Datadog, notamment des analyses et des scans de vulnérabilité réguliers
- Accédez à l'équipe de support mondiale de Datadog pour obtenir de l'aide concernant l'intégration et le dépannage

## Composants inclus {#included-components}

<div class="alert alert-info">
  <strong>Besoin de composants OpenTelemetry supplémentaires?</strong> Si vous avez besoin de composants autres que ceux inclus dans le package par défaut, suivez <a href="/opentelemetry/setup/ddot_collector/custom_components">Use Custom OpenTelemetry Components</a> pour étendre les capacités de Datadog Agent. Pour obtenir une liste des composants inclus par défaut, consultez la section suivante <a href="#opentelemetry-collector-components">Composants du collecteur OpenTelemetry</a>.
</div>

### Versions du collecteur OpenTelemetry {#opentelemetry-collector-versions}

Le tableau suivant indique les versions du collecteur OpenTelemetry incluses dans chaque version de DDOT :

| Version DDOT | Version bêta | Version stable |
|--------------|--------------|----------------|
| 7.82.x       | v0.155.0     | v1.61.0        |
| 7.81.x       | v0.154.0     | v1.60.0        |
| 7.80.x       | v0.152.0     | v1.58.0        |
| 7.79.x       | v0.150.0     | v1.56.0        |
| 7.78.x       | v0.147.0     | v1.53.0        |
| 7.77.x       | v0.145.0     | v1.51.0        |
| 7.76.x       | v0.144.0     | v1.50.0        |
| 7.75.x       | v0.142.0     | v1.48.0        |
| 7.74.x       | v0.140.0     | v1.46.0        |
| 7.73.x       | v0.138.0     | v1.44.0        |
| 7.72.x       | v0.136.0     | v1.42.0        |
| 7.71.x       | v0.133.0     | v1.39.0        |
| 7.70.x       | v0.131.0     | v1.37.0        |
| 7.69.x       | v0.129.0     | v1.35.0        |

### Niveaux de support {#support-levels}

Pour plus de détails sur le support de Datadog, de la communauté et des composants personnalisés, consultez les [Niveaux de support][57] sur la page Compatibilité.

### Composants du collecteur OpenTelemetry {#opentelemetry-collector-components}

Par défaut, le collecteur DDOT est fourni avec les composants du collecteur suivants. Vous pouvez également consulter la liste au [format YAML][11].

{{% collapse-content title="Récepteurs" level="p" %}}

- [dockerstatsreceiver][58] (disponible depuis la version 7.56.0)
- [filelogreceiver][16]
- [fluentforwardreceiver][17]
- [hostmetricsreceiver][18]
- [jaegerreceiver][19]
- [k8sobjectsreceiver][59] (disponible depuis la version 7.56.0)
- [kubeletstatsreceiver][60] (disponible depuis la version 7.56.0)
- [otlpreceiver][20]
- [podmanreceiver][61] (disponible depuis la version 7.56.0)
- [prometheusreceiver][21]
- [receivercreator][22]
- [zipkinreceiver][23]
- [nopreceiver][24]

{{% /collapse-content %}}

{{% collapse-content title="Processeurs" level="p" %}}

- [attributesprocessor][25]
- [batchprocessor][26]
- [cumulativetodeltaprocessor][27]
- [filterprocessor][28]
- [groupbyattributeprocessor][29]
- [k8sattributesprocessor][30]
- [memorylimiterprocessor][31]
- [probabilisticsamplerprocessor][32]
- [resourcedetectionprocessor][33]
- [resourceprocessor][34]
- routingprocessor (obsolète et supprimé dans la version 7.71.0; utilisez plutôt le [routingconnector][56])
- [tailsamplingprocessor][36]
- [transformprocessor][37]

{{% /collapse-content %}}

{{% collapse-content title="Exportateurs" level="p" %}}

- [datadogexporter][38]
- [debugexporter][39]
- [loadbalancingexporter][55]
- [otlpexporter][40]
- [otlphttpexporter][41]
- [sapmexporter][42]
- [nopexporter][43]

{{% /collapse-content %}}

{{% collapse-content title="Connecteurs" level="p" %}}

- [datadogconnector][44]
- [routingconnector][56] (disponible depuis la version 7.68.0)
- [spanmetricsconnector][45]

{{% /collapse-content %}}

{{% collapse-content title="Extensions" level="p" %}}

- [datadogextension][62] (disponible depuis la version 7.72.0)
- [healthcheckextension][46]
- [observateur][47]
- [pprofextension][48]
- [storage/filestorage][63] (disponible depuis la version 7.56.0)
- [zpagesextension][49]

{{% /collapse-content %}}

### Composants Datadog personnalisés {#custom-datadog-components}

En plus des composants OpenTelemetry standard, Datadog fournit et maintient les composants personnalisés suivants :

{{% collapse-content title="Composants Datadog" level="p" %}}

- [Processeur d'attributs d'infrastructure][50] : un composant processeur OpenTelemetry qui attribue automatiquement des [tags Kubernetes][53] à la télémétrie OTLP (métriques, traces et logs) émise par un pod ou un conteneur individuel au sein d'un pod. Ce composant permet le [unified service tagging][54] et la corrélation de télémétrie pour la surveillance des environnements Kubernetes.

- [Converter][51] : Un composant convertisseur OpenTelemetry qui améliore les configurations fournies par l'utilisateur. Il offre une API pour renvoyer à la fois les configurations originales et améliorées, en vérifiant automatiquement les erreurs de configuration connues pour réduire les erreurs. Cela garantit une intégration transparente des configurations existantes du collecteur OpenTelemetry avec l'Agent.

- [DD Flare Extension][52] : Un composant d'extension OpenTelemetry pour générer DD Agent Flare, qui contient des informations de diagnostic provenant à la fois du collecteur DDOT et de l'Agent à des fins de dépannage.

{{% /collapse-content %}}

## Démarrez {#get-started}

Que vous soyez nouveau sur Datadog ou déjà familier avec OpenTelemetry, les guides suivants vous aident à démarrer en fonction de votre situation spécifique.

### Démarrage rapide avec le package Agent par défaut {#quick-start-with-the-default-agent-package}

Le package Datadog Agent par défaut inclut un DDOT Collector avec un [ensemble sélectionné de composants OpenTelemetry inclus](#included-components) conçus pour répondre à la plupart des besoins dès la prise en main. Ce guide est adapté si :

- Vous configurez la surveillance à partir de zéro sans avoir besoin de composants OpenTelemetry en dehors des [composants inclus](#included-components)
- Vous utilisez Datadog Agent et souhaitez tester la fonctionnalité OpenTelemetry avec les composants inclus
- Vous effectuez une transition du collecteur OpenTelemetry vers Datadog Agent sans avoir besoin de composants au-delà de ceux inclus par défaut
- (Facultatif) Si vous avez besoin de composants OpenTelemetry au-delà de ce qui est fourni dans le package par défaut, suivez [Utiliser des composants OpenTelemetry personnalisés][2] pour étendre les capacités de Datadog Agent.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/install/kubernetes" >}}Démarrage rapide avec le package Agent par défaut{{< /nextlink >}}
{{< /whatsnext >}}

### Migrez du collecteur OpenTelemetry vers Datadog Agent {#migrate-from-opentelemetry-collector-to-datadog-agent}

Ce guide vous aide à migrer d'une configuration de collecteur OpenTelemetry existante vers Datadog Agent, y compris dans les scénarios où vous avez besoin de composants OpenTelemetry supplémentaires. Ce guide est adapté si :

- Transition du collecteur OpenTelemetry tout en préservant votre configuration existante
- Migration de vos configurations OpenTelemetry existantes pour maintenir la continuité
- (Facultatif) Si vous avez besoin de composants OpenTelemetry au-delà de ce qui est fourni dans le package par défaut, suivez [Utiliser des composants OpenTelemetry personnalisés][2] pour étendre les capacités de Datadog Agent

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/guide/migrate/ddot_collector" >}}Migrez du collecteur OpenTelemetry vers Datadog Agent.{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/unified_service_tagging/
[2]: /fr/opentelemetry/setup/ddot_collector/custom_components
[3]: /fr/containers/
[4]: /fr/security/sensitive_data_scanner/
[5]: /fr/universal_service_monitoring/
[7]: /fr/network_monitoring/cloud_network_monitoring/
[9]: /fr/agent/fleet_automation/
[11]: https://github.com/DataDog/datadog-agent/blob/main/comp/otelcol/collector-contrib/impl/manifest.yaml
[16]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/filelogreceiver/README.md
[17]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/fluentforwardreceiver/README.md
[18]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/hostmetricsreceiver/README.md
[19]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/jaegerreceiver/README.md
[20]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/receiver/otlpreceiver/README.md
[21]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/prometheusreceiver/README.md
[22]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/receivercreator/README.md
[23]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/zipkinreceiver/README.md
[24]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/receiver/nopreceiver#readme
[25]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/attributesprocessor/README.md
[26]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/batchprocessor/README.md
[27]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/cumulativetodeltaprocessor/README.md
[28]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/filterprocessor/README.md
[29]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/groupbyattrsprocessor/README.md
[30]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/k8sattributesprocessor/README.md
[31]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/memorylimiterprocessor/README.md
[32]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/probabilisticsamplerprocessor/README.md
[33]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/resourcedetectionprocessor/README.md
[34]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/resourceprocessor/README.md
[36]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/tailsamplingprocessor/README.md
[37]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/transformprocessor/README.md
[38]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/README.md
[39]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/debugexporter/README.md
[40]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/otlpexporter/README.md
[41]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/otlphttpexporter/README.md
[42]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/sapmexporter/README.md
[43]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/nopexporter/README.md
[44]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/datadogconnector/README.md
[45]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/spanmetricsconnector/README.md
[46]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/healthcheckextension/README.md
[47]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/observer/README.md
[48]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/pprofextension/README.md
[49]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/extension/zpagesextension/README.md
[50]: https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/otlp/components/processor/infraattributesprocessor#readme
[51]: https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/converter#readme
[52]: https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/ddflareextension#readme
[53]: /fr/containers/kubernetes/tag/?tab=datadogoperator#out-of-the-box-tags
[54]: /fr/getting_started/tagging/unified_service_tagging/?tab=kubernetes
[55]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/loadbalancingexporter/README.md
[56]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/routingconnector/README.md
[57]: /fr/opentelemetry/compatibility/#support-levels
[58]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/dockerstatsreceiver/README.md
[59]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/k8sobjectsreceiver/README.md
[60]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/kubeletstatsreceiver/README.md
[61]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/podmanreceiver/README.md
[62]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/datadogextension/README.md
[63]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/storage/filestorage/README.md