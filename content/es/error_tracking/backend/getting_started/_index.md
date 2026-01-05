---
aliases:
- /es/error_tracking/standalone_backend/getting_started
further_reading:
- link: /error_tracking/issue_states/
  tag: Documentación
  text: Estados de problemas y flujos de trabajo de Error Tracking
- link: /error_tracking/backend/exception_replay
  tag: Documentación
  text: Simplifica la depuración de la producción con Datadog Exception Replay
- link: /error_tracking/explorer
  tag: Documentación
  text: Más información sobre el Explorador de seguimiento de errores
title: Empezando
---

## Información general

[Error Tracking][1] procesa errores recopilados por bibliotecas de rastreo de Datadog. Cada vez que se recopila un error, Error Tracking lo procesa y lo agrupa bajo un problema o grupo de errores similares.

## Empezando con el Seguimiento de errores de backend

Sigue las [instrucciones de configuración en la aplicación][2] o elige entre la instrumentación de un solo paso y manual para empezar a recopilar errores de backend.

{{< whatsnext desc="Elige entre los siguientes métodos de instrumentación:">}}
    {{< nextlink href="/error_tracking/backend/getting_started/single_step_instrumentation" >}}Instrumentación de un solo paso{{< /nextlink >}}
    {{< nextlink href="/error_tracking/backend/getting_started/dd_libraries" >}}Instrumentación manual{{< /nextlink >}}
{{< /whatsnext >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/error-tracking
[2]: https://app.datadoghq.com/error-tracking/settings/setup/backend