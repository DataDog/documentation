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

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに Puma チェックをインストールしてください。[バージョン 6.8 以前の Agent][5] または [Docker Agent][6] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][4]に関する Agent のガイドを参照してください。

1. [Datadog Agent をダウンロードします][7]。

2. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

   ```shell
      datadog-agent integration install -t datadog-puma==<INTEGRATION_VERSION>
   ```

3. [他のパッケージ化されたインテグレーション][8]と同様にインテグレーションを構成します。


### コンフィギュレーション

1. Puma のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `puma.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル puma.d/conf.yaml][9] を参照してください。

2. [Agent を再起動します][10]。

### 検証

[Agent の status サブコマンドを実行][11]し、Checks セクションの `puma` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "puma" >}}


### サービスのチェック

**puma.connection**: Agent が監視対象の Puma インスタンスに接続できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

### イベント

Puma には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][13]までお問合せください。

[1]: https://puma.io/
[2]: https://github.com/puma/puma#controlstatus-server
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[4]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/
[5]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[6]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[7]: https://app.datadoghq.com/account/settings#agent
[8]: https://docs.datadoghq.com/ja/getting_started/integrations/
[9]: https://github.com/DataDog/integrations-extras/blob/master/puma/datadog_checks/puma/data/conf.yaml.example
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-extras/blob/master/puma/metadata.csv
[13]: https://docs.datadoghq.com/ja/help/