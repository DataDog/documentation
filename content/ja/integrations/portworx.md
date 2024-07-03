---
app_id: portworx
app_uuid: e682ab93-39cd-403b-a16f-8082961bc081
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: portworx.cluster.cpu_percent
      metadata_path: metadata.csv
      prefix: portworx.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10021
    source_type_name: Portworx
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Portworx
  sales_email: paul@portworx.com
  support_email: paul@portworx.com
categories:
- kubernetes
- data stores
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/portworx/README.md
display_on_public_website: true
draft: false
git_integration_title: portworx
integration_id: portworx
integration_title: Portworx
integration_version: 1.1.0
is_public: true
manifest_version: 2.0.0
name: portworx
public_title: Portworx
short_description: Collect runtime metrics from a Portworx Instance.
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Kubernetes
  - Category::Data Stores
  - Supported OS::Linux
  configuration: README.md#Setup
  description: Collect runtime metrics from a Portworx Instance.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/portworx-integration/
  support: README.md#Support
  title: Portworx
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


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

### 構成

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


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/ja/getting_started/integrations/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/portworx/datadog_checks/portworx/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/faq/agent-status-and-information/
[8]: https://github.com/DataDog/integrations-extras/blob/master/portworx/metadata.csv
[9]: https://www.datadoghq.com/blog/portworx-integration/