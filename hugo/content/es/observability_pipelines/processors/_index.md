---
aliases:
- /es/observability_pipelines/processors/tail_based_sampling/
description: Conozca los procesadores disponibles para el parseo, estructuración y
  enriquecimiento de registros, métricas y trazas en Observability Pipelines.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/rehydrate-archived-logs-with-observability-pipelines
  tag: Blog
  text: Rehidratar registros archivados en cualquier SIEM o proveedor de registros
    con Observability Pipelines
- link: https://www.datadoghq.com/blog/observability-pipelines-transform-and-enrich-logs/
  tag: blog
  text: Transforme y enriquezca sus registros con Datadog Observability Pipelines
title: Procesadores
---
## Descripción general {#overview}

<div class="alert alert-info">Los procesadores descritos en esta documentación son específicos para entornos de registro locales. Para el parseo, estructuración y enriquecimiento de registros basados en la nube, consulte la documentación de <a href="https://docs.datadoghq.com/logs/log_configuration/logs_to_metrics">Log Management</a>.</div>

Utilice los procesadores de Observability Pipelines para el parseo, estructuración y enriquecimiento de sus registros y métricas. Cuando crea una canalización en la interfaz de usuario, se agregan procesadores preseleccionados a su grupo de procesadores según la plantilla seleccionada. Puede agregar procesadores adicionales y eliminar cualquiera de los existentes según sus necesidades de procesamiento.

Los grupos de procesadores se ejecutan de arriba hacia abajo. El orden de los procesadores es importante porque los eventos son verificados por cada procesador, pero solo se procesan los eventos que coinciden con los filtros del procesador. Para modificar el orden de los procesadores, utilice el controlador de arrastre en la esquina superior izquierda del procesador que desea mover.

**Nota**: Para un lienzo de canalización, existe un límite de 25 grupos de procesadores y un total de 150 procesadores.

## Procesadores {#processors}

Estos son los procesadores disponibles:

{{< tabs >}}
{{% tab "Registros" %}}

- [Agregar procesador de variables de entorno][1]
- [Agregar procesador de nombre de host][2]
- [Procesador personalizado][3]
- [Procesador de deduplicación][4]
- [Procesador de edición de campos][5]
- [Procesador de tabla de enriquecimiento][6]
- [Procesador de filtro][7]
- [Procesador de generación de métricas][8]
- [Procesador Grok Parser][9]
- [Procesador Parse JSON][10]
- [Procesador Parse XML][11]
- [Procesador de cuota][12]
- [Procesador Reducir][13]
- [Procesador Remap to OCSF][14]
- [Procesador de muestreo][15]
- [Procesador Sensitive Data Scanner][16]
- [Dividir matriz][17]
- [Etiquetas][18]
- [Limitar][19]

[1]: /es/observability_pipelines/processors/add_environment_variables/
[2]: /es/observability_pipelines/processors/add_hostname/
[3]: /es/observability_pipelines/processors/custom_processor/
[4]: /es/observability_pipelines/processors/dedupe/
[5]: /es/observability_pipelines/processors/edit_fields/
[6]: /es/observability_pipelines/processors/enrichment_table/
[7]: /es/observability_pipelines/processors/filter/
[8]: /es/observability_pipelines/processors/generate_metrics/
[9]: /es/observability_pipelines/processors/grok_parser/
[10]: /es/observability_pipelines/processors/parse_json/
[11]: /es/observability_pipelines/processors/parse_xml/
[12]: /es/observability_pipelines/processors/quota/
[13]: /es/observability_pipelines/processors/reduce/
[14]: /es/observability_pipelines/processors/remap_ocsf/
[15]: /es/observability_pipelines/processors/sample/
[16]: /es/observability_pipelines/processors/sensitive_data_scanner/
[17]: /es/observability_pipelines/processors/split_array/
[18]: /es/observability_pipelines/processors/tags/
[19]: /es/observability_pipelines/processors/throttle/

{{% /tab %}}
{{% tab "Métricas" %}}

- [Agrupar][1]
- [Editar etiquetas][2]
- [Filtro][3]
- [Lista de permitir/bloquear etiquetas][4]
- [Control de cardinalidad de etiquetas][5]

[1]: /es/observability_pipelines/processors/aggregate/
[2]: /es/observability_pipelines/processors/edit_tags/
[3]: /es/observability_pipelines/processors/filter/
[4]: /es/observability_pipelines/processors/tag_allow_block_list/
[5]: /es/observability_pipelines/processors/tag_cardinality_control/

{{% /tab %}}
{{< /tabs >}}

## Grupos de procesadores {#processor-groups}

<div class="alert alert-info">La configuración de una canalización con grupos de procesadores solo está disponible para las versiones 2.7 y posteriores de Worker.</div>

{{< img src="observability_pipelines/processors/processor_groups.png" alt="Una canalización con una fuente Splunk HEC que envía registros a tres grupos de procesadores, cada uno con su propio filtro y procesadores, que luego envían registros a los destinos de Microsoft Sentinel y Splunk HEC." style="width:100%;" >}}

Puede organizar sus procesadores en grupos lógicos para ayudarle a administrarlos. Cada grupo de procesadores tiene un filtro de grupo para que esos procesadores solo se apliquen a eventos específicos. Por ejemplo, si desea que los procesadores de grupo solo procesen eventos provenientes de `vpc`, entonces utilice el filtro de grupo `source:vpc`. También puede agregar filtros para cada procesador individual.

Los grupos de procesadores y los procesadores dentro de cada grupo se ejecutan de arriba hacia abajo. El orden de los procesadores es importante porque los eventos son verificados por cada procesador, pero solo se procesan los eventos que coinciden con los filtros del procesador. Para cambiar el orden de los procesadores, utilice el controlador de arrastre en la esquina superior izquierda del procesador que desea mover.

**Nota**: Existe un límite de 25 grupos de procesadores por lienzo de canalización. Por ejemplo, en una canalización de envío doble con dos destinos, el número combinado de grupos de procesadores en ambos destinos no puede exceder 25. Puede tener los grupos en cualquier combinación, como 15 en un destino y 10 en el otro.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}