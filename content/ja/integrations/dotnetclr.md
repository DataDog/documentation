---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - languages
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/dotnetclr/README.md'
display_name: .NET CLR
git_integration_title: dotnetclr
guid: 3d21557e-65bd-4b66-99b9-5521f32b5957
integration_id: dotnetclr
integration_title: .NET CLR
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: dotnetclr.
metric_to_check: dotnetclr.memory.time_in_gc
name: dotnetclr
public_title: Datadog-.NET CLR インテグレーション
short_description: Dotnetclr の状態を視覚化および監視
support: コア
supported_os:
  - windows
---
## 概要

Dotnetclr サービスからメトリクスをリアルタイムに取得して、以下のことができます。

* Dotnetclr の状態を視覚化および監視できます。
* Dotnetclr のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ
### インストール

Dotnetclr チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィグレーション

1. Dotnetclr のパフォーマンスデータの収集を開始するには、[Agent の構成ディレクトリ][3]のルートにある `conf.d/` フォルダーの `dotnetclr.d/conf.yaml` ファイルを編集します。
    使用可能なすべての構成オプションの詳細については、[サンプル dotnetclr.d/conf.yaml][4] を参照してください。

2. [Agent を再起動します][5]。

## 検証

[Agent の `status` サブコマンドを実行][4]し、Checks セクションで `dotnetclr` を探します。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}