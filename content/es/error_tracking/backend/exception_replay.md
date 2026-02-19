---
aliases:
- /es/tracing/error_tracking/executional_context
- /es/tracing/error_tracking/execution_replay/
description: Conoce más sobre Exception Replay para el seguimiento de errores.
further_reading:
- link: https://www.datadoghq.com/blog/exception-replay-datadog/
  tag: Blog
  text: Simplifica la depuración de la producción con Datadog Exception Replay
- link: /tracing/live_debugger
  tag: Documentación
  text: Más información sobre Datadog Live Debugger
- link: /error_tracking/monitors
  tag: Documentación
  text: Más información sobre los monitores de seguimiento de errores
- link: /tracing/error_tracking
  tag: Documentación
  text: Más información sobre Error Tracking en servicios de backend de APM
is_beta: true
title: Exception Replay en Error Tracking
---

<div class="alert alert-info">
Exception Replay está generalmente disponible para Python, Java, .NET, PHP, y está habilitada por defecto
<a href="#requirements--setup">cuando es compatible</a>.
</div>

## Información general

Exception Replay captura el contexto de ejecución y los valores de las variables locales cuando se produce una excepción, ayudándote a diagnosticar,
reproducir y resolver problemas más rápidamente. Registra el estado circundante, incluido el stack trace y los snapshots
de variables y, luego, muestra estos datos directamente en Error Tracking junto con el resto de los detalles del problema.

{{< img src="tracing/error_tracking/error_tracking_executional_context-3.png" alt="Error Tracking Explorer con Exception Replay" style="width:90%" >}}

Exception Replay está diseñado para su uso en producción. Los snapshots tienen una velocidad limitada y los datos confidenciales se
[redactan](#sensitive-data-redaction) automáticamente. Cuando está activada, espera excepciones en una aplicación y captura snapshots del
stack trace y las variables locales antes de reenviarlas a Datadog.

<div class="alert alert-info">
<b>¿Qué productos son compatibles?</b>
Exception Replay solo está disponible para <b>excepciones basadas en APM</b> y no admite errores de Logs o RUM.
</div>

## Requisitos y configuración

Exception Replay es compatible con Python, Java, .NET y PHP, y solo captura excepciones basadas en APM. Requiere
el [Datadog Agent][12] y una [aplicación instrumentada por APM][1]. Se puede activar para todo un
entorno, un servicio individual dentro de la aplicación, o un servicio específico utilizando variables de entorno.

El método de activación depende de la versión del rastreador y de si está disponible [Remote Configuration][2]. Consulta la tabla
para más detalles.

| | Por entorno<br>(en bloque) | Por servicio<br>(dentro de la aplicación) | Por servicio<br>(Variable de entorno) |
|---|---|---|---|
| **Cómo habilitar** | Habilitado por defecto | Página de configuración | Variables de entorno |
| **Versión del Agent** | v7.49.0+ | v7.49.0+ | v7.49.0+ |
| **Versiones mínimas de rastreador** | [Python][8] ≥ 3.15.0<br>[Java][9] ≥ 1.54.0<br>[.NET][10] ≥ 3.29.0 | [Python][8] ≥ 3.10.0<br>[Java][9] ≥ 1.48.0<br>[.NET][10] ≥ 3.29.0 | [Python][8] ≥ 1.16.0<br>[Java][9] ≥ 1.47.0<br>[.NET][10] ≥ 2.53.0<br>[PHP][11] ≥ 1.12.1 |
| **¿Requiere Remote Configuration?** | Sí | Sí | No |

Para activar Exception Replay en la aplicación, ve a la página **Settings** (Configuración) de Exception Replay en Error Tracking, selecciona el
entorno o servicio deseado y cámbialo a **Enabled** (Habilitado).

{{< img src="tracing/error_tracking/error_tracking_exception_replay_enablement.mp4" video="true" alt="Habilitar Exception Replay mediante la página de configuración" style="width:90%" >}}

Si la habilitación dentro de la aplicación no está disponible, establece la variable de entorno:

```bash
DD_EXCEPTION_REPLAY_ENABLED=true
```

También se puede utilizar para anular la configuración dentro de la aplicación y tiene prioridad cuando se establecen ambas.

### Crear un índice de logs para los snapshots de Exception Replay

Crea un índice de logs dedicado a los snapshots de Exception Replay y configúralo con la retención deseada y sin muestreo.

- Ajusta el filtro para que coincida con `source:dd_debugger`.
- Asegúrate de que el índice tiene prioridad sobre otros índices que coincidan con esta etiqueta (la primera coincidencia gana).

<div class="alert alert-info">
<b>¿Por qué crear un índice de logs?</b>
Los snapshots de Exception Replay se emiten como logs enriquecidos con enlaces a los tramos originarios de APM.
</div>

### Vincular tu código fuente

Si habilitas la integración de código fuente de Datadog, podrás ver vistas previas del código directamente dentro de los stack traces de
Error Tracking. Cuando se capturan snapshots de Exception Replay, puedes pasar el cursor sobre los nombres de las variables en la vista previa del código para ver sus
valores capturados.

{{< img src="tracing/error_tracking/error_tracking_exception_replay_sci.mp4" video="true" alt="Exception Replay con integración de código fuente" style="width:90%" >}}

## Redacción de datos confidenciales

Exception Replay aplica una redacción automática basada en modos e identificadores para garantizar la protección de los datos confidenciales antes de que
los snapshots estén disponibles.

### Redacción por modos

Exception Replay tiene dos modos de redacción:

- **Modo estricto:** redacta todos los valores excepto números y booleanos.
- **Modo dirigido:** redacta patrones confidenciales conocidos como números de tarjetas de crédito, claves de API, IPs y otra PII.

Estos modos de redacción no pueden desactivarse, solo conmutarse, y el modo específico se aplica automáticamente en entornos de
preproducción como `staging` o `preprod`.

### Redacción basada en identificadores

Los valores de las variables asociados a [identificadores confidenciales comunes][3] (por ejemplo, `password`, `accessToken` y términos similares)
se depuran antes de que los snapshots salgan del host. Cada rastreador incorpora reglas adicionales de redacción específicas del lenguaje
(por ejemplo, el rastreador de Python mantiene una lista de identificadores confidenciales por defecto).

Puedes ampliar el comportamiento de redacción a través de:

- Redacción personalizada basada en identificadores
- Reglas de redacción por clase/tipo
- Reglas de Sensitive Data Scanner

Consulta la documentación [Dynamic Instrumentation Sensitive Data Scrubbing instructions][4] y [Sensitive Data Scanner][5]
para más detalles sobre la configuración.

<div class="alert alert-info">
<b>¿Por qué la instrucciones de DI?</b>
Exception Replay se basa en <a href="/tracing/dynamic_instrumentation/">Dynamic Instrumentation (DI)</a>, por lo que sus
opciones de configuración de depuración de datos confidenciales también se aplican aquí.
</div>

## Solucionar problemas

### Valores faltantes de las variables

Los snapshots de Exception Replay están limitados a **un snapshot por tipo de excepción, por instancia y por hora**. En algunos
tiempos de ejecución, un snapshot solo se captura después de la **segunda ocurrencia** de una excepción dada.

### Otras razones por las que puede no aparecer un snapshot

- Exception Replay no habilitada
- El snapshot se produjo fuera del intervalo temporal seleccionado
- Exclusiones de paquetes de terceros (utiliza `DD_THIRD_PARTY_DETECTION_EXCLUDES` para incluirlos)
- Logs en los que falta `source:dd_debugger` debido a la configuración de retención del [Índice de logs][6] o [Filtros de exclusión][7] en índices anteriores
- Exception Replay no está disponible en la región FedRAMP
- Java: En JDK 18 o anteriores, es posible que las clases compiladas con el indicador `-parameters` no sean compatibles. Spring 6+, Spring Boot 3+ y Scala utilizan este indicador por defecto.

Utiliza la consulta `@error.debug_info_captured:true` en Error Tracking Explorer para encontrar errores con snapshots de
Exception Replay.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/
[2]: /es/tracing/guide/remote_config
[3]: https://github.com/DataDog/dd-trace-py/blob/main/ddtrace/debugging/_redaction.py
[4]: /es/dynamic_instrumentation/sensitive-data-scrubbing/
[5]: /es/security/sensitive_data_scanner/
[6]: https://app.datadoghq.com/logs/pipelines/indexes
[7]: /es/logs/log_configuration/indexes/#exclusion-filters
[8]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/python/
[9]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
[10]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core
[11]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/php
[12]: /es/agent/