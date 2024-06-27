---
aliases:
- /es/graphing/widgets/top_list/
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentación
  text: Creación de dashboards con JSON
- link: /notebooks/
  tag: Documentación
  text: Notebooks
- link: /dashboards/guide/context-links/#overview/
  tag: Documentación
  text: Enlaces contextuales
title: Widget de lista principal
widget_type: lista principal
---

La visualización de lista principal te permite mostrar una lista de los valores de etiqueta con más o menos cualquier valor de métrica o evento, como los mayores consumidores de CPU, hosts con menos espacio en disco o los productos en la nube con los costes más elevados.

## Configuración

{{< img src="dashboards/widgets/toplist/top_list_graph_display.png" alt="Opciones de configuración para resaltar la visualización de gráficos Apilado, Modo de visualización relativo y Reglas de formato visual." style="width:100%;" >}}

### Configuración

1. Elige los datos para graficar:
    * Métrica: consulta la documentación [querying (consulta)][1] para configurar una consulta métrica.
    * Fuentes de datos de no métrica: consulta la [Trace search documentation (documentación de búsqueda de rastreo)][2] o [Log search documentation (documentación de búsqueda de log)][3] para configurar una consulta de evento.

2. Opcional: ver configuraciones adicionales de [graph display (visualización de gráficos)](#graph-display). 

### Opciones

#### Visualización de gráficos

Configurar las funciones del Modo de visualización opcional para añadir contexto a tu visualización de lista principal.

* Visualizar múltiples grupos apilados para mostrar un desglose de cada dimensión en tu consulta. **Stacked** (Apilado) está activado por defecto. Puedes cambiar a **Flat** (Plano).
* Selecciona el modo de visualización **Relative** (Relativo) para mostrar los valores como un porcentaje del total o el modo de visualización **Absolute** (Absoluto) para mostrar el recuento bruto de los datos que estás consultando.</br>
   **Nota**: La visualización relativa solo está disponible para datos de recuento, como las métricas de recuento métricas o eventos de log.
* Configurar formato condicional en **Visual Formatting Rules** (Reglas de formato visual) en función de los valores de tus entradas. 

#### Enlaces contextuales

Los [Context links (enlaces contextuales)][4] están activados por defecto y pueden activarse o desactivarse. Los enlaces contextuales sirven de puente entre widgets de dashboard con otras páginas de Datadog, o con aplicaciones de terceros.

#### Hora mundial

En los screenboards y notebooks, elige si tu widget tiene un marco temporal personalizado o utiliza el marco temporal global.

## API

Este widget puede utilizarse con la **[Dashboards API (API de dashboards)][5]**. Ve la siguiente tabla para la [widget JSON schema definition (definición del esquema JSON widget][6]:

{{< dashboards-widgets-api >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/querying/
[2]: /es/tracing/trace_explorer/query_syntax/#search-bar
[3]: /es/logs/search_syntax/
[4]: /es/dashboards/guide/context-links
[5]: /es/api/latest/dashboards/
[6]: /es/dashboards/graphing_json/widget_json/