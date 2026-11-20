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

Use this guide for self-hosted Db2 databases, including databases running on cloud virtual machines such as Amazon EC2.

## Before you begin

Supported IBM Db2 versions
: 11.1, 11.5, and 12.1.

Supported Agent versions
: 7.86 or later. The Agent does not bundle the `ibm_db` Python driver. Install the driver as described in [Step 3](#step-3-install-the-agent-and-the-ibm_db-driver).

Supported platforms
: IBM Db2 for Linux, UNIX, and Windows (Db2 LUW).

Network access
: Allow the Agent to reach each Db2 server's direct address on the Db2 service port (`50000` by default). Allow outbound HTTPS connections to [Datadog][23]. On Amazon EC2, configure security groups and VPC routing to allow connections from the Agent host to the Db2 servers. The Agent can run on a database server or a separate instance.

## Collected data {#data-collected}

Database Monitoring collects the following data from IBM Db2:

**Database instance**
: Instance information, including the database version, hostname, and port, collected every 5 minutes. Custom tags support filtering and grouping.

**Query metrics**
: Aggregated performance metrics for normalized queries, collected from the Db2 package cache every 10 seconds by default. Metrics include execution counts, execution time, CPU time, rows read, rows returned, lock waits, and lock wait time.

**Full query text**
: Obfuscated SQL text linked to query metrics by query signature.

## Setup

### Step 1: enable monitoring

As the Db2 instance administrator, enable the monitor switches described in the IBM Db2 integration's [Enable monitoring instructions][1].

In each monitored database on each server, including high availability disaster recovery (HADR) standbys, check the activity and request metrics settings. Replace `<DB_NAME>` with the name of the database you want to monitor:

```shell
db2 get db cfg for <DB_NAME> | grep -i MON_
```

`MON_ACT_METRICS` and `MON_REQ_METRICS` must be `BASE` or `EXTENDED`. The Db2 default is `BASE`. If either setting is `NONE`, connect to the database as an administrator and set it to `BASE`:

```shell
db2 connect to <DB_NAME>
db2 UPDATE DB CFG FOR <DB_NAME> USING <PARAMETER> BASE
```

The connection allows the configuration update to take effect online. `MON_ACT_METRICS` must be enabled because query metrics rely on coordinator execution counts recorded through activity metrics.

For details, see IBM's [UPDATE DATABASE CONFIGURATION command][2], [activity metrics parameter][3], and [request metrics parameter][4].

### Step 2: create the Datadog user and grant access

Create a dedicated `datadog` user in the operating system or authentication provider used by Db2. Connect to each database you want to monitor as a user with `ACCESSCTRL` or `SECADM` authority, and grant access to the monitoring functions:

```sql
GRANT CONNECT ON DATABASE TO USER datadog;
GRANT EXECUTE ON FUNCTION SYSPROC.MON_GET_INSTANCE TO USER datadog;
GRANT EXECUTE ON FUNCTION SYSPROC.MON_GET_DATABASE TO USER datadog;
GRANT EXECUTE ON FUNCTION SYSPROC.MON_GET_BUFFERPOOL TO USER datadog;
GRANT EXECUTE ON FUNCTION SYSPROC.MON_GET_TABLESPACE TO USER datadog;
GRANT EXECUTE ON FUNCTION SYSPROC.MON_GET_TRANSACTION_LOG TO USER datadog;
GRANT EXECUTE ON FUNCTION SYSPROC.MON_GET_PKG_CACHE_STMT TO USER datadog;
```

These grants do not include read access to tables. For details, see [Database permissions][5].

#### Securely store your password

{{% dbm-secret %}}

### Step 3: install the Agent and the `ibm_db` driver

Install the Agent on the Db2 server or on a separate host with network access to each database server's direct address. A host-installed Agent can also monitor Db2 running in Docker or Kubernetes.

Select the Agent's deployment method:

{{< tabs >}}
{{% tab "Host" %}}

1. [Install Datadog Agent][6] version 7.86 or later.
2. On Linux, install the IBM driver with the Agent's embedded Python package installer:

   ```shell
   sudo -Hu dd-agent /opt/datadog-agent/embedded/bin/pip install ibm_db==3.2.6
   ```

   For compiler and library requirements, see [Dependencies][7]. For restricted networks, see [Installing the `ibm_db` client library offline][8].

   For Windows, follow the IBM Db2 integration's [Windows driver installation instructions][13].

{{% /tab %}}
{{% tab "Docker" %}}

Install Docker using the instructions for your host's operating system. For Amazon Linux, follow the [AWS Docker installation instructions][24], including reconnecting to apply Docker group membership changes.

The Agent container image does not include the `ibm_db` driver. Build a custom image that includes the driver:

```dockerfile
FROM registry.datadoghq.com/agent:<AGENT_VERSION>
RUN /opt/datadog-agent/embedded/bin/pip install ibm_db==3.2.6
```

Replace `<AGENT_VERSION>` with `7.86.0` or later. Save the Dockerfile and build the image from the same directory:

```shell
docker build -t dd-agent-db2:<AGENT_VERSION> .
```

Installing `ibm_db` downloads the IBM CLI driver, so the image build requires network access to IBM. For environments with restricted network access, see [Installing the `ibm_db` client library offline][8].

Continue with the shared check and driver configuration in Step 4, then [run the Agent container](#run-the-agent-in-docker). For other Docker Agent options, see the [Docker Agent documentation][21].

{{% /tab %}}
{{% tab "Kubernetes" %}}

Build a custom Agent image using the Dockerfile in the **Docker** tab and push it to a registry accessible to your cluster. Configure the [Kubernetes Agent][22] to use this image.

For integration configuration, follow the [Kubernetes Autodiscovery][12] or [cluster check instructions][11]. Specify `ibm_db2` as the integration name and use the database connection settings shown in Step 4.

Set up the [secret backend][10] on the Agent that runs the check. With cluster checks, this is the Cluster Checks Runner, which also needs the custom image and the [automatic client reroute (ACR) configuration](#disable-automatic-client-reroute).

{{% /tab %}}
{{< /tabs >}}

### Step 4: configure the Agent

For a Linux host or the Docker example below, save this configuration on the Agent host in `/etc/datadog-agent/conf.d/ibm_db2.d/conf.yaml`. Create the directory if it does not exist. For other host platforms, see the [Agent configuration directory][20]. For Kubernetes, apply the instance settings using the configuration method selected in Step 3.

Configure one check instance per database per server. Database Monitoring requires `host` and `port`. This example monitors the same database name on two servers with distinct, fixed addresses:

```yaml
init_config: {}
instances:
  - dbm: true
    host: db2-a.example.com
    port: 50000
    db: <DB_NAME>
    username: datadog
    password: "ENC[datadog_user_database_password]"
    service: <SERVICE>
    database_identifier:
      template: "$resolved_hostname:$port"
    tags:
      - env:<ENV>

  - dbm: true
    host: db2-b.example.com
    port: 50000
    db: <DB_NAME>
    username: datadog
    password: "ENC[datadog_user_database_password]"
    service: <SERVICE>
    database_identifier:
      template: "$resolved_hostname:$port"
    tags:
      - env:<ENV>
```

If each server runs its own Agent, include only that server's entry in its configuration. Add an entry for each additional database.

- Use each server's direct address. Do not use a virtual IP, load balancer, or failover DNS name. See [Connect to a fixed server][14].
- Disable ACR for the Agent's IBM driver. See [Disable automatic client reroute](#disable-automatic-client-reroute).
- Keep each server's identifier stable across primary and standby role changes. Do not share a cluster identifier between servers. See [HADR configuration][16].
- Do not configure two Agents or duplicate check instances to collect the same database on the same server.

#### Disable automatic client reroute

Disable automatic client reroute for the Agent's IBM driver so each collector stays connected to its configured server, including after an HADR takeover. A direct address alone does not prevent the driver from rerouting to another server. Rerouting mixes the workloads of two servers under one identifier.

1. Create a `db2dsdriver.cfg` file for the Agent's driver, such as `/etc/datadog-agent/db2dsdriver.cfg`. For each configured database, host, and port, set both `enableAcr` and `enableAlternateServerListFirstConnect` to `false`. For a complete example, see [Disable automatic client reroute][15].
2. Set the `DB2DSDRIVER_CFG_PATH` environment variable in the Agent service's environment to the absolute path of the file. Setting the variable in your shell does not affect the Agent service.
   - **Linux (systemd)**: Run `sudo systemctl edit datadog-agent` and add:

     ```ini
     [Service]
     Environment="DB2DSDRIVER_CFG_PATH=/etc/datadog-agent/db2dsdriver.cfg"
     ```

   - **Windows**: Add `DB2DSDRIVER_CFG_PATH=<PATH>` to the `Environment` multi-string value of the `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\datadogagent` registry key.
   - **Containers**: Copy `db2dsdriver.cfg` into the image or mount it into the container. Set `DB2DSDRIVER_CFG_PATH` to the file's absolute path inside the container.

Apply these settings to the Agent's driver configuration, not your application's driver configuration.

For a host-installed Agent, [restart the Agent][17] after configuring the check, driver, and secret backend. For Kubernetes, apply the updated configuration to the Agent that runs the check.

#### Run the Agent in Docker

After preparing the check configuration and `db2dsdriver.cfg`, configure password resolution inside the container. This example uses the [file-based secret backend][25] to resolve `ENC[datadog_user_database_password]`:

1. On the Docker host, create `/etc/datadog-agent/secrets/datadog_user_database_password` containing only the database password. Restrict access to the file and make it readable by the Agent inside the container.
2. Run the following command. Replace `<DATADOG_API_KEY>` with your Datadog API key, `<DATADOG_SITE>` with your {{< region-param key=dd_site code="true" >}}, and `<AGENT_VERSION>` with the tag you built in Step 3:

   ```shell
   docker run -d --name dd-agent \
     --restart unless-stopped \
     --cgroupns host \
     --pid host \
     -e DD_API_KEY="<DATADOG_API_KEY>" \
     -e DD_SITE="<DATADOG_SITE>" \
     -e DD_SECRET_BACKEND_TYPE=file.text \
     -e DD_SECRET_BACKEND_CONFIG='{"secrets_path":"/run/secrets"}' \
     -e DB2DSDRIVER_CFG_PATH=/etc/datadog-agent/db2dsdriver.cfg \
     -v /var/run/docker.sock:/var/run/docker.sock:ro \
     -v /proc/:/host/proc/:ro \
     -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
     -v /etc/datadog-agent/conf.d/ibm_db2.d:/etc/datadog-agent/conf.d/ibm_db2.d:ro \
     -v /etc/datadog-agent/db2dsdriver.cfg:/etc/datadog-agent/db2dsdriver.cfg:ro \
     -v /etc/datadog-agent/secrets:/run/secrets:ro \
     dd-agent-db2:<AGENT_VERSION>
   ```

The command mounts the check configuration, driver configuration, and password file into the container. It also sets the driver and secret-backend environment variables on the Agent process. Settings in the host's shell or `datadog.yaml` do not propagate into the container automatically.

If you use another [secret backend][10], replace the `DD_SECRET_BACKEND_TYPE` and `DD_SECRET_BACKEND_CONFIG` settings with that backend's configuration, mount any required files, and update the `ENC[]` references to match.

### Step 5: validate

Run the status command for the Agent that executes the check:

{{< tabs >}}
{{% tab "Host" %}}

```shell
datadog-agent status
```

{{% /tab %}}
{{% tab "Docker" %}}

```shell
docker exec dd-agent agent status
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Follow the [Kubernetes Agent status instructions][26]. With cluster checks, check the status of the Cluster Checks Runner that runs the Db2 check.

{{% /tab %}}
{{< /tabs >}}

Look for `ibm_db2` under **Checks** and confirm that the check has no errors. In Datadog, open **Database Monitoring > Databases** to find the instance. Open **Database Monitoring > Queries** and select **IBM Db2** to view query metrics.

## Customize the database identifier

The `database_identifier.template` option controls how the instance appears in DBM. Set it explicitly to `$resolved_hostname:$port` to distinguish servers and multiple Db2 instances on one host. Template variables include `$resolved_hostname`, `$host`, `$port`, and configured tag keys such as `$env`.

For `host: db2-a.example.com`, `port: 50000`, and the tag `env:production`:

| Template | Result |
| -------- | ------ |
| `$resolved_hostname:$port` | `db2-a.example.com:50000` |
| `$env-$resolved_hostname:$port` | `production-db2-a.example.com:50000` |

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
| `database_identifier.template` | string | `$resolved_hostname` | Template for the database identifier. Supports `$resolved_hostname`, `$host`, `$port`, and configured tag keys. Set explicitly to `$resolved_hostname:$port` for direct connections. |

### Query metrics

| Field | Type | Default | Description |
| ----- | ---- | ------- | ----------- |
| `query_metrics.enabled` | Boolean | `true` | Enable query metrics and full query text collection. Requires `dbm: true`. |
| `query_metrics.collection_interval` | number | `10` | Interval between query metrics collections, in seconds. Must be greater than zero. |
| `query_metrics.query_timeout` | integer | `10` | Timeout in seconds for each counter scan or statement text lookup. Does not limit the total collection duration or affect other collectors. Must be greater than zero. |

## Limitations

- Query metrics are differences between cumulative package-cache counters. New cache entries establish a baseline before subsequent executions appear in metrics. Executions of statements evicted from the package cache between collections can be missed.
- To collect query metrics from an HADR standby, enable reads on the standby. Each server reports its own query workload. See [High availability disaster recovery (HADR)][16].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/ibm-db2/#enable-monitoring
[2]: https://www.ibm.com/docs/en/db2/12.1.x?topic=commands-update-database-configuration
[3]: https://www.ibm.com/docs/en/db2/12.1.x?topic=parameters-mon-act-metrics-monitoring-activity-metrics
[4]: https://www.ibm.com/docs/en/db2/12.1.x?topic=parameters-mon-req-metrics-monitoring-request-metrics
[5]: /integrations/ibm-db2/#database-permissions
[6]: /agent/
[7]: /integrations/ibm-db2/#dependencies
[8]: /integrations/ibm-db2/#installing-ibm_db-client-library-offline
[10]: /agent/configuration/secrets-management/
[11]: /containers/cluster_agent/clusterchecks/
[12]: /containers/kubernetes/integrations/
[13]: /integrations/ibm-db2/#windows
[14]: /integrations/ibm-db2/#connect-to-a-fixed-server
[15]: /integrations/ibm-db2/#disable-automatic-client-reroute
[16]: /integrations/ibm-db2/#high-availability-disaster-recovery-hadr
[17]: /agent/configuration/agent-commands/#restart-the-agent
[18]: /database_monitoring/guide/database_identifier/
[19]: https://github.com/DataDog/integrations-core/blob/master/ibm_db2/datadog_checks/ibm_db2/data/conf.yaml.example
[20]: /agent/configuration/agent-configuration-files/#agent-configuration-directory
[21]: /containers/docker/
[22]: /containers/kubernetes/
[23]: /agent/configuration/network/#destinations
[24]: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-docker.html
[25]: /agent/configuration/secrets-management/#id-for-json-yaml-text
[26]: /agent/configuration/agent-commands/#agent-information
