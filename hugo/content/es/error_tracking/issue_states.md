---
further_reading:
- link: /error_tracking/regression_detection/
  tag: Documentación
  text: Detección de regresión
title: Estados de incidentes en Error Tracking
---

## Información general

Todas las incidencias en Error Tracking tienen un estado que te ayuda a clasificar y priorizar las incidencias o a descartar el ruido. Hay cinco estados:

- **FOR REVIEW** (PARA REVISIÓN): incidencias nuevas o regresivas que requieren atención.
- **REVIEWED** (REVISADO): incidencias de triaje que deben solucionarse, ahora o más adelante.
- **RESOLVED** (RESUELTO): incidencias que se han solucionado y ya no se producen.
- **IGNORED** (IGNORADOS): incidencias que no requieren más investigación o acción.
- **EXCLUDED** (EXCLUIDOS): incidencias que no requieren más investigación, deja de recopilar nuevos errores y ya no cuentan para el uso o la facturación.

Todas los problemas comienzan con un estado FOR REVIEW (PARA REVISAR). El seguimiento de errores actualiza automáticamente el estado en los casos descritos a continuación, o puedes [actualizar manualmente el estado](#updating-an-error-status). También puedes [ver el historial](#issue-history) de los cambios de estado de un error determinado.

En el siguiente diagrama se muestra cómo se actualizan automática y manualmente los estados del Seguimiento de errores:
{{< img src="error_tracking/issue-states-diagram.png" alt="Estados de problemas del Seguimiento de errores" style="width:75%;" >}}

## Revisión automática

El seguimiento de errores marca automáticamente los problemas como **REVIEWED** (REVISADAS) si se ha realizado una de las siguientes acciones:

- Se ha asignado el problema
- Se ha creado un caso a partir del problema

{{< img src="error_tracking/auto-review-actions-2.png" alt="Acciones de revisión automáticas de Error Tracking" style="width:75%;" >}}

## Resolución automática

El seguimiento de errores marca automáticamente como **RESOLVED** (RESUELTOS) los problemas que parecen inactivos o resueltos debido a la falta de incidencias de error recientes:

- Si el problema se notificó por última vez en una versión con más de 14 días de antigüedad y se ha publicado una versión más reciente que no notifica el mismo error, Error Tracking lo resolverá automáticamente. Configura tus servicios con etiquetas de versión (consulta las instrucciones para [APM][1], [RUM][2] y [Logs][3]) para garantizar que la resolución automática tenga en cuenta las versiones de tus servicios.
- Si no se configuran etiquetas de `version`, el Seguimiento de errores resuelve automáticamente un problema si no se han notificado nuevos errores para ese problemas en los últimos 14 días.

**Nota**: La lógica de autoresolución no tiene en cuenta `version`.

## Reapertura automática mediante detección de regresiones

Consulta [Detección de regresión][4].

## Actualización del estado del problema

El estado de un problema aparece en cualquier lugar donde se pueda ver, como en la lista de problemas o en el panel de detalles de un problema determinada. Para actualizar manualmente el estado de un problema, haz clic en el estado y selecciona otro en el menú desplegable.

{{< img src="error_tracking/updating-issue-status.png" alt="La escala de tiempo de la actividad en el problema de rastreo de errores" style="width:100%;" >}}

## Excluir una incidencia

El estado `EXCLUDED` te permite evitar que se realice un seguimiento de errores específicos, garantizando que no se recopilen ni se tengan en cuenta para la facturación. Esto te ayuda a eliminar errores no procesables o problemas causados por fallos esperados sin necesidad de complejas reglas de exclusión.

Para excluir una incidencia, haz clic en su estado y selecciona **EXCLUDED** (EXCLUIDO) en el menú desplegable. Las incidencias excluidas siguen siendo accesibles en la pestaña **EXCLUDED** (EXCLUIDO). Puedes consultar su historial en cualquier momento.

{{< img src="error_tracking/issue-states-excluded.png" alt="Excluido en el menú desplegable de estado de la incidencia" style="width:100%;" >}}

Para reanudar la recopilación de errores de una incidencia excluida, selecciona cualquier estado que no sea **EXCLUDED** (EXCLUIDO).


## Historial de problemas
Consulta el historial de la actividad de tu incidencia con la **Cronología de la actividad**. En el panel de detalles de cualquier incidencia de Error Tracking, consulta la cronología de la actividad haciendo clic en la pestaña **Activity** (Actividad).

{{< img src="error_tracking/issue-status-history-3.png" alt="La Cronología de la actividad en la incidencia de Error Tracking" style="width:80%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/services/deployment_tracking
[2]: /es/real_user_monitoring/guide/setup-rum-deployment-tracking/?tab=npm
[3]: /es/getting_started/tagging/unified_service_tagging/
[4]: /es/error_tracking/regression_detection/