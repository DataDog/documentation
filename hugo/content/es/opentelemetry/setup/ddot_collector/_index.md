---
aliases:
- /es/opentelemetry/agent/
description: El DDOT Collector es un OpenTelemetry Collector que Datadog desarrolla
  y al que brinda soporte. Impleméntelo en Kubernetes con herramientas de OpenTelemetry,
  con o sin el Datadog Agent.
further_reading:
- link: https://learn.datadoghq.com/courses/using-ddot
  tag: Centro de aprendizaje
  text: Uso de la distribución de Datadog del Collector de OpenTelemetry
- link: https://www.datadoghq.com/blog/boomi-observability-opentelemetry-datadog/
  tag: Blog
  text: Instrumente y haga un seguimiento de los flujos de integración de Boomi con
    OpenTelemetry y Datadog
- link: https://www.datadoghq.com/blog/llm-otel-semantic-convention
  tag: Blog
  text: Datadog LLM Observability admite de forma nativa las convenciones semánticas
    de GenAI de OpenTelemetry
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: Blog
  text: Centralice y gobierne su canalización de OpenTelemetry con el gateway DDOT
- link: https://www.datadoghq.com/blog/datadog-distribution-otel-collector/
  tag: Blog
  text: Unifique OpenTelemetry y Datadog con el DDOT Collector
- link: https://www.datadoghq.com/architecture/monitoring-kubernetes-with-datadog-distribution/
  tag: Centro de arquitectura
  text: Seguimiento de Kubernetes con la distribución de Datadog del Collector de
    OpenTelemetry (DDOT)
title: DDOT Collector
---
{{< callout header="false" btn_hidden="true" >}}
El DDOT Collector está en versión preliminar (Preview).
{{< /callout >}}

## Descripción general {#overview}

El Datadog OpenTelemetry (DDOT) Collector es una distribución de código abierto del OpenTelemetry Collector, desarrollada y mantenida por Datadog. Úselo para recopilar, procesar y enrutar telemetría con la configuración estándar de OpenTelemetry. No requiere el Datadog Agent.

{{< img src="/opentelemetry/setup/otel-ddot-collector.png" alt="Su aplicación, instrumentada con un SDK de Datadog o un SDK de OpenTelemetry, envía OTLP al DDOT Collector, el cual envía su telemetría a Datadog con el Datadog Exporter. Un Datadog Agent opcional se ejecuta junto a él para funciones que necesiten el Agent." style="width:100%;" >}}

- **Use herramientas de OpenTelemetry**: Implemente el Collector en Kubernetes con el OpenTelemetry Operator o Helm charts.
- **Configure sus canalizaciones**: Reciba telemetría de [Datadog SDKs][67], OpenTelemetry SDKs y otras fuentes. Procese la telemetría y envíela a Datadog y a otros destinos.
- **Comience con los componentes incluidos**: Use el conjunto seleccionado de [OpenTelemetry](#opentelemetry-collector-components) y [componentes de Datadog](#datadog-components) en esta página.
- **Obtenga ayuda para resolver problemas**: El equipo de soporte de Datadog ayuda a resolver problemas de los componentes a los que Datadog brinda soporte. Para conocer el alcance del soporte para componentes de la comunidad y componentes personalizados, consulte [Niveles de soporte][57].

Puede ejecutar el Datadog Agent junto con el Collector para funciones que necesiten el Agent. Para el OpenTelemetry Collector que se ejecuta junto con el Agent, consulte [Agent's Collector][69]. En plataformas distintas a Kubernetes, use el [upstream OpenTelemetry Collector][68] o el [Datadog Agent][64].

## Comience {#get-started}

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

## Componentes incluidos {#included-components}

El DDOT Collector incluye los componentes del OpenTelemetry Collector enumerados en esta sección. Para compilar el Agent's Collector con otros componentes, consulte [Add Components to the Agent's Collector][2].

### Support levels {#support-levels}

Para obtener detalles sobre el soporte de Datadog, de la comunidad y de componentes personalizados, consulte [Support levels][57] en la página de Compatibilidad.

### OpenTelemetry Collector components {#opentelemetry-collector-components}

De forma predeterminada, el DDOT Collector incluye estos componentes. Esta lista coincide con DDOT 7.85. Los componentes upstream también se enumeran en el [manifiesto de DDOT 7.85.3][11]. El manifiesto no enumera el Datadog Exporter ni el Datadog Connector, que Datadog compila por separado.

{{% collapse-content title="Receptores" level="p" %}}

- [dockerstatsreceiver][58] (disponible desde la versión 7.56.0)
- [filelogreceiver][16]
- [fluentforwardreceiver][17]
- [hostmetricsreceiver][18]
- [httpcheckreceiver][73] (disponible desde la versión 7.85.0)
- [jaegerreceiver][19]
- [k8sclusterreceiver][70]
- [k8seventsreceiver][74] (disponible desde la versión 7.85.0)
- [k8sobjectsreceiver][59] (disponible desde la versión 7.56.0)
- [kafkareceiver][75] (disponible desde la versión 7.85.0)
- [kubeletstatsreceiver][60] (disponible desde la versión 7.56.0)
- [otlpreceiver][20]
- [podmanreceiver][61] (disponible desde la versión 7.56.0)
- [prometheusreceiver][21]
- [receivercreator][22]
- [zipkinreceiver][23]
- [nopreceiver][24]

{{% /collapse-content %}}

{{% collapse-content title="Procesadores" level="p" %}}

- [attributesprocessor][25]
- [batchprocessor][26]
- [cumulativetodeltaprocessor][27]
- [deltatorateprocessor][76] (disponible desde la versión 7.85.0)
- [filterprocessor][28]
- [groupbyattrsprocessor][29]
- [k8sattributesprocessor][30]
- [memorylimiterprocessor][31]
- [probabilisticsamplerprocessor][32]
- [resourcedetectionprocessor][33]
- [resourceprocessor][34]
- [tailsamplingprocessor][36]
- [transformprocessor][37]

El `routingprocessor` se eliminó en la versión 7.71.0. Utilice el [routingconnector][56] en su lugar.

{{% /collapse-content %}}

{{% collapse-content title="Exportadores" level="p" %}}

- [datadogexporter][38]
- [debugexporter][39]
- [loadbalancingexporter][55]
- [otlpexporter][40]
- [otlphttpexporter][41]
- [nopexporter][43]

{{% /collapse-content %}}

{{% collapse-content title="Conectores" level="p" %}}

- [countconnector][71]
- [datadogconnector][44]
- [routingconnector][56] (disponible desde la versión 7.68.0)
- [spanmetricsconnector][45]

{{% /collapse-content %}}

{{% collapse-content title="Extensiones" level="p" %}}

- [datadogextension][62] (disponible desde la versión 7.72.0)
- [healthcheckextension][46]
- [k8sleaderelector][72]
- [observer][47]
- [pprofextension][48]
- [storage/filestorage][63] (disponible desde la versión 7.56.0)
- [zpagesextension][49]

{{% /collapse-content %}}

### Componentes de Datadog {#datadog-components}

Además de los componentes estándar de OpenTelemetry, Datadog proporciona y mantiene los siguientes componentes personalizados:

{{% collapse-content title="Componentes de Datadog" level="p" %}}

- [Procesador de atributos de infraestructura][50]: Un componente procesador de OpenTelemetry que asigna [etiquetas de Kubernetes][53] a la telemetría OTLP (métricas, trazas y registros) de un pod o un contenedor en un pod. Datadog utiliza estas etiquetas para correlacionar su telemetría con su infraestructura de Kubernetes. Para saber cómo se configuran `service`, `env` y `version`, consulte [etiquetado de servicio unificado][54].

- [Converter][51]: Un componente convertidor de OpenTelemetry que mejora las configuraciones proporcionadas por el usuario. Ofrece una API para devolver tanto las configuraciones originales como las mejoradas, verificando automáticamente si existen configuraciones incorrectas conocidas para reducir errores.


{{% /collapse-content %}}

Tanto el DDOT Collector como el Agent's Collector incluyen la [DD Flare Extension][52]. Con el Agent's Collector, la extensión añade la información de diagnóstico del Collector a un flare del Agent.

## Versiones de OpenTelemetry Collector {#opentelemetry-collector-versions}

Cada versión de DDOT incluye estas versiones de OpenTelemetry Collector:

| DDOT version | Beta version | Stable version |
|--------------|--------------|----------------|
| 7.85.x       | v0.159.0     | v1.65.0        |
| 7.84.x       | v0.159.0     | v1.65.0        |
| 7.83.x       | v0.158.0     | v1.64.0        |
| 7.82.x       | v0.155.0     | v1.61.0        |
| 7.81.x       | v0.154.0     | v1.60.0        |

{{% collapse-content title="Versiones anteriores" level="p" %}}

| DDOT version | Beta version | Stable version |
|--------------|--------------|----------------|
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

{{% /collapse-content %}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: /es/opentelemetry/setup/ddot_collector/custom_components
[11]: https://github.com/DataDog/datadog-agent/blob/7.85.3/comp/otelcol/collector-contrib/impl/manifest.yaml
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
[53]: /es/containers/kubernetes/tag/?tab=datadogoperator#out-of-the-box-tags
[54]: /es/getting_started/tagging/unified_service_tagging/?tab=kubernetes
[55]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/loadbalancingexporter/README.md
[56]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/routingconnector/README.md
[57]: /es/opentelemetry/compatibility/#support-levels
[58]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/dockerstatsreceiver/README.md
[59]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/k8sobjectsreceiver/README.md
[60]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/kubeletstatsreceiver/README.md
[61]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/podmanreceiver/README.md
[62]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/datadogextension/README.md
[63]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/storage/filestorage/README.md
[64]: /es/opentelemetry/setup/agent/
[67]: /es/opentelemetry/instrument/dd_sdks/otlp_trace_export/
[68]: /es/opentelemetry/setup/collector_exporter/
[69]: /es/opentelemetry/setup/agent/#agents-collector
[70]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/k8sclusterreceiver/README.md
[71]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/countconnector/README.md
[72]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/k8sleaderelector/README.md
[73]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/httpcheckreceiver/README.md
[74]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/k8seventsreceiver/README.md
[75]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/kafkareceiver/README.md
[76]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/deltatorateprocessor/README.md