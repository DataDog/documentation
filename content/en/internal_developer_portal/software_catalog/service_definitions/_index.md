---
title: Definitions and Supported Versions
aliases:
  - /software_catalog/adding_metadata
  - /tracing/software_catalog/service_metadata_structure
  - /tracing/software_catalog/adding_metadata
  - /software_catalog/add_metadata
  - /service_catalog/adding_metadata
  - /tracing/service_catalog/service_metadata_structure
  - /tracing/service_catalog/adding_metadata
  - /service_catalog/add_metadata
  - /service_catalog/service_definitions
further_reading:
- link: "https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml"
  tag: "External Site"
  text: "Create and manage definitions with Terraform"
- link: "/api/latest/service-definition/"
  tag: "API"
  text: "Learn about the Definition API"
- link: "/integrations/github"
  tag: "Documentation"
  text: "Learn about the GitHub Integration"
- link: "https://www.datadoghq.com/blog/service-catalog-backstage-yaml/"
  tag: "Blog"
  text: "Import Backstage YAML files into Datadog"
- link: "https://www.datadoghq.com/blog/software-catalog/"
  tag: "Blog"
  text: "Improve developer experience and collaboration with Software Catalog"
---

## Metadata structure and supported versions

Software Catalog uses definition schemas to store and display relevant metadata about your services. The schemas have built-in validation rules to ensure that only valid values are accepted. You can view warnings in the **Definition** tab on the Software Catalog side panel for any selected services. 

{{< callout url="https://forms.gle/fwzarcSww6By7tn39" d_target="#signupModal" btn_hidden="false" header="Opt in to the Preview for the latest version of Software Catalog." >}}
{{< /callout >}}

## Supported versions

Datadog supports four versions of the definition schema:

- [v3.0][1]: Latest version with expanded data model, multi-ownership support, manual dependency declaration, and enhanced features for complex infrastructure.
- [v2.2][2]: Supports user annotations for custom metadata and CI pipeline associations to link services with their build processes.
- [v2.1][3]: Supports service groupings for improved organization and introduces additional fields for more comprehensive service descriptions.
- [v2][4]: Earliest supported version, providing essential fields for basic service metadata and documentation.

Each version builds upon the previous one, adding new functionality while maintaining backwards compatibility. Choose the version that best suits your needs and infrastructure complexity.

## Version comparison

The following features are supported in each version:

| Feature                       | v3.0  | v2.2      | v2.1      | v2.0        |
|-------------------------------|-------------|-----------|-----------|-----------|
| Basic Metadata                | {{< X >}}   | {{< X >}} | {{< X >}} | {{< X >}} |
| Service Groupings             | {{< X >}}   | {{< X >}} | {{< X >}} |           |
| User Annotations              | {{< X >}}   | {{< X >}} |           |           |
| CI Pipeline Associations      | {{< X >}}   | {{< X >}} |           |           |
| Expanded Data Model           | {{< X >}}   |           |           |           |
| Multi-ownership               | {{< X >}}   |           |           |           |
| Manual Dependency Declaration | {{< X >}}   |           |           |           |

For detailed information about each version, including full schemas and example YAML files, see the individual version pages in [Supported versions](#supported-versions).


### Add metadata to endpoints
TODO: move this to API specific page 

You can add metadata to APIs through the Datadog UI or [API][16], or use automated pipelines through the [GitHub integration](#store-and-edit-definitions-in-github) or [Terraform][17].

Combine [metadata schema v3.0][1] with OpenAPI definitions by setting `kind: api` and specifying the `owner` field:

```yaml
apiVersion: v3
kind: api
metadata:
  name: API Name
  description: API Description 
  displayName: API Name
  owner: dd-team
spec:
  type: openapi
  interface:
    definition:
      info:
        title: API Name
      openapi: 3.0.2
      paths:
        /api/v2/customers/{id}:
          get:
            summary: get customer information
            operationId: getCustomerInfo
            tags:
              - public
              - important
            parameters:
              - in: path
                name: id
            responses:
              '200':
                description: Successful operation
                content:
                  application/vnd.api+json:
                    schema:
                      type: object
                      properties:
                        data:
                          type: array
                          description: Contains customer information
              '400':
                description: Invalid arguments
              '401':
                description: Unauthorized operation
              '500':
                description: Internal server error
```

## Build custom extensions

<div class="alert alert-info">Custom extensions are in Limited Availability.</div>

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


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /software_catalog/service_definitions/v3-0
[2]: /software_catalog/service_definitions/v2-2
[3]: /software_catalog/service_definitions/v2-1
[4]: /software_catalog/service_definitions/v2-0
[5]: https://app.datadoghq.com/services
[6]: /integrations/github/
[7]: https://app.datadoghq.com/integrations/github
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/
[10]: https://github.com/marketplace/actions/datadog-service-catalog-metadata-provider
[11]: /tracing/software_catalog/service_definition_api/
[12]: https://app.datadoghq.com/personal-settings/profile
[13]: http://json-schema.org/
[14]: https://www.schemastore.org/json/
[15]: https://raw.githubusercontent.com/DataDog/schema/refs/heads/main/service-catalog/service.schema.json
[16]: /api/latest/software-catalog/#create-or-update-entities
[17]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/software_catalog
