---
further_reading:
- link: https://www.datadoghq.com/blog/datadog-agent-with-otel-collector/
  tag: Blog
  text: Unificar OpenTelemetry y Datadog con el OTel Collector integrado en el Agent
private: true
title: Datadog Agent con collector integrado
---

{{< callout url="https://www.datadoghq.com/private-beta/agent-with-embedded-opentelemetry-collector/" btn_hidden="false" header="¡Únete a la versión preliminar!">}}
  El Datadog Agent con el OpenTelemetry Collector integrado se encuentra en versión preliminar. Para solicitar acceso, completa este formulario.
{{< /callout >}} 

## Información general

El Datadog Agent con el OpenTelemetry (OTel) Collector integrado es una solución de código abierto que combina la flexibilidad de OpenTelemetry con las capacidades integrales de observación de Datadog. Esta solución integrada incluye:

- Un conjunto seleccionado de [componentes OpenTelemetry](#included-components) optimizados para el rendimiento y la confiabilidad con Datadog, con la capacidad de añadir componentes adicionales de tu elección.
- Capacidades completas de recopilación y procesamiento de datos del Datadog Agent para una integración perfecta y una monitorización sólida, incluido el soporte de [Datadog Fleet Automation][9] para el OTel Collector integrado (consulta [Beneficios clave](#key-benefits)).
- [Componentes Datadog personalizados](#custom-datadog-components) diseñados para brindar la mejor experiencia de incorporación.

{{< img src="/opentelemetry/embedded_collector/architecture2.png" alt="Información general de la arquitectura del collector integrado en el Datadog Agent." style="width:100%;" >}}

## Beneficios clave

El Datadog Agent con el OpenTelemetry Collector integrado ofrece:

### Observabilidad global

- Accede a las {{< translate key="integration_count" >}} integraciones de Datadog, [Live Container Monitoring][3], [Cloud Network Monitoring][7] y [Universal Service Monitoring][5] (con eBPF) y más
- Aprovecha las integraciones aportadas por la comunidad de OpenTelemetry para recopilar telemetría en el formato nativo del Protocolo OpenTelemetry (OTLP)
- Controla tus datos del OTLP con las capacidades de procesamiento y enrutamiento del collector

### Gestión simplificada de flotas

- Gestiona de forma remota flotas de OpenTelemetry Collectors integrados con [Datadog Fleet Automation][9]
- Obtén visibilidad de toda tu configuración, dependencias y entorno de ejecución
- Agiliza la incorporación con enriquecimiento de etiquetado listo para usar para datos de OTLP, lo que habilita automáticamente el [etiquetado de servicio unificado][1]

### Fiabilidad y recursos de la empresa

- Benefíciate de las sólidas prácticas de seguridad de Datadog, que incluyen exploraciones y análisis periódicos de vulnerabilidades
- Accede al equipo de soporte global de Datadog para obtener ayuda con la incorporación y la solución de problemas

## Componentes incluidos

### Componentes del OpenTelemetry Collector 

De forma predeterminada, el Datadog Agent con collector integrado se entrega con los siguientes componentes del collector. También puedes ver la lista en [formato YAML][11].

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
- [routingprocessor][35]
- [tailsamplingprocessor][36]
- [transformprocessor][37]

{{% /collapse-content %}}

{{% collapse-content title="Exportadores" level="p" %}}

- [datadogexporter][38]
- [debugexporter][39]
- [otlpexporter][40]
- [otlphttpexporter][41]
- [sapmexporter][42]
- [nopexporter][43]

{{% /collapse-content %}}

{{% collapse-content title="Conectores" level="p" %}}

- [datadogconnector][44]
- [spanmetricsconnector][45]

{{% /collapse-content %}}

{{% collapse-content title="Extensiones" level="p" %}}

- [healthcheckextension][46]
- [observer][47]
- [pprofextension][48]
- [zpagesextension][49]

{{% /collapse-content %}}

### Componentes personalizados de Datadog 

Además de los componentes estándar de OpenTelemetry, Datadog proporciona y mantiene los siguientes componentes personalizados:

{{% collapse-content title="Componentes de Datadog" level="p" %}}

- [Infrastructure Attribute Processor][50]: un componente del procesador de OpenTelemetry que asigna automáticamente [etiquetas de Kubernetes][53] a la telemetría de OTLP (métricas, traces [trazas] y logs) emitida por un pod o un contenedor individual dentro de un pod. Este componente permite el [etiquetado de servicios unificado][54] y la correlación de telemetría para monitorizar entornos de Kubernetes.

- [Converter][51]: un componente convertor de OpenTelemetry que mejora las configuraciones proporcionadas por el usuario. Ofrece una API para devolver tanto las configuraciones originales como las mejoradas, y verifica automáticamente las configuraciones incorrectas conocidas para reducir los errores. Esto garantiza una integración perfecta de las configuraciones existentes del OpenTelemetry Collector con el Agent.

- [DD Flare Extension][52]: un componente de extensión de OpenTelemetry para generar Agent Flare, que contiene información de diagnóstico tanto del OTel Collector integrado como del Agent para fines de solución de problemas.

{{% /collapse-content %}}

## Para empezar

Ya sea que seas nuevo en Datadog o ya esté familiarizado con OpenTelemetry, las siguientes guías te ayudarán a comenzar según tu situación específica.

### Inicio rápido con el paquete del Agent predeterminado

El paquete del Datadog Agent predeterminado incluye un collector integrado con un [conjunto seleccionado de componentes de OpenTelemetry incluidos](#included-components) diseñado para satisfacer la mayoría de las necesidades de forma inmediata. Esta guía es adecuada si:

- Configuras la monitorización desde cero sin necesidad de componentes de OpenTelemetry fuera de los [componentes incluidos](#included-components)
- Usas el Datadog Agent y deseas probar la funcionalidad de OpenTelemetry con los componentes incluidos
- Pasas del OpenTelemetry Collector al Datadog Agent sin requerir componentes más allá de los incluidos de manera predeterminada
- (Opcional) Si necesitas componentes de OpenTelemetry más allá de los que se proporcionan en el paquete predeterminado, sigue las instrucciones de [Usar componentes personalizados de OpenTelemetry][2] para incorporar componentes de OTel y ampliar las capacidades del Datadog Agent.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/agent/install_agent_with_collector" >}}Inicio rápido con el paquete predeterminado del Agent{{< /nextlink >}}
{{< /whatsnext >}}

### Migrar del OpenTelemetry Collector al Datadog Agent

Esta guía te ayuda a migrar desde una configuración existente de OpenTelemetry Collector al Datadog Agent, incluidos los escenarios en los que necesitas componentes adicionales de OpenTelemetry. Esta guía es adecuada si:

- Haces la transición desde el OpenTelemetry Collector conservando tu configuración actual
- Migrar tus configuraciones existentes de OpenTelemetry para mantener la continuidad
- (Opcional) Si necesitas componentes de OpenTelemetry más allá de los que se proporcionan en el paquete predeterminado, sigue las instrucciones de [Usar componentes personalizados de OpenTelemetry][2] para incorporar componentes de OTel y ampliar las capacidades del Datadog Agent.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/agent/migration" >}}Migrar del OpenTelemetry Collector al Datadog Agent{{< /nextlink >}}
{{< /whatsnext >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/unified_service_tagging/
[2]: /es/opentelemetry/agent/agent_with_custom_components
[3]: /es/containers/
[4]: /es/sensitive_data_scanner/
[5]: /es/universal_service_monitoring/
[7]: /es/network_monitoring/cloud_network_monitoring/
[9]: /es/agent/fleet_automation/
[11]: https://github.com/DataDog/datadog-agent/blob/386130a34dde43035c814f9a9b08bc72eb20e476/comp/otelcol/collector-contrib/impl/manifest.yaml
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
[35]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/routingprocessor
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