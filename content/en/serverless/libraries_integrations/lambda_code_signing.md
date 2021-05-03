---
title: Lambda Code Signing
kind: documentation
---

[Code signing for AWS Lambda][1] helps to ensure that only trusted code is deployed from your Lambda functions to AWS. When you enable code signing on your functions, AWS validates that all of the code in your deployments is signed by a trusted source, which you define from your [Code Signing Configuration][2]. 

# Configuration

If your Lambda functions are configured to use code signing, you must add Datadog's Signing Profile ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) to your function's [Code Signing Configuration][2] before you can deploy Lambda functions using Lambda Layers published by Datadog. The following libraries & integrations add Lambda Layers to your functions:
- [Datadog Lambda Library][3]
- [Datadog Lambda Extension][4]
- [Datadog Serverless Plugin][5]
- [Datadog CloudFormation Macro][6]
- [Datadog CLI][7]
- [Datadog CDK Construct Library][8]

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html
[2]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-updates
[3]: /serverless/libraries_integrations/library
[4]: /serverless/libraries_integrations/extension
[5]: /serverless/libraries_integrations/plugin
[6]: /serverless/libraries_integrations/macro
[7]: /serverless/libraries_integrations/cli
[8]: https://www.npmjs.com/package/datadog-cdk-constructs
