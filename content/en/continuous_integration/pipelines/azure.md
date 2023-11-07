---
title: Set up Tracing on an Azure Pipeline
kind: documentation
aliases:
  - /continuous_integration/setup_pipelines/azure
further_reading:
    - link: "https://www.datadoghq.com/blog/azure-pipelines-ci-visibility/"
      tag: "Blog"
      text: "Monitor Azure Pipelines with Datadog CI Visibility"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI"
    - link: "/continuous_integration/pipelines/custom_tags_and_metrics/"
      tag: "Documentation"
      text: "Extend Pipeline Visibility by adding custom tags and metrics"
---

<div class="alert alert-warning">
Azure DevOps Server is not officially supported.
</div>

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Compatibility

- **Custom tags and metrics at runtime**: Configure [custom tags][6] and metrics at runtime

## Configure the Datadog integration

The Datadog integration for [Azure Pipelines][1] works by using [service hooks][2] to send data to Datadog.

1. Install the [Datadog CI Visibility][8] extension from the Azure Marketplace.

2. For each project, go to **Project settings > Service hooks** in Azure DevOps and select the green plus (+) icon to create a subscription.

3. Create a new subscription to the `Datadog CI Visibility` service for each of the following webhook types:
    - **Run state changed**
    - **Run stage state changed**
    - **Run job state changed**

4. Click **Next** to continue to the next step and set the following:
    - **Datadog Site**: {{< region-param key="dd_site" >}}
    - **Datadog API Key**: your [Datadog API key][3].

5. Click **Finish**.

<div class="alert alert-info">
All 3 supported types of events are required and must be enabled individually.
Not enabling one or more events results in an an incomplete installation, leading to unexpected behavior in Datadog.
</div>

### Configuring multiple projects in bulk


If you want to enable the hooks for many or all your Azure projects, Datadog provides a [script](https://raw.githubusercontent.com/DataDog/ci-visibility-azure-pipelines/main/service_hooks.py) to help you do it through the Azure API.

To run the script, you need:

- An Azure DevOps username
- An Azure DevOps [API Token](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=Windows#create-a-pat)
- An Azure DevOps organization name

The script only needs python3 and the requests package. For more info, run:
```shell
./service_hooks.py --help
```

The script supports environment variables `DD_API_KEY` and `DD_SITE`, and flag parameters `--dd-api-key` and `--dd-site`.

Example for enabling the hooks in all projects:
```
./service_hooks.py \
    --dd-api-key ******************** \
    --az-user "John Doe" \
    --az-token ********************** \
    --az-org datadoghq \
    --threads 4
```

Example for enabling the hooks in specified projects:
```
./service_hooks.py \
    --dd-api-key ******************** \
    --az-user "John Doe" \
    --az-token ********************** \
    --az-org datadoghq \
    projectName1 projectName2
```

## Visualize pipeline data in Datadog

The [Pipelines][4] and [Pipeline Executions][5] pages populate with data after the workflows finish.

**Note**: The Pipelines page shows data for only the default branch of each repository.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://azure.microsoft.com/en-us/products/devops/pipelines
[2]: https://learn.microsoft.com/en-us/azure/devops/service-hooks/services/webhooks?view=azure-devops
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: /continuous_integration/pipelines/custom_tags_and_metrics/?tab=linux
[8]: https://marketplace.visualstudio.com/items?itemName=Datadog.ci-visibility
