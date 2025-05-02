---
title: Azure VMs appear in the App without metrics

aliases:
  - /integrations/faq/azure-vms-are-showing-up-in-the-app-but-not-reporting-metrics
---

After properly installing the Azure Integration within Datadog, metrics from you Azure VMs and other services should begin to flow in about 15 minutes.

If after this time you see Azure VMs in your infrastructure list but no metrics are being reported, a few things can be happening.

1. Make sure you are looking for the right metrics.
    **Classic** virtual machine metrics begin with the azure.vm namespace and ARM deployed virtual machine metrics begin with the `azure.compute_virtualmachines` namespace.

2. If neither of these namespaces are returning metrics, make sure **Diagnostics** is turned on for the Virtual Machines within the Azure Portal. NOTE, only Boot diagnostics and Basic metrics are required.
    * For **Classic** VMs:
    {{< img src="integrations/guide/azure_vms_appearing_in_the_app_without_metrics/classic_vm.png" alt="The azure portal showing the diagnostics view of a classic virtual machine with status set to on" >}}

    * For ARM deployed VMs:
    {{< img src="integrations/guide/azure_vms_appearing_in_the_app_without_metrics/arm_deployed_vm.png" alt="The azure portal showing the diagnostics settings view of a virtual machine with status set to on" >}}

3. Make sure the Virtual machine is running.
    The integration does not collect performance metrics for stopped or deallocated machines. Use the `azure.vm.count` metric and the `status` tag values of `running`, `stopped`, and `stopped_deallocated` to determine the status of your hosts. Make sure the host in question has `status:running`, and is running in the Azure portal.
    {{< img src="integrations/guide/azure_vms_appearing_in_the_app_without_metrics/azure_vm_running_2025-05-02.png" alt="A graph of the azure.vm.count metric from status:running" >}}
