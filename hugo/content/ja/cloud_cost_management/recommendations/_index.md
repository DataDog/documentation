---
algolia:
  tags:
  - cloud cost recommendations
  - cloud cost recommendation
  - cost recommendations
  - cost recommendation
  - cloud resources
  - cloud resource
aliases:
- /ja/cloud_cost_management/recommendations/savings
description: Cost Recommendations を使用して、組織のクラウドリソースにかかる支出を削減する方法を学びましょう。
further_reading:
- link: /cloud_cost_management/
  tag: ドキュメント
  text: Cloud Cost Management について
- link: /integrations/guide/aws-integration-and-cloudwatch-faq/
  tag: ドキュメント
  text: AWS インテグレーションと CloudWatch の FAQ
- link: https://www.datadoghq.com/blog/finops-at-datadog/
  tag: ブログ
  text: Datadog で成功した FinOps プラクティスをどのように構築したか
- link: https://www.datadoghq.com/blog/cloud-cost-recommendations/
  tag: ブログ
  text: Cloud Cost Recommendations を活用して、AWS、Azure、および Google Cloud 全体においてクラウドの無駄を排除する
multifiltersearch:
  data:
  - category: Configure
    cloud_provider: Anthropic
    recommendation_description: プロンプトキャッシングを使用していない Anthropic API キーを特定し、入力トークンコストを削減するためにプロンプトキャッシングを有効にすることを推奨します。
    recommendation_prerequisites: '[Anthropic integration](/integrations/anthropic/)'
    recommendation_type: Enable Anthropic Prompt Caching
    resource_type: Anthropic API Key
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: 旧世代インスタンスタイプを含むオートスケーリンググループ。
    recommendation_prerequisites: ''
    recommendation_type: Migrate ASG Legacy Instances
    resource_type: Auto Scaling Group
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: 削減可能なインスタンスの最小容量を持つオートスケーリンググループ。
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Reduce Minimum Capacity
    resource_type: Auto Scaling Group
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: コスト削減のために削除できる有料イベントを含む CloudTrail トレイル。
    recommendation_prerequisites: ''
    recommendation_type: Delete unnecessary CloudTrail trails
    resource_type: CloudTrail Trail
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: DynamoDB テーブルのグローバルセカンダリインデックス (GSI) で読み取り消費量 0。
    recommendation_prerequisites: ''
    recommendation_type: Delete DynamoDB Global Secondary Index
    resource_type: DynamoDB Table
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: 読み取り消費量 0、非レプリカ書き込み消費量 0 の DynamoDB テーブル。
    recommendation_prerequisites: ''
    recommendation_type: Delete DynamoDB Table
    resource_type: DynamoDB Table
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: 2 つ以上のオンデマンドバックアップに課金が発生している DynamoDB テーブル。
    recommendation_prerequisites: ''
    recommendation_type: Delete Extra On-Demand Backups
    resource_type: DynamoDB Table
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: 全稼働時間の 80% を超える期間にわたって、読み取りおよび書き込みキャパシティの 80% 未満しか使用していないプロビジョニング済み
      DynamoDB テーブル。
    recommendation_prerequisites: ''
    recommendation_type: Downsize DynamoDB Capacity
    resource_type: DynamoDB Table
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: IA テーブルクラスへの移行により、ストレージレートでより多くのコスト削減が可能となり、キャパシティレートの追加コストを上回る場合。
    recommendation_prerequisites: ''
    recommendation_type: Migrate DynamoDB to Infrequent Access Table Class
    resource_type: DynamoDB Table
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: 過去 2 週間の間に、1 時間あたりの読み取りおよび書き込みキャパシティ消費率が少なくとも一度 18%
      未満になったプロビジョニング済み DynamoDB テーブル。
    recommendation_prerequisites: ''
    recommendation_type: Migrate DynamoDB to On-Demand Capacity Mode
    resource_type: DynamoDB Table
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: オンデマンド DynamoDB テーブルで、1 時間あたりの読み取りおよび書き込みキャパシティ消費率が常に
      18% を超えているもの。
    recommendation_prerequisites: ''
    recommendation_type: Migrate DynamoDB to Provisioned Capacity Mode
    resource_type: DynamoDB Table
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: 標準テーブルクラスへの移行により、ストレージレートに対する追加コストに比してキャパシティレートの削減が可能、あるいは標準テーブルクラスの無料枠ストレージを利用可能。
    recommendation_prerequisites: ''
    recommendation_type: Migrate DynamoDB to Standard Table Class
    resource_type: DynamoDB Table
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: 少なくとも 90 日以上経過していて削除可能な EBS スナップショット。
    recommendation_prerequisites: ''
    recommendation_type: Delete Old EBS Snapshots
    resource_type: EBS Snapshot
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: 読み取りおよび書き込みでプロビジョニングされた IOPS の 80% 未満しか使用していない EBS
      ボリューム。
    recommendation_prerequisites: '[Amazon EC2 integration](/integrations/amazon_ec2/)'
    recommendation_type: Downsize EBS Volume Provisioned IOPS
    resource_type: EBS Volume
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: 読み取りおよび書き込みでプロビジョニングされたスループットの構成しきい値未満しか使用していない EBS
      ボリューム。
    recommendation_prerequisites: '[Amazon EC2 integration](/integrations/amazon_ec2/)'
    recommendation_type: Downsize EBS Volume Provisioned Throughput
    resource_type: EBS Volume
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: ストレージ容量の 20% 未満しか使用していない EBS ボリューム。
    recommendation_prerequisites: '[Amazon EC2 integration](/integrations/amazon_ec2/)'
    recommendation_type: Downsize EBS Volume Storage Capacity
    resource_type: EBS Volume
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: コスト削減とパフォーマンス向上のために GP3 にアップグレードできる GP2 の EBS ボリューム。
    recommendation_prerequisites: ''
    recommendation_type: Migrate EBS Volume from GP2 to GP3
    resource_type: EBS Volume
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: コスト削減とパフォーマンス向上のために GP3 にアップグレードできる IO1 の EBS ボリューム。
    recommendation_prerequisites: ''
    recommendation_type: Migrate EBS Volume from IO1 to GP3
    resource_type: EBS Volume
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: EC2 インスタンスに接続されていないボリューム。
    recommendation_prerequisites: ''
    recommendation_type: Terminate Unattached EBS Volume
    resource_type: EBS Volume
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: 読み取りまたは書き込みアクティビティがないボリューム。
    recommendation_prerequisites: ''
    recommendation_type: Terminate Unused EBS Volume
    resource_type: EBS Volume
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: AWS コストと使用状況レポートでアイドル料金が発生している Elastic IP アドレス。
    recommendation_prerequisites: ''
    recommendation_type: Delete Idle Elastic IP
    resource_type: Elastic IP
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: ファミリー内で次に小さいインスタンスが持つ利用可能なリソース未満の CPU およびメモリ使用率の EC2
      インスタンス。この推奨事項は、Datadog Agent を使用することなく CloudWatch メトリクスを使用して生成されます。
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize EC2 Instance
    resource_type: EC2 Instance
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: 新しいインスタンスタイプにアップグレードできる旧世代の EC2 インスタンス。
    recommendation_prerequisites: ''
    recommendation_type: Migrate EC2 Instance
    resource_type: EC2 Instance
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: 同等の Graviton インスタンスタイプに移行できる EC2 インスタンス。
    recommendation_prerequisites: ''
    recommendation_type: Migrate EC2 Instance to Graviton Type
    resource_type: EC2 Instance
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: カスタマイズ可能なしきい値未満の CPU およびメモリ使用率の EC2 インスタンス。この推奨事項は、Datadog
      Agent を使用することなく CloudWatch メトリクスを使用して生成されます。
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Terminate EC2 Instance
    resource_type: EC2 Instance
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: ノードが正常に機能していないことを示す、保留状態にある Kubernetes ノードをホストしている
      EC2 インスタンス。
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Terminate EC2 Instance with Stuck Node
    resource_type: EC2 Instance
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: コスト削減のために削除できるプルアクティビティがない ECR リポジトリ。
    recommendation_prerequisites: ''
    recommendation_type: Delete ECR Repository
    resource_type: ECR Repository
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: リクエストされた CPU またはメモリの 50% 未満を使用している ECS タスク。
    recommendation_prerequisites: '[Container Monitoring](/containers/)'
    recommendation_type: Downsize ECS Task Size
    resource_type: ECS Task Definition
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: キャッシュヒットがなくレプリケーションもない ElastiCache Redis クラスター、またはキャッシュヒットがない
      Memcached クラスター。
    recommendation_prerequisites: ''
    recommendation_type: Terminate ElastiCache Cluster
    resource_type: ElastiCache Cluster
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: リクエストアクティビティがない OpenSearch ドメイン。
    recommendation_prerequisites: ''
    recommendation_type: Delete OpenSearch Domain
    resource_type: OpenSearch Domain
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: EC2 インスタンスに接続されていない、アクティブな接続のない Classic Elastic Load
      Balancer。
    recommendation_prerequisites: ''
    recommendation_type: Terminate Classic Load Balancer
    resource_type: Classic Load Balancer
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: 処理中のトラフィックがない Application Load Balancer。
    recommendation_prerequisites: ''
    recommendation_type: Terminate Application Load Balancer
    resource_type: Load Balancer
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: 処理バイト数 0 のネットワークロードバランサー。
    recommendation_prerequisites: ''
    recommendation_type: Terminate Network Load Balancer
    resource_type: Load Balancer
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: 過剰に割り当てられたプロビジョニング済みの同時実行数を持つ AWS Lambda 関数。
    recommendation_prerequisites: ''
    recommendation_type: Downsize Lambda Provisioned Concurrency
    resource_type: Lambda
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Lambda CloudWatch Logs の書き込み権限を削除して、不要なログ記録を防止します。
    recommendation_prerequisites: ''
    recommendation_type: Delete Lambda CloudWatch Logs and write permissions
    resource_type: CloudWatch Log Group
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: 適切な保持ポリシーを設定することで、CloudWatch Logs のストレージコストを削減します。
    recommendation_prerequisites: ''
    recommendation_type: Set CloudWatch Logs Retention Policy
    resource_type: CloudWatch Log Group
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: 接続数 0 の MQ ブローカー。
    recommendation_prerequisites: ''
    recommendation_type: Terminate MQ Broker
    resource_type: MQ Broker
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: 過去 2 週間でプロビジョニングされた IOPS の 80% 未満を使用している RDS インスタンス。
    recommendation_prerequisites: ''
    recommendation_type: Downsize RDS Instance Provisioned IOPS
    resource_type: RDS Instance
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: 既にサポートが終了したエンジンバージョンで動作しており、[延長サポート料金](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/extended-support-charges.html)
      が発生している RDS。
    recommendation_prerequisites: ''
    recommendation_type: Migrate RDS Instance Engine
    resource_type: RDS Instance
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: 同等の Graviton インスタンスタイプに移行できる RDS インスタンス。
    recommendation_prerequisites: ''
    recommendation_type: Migrate RDS Instance to Graviton
    resource_type: RDS Instance
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: データベース接続が 0、レプリカラグが 0 の RDS インスタンス。
    recommendation_prerequisites: ''
    recommendation_type: Terminate Unused RDS Instance
    resource_type: RDS Instance
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: データベース接続数 0 の Redshift クラスター。
    recommendation_prerequisites: ''
    recommendation_type: Terminate Redshift Cluster
    resource_type: Redshift Cluster
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: バージョニングが有効なバケットは、古いオブジェクトバージョンによるストレージコストが大きくなります。
    recommendation_prerequisites: '[Storage Management](https://www.datadoghq.com/product/storage-management)'
    recommendation_type: Clean up old versions to reduce storage costs
    resource_type: S3 Bucket
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: 標準的な S3 バケットで、非最新バージョン有効期限ライフサイクルがなく、Web サイト配信もしていない場合、30
      日以上前の非最新バージョンストレージバイトが存在します。
    recommendation_prerequisites: '[Storage Lens](/integrations/amazon_s3_storage_lens/)'
    recommendation_type: Delete S3 noncurrent version objects
    resource_type: S3 Bucket
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: 7 日以上前の未完了のマルチパートアップロードを持ち、ストレージスペースを消費している S3 バケット。
    recommendation_prerequisites: '[Storage Lens](/integrations/amazon_s3_storage_lens/)'
    recommendation_type: Delete abandoned S3 multipart uploads
    resource_type: S3 Bucket
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: バケットには頻繁にアクセスされないストレージクラスに小さなファイルが多く含まれ、最小請求サイズが原因でストレージコストが増加します。
    recommendation_prerequisites: ''
    recommendation_type: Reduce small file count to reduce storage costs
    resource_type: S3 Bucket
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: GET または PUT リクエストがなく、ストレージコストが最小限の S3 バケット。
    recommendation_prerequisites: ''
    recommendation_type: Terminate S3 Bucket
    resource_type: S3 Bucket
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: バケットには大きな早期削除料金があります。
    recommendation_prerequisites: ''
    recommendation_type: Transition S3 IA and Glacier objects to Intelligent-Tiering
    resource_type: S3 Bucket
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: ほぼすべてが GB 単位の標準ストレージ料金に由来するものの、GET リクエスト数の少なさは実際にはアクセスされるオブジェクトがごくわずかであることを示しているバケットのコスト。
    recommendation_prerequisites: ''
    recommendation_type: Transition S3 Standard objects to Intelligent Tiering
    resource_type: S3 Bucket
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: ほぼすべてが GB 単位の標準ストレージ料金に由来するものの、GET リクエスト数の少なさは実際にはアクセスされるプレフィックスのオブジェクトがごくわずかであることを示しているバケットプレフィックスのコスト。
    recommendation_prerequisites: '[Storage Management](https://www.datadoghq.com/product/storage-management)'
    recommendation_type: Transition S3 objects to Infrequent Access by Prefix
    resource_type: S3 Bucket
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: NAT ゲートウェイが必要なリソースは、同じアベイラビリティゾーン内のものを使用することで、不要なクロスゾーン転送料金を回避できます。
    recommendation_prerequisites: ''
    recommendation_type: Reduce NAT Gateway Cross-Zone Transfers
    resource_type: VPC NAT Gateway
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: 同一 VPC 内のリソース間通信で NAT ゲートウェイを介さないようにすることで、不要な NAT
      ゲートウェイ処理料金を回避できます。
    recommendation_prerequisites: '[NPM](/network_monitoring/performance/setup/)'
    recommendation_type: Reduce NAT Gateway Within-VPC Transfers
    resource_type: VPC NAT Gateway
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: 送信バイト数がない NAT ゲートウェイ。
    recommendation_prerequisites: ''
    recommendation_type: Terminate NAT Gateway
    resource_type: VPC NAT Gateway
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: CPU 使用率が 5% 未満の AKS クラスター。
    recommendation_prerequisites: ''
    recommendation_type: Terminate AKS Cluster
    resource_type: AKS Cluster
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: コンテナアプリの最小レプリカ数が必要以上に設定されています。
    recommendation_prerequisites: ''
    recommendation_type: Downsize Container App
    resource_type: Container App
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: 転送されたバイト数が 0 のロードバランサー。
    recommendation_prerequisites: ''
    recommendation_type: Delete Load Balancer
    resource_type: Load Balancer
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: マネージドディスクが未接続で、削除可能です。
    recommendation_prerequisites: ''
    recommendation_type: Delete Unattached Managed Disk
    resource_type: Managed Disk
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: 読み取り / 書き込み操作がなく削除可能マネージドディスク。
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused Managed Disk
    resource_type: Managed Disk
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: 構成されたプロビジョニング済み IOPS のしきい値未満を使用しているマネージドディスク。
    recommendation_prerequisites: ''
    recommendation_type: Downsize Managed Disk IOPS
    resource_type: Managed Disk
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: 構成されたプロビジョニング済みスループットのしきい値未満を使用しているマネージドディスク。
    recommendation_prerequisites: ''
    recommendation_type: Downsize Managed Disk Throughput
    resource_type: Managed Disk
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: 終了可能なコネクションがないデータベースサーバー。
    recommendation_prerequisites: ''
    recommendation_type: Terminate Database for MySQL
    resource_type: MySQL Database
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: 終了可能なコネクションがない SQL サーバー。
    recommendation_prerequisites: ''
    recommendation_type: Terminate SQL Server
    resource_type: SQL Server
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: サイズを縮小できる DTU 使用率が低い SQL サーバーデータベース。
    recommendation_prerequisites: ''
    recommendation_type: Downsize SQL Server Database DTU
    resource_type: SQL Server Database
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: 成功したコネクションがなく CPU 使用率が非常に低い終了可能な SQL サーバーデータベース。
    recommendation_prerequisites: ''
    recommendation_type: Terminate SQL Server Database
    resource_type: SQL Server Database
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: 小さいインスタンスタイプにサイズを縮小できる VM インスタンス。
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize Azure VM Instance
    resource_type: VM Instance
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: ユーザー CPU が 5% 未満で使用可能なメモリが 90% 以上の VM インスタンス。
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Terminate Azure VM Instance
    resource_type: VM Instance
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: 過剰にプロビジョニングされた汎用 Databricks クラスターを特定し、コスト削減のために小さいインスタンスタイプへのサイズ変更を提案します。
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks All-Purpose
    resource_type: Databricks Cluster
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: 過剰にプロビジョニングされた汎用 Databricks クラスターを特定し、コスト削減のために小さいインスタンスタイプへのサイズ変更を提案します。
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks All-Purpose
    resource_type: Databricks Cluster
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: 過剰にプロビジョニングされた汎用 Databricks クラスターを特定し、コスト削減のために小さいインスタンスタイプへのサイズ変更を提案します。
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks All-Purpose
    resource_type: Databricks Cluster
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: 過剰にプロビジョニングされた Databricks ジョブを特定し、コスト削減のために小さいインスタンスタイプへのサイズ変更を提案します。
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks Job
    resource_type: Databricks Cluster
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: 過剰にプロビジョニングされた Databricks ジョブを特定し、コスト削減のために小さいインスタンスタイプへのサイズ変更を提案します。
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks Job
    resource_type: Databricks Cluster
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: 過剰にプロビジョニングされた Databricks ジョブを特定し、コスト削減のために小さいインスタンスタイプへのサイズ変更を提案します。
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks Job
    resource_type: Databricks Cluster
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: 未使用のコンピュート IP アドレスは削除できます。
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused Compute IP Address
    resource_type: Compute Address
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: 未接続かつ削除可能なコンピュートディスク。
    recommendation_prerequisites: ''
    recommendation_type: Delete Unattached Compute Disk
    resource_type: Compute Disk
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: 未使用かつ削除可能なコンピュートディスク。
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused Compute Disk
    resource_type: Compute Disk
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: 未使用のコンピュートグローバル IP アドレスは削除できます。
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused Compute Global IP Address
    resource_type: Compute Global Address
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: 小さいインスタンスタイプにサイズを縮小できる、CPU とメモリの使用率が低いコンピュートインスタンス。
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize Compute Instance
    resource_type: Compute Instance
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: CPU 使用率が低く、利用可能なメモリが高く、ネットワークアクティビティが最小限のコンピュートインスタンス。
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Terminate Compute Instance
    resource_type: Compute Instance
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: 削減可能なインスタンスの最小容量を持つコンピュートインスタンスグループオートスケーラー。
    recommendation_prerequisites: ''
    recommendation_type: Reduce Minimum Capacity
    resource_type: Compute Instance Group
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: 過剰にプロビジョニングされ、サイズを縮小できる CloudSQL インスタンス。
    recommendation_prerequisites: ''
    recommendation_type: Downsize CloudSQL Database
    resource_type: CloudSQL Instance
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: 使用率が最小限で終了可能な CloudSQL インスタンス。
    recommendation_prerequisites: ''
    recommendation_type: Terminate CloudSQL Instance
    resource_type: CloudSQL Instance
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: ライフサイクルルールの恩恵を受けて非現行オブジェクトバージョンを自動的に削除する Cloud Storage
      バケット。
    recommendation_prerequisites: ''
    recommendation_type: Delete Noncurrent Cloud Storage Objects
    resource_type: Storage Bucket
  - category: Migrate
    cloud_provider: GCP
    recommendation_description: ストレージバケット内のオブジェクトは、より良い料金のために自動的にアーカイブ層に移行できます。
    recommendation_prerequisites: ''
    recommendation_type: Transition Cloud Storage Bucket to Autoclass
    resource_type: Storage Bucket
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: CPU が高いまたはメモリクラスターがアイドル状態の Kubernetes クラスター。
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Reduce Cluster Idle
    resource_type: Kubernetes Cluster
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: CPU が高いまたはメモリクラスターがアイドル状態の Kubernetes クラスター。
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Reduce Cluster Idle
    resource_type: Kubernetes Cluster
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: CPU が高いまたはメモリクラスターがアイドル状態の Kubernetes クラスター。
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Reduce Cluster Idle
    resource_type: Kubernetes Cluster
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: コンテナは、リクエストされた CPU またはメモリのほんの一部しか使用していません。
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize Deployment
    resource_type: Kubernetes Deployment
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: コンテナは、リクエストされた CPU またはメモリのほんの一部しか使用していません。
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize Deployment
    resource_type: Kubernetes Deployment
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: コンテナは、リクエストされた CPU またはメモリのほんの一部しか使用していません。
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize Deployment
    resource_type: Kubernetes Deployment
  headers:
  - filter_by: true
    id: category
    name: 推奨事項カテゴリー
  - filter_by: true
    id: cloud_provider
    name: クラウドプロバイダー
  - filter_by: true
    id: resource_type
    name: リソースタイプ
  - id: recommendation_type
    name: 推奨事項タイプ
  - id: recommendation_description
    name: 推奨事項の説明
  - id: recommendation_prerequisites
    name: 推奨事項の前提条件
title: Cloud Cost Recommendations
---
## 概要 {#overview}

[Cloud Cost Recommendations][1] は、クラウドリソースの使用を最適化することでクラウド支出を削減するための提案を提供します。Datadog は、監視可能性データと基盤となるクラウドプロバイダーの課金データを組み合わせて、孤立したクラウドリソース、旧世代クラウドリソース、または過剰プロビジョニングされたクラウドリソースを特定し、一連の推奨事項を生成します。

推奨事項は毎日実行され、推奨事項がリリースされるとすぐにアカウントで自動的に更新されます。

- **すべてのリソース**に対しては、そのリソースに対する[クラウドコストメトリクス][6]も取得されます
- Kubernetes と EC2 以外のすべての **AWS リソース**については、[AWS CloudWatch][7] から AWS メトリクスも取得されます

{{< img src="cloud_cost/recommendations/cost_recommendations_1.png" alt="Cloud Cost Recommendations ページで、毎月の潜在的な節約額、年間の潜在的な節約額、およびオープンケースの合計数を示す概要タブ" style="width:100%;" >}}

このページでは、各推奨事項タイプに関する詳細なロジックや、監視可能性メトリクス、コストデータを確認することができます。

推奨事項は[タグパイプライン][11]をサポートしており、組織の標準化されたタグを使用して推奨事項をフィルタリング、グループ化、および分析できます。タグパイプラインで構成されたタグルールは、推奨事項に自動的に適用され、[正規化されます][12]。

## 推奨事項カテゴリー {#recommendation-categories}

以下に、利用可能なクラウドコスト推奨事項カテゴリーとその説明を示します。

| 推奨事項カテゴリー | 説明 |
|----------|-------------|
| 終了 | 未使用または非常に低い利用率のシグナルを持つリソース。これらのリソースを終了または削除してコストを削減することを検討してください。|
| 移行 | 通常よりも低い利用率のシグナルやその他の非効率性を持つリソース。インスタンスタイプやその他のパラメーターを調整することを検討してください。|
| ダウンサイジング | 過小利用または過剰にプロビジョニングされたリソース。コストを削減するためにサイズやその他のパラメーターを調整することを検討してください。|
| 購入 | オンデマンド料金と延長アップタイムのあるリソース。予約または節約プランを購入することで、リソースの減価償却コストを削減できます。|
| 構成 | 容量を変更したりリソースを終了したりせずにコストを削減するために調整可能な構成オプションのリソース。|

## 前提条件 {#prerequisites}

以下は、Cloud Cost の推奨事項を受け取るために必要な要件です。

- クラウドプロバイダーアカウント (希望するすべての Cloud Cost 推奨事項に適用)
- [AWS インテグレーションおよびリソース収集][3] (AWS 推奨事項に適用)
- [Azure インテグレーションおよびリソース収集][8] (Azure 推奨事項に適用)
- [GCP インテグレーションおよびリソース収集][10] (GCP 推奨事項に適用)
- [Datadog Agent インテグレーション][5] (ダウンサイジング推奨事項に適用)

## セットアップ {#setup}

推奨事項を受け取りたい各クラウドアカウントに対して:

1. [Cloud Cost Management][2] を構成して、課金データを Datadog に送信します。
   - Azure の場合、課金データを収集するには App Registration メソッドを使用する必要があります。
1. 推奨事項の[リソース収集][3]を有効にします。
   - AWS の場合、[AWS インテグレーションタイル][4]の {{< ui >}}Resource Collection{{< /ui >}} タブでリソース収集を有効にします。
   - Azure の場合、適切なインテグレーションでリソース収集を有効にします。組織が Datadog US3 サイトにある場合、[Azure Native インテグレーション][9]はメトリクス収集を通じてこれを自動的に有効にします。他のすべてのサイトでは、[Azure インテグレーションタイル][8]内でリソース収集を有効にする必要があります。
   - GCP の場合、[Google Cloud Platform インテグレーションタイル][10]の {{< ui >}}Resource Collection{{< /ui >}} タブでリソース収集を有効にします。
1. [Datadog Agent][5] をインストールします (ダウンサイジング推奨事項に必要)。

**注**: Cloud Cost Recommendations は、お客様の非 USD 通貨での課金をサポートします。

## 推奨事項ステータス {#recommendation-statuses}

各推奨事項にステータスを割り当てて、チーム全体のコスト最適化の進捗を追跡します。推奨事項が毎日再生成される場合でもステータスは維持されます。同じ推奨事項を再トリアージする必要はありません。

| ステータス | 説明 |
|--------|-------------|
| {{< ui >}}Open{{< /ui >}} | (デフォルト) 推奨事項はトリアージされていません。|
| {{< ui >}}In Progress{{< /ui >}} | この推奨事項に対処するための作業が進行中です。|
| {{< ui >}}Completed{{< /ui >}} | 推奨アクションは実施されたか、関連性がありません。|
| {{< ui >}}Dismissed{{< /ui >}}| この推奨事項については、無視時に指定された期間内に作業は計画されていません。|

### ステータスで推奨事項をフィルタリングする {#filter-recommendations-by-status}

[{{< ui >}}Cloud Cost Recommendations{{< /ui >}}][1] ページの上部にあるステータスタブを使用して、リストをステータスでフィルタリングします。利用可能なタブは {{< ui >}}Open{{< /ui >}}、{{< ui >}}In Progress{{< /ui >}}、{{< ui >}}Completed{{< /ui >}}、および {{< ui >}}Dismissed{{< /ui >}} です。各タブは、そのステータスの推奨事項の合計推定節約額を表示します。

### ステータスごとに節約額を追跡する {#track-savings-by-status}

各ステータスタブは、そのステータスの推奨事項の合計推定節約額を表示します。

- {{< ui >}}Open{{< /ui >}}: トリアージされていない推奨事項による潜在的な節約額。
- {{< ui >}}In Progress{{< /ui >}}: 作業が進行中の推奨事項による推定節約額。
- {{< ui >}}Completed{{< /ui >}}: 推奨アクションが実施された推奨事項による実現された節約額。
- {{< ui >}}Dismissed{{< /ui >}}: 無視された推奨事項による推定節約額。

### 推奨事項ステータスを変更する {#change-a-recommendation-status}

推奨事項ステータスを変更する方法は 3 つあります。

- **一括更新**: {{< ui >}}Active Recommendations{{< /ui >}} で 1 つ以上の推奨事項を選択し、テーブルの上部にあるツールバーからステータスを選択して、すべての選択された推奨事項に適用します。
- **テーブルから**: {{< ui >}}Status{{< /ui >}} 列のステータスドロップダウンを使用して、推奨事項リストから新しいステータスを直接選択します。
- **サイドパネルから**: 推奨事項をクリックしてサイドパネルを開き、ステータスドロップダウンを使用して新しいステータスを選択します。

## 推奨事項のアクション実行 {#recommendation-action-taking}
推奨事項に基づいてアクションを実行することで、節約してコストを最適化できます。Cloud Cost Recommendations は、Jira、ワンクリック Workflow Automation、Datadog Case Management をサポートしています。未使用の EBS および GP2 EBS ボリュームの推奨事項もワンクリック Workflow Automation をサポートしています。各アクション実行オプションの詳細は以下のとおりです。

- **Jira**: 推奨サイドパネルから直接 Jira の課題を作成するか、{{< ui >}}Active Recommendations{{< /ui >}} リスト内の複数の推奨事項を選択して {{< ui >}}Create Jira issue{{< /ui >}} をクリックします。作成された問題にはタグが付けられ、Datadog の推奨事項にリンクされます。

  Jira のステータスで推奨事項をフィルタリングするには、以下のクエリオプションを使用します。
  - `@jira_issues.issue_key:*` - Jira の問題がある推奨事項のみを表示
  - `-@jira_issues.issue_key:*` - Jira の問題がない推奨事項のみを表示
  - `jira_issues.issue_key:ABC*` - 特定の Jira プロジェクトプレフィックスでフィルタリング

- **[Bits Code][14] コード修正**: コード修正は、適用可能な S3 および DynamoDB の推奨事項、ならびに Kubernetes デプロイメントのダウンサイジング推奨事項に利用可能です。これらの状況で Bits Code は、Terraform または Helm チャートでクラウドリソースの変更とコスト最適化を実装するための実稼働準備が整ったプルリクエストを作成します。この機能を使用するには、[Bits Code のセットアップ][13]が必要です。
- **ワンクリック Workflow Automation アクション**: アクションは限られたセットの推奨事項に対して利用可能で、ユーザーは Cloud Cost Management 内で {{< ui >}}Delete EBS Volume{{< /ui >}} をクリックするなどの提案されたアクションを直接実行できます。
- **[コスト最適化の自動化][15]**: 推奨事項に基づいて継続的に自動化を設定し、定期的に実行します。自動化は特定のアカウント、リージョン、タグにスコープされ、事前アクションスナップショットや Slack または Microsoft Teams を通じたオプションの人間の承認などの安全策が含まれます。
- **[Datadog Case Management]**: ユーザーは推奨事項サイドパネルに移動し、{{< ui >}}Create Case{{< /ui >}} をクリックして推奨事項を管理し、アクションを実行するためのケースを生成できます。
- **無視**: 推奨サイドパネルの {{< ui >}}Dismiss{{< /ui >}} を使用して、選択期間の推奨事項を非表示にし、理由を提供します。無視された推奨事項は {{< ui >}}Dismissed{{< /ui >}} タブに移動します。

## 推奨事項およびリソースの説明 {#recommendation-and-resource-descriptions}

{{< multifilter-search >}}

## 参考資料 {#further-reading}

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
[13]: /ja/bits_ai/bits_ai_dev_agent/setup
[14]: /ja/bits_ai/bits_ai_dev_agent/
[15]: /ja/cloud_cost_management/recommendations/cost_optimization_automation/