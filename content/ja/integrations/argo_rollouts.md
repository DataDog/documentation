---
app_id: argo-rollouts
app_uuid: 28d531ac-954c-4c5a-8769-589589f793e0
assets:
  dashboards:
    Argo Rollouts Overview: assets/dashboards/argo_rollouts_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: argo_rollouts.go.threads
      metadata_path: metadata.csv
      prefix: argo_rollouts.
    process_signatures:
    - rollouts-controller
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 8465752
    source_type_name: Argo Rollouts
  monitors:
    Argo Rollout is in Non Running or Completed State: assets/monitors/rollout_phase.json
  saved_views:
    Argo Rollouts Error Logs Overview: assets/saved_views/error_logs_overview.json
    Argo Rollouts Logs Overview: assets/saved_views/logs_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- モニター
- kubernetes
- 開発ツール
- ログの収集
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/argo_rollouts/README.md
display_on_public_website: true
draft: false
git_integration_title: argo_rollouts
integration_id: argo-rollouts
integration_title: Argo Rollouts
integration_version: 2.2.0
is_public: true
manifest_version: 2.0.0
name: argo_rollouts
public_title: Argo Rollouts
short_description: Argo Rollouts の健全性とパフォーマンスを監視
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
  - Category::Developer Tools
  - Category::Log Collection
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Argo Rollouts の健全性とパフォーマンスを監視
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Argo Rollouts
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、Datadog Agent を通じて [Argo Rollouts][1] を監視します。

## セットアップ

Kubernetes 環境で実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境での構成の詳細については、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してください。

### インストール

Agent リリース 7.53.0 から、Argo Rollouts チェックは [Datadog Agent][3] パッケージに含まれています。お使いの環境に追加インストールする必要はありません。

このチェックは、[OpenMetrics][4] を使って、Argo Rollouts が公開している OpenMetrics エンドポイントからメトリクス を収集します。これには Python 3 が必要です。

### 構成

Argo Rollouts コントローラーでは、ポート `8090` の `/metrics` で Prometheus 形式のメトリクスが容易に利用可能です。Agent がメトリクスの収集を開始するには、Argo Rollouts ポッドにアノテーションを付ける必要があります。アノテーションの詳細については、[オートディスカバリーインテグレーションテンプレート][2]を参照してください。その他の構成オプションについては、[サンプル argo_rollouts.d/conf.yaml][7] を参照してください。

**注**: リストされたメトリクスは、利用可能な場合にのみ収集できます。一部のメトリクスは、特定のアクションが実行されたときにのみ生成されます。例えば、`argo_rollouts.info.replicas.updated` メトリクスは、レプリカの更新後にのみ公開されます。

Argo Rollouts チェック の構成に必要なパラメーターはこれだけです。
- `openmetrics_endpoint`: このパラメーターには、Prometheus 形式のメトリクスが公開される場所を設定する必要があります。デフォルトのポートは `8090` です。コンテナ環境では、`%%host%%` を[ホストの自動検出][2]に使用します。

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/argo-rollouts.checks: |
      {
        "argo_rollouts": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:8090/metrics"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: 'argo-rollouts'
# (...)
```

#### ログ収集

_Agent バージョン 6.0 以降で利用可能_

Argo Rollouts のログは、Kubernetes を通じて、異なる Argo Rollouts ポッドから収集することができます。Datadog Agent では、ログの収集はデフォルトで無効になっています。有効にするには、[Kubernetes ログ収集][7]を参照してください。

[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター      | 値                                                   |
| -------------- | ------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "argo_rollouts", "service": "<SERVICE_NAME>"}`  |

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `argo_rollouts` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "argo-rollouts" >}}


### イベント

Argo Rollouts インテグレーションには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "argo-rollouts" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [コンテナネイティブな CI/CD パイプラインの健全性とパフォーマンスを監視する][11]

[1]: https://argoproj.github.io/rollouts/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ja/integrations/openmetrics/
[5]: https://github.com/DataDog/integrations-core/blob/master/argo_rollouts/datadog_checks/argo_rollouts/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/argo_rollouts/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/argo_rollouts/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/
[11]: https://www.datadoghq.com/blog/container-native-ci-cd-integrations/