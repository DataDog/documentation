---
app_id: aspdotnet
app_uuid: 7d801e88-1fad-433e-81d9-07449fd45e13
assets:
  dashboards:
    ASP.NET - Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: aspdotnet.request.wait_time
      metadata_path: metadata.csv
      prefix: aspdotnet.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10039
    source_type_name: ASP.NET
  logs:
    source: iis
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- languages
- log collection
- windows
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/aspdotnet/README.md
display_on_public_website: true
draft: false
git_integration_title: aspdotnet
integration_id: aspdotnet
integration_title: ASP.NET
integration_version: 4.1.0
is_public: true
manifest_version: 2.0.0
name: aspdotnet
public_title: ASP.NET
short_description: ASP.NET サービスのメトリクスをリアルタイムに追跡。
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::言語
  - Category::ログの収集
  - Category::Windows
  - Supported OS::Windows
  - Offering::Integration
  configuration: README.md#Setup
  description: ASP.NET サービスのメトリクスをリアルタイムに追跡。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: ASP.NET
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

ASP.NET からメトリクスをリアルタイムに取得すると、以下のことができます。

- ASP.NET の状態を視覚化および監視できます。
- ASP.NET のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

### インストール

ASP.NET チェックは [Datadog Agent][1] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### 構成

1. ASP.NET のパフォーマンスデータの収集を開始するには、[Agent のコンフィギュレーションディレクトリ][2]のルートにある `conf.d/` フォルダーの `aspdotnet.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル aspdotnet.d/conf.yaml][3] を参照してください。

2. [Agent を再起動します][4]。

**注**: このチェックのバージョン 1.9.0 以降では、メトリクスの収集に新しい実装を使用し、これには Python 3 が必要です。Python 3 の使用が不可能なホストの場合や、このチェックのレガシーバージョンを使用する場合は、以下の[コンフィグ][5]を参照してください。

#### ログ収集

ASP.NET は IIS ロギングを使用します。ASP.NET リクエストおよび失敗に関するログを表示するには、[IIS のセットアップ手順][6]に従います。

ASP.NET アプリケーションに関する未処理の 500 レベルの例外およびイベントは、Windows Application EventLog を使用して表示できます。

### 検証

[Agent の `status` サブコマンドを実行][7]し、Checks セクションで `aspdotnet` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "aspdotnet" >}}


### イベント

ASP.NET チェックにはイベントは含まれません。

### サービスチェック

ASP.NET チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/aspdotnet/datadog_checks/aspdotnet/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://github.com/DataDog/integrations-core/blob/7.33.x/aspdotnet/datadog_checks/aspdotnet/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/integrations/iis/?tab=host#setup
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/aspdotnet/metadata.csv
[9]: https://docs.datadoghq.com/ja/help/