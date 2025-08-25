---
title: Deployment Tracking for AWS Lambda Serverless Applications
further_reading:
    - link: '/serverless/distributed_tracing'
      tag: 'Documentation'
      text: 'Distributed Tracing for Serverless'
    - link: '/serverless/serverless_tagging'
      tag: 'Documentation'
      text: 'Serverless Tagging'
aliases:
  - /serverless/deployment_tracking
---

Deployment tracking helps you to understand when a new version of code or a configuration change causes a spike in errors, degraded performance, or when your cloud environment drifts from its expected state.

To access deployment tracking for your serverless applications, select a function in the [Serverless view][1] to open a side panel, and click the **Deployments** tab. This shows key serverless metrics like invocations, execution duration, and error counts automatically displayed with event overlays that mark code deployments and configuration changes related to the function.

For visibility into historical code and configuration changes, adjust the global time selector at the top right of the view.

## Setup

Datadog collects code and configuration change events for your AWS Lambda functions from AWS CloudTrail.

1. If you haven't already, set up the [Amazon Web Services][2] integration. 

2. Add the following permission to the policy document for your AWS/Datadog role:

   ```text
   cloudtrail:LookupEvents
   ```

If you have already added the permission, but you still don't see events for any of your AWS Lambda functions, enable Deployment Tracking using the [AWS Lambda integration tile][3].

{{< img src="serverless/lambda_integration_settings.png" alt="Lambda Integration Settings" style="width:100%;">}}

### Resource Changes

<div class="alert alert-info">Resource Changes is in Preview. Enabling resource collection can impact your AWS CloudWatch costs.</div>

You can use [Resource Changes][4] for visibility and control over configuration changes to your AWS Lambda functions. To enable Resource Changes, enable resource collection in the Datadog-AWS integration:

1. Navigate to the [Amazon Web Services integration tile][5] in Datadog.
2. Select your AWS account and navigate to the **Resource Collection** tab.
3. Toggle **Enable Resource Collection**.

See the [Resource Changes][4] documentation for more information.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/functions
[2]: /integrations/amazon_web_services/#setup
[3]: https://app.datadoghq.com/integrations/amazon-lambda
[4]: /infrastructure/resource_catalog/resource_changes/
[5]: https://app.datadoghq.com/integrations/amazon-web-services