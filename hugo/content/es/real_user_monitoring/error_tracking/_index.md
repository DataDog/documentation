---
algolia:
  tags:
  - error tracking
description: Aprenda a buscar y gestionar los errores recopilados de sus aplicaciones
  web y móviles.
further_reading:
- link: https://www.datadoghq.com/blog/error-tracking/
  tag: Blog
  text: Entienda los problemas de las aplicaciones con Datadog Error Tracking
- link: https://www.datadoghq.com/blog/ios-crash-reporting-datadog
  tag: Blog
  text: Depure fallos de iOS de manera eficiente con Datadog RUM
- link: https://www.datadoghq.com/blog/how-datadogs-tech-solutions-team-rum-session-replay/
  tag: Blog
  text: Cómo el equipo de Soluciones Técnicas de Datadog utiliza RUM, Session Replay
    y Error Tracking para resolver problemas de los clientes
- link: https://www.datadoghq.com/blog/error-tracking-logs/
  tag: Blog
  text: Rastree y clasifique errores en sus registros con Datadog Error Tracking
- link: /real_user_monitoring/error_tracking/explorer
  tag: Documentación
  text: Aprenda sobre Error Tracking Explorer
- link: /monitors/types/error_tracking/
  tag: Documentación
  text: Cree un monitor de Error Tracking
title: Error Tracking para aplicaciones web y móviles
---
## Descripción general {#overview}

{{< img src="real_user_monitoring/error_tracking/rum-error-tracking-explorer-1.png" alt="Los detalles de un problema en Error Tracking Explorer" style="width:100%;" >}}

{{% error-tracking-description %}}

Los problemas de los errores de RUM incluyen la traza de pila, las líneas de tiempo de la sesión del usuario y los metadatos, incluida la ubicación del usuario, la versión y cualquier atributo personalizado que haya incluido en sus informes de fallos.

Realice un recorrido por las funciones clave de Error Tracking en la documentación del [Error Tracking Explorer][3]. Para ver el Error Tracking Explorer para RUM, navegue a [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Error Tracking{{< /ui >}}][1].

## Configuración {#setup}

{{< whatsnext desc="Para comenzar con Datadog Error Tracking para RUM, consulte la documentación correspondiente:" >}}
    {{< nextlink href="real_user_monitoring/error_tracking/browser" >}}Navegador{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/application_monitoring/electron/error_tracking" >}}Electron{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/android" >}}Android{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/ios" >}}iOS{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/expo" >}}Expo{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/reactnative" >}}React Native{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/flutter" >}}Flutter{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/roku" >}}Roku{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/kotlin_multiplatform" >}}Kotlin Multiplatform{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/maui" >}}.NET MAUI{{< /nextlink >}}
{{< /whatsnext >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: /es/real_user_monitoring/
[3]: /es/error_tracking/explorer