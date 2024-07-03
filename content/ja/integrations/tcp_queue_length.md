---
app_id: tcp-queue-length
app_uuid: 2c48a360-9fbb-4cd6-9316-0e9afd9926c8
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: tcp_queue.read_buffer_max_usage_pct
      metadata_path: metadata.csv
      prefix: tcp_queue.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10295
    source_type_name: TCP Queue Length
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- developer tools
- network
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/tcp_queue_length/README.md
display_on_public_website: true
draft: false
git_integration_title: tcp_queue_length
integration_id: tcp-queue-length
integration_title: TCP Queue Length
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: tcp_queue_length
public_title: TCP Queue Length
short_description: Track the size of the TCP buffers with Datadog.
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Developer Tools
  - Category::Network
  - Supported OS::Linux
  configuration: README.md#Setup
  description: Track the size of the TCP buffers with Datadog.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: TCP Queue Length
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors the usage of the Linux TCP receive and send queues. It can detect if a TCP receive or send queue is full for individual containers.

## セットアップ

### インストール

`tcp_queue_length` is a core Agent 6/7 check that relies on an eBPF part implemented in `system-probe`. Agent version 7.24.1/6.24.1 or above is required.

The eBPF program used by `system-probe` is compiled at runtime and requires you to have access to the proper kernel headers.

On Debian-like distributions, install the kernel headers like this:
```sh
apt install -y linux-headers-$(uname -r)
```

On RHEL-like distributions, install the kernel headers like this:
```sh
yum install -y kernel-headers-$(uname -r)
yum install -y kernel-devel-$(uname -r)
```

**Note**: Windows and CentOS/RHEL versions earlier than 8 are not supported.

### 構成

Enabling the `tcp_queue_length` integration requires both the `system-probe` and the core agent to have the configuration option enabled.

Inside the `system-probe.yaml` configuration file, the following parameters must be set:
```yaml
system_probe_config:
  enable_tcp_queue_length: true
```

1. Edit the `tcp_queue_length.d/conf.yaml` file, in the `conf.d/` folder at the root of your
   Agent's configuration directory to start collecting your tcp_queue_length performance data.
   See the [sample tcp_queue_length.d/conf.yaml][1] for all available configuration options.

2. [Restart the Agent][2].


### Configuration with Helm

With the [Datadog Helm chart][3], the `system-probe` must be activated by setting `datadog.systemProbe.enabled` to `true` in the `values.yaml` file.
Then, the check can be activated by setting the `datadog.systemProbe.enableTCPQueueLength` parameter.

### Configuration with the Operator (v1.0.0+)

Set the `features.tcpQueueLength.enabled` parameter in the DatadogAgent manifest:
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    tcpQueueLength:
      enabled: true
```

**Note**: When using COS (Container Optimized OS), override the `src` volume in the node Agent:
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    tcpQueueLength:
      enabled: true
  override:
    nodeAgent:
      volumes: 
      - emptyDir: {}
        name: src
```

### Validation

[Run the Agent's `status` subcommand][2] and look for `tcp_queue_length` under the checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "tcp_queue_length" >}}


### サービスチェック

The TCP Queue Length check does not include any service checks.

### イベント

The TCP Queue Length check does not include any events.

## トラブルシューティング

Need help? Contact [Datadog support][5].

[1]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/tcp_queue_length.d/conf.yaml.example
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://github.com/DataDog/helm-charts
[4]: https://github.com/DataDog/integrations-core/blob/master/tcp_queue_length/metadata.csv
[5]: https://docs.datadoghq.com/ja/help/