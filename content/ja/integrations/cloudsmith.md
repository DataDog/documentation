---
app_id: cloudsmith
app_uuid: 92b5a159-e5e9-4e38-a4d4-b987cd03b7a1
assets:
  dashboards:
    Cloudsmith: assets/dashboards/cloudsmith_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cloudsmith.bandwidth_used
      metadata_path: metadata.csv
      prefix: cloudsmith.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10208
    source_type_name: Cloudsmith
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Cloudsmith
  sales_email: ccarey@cloudsmith.io
  support_email: ccarey@cloudsmith.io
categories:
- クラウド
- メトリクス
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/cloudsmith/README.md
display_on_public_website: true
draft: false
git_integration_title: cloudsmith
integration_id: cloudsmith
integration_title: Cloudsmith
integration_version: 0.0.2
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: cloudsmith
public_title: Cloudsmith
short_description: Cloudsmith メトリクスを監視する
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Metrics
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Cloudsmith メトリクスを監視する
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Cloudsmith
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

このチェックは、Datadog Agent を通じて [Cloudsmith][1] を監視します。
- Cloudsmith アカウントのストレージ、帯域幅、トークンの使用状況を監視します。


## 計画と使用

Cloudsmith チェックは [Datadog Agent][2] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インフラストラクチャーリスト

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Cloudsmith チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][3]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-cloudsmith==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][4]と同様にインテグレーションを構成します。

### ブラウザトラブルシューティング

1. Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `cloudsmith.d/conf.yaml` ファイルを編集し、Cloudsmith のパフォーマンスデータを収集します。使用可能なすべてのコンフィギュレーションオプションについては、[cloudsmith.d/conf.yaml のサンプル][5]を参照してください。

2. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `cloudsmith` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "cloudsmith" >}}


### ヘルプ

収集された Cloudsmith 関連のイベントはすべて、Datadog イベントストリーム内で `source:cloudsmith` プロパティを指定して表示されます。Cloudsmith API に送信されるリクエスト数を減らすために、5 分ごとに収集されます。

イベントには 2 種類あります。

- セキュリティスキャンイベント
- 監査ログイベント

これらは集計キー `@aggregation_key:audit_log` と `@aggregation_key:vulnerabilities` でアクセス可能です。

## ヘルプ

ご不明な点は、[Cloudsmith サポート][10]までお問い合わせください。

[1]: https://cloudsmith.com
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/cloudsmith/datadog_checks/cloudsmith/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/cloudsmith/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/cloudsmith/assets/service_checks.json
[10]: https://help.cloudsmith.io/docs/contact-us#live-chat-via-intercom