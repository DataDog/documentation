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
- https://github.com/DataDog/integrations-extras/blob/master/ping/README.md
display_name: Ping
draft: false
git_integration_title: ping
guid: c3be63cb-678e-4421-b470-79c03b3fe3f1
integration_id: ping
integration_title: Ping
integration_version: 1.0.2
is_public: true
kind: インテグレーション
maintainer: jim.stanton@datadoghq.com
manifest_version: 1.0.0
metric_prefix: ネットワーク。
metric_to_check: network.ping.response_time
name: ping
public_title: Datadog-Ping インテグレーション
short_description: リモートホストへの接続を監視
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## 概要

このチェックでは、システムの [ping][1] コマンドを使用して、ホストの到達可能性をテストします。
また、オプションで、チェックから宛先ホストに送信されるメッセージの往復時間を測定します。

Ping は、インターネット制御メッセージプロトコル（ICMP）エコー要求パケットをターゲットホストに送信し、ICMP エコー応答を待機することで動作します。

ICMP パケットの作成には raw ソケットが必要であるため、このチェックでは ICMP エコー要求自体を生成するのではなく、システムの ping コマンドを使用します。raw ソケットの作成には Agent にないルート権限が必要です。ping コマンドは、`setuid` アクセスフラグを使用して昇格した権限で実行し、この問題を回避します。

## セットアップ

Ping チェックは [Datadog Agent][2] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インストール

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Ping チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][3]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   # Linux
   datadog-agent integration install -t datadog-ping==<INTEGRATION_VERSION>

   # Windows
   agent.exe integration install -t datadog-ping==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][4]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. ping のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `ping.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル ping.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンド][7]を実行し、Checks セクションで `ping` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "ping" >}}


### イベント

Ping チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "ping" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。


[1]: https://en.wikipedia.org/wiki/Ping_%28networking_utility%29
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/ping/datadog_checks/ping/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/ping/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/ping/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/