---
aliases: []
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    CoreDNS: assets/dashboards/coredns.json
  logs:
    source: coredns
  metrics_metadata: metadata.csv
  monitors:
    '[CoreDNS] Cache hits count low': assets/monitors/coredns_cache_hits_low.json
    '[CoreDNS] Request duration high': assets/monitors/coredns_request_duration_high.json
  service_checks: assets/service_checks.json
categories:
  - コンテナ
  - ネットワーク
  - オートディスカバリー
  - ログの収集
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/coredns/README.md'
display_name: CoreDNS
draft: false
git_integration_title: coredns
guid: 9b316155-fc8e-4cb0-8bd5-8af270759cfb
integration_id: coredns
integration_title: CoreDNS
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: coredns.
metric_to_check: coredns.request_count
name: coredns
public_title: Datadog-CoreDNS インテグレーション
short_description: CoreDNS は、Kubernetes の DNS メトリクスを収集します。
support: コア
supported_os:
  - linux
---
## 概要

CoreDNS からリアルタイムにメトリクスを取得して、DNS エラーとキャッシュのヒット/ミスを視覚化および監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照してこの手順を行ってください。

### インストール

CoreDNS チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

#### メトリクスの収集

| パラメーター            | 値                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| `<インテグレーション名>` | `coredns`                                                                        |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                                                    |
| `<インスタンスコンフィギュレーション>`  | `{"prometheus_url":"http://%%host%%:9153/metrics", "tags":["dns-pod:%%host%%"]}` |

**注:**

- `dns-pod` タグは、対象の DNS ポッド IP を追跡します。他のタグは、サービスディスカバリーを使用して情報をポーリングする dd-agent に関連付けられます。
- ポッドでサービスディスカバリーアノテーションを実行する必要があります。デプロイの場合は、テンプレートの仕様のメタデータにアノテーションを追加します。外側のレベルの仕様には追加しないでください。

##### ログの収集

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][3]を参照してください。

| パラメーター      | 値                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "coredns", "service": "<サービス名>"}` |

### 検証

[Agent の `status` サブコマンドを実行][4]し、Checks セクションで `coredns` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "coredns" >}}


### イベント

CoreDNS チェックには、イベントは含まれません。

### サービスのチェック

**coredns.prometheus.health**:<br>
Agent がメトリクスのエンドポイントに到達できない場合は `CRITICAL` を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

## 開発

Agent ベースのインテグレーションの
テストおよび開発方法については、[メインドキュメント][7]を参照してください。

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://github.com/DataDog/integrations-core/blob/master/coredns/metadata.csv
[6]: http://docs.datadoghq.com/help
[7]: https://docs.datadoghq.com/ja/developers/