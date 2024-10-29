---
title: Detect Fraudulent Transaction Volume by Country
further_reading:
- link: "/logs/workspaces/use_cases/"
  tag: "Documentation"
  text: "Learn more about Log Workspaces"
---

## Prerequisites

This guide assumes that you are:
- submitting logs to Datadog for a similar use case.
- able to [create a workspace][1] and add cells. 

## Setup

Learn how to determine the countries with the highest and lowest call volumes by analyzing your logs. This guide will show you step by step how to build a Log Workspace to answer this question. 

### 1. Perform your initial logs search with a Data Source 

To get started, bring in the logs from the service(s) you want to analyze.
1. Add a logs data source.
1. Filter your logs for the ones related to a call being performed. 
    ```
    service:call-logger status:info “call connected”
    ```

We can assume that your logs have a country code either in the log as an attribute or as part of the log message. If this attribute was not already extracted in a Logs Pipeline (link), then continue to Step 2, otherwise skip ahead to Step 3.

An example log message may look as follows: 
call connected for phone number <redacted> with country code: 123

Let’s name this source raw_call_logs


### 2. Extract the country code from your logs using a Transformation 

If the country code is already extracted as part of a pipeline, skip ahead to Step 3.
If the country name is already extracted as part of a pipeline, skip ahead to Step 4.

Log Workspaces allows you to parse and create attributes at query time. In addition to enrichment via Log Pipelines (link), this is helpful when working with logs that you don’t own or logs that were only partially formatted on ingest. 
- Add a transformation and select the raw_call_logs data source as the target.
- Add an extract operation 
- country code: {number:country_code}
- Rename the cell to call_logs

The country code is now available as a column. 


### 3. Import a Reference Table of Country Codes 

If the country name is already extracted as part of a pipeline, skip ahead to Step 4.

Log Workspaces allows you to import Reference Tables to perform query-time Lookups, similar to those available in Log Pipelines (link).
    - Add a new Reference Table data source and select your Reference Table containing the country id to country code mappings.
    - Rename the cell to country_names

### 4. Count the calls by Country, sort the results in descending order, and join the country codes to complete your investigation 

```
SELECT 
    cn.country_name,
    COUNT(cl.id) AS call_count
FROM 
    call_logs cl
JOIN country_names cn ON cl.country_code = cn.country_code
GROUP BY ccm.country_name
ORDER BY call_count DESC
LIMIT 10;
```

### Next steps

Migrate this Workflow to a Logs Pipeline to Create Monitors 
- This analysis was able to be performed using query-time enrichment via Log Workspaces. 
- To improve the performance of this search and minimize additional work, we recommend migrating the work done in Steps 2 and 3 to Log Processors. 


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/workspaces/#create-a-workspace-and-add-a-data-source
[2]: /logs/workspaces/#analysis-cell
[3]: /logs/workspaces/#visualization-cell