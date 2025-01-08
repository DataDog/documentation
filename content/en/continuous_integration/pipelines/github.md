---
title: Set up Tracing on GitHub Actions Workflows
aliases:
  - /continuous_integration/setup_pipelines/github
further_reading:
    - link: "/continuous_integration/pipelines"
      tag: "Documentation"
      text: "Explore Pipeline Execution Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI Visibility"
    - link: "/continuous_integration/pipelines/custom_tags_and_measures/"
      tag: "Documentation"
      text: "Extend Pipeline Visibility by adding custom tags and measures"
    - link: "https://www.datadoghq.com/blog/datadog-github-actions-ci-visibility/"
      tag: "blog"
      text: "Monitor your GitHub Actions workflows with Datadog CI Visibility"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">The selected Datadog site ({{< region-param key="dd_site_name" >}}) is not supported.</div>
{{< /site-region >}}

## Overview

[GitHub Actions][1] is an automation tool that allows you to build, test, and deploy your code in GitHub. Create workflows that automate every step of your development process, streamlining software updates and enhancing code quality with CI/CD features integrated into your repositories.

Set up tracing in GitHub Actions to track the execution of your workflows, identify performance bottlenecks, troubleshoot operational issues, and optimize your deployment processes.

### Compatibility

| Pipeline Visibility | Platform | Definition |
|---|---|---|
| [Running pipelines][2] | Running pipelines | View pipeline executions that are running. Queued or waiting pipelines show with status "Running" on Datadog. |
| [Partial retries][3] | Partial pipelines | View partially retried pipeline executions. |
| Logs correlation | Logs correlation | Correlate pipeline and job spans to logs and enable [job log collection](#collect-job-logs). |
| Infrastructure metric correlation | Infrastructure metric correlation | Correlate jobs to [infrastructure host metrics][4] for GitHub jobs. |
| [Custom tags][5] [and measures at runtime][6] | Custom tags and measures at runtime | Configure [custom tags and measures][7] at runtime. |
| [Queue time][8] | Queue time | View the amount of time pipeline jobs sit in the queue before processing. |
| [Approval wait time][9] | Approval wait time | View the amount of time workflow runs and workflow jobs wait for manual approvals. |
| [Custom spans][10] | Custom spans | Configure custom spans for your pipelines. |


The following GitHub versions are supported:

- GitHub.com (SaaS)
- GitHub Enterprise Server (GHES) 3.5.0 or later

## Configure the Datadog integration

### Configure a GitHub App

The [GitHub Actions][1] integration uses a private [GitHub App][11] to collect workflow information. If you already have an app, you can skip to the next section.

1. Go to the [GitHub integration tile][12].
2. Click **+ Create GitHub App**.
3. Configure the integration for a personal or organization account and enter the name of the GitHub organization.
3. Select the Datadog features you want to enable for the GitHub App.
4. In the **Edit Permissions** section, grant `Actions: Read Only` access.
5. Click **Create App in GitHub** to finish the app creation process on GitHub.
6. Give the app a name, for example, `Datadog CI Visibility`.
7. Click **Install GitHub App** and follow the instructions on GitHub.

### Configure tracing for GitHub Actions

After the GitHub App is created and installed, enable CI Visibility on the accounts and/or repositories you want visibility into.

1. In Datadog, navigate to [**Software Delivery** > **CI Visibility** > **Add a Pipeline Provider**][13] and select **GitHub**.
2. Click **Enable Account** for the account you want to enable.
3. Enable CI Visibility for the whole account by clicking the toggle next to **Enable CI Visibility**.
4. Alternatively, you can enable individual repositories by scrolling through the repository list and clicking the **Enable CI Visibility** toggle.

Pipelines appear immediately after enabling CI Visibility for any account or repository.

### Disable GitHub Actions tracing

To disable the CI Visibility GitHub Actions integration:

1. Go to the [CI GitHub Settings][14] page.
2. Choose the GitHub account that you want to disable CI Visibility for, and click on **Edit**.
3. Untoggle **Enable CI Visibility**, or choose which repository you want to disable it for individually.

### Collect job logs

The GitHub Actions CI Visibility integration also allows you to automatically forward workflow job logs to [Log Management][15].

To enable job logs collection:

1. In Datadog, navigate to [**Software Delivery** > **CI Visibility** > **Add a Pipeline Provider**][13] and select **GitHub**.
2. Click **Enable Account** for the account you want to enable.
3. Enable Job Logs Collection for the whole account by clicking the toggle next to **Enable Job Logs Collection**.
4. Alternatively, you can enable individual repositories by scrolling through the repository list and clicking the **Enable Job Logs Collection** toggle.

Immediately after toggling logs collection, workflow job logs are forwarded to Datadog Log Management. Log files larger than 1 GiB are truncated.

Logs are billed separately from CI Visibility. Log retention, exclusion, and indexes are configured in [Log Management][16]. Logs for GitHub jobs can be identified by the `datadog.product:cipipeline` and `source:github` tags.

### Correlate infrastructure metrics to jobs

If you are using self-hosted GitHub runners, you can correlate jobs with the hosts running them by ensuring that the GitHub runner name matches the hostname of the machine. CI Visibility uses this information to link to infrastructure metrics.

To see the metrics, click on a job span in the trace view. A window opens with an **Infrastructure** tab displaying the host metrics.

## Visualize pipeline data in Datadog

The [**CI Pipeline List**][17] and [**Executions**][18] pages populate with data after the pipelines finish.

The **CI Pipeline List** page shows data for only the default branch of each repository. For more information, see [Search and Manage CI Pipelines][19].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.github.com/actions
[2]: /glossary/#running-pipeline
[3]: /glossary/#partial-retry
[4]: /continuous_integration/pipelines/github/#correlate-infrastructure-metrics-to-jobs
[5]: /glossary/#custom-tag
[6]: /glossary/#measure
[7]: /continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[8]: /glossary/#queue-time
[9]: /glossary/#approval-wait-time
[10]: /glossary/#custom-span
[11]: https://docs.github.com/developers/apps/getting-started-with-apps/about-apps
[12]: https://app.datadoghq.com/integrations/github/
[13]: https://app.datadoghq.com/ci/setup/pipeline?provider=github
[14]: https://app.datadoghq.com/ci/settings/provider
[15]: /logs/
[16]: /logs/guide/best-practices-for-log-management/
[17]: https://app.datadoghq.com/ci/pipelines
[18]: https://app.datadoghq.com/ci/pipeline-executions
[19]: /continuous_integration/search/#search-for-pipelines
