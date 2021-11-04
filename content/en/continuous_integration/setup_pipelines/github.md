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

{{< site-region region="us,eu,us3" >}}
<div class="alert alert-info">GitHub Actions integration is in beta. There are no billing implications for activating the GitHub Actions integration during this period.
</div>

## Compatibility

Supported GitHub versions:
* GitHub.com (SaaS)

GitHub Enterprise is not yet supported.

## Configuring the Datadog integration

The [GitHub Actions][1] integration uses a private [GitHub App][2] to collect workflow information. To create one:

[1]: https://docs.github.com/en/actions
[2]: https://docs.github.com/en/developers/apps/getting-started-with-apps/about-apps

{{< site-region region="us" >}}
1. Go to the [GitHub Apps Integration tile][1].
2. Click the `Link GitHub Account` button.
3. Follow the instructions to configure for a personal or organization account.
4. In `Edit Permissions`, make sure `Actions: Read` access is granted.
5. Click `Create App in GitHub` which takes you to GitHub to finish the app creation process.
6. Give the app a name.
7. Click the `Install GitHub App` and follow the instructions on GitHub.

[1]: https://app.datadoghq.com/account/settings#integrations/github-apps
{{< /site-region >}}

{{< site-region region="eu" >}}
1. Go to the [GitHub Apps Integration tile][1].
2. Click the `Link GitHub Account` button.
3. Follow the instructions to configure for a personal or organization account.
4. In `Edit Permissions`, make sure `Actions: Read` access is granted.
5. Click `Create App in GitHub` which takes you to GitHub to finish the app creation process.
6. Give the app a name,
7. Click the `Install GitHub App` and follow the instructions on GitHub.

[1]: https://app.datadoghq.eu/account/settings#integrations/github-apps
{{< /site-region >}}

{{< site-region region="us3" >}}
1. Go to the [GitHub Apps Integration tile][1].
2. Click the `Link GitHub Account` button.
3. Follow the instructions to configure for a personal or organization account.
4. In `Edit Permissions`, make sure `Actions: Read` access is granted.
5. Click `Create App in GitHub` which takes you to GitHub to finish the app creation process.
6. Give the app a name.
7. Click the `Install GitHub App` and follow the instructions on GitHub.

[1]: https://us3.datadoghq.com/account/settings#integrations/github-apps
{{< /site-region >}}

Once the GitHub App is created and installed, newly finished GitHub Actions workflows will appear on CI Visibility.

## Visualize pipeline data in Datadog

{{< site-region region="us" >}}
The [Pipelines][1] and [Pipeline Executions][2] pages populate with data after the pipelines finish.

[1]: https://app.datadoghq.com/ci/pipelines
[2]: https://app.datadoghq.com/ci/pipeline-executions
{{< /site-region >}}

{{< site-region region="eu" >}}

The [Pipelines][1] and [Pipeline Executions][2] pages populate with data after the pipelines finish.

[1]: https://app.datadoghq.eu/ci/pipelines
[2]: https://app.datadoghq.eu/ci/pipeline-executions
{{< /site-region >}}

{{< site-region region="us3" >}}

The [Pipelines][1] and [Pipeline Executions][2] pages populate with data after the pipelines finish.

[1]: https://us3.datadoghq.com/ci/pipelines
[2]: https://us3.datadoghq.com/ci/pipeline-executions
{{< /site-region >}}

**Note**: The Pipelines page shows data for only the default branch of each repository.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
{{< /site-region >}}

{{< site-region region="us5,gov" >}}
This feature is not supported for the selected Datadog site ({{< region-param key="dd_site_name" >}}).
{{< /site-region >}}
