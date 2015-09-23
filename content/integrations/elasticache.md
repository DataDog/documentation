---
title: Datadog-AWS ElastiCache Integration
integration_title: AWS ElastiCache
kind: integration
doclevel: basic
---

To collect all available ElastiCache metrics, you need to do two things:

1.  [Turn on the ElastiCache integration](https://www.google.com/url?q=https%3A%2F%2Fapp.datadoghq.com%2Faccount%2Fsettings%23integrations%2Famazon_elasticache&sa=D&sntz=1&usg=AFQjCNF-yA6DxhRObVxskvcLOtHO5auaAg) to pull metrics from ElastiCache into Datadog
2.  Set up the Datadog Agent as described in this article (optional, but recommended)


## Collecting native metrics with the Agent

The following diagram shows how Datadog collects metrics directly from CloudWatch via the native ElastiCache integration, and how it can additionally collect native metrics directly from the backend technology: Redis or Memcached. By collecting from the backend directly, you will have access to a greater number of important metrics, and at a higher resolution.

![ElastiCache, Redis and Memcached integrations](/static/images/elasticache1.png)

## How this works

Because the agent metrics will be tied to the EC2 instance where the agent is running and not to the actual ElastiCache instance, you will need to use the `cacheclusterid` tag to connect all metrics together. Once the agent is configured with the same tags as the ElastiCache instance, combining Redis/Memcached metrics with ElastiCache metrics is straightforward.

## Step-by-step

Since the Agent is not running on an actual ElastiCache instance, but on a remote machine, the key to setting up this integration correctly is telling the Agent where to collect the metrics from.

### 1. Gather connection details for your ElastiCache instance

First navigate to the AWS Console, open the ElastiCache section and then the Cache Clusters tab to find the cluster you want to monitor. It should look like:

![ElastiCache Clusters in AWS console](/static/images/elasticache2.png)

Then click on the “node” link to access its endpoint URL:

![Node link in AWS console](/static/images/elasticache3.png)

Write down the endpoint URL (e.g. **replica-001.xxxx.use1.cache.amazonaws.com**) and the `cacheclusterid` (e.g. **replica-001**). You will need these values to configure the agent and to create graphs and dashboards.


### 2. Configure the Agent

The Redis/Memcached integrations support the tagging of individual cache instances. Originally designed to allow the monitoring of multiple instances on the same machine, you can use these tags to your advantage. Here is an example of a configuration for ElastiCache with Redis using `redisdb.yaml`, usually found in `/etc/dd-agent/conf.d`


	Make sure you replace the API and or APP key below with the ones for your account
	init\_config:
	instances:
	  - host: replica-001.xxxx.use1.cache.amazonaws.com # Endpoint URL from AWS console
	    port: 6379
	    tags:
	  		- cacheclusterid:replicaa-001 # Cache Cluster ID from AWS console

Then restart the agent: `sudo /etc/init.d/datadog-agent restart` (on linux).


### 3. Visualize ElastiCache and Redis/Memcached metrics together

After a few minutes, ElastiCache metrics and Redis/Memcached metrics will be accessible in Datadog for graphing, monitoring, etc.

Here's an example of setting up a graph to combine cache hit metrics from ElastiCache with native latency metrics from Redis using the same `cacheclusterid` tag **replicaa-001**.

![ElastiCache and Cache metrics](/static/images/elasticache4.png)


## What's next?

Not working? Have questions for us? Don’t hesitate to contact our [support team](mailto:support@datadoghq.com).