---
description: Envío de datos de OpenTelemetry al OpenTelemetry Collector y el Datadog
  Exporter
further_reading:
- link: /opentelemetry/setup/ddot_collector/install/
  tag: Documentación
  text: Instala el Datadog distribution of OpenTelemetry (DDOT) Collector (Recomendado)
- link: /opentelemetry/compatibility/
  tag: Documentación
  text: Compatibilidad de funciones
title: Instalación y configuración del OpenTelemetry Collector
---

## Información general

En esta página se proporcionan guías para instalar y configurar un OpenTelemetry Collector independiente para enviar datos de telemetría a Datadog.

Este método es el mejor para los usuarios que prefieren utilizar distribuciones del OpenTelemetry Collector de la comunidad de código abierto de OpenTelemetry o que requieren capacidades de procesamiento avanzadas no disponibles en otras configuraciones. Para la mayoría de los casos de uso, el [Datadog Distribution of OTel Collector (DDOT)][1] es el método recomendado.

## Configuración

Para empezar, instala el OpenTelemetry Collector y configúralo con el Datadog Exporter. Esta guía te indicará la configuración inicial necesaria antes de pasar a temas de configuración más específicos.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/collector_exporter/install" >}}
    <h3>Instala y configura el Collector</h3>
    Sigue los pasos de configuración inicial para obtener un Collector que se ejecuta con el Datadog Exporter.
    {{< /nextlink >}}
{{< /whatsnext >}}

## Configuración

Una vez que el Collector esté en funcionamiento, utiliza estas guías para configurar receptores y procesadores específicos para recopilar y enriquecer los datos de telemetría.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/collector_exporter/deploy" >}}
    <h3>Desplegar el Collector</h3>
    Aprende cómo ejecutar el Collector en varios entornos, incluido en un host, en Docker, o como un DaemonSet o Gateway en Kubernetes.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/config/hostname_tagging" >}}
    <h3>Configurar el nombre de host y el etiquetado</h3>
    Usa la detección de recursos y los procesadores de atributos de Kubernetes para asegurar la resolución correcta de nombres de host y aplicar las etiquetas críticas para correlacionar la telemetría en Datadog.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/config/log_collection" >}}
    <h3>Configurar la recopilación de logs</h3>
    Configura el receptor de logs de archivo para recopilar logs desde archivos y reenviarlos a Datadog, lo que admite los logs, métricas y trazas unificados.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/config/otlp_receiver" >}}
    <h3>Permitir un receptor OTLP</h3>
    Configura el receptor OTLP para aceptar trazas, métricas y logs desde tus aplicaciones instrumentadas por OpenTelemetry mediante gRPC o HTTP.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/config/collector_batch_memory" >}}
    <h3>Ajustar la configuración de lotes y memoria</h3>
    Optimiza el rendimiento y el consumo de recursos de tu Collector al configurar el procesador de lotes y el delimitador de memoria.
    {{< /nextlink >}}
{{< /whatsnext >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/opentelemetry/setup/ddot_collector/install/