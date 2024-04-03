---
bundle: com.datadoghq.aws.guardduty
bundle_title: AWS GuardDuty
description: Update the threat intelligence set specified by the threat intelligence
  set ID.
icon:
  integration_id: amazon-guardduty
  type: integration_logo
input: '#/$defs/UpdateThreatIntelSetInputs'
inputFieldOrder:
- region
- detectorId
- threatIntelId
- activate
- location
- name
keywords:
- modify
- put
- set
- update
output: '#/$defs/UpdateThreatIntelSetOutputs'
permissions:
- guardduty:UpdateThreatIntelSet
source: amazon-guardduty
title: Update threat intel set
---

Update the threat intelligence set specified by the threat intelligence set ID.

{{< workflows >}}
