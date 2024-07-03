---
app_id: rum-flutter
app_uuid: a7344e0c-5fcf-43c0-af3b-734b484c1f29
assets: {}
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- モニター
- mobile
- network
- tracing
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/rum_flutter/README.md
display_on_public_website: true
draft: false
git_integration_title: rum_flutter
integration_id: rum-flutter
integration_title: Flutter
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: rum_flutter
public_title: Flutter
short_description: Monitor Flutter applications and generate metrics using Datadog
  RUM
supported_os:
- android
- ios
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Metrics
  - Category::Mobile
  - Category::Network
  - Category::Tracing
  - Supported OS::Android
  - Supported OS::iOS
  configuration: README.md#Setup
  description: Monitor Flutter applications and generate metrics using Datadog RUM
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Flutter
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

With the Datadog [Flutter integration][1], spend less time triaging issues and more time releasing new features by:

- Debugging the root cause of slow performance issues and application crashes in third-party libraries, network requests, or large media files 
- Improving application responsiveness, setting up service level indicators (SLIs), and diagnosing issues with out-of-the-box dashboards, real-time metrics, and deobfuscated crash reports 
- Intelligently grouping high-volume application errors into a manageable set of unique issues

Correlate the impact of the user experience on your business by:

- Analyzing critical mobile user experience data such as screen engagement by demographics, version releases, or any custom attributes, to reach your business KPIs 
- Automatically correlating every user journey with a timeline of session events and attributes including ID, cellular activity, referral URL, and more 
- Understanding user behavior trends with customizable analytics and geographical maps

Monitor the end-to-end health of your Flutter application by: 

- Pivoting from your user experience data to backend traces, runtime metrics, and logs for the complete context when investigating issues 
- Debugging crashes faster by unifying client-side and server-side metrics, traces, and logs
- Unifying full-stack monitoring in a single platform for frontend and backend teams


## セットアップ

### Collect RUM events 

To start collecting Real User Monitoring events from your application, see [Flutter Monitoring][2]. 

### Collect traces 

Your Flutter application automatically sends traces to Datadog.

### Collect logs 

To start forwarding your Flutter application's logs to Datadog, see [Flutter Log Collection][3].

## 収集データ

### メトリクス

The Flutter integration does not include any metrics. To generate custom metrics from your RUM application, see [Generate Metrics][4].

### Events 

For more information about events and attributes, see [RUM Flutter Monitoring][5]. 

### Service Checks 

The Flutter integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog Support][6]. 

## Further Reading 

Additional helpful documentation, links, and articles: 

- [Flutter Monitoring][5]



[1]: https://app.datadoghq.com/integrations/rum-flutter
[2]: https://docs.datadoghq.com/ja/real_user_monitoring/flutter/#setup
[3]: https://docs.datadoghq.com/ja/logs/log_collection/flutter/
[4]: https://docs.datadoghq.com/ja/real_user_monitoring/generate_metrics
[5]: https://docs.datadoghq.com/ja/real_user_monitoring/flutter/
[6]: https://docs.datadoghq.com/ja/help/