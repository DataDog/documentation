---
"app_id": "kube-controller-manager"
"app_uuid": "25d4ccd6-de50-4ef0-849f-b7ab1aea203e"
"assets":
  "dashboards":
    "kube_controller_manager": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": kube_controller_manager.threads
      "metadata_path": metadata.csv
      "prefix": kube_controller_manager.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10055"
    "source_type_name": Kubernetes Controller Manager
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- containers
- kubernetes
- orchestration
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/kube_controller_manager/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "kube_controller_manager"
"integration_id": "kube-controller-manager"
"integration_title": "Kubernetes Controller Manager"
"integration_version": "5.1.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "kube_controller_manager"
"public_title": "Kubernetes Controller Manager"
"short_description": "Monitors the Kubernetes Controller Manager"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Containers"
  - "Category::Kubernetes"
  - "Category::Orchestration"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Monitors the Kubernetes Controller Manager
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Kubernetes Controller Manager
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Kube Controller Manager dashboard][1]

## Overview

This check monitors the [Kubernetes Controller Manager][2], part of the Kubernetes control plane.

**Note**: This check does not collect data for Amazon EKS clusters, as those services are not exposed.

## セットアップ

### インストール

The Kubernetes Controller Manager check is included in the [Datadog Agent][3] package, so you do not
need to install anything else on your server.

### 構成

1. Edit the `kube_controller_manager.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your kube_controller_manager performance data. See the [sample kube_controller_manager.d/conf.yaml][4] for all available configuration options.

2. [Restart the Agent][5]

This integration requires access to the controller manager's metric endpoint. To have access to the metric endpoint you should:

* have access to the IP/Port of the controller-manager process
* have `get` RBAC permissions to the /metrics endpoint (the default Datadog Helm chart already adds the right RBAC roles and bindings for this)

### Validation

[Run the Agent's `status` subcommand][6] and look for `kube_controller_manager` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "kube_controller_manager" >}}


### イベント

The Kubernetes Controller Manager check does not include any events.

### サービスチェック
{{< get-service-checks-from-git "kube_controller_manager" >}}


## トラブルシューティング

Need help? Contact [Datadog Support][9].

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/kube_controller_manager/images/screenshot.png
[2]: https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/kube_controller_manager/datadog_checks/kube_controller_manager/data/conf.yaml.example
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/kube_controller_manager/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/kube_controller_manager/assets/service_checks.json
[9]: https://docs.datadoghq.com/help/

