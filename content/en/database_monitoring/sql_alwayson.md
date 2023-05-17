---
title: Exploring SQL Server AlwaysOn Availability Groups
kind: documentation
further_reading:
- link: "/database_monitoring/"
  tag: "Documentation"
  text: "Database Monitoring"
- link: "/setup_sql_server/"
  tag: "Documentation"
  text: "Setting Up SQL Server"
- link: "/database_monitoring/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting Database Monitoring"
---

The AlwaysOn Clusters view enables you to detect data synchronization issues, understand availability group behavior, and identify cluster bottlenecks.

...access high-level overviews of your SQL Server AlwaysOn availability groups to quickly assess database health at any given time. 

To navigate to the AlwaysOn Clusters view within Database Monitoring, select **AlwaysOn Clusters** on the **Databases** tab.

On the **Databases** tab, select **AlwaysOn Clusters**.

## Determine the state of your nodes

Use the AlwaysOn Clusters view to detect data synchronization issues within your availability groups. Each primary (P) and secondary (S) node is color-coded based on its current state.

To identify clusters that are experiencing issues, use the status filters to identify groups with nodes that are Reverting, Not Synchronizing, and so forth.

You can also use the timeseries graphs to spot unusual performance activity in your clusters based on log, redo, and secondary lag time metrics.

{{< img src="database_monitoring/dbm_alwayson.png" alt="View SQL Server AlwaysOn groups" style="width:100%;">}}

## Analyze historical metrics

When you want a comprehensive picture of your database health, you can view historical metrics for every node in your AlwaysOn availability groups. By selecting a cluster, you can access a timeseries of past synchronization states for this availability group, categorized by node. You can also view send, redo, and lag metrics for each of the secondary nodes. This information (shown in the following screenshot) helps you spot nodes that have been experiencing issues, as well as perform investigations into failures and bottlenecks.

Let’s say that you’re analyzing a recent failover that resulted in data loss that exceeded your recovery point objective (RPO). You access historical metrics for this cluster using the AlwaysOn view and see that several of the nodes frequently fell out of sync. You note the host information for the nodes and decide to investigate whether there were recent issues with these servers. You can then bring these findings back to your team and come up with strategies for scaling your infrastructure, helping you prevent future latency and provide support for your databases.

{{< img src="database_monitoring/dbm_alwayson_history.png" alt="View SQL Server AlwaysOn groups" style="width:100%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}