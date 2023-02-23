---
title: Setting up Service Catalog
kind: documentation
further_reading:
- link: "https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml"
  tag: "Terraform"
  text: "Create and manage service definitions with Terraform"
- link: "/api/latest/service-definition/"
  tag: "API"
  text: "Learn about the Service Definition API"
- link: "/integrations/github"
  tag: "Documentation"
  text: "Learn about the GitHub Integration"
---

## Overview

Datadog Service Catalog includes all discovered services from APM, USM, and RUM by default. If you are using any of these products, your catalog is pre-populated with entries. You can add service metadata to these entries through the Datadog UI, [API][1], or use automated pipelines through the [GitHub integration][11] or [Terraform][2].

## Add service definition metadata for services

1. On the [Service Catalog][10] page, click **Setup & Config**. The **Manage Entries** tabs shows you how many services are without metadata.

2. Click **Create New Entry**.

3. Specify which service you are adding metadata to. This can be name of a service already listed in the Service Catalog, or it can be the name of a service not sending any data.

4. Enter details for Team, On-call, Contacts, Documentation, Code repo, and Other links.

4. Switch to the **Code** view to see the YAML generated for the metadata you've entered.

5. If you have the [Service Catalog Write][13] permission, you can submit the metadata by clicking **Save Entry**, or by running the curl command provided on the **Code** view.


## Discover services being reported in other Datadog telemetry data

To discover other services through existing Datadog telemetry such as infrastructure metrics, navigate to the [**Setup & Config** tab][3] on the top of the page and click on the **Import Entries** tab. You can import services from other Datadog telemetry containing the `DD_SERVICE` [tag][5].

{{< img src="tracing/service_catalog/import_entries.png" alt="Import Entries tab in the Service Catalog setup and configuration section" style="width:90%;" >}}

Once you have imported some entries, they appear in the **Explore** tab. Entries may expire unless you add metadata such as the owner or contacts by [using the API][1] or the [GitHub integration][6].

To remove your imported services from the default **Explore** view, click **Clear Previously Imported Services**. This removes all services that do not have metadata or do not have APM, Universal Service Monitoring (USM), or Real User Monitoring (RUM) telemetry.

{{< img src="tracing/service_catalog/clear_imported_services.png" alt="Confirm the deletion of previously imported services in the Service Catalog setup and configuration section" style="width:90%;" >}}

## Store and edit service definitions in GitHub

Configure the [GitHub integration][6] to directly link from where you view the service's definition in the Service Catalog to where it's stored and editable in GitHub.

To install the GitHub integration, navigate to the [integration tile][7] and click **Link GitHub Account** in the **Repo Configuration** tab. 

### Service definition YAML files

Datadog scans for the `service.datadog.yaml` file at the root of each repository with read permissions. You can register multiple services in one YAML file by creating multiple YAML documents. Separate each document with three dashes (`---`).

### Modify service definition

When the GitHub integration is set up for your service definitions, an **Edit in Github** button appears in the service's **Definition** tab and links you to GitHub to commit changes.

{{< img src="tracing/service_catalog/svc_cat_contextual_link.png" alt="An Edit in Github button appears in the Definition tab of a service in the Service Catalog" style="width:90%;" >}}

After you update the YAML files for your repositories, your changes propagate to the Service Catalog. 

To prevent accidental overwriting, create and modify your service definition files with either the GitHub integration or the [Service Definition API endpoints][1]. Updating the same service using both the GitHub and the API may result in unintended overwriting.  

## Automate service definition updates with Terraform

The Service Catalog provides a service definition as a Terraform resource. Creating and managing services in the Service Catalog through automated pipelines requires [Datadog Provider][8] v3.16.0 or later.

For more information, see the [Datadog Provider documentation][9].

## Open-Source Metadata Provider

As an alternative to the GitHub integration and Terraform, you can use an open-sourced GitHub Action solution named [Datadog Service Catalog Metadata Provider][12]. 

This GitHub Action allows you to register your services with the Service Catalog using a GitHub Action, with full control over when this information is sent to Datadog, and implement other compliance checks unique to your organization.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/service_catalog/service_definition_api/
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
[3]: https://app.datadoghq.com/services/settings/get-started
[4]: https://github.com/DataDog/schema/blob/main/service-catalog/v2/schema.json
[5]: /getting_started/tagging/unified_service_tagging
[6]: /integrations/github/
[7]: https://app.datadoghq.com/integrations/github
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[10]: https://app.datadoghq.com/services
[11]: https://docs.datadoghq.com/tracing/service_catalog/setup#store-and-edit-service-definitions-in-github
[12]: https://github.com/marketplace/actions/datadog-service-catalog-metadata-provider
[13]: https://app.datadoghq.com/personal-settings/profile

