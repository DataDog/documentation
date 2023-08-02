---
dependencies: []
disable_edit: true
---
# azure_app_service

## `availability_state`
**Type**: `STRING`<br>
**Provider name**: `properties.availabilityState`<br>
**Description**: Management information availability state for the app.<br>
## `client_affinity_enabled`
**Type**: `BOOLEAN`<br>
**Provider name**: `properties.clientAffinityEnabled`<br>
**Description**: <code>true</code> to enable client affinity; <code>false</code> to stop sending session affinity cookies, which route client requests in the same session to the same instance. Default is <code>true</code>.<br>
## `client_cert_enabled`
**Type**: `BOOLEAN`<br>
**Provider name**: `properties.clientCertEnabled`<br>
**Description**: <code>true</code> to enable client certificate authentication (TLS mutual authentication); otherwise, <code>false</code>. Default is <code>false</code>.<br>
## `client_cert_exclusion_paths`
**Type**: `STRING`<br>
**Provider name**: `properties.clientCertExclusionPaths`<br>
**Description**: client certificate authentication comma-separated exclusion paths<br>
## `client_cert_mode`
**Type**: `STRING`<br>
**Provider name**: `properties.clientCertMode`<br>
**Description**: This composes with ClientCertEnabled setting.- ClientCertEnabled: false means ClientCert is ignored.- ClientCertEnabled: true and ClientCertMode: Required means ClientCert is required.- ClientCertEnabled: true and ClientCertMode: Optional means ClientCert is optional or accepted.<br>
## `container_size`
**Type**: `INT64`<br>
**Provider name**: `properties.containerSize`<br>
**Description**: Size of the function container.<br>
## `custom_domain_verification_id`
**Type**: `STRING`<br>
**Provider name**: `properties.customDomainVerificationId`<br>
**Description**: Unique identifier that verifies the custom domains assigned to the app. Customer will add this id to a txt record for verification.<br>
## `daily_memory_time_quota`
**Type**: `INT64`<br>
**Provider name**: `properties.dailyMemoryTimeQuota`<br>
**Description**: Maximum allowed daily memory-time quota (applicable on dynamic apps only).<br>
## `default_host_name`
**Type**: `STRING`<br>
**Provider name**: `properties.defaultHostName`<br>
**Description**: Default hostname of the app. Read-only.<br>
## `enabled`
**Type**: `BOOLEAN`<br>
**Provider name**: `properties.enabled`<br>
**Description**: <code>true</code> if the app is enabled; otherwise, <code>false</code>. Setting this value to false disables the app (takes the app offline).<br>
## `enabled_host_names`
**Type**: `UNORDERED_LIST_STRING`<br>
**Provider name**: `properties.enabledHostNames`<br>
**Description**: Enabled hostnames for the app.Hostnames need to be assigned (see HostNames) AND enabled. Otherwise,the app is not served on those hostnames.<br>
## `extended_location`
**Type**: `STRUCT`<br>
**Provider name**: `extendedLocation`<br>
   - `name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `name`<br>
    **Description**: Name of extended location.<br>
   - `type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `type`<br>
    **Description**: Type of extended location.<br>
## `host_names`
**Type**: `UNORDERED_LIST_STRING`<br>
**Provider name**: `properties.hostNames`<br>
**Description**: Hostnames associated with the app.<br>
## `host_names_disabled`
**Type**: `BOOLEAN`<br>
**Provider name**: `properties.hostNamesDisabled`<br>
**Description**: <code>true</code> to disable the public hostnames of the app; otherwise, <code>false</code>. If <code>true</code>, the app is only accessible via API management process.<br>
## `https_only`
**Type**: `BOOLEAN`<br>
**Provider name**: `properties.httpsOnly`<br>
**Description**: HttpsOnly: configures a web site to accept only https requests. Issues redirect forhttp requests<br>
## `hyper_v`
**Type**: `BOOLEAN`<br>
**Provider name**: `properties.hyperV`<br>
**Description**: Hyper-V sandbox.<br>
## `id`
**Type**: `STRING`<br>
**Provider name**: `id`<br>
**Description**: Resource Id.<br>
## `identity`
**Type**: `STRUCT`<br>
**Provider name**: `identity`<br>
   - `principal_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `principalId`<br>
    **Description**: Principal Id of managed service identity.<br>
   - `tenant_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `tenantId`<br>
    **Description**: Tenant of managed service identity.<br>
   - `type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `type`<br>
    **Description**: Type of managed service identity.<br>
## `in_progress_operation_id`
**Type**: `STRING`<br>
**Provider name**: `properties.inProgressOperationId`<br>
**Description**: Specifies an operation id if this site has a pending operation.<br>
## `is_default_container`
**Type**: `BOOLEAN`<br>
**Provider name**: `properties.isDefaultContainer`<br>
**Description**: <code>true</code> if the app is a default container; otherwise, <code>false</code>.<br>
## `is_xenon`
**Type**: `BOOLEAN`<br>
**Provider name**: `properties.isXenon`<br>
**Description**: Obsolete: Hyper-V sandbox.<br>
## `key_vault_reference_identity`
**Type**: `STRING`<br>
**Provider name**: `properties.keyVaultReferenceIdentity`<br>
**Description**: Identity to use for Key Vault Reference authentication.<br>
## `kind`
**Type**: `STRING`<br>
**Provider name**: `kind`<br>
**Description**: Kind of resource.<br>
## `last_modified_time_utc`
**Type**: `STRING`<br>
**Provider name**: `properties.lastModifiedTimeUtc`<br>
**Description**: Last time the app was modified, in UTC. Read-only.<br>
## `location`
**Type**: `STRING`<br>
**Provider name**: `location`<br>
**Description**: Resource Location.<br>
## `max_number_of_workers`
**Type**: `INT32`<br>
**Provider name**: `properties.maxNumberOfWorkers`<br>
**Description**: Maximum number of workers.This only applies to Functions container.<br>
## `name`
**Type**: `STRING`<br>
**Provider name**: `name`<br>
**Description**: Resource Name.<br>
## `outbound_ip_addresses`
**Type**: `STRING`<br>
**Provider name**: `properties.outboundIpAddresses`<br>
**Description**: List of IP addresses that the app uses for outbound connections (e.g. database access). Includes VIPs from tenants that site can be hosted with current settings. Read-only.<br>
## `possible_outbound_ip_addresses`
**Type**: `STRING`<br>
**Provider name**: `properties.possibleOutboundIpAddresses`<br>
**Description**: List of IP addresses that the app uses for outbound connections (e.g. database access). Includes VIPs from all tenants except dataComponent. Read-only.<br>
## `redundancy_mode`
**Type**: `STRING`<br>
**Provider name**: `properties.redundancyMode`<br>
**Description**: Site redundancy mode<br>
## `repository_site_name`
**Type**: `STRING`<br>
**Provider name**: `properties.repositorySiteName`<br>
**Description**: Name of the repository site.<br>
## `reserved`
**Type**: `BOOLEAN`<br>
**Provider name**: `properties.reserved`<br>
**Description**: <code>true</code> if reserved; otherwise, <code>false</code>.<br>
## `resource_group`
**Type**: `STRING`<br>
## `scm_site_also_stopped`
**Type**: `BOOLEAN`<br>
**Provider name**: `properties.scmSiteAlsoStopped`<br>
**Description**: <code>true</code> to stop SCM (KUDU) site when the app is stopped; otherwise, <code>false</code>. The default is <code>false</code>.<br>
## `server_farm_id`
**Type**: `STRING`<br>
**Provider name**: `properties.serverFarmId`<br>
**Description**: Resource ID of the associated App Service plan, formatted as: "/subscriptions/{subscriptionID}/resourceGroups/{groupName}/providers/Microsoft.Web/serverfarms/{appServicePlanName}".<br>
## `site_config`
**Type**: `STRUCT`<br>
**Provider name**: `properties.siteConfig`<br>
**Description**: Configuration of the app.<br>
   - `acr_use_managed_identity_creds`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `acrUseManagedIdentityCreds`<br>
    **Description**: Flag to use Managed Identity Creds for ACR pull<br>
   - `acr_user_managed_identity_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `acrUserManagedIdentityID`<br>
    **Description**: If using user managed identity, the user managed identity ClientId<br>
   - `always_on`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `alwaysOn`<br>
    **Description**: <code>true</code> if Always On is enabled; otherwise, <code>false</code>.<br>
   - `app_command_line`<br>
    **Type**: `STRING`<br>
    **Provider name**: `appCommandLine`<br>
    **Description**: App command line to launch.<br>
   - `auto_heal_enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `autoHealEnabled`<br>
    **Description**: <code>true</code> if Auto Heal is enabled; otherwise, <code>false</code>.<br>
   - `ftps_state`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ftpsState`<br>
    **Description**: State of FTP / FTPS service<br>
   - `function_app_scale_limit`<br>
    **Type**: `INT64`<br>
    **Provider name**: `functionAppScaleLimit`<br>
    **Description**: Maximum number of workers that a site can scale out to.This setting only applies to the Consumption and Elastic Premium Plans<br>
   - `functions_runtime_scale_monitoring_enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `functionsRuntimeScaleMonitoringEnabled`<br>
    **Description**: Gets or sets a value indicating whether functions runtime scale monitoring is enabled. When enabled,the ScaleController will not monitor event sources directly, but will instead call to theruntime to get scale status.<br>
   - `http20_enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `http20Enabled`<br>
    **Description**: Http20Enabled: configures a web site to allow clients to connect over http2.0<br>
   - `http_logging_enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `httpLoggingEnabled`<br>
    **Description**: <code>true</code> if HTTP logging is enabled; otherwise, <code>false</code>.<br>
   - `java_container`<br>
    **Type**: `STRING`<br>
    **Provider name**: `javaContainer`<br>
    **Description**: Java container.<br>
   - `java_container_version`<br>
    **Type**: `STRING`<br>
    **Provider name**: `javaContainerVersion`<br>
    **Description**: Java container version.<br>
   - `java_version`<br>
    **Type**: `STRING`<br>
    **Provider name**: `javaVersion`<br>
    **Description**: Java version.<br>
   - `limits`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `limits`<br>
    **Description**: Site limits.<br>
       - `max_disk_size_in_mb`<br>
        **Type**: `INT64`<br>
        **Provider name**: `maxDiskSizeInMb`<br>
        **Description**: Maximum allowed disk size usage in MB.<br>
       - `max_memory_in_mb`<br>
        **Type**: `INT64`<br>
        **Provider name**: `maxMemoryInMb`<br>
        **Description**: Maximum allowed memory usage in MB.<br>
       - `max_percentage_cpu`<br>
        **Type**: `DOUBLE`<br>
        **Provider name**: `maxPercentageCpu`<br>
        **Description**: Maximum allowed CPU usage percentage.<br>
   - `linux_fx_version`<br>
    **Type**: `STRING`<br>
    **Provider name**: `linuxFxVersion`<br>
    **Description**: Linux App Framework and version<br>
   - `load_balancing`<br>
    **Type**: `STRING`<br>
    **Provider name**: `loadBalancing`<br>
    **Description**: Site load balancing.<br>
   - `local_my_sql_enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `localMySqlEnabled`<br>
    **Description**: <code>true</code> to enable local MySQL; otherwise, <code>false</code>.<br>
   - `logs_directory_size_limit`<br>
    **Type**: `INT64`<br>
    **Provider name**: `logsDirectorySizeLimit`<br>
    **Description**: HTTP logs directory size limit.<br>
   - `machine_key`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `machineKey`<br>
    **Description**: Site MachineKey.<br>
       - `decryption`<br>
        **Type**: `STRING`<br>
        **Provider name**: `decryption`<br>
        **Description**: Algorithm used for decryption.<br>
       - `decryption_key`<br>
        **Type**: `STRING`<br>
        **Provider name**: `decryptionKey`<br>
        **Description**: Decryption key.<br>
       - `validation`<br>
        **Type**: `STRING`<br>
        **Provider name**: `validation`<br>
        **Description**: MachineKey validation.<br>
       - `validation_key`<br>
        **Type**: `STRING`<br>
        **Provider name**: `validationKey`<br>
        **Description**: Validation key.<br>
   - `managed_pipeline_mode`<br>
    **Type**: `STRING`<br>
    **Provider name**: `managedPipelineMode`<br>
    **Description**: Managed pipeline mode.<br>
   - `managed_service_identity_id`<br>
    **Type**: `INT64`<br>
    **Provider name**: `managedServiceIdentityId`<br>
    **Description**: Managed Service Identity Id<br>
   - `min_tls_version`<br>
    **Type**: `STRING`<br>
    **Provider name**: `minTlsVersion`<br>
    **Description**: MinTlsVersion: configures the minimum version of TLS required for SSL requests<br>
   - `minimum_elastic_instance_count`<br>
    **Type**: `INT64`<br>
    **Provider name**: `minimumElasticInstanceCount`<br>
    **Description**: Number of minimum instance count for a siteThis setting only applies to the Elastic Plans<br>
   - `net_framework_version`<br>
    **Type**: `STRING`<br>
    **Provider name**: `netFrameworkVersion`<br>
    **Description**: .NET Framework version.<br>
   - `node_version`<br>
    **Type**: `STRING`<br>
    **Provider name**: `nodeVersion`<br>
    **Description**: Version of Node.js.<br>
   - `number_of_workers`<br>
    **Type**: `INT64`<br>
    **Provider name**: `numberOfWorkers`<br>
    **Description**: Number of workers.<br>
   - `php_version`<br>
    **Type**: `STRING`<br>
    **Provider name**: `phpVersion`<br>
    **Description**: Version of PHP.<br>
   - `power_shell_version`<br>
    **Type**: `STRING`<br>
    **Provider name**: `powerShellVersion`<br>
    **Description**: Version of PowerShell.<br>
   - `pre_warmed_instance_count`<br>
    **Type**: `INT64`<br>
    **Provider name**: `preWarmedInstanceCount`<br>
    **Description**: Number of preWarmed instances.This setting only applies to the Consumption and Elastic Plans<br>
   - `public_network_access`<br>
    **Type**: `STRING`<br>
    **Provider name**: `publicNetworkAccess`<br>
    **Description**: Property to allow or block all public traffic.<br>
   - `publishing_username`<br>
    **Type**: `STRING`<br>
    **Provider name**: `publishingUsername`<br>
    **Description**: Publishing user name.<br>
   - `python_version`<br>
    **Type**: `STRING`<br>
    **Provider name**: `pythonVersion`<br>
    **Description**: Version of Python.<br>
   - `remote_debugging_enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `remoteDebuggingEnabled`<br>
    **Description**: <code>true</code> if remote debugging is enabled; otherwise, <code>false</code>.<br>
   - `remote_debugging_version`<br>
    **Type**: `STRING`<br>
    **Provider name**: `remoteDebuggingVersion`<br>
    **Description**: Remote debugging version.<br>
   - `request_tracing_enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `requestTracingEnabled`<br>
    **Description**: <code>true</code> if request tracing is enabled; otherwise, <code>false</code>.<br>
   - `scm_ip_security_restrictions_use_main`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `scmIpSecurityRestrictionsUseMain`<br>
    **Description**: IP security restrictions for scm to use main.<br>
   - `scm_min_tls_version`<br>
    **Type**: `STRING`<br>
    **Provider name**: `scmMinTlsVersion`<br>
    **Description**: ScmMinTlsVersion: configures the minimum version of TLS required for SSL requests for SCM site<br>
   - `scm_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `scmType`<br>
    **Description**: SCM type.<br>
   - `tracing_options`<br>
    **Type**: `STRING`<br>
    **Provider name**: `tracingOptions`<br>
    **Description**: Tracing options.<br>
   - `use32_bit_worker_process`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `use32BitWorkerProcess`<br>
    **Description**: <code>true</code> to use 32-bit worker process; otherwise, <code>false</code>.<br>
   - `vnet_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `vnetName`<br>
    **Description**: Virtual Network name.<br>
   - `vnet_private_ports_count`<br>
    **Type**: `INT32`<br>
    **Provider name**: `vnetPrivatePortsCount`<br>
    **Description**: The number of private ports assigned to this app. These will be assigned dynamically on runtime.<br>
   - `vnet_route_all_enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `vnetRouteAllEnabled`<br>
    **Description**: Virtual Network Route All enabled. This causes all outbound traffic to have Virtual Network Security Groups and User Defined Routes applied.<br>
   - `web_sockets_enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `webSocketsEnabled`<br>
    **Description**: <code>true</code> if WebSocket is enabled; otherwise, <code>false</code>.<br>
   - `website_time_zone`<br>
    **Type**: `STRING`<br>
    **Provider name**: `websiteTimeZone`<br>
    **Description**: Sets the time zone a site uses for generating timestamps. Compatible with Linux and Windows App Service. Setting the WEBSITE_TIME_ZONE app setting takes precedence over this config. For Linux, expects tz database values https://www.iana.org/time-zones (for a quick reference see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). For Windows, expects one of the time zones listed under HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Time Zones<br>
   - `windows_fx_version`<br>
    **Type**: `STRING`<br>
    **Provider name**: `windowsFxVersion`<br>
    **Description**: Xenon App Framework and version<br>
   - `x_managed_service_identity_id`<br>
    **Type**: `INT64`<br>
    **Provider name**: `xManagedServiceIdentityId`<br>
    **Description**: Explicit Managed Service Identity Id<br>
## `state`
**Type**: `STRING`<br>
**Provider name**: `properties.state`<br>
**Description**: Current state of the app.<br>
## `storage_account_required`
**Type**: `BOOLEAN`<br>
**Provider name**: `properties.storageAccountRequired`<br>
**Description**: Checks if Customer provided storage account is required<br>
## `subscription_id`
**Type**: `STRING`<br>
## `subscription_name`
**Type**: `STRING`<br>
## `suspended_till`
**Type**: `STRING`<br>
**Provider name**: `properties.suspendedTill`<br>
**Description**: App suspended till in case memory-time quota is exceeded.<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `target_swap_slot`
**Type**: `STRING`<br>
**Provider name**: `properties.targetSwapSlot`<br>
**Description**: Specifies which deployment slot this app will swap into. Read-only.<br>
## `traffic_manager_host_names`
**Type**: `UNORDERED_LIST_STRING`<br>
**Provider name**: `properties.trafficManagerHostNames`<br>
**Description**: Azure Traffic Manager hostnames associated with the app. Read-only.<br>
## `type`
**Type**: `STRING`<br>
**Provider name**: `type`<br>
**Description**: Resource type.<br>
## `usage_state`
**Type**: `STRING`<br>
**Provider name**: `properties.usageState`<br>
**Description**: State indicating whether the app has exceeded its quota usage. Read-only.<br>
## `virtual_network_subnet_id`
**Type**: `STRING`<br>
**Provider name**: `properties.virtualNetworkSubnetId`<br>
**Description**: Azure Resource Manager ID of the Virtual network and subnet to be joined by Regional VNET Integration.This must be of the form /subscriptions/{subscriptionName}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{vnetName}/subnets/{subnetName}<br>
## `web_auth_settings`
**Type**: `STRUCT`<br>
**Provider name**: `SiteAuthSettings`<br>
   - `aad_claims_authorization`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.aadClaimsAuthorization`<br>
    **Description**: Gets a JSON string containing the Azure AD Acl settings.<br>
   - `auth_file_path`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.authFilePath`<br>
    **Description**: The path of the config file containing auth settings.If the path is relative, base will the site's root directory.<br>
   - `client_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.clientId`<br>
    **Description**: The Client ID of this relying party application, known as the client_id.This setting is required for enabling OpenID Connection authentication with Azure Active Directory or other 3rd party OpenID Connect providers.More information on OpenID Connect: http://openid.net/specs/openid-connect-core-1_0.html<br>
   - `client_secret`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.clientSecret`<br>
    **Description**: The Client Secret of this relying party application (in Azure Active Directory, this is also referred to as the Key).This setting is optional. If no client secret is configured, the OpenID Connect implicit auth flow is used to authenticate end users.Otherwise, the OpenID Connect Authorization Code Flow is used to authenticate end users.More information on OpenID Connect: http://openid.net/specs/openid-connect-core-1_0.html<br>
   - `client_secret_certificate_thumbprint`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.clientSecretCertificateThumbprint`<br>
    **Description**: An alternative to the client secret, that is the thumbprint of a certificate used for signing purposes. This property acts asa replacement for the Client Secret. It is also optional.<br>
   - `client_secret_setting_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.clientSecretSettingName`<br>
    **Description**: The app setting name that contains the client secret of the relying party application.<br>
   - `config_version`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.configVersion`<br>
    **Description**: The ConfigVersion of the Authentication / Authorization feature in use for the current app.The setting in this value can control the behavior of the control plane for Authentication / Authorization.<br>
   - `default_provider`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.defaultProvider`<br>
    **Description**: The default authentication provider to use when multiple providers are configured.This setting is only needed if multiple providers are configured and the unauthenticated clientaction is set to "RedirectToLoginPage".<br>
   - `enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `properties.enabled`<br>
    **Description**: <code>true</code> if the Authentication / Authorization feature is enabled for the current app; otherwise, <code>false</code>.<br>
   - `facebook_app_secret`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.facebookAppSecret`<br>
    **Description**: The App Secret of the Facebook app used for Facebook Login.This setting is required for enabling Facebook Login.Facebook Login documentation: https://developers.facebook.com/docs/facebook-login<br>
   - `id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `id`<br>
    **Description**: Resource Id.<br>
   - `is_auth_from_file`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.isAuthFromFile`<br>
    **Description**: "true" if the auth config settings should be read from a file,"false" otherwise<br>
   - `issuer`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.issuer`<br>
    **Description**: The OpenID Connect Issuer URI that represents the entity which issues access tokens for this application.When using Azure Active Directory, this value is the URI of the directory tenant, e.g. https://sts.windows.net/{tenant-guid}/.This URI is a case-sensitive identifier for the token issuer.More information on OpenID Connect Discovery: http://openid.net/specs/openid-connect-discovery-1_0.html<br>
   - `kind`<br>
    **Type**: `STRING`<br>
    **Provider name**: `kind`<br>
    **Description**: Kind of resource.<br>
   - `name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `name`<br>
    **Description**: Resource Name.<br>
   - `runtime_version`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.runtimeVersion`<br>
    **Description**: The RuntimeVersion of the Authentication / Authorization feature in use for the current app.The setting in this value can control the behavior of certain features in the Authentication / Authorization module.<br>
   - `token_refresh_extension_hours`<br>
    **Type**: `DOUBLE`<br>
    **Provider name**: `properties.tokenRefreshExtensionHours`<br>
    **Description**: The number of hours after session token expiration that a session token can be used tocall the token refresh API. The default is 72 hours.<br>
   - `token_store_enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `properties.tokenStoreEnabled`<br>
    **Description**: <code>true</code> to durably store platform-specific security tokens that are obtained during login flows; otherwise, <code>false</code>. The default is <code>false</code>.<br>
   - `type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `type`<br>
    **Description**: Resource type.<br>
   - `unauthenticated_client_action`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.unauthenticatedClientAction`<br>
    **Description**: The action to take when an unauthenticated client attempts to access the app.<br>
   - `validate_issuer`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `properties.validateIssuer`<br>
    **Description**: Gets a value indicating whether the issuer should be a valid HTTPS url and be validated as such.<br>
