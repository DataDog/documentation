---
"app_id": "rum-android"
"app_uuid": "a70b6926-49a8-4f90-8190-315170e97e4f"
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
- "https://github.com/DataDog/integrations-extras/blob/master/rum_android/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "rum_android"
"integration_id": "rum-android"
"integration_title": "Android"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "rum_android"
"public_title": "Android"
"short_description": "Monitor Android applications and generate metrics using Datadog RUM"
"supported_os":
- android
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Log Collection"
  - "Category::Metrics"
  - "Category::Mobile"
  - "Category::Network"
  - "Category::Tracing"
  - "Supported OS::Android"
  "configuration": "README.md#Setup"
  "description": Monitor Android applications and generate metrics using Datadog RUM
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": documentation
    "url": "https://docs.datadoghq.com/real_user_monitoring/android/"
  "support": "README.md#Support"
  "title": Android
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

With the Datadog [Android integration][1], you can spend less time triaging issues and more time releasing new features by:

- Debugging the root cause of slow performance issues and application crashes in third-party libraries, network requests, or large media files
- Improving application responsiveness, setting up service level indicators (SLIs), and diagnosing issues with out-of-the-box dashboards, real-time metrics, and deobfuscated crash reports
- Intelligently grouping high-volume application errors into a manageable set of unique issues

Correlate the impact of the user experience on your business by:

- Analyzing critical mobile user experience data such as screen engagement by demographics, version releases, or any custom attributes, to reach your business KPIs
- Automatically correlating every user journey with a timeline of session events and attributes including ID, cellular activity, referral URL, and more
- Understanding user behavior trends with customizable analytics and geographical maps

Monitor the end-to-end health of your application by:

- Pivoting from your user experience data to backend traces, runtime metrics, and logs for the complete context when investigating issues
- Debugging crashes faster by unifying client-side and server-side metrics, traces, and logs
- Unifying full-stack monitoring in a single platform for frontend and backend teams

## Setup

### Collect RUM events

To start collecting Real User Monitoring events from your application, see [Android and Android TV Monitoring][2].

### Collect traces

To start sending your Android application's traces to Datadog, see [Android Trace Collection][3]. Additionally, you can [Connect RUM and Traces][4].

### Collect logs

To start forwarding your Android application's logs to Datadog, see [Android Log Collection][5].

## Data Collected

### Metrics

The Android integration does not include any metrics. To generate custom metrics from your RUM application, see [Generate Metrics][6]. 

### Events

For more information about events and attributes, see [RUM Android Data Collected][7].

### Service Checks

The Android integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog Support][8].

## Further Reading

Additional helpful documentation, links, and articles:

- [Android and Android TV Monitoring][9]

[1]: https://app.datadoghq.com/integrations/rum-android
[2]: https://docs.datadoghq.com/real_user_monitoring/android/?tabs=kotlin#setup
[3]: https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/android
[4]: https://docs.datadoghq.com/real_user_monitoring/connect_rum_and_traces/?tab=androidrum#setup-rum
[5]: https://docs.datadoghq.com/logs/log_collection/android/?tab=kotlin
[6]: https://docs.datadoghq.com/real_user_monitoring/generate_metrics
[7]: https://docs.datadoghq.com/real_user_monitoring/android/data_collected/
[8]: https://docs.datadoghq.com/help/
[9]: https://docs.datadoghq.com/real_user_monitoring/android/

