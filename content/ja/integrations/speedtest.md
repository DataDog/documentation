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

Speedtest チェックをホストにインストールするには

1. マシンに[開発ツールキット][3]をインストールします。
2. `ddev release build speedtest` を実行してパッケージをビルドします。
3. [Datadog Agent をダウンロードします][4]。
4. ビルドアーティファクトを Agent のあるホストにアップロードし、`datadog-agent integration install -w path/to/speedtest/dist/<ARTIFACT_NAME>.whl` を実行します。

注: すべてのホストについて、ホストに [Speedtest CLI][1] をインストールし、使用前に Datadog Agent ユーザー (例: `sudo -u dd-agent speedtest`) として契約に同意する必要があります。

### コンフィギュレーション

1. Speedtest のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `speedtest.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[speedtest.d/conf.yaml のサンプル][5]を参照してください。

2. [Agent を再起動します][6]。

### 検証

[Agent の statusサブコマンドを実行][7]し、Checks セクションで `speedtest` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "speedtest" >}}


### サービスのチェック

Speedtest には、サービスのチェック機能は含まれません。

### イベント

Speedtest には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

[1]: https://www.speedtest.net/apps/cli
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/#developer-toolkit
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://github.com/DataDog/integrations-extras/blob/master/speedtest/datadog_checks/speedtest/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/speedtest/metadata.csv
[9]: https://docs.datadoghq.com/ja/help/