---
title: Analyze Login Attempts for e-PHI
further_reading:
- link: "/logs/workspaces/"
  tag: "Documentation"
  text: "Learn more about Log Workspaces"
---

## Use case

Log Workspaces allows you to bring in log data to analyze login attempts and audit access to electronic protected health information (e-PHI). To start monitoring and identifying failed login attempts, use Workspaces' flexible querying and visualization options by following these steps.

## Setup

This guide assumes that you are:
- Submitting logs to Datadog for a similar use case.
- Able to [create a workspace][1] and add cells. 

### 1. Bring in your data source

To get started, bring in the logs from the service(s) you want to analyze.
1. [Create a new Workspace][2].
1. Select **Logs Query** as your data source.

### 2. Query for failed logins

To search for failed login attempts, which might indicate unauthorized attempts to access e-PHI, set up your logs query to filter for these events. An example query might include filtering by an event outcome code that signifies failure.

{{< img src="/logs/workspace/use_cases/query_failed_logs.png" alt="Example workspace query to find failed login attempts" style="width:100%;" >}}

You can add any additional filters, facets, or attributes to narrow your search based on your requirements and what is available in your logs.

### 3. Count failed logins by user ID

To analyze the data further, you can count the number of failed login attempts by user ID and sort the results. This is helpful for identifying users with repeated failed login attempts, which may require further investigation.

1. Add an [Analysis cell][3] to your workspace.
1. Run a SQL query.
    ```
    SELECT * FROM failed_logins
    ```
    {{< img src="/logs/workspace/use_cases/analyze_failed_login_count.png" alt="Analysis cell with query to count the number of failed logins" style="width:100%;" >}}

### 4. Visualize failed logins over time

To get a clearer picture of when failed logins are occurring, you can create a timeline or Timeseries visualization.
1. Add a [Visualization cell][4].
1. Choose Timeseries from the "Visualize as" dropdown.
1. Configure the graph to display the number of failed login attempts over time, using your query results as the data source.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/workspaces/#create-a-workspace-and-add-a-data-source
[2]: /logs/workspaces/
[3]: /logs/workspaces/#analysis-cell
[4]: /logs/workspaces/#visualization-cell
