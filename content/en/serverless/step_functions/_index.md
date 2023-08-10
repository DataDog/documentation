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
<div class="alert alert-warning">This feature is in public beta. You can provide feedback by filling out the <a href="https://docs.google.com/forms/d/e/1FAIpQLSe9BZIxSt4XMKsjZ2xnZCSEGDWbWw75-zMNM6yy3c3QzHx9hg/viewform?usp=sf_link">feedback form</a>.</div>

{{< img src="serverless/step_functions/overview3.png" alt="An AWS Step Function span displayed in a flame graph visualization." style="width:100%;" >}}

AWS Step Functions is a serverless orchestration service that lets developers create and manage multi-step application workflows. In addition to getting Cloudwatch metrics from Datadog's [AWS Step Functions integration][2], Datadog also provides native AWS Step Function monitoring and tracing.

### Monitor the overall health of Step Functions in the Serverless view
The Serverless view shows key metrics for your Step Functions in one place to easily provide a snapshot of the health of your Step Functions. You can access a detailed view of each Step Function to see all associated metrics, logs, and traces within a certain time frame and set monitors for problematic executions. 

### Reduce Step Function debugging time with detailed execution traces
You can view end-to-end traces for a single Step Function execution and its associated logs, errors, and metrics, which enable you to identify issues in your Step Function logic. Step Function spans also contain rich metadata for step inputs and outputs, associated Lambda traces, and step duration length that help you to reproduce bugs and fix bottlenecks.

To get started, follow the [installation instructions][1].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /serverless/step_functions/installation
[2]: /integrations/amazon_step_functions/
