---
dependencies: []
disable_edit: true
---
# azure_managed_disk

## `bursting_enabled`
**Type**: `BOOLEAN`<br>
**Provider name**: `properties.burstingEnabled`<br>
**Description**: Set to true to enable bursting beyond the provisioned performance target of the disk. Bursting is disabled by default. Does not apply to Ultra disks.<br>
## `creation_data`
**Type**: `STRUCT`<br>
**Provider name**: `properties.creationData`<br>
**Description**: Disk source information. CreationData information cannot be changed after the disk has been created.<br>
   - `create_option`<br>
    **Type**: `STRING`<br>
    **Provider name**: `createOption`<br>
    **Description**: This enumerates the possible sources of a disk's creation.<br>
   - `gallery_image_reference`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `galleryImageReference`<br>
    **Description**: Required if creating from a Gallery Image. The id of the ImageDiskReference will be the ARM id of the shared galley image version from which to create a disk.<br>
       - `id`<br>
        **Type**: `STRING`<br>
        **Provider name**: `id`<br>
        **Description**: A relative uri containing either a Platform Image Repository or user image reference.<br>
       - `lun`<br>
        **Type**: `INT32`<br>
        **Provider name**: `lun`<br>
        **Description**: If the disk is created from an image's data disk, this is an index that indicates which of the data disks in the image to use. For OS disks, this field is null.<br>
   - `image_reference`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `imageReference`<br>
    **Description**: Disk source information.<br>
       - `id`<br>
        **Type**: `STRING`<br>
        **Provider name**: `id`<br>
        **Description**: A relative uri containing either a Platform Image Repository or user image reference.<br>
       - `lun`<br>
        **Type**: `INT32`<br>
        **Provider name**: `lun`<br>
        **Description**: If the disk is created from an image's data disk, this is an index that indicates which of the data disks in the image to use. For OS disks, this field is null.<br>
   - `logical_sector_size`<br>
    **Type**: `INT32`<br>
    **Provider name**: `logicalSectorSize`<br>
    **Description**: Logical sector size in bytes for Ultra disks. Supported values are 512 ad 4096. 4096 is the default.<br>
   - `source_resource_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `sourceResourceId`<br>
    **Description**: If createOption is Copy, this is the ARM id of the source snapshot or disk.<br>
   - `source_unique_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `sourceUniqueId`<br>
    **Description**: If this field is set, this is the unique id identifying the source of this resource.<br>
   - `source_uri`<br>
    **Type**: `STRING`<br>
    **Provider name**: `sourceUri`<br>
    **Description**: If createOption is Import, this is the URI of a blob to be imported into a managed disk.<br>
   - `storage_account_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `storageAccountId`<br>
    **Description**: Required if createOption is Import. The Azure Resource Manager identifier of the storage account containing the blob to import as a disk.<br>
   - `upload_size_bytes`<br>
    **Type**: `INT64`<br>
    **Provider name**: `uploadSizeBytes`<br>
    **Description**: If createOption is Upload, this is the size of the contents of the upload including the VHD footer. This value should be between 20972032 (20 MiB + 512 bytes for the VHD footer) and 35183298347520 bytes (32 TiB + 512 bytes for the VHD footer).<br>
## `disk_access_id`
**Type**: `STRING`<br>
**Provider name**: `properties.diskAccessId`<br>
**Description**: ARM id of the DiskAccess resource for using private endpoints on disks.<br>
## `disk_iops_read_only`
**Type**: `INT64`<br>
**Provider name**: `properties.diskIOPSReadOnly`<br>
**Description**: The total number of IOPS that will be allowed across all VMs mounting the shared disk as ReadOnly. One operation can transfer between 4k and 256k bytes.<br>
## `disk_iops_read_write`
**Type**: `INT64`<br>
**Provider name**: `properties.diskIOPSReadWrite`<br>
**Description**: The number of IOPS allowed for this disk; only settable for UltraSSD disks. One operation can transfer between 4k and 256k bytes.<br>
## `disk_mbps_read_only`
**Type**: `INT64`<br>
**Provider name**: `properties.diskMBpsReadOnly`<br>
**Description**: The total throughput (MBps) that will be allowed across all VMs mounting the shared disk as ReadOnly. MBps means millions of bytes per second - MB here uses the ISO notation, of powers of 10.<br>
## `disk_mbps_read_write`
**Type**: `INT64`<br>
**Provider name**: `properties.diskMBpsReadWrite`<br>
**Description**: The bandwidth allowed for this disk; only settable for UltraSSD disks. MBps means millions of bytes per second - MB here uses the ISO notation, of powers of 10.<br>
## `disk_size_bytes`
**Type**: `INT64`<br>
**Provider name**: `properties.diskSizeBytes`<br>
**Description**: The size of the disk in bytes. This field is read only.<br>
## `disk_state`
**Type**: `STRING`<br>
**Provider name**: `properties.diskState`<br>
**Description**: The state of the disk.<br>
## `encryption`
**Type**: `STRUCT`<br>
**Provider name**: `properties.encryption`<br>
**Description**: Encryption property can be used to encrypt data at rest with customer managed keys or platform managed keys.<br>
   - `disk_encryption_set_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `diskEncryptionSetId`<br>
    **Description**: ResourceId of the disk encryption set to use for enabling encryption at rest.<br>
   - `type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `type`<br>
## `encryption_settings_collection`
**Type**: `STRUCT`<br>
**Provider name**: `properties.encryptionSettingsCollection`<br>
**Description**: Encryption settings collection used for Azure Disk Encryption, can contain multiple encryption settings per disk or snapshot.<br>
   - `enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `enabled`<br>
    **Description**: Set this flag to true and provide DiskEncryptionKey and optional KeyEncryptionKey to enable encryption. Set this flag to false and remove DiskEncryptionKey and KeyEncryptionKey to disable encryption. If EncryptionSettings is null in the request object, the existing settings remain unchanged.<br>
   - `encryption_settings`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `encryptionSettings`<br>
    **Description**: A collection of encryption settings, one for each disk volume.<br>
       - `disk_encryption_key`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `diskEncryptionKey`<br>
        **Description**: Key Vault Secret Url and vault id of the disk encryption key<br>
           - `secret_url`<br>
            **Type**: `STRING`<br>
            **Provider name**: `secretUrl`<br>
            **Description**: Url pointing to a key or secret in KeyVault<br>
           - `source_vault`<br>
            **Type**: `STRUCT`<br>
            **Provider name**: `sourceVault`<br>
            **Description**: Resource id of the KeyVault containing the key or secret<br>
               - `id`<br>
                **Type**: `STRING`<br>
                **Provider name**: `id`<br>
                **Description**: Resource Id<br>
       - `key_encryption_key`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `keyEncryptionKey`<br>
        **Description**: Key Vault Key Url and vault id of the key encryption key. KeyEncryptionKey is optional and when provided is used to unwrap the disk encryption key.<br>
           - `key_url`<br>
            **Type**: `STRING`<br>
            **Provider name**: `keyUrl`<br>
            **Description**: Url pointing to a key or secret in KeyVault<br>
           - `source_vault`<br>
            **Type**: `STRUCT`<br>
            **Provider name**: `sourceVault`<br>
            **Description**: Resource id of the KeyVault containing the key or secret<br>
               - `id`<br>
                **Type**: `STRING`<br>
                **Provider name**: `id`<br>
                **Description**: Resource Id<br>
   - `encryption_settings_version`<br>
    **Type**: `STRING`<br>
    **Provider name**: `encryptionSettingsVersion`<br>
    **Description**: Describes what type of encryption is used for the disks. Once this field is set, it cannot be overwritten. '1.0' corresponds to Azure Disk Encryption with AAD app.'1.1' corresponds to Azure Disk Encryption.<br>
## `extended_location`
**Type**: `STRUCT`<br>
**Provider name**: `extendedLocation`<br>
**Description**: The extended location where the disk will be created. Extended location cannot be changed.<br>
   - `name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `name`<br>
    **Description**: The name of the extended location.<br>
   - `type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `type`<br>
    **Description**: The type of the extended location.<br>
## `hyper_v_generation`
**Type**: `STRING`<br>
**Provider name**: `properties.hyperVGeneration`<br>
**Description**: The hypervisor generation of the Virtual Machine. Applicable to OS disks only.<br>
## `id`
**Type**: `STRING`<br>
**Provider name**: `id`<br>
**Description**: Resource Id<br>
## `location`
**Type**: `STRING`<br>
**Provider name**: `location`<br>
**Description**: Resource location<br>
## `managed_by`
**Type**: `STRING`<br>
**Provider name**: `managedBy`<br>
**Description**: A relative URI containing the ID of the VM that has the disk attached.<br>
## `managed_by_extended`
**Type**: `UNORDERED_LIST_STRING`<br>
**Provider name**: `managedByExtended`<br>
**Description**: List of relative URIs containing the IDs of the VMs that have the disk attached. maxShares should be set to a value greater than one for disks to allow attaching them to multiple VMs.<br>
## `max_shares`
**Type**: `INT32`<br>
**Provider name**: `properties.maxShares`<br>
**Description**: The maximum number of VMs that can attach to the disk at the same time. Value greater than one indicates a disk that can be mounted on multiple VMs at the same time.<br>
## `name`
**Type**: `STRING`<br>
**Provider name**: `name`<br>
**Description**: Resource name<br>
## `network_access_policy`
**Type**: `STRING`<br>
**Provider name**: `properties.networkAccessPolicy`<br>
## `os_type`
**Type**: `STRING`<br>
**Provider name**: `properties.osType`<br>
**Description**: The Operating System type.<br>
## `property_updates_in_progress`
**Type**: `STRUCT`<br>
**Provider name**: `properties.propertyUpdatesInProgress`<br>
**Description**: Properties of the disk for which update is pending.<br>
   - `target_tier`<br>
    **Type**: `STRING`<br>
    **Provider name**: `targetTier`<br>
    **Description**: The target performance tier of the disk if a tier change operation is in progress.<br>
## `provisioning_state`
**Type**: `STRING`<br>
**Provider name**: `properties.provisioningState`<br>
**Description**: The disk provisioning state.<br>
## `purchase_plan`
**Type**: `STRUCT`<br>
**Provider name**: `properties.purchasePlan`<br>
**Description**: Purchase plan information for the the image from which the OS disk was created. E.g. - {name: 2019-Datacenter, publisher: MicrosoftWindowsServer, product: WindowsServer}<br>
   - `name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `name`<br>
    **Description**: The plan ID.<br>
   - `product`<br>
    **Type**: `STRING`<br>
    **Provider name**: `product`<br>
    **Description**: Specifies the product of the image from the marketplace. This is the same value as Offer under the imageReference element.<br>
   - `promotion_code`<br>
    **Type**: `STRING`<br>
    **Provider name**: `promotionCode`<br>
    **Description**: The Offer Promotion Code.<br>
   - `publisher`<br>
    **Type**: `STRING`<br>
    **Provider name**: `publisher`<br>
    **Description**: The publisher ID.<br>
## `resource_group`
**Type**: `STRING`<br>
## `security_profile`
**Type**: `STRUCT`<br>
**Provider name**: `properties.securityProfile`<br>
**Description**: Contains the security related information for the resource.<br>
   - `security_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `securityType`<br>
## `share_info`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `properties.shareInfo`<br>
**Description**: Details of the list of all VMs that have the disk attached. maxShares should be set to a value greater than one for disks to allow attaching them to multiple VMs.<br>
   - `vm_uri`<br>
    **Type**: `STRING`<br>
    **Provider name**: `vmUri`<br>
    **Description**: A relative URI containing the ID of the VM that has the disk attached.<br>
## `sku`
**Type**: `STRUCT`<br>
**Provider name**: `sku`<br>
   - `name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `name`<br>
    **Description**: The sku name.<br>
   - `tier`<br>
    **Type**: `STRING`<br>
    **Provider name**: `tier`<br>
    **Description**: The sku tier.<br>
## `subscription_id`
**Type**: `STRING`<br>
## `subscription_name`
**Type**: `STRING`<br>
## `supports_hibernation`
**Type**: `BOOLEAN`<br>
**Provider name**: `properties.supportsHibernation`<br>
**Description**: Indicates the OS on a disk supports hibernation.<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `tier`
**Type**: `STRING`<br>
**Provider name**: `properties.tier`<br>
**Description**: Performance tier of the disk (e.g, P4, S10) as described here: https://azure.microsoft.com/en-us/pricing/details/managed-disks/. Does not apply to Ultra disks.<br>
## `time_created`
**Type**: `STRING`<br>
**Provider name**: `properties.timeCreated`<br>
**Description**: The time when the disk was created.<br>
## `type`
**Type**: `STRING`<br>
**Provider name**: `type`<br>
**Description**: Resource type<br>
## `unique_id`
**Type**: `STRING`<br>
**Provider name**: `properties.uniqueId`<br>
**Description**: Unique Guid identifying the resource.<br>
## `zones`
**Type**: `UNORDERED_LIST_STRING`<br>
**Provider name**: `zones`<br>
**Description**: The Logical zone list for Disk.<br>
