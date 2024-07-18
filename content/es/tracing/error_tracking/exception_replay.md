---
aliases:
- /es/tracing/error_tracking/executional_context
- /es/tracing/error_tracking/execution_replay/
description: Conoce más sobre Exception Replay para el seguimiento de errores.
further_reading:
- link: /monitors/types/error_tracking
  tag: Documentación
  text: Más información sobre los monitores de seguimiento de errores
- link: /tracing/error_tracking
  tag: Documentación
  text: Más información sobre el seguimiento de errores para los servicios de backend
- link: https://www.datadoghq.com/blog/exception-replay-datadog/
  tag: Blog
  text: Simplifica la depuración de la producción con Datadog Exception Replay
is_beta: true
title: Exception Replay para el seguimiento de errores
---

<div class="alert alert-info">
Exception Replay para el seguimiento de errores de APM está en fase beta.
</div>

## Información general

Exception Replay en el seguimiento de errores de APM captura automáticamente los valores de las variables de producción para que puedas reproducir las excepciones de los problemas del seguimiento de errores.

{{< img src="tracing/error_tracking/error_tracking_executional_context-2.png" alt="Exception Replay en Error Tracking Explorer" style="width:90%" >}}

## Requisitos
Lenguajes admitidos
: Python, Java, .NET

- El Datadog Agent debe estar configurado para APM.
- La aplicación debe instrumentarse con:
  - `ddtrace` para Python
  - `dd-trace-java` para Java
  - `dd-trace-dotnet` para .NET

Exception Replay solo está disponible en el seguimiento de errores de APM. No se admite el seguimiento de errores para logs y RUM.

## Configuración

1. Instala o actualiza el Agent a la versión `7.44.0` o superior.
2. Asegúrate de estar utilizando:
  * `ddtrace` versión `1.16.0` o superior.
  * `dd-trace-java` versión `1.35.0` o superior.
  * `dd-trace-dotnet` versión `2.53.0` o superior.
4. Establece la variable de entorno`DD_EXCEPTION_DEBUGGING_ENABLED` en `true` para ejecutar el servicio con Exception Replay habilitado para el seguimiento de errores.

### Ocultar datos confidenciales

Por defecto, los datos de variables vinculados a identificadores específicos considerados confidenciales, como `password` y `accessToken`, se ocultan automáticamente. Vea la [lista completa de identificadores ocultos][1].

También puedes depurar datos de variables para PII con estas acciones:
- [Ocultar identificadores de forma personalizada][2].
- [Ocultar con base en clases o tipos específicos][3].
- Crear una regla de [Sensitive Data Scanner][4] y aplicarla a los logs que coincidan con la consulta `dd_source:debugger`.

Para obtener más información sobre la depuración de datos de variables, consulta [Depuración de datos confidenciales de instrumentación dinámica][5].

## Empezando

1. Ve a [**APM** > **Error Tracking** (Seguimiento de errores)][6].
2. Haz clic en cualquier problema del seguimiento de errores de Python y desplázate hacia abajo hasta el componente de stack trace.
3. Expande los marcos del stack para examinar los valores de las variables capturadas.

## Solucionar problemas

### Una traza (trace) de error específica de Python no tiene valores de variables
Para mantener la sobrecarga de rendimiento de la función al mínimo, la captura de errores está limitada a una tasa: un error por segundo incluye datos de variables. Si no ves valores de variables en una determinada traza (trace):

1. Haz clic en **View Similar Errors** (Ver errores similares).
2. Amplía la selección del intervalo de tiempo para encontrar otro caso de excepción en el que se hayan capturado valores de variables.

[1]: https://github.com/DataDog/dd-trace-py/blob/2bd8e73b639af811cee2703198aa9e7e32b2f74e/ddtrace/debugging/_redaction.py
[2]: /es/dynamic_instrumentation/sensitive-data-scrubbing/#custom-identifier-redaction
[3]: /es/dynamic_instrumentation/sensitive-data-scrubbing/#redact-based-on-specific-classes-or-types
[4]: /es/sensitive_data_scanner/
[5]: /es/dynamic_instrumentation/sensitive-data-scrubbing/
[6]: https://app.datadoghq.com/apm/error-tracking

## Leer más

{{< partial name="whats-next/whats-next.html" >}}