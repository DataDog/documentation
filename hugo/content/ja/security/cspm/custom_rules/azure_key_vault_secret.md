---
dependencies: []
disable_edit: true
---
# azure_key_vault_secret

## `attributes`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.attributes`<br>
**説明**: シークレットの属性。<br>
   - `created`<br>
    **タイプ**: `INT64`<br>
    **Provider name**: `created`<br>
    **Description**: Creation time in seconds since 1970-01-01T00:00:00Z.<br>
   - `enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `enabled`<br>
    **説明**: オブジェクトが有効であるかどうかを判断します。<br>
   - `exp`<br>
    **タイプ**: `INT64`<br>
    **Provider name**: `exp`<br>
    **Description**: Expiry date in seconds since 1970-01-01T00:00:00Z.<br>
   - `nbf`<br>
    **タイプ**: `INT64`<br>
    **Provider name**: `nbf`<br>
    **Description**: Not before date in seconds since 1970-01-01T00:00:00Z.<br>
   - `updated`<br>
    **タイプ**: `INT64`<br>
    **Provider name**: `updated`<br>
    **Description**: Last updated time in seconds since 1970-01-01T00:00:00Z.<br>
## `content_type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.contentType`<br>
**説明**: シークレットのコンテンツタイプ。<br>
## `id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `id`<br>
**Description**: Fully qualified identifier of the key vault resource.<br>
## `location`
**タイプ**: `STRING`<br>
**プロバイダー名**: `location`<br>
**Description**: Azure location of the key vault resource.<br>
## `name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `name`<br>
**Description**: Name of the key vault resource.<br>
## `resource_group`
**タイプ**: `STRING`<br>
## `secret_uri`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.secretUri`<br>
**説明**: シークレットの現在のバージョンを取得するための URI。<br>
## `secret_uri_with_version`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.secretUriWithVersion`<br>
**説明**: シークレットの特定のバージョンを取得するための URI。<br>
## `subscription_id`
**タイプ**: `STRING`<br>
## `subscription_name`
**タイプ**: `STRING`<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `type`<br>
**Description**: Resource type of the key vault resource.<br>
## `value`
**タイプ**: `STRING`<br>
**Provider name**: `properties.value`<br>
**説明**: シークレットの値。注: このモデルを使用している API は ARM デプロイでの内部利用を目的としているため、サービスから 'value' が返されることはありません。Vault シークレットに対する操作には、データプレーン REST サービスを使用する必要があります。<br>