---
aliases:
- /es/graphing/widgets/table/
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentación
  text: Creación de dashboards con JSON
- link: /dashboards/querying/
  tag: Documentación
  text: Aprenda a crear una consulta para crear gráficas
title: Widget de tabla
widget_type: query_table
---

## Información general

La visualización de tablas muestra columnas de datos agregados agrupados por clave de etiqueta (tag). Utiliza las tablas para comparar valores entre muchos grupos de datos y ver tendencias, cambios y outliers.

{{< img src="/dashboards/widgets/table/table_conditional_formatting.png" alt="Widget de tabla con formato condicional" style="width:100%;">}}

## Configuración

### Configuración

1. Elige los datos a graficar:
    * Métrica: consulta la [Documentación principal de crear gráficas][1] para configurar una consulta a la métrica.
    * Fuentes de datos no métrica: consulta la [Documentación de búsqueda de log][2] para configurar una consulta de evento.

2. Añade columnas adicionales a la tabla utilizando los botones **+ Add Query** (+ Añadir consulta) y **+ Add Formula** (+ Añadir fórmula).

### Opciones

* Cambia el nombre de los encabezados de columna al establecer alias, haz clic en el botón **as...** (como...).
* Configura si se muestra o no la barra de búsqueda. **Auto** es el valor predeterminado y muestra la barra de búsqueda según el tamaño del widget, esto significa que si tu pantalla se hace demasiado pequeña, prioriza la visualización de los datos en el widget y oculta la barra de búsqueda, pero sigue estando disponible en el modo de pantalla completa.

#### Formato de columnas
Personaliza la visualización de los valores de las celdas de cada columna con las Reglas de formato de columna. Crea códigos de color para tus datos para visualizar tendencias y cambios.
* Formato de umbral: resalta las celdas con colores cuando se cumplan determinados rangos de valores.
* Formato de rango: codifica por colores las celdas con un rango de valores.
* Formato de texto: sustituye las celdas por valores de texto de alias para mejorar la legibilidad.

{{< img src="/dashboards/widgets/table/range_conditional_formatting.png" alt="Configuración del widget que muestra las opciones de formato de columna" style="width:90%;" >}}

#### Enlaces contextuales

Los [enlaces contextuales][10] están activados por defecto y pueden activarse o desactivarse. Los enlaces contextuales sirven de puente entre widgets de dashboard con otras páginas de Datadog, o con aplicaciones de terceros.


## Valores N/A

Las columnas del widget de tabla se consultan independientemente unas de otras. Los grupos solapados con nombres coincidentes se unen en tiempo real para formar las filas de la tabla. Como resultado de dicho proceso, puede haber situaciones sin solapamiento total, por lo que se muestran celdas N/A. Para mitigar esto:
  * Amplía el límite de consultas a números más altos, para maximizar el solapamiento entre columnas.
  * Ordena las tablas según la columna que consideres que "impulsa" la información.

## API

Este widget se puede utilizar con la **API de dashboards**. Consulta la [Documentación de la API de dashboards][8] para obtener referencias adicionales.

La [definición del esquema de widget JSON][9] dedicada al widget de la tabla es:

{{< dashboards-widgets-api >}}

## Leer más

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