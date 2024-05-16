---
title: Validating Service Definition YAMLs
kind: guide
aliases:
  - /tracing/service_catalog/guides/validating-service-definition
further_reading:
- link: "/tracing/service_catalog/"
  tag: "Documentation"
  text: "Datadog Service Catalog"
- link: "/api/latest/service-definition/"
  tag: "Documentation"
  text: "Service Definition API"
- link: "https://github.com/DataDog/schema/blob/main/service-catalog/v2/schema.json"
  tag: "Source Code"
  text: "Service Definition Schema"
- link: "https://www.datadoghq.com/blog/manage-service-catalog-categories-with-service-definition-json-schema/"
  tag: "Blog"
  text: "Manage Service Catalog entries with the Service Definition JSON Schema"
---

## Overview 

Service Catalog uses service definition schemas to store and display metadata about your services. These schemas follow the JSON Schema specification, so you can validate your metadata as you edit it. This validation is important, because a mistake in a service definition file could cause you to create a service 
with invalid data or introduce an error into the metadata of an existing service. 

To prevent this, there are two ways for you to validate your service definition files: 

## Create the service definition in-app

To validate your service definition file in-app: 

1. Navigate to the [Service Catalog Setup & Config page][1].
2. Click **Create a New Entry**.
3. Select the **Code** tab.
4. Paste the schema content.

Built-in validation mechanisms prevent you from sending incorrect metadata into Service Catalog. 

{{< img src="tracing/service_catalog/service_catalog_definition_yaml.png" alt="Service metadata editor showing sample service definition." >}}

## Validate with an IDE extension

The Datadog service definition schema is available in the open source [JSON Schema Store][2], where [many IDEs][3] can automatically retrieve it. 
With it, your IDE validates the data as you edit the file, provided file name is `service.datadog.yaml`. 
Validation messages allow you to correct issues before sending data to the Service Catalog.  

{{< img src="tracing/service_catalog/service-definition-data-validation.mp4" alt="IDE showing real-time validation messages for service definition files." video="true" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services/settings/get-started
[2]: https://www.schemastore.org/
[3]: https://www.schemastore.org/json/#editors
