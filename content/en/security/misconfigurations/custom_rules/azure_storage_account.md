---
dependencies: []
disable_edit: true
---
# azure_storage_account

## `access_tier`
**Type**: `STRING`<br>
**Provider name**: `properties.accessTier`<br>
**Description**: Required for storage accounts where kind = BlobStorage. The access tier used for billing.<br>
## `allow_blob_public_access`
**Type**: `BOOLEAN`<br>
**Provider name**: `properties.allowBlobPublicAccess`<br>
**Description**: Allow or disallow public access to all blobs or containers in the storage account. The default interpretation is true for this property.<br>
## `allow_shared_key_access`
**Type**: `BOOLEAN`<br>
**Provider name**: `properties.allowSharedKeyAccess`<br>
**Description**: Indicates whether the storage account permits requests to be authorized with the account access key via Shared Key. If false, then all requests, including shared access signatures, must be authorized with Azure Active Directory (Azure AD). The default value is null, which is equivalent to true.<br>
## `blob_services`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `BlobServiceProperties`<br>
   - `change_feed`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `properties.changeFeed`<br>
    **Description**: The blob service properties for change feed events.<br>
       - `enabled`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `enabled`<br>
        **Description**: Indicates whether change feed event logging is enabled for the Blob service.<br>
       - `retention_in_days`<br>
        **Type**: `INT32`<br>
        **Provider name**: `retentionInDays`<br>
        **Description**: Indicates the duration of changeFeed retention in days. Minimum value is 1 day and maximum value is 146000 days (400 years). A null value indicates an infinite retention of the change feed.<br>
   - `container_delete_retention_policy`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `properties.containerDeleteRetentionPolicy`<br>
    **Description**: The blob service properties for container soft delete.<br>
       - `days`<br>
        **Type**: `INT32`<br>
        **Provider name**: `days`<br>
        **Description**: Indicates the number of days that the deleted item should be retained. The minimum specified value can be 1 and the maximum value can be 365.<br>
       - `enabled`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `enabled`<br>
        **Description**: Indicates whether DeleteRetentionPolicy is enabled.<br>
   - `cors`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `properties.cors`<br>
    **Description**: Specifies CORS rules for the Blob service. You can include up to five CorsRule elements in the request. If no CorsRule elements are included in the request body, all CORS rules will be deleted, and CORS will be disabled for the Blob service.<br>
       - `cors_rules`<br>
        **Type**: `UNORDERED_LIST_STRUCT`<br>
        **Provider name**: `corsRules`<br>
        **Description**: The List of CORS rules. You can include up to five CorsRule elements in the request.<br>
           - `allowed_headers`<br>
            **Type**: `UNORDERED_LIST_STRING`<br>
            **Provider name**: `allowedHeaders`<br>
            **Description**: Required if CorsRule element is present. A list of headers allowed to be part of the cross-origin request.<br>
           - `allowed_methods`<br>
            **Type**: `UNORDERED_LIST_STRING`<br>
            **Provider name**: `allowedMethods`<br>
            **Description**: Required if CorsRule element is present. A list of HTTP methods that are allowed to be executed by the origin.<br>
           - `allowed_origins`<br>
            **Type**: `UNORDERED_LIST_STRING`<br>
            **Provider name**: `allowedOrigins`<br>
            **Description**: Required if CorsRule element is present. A list of origin domains that will be allowed via CORS, or "*" to allow all domains<br>
           - `exposed_headers`<br>
            **Type**: `UNORDERED_LIST_STRING`<br>
            **Provider name**: `exposedHeaders`<br>
            **Description**: Required if CorsRule element is present. A list of response headers to expose to CORS clients.<br>
           - `max_age_in_seconds`<br>
            **Type**: `INT32`<br>
            **Provider name**: `maxAgeInSeconds`<br>
            **Description**: Required if CorsRule element is present. The number of seconds that the client/browser should cache a preflight response.<br>
   - `delete_retention_policy`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `properties.deleteRetentionPolicy`<br>
    **Description**: The blob service properties for blob soft delete.<br>
       - `days`<br>
        **Type**: `INT32`<br>
        **Provider name**: `days`<br>
        **Description**: Indicates the number of days that the deleted item should be retained. The minimum specified value can be 1 and the maximum value can be 365.<br>
       - `enabled`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `enabled`<br>
        **Description**: Indicates whether DeleteRetentionPolicy is enabled.<br>
   - `id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `id`<br>
    **Description**: Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}<br>
   - `is_versioning_enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `properties.isVersioningEnabled`<br>
    **Description**: Versioning is enabled if set to true.<br>
   - `name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `name`<br>
    **Description**: The name of the resource<br>
   - `restore_policy`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `properties.restorePolicy`<br>
    **Description**: The blob service properties for blob restore policy.<br>
       - `days`<br>
        **Type**: `INT32`<br>
        **Provider name**: `days`<br>
        **Description**: how long this blob can be restored. It should be great than zero and less than DeleteRetentionPolicy.days.<br>
       - `enabled`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `enabled`<br>
        **Description**: Blob restore is enabled if set to true.<br>
       - `last_enabled_time`<br>
        **Type**: `STRING`<br>
        **Provider name**: `lastEnabledTime`<br>
        **Description**: Deprecated in favor of minRestoreTime property.<br>
       - `min_restore_time`<br>
        **Type**: `STRING`<br>
        **Provider name**: `minRestoreTime`<br>
        **Description**: Returns the minimum date and time that the restore can be started.<br>
   - `sku`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `sku`<br>
    **Description**: Sku name and tier.<br>
       - `name`<br>
        **Type**: `STRING`<br>
        **Provider name**: `name`<br>
       - `tier`<br>
        **Type**: `STRING`<br>
        **Provider name**: `tier`<br>
   - `type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `type`<br>
    **Description**: The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts"<br>
## `creation_time`
**Type**: `STRING`<br>
**Provider name**: `properties.creationTime`<br>
**Description**: Gets the creation date and time of the storage account in UTC.<br>
## `encryption`
**Type**: `STRUCT`<br>
**Provider name**: `properties.encryption`<br>
**Description**: Gets the encryption settings on the account. If unspecified, the account is unencrypted.<br>
   - `key_source`<br>
    **Type**: `STRING`<br>
    **Provider name**: `keySource`<br>
    **Description**: The encryption keySource (provider). Possible values (case-insensitive):  Microsoft.Storage, Microsoft.Keyvault<br>
   - `keyvaultproperties`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `keyvaultproperties`<br>
    **Description**: Properties provided by key vault.<br>
       - `current_versioned_key_identifier`<br>
        **Type**: `STRING`<br>
        **Provider name**: `currentVersionedKeyIdentifier`<br>
        **Description**: The object identifier of the current versioned Key Vault Key in use.<br>
       - `keyname`<br>
        **Type**: `STRING`<br>
        **Provider name**: `keyname`<br>
        **Description**: The name of KeyVault key.<br>
       - `keyvaulturi`<br>
        **Type**: `STRING`<br>
        **Provider name**: `keyvaulturi`<br>
        **Description**: The Uri of KeyVault.<br>
       - `keyversion`<br>
        **Type**: `STRING`<br>
        **Provider name**: `keyversion`<br>
        **Description**: The version of KeyVault key.<br>
       - `last_key_rotation_timestamp`<br>
        **Type**: `STRING`<br>
        **Provider name**: `lastKeyRotationTimestamp`<br>
        **Description**: Timestamp of last rotation of the Key Vault Key.<br>
   - `services`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `services`<br>
    **Description**: List of services which support encryption.<br>
       - `blob`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `blob`<br>
        **Description**: The encryption function of the blob storage service.<br>
           - `enabled`<br>
            **Type**: `BOOLEAN`<br>
            **Provider name**: `enabled`<br>
            **Description**: A boolean indicating whether or not the service encrypts the data as it is stored.<br>
           - `key_type`<br>
            **Type**: `STRING`<br>
            **Provider name**: `keyType`<br>
            **Description**: Encryption key type to be used for the encryption service. 'Account' key type implies that an account-scoped encryption key will be used. 'Service' key type implies that a default service key is used.<br>
           - `last_enabled_time`<br>
            **Type**: `STRING`<br>
            **Provider name**: `lastEnabledTime`<br>
            **Description**: Gets a rough estimate of the date/time when the encryption was last enabled by the user. Only returned when encryption is enabled. There might be some unencrypted blobs which were written after this time, as it is just a rough estimate.<br>
       - `file`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `file`<br>
        **Description**: The encryption function of the file storage service.<br>
           - `enabled`<br>
            **Type**: `BOOLEAN`<br>
            **Provider name**: `enabled`<br>
            **Description**: A boolean indicating whether or not the service encrypts the data as it is stored.<br>
           - `key_type`<br>
            **Type**: `STRING`<br>
            **Provider name**: `keyType`<br>
            **Description**: Encryption key type to be used for the encryption service. 'Account' key type implies that an account-scoped encryption key will be used. 'Service' key type implies that a default service key is used.<br>
           - `last_enabled_time`<br>
            **Type**: `STRING`<br>
            **Provider name**: `lastEnabledTime`<br>
            **Description**: Gets a rough estimate of the date/time when the encryption was last enabled by the user. Only returned when encryption is enabled. There might be some unencrypted blobs which were written after this time, as it is just a rough estimate.<br>
## `id`
**Type**: `STRING`<br>
**Provider name**: `id`<br>
**Description**: Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}<br>
## `identity`
**Type**: `STRUCT`<br>
**Provider name**: `identity`<br>
**Description**: The identity of the resource.<br>
   - `principal_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `principalId`<br>
    **Description**: The principal ID of resource identity.<br>
   - `tenant_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `tenantId`<br>
    **Description**: The tenant ID of resource.<br>
   - `type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `type`<br>
    **Description**: The identity type.<br>
## `kind`
**Type**: `STRING`<br>
**Provider name**: `kind`<br>
**Description**: Gets the Kind.<br>
## `large_file_shares_state`
**Type**: `STRING`<br>
**Provider name**: `properties.largeFileSharesState`<br>
**Description**: Allow large file shares if sets to Enabled. It cannot be disabled once it is enabled.<br>
## `location`
**Type**: `STRING`<br>
**Provider name**: `location`<br>
**Description**: The geo-location where the resource lives<br>
## `management_policy`
**Type**: `STRUCT`<br>
**Provider name**: `ManagementPolicy`<br>
   - `id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `id`<br>
    **Description**: Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}<br>
   - `last_modified_time`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.lastModifiedTime`<br>
    **Description**: Returns the date and time the ManagementPolicies was last modified.<br>
   - `name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `name`<br>
    **Description**: The name of the resource<br>
   - `policy`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `properties.policy`<br>
    **Description**: The Storage Account ManagementPolicy, in JSON format. See more details in: https://docs.microsoft.com/en-us/azure/storage/common/storage-lifecycle-managment-concepts.<br>
       - `rules`<br>
        **Type**: `UNORDERED_LIST_STRUCT`<br>
        **Provider name**: `rules`<br>
        **Description**: The Storage Account ManagementPolicies Rules. See more details in: https://docs.microsoft.com/en-us/azure/storage/common/storage-lifecycle-managment-concepts.<br>
           - `definition`<br>
            **Type**: `STRUCT`<br>
            **Provider name**: `definition`<br>
            **Description**: An object that defines the Lifecycle rule.<br>
               - `actions`<br>
                **Type**: `STRUCT`<br>
                **Provider name**: `actions`<br>
                **Description**: An object that defines the action set.<br>
                   - `base_blob`<br>
                    **Type**: `STRUCT`<br>
                    **Provider name**: `baseBlob`<br>
                    **Description**: The management policy action for base blob<br>
                       - `delete`<br>
                        **Type**: `STRUCT`<br>
                        **Provider name**: `delete`<br>
                        **Description**: The function to delete the blob<br>
                           - `days_after_last_access_time_greater_than`<br>
                            **Type**: `DOUBLE`<br>
                            **Provider name**: `daysAfterLastAccessTimeGreaterThan`<br>
                            **Description**: Value indicating the age in days after last blob access. This property can only be used in conjunction with last access time tracking policy<br>
                           - `days_after_modification_greater_than`<br>
                            **Type**: `DOUBLE`<br>
                            **Provider name**: `daysAfterModificationGreaterThan`<br>
                            **Description**: Value indicating the age in days after last modification<br>
                       - `tier_to_archive`<br>
                        **Type**: `STRUCT`<br>
                        **Provider name**: `tierToArchive`<br>
                        **Description**: The function to tier blobs to archive storage. Support blobs currently at Hot or Cool tier<br>
                           - `days_after_last_access_time_greater_than`<br>
                            **Type**: `DOUBLE`<br>
                            **Provider name**: `daysAfterLastAccessTimeGreaterThan`<br>
                            **Description**: Value indicating the age in days after last blob access. This property can only be used in conjunction with last access time tracking policy<br>
                           - `days_after_modification_greater_than`<br>
                            **Type**: `DOUBLE`<br>
                            **Provider name**: `daysAfterModificationGreaterThan`<br>
                            **Description**: Value indicating the age in days after last modification<br>
                       - `tier_to_cool`<br>
                        **Type**: `STRUCT`<br>
                        **Provider name**: `tierToCool`<br>
                        **Description**: The function to tier blobs to cool storage. Support blobs currently at Hot tier<br>
                           - `days_after_last_access_time_greater_than`<br>
                            **Type**: `DOUBLE`<br>
                            **Provider name**: `daysAfterLastAccessTimeGreaterThan`<br>
                            **Description**: Value indicating the age in days after last blob access. This property can only be used in conjunction with last access time tracking policy<br>
                           - `days_after_modification_greater_than`<br>
                            **Type**: `DOUBLE`<br>
                            **Provider name**: `daysAfterModificationGreaterThan`<br>
                            **Description**: Value indicating the age in days after last modification<br>
                   - `snapshot`<br>
                    **Type**: `STRUCT`<br>
                    **Provider name**: `snapshot`<br>
                    **Description**: The management policy action for snapshot<br>
                       - `delete`<br>
                        **Type**: `STRUCT`<br>
                        **Provider name**: `delete`<br>
                        **Description**: The function to delete the blob snapshot<br>
                           - `days_after_creation_greater_than`<br>
                            **Type**: `DOUBLE`<br>
                            **Provider name**: `daysAfterCreationGreaterThan`<br>
                            **Description**: Value indicating the age in days after creation<br>
                       - `tier_to_archive`<br>
                        **Type**: `STRUCT`<br>
                        **Provider name**: `tierToArchive`<br>
                        **Description**: The function to tier blob snapshot to archive storage. Support blob snapshot currently at Hot or Cool tier<br>
                           - `days_after_creation_greater_than`<br>
                            **Type**: `DOUBLE`<br>
                            **Provider name**: `daysAfterCreationGreaterThan`<br>
                            **Description**: Value indicating the age in days after creation<br>
                       - `tier_to_cool`<br>
                        **Type**: `STRUCT`<br>
                        **Provider name**: `tierToCool`<br>
                        **Description**: The function to tier blob snapshot to cool storage. Support blob snapshot currently at Hot tier<br>
                           - `days_after_creation_greater_than`<br>
                            **Type**: `DOUBLE`<br>
                            **Provider name**: `daysAfterCreationGreaterThan`<br>
                            **Description**: Value indicating the age in days after creation<br>
                   - `version`<br>
                    **Type**: `STRUCT`<br>
                    **Provider name**: `version`<br>
                    **Description**: The management policy action for version<br>
                       - `delete`<br>
                        **Type**: `STRUCT`<br>
                        **Provider name**: `delete`<br>
                        **Description**: The function to delete the blob version<br>
                           - `days_after_creation_greater_than`<br>
                            **Type**: `DOUBLE`<br>
                            **Provider name**: `daysAfterCreationGreaterThan`<br>
                            **Description**: Value indicating the age in days after creation<br>
                       - `tier_to_archive`<br>
                        **Type**: `STRUCT`<br>
                        **Provider name**: `tierToArchive`<br>
                        **Description**: The function to tier blob version to archive storage. Support blob version currently at Hot or Cool tier<br>
                           - `days_after_creation_greater_than`<br>
                            **Type**: `DOUBLE`<br>
                            **Provider name**: `daysAfterCreationGreaterThan`<br>
                            **Description**: Value indicating the age in days after creation<br>
                       - `tier_to_cool`<br>
                        **Type**: `STRUCT`<br>
                        **Provider name**: `tierToCool`<br>
                        **Description**: The function to tier blob version to cool storage. Support blob version currently at Hot tier<br>
                           - `days_after_creation_greater_than`<br>
                            **Type**: `DOUBLE`<br>
                            **Provider name**: `daysAfterCreationGreaterThan`<br>
                            **Description**: Value indicating the age in days after creation<br>
               - `filters`<br>
                **Type**: `STRUCT`<br>
                **Provider name**: `filters`<br>
                **Description**: An object that defines the filter set.<br>
                   - `blob_types`<br>
                    **Type**: `UNORDERED_LIST_STRING`<br>
                    **Provider name**: `blobTypes`<br>
                    **Description**: An array of predefined enum values. Currently blockBlob supports all tiering and delete actions. Only delete actions are supported for appendBlob.<br>
                   - `prefix_match`<br>
                    **Type**: `UNORDERED_LIST_STRING`<br>
                    **Provider name**: `prefixMatch`<br>
                    **Description**: An array of strings for prefixes to be match.<br>
           - `enabled`<br>
            **Type**: `BOOLEAN`<br>
            **Provider name**: `enabled`<br>
            **Description**: Rule is enabled if set to true.<br>
           - `name`<br>
            **Type**: `STRING`<br>
            **Provider name**: `name`<br>
            **Description**: A rule name can contain any combination of alpha numeric characters. Rule name is case-sensitive. It must be unique within a policy.<br>
           - `type`<br>
            **Type**: `STRING`<br>
            **Provider name**: `type`<br>
            **Description**: The valid value is Lifecycle<br>
   - `type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `type`<br>
    **Description**: The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts"<br>
## `minimum_tls_version`
**Type**: `STRING`<br>
**Provider name**: `properties.minimumTlsVersion`<br>
**Description**: Set the minimum TLS version to be permitted on requests to storage. The default interpretation is TLS 1.0 for this property.<br>
## `name`
**Type**: `STRING`<br>
**Provider name**: `name`<br>
**Description**: The name of the resource<br>
## `network_acls`
**Type**: `STRUCT`<br>
**Provider name**: `properties.networkAcls`<br>
**Description**: Network rule set<br>
   - `bypass`<br>
    **Type**: `STRING`<br>
    **Provider name**: `bypass`<br>
    **Description**: Specifies whether traffic is bypassed for Logging/Metrics/AzureServices. Possible values are any combination of Logging|Metrics|AzureServices (For example, "Logging, Metrics"), or None to bypass none of those traffics.<br>
   - `default_action`<br>
    **Type**: `STRING`<br>
    **Provider name**: `defaultAction`<br>
    **Description**: Specifies the default action of allow or deny when no other rules match.<br>
   - `ip_rules`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `ipRules`<br>
    **Description**: Sets the IP ACL rules<br>
       - `action`<br>
        **Type**: `STRING`<br>
        **Provider name**: `action`<br>
        **Description**: The action of IP ACL rule.<br>
       - `value`<br>
        **Type**: `STRING`<br>
        **Provider name**: `value`<br>
        **Description**: Specifies the IP or IP range in CIDR format. Only IPV4 address is allowed.<br>
   - `virtual_network_rules`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `virtualNetworkRules`<br>
    **Description**: Sets the virtual network rules<br>
       - `action`<br>
        **Type**: `STRING`<br>
        **Provider name**: `action`<br>
        **Description**: The action of virtual network rule.<br>
       - `id`<br>
        **Type**: `STRING`<br>
        **Provider name**: `id`<br>
        **Description**: Resource ID of a subnet, for example: /subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.Network/virtualNetworks/{vnetName}/subnets/{subnetName}.<br>
       - `state`<br>
        **Type**: `STRING`<br>
        **Provider name**: `state`<br>
        **Description**: Gets the state of virtual network rule.<br>
## `primary_endpoints`
**Type**: `STRUCT`<br>
**Provider name**: `properties.primaryEndpoints`<br>
**Description**: Gets the URLs that are used to perform a retrieval of a public blob, queue, or table object. Note that Standard_ZRS and Premium_LRS accounts only return the blob endpoint.<br>
   - `blob`<br>
    **Type**: `STRING`<br>
    **Provider name**: `blob`<br>
    **Description**: Gets the blob endpoint.<br>
   - `dfs`<br>
    **Type**: `STRING`<br>
    **Provider name**: `dfs`<br>
    **Description**: Gets the dfs endpoint.<br>
   - `file`<br>
    **Type**: `STRING`<br>
    **Provider name**: `file`<br>
    **Description**: Gets the file endpoint.<br>
   - `queue`<br>
    **Type**: `STRING`<br>
    **Provider name**: `queue`<br>
    **Description**: Gets the queue endpoint.<br>
   - `table`<br>
    **Type**: `STRING`<br>
    **Provider name**: `table`<br>
    **Description**: Gets the table endpoint.<br>
   - `web`<br>
    **Type**: `STRING`<br>
    **Provider name**: `web`<br>
    **Description**: Gets the web endpoint.<br>
## `primary_location`
**Type**: `STRING`<br>
**Provider name**: `properties.primaryLocation`<br>
**Description**: Gets the location of the primary data center for the storage account.<br>
## `private_endpoint_connections`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `properties.privateEndpointConnections`<br>
**Description**: List of private endpoint connection associated with the specified storage account<br>
   - `id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `id`<br>
    **Description**: Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}<br>
   - `name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `name`<br>
    **Description**: The name of the resource<br>
   - `private_endpoint`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `properties.privateEndpoint`<br>
    **Description**: The resource of private end point.<br>
       - `id`<br>
        **Type**: `STRING`<br>
        **Provider name**: `id`<br>
        **Description**: The ARM identifier for Private Endpoint<br>
   - `private_link_service_connection_state`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `properties.privateLinkServiceConnectionState`<br>
    **Description**: A collection of information about the state of the connection between service consumer and provider.<br>
       - `action_required`<br>
        **Type**: `STRING`<br>
        **Provider name**: `actionRequired`<br>
        **Description**: A message indicating if changes on the service provider require any updates on the consumer.<br>
       - `description`<br>
        **Type**: `STRING`<br>
        **Provider name**: `description`<br>
        **Description**: The reason for approval/rejection of the connection.<br>
       - `status`<br>
        **Type**: `STRING`<br>
        **Provider name**: `status`<br>
        **Description**: Indicates whether the connection has been Approved/Rejected/Removed by the owner of the service.<br>
   - `provisioning_state`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.provisioningState`<br>
    **Description**: The provisioning state of the private endpoint connection resource.<br>
   - `type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `type`<br>
    **Description**: The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts"<br>
## `provisioning_state`
**Type**: `STRING`<br>
**Provider name**: `properties.provisioningState`<br>
**Description**: Gets the status of the storage account at the time the operation was called.<br>
## `resource_group`
**Type**: `STRING`<br>
## `secondary_endpoints`
**Type**: `STRUCT`<br>
**Provider name**: `properties.secondaryEndpoints`<br>
**Description**: Gets the URLs that are used to perform a retrieval of a public blob, queue, or table object from the secondary location of the storage account. Only available if the SKU name is Standard_RAGRS.<br>
   - `blob`<br>
    **Type**: `STRING`<br>
    **Provider name**: `blob`<br>
    **Description**: Gets the blob endpoint.<br>
   - `dfs`<br>
    **Type**: `STRING`<br>
    **Provider name**: `dfs`<br>
    **Description**: Gets the dfs endpoint.<br>
   - `file`<br>
    **Type**: `STRING`<br>
    **Provider name**: `file`<br>
    **Description**: Gets the file endpoint.<br>
   - `queue`<br>
    **Type**: `STRING`<br>
    **Provider name**: `queue`<br>
    **Description**: Gets the queue endpoint.<br>
   - `table`<br>
    **Type**: `STRING`<br>
    **Provider name**: `table`<br>
    **Description**: Gets the table endpoint.<br>
   - `web`<br>
    **Type**: `STRING`<br>
    **Provider name**: `web`<br>
    **Description**: Gets the web endpoint.<br>
## `secondary_location`
**Type**: `STRING`<br>
**Provider name**: `properties.secondaryLocation`<br>
**Description**: Gets the location of the geo-replicated secondary for the storage account. Only available if the accountType is Standard_GRS or Standard_RAGRS.<br>
## `sku`
**Type**: `STRUCT`<br>
**Provider name**: `sku`<br>
**Description**: Gets the SKU.<br>
   - `name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `name`<br>
   - `tier`<br>
    **Type**: `STRING`<br>
    **Provider name**: `tier`<br>
## `status_of_primary`
**Type**: `STRING`<br>
**Provider name**: `properties.statusOfPrimary`<br>
**Description**: Gets the status indicating whether the primary location of the storage account is available or unavailable.<br>
## `status_of_secondary`
**Type**: `STRING`<br>
**Provider name**: `properties.statusOfSecondary`<br>
**Description**: Gets the status indicating whether the secondary location of the storage account is available or unavailable. Only available if the SKU name is Standard_GRS or Standard_RAGRS.<br>
## `subscription_id`
**Type**: `STRING`<br>
## `subscription_name`
**Type**: `STRING`<br>
## `supports_https_traffic_only`
**Type**: `BOOLEAN`<br>
**Provider name**: `properties.supportsHttpsTrafficOnly`<br>
**Description**: Allows https traffic only to storage service if sets to true.<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `type`
**Type**: `STRING`<br>
**Provider name**: `type`<br>
**Description**: The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts"<br>
