---
algolia:
  tags:
  - trazas de rum
aliases:
- /es/real_user_monitoring/connect_rum_and_traces
further_reading:
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: Blog
  text: Real User Monitoring
- link: https://www.datadoghq.com/blog/modern-frontend-monitoring/
  tag: Blog
  text: Para empezar a monitorizar aplicaciones de una sola página
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: Guía
  text: Facilitar la resolución de problemas a través de la correlación entre productos
- link: /tracing/
  tag: Documentación
  text: APM y rastreo distribuido
- link: /real_user_monitoring
  tag: Documentación
  text: RUM y Session Replay
- link: https://www.datadoghq.com/blog/troubleshoot-with-session-replay-developer-tools/
  tag: Blog
  text: Solucionar problemas con las herramientas de desarrollo del navegador Session
    Replay
- link: https://www.datadoghq.com/blog/correlate-traces-datadog-rum-otel/
  tag: Blog
  text: Correlacionar eventos de Datadog RUM con trazas de aplicaciones instrumentadas
    con OpenTelemetry
title: Conectar RUM y trazas (traces)
---

{{< img src="real_user_monitoring/connect_rum_and_traces/rum_trace_tab.png" alt="RUM y trazas" style="width:100%;">}}

## Información general

La integración de APM con Real User Monitoring te permite vincular las solicitudes de tus aplicaciones web y móviles con sus correspondientes trazas de backend. Esta combinación te permite ver todos los datos de frontend y backend a través de una sola perspectiva.

Utiliza los datos de frontend de RUM, así como la información sobre backend, infraestructura y logs de la inyección de ID de rastreo, para localizar problemas en cualquier parte de tu stack tecnológico y comprender lo que experimentan tus usuarios.

Para empezar a enviar sólo las trazas de tu aplicación iOS a Datadog, consulta [Recopilación de trazas iOS][1].

## Uso

### Requisitos previos

-   Has configurado el [rastreo APM][2] en los servicios a los que se dirigen tus aplicaciones RUM.
-   Tus servicios utilizan un servidor HTTP.
-   Tus servidores HTTP están utilizando [una biblioteca que admite el rastreo distribuido](#supported-libraries).
-   Tienes configurado lo siguiente basado en tu SDK:
    - Con el **SDK de navegador**, has añadido los recursos XMLHttpRequest (XHR) o Fetch del Explorador RUM a tu `allowedTracingUrls`.
    - Con el **SDK móvil**, has añadido los recursos Native o XMLHttpRequest (XHR) a tu `firstPartyHosts`.
-   Dispones de una traza correspondiente para las solicitudes a `allowedTracingUrls` o `firstPartyHosts`.

### Configuración de RUM

**Nota:** La configuración de RUM y de las trazas hace uso de los datos pagos de APM en RUM, lo que puede afectar a tu facturación de APM.

{{< tabs >}}
{{% tab "RUM de navegador" %}}

1. Configura la [monitorización del Navegador RUM][1].

2. Inicializa el SDK RUM. Configura el parámetro de inicialización `allowedTracingUrls` con la lista de orígenes internos de primera parte que invoca tu aplicación de navegador.

   Para **NPM install**:
    ```javascript
    import { datadogRum } from '@datadog/browser-rum'

    datadogRum.init({
        applicationId: '<DATADOG_APPLICATION_ID>',
        clientToken: '<DATADOG_CLIENT_TOKEN>',
        ...otherConfig,
        service: "my-web-application",
        allowedTracingUrls: ["https://api.example.com", /https:\/\/.*\.my-api-domain\.com/, (url) => url.startsWith("https://api.example.com")]
    })
    ```

   Para **CDN install**:

   ```javascript
   window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      allowedTracingUrls: ["https://api.example.com", /https:\/\/.*\.my-api-domain\.com/, (url) => url.startsWith("https://api.example.com")]
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    })
   ```

   Para conectar RUM con trazas, es necesario especificar la aplicación del navegador en el campo `service`.

    `allowedTracingUrls` coincide con la URL completa (`<scheme>://<host>[:<port>]/<path>[?<query>][#<fragment>]`). Acepta los siguientes tipos:
      - `string`: coincide con cualquier URL que empiece por el valor, por lo que `https://api.example.com` coincide con `https://api.example.com/v1/resource`.
      - `RegExp`: ejecuta un test con la expresión regular y la URL proporcionadas.
      - `function`: evalúa con la URL como parámetro. La devolución de un `boolean` configurado como `true` indica una coincidencia.

3.  (Opcional) Configura el parámetro de inicialización `traceSampleRate` para mantener un porcentaje definido de trazas de backend. Si no se configura, el 100% de las trazas procedentes de solicitudes del navegador se envían a Datadog. Para conservar el 20% de las trazas de backend, por ejemplo:

    ```javascript
    import { datadogRum } from '@datadog/browser-rum'

    datadogRum.init({
        ...otherConfig,
        traceSampleRate: 20
    })
    ```

**Nota**: `traceSampleRate` **no** afecta al muestreo de sesiones RUM. Sólo se muestrean las trazas de backend.

4. (Opcional) Si defines un `traceSampleRate`, para asegurarte de que se siguen aplicando las decisiones de muestreo de servicios de backend, configura el parámetro de inicialización `traceContextInjection` como `sampled` (definido en `all` por defecto).

    Por ejemplo, si configuras `traceSampleRate` al 20% en el SDK del navegador:
    - Cuando `traceContextInjection` se define en `all`, se conserva el **20%** de las trazas de backend y se elimina el **80%** de las trazas de backend.

  {{< img src="real_user_monitoring/connect_rum_and_traces/traceContextInjection_all-2.png" alt="Parámetro traceContextInjection configurado en All" style="width:90%;">}}

  - Cuando `traceContextInjection` se configura como `sampled`, se conserva el **20%** de las trazas de backend. Para el **80%** restante, el SDK del navegador **no inyecta** una decisión de muestreo. La decisión se toma en el servidor y se basa en la [configuración][2] del muestreo de cabeceras de la biblioteca de rastreo. En el siguiente ejemplo, la tasa de muestreo del backend se define en 40%, por lo que se conserva el 32% restante de las trazas de backend.

    {{< img src="real_user_monitoring/connect_rum_and_traces/traceContextInjection_sampled-2.png" alt="Parámetro traceContextInjection configurado en Sampled" style="width:90%;">}}

<div class="alert alert-info">El rastreo de extremo a extremo está disponible para solicitudes lanzadas después de que se inicializa el SDK del navegador. No se admite el rastreo de extremo a extremo del documento HTML inicial ni de las primeras solicitudes del navegador.</div>

[1]: /es/real_user_monitoring/browser/
[2]: /es/tracing/trace_pipeline/ingestion_mechanisms/#head-based-sampling
{{% /tab %}}
{{% tab "Android RUM" %}}

1. Configura la [monitorización Android RUM][1].
2. Configura la [recopilación de trazas Android][2].
3. Añade la dependencia Gradle a la biblioteca `dd-sdk-android-okhttp` en el archivo `build.gradle` a nivel del módulo:

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
    }
    ```

4. Configura el interceptor `OkHttpClient` con la lista de orígenes internos de primera instancia invocados por tu aplicación Android.
    ```kotlin
    val tracedHosts = listOf("example.com", "example.eu")

    val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor(tracedHosts))
        .addNetworkInterceptor(TracingInterceptor(tracedHosts))
        .eventListenerFactory(DatadogEventListener.Factory())
        .build()
    ```

   De forma predeterminada, se rastrean todos los subdominios de los hosts incluidos en la lista. Por ejemplo, si añades `example.com`, también habilitas el rastreo para `api.example.com` y `foo.example.com`.

3.  (Opcional) Configura el parámetro `traceSampler` para mantener un porcentaje definido de trazas de backend. Si no se configura, el 20% de las trazas procedentes de las solicitudes de la aplicación se envían a Datadog. Para mantener el 100% de las trazas de backend:

```kotlin
    val okHttpClient = OkHttpClient.Builder()
       .addInterceptor(DatadogInterceptor(traceSampler = RateBasedSampler(100f)))
       .build()
```

**Nota**:
* `traceSampler` **no** afecta al muestreo de sesiones RUM. Sólo se muestrean las trazas de backend.
* Si defines tipos de cabeceras de rastreo personalizados en la configuración de Datadog y estás utilizando un rastreador registrado con `GlobalTracer`, asegúrate de que se configuren los mismos tipos de cabeceras de rastreo para el rastreador en uso.

[1]: /es/real_user_monitoring/android/
[2]: /es/tracing/trace_collection/dd_libraries/android/?tab=kotlin
{{% /tab %}}
{{% tab "iOS RUM" %}}

1. Configura la [monitorización iOS RUM][1].

2. Habilita `RUM` con la opción `urlSessionTracking` y el parámetro `firstPartyHostsTracing`:
    ```swift
    RUM.enable(
        with: RUM.Configuration(
            applicationID: "<rum application id>",
            urlSessionTracking: .init(
                firstPartyHostsTracing: .trace(
                    hosts: [
                        "example.com",
                        "api.yourdomain.com"
                    ]
                )
            )
        )
    )
    ```

3. Habilita la instrumentación URLSession para tu tipo de `SessionDelegate`, que se ajusta al protocolo `URLSessionDataDelegate`:
    ```swift
    URLSessionInstrumentation.enable(
        with: .init(
            delegateClass: <YourSessionDelegate>.self
        )
    )
    ```

4. Inicializa URLSession como se indica en [Configuración][1]:
    ```swift
    let session =  URLSession(
        configuration: ...,
        delegate: <YourSessionDelegate>(),
        delegateQueue: ...
    )
    ```

   De forma predeterminada, se rastrean todos los subdominios de los hosts incluidos en la lista. Por ejemplo, si añades `example.com`, también habilitarás el rastreo para `api.example.com` y `foo.example.com`.

   La inyección de ID de rastreo funciona cuando se proporciona un `URLRequest` a `URLSession`. El rastreo distribuido no funciona cuando se utiliza un objeto `URL`.

5. (Opcional) Configura el parámetro `tracingSamplingRate` para mantener un porcentaje definido de trazas de backend. Si no se configura, el 20% de las trazas procedentes de solicitudes de aplicaciones se envían a Datadog.

   Para mantener el 100% de las trazas de backend::
    ```swift
    RUM.enable(
        with: RUM.Configuration(
            applicationID: "<rum application id>",
            urlSessionTracking: .init(
                firstPartyHostsTracing: .trace(
                    hosts: [
                        "example.com",
                        "api.yourdomain.com"
                    ],
                    sampleRate: 100
                )
            )
        )
    )
    ```
**Nota**: `sampleRate` **no** afecta al muestreo de sesiones RUM. Sólo se muestrean las trazas de backend.

[1]: /es/real_user_monitoring/ios/
{{% /tab %}}
{{% tab "RUM React Native" %}}

1. Configura la [monitorización RUM React Native][1].

2. Configura el parámetro de inicialización `firstPartyHosts` para definir la lista de orígenes internos de primera instancia que invoca tu aplicación React Native:
    ```javascript
    const config = new DatadogProviderConfiguration(
        // ...
    );
    config.firstPartyHosts = ["example.com", "api.yourdomain.com"];
    ```

   De forma predeterminada, se rastrean todos los subdominios de los hosts incluidos en la lista. Por ejemplo, si añades `example.com`, también habilitarás el rastreo para `api.example.com` y `foo.example.com`.

3. (Opcional) Configura el parámetro de inicialización `resourceTracingSamplingRate` para mantener un porcentaje definido de las trazas de backend. Si no se configura, el 20% de las trazas procedentes de solicitudes de aplicaciones se envían a Datadog.

   Para mantener el 100% de las trazas de backend::
    ```javascript
    const config = new DatadogProviderConfiguration(
        // ...
    );
    config.resourceTracingSamplingRate = 100;
    ```

    **Nota**: `resourceTracingSamplingRate` **no** afecta al muestreo de sesiones RUM. Sólo se muestrean las trazas de backend.

[1]: /es/real_user_monitoring/reactnative/
{{% /tab %}}
{{% tab "RUM Flutter" %}}

1. Configura la [monitorización RUM Flutter][1].

2. Sigue las instrucciones en [Seguimiento automático de recursos][2] para incluir el paquete de cliente HTTP de seguimiento de Datadog y habilitar el seguimiento HTTP. Esto incluye los siguientes cambios en la inicialización para añadir una lista de orígenes internos de primera instancia que invoca la aplicación Flutter:
    ```dart
    final configuration = DatadogConfiguration(
      // ...
      // added configuration
      firstPartyHosts: ['example.com', 'api.yourdomain.com'],
    )..enableHttpTracking()
    ```

[1]: /es/real_user_monitoring/mobile_and_tv_monitoring/setup/flutter/
[2]: /es/real_user_monitoring/mobile_and_tv_monitoring/setup/flutter/#automatic-resource-tracking

{{% /tab %}}


{{% tab "RUM Roku" %}}

{{< site-region region="gov" >}}
<div class="alert alert-warning">RUM para Roku no está disponible en el sitio US1-FED Datadog.</div>
{{< /site-region >}}

1. Configura la [monitorización RUM Roku][1].

2. Utiliza el componente `datadogroku_DdUrlTransfer` para realizar tus solicitudes de red.
    ```brightscript
        ddUrlTransfer = datadogroku_DdUrlTransfer(m.global.datadogRumAgent)
        ddUrlTransfer.SetUrl(url)
        ddUrlTransfer.EnablePeerVerification(false)
        ddUrlTransfer.EnableHostVerification(false)
        result = ddUrlTransfer.GetToString()
    ```

[1]: /es/real_user_monitoring/mobile_and_tv_monitoring/setup/roku/


{{% /tab %}}
{{< /tabs >}}

### Verificación de la configuración

Para comprobar si has configurado la integración APM con RUM, sigue los pasos que se indican a continuación en función del SDK con el que hayas instalado RUM.


{{< tabs >}}
{{% tab "Navegador" %}}

1. Visita una página de tu aplicación.
2. En la página de herramientas de desarrollo de tu navegador, ve a la pestaña **Red**.
3. Verifica que las cabeceras de solicitud de la solicitud de un recurso que esperas correlacionar contienen las [cabeceras de correlación de Datadog][1].

[1]: /es/real_user_monitoring/platform/connect_rum_and_traces?tab=browserrum#how-are-rum-resources-linked-to-traces

{{% /tab %}}
{{% tab "Android" %}}

1. Ejecuta tu aplicación desde Android Studio.
2. Visita una página de tu aplicación.
3. Abre el [Inspector de redes][1] de Android Studio.
4. Verifica las cabeceras de solicitud de un recurso RUM y comprueba que las [cabeceras requeridas han sido definidas por el SDK][2].

[1]: https://developer.android.com/studio/debug/network-profiler#network-inspector-overview
[2]: https://docs.datadoghq.com/es/real_user_monitoring/platform/connect_rum_and_traces?tab=androidrum#how-are-rum-resources-linked-to-traces

{{% /tab %}}
{{% tab "iOS" %}}

1. Ejecuta tu aplicación desde Xcode.
2. Visita una página de tu aplicación.
3. Abre las [conexiones de red y la instrumentación del tráfico HTTP][1].
4. Verifica las cabeceras de solicitud de un recurso RUM y comprueba que las [cabeceras requeridas han sido definidas por el SDK][2].

[1]: https://developer.apple.com/documentation/foundation/url_loading_system/analyzing_http_traffic_with_instruments
[2]: https://docs.datadoghq.com/es/real_user_monitoring/platform/connect_rum_and_traces/?tab=iosrum#how-are-rum-resources-linked-to-traces

{{% /tab %}}
{{% tab "React Native" %}}

1. Ejecuta tu aplicación desde Xcode (iOS) o Android Studio (Android).
2. Visita una página de tu aplicación.
3. Abre las [conexiones de red y la instrumentación del tráfico HTTP][1] de Xcode y el [Inspector de redes][2] de Android Studio.
4. Verifica las cabeceras de solicitud de un recurso RUM y comprueba que las [cabeceras requeridas han sido definidas por el SDK][3].

[1]: https://developer.apple.com/documentation/foundation/url_loading_system/analyzing_http_traffic_with_instruments
[2]: https://developer.android.com/studio/debug/network-profiler#network-inspector-overview
[3]: https://docs.datadoghq.com/es/real_user_monitoring/platform/connect_rum_and_traces/?tab=reactnativerum#how-are-rum-resources-linked-to-traces

{{% /tab %}}
{{% tab "Flutter" %}}

1. Ejecute su aplicación utilizando tu IDE o `flutter run` preferido.
2. Visita una página de tu aplicación.
3. Abre [Herramientas de desarrollo][1] de Flutter y ve a [Vista de red][2].
4. Verifica las cabeceras de solicitud de un recurso RUM y comprueba que las [cabeceras requeridas han sido definidas por el SDK][3].

[1]: https://docs.flutter.dev/tools/devtools/overview
[2]: https://docs.flutter.dev/tools/devtools/network
[3]: https://docs.datadoghq.com/es/real_user_monitoring/platform/connect_rum_and_traces/?tab=reactnativerum#how-are-rum-resources-linked-to-traces

{{% /tab %}}
{{< /tabs >}}

## Bibliotecas compatibles

A continuación se muestra una lista de bibliotecas de backend compatibles que deben estar presentes en los servicios que recibe solicitudes de red.

| Biblioteca          | Versión mínima |
| ---------------- | --------------- |
| [Python][3]      | [0.22.0][4]     |
| [Go][5]          | [1.10.0][6]     |
| [Java][7]        | [0.24.1][8]     |
| [Ruby][9]        | [0.20.0][10]     |
| [JavaScript][11] | [0.10.0][12]    |
| [PHP][13]        | [0.33.0][14]    |
| [.NET][15]       | [1.18.2][16]    |


## Compatibilidad con OpenTelemetry

RUM admite varios tipos de propagadores para conectar recursos con backends instrumentados con bibliotecas OpenTelemetry.

El estilo de inyección por defecto es `tracecontext`, `Datadog`.

{{< tabs >}}
{{% tab "RUM de navegador" %}}

**Nota**: Si estás utilizando un marco de backend como Next.js/Vercel que utiliza OpenTelemetry, sigue estos pasos.

1. Configura RUM para conectarse con APM, como se ha descrito anteriormente.

2. Modifica `allowedTracingUrls` como se indica a continuación:
    ```javascript
    import { datadogRum } from '@datadog/browser-rum'

    datadogRum.init({
        ...otherConfig,
        allowedTracingUrls: [
          { match: "https://api.example.com", propagatorTypes: ["tracecontext"]}
        ]
    })
    ```
    `match` acepta los mismos tipos de parámetros (`string`, ``RegExp` o `function`) que cuando se utiliza en su forma simple, como se ha descrito anteriormente.

    `propagatorTypes` acepta una lista de cadenas para los propagadores elegidos:
      - `datadog`: Propagador de Datadog (`x-datadog-*`)
      - `tracecontext`: [Contexto de rastreo W3C](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `b3`: [Cabecera única B3](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `b3multi`: [Cabeceras múltiples B3](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

{{% /tab %}}
{{% tab "RUM iOS" %}}

1. Configura RUM para conectarse con APM, como se ha descrito anteriormente.

2. Utiliza `.traceWithHeaders(hostsWithHeaders:sampleRate:)` en lugar de `.trace(hosts:sampleRate:)`, como se indica a continuación:
    ```swift
      RUM.enable(
          with: RUM.Configuration(
              applicationID: "<rum application id>",
              urlSessionTracking: .init(
                  firstPartyHostsTracing: .traceWithHeaders(
                      hostsWithHeaders: [
                          "api.example.com": [.tracecontext]
                      ],
                      sampleRate: 100
                  )
              )
          )
      )
    ```
    `.traceWithHeaders(hostsWithHeaders:sampleRate:)` toma `Dictionary<String, Set<TracingHeaderType>>` como parámetro, donde la clave es un host y el valor es una lista de tipos de cabeceras de rastreo compatibles.

    `TracingHeaderType`en una enumeración que representa los siguientes tipos de cabeceras de rastreo:
      - `.datadog`: Propagador de Datadog (`x-datadog-*`)
      - `.tracecontext`: [Contexto de rastreo W3C](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `.b3`: [Cabecera única B3](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `.b3multi`: [Cabeceras múltiples B3](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)
{{% /tab %}}

{{% tab "RUM Android" %}}
1. Configura RUM para conectarse con APM, como se describe arriba.

2. Configura el interceptor `OkHttpClient` con la lista de orígenes internos de primera instancia y el tipo de cabecera de rastreo a utilizar como se indica a continuación:
    ```kotlin
    val tracedHosts = mapOf("example.com" to setOf(TracingHeaderType.TRACECONTEXT),
                          "example.eu" to setOf(TracingHeaderType.DATADOG))

    val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor(tracedHosts))
        .addNetworkInterceptor(TracingInterceptor(tracedHosts))
        .eventListenerFactory(DatadogEventListener.Factory())
        .build()
    ```

   `TracingHeaderType` es una enumeración que representa los siguientes tipos de cabeceras de rastreo:
      - `.DATADOG`: Propagador de Datadog (`x-datadog-*`)
      - `.TRACECONTEXT`: [Contexto de rastreo W3C](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `.B3`: [Cabecera única B3](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `.b3multi`: [Cabeceras múltiples B3](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

{{% /tab %}}

{{% tab "RUM React Native" %}}
1. Configura RUM para [conectarse con APM](#setup-rum).

2. Configura el SDK RUM con la lista de orígenes internos de primera instancia y el tipo de cabecera de rastreo a utilizar como se indica a continuación:
    ```javascript
    const config = new DatadogProviderConfiguration(
        // ...
    );
    config.firstPartyHosts = [{
        match: "example.com",
        propagatorTypes: [
            PropagatorType.TRACECONTEXT,
            PropagatorType.DATADOG
        ]
    }];
    ```

   `PropagatorType` es una enumeración que representa los siguientes tipos de cabeceras de rastreo:
      - `PropagatorType.DATADOG`: Propagador de Datadog (`x-datadog-*`)
      - `PropagatorType.TRACECONTEXT`: [Contexto de rastreo W3C](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `PropagatorType.B3`: [Cabecera única B3](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `PropagatorType.B3MULTI`: [Cabeceras múltiples B3](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

{{% /tab %}}

{{% tab "RUM Flutter" %}}
1. Configura RUM para conectarse con APM, como se describe arriba.

2. Utiliza `firstPartyHostsWithTracingHeaders` en vez de `firstPartyHosts` como se indica a continuación:
    ```dart
    final configuration = DatadogConfiguration(
      // ...
      // added configuration
      firstPartyHostsWithTracingHeaders: {
        'example.com': { TracingHeaderType.tracecontext },
      },
    )..enableHttpTracking()
    ```

   `firstPartyHostsWithTracingHeaders` toma `Map<String, Set<TracingHeaderType>>` como parámetro, donde la clave es un host y el valor es una lista de tipos de cabeceras de rastreo compatibles.

   `TracingHeaderType` es una enumeración que representa los siguientes tipos de cabeceras de rastreo:
      - `TracingHeaderType.datadog`: Propagador de Datadog (`x-datadog-*`)
      - `TracingHeaderType.tracecontext`: [Contexto de rastreo W3C](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `TracingHeaderType.b3`: [Cabecera única B3](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `TracingHeaderType.b3multi`: [Cabeceras múltiples B3](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

{{% /tab %}}

{{< /tabs >}}


## ¿Cómo se vinculan los recursos RUM con las trazas?

Datadog utiliza el protocolo de rastreo distribuido y configura las siguientes cabeceras HTTP. Por defecto, se utilizan tanto el contexto de rastreo, así como las cabeceras específicas de Datadog.
{{< tabs >}} {{% tab "Datadog" %}}
`x-datadog-trace-id`
: Generado a partir del SDK de Real User Monitoring. Permite a Datadog vincular la traza con el recurso RUM.

`x-datadog-parent-id`
: Generado desde el SDK de Real User Monitoring. Permite a Datadog generar el primer tramo (span) a partir de la traza.

`x-datadog-origin: rum`
: Para asegurarte de que las trazas generadas por Real User Monitoring no afecten a tus recuentos de tramos de índices APM.

`x-datadog-sampling-priority: 1`
: Para asegurarte de que el Agent conserva la traza.
{{% /tab%}}
{{% tab "Contexto de rastreo W3C" %}}

`traceparent: [version]-[trace id]-[parent id]-[trace flags]`
: `version`: La especificación actual asume que la versión se configura en `00`.
: `trace id`: ID de traza de 128 bits, hexadecimal en 32 caracteres. El ID de la traza de origen es de 64 bits para mantener la compatibilidad con APM.
: `parent id`: ID de tramo de 64 bits, hexadecimal en 16 caracteres.
: `trace flags`: Muestreado (`01`) o no muestreado (`00`)

Ejemplo:
: `traceparent: 00-00000000000000008448eb211c80319c-b7ad6b7169203331s-01`
{{% /tab %}}
{{% tab "b3 / Cabeceras múltiples B3" %}}
`b3: [trace id]-[span id]-[sampled]`
: `trace id`: ID de traza de 64 bits, hexadecimal en 16 caracteres.
: `span id`: ID de tramo de 64 bits, hexadecimal en 16 caracteres.
: `sampled`: Verdadero (`1`) o Falso (`0`)

Ejemplo de cabecera única B3
: `b3: 8448eb211c80319c-b7ad6b7169203331-1`

Ejemplo de cabeceras múltiples B3:
: `X-B3-TraceId: 8448eb211c80319c`
: `X-B3-SpanId:  b7ad6b7169203331`
: `X-B3-Sampled: 1`
{{% /tab %}}
{{< /tabs >}}

Estas cabeceras HTTP no están en la lista segura CORS, por lo que necesitas [configurar cabeceras con permisos de control del acceso][17] en tu servidor que gestiona solicitudes que el SDK está configurado para monitorizar. El servidor también debe aceptar [solicitudes preflight][18] (solicitudes de OPCIONES), enviadas por el SDK antes de cada solicitud.

## ¿Cómo se ven afectadas las cuotas de APM?

La conexión de RUM y trazas puede aumentar significativamente los volúmenes ingeridos por APM. Utiliza el parámetro de inicialización `traceSampleRate` para mantener una parte de las trazas de backend a partir de las solicitudes de navegador y móviles.

## ¿Durante cuánto tiempo se conservan las trazas?

Estas trazas están disponibles durante 15 minutos en el explorador [Live Search][19]. Para conservar las trazas durante más tiempo, crea [filtros de conservación][20]. Delimita estos filtros de conservación en cualquier etiqueta de tramo para conservar las trazas de páginas críticas y acciones de usuarios.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/dd_libraries/ios/?tab=swiftpackagemanagerspm
[2]: /es/tracing
[3]: /es/tracing/trace_collection/dd_libraries/python/
[4]: https://github.com/DataDog/dd-trace-py/releases/tag/v0.22.0
[5]: /es/tracing/trace_collection/dd_libraries/go/
[6]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.10.0
[7]: /es/tracing/trace_collection/dd_libraries/java/
[8]: https://github.com/DataDog/dd-trace-java/releases/tag/v0.24.1
[9]: /es/tracing/trace_collection/dd_libraries/ruby/
[10]: https://github.com/DataDog/dd-trace-rb/releases/tag/v0.20.0
[11]: /es/tracing/trace_collection/dd_libraries/nodejs/
[12]: https://github.com/DataDog/dd-trace-js/releases/tag/v0.10.0
[13]: /es/tracing/trace_collection/dd_libraries/php/
[14]: https://github.com/DataDog/dd-trace-php/releases/tag/0.33.0
[15]: /es/tracing/trace_collection/dd_libraries/dotnet-core/
[16]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v1.18.2
[17]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers
[18]: https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request
[19]: /es/tracing/trace_explorer/#live-search-for-15-minutes
[20]: /es/tracing/trace_pipeline/trace_retention/#retention-filters