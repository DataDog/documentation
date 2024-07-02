---
"app_id": "rum-ios"
"app_uuid": "53933f32-091c-4b8d-83a5-bd53ac9eacdb"
"assets": {}
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- metrics
- mobile
- tracing
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/rum_ios/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "rum_ios"
"integration_id": "rum-ios"
"integration_title": "iOS"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "rum_ios"
"public_title": "iOS"
"short_description": "Monitor iOS applications and generate metrics using Datadog RUM"
"supported_os":
- ios
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Metrics"
  - "Category::Mobile"
  - "Category::Tracing"
  - "Supported OS::iOS"
  "configuration": "README.md#Setup"
  "description": Monitor iOS applications and generate metrics using Datadog RUM
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": iOS
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

With the Datadog [iOS integration][1], you can spend less time triaging issues and more time releasing new features by:

- Debugging the root cause of slow performance issues and application crashes in third-party libraries, network requests, or large media files 
- Improving application responsiveness, setting up service level indicators (SLIs), and diagnosing issues with out-of-the-box dashboards, real-time metrics, and deobfuscated crash reports 
- Intelligently grouping high-volume application errors into a manageable set of unique issues

Correlate the impact of the user experience on your business by:

- Analyzing critical mobile user experience data such as screen engagement by demographics, version releases, or any custom attributes, to reach your business KPIs 
- Automatically correlating every user journey with a timeline of session events and attributes including ID, cellular activity, referral URL, and more 
- Understanding user behavior trends with customizable analytics and geographical maps

Monitor the end-to-end health of your iOS application by: 

- Pivoting from your user experience data to backend traces, runtime metrics, and logs for the complete context when investigating issues 
- Debugging crashes faster by unifying client-side and server-side metrics, traces, and logs
- Unifying full-stack monitoring in a single platform for frontend and backend teams

## セットアップ

### Collect RUM events 

To start collecting Real User Monitoring events from your application, see [iOS and tvOS Monitoring][2]. 

### Collect traces 

To start sending your iOS application's traces to Datadog, see [iOS Trace Collection][3]. Additionally, you can [Connect RUM and Traces][4].

### Collect logs 

To start forwarding your iOS application's logs to Datadog, see [iOS Log Collection][5].

## 収集データ

### メトリクス

The iOS integration does not include any metrics. To generate custom metrics from your RUM application, see [Generate Metrics][6].

### Events 

For more information about events and attributes, see [RUM iOS Data Collected][7]. 

### Service Checks 

The iOS integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog Support][8]. 

## Further Reading 

Additional helpful documentation, links, and articles: 

- [iOS and tvOS Monitoring][9]


[1]: https://app.datadoghq.com/integrations/rum-ios
[2]: https://docs.datadoghq.com/real_user_monitoring/ios/?tabs=swift#setup
[3]: https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/ios/?tab=cocoapods
[4]: https://docs.datadoghq.com/real_user_monitoring/connect_rum_and_traces/?tab=iosrum#setup-rum
[5]: https://docs.datadoghq.com/logs/log_collection/ios/
[6]: https://docs.datadoghq.com/real_user_monitoring/generate_metrics
[7]: https://docs.datadoghq.com/real_user_monitoring/ios/data_collected/
[8]: https://docs.datadoghq.com/help/
[9]: https://docs.datadoghq.com/real_user_monitoring/ios/

