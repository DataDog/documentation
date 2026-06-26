---
dependencies: []
disable_edit: true
---
# gcp_dataproc_cluster

## `ancestors`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `cluster_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `clusterName`<br>
**説明**: 必須。クラスター名。プロジェクト内で一意である必要があります。小文字で始まり、小文字、数字、ハイフンを最大 51 文字まで含めることができます。ハイフンで終わることはできません。削除したクラスターの名前を再利用することができます。<br>
## `cluster_uuid`
**タイプ**: `STRING`<br>
**プロバイダー名**: `clusterUuid`<br>
**説明**: 出力のみ。クラスターの UUID (Unique Universal Identifier)。Dataproc はクラスターを作成するときにこの値を生成します。<br>
## `config`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `config`<br>
**説明**: オプション。Compute Engine Instances のクラスター構成。Dataproc はデフォルト値を設定することがあり、クラスターが更新されると値が変更される可能性があることに注意してください。ClusterConfig または VirtualClusterConfig のどちらかを正確に指定する必要があります。<br>
   - `autoscaling_config`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `autoscalingConfig`<br>
    **説明**: オプション。クラスターに関連付けられたポリシーのオートスケール構成。このフィールドが設定されていない場合、クラスターはオートスケールを行いません。<br>
       - `policy_uri`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `policyUri`<br>
        **説明**: オプション。クラスターが使用するオートスケーリングポリシーです。projectid と location (リージョン) を含むリソース名のみが有効です。例: <ul> <li><code>https://www.googleapis.com/compute/v1/projects/[project_id]/locations/[dataproc_region]/autoscalingPolicies/[policy_id]</code></li> <li><code>projects/[project_id]/locations/[dataproc_region]/autoscalingPolicies/[policy_id]</code></li></ul> <p>ポリシーは、同じプロジェクトおよび Dataproc リージョンに存在する必要があることに注意してください。</p>
   - `auxiliary_node_groups`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `auxiliaryNodeGroups`<br>
    **説明**: オプション。ノードグループの設定です。<br>
       - `node_group`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `nodeGroup`<br>
        **説明**: 必須。ノードグループの構成です。<br>
           - `name`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `name`<br>
            **説明**: ノードグループ<a href=https://aip.dev/122>リソース名</a>。<br>
           - `node_group_config`<br>
            **タイプ**: `STRUCT`<br>
            **プロバイダー名**: `nodeGroupConfig`<br>
            **説明**: オプション。ノードグループインスタンスグループの構成です。<br>
               - `accelerators`<br>
                **タイプ**: `UNORDERED_LIST_STRUCT`<br>
                **プロバイダー名**: `accelerators`<br>
                **説明**: オプション。これらのインスタンスに対する Compute Engine のアクセラレーター構成。<br>
                   - `accelerator_count`<br>
                    **タイプ**: `INT32`<br>
                    **プロバイダー名**: `acceleratorCount`<br>
                    **説明**: このインスタンスに公開されている、このタイプのアクセラレーターカードの数。<br>
                   - `accelerator_type_uri`<br>
                    **タイプ**: `STRING`<br>
                    **プロバイダー名**: `acceleratorTypeUri`<br>
                    **説明**: このインスタンスに公開するアクセラレータータイプリソースの完全な URL、部分的な URI、または短い名前。<a href=https://cloud.google.com/compute/docs/reference/beta/acceleratorTypes>Compute Engine AcceleratorTypes</a> を参照してください。例: <ul><li><code>https://www.googleapis.com/compute/beta/projects/[project_id]/zones/us-east1-a/acceleratorTypes/nvidia-tesla-k80</code></li> <li><code>projects/[project_id]/zones/us-east1-a/acceleratorTypes/nvidia-tesla-k80</code></li> <li><code>nvidia-tesla-k80</code></li></ul> <p>オートゾーンの例外: <a href=https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/auto-zone#using_auto_zone_placement>Dataproc Auto Zone Placement</a> 機能を使用する場合は、アクセラレータータイプのリソースの短い名前 (例えば、<code>nvidia-tesla-k80</code>) を使用する必要があります。</p>
               - `disk_config`<br>
                **タイプ**: `STRUCT`<br>
                **プロバイダー名**: `diskConfig`<br>
                **説明**: オプション。ディスクオプション構成設定。<br>
                   - `boot_disk_size_gb`<br>
                    **タイプ**: `INT32`<br>
                    **プロバイダー名**: `bootDiskSizeGb`<br>
                    **説明**: オプション。起動ディスクのサイズ (GB) (デフォルトは 500GB)。<br>
                   - `boot_disk_type`<br>
                    **タイプ**: `STRING`<br>
                    **プロバイダー名**: `bootDiskType`<br>
                    **説明**: オプション。起動ディスクの種類 (デフォルトは <code>pd-standard</code>)。有効な値: <code>pd-balanced</code> (Persistent Disk Balanced Solid State Drive)、<code>pd-ssd</code> (Persistent Disk Solid State Drive)、または <code>pd-standard</code> (Persistent Disk Hard Disk Drive)。<a href=https://cloud.google.com/compute/docs/disks#disk-types>ディスクの種類</a>を参照してください。<br>
                   - `local_ssd_interface`<br>
                    **タイプ**: `STRING`<br>
                    **プロバイダー名**: `localSsdInterface`<br>
                    **説明**: オプション。ローカル SSD のインターフェイスの種類 (デフォルトは <code>scsi</code>)。有効な値: <code>scsi</code> (Small Computer System Interface)、<code>nvme</code> (Non-Volatile Memory Express)。<a href=https://cloud.google.com/compute/docs/disks/local-ssd#performance>ローカル SSD のパフォーマンス</a>を参照してください。<br>
                   - `num_local_ssds`<br>
                    **タイプ**: `INT32`<br>
                    **プロバイダー名**: `numLocalSsds`<br>
                    **説明**: オプション。アタッチする SSD の数を 0 から 8 の間で指定します (デフォルトは 0)。SSD がアタッチされていない場合、ブートディスクはランタイムログと <a href=https://hadoop.apache.org/docs/r1.2.1/hdfs_user_guide.html>HDFS</a> データの保存に使用されます。1 台以上の SSD がアタッチされている場合、このランタイムバルクデータはそれらの SSD に分散され、ブートディスクには基本設定とインストール済みのバイナリのみが格納されます。注: ローカル SSD のオプションは、選択したマシンの種類と vCPU の数によって異なる場合があります。<br>
               - `image_uri`<br>
                **タイプ**: `STRING`<br>
                **プロバイダー名**: `imageUri`<br>
                **説明**: オプション。クラスターインスタンスに使用される Compute Engine のイメージリソースです。URI はイメージまたはイメージファミリーを表すことができます。イメージの例: <ul><li><code>https://www.googleapis.com/compute/beta/projects/[project_id]/global/images/[image-id]</code></li> <li><code>projects/[project_id]/global/images/[image-id]</code></li> <li><code>image-id</code></li></ul> <p>イメージファミリーの例。Dataproc はそのファミリーの中で最も新しいイメージを使用します:</p> <ul><li><code>https://www.googleapis.com/compute/beta/projects/[project_id]/global/images/family/[custom-image-family-name]</code></li> <li><code>projects/[project_id]/global/images/family/[custom-image-family-name]</code></li></ul> <p>URI が指定されていない場合は、<code>SoftwareConfig.image_version</code> またはシステムのデフォルトから推測されます。</p>
               - `instance_names`<br>
                **タイプ**: `UNORDERED_LIST_STRING`<br>
                **プロバイダー名**: `instanceNames`<br>
                **説明**: 出力のみ。インスタンス名のリスト。Dataproc は cluster_name、num_instances、そしてインスタンスグループからこの名前を導き出します。<br>
               - `instance_references`<br>
                **タイプ**: `UNORDERED_LIST_STRUCT`<br>
                **プロバイダー名**: `instanceReferences`<br>
                **説明**: 出力のみ。Compute Engine インスタンスへのリファレンスのリスト。<br>
                   - `instance_id`<br>
                    **タイプ**: `STRING`<br>
                    **プロバイダー名**: `instanceId`<br>
                    **説明**: Compute Engine インスタンスの一意な識別子。<br>
                   - `instance_name`<br>
                    **タイプ**: `STRING`<br>
                    **プロバイダー名**: `instanceName`<br>
                    **説明**: Compute Engine インスタンスのユーザーフレンドリーな名前。<br>
                   - `public_ecies_key`<br>
                    **タイプ**: `STRING`<br>
                    **プロバイダー名**: `publicEciesKey`<br>
                    **説明**: このインスタンスとデータを共有するために使用される公開 ECIES キー。<br>
                   - `public_key`<br>
                    **タイプ**: `STRING`<br>
                    **プロバイダー名**: `publicKey`<br>
                    **説明**: このインスタンスとデータを共有するために使用される公開 RSA キー。<br>
               - `is_preemptible`<br>
                **タイプ**: `BOOLEAN`<br>
                **プロバイダー名**: `isPreemptible`<br>
                **説明**: 出力のみ。このインスタンスグループがプリエンプト可能なインスタンスを含んでいることを指定します。<br>
               - `machine_type_uri`<br>
                **タイプ**: `STRING`<br>
                **プロバイダー名**: `machineTypeUri`<br>
                **説明**: オプション。クラスターインスタンスに使用される Compute Engine のマシンタイプです。完全な URL、部分的な URI、または短い名前が有効です。例: <ul> <li><code>https://www.googleapis.com/compute/v1/projects/[project_id]/zones/us-east1-a/machineTypes/n1-standard-2</code></li> <li><code>projects/[project_id]/zones/us-east1-a/machineTypes/n1-standard-2</code></li> <li><code>n1-standard-2</code></li></ul> <p>オートゾーンの例外: <a href=https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/auto-zone#using_auto_zone_placement>Dataproc Auto Zone Placement</a> 機能を使用する場合は、マシンタイプのリソースの短い名前 (例えば、<code>n1-standard-2</code>) を使用する必要があります。</p>
               - `managed_group_config`<br>
                **タイプ**: `STRUCT`<br>
                **プロバイダー名**: `managedGroupConfig`<br>
                **説明**: 出力のみ。このグループを管理する Compute Engine Instance Group Manager の構成。これは、プリエンプト可能なインスタンスグループにのみ使用されます。<br>
                   - `instance_group_manager_name`<br>
                    **タイプ**: `STRING`<br>
                    **プロバイダー名**: `instanceGroupManagerName`<br>
                    **説明**: 出力のみ。このグループの Instance Group Manager の名前。<br>
                   - `instance_template_name`<br>
                    **タイプ**: `STRING`<br>
                    **プロバイダー名**: `instanceTemplateName`<br>
                    **説明**: 出力のみ。Managed Instance Group に使用される Instance Template の名前。<br>
               - `min_cpu_platform`<br>
                **タイプ**: `STRING`<br>
                **プロバイダー名**: `minCpuPlatform`<br>
                **説明**: オプション。インスタンスグループの最小 CPU プラットフォームを指定します。<a href=https://cloud.google.com/dataproc/docs/concepts/compute/dataproc-min-cpu>Dataproc -> Minimum CPU Platform</a> を参照してください。<br>
               - `num_instances`<br>
                **タイプ**: `INT32`<br>
                **プロバイダー名**: `numInstances`<br>
                **説明**: オプション。インスタンスグループ内の VM インスタンスの数。HA クラスターの master_config グループでは 3 に設定する必要があります。標準的なクラスターの master_config グループでは、1 に設定する必要があります。<br>
               - `preemptibility`<br>
                **タイプ**: `STRING`<br>
                **プロバイダー名**: `preemptibility`<br>
                **説明**: オプション。インスタンスグループのプリエンプティを指定します。マスターとワーカーグループのデフォルト値は NON_PREEMPTIBLE です。このデフォルトは変更することができません。セカンダリーインスタンスのデフォルト値は PREEMPTIBLE です。<br>
                **可能な値**:<br>
                  - `PREEMPTIBILITY_UNSPECIFIED` - プリエンプティが指定されていない場合、システムは各インスタンスグループに対して適切な設定を選択します。<br>
                  - `NON_PREEMPTIBLE` - インスタンスはノンプリエンプティブです。このオプションはすべてのインスタンスグループで許可され、マスターとワーカーのインスタンスグループに対してのみ有効な値です。<br>
                  - `PREEMPTIBLE` - インスタンスは<a href=https://cloud.google.com/compute/docs/instances/preemptible>プリエンプト可能</a>です。このオプションは<a href=https://cloud.google.com/dataproc/docs/concepts/compute/secondary-vms>セカンダリワーカー</a>グループにのみ許可されています。<br>
                  - `SPOT` - インスタンスは<a href=https://cloud.google.com/compute/docs/instances/spot>スポット VM</a> です。このオプションは、<a href=https://cloud.google.com/dataproc/docs/concepts/compute/secondary-vms>セカンダリワーカー</a>グループにのみ許可されています。スポット VM は、<a href=https://cloud.google.com/compute/docs/instances/preemptible>プリエンプト可能な VM</a> の最新版で、追加機能を提供します。<br>
           - `roles`<br>
            **タイプ**: `UNORDERED_LIST_STRING`<br>
            **プロバイダー名**: `roles`<br>
            **説明**: 必須。ノードグループのロールです。<br>
       - `node_group_id`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `nodeGroupId`<br>
        **説明**: オプション。ノードグループ ID です。ID には文字 (a-z、A-Z)、数字 (0-9)、アンダースコア (_)、ハイフン (-) のみを含める必要があります。アンダースコアやハイフンで始まったり終わったりすることはできません。3〜33 文字で構成されている必要があります。<br>
   - `config_bucket`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `configBucket`<br>
    **説明**: オプション。ジョブの依存関係、構成ファイル、ジョブドライバーのコンソール出力をステージングするために使用される Cloud Storage バケット。ステージングバケットを指定しない場合、Cloud Dataproc はクラスターがデプロイされている Compute Engine ゾーンに従ってクラスタのステージングバケット用の Cloud Storage ロケーション (US、ASIA、EU) を決定し、このプロジェクトレベルのロケーションごとのバケットを作成して管理します (Dataproc の<a href=https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/staging-bucket>ステージングと一時バケット</a>を参照してください)。このフィールドは、Cloud Storage バケットへの gs://... URI ではなく、Cloud Storage バケット名を必要とします。<br>
   - `dataproc_metric_config`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `dataprocMetricConfig`<br>
    **説明**: オプション。Dataproc メトリクスの構成。<br>
       - `metrics`<br>
        **タイプ**: `UNORDERED_LIST_STRUCT`<br>
        **プロバイダー名**: `metrics`<br>
        **説明**: 必須。有効にするメトリクスソース。<br>
           - `metric_overrides`<br>
            **タイプ**: `UNORDERED_LIST_STRING`<br>
            **プロバイダー名**: `metricOverrides`<br>
            **説明**: オプション。メトリクスコースで収集する 1 つ以上の利用可能な OSS メトリクスを指定します (SPARK メトリクスソースの場合、任意の Spark メトリクスを指定可能です)。以下のフォーマットでメトリクスを提供します: <code>METRIC_SOURCE: INSTANCE:GROUP:METRIC</code> キャメルケースを適宜使用します。例: <ul><li><code>yarn:ResourceManager:QueueMetrics:AppsCompleted</code></li> <li><code>spark:driver:DAGScheduler:job.allJobs</code></li> <li><code>sparkHistoryServer:JVM:Memory:NonHeapMemoryUsage.committed</code></li> <li><code>hiveserver2:JVM:Memory:NonHeapMemoryUsage.used</code></li></ul> 注: 指定されたオーバーライドされたメトリクスのみがメトリクスソースのために収集されます。たとえば、1 つ以上の spark:executive メトリクスがメトリクスのオーバーライドとしてリストされている場合、他の SPARK メトリクスは収集されません。他の OSS メトリクスソースのデフォルトメトリクスの収集は影響を受けません。たとえば、SPARK と YARN の両方のメトリクスソースが有効で、Spark メトリクスのみにオーバーライドが提供されている場合、すべてのデフォルトの YARN メトリクスが収集されます。<br>
           - `metric_source`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `metricSource`<br>
            **説明**: 必須。メトリクスソースに metricOverrides が指定されていない限り、デフォルトのメトリクスが収集されます (詳しくは利用可能な <a href=https://cloud.google.com/dataproc/docs/guides/monitoring#available_oss_metrics>OSS メトリクス</a>を参照してください)。 <br>
            **可能な値**:<br>
              - `METRIC_SOURCE_UNSPECIFIED` - 必要な不特定多数のメトリクスソース。<br>
              - `MONITORING_AGENT_DEFAULTS` - デフォルトのモニタリング Agent のメトリクス。このソースを有効にすると、Dataproc は Compute Engine でモニタリング Agent を有効にし、デフォルトのモニタリング Agent メトリクスを収集し、それは agent.googleapis.com のプレフィックスで公開されます。<br>
              - `HDFS` - HDFS のメトリクスソース。<br>
              - `SPARK` - Spark のメトリクスソース。<br>
              - `YARN` - YARN のメトリクスソース。<br>
              - `SPARK_HISTORY_SERVER` - Spark History Server のメトリクスソース。<br>
              - `HIVESERVER2` - Hiveserver2 のメトリクスソース。<br>
   - `encryption_config`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `encryptionConfig`<br>
    **説明**: オプション。クラスターの暗号化設定。<br>
       - `gce_pd_kms_key_name`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `gcePdKmsKeyName`<br>
        **説明**: オプション。クラスター内の全インスタンスの PD ディスク暗号化に使用する Cloud KMS キー名。<br>
   - `endpoint_config`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `endpointConfig`<br>
    **説明**: オプション。このクラスターのポート/エンドポイント構成<br>
       - `enable_http_port_access`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `enableHttpPortAccess`<br>
        **説明**: オプション。true の場合、クラスター上の特定のポートに対して、外部からの http アクセスを有効にします。デフォルトは false です。<br>
   - `gce_cluster_config`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `gceClusterConfig`<br>
    **説明**: オプション。クラスター内の全インスタンスで共有される Compute Engine の構成設定。<br>
       - `confidential_instance_config`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `confidentialInstanceConfig`<br>
        **説明**: オプション。<a href=https://cloud.google.com/compute/confidential-vm/docs>Confidential VM</a> を使用するクラスター用の Confidential Instance Config です。<br>
           - `enable_confidential_compute`<br>
            **タイプ**: `BOOLEAN`<br>
            **プロバイダー名**: `enableConfidentialCompute`<br>
            **説明**: オプション。インスタンスがコンフィデンシャルコンピューティングを有効にするかどうかを定義します。<br>
       - `internal_ip_only`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `internalIpOnly`<br>
        **説明**: オプション。true の場合、クラスター内のすべてのインスタンスは内部 IP アドレスのみを持つようになります。デフォルトでは、クラスターは内部 IP アドレスに制限されず、各インスタンスに割り当てられたエフェメラルな外部 IP アドレスを持つことになります。この internal_ip_only 制限はサブネットワークが有効なネットワークに対してのみ有効で、クラスター外の依存関係はすべて、外部 IP アドレスなしでアクセスできるように構成する必要があります。<br>
       - `network_uri`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `networkUri`<br>
        **説明**: オプション。マシン通信に使用する Compute Engine のネットワーク。<code>subnetwork_uri</code> と一緒に指定することはできません。<code>network_uri</code> も <code>subnetwork_uri</code> も指定しない場合、プロジェクトの "default" ネットワークが存在すれば、それが使用されます。"Custom Subnet Network" にはできません (詳しくは<a href=https://cloud.google.com/compute/docs/subnetworks>サブネットワークの使用</a>を参照してください)。完全な URL、部分的な URI、短い名前のいずれかが有効です。例: <ul> <li><code>https://www.googleapis.com/compute/v1/projects/[project_id]/regions/global/default</code></li> <li><code>projects/[project_id]/regions/global/default</code></li> <li><code>default</code></li></ul>
       - `node_group_affinity`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `nodeGroupAffinity`<br>
        **説明**: オプション。ソールテナントクラスターのノードグループアフィニティ。<br>
           - `node_group_uri`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `nodeGroupUri`<br>
            **説明**: 必須。クラスターを作成する、単独テナント<a href=https://cloud.google.com/compute/docs/reference/rest/v1/nodeGroups>ノードグループリソース</a>の URI です。完全な URL、部分的な URI、またはノードグループ名が有効です。例: <ul><li><code>https://www.googleapis.com/compute/v1/projects/[project_id]/zones/us-central1-a/nodeGroups/node-group-1</code></li> <li><code>projects/[project_id]/zones/us-central1-a/nodeGroups/node-group-1</code></li> <li><code>node-group-1</code></li></ul>
       - `private_ipv6_google_access`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `privateIpv6GoogleAccess`<br>
        **説明**: オプション。クラスターの IPv6 アクセスのタイプ。 <br>
        **可能な値**:<br>
          - `PRIVATE_IPV6_GOOGLE_ACCESS_UNSPECIFIED` - 未指定の場合、Compute Engine のデフォルトの動作が適用され、INHERIT_FROM_SUBNETWORK と同じになります。<br>
          - `INHERIT_FROM_SUBNETWORK` - サブネットワーク構成から継承された Google Services 構成からのプライベートアクセス。これは、Compute Engine のデフォルトの動作です。<br>
          - `OUTBOUND` - Dataproc クラスターから Google Services へのアウトバウンドプライベート IPv6 アクセスを有効にします。<br>
          - `BIDIRECTIONAL` - Google Services と Dataproc クラスター間の双方向のプライベート IPv6 アクセスを可能にします。<br>
       - `reservation_affinity`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `reservationAffinity`<br>
        **説明**: オプション。ゾーン予約を消費するための予約アフィニティ。<br>
           - `consume_reservation_type`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `consumeReservationType`<br>
            **説明**: オプション。消費する予約のタイプ <br>
            **可能な値**:<br>
              - `TYPE_UNSPECIFIED`
              - `NO_RESERVATION` - 割り当てられた容量から消費しません。<br>
              - `ANY_RESERVATION` - 利用できる予約を消費します。<br>
              - `SPECIFIC_RESERVATION` - 特定の予約から消費する必要があります。予約を指定するためのキーバリューフィールドを指定しなければなりません。<br>
           - `key`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `key`<br>
            **説明**: オプション。予約リソースのラベルキーに相当します。<br>
           - `values`<br>
            **タイプ**: `UNORDERED_LIST_STRING`<br>
            **プロバイダー名**: `values`<br>
            **説明**: オプション。予約リソースのラベル値に相当します。<br>
       - `service_account`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `serviceAccount`<br>
        **説明**: オプション。Dataproc クラスター VM インスタンスが Google Cloud Platform のサービスにアクセスする際に使用する <a href=https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/service-accounts#service_accounts_in_dataproc>Dataproc サービスアカウント</a> (<a href=https://cloud.google.com/dataproc/docs/concepts/iam/dataproc-principals#vm_service_account_data_plane_identity>VM Data Plane アイデンティティ</a>も参照)。指定しない場合は、Compute Engine の<a href=https://cloud.google.com/compute/docs/access/service-accounts#default_service_account>デフォルトのサービスアカウント</a>が使用されます。<br>
       - `service_account_scopes`<br>
        **タイプ**: `UNORDERED_LIST_STRING`<br>
        **プロバイダー名**: `serviceAccountScopes`<br>
        **説明**: オプション。Compute Engine インスタンスに含まれるサービスアカウントスコープの URI。以下の基本スコープが常に含まれます。 <ul><li>https://www.googleapis.com/auth/cloud.useraccounts.readonly</li> <li>https://www.googleapis.com/auth/devstorage.read_write</li> <li>https://www.googleapis.com/auth/logging.write</li></ul> スコープが指定されない場合、以下のデフォルトも提供されます。 <ul><li>https://www.googleapis.com/auth/bigquery</li> <li>https://www.googleapis.com/auth/bigtable.admin.table</li> <li>https://www.googleapis.com/auth/bigtable.data</li> <li>https://www.googleapis.com/auth/devstorage.full_control</li></ul>
       - `shielded_instance_config`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `shieldedInstanceConfig`<br>
        **説明**: オプション。Compute Engine <a href=https://cloud.google.com/security/shielded-cloud/shielded-vm>Shielded VM</a> を使用するクラスター用の Shielded Instance Config です。<br>
           - `enable_integrity_monitoring`<br>
            **タイプ**: `BOOLEAN`<br>
            **プロバイダー名**: `enableIntegrityMonitoring`<br>
            **説明**: オプション。インスタンスの整合性監視が有効であるかどうかを定義します。<br>
           - `enable_secure_boot`<br>
            **タイプ**: `BOOLEAN`<br>
            **プロバイダー名**: `enableSecureBoot`<br>
            **説明**: オプション。インスタンスでセキュアブートが有効かどうかを定義します。<br>
           - `enable_vtpm`<br>
            **タイプ**: `BOOLEAN`<br>
            **プロバイダー名**: `enableVtpm`<br>
            **説明**: オプション。インスタンスで vTPM が有効になっているかどうかを定義します。<br>
       - `subnetwork_uri`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `subnetworkUri`<br>
        **説明**: オプション。マシン通信に使用する Compute Engine のサブネットワークです。network_uri と一緒に指定することはできません。完全な URL、部分的な URI、短い名前のいずれかが有効です。例: <ul><li><code>https://www.googleapis.com/compute/v1/projects/[project_id]/regions/us-east1/subnetworks/sub0</code></li> <li><code>projects/[project_id]/regions/us-east1/subnetworks/sub0</code></li> <li><code>sub0</code></li></ul>
       - `zone_uri`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `zoneUri`<br>
        **説明**: オプション。Compute Engine クラスターが配置されるゾーン。作成リクエストでは、"グローバル" リージョンで必須となります。グローバルでない Dataproc リージョンで省略された場合、サービスは対応する Compute Engine リージョン内のゾーンを選択します。get リクエストでは、zone は常に存在します。完全な URL、部分的な URI、または短い名前が有効です。例: <ul><li><code>https://www.googleapis.com/compute/v1/projects/[project_id]/zones/[zone]</code></li> <li><code>projects/[project_id]/zones/[zone]</code></li> <li><code>us-central1-f</code></li></ul>
   - `gke_cluster_config`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `gkeClusterConfig`<br>
    **説明**: オプション。ベータ版。Kubernetes にデプロイされた Dataproc クラスターの Kubernetes Engine 構成にデプロイされた Dataproc クラスターの Kubernetes Engine 構成。これらの構成は、gce_cluster_config、master_config、worker_config、secondary_worker_config、autoscaling_config などの Compute Engine ベースのオプションとは互いに排他的になります。<br>
       - `gke_cluster_target`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `gkeClusterTarget`<br>
        **説明**: オプション。デプロイ先の GKE クラスター。Dataproc クラスターと同じプロジェクトおよびリージョンである必要があります (GKE クラスターはゾーンまたはリージョナルである可能性があります)。フォーマット: 'projects/{project}/locations/{location}/clusters/{cluster_id}'<br>
       - `namespaced_gke_deployment_target`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `namespacedGkeDeploymentTarget`<br>
        **説明**: オプション。非推奨。gkeClusterTarget を使ってください。非推奨のベータ版でのみ使用されます。デプロイメントのターゲット。<br>
           - `cluster_namespace`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `clusterNamespace`<br>
            **説明**: オプション。デプロイ先となる GKE クラスター内のネームスペース。<br>
           - `target_gke_cluster`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `targetGkeCluster`<br>
            **説明**: オプション。デプロイ先となる GKE クラスター。フォーマット: 'projects/{project}/locations/{location}/clusters/{cluster_id}'<br>
       - `node_pool_target`<br>
        **タイプ**: `UNORDERED_LIST_STRUCT`<br>
        **プロバイダー名**: `nodePoolTarget`<br>
        **説明**: オプション。ワークロードがスケジュールされる GKE ノードプール。少なくとも 1 つのノードプールには、DEFAULT GkeNodePoolTarget.Role が割り当てられていなければなりません。GkeNodePoolTarget が指定されていない場合、Dataproc は DEFAULT GkeNodePoolTarget を作成します。各ロールは、1 つの GkeNodePoolTarget にのみ指定することができます。すべてのノードプールは、同じロケーション設定でなければなりません。<br>
           - `node_pool`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `nodePool`<br>
            **説明**: 必須。対象の GKE ノードプール。フォーマット: 'projects/{project}/locations/{location}/clusters/{cluster}/nodePools/{node_pool}'<br>
           - `node_pool_config`<br>
            **タイプ**: `STRUCT`<br>
            **プロバイダー名**: `nodePoolConfig`<br>
            **説明**: 入力のみ。GKE ノードプールの構成。指定された場合、Dataproc は指定された形状を持つノードプールを作成しようとします。同名のものがすでに存在する場合は、指定されたすべてのフィールドと照合されます。フィールドが異なる場合、仮想クラスターの作成は失敗します。省略した場合は、指定された名前のノードプールが使用されます。指定された名前のノードプールが存在しない場合、Dataproc はデフォルト値でノードプールを作成します。これは入力専用フィールドです。API から返されることはありません。<br>
               - `autoscaling`<br>
                **タイプ**: `STRUCT`<br>
                **プロバイダー名**: `autoscaling`<br>
                **説明**: オプション。このノードプールのオートスケーラ構成。有効な構成が存在する場合にのみ、オートスケーラが有効になります。<br>
                   - `max_node_count`<br>
                    **タイプ**: `INT32`<br>
                    **プロバイダー名**: `maxNodeCount`<br>
                    **説明**: ノードプールの最大ノード数。min_node_count 以上で、かつ 0 よりも大きい値である必要があります。注: クォータはクラスターをスケールアップするのに十分な値でなければなりません。<br>
                   - `min_node_count`<br>
                    **タイプ**: `INT32`<br>
                    **プロバイダー名**: `minNodeCount`<br>
                    **説明**: ノードプールの最小ノード数。0 以上かつ max_node_count 以下でなければなりません。<br>
               - `config`<br>
                **タイプ**: `STRUCT`<br>
                **プロバイダー名**: `config`<br>
                **説明**: オプション。ノードプールの構成。<br>
                   - `accelerators`<br>
                    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
                    **プロバイダー名**: `accelerators`<br>
                    **説明**: オプション。各ノードにアタッチする<a href=https://cloud.google.com/compute/docs/gpus>ハードウェアアクセラレーター</a>のリストです。<br>
                       - `accelerator_count`<br>
                        **タイプ**: `INT64`<br>
                        **プロバイダー名**: `acceleratorCount`<br>
                        **説明**: インスタンスに公開されるアクセラレーターカードの数。<br>
                       - `accelerator_type`<br>
                        **タイプ**: `STRING`<br>
                        **プロバイダー名**: `acceleratorType`<br>
                        **説明**: アクセラレータータイプのリソース名 (Compute Engine の GPU を参照)。<br>
                       - `gpu_partition_size`<br>
                        **タイプ**: `STRING`<br>
                        **プロバイダー名**: `gpuPartitionSize`<br>
                        **説明**: GPU 上に作成するパーティションのサイズ。有効な値は、<a href=https://docs.nvidia.com/datacenter/tesla/mig-user-guide/#partitioning>NVIDIA 移行ユーザーガイド</a>に記載されています。<br>
                   - `boot_disk_kms_key`<br>
                    **タイプ**: `STRING`<br>
                    **プロバイダー名**: `bootDiskKmsKey`<br>
                    **説明**: オプション。ノードプールの各ノードにアタッチされている起動ディスクを暗号化するための <a href=https://cloud.google.com/kubernetes-engine/docs/how-to/using-cmek>CMEK (Customer Managed Encryption Key</a>。以下のフォーマットでキーを指定します: projects/KEY_PROJECT_ID/locations/LOCATION /keyRings/RING_NAME/cryptoKeys/KEY_NAME<br>
                   - `local_ssd_count`<br>
                    **タイプ**: `INT32`<br>
                    **プロバイダー名**: `localSsdCount`<br>
                    **説明**: オプション。ノードにアタッチするローカル SSD ディスクの数で、ゾーンごとに許容されるディスクの最大数によって制限されます (<a href=https://cloud.google.com/compute/docs/disks/local-ssd>ローカル SSD の追加</a>を参照してください)。<br>
                   - `machine_type`<br>
                    **タイプ**: `STRING`<br>
                    **プロバイダー名**: `machineType`<br>
                    **説明**: オプション。Compute Engine の<a href=https://cloud.google.com/compute/docs/machine-types>マシンタイプ</a>の名前です。<br>
                   - `min_cpu_platform`<br>
                    **タイプ**: `STRING`<br>
                    **プロバイダー名**: `minCpuPlatform`<br>
                    **説明**: オプション。このインスタンスで使用される<a href=https://cloud.google.com/compute/docs/instances/specify-min-cpu-platform>最小 CPU プラットフォーム</a>です。インスタンスは、指定された CPU プラットフォームまたはより新しい CPU プラットフォームでスケジュールされる可能性があります。"Intel Haswell" や "Intel Sandy Bridge" など、CPU プラットフォームのフレンドリーな名前を指定します。<br>
                   - `preemptible`<br>
                    **タイプ**: `BOOLEAN`<br>
                    **プロバイダー名**: `preemptible`<br>
                    **説明**: オプション。レガシーの<a href=https://cloud.google.com/compute/docs/instances/preemptible>プリエンプト可能 VM インスタンス</a>としてノードを作成するかどうか。最大寿命のないプリエンプト可能 VM インスタンス、スポット VM も参照してください。レガシーおよびスポットのプリエンプト可能ノードは、CONTROLLER ロールを持つノードプールや、CONTROLLER ロールが割り当てられていない場合は DEFAULT ノードプールで使用できません (DEFAULT ノードプールが CONTROLLER ロールを引き継ぎます)。<br>
                   - `spot`<br>
                    **タイプ**: `BOOLEAN`<br>
                    **プロバイダー名**: `spot`<br>
                    **説明**: オプション。<a href=https://cloud.google.com/compute/docs/instances/spot>スポット VM インスタンス</a>としてノードを作成するかどうか。スポット VM は、レガシーのプリエンプト可能 VM の最新のアップデートです。スポット VM には最大寿命はありません。レガシーおよびスポットのプリエンプト可能ノードは、CONTROLLER ロールを持つノードプールや、CONTROLLER ロールが割り当てられていない場合は DEFAULT ノードプールで使用できません (DEFAULT ノードプールが CONTROLLER ロールを引き継ぎます)。<br>
               - `locations`<br>
                **タイプ**: `UNORDERED_LIST_STRING`<br>
                **プロバイダー名**: `locations`<br>
                **説明**: オプション。Dataproc on GKE 仮想クラスターに関連付けられたノードプールノードが配置される Compute Engine <a href=https://cloud.google.com/compute/docs/zones#available>ゾーン</a>のリスト。注: 仮想クラスターに関連付けられたすべてのノードプールは、仮想クラスターと同じリージョンに配置され、そのリージョン内の同じゾーンに配置されなければなりません。ノードプール作成時に場所が指定されない場合、Dataproc on GKE がゾーンを選択します。<br>
           - `roles`<br>
            **タイプ**: `UNORDERED_LIST_STRING`<br>
            **プロバイダー名**: `roles`<br>
            **説明**: 必須。GKE ノードプールに関連するロール。<br>
   - `initialization_actions`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `initializationActions`<br>
    **説明**: オプション。構成完了後、各ノードで実行するコマンドです。デフォルトでは、マスターノードとすべてのワーカーノードで実行ファイルが実行されます。ノードのロールメタデータをテストして、以下のように curl を使ってマスターノードやワーカーノードで実行ファイルを実行することができます (wget でも可能です)。 <code>ROLE=$(curl -H Metadata-Flavor:Google http://metadata/computeMetadata/v1/instance/attributes/dataproc-role) if [[ "${ROLE}" == 'Master' ]]; then ... master specific actions ... else ... worker specific actions ... fi</code><br>
       - `executable_file`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `executableFile`<br>
        **説明**: 必須。実行ファイルのクラウドストレージ URI。<br>
       - `execution_timeout`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `executionTimeout`<br>
        **説明**: オプション。実行ファイルが完成するまでの時間。デフォルトは 10 分です (<a href=https://developers.google.com/protocol-buffers/docs/proto3#json>Duration の JSON 表現</a>を参照してください)。クラスター作成は、タイムアウト時間の終了時に実行ファイルが完了していない場合、説明のためのエラーメッセージ (エラーの原因となった実行ファイル名と超過したタイムアウト時間) を表示して失敗します。<br>
   - `lifecycle_config`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `lifecycleConfig`<br>
    **説明**: オプション。クラスターのライフサイクルの設定。<br>
       - `auto_delete_time`<br>
        **タイプ**: `TIMESTAMP`<br>
        **プロバイダー名**: `autoDeleteTime`<br>
        **説明**: オプション。クラスターが自動削除される時間 (<a href=https://developers.google.com/protocol-buffers/docs/proto3#json>Timestamp の JSON 表現</a>を参照してください)。<br>
       - `auto_delete_ttl`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `autoDeleteTtl`<br>
        **説明**: オプション。クラスターの有効期間。この期間が終了すると、クラスターは自動削除されます。最小値は 10 分、最大値は 14 日です (<a href=https://developers.google.com/protocol-buffers/docs/proto3#json>Duration の JSON 表現</a>を参照してください)。<br>
       - `idle_delete_ttl`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `idleDeleteTtl`<br>
        **説明**: オプション。アイドル時 (ジョブが実行されていない時) にクラスターを存続させる期間。このしきい値を超えると、クラスターは削除されます。最小値は 5 分、最大値は 14 日です (<a href=https://developers.google.com/protocol-buffers/docs/proto3#json>Duration の JSON 表現</a>を参照してください)。<br>
       - `idle_start_time`<br>
        **タイプ**: `TIMESTAMP`<br>
        **プロバイダー名**: `idleStartTime`<br>
        **説明**: 出力のみ。クラスターがアイドル状態 (直近のジョブが終了) になり、アイドル状態のため削除対象となった時間 (<a href=https://developers.google.com/protocol-buffers/docs/proto3#json>Timestamp の JSON 表現</a>を参照してください)。<br>
   - `master_config`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `masterConfig`<br>
    **説明**: オプション。クラスターのマスターインスタンスに対する Compute Engine の構成設定。<br>
       - `accelerators`<br>
        **タイプ**: `UNORDERED_LIST_STRUCT`<br>
        **プロバイダー名**: `accelerators`<br>
        **説明**: オプション。これらのインスタンスに対する Compute Engine のアクセラレーター構成。<br>
           - `accelerator_count`<br>
            **タイプ**: `INT32`<br>
            **プロバイダー名**: `acceleratorCount`<br>
            **説明**: このインスタンスに公開されている、このタイプのアクセラレーターカードの数。<br>
           - `accelerator_type_uri`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `acceleratorTypeUri`<br>
            **説明**: このインスタンスに公開するアクセラレータータイプリソースの完全な URL、部分的な URI、または短い名前。<a href=https://cloud.google.com/compute/docs/reference/beta/acceleratorTypes>Compute Engine AcceleratorTypes</a> を参照してください。例: <ul><li><code>https://www.googleapis.com/compute/beta/projects/[project_id]/zones/us-east1-a/acceleratorTypes/nvidia-tesla-k80</code></li> <li><code>projects/[project_id]/zones/us-east1-a/acceleratorTypes/nvidia-tesla-k80</code></li> <li><code>nvidia-tesla-k80</code></li></ul> <p>オートゾーンの例外: <a href=https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/auto-zone#using_auto_zone_placement>Dataproc Auto Zone Placement</a> 機能を使用する場合は、アクセラレータータイプのリソースの短い名前 (例えば、<code>nvidia-tesla-k80</code>) を使用する必要があります。</p>
       - `disk_config`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `diskConfig`<br>
        **説明**: オプション。ディスクオプション構成設定。<br>
           - `boot_disk_size_gb`<br>
            **タイプ**: `INT32`<br>
            **プロバイダー名**: `bootDiskSizeGb`<br>
            **説明**: オプション。起動ディスクのサイズ (GB) (デフォルトは 500GB)。<br>
           - `boot_disk_type`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `bootDiskType`<br>
            **説明**: オプション。起動ディスクの種類 (デフォルトは <code>pd-standard</code>)。有効な値: <code>pd-balanced</code> (Persistent Disk Balanced Solid State Drive)、<code>pd-ssd</code> (Persistent Disk Solid State Drive)、または <code>pd-standard</code> (Persistent Disk Hard Disk Drive)。<a href=https://cloud.google.com/compute/docs/disks#disk-types>ディスクの種類</a>を参照してください。<br>
           - `local_ssd_interface`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `localSsdInterface`<br>
            **説明**: オプション。ローカル SSD のインターフェイスの種類 (デフォルトは <code>scsi</code>)。有効な値: <code>scsi</code> (Small Computer System Interface)、<code>nvme</code> (Non-Volatile Memory Express)。<a href=https://cloud.google.com/compute/docs/disks/local-ssd#performance>ローカル SSD のパフォーマンス</a>を参照してください。<br>
           - `num_local_ssds`<br>
            **タイプ**: `INT32`<br>
            **プロバイダー名**: `numLocalSsds`<br>
            **説明**: オプション。アタッチする SSD の数を 0 から 8 の間で指定します (デフォルトは 0)。SSD がアタッチされていない場合、ブートディスクはランタイムログと <a href=https://hadoop.apache.org/docs/r1.2.1/hdfs_user_guide.html>HDFS</a> データの保存に使用されます。1 台以上の SSD がアタッチされている場合、このランタイムバルクデータはそれらの SSD に分散され、ブートディスクには基本設定とインストール済みのバイナリのみが格納されます。注: ローカル SSD のオプションは、選択したマシンの種類と vCPU の数によって異なる場合があります。<br>
       - `image_uri`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `imageUri`<br>
        **説明**: オプション。クラスターインスタンスに使用される Compute Engine のイメージリソースです。URI はイメージまたはイメージファミリーを表すことができます。イメージの例: <ul><li><code>https://www.googleapis.com/compute/beta/projects/[project_id]/global/images/[image-id]</code></li> <li><code>projects/[project_id]/global/images/[image-id]</code></li> <li><code>image-id</code></li></ul> <p>イメージファミリーの例。Dataproc はそのファミリーの中で最も新しいイメージを使用します:</p> <ul><li><code>https://www.googleapis.com/compute/beta/projects/[project_id]/global/images/family/[custom-image-family-name]</code></li> <li><code>projects/[project_id]/global/images/family/[custom-image-family-name]</code></li></ul> <p>URI が指定されていない場合は、<code>SoftwareConfig.image_version</code> またはシステムのデフォルトから推測されます。</p>
       - `instance_names`<br>
        **タイプ**: `UNORDERED_LIST_STRING`<br>
        **プロバイダー名**: `instanceNames`<br>
        **説明**: 出力のみ。インスタンス名のリスト。Dataproc は cluster_name、num_instances、そしてインスタンスグループからこの名前を導き出します。<br>
       - `instance_references`<br>
        **タイプ**: `UNORDERED_LIST_STRUCT`<br>
        **プロバイダー名**: `instanceReferences`<br>
        **説明**: 出力のみ。Compute Engine インスタンスへのリファレンスのリスト。<br>
           - `instance_id`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `instanceId`<br>
            **説明**: Compute Engine インスタンスの一意な識別子。<br>
           - `instance_name`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `instanceName`<br>
            **説明**: Compute Engine インスタンスのユーザーフレンドリーな名前。<br>
           - `public_ecies_key`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `publicEciesKey`<br>
            **説明**: このインスタンスとデータを共有するために使用される公開 ECIES キー。<br>
           - `public_key`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `publicKey`<br>
            **説明**: このインスタンスとデータを共有するために使用される公開 RSA キー。<br>
       - `is_preemptible`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `isPreemptible`<br>
        **説明**: 出力のみ。このインスタンスグループがプリエンプト可能なインスタンスを含んでいることを指定します。<br>
       - `machine_type_uri`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `machineTypeUri`<br>
        **説明**: オプション。クラスターインスタンスに使用される Compute Engine のマシンタイプです。完全な URL、部分的な URI、または短い名前が有効です。例: <ul> <li><code>https://www.googleapis.com/compute/v1/projects/[project_id]/zones/us-east1-a/machineTypes/n1-standard-2</code></li> <li><code>projects/[project_id]/zones/us-east1-a/machineTypes/n1-standard-2</code></li> <li><code>n1-standard-2</code></li></ul> <p>オートゾーンの例外: <a href=https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/auto-zone#using_auto_zone_placement>Dataproc Auto Zone Placement</a> 機能を使用する場合は、マシンタイプのリソースの短い名前 (例えば、<code>n1-standard-2</code>) を使用する必要があります。</p>
       - `managed_group_config`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `managedGroupConfig`<br>
        **説明**: 出力のみ。このグループを管理する Compute Engine Instance Group Manager の構成。これは、プリエンプト可能なインスタンスグループにのみ使用されます。<br>
           - `instance_group_manager_name`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `instanceGroupManagerName`<br>
            **説明**: 出力のみ。このグループの Instance Group Manager の名前。<br>
           - `instance_template_name`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `instanceTemplateName`<br>
            **説明**: 出力のみ。Managed Instance Group に使用される Instance Template の名前。<br>
       - `min_cpu_platform`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `minCpuPlatform`<br>
        **説明**: オプション。インスタンスグループの最小 CPU プラットフォームを指定します。<a href=https://cloud.google.com/dataproc/docs/concepts/compute/dataproc-min-cpu>Dataproc -> Minimum CPU Platform</a> を参照してください。<br>
       - `num_instances`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `numInstances`<br>
        **説明**: オプション。インスタンスグループ内の VM インスタンスの数。HA クラスターの master_config グループでは 3 に設定する必要があります。標準的なクラスターの master_config グループでは、1 に設定する必要があります。<br>
       - `preemptibility`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `preemptibility`<br>
        **説明**: オプション。インスタンスグループのプリエンプティを指定します。マスターとワーカーグループのデフォルト値は NON_PREEMPTIBLE です。このデフォルトは変更することができません。セカンダリーインスタンスのデフォルト値は PREEMPTIBLE です。<br>
        **可能な値**:<br>
          - `PREEMPTIBILITY_UNSPECIFIED` - プリエンプティが指定されていない場合、システムは各インスタンスグループに対して適切な設定を選択します。<br>
          - `NON_PREEMPTIBLE` - インスタンスはノンプリエンプティブです。このオプションはすべてのインスタンスグループで許可され、マスターとワーカーのインスタンスグループに対してのみ有効な値です。<br>
          - `PREEMPTIBLE` - インスタンスは<a href=https://cloud.google.com/compute/docs/instances/preemptible>プリエンプト可能</a>です。このオプションは<a href=https://cloud.google.com/dataproc/docs/concepts/compute/secondary-vms>セカンダリワーカー</a>グループにのみ許可されています。<br>
          - `SPOT` - インスタンスは<a href=https://cloud.google.com/compute/docs/instances/spot>スポット VM</a> です。このオプションは、<a href=https://cloud.google.com/dataproc/docs/concepts/compute/secondary-vms>セカンダリワーカー</a>グループにのみ許可されています。スポット VM は、<a href=https://cloud.google.com/compute/docs/instances/preemptible>プリエンプト可能な VM</a> の最新版で、追加機能を提供します。<br>
   - `metastore_config`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `metastoreConfig`<br>
    **説明**: オプション。メタストアの構成。<br>
       - `dataproc_metastore_service`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `dataprocMetastoreService`<br>
        **説明**: 必須。既存の Dataproc Metastore サービスのリソース名。例: projects/[project_id]/locations/[dataproc_region]/services/[service-name]<br>
   - `secondary_worker_config`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `secondaryWorkerConfig`<br>
    **説明**: オプション。クラスターのセカンダリーワーカーインスタンスに対する Compute Engine の構成設定<br>
       - `accelerators`<br>
        **タイプ**: `UNORDERED_LIST_STRUCT`<br>
        **プロバイダー名**: `accelerators`<br>
        **説明**: オプション。これらのインスタンスに対する Compute Engine のアクセラレーター構成。<br>
           - `accelerator_count`<br>
            **タイプ**: `INT32`<br>
            **プロバイダー名**: `acceleratorCount`<br>
            **説明**: このインスタンスに公開されている、このタイプのアクセラレーターカードの数。<br>
           - `accelerator_type_uri`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `acceleratorTypeUri`<br>
            **説明**: このインスタンスに公開するアクセラレータータイプリソースの完全な URL、部分的な URI、または短い名前。<a href=https://cloud.google.com/compute/docs/reference/beta/acceleratorTypes>Compute Engine AcceleratorTypes</a> を参照してください。例: <ul><li><code>https://www.googleapis.com/compute/beta/projects/[project_id]/zones/us-east1-a/acceleratorTypes/nvidia-tesla-k80</code></li> <li><code>projects/[project_id]/zones/us-east1-a/acceleratorTypes/nvidia-tesla-k80</code></li> <li><code>nvidia-tesla-k80</code></li></ul> <p>オートゾーンの例外: <a href=https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/auto-zone#using_auto_zone_placement>Dataproc Auto Zone Placement</a> 機能を使用する場合は、アクセラレータータイプのリソースの短い名前 (例えば、<code>nvidia-tesla-k80</code>) を使用する必要があります。</p>
       - `disk_config`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `diskConfig`<br>
        **説明**: オプション。ディスクオプション構成設定。<br>
           - `boot_disk_size_gb`<br>
            **タイプ**: `INT32`<br>
            **プロバイダー名**: `bootDiskSizeGb`<br>
            **説明**: オプション。起動ディスクのサイズ (GB) (デフォルトは 500GB)。<br>
           - `boot_disk_type`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `bootDiskType`<br>
            **説明**: オプション。起動ディスクの種類 (デフォルトは <code>pd-standard</code>)。有効な値: <code>pd-balanced</code> (Persistent Disk Balanced Solid State Drive)、<code>pd-ssd</code> (Persistent Disk Solid State Drive)、または <code>pd-standard</code> (Persistent Disk Hard Disk Drive)。<a href=https://cloud.google.com/compute/docs/disks#disk-types>ディスクの種類</a>を参照してください。<br>
           - `local_ssd_interface`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `localSsdInterface`<br>
            **説明**: オプション。ローカル SSD のインターフェイスの種類 (デフォルトは <code>scsi</code>)。有効な値: <code>scsi</code> (Small Computer System Interface)、<code>nvme</code> (Non-Volatile Memory Express)。<a href=https://cloud.google.com/compute/docs/disks/local-ssd#performance>ローカル SSD のパフォーマンス</a>を参照してください。<br>
           - `num_local_ssds`<br>
            **タイプ**: `INT32`<br>
            **プロバイダー名**: `numLocalSsds`<br>
            **説明**: オプション。アタッチする SSD の数を 0 から 8 の間で指定します (デフォルトは 0)。SSD がアタッチされていない場合、ブートディスクはランタイムログと <a href=https://hadoop.apache.org/docs/r1.2.1/hdfs_user_guide.html>HDFS</a> データの保存に使用されます。1 台以上の SSD がアタッチされている場合、このランタイムバルクデータはそれらの SSD に分散され、ブートディスクには基本設定とインストール済みのバイナリのみが格納されます。注: ローカル SSD のオプションは、選択したマシンの種類と vCPU の数によって異なる場合があります。<br>
       - `image_uri`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `imageUri`<br>
        **説明**: オプション。クラスターインスタンスに使用される Compute Engine のイメージリソースです。URI はイメージまたはイメージファミリーを表すことができます。イメージの例: <ul><li><code>https://www.googleapis.com/compute/beta/projects/[project_id]/global/images/[image-id]</code></li> <li><code>projects/[project_id]/global/images/[image-id]</code></li> <li><code>image-id</code></li></ul> <p>イメージファミリーの例。Dataproc はそのファミリーの中で最も新しいイメージを使用します:</p> <ul><li><code>https://www.googleapis.com/compute/beta/projects/[project_id]/global/images/family/[custom-image-family-name]</code></li> <li><code>projects/[project_id]/global/images/family/[custom-image-family-name]</code></li></ul> <p>URI が指定されていない場合は、<code>SoftwareConfig.image_version</code> またはシステムのデフォルトから推測されます。</p>
       - `instance_names`<br>
        **タイプ**: `UNORDERED_LIST_STRING`<br>
        **プロバイダー名**: `instanceNames`<br>
        **説明**: 出力のみ。インスタンス名のリスト。Dataproc は cluster_name、num_instances、そしてインスタンスグループからこの名前を導き出します。<br>
       - `instance_references`<br>
        **タイプ**: `UNORDERED_LIST_STRUCT`<br>
        **プロバイダー名**: `instanceReferences`<br>
        **説明**: 出力のみ。Compute Engine インスタンスへのリファレンスのリスト。<br>
           - `instance_id`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `instanceId`<br>
            **説明**: Compute Engine インスタンスの一意な識別子。<br>
           - `instance_name`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `instanceName`<br>
            **説明**: Compute Engine インスタンスのユーザーフレンドリーな名前。<br>
           - `public_ecies_key`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `publicEciesKey`<br>
            **説明**: このインスタンスとデータを共有するために使用される公開 ECIES キー。<br>
           - `public_key`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `publicKey`<br>
            **説明**: このインスタンスとデータを共有するために使用される公開 RSA キー。<br>
       - `is_preemptible`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `isPreemptible`<br>
        **説明**: 出力のみ。このインスタンスグループがプリエンプト可能なインスタンスを含んでいることを指定します。<br>
       - `machine_type_uri`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `machineTypeUri`<br>
        **説明**: オプション。クラスターインスタンスに使用される Compute Engine のマシンタイプです。完全な URL、部分的な URI、または短い名前が有効です。例: <ul> <li><code>https://www.googleapis.com/compute/v1/projects/[project_id]/zones/us-east1-a/machineTypes/n1-standard-2</code></li> <li><code>projects/[project_id]/zones/us-east1-a/machineTypes/n1-standard-2</code></li> <li><code>n1-standard-2</code></li></ul> <p>オートゾーンの例外: <a href=https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/auto-zone#using_auto_zone_placement>Dataproc Auto Zone Placement</a> 機能を使用する場合は、マシンタイプのリソースの短い名前 (例えば、<code>n1-standard-2</code>) を使用する必要があります。</p>
       - `managed_group_config`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `managedGroupConfig`<br>
        **説明**: 出力のみ。このグループを管理する Compute Engine Instance Group Manager の構成。これは、プリエンプト可能なインスタンスグループにのみ使用されます。<br>
           - `instance_group_manager_name`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `instanceGroupManagerName`<br>
            **説明**: 出力のみ。このグループの Instance Group Manager の名前。<br>
           - `instance_template_name`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `instanceTemplateName`<br>
            **説明**: 出力のみ。Managed Instance Group に使用される Instance Template の名前。<br>
       - `min_cpu_platform`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `minCpuPlatform`<br>
        **説明**: オプション。インスタンスグループの最小 CPU プラットフォームを指定します。<a href=https://cloud.google.com/dataproc/docs/concepts/compute/dataproc-min-cpu>Dataproc -> Minimum CPU Platform</a> を参照してください。<br>
       - `num_instances`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `numInstances`<br>
        **説明**: オプション。インスタンスグループ内の VM インスタンスの数。HA クラスターの master_config グループでは 3 に設定する必要があります。標準的なクラスターの master_config グループでは、1 に設定する必要があります。<br>
       - `preemptibility`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `preemptibility`<br>
        **説明**: オプション。インスタンスグループのプリエンプティを指定します。マスターとワーカーグループのデフォルト値は NON_PREEMPTIBLE です。このデフォルトは変更することができません。セカンダリーインスタンスのデフォルト値は PREEMPTIBLE です。<br>
        **可能な値**:<br>
          - `PREEMPTIBILITY_UNSPECIFIED` - プリエンプティが指定されていない場合、システムは各インスタンスグループに対して適切な設定を選択します。<br>
          - `NON_PREEMPTIBLE` - インスタンスはノンプリエンプティブです。このオプションはすべてのインスタンスグループで許可され、マスターとワーカーのインスタンスグループに対してのみ有効な値です。<br>
          - `PREEMPTIBLE` - インスタンスは<a href=https://cloud.google.com/compute/docs/instances/preemptible>プリエンプト可能</a>です。このオプションは<a href=https://cloud.google.com/dataproc/docs/concepts/compute/secondary-vms>セカンダリワーカーグループ</a>にのみ許可されています。<br>
          - `SPOT` - インスタンスは<a href=https://cloud.google.com/compute/docs/instances/spot>スポット VM</a> です。このオプションは、<a href=https://cloud.google.com/dataproc/docs/concepts/compute/secondary-vms>セカンダリワーカー</a>グループにのみ許可されています。スポット VM は、<a href=https://cloud.google.com/compute/docs/instances/preemptible>プリエンプト可能な VM</a> の最新版で、追加機能を提供します。<br>
   - `security_config`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `securityConfig`<br>
    **説明**: オプション。クラスターのセキュリティ設定。<br>
       - `identity_config`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `identityConfig`<br>
        **説明**: オプション。サービスアカウントに基づく安全なマルチテナンシーユーザーマッピングを含む、アイデンティティ関連の構成。<br>

       - `kerberos_config`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `kerberosConfig`<br>
        **説明**: オプション。Kerberos 関連の構成。<br>
           - `cross_realm_trust_admin_server`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `crossRealmTrustAdminServer`<br>
            **説明**: オプション。クロスレルムの信頼関係における、リモートの信頼できるレルムの管理サーバー (IP またはホスト名)。<br>
           - `cross_realm_trust_kdc`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `crossRealmTrustKdc`<br>
            **説明**: オプション。クロスレルムの信頼関係における、リモートの信頼できるレルムの KDC (IP またはホスト名)。<br>
           - `cross_realm_trust_realm`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `crossRealmTrustRealm`<br>
            **説明**: オプション。Dataproc on-cluster KDC が信頼するリモートレルム (ユーザーがクロスレルム信頼を有効にした場合)。<br>
           - `cross_realm_trust_shared_password_uri`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `crossRealmTrustSharedPasswordUri`<br>
            **説明**: オプション。クラスター上の Kerberos レルムとリモートの信頼できるレルムとの間の共有パスワードを含む KMS 暗号化ファイルのクラウドストレージ URI で、クロスレルム信頼関係にあります。<br>
           - `enable_kerberos`<br>
            **タイプ**: `BOOLEAN`<br>
            **プロバイダー名**: `enableKerberos`<br>
            **説明**: オプション。クラスターを Kerberize するかどうかを示すフラグ (デフォルト: false)。クラスターで Kerberos を有効にするには、このフィールドを true に設定します。<br>
           - `kdc_db_key_uri`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `kdcDbKeyUri`<br>
            **説明**: オプション。KDC データベースのマスターキーを含む KMS 暗号化ファイルのクラウドストレージ URI。<br>
           - `key_password_uri`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `keyPasswordUri`<br>
            **説明**: オプション。ユーザー提供のキーのパスワードを含む、KMS 暗号化ファイルのクラウドストレージ URI。自己署名証明書の場合、このパスワードは Dataproc によって生成されます。<br>
           - `keystore_password_uri`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `keystorePasswordUri`<br>
            **説明**: オプション。ユーザー提供のキーストアのパスワードを含む、KMS 暗号化ファイルのクラウドストレージ URI。自己署名証明書の場合、このパスワードは Dataproc によって生成されます。<br>
           - `keystore_uri`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `keystoreUri`<br>
            **説明**: オプション。SSL 暗号化に使用するキーストアファイルのクラウドストレージ URI。提供されない場合、Dataproc は自己署名証明書を提供します。<br>
           - `kms_key_uri`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `kmsKeyUri`<br>
            **説明**: オプション。各種機密ファイルを暗号化するために使用する KMS キーの uri。<br>
           - `realm`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `realm`<br>
            **説明**: オプション。クラスター上の Kerberos レルムの名前。指定しない場合は、ホスト名の大文字のドメインがレルムとなります。<br>
           - `root_principal_password_uri`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `rootPrincipalPasswordUri`<br>
            **説明**: オプション。ルートプリンシパルのパスワードを含む KMS 暗号化ファイルのクラウドストレージ URI。<br>
           - `tgt_lifetime_hours`<br>
            **タイプ**: `INT32`<br>
            **プロバイダー名**: `tgtLifetimeHours`<br>
            **説明**: オプション。チケット付与券の有効期限を時間単位で指定します。指定しない場合、またはユーザーが 0 を指定した場合は、デフォルト値 10 が使用されます。<br>
           - `truststore_password_uri`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `truststorePasswordUri`<br>
            **説明**: オプション。ユーザー提供のトラストストアのパスワードを含む、KMS 暗号化ファイルのクラウドストレージ URI。自己署名証明書の場合、このパスワードは Dataproc によって生成されます。<br>
           - `truststore_uri`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `truststoreUri`<br>
            **説明**: オプション。SSL 暗号化に使用するトラストストアファイルのクラウドストレージ URI。提供されない場合、Dataproc は自己署名証明書を提供します。<br>
   - `software_config`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `softwareConfig`<br>
    **説明**: オプション。クラスターソフトウェアの構成設定。<br>
       - `image_version`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `imageVersion`<br>
        **説明**: オプション。クラスター内のソフトウェアのバージョン。"1.2" ("1.2.29" のようなサブマイナー版を含む)、または <a href=https://cloud.google.com/dataproc/docs/concepts/versioning/dataproc-versions#other_versions>"preview" バージョン</a>のような、<a href=https://cloud.google.com/dataproc/docs/concepts/versioning/dataproc-versions#supported_dataproc_versions>サポートされている Dataproc バージョン</a>のいずれかでなければなりません。指定がない場合、デフォルトは最新の Debian バージョンになります。<br>
       - `optional_components`<br>
        **タイプ**: `UNORDERED_LIST_STRING`<br>
        **プロバイダー名**: `optionalComponents`<br>
        **説明**: オプション。クラスター上でアクティブにするコンポーネントのセット。<br>
   - `temp_bucket`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `tempBucket`<br>
    **説明**: オプション。Spark や MapReduce の履歴ファイルなど、クラスターやジョブのエフェメラルデータを保存するために使用する Cloud Storage バケット。一時バケットを指定しない場合、Dataproc はクラスターがデプロイされている Compute Engine ゾーンに従って、クラスターの一時バケット用の Cloud Storage ロケーション (US、ASIA、EU) を決定し、このプロジェクトレベルのロケーションごとのバケットを作成して管理します。デフォルトのバケットの TTL は 90 日ですが、バケットを指定すれば、任意の TTL を使用できます (使用しないことも可能) (Dataproc の<a href=https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/staging-bucket>ステージングと一時バケット</a>を参照してください)。このフィールドには、Cloud Storage のバケット名ではなく、gs://... という Cloud Storage のバケットへの URI を指定する必要があります。<br>
   - `worker_config`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `workerConfig`<br>
    **説明**: オプション。クラスターのワーカーインスタンスに対する Compute Engine の構成設定。<br>
       - `accelerators`<br>
        **タイプ**: `UNORDERED_LIST_STRUCT`<br>
        **プロバイダー名**: `accelerators`<br>
        **説明**: オプション。これらのインスタンスに対する Compute Engine のアクセラレーター構成。<br>
           - `accelerator_count`<br>
            **タイプ**: `INT32`<br>
            **プロバイダー名**: `acceleratorCount`<br>
            **説明**: このインスタンスに公開されている、このタイプのアクセラレーターカードの数。<br>
           - `accelerator_type_uri`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `acceleratorTypeUri`<br>
            **説明**: このインスタンスに公開するアクセラレータータイプリソースの完全な URL、部分的な URI、または短い名前。<a href=https://cloud.google.com/compute/docs/reference/beta/acceleratorTypes>Compute Engine AcceleratorTypes</a> を参照してください。例: <ul><li><code>https://www.googleapis.com/compute/beta/projects/[project_id]/zones/us-east1-a/acceleratorTypes/nvidia-tesla-k80</code></li> <li><code>projects/[project_id]/zones/us-east1-a/acceleratorTypes/nvidia-tesla-k80</code></li> <li><code>nvidia-tesla-k80</code></li></ul> <p>オートゾーンの例外: <a href=https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/auto-zone#using_auto_zone_placement>Dataproc Auto Zone Placement</a> 機能を使用する場合は、アクセラレータータイプのリソースの短い名前 (例えば、<code>nvidia-tesla-k80</code>) を使用する必要があります。</p>
       - `disk_config`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `diskConfig`<br>
        **説明**: オプション。ディスクオプション構成設定。<br>
           - `boot_disk_size_gb`<br>
            **タイプ**: `INT32`<br>
            **プロバイダー名**: `bootDiskSizeGb`<br>
            **説明**: オプション。起動ディスクのサイズ (GB) (デフォルトは 500GB)。<br>
           - `boot_disk_type`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `bootDiskType`<br>
            **説明**: オプション。起動ディスクの種類 (デフォルトは <code>pd-standard</code>)。有効な値: <code>pd-balanced</code> (Persistent Disk Balanced Solid State Drive)、<code>pd-ssd</code> (Persistent Disk Solid State Drive)、または <code>pd-standard</code> (Persistent Disk Hard Disk Drive)。<a href=https://cloud.google.com/compute/docs/disks#disk-types>ディスクの種類</a>を参照してください。<br>
           - `local_ssd_interface`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `localSsdInterface`<br>
            **説明**: オプション。ローカル SSD のインターフェイスの種類 (デフォルトは <code>scsi</code>)。有効な値: <code>scsi</code> (Small Computer System Interface)、<code>nvme</code> (Non-Volatile Memory Express)。<a href=https://cloud.google.com/compute/docs/disks/local-ssd#performance>ローカル SSD のパフォーマンス</a>を参照してください。<br>
           - `num_local_ssds`<br>
            **タイプ**: `INT32`<br>
            **プロバイダー名**: `numLocalSsds`<br>
            **説明**: オプション。アタッチする SSD の数を 0 から 8 の間で指定します (デフォルトは 0)。SSD がアタッチされていない場合、ブートディスクはランタイムログと <a href=https://hadoop.apache.org/docs/r1.2.1/hdfs_user_guide.html>HDFS</a> データの保存に使用されます。1 台以上の SSD がアタッチされている場合、このランタイムバルクデータはそれらの SSD に分散され、ブートディスクには基本設定とインストール済みのバイナリのみが格納されます。注: ローカル SSD のオプションは、選択したマシンの種類と vCPU の数によって異なる場合があります。<br>
       - `image_uri`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `imageUri`<br>
        **説明**: オプション。クラスターインスタンスに使用される Compute Engine のイメージリソースです。URI はイメージまたはイメージファミリーを表すことができます。イメージの例: <ul><li><code>https://www.googleapis.com/compute/beta/projects/[project_id]/global/images/[image-id]</code></li> <li><code>projects/[project_id]/global/images/[image-id]</code></li> <li><code>image-id</code></li></ul> <p>イメージファミリーの例。Dataproc はそのファミリーの中で最も新しいイメージを使用します:</p> <ul><li><code>https://www.googleapis.com/compute/beta/projects/[project_id]/global/images/family/[custom-image-family-name]</code></li> <li><code>projects/[project_id]/global/images/family/[custom-image-family-name]</code></li></ul> <p>URI が指定されていない場合は、<code>SoftwareConfig.image_version</code> またはシステムのデフォルトから推測されます。</p>
       - `instance_names`<br>
        **タイプ**: `UNORDERED_LIST_STRING`<br>
        **プロバイダー名**: `instanceNames`<br>
        **説明**: 出力のみ。インスタンス名のリスト。Dataproc は cluster_name、num_instances、そしてインスタンスグループからこの名前を導き出します。<br>
       - `instance_references`<br>
        **タイプ**: `UNORDERED_LIST_STRUCT`<br>
        **プロバイダー名**: `instanceReferences`<br>
        **説明**: 出力のみ。Compute Engine インスタンスへのリファレンスのリスト。<br>
           - `instance_id`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `instanceId`<br>
            **説明**: Compute Engine インスタンスの一意な識別子。<br>
           - `instance_name`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `instanceName`<br>
            **説明**: Compute Engine インスタンスのユーザーフレンドリーな名前。<br>
           - `public_ecies_key`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `publicEciesKey`<br>
            **説明**: このインスタンスとデータを共有するために使用される公開 ECIES キー。<br>
           - `public_key`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `publicKey`<br>
            **説明**: このインスタンスとデータを共有するために使用される公開 RSA キー。<br>
       - `is_preemptible`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `isPreemptible`<br>
        **説明**: 出力のみ。このインスタンスグループがプリエンプト可能なインスタンスを含んでいることを指定します。<br>
       - `machine_type_uri`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `machineTypeUri`<br>
        **説明**: オプション。クラスターインスタンスに使用される Compute Engine のマシンタイプです。完全な URL、部分的な URI、または短い名前が有効です。例: <ul> <li><code>https://www.googleapis.com/compute/v1/projects/[project_id]/zones/us-east1-a/machineTypes/n1-standard-2</code></li> <li><code>projects/[project_id]/zones/us-east1-a/machineTypes/n1-standard-2</code></li> <li><code>n1-standard-2</code></li></ul> <p>オートゾーンの例外: <a href=https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/auto-zone#using_auto_zone_placement>Dataproc Auto Zone Placement</a> 機能を使用する場合は、マシンタイプのリソースの短い名前 (例えば、<code>n1-standard-2</code>) を使用する必要があります。</p>
       - `managed_group_config`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `managedGroupConfig`<br>
        **説明**: 出力のみ。このグループを管理する Compute Engine Instance Group Manager の構成。これは、プリエンプト可能なインスタンスグループにのみ使用されます。<br>
           - `instance_group_manager_name`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `instanceGroupManagerName`<br>
            **説明**: 出力のみ。このグループの Instance Group Manager の名前。<br>
           - `instance_template_name`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `instanceTemplateName`<br>
            **説明**: 出力のみ。Managed Instance Group に使用される Instance Template の名前。<br>
       - `min_cpu_platform`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `minCpuPlatform`<br>
        **説明**: オプション。インスタンスグループの最小 CPU プラットフォームを指定します。<a href=https://cloud.google.com/dataproc/docs/concepts/compute/dataproc-min-cpu>Dataproc -> Minimum CPU Platform</a> を参照してください。<br>
       - `num_instances`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `numInstances`<br>
        **説明**: オプション。インスタンスグループ内の VM インスタンスの数。HA クラスターの master_config グループでは 3 に設定する必要があります。標準的なクラスターの master_config グループでは、1 に設定する必要があります。<br>
       - `preemptibility`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `preemptibility`<br>
        **説明**: オプション。インスタンスグループのプリエンプティを指定します。マスターとワーカーグループのデフォルト値は NON_PREEMPTIBLE です。このデフォルトは変更することができません。セカンダリーインスタンスのデフォルト値は PREEMPTIBLE です。<br>
        **可能な値**:<br>
          - `PREEMPTIBILITY_UNSPECIFIED` - プリエンプティが指定されていない場合、システムは各インスタンスグループに対して適切な設定を選択します。<br>
          - `NON_PREEMPTIBLE` - インスタンスはノンプリエンプティブです。このオプションはすべてのインスタンスグループで許可され、マスターとワーカーのインスタンスグループに対してのみ有効な値です。<br>
          - `PREEMPTIBLE` - インスタンスは<a href=https://cloud.google.com/compute/docs/instances/preemptible>プリエンプト可能</a>です。このオプションは<a href=https://cloud.google.com/dataproc/docs/concepts/compute/secondary-vms>セカンダリワーカー</a>グループにのみ許可されています。<br>
          - `SPOT` - インスタンスは<a href=https://cloud.google.com/compute/docs/instances/spot>スポット VM</a> です。このオプションは、<a href=https://cloud.google.com/dataproc/docs/concepts/compute/secondary-vms>セカンダリワーカー</a>グループにのみ許可されています。スポット VM は、<a href=https://cloud.google.com/compute/docs/instances/preemptible>プリエンプト可能な VM</a> の最新版で、追加機能を提供します。<br>
## `gcp_status`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `status`<br>
**説明**: 出力のみ。クラスターのステータスです。<br>
   - `detail`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `detail`<br>
    **説明**: オプション。出力のみ。クラスターの状態の詳細。<br>
   - `state`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `state`<br>
    **説明**: 出力のみ。クラスターの状態。 <br>
    **可能な値**:<br>
      - `UNKNOWN` - クラスターの状態は不明です。<br>
      - `CREATING` - クラスターを作成し、セットアップしているところです。使用する準備ができていません。<br>
      - `RUNNING` - クラスターは現在稼働中で、健全な状態です。注: クラスターのステータスは、マスターノードと最初の 2 つのプライマリーワーカーノード (プライマリーワーカーが 2 つ以上の場合は最後のプライマリーワーカーノード) が稼働した後に 'creating' から 'running' ステータスに変更されます。<br>
      - `ERROR` - クラスターにエラーが発生しました。使用する準備ができていません。<br>
      - `ERROR_DUE_TO_UPDATE` - クラスターを更新中にエラーが発生しました。クラスターへのジョブの送信は可能ですが、クラスターを更新できません。<br>
      - `DELETING` - クラスターは削除中です。使用できません。<br>
      - `UPDATING` - クラスターは更新中です。ジョブの受け入れと処理は継続しています。<br>
      - `STOPPING` - クラスターは停止中です。使用できません。<br>
      - `STOPPED` - クラスターは現在停止中です。使用する準備ができていません。<br>
      - `STARTING` - クラスターは起動中です。使用する準備ができていません。<br>
      - `REPAIRING` - クラスターは修理中です。使用する準備ができていません。<br>
   - `state_start_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `stateStartTime`<br>
    **説明**: 出力のみ。この状態になった時間 (<a href=https://developers.google.com/protocol-buffers/docs/proto3#json>Timestamp の JSON 表現</a>を参照してください)。<br>
   - `substate`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `substate`<br>
    **説明**: 出力のみ。Agent から報告されたステータスを含む、追加の状態情報。 <br>
    **可能な値**:<br>
      - `UNSPECIFIED` - クラスターのサブステートは不明です。<br>
      - `UNHEALTHY` - クラスターが不健全な状態であることが判明しています (例えば、重要なデーモンが動作していない、HDFS の容量が枯渇しているなど)。RUNNING 状態に適用されます。<br>
      - `STALE_STATUS` - Agent が報告したステータスが古くなっています (Dataproc が Agent との通信を失うと発生する可能性があります)。RUNNING 状態に適用されます。<br>
## `labels`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `metrics`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `metrics`<br>
**説明**: 出力のみ。HDFS や YARN の統計など、クラスターデーモンのメトリクスが含まれます。ベータ版機能。このレポートはテスト目的でのみ利用可能です。最終リリース前に変更される可能性があります。<br>

## `organization_id`
**タイプ**: `STRING`<br>
## `parent`
**タイプ**: `STRING`<br>
## `project_id`
**タイプ**: `STRING`<br>
## `project_number`
**タイプ**: `STRING`<br>
## `resource_name`
**タイプ**: `STRING`<br>
## `status_history`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `statusHistory`<br>
**説明**: 出力のみ。前回のクラスターのステータス。<br>
   - `detail`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `detail`<br>
    **説明**: オプション。出力のみ。クラスターの状態の詳細。<br>
   - `state`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `state`<br>
    **説明**: 出力のみ。クラスターの状態。 <br>
    **可能な値**:<br>
      - `UNKNOWN` - クラスターの状態は不明です。<br>
      - `CREATING` - クラスターを作成し、セットアップしているところです。使用する準備ができていません。<br>
      - `RUNNING` - クラスターは現在稼働中で、健全な状態です。注: クラスターのステータスは、マスターノードと最初の 2 つのプライマリーワーカーノード (プライマリーワーカーが 2 つ以上の場合は最後のプライマリーワーカーノード) が稼働した後に 'creating' から 'running' ステータスに変更されます。<br>
      - `ERROR` - クラスターにエラーが発生しました。使用する準備ができていません。<br>
      - `ERROR_DUE_TO_UPDATE` - クラスターを更新中にエラーが発生しました。クラスターへのジョブの送信は可能ですが、クラスターを更新できません。<br>
      - `DELETING` - クラスターは削除中です。使用できません。<br>
      - `UPDATING` - クラスターは更新中です。ジョブの受け入れと処理は継続しています。<br>
      - `STOPPING` - クラスターは停止中です。使用できません。<br>
      - `STOPPED` - クラスターは現在停止中です。使用する準備ができていません。<br>
      - `STARTING` - クラスターは起動中です。使用する準備ができていません。<br>
      - `REPAIRING` - クラスターは修理中です。使用する準備ができていません。<br>
   - `state_start_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `stateStartTime`<br>
    **説明**: 出力のみ。この状態になった時間 (<a href=https://developers.google.com/protocol-buffers/docs/proto3#json>Timestamp の JSON 表現</a>を参照してください)。<br>
   - `substate`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `substate`<br>
    **説明**: 出力のみ。Agent から報告されたステータスを含む、追加の状態情報。 <br>
    **可能な値**:<br>
      - `UNSPECIFIED` - クラスターのサブステートは不明です。<br>
      - `UNHEALTHY` - クラスターが不健全な状態であることが判明しています (例えば、重要なデーモンが動作していない、HDFS の容量が枯渇しているなど)。RUNNING 状態に適用されます。<br>
      - `STALE_STATUS` - Agent が報告したステータスが古くなっています (Dataproc が Agent との通信を失うと発生する可能性があります)。RUNNING 状態に適用されます。<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `virtual_cluster_config`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `virtualClusterConfig`<br>
**説明**: オプション。仮想クラスター構成は、例えば <a href=https://cloud.google.com/dataproc/docs/guides/dpgke/dataproc-gke>Dataproc-on-GKE クラスター</a>を作成するときなど、基盤となるコンピュートリソースを直接制御しない Dataproc クラスターを作成するときに使用されるものです。Dataproc はデフォルト値を設定することができ、クラスターが更新されると値が変更されることがあります。config または virtual_cluster_config のどちらか一方を正確に指定する必要があります。<br>
   - `auxiliary_services_config`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `auxiliaryServicesConfig`<br>
    **説明**: オプション。このクラスターが使用する補助サービスの構成。<br>
       - `metastore_config`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `metastoreConfig`<br>
        **説明**: オプション。このワークロードの Hive メタストア構成。<br>
           - `dataproc_metastore_service`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `dataprocMetastoreService`<br>
            **説明**: 必須。既存の Dataproc Metastore サービスのリソース名。例: projects/[project_id]/locations/[dataproc_region]/services/[service-name]<br>
       - `spark_history_server_config`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `sparkHistoryServerConfig`<br>
        **説明**: オプション。ワークロードの Spark History Server 構成。<br>
           - `dataproc_cluster`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `dataprocCluster`<br>
            **説明**: オプション。ワークロードの Spark History Server として動作する、既存の Dataproc Cluster のリソース名。例: projects/[project_id]/regions/[region]/clusters/[cluster_name]<br>
   - `kubernetes_cluster_config`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `kubernetesClusterConfig`<br>
    **説明**: 必須。Kubernetes 上で Dataproc クラスターを動作させるための構成。<br>
       - `gke_cluster_config`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `gkeClusterConfig`<br>
        **説明**: 必須。GKE 上で Dataproc クラスターを動作させるための構成。<br>
           - `gke_cluster_target`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `gkeClusterTarget`<br>
            **説明**: オプション。デプロイ先の GKE クラスター。Dataproc クラスターと同じプロジェクトおよびリージョンである必要があります (GKE クラスターはゾーンまたはリージョナルである可能性があります)。フォーマット: 'projects/{project}/locations/{location}/clusters/{cluster_id}'<br>
           - `namespaced_gke_deployment_target`<br>
            **タイプ**: `STRUCT`<br>
            **プロバイダー名**: `namespacedGkeDeploymentTarget`<br>
            **説明**: オプション。非推奨。gkeClusterTarget を使ってください。非推奨のベータ版でのみ使用されます。デプロイメントのターゲット。<br>
               - `cluster_namespace`<br>
                **タイプ**: `STRING`<br>
                **プロバイダー名**: `clusterNamespace`<br>
                **説明**: オプション。デプロイ先となる GKE クラスター内のネームスペース。<br>
               - `target_gke_cluster`<br>
                **タイプ**: `STRING`<br>
                **プロバイダー名**: `targetGkeCluster`<br>
                **説明**: オプション。デプロイ先となる GKE クラスター。フォーマット: 'projects/{project}/locations/{location}/clusters/{cluster_id}'<br>
           - `node_pool_target`<br>
            **タイプ**: `UNORDERED_LIST_STRUCT`<br>
            **プロバイダー名**: `nodePoolTarget`<br>
            **説明**: オプション。ワークロードがスケジュールされる GKE ノードプール。少なくとも 1 つのノードプールには、DEFAULT GkeNodePoolTarget.Role が割り当てられていなければなりません。GkeNodePoolTarget が指定されていない場合、Dataproc は DEFAULT GkeNodePoolTarget を作成します。各ロールは、1 つの GkeNodePoolTarget にのみ指定することができます。すべてのノードプールは、同じロケーション設定でなければなりません。<br>
               - `node_pool`<br>
                **タイプ**: `STRING`<br>
                **プロバイダー名**: `nodePool`<br>
                **説明**: 必須。対象の GKE ノードプール。フォーマット: 'projects/{project}/locations/{location}/clusters/{cluster}/nodePools/{node_pool}'<br>
               - `node_pool_config`<br>
                **タイプ**: `STRUCT`<br>
                **プロバイダー名**: `nodePoolConfig`<br>
                **説明**: 入力のみ。GKE ノードプールの構成。指定された場合、Dataproc は指定された形状を持つノードプールを作成しようとします。同名のものがすでに存在する場合は、指定されたすべてのフィールドと照合されます。フィールドが異なる場合、仮想クラスターの作成は失敗します。省略した場合は、指定された名前のノードプールが使用されます。指定された名前のノードプールが存在しない場合、Dataproc はデフォルト値でノードプールを作成します。これは入力専用フィールドです。API から返されることはありません。<br>
                   - `autoscaling`<br>
                    **タイプ**: `STRUCT`<br>
                    **プロバイダー名**: `autoscaling`<br>
                    **説明**: オプション。このノードプールのオートスケーラ構成。有効な構成が存在する場合にのみ、オートスケーラが有効になります。<br>
                       - `max_node_count`<br>
                        **タイプ**: `INT32`<br>
                        **プロバイダー名**: `maxNodeCount`<br>
                        **説明**: ノードプールの最大ノード数。min_node_count 以上で、かつ 0 よりも大きい値である必要があります。注: クォータはクラスターをスケールアップするのに十分な値でなければなりません。<br>
                       - `min_node_count`<br>
                        **タイプ**: `INT32`<br>
                        **プロバイダー名**: `minNodeCount`<br>
                        **説明**: ノードプールの最小ノード数。0 以上かつ max_node_count 以下でなければなりません。<br>
                   - `config`<br>
                    **タイプ**: `STRUCT`<br>
                    **プロバイダー名**: `config`<br>
                    **説明**: オプション。ノードプールの構成。<br>
                       - `accelerators`<br>
                        **タイプ**: `UNORDERED_LIST_STRUCT`<br>
                        **プロバイダー名**: `accelerators`<br>
                        **説明**: オプション。各ノードにアタッチする<a href=https://cloud.google.com/compute/docs/gpus>ハードウェアアクセラレーター</a>のリストです。<br>
                           - `accelerator_count`<br>
                            **タイプ**: `INT64`<br>
                            **プロバイダー名**: `acceleratorCount`<br>
                            **説明**: インスタンスに公開されるアクセラレーターカードの数。<br>
                           - `accelerator_type`<br>
                            **タイプ**: `STRING`<br>
                            **プロバイダー名**: `acceleratorType`<br>
                            **説明**: アクセラレータータイプのリソース名 (Compute Engine の GPU を参照)。<br>
                           - `gpu_partition_size`<br>
                            **タイプ**: `STRING`<br>
                            **プロバイダー名**: `gpuPartitionSize`<br>
                            **説明**: GPU 上に作成するパーティションのサイズ。有効な値は、<a href=https://docs.nvidia.com/datacenter/tesla/mig-user-guide/#partitioning>NVIDIA 移行ユーザーガイド</a>に記載されています。<br>
                       - `boot_disk_kms_key`<br>
                        **タイプ**: `STRING`<br>
                        **プロバイダー名**: `bootDiskKmsKey`<br>
                        **説明**: オプション。ノードプールの各ノードにアタッチされている起動ディスクを暗号化するための <a href=https://cloud.google.com/kubernetes-engine/docs/how-to/using-cmek>CMEK (Customer Managed Encryption Key</a>。以下のフォーマットでキーを指定します: projects/KEY_PROJECT_ID/locations/LOCATION /keyRings/RING_NAME/cryptoKeys/KEY_NAME<br>
                       - `local_ssd_count`<br>
                        **タイプ**: `INT32`<br>
                        **プロバイダー名**: `localSsdCount`<br>
                        **説明**: オプション。ノードにアタッチするローカル SSD ディスクの数で、ゾーンごとに許容されるディスクの最大数によって制限されます (<a href=https://cloud.google.com/compute/docs/disks/local-ssd>ローカル SSD の追加</a>を参照してください)。<br>
                       - `machine_type`<br>
                        **タイプ**: `STRING`<br>
                        **プロバイダー名**: `machineType`<br>
                        **説明**: オプション。Compute Engine の<a href=https://cloud.google.com/compute/docs/machine-types>マシンタイプ</a>の名前です。<br>
                       - `min_cpu_platform`<br>
                        **タイプ**: `STRING`<br>
                        **プロバイダー名**: `minCpuPlatform`<br>
                        **説明**: オプション。このインスタンスで使用される<a href=https://cloud.google.com/compute/docs/instances/specify-min-cpu-platform>最小 CPU プラットフォーム</a>です。インスタンスは、指定された CPU プラットフォームまたはより新しい CPU プラットフォームでスケジュールされる可能性があります。"Intel Haswell" や "Intel Sandy Bridge" など、CPU プラットフォームのフレンドリーな名前を指定します。<br>
                       - `preemptible`<br>
                        **タイプ**: `BOOLEAN`<br>
                        **プロバイダー名**: `preemptible`<br>
                        **説明**: オプション。レガシーの<a href=https://cloud.google.com/compute/docs/instances/preemptible>プリエンプト可能 VM インスタンス</a>としてノードを作成するかどうか。最大寿命のないプリエンプト可能 VM インスタンス、スポット VM も参照してください。レガシーおよびスポットのプリエンプト可能ノードは、CONTROLLER ロールを持つノードプールや、CONTROLLER ロールが割り当てられていない場合は DEFAULT ノードプールで使用できません (DEFAULT ノードプールが CONTROLLER ロールを引き継ぎます)。<br>
                       - `spot`<br>
                        **タイプ**: `BOOLEAN`<br>
                        **プロバイダー名**: `spot`<br>
                        **説明**: オプション。<a href=https://cloud.google.com/compute/docs/instances/spot>スポット VM インスタンス</a>としてノードを作成するかどうか。スポット VM は、レガシーのプリエンプト可能 VM の最新のアップデートです。スポット VM には最大寿命はありません。レガシーおよびスポットのプリエンプト可能ノードは、CONTROLLER ロールを持つノードプールや、CONTROLLER ロールが割り当てられていない場合は DEFAULT ノードプールで使用できません (DEFAULT ノードプールが CONTROLLER ロールを引き継ぎます)。<br>
                   - `locations`<br>
                    **タイプ**: `UNORDERED_LIST_STRING`<br>
                    **プロバイダー名**: `locations`<br>
                    **説明**: オプション。Dataproc on GKE 仮想クラスターに関連付けられたノードプールノードが配置される Compute Engine <a href=https://cloud.google.com/compute/docs/zones#available>ゾーン</a>のリスト。注: 仮想クラスターに関連付けられたすべてのノードプールは、仮想クラスターと同じリージョンに配置され、そのリージョン内の同じゾーンに配置されなければなりません。ノードプール作成時に場所が指定されない場合、Dataproc on GKE がゾーンを選択します。<br>
               - `roles`<br>
                **タイプ**: `UNORDERED_LIST_STRING`<br>
                **プロバイダー名**: `roles`<br>
                **説明**: 必須。GKE ノードプールに関連するロール。<br>
       - `kubernetes_namespace`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `kubernetesNamespace`<br>
        **説明**: オプション。デプロイ先となる Kubernetes クラスター内のネームスペース。このネームスペースが存在しない場合、作成されます。存在する場合、Dataproc は別の Dataproc VirtualCluster がその中にインストールされていないことを確認します。指定しない場合は、Dataproc クラスターの名前が使用されます。<br>
       - `kubernetes_software_config`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `kubernetesSoftwareConfig`<br>
        **説明**: オプション。Kubernetes 上で動作するこの Dataproc クラスターのソフトウェア構成。<br>
   - `staging_bucket`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `stagingBucket`<br>
    **説明**: オプション。ジョブの依存関係、構成ファイル、ジョブドライバーのコンソール出力をステージングするために使用される Cloud Storage バケット。ステージングバケットを指定しない場合、Cloud Dataproc はクラスターがデプロイされている Compute Engine ゾーンに従ってクラスタのステージングバケット用の Cloud Storage ロケーション (US、ASIA、EU) を決定し、このプロジェクトレベルのロケーションごとのバケットを作成して管理します (<a href=https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/staging-bucket>Dataproc のステージングと一時バケット</a>を参照してください)。このフィールドは、Cloud Storage バケットへの gs://... URI ではなく、Cloud Storage バケット名を必要とします。<br>