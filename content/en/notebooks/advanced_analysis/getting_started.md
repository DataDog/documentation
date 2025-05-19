---
title: Getting Started with Notebooks Analysis Features
further_reading:
- link: "/notebooks/advanced_analysis"
  tag: "Documentation"
  text: "Analysis Features"
---

{{< callout btn_hidden="true" header="Join the Preview!">}} 
  Advanced Analysis is in Preview. To enable, reach out to your Customer Success Manager.
{{< /callout >}}

## Overview

{{< img src="logs/workspace/datasets_example.png" alt="The workspace datasets" style="width:100%;" >}}

This example analysis notebook has:
-  Three data sources:
	- `trade_start_logs`
	- `trade_execution_logs`
	- `trading_platform_users`
- Three derived datasets, which are the results of data that has been transformed from filtering, grouping, or querying using SQL:
    - `parsed_execution_logs`
    - `transaction_record`
    - `transaction_record_with_names`

- One treemap visualization.

This diagram shows the different transformation and analysis cells the data sources go through.

{{< img src="logs/workspace/workspace_flowchart.png" alt="A flowchart showing the steps that the data sources go through" style="width:80%;"  >}}

### Example walkthrough

The example starts off with two logs data sources:
- `trade_start_logs`
- `trade_execution_logs`

The next cell in the analysis notebook is the transform cell `parsed_execution_logs`. It uses the following [grok parsing syntax][3] to extract the transaction ID from the `message` column of the `trade_execution_logs` dataset and adds the transaction ID to a new column called `transaction_id`.

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

The analysis cell `transaction_record` uses the following SQL command to select specific columns from the `trade_start_logs` dataset and the `trade_execution_logs`, renames the status `INFO` to `OK`, and then joins the two datasets.

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

The analysis cell `transaction_record_with_names` runs the following SQL command to take the customer name and account status from `trading_platform_users`, appending it as columns, and then joins it with the `transaction_records` dataset:

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

Finally, a treemap visualization cell is created with the `transaction_record_with_names` dataset filtered for `status:error` logs and grouped by `dollar_value`, `account_status`, and `customer_name`.

{{< img src="logs/workspace/treemap.png" alt="The workspace datasets" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}