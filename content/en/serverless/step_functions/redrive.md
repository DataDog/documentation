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

You can [redrive][1] executions to continue failed AWS Step Functions from the point of failure, without needing a complete state machine restart. You can do this directly within Datadog.

{{< img src="serverless/step_functions/redrive.png" alt="A visualization of a failed Step Function execution." style="width:100%;" >}}

## Enable redrive within Datadog
To enable using redrive within Datadog, configure an [AWS Connection][3] with [Datadog App Builder][4]. Ensure that your IAM roles include policies that have permissions to allow executing a Step Function for the retry action (`StartExecution`) or redriving a Step Function for the redrive action (`RedriveExecution`).

## Usage
To take action on a Step Function in Datadog: 
1. Go to the [Step Functions][2] page. 
2. Find the Step Function you wish to redrive.
3. Open this Step Function's side panel or State Machine Map.
4. Click on the **Failed** pill to open a redrive modal.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/step-functions/latest/dg/redrive-executions.html
[2]: https://app.datadoghq.com/functions?cloud=aws&entity_view=step_functions
[3]: https://docs.aws.amazon.com/dtconsole/latest/userguide/welcome-connections.html
[4]: /service_management/app_builder/