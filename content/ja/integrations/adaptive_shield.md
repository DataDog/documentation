---
app_id: adaptive-shield
app_uuid: 0c72bf61-1de6-4408-8a24-86f8e3413e07
assets:
  dashboards:
    adaptive_shield_overview: assets/dashboards/adaptive_shield_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10310
    source_type_name: adaptive_shield
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.adaptive-shield.com/
  name: Adaptive Shield
  sales_email: info@adaptive-shield.com
  support_email: support@adaptive-shield.com
categories:
- cloud
- security
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/adaptive_shield/README.md
display_on_public_website: true
draft: false
git_integration_title: adaptive_shield
integration_id: adaptive-shield
integration_title: Adaptive Shield
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: adaptive_shield
public_title: Adaptive Shield
short_description: Track SaaS posture alerts
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Security
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Track SaaS posture alerts
  media:
  - caption: SaaS environments posture in Adaptive Shield
    image_url: images/posture.png
    media_type: image
  - caption: Security Checks on SaaS configurations in Adaptive Shield
    image_url: images/security_checks.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Adaptive Shield
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## Overview
SaaS Apps like Office 365, Slack, Zoom, and Salesforce are vital to a business's day-to-day operations, but can often introduce new security challenges. Adaptive Shield's SaaS Security Posture Management solution (SSPM) features proactive, deep, continuous, and automated monitoring and management of business critical SaaS applications. By integrating with SaaS apps, Adaptive Shield enables security teams to gain control over their SaaS apps, allowing them to harden their security policies and reduce risks.

With the Adaptive Shield integration, you can track and monitor SaaS posture alerts, such as configuration drifts, integration failures, and security check degradations, as Datadog Events.

## セットアップ

1. Click **Connect Accounts** to begin authorization of this integration. You are then redirected to [Adaptive Shield][1].
2. Provide the alias name.
3. Choose the relevant Datadog site. 
4. Click on **OAuth** to authorize.


## Uninstallation

When you uninstall this integration, any previous authorizations are revoked. 

Additionally, ensure that all API keys associated with this integration have been disabled by searching for the integration name on the [API Keys management page][2].


## Support
Need help? Contact [Adaptive Shield support][3].

[1]: https://dashboard.adaptive-shield.com/settings/alerts/add/63230b73c9624b93dadf38d4
[2]: https://app.datadoghq.com/organization-settings/api-keys?filter=Adaptive%20Shield
[3]: mailto:support@adaptive-shield.com