---
"app_id": "airbyte"
"app_uuid": "5994a02c-8754-40c3-9e99-a39ffc862b1c"
"assets":
  "dashboards":
    "airbyte_overview": assets/dashboards/airbyte_overview.json
  "integration":
    "auto_install": true
    "metrics":
      "check":
      - airbyte.metrics_reporter.est_num_metrics_emitted_by_reporter
      - airbyte.worker.attempt.created
      - airbyte.cron.jobs_run
      "metadata_path": metadata.csv
      "prefix": airbyte.
    "process_signatures":
    - airbyte-cron
    - airbyte-metrics-reporter
    - airbyte-server
    - airbyte-workers
    - "uvicorn connector_builder.entrypoint:app"
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10386"
    "source_type_name": Airbyte
  "monitors":
    "long_running_jobs": assets/monitors/long_running_jobs.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- ai/ml
- data stores
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/airbyte/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "airbyte"
"integration_id": "airbyte"
"integration_title": "Airbyte"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "airbyte"
"public_title": "Airbyte"
"short_description": "Monitor the state of your Airbyte deployment."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::AI/ML"
  - "Category::Data Stores"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Submitted Data Type::Metrics"
  "configuration": "README.md#Setup"
  "description": Monitor the state of your Airbyte deployment.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Airbyte
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors [Airbyte][1]. Metrics are sent to Datadog through [DogStatsD][2].

## Setup

### Installation

All steps below are needed for the Airbyte integration to work properly. Before you begin, [install the Datadog Agent][3] version `>=6.17` or `>=7.17`, which includes the StatsD/DogStatsD mapping feature.

### Configuration

1. Configure your Airbyte deployment [to send metrics to Datadog][4].
2. Update the [Datadog Agent main configuration file][5] `datadog.yaml` by adding the following configuration:

```yaml
dogstatsd_mapper_profiles:
  - name: airbyte_worker
    prefix: "worker."
    mappings:
      - match: "worker.temporal_workflow_*"
        name: "airbyte.worker.temporal_workflow.$1"
      - match: "worker.worker_*"
        name: "airbyte.worker.$1"
      - match: "worker.state_commit_*"
        name: "airbyte.worker.state_commit.$1"
      - match: "worker.job_*"
        name: "airbyte.worker.job.$1"
      - match: "worker.attempt_*"
        name: "airbyte.worker.attempt.$1"
      - match: "worker.activity_*"
        name: "airbyte.worker.activity.$1"
      - match: "worker.*"
        name: "airbyte.worker.$1"
  - name: airbyte_cron
    prefix: "cron."
    mappings:
      - match: "cron.cron_jobs_run"
        name: "airbyte.cron.jobs_run"
      - match: "cron.*"
        name: "airbyte.cron.$1"
  - name: airbyte_metrics_reporter
    prefix: "metrics-reporter."
    mappings:
      - match: "metrics-reporter.*"
        name: "airbyte.metrics_reporter.$1"
  - name: airbyte_orchestrator
    prefix: "orchestrator."
    mappings:
      - match: "orchestrator.*"
        name: "airbyte.orchestrator.$1"
  - name: airbyte_server
    prefix: "server."
    mappings:
      - match: "server.*"
        name: "airbyte.server.$1"
  - name: airbyte_general
    prefix: "airbyte."
    mappings:
      - match: "airbyte.worker.temporal_workflow_*"
        name: "airbyte.worker.temporal_workflow.$1"
      - match: "airbyte.worker.worker_*"
        name: "airbyte.worker.$1"
      - match: "airbyte.worker.state_commit_*"
        name: "airbyte.worker.state_commit.$1"
      - match: "airbyte.worker.job_*"
        name: "airbyte.worker.job.$1"
      - match: "airbyte.worker.attempt_*"
        name: "airbyte.worker.attempt.$1"
      - match: "airbyte.worker.activity_*"
        name: "airbyte.worker.activity.$1"
      - match: "airbyte.cron.cron_jobs_run"
        name: "airbyte.cron.jobs_run"
```

3. [Restart the Agent][6] and Airbyte.

## Data Collected

### Metrics
{{< get-metrics-from-git "airbyte" >}}


### Service Checks

The Airbyte check does not include any service checks.

### Events

The Airbyte check does not include any events.

## Troubleshooting

Need help? Contact [Datadog support][8].

[1]: https://airbyte.com/
[2]: https://docs.datadoghq.com/developers/dogstatsd
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.airbyte.com/operator-guides/collecting-metrics/
[5]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[7]: https://github.com/DataDog/integrations-core/blob/master/airbyte/metadata.csv
[8]: https://docs.datadoghq.com/help/

