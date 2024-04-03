---
bundle: com.datadoghq.nist
bundle_title: NIST
description: Retrieve information for a CVE from the National Vulnerability Database.
icon:
  integration_id: nist
  type: integration_logo
input: '#/$defs/GetCveInputs'
inputFieldOrder:
- cveId
keywords:
- describe
- get
- lookup
output: '#/$defs/GetCveOutputs'
source: nist
title: Get CVE
---

Retrieve information for a CVE from the National Vulnerability Database.

{{< workflows >}}
