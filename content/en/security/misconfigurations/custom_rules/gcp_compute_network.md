---
dependencies: []
disable_edit: true
---
# gcp_compute_network

## `ancestors`
**Type**: `UNORDERED_LIST_STRING`<br>
## `auto_create_subnetworks`
**Type**: `BOOLEAN`<br>
**Provider name**: `autoCreateSubnetworks`<br>
**Description**: Must be set to create a VPC network. If not set, a legacy network is created. When set to true, the VPC network is created in auto mode. When set to false, the VPC network is created in custom mode. An auto mode VPC network starts with one subnet per region. Each subnet has a predetermined range as described in Auto mode VPC network IP ranges. For custom mode VPC networks, you can add subnets using the subnetworks insert method.<br>
## `creation_timestamp`
**Type**: `TIMESTAMP`<br>
**Provider name**: `creationTimestamp`<br>
**Description**: [Output Only] Creation timestamp in RFC3339 text format.<br>
## `description`
**Type**: `STRING`<br>
**Provider name**: `description`<br>
**Description**: An optional description of this resource. Provide this field when you create the resource.<br>
## `enable_ula_internal_ipv6`
**Type**: `BOOLEAN`<br>
**Provider name**: `enableUlaInternalIpv6`<br>
**Description**: Enable ULA internal ipv6 on this network. Enabling this feature will assign a /48 from google defined ULA prefix fd20::/20. .<br>
## `firewall_policy`
**Type**: `STRING`<br>
**Provider name**: `firewallPolicy`<br>
**Description**: [Output Only] URL of the firewall policy the network is associated with.<br>
## `gateway_ipv4`
**Type**: `STRING`<br>
**Provider name**: `gatewayIPv4`<br>
**Description**: [Output Only] The gateway address for default routing out of the network, selected by GCP.<br>
## `id`
**Type**: `STRING`<br>
**Provider name**: `id`<br>
**Description**: [Output Only] The unique identifier for the resource. This identifier is defined by the server.<br>
## `internal_ipv6_range`
**Type**: `STRING`<br>
**Provider name**: `internalIpv6Range`<br>
**Description**: When enabling ula internal ipv6, caller optionally can specify the /48 range they want from the google defined ULA prefix fd20::/20. The input must be a valid /48 ULA IPv6 address and must be within the fd20::/20. Operation will fail if the speficied /48 is already in used by another resource. If the field is not speficied, then a /48 range will be randomly allocated from fd20::/20 and returned via this field. .<br>
## `ipv4_range`
**Type**: `STRING`<br>
**Provider name**: `IPv4Range`<br>
**Description**: Deprecated in favor of subnet mode networks. The range of internal addresses that are legal on this network. This range is a CIDR specification, for example: 192.168.0.0/16. Provided by the client when the network is created.<br>
## `kind`
**Type**: `STRING`<br>
**Provider name**: `kind`<br>
**Description**: [Output Only] Type of the resource. Always compute#network for networks.<br>
## `labels`
**Type**: `UNORDERED_LIST_STRING`<br>
## `mtu`
**Type**: `INT32`<br>
**Provider name**: `mtu`<br>
**Description**: Maximum Transmission Unit in bytes. The minimum value for this field is 1300 and the maximum value is 8896. The suggested value is 1500, which is the default MTU used on the Internet, or 8896 if you want to use Jumbo frames. If unspecified, the value defaults to 1460.<br>
## `name`
**Type**: `STRING`<br>
**Provider name**: `name`<br>
**Description**: Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?`. The first character must be a lowercase letter, and all following characters (except for the last character) must be a dash, lowercase letter, or digit. The last character must be a lowercase letter or digit.<br>
## `network_firewall_policy_enforcement_order`
**Type**: `STRING`<br>
**Provider name**: `networkFirewallPolicyEnforcementOrder`<br>
**Description**: The network firewall policy enforcement order. Can be either AFTER_CLASSIC_FIREWALL or BEFORE_CLASSIC_FIREWALL. Defaults to AFTER_CLASSIC_FIREWALL if the field is not specified. <br>
**Possible values**:<br>
  - `AFTER_CLASSIC_FIREWALL`
  - `BEFORE_CLASSIC_FIREWALL`
## `organization_id`
**Type**: `STRING`<br>
## `parent`
**Type**: `STRING`<br>
## `peerings`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `peerings`<br>
**Description**: [Output Only] A list of network peerings for the resource.<br>
   - `auto_create_routes`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `autoCreateRoutes`<br>
    **Description**: This field will be deprecated soon. Use the exchange_subnet_routes field instead. Indicates whether full mesh connectivity is created and managed automatically between peered networks. Currently this field should always be true since Google Compute Engine will automatically create and manage subnetwork routes between two networks when peering state is ACTIVE.<br>
   - `exchange_subnet_routes`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `exchangeSubnetRoutes`<br>
    **Description**: Indicates whether full mesh connectivity is created and managed automatically between peered networks. Currently this field should always be true since Google Compute Engine will automatically create and manage subnetwork routes between two networks when peering state is ACTIVE.<br>
   - `export_custom_routes`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `exportCustomRoutes`<br>
    **Description**: Whether to export the custom routes to peer network. The default value is false.<br>
   - `export_subnet_routes_with_public_ip`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `exportSubnetRoutesWithPublicIp`<br>
    **Description**: Whether subnet routes with public IP range are exported. The default value is true, all subnet routes are exported. IPv4 special-use ranges are always exported to peers and are not controlled by this field.<br>
   - `import_custom_routes`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `importCustomRoutes`<br>
    **Description**: Whether to import the custom routes from peer network. The default value is false.<br>
   - `import_subnet_routes_with_public_ip`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `importSubnetRoutesWithPublicIp`<br>
    **Description**: Whether subnet routes with public IP range are imported. The default value is false. IPv4 special-use ranges are always imported from peers and are not controlled by this field.<br>
   - `name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `name`<br>
    **Description**: Name of this peering. Provided by the client when the peering is created. The name must comply with RFC1035. Specifically, the name must be 1-63 characters long and match regular expression `[a-z]([-a-z0-9]*[a-z0-9])?`. The first character must be a lowercase letter, and all the following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.<br>
   - `network`<br>
    **Type**: `STRING`<br>
    **Provider name**: `network`<br>
    **Description**: The URL of the peer network. It can be either full URL or partial URL. The peer network may belong to a different project. If the partial URL does not contain project, it is assumed that the peer network is in the same project as the current network.<br>
   - `peer_mtu`<br>
    **Type**: `INT32`<br>
    **Provider name**: `peerMtu`<br>
    **Description**: Maximum Transmission Unit in bytes.<br>
   - `stack_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `stackType`<br>
    **Description**: Which IP version(s) of traffic and routes are allowed to be imported or exported between peer networks. The default value is IPV4_ONLY. <br>
    **Possible values**:<br>
      - `IPV4_IPV6` - This Peering will allow IPv4 traffic and routes to be exchanged. Additionally if the matching peering is IPV4_IPV6, IPv6 traffic and routes will be exchanged as well.<br>
      - `IPV4_ONLY` - This Peering will only allow IPv4 traffic and routes to be exchanged, even if the matching peering is IPV4_IPV6.<br>
   - `state`<br>
    **Type**: `STRING`<br>
    **Provider name**: `state`<br>
    **Description**: [Output Only] State for the peering, either `ACTIVE` or `INACTIVE`. The peering is `ACTIVE` when there's a matching configuration in the peer network. <br>
    **Possible values**:<br>
      - `ACTIVE` - Matching configuration exists on the peer.<br>
      - `INACTIVE` - There is no matching configuration on the peer, including the case when peer does not exist.<br>
   - `state_details`<br>
    **Type**: `STRING`<br>
    **Provider name**: `stateDetails`<br>
    **Description**: [Output Only] Details about the current state of the peering.<br>
## `project_id`
**Type**: `STRING`<br>
## `project_number`
**Type**: `STRING`<br>
## `resource_name`
**Type**: `STRING`<br>
## `routing_config`
**Type**: `STRUCT`<br>
**Provider name**: `routingConfig`<br>
**Description**: The network-level routing configuration for this network. Used by Cloud Router to determine what type of network-wide routing behavior to enforce.<br>
   - `routing_mode`<br>
    **Type**: `STRING`<br>
    **Provider name**: `routingMode`<br>
    **Description**: The network-wide routing mode to use. If set to REGIONAL, this network's Cloud Routers will only advertise routes with subnets of this network in the same region as the router. If set to GLOBAL, this network's Cloud Routers will advertise routes with all subnets of this network, across regions. <br>
    **Possible values**:<br>
      - `GLOBAL`
      - `REGIONAL`
## `self_link`
**Type**: `STRING`<br>
**Provider name**: `selfLink`<br>
**Description**: [Output Only] Server-defined URL for the resource.<br>
## `self_link_with_id`
**Type**: `STRING`<br>
**Provider name**: `selfLinkWithId`<br>
**Description**: [Output Only] Server-defined URL for this resource with the resource id.<br>
## `subnetworks`
**Type**: `UNORDERED_LIST_STRING`<br>
**Provider name**: `subnetworks`<br>
**Description**: [Output Only] Server-defined fully-qualified URLs for all subnetworks in this VPC network.<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
