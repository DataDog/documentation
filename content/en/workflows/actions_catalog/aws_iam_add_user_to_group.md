---
bundle: com.datadoghq.aws.iam
bundle_title: AWS IAM
description: Add a user to a group.
icon:
  integration_id: aws-iam
  type: integration_logo
input: '#/$defs/AddUserToGroupInputs'
inputFieldOrder:
- groupName
- userName
output: '#/$defs/AddUserToGroupOutputs'
permissions:
- iam:AddUserToGroup
source: aws-iam
title: Add user to group
---

Add a user to a group.

{{< workflows >}}
