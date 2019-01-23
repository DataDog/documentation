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
# Force the hostname to whatever you want. (default: auto-detected)
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

When installing the containerized Datadog Agent, host tags set your using the environment variable `DD_TAGS`. We automatically collect common tags from [Docker][9], [Kubernetes][10], [ECS][11], [Swarm, Mesos, Nomad, and Rancher][9]. To extract even more tags, use the following options:

| Environment Variable               | Description                                    |
|------------------------------------|------------------------------------------------|
| `DD_DOCKER_LABELS_AS_TAGS`         | Extract docker container labels                |
| `DD_DOCKER_ENV_AS_TAGS`            | Extract docker container environment variables |
| `DD_KUBERNETES_POD_LABELS_AS_TAGS` | Extract pod labels                             |

**Examples:**

```shell
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"app":"kube_app","release":"helm_release"}'
DD_DOCKER_LABELS_AS_TAGS='{"com.docker.compose.service":"service_name"}'
```

Either define the variables in your custom `datadog.yaml`, or set them as JSON maps in these environment variables. The map key is the source (`label/envvar`) name, and the map value is the Datadog tag name.

## Traces

When submitting a single trace, tag its spans to override Agent configuration tags and/or the host tags value (if any) for those traces:

The following examples use the default primary tag `env:<ENVIRONMENT>` but you can use any `<KEY>:<VALUE>` tag instead.

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

Note that tagging is a [Datadog-specific extension][12] to StatsD.

Special consideration is necessary when assigning the `host` tag to DogStatsD metrics. For more information on the host tag key, see the [DogStatsD section][13].

## Integration Inheritance

The most efficient method for assigning tags is to rely on your integrations. Tags assigned to your Amazon Web Services instances, Chef recipes, and more are all automatically assigned to the hosts and metrics when they are brought into Datadog. **Note**: `CamelCase` tags are converted to underscores by Datadog, for example `TestTag` --> `test_tag`.

The following [integration][5] sources create tags automatically in Datadog:

| Integration                             | Source                                                                                                                                                                                                                                                                                                                                        |
|-----------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Amazon CloudFront][14]                  | Distribution                                                                                                                                                                                                                                                                                                                                  |
| [Amazon EC2][15]                         | AMI, Customer Gateway, DHCP Option, EBS Volume, Instance, Internet Gateway, Network ACL, Network Interface, Reserved Instance, Reserved Instance Listing, Route Table , Security Group - EC2 Classic, Security Group - VPC, Snapshot, Spot Batch, Spot Instance Request, Spot Instances, Subnet, Virtual Private Gateway, VPC, VPN Connection |
| [Amazon Elastic File System][16]         | Filesystem                                                                                                                                                                                                                                                                                                                                    |
| [Amazon Kinesis][17]                     | Stream State                                                                                                                                                                                                                                                                                                                                  |
| [Amazon Machine Learning][18]            | BatchPrediction, DataSource, Evaluation, MLModel                                                                                                                                                                                                                                                                                              |
| [Amazon Route 53][19]                    | Domains, Healthchecks, HostedZone                                                                                                                                                                                                                                                                                                             |
| [Amazon WorkSpaces][20]                  | WorkSpaces                                                                                                                                                                                                                                                                                                                                    |
| [AWS CloudTrail][21]                     | CloudTrail                                                                                                                                                                                                                                                                                                                                    |
| [AWS Elastic Load Balancing][22]        | Loadbalancer, TargetGroups                                                                                                                                                                                                                                                                                                                    |
| [AWS Identity and Access Management][20] | Profile Name                                                                                                                                                                                                                                                                                                                                  |
| [AWS SQS][23]                           | Queue Name                                                                                                                                                                                                                                                                                                                                    |
| [Apache][24]                            | Apache Host and Port                                                                                                                                                                                                                                                                                                                          |
| [Azure][25]                             | Tenant Name, Status, Tags, Subscription ID and Name, Availability Zone in common with AWS tag after contacting Datadog support                                                                                                                                                                                                                |
| [BTRFS][26]                             | Usage and Replication Type                                                                                                                                                                                                                                                                                                                    |
| [Chef][27]                              | Chef Roles                                                                                                                                                                                                                                                                                                                                    |
| [Consul][28]                            | Previous and Current Consul Leaders and Followers, Consul Datacenter, Service  Name, Service ID                                                                                                                                                                                                                                               |
| [CouchDB][29]                           | Database Name,  Instance Name                                                                                                                                                                                                                                                                                                                 |
| [CouchBase][30]                         | CouchBase Tags,  Instance Name                                                                                                                                                                                                                                                                                                                |
| [Docker][31]                            | [Docker][32], [Kubernetes][33], [ECS][34], [Swarm, Mesos, Nomad and Rancher][32], collect more tag with [the Docker Agent tags collection options][35]                                                                                                                                                                                        |
| [Dyn][36]                               | Zone, Record Type                                                                                                                                                                                                                                                                                                                             |
| [Elasticsearch][37]                     | Cluster Name, Host Name, Port Number                                                                                                                                                                                                                                                                                                          |
| [Etcd][38]                              | State Leader or Follower                                                                                                                                                                                                                                                                                                                      |
| [Fluentd][39]                           | Host Name, Port Number                                                                                                                                                                                                                                                                                                                        |
| [Google App Engine][40]                 | Project Name, Version ID, Task Queue                                                                                                                                                                                                                                                                                                          |
| [Google Cloud Platform][41]             | Zone, Instance Type and ID, Automatic Restart, Project Name and ID, Name, Availability Zone in common with AWS tag after contacting Datadog support                                                                                                                                                                                           |
| [Go Expvar][42]                         | Expvar Path                                                                                                                                                                                                                                                                                                                                   |
| [Gunicorn][43]                          | State Idle or Working, App Name                                                                                                                                                                                                                                                                                                               |
| [HAProxy][44]                           | Service Name, Availability, Backend Host, Status, Type                                                                                                                                                                                                                                                                                        |
| [HTTP Check][45]                        | URL, Instance                                                                                                                                                                                                                                                                                                                                 |
| [IIS][46]                               | Site                                                                                                                                                                                                                                                                                                                                          |
| [Jenkins][47]                           | Job Name, Build Number, Branch, and Results                                                                                                                                                                                                                                                                                                   |
| [JMX][48]                               | JMX Tags                                                                                                                                                                                                                                                                                                                                      |
| [Kafka][49]                             | Topic                                                                                                                                                                                                                                                                                                                                         |
| [Kubernetes][50]                        | Minion Name, Namespace, Replication Controller, Labels, Container Alias                                                                                                                                                                                                                                                                       |
| [Marathon][51]                          | URL                                                                                                                                                                                                                                                                                                                                           |
| [Memcached][52]                         | Host, Port, Request, Cache Hit or Miss                                                                                                                                                                                                                                                                                                        |
| [Mesos][53]                             | Role, URL, PID, Slave or Master Role, Node, Cluster,                                                                                                                                                                                                                                                                                          |
| [Mongo][54]                             | Server Name                                                                                                                                                                                                                                                                                                                                   |
| [OpenStack][55]                         | Network ID, Network Name, Hypervisor Name, ID, and Type, Tenant ID, Availability Zone                                                                                                                                                                                                                                                         |
| [PHP FPM][56]                           | Pool Name                                                                                                                                                                                                                                                                                                                                     |
| [Pivotal][57]                           | Current State, Owner, Labels, Requester, Story Type                                                                                                                                                                                                                                                                                           |
| [Postfix ][58]                          | Queue, Instance                                                                                                                                                                                                                                                                                                                               |
| [Puppet][59]                            | Puppet Tags                                                                                                                                                                                                                                                                                                                                   |
| [RabbitMQ][60]                          | Node, Queue Name, Vhost, Policy, Host                                                                                                                                                                                                                                                                                                         |
| [Redis][61]                             | Host, Port, Slave or Master                                                                                                                                                                                                                                                                                                                   |
| [RiakCS][62]                            | Aggregation Key                                                                                                                                                                                                                                                                                                                               |
| [SNMP][63]                              | Device IP Address                                                                                                                                                                                                                                                                                                                             |
| [Supervisord][64]                       | Server Name, Process Name                                                                                                                                                                                                                                                                                                                     |
| [TeamCity][65]                          | Tags, Code Deployments, Build Number                                                                                                                                                                                                                                                                                                          |
| [TokuMX][66]                            | Role Primary or Secondary, Replset, Replstate, Db, Coll, Shard                                                                                                                                                                                                                                                                                |
| [Varnish][67]                           | Name, Backend                                                                                                                                                                                                                                                                                                                                 |
| [VSphere][68]                           | Host, Datacenter, Server, Instance                                                                                                                                                                                                                                                                                                            |
| [Win32 Events][69]                      | Event ID                                                                                                                                                                                                                                                                                                                                      |
| [Windows Services][70]                  | Service Name                                                                                                                                                                                                                                                                                                                                  |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tagging/#defining-tags
[2]: /agent/docker/#environment-variables
[3]: /api
[4]: /developers/dogstatsd
[5]: /integrations
[6]: /agent/faq/how-datadog-agent-determines-the-hostname
[7]: /graphing/#arithmetic-between-two-metrics
[8]: /agent/faq/agent-configuration-files
[9]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/docker_extract.go
[10]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/kubelet_extract.go
[11]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/ecs_extract.go
[12]: /libraries
[13]: /developers/dogstatsd/data_types/#host-tag-key
[14]: /integrations/amazon_cloudfront
[15]: /integrations/amazon_ec2
[16]: /integrations/amazon_efs
[17]: /integrations/amazon_kinesis
[18]: /integrations/amazon_machine_learning
[19]: /integrations/amazon_route53
[20]: /integrations/amazon_workspaces
[21]: /integrations/amazon_cloudtrail
[22]: /integrations/amazon_elb
[23]: /integrations/amazon_sqs
[24]: /integrations/apache
[25]: /integrations/azure
[26]: /integrations/btrfs
[27]: /integrations/chef
[28]: /integrations/consul
[29]: /integrations/couchdb
[30]: /integrations/couchbase
[31]: /integrations/docker
[32]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/docker_extract.go
[33]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/kubelet_extract.go
[34]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/ecs_extract.go
[35]: /agent/docker/#tagging
[36]: /integrations/dyn
[37]: /integrations/elastic
[38]: /integrations/etcd
[39]: /integrations/fluentd
[40]: /integrations/google_app_engine
[41]: /integrations/google_cloud_platform
[42]: /integrations/goexpvar
[43]: /integrations/gunicorn
[44]: /integrations/haproxy
[45]: /integrations/httpcheck
[46]: /integrations/iis
[47]: /integrations/jenkins
[48]: /integrations/java
[49]: /integrations/kafka
[50]: /integrations/kubernetes
[51]: /integrations/marathon
[52]: /integrations/memcached
[53]: /integrations/mesos
[54]: /integrations/mongodb
[55]: /integrations/openstack
[56]: /integrations/php_fpm
[57]: /integrations/pivotal
[58]: /integrations/postfix
[59]: /integrations/puppet
[60]: /integrations/rabbitmq
[61]: /integrations/redisdb
[62]: /integrations/riakcs
[63]: /integrations/snmp
[64]: /integrations/supervisor
[65]: /integrations/teamcity
[66]: /integrations/tokumx
[67]: /integrations/varnish
[68]: /integrations/vmware
[69]: /integrations/wmi
[70]: /integrations/winservices
