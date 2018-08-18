---
title: Debugging
kind: documentation
---

Datadog debug settings are used to diagnose issues or audit trace data.

{{< tabs >}}
{{% tab "Java" %}}
To return debug level application logs, enable debug mode with the flag `-Ddatadog.slf4j.simpleLogger.defaultLogLevel=debug` when starting the JVM.
{{% /tab %}}
{{% tab "Python" %}}
{{% /tab %}}
{{% tab "Ruby" %}}
{{% /tab %}}
{{% tab "Go" %}}
{{% /tab %}}
{{% tab "Node.js" %}}
Debug mode is disabled by default, to enable it:

```javascript
const tracer = require('dd-trace').init({
  debug: true
})
```

For more tracer settings, check out the [API documentation][nodejs api doc].
[nodejs api doc]: https://datadog.github.io/dd-trace-js/#tracer-settings
{{% /tab %}}
{{< /tabs >}}