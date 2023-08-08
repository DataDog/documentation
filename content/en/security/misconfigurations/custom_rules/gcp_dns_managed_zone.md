---
dependencies: []
disable_edit: true
---
# gcp_dns_managed_zone

## `ancestors`
**Type**: `UNORDERED_LIST_STRING`<br>
## `cloud_logging_config`
**Type**: `STRUCT`<br>
**Provider name**: `cloudLoggingConfig`<br>
   - `enable_logging`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `enableLogging`<br>
    **Description**: If set, enable query logging for this ManagedZone. False by default, making logging opt-in.<br>
   - `kind`<br>
    **Type**: `STRING`<br>
    **Provider name**: `kind`<br>
## `creation_time`
**Type**: `TIMESTAMP`<br>
**Provider name**: `creationTime`<br>
**Description**: The time that this resource was created on the server. This is in RFC3339 text format. Output only.<br>
## `description`
**Type**: `STRING`<br>
**Provider name**: `description`<br>
**Description**: A mutable string of at most 1024 characters associated with this resource for the user's convenience. Has no effect on the managed zone's function.<br>
## `dns_name`
**Type**: `STRING`<br>
**Provider name**: `dnsName`<br>
**Description**: The DNS name of this managed zone, for instance "example.com.".<br>
## `dnssec_config`
**Type**: `STRUCT`<br>
**Provider name**: `dnssecConfig`<br>
**Description**: DNSSEC configuration.<br>
   - `default_key_specs`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `defaultKeySpecs`<br>
    **Description**: Specifies parameters for generating initial DnsKeys for this ManagedZone. Can only be changed while the state is OFF.<br>
       - `algorithm`<br>
        **Type**: `STRING`<br>
        **Provider name**: `algorithm`<br>
        **Description**: String mnemonic specifying the DNSSEC algorithm of this key. <br>
        **Possible values**:<br>
          - `rsasha1`
          - `rsasha256`
          - `rsasha512`
          - `ecdsap256sha256`
          - `ecdsap384sha384`
       - `key_length`<br>
        **Type**: `INT32`<br>
        **Provider name**: `keyLength`<br>
        **Description**: Length of the keys in bits.<br>
       - `key_type`<br>
        **Type**: `STRING`<br>
        **Provider name**: `keyType`<br>
        **Description**: Specifies whether this is a key signing key (KSK) or a zone signing key (ZSK). Key signing keys have the Secure Entry Point flag set and, when active, are only used to sign resource record sets of type DNSKEY. Zone signing keys do not have the Secure Entry Point flag set and are used to sign all other types of resource record sets. <br>
        **Possible values**:<br>
          - `keySigning`
          - `zoneSigning`
       - `kind`<br>
        **Type**: `STRING`<br>
        **Provider name**: `kind`<br>
   - `kind`<br>
    **Type**: `STRING`<br>
    **Provider name**: `kind`<br>
   - `non_existence`<br>
    **Type**: `STRING`<br>
    **Provider name**: `nonExistence`<br>
    **Description**: Specifies the mechanism for authenticated denial-of-existence responses. Can only be changed while the state is OFF. <br>
    **Possible values**:<br>
      - `nsec`
      - `nsec3`
   - `state`<br>
    **Type**: `STRING`<br>
    **Provider name**: `state`<br>
    **Description**: Specifies whether DNSSEC is enabled, and what mode it is in. <br>
    **Possible values**:<br>
      - `off` - DNSSEC is disabled; the zone is not signed.<br>
      - `on` - DNSSEC is enabled; the zone is signed and fully managed.<br>
      - `transfer` - DNSSEC is enabled, but in a 'transfer' mode.<br>
## `forwarding_config`
**Type**: `STRUCT`<br>
**Provider name**: `forwardingConfig`<br>
**Description**: The presence for this field indicates that outbound forwarding is enabled for this zone. The value of this field contains the set of destinations to forward to.<br>
   - `kind`<br>
    **Type**: `STRING`<br>
    **Provider name**: `kind`<br>
   - `target_name_servers`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `targetNameServers`<br>
    **Description**: List of target name servers to forward to. Cloud DNS selects the best available name server if more than one target is given.<br>
       - `forwarding_path`<br>
        **Type**: `STRING`<br>
        **Provider name**: `forwardingPath`<br>
        **Description**: Forwarding path for this NameServerTarget. If unset or set to DEFAULT, Cloud DNS makes forwarding decisions based on IP address ranges; that is, RFC1918 addresses go to the VPC network, non-RFC1918 addresses go to the internet. When set to PRIVATE, Cloud DNS always sends queries through the VPC network for this target. <br>
        **Possible values**:<br>
          - `default` - Cloud DNS makes forwarding decisions based on address ranges; that is, RFC1918 addresses forward to the target through the VPC and non-RFC1918 addresses forward to the target through the internet<br>
          - `private` - Cloud DNS always forwards to this target through the VPC.<br>
       - `ipv4_address`<br>
        **Type**: `STRING`<br>
        **Provider name**: `ipv4Address`<br>
        **Description**: IPv4 address of a target name server.<br>
       - `ipv6_address`<br>
        **Type**: `STRING`<br>
        **Provider name**: `ipv6Address`<br>
        **Description**: IPv6 address of a target name server. Does not accept both fields (ipv4 & ipv6) being populated. Public preview as of November 2022.<br>
       - `kind`<br>
        **Type**: `STRING`<br>
        **Provider name**: `kind`<br>
## `id`
**Type**: `STRING`<br>
**Provider name**: `id`<br>
**Description**: Unique identifier for the resource; defined by the server (output only)<br>
## `kind`
**Type**: `STRING`<br>
**Provider name**: `kind`<br>
## `labels`
**Type**: `UNORDERED_LIST_STRING`<br>
## `name`
**Type**: `STRING`<br>
**Provider name**: `name`<br>
**Description**: User assigned name for this resource. Must be unique within the project. The name must be 1-63 characters long, must begin with a letter, end with a letter or digit, and only contain lowercase letters, digits or dashes.<br>
## `name_server_set`
**Type**: `STRING`<br>
**Provider name**: `nameServerSet`<br>
**Description**: Optionally specifies the NameServerSet for this ManagedZone. A NameServerSet is a set of DNS name servers that all host the same ManagedZones. Most users leave this field unset. If you need to use this field, contact your account team.<br>
## `name_servers`
**Type**: `UNORDERED_LIST_STRING`<br>
**Provider name**: `nameServers`<br>
**Description**: Delegate your managed_zone to these virtual name servers; defined by the server (output only)<br>
## `organization_id`
**Type**: `STRING`<br>
## `parent`
**Type**: `STRING`<br>
## `peering_config`
**Type**: `STRUCT`<br>
**Provider name**: `peeringConfig`<br>
**Description**: The presence of this field indicates that DNS Peering is enabled for this zone. The value of this field contains the network to peer with.<br>
   - `kind`<br>
    **Type**: `STRING`<br>
    **Provider name**: `kind`<br>
   - `target_network`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `targetNetwork`<br>
    **Description**: The network with which to peer.<br>
       - `deactivate_time`<br>
        **Type**: `STRING`<br>
        **Provider name**: `deactivateTime`<br>
        **Description**: The time at which the zone was deactivated, in RFC 3339 date-time format. An empty string indicates that the peering connection is active. The producer network can deactivate a zone. The zone is automatically deactivated if the producer network that the zone targeted is deleted. Output only.<br>
       - `kind`<br>
        **Type**: `STRING`<br>
        **Provider name**: `kind`<br>
       - `network_url`<br>
        **Type**: `STRING`<br>
        **Provider name**: `networkUrl`<br>
        **Description**: The fully qualified URL of the VPC network to forward queries to. This should be formatted like https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network}<br>
## `private_visibility_config`
**Type**: `STRUCT`<br>
**Provider name**: `privateVisibilityConfig`<br>
**Description**: For privately visible zones, the set of Virtual Private Cloud resources that the zone is visible from.<br>
   - `gke_clusters`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `gkeClusters`<br>
    **Description**: The list of Google Kubernetes Engine clusters that can see this zone.<br>
       - `gke_cluster_name`<br>
        **Type**: `STRING`<br>
        **Provider name**: `gkeClusterName`<br>
        **Description**: The resource name of the cluster to bind this ManagedZone to. This should be specified in the format like: projects/*/locations/*/clusters/*. This is referenced from GKE projects.locations.clusters.get API: https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.locations.clusters/get<br>
       - `kind`<br>
        **Type**: `STRING`<br>
        **Provider name**: `kind`<br>
   - `kind`<br>
    **Type**: `STRING`<br>
    **Provider name**: `kind`<br>
   - `networks`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `networks`<br>
    **Description**: The list of VPC networks that can see this zone.<br>
       - `kind`<br>
        **Type**: `STRING`<br>
        **Provider name**: `kind`<br>
       - `network_url`<br>
        **Type**: `STRING`<br>
        **Provider name**: `networkUrl`<br>
        **Description**: The fully qualified URL of the VPC network to bind to. Format this URL like https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network}<br>
## `project_id`
**Type**: `STRING`<br>
## `project_number`
**Type**: `STRING`<br>
## `resource_name`
**Type**: `STRING`<br>
## `reverse_lookup_config`
**Type**: `STRUCT`<br>
**Provider name**: `reverseLookupConfig`<br>
**Description**: The presence of this field indicates that this is a managed reverse lookup zone and Cloud DNS resolves reverse lookup queries using automatically configured records for VPC resources. This only applies to networks listed under private_visibility_config.<br>
   - `kind`<br>
    **Type**: `STRING`<br>
    **Provider name**: `kind`<br>
## `service_directory_config`
**Type**: `STRUCT`<br>
**Provider name**: `serviceDirectoryConfig`<br>
**Description**: This field links to the associated service directory namespace. Do not set this field for public zones or forwarding zones.<br>
   - `kind`<br>
    **Type**: `STRING`<br>
    **Provider name**: `kind`<br>
   - `namespace`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `namespace`<br>
    **Description**: Contains information about the namespace associated with the zone.<br>
       - `deletion_time`<br>
        **Type**: `STRING`<br>
        **Provider name**: `deletionTime`<br>
        **Description**: The time that the namespace backing this zone was deleted; an empty string if it still exists. This is in RFC3339 text format. Output only.<br>
       - `kind`<br>
        **Type**: `STRING`<br>
        **Provider name**: `kind`<br>
       - `namespace_url`<br>
        **Type**: `STRING`<br>
        **Provider name**: `namespaceUrl`<br>
        **Description**: The fully qualified URL of the namespace associated with the zone. Format must be https://servicedirectory.googleapis.com/v1/projects/{project}/locations/{location}/namespaces/{namespace}<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `visibility`
**Type**: `STRING`<br>
**Provider name**: `visibility`<br>
**Description**: The zone's visibility: public zones are exposed to the Internet, while private zones are visible only to Virtual Private Cloud resources. <br>
**Possible values**:<br>
  - `public`
  - `private`
