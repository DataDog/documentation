---
app_id: gke
app_uuid: 66d0227c-6e8f-4639-a0d9-aefb147da71d
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Google Kubernetes Engine
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- containers
- orchestration
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/gke/README.md
display_on_public_website: true
draft: false
git_integration_title: gke
integration_id: gke
integration_title: Google Kubernetes Engine、Agent
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: gke
public_title: Google Kubernetes Engine、Agent インテグレーション
short_description: GKE は、コンテナ化アプリケーションを実行およびオーケストレーションするためのプラットフォームです。
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
  - Category::Orchestration
  - Offering::Integration
  configuration: README.md#Setup
  description: GKE は、コンテナ化アプリケーションを実行およびオーケストレーションするためのプラットフォームです。
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/gke-autopilot-monitoring/
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-google-kubernetes-engine/
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-tau-t2a-gke-workloads-with-datadog-arm-support/
  - resource_type: blog
    url: https://www.datadoghq.com/blog/gke-dashboards-integration-improvements/
  support: README.md#Support
  title: Google Kubernetes Engine、Agent インテグレーション
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Google Cloud Platform (GCP) 上のサービスである Google Kubernetes Engine (GKE) は、Kubernetes を基盤としたコンテナ化アプリケーションを実行・オーケストレーションするためのホスト型プラットフォームです。GKE クラスターは、[Google Cloud Platform][1] インテグレーションに加え、クラスター内でワークロードとして動作する Datadog Agent からも監視できます。

## セットアップ

### 前提条件

1. 使用している [GCP プロジェクト][2] のロールに、GKE を利用するための適切な権限が付与されていることを確認します。

2. プロジェクトで [Google Container Engine API][3] を有効にします。

3. ローカル マシンに [Google Cloud SDK][4] と `kubectl` コマンド ライン ツールをインストールします。[Cloud SDK を GCP アカウントと関連付ける][5] と、ローカル マシンから `kubectl` を使ってクラスターを直接操作できます。

### GCE インテグレーションを設定する

[Google Cloud Platform][1] インテグレーションをインストールします。

これにより、ディスク I/O、CPU 使用率、ネットワーク トラフィックなどのメトリクスを表示する、すぐに使える [Google Compute Engine ダッシュボード][6] にアクセスできます。

### Kubernetes インテグレーションを設定する

GKE クラスターをさらに詳細に監視するには、Datadog Helm Chart または Datadog Operator を使って Datadog Agent をインストールします。デプロイ後は、 Datadog Agent と Datadog Cluster Agent がクラスターおよびその上で動作するワークロードを監視します。

GKE には、クラスターに対してどの程度の柔軟性・責任・制御を持つかが変わる、2 つの [主な運用モード][7] が用意されています。これらのモードによって、Datadog コンポーネントのデプロイ方法も変わります。

- **Standard**: クラスターの基盤となるインフラストラクチャを自分で管理するモードで、ノード構成を柔軟に設定できます。

- **Autopilot**: ノードやノード プールを含むクラスター基盤のインフラストラクチャをすべて Google 側がプロビジョニングおよび管理するモードで、ユーザーが意識せずに利用できる最適化済みクラスターが提供されます。

{{< tabs >}}
{{% tab "Standard" %}}

#### Standard

Kubernetes クラスター上に [Datadog Agent のコンテナ化バージョン][1] をデプロイします。手順については、 [Datadog Agent を Kubernetes にインストール][2] を参照してください。


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=kubernetes
[2]: https://docs.datadoghq.com/ja/containers/kubernetes/installation?tab=operator
{{% /tab %}}
{{% tab "Autopilot" %}}

#### Autopilot

Autopilot では、Standard インストールとは異なる Kubernetes 向けのセットアップが必要です。この種類のクラスターでは、Datadog Helm Chart を使用する必要があります。

Helm を使用して [Datadog Agent のコンテナ化バージョン][1] を Kubernetes クラスターにデプロイするには、[Datadog Agent を Kubernetes にインストール][2] の手順に従います。Helm の `datadog-values.yaml` を設定する際は、必要な設定変更について [Kubernetes Distributions の GKE Autopilot セクション][3] を参照してください。特に `providers.gke.autopilot` を `true` に設定します。

#### Admission Controller

Autopilot で [Admission Controller][4] を使用するには、Admission Controller の [`configMode`][5] を `service` または `hostip` に設定します。

Autopilot では `socket` モードが使用できないため、コントローラに対してより堅牢な抽象レイヤーを提供する目的で、Datadog は `service` を使用し、フォールバックとして `hostip` を指定する構成を推奨します。



[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=kubernetes
[2]: https://docs.datadoghq.com/ja/containers/kubernetes/installation?tab=helm
[3]: https://docs.datadoghq.com/ja/containers/kubernetes/distributions/?tab=helm#autopilot
[4]: https://docs.datadoghq.com/ja/containers/cluster_agent/admission_controller/?tab=operator
[5]: https://github.com/DataDog/helm-charts/blob/datadog-3.110.0/charts/datadog/values.yaml#L1284-L1293
{{% /tab %}}
{{< /tabs >}}

## 参考資料

- [Datadog で GKE Autopilot を監視する][8]
- [Datadog で GKE を監視する][9]
- [T2A ベースの GKE ワークロードを Datadog で監視する][10]
- [新しい GKE ダッシュボードとメトリクスで環境をより深く可視化][11]


[1]: https://app.datadoghq.com/integrations/google_cloud_platform/
[2]: https://cloud.google.com/resource-manager/docs/creating-managing-projects
[3]: https://console.cloud.google.com/apis/api/container.googleapis.com
[4]: https://cloud.google.com/sdk/docs/
[5]: https://cloud.google.com/sdk/docs/initializing
[6]: https://app.datadoghq.com/screen/integration/gce
[7]: https://cloud.google.com/kubernetes-engine/docs/concepts/choose-cluster-mode
[8]: https://www.datadoghq.com/blog/gke-autopilot-monitoring/
[9]: https://www.datadoghq.com/blog/monitor-google-kubernetes-engine/
[10]: https://www.datadoghq.com/blog/monitor-tau-t2a-gke-workloads-with-datadog-arm-support/
[11]: https://www.datadoghq.com/blog/gke-dashboards-integration-improvements/