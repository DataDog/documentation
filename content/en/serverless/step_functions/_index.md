---
title: Serverless Monitoring for AWS Step Functions
further_reading:
  - link: "/serverless/step_functions/installation"
    tag: "Documentation"
    text: "Install Serverless Monitoring for AWS Step Functions"
  - link: "/serverless/step_functions/merge-step-functions-lambda"
    tag: "Documentation"
    text: "Merge Step Functions and Lambda Traces"
  - link: "/serverless/step_functions/enhanced-metrics"
    tag: "Documentation"
    text: "Enhanced Metrics for AWS Step Functions"
  - link: "/serverless/step_functions/redrive"
    tag: "Documentation"
    text: "Redrive Executions"
  - link: "/serverless/step_functions/distributed-maps"
    tag: "Documentation"
    text: "Tracing Distributed Map States"
  - link: "/serverless/step_functions/troubleshooting"
    tag: "Documentation"
    text: "Troubleshoot Serverless Monitoring for AWS Step Functions"
  - link: "/serverless/guide/disable_serverless"
    tag: "Documentation"
    text: "Disable Serverless Monitoring"
---

AWS Step Functions is a serverless orchestration service that lets developers create and manage multi-step application workflows. In addition to getting CloudWatch metrics from Datadog's [AWS Step Functions integration][2], Datadog also provides AWS Step Function tracing, logs, and [enhanced metrics][3] through the collection of CloudWatch logs.

{{< img src="serverless/step_functions/overview_725.png" alt="An AWS Step Function oveview tab." style="width:100%;" >}}

### How it works
Datadog AWS Step Functions Monitoring makes use of CloudWatch metrics from the [AWS Step Functions integration][2] and CloudWatch logs sent through the Datadog Forwarder or Amazon Data Firehose. Both Forwarder and Firehose run in your environment. Sending CloudWatch logs provides tracing and [enhanced metrics][3].

<!-- {{< img src="serverless/step_functions/how_it_works.png" alt="Diagram showing two components of Datadog AWS Step Function monitoring: Cloudwatch metrics sent through the AWS Step Functions integration, and logs, traces, and enhanced metrics sent through the Datadog Lambda Forwarder or Amazon Data Firehose." style="width:100%;" >}} -->

### Monitor the overall health of Step Functions in the Serverless view
The Serverless view shows key metrics for your Step Functions in one place to easily provide a snapshot of the health of your Step Functions. You can access a detailed view of each Step Function to see all associated metrics, logs, and traces within a certain time frame and set monitors for problematic executions. 

{{< img src="serverless/step_functions/overview_trace_725.png" alt="An AWS Step Function visualization with span tags." style="width:100%;" >}}


###  Visualize AWS Step Function Traces on a State Machine Map
When [Step Function tracing is enabled][1], you can use a visual representation of an AWS Step Function execution through a state machine map. Get an at-a-glance-view of whether a successful or failed execution took the expected path through the state machine. Drill into any anomalous executions to identify what states are problematic or have a high latency.

{{< img src="serverless/step_functions/traceview_725.png" alt="An AWS Step Function span displayed in a flame graph visualization." style="width:100%;" >}}


### Reduce Step Function debugging time with detailed execution traces
You can view end-to-end traces for a single Step Function execution and its associated logs, errors, and metrics, which enable you to identify issues in your Step Function logic. Step Function spans also contain rich metadata for step inputs and outputs, associated Lambda traces, and step duration length that help you to reproduce bugs and fix bottlenecks.

To get started, follow the [installation instructions][1].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /serverless/step_functions/installation
[2]: /integrations/amazon_step_functions/
[3]: /serverless/step_functions/enhanced-metrics
