---
title: Setting Up Database Monitoring for Oracle Exadata
kind: documentation
description: Install and configure Database Monitoring for Oracle Exadata
further_reading:
- link: "/integrations/oracle/"
  tag: "Documentation"
  text: "Basic Oracle Integration"

---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}

{{% dbm-oracle-definition %}}

The Agent collects telemetry directly from the database by logging in as a read-only user. 

## Before you begin

{{% dbm-supported-oracle-versions %}}

{{% dbm-supported-oracle-agent-version %}}

Performance impact
: The default Agent configuration for Database Monitoring is conservative, but you can adjust settings such as the collection interval and query sampling rate to better suit your needs. For most workloads, the Agent represents less than one percent of query execution time on the database and less than one percent of CPU. <br/><br/>
Database Monitoring runs as an integration on top of the base Agent ([see benchmarks][6]).

Proxies, load balancers, and connection poolers
: The Agent must connect directly to the host being monitored. The Agent should not connect to the database through a proxy, load balancer, or connection pooler. Each Agent must have knowledge of the underlying hostname and should stick to a single host for its lifetime, even in cases of failover. If the Datadog Agent connects to different hosts while it is running, the values of metrics will be incorrect.

Data security considerations
: See [Sensitive information][7] for information about what data the Agent collects from your databases and how to ensure it is secure.

## Setup

Complete the following to enable Database Monitoring with your Oracle database:

1. [Create the user](#create-the-user)
1. [Install the Agent](#install-the-agent)
1. [Configure the Agent](#configure-the-agent)
1. [Install or verify the Oracle integration](#install-or-verify-the-oracle-integration)

### Create the user

{{% dbm-create-oracle-user %}}

### Install the Agent

See the [DBM Setup Architecture][8] documentation to determine where to install the Agent. The Agent doesn't require any external Oracle clients.

For installation steps, see the [Agent installation instructions][9].

### Configure the Agent

#### Multi-node Exadata

Configure the Agent for each node by following the instructions for [Oracle RAC][4].

#### Single-node Exadata

Configure the Agent by following the instructions for [self-hosted Oracle databases][3].

#### Validate

[Run the Agent's status subcommand][1] and look for `oracle-dbm` under the **Checks** section. Navigate to the [Databases][2] page in Datadog to get started.

### Install or verify the Oracle integration

#### First-time installations

On the Integrations page in Datadog, install the [Oracle integration][10] for your organization. This installs an [Oracle dashboard][11] in your account that can be used to monitor the performance of your Oracle databases.

#### Existing installations

{{% dbm-existing-oracle-integration-setup %}}

## Custom queries

Database Monitoring supports custom queries for Oracle databases. See the [conf.yaml.example][5] to learn more about the configuration options available.

<div class="alert alert-warning">Running custom queries may result in additional costs or fees assessed by Oracle.</div>

[1]: /agent/configuration/agent-commands/#agent-status-and-information
[2]: https://app.datadoghq.com/databases
[3]: /database_monitoring/setup_oracle/selfhosted
[4]: /database_monitoring/setup_oracle/rac
[5]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle-dbm.d/conf.yaml.example
[6]: /agent/basic_agent_usage#agent-overhead
[7]: /database_monitoring/data_collected/#sensitive-information
[8]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[9]: https://app.datadoghq.com/account/settings/agent/latest
[10]: https://app.datadoghq.com/integrations/oracle
[11]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
