---
aliases:
- /es/opentelemetry/agent/
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
title: Distribución de Datadog del Collector de OpenTelemetry
---
{{< callout url="https://www.datadoghq.com/product-preview/remote-configuration-for-datadogs-distribution-of-opentelemetry-collector-ddot/" >}}
La Remote Configuration para el DDOT Collector está <strong>en versión preliminar</strong>. Utilice este formulario para solicitar acceso.
{{< /callout >}}

## Descripción general {#overview}

La distribución de Datadog del Collector de OpenTelemetry (DDOT) es una solución de código abierto que combina la flexibilidad de OpenTelemetry (OTel) con las capacidades integrales de observabilidad de Datadog. Esta solución integrada incluye:

- Un conjunto seleccionado de [componentes de OpenTelemetry](#included-components) optimizados para el rendimiento y la confiabilidad con Datadog, con la capacidad de agregar componentes adicionales de su elección
- Capacidades completas de recopilación y procesamiento de datos del Datadog Agent para una integración fluida y un seguimiento robusto, incluido el soporte de [Datadog Fleet Automation][9] para el DDOT Collector (consulte [Beneficios clave](#key-benefits))
- [Componentes personalizados de Datadog](#custom-datadog-components) diseñados para ofrecer la mejor experiencia de incorporación

{{< img src="/opentelemetry/setup/ddot-collector-2.png" alt="Descripción general de la arquitectura del DDOT Collector, el cual está integrado en el Datadog Agent." style="width:100%;" >}}

## Beneficios clave {#key-benefits}

El DDOT Collector ofrece:

### Observabilidad integral {#comprehensive-observability}

- Acceso {{< translate key="integration_count" >}} Integraciones de Datadog, [Live Container Monitoring][3], [Cloud Network Monitoring][7] y [Universal Service Monitoring][5] (con eBPF) y más
- Aproveche las integraciones aportadas por la comunidad de OpenTelemetry para recopilar telemetría en formato nativo de OpenTelemetry Protocol (OTLP)
- Controle sus datos OTLP con las capacidades de procesamiento y enrutamiento del Collector

### Gestión de flotas simplificada {#simplified-fleet-management}

- Gestione de forma remota flotas de DDOT Collectors con [Datadog Fleet Automation][9]
- Obtenga visibilidad de toda su configuración, dependencias y entorno de ejecución
- Incorpórese más rápido con el enriquecimiento de etiquetas listo para usar para datos OTLP, habilitando automáticamente [unified service tagging][1]

### Confiabilidad y recursos empresariales {#enterprise-reliability-and-resources}

- Benefíciese de las sólidas prácticas de seguridad de Datadog, que incluyen análisis y escaneos de vulnerabilidades periódicos
- Acceda al equipo de soporte global de Datadog para obtener asistencia con la incorporación y la resolución de problemas

## Componentes incluidos {#included-components}

<div class="alert alert-info">
  <strong>¿Necesita componentes adicionales de OpenTelemetry?</strong> Si necesita componentes más allá de los incluidos en el paquete predeterminado, siga <a href="/opentelemetry/setup/ddot_collector/custom_components">Use Custom OpenTelemetry Components</a> para extender las capacidades del Datadog Agent. Para obtener una lista de los componentes incluidos de forma predeterminada, consulte la siguiente sección <a href="#opentelemetry-collector-components">OpenTelemetry Collector components</a>.
</div>

### OpenTelemetry Collector versions {#opentelemetry-collector-versions}

La siguiente tabla muestra qué versiones de OpenTelemetry Collector se incluyen en cada versión de DDOT:

| DDOT version | Beta version | Stable version |
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

### Support levels {#support-levels}

Para obtener detalles sobre el soporte de Datadog, de la comunidad y de componentes personalizados, consulte [Support levels][57] en la página de Compatibilidad.

### OpenTelemetry Collector components {#opentelemetry-collector-components}

De forma predeterminada, el DDOT Collector se entrega con los siguientes componentes de Collector. También puede ver la lista en [YAML format][11].

{{% collapse-content title="Receptores" level="p" %}}

- [dockerstatsreceiver][58] (disponible desde la versión 7.56.0)
- [filelogreceiver][16]
- [fluentforwardreceiver][17]
- [hostmetricsreceiver][18]
- [jaegerreceiver][19]
- [k8sobjectsreceiver][59] (disponible desde la versión 7.56.0)
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
- [filterprocessor][28]
- [groupbyattributeprocessor][29]
- [k8sattributesprocessor][30]
- [memorylimiterprocessor][31]
- [probabilisticsamplerprocessor][32]
- [resourcedetectionprocessor][33]
- [resourceprocessor][34]
- routingprocessor (obsoleto y eliminado en la v7.71.0; utilice el [routingconnector][56] en su lugar)
- [tailsamplingprocessor][36]
- [transformprocessor][37]

{{% /collapse-content %}}

{{% collapse-content title="Exportadores" level="p" %}}

- [datadogexporter][38]
- [debugexporter][39]
- [loadbalancingexporter][55]
- [otlpexporter][40]
- [otlphttpexporter][41]
- [sapmexporter][42]
- [nopexporter][43]

{{% /collapse-content %}}

{{% collapse-content title="Conectores" level="p" %}}

- [datadogconnector][44]
- [routingconnector][56] (disponible desde la versión 7.68.0)
- [spanmetricsconnector][45]

{{% /collapse-content %}}

{{% collapse-content title="Extensiones" level="p" %}}

- [datadogextension][62] (disponible desde la versión 7.72.0)
- [healthcheckextension][46]
- [observer][47]
- [pprofextension][48]
- [storage/filestorage][63] (disponible desde la versión 7.56.0)
- [zpagesextension][49]

{{% /collapse-content %}}

### Componentes personalizados de Datadog {#custom-datadog-components}

Además de los componentes estándar de OpenTelemetry, Datadog proporciona y mantiene los siguientes componentes personalizados:

{{% collapse-content title="Componentes de Datadog" level="p" %}}

- [Infrastructure Attribute Processor][50]: Un componente procesador de OpenTelemetry que asigna automáticamente [etiquetas de Kubernetes][53] a la telemetría OTLP (métricas, trazas y registros) emitida por un pod o un contenedor individual dentro de un pod. Este componente permite [unified service tagging][54] y la correlación de telemetría para hacer un seguimiento de los entornos de Kubernetes.

- [Converter][51]: Un componente convertidor de OpenTelemetry que mejora las configuraciones proporcionadas por el usuario. Ofrece una API para devolver tanto las configuraciones originales como las mejoradas, verificando automáticamente si existen configuraciones incorrectas conocidas para reducir errores. Esto garantiza una integración perfecta de las configuraciones existentes de OpenTelemetry Collector con el Agent.

- [DD Flare Extension][52]: Un componente de extensión de OpenTelemetry para generar Agent Flare, que contiene información de diagnóstico tanto del DDOT Collector como del Agent para fines de solución de problemas.

{{% /collapse-content %}}

## Comience {#get-started}

Ya sea que usted sea nuevo en Datadog o que ya esté familiarizado con OpenTelemetry, las siguientes guías le ayudan a comenzar de acuerdo con su situación específica.

### Inicio rápido con el paquete del Agent predeterminado {#quick-start-with-the-default-agent-package}

El paquete del Datadog Agent predeterminado incluye un DDOT Collector con un [conjunto seleccionado de componentes de OpenTelemetry incluidos](#included-components) diseñado para satisfacer la mayoría de las necesidades de forma inmediata. Esta guía es adecuada si usted:

- Está configurando el seguimiento desde cero sin necesitar componentes de OpenTelemetry fuera de los [componentes incluidos](#included-components)
- Está usando el Datadog Agent y desea probar la funcionalidad de OpenTelemetry con los componentes incluidos
- Está realizando la transición del OpenTelemetry Collector al Datadog Agent sin requerir componentes más allá de los incluidos de forma predeterminada
- (Opcional) Si necesita componentes de OpenTelemetry más allá de lo que se proporciona en el paquete predeterminado, siga [Use Custom OpenTelemetry Components][2] para ampliar las capacidades de Datadog Agent.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/install/kubernetes" >}}Inicio rápido con el paquete Agent predeterminado{{< /nextlink >}}
{{< /whatsnext >}}

### Migrar del OpenTelemetry Collector a Datadog Agent {#migrate-from-opentelemetry-collector-to-datadog-agent}

Esta guía le ayuda a migrar de una configuración existente de OpenTelemetry Collector a Datadog Agent, incluyendo escenarios donde necesita componentes adicionales de OpenTelemetry. Esta guía es adecuada si usted:

- Realizar la transición del OpenTelemetry Collector mientras conserva su configuración existente
- Migrar sus configuraciones existentes de OpenTelemetry para mantener la continuidad
- (Opcional) Si necesita componentes de OpenTelemetry más allá de lo que se proporciona en el paquete predeterminado, siga [Use Custom OpenTelemetry Components][2] para ampliar las capacidades de Datadog Agent

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/guide/migrate/ddot_collector" >}}Migrar de OpenTelemetry Collector a Datadog Agent{{< /nextlink >}}
{{< /whatsnext >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/unified_service_tagging/
[2]: /es/opentelemetry/setup/ddot_collector/custom_components
[3]: /es/containers/
[4]: /es/security/sensitive_data_scanner/
[5]: /es/universal_service_monitoring/
[7]: /es/network_monitoring/cloud_network_monitoring/
[9]: /es/agent/fleet_automation/
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