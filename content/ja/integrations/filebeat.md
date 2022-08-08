---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- os & system
creates_events: false
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/filebeat/README.md
display_name: Filebeat
draft: false
git_integration_title: filebeat
guid: 3bb6a789-d1e3-465c-9bff-ea2a43ae2f59
integration_id: filebeat
integration_title: Filebeat
integration_version: 1.2.0
is_public: true
kind: インテグレーション
maintainer: jean@tripping.com
manifest_version: 1.0.0
metric_prefix: filebeat.
metric_to_check: filebeat.registry.unprocessed_bytes
name: filebeat
public_title: Filebeat
short_description: 軽量ログシッパー
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## 概要

Filebeat サービスからメトリクスをリアルタイムに取得して、以下のことができます。

- Filebeat の状態を視覚化および監視できます。
- Filebeat のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

Filebeat チェックは [Datadog Agent][1] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インストール

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Filebeat チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][2]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-filebeat==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][3]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. Filebeat の[メトリクス](#metrics)を収集するには、[Agent のコンフィギュレーションディレクトリ][4]のルートにある `conf.d/` フォルダーの `filebeat.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル filebeat.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

## 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `filebeat` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "filebeat" >}}


### イベント

Filebeat チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "filebeat" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/ja/getting_started/integrations/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/filebeat/datadog_checks/filebeat/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/filebeat/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/filebeat/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/