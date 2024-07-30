---
app_id: cfssl
app_uuid: dfcfda46-a2e3-44e4-8f80-1603e0317b2d
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: cfssl.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10284
    source_type_name: cfssl
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: コミュニティ
  sales_email: JeanFred1@gmail.com
  support_email: JeanFred1@gmail.com
categories:
- ネットワーク
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/cfssl/README.md
display_on_public_website: true
draft: false
git_integration_title: cfssl
integration_id: cfssl
integration_title: cfssl
integration_version: 1.0.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: cfssl
public_title: cfssl
short_description: cfssl インスタンスを監視する
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Network
  configuration: README.md#Setup
  description: cfssl インスタンスを監視する
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: cfssl
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

このチェックは、Datadog Agent を通じて [cfssl][1] を監視します。

## 計画と使用

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インフラストラクチャーリスト

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い cfssl チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][3]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-cfssl==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][4]と同様にインテグレーションを構成します。

### ブラウザトラブルシューティング

1. cfssl のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `cfssl.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル exim.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `cfssl` を探します。

## リアルユーザーモニタリング

### データセキュリティ

cfssl インテグレーションには、メトリクスは含まれません。

### ヘルプ

cfssl インテグレーションには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "cfssl" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。


[1]: https://github.com/cloudflare/cfssl
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/cfssl/datadog_checks/cfssl/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/cfssl/assets/service_checks.json
[9]: https://www.datadoghq.com/support/