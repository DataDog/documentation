---
app_id: cortex
app_uuid: 15baccdd-d89c-4591-ab45-e6378d8c174f
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: cortex.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10178
    source_type_name: cortex
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Cortex
  sales_email: support@getcortexapp.com
  support_email: support@getcortexapp.com
categories:
- incidents
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/cortex/README.md
display_on_public_website: true
draft: false
git_integration_title: cortex
integration_id: cortex
integration_title: Cortex
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: cortex
public_title: Cortex
short_description: Create Datadog Incidents directly from the Cortex dashboard.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Incidents
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Create Datadog Incidents directly from the Cortex dashboard.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Cortex
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

The [Cortex][1] integration enables you to trigger Datadog incidents directly from the Cortex dashboard.

## セットアップ

To set up this integration, you must have a Cortex account, along with Datadog API and Application keys.

### 構成

1. Contact Cortex for a demo if not a current customer.
2. Create a [Datadog API key][2].
3. Create a [Datadog Application key][3].
4. Add Datadog API and Application keys to the [Cortex Datadog Integration][4].

### Validation

1. Go to the [Cortex homepage][5].
2. Click on an existing service or [create a new service][6].
3. On the sidebar under "INTEGRATIONS", click "See all" and choose "Datadog".
4. Click the red "Trigger Incident" button above "Incidents".
5. Fill in information in the form and click green "Trigger Incident" button.
6. You should get a message on screen that says: "Incident has been triggered! Click here to see it in Datadog."
7. Additionally, the new incident should be displayed under "Incidents".

## 収集データ

### メトリクス

Cortex does not include any metrics.

### サービスチェック

Cortex does not include any service checks.

### イベント

Cortex does not include any events.

## トラブルシューティング

Need help? Contact [support@getcortexapp.com][7].

[1]: https://www.getcortexapp.com/
[2]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#api-keys
[3]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#application-keys
[4]: https://app.getcortexapp.com/admin/settings/datadog
[5]: https://app.getcortexapp.com/admin/index
[6]: https://app.getcortexapp.com/admin/service/new
[7]: mailto:support@getcortexapp.com