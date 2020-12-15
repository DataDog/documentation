---
title: Set Primary Tags to Scope
kind: documentation
aliases:
  - /tracing/advanced/setting_primary_tags_to_scope/
further_reading:
- link: "/tracing/connect_logs_and_traces/"
  tags: "Enrich Tracing"
  text: "Connect your Logs and Traces together"
- link: "/tracing/manual_instrumentation/"
  tags: "Enrich Tracing"
  text: "Instrument manually your application to create traces."
- link: "/tracing/opentracing/"
  tags: "Enrich Tracing"
  text: "Implement Opentracing across your applications."
- link: "/tracing/visualization/"
  tag: "Use the APM UI"
  text: "Explore your services, resources, and traces"
---

## Definition

There are several dimensions available to scope an entire Datadog APM application. These include aggregate statistics (such as requests/second, latency, error rate, Apdex score) and visible [traces][1]. These dimensions are set up through primary tags that allow you to get an even finer view of your application's behavior. Use cases for primary tags include environment, availability zone, datacenter, etc.

Primary tags must follow a different set of rules from those of conventional [Datadog tags][2].

## Setup

### Environment

The default and mandatory primary tag is the environment your traces are collected from. Its tag key is `env`, and its default value for un-tagged data is `env:none`.

#### Tracer environment

Datadog recommends having the tracer set `env`. It also allows for greater flexibility because the definition of `env` lives within the actual runtime of the service.

If `DD_ENV` is exposed to your service's process, the tracer will use it automatically. See [Unified Service Tagging][3] to learn about setting `DD_ENV` and other standard service environment variables.

You may also manually set `env` as a global tag for the tracer in code. See [assigning tags in APM][4] for more information.

#### Agent environment

The `env` tag can be set in your Agent configuration.
**However, if `env` is already present in trace data then it will override any `env` set in the Agent.**

Options:

1. Top-level Agent configuration:

    ```yaml
    env: <ENVIRONMENT>
    ...
    ```

    **Containerized environments**: The Agent also supports configuration of the top-level `env` through the environment variable `DD_ENV`.

2. Agent host tag:

    ```yaml
    tags:
        env: <ENVIRONMENT>
        ...
    ```

    **Containerized environments**: The Agent also supports configuration of top-level `tags` through the environment variable `DD_TAGS`.

#### Data by environment

Environments appear at the top of APM pages. Use the `env` dropdown to scope the data displayed on the current page.

## Add a second primary tag in Datadog

If you added a host tag other than `env:<ENVIRONMENT>` to your traces, it can be set as a primary tag along with the environment tag. Go to the [APM Settings][5] page to define, change, or remove your primary tags.

Note:

* Only organization administrators have access to this page.
* Changes may take up to two hours to be reflected in the UI.

If you change a previously set primary tag, be aware of the following:

* Historical APM data aggregated by the previously set tag is no longer accessible.
* Any APM monitors scoped to the previous tag display a status of _No Data_.

### Data by primary tag

Primary tags appear at the top of APM pages. Use these selectors to slice the data displayed on the current page. To view all data independent of a primary tag, choose `<TAG_NAME>:*` from the dropdown.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization/#trace
[2]: /getting_started/tagging/
[3]: /getting_started/tagging/unified_service_tagging
[4]: /getting_started/tagging/assigning_tags/#traces
[5]: https://app.datadoghq.com/apm/settings
