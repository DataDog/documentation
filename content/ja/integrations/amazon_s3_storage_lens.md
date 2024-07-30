---
categories:
- AWS
- クラウド
- data stores
- ログの収集
dependencies: []
description: Amazon S3 Storage Lens の主要なメトリクスを追跡します。
doc_link: https://docs.datadoghq.com/integrations/amazon_s3_storage_lens
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/amazon-s3-storage-lens-monitoring-datadog/
  tag: ブログ
  text: Amazon S3 Storage Lens メトリクスによる S3 ストレージの監視と最適化
git_integration_title: amazon_s3_storage_lens
has_logo: true
integration_id: ''
integration_title: Amazon S3 Storage Lens
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_s3_storage_lens
public_title: Datadog-Amazon S3 Storage Lens インテグレーション
short_description: Amazon S3 Storage Lens の主要なメトリクスを追跡します。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Amazon S3 Storage Lens は、Amazon S3 ストレージ全体の使用状況とアクティビティを一望できるビューを提供します。S3 Storage Lens を使用して、組織全体でどれだけのストレージがあるか、またはどれが最も急速に成長しているバケットとプレフィックスかを見つけるなど、要約した洞察を生成することができます。ストレージメトリクスの異常値を特定し、ドリルダウンして使用量やアクティビティのスパイクの原因をさらに調査します。

このインテグレーションを有効にすると、Datadog にすべての S3 Storage Lens メトリクスを表示できます。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. AWS アカウント内の [CloudWatch publishing for S3 Storage Lens][2] を有効化します。この機能を使用するには、"Advanced metrics and recommendations" を使用している必要があります。
2. [AWS インテグレーションページ][3]で、`Metric Collection` タブの下にある `S3 Storage Lens` が有効になっていることを確認します。
3. [Datadog - Amazon S3 Storage Lens インテグレーション][4]をインストールします。

**注:** S3 Storage Lens のメトリクスはデイリーメトリクスであり、1 日 1 回 CloudWatch に公開されます。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_s3_storage_lens" >}}


### ヘルプ

Amazon S3 Storage Lens インテグレーションには、イベントは含まれません。

### ヘルプ

Amazon S3 Storage Lens インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-lens-cloudwatch-enable-publish-option.html
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-s3-storage-lens
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_s3_storage_lens/amazon_s3_storage_lens_metadata.csv
[6]: https://docs.datadoghq.com/ja/help/