---
description: Filtra tramos (spans) para reducir, ampliar o cambiar tu enfoque en el
  subconjunto de tramos de interés actual.
further_reading:
- link: tracing/trace_explorer/query_syntax
  tag: Documentación
  text: Sintaxis de consulta
title: Buscar tramos
---

## Información general

Aunque la información de tramos individualmente puede ser útil visualizada como lista, a veces puedes acceder a información valiosa a través de la agregación. Para acceder a esta información, busca tramos en el Trace Explorer y visualízalos como series temporales, listas principales o tablas.

La búsqueda de Trace Explorer consta de un intervalo temporal y una consulta de búsqueda que combina `key:value` y una búsqueda de texto completo. Elige qué dimensión deseas visualizar (recuento de tramos, recuento de valores únicos, medida de una dimensión cuantitativa), selecciona un intervalo temporal y agrupa la consulta por una o varias dimensiones.

## Consulta de búsqueda

Por ejemplo, para encontrar tramos de un servicio de tienda web, con un estado de error, en los últimos treinta minutos, crea una consulta personalizada como `service:web-store status:error` y establece el intervalo temporal en `Past 30 minutes`:

{{< img src="tracing/trace_explorer/search/trace_explorer_list_search.png" alt="Búsqueda del lista en Trace Explorer, en la que el usuario haya buscado 'service:web-store' y 'status:error'. Se muestra la tabla de barra de búsqueda, tabla de barra de errores y tabla de línea de latencia. La opción Visualizar como está establecida en Lista." style="width:100%;">}}

Selecciona una vista de lista de principales, y agrupa la consulta por `resource` para ver qué recursos específicos están más afectados.

{{< img src="tracing/trace_explorer/search/trace_explorer_top_list_search.png" alt="Búsqueda de lista de Trace Explorer. La opción Visualizar como está establecida en Lista de principales." style="width:100%;">}}

{{< site-region region="us,eu,us3,us5,ap1" >}}

[1]: /es/tracing/trace_explorer/query_syntax/#facets
{{< /site-region >}}

## Sintaxis de consulta

Para empezar a buscar tramos en el Trace Explorer, lee la [documentación sobre sintaxis de consulta][2] y la [documentación sobre marcos temporales][3] para obtener más detalles sobre los marcos temporales personalizados.


## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_explorer/query_syntax/#facets
[2]: /es/tracing/trace_explorer/query_syntax
[3]: /es/dashboards/guide/custom_time_frames