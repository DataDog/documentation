---
title: Continuous Integration Visibility
aliases:
  - /ci
  - /continuous_integration/pipelines_setup/
  - /continuous_integration/explore_pipelines/
  - /continuous_integration/setup_pipelines/
further_reading:
  - link: "/account_management/billing/ci_visibility"
    tag: "Documentation"
    text: "Learn about billing considerations for CI Visibility"
  - link: "/continuous_integration/tests/"
    tag: "Documentation"
    text: "Explore test data to find and fix problem tests"
  - link: "/monitors/types/ci/"
    tag: "Documentation"
    text: "Creating CI Pipeline Monitors"
  - link: "/cicd/troubleshooting/pipelines/"
    tag: "Documentation"
    text: "Troubleshooting CI Visibility"
  - link: "https://www.datadoghq.com/blog/circleci-monitoring-datadog/"
    tag: "Blog"
    text: "Monitor your CircleCI environment with Datadog"
  - link: "https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/"
    tag: "Blog"
    text: "Configure pipeline alerts with Datadog CI monitors"
  - link: "https://www.datadoghq.com/blog/static-web-application-monitoring-best-practices/"
    tag: "Blog"
    text: "Best practices for monitoring static web applications"
  - link: "https://www.datadoghq.com/blog/best-practices-for-ci-cd-monitoring/"
    tag: "Blog"
    text: "Best practices for CI/CD monitoring"
  - link: "https://www.datadoghq.com/blog/best-practices-for-monitoring-software-testing/"
    tag: "Blog"
    text: "Best practices for monitoring software testing in CI/CD"
  - link: "https://www.datadoghq.com/blog/modernize-your-ci-cd-environment/"
    tag: "Blog"
    text: "Monitor your CI/CD modernizations with Datadog CI Pipeline Visibility"
  - link: "https://www.datadoghq.com/blog/datadog-detection-as-code/"
    tag: "Blog"
    text: "How we use Datadog for detection as code"
  - link: "https://www.datadoghq.com/blog/cache-purge-ci-cd/"
    tag: "Blog"
    text: "Patterns for safe and efficient cache purging in CI/CD pipelines"
  - link: "https://www.datadoghq.com/blog/gitlab-source-code-integration"
    tag: "Blog"
    text: "Troubleshoot faster with the GitLab Source Code integration in Datadog"
  - link: "https://www.datadoghq.com/blog/platform-engineering-metrics/"
    tag: "Blog"
    text: "Success Metrics for Platform Engineering Teams"
  - link: "https://app.datadoghq.com/release-notes?category=Software%20Delivery"
    tag: "Release Notes"
    text: "Check out the latest Software Delivery releases! (App login required)"
cascade:
    algolia:
        rank: 70
        tags: ['ci/cd', 'continuous integration']
---

{{< callout url=# btn_hidden="true" header="CI Visibility is part of CI/CD Optimization">}}CI/CD Optimization combines CI Visibility and Test Optimization into one unified interface. This page covers CI Visibility; for features shared with Test Optimization, see [CI/CD Optimization][1].

[1]: /cicd/
{{< /callout >}}

{{< learning-center-callout header="Join an enablement webinar session" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=CI">}}
  Join the Introduction to CI Visibility session to understand how Datadog CI Visibility enhances the efficiency of CI pipelines and how to configure the Testing Visibility and Pipeline Visibility products. 
{{< /learning-center-callout >}}

<div class="alert alert-info">This page is about bringing your continuous integration (CI) metrics and data into Datadog dashboards. If you want to run Continuous Testing tests in your CI pipelines, see the <a href="/continuous_testing/cicd_integrations/" target="_blank">Continuous Testing and CI/CD</a> section.</div>

Datadog Continuous Integration (CI) Visibility provides a unified view of pipeline results, performance, trends, and reliability across your CI environments. By integrating Datadog with your CI pipelines, you can create monitors, display data within [Datadog dashboards][1] and [notebooks][2], and create visualizations for your organization's CI health.

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/664357090/rendition/1080p/file.mp4?loc=external&signature=5ef9bc02bd8fb18c07a4a41ea3ac08b72bd0ab0b5d914429da049120d1e9e9b7" poster="/images/poster/ci.png" >}}

</br>

CI Visibility helps developers understand the causes of pipeline disruptions and monitor trends in pipeline execution times. It also offers build engineers insights into cross-organization CI health and pipeline performance over time.

## Improve pipeline reliability and create traces

CI Visibility helps you troubleshoot pipeline failures and broken builds by connecting the most significant development outages to the commits that caused them. You can instrument your pipelines and trace them as they execute, enabling deeper insights into pipeline performance.

## Set up CI Visibility

Datadog integrates with a variety of CI providers to collect metrics that track the performance of your CI pipelines from commit to deployment. Select your CI provider to set up CI Visibility in Datadog:

{{< card-grid card_width="225px" >}}
  {{< image-card href="/continuous_integration/pipelines/awscodepipeline/" src="integrations_logos/aws-codepipeline_small.svg" alt="aws codepipeline" >}}
  {{< image-card href="/continuous_integration/pipelines/azure/" src="integrations_logos/azure-pipelines_small.svg" alt="azure devops extension" >}}
  {{< image-card href="/continuous_integration/pipelines/buildkite/" src="integrations_logos/buildkite_small.svg" alt="buildkite" >}}
  {{< image-card href="/continuous_integration/pipelines/circleci/" src="integrations_logos/circleci.png" alt="circleci orb" >}}
  {{< image-card href="/continuous_integration/pipelines/codefresh/" src="integrations_logos/codefresh_small.svg" alt="codefresh" >}}
  {{< image-card href="/continuous_integration/pipelines/github/" src="integrations_logos/github_small.svg" alt="github actions" >}}
  {{< image-card href="/continuous_integration/pipelines/gitlab/" src="integrations_logos/gitlab-logo-100.svg" alt="gitlab" >}}
  {{< image-card href="/continuous_integration/pipelines/jenkins/" src="integrations_logos/jenkins.png" alt="jenkins" >}}
  {{< image-card href="/continuous_integration/pipelines/teamcity/" src="integrations_logos/teamcity_small.svg" alt="teamcity" >}}
  {{< image-card href="/continuous_integration/pipelines/custom/" src="integrations_logos/docs_other_ci_providers.png" alt="other ci providers" >}}
{{< /card-grid >}}

You can also use the `datadog-ci` CLI to trace commands in your pipelines and add custom tags and measures. Custom tags and measures allow you to add user-defined text and numerical tags in your pipeline traces.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/continuous_integration/pipelines/custom_commands/" >}}Custom Commands{{< /nextlink >}}
    {{< nextlink href="/continuous_integration/pipelines/custom_tags_and_measures/" >}}Custom Tags and Measures{{< /nextlink >}}
{{< /whatsnext >}}

## Supported features

### Pipeline visibility and execution

| <div style="width:200px"><div> | AWS CodePipeline | Azure Pipelines | Buildkite | CircleCI | Codefresh | GitHub Actions | GitLab | Jenkins | TeamCity | Other CI Providers |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| {{< ci-details title="Logs Storage" >}}Storage of pipeline or job logs from the CI provider. Logs are displayed on the <strong>Logs</strong> tab in the Pipeline Execution view.{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| {{< ci-details title="Infrastructure correlation" >}}Correlation of host-level information for the Datadog Agent, CI pipelines, or job runners to CI pipeline execution data.{{< /ci-details >}} |  |  | {{< X >}} |  |  | {{< X >}} | {{< X >}} | {{< X >}} |  |  |
| {{< ci-details title="Running pipelines" >}}Identification of pipelines executions that are running with associated tracing.{{< /ci-details >}} | {{< X >}} | | | | | {{< X >}} | {{< X >}} | {{< X >}} | | {{< X >}} |
| {{< ci-details title="Running jobs" >}}Identification of job executions that are running with associated tracing.{{< /ci-details >}} |  |  |  |  |  | {{< X >}} | {{< X >}} |  |  | {{< X >}} |
| {{< ci-details title="Partial retries" >}}Identification of partial retries (for example, when only a subset of jobs were retried).{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} |  {{< X >}} |
| {{< ci-details title="Step granularity" >}}Step level spans are available for more granular visibility.{{< /ci-details >}} |  | {{< X >}} <br /> (_Datadog Integration only_) | {{< X >}} <br /> (_Preview_) |  | {{< X >}} | {{< X >}} |  | {{< X >}} <br /> (_Presented as job spans_) |  |  {{< X >}} |
| {{< ci-details title="Manual steps" >}}Identification of when there is a job with a manual approval phase in the overall pipeline.{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |  {{< X >}} |

### Automatic analysis and actions

| <div style="width:200px"><div> | AWS CodePipeline | Azure Pipelines | Buildkite | CircleCI | Codefresh | GitHub Actions | GitLab | Jenkins | TeamCity | Other CI Providers |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| {{< ci-details title="Logs Analysis" >}}Uses LLM models on relevant logs to analyze the root cause of failed CI jobs. <a href="https://docs.datadoghq.com/continuous_integration/guides/use_ci_jobs_failure_analysis/">More info</a>.{{< /ci-details >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | | {{< X >}} | {{< X >}} |
| {{< ci-details title="Critical path" >}}Identification of CI jobs that are on the critical path of the pipeline. <a href="https://docs.datadoghq.com/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/">More info</a>{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| {{< ci-details title="Automatic job retries" >}}Datadog retries failed jobs classified as transient by its AI error model. <a href="https://docs.datadoghq.com/continuous_integration/pipelines/automatic_retries/">More info</a>.{{< /ci-details >}} |  |  |  |  |  | {{< X >}} | {{< X >}} |  |  |  |

### Duration breakdown

| <div style="width:200px"><div> | AWS CodePipeline | Azure Pipelines | Buildkite | CircleCI | Codefresh | GitHub Actions | GitLab | Jenkins | TeamCity | Other CI Providers |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| {{< ci-details title="Execution time" >}}Time for which a pipeline has been actively running jobs.{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| {{< ci-details title="Queue time" >}}Time for which a pipeline or job was in the queue before execution.{{< /ci-details >}} |  |  | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  {{< X >}} |
| {{< ci-details title="Approval wait time">}}Time for which a pipeline or job has been waiting for a manual approval.{{< /ci-details >}} | {{< X >}} | {{< X >}}  |  |  |   |  {{< X >}}  | {{< X >}} |  |  |  |

### Customization and extensibility

| <div style="width:200px"><div> | AWS CodePipeline | Azure Pipelines | Buildkite | CircleCI | Codefresh | GitHub Actions | GitLab | Jenkins | TeamCity | Other CI Providers |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| {{< ci-details title="Custom commands" >}}Support for using datadog-ci to send command-level events to CI Visibility to be incorporated into pipeline waterfall visualization. You can then query and analyze <a href="https://docs.datadoghq.com/continuous_integration/pipelines/custom_commands/">these events</a>. {{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  |  |
| {{< ci-details title="Static tags" >}}Support for setting static pipeline tags in the CI provider that do not change between executions.{{< /ci-details >}} |  |  |  | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  |  |
| {{< ci-details title="Runtime tags" >}}Support for adding <a href="https://docs.datadoghq.com/continuous_integration/pipelines/custom_tags_and_measures/">user-defined text and numerical tags</a> to pipelines and jobs in CI Visibility.{{< /ci-details >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  |  {{< X >}} |
| {{< ci-details title="Parameters" >}}Support for adding custom pipeline parameters that users set (for example, <code>DYNAMICS_IS_CHILD:true</code>). You can then search using these parameters in the <a href="https://docs.datadoghq.com/continuous_integration/explorer/?tab=pipelineexecutions">CI Visibility Explorer</a> to find all events with a specific parameter.{{< /ci-details >}} |  |  |  |  | {{< X >}} |  | {{< X >}} | {{< X >}} |  |  {{< X >}} |

## Use CI pipelines data

Explore details about your pipeline executions in the [CI Visibility Explorer][3]. When creating a [dashboard][1] or a [notebook][2], you can use CI pipeline data in your search query, which updates the visualization widget options. For more information, see the [Dashboards][4] and [Notebooks documentation][5].

## Alert on pipeline data

You can export your search query to a [CI Pipeline monitor][6] on the [{{< ui >}}Executions{{< /ui >}} page][7] or the [{{< ui >}}Test Runs{{< /ui >}} page][8] by clicking the {{< ui >}}Export{{< /ui >}} button.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: https://app.datadoghq.com/notebook/list
[3]: /continuous_integration/explorer/
[4]: /dashboards
[5]: /notebooks
[6]: /monitors/types/ci
[7]: https://app.datadoghq.com/ci/pipeline-executions
[8]: https://app.datadoghq.com/ci/test-runs
