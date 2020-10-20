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
  - web
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/puma/README.md'
display_name: Puma
draft: true
git_integration_title: puma
guid: 93264c0f-a4d1-447d-81b6-bee3eb891df3
integration_id: puma
integration_title: Puma
is_public: false
kind: インテグレーション
maintainer: justin.morris@ferocia.com.au
manifest_version: 1.0.0
metric_prefix: puma.
metric_to_check: puma.workers
name: puma
public_title: Datadog-Puma インテグレーション
short_description: Ruby および Rack のための高速コンカレントウェブサーバー
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックでは、[コントロール/ステータス][2]サーバーにより提供される Puma メトリクスエンドポイントを使用して、Datadog Agent 経由で [Puma][1] を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][3]のガイドを参照してこの手順を行ってください。

### インストール

Puma チェックをホストにインストールするには

1. マシンに[開発ツールキット][4]をインストールします。
2. `ddev release build puma` を実行してパッケージをビルドします。
3. [Datadog Agent をダウンロードします][5]。
4. ビルドアーティファクトを Agent のあるホストにアップロードし、`datadog-agent integration install -w path/to/puma/dist/<ARTIFACT_NAME>.whl` を実行します。

### コンフィギュレーション

1. Puma のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `puma.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル puma.d/conf.yaml][6] を参照してください。

2. [Agent を再起動します][7]。

### 検証

[Agent の status サブコマンドを実行][8]し、Checks セクションの `puma` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "puma" >}}


### サービスのチェック

**puma.connection**: Agent が監視対象の Puma インスタンスに接続できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

### イベント

Puma には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

[1]: https://puma.io/
[2]: https://github.com/puma/puma#controlstatus-server
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[4]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/#developer-toolkit
[5]: https://app.datadoghq.com/account/settings#agent
[6]: https://github.com/DataDog/integrations-extras/blob/master/puma/datadog_checks/puma/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/puma/metadata.csv
[10]: https://docs.datadoghq.com/ja/help/