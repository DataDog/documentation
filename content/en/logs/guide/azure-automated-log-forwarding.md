---
title: Azure Automated Log Forwarding Setup
private: true
further_reading:
- link: "https://www.datadoghq.com/blog/monitoring-azure-platform-logs/"
  tag: "Blog"
  text: "Best practices for monitoring Microsoft Azure platform logs"
---

## Overview

<div class="alert alert-info">Azure automated log forwarding is in Preview.</div>

Use this guide to automate your Azure log forwarding setup with an Azure Resource Manager (ARM) template. 

The ARM template deploys resources from a series of Azure services (storage accounts and function apps) into your subscriptions that collect and forward logs to Datadog. These services automatically scale up or down to match log volume. Scaling is manged by a control plane, which is a set of function apps deployed to a subscription of your choice. Storage accounts and function apps are deployed in each of the subscriptions forwarding logs to Datadog.

**All sites**: All [Datadog sites][4] can use the steps on this page to complete setup of automated log forwarding.

## Setup

Begin by opening the [Automated Log Forwarding ARM template][1].

### Basics

1. Select the management group. This is needed for the ARM template to grant permissions to the subscriptions you select for automated log forwarding.
2. Select the region. This is where the control plane is deployed.
3. Select the subscriptions to forward logs.
4. Select the subscription to deploy the control plane.
5. Enter a name for the resource group to be used by the control plane.

**Note**: It is recommended to choose a new, unused resource group name to simplify management of control plane services.

{{< img src="logs/guide/azure-automated-log-forwarding/deployment_basics.png" alt="The Basics page of the ARM template for Azure automated log forwarding" popup="true" style="width:100%">}}

6. Click **Next**.

### Datadog Configuration

1. Enter your [Datadog API key][2] value.
2. Enter your [Datadog App key][3] value.
3. Select your [Datadog Site][4].

{{< img src="logs/guide/azure-automated-log-forwarding/deployment_datadog_configuration.png" alt="The Datadog Configuration page of the ARM template for Azure automated log forwarding" popup="true" style="width:100%">}}

4. Click **Next**.

### Deployment

1. Click the checkbox to acknowledge the deployment warnings.
2. Click **Review + create**.

### Review + create

1. Review the finalized deployment details.
2. Click **Create**.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://portal.azure.com/#create/Microsoft.Template/uri/CustomDeploymentBlade/uri/https%3A%2F%2Fddazurelfo.blob.core.windows.net%2Ftemplates%2Fazuredeploy.json/createUIDefinitionUri/https%3A%2F%2Fddazurelfo.blob.core.windows.net%2Ftemplates%2FcreateUiDefinition.json
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: /getting_started/site/
