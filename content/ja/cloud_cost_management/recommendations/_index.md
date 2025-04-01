---
algolia:
  tags:
  - クラウドコストの推奨事項
  - クラウドコストの推奨事項
  - コストの推奨事項
  - コストの推奨事項
  - クラウドリソース
  - クラウドリソース
description: Cost Recommendations を使用して、組織のクラウドリソースにかかる支出を削減する方法を学びましょう。
further_reading:
- link: /cloud_cost_management/
  tag: ドキュメント
  text: Cloud Cost Management について
- link: /integrations/guide/aws-integration-and-cloudwatch-faq/
  tag: ドキュメント
  text: AWS インテグレーションと CloudWatch の FAQ
multifiltersearch:
  data:
  - category: 未使用リソース
    cloud_provider: AWS
    recommendation_description: 5% 未満の CPU 使用率、および 10% 未満のメモリ使用率の EC2 インスタンス。
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: 未使用の EC2 インスタンス
    resource_type: EC2
  - category: 未使用リソース
    cloud_provider: AWS
    recommendation_description: 0 キースペースヒットで Redis を実行しており、コンテナ化されておらず、リーダー、フォロワー、シャードのいずれでもない
      EC2 インスタンス。
    recommendation_prerequisites: '[Redis インテグレーション](https://docs.datadoghq.com/integrations/redisdb/?tab=host)'
    recommendation_type: Redis を実行している未使用の EC2 インスタンス
    resource_type: EC2
  - category: 未使用リソース
    cloud_provider: AWS
    recommendation_description: 0 キースペースヒットで memcached を実行しており、コンテナ化されていない EC2 インスタンス。
    recommendation_prerequisites: '[Memcache インテグレーション](https://docs.datadoghq.com/integrations/redisdb/?tab=host)'
    recommendation_type: memcached を実行している未使用の EC2 インスタンス
    resource_type: EC2
  - category: 未使用リソース
    cloud_provider: AWS
    recommendation_description: 1 未満の同時接続数で Postgres を実行しており、コンテナ化されておらず、レプリカでもない
      EC2 インスタンス。
    recommendation_prerequisites: '[Postgres インテグレーション](https://docs.datadoghq.com/integrations/mcache/?tab=host)'
    recommendation_type: Postgres を実行している未使用の EC2 インスタンス
    resource_type: EC2
  - category: 未使用リソース
    cloud_provider: AWS
    recommendation_description: 1 未満の同時接続数で MySQL を実行しており、コンテナ化されておらず、レプリカでもない EC2
      インスタンス。
    recommendation_prerequisites: '[MySQL インテグレーション](https://docs.datadoghq.com/integrations/postgres/?tab=host)'
    recommendation_type: MySQL を実行している未使用の EC2 インスタンス
    resource_type: EC2
  - category: 未使用リソース
    cloud_provider: AWS
    recommendation_description: EC2 インスタンスからデタッチされたボリューム。
    recommendation_prerequisites: ''
    recommendation_type: アタッチされていない EBS ボリューム
    resource_type: EBS
  - category: 未使用リソース
    cloud_provider: AWS
    recommendation_description: 稼働していない EC2 インスタンスにアタッチされたボリューム。
    recommendation_prerequisites: ''
    recommendation_type: 未使用 EBS ボリューム
    resource_type: EBS
  - category: 未使用リソース
    cloud_provider: AWS
    recommendation_description: データベース接続数 0、レプリカラグ 0 の RDS インスタンス。
    recommendation_prerequisites: ''
    recommendation_type: 未使用 RDS インスタンス
    resource_type: RDS
  - category: 未使用リソース
    cloud_provider: AWS
    recommendation_description: 未完了のマルチパートアップロード。
    recommendation_prerequisites: '[Storage Lens](/integrations/amazon_s3_storage_lens/)'
    recommendation_type: 放置された S3 マルチパートアップロード
    resource_type: S3
  - category: 未使用リソース
    cloud_provider: AWS
    recommendation_description: データベース接続数 0 の Redshift クラスター。
    recommendation_prerequisites: ''
    recommendation_type: 未使用 Redshift クラスター
    resource_type: Redshift
  - category: 未使用リソース
    cloud_provider: AWS
    recommendation_description: キャッシュヒット数 0、レプリケーションバイト 0 の Elasticache Redis クラスター。
    recommendation_prerequisites: ''
    recommendation_type: 未使用 Elasticache Redis クラスター
    resource_type: Elasticache Redis
  - category: 未使用リソース
    cloud_provider: AWS
    recommendation_description: 接続数 0 の MQ ブローカー。
    recommendation_prerequisites: ''
    recommendation_type: 未使用 MQ ブローカー
    resource_type: MQ
  - category: 未使用リソース
    cloud_provider: AWS
    recommendation_description: ECR イメージのバイトが 180 日以上前のもの。
    recommendation_prerequisites: ''
    recommendation_type: 古い ECR イメージ
    resource_type: ECR
  - category: 未使用リソース
    cloud_provider: AWS
    recommendation_description: 接続数 0 の OpenSearch クラスター。
    recommendation_prerequisites: ''
    recommendation_type: OpenSearch クラスター
    resource_type: OpenSearch
  - category: 未使用リソース
    cloud_provider: AWS
    recommendation_description: アクティブ接続がなく、EC2 インスタンスにアタッチされていない Classic Elastic Load
      Balancer。
    recommendation_prerequisites: ''
    recommendation_type: 未使用 Classic Elastic Load Balancers
    resource_type: Classic Elastic Load Balancer
  - category: 未使用リソース
    cloud_provider: AWS
    recommendation_description: 処理バイト数 0 のネットワークロードバランサー。
    recommendation_prerequisites: ''
    recommendation_type: 未使用 Network Elastic Load Balancer
    resource_type: Network Elastic Load Balancer
  - category: 未使用リソース
    cloud_provider: AWS
    recommendation_description: 処理中のトラフィックがない Application Load Balancer。
    recommendation_prerequisites: ''
    recommendation_type: 未使用 Application Load Balancer
    resource_type: Application Load Balancer
  - category: 未使用リソース
    cloud_provider: AWS
    recommendation_description: 送信バイト数がない NAT ゲートウェイ。
    recommendation_prerequisites: ''
    recommendation_type: 未使用 NAT ゲートウェイ
    resource_type: NAT Gateway
  - category: 未使用リソース
    cloud_provider: AWS
    recommendation_description: AWS コストと使用状況レポートでアイドル料金が発生している Elastic IP アドレス。
    recommendation_prerequisites: ''
    recommendation_type: アイドル Elastic IP アドレス
    resource_type: Elastic IP Address
  - category: 未使用リソース
    cloud_provider: AWS
    recommendation_description: 読み取り消費量 0、非レプリカ書き込み消費量 0 の DynamoDB テーブル。
    recommendation_prerequisites: ''
    recommendation_type: 未使用 DynamoDB
    resource_type: DynamoDB
  - category: 未使用リソース
    cloud_provider: AWS
    recommendation_description: DynamoDB テーブルのグローバルセカンダリインデックス (GSI) で読み取り消費量 0。
    recommendation_prerequisites: ''
    recommendation_type: 未使用 DynamoDB グローバルセカンダリインデックス
    resource_type: DynamoDB
  - category: 未使用リソース
    cloud_provider: AWS
    recommendation_description: 旧世代インスタンスタイプを含むオートスケーリンググループ。
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: レガシーインスタンスタイプを含む ASG
    resource_type: Autoscaling groups (ASG)
  - category: 未使用リソース
    cloud_provider: AWS
    recommendation_description: 2 つ以上のオンデマンドバックアップに課金が発生している DynamoDB テーブル。
    recommendation_prerequisites: ''
    recommendation_type: DynamoDB 不要なオンデマンドバックアップ削除
    resource_type: DynamoDB
  - category: 旧世代リソース
    cloud_provider: AWS
    recommendation_description: 旧世代の EC2 インスタンスで、新しいインスタンスタイプへのアップグレードが可能。
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: 旧世代 EC2 インスタンス
    resource_type: EC2
  - category: 旧世代リソース
    cloud_provider: AWS
    recommendation_description: GP2 の EBS ボリュームで、GP3 へのアップグレードでコスト削減とパフォーマンス改善が可能。
    recommendation_prerequisites: ''
    recommendation_type: GP2 EBS ボリューム
    resource_type: GP2 EBS
  - category: 旧世代リソース
    cloud_provider: AWS
    recommendation_description: I01 の EBS ボリュームで、GP3 へのアップグレードでコスト削減とパフォーマンス改善が可能。
    recommendation_prerequisites: ''
    recommendation_type: I01 EBS ボリューム
    resource_type: I01 EBS
  - category: 旧世代リソース
    cloud_provider: AWS
    recommendation_description: 既にサポート終了したエンジンバージョンで動作しており、[延長サポート料金](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/extended-support-charges.html)が発生している
      RDS。
    recommendation_prerequisites: ''
    recommendation_type: 延長サポート RDS インスタンス
    resource_type: RDS
  - category: 過剰プロビジョニングされたリソース
    cloud_provider: AWS
    recommendation_description: 旧世代のオートスケーリンググループインスタンスを新しいタイプに移行。
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: 過剰プロビジョニングされた EC2 インスタンス
    resource_type: EC2
  - category: 過剰プロビジョニングされたリソース
    cloud_provider: AWS
    recommendation_description: ユーザー CPU 利用率が 25% 未満で、コンテナ化されておらず、リーダー、フォロワー、シャードでもない
      Redis 実行中の EC2 インスタンス。
    recommendation_prerequisites: '[Redis インテグレーション](https://docs.datadoghq.com/integrations/redisdb/?tab=host)'
    recommendation_type: Redis を実行している過剰プロビジョニングされた EC2 インスタンス
    resource_type: EC2
  - category: 過剰プロビジョニングされたリソース
    cloud_provider: AWS
    recommendation_description: ユーザー CPU 利用率が 25% 未満で、コンテナ化されていない memcached 実行中の EC2
      インスタンス。
    recommendation_prerequisites: '[Memcache インテグレーション](https://docs.datadoghq.com/integrations/redisdb/?tab=host)'
    recommendation_type: memcached を実行している過剰プロビジョニングされた EC2 インスタンス
    resource_type: EC2
  - category: 過剰プロビジョニングされたリソース
    cloud_provider: AWS
    recommendation_description: ユーザー CPU 利用率が 25% 未満かつ有効メモリが 25% 超で、コンテナ化されておらず、レプリカでもない
      Postgres 実行中の EC2 インスタンス。
    recommendation_prerequisites: '[Postgres インテグレーション](https://docs.datadoghq.com/integrations/mcache/?tab=host)'
    recommendation_type: Postgres を実行している過剰プロビジョニングされた EC2 インスタンス
    resource_type: EC2
  - category: 過剰プロビジョニングされたリソース
    cloud_provider: AWS
    recommendation_description: ユーザー CPU 利用率が 25% 未満かつ有効メモリが 25% 超で、コンテナ化されておらず、レプリカでもない
      MySQL 実行中の EC2 インスタンス。
    recommendation_prerequisites: '[MySQL インテグレーション](https://docs.datadoghq.com/integrations/postgres/?tab=host)'
    recommendation_type: MySQL を実行している過剰プロビジョニングされた EC2
    resource_type: EC2
  - category: 過剰プロビジョニングされたリソース
    cloud_provider: AWS
    recommendation_description: CPU およびメモリ使用率が 30% 未満のコンテナ。
    recommendation_prerequisites: '[Datadog プリファイリングエージェント](/profiler/enabling/)'
    recommendation_type: 過剰プロビジョニングされた Kubernetes コンテナ
    resource_type: Kubernetes コンテナ
  - category: 過剰プロビジョニングされたリソース
    cloud_provider: AWS
    recommendation_description: IOPS が使用量を上回る EBS ボリューム。
    recommendation_prerequisites: '*[Amazon EC2 インテグレーション](/integrations/amazon_ec2/)'
    recommendation_type: 過剰プロビジョニングされた EBS ボリューム IOPS
    resource_type: EBS
  - category: 過剰プロビジョニングされたリソース
    cloud_provider: AWS
    recommendation_description: 読み取り・書き込みでプロビジョニングされた IOPS の 80% 未満しか使用していない RDS インスタンス。
    recommendation_prerequisites: ''
    recommendation_type: 過剰プロビジョニングされた RDS IOPS
    resource_type: RDS IOPS
  - category: 過剰プロビジョニングされたリソース
    cloud_provider: AWS
    recommendation_description: 読み取り・書き込みでプロビジョニングされた IOPS の 80% 未満しか使用していない EBS ボリューム。
    recommendation_prerequisites: '*[Amazon EC2 インテグレーション](/integrations/amazon_ec2/)'
    recommendation_type: 過剰プロビジョニングされた EBS IOPS
    resource_type: EBS IOPS
  - category: 過剰プロビジョニングされたリソース
    cloud_provider: AWS
    recommendation_description: ストレージ容量の 20% 未満しか使用していない EBS ボリューム。
    recommendation_prerequisites: '*[Amazon EC2 インテグレーション](/integrations/amazon_ec2/)'
    recommendation_type: 過剰プロビジョニングされた EBS ストレージ
    resource_type: EBS Storage
  - category: 過剰プロビジョニングされたリソース
    cloud_provider: AWS
    recommendation_description: 読み取り・書き込みでプロビジョニングされたスループットの 80% 未満しか使用していない EBS ボリューム。
    recommendation_prerequisites: '*[Amazon EC2 インテグレーション](/integrations/amazon_ec2/)'
    recommendation_type: 過剰プロビジョニングされた EBS スループット
    resource_type: EBS スループット
  - category: 過剰プロビジョニングされたリソース
    cloud_provider: AWS
    recommendation_description: 全稼働時間の 80% を超える期間にわたって、読み取り・書き込みキャパシティの 80% 未満しか使用していないプロビジョニング済み
      DynamoDB テーブル。
    recommendation_prerequisites: ''
    recommendation_type: 過剰プロビジョニングされた DynamoDB キャパシティ
    resource_type: DynamoDB
  - category: 料金最適化
    cloud_provider: AWS
    recommendation_description: 45 日以上稼働している RDS インスタンスが依然としてオンデマンド料金で課金されている。
    recommendation_prerequisites: ''
    recommendation_type: RDS RI の購入
    resource_type: RDS 予約済みインスタンス
  - category: 料金最適化
    cloud_provider: AWS
    recommendation_description: 45 日以上稼働している ElastiCache ノードが依然としてオンデマンド料金で課金されている。
    recommendation_prerequisites: ''
    recommendation_type: ElastiCache RI の購入
    resource_type: ElastiCache 予約済みインスタンス
  - category: 料金最適化
    cloud_provider: AWS
    recommendation_description: 45 日以上稼働している OpenSearch インスタンスが依然としてオンデマンド料金で課金されている。
    recommendation_prerequisites: ''
    recommendation_type: OpenSearch RI の購入
    resource_type: OpenSearch 予約済みインスタンス
  - category: 料金最適化
    cloud_provider: AWS
    recommendation_description: 45 日以上稼働している Redshift クラスターが依然としてオンデマンド料金で課金されている。
    recommendation_prerequisites: ''
    recommendation_type: Redshift RI の購入
    resource_type: Redshift 予約済みインスタンス
  - category: 料金最適化
    cloud_provider: AWS
    recommendation_description: ほぼすべてが GB 単位の標準ストレージ料金に由来するが、GET リクエスト数の少なさは、実際にはアクセスされるオブジェクトがごくわずかであることを示しているバケットのコスト。
    recommendation_prerequisites: ''
    recommendation_type: S3 ティアリング
    resource_type: S3
  - category: 料金最適化
    cloud_provider: AWS
    recommendation_description: 標準的な S3 バケットで、非最新バージョン有効期限ライフサイクルがなく、Web サイト配信もしていない場合、30
      日以上前の非最新バージョンストレージバイトが存在。
    recommendation_prerequisites: '[Storage Lens](/integrations/amazon_s3_storage_lens/)'
    recommendation_type: S3 非最新バージョン有効期限ライフサイクルルール
    resource_type: S3
  - category: 料金最適化
    cloud_provider: AWS
    recommendation_description: 過去 2 週間の間に、1 時間あたりの読み取りおよび書き込みキャパシティ消費率が、少なくとも一度、18%
      未満になったプロビジョニング済み DynamoDB テーブル。
    recommendation_prerequisites: ''
    recommendation_type: オンデマンドキャパシティモードへの DynamoDB 移行
    resource_type: DynamoDB
  - category: 料金最適化
    cloud_provider: AWS
    recommendation_description: オンデマンド DynamoDB テーブルで、1 時間あたりの読み取りおよび書き込みキャパシティ消費率が常に
      18% を超えているもの。
    recommendation_prerequisites: ''
    recommendation_type: プロビジョニングキャパシティモードへの DynamoDB 移行
    resource_type: DynamoDB
  - category: 料金最適化
    cloud_provider: AWS
    recommendation_description: 標準テーブルクラスへの移行により、ストレージレートに対する追加コストに比してキャパシティレートの削減が可能、あるいは標準テーブルクラスの無料枠ストレージを利用可能。
    recommendation_prerequisites: ''
    recommendation_type: 標準テーブルクラスへの DynamoDB 移行
    resource_type: DynamoDB
  - category: 料金最適化
    cloud_provider: AWS
    recommendation_description: IA テーブルクラスへの移行により、ストレージレートでより多くのコスト削減が可能となり、キャパシティレートの追加コストを上回る場合。
    recommendation_prerequisites: ''
    recommendation_type: 低頻度アクセス (IA) テーブルクラスへの DynamoDB 移行
    resource_type: DynamoDB
  - category: アーキテクチャ
    cloud_provider: AWS
    recommendation_description: 同一 VPC 内のリソース間通信で NAT ゲートウェイを介さないようにすることで、不要な NAT
      ゲートウェイ処理料金を回避可能。
    recommendation_prerequisites: '[NPM](/network_monitoring/performance/setup/)'
    recommendation_type: 同一 VPC 内での NAT Gateway 転送料金
    resource_type: NAT Gateway
  - category: アーキテクチャ
    cloud_provider: AWS
    recommendation_description: NAT ゲートウェイが必要なリソースは、同じアベイラビリティゾーン内のものを使用することで、不要なクロスゾーン転送料金を回避可能。
    recommendation_prerequisites: ''
    recommendation_type: NAT Gateway クロスゾーントランスファー料金
    resource_type: NAT Gateway
  headers:
  - filter_by: true
    id: カテゴリー
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
title: クラウドコストの推奨事項
---

{{< callout url="#" btn_hidden="true" header="プレビュー版にご参加ください！" >}}
AWS に対応した Cloud Cost Recommendations はプレビュー版で提供されており、<a href="/cloud_cost_management/">Cloud Cost Management</a> を設定している場合には自動的に有効化されます。
{{< /callout >}}

## 概要

[Cloud Cost Recommendations][1] は、クラウドリソースの利用を最適化することでクラウド支出を削減するための推奨事項を提供します。Datadog は、可観測性データと基盤となるクラウドプロバイダーの課金データを組み合わせて、孤立したクラウドリソース、旧世代クラウドリソース、または過剰プロビジョニングされたクラウドリソースを特定し、一連の推奨事項を生成します。

推奨事項は毎日実行され、推奨事項がリリースされるとすぐにお客様のアカウントで自動的に更新されます。

- **すべてのリソース**に対しては、そのリソースに対する[クラウドコストメトリクス][6]も取得されます。
- Kubernetes と EC2 以外のすべての **AWS リソース**については、[AWS CloudWatch][6] から AWS メトリクス も取得されます。

{{< img src="cloud_cost/recommendations/cost_recommendations_1.png" alt="Cloud Cost Recommendations ページの概要タブには、潜在的な月次削減額、潜在的な年次削減額、および未解決のケースの総数が表示されます。" style="width:100%;" >}}

このページでは、各推奨事項タイプに関する詳細なロジックや、可観測性メトリクス、コストデータを確認することができます。

## 推奨事項カテゴリー

以下に、利用可能なクラウドコスト推奨事項カテゴリーとその説明を示します。

| 推奨事項カテゴリー | 説明 |
|----------|-------------|
| 未使用リソース | お使いのクラウド環境で、レガシーハードウェア上で稼働している、または効率的に利用されていないリソースが特定されます。これらのリソースをアップグレードまたは削除することで、コストを削減し、リソースのパフォーマンスを向上させることができます。 |
| 旧世代リソース | レガシーハードウェア上で稼働しているリソースで、アップグレードを検討することで、コストを削減し、リソースのパフォーマンス向上が可能です。 |
| 過剰プロビジョニングされたリソース | 十分に活用されていない、または過剰にプロビジョニングされたリソースで、サイズや構成を調整することで、コストを削減し、リソースのパフォーマンスを向上できます。 |
| 料金最適化 | オンデマンド料金で課金されている、または料金最適化の恩恵を受ける可能性があるリソースです。これらのリソースを修正することでコスト削減が可能です。 |
| アーキテクチャ | NAT ゲートウェイに関連するリソースで、不要な料金を削減するために最適化を検討できます。 |

## 前提条件

以下は、Cloud Cost の推奨事項を受け取るために必要な要件です。

- クラウドプロバイダーアカウント (すべての Cloud Cost 推奨事項に適用)
- [AWS インテグレーションおよびリソース収集][3] (AWS 推奨事項に適用)

## セットアップ

推奨事項を受け取りたい各クラウドアカウントに対して、

1. [Cloud Cost Management][2] を構成して、課金データを Datadog に送信してください。
1. [AWS インテグレーションタイル][4]の **Resource Collection** タブで[リソースコレクション][3]を有効にします。
1. (過剰プロビジョニングリソースに関する推奨事項には) '[Datadog Agent][5]' をインストールしてください。

## 推奨事項およびリソースの説明

{{< multifilter-search >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/recommendations
[2]: /ja/cloud_cost_management/aws/#setup
[3]: /ja/integrations/amazon_web_services/#resource-collection
[4]: https://app.datadoghq.com/integrations/aws
[5]: /ja/agent/
[6]: /ja/integrations/amazon_s3_storage_lens/