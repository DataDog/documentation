---
title: AWS Integration
description: Configure your Datadog-AWS integration directly through the Datadog API. For more information, see the AWS integration page.
breadcrumbs: Docs > API > AWS Integration
---

> For the complete documentation index, see [llms.txt](https://docs.datadoghq.com/llms.txt).

# AWS Integration

Configure your Datadog-AWS integration directly through the Datadog API.
For more information, see the [AWS integration page](https://docs.datadoghq.com/integrations/amazon_web_services).

## [Get all AWS tag filters](/api/latest/aws-integration/get-all-aws-tag-filters/) (deprecated)

| Datadog site      | API endpoint                                                           |
| ----------------- | ---------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/integration/aws/filtering     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/integration/aws/filtering |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/integration/aws/filtering |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/integration/aws/filtering      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/integration/aws/filtering |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/integration/aws/filtering |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/integration/aws/filtering      |

## [List available namespaces](/api/latest/aws-integration/list-available-namespaces/)

| Datadog site      | API endpoint                                                                      |
| ----------------- | --------------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/integration/aws/available_namespaces     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/integration/aws/available_namespaces |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/integration/aws/available_namespaces |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/integration/aws/available_namespaces      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/integration/aws/available_namespaces |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/integration/aws/available_namespaces |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/integration/aws/available_namespaces      |

## [Generate a new external ID](/api/latest/aws-integration/generate-a-new-external-id/)

| Datadog site      | API endpoint                                                                           |
| ----------------- | -------------------------------------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v2/integration/aws/generate_new_external_id     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v2/integration/aws/generate_new_external_id |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v2/integration/aws/generate_new_external_id |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v2/integration/aws/generate_new_external_id      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v2/integration/aws/generate_new_external_id |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v2/integration/aws/generate_new_external_id |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v2/integration/aws/generate_new_external_id      |

## [Set an AWS tag filter](/api/latest/aws-integration/set-an-aws-tag-filter/) (deprecated)

| Datadog site      | API endpoint                                                            |
| ----------------- | ----------------------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v1/integration/aws/filtering     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v1/integration/aws/filtering |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v1/integration/aws/filtering |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v1/integration/aws/filtering      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v1/integration/aws/filtering |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v1/integration/aws/filtering |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v1/integration/aws/filtering      |

## [Delete a tag filtering entry](/api/latest/aws-integration/delete-a-tag-filtering-entry/) (deprecated)

| Datadog site      | API endpoint                                                              |
| ----------------- | ------------------------------------------------------------------------- |
| app.datadoghq.com | **DELETE** https://api.datadoghq.com/api/v1/integration/aws/filtering     |
| us3.datadoghq.com | **DELETE** https://api.us3.datadoghq.com/api/v1/integration/aws/filtering |
| us5.datadoghq.com | **DELETE** https://api.us5.datadoghq.com/api/v1/integration/aws/filtering |
| app.datadoghq.eu  | **DELETE** https://api.datadoghq.eu/api/v1/integration/aws/filtering      |
| ap1.datadoghq.com | **DELETE** https://api.ap1.datadoghq.com/api/v1/integration/aws/filtering |
| ap2.datadoghq.com | **DELETE** https://api.ap2.datadoghq.com/api/v1/integration/aws/filtering |
| app.ddog-gov.com  | **DELETE** https://api.ddog-gov.com/api/v1/integration/aws/filtering      |

## [Get an AWS integration by config ID](/api/latest/aws-integration/get-an-aws-integration-by-config-id/)

| Datadog site      | API endpoint                                                                                  |
| ----------------- | --------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/integration/aws/accounts/{aws_account_config_id}     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/integration/aws/accounts/{aws_account_config_id} |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/integration/aws/accounts/{aws_account_config_id} |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/integration/aws/accounts/{aws_account_config_id}      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/integration/aws/accounts/{aws_account_config_id} |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/integration/aws/accounts/{aws_account_config_id} |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/integration/aws/accounts/{aws_account_config_id}      |

## [Delete an AWS integration](/api/latest/aws-integration/delete-an-aws-integration/)

| Datadog site      | API endpoint                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| app.datadoghq.com | **DELETE** https://api.datadoghq.com/api/v2/integration/aws/accounts/{aws_account_config_id}     |
| us3.datadoghq.com | **DELETE** https://api.us3.datadoghq.com/api/v2/integration/aws/accounts/{aws_account_config_id} |
| us5.datadoghq.com | **DELETE** https://api.us5.datadoghq.com/api/v2/integration/aws/accounts/{aws_account_config_id} |
| app.datadoghq.eu  | **DELETE** https://api.datadoghq.eu/api/v2/integration/aws/accounts/{aws_account_config_id}      |
| ap1.datadoghq.com | **DELETE** https://api.ap1.datadoghq.com/api/v2/integration/aws/accounts/{aws_account_config_id} |
| ap2.datadoghq.com | **DELETE** https://api.ap2.datadoghq.com/api/v2/integration/aws/accounts/{aws_account_config_id} |
| app.ddog-gov.com  | **DELETE** https://api.ddog-gov.com/api/v2/integration/aws/accounts/{aws_account_config_id}      |

## [List namespace rules](/api/latest/aws-integration/list-namespace-rules/) (deprecated)

| Datadog site      | API endpoint                                                                           |
| ----------------- | -------------------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/integration/aws/available_namespace_rules     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/integration/aws/available_namespace_rules |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/integration/aws/available_namespace_rules |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/integration/aws/available_namespace_rules      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/integration/aws/available_namespace_rules |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/integration/aws/available_namespace_rules |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/integration/aws/available_namespace_rules      |

## [Update an AWS integration](/api/latest/aws-integration/update-an-aws-integration/)

| Datadog site      | API endpoint                                                                                    |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **PATCH** https://api.datadoghq.com/api/v2/integration/aws/accounts/{aws_account_config_id}     |
| us3.datadoghq.com | **PATCH** https://api.us3.datadoghq.com/api/v2/integration/aws/accounts/{aws_account_config_id} |
| us5.datadoghq.com | **PATCH** https://api.us5.datadoghq.com/api/v2/integration/aws/accounts/{aws_account_config_id} |
| app.datadoghq.eu  | **PATCH** https://api.datadoghq.eu/api/v2/integration/aws/accounts/{aws_account_config_id}      |
| ap1.datadoghq.com | **PATCH** https://api.ap1.datadoghq.com/api/v2/integration/aws/accounts/{aws_account_config_id} |
| ap2.datadoghq.com | **PATCH** https://api.ap2.datadoghq.com/api/v2/integration/aws/accounts/{aws_account_config_id} |
| app.ddog-gov.com  | **PATCH** https://api.ddog-gov.com/api/v2/integration/aws/accounts/{aws_account_config_id}      |

## [Get AWS integration IAM permissions](/api/latest/aws-integration/get-aws-integration-iam-permissions/)

| Datadog site      | API endpoint                                                                 |
| ----------------- | ---------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/integration/aws/iam_permissions     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/integration/aws/iam_permissions |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/integration/aws/iam_permissions |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/integration/aws/iam_permissions      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/integration/aws/iam_permissions |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/integration/aws/iam_permissions |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/integration/aws/iam_permissions      |

## [List all AWS integrations](/api/latest/aws-integration/list-all-aws-integrations/)

| Datadog site      | API endpoint                                                          |
| ----------------- | --------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/integration/aws/accounts     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/integration/aws/accounts |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/integration/aws/accounts |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/integration/aws/accounts      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/integration/aws/accounts |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/integration/aws/accounts |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/integration/aws/accounts      |

## [Get AWS integration standard IAM permissions](/api/latest/aws-integration/get-aws-integration-standard-iam-permissions/)

| Datadog site      | API endpoint                                                                          |
| ----------------- | ------------------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/integration/aws/iam_permissions/standard     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/integration/aws/iam_permissions/standard |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/integration/aws/iam_permissions/standard |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/integration/aws/iam_permissions/standard      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/integration/aws/iam_permissions/standard |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/integration/aws/iam_permissions/standard |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/integration/aws/iam_permissions/standard      |

## [Create an AWS integration](/api/latest/aws-integration/create-an-aws-integration/)

| Datadog site      | API endpoint                                                           |
| ----------------- | ---------------------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v2/integration/aws/accounts     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v2/integration/aws/accounts |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v2/integration/aws/accounts |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v2/integration/aws/accounts      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v2/integration/aws/accounts |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v2/integration/aws/accounts |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v2/integration/aws/accounts      |

## [Get resource collection IAM permissions](/api/latest/aws-integration/get-resource-collection-iam-permissions/)

| Datadog site      | API endpoint                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/integration/aws/iam_permissions/resource_collection     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/integration/aws/iam_permissions/resource_collection |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/integration/aws/iam_permissions/resource_collection |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/integration/aws/iam_permissions/resource_collection      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/integration/aws/iam_permissions/resource_collection |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/integration/aws/iam_permissions/resource_collection |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/integration/aws/iam_permissions/resource_collection      |

## [Update AWS CCM config](/api/latest/aws-integration/update-aws-ccm-config/) (preview)

| Datadog site      | API endpoint                                                                                               |
| ----------------- | ---------------------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **PATCH** https://api.datadoghq.com/api/v2/integration/aws/accounts/{aws_account_config_id}/ccm_config     |
| us3.datadoghq.com | **PATCH** https://api.us3.datadoghq.com/api/v2/integration/aws/accounts/{aws_account_config_id}/ccm_config |
| us5.datadoghq.com | **PATCH** https://api.us5.datadoghq.com/api/v2/integration/aws/accounts/{aws_account_config_id}/ccm_config |
| app.datadoghq.eu  | **PATCH** https://api.datadoghq.eu/api/v2/integration/aws/accounts/{aws_account_config_id}/ccm_config      |
| ap1.datadoghq.com | **PATCH** https://api.ap1.datadoghq.com/api/v2/integration/aws/accounts/{aws_account_config_id}/ccm_config |
| ap2.datadoghq.com | **PATCH** https://api.ap2.datadoghq.com/api/v2/integration/aws/accounts/{aws_account_config_id}/ccm_config |
| app.ddog-gov.com  | **PATCH** https://api.ddog-gov.com/api/v2/integration/aws/accounts/{aws_account_config_id}/ccm_config      |

## [Delete AWS CCM config](/api/latest/aws-integration/delete-aws-ccm-config/) (preview)

| Datadog site      | API endpoint                                                                                                |
| ----------------- | ----------------------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **DELETE** https://api.datadoghq.com/api/v2/integration/aws/accounts/{aws_account_config_id}/ccm_config     |
| us3.datadoghq.com | **DELETE** https://api.us3.datadoghq.com/api/v2/integration/aws/accounts/{aws_account_config_id}/ccm_config |
| us5.datadoghq.com | **DELETE** https://api.us5.datadoghq.com/api/v2/integration/aws/accounts/{aws_account_config_id}/ccm_config |
| app.datadoghq.eu  | **DELETE** https://api.datadoghq.eu/api/v2/integration/aws/accounts/{aws_account_config_id}/ccm_config      |
| ap1.datadoghq.com | **DELETE** https://api.ap1.datadoghq.com/api/v2/integration/aws/accounts/{aws_account_config_id}/ccm_config |
| ap2.datadoghq.com | **DELETE** https://api.ap2.datadoghq.com/api/v2/integration/aws/accounts/{aws_account_config_id}/ccm_config |
| app.ddog-gov.com  | **DELETE** https://api.ddog-gov.com/api/v2/integration/aws/accounts/{aws_account_config_id}/ccm_config      |

## [Get all Amazon EventBridge sources](/api/latest/aws-integration/get-all-amazon-eventbridge-sources/)

| Datadog site      | API endpoint                                                              |
| ----------------- | ------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/integration/aws/event_bridge     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/integration/aws/event_bridge |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/integration/aws/event_bridge |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/integration/aws/event_bridge      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/integration/aws/event_bridge |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/integration/aws/event_bridge |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/integration/aws/event_bridge      |

## [Create an Amazon EventBridge source](/api/latest/aws-integration/create-an-amazon-eventbridge-source/)

| Datadog site      | API endpoint                                                               |
| ----------------- | -------------------------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v2/integration/aws/event_bridge     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v2/integration/aws/event_bridge |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v2/integration/aws/event_bridge |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v2/integration/aws/event_bridge      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v2/integration/aws/event_bridge |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v2/integration/aws/event_bridge |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v2/integration/aws/event_bridge      |

## [Delete an Amazon EventBridge source](/api/latest/aws-integration/delete-an-amazon-eventbridge-source/)

| Datadog site      | API endpoint                                                                 |
| ----------------- | ---------------------------------------------------------------------------- |
| app.datadoghq.com | **DELETE** https://api.datadoghq.com/api/v2/integration/aws/event_bridge     |
| us3.datadoghq.com | **DELETE** https://api.us3.datadoghq.com/api/v2/integration/aws/event_bridge |
| us5.datadoghq.com | **DELETE** https://api.us5.datadoghq.com/api/v2/integration/aws/event_bridge |
| app.datadoghq.eu  | **DELETE** https://api.datadoghq.eu/api/v2/integration/aws/event_bridge      |
| ap1.datadoghq.com | **DELETE** https://api.ap1.datadoghq.com/api/v2/integration/aws/event_bridge |
| ap2.datadoghq.com | **DELETE** https://api.ap2.datadoghq.com/api/v2/integration/aws/event_bridge |
| app.ddog-gov.com  | **DELETE** https://api.ddog-gov.com/api/v2/integration/aws/event_bridge      |

## [Get AWS CCM config](/api/latest/aws-integration/get-aws-ccm-config/) (preview)

| Datadog site      | API endpoint                                                                                             |
| ----------------- | -------------------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/integration/aws/accounts/{aws_account_config_id}/ccm_config     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/integration/aws/accounts/{aws_account_config_id}/ccm_config |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/integration/aws/accounts/{aws_account_config_id}/ccm_config |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/integration/aws/accounts/{aws_account_config_id}/ccm_config      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/integration/aws/accounts/{aws_account_config_id}/ccm_config |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/integration/aws/accounts/{aws_account_config_id}/ccm_config |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/integration/aws/accounts/{aws_account_config_id}/ccm_config      |

## [Create AWS CCM config](/api/latest/aws-integration/create-aws-ccm-config/) (preview)

| Datadog site      | API endpoint                                                                                              |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v2/integration/aws/accounts/{aws_account_config_id}/ccm_config     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v2/integration/aws/accounts/{aws_account_config_id}/ccm_config |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v2/integration/aws/accounts/{aws_account_config_id}/ccm_config |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v2/integration/aws/accounts/{aws_account_config_id}/ccm_config      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v2/integration/aws/accounts/{aws_account_config_id}/ccm_config |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v2/integration/aws/accounts/{aws_account_config_id}/ccm_config |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v2/integration/aws/accounts/{aws_account_config_id}/ccm_config      |
