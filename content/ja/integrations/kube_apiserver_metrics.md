---
app_id: kube-apiserver-metrics
app_uuid: c5caf884-25c1-4a35-a72e-fa75e7cc10fc
assets:
  dashboards:
    Kubernetes API Server - Overview: assets/dashboards/overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: kube_apiserver.go_goroutines
      metadata_path: metadata.csv
      prefix: kube_apiserver.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Kubernetes API サーバーメトリクス
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- コンテナ
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kube_apiserver_metrics/README.md
display_on_public_website: true
draft: false
git_integration_title: kube_apiserver_metrics
integration_id: kube-apiserver-metrics
integration_title: Kubernetes API サーバーメトリクス
integration_version: 3.2.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: kube_apiserver_metrics
oauth: {}
public_title: Kubernetes API サーバーメトリクス
short_description: Kubernetes APIServer からメトリクスを収集
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
  - Category::Containers
  configuration: README.md#Setup
  description: Kubernetes APIServer からメトリクスを収集
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Kubernetes API サーバーメトリクス
---



## 概要

このチェックは [Kube_apiserver_metrics][1] を監視します。

## セットアップ

### インストール

Kube_apiserver_metrics チェックは [Datadog Agent][2] パッケージに含まれているため、サーバーに追加でインストールする必要はありません。

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
静的コンフィギュレーションファイルまたは ConfigMap を使用してクラスターチェックを構成する場合、[コンフィギュレーションファイル][5]に `cluster_check: true` を追加する必要があります。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル kube_apiserver_metrics.d/conf.yaml][6] を参照してください。

チェックを実行する Agent は、デフォルトで、APIServer に対する認証に使用するサービスアカウントのベアラートークンを取得しようとします。RBAC を使用していない場合は、`bearer_token_auth` を `false` に設定してください。

最後に、Datadog Agent をマスターノードで実行する場合は、[オートディスカバリー][7]に依存してチェックをスケジューリングできます。公式のイメージ `k8s.gcr.io/kube-apiserver` を実行している場合は自動です。

### 検証

[Agent の status サブコマンドを実行][8]し、Checks セクションで `kube_apiserver_metrics` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "kube_apiserver_metrics" >}}


### サービスのチェック

Kube_apiserver_metrics には、サービスのチェック機能は含まれません。

### イベント

Kube_apiserver_metrics には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

[1]: https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/cluster_agent/clusterchecks/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://docs.datadoghq.com/ja/agent/cluster_agent/clusterchecks/#set-up-cluster-checks
[6]: https://github.com/DataDog/integrations-core/blob/master/kube_apiserver_metrics/datadog_checks/kube_apiserver_metrics/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[8]: https://docs.datadoghq.com/ja/agent/faq/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/kube_apiserver_metrics/metadata.csv
[10]: https://docs.datadoghq.com/ja/help/