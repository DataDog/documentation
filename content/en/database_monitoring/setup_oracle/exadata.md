---
title: Setting Up Database Monitoring for Oracle Exadata
kind: documentation
description: Install and configure Database Monitoring for Oracle Exadata
private: true
is_beta: true
further_reading:
- link: "/integrations/oracle/"
  tag: "Documentation"
  text: "Basic Oracle Integration"

---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}

<div class="alert alert-info">
The features described on this page are in private beta.
</div>

Database Monitoring provides deep visibility into your Oracle databases by exposing query samples to profile your different workloads and diagnose issues.

## Setup

Complete the following steps to enable Database Monitoring with your database:

### Multi-node Exadata

Configure the Agent for each node by following the instructions for [Oracle RAC][8].

### Single-node Exadata

Configure the Agent by following the instructions for [self-hosted Oracle databases][7].

### Validate

[Run the Agent's status subcommand][5] and look for `oracle-dbm` under the **Checks** section. Navigate to the [Databases][6] page in Datadog to get started.

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle-dbm.d/conf.yaml.example
[3]: /getting_started/tagging/unified_service_tagging
[4]: /agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: /agent/guide/agent-commands/#agent-status-and-information
[6]: https://app.datadoghq.com/databases
[7]: /database_monitoring/setup_oracle/selfhosted
[8]: /database_monitoring/setup_oracle/rac

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
