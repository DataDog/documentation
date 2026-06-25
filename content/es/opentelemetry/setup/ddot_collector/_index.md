---
aliases:
- /es/opentelemetry/agent/
further_reading:
- link: https://www.datadoghq.com/blog/llm-otel-semantic-convention
  tag: Blog
  text: Datadog Agent Observability admite de manera nativa las Convenciones Semánticas
    de OpenTelemetry GenAI
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: Blog
  text: Centraliza y gobierna tu canalización de OpenTelemetry con la puerta de enlace
    DDOT
- link: https://www.datadoghq.com/blog/datadog-distribution-otel-collector/
  tag: Blog
  text: Unifica OpenTelemetry y Datadog con el Colector DDOT
- link: https://learn.datadoghq.com/courses/using-ddot
  tag: Centro de Aprendizaje
  text: Uso de la Distribución de Datadog del Colector de OpenTelemetry
title: Distribución de Datadog del Colector de OpenTelemetry
---
{{< callout btn_hidden="true" >}}
El Colector DDOT para Kubernetes está <strong>Generalmente Disponible</strong>. Puedes comenzar siguiendo las <a href="#get-started">instrucciones a continuación</a>.
<br><br>
Desplegar el Colector DDOT en hosts bare-metal y máquinas virtuales basadas en Linux está <strong>en Vista Previa</strong>. Para comenzar, sigue la <a href="/opentelemetry/setup/ddot_collector/install/linux">documentación de Linux</a>.
{{< /callout >}}

## Descripción General {#overview}

La distribución de Datadog del Colector de OpenTelemetry (DDOT) es una solución de código abierto que combina la flexibilidad de OpenTelemetry (OTel) con las capacidades de observabilidad integrales de Datadog. Esta solución integrada incluye:

- Un conjunto curado de [componentes de OpenTelemetry](#included-components) optimizados para rendimiento y confiabilidad con Datadog, con la capacidad de agregar componentes adicionales de tu elección
- Capacidades completas de recolección y procesamiento de datos del Agente de Datadog para una integración fluida y un monitoreo robusto, incluyendo soporte de [Automatización de Flota de Datadog][9] para el Colector DDOT (ver [Beneficios Clave](#key-benefits))
- [Componentes personalizados de Datadog](#custom-datadog-components) diseñados para ofrecer la mejor experiencia de incorporación

{{< img src="/opentelemetry/setup/ddot-collector-2.png" alt="Descripción general de la arquitectura para el Colector DDOT, que está integrado en el Agente de Datadog." style="width:100%;" >}}

## Beneficios Clave {#key-benefits}

El Colector DDOT ofrece:

### Observabilidad integral {#comprehensive-observability}

- Acceso {{< translate key="integration_count" >}} Integraciones de Datadog, [Live Container Monitoring][3], [Cloud Network Monitoring][7], y [Universal Service Monitoring][5] (con eBPF) y más
- Aproveche las integraciones contribuidas por la comunidad de OpenTelemetry para recopilar telemetría en formato nativo del Protocolo OpenTelemetry (OTLP)
- Controle sus datos OTLP con las capacidades de procesamiento y enrutamiento del Colector

### Gestión de flotas simplificada {#simplified-fleet-management}

- Administre remotamente flotas de Colectores DDOT con [Fleet Automation][9]
- Obtenga visibilidad de toda su configuración, dependencias y entorno de ejecución
- Incorpórese más rápido con el enriquecimiento de etiquetado preconfigurado para datos OTLP, habilitando automáticamente [unified service tagging][1]

### Confiabilidad y recursos empresariales {#enterprise-reliability-and-resources}

- Benefíciese de las sólidas prácticas de seguridad de Datadog, que incluyen escaneos de vulnerabilidades y análisis regulares
- Acceda al equipo de soporte global de Datadog para asistencia con la incorporación y solución de problemas

## Componentes incluidos {#included-components}

<div class="alert alert-info">
  <strong>¿Necesita componentes adicionales de OpenTelemetry?</strong> Si necesita componentes más allá de los incluidos en el paquete predeterminado, siga <a href="/opentelemetry/setup/ddot_collector/custom_components">Use Custom OpenTelemetry Components</a> para extender las capacidades del Agente de Datadog. Para una lista de componentes incluidos por defecto, consulte la siguiente sección <a href="#opentelemetry-collector-components">OpenTelemetry Collector components</a>.
</div>

### Versiones del OpenTelemetry Collector {#opentelemetry-collector-versions}

La siguiente tabla muestra qué versiones del OpenTelemetry Collector están incluidas en cada lanzamiento de DDOT:

| Versión de DDOT | Versión Beta | Versión Estable |
|---|---|---|
| 7.78.0 | v0.147.0 | v1.53.0 |
| 7.77.0 | v0.145.0 | v1.51.1-0.20260205185216-81bc641f26c0 |
| 7.76.0 | v0.144.0 | v1.50.0 |
| 7.75.0 | v0.142.0 | v1.48.0 |
| 7.74.0 | v0.140.0 | v1.46.0 |
| 7.73.0 | v0.138.0 | v1.44.0 |
| 7.72.0 | v0.136.0 | v1.42.0 |
| 7.71.0 | v0.133.0 | v1.39.0 |
| 7.70.0 | v0.131.0 | v1.37.0 |
| 7.69.0 | v0.129.0 | v1.35.0 |

### Niveles de soporte {#support-levels}

Para detalles sobre el soporte de Datadog, la comunidad y componentes personalizados, consulte [Niveles de soporte][57] en la página de Compatibilidad.

### Componentes del OpenTelemetry Collector {#opentelemetry-collector-components}

Por defecto, el DDOT Collector se envía con los siguientes componentes. También puede ver la lista en [formato YAML][11].

{{% collapse-content title="Receptores" level="p" %}}

- [filelogreceiver][16]
- [fluentforwardreceiver][17]
- [hostmetricsreceiver][18]
- [jaegerreceiver][19]
- [otlpreceiver][20]
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
- routingprocessor (obsoleto y eliminado en v7.71.0; use el [routingconnector][56] en su lugar)
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

- [healthcheckextension][46]
- [observer][47]
- [pprofextension][48]
- [zpagesextension][49]

{{% /collapse-content %}}

### Custom Datadog components {#custom-datadog-components}

Además de los componentes estándar de OpenTelemetry, Datadog proporciona y mantiene los siguientes componentes personalizados:

{{% collapse-content title="Componentes de Datadog" level="p" %}}

- [Infrastructure Attribute Processor][50]: Un componente de OpenTelemetry que asigna automáticamente [Kubernetes tags][53] a la telemetría OTLP (métricas, trazas y registros) emitida por un pod o un contenedor individual dentro de un pod. Este componente permite [unified service tagging][54] y la correlación de telemetría para monitorear entornos de Kubernetes.

- [Converter][51]: Un componente convertidor de OpenTelemetry que mejora las configuraciones proporcionadas por el usuario. Ofrece una API para devolver tanto las configuraciones originales como las mejoradas, verificando automáticamente configuraciones incorrectas conocidas para reducir errores. Esto asegura una integración fluida de las configuraciones existentes del OpenTelemetry Collector con el Agent.

- [DD Flare Extension][52]: Un componente de extensión de OpenTelemetry para generar Agent Flare, que contiene información diagnóstica tanto del Collector DDOT como del Agent para solucionar problemas.

{{% /collapse-content %}}

## Comenzar {#get-started}

Ya sea que seas nuevo en Datadog o ya estés familiarizado con OpenTelemetry, las siguientes guías te ayudarán a comenzar según tu situación específica.

### Inicio rápido con el paquete predeterminado del Agent {#quick-start-with-the-default-agent-package}

El paquete predeterminado del Agent de Datadog incluye un Collector DDOT con un [conjunto curado de componentes de OpenTelemetry incluidos](#included-components) diseñados para satisfacer la mayoría de las necesidades desde el primer momento. Esta guía es adecuada si estás:

- Configurando seguimiento desde cero sin necesidad de componentes de OpenTelemetry fuera de los [componentes incluidos](#included-components)
- Usando el Agent de Datadog y deseas probar la funcionalidad de OpenTelemetry con los componentes incluidos
- Transicionando de OpenTelemetry Collector al Agent de Datadog sin requerir componentes más allá de los incluidos por defecto
- (Opcional) Si necesitas componentes de OpenTelemetry más allá de lo que se proporciona en el paquete predeterminado, sigue [Usar Componentes Personalizados de OpenTelemetry][2] para extender las capacidades del Agent de Datadog.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/install/kubernetes" >}}Inicio rápido con el paquete predeterminado del Agent{{< /nextlink >}}
{{< /whatsnext >}}

### Migrar de OpenTelemetry Collector al Agent de Datadog {#migrate-from-opentelemetry-collector-to-datadog-agent}

Esta guía te ayuda a migrar de una configuración existente de OpenTelemetry Collector al Agent de Datadog, incluyendo escenarios donde necesitas componentes adicionales de OpenTelemetry. Esta guía es adecuada si estás:

- Transicionando de OpenTelemetry Collector mientras se preserva tu configuración existente
- Migrando tus configuraciones de OpenTelemetry existentes para mantener la continuidad
- (Opcional) Si necesitas componentes de OpenTelemetry más allá de lo que se proporciona en el paquete predeterminado, sigue [Usar Componentes Personalizados de OpenTelemetry][2] para extender las capacidades del Agent de Datadog

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/guide/migrate/ddot_collector" >}}Migrar del OpenTelemetry Collector al Agent de Datadog{{< /nextlink >}}
{{< /whatsnext >}}

## Lectura adicional {#further-reading}

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