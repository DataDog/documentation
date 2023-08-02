---
dependencies: []
disable_edit: true
---
# aws_kms

## `account_id`
**Type**: `STRING`<br>
## `key_arn`
**Type**: `STRING`<br>
**Provider name**: `KeyArn`<br>
**Description**: ARN of the key.<br>
## `key_id`
**Type**: `STRING`<br>
**Provider name**: `KeyId`<br>
**Description**: Unique identifier of the key.<br>
## `key_metadata`
**Type**: `STRUCT`<br>
**Provider name**: `KeyMetadata`<br>
   - `arn`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Arn`<br>
    **Description**: The Amazon Resource Name (ARN) of the KMS key. For examples, see <a href="https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html#arn-syntax-kms">Key Management Service (KMS)</a> in the Example ARNs section of the <i>Amazon Web Services General Reference</i>.<br>
   - `aws_account_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `AWSAccountId`<br>
    **Description**: The twelve-digit account ID of the Amazon Web Services account that owns the KMS key.<br>
   - `cloud_hsm_cluster_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `CloudHsmClusterId`<br>
    **Description**: The cluster ID of the CloudHSM cluster that contains the key material for the KMS key. When you create a KMS key in a <a href="https://docs.aws.amazon.com/kms/latest/developerguide/custom-key-store-overview.html">custom key store</a>, KMS creates the key material for the KMS key in the associated CloudHSM cluster. This value is present only when the KMS key is created in a custom key store.<br>
   - `creation_date`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `CreationDate`<br>
    **Description**: The date and time when the KMS key was created.<br>
   - `custom_key_store_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `CustomKeyStoreId`<br>
    **Description**: A unique identifier for the <a href="https://docs.aws.amazon.com/kms/latest/developerguide/custom-key-store-overview.html">custom key store</a> that contains the KMS key. This value is present only when the KMS key is created in a custom key store.<br>
   - `customer_master_key_spec`<br>
    **Type**: `STRING`<br>
    **Provider name**: `CustomerMasterKeySpec`<br>
    **Description**: Instead, use the <code>KeySpec</code> field. The <code>KeySpec</code> and <code>CustomerMasterKeySpec</code> fields have the same value. We recommend that you use the <code>KeySpec</code> field in your code. However, to avoid breaking changes, KMS will support both fields.<br>
   - `deletion_date`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `DeletionDate`<br>
    **Description**: The date and time after which KMS deletes this KMS key. This value is present only when the KMS key is scheduled for deletion, that is, when its <code>KeyState</code> is <code>PendingDeletion</code>. When the primary key in a multi-Region key is scheduled for deletion but still has replica keys, its key state is <code>PendingReplicaDeletion</code> and the length of its waiting period is displayed in the <code>PendingDeletionWindowInDays</code> field.<br>
   - `description`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Description`<br>
    **Description**: The description of the KMS key.<br>
   - `enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `Enabled`<br>
    **Description**: Specifies whether the KMS key is enabled. When <code>KeyState</code> is <code>Enabled</code> this value is true, otherwise it is false.<br>
   - `encryption_algorithms`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `EncryptionAlgorithms`<br>
    **Description**: The encryption algorithms that the KMS key supports. You cannot use the KMS key with other encryption algorithms within KMS. This value is present only when the <code>KeyUsage</code> of the KMS key is <code>ENCRYPT_DECRYPT</code>.<br>
   - `expiration_model`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ExpirationModel`<br>
    **Description**: Specifies whether the KMS key's key material expires. This value is present only when <code>Origin</code> is <code>EXTERNAL</code>, otherwise this value is omitted.<br>
   - `key_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `KeyId`<br>
    **Description**: The globally unique identifier for the KMS key.<br>
   - `key_manager`<br>
    **Type**: `STRING`<br>
    **Provider name**: `KeyManager`<br>
    **Description**: The manager of the KMS key. KMS keys in your Amazon Web Services account are either customer managed or Amazon Web Services managed. For more information about the difference, see <a href="https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#kms_keys">KMS keys</a> in the <i>Key Management Service Developer Guide</i>.<br>
   - `key_spec`<br>
    **Type**: `STRING`<br>
    **Provider name**: `KeySpec`<br>
    **Description**: Describes the type of key material in the KMS key.<br>
   - `key_state`<br>
    **Type**: `STRING`<br>
    **Provider name**: `KeyState`<br>
    **Description**: The current status of the KMS key. For more information about how key state affects the use of a KMS key, see <a href="https://docs.aws.amazon.com/kms/latest/developerguide/key-state.html">Key states of KMS keys</a> in the <i>Key Management Service Developer Guide</i>.<br>
   - `key_usage`<br>
    **Type**: `STRING`<br>
    **Provider name**: `KeyUsage`<br>
    **Description**: The <a href="https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#cryptographic-operations">cryptographic operations</a> for which you can use the KMS key.<br>
   - `mac_algorithms`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `MacAlgorithms`<br>
    **Description**: The message authentication code (MAC) algorithm that the HMAC KMS key supports. This value is present only when the <code>KeyUsage</code> of the KMS key is <code>GENERATE_VERIFY_MAC</code>.<br>
   - `multi_region`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `MultiRegion`<br>
    **Description**: Indicates whether the KMS key is a multi-Region (<code>True</code>) or regional (<code>False</code>) key. This value is <code>True</code> for multi-Region primary and replica keys and <code>False</code> for regional KMS keys. For more information about multi-Region keys, see <a href="https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html">Multi-Region keys in KMS</a> in the <i>Key Management Service Developer Guide</i>.<br>
   - `multi_region_configuration`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `MultiRegionConfiguration`<br>
    **Description**: Lists the primary and replica keys in same multi-Region key. This field is present only when the value of the <code>MultiRegion</code> field is <code>True</code>. For more information about any listed KMS key, use the DescribeKey operation. <ul> <li>  <code>MultiRegionKeyType</code> indicates whether the KMS key is a <code>PRIMARY</code> or <code>REPLICA</code> key. </li> <li>  <code>PrimaryKey</code> displays the key ARN and Region of the primary key. This field displays the current KMS key if it is the primary key. </li> <li>  <code>ReplicaKeys</code> displays the key ARNs and Regions of all replica keys. This field includes the current KMS key if it is a replica key. </li> </ul>
       - `multi_region_key_type`<br>
        **Type**: `STRING`<br>
        **Provider name**: `MultiRegionKeyType`<br>
        **Description**: Indicates whether the KMS key is a <code>PRIMARY</code> or <code>REPLICA</code> key.<br>
       - `primary_key`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `PrimaryKey`<br>
        **Description**: Displays the key ARN and Region of the primary key. This field includes the current KMS key if it is the primary key.<br>
           - `arn`<br>
            **Type**: `STRING`<br>
            **Provider name**: `Arn`<br>
            **Description**: Displays the key ARN of a primary or replica key of a multi-Region key.<br>
           - `region`<br>
            **Type**: `STRING`<br>
            **Provider name**: `Region`<br>
            **Description**: Displays the Amazon Web Services Region of a primary or replica key in a multi-Region key.<br>
       - `replica_keys`<br>
        **Type**: `UNORDERED_LIST_STRUCT`<br>
        **Provider name**: `ReplicaKeys`<br>
        **Description**: displays the key ARNs and Regions of all replica keys. This field includes the current KMS key if it is a replica key.<br>
           - `arn`<br>
            **Type**: `STRING`<br>
            **Provider name**: `Arn`<br>
            **Description**: Displays the key ARN of a primary or replica key of a multi-Region key.<br>
           - `region`<br>
            **Type**: `STRING`<br>
            **Provider name**: `Region`<br>
            **Description**: Displays the Amazon Web Services Region of a primary or replica key in a multi-Region key.<br>
   - `origin`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Origin`<br>
    **Description**: The source of the key material for the KMS key. When this value is <code>AWS_KMS</code>, KMS created the key material. When this value is <code>EXTERNAL</code>, the key material was imported or the KMS key doesn't have any key material. When this value is <code>AWS_CLOUDHSM</code>, the key material was created in the CloudHSM cluster associated with a custom key store.<br>
   - `pending_deletion_window_in_days`<br>
    **Type**: `INT32`<br>
    **Provider name**: `PendingDeletionWindowInDays`<br>
    **Description**: The waiting period before the primary key in a multi-Region key is deleted. This waiting period begins when the last of its replica keys is deleted. This value is present only when the <code>KeyState</code> of the KMS key is <code>PendingReplicaDeletion</code>. That indicates that the KMS key is the primary key in a multi-Region key, it is scheduled for deletion, and it still has existing replica keys. When a single-Region KMS key or a multi-Region replica key is scheduled for deletion, its deletion date is displayed in the <code>DeletionDate</code> field. However, when the primary key in a multi-Region key is scheduled for deletion, its waiting period doesn't begin until all of its replica keys are deleted. This value displays that waiting period. When the last replica key in the multi-Region key is deleted, the <code>KeyState</code> of the scheduled primary key changes from <code>PendingReplicaDeletion</code> to <code>PendingDeletion</code> and the deletion date appears in the <code>DeletionDate</code> field.<br>
   - `signing_algorithms`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `SigningAlgorithms`<br>
    **Description**: The signing algorithms that the KMS key supports. You cannot use the KMS key with other signing algorithms within KMS. This field appears only when the <code>KeyUsage</code> of the KMS key is <code>SIGN_VERIFY</code>.<br>
   - `valid_to`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `ValidTo`<br>
    **Description**: The time at which the imported key material expires. When the key material expires, KMS deletes the key material and the KMS key becomes unusable. This value is present only for KMS keys whose <code>Origin</code> is <code>EXTERNAL</code> and whose <code>ExpirationModel</code> is <code>KEY_MATERIAL_EXPIRES</code>, otherwise this value is omitted.<br>
## `key_rotation_enabled`
**Type**: `BOOLEAN`<br>
**Provider name**: `KeyRotationEnabled`<br>
**Description**: A Boolean value that specifies whether key rotation is enabled.<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
