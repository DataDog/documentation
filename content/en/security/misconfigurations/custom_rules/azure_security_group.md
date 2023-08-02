---
dependencies: []
disable_edit: true
---
# azure_security_group

## `default_security_rules`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `properties.defaultSecurityRules`<br>
**Description**: The default security rules of network security group.<br>
   - `access`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.access`<br>
    **Description**: The network traffic is allowed or denied.<br>
   - `description`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.description`<br>
    **Description**: A description for this rule. Restricted to 140 chars.<br>
   - `destination_address_prefix`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.destinationAddressPrefix`<br>
    **Description**: The destination address prefix. CIDR or destination IP range. Asterisk '*' can also be used to match all source IPs. Default tags such as 'VirtualNetwork', 'AzureLoadBalancer' and 'Internet' can also be used.<br>
   - `destination_address_prefixes`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `properties.destinationAddressPrefixes`<br>
    **Description**: The destination address prefixes. CIDR or destination IP ranges.<br>
   - `destination_port_range`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.destinationPortRange`<br>
    **Description**: The destination port or range. Integer or range between 0 and 65535. Asterisk '*' can also be used to match all ports.<br>
   - `destination_port_ranges`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `properties.destinationPortRanges`<br>
    **Description**: The destination port ranges.<br>
   - `direction`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.direction`<br>
    **Description**: The direction of the rule. The direction specifies if rule will be evaluated on incoming or outgoing traffic.<br>
   - `etag`<br>
    **Type**: `STRING`<br>
    **Provider name**: `etag`<br>
    **Description**: A unique read-only string that changes whenever the resource is updated.<br>
   - `id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `id`<br>
    **Description**: Resource ID.<br>
   - `name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `name`<br>
    **Description**: The name of the resource that is unique within a resource group. This name can be used to access the resource.<br>
   - `protocol`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.protocol`<br>
    **Description**: Network protocol this rule applies to.<br>
   - `provisioning_state`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.provisioningState`<br>
    **Description**: The provisioning state of the security rule resource.<br>
   - `source_address_prefix`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.sourceAddressPrefix`<br>
    **Description**: The CIDR or source IP range. Asterisk '*' can also be used to match all source IPs. Default tags such as 'VirtualNetwork', 'AzureLoadBalancer' and 'Internet' can also be used. If this is an ingress rule, specifies where network traffic originates from.<br>
   - `source_address_prefixes`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `properties.sourceAddressPrefixes`<br>
    **Description**: The CIDR or source IP ranges.<br>
   - `source_port_range`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.sourcePortRange`<br>
    **Description**: The source port or range. Integer or range between 0 and 65535. Asterisk '*' can also be used to match all ports.<br>
   - `source_port_ranges`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `properties.sourcePortRanges`<br>
    **Description**: The source port ranges.<br>
   - `type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `type`<br>
    **Description**: The type of the resource.<br>
## `etag`
**Type**: `STRING`<br>
**Provider name**: `etag`<br>
**Description**: A unique read-only string that changes whenever the resource is updated.<br>
## `id`
**Type**: `STRING`<br>
**Provider name**: `id`<br>
**Description**: Resource ID.<br>
## `location`
**Type**: `STRING`<br>
**Provider name**: `location`<br>
**Description**: Resource location.<br>
## `name`
**Type**: `STRING`<br>
**Provider name**: `name`<br>
**Description**: Resource name.<br>
## `provisioning_state`
**Type**: `STRING`<br>
**Provider name**: `properties.provisioningState`<br>
**Description**: The provisioning state of the network security group resource.<br>
## `resource_group`
**Type**: `STRING`<br>
## `resource_guid`
**Type**: `STRING`<br>
**Provider name**: `properties.resourceGuid`<br>
**Description**: The resource GUID property of the network security group resource.<br>
## `security_rules`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `properties.securityRules`<br>
**Description**: A collection of security rules of the network security group.<br>
   - `access`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.access`<br>
    **Description**: The network traffic is allowed or denied.<br>
   - `description`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.description`<br>
    **Description**: A description for this rule. Restricted to 140 chars.<br>
   - `destination_address_prefix`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.destinationAddressPrefix`<br>
    **Description**: The destination address prefix. CIDR or destination IP range. Asterisk '*' can also be used to match all source IPs. Default tags such as 'VirtualNetwork', 'AzureLoadBalancer' and 'Internet' can also be used.<br>
   - `destination_address_prefixes`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `properties.destinationAddressPrefixes`<br>
    **Description**: The destination address prefixes. CIDR or destination IP ranges.<br>
   - `destination_port_range`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.destinationPortRange`<br>
    **Description**: The destination port or range. Integer or range between 0 and 65535. Asterisk '*' can also be used to match all ports.<br>
   - `destination_port_ranges`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `properties.destinationPortRanges`<br>
    **Description**: The destination port ranges.<br>
   - `direction`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.direction`<br>
    **Description**: The direction of the rule. The direction specifies if rule will be evaluated on incoming or outgoing traffic.<br>
   - `etag`<br>
    **Type**: `STRING`<br>
    **Provider name**: `etag`<br>
    **Description**: A unique read-only string that changes whenever the resource is updated.<br>
   - `id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `id`<br>
    **Description**: Resource ID.<br>
   - `name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `name`<br>
    **Description**: The name of the resource that is unique within a resource group. This name can be used to access the resource.<br>
   - `protocol`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.protocol`<br>
    **Description**: Network protocol this rule applies to.<br>
   - `provisioning_state`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.provisioningState`<br>
    **Description**: The provisioning state of the security rule resource.<br>
   - `source_address_prefix`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.sourceAddressPrefix`<br>
    **Description**: The CIDR or source IP range. Asterisk '*' can also be used to match all source IPs. Default tags such as 'VirtualNetwork', 'AzureLoadBalancer' and 'Internet' can also be used. If this is an ingress rule, specifies where network traffic originates from.<br>
   - `source_address_prefixes`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `properties.sourceAddressPrefixes`<br>
    **Description**: The CIDR or source IP ranges.<br>
   - `source_port_range`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.sourcePortRange`<br>
    **Description**: The source port or range. Integer or range between 0 and 65535. Asterisk '*' can also be used to match all ports.<br>
   - `source_port_ranges`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `properties.sourcePortRanges`<br>
    **Description**: The source port ranges.<br>
   - `type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `type`<br>
    **Description**: The type of the resource.<br>
## `subscription_id`
**Type**: `STRING`<br>
## `subscription_name`
**Type**: `STRING`<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `type`
**Type**: `STRING`<br>
**Provider name**: `type`<br>
**Description**: Resource type.<br>
