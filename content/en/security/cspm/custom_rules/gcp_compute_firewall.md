---
title: gcp_compute_firewall
kind: documentation
aliases:
  - /security_platform/cspm/custom_rules/gcp_compute_firewall
---

## `allowed`
  **Type**: `UNORDERED_LIST_STRUCT`<br>
  **Description**: The list of ALLOW rules specified by this firewall. Each rule specifies a protocol and port-range tuple that describes a permitted connection.<br>
  **GCP name**: `allowed`
   - `ip_protocol`<br>
    **Type**: `STRING`<br>
        **Description**: The IP protocol to which this rule applies. The protocol type is required when creating a firewall rule. This value can either be one of the following well known protocol strings (`tcp`, `udp`, `icmp`, `esp`, `ah`, `ipip`, `sctp`) or the IP protocol number.<br>
        **GCP name**: `IPProtocol`<br>
   - `ports`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
        **Description**: An optional list of ports to which this rule applies. This field is only applicable for the UDP or TCP protocol. Each entry must be either an integer or a range. If not specified, this rule applies to connections through any port. Example inputs include: `["22"]`, `["80","443"]`, and `["12345-12349"]`.<br>
        **GCP name**: `ports`<br>
## `ancestors`
**Type**: `UNORDERED_LIST_STRING`<br>
## `creation_timestamp`
**Type**: `TIMESTAMP`<br>
    **Description**: [Output Only] Creation timestamp in RFC3339 text format.<br>
    **GCP name**: `creationTimestamp`<br>
## `denied`
  **Type**: `UNORDERED_LIST_STRUCT`<br>
  **Description**: The list of DENY rules specified by this firewall. Each rule specifies a protocol and port-range tuple that describes a denied connection.<br>
  **GCP name**: `denied`
   - `ip_protocol`<br>
    **Type**: `STRING`<br>
        **Description**: The IP protocol to which this rule applies. The protocol type is required when creating a firewall rule. This value can either be one of the following well known protocol strings (`tcp`, `udp`, `icmp`, `esp`, `ah`, `ipip`, `sctp`) or the IP protocol number.<br>
        **GCP name**: `IPProtocol`<br>
   - `ports`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
        **Description**: An optional list of ports to which this rule applies. This field is only applicable for the UDP or TCP protocol. Each entry must be either an integer or a range. If not specified, this rule applies to connections through any port. Example inputs include: `["22"]`, `["80","443"]`, and `["12345-12349"]`.<br>
        **GCP name**: `ports`<br>
## `description`
**Type**: `STRING`<br>
    **Description**: An optional description of this resource. Provide this field when you create the resource.<br>
    **GCP name**: `description`<br>
## `destination_ranges`
**Type**: `UNORDERED_LIST_STRING`<br>
    **Description**: If destination ranges are specified, the firewall rule applies only to traffic that has destination IP address in these ranges. These ranges must be expressed in CIDR format. Both IPv4 and IPv6 are supported.<br>
    **GCP name**: `destinationRanges`<br>
## `direction`
**Type**: `STRING`<br>
    **Description**: Direction of traffic to which this firewall applies, either `INGRESS` or `EGRESS`. The default is `INGRESS`. For `INGRESS` traffic, you cannot specify the destinationRanges field, and for `EGRESS` traffic, you cannot specify the sourceRanges or sourceTags fields. <br>
    **GCP name**: `direction`<br>
        **Possible values**:<br>
  - `EGRESS` - Indicates that firewall should apply to outgoing traffic.<br>
  - `INGRESS` - Indicates that firewall should apply to incoming traffic.<br>
## `disabled`
**Type**: `BOOLEAN`<br>
    **Description**: Denotes whether the firewall rule is disabled. When set to true, the firewall rule is not enforced and the network behaves as if it did not exist. If this is unspecified, the firewall rule will be enabled.<br>
    **GCP name**: `disabled`<br>
## `id`
**Type**: `STRING`<br>
    **Description**: [Output Only] The unique identifier for the resource. This identifier is defined by the server.<br>
    **GCP name**: `id`<br>
## `kind`
**Type**: `STRING`<br>
    **Description**: [Output Only] Type of the resource. Always `compute#firewall` for firewall rules.<br>
    **GCP name**: `kind`<br>
## `labels`
**Type**: `UNORDERED_LIST_STRING`<br>
## `log_config`
  **Type**: `STRUCT`<br>
  **Description**: This field denotes the logging options for a particular firewall rule. If logging is enabled, logs will be exported to Cloud Logging.<br>
  **GCP name**: `logConfig`
   - `enable`<br>
    **Type**: `BOOLEAN`<br>
        **Description**: This field denotes whether to enable logging for a particular firewall rule.<br>
        **GCP name**: `enable`<br>
   - `metadata`<br>
    **Type**: `STRING`<br>
        **Description**: This field can only be specified for a particular firewall rule if logging is enabled for that rule. This field denotes whether to include or exclude metadata for firewall logs. <br>
        **GCP name**: `metadata`<br>
            **Possible values**:<br>
      - `EXCLUDE_ALL_METADATA` <br>
      - `INCLUDE_ALL_METADATA` <br>
## `name`
**Type**: `STRING`<br>
    **Description**: Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression <code>[a-z]&#40;[-a-z0-9]*[a-z0-9]&#41;?</code>. The first character must be a lowercase letter, and all following characters (except for the last character) must be a dash, lowercase letter, or digit. The last character must be a lowercase letter or digit.<br>
    **GCP name**: `name`<br>
## `network`
**Type**: `STRING`<br>
**Description**: URL of the network resource for this firewall rule. If not specified when creating a firewall rule, the default network is used: `global`/`networks`/`default`. If you choose to specify this field, you can specify the network as a full or partial URL. For example, the following are all valid URLs: 
  - `https://www.googleapis.com/compute/v1/projects/myproject/global/networks/my-network `
  - `projects/myproject/global/networks/my-network `
  - `global/networks/default` <br>
**GCP name**: `network`<br>
## `organization_id`
**Type**: `STRING`<br>
## `parent`
**Type**: `STRING`<br>
## `priority`
**Type**: `INT32`<br>
    **Description**: Priority for this rule. This is an integer between `0` and `65535`, both inclusive. The default value is `1000`. Relative priorities determine which rule takes effect if multiple rules apply. Lower values indicate higher priority. For example, a rule with priority `0` has higher precedence than a rule with priority `1`. DENY rules take precedence over ALLOW rules if they have equal priority. Note that VPC networks have implied rules with a priority of `65535`. To avoid conflicts with the implied rules, use a priority number less than `65535`.<br>
    **GCP name**: `priority`<br>
## `project_id`
**Type**: `STRING`<br>
## `project_number`
**Type**: `STRING`<br>
## `resource_name`
**Type**: `STRING`<br>
## `self_link`
**Type**: `STRING`<br>
    **Description**: [Output Only] Server-defined URL for the resource.<br>
    **GCP name**: `selfLink`<br>
## `source_ranges`
**Type**: `UNORDERED_LIST_STRING`<br>
    **Description**: If source ranges are specified, the firewall rule applies only to traffic that has a source IP address in these ranges. These ranges must be expressed in CIDR format. One or both of `sourceRanges` and `sourceTags` may be set. If both fields are set, the rule applies to traffic that has a source IP address within `sourceRanges` OR a source IP from a resource with a matching tag listed in the `sourceTags` field. The connection does not need to match both fields for the rule to apply. Both IPv4 and IPv6 are supported.<br>
    **GCP name**: `sourceRanges`<br>
## `source_service_accounts`
**Type**: `UNORDERED_LIST_STRING`<br>
    **Description**: If source service accounts are specified, the firewall rules apply only to traffic originating from an instance with a service account in this list. Source service accounts cannot be used to control traffic to an instance's external IP address because service accounts are associated with an instance, not an IP address. `sourceRanges` can be set at the same time as `sourceServiceAccounts`. If both are set, the firewall applies to traffic that has a source IP address within the `sourceRanges` OR a source IP that belongs to an instance with service account listed in `sourceServiceAccount`. The connection does not need to match both fields for the firewall to apply. `sourceServiceAccounts` cannot be used at the same time as `sourceTags` or `targetTags`.<br>
    **GCP name**: `sourceServiceAccounts`<br>
## `source_tags`
**Type**: `UNORDERED_LIST_STRING`<br>
    **Description**: If source tags are specified, the firewall rule applies only to traffic with source IPs that match the primary network interfaces of VM instances that have the tag and are in the same VPC network. Source tags cannot be used to control traffic to an instance's external IP address, it only applies to traffic between instances in the same virtual network. Because tags are associated with instances, not IP addresses. One or both of `sourceRanges` and `sourceTags` may be set. If both fields are set, the firewall applies to traffic that has a source IP address within `sourceRanges` OR a source IP from a resource with a matching tag listed in the `sourceTags` field. The connection does not need to match both fields for the firewall to apply.<br>
    **GCP name**: `sourceTags`<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `target_service_accounts`
**Type**: `UNORDERED_LIST_STRING`<br>
    **Description**: A list of service accounts indicating sets of instances located in the network that may make network connections as specified in `allowed[]`. `targetServiceAccounts` cannot be used at the same time as `targetTags` or `sourceTags`. If neither `targetServiceAccounts` nor `targetTags` are specified, the firewall rule applies to all instances on the specified network.<br>
    **GCP name**: `targetServiceAccounts`<br>
## `target_tags`
**Type**: `UNORDERED_LIST_STRING`<br>
    **Description**: A list of tags that controls which instances the firewall rule applies to. If `targetTags` are specified, then the firewall rule applies only to instances in the VPC network that have one of those tags. If no `targetTags` are specified, the firewall rule applies to all instances on the specified network.<br>
    **GCP name**: `targetTags`<br>
