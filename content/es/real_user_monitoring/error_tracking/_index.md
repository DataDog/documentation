---
algolia:
  tags:
  - seguimiento de errores
description: Aprende a buscar y gestionar los errores recopilados de tus aplicaciones
  web y móviles.
further_reading:
- link: https://www.datadoghq.com/blog/error-tracking/
  tag: Blog
  text: Entender los problemas de las aplicaciones con el seguimiento de errores de
    Datadog
- link: https://www.datadoghq.com/blog/ios-crash-reporting-datadog
  tag: Blog
  text: Depuración eficaz de fallos de iOS con RUM en Datadog
- link: https://www.datadoghq.com/blog/how-datadogs-tech-solutions-team-rum-session-replay/
  tag: Blog
  text: Cómo el equipo de Soluciones técnicas de Datadog utiliza RUM, Session Replay
    y el Seguimiento de errores para solucionar los problemas de los clientes
- link: https://www.datadoghq.com/blog/error-tracking-logs/
  tag: Blog
  text: Seguimiento y clasificación de errores en tus logs con el seguimiento de errores
    de Datadog
- link: /real_user_monitoring/error_tracking/explorer
  tag: Documentación
  text: Más información sobre el Explorador de seguimiento de errores
- link: /monitors/types/error_tracking/
  tag: Documentación
  text: Creación de un monitor para el seguimiento de errores
title: Seguimiento de errores en aplicaciones web y móviles
---

## Información general

{{< img src="real_user_monitoring/error_tracking/rum-et-explorer.png" alt="Detalles de un problema en el Explorador de seguimiento de errores" style="width:100%;" >}}

{{% error-tracking-description %}}

Los problemas de errores RUM incluyen la traza (trace) de stack tecnológico, las líneas de tiempo de las sesiones de usuario y los metadatos, incluidos la localización del usuario, la versión y cualquier atributo personalizado que hayas incluido en tus informes de errores.

Eche un vistazo a las principales funciones de seguimiento de errores en la documentación [Explorador de seguimiento de errores][3]. Para ver el Explorador de seguimiento de errores para RUM, ve a [**Experiencia digital** > **Seguimiento de errores**][1].

## Configuración

{{< whatsnext desc="Para empezar con el seguimiento de errores de Datadog para RUM, consulta la documentación correspondiente:" >}}
    {{< nextlink href="real_user_monitoring/error_tracking/browser" >}}Browser{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/android" >}}Android{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/ios" >}}iOS{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/expo" >}}Expo{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/reactnative" >}}React Native{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/flutter" >}}Flutter{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/roku" >}}Roku{{< /nextlink >}}
{{< /whatsnext >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: /es/real_user_monitoring/
[3]: /es/error_tracking/explorer