---
title: Set Up Software Catalog
aliases:
  - /tracing/software_catalog/setup
  - /software_catalog/setup
  - /tracing/service_catalog/setup
  - /service_catalog/setup
---

Datadog Software Catalog provides a centralized registry to track and manage your software components, such as services, datastores, queues, frontend applications, APIs, and more. Component attributes like teams, on-call, runbooks, and source code links are managed through the [Entity Definitions][1], which are Kubernetes-style YAML configuration files. 

The [automatic discovery][2] feature in the Software Catalog means that if you are an existing Datadog user of Datadog's APM, USM, or RUM products, the Software Catalog comes pre-populated with monitored components. You can extend the auto-populated Software Catalog by adding other components by creating Entity Definitions to represent any unmonitored components. 

Depending on whether you are an existing APM, USM, or RUM user, you can follow one of the following setup paths.

## Add components through the Datadog UI 

To create component definitions in the Datadog UI:

1. Navigate to the [Software Catalog Setup & Config][https://app.datadoghq.com/software/settings/get-started] page.
1. Click **Create a New Entry**.
1. Specify your service details, including metadata such as ownership and documentation links.
1. (Optional) Switch to **YAML** or **JSON** to see the generated code and cURL command.
1. Submit the metadata by clicking **Save Entry** or by running the provided cURL command.

   **Note**: You must have Software Catalog Write permission to save the entry. 

## Add components through automation

### GitHub

Configure the [GitHub integration][6] to directly link from where you view the service's definition in the Software Catalog to where it's stored and editable in GitHub. Datadog scans for the `service.datadog.yaml` and `entity.datadog.yaml` files throughout each repository with read permissions.

To install the GitHub integration:
1. Navigate to the [integration tile][7].
2. Click **Link GitHub Account** in the **Repo Configuration** tab.

When the GitHub integration is set up for your definitions, an **Edit in GitHub** button appears in the service's **Definition** tab and links you to GitHub to commit changes.

{{< img src="tracing/software_catalog/svc_cat_contextual_link.png" alt="An Edit in GitHub button appears in the Definition tab of a service in the Software Catalog" style="width:90%;" >}}

After you update the YAML files for your repositories, your changes propagate to the Software Catalog. You can register multiple services in one YAML file by creating multiple YAML documents. Separate each document with three dashes (`---`).

To prevent accidental overwriting, create and modify your definition files with either the GitHub integration or the [Definition API endpoints][11]. Updating the same service using both the GitHub and the API may result in unintended overwriting.  

### Terraform

The Software Catalog provides a definition as a [Terraform resource][8]. Creating and managing services in the Software Catalog through automated pipelines requires [Datadog Provider][9] v3.16.0 or later.

### Open-source metadata provider

As an alternative to the GitHub integration and Terraform, you can use an open-sourced GitHub Action solution named [Datadog Software Catalog Metadata Provider][10].

## New to Datadog 

{{< whatsnext desc=" " >}}
    {{< nextlink href="/internal_developer_portal/software_catalog/set_up/new_to_datadog#build-your-first-software-catalog" >}}Build your first Software Catalog{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/software_catalog/set_up/new_to_datadog#import-entries-from-backstage" >}}Import entries from Backstage{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/software_catalog/set_up/new_to_datadog#import-entries-from-servicenow" >}}Import entries from ServiceNow{{< /nextlink >}}
{{< /whatsnext >}}

## Existing Datadog user

{{< whatsnext desc=" " >}}
    {{< nextlink href="/internal_developer_portal/software_catalog/set_up/existing_datadog_user#automatic-discovery-with-apm-usm-and-rum" >}}APM, USM, and RUM Users{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/software_catalog/set_up/existing_datadog_user#discover-infrastructure-and-logs-services" >}}Infrastructure and Logs Users{{< /nextlink >}}
{{< /whatsnext >}}

## Role based access and permissions

For general information, see [Role Based Access Control][2] and [Role Permissions][3].
### Read permission

The Software Catalog read permission allows a user to read Software Catalog data, which enables the following features:
- Software Catalog list
- Discover UI
- Service Definition endpoint: `/api/v2/services/definition/<service_name>`

The permission is enabled by default in the **Datadog Read Only Role** and **Datadog Standard Role**.

### Write permission

The Software Catalog write permission allows a user to modify Software Catalog data. The write permission is required for the following features:
- Inserting or Updating a Service Definition with the `POST /api/v2/services/definitions` endpoint
- Deleting a Service Definition with the `DELETE /api/v2/services/definition/<service_name>` endpoint
- Completing the onboarding process in the Discover Services UI
- Updating service metadata in the UI

The permission is enabled by default in the **Datadog Admin Role** and **Datadog Standard Role**.

[1]: /software_catalog/service_definitions/
[2]: /software_catalog/set_up/existing_datadog_user/#automatic-discovery-with-apm-usm-and-rum
[6]: /integrations/github/
[7]: https://app.datadoghq.com/integrations/github
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/
[10]: https://github.com/marketplace/actions/datadog-service-catalog-metadata-provider
[11]: /tracing/software_catalog/service_definition_api/
