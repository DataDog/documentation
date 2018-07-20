---
title: Assigning tags
kind: documentation
aliases:
    - /agent/tagging
    - /getting_started/tagging/assigning_tags
further_reading:
- link: "getting_started/tagging"
  tag: "Documentation"
  text: Getting started with tags
- link: "getting_started/tagging/using_tags"
  tag: "Documentation"
  text: Learn how to use tags in Datadog
---

Tagging is used throughout the Datadog product to make it easier to subset and query the machines and metrics that you have to monitor. Without the ability to assign and filter based on tags, finding the problems that exist in your environment and narrowing them down enough to discover the true causes would be extremely difficult. [Discover our tagging best practices before going further][61].

## How to assign tags
There are four primary ways to assign tags: inherited from the [integration][1], in the configuration, in the UI, and using the API, though the UI and API only allow you to assign tags at the host level. The recommended method is to rely on the [integrations][1] or via the configuration files.

### Inheriting tags from an integration

The easiest method for assigning tags is to rely on the integration. Tags assigned to your Amazon Web Services instances, Chef recipes, and more are all automatically assigned to the hosts and metrics when they are brought in to Datadog.

The following [integrations][1] sources create tags automatically in Datadog:

|                                                                       ||
| :-------------------------------------                                | :------------------------------------------------------------------------------|
| [Amazon CloudFront][2]                  | Distribution|
| [Amazon EC2][3]                                | AMI, Customer Gateway, DHCP Option, EBS Volume, Instance, Internet Gateway, Network ACL, Network Interface, Reserved Instance, Reserved Instance Listing, Route Table , Security Group - EC2 Classic, Security Group - VPC, Snapshot, Spot Batch, Spot Instance Request, Spot Instances, Subnet, Virtual Private Gateway, VPC, VPN Connection |
| [Amazon Elastic File System][4]                | Filesystem|
| [Amazon Kinesis][5]                        | Stream State|
| [Amazon Machine Learning][6]      | BatchPrediction, DataSource, Evaluation  , MLModel|
| [Amazon Route 53][7]                       | Domains, Healthchecks  , HostedZone|
| [Amazon WorkSpaces][8]                  | WorkSpaces|
| [AWS CloudTrail][9]                     | CloudTrail|
| [AWS Elastic Load Balancing][10]                | Loadbalancer, TargetGroups|
| [AWS Identity and Access Management][8] | Profile Name|
| [AWS SQS][11]                                   | Queue Name|
| [Apache][12]                                        | Apache Host and Port|
| [Azure][13]                                          | Tenant Name, Status, Tags, Subscription ID and Name, Availability Zone in common with AWS tag after contacting Datadog support|
| [BTRFS][14]                                          | Usage & Replication Type|
| [Chef][15]                                            | Chef Roles|
| [Consul][16]                                        | Previous and Current Consul Leaders and Followers, Consul Datacenter,  Service Name, Service ID|
| [CouchDB][17]                                      | Database Name,  Instance Name|
| [CouchBase][18]                                  | CouchBase Tags,  Instance Name|
| [Docker][19]                                        | [Docker][20], [Kubernetes][21], [ECS][22], [Swarm, Mesos, Nomad and Rancher][20], collect more tag with [the Docker Agent tags collection options][23]|
| [Dyn][24]                                              | Zone, Record Type|
| [Elasticsearch][25]                                | Cluster Name,  Host Name, Port Number|
| [Etcd][26]                                            | State Leader or Follower|
| [Fluentd][27]                                      | Host Name, Port Number|
| [Google App Engine][28]                  | Project Name, Version ID, Task Queue|
| [Google Cloud Platform][29]          | Zone, Instance Type and ID, Automatic Restart, Project Name and ID, Name, Availability Zone in common with AWS tag after contacting Datadog support|
| [Go Expvar][30]                                   | Expvar Path|
| [Gunicorn][31]                                    | State Idle or Working, App Name|
| [HAProxy][32]                                      | Service Name, Availability, Backend Host, Status, Type|
| [HTTP Check][33]                                 | URL, Instance|
| [IIS][34]                                              | Site|
| [Jenkins][35]                                      | Job Name, Build Number, Branch, and Results|
| [JMX][36]                                             | JMX Tags|
| [Kafka][37]                                          | Topic|
| [Kubernetes][38]                                | Minion Name, Namespace, Replication Controller, Labels, Container Alias|
| [Marathon][39]                                    | URL|
| [Memcached][40]                                  | Host, Port,  Request, Cache Hit or Miss|
| [Mesos][41]                                          | Role, URL, PID, Slave or Master Role, Node, Cluster,|
| [Mongo][42]                                        | Server Name|
| [OpenStack][43]                                  | Network ID, Network Name, Hypervisor Name, ID, and Type, Tenant ID,  Availability Zone|
| [PHP FPM][44]                                      | Pool Name|
| [Pivotal][45]                                      | Current State, Owner, Labels, Requester, Story Type|
| [Postfix ][46]                                     | Queue, Instance|
| [Puppet][47]                                        | Puppet Tags|
| [RabbitMQ][48]                                    | Node, Queue Name, Vhost, Policy, Host|
| [Redis][49]                                        | Host, Port,  Slave or Master|
| [RiakCS][50]                                        | Aggregation Key|
| [SNMP][51]                                            | Device IP Address|
| [Supervisord][52]                               | Server Name, Process Name|
| [TeamCity][53]                                    | Tags, Code Deployments, Build Number|
| [TokuMX][54]                                        | Role Primary or Secondary, Replset, Replstate, Db, Coll, Shard|
| [Varnish][55]                                      | Name, Backend|
| [VSphere][56]                                       | Host, Datacenter, Server, Instance|
| [Win32 Events][57]                                     | Event ID|
| [Windows Services][58]                         | Service Name|

### Assigning tags using the configuration files
[The Datadog integrations][1] are all configured via the yaml configuration files located in the **conf.d** directory in your Agent install. For more about where to look for your configuration files, refer [to this article][59].

Define tags in the configuration file for the overall Agent as well as for each integration.
In YAML files, there is a tag dictionary with a list of tags you want assigned at that level. Any tag you assign to the Agent is applied to every integration on that Agent's host.

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

You can also assign tags to hosts, but not to [integration][1] in the UI. To assign tags in the UI, start by going to the Infrastructure List page. Click on any host and then click the Update Host Tags button. In the host overlay that appears, click Edit Tags and make the changes you wish.

### Assigning host tags using the API

You can also assign tags to hosts, but not to [integration][1] using the API. The endpoints you want to work with are /tags/hosts and depending on whether you PUT, POST, or DELETE you update, add, or delete tags for the chosen host. For more details on using the Tags endpoints in the API, [review this document][60]

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
[23]: /agent/basic_agent_usage/docker/#tagging
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
[59]: https://app.datadoghq.com/account/settings#agent
[60]: /api#tags
[61]: /getting_started/tagging/#tags-best-practices
