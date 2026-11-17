---
aliases:
- /es/error_tracking/issue_correlation/
- /es/ide_plugins/idea/error_tracking/
- /es/developers/ide_plugins/idea/error_tracking/
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/gitlab-source-code-integration
  tag: Blog
  text: Resuelva problemas más rápido con la integración de GitLab Source Code en
    Datadog
- link: https://www.datadoghq.com/blog/error-tracking-and-github/
  tag: Blog
  text: Solucione las causas raíz con los datos de commits y propiedad de GitHub en
    Error Tracking
- link: https://www.datadoghq.com/blog/go-error-handling/
  tag: Blog
  text: Una guía práctica para el manejo de errores en Go
- link: https://www.datadoghq.com/blog/a-practical-guide-to-react-error-monitoring/
  tag: Blog
  text: Una guía práctica para el monitoreo de errores en React
title: Error Tracking
---
## Descripción general {#overview}

{{< img src="error_tracking/error-tracking-overview-3.png" alt="Los detalles de un problema en Error Tracking Explorer" style="width:100%;" >}}

{{% error-tracking-description %}}

Hay funciones adicionales disponibles según la fuente del error. Consulte [fuentes de error compatibles](#supported-error-sources).

## Primeros pasos {#getting-started}

- Realice un recorrido por las funciones clave de Error Tracking en la documentación del [Error Tracking Explorer][5].
- Utilice los enlaces específicos del producto en la siguiente sección para configurar Error Tracking para una fuente de error en particular.

## Configuración {#setup}
{{< whatsnext desc="Para comenzar con Datadog Error Tracking, elija una de las siguientes opciones de configuración:" >}}
    {{< nextlink href="agentic_onboarding/setup" >}}Agentic Onboarding{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/browser" >}}Navegador{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/mobile/android" >}}Android{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/mobile/ios" >}}iOS{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/mobile/expo" >}}Expo{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/mobile/reactnative" >}}React Native{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/mobile/flutter" >}}Flutter{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/mobile/kotlin_multiplatform" >}}Kotlin Multiplatform{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/logs" >}}Registros{{< /nextlink >}}
{{< /whatsnext >}}

## Fuentes de error compatibles {#supported-error-sources}

Error Tracking captura y procesa errores en sus aplicaciones web, móviles y de backend. Puede instrumentar sus aplicaciones y servicios utilizando el [Browser SDK][6], [Mobile SDK][7] o ingerir errores desde sus Logs, Traces y eventos de Real User Monitoring. 

Hay funciones adicionales disponibles según la fuente del error. Por ejemplo, en errores que se originan a partir de un trace de APM, la función [Exception Replay][4] captura automáticamente los valores de las variables de producción. 

Para obtener más detalles, consulte la documentación de Error Tracking específica del producto:

- [APM][1]
- [Log Management][2]
- [Real User Monitoring][3]

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/error_tracking#setup
[2]: /es/logs/error_tracking#setup
[3]: /es/real_user_monitoring/error_tracking#setup
[4]: /es/error_tracking/backend/exception_replay
[5]: /es/error_tracking/explorer
[6]: /es/error_tracking/frontend/browser
[7]: /es/error_tracking/frontend/mobile