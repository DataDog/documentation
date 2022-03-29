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

The [GitHub Actions][1] integration uses a private [GitHub App][2] to collect workflow information. To create the app:

1. Go to the [GitHub Apps Integration tile][3].
2. Click **Link GitHub Account**.
3. Follow the instructions to configure the integration for a personal or organization account.
4. In **Edit Permissions**, grant `Actions: Read` access.
5. Click **Create App in GitHub** to finish the app creation process GitHub.
6. Give the app a name, for example, `Datadog CI Visibility`.
7. Click **Install GitHub App** and follow the instructions on GitHub.

After the GitHub App is created and installed, recently finished GitHub Actions workflows appear in CI Visibility pages.

## Visualize pipeline data in Datadog

The [Pipelines][4] and [Pipeline Executions][5] pages populate with data after the pipelines finish.

**Note**: The Pipelines page shows data for only the default branch of each repository.

## Disabling GitHub Actions tracing

To disable the CI Visibility GitHub Actions integration make sure the GitHub app is no longer subscribed to the
workflow job and workflow run events. To remove the events:

1. Go to the [GitHub Apps][6] page.
2. Click **Edit > Permission & events** on the relevant Datadog GitHub App (if you have multiple apps, you will have to repeat the process for each).
3. Scroll down to the **Subscribe Events** and make sure that **Workflow job** and **Workflow run** are not selected.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.github.com/actions
[2]: https://docs.github.com/developers/apps/getting-started-with-apps/about-apps
[3]: https://app.datadoghq.com/account/settings#integrations/github-apps
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: https://github.com/settings/apps
