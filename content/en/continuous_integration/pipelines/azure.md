---
title: Set up Tracing on an Azure Pipeline
aliases:
  - /continuous_integration/setup_pipelines/azure
further_reading:
    - link: "https://www.datadoghq.com/blog/azure-pipelines-ci-visibility/"
      tag: "Blog"
      text: "Monitor Azure Pipelines with Datadog CI Visibility"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI Visibility"
    - link: "/continuous_integration/pipelines/custom_tags_and_measures/"
      tag: "Documentation"
      text: "Extend Pipeline Visibility by adding custom tags and measures"
---

<div class="alert alert-warning">
Azure DevOps Server is not officially supported.
</div>

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

[Azure Pipelines][1] is a continuous integration and delivery service that supports any language, platform, or cloud.

Set up tracing on Azure Pipelines to gain real time insights into your CI/CD workflows, track pipeline performance, analyze inefficiencies, and manage your deployment operations.

### Compatibility

| Pipeline Visibility | Platform | Definition |
|---|---|---|
| [Custom tags][10] [and measures at runtime][11] | Custom tags and measures at runtime | Configure [custom tags and measures][6] at runtime. |

## Configure the Datadog integration

The Datadog integration for [Azure Pipelines][1] works by using [service hooks][2] to send data to Datadog.

1. Install the [Datadog CI Visibility][8] extension from the Azure Marketplace. There are several extensions starting with **Datadog**, make sure that you are installing the [Datadog CI Visibility][8] extension.

2. For each project, go to **Project settings > Service hooks** in Azure DevOps and select the green plus (+) icon to create a subscription.

3. Create a new subscription to the `Datadog CI Visibility` service for each of the following webhook types:
    - **Run state changed**
    - **Run stage state changed**
    - **Run job state changed**
    - **Run stage approval completed**
    - **Run stage waiting for approval**

4. Click **Next** to continue to the next step and set the following:
    - **Datadog Site**: {{< region-param key="dd_site" >}}
    - **Datadog API Key**: your [Datadog API key][3].

5. Click **Finish**.

<div class="alert alert-info">
All 5 supported types of events are required and must be enabled individually.
Not enabling one or more events results in an an incomplete installation, leading to unexpected behavior in Datadog.
</div>

### Configuring multiple projects in bulk


If you want to enable the hooks for many or all your Azure projects, Datadog provides a [script][12] to help you do it through the Azure API.

To run the script, you need:

- An Azure DevOps username
- An Azure DevOps [API Token][13]
- An Azure DevOps organization name

The script only needs python3 and the requests package. For more information, run:
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

### Enable job log collection

<div class="alert alert-info">Azure Log Collection is in private beta. To request access, fill out <a href="https://forms.gle/vXEQQcPLARdSDLd27">this form</a>.</div>

<div class="alert alert-info"><strong>Note</strong>: Job log collection is not available for <a href="https://docs.datadoghq.com/data_security/pci_compliance/?tab=logmanagement">PCI-compliant organizations.</a>.</div>

Datadog supports log collection for your Azure DevOps pipelines. To enable it:

1. Install a Datadog app registration on your Azure console. Follow the steps within the [Azure integration][14].

2. Add the Datadog app registration to your Azure DevOps organization and to every project for which you want to enable Log Collection. You can do this by going to "Organization settings" in your DevOps console. You may select "Add to all projects" to configure all projects in bulk.

<div class="alert alert-info"><strong>Note</strong>: Logs are billed separately from CI Visibility. Log retention, exclusion, and indexes are configured in Logs Settings. Logs for Azure jobs can be identified by the <code>datadog.product:cipipeline</code> and <code>source:azurepipelines</code> tags.</div>

## Visualize pipeline data in Datadog

The [**CI Pipeline List**][4] and [**Executions**][5] pages populate with data after the workflows finish.

The **CI Pipeline List** page shows data for only the default branch of each repository.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://azure.microsoft.com/en-us/products/devops/pipelines
[2]: https://learn.microsoft.com/en-us/azure/devops/service-hooks/services/webhooks?view=azure-devops
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: /continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[8]: https://marketplace.visualstudio.com/items?itemName=Datadog.ci-visibility
[9]: https://learn.microsoft.com/en-us/azure/devops/pipelines/process/approvals?view=azure-devops&tabs=check-pass#approvals
[10]: /glossary/#custom-tag
[11]: /glossary/#custom-measure
[12]: https://raw.githubusercontent.com/DataDog/ci-visibility-azure-pipelines/main/service_hooks.py
[13]: https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=Windows#create-a-pat
[14]: https://app.datadoghq.com/integrations/azure
[15]: /data_security/pci_compliance/
