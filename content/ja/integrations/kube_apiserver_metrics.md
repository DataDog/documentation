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
  - コンテナ
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/kube_apiserver_metrics/README.md'
display_name: Kubernetes API サーバーメトリクス
draft: false
git_integration_title: kube_apiserver_metrics
guid: 406b274b-c44d-4499-a329-efd053b3f538
integration_id: kube-apiserver-metrics
integration_title: Kubernetes API サーバーメトリクス
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: kube_apiserver.
metric_to_check: kube_apiserver.go_goroutines
name: kube_apiserver_metrics
public_title: Datadog-Kubernetes API サーバーメトリクスインテグレーション
short_description: Kubernetes APIServer からメトリクスを収集
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは [Kube_apiserver_metrics][1] を監視します。

## セットアップ

### インストール

Kube_apiserver_metrics チェックは [Datadog Agent][2] パッケージに含まれているため、サーバーに追加でインストールする必要はありません。

**注**: このインテグレーションの Datadog アプリケーションにはタイルは含まれていません。このインテグレーションを構成するには、以下のコンフィギュレーション手順に従ってください。

### コンフィギュレーション

kube_apiserver_metrics チェックを実行する主な使用例としては、クラスターレベルのチェックがあります。
詳細については、[クラスターレベルのチェック][3]に関するドキュメントを参照してください。
apiserver のサービスに、次のように注釈を付けることができます。

```yaml
annotations:
  ad.datadoghq.com/endpoints.check_names: '["kube_apiserver_metrics"]'
  ad.datadoghq.com/endpoints.init_configs: '[{}]'
  ad.datadoghq.com/endpoints.instances:
    '[{ "prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true" }]'
```

これで、Datadog Cluster Agent は、各エンドポイントのチェックを Datadog Agent にスケジューリングします。

このチェックは、エンドポイントを直接 `kube_apiserver_metrics.d/conf.yaml` ファイルで構成することによって実行することもできます。このファイルは、[Agent のコンフィギュレーションディレクトリ][4]のルートの `conf.d/` フォルダー内にあります。
使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル kube_apiserver_metrics.d/conf.yaml][2] を参照してください。

チェックを実行する Agent は、デフォルトで、APIServer に対する認証に使用するサービスアカウントのベアラートークンを取得しようとします。RBAC を使用していない場合は、`bearer_token_auth` を `false` に設定してください。

最後に、Datadog Agent をマスターノードで実行する場合は、[オートディスカバリー][5]に依存してチェックをスケジューリングできます。公式のイメージ `k8s.gcr.io/kube-apiserver` を実行している場合は自動です。

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `kube_apiserver_metrics` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "kube_apiserver_metrics" >}}


### サービスのチェック

Kube_apiserver_metrics には、サービスのチェック機能は含まれません。

### イベント

Kube_apiserver_metrics には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver
[2]: https://github.com/DataDog/integrations-core/blob/master/kube_apiserver_metrics/datadog_checks/kube_apiserver_metrics/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/cluster_agent/clusterchecks/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[6]: https://docs.datadoghq.com/ja/agent/faq/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/kube_apiserver_metrics/metadata.csv
[8]: https://docs.datadoghq.com/ja/help/