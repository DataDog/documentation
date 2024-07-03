---
app_id: altostra
app_uuid: c22d6f84-3404-4638-99bc-7cb19ab4508a
assets:
  dashboards:
    Altostra: assets/dashboards/altostra.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: altostra.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10181
    source_type_name: Altostra
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Altostra
  sales_email: support@altostra.com
  support_email: support@altostra.com
categories:
- automation
- cloud
- configuration & deployment
- log collection
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/altostra/README.md
display_on_public_website: true
draft: false
git_integration_title: altostra
integration_id: altostra
integration_title: Altostra
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: altostra
public_title: Altostra
short_description: Automatically send your cloud applications logs from Altostra to
  Datadog
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
  - Category::Automation
  - Category::Cloud
  - Category::Configuration & Deployment
  - Category::Log Collection
  configuration: README.md#Setup
  description: Automatically send your cloud applications logs from Altostra to Datadog
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Altostra
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Altostra integrates with cloud computing services to provide your development teams with end-to-end workflows.

The Datadog Altostra integration enables you to automatically instrument your Altostra projects during deployment to send logs and metrics to your Datadog account. Control the integration configuration per deployment environment.

## セットアップ

### インストール

The Datadog Altostra integration is built-in. No installation is required.

### 構成

The Datadog integration is available in the Altostra Web Console under [integrations][1] on the account settings page.

1. Go to the [Integrations][1] section in your Altostra account settings.
2. Click on **Connect** for the **Datadog** integration.
3. Enter a **display name** for the integration.
4. Enter your Datadog account **API key**.
5. Click **OK** to finish configuring the integration.
6. Go to the [Environments][2] and click on the environment for which you wish to configure log shipping.
7. Under _Settings_, select the integration you configured in the previous steps from the **Log shipping** selection.
8. Click **Save Changes**.

### Validation

1. Deploy an Altostra project that contains a Lambda function to any environment you've configured for log shipping to Datadog.
2. Invoke the Lambda function.
3. You should see the Lambda function logs appear in the _Logs_ view in Datadog.

## トラブルシューティング

Need help? Contact [Datadog Support][3].

[1]: https://app.altostra.com/team/settings/integrations/logging
[2]: https://app.altostra.com/environments
[3]: /ja/help