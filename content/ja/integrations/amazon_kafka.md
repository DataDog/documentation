---
app_id: amazon-kafka
app_uuid: e6dc171a-911d-4440-a409-7951eaadf69f
assets:
  dashboards:
    Amazon MSK Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
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
    source_type_id: 10080
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
integration_version: 4.7.0
is_public: true
kind: integration
manifest_version: 2.0.0
name: amazon_kafka
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

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Amazon Managed Streaming for Apache Kafka (MSK) は、Apache Kafka を使用してストリーミングデータを処理するアプリケーションを、簡単に構築して実行できるフルマネージド型のサービスです。

このインテグレーションからメトリクスを収集する方法は、[Datadog Agent](#setup) を使用する方法と、[クローラー][1]を使用して CloudWatch からメトリクスを収集する方法の 2 通りあります。

## 計画と使用

Agent チェックは、Datadog Agent を通じて、Amazon Managed Streaming for Apache Kafka ([Amazon MSK][2]) を監視します。

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][3]のガイドを参照してこの手順を行ってください。

この OpenMetrics ベースのインテグレーションには、最新モード (`use_openmetrics`: true) とレガシーモード (`use_openmetrics`: false) があります。すべての最新機能を利用するために、Datadog は最新モードを有効にすることを推奨します。詳しくは、[OpenMetrics ベースのインテグレーションにおける最新バージョニングとレガシーバージョニング][4]を参照してください。

### インフラストラクチャーリスト

1. まだ作成していない場合は、[クライアントマシンを作成します][5]。
2. クライアントマシンに権限ポリシー ([arn:aws:iam::aws:policy/AmazonMSKReadOnlyAccess][7]) が[付与][6]されている、または同等の[資格情報][8]が利用可能であることを確認します。
3. MSK 側で [Prometheus によるオープンモニタリング][9]を有効にし、JmxExporter および NodeExporter を有効にします。
4. 作成したクライアントマシンに [Datadog Agent][10] をインストールします。

### ブラウザトラブルシューティング

1. Amazon MSK のパフォーマンスデータの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `amazon_msk.d/conf.yaml` ファイルを編集します。

   このインテグレーションで提供されるすべてのメトリクスとサービスチェックに関連付けられるカスタム[タグ][11]を含めます。

   ```
   tags:
     - <KEY_1>:<VALUE_1>
     - <KEY_2>:<VALUE_2>
   ```

   最新モードで利用可能なすべての構成オプションについては、[amazon_msk.d/conf.yaml のサンプル][12]を参照してください。このインテグレーションのレガシーモードについては、[レガシー例][13]を参照してください。

2. [Agent を再起動します][14]。

### 検証

[Agent の status サブコマンドを実行][15]し、Checks セクションで `amazon_msk` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_kafka" >}}


### ヘルプ

Amazon MSK チェックには、イベントは含まれません。

### ヘルプ

このインテグレーションによって提供されるサービスチェックのリストについては、[service_checks.json][17] を参照してください。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][18]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog による Amazon Managed Streaming for Apache Kafka の監視][19]

[1]: https://docs.datadoghq.com/ja/integrations/amazon_msk
[2]: https://aws.amazon.com/msk
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[4]: https://docs.datadoghq.com/ja/integrations/guide/versions-for-openmetrics-based-integrations
[5]: https://docs.aws.amazon.com/msk/latest/developerguide/create-client-machine.html
[6]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html#attach-iam-role
[7]: https://console.aws.amazon.com/iam/home?#/policies/arn:aws:iam::aws:policy/AmazonMSKReadOnlyAccess
[8]: https://boto3.amazonaws.com/v1/documentation/api/latest/guide/configuration.html#configuring-credentials
[9]: https://docs.aws.amazon.com/msk/latest/developerguide/open-monitoring.html
[10]: https://docs.datadoghq.com/ja/agent/
[11]: https://docs.datadoghq.com/ja/getting_started/tagging/
[12]: https://github.com/DataDog/integrations-core/blob/master/amazon_msk/datadog_checks/amazon_msk/data/conf.yaml.example
[13]: https://github.com/DataDog/integrations-core/blob/7.31.x/amazon_msk/datadog_checks/amazon_msk/data/conf.yaml.example
[14]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[15]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[16]: https://github.com/DataDog/integrations-core/blob/master/amazon_msk/metadata.csv
[17]: https://github.com/DataDog/integrations-core/blob/master/amazon_msk/assets/service_checks.json
[18]: https://docs.datadoghq.com/ja/help/
[19]: https://www.datadoghq.com/blog/monitor-amazon-msk/