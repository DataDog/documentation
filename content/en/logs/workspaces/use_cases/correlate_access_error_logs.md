---
title: Correlate Web Access Logs and Web Error Logs
further_reading:
- link: "/logs/workspaces/"
  tag: "Documentation"
  text: "Learn more about Log Workspaces"
---

## Use case

Log Workspaces enable you to integrate and correlate Apache Web Access Logs and Web Error Logs, providing clear insights into how specific errors impact users. Analyze these logs together to identify which user actions cause errors and address issues proactively. Follow these steps to monitor and correlate Apache Web access and Error logs using the flexible querying and visualization options available within Workspaces.

## Setup

This guide assumes that you are:
- Already submitting logs to Datadog for a similar use case.
- Able to [create a workspace][1] and add cells. 

### 1. Bring in your data source

To get started, bring in the logs from the service(s) you want to analyze.
1. [Create a new Workspace][1].
1. Select **Logs Query** as your data source.

### 2. Query for failed logins

Set up your logs query to filter for `http_web_access` logs and `web_error_logs` to search both sets of logs and gain a better understanding of user errors. For example,

{{< img src="/logs/workspace/use_cases/correlate_access_error_logs/query_access_error_logs.png" alt="Query to filter for http_web_access and web_error_logs" style="width:100%;" >}}

You can add any additional filters, facets, or attributes to narrow your search based on your requirements and what is available in your logs.

### 3. Group status codes together

To analyze the data further, use the Analysis feature to query your datasets with SQL. Create a `status_group` by 200s, 300s, 400s, and 500s to group the status codes together. Anything not matching a status code is marked "unknown". This is helpful for correlating the status codes to the user errors as we will see later on. 

1. Add an [Analysis cell][3] to your workspace.
1. Run this SQL query.
    ```sql
    SELECT timestamp,
      source,
      status_code,
      sourcecategory,
      CASE
        WHEN status_code < 300 THEN '2xx'
        WHEN status_code < 400 THEN '3xx'
        WHEN status_code < 500 THEN '4xx'
        WHEN status_code < 600 THEN '5xx'
        ELSE 'uknown'
      END AS status_group
    FROM web_access_logs
    ```
    {{< img src="/logs/workspace/use_cases/correlate_access_error_logs/group_status_codes_together.png" alt="Analysis cell that queries dataset to group status codes together" style="width:100%;" >}}

### 4. Separate web access logs from error logs

Create a `log_event_type` attribute to differentiate between web access and error logs. Use the `sourcecategory` and `status_group` attributes to categorize logs as `apache_error` for error logs, or as status code groups (such as 2xx, 3xx, 4xx) for access logs. This attribute provides a clearer distinction between different log types and their corresponding events.

{{< img src="/logs/workspace/use_cases/correlate_access_error_logs/separate_web_access_logs_from_error_logs.png" alt="Analysis cell that adds a log_event_type column differentiating web access and error logs" style="width:100%;" >}}

### 5. Visualize error types over time

To gain insight into user errors over time, such as page requests, create a timeseries. 
1. Add a [Visualization cell][4].
1. Choose **Timeseries** from the "Visualize as" dropdown.
1. Configure the graph to display the different log events over time.
  {{< img src="/logs/workspace/use_cases/correlate_access_error_logs/visualize_error_types_over_time.png" alt="Your image description" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/workspaces/#create-a-workspace-and-add-a-data-source
[3]: /logs/workspaces/#analysis-cell
[4]: /logs/workspaces/#visualization-cell
