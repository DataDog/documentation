---
title: Setting Up Database Monitoring for Amazon DocumentDB
further_reading:
    - link: '/integrations/mongo/'
      tag: 'Documentation'
      text: 'Basic MongoDB Integration'
---

Database Monitoring offers comprehensive insights into your DocumentDB databases by providing access to critical metrics, operation samples, explain plans, and replication state changes. To take advantage of Database Monitoring for Amazon DocumentDB, ensure that the Datadog Agent is installed and configured to connect to your DocumentDB instances. This guide outlines the steps to set up Database Monitoring for Amazon DocumentDB.

## Before you begin

Supported Amazon DocumentDB major versions
: 4.0, 5.0

Supported Amazon DocumentDB cluster types
: Instance Based.<br /><br />
**Note**: Amazon DocumentDB Elastic Cluster is not supported.

{{% dbm-mongodb-before-you-begin %}}

## Setup

To enable Database Monitoring for your database:

1. [Grant the Agent access to your Amazon DocumentDB instances](#grant-the-agent-access-to-your-amazon-documentdb-instances)
2. [Install and configure the Agent](#install-and-configure-the-agent)
3. [(Optional) Install the Amazon DocumentDB integration](#install-the-amazon-documentdb-integration)

### Grant the Agent access to your Amazon DocumentDB instances

The Datadog Agent requires read-only access to the Amazon DocumentDB instance to collect statistics and queries.

{{< tabs >}}
{{% tab "Replica Set" %}}

In a Mongo shell, authenticate to the primary node of the replica set, create a read-only user for the Datadog Agent in the `admin` database, and grant the required permissions:

{{< code-block lang="shell" >}}

# Authenticate as the admin user.

use admin
db.auth("admin", "<YOUR_AMAZON_DOCUMENTDB_ADMIN_PASSWORD>")

# Create the user for the Datadog Agent.

db.createUser({
"user": "datadog",
"pwd": "<UNIQUE_PASSWORD>",
"roles": [
{ role: "read", db: "admin" },
{ role: "read", db: "local" },
{ role: "clusterMonitor", db: "admin" }
]
})
{{< /code-block >}}

Grant additional permissions to the `datadog` user in the databases you want to monitor:

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
{ role: "read", db: "mydatabase" },
{ role: "read", db: "myotherdatabase" }
])
{{< /code-block >}}

Alternatively, you can grant `readAnyDatabase` role to the `datadog` user in the `admin` database to monitor all databases:

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
{ role: "readAnyDatabase", db: "admin" }
])
{{< /code-block >}}

{{% /tab %}}
{{% tab "Sharded Cluster" %}}

1. For each shard in your cluster, connect to the primary node of the shard, create a read-only user for the Datadog Agent in the `admin` database, and grant the required permissions:

{{< code-block lang="shell" >}}

# Authenticate as the admin user.

use admin
db.auth("admin", "<YOUR_AMAZON_DOCUMENTDB_ADMIN_PASSWORD>")

# Create the user for the Datadog Agent.

db.createUser({
"user": "datadog",
"pwd": "<UNIQUE_PASSWORD>",
"roles": [
{ role: "read", db: "admin" },
{ role: "read", db: "local" },
{ role: "clusterMonitor", db: "admin" }
]
})
{{< /code-block >}}

Grant additional permissions to the `datadog` user in the databases you want to monitor:

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
{ role: "read", db: "mydatabase" },
{ role: "read", db: "myotherdatabase" }
])
{{< /code-block >}}

Alternatively, you can grant the `readAnyDatabase` role to the `datadog` user in the `admin` database to monitor all databases:

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
{ role: "readAnyDatabase", db: "admin" }
])
{{< /code-block >}}

2. Follow the same steps and create the same user from a `mongos` proxy. This action creates the local user in the config servers and allows direct connection.

{{% /tab %}}
{{< /tabs >}}

### Securely store your password

{{% dbm-secret %}}

### Install and configure the Agent

To monitor your Amazon DocumentDB Cluster, you must install and configure the Datadog Agent on a host that can [remotely access][1] your Amazon DocumentDB Cluster. This host can be a Linux host, a Docker container, or a Kubernetes pod.

<div class="alert alert-info">Amazon DocumentDB Elastic clusters are not supported because they only expose the cluster (mongos) endpoints.</div>

#### Create the configuration file

{{< tabs >}}
{{% tab "Replica Set" %}}
{{% dbm-amazon-documentdb-agent-config-replica-set %}}
{{% /tab %}}
{{% tab "Sharded Cluster" %}}
{{% dbm-amazon-documentdb-agent-config-sharded-cluster %}}
{{% /tab %}}
{{< /tabs >}}

Complete this section if you have installed the [Amazon DocumentDB integration][3] to enrich instances
with DocumentDB integration telemetry.

```yaml
## @param aws - mapping - optional
## This block defines the configuration for Amazon DocumentDB instances.
## These values are only applied when `dbm: true` option is set.
#
aws:
    ## @param instance_endpoint - string - optional
    ## Equal to the Endpoint.Address of the instance the agent is connecting to.
    ## This value is optional if the value of `host` is already configured to the instance endpoint.
    ##
    ## For more information on instance endpoints,
    ## see the AWS docs https://docs.aws.amazon.com/documentdb/latest/developerguide/API_Endpoint.html
    #
    instance_endpoint: <AWS_INSTANCE_ENDPOINT>
    ## @param cluster_identifier - string - optional
    ## Equal to the Cluster identifier of the instance the agent is connecting to.
    ## This value is optional if the value of `cluster_name` is already configured to the cluster identifier.
    ##
    ## For more information on cluster identifiers,
    ## see the AWS docs https://docs.aws.amazon.com/documentdb/latest/developerguide/API_DBCluster.html
    #
    cluster_identifier: <AWS_CLUSTER_IDENTIFIER_ENDPOINT>
```

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

### Install the Amazon DocumentDB integration

To collect more comprehensive database metrics from Amazon DocumentDB, install the [Amazon DocumentDB integration][3] (optional).

## Data Collected

### Metrics

Refer to the [MongoDB integration documentation][2] for a comprehensive list of metrics collected by the MongoDB integration.

{{% dbm-amazon-documentdb-agent-data-collected %}}

[1]: /account_management/api-app-keys/
[2]: /integrations/mongo/?tab=replicaset#metrics
[3]: /integrations/amazon_documentdb/
[4]: /integrations/amazon_documentdb/#metrics
