---
title: Live Debugger
description: Debug running applications in real time using non-breaking logpoints that collect information without stopping execution or redeploying code.
content_filters:
  - trait_id: prog_lang
    option_group_id: live_debugger_language_options
    label: "Language"
aliases:
  - /ide_plugins/idea/live_debugger/
  - /developers/ide_plugins/idea/live_debugger/
  - /ide_plugins/vscode/live_debugger/
  - /tracing/trace_collection/dynamic_instrumentation/enabling/nodejs/
  - /dynamic_instrumentation/enabling/nodejs
  - /tracing/dynamic_instrumentation/enabling/nodejs
  - /tracing/trace_collection/dynamic_instrumentation/enabling/ruby/
  - /dynamic_instrumentation/enabling/ruby/
  - /tracing/dynamic_instrumentation/enabling/ruby
  - /tracing/trace_collection/dynamic_instrumentation/enabling/go/
  - /dynamic_instrumentation/enabling/go
further_reading:
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
  - link: "https://www.datadoghq.com/blog/azure-devops-source-code-integration/"
    tag: "Blog"
    text: "Identify and fix code issues faster with Datadog’s Azure DevOps Source Code integration"
  - link: "https://www.datadoghq.com/blog/gitlab-source-code-integration"
    tag: "Blog"
    text: "Troubleshoot faster with the GitLab Source Code integration in Datadog"
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

- The [Datadog Agent][2], version 7.49.0 or higher
- An installed [Datadog SDK][3] (see the [Enable Live Debugger](#enable-live-debugger) section for minimum SDK versions)
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

Live Debugger enablement depends on your service's runtime language. Select your language from the dropdown above for enablement instructions and minimum SDK versions.

You can disable Live Debugger for a service and environment from the [Live Debugger Settings page][26], regardless of runtime language or SDK version.

**Note**: Live Debugger can work on older SDK versions through manual enablement, but you may encounter missing capabilities, unexpected errors, or a degraded experience. Datadog recommends keeping your SDK up to date.

{% if includes($prog_lang, ["java", "python", "dot_net", "node_js"]) %}

You can enable Live Debugger in-app in one of two ways:

- On the [Live Debugger Settings page][26], enable the service and environment.
- Start a Debug Session. Live Debugger is enabled automatically on the selected service and environment.

Either option requires the following minimum SDK version:

| Language | Minimum SDK version |
|----------|---------------------|
| Java     | 1.48.0              |
| Python   | 3.10.0              |
| .NET     | 3.29.0              |
| Node.js  | 5.84.0              |

If your SDK version is lower, or you prefer to configure Live Debugger with environment variables, use the following manual configuration.

{% /if %}

<!-- Java -->
{% if equals($prog_lang, "java") %}

**SDK version**: [Datadog Java SDK][30] version 1.64.0 or higher is strongly recommended, running on JDK 8 or higher. The minimum SDK version is 1.42.0, but it may result in unexpected errors and a degraded experience.

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

**Note**: On JDK 18 and earlier, classes compiled with the `-parameters` flag (default in Spring 6+, Spring Boot 3+, and Scala) may fail to instrument with the error `Method Parameters detected`.

{% /if %}
<!-- end Java -->

<!-- Python -->
{% if equals($prog_lang, "python") %}

**SDK version**: [Datadog Python SDK (`ddtrace`)][31] version 4.11.0 or higher is strongly recommended. The minimum SDK version is 2.9.0, but it may result in unexpected errors and a degraded experience.

Install `ddtrace`, then start your service with `DD_DYNAMIC_INSTRUMENTATION_ENABLED=true` and `ddtrace-run`:

```shell
pip install ddtrace
export DD_SERVICE=<YOUR_SERVICE>
export DD_ENV=<YOUR_ENV>
export DD_VERSION=<YOUR_VERSION>
export DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
ddtrace-run python -m myapp.py
```

{% /if %}
<!-- end Python -->

<!-- .NET -->
{% if equals($prog_lang, "dot_net") %}

**SDK version**: [Datadog .NET SDK][32] version 3.46.0 or higher is strongly recommended. The minimum SDK version is 3.9.0, but it may result in unexpected errors and a degraded experience.

Start your service with the following environment variables set:

```shell
DD_SERVICE=<YOUR_SERVICE>
DD_ENV=<YOUR_ENV>
DD_VERSION=<YOUR_VERSION>
DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
```

{% /if %}
<!-- end .NET -->

<!-- Node.js -->
{% if equals($prog_lang, "node_js") %}

**SDK version**: [Datadog Node.js SDK (`dd-trace-js`)][33] version 5.109.0 or higher is strongly recommended. The minimum SDK version is 5.39.0, but it may result in unexpected errors and a degraded experience. If your source code is transpiled or bundled (for example, TypeScript, Babel, or Webpack), publish source maps with the deployed application so that logpoints map to the correct lines.

Start your service with the following environment variables set:

```shell
DD_SERVICE=<YOUR_SERVICE>
DD_ENV=<YOUR_ENV>
DD_VERSION=<YOUR_VERSION>
DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
```

{% /if %}
<!-- end Node.js -->

<!-- Ruby -->
{% if equals($prog_lang, "ruby") %}

Ruby requires manual configuration through environment variables.

**SDK version**: [Datadog Ruby SDK (`ddtrace`)][34] version 2.38.0 or higher is strongly recommended. The minimum SDK version is 2.37.0, but it may result in unexpected errors and a degraded experience.

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

{% /if %}
<!-- end Ruby -->

<!-- PHP -->
{% if equals($prog_lang, "php") %}

PHP requires manual configuration through environment variables.

**SDK version**: [Datadog PHP SDK (`dd-trace-php`)][35] version 1.23.0 or higher is strongly recommended. The minimum SDK version is 1.5.0, but it may result in unexpected errors and a degraded experience.

Start your service with the following environment variables set:

```shell
DD_SERVICE=<YOUR_SERVICE>
DD_ENV=<YOUR_ENV>
DD_VERSION=<YOUR_VERSION>
DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
```

{% /if %}
<!-- end PHP -->

<!-- Go -->
{% if equals($prog_lang, "go") %}

Go services require enabling Live Debugger in both the Datadog Agent and the application. After the Agent is configured, services on the same host can be enabled from the [Live Debugger Settings page][26] (Go SDK 2.6.0 or higher) or through environment variables.

**SDK version**: [Datadog Go SDK][36] version 2.9.0 or higher is strongly recommended (or 1.74.6 or higher on the v1 line).

**Additional requirements:**

- [Datadog Agent][2] version 7.73.0 or higher, running on the same host as your application
- Linux kernel 5.17 or higher

**Configure the Datadog Agent** using one of the following methods, depending on how you deploy the Agent:

- **Configuration YAML file**: Update `system-probe.yaml` (located alongside `datadog.yaml`) with the following. For more information, see [Agent configuration files][37].

  ```yaml
  dynamic_instrumentation:
    enabled: true
  ```

- **Environment variable**: Add the following to your Datadog Agent manifest:

  ```text
  DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
  ```

- **Helm**: Add the following to your Helm chart:

  ```yaml
  datadog:
    dynamicInstrumentationGo:
      enabled: true
  ```

**Configure your service**: After the Agent is configured, start the service with the following environment variables set:

```shell
DD_SERVICE=<YOUR_SERVICE>
DD_ENV=<YOUR_ENV>
DD_VERSION=<YOUR_VERSION>
DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
```

{% /if %}
<!-- end Go -->

#### Enablement modes

On the [Live Debugger Settings page][26], you can check and update the enablement status of each service and environment. Each service and environment can be in one of three modes:

- {% ui %}Automatic{% /ui %}: Live Debugger has not been set to {% ui %}Enabled{% /ui %} or {% ui %}Disabled{% /ui %} yet on this service and environment. This setting changes to {% ui %}Enabled{% /ui %} automatically the first time a Debug Session is started. For a faster first-time debugging experience, switch the setting to {% ui %}Enabled{% /ui %} in advance.
- {% ui %}Enabled{% /ui %}: Live Debugger is activated on the selected service and environment, including debug symbol uploads and faster delivery of new logpoints.
- {% ui %}Disabled{% /ui %}: Logpoints cannot be created or reactivated on the given service and environment. It applies regardless of runtime language or SDK version.

### (Recommended) Create a logs index {% #create-a-logs-index %}

Live Debugger generates logs that are sent to Datadog and appear alongside your application logs. A dedicated logs index helps ensure these logs aren't unintentionally filtered out, especially if you use [Exclusion filters][11].

To create the index:

1. Create a logs index and [configure it][12] to the desired retention with **no sampling**.
2. Set the filter to match on the `source:dd_debugger` tag. All Live Debugger logs have this source.
3. Make sure the new index takes precedence over any other with filters that match that tag, because the first match wins.

### (Recommended) Link your source code {% #link-your-source-code %}

Set up [Source Code Integration][28] to view source code files directly in Live Debugger. After you link the service and environment to the corresponding repository and Git commit SHA, you can add logpoints and see existing ones in the source code as you would with breakpoints in an IDE. This helps you confirm logpoints are placed accurately and avoid capturing unintended data or generating invalid results.

**Note**: Source Code Integration is optional when starting a Debug Session manually, but it is required when using [Bits Live Debugger][23].

## Using Live Debugger

### Creating and using a Debug Session

A Debug Session lets you inspect running code using auto-expiring logpoints. To create and use a Debug Session:

1. Start a Debug Session from one of the following locations:
   - (Preview) On the [Live Debugger page][13], submit a question or investigation prompt to [Bits Live Debugger][29].
   - On the [Live Debugger page][13], click {% ui %}Create Debug Session{% /ui %} or {% ui %}New Session{% /ui %}.
   - In the [Trace Explorer][14], open a trace, locate the [Code Origin][20] section in the side panel, and click {% ui %}Start Debug Session{% /ui %}.
2. Select a code location to add the first logpoint and begin capturing log events.
3. Add, remove, or modify logpoints as needed during the session.
4. Log events captured by the logpoints appear in the Debug Session view as they are ingested and indexed. You can also view, query, and analyze these logs in Logs Explorer and other Datadog tools that reference log data.
5. View active and inactive Debug Sessions created by users in your organization in the Live Debugger Sessions list. A Debug Session's log events are visible only during the retention period defined for [the logs index](#create-a-logs-index).

Debug Sessions expire automatically. You can also manually disable or re-enable a session, as well as individual logpoints, at any time.

### Creating logpoints

Logpoints are "non-breaking breakpoints" that specify where in the code to capture information, what data to include, and under what conditions. To add a logpoint for debugging:

1. Go to the [Live Debugger page][13].
2. Click {% ui %}Create Debug Session{% /ui %}.
3. Choose your service, environment, and select where in your code to place the first logpoint.
4. Define a logpoint message template using the [expression language][15].
5. (Optional) Use the {% ui %}Capture Variables{% /ui %} option to collect all execution context or specific variables as part of the log event metadata (this feature is rate-limited to 1 execution per second). To capture only a log message string, remove the capture variables option from the logpoint definition.
6. (Optional) Define a condition for when the logs should be emitted.
7. Click {% ui %}Apply changes{% /ui %} to save modifications to existing logpoint definitions.

Most logpoint settings can be modified after creation, even if the logpoint already started capturing log events. However, the logpoint's originally selected service, environment, and code location cannot be modified (a new logpoint or Debug Session should be created in this case).

After a logpoint is created, modified, or re-activated, it can take a couple of minutes to instrument the code and begin capturing log events. **Note**: If the selected code is not executed or the logpoint condition(s) are not met, then no log events are generated.

### Protecting sensitive data

Live Debugger data might contain sensitive information, especially when using the {% ui %}Capture Variables{% /ui %} option. Live Debugger automatically applies mode-based and identifier-based redaction to help protect this data.

#### Mode-based redaction

Live Debugger has two redaction modes:

- {% ui %}Strict Mode{% /ui %}: Redacts all values except numbers and Booleans. [Bits Live Debugger][23] is not available for service and environment combinations set to {% ui %}Strict Mode{% /ui %}.
- {% ui %}Targeted Mode{% /ui %}: Redacts known sensitive patterns such as credit card numbers, API keys, IPs, and other PII. It also runs a high-entropy secrets scanner that automatically redacts likely secrets, which appear as `[REDACTED:HIGH_ENTROPY]` in captured data.

These redaction modes cannot be disabled, only switched. Targeted Mode is applied automatically in common pre-production environments such as `staging` or `preprod`. Changing the redaction mode requires the **Live Debugger Redaction Write** permission.

#### Identifier-based redaction

Variable values associated with common sensitive identifiers (for example, `password`, `accessToken`, and similar terms) are scrubbed before captured data leaves the host. Additional language-specific redaction rules are built into each SDK.

You can extend redaction behavior through:

- Custom identifier-based redaction
- Class/type-based redaction rules
- Sensitive Data Scanner rules

See the [sensitive data scrubbing][1] instructions and [Sensitive Data Scanner][17] documentation for configuration details.

### Bits Live Debugger

{% alert %}
Bits Live Debugger is in Preview. [Learn more about Bits Live Debugger and request access](/tracing/live_debugger/bits-live-debugger/).
{% /alert %}

[Bits Live Debugger][23] lets you investigate a running service by describing the issue in plain language. Bits Code handles logpoint placement, captures variable snapshots, and helps interpret the results.

**Note**: [Bits Live Debugger][23] requires the service and environment to be in Targeted Mode. See [Mode-based redaction][24] for details.

## Limitations

The following constraints apply to Live Debugger usage and configuration:

- **Configuration scope:** Live Debugger and Dynamic Instrumentation are enabled or disabled together for the same service and environment.
- **Rate limits:**
   - Logpoints with variable capture: Limited to 1 execution per second.
   - Logpoints without variable capture: Limited to 5000 executions per second, per service instance.

[1]: /dynamic_instrumentation/sensitive-data-scrubbing/
[2]: /agent/
[3]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/
[4]: /tracing/guide/remote_config
[11]: /logs/log_configuration/indexes/#exclusion-filters
[12]: /logs/log_configuration/indexes/#add-indexes
[13]: https://app.datadoghq.com/debugging/
[14]: https://app.datadoghq.com/apm/traces
[15]: /dynamic_instrumentation/expression-language/
[17]: /dynamic_instrumentation/sensitive-data-scrubbing/#redact-based-on-variable-values-with-sensitive-data-scanner
[20]: /tracing/code_origin
[21]: /account_management/rbac/permissions#apm
[23]: /tracing/live_debugger/bits-live-debugger/
[24]: #mode-based-redaction
[26]: https://app.datadoghq.com/debugging/settings
[27]: /getting_started/tagging/unified_service_tagging/
[28]: /integrations/guide/source-code-integration/
[29]: /tracing/live_debugger/bits-live-debugger/#start-a-debugging-session
[30]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
[31]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/python/
[32]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core
[33]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/
[34]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby/
[35]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/php
[36]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/go
[37]: /agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
