---
title: Getting Started with GCR Serverless Monitoring
kind: documentation

further_reading:
    - link: '/agent/basic_agent_usage/'
      tag: 'Documentation'
      text: 'Basic Agent Usage'
---

## Overview

_Serverless_ is a model where developers build and run applications and services using a cloud provider, rather than managing infrastructure themselves. Datadog [Serverless Monitoring][1] collects metrics, logs, and traces from your serverless infrastructure, enabling you to monitor your application's health and performance.

This guide makes use of a pre-built [demo application][2] that you can launch with one click. 

## Deploy the demo application

Go to the [DataDog/crpb][2] repository and select the language/framework you would like to use. Choose from Go, Python (Flask), NodeJS, Java, or Ruby on Rails.

Select your Google Cloud project, the region you want to deploy to, and provide your [Datadog API key][3]. The URL of your newly created service is provided at the end of the deployment.

{{< img src="getting_started/serverless/gcr_creation.png" alt="Close-up of two functions" style="width:80%;">}}

Visit this endpoint a few times to generate some telemetry data.

## Explore your data

### Metrics

Go to **Metrics** -> **Explorer** to see your enhanced Cloud Run metrics.

{{< img src="getting_started/serverless/cr_metrics.png" alt="Close-up of two functions" style="width:80%;">}}

### Tracing

Go to **APM** -> **Traces** to see your first Cloud Run traces.

{{< img src="getting_started/serverless/apm_traces.png" alt="Close-up of two functions" style="width:80%;">}}

### Logs

Go to **Logs** to see your Cloud Run logs.

{{< img src="getting_started/serverless/cr_logs.png" alt="Close-up of two functions" style="width:80%;">}}

[1]: /serverless
[2]: https://github.com/DataDog/crpb
[3]: https://app.datadoghq.com/organization-settings/api-keys
