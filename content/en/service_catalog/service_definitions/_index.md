---
title: Service Definitions and Supported Versions
aliases:
- /service_catalog/adding_metadata
- /tracing/service_catalog/service_metadata_structure
- /tracing/service_catalog/adding_metadata
- /service_catalog/add_metadata
further_reading:
- link: "https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml"
  tag: "External Site"
  text: "Create and manage service definitions with Terraform"
- link: "/api/latest/service-definition/"
  tag: "API"
  text: "Learn about the Service Definition API"
- link: "/integrations/github"
  tag: "Documentation"
  text: "Learn about the GitHub Integration"
- link: "https://www.datadoghq.com/blog/service-catalog-backstage-yaml/"
  tag: "Blog"
  text: "Import Backstage YAML files into Datadog"
---

## Metadata structure and supported versions

Service Catalog uses service definition schemas to store and display relevant metadata about your services. The schemas have built-in validation rules to ensure that only valid values are accepted. You can view warnings in the **Definition** tab on the Service Catalog side panel for any selected services. 

## Supported versions

Datadog supports four versions of the service definition schema:

- [v3.0 (Beta)][1]: Latest version with expanded data model, multi-ownership support, manual dependency declaration, and enhanced features for complex infrastructure.
- [v2.2][2]: Supports user annotations for custom metadata and CI pipeline associations to link services with their build processes.
- [v2.1][3]: Supports service groupings for improved organization and introduces additional fields for more comprehensive service descriptions.
- [v2][4]: Earliest supported version, providing essential fields for basic service metadata and documentation.

Each version builds upon the previous one, adding new functionality while maintaining backwards compatibility. Choose the version that best suits your needs and infrastructure complexity.

## Version comparison

The following features are supported in each version:

| Feature                       | v3.0 (Beta) | v2.2      | v2.1      | v2.0        |
|-------------------------------|-------------|-----------|-----------|-----------|
| Basic Metadata                | {{< X >}}   | {{< X >}} | {{< X >}} | {{< X >}} |
| Service Groupings             | {{< X >}}   | {{< X >}} | {{< X >}} |           |
| User Annotations              | {{< X >}}   | {{< X >}} |           |           |
| CI Pipeline Associations      | {{< X >}}   | {{< X >}} |           |           |
| Expanded Data Model           | {{< X >}}   |           |           |           |
| Multi-ownership               | {{< X >}}   |           |           |           |
| Manual Dependency Declaration | {{< X >}}   |           |           |           |

For detailed information about each version, including full schemas and example YAML files, see the individual version pages in [Supported versions](#supported-versions).

## Add metadata to Service Catalog

### Add metadata from the Datadog UI

1. On the [Service Catalog][5] page, click **Setup & Config**.
2. Click **Create New Entry**.
3. Specify the service you are adding metadata to.
4. Enter details for Team, On-call, Contacts, Documentation, Code repo, and Other links.
5. Switch to **YAML** or **JSON** to see the generated code and cURL command.
6. If you have the [Service Catalog Write][12] permission, you can submit the metadata by clicking **Save Entry** or by running the provided cURL command.

### Add metadata with automation

#### Store and edit service definitions in GitHub

Configure the [GitHub integration][6] to directly link from where you view the service's definition in the Service Catalog to where it's stored and editable in GitHub. Datadog scans for the `service.datadog.yaml` file at the root of each repository with read permissions.

To install the GitHub integration:
1. Navigate to the [integration tile][7].
2. Click **Link GitHub Account** in the **Repo Configuration** tab.

When the GitHub integration is set up for your service definitions, an **Edit in GitHub** button appears in the service's **Definition** tab and links you to GitHub to commit changes.

{{< img src="tracing/service_catalog/svc_cat_contextual_link.png" alt="An Edit in GitHub button appears in the Definition tab of a service in the Service Catalog" style="width:90%;" >}}

After you update the YAML files for your repositories, your changes propagate to the Service Catalog. You can register multiple services in one YAML file by creating multiple YAML documents. Separate each document with three dashes (`---`).

To prevent accidental overwriting, create and modify your service definition files with either the GitHub integration or the [Service Definition API endpoints][11]. Updating the same service using both the GitHub and the API may result in unintended overwriting.  

#### Automate service definition updates with Terraform

The Service Catalog provides a service definition as a [Terraform resource][8]. Creating and managing services in the Service Catalog through automated pipelines requires [Datadog Provider][9] v3.16.0 or later.

#### Open-source metadata provider

As an alternative to the GitHub integration and Terraform, you can use an open-sourced GitHub Action solution named [Datadog Service Catalog Metadata Provider][10].

## Build custom extensions 

The `extensions` field is supported in all versions including v2.0. You can incorporate this custom field into deployment processes to standardize and codify best practices.

{{< code-block lang="yaml" filename="service.datadog.yaml" collapsible="true" >}}
schema-version: v2.2
dd-service: web-store
team: shopist
...
extensions:
  shopist.com/release-scheduler:
    release-manager:
      slack: "release-train-shopist"
      schedule: "* * * * *"
      env:
        - name: "staging"
          ci_pipeline: "//domains/examples/apps/hello-joe/config/k8s:release-staging"
          branch: "hello-joe/staging"
          schedule: "* * * * 1"
{{< /code-block >}}

## IDE Plugins

Datadog provides a [JSON Schema][13] for service definitions so that when you are editing a service definition in a [supporting IDE][14], features such as autocomplete and validation are provided.

{{< img src="tracing/service_catalog/ide_plugin.png" alt="VSCode recognizing problem to fix" style="width:100%;" >}}

The [JSON schema for Datadog service definitions][15] is registered with the open source [Schema Store][14].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_catalog/service_definitions/v3-0
[2]: /service_catalog/service_definitions/v2-2
[3]: /service_catalog/service_definitions/v2-1
[4]: /service_catalog/service_definitions/v2-0
[5]: https://app.datadoghq.com/services
[6]: /integrations/github/
[7]: https://app.datadoghq.com/integrations/github
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/
[10]: https://github.com/marketplace/actions/datadog-service-catalog-metadata-provider
[11]: /tracing/service_catalog/service_definition_api/
[12]: https://app.datadoghq.com/personal-settings/profile
[13]: http://json-schema.org/
[14]: https://www.schemastore.org/json/
[15]: https://raw.githubusercontent.com/DataDog/schema/main/service-catalog/version.schema.json
