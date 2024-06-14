---
aliases:
- /es/monitors/check_summary/
description: Consulta la lista de todos tus checks que informan a Datadog.
further_reading:
- link: /monitors/
  tag: Documentación
  text: Aprender a crear un monitor
- link: /monitors/notify/
  tag: Documentación
  text: Configurar las notificaciones de tu monitor
- link: /monitors/manage/
  tag: Documentación
  text: Gestionar tus monitores
kind: Documentación
title: Resumen de checks
---

## Información general

Los checks de Datadog informan un estado en cada ejecución. La [página Resumen de checks][1] muestra tus checks informados en el último día. Los estados potenciales son:

- `OK`
- `WARNING`
- `CRITICAL`
- `UNKNOWN`

## Buscar

Para encontrar un check específico, utiliza la casilla de búsqueda `filter checks` en la página del resumen de checks. Haz clic en un nombre de check para ver los estados y las etiquetas (tags) asociados al check. Filtra aún más la lista utilizando la casilla de búsqueda `filter checks` dentro del panel de checks:

{{< img src="monitors/check_summary/check_search.png" alt="Detalles de checks" style="width:100%;">}}

## Dashboards

Para ver el estado de tu check en un dashboard, utiliza el [widget de estado del check][2].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/check/summary
[2]: /es/dashboards/widgets/check_status/