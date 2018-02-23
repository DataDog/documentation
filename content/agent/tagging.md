---
title: Tagging
kind: documentation
aliases:
  - /guides/tagging/
---

## Overview
Tagging is used throughout the Datadog product to make it easier to subset and query the machines and metrics that you have to monitor. Without the ability to assign and filter based on tags, finding the problems that exist in your environment and narrowing them down enough to discover the true causes would be extremely difficult.

<div class="alert alert-info">
We recommend using the format <code>key:value</code> when using tags, like <code>env:prod</code>.
</div>

**Tags must start with a letter** and may contain alphanumerics, underscores, minuses, colons, periods, and slashes. Other characters get converted to underscores. Tags can be up to 200 characters long and support Unicode. Tags are converted to lowercase.

Note: An exception to this is trailing underscores, which are trimmed (e.g. path:thing_ becomes path:thing).

## How to assign tags
There are four primary ways to assign tags: inherited from the [integration](/integrations), in the configuration, in the UI, and using the API, though the UI and API only allow you to assign tags at the host level. The recommended method is to rely on the [integrations](/integrations) or via the configuration files.

### Inheriting tags from an integration

The easiest method for assigning tags is to rely on the integration. Tags assigned to your Amazon Web Services instances, Chef recipes, and more are all automatically assigned to the hosts and metrics when they are brought in to Datadog.

The following [integrations](/integrations) sources create tags automatically in Datadog:

{{% table responsive="true" %}}
|                                                                       ||
| :-------------------------------------                                | :------------------------------------------------------------------------------|
| [Amazon CloudFront](/integrations/amazon_cloudfront)                  | Distribution|
| [Amazon EC2](/integrations/amazon_ec2)                                | AMI, Customer Gateway, DHCP Option, EBS Volume, Instance, Internet Gateway, Network ACL, Network Interface, Reserved Instance, Reserved Instance Listing, Route Table , Security Group - EC2 Classic, Security Group - VPC, Snapshot, Spot Batch, Spot Instance Request, Spot Instances, Subnet, Virtual Private Gateway, VPC, VPN Connection |
| [Amazon Elastic File System](/integrations/amazon_efs)                | Filesystem|
| [Amazon Kinesis](/integrations/amazon_kinesis)                        | Stream State|
| [Amazon Machine Learning](/integrations/amazon_machine_learning)      | BatchPrediction, DataSource, Evaluation  , MLModel|
| [Amazon Route 53](/integrations/amazon_route53)                       | Domains, Healthchecks  , HostedZone|
| [Amazon WorkSpaces](/integrations/amazon_workspaces)                  | WorkSpaces|
| [AWS CloudTrail](/integrations/amazon_cloudtrail)                     | CloudTrail|
| [AWS Elastic Load Balancing](/integrations/amazon_elb)                | Loadbalancer, TargetGroups|
| [AWS Identity and Access Management](/integrations/amazon_workspaces) | Profile Name|
| [AWS SQS](/integrations/amazon_sqs)                                   | Queue Name|
| [Apache](/integrations/apache)                                        | Apache Host and Port|
| [Azure](/integrations/azure)                                          | Tenant Name, Status, Tags, Subscription ID and Name, Availability Zone in common with AWS tag after contacting Datadog support|
| [BTRFS](/integrations/btrfs)                                          | Usage & Replication Type|
| [Chef](/integrations/chef)                                            | Chef Roles|
| [Consul](/integrations/consul)                                        | Previous and Current Consul Leaders and Followers, Consul Datacenter,  Service Name, Service ID|
| [CouchDB](/integrations/couchdb)                                      | Database Name,  Instance Name|
| [CouchBase](/integrations/couchbase)                                  | CouchBase Tags,  Instance Name|
| [Docker](/integrations/docker)                                        | [Docker](https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/docker_extract.go), [Kubernetes](https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/kubelet_extract.go), [ECS](https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/ecs_extract.go), [Swarm, Mesos, Nomad and Rancher](https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/docker_extract.go), collect more tag with [the Docker Agent tags collection options](/agent/basic_agent_usage/docker/#tagging)|
| [Dyn](/integrations/dyn)                                              | Zone, Record Type|
| [Elasticsearch](/integrations/elastic)                                | Cluster Name,  Host Name, Port Number|
| [Etcd](/integrations/etcd)                                            | State Leader or Follower|
| [Fluentd](/integrations/fluentd)                                      | Host Name, Port Number|
| [Google App Engine](/integrations/google_app_engine)                  | Project Name, Version ID, Task Queue|
| [Google Cloud Platform](/integrations/google_cloud_platform)          | Zone, Instance Type and ID, Automatic Restart, Project Name and ID, Name, Availability Zone in common with AWS tag after contacting Datadog support|
| [Go Expvar](/integrations/goexpvar)                                   | Expvar Path|
| [Gunicorn](/integrations/gunicorn)                                    | State Idle or Working, App Name|
| [HAProxy](/integrations/haproxy)                                      | Service Name, Availability, Backend Host, Status, Type|
| [HTTP Check](/integrations/httpcheck)                                 | URL, Instance|
| [IIS](/integrations/iis)                                              | Site|
| [Jenkins](/integrations/jenkins)                                      | Job Name, Build Number, Branch, and Results|
| [JMX](/integrations/java)                                             | JMX Tags|
| [Kafka](/integrations/kafka)                                          | Topic|
| [Kubernetes](/integrations/kubernetes)                                | Minion Name, Namespace, Replication Controller, Labels, Container Alias|
| [Marathon](/integrations/marathon)                                    | URL|
| [Memcached](/integrations/memcached)                                  | Host, Port,  Request, Cache Hit or Miss|
| [Mesos](/integrations/mesos)                                          | Role, URL, PID, Slave or Master Role, Node, Cluster,|
| [Mongo](/integrations/mongodb)                                        | Server Name|
| [OpenStack](/integrations/openstack)                                  | Network ID, Network Name, Hypervisor Name, ID, and Type, Tenant ID,  Availability Zone|
| [PHP FPM](/integrations/php_fpm)                                      | Pool Name|
| [Pivotal](/integrations/pivotal)                                      | Current State, Owner, Labels, Requester, Story Type|
| [Postfix ](/integrations/postfix)                                     | Queue, Instance|
| [Puppet](/integrations/puppet)                                        | Puppet Tags|
| [RabbitMQ](/integrations/rabbitmq)                                    | Node, Queue Name, Vhost, Policy, Host|
| [Redis](/integrations/redisdb)                                        | Host, Port,  Slave or Master|
| [RiakCS](/integrations/riakcs)                                        | Aggregation Key|
| [SNMP](/integrations/snmp)                                            | Device IP Address|
| [Supervisord](/integrations/supervisor)                               | Server Name, Process Name|
| [TeamCity](/integrations/teamcity)                                    | Tags, Code Deployments, Build Number|
| [TokuMX](/integrations/tokumx)                                        | Role Primary or Secondary, Replset, Replstate, Db, Coll, Shard|
| [Varnish](/integrations/varnish)                                      | Name, Backend|
| [VSphere](/integrations/vmware)                                       | Host, Datacenter, Server, Instance|
| [Win32 Events](/integrations/wmi)                                     | Event ID|
| [Windows Services](/integrations/winservices)                         | Service Name|
{{% /table %}}

### Assigning tags using the configuration files
[The Datadog integrations](/integrations) are all configured via the yaml configuration files located in the **conf.d** directory in your agent install. For more about where to look for your configuration files, refer [to this article][agentinstall].

Define tags in the configuration file for the overall agent as well as for each integration.
In YAML files, there is a tag dictionary with a list of tags you want assigned at that level. Any tag you assign to the agent is applied to every integration on that agent's host.

Dictionaries with lists of values have two different yet functionally equivalent forms:

    tags: key_first_tag:value_1, key_second_tag:value_2, key_third_tag:value_3

or

    tags:
      - key_first_tag:value_1
      - key_second_tag:value_2
      - key_third_tag:value_3

You see both forms in the yaml configuration files, but for the `datadog.yaml` init file only the first form is valid.

Each tag can be anything you like but you have the best success with tagging if your tags are `key:value` pairs. Keys could represent the role, or function, or region, or application and the value is the instance of that role, function, region, or application. Here are some examples of good tags:

    region:east
    region:nw
    application:database
    database:primary
    role:sobotka

The reason why you should use key value pairs instead of values becomes apparent when you start using the tags to filter and group metrics and machines. That said, you are not required to use key value pairs and simple values are valid.

### Assigning host tags in the UI

You can also assign tags to hosts, but not to [integration](/integrations) in the UI. To assign tags in the UI, start by going to the Infrastructure List page. Click on any host and then click the Update Host Tags button. In the host overlay that appears, click Edit Tags and make the changes you wish.

### Assigning host tags using the API

You can also assign tags to hosts, but not to [integration](/integrations) using the API. The endpoints you want to work with are /tags/hosts and depending on whether you PUT, POST, or DELETE you update, add, or delete tags for the chosen host. For more details on using the Tags endpoints in the API, [review this document][tagsapi]

## How to use tags

After you have assigned tags at the host and [integration](/integrations) level, you can start using them to filter and group in interesting ways. There are several places you can use tags:

- [Events List](/graphing/event_stream/)
- [Dashboards](/graphing/dashboards/)
- [Infrastructure List](/graphing/infrastructure/)
- [Host Map](/graphing/infrastructure/hostmap)
- [Monitors](/monitors/)

### Using tags in the Events List

The [Events List](/graphing/event_stream/) shows you all the events that have occurred in your environment over the time period specified. This can be overwhelming so you can use tags to filter down the list based on the tags you have assigned. You can enter any text you want in the search box above the Event List and a full text search is performed. You can also enter `tags:` followed by a tag to see all the events that come from a host or [integration](/integrations) with that tag. The example in the image is the tag `role:cassandra`. So the search text is `tags:role:cassandra`.

{{< img src="agent/tagging/eventtags.png" alt="Events List and Tags" responsive="true" popup="true" style="width:70%;">}}

### Using tags in Dashboards

You can use tags to narrow down the metrics to display on a [dashboard graph](/graphing/dashboards), or to create groups of metrics to display.
To narrow down the metrics to display, enter the tag in the `from:` textbox.

You are now looking at a chosen metric over all the hosts that have that particular tag assigned.

{{< img src="agent/tagging/dashboardtags_1.png" alt="Tags in Dashboards from textbox" responsive="true" popup="true" style="width:70%;">}}

To group using tags, enter the key part of the tag in the `avg by:` textbox.

For instance, if you have a time series graph showing a metric tagged by the reporting hosts roles —`role:database`, `role:frontend`, or `role:loadbalancer`— enter role in the **avg_by** textbox.
This causes the graph to show just one line for each tag value — `database`, `frontend`, and `loadbalancer`. Each line represents the average metric value across all hosts that share that role.

{{< img src="agent/tagging/dashboardtags.png" alt="Tags in Dashboards avgby textbox" responsive="true" popup="true" style="width:70%;">}}

You can also use tags to overlay events on the dashboard. This works in exactly the same way as in the [Events List](/graphing/event_stream/).
Enter `tags:` followed by the tag and you see the corresponding events overlaid as vertical bars on each graph.

### Using tags in the Infrastructure List and the Host Map

To filter the list of hosts in the [Infrastructure list](/graphing/infrastructure/), enter a tag in the filter textbox at the top of the page. You can also group the hosts by entering the key portion of the tag in the group by textbox. So if you enter role in the group box, you see each role as a group heading followed by the hosts with that tag.  

{{< img src="agent/tagging/infrastructuretags.png" alt="Tags in the Infrastructure List" responsive="true" popup="true" style="width:70%;">}}

### Using tags in Monitors

When creating a [monitor](/monitors/monitor_types/):

* Use tags in the `from:` textbox to limit the monitor scope to only metrics that have those tags.
{{< img src="agent/tagging/monitortags.png" alt="from textbox tags in Monitors" responsive="true" popup="true" style="width:70%;">}}

* Use tags in the `excluding:` textbox to remove the corresponding metrics of the monitor scope.
{{< img src="agent/tagging/monitortags_1.png" alt="excluding textbox tags in Monitors" responsive="true" popup="true" style="width:70%;">}}

* Use tags in the `avg by` textbox transform your monitor into a multi-alert monitor on each value of this tags.
{{< img src="agent/tagging/monitortags_2.png" alt="excluding textbox tags in Monitors" responsive="true" popup="true" style="width:70%;">}}
Tags on these events are related to the `avg by:` value. In order to have host-related tags (such as AWS integration tags), use `avg by: host`

### Tell me about tagging!

Tagging within Datadog is a powerful way to easily gather your metrics
and makes scaling your infrastructure a breeze.

For a quick example to demonstrate the power of tagging, perhaps you're
looking for a sum of two metrics, which you might normally define as follows:

```
Web server 1: api.metric('page.views', [(1317652676, 100), ...], host="example.com")
Web server 2: api.metric('page.views', [(1317652676, 500), ...], host="example.com")
```

What we recommend doing is leaving off the hostname; it then defaults to the host that is sending that point, since they’re different hosts it's treated as different points:

```
Web server 1: api.metric('page.views', [(1317652676, 100), ...], tags=['domain:example.com'])
Web server 2: api.metric('page.views', [(1317652676, 500), ...], tags=['domain:example.com'])
```

With these tags you can then do:

```
sum:page.views{domain:example.com}
```

which should give the desired result.

To get a breakdown by host, you can do:

```
sum:page.views{domain:example.com} by {host}
```

For information on AWS tagging, see [this tagging doc page](/integrations/amazon_web_services/).

[tagsapi]: /api#tags
[agentinstall]: https://app.datadoghq.com/account/settings#agent
