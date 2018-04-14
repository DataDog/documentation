---
title: Les machines virtuelles Azure apparaissent dans l'application, mais pas dans les métriques rapportées. 
kind: faq
---

Après avoir correctement installé l'intégration Azure dans Datadog, les métriques de vos machines virtuelles Azure et d'autres services devraient commencer à arriver dans les ~ 15 minutes.

If after this time you see Azure VMs in your infrastructure list but no metrics are being reported, a few things can be happening.

1. Assurez-vous que vous recherchez les bonnes métriques.
    "Classic" virtual machine metrics begin with the azure.vm namespace and ARM deployed virtual machine metrics begin with the `azure.compute_virtualmachines` namespace.

2. If neither of these namespaces are returning metrics, make sure "Diagnostics" is turned on for the Virtual Machines within the Azure Portal. NOTE, only Boot diagnostics and Basic metrics are required.
    * For "Classic" VMs:
    {{< img src="integrations/faq/classic_vm.png" alt="classic_vm" responsive="true" popup="true">}}

    * For ARM deployed VMs:
    {{< img src="integrations/faq/arm_deployed_vm.png" alt="arm_deployed_vm" responsive="true" popup="true">}}

3. Make sure the Virtual machine is running.
    Our integration do not collect performance metrics for stopped/deallocated machines. However, the `azure.vm.status metric` returns 1 if the machine is running OR stopped (which results in stopped VMs showing up in the infrastructure list). The associated status tag allows you to differentiate between running and not_running hosts. Make sure the host in question has status:running (and is running in the Azure portal!)
    {{< img src="integrations/faq/azure_vm_running.png" alt="azure_vm_running" responsive="true" popup="true">}}

