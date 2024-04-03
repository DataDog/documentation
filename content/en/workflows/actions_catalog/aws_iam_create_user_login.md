---
bundle: com.datadoghq.aws.iam
bundle_title: AWS IAM
description: Create a password for an IAM user.
icon:
  integration_id: aws-iam
  type: integration_logo
input: '#/$defs/CreateUserLoginInputs'
inputFieldOrder:
- userName
- password
- passwordResetRequired
output: '#/$defs/CreateUserLoginOutputs'
permissions:
- iam:CreateLoginProfile
source: aws-iam
title: Create user login
---

Create a password for an IAM user.

{{< workflows >}}
