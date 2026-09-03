---
algolia:
  tags:
  - cloud cost recommendations
  - cloud cost recommendation
  - cost recommendations
  - cost recommendation
  - cloud resources
  - cloud resource
  - cost recommendation risk
  - cost recommendation effort
  - cost recommendation level of effort
aliases:
- /ja/cloud_cost_management/recommendations/savings
description: コストに関する推奨事項を活用して、組織のクラウドリソースにかかる費用を削減する方法を学びます。
further_reading:
- link: /cloud_cost_management/
  tag: ドキュメント
  text: Cloud Cost Management について学ぶ
- link: /integrations/guide/aws-integration-and-cloudwatch-faq/
  tag: ドキュメント
  text: AWS 統合と CloudWatch に関する FAQ
- link: https://www.datadoghq.com/blog/finops-at-datadog/
  tag: ブログ
  text: Datadog で FinOps プラクティスを成功させた方法
- link: https://www.datadoghq.com/blog/cloud-cost-recommendations/
  tag: ブログ
  text: Cloud Cost Recommendations を使用して、AWS、Azure、Google Cloud 全体のクラウドの無駄を排除
multifiltersearch:
  data:
  - category: Configure
    cloud_provider: Anthropic
    recommendation_description: プロンプトキャッシュを使用していない Anthropic API キーを特定し、入力トークンコストを削減するためにプロンプトキャッシュを有効にすることを推奨します。
    recommendation_prerequisites: ''
    recommendation_type: Enable Prompt Caching
    resource_type: API Key
  - category: Configure
    cloud_provider: Anthropic
    recommendation_description: ターゲットのヒット率を下回る効率でプロンプトキャッシングを利用している Anthropic API
      キーを特定し、入力トークンコストを削減するためのキャッシュ設定の改善を推奨します。
    recommendation_prerequisites: ''
    recommendation_type: Optimize Prompt Caching
    resource_type: API Key
  - category: Configure
    cloud_provider: Anthropic
    recommendation_description: 最も高価なモデルへの支出が集中しているエンタープライズユーザーを特定し、より低コストなモデルの利用を推奨します。
    recommendation_prerequisites: ''
    recommendation_type: Reduce Top-Tier Model Usage
    resource_type: Enterprise User
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: CPU とメモリの使用率が低く、スケーリング戦略を調整することで縮小可能な、コンテナ化されていないワークロードを実行する
      Auto Scaling グループ。
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize Auto Scaling Group
    resource_type: Auto Scaling Group
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: レガシーインスタンスタイプを含む Auto Scaling グループ。
    recommendation_prerequisites: ''
    recommendation_type: Migrate ASG Legacy Instances
    resource_type: Auto Scaling Group
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: インスタンス数を最小容量まで削減可能な Auto Scaling グループ。
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Reduce Minimum Capacity
    resource_type: Auto Scaling Group
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: 有料イベントを含む CloudTrail トレイルは、コスト削減のために削除できます。
    recommendation_prerequisites: ''
    recommendation_type: Delete Unnecessary CloudTrail Trails
    resource_type: CloudTrail Trail
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: DynamoDB テーブルのグローバルセカンダリインデックス (GSI) の読み取り消費量は 0 です。
    recommendation_prerequisites: ''
    recommendation_type: Delete DynamoDB Global Secondary Index
    resource_type: DynamoDB Table
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: DynamoDB テーブルに 2 つを超えるオンデマンドバックアップの料金が発生しています。
    recommendation_prerequisites: ''
    recommendation_type: Delete Extra DynamoDB On-Demand Backups
    resource_type: DynamoDB Table
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: DynamoDB テーブルの読み取り消費量と非レプリカ書き込み消費量が 0 です。
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused DynamoDB Table
    resource_type: DynamoDB Table
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: プロビジョニングされた DynamoDB テーブルのうち、読み取りおよび書き込みキャパシティの 80%
      未満しか使用していない時間が全体の 80% を超えるもの。
    recommendation_prerequisites: ''
    recommendation_type: Downsize DynamoDB Capacity
    resource_type: DynamoDB Table
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Infrequent Access (IA) テーブルクラスへ移行することで、容量料金による追加コストと比較して、ストレージ料金によるさらなる節約の可能性があります。
    recommendation_prerequisites: ''
    recommendation_type: Migrate DynamoDB to Infrequent Access Table Class
    resource_type: DynamoDB Table
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: プロビジョニングされた DynamoDB テーブルのうち、過去 2 週間の間に少なくとも 1 回、1
      時間あたりの読み込みおよび書き込みキャパシティの消費率が 18% を下回ったもの。
    recommendation_prerequisites: ''
    recommendation_type: Migrate DynamoDB to On-Demand Capacity Mode
    resource_type: DynamoDB Table
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: 1 時間あたりの読み取りおよび書き込み容量消費量が、常に 18% を超えているオンデマンド DynamoDB
      テーブルがあります。
    recommendation_prerequisites: ''
    recommendation_type: Migrate DynamoDB to Provisioned Capacity Mode
    resource_type: DynamoDB Table
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Standard テーブルクラスへ移行することで、ストレージ料金による追加コストと比較して、容量料金の面でコストを削減できる可能性があります。または、Standard
      テーブルクラスのストレージ無料枠を利用できる可能性があります。
    recommendation_prerequisites: ''
    recommendation_type: Migrate DynamoDB to Standard Table Class
    resource_type: DynamoDB Table
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: 作成から 90 日以上経過しており、削除可能な EBS スナップショット。
    recommendation_prerequisites: ''
    recommendation_type: Delete Old EBS Snapshots
    resource_type: EBS Snapshot
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: EC2 インスタンスにアタッチされていないボリューム。
    recommendation_prerequisites: ''
    recommendation_type: Delete Unattached EBS Volume
    resource_type: EBS Volume
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: 読み取りまたは書き込みアクティビティがないボリューム。
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused EBS Volume
    resource_type: EBS Volume
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: プロビジョニングされた読み取りおよび書き込み IOPS の 80% 未満しか使用していない EBS
      ボリューム。
    recommendation_prerequisites: '[Amazon EC2 integration](/integrations/amazon_ec2/)'
    recommendation_type: Downsize EBS Volume Provisioned IOPS
    resource_type: EBS Volume
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: 読み取りおよび書き込みにおいて、プロビジョニングされたスループットの設定済みしきい値を下回る使用量となっている
      EBS ボリューム。
    recommendation_prerequisites: '[Amazon EC2 integration](/integrations/amazon_ec2/)'
    recommendation_type: Downsize EBS Volume Provisioned Throughput
    resource_type: EBS Volume
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: ストレージ容量の 20% 未満しか使用されていない EBS ボリューム。
    recommendation_prerequisites: '[Amazon EC2 integration](/integrations/amazon_ec2/)'
    recommendation_type: Downsize EBS Volume Storage Capacity
    resource_type: EBS Volume
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: コスト削減とパフォーマンス向上のために GP3 へアップグレード可能な GP2 の EBS ボリューム。
    recommendation_prerequisites: ''
    recommendation_type: Migrate EBS Volume from GP2 to GP3
    resource_type: EBS Volume
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: コスト削減とパフォーマンス向上のために GP3 へアップグレード可能な IO1 の EBS ボリューム。
    recommendation_prerequisites: ''
    recommendation_type: Migrate EBS Volume from IO1 to GP3
    resource_type: EBS Volume
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: AWS コストおよび使用状況レポートにある、アイドル料金が発生している Elastic IP アドレス。
    recommendation_prerequisites: ''
    recommendation_type: Release Idle Elastic IP
    resource_type: Elastic IP
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: CPU およびメモリの使用率が、同一インスタンスファミリー内の次に小さいサイズのインスタンスが持つリソース容量を下回っている
      EC2 インスタンス。Datadog Agent がない場合、この推奨事項は CloudWatch メトリクスを使用して生成されます。
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize EC2 Instance
    resource_type: EC2 Instance
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: より新しいインスタンスタイプにアップグレード可能な旧世代の EC2 インスタンス。
    recommendation_prerequisites: ''
    recommendation_type: Migrate EC2 Instance
    resource_type: EC2 Instance
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: 同等の Graviton インスタンスタイプに移行可能な EC2 インスタンス。
    recommendation_prerequisites: ''
    recommendation_type: Migrate EC2 Instance to Graviton Type
    resource_type: EC2 Instance
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: 保留フェーズでスタックしている Kubernetes ノードをホストする EC2 インスタンス。これは、そのノードが正常に機能していないことを示しています。
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Terminate EC2 Instance with Stuck Node
    resource_type: EC2 Instance
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: CPU およびメモリ使用率がカスタマイズ可能なしきい値を下回っている EC2 インスタンス。Datadog
      Agent がない場合、この推奨事項は CloudWatch メトリクスを使用して生成されます。
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Terminate Unused EC2 Instance
    resource_type: EC2 Instance
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: コスト削減のために削除可能な、プルアクティビティのない ECR リポジトリ。
    recommendation_prerequisites: ''
    recommendation_type: Delete ECR Repository
    resource_type: ECR Repository
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: 要求された CPU またはメモリの 50% 未満しか使用していない ECS タスク。
    recommendation_prerequisites: '[Container Monitoring](/containers/)'
    recommendation_type: Downsize ECS Task Size
    resource_type: ECS Task Definition
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: キャッシュヒットがなくレプリケーションもない ElastiCache Redis クラスター、またはキャッシュヒットのない
      Memcached クラスター。
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused ElastiCache Cluster
    resource_type: ElastiCache Cluster
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: リクエストアクティビティがない OpenSearch ドメイン。
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused OpenSearch Domain
    resource_type: OpenSearch Domain
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: アクティブな接続がなく、EC2 インスタンスにもアタッチされていない Classic Elastic
      Load Balancer。
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused Classic Load Balancer
    resource_type: Classic Load Balancer
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: トラフィックが処理されていないアプリケーションロードバランサー。
    recommendation_prerequisites: ''
    recommendation_type: Delete Application Load Balancer
    resource_type: Load Balancer
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: 処理バイト数が 0 のネットワークロードバランサー。
    recommendation_prerequisites: ''
    recommendation_type: Delete Network Load Balancer
    resource_type: Load Balancer
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: プロビジョニングされた同時実行数が過剰に割り当てられている AWS Lambda 関数。
    recommendation_prerequisites: ''
    recommendation_type: Downsize Lambda Provisioned Concurrency
    resource_type: Lambda
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: 適切な保持ポリシーを設定して、CloudWatch Logs のストレージコストを削減します。
    recommendation_prerequisites: ''
    recommendation_type: Set CloudWatch Logs Retention Policy
    resource_type: CloudWatch Log Group
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: 接続数が 0 の MQ ブローカー。
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused MQ Broker
    resource_type: MQ Broker
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: データベース接続数 0、レプリカラグ 0 の RDS インスタンス。
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused RDS Instance
    resource_type: RDS Instance
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: AWS Compute Optimizer がより小さなインスタンスタイプへのサイズ変更を推奨している
      RDS インスタンス。
    recommendation_prerequisites: '[AWS Cost Optimization Hub permissions](/cloud_cost_management/setup/aws/#permissions-for-aws-cost-optimization-hub-recommendations)'
    recommendation_type: Downsize RDS Instance
    resource_type: RDS Instance
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: 過去 2 週間でプロビジョニングされた IOPS の 80% 未満しか使用していない RDS インスタンス。
    recommendation_prerequisites: ''
    recommendation_type: Downsize RDS Instance Provisioned IOPS
    resource_type: RDS Instance
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: サポートが終了したエンジンバージョンを実行しており、[拡張サポート料金] (https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/extended-support-charges.html)
      が発生している RDS。
    recommendation_prerequisites: ''
    recommendation_type: Migrate RDS Instance Engine
    resource_type: RDS Instance
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: 同等の Graviton インスタンスタイプに移行可能な RDS インスタンス。
    recommendation_prerequisites: ''
    recommendation_type: Migrate RDS Instance to Graviton
    resource_type: RDS Instance
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: データベース接続数が 0 の Redshift クラスター。
    recommendation_prerequisites: ''
    recommendation_type: Delete Redshift Cluster
    resource_type: Redshift Cluster
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: バージョニングが有効なバケットで、古いオブジェクトバージョンによるストレージコストが大幅に発生しているもの。
    recommendation_prerequisites: '[Storage Management](https://www.datadoghq.com/product/storage-management)'
    recommendation_type: Clean up old versions to reduce storage costs
    resource_type: S3 Bucket
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: ストレージコストが最小限で、実質的なオブジェクト API の利用 (Get、Put、Copy、Head、またはマルチパートアップロードのアクティビティ)
      がない S3 バケット。
    recommendation_prerequisites: '[Cloud Cost Management](https://www.datadoghq.com/product/cloud-cost-management)
      or [Storage Management](https://www.datadoghq.com/product/storage-management)'
    recommendation_type: Delete S3 Bucket
    resource_type: S3 Bucket
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: 非現行バージョンの有効期限切れライフサイクルがなく、ウェブサイトを提供しておらず、30 日以上経過した非現行バージョンのストレージバイトを含む標準
      S3 バケット。
    recommendation_prerequisites: '[Storage Lens](/integrations/amazon_s3_storage_lens/)'
    recommendation_type: Delete S3 noncurrent version objects
    resource_type: S3 Bucket
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: ストレージ容量を消費している、7 日以上経過した不完全なマルチパートアップロードがある S3 バケット。
    recommendation_prerequisites: '[Storage Lens](/integrations/amazon_s3_storage_lens/)'
    recommendation_type: Delete abandoned S3 multipart uploads
    resource_type: S3 Bucket
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: 低頻度アクセスストレージクラスに小さなファイルがかなりの割合で含まれており、最小課金サイズのためにストレージコストが増加しているバケット。
    recommendation_prerequisites: ''
    recommendation_type: Reduce small file count to reduce storage costs
    resource_type: S3 Bucket
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: 早期削除料金が多額に発生しているバケット。
    recommendation_prerequisites: ''
    recommendation_type: Transition S3 IA and Glacier objects to Intelligent-Tiering
    resource_type: S3 Bucket
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: コストのほぼすべてが GB 単位の標準ストレージによるものだが、GET リクエストからアクセスされているオブジェクトがほとんどないことが示されているバケット。
    recommendation_prerequisites: ''
    recommendation_type: Transition S3 Standard objects to Intelligent Tiering
    resource_type: S3 Bucket
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: バケットプレフィックスのコストは、ほぼすべてが GB あたりの標準ストレージ料金ですが、GET リクエストの状況を見ると、そのプレフィックス内のオブジェクトへのアクセスはほとんど行われていません。
    recommendation_prerequisites: '[Storage Management](https://www.datadoghq.com/product/storage-management)'
    recommendation_type: Transition S3 objects to Infrequent Access by Prefix
    resource_type: S3 Bucket
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: バケットプレフィックスには、より安価なストレージへ移行するためのライフサイクル移行ルールが設定されていない、古い
      Standard クラスのデータが含まれています。
    recommendation_prerequisites: '[Storage Management](https://www.datadoghq.com/product/storage-management)'
    recommendation_type: Transition old Standard-class data
    resource_type: S3 Bucket
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: 呼び出しがゼロの SageMaker エンドポイント。
    recommendation_prerequisites: ''
    recommendation_type: Delete Idle SageMaker Endpoint
    resource_type: SageMaker Endpoint
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: CPU およびメモリの使用量が、同一インスタンスファミリー内の次に小さいインスタンスのリソース範囲に収まる
      SageMaker リアルタイム推論エンドポイント。GPU またはアクセラレーターインスタンスを使用するエンドポイント、またはマネージドスケーリングを使用するエンドポイントは除外されます。
    recommendation_prerequisites: ''
    recommendation_type: Downsize SageMaker Endpoint
    resource_type: SageMaker Endpoint
  - category: Configure
    cloud_provider: AWS
    recommendation_description: トレーニングスクリプトがチェックポイントをサポートしている場合に、マネージドスポットトレーニングを使用してコストを削減できる
      SageMaker トレーニングジョブ。
    recommendation_prerequisites: ''
    recommendation_type: Enable SageMaker Managed Spot Training
    resource_type: SageMaker Training Job
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: 送信バイト数がゼロの NAT ゲートウェイ。
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused NAT Gateway
    resource_type: VPC NAT Gateway
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: NAT ゲートウェイを必要とするリソースは、同じアベイラビリティーゾーンにあるものを使用する必要があります。そうしないと、不要なゾーン間転送料金が発生する可能性があります。
    recommendation_prerequisites: ''
    recommendation_type: Reduce NAT Gateway Cross-Zone Transfers
    resource_type: VPC NAT Gateway
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: 同じ VPC 内のリソースは、NAT ゲートウェイを介した通信を避けるべきです。NAT ゲートウェイを介すと、不要な
      NAT ゲートウェイ処理料金が発生するためです。
    recommendation_prerequisites: '[NPM](/network_monitoring/performance/setup/)'
    recommendation_type: Reduce NAT Gateway Within-VPC Transfers
    resource_type: VPC NAT Gateway
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: CPU 使用率が 5% 未満の AKS クラスター。
    recommendation_prerequisites: ''
    recommendation_type: Delete AKS Cluster
    resource_type: AKS Cluster
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Azure Advisor が削除を推奨している、デプロイされたアプリがない App Service
      プラン。
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused App Service Plan
    resource_type: App Service Plan
  - category: Migrate
    cloud_provider: Azure
    recommendation_description: スナップショットは Premium ストレージに保存されています。Standard ストレージに移行すると、データの耐久性を変えずにコストを
      60% 削減できます。
    recommendation_prerequisites: ''
    recommendation_type: Migrate Disk Snapshot to Standard Storage
    resource_type: Managed Disk Snapshot
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Container App の最小レプリカ数が、必要以上に多く設定されています。
    recommendation_prerequisites: ''
    recommendation_type: Downsize Container App
    resource_type: Container App
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Azure Container App において、設定されたルックバック期間中にリクエストがありません。
    recommendation_prerequisites: ''
    recommendation_type: Scale to Zero Azure Container App Replicas
    resource_type: Container App
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: 正常なプルが一度も行われていないコンテナレジストリ。
    recommendation_prerequisites: ''
    recommendation_type: Delete Container Registry
    resource_type: Container Registry
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: クラスターが 60 日間以上停止している場合、未使用かつ停止中とみなされます。コスト削減のため、クラスターを削除することを推奨します。
    recommendation_prerequisites: ''
    recommendation_type: Terminate Unused Stopped Data Explorer Cluster
    resource_type: Data Explorer Cluster
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: 転送バイト数が 0 のロードバランサー。
    recommendation_prerequisites: ''
    recommendation_type: Delete Load Balancer
    resource_type: Load Balancer
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: マネージドディスクは接続されておらず、削除可能です。
    recommendation_prerequisites: ''
    recommendation_type: Delete Unattached Managed Disk
    resource_type: Managed Disk
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: 読み取り/書き込み操作が行われていないマネージドディスクで、削除可能です。
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused Managed Disk
    resource_type: Managed Disk
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: 設定されたプロビジョニング済み IOPS のしきい値を下回る使用量のマネージドディスク。
    recommendation_prerequisites: ''
    recommendation_type: Downsize Managed Disk IOPS
    resource_type: Managed Disk
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: 設定されたプロビジョニング済みスループットのしきい値を下回る使用量のマネージドディスク。
    recommendation_prerequisites: ''
    recommendation_type: Downsize Managed Disk Throughput
    resource_type: Managed Disk
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: 接続がなく、削除可能なデータベースサーバー。
    recommendation_prerequisites: ''
    recommendation_type: Delete Database for MySQL
    resource_type: MySQL Database
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: 接続がなく、削除可能な Azure Database for PostgreSQL サーバー。
    recommendation_prerequisites: ''
    recommendation_type: Delete Database for PostgreSQL
    resource_type: Database for PostgreSQL
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: get 操作または set 操作が行われていない Azure Managed Redis キャッシュ。
    recommendation_prerequisites: ''
    recommendation_type: Delete Azure Managed Redis
    resource_type: Azure Managed Redis
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: 接続の成功実績がなく、CPU 使用率も極めて低い、削除可能な SQL Server データベース。
    recommendation_prerequisites: ''
    recommendation_type: Delete SQL Server Database
    resource_type: SQL Server Database
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: DTU 使用率が低く、サイズダウン可能な SQL Server データベース。
    recommendation_prerequisites: ''
    recommendation_type: Downsize SQL Server Database DTU
    resource_type: SQL Server Database
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: プロビジョニングされたストレージ容量の 20% 未満しか使用していない SQL Server データベース。
    recommendation_prerequisites: ''
    recommendation_type: Downsize SQL Server Database Storage
    resource_type: SQL Server Database
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: 過去 14 日間、トランザクションがなく、使用容量がごくわずかなストレージアカウント。
    recommendation_prerequisites: ''
    recommendation_type: Delete Storage Account
    resource_type: Storage Account
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: ユーザー CPU 使用率が 5% 未満で、使用可能なメモリが 90% を超えている VM インスタンス。Datadog
      Agent がない場合、この推奨事項は Azure Monitor の CPU メトリクスを使用して生成されます。
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Delete Azure VM Instance
    resource_type: VM Instance
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: より小さいインスタンスタイプにサイズダウン可能な VM インスタンス。
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize Azure VM Instance
    resource_type: VM Instance
  - category: Migrate
    cloud_provider: Azure
    recommendation_description: より低価格な同等の Arm インスタンスタイプに移行可能な VM インスタンス。
    recommendation_prerequisites: ''
    recommendation_type: Migrate Azure VM Instance to Arm
    resource_type: VM Instance
  - category: Migrate
    cloud_provider: Azure
    recommendation_description: 推奨される最新の代替シリーズが存在する、レガシー世代シリーズで実行されている VM インスタンス。
    recommendation_prerequisites: ''
    recommendation_type: Upgrade Azure VM Instance
    resource_type: VM Instance
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: サイズダウン可能な、使用率の低い VM インスタンス。
    recommendation_prerequisites: ''
    recommendation_type: Downsize Azure VM Scale Set
    resource_type: VM Scale Set
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: シャットダウン可能な、使用率の低い VM インスタンス。
    recommendation_prerequisites: ''
    recommendation_type: Shutdown Azure VM Scale Set
    resource_type: VM Scale Set
  - category: Configure
    cloud_provider: Cursor
    recommendation_description: Auto Mode 以外のモデルで多額の利用コストが発生している Cursor シートを特定し、モデルの選択肢として
      Auto Mode の利用を推奨します。
    recommendation_prerequisites: ''
    recommendation_type: Enable Cursor Auto Mode
    resource_type: Cursor Seat
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: 過剰にプロビジョニングされた汎用 Databricks クラスターを特定し、コスト削減のために小さいインスタンスタイプへのサイズ適正化を提案します。
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks All-Purpose
    resource_type: Databricks Cluster
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: 過剰にプロビジョニングされた汎用 Databricks クラスターを特定し、コスト削減のために小さいインスタンスタイプへのサイズ適正化を提案します。
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks All-Purpose
    resource_type: Databricks Cluster
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: 過剰にプロビジョニングされた汎用 Databricks クラスターを特定し、コスト削減のために小さいインスタンスタイプへのサイズ適正化を提案します。
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks All-Purpose
    resource_type: Databricks Cluster
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: 過剰にプロビジョニングされた Databricks ジョブを特定し、コスト削減のために小さいインスタンスタイプへのサイズ適正化を提案します。
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks Job
    resource_type: Databricks Cluster
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: 過剰にプロビジョニングされた Databricks ジョブを特定し、コスト削減のために小さいインスタンスタイプへのサイズ適正化を提案します。
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks Job
    resource_type: Databricks Cluster
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: 過剰にプロビジョニングされた Databricks ジョブを特定し、コスト削減のために小さいインスタンスタイプへのサイズ適正化を提案します。
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks Job
    resource_type: Databricks Cluster
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: 未使用のコンピューティング IP アドレスは削除できます。
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused Compute IP Address
    resource_type: Compute Address
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: 接続されておらず、削除可能なコンピューティングディスク。
    recommendation_prerequisites: ''
    recommendation_type: Delete Unattached Compute Disk
    resource_type: Compute Disk
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: 未使用で削除可能なコンピューティングディスク。
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused Compute Disk
    resource_type: Compute Disk
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: 未使用のコンピュートグローバル IP アドレスは削除できます。
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused Compute Global IP Address
    resource_type: Compute Global Address
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: CPU 使用率が低く、メモリの空き容量が多く、ネットワークアクティビティが最小限のコンピューティングインスタンス。
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Delete Compute Instance
    resource_type: Compute Instance
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: CPU とメモリの使用率が低く、より小さいインスタンスタイプにサイズ変更できるコンピューティングインスタンス。
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize Compute Instance
    resource_type: Compute Instance
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: CPU とメモリの使用率が低く、スケーリング戦略を調整することでサイズを縮小できる、コンテナ化されていないワークロードを持つ
      Compute Instance Group。
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize Compute Instance Group
    resource_type: Compute Instance Group
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: インスタンスの最小容量を削減できる Compute Instance Group Autoscaler。
    recommendation_prerequisites: ''
    recommendation_type: Reduce Minimum Capacity
    resource_type: Compute Instance Group
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: 使用率が最小限で、削除できる Cloud SQL インスタンス。
    recommendation_prerequisites: ''
    recommendation_type: Delete Cloud SQL Instance
    resource_type: CloudSQL Instance
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: 過剰にプロビジョニングされており、サイズを縮小できる Cloud SQL インスタンス。
    recommendation_prerequisites: ''
    recommendation_type: Downsize CloudSQL Database
    resource_type: CloudSQL Instance
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: ライフサイクルルールを活用して、現在のバージョンではないオブジェクトを自動的に削除できる Cloud
      Storage バケット。
    recommendation_prerequisites: ''
    recommendation_type: Delete Noncurrent Cloud Storage Objects
    resource_type: Storage Bucket
  - category: Migrate
    cloud_provider: GCP
    recommendation_description: ストレージバケット内のオブジェクトは、より低コストなアーカイブ階層へ自動的に移行できます。
    recommendation_prerequisites: ''
    recommendation_type: Transition Cloud Storage Bucket to Autoclass
    resource_type: Storage Bucket
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: CPU またはメモリのクラスターアイドル状態が高い Kubernetes クラスター。
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Reduce Cluster Idle
    resource_type: Kubernetes Cluster
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: CPU またはメモリのクラスターアイドル状態が高い Kubernetes クラスター。
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Reduce Cluster Idle
    resource_type: Kubernetes Cluster
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: CPU またはメモリのクラスターアイドル状態が高い Kubernetes クラスター。
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Reduce Cluster Idle
    resource_type: Kubernetes Cluster
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Containers は要求した CPU またはメモリのごく一部しか使用していません。
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize Deployment
    resource_type: Kubernetes Deployment
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Containers は要求した CPU またはメモリのごく一部しか使用していません。
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize Deployment
    resource_type: Kubernetes Deployment
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: Containers は要求した CPU またはメモリのごく一部しか使用していません。
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize Deployment
    resource_type: Kubernetes Deployment
  - category: Configure
    cloud_provider: OpenAI
    recommendation_description: ターゲットのヒット率を下回るプロンプトキャッシングを使用している OpenAI API キーを特定し、入力トークンコストを削減するためにキャッシュ設定の改善を推奨します。
    recommendation_prerequisites: ''
    recommendation_type: Optimize Prompt Caching
    resource_type: API Key
  - category: Configure
    cloud_provider: OpenAI
    recommendation_description: 優先処理に多額のコストがかかっている OpenAI API キーを特定し、レイテンシーの影響を受けにくいトラフィックを標準へ移行することで、優先処理に伴う追加料金を削減するよう推奨します。
    recommendation_prerequisites: ''
    recommendation_type: Reduce OpenAI Priority Processing
    resource_type: API Key
  headers:
  - filter_by: true
    id: category
    name: 推奨カテゴリ
  - filter_by: true
    id: cloud_provider
    name: プロバイダー
  - filter_by: true
    id: resource_type
    name: リソースタイプ
  - id: recommendation_type
    name: 推奨タイプ
  - id: recommendation_description
    name: 推奨事項の説明
  - id: recommendation_prerequisites
    name: 推奨事項の前提条件
title: Cloud Cost 推奨事項
---
## 概要{#overview}

[Cloud Cost Recommendations][1] は、クラウドおよび AI リソースの使用状況や AI/LLM API の利用を最適化することで、クラウド支出および AI の支出を削減するための推奨事項を提供します。Datadog は、オブザーバビリティデータと基盤となるプロバイダーの課金データを組み合わせることで、孤立したリソース、レガシーリソース、過剰にプロビジョニングされたクラウドリソース、および最適化されていない AI 利用を特定し、一連の推奨事項を生成します。

推奨事項は毎日実行され、リリースされるとすぐにアカウント内で自動的に更新されます。

- **すべてのリソース**について、そのリソースの[クラウドコストメトリクス][6]も取得されます
- Kubernetes および EC2 以外のすべての**AWS リソース**については、[AWS CloudWatch][7] から AWS メトリクスも取得されます。

{{< img src="cloud_cost/recommendations/cost_recommendations_1.png" alt="Cloud Cost 推奨事項ページの、月間潜在節約額、年間潜在節約額、および未解決のケースの合計数を示す概要タブ" style="width:100%;" >}}

各推奨事項タイプの詳細なロジックと、このページに表示されるオブザーバビリティメトリクスやコストデータを確認できます。

推奨事項は [Tag Pipelines][11] をサポートしており、組織で標準化されたタグを使用して推奨事項をフィルタリング、グループ化、分析を行うことが可能です。Tag Pipelines で構成されたタグルールは、推奨事項に自動的に適用され、[正規化されます][12]。

また、Datadog MCP Server の [`cost_recommendations`][17] ツールを使用して、AI エージェントから推奨事項をクエリすることも可能です。

## 推奨事項のカテゴリ{#recommendation-categories}

利用可能な Cloud Cost 推奨事項カテゴリとその説明を以下に示します。

| 推奨事項カテゴリ| 説明|
|----------|-------------|
| 終了| リソースが未使用であるか、利用率が非常に低いことを示すシグナルがあるリソース。コストを削減するために、これらのリソースの終了または削除を検討してください。|
| 移行| 利用率が比較的低い、またはその他の非効率性が見られるリソース。インスタンスタイプやその他のパラメーターの調整を検討してください。|
| サイズ縮小| 利用率が低い、または過剰にプロビジョニングされているリソース。コストを削減するために、サイズやその他のパラメーターの調整を検討してください。|
| 購入| オンデマンド料金が適用され、長期間稼働しているリソース。リザーブドインスタンスまたは Savings Plan を購入することで、リソースの償却コストを削減できます。|
| 設定| 容量を変更したりリソースを終了したりすることなく、設定を調整することでコストを削減できるリソース。|

## 前提条件{#prerequisites}

Cloud Cost の推奨事項を受け取るには、以下の要件を満たす必要があります。

- プロバイダーアカウント (すべての Cloud Cost の推奨事項に必要)
- [AWS の統合とリソース収集][3] (AWS の推奨事項に必要)
- [Azure の統合とリソース収集][8] (Azure の推奨事項に必要)
- [GCP の統合とリソース収集[10] (GCP の推奨事項に必要)
- [Open AI の統合][18] (OpenAI の推奨事項に必要)
- [Anthropic の統合][19] (Anthropic の推奨事項に必要)
- [Datadog Agent の統合][5] (サイズ縮小に関する推奨事項に必要)

## セットアップ{#setup}

推奨事項を受け取りたい各クラウドアカウントについて、以下の設定を行います。

1. 請求データを Datadog に送信するように [Cloud Cost Management][2] を設定します。
   - Azure の場合、請求データを収集するにはアプリ登録方法を使用する必要があります。
1. 推奨事項のために[リソース収集][3]を有効にします。
   - AWS の場合は、[AWS 統合タイル][4]の [{{< ui >}}Resource Collection{{< /ui >}}] タブでリソース収集を有効にします。
   - Azure の場合は、適切な統合設定でリソース収集を有効にします。組織が Datadog US3 サイトにある場合、[Azure Native Integration][9] により、メトリクス収集を通じてこれが自動的に有効になります。その他のすべてのサイトでは、[Azure 統合タイル][8]内でリソース収集を有効にする必要があります。
   - GCP の場合は、[Google Cloud Platform 統合タイル][10]の [{{< ui >}}Resource Collection{{< /ui >}}] タブでリソース収集を有効にします。
1. [Datadog Agent][5]をインストールします (サイズ縮小の推奨事項には必須です)。

**注**: Cloud Cost Recommendations は、米ドル (USD) 以外の通貨での請求にも対応しています。

## リスクと作業レベル{#risk-and-level-of-effort}

各推奨事項には、どの推奨事項に優先的に取り組むべきかを判断するのに役立つ**リスク**スコアと**作業レベル**スコアが含まれています。どちらのスコアも、{{< ui >}}Low{{< /ui >}}、{{< ui >}}Medium{{< /ui >}}、{{< ui >}}High{{< /ui >}} のスケールを使用します。これらは {{< ui >}}Active Recommendations{{< /ui >}} テーブルおよび各推奨事項のサイドパネルに表示される [{{< ui >}}Risk{{< /ui >}}] 列と [{{< ui >}}Effort{{< /ui >}}] 列に表示されます。

| リスク| 説明|
|--------|-------------|
| {{< ui >}}Low{{< /ui >}} | 安全かつ容易に元に戻せる: データが失われるリスクがない (または完全に復元可能)、リソースの再作成が容易、影響範囲が限定的、実行時への影響がない。|
| {{< ui >}}Medium{{< /ui >}} | 復元可能だが作業を要する: スナップショットや再プロビジョニングによるデータやリソースの復元が可能、影響範囲が単一のアプリケーションやワークロードに限定される、サービスの中断が短時間で済む。|
| {{< ui >}}High{{< /ui >}} | 元に戻すのが困難、または誤った場合のインパクトが大きい: 不可逆的なデータの損失、再作成不可能なリソース、広範囲に及ぶ影響、稼働中のワークロードにおけるダウンタイムの発生の可能性。|


| 作業レベル| 説明|
|--------|-------------|
| {{< ui >}}Low{{< /ui >}} | 数分で完了する迅速な変更。通常はコンソールでの設定切り替えや API 呼び出しのみで、完全に自動化可能です。|
| {{< ui >}}Medium{{< /ui >}} | 数時間から数日かかる中程度の作業。スクリプト作成、テスト、または他のチームとの調整が必要です。|
| {{< ui >}}High{{< /ui >}} | 数週間を要する大規模な作業。アーキテクチャの変更や、複数のチーム間での調整を伴います。|

[{{< ui >}}Risk{{< /ui >}}] 列と [{{< ui >}}Effort{{< /ui >}}] 列を使用して、リスクが低い、労力が少ない、またはその両方である推奨事項を優先して作業します。

## 推奨事項のステータス{#recommendation-statuses}

各推奨事項にステータスを割り当てることで、チーム全体でのコスト最適化の進捗状況を追跡できます。推奨事項は毎日再生成されますが、ステータスは保持されます。それで、同じ推奨事項を再度トリアージする必要はありません。

| ステータス| 説明|
|--------|-------------|
| {{< ui >}}Open{{< /ui >}} | (デフォルト) 推奨事項はまだトリアージされていません。|
| {{< ui >}}In Progress{{< /ui >}} | この推奨事項に対処するための作業が進行中です。|
| {{< ui >}}Completed{{< /ui >}} | 推奨されたアクションが実行済みであるか、または関連性がなくなりました。|
| {{< ui >}}Dismissed{{< /ui >}} | この推奨事項については、除外する際に指定した期間中、作業は計画されていません。|

### ステータス別に推奨事項をフィルタリングする{#filter-recommendations-by-status}

[{{< ui >}}Cloud Cost Recommendations{{< /ui >}}][1] ページの上部にある [ステータス] タブを使用して、リストをステータス別にフィルタリングできます。利用可能なタブは、{{< ui >}}Open{{< /ui >}}、{{< ui >}}In Progress{{< /ui >}}、{{< ui >}}Completed{{< /ui >}}、および {{< ui >}}Dismissed{{< /ui >}} です。各タブには、そのステータスの推奨事項による推定削減額の合計が表示されます。

### ステータス別に削減額を追跡する{#track-savings-by-status}

各ステータスタブには、そのステータスの推奨事項による推定削減額の合計が表示されます。

- {{< ui >}}Open{{< /ui >}}: トリアージされていない推奨事項による潜在的な削減額。
- {{< ui >}}In Progress{{< /ui >}}: 作業が進行中の推奨事項による推定削減額。
- {{< ui >}}Completed{{< /ui >}}: 推奨アクションが実行されたことによる実現済みの削減額。
- {{< ui >}}Dismissed{{< /ui >}}: 除外された推奨事項による推定削減額。

### 推奨事項のステータスを変更する{#change-a-recommendation-status}

推奨事項のステータスは、次の 3 つの方法で変更できます。

- **一括更新**: [{{< ui >}}Active Recommendations{{< /ui >}}] で 1 つ以上の推奨事項を選択し、テーブル上部のツールバーからステータスを選択して、選択したすべての推奨事項に適用します。
- **テーブルから**: [{{< ui >}}Status{{< /ui >}}] 列のステータスドロップダウンを使用して、推奨事項のリストから直接新しいステータスを選択します。
- **サイドパネルから**: 推奨事項をクリックしてサイドパネルを開き、ステータスドロップダウンを使用して新しいステータスを選択します。

## 推奨事項のアクション{#recommendation-action-taking}
推奨事項に基づいてアクションを実行することで、コストの削減や最適化を行うことができます。Cloud Cost Recommendations は、Jira、1-click Workflow Automation、および Datadog Work Management に対応しています。未使用の EBS および GP2 EBS ボリュームに関する推奨事項についても、1-click Workflow Automation をサポートしています。各アクション実行オプションの詳細は以下のとおりです。

- **Jira**: 推奨事項のサイドパネルから直接、または {{< ui >}}Active Recommendations{{< /ui >}} リストで複数の推奨事項を選択して [{{< ui >}}Create Jira issue{{< /ui >}}] をクリックすることで、Jira Issue を作成できます。作成された Issue にはタグが付けられ、Datadog 上の該当する推奨事項へのリンクが含まれます。

  Jira のステータスで推奨事項をフィルタリングするには、以下のクエリオプションを使用します。
  - `@jira_issues.issue_key:*` – Jira Issue に関連付けられた推奨事項のみを表示
  - `-@jira_issues.issue_key:*` – Jira Issue に関連付けられていない推奨事項のみを表示
  - `jira_issues.issue_key:ABC*` – 特定の Jira プロジェクトのプレフィックスでフィルタリング

- **[Bits Code][14] によるコード修正**: 該当する S3 および DynamoDB の推奨事項、および Downsize Kubernetes Deployment 推奨事項に対して、コード修正機能が利用可能です。これらの状況において、Bits Code は、Terraform や Helm チャートを用いてクラウドリソースの変更やコスト最適化を実装するための、本番環境への適用が可能なプルリクエストを生成します。この機能を利用するには、[Bits Code][13] を設定する必要があります。
- **1-click Workflow Automation actions**: 一部の推奨事項に対してアクション機能が利用可能です。ユーザーは [{{< ui >}}Delete EBS Volume{{< /ui >}}] をクリックするなどの推奨アクションを Cloud Cost Management 内で直接実行できます。
- **[Cost Optimization Automations][15]**: 推奨事項に基づいた処理を、定期的なスケジュールで継続的に実行する自動化設定が可能です。自動化の対象範囲は特定のアカウント、リージョン、タグに限定でき、アクション前のスナップショット作成や、Slack または Microsoft Teams 経由での (オプションの) 承認プロセスといった安全策も組み込まれています。
- **[Notifications][16]**: アクションを実行せずに、一致する推奨事項の定期的な Slack 要約を送信する Notifications ルールを設定できます。
- **Datadog Case Management**: ユーザーは推奨事項サイドパネルに移動し、[{{< ui >}}Create Case{{< /ui >}}] をクリックして、推奨事項を管理およびアクションを実行するためのケースを作成できます。
- **除外**: 推奨事項サイドパネルで [{{< ui >}}Dismiss{{< /ui >}}] を使用すると、指定した期間にわたって推奨事項を非表示にし、その理由を記録できます。除外された推奨事項は [{{< ui >}}Dismissed{{< /ui >}}] タブに移動します。

## 推奨事項とリソースの説明{#recommendation-and-resource-descriptions}

{{< multifilter-search >}}

## 関連資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/recommendations
[2]: /ja/cloud_cost_management/setup/aws/#setup
[3]: /ja/integrations/amazon_web_services/#resource-collection
[4]: https://app.datadoghq.com/integrations/aws
[5]: /ja/agent/
[6]: /ja/cloud_cost_management/container_cost_allocation/?tab=aws#cost-metrics
[7]: /ja/integrations/amazon_s3_storage_lens/
[8]: https://app.datadoghq.com/integrations/azure
[9]: /ja/integrations/azure/
[10]: https://app.datadoghq.com/integrations/gcp
[11]: /ja/cloud_cost_management/allocation/tag_pipelines/
[12]: /ja/cloud_cost_management/tags/#how-tags-are-normalized
[13]: /ja/bits_ai/bits_code/setup
[14]: /ja/bits_ai/bits_code/
[15]: /ja/cloud_cost_management/recommendations/cost_optimization_automation/
[16]: /ja/cloud_cost_management/recommendations/notifications/
[17]: /ja/mcp_server/tools/#cost_recommendations
[18]: /ja/cloud_cost_management/setup/saas_costs/?tab=openai#configure-your-saas-accounts
[19]: /ja/cloud_cost_management/setup/saas_costs/?tab=anthropic#configure-your-saas-accounts