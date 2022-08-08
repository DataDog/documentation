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
- https://github.com/DataDog/integrations-extras/blob/master/speedtest/README.md
display_name: speedtest
draft: false
git_integration_title: speedtest
guid: 4bf81e32-170a-44f3-868d-1683ef39464f
integration_id: speedtest
integration_title: speedtest
integration_version: 1.0.0
is_public: true
kind: integration
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

Speedtest チェックは [Datadog Agent][2] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インストール

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Speedtest チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][3]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-speedtest==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][4]と同様にインテグレーションを構成します。

**注**: すべてのホストについて、[Speedtest CLI][1] をインストールし、使用前に Datadog Agent ユーザー (例: `sudo -u dd-agent speedtest`) として契約に同意する必要があります。

### コンフィギュレーション

1. Speedtest のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `speedtest.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[speedtest.d/conf.yaml のサンプル][5]を参照してください。

2. [Agent を再起動します][6]。

### 検証

[Agent の statusサブコマンド][7]を実行し、Checks セクションで `speedtest` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "speedtest" >}}


### イベント

Speedtest チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "speedtest" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。


[1]: https://www.speedtest.net/apps/cli
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/speedtest/datadog_checks/speedtest/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/speedtest/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/speedtest/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/