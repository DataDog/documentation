---
"app_id": "apptrail"
"app_uuid": "302b6db7-d1d6-445c-ae20-00743775cb6b"
"assets": {}
"author":
  "homepage": "https://apptrail.com"
  "name": Apptrail
  "sales_email": sales@apptrail.com
  "support_email": support@apptrail.com
"categories":
- log collection
- security
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/apptrail/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "apptrail"
"integration_id": "apptrail"
"integration_title": "Apptrail"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "apptrail"
"public_title": "Apptrail"
"short_description": "Monitor, analyze, & alert on all your SaaS audit logs using Apptrail"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Log Collection"
  - "Category::Security"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Monitor, analyze, & alert on all your SaaS audit logs using Apptrail
  "media":
  - "caption": Apptrail hosts an audit logs Portal on behalf of SaaS vendors, where customers can view, search, configure, and export their audit logs.
    "image_url": images/1-at-portal.png
    "media_type": image
  - "caption": View a full audit event history from the Apptrail Portal, and search & filter by time and event properties.
    "image_url": images/2-at-events-history.png
    "media_type": image
  - "caption": Apptrail audit events contain detailed information on the who, what, where, when, and how of a recorded activity, alongside contextual information like IP address and custom event data.
    "image_url": images/3-at-log-detail.png
    "media_type": image
  - "caption": Create trails to continuously stream audit logs to dozens of destinations, like Datadog, in realtime for archival, monitoring, and analysis.
    "image_url": images/4-at-create-trail-sel.png
    "media_type": image
  - "caption": Use trail rules to filter and select a subset of events to deliver from a trail.
    "image_url": images/5-at-trail-detail.png
    "media_type": image
  - "caption": Apptrail audit logs are continously exported to Datadog Logs in realtime, where you can analyze, query, and monitor your audit logs.
    "image_url": images/6-datadog-preview.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Apptrail
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

[Apptrail][1] is the comprehensive SaaS audit logs platform. SaaS companies use Apptrail to add full-featured customer-facing audit logs to their products. Customers can view, query, analyze, and export audit logs from all of their SaaS vendors using Apptrail.

Apptrail's audit event streaming feature ([_trails_][2]) lets you deliver audit logs to dozens of popular destinations.

The Apptrail Datadog integration allows you to continously export your SaaS audit logs from Apptrail to Datadog in realtime. You can use Datadog to analyze, archive, monitor, and alert on your SaaS audit logs.

## Setup

As a prerequisite, you should be signed up by your SaaS vendor for Apptrail.

To get started, create a delivery trail in the Apptrail Portal and choose Datadog as the configured destination.

### Steps

View the [Creating a trail][3] documentation for general documentation on creating trails.

1. Navigate to the [**Trails**][4] page in the Apptrail Portal.
2. Click the **Create a new trail** button at the top right.
3. Enter a **Trail name** and configure any **rules**.
4. Click next and select **Datadog** from the list of destinations.
5. Provide your [Datadog **Region/Site**][5] to use. For example, `EU` for app.datadoghq.eu or `US1` for app.datadoghq.com.
6. Enter your [Datadog API key][6].
7. Click **Create trail** to create the trail.

### Validation

To view Apptrail audit logs in Datadog:

1. Navigate to **Logs** > **Live Tail**.
2. See Apptrail audit logs by setting `source:apptrail`.

For more details, read the [Apptrail Datadog delivery documentation][7].

## Data Collected

### Log collection

Any Apptrail [trail][2] with a Datadog destination will continously send all logs matched by the configured [trail rules][8] to Datadog. For the Apptrail audit log format, see [Event Format][9].

## Support

Need help? Contact [Datadog support][10] or reach out to [Apptrail support][11].

## Further Reading

- [Apptrail customer documentation][12]
- [Apptrail Datadog Log delivery documentation][7]
- [Apptrail audit log format][9]
- [Apptrail event delivery trails][2]

[1]: https://apptrail.com
[2]: https://apptrail.com/docs/consumers/guide/event-delivery/#trails
[3]: https://apptrail.com/docs/consumers/guide/event-delivery/working-with-trails#creating-a-trail
[4]: https://portal.apptrail.com/trails
[5]: https://docs.datadoghq.com/getting_started/site/
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: https://apptrail.com/docs/consumers/guide/event-delivery/integrations/datadog
[8]: https://apptrail.com/docs/consumers/guide/event-delivery/working-with-trails#selecting-events-using-trail-rules
[9]: https://apptrail.com/docs/consumers/guide/event-format
[10]: https://docs.datadoghq.com/help/
[11]: mailto:support@apptrail.com
[12]: https://apptrail.com/docs/consumers/guide

