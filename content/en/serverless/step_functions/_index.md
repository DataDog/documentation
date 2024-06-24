---
title: Serverless Monitoring for AWS Step Functions
kind: documentation
further_reading:
- link: "/serverless/step_functions/installation"
  tag: "Documentation"
  text: "Install Serverless Monitoring for AWS Step Functions"
- link: "/serverless/step_functions/troubleshooting"
  tag: "Documentation"
  text: "Troubleshoot Serverless Monitoring for AWS Step Functions"
- link: "/integrations/amazon_step_functions/"
  tag: "Documentation"
  text: "AWS Step Functions integration"
- link: "/serverless/aws_lambda/"
  tag: "Documentation"
  text: "Serverless Monitoring for AWS Lambda"
---

AWS Step Functions is a serverless orchestration service that lets developers create and manage multi-step application workflows. In addition to getting Cloudwatch metrics from Datadog's [AWS Step Functions integration][2], Datadog also provides native AWS Step Function monitoring and tracing.

{{< img src="serverless/step_functions/overview1.png" alt="An AWS Step Function oveview tab." style="width:100%;" >}}

### How it works
Datadog AWS Step Functions Monitoring collects logs and integration metrics from the AWS integration and uses ingested logs from AWS Step Functions to generate enhanced metrics and traces for your Step Function executions.

### Monitor the overall health of Step Functions in the Serverless view
The Serverless view shows key metrics for your Step Functions in one place to easily provide a snapshot of the health of your Step Functions. You can access a detailed view of each Step Function to see all associated metrics, logs, and traces within a certain time frame and set monitors for problematic executions. 

{{< img src="serverless/step_functions/overview2.png" alt="An AWS Step Function visualization with span tags." style="width:100%;" >}}


###  Visualize AWS Step Function Traces on a State Machine Map
When [Step Function tracing is enabled][1], you can use a visual representation of an AWS Step Function execution through a state machine map. Get an at-a-glance-view of whether a successful or failed execution took the expected path through the state machine. Drill into any anomalous executions to identify what states are problematic or have a high latency.

{{< img src="serverless/step_functions/overview3.png" alt="An AWS Step Function span displayed in a flame graph visualization." style="width:100%;" >}}


### Reduce Step Function debugging time with detailed execution traces
You can view end-to-end traces for a single Step Function execution and its associated logs, errors, and metrics, which enable you to identify issues in your Step Function logic. Step Function spans also contain rich metadata for step inputs and outputs, associated Lambda traces, and step duration length that help you to reproduce bugs and fix bottlenecks.

To get started, follow the [installation instructions][1].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /serverless/step_functions/installation
[2]: /integrations/amazon_step_functions/
