<!-- op-desc-table: /api/latest/rendering-shapes/list-scanned-assets-metadata/ -->

### Overview

Get a list of security scanned assets metadata for an organization.

### Pagination

For the "List Vulnerabilities" endpoint, see the [Pagination section](#pagination).

### Filtering

For the "List Vulnerabilities" endpoint, see the [Filtering section](#filtering).

### Metadata

For the "List Vulnerabilities" endpoint, see the [Metadata section](#metadata).

### Related endpoints

This endpoint returns additional metadata for cloud resources that is not available from the standard resource endpoints. To access a richer dataset, call this endpoint together with the relevant resource endpoint(s) and merge (join) their results using the resource identifier.

**Hosts**

To enrich host data, join the response from the [Hosts](https://docs.datadoghq.com/api/latest/hosts.md) endpoint with the response from the scanned-assets-metadata endpoint on the following key fields:

| ENDPOINT                                                        | JOIN KEY                   | TYPE   |
| --------------------------------------------------------------- | -------------------------- | ------ |
| [/api/v1/hosts](https://docs.datadoghq.com/api/latest/hosts.md) | host_list.host_name        | string |
| /api/v2/security/scanned-assets-metadata                        | data.attributes.asset.name | string |

**Host Images**

To enrich host image data, join the response from the [Hosts](https://docs.datadoghq.com/api/latest/hosts.md) endpoint with the response from the scanned-assets-metadata endpoint on the following key fields:

| ENDPOINT                                                        | JOIN KEY                                                 | TYPE   |
| --------------------------------------------------------------- | -------------------------------------------------------- | ------ |
| [/api/v1/hosts](https://docs.datadoghq.com/api/latest/hosts.md) | host_list.tags_by_source["Amazon Web Services"]["image"] | string |
| /api/v2/security/scanned-assets-metadata                        | data.attributes.asset.name                               | string |

**Container Images**

To enrich container image data, join the response from the [Container Images](https://docs.datadoghq.com/api/latest/container-images.md) endpoint with the response from the scanned-assets-metadata endpoint on the following key fields:

| ENDPOINT                                                                              | JOIN KEY                                             | TYPE   |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------- | ------ |
| [/api/v2/container_images](https://docs.datadoghq.com/api/latest/container-images.md) | `data.attributes.name`@`data.attributes.repo_digest` | string |
| /api/v2/security/scanned-assets-metadata                                              | data.attributes.asset.name                           | string |
