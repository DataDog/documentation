---
title: Upgrading the ClickHouse integration from Agent versions earlier than 7.84
aliases:
- /database_monitoring/clickhouse_agent_upgrade
further_reading:
- link: "/database_monitoring/"
  tag: "Documentation"
  text: "Database Monitoring"
- link: "/database_monitoring/setup_clickhouse/"
  tag: "Documentation"
  text: "Setting up ClickHouse"
- link: "/database_monitoring/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting Database Monitoring"
---

## Overview

Starting with Agent version 7.84, Database Monitoring for ClickHouse shows which node in your cluster ran each query. Query metrics, query samples, completed queries, and query errors are tagged with the node that served them, so you can:

- Compare the performance of the same query across nodes.
- Find the node responsible for a slow or failing query.
- Spot uneven load across the nodes in a cluster.

To identify the nodes, the Agent also reports the cluster each instance belongs to and whether it runs on ClickHouse Cloud or is self-hosted. This information is added as the following tags:

| Tag | Description |
|---|---|
| `clickhouse_node` | The node that ran the query. |
| `clickhouse_cluster` | The ClickHouse cluster the instance belongs to. |
| `hosting_type` | `clickhouse-cloud` or `self-hosted`. |

The Agent reads this information from ClickHouse system tables that earlier setup instructions did not grant access to. If you set up the integration with an Agent version earlier than 7.84, grant the additional permissions below before you upgrade the Agent. The Agent only picks up new grants when it starts, so if you grant them after upgrading, [restart the Agent](#restart-the-agent).

## Grant the additional permissions

Connect to ClickHouse as an administrator and run the following statements. If your monitoring user is not named `datadog`, replace it with your user's name.

```sql
GRANT SELECT ON system.macros TO datadog;
GRANT SELECT ON system.clusters TO datadog;
GRANT SELECT ON system.settings TO datadog;
GRANT SELECT ON system.table_engines TO datadog;
GRANT SELECT ON system.one TO datadog;
GRANT REMOTE ON *.* TO datadog;
```

<div class="alert alert-info">To list the nodes, the Agent connects to the other nodes in the cluster using the <code>user</code> and <code>password</code> set for each replica in your <code>remote_servers</code> configuration, or the <code>default</code> user if none is set. Make sure these credentials can log in to every node. If you use <code>single_endpoint_mode</code>, the monitoring user and its grants must also exist on every node.</div>

### What each permission is used for

| Permission | Used for |
|---|---|
| `system.macros` | Finding the cluster name from the `{cluster}` macro. |
| `system.clusters` | Finding the cluster name when no `{cluster}` macro is defined. |
| `system.settings`, `system.table_engines` | Detecting whether the instance runs on ClickHouse Cloud or is self-hosted. |
| `system.one` and `REMOTE` | Listing the nodes in the cluster and reading query data from each of them. |

The `REMOTE` privilege lets the Agent run queries across the nodes of a cluster. It does not grant access to any databases or tables beyond the ones granted above. The `ON *.*` syntax is a ClickHouse requirement for this privilege type. Some ClickHouse versions call this privilege `READ ON REMOTE` in their error messages.

## Restart the Agent

The Agent looks up the cluster once when it starts, and keeps using that result until it restarts. If you applied the grants before upgrading, the upgrade restarts the Agent and no further action is needed. If you applied them after upgrading, [restart the Agent][1].

## Verify the upgrade

After the Agent restarts, open the ClickHouse instance in [Database Monitoring][2] and confirm that query data is tagged with `clickhouse_node`. If the tag is missing:

- Run the [Agent status command][3] and check the ClickHouse check for permission errors.
- Confirm that the grants above are applied to the user the Agent connects as, on every node.
- Confirm that your cluster defines a `{cluster}` macro or a `<remote_servers>` entry that includes the node the Agent connects to. If neither is configured, the Agent cannot identify the cluster, and the `clickhouse_cluster` tag is not reported.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/configuration/agent-commands/#restart-the-agent
[2]: https://app.datadoghq.com/databases
[3]: /agent/configuration/agent-commands/#agent-status-and-information
