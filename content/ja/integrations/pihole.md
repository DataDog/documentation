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
draft: false
git_integration_title: pihole
guid: f0a69a1e-3961-43e2-9848-469342734e34
integration_id: pihole
integration_title: Pi-hole
is_public: true
kind: integration
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

このパッケージは [Datadog Agent][2] パッケージに**含まれていません**。

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに Pi-hole チェックをインストールしてください。[バージョン 6.8 以前の Agent][4] または [Docker Agent][5] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][3]に関する Agent のガイドを参照してください。

1. [Datadog Agent をダウンロードします][2]。

2. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

   ```shell
      datadog-agent integration install -t datadog-pihole==<INTEGRATION_VERSION>
   ```

3. [他のパッケージ化されたインテグレーション][6]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. Pi-hole のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `pihole.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[pihole.d/conf.yaml のサンプル][7]を参照してください。

2. [Agent を再起動します][8]。

### 検証

[Agent の status サブコマンドを実行][9]し、Checks セクションで `pihole` を探します。


### メトリクス
{{< get-metrics-from-git "pihole" >}}


### サービスのチェック

**`pihole.running`**:

Agent がターゲットホストと通信できない場合は、`CRITICAL` を返します。Pi-hole への接続が成功すると、`OK` を返します。

### イベント

Pi-hole には、イベントは含まれません。

## トラブルシューティング


ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。




[1]: https://pi-hole.net/
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/
[4]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[5]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[6]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[7]: https://github.com/DataDog/integrations-extras/blob/master/pihole/datadog_checks/pihole/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-extras/blob/master/pihole/metadata.csv
[11]: https://docs.datadoghq.com/ja/help/