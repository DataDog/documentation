---
app_id: dotnetclr
app_uuid: 2147d078-2742-413e-83eb-58400657de56
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: dotnetclr.memory.time_in_gc
      metadata_path: metadata.csv
      prefix: dotnetclr.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10069
    source_type_name: .NET CLR
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- languages
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/dotnetclr/README.md
display_on_public_website: true
draft: false
git_integration_title: dotnetclr
integration_id: dotnetclr
integration_title: .NET CLR
integration_version: 2.1.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: dotnetclr
public_title: .NET CLR
short_description: Dotnetclr の状態を視覚化および監視
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Category::言語
  configuration: README.md#Setup
  description: Dotnetclr の状態を視覚化および監視
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: .NET CLR
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

.NET CLR サービスからメトリクスをリアルタイムに取得して、以下のことができます。

- .NET CLR の状態を視覚化および監視できます。
- .NET CLR のフェイルオーバーとイベントの通知を受けることができます。

## 計画と使用

### インフラストラクチャーリスト

.NET CLR チェックは [Datadog Agent][1] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### ブラウザトラブルシューティング

1. .NET CLR のパフォーマンスデータの収集を開始するには、[Agent の構成ディレクトリ][2]のルートにある `conf.d/` フォルダーの `dotnetclr.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル dotnetclr.d/conf.yaml][3] を参照してください。
2. [Agent を再起動します][4]。

**注**: このチェックのバージョン 1.10.0 以降では、メトリクスの収集に新しい実装を使用し、これには Python 3 が必要です。Python 3 の使用が不可能なホストの場合や、このチェックのレガシーバージョンを使用する場合は、以下の[コンフィグ][5]を参照してください。

## 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `dotnetclr` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "dotnetclr" >}}


### ヘルプ

.NET CLR チェックには、サービスのチェック機能は含まれません。

### ヘルプ

.NET CLR チェックには、イベントは含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/dotnetclr/datadog_checks/dotnetclr/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://github.com/DataDog/integrations-core/blob/7.33.x/dotnetclr/datadog_checks/dotnetclr/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/dotnetclr/metadata.csv
[8]: https://docs.datadoghq.com/ja/help/