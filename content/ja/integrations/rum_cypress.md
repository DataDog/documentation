---
"app_id": "rum-cypress"
"app_uuid": "a6c112b6-f3af-4f9e-bf25-e0f8d8d7bb5f"
"assets": {}
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- issue tracking
- metrics
- network
- testing
- tracing
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/rum_cypress/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "rum_cypress"
"integration_id": "rum-cypress"
"integration_title": "Cypress"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "rum_cypress"
"public_title": "Cypress"
"short_description": "Monitor application's Cypress test runs using Datadog"
"supported_os":
- any
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Issue Tracking"
  - "Category::Metrics"
  - "Category::Network"
  - "Category::Testing"
  - "Category::Tracing"
  - "Supported OS::Any"
  "configuration": "README.md#Setup"
  "description": Monitor application's Cypress test runs using Datadog
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Cypress
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

With the Datadog [Cypress integration][1], monitor the performance of your CI/CD pipelines and Cypress tests running in your pipelines by:

- Investigating flaky or failing tests and honing in on failing steps
- Looking at test results with distributed tracing details to comprehend why your Cypress tests are slow     
- Troubleshooting performance gaps in your end-to-end Cypress tests with data collected from RUM & Session Replay
- Monitoring, capturing, and visually replaying real user sessions


## セットアップ

For more information about integrating Cypress tests with RUM & Session Replay, see the [CI Visibility-RUM integration documentation][2].


### Collect RUM events 

To start collecting Real User Monitoring events from your application, see [Cypress Monitoring][3]. 

### Collect traces 

Your application automatically sends traces to Datadog.

## 収集データ

### メトリクス

The CI Visibility-RUM integration does not include any metrics. To generate custom metrics from your RUM application, see [Generate Metrics][4].

### Service Checks 

The Cypress integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog Support][5]. 

## Further Reading 

Additional helpful documentation, links, and articles: 

- [CI Visibility][6]



[1]: https://app.datadoghq.com/integrations/rum-cypress
[2]: https://docs.datadoghq.com/continuous_integration/guides/rum_integration/
[3]: https://docs.datadoghq.com/continuous_integration/guides/rum_integration/#browser-tests-and-rum
[4]: https://docs.datadoghq.com/real_user_monitoring/generate_metrics
[5]: https://docs.datadoghq.com/help/
[6]: https://docs.datadoghq.com/continuous_integration/

