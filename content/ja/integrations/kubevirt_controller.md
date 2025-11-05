---
app_id: kubevirt-controller
app_uuid: f213050d-a54c-4a72-bf51-e9290a7d050c
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - kubevirt_controller.virt_controller.leading_status
      - kubevirt_controller.virt_controller.ready_status
      metadata_path: metadata.csv
      prefix: kubevirt_controller.
    process_signatures:
    - virt-controller
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 22545001
    source_type_name: KubeVirt Controller
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- incident-teams
- kubernetes
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kubevirt_controller/README.md
display_on_public_website: true
draft: false
git_integration_title: kubevirt_controller
integration_id: kubevirt-controller
integration_title: KubeVirt Controller
integration_version: 1.1.0
is_public: true
manifest_version: 2.0.0
name: kubevirt_controller
public_title: KubeVirt Controller
short_description: KubeVirt Controller サービスの健全性を監視するための主要メトリクスを収集します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: KubeVirt Controller サービスの健全性を監視するための主要メトリクスを収集します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: KubeVirt Controller
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


<div class="alert alert-danger">
このインテグレーションは公開ベータ版で、本番ワークロードでの有効化は慎重に行う必要があります。
</div>

## 概要

このチェックは、Datadog Agent を通じて [KubeVirt Controller][1] を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

KubeVirt Controller チェックは [Datadog Agent][3] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### 構成

`kubevirt_controller` チェックの主なユースケースは、[クラスターレベルのチェック][4]として実行することです。

そのためには、以下の手順に従って RBAC 権限を更新し、`datadog-agent` サービスアカウントに `KubeVirt` リソースへの読み取り専用アクセス権を付与します。

1. `kubevirt.io:view` ClusterRole を `datadog-agent` サービスアカウントにバインドします。

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: datadog-agent-kubevirt
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: kubevirt.io:view
subjects:
  - kind: ServiceAccount
  name: datadog-agent
  namespace: default
```

2. `KubeVirt` リソースに以下のようにパッチを適用して、`virt-controller` デプロイのポッドテンプレートにアノテーションを付けます。

```yaml
apiVersion: kubevirt.io/v1
kind: KubeVirt
metadata:
  name: kubevirt
  namespace: kubevirt
spec:
  certificateRotateStrategy: {}
  configuration: {}
  customizeComponents:
    patches:
    - resourceType: Deployment
        resourceName: virt-controller
        patch: '{"spec": {"template":{"metadata":{"annotations":{ "ad.datadoghq.com/virt-controller.check_names": "[\"kubevirt_controller\"]", "ad.datadoghq.com/virt-controller.init_configs": "[{}]", "ad.datadoghq.com/virt-controller.instances": "[{ \"kubevirt_controller_metrics_endpoint\": \"https://%%host%%:%%port%%/metrics\",\"kubevirt_controller_healthz_endpoint\": \"https://%%host%%:%%port%%/healthz\", \"kube_namespace\":\"%%kube_namespace%%\", \"kube_pod_name\":\"%%kube_pod_name%%\", \"tls_verify\": \"false\"}]"}}}}}'
        type: strategic
```

`<DD_CLUSTER_NAME>` をクラスター名として使用したい名前に置き換えます。

### 検証

Cluster Agent コンテナ内で [Cluster Agent の `clusterchecks` サブコマンド][5]を実行し、Checks セクションに `kubevirt_controller` チェックが表示されていることを確認してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "kubevirt_controller" >}}


### イベント

KubeVirt Controller インテグレーションには、イベントは含まれません。

### サービスチェック

KubeVirt Controller インテグレーションには、サービス チェックは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/kubevirt_controller
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ja/containers/cluster_agent/clusterchecks/?tab=datadogoperator
[5]: https://docs.datadoghq.com/ja/containers/troubleshooting/cluster-and-endpoint-checks/#dispatching-logic-in-the-cluster-agent
[6]: https://github.com/DataDog/integrations-core/blob/master/kubevirt_controller/metadata.csv
[7]: https://docs.datadoghq.com/ja/help/