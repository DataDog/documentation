---
bundle: com.datadoghq.sigsci
bundle_title: Signal Sciences
description: Remove given IPs from an site list.
icon:
  integration_id: sigsci
  type: integration_logo
input: '#/$defs/RemoveFromSiteListInputs'
inputFieldOrder:
- siteName
- listId
- addressesToRemove
keywords:
- delete
- remove
output: '#/$defs/RemoveFromSiteListOutputs'
source: sigsci
title: Remove IPs from site list
---

Remove given IPs from an site list.

{{< workflows >}}
