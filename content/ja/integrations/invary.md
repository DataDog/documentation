---
app_id: invary
app_uuid: 13509f2d-d922-4d8b-b3c2-7a8c2dd7fc54
assets:
  dashboards:
    Invary Runtime Integrity: assets/dashboards/invary_runtime_integrity.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10409
    source_type_name: Invary
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.invary.com
  name: Invary
  sales_email: sales@invary.com
  support_email: support@invary.com
categories:
- automation
- log collection
- os & system
- security
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/invary/README.md
display_on_public_website: true
draft: false
git_integration_title: invary
integration_id: invary
integration_title: Invary
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: invary
public_title: Invary
short_description: Visualize the Runtime Integrity of your operating systems
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Log Collection
  - Category::OS & System
  - Category::Security
  - Submitted Data Type::Logs
  - Supported OS::Linux
  configuration: README.md#Setup
  description: Visualize the Runtime Integrity of your operating systems
  media:
  - caption: Invary Runtime Integrity OOTB Dashboard
    image_url: images/dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Invary
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Visualize the Runtime Integrity of your Invary managed operating systems.

Invary validates the Runtime Integrity of operating systems and detects rootkits that can deceive other systems. This integration allows Invary Runtime Integrity appraisals to be streamed to Datadog and stored as logs. Invary appraisal events contain the overall status of your endpoints' integrity, along with details on what specific sections of your endpoint's kernel have been compromised, if any.  A detailed example of an Invary appraisal event can be found at: [developers.invary.com][1].

This integration also comes with an out-of-the-box dashboard that visualizes the Runtime Integrity of your endpoints managed by Invary.  The dashboard highlights endpoints that currently lack integrity and the trend of the integrity of your endpoints over time.  In addition, the Invary dashboard provides insights into your operating system inventory at runtime, including distributions and kernel versions in use.

This integration uses the [Invary API][1].

## セットアップ

### インストール

The Invary integration allows you to forward details about your endpoint and appraisal from the Invary SaaS platform to your Datadog instance. No additional installation is needed on your server.

### 構成

1. Complete the OAuth Authorization flow allowing Invary to communicate with your Datadog instance.
2. Review the "Invary Runtime Integrity" dashboard for an aggregate look at your Runtime Integrity.

### Validation

1. Review the "Invary Runtime Integrity" dashboard for timely and expected appraisal information.
2. Query your logs with the `source:invary` base query.

### Uninstallation

- Once this integration has been uninstalled, any previous authorizations are revoked. 
- Additionally, ensure that all API keys associated with this integration have been disabled by searching for the integration name on the [API Keys page][2].

## 収集データ

### Logs

Invary forwards your Runtime Integrity appraisal results with the `source:invary` tag. 

### メトリクス
The Invary Runtime Integrity integration does not include any metrics.

### サービスチェック
The Invary Runtime Integrity integration does not include any service checks.

### イベント
The Invary Runtime Integrity integration does not include any events.

## トラブルシューティング

Need help? Contact [Invary Support][3].


[1]: https://developers.invary.com/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: mailto:support@invary.com