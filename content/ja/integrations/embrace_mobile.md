---
"app_id": "embrace-mobile"
"app_uuid": "86988058-9b89-45a8-b92f-5473a96e4a36"
"assets":
  "dashboards":
    "Embrace Overview": assets/dashboards/embrace_mobile_overview.json
"author":
  "homepage": "https://embrace.io"
  "name": Embrace
  "support_email": support@embrace.io
"categories":
- issue tracking
- metrics
- mobile
- network
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/embrace_mobile/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "embrace_mobile"
"integration_id": "embrace-mobile"
"integration_title": "Embrace Mobile"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "embrace_mobile"
"public_title": "Embrace Mobile"
"short_description": "Mobile observability for iOS, Android, React Native, and Unity"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Issue Tracking"
  - "Category::Metrics"
  - "Category::Mobile"
  - "Category::Network"
  - "Offering::UI Extension"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Mobile observability for iOS, Android, React Native, and Unity
  "media":
  - "caption": Monitor Embrace crash and networking data directly from Datadog by adding widgets.
    "image_url": images/datadog_dashboard.jpg
    "media_type": image
  - "caption": Investigate crashes by accessing every stack trace from every affected user session, alongside app and session details. For more context, navigate directly to the full user session replay in Embrace. 
    "image_url": images/datadog_side_panel.jpg
    "media_type": image
  - "caption": Embrace's user session replays provide the full technical and behavioral details of every user session in a time-based visualization. Instantly identify the root cause without having to manually reproduce issues.
    "image_url": images/embrace_session.jpg
    "media_type": image
  - "caption": Optimize key user flows by tracking timing, outcome, and user actions. Quickly identify where frustrated users are abandoning slow or frozen experiences and fix them to boost engagement and revenue.
    "image_url": images/embrace_app_performance.jpg
    "media_type": image
  - "caption": Monitor key metrics with real-time dashboards. Easily track performance, stability, engagement, monetization, and more so teams can focus on the data they care about.
    "image_url": images/embrace_dashboard.jpg
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Embrace Mobile
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

[Embrace][1] is a mobile observability and data platform that empowers mobile teams to deliver optimal user experiences for
performance optimization, issue prioritization and remediation, and monitoring across features, releases, and custom
segments. At its core, Embrace turns complex mobile data into action. By collecting comprehensive session-level data for
each and every user experience, Embrace extracts powerful insights to fuel your growth.

After app installation, Embrace provides dashboards that track key mobile health metrics. For any regression, you can inspect
the full details of every affected user session without having to manually reproduce it.

## Setup

1. Start a free trial and follow the [Embrace documentation][2]. **You need to follow this documentation before seeing metrics in Datadog.**
1. After completing setup of the Embrace integration, navigate back to Datadog to connect both platforms.
1. Authenticate and connect your Embrace account to Datadog by logging in with your credentials.
1. Create a New Dashboard in Datadog. Select the Embrace widget to display Embrace data with crash or networking metrics.
1. Click into "Details" to dive deeper into Embrace from Datadog.

## Support

Need help? Contact [Datadog support][3].

[1]: https://embrace.io
[2]: https://embrace.io/docs/
[3]: https://docs.datadoghq.com/help/

