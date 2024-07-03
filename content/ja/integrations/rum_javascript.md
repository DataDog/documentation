---
app_id: rum-javascript
app_uuid: d2496eee-ced1-4bf2-a85d-b8277b4952cf
assets: {}
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- languages
- metrics
- tracing
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/rum_javascript/README.md
display_on_public_website: true
draft: false
git_integration_title: rum_javascript
integration_id: rum-javascript
integration_title: JavaScript
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: rum_javascript
public_title: JavaScript
short_description: Monitor JavaScript applications and generate metrics using Datadog
  RUM
supported_os:
- any
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Languages
  - Category::Metrics
  - Category::Tracing
  - Supported OS::Any
  configuration: README.md#Setup
  description: Monitor JavaScript applications and generate metrics using Datadog
    RUM
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: JavaScript
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

With the Datadog [JavaScript integration][1], resolve performance issues quickly in JavaScript components by:

- Debugging the root cause of performance bottlenecks, such as a slow server response time, render-blocking resource, or error inside a component
- Automatically correlating JavaScript performance data with user journeys, AJAX calls to the server side, and logs
- Alerting your engineering teams when crucial performance metrics for JavaScript (such as Core Web Vitals) fall below a threshold that results in a poor user experience


Monitor your JavaScript applications from end-to-end by:

- Tracking and visualizing user journeys across your entire stack
- Debugging the root cause of slow load times, which may be an issue with your JavaScript code, network performance, or underlying infrastructure 
- Analyzing and contextualizing every user session with attributes such as user ID, email, name, and more
- Unifying full-stack monitoring in one platform for frontend and backend development teams


## セットアップ

### Collect RUM events 

To start collecting Real User Monitoring events from your application, see [Browser Monitoring][2]. 

### Collect traces 

To start sending your JavaScript application's traces to Datadog, see [Connect RUM and Traces][3].

### Collect logs 

To start forwarding your JavaScript application's logs to Datadog, see [Browser Log Collection][4].

## 収集データ

### メトリクス

The JavaScript integration does not include any metrics. To generate custom metrics from your RUM application, see [Generate Metrics][5].

### Events 

For more information about events and attributes, see [RUM Browser Data Collected][6]. 

### Service Checks 

The JavaScript integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog Support][7]. 

## Further Reading 

Additional helpful documentation, links, and articles: 

- [Browser Monitoring][2]



[1]: https://app.datadoghq.com/integrations/rum-javascript
[2]: https://docs.datadoghq.com/ja/real_user_monitoring/browser/
[3]: https://docs.datadoghq.com/ja/real_user_monitoring/connect_rum_and_traces/?tabs=browserrum
[4]: https://docs.datadoghq.com/ja/logs/log_collection/javascript/
[5]: https://docs.datadoghq.com/ja/real_user_monitoring/generate_metrics
[6]: https://docs.datadoghq.com/ja/real_user_monitoring/browser/data_collected/
[7]: https://docs.datadoghq.com/ja/help/