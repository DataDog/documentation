---
"app_id": "zendesk"
"app_uuid": "8943eea8-230f-4b1b-9895-8d60d5593e7b"
"assets":
  "dashboards":
    "zendesk": "assets/dashboards/zendesk_overview.json"
  "integration":
    "auto_install": false
    "events":
      "creates_events": true
    "metrics":
      "check":
      - "zendesk.ticket.count"
      "metadata_path": "metadata.csv"
      "prefix": "zendesk"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "146"
    "source_type_name": "Zendesk"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "metrics"
- "log collection"
- "event management"
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "zendesk"
"integration_id": "zendesk"
"integration_title": "Zendesk"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "zendesk"
"public_title": "Zendesk"
"short_description": "Zendesk is customer service and support ticket SaaS."
"supported_os": []
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Metrics"
  - "Category::Log Collection"
  - "Category::Event Management"
  "configuration": "README.md#Setup"
  "description": "Zendesk is customer service and support ticket SaaS."
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/zendesk-session-replay-integration/"
  "support": "README.md#Support"
  "title": "Zendesk"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
{{< img src="integrations/zendesk/zendesk_dash.png" alt="Zendesk Dashboard" popup="true">}}

## Overview

Zendesk is a customer service and support ticket platform for receiving, tracking, and responding to inquiries from customers. Enable this integration to see ticket metrics in Datadog and to create and update tickets from Datadog.

Integrate with Zendesk to:

- Monitor and graph ticket count metrics by status, user, and satisfaction rating.
- Receive a Datadog event each time a new Zendesk ticket is opened.
- Create and update tickets using `@zendesk` mentions in monitor notifications.
- Collect [Audit logs][1] to control your data retention and leverage [Cloud SIEM][2] detection rules.

## Setup

### Installation

To install this integration generate a Zendesk API Token:

1. Navigate to the API settings page by clicking the _Admin_ gear icon from the left menu, then selecting _API_ from the _Channels_ section of the menu item list.
2. Enable Token Access if it is not already enabled.
3. Click the plus symbol to create a new token.
4. Set the API Token description to something informative, such as "Datadog-Zendesk Integration".
5. Copy the API Token. **_Important_**: You need to temporarily save this token, because it is hidden once saved.
6. Click _Save_.

To complete the integration, enter your information in [Datadog][3]:

1. Navigate to the [Zendesk integration tile][4] and click on the _Configuration_ tab.
2. Enter your Zendesk domain. This is the text that appears before `zendesk.com`. For example, if your Zendesk URL is `https://my-company.zendesk.com`, your domain is `my-company`.
3. Enter your Zendesk username.
4. Enter the Zendesk API Token you received in step 5 above.
5. Click the Install Integration button.

#### Zendesk RUM App installation

Datadog [Real User Monitoring][5] allows you to view user sessions for your app to understand the performance and errors for the end users, identify bottlenecks, and analyze user analytics trends over time.

The Datadog RUM app lets your support staff view recent Datadog RUM sessions linked to the user who created the currently selected Zendesk ticket.

{{< img src="integrations/zendesk/zendesk_rum_app_1.png" alt="Zendesk RUM App" popup="true">}}

1. Follow the [installation instructions][6] for the integration.
2. Navigate to the [Datadog RUM App][7] in the Zendesk Marketplace and click `Install`.
3. Configure the installation settings for the app:
   1. Datadog API and Application keys can be found in your [organization settings][8]. Paste these keys respectively.
   2. Navigate to the [Zendesk integration tile][9] and copy the `Secret Key` under the **RUM App Settings** tab. Paste this key under the `Secret Key` setting for the app.  
   3. Enter your [Datadog site][10]. For example, `us1`, `eu1`, `us3`, `us5`, `ap1` or `fed`.
4. Navigate to the [Zendesk integration tile][9]. 
5. Under the **RUM App Settings** tab, pick a value for the user binding from the dropdown list. This is the user attribute that the app uses to query the RUM sessions from the Zendesk ticket requester.
6. Click **Save**.
7. Navigate to a Zendesk ticket on your account and click on the Datadog RUM sidebar app to view the user's RUM sessions.

## Data Collected

### Metrics
{{< get-metrics-from-git "zendesk" >}}


### Events

This integration generates an event each time a new Zendesk ticket is opened.

{{< img src="integrations/zendesk/zendesk_event.png" alt="A Zendesk event in the Datadog Events Explorer" popup="true">}}

### Service Checks

The Zendesk integration does not include any service checks.

## Features

### Create tickets

You can create Zendesk tickets and assign them to a group. First add the group name in the Datadog [Zendesk integration tile][4], then use `@zendesk-group-name` in your Datadog monitors and annotations. For example, to create a ticket and assign it to the Zendesk group _Support_, add the group and use `@zendesk-support`.

## Further Reading

- Blog post: [Visually replay user-facing issues with Zendesk and Datadog Session Replay][12]

## Troubleshooting

Need help? Contact [Datadog support][13].

[1]: https://developer.zendesk.com/api-reference/ticketing/account-configuration/audit_logs/
[2]: https://app.datadoghq.com/security/home
[3]: https://app.datadoghq.com
[4]: https://app.datadoghq.com/account/settings#integrations/zendesk
[5]: https://docs.datadoghq.com/real_user_monitoring/
[6]: https://docs.datadoghq.com/integrations/zendesk/#installation
[7]: https://www.zendesk.com/marketplace/apps/support/993138/datadog/
[8]: https://app.datadoghq.com/organization-settings/api-keys
[9]: https://app.datadoghq.com/integrations/zendesk
[10]: https://docs.datadoghq.com/getting_started/site/
[11]: https://github.com/DataDog/dogweb/blob/prod/integration/zendesk/zendesk_metadata.csv
[12]: https://www.datadoghq.com/blog/zendesk-session-replay-integration/
[13]: https://docs.datadoghq.com/help/

