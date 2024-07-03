---
app_id: stormforge
app_uuid: 6f1ddcc9-e704-4f94-941b-8a914fcd89a0
assets:
  dashboards:
    StormForge Optimize Live Application Overview: assets/dashboards/stormforge_overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: stormforge.recommendation_cpu_requests_cores
      metadata_path: metadata.csv
      prefix: stormforge.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: StormForge
author:
  homepage: https://stormforge.io
  name: StormForge
  sales_email: sales@stormforge.io
  support_email: support@stormforge.io
categories:
- cloud
- configuration & deployment
- containers
- cost management
- kubernetes
- orchestration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/stormforge/README.md
display_on_public_website: true
draft: false
git_integration_title: stormforge
integration_id: stormforge
integration_title: StormForge
integration_version: ''
is_public: true
kind: integration
manifest_version: 2.0.0
name: stormforge
oauth: {}
public_title: StormForge
short_description: Real-time optimization of Kubernetes resources using machine learning
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Configuration & Deployment
  - Category::Containers
  - Category::Cost Management
  - Category::Kubernetes
  - Category::Orchestration
  - Offering::Integration
  - Supported OS::Linux
  configuration: README.md#Setup
  description: Real-time optimization of Kubernetes resources using machine learning
  media:
  - caption: Create an Application as a collection of resources to target for optimization.
    image_url: images/sf_ui_01_application.jpg
    media_type: image
  - caption: Configure Optimize Live
    image_url: images/sf_ui_02_configure.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: StormForge
---



## Overview

[StormForge Optimize Live][1] applies machine learning to your observability metrics to make real-time recommendations to resource requests for any deployment running in Kubernetes.

**With StormForge Optimize Live, you can:**
- Improve resource efficiency
- Leverage existing observability data
- Reduce risk of performance issues
- Achieve fast time to value
- Deploy recommendations automatically or with approval

## Setup

To set up this integration, you must have a StormForge account along with Datadog API and application keys.

### Configuration

1. Create a [Datadog API key][2].
2. Create a [Datadog application key][3].
3. Add Datadog API and application keys to the [StormForge Datadog Integration][4].
4. Deploy Optimize Live
5. Set up your Applications within [StormForge][5].

More detailed instructions can be found in the StormForge [getting started guide][6].

## Data Collected

### Metrics
{{< get-metrics-from-git "stormforge" >}}


### Events

The StormForge integration creates events for:
- Application updates
- Recommendations that have been applied

### Service Checks

The StormForge integration does not include any service checks.

## Support

For questions or other support, you can contact StormForge via [email][8].

[1]: https://www.stormforge.io/how-stormforge-optimize-live-works/
[2]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#api-keys
[3]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#application-keys
[4]: https://docs.stormforge.io/optimize-live/getting-started/install/#datadog-metric-provider
[5]: https://app.stormforge.io
[6]: https://docs.stormforge.io/optimize-live/
[7]: https://github.com/DataDog/integrations-extras/blob/master/stormforge/metadata.csv
[8]: mailto:support@stormforge.io