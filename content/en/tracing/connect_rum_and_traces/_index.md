---
title: Connect RUM and Traces
kind: documentation
further_reading:
  - link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
    tag: "Blog"
    text: "Real User Monitoring"
  - link: "/tracing/"
    tag: "Documentation"
    text: "APM and Distributed Tracing"
---

{{< img src="tracing/connect_rum_and_traces/rum_trace_tab.png" alt="RUM and Traces"  style="width:100%;">}}

# Overview

The APM integration with Real User Monitoring allows you to link requests from your web and mobile applications to their corresponding backend traces, while providing the RUM session context.

Having frontend-related specifics (thanks to your RUM session) as well as backend, infrastructure, and log information (thanks to your trace id injection) allows you to pinpoint issues anywhere in your stack in unprecedented speed with a full understanding of what your users are experiencing.

<div class="alert alert-warning">
This feature is currently available for private beta. <a href="https://docs.datadoghq.com/help/">Reach out to support</a> to turn on this feature for your account.
</div>

# Usage
## Prerequisites

-   Your services targeted by your RUM applications are [traced on the APM side][1].
-   Your services use an HTTP server.
-   Your HTTP servers are using a library that supports distributed tracing.

## RUM set up
{{< tabs >}}
{{% tab "Browser RUM" %}}

1.  Set up [Browser Real User Monitoring][1]

2. Initialize the RUM SDK. Configure the `allowedTracingOrigins` initialization parameter with the list of internal (first party) origins called by your browser application.

```javascript
import { datadogRum } from '@datadog/browser-rum'
 
datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    ...otherConfig,
    allowedTracingOrigins: ["<https://api.example.com>", /https:\/\/.*\.my-api-domain\.com/]
})
```

**Note**: `allowedTracingOrigins` accepts Javascript String and RegExp.

[1]: /real_user_monitoring/browser/
{{% /tab %}}
{{% tab "Android RUM" %}}

1.  Set up [Android Real User Monitoring][1]
    
2.  Configure the OkHttpClient interceptor with the list of internal (first party) origins called by your Android application.
```java
val tracedHosts =  listOf("example.com", "example.eu")

val okHttpClient = OkHttpClient.Builder()
    .addInterceptor(DatadogInterceptor(tracedHosts))
    .addNetworkInterceptor(TracingInterceptor(tracedHosts))
    .eventListenerFactory(DatadogEventListener.Factory())
    .build()
```

**Note**: By default, all subdomains of listed hosts will be traced. For instance, adding example.com will also enable the tracing for api.example.com and foo.example.com

[1]: /real_user_monitoring/android/
{{% /tab %}}
{{% tab "iOS RUM" %}}

1.  Set up [iOS Real User Monitoring][1]
    
2.  Set the `firstPartyHosts` initialization parameter with the list of internal (first party) origins called by your iOS application.
```swift
Datadog.initialize(
appContext: .init(),
configuration: Datadog.Configuration
    .builderUsing(rumApplicationID: "<rum_app_id>", clientToken: "<client_token>", environment: "<env_name>")
    .set(firstPartyHosts: ["example.com", "api.yourdomain.com"])
    .build()
)
```

3.  Initialize URLSession as stated in the [set up documentation][1]:
```swift
let session =  URLSession(
    configuration: ...,
    delegate: DDURLSessionDelegate(),
    delegateQueue: ...
)
```

**Note**: By default, all subdomains of listed hosts will be traced. For instance, adding example.com will also enable the tracing for api.example.com and foo.example.com

[1]: /real_user_monitoring/ios/
{{% /tab %}}
{{< /tabs >}}

# Supported Libraries

The following Datadog tracing libraries are supported:

* [Python][2]
* [Go][3]
* [Java][4]
* [Ruby][5]
* [JavaScript][6]
* [PHP][7]
* [.NET][8]
    

## How are RUM resources linked to traces?
Datadog uses the distributed tracing protocol and sets up the following HTTP headers:

| HEADER                         | DESCRIPTION                                                                                            |
| ------------------------------ | ------------------------------------------------------------------------------------------------------ |
| x-datadog-trace-id             | Generated from the Real User Monitoring SDK. Allows Datadog to link the trace with the RUM resource.   |
| x-datadog-parent-id            | Generated from the Real User Monitoring SDK. Allows Datadog to generate the first span from the trace. |
| x-datadog-origin: rum          | To make sure the generated traces from Real User Monitoring don’t affect your APM Index Spans counts.              |
| x-datadog-sampling-priority: 1 | To make sure that the Agent keeps the trace.                                                           |
| x-datadog-sampled: 1           | To make sure that the Agent keeps the trace.     

## How are APM quotas affected?

The `x-datadog-origin: rum` header specifies to the APM backend that the traces are generated from Real User Monitoring. The generated traces consequently do not impact Indexed Span counts.

## How long are traces retained?

These traces are retained [just like your classical APM traces][9].

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing
[2]: https://github.com/DataDog/dd-trace-py/releases/tag/v0.22.0
[3]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.10.0
[4]: https://github.com/DataDog/dd-trace-java/releases/tag/v0.24.1
[5]: https://github.com/DataDog/dd-trace-rb/releases/tag/v0.20.0
[6]: https://github.com/DataDog/dd-trace-js/releases/tag/v0.10.0
[7]: https://github.com/DataDog/dd-trace-php/releases/tag/0.33.0
[8]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v1.18.2
[9]: /tracing/guide/trace_sampling_and_storage/#trace-storage
