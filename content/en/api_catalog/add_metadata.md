---
title: Adding Metadata to APIs
kind: documentation
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

Example OpenAPI file:

{{< code-block lang="yaml" disable_copy="true" >}}
openapi: 3.0.2
info:
 title: API Name
 description: API Description
 version: 1.0.0
x-datadog:
 teamHandle: dd-team
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


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/github/
[2]: https://app.datadoghq.com/apis/catalog
