---
title: Getting Started with AWS Lambda Serverless Monitoring
description: Monitor serverless applications with enhanced Lambda metrics, traces, and logs to troubleshoot performance and errors.
further_reading:
    - link: "agent/"
      tag: "Documentation"
      text: "The Datadog Agent"
    - link: "https://dtdg.co/fe"
      tag: "Foundation Enablement"
      text: "Join an interactive session to learn more about serverless monitoring"
---

## Overview

_Serverless_ is a model where developers build and run applications and services using a cloud provider, rather than managing infrastructure themselves. Datadog [Serverless Monitoring][1] collects metrics, logs, and traces from your serverless infrastructure, enabling you to monitor your application's health and performance.

This guide makes use of a serverless [sample app][2] that you can launch using a programming language and infrastructure as code (IaC) tool you are familiar with. This app has Serverless Monitoring preconfigured. Follow this guide to see how you might troubleshoot a problem in your sample app, and what kinds of visibility Serverless Monitoring can provide.

### Deploy the sample app

1. Clone the [sample app][3] repository to your local machine.
2. Choose a runtime and IaC tool of your choice and follow the link to the specific deployment instructions
3. Find your [Datadog API key][4] and [Datadog site][5] ({{< region-param key="dd_site" code="true" >}}). You will need them for the next step.
4. Follow the runtime and IaC specific instructions to deploy the sample application.
5. After the deployment completes, you can either use the Postman collection in the root of the repository or run the [load test][6].

You can [see your sample app functions in Serverless View][7].

{{< img src="getting_started/serverless/serverless_view_2024_2.png" alt="Serverless Monitoring: Serverless View, an explorer page" style="width:80%;">}}

## Serverless View

The Serverless View displays telemetry from all serverless resources in your AWS environment. You can use this page as a starting point for monitoring, debugging, and optimizing your applications.

The Serverless View groups your resources by the `SERVICE_NAME`. If you have invoked your functions at least once, you will see a separate service group for each of the individual backend services.

{{< img src="getting_started/serverless/functions_view_2.png" alt="Close-up of two functions" style="width:80%;">}}

### Serverless Insights
In Serverless View, the rightmost column is titled **Insights**. Datadog automatically highlights potential issues in your serverless applications, such as [high errors][8] and [high duration][9]; these issues appear in the Insights column.

For your serverless sample application, Datadog has likely detected a [cold start][10]. Cold starts occur when your serverless application receives a sudden increase in traffic. This can happen if the function was previously receiving a relatively constant number of requests and abruptly started receiving more—or, as in this case, when the function was previously inactive and has been invoked for the first time.

## Investigate Errors

The sample application periodically generates errors and has a slow response. This causes Lambda timeouts in the product pricing service.

{{< img src="getting_started/serverless/dd_serverless_view_error_2.png" alt="Close-up of two functions" style="width:80%;">}}

Notice that both of the services under the `product-pricing-service` have errors. The Issues & Insights section at the top also identifies that one of your services has issues with timeouts.

{{< img src="getting_started/serverless/insights_and_issues.png" alt="Insights and issues view in serverless view" style="width:80%;">}}

## Function details
Click on your function to see more details regarding invocations and recent deployments.

{{< img src="getting_started/serverless/details_error_2.png" alt="Close-up of two functions" style="width:80%;">}}

The detailed view, as shown above, contains three graphs. You can set these to display any available metric; by default, they show three [enhanced Lambda metrics][11]: invocations, errors, and duration. 

Datadog generates enhanced Lambda metrics out-of-the-box with low latency, several second granularity, and detailed metadata for cold starts and custom tags. You can also view the default [enhanced Lambda metrics dashboard][12].


### Invocations
The **Invocations** tab displays your function's latest invocations. 

Each invocation is associated with a trace. Click on **Open Trace** to see the trace for each invocation:

{{< img src="getting_started/serverless/dd_flame_graph_2.png" alt="Close-up of two functions" style="width:80%;">}}

The **Flame Graph** tab shows exactly what happened during the duration of this invocation, including which services had the highest percentage of the total execution time. The flame graph displays the request as it travels from APIGateway, through your `create-product-function`. 

If you zoom out, you will also see the entire end to end trace through all of the downstream services.

{{< img src="getting_started/serverless/trace_map_2.png" alt="Close-up of two functions" style="width:80%;">}}

The **Trace Map** tab visualizes the flow of your services and how they connect to each other.

If you are viewing a trace with an error, the lower half of the detailed trace view shows the details:

```
Error: Failure generating prices
  at PricingService.calculate (/var/task/index.js:94382:13)
  at ProductUpdatedEventHandler.handle (/var/task/index.js:95826:51)
  at handler (/var/task/index.js:95854:34)
```

Underneath, you can also examine your Lambda request and response payloads. Datadog collects event payloads for every Lambda invocation.

### Logs

The serverless sample app has logs enabled by default. You can see each function's logs under its **Logs** tab. 

{{< img src="getting_started/serverless/dd_logs_view_2.png" alt="Close-up of two functions" style="width:80%;">}}

You can filter these logs to only see errors, or view them in the [Log Explorer][13].


[1]: /serverless
[2]: https://github.com/DataDog/serverless-sample-app
[3]: https://github.com/DataDog/serverless-sample-app?tab=readme-ov-file#implementations
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://docs.datadoghq.com/getting_started/site
[6]: https://github.com/DataDog/serverless-sample-app/tree/main?tab=readme-ov-file#load-tests
[7]: https://app.datadoghq.com/functions?cloud=aws&text_search=product
[8]: https://docs.datadoghq.com/serverless/guide/insights/#high-errors
[9]: https://docs.datadoghq.com/serverless/guide/insights/#high-duration
[10]: https://docs.datadoghq.com/serverless/guide/insights/#cold-starts
[11]: https://docs.datadoghq.com/serverless/enhanced_lambda_metrics
[12]: https://app.datadoghq.com/screen/integration/30306?_gl=1*19700i3*_ga*OTk0Mjg4Njg4LjE2NDIwOTM2OTY.*_ga_KN80RDFSQK*MTY0OTI3NzAyMC4xNTAuMS4xNjQ5MjgzMjI1LjA.
[13]: https://docs.datadoghq.com/logs/explorer/