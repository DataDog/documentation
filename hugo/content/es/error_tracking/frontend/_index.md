---
aliases:
- /es/error_tracking/standalone_frontend/
further_reading:
- link: /error_tracking/standalone_frontend/collecting_browser_errors/
  tag: Documentación
  text: Recopilar errores del navegador
- link: /error_tracking/explorer/
  tag: Documentación
  text: Introducción a Error Tracking Explorer
- link: /error_tracking/issue_states/
  tag: Documentación
  text: Estados y flujos de trabajo de los problemas de Error Tracking
is_beta: true
private: false
title: Error Tracking de frontend
---
## Descripción general {#overview}

{{< img src="real_user_monitoring/error_tracking/rum-et-explorer.png" alt="Los detalles de un problema en Error Tracking Explorer" style="width:100%;" >}}

Es fundamental para la salud de su sistema monitorear constantemente los errores recopilados por Datadog. Cuando hay muchos eventos de error individuales, resulta difícil priorizar los errores para la resolución de problemas.

Error Tracking simplifica la depuración al agrupar miles de errores similares en un solo problema. Error Tracking le permite:

- Rastrear, clasificar y depurar errores fatales
- Agrupar errores similares en problemas para identificar errores importantes y reducir el ruido
- Configurar monitores para eventos de Error Tracking, como un alto volumen de errores o problemas nuevos
- Seguir los problemas a lo largo del tiempo para saber cuándo comenzaron, si aún continúan y con qué frecuencia ocurren
- Ver una línea de tiempo detallada de los pasos que siguió un usuario antes del error, lo que simplifica el proceso para reproducir y resolver errores

## Configuración {#setup}
{{< whatsnext desc="Para comenzar con Datadog Error Tracking, elija una de las siguientes opciones de configuración:" >}}
    {{< nextlink href="/agentic_onboarding/" >}}Agentic Onboarding (solo frontend){{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/browser" >}}Navegador{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/mobile/android" >}}Android{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/mobile/ios" >}}iOS{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/mobile/expo" >}}Expo{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/mobile/reactnative" >}}React Native{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/mobile/flutter" >}}Flutter{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/mobile/kotlin_multiplatform" >}}Kotlin Multiplatform{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/logs" >}}Registros{{< /nextlink >}}
{{< /whatsnext >}}

## Lecturas adicionales {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}