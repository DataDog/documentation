---
description: Aprende a instrumentar, utilizar y optimizar el SDK de rastreo de Datadog
  para aplicaciones nativas de iOS y Android.
further_reading:
- link: /real_user_monitoring/connect_rum_and_traces
  tag: Documentación
  text: Conectar RUM y trazas (traces)
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/ios
  tag: Documentación
  text: SDK de rastreo de iOS
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/android/
  tag: Documentación
  text: SDK de rastreo de Android
- link: /tracing/trace_collection/custom_instrumentation/ios/otel/
  tag: Documentación
  text: OpenTelemetry para iOS
- link: /tracing/trace_collection/custom_instrumentation/android/otel/
  tag: Documentación
  text: OpenTelemetry para Android
title: Prácticas recomendadas para el rastreo de aplicaciones nativas de iOS y Android
---

# Información general

El rastreo móvil nativo te ofrece un control preciso de las operaciones que se miden mediante la instrumentación manual de tramos (spans) en el código de tu aplicación para iOS o Android. Esta estrategia funciona independientemente de Datadog RUM, pero también se puede utilizar junto a Datadog RUM para obtener una visibilidad más profunda de las experiencias de usuario, el rendimiento a nivel de código y las interacciones de backend. También puedes utilizar [OpenTelemetry para iOS][3] o [OpenTelemetry para Android][4] para una instrumentación personalizada.

El SDK de rastreo de Datadog para [iOS][1] y [Android][2] te permite añadir tramos a tus aplicaciones móviles. Esta guía cubre el uso, los casos de uso clave y las frecuencias de muestreo, con o sin el uso del SDK de Datadog RUM.

**Nota**: Cuando se utiliza el SDK de rastreo de forma independiente (sin el SDK de RUM), los tramos raíz de solicitudes de red salientes no se crean automáticamente. Por lo tanto, es necesario iniciar y detener manualmente los tramos del lado del cliente para crear trazas APM distribuidas de frontend a backend.

Esta guía se centra en las aplicaciones nativas para iOS y Android. Para otras plataformas móviles, consulta la documentación siguiente:

- [React Native RUM y APM][8]
- [Flutter RUM y APM][9]
- [Kotlin Multiplataforma RUM y APM][10]
- [Unity RUM y APM][11]

Para obtener información general de la correlación de RUM con otros datos de telemetría, consulta [Correlacionar RUM con otros datos de telemetría][12].

## Casos prácticos

### Envolver una traza distribuida de frontend a backend bajo un tramo nativo

Puedes crear trazas distribuidas que vayan desde tu frontend móvil a tus servicios backend. El SDK de RUM ofrece una forma automatizada de generar tramos de cliente para solicitudes de red salientes. El SDK de rastreo de Datadog proporciona una funcionalidad similar, pero también te permite envolver una o más trazas de frontend a backend bajo tramos creados manualmente.

{{< tabs >}}
{{% tab "iOS" %}}
Utiliza la [propagación manual del contexto][1] (consultar el paso 8) para inyectar cabeceras en solicitudes de red. Utiliza `setActive()` para vincular tramos secundarios a la ([referencia de la API][2]) del tramo principal.

[1]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/ios?tab=swiftpackagemanagerspm
[2]: https://swiftpackageindex.com/datadog/dd-sdk-ios/develop/documentation/datadogtrace/otspan/setactive()

{{% /tab %}}
{{% tab "Android" %}}

Utiliza [ayudantes de tramos principales OkHttp][1] (consultar el paso 10 en la página vinculada) o [OpenTelemetry addParentSpan][2] para vincular tramos a través de subprocesos.

[1]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/android/?tab=kotlin#okhttp
[2]: /es/tracing/trace_collection/custom_instrumentation/android/otel/?tab=kotlin

{{% /tab %}}
{{< /tabs >}}

**Nota**: Envolver tramos de recursos RUM bajo un tramo nativo funciona automáticamente si el tramo principal está en el mismo subproceso que la llamada de red. De lo contrario, utiliza los ayudantes proporcionados para configurar el tramo principal manualmente.

### Perfiles de rendimiento de aplicaciones nativas

Instrumentar varios tramos nativos y vincularlos (utilizando `setActive` en iOS o `activateSpan` en Android) te permite perfilar partes clave de tu aplicación. Esto te ayuda a:
- Comprender cómo interactúan los distintos métodos y componentes
- Acabar con los cuellos de botella en el rendimiento
- Obtener información práctica sobre el comportamiento de las aplicaciones

A continuación se explica cómo instrumentar manualmente un tramo en tu aplicación móvil utilizando el SDK de rastreo:

{{< tabs >}}
{{% tab "iOS" %}}
```swift
let span = tracer.startSpan(operationName: "<span_name>")
// ... code to measure ...
span.finish()
```
Consulta [más ejemplos de iOS][1].

[1]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/ios?tab=swiftpackagemanagerspm

{{% /tab %}}
{{% tab "Android" %}}

{{% android-otel-note %}}

Estrategia OpenTelemetry (recomendado):
```kotlin
import io.opentelemetry.api.GlobalOpenTelemetry
import io.opentelemetry.api.trace.Tracer

val tracer: Tracer = GlobalOpenTelemetry.get().getTracer("<tracer_name>")
val span = tracer.spanBuilder("<span_name>").startSpan()

span.end()
```

Estrategia API Datadog:
```kotlin
import com.datadog.android.trace.GlobalDatadogTracer
import com.datadog.android.trace.api.tracer.DatadogTracer

val tracer: DatadogTracer = GlobalDatadogTracer.get()
val span = tracer.buildSpan("<span_name>").start()

span.finish()
```
Consulta [más ejemplos de Android][1].

[1]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/android/?tab=kotlin

{{% /tab %}}
{{< /tabs >}}

## Muestreo

El muestreo en el rastreo móvil nativo controla qué tramos y trazas se ingieren en Datadog, lo que te ayuda a equilibrar la visibilidad con el volumen de datos. Cuando instrumentas manualmente los tramos en tu aplicación, los que se muestrean pasan por los filtros de retención de APM, lo que determina cuáles acaban mostrándose para su análisis en la interfaz de Datadog.

### Funcionamiento del muestreo

El muestreo afecta a distintos tipos de tramos que creas en tu aplicación móvil:

**Nota**: El comportamiento de muestreo descrito a continuación se aplica a los SDK de iOS `v2.9.0+` y a los SDK de Android `v1.18.0+` . Para versiones anteriores, consulta la documentación respectiva del SDK para conocer el comportamiento de muestreo específico de la plataforma.

- El **muestreo local de tramos** se aplica a los tramos instrumentados manualmente (como los tramos de perfiles de rendimiento). Está controlado por el parámetro `Trace.sampleRate`. Por ejemplo, si defines esta frecuencia en 50, el Trace SD produce tramos en el 50% de los casos y los envía todos a Datadog. La visibilidad de estos tramos en la interfaz de usuario depende de tus filtros de retención APM. Cada evento de tramo incluye el campo `_dd.agent_psr` (la frecuencia de muestreo) y `metrics._sampling_priority_v1` (1 para muestreado, 0 para no muestreado).

- El **muestreo distribuido de trazas** se aplica a las trazas que cruzan los límites del servicio, como las solicitudes de red a tu backend (relevante para el caso de uso "Envolver una traza distribuida de frontend a backend"). Esto se controla mediante el parámetro `urlSessionTracking.firstPartyHostsTracing.sampleRate` para iOS y el parámetro`DatadogInterceptor.Builder.setTraceSampler` para Android. Si se define en 50, solo la mitad de las solicitudes de backend tienen el indicador de muestreo establecido en true, como indica el [contexto de rastreo][7]. Todos los Datadog Agents respetan esta decisión, por lo que verás el 50% de las trazas distribuidas en la interfaz de usuario.

Las frecuencias de muestreo se aplican de forma independiente. La frecuencia más restrictiva determina qué datos son visibles en la interfaz de usuario para una sesión o traza determinada. Por ejemplo:
- Si defines una frecuencia de muestreo de sesiones RUM baja (por ejemplo, 1%), solo el 1% de las sesiones de usuario se registran para RUM, pero aún puedes rastrear todas las solicitudes de red dentro de esas sesiones definiendo la frecuencia de muestreo del rastreo de red en 100%.
- Si defines una frecuencia de muestreo de rastreo alta pero una frecuencia de muestreo RUM baja, es posible que veas trazas sin los datos RUM correspondientes.

**Escenario de ejemplo**
Para muestrear el 1% de todas las sesiones de aplicaciones y rastrear todas las solicitudes de red API dentro de esas sesiones:
- Configura `RUM.sessionSampleRate = 1` (solo controla el muestreo de sesiones RUM).
- Configura `urlSessionTracking.firstPartyHostsTracing.sampleRate = 100` (controla la frecuencia de muestreo de solicitudes de red).

Las decisiones de muestreo se comunican a través de cabeceras de trazas, lo que garantiza que todos los servicios de una traza distribuida utilicen la misma opción de muestreo.

### Parámetros de muestreo

Los siguientes parámetros de frecuencia de muestreo controlan diferentes aspectos de la recopilación de datos:

{{< tabs >}}
{{% tab "iOS" %}}

| Parámetro                                              | Descripción                                                                     | Ejemplo                  |
|--------------------------------------------------------|---------------------------------------------------------------------------------|--------------------------|
| `Trace.Configuration.sampleRate`                       | Controla el porcentaje de tramos instrumentados manualmente, recopilados por el rastreador. | `50` = 50% de los tramos      |
| `urlSessionTracking.firstPartyHostsTracing.sampleRate` | Controla el porcentaje de solicitudes de red rastreadas para hosts propios.       | `100` = 100% de las solicitudes |

**Nota**: `RUM.sessionSampleRate` controla el muestreo de sesiones RUM y no afecta a las frecuencias de muestreo de trazas. Cuando se utiliza el SDK de rastreo independientemente de RUM, el muestreo de trazas se controla únicamente mediante los parámetros indicados anteriormente.

{{% /tab %}}
{{% tab "Android" %}}

| Parámetro                                    | Descripción                                                                                                               | Ejemplo                  |
|----------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|--------------------------|
| `OtelTracerProvider.Builder.setSampleRate()` | Estrategia OpenTelemetry (**recomendado**). Controla el porcentaje de tramos instrumentados manualmente, recopilados por el rastreador. | `50` = 50% de los tramos      |
| `DatadogTracerBuilder.withSampleRate`        | Enfoque API Datadog. Controla el porcentaje de tramos instrumentados, recopilados manualmente recogidos por el rastreador.                     | `50` = 50% de los tramos      |
| `DatadogInterceptor.Builder.setTraceSampler` | Controla el porcentaje de solicitudes de red rastreadas para hosts propios.                                                 | `100` = 100% de las solicitudes |

**Nota**: `RUM.sessionSampleRate` controla el muestreo de sesiones RUM y no afecta a las frecuencias de muestreo de trazas. Cuando se utiliza el SDK de rastreo independientemente de RUM, el muestreo de trazas se controla únicamente mediante los parámetros indicados anteriormente.

{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/ios
[2]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/android
[3]: /es/tracing/trace_collection/custom_instrumentation/ios/otel
[4]: /es/tracing/trace_collection/custom_instrumentation/android/otel
[5]: https://github.com/DataDog/dd-sdk-ios/blob/develop/DatadogTrace/Sources/TraceConfiguration.swift#L32
[6]: https://github.com/DataDog/dd-sdk-ios/blob/develop/DatadogTrace/Sources/TraceConfiguration.swift#L106
[7]: https://www.w3.org/TR/trace-context/#sampled-flag
[8]: /es/real_user_monitoring/reactnative/
[9]: /es/real_user_monitoring/flutter/
[10]: /es/real_user_monitoring/kotlin_multiplatform/
[11]: /es/real_user_monitoring/unity/
[12]: /es/real_user_monitoring/correlate_with_other_telemetry/