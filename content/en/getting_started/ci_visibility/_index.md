---
title: Getting Started with CI Visibility
kind: documentation
further_reading:
- link: 'https://www.datadoghq.com/blog/monitor-ci-pipelines/'
  tag: 'Blog'
  text: 'Monitor all your CI pipelines with Datadog'
- link: 'https://www.datadoghq.com/blog/best-practices-for-ci-cd-monitoring/'
  tag: 'Blog'
  text: 'Best practices for CI/CD monitoring'
- link: '/continuous_integration/pipelines'
  tag: 'Documentation'
  text: 'Learn about CI Pipeline Visibility'
- link: '/monitors/types/ci'
  tag: 'Documentation'
  text: 'Learn about CI Pipeline Monitors'
algolia:
  tags: ["pipeline visibility", "pipelines", "ci pipeline"]
---

## Overview

CI Visibility, or CI Pipeline Visibility, allows you to monitor the health of your CI pipelines and visualize the performance of your pipeline executions as traces, where spans represent the different levels of the pipeline. 

{{< img src="/getting_started/ci_visibility/pipelines_list.png" alt="A list view of your CI pipelines in Datadog CI Visibility" style="width:100%" >}}

You can forward CI job logs and automatically correlate them with your pipelines in CI Visibility. Depending on the providers you are using, you can either enable job log collection on the [**Settings** page][1] in CI Visibility or in your provider’s settings to integrate with Datadog.

You can also use the `datadog-ci` CLI to [trace commands][2] in your pipelines, as well as the [custom tags and measures commands][3] to add user-defined text and numerical tags in your pipeline traces.

CI Visibility provides DevOps and platform engineering organizations with comprehensive monitoring, analytics, and the ability to pinpoint and resolve bottlenecks, optimize resource allocation, and decrease CI costs. 

By integrating performance metrics, logs, and alerts, organizations can improve development speed, increase the reliability of their pipelines, and make data-informed decisions across cloud and self-hosted environments.

## Set up your CI provider

CI Visibility tracks the performance and results of your CI pipelines, and displays results after the pipeline finishes. 

To start sending pipeline metrics, see the documentation for one of the following CI providers that Datadog supports below.

{{< partial name="continuous_integration/ci-pipelines-getting-started.html" >}}

</br>

If your CI provider is not supported, you can programmatically send your pipeline events to Datadog. See the [Send pipeline events to Datadog section](#send-pipeline-events-to-datadog).

Depending on the CI provider(s) of choice, CI Visibility may not support all of the levels in your pipeline (stage, job, step, or command). For more information about how CI Visibility defines a CI pipeline, see the [Terminology section][4].

## Use CI pipeline data

Access your pipelines’ metrics (such as queue times, durations, percentiles, and statuses) to start identifying important trends and patterns using the data collected across your CI providers. 

{{< img src="/getting_started/ci_visibility/pipelines_dashboard.png" alt="An out-of-the-box dashboard with widgets displaying data collected from your pipelines, jobs, and stages in CI Visibility" style="width:100%" >}}

You can create [dashboards][5] to visualize at which points failures are happening in your pipelines, or use an [out-of-the-box dashboard][6] containing widgets populated with data collected in CI Visibility to visualize the health and performance of your CI pipelines, stages, and jobs.

## Search and manage your CI pipelines

The [**CI Pipeline List** page][7] provides a comprehensive view of the performance and reliability of your CI pipelines, for the default branch. Access aggregated statistics, trends, and information about your pipelines to identify and resolve issues like failures and regressions.

To enhance troubleshooting and streamline your pipeline management processes, click on a pipeline to access insights, review execution histories, and pivot to logs and related telemetry data. For more information, see [Search and Manage CI Pipelines][8].

## Examine results in the CI Visibility Explorer

The [CI Visibility Explorer][9] allows you to create visualizations and filter pipeline spans using the data collected from your CI providers. Each pipeline execution is reported as a trace, which includes stage and job information. 

{{< tabs >}}
{{% tab "Pipeline" %}}

Navigate to [**Software Delivery** > **CI Visibility** > **Executions**][101] and select `Pipeline` to start filtering your pipeline span results. 

{{< img src="/getting_started/ci_visibility/pipeline_view.png" alt="Pipeline execution results in the CI Visibility Explorer filtered on the Shopist repository" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/pipeline-executions?query=ci_level%3Apipeline

{{% /tab %}}
{{% tab "Stage" %}}

Navigate to [**Software Delivery** > **CI Visibility** > **Executions**][101] and select `Stage` to start filtering your stage span results. 

{{< img src="/getting_started/ci_visibility/stage_view.png" alt="Stage results in the CI Visibility Explorer filtered on the Shopist repository" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/pipeline-executions?query=ci_level%3Astage

{{% /tab %}}
{{% tab "Job" %}}

Navigate to [**Software Delivery** > **CI Visibility** > **Executions**][101] and select `Job` to start filtering your job span results. 

{{< img src="/getting_started/ci_visibility/job_view.png" alt="Job results in the CI Visibility Explorer filtered on the Shopist repository" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/pipeline-executions?query=ci_level%3Ajob

{{% /tab %}}
{{% tab "Step" %}}

Navigate to [**Software Delivery** > **CI Visibility** > **Executions**][101] and select `Step` to start filtering your step span results. 

{{< img src="/getting_started/ci_visibility/step_view.png" alt="Step results in the CI Visibility Explorer filtered on the Shopist repository" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/pipeline-executions?query=ci_level%3Astep

{{% /tab %}}
{{< /tabs >}}

Use [facets][9] to customize the search query and identify changes in time spent on each level of your pipeline.

Once you click into a pipeline, you can access individual pipeline executions listed in the **Pipeline Executions** section. When you click on a pipeline execution, you can see a flame graph or a list of spans in the **Trace** tab. 

{{< img src="/getting_started/ci_visibility/executions.png" alt="Pipeline execution results visualized as a flame graph for the Staging Build and Test pipeline" style="width:100%" >}}

You can identify bottlenecks in your pipeline and examine individual nodes ranked from the largest to smallest percentage of execution time. 

After you have set up Test Visibility, you can access information about tests that were run in your CI pipelines, including the test status (Failed, New Flaky, Passed, or Skipped), on the Test Runs tab in a pipeline execution’s side panel. For more information, see the [Flaky Test Management documentation][10].

You can access pipeline or job logs across cloud and self-hosted runners and see information about your runners on the Logs tab in a pipeline execution’s side panel.

If you are using [supported providers][11], you can correlate infrastructure metrics with your GitLab jobs and access the GitLab job’s host, system, host tags, and host metrics information. For more information, see [Correlate Infrastructure Metrics with GitLab Jobs in Datadog][12].

## Send pipeline events to Datadog

For other pipeline providers and custom pipelines, you can programmatically send pipeline events to Datadog using the [CI Visibility Pipelines API][16]. For more information, see [Pipeline Data Model and Execution Types][13].

Provide the following Git information (the repository URL, commit SHA, and the author email) of the commit that triggered the pipeline execution in the request.

## Create a CI pipeline monitor

Alert relevant teams in your organization about pipeline health and performance regressions when failures occur or duration thresholds are exceeded in your CI pipelines with [CI monitors][14].

{{< img src="/getting_started/ci_visibility/avg_duration_monitor.png" alt="A CI pipeline monitor configured to trigger an alert when the average duration for the Test and Deploy Cart pipeline exceeds five minutes in the past day" style="width:100%" >}}

To set up a monitor that alerts on your CI pipeline when the average duration in the past day exceeds a five minute threshold:

1. Navigate to [**Monitors** > **New Monitor**][15] and select **CI**. 
1. Select a common monitor type for CI pipelines to get started, for example: `Long Running Pipeline` to trigger alerts when a pipeline has been running for too long or `Failed Job` to trigger alerts for job failures, or customize your own search query. In this example, enter `@ci.pipeline.name:test_and_deploy_cart` and select the Avg of `Duration (@duration)`.
1. In the `Evaluate the query over the` section, select **last 1 day**. 
1. Set the alert conditions to trigger when the evaluated value is **above** the threshold, and specify values for the alert or warning thresholds, such as `Alert threshold > 300000000000`.
1. In the `Configure notifications and automations` section, configure your monitor's notification settings.
1. Set permissions for the monitor.
1. Click **Create**.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/settings
[2]: /continuous_integration/pipelines/custom_commands/
[3]: /continuous_integration/pipelines/custom_tags_and_measures/
[4]: /continuous_integration/pipelines/?tab=githubactions#terminology
[5]: /dashboards/
[6]: https://app.datadoghq.com/dash/integration/30516/ci-visibility---pipelines-dashboard
[7]: https://app.datadoghq.com/ci/pipelines
[8]: /continuous_integration/search/
[9]: /continuous_integration/explorer
[10]: /tests/guides/flaky_test_management/
[11]: /continuous_integration/pipelines/?tab=githubactions#supported-features
[12]: /continuous_integration/guides/infrastructure_metrics_with_gitlab/
[13]: /continuous_integration/guides/pipeline_data_model/
[14]: /monitors/types/ci/?tab=pipelines
[15]: https://app.datadoghq.com/monitors/create
[16]: /api/latest/ci-visibility-pipelines/