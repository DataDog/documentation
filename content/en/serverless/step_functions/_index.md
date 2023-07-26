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
<div class="alert alert-warning">This feature is in public beta. You can provide feedback by filling out the following <a href="https://docs.google.com/forms/d/e/1FAIpQLSe9BZIxSt4XMKsjZ2xnZCSEGDWbWw75-zMNM6yy3c3QzHx9hg/viewform?usp=sf_link">feedback form</a>.</div>

{{< img src="serverless/step_functions/overview.png" alt="New Log index" style="width:100%;" >}}

AWS Step Functions is a serverless orchestration service that lets developers create and manage multi-step application workflows. In addition to getting Cloudwatch metrics from Datadog's [AWS Step Functions integration][2], Datadog also provides native AWS Step Function monitoring and tracing.

Serverless Monitoring for AWS Step Functions enables you to:
- See the Lambda functions associated with a Step Function
- View end-to-end traces for a Step Function execution
- Set monitors on certain log or trace errors
- Profile your code (Node.JS and Python)

To get started, follow the [installation instructions][1].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /serverless/step_functions/installation
[2]: /integrations/amazon_step_functions/