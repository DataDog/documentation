---
categories:
- 自動化
- aws
- クラウド
- ログの収集
- ai/ml
dependencies: []
description: Amazon SageMaker のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/amazon_sagemaker/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-cloudhealth-assets-datadog/
  tag: ブログ
  text: 'CloudHealth + Datadog: クラウドアセットを効果的に管理'
git_integration_title: amazon_sagemaker
has_logo: true
integration_id: ''
integration_title: Amazon SageMaker
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_sagemaker
public_title: Datadog-Amazon SageMaker インテグレーション
short_description: Amazon SageMaker のキーメトリクスを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Amazon SageMaker は、フルマネージド型の機械学習サービスです。Amazon SageMaker を使用して、データサイエンティストや開発者は、機械学習モデルを構築およびトレーニングした後に、実稼働準備ができたホスト環境にモデルを直接デプロイすることができます。

このインテグレーションを有効にすると、Datadog にすべての SageMaker メトリクスを表示できます。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `SageMaker` が有効になっていることを確認します。
2. [Datadog - Amazon SageMaker インテグレーション][3]をインストールします。

### 収集データ

#### ログの有効化

Amazon SageMaker から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_sagemaker` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog ログコレクション AWS Lambda 関数][4] をまだ設定していない場合は、設定を行ってください。
2. lambda 関数がインストールされたら、AWS コンソールから、Amazon SageMaker ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][5]
    - [CloudWatch ロググループに手動トリガーを追加][6]

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_sagemaker" >}}


### ヘルプ

Amazon SageMaker インテグレーションには、イベントは含まれません。

### ヘルプ

Amazon SageMaker インテグレーションには、サービスのチェック機能は含まれません。

## すぐに使える監視

Datadog は、SageMaker のエンドポイントとジョブ向けにすぐに使えるダッシュボードを提供しています。

### SageMaker エンドポイント

[SageMaker エンドポイントダッシュボード][8]を使用すると、追加構成なしで SageMaker エンドポイントの健全性とパフォーマンスの監視をすぐに開始できます。エラー、予想以上のレイテンシー、またはトラフィックの急増が発生しているエンドポイントを特定します。CPU、GPU、メモリ、およびディスクの使用量メトリクスを使用して、インスタンスタイプとスケーリングポリシーの選択を見直し、修正します。

{{< img src="integrations/amazon_sagemaker/sagemaker_endpoints_2.png" alt="すぐに使える SageMaker エンドポイントダッシュボード" style="width:80%;">}}

### SageMaker ジョブ

[SageMaker ジョブダッシュボード][9]を使用すると、トレーニング、処理、または変換ジョブのリソース使用状況 (CPU、GPU、およびストレージのボトルネックの検出など) を把握できます。この情報を使用して、コンピュートインスタンスを最適化します。

{{< img src="integrations/amazon_sagemaker/sagemaker_jobs_2.png" alt="すぐに使える SageMaker ジョブダッシュボード" style="width:80%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-sagemaker
[4]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=automaticcloudformation#log-collection
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_sagemaker/amazon_sagemaker_metadata.csv
[8]: https://app.datadoghq.com/dash/integration/31076/amazon-sagemaker-endpoints
[9]: https://app.datadoghq.com/dash/integration/31077/amazon-sagemaker-jobs
[10]: https://docs.datadoghq.com/ja/help/