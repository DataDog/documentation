---
title: gcp_iam_service_account
kind: documentation
---

## `ancestors`
**Type**: `UNORDERED_LIST_STRING`<br>
## `description`
**Type**: `STRING`<br>
    **Description**: Optional. A user-specified, human-readable description of the service account. The maximum length is 256 UTF-8 bytes.<br>
    **GCP name**: `description`<br>
## `disabled`
**Type**: `BOOLEAN`<br>
    **Description**: Output only. Whether the service account is disabled.<br>
    **GCP name**: `disabled`<br>
## `email`
**Type**: `STRING`<br>
    **Description**: Output only. The email address of the service account.<br>
    **GCP name**: `email`<br>
## `gcp_display_name`
**Type**: `STRING`<br>
    **Description**: Optional. A user-specified, human-readable name for the service account. The maximum length is 100 UTF-8 bytes.<br>
    **GCP name**: `displayName`<br>
## `labels`
**Type**: `UNORDERED_LIST_STRING`<br>
## `name`
**Type**: `STRING`<br>
**Description**: The resource name of the service account. Use one of the following formats: 
- `projects/{PROJECT_ID}/serviceAccounts/{EMAIL_ADDRESS}` 
- `projects/{PROJECT_ID}/serviceAccounts/{UNIQUE_ID}` 
As an alternative, you can use the `-` wildcard character instead of the project ID: 
- `projects/-/serviceAccounts/{EMAIL_ADDRESS}` 
- `projects/-/serviceAccounts/{UNIQUE_ID}` 
When possible, avoid using the `-` wildcard character, because it can cause response messages to contain misleading error codes. For example, if you try to get the service account `projects/-/serviceAccounts/fake@example.com`, which does not exist, the response contains an HTTP `403 Forbidden` error instead of a `404 Not Found` error.<br>
    **GCP name**: `name`<br>
## `oauth2_client_id`
**Type**: `STRING`<br>
    **Description**: Output only. The OAuth 2.0 client ID for the service account.<br>
    **GCP name**: `oauth2ClientId`<br>
## `organization_id`
**Type**: `STRING`<br>
## `parent`
**Type**: `STRING`<br>
## `project_id`
**Type**: `STRING`<br>
## `project_number`
**Type**: `STRING`<br>
## `resource_name`
**Type**: `STRING`<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `unique_id`
**Type**: `STRING`<br>
    **Description**: Output only. The unique, stable numeric ID for the service account. Each service account retains its unique ID even if you delete the service account. For example, if you delete a service account, then create a new service account with the same name, the new service account has a different unique ID than the deleted service account.<br>
    **GCP name**: `uniqueId`<br>
