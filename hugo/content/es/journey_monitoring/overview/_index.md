---
description: Revise el estado, los KPI, la definición y las relaciones de un recorrido
  con otros recorridos.
further_reading:
- link: /journey_monitoring/
  tag: Documentación
  text: Obtenga información sobre Journey Monitoring
- link: /journey_monitoring/map/
  tag: Documentación
  text: Obtenga información sobre el mapa de Journey Monitoring
- link: /journey_monitoring/status/
  tag: Documentación
  text: Obtenga información sobre el estado de los recorridos
title: Página de Journey Overview
---
## Explore un recorrido {#explore-a-journey}

Cuando hace clic en un recorrido en el [mapa][6] o en el [catálogo](#journey-catalog), Journey Overview muestra su [estado][2], [indicadores clave de rendimiento (KPI)][4], [eventos de inicio y fin][5] y los recorridos ascendentes y descendentes.

Haga clic en el mosaico del recorrido enfocado para abrir su [informe de detalles][1]. Haga clic en un mosaico de recorrido ascendente o descendente para abrir el informe de ese recorrido.

{{< img src="journey_monitoring/journey-monitoring-overview.png" alt="Descripción general de un solo recorrido que muestra sus indicadores clave de rendimiento, estado, definición y los recorridos ascendentes y descendentes." style="width:100%;" >}}

## Recorridos ascendentes y descendentes {#upstream-and-downstream-journeys}

Datadog identifica los recorridos relacionados según los eventos de inicio y fin compartidos:

- **Los recorridos ascendentes** terminan con un evento que es uno de los eventos de inicio del recorrido enfocado.
- **Los recorridos descendentes** comienzan con un evento que es uno de los eventos de fin del recorrido enfocado.

Utilice estas relaciones para investigar si un recorrido ascendente afecta al recorrido enfocado o si el recorrido enfocado afecta a los recorridos descendentes.

## Catálogo de recorridos {#journey-catalog}

El catálogo de recorridos enumera los recorridos creados y los [recorridos sugeridos][3]. Cada recorrido creado muestra sus KPI y un estado de **Healthy**, **Degraded** o **Missing coverage**. Los recorridos sugeridos están etiquetados como **Suggested**.

Utilice el catálogo para:

- Buscar recorridos
- Filtrar y ordenar recorridos
- Filtrar recorridos por propiedad del equipo
- Identificar recorridos degradados
- Visualizar recorridos sugeridos

Haga clic en un recorrido en el catálogo para mostrarlo en la descripción general.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/journey_monitoring/details_report/
[2]: /es/journey_monitoring/status/
[3]: /es/journey_monitoring/suggested_journeys/
[4]: /es/journey_monitoring/details_report/#traffic-and-conversion-trends
[5]: /es/journey_monitoring/configuring_journeys/#define-start-and-end-conditions