---
bundle: com.datadoghq.aws.lambda
bundle_title: AWS Lambda
description: Lists functions.
icon:
  integration_id: amazon-lambda
  type: integration_logo
input: '#/$defs/ListAWSLambdaFunctionInputs'
inputFieldOrder:
- region
keywords:
- all
- list
output: '#/$defs/ListAWSLambdaFunctionOutputs'
permissions:
- lambda:ListFunctions
source: amazon-lambda
stability: stable
title: List functions
---

Lists functions.

{{< workflows >}}
