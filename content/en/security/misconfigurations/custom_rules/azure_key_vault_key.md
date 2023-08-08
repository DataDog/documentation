---
dependencies: []
disable_edit: true
---
# azure_key_vault_key

## `attributes`
**Type**: `STRUCT`<br>
**Provider name**: `properties.attributes`<br>
**Description**: The attributes of the key.<br>
   - `created`<br>
    **Type**: `INT64`<br>
    **Provider name**: `created`<br>
    **Description**: Creation time in seconds since 1970-01-01T00:00:00Z.<br>
   - `enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `enabled`<br>
    **Description**: Determines whether or not the object is enabled.<br>
   - `exp`<br>
    **Type**: `INT64`<br>
    **Provider name**: `exp`<br>
    **Description**: Expiry date in seconds since 1970-01-01T00:00:00Z.<br>
   - `nbf`<br>
    **Type**: `INT64`<br>
    **Provider name**: `nbf`<br>
    **Description**: Not before date in seconds since 1970-01-01T00:00:00Z.<br>
   - `recovery_level`<br>
    **Type**: `STRING`<br>
    **Provider name**: `recoveryLevel`<br>
    **Description**: The deletion recovery level currently in effect for the object. If it contains 'Purgeable', then the object can be permanently deleted by a privileged user; otherwise, only the system can purge the object at the end of the retention interval.<br>
   - `updated`<br>
    **Type**: `INT64`<br>
    **Provider name**: `updated`<br>
    **Description**: Last updated time in seconds since 1970-01-01T00:00:00Z.<br>
## `curve_name`
**Type**: `STRING`<br>
**Provider name**: `properties.curveName`<br>
**Description**: The elliptic curve name. For valid values, see JsonWebKeyCurveName.<br>
## `id`
**Type**: `STRING`<br>
**Provider name**: `id`<br>
**Description**: Fully qualified identifier of the key vault resource.<br>
## `key_ops`
**Type**: `UNORDERED_LIST_STRING`<br>
**Provider name**: `properties.keyOps`<br>
## `key_size`
**Type**: `INT32`<br>
**Provider name**: `properties.keySize`<br>
**Description**: The key size in bits. For example: 2048, 3072, or 4096 for RSA.<br>
## `key_uri`
**Type**: `STRING`<br>
**Provider name**: `properties.keyUri`<br>
**Description**: The URI to retrieve the current version of the key.<br>
## `key_uri_with_version`
**Type**: `STRING`<br>
**Provider name**: `properties.keyUriWithVersion`<br>
**Description**: The URI to retrieve the specific version of the key.<br>
## `kty`
**Type**: `STRING`<br>
**Provider name**: `properties.kty`<br>
**Description**: The type of the key. For valid values, see JsonWebKeyType.<br>
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
