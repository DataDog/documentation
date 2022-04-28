---
title: Database Monitoring Architecture in Datadog
kind: documentation
description: Learn about Database Monitoring and get started
further_reading:
- link: "https://www.datadoghq.com/blog/database-performance-monitoring-datadog"
  tag: "Blog"
  text: "Monitor and visualize database performance"
- link: "/database_monitoring/data_collected/"
  tag: "Documentation"
  text: "Data Collected"
- link: "/database_monitoring/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting"

---


## Overview

The steps required for setting up Database Monitoring in Datadog varies based on the type of Database you're using (Postgres, MySQL, SQL Server), and the host provider (self-hosted, AWS, Google Cloud SQL, or Azure). No matter which your database or host you choose, to be able to use Database Monitoring for your Databases, you need the following:

* [A Datadog Agent][1]
* Host for your Datadog Agent
* Read-only access for your DBs

### Agent

The Datadog Agent is lightweight software that monitors system metrics such as CPU, Memory, and Network. It also connects to the database as a SQL user. In most cases, you install directly onto the host that’s hosting your Database. For cloud-hosted databases such as AWS RDS and Azure SQL, the Agent should be configured to connect to these databases remotely.

### Host

#### Self-hosted

{{< img src="database_monitoring/dbm_architecture_self-hosted.png" alt="Some really good alt text" style="width:70%;">}}

In a self-hosted setup, the Datadog Agent is used to collect system metrics from the OS host, database metrics directly from the database, as well as database logs.

* [System metrics collected on Postgres][2]
* [System metrics collected on MySQL][3]


For self-hosted setups, you should install the Agent directly onto the database host so that you have full visibility into the health of your system running the database process.

You need to grant the Agent read-only access to your database, as well as set up the integration configurations. The Agent needs to be able to login as a user to be able to run read-only queries on your database.

Instructions for setting up Database Monitoring with a self-hosted provider:

* [Postgres][4]
* [MySQL][5]


#### Cloud-hosted

If your setup is cloud-hosted, and you are using [AWS RDS][6] or Aurora, Google Cloud SQL, or Azure, the Agent must be installed remotely on a separate host and configured to connect to each managed instance.

Database monitoring collects system metrics such as CPU, memory, disk usage, logs, and related telemetry directly from the cloud provider.

{{< img src="database_monitoring/dbm_architecture_cloud-hosted.png" alt="Some really good alt text" style="width:70%;">}}

You can install the Agent on any cloud VM (for example, EC2) as long as traffic can reach your database instance.

If you are not already running your own Kubernetes cluster, Datadog recommends using your cloud provider’s orchestration tools. You can use [AWS ECS][7] to host the Datadog Agent, as [the Agent already exists as a Docker container][8].


If you’re already running your apps on [Kubernetes][9], Datadog recommends using the [Datadog Cluster Agent with Database Monitoring][10], as this allows you to run [cluster checks][11] across your pods.

{{< img src="database_monitoring/dbm_architecture_clusters.png" alt="Some really good alt text" style="width:70%;">}}

Using the [Cluster Agent][12] is preferred because it distributes the RDS instances across a pool of agents for you. This ensures that only one instance of each check runs as opposed to each node-based Agent pod running this corresponding check. The Cluster Agent holds the configurations and dynamically dispatches them to node-based Agents. The Agents on each node connect to the Cluster Agent every 10 seconds and retrieve the configurations to run. If an Agent stops reporting, the Cluster Agent removes it from the active pool and dispatches the configurations to other Agents. This ensures one (and only one) instance always runs even as nodes are added and removed from the cluster. This becomes important when you have a large number of RDS instances so that the Cluster Agent can spread out the cluster checks across the different nodes.



##### Aurora

If you’re using [Aurora][13], the Agent needs to be connected to the individual Aurora instance (not the cluster endpoint) because the Agent must connect directly to the host being monitored. For self-hosted databases, `127.0.0.1` or the socket is preferred.

The Agent should not connect to the database through a proxy, load balancer, connection pooler such as `pgbouncer`, or the Aurora cluster endpoint. While this can be an anti-pattern for client applications, each Datadog Agent must have knowledge of the underlying hostname and should be a single host for its lifetime, even in cases of failover. If the Datadog Agent connects to different hosts while it is running, the values of metrics become incorrect. This is because the values depend on the state of the previous snapshot. The Agent takes snapshots at different points in time, if it takes snapshots from two different hosts, then the stats can be wildly different.



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/basic_agent_usage/
[2]: /integrations/postgres/?tab=host#data-collected
[3]: /integrations/mysql/?tab=host#data-collected
[4]: /database_monitoring/setup_postgres/selfhosted/
[5]: /database/monitoring/setup_mysql/selfhosted/
[6]: /integrations/amazon_rds/
[7]: /agent/amazon_ecs/
[8]: /agent/docker/
[9]: /agent/kubernetes/integrations/
[10]: /database_monitoring/setup_postgres/rds/?tab=kubernetes
[11]: /agent/cluster_agent/clusterchecks/
[12]: https://www.datadoghq.com/blog/datadog-cluster-agent/
[13]: /database_monitoring/setup_postgres/aurora/
