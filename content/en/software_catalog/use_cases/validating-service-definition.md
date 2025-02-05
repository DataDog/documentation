---
title: Validating Service Definition YAMLs
aliases:
  - /tracing/software_catalog/guides/validating-service-definition
  - /software_catalog/guides/validating-service-definition
  - /tracing/service_catalog/guides/validating-service-definition
  - /service_catalog/guides/validating-service-definition
further_reading:
  - link: "/tracing/software_catalog/"
    tag: "Documentation"
    text: "Datadog Software Catalog"
  - link: "/api/latest/service-definition/"
    tag: "Documentation"
    text: "Service Definition API"
  - link: "https://github.com/DataDog/schema/blob/main/service-catalog/v2/schema.json"
    tag: "Source Code"
    text: "Service Definition Schema"
  - link: "https://www.datadoghq.com/blog/manage-service-catalog-categories-with-service-definition-json-schema/"
    tag: "Blog"
    text: "Manage Software Catalog entries with the Service Definition JSON Schema"
---

## Overview 

Software Catalog uses service definition schemas to store and display metadata about your services. These schemas follow the JSON Schema specification, so you can validate your metadata as you edit it. This validation is important, because a mistake in a service definition file could cause you to create a service 
with invalid data or introduce an error into the metadata of an existing service. 

To prevent this, there are two ways for you to validate your service definition files: 

## Create the service definition in-app

To validate your service definition file in-app: 

1. Navigate to the [Software Catalog Setup & Config page][1].
2. Click **Create a New Entry**.
3. Select the **Code** tab.
4. Paste the schema content.

## Validate with an IDE extension

Built-in validation mechanisms prevent you from sending incorrect metadata into Software Catalog. 

{{< img src="tracing/software_catalog/software_catalog_definition_yaml.png" alt="Service metadata editor showing sample service definition." >}}

## Validate with Datadog Event Management and Github Integration

To validate your service definitions ingested by Datadog's Github integration, you can view events when services or updated or when there is an error. You can view validation errors in [Event Management][4] by filtering by `source:software_catalog` and `status:error`. Adjust the timeframe as needed.

{{< img src="tracing/software_catalog/github-error-event.png" alt="Github event showing error message from service definition." >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services/settings/get-started
[2]: https://www.schemastore.org/
[3]: https://www.schemastore.org/json/#editors
[4]: https://app.datadoghq.com/event/explorer?query=source%3Asoftware_catalog%20status%3Aerror&cols=&messageDisplay=expanded-lg&options=&refresh_mode=sliding&sort=DESC&view=all&from_ts=1736452185424&to_ts=1736453085424&live=true
