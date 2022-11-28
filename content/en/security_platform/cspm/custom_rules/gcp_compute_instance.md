---
title: gcp_compute_instance
kind: documentation
---

## `advanced_machine_features`
  **Type**: `STRUCT`<br>
  **Description**: Controls for advanced machine-related behavior features.<br>
  **GCP name**: `advancedMachineFeatures`
   - `enable_nested_virtualization`<br>
    **Type**: `BOOLEAN`<br>
        **Description**: Whether to enable nested virtualization or not (default is `false`).<br>
        **GCP name**: `enableNestedVirtualization`<br>
   - `enable_uefi_networking`<br>
    **Type**: `BOOLEAN`<br>
        **Description**: Whether to enable UEFI networking for instance creation.<br>
        **GCP name**: `enableUefiNetworking`<br>
   - `threads_per_core`<br>
    **Type**: `INT32`<br>
        **Description**: The number of threads per physical core. To disable simultaneous multithreading (SMT) set this to `1`. If unset, the maximum number of threads supported per core by the underlying processor is assumed.<br>
        **GCP name**: `threadsPerCore`<br>
## `ancestors`
**Type**: `UNORDERED_LIST_STRING`<br>
## `can_ip_forward`
**Type**: `BOOLEAN`<br>
    **Description**: Allows this instance to send and receive packets with non-matching destination or source IPs. This is required if you plan to use this instance to forward routes. For more information, see Enabling IP Forwarding .<br>
    **GCP name**: `canIpForward`<br>
## `confidential_instance_config`
  **Type**: `STRUCT`<br>
  **GCP name**: `confidentialInstanceConfig`
   - `enable_confidential_compute`<br>
    **Type**: `BOOLEAN`<br>
        **Description**: Defines whether the instance should have confidential compute enabled.<br>
        **GCP name**: `enableConfidentialCompute`<br>
## `cpu_platform`
**Type**: `STRING`<br>
    **Description**: [Output Only] The CPU platform used by this instance.<br>
    **GCP name**: `cpuPlatform`<br>
## `creation_timestamp`
**Type**: `TIMESTAMP`<br>
    **Description**: [Output Only] Creation timestamp in RFC3339 text format.<br>
    **GCP name**: `creationTimestamp`<br>
## `deletion_protection`
**Type**: `BOOLEAN`<br>
    **Description**: Whether the resource should be protected against deletion.<br>
    **GCP name**: `deletionProtection`<br>
## `description`
**Type**: `STRING`<br>
    **Description**: An optional description of this resource. Provide this property when you create the resource.<br>
    **GCP name**: `description`<br>
## `display_device`
  **Type**: `STRUCT`<br>
  **Description**: Enables display device for the instance.<br>
  **GCP name**: `displayDevice`
   - `enable_display`<br>
    **Type**: `BOOLEAN`<br>
        **Description**: Defines whether the instance has Display enabled.<br>
        **GCP name**: `enableDisplay`<br>
## `guest_accelerators`
  **Type**: `UNORDERED_LIST_STRUCT`<br>
  **Description**: A list of the type and count of accelerator cards attached to the instance.<br>
  **GCP name**: `guestAccelerators`
   - `accelerator_count`<br>
    **Type**: `INT32`<br>
        **Description**: The number of the guest accelerator cards exposed to this instance.<br>
        **GCP name**: `acceleratorCount`<br>
   - `accelerator_type`<br>
    **Type**: `STRING`<br>
        **Description**: Full or partial URL of the accelerator type resource to attach to this instance. For example: `projects/my-project/zones/us-central1-c/acceleratorTypes/nvidia-tesla-p100`. If you are creating an instance template, specify only the accelerator name. See GPUs on Compute Engine for a full list of accelerator types.<br>
        **GCP name**: `acceleratorType`<br>
## `hostname`
**Type**: `STRING`<br>
    **Description**: Specifies the hostname of the instance. The specified hostname must be RFC1035 compliant. If hostname is not specified, the default hostname is `[INSTANCE_NAME].c.[PROJECT_ID]`.internal when using the global DNS, and `[INSTANCE_NAME].[ZONE].c.[PROJECT_ID].internal` when using zonal DNS.<br>
    **GCP name**: `hostname`<br>
## `id`
**Type**: `STRING`<br>
    **Description**: [Output Only] The unique identifier for the resource. This identifier is defined by the server.<br>
    **GCP name**: `id`<br>
## `key_revocation_action_type`
**Type**: `STRING`<br>
    **Description**: `KeyRevocationActionType` of the instance. Supported options are `STOP` and `NONE`. The default value is `NONE` if it is not specified. <br>
    **GCP name**: `keyRevocationActionType`<br>
        **Possible values**:<br>
  - `KEY_REVOCATION_ACTION_TYPE_UNSPECIFIED` - Default value. This value is unused.<br>
  - `NONE` - Indicates user chose no operation.<br>
  - `STOP` - Indicates user chose to opt for VM shutdown on key revocation.<br>
## `kind`
**Type**: `STRING`<br>
    **Description**: [Output Only] Type of the resource. Always `compute#instance` for instances.<br>
    **GCP name**: `kind`<br>
## `labels`
**Type**: `UNORDERED_LIST_STRING`<br>
## `last_start_timestamp`
**Type**: `STRING`<br>
    **Description**: [Output Only] Last start timestamp in RFC3339 text format.<br>
    **GCP name**: `lastStartTimestamp`<br>
## `last_stop_timestamp`
**Type**: `STRING`<br>
    **Description**: [Output Only] Last stop timestamp in RFC3339 text format.<br>
    **GCP name**: `lastStopTimestamp`<br>
## `last_suspended_timestamp`
**Type**: `STRING`<br>
    **Description**: [Output Only] Last suspended timestamp in RFC3339 text format.<br>
    **GCP name**: `lastSuspendedTimestamp`<br>
## `machine_type`
**Type**: `STRING`<br>
    **Description**: Full or partial URL of the machine type resource to use for this instance, in the format: `zones/zone/machineTypes/machine-type`. This is provided by the client when the instance is created. For example, the following is a valid partial url to a predefined machine type: `zones/us-central1-f/machineTypes/n1-standard-1`. To create a custom machine type, provide a URL to a machine type in the following format, where `CPUS` is `1` or an even number up to `32` (`2`, `4`, `6`, and so on), and `MEMORY` is the total memory for this instance. Memory must be a multiple of 256 MB and must be supplied in MB (for example, 5 GB of memory is 5120 MB): `zones/zone/machineTypes/custom-<CPUS>-<MEMORY>` For example: `zones/us-central1-f/machineTypes/custom-4-5120`. For a full list of restrictions, read the Specifications for custom machine types.<br>
    **GCP name**: `machineType`<br>
## `metadata`
  **Type**: `STRUCT`<br>
  **Description**: The metadata key/value pairs assigned to this instance. This includes custom metadata and predefined keys.<br>
  **GCP name**: `metadata`
   - `items`<br>
      **Type**: `UNORDERED_LIST_STRUCT`<br>
      **Description**: Array of key/value pairs. The total size of all keys and values must be less than 512 KB.<br>
      **GCP name**: `items`
       - `key`<br>
        **Type**: `STRING`<br>
            **Description**: Key for the metadata entry. Keys must conform to the following regexp: `[a-zA-Z0-9-_]+`, and be less than 128 bytes in length. This is reflected as part of a URL in the metadata server. Additionally, to avoid ambiguity, keys must not conflict with any other metadata keys for the project.<br>
            **GCP name**: `key`<br>
       - `value`<br>
        **Type**: `STRING`<br>
            **Description**: Value for the metadata entry. These are free-form strings, and only have meaning as interpreted by the image running in the instance. The only restriction placed on values is that their size must be less than or equal to 262144 bytes (256 KiB).<br>
            **GCP name**: `value`<br>
   - `kind`<br>
    **Type**: `STRING`<br>
        **Description**: [Output Only] Type of the resource. Always `compute#metadata` for metadata.<br>
        **GCP name**: `kind`<br>
## `min_cpu_platform`
**Type**: `STRING`<br>
    **Description**: Specifies a minimum CPU platform for the VM instance. Applicable values are the friendly names of CPU platforms, such as `minCpuPlatform: "Intel Haswell"` or `minCpuPlatform: "Intel Sandy Bridge"`.<br>
    **GCP name**: `minCpuPlatform`<br>
## `name`
**Type**: `STRING`<br>
    **Description**: The name of the resource, provided by the client when initially creating the resource. The resource name must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression <code>[a-z]&#40;[-a-z0-9]*[a-z0-9]&#41;?</code> which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.<br>
    **GCP name**: `name`<br>
## `network_interfaces`
  **Type**: `UNORDERED_LIST_STRUCT`<br>
  **Description**: An array of network configurations for this instance. These specify how interfaces are configured to interact with other network services, such as connecting to the internet. Multiple interfaces are supported per instance.<br>
  **GCP name**: `networkInterfaces`
   - `access_configs`<br>
      **Type**: `UNORDERED_LIST_STRUCT`<br>
      **Description**: An array of configurations for this interface. Currently, only one access config, `ONE_TO_ONE_NAT`, is supported. If there are no `accessConfigs` specified, then this instance will have no external internet access.<br>
      **GCP name**: `accessConfigs`
       - `external_ipv6`<br>
        **Type**: `STRING`<br>
            **Description**: The first IPv6 address of the external IPv6 range associated with this instance, prefix length is stored in `externalIpv6PrefixLength` in `ipv6AccessConfig`. The field is output only, an IPv6 address from a subnetwork associated with the instance will be allocated dynamically.<br>
            **GCP name**: `externalIpv6`<br>
       - `external_ipv6_prefix_length`<br>
        **Type**: `INT32`<br>
            **Description**: The prefix length of the external IPv6 range.<br>
            **GCP name**: `externalIpv6PrefixLength`<br>
       - `kind`<br>
        **Type**: `STRING`<br>
            **Description**: [Output Only] Type of the resource. Always `compute#accessConfig` for access configs.<br>
            **GCP name**: `kind`<br>
       - `name`<br>
        **Type**: `STRING`<br>
            **Description**: The name of this access configuration. The default and recommended name is `External NAT`, but you can use any arbitrary string, such as `My external IP` or `Network Access`.<br>
            **GCP name**: `name`<br>
       - `nat_ip`<br>
        **Type**: `STRING`<br>
            **Description**: An external IP address associated with this instance. Specify an unused static external IP address available to the project or leave this field undefined to use an IP from a shared ephemeral IP address pool. If you specify a static external IP address, it must live in the same region as the zone of the instance.<br>
            **GCP name**: `natIP`<br>
       - `network_tier`<br>
        **Type**: `STRING`<br>
            **Description**: This signifies the networking tier used for configuring this access configuration and can only take the following values: `PREMIUM`, `STANDARD`. If an `AccessConfig` is specified without a valid external IP address, an ephemeral IP will be created with this `networkTier`. If an `AccessConfig` with a valid external IP address is specified, it must match that of the `networkTier` associated with the Address resource owning that IP. <br>
            **GCP name**: `networkTier`<br>
                **Possible values**:<br>
          - `FIXED_STANDARD` - Public internet quality with fixed bandwidth.<br>
          - `PREMIUM` - High quality, Google-grade network tier, support for all networking products.<br>
          - `STANDARD` - Public internet quality, only limited support for other networking products.<br>
          - `STANDARD_OVERRIDES_FIXED_STANDARD` - (Output only) Temporary tier for `FIXED_STANDARD` when fixed standard tier is expired or not configured.<br>
       - `public_ptr_domain_name`<br>
        **Type**: `STRING`<br>
            **Description**: The DNS domain name for the public PTR record. You can set this field only if the `setPublicPtr` field is enabled in `accessConfig`. If this field is unspecified in `ipv6AccessConfig`, a default PTR record will be created for first IP in associated external IPv6 range.<br>
            **GCP name**: `publicPtrDomainName`<br>
       - `set_public_ptr`<br>
        **Type**: `BOOLEAN`<br>
            **Description**: Specifies whether a public DNS PTR record should be created to map the external IP address of the instance to a DNS domain name. This field is not used in `ipv6AccessConfig`. A default PTR record will be created if the VM has external IPv6 range associated.<br>
            **GCP name**: `setPublicPtr`<br>
       - `type`<br>
        **Type**: `STRING`<br>
            **Description**: The type of configuration. The default and only option is `ONE_TO_ONE_NAT`. <br>
            **GCP name**: `type`<br>
                **Possible values**:<br>
          - `DIRECT_IPV6` <br>
          - `ONE_TO_ONE_NAT` <br>
   - `alias_ip_ranges`<br>
      **Type**: `UNORDERED_LIST_STRUCT`<br>
      **Description**: An array of alias IP ranges for this network interface. You can only specify this field for network interfaces in VPC networks.<br>
      **GCP name**: `aliasIpRanges`
       - `ip_cidr_range`<br>
        **Type**: `STRING`<br>
            **Description**: The IP alias ranges to allocate for this interface. This IP CIDR range must belong to the specified subnetwork and cannot contain IP addresses reserved by system or used by other network interfaces. This range may be a single IP address (such as `10.2.3.4`), a netmask (such as `/24`) or a CIDR-formatted string (such as `10.1.2.0/24`).<br>
            **GCP name**: `ipCidrRange`<br>
       - `subnetwork_range_name`<br>
        **Type**: `STRING`<br>
            **Description**: The name of a subnetwork secondary IP range from which to allocate an IP alias range. If not specified, the primary range of the subnetwork is used.<br>
            **GCP name**: `subnetworkRangeName`<br>
   - `internal_ipv6_prefix_length`<br>
    **Type**: `INT32`<br>
        **Description**: The prefix length of the primary internal IPv6 range.<br>
        **GCP name**: `internalIpv6PrefixLength`<br>
   - `ipv6_access_configs`<br>
      **Type**: `UNORDERED_LIST_STRUCT`<br>
      **Description**: An array of IPv6 access configurations for this interface. Currently, only one IPv6 access config, `DIRECT_IPV6`, is supported. If there is no `ipv6AccessConfig` specified, then this instance will have no external IPv6 Internet access.<br>
      **GCP name**: `ipv6AccessConfigs`
       - `external_ipv6`<br>
        **Type**: `STRING`<br>
            **Description**: The first IPv6 address of the external IPv6 range associated with this instance, prefix length is stored in `externalIpv6PrefixLength` in `ipv6AccessConfig`. The field is output only, an IPv6 address from a subnetwork associated with the instance will be allocated dynamically.<br>
            **GCP name**: `externalIpv6`<br>
       - `external_ipv6_prefix_length`<br>
        **Type**: `INT32`<br>
            **Description**: The prefix length of the external IPv6 range.<br>
            **GCP name**: `externalIpv6PrefixLength`<br>
       - `kind`<br>
        **Type**: `STRING`<br>
            **Description**: [Output Only] Type of the resource. Always `compute#accessConfig` for access configs.<br>
            **GCP name**: `kind`<br>
       - `name`<br>
        **Type**: `STRING`<br>
            **Description**: The name of this access configuration. The default and recommended name is `External NAT`, but you can use any arbitrary string, such as `My external IP` or `Network Access`.<br>
            **GCP name**: `name`<br>
       - `nat_ip`<br>
        **Type**: `STRING`<br>
            **Description**: An external IP address associated with this instance. Specify an unused static external IP address available to the project or leave this field undefined to use an IP from a shared ephemeral IP address pool. If you specify a static external IP address, it must live in the same region as the zone of the instance.<br>
            **GCP name**: `natIP`<br>
       - `network_tier`<br>
        **Type**: `STRING`<br>
            **Description**: This signifies the networking tier used for configuring this access configuration and can only take the following values: `PREMIUM`, `STANDARD`. If an `AccessConfig` is specified without a valid external IP address, an ephemeral IP will be created with this `networkTier`. If an `AccessConfig` with a valid external IP address is specified, it must match that of the `networkTier` associated with the Address resource owning that IP. <br>
            **GCP name**: `networkTier`<br>
                **Possible values**:<br>
          - `FIXED_STANDARD` - Public internet quality with fixed bandwidth.<br>
          - `PREMIUM` - High quality, Google-grade network tier, support for all networking products.<br>
          - `STANDARD` - Public internet quality, only limited support for other networking products.<br>
          - `STANDARD_OVERRIDES_FIXED_STANDARD` - (Output only) Temporary tier for `FIXED_STANDARD` when fixed standard tier is expired or not configured.<br>
       - `public_ptr_domain_name`<br>
        **Type**: `STRING`<br>
            **Description**: The DNS domain name for the public PTR record. You can set this field only if the `setPublicPtr` field is enabled in `accessConfig`. If this field is unspecified in `ipv6AccessConfig`, a default PTR record will be created for first IP in associated external IPv6 range.<br>
            **GCP name**: `publicPtrDomainName`<br>
       - `set_public_ptr`<br>
        **Type**: `BOOLEAN`<br>
            **Description**: Specifies whether a public DNS PTR record should be created to map the external IP address of the instance to a DNS domain name. This field is not used in `ipv6AccessConfig`. A default PTR record will be created if the VM has external IPv6 range associated.<br>
            **GCP name**: `setPublicPtr`<br>
       - `type`<br>
        **Type**: `STRING`<br>
            **Description**: The type of configuration. The default and only option is `ONE_TO_ONE_NAT`. <br>
            **GCP name**: `type`<br>
                **Possible values**:<br>
          - `DIRECT_IPV6` <br>
          - `ONE_TO_ONE_NAT` <br>
   - `ipv6_access_type`<br>
    **Type**: `STRING`<br>
        **Description**: [Output Only] One of `EXTERNAL`, `INTERNAL` to indicate whether the IP can be accessed from the Internet. This field is always inherited from its subnetwork. Valid only if stackType is `IPV4_IPV6`. <br>
        **GCP name**: `ipv6AccessType`<br>
            **Possible values**:<br>
      - `EXTERNAL` - This network interface can have external IPv6.<br>
      - `INTERNAL` - This network interface can have internal IPv6.<br>
   - `ipv6_address`<br>
    **Type**: `STRING`<br>
        **Description**: An IPv6 internal network address for this network interface.<br>
        **GCP name**: `ipv6Address`<br>
   - `kind`<br>
    **Type**: `STRING`<br>
        **Description**: [Output Only] Type of the resource. Always `compute#networkInterface` for network interfaces.<br>
        **GCP name**: `kind`<br>
   - `name`<br>
    **Type**: `STRING`<br>
        **Description**: [Output Only] The name of the network interface, which is generated by the server. For a VM, the network interface uses the nicN naming format. Where N is a value between 0 and 7. The default interface value is `nic0`.<br>
        **GCP name**: `name`<br>
   - `network`<br>
    **Type**: `STRING`<br>
    **Description**: URL of the VPC network resource for this instance. When creating an instance, if neither the network nor the subnetwork is specified, the default network `global`/`networks`/`default` is used. If the selected project doesn't have the default network, you must specify a network or subnet. If the network is not specified but the subnetwork is specified, the network is inferred. If you specify this property, you can specify the network as a full or partial URL. For example, the following are all valid URLs: <br>
    - `https://www.googleapis.com/compute/v1/projects/project/global/networks/network` <br>
    - `projects/project/global/networks/network` <br>
    - `global/networks/default` <br>
        **GCP name**: `network`<br>
   - `network_ip`<br>
    **Type**: `STRING`<br>
        **Description**: An IPv4 internal IP address to assign to the instance for this network interface. If not specified by the user, an unused internal IP is assigned by the system.<br>
        **GCP name**: `networkIP`<br>
   - `nic_type`<br>
    **Type**: `STRING`<br>
        **Description**: The type of vNIC to be used on this interface. This may be `gVNIC` or `VirtioNet`. <br>
        **GCP name**: `nicType`<br>
            **Possible values**:<br>
      - `GVNIC` - GVNIC<br>
      - `UNSPECIFIED_NIC_TYPE` - No type specified.<br>
      - `VIRTIO_NET` - VIRTIO<br>
   - `queue_count`<br>
    **Type**: `INT32`<br>
        **Description**: The networking queue count that's specified by users for the network interface. Both Rx and Tx queues will be set to this number. It'll be empty if not specified by the users.<br>
        **GCP name**: `queueCount`<br>
   - `stack_type`<br>
    **Type**: `STRING`<br>
        **Description**: The stack type for this network interface to identify whether the IPv6 feature is enabled or not. If not specified, `IPV4_ONLY` will be used. This field can be both set at instance creation and update network interface operations. <br>
        **GCP name**: `stackType`<br>
            **Possible values**:<br>
      - `IPV4_IPV6` - The network interface can have both IPv4 and IPv6 addresses.<br>
      - `IPV4_ONLY` - The network interface will be assigned IPv4 address.<br>
   - `subnetwork`<br>
    **Type**: `STRING`<br>
    **Description**: The URL of the Subnetwork resource for this instance. If the network resource is in legacy mode, do not specify this field. If the network is in auto subnet mode, specifying the subnetwork is optional. If the network is in custom subnet mode, specifying the subnetwork is required. If you specify this field, you can specify the subnetwork as a full or partial URL. For example, the following are all valid URLs: <br>
    - `https://www.googleapis.com/compute/v1/projects/project/regions/region/subnetworks/subnetwork` <br>
    - `regions/region/subnetworks/subnetwork` <br>
        **GCP name**: `subnetwork`<br>
## `network_performance_config`
  **Type**: `STRUCT`<br>
  **GCP name**: `networkPerformanceConfig`
   - `total_egress_bandwidth_tier`<br>
    **Type**: `STRING`<br>
## `organization_id`
**Type**: `STRING`<br>
## `params`
  **Type**: `STRUCT`<br>
  **Description**: Input only. [Input Only] Additional params passed with the request, but not persisted as part of resource payload.<br>
  **GCP name**: `params`
    
## `parent`
**Type**: `STRING`<br>
## `private_ipv6_google_access`
**Type**: `STRING`<br>
    **Description**: The private IPv6 Google access type for the VM. If not specified, use `INHERIT_FROM_SUBNETWORK` as default. <br>
    **GCP name**: `privateIpv6GoogleAccess`<br>
        **Possible values**:<br>
  - `ENABLE_BIDIRECTIONAL_ACCESS_TO_GOOGLE` - Bidirectional private IPv6 access to/from Google services. If specified, the subnetwork who is attached to the instance's default network interface will be assigned an internal IPv6 prefix if it doesn't have before.<br>
  - `ENABLE_OUTBOUND_VM_ACCESS_TO_GOOGLE` - Outbound private IPv6 access from VMs in this subnet to Google services. If specified, the subnetwork who is attached to the instance's default network interface will be assigned an internal IPv6 prefix if it doesn't have before.<br>
  - `INHERIT_FROM_SUBNETWORK` - Each network interface inherits `PrivateIpv6GoogleAccess` from its subnetwork.<br>
## `project_id`
**Type**: `STRING`<br>
## `project_number`
**Type**: `STRING`<br>
## `reservation_affinity`
  **Type**: `STRUCT`<br>
  **Description**: Specifies the reservations that this instance can consume from.<br>
  **GCP name**: `reservationAffinity`
   - `consume_reservation_type`<br>
    **Type**: `STRING`<br>
        **Description**: Specifies the type of reservation from which this instance can consume resources: `ANY_RESERVATION` (default), `SPECIFIC_RESERVATION`, or `NO_RESERVATION`. See Consuming reserved instances for examples. <br>
        **GCP name**: `consumeReservationType`<br>
            **Possible values**:<br>
      - `ANY_RESERVATION` - Consume any allocation available.<br>
      - `NO_RESERVATION` - Do not consume from any allocated capacity.<br>
      - `SPECIFIC_RESERVATION` - Must consume from a specific reservation. Must specify key value fields for specifying the reservations.<br>
      - `UNSPECIFIED` <br>
   - `key`<br>
    **Type**: `STRING`<br>
        **Description**: Corresponds to the label key of a reservation resource. To target a `SPECIFIC_RESERVATION` by name, specify `googleapis.com/reservation-name` as the key and specify the name of your reservation as its value.<br>
        **GCP name**: `key`<br>
   - `values`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
        **Description**: Corresponds to the label values of a reservation resource. This can be either a name to a reservation in the same project or `projects/different-project/reservations/some-reservation-name` to target a shared reservation in the same zone but in a different project.<br>
        **GCP name**: `values`<br>
## `resource_name`
**Type**: `STRING`<br>
## `resource_policies`
**Type**: `UNORDERED_LIST_STRING`<br>
    **Description**: Resource policies applied to this instance.<br>
    **GCP name**: `resourcePolicies`<br>
## `satisfies_pzs`
**Type**: `BOOLEAN`<br>
    **Description**: [Output Only] Reserved for future use.<br>
    **GCP name**: `satisfiesPzs`<br>
## `scheduling`
  **Type**: `STRUCT`<br>
  **Description**: Sets the scheduling options for this instance.<br>
  **GCP name**: `scheduling`
   - `automatic_restart`<br>
    **Type**: `BOOLEAN`<br>
        **Description**: Specifies whether the instance should be automatically restarted if it is terminated by Compute Engine (not terminated by a user). You can only set the automatic restart option for standard instances. Preemptible instances cannot be automatically restarted. By default, this is set to `true` so an instance is automatically restarted if it is terminated by Compute Engine.<br>
        **GCP name**: `automaticRestart`<br>
   - `instance_termination_action`<br>
    **Type**: `STRING`<br>
        **Description**: Specifies the termination action for the instance. <br>
        **GCP name**: `instanceTerminationAction`<br>
            **Possible values**:<br>
      - `DELETE` - Delete the VM.<br>
      - `INSTANCE_TERMINATION_ACTION_UNSPECIFIED` - Default value. This value is unused.<br>
      - `STOP` - Stop the VM without storing in-memory content. Default action.<br>
   - `location_hint`<br>
    **Type**: `STRING`<br>
        **Description**: An opaque location hint used to place the instance close to other resources. This field is for use by internal tools that use the public API.<br>
        **GCP name**: `locationHint`<br>
   - `min_node_cpus`<br>
    **Type**: `INT32`<br>
        **Description**: The minimum number of virtual CPUs this instance will consume when running on a sole-tenant node.<br>
        **GCP name**: `minNodeCpus`<br>
   - `node_affinities`<br>
      **Type**: `UNORDERED_LIST_STRUCT`<br>
      **Description**: A set of node affinity and anti-affinity configurations. Refer to Configuring node affinity for more information. Overrides `reservationAffinity`.<br>
      **GCP name**: `nodeAffinities`
       - `key`<br>
        **Type**: `STRING`<br>
            **Description**: Corresponds to the label key of Node resource.<br>
            **GCP name**: `key`<br>
       - `operator`<br>
        **Type**: `STRING`<br>
            **Description**: Defines the operation of node selection. Valid operators are `IN` for affinity and `NOT_IN` for anti-affinity. <br>
            **GCP name**: `operator`<br>
                **Possible values**:<br>
          - `IN` - Requires Compute Engine to seek for matched nodes.<br>
          - `NOT_IN` - Requires Compute Engine to avoid certain nodes.<br>
          - `OPERATOR_UNSPECIFIED` - <br>
       - `values`<br>
        **Type**: `UNORDERED_LIST_STRING`<br>
            **Description**: Corresponds to the label values of Node resource.<br>
            **GCP name**: `values`<br>
   - `on_host_maintenance`<br>
    **Type**: `STRING`<br>
        **Description**: Defines the maintenance behavior for this instance. For standard instances, the default behavior is `MIGRATE`. For preemptible instances, the default and only possible behavior is `TERMINATE`. For more information, see Set VM host maintenance policy. <br>
        **GCP name**: `onHostMaintenance`<br>
            **Possible values**:<br>
      - `MIGRATE` - [Default] Allows Compute Engine to automatically migrate instances out of the way of maintenance events.<br>
      - `TERMINATE` - Tells Compute Engine to terminate and (optionally) restart the instance away from the maintenance activity. If you would like your instance to be restarted, set the `automaticRestart` flag to true. Your instance may be restarted more than once, and it may be restarted outside the window of maintenance events.<br>
   - `preemptible`<br>
    **Type**: `BOOLEAN`<br>
        **Description**: Defines whether the instance is preemptible. This can only be set during instance creation or while the instance is stopped and therefore, in a `TERMINATED` state. See Instance Life Cycle for more information on the possible instance states.<br>
        **GCP name**: `preemptible`<br>
   - `provisioning_model`<br>
    **Type**: `STRING`<br>
        **Description**: Specifies the provisioning model of the instance. <br>
        **GCP name**: `provisioningModel`<br>
            **Possible values**:<br>
      - `SPOT` - Heavily discounted, no guaranteed runtime.<br>
      - `STANDARD` - Standard provisioning with user controlled runtime, no discounts.<br>
## `self_link`
**Type**: `STRING`<br>
    **Description**: [Output Only] Server-defined URL for this resource.<br>
    **GCP name**: `selfLink`<br>
## `service_accounts`
  **Type**: `UNORDERED_LIST_STRUCT`<br>
  **Description**: A list of service accounts, with their specified scopes, authorized for this instance. Only one service account per VM instance is supported. Service accounts generate access tokens that can be accessed through the metadata server and used to authenticate applications on the instance. See Service Accounts for more information.<br>
  **GCP name**: `serviceAccounts`
   - `email`<br>
    **Type**: `STRING`<br>
        **Description**: Email address of the service account.<br>
        **GCP name**: `email`<br>
   - `scopes`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
        **Description**: The list of scopes to be made available for this service account.<br>
        **GCP name**: `scopes`<br>
## `shielded_instance_config`
  **Type**: `STRUCT`<br>
  **GCP name**: `shieldedInstanceConfig`
   - `enable_integrity_monitoring`<br>
    **Type**: `BOOLEAN`<br>
        **Description**: Defines whether the instance has integrity monitoring enabled. Enabled by default.<br>
        **GCP name**: `enableIntegrityMonitoring`<br>
   - `enable_secure_boot`<br>
    **Type**: `BOOLEAN`<br>
        **Description**: Defines whether the instance has Secure Boot enabled. Disabled by default.<br>
        **GCP name**: `enableSecureBoot`<br>
   - `enable_vtpm`<br>
    **Type**: `BOOLEAN`<br>
        **Description**: Defines whether the instance has the vTPM enabled. Enabled by default.<br>
        **GCP name**: `enableVtpm`<br>
## `shielded_instance_integrity_policy`
  **Type**: `STRUCT`<br>
  **GCP name**: `shieldedInstanceIntegrityPolicy`
   - `update_auto_learn_policy`<br>
    **Type**: `BOOLEAN`<br>
        **Description**: Updates the integrity policy baseline using the measurements from the VM instance's most recent boot.<br>
        **GCP name**: `updateAutoLearnPolicy`<br>
## `source_machine_image`
**Type**: `STRING`<br>
    **Description**: Source machine image<br>
    **GCP name**: `sourceMachineImage`<br>
## `source_machine_image_encryption_key`
  **Type**: `STRUCT`<br>
  **Description**: Source machine image encryption key when creating an instance from a machine image.<br>
  **GCP name**: `sourceMachineImageEncryptionKey`
   - `kms_key_name`<br>
    **Type**: `STRING`<br>
        **Description**: The name of the encryption key that is stored in Google Cloud KMS. For example: `"kmsKeyName": "projects/kms_project_id/locations/region/keyRings/key_region/cryptoKeys/key"` <br>
        **GCP name**: `kmsKeyName`<br>
   - `kms_key_service_account`<br>
    **Type**: `STRING`<br>
        **Description**: The service account being used for the encryption request for the given KMS key. If absent, the Compute Engine default service account is used. For example: `"kmsKeyServiceAccount": "name@project_id.iam.gserviceaccount.com/"` <br>
        **GCP name**: `kmsKeyServiceAccount`<br>
   - `raw_key`<br>
    **Type**: `STRING`<br>
        **Description**: Specifies a 256-bit customer-supplied encryption key, encoded in RFC 4648 base64 to either encrypt or decrypt this resource. You can provide either the `rawKey` or the `rsaEncryptedKey`. For example: `"rawKey": "SGVsbG8gZnJvbSBHb29nbGUgQ2xvdWQgUGxhdGZvcm0="` <br>
        **GCP name**: `rawKey`<br>
   - `rsa_encrypted_key`<br>
    **Type**: `STRING`<br>
    **Description**: Specifies an RFC 4648 base64 encoded, RSA-wrapped 2048-bit customer-supplied encryption key to either encrypt or decrypt this resource. You can provide either the `rawKey` or the `rsaEncryptedKey`. For example: `"rsaEncryptedKey": "ieCx/NcW06PcT7Ep1X6LUTc/hLvUDYyzSZPPVCVPTVEohpeHASqC8uw5TzyO9U+Fka9JFHz0mBibXUInrC/jEk014kCK/NPjYgEMOyssZ4ZINPKxlUh2zn1bV+MCaTICrdmuSBTWlUUiFoDD6PYznLwh8ZNdaheCeZ8ewEXgFQ8V+sDroLaN3Xs3MDTXQEMMoNUXMCZEIpg9Vtp9x2oe=="`. The key must meet the following requirements before you can provide it to Compute Engine: <br>
    - The key is wrapped using a RSA public key certificate provided by Google. <br>
    - After being wrapped, the key must be encoded in RFC 4648 base64 encoding. Gets the [RSA public key certificate provided by Google][1] <br>
        **GCP name**: `rsaEncryptedKey`<br>
   - `sha256`<br>
    **Type**: `STRING`<br>
        **Description**: [Output only] The RFC 4648 base64 encoded SHA-256 hash of the customer-supplied encryption key that protects this resource.<br>
        **GCP name**: `sha256`<br>
## `start_restricted`
**Type**: `BOOLEAN`<br>
    **Description**: [Output Only] Whether a VM has been restricted for start because Compute Engine has detected suspicious activity.<br>
    **GCP name**: `startRestricted`<br>
## `status`
**Type**: `STRING`<br>
    **Description**: [Output Only] The status of the instance. One of the following values: `PROVISIONING`, `STAGING`, `RUNNING`, `STOPPING`, `SUSPENDING`, `SUSPENDED`, `REPAIRING`, and `TERMINATED`. For more information about the status of the instance, see Instance life cycle. <br>
    **GCP name**: `status`<br>
        **Possible values**:<br>
  - `DEPROVISIONING` - The Nanny is halted and we are performing tear down tasks like network deprogramming, releasing quota, IP, tearing down disks etc.<br>
  - `PROVISIONING` - Resources are being allocated for the instance.<br>
  - `REPAIRING` - The instance is in repair.<br>
  - `RUNNING` - The instance is running.<br>
  - `STAGING` - All required resources have been allocated and the instance is being started.<br>
  - `STOPPED` - The instance has stopped successfully.<br>
  - `STOPPING` - The instance is currently stopping (either being deleted or killed).<br>
  - `SUSPENDED` - The instance has suspended.<br>
  - `SUSPENDING` - The instance is suspending.<br>
  - `TERMINATED` - The instance has stopped (either by explicit action or underlying failure).<br>
## `status_message`
**Type**: `STRING`<br>
    **Description**: [Output Only] An optional, human-readable explanation of the status.<br>
    **GCP name**: `statusMessage`<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `zone`
**Type**: `STRING`<br>
    **Description**: [Output Only] URL of the zone where the instance resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body.<br>
    **GCP name**: `zone`<br>


[1]: https://cloud-certs.storage.googleapis.com/google-cloud-csek-ingress.pem
