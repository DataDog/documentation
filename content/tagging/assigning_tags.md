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

Configure the host tags submitted by the Agent inside `datadog.yaml`. The tags for the [integrations][5] installed with the Agent are configured via YAML files located in the **conf.d** directory of the Agent install. To locate the configuration files, refer to [the Agent configuration files FAQ][6].

In YAML files, use a tag dictionary with a list of tags you want assigned at that level. Any tag you assign to the Agent is applied to every integration on that Agent's host, as well as to all its corresponding metrics, traces, and logs.

Tag dictionaries have two different yet functionally equivalent forms:

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

When installing the containerized Datadog Agent, host tags can be set using the environment variable `DD_TAGS`. We automatically collect common tags from [Docker][7], [Kubernetes][8], [ECS][9], [Swarm, Mesos, Nomad, and Rancher][7]. To extract even more tags, use the following options:

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

Note that tagging is a [Datadog-specific extension][10] to StatsD.

Special consideration is necessary when assigning the `host` tag to DogStatsD metrics. For more information on the host tag key, see the [DogStatsD section][11].

## Integration Inheritance

The most efficient method for assigning tags is to rely on your integrations. Tags assigned to your Amazon Web Services instances, Chef recipes, and more are all automatically assigned to the hosts and metrics when they are brought into Datadog.

The following [integration][5] sources create tags automatically in Datadog:

| Integration                             | Source                                                                                                                                                                                                                                                                                                                                        |
|-----------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Amazon CloudFront][12]                  | Distribution                                                                                                                                                                                                                                                                                                                                  |
| [Amazon EC2][13]                         | AMI, Customer Gateway, DHCP Option, EBS Volume, Instance, Internet Gateway, Network ACL, Network Interface, Reserved Instance, Reserved Instance Listing, Route Table , Security Group - EC2 Classic, Security Group - VPC, Snapshot, Spot Batch, Spot Instance Request, Spot Instances, Subnet, Virtual Private Gateway, VPC, VPN Connection |
| [Amazon Elastic File System][14]         | Filesystem                                                                                                                                                                                                                                                                                                                                    |
| [Amazon Kinesis][15]                     | Stream State                                                                                                                                                                                                                                                                                                                                  |
| [Amazon Machine Learning][16]            | BatchPrediction, DataSource, Evaluation, MLModel                                                                                                                                                                                                                                                                                              |
| [Amazon Route 53][17]                    | Domains, Healthchecks, HostedZone                                                                                                                                                                                                                                                                                                             |
| [Amazon WorkSpaces][18]                  | WorkSpaces                                                                                                                                                                                                                                                                                                                                    |
| [AWS CloudTrail][19]                     | CloudTrail                                                                                                                                                                                                                                                                                                                                    |
| [AWS Elastic Load Balancing][20]        | Loadbalancer, TargetGroups                                                                                                                                                                                                                                                                                                                    |
| [AWS Identity and Access Management][18] | Profile Name                                                                                                                                                                                                                                                                                                                                  |
| [AWS SQS][21]                           | Queue Name                                                                                                                                                                                                                                                                                                                                    |
| [Apache][22]                            | Apache Host and Port                                                                                                                                                                                                                                                                                                                          |
| [Azure][23]                             | Tenant Name, Status, Tags, Subscription ID and Name, Availability Zone in common with AWS tag after contacting Datadog support                                                                                                                                                                                                                |
| [BTRFS][24]                             | Usage and Replication Type                                                                                                                                                                                                                                                                                                                    |
| [Chef][25]                              | Chef Roles                                                                                                                                                                                                                                                                                                                                    |
| [Consul][26]                            | Previous and Current Consul Leaders and Followers, Consul Datacenter, Service  Name, Service ID                                                                                                                                                                                                                                               |
| [CouchDB][27]                           | Database Name,  Instance Name                                                                                                                                                                                                                                                                                                                 |
| [CouchBase][28]                         | CouchBase Tags,  Instance Name                                                                                                                                                                                                                                                                                                                |
| [Docker][29]                            | [Docker][30], [Kubernetes][31], [ECS][32], [Swarm, Mesos, Nomad and Rancher][30], collect more tag with [the Docker Agent tags collection options][33]                                                                                                                                                                                        |
| [Dyn][34]                               | Zone, Record Type                                                                                                                                                                                                                                                                                                                             |
| [Elasticsearch][35]                     | Cluster Name, Host Name, Port Number                                                                                                                                                                                                                                                                                                          |
| [Etcd][36]                              | State Leader or Follower                                                                                                                                                                                                                                                                                                                      |
| [Fluentd][37]                           | Host Name, Port Number                                                                                                                                                                                                                                                                                                                        |
| [Google App Engine][38]                 | Project Name, Version ID, Task Queue                                                                                                                                                                                                                                                                                                          |
| [Google Cloud Platform][39]             | Zone, Instance Type and ID, Automatic Restart, Project Name and ID, Name, Availability Zone in common with AWS tag after contacting Datadog support                                                                                                                                                                                           |
| [Go Expvar][40]                         | Expvar Path                                                                                                                                                                                                                                                                                                                                   |
| [Gunicorn][41]                          | State Idle or Working, App Name                                                                                                                                                                                                                                                                                                               |
| [HAProxy][42]                           | Service Name, Availability, Backend Host, Status, Type                                                                                                                                                                                                                                                                                        |
| [HTTP Check][43]                        | URL, Instance                                                                                                                                                                                                                                                                                                                                 |
| [IIS][44]                               | Site                                                                                                                                                                                                                                                                                                                                          |
| [Jenkins][45]                           | Job Name, Build Number, Branch, and Results                                                                                                                                                                                                                                                                                                   |
| [JMX][46]                               | JMX Tags                                                                                                                                                                                                                                                                                                                                      |
| [Kafka][47]                             | Topic                                                                                                                                                                                                                                                                                                                                         |
| [Kubernetes][48]                        | Minion Name, Namespace, Replication Controller, Labels, Container Alias                                                                                                                                                                                                                                                                       |
| [Marathon][49]                          | URL                                                                                                                                                                                                                                                                                                                                           |
| [Memcached][50]                         | Host, Port, Request, Cache Hit or Miss                                                                                                                                                                                                                                                                                                        |
| [Mesos][51]                             | Role, URL, PID, Slave or Master Role, Node, Cluster,                                                                                                                                                                                                                                                                                          |
| [Mongo][52]                             | Server Name                                                                                                                                                                                                                                                                                                                                   |
| [OpenStack][53]                         | Network ID, Network Name, Hypervisor Name, ID, and Type, Tenant ID, Availability Zone                                                                                                                                                                                                                                                         |
| [PHP FPM][54]                           | Pool Name                                                                                                                                                                                                                                                                                                                                     |
| [Pivotal][55]                           | Current State, Owner, Labels, Requester, Story Type                                                                                                                                                                                                                                                                                           |
| [Postfix ][56]                          | Queue, Instance                                                                                                                                                                                                                                                                                                                               |
| [Puppet][57]                            | Puppet Tags                                                                                                                                                                                                                                                                                                                                   |
| [RabbitMQ][58]                          | Node, Queue Name, Vhost, Policy, Host                                                                                                                                                                                                                                                                                                         |
| [Redis][59]                             | Host, Port, Slave or Master                                                                                                                                                                                                                                                                                                                   |
| [RiakCS][60]                            | Aggregation Key                                                                                                                                                                                                                                                                                                                               |
| [SNMP][61]                              | Device IP Address                                                                                                                                                                                                                                                                                                                             |
| [Supervisord][62]                       | Server Name, Process Name                                                                                                                                                                                                                                                                                                                     |
| [TeamCity][63]                          | Tags, Code Deployments, Build Number                                                                                                                                                                                                                                                                                                          |
| [TokuMX][64]                            | Role Primary or Secondary, Replset, Replstate, Db, Coll, Shard                                                                                                                                                                                                                                                                                |
| [Varnish][65]                           | Name, Backend                                                                                                                                                                                                                                                                                                                                 |
| [VSphere][66]                           | Host, Datacenter, Server, Instance                                                                                                                                                                                                                                                                                                            |
| [Win32 Events][67]                      | Event ID                                                                                                                                                                                                                                                                                                                                      |
| [Windows Services][68]                  | Service Name                                                                                                                                                                                                                                                                                                                                  |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tagging/#defining-tags
[2]: /agent/basic_agent_usage/docker/#environment-variables
[3]: /api
[4]: /developers/dogstatsd
[5]: /integrations
[6]: /agent/faq/agent-configuration-files
[7]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/docker_extract.go
[8]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/kubelet_extract.go
[9]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/ecs_extract.go
[10]: /libraries
[11]: /developers/dogstatsd/data_types/#host-tag-key
[12]: /integrations/amazon_cloudfront
[13]: /integrations/amazon_ec2
[14]: /integrations/amazon_efs
[15]: /integrations/amazon_kinesis
[16]: /integrations/amazon_machine_learning
[17]: /integrations/amazon_route53
[18]: /integrations/amazon_workspaces
[19]: /integrations/amazon_cloudtrail
[20]: /integrations/amazon_elb
[21]: /integrations/amazon_sqs
[22]: /integrations/apache
[23]: /integrations/azure
[24]: /integrations/btrfs
[25]: /integrations/chef
[26]: /integrations/consul
[27]: /integrations/couchdb
[28]: /integrations/couchbase
[29]: /integrations/docker
[30]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/docker_extract.go
[31]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/kubelet_extract.go
[32]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/ecs_extract.go
[33]: /agent/basic_agent_usage/docker/#tagging
[34]: /integrations/dyn
[35]: /integrations/elastic
[36]: /integrations/etcd
[37]: /integrations/fluentd
[38]: /integrations/google_app_engine
[39]: /integrations/google_cloud_platform
[40]: /integrations/goexpvar
[41]: /integrations/gunicorn
[42]: /integrations/haproxy
[43]: /integrations/httpcheck
[44]: /integrations/iis
[45]: /integrations/jenkins
[46]: /integrations/java
[47]: /integrations/kafka
[48]: /integrations/kubernetes
[49]: /integrations/marathon
[50]: /integrations/memcached
[51]: /integrations/mesos
[52]: /integrations/mongodb
[53]: /integrations/openstack
[54]: /integrations/php_fpm
[55]: /integrations/pivotal
[56]: /integrations/postfix
[57]: /integrations/puppet
[58]: /integrations/rabbitmq
[59]: /integrations/redisdb
[60]: /integrations/riakcs
[61]: /integrations/snmp
[62]: /integrations/supervisor
[63]: /integrations/teamcity
[64]: /integrations/tokumx
[65]: /integrations/varnish
[66]: /integrations/vmware
[67]: /integrations/wmi
[68]: /integrations/winservices
