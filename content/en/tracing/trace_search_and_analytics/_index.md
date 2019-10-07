---
title: Trace Search and Analytics
kind: documentation
aliases:
  - /tracing/visualization/search/
---

{{< vimeo 278748711 >}}

[Trace Search & Analytics][1] is used to filter APM events by user-defined tags such as `customer_id`, `error_type`, or `app_name` to help troubleshoot and filter your requests. To enable it, either:

* Configure your APM tracer to emit the relevant analytics from your services—this can be done either [automatically](#automatic-configuration) or [manually](#custom-instrumentation). Next, [enable Trace Search inside Datadog][1] to begin forwarding these analytics.

**Note**: to use Trace Search, you must be using Agent v6.7+.

## Automatic Configuration

{{< tabs >}}
{{% tab "Java" %}}

Trace Search & Analytics is available starting in version 0.25.0 of the Java tracing client. It can be enabled globally for all **web** integrations with one configuration parameter in the Tracing client:

* System Property: `-Ddd.trace.analytics.enabled=true`
* Environment Variable: `DD_TRACE_ANALYTICS_ENABLED=true`

 After enabling, the Trace Search & Analytics UI starts showing results. Visit [Trace Search page][1] to get started.


[1]: https://app.datadoghq.com/apm/search
{{% /tab %}}
{{% tab "Python" %}}

Trace Search & Analytics is available starting in version 0.19.0 of the Python tracing client. Enable Trace Search & Analytics globally for all **web** integrations with one configuration parameter in the Tracing Client:

* Tracer Configuration: `ddtrace.config.analytics_enabled = True`
* Environment Variable: `DD_TRACE_ANALYTICS_ENABLED=true`

 After enabling, the Trace Search & Analytics UI starts showing results. Visit [Trace Search page][1] to get started.


[1]: https://app.datadoghq.com/apm/search
{{% /tab %}}
{{% tab "Ruby" %}}

Trace Search & Analytics is available starting in version 0.19.0 of the Ruby tracing client, and can be enabled for all **web** integrations with a global flag.

 To do so, set either `DD_TRACE_ANALYTICS_ENABLED=true` in your environment, or configure with:

 ```ruby
Datadog.configure { |c| c.analytics_enabled = true }
```

 - `true` enables analytics for all web frameworks.
- `false` or `nil` disables analytics, except for integrations that explicitly enable it. (Default)

 After enabling, the [Trace Search & Analytics][1] page populates.


[1]: https://app.datadoghq.com/apm/search
{{% /tab %}}
{{% tab "Go" %}}

Trace Search & Analytics is available starting in version 1.11.0 of the Go tracing client, and can be enabled globally for all **web** integrations using the [`WithAnalytics`][1] tracer start option. For example:

```go
tracer.Start(tracer.WithAnalytics(true))
```

 After enabling, the Trace Search & Analytics UI starts showing results. Visit [Trace Search page][2] to get started.


[1]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#WithAnalytics
[2]: https://app.datadoghq.com/apm/search
{{% /tab %}}
{{% tab "Node.js" %}}

Trace Search & Analytics is available starting in version 0.10.0 of the Node.js tracing client, and can be enabled globally for all web integrations with one configuration parameter in the tracing client:

```javascript
tracer.init({
  analytics: true
})
```

You can also use the following configuration parameter:

* Environment Variable: `DD_TRACE_ANALYTICS_ENABLED=true`

 After enabling, the Trace Search & Analytics UI starts showing results. Visit [Trace Search page][1] to get started.


[1]: https://app.datadoghq.com/apm/search
{{% /tab %}}
{{% tab ".NET" %}}

Trace Search & Analytics is available starting in version 1.1.0 of the .NET tracing client, and can be enabled globally for all **web** integrations with one configuration parameter in the Tracing Client:

 * Environment Variable or AppSetting: `DD_TRACE_ANALYTICS_ENABLED=true`

 This setting can also be set in code:

```csharp
Tracer.Instance.Settings.AnalyticsEnabled = true;
```

 After enabling, the Trace Search & Analytics UI starts showing results. Visit [Trace Search page][1] to get started.


[1]: https://app.datadoghq.com/apm/search
{{% /tab %}}
{{% tab "PHP" %}}

Trace Search & Analytics is available starting in version 0.17.0 of the PHP tracing client, and can be enabled globally for all **web** integrations with one configuration parameter in the Tracing Client:

 * Environment Variable: `DD_TRACE_ANALYTICS_ENABLED=true`

 After enabling, the Trace Search & Analytics UI starts showing results. Visit [Trace Search page][1] to get started.


[1]: https://app.datadoghq.com/apm/search
{{% /tab %}}
{{< /tabs >}}

## Configure Additional Services (optional)

### Configure by integration

{{< tabs >}}
{{% tab "Java" %}}


In addition to setting globally, you can enable or disable Trace Search & Analytics for individual integrations using the following setting:

* System Property: `-Ddd.<integration>.analytics.enabled=true`
* Environment Variable: `DD_<INTEGRATION>_ANALYTICS_ENABLED=true`

Use this in addition to the global configuration for any integrations that submit custom services. For example, for JMS spans which comes in as a custom service, you can set the following to enable all JMS Tracing in Trace Search & Analytics:

* System Property: `-Ddd.jms.analytics.enabled=true`
* Environment Variable: `DD_JMS_ANALYTICS_ENABLED=true`

Integration names can be found on the [integrations table][1].

[1]: /tracing/setup/java/#integrations
{{% /tab %}}
{{% tab "Python" %}}

In addition to setting globally, you can enable or disable Trace Search & Analytics for individual integrations using the following setting:

* Tracer Configuration: `ddtrace.config.<INTEGRATION>.analytics_enabled = True`
* Environment Variable: `DD_<INTEGRATION>_ANALYTICS_ENABLED=true`

Use this in addition to the global configuration for any integrations that submit custom services. For example, for Boto spans which comes in as a custom service, set the following to enable all Boto Tracing in Trace Search & Analytics:

* Tracer Configuration: `ddtrace.config.boto.analytics_enabled = True`
* Environment Variable: `DD_BOTO_ANALYTICS_ENABLED=true`

**Note**: Several integrations require non-standard configuration due to the integration-specific implementation of the tracer. Consult the library documentation on [Trace Search & Analytics][1] for details.

[1]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#trace_search_analytics
{{% /tab %}}
{{% tab "Ruby" %}}

Trace search & analytics can be enabled for specific integrations.

To do so, set either `DD_<INTEGRATION>_ANALYTICS_ENABLED=true` in your environment, or configure with:

```ruby
Datadog.configure { |c| c.use :integration, analytics_enabled: true }
```

Where `integration` is the name of the integration. See the [list of available integrations][1] for options.

- `true` enables analytics for this integration, regardless of the global setting.
- `false` disables analytics for this integration, regardless of the global setting.
- `nil` defers to global setting for analytics.


[1]: /tracing/setup/ruby/#library-compatibility
{{% /tab %}}
{{% tab "Go" %}}

In addition to the global setting, you can enable or disable Trace Search & Analytics individually for each integration. As an example, for configuring the standard library's `net/http` package, you could do:

```go
package main

import (
    httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    tracer.Start()
    defer tracer.Stop()

    mux := httptrace.NewServeMux(httptrace.WithAnalytics(true))
    // ...
}
```

{{% /tab %}}
{{% tab "Node.js" %}}


In addition to setting globally, you can enable or disable Trace Search & Analytics for individual integrations.

For example, to enable Trace Search & Analytics for `express`:

```js
tracer.use('express', {
  analytics: true
})
```

Integration names can be found on the [integrations table][1].


[1]: /tracing/setup/nodejs/#integrations
{{% /tab %}}
{{% tab ".NET" %}}


In addition to setting globally, you can enable or disable Trace Search & Analytics for individual integrations.

* Environment Variable or AppSetting: `DD_<INTEGRATION>_ANALYTICS_ENABLED=true`

Or in code:

```csharp
Tracer.Instance.Settings.Integrations["<INTEGRATION>"].AnalyticsEnabled = true;
```

For example, to enable Trace Search & Analytics for ASP.NET MVC:

* Environment Variable or AppSetting: `DD_ASPNETMVC_ANALYTICS_ENABLED=true`

Or in code:

```csharp
Tracer.Instance.Settings.Integrations["AspNetMvc"].AnalyticsEnabled = true;
```

Integration names can be found on the [integrations table][1].


[1]: /tracing/setup/dotnet#integrations
{{% /tab %}}
{{% tab "PHP" %}}

In addition to setting globally, you can enable or disable Trace Search & Analytics for individual integrations using the following setting:

* Environment Variable: `DD_<INTEGRATION>_ANALYTICS_ENABLED=true`

Use this in addition to the global configuration for any integrations that submit custom services. For example, for Symfony spans which comes in as a custom service, you can set the following to enable all Symfony Tracing in Trace Search & Analytics:

* Environment Variable: `DD_SYMFONY_ANALYTICS_ENABLED=true`

Integration names can be found on the [integrations table][1].


[1]: /tracing/setup/php/#integrations
{{% /tab %}}
{{< /tabs >}}

### Database Services

{{< tabs >}}
{{% tab "Java" %}}

Database tracing is not captured by Trace Search & Analytics by default and you must enable collection manually for each integration. For example:

* System Property: `-Ddd.jdbc.analytics.enabled=true`
* Environment Variable: `DD_JDBC_ANALYTICS_ENABLED=true`

{{% /tab %}}
{{% tab "Python" %}}

Database tracing is not captured by Trace Search & Analytics by default and you must enable collection manually for each integration. For example:

* Tracer Configuration: `ddtrace.config.postgres.analytics_enabled = True`
* Environment Variable: `DD_POSTGRES_ANALYTICS_ENABLED=true`

{{% /tab %}}
{{% tab "Ruby" %}}

Database tracing is not captured by Trace Search & Analytics by default and you must enable collection manually for each integration. For example:

```ruby
Datadog.configure { |c| c.use :mongo, analytics_enabled: true }
```

{{% /tab %}}
{{% tab "Go" %}}

Database tracing is not captured by Trace Search & Analytics by default. Enable collection manually for each integration, for example:

```go
// Register the database driver with Analytics enabled.
sqltrace.Register("mysql", &mysql.MySQLDriver{}, sqltrace.WithAnalytics(true))
```

{{% /tab %}}
{{% tab "Node.js" %}}

Database tracing is not captured by Trace Search & Analytics by default and you must enable collection manually for each integration. For example:

```javascript
tracer.use('mysql', {
  analytics: true
})
```

{{% /tab %}}
{{% tab ".NET" %}}


Database tracing is not captured by Trace Search & Analytics by default and you must enable collection manually for each integration. For example, to enable Trace Search & Analytics for ADO.NET:

* Environment Variable or AppSetting: `DD_ADONET_ANALYTICS_ENABLED=true`

Or in code:

```csharp
Tracer.Instance.Settings.Integrations["AdoNet"].AnalyticsEnabled = true;
```

Integration names can be found on the [integrations table][1].


[1]: /tracing/setup/dotnet#integrations
{{% /tab %}}
{{% tab "PHP" %}}

Database tracing is not captured by Trace Search & Analytics by default and you must enable collection manually for each integration. For example:

```javascript
tracer.use('mysqli', {
  analytics: true
})
```

{{% /tab %}}
{{< /tabs >}}

### Custom instrumentation

{{< tabs >}}
{{% tab "Java" %}}

Applications with custom instrumentation can enable trace analytics by setting the `ANALYTICS_SAMPLE_RATE` tag on the service root span:

```java
import datadog.trace.api.DDTags;
import datadog.trace.api.Trace;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

class MyClass {
  @Trace
  void myMethod() {
    final Span span = GlobalTracer.get().activeSpan();
    // Span provided by @Trace annotation.
    if (span != null) {
      span.setTag(DDTags.SERVICE_NAME, "my-custom-service");
      span.setTag(DDTags.ANALYTICS_SAMPLE_RATE, 1.0);
    }
  }
}
```

{{% /tab %}}
{{% tab "Python" %}}


Applications with custom instrumentation can enable trace analytics by setting the `ddtrace.constants.ANALYTICS_SAMPLE_RATE_KEY` tag on the service root span:

```python
from ddtrace import tracer
from ddtrace.constants import ANALYTICS_SAMPLE_RATE_KEY

@tracer.wrap()
def my_method():
    span = tracer.current_span()
    span.set_tag(ANALYTICS_SAMPLE_RATE_KEY, True)
```


{{% /tab %}}
{{% tab "Ruby" %}}

Applications with custom instrumentation can enable trace analytics by setting the `ANALYTICS_KEY` tag on the service root span:

```ruby
Datadog.tracer.trace('my.task') do |span|
  # Set the analytics sample rate to 1.0
  span.set_tag(Datadog::Ext::Analytics::TAG_ENABLED, true)
end
```

{{% /tab %}}
{{% tab "Go" %}}

For custom instrumentation, a special tag has been added to enable Trace Search & Analytics on a span, as can be seen below:

```go
span.SetTag(ext.AnalyticsEvent, true)
```

This marks the span as a Trace Search & Analytics event.

{{% /tab %}}
{{% tab "Node.js" %}}

Applications with custom instrumentation can enable trace analytics by setting the `ANALYTICS` tag on the service root span:

```javascript
const { ANALYTICS } = require('dd-trace/ext/tags')

span.setTag(ANALYTICS, true)
```

{{% /tab %}}
{{% tab ".NET" %}}

Applications with custom instrumentation can enable trace analytics by setting the `Tags.Analytics` tag on the service root span:

```csharp
using Datadog.Trace;

using(var scope = Tracer.Instance.StartActive("web.request"))
{
    // enable Analytics on this span
    scope.span.SetTag(Tags.Analytics, "true");
}

```

{{% /tab %}}
{{% tab "PHP" %}}

Applications with custom instrumentation can enable trace analytics by setting the `ANALYTICS_KEY` tag on the service root span:

```php
<?php
  // ... your existing span that you want to enable for Trace Search & Analytics
  $span->setTag(Tag::ANALYTICS_KEY, true);
?>
```

{{% /tab %}}
{{% tab "C++" %}}

Applications with custom instrumentation can enable trace analytics by setting the `analytics_event` tag on the service root span:

```cpp
...
#include <datadog/tags.h>
...
auto tracer = ...
auto span = tracer->StartSpan("operation_name");
// A boolean value of true enables Trace Search & Analytics for the span,
// with a sample rate of 1.0.
span->SetTag(datadog::tags::analytics_event, true);
// A double value between 0.0 and 1.0 enables Trace Search & Analytics
// and sets the sample rate to the provided value.
span->SetTag(datadog::tags::analytics_event, 0.5);
```

{{% /tab %}}
{{< /tabs >}}

## Event filtering

An [APM event][2] represents the top [span][3] for a [service], including its metadata. Once enabled, APM events are sent at 100% throughput by default. For example, a Java service with 100 requests will generate 100 APM events from its `servlet.request` spans, as each `servlet.request` span generates an APM event. [Filtering APM events][4] has the benefit of reducing the number of billable APM events and has no effect on [trace][5] sampling. Once a service has been filtered lower than 100%, APM event analytics are upscaled to display an estimate by default, and you have the option to display the filtered value.

{{< img src="tracing/trace_search_and_analytics/analytics/apm_event_filtering.png" alt="APM Event Filtering" responsive="true" style="width:100%;">}}

[1]: https://app.datadoghq.com/apm/search
[2]: /tracing/visualization/#apm-event
[3]: /tracing/visualization/#spans
[4]: https://app.datadoghq.com/apm/settings
[5]: /tracing/visualization/#trace
