---
app_id: external-dns
app_uuid: b41539a6-8222-4d6e-92f9-0a9f8496acdd
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: external_dns.source.endpoints.total
      metadata_path: metadata.csv
      prefix: external_dns.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10075
    source_type_name: 外部 DNS
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ネットワーク
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/external_dns/README.md
display_on_public_website: true
draft: false
git_integration_title: external_dns
integration_id: external-dns
integration_title: 外部 DNS
integration_version: 3.2.0
is_public: true
manifest_version: 2.0.0
name: external_dns
public_title: 外部 DNS
short_description: 外部 DNS のすべてのメトリクスを Datadog で追跡
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Network
  configuration: README.md#Setup
  description: 外部 DNS のすべてのメトリクスを Datadog で追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: 外部 DNS
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

外部 DNS サーバーからメトリクスをリアルタイムに取得して、Kubernetes の外部 DNS Prometheus アドオンで収集した DNS メトリクスを視覚化および監視できます。

外部 DNS の詳細については、[Github リポジトリ][1]を参照してください。

## セットアップ

### インストール

外部 DNS チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### 構成

サーバーとポートを指定し、監視するマスターを設定するには、[Agent のコンフィギュレーションディレクトリ][3]のルートにある `conf.d/` フォルダーの `external_dns.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[external_dns.d/conf.yaml のサンプル][4] を参照してください。

#### サービスディスカバリーの使用

Kubernetes ワーカーノードごとに 1 つの Datadog Agent ポッドを使用している場合は、external-dns ポッドで以下のサンプルアノテーションを使用して、データを自動的に取得できます。

```yaml
apiVersion: v1
metadata:
  annotations:
    ad.datadoghq.com/external-dns.check_names: '["external_dns"]'
    ad.datadoghq.com/external-dns.init_configs: '[{}]'
    ad.datadoghq.com/external-dns.instances: '[{"prometheus_url":"http://%%host%%:7979/metrics", "tags":["externaldns-pod:%%host%%"]}]'
```

- `externaldns-pod` タグは、対象の DNS ポッド IP を追跡します。他のタグは、オートディスカバリーを使用して情報をポーリングする Datadog Agent に関連します。
- オートディスカバリーアノテーションはポッド上で行われます。デプロイするには、アノテーションをテンプレートの仕様のメタデータに追加します。

### 検証

[Agent の `status` サブコマンドを実行][5]し、Checks セクションで `external_dns` を探します。

## データ収集

### メトリクス
{{< get-metrics-from-git "external_dns" >}}


### イベント

外部 DNS チェックには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "external_dns" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://github.com/kubernetes-incubator/external-dns
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/external_dns/datadog_checks/external_dns/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/external_dns/metadata.csv
[7]: https://github.com/DataDog/integrations-core/blob/master/external_dns/assets/service_checks.json
[8]: https://docs.datadoghq.com/ja/help/