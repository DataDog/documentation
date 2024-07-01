---
"app_id": "rum-react"
"app_uuid": "e112aa24-4dc9-465f-9f23-c1284c4d0d63"
"assets": {}
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- metrics
- network
- tracing
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/rum_react/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "rum_react"
"integration_id": "rum-react"
"integration_title": "React"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "rum_react"
"public_title": "React"
"short_description": "Monitor React applications and generate metrics using Datadog RUM"
"supported_os":
- android
- linux
- windows
- ios
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Metrics"
  - "Category::Network"
  - "Category::Tracing"
  - "Supported OS::Android"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::iOS"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Monitor React applications and generate metrics using Datadog RUM
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": React
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

With the Datadog [React integration][1], resolve performance issues quickly in React components by:

- Debugging the root cause of performance bottlenecks, such as a slow server response time, render-blocking resource, or an error inside a component
- Automatically correlating React performance data with user journeys, AJAX calls to the server side, and logs
- Alerting your engineering teams when crucial performance metrics for React (such as Core Web Vitals) fall below a threshold that results in a poor user experience


Monitor your React applications from end-to-end by:

- Tracking and visualizing user journeys across your entire stack
- Debugging the root cause of slow load times, which may be an issue with your React code, network performance, or underlying infrastructure 
- Analyzing and contextualizing every user session with attributes such as user ID, email, name, and more
- Unifying full-stack monitoring in one platform for frontend and backend development teams

## Setup

### Collect RUM events 

To start collecting Real User Monitoring events from your React application, see [React Monitoring][2].

### Collect traces 

Your React application automatically sends traces to Datadog.

### Collect logs 

To start forwarding your React application's logs to Datadog, see [React Log Collection][3].

## Data Collected

### Metrics

The React integration does not include any metrics. To generate custom metrics from your RUM application, see [Generate Metrics][4].

### Events 

For more information about events and attributes, see [RUM React Data Collected][5]. 

### Service Checks 

The React integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog Support][6]. 

## Further Reading 

Additional helpful documentation, links, and articles: 

- [React Monitoring][7]




[1]: https://app.datadoghq.com/integrations/rum-react
[2]: https://docs.datadoghq.com/real_user_monitoring/browser/
[3]: https://docs.datadoghq.com/logs/log_collection/javascript/
[4]: https://docs.datadoghq.com/real_user_monitoring/generate_metrics
[5]: https://docs.datadoghq.com/real_user_monitoring/browser/data_collected/
[6]: https://docs.datadoghq.com/help/
[7]: https://www.datadoghq.com/blog/datadog-rum-react-components/

