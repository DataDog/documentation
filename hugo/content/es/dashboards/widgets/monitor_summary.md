---
aliases:
- /es/graphing/widgets/monitor_summary/
description: Muestra una vista resumida de todos tus monitores de Datadog, o un subconjunto
  basado en una consulta.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentación
  text: Creación de dashboards con JSON
title: Widget de resumen de monitor
widget_type: manage_status
---

El widget de resumen de monitor muestra una vista resumida de todos tus monitores de Datadog, o un subconjunto basado en una consulta.

{{< img src="dashboards/widgets/monitor_summary/monitor-summary-overview.png" alt="resumen de monitor" >}}

## Configuración

### Configuración

1. Selecciona uno de los tres tipos de resumen: `Monitor`, `Group` o `Combined`
    - El tipo de resumen `Monitor` enumera los estados y nombres de las monitores que coinciden con la [consulta de monitor][1]. Los monitores de alertas múltiples solo tienen una fila en la lista de resultados y su estado es el estado general del monitor de alerta múltiple. El número de estado es el número de monitores que coinciden con cada tipo de estado.

    {{< img src="dashboards/widgets/monitor_summary/monitor_summary_type.png" alt="tipo de resumen de monitor" style="width:80%;">}}

    - El tipo de resumen `Group` enumera los estados, nombres y grupos de monitores que coinciden con la consulta de monitor. Los monitores de alertas múltiples se dividen en varias filas en la lista de resultados y corresponden a cada grupo y al estado específico de ese grupo en el monitor de alerta múltiple. El tipo de resumen `Group` también admite las facetas `group` y `group_status` en su consulta de monitor de forma similar a la página [Monitores activados][2]. El número de estado es el número de grupos de monitor coincidentes con cada tipo de estado.

    {{< img src="dashboards/widgets/monitor_summary/group_summary_type.png" alt="tipo de resumen de grupo" style="width:80%;">}}

    - El tipo de resumen `Combined` enumera la cantidad de estados de grupo y los nombres de los monitores que coinciden con la consulta de monitor. Los monitores de alertas múltiples solo tienen una fila en la lista de resultados como en el tipo de resumen `monitor`, pero la columna de grupos muestra el número de grupos en cada tipo de estado en lugar del estado global del monitor. Al igual que el tipo de resumen `Group`, el tipo de resumen `Combined` también admite las facetas `group` y `group_status` en su consulta de monitor. Los números de estado siguen mostrando el recuento de estados globales del monitor como en el tipo de resumen `monitor`.

    {{< img src="dashboards/widgets/monitor_summary/combined_summary_type.png" alt="tipo de resumen combinado" style="width:80%;">}}

2. Introduce una consulta de monitor para mostrar el widget de resumen de monitor sobre un subconjunto de tus monitores.

    **Nota** Además de las facetas enumeradas en el enlace anterior, los tipos de resumen `Group` y `Combined` también admiten las facetas `group` y `group_status` para la búsqueda a nivel de grupo, de forma similar a la página [Monitores activados][2].

#### Variables de plantilla

Para utilizar las variables de plantilla creadas en tu dashboard en la consulta de búsqueda de resumen del monitor, sigue el mismo formato de consulta que en la página Gestionar monitor.

**Ejemplo

1. Filtrado en monitor `scope` con una variable de plantilla `$service`.

   Para aprovechar `scope` en la página de gestión o activación del monitor, tienes que hacer `scope:service:web-store`.
   Por lo tanto, en el widget tienes que hacer `scope:$service` para luego aplicar el valor de la variable de plantilla al widget.

   {{< img src="dashboards/widgets/monitor_summary/templatevariable-example-scope.png" alt="Variable de plantilla de contexto" style="width:80%;">}}


2. Filtrado en monitor `group` con una variable de plantilla `$env`.

   Para aprovechar `group` en la página de gestión o activación de monitor, tienes que hacer `group:env:prod`.
   Por lo tanto, en el widget tienes que hacer `group:$env` para luego aplicar el valor de la variable de plantilla al widget.

   {{< img src="dashboards/widgets/monitor_summary/templatevariable-example-group.png" alt="Variable de plantilla de grupo" style="width:80%;">}}

## Opciones

#### Mostrar preferencias

Elige mostrar solo el `Count` de monitores por tipo de estado de monitor, una `List` de monitores, o `Both`. Las opciones `Text` y `Background` especifican si los colores de estado deben aplicarse al texto o al fondo del Número de estado. La opción `Hide empty Status Counts`, cuando está activada, solo muestra el Número de estado para los estados que tienen más de cero monitores en la lista de resultado.

{{< img src="dashboards/widgets/monitor_summary/display-preferences.png" alt="mostrar preferencias" style="width:80%;">}}

La selección de la opción `Show triggered column` filtra los resultados a los monitores o grupos de monitores que se encuentran en el estado de activación (`Alert`, `Warn` o `No Data`) y los ordena desde la activación más reciente a la menos reciente. Se añade una columna adicional que indica el tiempo transcurrido desde la última activación de monitor/grupo.

{{< img src="dashboards/widgets/monitor_summary/monitor-summary.png" alt="mostrar preferencias" style="width:80%;">}}

## API

Este widget puede utilizarse con la **[API de dashboards][3]**. Consulta la siguiente tabla para la [definición del esquema de widget JSON][4]:

{{< dashboards-widgets-api >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/manage/
[2]: /es/monitors/manage/#grouped-results
[3]: /es/api/latest/dashboards/
[4]: /es/dashboards/graphing_json/widget_json/