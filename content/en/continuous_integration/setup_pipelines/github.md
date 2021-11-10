---
title: Set up Tracing on a GitHub Actions workflows
kind: documentation
further_reading:
    - link: "/continuous_integration/explore_pipelines"
      tag: "Documentation"
      text: "Explore Pipeline Execution Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI"
---

{{< site-region region="us5,gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

<div class="alert alert-info">GitHub Actions integration is in beta. There are no billing implications for activating the GitHub Actions integration during this period.</div>

## Compatibility

Supported GitHub versions:
* GitHub.com (SaaS)

GitHub Enterprise is not yet supported.

## Configuring the Datadog integration

The [GitHub Actions][1] integration uses a private [GitHub App][2] to collect workflow information. To create one:

1. Go to the [GitHub Apps Integration tile][3].
2. Click the `Link GitHub Account` button.
3. Follow the instructions to configure for a personal or organization account.
4. In `Edit Permissions`, make sure `Actions: Read` access is granted.
5. Click `Create App in GitHub` which takes you to GitHub to finish the app creation process.
6. Give the app a name. For example, `Datadog CI Visibility`.
7. Click the `Install GitHub App` and follow the instructions on GitHub.

Once the GitHub App is created and installed, newly finished GitHub Actions workflows will appear on CI Visibility.

## Visualize pipeline data in Datadog

The [Pipelines][4] and [Pipeline Executions][5] pages populate with data after the pipelines finish.

**Note**: The Pipelines page shows data for only the default branch of each repository.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.github.com/en/actions
[2]: https://docs.github.com/en/developers/apps/getting-started-with-apps/about-apps
[3]: https://app.datadoghq.com/account/settings#integrations/github-apps
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions
