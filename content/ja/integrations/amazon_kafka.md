---
app_id: amazon-kafka
app_uuid: e6dc171a-911d-4440-a409-7951eaadf69f
assets:
  dashboards:
    Amazon MSK Overview: assets/dashboards/overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: aws.msk.go.threads
      metadata_path: metadata.csv
      prefix: aws.msk.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Amazon Kafka
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- AWS
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/amazon_msk/README.md
display_on_public_website: true
draft: false
git_integration_title: amazon_kafka
integration_id: amazon-kafka
integration_title: Amazon MSK (Agent)
integration_version: 3.4.0
is_public: true
kind: integration
manifest_version: 2.0.0
name: amazon_kafka
oauth: {}
public_title: Amazon MSK (Agent)
short_description: Amazon MSK クラスターの健全性とパフォーマンスを監視。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Amazon MSK クラスターの健全性とパフォーマンスを監視。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon MSK (Agent)
---



## 概要

Amazon Managed Streaming for Apache Kafka (MSK) は、Apache Kafka を使用してストリーミングデータを処理するアプリケーションを、簡単に構築して実行できるフルマネージド型のサービスです。

このインテグレーションからメトリクスを収集する方法は、[Datadog Agent](#setup) を使用する方法と、[クローラー][1]を使用して CloudWatch からメトリクスを収集する方法の 2 通りあります。

## セットアップ

Agent チェックは、Datadog Agent を通じて、Amazon Managed Streaming for Apache Kafka ([Amazon MSK][2]) を監視します。

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][3]のガイドを参照してこの手順を行ってください。

### インストール

1. まだ作成していない場合は、[クライアントマシンを作成します][4]
2. クライアントマシンにアクセス許可ポリシー ([arn:aws:iam::aws:policy/AmazonMSKReadOnlyAccess][6]) が[付与][5]されているか、これに相当する[資格情報][7]が使用できることを確認します
3. MSK 側で [Prometheus によるオープンモニタリング][8]を有効にし、JmxExporter および NodeExporter を有効にします。
4. 作成したクライアントマシンに [Datadog Agent][9] をインストールします。

### コンフィギュレーション

1. Amazon MSK のパフォーマンスデータの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `amazon_msk.d/conf.yaml` ファイルを編集します。

   このインテグレーションで提供されるすべてのメトリクスとサービスチェックにアタッチするカスタム[タグ][10]を含めます。

   ```
   tags:
     - <KEY_1>:<VALUE_1>
     - <KEY_2>:<VALUE_2>
   ```

   使用可能なすべてのコンフィギュレーションオプションについては、[サンプル amazon_msk.d/conf.yaml][11] を参照してください。

   **注**: これはデフォルトの OpenMetrics チェックの例です。以前にこのインテグレーションを実装したことがある場合は、[レガシーの例][12]を参照してください。

2. [Agent を再起動します][13]。

### 検証

[Agent の status サブコマンドを実行][14]し、Checks セクションで `amazon_msk` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_kafka" >}}


### イベント

Amazon MSK チェックには、イベントは含まれません。

### サービスのチェック

このインテグレーションによって提供されるサービスチェックのリストについては、[service_checks.json][16] を参照してください。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][17]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog による Amazon Managed Streaming for Apache Kafka の監視][18]

[1]: https://docs.datadoghq.com/ja/integrations/amazon_msk
[2]: https://aws.amazon.com/msk
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[4]: https://docs.aws.amazon.com/msk/latest/developerguide/create-client-machine.html
[5]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html#attach-iam-role
[6]: https://console.aws.amazon.com/iam/home?#/policies/arn:aws:iam::aws:policy/AmazonMSKReadOnlyAccess
[7]: https://boto3.amazonaws.com/v1/documentation/api/latest/guide/configuration.html#configuring-credentials
[8]: https://docs.aws.amazon.com/msk/latest/developerguide/open-monitoring.html
[9]: https://docs.datadoghq.com/ja/agent/
[10]: https://docs.datadoghq.com/ja/getting_started/tagging/
[11]: https://github.com/DataDog/integrations-core/blob/master/amazon_msk/datadog_checks/amazon_msk/data/conf.yaml.example
[12]: https://github.com/DataDog/integrations-core/blob/7.31.x/amazon_msk/datadog_checks/amazon_msk/data/conf.yaml.example
[13]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[14]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[15]: https://github.com/DataDog/integrations-core/blob/master/amazon_msk/metadata.csv
[16]: https://github.com/DataDog/integrations-core/blob/master/amazon_msk/assets/service_checks.json
[17]: https://docs.datadoghq.com/ja/help/
[18]: https://www.datadoghq.com/blog/monitor-amazon-msk/