---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "embrace-mobile-license"
"app_uuid": "2996b6e0-1aed-46cc-9fe5-4ea72aeae636"
"assets": {}
"author":
  "homepage": "https://embrace.io"
  "name": Embrace
  "sales_email": datadogsupport@embrace.io
  "support_email": datadogsupport@embrace.io
  "vendor_id": embrace
"categories":
- marketplace
- mobile
- network
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "embrace_mobile_license"
"integration_id": "embrace-mobile-license"
"integration_title": "Embrace Mobile License"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/eula.pdf
"manifest_version": "2.0.0"
"name": "embrace_mobile_license"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.embrace.mobile_license
  "product_id": mobile-license
  "short_description": "Pro plan includes full access to the Embrace platform. Custom pricing for large volume apps can be discussed with the 
sales team. Please reach out to datadogsupport@embrace.io for any questions regarding discounts."
  "tag": session
  "unit_label": 500,000 Sessions
  "unit_price": !!int "500"
"public_title": "Embrace Mobile License"
"short_description": "Mobile observability for iOS, Android, React Native, and Unity"
"supported_os":
- android
- ios
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Marketplace"
  - "Category::Mobile"
  - "Category::Network"
  - "Offering::Software License"
  - "Supported OS::Android"
  - "Supported OS::iOS"
  "configuration": "README.md#Setup"
  "description": Mobile observability for iOS, Android, React Native, and Unity
  "media":
  - "caption": Experience an overview of Embrace, the only observability and data platform built exclusively for mobile. With actionable data and insights derived from every user experience, companies can make optimal business decisions by understanding the true drivers of retention and revenue.
    "image_url": images/video_thumbnail.jpg
    "media_type": video
    "vimeo_id": !!int "619368139"
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
  "resources":
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/mobile-application-monitoring-embrace-datadog/"
  - "resource_type": documentation
    "url": "https://embrace.io/docs/"
  "support": "README.md#Support"
  "title": Embrace Mobile License
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

### What is Embrace?

[Embrace][1] is a mobile observability and data platform that empowers mobile teams to deliver optimal user experiences for 
performance optimization, issue prioritization and remediation, and monitoring across features, releases, and custom 
segments. At its core, Embrace turns complex mobile data into action. By collecting comprehensive session-level data for
each and every user experience, Embrace extracts powerful insights to fuel your growth.

After integration installation, Embrace provides dashboards that track key mobile health metrics. For any regression, you can inspect 
the full details of every affected user session without having to manually reproduce it. 

### Embrace Datadog Dashboard

The Datadog dashboard connects client-side Embrace data for crashes and networking to your server-side data.

#### Crashes

Monitor crash trends and inspect stack traces for every crash directly within Datadog. For more context, review full
user session details within Embrace.

#### Networking

Embrace collects every network call, even the ones that never make it to the servers. See all errors on your
endpoints, including 4xxs, 5xxs, timeouts, and connection errors.

---

From Datadog, immediately navigate to the actionable data and insights needed to optimize mobile experiences within the
Embrace platform. These include:

#### User Session Replays

Experience any user session without the hassle of reproducing. Replay all the technical and behavioral details in one
traversable visual so that any team member can immediately answer any question or complaint.

#### App Performance

Understand the cause of a broken user experience to correctly measure and improve mobile app health. Beyond crashes,
optimize performance to remove slow or frozen areas that lead to force quits and abandonment of key user flows.

#### Dashboards

Track adoption, performance, stability, engagement, and monetization with real-time dashboards for the metrics that 
matter to your business. Create individual or team dashboards to hone in on the features or experiments they care about.

#### Error Logging

Set session and log properties to allow powerful filtering to isolate the root cause. Uncover patterns across 
device, version, OS, region, user segment, and event attributes so that your team knows the business impact and 
remediation priority of issues. 

#### Proactive Alerting

Be the first to know about regressions in the performance and stability of your features and releases. Whether the 
failure is in your code, your backend, or a bad actor third-party SDK or vendor, Embrace notifies you in real-time
so you can take action before your users complain.

## Support
For support or questions, contact Embrace through the following channel: 

Email: [datadogsupport@embrace.io][4] 

### Further Reading

Additional helpful documentation, links, and articles:

- [Monitor your mobile apps with Embrace's offering in the Datadog Marketplace][6]
- [Embrace Documentation][2]

[1]: https://embrace.io
[2]: https://embrace.io/docs/
[3]: https://dash.embrace.io
[4]: mailto:datadogsupport@embrace.io
[5]: https://app.datadoghq.com/integrations/embrace-mobile
[6]: https://www.datadoghq.com/blog/mobile-application-monitoring-embrace-datadog/
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/embrace-mobile-license" target="_blank">Click Here</a> to purchase this application.
