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
  - 'https://github.com/DataDog/integrations-extras/blob/master/ns1/README.md'
display_name: NS1
draft: false
git_integration_title: ns1
guid: 7c7c7d80-d307-4ffd-ac60-1a7180d932e3
integration_id: ns1
integration_title: ns1
is_public: true
kind: integration
maintainer: dblagojevic@daitan.com
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

[Datadog Agent][3] をインストールし、以下の手順に従って、このインテグレーションをインストールし、ホストで実行中の Agent に対して構成します。


## インストール

NS1 インテグレーションをアドオンとしてインストールするには、特定のステップについて Datadog の[コミュニティインテグレーションのインストール][4]ページを参照します（パッケージ化されて Datadog Agent に含まれていないため）。

**注**: インテグレーションをサポートする Agent は、バージョン 7.21.0 以降です。NS1 では、最新バージョンの Datadog Agent の使用をおすすめしています。

インストールプロセスを実行する際は、NS1 インテグレーションに特化した以下の変数を使用してください。


* <INTEGRATION_NAME>:  NS1
* <INTEGRATION_VERSION>:  0.0.3



## コンフィギュレーション

NS1 インテグレーションを構成しアクティブ化するには、[インテグレーションの開始][5]情報ページで Agent インテグレーションの構成をご確認ください。

使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル ns1.d/conf.yaml][6] を参照してください。


### 検証

Agent とインテグレーションのコンフィギュレーションを検証するには、[Agent の status サブコマンドを実行][7]し、Checks セクションで ns1 を見つけます。


## 収集データ

## メトリクス

このインテグレーションによって提供されるメトリクスのリストについては、[metadata.csv][8] を参照してください。

## イベント

NS1 インテグレーションには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "ns1" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

このインテグレーションに関する詳細は、NS1 ヘルプセンターの [NS1 + Datadog インテグレーション][11]に関する記事をご参照ください。


[1]: https://ns1.com/
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ns1/images/overview.png
[3]: https://app.datadoghq.com/account/settings#agent/overview
[4]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentabovev68
[5]: https://docs.datadoghq.com/ja/getting_started/integrations/#configuring-agent-integrations
[6]: https://github.com/DataDog/integrations-extras/blob/master/ns1/datadog_checks/ns1/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/ns1/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/ns1/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/
[11]: https://help.ns1.com/hc/en-us/articles/4402752547219