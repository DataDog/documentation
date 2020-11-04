---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - ネットワーク
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/pihole/README.md'
display_name: pihole
draft: true
git_integration_title: pihole
guid: f0a69a1e-3961-43e2-9848-469342734e34
integration_id: pihole
integration_title: Pi-hole
is_public: false
kind: インテグレーション
maintainer: monganai@tcd.ie
manifest_version: 1.0.0
metric_prefix: pihole.
metric_to_check: ''
name: pihole
public_title: Datadog-Pi-hole インテグレーション
short_description: Pi-hole のデフォルトメトリクスを収集するインテグレーション
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、Datadog Agent を通じて [Pi-hole][1] を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Pi-hole チェックをホストにインストールするには

1. マシンに[開発ツールキット][3]をインストールします。
2. `ddev release build pihole` を実行してパッケージをビルドします。
3. [Datadog Agent をダウンロードします][4]。
4. ビルドアーティファクトを Agent のあるホストにアップロードし、`datadog-agent integration install -w path/to/pihole/dist/<アーティファクト名>.whl` を実行します。

### コンフィギュレーション

1. Pi-hole のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `pihole.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[pihole.d/conf.yaml のサンプル][5]を参照してください。

2. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `pihole` を探します。


### メトリクス
{{< get-metrics-from-git "pihole" >}}


### サービスのチェック

**`pihole.running`**:

Agent がターゲットホストと通信できない場合は、`CRITICAL` を返します。Pi-hole への接続が成功すると、`OK` を返します。

### イベント

Pi-hole には、イベントは含まれません。





[1]: https://pi-hole.net/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/#developer-toolkit
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://github.com/DataDog/integrations-extras/blob/master/pihole/datadog_checks/pihole/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/pihole/metadata.csv