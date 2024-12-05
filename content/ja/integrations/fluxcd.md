---
app_id: fluxcd
app_uuid: 11cc5047-83aa-44df-b7ca-9c6e1c32b723
assets:
  dashboards:
    Fluxcd: assets/dashboards/fluxcd.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: fluxcd.gotk.suspend.status
      metadata_path: metadata.csv
      prefix: fluxcd.
    process_signatures:
    - helm-controller
    - kustomize-controller
    - notification-controller
    - source-controller
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10302
    source_type_name: fluxcd
  monitors:
    Active Workers: assets/monitors/active_workers.json
    Error Count: assets/monitors/error_count.json
  saved_views:
    flux_errors: assets/saved_views/errors.json
    flux_overview: assets/saved_views/overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- kubernetes
- 開発ツール
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/fluxcd/README.md
display_on_public_website: true
draft: false
git_integration_title: fluxcd
integration_id: fluxcd
integration_title: fluxcd
integration_version: 1.2.2
is_public: true
manifest_version: 2.0.0
name: fluxcd
public_title: fluxcd
short_description: Fluxcd の openmetric v2 とのインテグレーション
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Kubernetes
  - Category::Developer Tools
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Fluxcd の openmetric v2 とのインテグレーション
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/container-native-integrations/#cicd-with-flux
  support: README.md#Support
  title: fluxcd
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

This check monitors [Flux][1] through the Datadog Agent. Flux is a set of continuous and progressive delivery solutions for Kubernetes that is open and extensible.

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Starting from Agent release 7.51.0, the Fluxcd check is included in the [Datadog Agent][3] package. No additional installation is needed on your server.

For older versions of the Agent, [use these steps to install][4] the integration.


### 構成

This integration supports collecting metrics and logs from the following Flux services:

- `helm-controller`
- `kustomize-controller`
- `notification-controller`
- `source-controller`

You can pick and choose which services you monitor depending on your needs.

#### メトリクスの収集

This is an example configuration with Kubernetes annotations on your Flux pods. See the [sample configuration file][5] for all available configuration options.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/manager.checks: |-
      {
        "fluxcd": {
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:8080/metrics"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: 'manager'
# (...)
```

#### ログ収集

_Agent バージョン 6.0 以降で利用可能_

Flux logs can be collected from the different Flux pods through Kubernetes. Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][6].

[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター      | 値                                                   |
| -------------- | ------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "fluxcd", "service": "<SERVICE_NAME>"}`  |

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `fluxcd` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "fluxcd" >}}


### イベント

fluxcd インテグレーションには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "fluxcd" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Monitoring your container-native technologies][11]
- [コンテナネイティブな CI/CD パイプラインの健全性とパフォーマンスを監視する][12]


[1]: https://fluxcd.io/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/?tab=agentv721v621#installation
[5]: https://github.com/DataDog/integrations-core/blob/7.51.x/fluxcd/datadog_checks/fluxcd/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/fluxcd/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/fluxcd/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/
[11]: https://www.datadoghq.com/blog/container-native-integrations/#cicd-with-flux
[12]: https://www.datadoghq.com/blog/container-native-ci-cd-integrations/
