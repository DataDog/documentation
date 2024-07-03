---
title: Setting Up Database Monitoring for Self-Hosted MongoDB
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

1. [Grant the Agent access to your MongoDB instances](#grant-the-agent-access-to-your-mongodb-instances)
2. [Install and configure the Agent](#install-and-configure-the-agent)

### Grant the Agent access to your MongoDB instances

The Datadog Agent requires read-only access to the MongoDB instance to collect statistics and queries.

{{< tabs >}}
{{% tab "Standalone" %}}

In a Mongo shell, authenticate to the MongoDB instance, create a read-only user for the Datadog Agent in the `admin` database, and grant the required permissions:

{{< code-block lang="shell" >}}
# Authenticate as the admin user.
use admin
db.auth("admin", "<YOUR_MONGODB_ADMIN_PASSWORD>")

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
{{% tab "Replica Set" %}}

In a Mongo shell, authenticate to the primary node of the replica set, create a read-only user for the Datadog Agent in the `admin` database, and grant the required permissions:

{{< code-block lang="shell" >}}
# Authenticate as the admin user.
use admin
db.auth("admin", "<YOUR_MONGODB_ADMIN_PASSWORD>")

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
db.auth("admin", "<YOUR_MONGODB_ADMIN_PASSWORD>")

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

### Install and configure the Agent

Datadog recommends installing the Agent directly on the MongoDB host, as that enables the Agent to collect a variety of system telemetry (CPU, memory, disk, network) in addition to MongoDB specific telemetry.

#### Install the beta version of the Datadog Agent

The Database Monitoring feature for MongoDB is available in the beta version of the Datadog Agent. To install the beta version of the Datadog Agent, follow the instructions for your environment. A [Datadog API key][1] is required.

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
{{% tab "Standalone" %}}
{{% dbm-mongodb-agent-config-standalone %}}
{{% /tab %}}
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

[1]: /account_management/api-app-keys/
