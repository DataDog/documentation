---
aliases:
- /es/error_tracking/standalone_frontend/
further_reading:
- link: /error_tracking/standalone_frontend/collecting_browser_errors/
  tag: Documentación
  text: Recopilar errores del navegador
- link: /error_tracking/explorer/
  tag: Documentación
  text: Empezando con Error Tracking Explorer
- link: /error_tracking/issue_states/
  tag: Documentación
  text: Estados de problemas y flujos de trabajo de Error Tracking
is_beta: true
private: false
title: Error Tracking en el frontend
---

## Información general

{{< img src="real_user_monitoring/error_tracking/rum-et-explorer.png" alt="Detalles de un problema en el Error Tracking Explorer" style="width:100%;" >}}

Es fundamental para el estado de tu sistema que monitorice sistemáticamente los errores recopilados por Datadog. Cuando hay muchos eventos de errores individuales, se hace difícil priorizar los errores para solucionar problemas.

Error Tracking simplifica la depuración agrupando miles de errores similares en un único problema. Error Tracking te permite:

- Seguimiento, clasificación y depuración de errores fatales
- Agrupa errores similares en problemas, para poder identificar más fácilmente los errores importantes y reducir el ruido.
- Establece monitores en los eventos de seguimiento de errores, como un alto volumen de errores o nuevas emisiones.
- Haz un seguimiento de los problemas a lo largo del tiempo para saber cuándo empezaron, si siguen existiendo y con qué frecuencia se producen.
- Ve una cronología detallada de los pasos que siguió un usuario hasta que se produjo el error, lo que simplifica lel proceso para reproducir y resolver errores rápidamente.

## Configuración
{{< whatsnext desc="Para comenzar con Datadog Error Tracking, consulta la siguiente documentación:" >}}
    {{< nextlink href="error_tracking/frontend/browser" >}}Navegador{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/mobile/android" >}}Android{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/mobile/ios" >}}iOS{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/mobile/expo" >}}Expo{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/mobile/reactnative" >}}React Native{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/mobile/flutter" >}}Flutter{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/mobile/kotlin_multiplatform" >}}Kotlin Multiplatform{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/logs" >}}Logs{{< /nextlink >}}
{{< /whatsnext >}}

## Referencias adicionales
{{< partial name="whats-next/whats-next.html" >}}