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
- https://github.com/DataDog/integrations-extras/blob/master/portworx/README.md
display_name: Portworx
draft: false
git_integration_title: portworx
guid: 858a4b03-3f75-4019-8ba8-46b00d5aeb46
integration_id: portworx
integration_title: Portworx
integration_version: 1.0.0
is_public: true
kind: インテグレーション
maintainer: paul@portworx.com
manifest_version: 1.0.0
metric_prefix: portworx.
metric_to_check: portworx.cluster.cpu_percent
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

Portworx チェックは [Datadog Agent][1] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インストール

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Portworx チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][3]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-portworx==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][3]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. Portworx の[メトリクス](#metrics)を収集するには、[Agent のコンフィギュレーションディレクトリ][4]のルートにある `conf.d/` フォルダーの `portworx.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル portworx.d/conf.yaml][5] を参照してください。

    ```yaml
    init_config:

    instances:
     # url of the metrics endpoint of prometheus
     - prometheus_endpoint: http://localhost:9001/metrics
    ```

2. [Agent を再起動します][6]。

### 検証

[Agent の `info` サブコマンドを実行すると][7]、以下のような内容が表示されます。

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

お役に立つドキュメント、リンクや記事:

- [Portworx および Datadog でマルチクラウドコンテナストレージをモニタリング][9]


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/ja/getting_started/integrations/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/portworx/datadog_checks/portworx/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/faq/agent-status-and-information/
[8]: https://github.com/DataDog/integrations-extras/blob/master/portworx/metadata.csv
[9]: https://www.datadoghq.com/blog/portworx-integration/