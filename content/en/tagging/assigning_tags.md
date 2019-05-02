---
title: Assigning tags
kind: documentation
aliases:
    - /agent/tagging
    - /getting_started/tagging/assigning_tags
further_reading:
- link: "tagging"
  tag: "Documentation"
  text: "Getting started with tags"
- link: "tagging/using_tags"
  tag: "Documentation"
  text: "Learn how to use tags in Datadog"
---

## Overview

Tagging is used throughout Datadog to query the machines and metrics you monitor. Without the ability to assign and filter based on tags, finding problems in your environment and narrowing them down enough to discover the true causes could be difficult. Learn how to [define tags][1] in Datadog before going further.

There are several places tags can be assigned: [configuration files](#configuration-files), [environment variables][2], your [traces](#traces), the Datadog [UI](#ui), [API][3], [DogStatsD][4], and inheriting from the [integrations][5]. It is recommended that you use configuration files and integration inheritance for most of your tagging needs.

## Configuration Files

The hostname (tag key `host`) is [assigned automatically][6] by the Datadog Agent. To customize the hostname, use the Agent configuration file, `datadog.yaml`:

```yaml
# Set the hostname (default: auto-detected)
# Must comply with RFC-1123, which permits only:
# "A" to "Z", "a" to "z", "0" to "9", and the hyphen (-)
hostname: mymachine.mydomain
```

**When changing the hostname**:

* The old hostname remains in the UI for 24 hours but does not show new metrics.
* Any data from hosts with the old hostname can be queried with the API.
* To graph metrics with the old and new hostname in one graph, use [Arithmetic between two metrics][7].

The Agent configuration file (`datadog.yaml`) is also used to set host tags which apply to all metrics, traces, and logs forwarded by the Datadog Agent (see YAML formats below).

Tags for the [integrations][5] installed with the Agent are configured via YAML files located in the **conf.d** directory of the Agent install. To locate the configuration files, refer to the [Agent configuration files FAQ][8].

**YAML formats**

In YAML files, use a tag dictionary with a list of tags you want assigned at that level. Tag dictionaries have two different yet functionally equivalent forms:

```
tags: <KEY_1>:<VALUE_1>, <KEY_2>:<VALUE_2>, <KEY_3>:<VALUE_3>
```

or

```
tags:
    - <KEY_1>:<VALUE_1>
    - <KEY_2>:<VALUE_2>
    - <KEY_3>:<VALUE_3>
```

It is recommended you assign tags as `<KEY>:<VALUE>` pairs, but simple tags are also accepted. See [defining tags][1] for more details.

## Environment Variables

When installing the containerized Datadog Agent, set your host tags using the environment variable `DD_TAGS`. We automatically collect common tags from [Docker][9], [Kubernetes][10], [ECS][11], [Swarm, Mesos, Nomad, and Rancher][9]. To extract even more tags, use the following options:

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
When using the `DD_DOCKER_LABELS_AS_TAGS` variable within a Docker Swarm `docker-compose.yaml` file, remove the apostrophes, for example:

```shell
DD_DOCKER_LABELS_AS_TAGS={"com.docker.compose.service":"service_name"}
```
When adding labels to Docker containers, the placement of the `labels:` keyword inside the `docker-compose.yaml` file is very important. If the container needs to be labeled then place the `labels:` keyword **inside** the `services:` section **not** inside the `deploy:` section. Place the `labels:` keyword inside the `deploy:` section only when the service needs to be labeled. The Datadog Agent will not have any labels to extract from the containers without this placement. Below is a sample, working `docker-compose.yaml` file that shows this. In the example below, the labels in the `myapplication:` section, `my.custom.label.project` and `my.custom.label.version` each have unique values. Using the `DD_DOCKER_LABELS_AS_TAGS` environment variable in the `datadog:` section will extract the labels and produce these two tags for the `myapplication` container:

Inside the `myapplication` container the labels are: `my.custom.label.project` and `my.custom.label.version`

After the Agent extracts the labels from the container the tags will be:
`projecttag:projectA`
`versiontag:1`

**Sample docker-compose.yaml:**
```shell
services:
  datadog:
    volumes:
      - '/var/run/docker.sock:/var/run/docker.sock:ro'
      - '/proc:/host/proc:ro'
      - '/sys/fs/cgroup/:/host/sys/fs/cgroup:ro'
    environment:
      - DD_API_KEY=abcdefghijklmnop
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

The environment variables that set tag cardinality (`DD_CHECKS_TAG_CARDINALITY` and `DD_DOGSTATSD_TAG_CARDINALITY`) can have values `low`, `orchestrator`, or `high`. They both default to `low`.

Setting the variable to `orchestrator` adds the following tags: `pod_name` (Kubernetes), `oshift_deployment` (OpenShift), `task_arn` (ECS and Fargate), `mesos_task` (Mesos).

Setting the variable to `high` additionally adds the following tags: `container_name` (Docker), `container_id` (Docker), `display_container_name` (Kubelet).

## Traces

When submitting a single trace, tag its spans to override Agent configuration tags and/or the host tags value (if any) for those traces:

The following examples use the default [primary tag][12] `env:<ENVIRONMENT>` but you can use any `<KEY>:<VALUE>` tag instead.

{{< tabs >}}
{{% tab "Go" %}}

```go
tracer.SetTag("env", "<ENVIRONMENT>")
```

For OpenTracing use the `tracer.WithGlobalTag` start option to set the environment globally.

{{% /tab %}}
{{% tab "Java" %}}
Via sysprop:

```
-Ddd.trace.span.tags=env:<ENVIRONMENT>
```

Via environment variables:

```
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
using Datadog.Tracing;
Tracer.Instance.ActiveScope.Span.SetTag("env", "<ENVIRONMENT>");
```

{{% /tab %}}
{{< /tabs >}}

**Note**: Span metadata must respect a typed tree structure. Each node of the tree is split by a `.` and a node can be of a single type: it can't be both an object (with sub-nodes) and a string for instance.

So this example of span metadata is invalid:

```json
{
  "key": "value",
  "key.subkey": "value_2"
}
```

## UI

{{< tabs >}}
{{% tab "Host Map" %}}

Assign host tags in the UI via the [Host Map page][1]. Click on any hexagon (host) to show the host overlay on the bottom of the page. Then, under the *User* section, click the **Edit Tags** button. Enter the tags as a comma separated list, then click **Save Tags**. Note: Changes to metric tags made via the UI may take up to 30 minutes to apply.

{{< img src="tagging/assigning_tags/hostmapuitags.png" alt="Host Map Tags" responsive="true" style="width:80%;">}}


[1]: /graphing/infrastructure/hostmap
{{% /tab %}}
{{% tab "Infrastructure List" %}}

Assign host tags in the UI via the [Infrastructure List page][1]. Click on any host to show the host overlay on the right of the page. Then, under the *User* section, click the **Edit Tags** button. Enter the tags as a comma separated list, then click **Save Tags**. Note: Changes to metric tags made via the UI may take up to 30 minutes to apply.

{{< img src="tagging/assigning_tags/hostuitags.png" alt="Infrastructure List Tags" responsive="true" style="width:80%;">}}


[1]: /graphing/infrastructure
{{% /tab %}}
{{% tab "Monitors" %}}

From the [Manage Monitors][1] page, select the checkbox next to each monitor to add tags (select one or multiple monitors). Click the **Edit Tags** button. Enter a tag or select one used previously. Then click **Add Tag `tag:name`** or **Apply Changes**. If tags were added previously, multiple tags can be assigned at once using the tag checkboxes.

{{< img src="tagging/assigning_tags/monitortags.png" alt="Manage Monitors Tags" responsive="true" style="width:80%;">}}

When creating a monitor, assign monitor tags under step 4 *Say what's happening*:

{{< img src="tagging/assigning_tags/monitorindivdualtags.png" alt="Create Monitor Tags" responsive="true" style="width:80%;">}}


[1]: /monitors/manage_monitor
{{% /tab %}}
{{% tab "Distribution Metrics" %}}

Assign tag keys within [Distribution Metrics][1] (Beta) to create aggregate timeseries by applying sets of tags to a metric, for which a timeseries is created for every combination of tag values within the set.

**Sets of tags are limited to groups of four**:

{{< img src="tagging/assigning_tags/distributionmetricstags.png" alt="Distribution Metrics Tags" responsive="true" style="width:80%;">}}


[1]: /graphing/metrics/distributions
{{% /tab %}}
{{% tab "Integrations" %}}

The [AWS][1] integration tile allows you to assign additional tags to all metrics at the account level. Use a comma separated list of tags in the form `<KEY>:<VALUE>`.

{{< img src="tagging/assigning_tags/integrationtags.png" alt="AWS Tags" responsive="true" style="width:80%;">}}


[1]: /integrations/amazon_web_services
{{% /tab %}}
{{< /tabs >}}

## API

{{< tabs >}}
{{% tab "Assignment" %}}

Tags can be assigned in various ways with the [Datadog API][1]. See the list below for links to those sections:

- [Post a check run][2]
- [Post an event][3]
- [AWS Integration][4]
- [Post timeseries point][5]
- [Create][6] or [Edit][7] a monitor
- [Add][8] or [Update][9] host tags
- [Send traces][10]


[1]: /api
[2]: /api/?lang=python#post-a-check-run
[3]: /api/?lang=python#post-an-event
[4]: /api/?lang=python#aws
[5]: /api/?lang=python#post-timeseries-points
[6]: /api/?lang=python#create-a-monitor
[7]: /api/?lang=python#edit-a-monitor
[8]: /api/?lang=python#add-tags-to-a-host
[9]: /api/?lang=python#update-host-tags
[10]: /api/?lang=python#send-traces
{{% /tab %}}
{{% tab "Example" %}}

Tagging within Datadog is a powerful way to gather your metrics. For a quick example, perhaps you're looking for a sum of the following metrics coming from your website (example.com):

```
Web server 1: api.metric('page.views', [(1317652676, 100), ...], host="example_prod_1")
Web server 2: api.metric('page.views', [(1317652676, 500), ...], host="example_prod_2")
```

Datadog recommends adding the tag `domain:example.com` and leaving off the hostname (the Datadog API will determine the hostname automatically):

```
Web server 1: api.metric('page.views', [(1317652676, 100), ...], tags=['domain:example.com'])
Web server 2: api.metric('page.views', [(1317652676, 500), ...], tags=['domain:example.com'])
```

With the `domain:example.com` tag, the page views can be summed across hosts:

```
sum:page.views{domain:example.com}
```

To get a breakdown by host, use:

```
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

Note that tagging is a [Datadog-specific extension][13] to StatsD.

Special consideration is necessary when assigning the `host` tag to DogStatsD metrics. For more information on the host tag key, see the [DogStatsD section][14].

## Integration Inheritance

The most efficient method for assigning tags is to rely on your integrations. Tags assigned to your Amazon Web Services instances, Chef recipes, and more are all automatically assigned to the hosts and metrics when they are brought into Datadog. **Note**: `CamelCase` tags are converted to underscores by Datadog, for example `TestTag` --> `test_tag`.

The following [integration][5] sources create tags automatically in Datadog:

| Integration                             | Source                                                                                                                                                                                                                                                                                                                                        |
|-----------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Amazon CloudFront][15]                  | Distribution                                                                                                                                                                                                                                                                                                                                  |
| [Amazon EC2][16]                         | AMI, Customer Gateway, DHCP Option, EBS Volume, Instance, Internet Gateway, Network ACL, Network Interface, Reserved Instance, Reserved Instance Listing, Route Table , Security Group - EC2 Classic, Security Group - VPC, Snapshot, Spot Batch, Spot Instance Request, Spot Instances, Subnet, Virtual Private Gateway, VPC, VPN Connection |
| [Amazon Elastic File System][17]         | Filesystem                                                                                                                                                                                                                                                                                                                                    |
| [Amazon Kinesis][18]                     | Stream State                                                                                                                                                                                                                                                                                                                                  |
| [Amazon Machine Learning][19]            | BatchPrediction, DataSource, Evaluation, MLModel                                                                                                                                                                                                                                                                                              |
| [Amazon Route 53][20]                    | Domains, Healthchecks, HostedZone                                                                                                                                                                                                                                                                                                             |
| [Amazon WorkSpaces][21]                  | WorkSpaces                                                                                                                                                                                                                                                                                                                                    |
| [AWS CloudTrail][22]                     | CloudTrail                                                                                                                                                                                                                                                                                                                                    |
| [AWS Elastic Load Balancing][23]        | Loadbalancer, TargetGroups                                                                                                                                                                                                                                                                                                                    |
| [AWS Identity and Access Management][21] | Profile Name                                                                                                                                                                                                                                                                                                                                  |
| [AWS SQS][24]                           | Queue Name                                                                                                                                                                                                                                                                                                                                    |
| [Apache][25]                            | Apache Host and Port                                                                                                                                                                                                                                                                                                                          |
| [Azure][26]                             | Tenant Name, Status, Tags, Subscription ID and Name, Availability Zone in common with AWS tag after contacting Datadog support                                                                                                                                                                                                                |
| [BTRFS][27]                             | Usage and Replication Type                                                                                                                                                                                                                                                                                                                    |
| [Chef][28]                              | Chef Roles                                                                                                                                                                                                                                                                                                                                    |
| [Consul][29]                            | Previous and Current Consul Leaders and Followers, Consul Datacenter, Service  Name, Service ID                                                                                                                                                                                                                                               |
| [CouchDB][30]                           | Database Name,  Instance Name                                                                                                                                                                                                                                                                                                                 |
| [CouchBase][31]                         | CouchBase Tags,  Instance Name                                                                                                                                                                                                                                                                                                                |
| [Docker][32]                            | [Docker][33], [Kubernetes][34], [ECS][35], [Swarm, Mesos, Nomad and Rancher][33], collect more tag with [the Docker Agent tags collection options][36]                                                                                                                                                                                        |
| [Dyn][37]                               | Zone, Record Type                                                                                                                                                                                                                                                                                                                             |
| [Elasticsearch][38]                     | Cluster Name, Host Name, Port Number                                                                                                                                                                                                                                                                                                          |
| [Etcd][39]                              | State Leader or Follower                                                                                                                                                                                                                                                                                                                      |
| [Fluentd][40]                           | Host Name, Port Number                                                                                                                                                                                                                                                                                                                        |
| [Google App Engine][41]                 | Project Name, Version ID, Task Queue                                                                                                                                                                                                                                                                                                          |
| [Google Cloud Platform][42]             | Zone, Instance Type and ID, Automatic Restart, Project Name and ID, Name, Availability Zone in common with AWS tag after contacting Datadog support                                                                                                                                                                                           |
| [Go Expvar][43]                         | Expvar Path                                                                                                                                                                                                                                                                                                                                   |
| [Gunicorn][44]                          | State Idle or Working, App Name                                                                                                                                                                                                                                                                                                               |
| [HAProxy][45]                           | Service Name, Availability, Backend Host, Status, Type                                                                                                                                                                                                                                                                                        |
| [HTTP Check][46]                        | URL, Instance                                                                                                                                                                                                                                                                                                                                 |
| [IIS][47]                               | Site                                                                                                                                                                                                                                                                                                                                          |
| [Jenkins][48]                           | Job Name, Build Number, Branch, and Results                                                                                                                                                                                                                                                                                                   |
| [JMX][49]                               | JMX Tags                                                                                                                                                                                                                                                                                                                                      |
| [Kafka][50]                             | Topic                                                                                                                                                                                                                                                                                                                                         |
| [Kubernetes][51]                        | Minion Name, Namespace, Replication Controller, Labels, Container Alias                                                                                                                                                                                                                                                                       |
| [Marathon][52]                          | URL                                                                                                                                                                                                                                                                                                                                           |
| [Memcached][53]                         | Host, Port, Request, Cache Hit or Miss                                                                                                                                                                                                                                                                                                        |
| [Mesos][54]                             | Role, URL, PID, Slave or Master Role, Node, Cluster,                                                                                                                                                                                                                                                                                          |
| [Mongo][55]                             | Server Name                                                                                                                                                                                                                                                                                                                                   |
| [OpenStack][56]                         | Network ID, Network Name, Hypervisor Name, ID, and Type, Tenant ID, Availability Zone                                                                                                                                                                                                                                                         |
| [PHP FPM][57]                           | Pool Name                                                                                                                                                                                                                                                                                                                                     |
| [Pivotal][58]                           | Current State, Owner, Labels, Requester, Story Type                                                                                                                                                                                                                                                                                           |
| [Postfix ][59]                          | Queue, Instance                                                                                                                                                                                                                                                                                                                               |
| [Puppet][60]                            | Puppet Tags                                                                                                                                                                                                                                                                                                                                   |
| [RabbitMQ][61]                          | Node, Queue Name, Vhost, Policy, Host                                                                                                                                                                                                                                                                                                         |
| [Redis][62]                             | Host, Port, Slave or Master                                                                                                                                                                                                                                                                                                                   |
| [RiakCS][63]                            | Aggregation Key                                                                                                                                                                                                                                                                                                                               |
| [SNMP][64]                              | Device IP Address                                                                                                                                                                                                                                                                                                                             |
| [Supervisord][65]                       | Server Name, Process Name                                                                                                                                                                                                                                                                                                                     |
| [TeamCity][66]                          | Tags, Code Deployments, Build Number                                                                                                                                                                                                                                                                                                          |
| [TokuMX][67]                            | Role Primary or Secondary, Replset, Replstate, Db, Coll, Shard                                                                                                                                                                                                                                                                                |
| [Varnish][68]                           | Name, Backend                                                                                                                                                                                                                                                                                                                                 |
| [VSphere][69]                           | Host, Datacenter, Server, Instance                                                                                                                                                                                                                                                                                                            |
| [Win32 Events][70]                      | Event ID                                                                                                                                                                                                                                                                                                                                      |
| [Windows Services][71]                  | Service Name                                                                                                                                                                                                                                                                                                                                  |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tagging/#defining-tags
[2]: /agent/docker/#environment-variables
[3]: /api
[4]: /developers/dogstatsd
[5]: /integrations
[6]: /agent/faq/how-datadog-agent-determines-the-hostname
[7]: /graphing/#arithmetic-between-two-metrics
[8]: /agent/guide/agent-configuration-files
[9]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/docker_extract.go
[10]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/kubelet_extract.go
[11]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/ecs_extract.go
[12]: /tracing/advanced/setting_primary_tags_to_scope
[13]: /libraries
[14]: /developers/dogstatsd/data_types/#host-tag-key
[15]: /integrations/amazon_cloudfront
[16]: /integrations/amazon_ec2
[17]: /integrations/amazon_efs
[18]: /integrations/amazon_kinesis
[19]: /integrations/amazon_machine_learning
[20]: /integrations/amazon_route53
[21]: /integrations/amazon_workspaces
[22]: /integrations/amazon_cloudtrail
[23]: /integrations/amazon_elb
[24]: /integrations/amazon_sqs
[25]: /integrations/apache
[26]: /integrations/azure
[27]: /integrations/btrfs
[28]: /integrations/chef
[29]: /integrations/consul
[30]: /integrations/couchdb
[31]: /integrations/couchbase
[32]: /integrations/docker
[33]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/docker_extract.go
[34]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/kubelet_extract.go
[35]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/ecs_extract.go
[36]: /agent/docker/#tagging
[37]: /integrations/dyn
[38]: /integrations/elastic
[39]: /integrations/etcd
[40]: /integrations/fluentd
[41]: /integrations/google_app_engine
[42]: /integrations/google_cloud_platform
[43]: /integrations/goexpvar
[44]: /integrations/gunicorn
[45]: /integrations/haproxy
[46]: /integrations/httpcheck
[47]: /integrations/iis
[48]: /integrations/jenkins
[49]: /integrations/java
[50]: /integrations/kafka
[51]: /integrations/kubernetes
[52]: /integrations/marathon
[53]: /integrations/memcached
[54]: /integrations/mesos
[55]: /integrations/mongodb
[56]: /integrations/openstack
[57]: /integrations/php_fpm
[58]: /integrations/pivotal
[59]: /integrations/postfix
[60]: /integrations/puppet
[61]: /integrations/rabbitmq
[62]: /integrations/redisdb
[63]: /integrations/riakcs
[64]: /integrations/snmp
[65]: /integrations/supervisor
[66]: /integrations/teamcity
[67]: /integrations/tokumx
[68]: /integrations/varnish
[69]: /integrations/vmware
[70]: /integrations/wmi
[71]: /integrations/winservices
