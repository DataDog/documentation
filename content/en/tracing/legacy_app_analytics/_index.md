---
title: App Analytics
aliases:
  - /tracing/visualization/search/
  - /tracing/trace_search_and_analytics/
  - /tracing/advanced_usage/
---

<div class="alert alert-danger">
This page describes deprecated features with configuration information relevant to legacy App Analytics, useful for troubleshooting or modifying some old setups. To have full control over your traces, use <a href="/tracing/trace_pipeline">ingestion controls and retention filters</a> instead.
</div>

##  Migrate to the new configuration options

Navigate to the [ingestion control page][1] to see services with legacy configurations. These are flagged with a `Legacy Setup` status.

To migrate to the new configuration options, remove all legacy App Analytics [configuration options](#app-analytics-setup) from the services flagged with `Legacy Setup`. Then, implement the Datadog Agent and tracing libraries' [sampling mechanisms][2] to send traces.

## App Analytics setup

App Analytics configuration options are located in the Tracing Libraries and in the Datadog Agent. In the libraries, analytics spans from your services are generated either [automatically](#automatic-configuration) or [manually](#custom-instrumentation).

### In Tracing Libraries

#### Automatic configuration

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp,nginx" >}}
{{< programming-lang lang="java" >}}

App Analytics is available starting in version 0.25.0 of the Java tracing client. It can be enabled globally for all **web server** integrations with one configuration parameter in the Tracing client:

* System Property: `-Ddd.trace.analytics.enabled=true`
* Environment Variable: `DD_TRACE_ANALYTICS_ENABLED=true`

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

App Analytics is available starting in version 0.19.0 of the Python tracing client. Enable App Analytics globally for all **web** integrations with one configuration parameter in the Tracing Client:

* Tracer Configuration: `ddtrace.config.analytics_enabled = True`
* Environment Variable: `DD_TRACE_ANALYTICS_ENABLED=true`

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

App Analytics is available starting in version 0.19.0 of the Ruby tracing client, and can be enabled for all **web** integrations with a global flag.

To do so, set either `DD_TRACE_ANALYTICS_ENABLED=true` in your environment, or configure with:

```ruby
Datadog.configure { |c| c.tracing.analytics.enabled = true }
```

* `true` enables analytics for all web frameworks.
* `false` or `nil` disables analytics, except for integrations that explicitly enable it. (Default)

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

App Analytics is available starting in version 1.11.0 of the Go tracing client, and can be enabled globally for all **web** integrations using:

* the [`WithAnalytics`][1] tracer start option, for example:

  ```go
  tracer.Start(tracer.WithAnalytics(true))
  ```

* starting in version 1.26.0 using environment variable: `DD_TRACE_ANALYTICS_ENABLED=true`

[1]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#WithAnalytics
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

App Analytics is available starting in version 0.10.0 of the Node.js tracing client, and can be enabled globally for all web integrations with one configuration parameter in the tracing client:

```javascript
tracer.init({
  analytics: true
})
```

You can also use the following configuration parameter:

* Environment Variable: `DD_TRACE_ANALYTICS_ENABLED=true`

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

App Analytics is available starting in version 1.1.0 of the .NET tracing client, and can be enabled globally for all **web** integrations with one configuration parameter in the Tracing Client:

* Environment Variable or AppSetting: `DD_TRACE_ANALYTICS_ENABLED=true`

This setting can also be set in code:

```csharp
Tracer.Instance.Settings.AnalyticsEnabled = true;
```

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

App Analytics is available starting in version 0.17.0 of the PHP tracing client, and can be enabled globally for all **web** integrations with one configuration parameter in the Tracing Client:

* Environment Variable: `DD_TRACE_ANALYTICS_ENABLED=true`

{{< /programming-lang >}}
{{< programming-lang lang="cpp" >}}

App Analytics is available starting in version 1.0.0 of the C++ tracing client, and can be enabled globally for all service entry spans by setting the environment variable: `DD_TRACE_ANALYTICS_ENABLED` to `true`. **Note**: This setting can also be set in the code directly:

```csharp
datadog::opentracing::TracerOptions tracer_options;
  tracer_options.agent_host = "dd-agent";
  tracer_options.service = "<SERVICE_NAME>";
  tracer_options.analytics_rate = 1.0;
  auto tracer = datadog::opentracing::makeTracer(tracer_options);
```

{{< /programming-lang >}}
{{< programming-lang lang="nginx" >}}

To enable App Analytics for Nginx:

1. Set the environment variable: `DD_TRACE_ANALYTICS_ENABLED` to `true`.

2. Add `env DD_TRACE_ANALYTICS_ENABLED;` at the top of your `nginx.conf` file.

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

#### Configure additional services (optional)

##### Configure by integration

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php" >}}
{{< programming-lang lang="java" >}}

In addition to setting globally, you can enable or disable App Analytics for individual integrations using the following setting:

* System Property: `-Ddd.<integration>.analytics.enabled=true`
* Environment Variable: `DD_<INTEGRATION>_ANALYTICS_ENABLED=true`

Use this in addition to the global configuration for any integrations that submit custom services. For example, for JMS spans which comes in as a custom service, you can set the following to enable all JMS Tracing in App Analytics:

* System Property: `-Ddd.jms.analytics.enabled=true`
* Environment Variable: `DD_JMS_ANALYTICS_ENABLED=true`

Integration names can be found on the [integrations table][1].

[1]: /tracing/compatibility_requirements/java/#compatibility
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

In addition to setting globally, you can enable or disable App Analytics for individual integrations using the following setting:

* Tracer Configuration: `ddtrace.config.<INTEGRATION>.analytics_enabled = True`
* Environment Variable: `DD_<INTEGRATION>_ANALYTICS_ENABLED=true`

Use this in addition to the global configuration for any integrations that submit custom services. For example, for Boto spans which comes in as a custom service, set the following to enable all Boto Tracing in App Analytics:

* Tracer Configuration: `ddtrace.config.boto.analytics_enabled = True`
* Environment Variable: `DD_BOTO_ANALYTICS_ENABLED=true`

**Note**: Several integrations require non-standard configuration due to the integration-specific implementation of the tracer. Consult the library documentation on [App Analytics][1] for details.

[1]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#trace_search_analytics
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

App Analytics can be enabled for specific integrations.

To do so, set either `DD_<INTEGRATION>_ANALYTICS_ENABLED=true` in your environment, or configure with:

```ruby
Datadog.configure { |c| c.tracing.instrument :integration, analytics_enabled: true }
```

Where `integration` is the name of the integration. See the [list of available integrations][1] for options.

* `true` enables analytics for this integration, regardless of the global setting.
* `false` disables analytics for this integration, regardless of the global setting.
* `nil` defers to global setting for analytics.

[1]: /tracing/setup/ruby/#library-compatibility
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

In addition to the global setting, you can enable or disable App Analytics individually for each integration. As an example, for configuring the standard library's `net/http` package, you could do:

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

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

In addition to setting globally, you can enable or disable App Analytics for individual integrations.

For example, to enable App Analytics for `express`:

```js
tracer.use('express', {
  analytics: true
})
```

Integration names can be found on the [integrations table][1].

[1]: /tracing/setup/nodejs/#integrations
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

In addition to setting globally, you can enable or disable App Analytics for individual integrations.

* Environment Variable or AppSetting: `DD_<INTEGRATION>_ANALYTICS_ENABLED=true`

Or in code:

```csharp
Tracer.Instance.Settings.Integrations["<INTEGRATION>"].AnalyticsEnabled = true;
```

For example, to enable App Analytics for ASP.NET MVC:

* Environment Variable or AppSetting: `DD_ASPNETMVC_ANALYTICS_ENABLED=true`

Or in code:

```csharp
Tracer.Instance.Settings.Integrations["AspNetMvc"].AnalyticsEnabled = true;
```

Integration names can be found on the [integrations table][1]. **Note:** On Linux, the names of environment variables are case-sensitive.

[1]: /tracing/setup/dotnet/#integrations
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

In addition to setting globally, you can enable or disable App Analytics for individual integrations using the following setting:

* Environment Variable: `DD_<INTEGRATION>_ANALYTICS_ENABLED=true`

Use this in addition to the global configuration for any integrations that submit custom services. For example, for Symfony spans which comes in as a custom service, you can set the following to enable all Symfony Tracing in App Analytics:

* Environment Variable: `DD_SYMFONY_ANALYTICS_ENABLED=true`

Integration names can be found on the [integrations table][1].

[1]: /tracing/setup/php/#integration-names
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

#### Database services

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php" >}}
{{< programming-lang lang="java" >}}


Database tracing is not captured by App Analytics by default and you must enable collection manually for each integration. For example:

* System Property: `-Ddd.jdbc.analytics.enabled=true`
* Environment Variable: `DD_JDBC_ANALYTICS_ENABLED=true`

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Database tracing is not captured by App Analytics by default and you must enable collection manually for each integration. For example:

* Tracer Configuration: `ddtrace.config.psycopg.analytics_enabled = True`
* Environment Variable: `DD_PSYCOPG_ANALYTICS_ENABLED=true`

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Database tracing is not captured by App Analytics by default and you must enable collection manually for each integration. For example:

```ruby
Datadog.configure { |c| c.tracing.instrument :mongo, analytics_enabled: true }
```

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Database tracing is not captured by App Analytics by default. Enable collection manually for each integration, for example:

```go
// Register the database driver with Analytics enabled.
sqltrace.Register("mysql", &mysql.MySQLDriver{}, sqltrace.WithAnalytics(true))
```

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

Database tracing is not captured by App Analytics by default and you must enable collection manually for each integration. For example:

```javascript
tracer.use('mysql', {
  analytics: true
})
```

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

Database tracing is not captured by App Analytics by default and you must enable collection manually for each integration. For example, to enable App Analytics for ADO.NET:

* Environment Variable or AppSetting: `DD_AdoNet_ANALYTICS_ENABLED=true`

Or in code:

```csharp
Tracer.Instance.Settings.Integrations["AdoNet"].AnalyticsEnabled = true;
```

Integration names can be found on the [integrations table][1]. **Note:** On Linux, the names of environment variables are case-sensitive.

[1]: /tracing/setup/dotnet/#integrations
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

Database tracing is not captured by App Analytics by default. You can enable or disable App Analytics for individual integrations using the following setting:

* Environment Variable: `DD_<INTEGRATION>_ANALYTICS_ENABLED=true`

Use this in addition to the global configuration for any integrations that submit custom services. For example, for `mysqli`:

* Environment Variable: `DD_MYSQLI_ANALYTICS_ENABLED=true`

Integration names can be found on the [integrations table][1].

[1]: /tracing/setup/php/#integrations
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

##### Custom instrumentation

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp" >}}
{{< programming-lang lang="java" >}}

Applications with custom instrumentation can enable App Analytics by setting the `ANALYTICS_SAMPLE_RATE` tag on a span:

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
      span.setTag(DDTags.SERVICE, "<SERVICE_NAME>");
      span.setTag(DDTags.ANALYTICS_SAMPLE_RATE, 1.0);
    }
  }
}
```
**Note:** App analytics for [dd.trace.methods][1] or [trace annotations][2] spans can be enabled by setting `-Ddd.trace-annotation.analytics.enabled=true`.


[1]: https://docs.datadoghq.com/tracing/custom_instrumentation/java/#dd-trace-methods
[2]: https://docs.datadoghq.com/tracing/custom_instrumentation/java/#trace-annotations
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Applications with custom instrumentation can enable App Analytics by setting the `ddtrace.constants.ANALYTICS_SAMPLE_RATE_KEY` tag on a span:

```python
from ddtrace import tracer
from ddtrace.constants import ANALYTICS_SAMPLE_RATE_KEY

@tracer.wrap()
def my_method():
    span = tracer.current_span()
    span.set_tag(ANALYTICS_SAMPLE_RATE_KEY, True)
```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Applications with custom instrumentation can enable App Analytics by setting the `Analytics::TAG_ENABLED` tag on a span:

```ruby
Datadog::Tracing.trace('my.task') do |span|
  # Set the analytics sample rate to 1.0
  span.set_tag(Datadog::Tracing::Metadata::Ext::Analytics::TAG_ENABLED, true)
end
```

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

For custom instrumentation, a special tag has been added to enable App Analytics on a span, as can be seen below:

```go
span.SetTag(ext.AnalyticsEvent, true)
```

This marks the span as a App Analytics event.

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

Applications with custom instrumentation can enable App Analytics by setting the `ANALYTICS` tag on a span:

```javascript
const { ANALYTICS } = require('dd-trace/ext/tags')

span.setTag(ANALYTICS, true)
```

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

Applications with custom instrumentation can enable App Analytics by setting the `Tags.Analytics` tag on a span:

```csharp
using Datadog.Trace;

using(var scope = Tracer.Instance.StartActive("web.request"))
{
    // enable Analytics on this span
    scope.span.SetTag(Tags.Analytics, "true");
}

```

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

Applications with custom instrumentation can enable App Analytics by setting the `ANALYTICS_KEY` tag on a span:

```php
<?php
  // ... your existing span that you want to enable for App Analytics
  $span->setTag(Tag::ANALYTICS_KEY, true);
?>
```

{{< /programming-lang >}}
{{< programming-lang lang="cpp" >}}

Applications with custom instrumentation can enable App Analytics by setting the `analytics_event` tag on a span:

```cpp
...
#include <datadog/tags.h>
...
auto tracer = ...
auto span = tracer->StartSpan("operation_name");
// A boolean value of true enables App Analytics for the span,
// with a sample rate of 1.0.
span->SetTag(datadog::tags::analytics_event, true);
// A double value between 0.0 and 1.0 enables App Analytics
// and sets the sample rate to the provided value.
span->SetTag(datadog::tags::analytics_event, 0.5);
```

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### In the Datadog Agent

<div class="alert alert-danger">
This section describes deprecated features with configuration information relevant to legacy App Analytics.
</div>

To configure a rate of spans to analyze by service, setup the following in the `datadog.yaml` file:
```
apm_config:
  analyzed_rate_by_service:
    service_A: 1
    service_B: 0.2
    service_C: 0.05
```

To configure a rate of spans to analyze by service and operation name, setup the following in the `datadog.yaml` file:

```
apm_config:
  analyzed_spans:
    service_A|operation_name_X: 1
    service_A|operation_name_Y: 0.25
    service_B|operation_name_Z: 0.01
```

## Troubleshooting: Maximum events per second limit

If you encounter the following error message in your Agent logs, your applications are emitting more than the default 200 trace events per second allowed by APM.

```
Max events per second reached (current=300.00/s, max=200.00/s). Some events are now being dropped (sample rate=0.54). Consider adjusting event sampling rates.

```

To increase the APM rate limit for the Agent, configure the `max_events_per_second` attribute within the Agent's configuration file (underneath the `apm_config:` section). For containerized deployments (for example, Docker or Kubernetes), use the `DD_APM_MAX_EPS` environment variable.

**Note**: Increasing the APM rate limit could result in increased costs for App Analytics.


[1]: /tracing/trace_pipeline/ingestion_controls/
[2]: /tracing/trace_pipeline/ingestion_mechanisms/
