---
title: Assigning Tags
kind: documentation
description: 'Learn how to assign tags in Datadog.'
aliases:
    - /agent/tagging
    - /tagging/assigning_tags/
further_reading:
- link: "/getting_started/tagging/"
  tag: "Documentation"
  text: "Getting started with tags"
- link: "/getting_started/tagging/using_tags/"
  tag: "Documentation"
  text: "Learn how to use tags in Datadog"
---

## Overview

Tagging is used throughout Datadog to query the machines and metrics you monitor. Without the ability to assign and filter based on tags, finding problems in your environment and narrowing them down enough to discover the true causes could be difficult. Learn how to [define tags][1] in Datadog before going further.

Tags can be configured in several different ways:

- In the Datadog Agent [configuration file](#configuration-file) or each individual integration configuration file
- Through the Datadog [UI](#ui)
- With the Datadog [API](#api)
- With the [DogStatsD](#dogstatsd)

{{< tabs >}}
{{% tab "Non-containerized environments" %}}
In non-containerized environments, the Agent automatically assigns the [host tag](#host-tags) and inherits tags from integrations. These tags, along with additional tags that you can manually add, are configured in the [Datadog Agent configuration file](#configuration-file).
{{% /tab %}}

{{% tab "Containerized environments" %}}
In containerized environments, Datadog recommends using [Autodiscovery][1] as it allows for [unified service tagging][2], the recommended way to achieve a single point of configuration across all of your Datadog telemetry.

The goal of Autodiscovery is to apply a Datadog integration configuration when running an Agent check against a given container. When using Autodiscovery, the Datadog Agent automatically identifies which services are running on this new container, looks for corresponding monitoring configuration, and starts to collect metrics. Tags can then be configured from within the Autodiscovery [configuration template][3].

If Autodiscovery is not in use, the Agent automatically assigns the [host tag](#host-tags) and inherits tags from integrations the same as within a non-containerized environments. These tags, along with manually added tags are configured in the [Datadog Agent configuration file](#configuration-file).


[1]: /getting_started/agent/autodiscovery/
[2]: /getting_started/tagging/unified_service_tagging
[3]: /getting_started/agent/autodiscovery/?tab=docker#integration-templates
{{% /tab %}}
{{< /tabs >}}

## Methods to assign tags

### Configuration file

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

#### File location

The Agent configuration file (`datadog.yaml`) is used to set host tags which apply to all metrics, traces, and logs forwarded by the Datadog Agent.

Tags for the [integrations][1] installed with the Agent are configured with YAML files located in the **conf.d** directory of the Agent install. To locate the configuration files, see [Agent configuration files][2].

#### YAML format

In YAML files, use a list of strings under the `tags` key to assign a list of tags. In YAML, lists are defined with two different yet functionally equivalent forms:

```yaml
tags: ["<KEY_1>:<VALUE_1>", "<KEY_2>:<VALUE_2>", "<KEY_3>:<VALUE_3>"]
```

or

```yaml
tags:
    - "<KEY_1>:<VALUE_1>"
    - "<KEY_2>:<VALUE_2>"
    - "<KEY_3>:<VALUE_3>"
```

It is recommended to assign tags as `<KEY>:<VALUE>` pairs, but tags only consisting of keys (`<KEY>`) are also accepted. See [defining tags][3] for more details.

#### Host tags

The hostname (tag key `host`) is [assigned automatically][4] by the Datadog Agent. To customize the hostname, use the Agent configuration file, `datadog.yaml`:

```yaml
# Set the hostname (default: auto-detected)
# Must comply with RFC-1123, which permits only:
# "A" to "Z", "a" to "z", "0" to "9", and the hyphen (-)
hostname: mymachine.mydomain
```

##### Changing the hostname

* The old hostname remains in the UI for two hours but does not show new metrics.
* Any data from hosts with the old hostname can be queried with the API.
* To graph metrics with the old and new hostname in one graph, use [arithmetic between two metrics][5].


[1]: /getting_started/integrations/
[2]: /agent/configuration/agent-configuration-files/
[3]: /getting_started/tagging/#define-tags
[4]: /metrics/custom_metrics/dogstatsd_metrics_submission/#host-tag-key
[5]: /dashboards/querying/#arithmetic-between-two-metrics
{{% /tab %}}
{{% tab "Agent v5" %}}

#### File location

The Agent configuration file (`datadog.conf`) is used to set host tags which apply to all metrics, traces, and logs forwarded by the Datadog Agent.

Tags for the [integrations][1] installed with the Agent are configured with YAML files located in the **conf.d** directory of the Agent install. To locate the configuration files, see [Agent configuration files][2].

#### YAML format

In YAML files, use a list of strings under the `tags` key to assign a list of tags. In YAML, lists are defined with two different yet functionally equivalent forms:

```yaml
tags: <KEY_1>:<VALUE_1>, <KEY_2>:<VALUE_2>, <KEY_3>:<VALUE_3>
```

It is recommended to assign tags as `<KEY>:<VALUE>` pairs, but tags only consisting of keys (`<KEY>`) are also accepted. See [defining tags][3] for more details.

#### Host tags

The hostname (tag key `host`) is [assigned automatically][4] by the Datadog Agent. To customize the hostname, use the Agent configuration file, `datadog.conf`:

```yaml
# Set the hostname (default: auto-detected)
# Must comply with RFC-1123, which permits only:
# "A" to "Z", "a" to "z", "0" to "9", and the hyphen (-)
hostname: mymachine.mydomain
```

##### Changing the hostname

* The old hostname remains in the UI for 2 hours, but does not show new metrics.
* Any data from hosts with the old hostname can be queried with the API.
* To graph metrics with the old and new hostname in one graph, use [arithmetic between two metrics][5].


[1]: /getting_started/integrations/
[2]: /agent/configuration/agent-configuration-files/
[3]: /getting_started/tagging/#define-tags
[4]: /metrics/custom_metrics/dogstatsd_metrics_submission/#host-tag-key
[5]: /dashboards/querying/#arithmetic-between-two-metrics
{{% /tab %}}
{{< /tabs >}}

#### Integration inheritance

The most efficient method for assigning tags is to rely on integration inheritance. Tags you assign to your AWS instances, Chef recipes, and other integrations are automatically inherited by hosts and metrics you send to Datadog.

For containerized environments, it is recommended to follow the [unified service tagging][2] documentation to achieve a single point of configuration across all of your Datadog telemetry.

##### Cloud integrations

[Cloud integrations][3] are authentication based. Datadog recommends using the main cloud integration tile (AWS, Azure, Google Cloud, etc.) and [installing the Agent][4] where possible. **Note**: If you choose to use the Agent only, some integration tags are not available.

##### Web integrations

[Web integrations][5] are authentication based. Metrics are collected with API calls. **Note**: `CamelCase` tags are converted to underscores by Datadog, for example `TestTag` --> `test_tag`.

#### Environment variables

After installing the containerized Datadog Agent, you can set your host tags using the environment variable `DD_TAGS` in your Agents main configuration file.

Datadog automatically collects common tags from [Docker, Kubernetes, ECS, Swarm, Mesos, Nomad, and Rancher][6]. To extract even more tags, use the following options:

| Environment Variable               | Description                                                                                             |
|------------------------------------|---------------------------------------------------------------------------------------------------------|
| `DD_CONTAINER_LABELS_AS_TAGS`      | Extract container labels. This env is equivalent to the old `DD_DOCKER_LABELS_AS_TAGS` env.             |
| `DD_CONTAINER_ENV_AS_TAGS`         | Extract container environment variables. This env is equivalent to the old `DD_DOCKER_ENV_AS_TAGS` env. |
| `DD_KUBERNETES_POD_LABELS_AS_TAGS` | Extract pod labels                                                                                      |
| `DD_CHECKS_TAG_CARDINALITY`        | Add tags to check metrics (low, orchestrator, high)                                                     |
| `DD_DOGSTATSD_TAG_CARDINALITY`     | Add tags to custom metrics (low, orchestrator, high)                                                    |

**Examples:**

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"app":"kube_app","release":"helm_release"}'
DD_CONTAINER_LABELS_AS_TAGS='{"com.docker.compose.service":"service_name"}'
```

When using `DD_KUBERNETES_POD_LABELS_AS_TAGS`, you can use wildcards in the format:

```text
{"foo": "bar_%%label%%"}
```

For example, `{"app*": "kube_%%label%%"}` resolves to the tag name `kube_application` for the label `application`. Further, `{"*": "kube_%%label%%"}` adds all pod labels as tags prefixed with `kube_`.

When using the `DD_CONTAINER_LABELS_AS_TAGS` variable within a Docker Swarm `docker-compose.yaml` file, remove the apostrophes, for example:

```yaml
- DD_CONTAINER_LABELS_AS_TAGS={"com.docker.compose.service":"service_name"}
```

When adding labels to Docker containers, the placement of the `labels:` keyword inside the `docker-compose.yaml` file is important. To avoid issues, follow the [Docker unified service tagging][2] documentation.

 If the container needs to be labeled outside of this configuration, place the `labels:` keyword **inside** the `services:` section **not** inside the `deploy:` section. Place the `labels:` keyword inside the `deploy:` section only when the service needs to be labeled. The Datadog Agent does not have any labels to extract from the containers without this placement.

Below is a sample, working `docker-compose.yaml` file that shows this. In the example below, the labels in the `myapplication:` section, `my.custom.label.project` and `my.custom.label.version` each have unique values. Using the `DD_CONTAINER_LABELS_AS_TAGS` environment variable in the `datadog:` section extracts the labels and produces these tags for the `myapplication` container:

Inside the `myapplication` container the labels are: `my.custom.label.project` and `my.custom.label.version`

After the Agent extracts the labels from the container the tags are:
`projecttag:projectA`
`versiontag:1`

**Sample docker-compose.yaml:**

```yaml
services:
  datadog:
    volumes:
      - '/var/run/docker.sock:/var/run/docker.sock:ro'
      - '/proc:/host/proc:ro'
      - '/sys/fs/cgroup/:/host/sys/fs/cgroup:ro'
    environment:
      - DD_API_KEY= "<DATADOG_API_KEY>"
      - DD_CONTAINER_LABELS_AS_TAGS={"my.custom.label.project":"projecttag","my.custom.label.version":"versiontag"}
      - DD_TAGS="key1:value1 key2:value2 key3:value3"
    image: 'gcr.io/datadoghq/agent:latest'
    deploy:
      restart_policy:
        condition: on-failure
      mode: replicated
      replicas: 1
  myapplication:
    image: 'myapplication'
    labels:
      my.custom.label.project: 'projectA'
      my.custom.label.version: '1'
    deploy:
      restart_policy:
        condition: on-failure
      mode: replicated
      replicas: 1
```

Either define the variables in your custom `datadog.yaml`, or set them as JSON maps in these environment variables. The map key is the source (`label/envvar`) name, and the map value is the Datadog tag name.

##### Tags cardinality

There are two environment variables that set tag cardinality: `DD_CHECKS_TAG_CARDINALITY` and `DD_DOGSTATSD_TAG_CARDINALITY`. Because DogStatsD is priced differently, the DogStatsD tag cardinality setting is separated to provide the opportunity for finer configuration. Otherwise, these variables function the same way: they can have values `low`, `orchestrator`, or `high`. They both default to `low`, which pulls in host-level tags.

Depending on the cardinality, there is a different set of out-of-the box tags for [Kubernetes and OpenShift][7], and for [Docker, Rancher, and Mesos][8]. For ECS and Fargate, setting the variable to `orchestrator` adds the `task_arn` tag.

#### Traces

The Datadog tracer can be configured with environment variables, system properties, or through configuration in code. The [Datadog tracing setup][9] documentation has information on tagging options and configuration for each tracer. You can also follow the [unified service tagging][2] documentation to configure your tracer for unified service tagging.

Regardless of the tracer used, span metadata must respect a typed tree structure. Each node of the tree is split by a `.` and is of a single type.

For instance, a node can't be both an object (with sub-nodes) and a string:
```json
{
  "key": "value",
  "key.subkey": "value_2"
}
```
The span metadata above is invalid since the value of `key` cannot reference a string (`"value"`) and also a subtree (`{"subkey": "value_2"}`).

### UI

{{< tabs >}}
{{% tab "Host Map" %}}

Assign host tags in the UI using the [Host Map page][1]. Click on any hexagon (host) to show the host overlay on the bottom of the page. Then, under the *User* section, click the **Add Tags** button. Enter the tags as a comma separated list, then click **Save Tags**. Changes made to host tags in the UI may take up to five minutes to apply.

{{< img src="tagging/assigning_tags/host_add_tags.png" alt="Host map with an host details opened highlighting Add Tags button" style="width:80%;">}}


[1]: /infrastructure/hostmap/
{{% /tab %}}
{{% tab "Infrastructure List" %}}

Assign host tags in the UI using the [Infrastructure List page][1]. Click on any host to show the host overlay on the right of the page. Then, under the *User* section, click the **Add Tags** button. Enter the tags as a comma separated list, then click **Save Tags**. Changes made to host tags in the UI may take up to five minutes to apply. After you add tags, ensure they are visible in the UI before attempting to add more tags.

{{< img src="tagging/assigning_tags/infrastructure_add_tags.png" alt="Infrastructure List with an Infrastructure details panel opened highlighting Add Tags button" style="width:80%;">}}


[1]: /infrastructure/
{{% /tab %}}
{{% tab "Monitors" %}}

From the [Manage Monitors][1] page, select the checkbox next to each monitor to add tags (select one or multiple monitors). Click the **Edit Tags** button. Enter a tag or select one used previously. Then click **Add Tag `tag:name`** or **Apply Changes**. If tags were added previously, multiple tags can be assigned at once using the tag checkboxes. For more information, see the [Manage Monitors documentation][2].

When creating a monitor, assign monitor tags under step 4 *Say what's happening* or *Notify your Team*:

{{< img src="monitors/notifications/notifications_add_required_tags.png" alt="View of policy tag configuration. Underneath 'Policy tags' are three example tags, cost_center, product_id, and env, next to a 'Select value' dropdown." style="width:80%;" >}}

[1]: https://app.datadoghq.com/monitors/manage
[2]: /monitors/manage/
{{% /tab %}}
{{% tab "Distribution Metrics" %}}

Create percentile aggregations within [Distribution Metrics][1] by applying an allow list of up to ten tags to a metric. This creates a timeseries for every potentially queryable combination of tag values. For more information on counting custom metrics and timeseries emitted from distribution metrics, see [Custom Metrics][2].

**Apply up to ten tags. Exclusionary tags are not accepted**:

{{< img src="tagging/assigning_tags/global_metrics_selection.png" alt="Create Monitor Tags" style="width:80%;">}}

[1]: /metrics/distributions/
[2]: /metrics/custom_metrics/
{{% /tab %}}
{{% tab "Integrations" %}}

The [AWS][1] integration tile allows you to assign additional tags to all metrics at the account level. Use a comma separated list of tags in the form `<KEY>:<VALUE>`.

{{< img src="tagging/assigning_tags/integrationtags.png" alt="AWS Tags" style="width:80%;">}}

[1]: /integrations/amazon_web_services/
{{% /tab %}}
{{% tab "Service Level Objectives" %}}

When creating an SLO, assign tags under step 3 *Add name and tags*:

{{< img src="tagging/assigning_tags/slo_individual_tags.png" alt="Create SLO Tags" style="width:80%;">}}

{{% /tab %}}
{{< /tabs >}}

### API

{{< tabs >}}
{{% tab "Assignment" %}}

Tags can be assigned in various ways with the [Datadog API][1]. See the list below for links to those sections:

* [Post a check run][1]
* [Post an event][2]
* [AWS Integration][3]
* [Post timeseries point][4]
* [Create][5] or [Edit][6] a monitor
* [Add][7] or [Update][8] host tags
* [Send traces][9]
* [Create][10] or [Update][11] a Service Level Objective

[1]: /api/v1/service-checks/#submit-a-service-check
[2]: /api/v1/events/#post-an-event
[3]: /api/v1/aws-integration/
[4]: /api/v1/metrics/#submit-metrics
[5]: /api/v1/monitors/#create-a-monitor
[6]: /api/v1/monitors/#edit-a-monitor
[7]: /api/v1/tags/#add-tags-to-a-host
[8]: /api/v1/tags/#update-host-tags
[9]: /tracing/guide/send_traces_to_agent_by_api/
[10]: /api/v1/service-level-objectives/#create-a-slo-object
[11]: /api/v1/service-level-objectives/#update-a-slo
{{% /tab %}}
{{% tab "Example" %}}

Tagging within Datadog is a powerful way to gather your metrics. For a quick example, perhaps you're looking for a sum of the following metrics coming from your website (example.com):

```text
Web server 1: api.metric('page.views', [(1317652676, 100), ...], host="example_prod_1")
Web server 2: api.metric('page.views', [(1317652676, 500), ...], host="example_prod_2")
```

Datadog recommends adding the tag `domain:example.com` and leaving off the hostname (the Datadog API determines the hostname automatically):

```text
Web server 1: api.metric('page.views', [(1317652676, 100), ...], tags=['domain:example.com'])
Web server 2: api.metric('page.views', [(1317652676, 500), ...], tags=['domain:example.com'])
```

With the `domain:example.com` tag, the page views can be summed across hosts:

```text
sum:page.views{domain:example.com}
```

To get a breakdown by host, use:

```text
sum:page.views{domain:example.com} by {host}
```

{{% /tab %}}
{{< /tabs >}}

### DogStatsD

Add tags to any metric, event, or service check you send to [DogStatsD][9]. For example, compare the performance of two algorithms by tagging a timer metric with the algorithm version:

```python

@statsd.timed('algorithm.run_time', tags=['algorithm:one'])
def algorithm_one():
    # Do fancy things here ...

@statsd.timed('algorithm.run_time', tags=['algorithm:two'])
def algorithm_two():
    # Do fancy things (maybe faster?) here ...
```

**Note**: Tagging is a [Datadog-specific extension][10] to StatsD.

Special consideration is necessary when assigning the `host` tag to DogStatsD metrics. For more information on the host tag key, see the [DogStatsD section][11].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/#define-tags
[2]: /getting_started/tagging/unified_service_tagging
[3]: /integrations/#cat-cloud
[4]: /getting_started/agent/#setup
[5]: /integrations/#cat-web
[6]: /agent/docker/?tab=standard#tagging
[7]: /agent/kubernetes/tag/?tab=containerizedagent#out-of-the-box-tags
[8]: /agent/docker/tag/?tab=containerizedagent#out-of-the-box-tagging
[9]: /tracing/setup/
[10]: /developers/dogstatsd/
[11]: /developers/community/libraries/
