---
app_id: winkmem
app_uuid: 70d34855-e504-4716-be0a-cc9d7d82e5ab
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: winkmem.paged_pool_bytes
      metadata_path: metadata.csv
      prefix: winkmem.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10254
    source_type_name: Windows Kernel Memory
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- OS & システム
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/winkmem/README.md
display_on_public_website: true
draft: false
git_integration_title: winkmem
integration_id: winkmem
integration_title: Windows Kernel Memory
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: winkmem
public_title: Windows Kernel Memory
short_description: Windows カーネルのメモリ割り当てを監視します。
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Category::OS & System
  configuration: README.md#Setup
  description: Windows カーネルのメモリ割り当てを監視します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Windows Kernel Memory
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Datadog で視覚化とモニターを作成するために、Windows カーネルメモリ使用量を取得します。

**注:** このインテグレーションによって収集されるメトリクスのリストは、マイナーな Agent のバージョン間で変更される可能性があります。そのような変更は、Agent の変更履歴に記載されない場合があります。

## 計画と使用

### インフラストラクチャーリスト

Windows Kernel Memory インテグレーションは [Datadog Agent][1] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### ブラウザトラブルシューティング

1. [Agent のコンフィギュレーションディレクトリ][2]のルートにある `conf.d/` フォルダーの `winkmem.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル winkmem.d/conf.yaml.example][3] を参照してください。

2. [Agent を再起動します][4]。

### 検証

[Agent の status サブコマンドを実行][5]し、Checks セクションで `winkmem` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "winkmem" >}}


### ヘルプ

Windows Kernel Memory インテグレーションには、イベントは含まれません。

### ヘルプ

Windows Kernel Memory インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/winkmem.d/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://github.com/DataDog/integrations-core/blob/master/winkmem/metadata.csv
[6]: https://docs.datadoghq.com/ja/help/