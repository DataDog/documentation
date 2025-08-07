---
app_id: mergify
app_uuid: 17230c84-50c7-4025-8fc8-69a9bc0bd502
assets:
  dashboards:
    Mergify merge queue overview [deprecated]: assets/dashboards/mergify_overview.json
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
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/mergify/README.md
display_on_public_website: true
draft: false
git_integration_title: mergify
integration_id: mergify
integration_title: Mergify (非推奨)
integration_version: 1.0.2
is_public: true
manifest_version: 2.0.0
name: mergify
public_title: Mergify (非推奨)
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
  - Offering::Integration
  configuration: README.md#Setup
  description: Mergify マージキュー統計のインテグレーション
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Mergify (非推奨)
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

**重要**: 2024 年 10 月 10 日以降、このインテグレーションはサポートされません。代わりに [新しいインテグレーション][1] を使用してください。

このインテグレーションは、[Mergify][2] で設定された各リポジトリのマージ キューの長さを監視し、Mergify のグローバル 可用性を追跡します。メトリクスを Datadog アカウントに送信することで、異常検知アラート用のモニターを設定し、マージ キューのパフォーマンスを分析できます。この Datadog インテグレーションを使用すれば、Mergify サービスの可用性を常に把握し、開発ワークフローを最適化できます。

## セットアップ

### インストール

#### リリースから

`datadog-agent integration install -t datadog-mergify==<INTEGRATION_VERSION>` を実行します。

#### ソースから

Mergify チェックをホストにインストールするには

1. 任意のマシンに [デベロッパー ツール][3] をインストールします。

2. `ddev release build mergify` を実行してパッケージをビルドします。

3. [Datadog Agent をダウンロードします][4]。

4. ビルドの成果物を Agent をインストール済みのホストにアップロードし、以下を実行します。
 `datadog-agent integration install -w
 path/to/mergify/dist/<ARTIFACT_NAME>.whl`.

### 構成

1. [Agent の構成ディレクトリ][5] のルートにある `conf.d/` フォルダー内の `mergify.d/conf.yaml` ファイルを編集して、Mergify の [メトリクス](#metrics) 収集を開始します。

   利用可能なすべての設定オプションについては、サンプル [mergify.d/conf.yaml.example][6] ファイルを参照してください。

2. [Agent を再起動します][7]。

### 検証

[Agent の status サブコマンド][8] を実行し、Checks セクションに `mergify` が表示されていることを確認します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "mergify" >}}


### イベント

Mergify には、イベントは含まれません。

## トラブルシューティング

お困りの場合は [Mergify サポート][2] までお問い合わせください。

[1]: https://app.datadoghq.com/integrations/mergify-oauth
[2]: https://mergify.com
[3]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/#configure-the-developer-tool
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/mergify/datadog_checks/mergify/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/mergify/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/mergify/assets/service_checks.json