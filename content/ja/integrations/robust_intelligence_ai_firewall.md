---
app_id: robust-intelligence-ai-firewall
app_uuid: 1d208134-9005-4a79-bbc1-445950d1a5c7
assets:
  dashboards:
    ai_firewall_results: assets/dashboards/robust_intelligence_ai_firewall_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: robust_intelligence_ai_firewall.firewall_requests.count
      metadata_path: metadata.csv
      prefix: robust_intelligence_ai_firewall.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10418
    source_type_name: Robust Intelligence AI Firewall
author:
  homepage: https://www.robustintelligence.com/
  name: Robust Intelligence
  sales_email: contact@robustintelligence.com
  support_email: help@robustintelligence.com
categories:
- ai/ml
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/robust_intelligence_ai_firewall/README.md
display_on_public_website: true
draft: false
git_integration_title: robust_intelligence_ai_firewall
integration_id: robust-intelligence-ai-firewall
integration_title: Robust Intelligence AI Firewall
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: robust_intelligence_ai_firewall
public_title: Robust Intelligence AI Firewall
short_description: Monitor AI Firewall results using Datadog
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::AI/ML
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Monitor AI Firewall results using Datadog
  media:
  - caption: Robust Intelligence AI Firewall
    image_url: images/ai-firewall.png
    media_type: image
  - caption: Robust Intelligence AI Firewall Results dashboard
    image_url: images/firewall-dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Robust Intelligence AI Firewall
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

The [Robust Intelligence AI Firewall][1] is a protective layer for AI models.

The AI Firewall inspects incoming user prompts to block malicious payloads, including any that attempt prompt injection, prompt extraction, or PII detection. The AI Firewall scans LLM model output to ensure it's free of false information, sensitive data, and harmful content. Responses that fall outside your organization's standards are blocked from the application.

This integration monitors the AI Firewall results through the Datadog Agent. It provides users with observability of their AI security issues including metrics for allowed data points, blocked data points, and insight on why each data point was blocked.

## セットアップ

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][2] for guidance on applying these instructions.

### インストール

For Agent v7.21+ / v6.21+, follow the instructions below to install the Robust Intelligence AI Firewall check on your host. See [Use Community Integrations][3] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-robust-intelligence-ai-firewall==1.0.0
   ```

2. Configure your integration similar to core [integrations][2]. Refer to the Configuration section below for steps specific to this integration.

### 構成

1. Edit the `robust_intelligence_ai_firewall.d/conf.yaml` file in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your Robust Intelligence AI Firewall performance data.
    ```yaml
    init_config:

    instances:
        ## @param metrics_endpoint - string - required
        ## The URL to Robust Intelligence AI Firewall 
        ## internal metrics per loaded plugin in Prometheus
        ## format.
        #
      - openmetrics_endpoint: http://localhost:8080/metrics
    ```
   See the [sample robust_intelligence_ai_firewall.d/conf.yaml][4] file for all available configuration options.

2. To configure the integration for AI Firewall running in a containerized environment, add the following annotation to pods:
   ```yaml
   apiVersion: v1
   kind: Pod
   # (...)
   metadata:
     name: '<POD_NAME>'
     annotations:
       ad.datadoghq.com/<CONTAINER_IDENTIFIER>.checks: |
         {
           "robust_intelligence_ai_firewall": {
             "init_config": {},
             "instances": [
               {
                 "openmetrics_endpoint": "http://%%host%%:8080/metrics"
               }
             ]
           }
         }
       # (...)
   ```

3. [Restart the Agent][5].

### Validation

[Run the Agent's status subcommand][6] and look for `robust_intelligence_ai_firewall` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "robust_intelligence_ai_firewall" >}}


### サービスチェック

Robust Intelligence AI Firewall does not include any service checks.

### イベント

Robust Intelligence AI Firewall does not include any events.

## トラブルシューティング

Need Help? Contact [Robust Intelligence Support][8].


[1]: https://www.robustintelligence.com/platform/ai-firewall
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-extras/blob/master/robust_intelligence_ai_firewall/datadog_checks/robust_intelligence_ai_firewall/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-extras/blob/master/robust_intelligence_ai_firewall/metadata.csv
[8]: mailto:help@robustintelligence.com