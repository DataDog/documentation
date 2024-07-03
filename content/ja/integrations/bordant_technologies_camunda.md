---
algolia:
  subcategory: Marketplace インテグレーション
app_id: bordant-technologies-camunda
app_uuid: a8413249-3027-48ad-b5bd-2ac72edd7ded
assets:
  dashboards:
    Camunda 8 - Overview: assets/dashboards/camunda_8_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: camunda8.broker.zeebe.health
      metadata_path: metadata.csv
      prefix: camunda8.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 11136032
    source_type_name: Camunda 8
author:
  homepage: https://www.bordant.com
  name: Bordant Technologies
  sales_email: contact@bordant.com
  support_email: support@bordant.com
  vendor_id: bordant-technologies
categories:
- marketplace
- モニター
- オーケストレーション
- kubernetes
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: bordant_technologies_camunda
integration_id: bordant-technologies-camunda
integration_title: Camunda 8
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: bordant_technologies_camunda
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: camunda8
  short_description: Monthly flat fee for Camunda 8 integration
  unit_price: 600
public_title: Camunda 8
short_description: Monitor your Camunda 8 workflow engine's health and performance.
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
  - Category::Marketplace
  - Category::Metrics
  - Category::Orchestration
  - Offering::Integration
  - Category::Kubernetes
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Monitor your Camunda 8 workflow engine's health and performance.
  media:
  - caption: Monitor your process engine's general health with the Camunda 8 dashboard.
    image_url: images/Camunda_8-Overview_1.png
    media_type: image
  - caption: The dashboard allows to individually monitor various components of your
      Camunda 8 workflow engine.
    image_url: images/Camunda_8-Overview_2.png
    media_type: image
  - caption: Metrics displayed in the dashboard include performance metrics, execution
      statistics, resource usage, and engine throughput.
    image_url: images/Camunda_8-Overview_3.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Camunda 8
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

Camunda 8 is a workflow and decision automation platform designed to help developers manage business processes across microservices. The platform facilitates collaboration between business and IT teams, supports extensive integration options, and allows for real-time process execution monitoring.

Unlock advanced monitoring capabilities for your Camunda 8 workflow engine. This integration smoothly fits into your monitoring landscape and offers system administrators as well as DevOps engineers deep insights into Camunda 8. Monitor your engine's health, optimize its throughput, or identify bottlenecks in your Camunda setup.

### 機能
- **Monitor Engine Health**: Ensure your engine is running smoothly.

- **Optimize Throughput**: Better understand the pressure put on your engine by watching the process execution in real time so you know it can handle the load.

- **Identify Bottlenecks**: Gain insight into the interplay between the engines' various components and pinpoint throughput-limiting factors as each component is individually monitored.

### ハイライト

- **Easy Setup**: Quickly set up the integration, no extensive configuration or technical adjustments needed. Start monitoring Camunda 8 with all of Datadog's capabilities.

- **360-degree Monitoring**: Understand your Camunda 8 engine beyond basic monitoring. A wide range of Camunda 8 metrics are reported to Datadog, including performance metrics, execution statistics, resource usage, and engine throughput.

- **Intuitive Insights**: Use the out-of-the-box visualizations or create your own. The Camunda 8 dashboard lets you get started quickly while also being easily extensible.

## サポート

For support or feature requests, reach out to Bordant Technologies through the following channels:

- Support: [support@bordant.com][2]

[1]: https://docs.camunda.io/docs/self-managed/platform-deployment/overview/
[2]: mailto:support@bordant.com
[3]: https://docs.datadoghq.com/ja/agent/
[4]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[5]: https://docs.datadoghq.com/ja/containers/kubernetes/integrations/?tab=kubernetesadv2


---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/bordant-technologies-camunda" target="_blank">Click Here</a> to purchase this application.