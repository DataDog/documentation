---
"app_id": "kube-scheduler"
"app_uuid": "1cf58691-ac6b-4f1d-b410-0132a4590378"
"assets":
  "dashboards":
    "kube_scheduler": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": kube_scheduler.threads
      "metadata_path": metadata.csv
      "prefix": kube_scheduler.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10056"
    "source_type_name": Kube_scheduler
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- containers
- kubernetes
- log collection
- orchestration
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "kube_scheduler"
"integration_id": "kube-scheduler"
"integration_title": "Kubernetes Scheduler"
"integration_version": "4.10.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "kube_scheduler"
"public_title": "Kubernetes Scheduler"
"short_description": "Monitors the Kubernetes Scheduler"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Containers"
  - "Category::Kubernetes"
  - "Category::Log Collection"
  - "Category::Orchestration"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Monitors the Kubernetes Scheduler
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Kubernetes Scheduler
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Kube Scheduler ダッシュボード][1]

## 概要

このチェックは、Kubernetes Control Plane の一部である [Kubernetes Scheduler][2] を監視します。

**注**: サービスが公開されていないため、このチェックは Amazon EKS クラスターのデータを収集しません。

## セットアップ

### インストール

Kubernetes Scheduler チェックは [Datadog Agent][3] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### 構成

[オートディスカバリーのインテグレーションテンプレート][4]のガイドを参照して、次のパラメーターを適用してください。

#### メトリクスの収集

1. kube_scheduler のパフォーマンスデータの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `kube_scheduler.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル kube_scheduler.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

#### ログ収集

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][7]を参照してください。

| パラメーター      | 値                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "kube_scheduler", "service": "<サービス名>"}` |

### 検証

[Agent の status サブコマンドを実行][8]し、Checks セクションで `kube_scheduler` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "kube_scheduler" >}}


### イベント

Kube Scheduler には、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "kube_scheduler" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/kube_scheduler/images/kube_scheduler_screenshot.jpeg
[2]: https://kubernetes.io/docs/reference/command-line-tools-reference/kube-scheduler
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[5]: https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/datadog_checks/kube_scheduler/data/conf.yaml.example
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#restart-the-agent
[7]: https://docs.datadoghq.com/agent/kubernetes/log/
[8]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/assets/service_checks.json
[11]: https://docs.datadoghq.com/help/

