---
dependencies: []
disable_edit: true
---
# azure_storage_account

## `access_tier`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.accessTier`<br>
**説明**: kind = BlobStorage のストレージアカウントに必要です。請求に使用されるアクセス階層です。<br>
## `allow_blob_public_access`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `properties.allowBlobPublicAccess`<br>
**説明**: ストレージアカウント内のすべての Blob またはコンテナへのパブリックアクセスを許可または拒否します。このプロパティのデフォルトの解釈は true です。<br>
## `allow_shared_key_access`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `properties.allowSharedKeyAccess`<br>
**説明**: ストレージアカウントが、共有キーによるアカウントのアクセスキーでのリクエストの認可を許可するかどうかを示します。false の場合、共有アクセス署名を含むすべてのリクエストは、Azure Active Directory (Azure AD) で認可される必要があります。デフォルト値は null で、これは true と同じです。<br>
## `blob_services`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `BlobServiceProperties`<br>
   - `change_feed`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `properties.changeFeed`<br>
    **説明**: フィード変更イベントのための Blob サービスプロパティ。<br>
       - `enabled`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `enabled`<br>
        **説明**: Blob サービスに対してフィード変更イベントロギングが有効であるかどうかを示します。<br>
       - `retention_in_days`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `retentionInDays`<br>
        **説明**: changeFeed が保持される期間を日数で示します。最小値は 1 日、最大値は 146000 日 (400 年) です。NULL 値は、フィード変更の保持が無限であることを示します。<br>
   - `container_delete_retention_policy`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `properties.containerDeleteRetentionPolicy`<br>
    **説明**: コンテナソフト削除のための Blob サービスプロパティ。<br>
       - `days`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `days`<br>
        **説明**: 削除された項目を保持する日数を示します。最小値は 1、最大値は 365 です。<br>
       - `enabled`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `enabled`<br>
        **説明**: DeleteRetentionPolicy が有効であるか否かを示します。<br>
   - `cors`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `properties.cors`<br>
    **説明**: Blob サービスの CORS ルールを指定します。リクエストに最大 5 つの CorsRule 要素を含めることができます。リクエスト本文に CorsRule 要素が含まれていない場合、すべての CORS ルールが削除され、Blob サービスの CORS は無効となります。<br>
       - `cors_rules`<br>
        **タイプ**: `UNORDERED_LIST_STRUCT`<br>
        **プロバイダー名**: `corsRules`<br>
        **説明**: CORS ルールのリスト。リクエストに最大 5 つの CorsRule 要素を含めることができます。<br>
           - `allowed_headers`<br>
            **タイプ**: `UNORDERED_LIST_STRING`<br>
            **プロバイダー名**: `allowedHeaders`<br>
            **説明**: CorsRule 要素が存在する場合は必須。クロスオリジンリクエストの一部として許可されるヘッダーのリストです。<br>
           - `allowed_methods`<br>
            **タイプ**: `UNORDERED_LIST_STRING`<br>
            **プロバイダー名**: `allowedMethods`<br>
            **説明**: CorsRule 要素が存在する場合は必須。オリジンで実行が許可されている HTTP メソッドのリストです。<br>
           - `allowed_origins`<br>
            **タイプ**: `UNORDERED_LIST_STRING`<br>
            **プロバイダー名**: `allowedOrigins`<br>
            **説明**: CorsRule 要素が存在する場合は必須。CORS を介して許可されるオリジンドメインのリスト、またはすべてのドメインを許可する場合は "*" です。<br>
           - `exposed_headers`<br>
            **タイプ**: `UNORDERED_LIST_STRING`<br>
            **プロバイダー名**: `exposedHeaders`<br>
            **説明**: CorsRule 要素が存在する場合は必須。CORS クライアントに公開する応答ヘッダーのリストです。<br>
           - `max_age_in_seconds`<br>
            **タイプ**: `INT32`<br>
            **プロバイダー名**: `maxAgeInSeconds`<br>
            **説明**: CorsRule 要素が存在する場合は必須。クライアント/ブラウザがプリフライトレスポンスをキャッシュすべき時間 (秒)。<br>
   - `delete_retention_policy`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `properties.deleteRetentionPolicy`<br>
    **説明**: Blob ソフト削除のための Blob サービスプロパティ。<br>
       - `days`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `days`<br>
        **説明**: 削除された項目を保持する日数を示します。最小値は 1、最大値は 365 です。<br>
       - `enabled`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `enabled`<br>
        **説明**: DeleteRetentionPolicy が有効であるか否かを示します。<br>
   - `id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `id`<br>
    **説明**: リソースの完全修飾型リソース ID。例 - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}<br>
   - `is_versioning_enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `properties.isVersioningEnabled`<br>
    **説明**: true に設定するとバージョン管理が有効になります。<br>
   - `name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `name`<br>
    **説明**: リソースの名前<br>
   - `restore_policy`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `properties.restorePolicy`<br>
    **説明**: Blob 復元ポリシーのための Blob サービスプロパティ。<br>
       - `days`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `days`<br>
        **説明**: この Blob を復元できる期間。0 より大きく、DeleteRetentionPolicy.days より小さくする必要があります。<br>
       - `enabled`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `enabled`<br>
        **説明**: true に設定すると Blob の復元が有効になります。<br>
       - `last_enabled_time`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `lastEnabledTime`<br>
        **説明**: minRestoreTime プロパティを優先して非推奨になりました。<br>
       - `min_restore_time`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `minRestoreTime`<br>
        **説明**: 復元を開始することができる最小の日時を返します。<br>
   - `sku`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `sku`<br>
    **説明**: sku の名前と階層。<br>
       - `name`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `name`<br>
       - `tier`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `tier`<br>
   - `type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `type`<br>
    **説明**: リソースの種類。例: "Microsoft.Compute/virtualMachines" または "Microsoft.Storage/storageAccounts"<br>
## `creation_time`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.creationTime`<br>
**説明**: ストレージアカウントの作成日時を UTC で取得します。<br>
## `encryption`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.encryption`<br>
**説明**: アカウントの暗号化設定を取得します。未指定の場合、アカウントは暗号化されません。<br>
   - `key_source`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `keySource`<br>
    **説明**: 暗号化 keySource (プロバイダー)。可能な値 (大文字と小文字を区別): Microsoft.Storage、Microsoft.Keyvault<br>
   - `keyvaultproperties`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `keyvaultproperties`<br>
    **説明**: Key vault が提供するプロパティ。<br>
       - `current_versioned_key_identifier`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `currentVersionedKeyIdentifier`<br>
        **説明**: 現在使用中のバージョン管理された Key Vault キーのオブジェクト識別子。<br>
       - `keyname`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `keyname`<br>
        **説明**: KeyVault キーの名前。<br>
       - `keyvaulturi`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `keyvaulturi`<br>
        **説明**: KeyVault の URI。<br>
       - `keyversion`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `keyversion`<br>
        **説明**: KeyVault キーのバージョン。<br>
       - `last_key_rotation_timestamp`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `lastKeyRotationTimestamp`<br>
        **説明**: Key Vault キーの最終ローテーションのタイムスタンプ。<br>
   - `services`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `services`<br>
    **説明**: 暗号化に対応したサービスのリスト。<br>
       - `blob`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `blob`<br>
        **説明**: Blob ストレージサービスの暗号化関数。<br>
           - `enabled`<br>
            **タイプ**: `BOOLEAN`<br>
            **プロバイダー名**: `enabled`<br>
            **説明**: サービスがデータを暗号化して保存するかどうかを示すブール値。<br>
           - `key_type`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `keyType`<br>
            **説明**: 暗号化サービスに使用する暗号化キータイプ。'Account' キータイプは、アカウントに対応した暗号化キーを使用することを意味します。'Service' キータイプは、デフォルトのサービスキーを使用することを意味します。<br>
           - `last_enabled_time`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `lastEnabledTime`<br>
            **説明**: ユーザーが最後に暗号化を有効にした日時の概算を取得します。暗号化が有効な場合のみ返されます。あくまで目安なので、この時間以降に書き込まれた暗号化されていない Blob があるかもしれません。<br>
       - `file`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `file`<br>
        **説明**: ファイルストレージサービスの暗号化関数。<br>
           - `enabled`<br>
            **タイプ**: `BOOLEAN`<br>
            **プロバイダー名**: `enabled`<br>
            **説明**: サービスがデータを暗号化して保存するかどうかを示すブール値。<br>
           - `key_type`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `keyType`<br>
            **説明**: 暗号化サービスに使用する暗号化キータイプ。'Account' キータイプは、アカウントに対応した暗号化キーを使用することを意味します。'Service' キータイプは、デフォルトのサービスキーを使用することを意味します。<br>
           - `last_enabled_time`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `lastEnabledTime`<br>
            **説明**: ユーザーが最後に暗号化を有効にした日時の概算を取得します。暗号化が有効な場合のみ返されます。あくまで目安なので、この時間以降に書き込まれた暗号化されていない Blob があるかもしれません。<br>
## `id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `id`<br>
**説明**: リソースの完全修飾型リソース ID。例 - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}<br>
## `identity`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `identity`<br>
**説明**: リソースのアイデンティティ。<br>
   - `principal_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `principalId`<br>
    **説明**: リソースアイデンティティのプリンシパル ID。<br>
   - `tenant_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `tenantId`<br>
    **説明**: リソースのテナント ID。<br>
   - `type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `type`<br>
    **説明**: アイデンティティタイプ。<br>
## `kind`
**タイプ**: `STRING`<br>
**プロバイダー名**: `kind`<br>
**説明**: Kind を取得します。<br>
## `large_file_shares_state`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.largeFileSharesState`<br>
**説明**: Enabled に設定すると、大きなファイル共有を許可します。一度有効にすると、無効にすることはできません。<br>
## `location`
**タイプ**: `STRING`<br>
**プロバイダー名**: `location`<br>
**説明**: リソースが存在するジオロケーション<br>
## `management_policy`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `ManagementPolicy`<br>
   - `id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `id`<br>
    **説明**: リソースの完全修飾型リソース ID。例 - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}<br>
   - `last_modified_time`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.lastModifiedTime`<br>
    **説明**: ManagementPolicies が最後に変更された日時を返します。<br>
   - `name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `name`<br>
    **説明**: リソースの名前<br>
   - `policy`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `properties.policy`<br>
    **説明**: Storage Account ManagementPolicy を JSON 形式で表したもの。詳細はこちらをご覧ください: https://docs.microsoft.com/en-us/azure/storage/common/storage-lifecycle-managment-concepts<br>
       - `rules`<br>
        **タイプ**: `UNORDERED_LIST_STRUCT`<br>
        **プロバイダー名**: `rules`<br>
        **説明**: Storage Account ManagementPolicies Rules。詳細はこちらをご覧ください: https://docs.microsoft.com/en-us/azure/storage/common/storage-lifecycle-managment-concepts<br>
           - `definition`<br>
            **タイプ**: `STRUCT`<br>
            **プロバイダー名**: `definition`<br>
            **説明**: Lifecycle ルールを定義するオブジェクト。<br>
               - `actions`<br>
                **タイプ**: `STRUCT`<br>
                **プロバイダー名**: `actions`<br>
                **説明**: アクションセットを定義するオブジェクト。<br>
                   - `base_blob`<br>
                    **タイプ**: `STRUCT`<br>
                    **プロバイダー名**: `baseBlob`<br>
                    **説明**: ベース Blob の管理ポリシーアクション<br>
                       - `delete`<br>
                        **タイプ**: `STRUCT`<br>
                        **プロバイダー名**: `delete`<br>
                        **説明**: Blob を削除する関数<br>
                           - `days_after_last_access_time_greater_than`<br>
                            **タイプ**: `DOUBLE`<br>
                            **プロバイダー名**: `daysAfterLastAccessTimeGreaterThan`<br>
                            **説明**: 最後の Blob アクセスからの経過時間を日数で示す値。このプロパティは、最終アクセス時刻追跡ポリシーと組み合わせてのみ使用できます<br>
                           - `days_after_modification_greater_than`<br>
                            **タイプ**: `DOUBLE`<br>
                            **プロバイダー名**: `daysAfterModificationGreaterThan`<br>
                            **説明**: 最終修正日からの経過日数を示す値<br>
                       - `tier_to_archive`<br>
                        **タイプ**: `STRUCT`<br>
                        **プロバイダー名**: `tierToArchive`<br>
                        **説明**: Blob をアーカイブストレージに階層化する関数。現在 Hot 階層または Cool 階層にある Blob をサポートしています<br>
                           - `days_after_last_access_time_greater_than`<br>
                            **タイプ**: `DOUBLE`<br>
                            **プロバイダー名**: `daysAfterLastAccessTimeGreaterThan`<br>
                            **説明**: 最後の Blob アクセスからの経過時間を日数で示す値。このプロパティは、最終アクセス時刻追跡ポリシーと組み合わせてのみ使用できます<br>
                           - `days_after_modification_greater_than`<br>
                            **タイプ**: `DOUBLE`<br>
                            **プロバイダー名**: `daysAfterModificationGreaterThan`<br>
                            **説明**: 最終修正日からの経過日数を示す値<br>
                       - `tier_to_cool`<br>
                        **タイプ**: `STRUCT`<br>
                        **プロバイダー名**: `tierToCool`<br>
                        **説明**: Blob をクールストレージに階層化する関数。現在 Hot 階層にある Blob をサポートしています<br>
                           - `days_after_last_access_time_greater_than`<br>
                            **タイプ**: `DOUBLE`<br>
                            **プロバイダー名**: `daysAfterLastAccessTimeGreaterThan`<br>
                            **説明**: 最後の Blob アクセスからの経過時間を日数で示す値。このプロパティは、最終アクセス時刻追跡ポリシーと組み合わせてのみ使用できます<br>
                           - `days_after_modification_greater_than`<br>
                            **タイプ**: `DOUBLE`<br>
                            **プロバイダー名**: `daysAfterModificationGreaterThan`<br>
                            **説明**: 最終修正日からの経過日数を示す値<br>
                   - `snapshot`<br>
                    **タイプ**: `STRUCT`<br>
                    **プロバイダー名**: `snapshot`<br>
                    **説明**: スナップショットの管理ポリシーアクション<br>
                       - `delete`<br>
                        **タイプ**: `STRUCT`<br>
                        **プロバイダー名**: `delete`<br>
                        **説明**: Blob スナップショットを削除する関数<br>
                           - `days_after_creation_greater_than`<br>
                            **タイプ**: `DOUBLE`<br>
                            **プロバイダー名**: `daysAfterCreationGreaterThan`<br>
                            **説明**: 作成日からの経過日数を示す値<br>
                       - `tier_to_archive`<br>
                        **タイプ**: `STRUCT`<br>
                        **プロバイダー名**: `tierToArchive`<br>
                        **説明**: Blob スナップショットをアーカイブストレージに階層化する関数。現在 Hot 階層または Cool 階層にある Blob スナップショットをサポートしています<br>
                           - `days_after_creation_greater_than`<br>
                            **タイプ**: `DOUBLE`<br>
                            **プロバイダー名**: `daysAfterCreationGreaterThan`<br>
                            **説明**: 作成日からの経過日数を示す値<br>
                       - `tier_to_cool`<br>
                        **タイプ**: `STRUCT`<br>
                        **プロバイダー名**: `tierToCool`<br>
                        **説明**: Blob スナップショットをクールストレージに階層化する関数。現在 Hot 階層にある Blob スナップショットをサポートしています<br>
                           - `days_after_creation_greater_than`<br>
                            **タイプ**: `DOUBLE`<br>
                            **プロバイダー名**: `daysAfterCreationGreaterThan`<br>
                            **説明**: 作成日からの経過日数を示す値<br>
                   - `version`<br>
                    **タイプ**: `STRUCT`<br>
                    **プロバイダー名**: `version`<br>
                    **説明**: バージョンの管理ポリシーアクション<br>
                       - `delete`<br>
                        **タイプ**: `STRUCT`<br>
                        **プロバイダー名**: `delete`<br>
                        **説明**: Blob バージョンを削除する関数<br>
                           - `days_after_creation_greater_than`<br>
                            **タイプ**: `DOUBLE`<br>
                            **プロバイダー名**: `daysAfterCreationGreaterThan`<br>
                            **説明**: 作成日からの経過日数を示す値<br>
                       - `tier_to_archive`<br>
                        **タイプ**: `STRUCT`<br>
                        **プロバイダー名**: `tierToArchive`<br>
                        **説明**: Blob バージョンをアーカイブストレージに階層化する関数。現在 Hot 階層または Cool 階層にある Blob バージョンをサポートしています<br>
                           - `days_after_creation_greater_than`<br>
                            **タイプ**: `DOUBLE`<br>
                            **プロバイダー名**: `daysAfterCreationGreaterThan`<br>
                            **説明**: 作成日からの経過日数を示す値<br>
                       - `tier_to_cool`<br>
                        **タイプ**: `STRUCT`<br>
                        **プロバイダー名**: `tierToCool`<br>
                        **説明**: Blob バージョンをクールストレージに階層化する関数。現在 Hot 階層にある Blob バージョンをサポートしています<br>
                           - `days_after_creation_greater_than`<br>
                            **タイプ**: `DOUBLE`<br>
                            **プロバイダー名**: `daysAfterCreationGreaterThan`<br>
                            **説明**: 作成日からの経過日数を示す値<br>
               - `filters`<br>
                **タイプ**: `STRUCT`<br>
                **プロバイダー名**: `filters`<br>
                **説明**: フィルターセットを定義するオブジェクト。<br>
                   - `blob_types`<br>
                    **タイプ**: `UNORDERED_LIST_STRING`<br>
                    **プロバイダー名**: `blobTypes`<br>
                    **説明**: 定義済みの enum 値の配列。現在、blockBlob はすべての階層化アクションと削除アクションをサポートしています。appendBlob は delete アクションのみをサポートしています。<br>
                   - `prefix_match`<br>
                    **タイプ**: `UNORDERED_LIST_STRING`<br>
                    **プロバイダー名**: `prefixMatch`<br>
                    **説明**: マッチするプレフィックスを表す文字列の配列。<br>
           - `enabled`<br>
            **タイプ**: `BOOLEAN`<br>
            **プロバイダー名**: `enabled`<br>
            **説明**: true に設定するとルールが有効になります。<br>
           - `name`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `name`<br>
            **説明**: ルール名には、英数字を自由に組み合わせることができます。ルール名は大文字と小文字が区別されます。ポリシー内で一意である必要があります。<br>
           - `type`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `type`<br>
            **説明**: 有効な値は、Lifecycle です。<br>
   - `type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `type`<br>
    **説明**: リソースの種類。例: "Microsoft.Compute/virtualMachines" または "Microsoft.Storage/storageAccounts"<br>
## `minimum_tls_version`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.minimumTlsVersion`<br>
**説明**: ストレージへのリクエストで許可される最小の TLS バージョンを設定します。このプロパティのデフォルトの解釈は、TLS 1.0 です。<br>
## `name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `name`<br>
**説明**: リソースの名前<br>
## `network_acls`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.networkAcls`<br>
**説明**: ネットワークルールセット<br>
   - `bypass`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `bypass`<br>
    **説明**: Logging/Metrics/AzureServices のためにトラフィックをバイパスするかどうかを指定します。指定できる値は、Logging|Metrics|AzureServices の任意の組み合わせ (例: "Logging, Metrics") または None (これらのトラフィックのいずれもバイパスしない) です。<br>
   - `default_action`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `defaultAction`<br>
    **説明**: 他のルールに一致するものがない場合の、allow または deny のデフォルトアクションを指定します。<br>
   - `ip_rules`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `ipRules`<br>
    **説明**: IP ACL ルールを設定します<br>
       - `action`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `action`<br>
        **説明**: IP ACL ルールのアクション。<br>
       - `value`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `value`<br>
        **説明**: IP または IP 範囲を CIDR 形式で指定します。IPV4 アドレスのみ使用可能です。<br>
   - `virtual_network_rules`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `virtualNetworkRules`<br>
    **説明**: 仮想ネットワークのルールを設定します<br>
       - `action`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `action`<br>
        **説明**: 仮想ネットワークルールのアクション。<br>
       - `id`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `id`<br>
        **説明**: サブネットのリソース ID。例: /subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.Network/virtualNetworks/{vnetName}/subnets/{subnetName}.<br>
       - `state`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `state`<br>
        **説明**: 仮想ネットワークルールの状態を取得します。<br>
## `primary_endpoints`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.primaryEndpoints`<br>
**説明**: パブリック Blob、キュー、またはテーブルオブジェクトの取得を実行するために使用される URL を取得します。Standard_ZRS および Premium_LRS アカウントでは、Blob エンドポイントのみが返されることに注意してください。<br>
   - `blob`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `blob`<br>
    **説明**: Blob エンドポイントを取得します。<br>
   - `dfs`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `dfs`<br>
    **説明**: dfs エンドポイントを取得します。<br>
   - `file`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `file`<br>
    **説明**: ファイルエンドポイントを取得します。<br>
   - `queue`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `queue`<br>
    **説明**: キューエンドポイントを取得します。<br>
   - `table`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `table`<br>
    **説明**: テーブルエンドポイントを取得します。<br>
   - `web`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `web`<br>
    **説明**: Web エンドポイントを取得します。<br>
## `primary_location`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.primaryLocation`<br>
**説明**: ストレージアカウントのプライマリデータセンターの場所を取得します。<br>
## `private_endpoint_connections`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `properties.privateEndpointConnections`<br>
**説明**: 指定されたストレージアカウントに関連付けられたプライベートエンドポイント接続のリスト<br>
   - `id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `id`<br>
    **説明**: リソースの完全修飾型リソース ID。例 - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}<br>
   - `name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `name`<br>
    **説明**: リソースの名前<br>
   - `private_endpoint`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `properties.privateEndpoint`<br>
    **説明**: プライベートエンドポイントのリソース。<br>
       - `id`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `id`<br>
        **説明**: プライベートエンドポイントの ARM 識別子<br>
   - `private_link_service_connection_state`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `properties.privateLinkServiceConnectionState`<br>
    **説明**: サービスコンシューマーとプロバイダー間の接続状態に関する情報の集合体。<br>
       - `action_required`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `actionRequired`<br>
        **説明**: サービスプロバイダーの変更に伴い、コンシューマーの更新が必要であるかどうかを示すメッセージ。<br>
       - `description`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `description`<br>
        **説明**: 接続の承認/拒否の理由。<br>
       - `status`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `status`<br>
        **説明**: サービスの所有者によって、接続が承認/拒否/削除されたかどうかを示します。<br>
   - `provisioning_state`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.provisioningState`<br>
    **説明**: プライベートエンドポイント接続リソースのプロビジョニング状態。<br>
   - `type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `type`<br>
    **説明**: リソースの種類。例: "Microsoft.Compute/virtualMachines" または "Microsoft.Storage/storageAccounts"<br>
## `provisioning_state`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.provisioningState`<br>
**説明**: 操作の呼び出された時点のストレージアカウントのステータスを取得します。<br>
## `resource_group`
**タイプ**: `STRING`<br>
## `secondary_endpoints`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.secondaryEndpoints`<br>
**説明**: ストレージアカウントのセカンダリロケーションから、パブリック Blob、キュー、またはテーブルオブジェクトの取得を実行するために使用される URL を取得します。SKU 名が Standard_RAGRS の場合のみ利用可能です。<br>
   - `blob`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `blob`<br>
    **説明**: Blob エンドポイントを取得します。<br>
   - `dfs`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `dfs`<br>
    **説明**: dfs エンドポイントを取得します。<br>
   - `file`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `file`<br>
    **説明**: ファイルエンドポイントを取得します。<br>
   - `queue`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `queue`<br>
    **説明**: キューエンドポイントを取得します。<br>
   - `table`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `table`<br>
    **説明**: テーブルエンドポイントを取得します。<br>
   - `web`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `web`<br>
    **説明**: Web エンドポイントを取得します。<br>
## `secondary_location`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.secondaryLocation`<br>
**説明**: ストレージアカウントの、地理的に複製されたセカンダリのロケーションを取得します。accountType が Standard_GRS あるいは Standard_RAGRS の場合のみ使用可能です。<br>
## `sku`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `sku`<br>
**説明**: SKU を取得します。<br>
   - `name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `name`<br>
   - `tier`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `tier`<br>
## `status_of_primary`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.statusOfPrimary`<br>
**説明**: ストレージアカウントのプライマリロケーションが利用可能か否かを示すステータスを取得します。<br>
## `status_of_secondary`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.statusOfSecondary`<br>
**説明**: ストレージアカウントのセカンダリロケーションが利用可能か否かを示すステータスを取得します。SKU 名が Standard_GRS または Standard_RAGRS の場合のみ利用可能です。<br>
## `subscription_id`
**タイプ**: `STRING`<br>
## `subscription_name`
**タイプ**: `STRING`<br>
## `supports_https_traffic_only`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `properties.supportsHttpsTrafficOnly`<br>
**説明**: true に設定すると、ストレージサービスへの https のトラフィックのみを許可します。<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `type`<br>
**説明**: リソースの種類。例: "Microsoft.Compute/virtualMachines" または "Microsoft.Storage/storageAccounts"<br>