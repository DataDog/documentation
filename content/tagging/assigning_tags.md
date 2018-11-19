---
title: Assigning tags
kind: documentation
aliases:
    - /agent/tagging
    - /getting_started/tagging/assigning_tags
further_reading:
- link: "tagging"
  tag: "Documentation"
  text: Getting started with tags
- link: "tagging/using_tags"
  tag: "Documentation"
  text: Learn how to use tags in Datadog
---

## Overview 

Tagging is used throughout Datadog to query the machines and metrics you monitor. Without the ability to assign and filter based on tags, finding problems in your environment and narrowing them down enough to discover the true causes could be difficult. Learn how to [define tags][61] in Datadog before going further.

There are several places tags can be assigned: [configuration files](#configuration-files), [environment variables][80], your [traces](#traces), the Datadog [UI](#ui), [API][65], [DogStatsD][75], and inheriting from the [integrations][1]. It is recommended that you use configuration files and integration inheritance for most of your tagging needs.

## Configuration Files

Configure the host tags submitted by the Agent inside `datadog.yaml`. The tags for the [integrations][1] installed with the Agent are configured via YAML files located in the **conf.d** directory of the Agent install. To locate the configuration files, refer to [the Agent configuration files FAQ][59].

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

It is recommended you assign tags as `<KEY>:<VALUE>` pairs, but simple tags are also accepted. See [defining tags][61] for more details.

## Environment Variables

When installing the containerized Datadog Agent, host tags can be set using the environment variable `DD_TAGS`. We automatically collect common tags from [Docker][77], [Kubernetes][78], [ECS][79], [Swarm, Mesos, Nomad, and Rancher][77]. To extract even more tags, use the following options:

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

Assign host tags in the UI via the [Host Map page][81]. Click on any hexagon (host) to show the host overlay on the bottom of the page. Then, under the *User* section, click the **Edit Tags** button. Enter the tags as a comma separated list, then click **Save Tags**. Note: Changes to metric tags made via the UI may take up to 30 minutes to apply.

{{< img src="tagging/assigning_tags/hostmapuitags.png" alt="Host Map Tags" responsive="true" style="width:80%;">}}

[81]: /graphing/infrastructure/hostmap/

{{% /tab %}}
{{% tab "Infrastructure List" %}}

Assign host tags in the UI via the [Infrastructure List page][62]. Click on any host to show the host overlay on the right of the page. Then, under the *User* section, click the **Edit Tags** button. Enter the tags as a comma separated list, then click **Save Tags**. Note: Changes to metric tags made via the UI may take up to 30 minutes to apply.

{{< img src="tagging/assigning_tags/hostuitags.png" alt="Infrastructure List Tags" responsive="true" style="width:80%;">}}

[62]: /graphing/infrastructure/

{{% /tab %}}
{{% tab "Monitors" %}}

From the [Manage Monitors][63] page, select the checkbox next to each monitor to add tags (select one or multiple monitors). Click the **Edit Tags** button. Enter a tag or select one used previously. Then click **Add Tag `tag:name`** or **Apply Changes**. If tags were added previously, multiple tags can be assigned at once using the tag checkboxes.

{{< img src="tagging/assigning_tags/monitortags.png" alt="Manage Monitors Tags" responsive="true" style="width:80%;">}}

When creating a monitor, assign monitor tags under step 4 *Say what's happening*:

{{< img src="tagging/assigning_tags/monitorindivdualtags.png" alt="Create Monitor Tags" responsive="true" style="width:80%;">}}

[63]: /monitors/manage_monitor/

{{% /tab %}}
{{% tab "Distribution Metrics" %}}

Assign tag keys within [Distribution Metrics][64] (Beta) to create aggregate timeseries by applying sets of tags to a metric, for which a timeseries is created for every combination of tag values within the set.

**Sets of tags are limited to groups of four**:

{{< img src="tagging/assigning_tags/distributionmetricstags.png" alt="Distribution Metrics Tags" responsive="true" style="width:80%;">}}

[64]: /graphing/metrics/distributions/

{{% /tab %}}
{{% tab "Integrations" %}}

The [AWS][60] integration tile allows you to assign additional tags to all metrics at the account level. Use a comma separated list of tags in the form `<KEY>:<VALUE>`.

{{< img src="tagging/assigning_tags/integrationtags.png" alt="AWS Tags" responsive="true" style="width:80%;">}}

[60]: /integrations/amazon_web_services/

{{% /tab %}}
{{< /tabs >}}

## API

{{< tabs >}}
{{% tab "Assignment" %}}

Tags can be assigned in various ways with the [Datadog API][65]. See the list below for links to those sections:

- [Post a check run][66]
- [Post an event][67]
- [AWS Integration][68]
- [Post timeseries point][69]
- [Create][70] or [Edit][71] a monitor
- [Add][72] or [Update][73] host tags
- [Send traces][74]

[65]: /api/
[66]: /api/?lang=python#post-a-check-run
[67]: /api/?lang=python#post-an-event
[68]: /api/?lang=python#aws
[69]: /api/?lang=python#post-timeseries-points
[70]: /api/?lang=python#create-a-monitor
[71]: /api/?lang=python#edit-a-monitor
[72]: /api/?lang=python#add-tags-to-a-host
[73]: /api/?lang=python#update-host-tags
[74]: /api/?lang=python#send-traces

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

Add tags to any metric, event, or service check you send to [DogStatsD][75]. For example, compare the performance of two algorithms by tagging a timer metric with the algorithm version:

```python

@statsd.timed('algorithm.run_time', tags=['algorithm:one'])
def algorithm_one():
    # Do fancy things here ...

@statsd.timed('algorithm.run_time', tags=['algorithm:two'])
def algorithm_two():
    # Do fancy things (maybe faster?) here ...
```

Note that tagging is a [Datadog-specific extension][76] to StatsD.

Special consideration is necessary when assigning the `host` tag to DogStatsD metrics. For more information on the host tag key, see the [DogStatsD section][82].

## Integration Inheritance

The most efficient method for assigning tags is to rely on your integrations. Tags assigned to your Amazon Web Services instances, Chef recipes, and more are all automatically assigned to the hosts and metrics when they are brought into Datadog.

The following [integration][1] sources create tags automatically in Datadog:

| Integration                             | Source                                                                                                                                                                                                                                                                                                                                        |
|-----------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Amazon CloudFront][2]                  | Distribution                                                                                                                                                                                                                                                                                                                                  |
| [Amazon EC2][3]                         | AMI, Customer Gateway, DHCP Option, EBS Volume, Instance, Internet Gateway, Network ACL, Network Interface, Reserved Instance, Reserved Instance Listing, Route Table , Security Group - EC2 Classic, Security Group - VPC, Snapshot, Spot Batch, Spot Instance Request, Spot Instances, Subnet, Virtual Private Gateway, VPC, VPN Connection |
| [Amazon Elastic File System][4]         | Filesystem                                                                                                                                                                                                                                                                                                                                    |
| [Amazon Kinesis][5]                     | Stream State                                                                                                                                                                                                                                                                                                                                  |
| [Amazon Machine Learning][6]            | BatchPrediction, DataSource, Evaluation, MLModel                                                                                                                                                                                                                                                                                              |
| [Amazon Route 53][7]                    | Domains, Healthchecks, HostedZone                                                                                                                                                                                                                                                                                                             |
| [Amazon WorkSpaces][8]                  | WorkSpaces                                                                                                                                                                                                                                                                                                                                    |
| [AWS CloudTrail][9]                     | CloudTrail                                                                                                                                                                                                                                                                                                                                    |
| [AWS Elastic Load Balancing][10]        | Loadbalancer, TargetGroups                                                                                                                                                                                                                                                                                                                    |
| [AWS Identity and Access Management][8] | Profile Name                                                                                                                                                                                                                                                                                                                                  |
| [AWS SQS][11]                           | Queue Name                                                                                                                                                                                                                                                                                                                                    |
| [Apache][12]                            | Apache Host and Port                                                                                                                                                                                                                                                                                                                          |
| [Azure][13]                             | Tenant Name, Status, Tags, Subscription ID and Name, Availability Zone in common with AWS tag after contacting Datadog support                                                                                                                                                                                                                |
| [BTRFS][14]                             | Usage and Replication Type                                                                                                                                                                                                                                                                                                                    |
| [Chef][15]                              | Chef Roles                                                                                                                                                                                                                                                                                                                                    |
| [Consul][16]                            | Previous and Current Consul Leaders and Followers, Consul Datacenter, Service  Name, Service ID                                                                                                                                                                                                                                               |
| [CouchDB][17]                           | Database Name,  Instance Name                                                                                                                                                                                                                                                                                                                 |
| [CouchBase][18]                         | CouchBase Tags,  Instance Name                                                                                                                                                                                                                                                                                                                |
| [Docker][19]                            | [Docker][20], [Kubernetes][21], [ECS][22], [Swarm, Mesos, Nomad and Rancher][20], collect more tag with [the Docker Agent tags collection options][23]                                                                                                                                                                                        |
| [Dyn][24]                               | Zone, Record Type                                                                                                                                                                                                                                                                                                                             |
| [Elasticsearch][25]                     | Cluster Name, Host Name, Port Number                                                                                                                                                                                                                                                                                                          |
| [Etcd][26]                              | State Leader or Follower                                                                                                                                                                                                                                                                                                                      |
| [Fluentd][27]                           | Host Name, Port Number                                                                                                                                                                                                                                                                                                                        |
| [Google App Engine][28]                 | Project Name, Version ID, Task Queue                                                                                                                                                                                                                                                                                                          |
| [Google Cloud Platform][29]             | Zone, Instance Type and ID, Automatic Restart, Project Name and ID, Name, Availability Zone in common with AWS tag after contacting Datadog support                                                                                                                                                                                           |
| [Go Expvar][30]                         | Expvar Path                                                                                                                                                                                                                                                                                                                                   |
| [Gunicorn][31]                          | State Idle or Working, App Name                                                                                                                                                                                                                                                                                                               |
| [HAProxy][32]                           | Service Name, Availability, Backend Host, Status, Type                                                                                                                                                                                                                                                                                        |
| [HTTP Check][33]                        | URL, Instance                                                                                                                                                                                                                                                                                                                                 |
| [IIS][34]                               | Site                                                                                                                                                                                                                                                                                                                                          |
| [Jenkins][35]                           | Job Name, Build Number, Branch, and Results                                                                                                                                                                                                                                                                                                   |
| [JMX][36]                               | JMX Tags                                                                                                                                                                                                                                                                                                                                      |
| [Kafka][37]                             | Topic                                                                                                                                                                                                                                                                                                                                         |
| [Kubernetes][38]                        | Minion Name, Namespace, Replication Controller, Labels, Container Alias                                                                                                                                                                                                                                                                       |
| [Marathon][39]                          | URL                                                                                                                                                                                                                                                                                                                                           |
| [Memcached][40]                         | Host, Port, Request, Cache Hit or Miss                                                                                                                                                                                                                                                                                                        |
| [Mesos][41]                             | Role, URL, PID, Slave or Master Role, Node, Cluster,                                                                                                                                                                                                                                                                                          |
| [Mongo][42]                             | Server Name                                                                                                                                                                                                                                                                                                                                   |
| [OpenStack][43]                         | Network ID, Network Name, Hypervisor Name, ID, and Type, Tenant ID, Availability Zone                                                                                                                                                                                                                                                         |
| [PHP FPM][44]                           | Pool Name                                                                                                                                                                                                                                                                                                                                     |
| [Pivotal][45]                           | Current State, Owner, Labels, Requester, Story Type                                                                                                                                                                                                                                                                                           |
| [Postfix ][46]                          | Queue, Instance                                                                                                                                                                                                                                                                                                                               |
| [Puppet][47]                            | Puppet Tags                                                                                                                                                                                                                                                                                                                                   |
| [RabbitMQ][48]                          | Node, Queue Name, Vhost, Policy, Host                                                                                                                                                                                                                                                                                                         |
| [Redis][49]                             | Host, Port, Slave or Master                                                                                                                                                                                                                                                                                                                   |
| [RiakCS][50]                            | Aggregation Key                                                                                                                                                                                                                                                                                                                               |
| [SNMP][51]                              | Device IP Address                                                                                                                                                                                                                                                                                                                             |
| [Supervisord][52]                       | Server Name, Process Name                                                                                                                                                                                                                                                                                                                     |
| [TeamCity][53]                          | Tags, Code Deployments, Build Number                                                                                                                                                                                                                                                                                                          |
| [TokuMX][54]                            | Role Primary or Secondary, Replset, Replstate, Db, Coll, Shard                                                                                                                                                                                                                                                                                |
| [Varnish][55]                           | Name, Backend                                                                                                                                                                                                                                                                                                                                 |
| [VSphere][56]                           | Host, Datacenter, Server, Instance                                                                                                                                                                                                                                                                                                            |
| [Win32 Events][57]                      | Event ID                                                                                                                                                                                                                                                                                                                                      |
| [Windows Services][58]                  | Service Name                                                                                                                                                                                                                                                                                                                                  |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations
[2]: /integrations/amazon_cloudfront
[3]: /integrations/amazon_ec2
[4]: /integrations/amazon_efs
[5]: /integrations/amazon_kinesis
[6]: /integrations/amazon_machine_learning
[7]: /integrations/amazon_route53
[8]: /integrations/amazon_workspaces
[9]: /integrations/amazon_cloudtrail
[10]: /integrations/amazon_elb
[11]: /integrations/amazon_sqs
[12]: /integrations/apache
[13]: /integrations/azure
[14]: /integrations/btrfs
[15]: /integrations/chef
[16]: /integrations/consul
[17]: /integrations/couchdb
[18]: /integrations/couchbase
[19]: /integrations/docker
[20]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/docker_extract.go
[21]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/kubelet_extract.go
[22]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/ecs_extract.go
[23]: /agent/docker/#tagging
[24]: /integrations/dyn
[25]: /integrations/elastic
[26]: /integrations/etcd
[27]: /integrations/fluentd
[28]: /integrations/google_app_engine
[29]: /integrations/google_cloud_platform
[30]: /integrations/goexpvar
[31]: /integrations/gunicorn
[32]: /integrations/haproxy
[33]: /integrations/httpcheck
[34]: /integrations/iis
[35]: /integrations/jenkins
[36]: /integrations/java
[37]: /integrations/kafka
[38]: /integrations/kubernetes
[39]: /integrations/marathon
[40]: /integrations/memcached
[41]: /integrations/mesos
[42]: /integrations/mongodb
[43]: /integrations/openstack
[44]: /integrations/php_fpm
[45]: /integrations/pivotal
[46]: /integrations/postfix
[47]: /integrations/puppet
[48]: /integrations/rabbitmq
[49]: /integrations/redisdb
[50]: /integrations/riakcs
[51]: /integrations/snmp
[52]: /integrations/supervisor
[53]: /integrations/teamcity
[54]: /integrations/tokumx
[55]: /integrations/varnish
[56]: /integrations/vmware
[57]: /integrations/wmi
[58]: /integrations/winservices
[59]: /agent/faq/agent-configuration-files/
[60]: /integrations/amazon_web_services/
[61]: /tagging/#defining-tags
[62]: /graphing/infrastructure/
[63]: /monitors/manage_monitor/
[64]: /graphing/metrics/distributions/
[65]: /api/
[66]: /api/?lang=python#post-a-check-run
[67]: /api/?lang=python#post-an-event
[68]: /api/?lang=python#aws
[69]: /api/?lang=python#post-timeseries-points
[70]: /api/?lang=python#create-a-monitor
[71]: /api/?lang=python#edit-a-monitor
[72]: /api/?lang=python#add-tags-to-a-host
[73]: /api/?lang=python#update-host-tags
[74]: /api/?lang=python#send-traces
[75]: /developers/dogstatsd/
[76]: /libraries/
[77]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/docker_extract.go
[78]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/kubelet_extract.go
[79]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/ecs_extract.go
[80]: /agent/docker/#environment-variables
[81]: /graphing/infrastructure/hostmap/
[82]: /developers/dogstatsd/data_types/#host-tag-key
