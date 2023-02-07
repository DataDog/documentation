---
dependencies: []
disable_edit: true
---
# azure_key_vault_key

## `attributes`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.attributes`<br>
**説明**: キーの属性。<br>
   - `created`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `created`<br>
    **説明**: 1970-01-01T00:00:00Z からの作成時間 (秒)。<br>
   - `enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `enabled`<br>
    **説明**: オブジェクトが有効であるか否かを判断します。<br>
   - `exp`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `exp`<br>
    **説明**: 1970-01-01T00:00:00Z からの有効期限 (秒)。<br>
   - `nbf`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `nbf`<br>
    **説明**: 1970-01-01T00:00:00Z からの秒数で、それ以前の日付ではありません。<br>
   - `recovery_level`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `recoveryLevel`<br>
    **説明**: オブジェクトに対して現在有効な削除回復レベル。’Purgeable' を含む場合、特権ユーザはそのオブジェクトを完全に削除することができます。そうでない場合、システムのみが保持期間の終了時にオブジェクトを削除することができます。<br>
   - `updated`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `updated`<br>
    **説明**: 1970-01-01T00:00:00Z からの最終更新時刻 (秒)。<br>
## `curve_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.curveName`<br>
**説明**: 楕円曲線名。有効な値については、JsonWebKeyCurveName を参照してください。<br>
## `id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `id`<br>
**説明**: key vault リソースの完全修飾識別子。<br>
## `key_ops`
**タイプ**: `UNORDERED_LIST_STRING`<br>
**プロバイダー名**: `properties.keyOps`<br>
## `key_size`
**タイプ**: `INT32`<br>
**プロバイダー名**: `properties.keySize`<br>
**説明**: キーの大きさ (ビット単位)。例: RSA の場合、2048、3072、4096<br>
## `key_uri`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.keyUri`<br>
**説明**: キーの現在のバージョンを取得するための URI。<br>
## `key_uri_with_version`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.keyUriWithVersion`<br>
**説明**: キーの特定のバージョンを取得するための URI。<br>
## `kty`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.kty`<br>
**説明**: キーのタイプ。有効な値については、JsonWebKeyType を参照してください。<br>
## `location`
**タイプ**: `STRING`<br>
**プロバイダー名**: `location`<br>
**説明**: key vault リソースの Azure の場所。<br>
## `name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `name`<br>
**説明**: key vault リソースの名前。<br>
## `resource_group`
**タイプ**: `STRING`<br>
## `subscription_id`
**タイプ**: `STRING`<br>
## `subscription_name`
**タイプ**: `STRING`<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `type`<br>
**説明**: key vault リソースのリソースタイプ。<br>