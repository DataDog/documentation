---
app_id: onelogin
app_uuid: e895d126-f1a3-421a-96d7-03e870447e23
assets:
  dashboards:
    OneLogin-Overview: assets/dashboards/OneLogin-Overview_dashboard.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 617
    source_type_name: OneLogin
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- security
custom_kind: インテグレーション
dependencies: []
description: OneLogin
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/onelogin/
draft: false
git_integration_title: onelogin
has_logo: false
integration_id: onelogin
integration_title: OneLogin
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: onelogin
public_title: OneLogin
short_description: Integrate with OneLogin event logs.
supported_os:
- linux
- windows
- macos
team: web-integrations
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Log Collection
  - Category::Security
  configuration: README.md#Setup
  description: Integrate with OneLogin event logs.
  media: []
  overview: README.md#Overview
  support: README.md#Troubleshooting
  title: OneLogin
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview

Connect Datadog with OneLogin to see logs published by OneLogin. The OneLogin integration collects logs to track any [event][1] in OneLogin, including logins, file access, and updates to admin privileges. You can use this integration for compliance and security in conjunction with the [OOTB SIEM rules][2] for OneLogin.

## セットアップ

### Log collection
#### Generate Client ID and Client Secret

1. Log in to your OneLogin account.
2. Navigate to **Administration** > **Developers** > **Api Credentials**.
3. Click **New Credential** and give your credential a meaningful name.
4. Give your new credential **Read All** access.
5. Click on your new credential to view the Client ID and Client Secret.

#### Installation and configuration

1. Open the Datadog [OneLogin integration tile][3].
2. Enter the Client ID and Client Secret into the corresponding fields.
3. Optionally add comma-separated tags to associate with your logs.

### メトリクス

The OneLogin integration does not include any metrics.

### イベント

The OneLogin integration does not include any events.

### Service checks

The OneLogin integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][4].

[1]: https://developers.onelogin.com/api-docs/1/events/event-resource
[2]: https://docs.datadoghq.com/ja/security/default_rules/?search=onelogin
[3]: https://app.datadoghq.com/account/settings#integrations/onelogin
[4]: https://docs.datadoghq.com/ja/help/