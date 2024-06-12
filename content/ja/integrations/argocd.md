---
app_id: argocd
app_uuid: 49ad19d0-1452-4275-b0fe-cbda3821807d
assets:
  dashboards:
    Argo CD Overview: assets/dashboards/argo_cd_overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - argocd.api_server.go.goroutines
      - argocd.app_controller.go.goroutines
      - argocd.repo_server.go.goroutines
      metadata_path: metadata.csv
      prefix: argocd.
    process_signatures:
    - argocd-application-controller
    - argocd-repo-server
    - argocd-server
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: ArgoCD
  logs:
    source: argocd
  monitors:
    Sync Status: assets/recommended_monitors/application_sync_status.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- developer tools
- ログの収集
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/argocd/README.md
display_on_public_website: true
draft: false
git_integration_title: argocd
integration_id: argocd
integration_title: Argo CD
integration_version: 1.1.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: argocd
public_title: Argo CD
short_description: Argo CD
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
  configuration: README.md#Setup
  description: Argo CD
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Argo CD
---



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


##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Argo CD のログは、Kubernetes を通じて、異なる Argo CD ポッドから収集することができます。Datadog Agent では、ログの収集はデフォルトで無効になっています。有効にするには、[Kubernetes ログ収集][7]を参照してください。

[オートディスカバリーのインテグレーションテンプレート][8]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター      | 値                                                |
| -------------- | ---------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "argocd", "service": "<SERVICE_NAME>"}`   |

### 検証

[Agent の status サブコマンドを実行][9]し、Checks セクションで `argocd` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "argocd" >}}


### イベント

Argo CD インテグレーションには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "argocd" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。



[1]: https://argo-cd.readthedocs.io/en/stable/
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/integrations/openmetrics/
[4]: https://argo-cd.readthedocs.io/en/stable/operator-manual/installation/
[5]: https://docs.datadoghq.com/ja/containers/kubernetes/integrations/?tab=kubernetesadv2
[6]: https://github.com/DataDog/integrations-core/blob/master/argocd/datadog_checks/argocd/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
[8]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/argocd/metadata.csv
[11]: https://github.com/DataDog/integrations-core/blob/master/argocd/assets/service_checks.json
[12]: https://docs.datadoghq.com/ja/help/