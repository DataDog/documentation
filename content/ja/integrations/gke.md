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
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- containers
- orchestration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/gke/README.md
display_on_public_website: true
draft: false
git_integration_title: gke
integration_id: gke
integration_title: Google Kubernetes Engine, Agent
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: gke
public_title: Google Kubernetes Engine, Agent インテグレーション
short_description: GKE は、コンテナ化されたアプリケーションを実行およびオーケストレーションするためのプラットフォームです。
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
  configuration: README.md#Setup
  description: GKE は、コンテナ化されたアプリケーションを実行およびオーケストレーションするためのプラットフォームです。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Google Kubernetes Engine, Agent インテグレーション
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Google Cloud Platform (GCP) のサービスである Google Kubernetes Engine (GKE) は、コンテナ化されたアプリケーションを実行およびオーケストレーションするためのホスト型プラットフォームです。Amazon の Elastic Container Service (ECS) と同様に、GKE はマシンのクラスターにデプロイされた Docker コンテナを管理します。ただし、ECS とは異なり、GKE は Kubernetes を使用します。

## 計画と使用

### 前提条件

1. [GCP プロジェクト][1]でのロールに、GKE を使用するための適切なアクセス許可があることを確認してください。

2. プロジェクトで [Google Container Engine API][2] を有効にします。

3. [Google Cloud SDK][3] と `kubectl` コマンドラインツールをローカルマシンにインストールします。[Cloud SDK を GCP アカウントとペアリング][4]すると、`kubectl` を使用してローカルマシンから直接クラスターを制御できます。

4. 次のコマンドを実行して、クラウドデータストアにアクセスできる `doglib` という名前の小さな GKE クラスターを作成します。

```
$  gcloud container clusters create doglib --num-nodes 3 --zone "us-central1-b" --scopes "cloud-platform"
```

### GCE インテグレーションを設定する

[Google Cloud Platform][5] インテグレーションをインストールします。

その後、ディスク I/O、CPU 使用率、ネットワークトラフィックなどのメトリクスが表示される、すぐに使用できる [Google Compute Engine ダッシュボード][6]にアクセスできます。

### GKE インテグレーションを設定する

動作モードを選択します。*動作モード*とは、クラスターに対する柔軟性、責任、制御のレベルを指します。GKE には、次の 2 つの動作モードがあります。

- **Standard**: クラスターの基盤となるインフラを管理し、ノードの構成を柔軟に変更することができます。

- **Autopilot**: Google は、ノードやノードプールなどクラスターの基盤となるインフラストラクチャー全体のプロビジョニングおよび管理を行い、最適なクラスターを提供します。

{{< tabs >}}
{{% tab "標準" %}}

#### 標準的な方法

[コンテナ化されたバージョンの Datadog Agent][1] を Kubernetes クラスターにデプロイします。[Kubernetes に Datadog Agent をインストールする][2]を参照してください。


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=kubernetes
[2]: https://docs.datadoghq.com/ja/containers/kubernetes/installation?tab=operator
{{% /tab %}}
{{% tab "Autopilot" %}}

#### Autopilot

1. Helm をインストールします。

2. Datadog リポジトリを Helm リポジトリに追加します。

  ```bash
  helm repo add datadog https://helm.datadoghq.com
  helm repo update
  ```

3. 次のコマンドを使用して、Autopilot に Datadog Agent と Cluster Agent をデプロイします。

  ```bash
  helm install <RELEASE_NAME> \
      --set datadog.apiKey=<DATADOG_API_KEY> \
      --set datadog.appKey=<DATADOG_APP_KEY> \
      --set clusterAgent.enabled=true \
      --set clusterAgent.metricsProvider.enabled=true \
      --set providers.gke.autopilot=true \
      datadog/datadog
  ```

  **注**: ログやトレースも有効にしたい場合は、このコマンドに `datadog.logs.enabled` (ログ用) と `datadog.apm.portEnabled` (トレース用) を true に設定する行を追加してください。例:

  ```bash
  helm install --name <RELEASE_NAME> \
      --set datadog.apiKey=<DATADOG_API_KEY> \
      --set datadog.appKey=<DATADOG_APP_KEY> \
      --set clusterAgent.enabled=true \
      --set clusterAgent.metricsProvider.enabled=true \
      --set providers.gke.autopilot=true \
      --set datadog.logs.enabled=true \
      --set datadog.apm.portEnabled=true \
      datadog/datadog
  ```

  構成可能な値の一覧は、[Datadog `helm-charts` リポジトリ][1]を参照してください。

#### ダッシュボード  

[Admission Controller][2] を Autopilot で使用するには、Admission Controller の [`configMode`][3] を `service` または `hostip` に設定します。

Autopilot では `socket` モードが許可されていないため、Datadog はコントローラーにより堅牢な抽象化レイヤーを提供するため `service` (フォールバックオプションとして `hostip`) の使用を推奨します。



[1]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog#values
[2]: https://docs.datadoghq.com/ja/containers/cluster_agent/admission_controller/?tab=operator
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml#L1046
{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

- [Datadog を使用した GKE Autopilot の監視][7]
- [Datadog を使用した GKE の監視][8]
- [Datadog を使用した T2A による GKE ワークロードの監視][9]
- [新しい GKE ダッシュボードとメトリクスによる、環境の視覚化の向上][10]


[1]: https://cloud.google.com/resource-manager/docs/creating-managing-projects
[2]: https://console.cloud.google.com/apis/api/container.googleapis.com
[3]: https://cloud.google.com/sdk/docs/
[4]: https://cloud.google.com/sdk/docs/initializing
[5]: /ja/integrations/google_cloud_platform/
[6]: https://app.datadoghq.com/screen/integration/gce
[7]: https://www.datadoghq.com/blog/gke-autopilot-monitoring/
[8]: https://www.datadoghq.com/blog/monitor-google-kubernetes-engine/
[9]: https://www.datadoghq.com/blog/monitor-tau-t2a-gke-workloads-with-datadog-arm-support/
[10]: https://www.datadoghq.com/blog/gke-dashboards-integration-improvements/