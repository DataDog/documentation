---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- languages
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/dotnetclr/README.md
display_name: .NET CLR
draft: false
git_integration_title: dotnetclr
guid: 3d21557e-65bd-4b66-99b9-5521f32b5957
integration_id: dotnetclr
integration_title: .NET CLR
integration_version: 1.12.1
is_public: true
kind: インテグレーション
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

.NET CLR サービスからメトリクスをリアルタイムに取得して、以下のことができます。

- .NET CLR の状態を視覚化および監視できます。
- .NET CLR のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

### インストール

.NET CLR チェックは [Datadog Agent][1] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

1. .NET CLR のパフォーマンスデータの収集を開始するには、[Agent の構成ディレクトリ][2]のルートにある `conf.d/` フォルダーの `dotnetclr.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル dotnetclr.d/conf.yaml][3] を参照してください。
2. [Agent を再起動します][4]。

**注**: このチェックのバージョン 1.10.0 以降では、メトリクスの収集に新しい実装を使用し、これには Python 3 が必要です。Python 3 の使用が不可能なホストの場合や、このチェックのレガシーバージョンを使用する場合は、以下の[コンフィグ][5]を参照してください。

## 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `dotnetclr` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "dotnetclr" >}}


### サービスのチェック

.NET CLR チェックには、サービスのチェック機能は含まれません。

### イベント

.NET CLR チェックには、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/dotnetclr/datadog_checks/dotnetclr/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://github.com/DataDog/integrations-core/blob/7.33.x/dotnetclr/datadog_checks/dotnetclr/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/dotnetclr/metadata.csv
[8]: https://docs.datadoghq.com/ja/help/