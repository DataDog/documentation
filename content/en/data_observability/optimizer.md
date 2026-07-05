---
title: Optimizer
description: Get recommendations to reduce the cost and improve the performance of Spark and Databricks jobs, and Snowflake, BigQuery, and Trino queries.
further_reading:
  - link: '/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability Overview'
  - link: '/data_observability/jobs_monitoring/'
    tag: 'Documentation'
    text: 'Jobs Monitoring'
---

<div class="alert alert-info">Optimizer is in preview. Contact your Datadog representative or <a href="/help/">support</a> to request access.</div>

## Overview

Optimizer analyzes your Spark and Databricks jobs, and your Snowflake, BigQuery, and Trino queries, to surface specific recommendations for reducing cost and improving performance — for example, right-sizing cluster configuration or rewriting an inefficient query.

Each recommendation includes an estimated cost or duration impact. Some job recommendations can be applied directly as a code change through Bits AI.

## View recommendations

Recommendations for jobs and clusters appear inline in [Jobs Monitoring][1] job and cluster tables. Select a job or cluster with an available recommendation to open its recommendation details in a side panel.

Each recommendation has a status you can update as you triage it:

| Status | Description |
|---|---|
| {{< ui >}}For Review{{< /ui >}} | The default status for a new recommendation. |
| {{< ui >}}Reviewed{{< /ui >}} | You've looked at the recommendation but haven't acted on it yet. |
| {{< ui >}}Ignored{{< /ui >}} | You've decided not to act on this recommendation. |
| {{< ui >}}Resolved{{< /ui >}} | You've applied the recommendation. |

For recommendations that include a code change, click {{< ui >}}Fix with Bits{{< /ui >}} to have Bits AI apply the change for you.

**Note**: Whether Optimizer generates recommendations for your Snowflake, BigQuery, Databricks, or Trino workloads depends on which recommenders your organization has enabled — contact your Datadog representative to confirm which are active for your account.

[1]: /data_observability/jobs_monitoring/
