---
app_id: kubelet
app_uuid: 8afd5500-0b72-4574-95f9-81282e2bd535
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: kubernetes.cpu.usage.total
      metadata_path: metadata.csv
      prefix: kubernetes.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Kubelet
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- containers
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kubelet/README.md
display_on_public_website: true
draft: false
git_integration_title: kubelet
integration_id: kubelet
integration_title: Kubelet
integration_version: 7.13.2
is_public: true
manifest_version: 2.0.0
name: kubelet
public_title: Kubelet
short_description: Collects container stats from kubelet.
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
  configuration: README.md#Setup
  description: Collects container stats from kubelet.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Kubelet
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This integration gets container metrics from kubelet

- Visualize and monitor kubelet stats
- Be notified about kubelet failovers and events.

## セットアップ

### インストール

The Kubelet check is included in the [Datadog Agent][1] package, so you don't need to install anything else on your servers.

### 構成

Edit the `kubelet.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][2]. See the [sample kubelet.d/conf.yaml][3] for all available configuration options.

### Validation

Run the [Agent's status subcommand][4] and look for `kubelet` under the Checks section.

### Compatibility

The kubelet check can run in two modes:

- The default prometheus mode is compatible with Kubernetes version 1.7.6 or superior
- The cAdvisor mode (enabled by setting the `cadvisor_port` option) should be compatible with versions 1.3 and up. Consistent tagging and filtering requires at least version 6.2 of the Agent.

## OpenShift <3.7 support

The cAdvisor 4194 port is disabled by default on OpenShift. To enable it, you need to add
the following lines to your [node-config file][5]:

```text
kubeletArguments:
  cadvisor-port: ["4194"]
```

If you cannot open the port, disable both sources of container metric collection, by setting:

- `cadvisor_port` to `0`
- `metrics_endpoint` to `""`

The check can still collect:

- kubelet health service checks
- pod running/stopped metrics
- pod limits and requests
- node capacity metrics

## 収集データ

### サービスチェック
{{< get-service-checks-from-git "kubelet" >}}


### Excluded containers

To restrict the data collected to a subset of the containers deployed, set the [`DD_CONTAINER_EXCLUDE` environment variable][7]. Metrics are not included from the containers specified in that environment variable.

For network metrics reported at the pod level, containers cannot be excluded based on `name` or `image name` since other containers can be part of the same pod. So, if `DD_CONTAINER_EXCLUDE` applies to a namespace, the pod-level metrics are not reported if the pod is in that namespace. However, if `DD_CONTAINER_EXCLUDE` refers to a container name or image name, the pod-level metrics are reported even if the exclusion rules apply to some containers in the pod.

## トラブルシューティング

Need help? Contact [Datadog support][8].


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/kubelet/datadog_checks/kubelet/data/conf.yaml.default
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.openshift.org/3.7/install_config/master_node_configuration.html#node-configuration-files
[6]: https://github.com/DataDog/integrations-core/blob/master/kubelet/assets/service_checks.json
[7]: https://docs.datadoghq.com/ja/agent/guide/autodiscovery-management/?tab=containerizedagent
[8]: https://docs.datadoghq.com/ja/help/