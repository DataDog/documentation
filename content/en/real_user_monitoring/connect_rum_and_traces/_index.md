---
title: Connect RUM and Traces
kind: documentation
further_reading:
  - link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
    tag: "Blog"
    text: "Real User Monitoring"
  - link: "https://www.datadoghq.com/blog/modern-frontend-monitoring/"
    tag: "Blog"
    text: "Start monitoring single-page applications"
  - link: "/logs/guide/ease-troubleshooting-with-cross-product-correlation/"
    tag: "Guide"
    text: "Ease troubleshooting with cross-product correlation"
  - link: "/tracing/"
    tag: "Documentation"
    text: "APM and Distributed Tracing"
  - link: "/real_user_monitoring"
    tag: "Documentation"
    text: "RUM & Session Replay"
  - link: "https://www.datadoghq.com/blog/troubleshoot-with-session-replay-developer-tools/"
    tag: "Blog"
    text: "Troubleshoot with Session Replay browser dev tools"
  - link: "https://www.datadoghq.com/blog/correlate-traces-datadog-rum-otel/"
    tag: "Blog"
    text: "Correlate Datadog RUM events with traces from OTel-instrumented applications"
---

{{< img src="real_user_monitoring/connect_rum_and_traces/rum_trace_tab.png" alt="RUM and Traces" style="width:100%;">}}

## Overview

The APM integration with Real User Monitoring allows you to link requests from your web and mobile applications to their corresponding backend traces. This combination enables you to see your full frontend and backend data through one lens.

Use frontend data from RUM, as well as backend, infrastructure, and log information from trace ID injection to pinpoint issues anywhere in your stack and understand what your users are experiencing.

## Usage

### Prerequisites

-   You have set up [APM tracing][1] on the services targeted by your RUM applications.
-   Your services use an HTTP server.
-   Your HTTP servers are using [a library that supports distributed tracing](#supported-libraries).
-   You have the following set up based on your SDK:
    - With the **Browser SDK**, you have added the XMLHttpRequest (XHR) or Fetch resources on the RUM Explorer to your `allowedTracingUrls`.
    - With the **Mobile SDK**, you have added the Native or XMLHttpRequest (XHR) to your `firstPartyHosts`.
-   You have a corresponding trace for requests to `allowedTracingUrls` or `firstPartyHosts`.

### Setup RUM

{{< tabs >}}
{{% tab "Browser RUM" %}}

1.  Set up [RUM Browser Monitoring][1].

2.  Initialize the RUM SDK. Configure the `allowedTracingUrls` initialization parameter with the list of internal, first-party origins called by your browser application.

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

    To connect RUM to Traces, you need to specify your browser application in the `service` field.

    `allowedTracingUrls` matches the full URL (`<scheme>://<host>[:<port>]/<path>[?<query>][#<fragment>]`). It accepts the following types:
      - `string`: matches any URL that starts with the value, so `https://api.example.com` matches `https://api.example.com/v1/resource`.
      - `RegExp`: executes a test with the provided RegExp and the URL.
      - `function`: evaluates with the URL as parameter. Returning a `boolean` set to `true` indicates a match.

3.  _(Optional)_ Configure the `traceSampleRate` initialization parameter to keep a defined percentage of the backend traces. If not set, 100% of the traces coming from browser requests are sent to Datadog. To keep 20% of backend traces, for example:

    ```javascript
    import { datadogRum } from '@datadog/browser-rum'

    datadogRum.init({
        ...otherConfig,
        traceSampleRate: 20
    })
    ```

**Note**: `traceSampleRate` **does not** impact RUM sessions sampling. Only backend traces are sampled out.

<div class="alert alert-info">End-to-end tracing is available for requests fired after the Browser SDK is initialized. End-to-end tracing of the initial HTML document and early browser requests is not supported.</div>

[1]: /real_user_monitoring/browser/
{{% /tab %}}
{{% tab "Android RUM" %}}

1.  Set up [RUM Android Monitoring][1].

2.  Configure the `OkHttpClient` interceptor with the list of internal, first-party origins called by your Android application.
    ```java
    val tracedHosts = listOf("example.com", "example.eu")

    val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor(tracedHosts))
        .addNetworkInterceptor(TracingInterceptor(tracedHosts))
        .eventListenerFactory(DatadogEventListener.Factory())
       .build()
    ```

    By default, all subdomains of listed hosts are traced. For instance, if you add `example.com`, you also enable the tracing for `api.example.com` and `foo.example.com`.

3.  _(Optional)_ Configure the `traceSamplingRate` parameter to keep a defined percentage of the backend traces. If not set, 20% of the traces coming from application requests are sent to Datadog. To keep 100% of backend traces:

```java
    val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(RumInterceptor(traceSamplingRate = 100f))
       .build()
  ```

**Note**: `traceSamplingRate` **does not** impact RUM sessions sampling. Only backend traces are sampled out.

[1]: /real_user_monitoring/android/
{{% /tab %}}
{{% tab "iOS RUM" %}}

1.  Set up [RUM iOS Monitoring][1].

2.  Call the `trackURLSession(firstPartyHosts:)` builder function with the list of internal, first-party origins called by your iOS application.
    ```swift
    Datadog.initialize(
        appContext: .init(),
        configuration: Datadog.Configuration
            .builderUsing(
                rumApplicationID: "<rum_app_id>", 
                clientToken: "<client_token>", 
                environment: "<env_name>"
            )
            .trackURLSession(firstPartyHosts: ["example.com", "api.yourdomain.com"])
            .build()
    )
    ```

3. Initialize the global `Tracer`:
    ```swift
    Global.sharedTracer = Tracer.initialize(
        configuration: Tracer.Configuration(...)
    )
    ```

4. Initialize URLSession as stated in [Setup][1]:
    ```swift
    let session =  URLSession(
        configuration: ...,
        delegate: DDURLSessionDelegate(),
        delegateQueue: ...
    )
    ```

   By default, all subdomains of listed hosts are traced. For instance, if you add `example.com`, you also enable tracing for `api.example.com` and `foo.example.com`.

   Trace ID injection works when you are providing a `URLRequest` to the `URLSession`. Distributed tracing does not work when you are using a `URL` object.

5. _(Optional)_ Set the `tracingSamplingRate` initialization parameter to keep a defined percentage of the backend traces. If not set, 20% of the traces coming from application requests are sent to Datadog.

     To keep 100% of backend traces:
    ```swift
    Datadog.initialize(
        appContext: .init(),
        configuration: Datadog.Configuration
            .builderUsing(rumApplicationID: "<rum_app_id>", clientToken: "<client_token>", environment: "<env_name>")
            .set(tracingSamplingRate: 100)
            .build()
    )
    ```
**Note**: `tracingSamplingRate` **does not** impact RUM sessions sampling. Only backend traces are sampled out.

[1]: /real_user_monitoring/ios/
{{% /tab %}}
{{% tab "React Native RUM" %}}

1.  Set up [RUM React Native Monitoring][1].

2.  Set the `firstPartyHosts` initialization parameter to define the list of internal, first-party origins called by your React Native application:
    ```javascript
    const config = new DatadogProviderConfiguration(
        // ...
    );
    config.firstPartyHosts = ["example.com", "api.yourdomain.com"];
    ```

    By default, all subdomains of listed hosts are traced. For instance, if you add `example.com`, you also enable tracing for `api.example.com` and `foo.example.com`.

3. _(Optional)_ Set the `resourceTracingSamplingRate` initialization parameter to keep a defined percentage of the backend traces. If not set, 20% of the traces coming from application requests are sent to Datadog.

     To keep 100% of backend traces:
    ```javascript
    const config = new DatadogProviderConfiguration(
        // ...
    );
    config.resourceTracingSamplingRate = 100;
    ```

    **Note**: `resourceTracingSamplingRate` **does not** impact RUM sessions sampling. Only backend traces are sampled out.

[1]: /real_user_monitoring/reactnative/
{{% /tab %}}
{{< /tabs >}}

## Supported libraries

The following Datadog tracing libraries are supported:

| Library                             | Minimum Version                                                                                                             |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| [Python][2]                  | [0.22.0][3]                |
| [Go][4]                  | [1.10.0][5]                |
| [Java][6]                  | [0.24.1][7]                |
| [Ruby][8]                  | [0.20.0][9]                |
| [JavaScript][10]                  | [0.10.0][11]                |
| [PHP][12]                  | [0.33.0][13]                |
| [.NET][14]                  | [1.18.2][15]                |


## OpenTelemetry support

RUM supports several propagator types to connect resources with backends that are instrumented with OpenTelemetry libraries.

{{< tabs >}} {{% tab "Browser RUM" %}}
1. Set up RUM to connect with APM as described above.

2. Modify `allowedTracingUrls` as follows:
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
      - `tracecontext`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `b3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `b3multi`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)
{{% /tab %}}

{{% tab "iOS RUM" %}}
1. Set up RUM to connect with APM as described above.

2. Use `trackURLSession(firstPartyHostsWithHeaderTypes:)` instead of `trackURLSession(firstPartyHosts:)` as follows:
    ```swift
    Datadog.initialize(
        appContext: .init(),
        configuration: Datadog.Configuration
            .builderUsing(
                rumApplicationID: "<rum_app_id>", 
                clientToken: "<client_token>", 
                environment: "<env_name>"
            )
            .trackURLSession(
                firstPartyHostsWithHeaderTypes: [
                    "api.example.com": [.tracecontext]
                ]
            )
            .build()
        )
    ```
    `trackURLSession(firstPartyHostsWithHeaderTypes:)` takes `Dictionary<String, Set<TracingHeaderType>>` as a parameter, where the key is a host and the value is a list of supported tracing header types.

    `TracingHeaderType` in an enum representing the following tracing header types:
      - `.datadog`: Datadog's propagator (`x-datadog-*`)
      - `.tracecontext`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `.b3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `.b3multi`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)
{{% /tab %}}

{{% tab "Android RUM" %}}
1. Set up RUM to connect with APM as described above.

2. Configure the `OkHttpClient` interceptor with the list of internal, first-party origins and the tracing header type to use as follows:
    ```java
    val tracedHosts = mapOf("example.com" to setOf(TracingHeaderType.TRACECONTEXT), 
                          "example.eu" to setOf(TracingHeaderType.DATADOG))

    val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor(tracedHosts))
        .addNetworkInterceptor(TracingInterceptor(tracedHosts))
        .eventListenerFactory(DatadogEventListener.Factory())
       .build()
    ```
    
    `TracingHeaderType` is an enum representing the following tracing header types:
      - `.DATADOG`: Datadog's propagator (`x-datadog-*`)
      - `.TRACECONTEXT`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `.B3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `.B3MULTI`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)
    
{{% /tab %}}

{{% tab "React Native RUM" %}}
1. Set up RUM to [connect with APM](#setup-rum).

2. Configure the RUM SDK with the list of internal, first-party origins and the tracing header type to use as follows:
    ```javascript
    const config = new DatadogProviderConfiguration(
        // ...
    );
    config.firstPartyHosts = [
        {match: "example.com", propagatorTypes: PropagatorType.TRACECONTEXT},
        {match: "example.com", propagatorTypes: PropagatorType.DATADOG}
    ];
    ```
    
    `PropagatorType` is an enum representing the following tracing header types:
      - `PropagatorType.DATADOG`: Datadog's propagator (`x-datadog-*`)
      - `PropagatorType.TRACECONTEXT`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `PropagatorType.B3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `PropagatorType.B3MULTI`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)
    
{{% /tab %}} {{< /tabs >}}

## How are RUM resources linked to traces?

Datadog uses the distributed tracing protocol and sets up the following HTTP headers:
{{< tabs >}} {{% tab "Datadog" %}}
`x-datadog-trace-id`
: Generated from the Real User Monitoring SDK. Allows Datadog to link the trace with the RUM resource.

`x-datadog-parent-id`
: Generated from the Real User Monitoring SDK. Allows Datadog to generate the first span from the trace.

`x-datadog-origin: rum`
: To make sure the generated traces from Real User Monitoring don't affect your APM Index Spans counts.

`x-datadog-sampling-priority: 1`
: To make sure that the Agent keeps the trace.
{{% /tab %}}
{{% tab "W3C Trace Context" %}}
`traceparent: [version]-[trace id]-[parent id]-[trace flags]`
: `version`: The current specification assumes version is set to `00`.
: `trace id`: 128 bits trace ID, hexadecimal on 32 characters. The source trace ID is 64 bits to keep compatibility with APM.
: `parent id`: 64 bits span ID, hexadecimal on 16 characters.
: `trace flags`: Sampled (`01`) or not sampled (`00`)

Example:
: `traceparent: 00-00000000000000008448eb211c80319c-b7ad6b7169203331s-01`
{{% /tab %}}
{{% tab "b3 / b3 Multiple Headers" %}}
`b3: [trace id]-[span id]-[sampled]`
: `trace id`: 64 bits trace ID, hexadecimal on 16 characters.
: `span id`: 64 bits span ID, hexadecimal on 16 characters.
: `sampled`: True (`1`) or False (`0`)

Example for b3 single header:
: `b3: 8448eb211c80319c-b7ad6b7169203331-1`

Example for b3 multiple headers:
: `X-B3-TraceId: 8448eb211c80319c`
: `X-B3-SpanId:  b7ad6b7169203331`
: `X-B3-Sampled: 1`
{{% /tab %}}
{{< /tabs >}}

These HTTP headers are not CORS-safelisted, so you need to [configure Access-Control-Allow-Headers][16] on your server handling requests that the SDK is set up to monitor. The server must also accept [preflight requests][17] (OPTIONS requests), which are made by the SDK prior to every request.

## How are APM quotas affected?

Connecting RUM and traces may significantly increase the APM-ingested volumes. Use the initialization parameter `traceSampleRate` to keep a share of the backend traces starting from browser and mobile requests.

## How long are traces retained?

These traces are available for 15 minutes in the [Live Search][18] explorer. To retain the traces for a longer period of time, create [retention filters][19]. Scope these retention filters on any span tag to retain traces for critical pages and user actions.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing
[2]: /tracing/trace_collection/dd_libraries/python/
[3]: https://github.com/DataDog/dd-trace-py/releases/tag/v0.22.0
[4]: /tracing/trace_collection/dd_libraries/go/
[5]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.10.0
[6]: /tracing/trace_collection/dd_libraries/java/
[7]: https://github.com/DataDog/dd-trace-java/releases/tag/v0.24.1
[8]: /tracing/trace_collection/dd_libraries/ruby/
[9]: https://github.com/DataDog/dd-trace-rb/releases/tag/v0.20.0
[10]: /tracing/trace_collection/dd_libraries/nodejs/
[11]: https://github.com/DataDog/dd-trace-js/releases/tag/v0.10.0
[12]: /tracing/trace_collection/dd_libraries/php/
[13]: https://github.com/DataDog/dd-trace-php/releases/tag/0.33.0
[14]: /tracing/trace_collection/dd_libraries/dotnet-core/
[15]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v1.18.2
[16]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers
[17]: https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request
[18]: /tracing/trace_explorer/#live-search-for-15-minutes
[19]: /tracing/trace_pipeline/trace_retention/#retention-filters
