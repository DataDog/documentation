---
aliases:
- /es/graphing/widgets/table/
description: Muestre datos tabulares con columnas, filas y capacidades de ordenamiento
  para un análisis detallado de métricas y eventos.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentación
  text: Creación de tableros mediante JSON
- link: /dashboards/querying/
  tag: Documentación
  text: Aprenda a crear una consulta de gráficos
- link: https://learn.datadoghq.com/courses/discovering-table-list-widgets
  tag: Centro de aprendizaje
  text: Descubrimiento de widgets de Table, listar, SLO y Architecture
title: Widget de tabla
widget_type: query_table
---
## Descripción general {#overview}

La visualización de tabla muestra columnas de datos agregados agrupados por clave de etiqueta. Use tablas para comparar valores entre muchos grupos de datos y ver tendencias, cambios y valores atípicos.

{{< img src="/dashboards/widgets/table/table_conditional_formatting.png" alt="Widget de tabla con formato condicional" style="width:100%;">}}

## Configuración {#setup}

### Configuración {#configuration}

1. Elija los datos para graficar:
    * Métrica: Consulte la [documentación principal de gráficos][1] para configurar una consulta de métrica.
    * Fuentes de datos no métricas: Consulte la [documentación de búsqueda de registros][2] para configurar una consulta de evento.

2. Agregue columnas adicionales a la tabla usando los botones {{< ui >}}\+ Add Query{{< /ui >}} y {{< ui >}}\+ Add Formula{{< /ui >}}.

### Opciones {#options}

* Cambie el nombre de los encabezados de columna estableciendo alias, haga clic en el botón {{< ui >}}as...{{< /ui >}}.
* Configure si se muestra o no la barra de búsqueda. {{< ui >}}Auto{{< /ui >}} es el valor predeterminado y muestra la barra de búsqueda dependiendo del tamaño del widget; esto significa que si su pantalla se vuelve demasiado pequeña, prioriza mostrar los datos en el widget y oculta la barra de búsqueda, pero sigue estando disponible en modo de pantalla completa.

#### Formato de columna {#column-formatting}

Personalice la visualización de los valores de las celdas para cada columna con Reglas de formato de columna. Cree códigos de color para sus datos a fin de visualizar tendencias y cambios.
* Formato de umbral: resalte las celdas con colores cuando se cumplan rangos de valores específicos.
* Formato de rango: codifique con colores las celdas con un rango de valores.
* Formato de texto: reemplace las celdas con valores de texto de alias para mejorar la legibilidad.
* Información de tendencias: visualice consultas de métricas y eventos.

{{< img src="/dashboards/widgets/table/conditional_formatting_trends.png" alt="Widget de tabla que muestra formato condicional con indicadores de tendencia" style="width:100%;" >}}

#### Enlaces de contexto {#context-links}

Los [enlaces de contexto][10] están habilitados de forma predeterminada y se pueden activar o desactivar. Los enlaces de contexto conectan los widgets del dashboard con otras páginas en Datadog o aplicaciones de terceros.

## Valores N/A {#na-values}

Las columnas en el widget de tabla se consultan independientemente unas de otras. Los grupos superpuestos con nombres coincidentes se unen en tiempo real para formar las filas de la tabla. Como resultado de ese proceso, puede haber situaciones sin superposición total, lo que muestra celdas N/A. Para mitigar esto:
  * Amplíe el límite de consultas a números más altos para maximizar la superposición entre columnas
  * Ordene las tablas según la columna que considere que "impulsa" la información

## API {#api}

Este widget se puede utilizar con **Dashboards API**. Consulte la [documentación de Dashboards API][8] para obtener información adicional.

La [definición del esquema JSON del widget][9] dedicada para el widget de tabla es:

{{< dashboards-widgets-api >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/querying/#configuring-a-graph
[2]: /es/logs/search_syntax/
[3]: /es/tracing/trace_explorer/query_syntax/
[4]: /es/real_user_monitoring/explorer/search_syntax
[5]: /es/profiler/profile_visualizations
[6]: /es/security_monitoring/explorer/
[7]: /es/dashboards/guide/apm-stats-graph
[8]: /es/api/latest/dashboards/
[9]: /es/dashboards/graphing_json/widget_json/
[10]: /es/dashboards/guide/context-links/
[11]: /es/dashboards/querying/#advanced-graphing