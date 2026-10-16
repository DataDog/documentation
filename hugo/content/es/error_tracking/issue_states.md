---
further_reading:
- link: /error_tracking/regression_detection/
  tag: Documentación
  text: Detección de regresiones
title: Estados de las incidencias de Error Tracking
---
## Descripción general {#overview}

Todas las incidencias en Error Tracking tienen un estado para ayudarle a clasificar y priorizar incidencias o descartar ruido. Existen cinco estados:

- {{< ui >}}FOR REVIEW{{< /ui >}}: Incidencias nuevas o regresivas que requieren atención.
- {{< ui >}}REVIEWED{{< /ui >}}: Incidencias clasificadas que deben corregirse, ahora o más tarde.
- {{< ui >}}RESOLVED{{< /ui >}}: Incidencias que han sido corregidas y ya no ocurren.
- {{< ui >}}IGNORED{{< /ui >}}: Incidencias que no requieren más investigación ni acción.
- {{< ui >}}EXCLUDED{{< /ui >}}: Incidencias que no requieren más investigación, dejan de recopilar nuevos errores y ya no cuentan para el uso o la facturación

Todas las incidencias comienzan con un estado FOR REVIEW. Error Tracking actualiza automáticamente el estado en los casos descritos a continuación, o puede [actualizar el estado manualmente](#updating-an-error-status). También puede [visualizar el historial](#issue-history) de los cambios de estado de un error determinado.

El siguiente diagrama muestra cómo se actualizan los estados de Error Tracking de forma automática y manual:
{{< img src="error_tracking/issue-states-diagram.png" alt="Estados de las incidencias de Error Tracking" style="width:75%;" >}}

## Revisión automática {#automatic-review}

Error Tracking marca automáticamente las incidencias como {{< ui >}}REVIEWED{{< /ui >}} si se ha realizado una de las siguientes acciones:

- La incidencia ha sido asignada
- Se ha creado un elemento de trabajo a partir de la incidencia

{{< img src="error_tracking/auto-review-actions-2.png" alt="Acciones de revisión automática de Error Tracking" style="width:75%;" >}}

## Resolución automática {#automatic-resolution}

Error Tracking marca automáticamente como {{< ui >}}RESOLVED{{< /ui >}} las incidencias que parecen estar inactivas o resueltas debido a la falta de ocurrencias de errores recientes:

- Si el problema se reportó por última vez en una versión de hace más de 14 días y se ha lanzado una versión más reciente que no reporta el mismo error, Error Tracking resuelve automáticamente el problema. Configure sus servicios con etiquetas de versión (consulte las instrucciones para [APM][1], [RUM][2] y [Logs][3]) para asegurarse de que la resolución automática tenga en cuenta las versiones de sus servicios.
- Si no se han configurado las etiquetas `version`, Error Tracking resuelve automáticamente un problema si no se han reportado errores nuevos para ese problema en los últimos 14 días.

**Nota**: La lógica de resolución automática no toma en cuenta `version`.

## Reapertura automática mediante detección de regresiones {#automatic-re-opening-through-regression-detection}

Consulte [Detección de regresiones][4].

## Actualización del estado del problema {#updating-the-issue-status}

El estado del problema aparece dondequiera que se pueda ver el problema, como en la lista de problemas o en el panel de detalles de un problema determinado. Para actualizar manualmente el estado de un problema, haga clic en el estado y elija uno diferente en el menú desplegable.

{{< img src="error_tracking/updating-issue-status.png" alt="La línea de tiempo de actividad en el problema de Error Tracking" style="width:100%;" >}}

## Excluir un problema {#excluding-an-issue}

El estado `EXCLUDED` le permite evitar que se rastreen errores específicos, asegurando que no se recopilen ni se contabilicen para la facturación. Esto le ayuda a eliminar errores que no requieren acción o problemas causados por fallas esperadas sin necesidad de reglas de exclusión complejas.

Para excluir un problema, haga clic en su estado y elija {{< ui >}}EXCLUDED{{< /ui >}} en el menú desplegable. Los problemas excluidos siguen siendo accesibles en la pestaña {{< ui >}}IGNORED{{< /ui >}}. Puede revisar su historial en cualquier momento.

{{< img src="error_tracking/issue-states-excluded.png" alt="Excluido en el menú desplegable de estado del problema" style="width:100%;" >}}

Para reanudar la recopilación de errores de un problema excluido, seleccione cualquier estado que no sea {{< ui >}}EXCLUDED{{< /ui >}}.


## Historial del problema {#issue-history}
Visualice un historial de la actividad de su problema con el {{< ui >}}Activity Timeline{{< /ui >}}. En el panel de detalles de cualquier problema de Error Tracking, visualice la Cronología de actividad haciendo clic en la pestaña {{< ui >}}Activity{{< /ui >}}.

{{< img src="error_tracking/issue-status-history-3.png" alt="La línea de tiempo de actividad en el problema de Error Tracking" style="width:80%;" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/services/deployment_tracking
[2]: /es/real_user_monitoring/guide/setup-rum-deployment-tracking/?tab=npm
[3]: /es/getting_started/tagging/unified_service_tagging/
[4]: /es/error_tracking/regression_detection/