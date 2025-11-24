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

<div class="alert alert-danger">
Azure DevOps Server is not officially supported.
</div>

## Overview

[Azure Pipelines][1] is a continuous integration and delivery service that supports any language, platform, or cloud.

Set up tracing on Azure Pipelines to gain real time insights into your CI/CD workflows, track pipeline performance, analyze inefficiencies, and manage your deployment operations.

### Compatibility

| Pipeline Visibility | Platform | Definition |
|---|---|---|
| [Custom tags][10] [and measures at runtime][11] | Custom tags and measures at runtime | Configure [custom tags and measures][6] at runtime. |
| [Custom spans][15] | Custom spans | Configure custom spans for your pipelines. |
| [Filter CI Jobs on the critical path][19] | Filter CI Jobs on the critical path | Filter by jobs on the critical path. |
| [Execution time][20] | Execution time  | View the amount of time pipelines have been running jobs. |

## Configure the Datadog integration
{{< tabs >}} {{% tab "Datadog Integration (recommended)" %}}

### Enable CI Visibility in Datadog

After the Azure App is created and installed, enable CI Visibility for the organizations and projects you want Datadog to monitor. 

1. Verify that your Azure DevOps organization is linked to a <strong>Microsoft Entra tenant</strong>. See the [Azure source code setup instructions][1] for guidance on connecting Azure DevOps projects to Datadog.

2. In Datadog, navigate to [**Software Delivery → CI Visibility → Add a Pipeline Provider → Azure Pipelines**][2].

3. Click **Configure** next to the Azure DevOps organization you want to enable.

4. To enable CI Visibility for the entire organization, toggle **Enable CI Visibility**. Future projects detected by the Azure app will automatically be enabled.

5. To enable CI Visibility for individual projects:
   - Scroll through the projects list.
   - Toggle **Enable CI Visibility** for each project you want to monitor.

Pipelines appear in Datadog immediately after CI Visibility is enabled for an organization or project.

[1]: /integrations/azure-devops-source-code/#setup
[2]: https://app.datadoghq.com/ci/setup/pipeline?provider=azurepipelines

{{% /tab %}}
{{% tab "Service Hook Subscriptions" %}}

The Datadog integration for [Azure Pipelines][16] works by using [service hooks][2] to send data to Datadog.

1. Install the [Datadog CI Visibility][8] extension from the Azure Marketplace. There are several extensions starting with **Datadog**, make sure that you are installing the [Datadog CI Visibility][8] extension.

2. For each project, go to **Project settings > Service hooks** in Azure DevOps and select the green plus (+) icon to create a subscription.

3. Create a subscription to the `Datadog CI Visibility` service for each of the following webhook types. These event types are required and must be enabled individually.

    - **Run state changed**
    - **Run stage state changed**
    - **Run job state changed**
    - **Run stage approval completed**
    - **Run stage waiting for approval**
    - **Build completed**

4. Click **Next** to continue to the next step and set the following:

    - **Datadog Site**: `{{< region-param key="dd_site" >}}`
    - **Datadog API Key**: Your [Datadog API key][3].

5. Click **Finish**.

### Configuring multiple projects in bulk

Datadog offers a [script][12] to help you enable service hooks across multiple or all of your Azure projects using the Azure API. The script requires Python 3 and the `requests` package.

To run the script, you need:

- An Azure DevOps username
- An Azure DevOps [API token][13]
- An Azure DevOps organization name


The script supports environment variables `DD_API_KEY` and `DD_SITE`, and flags parameters `--dd-api-key` and `--dd-site`.

For more information, you can run the following command:

```shell
./service_hooks.py --help
```

#### All Azure projects

Example for enabling the hooks in all projects:

```shell
./service_hooks.py \
    --dd-api-key ******************** \
    --az-user "John Doe" \
    --az-token ********************** \
    --az-org datadoghq \
    --threads 4
```

#### Specific Azure projects

Example for enabling the hooks in specified projects:

```shell
./service_hooks.py \
    --dd-api-key ******************** \
    --az-user "John Doe" \
    --az-token ********************** \
    --az-org datadoghq \
    projectName1 projectName2
```
[2]: https://learn.microsoft.com/en-us/azure/devops/service-hooks/services/webhooks?view=azure-devops
[8]: https://marketplace.visualstudio.com/items?itemName=Datadog.ci-visibility
[12]: https://raw.githubusercontent.com/DataDog/ci-visibility-azure-pipelines/main/service_hooks.py
[13]: https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=Windows#create-a-pat
[16]: /integrations/azure_devops/

{{% /tab %}}
{{< /tabs >}}


## Advanced configuration

### Set custom tags

You can set custom tags for all pipeline and job spans from your Azure projects to improve traceability. For more information, see [Custom Tags and Measures][6].

### Collect job logs

<div class="alert alert-info">Azure Log Collection is in Preview. To request access, fill out <a href="https://forms.gle/vXEQQcPLARdSDLd27">this form</a>.</div>

Datadog supports log collection for your Azure DevOps pipelines.

To enable job log collection:

1. Install a Datadog app registration on your Azure console. Follow the steps in the [Azure integration tile][14].

2. Add the Datadog app registration to your Azure DevOps organization:  
  a. Navigate to **Organization settings** in your DevOps console.  
  b. Click **Users** from the left side panel, then click on **Add Users**.  
  **Note**: If you don't see the **Add Users** button, you may not have the necessary permissions.

To enable log collection, add your app registration as a user with Basic Access Level to each project. Alternatively, you can click  **Add to all projects** to configure all projects in bulk.

Logs are billed separately from CI Visibility. Log retention, exclusion, and indexes are configured in [Log Management][18]. Logs for Azure jobs can be identified by the `datadog.product:cipipeline` and `source:azurepipelines` tags.

## Visualize pipeline data in Datadog

The [**CI Pipeline List**][4] and [**Executions**][5] pages populate with data after the workflows finish.

The **CI Pipeline List** page shows data for only the default branch of each repository. For more information, see [Search and Manage CI Pipelines][17].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://azure.microsoft.com/en-us/products/devops/pipelines
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: /continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[9]: https://learn.microsoft.com/en-us/azure/devops/pipelines/process/approvals?view=azure-devops&tabs=check-pass#approvals
[10]: /glossary/#custom-tag
[11]: /glossary/#custom-measure
[14]: https://app.datadoghq.com/integrations/azure
[15]: /glossary/#custom-span
[17]: /continuous_integration/search/#search-for-pipelines
[18]: /logs/guide/best-practices-for-log-management/
[19]: /continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[20]: /glossary/#pipeline-execution-time