---
kind: guide
listorder: 17
placeholder: true
title: Guide to Tagging
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>

## Overview
Tagging is used throughout the Datadog product to make it easier to subset and query the machines and metrics that you have to monitor. Without the ability to assign and filter based on tags, finding the problems that exist in your environment and narrowing them down enough to discover the true causes would be extremely difficult.

## How to assign tags
There are four primary ways to assign tags: inherited from the integration, in the configuration, in the UI, and using the API, though the UI and API only allow you to assign tags at the host level. The recommended method is to rely on the integration or via the configuration files.

### Inheriting tags from an integration

The easiest method for assigning tags is to rely on the integration. Tags assigned to your Amazon Web Services instances, Chef recipes, Docker labels, and more are all automatically assigned to the hosts and metrics when they are brought in to Datadog.

The following integration sources create tags automatically in Datadog:

|                                       |                                                                               |
| :-------------------------------------|:------------------------------------------------------------------------------|
| [Amazon CloudFront](http://docs.datadoghq.com/integrations/awscloudfront)                     | Distribution |
| [Amazon EC2](http://docs.datadoghq.com/integrations/awsec2)                            | AMI, Customer Gateway, DHCP Option, EBS Volume, Instance, Internet Gateway, Network ACL, Network Interface, Reserved Instance, Reserved Instance Listing, Route Table , Security Group - EC2 Classic, Security Group - VPC, Snapshot, Spot Batch, Spot Instance Request, Spot Instances, Subnet, Virtual Private Gateway, VPC, VPN Connection |
| [Amazon Elastic File System](http://docs.datadoghq.com/integrations/awsefs)            | Filesystem |
| [Amazon Kinesis](http://docs.datadoghq.com/integrations/awskinesis)                        | Stream State |
| [Amazon Machine Learning](http://docs.datadoghq.com/integrations/awsml)               | BatchPrediction, DataSource, Evaluation  , MLModel |
| [Amazon Route 53](http://docs.datadoghq.com/integrations/awsroute53)                       | Domains, Healthchecks  , HostedZone |
| [Amazon WorkSpaces](http://docs.datadoghq.com/integrations/awsworkspaces)                     | WorkSpaces |
| [AWS CloudTrail](http://docs.datadoghq.com/integrations/awscloudtrail)                        | CloudTrail |
| [AWS Elastic Load Balancing](http://docs.datadoghq.com/integrations/awselb)            | Loadbalancer, TargetGroups |
| [AWS Identity and Access Management](http://docs.datadoghq.com/integrations/awsworkspaces)    | Profile Name |
| [AWS SQS](http://docs.datadoghq.com/integrations/awssqs)                               | Queue Name |
| [Apache](http://docs.datadoghq.com/integrations/apache)                                | Apache Host and Port |
| [Azure](http://docs.datadoghq.com/integrations/azure)                                 | Tenant Name, Status, Tags, Subscription ID and Name, Availability Zone in common with AWS tag after contacting Datadog support |
| [BTRFS](http://docs.datadoghq.com/integrations/btrfs)                                 | Usage & Replication Type |
| [Chef](http://docs.datadoghq.com/integrations/chef)                                  | Chef Roles |
| [Consul](http://docs.datadoghq.com/integrations/consul)                                | Previous and Current Consul Leaders and Followers, Consul Datacenter,  Service Name, Service ID |
| [CouchDB](http://docs.datadoghq.com/integrations/couchdb)                               | Database Name,  Instance Name |
| [CouchBase](http://docs.datadoghq.com/integrations/couchbase)                             | CouchBase Tags,  Instance Name |
| [Docker](http://docs.datadoghq.com/integrations/docker)                                | Docker Container and Image Name, Container Command, Container Labels |
| [Dyn](http://docs.datadoghq.com/integrations/dyn)                                   | Zone, Record Type |
| [Elasticsearch](http://docs.datadoghq.com/integrations/elasticsearch)                         | Cluster Name,  Host Name, Port Number  |
| [Etcd](http://docs.datadoghq.com/integrations/etcd)                                  | State Leader or Follower |
| [Fluentd](http://docs.datadoghq.com/integrations/fluentd)                           | Host Name, Port Number |
| [Google App Engine](http://docs.datadoghq.com/integrations/google_app_engine)                     | Project Name, Version ID, Task Queue |
| [Google Cloud Platform](http://docs.datadoghq.com/integrations/google_cloud_platform)                 | Zone, Instance Type and ID, Automatic Restart, Project Name and ID, Name, Availability Zone in common with AWS tag after contacting Datadog support |
| [Go Expvar](http://docs.datadoghq.com/integrations/goexpvar)                             | Expvar Path |
| [Gunicorn](http://docs.datadoghq.com/integrations/gunicorn)                              | State Idle or Working, App Name |
| [HAProxy](http://docs.datadoghq.com/integrations/haproxy)                               | Service Name, Availability, Backend Host, Status, Type |
| [HTTP Check](http://docs.datadoghq.com/integrations/httpcheck)                            | URL, Instance |
| [IIS](http://docs.datadoghq.com/integrations/iis)                                   | Site |
| [Jenkins](http://docs.datadoghq.com/integrations/jenkins)                               | Job Name, Build Number, Branch, and Results |
| [JMX](http://docs.datadoghq.com/integrations/java)                                   | JMX Tags |
| [Kafka](http://docs.datadoghq.com/integrations/kafka)                                 | Topic |
| [Kubernetes](http://docs.datadoghq.com/integrations/kubernetes)                            | Minion Name, Namespace, Replication Controller, Labels, Container Alias |
| [Marathon](http://docs.datadoghq.com/integrations/marathon)                              | URL |
| [Memcached](http://docs.datadoghq.com/integrations/memcached)                             | Host, Port,  Request, Cache Hit or Miss |
| [Mesos](http://docs.datadoghq.com/integrations/mesos_master)                                 | Role, URL, PID, Slave or Master Role, Node, Cluster,   |
| [Mongo](http://docs.datadoghq.com/integrations/mongodb)                                 | Server Name |
| [OpenStack](http://docs.datadoghq.com/integrations/openstack)                             | Network ID, Network Name, Hypervisor Name, ID, and Type, Tenant ID,  Availability Zone |
| [PHP FPM](http://docs.datadoghq.com/integrations/phpfpm)                               | Pool Name |
| [Pivotal](http://docs.datadoghq.com/integrations/pivotal)                               | Current State, Owner, Labels, Requester, Story Type |
| [Postfix ](http://docs.datadoghq.com/integrations/postfix)                              | Queue, Instance |
| [Puppet](http://docs.datadoghq.com/integrations/puppet)                              | Puppet Tags |
| [RabbitMQ](http://docs.datadoghq.com/integrations/rabbitmq)                              | Node, Queue Name, Vhost, Policy, Host |
| [Redis](http://docs.datadoghq.com/integrations/redis)                                 | Host, Port,  Slave or Master |
| [RiakCS](http://docs.datadoghq.com/integrations/riakcs)                                | Aggregation Key |
| [SNMP](http://docs.datadoghq.com/integrations/snmp)                                  | Device IP Address |
| [Supervisord](http://docs.datadoghq.com/integrations/supervisor)                          | Server Name, Process Name |
| [TeamCity](http://docs.datadoghq.com/integrations/teamcity)                              | Tags, Code Deployments, Build Number |
| [TokuMX](http://docs.datadoghq.com/integrations/tokumx)                               | Role Primary or Secondary, Replset, Replstate, Db, Coll, Shard |
| [Varnish](http://docs.datadoghq.com/integrations/varnish)                               | Name, Backend |
| [VSphere](http://docs.datadoghq.com/integrations/vmware)                               | Host, Datacenter, Server, Instance |
| [Win32 Events](http://docs.datadoghq.com/integrations/wmi)                          | Event ID |
| [Windows Services](http://docs.datadoghq.com/integrations/winservices)                      | Service Name |

### Assigning tags using the configuration files
The Datadog integrations are all configured via the yaml configuration files located in the conf.d directory in your agent install. For more about where to look for your configuration files, refer [to this article][agentinstall]. You can define tags in the configuration file for the overall agent as well as for each integration, though the datadog.conf file is a more traditional ini file. In yaml files, there is a tag dictionary with a list of tags you want assigned at that level. Any tag you assign to the agent will apply to every integration on that agent's host.

Dictionaries with lists of values have two different yet functionally equivalent forms:

    tags: firsttag, secondtag, thirdtag

or

    tags:
      - firsttag
      - secondtag
      - thirdtag

You will see both forms in the yaml configuration files, but for the datadog.conf ini file only the first form is valid.

Each tag can be anything you like but you will have the best success with tagging if your tags are key:value pairs. Keys could represent the role, or function, or region, or application and the value is the instance of that role, function, region, or application. Here are some examples of good tags:

    region:east
    region:nw
    application:database
    database:primary
    role:sobotka

The reason why you should use key value pairs instead of simply values will become apparent when you start using the tags to filter and group metrics and machines. That said, you are not required to use key value pairs and simple values are valid.

### Assigning host tags in the UI
You can also assign tags to hosts, but not to integrations in the UI. To assign tags in the UI, start by going to the Infrastructure List page. Click on any host and then click the Update Host Tags button. In the host overlay that appears, click Edit Tags and make the changes you wish.

### Assigning host tags using the API
You can also assign tags to hosts, but not to integrations using the API. The endpoints you want to work with are /tags/hosts and depending on whether you PUT, POST, or DELETE you will update, add, or delete tags for the chosen host. For more details on using the Tags endpoints in the API, [review this document][tagsapi]

## How to use tags
After you have assigned tags at the host and integration level, you can start using them to filter and group in interesting ways. There are several places you can use tags:

- Events List
- Dashboards
- Infrastructure List
- Host Map
- Monitors

### Using tags in the Events List

The Events List will show you all the events that have occured in your environment over the time period specified. This can be overwhelming so you can use tags to filter down the list based on the tags you have assigned. You can enter any text you want in the search box above the Event List and a full text search will be performed. You can also enter ```tags:``` followed by a tag to see all the events that come from a host or integration with that tag. The example in the image is the tag role:cassandra. So the search text is ```tags:role:cassandra```.

{{< img src="guides/tagging/eventtags.png" alt="Events List and Tags" >}}

### Using tags in Dashboards

You can use tags to narrow down the metrics to display on a dashboard graph, or to create groups of metrics to display. 
To narrow down the metrics to display, enter the tag in the ```from:``` textbox. 
You will now be looking at a chosen metric over all the hosts that have that particular tag assigned.

{{< img src="guides/tagging/dashboardtags_1.png" alt="Tags in Dashboards from textbox" >}}

To group using tags, enter the key part of the tag in the ```avg by:``` textbox. 

For instance, if you have a timeseries graph showing a metric tagged by the reporting hosts' roles -`role:database`, `role:frontend`, or `role:loadbalancer`- enter role in the **avg_by** textbox. This causes the graph to show just one line for each tag value - `database`, `frontend`, and `loadbalancer`. Each line represents the average metric value across all hosts that share that role.

{{< img src="guides/tagging/dashboardtags.png" alt="Tags in Dashboards avgby textbox" >}}

You can also use tags to overlay events on the dashboard. This works in exactly the same way as in the Events List. 
Simply enter ```tags:``` followed by the tag and you will see the corresponding events overlaid as vertical bars on each graph.

### Using tags in the Infrastructure List and the Host Map

To filter the list of hosts in the Infrastructure list, enter a tag in the filter textbox at the top of the page. You can also group the hosts by entering the key portion of the tag in the group by textbox. So if you enter role in the group box, you will see each role as a group heading followed by the hosts with that tag.

{{< img src="guides/tagging/infrastructuretags.png" alt="Tags in the Infrastructure List" >}}

### Using tags in Monitors

When creating a monitor:

* Use tags in the ```from:``` textbox to limit the monitor scope to only metrics that have those tags.
{{< img src="guides/tagging/monitortags.png" alt="from textbox tags in Monitors" >}}

* Use tags in the ```excluding:``` textbox to remove the corresponding metrics of the monitor scope.
{{< img src="guides/tagging/monitortags_1.png" alt="excluding textbox tags in Monitors" >}}

* Use tags in the ```avg by``` textbox transform your monitor into a multi-alert monitor on each value of this tags.
{{< img src="guides/tagging/monitortags_2.png" alt="excluding textbox tags in Monitors" >}}
Tags on these events are related to the ```avg by:``` value. In order to have host-related tags (such as AWS integration tags), use ```avg by: host```

[tagsapi]: /api#tags
[agentinstall]: https://app.datadoghq.com/account/settings#agent
