---
title: Live Debugger
description: Debug running applications in real time using non-breaking logpoints that collect information without stopping execution or redeploying code.
aliases:
- '/ide_plugins/idea/live_debugger/'
- '/developers/ide_plugins/idea/live_debugger/'
- '/ide_plugins/vscode/live_debugger/'
further_reading:
- link: "https://www.datadoghq.com/blog/gitlab-source-code-integration"
  tag: "Blog"
  text: "Troubleshoot faster with the GitLab Source Code integration in Datadog"
- link: "/dynamic_instrumentation/"
  tag: "Documentation"
  text: "Dynamic Instrumentation"
- link: "/dynamic_instrumentation/expression-language/"
  tag: "Documentation"
  text: "Dynamic Instrumentation Expression Language"
- link: "/dynamic_instrumentation/sensitive-data-scrubbing/"
  tag: "Documentation"
  text: "Sensitive Data Scrubbing"
- link: "/dynamic_instrumentation/symdb/"
  tag: "Documentation"
  text: "Autocomplete and Search"
- link: "/error_tracking/backend/exception_replay"
  tag: "Documentation"
  text: "Exception Replay"
---

## Overview

Live Debugger lets you inspect application behavior in real time, directly in running services, without redeploying code or interrupting execution.

Instead of adding temporary debug logs or reproducing issues locally, you can dynamically capture application state at specific points in the code. This includes variable values, method parameters, and execution context. Live Debugger is well suited for diagnosing issues in production or other long-running environments.

Live Debugger uses logpoints: auto-expiring, non-breaking breakpoints that collect diagnostic data without pausing the application. Since execution continues normally, Live Debugger can be used safely on production systems to investigate problems as they happen.

## Key capabilities

Live Debugger provides:

- **Real-time inspection** of variable values, method arguments, and execution context in running code.
- **Safe, non-invasive data capture** that collects debugging information without pausing applications or requiring redeploys.
- **Dynamic logpoint placement** anywhere in your codebase, including in third-party libraries.
- **Auto-expiring logpoints** that deactivate automatically after a configurable duration.
- **Conditional data capture** based on user-defined expressions, so information is collected only when specific conditions are met.
- **Built-in [sensitive data scrubbing][1]** to help prevent exposure of personal data, secrets, and credentials.

## Requirements

Live Debugger supports Python, Java, .NET, Ruby, Node.js, PHP, and Go. It requires:

- The [Datadog Agent][2], version 7.49.0 or later
- An installed [Datadog SDK][3] (see [Enabling Live Debugger](#enable-live-debugger) for minimum SDK versions)
- [Unified Service Tagging][27] configured with `service`, `env`, and `version` tags on your deployment
- [Remote Configuration][4] enabled in the Agent
- (Recommended) [Source Code Integration][28]

### Permissions

The following permissions are required to use Live Debugger:

- **Live Debugger Read** (`live_debugger_read`): Required to access the Live Debugger page.
- **Live Debugger Write** (`live_debugger_write`): Required to create or modify Debug Sessions and logpoints.
- **Live Debugger Redaction Write** (`live_debugger_redaction_write`): Required to change the [redaction mode][24] for captured data.

For more information about roles and how to assign roles to users, see [Role Based Access Control][21].

## Setup

### Enable Live Debugger

Live Debugger enablement depends on your service's runtime language. See the language-specific sections below for enablement instructions and minimum SDK versions.

Live Debugger can work on older SDK versions through manual enablement, but you may encounter missing capabilities, unexpected errors, or a degraded experience. Datadog recommends keeping your SDK up to date.

#### Enable for Java, Python, .NET, and Node.js

For services running an updated SDK version, you can enable Live Debugger in one of two ways:

- On the [Live Debugger Settings page][26], enable the service and environment.
- Start a Debug Session. Live Debugger is enabled automatically.

Use the manual configuration steps below only if an SDK update isn't possible or you prefer env-var configuration (for example, for bulk enablement across many services).

{{< programming-lang-wrapper langs="java,python,.NET,nodejs" >}}

{{< programming-lang lang="java" >}}
<div class="alert alert-info">Recommended: Enable Live Debugger in-app from the <a href="https://app.datadoghq.com/debugging/settings">Live Debugger Settings page</a> (requires Java SDK version 1.48.0 or higher).</div>

**SDK version**: <a href="/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/">Datadog Java SDK</a> version 1.64.0 or higher is strongly recommended, running on JDK 8 or higher. The minimum SDK version is 1.42.0, but it may result in unexpected errors and a degraded experience.

Start your service with `DD_DYNAMIC_INSTRUMENTATION_ENABLED=true`, along with `DD_SERVICE`, `DD_ENV`, and `DD_VERSION`. The `-javaagent` argument must come before `-jar`:

```shell
export DD_SERVICE=<YOUR_SERVICE>
export DD_ENV=<YOUR_ENV>
export DD_VERSION=<YOUR_VERSION>
export DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
java \
    -javaagent:dd-java-agent.jar \
    -jar <YOUR_SERVICE>.jar
```

**Note**: On JDK 18 and earlier, classes compiled with the `-parameters` flag (default in Spring 6+, Spring Boot 3+, and Scala) may fail to instrument.
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}
<div class="alert alert-info">Recommended: Enable Live Debugger in-app from the <a href="https://app.datadoghq.com/debugging/settings">Live Debugger Settings page</a> (requires Python SDK version 3.10.0 or higher).</div>

**SDK version**: <a href="/tracing/trace_collection/automatic_instrumentation/dd_libraries/python/">Datadog Python SDK (<code>ddtrace</code>)</a> version 4.11.0 or higher is strongly recommended. The minimum SDK version is 2.9.0, but it may result in unexpected errors and a degraded experience.

Install `ddtrace`, then start your service with `DD_DYNAMIC_INSTRUMENTATION_ENABLED=true` and `ddtrace-run`:

```shell
pip install ddtrace
export DD_SERVICE=<YOUR_SERVICE>
export DD_ENV=<YOUR_ENV>
export DD_VERSION=<YOUR_VERSION>
export DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
ddtrace-run python -m myapp.py
```
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}
<div class="alert alert-info">Recommended: Enable Live Debugger in-app from the <a href="https://app.datadoghq.com/debugging/settings">Live Debugger Settings page</a> (requires .NET SDK version 3.29.0 or higher).</div>

**SDK version**: <a href="/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core">Datadog .NET SDK</a> version 3.46.0 or higher is strongly recommended. The minimum SDK version is 3.9.0, but it may result in unexpected errors and a degraded experience.

Start your service with the following environment variables set:

```shell
DD_SERVICE=<YOUR_SERVICE>
DD_ENV=<YOUR_ENV>
DD_VERSION=<YOUR_VERSION>
DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
```
{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}
<div class="alert alert-info">Recommended: Enable Live Debugger in-app from the <a href="https://app.datadoghq.com/debugging/settings">Live Debugger Settings page</a> (requires Node.js SDK version 5.84.0 or higher).</div>

**SDK version**: <a href="/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/">Datadog Node.js SDK (<code>dd-trace-js</code>)</a> version 5.109.0 or higher is strongly recommended. The minimum SDK version is 5.39.0, but it may result in unexpected errors and a degraded experience. If your source code is transpiled or bundled (for example, TypeScript, Babel, or Webpack), publish source maps with the deployed application so that logpoints map to the correct lines.

Start your service with the following environment variables set:

```shell
DD_SERVICE=<YOUR_SERVICE>
DD_ENV=<YOUR_ENV>
DD_VERSION=<YOUR_VERSION>
DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
```
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

#### Enable for Ruby, PHP, and Go

Ruby and PHP require manual configuration through environment variables. Go requires an Agent-level configuration first, after which the service can be enabled in-app or through environment variables.

{{< programming-lang-wrapper langs="ruby,php,go" >}}

{{< programming-lang lang="ruby" >}}
**SDK version**: <a href="/tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby/">Datadog Ruby SDK (<code>ddtrace</code>)</a> version 2.38.0 or higher is strongly recommended. The minimum SDK version is 2.37.0, but it may result in unexpected errors and a degraded experience.

**Additional requirements:**

- Ruby 2.6 or higher (MRI/CRuby only; JRuby is not supported)
- A Rack-based framework (Rails, Sinatra, or other Rack-compatible frameworks). Background workers (such as Sidekiq or Resque) are not supported.
- `RAILS_ENV` or `RACK_ENV` set to `production`

Start your service with the following environment variables set:

```shell
export DD_SERVICE=<YOUR_SERVICE>
export DD_ENV=<YOUR_ENV>
export DD_VERSION=<YOUR_VERSION>
export DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
```

**Note**: Live Debugger initializes on the first HTTP request. Your service must receive at least one request before you can create a logpoint.
{{< /programming-lang >}}

{{< programming-lang lang="php" >}}
**SDK version**: <a href="/tracing/trace_collection/automatic_instrumentation/dd_libraries/php">Datadog PHP SDK (<code>dd-trace-php</code>)</a> version 1.21.0 or higher is strongly recommended. The minimum SDK version is 1.2.0, but it may result in unexpected errors and a degraded experience.

Start your service with the following environment variables set:

```shell
DD_SERVICE=<YOUR_SERVICE>
DD_ENV=<YOUR_ENV>
DD_VERSION=<YOUR_VERSION>
DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
```
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}
<div class="alert alert-info">Recommended: After configuring the Datadog Agent (see below), enable Live Debugger in-app from the <a href="https://app.datadoghq.com/debugging/settings">Live Debugger Settings page</a> (requires Go SDK version 2.6.0 or higher).</div>

Go services require enabling Live Debugger in both the Datadog Agent and the application.

**SDK version**: <a href="/tracing/trace_collection/automatic_instrumentation/dd_libraries/go">Datadog Go SDK</a> version 2.9.0 or higher is strongly recommended (or 1.74.6 or higher on the v1 line).

**Additional requirements:**

- <a href="/agent/">Datadog Agent</a> version 7.73.0 or higher, running on the same host as your application
- Linux kernel 5.17 or higher

**Configure the Datadog Agent** using one of the following methods, depending on how you deploy the Agent:

- **Configuration YAML file**: Update `system-probe.yaml` (located alongside `datadog.yaml`) with the following. For more information, see <a href="/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file">Agent configuration files</a>.

  ```yaml
  dynamic_instrumentation:
    enabled: true
  ```

- **Environment variable**: Add the following to your Datadog Agent manifest:

  ```
  DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
  ```

- **Helm**: Add the following to your Helm chart:

  ```yaml
  datadog:
    dynamicInstrumentationGo:
      enabled: true
  ```

**Configure your service**: After the Agent is configured, services on the same host can be enabled from the <a href="https://app.datadoghq.com/debugging/settings">Live Debugger Settings page</a>, or by starting the service with the following environment variables set:

```shell
DD_SERVICE=<YOUR_SERVICE>
DD_ENV=<YOUR_ENV>
DD_VERSION=<YOUR_VERSION>
DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
```
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

#### Enablement modes

On the [Live Debugger Settings page][26], you can check and update the enablement status of each service and environment. Each is in one of three modes:

- {{< ui >}}Automatic{{< /ui >}}: Live Debugger has not been set to {{< ui >}}Enabled{{< /ui >}} or {{< ui >}}Disabled{{< /ui >}} yet on this service and environment. This setting changes to {{< ui >}}Enabled{{< /ui >}} automatically the first time a Debug Session is started. For a faster first-time debugging experience, switch the setting to {{< ui >}}Enabled{{< /ui >}} in advance.
- {{< ui >}}Enabled{{< /ui >}}: For eligible services, this setting means Live Debugger is activated on the selected service and environment, including debug symbol uploads and faster delivery of new logpoints.
- {{< ui >}}Disabled{{< /ui >}}: This setting blocks logpoints from being created or re-activated on a given service and environment. It applies regardless of runtime language or SDK version.

### Create a logs index (recommended)

Datadog recommends creating a dedicated logs index for Live Debugger to help ensure that Live Debugger logs aren't unintentionally filtered out, especially if you use [Exclusion filters][11]. Live Debugger generates logs that are sent to Datadog and appear alongside your application logs.

To create a dedicated logs index:

1. Create a logs index and [configure it][12] to the desired retention with **no sampling**.
2. Set the filter to match on the `source:dd_debugger` tag. All Live Debugger logs have this source.
3. Make sure the new index takes precedence over any other with filters that match that tag, because the first match wins.

### Link your source code (recommended)

Datadog recommends setting up [Source Code Integration][28] for the best experience with Live Debugger. Source Code Integration is optional when starting a Debug Session manually, but required when using [Bits Live Debugger][23].

After you integrate your source code manager with your Datadog account and link the service and environment to the corresponding repository and git commit SHA, you can view source code files directly in the Datadog UI. You can add new logpoints and see existing ones in the source code as you would with breakpoints in an IDE. This helps you confirm logpoints are placed accurately and avoid capturing unintended data or generating invalid results.

## Using Live Debugger

### Creating and using a Debug Session

A Debug Session lets you inspect running code using auto-expiring logpoints. To create and use a Debug Session:

1. Start a Debug Session from one of the following locations:
   - On the [Live Debugger page][13], click {{< ui >}}Create Debug Session{{< /ui >}}.
   - (Requires the [Code Origin][20] feature) In the [Trace Explorer][14], open a trace, locate the Code Origin section in the side panel, and click {{< ui >}}Start Debug Session{{< /ui >}}.
2. Add a logpoint to begin collecting diagnostic data.
3. Add, remove, or modify logpoints as needed during the session.

Debug Sessions expire automatically. You can also manually disable or re-enable a session, as well as individual logpoints, at any time.

### Creating logpoints

Logpoints are "non-breaking breakpoints" that specify where in the code to capture information, what data to include, and under what conditions. To add a logpoint for debugging:

1. Go to the [Live Debugger page][13].
2. Click {{< ui >}}Create Debug Session{{< /ui >}}.
3. Choose your service, environment, and select where in your code to place the first logpoint.
4. Define a logpoint message template using the [expression language][15].
5. (Optional) Enable "Capture Variables" to collect all execution context (this feature is rate-limited to 1 execution per second).
6. (Optional) Define a condition for when the logs should be emitted.

### Protecting sensitive data

Live Debugger data might contain sensitive information, especially when using the {{< ui >}}Capture Variables{{< /ui >}} option. Live Debugger automatically applies mode-based and identifier-based redaction to help protect this data.

#### Mode-based redaction

Live Debugger has two redaction modes:

- {{< ui >}}Strict Mode{{< /ui >}}: Redacts all values except numbers and Booleans. Bits Live Debugger is not available for service and environment combinations set to {{< ui >}}Strict Mode{{< /ui >}}.
- {{< ui >}}Targeted Mode{{< /ui >}}: Redacts known sensitive patterns such as credit card numbers, API keys, and IPs. It also runs a high-entropy secrets scanner that automatically redacts likely secrets, which appear as `[REDACTED:HIGH_ENTROPY]` in captured data.

These redaction modes cannot be disabled, only switched. Targeted Mode is applied automatically in common pre-production environments such as `staging` or `preprod`. Changing the redaction mode requires the **Live Debugger Redaction Write** permission.

#### Identifier-based redaction

Variable values associated with common sensitive identifiers (for example, `password`, `accessToken`, and similar terms) are scrubbed before captured data leaves the host. Additional language-specific redaction rules are built into each SDK.

You can extend redaction behavior through:

- Custom identifier-based redaction
- Class/type-based redaction rules
- Sensitive Data Scanner rules

See the [sensitive data scrubbing][1] instructions and [Sensitive Data Scanner][17] documentation for configuration details.

### Bits Live Debugger

{{< beta-callout url="https://www.datadoghq.com/product-preview/debug-with-bits/" >}}
Bits Live Debugger is in Preview. Request access to join the waiting list.
{{< /beta-callout >}}

[Bits Live Debugger][23] lets you investigate a running service by describing the issue in plain language. Bits Code handles logpoint placement, captures variable snapshots, and helps interpret the results.

**Note**: Bits Live Debugger requires the service and environment to be in Targeted Mode. See [Mode-based redaction][24] for details.

## Limitations

The following constraints apply to Live Debugger usage and configuration:

- **Configuration scope:** Live Debugger and Dynamic Instrumentation are enabled or disabled together for the same service and environment.
- **Rate limits:**
   - Logpoints with variable capture: Limited to 1 execution per second.
   - Logpoints without variable capture: Limited to 5000 executions per second, per service instance.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dynamic_instrumentation/sensitive-data-scrubbing/
[2]: /agent/
[3]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/
[4]: /tracing/guide/remote_config
[5]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/python/
[6]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
[7]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core
[8]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/
[9]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby/
[10]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/php
[11]: /logs/log_configuration/indexes/#exclusion-filters
[12]: /logs/log_configuration/indexes/#add-indexes
[13]: https://app.datadoghq.com/debugging/sessions
[14]: https://app.datadoghq.com/apm/traces
[15]: /dynamic_instrumentation/expression-language/
[17]: /dynamic_instrumentation/sensitive-data-scrubbing/#redact-based-on-variable-values-with-sensitive-data-scanner
[19]: /dynamic_instrumentation/
[20]: /tracing/code_origin
[21]: /account_management/rbac/permissions#apm
[22]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/go
[23]: /tracing/live_debugger/bits-live-debugger/
[24]: #mode-based-redaction
[26]: https://app.datadoghq.com/debugging/settings
[27]: /getting_started/tagging/unified_service_tagging/
[28]: /integrations/guide/source-code-integration/
