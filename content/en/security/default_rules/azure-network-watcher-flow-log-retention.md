---
aliases:
- bos-b0c-7lw
- /security_monitoring/default_rules/bos-b0c-7lw
- /security_monitoring/default_rules/azure-network-watcher-flow-log-retention
disable_edit: true
integration_id: azure.networkwatcher
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.networkwatcher
title: Azure network service group log retention is properly set
type: security_rules
---

## Description

Azure Network Watcher can use flow logs so that you can monitor traffic from resources. This rule generates a finding if there is no retention policy set with a duration over 90 days. 

Note: 0 days means unlimited retention.

## Rationale

Setting this attribute enables flow logs to be retained for an appropriate amount of time that enables a better security posture for your organization. These logs should be retained critical resources in your environment.

## Remediation

### From the console

1. Follow the instructions in [Tutorial: Log network traffic to and from a virtual machine using the Azure portal][1] to enable the 'flow logs' in Network Watcher.

### From the command line

1. Follow the steps in [Configuring Network Security Group Flow logs with Azure CLI][2] to enable the 'flow logs' in Network Watcher.
2. Ensure Insights provider is registered by running the following command to check:

    {{< code-block lang="powershell">}}
    az provider register --namespace Microsoft.Insights
    {{< /code-block >}}
3. Enable `flow logs`:
    Note: You will need to have a storage account setup prior to this.
    {{< code-block lang="powershell">}}
    az network watcher flow-log create --resource-group resourceGroupName --enabled true --nsg nsgName --storage-account storageAccountName --location location
    az network watcher flow-log create --resource-group resourceGroupName --enabled true --nsg nsgName --storage-account storageAccountName --location location --format JSON --log-version 2
    {{< /code-block >}}
4. Repeat steps 2 and 3 for resources that are not configured correctly.

[1]: https://docs.microsoft.com/en-us/azure/network-watcher/network-watcher-nsg-flow-logging-portal#enable-nsg-flow-log
[2]: https://docs.microsoft.com/en-us/azure/network-watcher/network-watcher-nsg-flow-logging-cli
