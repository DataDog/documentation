---
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/observability-pipelines-transform-and-enrich-logs/
  tag: Blog
  text: Transformar y enriquecer tus logs con Datadog Observability Pipelines
title: Procesadores
---

## Información general

Utiliza los procesadores de Observability Pipelines para analizar, estructurar y enriquecer tus logs. Todos los procesadores están disponibles para todas las plantillas. Configura tus procesadores en la interfaz de usuario de Observability Pipelines después de haber seleccionado una plantilla, una fuente y unos destinos. Este es el paso 5 del proceso de configuración del pipeline:

1. Navega hasta [Observability Pipelines][1].
1. Selecciona una plantilla.
1. Selecciona y configura tu fuente.
1. Selecciona y configura tus destinos.
1. Configura tus procesadores.
1. Instala el worker de Observability Pipelines.
1. Habilita monitores para tu pipeline.

{{% observability_pipelines/processors/intro %}}

{{% observability_pipelines/processors/filter_syntax %}}

#### Selecciona un procesador para obtener más información:

{{< whatsnext desc=" " >}}
    {{< nextlink href="observability_pipelines/processors/add_environment_variables" >}}Añadir variables de entorno{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/add_hostname" >}}Añadir nombre de host{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/dedupe" >}}Deduplicar{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/edit_fields" >}}Editar campos{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/enrichment_table" >}}Tabla de enriquecimiento{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/filter" >}}Filtro{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/generate_metrics" >}}Generar métricas{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/grok_parser" >}}Grok parser{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/parse_json" >}}Procesar JSON{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/quota" >}}Cuota{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/reduce" >}}Reducir{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/sample" >}}Muestra{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/remap_ocsf" >}}Reasignar a OCSF{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/sensitive_data_scanner" >}}Sensitive Data Scanner{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://app.datadoghq.com/observability-pipelines

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}