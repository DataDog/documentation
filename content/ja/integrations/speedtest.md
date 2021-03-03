---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Speedtest: assets/dashboards/speedtest.json
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - isp
  - ネットワーク
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/speedtest/README.md'
display_name: speedtest
draft: true
git_integration_title: speedtest
guid: 4bf81e32-170a-44f3-868d-1683ef39464f
integration_id: speedtest
integration_title: speedtest
is_public: false
kind: インテグレーション
maintainer: cody.lee@datadoghq.com
manifest_version: 1.0.0
metric_prefix: speedtest.
metric_to_check: speedtest.download.bandwidth
name: speedtest
public_title: Datadog-speedtest インテグレーション
short_description: speedtest-cli を使用して Speedtest の結果を実行します
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、Datadog Agent を通じて [Speedtest][1] を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに Speedtest チェックをインストールしてください。[バージョン 6.8 以前の Agent][4] または [Docker Agent][5] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][3]に関する Agent のガイドを参照してください。

1. [Datadog Agent をダウンロードして起動][6]します。
2. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

   ```shell
   datadog-agent integration install -t datadog-speedtest==<INTEGRATION_VERSION>
   ```
3. [他のパッケージ化されたインテグレーション][7]と同様にインテグレーションを構成します。

注: すべてのホストについて、ホストに [Speedtest CLI][1] をインストールし、使用前に Datadog Agent ユーザー (例: `sudo -u dd-agent speedtest`) として契約に同意する必要があります。

### コンフィギュレーション

1. Speedtest のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `speedtest.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[speedtest.d/conf.yaml のサンプル][8]を参照してください。

2. [Agent を再起動します][9]。

### 検証

[Agent の statusサブコマンドを実行][10]し、Checks セクションで `speedtest` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "speedtest" >}}


### サービスのチェック

Speedtest には、サービスのチェック機能は含まれません。

### イベント

Speedtest には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

[1]: https://www.speedtest.net/apps/cli
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/
[4]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[5]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[6]: https://app.datadoghq.com/account/settings#agent
[7]: https://docs.datadoghq.com/ja/getting_started/integrations/
[8]: https://github.com/DataDog/integrations-extras/blob/master/speedtest/datadog_checks/speedtest/data/conf.yaml.example
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/integrations-extras/blob/master/speedtest/metadata.csv
[12]: https://docs.datadoghq.com/ja/help/