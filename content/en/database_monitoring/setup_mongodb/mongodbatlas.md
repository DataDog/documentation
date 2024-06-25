---
title: Setting Up Database Monitoring for MongoDB Atlas
kind: documentation
description: Install and configure Database Monitoring for MongoDB Atlas
further_reading:
- link: "/integrations/mongo/"
  tag: "Documentation"
  text: "Basic MongoDB Integration"

---

<div class="alert alert-info">Database Monitoring for MongoDB is in private beta. If you are interested in participating, reach out to your Datadog Customer Success Manager.</div>

Database Monitoring provides deep visibility into your MongoDB databases by exposing database metrics, operation samples, explain plans, and events.

## Before you begin

Supported MongoDB major versions
: 4.4, 5.0, 6.0, 7.0

{{% dbm-mongodb-before-you-begin %}}

## Setup

To enable Database Monitoring for your database:

1. [Grant the Agent access to your MongoDB Atlas Cluster](#grant-the-agent-access-to-your-mongodb-atlas-cluster)
2. [Install and configure the Agent](#install-and-configure-the-agent)

### Grant the Agent access to your MongoDB Atlas Cluster

The Datadog Agent requires read-only access to the MongoDB Atlas Cluster to collect statistics and queries.

#### Create a custom monitoring role

1. In the MongoDB Atlas UI, navigate to the **Database Access** tab.
2. On the **Custom Roles** tab, click **Add New Custom Role**.
3. Enter a **Custom Role Name**, such as `datadog`.
4. Add the following permissions to the custom role:
   - `read` on the `admin` database
   - `read` on the `local` database
   - `clusterMonitor` on the `admin` database
   - `read` on the databases you want to monitor, or `readAnyDatabase` to monitor all databases
5. Click **Add Custom Role**.

#### Create a monitoring user with the custom monitoring role

1. In the MongoDB Atlas UI, navigate to the **Database Access** tab.
2. On the **Database Users** tab, click **Add New Database User**.
3. Under the **Authentication Method**, select **Password**.
4. Enter the username and password.
5. Under **Database User Privileges**, expand **Custom Roles** and select the custom monitoring role you created in the previous step.
6. Click **Add User**.
7. Note the username and password for the monitoring user, so you can configure the Agent.

### Install and configure the Agent

To monitor your MongoDB Atlas Cluster, you must install and configure the Datadog Agent on a host that can [remotely access][1] your MongoDB Atlas Cluster. This host can be a Linux host, a Docker container, or a Kubernetes pod.

#### Get the individual MongoDB instance hostname and port from the SRV connection string

Applications usually connect to MongoDB Atlas using an SRV connection string, but the Datadog Agent must connect directly to the individual MongoDB instance being monitored. If the Agent connects to different MongoDB instance while it is running (as in the case of failover, load balancing, and so on), the Agent calculates the difference in statistics between two hosts, producing inaccurate metrics.

To get the individual MongoDB instance hostname and port, you can use the `dig` command to resolve the SRV connection string:

{{< tabs >}}
{{% tab "Replica Set" %}}

##### Replica set members

For a sharded cluster with the SRV connection string `mongodb+srv://XXXXX.XXX.mongodb.net/`:

```shell
dig +short SRV _mongodb._tcp.XXXXX.XXX.mongodb.net
```

The output should be similar to:

```shell
0 0 27017 XXXXX-00-00.4zh9o.mongodb.net.
0 0 27017 XXXXX-00-01.4zh9o.mongodb.net.
0 0 27017 XXXXX-00-02.4zh9o.mongodb.net.
```

In this example, the individual MongoDB instances from the replica set are `XXXXX-00-00.4zh9o.mongodb.net:27017`, `XXXXX-00-01.4zh9o.mongodb.net:27017`, and `XXXXX-00-02.4zh9o.mongodb.net:27017`. You can use one of these hostnames to configure the Agent.
{{% /tab %}}
{{% tab "Sharded Cluster" %}}

##### Mongos routers

For a sharded cluster with the SRV connection string `mongodb+srv://XXXXX.XXX.mongodb.net/`:

```shell
dig +short SRV _mongodb._tcp.XXXXX.XXX.mongodb.net
```

The output should be similar to:

```shell
0 0 27016 XXXXX-00-00.4zh9o.mongodb.net.
0 0 27016 XXXXX-00-01.4zh9o.mongodb.net.
0 0 27016 XXXXX-00-02.4zh9o.mongodb.net.
```

In this example, the individual Mongos routers are `XXXXX-00-00.4zh9o.mongodb.net:27016`, `XXXXX-00-01.4zh9o.mongodb.net:27016`, and `XXXXX-00-02.4zh9o.mongodb.net:27016`. You can use one of these hostnames to configure the Agent.

##### Shard members

To get the individual MongoDB instances for each shard, you can connect to the Mongos router and run the following command:

```shell
use admin
db.runCommand("getShardMap")
```

The output should be similar to:

```shell
{
  "map" : {
    "shard-0": "shard-0/XXXXX-00-00.4zh9o.mongodb.net:27017,XXXXX-00-01.4zh9o.mongodb.net:27017,XXXXX-00-02.4zh9o.mongodb.net:27017",
    "shard-1": "shard-1/XXXXX-01-00.4zh9o.mongodb.net:27017,XXXXX-01-01.4zh9o.mongodb.net:27017,XXXXX-01-02.4zh9o.mongodb.net:27017"
  },
  "hosts": {
    "XXXXX-00-00.4zh9o.mongodb.net:27017": "shard-0",
    "XXXXX-00-01.4zh9o.mongodb.net:27017": "shard-0",
    "XXXXX-00-02.4zh9o.mongodb.net:27017": "shard-0",
    "XXXXX-01-00.4zh9o.mongodb.net:27017": "shard-1",
    "XXXXX-01-01.4zh9o.mongodb.net:27017": "shard-1",
    "XXXXX-01-02.4zh9o.mongodb.net:27017": "shard-1",
    "XXXXX-00-00-config.4zh9o.mongodb.net:27017": "config",
    "XXXXX-00-01-config.4zh9o.mongodb.net:27017": "config",
    "XXXXX-00-02-config.4zh9o.mongodb.net:27017": "config"
  },
  "ok" : 1
}
```

In this example, the individual MongoDB instances for shard-0 are: 
- `XXXXX-00-00.4zh9o.mongodb.net:27017`
- `XXXXX-00-01.4zh9o.mongodb.net:27017`
- `XXXXX-00-02.4zh9o.mongodb.net:27017`

For shard-1, they are:
- `XXXXX-01-00.4zh9o.mongodb.net:27017`
- `XXXXX-01-01.4zh9o.mongodb.net:27017`
- `XXXXX-01-02.4zh9o.mongodb.net:27017`

For the config server, they are:
- `XXXXX-00-00-config.4zh9o.mongodb.net:27017`
- `XXXXX-00-01-config.4zh9o.mongodb.net:27017`
- `XXXXX-00-02-config.4zh9o.mongodb.net:27017`

You can use one of these hostnames to configure the Agent.
{{% /tab %}}
{{< /tabs >}}

#### Install the beta version of the Datadog Agent

Database Monitoring for MongoDB is available in the beta version of the Datadog Agent. To install the beta version of the Datadog Agent, follow the instructions for your environment:

{{< tabs >}}
{{% tab "Linux Host" %}}
{{% dbm-mongodb-agent-beta-install-linux %}}
{{% /tab %}}
{{% tab "Docker" %}}
{{% dbm-mongodb-agent-beta-install-docker %}}
{{% /tab %}}
{{% tab "Kubernetes" %}}
{{% dbm-mongodb-agent-beta-install-kubernetes %}}
{{% /tab %}}
{{< /tabs >}}

#### Create the configuration file

{{< tabs >}}
{{% tab "Replica Set" %}}
{{% dbm-mongodb-agent-config-replica-set %}}
{{% /tab %}}
{{% tab "Sharded Cluster" %}}
{{% dbm-mongodb-agent-config-sharded-cluster %}}
{{% /tab %}}
{{< /tabs >}}

#### Set up the Agent

{{< tabs >}}
{{% tab "Linux Host" %}}
{{% dbm-mongodb-agent-setup-linux %}}
{{% /tab %}}
{{% tab "Docker" %}}
{{% dbm-mongodb-agent-setup-docker %}}
{{% /tab %}}
{{% tab "Kubernetes" %}}
{{% dbm-mongodb-agent-setup-kubernetes %}}
{{% /tab %}}
{{< /tabs >}}

[1]: /database_monitoring/architecture/#cloud-managed-databases
