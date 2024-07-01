---
"categories":
- aws
- cloud
- notifications
"custom_kind": "integration"
"dependencies": []
"description": "A serverless event bus that processes events from AWS services, SaaS, and your apps in near real time."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_event_bridge/"
"draft": false
"git_integration_title": "amazon_event_bridge"
"has_logo": true
"integration_id": ""
"integration_title": "Amazon EventBridge"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_event_bridge"
"public_title": "Datadog-Amazon EventBridge Integration"
"short_description": "A serverless event bus that processes events from AWS services, SaaS, and your apps in near real time."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< site-region region="gov" >}}
<div class="alert alert-warning">The Datadog for Government site does not support Amazon EventBridge.</div>
{{< /site-region >}}

## Overview

Datadog’s integration with Amazon EventBridge offers the following features:

- Create custom event buses across your integrated AWS accounts
- Send Datadog alert notification events into the event buses of your choice
- Within AWS, set up triggers on your event buses with services like Kinesis, Lambda, and more
- Use the information within the alert event to execute auto-remediation pipelines and runbooks, run analytics queries, etc.
- This integration is not supported in GovCloud

{{< img src="integrations/amazon_event_bridge/eventbridge_monitor_notification.png" alt="A monitor notification being sent to EventBridge" >}}

## Setup

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Installation

1. Ensure that the main [AWS integration][1] is installed for each AWS account that receives alert notifications.
2. Ensure the following permissions exist in the permissions policy for Datadog AWS Role(s):
   `events:CreateEventBus` and `events:PutPartnerEvents`.
3. The Amazon EventBridge integration is automatically installed with the main AWS integration.

**Note**: You can also use the [API][2] or [Terraform][3] to set up an Amazon EventBridge source. 

### Configuration

`events:CreateEventBus` and `events:PutPartnerEvents` permissions are required to send alert notifications to your event buses. If you do not have these permissions set, read the [Datadog IAM permissions documentation][4] to enable permissions prior to further configuration.

1. Navigate to the [Datadog - Amazon EventBridge integration][5] tile to see a list of AWS accounts integrated in Datadog where you can create Event Bridges.
2. Within the AWS account of choice, create a new event bus by providing a name and selecting the region where you want it to exist.
3. Within Datadog alerts, use the `@awseventbridge-<MY_EVENT_BUS>` syntax to send alert notifications to your event buses.
4. Within AWS, connect your event buses to targets such as Lambda, Kinesis, and [many other services][6] to create event-driven workflows.
    **Note**: Examples of Datadog use cases can be found on Datadog's partner page in the [AWS Console][7].
5. After setting up an event bus in Datadog, navigate to the [Amazon EventBridge console][8] and select `Rules` in the navigation pane.
6. Select `Create Rule` and add a name and description for your rule.
7. Under **Define Pattern**, select `Event Pattern`. Select `Predefined by service` as the **event matching pattern**. For **service provider**, select `Service partners`. For **service name**, select `Datadog`. This populates the event buses that are in Datadog. Add any additional information for your rule., then **Save** the rule.
8. To disconnect an event bus in Datadog, hover over the event bus of your choice and press the trash icon.
    **Note**: This action disconnects the event bus from AWS, but does not delete the event bus itself within AWS.

**Note**: EventBridge rules are not imported into Datadog unless the rule is active and has been triggered. 

### Automated actions

Set up new outbound notification channels for monitors and snapshots from Datadog with the Amazon EventBridge integration. With automated actions, you can configure your AWS resources to:

* Restart a process if process ends for [live process monitoring][9]
* Prompt EC2 reboots
* Prompt ECS Task (kick off another task when one task ends)
* Apply an Ansible Playbook (make any change on hosts)
* Run remote patches
* Run remote SSH scripts
* Run Windows Updates or install applications

The full list of resources you can target is available on the [AWS website][10].

Find below an example of how to send a snapshot to trigger this process. Once triggered, you can specify the actions receipt in AWS.

{{< wistia uezo3fh61j >}}

## Data Collected

### Metrics

The Amazon EventBridge integration does not include any metrics.

### Events

The Amazon EventBridge integration does not include any events.

### Service Checks

The Amazon EventBridge integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][11].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://docs.datadoghq.com/api/latest/aws-integration/#create-an-amazon-eventbridge-source
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws_event_bridge
[4]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#datadog-aws-iam-policy
[5]: https://app.datadoghq.com/integrations/amazon-event-bridge
[6]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/WhatIsCloudWatchEvents.html
[7]: https://console.aws.amazon.com/events/home#/partners/datadoghq.com?page=overview
[8]: https://console.aws.amazon.com/events/
[9]: https://docs.datadoghq.com/monitors/monitor_types/process/
[10]: https://docs.aws.amazon.com/eventbridge/latest/userguide/what-is-amazon-eventbridge.html
[11]: https://docs.datadoghq.com/help/

