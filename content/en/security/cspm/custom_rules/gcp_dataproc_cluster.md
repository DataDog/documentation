---
title: gcp_dataproc_cluster
kind: documentation
aliases:
  - /security_platform/cspm/custom_rules/gcp_dataproc_cluster
---

## `ancestors`
**Type**: `UNORDERED_LIST_STRING`<br>
## `cluster_name`
**Type**: `STRING`<br>
    **Description**: Required. The cluster name, which must be unique within a project. The name must start with a lowercase letter, and can contain up to 51 lowercase letters, numbers, and hyphens. It cannot end with a hyphen. The name of a deleted cluster can be reused.<br>
    **GCP name**: `clusterName`<br>
## `cluster_uuid`
**Type**: `STRING`<br>
    **Description**: Output only. A cluster UUID (Unique Universal Identifier). Dataproc generates this value when it creates the cluster.<br>
    **GCP name**: `clusterUuid`<br>
## `config`
  **Type**: `STRUCT`<br>
  **Description**: Optional. The cluster config for a cluster of Compute Engine Instances. Note that Dataproc may set default values, and values may change when clusters are updated. Exactly one of `ClusterConfig` or `VirtualClusterConfig` must be specified.<br>
  **GCP name**: `config`
   - `autoscaling_config`<br>
      **Type**: `STRUCT`<br>
      **Description**: Optional. Autoscaling config for the policy associated with the cluster. Cluster does not autoscale if this field is unset.<br>
      **GCP name**: `autoscalingConfig`
       - `policy_uri`<br>
        **Type**: `STRING`<br>
        **Description**: Optional. The autoscaling policy used by the cluster. Only resource names including `projectid` and location (region) are valid. Examples: <br>
          - `https://www.googleapis.com/compute/v1/projects/[project_id]/locations/[dataproc_region]/autoscalingPolicies/[policy_id]`<br>
          - `projects/[project_id]/locations/[dataproc_region]/autoscalingPolicies/[policy_id]` <br>
        Note that the policy must be in the same project and Dataproc region.<br>
            **GCP name**: `policyUri`<br>
   - `config_bucket`<br>
    **Type**: `STRING`<br>
        **Description**: Optional. A Cloud Storage bucket used to stage job dependencies, config files, and job driver console output. If you do not specify a staging bucket, Cloud Dataproc will determine a Cloud Storage location (US, ASIA, or EU) for your cluster's staging bucket according to the Compute Engine zone where your cluster is deployed, and then create and manage this project-level, per-location bucket. See [Dataproc staging and temp buckets][1]. This field requires a Cloud Storage bucket name, not a `gs://...` URI to a Cloud Storage bucket.<br>
        **GCP name**: `configBucket`<br>
   - `dataproc_metric_config`<br>
      **Type**: `STRUCT`<br>
      **Description**: Optional. The config for Dataproc metrics.<br>
      **GCP name**: `dataprocMetricConfig`
       - `metrics`<br>
          **Type**: `UNORDERED_LIST_STRUCT`<br>
          **Description**: Required. Metrics sources to enable.<br>
          **GCP name**: `metrics`
           - `metric_overrides`<br>
            **Type**: `UNORDERED_LIST_STRING`<br>
            **GCP name**: `metricOverrides`<br>
            **Description**: Optional. Specify one or more available [OSS metrics][2] to collect for the metric course (for the SPARK metric source, any [Spark metric][3] can be specified). Provide metrics in the following format: `METRIC_SOURCE:INSTANCE:GROUP:METRIC`. Use camel-case as appropriate. Examples: <br>
              - `yarn:ResourceManager:QueueMetrics:AppsCompleted`<br>
              - `spark:driver:DAGScheduler:job.allJobs`<br>
              - `sparkHistoryServer:JVM:Memory:NonHeapMemoryUsage.committed`<br>
              - `hiveserver2:JVM:Memory:NonHeapMemoryUsage.used` <br>
            Notes: <br>
              - Only the specified overridden metrics will be collected for the metric source. For example, if one or more `spark:executive` metrics are listed as metric overrides, other SPARK metrics will not be collected. <br>
              - The collection of the default metrics for other OSS metric sources is unaffected. For example, if both SPARK andd YARN metric sources are enabled, and overrides are provided for Spark metrics only, all default YARN metrics will be collected.<br>
           - `metric_source`<br>
            **Type**: `STRING`<br>
                **Description**: Required. Default metrics are collected unless metricOverrides are specified for the metric source. See [Available OSS metrics][2] for more information. <br>
                **GCP name**: `metricSource`<br>
                    **Possible values**:<br>
              - `METRIC_SOURCE_UNSPECIFIED` - Required unspecified metric source.<br>
              - `MONITORING_AGENT_DEFAULTS` - Default monitoring agent metrics. If this source is enabled, Dataproc enables the monitoring agent in Compute Engine, and collects default monitoring agent metrics, which are published with an `agent.googleapis.com` prefix.<br>
              - `HDFS` - HDFS metric source.<br>
              - `SPARK` - Spark metric source.<br>
              - `YARN` - YARN metric source.<br>
              - `SPARK_HISTORY_SERVER` - Spark History Server metric source.<br>
              - `HIVESERVER2` - Hiveserver2 metric source.<br>
   - `encryption_config`<br>
      **Type**: `STRUCT`<br>
      **Description**: Optional. Encryption settings for the cluster.<br>
      **GCP name**: `encryptionConfig`
       - `gce_pd_kms_key_name`<br>
        **Type**: `STRING`<br>
            **Description**: Optional. The Cloud KMS key name to use for PD disk encryption for all instances in the cluster.<br>
            **GCP name**: `gcePdKmsKeyName`<br>
   - `endpoint_config`<br>
      **Type**: `STRUCT`<br>
      **Description**: Optional. Port/endpoint configuration for this cluster<br>
      **GCP name**: `endpointConfig`
       - `enable_http_port_access`<br>
        **Type**: `BOOLEAN`<br>
            **Description**: Optional. If `true`, enables HTTP access to specific ports on the cluster from external sources. Defaults to `false`.<br>
            **GCP name**: `enableHttpPortAccess`<br>
   - `gce_cluster_config`<br>
      **Type**: `STRUCT`<br>
      **Description**: Optional. The shared Compute Engine config settings for all instances in a cluster.<br>
      **GCP name**: `gceClusterConfig`
       - `confidential_instance_config`<br>
          **Type**: `STRUCT`<br>
          **Description**: Optional. Confidential Instance Config for clusters using [Confidential VMs][4].<br>
          **GCP name**: `confidentialInstanceConfig`
           - `enable_confidential_compute`<br>
            **Type**: `BOOLEAN`<br>
                **Description**: Optional. Defines whether the instance should have confidential compute enabled.<br>
                **GCP name**: `enableConfidentialCompute`<br>
       - `internal_ip_only`<br>
        **Type**: `BOOLEAN`<br>
            **Description**: Optional. If `true`, all instances in the cluster will only have internal IP addresses. By default, clusters are not restricted to internal IP addresses, and will have ephemeral external IP addresses assigned to each instance. This `internal_ip_only` restriction can only be enabled for subnetwork enabled networks, and all off-cluster dependencies must be configured to be accessible without external IP addresses.<br>
            **GCP name**: `internalIpOnly`<br>
       - `network_uri`<br>
        **Type**: `STRING`<br>
        **Description**: Optional. The Compute Engine network to be used for machine communications. Cannot be specified with `subnetwork_uri`. If neither `network_uri` nor `subnetwork_uri` is specified, the "default" network of the project is used, if it exists. Cannot be a Custom Subnet Network. See [Using Subnetworks][5] for more information. A full URL, partial URI, or short name are valid. Examples: <br>
        - `https://www.googleapis.com/compute/v1/projects/[project_id]/regions/global/default` <br>
        - `projects/[project_id]/regions/global/default`<br>
        - `default`<br>
            **GCP name**: `networkUri`<br>
       - `node_group_affinity`<br>
          **Type**: `STRUCT`<br>
          **Description**: Optional. Node Group Affinity for sole-tenant clusters.<br>
          **GCP name**: `nodeGroupAffinity`
           - `node_group_uri`<br>
            **Type**: `STRING`<br>
            **Description**: Required. The URI of a sole-tenant [node group resource][6] that the cluster will be created on.A full URL, partial URI, or node group name are valid. Examples: <br>
            - `https://www.googleapis.com/compute/v1/projects/[project_id]/zones/us-central1-a/nodeGroups/node-group-1`<br>
            - `projects/[project_id]/zones/us-central1-a/nodeGroups/node-group-1`<br>
            - `node-group-1`<br>
                **GCP name**: `nodeGroupUri`<br>
       - `private_ipv6_google_access`<br>
        **Type**: `STRING`<br>
            **Description**: Optional. The type of IPv6 access for a cluster. <br>
            **GCP name**: `privateIpv6GoogleAccess`<br>
                **Possible values**:<br>
          - `PRIVATE_IPV6_GOOGLE_ACCESS_UNSPECIFIED` - If unspecified, Compute Engine default behavior will apply, which is the same as `INHERIT_FROM_SUBNETWORK`.<br>
          - `INHERIT_FROM_SUBNETWORK` - Private access to and from Google Services configuration inherited from the subnetwork configuration. This is the default Compute Engine behavior.<br>
          - `OUTBOUND` - Enables outbound private IPv6 access to Google Services from the Dataproc cluster.<br>
          - `BIDIRECTIONAL` - Enables bidirectional private IPv6 access between Google Services and the Dataproc cluster.<br>
       - `reservation_affinity`<br>
          **Type**: `STRUCT`<br>
          **Description**: Optional. Reservation Affinity for consuming Zonal reservation.<br>
          **GCP name**: `reservationAffinity`
           - `consume_reservation_type`<br>
            **Type**: `STRING`<br>
                **Description**: Optional. Type of reservation to consume <br>
                **GCP name**: `consumeReservationType`<br>
                    **Possible values**:<br>
              - `TYPE_UNSPECIFIED` <br>
              - `NO_RESERVATION` - Do not consume from any allocated capacity.<br>
              - `ANY_RESERVATION` - Consume any reservation available.<br>
              - `SPECIFIC_RESERVATION` - Must consume from a specific reservation. Must specify key value fields for specifying the reservations.<br>
           - `key`<br>
            **Type**: `STRING`<br>
                **Description**: Optional. Corresponds to the label key of reservation resource.<br>
                **GCP name**: `key`<br>
           - `values`<br>
            **Type**: `UNORDERED_LIST_STRING`<br>
                **Description**: Optional. Corresponds to the label values of reservation resource.<br>
                **GCP name**: `values`<br>
       - `service_account`<br>
        **Type**: `STRING`<br>
            **Description**: Optional. The [Dataproc service account][7]. Also see [VM Data Plane identity][8]. Used by Dataproc cluster VM instances to access Google Cloud Platform services. If not specified, the Compute Engine [default service account][9] is used.<br>
            **GCP name**: `serviceAccount`<br>
       - `service_account_scopes`<br>
        **Type**: `UNORDERED_LIST_STRING`<br>
        **Description**: Optional. The URIs of service account scopes to be included in Compute Engine instances. The following base set of scopes is always included: <br>
        - `https://www.googleapis.com/auth/cloud.useraccounts.readonly`<br>
        - `https://www.googleapis.com/auth/devstorage.read_write`<br>
        - `https://www.googleapis.com/auth/logging.write`<br>
        If no scopes are specified, the following defaults are also provided: <br>
        - `https://www.googleapis.com/auth/bigquery`<br>
        - `https://www.googleapis.com/auth/bigtable.admin.table`<br>
        - `https://www.googleapis.com/auth/bigtable.data`<br>
        - `https://www.googleapis.com/auth/devstorage.full_control`<br>
            **GCP name**: `serviceAccountScopes`<br>
       - `shielded_instance_config`<br>
          **Type**: `STRUCT`<br>
          **Description**: Optional. Shielded Instance Config for clusters using Compute Engine [Shielded VMs][10].<br>
          **GCP name**: `shieldedInstanceConfig`
           - `enable_integrity_monitoring`<br>
            **Type**: `BOOLEAN`<br>
                **Description**: Optional. Defines whether instances have integrity monitoring enabled.<br>
                **GCP name**: `enableIntegrityMonitoring`<br>
           - `enable_secure_boot`<br>
            **Type**: `BOOLEAN`<br>
                **Description**: Optional. Defines whether instances have Secure Boot enabled.<br>
                **GCP name**: `enableSecureBoot`<br>
           - `enable_vtpm`<br>
            **Type**: `BOOLEAN`<br>
                **Description**: Optional. Defines whether instances have the vTPM enabled.<br>
                **GCP name**: `enableVtpm`<br>
       - `subnetwork_uri`<br>
        **Type**: `STRING`<br>
        **Description**: Optional. The Compute Engine subnetwork to be used for machine communications. Cannot be specified with `network_uri`. A full URL, partial URI, or short name are valid. Examples:<br>
        - `https://www.googleapis.com/compute/v1/projects/[project_id]/regions/us-east1/subnetworks/sub0`<br>
        - `projects/[project_id]/regions/us-east1/subnetworks/sub0`<br>
        - `sub0`<br>
            **GCP name**: `subnetworkUri`<br>
       - `zone_uri`<br>
        **Type**: `STRING`<br>
        **Description**: Optional. The zone where the Compute Engine cluster will be located. On a create request, it is required in the "global" region. If omitted in a non-global Dataproc region, the service will pick a zone in the corresponding Compute Engine region. On a get request, zone will always be present. A full URL, partial URI, or short name are valid. Examples: <br>
        - `https://www.googleapis.com/compute/v1/projects/[project_id]/zones/[zone]`<br>
        - `projects/[project_id]/zones/[zone]`<br>
        - `us-central1-f`<br>
            **GCP name**: `zoneUri`<br>
   - `gke_cluster_config`<br>
      **Type**: `STRUCT`<br>
      **Description**: Optional. BETA. The Kubernetes Engine config for Dataproc clusters deployed to The Kubernetes Engine config for Dataproc clusters deployed to Kubernetes. These config settings are mutually exclusive with Compute Engine-based options, such as `gce_cluster_config`, `master_config`, `worker_config`, `secondary_worker_config`, and `autoscaling_config`.<br>
      **GCP name**: `gkeClusterConfig`
       - `gke_cluster_target`<br>
        **Type**: `STRING`<br>
            **Description**: Optional. A target GKE cluster to deploy to. It must be in the same project and region as the Dataproc cluster (the GKE cluster can be zonal or regional). Format: `projects/{project}/locations/{location}/clusters/{cluster_id}`<br>
            **GCP name**: `gkeClusterTarget`<br>
       - `namespaced_gke_deployment_target`<br>
          **Type**: `STRUCT`<br>
          **Description**: Optional. Deprecated. Use `gkeClusterTarget`. Used only for the deprecated beta. A target for the deployment.<br>
          **GCP name**: `namespacedGkeDeploymentTarget`
           - `cluster_namespace`<br>
            **Type**: `STRING`<br>
                **Description**: Optional. A namespace within the GKE cluster to deploy into.<br>
                **GCP name**: `clusterNamespace`<br>
           - `target_gke_cluster`<br>
            **Type**: `STRING`<br>
                **Description**: Optional. The target GKE cluster to deploy to. Format: `projects/{project}/locations/{location}/clusters/{cluster_id}`<br>
                **GCP name**: `targetGkeCluster`<br>
       - `node_pool_target`<br>
          **Type**: `UNORDERED_LIST_STRUCT`<br>
          **Description**: Optional. GKE node pools where workloads will be scheduled. At least one node pool must be assigned the DEFAULT `GkeNodePoolTarget.Role`. If a `GkeNodePoolTarget` is not specified, Dataproc constructs a DEFAULT `GkeNodePoolTarget`. Each role can be given to only one `GkeNodePoolTarget`. All node pools must have the same location settings.<br>
          **GCP name**: `nodePoolTarget`
           - `node_pool`<br>
            **Type**: `STRING`<br>
                **Description**: Required. The target GKE node pool. Format: `projects/{project}/locations/{location}/clusters/{cluster}/nodePools/{node_pool}`<br>
                **GCP name**: `nodePool`<br>
           - `node_pool_config`<br>
              **Type**: `STRUCT`<br>
              **Description**: Input only. The configuration for the GKE node pool. If specified, Dataproc attempts to create a node pool with the specified shape. If one with the same name already exists, it is verified against all specified fields. If a field differs, the virtual cluster creation will fail. If omitted, any node pool with the specified name is used. If a node pool with the specified name does not exist, Dataproc create a node pool with default values.This is an input only field. It will not be returned by the API.<br>
              **GCP name**: `nodePoolConfig`
               - `autoscaling`<br>
                  **Type**: `STRUCT`<br>
                  **Description**: Optional. The autoscaler configuration for this node pool. The autoscaler is enabled only when a valid configuration is present.<br>
                  **GCP name**: `autoscaling`
                   - `max_node_count`<br>
                    **Type**: `INT32`<br>
                        **Description**: The maximum number of nodes in the node pool. Must be greater than or equal to `min_node_count`, and must be greater than `0`. Note: Quota must be sufficient to scale up the cluster.<br>
                        **GCP name**: `maxNodeCount`<br>
                   - `min_node_count`<br>
                    **Type**: `INT32`<br>
                        **Description**: The minimum number of nodes in the node pool. Must be greater than or equal to `0` and less than or equal to `max_node_count`.<br>
                        **GCP name**: `minNodeCount`<br>
               - `config`<br>
                  **Type**: `STRUCT`<br>
                  **Description**: Optional. The node pool configuration.<br>
                  **GCP name**: `config`
                   - `accelerators`<br>
                      **Type**: `UNORDERED_LIST_STRUCT`<br>
                      **Description**: Optional. A list of [hardware accelerators][11] to attach to each node.<br>
                      **GCP name**: `accelerators`
                       - `accelerator_count`<br>
                        **Type**: `INT64`<br>
                            **Description**: The number of accelerator cards exposed to an instance.<br>
                            **GCP name**: `acceleratorCount`<br>
                       - `accelerator_type`<br>
                        **Type**: `STRING`<br>
                            **Description**: The accelerator type resource name (see GPUs on Compute Engine).<br>
                            **GCP name**: `acceleratorType`<br>
                       - `gpu_partition_size`<br>
                        **Type**: `STRING`<br>
                            **Description**: Size of partitions to create on the GPU. Valid values are described in the [NVIDIA MIG user guide][12].<br>
                            **GCP name**: `gpuPartitionSize`<br>
                   - `boot_disk_kms_key`<br>
                    **Type**: `STRING`<br>
                        **Description**: Optional. The [Customer Managed Encryption Key (CMEK)][13] used to encrypt the boot disk attached to each node in the node pool. Specify the key using the following format: `projects/KEY_PROJECT_ID/locations/LOCATION /keyRings/RING_NAME/cryptoKeys/KEY_NAME`.<br>
                        **GCP name**: `bootDiskKmsKey`<br>
                   - `local_ssd_count`<br>
                    **Type**: `INT32`<br>
                        **Description**: Optional. The number of local SSD disks to attach to the node, which is limited by the maximum number of disks allowable per zone. See [Adding Local SSDs][14].<br>
                        **GCP name**: `localSsdCount`<br>
                   - `machine_type`<br>
                    **Type**: `STRING`<br>
                        **Description**: Optional. The name of a Compute Engine [machine type][15].<br>
                        **GCP name**: `machineType`<br>
                   - `min_cpu_platform`<br>
                    **Type**: `STRING`<br>
                        **Description**: Optional. [Minimum CPU platform][16] to be used by this instance. The instance may be scheduled on the specified or a newer CPU platform. Specify the friendly names of CPU platforms, such as `Intel Haswell` or `Intel Sandy Bridge`.<br>
                        **GCP name**: `minCpuPlatform`<br>
                   - `preemptible`<br>
                    **Type**: `BOOLEAN`<br>
                        **Description**: Optional. Whether the nodes are created as [preemptible VM instances][17]. Preemptible nodes cannot be used in a node pool with the CONTROLLER role or in the DEFAULT node pool if the CONTROLLER role is not assigned (the DEFAULT node pool will assume the CONTROLLER role).<br>
                        **GCP name**: `preemptible`<br>
                   - `spot`<br>
                    **Type**: `BOOLEAN`<br>
                        **Description**: Optional. Spot flag for enabling Spot VM, which is a rebrand of the existing preemptible flag.<br>
                        **GCP name**: `spot`<br>
               - `locations`<br>
                **Type**: `UNORDERED_LIST_STRING`<br>
                    **Description**: Optional. The list of [Compute Engine zones][18] where node pool nodes associated with a Dataproc on GKE virtual cluster will be located. Note: All node pools associated with a virtual cluster must be located in the same region as the virtual cluster, and they must be located in the same zone within that region. If a location is not specified during node pool creation, Dataproc on GKE will choose the zone.<br>
                    **GCP name**: `locations`<br>
           - `roles`<br>
            **Type**: `UNORDERED_LIST_STRING`<br>
                **Description**: Required. The roles associated with the GKE node pool.<br>
                **GCP name**: `roles`<br>
   - `initialization_actions`<br>
      **Type**: `UNORDERED_LIST_STRUCT`<br>
      **Description**: Optional. Commands to execute on each node after config is completed. By default, executables are run on master and all worker nodes. You can test a node's role metadata to run an executable on a master or worker node, as shown below using `curl` (you can also use `wget`): 
      `ROLE=$(curl -H Metadata-Flavor:Google http://metadata/computeMetadata/v1/instance/attributes/dataproc-role) if [[ "${ROLE}" == 'Master' ]]; then ... master specific actions ... else ... worker specific actions ... fi `<br>
      **GCP name**: `initializationActions`
       - `executable_file`<br>
        **Type**: `STRING`<br>
            **Description**: Required. Cloud Storage URI of executable file.<br>
            **GCP name**: `executableFile`<br>
       - `execution_timeout`<br>
        **Type**: `STRING`<br>
            **Description**: Optional. Amount of time executable has to complete. Default is 10 minutes.See [JSON representation of Duration][19]. Cluster creation fails with an explanatory error message (the name of the executable that caused the error and the exceeded timeout period) if the executable is not completed at end of the timeout period.<br>
            **GCP name**: `executionTimeout`<br>
   - `lifecycle_config`<br>
      **Type**: `STRUCT`<br>
      **Description**: Optional. Lifecycle setting for the cluster.<br>
      **GCP name**: `lifecycleConfig`
       - `auto_delete_time`<br>
        **Type**: `TIMESTAMP`<br>
            **Description**: Optional. The time when cluster will be auto-deleted. See [JSON representation of Timestamp][19].<br>
            **GCP name**: `autoDeleteTime`<br>
       - `auto_delete_ttl`<br>
        **Type**: `STRING`<br>
            **Description**: Optional. The lifetime duration of cluster. The cluster will be auto-deleted at the end of this period. Minimum value is 10 minutes; maximum value is 14 days. See [JSON representation of Duration][19].<br>
            **GCP name**: `autoDeleteTtl`<br>
       - `idle_delete_ttl`<br>
        **Type**: `STRING`<br>
            **Description**: Optional. The duration to keep the cluster alive while idling (when no jobs are running). Passing this threshold will cause the cluster to be deleted. Minimum value is 5 minutes; maximum value is 14 days. See [JSON representation of Duration][19]).<br>
            **GCP name**: `idleDeleteTtl`<br>
       - `idle_start_time`<br>
        **Type**: `TIMESTAMP`<br>
            **Description**: Output only. The time when cluster became idle (most recent job finished) and became eligible for deletion due to idleness. See [JSON representation of Timestamp][19]).<br>
            **GCP name**: `idleStartTime`<br>
   - `master_config`<br>
      **Type**: `STRUCT`<br>
      **Description**: Optional. The Compute Engine config settings for the cluster's master instance.<br>
      **GCP name**: `masterConfig`
       - `accelerators`<br>
          **Type**: `UNORDERED_LIST_STRUCT`<br>
          **Description**: Optional. The Compute Engine accelerator configuration for these instances.<br>
          **GCP name**: `accelerators`
           - `accelerator_count`<br>
            **Type**: `INT32`<br>
                **Description**: The number of the accelerator cards of this type exposed to this instance.<br>
                **GCP name**: `acceleratorCount`<br>
           - `accelerator_type_uri`<br>
            **Type**: `STRING`<br>
            **Description**: Full URL, partial URI, or short name of the accelerator type resource to expose to this instance. See [Compute Engine AcceleratorTypes][20]. Examples: <br>
            - `https://www.googleapis.com/compute/beta/projects/[project_id]/zones/us-east1-a/acceleratorTypes/nvidia-tesla-k80`<br>
            - `projects/[project_id]/zones/us-east1-a/acceleratorTypes/nvidia-tesla-k80` <br>
            - `nvidia-tesla-k80`<br>
            Auto Zone Exception: If you are using the Dataproc [Auto Zone Placement][21] feature, you must use the short name of the accelerator type resource, for example, `nvidia-tesla-k80`.<br>
                **GCP name**: `acceleratorTypeUri`<br>
       - `disk_config`<br>
          **Type**: `STRUCT`<br>
          **Description**: Optional. Disk option config settings.<br>
          **GCP name**: `diskConfig`
           - `boot_disk_size_gb`<br>
            **Type**: `INT32`<br>
                **Description**: Optional. Size in GB of the boot disk (default is 500GB).<br>
                **GCP name**: `bootDiskSizeGb`<br>
           - `boot_disk_type`<br>
            **Type**: `STRING`<br>
                **Description**: Optional. Type of the boot disk (default is `pd-standard`). <br>
            **Valid values**: 
               - `pd-balanced` - Persistent Disk Balanced Solid State Drive
               - `pd-ssd` - Persistent Disk Solid State Drive
               - `pd-standard` - Persistent Disk Hard Disk Drive). 
               See [Disk types][22].<br>
                **GCP name**: `bootDiskType`<br>
           - `local_ssd_interface`<br>
            **Type**: `STRING`<br>
            **Description**: Optional. Interface type of local SSDs (default is `scsi`). <br>
            **Valid values**: <br>
            - `scsi` - Small Computer System Interface<br>
            - `nvme` - Non-Volatile Memory Express<br>
            See [local SSD performance][23].<br>
                **GCP name**: `localSsdInterface`<br>
           - `num_local_ssds`<br>
            **Type**: `INT32`<br>
                **Description**: Optional. Number of attached SSDs, from `0` to `8` (default is `0`). If SSDs are not attached, the boot disk is used to store runtime logs and [HDFS][24] data. If one or more SSDs are attached, this runtime bulk data is spread across them, and the boot disk contains only basic config and installed binaries. Note: Local SSD options may vary by machine type and number of vCPUs selected.<br>
                **GCP name**: `numLocalSsds`<br>
       - `image_uri`<br>
        **Type**: `STRING`<br>
        **Description**: Optional. The Compute Engine image resource used for cluster instances. The URI can represent an image or image family. Image examples: <br>
        - `https://www.googleapis.com/compute/beta/projects/[project_id]/global/images/[image-id]`<br>
        - `projects/[project_id]/global/images/[image-id]` <br>
        - `image-id`<br>
        Image family examples. Dataproc will use the most recent image from the family: <br>
        - `https://www.googleapis.com/compute/beta/projects/[project_id]/global/images/family/[custom-image-family-name]`<br>
        - `projects/[project_id]/global/images/family/[custom-image-family-name]`<br>
        If the URI is unspecified, it will be inferred from `SoftwareConfig.image_version` or the system default.<br>
            **GCP name**: `imageUri`<br>
       - `instance_names`<br>
        **Type**: `UNORDERED_LIST_STRING`<br>
            **Description**: Output only. The list of instance names. Dataproc derives the names from `cluster_name`, `num_instances`, and the instance group.<br>
            **GCP name**: `instanceNames`<br>
       - `instance_references`<br>
          **Type**: `UNORDERED_LIST_STRUCT`<br>
          **Description**: Output only. List of references to Compute Engine instances.<br>
          **GCP name**: `instanceReferences`
           - `instance_id`<br>
            **Type**: `STRING`<br>
                **Description**: The unique identifier of the Compute Engine instance.<br>
                **GCP name**: `instanceId`<br>
           - `instance_name`<br>
            **Type**: `STRING`<br>
                **Description**: The user-friendly name of the Compute Engine instance.<br>
                **GCP name**: `instanceName`<br>
           - `public_ecies_key`<br>
            **Type**: `STRING`<br>
                **Description**: The public ECIES key used for sharing data with this instance.<br>
                **GCP name**: `publicEciesKey`<br>
           - `public_key`<br>
            **Type**: `STRING`<br>
                **Description**: The public RSA key used for sharing data with this instance.<br>
                **GCP name**: `publicKey`<br>
       - `is_preemptible`<br>
        **Type**: `BOOLEAN`<br>
            **Description**: Output only. Specifies that this instance group contains preemptible instances.<br>
            **GCP name**: `isPreemptible`<br>
       - `machine_type_uri`<br>
        **Type**: `STRING`<br>
        **Description**: Optional. The Compute Engine machine type used for cluster instances. A full URL, partial URI, or short name are valid. Examples: <br>
        - `https://www.googleapis.com/compute/v1/projects/[project_id]/zones/us-east1-a/machineTypes/n1-standard-2` <br>
        - `projects/[project_id]/zones/us-east1-a/machineTypes/n1-standard-2`<br>
        - `n1-standard-2`<br>
        Auto Zone Exception: If you are using the Dataproc [Auto Zone Placement][21] feature, you must use the short name of the machine type resource, for example, `n1-standard-2`.<br>
            **GCP name**: `machineTypeUri`<br>
       - `managed_group_config`<br>
          **Type**: `STRUCT`<br>
          **Description**: Output only. The config for Compute Engine Instance Group Manager that manages this group. This is only used for preemptible instance groups.<br>
          **GCP name**: `managedGroupConfig`
           - `instance_group_manager_name`<br>
            **Type**: `STRING`<br>
                **Description**: Output only. The name of the Instance Group Manager for this group.<br>
                **GCP name**: `instanceGroupManagerName`<br>
           - `instance_template_name`<br>
            **Type**: `STRING`<br>
                **Description**: Output only. The name of the Instance Template used for the Managed Instance Group.<br>
                **GCP name**: `instanceTemplateName`<br>
       - `min_cpu_platform`<br>
        **Type**: `STRING`<br>
            **Description**: Optional. Specifies the minimum CPU platform for the Instance Group. See Dataproc [Minimum CPU Platform][25].<br>
            **GCP name**: `minCpuPlatform`<br>
       - `num_instances`<br>
        **Type**: `INT32`<br>
            **Description**: Optional. The number of VM instances in the instance group. For HA cluster `master_config` groups, must be set to `3`. For standard cluster `master_config` groups, must be set to `1`.<br>
            **GCP name**: `numInstances`<br>
       - `preemptibility`<br>
        **Type**: `STRING`<br>
            **Description**: Optional. Specifies the preemptibility of the instance group. The default value for master and worker groups is `NON_PREEMPTIBLE`. This default cannot be changed. The default value for secondary instances is `PREEMPTIBLE`. <br>
            **GCP name**: `preemptibility`<br>
                **Possible values**:<br>
          - `PREEMPTIBILITY_UNSPECIFIED` - Preemptibility is unspecified, the system will choose the appropriate setting for each instance group.<br>
          - `NON_PREEMPTIBLE` - Instances are non-preemptible. This option is allowed for all instance groups and is the only valid value for Master and Worker instance groups.<br>
          - `PREEMPTIBLE` - Instances are preemptible. This option is allowed only for secondary worker groups.<br>
   - `metastore_config`<br>
      **Type**: `STRUCT`<br>
      **Description**: Optional. Metastore configuration.<br>
      **GCP name**: `metastoreConfig`
       - `dataproc_metastore_service`<br>
        **Type**: `STRING`<br>
            **Description**: Required. Resource name of an existing Dataproc Metastore service. Example: `projects/[project_id]/locations/[dataproc_region]/services/[service-name]`<br>
            **GCP name**: `dataprocMetastoreService`<br>
   - `secondary_worker_config`<br>
      **Type**: `STRUCT`<br>
      **Description**: Optional. The Compute Engine config settings for a cluster's secondary worker instances<br>
      **GCP name**: `secondaryWorkerConfig`
       - `accelerators`<br>
          **Type**: `UNORDERED_LIST_STRUCT`<br>
          **Description**: Optional. The Compute Engine accelerator configuration for these instances.<br>
          **GCP name**: `accelerators`
           - `accelerator_count`<br>
            **Type**: `INT32`<br>
                **Description**: The number of the accelerator cards of this type exposed to this instance.<br>
                **GCP name**: `acceleratorCount`<br>
           - `accelerator_type_uri`<br>
            **Type**: `STRING`<br>
            **Description**: Full URL, partial URI, or short name of the accelerator type resource to expose to this instance. See [Compute Engine Accelerator Types][20]. Examples: <br>
            - `https://www.googleapis.com/compute/beta/projects/[project_id]/zones/us-east1-a/acceleratorTypes/nvidia-tesla-k80` <br>
            - `projects/[project_id]/zones/us-east1-a/acceleratorTypes/nvidia-tesla-k80`<br>
            - `nvidia-tesla-k80Auto` <br>
            Zone Exception: If you are using the Dataproc [Auto Zone Placement][21] feature, you must use the short name of the accelerator type resource, for example, `nvidia-tesla-k80`.<br>
                **GCP name**: `acceleratorTypeUri`<br>
       - `disk_config`<br>
          **Type**: `STRUCT`<br>
          **Description**: Optional. Disk option config settings.<br>
          **GCP name**: `diskConfig`
           - `boot_disk_size_gb`<br>
            **Type**: `INT32`<br>
                **Description**: Optional. Size in GB of the boot disk (default is 500GB).<br>
                **GCP name**: `bootDiskSizeGb`<br>
           - `boot_disk_type`<br>
            **Type**: `STRING`<br>
            **Description**: Optional. Type of the boot disk (default is `pd-standard`). <br>
            **Valid values**: <br>
            - `pd-balanced` - Persistent Disk Balanced Solid State Drive<br>
            - `pd-ssd` - Persistent Disk Solid State Drive<br>
            - `pd-standard` - Persistent Disk Hard Disk Drive <br>
            See [Disk types][22].<br>
                **GCP name**: `bootDiskType`<br>
           - `local_ssd_interface`<br>
            **Type**: `STRING`<br>
                **Description**: Optional. Interface type of local SSDs (default is `scsi`). 
            **Valid values**: <br>
            - `scsi` - Small Computer System Interface<br>
            - `nvme` - Non-Volatile Memory Express. <br>
            See [local SSD performance][23].<br>
                **GCP name**: `localSsdInterface`<br>
           - `num_local_ssds`<br>
            **Type**: `INT32`<br>
                **Description**: Optional. Number of attached SSDs, from `0` to `8` (default is `0`). If SSDs are not attached, the boot disk is used to store runtime logs and [HDFS][24] data. If one or more SSDs are attached, this runtime bulk data is spread across them, and the boot disk contains only basic config and installed binaries. Note: Local SSD options may vary by machine type and number of vCPUs selected.<br>
                **GCP name**: `numLocalSsds`<br>
       - `image_uri`<br>
        **Type**: `STRING`<br>
        **Description**: Optional. The Compute Engine image resource used for cluster instances.The URI can represent an image or image family. Image examples: <br>
        - `https://www.googleapis.com/compute/beta/projects/[project_id]/global/images/[image-id]` <br>
        - `projects/[project_id]/global/images/[image-id]` <br>
        - `image-idImage` <br>
        Family examples. Dataproc will use the most recent image from the family: <br>
        - `https://www.googleapis.com/compute/beta/projects/[project_id]/global/images/family/[custom-image-family-name]` <br>
        - `projects/[project_id]/global/images/family/[custom-image-family-name]` <br>
        If the URI is unspecified, it will be inferred from `SoftwareConfig.image_version` or the system default.<br>
            **GCP name**: `imageUri`<br>
       - `instance_names`<br>
        **Type**: `UNORDERED_LIST_STRING`<br>
            **Description**: Output only. The list of instance names. Dataproc derives the names from `cluster_name`, `num_instances`, and the instance group.<br>
            **GCP name**: `instanceNames`<br>
       - `instance_references`<br>
          **Type**: `UNORDERED_LIST_STRUCT`<br>
          **Description**: Output only. List of references to Compute Engine instances.<br>
          **GCP name**: `instanceReferences`
           - `instance_id`<br>
            **Type**: `STRING`<br>
                **Description**: The unique identifier of the Compute Engine instance.<br>
                **GCP name**: `instanceId`<br>
           - `instance_name`<br>
            **Type**: `STRING`<br>
                **Description**: The user-friendly name of the Compute Engine instance.<br>
                **GCP name**: `instanceName`<br>
           - `public_ecies_key`<br>
            **Type**: `STRING`<br>
                **Description**: The public ECIES key used for sharing data with this instance.<br>
                **GCP name**: `publicEciesKey`<br>
           - `public_key`<br>
            **Type**: `STRING`<br>
                **Description**: The public RSA key used for sharing data with this instance.<br>
                **GCP name**: `publicKey`<br>
       - `is_preemptible`<br>
        **Type**: `BOOLEAN`<br>
            **Description**: Output only. Specifies that this instance group contains preemptible instances.<br>
            **GCP name**: `isPreemptible`<br>
       - `machine_type_uri`<br>
        **Type**: `STRING`<br>
        **Description**: Optional. The Compute Engine machine type used for cluster instances. A full URL, partial URI, or short name are valid. Examples: <br>
        - `https://www.googleapis.com/compute/v1/projects/[project_id]/zones/us-east1-a/machineTypes/n1-standard-2` <br>
        - `projects/[project_id]/zones/us-east1-a/machineTypes/n1-standard-2`<br>
        - `n1-standard-2`<br>
        Auto Zone Exception: If you are using the Dataproc [Auto Zone Placement][21] feature, you must use the short name of the machine type resource, for example, `n1-standard-2`.<br>
            **GCP name**: `machineTypeUri`<br>
       - `managed_group_config`<br>
          **Type**: `STRUCT`<br>
          **Description**: Output only. The config for Compute Engine Instance Group Manager that manages this group. This is only used for preemptible instance groups.<br>
          **GCP name**: `managedGroupConfig`
           - `instance_group_manager_name`<br>
            **Type**: `STRING`<br>
                **Description**: Output only. The name of the Instance Group Manager for this group.<br>
                **GCP name**: `instanceGroupManagerName`<br>
           - `instance_template_name`<br>
            **Type**: `STRING`<br>
                **Description**: Output only. The name of the Instance Template used for the Managed Instance Group.<br>
                **GCP name**: `instanceTemplateName`<br>
       - `min_cpu_platform`<br>
        **Type**: `STRING`<br>
            **Description**: Optional. Specifies the minimum cpu platform for the Instance Group. See Dataproc [Minimum CPU Platform][25].<br>
            **GCP name**: `minCpuPlatform`<br>
       - `num_instances`<br>
        **Type**: `INT32`<br>
            **Description**: Optional. The number of VM instances in the instance group. For HA cluster `master_config` groups, must be set to `3`. For standard cluster `master_config` groups, must be set to `1`.<br>
            **GCP name**: `numInstances`<br>
       - `preemptibility`<br>
        **Type**: `STRING`<br>
            **Description**: Optional. Specifies the preemptibility of the instance group. The default value for master and worker groups is `NON_PREEMPTIBLE`. This default cannot be changed. The default value for secondary instances is `PREEMPTIBLE`. <br>
            **GCP name**: `preemptibility`<br>
                **Possible values**:<br>
          - `PREEMPTIBILITY_UNSPECIFIED` - Preemptibility is unspecified, the system will choose the appropriate setting for each instance group.<br>
          - `NON_PREEMPTIBLE` - Instances are non-preemptible.This option is allowed for all instance groups and is the only valid value for Master and Worker instance groups.<br>
          - `PREEMPTIBLE` - Instances are preemptible.This option is allowed only for secondary worker groups.<br>
   - `security_config`<br>
      **Type**: `STRUCT`<br>
      **Description**: Optional. Security settings for the cluster.<br>
      **GCP name**: `securityConfig`
       - `identity_config`<br>
          **Type**: `STRUCT`<br>
          **Description**: Optional. Identity related configuration, including service account based secure multi-tenancy user mappings.<br>
          **GCP name**: `identityConfig`
            
       - `kerberos_config`<br>
          **Type**: `STRUCT`<br>
          **Description**: Optional. Kerberos related configuration.<br>
          **GCP name**: `kerberosConfig`
           - `cross_realm_trust_admin_server`<br>
            **Type**: `STRING`<br>
                **Description**: Optional. The admin server (IP or hostname) for the remote trusted realm in a cross realm trust relationship.<br>
                **GCP name**: `crossRealmTrustAdminServer`<br>
           - `cross_realm_trust_kdc`<br>
            **Type**: `STRING`<br>
                **Description**: Optional. The KDC (IP or hostname) for the remote trusted realm in a cross realm trust relationship.<br>
                **GCP name**: `crossRealmTrustKdc`<br>
           - `cross_realm_trust_realm`<br>
            **Type**: `STRING`<br>
                **Description**: Optional. The remote realm the Dataproc on-cluster KDC will trust, should the user enable cross realm trust.<br>
                **GCP name**: `crossRealmTrustRealm`<br>
           - `cross_realm_trust_shared_password_uri`<br>
            **Type**: `STRING`<br>
                **Description**: Optional. The Cloud Storage URI of a KMS encrypted file containing the shared password between the on-cluster Kerberos realm and the remote trusted realm, in a cross realm trust relationship.<br>
                **GCP name**: `crossRealmTrustSharedPasswordUri`<br>
           - `enable_kerberos`<br>
            **Type**: `BOOLEAN`<br>
                **Description**: Optional. Flag to indicate whether to Kerberize the cluster (default: `false`). Set this field to `true` to enable Kerberos on a cluster.<br>
                **GCP name**: `enableKerberos`<br>
           - `kdc_db_key_uri`<br>
            **Type**: `STRING`<br>
                **Description**: Optional. The Cloud Storage URI of a KMS encrypted file containing the master key of the KDC database.<br>
                **GCP name**: `kdcDbKeyUri`<br>
           - `key_password_uri`<br>
            **Type**: `STRING`<br>
                **Description**: Optional. The Cloud Storage URI of a KMS encrypted file containing the password to the user provided key. For the self-signed certificate, this password is generated by Dataproc.<br>
                **GCP name**: `keyPasswordUri`<br>
           - `keystore_password_uri`<br>
            **Type**: `STRING`<br>
                **Description**: Optional. The Cloud Storage URI of a KMS encrypted file containing the password to the user provided keystore. For the self-signed certificate, this password is generated by Dataproc.<br>
                **GCP name**: `keystorePasswordUri`<br>
           - `keystore_uri`<br>
            **Type**: `STRING`<br>
                **Description**: Optional. The Cloud Storage URI of the keystore file used for SSL encryption. If not provided, Dataproc will provide a self-signed certificate.<br>
                **GCP name**: `keystoreUri`<br>
           - `kms_key_uri`<br>
            **Type**: `STRING`<br>
                **Description**: Optional. The URI of the KMS key used to encrypt various sensitive files.<br>
                **GCP name**: `kmsKeyUri`<br>
           - `realm`<br>
            **Type**: `STRING`<br>
                **Description**: Optional. The name of the on-cluster Kerberos realm. If not specified, the uppercased domain of hostnames will be the realm.<br>
                **GCP name**: `realm`<br>
           - `root_principal_password_uri`<br>
            **Type**: `STRING`<br>
                **Description**: Optional. The Cloud Storage URI of a KMS encrypted file containing the root principal password.<br>
                **GCP name**: `rootPrincipalPasswordUri`<br>
           - `tgt_lifetime_hours`<br>
            **Type**: `INT32`<br>
                **Description**: Optional. The lifetime of the ticket granting ticket, in hours. If not specified, or user specifies `0`, then default value `10` will be used.<br>
                **GCP name**: `tgtLifetimeHours`<br>
           - `truststore_password_uri`<br>
            **Type**: `STRING`<br>
                **Description**: Optional. The Cloud Storage URI of a KMS encrypted file containing the password to the user provided truststore. For the self-signed certificate, this password is generated by Dataproc.<br>
                **GCP name**: `truststorePasswordUri`<br>
           - `truststore_uri`<br>
            **Type**: `STRING`<br>
                **Description**: Optional. The Cloud Storage URI of the truststore file used for SSL encryption. If not provided, Dataproc will provide a self-signed certificate.<br>
                **GCP name**: `truststoreUri`<br>
   - `software_config`<br>
      **Type**: `STRUCT`<br>
      **Description**: Optional. The config settings for cluster software.<br>
      **GCP name**: `softwareConfig`
       - `image_version`<br>
        **Type**: `STRING`<br>
            **Description**: Optional. The version of software inside the cluster. It must be one of the supported [Dataproc Versions][26], such as `1.2` (including a subminor version, such as `1.2.29`), or the [preview version][27]. If unspecified, it defaults to the latest Debian version.<br>
            **GCP name**: `imageVersion`<br>
       - `optional_components`<br>
        **Type**: `UNORDERED_LIST_STRING`<br>
            **Description**: Optional. The set of components to activate on the cluster.<br>
            **GCP name**: `optionalComponents`<br>
   - `temp_bucket`<br>
    **Type**: `STRING`<br>
        **Description**: Optional. A Cloud Storage bucket used to store ephemeral cluster and jobs data, such as Spark and MapReduce history files. If you do not specify a temp bucket, Dataproc will determine a Cloud Storage location (US, ASIA, or EU) for your cluster's temp bucket according to the Compute Engine zone where your cluster is deployed, and then create and manage this project-level, per-location bucket. The default bucket has a TTL of 90 days, but you can use any TTL (or none) if you specify a bucket. See Dataproc [staging and temp buckets][1]. This field requires a Cloud Storage bucket name, not a `gs://...` URI to a Cloud Storage bucket.<br>
        **GCP name**: `tempBucket`<br>
   - `worker_config`<br>
      **Type**: `STRUCT`<br>
      **Description**: Optional. The Compute Engine config settings for the cluster's worker instances.<br>
      **GCP name**: `workerConfig`
       - `accelerators`<br>
          **Type**: `UNORDERED_LIST_STRUCT`<br>
          **Description**: Optional. The Compute Engine accelerator configuration for these instances.<br>
          **GCP name**: `accelerators`
           - `accelerator_count`<br>
            **Type**: `INT32`<br>
                **Description**: The number of the accelerator cards of this type exposed to this instance.<br>
                **GCP name**: `acceleratorCount`<br>
           - `accelerator_type_uri`<br>
            **Type**: `STRING`<br>
            **Description**: Full URL, partial URI, or short name of the accelerator type resource to expose to this instance. See [Compute Engine AcceleratorTypes][20]. Examples: <br>
            - `https://www.googleapis.com/compute/beta/projects/[project_id]/zones/us-east1-a/acceleratorTypes/nvidia-tesla-k80` <br>
            - `projects/[project_id]/zones/us-east1-a/acceleratorTypes/nvidia-tesla-k80` <br>
            - `nvidia-tesla-k80`<br>
            Auto Zone Exception: If you are using the Dataproc [Auto Zone Placement][21] feature, you must use the short name of the accelerator type resource, for example, `nvidia-tesla-k80`.<br>
                **GCP name**: `acceleratorTypeUri`<br>
       - `disk_config`<br>
          **Type**: `STRUCT`<br>
          **Description**: Optional. Disk option config settings.<br>
          **GCP name**: `diskConfig`
           - `boot_disk_size_gb`<br>
            **Type**: `INT32`<br>
                **Description**: Optional. Size in GB of the boot disk (default is 500GB).<br>
                **GCP name**: `bootDiskSizeGb`<br>
           - `boot_disk_type`<br>
            **Type**: `STRING`<br>
                **Description**: Optional. Type of the boot disk (default is `pd-standard`). <br>
            **Valid values**: <br>
            - `pd-balanced` - Persistent Disk Balanced Solid State Drive<br>
            - `pd-ssd` - Persistent Disk Solid State Drive<br>
            - `pd-standard` - Persistent Disk Hard Disk Drive <br>
            See [Disk types][22].<br>
                **GCP name**: `bootDiskType`<br>
           - `local_ssd_interface`<br>
            **Type**: `STRING`<br>
                **Description**: Optional. Interface type of local SSDs (default is `scsi`). 
            **Valid values**:<br>
            - `scsi` - Small Computer System Interface<br>
            - `nvme` - Non-Volatile Memory Express <br>
            See [local SSD performance][23].<br>
                **GCP name**: `localSsdInterface`<br>
           - `num_local_ssds`<br>
            **Type**: `INT32`<br>
                **Description**: Optional. Number of attached SSDs, from `0` to `8` (default is `0`). If SSDs are not attached, the boot disk is used to store runtime logs and [HDFS][24] data. If one or more SSDs are attached, this runtime bulk data is spread across them, and the boot disk contains only basic config and installed binaries. Note: Local SSD options may vary by machine type and number of vCPUs selected.<br>
                **GCP name**: `numLocalSsds`<br>
       - `image_uri`<br>
        **Type**: `STRING`<br>
        **Description**: Optional. The Compute Engine image resource used for cluster instances.The URI can represent an image or image family. Image examples: <br>
        - `https://www.googleapis.com/compute/beta/projects/[project_id]/global/images/[image-id]`<br>
        - `projects/[project_id]/global/images/[image-id]` <br>
        - `image-id`<br>
        Image family examples. Dataproc will use the most recent image from the family: <br>
        - `https://www.googleapis.com/compute/beta/projects/[project_id]/global/images/family/[custom-image-family-name]`<br>
        - `projects/[project_id]/global/images/family/[custom-image-family-name]`<br>
        If the URI is unspecified, it will be inferred from `SoftwareConfig.image_version` or the system default.<br>
            **GCP name**: `imageUri`<br>
       - `instance_names`<br>
        **Type**: `UNORDERED_LIST_STRING`<br>
            **Description**: Output only. The list of instance names. Dataproc derives the names from `cluster_name`, `num_instances`, and the instance group.<br>
            **GCP name**: `instanceNames`<br>
       - `instance_references`<br>
          **Type**: `UNORDERED_LIST_STRUCT`<br>
          **Description**: Output only. List of references to Compute Engine instances.<br>
          **GCP name**: `instanceReferences`
           - `instance_id`<br>
            **Type**: `STRING`<br>
                **Description**: The unique identifier of the Compute Engine instance.<br>
                **GCP name**: `instanceId`<br>
           - `instance_name`<br>
            **Type**: `STRING`<br>
                **Description**: The user-friendly name of the Compute Engine instance.<br>
                **GCP name**: `instanceName`<br>
           - `public_ecies_key`<br>
            **Type**: `STRING`<br>
                **Description**: The public ECIES key used for sharing data with this instance.<br>
                **GCP name**: `publicEciesKey`<br>
           - `public_key`<br>
            **Type**: `STRING`<br>
                **Description**: The public RSA key used for sharing data with this instance.<br>
                **GCP name**: `publicKey`<br>
       - `is_preemptible`<br>
        **Type**: `BOOLEAN`<br>
            **Description**: Output only. Specifies that this instance group contains preemptible instances.<br>
            **GCP name**: `isPreemptible`<br>
       - `machine_type_uri`<br>
        **Type**: `STRING`<br>
        **Description**: Optional. The Compute Engine machine type used for cluster instances.A full URL, partial URI, or short name are valid. Examples: <br>
        - `https://www.googleapis.com/compute/v1/projects/[project_id]/zones/us-east1-a/machineTypes/n1-standard-2` <br>
        - `projects/[project_id]/zones/us-east1-a/machineTypes/n1-standard-2`<br>
        - `n1-standard-2`<br>
        Auto Zone Exception: If you are using the Dataproc [Auto Zone Placement][21] feature, you must use the short name of the machine type resource, for example, `n1-standard-2`.<br>
            **GCP name**: `machineTypeUri`<br>
       - `managed_group_config`<br>
          **Type**: `STRUCT`<br>
          **Description**: Output only. The config for Compute Engine Instance Group Manager that manages this group. This is only used for preemptible instance groups.<br>
          **GCP name**: `managedGroupConfig`
           - `instance_group_manager_name`<br>
            **Type**: `STRING`<br>
                **Description**: Output only. The name of the Instance Group Manager for this group.<br>
                **GCP name**: `instanceGroupManagerName`<br>
           - `instance_template_name`<br>
            **Type**: `STRING`<br>
                **Description**: Output only. The name of the Instance Template used for the Managed Instance Group.<br>
                **GCP name**: `instanceTemplateName`<br>
       - `min_cpu_platform`<br>
        **Type**: `STRING`<br>
            **Description**: Optional. Specifies the minimum cpu platform for the Instance Group. See Dataproc [Minimum CPU Platform][25].<br>
            **GCP name**: `minCpuPlatform`<br>
       - `num_instances`<br>
        **Type**: `INT32`<br>
            **Description**: Optional. The number of VM instances in the instance group. For HA cluster master_config groups, must be set to `3`. For standard cluster master_config groups, must be set to `1`.<br>
            **GCP name**: `numInstances`<br>
       - `preemptibility`<br>
        **Type**: `STRING`<br>
            **Description**: Optional. Specifies the preemptibility of the instance group.The default value for master and worker groups is `NON_PREEMPTIBLE`. This default cannot be changed.The default value for secondary instances is `PREEMPTIBLE`. <br>
            **GCP name**: `preemptibility`<br>
                **Possible values**:<br>
          - `PREEMPTIBILITY_UNSPECIFIED` - Preemptibility is unspecified, the system will choose the appropriate setting for each instance group.<br>
          - `NON_PREEMPTIBLE` - Instances are non-preemptible.This option is allowed for all instance groups and is the only valid value for Master and Worker instance groups.<br>
          - `PREEMPTIBLE` - Instances are preemptible.This option is allowed only for secondary worker groups.<br>
## `labels`
**Type**: `UNORDERED_LIST_STRING`<br>
## `metrics`
  **Type**: `STRUCT`<br>
  **Description**: Output only. Contains cluster daemon metrics such as HDFS and YARN stats. Beta Feature: This report is available for testing purposes only. It may be changed before final release.<br>
  **GCP name**: `metrics`
    
## `organization_id`
**Type**: `STRING`<br>
## `parent`
**Type**: `STRING`<br>
## `project_id`
**Type**: `STRING`<br>
## `project_number`
**Type**: `STRING`<br>
## `resource_name`
**Type**: `STRING`<br>
## `status`
  **Type**: `STRUCT`<br>
  **Description**: Output only. Cluster status.<br>
  **GCP name**: `status`
   - `detail`<br>
    **Type**: `STRING`<br>
        **Description**: Optional. Output only. Details of cluster's state.<br>
        **GCP name**: `detail`<br>
   - `state`<br>
    **Type**: `STRING`<br>
        **Description**: Output only. The cluster's state. <br>
        **GCP name**: `state`<br>
            **Possible values**:<br>
      - `UNKNOWN` - The cluster state is unknown.<br>
      - `CREATING` - The cluster is being created and set up. It is not ready for use.<br>
      - `RUNNING` - The cluster is currently running and healthy. It is ready for use.Note: The cluster state changes from 'creating' to 'running' status after the master node(s), first two primary worker nodes (and the last primary worker node if primary workers > 2) are running.<br>
      - `ERROR` - The cluster encountered an error. It is not ready for use.<br>
      - `ERROR_DUE_TO_UPDATE` - The cluster has encountered an error while being updated. Jobs can be submitted to the cluster, but the cluster cannot be updated.<br>
      - `DELETING` - The cluster is being deleted. It cannot be used.<br>
      - `UPDATING` - The cluster is being updated. It continues to accept and process jobs.<br>
      - `STOPPING` - The cluster is being stopped. It cannot be used.<br>
      - `STOPPED` - The cluster is currently stopped. It is not ready for use.<br>
      - `STARTING` - The cluster is being started. It is not ready for use.<br>
      - `REPAIRING` - The cluster is being repaired. It is not ready for use.<br>
   - `state_start_time`<br>
    **Type**: `TIMESTAMP`<br>
        **Description**: Output only. Time when this state was entered. See [JSON representation of Timestamp][19].<br>
        **GCP name**: `stateStartTime`<br>
   - `substate`<br>
    **Type**: `STRING`<br>
        **Description**: Output only. Additional state information that includes status reported by the agent. <br>
        **GCP name**: `substate`<br>
            **Possible values**:<br>
      - `UNSPECIFIED` - The cluster substate is unknown.<br>
      - `UNHEALTHY` - The cluster is known to be in an unhealthy state (for example, critical daemons are not running or HDFS capacity is exhausted). Applies to RUNNING state.<br>
      - `STALE_STATUS` - The agent-reported status is out of date (may occur if Dataproc loses communication with Agent). Applies to RUNNING state.<br>
## `status_history`
  **Type**: `UNORDERED_LIST_STRUCT`<br>
  **Description**: Output only. The previous cluster status.<br>
  **GCP name**: `statusHistory`
   - `detail`<br>
    **Type**: `STRING`<br>
        **Description**: Optional. Output only. Details of cluster's state.<br>
        **GCP name**: `detail`<br>
   - `state`<br>
    **Type**: `STRING`<br>
        **Description**: Output only. The cluster's state. <br>
        **GCP name**: `state`<br>
            **Possible values**:<br>
      - `UNKNOWN` - The cluster state is unknown.<br>
      - `CREATING` - The cluster is being created and set up. It is not ready for use.<br>
      - `RUNNING` - The cluster is currently running and healthy. It is ready for use. Note: The cluster state changes from 'creating' to 'running' status after the master node(s), first two primary worker nodes (and the last primary worker node if primary workers > 2) are running.<br>
      - `ERROR` - The cluster encountered an error. It is not ready for use.<br>
      - `ERROR_DUE_TO_UPDATE` - The cluster has encountered an error while being updated. Jobs can be submitted to the cluster, but the cluster cannot be updated.<br>
      - `DELETING` - The cluster is being deleted. It cannot be used.<br>
      - `UPDATING` - The cluster is being updated. It continues to accept and process jobs.<br>
      - `STOPPING` - The cluster is being stopped. It cannot be used.<br>
      - `STOPPED` - The cluster is currently stopped. It is not ready for use.<br>
      - `STARTING` - The cluster is being started. It is not ready for use.<br>
      - `REPAIRING` - The cluster is being repaired. It is not ready for use.<br>
   - `state_start_time`<br>
    **Type**: `TIMESTAMP`<br>
        **Description**: Output only. Time when this state was entered. See [JSON representation of Timestamp][19].<br>
        **GCP name**: `stateStartTime`<br>
   - `substate`<br>
    **Type**: `STRING`<br>
        **Description**: Output only. Additional state information that includes status reported by the agent. <br>
        **GCP name**: `substate`<br>
            **Possible values**:<br>
      - `UNSPECIFIED` - The cluster substate is unknown.<br>
      - `UNHEALTHY` - The cluster is known to be in an unhealthy state (for example, critical daemons are not running or HDFS capacity is exhausted). Applies to RUNNING state.<br>
      - `STALE_STATUS` - The agent-reported status is out of date (may occur if Dataproc loses communication with Agent). Applies to RUNNING state.<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `virtual_cluster_config`
  **Type**: `STRUCT`<br>
  **Description**: Optional. The virtual cluster config is used when creating a Dataproc cluster that does not directly control the underlying compute resources, for example, when creating a [Dataproc-on-GKE cluster][28]. Dataproc may set default values, and values may change when clusters are updated. Exactly one of `config` or `virtual_cluster_config` must be specified.<br>
  **GCP name**: `virtualClusterConfig`
   - `auxiliary_services_config`<br>
      **Type**: `STRUCT`<br>
      **Description**: Optional. Configuration of auxiliary services used by this cluster.<br>
      **GCP name**: `auxiliaryServicesConfig`
       - `metastore_config`<br>
          **Type**: `STRUCT`<br>
          **Description**: Optional. The Hive Metastore configuration for this workload.<br>
          **GCP name**: `metastoreConfig`
           - `dataproc_metastore_service`<br>
            **Type**: `STRING`<br>
                **Description**: Required. Resource name of an existing Dataproc Metastore service. Example: `projects/[project_id]/locations/[dataproc_region]/services/[service-name]`<br>
                **GCP name**: `dataprocMetastoreService`<br>
       - `spark_history_server_config`<br>
          **Type**: `STRUCT`<br>
          **Description**: Optional. The Spark History Server configuration for the workload.<br>
          **GCP name**: `sparkHistoryServerConfig`
           - `dataproc_cluster`<br>
            **Type**: `STRING`<br>
                **Description**: Optional. Resource name of an existing Dataproc Cluster to act as a Spark History Server for the workload. Example: `projects/[project_id]/regions/[region]/clusters/[cluster_name]`<br>
                **GCP name**: `dataprocCluster`<br>
   - `kubernetes_cluster_config`<br>
      **Type**: `STRUCT`<br>
      **Description**: Required. The configuration for running the Dataproc cluster on Kubernetes.<br>
      **GCP name**: `kubernetesClusterConfig`
       - `gke_cluster_config`<br>
          **Type**: `STRUCT`<br>
          **Description**: Required. The configuration for running the Dataproc cluster on GKE.<br>
          **GCP name**: `gkeClusterConfig`
           - `gke_cluster_target`<br>
            **Type**: `STRING`<br>
                **Description**: Optional. A target GKE cluster to deploy to. It must be in the same project and region as the Dataproc cluster (the GKE cluster can be zonal or regional). Format: `projects/{project}/locations/{location}/clusters/{cluster_id}`<br>
                **GCP name**: `gkeClusterTarget`<br>
           - `namespaced_gke_deployment_target`<br>
              **Type**: `STRUCT`<br>
              **Description**: Optional. Deprecated. Use `gkeClusterTarget`. Used only for the deprecated beta. A target for the deployment.<br>
              **GCP name**: `namespacedGkeDeploymentTarget`
               - `cluster_namespace`<br>
                **Type**: `STRING`<br>
                    **Description**: Optional. A namespace within the GKE cluster to deploy into.<br>
                    **GCP name**: `clusterNamespace`<br>
               - `target_gke_cluster`<br>
                **Type**: `STRING`<br>
                    **Description**: Optional. The target GKE cluster to deploy to. Format: `projects/{project}/locations/{location}/clusters/{cluster_id}`<br>
                    **GCP name**: `targetGkeCluster`<br>
           - `node_pool_target`<br>
              **Type**: `UNORDERED_LIST_STRUCT`<br>
              **Description**: Optional. GKE node pools where workloads will be scheduled. At least one node pool must be assigned the DEFAULT `GkeNodePoolTarget.Role`. If a `GkeNodePoolTarget` is not specified, Dataproc constructs a DEFAULT `GkeNodePoolTarget`. Each role can be given to only one `GkeNodePoolTarget`. All node pools must have the same location settings.<br>
              **GCP name**: `nodePoolTarget`
               - `node_pool`<br>
                **Type**: `STRING`<br>
                    **Description**: Required. The target GKE node pool. Format: `projects/{project}/locations/{location}/clusters/{cluster}/nodePools/{node_pool}`<br>
                    **GCP name**: `nodePool`<br>
               - `node_pool_config`<br>
                  **Type**: `STRUCT`<br>
                  **Description**: Input only. The configuration for the GKE node pool. If specified, Dataproc attempts to create a node pool with the specified shape. If one with the same name already exists, it is verified against all specified fields. If a field differs, the virtual cluster creation will fail. If omitted, any node pool with the specified name is used. If a node pool with the specified name does not exist, Dataproc create a node pool with default values. This is an input only field. It will not be returned by the API.<br>
                  **GCP name**: `nodePoolConfig`
                   - `autoscaling`<br>
                      **Type**: `STRUCT`<br>
                      **Description**: Optional. The autoscaler configuration for this node pool. The autoscaler is enabled only when a valid configuration is present.<br>
                      **GCP name**: `autoscaling`
                       - `max_node_count`<br>
                        **Type**: `INT32`<br>
                            **Description**: The maximum number of nodes in the node pool. Must be greater than or equal to `min_node_count`, and must be greater than `0`. Note: Quota must be sufficient to scale up the cluster.<br>
                            **GCP name**: `maxNodeCount`<br>
                       - `min_node_count`<br>
                        **Type**: `INT32`<br>
                            **Description**: The minimum number of nodes in the node pool. Must be greater than or equal to `0` and less than or equal to `max_node_count`.<br>
                            **GCP name**: `minNodeCount`<br>
                   - `config`<br>
                      **Type**: `STRUCT`<br>
                      **Description**: Optional. The node pool configuration.<br>
                      **GCP name**: `config`
                       - `accelerators`<br>
                          **Type**: `UNORDERED_LIST_STRUCT`<br>
                          **Description**: Optional. A list of [hardware accelerators][11] to attach to each node.<br>
                          **GCP name**: `accelerators`
                           - `accelerator_count`<br>
                            **Type**: `INT64`<br>
                                **Description**: The number of accelerator cards exposed to an instance.<br>
                                **GCP name**: `acceleratorCount`<br>
                           - `accelerator_type`<br>
                            **Type**: `STRING`<br>
                                **Description**: The accelerator type resource name (see GPUs on Compute Engine).<br>
                                **GCP name**: `acceleratorType`<br>
                           - `gpu_partition_size`<br>
                            **Type**: `STRING`<br>
                                **Description**: Size of partitions to create on the GPU. Valid values are described in the [NVIDIA MIG user guide][12].<br>
                                **GCP name**: `gpuPartitionSize`<br>
                       - `boot_disk_kms_key`<br>
                        **Type**: `STRING`<br>
                            **Description**: Optional. The [Customer Managed Encryption Key (CMEK)][13] used to encrypt the boot disk attached to each node in the node pool. Specify the key using the following format: `projects/KEY_PROJECT_ID/locations/LOCATION /keyRings/RING_NAME/cryptoKeys/KEY_NAME`.<br>
                            **GCP name**: `bootDiskKmsKey`<br>
                       - `local_ssd_count`<br>
                        **Type**: `INT32`<br>
                            **Description**: Optional. The number of local SSD disks to attach to the node, which is limited by the maximum number of disks allowable per zone. See [Adding Local SSDs][14].<br>
                            **GCP name**: `localSsdCount`<br>
                       - `machine_type`<br>
                        **Type**: `STRING`<br>
                            **Description**: Optional. The name of a [Compute Engine machine type][15].<br>
                            **GCP name**: `machineType`<br>
                       - `min_cpu_platform`<br>
                        **Type**: `STRING`<br>
                            **Description**: Optional. [Minimum CPU platform][16] to be used by this instance. The instance may be scheduled on the specified or a newer CPU platform. Specify the friendly names of CPU platforms, such as `Intel Haswell` or `Intel Sandy Bridge`.<br>
                            **GCP name**: `minCpuPlatform`<br>
                       - `preemptible`<br>
                        **Type**: `BOOLEAN`<br>
                            **Description**: Optional. Whether the nodes are created as [preemptible VM instances][17]. Preemptible nodes cannot be used in a node pool with the CONTROLLER role or in the DEFAULT node pool if the CONTROLLER role is not assigned (the DEFAULT node pool will assume the CONTROLLER role).<br>
                            **GCP name**: `preemptible`<br>
                       - `spot`<br>
                        **Type**: `BOOLEAN`<br>
                            **Description**: Optional. Spot flag for enabling Spot VM, which is a rebrand of the existing preemptible flag.<br>
                            **GCP name**: `spot`<br>
                   - `locations`<br>
                    **Type**: `UNORDERED_LIST_STRING`<br>
                        **Description**: Optional. The list of [Compute Engine zones][18] where node pool nodes associated with a Dataproc on GKE virtual cluster will be located. Note: All node pools associated with a virtual cluster must be located in the same region as the virtual cluster, and they must be located in the same zone within that region. If a location is not specified during node pool creation, Dataproc on GKE will choose the zone.<br>
                        **GCP name**: `locations`<br>
               - `roles`<br>
                **Type**: `UNORDERED_LIST_STRING`<br>
                    **Description**: Required. The roles associated with the GKE node pool.<br>
                    **GCP name**: `roles`<br>
       - `kubernetes_namespace`<br>
        **Type**: `STRING`<br>
            **Description**: Optional. A namespace within the Kubernetes cluster to deploy into. If this namespace does not exist, it is created. If it exists, Dataproc verifies that another Dataproc VirtualCluster is not installed into it. If not specified, the name of the Dataproc Cluster is used.<br>
            **GCP name**: `kubernetesNamespace`<br>
       - `kubernetes_software_config`<br>
          **Type**: `STRUCT`<br>
          **Description**: Optional. The software configuration for this Dataproc cluster running on Kubernetes.<br>
          **GCP name**: `kubernetesSoftwareConfig`
   - `staging_bucket`<br>
    **Type**: `STRING`<br>
        **Description**: Optional. A Cloud Storage bucket used to stage job dependencies, config files, and job driver console output. If you do not specify a staging bucket, Cloud Dataproc will determine a Cloud Storage location (US, ASIA, or EU) for your cluster's staging bucket according to the Compute Engine zone where your cluster is deployed, and then create and manage this project-level, per-location bucket. See Dataproc [staging and temp buckets][1]. This field requires a Cloud Storage bucket name, not a `gs://...` URI to a Cloud Storage bucket.<br>
        **GCP name**: `stagingBucket`<br>



[1]: https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/staging-bucket
[2]: https://cloud.google.com/dataproc/docs/guides/monitoring#available_oss_metrics
[3]: https://spark.apache.org/docs/latest/monitoring.html#metrics
[4]: https://cloud.google.com/compute/confidential-vm/docs
[5]: https://cloud.google.com/compute/docs/subnetworks
[6]: https://cloud.google.com/compute/docs/reference/rest/v1/nodeGroups
[7]: https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/service-accounts#service_accounts_in_dataproc
[8]: https://cloud.google.com/dataproc/docs/concepts/iam/dataproc-principals#vm_service_account_data_plane_identity
[9]: https://cloud.google.com/compute/docs/access/service-accounts#default_service_account
[10]: https://cloud.google.com/security/shielded-cloud/shielded-vm
[11]: https://cloud.google.com/compute/docs/gpus
[12]: https://docs.nvidia.com/datacenter/tesla/mig-user-guide/#partitioning
[13]: https://cloud.google.com/kubernetes-engine/docs/how-to/using-cmek
[14]: https://cloud.google.com/compute/docs/disks/local-ssd
[15]: https://cloud.google.com/compute/docs/machine-types
[16]: https://cloud.google.com/compute/docs/instances/specify-min-cpu-platform
[17]: https://cloud.google.com/compute/docs/instances/preemptible
[18]: https://cloud.google.com/compute/docs/zones#available
[19]: https://developers.google.com/protocol-buffers/docs/proto3#json
[20]: https://cloud.google.com/compute/docs/reference/beta/acceleratorTypes
[21]: https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/auto-zone#using_auto_zone_placement
[22]: https://cloud.google.com/compute/docs/disks#disk-types
[23]: https://cloud.google.com/compute/docs/disks/local-ssd#performance
[24]: https://hadoop.apache.org/docs/r1.2.1/hdfs_user_guide.html
[25]: https://cloud.google.com/dataproc/docs/concepts/compute/dataproc-min-cpu
[26]: https://cloud.google.com/dataproc/docs/concepts/versioning/dataproc-versions#supported_dataproc_versions
[27]: https://cloud.google.com/dataproc/docs/concepts/versioning/dataproc-versions#other_versions
[28]: https://cloud.google.com/dataproc/docs/guides/dpgke/dataproc-gke
