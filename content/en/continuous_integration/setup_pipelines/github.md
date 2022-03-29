---
title: Set up Tracing on GitHub Actions Workflows
kind: documentation
further_reading:
    - link: "/continuous_integration/explore_pipelines"
      tag: "Documentation"
      text: "Explore Pipeline Execution Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">The selected Datadog site ({{< region-param key="dd_site_name" >}}) is not supported.</div>
{{< /site-region >}}

<div class="alert alert-info">The GitHub Actions integration is in beta. There are no billing implications for activating the GitHub Actions integration during this period.</div>

## Compatibility

Supported GitHub versions:
* GitHub.com (SaaS)

GitHub Enterprise is not supported.

## Configuring the Datadog integration

### Configuring a GitHub App

The [GitHub Actions][1] integration uses a private [GitHub App][2] to collect workflow information. If you already have an app you can
skip to the next section.

1. Go to the [GitHub Apps Integration tile][3].
2. Click **Link GitHub Account**.
3. Follow the instructions to configure the integration for a personal or organization account.
4. In **Edit Permissions**, grant `Actions: Read` access.
5. Click **Create App in GitHub** to finish the app creation process GitHub.
6. Give the app a name, for example, `Datadog CI Visibility`.
7. Click **Install GitHub App** and follow the instructions on GitHub.

### Configuring Tracing for GitHub Action

After the GitHub App is created and installed, you must enable CI Visibility on the accounts and/or repositories you want visibility into.

1. Go to the **[Getting Started][4]** page and click on **GitHub**.
2. Click on **Enable Account** for the account you want to enable.
3. Enable CI Visibility for the whole account by clicking **Enable CI Visibility**.
4. Alternatively you can enable only individual repositories by scrolling through the repository list and clicking the **Enable CI Visibility** toggle.

Pipelines will start showing immediately after enabling CI Visibility for any account or repository.

### Enabling log collection

The GitHub Actions CI Visibility integration also allows automatically forwarding workflow job logs to the [Logs Product][5].
To enable logs you can follow the following:

1. Go to the **[CI Visibility settings][6]** page.
2. Click on any account that is enabled or has enabled repositories.
3. Click **Enable Job Logs Collection** to enable logs for the whole account.
4. Alternatively you can enable only individual repositories by scrolling through the repository list and clicking the **Enable Job Logs Collection** toggle.

Immediately after toggling logs collection workflow job logs will be forwarded to the Logs Product. Note logs will be charged separately from CI Visibility and
retention, exclusion and indexes are configured via the Logs Product settings as any other logs.

## Visualize pipeline data in Datadog

The [Pipelines][7] and [Pipeline Executions][8] pages populate with data after the pipelines finish.

**Note**: The Pipelines page shows data for only the default branch of each repository.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.github.com/actions
[2]: https://docs.github.com/developers/apps/getting-started-with-apps/about-apps
[3]: https://app.datadoghq.com/account/settings#integrations/github-apps
[4]: https://app.datadoghq.com/ci/setup/pipeline?provider=github
[5]: https://docs.datadoghq.com/logs/
[6]: https://app.datadoghq.com/ci/settings
[7]: https://app.datadoghq.com/ci/pipelines
[8]: https://app.datadoghq.com/ci/pipeline-executions
