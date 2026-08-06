---
description: Más información sobre el rastreo de errores para Log Management.
further_reading:
- link: https://www.datadoghq.com/blog/error-tracking/
  tag: Blog
  text: Entiende los problemas de las aplicaciones con el seguimiento de errores de
    Datadog
- link: https://www.datadoghq.com/blog/error-tracking-logs/
  tag: Blog
  text: Rastrea y clasifica los errores en tus logs con el rastreo de errores de Datadog
- link: /logs/error_tracking/explorer
  tag: Documentación
  text: Más información sobre Error Tracking Explorer
- link: /monitors/types/error_tracking/
  tag: Documentación
  text: Crear un monitor de rastreo de errores
is_beta: true
title: Seguimiento de errores para Logs
---

## Información general

{{< img src="logs/error_tracking/logs-error-tracking-explorer.png" alt="Los detalles de un problema en el Error Tracking Explorer" style="width:100%;" >}}

{{% error-tracking-description %}}

Echa un vistazo a las principales funciones de rastreo de errores en la documentación de [Error Tracking Explorer][3]. Para ver el Error Tracking Explorer para logs en Datadog, ve a [**Logs** > **Error Tracking**][1] (Logs > Rastreo de errores).

## Ajuste

El rastreo de errores para logs procesa logs de errores configurados con stack traces.

{{< whatsnext desc="Para empezar con el rastreo de errores de Datadog para logs, consulta la documentación correspondiente para tu marco:" >}}
    {{< nextlink href="logs/error_tracking/browser_and_mobile" >}}Navegador y móvil{{< /nextlink >}}
    {{< nextlink href="logs/error_tracking/backend" >}}Backend{{< /nextlink >}}
{{< /whatsnext >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/error-tracking
[2]: /es/logs/log_collection
[3]: /es/error_tracking/explorer