---
title: Setting Up Database Monitoring for Oracle RAC
kind: documentation
description: Install and configure Database Monitoring for Oracle RAC
further_reading:
- link: "/integrations/oracle/"
  tag: "Documentation"
  text: "Basic Oracle Integration"

---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}

<div class="alert alert-info">
The features described on this page are in private beta. Contact your Customer Success Manager to provide feedback or ask for help.
</div>

Database Monitoring provides deep visibility into your Oracle databases by exposing query samples to profile your different workloads and diagnose issues.

<div class="alert alert-danger">
Before completing the steps below, verify that you have met <a href="/database_monitoring/setup_oracle/?tab=linux#prerequisites">the prerequisites</a> for Database Monitoring.
</div>

## Setup

Complete the following steps to enable Database Monitoring:

Configure the Agent for each RAC node by following the instructions for [self-hosted Oracle databases][7].

You must configure the Agent for each Real Application Cluster (RAC) node, because the Agent collects information from every node separately by querying `V$` views. The Agent doesn't query any `GV$` views to avoid generating interconnect traffic. The collected data from each RAC node is aggregated in the frontend.

```yaml
init_config:
instances:
  - server: '<RAC_NODE_1>:<PORT>'
    service_name: "<CDB_SERVICE_NAME>" # The Oracle CDB service name
    username: 'c##datadog'
    password: '<PASSWORD>'
    dbm: true
    tags:  # Optional
      - rac_cluster:<CLUSTER_NAME>
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
  - server: '<RAC_NODE_2>:<PORT>'
    service_name: "<CDB_SERVICE_NAME>" # The Oracle CDB service name
    username: 'c##datadog'
    password: '<PASSWORD>'
    dbm: true
    tags:  # Optional
      - rac_cluster:<CLUSTER_NAME>
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
```

The Agent connects only to CDB. It queries the information about PDBs while connected to CDB. Don't create connections to individual PDBs.

Set the `rac_cluster` configuration parameter to the name of your RAC cluster or some user friendly alias. The `rac_cluster` filter helps you select all RAC nodes in the [DBM Oracle Database Overview dashboard][8]. You can set an additional filter for the database of interest.

### Validate

[Run the Agent's status subcommand][5] and look for `oracle-dbm` under the **Checks** section. Navigate to the [Databases][6] page in Datadog to get started.

## Custom queries

Database Monitoring supports custom queries for Oracle databases. See the [conf.yaml.example][11] to learn more about the configuration options available.

<div class="alert alert-warning">Running custom queries may result in additional costs or fees assessed by Oracle.</div>

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle-dbm.d/conf.yaml.example
[3]: /getting_started/tagging/unified_service_tagging
[4]: /agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[5]: /agent/configuration/agent-commands/#agent-status-and-information
[6]: https://app.datadoghq.com/databases
[7]: /database_monitoring/setup_oracle/selfhosted
[8]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[11]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle-dbm.d/conf.yaml.example

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
