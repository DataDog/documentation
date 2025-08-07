---
app_id: scaphandre
app_uuid: 0aa80baa-7ba6-4264-97ae-5475a6f796dc
assets:
  dashboards:
    scaphandre_overview: assets/dashboards/scaphandre_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - scaphandre.host.cpu.frequency
      metadata_path: metadata.csv
      prefix: scaphandre.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 15882148
    source_type_name: Scaphandre
  logs: {}
author:
  homepage: https://github.com/hubblo-org/scaphandre
  name: Sarah
  sales_email: sarah.witt@datadoghq.com
  support_email: sarah.witt@datadoghq.com
categories:
- OS & システム
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/scaphandre/README.md
display_on_public_website: true
draft: false
git_integration_title: scaphandre
integration_id: scaphandre
integration_title: Scaphandre
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: scaphandre
public_title: Scaphandre
short_description: ベアメタル マシンの電力使用量を測定するモニタリング エージェント
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
  - Category::OS & System
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: ベアメタル マシンの電力使用量を測定するモニタリング エージェント
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Scaphandre
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

このチェックは、ベアメタル マシンの電力使用量を測定するモニタリング エージェントである [Scaphandre][1] を監視します。RAPL と MsrRAPL を powercap 経由で利用します。プロジェクトの目的は、企業でも個人でも自社のテック サービスの電力消費を測定し、そのデータを任意のモニタリング基盤やデータ分析ツールチェーンへ便利な形で送信できるようにすることです。

## セットアップ

### インストール

Scaphandre チェックをホストにインストールする手順


1. 任意のマシンに [デベロッパー ツールキット][2] をインストールします。インストールするツールキットは、プラットフォームとアーキテクチャによって異なります。

2. 次のコマンドを実行してパッケージをビルドします:
    ```
    ddev release build scaphandre
    ```

3. [Datadog Agent をダウンロードします][3]。

4. ビルド成果物を Agent が稼働している任意のホストにアップロードし、次のコマンドを実行します:
    ```
    datadog-agent integration install -w path/to/scaphandre/dist/<ARTIFACT_NAME>.whl
    ```

### 構成

[Agent の設定ディレクトリ][4] のルートにある `conf.d/` フォルダー内の `scaphandre.d/conf.yaml` ファイルを編集します。利用可能なすべての設定オプションについては、[sample scaphandre.d/conf.yaml][5] を参照してください。たとえば、Scaphandre のコマンドライン タグを保護し、機微なデータが Datadog に取り込まれるのを防ぐには、`exclude_labels` 設定オプションを使用します。

Scaphandre のメトリクスの送信を開始するには、[Agent を再起動][6] してください。

### 検証

[Agent の status サブコマンド][7] を実行し、**Checks** セクションに `scaphandre` が表示されていることを確認します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "scaphandre" >}}


### サービスチェック

Scaphandre にはサービス チェックが含まれていません。

### イベント

Scaphandre にはイベントは含まれていません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

[1]: https://github.com/hubblo-org/scaphandre
[2]: https://docs.datadoghq.com/ja/developers/integrations/python/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/scaphandre/datadog_checks/scaphandre/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/scaphandre/metadata.csv
[9]: https://docs.datadoghq.com/ja/help/