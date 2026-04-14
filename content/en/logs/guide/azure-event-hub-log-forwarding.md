---
title: Send Azure Logs to Datadog from an Event Hub
private: true
further_reading:
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn how to explore your logs"
- link: "/logs/guide/reduce_data_transfer_fees"
  tag: "Guide"
  text: "How to send logs to Datadog while reducing data transfer fees"
---

## Overview

Use this guide to set up log forwarding from an Azure Event Hub to any Datadog site.

## Setup

{{% collapse-content title="Azure portal" level="h4" expanded=false id="azure-portal-setup" %}}
Click the button below and fill in the form on the Azure Portal. The Azure resources required to get activity logs streaming into your Datadog account are deployed for you. To forward Activity Logs, set the **Send Activity Logs** option to true.

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fdatadog-serverless-functions%2Frefs%2Fheads%2Fmaster%2Fazure%2Feventhub_log_forwarder%2Fparent_template.json)
{{% /collapse-content %}} 

{{% collapse-content title="Terraform" level="h4" expanded=false id="terraform-setup" %}}
See the [terraform-azure-datadog-log-forwarder repo][3] for the Terraform code to set up the Azure resources required to collect and forward Azure resource logs to Datadog.
{{% /collapse-content %}} 

### Azure platform logs

After creating the necessary Azure resources, set up diagnostic settings for each log source to send Azure platform logs (including resource logs) to the created Event Hub.

**Note**: Resources can only stream to Event Hubs in the same Azure region.

## Troubleshooting

### Naming conflicts

If you have Azure resources with the same resource name as one of the default parameters, it can lead to naming conflicts. Azure does not allow resources to share resource names within an individual subscription. Datadog recommends renaming the default parameter with a unique name that does not already exist within your environment.

**Note**: If you are rerunning the template due to this failure, it is also advised that you remove the entire resource group to create a fresh deployment. 

### Unregistered resource provider

If your template deployment is failing due to the error **The subscription is not registered to use namespace 'Microsoft.EventHub'**:

Azure has resource providers for each of its services, for example: `Microsoft.EventHub` for the Azure EventHub. If your Azure subscription is not registered to a required resource provider the script fails. You can fix this issue by registering with the resource provider. Run this command in CloudShell. 

{{< code-block lang="shell" filename="Example" >}}

az provider register --namespace Microsoft.EventHub

{{< /code-block >}}

### Exceeding log quota

Did you install the script successfully, but you are still not seeing activity/platform logs within the Logs Explorer? 

Ensure that you have not exceeded your [daily quota][2] for log retention.

**Note**: It is advised that you take at least five minutes after the execution of the script to start looking for logs in the Logs Explorer.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[2]: /logs/indexes/#set-daily-quota
[3]: https://github.com/Azure-Samples/terraform-azure-datadog-log-forwarder
