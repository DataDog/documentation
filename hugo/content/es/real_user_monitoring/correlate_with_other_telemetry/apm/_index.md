---
algolia:
  tags:
  - rum traces
aliases:
- /es/real_user_monitoring/connect_rum_and_traces
- /es/real_user_monitoring/platform/connect_rum_and_traces/
description: Conecte los datos de RUM de frontend con las trazas de APM de backend
  para obtener visibilidad de extremo a extremo en toda su pila de aplicaciones y
  el recorrido del usuario.
further_reading:
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: Blog
  text: Real User Monitoring
- link: https://www.datadoghq.com/blog/modern-frontend-monitoring/
  tag: Blog
  text: Comience a monitorear aplicaciones de una sola página
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: Guía
  text: Facilite la resolución de problemas con la correlación entre productos
- link: /tracing/
  tag: Documentación
  text: APM y rastreo distribuido
- link: /real_user_monitoring
  tag: Documentación
  text: RUM y Session Replay
- link: https://www.datadoghq.com/blog/troubleshoot-with-session-replay-developer-tools/
  tag: Blog
  text: Solucione problemas con las herramientas de desarrollo del navegador de Session
    Replay
- link: https://www.datadoghq.com/blog/correlate-traces-datadog-rum-otel/
  tag: Blog
  text: Correlacione eventos de Datadog RUM con trazas de aplicaciones instrumentadas
    con OpenTelemetry
- link: https://www.datadoghq.com/blog/rum-apm-single-step
  tag: Blog
  text: Habilite la visibilidad de extremo a extremo en sus aplicaciones Java con
    un solo comando
title: Conecte RUM y trazas
---
{{< img src="real_user_monitoring/connect_rum_and_traces/rum-trace-tab.png" alt="RUM y trazas" style="width:100%;">}}

## Descripción general {#overview}

La integración de APM con Real User Monitoring le permite vincular solicitudes de sus aplicaciones web y móviles con sus correspondientes trazas de backend. Esta combinación le permite ver todos sus datos de frontend y backend desde una misma perspectiva.

Utilice datos de frontend de RUM, así como información de backend, infraestructura y registros de la inyección de ID de traza para identificar problemas en cualquier parte de su pila y comprender lo que experimentan sus usuarios.

Para comenzar a enviar solo las trazas de su aplicación iOS a Datadog, consulte [iOS Trace Collection][1].

## Uso {#usage}

### Requisitos previos {#prerequisites}

-   Ha configurado [APM tracing][2] en los servicios a los que apuntan sus aplicaciones RUM.
-   Sus servicios utilizan un servidor HTTP.
-   Sus servidores HTTP están utilizando [una biblioteca que admite rastreo distribuido](#supported-libraries).
-   Tiene configurado lo siguiente según su SDK:
    - Con el **Browser SDK**, ha agregado los recursos XMLHttpRequest (XHR) o Fetch en el RUM Explorer a su `allowedTracingUrls`.
    - Con el **Mobile SDK**, ha agregado Native o XMLHttpRequest (XHR) a su `firstPartyHosts`.
-   Tiene una traza correspondiente para las solicitudes a `allowedTracingUrls` o `firstPartyHosts`.

### Configurar RUM {#setup-rum}

**Nota:** La configuración de RUM y trazas utiliza datos facturables de APM en RUM, lo cual puede afectar su facturación de APM.

{{< tabs >}}
{{% tab "RUM de navegador" %}}

1. Configure la [Supervisión de navegador de RUM][1].

2. Inicialice el SDK de RUM. Configure el parámetro de inicialización `allowedTracingUrls` con la lista de orígenes internos propios a los que su aplicación de navegador envía solicitudes.

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

   Para **CDN install**:

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

<div class="alert alert-danger">Al usar RegExp, se busca una coincidencia del patrón en cualquier parte de la URL completa, no solo al principio. Para evitar coincidencias no deseadas, ancle su RegExp con <code>^</code> y sea lo más específico posible. </div>

3.  _(Opcional)_ Configure el parámetro de inicialización `traceSampleRate` para conservar un porcentaje definido de las trazas de backend. Si no se establece, el 100 % de las trazas provenientes de las solicitudes del navegador se envían a Datadog. Para conservar el 20 % de las trazas de backend, por ejemplo:

    ```javascript
    import { datadogRum } from '@datadog/browser-rum'

    datadogRum.init({
        ...otherConfig,
        traceSampleRate: 20
    })
    ```

**Nota**: `traceSampleRate` **no** afecta el muestreo de sesiones de RUM. Solo se descartan las trazas de backend mediante muestreo.

4. _(Opcional)_ Si establece un `traceSampleRate`, para asegurarse de que las decisiones de muestreo de los servicios de backend sigan aplicándose, configure el parámetro de inicialización `traceContextInjection` en `sampled` (establecido en `sampled` de forma predeterminada).

    Por ejemplo, si establece `traceSampleRate` en 20 % en el SDK de navegador:
    - Cuando `traceContextInjection` se establece en `all`, se conserva el **20 %** de las trazas de backend y se descarta el **80 %** de las trazas de backend.

  {{< img src="real_user_monitoring/connect_rum_and_traces/traceContextInjection_all-2.png" alt="traceContextInjection establecido en all" style="width:90%;">}}

    - When `traceContextInjection` is set to `sampled`, **20%** of backend traces are kept. For the remaining **80%**, the browser SDK **does not inject** a sampling decision. The decision is made on the server side and is based on the SDK head-based sampling [configuration][2]. In the example below, the backend sample rate is set to 40%, and therefore 32% of the remaining backend traces are kept.

    {{< img src="real_user_monitoring/connect_rum_and_traces/traceContextInjection_sampled-3.png" alt="traceContextInjection establecido en sampled" style="width:90%;">}}

<div class="alert alert-info">El rastreo de extremo a extremo está disponible para las solicitudes realizadas después de que se inicializa el SDK de navegador. No se admite el rastreo de extremo a extremo del documento HTML inicial ni de las primeras solicitudes del navegador.</div>

[1]: /es/real_user_monitoring/application_monitoring/browser/
[2]: /es/tracing/trace_pipeline/ingestion_mechanisms/#head-based-sampling
{{% /tab %}}
{{% tab "RUM para Android" %}}

1. Configure la [Supervisión de RUM para Android][1].
2. Configure la [Recopilación de rastreos para Android][2].
3. Agregue la dependencia de Gradle a la biblioteca `dd-sdk-android-okhttp` en el archivo `build.gradle` a nivel de módulo:

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
    }
    ```

4. Configure el interceptor `OkHttpClient` con la lista de orígenes internos de primera parte a los que llama su aplicación de Android.
    ```kotlin
    val tracedHosts = listOf("example.com", "example.eu")

    val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor.Builder(tracedHosts).build())
        .addNetworkInterceptor(TracingInterceptor.Builder(tracedHosts).build())
        .eventListenerFactory(DatadogEventListener.Factory())
        .build()
    ```

    By default, all subdomains of listed hosts are traced. For instance, if you add `example.com`, you also enable the tracing for `api.example.com` and `foo.example.com`.

3.  _(Opcional)_ Configure el parámetro `traceSampleRate` para conservar un porcentaje definido de las trazas de backend. Si no se establece, el 100 % de las trazas provenientes de las solicitudes de la aplicación se envían a Datadog. Para conservar el 20 % de las trazas de backend:

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
* `traceSampleRate` **no** afecta el muestreo de sesiones de RUM. Solo se descartan las trazas de backend mediante muestreo.
* Si define tipos de encabezado de rastreo personalizados en la configuración de Datadog y utiliza un rastreador registrado con `GlobalTracer`, asegúrese de que los mismos tipos de encabezado de rastreo estén configurados para el SDK en uso.

[1]: /es/real_user_monitoring/android/
[2]: /es/tracing/trace_collection/dd_libraries/android/?tab=kotlin
{{% /tab %}}
{{% tab "RUM para iOS" %}}

1. Configure la [Supervisión de RUM para iOS][1].

2. Habilite `RUM` y la instrumentación de URLSession con la configuración `urlSessionTracking` y el parámetro `firstPartyHostsTracing`:
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
    
   De forma predeterminada, se rastrean todos los subdominios de los hosts enumerados. Por ejemplo, si agrega `example.com`, también habilita el rastreo para `api.example.com` y `foo.example.com`.

   La inyección del ID de traza funciona cuando proporciona un `URLRequest` al `URLSession`. El rastreo distribuido no funciona cuando utiliza un objeto `URL`.

3. _(Opcional)_ Para obtener un desglose detallado de los tiempos (resolución de DNS, establecimiento de la conexión SSL, tiempo hasta el primer byte, tiempo de conexión y duración de la descarga), habilite `URLSessionInstrumentation` para su tipo `SessionDelegate`:
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

   **Nota**: El rastreo distribuido funciona automáticamente, pero los tiempos de las trazas son más precisos después de habilitar `URLSessionInstrumentation`.

4. _(Opcional)_ Establezca el parámetro `sampleRate` para conservar un porcentaje definido de las trazas de backend. Si no se establece, el 100 % de las trazas provenientes de las solicitudes de la aplicación se envían a Datadog.

     Para conservar el 20 % de las trazas de backend:
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
**Nota**: `sampleRate` **no** afecta el muestreo de sesiones de RUM. Solo se descartan las trazas de backend mediante muestreo.

[1]: /es/real_user_monitoring/ios/
{{% /tab %}}
{{% tab "RUM para React Native" %}}

1. Configure la [Supervisión de RUM para React Native][1].

2. Establezca el parámetro de inicialización `firstPartyHosts` para definir la lista de orígenes internos de primera parte a los que llama su aplicación de React Native:
    ```javascript
    const config = new DatadogProviderConfiguration(
        // ...
    );
    config.firstPartyHosts = ["example.com", "api.yourdomain.com"];
    ```

    By default, all subdomains of listed hosts are traced. For instance, if you add `example.com`, you also enable tracing for `api.example.com` and `foo.example.com`.

3. _(Opcional)_ Establezca el parámetro de inicialización `resourceTracingSamplingRate` para conservar un porcentaje definido de las trazas de backend. Si no se establece, el 100 % de las trazas provenientes de las solicitudes de la aplicación se envían a Datadog.

     Para conservar el 20 % de las trazas de backend:
    ```javascript
    const config = new DatadogProviderConfiguration(
        // ...
    );
    config.resourceTracingSamplingRate = 20;
    ```

    **Note**: `resourceTracingSamplingRate` **does not** impact RUM sessions sampling. Only backend traces are sampled out.

[1]: /es/real_user_monitoring/reactnative/
{{% /tab %}}
{{% tab "RUM para Flutter" %}}

1. Configure la [Supervisión de RUM para Flutter][1].

2. Siga las instrucciones en [Rastreo automático de recursos][2] para incluir el paquete Datadog Tracking HTTP Client y habilitar el rastreo HTTP. Esto incluye los siguientes cambios en su inicialización para agregar una lista de orígenes internos de primera parte a los que llama su aplicación de Flutter:
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


{{% tab "RUM para Roku" %}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">RUM para Roku no está disponible en el {{< region-param key="dd_datacenter" >}} sitio de Datadog.</div>
{{< /site-region >}}

1. Configure la [Supervisión de RUM para Roku][1].

2. Utilice el componente `datadogroku_DdUrlTransfer` para realizar sus solicitudes de red.
    ```brightscript
        ddUrlTransfer = datadogroku_DdUrlTransfer(m.global.datadogRumAgent)
        ddUrlTransfer.SetUrl(url)
        ddUrlTransfer.EnablePeerVerification(false)
        ddUrlTransfer.EnableHostVerification(false)
        result = ddUrlTransfer.GetToString()
    ```

[1]: /es/real_user_monitoring/application_monitoring/roku/setup/


{{% /tab %}}
{{% tab "RUM para Kotlin Multiplatform" %}}

1. Configure la [Supervisión de RUM para Kotlin Multiplatform][1].
2. Configure la [instrumentación de Ktor][2].

3. Establezca el parámetro de inicialización `tracedHosts` en la configuración de Datadog Ktor Plugin para definir la lista de orígenes internos de primera parte a los que llama su aplicación Kotlin Multiplatform:
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

4. _(Opcional)_ Establezca el parámetro de inicialización `traceSampleRate` para conservar un porcentaje definido de las trazas del backend. Si no se establece, el 20% de las trazas provenientes de las solicitudes de la aplicación se envían a Datadog.

     Para conservar el 100% de las trazas del backend:
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

### Verificación de la configuración {#verifying-setup}

Para verificar que configuró la integración de APM con RUM, siga los pasos a continuación según el SDK con el que instaló RUM.


{{< tabs >}}
{{% tab "Navegador" %}}

1. Visite una página en su aplicación.
2. En las herramientas de desarrollador de su navegador, vaya a la pestaña {{< ui >}}Network{{< /ui >}}.
3. Verifique que los encabezados de una solicitud de recurso que espera que esté correlacionada incluyan los [encabezados de correlación de Datadog][1].

[1]: /es/real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum#how-rum-resources-are-linked-to-traces

{{% /tab %}}
{{% tab "Android" %}}

1. Ejecute su aplicación desde Android Studio.
2. Visite una pantalla en su aplicación.
3. Abra el [Network Inspector][1] de Android Studio.
4. Verifique los encabezados de solicitud de un recurso RUM y confirme que los [encabezados requeridos estén configurados por el SDK][2].

[1]: https://developer.android.com/studio/debug/network-profiler#network-inspector-overview
[2]: /es/real_user_monitoring/correlate_with_other_telemetry/apm?tab=androidrum#how-rum-resources-are-linked-to-traces

{{% /tab %}}
{{% tab "iOS" %}}

1. Ejecute su aplicación desde Xcode.
2. Visite una pantalla en su aplicación.
3. Abra el [Network Connections and HTTP Traffic instrument][1] de Xcode.
4. Verifique los encabezados de solicitud de un recurso RUM y confirme que los [encabezados requeridos estén configurados por el SDK][2].

[1]: https://developer.apple.com/documentation/foundation/url_loading_system/analyzing_http_traffic_with_instruments
[2]: /es/real_user_monitoring/correlate_with_other_telemetry/apm/?tab=iosrum#how-rum-resources-are-linked-to-traces

{{% /tab %}}
{{% tab "React Native" %}}

1. Ejecute su aplicación desde Xcode (iOS) o Android Studio (Android).
2. Visite una pantalla en su aplicación.
3. Abra el [Network Connections and HTTP Traffic instrument][1] de Xcode o el [Network Inspector][2] de Android Studio.
4. Verifique los encabezados de solicitud de un recurso RUM y confirme que los [encabezados requeridos estén configurados por el SDK][3].

[1]: https://developer.apple.com/documentation/foundation/url_loading_system/analyzing_http_traffic_with_instruments
[2]: https://developer.android.com/studio/debug/network-profiler#network-inspector-overview
[3]: /es/real_user_monitoring/correlate_with_other_telemetry/apm/?tab=reactnativerum#how-rum-resources-are-linked-to-traces

{{% /tab %}}
{{% tab "Flutter" %}}

1. Ejecute su aplicación usando su IDE preferido o `flutter run`.
2. Visite una pantalla en su aplicación.
3. Abra las [Dev Tools][1] de Flutter y vaya a [Network View][2].
4. Verifique los encabezados de solicitud de un recurso RUM y confirme que los [encabezados requeridos estén configurados por el SDK][3].

[1]: https://docs.flutter.dev/tools/devtools/overview
[2]: https://docs.flutter.dev/tools/devtools/network
[3]: /es/real_user_monitoring/correlate_with_other_telemetry/apm/?tab=reactnativerum#how-rum-resources-are-linked-to-traces

{{% /tab %}}
{{% tab "Kotlin Multiplatform" %}}

1. Ejecute su aplicación desde Xcode (iOS) o Android Studio (Android).
2. Visite una pantalla en su aplicación.
3. Abra el [Network Connections and HTTP Traffic instrument][1] de Xcode o el [Network Inspector][2] de Android Studio.
4. Verifique los encabezados de solicitud de un recurso RUM y confirme que los [encabezados requeridos estén configurados por el SDK][3].

[1]: https://developer.apple.com/documentation/foundation/url_loading_system/analyzing_http_traffic_with_instruments
[2]: https://developer.android.com/studio/debug/network-profiler#network-inspector-overview
[3]: /es/real_user_monitoring/correlate_with_other_telemetry/apm/?tab=kotlinmultiplatformrum#how-rum-resources-are-linked-to-traces

{{% /tab %}}
{{< /tabs >}}

## De RUM Explorer a Traces {#rum-explorer-to-traces}

{{< img src="real_user_monitoring/connect_rum_and_traces/rum-trace-apm-link.png" alt="RUM y trazas" style="width:100%;">}}

Para ver trazas desde RUM Explorer:

1. Navegue a su [lista de sesiones][22] y haga clic en una sesión que tenga trazas disponibles. También puede consultar recursos con trazas usando`@_dd.trace_id:*`.

Cuando selecciona una sesión, aparece el panel de sesión con un desglose de la duración de la solicitud, un gráfico de llamas para cada tramo y un enlace {{< ui >}}View Trace in APM{{< /ui >}}.

## De Traces a RUM Explorer {#traces-to-rum-explorer}

{{< img src="real_user_monitoring/connect_rum_and_traces/rum-traces-to-rum.png" alt="RUM y trazas" style="width:100%;">}}

Para ver el evento de RUM desde Traces:

1. Dentro de una vista de trazas, haga clic en {{< ui >}}VIEW{{< /ui >}} para ver todas las trazas creadas durante la vida útil de la vista, o en {{< ui >}}RESOURCE{{< /ui >}} para ver las trazas asociadas con el recurso específico desde la pestaña {{< ui >}}Overview{{< /ui >}}.
1. Haga clic en {{< ui >}}See View in RUM{{< /ui >}} o {{< ui >}}See Resource in RUM{{< /ui >}} para abrir el evento correspondiente en RUM Explorer.

## Bibliotecas compatibles {#supported-libraries}

A continuación se muestra una lista de las bibliotecas de backend compatibles que deben estar en los servicios que reciben las solicitudes de red.

| Biblioteca          | Versión mínima |
| ---------------- | --------------- |
| [Python][3]      | [0.22.0][4]     |
| [Go][5]          | [1.10.0][6]     |
| [Java][7]        | [0.24.1][8]     |
| [Ruby][9]        | [0.20.0][10]    |
| [JavaScript][11] | [0.10.0][12]    |
| [PHP][13]        | [0.33.0][14]    |
| [.NET][15]       | [1.18.2][16]    |


## Compatibilidad con OpenTelemetry {#opentelemetry-support}

RUM admite varios tipos de propagadores para conectar recursos con backends que están instrumentados con bibliotecas de OpenTelemetry.

El estilo de inyección predeterminado es `tracecontext`, `Datadog`.

{{< tabs >}}
{{% tab "RUM de navegador" %}}

**Nota**: Si está utilizando un framework de backend como Next.js/Vercel que utiliza OpenTelemetry, siga estos pasos.

1. Configure RUM para conectarse con APM como se describe anteriormente.

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
{{% tab "RUM para iOS" %}}

1. Configure RUM para conectarse con APM como se describe anteriormente.

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
1. Configure RUM para conectarse con APM como se describe anteriormente.

2. Configure el interceptor `OkHttpClient` con la lista de orígenes internos de primera parte y el tipo de encabezado de rastreo que se utilizará de la siguiente manera:
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

2. Configure el SDK de RUM con la lista de orígenes internos de primera parte y el tipo de encabezado de rastreo que se utilizará de la siguiente manera:
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
1. Configure RUM para conectarse con APM como se describe anteriormente.

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

2. Configure el SDK de RUM con la lista de orígenes internos propios y el tipo de encabezado de rastreo que se utilizará de la siguiente manera:
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


## Cómo se vinculan los recursos de RUM a los rastreos {#how-rum-resources-are-linked-to-traces}

Datadog utiliza el protocolo de rastreo distribuido y configura los siguientes encabezados HTTP. De forma predeterminada, se utilizan tanto el contexto de rastreo como los encabezados específicos de Datadog.

Estos encabezados se agregan solo cuando su tipo de propagador correspondiente está activo. De forma predeterminada, RUM incluye el propagador `datadog` junto con el contexto de rastreo. Consulte [Soporte de OpenTelemetry](#opentelemetry-support) para ver o cambiar qué propagadores están habilitados.
{{< tabs >}} {{% tab "Datadog" %}}
`x-datadog-trace-id`
: Generado desde el SDK de Real User Monitoring. Permite a Datadog vincular la traza con el recurso RUM.

`x-datadog-parent-id`
: Generado desde el SDK de Real User Monitoring. Permite a Datadog generar el primer tramo a partir de la traza.

`x-datadog-origin: rum`
: Generado desde el SDK de Real User Monitoring. Permite a Datadog detectar la fuente de la traza.

`x-datadog-sampling-priority`
: El SDK de Real User Monitoring lo establece en `1` si se tomó una muestra de la traza, o en `0` si no se tomó.
{{% /tab %}}
{{% tab "W3C Trace Context" %}}

`traceparent: [version]-[trace id]-[parent id]-[trace flags]`
: `version`: La especificación actual asume que la versión está establecida en `00`.
: `trace id`: ID de traza de 128 bits, representado en 32 caracteres hexadecimales. El ID de traza de la fuente es de 64 bits para mantener la compatibilidad con APM.
: `parent id`: ID de tramo de 64 bits, representado en 16 caracteres hexadecimales.
: `trace flags`: Muestreado (`01`) o no muestreado (`00`)

**Conversión de ID de traza**: El ID de traza W3C de 128 bits se crea rellenando con ceros a la izquierda el ID de traza original de 64 bits de la fuente. Esto garantiza la compatibilidad con APM al tiempo que cumple con la especificación W3C Trace Context. El ID de traza original de 64 bits se convierte en los 64 bits inferiores del ID de traza W3C de 128 bits.

`tracestate: dd=s:[sampling priority];o:[origin]`
: `dd`: Prefijo de proveedor de Datadog.
: `sampling priority`: Se establece en `1` si la traza fue muestreada, o en `0` si no lo fue.
: `origin`: Establezca siempre el valor en `rum` para asegurarse de que las trazas generadas por Real User Monitoring no afecten los recuentos de APM Index Spans.

**Ejemplos**:

ID de traza de fuente (64 bits): `8448eb211c80319c`

W3C Trace Context (128 bits): `00000000000000008448eb211c80319c`

La relación muestra que el ID de traza original de 64 bits `8448eb211c80319c` se rellena con 16 ceros iniciales (`0000000000000000`) para crear el ID de traza W3C de 128 bits.

Ejemplo completo de traceparent:
: `traceparent: 00-00000000000000008448eb211c80319c-b7ad6b7169203331-01`
: `tracestate: dd=s:1;o:rum`

{{% /tab %}}
{{% tab "b3 / b3 múltiples encabezados" %}}
`b3: [trace id]-[span id]-[sampled]`
: `trace id`: ID de traza de 64 bits, hexadecimal en 16 caracteres.
: `span id`: ID de tramo de 64 bits, hexadecimal de 16 caracteres.
: `sampled`: Verdadero (`1`) o Falso (`0`)

Ejemplo para encabezado único b3:
: `b3: 8448eb211c80319c-b7ad6b7169203331-1`

Ejemplo para múltiples encabezados b3:
: `X-B3-TraceId: 8448eb211c80319c`
: `X-B3-SpanId:  b7ad6b7169203331`
: `X-B3-Sampled: 1`
{{% /tab %}}
{{< /tabs >}}

Estos encabezados HTTP no están en la lista de permitidos de CORS, por lo que debe [configurar Access-Control-Allow-Headers][17] en el servidor que maneja las solicitudes de las que el SDK está configurado para hacer un seguimiento. El servidor también debe aceptar [solicitudes de preflight][18] (solicitudes OPTIONS), que son realizadas por el navegador antes de cada solicitud cuando el rastreo está permitido en URLs entre sitios.

## Retención de trazas {#trace-retention}

Las trazas ingeridas están disponibles durante 15 minutos en el explorador de [Live Search][19]. Para retener las trazas durante un período de tiempo más largo, [cree filtros de retención de APM][20]. Defina el contexto de estos filtros de retención mediante cualquier etiqueta de tramo para conservar las trazas de páginas y acciones de usuario críticas.

Si usa RUM Without Limits, también puede usar [filtros de retención entre productos][21] para retener trazas de APM asociadas a sesiones de RUM específicas, optimizando la correlación entre su frontend y su backend. De forma predeterminada, el 1% de las [sesiones de RUM y sus trazas se retienen automáticamente][23] sin costo adicional.

## Efecto en las cuotas de APM {#effect-on-apm-quotas}

Conectar RUM y las trazas puede aumentar significativamente el volumen de datos ingeridos por APM. Use el parámetro de inicialización `traceSampleRate` para controlar la proporción de trazas de backend originadas por solicitudes de navegadores y dispositivos móviles que se ingerirán.

Configurar filtros de retención entre productos también puede aumentar el volumen de datos indexados por APM. Use la tasa de retención de los filtros de retención entre productos para controlar la proporción de trazas de backend que se indexarán.

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