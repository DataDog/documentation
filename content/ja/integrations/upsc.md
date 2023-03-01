---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- os & system
creates_events: false
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/upsc/README.md
display_name: UPSC
draft: false
git_integration_title: upsc
guid: f14607ca-0e30-4c7f-9564-fbdb46ca3030
integration_id: upsc
integration_title: UPSC
integration_version: 1.0.1
is_public: true
kind: インテグレーション
maintainer: '@platinummonkey'
manifest_version: 1.0.0
metric_prefix: upsc.
metric_to_check: upsc.battery.charge
name: upsc
public_title: UPSC
short_description: UPS バッテリーの UPSC 統計コレクター
support: contrib
supported_os:
- linux
---



## 概要

UPSC を通じて UPSD サービスからメトリクスをリアルタイムに取得すると、以下のことができます。

- UPS バッテリーの健全性と状態を視覚化および監視できます。
- UPS のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

UPSC チェックは [Datadog Agent][1] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インストール

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い UPSC チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][2]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-upsc==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][3]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. UPSC の[メトリクス](#metrics)を収集するには、[Agent のコンフィギュレーションディレクトリ][4]のルートにある `conf.d/` フォルダーの `upsc.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル upsc.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

## 検証

[Agent の status サブコマンド][7]を実行し、Checks セクションで `upsc` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "upsc" >}}


### イベント

UPSC チェックには、イベントは含まれません。

### サービスのチェック

UPSC チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/ja/getting_started/integrations/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/upsc/datadog_checks/upsc/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/upsc/metadata.csv
[9]: http://docs.datadoghq.com/help