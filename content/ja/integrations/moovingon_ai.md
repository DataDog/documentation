---
app_id: moovingon-ai
app_uuid: 1a02140e-4927-49c9-8442-dff81a18c703
assets:
  dashboards:
    moovingon.ai Overview: assets/dashboards/moovingon.ai_overview.json
  logs: {}
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.moovingon.com/
  name: moovingon
  sales_email: sales@moovingon.com
  support_email: support@moovingon.com
categories:
- notifications
- incidents
- automation
- collaboration
- event management
- alerting
- issue tracking
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/moovingon_ai/README.md
display_on_public_website: true
draft: false
git_integration_title: moovingon_ai
integration_id: moovingon-ai
integration_title: moovingon.ai
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: moovingon_ai
public_title: moovingon.ai
short_description: moovingon.ai is a NOC orchestration and automation platform
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Notifications
  - Category::Incidents
  - Category::Automation
  - Category::Collaboration
  - Category::Event Management
  - Category::Alerting
  - Category::Issue Tracking
  - Offering::Integration
  - Queried Data Type::Events
  - Submitted Data Type::Events
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: moovingon.ai is a NOC orchestration and automation platform
  media:
  - caption: moovingon.ai Guidelines
    image_url: images/moovingon_ai-guidelines.png
    media_type: image
  - caption: moovingon.ai Events
    image_url: images/moovingon_ai-events.png
    media_type: image
  - caption: moovingon.ai Integrations
    image_url: images/moovingon.ai-integrations.png
    media_type: image
  - caption: moovingon.ai Overview Dashboard
    image_url: images/moovingon_ai-overview-dashbard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: moovingon.ai
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview
[moovingon.ai][1] is a platform for cloud operations and NOC management. It consolidates alerts across your observability suite and associates them with automated runbooks for alert and incident remediation. With this integration, you can utilize the power of Datadog and moovingon.ai for efficient, automated incident management.

moovingon.ai uses Datadog's monitors, logs, and event data for alert correlation and aggregation.
Key features of this integration include:

1. **Focused Alert Management**: Within moovingon.ai, use the moovingon.ai dashboard to bring all your Datadog alerts together giving you simple control and clear visibility.
2. **Comprehensive incident management**: All remediation actions performed in moovingon.ai are sent to Datadog as events for compliance and remediation clarity.
3. **Extensive Analysis**: Utilize the analytics provided by moovingon.ai to derive insights from Datadog alerts within Datadog. This assists in proactive decision-making and trend analysis.

## Setup

### Installation

1. Click on **Connect Accounts** in order to log into moovingon.ai.
2. Enter a name for the Datadog integration and **Submit**.
3. Proceed to the Datadog OAuth2 screen and click on the **Authorize** button.
4. Optionally, to handle all notifications from Datadog monitors within moovingon.ai, click on **Install/Update the webhook**. Alternatively, simply attach the @webhook-moovingon_ai tag to the desired monitor.

## Uninstallation

1. Inside the moovingon.ai account, Go to **Settings** --> **Templates** and remove all the related datadog templates.
2. Go to **Setings** --> **Integrations** and remove the datadog integration.
3. Inside Datadog, **Integrations**  --> **Integrations**.
4. Click the moovingon.ai tile and click on **Uninstall integration**.


### Metrics

moovingon.ai does not include any metrics.

### Service Checks

moovingon.ai does not include any service checks.

### Events

The moovingon integration includes events.

## Troubleshooting

Need help? Contact [moovingon.ai support][2].


[1]: https://moovingon.ai/
[2]: mailto:support@moovingon.com