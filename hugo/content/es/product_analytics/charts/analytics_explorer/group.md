---
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: Documentación
  text: Buscar tus eventos
title: Agrupar eventos de análisis de productos
---

## Información general

Los eventos de Product Analytics son valiosos individual y colectivamente. La consulta de búsqueda contiene información para agregar un subconjunto de eventos.

{{< img src="product_analytics/analytics/group/pana_group_search_bar.png" alt="Agrupar en sección de campos de la consulta de búsqueda" style="width:100%;" >}}

La selección de campos para agrupar, agregar y medir tus eventos se conserva al cambiar entre tipos de visualización.

## Agregación por campos

Todos los eventos de Product Analytics que coinciden con tu consulta de filtro se agregan en grupos según el valor de una o varias facetas de eventos. Además de los agregados, puedes extraer las siguientes medidas:

- Recuento de eventos por grupo

  {{< img src="product_analytics/analytics/group/pana_group_by_action.png" alt="Agrupar por recuento de eventos" style="width:90%;" >}}

- Recuento único de valores codificados para una faceta por grupo

  {{< img src="product_analytics/analytics/group/pana_group_by_loading_time.png" alt="Agrupar por recuentos únicos de valores codificados" style="width:90%;" >}}

- Operaciones estadísticas (como mínimo, máximo, media y percentiles) sobre los valores numéricos de una faceta por grupo.

  {{< img src="product_analytics/analytics/group/pana_group_distribution.png" alt="Agrupar en campos utilizando operaciones estadísticas" style="width:90%;" >}}

Los eventos individuales con varios valores para una faceta única pertenecen a ese número de agregados. Por ejemplo, un evento con los atributos `country:france` y `browser:chrome` se cuenta una vez en el agregado `country:france` y una vez en el agregado `browser:chrome`.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}