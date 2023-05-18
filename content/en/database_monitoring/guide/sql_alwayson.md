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

The Database Monitoring AlwaysOn Clusters view enables you to detect data synchronization issues, understand availability group behavior, and identify cluster bottlenecks in SQL Server availability groups.

To access the AlwaysOn Clusters view, navigate to the **APM** > **Database Monitoring** > **Databases** tab and select **AlwaysOn Clusters**.

## Determine the health of your nodes

Use the AlwaysOn Clusters view to evaluate the health of your SQL Server availability groups. When selected, the page shows a color-coded visualization based on the current status of the primary (P) and secondary (S) nodes in each availability group.

To identify groups that are experiencing issues, use the status filters to show groups with nodes that are Reverting, Not Synchronizing, and so forth. You can also use the timeseries graphs to spot unusual performance activity in your clusters based on log, redo, and secondary lag time metrics.

{{< img src="database_monitoring/dbm_alwayson.png" alt="View SQL Server AlwaysOn groups" style="width:100%;">}}

## Analyze historical metrics

To evaluate how node synchronization states have fluctuated over time, select an availability group to open the details side panel. The **Historical Synchronization States** timeseries graph

When you want a comprehensive picture of your database health, you can view historical metrics for every node in your AlwaysOn availability groups. By selecting a cluster, you can access a timeseries of past synchronization states for this availability group, categorized by node. You can also view send, redo, and lag metrics for each of the secondary nodes. This information (shown in the following screenshot) helps you spot nodes that have been experiencing issues, as well as perform investigations into failures and bottlenecks.

{{< img src="database_monitoring/dbm_alwayson_history.png" alt="View SQL Server AlwaysOn groups" style="width:80%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}