---
title: Set up Tracing on a GitHub Actions
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
## Compatibility

GitHub enterprise is not yet supported.

{{< /site-region >}}

## Configuring the Datadog integration

The GitHub Actions Datadog integration works via a private GitHub App to enable it do the following:

{{< site-region region="us" >}}
1. Go to the [GitHub App Integration tile][1].
2. Click the `Link GitHub Account` button.
3. Follow the instructions to configure for a personal or organization account.
4. In `Edit Permissions`, grant `read` permissions to the `Actions` permissions.
5. Click `Create App in GitHub` which will take you to GitHub to configure the app.
6. Give the app a name.
7. Click the `Install GitHub App` and follow the instructions on GitHub.

[1]: https://app.datadoghq.com/account/settings#integrations/github-apps
{{< /site-region >}}

{{< site-region region="eu" >}}
1. Go to the [GitHub App Integration tile][1].
2. Click the `Link GitHub Account` button.
3. Follow the instructions to configure for a personal or organization account.
4. In `Edit Permissions`, grant `read` permissions to the `Actions` permissions.
5. Click `Create App in GitHub` which will take you to GitHub to configure the app.
6. Give the app a name,
7. Click the `Install GitHub App` and follow the instructions on GitHub.

[1]: https://app.datadoghq.eu/account/settings#integrations/github-apps
{{< /site-region >}}

{{< site-region region="us3" >}}
1. Go to the [GitHub App Integration tile][1].
2. Click the `Link GitHub Account` button.
3. Follow the instructions to configure for a personal or organization account.
4. In `Edit Permissions`, grant `read` permissions to the `Actions` permissions.
5. Click `Create App in GitHub` which will take you to GitHub to configure the app.
6. Give the app a name.
7. Click the `Install GitHub App` and follow the instructions on GitHub.

[1]: https://us3.datadoghq.com/account/settings#integrations/github-apps
{{< /site-region >}}

Once completed DataDog should immediately start tracing GitHub Workflows

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

{{< site-region region="us5,gov" >}}
This feature is not supported for the selected Datadog site ({{< region-param key="dd_site_name" >}}).
{{< /site-region >}}
