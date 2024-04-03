---
bundle: com.datadoghq.aws.lambda
bundle_title: AWS Lambda
description: Get details about a function.
icon:
  integration_id: amazon-lambda
  type: integration_logo
input: '#/$defs/GetAWSLambdaFunctionInputs'
inputFieldOrder:
- region
- resourceId
keywords:
- describe
- get
- lookup
output: '#/$defs/GetAWSLambdaFunctionOutputs'
permissions:
- lambda:GetFunction
- lambda:GetFunctionCodeSigningConfig
source: amazon-lambda
stability: stable
title: Describe function
---

Get details about a function.

{{< workflows >}}
