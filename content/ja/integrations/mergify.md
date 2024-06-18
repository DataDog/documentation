---
app_id: mergify
app_uuid: 17230c84-50c7-4025-8fc8-69a9bc0bd502
assets:
  dashboards:
    Mergify merge queue overview: assets/dashboards/mergify_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: mergify.queue_checks_outcome
      metadata_path: metadata.csv
      prefix: mergify.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10349
    source_type_name: Mergify
author:
  homepage: https://mergify.com
  name: コミュニティ
  sales_email: hello@mergify.com
  support_email: support@mergify.com
categories:
- developer tools
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/mergify/README.md
display_on_public_website: true
draft: false
git_integration_title: mergify
integration_id: mergify
integration_title: Mergify
integration_version: 1.0.2
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: mergify
public_title: Mergify
short_description: Mergify マージキュー統計のインテグレーション
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
  - Submitted Data Type::Metrics
  - Category::Developer Tools
  configuration: README.md#Setup
  description: Mergify マージキュー統計のインテグレーション
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Mergify
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

このインテグレーションは、[Mergify][1] で構成された各リポジトリのマージキュー長を監視し、Mergify のグローバル可用性を追跡します。メトリクスを Datadog アカウントに送信することで、異常アラート用のモニターをセットアップし、マージキューのパフォーマンスを分析することができます。この Datadog インテグレーションを使用して、Mergify サービスの可用性を意識し、開発ワークフローを最適化することができます。

## 計画と使用

### インフラストラクチャーリスト

#### リリースから

`datadog-agent integration install -t datadog-mergify==<INTEGRATION_VERSION>` を実行します。

#### ソースから

Mergify チェックをホストにインストールするには

1. マシンに[開発ツール][2]をインストールします。

2. `ddev release build mergify` を実行してパッケージをビルドします。

3. [Datadog Agent をダウンロードします][3]。

4. ビルドの成果物を Agent をインストール済みのホストにアップロードし、以下を実行します。
 `datadog-agent integration install -w
 path/to/mergify/dist/<ARTIFACT_NAME>.whl`.

### ブラウザトラブルシューティング

1. Mergify の[メトリクス](#metrics)の収集を開始するには、[Agent のコンフィギュレーションディレクトリ][4]のルートにある `conf.d/` フォルダーの `mergify.d/conf.yaml` ファイルを編集します。

   使用可能なすべての構成オプションの詳細については、サンプル [mergify.d/conf.yaml.example][5] ファイルを参照してください。

2. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンド][7]を実行し、Checks セクションで `mergify` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "mergify" >}}


### ヘルプ

Mergify には、イベントは含まれません。

## ヘルプ

ご不明な点は、[Mergify サポート][1]までお問い合わせください。

[1]: https://mergify.com
[2]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/#configure-the-developer-tool
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/mergify/datadog_checks/mergify/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/mergify/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/mergify/assets/service_checks.json