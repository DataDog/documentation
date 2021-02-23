---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Cyral Overview: assets/dashboards/cyral_overview.json
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - 監視
  - セキュリティ
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/cyral/README.md'
display_name: Cyral
draft: true
git_integration_title: cyral
guid: 2a854a73-b0da-4954-b34e-fc1cd05ba8e8
integration_id: cyral
integration_title: Cyral
is_public: false
kind: インテグレーション
maintainer: product@cyral.com
manifest_version: 1.0.0
metric_prefix: cyral.
metric_to_check: cyral.analysis_time
name: cyral
public_title: Cyral
short_description: Cyral インスタンスモニタリング MySQL からランタイムメトリクスを収集。
support: contrib
supported_os:
  - linux
---
## 概要

このチェックは、Datadog Agent を通じて [Cyral][1] MySQL サイドカーを監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに Cyral チェックをインストールしてください。[バージョン 6.8 以前の Agent][4] または [Docker Agent][5] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][3]に関する Agent のガイドを参照してください。

1. [Datadog Agent をダウンロードして起動][6]します。
2. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

   ```shell
   datadog-agent integration install -t datadog-cyral==<INTEGRATION_VERSION>
   ```

3. [他のパッケージ化されたインテグレーション][7]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. cyral のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `cyral.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル cyral.d/conf.yaml][8] を参照してください。

    ```yaml
    init_config:

    instances:
     # url of the metrics endpoint of prometheus
     - prometheus_url: http://localhost:9018/metrics
    ```

2. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][9]し、Checks セクションで `cyral` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "cyral" >}}


### サービスのチェック

Cyral には、サービスのチェック機能は含まれません。

### イベント

Cyral には、イベントは含まれません。

## トラブルシューティング

### Agent が接続できない

```text
    cyral
    -------
      - instance #0 [ERROR]: "('Connection aborted.', error(111, 'Connection refused'))"
      - Collected 0 metrics, 0 events & 0 service check
```

`cyral.yaml` 内の `url` が正しいかどうかを確認してください。

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

[1]: https://cyral.com/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/
[4]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[5]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/getting_started/integrations/
[8]: https://github.com/DataDog/integrations-extras/blob/master/cyral/datadog_checks/cyral/data/conf.yaml.example
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-extras/blob/master/cyral/metadata.csv
[11]: https://docs.datadoghq.com/ja/help/