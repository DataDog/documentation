---
description: Más información sobre cómo un error resuelto se vuelve a abrir automáticamente
  mediante la detección de regresiones.
further_reading:
- link: /error_tracking/issue_states/
  tag: Documentación
  text: Estados de problemas en el rastreo de errores
title: Detección de regresiones
---

## Información general

Una regresión se refiere a la reaparición no intencionada de un error o un problema que se solucionó previamente. En Datadog, los problemas resueltos se vuelven a abrir automáticamente mediante la detección de regresiones para que puedas ver todo el contexto de los problemas sin duplicar información.

## Reapertura automática mediante detección de regresiones

Si un error **RESUELTO** se repite en una versión más reciente del código o el error vuelve a producirse en el código sin versiones, el rastreo de errores activa una regresión. El problema pasa al estado **PARA REVISIÓN** y se le coloca una etiqueta (tag) de **Regresión**:

{{< img src="error_tracking/regression-detection.png" alt="Los detalles de la regresión en el rastreo de errores" style="width:90%;" >}}

Las regresiones tienen en cuenta las versiones de tu servicio en las que se sabe que se produce el error y sólo se activan en las nuevas versiones después de que un problema se marque como **RESUELTO**. Configura tus servicios con etiquetas (tags) de la versión (consulta las instrucciones para [APM][1], [RUM][2] y [Logs][3]) para garantizar que los problemas se resuelvan automáticamente sólo si los mismos errores se producen en versiones más recientes de tus servicios.

Si no tienes configuradas las etiquetas (tags) de la versión, los problemas se etiquetan con **Regresión** cuando se produce un error en un problema marcado como **RESUELTA**.

También puedes configurar [monitores][4] para que te avisen cuando se produzcan regresiones.

## Actualización del estado del problema

El estado de un problema aparece en cualquier lugar donde se pueda ver, como en la lista de problemas o en el panel de detalles de un problema determinada. Para actualizar manualmente el estado de un problema, haz clic en el estado y selecciona otro en el menú desplegable.

{{< img src="error_tracking/updating-issue-status.png" alt="La escala de tiempo de la actividad en el problema de rastreo de errores" style="width:100%;" >}}

## Historial de problemas
Mira un historial de la actividad de tu problema con la **Escala de tiempo de la actividad**. En el panel de detalles de cualquier problema de rastreo de errores, mira la escala de tiempo de la actividad haciendo clic en la pestaña **Actividad**. 

{{< img src="error_tracking/issue-status-history.png" alt="La escala de tiempo de la actividad en el problema de rastreo de errores" style="width:80%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/services/deployment_tracking
[2]: /es/real_user_monitoring/guide/setup-rum-deployment-tracking/?tab=npm
[3]: /es/getting_started/tagging/unified_service_tagging/
[4]: /es/monitors/types/error_tracking/