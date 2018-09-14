---
title: First-Class Dimensions
kind: documentation
aliases:
  - /tracing/environments/
  - /tracing/setup/environment
  - /tracing/setup/first_class_dimensions
further_reading:
- link: "tracing/setup/docker"
  tag: "Documentation"
  text: Docker setup
- link: "tracing/setup/go"
  tag: "Documentation"
  text: Go language instrumentation
- link: "tracing/setup/java"
  tag: "Documentation"
  text: Java language instrumentation
- link: "tracing/setup/python"
  tag: "Documentation"
  text: Python language instrumentation
- link: "tracing/setup/ruby"
  tag: "Documentation"
  text: Ruby language instrumentation
---

There are several dimensions that you can configure to scope an entire Datadog APM application. This includes aggregate statistics (such as requests/second, latency, error rate, Apdex score) and visible traces.

## Environment
### Definition

An environment is a first-class dimension that is used to scope an entire Datadog APM application. Some display settings are shared across environments, but measurable data (traces/aggregate statistics) cannot be re-aggregated across multiple environments. Use cases include:

* Stage environments such as production, staging, and pre-production.

Environments are [tags][1] which must follow these rules:

* They must start with a lower case letter.
* Other characters must be alphanumeric lower case Unicode characters, underscores, minuses, colons, periods, or slashes.
* They must not be more than 100 characters long.

Environments in traces and configuration files are normalized:

* Unsupported characters are replaced by underscores.
* Upper case characters are converted to lower case.

### Default environment

The default environment for un-tagged data is `env:none`. See below to see how to specify custom environments:

### Setup

There are several ways to specify an environment when reporting data:

1. Host tag:  
  Use a host tag with the format `env:XXXX` to tag all traces from that Agent accordingly.

2. Agent configuration:  
  Override the default tag used by the Agent in [the Agent configuration file][2]. This tags all traces coming through the Agent, overriding the host tag value.

    ```
    apm_config:
      env: pre-prod
    ```

3. Per trace:  
  When submitting a single trace, specify an environment by tagging one of its spans with the metadata key `env`. This overrides the Agent configuration and the host tags value (if any).  

{{< tabs >}}
{{% tab "Go" %}}

```go
tracer.SetTag("env", "prod")
```

For OpenTracing use the `tracer.WithGlobalTag` start option to set the environment globally.

{{% /tab %}}
{{% tab "Java" %}}
Via sysprop:

```
-Ddd.trace.span.tags=env:prod
```

Via environment variables:

```
DD_TRACE_SPAN_TAGS="env:prod"
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
Datadog.tracer.set_tags('env' => 'prod')
```

{{% /tab %}}
{{% tab "Python" %}}

```python
from ddtrace import tracer
tracer.set_tags({'env': 'prod'})
```
{{% /tab %}}
{{% tab ".NET" %}}

```csharp
using Datadog.Tracing;
Tracer.Instance.ActiveScope.Span.SetTag("env", "prod");
```

{{% /tab %}}
{{< /tabs >}}

### Viewing Data by Environment

Environments appear at the top of APM pages. Use the dropdown to scope the data displayed on the current page.

{{< img src="tracing/setup/first_class_dimensions/envs_tracing_screen.png" alt="Envs tracing" responsive="true" style="width:80%;">}}


## Primary Tags
### Definition

A primary tag is a first-class dimension that is used to scope an entire Datadog APM application. Primary tags are used in conjunction with environments to get an even finer view of your application's behavior. Use cases for primary tags include:

* Availability zone
* Datacenter

Primary tags must follow a different set of rules from those of conventional tags:

* They must start with a lowercase letter.
* Other characters must be alphanumeric lowercase Unicode characters, underscores, minuses, colons, periods, or slashes.
* They must not be more than 100 characters long.
* Only one primary tag per host is supported.

### Setup

APM primary tags must be set up in two ways: in the Agent and in the Datadog UI.

#### Agent configuration

Override the default tag used by the Agent in the [Agent configuration file][2]. This tags all traces coming through the Agent, overriding the host tag value. An APM primary tag is configured like any regular host tag. Specify it as:

```
tags:
- key:value
```

#### Datadog UI

Visit the [APM Settings][3] page to define, change, or remove primary tags. Note:

* Only organization Administrators have access to this page. 
* Changes may take up to two hours to be reflected in the UI.

If you change a previously set primary tag, be aware of the following:

* Historical APM data aggregated by the previously set tag will no longer be accessible.
* Any APM monitors scoped to the previous tag will display a status of _No Data_.

### Viewing Data by Primary Tag

Primary tags appear at the top of APM pages, next to environments. Use these selectors to slice the data displayed on the current page. To view all data independent of a primary tag, choose `tag-name:*` from the dropdown (as in the image below).

{{< img src="tracing/setup/first_class_dimensions/primary_tags_ui.png" alt="Primary tags UI" responsive="true" style="width:80%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/tagging
[2]: /agent/faq/agent-configuration-files/?tab=agentv6
[3]: https://app.datadoghq.com/apm/settings
