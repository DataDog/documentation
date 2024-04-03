---
bundle: com.datadoghq.aws.guardduty
bundle_title: AWS GuardDuty
description: Update the IP set specified by the IP set ID.
icon:
  integration_id: amazon-guardduty
  type: integration_logo
input: '#/$defs/UpdateIpSetInputs'
inputFieldOrder:
- region
- detectorId
- ipSetId
- activate
- location
- name
keywords:
- modify
- put
- set
- update
output: '#/$defs/UpdateIpSetOutputs'
permissions:
- guardduty:UpdateIPSet
source: amazon-guardduty
title: Update IP set
---

Update the IP set specified by the IP set ID.

{{< workflows >}}
