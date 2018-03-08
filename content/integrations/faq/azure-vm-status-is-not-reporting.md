---
title: Azure VM status is not reporting
kind: faq
---

Azure Virtual Machines that are being monitored by Datadog should report an azure.vm.status metric that determines if the machine is currently running.

If you have VMs that are not reporting an azure.vm.status, but are successfully reporting performance metrics (i.e. cpu usage, network data, etc...), it is likely that your Azure subscription needs to register the Azure Resource Health provider.

Doing so is very easy using the Azure Command Line Interface.

Open a terminal and follow the commands below. After executing azure login, login to the Azure user associated with your Datadog account.
```
azure login
azure config mode arm
azure provider register Microsoft.ResourceHealth
```

And that's it. The azure.vm.status metric should begin to flow into Datadog in 5 - 10 minutes.

