---
aliases:
- /es/journey_monitoring/map/suggested_journeys/
description: Cree recorridos a partir de sugerencias basadas en la actividad del usuario
  en sus aplicaciones frontend.
further_reading:
- link: /journey_monitoring/
  tag: Documentación
  text: Obtenga información sobre Journey Monitoring
- link: /journey_monitoring/map/
  tag: Documentación
  text: Obtenga información sobre el mapa
- link: /journey_monitoring/configuring_journeys/
  tag: Documentación
  text: Configure recorridos
title: Trayectorias sugeridas
---
## Descripción general {#overview}

Todos los miércoles a la medianoche UTC, Datadog analiza los últimos 30 días de [vistas de página y clics][3] de las aplicaciones frontend. A partir de esta actividad, Datadog genera recorridos sugeridos que incluyen:

- Un nombre de recorrido
- Una descripción del recorrido
- Un evento de inicio
- Un evento de finalización

Seleccione un recorrido sugerido del [mapa][1] o del [catálogo][2] para abrir la [página de creación de recorridos][4]. Datadog completa el nombre, la descripción, el evento de inicio y el evento de finalización. Revise estos campos antes de crear el recorrido.

Pase el cursor sobre un recorrido sugerido para aceptarlo o descartarlo. Para descartarlo, haga clic en el icono X. Una sugerencia descartada no vuelve a aparecer.

<div class="alert alert-warning"><p>Los recorridos sugeridos no aparecen si su organización ha optado por no participar en las experiencias de IA aplicada.</p></div>

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/journey_monitoring/map/
[2]: /es/journey_monitoring/overview/#journey-catalog
[3]: /es/product_analytics/data_collected/
[4]: /es/journey_monitoring/configuring_journeys/#choose-a-creation-method