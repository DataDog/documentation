---
description: Agrupa los logs de consulta en patrones.
further_reading:
- link: logs/explorer/
  tag: Documentación
  text: Más información sobre Log Explorer
- link: logs/explorer/analytics
  tag: Documentación
  text: Aprender a analizar tus logs
- link: https://www.datadoghq.com/blog/filter-logs-by-subqueries-with-datadog/
  tag: Blog
  text: Filtra y correlaciona logs de forma dinámica mediante subconsultas
- link: https://www.datadoghq.com/blog/monitor-dns-logs-for-network-and-security-datadog/
  tag: Blog
  text: Monitoriza logs de DNS para red y análisis de seguridad
title: Agrupación de logs en patrones
---

## Información general

Al agregar logs indexados por **Patrones**, los logs que tienen un `message` con estructuras similares se agrupan juntos. Opcionalmente, selecciona de uno a tres campos con facetas para agregar previamente tus logs en grupos antes de que se detecten patrones dentro de estas agrupaciones.

La vista **Patrones** es útil para detectar y filtrar patrones de error ruidosos que podrían hacerte pasar por alto otros problemas. La detección de patrones se basa en 10.000 muestras de log. Ajusta tu búsqueda para ver patrones limitados a un subconjunto específico de logs.

{{< img src="logs/explorer/aggregations_patterns.png" alt="El Log Explorer que muestra logs agrupados por patrones" style="width:90%;" >}}

Los patrones admiten la visualización de [Lista][1]. Al hacer clic en un patrón en la lista se abre el panel lateral de patrones desde el que puede:

- Acceder a una muestra de logs de ese patrón
- Añadir el filtro de búsqueda para limitar los logs solo a partir de este patrón
- Obtener un kickstart para una [regla de parseo grok][2] para extraer logs de información estructurada de ese patrón

{{< img src="logs/explorer/patterns_side_panel.jpg" alt="El panel lateral de log con el botón Ver todo y la regla de parseo resaltada" style="width:90%;" >}}

## Inspector de patrones

Utiliza el Inspector de patrones para obtener un desglose visual de los valores subyacentes de la agregación de un patrón de log basado en tu consulta de búsqueda.

{{< img src="logs/explorer/group/pattern_inspector_values.png" alt="El gráfico de distribución de valores que muestra un gráfico de barras de los valores" style="width:90%;" >}}

Por ejemplo, si estás investigando un problema, podrías ver cuántos hosts están implicados o qué regiones o centros de datos están afectados.

1. Navega hasta [Log Explorer][3].
2. Haz clic en **Patterns** (Patrones) en la sección **Group into** (Agrupar en). En la lista de patrones, los valores agregados en la sección de mensajes aparecen resaltados en amarillo. Pasa el ratón por encima de un valor agregado para obtener una vista previa de la distribución visual de sus valores.
3. Haz clic en un valor agregado para abrir el panel lateral del patrón de log y ver más detalles en la pestaña **Pattern Inspector** (Inspector de patrones).

{{< img src="logs/explorer/group/pattern_inspector_panel_1.png" alt="El panel de patrones que muestra la pestaña Inspector de patrones" style="width:90%;" >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/explorer/visualize/#list-aggregates-of-logs
[2]: /es/logs/log_configuration/processors/#grok-parser
[3]: https://app.datadoghq.com/logs