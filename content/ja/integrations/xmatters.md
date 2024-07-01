---
"app_id": "xmatters"
"app_uuid": "fff150f0-a26a-48eb-a16b-21e426e6835e"
"assets":
  "integration":
    "auto_install": true
    "events":
      "creates_events": true
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "164"
    "source_type_name": "xMatters"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "event management"
- "collaboration"
- "incidents"
- "notifications"
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "xmatters"
"integration_id": "xmatters"
"integration_title": "xMatters"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "xmatters"
"public_title": "xMatters"
"short_description": "Use xMatters as a notification channel in Datadog alerts and events."
"supported_os": []
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Event Management"
  - "Category::Collaboration"
  - "Category::Incidents"
  - "Category::Notifications"
  "configuration": "README.md#Setup"
  "description": "Use xMatters as a notification channel in Datadog alerts and events."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "xMatters"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
{{< img src="integrations/xmatters/xmatters.png" alt="xMatters overview" popup="true">}}

## Overview

xMatters is a digital service availability platform that prevents technology issues from becoming business problems. Large enterprises, agile SREs, and innovative DevOps teams rely on its proactive incident response, automation, and management service to maintain operational visibility and control in today's highly fragmented technology environment. xMatters for Datadog integrates people into your toolchains spanning across teams and silos.

Connect Datadog to xMatters to:

- Trigger xMatters notifications with responses integrated into all your IT tools
- Notify resolvers based on escalation rules, on-call schedules, skills, and location
- Look up the current xMatters on-call schedule from within Datadog
- Configure response options that trigger other xMatters integrations and drive workflow for tasks such as creating tickets, updating consoles, sending additional notifications, and initiating chat & conference-call collaboration
- Add additional reporting and analytics to your operational processes

## Setup

### Installation

To set up the xMatters-Datadog integration:

- Generate a [new application key][1] for use by xMatters.
- [Configure xMatters][2] workflow.
- Configure each of the xMatters webhooks with the [Datadog webhooks integration][3].

## Data Collected

### Metrics

The xMatters integration does not include any metrics.

### Events

The xMatters integration does not include any events.

### Service Checks

The xMatters integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][4].

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://help.xmatters.com/integrations/#cshid=DATADOG
[3]: https://app.datadoghq.com/account/settings#integrations/webhooks
[4]: https://docs.datadoghq.com/help/

