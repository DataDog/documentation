---
title: Troubleshooting Serverless Layer not Authorized Errors
---
This guide helps you troubleshoot the deployment error `not authorized to perform: lambda:GetLayerVersion on resource`. This error is commonly seen with Datadog Lambda Library layers or the Datadog Extension layer.

## Regionality
Lambda functions can only include [Lambda layers][1] that are located in the same region as the function. Typically, this error occurs when users copy instrumentation settings from other applications deployed in different regions.

Verify that the Lambda layer region and Lambda function version match. Then verify that the version number is correct.

You can verify that a Lambda layer version exists by running `aws lambda get-layer-version` with valid AWS credentials.

For example, to verify the Datadog Extension layer and the Datadog Node.js library layer, run:
```
aws lambda get-layer-version \
  --layer-name arn:aws:lambda:us-east-1:464622532012:layer:Datadog-{{< latest-lambda-layer-version layer="node-example-version" >}} \
  --version-number {{< latest-lambda-layer-version layer="node" >}}

aws lambda get-layer-version \
  --layer-name arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Extension \
  --version-number {{< latest-lambda-layer-version layer="extension" >}}
```

## Permissions
Occasionally, users accidentally explicitly `DENY` permission for their functions to perform `lambda:GetLayerVersion`. Some [resource-based][2] policy configurations can cause an explicit `DENY`. Additionally, IAM [permissions boundaries][3] may also cause an explicit `DENY` for `lambda:GetLayerVersion`.

To test this, use an IAM user attached to the same IAM policy your Lambda function uses, and test the `get-layer-version` command as listed above. The command should succeed with no errors.

## Contact Datadog support

If you need the Datadog support team to help investigate, include the following information in your ticket:

1. The function's configured Lambda layers (name and version, or ARNs).
2. The project configuration files, with **redacted hardcoded secrets**: `serverless.yaml`, `package.json`, `package-lock.json`, `yarn.lock`, `tsconfig.json`, and `webpack.config.json`.
3. The project IAM policies and role information.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-package.html#gettingstarted-package-layers
[2]: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html
[3]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html
