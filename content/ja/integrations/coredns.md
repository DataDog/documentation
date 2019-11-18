---
aliases: []
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - コンテナ
  - ネットワーク
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/coredns/README.md'
display_name: CoreDNS
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

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][7]のガイドを参照してこの手順を行ってください。

### インストール

CoreDNS チェックは [Datadog Agent][1] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィグレーション

サーバーとポートを指定し、監視するマスターを設定するには、[Agent の構成ディレクトリ][2]のルートにある `conf.d/` フォルダーの `coredns.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル coredns.d/conf.yaml][3] を参照してください。

#### サービスディスカバリーの使用

Kubernetes ワーカーノードごとに 1 つの dd-agent ポッド (daemon set) を使用している場合は、core-dns ポッドで以下のアノテーションを使用して、データを自動的に取得できます。

```yaml
metadata:
  annotations:
    ad.datadoghq.com/coredns.check_names: '["coredns"]'
    ad.datadoghq.com/coredns.init_configs: '[{}]'
    ad.datadoghq.com/coredns.instances: '[{"prometheus_url":"http://%%host%%:9153/metrics", "tags":["dns-pod:%%host%%"]}]'
```

**注:**

 * `dns-pod` タグは、対象の DNS ポッド IP を追跡します。他のタグは、サービスディスカバリーを使用して情報をポーリングする dd-agent に関連します。
 * ポッドでサービスディスカバリーアノテーションを実行する必要があります。デプロイの場合は、テンプレートの仕様のメタデータにアノテーションを追加します。外側のレベルの仕様には追加しないでください。


### 検証

[Agent の `status` サブコマンドを実行][4]し、Checks セクションで `coredns` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "coredns" >}}


### イベント

CoreDNS チェックには、イベントは含まれません。

### サービスのチェック

`coredns.prometheus.health`:

Agent がメトリクスのエンドポイントに到達できない場合は、`CRITICAL` を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

## 開発

Agent ベースのインテグレーションの
テストおよび開発方法については、[メインドキュメント][2]を参照してください。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/developers
[3]: https://github.com/DataDog/integrations-core/blob/master/coredns/datadog_checks/coredns/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[5]: https://github.com/DataDog/integrations-core/blob/master/coredns/metadata.csv
[6]: http://docs.datadoghq.com/help
[7]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations


{{< get-dependencies >}}