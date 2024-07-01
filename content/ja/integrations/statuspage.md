---
"app_id": "statuspage"
"app_uuid": "04411bc4-4af1-482e-b05d-eeec3a40c464"
"assets":
  "integration":
    "auto_install": false
    "events":
      "creates_events": true
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "135"
    "source_type_name": "StatusPage"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "incidents"
- "issue tracking"
- "notifications"
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "statuspage"
"integration_id": "statuspage"
"integration_title": "StatusPage"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "statuspage"
"public_title": "StatusPage"
"short_description": "StatusPage.io helps companies setup status pages with public metrics and automatic updates for customers."
"supported_os": []
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Incidents"
  - "Category::Issue Tracking"
  - "Category::Notifications"
  "configuration": "README.md#Setup"
  "description": "StatusPage.io helps companies setup status pages with public metrics and automatic updates for customers."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "StatusPage"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview
[Atlassian Statuspage][1] is a status and incident management tool that lets you see and create incidents reported by your third-party services in Datadog.

Integrate with Statuspage to:
- Create, update, and link a Statuspage incident to a Datadog incident.
- See the Statuspage incident that corresponds to a Datadog incident.
- Correlate incidents with your own metrics and events.

## Setup

### Installation

#### Connect your Statuspage Account
{{% site-region region="gov" %}}
<div class="alert alert-warning">
Incident Management integration is not supported in the {{< region-param key=dd_datacenter code="true" >}} site.
</div>
{{% /site-region %}}

Connect your Statuspage account to create and update Statuspage incidents from Incident Management.

{{< img src="integrations/statuspage/integrations_statuspage_incident_modal.png" alt="Status Incident Create Modal" popup="true" style="width:60%;">}}

1. Log into your [account][2].
2. Click on your avatar in the top right of your screen to access the user menu.
3. Click API info.
4. Under `Organization API keys` create or copy an existing API key.
5. Input your API key into the `API key` field in the [integration tile][3]

#### Correlate incidents with your own metrics and events

You can correlate Statuspage events with your own metrics and events for analysis, and set up monitors to be notified for anything that might be impactful to your environment. This part of the integration does not require having your own Statuspage account.

Under the **Statuspage URLs** section in the [integration tile][3], enter the Statuspage URL for whichever service you want to monitor. Enter any custom tags you wish to associate with the page.

## Data Collected

### Metrics

The Statuspage integration does not include any metrics.

### Events

The Statuspage integration pulls in Datadog events from its configured status pages, allowing you to correlate these events with your metrics or [send out alerts based on these events][4].

### Service Checks

The Statuspage integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.atlassian.com/software/statuspage
[2]: https://manage.statuspage.io/login
[3]: https://app.datadoghq.com/integrations/statuspage
[4]: https://docs.datadoghq.com/monitors/monitor_types/event/
[5]: https://docs.datadoghq.com/help/

