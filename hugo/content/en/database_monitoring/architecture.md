---
title: DBM Setup Architectures
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

The steps required for setting up Database Monitoring in Datadog vary based on the type of database you're using (Postgres, MySQL, SQL Server, Oracle), and the host provider (self-hosted, AWS, Google Cloud SQL, Azure, or Oracle). To use Database Monitoring for any database on any host provider, you need the following:

* [A Datadog Agent][1]
* Host for your Datadog Agent
* Read-only access for your databases

## Agent

The Datadog Agent is lightweight software that monitors system metrics such as CPU, memory, and network activity. It also connects to the database as a SQL user to collect data about database performance.

For self-hosted databases, you install the agent directly onto the host that is hosting your database. For cloud-managed databases such as Amazon RDS and Azure SQL, you configure the Agent to connect to your databases remotely.


### Self-hosted databases

{{< img src="database_monitoring/dbm_architecture_self-hosted.png" alt="The self-hosted setup goes through the database process on the database host, which also hosts the Agent. Then after connecting to the internet, it goes through to Datadog's backend.">}}

In a self-hosted setup, the Datadog Agent collects system metrics from the operating system host, database metrics directly from the database, and log events from database logs.

* [System metrics collected on Postgres][2]
* [System metrics collected on MySQL][3]
* [System metrics collected on SQL Server][4]
* [System metrics collected on Oracle][17]

For self-hosted setups, you install the Agent directly onto the database host so that you have full visibility into the health of your system running the database process.

You grant the Agent read-only access to your database, and configure the integration. The Agent must log in as a user so it can run read-only queries on your database.

Instructions for setting up Database Monitoring with a self-hosted provider:

* [Postgres][5]
* [MySQL][6]
* [SQL Server][7]
* [Oracle][16]

### Cloud-managed databases

If your setup is cloud-managed (with providers such as [Amazon RDS][8] or Aurora, Google Cloud SQL, or Azure), you install the Agent on a separate host and configure it to connect to each managed instance.

Database Monitoring collects system metrics such as CPU, memory, disk usage, logs, and related telemetry directly from the cloud provider using the Datadog integration with that provider.

{{< img src="database_monitoring/dbm_architecture_cloud-hosted.png" alt="The database instance is separate from the Agent host, which is separate from the Datadog backend. The cloud API connects to the Datadog AWS integration through the internet.">}}

You can install the Agent on any cloud VM (for example, EC2) provided the Agent can connect to your database instances.

If you are not running your own Kubernetes cluster, Datadog recommends using your cloud provider's orchestration tools. For example, you can use [Amazon ECS][9] to host the Datadog Agent, as [the Agent already exists as a Docker container][10].

### Kubernetes

If you are running your apps on [Kubernetes][11], use the [Datadog Cluster Agent with Database Monitoring][12], which can run [cluster checks][13] across your pods.

{{< img src="database_monitoring/dbm_architecture_clusters.png" alt="Database instances in a cloud provider connect to nodes in a Kubernetes cluster, which then connect to the Datadog backend through the internet. The cloud API connects directly to the Datadog AWS integration.">}}

The [Cluster Agent][14] automatically distributes the database instances across a pool of Agents. This ensures that only one instance of each check runs, as opposed to each node-based Agent pod running this corresponding check. The Cluster Agent holds the configurations and dynamically dispatches them to node-based Agents. The Agents on each node connect to the Cluster Agent every 10 seconds and retrieve the configurations to run.

If an Agent stops reporting, the Cluster Agent removes it from the active pool and dispatches the configurations to other Agents. This ensures one (and only one) instance always runs even as nodes are added and removed from the cluster. This becomes important when you have a large number of database instances --- the Cluster Agent spreads the cluster checks across the different nodes.

#### Aurora

If you are using [Aurora][15], the Agent must be connected to the individual Aurora instance (not the cluster endpoint) because the Agent must connect directly to the host being monitored.

For monitoring Aurora databases, the Agent should not connect to the database through a proxy, load balancer, connection pooler such as `pgbouncer`, or the Aurora cluster endpoint. Each Datadog Agent must have knowledge of the underlying hostname and should run on a single host for its lifetime, even in cases of failover. Otherwise, the values of metrics become incorrect.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/basic_agent_usage/
[2]: /integrations/postgres/?tab=host#data-collected
[3]: /integrations/mysql/?tab=host#data-collected
[4]: /integrations/sqlserver/?tabs=host#data-collected
[5]: /database_monitoring/setup_postgres/selfhosted/
[6]: /database_monitoring/setup_mysql/selfhosted/
[7]: /database_monitoring/setup_sql_server/selfhosted/
[8]: /integrations/amazon_rds/
[9]: /agent/amazon_ecs/
[10]: /agent/docker/
[11]: /agent/kubernetes/integrations/
[12]: /database_monitoring/setup_postgres/rds/?tab=kubernetes
[13]: /agent/cluster_agent/clusterchecks/
[14]: https://www.datadoghq.com/blog/datadog-cluster-agent/
[15]: /database_monitoring/setup_postgres/aurora/
[16]: /database_monitoring/setup_oracle/selfhosted/
[17]: /integrations/oracle/?tab=linux#data-collected
