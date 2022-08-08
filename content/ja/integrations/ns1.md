---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    NS1: assets/dashboards/overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- モニタリング
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/ns1/README.md
display_name: NS1
draft: false
git_integration_title: ns1
guid: 7c7c7d80-d307-4ffd-ac60-1a7180d932e3
integration_id: ns1
integration_title: ns1
integration_version: 0.0.6
is_public: true
kind: integration
maintainer: zjohnson@ns1.com
manifest_version: 1.0.0
metric_prefix: ns1.
metric_to_check: ns1.qps
name: ns1
public_title: ns1
short_description: NS1 メトリクスを収集する Datadog インテグレーション
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## 概要

このインテグレーションは、Datadog Agent を通じて [NS1][1] サービスを監視します。

![Snap][2]

## セットアップ

NS1 チェックは [Datadog Agent][3] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インストール

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い NS1 チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][4]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-ns1==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][5]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. NS1 メトリクスの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `ns1.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、サンプル [ns1.d/conf.yaml][6] を参照してください。

2. [Agent を再起動します][7]。

### 検証

[Agent の status サブコマンド][5]を実行し、Checks セクションで `ns1` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "ns1" >}}


### イベント

NS1 インテグレーションには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "ns1" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [NS1 + Datadog インテグレーション (アウトバウンド) クイックスタートガイド][11]
- [Datadog での NS1 モニタリング][12]


[1]: https://ns1.com/
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ns1/images/overview.png
[3]: https://app.datadoghq.com/account/settings#agent/overview
[4]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentabovev68
[5]: https://docs.datadoghq.com/ja/getting_started/integrations/
[6]: https://github.com/DataDog/integrations-extras/blob/master/ns1/datadog_checks/ns1/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/ns1/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/ns1/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/
[11]: https://help.ns1.com/hc/en-us/articles/4402752547219
[12]: https://www.datadoghq.com/blog/ns1-monitoring-datadog/