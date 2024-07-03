---
app_id: cloudzero
app_uuid: 6f1a61c2-e875-42f7-b8ba-94b191786846
assets:
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.cloudzero.com/
  name: CloudZero
  sales_email: sales@cloudzero.com
  support_email: support@cloudzero.com
categories:
- cost management
- cloud
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/cloudzero/README.md
display_on_public_website: true
draft: false
git_integration_title: cloudzero
integration_id: cloudzero
integration_title: CloudZero
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: cloudzero
public_title: CloudZero
short_description: View and analyze your Datadog costs on the CloudZero platform
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
  - Offering::Integration
  - Category::Cost Management
  - Category::Cloud
  configuration: README.md#Setup
  description: View and analyze your Datadog costs on the CloudZero platform
  media:
  - caption: Cloud costs - Grouped by Provider
    image_url: images/CloudZero1.png
    media_type: image
  - caption: Datadog Costs - Grouped by Service
    image_url: images/CloudZero2.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: CloudZero
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

CloudZero helps engineering teams build cost-effective software. Use its platform to allocate 100% of your cloud, PaaS, and SaaS cost-regardless of tagging quality-and present it in a single unified view. Combine hourly cost data with business- and system-level telemetry to put cloud data in a business context through precise unit cost metrics like cost per customer, per product, per feature, per team, and more. CloudZero's AI-powered anomaly detection alerts engineers to abnormal spend events by pointing them directly to the affected infrastructure, and promotes engineering engagement in cloud cost management.

### Benefits

Once connected, the CloudZero platform regularly ingests your Datadog billing information for both committed and on-demand costs across all Datadog products. CloudZero unifies this data with the rest of your cloud costs, giving you a comprehensive assessment of your total cloud investment. The platform then puts all of your cloud spend through numerous analytics features, revealing opportunities for efficiency and letting you craft and send custom reports.

## セットアップ

### インストール

Click **Install Integration** on the [Datadog integration tile][1]. Once the integration is installed, click **Connect Accounts** under the **Configure** tab to authorize CloudZero to access your Datadog account. This will take you to the CloudZero application where you will create a connection adding a name and selecting the site to which your parent Datadog account is assigned.

Once a connection is created, click **Continue** to authorize CloudZero to pull data from your Datadog account into the CloudZero platform.

### 構成

You can adjust settings from the connection details page for your Datadog connection in CloudZero.

### Validation

1. From the list of [connections][2], you can see the status of your connection to Datadog.
2. Click on the name of your Datadog connection to view more details about the amount and timing of data that has been pulled from Datadog.
3. Once data ingestion has successfully run, see Datadog costs included in the [Cost Explorer][3].

## Uninstallation

- Once this integration has been uninstalled, any previous authorizations are revoked.
- Additionally, ensure that all API keys associated with this integration have been disabled by searching for the integration name on the [API Keys page][4].

## トラブルシューティング

Need help? Contact [CloudZero support][5].

[1]: https://app.datadoghq.com/integrations/cloudzero
[2]: https://app.cloudzero.com/organization/connections
[3]: https://app.cloudzero.com/explorer
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: mailto:support@cloudzero.com