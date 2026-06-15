---
description: Aprende a solucionar problemas comunes en Product Analytics.
further_reading:
- link: /product_analytics/
  tag: Documentación
  text: Análisis de productos
- link: /product_analytics/journeys/pathways
  tag: Documentación
  text: Pathways
- link: /product_analytics/journeys/funnels
  tag: Documentación
  text: Embudos
title: Resolución de problemas
---

## Información general

Si tienes problemas para instalar o configurar Datadog Product Analytics, esta página te ayudará a solucionarlos. Si sigues teniendo problemas, [ponte en contacto con el servicio de asistencia de Datadog][1].

### El diagrama Pathways y el embudo muestran diferentes recuentos de vistas para la misma vista

Los algoritmos para el diagrama de Pathways y el embudo se basan en dos cálculos diferentes. Puede que notes una diferencia en el recuento de vistas para el primer paso de ambas visualizaciones. Imagina el caso de uso de crear un embudo y un diagrama de Pathways que comienzan con la misma vista: `/home`.

- El embudo cuenta todas las vistas que fueron a `/home`.
- El diagrama Pathways sólo recuenta vistas en `/home` donde sigue otra vista. Si un usuario va a `/home` y permanece en esa página o abandona la aplicación, el diagrama de Pathways no incluye sus sesiones.

Además, los embudos no incluyen sesiones activas, mientras que los diagramas Pathways sí incluyen sesiones activas.

## Referencias adicionales
{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help