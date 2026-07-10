---
dependencies: []
disable_edit: true
---
# aws_kms

## `account_id`
**タイプ**: `STRING`<br>
## `key_arn`
**タイプ**: `STRING`<br>
**プロバイダー名**: `KeyArn`<br>
**説明**: キーの ARN。<br>
## `key_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `KeyId`<br>
**説明**: キーの一意の識別子。<br>
## `key_metadata`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `KeyMetadata`<br>
   - `arn`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `Arn`<br>
    **説明**: KMS キーの Amazon Resource Name (ARN)。具体例については、<i>Amazon Web Services 全般のリファレンス</i>の「ARN の例」セクションで <a href="https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html#arn-syntax-kms">Key Management Service (KMS) をご覧ください。<br>
   - `aws_account_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `AWSAccountId`<br>
    **説明**: KMS キーを所有する Amazon Web Services アカウントの 12 桁のアカウント ID。<br>
   - `cloud_hsm_cluster_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `CloudHsmClusterId`<br>
    **説明**: KMS キー用のキーマテリアルを含む CloudHSM クラスターのクラスター ID。<a href="https://docs.aws.amazon.com/kms/latest/developerguide/custom-key-store-overview.html">カスタムキーストア</a>で KMS キーを作成する場合、KMS は関連付けられた CloudHSM クラスター内で KMS キー用のキーマテリアルを作成します。この値は、KMS キーがカスタムキーストアで作成される場合のみ表示されます。<br>
   - `creation_date`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `CreationDate`<br>
    **説明**: KMS キーが作成された日時。<br>
   - `custom_key_store_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `CustomKeyStoreId`<br>
    **説明**: KMS キーを格納している<a href="https://docs.aws.amazon.com/kms/latest/developerguide/custom-key-store-overview.html">カスタムキーストア</a>の一意の識別子。この値は、KMS キーがカスタムキーストアで作成される場合のみ表示されます。<br>
   - `customer_master_key_spec`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `CustomerMasterKeySpec`<br>
    **説明**: 代わりに <code>KeySpec</code> フィールドを使用します。<code>KeySpec</code> フィールド と<code>CustomerMasterKeySpec</code> フィールドには同じ値が設定されます。コードを記述する際は、<code>KeySpec</code> フィールドを使用することをお勧めします。ただし、互換性を損なうような変更を避けるため、KMS はどちらのフィールドもサポートしています。<br>
   - `deletion_date`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `DeletionDate`<br>
    **説明**: この日時を過ぎると、KMS がこの KMS キーを削除します。この値は、KMS キーの削除が予定されている場合のみ、すなわち <code>KeyState</code> が <code>PendingDeletion</code> に設定されている場合のみ表示されます。マルチリージョンキーのプライマリキーの削除が予定されていても、レプリカキーが依然として存在する場合は、キーの状態が <code>PendingReplicaDeletion</code> となり、その待機期間が <code>PendingDeletionWindowInDays</code> フィールドに表示されます。<br>
   - `description`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `Description`<br>
    **説明**: KMS キーの説明<br>
   - `enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `Enabled`<br>
    **説明**: KMS キーが有効かどうかを示します。<code>KeyState</code> が <code>Enabled</code> の場合、この値は true になり、そうでない場合は false になります。<br>
   - `encryption_algorithms`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `EncryptionAlgorithms`<br>
    **説明**: KMS キーがサポートしている暗号アルゴリズム。KMS 内ではこの KMS キーを別の暗号アルゴリズムと共に使用することはできません。この値は、KMS キーの <code>KeyUsage</code> が <code>ENCRYPT_DECRYPT</code> の場合のみ表示されます。<br>
   - `expiration_model`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ExpirationModel`<br>
    **説明**: KMS キーに有効期限があるかどうかを示します。この値は、<code>Origin</code> が <code>EXTERNAL</code> の場合のみ表示されます。それ以外の場合、この値は省略されます。<br>
   - `key_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `KeyId`<br>
    **説明**: KMS キーのグローバルな一意の識別子。<br>
   - `key_manager`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `KeyManager`<br>
    **説明**: KMS キーのキーマネージャー。Amazon Web Services アカウントの KMS キーは、 カスタマーマネージド型か Amazon Web Services マネージド型のいずれかです。その違いの詳細については、<i>Key Management Service デベロッパーガイド</i>の <a href="https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#kms_keys">KMS キー</a>の項を参照してください。<br>
   - `key_spec`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `KeySpec`<br>
    **説明**: KMS キーのキーマテリアルの種類についての説明。<br>
   - `key_state`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `KeyState`<br>
    **説明**: KMS キーの現在の状態。キーの状態が KMS キーの利用に及ぼす影響の詳細については、<i>Key Management Service デベロッパーガイド</i>の <a href="https://docs.aws.amazon.com/kms/latest/developerguide/key-state.html">KMS キーの状態</a>の項を参照してください。<br>
   - `key_usage`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `KeyUsage`<br>
    **説明**: KMS キーで使用できる<a href="https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#cryptographic-operations">暗号化オペレーション</a>。<br>
   - `mac_algorithms`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `MacAlgorithms`<br>
    **説明**: HMAC KMS キーがサポートしているメッセージ認証コード (MAC) アルゴリズム。この値は、KMS キーの <code>KeyUsage</code> が <code>GENERATE_VERIFY_MAC</code> の場合のみ表示されます。<br>
   - `multi_region`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `MultiRegion`<br>
    **説明**: KMS キーがマルチリージョンキー (<code>True</code>) かリージョナルキー (<code>False</code>) かを示します。この値は、マルチリージョンのプライマリキーとレプリカキーの場合は <code>True</code> に、リージョナル KMS キーの場合は <code>False</code> になります。マルチリージョンキーの詳細については、 <i>Key Management Service デベロッパーガイド</i>の <a href="https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html">KMS のマルチリージョンキー</a>の項を参照してください。<br>
   - `multi_region_configuration`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `MultiRegionConfiguration`<br>
    **説明**: 同じマルチリージョンキー内のプライマリキーとレプリカキーの一覧を示します。このフィールドは、<code>MultiRegion</code> フィールドの値が <code>True</code> の場合のみ表示されます。リストアップされた各 KMS キーの詳細を確認するには、DescribeKey オペレーションを使用します。<ul> <li>  <code>MultiRegionKeyType</code> は、KMS キーが <code>PRIMARY</code> キーか <code>REPLICA</code> キーかを示します。</li> <li>  <code>PrimaryKey</code> は、プライマリキーの ARN とリージョンを示します。現在の KMS キーがプライマリキーの場合はこのフィールドに表示されます。 </li> <li>  <code>ReplicaKeys</code> には、全てのレプリカキーの ARN とリージョンが表示されます。現在のKMS キーがレプリカキーの場合はこのフィールドに格納されます。</li> </ul>
       - `multi_region_key_type`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `MultiRegionKeyType`<br>
        **説明**: KMS キーが <code>PRIMARY</code> キーか <code>REPLICA</code> キーかを示します。<br>
       - `primary_key`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `PrimaryKey`<br>
        **説明**: プライマリキーの ARN とリージョンを表示します。現在の KMS  キーがプライマリキーの場合はこのフィールドに格納されます。<br>
           - `arn`<br>
            **タイプ**: `STRING`<br>
            **Provider name**: `Arn`<br>
            **説明**: マルチリージョンキーのプライマリーまたはレプリカキーの ARN が表示されます。<br>
           - `region`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `Region`<br>
            **説明**: マルチリージョンキーのプライマリキーまたはレプリカキーの Amazon Web Services リージョンが表示されます。<br>
       - `replica_keys`<br>
        **タイプ**: `UNORDERED_LIST_STRUCT`<br>
        **プロバイダー名**: `ReplicaKeys`<br>
        **説明**: すべてのレプリカキーの ARN とリージョンが表示されます。現在の KMS キーがレプリカキーの場合はこのフィールドに格納されます。<br>
           - `arn`<br>
            **タイプ**: `STRING`<br>
            **Provider name**: `Arn`<br>
            **説明**: マルチリージョンキーのプライマリキーまたはレプリカキーの ARN が表示されます。<br>
           - `region`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `Region`<br>
            **説明**: マルチリージョンキーのプライマリキーまたはレプリカキーの Amazon Web Services リージョンが表示されます。<br>
   - `origin`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `Origin`<br>
    **説明**: KMS キーのキーマテリアルのソース。キーマテリアルが KMS によって作成された場合、この値は <code>AWS_KMS</code> になります。キーマテリアルがインポートされた場合や、 KMS キーがキーマテリアルを持たない場合、この値は <code>EXTERNAL</code> になります。カスタムキーストアに関連付けられた CloudHSM クラスター内でキーマテリアルが作成された場合、この値は <code>AWS_CLOUDHSM</code> になります。<br>
   - `pending_deletion_window_in_days`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `PendingDeletionWindowInDays`<br>
    **説明**: マルチリージョンキーのプライマリキーが削除されるまでの待機期間。この待機期間は、最後のレプリカキーが削除された時点から始まります。この値は、KMS キーの <code>KeyState</code> が <code>PendingReplicaDeletion</code> の場合のみ表示され、これは、KMS キーがマルチリージョンキーのプライマリキーで、削除が予定されており、既存のレプリカキーが依然として存在することを意味します。シングルリージョンの KMS キーまたはマルチリージョンのレプリカキーの削除が予定されている場合は、その削除日が <code>DeletionDate</code> フィールドに表示されます。ただし、マルチリージョンキーのプライマリキーの削除が予定されている場合、そのすべてのレプリカキーが削除されるまで待機期間は開始されません。マルチリージョンキーの最後のレプリカキーが削除された時点で、削除予定のプライマリキーの <code>KeyState</code> が <code>PendingReplicaDeletion</code> から <code>PendingDeletion</code> に変わり、<code>DeletionDate</code> フィールドに削除日が表示されます。<br>
   - `signing_algorithms`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `SigningAlgorithms`<br>
    **説明**: KMS キーがサポートしている署名アルゴリズム。KMS 内ではこの KMS キーを他の署名アルゴリズムと共に使用することはできません。このフィールドは、KMS キーの <code>KeyUsage</code> が <code>SIGN_VERIFY</code> の場合のみ表示されます。<br>
   - `valid_to`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `ValidTo`<br>
    **説明**: インポートされたキーマテリアルの有効期限。キーマテリアルの有効期限が切れると、KMS によりキーマテリアルが削除され、KMS キーは利用できない状態になります。この値は、KMS キーの <code>Origin</code> が <code>EXTERNAL</code> で、<code>ExpirationModel</code> が <code>KEY_MATERIAL_EXPIRES</code> の場合のみ表示され、それ以外の場合は省略されます。<br>
## `key_rotation_enabled`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `KeyRotationEnabled`<br>
**説明**: キーのローテーションが有効かどうかを示すブール値。<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>