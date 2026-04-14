---
further_reading:
- link: /service_management/events/
  tag: Documentación
  text: Gestión de eventos
- link: /service_management/events/correlation/
  tag: Documentación
  text: Correlación de eventos
title: Pipelines y procesadores
---

## Información general

Los pipelines de Datadog Event Management te permiten procesar y gestionar eventos de varios orígenes de manera eficiente. Con los pipelines, puedes aplicar varias reglas de procesamiento y filtros para personalizar la forma en que se gestionan los eventos. Los pipelines facilitan la gestión de grandes volúmenes de eventos entrantes de manera estructurada. 

Usa pipelines para:
- **Enriquecer eventos**: los pipelines pueden añadir contexto o información adicional a los eventos, como etiquetado, añadir atributos personalizados o correlacionarlos con metadatos relevantes para hacerlos más informativos y prácticos.
- **Normalizar etiquetas de eventos**: puedes configurar reglas para reasignar etiquetas (tags) de modo que todos tus eventos tengan etiquetas estandarizadas.
- **Analizar mensajes y atributos como etiquetas**: crea reglas de Grok personalizadas para analizar el mensaje completo o un atributo específico de tu evento sin procesar. Traduce el contexto en etiquetas y atributos rastreables a los que se pueda hacer referencia durante la investigación.

Los pipelines de Datadog Event Management ayudan a las organizaciones a simplificar sus procesos de monitorización, mejorar la claridad de sus conocimientos operativos y, en última instancia, responder de manera más efectiva a incidencias y alertas.

## Cómo funciona

Con los pipelines, los eventos se analizan y enriquecen al encadenarlos de manera secuencial a través de procesadores. Esto extrae información significativa o atributos de texto semiestructurado. Cada evento que pasa por los pipelines se prueba con todos los filtros de pipelines. Si coincide con un filtro, todos los procesadores se aplican de manera secuencial antes de pasar al siguiente pipeline.

Los pipelines y procesadores se pueden aplicar a todos los eventos y se pueden configurar en [Pipelines de Event Management][1].

## Crear un pipeline

Crea un pipeline para filtrar los eventos que te interesen, por ejemplo, un origen o una etiqueta. 

1. Ve a [Pipelines de Event Management][1] en Datadog.
1. Haz clic en **Add a Pipeline** (Añadir un pipeline).
1. Elige un filtro del menú desplegable o crea tu propia consulta de filtro en el [explorador de Event Management][2] al seleccionar el icono `</>`. Usa el filtro para aplicar procesadores de pipeline a eventos específicos. **Nota**: El filtrado de pipelines se aplica antes que cualquiera de los procesadores del pipeline. No puedes filtrar un atributo que se extrae en el propio pipeline.
1. Asigna un nombre al pipeline.
1. Haz clic en **Create** (Crear).

## Añadir un procesador

Puedes añadir procesadores después de crear un pipeline. Los procesadores disponibles son:

- [Aggregation Key Processor][3]
- [Procesador aritmético][4]
- [Reasignador de fechas][5]
- [Procesador de categorías][6]
- [Grok Parser][7]
- [Procesador de búsqueda][8]
- [Reasignador][9]
- [Reasignador de servicios][10]
- [Reasignador de estados][11]
- [Procesador de generación de cadenas][12]


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/event/pipelines
[2]: https://app.datadoghq.com/event/explorer
[3]: /es/service_management/events/pipelines_and_processors/aggregation_key
[4]: /es/service_management/events/pipelines_and_processors/arithmetic_processor
[5]: /es/service_management/events/pipelines_and_processors/date_remapper
[6]: /es/service_management/events/pipelines_and_processors/category_processor
[7]: /es/service_management/events/pipelines_and_processors/grok_parser
[8]: /es/service_management/events/pipelines_and_processors/lookup_processor
[9]: /es/service_management/events/pipelines_and_processors/remapper
[10]: /es/service_management/events/pipelines_and_processors/service_remapper
[11]: /es/service_management/events/pipelines_and_processors/status_remapper
[12]: /es/service_management/events/pipelines_and_processors/string_builder_processor