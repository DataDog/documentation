---
title: gcp_compute_network
kind: documentation
---

## `ancestors`
**Type**: `UNORDERED_LIST_STRING`<br>
## `auto_create_subnetworks`
**Type**: `BOOLEAN`<br>
    **Description**: Must be set to create a VPC network. If not set, a legacy network is created. When set to true, the VPC network is created in auto mode. When set to false, the VPC network is created in custom mode. An auto mode VPC network starts with one subnet per region. Each subnet has a predetermined range as described in Auto mode VPC network IP ranges. For custom mode VPC networks, you can add subnets using the subnetworks insert method.<br>
    **GCP name**: `autoCreateSubnetworks`<br>
## `creation_timestamp`
**Type**: `TIMESTAMP`<br>
    **Description**: [Output Only] Creation timestamp in RFC3339 text format.<br>
    **GCP name**: `creationTimestamp`<br>
## `description`
**Type**: `STRING`<br>
    **Description**: An optional description of this resource. Provide this field when you create the resource.<br>
    **GCP name**: `description`<br>
## `enable_ula_internal_ipv6`
**Type**: `BOOLEAN`<br>
    **Description**: Enable ULA internal ipv6 on this network. Enabling this feature will assign a /48 from google defined ULA prefix fd20::/20. .<br>
    **GCP name**: `enableUlaInternalIpv6`<br>
## `gateway_ipv4`
**Type**: `STRING`<br>
    **Description**: [Output Only] The gateway address for default routing out of the network, selected by GCP.<br>
    **GCP name**: `gatewayIPv4`<br>
## `id`
**Type**: `STRING`<br>
    **Description**: [Output Only] The unique identifier for the resource. This identifier is defined by the server.<br>
    **GCP name**: `id`<br>
## `internal_ipv6_range`
**Type**: `STRING`<br>
    **Description**: When enabling ula internal ipv6, caller optionally can specify the /48 range they want from the google defined ULA prefix fd20::/20. The input must be a valid /48 ULA IPv6 address and must be within the fd20::/20. Operation will fail if the speficied /48 is already in used by another resource. If the field is not speficied, then a /48 range will be randomly allocated from fd20::/20 and returned via this field. .<br>
    **GCP name**: `internalIpv6Range`<br>
## `ipv4_range`
**Type**: `STRING`<br>
    **Description**: Deprecated in favor of subnet mode networks. The range of internal addresses that are legal on this network. This range is a CIDR specification, for example: 192.168.0.0/16. Provided by the client when the network is created.<br>
    **GCP name**: `IPv4Range`<br>
## `kind`
**Type**: `STRING`<br>
    **Description**: [Output Only] Type of the resource. Always compute#network for networks.<br>
    **GCP name**: `kind`<br>
## `labels`
**Type**: `UNORDERED_LIST_STRING`<br>
## `mtu`
**Type**: `INT32`<br>
    **Description**: Maximum Transmission Unit in bytes. The minimum value for this field is 1460 and the maximum value is 1500 bytes. If unspecified, defaults to 1460.<br>
    **GCP name**: `mtu`<br>
## `name`
**Type**: `STRING`<br>
    **Description**: Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z][1]?`. The first character must be a lowercase letter, and all following characters (except for the last character) must be a dash, lowercase letter, or digit. The last character must be a lowercase letter or digit.<br>
    **GCP name**: `name`<br>
## `network_firewall_policy_enforcement_order`
**Type**: `STRING`<br>
    **Description**: The network firewall policy enforcement order. Can be either AFTER_CLASSIC_FIREWALL or BEFORE_CLASSIC_FIREWALL. Defaults to AFTER_CLASSIC_FIREWALL if the field is not specified. <br>
    **GCP name**: `networkFirewallPolicyEnforcementOrder`<br>
        **Possible values**:<br>
  - `AFTER_CLASSIC_FIREWALL` - <br>
  - `BEFORE_CLASSIC_FIREWALL` - <br>
## `organization_id`
**Type**: `STRING`<br>
## `parent`
**Type**: `STRING`<br>
## `peerings`
  **Type**: `UNORDERED_LIST_STRUCT`<br>
  **Description**: [Output Only] A list of network peerings for the resource.<br>
  **GCP name**: `peerings`
   - `auto_create_routes`<br>
    **Type**: `BOOLEAN`<br>
        **Description**: This field will be deprecated soon. Use the exchange_subnet_routes field instead. Indicates whether full mesh connectivity is created and managed automatically between peered networks. Currently this field should always be true since Google Compute Engine will automatically create and manage subnetwork routes between two networks when peering state is ACTIVE.<br>
        **GCP name**: `autoCreateRoutes`<br>
   - `exchange_subnet_routes`<br>
    **Type**: `BOOLEAN`<br>
        **Description**: Indicates whether full mesh connectivity is created and managed automatically between peered networks. Currently this field should always be true since Google Compute Engine will automatically create and manage subnetwork routes between two networks when peering state is ACTIVE.<br>
        **GCP name**: `exchangeSubnetRoutes`<br>
   - `export_custom_routes`<br>
    **Type**: `BOOLEAN`<br>
        **Description**: Whether to export the custom routes to peer network. The default value is false.<br>
        **GCP name**: `exportCustomRoutes`<br>
   - `export_subnet_routes_with_public_ip`<br>
    **Type**: `BOOLEAN`<br>
        **Description**: Whether subnet routes with public IP range are exported. The default value is true, all subnet routes are exported. IPv4 special-use ranges are always exported to peers and are not controlled by this field.<br>
        **GCP name**: `exportSubnetRoutesWithPublicIp`<br>
   - `import_custom_routes`<br>
    **Type**: `BOOLEAN`<br>
        **Description**: Whether to import the custom routes from peer network. The default value is false.<br>
        **GCP name**: `importCustomRoutes`<br>
   - `import_subnet_routes_with_public_ip`<br>
    **Type**: `BOOLEAN`<br>
        **Description**: Whether subnet routes with public IP range are imported. The default value is false. IPv4 special-use ranges are always imported from peers and are not controlled by this field.<br>
        **GCP name**: `importSubnetRoutesWithPublicIp`<br>
   - `name`<br>
    **Type**: `STRING`<br>
        **Description**: Name of this peering. Provided by the client when the peering is created. The name must comply with RFC1035. Specifically, the name must be 1-63 characters long and match regular expression <code>[a-z]&#40;[-a-z0-9]*[a-z0-9]&#41;?</code>. The first character must be a lowercase letter, and all the following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.<br>
        **GCP name**: `name`<br>
   - `network`<br>
    **Type**: `STRING`<br>
        **Description**: The URL of the peer network. It can be either full URL or partial URL. The peer network may belong to a different project. If the partial URL does not contain project, it is assumed that the peer network is in the same project as the current network.<br>
        **GCP name**: `network`<br>
   - `peer_mtu`<br>
    **Type**: `INT32`<br>
        **Description**: Maximum Transmission Unit in bytes.<br>
        **GCP name**: `peerMtu`<br>
   - `stack_type`<br>
    **Type**: `STRING`<br>
        **Description**: Which IP version(s) of traffic and routes are allowed to be imported or exported between peer networks. The default value is IPV4_ONLY. <br>
        **GCP name**: `stackType`<br>
            **Possible values**:<br>
      - `IPV4_IPV6` - This Peering will allow IPv4 traffic and routes to be exchanged. Additionally if the matching peering is IPV4_IPV6, IPv6 traffic and routes will be exchanged as well.<br>
      - `IPV4_ONLY` - This Peering will only allow IPv4 traffic and routes to be exchanged, even if the matching peering is IPV4_IPV6.<br>
   - `state`<br>
    **Type**: `STRING`<br>
        **Description**: [Output Only] State for the peering, either `ACTIVE` or `INACTIVE`. The peering is `ACTIVE` when there's a matching configuration in the peer network. <br>
        **GCP name**: `state`<br>
            **Possible values**:<br>
      - `ACTIVE` - Matching configuration exists on the peer.<br>
      - `INACTIVE` - There is no matching configuration on the peer, including the case when peer does not exist.<br>
   - `state_details`<br>
    **Type**: `STRING`<br>
        **Description**: [Output Only] Details about the current state of the peering.<br>
        **GCP name**: `stateDetails`<br>
## `project_id`
**Type**: `STRING`<br>
## `project_number`
**Type**: `STRING`<br>
## `resource_name`
**Type**: `STRING`<br>
## `routing_config`
  **Type**: `STRUCT`<br>
  **Description**: The network-level routing configuration for this network. Used by Cloud Router to determine what type of network-wide routing behavior to enforce.<br>
  **GCP name**: `routingConfig`
   - `routing_mode`<br>
    **Type**: `STRING`<br>
        **Description**: The network-wide routing mode to use. If set to REGIONAL, this network's Cloud Routers will only advertise routes with subnets of this network in the same region as the router. If set to GLOBAL, this network's Cloud Routers will advertise routes with all subnets of this network, across regions. <br>
        **GCP name**: `routingMode`<br>
            **Possible values**:<br>
      - `GLOBAL` - <br>
      - `REGIONAL` - <br>
## `self_link`
**Type**: `STRING`<br>
    **Description**: [Output Only] Server-defined URL for the resource.<br>
    **GCP name**: `selfLink`<br>
## `self_link_with_id`
**Type**: `STRING`<br>
    **Description**: [Output Only] Server-defined URL for this resource with the resource id.<br>
    **GCP name**: `selfLinkWithId`<br>
## `subnetworks`
**Type**: `UNORDERED_LIST_STRING`<br>
    **Description**: [Output Only] Server-defined fully-qualified URLs for all subnetworks in this VPC network.<br>
    **GCP name**: `subnetworks`<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>


[1]: [-a-z0-9]*[a-z0-9]
