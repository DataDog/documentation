---
title: Set up Tracing on a Buildkite Pipeline
kind: documentation
further_reading:
    - link: "/continuous_integration/explore_pipelines"
      tag: "Documentation"
      text: "Explore Pipeline Execution Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI"
---

{{< site-region region="us,eu" >}}
## Configuring the Datadog integration

The Datadog intragration for Buildkite works by using [webhooks][1] to send pipeline data to Datadog.

Go to **Settings > Notificaton Services** in Buildkite and add a new webhook:

{{< site-region region="us" >}}
* **Webhook URL**: `https://webhooks-http-intake.logs.datadoghq.com/api/v2/webhook/?dd-api-key=<API_KEY>` where `<API_KEY>` is [your Datadog API key][1].
* **Events**: Select `job.finished` and `build.finished`.
* **Pipelines**: Select all pipelines or the subset of pipelines you want to trace.

[1]: https://app.datadoghq.com/account/settings#api
{{< /site-region >}}

{{< site-region region="eu" >}}
* **Webhook URL**: `https://webhooks-http-intake.logs.datadoghq.eu/api/v2/webhook/?dd-api-key=<API_KEY>` where `<API_KEY>` is [your Datadog API key][1].
* **Events**: Select `job.finished` and `build.finished`.
* **Pipelines**: Select all pipelines or the subset of pipelines you want to trace.

[1]: https://app.datadoghq.eu/account/settings#api
{{< /site-region >}}

To set custom `env` or `service` parameters, add more query parameters in the webhooks URL: `&env=<YOUR_ENV>&service=<YOUR_SERVICE_NAME>`.

## Visualize pipeline data in Datadog

{{< site-region region="us" >}}
After the integration is successfully configured, the [Pipelines][1] and [Pipeline Executions][2] pages populate with data after the pipelines finish.

[1]: https://app.datadoghq.com/ci/pipelines
[2]: https://app.datadoghq.com/ci/pipeline-executions
{{< /site-region >}}

{{< site-region region="eu" >}}
After the integration is successfully configured, the [Pipelines][1] and [Pipeline Executions][2] pages populate with data after the pipelines finish.

[1]: https://app.datadoghq.eu/ci/pipelines
[2]: https://app.datadoghq.eu/ci/pipeline-executions
{{< /site-region >}}

**Note**: The Pipelines page shows data for only the default branch of each repository.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

{{< site-region region="us3,gov" >}}
The selected Datadog site ({{< region-param key="dd_site_name" >}}) is not supported at this time.
{{< /site-region >}}

[1]: https://buildkite.com/docs/apis/webhooks
{{< /site-region >}}
