---
app_id: vantage
app_uuid: 2784a986-2673-4189-a3b8-320755f6c2b4
assets:
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.vantage.sh
  name: Vantage
  sales_email: sales@vantage.sh
  support_email: support@vantage.sh
categories:
- cost management
- cloud
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/vantage/README.md
display_on_public_website: true
draft: false
git_integration_title: vantage
integration_id: vantage
integration_title: Vantage
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: vantage
public_title: Vantage
short_description: Import your Datadog costs and track them alongside other infrastructure
  spending
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
  description: Import your Datadog costs and track them alongside other infrastructure
    spending
  media:
  - caption: Datadog Monthly Costs with Budget
    image_url: images/vantage-datadog-budget-forecast.png
    media_type: image
  - caption: Datadog Costs - Grouped by Service
    image_url: images/vantage-datadog-grouped-report.png
    media_type: image
  - caption: Provider Comparison Overview
    image_url: images/vantage-datadog-provider-summary.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Vantage
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Vantage is a cloud cost transparency and optimization platform. This integration allows Datadog users to import their Datadog costs into Vantage and track them alongside their other infrastructure spending, such as AWS, Snowflake, and Kubernetes.

## セットアップ

### インストール

Visit [Vantage][1] to sign up for free. Once registered, visit the [Vantage integrations page][2] and add a Datadog integration. This guides you through the Datadog OAUTH2 flow to grant Vantage access to your billing and usage data.

### 構成

Once integrated, begin exploring your Datadog costs within Vantage. You can create filters for specific Datadog organizations and services alongside costs from any of the other supported Vantage providers.

## Uninstallation

To remove the Datadog integration from Vantage, navigate to the [Vantage integrations page][2] and click **Remove**. Additionally, uninstall this integration from Datadog by clicking the **Uninstall Integration** button below. Once you uninstall this integration, any previous authorizations are revoked. 

Additionally, ensure that all API keys associated with this integration have been disabled by searching for the integration name on the [API Keys management page][3].

## Support

Need help? Contact [Vantage support][4].


[1]: https://console.vantage.sh
[2]: https://console.vantage.sh/settings/integrations
[3]: https://app.datadoghq.com/organization-settings/api-keys?filter=Vantage
[4]: mailto:support@vantage.sh