---
aliases:
- /es/service_management/events/pipelines_and_processors/
description: Aprenda a usar las Pipelines de Event Management para procesar y enriquecer
  eventos de diversas fuentes con procesadores.
further_reading:
- link: /events/
  tag: Documentación
  text: Event Management
- link: /events/correlation/
  tag: Documentación
  text: Correlación de eventos
title: Canalizaciones y pipelines
---
## Descripción general {#overview}

Las Pipelines de Datadog Event Management le permiten procesar y gestionar eventos de diversas fuentes de manera eficiente. Con las Pipelines, puede aplicar diversas reglas de procesamiento y filtros para personalizar cómo se manejan los eventos. Las Pipelines facilitan la gestión de grandes volúmenes de eventos entrantes de manera estructurada.

Use las Pipelines para:
- **Enriquecer eventos**: Las Pipelines pueden agregar contexto o información adicional a los eventos, por ejemplo, etiquetarlos, agregar atributos personalizados o correlacionarlos con metadatos relevantes para que resulten más informativos y útiles para tomar medidas.
- **Normalizar etiquetas de eventos**: Puede configurar reglas para reasignar etiquetas de modo que todos sus eventos tengan etiquetas estandarizadas.
- **Parsear mensajes y atributos como etiquetas**: Cree reglas grok personalizadas para el parseo del mensaje completo o de un atributo específico de su evento sin procesar. Traduzca el contexto en etiquetas y atributos rastreables que puedan referenciarse durante la investigación.

Las Pipelines de Datadog Event Management ayudan a las organizaciones a simplificar sus procesos de monitoreo, mejorar la claridad de sus perspectivas operativas y, en última instancia, responder de manera más efectiva a incidentes y alertas.

## Cómo funciona {#how-it-works}

Con las Pipelines, los eventos pasan por un proceso de parseo y enriquecimiento al encadenarse secuencialmente a través de procesadores. Esto extrae información o atributos significativos de texto semiestructurado. Cada evento que pasa por las Pipelines se prueba con cada filtro de pipeline. Si coincide con un filtro, todos los procesadores se aplican secuencialmente antes de pasar al siguiente pipeline.

Las Pipelines y los procesadores se pueden aplicar a todos los eventos y se pueden configurar en las [Event Management Pipelines][1].

## Crear una pipeline {#create-a-pipeline}

Cree una pipeline para filtrar los eventos que le interesan, por ejemplo, una fuente o una etiqueta.

1. Navegue a [Event Management Pipelines][1] en Datadog.
1. Haga clic en {{< ui >}}Add a Pipeline{{< /ui >}}.
1. Elija un filtro del menú desplegable o cree su propia consulta de filtro en el [Explorador de Event Management][2] seleccionando el icono `</>`. Use el filtro para aplicar procesadores de pipeline a eventos específicos. **Nota**: El filtrado de la pipeline se aplica antes que cualquiera de los procesadores de la canalización. No puede filtrar por un atributo que se extraiga en la propia pipeline.
1. Asigne un nombre a la pipeline.
1. Haga clic en {{< ui >}}Create{{< /ui >}}.

## Agregue un procesador {#add-a-processor}

Puede agregar procesadores después de crear una pipeline. Los procesadores disponibles son:

- [Aggregation Key Processor][3]
- [Arithmetic Processor][4]
- [Date Remapper][5]
- [Category Processor][6]
- [Grok Parser][7]
- [Lookup Processor][8]
- [Remapper][9]
- [Service Remapper][10]
- [Status Remapper][11]
- [String Builder Processor][12]
- [VRL Processor][14]


## Permisos de Pipeline {#pipeline-permissions}

El acceso a las Pipelines de Event Management se controla mediante dos permisos:

- **`events_write_pipelines`**: Le permite crear, editar y eliminar pipelines, lo que incluye modificar atributos de las pipelines, como las consultas de filtro y el orden de las pipelines.
- **`events_write_processors`**: Le permite crear, editar y eliminar procesadores dentro de una pipeline.

Los administradores pueden asignar estos permisos a roles mediante [Role Based Access Control][13] para controlar quién puede modificar las configuraciones de las pipelines y los procesadores.


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/event/settings/pipelines
[2]: https://app.datadoghq.com/event/explorer
[3]: /es/events/pipelines_and_processors/aggregation_key
[4]: /es/events/pipelines_and_processors/arithmetic_processor
[5]: /es/events/pipelines_and_processors/date_remapper
[6]: /es/events/pipelines_and_processors/category_processor
[7]: /es/events/pipelines_and_processors/grok_parser
[8]: /es/events/pipelines_and_processors/lookup_processor
[9]: /es/events/pipelines_and_processors/remapper
[10]: /es/events/pipelines_and_processors/service_remapper
[11]: /es/events/pipelines_and_processors/status_remapper
[12]: /es/events/pipelines_and_processors/string_builder_processor
[13]: /es/account_management/rbac/permissions/
[14]: /es/events/pipelines_and_processors/vrl_processor