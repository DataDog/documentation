---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- network
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/unbound/README.md
display_name: Unbound
draft: false
git_integration_title: unbound
guid: 2b31e667-1fd9-440f-9e96-c72bea3cf3ca
integration_id: unbound
integration_title: Unbound
integration_version: 1.0.1
is_public: true
kind: インテグレーション
maintainer: david.byron@avast.com
manifest_version: 1.0.0
metric_prefix: unbound.
metric_to_check: unbound.time.up
name: unbound
public_title: Datadog-Unbound インテグレーション
short_description: unbound メトリクスを収集する Datadog インテグレーション
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## 概要

このチェックは、Datadog Agent を通じて [Unbound][1] を監視します。

unbound サービスからメトリクスをリアルタイムに取得して、以下のことができます。

- unbound の状態を視覚化して監視します。

## セットアップ

Unbound チェックは [Datadog Agent][2] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インストール

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Unbound チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][3]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-unbound==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][4]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `unbound.d/conf.yaml` ファイルを編集して、
   unbound メトリクスの収集を開始します。
    使用可能なすべての構成オプションの詳細については、[サンプル unbound.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `unbound` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "unbound" >}}


### イベント

Unbound チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "unbound" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。


[1]: https://nlnetlabs.nl/documentation/unbound/unbound-control/
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/unbound/datadog_checks/unbound/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/unbound/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/unbound/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/