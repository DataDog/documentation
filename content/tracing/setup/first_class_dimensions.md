---
title: First Class Dimensions
kind: documentation
aliases:
  - /tracing/environments/
  - /tracing/setup/environment
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

An environment is a [first class dimension](#primary-tags) that you use to scope an entire Datadog APM application. Some display settings can be shared across environments, but all the measurable data (traces/metrics/statistics) can not be re-aggregated across multiple environments. Use cases include:

* Stage environments such as production, staging, and pre-production
* Data centers and availability zones in isolation

Environments are [tags][1], therefore they must follow the following rules:

* They must start with a lower case letter.
* Other characters must be alphanumeric lower case Unicode characters, underscores, minuses, colons, periods or slashes.
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
  Override the default tag used by the trace Agent in [the Agent configuration file][2]. This tags all traces coming through the Agent, overriding the host tag value.

    ```
    [trace.config]
    env = pre-prod
    ```

3. Per trace:  
  When submitting a single trace, specify an environment by tagging one of its spans with the metadata key `env`. This overrides the Agent configuration and the host tags value (if any).  

  * **Go**:
    ```
    tracer.SetMeta(“env”, “prod”)
    ```
  For OpenTracing use the “GlobalTags” field in the “opentracing.Configuration” structure.

  * **Java**:  
      Via sysprop: 
      ```
      -Ddd.trace.span.tags=”env:prod”
      ```
      Via env var:
      ```
      DD_TRACE_SPAN_TAGS=”env:prod”
      ```

  * **Ruby**:
  ```
  Datadog.tracer.set_tags(‘env’ => ‘prod’)
  ```

  * **Python**:
    ```
    from ddtrace import tracer
    tracer.set_tags('env', 'prod')
    ```

### Viewing Data by Environment

Environments appear near the top of APM pages. Use the dropdown to scope the data displayed on the current page.

{{< img src="tracing/setup/first_class_dimensions/envs_tracing_screen.png" alt="Envs tracing" responsive="true" popup="true" style="width:80%;">}}


## Primary Tags
### Definition

A primary tag is a first-class dimension that you use to scope an entire Datadog APM application. Primary tags can be used in conjunction with environments to get an even finer view of your application’s behavior. Use cases for primary tags include:

* availability zone
* datacenter

You can optionally set 1 primary tag. A primary tag must follow these rules:

* It must start with a lowercase letter.
* Other characters must be alphanumeric lowercase Unicode characters, underscores, minuses, colons, periods, or slashes.
* It must not be more than 100 characters long.

### Setup
APM primary tags must be set up in two ways: in the trace Agent and in the Datadog UI.

#### Agent configuration
Override the default tag used by the trace Agent in the Agent configuration file. This tags all traces coming through the Agent, overriding the host tag value. An APM primary tag is configured like any regular host tag. You can specify it as:

```
tags:
- key:value
```

#### Datadog UI

Visit the [APM Settings](https://app.datadoghq.com/apm/settings) page to define, change, or remove primary tags. Only organization admins have access to this page. 

Changes will be reflected in the UI within several minutes.  Note:

 If you change a previously set primary tag, please be aware of the following:

* Historical APM data aggregated by the previously set tag will no longer be accessible.
* Any APM monitors scoped to the previous tag will display a status of _No Data_.

### Viewing Data by Primary Tag

Primary tags appear near the top of APM pages, next to environments. Use these selectors to slice the data displayed on the current page. To view all data independent of a primary tag, choose `tag-name:*` from the dropdown (as in the image below).

{{< img src="tracing/setup/first_class_dimensions/primary_tags_ui.png" alt="Primary tags UI" responsive="true" popup="true" style="width:80%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/tagging
[2]: /agent/faq/where-is-the-configuration-file-for-the-agent
