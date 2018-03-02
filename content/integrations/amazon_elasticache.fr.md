---
aliases:
- /integrations/awselasticache/
categories:
- cloud
- caching
- aws
ddtype: crawler
description: Track key Amazon ElasicCache metrics.
doc_link: https://docs.datadoghq.com/integrations/amazon_elasticache/
git_integration_title: amazon_elasticache
has_logo: true
integration_title: AWS ElastiCache
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_elasticache
public_title: Datadog-AWS ElastiCache Integration
short_description: Track key Amazon ElasicCache metrics.
version: '1.0'
---

{{< img src="integrations/awselasticache/elasticache-memcached.png" alt="ElastiCache Memcached default dashboard" responsive="true" popup="true">}}

## Overview

Learn more about how to monitor ElastiCache performance metrics, whether you use Redis or Memcached, thanks to [our series of posts](https://www.datadoghq.com/blog/monitoring-elasticache-performance-metrics-with-redis-or-memcached/). We detail the key performance metrics, how to collect them, and how [Coursera](https://www.coursera.org/) monitors ElastiCache using Datadog.

## Setup

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/amazon_web_services/). 

### Installation without Datadog Agent

1. In the [AWS integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services), ensure that `ElastiCache` is checked under metric collection.

2. Add those permissions to your [Datadog IAM policy](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) in order to collect Amazon ElastiCache metrics: 

    * `elasticache:DescribeCacheClusters`: List and describe Cache clusters, to add tags and additional metrics.
    * `elasticache:ListTagsForResource`: List custom tags of a cluster, to add custom tags.
    * `elasticache:DescribeEvents`: Add events avout snapshots and maintenances.

    For more information on ElastiCache policies, review [the documentation on the AWS website](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_elasticache.html).

3. Install the [Datadog - AWS ElastiCache integration](https://app.datadoghq.com/account/settings#integrations/amazon_elasticache).

### Installation with Datadog Agent (recommended)
#### Collecting native metrics with the Agent

The following diagram shows how Datadog collects metrics directly from CloudWatch via the native ElastiCache integration, and how it can additionally collect native metrics directly from the backend technology: Redis or Memcached. By collecting from the backend directly, you will have access to a greater number of important metrics, and at a higher resolution.

{{< img src="integrations/awselasticache/elasticache1.png" alt="ElastiCache, Redis and Memcached integrations" responsive="true">}}

#### How this works

Because the Agent metrics are tied to the EC2 instance where the agent is running and not to the actual ElastiCache instance, you will need to use the `cacheclusterid` tag to connect all metrics together. Once the agent is configured with the same tags as the ElastiCache instance, combining Redis/Memcached metrics with ElastiCache metrics is straightforward.

#### Step-by-step

Since the Agent is not running on an actual ElastiCache instance, but on a remote machine, the key to setting up this integration correctly is telling the Agent where to collect the metrics from.

##### Gather connection details for your ElastiCache instance

First navigate to the AWS Console, open the ElastiCache section and then the Cache Clusters tab to find the cluster you want to monitor. It should look like:

{{< img src="integrations/awselasticache/elasticache2.png" alt="ElastiCache Clusters in AWS console" responsive="true">}}

Then click on the “node” link to access its endpoint URL:

{{< img src="integrations/awselasticache/elasticache3.png" alt="Node link in AWS console" responsive="true">}}

Write down the endpoint URL (e.g. **replica-001.xxxx.use1.cache.amazonaws.com**) and the `cacheclusterid` (e.g. **replica-001**). You will need these values to configure the agent and to create graphs and dashboards.


##### Configure the Agent

The Redis/Memcached integrations support the tagging of individual cache instances. Originally designed to allow the monitoring of multiple instances on the same machine, you can use these tags to your advantage. Here is an example of a configuration for ElastiCache with Redis using `redisdb.yaml`, usually found in `/etc/dd-agent/conf.d`

```yaml
init_config:

instances:
  - host: replica-001.xxxx.use1.cache.amazonaws.com # Endpoint URL from AWS console
    port: 6379
    tags:
      - cacheclusterid:replicaa-001 # Cache Cluster ID from AWS console
```


Then restart the agent: `sudo /etc/init.d/datadog-agent restart` (on linux).


##### Visualize ElastiCache and Redis/Memcached metrics together

After a few minutes, ElastiCache metrics and Redis/Memcached metrics will be accessible in Datadog for graphing, monitoring, etc.

Here's an example of setting up a graph to combine cache hit metrics from ElastiCache with native latency metrics from Redis using the same `cacheclusterid` tag **replicaa-001**.

{{< img src="integrations/awselasticache/elasticache4.png" alt="ElastiCache and Cache metrics" responsive="true">}}

## Data Collected
### Metrics
{{< get-metrics-from-git "amazon_elasticache" >}}


Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events
The AWS ElastiCache integration does not include any event at this time.

### Service Checks
The AWS ElastiCache integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
