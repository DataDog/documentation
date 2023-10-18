---
title: Validating Service Definition YAMLs
kind: guide
further_reading:
- link: "/tracing/service_catalog/"
  tag: "Documentation"
  text: "Datadog Service Catalog"
- link: "/api/latest/service-definition/"
  tag: "Documentation"
  text: "Service Definition API"
- link: "https://github.com/DataDog/schema/blob/main/service-catalog/v2/schema.json"
  tag: "GitHub"
  text: "Service Definition Schema"
- link: "https://www.datadoghq.com/blog/manage-service-catalog-categories-with-service-definition-json-schema/"
  tag: "Blog"
  text: "Manage Service Catalog entries with the Service Definition JSON Schema"
---
Service Catalog uses service definition schemas to store and display relevant metadata about your services. These schemas follow the widely used JSON Schema specification, 
which allows for easy validation of your metadata as you edit it. This validation is important, as a mistake in a service definition file could cause you to create a service 
with invalid data or introduce an error into the metadata of an existing service. 

To prevent this, there are two ways for you to validate your service definition files: 

### Using the In-App Modal for Service Creation

To validate your service definition file in-app: 

1. Navigate to the [Service Catalog Setup & Config page][1]
2. Click on **Create a New Entry**
3. Select the **Code** tab
4. Paste the schema here

There are built-in validation mechanisms here that will prevent you from sending any incorrect metadata into Service Catalog. 

{{< img src="tracing/service_catalog/service_catalog_definition_yaml.png" alt="Service metadata editor showing sample service definition." >}}

### Using a YAML Validator Extension in Your IDE of Choice

We have contributed the service definition schema to the open source [JSON Schema Store][2], where [many IDEs][3] can automatically retrieve it. 
This enables your IDE to validate your data as you edit the file, as long as the file is named service.datadog.yaml. 
Validation messages will allow you to correct any issues before sending any data to the Service Catalog.  

{{< img src="service-definition-data-validation.mp4" alt="IDE showing real-time validation messages for service definition files." >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services/settings/get-started
[2]: https://www.schemastore.org/
[3]: https://www.schemastore.org/json/#editors
