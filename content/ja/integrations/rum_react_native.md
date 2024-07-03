---
app_id: rum-react-native
app_uuid: 61207de8-cc1e-4915-a18a-7fb25093d85c
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
- https://github.com/DataDog/integrations-extras/blob/master/rum_react_native/README.md
display_on_public_website: true
draft: false
git_integration_title: rum_react_native
integration_id: rum-react-native
integration_title: React Native
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: rum_react_native
public_title: React Native
short_description: Monitor React Native applications and generate metrics using Datadog
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
  description: Monitor React Native applications and generate metrics using Datadog
    RUM
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: React Native
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

With the Datadog [React Native integration][1], you can spend less time triaging issues and more time releasing new features by:

- Debugging the root cause of slow performance issues and application crashes in third-party libraries, network requests, or large media files 
- Improving application responsiveness, setting up service level indicators (SLIs), and diagnosing issues with out-of-the-box dashboards, real-time metrics, and deobfuscated crash reports 
- Intelligently grouping high-volume application errors into a manageable set of unique issues

Correlate the impact of the user experience on your business by:

- Analyzing critical mobile user experience data such as screen engagement by demographics, version releases, or any custom attributes, to reach your business KPIs 
- Automatically correlating every user journey with a timeline of session events and attributes including ID, cellular activity, referral URL, and more 
- Understanding user behavior trends with customizable analytics and geographical maps

Monitor the end-to-end health of your React Native application by: 

- Pivoting from your user experience data to backend traces, runtime metrics, and logs for the complete context when investigating issues 
- Debugging crashes faster by unifying client-side and server-side metrics, traces, and logs
- Unifying full-stack monitoring in a single platform for frontend and backend teams

## セットアップ

### Collect RUM events 

To start collecting Real User Monitoring events from your application, see [React Native Monitoring][2]. 

### Collect traces 

Your React Native application automatically sends traces to Datadog.

### Collect logs 

To start forwarding your React Native application's logs to Datadog, see [React Native Log Collection][3].

## 収集データ

### メトリクス

The React Native integration does not include any metrics. To generate custom metrics from your RUM application, see [Generate Metrics][4].

### Events 

For more information about events and attributes, see [RUM React Native Monitoring][5]. 

### Service Checks 

The React Native integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog Support][6]. 

## Further Reading 

Additional helpful documentation, links, and articles: 

- [React Native Monitoring][5]

[1]: https://app.datadoghq.com/integrations/rum-react-native
[2]: https://docs.datadoghq.com/ja/real_user_monitoring/reactnative/#setup
[3]: https://docs.datadoghq.com/ja/real_user_monitoring/reactnative/#manual-instrumentation
[4]: https://docs.datadoghq.com/ja/real_user_monitoring/generate_metrics
[5]: https://docs.datadoghq.com/ja/real_user_monitoring/reactnative/
[6]: https://docs.datadoghq.com/ja/help/