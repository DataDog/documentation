---
app_id: ns1
app_uuid: 8bc08030-a931-42a0-b9c0-9ca87f3e0e12
assets:
  dashboards:
    NS1: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ns1.qps
      metadata_path: metadata.csv
      prefix: ns1.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10182
    source_type_name: NS1
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: NS1
  sales_email: zjohnson@ns1.com
  support_email: zjohnson@ns1.com
categories:
- network
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/ns1/README.md
display_on_public_website: true
draft: false
git_integration_title: ns1
integration_id: ns1
integration_title: ns1
integration_version: 0.0.6
is_public: true
manifest_version: 2.0.0
name: ns1
public_title: ns1
short_description: A Datadog integration to collect NS1 metrics
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::Network
  - Supported OS::macOS
  configuration: README.md#Setup
  description: A Datadog integration to collect NS1 metrics
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: documentation
    url: https://help.ns1.com/hc/en-us/articles/4402752547219
  - resource_type: blog
    url: https://www.datadoghq.com/blog/ns1-monitoring-datadog/
  support: README.md#Support
  title: ns1
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


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

### 構成

1. NS1 メトリクスの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `ns1.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、サンプル [ns1.d/conf.yaml][6] を参照してください。

2. [Agent を再起動します][7]。

### 検証

[Agent の status サブコマンド][5]を実行し、Checks セクションで `ns1` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "ns1" >}}


### イベント

NS1 インテグレーションには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "ns1" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [NS1 + Datadog インテグレーション (アウトバウンド) クイックスタートガイド][11]
- [Datadog での NS1 モニタリング][12]


[1]: https://ns1.com/
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ns1/images/overview.png
[3]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[4]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentabovev68
[5]: https://docs.datadoghq.com/ja/getting_started/integrations/
[6]: https://github.com/DataDog/integrations-extras/blob/master/ns1/datadog_checks/ns1/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/ns1/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/ns1/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/
[11]: https://help.ns1.com/hc/en-us/articles/4402752547219
[12]: https://www.datadoghq.com/blog/ns1-monitoring-datadog/