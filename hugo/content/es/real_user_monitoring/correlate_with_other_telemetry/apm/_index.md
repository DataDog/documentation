---
algolia:
  tags:
  - rum traces
aliases:
- /es/real_user_monitoring/connect_rum_and_traces
- /es/real_user_monitoring/platform/connect_rum_and_traces/
description: Conecte los datos de RUM del frontend con las trazas de APM del backend
  para obtener visibilidad de extremo a extremo a través de su pila de aplicaciones
  y el recorrido del usuario.
further_reading:
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: Blog
  text: RUM
- link: https://www.datadoghq.com/blog/modern-frontend-monitoring/
  tag: Blog
  text: Comience a monitorear aplicaciones de una sola página
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: Guía
  text: Facilite la solución de problemas con la correlación entre productos
- link: /tracing/
  tag: Documentación
  text: APM y trazado distribuido
- link: /real_user_monitoring
  tag: Documentación
  text: RUM y Reproducción de Sesiones
- link: https://www.datadoghq.com/blog/troubleshoot-with-session-replay-developer-tools/
  tag: Blog
  text: Solucione problemas con las herramientas de desarrollo del navegador de Reproducción
    de Sesiones
- link: https://www.datadoghq.com/blog/correlate-traces-datadog-rum-otel/
  tag: Blog
  text: Correlacione los eventos de RUM de Datadog con las trazas de aplicaciones
    instrumentadas con OpenTelemetry
- link: https://www.datadoghq.com/blog/rum-apm-single-step
  tag: Blog
  text: Habilite la visibilidad de extremo a extremo en sus aplicaciones Java con
    un solo comando
title: Conecte RUM y Trazos
---
{{< img src="real_user_monitoring/connect_rum_and_traces/rum-trace-tab.png" alt="RUM y Trazos" style="width:100%;">}}

## Resumen {#overview}

La integración de APM con RUM le permite vincular solicitudes de sus aplicaciones web y móviles con sus trazas de backend correspondientes. Esta combinación le permite ver todos sus datos de frontend y backend a través de una sola lente.

Utilice los datos de frontend de RUM, así como la información de backend, infraestructura y log de la inyección de ID de traza para identificar problemas en cualquier parte de su pila y comprender lo que están experimentando sus usuarios.

Para comenzar a enviar solo las trazas de su aplicación iOS a Datadog, consulte [Colección de Trazas de iOS][1].

## Uso {#usage}

### Requisitos previos {#prerequisites}

-   Has configurado [trazado de APM][2] en los servicios dirigidos por tus aplicaciones RUM.
-   Tus servicios utilizan un servidor HTTP.
-   Tus servidores HTTP están utilizando [una biblioteca que soporta trazado distribuido](#supported-libraries).
-   Tienes lo siguiente configurado basado en tu SDK:
    - Con el **SDK de Navegador**, has agregado los recursos XMLHttpRequest (XHR) o Fetch en el Explorador RUM a tu `allowedTracingUrls`.
    - Con el **SDK Móvil**, has agregado el Native o XMLHttpRequest (XHR) a tu `firstPartyHosts`.
-   Tienes una traza correspondiente para las solicitudes a `allowedTracingUrls` o `firstPartyHosts`.

### Configura RUM {#setup-rum}

**Nota:** Configurar RUM y Trazas utiliza datos de APM de pago en RUM, lo que puede afectar tu facturación de APM.

{{< tabs >}}
{{% tab "RUM de Navegador" %}}

1. Configura [Monitoreo de Navegador RUM][1].

2. Inicializa el SDK de RUM. Configura el `allowedTracingUrls` parámetro de inicialización con la lista de orígenes internos y de primera parte llamados por tu aplicación de navegador.

   Para **npm install**:
    ```javascript
    import { datadogRum } from '@datadog/browser-rum'

    datadogRum.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      allowedTracingUrls: [
        "https://api.example.com",
        // Matches any subdomain of my-api-domain.com, such as https://foo.my-api-domain.com
        /^https:\/\/[^\/]+\.my-api-domain\.com/,
        // You can also use a function for advanced matching:
        (url) => url.startsWith("https://api.example.com")
      ],
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not specified, defaults to 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    })
    ```

   Para **instalación CDN**:

   ```javascript
   window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      allowedTracingUrls: [
        "https://api.example.com",
        // Matches any subdomain of my-api-domain.com, such as https://foo.my-api-domain.com
        /^https:\/\/[^\/]+\.my-api-domain\.com/,
        // You can also use a function for advanced matching:
        (url) => url.startsWith("https://api.example.com")
      ],
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    })
   ```

    To connect RUM to Traces, you need to specify your browser application in the `service` field.

    `allowedTracingUrls` matches the full URL (`<scheme>://<host>[:<port>]/<path>[?<query>][#<fragment>]`). It accepts the following types:
      - `string`: matches any URL that starts with the value, so `https://api.example.com` matches `https://api.example.com/v1/resource`.
      - `RegExp`: matches if any substring of the URL matches the provided RegExp. For example, `/^https:\/\/[^\/]+\.my-api-domain\.com/` matches URLs like `https://foo.my-api-domain.com/path`, but not `https://notintended.com/?from=guess.my-api-domain.com`. **Note:** The RegExp is not anchored to the start of the URL unless you use `^`. Be careful, as overly broad patterns can unintentionally match unwanted URLs and cause CORS errors.
      - `function`: evaluates with the URL as parameter. Returning a `boolean` set to `true` indicates a match.

<div class="alert alert-danger">Al usar RegExp, el patrón se prueba contra toda la URL como una subcadena, no solo el prefijo. Para evitar coincidencias no intencionadas, ancla tu RegExp con `^` y sé lo más específico posible. </div>

3.  _(Opcional)_ Configura el parámetro de inicialización `traceSampleRate` para mantener un porcentaje definido de los rastros del backend. Si no se establece, el 100 % de las trazas provenientes de solicitudes del navegador se envían a Datadog. Para mantener el 20 % de las trazas del backend, por ejemplo:

    ```javascript
    import { datadogRum } from '@datadog/browser-rum'

    datadogRum.init({
        ...otherConfig,
        traceSampleRate: 20
    })
    ```

**Nota**: `traceSampleRate` **no** impacta el muestreo de sesiones RUM. Solo se muestrean los rastros del backend.

4. _(Opcional)_ Si configuras un `traceSampleRate`, para asegurar que las decisiones de muestreo de los servicios del backend aún se apliquen, configura el parámetro de inicialización `traceContextInjection` a `sampled` (configurado a `sampled` por defecto).

    Por ejemplo, si configuras el `traceSampleRate` al 20% en el SDK del Navegador:
    - Cuando `traceContextInjection` se establece en `all`, **el 20 %** de las trazas del backend se mantienen y **el 80 %** de las trazas del backend se descartan.

  {{< img src="real_user_monitoring/connect_rum_and_traces/traceContextInjection_all-2.png" alt="traceContextInjection configurado a todos" style="width:90%;">}}

    - When `traceContextInjection` is set to `sampled`, **20%** of backend traces are kept. For the remaining **80%**, the browser SDK **does not inject** a sampling decision. The decision is made on the server side and is based on the SDK head-based sampling [configuration][2]. In the example below, the backend sample rate is set to 40%, and therefore 32% of the remaining backend traces are kept.

    {{< img src="real_user_monitoring/connect_rum_and_traces/traceContextInjection_sampled-3.png" alt="traceContextInjection configurado a muestreados" style="width:90%;">}}

<div class="alert alert-info">El trazado de extremo a extremo está disponible para las solicitudes realizadas después de que se inicializa el SDK del Navegador. El trazado de extremo a extremo del documento HTML inicial y de las primeras solicitudes del navegador no es compatible.</div>

[1]: /es/real_user_monitoring/application_monitoring/browser/
[2]: /es/tracing/trace_pipeline/ingestion_mechanisms/#head-based-sampling
{{% /tab %}}
{{% tab "Android RUM" %}}

1. Configura [Monitoreo RUM Android][1].
2. Configura [Colección de Rastreo Android][2].
3. Agrega la dependencia de Gradle a la biblioteca `dd-sdk-android-okhttp` en el archivo `build.gradle` a nivel de módulo:

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
    }
    ```

4. Configura el interceptor `OkHttpClient` con la lista de orígenes internos de primera parte llamados por tu aplicación de Android.
    ```kotlin
    val tracedHosts = listOf("example.com", "example.eu")

    val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor.Builder(tracedHosts).build())
        .addNetworkInterceptor(TracingInterceptor.Builder(tracedHosts).build())
        .eventListenerFactory(DatadogEventListener.Factory())
        .build()
    ```

    By default, all subdomains of listed hosts are traced. For instance, if you add `example.com`, you also enable the tracing for `api.example.com` and `foo.example.com`.

3.  _(Opcional)_ Configura el parámetro `traceSampleRate` para mantener un porcentaje definido de las trazas del backend. Si no se establece, el 100 % de las trazas provenientes de las solicitudes de la aplicación se envían a Datadog. Para mantener el 20 % de las trazas del backend:

    ```kotlin
    val tracedHosts = listOf("example.com")

    val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(
          DatadogInterceptor.Builder(tracedHosts)
              .setTraceSampleRate(20f)
              .build()
        )
        .build()
    ```

**Nota**:
* `traceSampleRate` **no** impacta en el muestreo de sesiones RUM. Solo se muestrean las trazas del backend.
* Si defines tipos de encabezados de traza personalizados en la configuración de Datadog y estás utilizando un trazador registrado con `GlobalTracer`, asegúrate de que los mismos tipos de encabezados de traza estén configurados para el SDK en uso.

[1]: /es/real_user_monitoring/android/
[2]: /es/tracing/trace_collection/dd_libraries/android/?tab=kotlin
{{% /tab %}}
{{% tab "RUM de iOS" %}}

1. Configura [Monitoreo RUM iOS][1].

2. Habilita `RUM` e instrumentación de URLSession con la configuración `urlSessionTracking` y el parámetro `firstPartyHostsTracing`:
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
    
   Por defecto, todos los subdominios de los hosts listados son trazados. Por ejemplo, si agregas `example.com`, también habilitas el trazado para `api.example.com` y `foo.example.com`.

   La inyección de ID de traza funciona cuando proporcionas un `URLRequest` al `URLSession`. El trazado distribuido no funciona cuando utilizas un objeto `URL`.

3. _(Opcional)_ Para un desglose detallado del tiempo (resolución DNS, apretón de manos SSL, tiempo hasta el primer byte, tiempo de conexión y duración de la descarga), habilita `URLSessionInstrumentation` para tu tipo de `SessionDelegate`:
    ```swift
    URLSessionInstrumentation.enableDurationBreakdown(
        with: .init(
            delegateClass: <YourSessionDelegate>.self
        )
    )

    let session = URLSession(
        configuration: ...,
        delegate: <YourSessionDelegate>(),
        delegateQueue: ...
    )
    ```

   El trazado distribuido funciona automáticamente, pero los tiempos de traza son más precisos después de habilitar `URLSessionInstrumentation`.

4. _(Opcional)_ Establece el parámetro `sampleRate` para mantener un porcentaje definido de las trazas del backend. Si no se establece, el 100% de las trazas provenientes de las solicitudes de la aplicación se envían a Datadog.

     Para mantener el 20% de las trazas del backend:
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
                    sampleRate: 20
                )
            )
        )
    )
    ```
**Nota**: `sampleRate` **no** impacta el muestreo de sesiones RUM. Solo se muestrean las trazas del backend.

[1]: /es/real_user_monitoring/ios/
{{% /tab %}}
{{% tab "React Native RUM" %}}

1. Configura [RUM React Native Monitoring][1].

2. Establece el parámetro de inicialización `firstPartyHosts` para definir la lista de orígenes internos y de primera parte llamados por tu aplicación React Native:
    ```javascript
    const config = new DatadogProviderConfiguration(
        // ...
    );
    config.firstPartyHosts = ["example.com", "api.yourdomain.com"];
    ```

    By default, all subdomains of listed hosts are traced. For instance, if you add `example.com`, you also enable tracing for `api.example.com` and `foo.example.com`.

3. _(Opcional)_ Establece el parámetro de inicialización `resourceTracingSamplingRate` para mantener un porcentaje definido de las trazas del backend. Si no se establece, el 100% de las trazas provenientes de las solicitudes de la aplicación se envían a Datadog.

     Para mantener el 20% de las trazas del backend:
    ```javascript
    const config = new DatadogProviderConfiguration(
        // ...
    );
    config.resourceTracingSamplingRate = 20;
    ```

    **Note**: `resourceTracingSamplingRate` **does not** impact RUM sessions sampling. Only backend traces are sampled out.

[1]: /es/real_user_monitoring/reactnative/
{{% /tab %}}
{{% tab "Flutter RUM" %}}

1. Configura [RUM Flutter Monitoring][1].

2. Sigue las instrucciones en [Rastrear recursos automáticamente][2] para incluir el paquete del cliente HTTP de Datadog y habilitar el rastreo HTTP. Esto incluye los siguientes cambios en tu inicialización para agregar una lista de orígenes internos y de primera parte llamados por tu aplicación Flutter:
    ```dart
    final configuration = DatadogConfiguration(
      // ...
      // added configuration
      firstPartyHosts: ['example.com', 'api.yourdomain.com'],
    )..enableHttpTracking()
    ```

[1]: /es/real_user_monitoring/application_monitoring/flutter/setup/
[2]: /es/real_user_monitoring/application_monitoring/flutter/advanced_configuration#automatically-track-resources
{{% /tab %}}


{{% tab "Roku RUM" %}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">RUM para Roku no está disponible en el {{< region-param key="dd_datacenter" >}} sitio de Datadog.</div>
{{< /site-region >}}

1. Configura [RUM Roku Monitoring][1].

2. Utiliza el componente `datadogroku_DdUrlTransfer` para realizar tus solicitudes de red.
    ```brightscript
        ddUrlTransfer = datadogroku_DdUrlTransfer(m.global.datadogRumAgent)
        ddUrlTransfer.SetUrl(url)
        ddUrlTransfer.EnablePeerVerification(false)
        ddUrlTransfer.EnableHostVerification(false)
        result = ddUrlTransfer.GetToString()
    ```

[1]: /es/real_user_monitoring/application_monitoring/roku/setup/


{{% /tab %}}
{{% tab "Kotlin Multiplatform RUM" %}}

1. Configura [RUM Kotlin Multiplatform Monitoring][1].
2. Configura [instrumentación de Ktor][2].

3. Establece el parámetro de inicialización `tracedHosts` en la configuración del plugin de Datadog Ktor para definir la lista de orígenes internos y de primera parte llamados por tu aplicación Kotlin Multiplatform:
    ```kotlin
    val ktorClient = HttpClient {
        install(
            datadogKtorPlugin(
                tracedHosts = mapOf(
                    "example.com" to setOf(TracingHeaderType.DATADOG),
                    "example.eu" to setOf(TracingHeaderType.DATADOG)
                ),
                traceSampleRate = 100f
            )
        )
    }
    ```

    By default, all subdomains of listed hosts are traced. For instance, if you add `example.com`, you also enable tracing for `api.example.com` and `foo.example.com`.

4. _(Opcional)_ Establece el parámetro de inicialización `traceSampleRate` para mantener un porcentaje definido de las trazas del backend. Si no se establece, el 20 % de las trazas provenientes de las solicitudes de la aplicación se envían a Datadog.

     Para mantener el 100 % de las trazas del backend:
    ```kotlin
    val ktorClient = HttpClient {
        install(
            datadogKtorPlugin(
                tracedHosts = mapOf(
                    "example.com" to setOf(TracingHeaderType.DATADOG),
                    "example.eu" to setOf(TracingHeaderType.DATADOG)
                ),
                traceSampleRate = 100f
            )
        )
    }
    ```

    **Note**: `traceSampleRate` **does not** impact RUM sessions sampling. Only backend traces are sampled out.

[1]: /es/real_user_monitoring/application_monitoring/kotlin_multiplatform/setup
[2]: /es/real_user_monitoring/application_monitoring/kotlin_multiplatform/setup?tab=rum#initialize-the-rum-ktor-plugin-to-track-network-events-made-with-ktor
{{% /tab %}}
{{< /tabs >}}

### Verificando la configuración {#verifying-setup}

Para verificar que has configurado la integración de APM con RUM, sigue los pasos a continuación según el SDK que instalaste con RUM.


{{< tabs >}}
{{% tab "Navegador" %}}

1. Visita una página en tu aplicación.
2. En las herramientas de desarrollador de tu navegador, ve a la pestaña **Red**.
3. Revisa los encabezados de la solicitud para una solicitud de recurso que esperas que esté correlacionada y contenga los [encabezados de correlación de Datadog][1].

[1]: /es/real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum#how-rum-resources-are-linked-to-traces

{{% /tab %}}
{{% tab "Android" %}}

1. Ejecuta tu aplicación desde Android Studio.
2. Visita una pantalla en tu aplicación.
3. Abre el [Inspector de Red][1] de Android Studio.
4. Revisa los encabezados de la solicitud para un recurso de RUM y verifica que los [encabezados requeridos estén configurados por el SDK][2].

[1]: https://developer.android.com/studio/debug/network-profiler#network-inspector-overview
[2]: /es/real_user_monitoring/correlate_with_other_telemetry/apm?tab=androidrum#how-rum-resources-are-linked-to-traces

{{% /tab %}}
{{% tab "iOS" %}}

1. Ejecuta tu aplicación desde Xcode.
2. Visita una pantalla en tu aplicación.
3. Abre el [instrumento de Conexiones de Red y Tráfico HTTP][1] de Xcode.
4. Revisa los encabezados de la solicitud para un recurso de RUM y verifica que los [encabezados requeridos estén configurados por el SDK][2].

[1]: https://developer.apple.com/documentation/foundation/url_loading_system/analyzing_http_traffic_with_instruments
[2]: /es/real_user_monitoring/correlate_with_other_telemetry/apm/?tab=iosrum#how-rum-resources-are-linked-to-traces

{{% /tab %}}
{{% tab "React Native" %}}

1. Ejecuta tu aplicación desde Xcode (iOS) o Android Studio (Android).
2. Visita una pantalla en tu aplicación.
3. Abre el [instrumento de Conexiones de Red y Tráfico HTTP][1] de Xcode o el [Inspector de Red][2] de Android Studio.
4. Revisa los encabezados de la solicitud para un recurso de RUM y verifica que los [encabezados requeridos estén configurados por el SDK][3].

[1]: https://developer.apple.com/documentation/foundation/url_loading_system/analyzing_http_traffic_with_instruments
[2]: https://developer.android.com/studio/debug/network-profiler#network-inspector-overview
[3]: /es/real_user_monitoring/correlate_with_other_telemetry/apm/?tab=reactnativerum#how-rum-resources-are-linked-to-traces

{{% /tab %}}
{{% tab "Flutter" %}}

1. Ejecuta tu aplicación utilizando tu IDE preferido o `flutter run`.
2. Visita una pantalla en tu aplicación.
3. Abre las [Herramientas de Desarrollo][1] de Flutter y navega a [Vista de Red][2].
4. Verifica los encabezados de la solicitud para un recurso RUM y asegúrate de que los [encabezados requeridos estén configurados por el SDK][3].

[1]: https://docs.flutter.dev/tools/devtools/overview
[2]: https://docs.flutter.dev/tools/devtools/network
[3]: /es/real_user_monitoring/correlate_with_other_telemetry/apm/?tab=reactnativerum#how-rum-resources-are-linked-to-traces

{{% /tab %}}
{{% tab "Kotlin Multiplatform" %}}

1. Ejecuta tu aplicación desde Xcode (iOS) o Android Studio (Android).
2. Visita una pantalla en tu aplicación.
3. Abre el [instrumento de Conexiones de Red y Tráfico HTTP][1] de Xcode o el [Inspector de Red][2] de Android Studio.
4. Revisa los encabezados de la solicitud para un recurso de RUM y verifica que los [encabezados requeridos estén configurados por el SDK][3].

[1]: https://developer.apple.com/documentation/foundation/url_loading_system/analyzing_http_traffic_with_instruments
[2]: https://developer.android.com/studio/debug/network-profiler#network-inspector-overview
[3]: /es/real_user_monitoring/correlate_with_other_telemetry/apm/?tab=kotlinmultiplatformrum#how-rum-resources-are-linked-to-traces

{{% /tab %}}
{{< /tabs >}}

## RUM Explorer a Trazas {#rum-explorer-to-traces}

{{< img src="real_user_monitoring/connect_rum_and_traces/rum-trace-apm-link.png" alt="RUM y Trazas" style="width:100%;">}}

Para ver las trazas desde el RUM Explorer:

1. Navega a tu [lista de sesiones][22] y haz clic en una sesión que tenga trazas disponibles. También puedes consultar recursos con trazas usando`@_dd.trace_id:*`.

Cuando seleccionas una sesión, el panel de sesión aparece con un desglose de la duración de la solicitud, un gráfico de llamas para cada tramo, y un enlace de **Ver Traza en APM**.

## Trazas a RUM Explorer {#traces-to-rum-explorer}

{{< img src="real_user_monitoring/connect_rum_and_traces/rum-traces-to-rum.png" alt="RUM y Trazas" style="width:100%;">}}

Para ver el evento RUM desde Trazas:

1. Dentro de una vista de traza, haz clic en **VER** para ver todas las trazas creadas durante la duración de la vista, o **RECURSO** para ver trazas asociadas con el recurso específico desde la pestaña de Resumen.
1. Haz clic en **Ver Vista en RUM** o **Ver Recurso en RUM** para abrir el evento correspondiente en el RUM Explorer.

## Bibliotecas soportadas {#supported-libraries}

A continuación se muestra una lista de las bibliotecas de backend soportadas que deben estar en los servicios que reciben las solicitudes de red.

| Biblioteca          | Versión Mínima |
| ---------------- | --------------- |
| [Python][3]      | [0.22.0][4]     |
| [Go][5]          | [1.10.0][6]     |
| [Java][7]        | [0.24.1][8]     |
| [Ruby][9]        | [0.20.0][10]    |
| [JavaScript][11] | [0.10.0][12]    |
| [PHP][13]        | [0.33.0][14]    |
| [.NET][15]       | [1.18.2][16]    |


## Soporte de OpenTelemetry {#opentelemetry-support}

RUM admite varios tipos de propagadores para conectar recursos con backends que están instrumentados con bibliotecas de OpenTelemetry.

El estilo de inyección predeterminado es `tracecontext`, `Datadog`.

{{< tabs >}}
{{% tab "RUM para navegadores" %}}

**Nota**: Si está utilizando un marco de backend como Next.js/Vercel que utiliza OpenTelemetry, siga estos pasos.

1. Configure RUM para conectarse con APM como se describió anteriormente.

2. Modifique `allowedTracingUrls` de la siguiente manera:
    ```javascript
    import { datadogRum } from '@datadog/browser-rum'

    datadogRum.init({
        ...otherConfig,
        allowedTracingUrls: [
          { match: "https://api.example.com", propagatorTypes: ["tracecontext"]}
        ]
    })
    ```
    `match` accepts the same parameter types (`string`, `RegExp` or `function`) as when used in its simple form, described above.

    `propagatorTypes` accepts a list of strings for desired propagators:
      - `datadog`: Datadog's propagator (`x-datadog-*`)
      - `tracecontext`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`, `tracestate`)
      - `b3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `b3multi`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

{{% /tab %}}
{{% tab "RUM de iOS" %}}

1. Configure RUM para conectarse con APM como se describió anteriormente.

2. Utilice `.traceWithHeaders(hostsWithHeaders:sampleRate:)` en lugar de `.trace(hosts:sampleRate:)` de la siguiente manera:
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
    `.traceWithHeaders(hostsWithHeaders:sampleRate:)` takes `Dictionary<String, Set<TracingHeaderType>>` as a parameter, where the key is a host and the value is a list of supported tracing header types.

    `TracingHeaderType` in an enum representing the following tracing header types:
      - `.datadog`: Datadog's propagator (`x-datadog-*`)
      - `.tracecontext`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `.b3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `.b3multi`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)
{{% /tab %}}

{{% tab "RUM para Android" %}}
1. Configure RUM para conectarse con APM como se describió anteriormente.

2. Configure el interceptor `OkHttpClient` con la lista de orígenes internos de primera parte y el tipo de encabezado de trazado a utilizar de la siguiente manera:
    ```kotlin
    val tracedHosts = mapOf("example.com" to setOf(TracingHeaderType.TRACECONTEXT),
                          "example.eu" to setOf(TracingHeaderType.DATADOG))

    val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor.Builder(tracedHosts).build())
        .addNetworkInterceptor(TracingInterceptor.Builder(tracedHosts).build())
        .eventListenerFactory(DatadogEventListener.Factory())
        .build()
    ```

    `TracingHeaderType` is an enum representing the following tracing header types:
      - `.DATADOG`: Datadog's propagator (`x-datadog-*`)
      - `.TRACECONTEXT`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `.B3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `.B3MULTI`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

{{% /tab %}}

{{% tab "RUM para React Native" %}}
1. Configure RUM para [conectarse con APM](#setup-rum).

2. Configure el SDK de RUM con la lista de orígenes internos de primera parte y el tipo de encabezado de trazado a utilizar de la siguiente manera:
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

    `PropagatorType` is an enum representing the following tracing header types:
      - `PropagatorType.DATADOG`: Datadog's propagator (`x-datadog-*`)
      - `PropagatorType.TRACECONTEXT`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `PropagatorType.B3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `PropagatorType.B3MULTI`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

{{% /tab %}}

{{% tab "RUM para Flutter" %}}
1. Configure RUM para conectarse con APM como se describió anteriormente.

2. Utilice `firstPartyHostsWithTracingHeaders` en lugar de `firstPartyHosts` de la siguiente manera:
    ```dart
    final configuration = DatadogConfiguration(
      // ...
      // added configuration
      firstPartyHostsWithTracingHeaders: {
        'example.com': { TracingHeaderType.tracecontext },
      },
    )..enableHttpTracking()
    ```

    `firstPartyHostsWithTracingHeaders` takes `Map<String, Set<TracingHeaderType>>` as a parameter, where the key is a host and the value is a list of supported tracing header types.

    `TracingHeaderType` in an enum representing the following tracing header types:
      - `TracingHeaderType.datadog`: Datadog's propagator (`x-datadog-*`)
      - `TracingHeaderType.tracecontext`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `TracingHeaderType.b3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `TracingHeaderType.b3multi`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

{{% /tab %}}

{{% tab "RUM para Kotlin Multiplatform" %}}
1. Configure RUM para [conectarse con APM](#setup-rum).

2. Configure el SDK de RUM con la lista de orígenes internos de primera parte y el tipo de encabezado de trazado a utilizar de la siguiente manera:
    ```kotlin
    val ktorClient = HttpClient {
        install(
            datadogKtorPlugin(
                tracedHosts = mapOf(
                    "example.com" to setOf(TracingHeaderType.DATADOG),
                    "example.eu" to setOf(TracingHeaderType.DATADOG)
                ),
                traceSampleRate = 100f
            )
        )
    }
    ```

    `TracingHeaderType` is an enum representing the following tracing header types:
      - `TracingHeaderType.DATADOG`: Datadog's propagator (`x-datadog-*`)
      - `TracingHeaderType.TRACECONTEXT`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `TracingHeaderType.B3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `TracingHeaderType.B3MULTI`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

{{% /tab %}}

{{< /tabs >}}


## Cómo se vinculan los recursos de RUM a las trazas {#how-rum-resources-are-linked-to-traces}

Datadog utiliza el protocolo de traza distribuida y configura los encabezados HTTP a continuación. Por defecto, se utilizan tanto el contexto de traza como los encabezados específicos de Datadog.
{{< tabs >}} {{% tab "Datadog" %}}
`x-datadog-trace-id`
: Generado a partir del SDK de Real User Monitoring. Permite a Datadog vincular la traza con el recurso de RUM.

`x-datadog-parent-id`
: Generado a partir del SDK de Real User Monitoring. Permite a Datadog generar el primer tramo a partir de la traza.

`x-datadog-origin: rum`
: Generado a partir del SDK de Real User Monitoring. Permite a Datadog detectar la fuente de la traza.

`x-datadog-sampling-priority`
: Establecido en `1` por el SDK de Real User Monitoring si la traza fue muestreada, o `0` si no lo fue.
{{% /tab %}}
{{% tab "Contexto de traza W3C" %}}

`traceparent: [Versión]-[ID de traza]-[ID de padre]-[banderas de traza]`
: `version`: La especificación actual asume que la versión está establecida en `00`.
: `trace id`: ID de traza de 128 bits, hexadecimal en 32 caracteres. El ID de traza de origen es de 64 bits para mantener la compatibilidad con APM.
: `parent id`: ID de tramo de 64 bits, hexadecimal en 16 caracteres.
: `trace flags`: Muestreado (`01`) o no muestreado (`00`)

**Conversión de ID de traza**: El ID de traza W3C de 128 bits se crea rellenando el ID de traza original de 64 bits con ceros a la izquierda. Esto asegura la compatibilidad con APM mientras se ajusta a la especificación del Contexto de traza W3C. El ID de traza original de 64 bits se convierte en los 64 bits inferiores del ID de traza W3C de 128 bits.

`tracestate: dd=s:[sampling priority];o:[origin]`
: `dd`: Prefijo de proveedor de Datadog.
: `sampling priority`: Establecido en `1` si la traza fue muestreada, o `0` si no lo fue.
: `origin`: Siempre configúrelo en `rum` para asegurarse de que las trazas generadas por Real User Monitoring no afecten los recuentos de APM Index Spans.

**Ejemplos**:

ID de traza de origen (64 bits): `8448eb211c80319c`

Contexto de traza W3C (128 bits): `00000000000000008448eb211c80319c`

La relación muestra que el ID de traza original de 64 bits `8448eb211c80319c` está complementado con 16 ceros a la izquierda (`0000000000000000`) para crear el ID de traza W3C de 128 bits.

Ejemplo completo de traceparent:
: `traceparent: 00-00000000000000008448eb211c80319c-b7ad6b7169203331-01`
: `tracestate: dd=s:1;o:rum`

{{% /tab %}}
{{% tab "b3 / b3 Múltiples Encabezados" %}}
`b3: [ID de traza]-[ID de tramo]-[muestreado]`
: `trace id`: ID de traza de 64 bits, hexadecimal en 16 caracteres.
: `span id`: ID de tramo de 64 bits, hexadecimal en 16 caracteres.
: `sampled`: Verdadero (`1`) o Falso (`0`)

Ejemplo para encabezado único b3:
: `b3: 8448eb211c80319c-b7ad6b7169203331-1`

Ejemplo para múltiples encabezados b3:
: `X-B3-TraceId: 8448eb211c80319c`
: `X-B3-SpanId:  b7ad6b7169203331`
: `X-B3-Sampled: 1`
{{% /tab %}}
{{< /tabs >}}

Estos encabezados HTTP no están en la lista de seguridad CORS, por lo que debe [configurar Access-Control-Allow-Headers][17] en su servidor que maneja las solicitudes que el SDK está configurado para monitorear. El servidor también debe aceptar [solicitudes de preflight][18] (solicitudes OPTIONS), que son realizadas por el navegador antes de cada solicitud cuando se permite la traza en URLs de diferentes sitios.

## Retención de trazas {#trace-retention}

Las trazas ingeridas están disponibles durante 15 minutos en el explorador de [Live Search][19]. Para retener las trazas por un período de tiempo más largo, [cree filtros de retención de APM][20]. Aplique estos filtros de retención en cualquier etiqueta de tramo para retener trazas de páginas críticas y acciones de usuario.

Si utiliza RUM Sin Límites, también puede usar [filtros de retención de productos cruzados][21] para retener trazas de APM asociadas a sesiones específicas de RUM, optimizando la correlación entre su frontend y su backend. Por defecto, el 1% de las [sesiones de RUM y sus trazas son retenidas automáticamente][23] sin costo adicional.

## Efecto en las cuotas de APM {#effect-on-apm-quotas}

Conectar RUM y trazas puede aumentar significativamente los volúmenes ingeridos por APM. Utilice el parámetro de inicialización `traceSampleRate` para controlar una parte de las trazas del backend comenzando desde las solicitudes del navegador y móviles para ingerir.

Configurar filtros de retención de productos cruzados también puede aumentar los volúmenes indexados por APM. Utilice la tasa de retención de los filtros de retención de productos cruzados para controlar la parte de las trazas del backend a indexar.

## Lecturas adicionales {#further-reading}

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
[21]: /es/real_user_monitoring/rum_without_limits/retention_filters/#cross-product-retention-filters
[22]: https://app.datadoghq.com/rum/explorer
[23]: /es/tracing/trace_pipeline/trace_retention/#one-percent-flat-sampling