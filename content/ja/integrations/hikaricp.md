---
app_id: hikaricp
app_uuid: fa40ec7e-e8f6-4c4b-a675-31716b23a9fa
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: hikaricp.connections.active
      metadata_path: metadata.csv
      prefix: hikaricp.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10308
    source_type_name: hikaricp
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: コミュニティ
  sales_email: damien.bertau@blablacar.com
  support_email: damien.bertau@blablacar.com
categories: []
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/hikaricp/README.md
display_on_public_website: true
draft: false
git_integration_title: hikaricp
integration_id: hikaricp
integration_title: HikariCP
integration_version: 1.2.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: hikaricp
public_title: HikariCP
short_description: HikariCP と openmetrics v2 とのインテグレーション
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: HikariCP と openmetrics v2 とのインテグレーション
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: HikariCP
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要
[HikariCP][1] は、軽量かつ高速な JDBC コネクションプーリングフレームワークです。
このチェックでは、Datadog Agent を通じて HikariCP を監視しています。

## 計画と使用

### インフラストラクチャーリスト

HikariCP チェックをホストにインストールするには


1. [開発ツールキット][2]をインストールします。
 どのマシンでも。

2. `ddev release build hikaricp` を実行してパッケージをビルドします。

3. [Datadog Agent をダウンロードします][3]。

4. ビルドの成果物を Agent をインストール済みのホストにアップロードし、以下を実行します。
 `datadog-agent integration install -w
 path/to/hikaricp/dist/<ARTIFACT_NAME>.whl`.

### ブラウザトラブルシューティング

1. HikariCP のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `hikaricp/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル hikaricp/conf.yaml][4] を参照してください。

2. [Agent を再起動します][5]。

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `hikaricp` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "hikaricp" >}}


### ヘルプ

HikariCP には、イベントは含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。


[1]: https://github.com/brettwooldridge/HikariCP
[2]: https://docs.datadoghq.com/ja/developers/integrations/python/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-extras/blob/master/hikaricp/datadog_checks/hikaricp/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-extras/blob/master/hikaricp/metadata.csv
[8]: https://github.com/DataDog/integrations-extras/blob/master/hikaricp/assets/service_checks.json
[9]: https://docs.datadoghq.com/ja/help/