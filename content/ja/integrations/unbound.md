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
  - 'https://github.com/DataDog/integrations-extras/blob/master/unbound/README.md'
display_name: Unbound
draft: false
git_integration_title: unbound
guid: 2b31e667-1fd9-440f-9e96-c72bea3cf3ca
integration_id: unbound
integration_title: Unbound
is_public: true
kind: インテグレーション
maintainer: david.byron@avast.com
manifest_version: 1.0.0
metric_prefix: unbound.
metric_to_check: ''
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

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従ってホストに Unbound チェックをインストールしてください。[バージョン 6.8 以前の Agent][3] または [Docker Agent][4] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][2]に関する Agent のガイドを参照してください。

1. [Datadog Agent をダウンロードして起動][5]します。
2. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

   ```shell
   datadog-agent integration install -t datadog-unbound==<INTEGRATION_VERSION>
   ```
3. [他のパッケージ化されたインテグレーション][6]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `unbound.d/conf.yaml` ファイルを編集して、
   unbound メトリクスの収集を開始します。
    使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル unbound.d/conf.yaml][7] を参照してください。

2. [Agent を再起動します][8]。

### 検証

[Agent の status サブコマンドを実行][9]し、Checks セクションで `unbound` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "unbound" >}}


### サービスのチェック

**unbound.can_get_stats**
unbound-control が失敗した場合、または出力のパース中にエラーが発生した場合は CRITICAL を返します。それ以外の場合は OK を返します。

### イベント

Unbound チェックには、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

[1]: https://nlnetlabs.nl/documentation/unbound/unbound-control/
[2]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://app.datadoghq.com/account/settings#agent
[6]: https://docs.datadoghq.com/ja/getting_started/integrations/
[7]: https://github.com/DataDog/integrations-extras/blob/master/unbound/datadog_checks/unbound/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-extras/blob/master/unbound/metadata.csv
[11]: https://docs.datadoghq.com/ja/help/