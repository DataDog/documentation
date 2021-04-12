---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - モニター
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/portworx/README.md'
display_name: Portworx
draft: false
git_integration_title: portworx
guid: 858a4b03-3f75-4019-8ba8-46b00d5aeb46
integration_id: portworx
integration_title: Portworx
is_public: true
kind: インテグレーション
maintainer: paul@portworx.com
manifest_version: 1.0.0
metric_prefix: portworx.
name: portworx
public_title: Datadog-Portworx インテグレーション
short_description: Portworx インスタンスからランタイムメトリクスを収集
support: contrib
supported_os:
  - linux
---
## 概要

Portworx サービスからメトリクスをリアルタイムに取得して、以下のことができます。

- Portworx クラスターの健全性とパフォーマンスを監視できます。
- Portworx ボリュームのディスク使用状況、レイテンシー、スループットを追跡できます。

## セットアップ

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに Portworx チェックをインストールしてください。[バージョン 6.8 以前の Agent][2] または [Docker Agent][3] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][1]に関する Agent のガイドを参照してください。

1. [Datadog Agent をダウンロードして起動][4]します。
2. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

   ```shell
   datadog-agent integration install -t datadog-portworx==<INTEGRATION_VERSION>
   ```

3. [他のパッケージ化されたインテグレーション][5]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. Portworx の[メトリクス](#metrics)を収集するには、[Agent のコンフィギュレーションディレクトリ][6]のルートにある `conf.d/` フォルダーの `portworx.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル portworx.d/conf.yaml][7] を参照してください。

    ```yaml
    init_config:

    instances:
     # url of the metrics endpoint of prometheus
     - prometheus_endpoint: http://localhost:9001/metrics
    ```

2. [Agent を再起動します][8]。

### 検証

[Agent の `info` サブコマンドを実行すると][9]、以下のような内容が表示されます。

## 互換性

Portworx チェック機能は、Portworx 1.4.0 以前のバージョンと互換性があります。

## 収集データ

### メトリクス
{{< get-metrics-from-git "portworx" >}}


### イベント

Portworx チェックには、イベントは含まれません。

## トラブルシューティング

### Agent が接続できない

```text
    portworx
    -------
      - instance #0 [ERROR]: "('Connection aborted.', error(111, 'Connection refused'))"
      - Collected 0 metrics, 0 events & 0 service check
```

`portworx.yaml` 内の `url` が正しいかどうかを確認してください。

## その他の参考資料

インフラストラクチャーの監視の詳細および Datadog の全インテグレーションについては、[ブログ記事][11]を参照してください。

[1]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/
[2]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://docs.datadoghq.com/ja/getting_started/integrations/
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-extras/blob/master/portworx/datadog_checks/portworx/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ja/agent/faq/agent-status-and-information/
[10]: https://github.com/DataDog/integrations-extras/blob/master/portworx/metadata.csv
[11]: https://www.datadoghq.com/blog