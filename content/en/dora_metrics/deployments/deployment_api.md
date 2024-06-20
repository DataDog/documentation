---
title: Configuring Deployment Event Submission for DORA Metrics
kind: documentation
description: Learn how to send deployment events for DORA Metrics by using the API or CLI.
aliases:
- /continuous_integration/dora_metrics/setup/deployments
- /dora_metrics/setup/deployments
is_beta: true
further_reading:
- link: "/dora_metrics/deployments"
  tag: "Documentation"
  text: "See other deployment data source options"
- link: "/dora_metrics/failures/"
  tag: "Documentation"
  text: "Learn about setting up failure data in DORA Metrics"
- link: "/tracing/service_catalog"
  tag: "Documentation"
  text: "Learn about the Service Catalog"
- link: "https://github.com/DataDog/datadog-ci"
  tag: "Source Code"
  text: "Learn about the datadog-ci CLI tool"
- link: "/continuous_delivery/deployments"
  tag: "Documentation"
  text: "Learn about Deployment Visibility"
- link: "https://app.datadoghq.com/release-notes?category=Software%20Delivery"
  tag: "Release Notes"
  text: "Check out the latest Software Delivery releases! (App login required)"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">DORA Metrics is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}



## Overview

To send your own deployment events, use the [DORA Metrics API][1] or the [`datadog-ci dora deployment`][2] command. 

The following attributes are required:
- `started_at`: The time the deployment started.
- `finished_at`: The time the deployment finished.
- `service`: The service that was deployed. The provided service must be registered in the [Service Catalog][3] (see [Adding Entries to Service Catalog][4]) with metadata set up (see [Adding Metadata][5]). The `team` ownership of the service is automatically inferred from the Service Catalog and associated with all metrics.

The `repository_url` and `commit_sha` attributes are also required for calculating the Change Lead Time metric. You can optionally specify the `env` attribute to filter your DORA metrics by environment on the [**DORA Metrics** page][7].

### Example
{{< tabs >}}
{{% tab "API - cURL" %}}

See the [DORA Metrics API reference documentation][1] for the full spec and additional code samples.

For the following example, replace `<DD_SITE>` in the URL with {{< region-param key="dd_site" code="true" >}} and `${DD_API_KEY}` with your [Datadog API Key][2]:
```shell
  curl -X POST "https://api.<DD_SITE>/api/v2/dora/deployment" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -d @- << EOF
  {
    "data": {
      "attributes": {
        "service": "shopist",
        "started_at": 1693491974000000000,
        "finished_at": 1693491984000000000,
        "git": {
          "commit_sha": "66adc9350f2cc9b250b69abddab733dd55e1a588",
          "repository_url": "https://github.com/organization/example-repository"
        },
        "env": "prod"
      }
    }
  }
EOF
```

[1]: /api/latest/dora-metrics/#send-a-deployment-event-for-dora-metrics
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}

{{% tab "datadog-ci CLI" %}}

The [`datadog-ci`][1] CLI tool provides a shortcut to send deployment events within your Continuous Integration environment.

For the following example, set the `DD_SITE` environment variable to {{< region-param key="dd_site" code="true" >}} and set the `DD_API_KEY` environment variable to your [Datadog API Key][2]:
```shell
export DD_BETA_COMMANDS_ENABLED=1
export DD_SITE="<DD_SITE>"
export DD_API_KEY="<DD_API_KEY>"

export deploy_start=`date +%s`
./your-deploy-script.sh
datadog-ci dora deployment --service shopist --env prod \
    --started-at $deploy_start --finished-at `date +%s` \
    --git-repository-url "https://github.com/organization/example-repository" \
    --git-commit-sha 66adc9350f2cc9b250b69abddab733dd55e1a588
```

The deployment finish time is automatically set to now if `--finished-at` is not provided.

If the deployment CI job is running on the exact same Git revision that is being deployed, `git-repository-url` and `git-commit-sha` can be omitted and are automatically inferred from the CI context.

The `--skip-git` option can be provided to disable sending the repository URL and commit SHA. When this option is added, the Change Lead Time metric becomes unavailable.

[1]: https://www.npmjs.com/package/@datadog/datadog-ci
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/dora-metrics/#send-a-deployment-event-for-dora-metrics
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: /tracing/service_catalog
[4]: /tracing/service_catalog/setup
[5]: /tracing/service_catalog/adding_metadata
[6]: https://git-scm.com/docs/git-log
[7]: https://app.datadoghq.com/ci/dora