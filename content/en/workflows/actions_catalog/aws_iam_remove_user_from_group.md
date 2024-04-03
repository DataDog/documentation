---
bundle: com.datadoghq.aws.iam
bundle_title: AWS IAM
description: Remove a user from a group.
icon:
  integration_id: aws-iam
  type: integration_logo
input: '#/$defs/RemoveUserFromGroupInputs'
inputFieldOrder:
- groupName
- userName
keywords:
- delete
- remove
output: '#/$defs/RemoveUserFromGroupOutputs'
permissions:
- iam:RemoveUserFromGroup
source: aws-iam
title: Remove user from group
---

Remove a user from a group.

{{< workflows >}}
