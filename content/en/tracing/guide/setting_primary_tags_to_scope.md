---
title: Set Primary Tags to Scope
kind: documentation
aliases:
  - /tracing/advanced/setting_primary_tags_to_scope/
further_reading:
- link: "/tracing/other_telemetry/connect_logs_and_traces/"
  tag: "Documentation"
  text: "Connect your Logs and Traces together"
- link: "/tracing/manual_instrumentation/"
  tag: "Documentation"
  text: "Instrument manually your application to create traces."
- link: "/tracing/opentracing/"
  tag: "Documentation"
  text: "Implement Opentracing across your applications."
- link: "/tracing/glossary/"
  tag: "Documentation"
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
**Do not set different `env` tags on the Tracer and Agent. This may cause duplicate tagging on [trace metrics][5].**

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

If you need to aggregate your trace metrics across additional dimensions, we recommend setting up a second primary tag in addition to the
default and mandatory primary tag `env:<ENVIRONMENT>`. Once configured, a second dropdown is available in the **Service Catalog Performance** tab. 

Go to the [APM Settings][6] page to define, change, or remove your primary tags.

**Note**:

* Only organization administrators have access to this page.
* Changes may take up to two hours to be reflected in the UI.
* The tracer always adds `resource`, `name`, and `service` tags to spans. Datadog recommends never adding these as host level tags to avoid confusion.
* The second primary tag supports up to 30 unique values. See [APM Data Volume Guidelines][9] for details.

If you change a previously set primary tag, be aware of the following:

* Historical APM data aggregated by the previously set tag is no longer accessible.
* Any APM monitors scoped to the previous tag display a status of _No Data_.

## Container-based second primary tags

You can index your trace metrics based on the tags derived from Docker containers and Kubernetes pod metadata on Linux-based platforms. Container-based second primary tags are available in Datadog Agent versions 7.35.0 and later.

To enable container-based second primary tags, install Agent version 7.35.0 or later, update the CID stats setting as described below, and restart the Agent. The procedure for enabling depends on how you installed the Agent:

{{< tabs >}}
{{% tab "Helm" %}}

Using the Datadog Helm chart version 2.26.2 or later, add the following to your values file:

```yaml
#...
datadog:
  #...
  env:
    - name: DD_APM_FEATURES
      value: 'enable_cid_stats'
```

{{% /tab %}}

{{% tab "Kubernetes (without Helm)" %}}

Use the following environment variable in the Agent DaemonSet. If you are running a container per Agent process, add the following environment variable to all containers. Otherwise, add it to the Agent container.

```yaml
# (...)
  env:
    # (...)
    - name: DD_APM_FEATURES
      value: 'enable_cid_stats'
```

{{% /tab %}}
{{% tab "Docker Compose" %}}

Add the following to your [docker-compose.yml][1] file:

```yaml
services:
  #...
  datadog:
    #...
    environment:
     - DD_APM_FEATURES: 'enable_cid_stats'
```


[1]: /agent/guide/compose-and-the-datadog-agent/
{{% /tab %}}
{{% tab "Environment variables" %}}

If you configure the Agent with environment variables, as is common with Docker and ECS installations, pass the following environment variable to the trace Agent after upgrading the Docker image.

```
DD_APM_FEATURES=enable_cid_stats
```

{{% /tab %}}
{{< /tabs >}}

Restart the Agent. Go to the [APM Settings][6] page and select the second primary tag you want to use. It can take up to two hours for changes to this setting to take effect. 

Now you can filter your services in the [Service Catalog][7] by the tag being sent by your containerized services. Trace metrics used by Dashboards and Monitors can also be aggregated by the container primary tag.

### Custom labels as tags

If you haven't already, you may also configure the Agent to send container or Pod labels as custom tags for your traces with [Assigning Tags][8].

## View data by primary tag

Primary tags appear at the top of APM pages. Use these selectors to filter the data displayed on the current page. To view all data independent of a primary tag, choose `<TAG_NAME>:*` from the dropdown.

{{< img src="tracing/guide/setting_primary_tags/second-primary-tag-dropdown.png" alt="The dropdown menu showing options for selecting a scope with the second primary tag" style="width:90%;">}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/glossary/#trace
[2]: /getting_started/tagging/
[3]: /getting_started/tagging/unified_service_tagging
[4]: /getting_started/tagging/assigning_tags/#traces
[5]: /tracing/metrics/metrics_namespace/
[6]: https://app.datadoghq.com/apm/settings
[7]: https://app.datadoghq.com/services
[8]: /getting_started/tagging/assigning_tags
[9]: /tracing/troubleshooting/#data-volume-guidelines
