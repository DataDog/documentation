---
aliases: null
description: Grupos de rastreo
further_reading:
- link: tracing/trace_explorer
  tag: Documentación
  text: Trace Explorer
- link: /tracing/trace_explorer/query_syntax/
  tag: Documentación
  text: Sintaxis de consulta de tramos (span)
private: true
title: Grupos de rastreo
---

{{< callout url="https://www.datadoghq.com/support/" header="Solicita acceso a la vista previa." >}}
Los grupos de rastreo están en vista previa. Para solicitar acceso, ponte en contacto con el servicio de asistencia de Datadog.
{{< /callout >}}

## Información general

Los grupos de rastreo te permiten definir claves de agrupación personalizadas para tus datos de rastreo, lo que te ayuda a descubrir tendencias en los recuentos de solicitudes, cuellos de botella en el rendimiento y puntos conflictivos de error observando los datos agregados, en lugar observar los datos individuales de tramos (spans) y trazas. 

Desde el editor de consultas del Explorador de trazas, puedes agrupar tus resultados utilizando cualquier etiqueta (tag) o atributo de tramo para observar:

- Recuentos de solicitudes
- Tasas de error
- Distribuciones de latencia

Estas métricas se organizan dentro de cada grupo en función de los distintos valores de las claves de agrupación elegidas.

## Editor de consultas

1. Ve al [Explorador de trazas][1].
1. Introduce tu consulta en la barra de búsqueda.
1. Selecciona hasta cuatro dimensiones en la cláusula **Agrupar por**, utilizando cualquier etiqueta o atributo de tramo.

{{< img src="/tracing/trace_explorer/trace_groups/group_by_clause.png" alt="Cláusula Agrupar por" style="width:90%;" >}}


Después de seleccionar una dimensión para la agrupación, puedes especificar de dónde obtener los valores de la dimensión utilizando el desplegable **desde**: 
- **Tramo**: Agrupa utilizando la dimensión del tramo consultado (por defecto). Por ejemplo, `a`.
- **Tramo principal**: Agrupa utilizando la dimensión especificada del tramo principal de los tramos que coinciden con la consulta. Por ejemplo, para visualizar el rendimiento de un endpoint de API en función del servicio que lo llama, agrupa por `service` desde `parent(a)`.
- **Tramo raíz**: Agrupa utilizando la dimensión especificada del tramo raíz de la traza. Por ejemplo, para analizar patrones de solicitudes de backend en función de las páginas de frontend desde las que se originan las solicitudes, agrupa por `@view.name` desde `root`.

{{< img src="/tracing/trace_explorer/trace_groups/group_by_root.png" alt="Agrupar por, desde la raíz" style="width:90%;" >}}

## Ver grupos de rastreo en la lista de grupos

Los grupos de rastreo se muestran como valores únicos de la dimensión seleccionada. Cada grupo se muestra con tres métricas clave:
- **SOLICITUDES**: Recuento de tramos dentro del grupo.
- **ERRORES**: Tasa de error y recuento de errores.
- **Latencia P95**: Latencia p95 de los tramos.

Para ver estas métricas agregadas en el tramo (span) principal o raíz, en lugar de en el tramo consultado, selecciona `parent(a)` o `root` en la sentencia **Mostrar métricas desde**.

Además, `Latency Breakdown` muestra el tiempo que transcurre entre diferentes servicios dentro de las solicitudes de cada grupo, lo que permite detectar visualmente los cuellos de botella de latencia de determinados grupos.

{{< img src="/tracing/trace_explorer/trace_groups/group_list.png" alt="Lista de grupos" style="width:90%;" >}}

Para realizar un análisis más profundo, haz clic en cualquier grupo para examinar los eventos individuales de tramos que conforman las métricas agregadas.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: app.datadoghq.com/apm/traces