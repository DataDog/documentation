---
title: Getting Started with Notebooks Analysis Features
description: "Step-by-step walkthrough of multi-step data analysis in Notebooks including data import, parsing, joins, transformations, and visualizations."
further_reading:
- link: "/notebooks/advanced_analysis"
  tag: "Documentation"
  text: "Analysis Features"
---

## Overview

{{< img src="logs/workspace/datasets_example.png" alt="The workspace datasets" style="width:100%;" >}}

This example notebook walks through a multi-step analysis that transforms and visualizes log and reference data. It begins by importing several data sources, then processes and enriches them through parsing, joins, and transformations to build derived datasets. The walkthrough concludes with a visualization that highlights the final results, helping illustrate the full data journey from raw logs to structured insights.

This diagram shows how the data flows through each transformation and analysis step.

{{< img src="logs/workspace/workspace_flowchart.png" alt="A flowchart showing the steps that the data sources go through" style="width:80%;"  >}}

## Step-by-Step walkthrough on building the analysis

### 1. Importing data sources

The analysis begins with two primary log data sources:
- `trade_start_logs`: Contains information about trade initiation
- `trade_execution_logs`: Contains details about trade execution

### 2. Extracting transaction IDs

The first transformation uses a transform cell to create `parsed_execution_logs`. This cell applies [grok parsing syntax][1] to extract transaction IDs from the `message` column of `trade_execution_logs`, creating a new `transaction_id` column:
```
transaction %{notSpace:transaction_id}
```

An example of the resulting `parsed_execution_logs` dataset:

| timestamp           | host             | message                            | transaction_id |
| ------------------- | ---------------- | ---------------------------------- | ----------- |
| May 29 11:09:28.000 | shopist.internal | Executing trade for transaction 56519 | 56519       |
| May 29 10:59:29.000 | shopist.internal | Executing trade for transaction 23269 | 23269       |
| May 29 10:58:54.000 | shopist.internal | Executing trade for transaction 96870 | 96870       |
| May 31 12:20:01.152 | shopist.internal | Executing trade for transaction 80207 | 80207       |

### 3. Joining trade start and execution logs

The next step uses an analysis cell to create `transaction_record`. This SQL query selects specific columns from both datasets, transforms the status field (converting 'INFO' to 'OK'), and joins the datasets on transaction_id:

```sql
SELECT
    start_logs.timestamp,
    start_logs.customer_id,
    start_logs.transaction_id,
    start_logs.dollar_value,
    CASE
        WHEN executed_logs.status = 'INFO' THEN 'OK'
        ELSE executed_logs.status
    END AS status
FROM
    trade_start_logs AS start_logs
JOIN
    trade_execution_logs AS executed_logs
ON
    start_logs.transaction_id = executed_logs.transaction_id;
```

An example of the resulting `transaction_record` dataset:

| timestamp           | customer_id | transaction_id | dollar_value | status |
| ------------------- | ----------- | -------------- | ------------ | ------ |
| May 29 11:09:28.000 | 92446       | 085cc56c-a54f  | 838.32       | OK     |
| May 29 10:59:29.000 | 78037       | b1fad476-fd4f  | 479.96       | OK     |
| May 29 10:58:54.000 | 47694       | cb23d1a7-c0cb  | 703.71       | OK     |
| May 31 12:20:01.152 | 80207       | 2c75b835-4194  | 386.21       | ERROR  |

Then the reference table `trading_platform_users` is added as a data source:

| customer_name  | customer_id | account_status |
| -------------- | ----------- | -------------- |
| Meghan Key     | 92446       | verified       |
| Anthony Gill   | 78037       | verified       |
| Tanya Mejia    | 47694       | verified       |
| Michael Kaiser | 80207       | fraudulent     |

### 4. Enriching transaction data with customer information

The analysis cell `transaction_record_with_names` uses SQL to join the transaction data with customer information. This query selects columns from both datasets, enriching the transaction records with customer names and account status:

```sql
SELECT tr.timestamp, tr.customer_id, tpu.customer_name, tpu.account_status, tr.transaction_id, tr.dollar_value, tr.status
FROM transaction_record AS tr
LEFT JOIN trading_platform_users AS tpu ON tr.customer_id = tpu.customer_id;
```

An example of the resulting `transaction_record_with_names` dataset:

| timestamp           | customer_id | customer_name  | account_status | transaction_id | dollar_value | status |
| ------------------- | ----------- | -------------- | -------------- | -------------- | ------------ | ------ |
| May 29 11:09:28.000 | 92446       | Meghan Key     | verified       | 085cc56c-a54f  | 838.32       | OK     |
| May 29 10:59:29.000 | 78037       | Anthony Gill   | verified       | b1fad476-fd4f  | 479.96       | OK     |
| May 29 10:58:54.000 | 47694       | Tanya Mejia    | verified       | cb23d1a7-c0cb  | 703.71       | OK     |
| May 31 12:20:01.152 | 80207       | Michael Kaiser | fraudulent     | 2c75b835-4194  | 386.21       | ERROR  |

### 5. Visualizing error transactions

Finally, a treemap visualization cell is created to identify problematic transactions. The visualization uses the `transaction_record_with_names` dataset with a filter for `status:ERROR` logs and groups the data by `dollar_value`, `account_status`, and `customer_name`, making it easy to spot patterns in failed transactions.

{{< img src="logs/workspace/treemap.png" alt="The workspace datasets" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_configuration/parsing/
