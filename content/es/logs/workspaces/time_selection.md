---
further_reading:
- link: /logs/workspaces/
  tag: Documentación
  text: Más información sobre Log Workspaces
- link: /dashboards/guide/custom_time_frames/
  tag: Documentación
  text: Periodos de tiempo personalizados
title: Selección de horarios en Workspaces
---

## Información general

Logs Workspaces está diseñado para realizar investigaciones o análisis en un intervalo de tiempo específico y fijo. A diferencia de los intervalos de tiempo móviles, que se actualizan continuamente para mostrar los datos más recientes, Workspaces supone que te enfocas en un período estático. Como resultado, la selección de horarios en Workspaces no avanza automáticamente y se define un intervalo de tiempo por defecto al crear Workspaces. Esto garantiza que los datos permanezcan constantes a lo largo de la investigación, a menos que el usuario los actualice manualmente.

## Selecciones estáticas de horarios en Workspaces

Después de seleccionar un intervalo de tiempo, como los últimos 15 minutos, este permanece estático hasta que selecciones manualmente un nuevo intervalo de tiempo. Por ejemplo, si seleccionas "pasados 15 minutos" a las 13:05, el intervalo de tiempo seguirá siendo de 12:50 a 13:05 hasta que lo actualices manualmente. Para ello, abre el menú desplegable de selección de intervalos de tiempo, y elige el mismo intervalo de tiempo u otro diferente para visualizar los datos más actualizados.

{{< img src="/logs/workspace/time_selection/time_selector_more.png" alt="Opciones de selección de horarios que incluye periodos de tiempo personalizados" style="width:80%;" >}}

## Definir un horario por defecto

Por defecto, los Workspaces están configurados para mostrar los datos de los últimos 15 minutos. Por ejemplo, si creas un Workspace a las 15:03 del 1 de octubre de 2024, el intervalo de tiempo predeterminado es de 14:48 a 15:03. Este es el intervalo de tiempo predeterminado que se muestra cada vez que abres el Workspace, a menos que definas manualmente un nuevo valor predeterminado.

Para cambiar el horario por defecto:

1. Selecciona un nuevo periodo de tiempo en el menú desplegable.
2. Haz clic en **Set Default Time** (Definir horario por defecto) a la izquierda del menú desplegable de selección de hora.

{{< img src="/logs/workspace/time_selection/set_default_time.png" alt="Opción para definir un horario por defecto en la parte superior de tu Workspace" style="width:90%;" >}}

Esta nueva selección se convierte en el periodo de tiempo por defecto para ese Workspace.

<div class="alert alert-warning">Si modificas la selección de horario pero no defines una nueva por defecto, la próxima vez que abras el Workspace, volverás a la hora por defecto original. Para asegurarte de que tu selección de horario se conserve, debes hacer clic en <strong>Definir horario por defecto</strong> después de hacer tu selección.</div>

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}