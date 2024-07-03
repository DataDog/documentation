---
app_id: argocd
app_uuid: 49ad19d0-1452-4275-b0fe-cbda3821807d
assets:
  dashboards:
    Argo CD Overview: assets/dashboards/argo_cd_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - argocd.api_server.go.goroutines
      - argocd.app_controller.go.goroutines
      - argocd.appset_controller.go.goroutines
      - argocd.repo_server.go.goroutines
      - argocd.notifications_controller.go.goroutines
      metadata_path: metadata.csv
      prefix: argocd.
    process_signatures:
    - argocd-application-controller
    - argocd-applicationset-controller
    - argocd-repo-server
    - argocd-server
    - argocd-notifications-controller
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10314
    source_type_name: ArgoCD
  monitors:
    Sync Status: assets/monitors/application_sync_status.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- developer tools
- log collection
- kubernetes
- configuration & deployment
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/argocd/README.md
display_on_public_website: true
draft: false
git_integration_title: argocd
integration_id: argocd
integration_title: Argo CD
integration_version: 2.4.1
is_public: true
manifest_version: 2.0.0
name: argocd
public_title: Argo CD
short_description: Monitor the health and performance of Argo CD
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Developer Tools
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Kubernetes
  - Category::Configuration & Deployment
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Monitor the health and performance of Argo CD
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Argo CD
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、Datadog Agent を通じて [Argo CD][1] を監視します。

## セットアップ

### インストール

Argo CD チェックは [Datadog Agent][2] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

**注**: この機能を使用するには、Agent v7.42.0 以上が必要です。

### 構成

Argo CD は、以下の 3 つのコンポーネントについて Prometheus 形式のメトリクスを公開しています。
   - アプリケーションコントローラー
   - API Server
   - リポジトリサーバー

Datadog Agent は、このインテグレーションを使用して、公開されたメトリクスを収集することができます。以下の手順に従って、コンポーネントの一部または全部からデータ収集を構成してください。

**注**: このチェックでは、メトリクスの収集に [OpenMetrics][3] を使用しており、Python 3 が必要です。

#### コンテナ化
##### メトリクスの収集

Prometheus 形式のメトリクスが Argo CD クラスターで公開されていることを確認します。Argo CD の[デフォルトマニフェスト][4]を使用している場合、これはデフォルトで有効になっています。Agent がすべてのメトリクスを収集するためには、前述の 3 つのコンポーネントのそれぞれにアノテーションを付ける必要があります。アノテーションの詳細については、[オートディスカバリーインテグレーションテンプレート][5]を参照してください。その他の構成オプションは、[サンプル argocd.d/conf.yaml][6] を確認することで利用可能です。

There are use cases where Argo CD Applications contain labels that need to be exposed as Prometheus metrics. These labels are available using the `argocd_app_labels` metric, which is disabled on the Application Controller by default. Refer to the [ArgoCD Documentation][7] for instructions on how to enable it.

構成例:

**アプリケーションコントローラー**:
```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/argocd-application-controller.checks: |
      {
        "argocd": {
          "init_config": {},
          "instances": [
            {
              "app_controller_endpoint": "http://%%host%%:8082/metrics"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: 'argocd-application-controller'
# (...)
```

**API サーバー**:
```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/argocd-server.checks: |
      {
        "argocd": {
          "init_config": {},
          "instances": [
            {
              "api_server_endpoint": "http://%%host%%:8083/metrics"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: 'argocd-server'
# (...)
```

**リポジトリサーバー**:
```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/argocd-repo-server.checks: |
      {
        "argocd": {
          "init_config": {},
          "instances": [
            {
              "repo_server_endpoint": "http://%%host%%:8084/metrics"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: 'argocd-repo-server'
# (...)
```

**Note**: For the full list of supported endpoints, see the [conf.yaml example file][8].

##### Troubleshooting 

**Clashing Tag Names**:
The Argo CD integration attaches a name tag derived from the application name OpenMetrics label when available. This could sometimes lead to querying issues if a name tag is already attached to a host, as seen in the example `name: host_a, app_a`. To prevent any unwanted behavior when querying, it is advisable to [remap the name label][9] to something more unique, such as `argocd_app_name` if the host happens to already have a name tag. Below is an example configuration:

**アプリケーションコントローラー**:
```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/argocd-application-controller.checks: |
      {
        "argocd": {
          "init_config": {},
          "instances": [
            {
              "app_controller_endpoint": "http://%%host%%:8082/metrics",
              "rename_labels": {
                "name": "argocd_app_name"
              }
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: 'argocd-application-controller'
# (...)
```

##### ログ収集

_Agent バージョン 6.0 以降で利用可能_

Argo CD logs can be collected from the different Argo CD pods through Kubernetes. Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][10].

See the [Autodiscovery Integration Templates][11] for guidance on applying the parameters below.

| パラメーター      | 値                                                |
| -------------- | ---------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "argocd", "service": "<SERVICE_NAME>"}`  |

### 検証

[Run the Agent's status subcommand][12] and look for `argocd` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "argocd" >}}


### イベント

Argo CD インテグレーションには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "argocd" >}}


## トラブルシューティング

ご不明な点は [Datadog サポート][15]までお問い合わせください。



[1]: https://argo-cd.readthedocs.io/en/stable/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/integrations/openmetrics/
[4]: https://argo-cd.readthedocs.io/en/stable/operator-manual/installation/
[5]: https://docs.datadoghq.com/ja/containers/kubernetes/integrations/?tab=kubernetesadv2
[6]: https://github.com/DataDog/integrations-core/blob/master/argocd/datadog_checks/argocd/data/conf.yaml.example
[7]: https://argo-cd.readthedocs.io/en/stable/operator-manual/metrics/#exposing-application-labels-as-prometheus-metrics
[8]: https://github.com/DataDog/integrations-core/blob/master/argocd/datadog_checks/argocd/data/conf.yaml.example#L45-L72
[9]: https://github.com/DataDog/integrations-core/blob/7.45.x/argocd/datadog_checks/argocd/data/conf.yaml.example#L164-L166
[10]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
[11]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[12]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[13]: https://github.com/DataDog/integrations-core/blob/master/argocd/metadata.csv
[14]: https://github.com/DataDog/integrations-core/blob/master/argocd/assets/service_checks.json
[15]: https://docs.datadoghq.com/ja/help/