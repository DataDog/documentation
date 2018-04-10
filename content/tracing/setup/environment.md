---
title: Environment
kind: documentation
aliases:
  - /tracing/environments/
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

#### Definition

An environment is a first class dimension that you use to scope an entire Datadog APM application. Some display settings can be shared across environments, but all the measurable data (traces/metrics/statistics) can not be re-aggregated across multiple environments. Use cases include:

* Stage environments such as production, staging, and pre-production
* Data centers and availability zones in isolation

Environments are [tags][1], therefore they must follow the following rules:

* They must start with a lower case letter.
* Other characters must be alphanumeric lower case Unicode characters, underscores, minuses, colons, periods or slashes.
* They must not be more than 100 characters long.

Environments in traces and configuration files are normalized:

* Unsupported characters are replaced by underscores.
* Upper case characters are converted to lower case.

#### Default environment

The default environment for un-tagged data is `env:none`. See below to see how to specify custom environments:

#### Setup

There are several ways to specify an environment when reporting data:

1. Host tag:  
  Use a host tag with the format `env:XXXX` to tag all traces from that agent accordingly.

2. Agent configuration:  
  Override the default tag used by the trace agent in [the Agent configuration file][2]. This tags all traces coming through the agent, overriding the host tag value.

    ```
    [trace.config]
    env = pre-prod
    ```

3. Per trace:  
  When submitting a single trace, specify an environment by tagging one of its spans with the metadata key `env`. This overrides the agent configuration and the host tags value (if any).  

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


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /agent/tagging
[2]: /agent/faq/where-is-the-configuration-file-for-the-agent
