---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    ASP.NET - Overview: assets/dashboards/overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - languages
  - log collection
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-core/blob/master/aspdotnet/README.md
display_name: ASP.NET
draft: false
git_integration_title: aspdotnet
guid: 475b0c6c-02e5-49ef-806b-9fab377f0839
integration_id: aspdotnet
integration_title: ASP.NET
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: aspdotnet.
metric_to_check: aspdotnet.request.wait_time
name: aspdotnet
public_title: Datadog-ASP.NET インテグレーション
short_description: ASP.NET サービスのメトリクスをリアルタイムに追跡。
support: コア
supported_os:
  - windows
---
## 概要

ASP.NET からメトリクスをリアルタイムに取得すると、以下のことができます。

- ASP.NET の状態を視覚化および監視できます。
- ASP.NET のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

### インストール

ASP.NET チェックは [Datadog Agent][1] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

1. ASP.NET のパフォーマンスデータの収集を開始するには、[Agent のコンフィギュレーションディレクトリ][2]のルートにある `conf.d/` フォルダーの `aspdotnet.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル aspdotnet.d/conf.yaml][3] を参照してください。

2. [Agent を再起動します][4]。

#### ログの収集
ASP.NET は IIS ロギングを使用します。ASP.NET リクエストおよび失敗に関するログを表示するには、[IIS のセットアップ手順][5]に従います。

ASP.NET アプリケーションに関する未処理の 500 レベルの例外およびイベントは、Windows Application EventLog を使用して表示できます。

### 検証

[Agent の `status` サブコマンドを実行][6]し、Checks セクションで `aspdotnet` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "aspdotnet" >}}


### イベント

ASP.NET チェックにはイベントは含まれません。

### サービスのチェック

ASP.NET チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/aspdotnet/datadog_checks/aspdotnet/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/integrations/iis/?tab=host#setup
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/aspdotnet/metadata.csv
[8]: https://docs.datadoghq.com/ja/help/