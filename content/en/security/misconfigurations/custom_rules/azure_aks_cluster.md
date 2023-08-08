---
dependencies: []
disable_edit: true
---
# azure_aks_cluster

## `api_server_access_profile`
**Type**: `STRUCT`<br>
**Provider name**: `properties.apiServerAccessProfile`<br>
**Description**: Access profile for managed cluster API server.<br>
   - `authorized_ip_ranges`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `authorizedIPRanges`<br>
    **Description**: Authorized IP Ranges to kubernetes API server.<br>
   - `enable_private_cluster`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `enablePrivateCluster`<br>
    **Description**: Whether to create the cluster as a private cluster or not.<br>
   - `private_dns_zone`<br>
    **Type**: `STRING`<br>
    **Provider name**: `privateDNSZone`<br>
    **Description**: Private dns zone mode for private cluster.<br>
## `azure_portal_fqdn`
**Type**: `STRING`<br>
**Provider name**: `properties.azurePortalFQDN`<br>
**Description**: FQDN for the master pool which used by proxy config.<br>
## `disable_local_accounts`
**Type**: `BOOLEAN`<br>
**Provider name**: `properties.disableLocalAccounts`<br>
**Description**: If set to true, getting static credential will be disabled for this cluster. Expected to only be used for AAD clusters.<br>
## `disk_encryption_set_id`
**Type**: `STRING`<br>
**Provider name**: `properties.diskEncryptionSetID`<br>
**Description**: ResourceId of the disk encryption set to use for enabling encryption at rest.<br>
## `dns_prefix`
**Type**: `STRING`<br>
**Provider name**: `properties.dnsPrefix`<br>
**Description**: DNS prefix specified when creating the managed cluster.<br>
## `enable_pod_security_policy`
**Type**: `BOOLEAN`<br>
**Provider name**: `properties.enablePodSecurityPolicy`<br>
**Description**: (DEPRECATING) Whether to enable Kubernetes pod security policy (preview). This feature is set for removal on October 15th, 2020. Learn more at aka.ms/aks/azpodpolicy.<br>
## `enable_rbac`
**Type**: `BOOLEAN`<br>
**Provider name**: `properties.enableRBAC`<br>
**Description**: Whether to enable Kubernetes Role-Based Access Control.<br>
## `fqdn`
**Type**: `STRING`<br>
**Provider name**: `properties.fqdn`<br>
**Description**: FQDN for the master pool.<br>
## `fqdn_subdomain`
**Type**: `STRING`<br>
**Provider name**: `properties.fqdnSubdomain`<br>
**Description**: FQDN subdomain specified when creating private cluster with custom private dns zone.<br>
## `id`
**Type**: `STRING`<br>
**Provider name**: `id`<br>
**Description**: Resource Id<br>
## `kubernetes_version`
**Type**: `STRING`<br>
**Provider name**: `properties.kubernetesVersion`<br>
**Description**: Version of Kubernetes specified when creating the managed cluster.<br>
## `location`
**Type**: `STRING`<br>
**Provider name**: `location`<br>
**Description**: Resource location<br>
## `max_agent_pools`
**Type**: `INT64`<br>
**Provider name**: `properties.maxAgentPools`<br>
**Description**: The max number of agent pools for the managed cluster.<br>
## `name`
**Type**: `STRING`<br>
**Provider name**: `name`<br>
**Description**: Resource name<br>
## `network_profile`
**Type**: `STRUCT`<br>
**Provider name**: `properties.networkProfile`<br>
**Description**: Profile of network configuration.<br>
   - `dns_service_ip`<br>
    **Type**: `STRING`<br>
    **Provider name**: `dnsServiceIP`<br>
    **Description**: An IP address assigned to the Kubernetes DNS service. It must be within the Kubernetes service address range specified in serviceCidr.<br>
   - `docker_bridge_cidr`<br>
    **Type**: `STRING`<br>
    **Provider name**: `dockerBridgeCidr`<br>
    **Description**: A CIDR notation IP range assigned to the Docker bridge network. It must not overlap with any Subnet IP ranges or the Kubernetes service address range.<br>
   - `load_balancer_sku`<br>
    **Type**: `STRING`<br>
    **Provider name**: `loadBalancerSku`<br>
    **Description**: The load balancer sku for the managed cluster.<br>
   - `network_mode`<br>
    **Type**: `STRING`<br>
    **Provider name**: `networkMode`<br>
    **Description**: Network mode used for building Kubernetes network.<br>
   - `network_plugin`<br>
    **Type**: `STRING`<br>
    **Provider name**: `networkPlugin`<br>
    **Description**: Network plugin used for building Kubernetes network.<br>
   - `network_policy`<br>
    **Type**: `STRING`<br>
    **Provider name**: `networkPolicy`<br>
    **Description**: Network policy used for building Kubernetes network.<br>
   - `outbound_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `outboundType`<br>
    **Description**: The outbound (egress) routing method.<br>
   - `pod_cidr`<br>
    **Type**: `STRING`<br>
    **Provider name**: `podCidr`<br>
    **Description**: A CIDR notation IP range from which to assign pod IPs when kubenet is used.<br>
   - `service_cidr`<br>
    **Type**: `STRING`<br>
    **Provider name**: `serviceCidr`<br>
    **Description**: A CIDR notation IP range from which to assign service cluster IPs. It must not overlap with any Subnet IP ranges.<br>
## `node_resource_group`
**Type**: `STRING`<br>
**Provider name**: `properties.nodeResourceGroup`<br>
**Description**: Name of the resource group containing agent pool nodes.<br>
## `power_state`
**Type**: `STRUCT`<br>
**Provider name**: `properties.powerState`<br>
**Description**: Represents the Power State of the cluster<br>
   - `code`<br>
    **Type**: `STRING`<br>
    **Provider name**: `code`<br>
    **Description**: Tells whether the cluster is Running or Stopped<br>
## `private_fqdn`
**Type**: `STRING`<br>
**Provider name**: `properties.privateFQDN`<br>
**Description**: FQDN of private cluster.<br>
## `provisioning_state`
**Type**: `STRING`<br>
**Provider name**: `properties.provisioningState`<br>
**Description**: The current deployment or provisioning state, which only appears in the response.<br>
## `resource_group`
**Type**: `STRING`<br>
## `service_principal_profile`
**Type**: `STRUCT`<br>
**Provider name**: `properties.servicePrincipalProfile`<br>
**Description**: Information about a service principal identity for the cluster to use for manipulating Azure APIs.<br>
   - `client_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `clientId`<br>
    **Description**: The ID for the service principal.<br>
## `sku`
**Type**: `STRUCT`<br>
**Provider name**: `sku`<br>
**Description**: The managed cluster SKU.<br>
   - `name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `name`<br>
    **Description**: Name of a managed cluster SKU.<br>
   - `tier`<br>
    **Type**: `STRING`<br>
    **Provider name**: `tier`<br>
    **Description**: Tier of a managed cluster SKU.<br>
## `subscription_id`
**Type**: `STRING`<br>
## `subscription_name`
**Type**: `STRING`<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `type`
**Type**: `STRING`<br>
**Provider name**: `type`<br>
**Description**: Resource type<br>
## `windows_profile`
**Type**: `STRUCT`<br>
**Provider name**: `properties.windowsProfile`<br>
**Description**: Profile for Windows VMs in the container service cluster.<br>
   - `admin_username`<br>
    **Type**: `STRING`<br>
    **Provider name**: `adminUsername`<br>
    **Description**: Specifies the name of the administrator account. <br><br> **restriction:** Cannot end in "." <br><br> **Disallowed values:** "administrator", "admin", "user", "user1", "test", "user2", "test1", "user3", "admin1", "1", "123", "a", "actuser", "adm", "admin2", "aspnet", "backup", "console", "david", "guest", "john", "owner", "root", "server", "sql", "support", "support_388945a0", "sys", "test2", "test3", "user4", "user5". <br><br> **Minimum-length:** 1 character <br><br> **Max-length:** 20 characters<br>
   - `enable_csi_proxy`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `enableCSIProxy`<br>
    **Description**: Whether to enable CSI proxy.<br>
   - `license_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `licenseType`<br>
    **Description**: The licenseType to use for Windows VMs. Windows_Server is used to enable Azure Hybrid User Benefits for Windows VMs.<br>
