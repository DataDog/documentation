---
app_id: kube-apiserver-metrics
app_uuid: c5caf884-25c1-4a35-a72e-fa75e7cc10fc
assets:
  dashboards:
    Kubernetes API Server - Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
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
    source_type_id: 10197
    source_type_name: Kubernetes API サーバーメトリクス
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- コンテナ
- kubernetes
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kube_apiserver_metrics/README.md
display_on_public_website: true
draft: false
git_integration_title: kube_apiserver_metrics
integration_id: kube-apiserver-metrics
integration_title: Kubernetes API サーバーメトリクス
integration_version: 6.2.0
is_public: true
manifest_version: 2.0.0
name: kube_apiserver_metrics
public_title: Kubernetes API サーバーメトリクス
short_description: Kubernetes APIServer からメトリクスを収集
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
  configuration: README.md#Setup
  description: Kubernetes APIServer からメトリクスを収集
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Kubernetes API サーバーメトリクス
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Kubernetes API Server ダッシュボード][1]

## 概要

このチェックは [Kube_apiserver_metrics][2] を監視します。

## セットアップ

### インストール

Kube_apiserver_metrics チェックは [Datadog Agent][3] パッケージに含まれているため、サーバーに追加でインストールする必要はありません。

### 構成

Kubernetes クラスターにマスターノードがあり、`kube-apiserver` イメージのポッドとコンテナが実行されている場合、Datadog Agent はこのポッドを[自動的に検出][4]し、その `kube_apiserver_metrics.d/auto_conf.yaml` ファイルに基づいてインテグレーションを構成します。

しかし、GKE、EKS、AKS のようなマネージド Kubernetes ディストリビューションを使用している場合、Agent が検出できる実行中の `kube-apiserver` ポッドが存在しないかもしれません。

この場合、`default` ネームスペースの `kubernetes` サービスに対してインテグレーションを設定できます。

- `kube_apiserver_metrics` チェックを実行する主なユースケースは、[クラスターレベルのチェック][5]としてです。
- これは、[サービスへのアノテーション](#annotate-service)を使用するか、Datadog Operator、Helm Chart、または手動で[ローカルファイル](#local-file)を使用して行うことができます。
- メトリクスを収集するには、[Autodiscovery][4] テンプレートに次のパラメーターと値を設定します。

| パラメーター         | 値                                                                 |
|-------------------|-----------------------------------------------------------------------|
| `<INTEGRATION_NAME>`| `["kube_apiserver_metrics"]`                                            |
| `<INIT_CONFIG>`     | `[{}]`                                                                  |
| `<INSTANCE_CONFIG>` | `[{"prometheus_url": "https://%%host%%:%%port%%/metrics"}]` |

利用可能なすべての構成オプションは、[kube_apiserver_metrics.yaml][6] で確認できます。

#### サービスへのアノテーション

`default` ネームスペース内の kubernetes サービスに次のアノテーションを付加できます。

{{< tabs >}}
{{% tab "アノテーション v2 (Datadog Agent v7.36+ 用)" %}}

```yaml
ad.datadoghq.com/endpoints.checks: |
  {
    "kube_apiserver_metrics": {
      "instances": [
        {
          "prometheus_url": "https://%%host%%:%%port%%/metrics"
        }
      ]
    }
  } 

```
{{% /tab %}}
{{% tab "アノテーション v1 (Datadog Agent < v7.36 用)" %}}

```yaml
annotations:
  ad.datadoghq.com/endpoints.check_names: '["kube_apiserver_metrics"]'
  ad.datadoghq.com/endpoints.init_configs: '[{}]'
  ad.datadoghq.com/endpoints.instances:
    '[{ "prometheus_url": "https://%%host%%:%%port%%/metrics"}]'
```
{{% /tab %}}
{{< /tabs >}}

これで、Datadog Cluster Agent は、各エンドポイントのチェックを Datadog Agent にスケジューリングします。

#### ローカルファイル

また、エンドポイントを直接 `kube_apiserver_metrics.yaml` ファイルに構成し、[Agent の構成ディレクトリ][7]のルートにある `conf.d/` フォルダーに配置して[クラスターチェック][8]として実行することもできます。

**注**: ローカルファイルや ConfigMap を使用してクラスターチェックを構成する場合、コンフィギュレーションファイルに `cluster_check: true` を追加する必要があります。

クラスターチェックを設定するために、Cluster Agent に[構成][9]を提供します。

{{< tabs >}} 
{{% tab "Helm" %}}
```yaml
clusterAgent:
  confd:
    kube_apiserver_metrics.yaml: |-
      advanced_ad_identifiers:
        - kube_endpoints:
            name: "kubernetes"
            namespace: "default"
      cluster_check: true
      init_config:
      instances:
        - prometheus_url: "https://%%host%%:%%port%%/metrics"
```
{{% /tab %}}

{{% tab "Operator" %}}

```yaml
spec:
#(...)
  override:
    clusterAgent:
      extraConfd:
        configDataMap:
          kube_apiserver_metrics.yaml: |-
            advanced_ad_identifiers:
              - kube_endpoints:
                  name: "kubernetes"
                  namespace: "default"
            cluster_check: true
            init_config:
            instances:
              - prometheus_url: "https://%%host%%:%%port%%/metrics"
```
{{% /tab %}}
{{< /tabs >}}

これらの構成により、Agent は `default` ネームスペース内の `kubernetes` サービスに、定義されたエンドポイント IP アドレスとポートでリクエストを行います。

### 検証

[Agent の status サブコマンドを実行][10]し、Checks セクションの `kube_apiserver_metrics` を探してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "kube-apiserver-metrics" >}}


### サービスチェック

Kube_apiserver_metrics には、サービスのチェック機能は含まれません。

### イベント

Kube_apiserver_metrics には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/kube_apiserver_metrics/images/screenshot.png
[2]: https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[5]: https://docs.datadoghq.com/ja/agent/cluster_agent/clusterchecks/
[6]: https://github.com/DataDog/integrations-core/blob/master/kube_apiserver_metrics/datadog_checks/kube_apiserver_metrics/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[8]: https:docs.datadoghq.com//containers/cluster_agent/clusterchecks/?tab=datadogoperator#setting-up-check-configurations
[9]: https://docs.datadoghq.com/ja/containers/cluster_agent/clusterchecks/?tab=helm#configuration-from-configuration-files
[10]: https://docs.datadoghq.com/ja/agent/faq/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/integrations-core/blob/master/kube_apiserver_metrics/metadata.csv
[12]: https://docs.datadoghq.com/ja/help/