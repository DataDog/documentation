---
further_reading:
- link: https://opentelemetry.io/docs/collector/management/
  tag: Sitio externo
  text: Gestión de OpenTelemetry Collector
- link: https://opentelemetry.io/docs/collector/configuration/
  tag: Sitio externo
  text: Configuración de OpenTelemetry Collector
title: Configuración
---

## Configuración de OpenTelemetry Collector

Para saber más sobre la configuración de Collector, lee la documentación de [Configuración de OpenTelemetry Collector][3].

## Configuración del Exportador de Datadog predefinida

Puedes encontrar ejemplos de configuración predefinida para el Exportador de Datadog en la [carpeta`exporter/datadogexporter/examples`][5] en el proyecto OpenTelemetry Collector Contrib. Ve el archivo de ejemplo completo de configuración, [`ootb-ec2.yaml`][4]. Configura cada uno de los siguientes componentes para adaptarse a tus necesidades:

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/collector_exporter/otlp_receiver/" >}}Receptor OTLP{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/collector_exporter/hostname_tagging/" >}}Nombre de host y etiquetas{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/collector_exporter/collector_batch_memory/" >}}Configuración de lote y memoria{{< /nextlink >}}
{{< /whatsnext >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[3]: https://opentelemetry.io/docs/collector/configuration/
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/ootb-ec2.yaml
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/