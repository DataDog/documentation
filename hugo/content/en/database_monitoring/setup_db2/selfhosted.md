---
title: Setting Up Database Monitoring for Self-Hosted IBM Db2
description: Install and configure Database Monitoring for self-hosted IBM Db2.
further_reading:
- link: "/integrations/ibm-db2/"
  tag: "Documentation"
  text: "IBM Db2 Integration"
- link: "/database_monitoring/"
  tag: "Documentation"
  text: "Database Monitoring"
- link: "/database_monitoring/guide/database_identifier/"
  tag: "Documentation"
  text: "Specifying a Database Identifier"
---

<div class="alert alert-info">
This feature is in preview and requires Datadog Agent v7.86 or later. Customers who participate in the Datadog Database Monitoring for IBM Db2 preview <strong>are not charged</strong> for usage incurred during the preview period. To request access, contact your Datadog account team.
</div>

Datadog Database Monitoring (DBM) for IBM Db2 collects database instance metadata, query performance metrics, and obfuscated SQL to help you investigate database performance.

## Before you begin

Supported IBM Db2 versions
: 11.1, 11.5, and 12.1.

Supported Agent versions
: 7.86 or later. The Agent does not bundle the `ibm_db` Python driver. Install the driver as described in [Step 3](#step-3-install-the-agent-and-the-ibm_db-driver).

Supported platforms
: Self-hosted IBM Db2 for Linux, UNIX, and Windows (Db2 LUW). Db2 for z/OS, Db2 for IBM i, pureScale, and Database Partitioning Feature (DPF) deployments are not supported.

<!-- vale Datadog.headings = NO -->
## Data collected
<!-- vale Datadog.headings = YES -->

Database Monitoring collects the following data from IBM Db2:

**Database instance**
: Instance metadata every 5 minutes, including the database version, hostname, port, Agent version, and integration version. Configured tags support filtering and grouping.

**Query metrics**
: Metrics per normalized query from `SYSPROC.MON_GET_PKG_CACHE_STMT`, collected every 10 seconds by default. These include execution count, total coordinator execution time, CPU time, rows read, rows returned, lock waits, and lock wait time. Execution counts include executions with activity metrics collected.

**Full query text**
: Obfuscated SQL linked to query metrics by query signature.

DBM for IBM Db2 does not collect query samples, query activity, explain plans, or schemas.

## Setup

### Step 1: enable monitoring

As the Db2 instance administrator, enable the monitor switches described in the IBM Db2 integration's [Enable monitoring instructions][1].

In each monitored database, check the activity and request metrics settings:

```shell
db2 get db cfg for <DB> | grep -i MON_
```

`MON_ACT_METRICS` and `MON_REQ_METRICS` must be `BASE` or `EXTENDED`. The Db2 default is `BASE`. If either setting is `NONE`, connect to the database as an administrator and set both to `BASE`:

```shell
db2 connect to <DB>
db2 UPDATE DB CFG FOR <DB> USING MON_ACT_METRICS BASE MON_REQ_METRICS BASE
```

The connection allows the configuration update to take effect online. For details, see IBM's [UPDATE DATABASE CONFIGURATION command][2], [activity metrics parameter][3], and [request metrics parameter][4].

### Step 2: Create the Datadog user and grant access

Create a dedicated `datadog` user in the operating system or authentication provider used by Db2. Connect as an administrator to each database you want to monitor, and grant access to the monitoring functions:

```sql
GRANT CONNECT ON DATABASE TO USER datadog;
GRANT EXECUTE ON FUNCTION SYSPROC.MON_GET_INSTANCE TO USER datadog;
GRANT EXECUTE ON FUNCTION SYSPROC.MON_GET_DATABASE TO USER datadog;
GRANT EXECUTE ON FUNCTION SYSPROC.MON_GET_BUFFERPOOL TO USER datadog;
GRANT EXECUTE ON FUNCTION SYSPROC.MON_GET_TABLESPACE TO USER datadog;
GRANT EXECUTE ON FUNCTION SYSPROC.MON_GET_TRANSACTION_LOG TO USER datadog;
GRANT EXECUTE ON FUNCTION SYSPROC.MON_GET_PKG_CACHE_STMT TO USER datadog;
```

These grants do not require access to application data. Users with `DATAACCESS`, `DBADM`, or `SQLADM` authority can also access the monitoring functions. For details, see [Database permissions][5].

#### Restrictive databases

On databases created with `RESTRICTIVE`, also grant workload usage and access to the IBM CLI packages:

```sql
GRANT USAGE ON WORKLOAD SYSDEFAULTUSERWORKLOAD TO USER datadog;
GRANT EXECUTE ON PACKAGE NULLID.SYSSH200 TO USER datadog;
GRANT EXECUTE ON PACKAGE NULLID.SYSSH100 TO USER datadog;
GRANT EXECUTE ON PACKAGE NULLID.SYSSN200 TO USER datadog;
```

Package names can vary with the installed IBM client. Grant access to the packages used by the Agent's driver.

### Securely store your password

{{% dbm-secret %}}

### Step 3: Install the Agent and the `ibm_db` driver

The Agent can run on the Db2 server or on a separate host with network access to each database server's direct address.

{{< tabs >}}
{{% tab "Linux host" %}}

1. [Install Datadog Agent][6] version 7.86 or later.
2. Install the IBM driver with the Agent's embedded Python package installer:

   ```shell
   sudo -Hu dd-agent /opt/datadog-agent/embedded/bin/pip install ibm_db==3.2.6
   ```

   For compiler and library requirements, see [Dependencies][7]. For restricted networks, see [Installing the `ibm_db` client library offline][8].
3. Add the configuration in Step 4 to `/etc/datadog-agent/conf.d/ibm_db2.d/conf.yaml`.

[6]: /agent/
[7]: /integrations/ibm-db2/#dependencies
[8]: /integrations/ibm-db2/#installing-ibm_db-client-library-offline

{{% /tab %}}
{{% tab "Docker" %}}

Build a custom Agent image that includes the driver. Save this as `Dockerfile`:

```dockerfile
FROM registry.datadoghq.com/agent:7.86.0
RUN /opt/datadog-agent/embedded/bin/pip install --no-cache-dir --no-deps ibm_db==3.2.6
```

Build the image:

```shell
docker build -t datadog-agent-db2:7.86.0 .
```

Run the custom image with an [Autodiscovery label][9] for the `ibm_db2` check. Replace the placeholders with your Datadog site, API key, and database settings:

```shell
docker run -d --name datadog-agent \
  -e DD_API_KEY="<DATADOG_API_KEY>" \
  -e DD_SITE="<DATADOG_SITE>" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.checks='{
    "ibm_db2": {
      "init_config": {},
      "instances": [{
        "dbm": true,
        "host": "<DB2_SERVER>",
        "port": 50000,
        "db": "<DB>",
        "username": "datadog",
        "password": "ENC[datadog_user_database_password]",
        "service": "<SERVICE>",
        "database_identifier": {"template": "$host:$port"},
        "tags": ["env:<ENV>"]
      }]
    }
  }' \
  datadog-agent-db2:7.86.0
```

The Agent needs read permission on the Docker socket to discover labels. Configure the [secret backend][10] in the Agent container to resolve the `ENC[]` password. Apply the driver reroute settings in Step 4 to this container.

[9]: /containers/docker/integrations/?tab=dockerlabel
[10]: /agent/configuration/secrets-management/

{{% /tab %}}
{{% tab "Kubernetes" %}}

Build the custom image shown in the Docker tab and make it available in your container registry. Use this image for every Agent that executes the `ibm_db2` check, including dedicated cluster check runners.

For a Helm deployment, set `agents.image.repository` and `agents.image.tag` to the custom image repository and tag. If you use dedicated cluster check runners, also set `clusterChecksRunner.image.repository` and `clusterChecksRunner.image.tag`. For example, add these overrides to your Helm values:

```yaml
agents:
  image:
    repository: <REGISTRY>/datadog-agent-db2
    tag: "7.86.0"
clusterChecksRunner:
  image:
    repository: <REGISTRY>/datadog-agent-db2
    tag: "7.86.0"
```

For a database outside Kubernetes, [enable cluster checks][11] and mount the configuration from Step 4 at `/conf.d/ibm_db2.yaml` in the Cluster Agent container. Add `cluster_check: true` at the top level of that file. The Cluster Agent dispatches the check to an Agent or a cluster check runner.

For Db2 running in a Pod, use [Autodiscovery annotations][12] on the Db2 container instead. Replace `<DB2_CONTAINER_NAME>` with the container name, and add one instance per database:

```yaml
metadata:
  annotations:
    ad.datadoghq.com/<DB2_CONTAINER_NAME>.checks: |
      {
        "ibm_db2": {
          "init_config": {},
          "instances": [{
            "dbm": true,
            "host": "%%host%%",
            "port": 50000,
            "db": "<DB>",
            "username": "datadog",
            "password": "ENC[datadog_user_database_password]",
            "service": "<SERVICE>",
            "database_identifier": {"template": "$host:$port"},
            "tags": ["env:<ENV>"]
          }]
        }
      }
```

Configure the [secret backend][10] on the Agent that executes the check, and apply the driver reroute settings in Step 4 to that Agent's container. Use either a cluster check or Pod annotations for a database, so that only one Agent collects it.

[10]: /agent/configuration/secrets-management/
[11]: /agent/cluster_agent/clusterchecks/
[12]: /containers/kubernetes/integrations/?tab=annotations

{{% /tab %}}
{{< /tabs >}}

For a Windows host, install Agent 7.86 or later and follow the IBM Db2 integration's [Windows driver installation instructions][13].

### Step 4: Configure the Agent

For a host installation, save this configuration in `/etc/datadog-agent/conf.d/ibm_db2.d/conf.yaml`. In containers, use the equivalent instance settings in the label, annotation, or cluster check configuration from Step 3.

Configure one check instance per database per server. This example monitors the same database name on two servers with distinct, fixed addresses:

```yaml
init_config: {}
instances:
  - dbm: true
    host: db2-a.example.com
    port: 50000
    db: <DB>
    username: datadog
    password: "ENC[datadog_user_database_password]"
    service: <SERVICE>
    database_identifier:
      template: "$host:$port"
    tags:
      - env:<ENV>

  - dbm: true
    host: db2-b.example.com
    port: 50000
    db: <DB>
    username: datadog
    password: "ENC[datadog_user_database_password]"
    service: <SERVICE>
    database_identifier:
      template: "$host:$port"
    tags:
      - env:<ENV>
```

If each server runs its own Agent, include only that server's entry in its configuration. Add an entry for each additional database.

- Use each server's direct address. Do not use a virtual IP, load balancer, or failover DNS name. See [Connect to a fixed server][14].
- Disable automatic client reroute (ACR) for the Agent's IBM driver. Set both `enableAcr` and `enableAlternateServerListFirstConnect` to `false` in the driver's `db2dsdriver.cfg`. See [Disable automatic client reroute][15] for file placement and `DB2DSDRIVER_CFG_PATH` configuration.
- Keep each server's identifier stable across primary and standby role changes. Do not share a cluster identifier between servers. See [HADR configuration][16].
- Do not configure two Agents or duplicate check instances to collect the same database on the same server.

After configuring the check, driver, and secret backend, [restart the Agent][17].

### Step 5: validate

Run the Agent status command on the host or in the Agent container that executes the check:

```shell
datadog-agent status
```

Look for `ibm_db2` under **Checks** and confirm that the check has no errors. In Datadog, open **Database Monitoring > Databases** to find the instance. Open **Database Monitoring > Queries** and select **IBM Db2** to view query metrics.

## Customizing the database identifier

The `database_identifier.template` option controls how the instance appears in DBM. Set it explicitly to `$host:$port` to distinguish servers and multiple Db2 instances on one host. Template variables include `$resolved_hostname`, `$host`, `$port`, and configured tag keys such as `$env`.

For `host: db2-a.example.com`, `port: 50000`, and the tag `env:production`:

| Template | Result |
| -------- | ------ |
| `$host:$port` | `db2-a.example.com:50000` |
| `$env-$host:$port` | `production-db2-a.example.com:50000` |

Use distinct identifiers for distinct servers, including both members of an HADR pair. See [Specifying a Database Identifier][18].

## Configuration reference

For all integration options, see the [sample configuration][19].

### Database Monitoring settings

| Field | Type | Default | Description |
| ----- | ---- | ------- | ----------- |
| `dbm` | Boolean | `false` | Enable Database Monitoring. Required for query metrics and full query text collection. |

### Database identifier

| Field | Type | Default | Description |
| ----- | ---- | ------- | ----------- |
| `database_identifier.template` | string | `$resolved_hostname` | Template for the database identifier. Supports `$resolved_hostname`, `$host`, `$port`, and configured tag keys. Set explicitly to `$host:$port` for direct connections. |

### Query metrics

| Field | Type | Default | Description |
| ----- | ---- | ------- | ----------- |
| `query_metrics.enabled` | Boolean | `true` | Enable query metrics and full query text collection. Requires `dbm: true`. |
| `query_metrics.collection_interval` | number | `10` | Interval between query metrics collections, in seconds. Must be greater than zero. |
| `query_metrics.query_timeout` | integer | `10` | Timeout in seconds for each counter scan or statement text lookup. Does not limit the total collection duration or affect other collectors. Must be greater than zero. |

## Limitations

- Only self-hosted Db2 LUW is supported. Db2 for z/OS, Db2 for IBM i, pureScale, and DPF deployments are not supported.
- Query metrics are differences between cumulative package-cache counters. New cache entries establish a baseline before subsequent executions appear in metrics. Executions of statements evicted from the package cache between collections can be missed.
- An HADR standby requires reads enabled to accept the SQL connections used for collection. Each server reports its own query workload. Query metrics do not report replication lag, HADR health, or which server is primary. See [High availability disaster recovery (HADR)][16].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/ibm-db2/#enable-monitoring
[2]: https://www.ibm.com/docs/en/db2/11.5.x?topic=commands-update-database-configuration
[3]: https://www.ibm.com/docs/en/db2/11.5.x?topic=parameters-mon-act-metrics-monitoring-activity-metrics
[4]: https://www.ibm.com/docs/en/db2/11.5.x?topic=parameters-mon-req-metrics-monitoring-request-metrics
[5]: /integrations/ibm-db2/#database-permissions
[13]: /integrations/ibm-db2/#windows
[14]: /integrations/ibm-db2/#connect-to-a-fixed-server
[15]: /integrations/ibm-db2/#disable-automatic-client-reroute
[16]: /integrations/ibm-db2/#high-availability-disaster-recovery-hadr
[17]: /agent/configuration/agent-commands/#restart-the-agent
[18]: /database_monitoring/guide/database_identifier/
[19]: https://github.com/DataDog/integrations-core/blob/master/ibm_db2/datadog_checks/ibm_db2/data/conf.yaml.example
