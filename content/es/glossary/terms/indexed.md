---
core_product:
- log management
- apm
title: indexado
---
Los logs indexados son [logs][1] que se han recopilado, procesado y conservado para análisis, alertas y solución de problemas.

Los tramos (spans) indexados representan [tramos][2] indexados por un [filtro de retención][3] almacenado en Datadog durante 15 días que se puede utilizar para buscar, consultar y monitorizar en [tramos de búsqueda][4] mediante las [etiquetas][5] (tags) incluidas en el tramo.

<div class="alert alert-info">
La creación de <a href="/tracing/trace_pipeline/trace_retention/">filtros de retención basados en etiquetas</a> después de la ingesta permite controlar y visualizar de manera exacta cuántos tramos se indexan por servicio.
</div>

{{< img src="tracing/visualization/span_tag.png" alt="etiqueta de tramo" style="width:80%" >}}

En este ejemplo, las solicitudes (`merchant.store_name` y `merchant.tier`) se han añadido como etiquetas al tramo.

Para comenzar a etiquetar tramos en tu aplicación, consulta la guía de [Añadir etiquetas de tramos][6].

Una vez que se haya añadido una etiqueta a un tramo, busca y consulta la etiqueta en Analytics al hacer clic en la etiqueta para añadirla como [faceta][7]. Una vez hecho esto, el valor de esta etiqueta se almacena para todas las trazas nuevas y se puede utilizar en la barra de búsqueda, el panel de facetas y la consulta de la gráfica de trazas.

{{< img src="tracing/app_analytics/search/create_facet.png" style="width:50%;" alt="Crear una faceta" style="width:50%;">}}

[1]: /es/logs/
[2]: /es/glossary/#span
[3]: /es/glossary/#retention-filter
[4]: /es/tracing/trace_explorer/search
[5]: /es/getting_started/tagging
[6]: /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[7]: /es/glossary/#facet