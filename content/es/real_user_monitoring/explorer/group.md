---
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: Documentación
  text: Búsqueda de tus eventos
title: Agrupación de eventos RUM
---

## Información general

Los eventos Real User Monitoring (RUM) son valiosos, tanto individual como colectivamente. La consulta de búsqueda contiene información para agregar un subconjunto de eventos. 

{{< img src="real_user_monitoring/explorer/group_into_fields-2.png" alt="Sección Agrupar por campo, en la consulta de búsqueda" style="width:100%;" >}}

La selección de campos para agrupar, agregar y medir tus eventos se conserva al cambiar el tipo de visualización.

## Agregados por campos

Todos los eventos RUM que coinciden con tu filtro de consulta se agregan en grupos basados en el valor de una o varias facetas de evento. Además de los agregados, puedes extraer las siguientes medidas:

- Recuento de eventos por grupo

  {{< img src="real_user_monitoring/explorer/group-count-of-events.png" alt="Agrupar por recuento de eventos" style="width:90%;" >}}

- Recuento único de valores codificados para una faceta por grupo

  {{< img src="real_user_monitoring/explorer/group-unique-count-coded-values-2.png" alt="Agrupar por recuento único de valores codificados" style="width:90%;" >}}

- Operaciones estadísticas (como mínimo, máximo, media y percentiles) sobre los valores numéricos de una faceta por grupo.

  {{< img src="real_user_monitoring/explorer/group-statistical-operations-2.png" alt="Agrupar por campo utilizando operaciones estadísticas" style="width:90%;" >}}

Las eventos individuales con múltiples valores para una misma faceta pertenecen a ese número de agregados. Por ejemplo, un evento RUM con los atributos `country:france` y `browser:chrome` se cuenta una vez en el agregado `country:france` y una vez en el agregado `browser:chrome`.

La agregación **Agrupar por campo** admite una dimensión para la visualización de la [Lista principal][1] y hasta tres dimensiones para las visualizaciones de [series temporales][2], [listas][3] y [tablas][4]. Cuando hay varias dimensiones, los valores principales se determinan en función de la primera dimensión, luego la segunda dimensión dentro de los valores principales de la primera dimensión, luego la tercera dimensión dentro de los valores principales de la segunda dimensión, y así sucesivamente.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/explorer/visualize#top-list
[2]: /es/real_user_monitoring/explorer/visualize#timeseries
[3]: /es/real_user_monitoring/explorer/visualize#lists
[4]: /es/real_user_monitoring/explorer/visualize#nested-tables