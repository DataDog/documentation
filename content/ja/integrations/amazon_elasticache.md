---
"aliases":
- "/integrations/awselasticache/"
- "/integrations/elasticache/"
"categories":
- "aws"
- "caching"
- "cloud"
- "configuration & deployment"
- "log collection"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Amazon ElasicCache のキーメトリクスを追跡。"
"doc_link": "https://docs.datadoghq.com/integrations/amazon_elasticache/"
"draft": false
"git_integration_title": "amazon_elasticache"
"has_logo": true
"integration_id": ""
"integration_title": "Amazon ElastiCache"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_elasticache"
"public_title": "Datadog-Amazon ElastiCache Integration"
"short_description": "Track key Amazon ElasicCache metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/awselasticache/elasticache-memcached.png" alt="ElastiCache Memcached default dashboard" popup="true">}}

## Overview

See [Monitoring ElastiCache performance metrics with Redis or Memcached][1] to learn about key performance metrics, how to collect them, and how [Coursera][2] monitors ElastiCache using Datadog.

## Setup

If you haven't already, set up the [Amazon Web Services integration][3] first.

### Installation without Datadog Agent

1. In the [AWS integration page][4], ensure that `ElastiCache` is enabled under the `Metric Collection` tab.
2. Add the following permissions to your [Datadog IAM policy][5] in order to collect Amazon ElastiCache metrics. For more information, see the [ElastiCache policies][6] on the AWS website.

    | AWS Permission                      | Description                                                           |
    | ----------------------------------- | --------------------------------------------------------------------- |
    | `elasticache:DescribeCacheClusters` | List and describe Cache clusters, to add tags and additional metrics. |
    | `elasticache:ListTagsForResource`   | List custom tags of a cluster, to add custom tags.                    |
    | `elasticache:DescribeEvents`        | Add events about snapshots and maintenances.                          |

3. Install the [Datadog - Amazon ElastiCache integration][7].

### Installation with Datadog Agent (recommended)

#### Collecting native metrics with the Agent

The following diagram shows how Datadog collects metrics directly from CloudWatch with the native ElastiCache integration, and how it can additionally collect native metrics directly from the backend technology: Redis or Memcached. By collecting from the backend directly, you have access to a greater number of important metrics, and at a higher resolution.

{{< img src="integrations/awselasticache/elasticache1.png" alt="ElastiCache, Redis, and Memcached integrations" >}}

#### How this works

Because the Agent metrics are tied to the EC2 instance where the agent is running and not to the actual ElastiCache instance, you need to use the `cacheclusterid` tag to connect all metrics together. Once the agent is configured with the same tags as the ElastiCache instance, combining Redis/Memcached metrics with ElastiCache metrics is straightforward.

#### Step-by-step

Since the Agent is not running on an actual ElastiCache instance, but on a remote machine, the key to setting up this integration correctly is telling the Agent where to collect the metrics from.

##### Gather connection details for your ElastiCache instance

First navigate to the AWS Console, open the ElastiCache section and then the Cache Clusters tab to find the cluster you want to monitor. It should look like:

{{< img src="integrations/awselasticache/elasticache2.png" alt="ElastiCache Clusters in AWS console" >}}

Then click on the “node” link to access its endpoint URL:

{{< img src="integrations/awselasticache/elasticache3.png" alt="Node link in AWS console" >}}

Write down the endpoint URL (for example: **replica-001.xxxx.use1.cache.amazonaws.com**) and the `cacheclusterid` (for example: **replica-001**). You need these values to configure the agent and to create graphs and dashboards.

##### Configure the Agent

The Redis/Memcached integrations support the tagging of individual cache instances. Originally designed to allow the monitoring of multiple instances on the same machine, these tags can be used to filter and group metrics. Here is an example of a configuration for ElastiCache with Redis using `redisdb.yaml`. For information about where this file is stored based on your platform, see the [Agent configuration directory][8].

```yaml
init_config:

instances:
    # Endpoint URL from AWS console
    - host: replica-001.xxxx.use1.cache.amazonaws.com
      port: 6379
      # Cache Cluster ID from AWS console
      tags:
          - cacheclusterid:replicaa-001
```

Then restart the agent: `sudo /etc/init.d/datadog-agent restart` (on linux).

##### Visualize metrics together

After a few minutes, ElastiCache metrics and Redis or Memcached metrics can be accessed in Datadog for graphing, monitoring, etc.

Here's an example of setting up a graph to combine cache hit metrics from ElastiCache with native latency metrics from Redis using the same `cacheclusterid` tag **replicaa-001**.

{{< img src="integrations/awselasticache/elasticache4.png" alt="ElastiCache and Cache metrics" >}}

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_elasticache" >}}


Each of the metrics retrieved from AWS is assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### イベント

The Amazon ElastiCache integration includes events for cluster, cache security groups, and cache parameter groups. See example events below:

{{< img src="integrations/amazon_elasticache/aws_elasticache_events.png" alt="Amazon Elasticache Events" >}}

### サービスチェック

The Amazon ElastiCache integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][10].

## Further Reading

- [Monitoring ElastiCache performance metrics with Redis or Memcached][1]
- [Collecting ElastiCache metrics + its Redis/Memcached metrics][11]

[1]: https://www.datadoghq.com/blog/monitoring-elasticache-performance-metrics-with-redis-or-memcached
[2]: https://www.coursera.org
[3]: https://docs.datadoghq.com/integrations/amazon_web_services/
[4]: https://app.datadoghq.com/integrations/amazon-web-services
[5]: https://docs.datadoghq.com/integrations/amazon_web_services/#installation
[6]: https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/IAM.html
[7]: https://app.datadoghq.com/integrations/amazon-elasticache
[8]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_elasticache/amazon_elasticache_metadata.csv
[10]: https://docs.datadoghq.com/help/
[11]: https://www.datadoghq.com/blog/collecting-elasticache-metrics-its-redis-memcached-metrics

