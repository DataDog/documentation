---
"app_id": "rum-expo"
"app_uuid": "6894cf91-e7a2-4600-966b-20a0c99ff08d"
"assets": {}
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- log collection
- metrics
- mobile
- network
- tracing
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/rum_expo/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "rum_expo"
"integration_id": "rum-expo"
"integration_title": "Expo"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "rum_expo"
"public_title": "Expo"
"short_description": "Monitor Expo applications and generate metrics using Datadog RUM"
"supported_os":
- android
- ios
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Log Collection"
  - "Category::Metrics"
  - "Category::Mobile"
  - "Category::Network"
  - "Category::Tracing"
  - "Supported OS::Android"
  - "Supported OS::iOS"
  "configuration": "README.md#Setup"
  "description": Monitor Expo applications and generate metrics using Datadog RUM
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": documentation
    "url": "https://docs.datadoghq.com/real_user_monitoring/reactnative/expo/"
  - "resource_type": documentation
    "url": "https://docs.datadoghq.com/real_user_monitoring/error_tracking/expo/"
  "support": "README.md#Support"
  "title": Expo
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

With the Datadog [Expo integration][1], you can spend less time triaging issues and more time releasing new features by:

- Debugging the root cause of slow performance issues and application crashes in third-party libraries, network requests, or large media files
- Improving application responsiveness, setting up service level indicators (SLIs), and diagnosing issues with out-of-the-box dashboards, real-time metrics, and deobfuscated crash reports
- Intelligently grouping high-volume application errors into a manageable set of unique issues

Correlate the impact of the user experience on your business by:

- Analyzing critical mobile user experience data such as screen engagement by demographics, version releases, or any custom attributes, to reach your business KPIs
- Automatically correlating every user journey with a timeline of session events and attributes including ID, cellular activity, referral URL, and more
- Understanding user behavior trends with customizable analytics and geographical maps

Monitor the end-to-end health of your Expo application by:

- Pivoting from your user experience data to backend traces, runtime metrics, and logs for the complete context when investigating issues
- Debugging crashes faster by unifying client-side and server-side metrics, traces, and logs
- Unifying full-stack monitoring in a single platform for frontend and backend teams

## Setup

### Collect RUM events

To start collecting Real User Monitoring events from your application, see [Expo Monitoring][2].

### Collect traces

Your Expo application automatically sends traces to Datadog.

### Collect logs

To start forwarding your Expo application's logs to Datadog, see [Expo Log Collection][3].

## Data Collected

### Metrics

The Expo integration does not include any metrics. To generate custom metrics from your RUM application, see [Generate Metrics][4].

### Events

For more information about events and attributes, see [RUM Expo Monitoring][5].

### Service Checks

The Expo integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog Support][6].

## Further Reading

Additional helpful documentation, links, and articles:

- [Expo Monitoring][5]
- [Expo Crash Reporting and Error Trackings][7]

[1]: https://app.datadoghq.com/integrations/rum-expo
[2]: https://docs.datadoghq.com/real_user_monitoring/reactnative/expo/#setup
[3]: https://docs.datadoghq.com/real_user_monitoring/reactnative/#manual-instrumentation
[4]: https://docs.datadoghq.com/real_user_monitoring/generate_metrics
[5]: https://docs.datadoghq.com/real_user_monitoring/reactnative/expo/
[6]: https://docs.datadoghq.com/help/
[7]: https://docs.datadoghq.com/real_user_monitoring/error_tracking/expo/

