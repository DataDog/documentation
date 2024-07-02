---
"app_id": "concourse-ci"
"app_uuid": "eb83d03f-e1d6-4718-8e54-922f4d2528b1"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": concourse.ci.goroutines
      "metadata_path": metadata.csv
      "prefix": concourse.ci.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10041"
    "source_type_name": Concourse CI
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Community
  "sales_email": help@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- automation
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/concourse_ci/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "concourse_ci"
"integration_id": "concourse-ci"
"integration_title": "Concourse-CI"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "concourse_ci"
"public_title": "Concourse-CI"
"short_description": "Collect metrics emitted from Concourse CI."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Automation"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Collect metrics emitted from Concourse CI.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Concourse-CI
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Configure the Datadog Metric Emitter in Concourse CI to:

- Visualize the duration of pipelines, number of containers and mounted volumes of workers.
- Identify slow requests to build routes.

## セットアップ

### インストール

Concourse CI comes bundled with a Datadog metrics emitter. A prerequisite to configuring [ATC][1] to emit metrics on start is to have a [Datadog Agent][2] installed.

### 構成

Configure ATC to use the Datadog emitter by setting the following options. It is important to use a prefix of `concourse.ci` to avoid emitting [custom metrics][3].

### Metric emitter options

See [Configuring Metrics][4] in the Concourse CI documentation for more information.

```text
Metric Emitter (Datadog):
    --datadog-agent-host=       Datadog agent host to expose dogstatsd metrics [$CONCOURSE_DATADOG_AGENT_HOST]
    --datadog-agent-port=       Datadog agent port to expose dogstatsd metrics [$CONCOURSE_DATADOG_AGENT_PORT]
    --datadog-prefix=           Prefix for all metrics to easily find them in Datadog [$CONCOURSE_DATADOG_PREFIX]
```

## 収集データ

### メトリクス
{{< get-metrics-from-git "concourse_ci" >}}


### イベント

This integration does not support events.

### Service

This integration does not collect service checks.

## トラブルシューティング

Need help? Contact [Datadog support][6].

[1]: https://concourse-ci.org/concepts.html
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/developers/metrics/custom_metrics/
[4]: https://concourse-ci.org/metrics.html#configuring-metrics
[5]: https://github.com/DataDog/integrations-extras/blob/master/concourse_ci/metadata.csv
[6]: https://docs.datadoghq.com/help/

