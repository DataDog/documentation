---
title: Analysis Features
description: "Perform advanced data analysis in Notebooks with SQL queries, data transformations, joins, and visualizations across multiple datasets."
site_support_id: advanced_analysis
aliases:
- /logs/workspaces/
- /logs/workspaces/export/
further_reading:
- link: "/notebooks"
  tag: "Documentation"
  text: "Learn more about Notebooks"
- link: "/notebooks/advanced_analysis/getting_started"
  tag: "Documentation"
  text: "Getting Started with Analysis Features"
- link: https://learn.datadoghq.com/courses/log-analytics-with-notebooks
  tag: Learning Center
  text: Log Analytics with Notebooks
- link: "https://learn.datadoghq.com/courses/using-datadog-notebooks-lab"
  tag: "Learning Center"
  text: "Using Datadog Notebooks for Centralized Reporting"

---

{{< callout url="https://www.datadoghq.com/product-preview/additional-advanced-querying-data-sources/" header="Advanced Data Sources">}}
If you want to query data sources not yet available, use this form to submit your request.
{{< /callout >}}

## Overview

The analysis feature in Notebooks allows you to perform advanced analysis on your Datadog data. You can join multiple datasets, chain queries, and transform your data using either predefined transformations or SQL, while retaining the full capabilities that Notebooks provide.

Notebooks are collaborative text editors that allow you to embed Datadog graphs directly into your documents. While this is ideal for exploration and storytelling, deeper investigations might require more advanced control over data queries. The analysis features enable you to run queries that help you:

* Chain queries such as aggregating existing aggregated data or joining two sets of aggregating data.
* Join data across multiple log sources and other datasets.
* Perform advanced parsing, extract data, and add calculated fields at query time.
* Visualize transformed datasets with graphs.

## Adding data to your notebook

To run complex queries in a notebook, first add a **Data Source** cell. There are two ways to do this:

**From a notebook**:
1. Type `/datasource` and press <kbd>Enter</kbd>, or click the **Data Source** tile at the bottom of the page.
2. Type or select your desired data source from the drop down menu and press <kbd>Enter</kbd>.<br/>
**Note**: if there is a data source you want that is not available, request it [here][5].
3. Enter your query. Reserved attributes from the filtered logs are automatically added as columns.

**From the [Log Explorer][1]**:

1. Enter your query in the Log Explorer.
2. Click **Analyze in Notebooks**.
3. Check the **Use as a computational data source** box and select the notebook you want to use.
4. A data source cell is added to the selected notebook with the same query you entered in the Log Explorer. By default, the columns shown in the Log Explorer are included in the data source cell.

## Configuring a data source cell

After adding a data source cell to a notebook, you can continue modifying it to structure the data to suit your analysis needs.

### Change the time frame for the data

By default, data source cells created from Notebooks use the notebook's global time frame. Data source cells created from the Log Explorer use a local time fixed to the time frame at the time of export.

You can switch any data source cell between a local or global time frame using the toggle button in the top right corner of the cell.

### Filter the data source

Regardless of how you create the data source cell, you can modify the query using the search bar. Any changes to the query automatically re-run the data source cell and any downstream cells, updating the preview of the data.

### Add or modify a column

You can add or modify columns in your data source cell. There are two ways to adjust the columns:

- In the preview section, click **columns** to search through available attributes for your data source.
- In the preview, click on a row to open the detail side panel. Click the attribute you want to add as a column, and from the pop up option, select Add "@your_column" to your "@your_datasource" dataset.

{{< img src="/notebooks/analysis_features/add_column_to_dataset.png" alt="Opened detail side panel with the option to add an attribute column to the data source cell" style="width:100%;" >}}

### Calculated fields queries

You can take existing Log Explorer queries that include [Calculated Fields][4] and open them in Notebooks. To transfer these queries from the Log Explorer, click **More** and select **Analyze in Notebooks**. The Calculated Fields automatically convert into a Transformation cell.

You can also create Calculated Fields directly within a notebook to define a computed field from existing data sources. These fields can be reused in subsequent analysis:
1. Open a Workspace with a data source.
1. Add a [Transformation cell](#transformation-cell).
1. Click **More operations**.
1. Select **Calculate**.

{{< img src="/logs/workspace/calculated_fields_transformation_cell.png" alt="Screenshot of an example Workspaces interface with the 'Calculate' option selected from the 'More' dropdown menu, demonstrating how to add Calculated Fields to a query." style="width:100%;" >}}

## Transforming and analyzing data

You can add various cell types to enhance your analysis capabilities. These cells enable you to include additional data sources, such as reference tables, RUM, or spans. Use SQL to join, transform, correlate, and visualize your data effectively. One of the key benefits of this approach is that cells that depend on other cells are automatically updated whenever a dependency changes, ensuring your analysis always reflects the most current data.

### Transformation cell

Add a transformation cell to filter, group, join, or extract data defined in a data source cell.

1. Type `/transformation` and press <kbd>Enter</kbd>, or click on the transform dataset tile at the bottom of the page.
2. Select the data source you want to transform in the source dataset dropdown menu.

After adding the transformation cell, you can add any number of transformation operations inside the cell. Choose an operation from the list of supported transformations:
| Operation | Description |
|-----------|-------------|
| Parse | Enter [grok syntax][2] to extract data into a separate column. In the "from" dropdown menu, select the column the data is getting extracted from. |
| Group | Select what you want to group the data by in the dropdown menus. |
| Join | Select the type of join, the dataset to join against, and the fields to join on. |
| Filter | Add a filter query for the dataset. |
| Calculate | Add a name for the field and the function formula, using the [calculated field formulas][3]. |
| Limit | Enter the number of rows of the dataset you want to display. |
| Sort | Select the sort order and column to sort on. |
| Convert | Allows you to convert a column into a different type. Select the column and the column type to be converted. |

### Analysis cell

You can also transform your data using SQL by adding an analysis cell to your notebook.

1. Type `/sql` or `/analysis` and press <kbd>Enter</kbd>, or click the **SQL Query** tile at the bottom of the page.
2. In the source dataset dropdown, select the data source you want to transform.
3. Write your SQL query. For supported SQL syntax, see the [DDSQL Reference][4].
4. Click **Run** in the top-right corner of the analysis cell to execute your query.

{{< img src="/notebooks/analysis_features/analysis_cell_example.png" alt="Example of an analysis cell with SQL query transforming data in a notebook" style="width:100%;" >}}

## Visualizing transformed data

You can graph the data you've transformed using analysis cells inside a notebook, customizing the visualization with filters, aggregations, and appearance settings.

To graph your data:

1. Type `/graph` and press <kbd>Enter</kbd>, or click the **graph dataset** tile at the bottom of the page.
2. Type or select your desired data source from the drop down menu and press <kbd>Enter</kbd>.
3. Select your visualization type from the graph menu and press <kbd>Enter</kbd>.

## Viewing and exporting data

For any analysis cell that includes a dataset preview, you can view the full 100-row preview by clicking the **View dataset** button.

### Export your query to a dashboard

You can save the results of any analysis cell to a dashboard by clicking **Save to Dashboard** and selecting an existing dashboard, or create a new one. Although this creates a sync between your notebook cell and the exported dashboard graph, changes to the query in your notebook do not automatically update the dashboard.

{{< img src="/notebooks/analysis_features/analysis_cell_save_to_dashboard.png" alt="Example of saving an analysis cell to a dashboard from a notebook" style="width:100%;" >}}

If you update the published cell or any upstream cells, a badge appears in the upper-right corner of the cell indicating **unpublished changes**. After you publish those changes, the updates sync to **all** dashboards where the query is used.

**Note**: By default, the dataset is tied to the global time frame of the **dashboard**, not to the time frame of the notebook. However, you have the ability to set a custom time frame on the dashboard widget.

### Download dataset as a CSV

You can download data from cells for use in external tools or further processing outside of Datadog.

To download your dataset as a CSV file:

1. Navigate to any analysis cell that contains a dataset.
2. Click the download icon in the top-right corner of the cell.
3. Select the number of rows you want to export (up to the maximum available).
4. The CSV file automatically downloads to your computer.

### Schedule a CSV report

With scheduled reports, you can automatically receive query results from notebook analysis cells by email, Slack, or Microsoft Teams.

To schedule a report on an analysis cell:

1. Open the dropdown next to **Save to Dashboard** and select **Schedule report**.

   {{< img src="/notebooks/analysis_features/schedule_report_from_cell_v2.png" alt="Dropdown menu showing the Schedule report option highlighted" style="width:50%;" >}}

2. In the modal, select a schedule to configure when and how often the report is sent.

   {{< img src="/notebooks/analysis_features/select_schedule.png" alt="Schedule selection step in the report configuration modal" style="width:80%;" >}}

3. Enter a report name and select a time frame to define the data included in the report.

   **Note**: If the analysis cell has not yet been published as a dataset, you can specify the name of the dataset created when the report is scheduled.

4. Add email recipients. 
    - The email associated with your Datadog account is included automatically. To remove it, hover over your email and click the trash icon. 
    - To preview the report before saving the schedule, click **Send Test Email**. 

    **Note**: Only Enterprise and Pro accounts can send reports to email addresses that aren't associated with registered Datadog users.
    
    Example report email:
    {{< img src="/notebooks/analysis_features/report_email.png" alt="Example report email" style="width:90%;" >}}

5. Add Slack recipients. 
   - Click on the **Slack** tab, then choose a workspace and channel. 
     - If no workspaces appear, verify that the Datadog [Slack Integration][6] is installed. 
     - Public channels are listed automatically. To send to a private channel, invite the Datadog Slack bot to your channel.
   - To preview the message, add a channel and click **Send Test Message.**

   {{< img src="/notebooks/analysis_features/add_slack_recipients.png" alt="Slack recipient selection in the report scheduling modal" style="width:100%;" >}}

6. Add Microsoft Teams recipients.
   - Click on the **Microsoft Teams** tab, then choose a **Tenant**, **Team**, and **Channel**.
     - Ensure the [Microsoft Teams integration][7] is installed in your Datadog organization.
     - The Datadog app must be added to the target Team in Microsoft Teams.
   - To preview the message, add a channel and click **Send Test Message.**

7.  Save your schedule.

You can view, search, edit, and delete existing report schedules from the **Reports** tab:

{{< img src="/notebooks/analysis_features/reports_page.png" alt="Filtered view of the Reports tab" style="width:90%;" >}}

**Note**: To schedule reports and view other users' schedules, users need the **CSV Report Schedules Write** permission. To edit other users' schedules, users need the **CSV Report Schedules Manage** permission. These permissions can be granted by a user with the **Org Management** permission.

## Writing efficient queries

Notebook queries that read large amounts of data or run heavy computations can be slow or return resource errors. The patterns below are the most common causes—each with a rewrite that usually resolves the issue.

The shortest summary: **filter early, aggregate early.** Work pushed into the query filter or a `GROUP BY` summary is computed against the index; work left to a `JOIN` or a wide `LIMIT` is held in memory.

### Checklist

Walk through this before re-running a heavy query:

- Does the query filter include a selective token (not a wildcard like `service:*` or `env:*`)?
- Is the time range as small as it can be for the question?
- Are you selecting only the columns you actually use?
- If you have a large `LIMIT`, could a `GROUP BY` summary work instead?
- If you have many JOINs, could it be rewritten as a single scan?
- When joining across sources, is each side filtered?
- Is the JOIN key high-cardinality (user / request / trace ID)?
- Is the same regex being run more than once per row?

### Filtering

#### Filter on the data source

Always include a selective token in your data source query—`service:`, `host:`, `env:`, or any `@attribute:value`. Wildcard filters such as `service:*` or `env:*` match every event, so they don't actually narrow the data—treat them as equivalent to leaving the filter blank.

**Before**

```sql
SELECT *
FROM logs
WHERE timestamp >= NOW() - INTERVAL '7 days';      -- no service or host filter
```

**After**

```sql
SELECT *
FROM logs
WHERE service = 'checkout-api'
  AND env     = 'prod'
  AND timestamp >= NOW() - INTERVAL '7 days';      -- same window, but with a selective filter
```

#### Choose a time range that fits the question

Scan cost grows with the time range. Consider starting with a window that covers the question (often a few hours or a day) and widening only when the question demands more. For long-term trends, a pre-aggregated metric or a daily-summary cell is usually cheaper than re-scanning raw events on every run.

In Notebooks, you can lock a cell's time range independently of the global time picker. Setting a conservative default prevents readers from accidentally widening the window to a much larger scan.

*Goal: understand log volume from the billing service over the last month.*

**Before**

```sql
-- A single query scanning 31 days of raw events
SELECT *
FROM logs
WHERE service = 'billing'
  AND timestamp >= NOW() - INTERVAL '31 days';
```

**After**

```sql
-- Aggregate up front for trends instead of scanning raw events
SELECT date_trunc('day', timestamp) AS day, count(*) AS events
FROM logs
WHERE service = 'billing'
  AND timestamp >= NOW() - INTERVAL '7 days'
GROUP BY 1
ORDER BY 1;
```

### Column selection

#### Project only the columns you use

Each column listed in a data source cell is fetched from storage. Trim the column list to what you use downstream—wide attributes like the raw `message` or full HTTP headers can dominate the cost.

**Before**

```sql
SELECT *                                            -- pulls every column, including the raw message
FROM logs
WHERE service = 'checkout-api';
```

**After**

```sql
SELECT timestamp, service, host                     -- only what the analysis uses
FROM logs
WHERE service = 'checkout-api';
```

### Aggregations

#### Return summaries, not raw rows

Asking for millions of raw rows isn't free—the engine has to buffer them in memory, transmit them over the network, and render them in your notebook, even if the underlying scan is bounded. If your goal is to understand the data (top-N, counts per category, distributions), a `GROUP BY` returns a small summary that costs far less and is easier to read.

**Before**

```sql
-- Returns up to 5,000,000 raw rows
SELECT *
FROM logs WHERE service = 'orders-api'
LIMIT 5000000;
```

**After**

```sql
-- Returns ~10 rows (one per status_code), answers the actual question
SELECT status_code, count(*) AS hits
FROM logs WHERE service = 'orders-api'
GROUP BY status_code
ORDER BY hits DESC
LIMIT 100;
```

**Note:** Aggregating in SQL with `GROUP BY` is more efficient than fetching raw rows and letting a visualization cell aggregate them—the engine returns a small summary instead of buffering millions of rows.

#### Narrow the scan before aggregating on a high-cardinality column

`SELECT DISTINCT` or `GROUP BY` on a high-cardinality column (an email, an IP, a request ID) keeps one entry per distinct value across workers, which grows unboundedly without a tight filter. Narrow the data source filter first so the aggregation runs over fewer rows. For wide cardinalities, pre-aggregate to one row per time bucket and key, then count distinct across buckets. `approx_distinct(...)` is cheaper than exact `count(distinct ...)`.

*Goal: find the distinct user emails in the checkout service's logs over the last 7 days.*

**Before**

```sql
SELECT DISTINCT user_email
FROM logs
WHERE timestamp >= NOW() - INTERVAL '7 days';    -- no service filter, unbounded set
```

**After**

```sql
-- Pre-aggregate to one row per (day, email), then count distinct across days
SELECT count(DISTINCT user_email) AS distinct_emails
FROM (
  SELECT date_trunc('day', timestamp) AS day, user_email
  FROM logs
  WHERE service = 'checkout-api'
    AND timestamp >= NOW() - INTERVAL '7 days'
  GROUP BY 1, 2
) daily;
```

### Joins

#### Combine self-joins into a single scan

Joining one source to itself many times to correlate different events is one of the most common causes of slow notebook queries. Most self-joins can be rewritten as a single scan with `CASE` expressions, window functions, or `GROUP BY ... HAVING`.

**Before—4 self-joins**

```sql
WITH a AS (SELECT user_id FROM logs WHERE service='checkout-api'),
     b AS (SELECT user_id FROM logs WHERE service='payment-api'),
     c AS (SELECT user_id FROM logs WHERE service='shipping-api'),
     d AS (SELECT user_id FROM logs WHERE service='orders-api')
SELECT user_id
FROM a JOIN b USING (user_id)
       JOIN c USING (user_id)
       JOIN d USING (user_id);
```

**After—single scan**

```sql
SELECT user_id
FROM logs
WHERE service IN ('checkout-api','payment-api','shipping-api','orders-api')
GROUP BY user_id
HAVING count(DISTINCT service) = 4;
```

#### Use a high-cardinality join key

Prefer a high-cardinality key (`user_id`, `request_id`, `trace_id`) when joining. Coarse keys like `service` or `status` can expand a moderate input into billions of intermediate rows. For large datasets, also narrow the data source filter and time range on each side of the join.

#### Filter both sides of a cross-source join

When you `JOIN` across two data sources (logs + RUM, logs + traces, feed + logs), apply a selective filter on each side. An unfiltered side becomes a full scan that has to be held in memory for the join. Where possible, pre-aggregate each source in its own cell and join the summaries in a final cell.

**Before**

```sql
SELECT l.message, r.user_id
FROM logs l                                         -- no filter on the logs side
JOIN rum  r ON l.trace_id = r.trace_id
WHERE r.view_name = 'cart';
```

**After**

```sql
SELECT l.message, r.user_id
FROM logs l
JOIN rum  r ON l.trace_id = r.trace_id
WHERE l.service   = 'checkout-api'                  -- both sides filtered
  AND l.status    = 'error'
  AND r.view_name = 'cart';
```

### Expressions

#### Run regular expressions once per row

If you call `REGEXP_MATCH` once for each output column, the same pattern is evaluated against `message` repeatedly for every row. Run it once into an array, join the captures into a single delimited string, and unpack them with `SPLIT_PART` in a downstream `SELECT`.

**Before**

```sql
SELECT
  SPLIT_PART(ARRAY_TO_STRING(REGEXP_MATCH(message, 'user_id=(\S+) latency_ms=(\d+) error=(\S+)'), '|||'), '|||', 1) AS user_id,
  SPLIT_PART(ARRAY_TO_STRING(REGEXP_MATCH(message, 'user_id=(\S+) latency_ms=(\d+) error=(\S+)'), '|||'), '|||', 2) AS latency_ms,
  SPLIT_PART(ARRAY_TO_STRING(REGEXP_MATCH(message, 'user_id=(\S+) latency_ms=(\d+) error=(\S+)'), '|||'), '|||', 3) AS error_code
  -- same regex evaluated 3 times per row
FROM logs;
```

**After**

```sql
SELECT
  SPLIT_PART(matched, '|||', 1) AS user_id,
  SPLIT_PART(matched, '|||', 2) AS latency_ms,
  SPLIT_PART(matched, '|||', 3) AS error_code
FROM (
  SELECT ARRAY_TO_STRING(REGEXP_MATCH(message, 'user_id=(\S+) latency_ms=(\d+) error=(\S+)'), '|||') AS matched
  FROM logs
) sub;
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs
[2]: /logs/log_configuration/parsing/
[3]: /logs/explorer/calculated_fields/formulas/
[4]: /ddsql_reference/
[5]: https://www.datadoghq.com/product-preview/additional-advanced-querying-data-sources/
[6]: /integrations/slack/?tab=datadogforslack
[7]: /integrations/microsoft_teams/
