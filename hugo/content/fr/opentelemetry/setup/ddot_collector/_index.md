---
aliases:
- /fr/opentelemetry/agent/
description: Le DDOT Collector est un OpenTelemetry Collector que Datadog développe
  et prend en charge. Déployez-le sur Kubernetes avec les outils OpenTelemetry, avec
  ou sans le Datadog Agent.
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
title: DDOT Collector
---
{{< callout header="faux" btn_hidden="true" >}}
Le DDOT Collector est en préversion.
{{< /callout >}}

## Présentation {#overview}

Le Datadog OpenTelemetry (DDOT) Collector est une distribution open source de l'OpenTelemetry Collector, développée et maintenue par Datadog. Utilisez-le pour collecter, traiter et acheminer la télémétrie avec une configuration OpenTelemetry standard. Il ne nécessite pas le Datadog Agent.

{{< img src="/opentelemetry/setup/otel-ddot-collector.png" alt="Votre application, instrumentée avec un SDK Datadog ou un SDK OpenTelemetry, envoie des données OTLP au DDOT Collector, qui envoie votre télémétrie à Datadog avec l'exportateur Datadog. Un Datadog Agent facultatif s'exécute parallèlement pour les fonctionnalités qui nécessitent l'Agent." style="width:100%;" >}}

- **Utilisez les outils OpenTelemetry** : déployez le collecteur sur Kubernetes avec l'OpenTelemetry Operator ou les charts Helm.
- **Configurez vos pipelines** : recevez la télémétrie depuis les [SDK Datadog][67], les SDK OpenTelemetry et d'autres sources. Traitez-la et acheminez-la vers Datadog et d'autres destinations.
- **Commencez avec les composants inclus** : utilisez l'ensemble sélectionné de [composants OpenTelemetry](#opentelemetry-collector-components) et [Datadog](#datadog-components) sur cette page.
- **Obtenez une assistance au dépannage** : Datadog Support dépanne les composants pris en charge par Datadog. Pour la couverture des composants communautaires et personnalisés, consultez les [niveaux de support][57].

Vous pouvez exécuter le Datadog Agent parallèlement au DDOT Collector pour les fonctionnalités qui nécessitent l'Agent. Pour l'OpenTelemetry Collector qui s'exécute parallèlement à l'Agent, consultez [Agent's Collector][69]. Sur les plateformes autres que Kubernetes, utilisez l'[OpenTelemetry Collector en amont][68] ou le [Datadog Agent][64].

## Démarrez {#get-started}

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/kubernetes/" >}}
    <h3>Install the DDOT Collector on Kubernetes</h3>
    Deploy and configure the Collector yourself, with the OpenTelemetry Operator or the Collector Helm chart.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/migrate/upstream_to_ddot_collector/" >}}
    <h3>Migrate from the upstream Collector</h3>
    Already run the upstream OpenTelemetry Collector? Switch it to the DDOT Collector by changing its image.
    {{< /nextlink >}}
{{< /whatsnext >}}

## Composants inclus {#included-components}

Le DDOT Collector inclut les composants de l'OpenTelemetry Collector listés dans cette section. Pour ajouter des composants à l'Agent's Collector, consultez le [guide des composants personnalisés][2].

### Niveaux de support {#support-levels}

Pour plus de détails sur le support de Datadog, de la communauté et des composants personnalisés, consultez les [Niveaux de support][57] sur la page Compatibilité.

### Composants du collecteur OpenTelemetry {#opentelemetry-collector-components}

Par défaut, le DDOT Collector inclut ces composants. Cette liste correspond à DDOT 7.84. La liste est également disponible au [format YAML][11].

{{% collapse-content title="Récepteurs" level="p" %}}

- [dockerstatsreceiver][58] (disponible depuis la version 7.56.0)
- [filelogreceiver][16]
- [fluentforwardreceiver][17]
- [hostmetricsreceiver][18]
- [jaegerreceiver][19]
- [k8sclusterreceiver][70]
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
- [tailsamplingprocessor][36]
- [transformprocessor][37]

Le `routingprocessor` a été supprimé dans la version 7.71.0. Utilisez plutôt le [routingconnector][56].

{{% /collapse-content %}}

{{% collapse-content title="Exportateurs" level="p" %}}

- [datadogexporter][38]
- [debugexporter][39]
- [loadbalancingexporter][55]
- [otlpexporter][40]
- [otlphttpexporter][41]
- [nopexporter][43]

{{% /collapse-content %}}

{{% collapse-content title="Connecteurs" level="p" %}}

- [countconnector][71]
- [datadogconnector][44]
- [routingconnector][56] (disponible depuis la version 7.68.0)
- [spanmetricsconnector][45]

{{% /collapse-content %}}

{{% collapse-content title="Extensions" level="p" %}}

- [datadogextension][62] (disponible depuis la version 7.72.0)
- [healthcheckextension][46]
- [k8sleaderelector][72]
- [observateur][47]
- [pprofextension][48]
- [storage/filestorage][63] (disponible depuis la version 7.56.0)
- [zpagesextension][49]

{{% /collapse-content %}}

### Composants Datadog {#datadog-components}

En plus des composants OpenTelemetry standard, Datadog fournit et maintient les composants personnalisés suivants :

{{% collapse-content title="Composants Datadog" level="p" %}}

- [Infrastructure Attribute Processor][50] : un composant processeur OpenTelemetry qui attribue des [tags Kubernetes][53] à la télémétrie OTLP (métriques, traces et logs) provenant d'un pod ou d'un conteneur dans un pod. Datadog utilise ces tags pour corréler votre télémétrie avec votre infrastructure Kubernetes. Pour savoir comment `service`, `env` et `version` sont définis, consultez le [tagging de service unifié][54].

- [Converter][51] : Un composant convertisseur OpenTelemetry qui améliore les configurations fournies par l'utilisateur. Il offre une API pour renvoyer à la fois les configurations originales et améliorées, en vérifiant automatiquement les erreurs de configuration connues pour réduire les erreurs.


{{% /collapse-content %}}

L'Agent's Collector inclut également la [DD Flare Extension][52], qui ajoute les informations de diagnostic du collecteur à un flare de l'Agent.

## Versions de l'OpenTelemetry Collector {#opentelemetry-collector-versions}

Chaque version de DDOT inclut ces versions de l'OpenTelemetry Collector :

| Version DDOT | Version bêta | Version stable |
|--------------|--------------|----------------|
| 7.84.x       | v0.159.0     | v1.65.0        |
| 7.83.x       | v0.158.0     | v1.64.0        |
| 7.82.x       | v0.155.0     | v1.61.0        |
| 7.81.x       | v0.154.0     | v1.60.0        |
| 7.80.x       | v0.152.0     | v1.58.0        |

{{% collapse-content title="Versions antérieures" level="p" %}}

| Version DDOT | Version bêta | Version stable |
|--------------|--------------|----------------|
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

{{% /collapse-content %}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: /fr/opentelemetry/setup/ddot_collector/custom_components
[11]: https://github.com/DataDog/datadog-agent/blob/7.84.0/comp/otelcol/collector-contrib/impl/manifest.yaml
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
[64]: /fr/opentelemetry/setup/agent/
[67]: /fr/opentelemetry/instrument/dd_sdks/otlp_trace_export/
[68]: /fr/opentelemetry/setup/collector_exporter/
[69]: /fr/opentelemetry/setup/agent/#agents-collector
[70]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/k8sclusterreceiver/README.md
[71]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/countconnector/README.md
[72]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/k8sleaderelector/README.md