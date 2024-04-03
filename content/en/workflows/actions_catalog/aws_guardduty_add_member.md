---
bundle: com.datadoghq.aws.guardduty
bundle_title: AWS GuardDuty
description: Invite other AWS accounts to enable GuardDuty, and allow the current
  AWS account to view and manage findings on their behalf as the GuardDuty administrator
  account.
icon:
  integration_id: amazon-guardduty
  type: integration_logo
input: '#/$defs/AddMemberInputs'
inputFieldOrder:
- region
- detectorId
- accountId
- email
- sendInvite
- message
output: '#/$defs/AddMemberOutputs'
permissions:
- guardduty:CreateMembers
- guardduty:InviteMembers
source: amazon-guardduty
title: Add member
---

Invite other AWS accounts to enable GuardDuty, and allow the current AWS account to view and manage findings on their behalf as the GuardDuty administrator account.

{{< workflows >}}
