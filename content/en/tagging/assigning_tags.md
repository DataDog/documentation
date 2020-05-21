---
title: Assigning Tags
kind: documentation
aliases:
    - /agent/tagging
    - /getting_started/tagging/assigning_tags
further_reading:
- link: "/tagging/"
  tag: "Documentation"
  text: "Getting started with tags"
- link: "/tagging/using_tags/"
  tag: "Documentation"
  text: "Learn how to use tags in Datadog"
---

## Overview

Tagging is used throughout Datadog to query the machines and metrics you monitor. Without the ability to assign and filter based on tags, finding problems in your environment and narrowing them down enough to discover the true causes could be difficult. Learn how to [define tags][1] in Datadog before going further.

**It is recommended that you use [configuration files](#configuration-files) and [integration inheritance](#integration-inheritance) for most of your tagging needs.**

However, there are several ways other ways tags can be assigned: through [environment variables][2], in your [traces](#traces), within the Datadog [UI](#ui), by using the [API][3], or [DogStatsD][4].

## Configuration Files

### Hostname

The hostname (tag key `host`) is [assigned automatically][5] by the Datadog Agent. To customize the hostname, use the Agent configuration file, `datadog.yaml`:

```yaml
# Set the hostname (default: auto-detected)
# Must comply with RFC-1123, which permits only:
# "A" to "Z", "a" to "z", "0" to "9", and the hyphen (-)
hostname: mymachine.mydomain
```

#### Changing the hostname

* The old hostname remains in the UI for 2 hours but does not show new metrics.
* Any data from hosts with the old hostname can be queried with the API.
* To graph metrics with the old and new hostname in one graph, use [Arithmetic between two metrics][6].

### Add tags

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

The Agent configuration file (`datadog.yaml`) is also used to set host tags which apply to all metrics, traces, and logs forwarded by the Datadog Agent (see YAML formats below).

{{% /tab %}}
{{% tab "Agent v5" %}}

The Agent configuration file (`datadog.conf`) is also used to set host tags which apply to all metrics, traces, and logs forwarded by the Datadog Agent. Tags within `datadog.conf` must be in the format:

```text
tags: <KEY_1>:<VALUE_1>, <KEY_2>:<VALUE_2>, <KEY_3>:<VALUE_3>
```

{{% /tab %}}
{{< /tabs >}}

Tags for the [integrations][7] installed with the Agent are configured with YAML files located in the **conf.d** directory of the Agent install. To locate the configuration files, refer to [Agent configuration files][8].

#### YAML formats

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

It is recommended to assign tags as `<KEY>:<VALUE>` pairs, but tags only consisting of keys (`<KEY>`) are also accepted. See [defining tags][1] for more details.

## Environment Variables

When installing the containerized Datadog Agent, set your host tags using the environment variable `DD_TAGS`. As a best practice, **Datadog recommends using [unified service tagging for containerized environments][9].**

Datadog automatically collects common tags from [Docker][10], [Kubernetes][11], [ECS][12], [Swarm, Mesos, Nomad, and Rancher][10]. To extract even more tags, use the following options:

| Environment Variable               | Description                                    |
|------------------------------------|------------------------------------------------|
| `DD_DOCKER_LABELS_AS_TAGS`         | Extract docker container labels                |
| `DD_DOCKER_ENV_AS_TAGS`            | Extract docker container environment variables |
| `DD_KUBERNETES_POD_LABELS_AS_TAGS` | Extract pod labels                             |
| `DD_CHECKS_TAG_CARDINALITY`        | Add tags to check metrics                      |
| `DD_DOGSTATSD_TAG_CARDINALITY`     | Add tags to custom metrics                     |

**Examples:**

```shell
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"app":"kube_app","release":"helm_release"}'
DD_DOCKER_LABELS_AS_TAGS='{"com.docker.compose.service":"service_name"}'
```

When using `DD_KUBERNETES_POD_LABELS_AS_TAGS`, you can use wildcards in the format:

```text
{"foo", "bar_%%label%%"}
```

For example, `{"app*", "kube_%%label%%"}` resolves to the tag name `kube_application` for the label `application`. Further, `{"*", "kube_%%label%%"}` adds all pod labels as tags prefixed with `kube_`.

When using the `DD_DOCKER_LABELS_AS_TAGS` variable within a Docker Swarm `docker-compose.yaml` file, remove the apostrophes, for example:

```shell
DD_DOCKER_LABELS_AS_TAGS={"com.docker.compose.service":"service_name"}
```

When adding labels to Docker containers, the placement of the `labels:` keyword inside the `docker-compose.yaml` file is very important. To avoid issues, follow the [Docker unified service tagging] documentation.

 If the container needs to be labeled outside of this configuration, place the `labels:` keyword **inside** the `services:` section **not** inside the `deploy:` section. Place the `labels:` keyword inside the `deploy:` section only when the service needs to be labeled. The Datadog Agent does not have any labels to extract from the containers without this placement.

Below is a sample, working `docker-compose.yaml` file that shows this. In the example below, the labels in the `myapplication:` section, `my.custom.label.project` and `my.custom.label.version` each have unique values. Using the `DD_DOCKER_LABELS_AS_TAGS` environment variable in the `datadog:` section extracts the labels and produces these tags for the `myapplication` container:

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
      - DD_DOCKER_LABELS_AS_TAGS={"my.custom.label.project":"projecttag","my.custom.label.version":"versiontag"}
      - DD_TAGS="key1:value1 key2:value2 key3:value3"
    image: 'datadog/agent:latest'
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

There are two environment variables that set tag cardinality: `DD_CHECKS_TAG_CARDINALITY` and `DD_DOGSTATSD_TAG_CARDINALITY`—as DogStatsD is priced differently, its tag cardinality setting is separated in order to provide the opportunity for finer configuration. Otherwise, these variables function the same way: they can have values `low`, `orchestrator`, or `high`. They both default to `low`, which pulls in host-level tags.

Setting the variable to `orchestrator` adds the following tags: `pod_name` (Kubernetes), `oshift_deployment` (OpenShift), `task_arn` (ECS and Fargate), `mesos_task` (Mesos).

Setting the variable to `high` additionally adds the following tags: `container_name` (Docker), `container_id` (Docker), `display_container_name` (Kubelet).

## Traces

**Note**: As a best practice for containerized environments, **Datadog recommends using [unified service tagging for traces][9].**

When submitting a single trace, tag its spans to override Agent configuration tags and/or the host tags value (if any) for those traces:

The following examples use the default [primary tag][13] `env:<ENVIRONMENT>` but you can use any `<KEY>:<VALUE>` tag instead.

{{< tabs >}}
{{% tab "Go" %}}

```go
tracer.SetTag("env", "<ENVIRONMENT>")
```

For OpenTracing use the `tracer.WithGlobalTag` start option to set the environment globally.

{{% /tab %}}
{{% tab "Java" %}}
Via sysprop:

```text
-Ddd.trace.span.tags=env:<ENVIRONMENT>
```

Via environment variables:

```text
DD_TRACE_SPAN_TAGS="env:<ENVIRONMENT>"
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
Datadog.tracer.set_tags('env' => '<ENVIRONMENT>')
```

{{% /tab %}}
{{% tab "Python" %}}

```python
from ddtrace import tracer
tracer.set_tags({'env': '<ENVIRONMENT>'})
```

{{% /tab %}}
{{% tab ".NET" %}}

```csharp
using Datadog.Trace;
Tracer.Instance.ActiveScope?.Span.SetTag("env", "<ENVIRONMENT>");
```

{{% /tab %}}
{{< /tabs >}}

**Note**: Span metadata must respect a typed tree structure. Each node of the tree is split by a `.` and a node can be of a single type: it can't be both an object (with sub-nodes) and a string for instance.

So this example of span tags is invalid:

```json
{
  "key": "value",
  "key.subkey": "value_2"
}
```

## UI

{{< tabs >}}
{{% tab "Host Map" %}}

Assign host tags in the UI via the [Host Map page][1]. Click on any hexagon (host) to show the host overlay on the bottom of the page. Then, under the *User* section, click the **Edit Tags** button. Enter the tags as a comma separated list, then click **Save Tags**. **Note**: Changes to metric tags made via the UI may take up to 30 minutes to apply.

{{< img src="tagging/assigning_tags/hostmapuitags.png" alt="Host Map Tags"  style="width:80%;">}}

[1]: /infrastructure/hostmap/
{{% /tab %}}
{{% tab "Infrastructure List" %}}

Assign host tags in the UI via the [Infrastructure List page][1]. Click on any host to show the host overlay on the right of the page. Then, under the *User* section, click the **Edit Tags** button. Enter the tags as a comma separated list, then click **Save Tags**. **Note**: Changes to metric tags made via the UI may take up to 30 minutes to apply.

{{< img src="tagging/assigning_tags/hostuitags.png" alt="Infrastructure List Tags"  style="width:80%;">}}

[1]: /infrastructure/
{{% /tab %}}
{{% tab "Monitors" %}}

From the [Manage Monitors][1] page, select the checkbox next to each monitor to add tags (select one or multiple monitors). Click the **Edit Tags** button. Enter a tag or select one used previously. Then click **Add Tag `tag:name`** or **Apply Changes**. If tags were added previously, multiple tags can be assigned at once using the tag checkboxes.

{{< img src="tagging/assigning_tags/monitortags.png" alt="Manage Monitors Tags"  style="width:80%;">}}

When creating a monitor, assign monitor tags under step 4 *Say what's happening*:

{{< img src="tagging/assigning_tags/monitorindivdualtags.png" alt="Create Monitor Tags"  style="width:80%;">}}

[1]: /monitors/manage_monitor/
{{% /tab %}}
{{% tab "Distribution Metrics" %}}

Create percentile aggregations within [Distribution Metrics][1] by applying a whitelist of up to ten tags to a metric -  this creates a timeseries for every potentially queryable combination of tag values. For more information on counting custom metrics and timeseries emitted from distribution metrics, see [Custom Metrics][2].

**Apply up to ten tags. Exclusionary tags will not be accepted**:

{{< img src="tagging/assigning_tags/global_metrics_selection.png" alt="Create Monitor Tags"  style="width:80%;">}}

[1]: /metrics/distributions/
[2]: /developers/metrics/custom_metrics/
{{% /tab %}}
{{% tab "Integrations" %}}

The [AWS][1] integration tile allows you to assign additional tags to all metrics at the account level. Use a comma separated list of tags in the form `<KEY>:<VALUE>`.

{{< img src="tagging/assigning_tags/integrationtags.png" alt="AWS Tags"  style="width:80%;">}}

[1]: /integrations/amazon_web_services/
{{% /tab %}}
{{< /tabs >}}

## API

{{< tabs >}}
{{% tab "Assignment" %}}

Tags can be assigned in various ways with the [Datadog API][1]. See the list below for links to those sections:

* [Post a check run][2]
* [Post an event][3]
* [AWS Integration][4]
* [Post timeseries point][5]
* [Create][6] or [Edit][7] a monitor
* [Add][8] or [Update][9] host tags
* [Send traces][10]

As a best practice, **Datadog recommends using [unified service tagging for containerized environments][11].**

[1]: /api/
[2]: /api/v1/service-checks/#submit-a-service-check
[3]: /api/v1/events/#post-an-event
[4]: /api/v1/aws-integration/
[5]: /api/v1/metrics/#submit-metrics
[6]: /api/v1/monitors/#create-a-monitor
[7]: /api/v1/monitors/#edit-a-monitor
[8]: /api/v1/tags/#add-tags-to-a-host
[9]: /api/v1/tags/#update-host-tags
[10]: /api/v1/tracing/
[11]: /tagging/unified_service_tagging
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

## DogStatsD

Add tags to any metric, event, or service check you send to [DogStatsD][4]. For example, compare the performance of two algorithms by tagging a timer metric with the algorithm version:

```python

@statsd.timed('algorithm.run_time', tags=['algorithm:one'])
def algorithm_one():
    # Do fancy things here ...

@statsd.timed('algorithm.run_time', tags=['algorithm:two'])
def algorithm_two():
    # Do fancy things (maybe faster?) here ...
```

**Note**: Tagging is a [Datadog-specific extension][14] to StatsD.

Special consideration is necessary when assigning the `host` tag to DogStatsD metrics. For more information on the host tag key, see the [DogStatsD section][15].

## Integration inheritance

The most efficient method for assigning tags is to rely on integration inheritance. Tags you assign to your AWS instances, Chef recipes, and other integrations are automatically inherited by hosts and metrics you send to Datadog.

**As a best practice, it's recommended to set tags in your integration platform based on the guidelines for [unified service tagging for containerized environments][9].**

### Cloud integrations

Cloud integrations are authentication based. Datadog recommends using the main cloud integration tile (AWS, Azure, Google Cloud, etc.) and [installing the Agent][16] where possible. **Note**: If you choose to use the Agent only, some integration tags are not available.

#### Amazon Web Services

The following tags are collected from AWS integrations. **Note**: Some tags only display on specific metrics.

| Integration            | Datadog Tag Keys                                                                                                                                                                                              |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| All                    | `region`                                                                                                                                                                                                      |
| [API Gateway][17]      | `apiid`, `apiname`, `method`, `resource`, `stage`                                                                                                                                                             |
| [Auto Scaling][18]     | `autoscalinggroupname`, `autoscaling_group`                                                                                                                                                                   |
| [Billing][19]          | `account_id`, `budget_name`, `budget_type`, `currency`, `servicename`, `time_unit`                                                                                                                            |
| [CloudFront][20]       | `distributionid`                                                                                                                                                                                              |
| CodeBuild              | `project_name`                                                                                                                                                                                                |
| [CodeDeploy][21]       | `application`, `creator`, `deployment_config`, `deployment_group`, `deployment_option`, `deployment_type`, `status`                                                                                           |
| [DirectConnect][22]    | `connectionid`                                                                                                                                                                                                |
| [DynamoDB][23]         | `globalsecondaryindexname`, `operation`, `streamlabel`, `tablename`                                                                                                                                           |
| [EBS][24]              | `volumeid`, `volume-name`, `volume-type`                                                                                                                                                                      |
| [EC2][25]              | `autoscaling_group`, `availability-zone`, `image`, `instance-id`, `instance-type`, `kernel`, `name`, `security_group_name`                                                                                    |
| [ECS][26]              | `clustername`, `servicename`, `instance_id`                                                                                                                                                                   |
| [EFS][27]              | `filesystemid`                                                                                                                                                                                                |
| [ElastiCache][28]      | `cachenodeid`, `cache_node_type`, `cacheclusterid`, `cluster_name`, `engine`, `engine_version`, `prefered_availability-zone`, `replication_group`                                                             |
| [ElasticBeanstalk][29] | `environmentname`, `enviromentid`                                                                                                                                                                             |
| [ELB][30]              | `availability-zone`, `hostname`, `loadbalancername`, `name`, `targetgroup`                                                                                                                                    |
| [EMR][31]              | `cluster_name`, `jobflowid`                                                                                                                                                                                   |
| [ES][32]               | `dedicated_master_enabled`, `ebs_enabled`, `elasticsearch_version`, `instance_type`, `zone_awareness_enabled`                                                                                                 |
| [Firehose][33]         | `deliverystreamname`                                                                                                                                                                                          |
| [Health][34]           | `event_category`, `status`, `service`                                                                                                                                                                         |
| [IoT][35]              | `actiontype`, `protocol`, `rulename`                                                                                                                                                                          |
| [Kinesis][36]          | `streamname`, `name`, `state`                                                                                                                                                                                 |
| [KMS][37]              | `keyid`                                                                                                                                                                                                       |
| [Lambda][38]           | `functionname`, `resource`, `executedversion`, `memorysize`, `runtime`                                                                                                                                        |
| [Machine Learning][39] | `mlmodelid`, `requestmode`                                                                                                                                                                                    |
| [MQ][40]               | `broker`, `queue`, `topic`                                                                                                                                                                                    |
| [OpsWorks][41]         | `stackid`, `layerid`, `instanceid`                                                                                                                                                                            |
| [Polly][42]            | `operation`                                                                                                                                                                                                   |
| [RDS][43]              | `auto_minor_version_upgrade`, `dbinstanceclass`, `dbclusteridentifier`, `dbinstanceidentifier`, `dbname`, `engine`, `engineversion`, `hostname`, `name`, `publicly_accessible`, `secondary_availability-zone` |
| [Redshift][44]         | `clusteridentifier`, `latency`, `nodeid`, `service_class`, `stage`, `wlmid`                                                                                                                                   |
| [Route 53][45]         | `healthcheckid`                                                                                                                                                                                               |
| [S3][46]               | `bucketname`, `filterid`, `storagetype`                                                                                                                                                                       |
| [SES][47]              | Tag keys are custom set in AWS.                                                                                                                                                                               |
| [SNS][48]              | `topicname`                                                                                                                                                                                                   |
| [SQS][49]              | `queuename`                                                                                                                                                                                                   |
| [VPC][50]              | `nategatewayid`, `vpnid`, `tunnelipaddress`                                                                                                                                                                   |
| [WorkSpaces][51]       | `directoryid`, `workspaceid`                                                                                                                                                                                  |

#### Azure

Azure integration metrics, events, and service checks receive the following tags:

| Integration                                           | Namespace                                   | Datadog Tag Keys                                                                                                                                                                                                 |
|-------------------------------------------------------|---------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| All Azure integrations                                | All                                         | `cloud_provider`, `region`, `kind`, `type`, `name`, `resource_group`, `tenant_name`, `subscription_name`, `subscription_id`, `status` (if applicable)                                                            |
| Azure VM integrations                                 | `azure.vm.*`                                | `host`, `size`, `operating_system`, `availability_zone`                                                                                                                                                          |
| Azure App Service Plans<sup>(1)</sup>                 | `azure.web_serverfarms.*`                   | `per_site_scaling`, `plan_size`, `plan_tier`, `operating_system`                                                                                                                                                 |
| Azure App Services Web Apps & Functions<sup>(1)</sup> | `azure.app_services.*`, `azure.functions.*` | `operating_system`, `server_farm_id`, `reserved`, `usage_state`, `fx_version` (linux web apps only), `php_version`, `dot_net_framework_version`, `java_version`, `node_version`, `python_version`                |
| Azure&nbsp;SQL&nbsp;DB<sup>(1)</sup>                  | `azure.sql_servers_databases.*`             | `license_type`, `max_size_mb`, `server_name`, `role`, `zone_redundant`. <br>For replication Links only:  `state` `primary_server_name` `primary_server_region` `secondary_server_name` `secondary_server_region` |
| Azure Load Balancer<sup>(1)</sup>                     | `azure.network_loadbalancers.*`             | `sku_name`                                                                                                                                                                                                       |
| Azure Usage and Quota<sup>(1)</sup>                   | `azure.usage.*`                             | `usage_category`, `usage_name`                                                                                                                                                                                   |

<sup>(1)</sup>*Resource-specific tags are in beta.*

#### Google Cloud Platform

See the [Google Cloud Platform integration][52] documentation.

### Web integrations

Web integrations are authentication based. Metrics are collected with API calls. **Note**: `CamelCase` tags are converted to underscores by Datadog, for example `TestTag` --> `test_tag`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tagging/#defining-tags
[2]: /agent/docker/#environment-variables
[3]: /api/
[4]: /developers/metrics/dogstatsd_metrics_submission/
[5]: /agent/faq/how-datadog-agent-determines-the-hostname/
[6]: /dashboards/querying/#arithmetic-between-two-metrics
[7]: /integrations/
[8]: /agent/guide/agent-configuration-files/
[9]: /tagging/unified_service_tagging
[10]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/docker_extract.go
[11]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/kubelet_extract.go
[12]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/ecs_extract.go
[13]: /tracing/guide/setting_primary_tags_to_scope/
[14]: /libraries/
[15]: /developers/metrics/dogstatsd_metrics_submission/#host-tag-key
[16]: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[17]: /integrations/amazon_api_gateway/
[18]: /integrations/amazon_auto_scaling/
[19]: /integrations/amazon_billing/
[20]: /integrations/amazon_cloudfront/
[21]: /integrations/amazon_codedeploy/
[22]: /integrations/amazon_directconnect/
[23]: /integrations/amazon_dynamodb/
[24]: /integrations/amazon_ebs/
[25]: /integrations/amazon_ec2/
[26]: /integrations/amazon_ecs/
[27]: /integrations/amazon_efs/
[28]: /integrations/amazon_elasticache/
[29]: /integrations/amazon_elasticbeanstalk/
[30]: /integrations/amazon_elb/
[31]: /integrations/amazon_emr/
[32]: /integrations/amazon_es/
[33]: /integrations/amazon_firehose/
[34]: /integrations/amazon_health/
[35]: /integrations/amazon_iot/
[36]: /integrations/amazon_kinesis/
[37]: /integrations/amazon_kms/
[38]: /integrations/amazon_lambda/
[39]: /integrations/amazon_machine_learning/
[40]: /integrations/amazon_mq/
[41]: /integrations/amazon_ops_works/
[42]: /integrations/amazon_polly/
[43]: /integrations/amazon_rds/
[44]: /integrations/amazon_redshift/
[45]: /integrations/amazon_route53/
[46]: /integrations/amazon_s3/
[47]: /integrations/amazon_ses/
[48]: /integrations/amazon_sns/
[49]: /integrations/amazon_sqs/
[50]: /integrations/amazon_vpc/
[51]: /integrations/amazon_workspaces/
[52]: /integrations/google_cloud_platform/#tags-assigned
