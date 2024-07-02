---
"app_id": "nomad"
"app_uuid": "245bf496-4185-4407-a0fd-d6ef6fc125bb"
"assets":
  "dashboards":
    "Nomad Overview": "assets/dashboards/overview.json"
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": true
    "metrics":
      "check": "nomad.client.host.cpu.user"
      "metadata_path": "metadata.csv"
      "prefix": "nomad"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "10002"
    "source_type_name": "Nomad"
  "monitors":
    "Nomad Excessive Leadership Losses": "assets/monitors/nomad_excessive_leadership_losses.json"
    "Nomad Heartbeats Received": "assets/monitors/nomad_heartbeats_received.json"
    "Nomad Job Is Failing": "assets/monitors/nomad_job_is_failing.json"
    "Nomad No Jobs Running": "assets/monitors/nomad_no_jobs_running.json"
    "Nomad Pending Jobs": "assets/monitors/nomad_pending_jobs.json"
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": "Nomad"
  "sales_email": "help@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "configuration & deployment"
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/nomad/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "nomad"
"integration_id": "nomad"
"integration_title": "Nomad"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "nomad"
"public_title": "Nomad"
"short_description": "Easily Schedule and Deploy Applications at Any Scale"
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Configuration & Deployment"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "Easily Schedule and Deploy Applications at Any Scale"
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Nomad"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


![Nomad Dashboard][1]

## Overview

Gather metrics from your Nomad clusters to:

- Visualize and monitor cluster performance
- Alert on cluster health and availability

Recommended monitors are available to get notified on different Nomad events.

## セットアップ

### インストール

Nomad emits metrics to Datadog through DogStatsD. To enable the Nomad integration, [install the Datadog Agent][2] on each client and server host.

### 構成

Once the Datadog Agent is installed, add a Telemetry stanza to the Nomad configuration for your clients and servers:

```conf
telemetry {
  publish_allocation_metrics = true
  publish_node_metrics       = true
  datadog_address = "localhost:8125"
  disable_hostname = true
  collection_interval = "10s"
}
```

Next, reload or restart the Nomad agent on each host. You should start to see Nomad metrics flowing to your Datadog account.

## 収集データ

### メトリクス
{{< get-metrics-from-git "nomad" >}}


### イベント

The Nomad check does not include any events.

### サービスチェック

The Nomad check does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][4].

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/nomad/images/dashboard_overview.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/integrations-extras/blob/master/nomad/metadata.csv
[4]: https://docs.datadoghq.com/help/

