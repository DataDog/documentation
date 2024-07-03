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
    source_type_name: Kubernetes API server metrics
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- containers
- kubernetes
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kube_apiserver_metrics/README.md
display_on_public_website: true
draft: false
git_integration_title: kube_apiserver_metrics
integration_id: kube-apiserver-metrics
integration_title: Kubernetes API server metrics
integration_version: 4.3.1
is_public: true
manifest_version: 2.0.0
name: kube_apiserver_metrics
public_title: Kubernetes API server metrics
short_description: Collect metrics from the Kubernetes APIserver
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
  configuration: README.md#Setup
  description: Collect metrics from the Kubernetes APIserver
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Kubernetes API server metrics
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Kubernetes API Server dashboard][1]

## Overview

This check monitors [Kube_apiserver_metrics][2].

## セットアップ

### インストール

The Kube_apiserver_metrics check is included in the [Datadog Agent][3] package, so you do not need to install anything else on your server.

### 構成

The main use case to run the kube_apiserver_metrics check is as a Cluster Level Check.
See the documentation for [Cluster Level Checks][4].
You can annotate the service of your apiserver with the following:

```yaml
annotations:
  ad.datadoghq.com/endpoints.check_names: '["kube_apiserver_metrics"]'
  ad.datadoghq.com/endpoints.init_configs: '[{}]'
  ad.datadoghq.com/endpoints.instances:
    '[{ "prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true" }]'
```

Then the Datadog Cluster Agent schedules the check(s) for each endpoint onto Datadog Agent(s). 

You can also run the check by configuring the endpoints directly in the `kube_apiserver_metrics.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][5].
You must add `cluster_check: true` to your [configuration file][6] when using a static configuration file or ConfigMap to configure cluster checks. See the [sample kube_apiserver_metrics.d/conf.yaml][7] for all available configuration options.

By default the Agent running the check tries to get the service account bearer token to authenticate against the APIServer. If you are not using RBACs, set `bearer_token_auth` to `false`.

Finally, if you run the Datadog Agent on the master nodes, you can rely on [Autodiscovery][8] to schedule the check. It is automatic if you are running the official image `registry.k8s.io/kube-apiserver`.

### Validation

[Run the Agent's status subcommand][9] and look for `kube_apiserver_metrics` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "kube_apiserver_metrics" >}}


### サービスチェック

Kube_apiserver_metrics does not include any service checks.

### イベント

Kube_apiserver_metrics does not include any events.

## トラブルシューティング

Need help? Contact [Datadog support][11].

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/kube_apiserver_metrics/images/screenshot.png
[2]: https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ja/agent/cluster_agent/clusterchecks/
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://docs.datadoghq.com/ja/agent/cluster_agent/clusterchecks/#set-up-cluster-checks
[7]: https://github.com/DataDog/integrations-core/blob/master/kube_apiserver_metrics/datadog_checks/kube_apiserver_metrics/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[9]: https://docs.datadoghq.com/ja/agent/faq/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/kube_apiserver_metrics/metadata.csv
[11]: https://docs.datadoghq.com/ja/help/