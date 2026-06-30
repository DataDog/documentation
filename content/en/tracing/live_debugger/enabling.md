---
title: Enabling Live Debugger
description: Enable Live Debugger for your applications through environment variables to capture logpoints and variable snapshots without code changes.
aliases:
    - /tracing/live_debugger/enabling/
further_reading:
    - link: '/tracing/live_debugger/'
      tag: 'Documentation'
      text: 'Live Debugger'
    - link: '/agent/'
      tag: 'Documentation'
      text: 'Getting Started with Datadog Agent'
---

Live Debugger is a feature of supporting Datadog SDKs. If you are already using [APM to collect traces][1] for your application, ensure your SDK is up-to-date and then enable Live Debugger for your application.

For Java, Python, .NET, Node.js, and Go on recent tracer versions, Live Debugger can be enabled in-app from the [Live Debugger Settings page][2]. See [Live Debugger > Enablement modes][3] for details and minimum tracer versions.

The instructions below cover **manual enablement** through environment variables. Manual enablement is required for Ruby and PHP, and for older tracer versions of Java, Python, .NET, Node.js, and Go. It is also available on supported tracer versions if you prefer to manage enablement through environment variables instead of in-app, for example, to enable Live Debugger in bulk across many services.

<div class="alert alert-info">Live Debugger and <a href="/tracing/dynamic_instrumentation/">Dynamic Instrumentation</a> share the same enablement state per service and environment. The <code>DD_DYNAMIC_INSTRUMENTATION_ENABLED</code> environment variable controls enablement for both products, and enabling or disabling one also enables or disables the other for that service and environment. The two products have separate permissions and Settings pages.</div>

Select your runtime for manual enablement instructions:

{{< tabs >}}
{{% tab "Java" %}}
**Prerequisites:**

- JDK version 8 or higher.
- [Java tracer][101] version 1.64.0 or higher.

**Setup:**

Set `DD_DYNAMIC_INSTRUMENTATION_ENABLED=true` on your service and start it with the Java agent attached:

```shell
export DD_SERVICE=<YOUR_SERVICE>
export DD_ENV=<YOUR_ENV>
export DD_VERSION=<YOUR_VERSION>
export DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
java \
    -javaagent:dd-java-agent.jar \
    -jar <YOUR_SERVICE>.jar
```

The `-javaagent` argument must come before `-jar`.

After your service restarts, return to the [Live Debugger page][102] to start a Debug Session.

[101]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
[102]: https://app.datadoghq.com/debugging/sessions
{{% /tab %}}

{{% tab "Python" %}}
**Prerequisites:**

- [Python tracer (`ddtrace`)][101] version 4.11.0 or higher.

**Setup:**

Install `ddtrace`, then set `DD_DYNAMIC_INSTRUMENTATION_ENABLED=true` and run your service with `ddtrace-run`:

```shell
pip install ddtrace
export DD_SERVICE=<YOUR_SERVICE>
export DD_ENV=<YOUR_ENV>
export DD_VERSION=<YOUR_VERSION>
export DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
ddtrace-run python -m myapp.py
```

After your service restarts, return to the [Live Debugger page][102] to start a Debug Session.

[101]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/python/
[102]: https://app.datadoghq.com/debugging/sessions
{{% /tab %}}

{{% tab ".NET" %}}
**Prerequisites:**

- [.NET tracer][101] version 3.46.0 or higher.

**Setup:**

Set the following environment variables on your service and restart it:

```shell
DD_SERVICE=<YOUR_SERVICE>
DD_ENV=<YOUR_ENV>
DD_VERSION=<YOUR_VERSION>
DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
```

After your service restarts, return to the [Live Debugger page][102] to start a Debug Session.

[101]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core
[102]: https://app.datadoghq.com/debugging/sessions
{{% /tab %}}

{{% tab "Node.js" %}}
**Prerequisites:**

- [Node.js tracer (`dd-trace-js`)][101] version 5.109.0 or higher.
- If your source code is transpiled or bundled (for example, TypeScript), publish source maps along with the deployed application.

**Setup:**

Set the following environment variables on your service and restart it:

```shell
DD_SERVICE=<YOUR_SERVICE>
DD_ENV=<YOUR_ENV>
DD_VERSION=<YOUR_VERSION>
DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
```

After your service restarts, return to the [Live Debugger page][102] to start a Debug Session.

[101]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/
[102]: https://app.datadoghq.com/debugging/sessions
{{% /tab %}}

{{% tab "PHP" %}}
**Prerequisites:**

- [PHP tracer (`dd-trace-php`)][101] version 1.21.0 or higher.

**Setup:**

Set the following environment variables on your service and restart it:

```shell
DD_SERVICE=<YOUR_SERVICE>
DD_ENV=<YOUR_ENV>
DD_VERSION=<YOUR_VERSION>
DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
```

After your service restarts, return to the [Live Debugger page][102] to start a Debug Session.

[101]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/php
[102]: https://app.datadoghq.com/debugging/sessions
{{% /tab %}}

{{% tab "Ruby" %}}
**Prerequisites:**

- [Ruby tracer (`ddtrace`)][101] version 2.35.0 or higher.
- Ruby 2.6 or higher (MRI only; JRuby is not supported).
- A Rack-based web framework (Rails, Sinatra, or other Rack-compatible frameworks). Background workers (such as Sidekiq or Resque) are not supported.
- `RAILS_ENV` or `RACK_ENV` set to `production`.

**Setup:**

Set the following environment variables on your service and restart it:

```shell
export DD_SERVICE=<YOUR_SERVICE>
export DD_ENV=<YOUR_ENV>
export DD_VERSION=<YOUR_VERSION>
export DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
```

Live Debugger initializes when your application processes its first HTTP request. After your service receives at least one request, return to the [Live Debugger page][102] to start a Debug Session.

[101]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby/
[102]: https://app.datadoghq.com/debugging/sessions
{{% /tab %}}

{{% tab "Go" %}}
**Prerequisites:**

- [Datadog Agent][101] version 7.73.0 or higher, running on the same host as your application.
- [Go tracer][102] version 2.9.0 or higher (or 1.74.6 or higher on the v1 line).
- Linux kernel 5.17 or higher.

**Setup:**

Enable Live Debugger in both the Datadog Agent and your application.

Enable Live Debugger in the Agent configuration using one of the following methods, depending on how you deploy the Agent:

**Configuration YAML file**: Update `system-probe.yaml` (located alongside `datadog.yaml`) with the following. For more information, see [Agent configuration files][104].

```yaml
dynamic_instrumentation:
  enabled: true
```

**Environment variable**: Add the following to your Datadog Agent manifest:

```
DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
```

**Helm**: Add the following to your Helm chart:

```yaml
datadog:
  dynamicInstrumentationGo:
    enabled: true
```

Then start your service with the following environment variables:

```shell
DD_SERVICE=<YOUR_SERVICE>
DD_ENV=<YOUR_ENV>
DD_VERSION=<YOUR_VERSION>
DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
```

After your service restarts, return to the [Live Debugger page][103] to start a Debug Session.

[101]: /agent/
[102]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/go
[103]: https://app.datadoghq.com/debugging/sessions
[104]: /agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

To enable Bits Live Debugger, see [Bits Live Debugger][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/
[2]: https://app.datadoghq.com/debugging/settings
[3]: /tracing/live_debugger/#enablement-modes
[4]: /tracing/live_debugger/bits-live-debugger/
