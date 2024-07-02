---
"app_id": "systemd"
"app_uuid": "a18dccd2-35c0-40e2-9c0a-7a01a5daf5f3"
"assets":
  "dashboards":
    "Systemd Overview": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": systemd.units_by_state
      "metadata_path": metadata.csv
      "prefix": systemd.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10066"
    "source_type_name": Systemd
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- os & system
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/systemd/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "systemd"
"integration_id": "systemd"
"integration_title": "Systemd"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "systemd"
"public_title": "Systemd"
"short_description": "Get metrics about Systemd and units managed by Systemd"
"supported_os":
- linux
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Category::OS & System"
  "configuration": "README.md#Setup"
  "description": Get metrics about Systemd and units managed by Systemd
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Systemd
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors [Systemd][1] and the units it manages through the Datadog Agent.

- Track the state and health of your Systemd
- Monitor the units, services, sockets managed by Systemd

## セットアップ

### インストール

The Systemd check is included in the [Datadog Agent][2] package. No additional installation is needed on your server.

### 構成

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

To configure this check for an Agent running on a host:

1. Edit the `systemd.d/conf.yaml` file, in the `conf.d/` folder at the root of your
   Agent's configuration directory to start collecting your systemd performance data.
   See the [sample systemd.d/conf.yaml][1] for all available configuration options.

2. [Restart the Agent][2].

[1]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/systemd.d/conf.yaml.example
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, mount the `/run/systemd/` folder, which contains the socket `/run/systemd/private` needed to retrieve the Systemd data, for example:

```bash
docker run -d -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup/:ro \
              -v /run/systemd/:/host/run/systemd/:ro \
              -e DD_API_KEY=<YOUR_API_KEY> \
              datadog/agent:latest
```

{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's status subcommand][3] and look for `systemd` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "systemd" >}}


Some metrics are reported only if the respective configuration are enabled:

- `systemd.service.cpu_time_consumed` requires Systemd configuration `CPUAccounting` to be enabled
- `systemd.service.memory_usage` requires Systemd configuration `MemoryAccounting` to be enabled
- `systemd.service.task_count` requires Systemd configuration `TasksAccounting` to be enabled

Some metrics are only available from specific version of Systemd:

- `systemd.service.cpu_time_consumed` requires Systemd v220
- `systemd.service.restart_count` requires Systemd v235
- `systemd.socket.connection_refused_count` requires Systemd v239

### イベント

The Systemd check does not include any events.

### サービスチェック
{{< get-service-checks-from-git "systemd" >}}


## トラブルシューティング

Need help? Contact [Datadog support][4].



[1]: https://www.freedesktop.org/wiki/Software/systemd/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/help/
