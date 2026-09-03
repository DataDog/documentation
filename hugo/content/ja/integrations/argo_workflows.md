---
app_id: argo-workflows
app_uuid: f96fd144-a3c0-4fed-adcc-53f11f80ec04
assets:
  dashboards:
    Argo Workflows: assets/dashboards/argo_workflows.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - argo_workflows.go.info
      metadata_path: metadata.csv
      prefix: argo_workflows.
    process_signatures:
    - workflow-controller
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 8511369
    source_type_name: Argo Workflows
  monitors:
    New errors detected in Argo Workflows: assets/monitors/errors.json
  saved_views:
    errors: assets/saved_views/errors.json
    overview: assets/saved_views/overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- 開発ツール
- ログの収集
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/argo_workflows/README.md
display_on_public_website: true
draft: false
git_integration_title: argo_workflows
integration_id: argo-workflows
integration_title: Argo Workflows
integration_version: 2.3.0
is_public: true
manifest_version: 2.0.0
name: argo_workflows
public_title: Argo Workflows
short_description: Argo Workflows の健全性とパフォーマンスを監視
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
  - Category::Developer Tools
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: Argo Workflows の健全性とパフォーマンスを監視
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Argo Workflows
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、Datadog Agent を通じて [Argo Workflows][1] を監視します。

## セットアップ

Kubernetes 環境で実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境での構成の詳細については、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してください。

### インストール

Agent リリース 7.53.0 から、Argo Workflows チェックは [Datadog Agent][3] パッケージに含まれています。お使いの環境に追加インストールする必要はありません。

このチェックは、[OpenMetrics][4] を使って、OpenMetrics エンドポイントからメトリクス を収集します。

### 構成

Argo Workflows ワークフローコントローラーでは、ポート `9090` の `/metrics` で Prometheus 形式のメトリクスが利用可能です。Agent がメトリクスの収集を開始するには、ワークフローコントローラーポッドにアノテーションを付ける必要があります。アノテーションの詳細については、[オートディスカバリーインテグレーションテンプレート][2]を参照してください。その他の構成オプションについては、[サンプル argo_workflows.d/conf.yaml][6] を参照してください。

Argo Workflows チェックの構成に必要なパラメーターは以下の 1 つだけです。
- `openmetrics_endpoint`: このパラメーターには、Prometheus 形式のメトリクスが公開される場所を設定する必要があります。デフォルトのポートは `9090` です。コンテナ環境では、`%%host%%` を[ホストの自動検出][2]に使用します。

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/argo-workflows.checks: |
      {
        "argo_workflows": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:9090/metrics"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: 'argo-workflows'
# (...)
```

#### ログ収集

_Agent バージョン 6.0 以降で利用可能_

Argo Workflows のログは、Kubernetes を通じて、異なる Argo Workflows ポッドから収集することができます。Datadog Agent では、ログの収集はデフォルトで無効になっています。有効にするには、[Kubernetes ログ収集][7]を参照してください。

[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター      | 値                                                   |
| -------------- | ------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "argo_workflows", "service": "<SERVICE_NAME>"}`  |

### 検証

[Agent の status サブコマンドを実行][8]し、Checks セクションで `argo_workflows` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "argo-workflows" >}}


### イベント

Argo Workflows インテグレーションには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "argo-workflows" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [コンテナネイティブな CI/CD パイプラインの健全性とパフォーマンスを監視する][12]

[1]: https://argo-workflows.readthedocs.io/en/stable/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ja/integrations/openmetrics/
[5]: https://argo-workflows.readthedocs.io/en/stable/metrics/
[6]: https://github.com/DataDog/integrations-core/blob/master/argo_workflows/datadog_checks/argo_workflows/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/argo_workflows/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/argo_workflows/assets/service_checks.json
[11]: https://docs.datadoghq.com/ja/help/
[12]: https://www.datadoghq.com/blog/container-native-ci-cd-integrations/