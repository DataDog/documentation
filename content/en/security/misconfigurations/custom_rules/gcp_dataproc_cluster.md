---
dependencies: []
disable_edit: true
---
# gcp_dataproc_cluster

## `ancestors`
**Type**: `UNORDERED_LIST_STRING`<br>
## `cluster_name`
**Type**: `STRING`<br>
**Provider name**: `clusterName`<br>
**Description**: Required. The cluster name, which must be unique within a project. The name must start with a lowercase letter, and can contain up to 51 lowercase letters, numbers, and hyphens. It cannot end with a hyphen. The name of a deleted cluster can be reused.<br>
## `cluster_uuid`
**Type**: `STRING`<br>
**Provider name**: `clusterUuid`<br>
**Description**: Output only. A cluster UUID (Unique Universal Identifier). Dataproc generates this value when it creates the cluster.<br>
## `config`
**Type**: `STRUCT`<br>
**Provider name**: `config`<br>
**Description**: Optional. The cluster config for a cluster of Compute Engine Instances. Note that Dataproc may set default values, and values may change when clusters are updated.Exactly one of ClusterConfig or VirtualClusterConfig must be specified.<br>
   - `autoscaling_config`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `autoscalingConfig`<br>
    **Description**: Optional. Autoscaling config for the policy associated with the cluster. Cluster does not autoscale if this field is unset.<br>
       - `policy_uri`<br>
        **Type**: `STRING`<br>
        **Provider name**: `policyUri`<br>
        **Description**: Optional. The autoscaling policy used by the cluster. Only resource names including projectid and location (region) are valid. Examples: <ul> <li><code>https://www.googleapis.com/compute/v1/projects/[project_id]/locations/[dataproc_region]/autoscalingPolicies/[policy_id]</code></li> <li><code>projects/[project_id]/locations/[dataproc_region]/autoscalingPolicies/[policy_id]</code></li></ul> <p>Note that the policy must be in the same project and Dataproc region.</p>
   - `auxiliary_node_groups`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `auxiliaryNodeGroups`<br>
    **Description**: Optional. The node group settings.<br>
       - `node_group`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `nodeGroup`<br>
        **Description**: Required. Node group configuration.<br>
           - `name`<br>
            **Type**: `STRING`<br>
            **Provider name**: `name`<br>
            **Description**: The Node group <a href=https://aip.dev/122>resource name</a>.<br>
           - `node_group_config`<br>
            **Type**: `STRUCT`<br>
            **Provider name**: `nodeGroupConfig`<br>
            **Description**: Optional. The node group instance group configuration.<br>
               - `accelerators`<br>
                **Type**: `UNORDERED_LIST_STRUCT`<br>
                **Provider name**: `accelerators`<br>
                **Description**: Optional. The Compute Engine accelerator configuration for these instances.<br>
                   - `accelerator_count`<br>
                    **Type**: `INT32`<br>
                    **Provider name**: `acceleratorCount`<br>
                    **Description**: The number of the accelerator cards of this type exposed to this instance.<br>
                   - `accelerator_type_uri`<br>
                    **Type**: `STRING`<br>
                    **Provider name**: `acceleratorTypeUri`<br>
                    **Description**: Full URL, partial URI, or short name of the accelerator type resource to expose to this instance. See <a href=https://cloud.google.com/compute/docs/reference/beta/acceleratorTypes>Compute Engine AcceleratorTypes</a>. Examples: <ul><li><code>https://www.googleapis.com/compute/beta/projects/[project_id]/zones/us-east1-a/acceleratorTypes/nvidia-tesla-k80</code></li> <li><code>projects/[project_id]/zones/us-east1-a/acceleratorTypes/nvidia-tesla-k80</code></li> <li><code>nvidia-tesla-k80</code></li></ul> <p>Auto Zone Exception: If you are using the <a href=https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/auto-zone#using_auto_zone_placement>Dataproc Auto Zone Placement</a> feature, you must use the short name of the accelerator type resource, for example, <code>nvidia-tesla-k80</code>.</p>
               - `disk_config`<br>
                **Type**: `STRUCT`<br>
                **Provider name**: `diskConfig`<br>
                **Description**: Optional. Disk option config settings.<br>
                   - `boot_disk_size_gb`<br>
                    **Type**: `INT32`<br>
                    **Provider name**: `bootDiskSizeGb`<br>
                    **Description**: Optional. Size in GB of the boot disk (default is 500GB).<br>
                   - `boot_disk_type`<br>
                    **Type**: `STRING`<br>
                    **Provider name**: `bootDiskType`<br>
                    **Description**: Optional. Type of the boot disk (default is <code>pd-standard</code>). Valid values: <code>pd-balanced</code> (Persistent Disk Balanced Solid State Drive), <code>pd-ssd</code> (Persistent Disk Solid State Drive), or <code>pd-standard</code> (Persistent Disk Hard Disk Drive). See <a href=https://cloud.google.com/compute/docs/disks#disk-types>Disk types</a>.<br>
                   - `local_ssd_interface`<br>
                    **Type**: `STRING`<br>
                    **Provider name**: `localSsdInterface`<br>
                    **Description**: Optional. Interface type of local SSDs (default is <code>scsi</code>). Valid values: <code>scsi</code> (Small Computer System Interface), <code>nvme</code> (Non-Volatile Memory Express). See <a href=https://cloud.google.com/compute/docs/disks/local-ssd#performance>local SSD performance</a>.<br>
                   - `num_local_ssds`<br>
                    **Type**: `INT32`<br>
                    **Provider name**: `numLocalSsds`<br>
                    **Description**: Optional. Number of attached SSDs, from 0 to 8 (default is 0). If SSDs are not attached, the boot disk is used to store runtime logs and <a href=https://hadoop.apache.org/docs/r1.2.1/hdfs_user_guide.html>HDFS</a> data. If one or more SSDs are attached, this runtime bulk data is spread across them, and the boot disk contains only basic config and installed binaries. Note: Local SSD options may vary by machine type and number of vCPUs selected.<br>
               - `image_uri`<br>
                **Type**: `STRING`<br>
                **Provider name**: `imageUri`<br>
                **Description**: Optional. The Compute Engine image resource used for cluster instances. The URI can represent an image or image family. Image examples: <ul><li><code>https://www.googleapis.com/compute/beta/projects/[project_id]/global/images/[image-id]</code></li> <li><code>projects/[project_id]/global/images/[image-id]</code></li> <li><code>image-id</code></li></ul> <p>Image family examples. Dataproc will use the most recent image from the family:</p> <ul><li><code>https://www.googleapis.com/compute/beta/projects/[project_id]/global/images/family/[custom-image-family-name]</code></li> <li><code>projects/[project_id]/global/images/family/[custom-image-family-name]</code></li></ul> <p>If the URI is unspecified, it will be inferred from <code>SoftwareConfig.image_version</code> or the system default.</p>
               - `instance_names`<br>
                **Type**: `UNORDERED_LIST_STRING`<br>
                **Provider name**: `instanceNames`<br>
                **Description**: Output only. The list of instance names. Dataproc derives the names from cluster_name, num_instances, and the instance group.<br>
               - `instance_references`<br>
                **Type**: `UNORDERED_LIST_STRUCT`<br>
                **Provider name**: `instanceReferences`<br>
                **Description**: Output only. List of references to Compute Engine instances.<br>
                   - `instance_id`<br>
                    **Type**: `STRING`<br>
                    **Provider name**: `instanceId`<br>
                    **Description**: The unique identifier of the Compute Engine instance.<br>
                   - `instance_name`<br>
                    **Type**: `STRING`<br>
                    **Provider name**: `instanceName`<br>
                    **Description**: The user-friendly name of the Compute Engine instance.<br>
                   - `public_ecies_key`<br>
                    **Type**: `STRING`<br>
                    **Provider name**: `publicEciesKey`<br>
                    **Description**: The public ECIES key used for sharing data with this instance.<br>
                   - `public_key`<br>
                    **Type**: `STRING`<br>
                    **Provider name**: `publicKey`<br>
                    **Description**: The public RSA key used for sharing data with this instance.<br>
               - `is_preemptible`<br>
                **Type**: `BOOLEAN`<br>
                **Provider name**: `isPreemptible`<br>
                **Description**: Output only. Specifies that this instance group contains preemptible instances.<br>
               - `machine_type_uri`<br>
                **Type**: `STRING`<br>
                **Provider name**: `machineTypeUri`<br>
                **Description**: Optional. The Compute Engine machine type used for cluster instances. A full URL, partial URI, or short name are valid. Examples: <ul> <li><code>https://www.googleapis.com/compute/v1/projects/[project_id]/zones/us-east1-a/machineTypes/n1-standard-2</code></li> <li><code>projects/[project_id]/zones/us-east1-a/machineTypes/n1-standard-2</code></li> <li><code>n1-standard-2</code></li></ul> <p>Auto Zone Exception: If you are using the <a href=https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/auto-zone#using_auto_zone_placement>Dataproc Auto Zone Placement</a> feature, you must use the short name of the machine type resource, for example, <code>n1-standard-2</code>.</p>
               - `managed_group_config`<br>
                **Type**: `STRUCT`<br>
                **Provider name**: `managedGroupConfig`<br>
                **Description**: Output only. The config for Compute Engine Instance Group Manager that manages this group. This is only used for preemptible instance groups.<br>
                   - `instance_group_manager_name`<br>
                    **Type**: `STRING`<br>
                    **Provider name**: `instanceGroupManagerName`<br>
                    **Description**: Output only. The name of the Instance Group Manager for this group.<br>
                   - `instance_template_name`<br>
                    **Type**: `STRING`<br>
                    **Provider name**: `instanceTemplateName`<br>
                    **Description**: Output only. The name of the Instance Template used for the Managed Instance Group.<br>
               - `min_cpu_platform`<br>
                **Type**: `STRING`<br>
                **Provider name**: `minCpuPlatform`<br>
                **Description**: Optional. Specifies the minimum cpu platform for the Instance Group. See <a href=https://cloud.google.com/dataproc/docs/concepts/compute/dataproc-min-cpu>Dataproc -> Minimum CPU Platform</a>.<br>
               - `num_instances`<br>
                **Type**: `INT32`<br>
                **Provider name**: `numInstances`<br>
                **Description**: Optional. The number of VM instances in the instance group. For HA cluster master_config groups, must be set to 3. For standard cluster master_config groups, must be set to 1.<br>
               - `preemptibility`<br>
                **Type**: `STRING`<br>
                **Provider name**: `preemptibility`<br>
                **Description**: Optional. Specifies the preemptibility of the instance group. The default value for master and worker groups is NON_PREEMPTIBLE. This default cannot be changed.The default value for secondary instances is PREEMPTIBLE. <br>
                **Possible values**:<br>
                  - `PREEMPTIBILITY_UNSPECIFIED` - Preemptibility is unspecified, the system will choose the appropriate setting for each instance group.<br>
                  - `NON_PREEMPTIBLE` - Instances are non-preemptible. This option is allowed for all instance groups and is the only valid value for Master and Worker instance groups.<br>
                  - `PREEMPTIBLE` - Instances are <a href=https://cloud.google.com/compute/docs/instances/preemptible>preemptible</a>. This option is allowed only for <a href=https://cloud.google.com/dataproc/docs/concepts/compute/secondary-vms>secondary worker</a> groups.<br>
                  - `SPOT` - Instances are <a href=https://cloud.google.com/compute/docs/instances/spot>Spot VMs</a>. This option is allowed only for <a href=https://cloud.google.com/dataproc/docs/concepts/compute/secondary-vms>secondary worker</a> groups. Spot VMs are the latest version of <a href=https://cloud.google.com/compute/docs/instances/preemptible>preemptible VMs</a>, and provide additional features.<br>
           - `roles`<br>
            **Type**: `UNORDERED_LIST_STRING`<br>
            **Provider name**: `roles`<br>
            **Description**: Required. Node group roles.<br>
       - `node_group_id`<br>
        **Type**: `STRING`<br>
        **Provider name**: `nodeGroupId`<br>
        **Description**: Optional. A node group ID. Generated if not specified.The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). Cannot begin or end with underscore or hyphen. Must consist of from 3 to 33 characters.<br>
   - `config_bucket`<br>
    **Type**: `STRING`<br>
    **Provider name**: `configBucket`<br>
    **Description**: Optional. A Cloud Storage bucket used to stage job dependencies, config files, and job driver console output. If you do not specify a staging bucket, Cloud Dataproc will determine a Cloud Storage location (US, ASIA, or EU) for your cluster's staging bucket according to the Compute Engine zone where your cluster is deployed, and then create and manage this project-level, per-location bucket (see Dataproc <a href=https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/staging-bucket>staging and temp buckets</a>). This field requires a Cloud Storage bucket name, not a gs://... URI to a Cloud Storage bucket.<br>
   - `dataproc_metric_config`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `dataprocMetricConfig`<br>
    **Description**: Optional. The config for Dataproc metrics.<br>
       - `metrics`<br>
        **Type**: `UNORDERED_LIST_STRUCT`<br>
        **Provider name**: `metrics`<br>
        **Description**: Required. Metrics sources to enable.<br>
           - `metric_overrides`<br>
            **Type**: `UNORDERED_LIST_STRING`<br>
            **Provider name**: `metricOverrides`<br>
            **Description**: Optional. Specify one or more available <a href=https://cloud.google.com/dataproc/docs/guides/monitoring#available_oss_metrics>OSS metrics</a> to collect for the metric course (for the SPARK metric source, any <a href=https://spark.apache.org/docs/latest/monitoring.html#metrics>Spark metric</a> can be specified). Provide metrics in the following format: <code>METRIC_SOURCE: INSTANCE:GROUP:METRIC</code>. Use camelcase as appropriate. Examples: <ul><li><code>yarn:ResourceManager:QueueMetrics:AppsCompleted</code></li> <li><code>spark:driver:DAGScheduler:job.allJobs</code></li> <li><code>sparkHistoryServer:JVM:Memory:NonHeapMemoryUsage.committed</code></li> <li><code>hiveserver2:JVM:Memory:NonHeapMemoryUsage.used</code></li></ul> Notes: Only the specified overridden metrics will be collected for the metric source. For example, if one or more spark:executive metrics are listed as metric overrides, other SPARK metrics will not be collected. The collection of the default metrics for other OSS metric sources is unaffected. For example, if both SPARK andd YARN metric sources are enabled, and overrides are provided for Spark metrics only, all default YARN metrics will be collected.<br>
           - `metric_source`<br>
            **Type**: `STRING`<br>
            **Provider name**: `metricSource`<br>
            **Description**: Required. Default metrics are collected unless metricOverrides are specified for the metric source (see Available <a href=https://cloud.google.com/dataproc/docs/guides/monitoring#available_oss_metrics>OSS metrics</a> for more information). <br>
            **Possible values**:<br>
              - `METRIC_SOURCE_UNSPECIFIED` - Required unspecified metric source.<br>
              - `MONITORING_AGENT_DEFAULTS` - Default monitoring agent metrics. If this source is enabled, Dataproc enables the monitoring agent in Compute Engine, and collects default monitoring agent metrics, which are published with an agent.googleapis.com prefix.<br>
              - `HDFS` - HDFS metric source.<br>
              - `SPARK` - Spark metric source.<br>
              - `YARN` - YARN metric source.<br>
              - `SPARK_HISTORY_SERVER` - Spark History Server metric source.<br>
              - `HIVESERVER2` - Hiveserver2 metric source.<br>
   - `encryption_config`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `encryptionConfig`<br>
    **Description**: Optional. Encryption settings for the cluster.<br>
       - `gce_pd_kms_key_name`<br>
        **Type**: `STRING`<br>
        **Provider name**: `gcePdKmsKeyName`<br>
        **Description**: Optional. The Cloud KMS key name to use for PD disk encryption for all instances in the cluster.<br>
   - `endpoint_config`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `endpointConfig`<br>
    **Description**: Optional. Port/endpoint configuration for this cluster<br>
       - `enable_http_port_access`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `enableHttpPortAccess`<br>
        **Description**: Optional. If true, enable http access to specific ports on the cluster from external sources. Defaults to false.<br>
   - `gce_cluster_config`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `gceClusterConfig`<br>
    **Description**: Optional. The shared Compute Engine config settings for all instances in a cluster.<br>
       - `confidential_instance_config`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `confidentialInstanceConfig`<br>
        **Description**: Optional. Confidential Instance Config for clusters using <a href=https://cloud.google.com/compute/confidential-vm/docs>Confidential VMs</a>.<br>
           - `enable_confidential_compute`<br>
            **Type**: `BOOLEAN`<br>
            **Provider name**: `enableConfidentialCompute`<br>
            **Description**: Optional. Defines whether the instance should have confidential compute enabled.<br>
       - `internal_ip_only`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `internalIpOnly`<br>
        **Description**: Optional. If true, all instances in the cluster will only have internal IP addresses. By default, clusters are not restricted to internal IP addresses, and will have ephemeral external IP addresses assigned to each instance. This internal_ip_only restriction can only be enabled for subnetwork enabled networks, and all off-cluster dependencies must be configured to be accessible without external IP addresses.<br>
       - `network_uri`<br>
        **Type**: `STRING`<br>
        **Provider name**: `networkUri`<br>
        **Description**: Optional. The Compute Engine network to be used for machine communications. Cannot be specified with <code>subnetwork_uri</code>. If neither <code>network_uri</code> nor <code>subnetwork_uri</code> is specified, the "default" network of the project is used, if it exists. Cannot be a "Custom Subnet Network" (see <a href=https://cloud.google.com/compute/docs/subnetworks>Using Subnetworks</a> for more information). A full URL, partial URI, or short name are valid. Examples: <ul> <li><code>https://www.googleapis.com/compute/v1/projects/[project_id]/regions/global/default</code></li> <li><code>projects/[project_id]/regions/global/default</code></li> <li><code>default</code></li></ul>
       - `node_group_affinity`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `nodeGroupAffinity`<br>
        **Description**: Optional. Node Group Affinity for sole-tenant clusters.<br>
           - `node_group_uri`<br>
            **Type**: `STRING`<br>
            **Provider name**: `nodeGroupUri`<br>
            **Description**: Required. The URI of a sole-tenant <a href=https://cloud.google.com/compute/docs/reference/rest/v1/nodeGroups>node group resource</a> that the cluster will be created on. A full URL, partial URI, or node group name are valid. Examples: <ul><li><code>https://www.googleapis.com/compute/v1/projects/[project_id]/zones/us-central1-a/nodeGroups/node-group-1</code></li> <li><code>projects/[project_id]/zones/us-central1-a/nodeGroups/node-group-1</code></li> <li><code>node-group-1</code></li></ul>
       - `private_ipv6_google_access`<br>
        **Type**: `STRING`<br>
        **Provider name**: `privateIpv6GoogleAccess`<br>
        **Description**: Optional. The type of IPv6 access for a cluster. <br>
        **Possible values**:<br>
          - `PRIVATE_IPV6_GOOGLE_ACCESS_UNSPECIFIED` - If unspecified, Compute Engine default behavior will apply, which is the same as INHERIT_FROM_SUBNETWORK.<br>
          - `INHERIT_FROM_SUBNETWORK` - Private access to and from Google Services configuration inherited from the subnetwork configuration. This is the default Compute Engine behavior.<br>
          - `OUTBOUND` - Enables outbound private IPv6 access to Google Services from the Dataproc cluster.<br>
          - `BIDIRECTIONAL` - Enables bidirectional private IPv6 access between Google Services and the Dataproc cluster.<br>
       - `reservation_affinity`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `reservationAffinity`<br>
        **Description**: Optional. Reservation Affinity for consuming Zonal reservation.<br>
           - `consume_reservation_type`<br>
            **Type**: `STRING`<br>
            **Provider name**: `consumeReservationType`<br>
            **Description**: Optional. Type of reservation to consume <br>
            **Possible values**:<br>
              - `TYPE_UNSPECIFIED`
              - `NO_RESERVATION` - Do not consume from any allocated capacity.<br>
              - `ANY_RESERVATION` - Consume any reservation available.<br>
              - `SPECIFIC_RESERVATION` - Must consume from a specific reservation. Must specify key value fields for specifying the reservations.<br>
           - `key`<br>
            **Type**: `STRING`<br>
            **Provider name**: `key`<br>
            **Description**: Optional. Corresponds to the label key of reservation resource.<br>
           - `values`<br>
            **Type**: `UNORDERED_LIST_STRING`<br>
            **Provider name**: `values`<br>
            **Description**: Optional. Corresponds to the label values of reservation resource.<br>
       - `service_account`<br>
        **Type**: `STRING`<br>
        **Provider name**: `serviceAccount`<br>
        **Description**: Optional. The <a href=https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/service-accounts#service_accounts_in_dataproc>Dataproc service account</a> (also see <a href=https://cloud.google.com/dataproc/docs/concepts/iam/dataproc-principals#vm_service_account_data_plane_identity>VM Data Plane identity</a>) used by Dataproc cluster VM instances to access Google Cloud Platform services.If not specified, the Compute Engine <a href=https://cloud.google.com/compute/docs/access/service-accounts#default_service_account>default service account</a> is used.<br>
       - `service_account_scopes`<br>
        **Type**: `UNORDERED_LIST_STRING`<br>
        **Provider name**: `serviceAccountScopes`<br>
        **Description**: Optional. The URIs of service account scopes to be included in Compute Engine instances. The following base set of scopes is always included: <ul><li>https://www.googleapis.com/auth/cloud.useraccounts.readonly</li> <li>https://www.googleapis.com/auth/devstorage.read_write</li> <li>https://www.googleapis.com/auth/logging.write</li></ul> If no scopes are specified, the following defaults are also provided: <ul><li>https://www.googleapis.com/auth/bigquery</li> <li>https://www.googleapis.com/auth/bigtable.admin.table</li> <li>https://www.googleapis.com/auth/bigtable.data</li> <li>https://www.googleapis.com/auth/devstorage.full_control</li></ul>
       - `shielded_instance_config`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `shieldedInstanceConfig`<br>
        **Description**: Optional. Shielded Instance Config for clusters using Compute Engine <a href=https://cloud.google.com/security/shielded-cloud/shielded-vm>Shielded VMs</a>.<br>
           - `enable_integrity_monitoring`<br>
            **Type**: `BOOLEAN`<br>
            **Provider name**: `enableIntegrityMonitoring`<br>
            **Description**: Optional. Defines whether instances have integrity monitoring enabled.<br>
           - `enable_secure_boot`<br>
            **Type**: `BOOLEAN`<br>
            **Provider name**: `enableSecureBoot`<br>
            **Description**: Optional. Defines whether instances have Secure Boot enabled.<br>
           - `enable_vtpm`<br>
            **Type**: `BOOLEAN`<br>
            **Provider name**: `enableVtpm`<br>
            **Description**: Optional. Defines whether instances have the vTPM enabled.<br>
       - `subnetwork_uri`<br>
        **Type**: `STRING`<br>
        **Provider name**: `subnetworkUri`<br>
        **Description**: Optional. The Compute Engine subnetwork to be used for machine communications. Cannot be specified with network_uri. A full URL, partial URI, or short name are valid. Examples: <ul><li><code>https://www.googleapis.com/compute/v1/projects/[project_id]/regions/us-east1/subnetworks/sub0</code></li> <li><code>projects/[project_id]/regions/us-east1/subnetworks/sub0</code></li> <li><code>sub0</code></li></ul>
       - `zone_uri`<br>
        **Type**: `STRING`<br>
        **Provider name**: `zoneUri`<br>
        **Description**: Optional. The zone where the Compute Engine cluster will be located. On a create request, it is required in the "global" region. If omitted in a non-global Dataproc region, the service will pick a zone in the corresponding Compute Engine region. On a get request, zone will always be present. A full URL, partial URI, or short name are valid. Examples: <ul><li><code>https://www.googleapis.com/compute/v1/projects/[project_id]/zones/[zone]</code></li> <li><code>projects/[project_id]/zones/[zone]</code></li> <li><code>us-central1-f</code></li></ul>
   - `gke_cluster_config`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `gkeClusterConfig`<br>
    **Description**: Optional. BETA. The Kubernetes Engine config for Dataproc clusters deployed to The Kubernetes Engine config for Dataproc clusters deployed to Kubernetes. These config settings are mutually exclusive with Compute Engine-based options, such as gce_cluster_config, master_config, worker_config, secondary_worker_config, and autoscaling_config.<br>
       - `gke_cluster_target`<br>
        **Type**: `STRING`<br>
        **Provider name**: `gkeClusterTarget`<br>
        **Description**: Optional. A target GKE cluster to deploy to. It must be in the same project and region as the Dataproc cluster (the GKE cluster can be zonal or regional). Format: 'projects/{project}/locations/{location}/clusters/{cluster_id}'<br>
       - `namespaced_gke_deployment_target`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `namespacedGkeDeploymentTarget`<br>
        **Description**: Optional. Deprecated. Use gkeClusterTarget. Used only for the deprecated beta. A target for the deployment.<br>
           - `cluster_namespace`<br>
            **Type**: `STRING`<br>
            **Provider name**: `clusterNamespace`<br>
            **Description**: Optional. A namespace within the GKE cluster to deploy into.<br>
           - `target_gke_cluster`<br>
            **Type**: `STRING`<br>
            **Provider name**: `targetGkeCluster`<br>
            **Description**: Optional. The target GKE cluster to deploy to. Format: 'projects/{project}/locations/{location}/clusters/{cluster_id}'<br>
       - `node_pool_target`<br>
        **Type**: `UNORDERED_LIST_STRUCT`<br>
        **Provider name**: `nodePoolTarget`<br>
        **Description**: Optional. GKE node pools where workloads will be scheduled. At least one node pool must be assigned the DEFAULT GkeNodePoolTarget.Role. If a GkeNodePoolTarget is not specified, Dataproc constructs a DEFAULT GkeNodePoolTarget. Each role can be given to only one GkeNodePoolTarget. All node pools must have the same location settings.<br>
           - `node_pool`<br>
            **Type**: `STRING`<br>
            **Provider name**: `nodePool`<br>
            **Description**: Required. The target GKE node pool. Format: 'projects/{project}/locations/{location}/clusters/{cluster}/nodePools/{node_pool}'<br>
           - `node_pool_config`<br>
            **Type**: `STRUCT`<br>
            **Provider name**: `nodePoolConfig`<br>
            **Description**: Input only. The configuration for the GKE node pool.If specified, Dataproc attempts to create a node pool with the specified shape. If one with the same name already exists, it is verified against all specified fields. If a field differs, the virtual cluster creation will fail.If omitted, any node pool with the specified name is used. If a node pool with the specified name does not exist, Dataproc create a node pool with default values.This is an input only field. It will not be returned by the API.<br>
               - `autoscaling`<br>
                **Type**: `STRUCT`<br>
                **Provider name**: `autoscaling`<br>
                **Description**: Optional. The autoscaler configuration for this node pool. The autoscaler is enabled only when a valid configuration is present.<br>
                   - `max_node_count`<br>
                    **Type**: `INT32`<br>
                    **Provider name**: `maxNodeCount`<br>
                    **Description**: The maximum number of nodes in the node pool. Must be >= min_node_count, and must be > 0. Note: Quota must be sufficient to scale up the cluster.<br>
                   - `min_node_count`<br>
                    **Type**: `INT32`<br>
                    **Provider name**: `minNodeCount`<br>
                    **Description**: The minimum number of nodes in the node pool. Must be >= 0 and <= max_node_count.<br>
               - `config`<br>
                **Type**: `STRUCT`<br>
                **Provider name**: `config`<br>
                **Description**: Optional. The node pool configuration.<br>
                   - `accelerators`<br>
                    **Type**: `UNORDERED_LIST_STRUCT`<br>
                    **Provider name**: `accelerators`<br>
                    **Description**: Optional. A list of <a href=https://cloud.google.com/compute/docs/gpus>hardware accelerators</a> to attach to each node.<br>
                       - `accelerator_count`<br>
                        **Type**: `INT64`<br>
                        **Provider name**: `acceleratorCount`<br>
                        **Description**: The number of accelerator cards exposed to an instance.<br>
                       - `accelerator_type`<br>
                        **Type**: `STRING`<br>
                        **Provider name**: `acceleratorType`<br>
                        **Description**: The accelerator type resource namename (see GPUs on Compute Engine).<br>
                       - `gpu_partition_size`<br>
                        **Type**: `STRING`<br>
                        **Provider name**: `gpuPartitionSize`<br>
                        **Description**: Size of partitions to create on the GPU. Valid values are described in the <a href=https://docs.nvidia.com/datacenter/tesla/mig-user-guide/#partitioning>NVIDIA mig user guide</a>.<br>
                   - `boot_disk_kms_key`<br>
                    **Type**: `STRING`<br>
                    **Provider name**: `bootDiskKmsKey`<br>
                    **Description**: Optional. The <a href=https://cloud.google.com/kubernetes-engine/docs/how-to/using-cmek>Customer Managed Encryption Key (CMEK)</a> used to encrypt the boot disk attached to each node in the node pool. Specify the key using the following format: projects/KEY_PROJECT_ID/locations/LOCATION /keyRings/RING_NAME/cryptoKeys/KEY_NAME.<br>
                   - `local_ssd_count`<br>
                    **Type**: `INT32`<br>
                    **Provider name**: `localSsdCount`<br>
                    **Description**: Optional. The number of local SSD disks to attach to the node, which is limited by the maximum number of disks allowable per zone (see <a href=https://cloud.google.com/compute/docs/disks/local-ssd>Adding Local SSDs</a>).<br>
                   - `machine_type`<br>
                    **Type**: `STRING`<br>
                    **Provider name**: `machineType`<br>
                    **Description**: Optional. The name of a Compute Engine <a href=https://cloud.google.com/compute/docs/machine-types>machine type</a>.<br>
                   - `min_cpu_platform`<br>
                    **Type**: `STRING`<br>
                    **Provider name**: `minCpuPlatform`<br>
                    **Description**: Optional. <a href=https://cloud.google.com/compute/docs/instances/specify-min-cpu-platform>Minimum CPU platform</a> to be used by this instance. The instance may be scheduled on the specified or a newer CPU platform. Specify the friendly names of CPU platforms, such as "Intel Haswell" or "Intel Sandy Bridge".<br>
                   - `preemptible`<br>
                    **Type**: `BOOLEAN`<br>
                    **Provider name**: `preemptible`<br>
                    **Description**: Optional. Whether the nodes are created as legacy <a href=https://cloud.google.com/compute/docs/instances/preemptible>preemptible VM instances</a>. Also see Spot VMs, preemptible VM instances without a maximum lifetime. Legacy and Spot preemptible nodes cannot be used in a node pool with the CONTROLLER role or in the DEFAULT node pool if the CONTROLLER role is not assigned (the DEFAULT node pool will assume the CONTROLLER role).<br>
                   - `spot`<br>
                    **Type**: `BOOLEAN`<br>
                    **Provider name**: `spot`<br>
                    **Description**: Optional. Whether the nodes are created as <a href=https://cloud.google.com/compute/docs/instances/spot>Spot VM instances</a>. Spot VMs are the latest update to legacy preemptible VMs. Spot VMs do not have a maximum lifetime. Legacy and Spot preemptible nodes cannot be used in a node pool with the CONTROLLER role or in the DEFAULT node pool if the CONTROLLER role is not assigned (the DEFAULT node pool will assume the CONTROLLER role).<br>
               - `locations`<br>
                **Type**: `UNORDERED_LIST_STRING`<br>
                **Provider name**: `locations`<br>
                **Description**: Optional. The list of Compute Engine <a href=https://cloud.google.com/compute/docs/zones#available>zones</a> where node pool nodes associated with a Dataproc on GKE virtual cluster will be located. Note: All node pools associated with a virtual cluster must be located in the same region as the virtual cluster, and they must be located in the same zone within that region. If a location is not specified during node pool creation, Dataproc on GKE will choose the zone.<br>
           - `roles`<br>
            **Type**: `UNORDERED_LIST_STRING`<br>
            **Provider name**: `roles`<br>
            **Description**: Required. The roles associated with the GKE node pool.<br>
   - `initialization_actions`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `initializationActions`<br>
    **Description**: Optional. Commands to execute on each node after config is completed. By default, executables are run on master and all worker nodes. You can test a node's role metadata to run an executable on a master or worker node, as shown below using curl (you can also use wget): <code>ROLE=$(curl -H Metadata-Flavor:Google http://metadata/computeMetadata/v1/instance/attributes/dataproc-role) if [[ "${ROLE}" == 'Master' ]]; then ... master specific actions ... else ... worker specific actions ... fi</code><br>
       - `executable_file`<br>
        **Type**: `STRING`<br>
        **Provider name**: `executableFile`<br>
        **Description**: Required. Cloud Storage URI of executable file.<br>
       - `execution_timeout`<br>
        **Type**: `STRING`<br>
        **Provider name**: `executionTimeout`<br>
        **Description**: Optional. Amount of time executable has to complete. Default is 10 minutes (see <a href=https://developers.google.com/protocol-buffers/docs/proto3#json>JSON representation of Duration</a>). Cluster creation fails with an explanatory error message (the name of the executable that caused the error and the exceeded timeout period) if the executable is not completed at end of the timeout period.<br>
   - `lifecycle_config`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `lifecycleConfig`<br>
    **Description**: Optional. Lifecycle setting for the cluster.<br>
       - `auto_delete_time`<br>
        **Type**: `TIMESTAMP`<br>
        **Provider name**: `autoDeleteTime`<br>
        **Description**: Optional. The time when cluster will be auto-deleted (see <a href=https://developers.google.com/protocol-buffers/docs/proto3#json>JSON representation of Timestamp</a>).<br>
       - `auto_delete_ttl`<br>
        **Type**: `STRING`<br>
        **Provider name**: `autoDeleteTtl`<br>
        **Description**: Optional. The lifetime duration of cluster. The cluster will be auto-deleted at the end of this period. Minimum value is 10 minutes; maximum value is 14 days (see <a href=https://developers.google.com/protocol-buffers/docs/proto3#json>JSON representation of Duration</a>).<br>
       - `idle_delete_ttl`<br>
        **Type**: `STRING`<br>
        **Provider name**: `idleDeleteTtl`<br>
        **Description**: Optional. The duration to keep the cluster alive while idling (when no jobs are running). Passing this threshold will cause the cluster to be deleted. Minimum value is 5 minutes; maximum value is 14 days (see <a href=https://developers.google.com/protocol-buffers/docs/proto3#json>JSON representation of Duration</a>).<br>
       - `idle_start_time`<br>
        **Type**: `TIMESTAMP`<br>
        **Provider name**: `idleStartTime`<br>
        **Description**: Output only. The time when cluster became idle (most recent job finished) and became eligible for deletion due to idleness (see <a href=https://developers.google.com/protocol-buffers/docs/proto3#json>JSON representation of Timestamp</a>).<br>
   - `master_config`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `masterConfig`<br>
    **Description**: Optional. The Compute Engine config settings for the cluster's master instance.<br>
       - `accelerators`<br>
        **Type**: `UNORDERED_LIST_STRUCT`<br>
        **Provider name**: `accelerators`<br>
        **Description**: Optional. The Compute Engine accelerator configuration for these instances.<br>
           - `accelerator_count`<br>
            **Type**: `INT32`<br>
            **Provider name**: `acceleratorCount`<br>
            **Description**: The number of the accelerator cards of this type exposed to this instance.<br>
           - `accelerator_type_uri`<br>
            **Type**: `STRING`<br>
            **Provider name**: `acceleratorTypeUri`<br>
            **Description**: Full URL, partial URI, or short name of the accelerator type resource to expose to this instance. See <a href=https://cloud.google.com/compute/docs/reference/beta/acceleratorTypes>Compute Engine AcceleratorTypes</a>. Examples: <ul><li><code>https://www.googleapis.com/compute/beta/projects/[project_id]/zones/us-east1-a/acceleratorTypes/nvidia-tesla-k80</code></li> <li><code>projects/[project_id]/zones/us-east1-a/acceleratorTypes/nvidia-tesla-k80</code></li> <li><code>nvidia-tesla-k80</code></li></ul> <p>Auto Zone Exception: If you are using the <a href=https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/auto-zone#using_auto_zone_placement>Dataproc Auto Zone Placement</a> feature, you must use the short name of the accelerator type resource, for example, <code>nvidia-tesla-k80</code>.</p>
       - `disk_config`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `diskConfig`<br>
        **Description**: Optional. Disk option config settings.<br>
           - `boot_disk_size_gb`<br>
            **Type**: `INT32`<br>
            **Provider name**: `bootDiskSizeGb`<br>
            **Description**: Optional. Size in GB of the boot disk (default is 500GB).<br>
           - `boot_disk_type`<br>
            **Type**: `STRING`<br>
            **Provider name**: `bootDiskType`<br>
            **Description**: Optional. Type of the boot disk (default is <code>pd-standard</code>). Valid values: <code>pd-balanced</code> (Persistent Disk Balanced Solid State Drive), <code>pd-ssd</code> (Persistent Disk Solid State Drive), or <code>pd-standard</code> (Persistent Disk Hard Disk Drive). See <a href=https://cloud.google.com/compute/docs/disks#disk-types>Disk types</a>.<br>
           - `local_ssd_interface`<br>
            **Type**: `STRING`<br>
            **Provider name**: `localSsdInterface`<br>
            **Description**: Optional. Interface type of local SSDs (default is <code>scsi</code>). Valid values: <code>scsi</code> (Small Computer System Interface), <code>nvme</code> (Non-Volatile Memory Express). See <a href=https://cloud.google.com/compute/docs/disks/local-ssd#performance>local SSD performance</a>.<br>
           - `num_local_ssds`<br>
            **Type**: `INT32`<br>
            **Provider name**: `numLocalSsds`<br>
            **Description**: Optional. Number of attached SSDs, from 0 to 8 (default is 0). If SSDs are not attached, the boot disk is used to store runtime logs and <a href=https://hadoop.apache.org/docs/r1.2.1/hdfs_user_guide.html>HDFS</a> data. If one or more SSDs are attached, this runtime bulk data is spread across them, and the boot disk contains only basic config and installed binaries. Note: Local SSD options may vary by machine type and number of vCPUs selected.<br>
       - `image_uri`<br>
        **Type**: `STRING`<br>
        **Provider name**: `imageUri`<br>
        **Description**: Optional. The Compute Engine image resource used for cluster instances. The URI can represent an image or image family. Image examples: <ul><li><code>https://www.googleapis.com/compute/beta/projects/[project_id]/global/images/[image-id]</code></li> <li><code>projects/[project_id]/global/images/[image-id]</code></li> <li><code>image-id</code></li></ul> <p>Image family examples. Dataproc will use the most recent image from the family:</p> <ul><li><code>https://www.googleapis.com/compute/beta/projects/[project_id]/global/images/family/[custom-image-family-name]</code></li> <li><code>projects/[project_id]/global/images/family/[custom-image-family-name]</code></li></ul> <p>If the URI is unspecified, it will be inferred from <code>SoftwareConfig.image_version</code> or the system default.</p>
       - `instance_names`<br>
        **Type**: `UNORDERED_LIST_STRING`<br>
        **Provider name**: `instanceNames`<br>
        **Description**: Output only. The list of instance names. Dataproc derives the names from cluster_name, num_instances, and the instance group.<br>
       - `instance_references`<br>
        **Type**: `UNORDERED_LIST_STRUCT`<br>
        **Provider name**: `instanceReferences`<br>
        **Description**: Output only. List of references to Compute Engine instances.<br>
           - `instance_id`<br>
            **Type**: `STRING`<br>
            **Provider name**: `instanceId`<br>
            **Description**: The unique identifier of the Compute Engine instance.<br>
           - `instance_name`<br>
            **Type**: `STRING`<br>
            **Provider name**: `instanceName`<br>
            **Description**: The user-friendly name of the Compute Engine instance.<br>
           - `public_ecies_key`<br>
            **Type**: `STRING`<br>
            **Provider name**: `publicEciesKey`<br>
            **Description**: The public ECIES key used for sharing data with this instance.<br>
           - `public_key`<br>
            **Type**: `STRING`<br>
            **Provider name**: `publicKey`<br>
            **Description**: The public RSA key used for sharing data with this instance.<br>
       - `is_preemptible`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `isPreemptible`<br>
        **Description**: Output only. Specifies that this instance group contains preemptible instances.<br>
       - `machine_type_uri`<br>
        **Type**: `STRING`<br>
        **Provider name**: `machineTypeUri`<br>
        **Description**: Optional. The Compute Engine machine type used for cluster instances. A full URL, partial URI, or short name are valid. Examples: <ul> <li><code>https://www.googleapis.com/compute/v1/projects/[project_id]/zones/us-east1-a/machineTypes/n1-standard-2</code></li> <li><code>projects/[project_id]/zones/us-east1-a/machineTypes/n1-standard-2</code></li> <li><code>n1-standard-2</code></li></ul> <p>Auto Zone Exception: If you are using the <a href=https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/auto-zone#using_auto_zone_placement>Dataproc Auto Zone Placement</a> feature, you must use the short name of the machine type resource, for example, <code>n1-standard-2</code>.</p>
       - `managed_group_config`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `managedGroupConfig`<br>
        **Description**: Output only. The config for Compute Engine Instance Group Manager that manages this group. This is only used for preemptible instance groups.<br>
           - `instance_group_manager_name`<br>
            **Type**: `STRING`<br>
            **Provider name**: `instanceGroupManagerName`<br>
            **Description**: Output only. The name of the Instance Group Manager for this group.<br>
           - `instance_template_name`<br>
            **Type**: `STRING`<br>
            **Provider name**: `instanceTemplateName`<br>
            **Description**: Output only. The name of the Instance Template used for the Managed Instance Group.<br>
       - `min_cpu_platform`<br>
        **Type**: `STRING`<br>
        **Provider name**: `minCpuPlatform`<br>
        **Description**: Optional. Specifies the minimum cpu platform for the Instance Group. See <a href=https://cloud.google.com/dataproc/docs/concepts/compute/dataproc-min-cpu>Dataproc -> Minimum CPU Platform</a>.<br>
       - `num_instances`<br>
        **Type**: `INT32`<br>
        **Provider name**: `numInstances`<br>
        **Description**: Optional. The number of VM instances in the instance group. For HA cluster master_config groups, must be set to 3. For standard cluster master_config groups, must be set to 1.<br>
       - `preemptibility`<br>
        **Type**: `STRING`<br>
        **Provider name**: `preemptibility`<br>
        **Description**: Optional. Specifies the preemptibility of the instance group. The default value for master and worker groups is NON_PREEMPTIBLE. This default cannot be changed. The default value for secondary instances is PREEMPTIBLE. <br>
        **Possible values**:<br>
          - `PREEMPTIBILITY_UNSPECIFIED` - Preemptibility is unspecified, the system will choose the appropriate setting for each instance group.<br>
          - `NON_PREEMPTIBLE` - Instances are non-preemptible. This option is allowed for all instance groups and is the only valid value for Master and Worker instance groups.<br>
          - `PREEMPTIBLE` - Instances are <a href=https://cloud.google.com/compute/docs/instances/preemptible>preemptible</a>. This option is allowed only for <a href=https://cloud.google.com/dataproc/docs/concepts/compute/secondary-vms>secondary worker</a> groups.<br>
          - `SPOT` - Instances are <a href=https://cloud.google.com/compute/docs/instances/spot>Spot VMs</a>.This option is allowed only for <a href=https://cloud.google.com/dataproc/docs/concepts/compute/secondary-vms>secondary worker</a> groups. Spot VMs are the latest version of <a href=https://cloud.google.com/compute/docs/instances/preemptible>preemptible VMs</a>, and provide additional features.<br>
   - `metastore_config`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `metastoreConfig`<br>
    **Description**: Optional. Metastore configuration.<br>
       - `dataproc_metastore_service`<br>
        **Type**: `STRING`<br>
        **Provider name**: `dataprocMetastoreService`<br>
        **Description**: Required. Resource name of an existing Dataproc Metastore service.Example: projects/[project_id]/locations/[dataproc_region]/services/[service-name]<br>
   - `secondary_worker_config`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `secondaryWorkerConfig`<br>
    **Description**: Optional. The Compute Engine config settings for a cluster's secondary worker instances<br>
       - `accelerators`<br>
        **Type**: `UNORDERED_LIST_STRUCT`<br>
        **Provider name**: `accelerators`<br>
        **Description**: Optional. The Compute Engine accelerator configuration for these instances.<br>
           - `accelerator_count`<br>
            **Type**: `INT32`<br>
            **Provider name**: `acceleratorCount`<br>
            **Description**: The number of the accelerator cards of this type exposed to this instance.<br>
           - `accelerator_type_uri`<br>
            **Type**: `STRING`<br>
            **Provider name**: `acceleratorTypeUri`<br>
            **Description**: Full URL, partial URI, or short name of the accelerator type resource to expose to this instance. See <a href=https://cloud.google.com/compute/docs/reference/beta/acceleratorTypes>Compute Engine AcceleratorTypes</a>. Examples: <ul><li><code>https://www.googleapis.com/compute/beta/projects/[project_id]/zones/us-east1-a/acceleratorTypes/nvidia-tesla-k80</code></li> <li><code>projects/[project_id]/zones/us-east1-a/acceleratorTypes/nvidia-tesla-k80</code></li> <li><code>nvidia-tesla-k80</code></li></ul> <p>Auto Zone Exception: If you are using the <a href=https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/auto-zone#using_auto_zone_placement>Dataproc Auto Zone Placement</a> feature, you must use the short name of the accelerator type resource, for example, <code>nvidia-tesla-k80</code>.</p>
       - `disk_config`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `diskConfig`<br>
        **Description**: Optional. Disk option config settings.<br>
           - `boot_disk_size_gb`<br>
            **Type**: `INT32`<br>
            **Provider name**: `bootDiskSizeGb`<br>
            **Description**: Optional. Size in GB of the boot disk (default is 500GB).<br>
           - `boot_disk_type`<br>
            **Type**: `STRING`<br>
            **Provider name**: `bootDiskType`<br>
            **Description**: Optional. Type of the boot disk (default is <code>pd-standard</code>). Valid values: <code>pd-balanced</code> (Persistent Disk Balanced Solid State Drive), <code>pd-ssd</code> (Persistent Disk Solid State Drive), or <code>pd-standard</code> (Persistent Disk Hard Disk Drive). See <a href=https://cloud.google.com/compute/docs/disks#disk-types>Disk types</a>.<br>
           - `local_ssd_interface`<br>
            **Type**: `STRING`<br>
            **Provider name**: `localSsdInterface`<br>
            **Description**: Optional. Interface type of local SSDs (default is <code>scsi</code>). Valid values: <code>scsi</code> (Small Computer System Interface), <code>nvme</code> (Non-Volatile Memory Express). See <a href=https://cloud.google.com/compute/docs/disks/local-ssd#performance>local SSD performance</a>.<br>
           - `num_local_ssds`<br>
            **Type**: `INT32`<br>
            **Provider name**: `numLocalSsds`<br>
            **Description**: Optional. Number of attached SSDs, from 0 to 8 (default is 0). If SSDs are not attached, the boot disk is used to store runtime logs and <a href=https://hadoop.apache.org/docs/r1.2.1/hdfs_user_guide.html>HDFS</a> data. If one or more SSDs are attached, this runtime bulk data is spread across them, and the boot disk contains only basic config and installed binaries. Note: Local SSD options may vary by machine type and number of vCPUs selected.<br>
       - `image_uri`<br>
        **Type**: `STRING`<br>
        **Provider name**: `imageUri`<br>
        **Description**: Optional. The Compute Engine image resource used for cluster instances. The URI can represent an image or image family. Image examples: <ul><li><code>https://www.googleapis.com/compute/beta/projects/[project_id]/global/images/[image-id]</code></li> <li><code>projects/[project_id]/global/images/[image-id]</code></li> <li><code>image-id</code></li></ul> <p>Image family examples. Dataproc will use the most recent image from the family:</p> <ul><li><code>https://www.googleapis.com/compute/beta/projects/[project_id]/global/images/family/[custom-image-family-name]</code></li> <li><code>projects/[project_id]/global/images/family/[custom-image-family-name]</code></li></ul> <p>If the URI is unspecified, it will be inferred from <code>SoftwareConfig.image_version</code> or the system default.</p>
       - `instance_names`<br>
        **Type**: `UNORDERED_LIST_STRING`<br>
        **Provider name**: `instanceNames`<br>
        **Description**: Output only. The list of instance names. Dataproc derives the names from cluster_name, num_instances, and the instance group.<br>
       - `instance_references`<br>
        **Type**: `UNORDERED_LIST_STRUCT`<br>
        **Provider name**: `instanceReferences`<br>
        **Description**: Output only. List of references to Compute Engine instances.<br>
           - `instance_id`<br>
            **Type**: `STRING`<br>
            **Provider name**: `instanceId`<br>
            **Description**: The unique identifier of the Compute Engine instance.<br>
           - `instance_name`<br>
            **Type**: `STRING`<br>
            **Provider name**: `instanceName`<br>
            **Description**: The user-friendly name of the Compute Engine instance.<br>
           - `public_ecies_key`<br>
            **Type**: `STRING`<br>
            **Provider name**: `publicEciesKey`<br>
            **Description**: The public ECIES key used for sharing data with this instance.<br>
           - `public_key`<br>
            **Type**: `STRING`<br>
            **Provider name**: `publicKey`<br>
            **Description**: The public RSA key used for sharing data with this instance.<br>
       - `is_preemptible`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `isPreemptible`<br>
        **Description**: Output only. Specifies that this instance group contains preemptible instances.<br>
       - `machine_type_uri`<br>
        **Type**: `STRING`<br>
        **Provider name**: `machineTypeUri`<br>
        **Description**: Optional. The Compute Engine machine type used for cluster instances. A full URL, partial URI, or short name are valid. Examples: <ul> <li><code>https://www.googleapis.com/compute/v1/projects/[project_id]/zones/us-east1-a/machineTypes/n1-standard-2</code></li> <li><code>projects/[project_id]/zones/us-east1-a/machineTypes/n1-standard-2</code></li> <li><code>n1-standard-2</code></li></ul> <p>Auto Zone Exception: If you are using the <a href=https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/auto-zone#using_auto_zone_placement>Dataproc Auto Zone Placement</a> feature, you must use the short name of the machine type resource, for example, <code>n1-standard-2</code>.</p>
       - `managed_group_config`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `managedGroupConfig`<br>
        **Description**: Output only. The config for Compute Engine Instance Group Manager that manages this group. This is only used for preemptible instance groups.<br>
           - `instance_group_manager_name`<br>
            **Type**: `STRING`<br>
            **Provider name**: `instanceGroupManagerName`<br>
            **Description**: Output only. The name of the Instance Group Manager for this group.<br>
           - `instance_template_name`<br>
            **Type**: `STRING`<br>
            **Provider name**: `instanceTemplateName`<br>
            **Description**: Output only. The name of the Instance Template used for the Managed Instance Group.<br>
       - `min_cpu_platform`<br>
        **Type**: `STRING`<br>
        **Provider name**: `minCpuPlatform`<br>
        **Description**: Optional. Specifies the minimum cpu platform for the Instance Group. See <a href=https://cloud.google.com/dataproc/docs/concepts/compute/dataproc-min-cpu>Dataproc -> Minimum CPU Platform</a>.<br>
       - `num_instances`<br>
        **Type**: `INT32`<br>
        **Provider name**: `numInstances`<br>
        **Description**: Optional. The number of VM instances in the instance group. For HA cluster master_config groups, must be set to 3. For standard cluster master_config groups, must be set to 1.<br>
       - `preemptibility`<br>
        **Type**: `STRING`<br>
        **Provider name**: `preemptibility`<br>
        **Description**: Optional. Specifies the preemptibility of the instance group. The default value for master and worker groups is NON_PREEMPTIBLE. This default cannot be changed. The default value for secondary instances is PREEMPTIBLE. <br>
        **Possible values**:<br>
          - `PREEMPTIBILITY_UNSPECIFIED` - Preemptibility is unspecified, the system will choose the appropriate setting for each instance group.<br>
          - `NON_PREEMPTIBLE` - Instances are non-preemptible.This option is allowed for all instance groups and is the only valid value for Master and Worker instance groups.<br>
          - `PREEMPTIBLE` - Instances are <a href=https://cloud.google.com/compute/docs/instances/preemptible>preemptible</a>. This option is allowed only for <a href=https://cloud.google.com/dataproc/docs/concepts/compute/secondary-vms>secondary worker groups</a>.<br>
          - `SPOT` - Instances are <a href=https://cloud.google.com/compute/docs/instances/spot>Spot VMs</a>.This option is allowed only for <a href=https://cloud.google.com/dataproc/docs/concepts/compute/secondary-vms>secondary worker</a> groups. Spot VMs are the latest version of <a href=https://cloud.google.com/compute/docs/instances/preemptible>preemptible VMs</a>, and provide additional features.<br>
   - `security_config`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `securityConfig`<br>
    **Description**: Optional. Security settings for the cluster.<br>
       - `identity_config`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `identityConfig`<br>
        **Description**: Optional. Identity related configuration, including service account based secure multi-tenancy user mappings.<br>
            
       - `kerberos_config`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `kerberosConfig`<br>
        **Description**: Optional. Kerberos related configuration.<br>
           - `cross_realm_trust_admin_server`<br>
            **Type**: `STRING`<br>
            **Provider name**: `crossRealmTrustAdminServer`<br>
            **Description**: Optional. The admin server (IP or hostname) for the remote trusted realm in a cross realm trust relationship.<br>
           - `cross_realm_trust_kdc`<br>
            **Type**: `STRING`<br>
            **Provider name**: `crossRealmTrustKdc`<br>
            **Description**: Optional. The KDC (IP or hostname) for the remote trusted realm in a cross realm trust relationship.<br>
           - `cross_realm_trust_realm`<br>
            **Type**: `STRING`<br>
            **Provider name**: `crossRealmTrustRealm`<br>
            **Description**: Optional. The remote realm the Dataproc on-cluster KDC will trust, should the user enable cross realm trust.<br>
           - `cross_realm_trust_shared_password_uri`<br>
            **Type**: `STRING`<br>
            **Provider name**: `crossRealmTrustSharedPasswordUri`<br>
            **Description**: Optional. The Cloud Storage URI of a KMS encrypted file containing the shared password between the on-cluster Kerberos realm and the remote trusted realm, in a cross realm trust relationship.<br>
           - `enable_kerberos`<br>
            **Type**: `BOOLEAN`<br>
            **Provider name**: `enableKerberos`<br>
            **Description**: Optional. Flag to indicate whether to Kerberize the cluster (default: false). Set this field to true to enable Kerberos on a cluster.<br>
           - `kdc_db_key_uri`<br>
            **Type**: `STRING`<br>
            **Provider name**: `kdcDbKeyUri`<br>
            **Description**: Optional. The Cloud Storage URI of a KMS encrypted file containing the master key of the KDC database.<br>
           - `key_password_uri`<br>
            **Type**: `STRING`<br>
            **Provider name**: `keyPasswordUri`<br>
            **Description**: Optional. The Cloud Storage URI of a KMS encrypted file containing the password to the user provided key. For the self-signed certificate, this password is generated by Dataproc.<br>
           - `keystore_password_uri`<br>
            **Type**: `STRING`<br>
            **Provider name**: `keystorePasswordUri`<br>
            **Description**: Optional. The Cloud Storage URI of a KMS encrypted file containing the password to the user provided keystore. For the self-signed certificate, this password is generated by Dataproc.<br>
           - `keystore_uri`<br>
            **Type**: `STRING`<br>
            **Provider name**: `keystoreUri`<br>
            **Description**: Optional. The Cloud Storage URI of the keystore file used for SSL encryption. If not provided, Dataproc will provide a self-signed certificate.<br>
           - `kms_key_uri`<br>
            **Type**: `STRING`<br>
            **Provider name**: `kmsKeyUri`<br>
            **Description**: Optional. The uri of the KMS key used to encrypt various sensitive files.<br>
           - `realm`<br>
            **Type**: `STRING`<br>
            **Provider name**: `realm`<br>
            **Description**: Optional. The name of the on-cluster Kerberos realm. If not specified, the uppercased domain of hostnames will be the realm.<br>
           - `root_principal_password_uri`<br>
            **Type**: `STRING`<br>
            **Provider name**: `rootPrincipalPasswordUri`<br>
            **Description**: Optional. The Cloud Storage URI of a KMS encrypted file containing the root principal password.<br>
           - `tgt_lifetime_hours`<br>
            **Type**: `INT32`<br>
            **Provider name**: `tgtLifetimeHours`<br>
            **Description**: Optional. The lifetime of the ticket granting ticket, in hours. If not specified, or user specifies 0, then default value 10 will be used.<br>
           - `truststore_password_uri`<br>
            **Type**: `STRING`<br>
            **Provider name**: `truststorePasswordUri`<br>
            **Description**: Optional. The Cloud Storage URI of a KMS encrypted file containing the password to the user provided truststore. For the self-signed certificate, this password is generated by Dataproc.<br>
           - `truststore_uri`<br>
            **Type**: `STRING`<br>
            **Provider name**: `truststoreUri`<br>
            **Description**: Optional. The Cloud Storage URI of the truststore file used for SSL encryption. If not provided, Dataproc will provide a self-signed certificate.<br>
   - `software_config`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `softwareConfig`<br>
    **Description**: Optional. The config settings for cluster software.<br>
       - `image_version`<br>
        **Type**: `STRING`<br>
        **Provider name**: `imageVersion`<br>
        **Description**: Optional. The version of software inside the cluster. It must be one of the <a href=https://cloud.google.com/dataproc/docs/concepts/versioning/dataproc-versions#supported_dataproc_versions>supported Dataproc Versions</a>, such as "1.2" (including a subminor version, such as "1.2.29"), or the <a href=https://cloud.google.com/dataproc/docs/concepts/versioning/dataproc-versions#other_versions>"preview" version</a>. If unspecified, it defaults to the latest Debian version.<br>
       - `optional_components`<br>
        **Type**: `UNORDERED_LIST_STRING`<br>
        **Provider name**: `optionalComponents`<br>
        **Description**: Optional. The set of components to activate on the cluster.<br>
   - `temp_bucket`<br>
    **Type**: `STRING`<br>
    **Provider name**: `tempBucket`<br>
    **Description**: Optional. A Cloud Storage bucket used to store ephemeral cluster and jobs data, such as Spark and MapReduce history files. If you do not specify a temp bucket, Dataproc will determine a Cloud Storage location (US, ASIA, or EU) for your cluster's temp bucket according to the Compute Engine zone where your cluster is deployed, and then create and manage this project-level, per-location bucket. The default bucket has a TTL of 90 days, but you can use any TTL (or none) if you specify a bucket (see Dataproc <a href=https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/staging-bucket>staging and temp buckets</a>). This field requires a Cloud Storage bucket name, not a gs://... URI to a Cloud Storage bucket.<br>
   - `worker_config`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `workerConfig`<br>
    **Description**: Optional. The Compute Engine config settings for the cluster's worker instances.<br>
       - `accelerators`<br>
        **Type**: `UNORDERED_LIST_STRUCT`<br>
        **Provider name**: `accelerators`<br>
        **Description**: Optional. The Compute Engine accelerator configuration for these instances.<br>
           - `accelerator_count`<br>
            **Type**: `INT32`<br>
            **Provider name**: `acceleratorCount`<br>
            **Description**: The number of the accelerator cards of this type exposed to this instance.<br>
           - `accelerator_type_uri`<br>
            **Type**: `STRING`<br>
            **Provider name**: `acceleratorTypeUri`<br>
            **Description**: Full URL, partial URI, or short name of the accelerator type resource to expose to this instance. See <a href=https://cloud.google.com/compute/docs/reference/beta/acceleratorTypes>Compute Engine AcceleratorTypes</a>. Examples: <ul><li><code>https://www.googleapis.com/compute/beta/projects/[project_id]/zones/us-east1-a/acceleratorTypes/nvidia-tesla-k80</code></li> <li><code>projects/[project_id]/zones/us-east1-a/acceleratorTypes/nvidia-tesla-k80</code></li> <li><code>nvidia-tesla-k80</code></li></ul> <p>Auto Zone Exception: If you are using the <a href=https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/auto-zone#using_auto_zone_placement>Dataproc Auto Zone Placement</a> feature, you must use the short name of the accelerator type resource, for example, <code>nvidia-tesla-k80</code>.</p>
       - `disk_config`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `diskConfig`<br>
        **Description**: Optional. Disk option config settings.<br>
           - `boot_disk_size_gb`<br>
            **Type**: `INT32`<br>
            **Provider name**: `bootDiskSizeGb`<br>
            **Description**: Optional. Size in GB of the boot disk (default is 500GB).<br>
           - `boot_disk_type`<br>
            **Type**: `STRING`<br>
            **Provider name**: `bootDiskType`<br>
            **Description**: Optional. Type of the boot disk (default is <code>pd-standard</code>). Valid values: <code>pd-balanced</code> (Persistent Disk Balanced Solid State Drive), <code>pd-ssd</code> (Persistent Disk Solid State Drive), or <code>pd-standard</code> (Persistent Disk Hard Disk Drive). See <a href=https://cloud.google.com/compute/docs/disks#disk-types>Disk types</a>.<br>
           - `local_ssd_interface`<br>
            **Type**: `STRING`<br>
            **Provider name**: `localSsdInterface`<br>
            **Description**: Optional. Interface type of local SSDs (default is <code>scsi</code>). Valid values: <code>scsi</code> (Small Computer System Interface), <code>nvme</code> (Non-Volatile Memory Express). See <a href=https://cloud.google.com/compute/docs/disks/local-ssd#performance>local SSD performance</a>.<br>
           - `num_local_ssds`<br>
            **Type**: `INT32`<br>
            **Provider name**: `numLocalSsds`<br>
            **Description**: Optional. Number of attached SSDs, from 0 to 8 (default is 0). If SSDs are not attached, the boot disk is used to store runtime logs and <a href=https://hadoop.apache.org/docs/r1.2.1/hdfs_user_guide.html>HDFS</a> data. If one or more SSDs are attached, this runtime bulk data is spread across them, and the boot disk contains only basic config and installed binaries. Note: Local SSD options may vary by machine type and number of vCPUs selected.<br>
       - `image_uri`<br>
        **Type**: `STRING`<br>
        **Provider name**: `imageUri`<br>
        **Description**: Optional. The Compute Engine image resource used for cluster instances. The URI can represent an image or image family. Image examples: <ul><li><code>https://www.googleapis.com/compute/beta/projects/[project_id]/global/images/[image-id]</code></li> <li><code>projects/[project_id]/global/images/[image-id]</code></li> <li><code>image-id</code></li></ul> <p>Image family examples. Dataproc will use the most recent image from the family:</p> <ul><li><code>https://www.googleapis.com/compute/beta/projects/[project_id]/global/images/family/[custom-image-family-name]</code></li> <li><code>projects/[project_id]/global/images/family/[custom-image-family-name]</code></li></ul> <p>If the URI is unspecified, it will be inferred from <code>SoftwareConfig.image_version</code> or the system default.</p>
       - `instance_names`<br>
        **Type**: `UNORDERED_LIST_STRING`<br>
        **Provider name**: `instanceNames`<br>
        **Description**: Output only. The list of instance names. Dataproc derives the names from cluster_name, num_instances, and the instance group.<br>
       - `instance_references`<br>
        **Type**: `UNORDERED_LIST_STRUCT`<br>
        **Provider name**: `instanceReferences`<br>
        **Description**: Output only. List of references to Compute Engine instances.<br>
           - `instance_id`<br>
            **Type**: `STRING`<br>
            **Provider name**: `instanceId`<br>
            **Description**: The unique identifier of the Compute Engine instance.<br>
           - `instance_name`<br>
            **Type**: `STRING`<br>
            **Provider name**: `instanceName`<br>
            **Description**: The user-friendly name of the Compute Engine instance.<br>
           - `public_ecies_key`<br>
            **Type**: `STRING`<br>
            **Provider name**: `publicEciesKey`<br>
            **Description**: The public ECIES key used for sharing data with this instance.<br>
           - `public_key`<br>
            **Type**: `STRING`<br>
            **Provider name**: `publicKey`<br>
            **Description**: The public RSA key used for sharing data with this instance.<br>
       - `is_preemptible`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `isPreemptible`<br>
        **Description**: Output only. Specifies that this instance group contains preemptible instances.<br>
       - `machine_type_uri`<br>
        **Type**: `STRING`<br>
        **Provider name**: `machineTypeUri`<br>
        **Description**: Optional. The Compute Engine machine type used for cluster instances. A full URL, partial URI, or short name are valid. Examples: <ul> <li><code>https://www.googleapis.com/compute/v1/projects/[project_id]/zones/us-east1-a/machineTypes/n1-standard-2</code></li> <li><code>projects/[project_id]/zones/us-east1-a/machineTypes/n1-standard-2</code></li> <li><code>n1-standard-2</code></li></ul> <p>Auto Zone Exception: If you are using the <a href=https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/auto-zone#using_auto_zone_placement>Dataproc Auto Zone Placement</a> feature, you must use the short name of the machine type resource, for example, <code>n1-standard-2</code>.</p>
       - `managed_group_config`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `managedGroupConfig`<br>
        **Description**: Output only. The config for Compute Engine Instance Group Manager that manages this group. This is only used for preemptible instance groups.<br>
           - `instance_group_manager_name`<br>
            **Type**: `STRING`<br>
            **Provider name**: `instanceGroupManagerName`<br>
            **Description**: Output only. The name of the Instance Group Manager for this group.<br>
           - `instance_template_name`<br>
            **Type**: `STRING`<br>
            **Provider name**: `instanceTemplateName`<br>
            **Description**: Output only. The name of the Instance Template used for the Managed Instance Group.<br>
       - `min_cpu_platform`<br>
        **Type**: `STRING`<br>
        **Provider name**: `minCpuPlatform`<br>
        **Description**: Optional. Specifies the minimum cpu platform for the Instance Group. See <a href=https://cloud.google.com/dataproc/docs/concepts/compute/dataproc-min-cpu>Dataproc -> Minimum CPU Platform</a>.<br>
       - `num_instances`<br>
        **Type**: `INT32`<br>
        **Provider name**: `numInstances`<br>
        **Description**: Optional. The number of VM instances in the instance group. For HA cluster master_config groups, must be set to 3. For standard cluster master_config groups, must be set to 1.<br>
       - `preemptibility`<br>
        **Type**: `STRING`<br>
        **Provider name**: `preemptibility`<br>
        **Description**: Optional. Specifies the preemptibility of the instance group. The default value for master and worker groups is NON_PREEMPTIBLE. This default cannot be changed. The default value for secondary instances is PREEMPTIBLE. <br>
        **Possible values**:<br>
          - `PREEMPTIBILITY_UNSPECIFIED` - Preemptibility is unspecified, the system will choose the appropriate setting for each instance group.<br>
          - `NON_PREEMPTIBLE` - Instances are non-preemptible. This option is allowed for all instance groups and is the only valid value for Master and Worker instance groups.<br>
          - `PREEMPTIBLE` - Instances are <a href=https://cloud.google.com/compute/docs/instances/preemptible>preemptible</a>. This option is allowed only for <a href=https://cloud.google.com/dataproc/docs/concepts/compute/secondary-vms>secondary worker</a> groups.<br>
          - `SPOT` - Instances are <a href=https://cloud.google.com/compute/docs/instances/spot>Spot VMs</a>. This option is allowed only for <a href=https://cloud.google.com/dataproc/docs/concepts/compute/secondary-vms>secondary worker</a> groups. Spot VMs are the latest version of <a href=https://cloud.google.com/compute/docs/instances/preemptible>preemptible VMs</a>, and provide additional features.<br>
## `gcp_status`
**Type**: `STRUCT`<br>
**Provider name**: `status`<br>
**Description**: Output only. Cluster status.<br>
   - `detail`<br>
    **Type**: `STRING`<br>
    **Provider name**: `detail`<br>
    **Description**: Optional. Output only. Details of cluster's state.<br>
   - `state`<br>
    **Type**: `STRING`<br>
    **Provider name**: `state`<br>
    **Description**: Output only. The cluster's state. <br>
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
    **Provider name**: `stateStartTime`<br>
    **Description**: Output only. Time when this state was entered (see <a href=https://developers.google.com/protocol-buffers/docs/proto3#json>JSON representation of Timestamp</a>).<br>
   - `substate`<br>
    **Type**: `STRING`<br>
    **Provider name**: `substate`<br>
    **Description**: Output only. Additional state information that includes status reported by the agent. <br>
    **Possible values**:<br>
      - `UNSPECIFIED` - The cluster substate is unknown.<br>
      - `UNHEALTHY` - The cluster is known to be in an unhealthy state (for example, critical daemons are not running or HDFS capacity is exhausted).Applies to RUNNING state.<br>
      - `STALE_STATUS` - The agent-reported status is out of date (may occur if Dataproc loses communication with Agent).Applies to RUNNING state.<br>
## `labels`
**Type**: `UNORDERED_LIST_STRING`<br>
## `metrics`
**Type**: `STRUCT`<br>
**Provider name**: `metrics`<br>
**Description**: Output only. Contains cluster daemon metrics such as HDFS and YARN stats.Beta Feature: This report is available for testing purposes only. It may be changed before final release.<br>
    
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
## `status_history`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `statusHistory`<br>
**Description**: Output only. The previous cluster status.<br>
   - `detail`<br>
    **Type**: `STRING`<br>
    **Provider name**: `detail`<br>
    **Description**: Optional. Output only. Details of cluster's state.<br>
   - `state`<br>
    **Type**: `STRING`<br>
    **Provider name**: `state`<br>
    **Description**: Output only. The cluster's state. <br>
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
    **Provider name**: `stateStartTime`<br>
    **Description**: Output only. Time when this state was entered (see <a href=https://developers.google.com/protocol-buffers/docs/proto3#json>JSON representation of Timestamp</a>).<br>
   - `substate`<br>
    **Type**: `STRING`<br>
    **Provider name**: `substate`<br>
    **Description**: Output only. Additional state information that includes status reported by the agent. <br>
    **Possible values**:<br>
      - `UNSPECIFIED` - The cluster substate is unknown.<br>
      - `UNHEALTHY` - The cluster is known to be in an unhealthy state (for example, critical daemons are not running or HDFS capacity is exhausted).Applies to RUNNING state.<br>
      - `STALE_STATUS` - The agent-reported status is out of date (may occur if Dataproc loses communication with Agent).Applies to RUNNING state.<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `virtual_cluster_config`
**Type**: `STRUCT`<br>
**Provider name**: `virtualClusterConfig`<br>
**Description**: Optional. The virtual cluster config is used when creating a Dataproc cluster that does not directly control the underlying compute resources, for example, when creating a <a href=https://cloud.google.com/dataproc/docs/guides/dpgke/dataproc-gke>Dataproc-on-GKE cluster</a>. Dataproc may set default values, and values may change when clusters are updated. Exactly one of config or virtual_cluster_config must be specified.<br>
   - `auxiliary_services_config`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `auxiliaryServicesConfig`<br>
    **Description**: Optional. Configuration of auxiliary services used by this cluster.<br>
       - `metastore_config`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `metastoreConfig`<br>
        **Description**: Optional. The Hive Metastore configuration for this workload.<br>
           - `dataproc_metastore_service`<br>
            **Type**: `STRING`<br>
            **Provider name**: `dataprocMetastoreService`<br>
            **Description**: Required. Resource name of an existing Dataproc Metastore service.Example: projects/[project_id]/locations/[dataproc_region]/services/[service-name]<br>
       - `spark_history_server_config`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `sparkHistoryServerConfig`<br>
        **Description**: Optional. The Spark History Server configuration for the workload.<br>
           - `dataproc_cluster`<br>
            **Type**: `STRING`<br>
            **Provider name**: `dataprocCluster`<br>
            **Description**: Optional. Resource name of an existing Dataproc Cluster to act as a Spark History Server for the workload.Example: projects/[project_id]/regions/[region]/clusters/[cluster_name]<br>
   - `kubernetes_cluster_config`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `kubernetesClusterConfig`<br>
    **Description**: Required. The configuration for running the Dataproc cluster on Kubernetes.<br>
       - `gke_cluster_config`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `gkeClusterConfig`<br>
        **Description**: Required. The configuration for running the Dataproc cluster on GKE.<br>
           - `gke_cluster_target`<br>
            **Type**: `STRING`<br>
            **Provider name**: `gkeClusterTarget`<br>
            **Description**: Optional. A target GKE cluster to deploy to. It must be in the same project and region as the Dataproc cluster (the GKE cluster can be zonal or regional). Format: 'projects/{project}/locations/{location}/clusters/{cluster_id}'<br>
           - `namespaced_gke_deployment_target`<br>
            **Type**: `STRUCT`<br>
            **Provider name**: `namespacedGkeDeploymentTarget`<br>
            **Description**: Optional. Deprecated. Use gkeClusterTarget. Used only for the deprecated beta. A target for the deployment.<br>
               - `cluster_namespace`<br>
                **Type**: `STRING`<br>
                **Provider name**: `clusterNamespace`<br>
                **Description**: Optional. A namespace within the GKE cluster to deploy into.<br>
               - `target_gke_cluster`<br>
                **Type**: `STRING`<br>
                **Provider name**: `targetGkeCluster`<br>
                **Description**: Optional. The target GKE cluster to deploy to. Format: 'projects/{project}/locations/{location}/clusters/{cluster_id}'<br>
           - `node_pool_target`<br>
            **Type**: `UNORDERED_LIST_STRUCT`<br>
            **Provider name**: `nodePoolTarget`<br>
            **Description**: Optional. GKE node pools where workloads will be scheduled. At least one node pool must be assigned the DEFAULT GkeNodePoolTarget.Role. If a GkeNodePoolTarget is not specified, Dataproc constructs a DEFAULT GkeNodePoolTarget. Each role can be given to only one GkeNodePoolTarget. All node pools must have the same location settings.<br>
               - `node_pool`<br>
                **Type**: `STRING`<br>
                **Provider name**: `nodePool`<br>
                **Description**: Required. The target GKE node pool. Format: 'projects/{project}/locations/{location}/clusters/{cluster}/nodePools/{node_pool}'<br>
               - `node_pool_config`<br>
                **Type**: `STRUCT`<br>
                **Provider name**: `nodePoolConfig`<br>
                **Description**: Input only. The configuration for the GKE node pool.If specified, Dataproc attempts to create a node pool with the specified shape. If one with the same name already exists, it is verified against all specified fields. If a field differs, the virtual cluster creation will fail.If omitted, any node pool with the specified name is used. If a node pool with the specified name does not exist, Dataproc create a node pool with default values.This is an input only field. It will not be returned by the API.<br>
                   - `autoscaling`<br>
                    **Type**: `STRUCT`<br>
                    **Provider name**: `autoscaling`<br>
                    **Description**: Optional. The autoscaler configuration for this node pool. The autoscaler is enabled only when a valid configuration is present.<br>
                       - `max_node_count`<br>
                        **Type**: `INT32`<br>
                        **Provider name**: `maxNodeCount`<br>
                        **Description**: The maximum number of nodes in the node pool. Must be >= min_node_count, and must be > 0. Note: Quota must be sufficient to scale up the cluster.<br>
                       - `min_node_count`<br>
                        **Type**: `INT32`<br>
                        **Provider name**: `minNodeCount`<br>
                        **Description**: The minimum number of nodes in the node pool. Must be >= 0 and <= max_node_count.<br>
                   - `config`<br>
                    **Type**: `STRUCT`<br>
                    **Provider name**: `config`<br>
                    **Description**: Optional. The node pool configuration.<br>
                       - `accelerators`<br>
                        **Type**: `UNORDERED_LIST_STRUCT`<br>
                        **Provider name**: `accelerators`<br>
                        **Description**: Optional. A list of <a href=https://cloud.google.com/compute/docs/gpus>hardware accelerators</a> to attach to each node.<br>
                           - `accelerator_count`<br>
                            **Type**: `INT64`<br>
                            **Provider name**: `acceleratorCount`<br>
                            **Description**: The number of accelerator cards exposed to an instance.<br>
                           - `accelerator_type`<br>
                            **Type**: `STRING`<br>
                            **Provider name**: `acceleratorType`<br>
                            **Description**: The accelerator type resource namename (see GPUs on Compute Engine).<br>
                           - `gpu_partition_size`<br>
                            **Type**: `STRING`<br>
                            **Provider name**: `gpuPartitionSize`<br>
                            **Description**: Size of partitions to create on the GPU. Valid values are described in the <a href=https://docs.nvidia.com/datacenter/tesla/mig-user-guide/#partitioning>NVIDIA mig user guide</a>.<br>
                       - `boot_disk_kms_key`<br>
                        **Type**: `STRING`<br>
                        **Provider name**: `bootDiskKmsKey`<br>
                        **Description**: Optional. The <a href=https://cloud.google.com/kubernetes-engine/docs/how-to/using-cmek>Customer Managed Encryption Key (CMEK)</a> used to encrypt the boot disk attached to each node in the node pool. Specify the key using the following format: projects/KEY_PROJECT_ID/locations/LOCATION /keyRings/RING_NAME/cryptoKeys/KEY_NAME.<br>
                       - `local_ssd_count`<br>
                        **Type**: `INT32`<br>
                        **Provider name**: `localSsdCount`<br>
                        **Description**: Optional. The number of local SSD disks to attach to the node, which is limited by the maximum number of disks allowable per zone (see <a href=https://cloud.google.com/compute/docs/disks/local-ssd>Adding Local SSDs</a>).<br>
                       - `machine_type`<br>
                        **Type**: `STRING`<br>
                        **Provider name**: `machineType`<br>
                        **Description**: Optional. The name of a Compute Engine <a href=https://cloud.google.com/compute/docs/machine-types>machine type</a>.<br>
                       - `min_cpu_platform`<br>
                        **Type**: `STRING`<br>
                        **Provider name**: `minCpuPlatform`<br>
                        **Description**: Optional. <a href=https://cloud.google.com/compute/docs/instances/specify-min-cpu-platform>Minimum CPU platform</a> to be used by this instance. The instance may be scheduled on the specified or a newer CPU platform. Specify the friendly names of CPU platforms, such as "Intel Haswell" or "Intel Sandy Bridge".<br>
                       - `preemptible`<br>
                        **Type**: `BOOLEAN`<br>
                        **Provider name**: `preemptible`<br>
                        **Description**: Optional. Whether the nodes are created as legacy <a href=https://cloud.google.com/compute/docs/instances/preemptible>preemptible VM instances</a>. Also see Spot VMs, preemptible VM instances without a maximum lifetime. Legacy and Spot preemptible nodes cannot be used in a node pool with the CONTROLLER role or in the DEFAULT node pool if the CONTROLLER role is not assigned (the DEFAULT node pool will assume the CONTROLLER role).<br>
                       - `spot`<br>
                        **Type**: `BOOLEAN`<br>
                        **Provider name**: `spot`<br>
                        **Description**: Optional. Whether the nodes are created as <a href=https://cloud.google.com/compute/docs/instances/spot>Spot VM instances</a>. Spot VMs are the latest update to legacy preemptible VMs. Spot VMs do not have a maximum lifetime. Legacy and Spot preemptible nodes cannot be used in a node pool with the CONTROLLER role or in the DEFAULT node pool if the CONTROLLER role is not assigned (the DEFAULT node pool will assume the CONTROLLER role).<br>
                   - `locations`<br>
                    **Type**: `UNORDERED_LIST_STRING`<br>
                    **Provider name**: `locations`<br>
                    **Description**: Optional. The list of Compute Engine <a href=https://cloud.google.com/compute/docs/zones#available>zones</a> where node pool nodes associated with a Dataproc on GKE virtual cluster will be located. Note: All node pools associated with a virtual cluster must be located in the same region as the virtual cluster, and they must be located in the same zone within that region. If a location is not specified during node pool creation, Dataproc on GKE will choose the zone.<br>
               - `roles`<br>
                **Type**: `UNORDERED_LIST_STRING`<br>
                **Provider name**: `roles`<br>
                **Description**: Required. The roles associated with the GKE node pool.<br>
       - `kubernetes_namespace`<br>
        **Type**: `STRING`<br>
        **Provider name**: `kubernetesNamespace`<br>
        **Description**: Optional. A namespace within the Kubernetes cluster to deploy into. If this namespace does not exist, it is created. If it exists, Dataproc verifies that another Dataproc VirtualCluster is not installed into it. If not specified, the name of the Dataproc Cluster is used.<br>
       - `kubernetes_software_config`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `kubernetesSoftwareConfig`<br>
        **Description**: Optional. The software configuration for this Dataproc cluster running on Kubernetes.<br>
   - `staging_bucket`<br>
    **Type**: `STRING`<br>
    **Provider name**: `stagingBucket`<br>
    **Description**: Optional. A Cloud Storage bucket used to stage job dependencies, config files, and job driver console output. If you do not specify a staging bucket, Cloud Dataproc will determine a Cloud Storage location (US, ASIA, or EU) for your cluster's staging bucket according to the Compute Engine zone where your cluster is deployed, and then create and manage this project-level, per-location bucket (see <a href=https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/staging-bucket>Dataproc staging and temp buckets</a>). This field requires a Cloud Storage bucket name, not a gs://... URI to a Cloud Storage bucket.<br>
