---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - languages
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/aspdotnet/README.md'
display_name: ASP.NET
git_integration_title: aspdotnet
guid: 475b0c6c-02e5-49ef-806b-9fab377f0839
integration_id: aspdotnet
integration_title: ASP.NET
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: aspdotnet.
metric_to_check: aspdotnet.request.wait_time
name: aspdotnet
public_title: Datadog-ASP.NET インテグレーション
short_description: ASP.NET サービスのメトリクスをリアルタイムに追跡
support: コア
supported_os:
  - windows
---
## 概要

ASP.NET サービスからメトリクスをリアルタイムに取得すると、以下のことができます。

* ASP.NET の状態を視覚化および監視できます。
* ASP.NET のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ
### インストール

ASP.NET チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィグレーション

1. ASP.NET のパフォーマンスデータの収集を開始するには、[Agent の構成ディレクトリ][3]のルートにある `conf.d/` フォルダーの `aspdotnet.d/conf.yaml` ファイルを編集します。

    使用可能なすべての構成オプションの詳細については、[サンプル aspdotnet.d/conf.yaml][4] を参照してください。

2. [Agent を再起動します][5]。

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

[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/aspdotnet/datadog_checks/aspdotnet/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/aspdotnet/metadata.csv
[8]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}