---
bundle: com.datadoghq.aws.iam
bundle_title: AWS IAM
description: Create a new IAM user for your Amazon Web Services account.
icon:
  integration_id: aws-iam
  type: integration_logo
input: '#/$defs/CreateUserInputs'
inputFieldOrder:
- userName
- path
- permissionsBoundary
- tags
output: '#/$defs/CreateUserOutputs'
permissions:
- iam:CreateUser
source: aws-iam
title: Create user
---

Create a new IAM user for your Amazon Web Services account.

{{< workflows >}}
