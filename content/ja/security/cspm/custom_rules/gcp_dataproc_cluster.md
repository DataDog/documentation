---
aliases:
- /ja/security_platform/cspm/custom_rules/gcp_dataproc_cluster
kind: documentation
title: gcp_dataproc_cluster
---

## `ancestors`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `cluster_name`
**タイプ**: `STRING`<br>
    **説明**: 必須。クラスター名。プロジェクト内で一意である必要があります。小文字で始まり、小文字、数字、ハイフンを最大 51 文字まで含めることができます。ハイフンで終わることはできません。削除したクラスターの名前を再利用することができます。<br>
    **GCP 名**: `clusterName`<br>
## `cluster_uuid`
**タイプ**: `STRING`<br>
    **説明**: 出力のみ。クラスターの UUID (Unique Universal Identifier)。Dataproc はクラスターを作成するときにこの値を生成します。<br>
    **GCP 名**: `clusterUuid`<br>
## `config`
  **タイプ**: `STRUCT`<br>
  **説明**: オプション。Compute Engine Instances のクラスター構成。Dataproc はデフォルト値を設定することがあり、クラスターが更新されると値が変更される可能性があることに注意してください。`ClusterConfig` または `VirtualClusterConfig` のどちらかを正確に指定する必要があります。<br>
  **GCP 名**: `config`
   - `autoscaling_config`<br>
      **タイプ**: `STRUCT`<br>
      **説明**: オプション。クラスターに関連付けられたポリシーのオートスケール構成。このフィールドが設定されていない場合、クラスターはオートスケールを行いません。<br>
      **GCP 名**: `autoscalingConfig`
       - `policy_uri`<br>
        **タイプ**: `STRING`<br>
        **説明**: オプション。クラスターが使用するオートスケーリングポリシー。`projectid` と場所 (地域) を含むリソース名のみが有効です。例: <br>
          - `https://www.googleapis.com/compute/v1/projects/[project_id]/locations/[dataproc_region]/autoscalingPolicies/[policy_id]`<br>
          - `projects/[project_id]/locations/[dataproc_region]/autoscalingPolicies/[policy_id]` <br>
        ポリシーは、同じプロジェクトおよび Dataproc リージョンに存在する必要があることに注意してください。<br>
            **GCP 名**: `policyUri`<br>
   - `config_bucket`<br>
    **タイプ**: `STRING`<br>
        **説明**: オプション。ジョブの依存関係、構成ファイル、ジョブドライバーのコンソール出力をステージングするために使用される Cloud Storage バケット。ステージングバケットを指定しない場合、Cloud Dataproc はクラスターがデプロイされている Compute Engine ゾーンに従ってクラスタのステージングバケット用の Cloud Storage ロケーション (US、ASIA、EU) を決定し、このプロジェクトレベルのロケーションごとのバケットを作成して管理します。[Dataproc のステージングと一時バケット][1]を参照してください。このフィールドは、Cloud Storage バケットへの `gs://...` URI ではなく、Cloud Storage バケット名を必要とします。<br>
        **GCP 名**: `configBucket`<br>
   - `dataproc_metric_config`<br>
      **タイプ**: `STRUCT`<br>
      **説明**: オプション。Dataproc メトリクスの構成。<br>
      **GCP 名**: `dataprocMetricConfig`
       - `metrics`<br>
          **タイプ**: `UNORDERED_LIST_STRUCT`<br>
          **説明**: 必須。有効にするメトリクスソース。<br>
          **GCP 名**: `metrics`
           - `metric_overrides`<br>
            **タイプ**: `UNORDERED_LIST_STRING`<br>
            **GCP 名**: `metricOverrides`<br>
            **説明**: オプション。メトリクスコースのために収集する 1 つ以上の利用可能な [OSS メトリクス][2]を指定します (SPARK メトリクスソースの場合、任意の [Spark メトリクス][3]が指定可能です)。`METRIC_SOURCE:INSTANCE:GROUP:METRIC` のフォーマットでメトリクスを提供します。必要に応じてキャメルケースを使用します。例: <br>
              - `yarn:ResourceManager:QueueMetrics:AppsCompleted`<br>
              - `spark:driver:DAGScheduler:job.allJobs`<br>
              - `sparkHistoryServer:JVM:Memory:NonHeapMemoryUsage.committed`<br>
              - `hiveserver2:JVM:Memory:NonHeapMemoryUsage.used` <br>
            注: <br>
              - 指定されたオーバーライドされたメトリクスのみがメトリクスソースのために収集されます。例えば、1 つ以上の `spark:executive` メトリクスがメトリクスオーバーライドとしてリストされている場合、他の SPARK メトリクスは収集されません。 <br>
              - 他の OSS メトリクスソースのデフォルトメトリクスの収集は影響を受けません。例えば、SPARK と YARN の両方のメトリクスソースが有効で、Spark メトリクスのみにオーバーライドが提供されている場合、すべてのデフォルトの YARN メトリクスが収集されます。<br>
           - `metric_source`<br>
            **タイプ**: `STRING`<br>
                **説明**: 必須。メトリクスソースに metricOverrides が指定されていない限り、デフォルトのメトリクスが収集されます。詳しくは[利用可能な OSS メトリクス][2]を参照してください。 <br>
                **GCP 名**: `metricSource`<br>
                    **可能な値**:<br>
              - `METRIC_SOURCE_UNSPECIFIED` - 必要な不特定多数のメトリクスソース。<br>
              - `MONITORING_AGENT_DEFAULTS` - デフォルトのモニタリング Agent のメトリクス。このソースを有効にすると、Dataproc は Compute Engine でモニタリング Agent を有効にし、デフォルトのモニタリング Agent メトリクスを収集し、それは `agent.googleapis.com` のプレフィックスで公開されます。<br>
              - `HDFS` - HDFS のメトリクスソース。<br>
              - `SPARK` - Spark のメトリクスソース。<br>
              - `YARN` - YARN のメトリクスソース。<br>
              - `SPARK_HISTORY_SERVER` - Spark History Server のメトリクスソース。<br>
              - `HIVESERVER2` - Hiveserver2 のメトリクスソース。<br>
   - `encryption_config`<br>
      **タイプ**: `STRUCT`<br>
      **説明**: オプション。クラスターの暗号化設定。<br>
      **GCP 名**: `encryptionConfig`
       - `gce_pd_kms_key_name`<br>
        **タイプ**: `STRING`<br>
            **説明**: オプション。クラスター内の全インスタンスの PD ディスク暗号化に使用する Cloud KMS キー名。<br>
            **GCP 名**: `gcePdKmsKeyName`<br>
   - `endpoint_config`<br>
      **タイプ**: `STRUCT`<br>
      **説明**: オプション。このクラスターのポート/エンドポイント構成<br>
      **GCP 名**: `endpointConfig`
       - `enable_http_port_access`<br>
        **タイプ**: `BOOLEAN`<br>
            **説明**: オプション。`true` の場合、クラスター上の特定のポートに対して、外部からの HTTP アクセスを有効にします。デフォルトは `false` です。<br>
            **GCP 名**: `enableHttpPortAccess`<br>
   - `gce_cluster_config`<br>
      **タイプ**: `STRUCT`<br>
      **説明**: オプション。クラスター内の全インスタンスで共有される Compute Engine の構成設定。<br>
      **GCP 名**: `gceClusterConfig`
       - `confidential_instance_config`<br>
          **タイプ**: `STRUCT`<br>
          **説明**: オプション。[Confidential VM][4] を使用するクラスター用の Confidential Instance Config。<br>
          **GCP 名**: `confidentialInstanceConfig`
           - `enable_confidential_compute`<br>
            **タイプ**: `BOOLEAN`<br>
                **説明**: オプション。インスタンスがコンフィデンシャルコンピューティングを有効にするかどうかを定義します。<br>
                **GCP 名**: `enableConfidentialCompute`<br>
       - `internal_ip_only`<br>
        **タイプ**: `BOOLEAN`<br>
            **説明**: オプション。`true` の場合、クラスター内のすべてのインスタンスは内部 IP アドレスのみを持つようになります。デフォルトでは、クラスターは内部 IP アドレスに制限されず、各インスタンスに割り当てられたエフェメラルな外部 IP アドレスを持つことになります。この `internal_ip_only` 制限はサブネットワークが有効なネットワークに対してのみ有効で、クラスター外の依存関係はすべて、外部 IP アドレスなしでアクセスできるように構成する必要があります。<br>
            **GCP 名**: `internalIpOnly`<br>
       - `network_uri`<br>
        **タイプ**: `STRING`<br>
        **説明**: オプション。マシン通信に使用する Compute Engine のネットワーク。`subnetwork_uri` と共に指定することはできません。`network_uri` と `subnetwork_uri` のどちらも指定しなかった場合、プロジェクトの "デフォルト" のネットワークが使用されます (存在する場合)。カスタムサブネットワークを指定することはできません。詳しくは[サブネットワークの使用][5]を参照してください。完全な URL、部分的な URI、または短い名前が有効です。例: <br>
        - `https://www.googleapis.com/compute/v1/projects/[project_id]/regions/global/default` <br>
        - `projects/[project_id]/regions/global/default`<br>
        - `default`<br>
            **GCP 名**: `networkUri`<br>
       - `node_group_affinity`<br>
          **タイプ**: `STRUCT`<br>
          **説明**: オプション。ソールテナントクラスターのノードグループアフィニティ。<br>
          **GCP 名**: `nodeGroupAffinity`
           - `node_group_uri`<br>
            **タイプ**: `STRING`<br>
            **説明**: 必須。クラスターが作成されるソールテナントの[ノードグループリソース][6]の URI。完全な URL、URI の一部、またはノードグループ名が有効です。例: <br>
            - `https://www.googleapis.com/compute/v1/projects/[project_id]/zones/us-central1-a/nodeGroups/node-group-1`<br>
            - `projects/[project_id]/zones/us-central1-a/nodeGroups/node-group-1`<br>
            - `node-group-1`<br>
                **GCP 名**: `nodeGroupUri`<br>
       - `private_ipv6_google_access`<br>
        **タイプ**: `STRING`<br>
            **説明**: オプション。クラスターの IPv6 アクセスのタイプ。 <br>
            **GCP 名**: `privateIpv6GoogleAccess`<br>
                **可能な値**:<br>
          - `PRIVATE_IPV6_GOOGLE_ACCESS_UNSPECIFIED` - 未指定の場合、Compute Engine のデフォルトの動作が適用され、`INHERIT_FROM_SUBNETWORK` と同じになります。<br>
          - `INHERIT_FROM_SUBNETWORK` - サブネットワーク構成から継承された Google Services 構成からのプライベートアクセス。これは、Compute Engine のデフォルトの動作です。<br>
          - `OUTBOUND` - Dataproc クラスターから Google Services へのアウトバウンドプライベート IPv6 アクセスを有効にします。<br>
          - `BIDIRECTIONAL` - Google Services と Dataproc クラスター間の双方向のプライベート IPv6 アクセスを可能にします。<br>
       - `reservation_affinity`<br>
          **タイプ**: `STRUCT`<br>
          **説明**: オプション。ゾーン予約を消費するための予約アフィニティ。<br>
          **GCP 名**: `reservationAffinity`
           - `consume_reservation_type`<br>
            **タイプ**: `STRING`<br>
                **説明**: オプション。消費する予約のタイプ <br>
                **GCP 名**: `consumeReservationType`<br>
                    **可能な値**:<br>
              - `TYPE_UNSPECIFIED` <br>
              - `NO_RESERVATION` - 割り当てられた容量から消費しません。<br>
              - `ANY_RESERVATION` - 利用できる予約を消費します。<br>
              - `SPECIFIC_RESERVATION` - 特定の予約から消費する必要があります。予約を指定するためのキーバリューフィールドを指定しなければなりません。<br>
           - `key`<br>
            **タイプ**: `STRING`<br>
                **説明**: オプション。予約リソースのラベルキーに相当します。<br>
                **GCP 名**: `key`<br>
           - `values`<br>
            **タイプ**: `UNORDERED_LIST_STRING`<br>
                **説明**: オプション。予約リソースのラベル値に相当します。<br>
                **GCP 名**: `values`<br>
       - `service_account`<br>
        **タイプ**: `STRING`<br>
            **説明**: オプション。[Dataproc サービスアカウント][7。[VM Data Plane ID][8] も参照してください。Dataproc クラスター VM インスタンスが Google Cloud Platform のサービスにアクセスするために使用します。指定しない場合は、Compute Engine の[デフォルトのサービスアカウント][9]が使用されます。<br>
            **GCP 名**: `serviceAccount`<br>
       - `service_account_scopes`<br>
        **タイプ**: `UNORDERED_LIST_STRING`<br>
        **説明**: オプション。Compute Engine インスタンスに含まれるサービスアカウントスコープの URI。以下の基本スコープが常に含まれます。 <br>
        - `https://www.googleapis.com/auth/cloud.useraccounts.readonly`<br>
        - `https://www.googleapis.com/auth/devstorage.read_write`<br>
        - `https://www.googleapis.com/auth/logging.write`<br>
        スコープが指定されない場合、以下のデフォルトも提供されます。 <br>
        - `https://www.googleapis.com/auth/bigquery`<br>
        - `https://www.googleapis.com/auth/bigtable.admin.table`<br>
        - `https://www.googleapis.com/auth/bigtable.data`<br>
        - `https://www.googleapis.com/auth/devstorage.full_control`<br>
            **GCP 名**: `serviceAccountScopes`<br>
       - `shielded_instance_config`<br>
          **タイプ**: `STRUCT`<br>
          **説明**: オプション。Compute Engine [Shielded VM][10] を使用したクラスターの Shielded Instance Config。<br>
          **GCP 名**: `shieldedInstanceConfig`
           - `enable_integrity_monitoring`<br>
            **タイプ**: `BOOLEAN`<br>
                **説明**: オプション。インスタンスの整合性監視が有効であるかどうかを定義します。<br>
                **GCP 名**: `enableIntegrityMonitoring`<br>
           - `enable_secure_boot`<br>
            **タイプ**: `BOOLEAN`<br>
                **説明**: オプション。インスタンスでセキュアブートが有効かどうかを定義します。<br>
                **GCP 名**: `enableSecureBoot`<br>
           - `enable_vtpm`<br>
            **タイプ**: `BOOLEAN`<br>
                **説明**: オプション。インスタンスで vTPM が有効になっているかどうかを定義します。<br>
                **GCP 名**: `enableVtpm`<br>
       - `subnetwork_uri`<br>
        **タイプ**: `STRING`<br>
        **説明**: オプション。マシン通信に使用する Compute Engine のサブネットワーク。`network_uri` と一緒に指定することはできません。完全な URL、部分的な URI、または短い名前が有効です。例:<br>
        - `https://www.googleapis.com/compute/v1/projects/[project_id]/regions/us-east1/subnetworks/sub0`<br>
        - `projects/[project_id]/regions/us-east1/subnetworks/sub0`<br>
        - `sub0`<br>
            **GCP 名**: `subnetworkUri`<br>
       - `zone_uri`<br>
        **タイプ**: `STRING`<br>
        **説明**: オプション。Compute Engine クラスターが配置されるゾーン。作成リクエストでは、"グローバル" リージョンで必須となります。グローバルでない Dataproc リージョンで省略された場合、サービスは対応する Compute Engine リージョン内のゾーンを選択します。get リクエストでは、zone は常に存在します。完全な URL、部分的な URI、または短い名前が有効です。例: <br>
        - `https://www.googleapis.com/compute/v1/projects/[project_id]/zones/[zone]`<br>
        - `projects/[project_id]/zones/[zone]`<br>
        - `us-central1-f`<br>
            **GCP 名**: `zoneUri`<br>
   - `gke_cluster_config`<br>
      **タイプ**: `STRUCT`<br>
      **説明**: オプション。ベータ版。Kubernetes にデプロイされた Dataproc クラスターの Kubernetes Engine 構成にデプロイされた Dataproc クラスターの Kubernetes Engine 構成。これらの構成は、`gce_cluster_config`、`master_config`、`worker_config`、`secondary_worker_config`、`autoscaling_config` などの Compute Engine ベースのオプションとは互いに排他的になります。<br>
      **GCP 名**: `gkeClusterConfig`
       - `gke_cluster_target`<br>
        **タイプ**: `STRING`<br>
            **説明**: オプション。デプロイ先の GKE クラスター。Dataproc クラスターと同じプロジェクトおよびリージョンである必要があります (GKE クラスターはゾーンまたはリージョナルである可能性があります)。フォーマット: `projects/{project}/locations/{location}/clusters/{cluster_id}`<br>
            **GCP 名**: `gkeClusterTarget`<br>
       - `namespaced_gke_deployment_target`<br>
          **タイプ**: `STRUCT`<br>
          **説明**: オプション。非推奨。`gkeClusterTarget` を使ってください。非推奨のベータ版でのみ使用されます。デプロイメントのターゲット。<br>
          **GCP 名**: `名spacedGkeDeploymentTarget`
           - `cluster_namespace`<br>
            **タイプ**: `STRING`<br>
                **説明**: オプション。デプロイ先となる GKE クラスター内のネームスペース。<br>
                **GCP 名**: `clusterNamespace`<br>
           - `target_gke_cluster`<br>
            **タイプ**: `STRING`<br>
                **説明**: オプション。デプロイ先となる GKE クラスター。フォーマット: `projects/{project}/locations/{location}/clusters/{cluster_id}`<br>
                **GCP 名**: `targetGkeCluster`<br>
       - `node_pool_target`<br>
          **タイプ**: `UNORDERED_LIST_STRUCT`<br>
          **説明**: オプション。ワークロードがスケジュールされる GKE ノードプール。少なくとも 1 つのノードプールには、DEFAULT `GkeNodePoolTarget.Role` が割り当てられていなければなりません。`GkeNodePoolTarget` が指定されていない場合、Dataproc は DEFAULT `GkeNodePoolTarget` を作成します。各ロールは、1 つの `GkeNodePoolTarget` にのみ指定することができます。すべてのノードプールは、同じロケーション設定でなければなりません。<br>
          **GCP 名**: `nodePoolTarget`
           - `node_pool`<br>
            **タイプ**: `STRING`<br>
                **説明**: 必須。対象の GKE ノードプール。フォーマット: `projects/{project}/locations/{location}/clusters/{cluster}/nodePools/{node_pool}`<br>
                **GCP 名**: `nodePool`<br>
           - `node_pool_config`<br>
              **タイプ**: `STRUCT`<br>
              **説明**: 入力のみ。GKE ノードプールの構成。指定された場合、Dataproc は指定された形状を持つノードプールを作成しようとします。同名のものがすでに存在する場合は、指定されたすべてのフィールドと照合されます。フィールドが異なる場合、仮想クラスターの作成は失敗します。省略した場合は、指定された名前のノードプールが使用されます。指定された名前のノードプールが存在しない場合、Dataproc はデフォルト値でノードプールを作成します。これは入力専用フィールドです。API から返されることはありません。<br>
              **GCP 名**: `nodePoolConfig`
               - `autoscaling`<br>
                  **タイプ**: `STRUCT`<br>
                  **説明**: オプション。このノードプールのオートスケーラ構成。有効な構成が存在する場合にのみ、オートスケーラが有効になります。<br>
                  **GCP 名**: `autoscaling`
                   - `max_node_count`<br>
                    **タイプ**: `INT32`<br>
                        **説明**: ノードプールの最大ノード数。`min_node_count` 以上で、かつ `0` よりも大きい値である必要があります。注: クォータはクラスターをスケールアップするのに十分な値でなければなりません。<br>
                        **GCP 名**: `maxNodeCount`<br>
                   - `min_node_count`<br>
                    **タイプ**: `INT32`<br>
                        **説明**: ノードプールの最小ノード数。`0` 以上かつ `max_node_count` 以下でなければなりません。<br>
                        **GCP 名**: `minNodeCount`<br>
               - `config`<br>
                  **タイプ**: `STRUCT`<br>
                  **説明**: オプション。ノードプールの構成。<br>
                  **GCP 名**: `config`
                   - `accelerators`<br>
                      **タイプ**: `UNORDERED_LIST_STRUCT`<br>
                      **説明**: オプション。各ノードにアタッチする[ハードウェアアクセラレータ][11]の一覧。<br>
                      **GCP 名**: `accelerators`
                       - `accelerator_count`<br>
                        **タイプ**: `INT64`<br>
                            **説明**: インスタンスに公開されるアクセラレータカードの数。<br>
                            **GCP 名**: `acceleratorCount`<br>
                       - `accelerator_type`<br>
                        **タイプ**: `STRING`<br>
                            **説明**: アクセラレータタイプのリソース名 (Compute Engine の GPU を参照)。<br>
                            **GCP 名**: `acceleratorType`<br>
                       - `gpu_partition_size`<br>
                        **タイプ**: `STRING`<br>
                            **説明**: GPU 上に作成するパーティションのサイズ。有効な値は、[NVIDIA MIG ユーザーガイド][12]に記載されています。<br>
                            **GCP 名**: `gpuPartitionSize`<br>
                   - `boot_disk_kms_key`<br>
                    **タイプ**: `STRING`<br>
                        **説明**: オプション。ノードプールの各ノードにアタッチされている起動ディスクを暗号化するための [CMEK (Customer Managed Encryption Key)][13]。以下のフォーマットでキーを指定します: `projects/KEY_PROJECT_ID/locations/LOCATION /keyRings/RING_NAME/cryptoKeys/KEY_NAME`<br>
                        **GCP 名**: `bootDiskKmsKey`<br>
                   - `local_ssd_count`<br>
                    **タイプ**: `INT32`<br>
                        **説明**: オプション。ノードにアタッチするローカル SSD ディスクの数で、ゾーンごとに許容されるディスクの最大数によって制限されます。[ローカル SSD の追加][14]を参照してください。<br>
                        **GCP 名**: `localSsdCount`<br>
                   - `machine_type`<br>
                    **タイプ**: `STRING`<br>
                        **説明**: オプション。Compute Engine [マシンタイプ][15]の名前。<br>
                        **GCP 名**: `machineType`<br>
                   - `min_cpu_platform`<br>
                    **タイプ**: `STRING`<br>
                        **説明**: オプション。このインスタンスで使用される[最小 CPU プラットフォーム][16]。インスタンスは、指定された CPU プラットフォームまたはより新しい CPU プラットフォームでスケジュールされる可能性があります。`Intel Haswell` や `Intel Sandy Bridge` など、CPU プラットフォームのフレンドリーな名前を指定します。<br>
                        **GCP 名**: `minCpuPlatform`<br>
                   - `preemptible`<br>
                    **タイプ**: `BOOLEAN`<br>
                        **説明**: オプション。ノードが[プリエンプティブ VM インスタンス][17]として作成されているかどうか。プリエンプト可能なノードは、CONTROLLER ロールを持つノードプールや、CONTROLLER ロールが割り当てられていない DEFAULT ノードプールでは使用できません (DEFAULT ノードプールが CONTROLLER ロールを引き継ぎます)。<br>
                        **GCP 名**: `preemptible`<br>
                   - `spot`<br>
                    **タイプ**: `BOOLEAN`<br>
                        **説明**: オプション。Spot VM を有効にするための Spot フラグで、従来のプリエンプティブフラグをリニューアルしたもの。<br>
                        **GCP 名**: `spot`<br>
               - `locations`<br>
                **タイプ**: `UNORDERED_LIST_STRING`<br>
                    **説明**: オプション。Dataproc on GKE 仮想クラスターに関連付けられたノードプールノードが配置される[Compute Engine ゾーン][18]のリスト。注: 仮想クラスターに関連付けられたすべてのノードプールは、仮想クラスターと同じリージョンに配置され、そのリージョン内の同じゾーンに配置されなければなりません。ノードプール作成時に場所が指定されない場合、Dataproc on GKE がゾーンを選択します。<br>
                    **GCP 名**: `locations`<br>
           - `roles`<br>
            **タイプ**: `UNORDERED_LIST_STRING`<br>
                **説明**: 必須。GKE ノードプールに関連するロール。<br>
                **GCP 名**: `roles`<br>
   - `initialization_actions`<br>
      **タイプ**: `UNORDERED_LIST_STRUCT`<br>
      **説明**: オプション。構成完了後、各ノードで実行するコマンド。デフォルトでは、マスターノードと全てのワーカーノードで実行ファイルが実行されます。ノードのロールメタデータをテストして、マスターノードやワーカーノードで実行ファイルを実行するには、以下のように `curl` を使用します (`wget` も使用できます)。
      `ROLE=$(curl -H Metadata-Flavor:Google http://metadata/computeMetadata/v1/instance/attributes/dataproc-role) if [[ "${ROLE}" == 'Master' ]]; then ... master specific actions ... else ... worker specific actions ... fi `<br>
      **GCP 名**: `initializationActions`
       - `executable_file`<br>
        **タイプ**: `STRING`<br>
            **説明**: 必須。実行ファイルのクラウドストレージ URI。<br>
            **GCP 名**: `executableFile`<br>
       - `execution_timeout`<br>
        **タイプ**: `STRING`<br>
            **説明**: オプション。実行ファイルが完成するまでの時間。デフォルトは 10 分です。[Duration の JSON 表現][19]を参照してください。クラスター作成は、タイムアウト時間の終了時に実行ファイルが完了していない場合、説明のためのエラーメッセージ (エラーの原因となった実行ファイル名と超過したタイムアウト時間) を表示して失敗します。<br>
            **GCP 名**: `executionTimeout`<br>
   - `lifecycle_config`<br>
      **タイプ**: `STRUCT`<br>
      **説明**: オプション。クラスターのライフサイクルの設定。<br>
      **GCP 名**: `lifecycleConfig`
       - `auto_delete_time`<br>
        **タイプ**: `TIMESTAMP`<br>
            **説明**: オプション。クラスターが自動削除される時刻。[Timestamp の JSON 表現][19]を参照してください。<br>
            **GCP 名**: `autoDeleteTime`<br>
       - `auto_delete_ttl`<br>
        **タイプ**: `STRING`<br>
            **説明**: オプション。クラスターの有効期間。この期間が終了すると、クラスターは自動削除されます。最小値は 10 分、最大値は 14 日です。[Duration の JSON 表現][19]を参照してください。<br>
            **GCP 名**: `autoDeleteTtl`<br>
       - `idle_delete_ttl`<br>
        **タイプ**: `STRING`<br>
            **説明**: オプション。アイドル時 (ジョブが実行されていない時) にクラスターを存続させる期間。このしきい値を超えると、クラスターは削除されます。最小値は 5 分、最大値は 14 日です。[Duration の JSON 表現][19]を参照してください。<br>
            **GCP 名**: `idleDeleteTtl`<br>
       - `idle_start_time`<br>
        **タイプ**: `TIMESTAMP`<br>
            **説明**: 出力のみ。クラスターがアイドル状態 (直近のジョブが終了) になり、アイドル状態のため削除の対象となった時刻。[Timestamp の JSON 表現][19]を参照してください。<br>
            **GCP 名**: `idleStartTime`<br>
   - `master_config`<br>
      **タイプ**: `STRUCT`<br>
      **説明**: オプション。クラスターのマスターインスタンスに対する Compute Engine の構成設定。<br>
      **GCP 名**: `masterConfig`
       - `accelerators`<br>
          **タイプ**: `UNORDERED_LIST_STRUCT`<br>
          **説明**: オプション。これらのインスタンスに対する Compute Engine のアクセラレーター構成。<br>
          **GCP 名**: `accelerators`
           - `accelerator_count`<br>
            **タイプ**: `INT32`<br>
                **説明**: このインスタンスに公開されている、このタイプのアクセラレーターカードの数。<br>
                **GCP 名**: `acceleratorCount`<br>
           - `accelerator_type_uri`<br>
            **タイプ**: `STRING`<br>
            **説明**: このインスタンスに公開するアクセラレータータイプのリソースの完全な URL、部分的な URI、または短い名前。[Compute Engine AcceleratorTypes][20] を参照してください。例: <br>
            - `https://www.googleapis.com/compute/beta/projects/[project_id]/zones/us-east1-a/acceleratorTypes/nvidia-tesla-k80`<br>
            - `projects/[project_id]/zones/us-east1-a/acceleratorTypes/nvidia-tesla-k80` <br>
            - `nvidia-tesla-k80`<br>
            オートゾーンの例外: Dataproc [Auto Zone Placement][21] 機能を使用している場合、アクセラレータタイプのリソースのショートネーム、例えば `nvidia-tesla-k80` を使用する必要があります。<br>
                **GCP 名**: `acceleratorTypeUri`<br>
       - `disk_config`<br>
          **タイプ**: `STRUCT`<br>
          **説明**: オプション。ディスクオプション構成設定。<br>
          **GCP 名**: `diskConfig`
           - `boot_disk_size_gb`<br>
            **タイプ**: `INT32`<br>
                **説明**: オプション。起動ディスクのサイズ (GB) (デフォルトは 500GB)。<br>
                **GCP 名**: `bootDiskSizeGb`<br>
           - `boot_disk_type`<br>
            **タイプ**: `STRING`<br>
                **説明**: オプション。起動ディスクのタイプ (デフォルトは `pd-standard`)。 <br>
            **有効な値**: 
               - `pd-balanced` - 永続的ディスクバランス型ソリッドステートドライブ
               - `pd-ssd` - 永続的ディスクソリッドステートドライブ
               - `pd-standard` - 永続的ディスクハードディスクドライブ。
               [ディスクタイプ][22]を参照してください。<br>
                **GCP 名**: `bootDiskType`<br>
           - `local_ssd_interface`<br>
            **タイプ**: `STRING`<br>
            **説明**: オプション。ローカル SSD のインターフェイスタイプ (デフォルトは `scsi`)。 <br>
            **有効な値**: <br>
            - `scsi` - 小型コンピューターシステムインターフェイス<br>
            - `nvme` - 不揮発性メモリエクスプレス<br>
            [ローカル SSD の性能][23]をご覧ください。<br>
                **GCP 名**: `localSsdInterface`<br>
           - `num_local_ssds`<br>
            **タイプ**: `INT32`<br>
                **説明**: オプション。アタッチする SSD の数を `0` から `8` の間で指定します (デフォルトは `0`)。SSD がアタッチされていない場合、ブートディスクはランタイムログと [HDFS][24] データの保存に使用されます。1 台以上の SSD がアタッチされている場合、このランタイムバルクデータはそれらの SSD に分散され、ブートディスクには基本設定とインストール済みのバイナリのみが格納されます。注: ローカル SSD のオプションは、選択したマシンの種類と vCPU の数によって異なる場合があります。<br>
                **GCP 名**: `numLocalSsds`<br>
       - `image_uri`<br>
        **タイプ**: `STRING`<br>
        **説明**: オプション。クラスターインスタンスに使用される Compute Engine のイメージリソース。この URI はイメージまたはイメージファミリーを表すことができます。イメージの例: <br>
        - `https://www.googleapis.com/compute/beta/projects/[project_id]/global/images/[image-id]`<br>
        - `projects/[project_id]/global/images/[image-id]` <br>
        - `image-id`<br>
        イメージファミリーの例。Dataproc はそのファミリーの中で最も新しいイメージを使用します。 <br>
        - `https://www.googleapis.com/compute/beta/projects/[project_id]/global/images/family/[custom-image-family-name]`<br>
        - `projects/[project_id]/global/images/family/[custom-image-family-name]`<br>
        URI が指定されていない場合は、`SoftwareConfig.image_version` またはシステムのデフォルト値から推測されます。<br>
            **GCP 名**: `imageUri`<br>
       - `instance_names`<br>
        **タイプ**: `UNORDERED_LIST_STRING`<br>
            **説明**: 出力のみ。インスタンス名のリスト。Dataproc は `cluster_name`、`num_instances`、そしてインスタンスグループからこの名前を導き出します。<br>
            **GCP 名**: `instanceNames`<br>
       - `instance_references`<br>
          **タイプ**: `UNORDERED_LIST_STRUCT`<br>
          **説明**: 出力のみ。Compute Engine インスタンスへのリファレンスのリスト。<br>
          **GCP 名**: `instanceReferences`
           - `instance_id`<br>
            **タイプ**: `STRING`<br>
                **説明**: Compute Engine インスタンスの一意な識別子。<br>
                **GCP 名**: `instanceId`<br>
           - `instance_name`<br>
            **タイプ**: `STRING`<br>
                **説明**: Compute Engine インスタンスのユーザーフレンドリーな名前。<br>
                **GCP 名**: `instanceName`<br>
           - `public_ecies_key`<br>
            **タイプ**: `STRING`<br>
                **説明**: このインスタンスとデータを共有するために使用される公開 ECIES キー。<br>
                **GCP 名**: `publicEciesKey`<br>
           - `public_key`<br>
            **タイプ**: `STRING`<br>
                **説明**: このインスタンスとデータを共有するために使用される公開 RSA キー。<br>
                **GCP 名**: `publicKey`<br>
       - `is_preemptible`<br>
        **タイプ**: `BOOLEAN`<br>
            **説明**: 出力のみ。このインスタンスグループがプリエンプト可能なインスタンスを含んでいることを指定します。<br>
            **GCP 名**: `isPreemptible`<br>
       - `machine_type_uri`<br>
        **タイプ**: `STRING`<br>
        **説明**: オプション。クラスターインスタンスに使用される Compute Engine のマシンタイプ。完全な URL、部分的な URI、または短い名前が有効です。例: <br>
        - `https://www.googleapis.com/compute/v1/projects/[project_id]/zones/us-east1-a/machineTypes/n1-standard-2` <br>
        - `projects/[project_id]/zones/us-east1-a/machineTypes/n1-standard-2`<br>
        - `n1-standard-2`<br>
        オートゾーンの例外: Dataproc [Auto Zone Placement][21] 機能を使用している場合、マシンタイプのリソースのショートネーム、例えば `n1-standard-2` を使用する必要があります。<br>
            **GCP 名**: `machineTypeUri`<br>
       - `managed_group_config`<br>
          **タイプ**: `STRUCT`<br>
          **説明**: 出力のみ。このグループを管理する Compute Engine Instance Group Manager の構成。これは、プリエンプト可能なインスタンスグループにのみ使用されます。<br>
          **GCP 名**: `managedGroupConfig`
           - `instance_group_manager_name`<br>
            **タイプ**: `STRING`<br>
                **説明**: 出力のみ。このグループの Instance Group Manager の名前。<br>
                **GCP 名**: `instanceGroupManagerName`<br>
           - `instance_template_name`<br>
            **タイプ**: `STRING`<br>
                **説明**: 出力のみ。Managed Instance Group に使用される Instance Template の名前。<br>
                **GCP 名**: `instanceTemplateName`<br>
       - `min_cpu_platform`<br>
        **タイプ**: `STRING`<br>
            **説明**: オプション。Instance Group の最小 CPU プラットフォームを指定します。Dataproc [最小 CPU プラットフォーム][25]を参照してください。<br>
            **GCP 名**: `minCpuPlatform`<br>
       - `num_instances`<br>
        **タイプ**: `INT32`<br>
            **説明**: オプション。インスタンスグループ内の VM インスタンスの数。HA クラスターの `master_config` グループでは `3` に設定する必要があります。標準的なクラスターの `master_config` グループでは、`1` に設定する必要があります。<br>
            **GCP 名**: `numInstances`<br>
       - `preemptibility`<br>
        **タイプ**: `STRING`<br>
            **説明**: オプション。インスタンスグループのプリエンプティを指定します。マスターとワーカーグループのデフォルト値は `NON_PREEMPTIBLE` です。このデフォルトは変更することができません。セカンダリーインスタンスのデフォルト値は `PREEMPTIBLE` です。<br>
            **GCP 名**: `preemptibility`<br>
                **可能な値**:<br>
          - `PREEMPTIBILITY_UNSPECIFIED` - プリエンプティが指定されていない場合、システムは各インスタンスグループに対して適切な設定を選択します。<br>
          - `NON_PREEMPTIBLE` - インスタンスはノンプリエンプティブです。このオプションはすべてのインスタンスグループで許可され、マスターとワーカーのインスタンスグループに対してのみ有効な値です。<br>
          - `PREEMPTIBLE` - インスタンスはプリエンプト可能です。このオプションはセカンダリーワーカーグループにのみ許可されています。<br>
   - `metastore_config`<br>
      **タイプ**: `STRUCT`<br>
      **説明**: オプション。メタストアの構成。<br>
      **GCP 名**: `metastoreConfig`
       - `dataproc_metastore_service`<br>
        **タイプ**: `STRING`<br>
            **説明**: 必須。既存の Dataproc Metastore サービスのリソース名。例: `projects/[project_id]/locations/[dataproc_region]/services/[service-name]`<br>
            **GCP 名**: `dataprocMetastoreService`<br>
   - `secondary_worker_config`<br>
      **タイプ**: `STRUCT`<br>
      **説明**: オプション。クラスターのセカンダリーワーカーインスタンスに対する Compute Engine の構成設定<br>
      **GCP 名**: `secondaryWorkerConfig`
       - `accelerators`<br>
          **タイプ**: `UNORDERED_LIST_STRUCT`<br>
          **説明**: オプション。これらのインスタンスに対する Compute Engine のアクセラレーター構成。<br>
          **GCP 名**: `accelerators`
           - `accelerator_count`<br>
            **タイプ**: `INT32`<br>
                **説明**: このインスタンスに公開されている、このタイプのアクセラレーターカードの数。<br>
                **GCP 名**: `acceleratorCount`<br>
           - `accelerator_type_uri`<br>
            **タイプ**: `STRING`<br>
            **説明**: このインスタンスに公開するアクセラレータータイプのリソースの完全な URL、部分的な URI、または短い名前。[Compute Engine Accelerator Types][20] を参照してください。例: <br>
            - `https://www.googleapis.com/compute/beta/projects/[project_id]/zones/us-east1-a/acceleratorTypes/nvidia-tesla-k80` <br>
            - `projects/[project_id]/zones/us-east1-a/acceleratorTypes/nvidia-tesla-k80`<br>
            - `nvidia-tesla-k80Auto` <br>
            ゾーンの例外: Dataproc [Auto Zone Placement][21] 機能を使用している場合、アクセラレータタイプのリソースのショートネーム、例えば `nvidia-tesla-k80` を使用する必要があります。<br>
                **GCP 名**: `acceleratorTypeUri`<br>
       - `disk_config`<br>
          **タイプ**: `STRUCT`<br>
          **説明**: オプション。ディスクオプション構成設定。<br>
          **GCP 名**: `diskConfig`
           - `boot_disk_size_gb`<br>
            **タイプ**: `INT32`<br>
                **説明**: オプション。起動ディスクのサイズ (GB) (デフォルトは 500GB)。<br>
                **GCP 名**: `bootDiskSizeGb`<br>
           - `boot_disk_type`<br>
            **タイプ**: `STRING`<br>
            **説明**: オプション。起動ディスクのタイプ (デフォルトは `pd-standard`)。 <br>
            **有効な値**: <br>
            - `pd-balanced` - 永続的ディスクバランス型ソリッドステートドライブ<br>
            - `pd-ssd` - 永続的ディスクソリッドステートドライブ<br>
            - `pd-standard` - 永続的ディスクハードディスクドライブ<br>
            [ディスクタイプ][22]を参照してください。<br>
                **GCP 名**: `bootDiskType`<br>
           - `local_ssd_interface`<br>
            **タイプ**: `STRING`<br>
                **説明**: オプション。ローカル SSD のインターフェイスタイプ (デフォルトは `scsi`)。 
            **有効な値**: <br>
            - `scsi` - 小型コンピューターシステムインターフェイス<br>
            - `nvme` - 不揮発性メモリエクスプレス。<br>
            [ローカル SSD の性能][23]をご覧ください。<br>
                **GCP 名**: `localSsdInterface`<br>
           - `num_local_ssds`<br>
            **タイプ**: `INT32`<br>
                **説明**: オプション。アタッチする SSD の数を `0` から `8` の間で指定します (デフォルトは `0`)。SSD がアタッチされていない場合、ブートディスクはランタイムログと [HDFS][24] データの保存に使用されます。1 台以上の SSD がアタッチされている場合、このランタイムバルクデータはそれらの SSD に分散され、ブートディスクには基本設定とインストール済みのバイナリのみが格納されます。注: ローカル SSD のオプションは、選択したマシンの種類と vCPU の数によって異なる場合があります。<br>
                **GCP 名**: `numLocalSsds`<br>
       - `image_uri`<br>
        **タイプ**: `STRING`<br>
        **説明**: オプション。クラスターインスタンスに使用される Compute Engine のイメージリソース。この URI はイメージまたはイメージファミリーを表すことができます。イメージの例: <br>
        - `https://www.googleapis.com/compute/beta/projects/[project_id]/global/images/[image-id]` <br>
        - `projects/[project_id]/global/images/[image-id]` <br>
        - `image-idImage` <br>
        ファミリーの例。Dataproc はそのファミリーの中で最も新しいイメージを使用します。 <br>
        - `https://www.googleapis.com/compute/beta/projects/[project_id]/global/images/family/[custom-image-family-name]` <br>
        - `projects/[project_id]/global/images/family/[custom-image-family-name]` <br>
        URI が指定されていない場合は、`SoftwareConfig.image_version` またはシステムのデフォルト値から推測されます。<br>
            **GCP 名**: `imageUri`<br>
       - `instance_names`<br>
        **タイプ**: `UNORDERED_LIST_STRING`<br>
            **説明**: 出力のみ。インスタンス名のリスト。Dataproc は `cluster_name`、`num_instances`、そしてインスタンスグループからこの名前を導き出します。<br>
            **GCP 名**: `instanceNames`<br>
       - `instance_references`<br>
          **タイプ**: `UNORDERED_LIST_STRUCT`<br>
          **説明**: 出力のみ。Compute Engine インスタンスへのリファレンスのリスト。<br>
          **GCP 名**: `instanceReferences`
           - `instance_id`<br>
            **タイプ**: `STRING`<br>
                **説明**: Compute Engine インスタンスの一意な識別子。<br>
                **GCP 名**: `instanceId`<br>
           - `instance_name`<br>
            **タイプ**: `STRING`<br>
                **説明**: Compute Engine インスタンスのユーザーフレンドリーな名前。<br>
                **GCP 名**: `instanceName`<br>
           - `public_ecies_key`<br>
            **タイプ**: `STRING`<br>
                **説明**: このインスタンスとデータを共有するために使用される公開 ECIES キー。<br>
                **GCP 名**: `publicEciesKey`<br>
           - `public_key`<br>
            **タイプ**: `STRING`<br>
                **説明**: このインスタンスとデータを共有するために使用される公開 RSA キー。<br>
                **GCP 名**: `publicKey`<br>
       - `is_preemptible`<br>
        **タイプ**: `BOOLEAN`<br>
            **説明**: 出力のみ。このインスタンスグループがプリエンプト可能なインスタンスを含んでいることを指定します。<br>
            **GCP 名**: `isPreemptible`<br>
       - `machine_type_uri`<br>
        **タイプ**: `STRING`<br>
        **説明**: オプション。クラスターインスタンスに使用される Compute Engine のマシンタイプ。完全な URL、部分的な URI、または短い名前が有効です。例: <br>
        - `https://www.googleapis.com/compute/v1/projects/[project_id]/zones/us-east1-a/machineTypes/n1-standard-2` <br>
        - `projects/[project_id]/zones/us-east1-a/machineTypes/n1-standard-2`<br>
        - `n1-standard-2`<br>
        オートゾーンの例外: Dataproc [Auto Zone Placement][21] 機能を使用している場合、マシンタイプのリソースのショートネーム、例えば `n1-standard-2` を使用する必要があります。<br>
            **GCP 名**: `machineTypeUri`<br>
       - `managed_group_config`<br>
          **タイプ**: `STRUCT`<br>
          **説明**: 出力のみ。このグループを管理する Compute Engine Instance Group Manager の構成。これは、プリエンプト可能なインスタンスグループにのみ使用されます。<br>
          **GCP 名**: `managedGroupConfig`
           - `instance_group_manager_name`<br>
            **タイプ**: `STRING`<br>
                **説明**: 出力のみ。このグループの Instance Group Manager の名前。<br>
                **GCP 名**: `instanceGroupManagerName`<br>
           - `instance_template_name`<br>
            **タイプ**: `STRING`<br>
                **説明**: 出力のみ。Managed Instance Group に使用される Instance Template の名前。<br>
                **GCP 名**: `instanceTemplateName`<br>
       - `min_cpu_platform`<br>
        **タイプ**: `STRING`<br>
            **説明**: オプション。Instance Group の最小 cpu プラットフォームを指定します。Dataproc [最小 CPU プラットフォーム][25]を参照してください。<br>
            **GCP 名**: `minCpuPlatform`<br>
       - `num_instances`<br>
        **タイプ**: `INT32`<br>
            **説明**: オプション。インスタンスグループ内の VM インスタンスの数。HA クラスターの `master_config` グループでは `3` に設定する必要があります。標準的なクラスターの `master_config` グループでは、`1` に設定する必要があります。<br>
            **GCP 名**: `numInstances`<br>
       - `preemptibility`<br>
        **タイプ**: `STRING`<br>
            **説明**: オプション。インスタンスグループのプリエンプティを指定します。マスターとワーカーグループのデフォルト値は `NON_PREEMPTIBLE` です。このデフォルトは変更することができません。セカンダリーインスタンスのデフォルト値は `PREEMPTIBLE` です。<br>
            **GCP 名**: `preemptibility`<br>
                **可能な値**:<br>
          - `PREEMPTIBILITY_UNSPECIFIED` - プリエンプティが指定されていない場合、システムは各インスタンスグループに対して適切な設定を選択します。<br>
          - `NON_PREEMPTIBLE` - インスタンスはノンプリエンプティブです。このオプションはすべてのインスタンスグループで許可され、マスターとワーカーのインスタンスグループに対してのみ有効な値です。<br>
          - `PREEMPTIBLE` - インスタンスはプリエンプト可能です。このオプションはセカンダリーワーカーグループにのみ許可されています。<br>
   - `security_config`<br>
      **タイプ**: `STRUCT`<br>
      **説明**: オプション。クラスターのセキュリティ設定。<br>
      **GCP 名**: `securityConfig`
       - `identity_config`<br>
          **タイプ**: `STRUCT`<br>
          **説明**: オプション。サービスアカウントに基づく安全なマルチテナンシーユーザーマッピングを含む、アイデンティティ関連の構成。<br>
          **GCP 名**: `identityConfig`

       - `kerberos_config`<br>
          **タイプ**: `STRUCT`<br>
          **説明**: オプション。Kerberos 関連の構成。<br>
          **GCP 名**: `kerberosConfig`
           - `cross_realm_trust_admin_server`<br>
            **タイプ**: `STRING`<br>
                **説明**: オプション。クロスレルムの信頼関係における、リモートの信頼できるレルムの管理サーバー (IP またはホスト名)。<br>
                **GCP 名**: `crossRealmTrustAdminServer`<br>
           - `cross_realm_trust_kdc`<br>
            **タイプ**: `STRING`<br>
                **説明**: オプション。クロスレルムの信頼関係における、リモートの信頼できるレルムの KDC (IP またはホスト名)。<br>
                **GCP 名**: `crossRealmTrustKdc`<br>
           - `cross_realm_trust_realm`<br>
            **タイプ**: `STRING`<br>
                **説明**: オプション。Dataproc on-cluster KDC が信頼するリモートレルム (ユーザーがクロスレルム信頼を有効にした場合)。<br>
                **GCP 名**: `crossRealmTrustRealm`<br>
           - `cross_realm_trust_shared_password_uri`<br>
            **タイプ**: `STRING`<br>
                **説明**: オプション。クラスター上の Kerberos レルムとリモートの信頼できるレルムとの間の共有パスワードを含む KMS 暗号化ファイルのクラウドストレージ URI で、クロスレルム信頼関係にあります。<br>
                **GCP 名**: `crossRealmTrustSharedPasswordUri`<br>
           - `enable_kerberos`<br>
            **タイプ**: `BOOLEAN`<br>
                **説明**: オプション。クラスターを Kerberize するかどうかを示すフラグ (デフォルト: `false`)。クラスターで Kerberos を有効にするには、このフィールドを `true` に設定します。<br>
                **GCP 名**: `enableKerberos`<br>
           - `kdc_db_key_uri`<br>
            **タイプ**: `STRING`<br>
                **説明**: オプション。KDC データベースのマスターキーを含む KMS 暗号化ファイルのクラウドストレージ URI。<br>
                **GCP 名**: `kdcDbKeyUri`<br>
           - `key_password_uri`<br>
            **タイプ**: `STRING`<br>
                **説明**: オプション。ユーザー提供のキーのパスワードを含む、KMS 暗号化ファイルのクラウドストレージ URI。自己署名証明書の場合、このパスワードは Dataproc によって生成されます。<br>
                **GCP 名**: `keyPasswordUri`<br>
           - `keystore_password_uri`<br>
            **タイプ**: `STRING`<br>
                **説明**: オプション。ユーザー提供のキーストアのパスワードを含む、KMS 暗号化ファイルのクラウドストレージ URI。自己署名証明書の場合、このパスワードは Dataproc によって生成されます。<br>
                **GCP 名**: `keystorePasswordUri`<br>
           - `keystore_uri`<br>
            **タイプ**: `STRING`<br>
                **説明**: オプション。SSL 暗号化に使用するキーストアファイルのクラウドストレージ URI。提供されない場合、Dataproc は自己署名証明書を提供します。<br>
                **GCP 名**: `keystoreUri`<br>
           - `kms_key_uri`<br>
            **タイプ**: `STRING`<br>
                **説明**: オプション。各種機密ファイルを暗号化するために使用する KMS キーの URI。<br>
                **GCP 名**: `kmsKeyUri`<br>
           - `realm`<br>
            **タイプ**: `STRING`<br>
                **説明**: オプション。クラスター上の Kerberos レルムの名前。指定しない場合は、ホスト名の大文字のドメインがレルムとなります。<br>
                **GCP 名**: `realm`<br>
           - `root_principal_password_uri`<br>
            **タイプ**: `STRING`<br>
                **説明**: オプション。ルートプリンシパルのパスワードを含む KMS 暗号化ファイルのクラウドストレージ URI。<br>
                **GCP 名**: `rootPrincipalPasswordUri`<br>
           - `tgt_lifetime_hours`<br>
            **タイプ**: `INT32`<br>
                **説明**: オプション。チケット付与券の有効期限を時間単位で指定します。指定しない場合、またはユーザーが `0` を指定した場合は、デフォルト値 `10` が使用されます。<br>
                **GCP 名**: `tgtLifetimeHours`<br>
           - `truststore_password_uri`<br>
            **タイプ**: `STRING`<br>
                **説明**: オプション。ユーザー提供のトラストストアのパスワードを含む、KMS 暗号化ファイルのクラウドストレージ URI。自己署名証明書の場合、このパスワードは Dataproc によって生成されます。<br>
                **GCP 名**: `truststorePasswordUri`<br>
           - `truststore_uri`<br>
            **タイプ**: `STRING`<br>
                **説明**: オプション。SSL 暗号化に使用するトラストストアファイルのクラウドストレージ URI。提供されない場合、Dataproc は自己署名証明書を提供します。<br>
                **GCP 名**: `truststoreUri`<br>
   - `software_config`<br>
      **タイプ**: `STRUCT`<br>
      **説明**: オプション。クラスターソフトウェアの構成設定。<br>
      **GCP 名**: `softwareConfig`
       - `image_version`<br>
        **タイプ**: `STRING`<br>
            **説明**: オプション。クラスター内のソフトウェアのバージョン。`1.2` (`1.2.29` などのサブマイナー版を含む) などのサポートされている [Dataproc バージョン][26]や[プレビューバージョン][27]のいずれかでなければなりません。指定がない場合は、最新の Debian バージョンがデフォルトとなります。<br>
            **GCP 名**: `imageVersion`<br>
       - `optional_components`<br>
        **タイプ**: `UNORDERED_LIST_STRING`<br>
            **説明**: オプション。クラスター上でアクティブにするコンポーネントのセット。<br>
            **GCP 名**: `optionalComponents`<br>
   - `temp_bucket`<br>
    **タイプ**: `STRING`<br>
        **説明**: オプション。Spark や MapReduce の履歴ファイルなど、クラスターやジョブのエフェメラルデータを保存するために使用する Cloud Storage バケット。一時バケットを指定しない場合、Dataproc はクラスターがデプロイされている Compute Engine ゾーンに従って、クラスターの一時バケット用の Cloud Storage ロケーション (US、ASIA、EU) を決定し、このプロジェクトレベルのロケーションごとのバケットを作成して管理します。デフォルトのバケットの TTL は 90 日ですが、バケットを指定すれば、任意の TTL を使用できます (使用しないことも可能)。Dataproc の[ステージングと一時バケット][1]を参照してください。このフィールドには、Cloud Storage のバケット名ではなく、`gs://...` という Cloud Storage のバケットへの URI を指定する必要があります。<br>
        **GCP 名**: `tempBucket`<br>
   - `worker_config`<br>
      **タイプ**: `STRUCT`<br>
      **説明**: オプション。クラスターのワーカーインスタンスに対する Compute Engine の構成設定。<br>
      **GCP 名**: `workerConfig`
       - `accelerators`<br>
          **タイプ**: `UNORDERED_LIST_STRUCT`<br>
          **説明**: オプション。これらのインスタンスに対する Compute Engine のアクセラレーター構成。<br>
          **GCP 名**: `accelerators`
           - `accelerator_count`<br>
            **タイプ**: `INT32`<br>
                **説明**: このインスタンスに公開されている、このタイプのアクセラレーターカードの数。<br>
                **GCP 名**: `acceleratorCount`<br>
           - `accelerator_type_uri`<br>
            **タイプ**: `STRING`<br>
            **説明**: このインスタンスに公開するアクセラレータータイプのリソースの完全な URL、部分的な URI、または短い名前。[Compute Engine AcceleratorTypes][20] を参照してください。例: <br>
            - `https://www.googleapis.com/compute/beta/projects/[project_id]/zones/us-east1-a/acceleratorTypes/nvidia-tesla-k80` <br>
            - `projects/[project_id]/zones/us-east1-a/acceleratorTypes/nvidia-tesla-k80` <br>
            - `nvidia-tesla-k80`<br>
            オートゾーンの例外: Dataproc [Auto Zone Placement][21] 機能を使用している場合、アクセラレータタイプのリソースのショートネーム、例えば `nvidia-tesla-k80` を使用する必要があります。<br>
                **GCP 名**: `acceleratorTypeUri`<br>
       - `disk_config`<br>
          **タイプ**: `STRUCT`<br>
          **説明**: オプション。ディスクオプション構成設定。<br>
          **GCP 名**: `diskConfig`
           - `boot_disk_size_gb`<br>
            **タイプ**: `INT32`<br>
                **説明**: オプション。起動ディスクのサイズ (GB) (デフォルトは 500GB)。<br>
                **GCP 名**: `bootDiskSizeGb`<br>
           - `boot_disk_type`<br>
            **タイプ**: `STRING`<br>
                **説明**: オプション。起動ディスクのタイプ (デフォルトは `pd-standard`)。 <br>
            **有効な値**: <br>
            - `pd-balanced` - 永続的ディスクバランス型ソリッドステートドライブ<br>
            - `pd-ssd` - 永続的ディスクソリッドステートドライブ<br>
            - `pd-standard` - 永続的ディスクハードディスクドライブ<br>
            [ディスクタイプ][22]を参照してください。<br>
                **GCP 名**: `bootDiskType`<br>
           - `local_ssd_interface`<br>
            **タイプ**: `STRING`<br>
                **説明**: オプション。ローカル SSD のインターフェイスタイプ (デフォルトは `scsi`)。 
            **有効な値**:<br>
            - `scsi` - 小型コンピューターシステムインターフェイス<br>
            - `nvme` - 不揮発性メモリエクスプレス<br>
            [ローカル SSD の性能][23]をご覧ください。<br>
                **GCP 名**: `localSsdInterface`<br>
           - `num_local_ssds`<br>
            **タイプ**: `INT32`<br>
                **説明**: オプション。アタッチする SSD の数を `0` から `8` の間で指定します (デフォルトは `0`)。SSD がアタッチされていない場合、ブートディスクはランタイムログと [HDFS][24] データの保存に使用されます。1 台以上の SSD がアタッチされている場合、このランタイムバルクデータはそれらの SSD に分散され、ブートディスクには基本設定とインストール済みのバイナリのみが格納されます。注: ローカル SSD のオプションは、選択したマシンの種類と vCPU の数によって異なる場合があります。<br>
                **GCP 名**: `numLocalSsds`<br>
       - `image_uri`<br>
        **タイプ**: `STRING`<br>
        **説明**: オプション。クラスターインスタンスに使用される Compute Engine のイメージリソース。この URI はイメージまたはイメージファミリーを表すことができます。イメージの例: <br>
        - `https://www.googleapis.com/compute/beta/projects/[project_id]/global/images/[image-id]`<br>
        - `projects/[project_id]/global/images/[image-id]` <br>
        - `image-id`<br>
        イメージファミリーの例。Dataproc はそのファミリーの中で最も新しいイメージを使用します。 <br>
        - `https://www.googleapis.com/compute/beta/projects/[project_id]/global/images/family/[custom-image-family-name]`<br>
        - `projects/[project_id]/global/images/family/[custom-image-family-name]`<br>
        URI が指定されていない場合は、`SoftwareConfig.image_version` またはシステムのデフォルト値から推測されます。<br>
            **GCP 名**: `imageUri`<br>
       - `instance_names`<br>
        **タイプ**: `UNORDERED_LIST_STRING`<br>
            **説明**: 出力のみ。インスタンス名のリスト。Dataproc は `cluster_name`、`num_instances`、そしてインスタンスグループからこの名前を導き出します。<br>
            **GCP 名**: `instanceNames`<br>
       - `instance_references`<br>
          **タイプ**: `UNORDERED_LIST_STRUCT`<br>
          **説明**: 出力のみ。Compute Engine インスタンスへのリファレンスのリスト。<br>
          **GCP 名**: `instanceReferences`
           - `instance_id`<br>
            **タイプ**: `STRING`<br>
                **説明**: Compute Engine インスタンスの一意な識別子。<br>
                **GCP 名**: `instanceId`<br>
           - `instance_name`<br>
            **タイプ**: `STRING`<br>
                **説明**: Compute Engine インスタンスのユーザーフレンドリーな名前。<br>
                **GCP 名**: `instanceName`<br>
           - `public_ecies_key`<br>
            **タイプ**: `STRING`<br>
                **説明**: このインスタンスとデータを共有するために使用される公開 ECIES キー。<br>
                **GCP 名**: `publicEciesKey`<br>
           - `public_key`<br>
            **タイプ**: `STRING`<br>
                **説明**: このインスタンスとデータを共有するために使用される公開 RSA キー。<br>
                **GCP 名**: `publicKey`<br>
       - `is_preemptible`<br>
        **タイプ**: `BOOLEAN`<br>
            **説明**: 出力のみ。このインスタンスグループがプリエンプト可能なインスタンスを含んでいることを指定します。<br>
            **GCP 名**: `isPreemptible`<br>
       - `machine_type_uri`<br>
        **タイプ**: `STRING`<br>
        **説明**: オプション。クラスターインスタンスに使用される Compute Engine のマシンタイプ。完全な URL、部分的な URI、または短い名前が有効です。例: <br>
        - `https://www.googleapis.com/compute/v1/projects/[project_id]/zones/us-east1-a/machineTypes/n1-standard-2` <br>
        - `projects/[project_id]/zones/us-east1-a/machineTypes/n1-standard-2`<br>
        - `n1-standard-2`<br>
        オートゾーンの例外: Dataproc [Auto Zone Placement][21] 機能を使用している場合、マシンタイプのリソースのショートネーム、例えば `n1-standard-2` を使用する必要があります。<br>
            **GCP 名**: `machineTypeUri`<br>
       - `managed_group_config`<br>
          **タイプ**: `STRUCT`<br>
          **説明**: 出力のみ。このグループを管理する Compute Engine Instance Group Manager の構成。これは、プリエンプト可能なインスタンスグループにのみ使用されます。<br>
          **GCP 名**: `managedGroupConfig`
           - `instance_group_manager_name`<br>
            **タイプ**: `STRING`<br>
                **説明**: 出力のみ。このグループの Instance Group Manager の名前。<br>
                **GCP 名**: `instanceGroupManagerName`<br>
           - `instance_template_name`<br>
            **タイプ**: `STRING`<br>
                **説明**: 出力のみ。Managed Instance Group に使用される Instance Template の名前。<br>
                **GCP 名**: `instanceTemplateName`<br>
       - `min_cpu_platform`<br>
        **タイプ**: `STRING`<br>
            **説明**: オプション。Instance Group の最小 cpu プラットフォームを指定します。Dataproc [最小 CPU プラットフォーム][25]を参照してください。<br>
            **GCP 名**: `minCpuPlatform`<br>
       - `num_instances`<br>
        **タイプ**: `INT32`<br>
            **説明**: オプション。インスタンスグループ内の VM インスタンスの数。HA クラスターの master_config グループでは `3` に設定する必要があります。標準的なクラスターの master_config グループでは、`1` に設定する必要があります。<br>
            **GCP 名**: `numInstances`<br>
       - `preemptibility`<br>
        **タイプ**: `STRING`<br>
            **説明**: オプション。インスタンスグループのプリエンプティを指定します。マスターとワーカーグループのデフォルト値は `NON_PREEMPTIBLE` です。このデフォルトは変更することができません。セカンダリーインスタンスのデフォルト値は `PREEMPTIBLE` です。<br>
            **GCP 名**: `preemptibility`<br>
                **可能な値**:<br>
          - `PREEMPTIBILITY_UNSPECIFIED` - プリエンプティが指定されていない場合、システムは各インスタンスグループに対して適切な設定を選択します。<br>
          - `NON_PREEMPTIBLE` - インスタンスはノンプリエンプティブです。このオプションはすべてのインスタンスグループで許可され、マスターとワーカーのインスタンスグループに対してのみ有効な値です。<br>
          - `PREEMPTIBLE` - インスタンスはプリエンプト可能です。このオプションはセカンダリーワーカーグループにのみ許可されています。<br>
## `labels`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `metrics`
  **タイプ**: `STRUCT`<br>
  **説明**: 出力のみ。HDFS や YARN の統計など、クラスターデーモンのメトリクスが含まれます。ベータ版機能。このレポートはテスト目的でのみ利用可能です。最終リリース前に変更される可能性があります。<br>
  **GCP 名**: `metrics`

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
## `status`
  **タイプ**: `STRUCT`<br>
  **説明**: 出力のみ。クラスターのステータス。<br>
  **GCP 名**: `status`
   - `detail`<br>
    **タイプ**: `STRING`<br>
        **説明**: オプション。出力のみ。クラスターの状態の詳細。<br>
        **GCP 名**: `detail`<br>
   - `state`<br>
    **タイプ**: `STRING`<br>
        **説明**: 出力のみ。クラスターの状態。 <br>
        **GCP 名**: `state`<br>
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
        **説明**: 出力のみ。この状態になった時刻。[Timestamp の JSON 表現][19]を参照してください。<br>
        **GCP 名**: `stateStartTime`<br>
   - `substate`<br>
    **タイプ**: `STRING`<br>
        **説明**: 出力のみ。Agent から報告されたステータスを含む、追加の状態情報。 <br>
        **GCP 名**: `substate`<br>
            **可能な値**:<br>
      - `UNSPECIFIED` - クラスターのサブステートは不明です。<br>
      - `UNHEALTHY` - クラスターが不健全な状態であることが判明しています (例えば、重要なデーモンが動作していない、HDFS の容量が枯渇しているなど)。RUNNING 状態に適用されます。<br>
      - `STALE_STATUS` - Agent が報告したステータスが古くなっています (Dataproc が Agent との通信を失うと発生する可能性があります)。RUNNING 状態に適用されます。<br>
## `status_history`
  **タイプ**: `UNORDERED_LIST_STRUCT`<br>
  **説明**: 出力のみ。前回のクラスターのステータス。<br>
  **GCP 名**: `statusHistory`
   - `detail`<br>
    **タイプ**: `STRING`<br>
        **説明**: オプション。出力のみ。クラスターの状態の詳細。<br>
        **GCP 名**: `detail`<br>
   - `state`<br>
    **タイプ**: `STRING`<br>
        **説明**: 出力のみ。クラスターの状態。 <br>
        **GCP 名**: `state`<br>
            **可能な値**:<br>
      - `UNKNOWN` - クラスターの状態は不明です。<br>
      - `CREATING` - クラスターを作成し、セットアップしているところです。使用する準備ができていません。<br>
      - `RUNNING` - クラスターは現在稼働中で、健全な状態です。注: クラスターのステータスは、マスターノードと最初の 2 つのプライマリーワーカーノード (プライマリーワーカーが 2 つ以上の場合は最後のプライマリーワーカーノード) が稼働した後に 'creating' から 'running' ステータスに変更されます。<br>
      - `ERROR` - クラスターにエラーが発生しました。使用する準備ができていません。<br>
      - `ERROR_DUE_TO_UPDATE` - クラスターを更新中にエラーが発生しました。クラスターへのジョブの送信は可能ですが、クラスターを更新できません。<br>
      - `DELETING` - クラスターは削除中です。使用することはできません。<br>
      - `UPDATING` - クラスターは更新中です。ジョブの受け入れと処理は継続しています。<br>
      - `STOPPING` - クラスターは停止中です。使用できません。<br>
      - `STOPPED` - クラスターは現在停止中です。使用する準備ができていません。<br>
      - `STARTING` - クラスターは起動中です。使用する準備ができていません。<br>
      - `REPAIRING` - クラスターは修理中です。使用する準備ができていません。<br>
   - `state_start_time`<br>
    **タイプ**: `TIMESTAMP`<br>
        **説明**: 出力のみ。この状態になった時刻。[Timestamp の JSON 表現][19]を参照してください。<br>
        **GCP 名**: `stateStartTime`<br>
   - `substate`<br>
    **タイプ**: `STRING`<br>
        **説明**: 出力のみ。Agent から報告されたステータスを含む、追加の状態情報。 <br>
        **GCP 名**: `substate`<br>
            **可能な値**:<br>
      - `UNSPECIFIED` - クラスターのサブステートは不明です。<br>
      - `UNHEALTHY` - クラスターが不健全な状態であることが判明しています (例えば、重要なデーモンが動作していない、HDFS の容量が枯渇しているなど)。RUNNING 状態に適用されます。<br>
      - `STALE_STATUS` - Agent が報告したステータスが古くなっています (Dataproc が Agent との通信を失うと発生する可能性があります)。RUNNING 状態に適用されます。<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `virtual_cluster_config`
  **タイプ**: `STRUCT`<br>
  **説明**: オプション。仮想クラスター構成は、例えば [Dataproc-on-GKE クラスター][28]を作成するときなど、基盤となるコンピュートリソースを直接制御しない Dataproc クラスターを作成するときに使用されるものです。Dataproc はデフォルト値を設定することができ、クラスターが更新されると値が変更されることがあります。また、クラスターが更新されると値が変わる可能性があります。<br>
  **GCP 名**: `virtualClusterConfig`
   - `auxiliary_services_config`<br>
      **タイプ**: `STRUCT`<br>
      **説明**: オプション。このクラスターが使用する補助サービスの構成。<br>
      **GCP 名**: `auxiliaryServicesConfig`
       - `metastore_config`<br>
          **タイプ**: `STRUCT`<br>
          **説明**: オプション。このワークロードの Hive メタストア構成。<br>
          **GCP 名**: `metastoreConfig`
           - `dataproc_metastore_service`<br>
            **タイプ**: `STRING`<br>
                **説明**: 必須。既存の Dataproc Metastore サービスのリソース名。例: `projects/[project_id]/locations/[dataproc_region]/services/[service-name]`<br>
                **GCP 名**: `dataprocMetastoreService`<br>
       - `spark_history_server_config`<br>
          **タイプ**: `STRUCT`<br>
          **説明**: オプション。ワークロードの Spark History Server 構成。<br>
          **GCP 名**: `sparkHistoryServerConfig`
           - `dataproc_cluster`<br>
            **タイプ**: `STRING`<br>
                **説明**: オプション。ワークロードの Spark History Server として動作する、既存の Dataproc Cluster のリソース名。例: `projects/[project_id]/regions/[region]/clusters/[cluster_name]`<br>
                **GCP 名**: `dataprocCluster`<br>
   - `kubernetes_cluster_config`<br>
      **タイプ**: `STRUCT`<br>
      **説明**: 必須。Kubernetes 上で Dataproc クラスターを動作させるための構成。<br>
      **GCP 名**: `kubernetesClusterConfig`
       - `gke_cluster_config`<br>
          **タイプ**: `STRUCT`<br>
          **説明**: 必須。GKE 上で Dataproc クラスターを動作させるための構成。<br>
          **GCP 名**: `gkeClusterConfig`
           - `gke_cluster_target`<br>
            **タイプ**: `STRING`<br>
                **説明**: オプション。デプロイ先の GKE クラスター。Dataproc クラスターと同じプロジェクトおよびリージョンである必要があります (GKE クラスターはゾーンまたはリージョナルである可能性があります)。フォーマット: `projects/{project}/locations/{location}/clusters/{cluster_id}`<br>
                **GCP 名**: `gkeClusterTarget`<br>
           - `namespaced_gke_deployment_target`<br>
              **タイプ**: `STRUCT`<br>
              **説明**: オプション。非推奨。`gkeClusterTarget` を使ってください。非推奨のベータ版でのみ使用されます。デプロイメントのターゲット。<br>
              **GCP 名**: `名spacedGkeDeploymentTarget`
               - `cluster_namespace`<br>
                **タイプ**: `STRING`<br>
                    **説明**: オプション。デプロイ先となる GKE クラスター内のネームスペース。<br>
                    **GCP 名**: `clusterNamespace`<br>
               - `target_gke_cluster`<br>
                **タイプ**: `STRING`<br>
                    **説明**: オプション。デプロイ先となる GKE クラスター。フォーマット: `projects/{project}/locations/{location}/clusters/{cluster_id}`<br>
                    **GCP 名**: `targetGkeCluster`<br>
           - `node_pool_target`<br>
              **タイプ**: `UNORDERED_LIST_STRUCT`<br>
              **説明**: オプション。ワークロードがスケジュールされる GKE ノードプール。少なくとも 1 つのノードプールには、DEFAULT `GkeNodePoolTarget.Role` が割り当てられていなければなりません。`GkeNodePoolTarget` が指定されていない場合、Dataproc は DEFAULT `GkeNodePoolTarget` を作成します。各ロールは、1 つの `GkeNodePoolTarget` にのみ指定することができます。すべてのノードプールは、同じロケーション設定でなければなりません。<br>
              **GCP 名**: `nodePoolTarget`
               - `node_pool`<br>
                **タイプ**: `STRING`<br>
                    **説明**: 必須。対象の GKE ノードプール。フォーマット: `projects/{project}/locations/{location}/clusters/{cluster}/nodePools/{node_pool}`<br>
                    **GCP 名**: `nodePool`<br>
               - `node_pool_config`<br>
                  **タイプ**: `STRUCT`<br>
                  **説明**: 入力のみ。GKE ノードプールの構成。指定された場合、Dataproc は指定された形状を持つノードプールを作成しようとします。同名のものがすでに存在する場合は、指定されたすべてのフィールドと照合されます。フィールドが異なる場合、仮想クラスターの作成は失敗します。省略した場合は、指定された名前のノードプールが使用されます。指定された名前のノードプールが存在しない場合、Dataproc はデフォルト値でノードプールを作成します。これは入力専用フィールドです。API から返されることはありません。<br>
                  **GCP 名**: `nodePoolConfig`
                   - `autoscaling`<br>
                      **タイプ**: `STRUCT`<br>
                      **説明**: オプション。このノードプールのオートスケーラ構成。有効な構成が存在する場合にのみ、オートスケーラが有効になります。<br>
                      **GCP 名**: `autoscaling`
                       - `max_node_count`<br>
                        **タイプ**: `INT32`<br>
                            **説明**: ノードプールの最大ノード数。`min_node_count` 以上で、かつ `0` よりも大きい値である必要があります。注: クォータはクラスターをスケールアップするのに十分な値でなければなりません。<br>
                            **GCP 名**: `maxNodeCount`<br>
                       - `min_node_count`<br>
                        **タイプ**: `INT32`<br>
                            **説明**: ノードプールの最小ノード数。`0` 以上かつ `max_node_count` 以下でなければなりません。<br>
                            **GCP 名**: `minNodeCount`<br>
                   - `config`<br>
                      **タイプ**: `STRUCT`<br>
                      **説明**: オプション。ノードプールの構成。<br>
                      **GCP 名**: `config`
                       - `accelerators`<br>
                          **タイプ**: `UNORDERED_LIST_STRUCT`<br>
                          **説明**: オプション。各ノードにアタッチする[ハードウェアアクセラレータ][11]の一覧。<br>
                          **GCP 名**: `accelerators`
                           - `accelerator_count`<br>
                            **タイプ**: `INT64`<br>
                                **説明**: インスタンスに公開されるアクセラレータカードの数。<br>
                                **GCP 名**: `acceleratorCount`<br>
                           - `accelerator_type`<br>
                            **タイプ**: `STRING`<br>
                                **説明**: アクセラレータタイプのリソース名 (Compute Engine の GPU を参照)。<br>
                                **GCP 名**: `acceleratorType`<br>
                           - `gpu_partition_size`<br>
                            **タイプ**: `STRING`<br>
                                **説明**: GPU 上に作成するパーティションのサイズ。有効な値は、[NVIDIA MIG ユーザーガイド][12]に記載されています。<br>
                                **GCP 名**: `gpuPartitionSize`<br>
                       - `boot_disk_kms_key`<br>
                        **タイプ**: `STRING`<br>
                            **説明**: オプション。ノードプールの各ノードにアタッチされている起動ディスクを暗号化するための [CMEK (Customer Managed Encryption Key)][13]。以下のフォーマットでキーを指定します: `projects/KEY_PROJECT_ID/locations/LOCATION /keyRings/RING_NAME/cryptoKeys/KEY_NAME`<br>
                            **GCP 名**: `bootDiskKmsKey`<br>
                       - `local_ssd_count`<br>
                        **タイプ**: `INT32`<br>
                            **説明**: オプション。ノードにアタッチするローカル SSD ディスクの数で、ゾーンごとに許容されるディスクの最大数によって制限されます。[ローカル SSD の追加][14]を参照してください。<br>
                            **GCP 名**: `localSsdCount`<br>
                       - `machine_type`<br>
                        **タイプ**: `STRING`<br>
                            **説明**: オプション。[Compute Engine マシンタイプ][15]の名前。<br>
                            **GCP 名**: `machineType`<br>
                       - `min_cpu_platform`<br>
                        **タイプ**: `STRING`<br>
                            **説明**: オプション。このインスタンスで使用される[最小 CPU プラットフォーム][16]。インスタンスは、指定された CPU プラットフォームまたはより新しい CPU プラットフォームでスケジュールされる可能性があります。`Intel Haswell` や `Intel Sandy Bridge` など、CPU プラットフォームのフレンドリーな名前を指定します。<br>
                            **GCP 名**: `minCpuPlatform`<br>
                       - `preemptible`<br>
                        **タイプ**: `BOOLEAN`<br>
                            **説明**: オプション。ノードが[プリエンプティブ VM インスタンス][17]として作成されているかどうか。プリエンプト可能なノードは、CONTROLLER ロールを持つノードプールや、CONTROLLER ロールが割り当てられていない DEFAULT ノードプールでは使用できません (DEFAULT ノードプールが CONTROLLER ロールを引き継ぎます)。<br>
                            **GCP 名**: `preemptible`<br>
                       - `spot`<br>
                        **タイプ**: `BOOLEAN`<br>
                            **説明**: オプション。Spot VM を有効にするための Spot フラグで、従来のプリエンプティブフラグをリニューアルしたもの。<br>
                            **GCP 名**: `spot`<br>
                   - `locations`<br>
                    **タイプ**: `UNORDERED_LIST_STRING`<br>
                        **説明**: オプション。Dataproc on GKE 仮想クラスターに関連付けられたノードプールノードが配置される[Compute Engine ゾーン][18]のリスト。注: 仮想クラスターに関連付けられたすべてのノードプールは、仮想クラスターと同じリージョンに配置され、そのリージョン内の同じゾーンに配置されなければなりません。ノードプール作成時に場所が指定されない場合、Dataproc on GKE がゾーンを選択します。<br>
                        **GCP 名**: `locations`<br>
               - `roles`<br>
                **タイプ**: `UNORDERED_LIST_STRING`<br>
                    **説明**: 必須。GKE ノードプールに関連するロール。<br>
                    **GCP 名**: `roles`<br>
       - `kubernetes_namespace`<br>
        **タイプ**: `STRING`<br>
            **説明**: オプション。デプロイ先となる Kubernetes クラスター内のネームスペース。このネームスペースが存在しない場合、作成されます。存在する場合、Dataproc は別の Dataproc VirtualCluster がその中にインストールされていないことを確認します。指定しない場合は、Dataproc クラスターの名前が使用されます。<br>
            **GCP 名**: `kubernetesNamespace`<br>
       - `kubernetes_software_config`<br>
          **タイプ**: `STRUCT`<br>
          **説明**: オプション。Kubernetes 上で動作するこの Dataproc クラスターのソフトウェア構成。<br>
          **GCP 名**: `kubernetesSoftwareConfig`
   - `staging_bucket`<br>
    **タイプ**: `STRING`<br>
        **説明**: オプション。ジョブの依存関係、構成ファイル、ジョブドライバーのコンソール出力をステージングするために使用される Cloud Storage バケット。ステージングバケットを指定しない場合、Cloud Dataproc はクラスターがデプロイされている Compute Engine ゾーンに従ってクラスタのステージングバケット用の Cloud Storage ロケーション (US、ASIA、EU) を決定し、このプロジェクトレベルのロケーションごとのバケットを作成して管理します。Dataproc の[ステージングと一時バケット][1]を参照してください。このフィールドは、Cloud Storage バケットへの `gs://...` URI ではなく、Cloud Storage バケット名を必要とします。<br>
        **GCP 名**: `stagingBucket`<br>



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