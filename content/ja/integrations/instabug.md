---
"app_id": "instabug"
"app_uuid": "37d9bc39-888f-4bec-b8c5-3c137cf88f84"
"assets":
  "oauth": assets/oauth_clients.json
"author":
  "homepage": "https://www.instabug.com/"
  "name": Instabug
  "sales_email": success@instabug.com
  "support_email": support@instabug.com
"categories":
- alerting
- issue tracking
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/instabug/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "instabug"
"integration_id": "instabug"
"integration_title": "Instabug"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "instabug"
"public_title": "Instabug"
"short_description": "Monitor and track your mobile app health and performance."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Offering::UI Extension"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Category::Alerting"
  - "Category::Issue Tracking"
  "configuration": "README.md#Setup"
  "description": Monitor and track your mobile app health and performance.
  "media":
  - "caption": Use the Instabug widget to monitor the overall performance of your app.
    "image_url": images/instabug-datadog-widget.png
    "media_type": image
  - "caption": Instabug's dashboard gives teams a succinct overview of the app's performance, and potential failures or issues occurring in the app.
    "image_url": images/instabug-app-overview.png
    "media_type": image
  - "caption": With each point of feedback or bug your users submit, Instabug automatically captures all the details you need to understand why users are facing issues with your code.
    "image_url": images/instabug-bugs.png
    "media_type": image
  - "caption": Prioritize resolution by the most impactful crashes to your users.
    "image_url": images/instabug-crashes-list.png
    "media_type": image
  - "caption": Understand how each version of your app release is performing and overall adoption.
    "image_url": images/instabug-releases-page.png
    "media_type": image
  - "caption": Aggregate data across device and version to better understand where issues are occurring.
    "image_url": images/instabug-crash-details.png
    "media_type": image
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/instabug-mobile-usability/"
  "support": "README.md#Support"
  "title": Instabug
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->

## Overview

[Instabug][1] is a mobile-focused platform that empowers mobile teams to monitor, prioritize, and debug performance and stability issues throughout the mobile app development lifecycle.

The Instabug dashboard widget in Datadog helps you monitor your overall app health and how users perceive your app's performance with just one number, the App Apdex. The widget provides:
- The overall App Apdex score
- App Apdex overtime
- A breakdown of the sessions into four buckets (`Satisfying`, `Tolerable`, `Frustrating` or `Crashing` sessions)
- The five most recent bug reports and the total number of new reports


## Setup
1. If you haven't already, [Sign up for Instabug][2] for free and follow [the steps][3] to integrate the SDK into your app.
2. After integrating the Instabug SDK in your app, go to a new or existing [Datadog dashboard][4].
3. Press the **+ Add Widgets** or **+ Edit Dashboard** button to expose the widget drawer.
4. Search for `Instabug` under the **Apps** tab of the widget drawer.
5. Click or drag the Instabug widget icon to add it to your dashboard and open the Instabug editor modal.
6. Authenticate and connect your Instabug account to Datadog by logging in with your Instabug credentials.
7. Optionally, give the widget a title.
8. Press **Save** to finish configuring the Datadog dashboard widget.

## Data Collected
The Instabug integration does not include any metrics.

## Service Checks
The Instabug integration does not include any service checks.

## Support
Need help? Contact [Instabug Support][5].

## Further Reading

Additional helpful documentation, links, and articles:

- [Leverage user context to debug mobile performance issues with the Instabug Datadog Marketplace offering][6]

[1]: http://instabug.com
[2]: https://dashboard.instabug.com/signup
[3]: https://docs.instabug.com/docs/introduction
[4]: https://app.datadoghq.com/dashboard/lists
[5]: mailto:support@instabug.com
[6]: https://www.datadoghq.com/blog/instabug-mobile-usability/

