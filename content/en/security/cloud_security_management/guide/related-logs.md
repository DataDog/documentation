---
title: View a misconfiguration's related logs
---

Datadog Cloud Security's Related Logs feature allows you to quickly identify cloud audit logs that relate to a specific cloud resource. When investigating a misconfiguration, this can help you understand:
- Who created the resource
- Who last modified the resource, possibly introducing the misconfiguration

## Supported cloud providers

The "Related Logs" feature currently supports:
- AWS CloudTrail logs. CloudTrail events lack a standardized format that would allow a generic Logs query, but Related Logs uses an internal service that maps resource attributes to CloudTrail event fields, enabling Datadog to identify related CloudTrail logs. Here's a sample Logs query that Related Logs automatically generates and runs to find related CloudTrail logs.
- Azure Activity Logs

## Prerequisites

### AWS

- Set up [CloudTrail logs][1].
- Related Logs supports the following AWS resources:
  {{< related-logs-supported-resources >}}

    To request additional resource types, fill out the [feedback form][4].

### Azure

- Set up [Azure Activity Logs][5]

## View related logs

1. On the **Findings** page, in the [Misconfigurations explorer][2], open a misconfiguration for a supported resource type.
1. Click the **Related Logs** tab. Datadog queries your cloud logs for events related to the cloud resource.

### Search through a larger timeframe

By default, Related Logs looks through the last two weeks of related cloud logs. To extend the search to a larger timeframe:

1. While viewing a misconfiguration's related logs, click **View All Related Logs**. The search used to populate the list opens in Log Explorer.
1. In the upper-right corner, change the timeframe of the search.

**Note**: Related Logs only display cloud logs within your retention period. To store logs for an extended period of time in a cost-effective manner, Datadog recommends using [Flex Logs][3].

### Search through Flex Logs

If you're using Flex logs, you can the **Include Flex logs** toggle in the **Related Logs** tab to show related cloud logs that are stored as Flex logs.

## Sample generated queries

Here's a sample Logs query that Related Logs automatically generates and runs to find related CloudTrail logs in AWS. In this example, the query looks for logs that relate to a specific EC2 instance:

{{< code-block lang="plaintext" >}}
source:cloudtrail @recipientAccountId:172597598159 @awsRegion:us-east-1 @readOnly:false -status:error (@eventSource:ec2.amazonaws.com AND (@requestParameters.instanceId:"i-0d52853076ed2a357" OR @requestParameters.instancesSet.items.instanceId:"i-0d52853076ed2a357" OR @responseElements.instancesSet.items.instanceId:"i-0d52853076ed2a357" OR @requestParameters.resourcesSet.items.resourceId:"i-0d52853076ed2a357" OR @responseElements.ReplaceIamInstanceProfileAssociationResponse.iamInstanceProfileAssociation.instanceId:"i-0d52853076ed2a357" OR @responseElements.CreateFleetResponse.fleetInstanceSet.item.instanceIds.item:"i-0d52853076ed2a357" OR @requestParameters.CreateReplaceRootVolumeTaskRequest.InstanceId:"i-0d52853076ed2a357" OR @requestParameters.ModifyInstanceMetadataOptionsRequest.InstanceId:"i-0d52853076ed2a357" OR @serviceEventDetails.instanceIdSet:"i-0d52853076ed2a357" OR @requestParameters.AssociateIamInstanceProfileRequest.InstanceId:"i-0d52853076ed2a357" OR @requestParameters.CreateSnapshotsRequest.InstanceSpecification.InstanceId:"i-0d52853076ed2a357"))
{{< /code-block >}}

Here's a sample Logs query that Related Logs automatically generates and runs to find related Azure Activity logs. In this example, the query looks for logs that relate to a specific storage account:

{{< code-block lang="plaintext" >}}
source:azure.* @properties.eventCategory:Administrative @resourceId:(/SUBSCRIPTIONS/FA6CC2AC-1395-5913-1944-F16F8F47EB4D/RESOURCEGROUPS/DEV-RG/PROVIDERS/MICROSOFT.STORAGE/STORAGEACCOUNTS/DEMOSTGACCOUNT OR /SUBSCRIPTIONS/FA6CC2AC-1395-5913-1944-F16F8F47EB4D/RESOURCEGROUPS/DEV-RG/PROVIDERS/MICROSOFT.STORAGE/STORAGEACCOUNTS/DEMOSTGACCOUNT/*) 
{{< /code-block >}}



[1]: /security/cloud_security_management/setup/cloudtrail_logs/
[2]: https://app.datadoghq.com/security/compliance
[3]: /logs/log_configuration/flex_logs/
[4]: https://forms.gle/AqZg9jqBusDf62h87
[5]: /logs/guide/azure-automated-log-forwarding/
