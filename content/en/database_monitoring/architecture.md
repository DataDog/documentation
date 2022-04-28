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


## Requirements

To be able to use Database Monitoring for any of your DBs, you will need to have the following:
* A Datadog Agent
* Host for your Datadog Agent
* Read-only access for your DBs

### Agent

* The Agent is lightweight software that installing directly on to the host that’s hosting your Database is recommended.
* The Agent monitors system metrics such as CPU, Memory, and Network. It also connects to the database as a SQL user
* For cloud-hosted databases such as AWS RDS and Azure SQL, the Agent should be configured to connect to these databases remotely.

#### Self-Hosted

Diagram of Host/Agent/DB

The Datadog agent is used to collect system metrics from the OS host, database metrics directly from the database as well as database logs.

[Datadog Agent Installation Documentation][]


[Postgres Integration Documentation][]
[MySQL Integration Documentation][]

We recommend installing the Agent directly onto the database host so that you have full visibility into the health of your system running the database process.

You’ll need to grant the Agent read-only access to your database as well as set up the integration configurations. More specifically, the agent will need to login as a user to be able to run read-only queries on your DB.

Instructions on DBM:
* Postgres DBM Documentation
* Postgres Metrics Collected
* MySQL DBM Documentation
* MySQL Metrics Collected

#### Cloud Hosted
If you’re using AWS RDS/Aurora, Google Cloud SQL, or Azure, the Agent must be installed remotely on a separate host and configured to connect to each managed instance

We crawl system metrics like CPU, Memory, Disk Usage, Logs, and related telemetry directly from the cloud provider.
* RDS Integration Docs
* Diagram of RDS/Host/Agent

You can install the Agent on any cloud VM (e.g. EC2) as long as traffic can reach your database instance.

If you are not running your own Kubernetes cluster already, it is recommended to use your cloud provider’s orchestration tools such as AWS ECS to be able to host the Datadog agent since the agent already exists as a docker container.

* AWS ECS Documentation
* Docker Agent

If you’re already running your apps on Kubernetes, then we would recommend using the Datadog Cluster Agent as this allows you to run cluster checks across your pods.

Diagram of Cluster Agent, RDS, DBs, K8s

https://www.datadoghq.com/blog/datadog-cluster-agent/

#### Why is cluster agent preferred?
* You do not need to figure out how to distribute the RDS instances across a pool of agents. The cluster agent does this for you. This ensures that only one instance of each check runs as opposed to each node-based Agent pod running this corresponding check. The Cluster Agent holds the configurations and dynamically dispatches them to node-based Agents. The Agents connect to the Cluster Agent every 10 seconds and retrieve the configurations to run. If an Agent stops reporting, the Cluster Agent removes it from the active pool and dispatches the configurations to other Agents. This ensures one (and only one) instance always runs even as nodes are added and removed from the cluster. This becomes important when you have a large number of RDS instances so that the cluster agent can spread out the cluster checks across the different nodes.
* Cluster Checks Documentation

#### Cluster Agent Setup
* K8s Integrations Autodiscovery
* DBM with Kubernetes/Cluster Agent


#### Aurora
If you’re using Aurora, the Agent will need to be connected to the individual Aurora instance (not the cluster endpoint) because…


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

