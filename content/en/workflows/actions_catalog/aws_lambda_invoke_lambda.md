---
bundle: com.datadoghq.aws.lambda
bundle_title: AWS Lambda
description: Invoke a Lambda function. You can invoke a function synchronously (and
  wait for the response), or asynchronously.
icon:
  integration_id: amazon-lambda
  type: integration_logo
input: '#/$defs/InvokeLambdaInputs'
inputFieldOrder:
- region
- functionName
- invocationType
- qualifier
- inputPayload
output: '#/$defs/InvokeLambdaOutputs'
permissions:
- lambda:InvokeFunction
source: amazon-lambda
title: Invoke lambda function
---

Invoke a Lambda function. You can invoke a function synchronously (and wait for the response), or asynchronously.

{{< workflows >}}
