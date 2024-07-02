---
"app_id": "rum-angular"
"app_uuid": "0dd38c9b-921d-4252-8c46-c7a6d83c5778"
"assets": {}
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- metrics
- tracing
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/rum_angular/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "rum_angular"
"integration_id": "rum-angular"
"integration_title": "Angular"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "rum_angular"
"public_title": "Angular"
"short_description": "Monitor Angular applications and generate metrics using Datadog RUM"
"supported_os":
- any
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Metrics"
  - "Category::Tracing"
  - "Supported OS::Any"
  "configuration": "README.md#Setup"
  "description": Monitor Angular applications and generate metrics using Datadog RUM
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Angular
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

With the Datadog [Angular integration][1], resolve performance issues quickly in Angular components by:

- Debugging the root cause of performance bottlenecks, such as a slow server response time, render-blocking resource, or error inside a component
- Automatically correlating Angular performance data with user journeys, AJAX calls to the server side, and logs
- Alerting your engineering teams when crucial performance metrics for Angular (such as Core Web Vitals) fall below a threshold that results in a poor user experience


Monitor your Angular applications from end-to-end by:

- Tracking and visualizing user journeys across your entire stack
- Debugging the root cause of slow load times, which may be an issue with your Angular code, network performance, or underlying infrastructure 
- Analyzing and contextualizing every user session with attributes such as user ID, email, name, and more
- Unifying full-stack monitoring in one platform for frontend and backend development teams






## セットアップ

### Collect RUM events 

To start collecting Real User Monitoring events from your application, see [Browser Monitoring][2]. 

### Collect traces 

Your Angular application automatically sends traces to Datadog.

### Collect logs 

To start forwarding your Angular application's logs to Datadog, see [JavaScript Log Collection][3].

## 収集データ

### メトリクス

The Angular integration does not include any metrics. To generate custom metrics from your RUM application, see [Generate Metrics][4].

### Events 

For more information about events and attributes, see [RUM Browser Data Collected][5]. 

### Service Checks 

The Angular integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog Support][6]. 



[1]: https://app.datadoghq.com/integrations/rum-angular
[2]: https://docs.datadoghq.com/real_user_monitoring/browser/
[3]: https://docs.datadoghq.com/logs/log_collection/javascript/
[4]: https://docs.datadoghq.com/real_user_monitoring/generate_metrics
[5]: https://docs.datadoghq.com/real_user_monitoring/browser/data_collected/
[6]: https://docs.datadoghq.com/help/

