---
title: Set primary tags to scope
kind: documentation
aliases:
  - /tracing/advanced/setting_primary_tags_to_scope/
further_reading:
- link: "tracing/connect_logs_and_traces"
  tags: "Enrich Tracing"
  text: "Connect your Logs and Traces together"
- link: "tracing/manual_instrumentation"
  tags: "Enrich Tracing"
  text: "Instrument manually your application to create traces."
- link: "tracing/opentracing"
  tags: "Enrich Tracing"
  text: "Implement Opentracing across your applications."
- link: "tracing/visualization/"
  tag: "Use the APM UI"
  text: "Explore your services, resources, and traces"
---

## Definition

There are several dimensions available to scope an entire Datadog APM application. These include aggregate statistics (such as requests/second, latency, error rate, Apdex score) and visible [traces][1]. These dimensions are set up through primary tags that allow you to get an even finer view of your application's behavior. Use cases for primary tags include environment, availability zone, datacenter, etc.

Primary tags must follow a different set of rules from those of conventional [Datadog tags][2].

## Setup

### Environment

The default and mandatory primary tag is the environment your traces are collected from. Its tag key is `env`, and its default value for un-tagged data is `env:none`.
There are several ways to specify an environment when reporting data:

1. Host tag:
  Use a host tag with the format `env:<ENVIRONMENT>` to tag all traces from that Agent accordingly.

2. Agent configuration:
  Override the default tag used by the Agent in [the Agent configuration file][3]. This tags all traces coming through the Agent, overriding the host tag value.

    ```yaml
    apm_config:
      env: "<ENVIRONMENT>"
    ```

3. Per trace:
  When submitting a single trace, specify an environment by tagging one of its spans with the metadata key `env`. This overrides the Agent configuration and the host tag's value (if any). Consult the [trace tagging documentation][4] to learn how to assign a tag to your traces.

#### Viewing Data by Environment

Environments appear at the top of APM pages. Use the dropdown to scope the data displayed on the current page.

{{< img src="tracing/setting_primary_tags/envs_tracing_screen.png" alt="Envs tracing"  style="width:80%;">}}

## Add a second primary tag in Datadog

If you added a host tag other than `env:<ENVIRONMENT>` to your traces, it can be set as a primary tag along with the environment tag. Go to the [APM Settings][5] page to define, change, or remove your primary tags.

Note:

* Only organization administrators have access to this page.
* Changes may take up to two hours to be reflected in the UI.

If you change a previously set primary tag, be aware of the following:

* Historical APM data aggregated by the previously set tag is no longer accessible.
* Any APM monitors scoped to the previous tag display a status of _No Data_.

### Viewing Data by Primary Tag

Primary tags appear at the top of APM pages. Use these selectors to slice the data displayed on the current page. To view all data independent of a primary tag, choose `<TAG_NAME>:*` from the dropdown (as in the image below).

{{< img src="tracing/setting_primary_tags/primary_tags_ui.png" alt="Primary tags UI"  style="width:80%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization/#trace
[2]: /tagging
[3]: /agent/guide/agent-configuration-files/
[4]: /tagging/assigning_tags/#traces
[5]: https://app.datadoghq.com/apm/settings
