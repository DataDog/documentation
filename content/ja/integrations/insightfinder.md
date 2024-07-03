---
app_id: insightfinder
app_uuid: 144b8c72-b842-4257-9815-93aa63ad2da1
assets:
  dashboards:
    InsightFinder Dashboard: assets/dashboards/ifdashboard.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: insightfinder.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10253
    source_type_name: InsightFinder
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: InsightFinder
  sales_email: support@insightfinder.com
  support_email: support@insightfinder.com
categories:
- alerting
- automation
- incidents
- notifications
- ai/ml
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/insightfinder/README.md
display_on_public_website: true
draft: false
git_integration_title: insightfinder
integration_id: insightfinder
integration_title: InsightFinder
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: insightfinder
public_title: InsightFinder
short_description: Integrate data from DataDog for analysis by InsightFinder
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Alerting
  - Category::Automation
  - Category::Incidents
  - Category::Notifications
  - Category::AI/ML
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Integrate data from DataDog for analysis by InsightFinder
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: InsightFinder
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

[InsightFinder][1] AIOps identifies system and application issues before they impact users. Powered by unsupervised machine learning, InsightFinder continuously learns from events, logs, metrics, and changes to detect anomalies, predict incidents, and remediate outages.

This bidirectional integration provides advanced AIOps capabilities. InsightFinder ingests data from Datadog through standard APIs and finds anomalous events before your business is impacted. Alerts for these anomalous events can then be sent into Datadog to notify your team.

## セットアップ

### インストール

To configure the integration and send data to InsightFinder, see the [InsightFinder-Datadog Integration][2]. You need a Datadog [API key and application key][3].


## Support

Contact [Datadog support][4] or email [InsightFinder support][5].


[1]: https://insightfinder.com/
[2]: https://insightfinder.com/datadog-integration/
[3]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[4]: https://docs.datadoghq.com/ja/help/
[5]: mailto:support@insightfinder.com