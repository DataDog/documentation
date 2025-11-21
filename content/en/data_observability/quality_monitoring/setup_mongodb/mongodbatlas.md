---
title: Setting Up Database Monitoring for MongoDB Atlas
description: Install and configure Database Monitoring for MongoDB Atlas
aliases:
- /database_monitoring/setup_mongodb/mongodbatlas/
further_reading:
  - link: "/integrations/mongo/"
    tag: "Documentation"
    text: "Basic MongoDB Integration"
---

Database Monitoring offers comprehensive insights into your MongoDB databases by providing access to critical metrics, slow operations, operation samples, explain plans, and replication state changes. To take advantage of Database Monitoring for MongoDB, ensure that the Datadog Agent is installed and configured to connect to your MongoDB Atlas instances. This guide outlines the steps to set up Database Monitoring for MongoDB Atlas.

## Before you begin

Supported MongoDB major versions
: 4.4, 5.0, 6.0, 7.0, 8.0

Supported MongoDB Atlas cluster tiers
: M10 and higher<br/><br/>
**Note**: MongoDB Atlas Serverless instances or shared clusters (M0 Sandbox, M2, M5) are not supported.

{{% dbm-mongodb-before-you-begin %}}

## Setup

To enable Database Monitoring for your database:

1. [Grant the Agent access to your MongoDB Atlas Cluster](#grant-the-agent-access-to-your-mongodb-atlas-cluster)
2. [Install and configure the Agent](#install-and-configure-the-agent)
3. [(Optional) Install the MongoDB Atlas integration](#install-the-mongodb-atlas-integration)

### Grant the Agent access to your MongoDB Atlas Cluster

The Datadog Agent requires read-only access to the MongoDB Atlas Cluster to collect statistics and queries.

#### Create a custom monitoring role

1. In the MongoDB Atlas UI, navigate to the **Database Access** tab.
2. On the **Custom Roles** tab, click **Add New Custom Role**.
3. Enter a **Custom Role Name**, such as `datadog`.
4. Add the following permissions to the custom role:
    - `read` on the `admin` database
    - `read` on the `local` database
    - `read` on the `config` database (Sharded Cluster only)
    - `clusterMonitor` on the `admin` database
    - `read` on the user created databases you want to monitor, or `readAnyDatabase` to monitor all databases
5. Click **Add Custom Role**.

#### Create a monitoring user with the custom monitoring role

1. In the MongoDB Atlas UI, navigate to the **Database Access** tab.
2. On the **Database Users** tab, click **Add New Database User**.
3. Under the **Authentication Method**, select **Password**.
4. Enter the username and password.
5. Under **Database User Privileges**, expand **Custom Roles** and select the custom monitoring role you created in the previous step.
6. Click **Add User**.
7. Note the username and password for the monitoring user, so you can configure the Agent.

### Securely store your password

{{% dbm-secret %}}

### Install and configure the Agent

To monitor your MongoDB Atlas Cluster, you must install and configure the Datadog Agent on a host that can [remotely access][1] your MongoDB Atlas Cluster. This host can be a Linux host, a Docker container, or a Kubernetes pod.

#### Get the individual MongoDB instance hostname and port from the SRV connection string

Applications usually connect to MongoDB Atlas using an SRV connection string, but the Datadog Agent must connect directly to the individual MongoDB instance being monitored. If the Agent connects to different MongoDB instance while it is running (as in the case of failover, load balancing, and so on), the Agent calculates the difference in statistics between two hosts, producing inaccurate metrics.

To get the individual MongoDB instance hostname and port, you can use network utility command line tools like `dig` in Linux or `nslookup` in Windows to resolve the SRV connection string.

{{< tabs >}}
{{% tab "Replica Set" %}}

##### Replica set members

For a non-sharded (replica set) cluster with the SRV connection string `mongodb+srv://XXXXX.XXX.mongodb.net/`:

Use `dig` in Linux to resolve the SRV connection string:

{{< code-block lang="shell" >}}
dig +short SRV _mongodb._tcp.XXXXX.XXX.mongodb.net
{{< /code-block >}}

The output should be similar to:

{{< code-block lang="shell" >}}
0 0 27017 XXXXX-00-00.4zh9o.mongodb.net.
0 0 27017 XXXXX-00-01.4zh9o.mongodb.net.
0 0 27017 XXXXX-00-02.4zh9o.mongodb.net.
{{< /code-block >}}

Use `nslookup` in Windows to resolve the SRV connection string:

{{< code-block lang="shell" >}}
nslookup -type=SRV _mongodb._tcp.XXXXX.XXX.mongodb.net
{{< /code-block >}}

The output should be similar to:

{{< code-block lang="shell" >}}
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27017 XXXXX-00-00.4zh9o.mongodb.net.
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27017 XXXXX-00-01.4zh9o.mongodb.net.
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27017 XXXXX-00-02.4zh9o.mongodb.net.
{{< /code-block >}}

In this example, the individual MongoDB instances `<HOST>:<PORT>` from the replica set are:

-   `XXXXX-00-00.4zh9o.mongodb.net:27017`
-   `XXXXX-00-01.4zh9o.mongodb.net:27017`
-   `XXXXX-00-02.4zh9o.mongodb.net:27017`

You can use the `<HOST>:<PORT>` retrieved from the SRV connection string to configure the Agent.
{{% /tab %}}
{{% tab "Sharded Cluster" %}}

##### mongos routers

For a sharded cluster with the SRV connection string `mongodb+srv://XXXXX.XXX.mongodb.net/`:

Use `dig` in Linux to resolve the SRV connection string:

{{< code-block lang="shell" >}}
dig +short SRV _mongodb._tcp.XXXXX.XXX.mongodb.net
{{< /code-block >}}

The output should be similar to:

{{< code-block lang="shell" >}}
0 0 27016 XXXXX-00-00.4zh9o.mongodb.net.
0 0 27016 XXXXX-00-01.4zh9o.mongodb.net.
0 0 27016 XXXXX-00-02.4zh9o.mongodb.net.
{{< /code-block >}}

Use `nslookup` in Windows to resolve the SRV connection string:

{{< code-block lang="shell" >}}
nslookup -type=SRV _mongodb._tcp.XXXXX.XXX.mongodb.net
{{< /code-block >}}

The output should be similar to:

{{< code-block lang="shell" >}}
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27016 XXXXX-00-00.4zh9o.mongodb.net.
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27016 XXXXX-00-01.4zh9o.mongodb.net.
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27016 XXXXX-00-02.4zh9o.mongodb.net.
{{< /code-block >}}

In this example, the individual `mongos` routers are:

-   `XXXXX-00-00.4zh9o.mongodb.net:27016`
-   `XXXXX-00-01.4zh9o.mongodb.net:27016`
-   `XXXXX-00-02.4zh9o.mongodb.net:27016`.

You can use the `<HOST>:<PORT>` retrieved from the SRV connection string to configure the Agent.

##### Shard members

To get the individual MongoDB instances for each shard, you can connect to the `mongos` router and run the following command:

{{< code-block lang="shell" >}}
use admin
db.runCommand("getShardMap")
{{< /code-block >}}

The output should be similar to:

{{< code-block lang="shell" >}}
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
{{< /code-block >}}

In this example, the individual MongoDB instances for shard-0 are:

-   `XXXXX-00-00.4zh9o.mongodb.net:27017`
-   `XXXXX-00-01.4zh9o.mongodb.net:27017`
-   `XXXXX-00-02.4zh9o.mongodb.net:27017`

For shard-1, they are:

-   `XXXXX-01-00.4zh9o.mongodb.net:27017`
-   `XXXXX-01-01.4zh9o.mongodb.net:27017`
-   `XXXXX-01-02.4zh9o.mongodb.net:27017`

For the config server, they are:

-   `XXXXX-00-00-config.4zh9o.mongodb.net:27017`
-   `XXXXX-00-01-config.4zh9o.mongodb.net:27017`
-   `XXXXX-00-02-config.4zh9o.mongodb.net:27017`

You can use one of these hostnames to configure the Agent.
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

### Install the MongoDB Atlas integration

To collect more comprehensive database metrics from MongoDB Atlas, install the [MongoDB Atlas integration][3] (optional).

## Data Collected

### Metrics

Refer to the [MongoDB integration documentation][4] for a comprehensive list of metrics collected by the MongoDB integration.

{{% dbm-mongodb-agent-data-collected %}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /database_monitoring/architecture/#cloud-managed-databases
[2]: /account_management/api-app-keys/
[3]: /integrations/mongodb_atlas/
[4]: /integrations/mongodb_atlas/#metrics
