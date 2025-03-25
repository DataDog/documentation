---
title: CI Health
description: "Monitor and analyze the health of your CI pipelines"
further_reading:
- link: "/continuous_integration/pipelines/"
  tag: "Documentation"
  text: "CI Pipeline Visibility"
- link: "/continuous_integration/explorer/"
  tag: "Documentation"
  text: "Search and filter pipeline executions"
---

[CI Health][1] provides centralized visibility into your CI pipelines so you can improve CI processes based on precise objectives. The page organizes pipeline metrics, test results, and execution data to help you identify the most impactful pipelines and jobs within the following main objectives:

   - [Save Developer Time](#save-developer-time)
   - [Reduce CI Cost](#reduce-ci-cost)
   - [Speed Up Pipelines](#speed-up-pipelines)

No additional setup is needed—the CI Health page is available out-of-the-box when you enable [CI Visibility][2].

<div style="width:600px; height:400px; background-color:#CCCCCC; display:flex; justify-content:center; align-items:center;">image placeholder</div><br />

## Save Developer Time

This objective helps you minimize the time developers spend running pipelines multiple times to make them pass. 

By default, pipelines are sorted by their retry percentage, so you can focus on pipelines with the most retries. Aggregated data shows the portion of commits ending in failure and how many are flaky (both failing and passing across multiple runs).

To reduce flakiness, click on a pipeline and sort the results in the side panel to find the flakiest jobs. You can also use the breakdown column to identify the [types of failures][3], which can give you insight into possible root causes. Click **View Pipeline Executions** to further investigate CI runs in [Pipeline Executions][4].

<div style="width:600px; height:400px; background-color:#CCCCCC; display:flex; justify-content:center; align-items:center;">image placeholder</div><br />

## Reduce CI Cost

This objective helps you reduce the cost of your CI environment by identifying wasted compute time from pipeline retries.

This view highlights the **wasted active jobs time**, which is the sum of durations of jobs that needed retries. In SaaS CI environments, this indicates potential savings in billable time you wouldn't have to pay for if there were no flaky pipelines. 

This measure is also significant for on-premises CI runners, though it may overestimate the impact of pipelines with parallelized jobs. For self-hosted CI environments, **wasted runners time** represents the infrastructure cost that you could save without flaky pipelines.

By default, pipelines are sorted by **wasted active jobs time**, so you can focus on pipelines contributing to your CI cost with the most retries.

<div class="alert alert-info">Change the <b>Aggregation</b> method from <b>Avg</b> to <b>Sum</b> to find the biggest contributors to cost due to wasted CI time.</div>

To reduce flakiness, click on a pipeline and sort the results in the side panel to find the flakiest jobs. You can also use the breakdown column to identify the [types of failures][3], which can give you insight into possible root causes. Click **View Pipeline Executions** to further investigate CI runs in [Pipeline Executions][4].

<div style="width:600px; height:400px; background-color:#CCCCCC; display:flex; justify-content:center; align-items:center;">image placeholder</div><br />

## Speed Up Pipelines

This objective helps you reduce the time needed to get a passing pipeline per commit.

This view highlights the **time to pass**, which is the time from the first execution to the first passing pipeline. It represents how much time is needed for a commit to get a successful pipeline. This can impact the [DORA metrics][5] _lead time for changes_ and _time to restore service_.

<div style="width:600px; height:400px; background-color:#CCCCCC; display:flex; justify-content:center; align-items:center;">image placeholder</div><br />

The breakdown column identifies several types of time measurements and how they contribute to the total time to pass:

- **Execution time**: The running time of the pipeline. To reduce this, focus on optimizing jobs in the [critical path][6]. Click on a pipeline and sort by the **Time on critical path** column in the side panel.

   <br /><div style="width:500px; height:300px; background-color:#CCCCCC; display:flex; justify-content:center; align-items:center;">image placeholder</div><br />

- **Idle time**: The time between pipeline executions. To reduce this:  
   - Minimize flakiness in pipelines and jobs.
   - Apply [Auto Test Retries][7].
   - Optimize notifications so developers know their pipeline failed and may need a retry.

- **Pipeline creation time**: The time spent creating the pipeline.
- **Queue time**: The time jobs spend waiting for a runner. To reduce this, spin up more runners.
- **Wait/Approval time**: The time for manual approvals.
- **Other time**: Uncategorized time contributing to total time to pass.

[1]: https://app.datadoghq.com/ci/pipelines/health
[2]: /continuous_integration/
[3]: /continuous_integration/search/#ai-generated-log-summaries
[4]: /continuous_integration/explorer
[5]: /dora_metrics
[6]: /continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[7]: /tests/flaky_test_management/auto_test_retries/
