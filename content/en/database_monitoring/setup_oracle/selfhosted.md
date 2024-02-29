---
title: Setting Up Database Monitoring for Self-Hosted Oracle
kind: documentation
description: Install and configure Database Monitoring for Self-Hosted Oracle
further_reading:
- link: "/integrations/oracle/"
  tag: "Documentation"
  text: "Basic Oracle Integration"

---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}

{{% dbm-oracle-definition %}}

The Agent collects telemetry directly from the database by logging in as a read-only user. Complete the following setup steps to enable Database Monitoring with your Oracle database:

1. [Create the user](#create-the-user)
1. [Grant the Agent access to the database](#grant-the-agent-access-to-the-database)
1. [Install the Agent](#install-the-agent)
1. [Configure the Agent](#configure-the-agent)
1. [Install or verify the Oracle integration](#install-or-verify-the-oracle-integration)

## Before you begin

{% dbm-supported-oracle-versions %}

{% dbm-supported-oracle-agent-version %}

Performance impact
: The default Agent configuration for Database Monitoring is conservative, but you can adjust settings such as the collection interval and query sampling rate to better suit your needs. For most workloads, the Agent represents less than one percent of query execution time on the database and less than one percent of CPU. <br/><br/>
Database Monitoring runs as an integration on top of the base Agent ([see benchmarks][12]).

Proxies, load balancers, and connection poolers
: The Agent must connect directly to the host being monitored. The Agent should not connect to the database through a proxy, load balancer, or connection pooler. Each Agent must have knowledge of the underlying hostname and should stick to a single host for its lifetime, even in cases of failover. If the Datadog Agent connects to different hosts while it is running, the values of metrics will be incorrect.

Data security considerations
: See [Sensitive information][13] for information about what data the Agent collects from your databases and how to ensure it is secure.

## 1. Create the user

If you installed the legacy Oracle integration, skip this step, because the user already exists.

Create a read-only login to connect to your server and grant the required permissions:

{{< tabs >}}
{{% tab "Multi-tenant" %}}
```SQL
CREATE USER c##datadog IDENTIFIED BY &password CONTAINER = ALL ;

ALTER USER c##datadog SET CONTAINER_DATA=ALL CONTAINER=CURRENT;
```
{{% /tab %}}

{{% tab "Non-CDB" %}}
```SQL
CREATE USER datadog IDENTIFIED BY &password ;
```
{{% /tab %}}

{{% tab "Oracle 11" %}}
```SQL
CREATE USER datadog IDENTIFIED BY &password ;
```
{{% /tab %}}
{{< /tabs >}}

### 2. Grant the Agent access to the database

Log on as `sysdba`, and grant the following permissions:

{{< tabs >}}

{{% tab "Multi-tenant" %}}
{% dbm-oracle-multitenant-permissions-grant-sql %}
{{% /tab %}}

{{% tab "Non-CDB" %}}
{% dbm-oracle-non-cdb-permissions-grant-sql %}
{{% /tab %}}

{{% tab "Oracle 11" %}}
{% dbm-oracle-11-permissions-grant-sql %}
{{% /tab %}}

{{< /tabs >}}

## 3. Create a view

Log on as `sysdba`, create a new `view` in the `sysdba` schema, and give the Agent user access to it:

{{< tabs >}}

{{% tab "Multi-tenant" %}}
{% dbm-multitenant-view-create-sql %}
{{% /tab %}}

{{% tab "Non-CDB" %}}
{% dbm-non-cdb-view-create-sql %}
{{% /tab %}}

{{% tab "Oracle 11" %}}
{% dbm-oracle-11-view-create-sql %}
{{% /tab %}}

{{< /tabs >}}

## 4. Configure the Agent

To start collecting Oracle telemetry, first [install the Datadog Agent][1].

Create the Oracle Agent conf file `/etc/datadog-agent/conf.d/oracle-dbm.d/conf.yaml`. See the [sample conf file][2] for all available configuration options.

{{< tabs >}}
{{% tab "Multi-tenant" %}}
```yaml
init_config:
instances:
  - server: '<HOSTNAME_1>:<PORT>'
    service_name: "<CDB_SERVICE_NAME>" # The Oracle CDB service name
    username: 'c##datadog'
    password: '<PASSWORD>'
    dbm: true
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
  - server: '<HOSTNAME_2>:<PORT>'
    service_name: "<CDB_SERVICE_NAME>" # The Oracle CDB service name
    username: 'c##datadog'
    password: '<PASSWORD>'
    dbm: true
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
```

The Agent connects only to the root multitenant container database (CDB). It queries the information about PDB while connected to the root CDB. Don't create connections to individual PDBs.

Once all Agent configuration is complete, [restart the Datadog Agent][1].

[1]: /agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}

{{% tab "Non-CDB" %}}
{% dbm-oracle-selfhosted-config %}

Once all Agent configuration is complete, [restart the Datadog Agent][1].

[1]: /agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}

{{% tab "Oracle 11" %}}
{% dbm-oracle-selfhosted-config %}

Once all Agent configuration is complete, [restart the Datadog Agent][1].

[1]: /agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{< /tabs >}}

### Validate

[Run the Agent's status subcommand][1] and look for `oracle-dbm` under the **Checks** section. Navigate to the [Dashboard][2] and [Databases][3] page in Datadog to get started.

## Custom queries

Database Monitoring supports custom queries for Oracle databases. See the [conf.yaml.example][4] to learn more about the configuration options available.

<div class="alert alert-warning">Running custom queries may result in additional costs or fees assessed by Oracle.</div>

[1]: /agent/configuration/agent-commands/#agent-status-and-information
[2]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[3]: https://app.datadoghq.com/databases
[4]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle-dbm.d/conf.yaml.example

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
