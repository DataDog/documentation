---
dependencies: []
disable_edit: true
---
# azure_key_vault_secret

## `attributes`
**Type**: `STRUCT`<br>
**Provider name**: `properties.attributes`<br>
**Description**: The attributes of the secret.<br>
   - `created`<br>
    **Type**: `INT64`<br>
    **Provider name**: `created`<br>
    **Description**: Creation time in seconds since 1970-01-01T00:00:00Z.<br>
   - `enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `enabled`<br>
    **Description**: Determines whether the object is enabled.<br>
   - `exp`<br>
    **Type**: `INT64`<br>
    **Provider name**: `exp`<br>
    **Description**: Expiry date in seconds since 1970-01-01T00:00:00Z.<br>
   - `nbf`<br>
    **Type**: `INT64`<br>
    **Provider name**: `nbf`<br>
    **Description**: Not before date in seconds since 1970-01-01T00:00:00Z.<br>
   - `updated`<br>
    **Type**: `INT64`<br>
    **Provider name**: `updated`<br>
    **Description**: Last updated time in seconds since 1970-01-01T00:00:00Z.<br>
## `content_type`
**Type**: `STRING`<br>
**Provider name**: `properties.contentType`<br>
**Description**: The content type of the secret.<br>
## `id`
**Type**: `STRING`<br>
**Provider name**: `id`<br>
**Description**: Fully qualified identifier of the key vault resource.<br>
## `location`
**Type**: `STRING`<br>
**Provider name**: `location`<br>
**Description**: Azure location of the key vault resource.<br>
## `name`
**Type**: `STRING`<br>
**Provider name**: `name`<br>
**Description**: Name of the key vault resource.<br>
## `resource_group`
**Type**: `STRING`<br>
## `secret_uri`
**Type**: `STRING`<br>
**Provider name**: `properties.secretUri`<br>
**Description**: The URI to retrieve the current version of the secret.<br>
## `secret_uri_with_version`
**Type**: `STRING`<br>
**Provider name**: `properties.secretUriWithVersion`<br>
**Description**: The URI to retrieve the specific version of the secret.<br>
## `subscription_id`
**Type**: `STRING`<br>
## `subscription_name`
**Type**: `STRING`<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `type`
**Type**: `STRING`<br>
**Provider name**: `type`<br>
**Description**: Resource type of the key vault resource.<br>
## `value`
**Type**: `STRING`<br>
**Provider name**: `properties.value`<br>
**Description**: The value of the secret. NOTE: 'value' will never be returned from the service, as APIs using this model are is intended for internal use in ARM deployments. Users should use the data-plane REST service for interaction with vault secrets.<br>
