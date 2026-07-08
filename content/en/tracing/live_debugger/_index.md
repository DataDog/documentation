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

## Requirements and setup

Live Debugger supports Python, Java, .NET, Ruby, Node.js, PHP, and Go. It requires the [Datadog Agent][2] (version 7.49.0 or later), an [APM-instrumented application][3], and [Remote Configuration][4].

### Enablement modes

Manage Live Debugger for each service and environment from the Live Debugger {{< ui >}}Settings{{< /ui >}} page. Each service can be in one of three modes:

- {{< ui >}}Automatic{{< /ui >}}: Eligible services are enabled automatically. Switch a service to {{< ui >}}Enabled{{< /ui >}} for a faster debugging experience with debug symbols.
- {{< ui >}}Enabled{{< /ui >}}: Live Debugger is ready to use on this service in this environment, with faster setup and a better debugging experience.
- {{< ui >}}Disabled{{< /ui >}}: This service is explicitly disabled and is not enabled automatically.

### Minimum tracer versions

Live Debugger requires the following minimum tracer versions:

- [Python][5] ≥ 4.11.0
- [Java][6] ≥ 1.64.0
- [.NET][7] ≥ 3.46.0
- [Ruby][9] ≥ 2.35.0
- [Node.js][8] ≥ 5.109.0
- [PHP][10] ≥ 1.21.0
- [Go][22] ≥ 2.9.0

Older tracer versions might require enabling Live Debugger through an environment variable. Follow the setup instructions for your language:

{{< card-grid >}}
  {{< image-card href="/dynamic_instrumentation/enabling/java" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/dynamic_instrumentation/enabling/python" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/dynamic_instrumentation/enabling/dotnet" src="integrations_logos/dotnet-core.png" alt="Dotnet" >}}
  {{< image-card href="/dynamic_instrumentation/enabling/dotnet" src="integrations_logos/dotnet-framework.png" alt="Dotnet" >}}
  {{< image-card href="/dynamic_instrumentation/enabling/nodejs" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="/dynamic_instrumentation/enabling/ruby" src="integrations_logos/ruby.png" alt="Ruby" >}}
  {{< image-card href="/dynamic_instrumentation/enabling/php" src="integrations_logos/php.png" alt="PHP" >}}
  {{< image-card href="/dynamic_instrumentation/enabling/go" src="integrations_logos/go-metro.png" alt="Go" >}}
{{< /card-grid >}}

<div class="alert alert-info">
<b>Why DI instructions?</b>
Live Debugger is built on <a href="/tracing/dynamic_instrumentation/">Dynamic Instrumentation (DI)</a>, so its
setup instructions and limitations also apply here.
</div>

### Permissions

The following permissions are required to use Live Debugger:

- **Live Debugger Read** (`live_debugger_read`): Required to access the Live Debugger page.
- **Live Debugger Write** (`live_debugger_write`): Required to create or modify Debug Sessions and logpoints.
- **Live Debugger Redaction Write** (`live_debugger_redaction_write`): Required to change the [redaction mode][24] for captured data.

For more information about roles and how to assign roles to users, see [Role Based Access Control][21].

### Create a logs index

Live Debugger generates logs that are sent to Datadog and appear alongside your application logs.

If you use [Exclusion filters][11], make sure Live Debugger logs are not filtered:

1. Create a logs index and [configure it][12] to the desired retention with **no sampling**.
2. Set the filter to match on the `source:dd_debugger` tag. All Dynamic Instrumentation logs have this source.
3. Make sure the new index takes precedence over any other with filters that match that tag, because the first match wins.

### Link your source code

If you enable the Datadog Source Code Integration, you can debug code directly through
Live Debugger.

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

**Note:** Some feature limitations may apply depending on the service's runtime language. Review the [runtime language-specific documentation][16] for more details.

### Protecting sensitive data

Live Debugger data might contain sensitive information, especially when using the {{< ui >}}Capture Variables{{< /ui >}} option. Live Debugger automatically applies mode-based and identifier-based redaction to help protect this data.

#### Mode-based redaction

Live Debugger has two redaction modes:

- {{< ui >}}Strict Mode{{< /ui >}}: Redacts all values except numbers and Booleans.
- {{< ui >}}Targeted Mode{{< /ui >}}: Redacts known sensitive patterns such as credit card numbers, API keys, IPs, and other PII. It also runs a high-entropy secrets scanner that automatically redacts likely secrets, which appear as `[REDACTED:HIGH_ENTROPY]` in captured data.

These redaction modes cannot be disabled, only switched. Targeted Mode is applied automatically in common pre-production environments such as `staging` or `preprod`. Changing the redaction mode requires the **Live Debugger Redaction Write** permission.

#### Identifier-based redaction

Variable values associated with common sensitive identifiers (for example, `password`, `accessToken`, and similar terms) are scrubbed before captured data leaves the host. Each tracer includes additional language-specific redaction rules.

You can extend redaction behavior through:

- Custom identifier-based redaction
- Class/type-based redaction rules
- Sensitive Data Scanner rules

See the [sensitive data scrubbing][1] instructions and [Sensitive Data Scanner][17] documentation for configuration details.

### Bits Live Debugger

[Bits Live Debugger][23] lets you investigate a running service by describing the issue in plain language. Bits Code handles logpoint placement, captures variable snapshots, and helps interpret the results.

## Impact on performance and billing

Enabling Live Debugger on a service does not trigger data capture or impact performance. Data capture only occurs when there are active Debug Sessions on that service.

**Performance impact**: Datadog's agent-driven instrumentation ensures minimal impact on application performance; sampling logic, rate limits, and built-in budgets prevent runaway data capture.

**Pricing impact**: Logs captured by Datadog are all billed the same way. This applies whether they are generated from Live Debugger or logger lines in your source code. With Live Debugger, the logpoints automatically expire after the set time period, limiting unnecessary data accumulation and costs. Monitor your [Datadog Plan & Usage page][18] for any unexpected increases after utilizing a new feature.

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
[16]: /dynamic_instrumentation/enabling
[17]: /dynamic_instrumentation/sensitive-data-scrubbing/#redact-based-on-variable-values-with-sensitive-data-scanner
[18]: https://app.datadoghq.com/account/billing
[19]: /dynamic_instrumentation/
[20]: /tracing/code_origin
[21]: /account_management/rbac/permissions#apm
[22]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/go
[23]: /tracing/live_debugger/bits-live-debugger/
[24]: #mode-based-redaction
