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
---

{{< img src="real_user_monitoring/connect_rum_and_traces/rum_trace_tab.png" alt="RUM and Traces"  style="width:100%;">}}

The APM integration with Real User Monitoring allows you to link requests from your web and mobile applications to their corresponding backend traces. This combination enables you to see your full frontend and backend data through one lens.

Use frontend data from RUM, as well as backend, infrastructure, and log information from trace ID injection to pinpoint issues anywhere in your stack and understand what your users are experiencing.

## Usage

### Prerequisites

-   You have set up [APM tracing][1] on the services targeted by your RUM applications.
-   Your services use an HTTP server.
-   Your HTTP servers are using [a library that supports distributed tracing](#supported-libraries).
-   You have XMLHttpRequest (XHR) or Fetch resources on the RUM Explorer to your `allowedTracingOrigins`.
-   You have a corresponding trace for requests to `allowedTracingOrigins`.

### Setup RUM

{{< tabs >}}
{{% tab "Browser RUM" %}}

1.  Set up [RUM Browser Monitoring][1].

2.  Initialize the RUM SDK. Configure the `allowedTracingOrigins` initialization parameter with the list of internal, first-party origins called by your browser application.

    ```javascript
    import { datadogRum } from '@datadog/browser-rum'

    datadogRum.init({
        applicationId: '<DATADOG_APPLICATION_ID>',
        clientToken: '<DATADOG_CLIENT_TOKEN>',
        ...otherConfig,
        service: "my-web-application",
        allowedTracingOrigins: ["https://api.example.com", /https:\/\/.*\.my-api-domain\.com/]
    })
    ```

To connect RUM to Traces, you need to specify your browser application in the `service` field.

**Note:** `allowedTracingOrigins` accepts Javascript strings and RegExp that matches the origins called by your browser application, defined as: `<scheme> "://" <hostname> [ ":" <port> ]`.

3.  _(Optional)_ Configure the `tracingSampleRate` initialization parameter to keep a defined percentage of the backend traces. If not set, 100% of the traces coming from browser requests are sent to Datadog. To keep 20% of backend traces:

    ```javascript
    import { datadogRum } from '@datadog/browser-rum'

    datadogRum.init({
        ...otherConfig,
        tracingSampleRate: 20
    })
    ```

**Note**: `tracingSampleRate` **does not** impact RUM sessions sampling. Only backend traces are sampled out.

<div class="alert alert-info">End-to-end tracing is available for requests fired after the Browser SDK is initialized. End-to-end tracing of the initial HTML document and early browser requests is not supported.</div>

[1]: /real_user_monitoring/browser/
{{% /tab %}}
{{% tab "Android RUM" %}}

1.  Set up [RUM Android Monitoring][1].

2.  Configure the `OkHttpClient` interceptor with the list of internal, first-party origins called by your Android application.
    ```java
    val tracedHosts =  listOf("example.com", "example.eu")

    val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor(tracedHosts))
        .addNetworkInterceptor(TracingInterceptor(tracedHosts))
        .eventListenerFactory(DatadogEventListener.Factory())
       .build()
    ```

**Note**: By default, all subdomains of listed hosts are traced. For instance, if you add `example.com`, you also enable the tracing for `api.example.com` and `foo.example.com`.

3.  _(Optional)_ Configure the `traceSamplingRate` parameter to keep a defined percentage of the backend traces. If not set, 100% of the traces coming from application requests are sent to Datadog. To keep 20% of backend traces:

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

2.  Set the `firstPartyHosts` initialization parameter with the list of internal, first-party origins called by your iOS application.
    ```swift
    Datadog.initialize(
    appContext: .init(),
    configuration: Datadog.Configuration
        .builderUsing(rumApplicationID: "<rum_app_id>", clientToken: "<client_token>", environment: "<env_name>")
        .set(firstPartyHosts: ["example.com", "api.yourdomain.com"])
        .build()
    )
    ```

3.  Initialize URLSession as stated in [Setup][1]:
    ```swift
    let session =  URLSession(
        configuration: ...,
        delegate: DDURLSessionDelegate(),
        delegateQueue: ...
    )
    ```

**Note**: By default, all subdomains of listed hosts are traced. For instance, if you add `example.com`, you also enable tracing for `api.example.com` and `foo.example.com`.

4.  _(Optional)_ Set the `tracingSampleRate` initialization parameter to keep a defined percentage of the backend traces. If not set, 100% of the traces coming from application requests are sent to Datadog. To keep 20% of backend traces:
    ```swift
    Datadog.initialize(
    appContext: .init(),
    configuration: Datadog.Configuration
        .builderUsing(rumApplicationID: "<rum_app_id>", clientToken: "<client_token>", environment: "<env_name>")
        .set(tracingSamplingRate: 20)
        .build()
    )
    ```

**Note**: `tracingSamplingRate` **does not** impact RUM sessions sampling. Only backend traces are sampled out.

[1]: /real_user_monitoring/ios/
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


## How are RUM resources linked to traces?

Datadog uses the distributed tracing protocol and sets up the following HTTP headers:

`x-datadog-trace-id`
: Generated from the Real User Monitoring SDK. Allows Datadog to link the trace with the RUM resource.

`x-datadog-parent-id`
: Generated from the Real User Monitoring SDK. Allows Datadog to generate the first span from the trace.

`x-datadog-origin: rum`
: To make sure the generated traces from Real User Monitoring don’t affect your APM Index Spans counts.

`x-datadog-sampling-priority: 1`
: To make sure that the Agent keeps the trace.

**Note**: These HTTP headers are not CORS-safelisted, so you need to [configure Access-Control-Allow-Headers][16] on your server handling requests that the SDK is set up to monitor. The server must also accept [preflight requests][17] (OPTIONS requests), which are made by the SDK prior to every request.

## How are APM quotas affected?

Connecting RUM and traces may significantly increase the APM ingested volumes. Use the initialization parameter `tracingSampleRate` to keep a share of the backend traces starting from browser and mobile requests.

## How long are traces retained?

These traces are available for 15 minutes in the [Live Search][18] explorer. To retain the traces for a longer period of time, create [retention filters][19]. Scope these retention filters on any span tag to retain traces for critical pages and user actions.

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
