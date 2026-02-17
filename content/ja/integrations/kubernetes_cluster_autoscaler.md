---
app_id: kubernetes-cluster-autoscaler
app_uuid: 3a3fc186-af02-48e5-8b68-ee9ef37ea566
assets:
  dashboards:
    Kubernetes Cluster Autoscaler Overview: assets/dashboards/kubernetes_cluster_autoscaler_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: kubernetes_cluster_autoscaler.nodes.count
      metadata_path: metadata.csv
      prefix: kubernetes_cluster_autoscaler.
    process_signatures:
    - cluster-autoscaler
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 14391189
    source_type_name: Kubernetes Cluster Autoscaler
  logs:
    source: kubernetes_cluster_autoscaler
  monitors:
    Kubernetes Cluster Autoscaler is not safe to autoscale: assets/monitors/KCA_not_safe_to_autosclae.json
    Kubernetes Cluster Autoscaler reporting errors: assets/monitors/KCA_unused_nodes_forecast.json
    Kubernetes Cluster Autoscaler too many unused nodes forecast: assets/monitors/KCA_reporting_errors.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- metrics
- kubernetes
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kubernetes_cluster_autoscaler/README.md
display_on_public_website: true
draft: false
git_integration_title: kubernetes_cluster_autoscaler
integration_id: kubernetes-cluster-autoscaler
integration_title: Kubernetes Cluster Autoscaler
integration_version: 2.2.0
is_public: true
manifest_version: 2.0.0
name: kubernetes_cluster_autoscaler
public_title: Kubernetes Cluster Autoscaler
short_description: Kubernetes Cluster Autoscaler 用インテグレーション
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Metrics
  - Category::Kubernetes
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: Kubernetes Cluster Autoscaler 用インテグレーション
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Kubernetes Cluster Autoscaler
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは Datadog Agent を通じて [Kubernetes Cluster Autoscaler][1] を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Kubernetes Cluster Autoscaler チェックは [Datadog Agent][3] パッケージに含まれています (Agent >= 7.55.x)。
サーバー側で追加のインストールは不要です。

### 設定

1. Agent の設定ディレクトリのルートにある `conf.d/` フォルダー内の `kubernetes_cluster_autoscaler.d/conf.yaml` ファイルを編集し、kubernetes_cluster_autoscaler のパフォーマンス データ収集を開始します。利用可能な設定オプションは、[サンプル kubernetes_cluster_autoscaler.d/conf.yaml][4] を参照してください。

2. [Agent を再起動します][5]。

#### メトリクスの収集

Prometheus 形式のメトリクスが `kubernetes_cluster_autoscaler` クラスターで公開されていることを確認してください。
Agent がメトリクス収集を開始するには、`kubernetes_cluster_autoscaler` Pod にアノテーションを付与する必要があります。

[Kubernetes Cluster Autoscaler][6] には、ポート `8085` でアクセスできるメトリクス エンドポイントと livenessProbe エンドポイントがあります。これらのエンドポイントは `/metrics` と `/health-check` 配下にあり、スケーリング操作中のクラスターの状態を把握するうえで役立つ情報を提供します。

**注**: デフォルト ポートを変更するには `--address` フラグを使用します。

Cluster Autoscaler がメトリクスを公開するように設定するには、次を実施します:

1. Cluster Autoscaler のデプロイメントで `/metrics` ルートへのアクセスを有効化し、ポート `8085` を公開します:

```
ports:
--name: app
containerPort: 8085
``` 

b) 次のアノテーションを Cluster Autoscaler サービスに追加し、Prometheus がスクレイプできるようにします:
```
prometheus.io/scrape: true
```

**注**: 一覧にあるメトリクスは、利用可能な場合にのみ収集できます。メトリクスの中には、特定のアクションが実行されたときにだけ生成されるものがあります。

`kubernetes_cluster_autoscaler` チェックの設定に必要なパラメータは次のとおりです:

* CONTAINER_NAME
  クラスター オートスケーラー コントローラーのコンテナ名。
* `openmetrics_endpoint`
  このパラメータには、Prometheus 形式のメトリクスが公開されている場所を指定します。デフォルト ポートは `8085` です。別のポートを使う場合は `METRICS_PORT` [環境変数][7] を使用してください。コンテナ環境では、[ホスト自動検出][2] のために `%%host%%` を使用します。

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.checks: |
      {
        "kubernetes_cluster_autoscaler": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:8085/metrics"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: '<CONTAINER_NAME>'
# (...)
```


### 検証

[Agent の status サブコマンドを実行][8] し、Checks セクションに `kubernetes_cluster_autoscaler` が表示されることを確認します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "kubernetes_cluster_autoscaler" >}}


### イベント

Kubernetes Cluster Autoscaler インテグレーションにはイベントは含まれません。

### サービス チェック
{{< get-service-checks-from-git "kubernetes_cluster_autoscaler" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。


[1]: https://docs.datadoghq.com/ja/integrations/kubernetes_cluster_autoscaler/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_cluster_autoscaler/datadog_checks/kubernetes_cluster_autoscaler/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/FAQ.md#how-can-i-monitor-cluster-autoscaler
[7]: https://kubernetes.io/docs/tasks/inject-data-application/define-environment-variable-container/
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_cluster_autoscaler/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_cluster_autoscaler/assets/service_checks.json
[11]: https://docs.datadoghq.com/ja/help/