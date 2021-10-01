---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - ネットワーク
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/external_dns/README.md'
display_name: 外部 DNS
draft: false
git_integration_title: external_dns
guid: 31eb63d5-15eb-42b3-912d-f8de47ea252a
integration_id: external-dns
integration_title: 外部 DNS
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: external_dns.
metric_to_check: external_dns.source.endpoints.total
name: external_dns
public_title: Datadog-外部 DNS インテグレーション
short_description: 外部 DNS のすべてのメトリクスを Datadog で追跡
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

外部 DNS サーバーからメトリクスをリアルタイムに取得して、Kubernetes の外部 DNS Prometheus アドオンで収集した DNS メトリクスを視覚化および監視できます。

外部 DNS の詳細については、[Github リポジトリ][1]を参照してください。

## セットアップ

### インストール

外部 DNS チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

サーバーとポートを指定し、監視するマスターを設定するには、[Agent のコンフィギュレーションディレクトリ][3]のルートにある `conf.d/` フォルダーの `external_dns.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[external_dns.d/conf.yaml のサンプル][4] を参照してください。

#### サービスディスカバリーの使用

Kubernetes ワーカーノードごとに 1 つの Datadog Agent ポッドを使用している場合は、external-dns ポッドで以下のサンプルアノテーションを使用して、データを自動的に取得できます。

```yaml
apiVersion: v1
kind: Pod
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

## 収集データ

### メトリクス
{{< get-metrics-from-git "external_dns" >}}


### イベント

外部 DNS チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "external_dns" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://github.com/kubernetes-incubator/external-dns
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/external_dns/datadog_checks/external_dns/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/external_dns/metadata.csv
[7]: https://github.com/DataDog/integrations-core/blob/master/external_dns/assets/service_checks.json
[8]: https://docs.datadoghq.com/ja/help/