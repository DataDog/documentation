---
aliases:
- /es/tracing/error_tracking/executional_context
- /es/tracing/error_tracking/execution_replay/
description: Obtenga información sobre Exception Replay en Error Tracking.
further_reading:
- link: https://www.datadoghq.com/blog/exception-replay-datadog/
  tag: Blog
  text: Simplifique la depuración en producción con Datadog Exception Replay
- link: /tracing/live_debugger
  tag: Documentación
  text: Obtenga información sobre Datadog Live Debugger
- link: /error_tracking/monitors
  tag: Documentación
  text: Obtenga información sobre los monitores de Error Tracking
- link: /tracing/error_tracking
  tag: Documentación
  text: Obtenga información sobre Error Tracking para servicios de backend de APM
is_beta: true
title: Exception Replay en Error Tracking
---
<div class="alert alert-info">
Exception Replay está disponible de forma general para Python, Java, .NET, PHP y está habilitado de forma predeterminada
<a href="#requirements--setup">cuando sea compatible</a>.
</div>

## Descripción general {#overview}

Exception Replay captura el contexto de ejecución y los valores de las variables locales cuando ocurre una excepción, lo que le ayuda a diagnosticar,
reproducir y resolver problemas más rápido. Registra el estado circundante, incluyendo la traza de pila y las
instantáneas de variables, y luego muestra estos datos directamente en Error Tracking junto con el resto de los detalles del problema.

{{< img src="tracing/error_tracking/error_tracking_executional_context-3.png" alt="Explorador de Error Tracking Exception Replay" style="width:90%" >}}

Exception Replay está diseñado para su uso en producción. Las instantáneas están limitadas en frecuencia y los datos confidenciales se redactan automáticamente
[redacted](#sensitive-data-redaction) Cuando está habilitado, espera excepciones en una aplicación y captura instantáneas de
la traza de pila y las variables locales antes de enviarlos a Datadog.

<div class="alert alert-info">
<b>¿Qué productos son compatibles?</b>
Exception Replay solo está disponible para <b>excepciones basadas en APM</b> y no admite errores de Logs o RUM.
</div>

## Requisitos y configuración {#requirements-setup}

Exception Replay es compatible con Python, Java, .NET y PHP, y captura solo excepciones basadas en APM. Requiere
el [Datadog Agent][12] y una [aplicación instrumentada con APM][1]. Puede habilitarlo para todo un
entorno, un servicio individual en la aplicación o un servicio específico mediante variables de entorno.

El método de habilitación depende de su versión del rastreador y de si [Remote Configuration][2] está disponible. Consulte la tabla
a continuación para obtener más detalles.

| | Por entorno<br>(Masivo) | Por servicio<br>(En la aplicación) | Por servicio<br>(Variable de entorno) |
|---|---|---|---|
| **Cómo habilitar** | Habilitado de forma predeterminada | Página de configuración | Variables de entorno |
| **Versión del Agent** | v7.49.0+ | v7.49.0+ | v7.49.0+ |
| **Versiones mínimas del rastreador** | [Python][8] ≥ 3.15.0<br>[Java][9] ≥ 1.54.0<br>[.NET][10] ≥ 3.29.0<br>[PHP][11] ≥ 1.19.0 | [Python][8] ≥ 3.10.0<br>[Java][9] ≥ 1.48.0<br>[.NET][10] ≥ 3.29.0<br>[PHP][11] ≥ 1.19.0 | [Python][8] ≥ 1.16.0<br>[Java][9] ≥ 1.47.0<br>[.NET][10] ≥ 2.53.0<br>[PHP][11] ≥ 1.12.1 |
| **¿Se requiere Remote Configuration?** | Sí | Sí | No |

Para habilitar Exception Replay en la aplicación, navegue a la página de Exception Replay {{< ui >}}Settings{{< /ui >}} en Error Tracking, seleccione el
entorno o servicio deseado y actívelo en {{< ui >}}Enabled{{< /ui >}}.

{{< img src="tracing/error_tracking/error_tracking_exception_replay_enablement.mp4" video="true" alt="Habilitación de Exception Replay a través de la página de configuración" style="width:90%" >}}

Si la habilitación en la aplicación no está disponible, establezca la variable de entorno:

```bash
DD_EXCEPTION_REPLAY_ENABLED=true
```

Esto también se puede usar para anular la configuración en la aplicación y tiene prioridad cuando ambos están establecidos.

### Crear un índice de registros para instantáneas de Exception Replay {#create-a-logs-index-for-exception-replay-snapshots}

Cree un índice de registros dedicado a las instantáneas de Exception Replay y configúrelo con la retención deseada y sin muestreo.

- Establezca el filtro para que coincida con `source:dd_debugger`.
- Asegúrese de que el índice tenga prioridad sobre otros índices que coincidan con esta etiqueta (la primera coincidencia gana).

<div class="alert alert-info">
<b>¿Por qué crear un índice de registros?</b>
Las instantáneas de Exception Replay se emiten como registros enriquecidos con enlaces a los spans de APM de origen.
</div>

### Vincule su código fuente{#link-your-source-code}

Si habilita la integración de código fuente de Datadog, puede ver vistas previas del código directamente dentro de su pila de Error Tracking
trazas. Cuando se capturan las instantáneas de Exception Replay, puede pasar el cursor sobre los nombres de las variables en la vista previa del código para visualizar
sus valores capturados.

{{< img src="tracing/error_tracking/error_tracking_exception_replay_sci.mp4" video="true" alt="Exception Replay con integración de código fuente" style="width:90%" >}}

## Redacción de datos confidenciales{#sensitive-data-redaction}

Exception Replay aplica una redacción automática basada en modos e identificadores para garantizar que los datos confidenciales estén protegidos antes de que las instantáneas estén disponibles.
instantáneas estén disponibles.

### Redacción basada en modo{#mode-based-redaction}

Exception Replay tiene dos modos de redacción:

- {{< ui >}}Strict Mode{{< /ui >}}: Redacta todos los valores excepto números y booleanos.
- {{< ui >}}Targeted Mode{{< /ui >}}: Redacta patrones confidenciales conocidos como números de tarjetas de crédito, claves de API, direcciones IP y otra información de identificación personal (PII). También ejecuta un escáner de secretos de alta entropía que redacta automáticamente los secretos probables, los cuales aparecen como `[REDACTED:HIGH_ENTROPY]` en las instantáneas.

Estos modos de redacción no se pueden desactivar, solo cambiar, y Targeted Mode se aplica automáticamente en casos comunes.
entornos de preproducción como `staging` o `preprod`.

### Redacción basada en identificadores {#identifier-based-redaction}

Los valores de las variables asociados con [identificadores confidenciales comunes][3] (por ejemplo, `password`, `accessToken` y términos similares)
se depuran antes de que las instantáneas salgan del servidor. Se integran reglas de depuración adicionales específicas del lenguaje en cada tracer
(por ejemplo, el tracer de Python mantiene una lista de identificadores confidenciales predeterminados).

Puede ampliar el comportamiento de redacción mediante:

- Redacción personalizada basada en identificadores
- Reglas de redacción basadas en clases/tipos
- Reglas de Sensitive Data Scanner

Consulte las instrucciones de [Dynamic Instrumentation Sensitive Data Scrubbing][4] y la documentación de [Sensitive Data Scanner][5]
para obtener detalles de configuración.

<div class="alert alert-info">
<b>¿Por qué instrucciones de DI?</b>
Exception Replay se basa en <a href="/tracing/dynamic_instrumentation/">Dynamic Instrumentation (DI)</a>, por lo que sus
opciones de configuración de redacción de datos confidenciales también se aplican aquí.
</div>

## Solución de problemas {#troubleshooting}

### Valores de variables faltantes {#missing-variable-values}

Las instantáneas de Exception Replay están limitadas a **una instantánea por tipo de excepción por instancia por hora**. En algunos
entornos de ejecución, una instantánea solo se captura después de la **segunda aparición** de una excepción determinada.

### Razones adicionales por las que una instantánea podría no aparecer {#additional-reasons-a-snapshot-may-not-appear}

- La reproducción de excepciones no está habilitada
- La instantánea ocurrió fuera de la ventana de tiempo seleccionada
- Exclusiones de paquetes de terceros (use `DD_THIRD_PARTY_DETECTION_EXCLUDES` para incluirlos)
- Registros con `source:dd_debugger` faltantes debido a la configuración de retención de [Log Index][6] o a los [Filtros de exclusión][7] en los índices anteriores
- La reproducción de excepciones no está disponible en la región FedRAMP
- Java: En JDK 18 y versiones anteriores, es posible que no se admitan las clases compiladas con el flag `-parameters`. Spring 6+, Spring Boot 3+ y Scala usan este flag de forma predeterminada.

Utilice la consulta `@error.debug_info_captured:true` en Error Tracking Explorer para encontrar errores con Exception Replay
instantáneas.

### Mensajes WARN de BatchUploader en GovCloud (Java) {#batchuploader-warn-messages-on-govcloud-java}

En sitios de GovCloud (`app.ddog-gov.com`), los tracers de Java pueden registrar mensajes WARN periódicos de `com.datadog.debugger.uploader.BatchUploader` con HTTP 403 y texto similar a `This traffic is not permitted on your account`. Esto es normal cuando se intentan realizar cargas relacionadas con el depurador en un sitio donde no se admiten Exception Replay, Dynamic Instrumentation y Code Origin for Spans. La funcionalidad principal de APM (trazas, métricas, perfiles, inyección de registros) no se ve afectada.

Para detener estos mensajes de registro, establezca las siguientes variables de entorno en el pod de la aplicación Java y reinicie la carga de trabajo:

```bash
DD_EXCEPTION_REPLAY_ENABLED=false
DD_DYNAMIC_INSTRUMENTATION_ENABLED=false
DD_CODE_ORIGIN_FOR_SPANS_ENABLED=false
```

Alternativamente, utilice las propiedades del sistema de la JVM:

```bash
-Ddd.exception.replay.enabled=false
-Ddd.dynamic.instrumentation.enabled=false
-Ddd.code.origin.for.spans.enabled=false
```

Para confirmar la corrección, verifique el JSON de inicio del tracer (`DATADOG TRACER CONFIGURATION`) y compruebe que `debugger_exception_enabled`, `debugger_enabled` y `debugger_span_origin_enabled` sean todos `false`. Los mensajes WARN tienen una limitación de frecuencia de aproximadamente una vez cada cinco minutos, por lo que espere al menos ese tiempo después de reiniciar antes de confirmar que los mensajes se han detenido.

## Lecturas adicionales {#further-reading}

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