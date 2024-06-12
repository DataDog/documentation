---
app_id: システム
app_uuid: 17477b56-4487-4b00-8820-70c6f64ae3c6
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: system.inodes.total
      metadata_path: metadata.csv
      prefix: system.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Linux proc extras
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- os & system
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/linux_proc_extras/README.md
display_on_public_website: true
draft: false
git_integration_title: linux_proc_extras
integration_id: システム
integration_title: Linux Proc Extras
integration_version: 2.5.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: linux_proc_extras
public_title: Linux Proc Extras
short_description: linux_proc_extras の状態を視覚化および監視。
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::OS とシステム
  configuration: README.md#Setup
  description: linux_proc_extras の状態を視覚化および監視。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Linux Proc Extras
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

linux_proc_extras サービスからメトリクスをリアルタイムに取得して、以下のことができます。

- linux_proc_extras の状態を視覚化および監視できます。
- linux_proc_extras のフェイルオーバーとイベントの通知を受けることができます。

## 計画と使用

### インフラストラクチャーリスト

Linux_proc_extras チェックは [Datadog Agent][1] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### ブラウザトラブルシューティング

1. [Agent の構成ディレクトリ][2]のルートにある `conf.d/` フォルダーの `linux_proc_extras.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル linux_proc_extras.d/conf.yaml][3] を参照してください。

2. [Agent を再起動します][4]。

### 検証

[Agent の status サブコマンドを実行][5]し、Checks セクションで `linux_proc_extras` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "linux_proc_extras" >}}


### ヘルプ

Linux Proc Extras チェックには、イベントは含まれません。

### ヘルプ

Linux Proc Extras チェックには、サービスチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/linux_proc_extras/datadog_checks/linux_proc_extras/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/linux_proc_extras/metadata.csv
[7]: https://docs.datadoghq.com/ja/help/