---
title: Assigning tags
kind: documentation
aliases:
    - /agent/tagging
further_reading:
- link: "getting_started/tagging"
  tag: "Documentation"
  text: Getting started with tags
- link: "getting_started/tagging/using_tags"
  tag: "Documentation"
  text: Learn how to use tags in Datadog
---

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
[The Datadog integrations](/integrations) are all configured via the yaml configuration files located in the **conf.d** directory in your agent install. For more about where to look for your configuration files, refer [to this article](https://app.datadoghq.com/account/settings#agent).

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

You can also assign tags to hosts, but not to [integration](/integrations) using the API. The endpoints you want to work with are /tags/hosts and depending on whether you PUT, POST, or DELETE you update, add, or delete tags for the chosen host. For more details on using the Tags endpoints in the API, [review this document](/api#tags)

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}