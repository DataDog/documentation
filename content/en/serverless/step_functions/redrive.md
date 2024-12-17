---
title: Redrive AWS Step Functions executions
further_reading:
    - link: 'https://docs.aws.amazon.com/step-functions/latest/dg/redrive-executions.html'
      tag: 'AWS Developer Guide'
      text: 'Restarting state machine executions with redrive in Step Functions'
    - link: "/service_management/app_builder/"
      tag: "Documentation"
      text: "Datadog App Builder"
---

This page explains how to [redrive][1] executions directly from Datadog to continue failed AWS Step Functions from the point of failure without a state machine restart.

{{< img src="serverless/step_functions/redrive.png" alt="A visualization of a failed Step Function execution." style="width:100%;" >}}

## Enable redrive within Datadog
To enable using redrive within Datadog, configure an [AWS Connection][3] with [Datadog App Builder][4]. Ensure that your IAM roles include permissions that allow executing a Step Function for the retry action (`StartExecution`) or redriving a Step Function for the redrive action (`RedriveExecution`).

## Usage
To take action on a Step Function in Datadog: 
1. Go to the [Step Functions][2] page. 
2. Find the Step Function you wish to redrive.
3. Open this Step Function's side panel. On the **Executions** tab, locate the failed execution you wish to redrive.
4. Click on the **Failed** pill to open a redrive modal.
5. Click the **Redrive** button.

## Tracing redrives
When monitoring redriven executions, we recommend using the Waterfall view. The large gap between the original execution and redrive can make the Flame Graph view imperceptible.

We recommend using the Waterfall view for monitoring redrive traces as there can be a very large gap after the original execution.

### Merge Lambda traces
**Supported runtimes**: Node.js (layer v118+) or Python (layer v105+)

For instructions on how to merge redriven Step Functions and Lambda traces, see [Merge Step Functions and Lambda Traces][5]. 

### Troubleshooting Missing Redrive Traces
If a redrive is triggered within one minute of the original execution’s failure, its corresponding trace may not appear.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/step-functions/latest/dg/redrive-executions.html
[2]: https://app.datadoghq.com/functions?cloud=aws&entity_view=step_functions
[3]: https://docs.aws.amazon.com/dtconsole/latest/userguide/welcome-connections.html
[4]: /service_management/app_builder/
[5]: /serverless/step_functions/merge-step-functions-lambda
