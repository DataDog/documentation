---
further_reading:
- link: /error_tracking/explorer/
  tag: Documentación
  text: Empezando con Error Tracking Explorer
- link: /error_tracking/issue_states/
  tag: Documentación
  text: Estados de problemas y flujos de trabajo de Error Tracking
- link: /error_tracking/backend/exception_replay
  tag: Documentación
  text: Simplifica la depuración de la producción con Datadog Exception Replay
is_beta: true
private: true
title: Error Tracking en el backend
---

{{< callout url="https://www.datadoghq.com/product-preview/backend-error-tracking/" btn_hidden="false" header="false">}}
Error Tracking en el backend individual de Datadog está en Vista previa. Si estás interesado en esta característica, completa el formulario para solicitar acceso.
{{< /callout >}}


## Información general

{{< img src="real_user_monitoring/error_tracking/rum-et-explorer.png" alt="Detalles de un problema en el Explorador de seguimiento de errores" style="width:100%;" >}}

Es fundamental para el estado de tu sistema que monitorice sistemáticamente los errores recopilados por Datadog. Cuando hay muchos eventos de errores individuales, se hace difícil priorizar los errores para solucionar problemas.

Error Tracking simplifica la depuración agrupando miles de errores similares en un único problema. Error Tracking te permite:

- Seguimiento, clasificación y depuración de errores fatales
- Agrupa errores similares en problemas, para poder identificar los errores importantes y reducir el ruido.
- Establece monitores en los eventos de seguimiento de errores, como un alto volumen de errores o nuevas emisiones.
- Haz un seguimiento de los problemas a lo largo del tiempo para saber cuándo empezaron, si siguen existiendo y con qué frecuencia se producen.
- Captura automáticamente los valores de las variables locales para poder reproducir las excepciones, lo que simplifica el proceso para resolver los errores rápidamente.

## Referencias adicionales
{{< partial name="whats-next/whats-next.html" >}}