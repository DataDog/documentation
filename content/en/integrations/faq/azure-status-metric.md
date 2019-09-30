---
title: Azure Status Metric
kind: faq
aliases:
  - /integrations/faq/azure-vm-status-is-not-reporting
---

## Overview

Datadog provides an `azure.*.status` metric for each resource monitored with the [Azure integration][1]. For example, Azure Virtual Machines monitored by Datadog should report `azure.vm.status`, which identifies if the machine is currently running.

## Troubleshooting

If your Azure integration is reporting metrics but not `azure.*.status`, your Azure subscription needs to register the Azure Resource Health provider.

Using the Azure Command Line Interface:
```bash
azure login # Login to the Azure user associated with your Datadog account
azure config mode arm
azure provider register Microsoft.ResourceHealth
```

The `azure.*.status` metric should show in Datadog within 5 - 10 minutes.

[1]: /integrations/azure
