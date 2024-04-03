---
bundle: com.datadoghq.sigsci
bundle_title: Signal Sciences
description: Add given IPs to a site list if they don't already exist.
icon:
  integration_id: sigsci
  type: integration_logo
input: '#/$defs/AddToSiteListInputs'
inputFieldOrder:
- siteName
- listId
- addressesToAdd
output: '#/$defs/AddToSiteListOutputs'
source: sigsci
title: Add IPs to site list
---

Add given IPs to a site list if they don't already exist.

{{< workflows >}}
