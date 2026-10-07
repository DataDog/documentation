---
dependencies: []
disable_edit: true
---
# azure_managed_disk

## `bursting_enabled`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `properties.burstingEnabled`<br>
**説明**: ディスクのプロビジョニングされたパフォーマンス目標を超えるバーストを有効にするには、true を設定します。デフォルトではバーストは無効になっています。Ultra ディスクには適用されません。<br>
## `creation_data`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.creationData`<br>
**説明**: ディスクのソース情報。ディスク作成後に CreationData 情報を変更することはできません。<br>
   - `create_option`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `createOption`<br>
    **説明**: これは、ディスクの作成元となりうるものを列挙します。<br>
   - `gallery_image_reference`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `galleryImageReference`<br>
    **説明**: ギャラリーイメージから作成する場合は必須。ImageDiskReference の id は、ディスク作成元の共有ギャラリーイメージのバージョンの ARM id になります。<br>
       - `id`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `id`<br>
        **説明**: Platform Image Repository またはユーザーイメージへの参照を含む相対 URI。<br>
       - `lun`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `lun`<br>
        **説明**: ディスクがイメージのデータディスクから作成される場合、これはイメージのどのデータディスクを使用するかを示すインデックスです。OS ディスクの場合、このフィールドは NULL です。<br>
   - `image_reference`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `imageReference`<br>
    **説明**: ディスクソース情報。<br>
       - `id`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `id`<br>
        **説明**: Platform Image Repository またはユーザーイメージへの参照を含む相対 URI。<br>
       - `lun`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `lun`<br>
        **説明**: ディスクがイメージのデータディスクから作成される場合、これはイメージのどのデータディスクを使用するかを示すインデックスです。OS ディスクの場合、このフィールドは NULL です。<br>
   - `logical_sector_size`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `logicalSectorSize`<br>
    **説明**: Ultra ディスクの論理セクターサイズ (バイト)。サポートされている値は、512 と 4096 です。4096 がデフォルトです。<br>
   - `source_resource_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `sourceResourceId`<br>
    **説明**: createOption が Copy の場合、ソーススナップショットまたはディスクの ARM id となります。<br>
   - `source_unique_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `sourceUniqueId`<br>
    **説明**: このフィールドが設定されている場合、これはこのリソースのソースを識別する一意の ID です。<br>
   - `source_uri`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `sourceUri`<br>
    **説明**: createOption が Import の場合、マネージドディスクにインポートする Blob の URI です。<br>
   - `storage_account_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `storageAccountId`<br>
    **説明**: createOption が Import の場合、必須。ディスクとしてインポートする blob を含むストレージ アカウントの Azure Resource Manager 識別子です。<br>
   - `upload_size_bytes`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `uploadSizeBytes`<br>
    **説明**: createOption が Upload の場合、VHD フッターを含むアップロードの内容のサイズ。この値は 20972032 (20 MiB + VHD フッター用 512 バイト) から 35183298347520 バイト (32 TiB + VHD フッター用 512 バイト) の間である必要があります。<br>
## `disk_access_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.diskAccessId`<br>
**説明**: ディスク上のプライベートエンドポイントを使用するための DiskAccess リソースの ARM id。<br>
## `disk_iops_read_only`
**タイプ**: `INT64`<br>
**プロバイダー名**: `properties.diskIOPSReadOnly`<br>
**説明**: 共有ディスクを ReadOnly でマウントしているすべての VM で許可される IOPS の総数。1 回の操作で 4k～256k バイトの転送が可能です。<br>
## `disk_iops_read_write`
**タイプ**: `INT64`<br>
**プロバイダー名**: `properties.diskIOPSReadWrite`<br>
**説明**: このディスクで許可される IOPS の数。UltraSSD ディスクに対してのみ設定可能です。1 回の操作で 4k〜256k バイトの転送が可能です。<br>
## `disk_mbps_read_only`
**タイプ**: `INT64`<br>
**プロバイダー名**: `properties.diskMBpsReadOnly`<br>
**説明**: 共有ディスクを ReadOnly でマウントするすべての VM で許可される総スループット (MBps)。MBps とは、1 秒間に数百万バイトという意味で、ここでの MB は 10 の累乗という ISO 表記を使用しています。<br>
## `disk_mbps_read_write`
**タイプ**: `INT64`<br>
**プロバイダー名**: `properties.diskMBpsReadWrite`<br>
**説明**: このディスクに許可される帯域幅。UltraSSD ディスクに対してのみ設定可能です。MBps とは、1 秒間に数百万バイトという意味で、ここでの MB は 10 の累乗という ISO 表記を使用しています。<br>
## `disk_size_bytes`
**タイプ**: `INT64`<br>
**プロバイダー名**: `properties.diskSizeBytes`<br>
**説明**: ディスクのサイズ (バイト単位)。このフィールドは読み取り専用です。<br>
## `disk_state`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.diskState`<br>
**説明**: ディスクの状態。<br>
## `encryption`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.encryption`<br>
**説明**: 暗号化プロパティは、顧客管理キーまたはプラットフォーム管理キーで静止データを暗号化するために使用することができます。<br>
   - `disk_encryption_set_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `diskEncryptionSetId`<br>
    **説明**: 静止時の暗号化を有効にするために使用するディスク暗号化セットの ResourceId。<br>
   - `type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `type`<br>
## `encryption_settings_collection`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.encryptionSettingsCollection`<br>
**説明**: Azure Disk Encryption に使用される暗号化設定コレクションで、ディスクまたはスナップショットごとに複数の暗号化設定を含めることができます。<br>
   - `enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `enabled`<br>
    **説明**: このフラグを true に設定し、DiskEncryptionKey およびオプションの KeyEncryptionKey を指定すると、暗号化が有効になります。このフラグを false に設定し、DiskEncryptionKey および KeyEncryptionKey を削除すると、暗号化が無効になります。リクエストオブジェクトの EncryptionSettings が NULL の場合、既存の設定は変更されません。<br>
   - `encryption_settings`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `encryptionSettings`<br>
    **説明**: 暗号化設定のコレクションで、各ディスクボリュームに 1 つずつ設定されています。<br>
       - `disk_encryption_key`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `diskEncryptionKey`<br>
        **説明**: Key Vault Secret ディスク暗号化キーの URL と Vault ID<br>
           - `secret_url`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `secretUrl`<br>
            **説明**: KeyVault のキーまたはシークレットを指し示す URL<br>
           - `source_vault`<br>
            **タイプ**: `STRUCT`<br>
            **プロバイダー名**: `sourceVault`<br>
            **説明**: キーまたはシークレットを含む KeyVault のリソース ID<br>
               - `id`<br>
                **タイプ**: `STRING`<br>
                **プロバイダー名**: `id`<br>
                **Description**: Resource Id<br>
       - `key_encryption_key`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `keyEncryptionKey`<br>
        **説明**: Key Vault Key 暗号化キーの URL と Vault ID。KeyEncryptionKey はオプションで、指定するとディスク暗号化キーのアンラップに使用されます。<br>
           - `key_url`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `keyUrl`<br>
            **説明**: KeyVault のキーまたはシークレットを指し示す URL<br>
           - `source_vault`<br>
            **タイプ**: `STRUCT`<br>
            **プロバイダー名**: `sourceVault`<br>
            **説明**: キーまたはシークレットを含む KeyVault のリソース ID<br>
               - `id`<br>
                **タイプ**: `STRING`<br>
                **プロバイダー名**: `id`<br>
                **Description**: Resource Id<br>
   - `encryption_settings_version`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `encryptionSettingsVersion`<br>
    **説明**: ディスクにどのような種類の暗号化を使用するかを記述します。このフィールドを一度設定すると、上書きできません。’1.0' は AAD アプリによる Azure Disk Encryption に対応し、’1.1' は Azure Disk Encryption に対応します。<br>
## `extended_location`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `extendedLocation`<br>
**説明**: ディスクが作成される拡張ロケーション。拡張ロケーションは変更できません。<br>
   - `name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `name`<br>
    **説明**: 拡張ロケーションの名前。<br>
   - `type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `type`<br>
    **説明**: 拡張ロケーションのタイプ。<br>
## `hyper_v_generation`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.hyperVGeneration`<br>
**説明**: 仮想マシンのハイパーバイザーの世代。OS ディスクにのみ適用されます。<br>
## `id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `id`<br>
**Description**: Resource Id<br>
## `location`
**タイプ**: `STRING`<br>
**プロバイダー名**: `location`<br>
**説明**: リソースロケーション<br>
## `managed_by`
**タイプ**: `STRING`<br>
**プロバイダー名**: `managedBy`<br>
**説明**: ディスクをアタッチしている VM の ID を含む相対 URI。<br>
## `managed_by_extended`
**タイプ**: `UNORDERED_LIST_STRING`<br>
**プロバイダー名**: `managedByExtended`<br>
**説明**: ディスクがアタッチされている VM の ID を含む相対 URI のリスト。複数の VM にアタッチできるように、ディスクの maxShares は 1 より大きい値に設定する必要があります。<br>
## `max_shares`
**タイプ**: `INT32`<br>
**プロバイダー名**: `properties.maxShares`<br>
**説明**: ディスクに同時にアタッチできる VM の最大数。1 より大きい値は、複数の VM に同時にマウント可能なディスクであることを示します。<br>
## `name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `name`<br>
**Description**: Resource name<br>
## `network_access_policy`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.networkAccessPolicy`<br>
## `os_type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.osType`<br>
**説明**: オペレーティングシステムのタイプ。<br>
## `property_updates_in_progress`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.propertyUpdatesInProgress`<br>
**説明**: 更新が保留されているディスクのプロパティ。<br>
   - `target_tier`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `targetTier`<br>
    **説明**: 階層変更操作が進行中の場合、ディスクのターゲットパフォーマンス階層。<br>
## `provisioning_state`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.provisioningState`<br>
**説明**: ディスクのプロビジョニング状態。<br>
## `purchase_plan`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.purchasePlan`<br>
**説明**: OS ディスクを作成したイメージの購入プラン情報。例: - {name: 2019-Datacenter, publisher: MicrosoftWindowsServer, product: WindowsServer}<br>
   - `name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `name`<br>
    **説明**: プラン ID。<br>
   - `product`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `product`<br>
    **説明**: マーケットプレイスからイメージの製品を指定します。imageReference 要素の下にある Offer と同じ値です。<br>
   - `promotion_code`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `promotionCode`<br>
    **説明**: 特典のプロモーションコード。<br>
   - `publisher`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `publisher`<br>
    **説明**: パブリッシャー ID。<br>
## `resource_group`
**タイプ**: `STRING`<br>
## `security_profile`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.securityProfile`<br>
**説明**: リソースのセキュリティ関連情報が格納されています。<br>
   - `security_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `securityType`<br>
## `share_info`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `properties.shareInfo`<br>
**説明**: ディスクがアタッチされているすべての VM のリストの詳細。複数の VM にアタッチできるように、ディスクの maxShares は 1 より大きい値に設定する必要があります。<br>
   - `vm_uri`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `vmUri`<br>
    **説明**: ディスクをアタッチしている VM の ID を含む相対 URI。<br>
## `sku`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `sku`<br>
   - `name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `name`<br>
    **説明**: sku 名。<br>
   - `tier`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `tier`<br>
    **説明**: sku 階層。<br>
## `subscription_id`
**タイプ**: `STRING`<br>
## `subscription_name`
**タイプ**: `STRING`<br>
## `supports_hibernation`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `properties.supportsHibernation`<br>
**説明**: ディスク上の OS がハイバネーションをサポートしていることを示します。<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `tier`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.tier`<br>
**説明**: ここに記載されているディスクのパフォーマンス階層 (例: P4、S10): https://azure.microsoft.com/en-us/pricing/details/managed-disks/ Ultra ディスクには適用されません。<br>
## `time_created`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.timeCreated`<br>
**説明**: ディスクが作成された時刻。<br>
## `type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `type`<br>
**Description**: Resource type<br>
## `unique_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.uniqueId`<br>
**説明**: リソースを識別する一意の Guid。<br>
## `zones`
**タイプ**: `UNORDERED_LIST_STRING`<br>
**プロバイダー名**: `zones`<br>
**説明**: ディスクの論理ゾーンのリスト。<br>