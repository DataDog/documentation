---
title: API Definitions
disable_toc: false
---

## Overview 

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

