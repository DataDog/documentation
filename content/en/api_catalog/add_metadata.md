---
title: Adding Metadata to APIs
is_beta: true
further_reading:
- link: "/tracing/service_catalog/"
  tag: "Documentation"
  text: "Datadog Service Catalog"
aliases:
    - /tracing/api_catalog/metadata/
    - /tracing/api_catalog/add_metadata/
---

## Overview

You can add metadata to APIs through the Datadog UI or API, or use automated pipelines through the GitHub integration or Terraform.

## Metadata structure and supported versions

API Catalog supports OpenAPI 2 and 3 as the format for defining APIs. 

Datadog supports custom OpenAPI fields to help manage metadata:
- **API owner**: Add the following to the top level of the OpenAPI file:
  ```yaml
  x-datadog:
   teamHandle: dd-team
  ```

- **Scope to service**: Add the `service` parameter to the top level of an OpenAPI file to scope the API to a specific service. If you don't define a specific service, Datadog matches all endpoints that fit your definition:
  ```yaml
  x-datadog:
   service: web-store
  ```
  The name of the service should be the exact service name as it appears on Datadog traces.

Example OpenAPI file:

{{< code-block lang="yaml" disable_copy="true" >}}
openapi: 3.0.2
info:
 title: API Name
 description: API Description
 version: 1.0.0
x-datadog:
 teamHandle: dd-team
 service: web-store
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
                   description: Contains all customer information
       '400':
         description: Invalid arguments
       '401':
         description: Unauthorized operation
       '500':
         description: An internal server error
{{< /code-block >}}

## Automations for adding metadata

### Add API metadata from a GitHub repository

Use the Datadog GitHub integration to import API definitions and keep them updated. After connecting, the API automatically updates whenever the file content changes in the repository.

To import an OpenAPI or Swagger file using the GitHub integration:
1. Set up the [Datadog GitHub integration][1].
1. Navigate to the [API Catalog][2] in Datadog.
1. Click on the **Manage** tab, and select **Add API**.
1. Select **GitHub**.
1. Choose the repository and the file you want to register.
1. Select Create.

{{< img src="tracing/api_catalog/api-catalog-create-from-github2.png" alt="API Catalog modal showing how to create a new API from GitHub" style="width:100%;" >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/github/
[2]: https://app.datadoghq.com/apis/catalog
