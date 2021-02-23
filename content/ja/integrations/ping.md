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
  - 'https://github.com/DataDog/integrations-extras/blob/master/ping/README.md'
display_name: Ping
draft: false
git_integration_title: ping
guid: c3be63cb-678e-4421-b470-79c03b3fe3f1
integration_id: ping
integration_title: Ping
is_public: true
kind: インテグレーション
maintainer: jim.stanton@datadoghq.com
manifest_version: 1.0.0
metric_prefix: ネットワーク。
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

ICMP パケットの作成には raw ソケットが必要であり、raw ソケットの作成には Agent にないルート権限が必要であるため、このチェックでは ICMP エコー要求自体を生成するのではなく、システムの ping コマンドを使用します。ping コマンドは、`setuid` アクセスフラグを使用して昇格した権限で実行し、この問題を回避します。

## セットアップ

Ping チェックは [Datadog Agent][2] パッケージに**含まれていません**。

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに Ping チェックをインストールしてください。[バージョン 6.8 以前の Agent][4] または [Docker Agent][5] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][3]に関する Agent のガイドを参照してください。

1. [Datadog Agent をダウンロードして起動][2]します。
2. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

   ```shell
      datadog-agent integration install -t datadog-ping==<INTEGRATION_VERSION>
   ```
   <INTEGRATION_VERSION> はインテグレーションのバージョンです。datadog-ping の最初のバージョンは 1.0.0 で、その他のバージョンは [CHANGELOG][6] でご確認いただけます。
3. [他のパッケージ化されたインテグレーション][7]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. ping のパフォーマンスデータの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `ping.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル ping.d/conf.yaml][8] を参照してください。

2. [Agent を再起動します][9]。

### 検証

[Agent の status サブコマンドを実行][10]し、Checks セクションで `ping` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "ping" >}}


### サービスのチェック

**`network.ping.can_connect`**:

Agent がターゲットホストと通信できない場合は、`CRITICAL` を返します。ping が成功すると、`OK` を返します。

### イベント

Ping チェックには、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

[1]: https://en.wikipedia.org/wiki/Ping_(networking_utility%29
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/
[4]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[5]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[6]: https://github.com/DataDog/integrations-extras/blob/master/ping/CHANGELOG.md
[7]: https://docs.datadoghq.com/ja/getting_started/integrations/
[8]: https://github.com/DataDog/integrations-extras/blob/master/ping/datadog_checks/ping/data/conf.yaml.example
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[11]: https://github.com/DataDog/integrations-extras/blob/master/ping/metadata.csv
[12]: https://docs.datadoghq.com/ja/help/