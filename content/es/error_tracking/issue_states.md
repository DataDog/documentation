---
further_reading:
- link: /error_tracking/regression_detection/
  tag: Documentación
  text: Detección de regresión
title: Estados de problemas durante el seguimiento de errores
---

## Información general

Todos los problemas en el Seguimiento de errores tienen un estado para ayudarte a clasificar y priorizar los problemas o descartar el ruido. Existen cuatro estados:

- **FOR REVIEW** (PARA REVISIÓN): en curso y con necesidad de atención porque el problema es nuevo o se trata de una regresión.
- **REVIEWED** (REVISADO): clasificado y necesita ser solucionado, ya sea ahora o más tarde. 
- **IGNORED** (IGNORADO): no requiere ninguna investigación o acción adicional.
- **RESOLVED** (RESUELTO): solucionado y ya no sucede.

Todas los problemas comienzan con un estado FOR REVIEW (PARA REVISAR). El seguimiento de errores actualiza automáticamente el estado en los casos descritos a continuación, o puedes [actualizar manualmente el estado](#updating-an-error-status). También puedes [ver el historial](#issue-history) de los cambios de estado de un error determinado.

En el siguiente diagrama se muestra cómo se actualizan automática y manualmente los estados del Seguimiento de errores:
{{< img src="error_tracking/issue-states-diagram.png" alt="Estados de problemas del Seguimiento de errores" style="width:75%;" >}}

## Revisión automática

El seguimiento de errores marca automáticamente los problemas como **REVIEWED** (REVISADAS) si se ha realizado una de las siguientes acciones:

- Se ha asignado el problema
- Se ha creado un caso a partir del problema

{{< img src="error_tracking/auto-review-actions.png" alt="Acciones de revisión automática del Seguimiento de errores" style="width:75%;" >}}

## Resolución automática

El seguimiento de errores marca automáticamente como **RESOLVED** (RESUELTOS) los problemas que parecen inactivos o resueltos debido a la falta de incidencias de error recientes:

- Si el problema se notificó por última vez en una versión con más de 14 días de antigüedad y se ha publicado una versión más reciente que no notifica el mismo error, el Seguimiento de errores resuelve automáticamente el problema. Configura tus servicios con etiquetas de versión (consulta las instrucciones para [APM][1], [RUM][2] y [logs][3]) para asegurarte de que la resolución automática tiene en cuenta las versiones de tus servicios. 
- Si no se configuran etiquetas de `version`, el Seguimiento de errores resuelve automáticamente un problema si no se han notificado nuevos errores para ese problemas en los últimos 14 días.

## Reapertura automática mediante detección de regresiones

Consulta [Detección de regresión][4].

## Actualización del estado del problema

El estado de un problema aparece en cualquier lugar donde se pueda ver, como en la lista de problemas o en el panel de detalles de un problema determinado. Para actualizar manualmente el estado de un problema, haz clic en el estado y selecciona otro en el menú desplegable.

{{< img src="error_tracking/updating-issue-status.png" alt="La línea temporal de la actividad en el problema del Seguimiento de errores" style="width:100%;" >}}

## Historial del problema
Ve un historial de la actividad de tu problema con la **Línea temporal de la actividad**. En el panel de detalles de cualquier problema de Seguimiento de errores, ve la Línea temporal de la actividad haciendo clic en la pestaña **Activity** (Actividad).

{{< img src="error_tracking/issue-status-history.png" alt="La línea temporal de la actividad en el problema del Seguimiento de errores" style="width:80%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/services/deployment_tracking
[2]: /es/real_user_monitoring/guide/setup-rum-deployment-tracking/?tab=npm
[3]: /es/getting_started/tagging/unified_service_tagging/
[4]: /es/error_tracking/regression_detection/