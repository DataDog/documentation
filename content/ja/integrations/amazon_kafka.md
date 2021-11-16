---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Amazon MSK Overview: assets/dashboards/overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - AWS
  - メッセージング
  - 処理
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/amazon_msk/README.md'
display_name: Amazon Kafka
draft: false
git_integration_title: amazon_kafka
guid: a572ad85-f431-4ed1-a1f3-cba9e1d4712f
integration_id: amazon-kafka
integration_title: Amazon MSK (Agent)
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: aws.msk.
metric_to_check: aws.msk.go.threads
name: amazon_kafka
public_title: Amazon MSK (Agent)
short_description: Amazon MSK クラスターの健全性とパフォーマンスを監視。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、Datadog Agent を通じて、Amazon Managed Streaming for Apache Kafka ([Amazon MSK][1]) を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

1. まだ作成していない場合は、[クライアントマシンを作成します][3]
2. クライアントマシンにアクセス許可ポリシー（[arn:aws:iam::aws:policy/AmazonMSKReadOnlyAccess][5]）が[付与][4]されているか、これに相当する[資格情報][6]が使用できることを確認します
3. MSK 側で [Prometheus によるオープンモニタリング][7]を有効にし、JmxExporter および NodeExporter を有効にします。
4. [Datadog Agent][8]をインストール

### コンフィギュレーション


1. Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `amazon_msk.d/conf.yaml` ファイルを編集し、Amazon MSK のパフォーマンスデータの収集を開始します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル amazon_msk.d/conf.yaml][3]を参照してください。

    **注**: サンプルファイルを再利用する場合は、ファイル名を `conf.yaml.example` から `conf.yaml` に変更してください。

2. [Agent を再起動します][10]。

### 検証

[Agent の status サブコマンドを実行][11]し、Checks セクションで  `amazon_msk` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_msk" >}}


### イベント

Amazon MSK チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "amazon_msk" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][14]までお問合せください。

[1]: https://aws.amazon.com/msk
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://docs.aws.amazon.com/msk/latest/developerguide/create-client-machine.html
[4]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html#attach-iam-role
[5]: https://console.aws.amazon.com/iam/home?#/policies/arn:aws:iam::aws:policy/AmazonMSKReadOnlyAccess
[6]: https://boto3.amazonaws.com/v1/documentation/api/latest/guide/configuration.html#configuring-credentials
[7]: https://docs.aws.amazon.com/msk/latest/developerguide/open-monitoring.html
[8]: https://docs.datadoghq.com/ja/agent/
[9]: https://github.com/DataDog/integrations-core/blob/master/amazon_msk/datadog_checks/amazon_msk/data/conf.yaml.example
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/amazon_msk/metadata.csv
[13]: https://github.com/DataDog/integrations-core/blob/master/amazon_msk/assets/service_checks.json
[14]: https://docs.datadoghq.com/ja/help/