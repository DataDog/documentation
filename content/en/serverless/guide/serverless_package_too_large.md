---
title: Serverless Package Too Large
kind: documentation
further_reading:
- link: '/serverless/installation/nodejs'
  tag: 'Documentation'
  text: 'Instrumenting Node.js Applications'
---

This guide helps you troubleshoot the error "Code uncompressed size is greater than max allowed size of 272629760" when instrumenting your Node.js serverless application using the Datadog serverless plugin. Although there have been very few reports of the error when instrumenting applications written in other languages or deployed using other tools, the ideas described below may still apply.

Essentially this error indicates that your function's _uncompressed_ code size exceeds the 250 MB limit. Both your [function package][1] (the .zip artifact containing your function code and dependencies) and the [Lambda layers][2] configured on your function count towards this limit. Therefore you want to examine both of them to narrow down the root cause. 

## Layers

Typically Datadog adds two Lambda layers for instrumentation -- a language-specific library that instruments the function code and the Extension that aggregates, buffers and forwards the observability data to the Datadog backend.

You can inspect the content and size of the Datadog Lambda layers using AWS CLI command [aws lambda get-layer-version][3]. For example, running the following commands gives you links to download the Lambda layers for _Datadog-Node14-x version 67_ and _Datadog-Extension version 19_ and inspect the uncompressed size (~30 MB combined). The uncompressed size varies by layers and versions, and you should replace the layer name and version number with the ones used by your applications.

```
aws lambda get-layer-version \
  --layer-name arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Node14-x \
  --version-number 67

aws lambda get-layer-version \
  --layer-name arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Extension \
  --version-number 19
```

Besides Datadog Lambda layers, you should also inspect other Lambda layers added (or to be added) to your functions. If you are using the [Serverless Framework][4], you can find the the CloudFormation template from the hidden `.serverless` folder after running the `deploy` or `package` command, and the list of Lambda layers from the `Layers` section.

## Package

The function deployment package may often contain large files or code that you don't actually need. If you are using the Serverless Framework, you can find the generated deployment package (.zip file) from the hidden `.serverless` folder after running the `deploy` or `package` command.

If the size of the deployment package and layers don't add up to the limit, you should contact AWS Support for investigation. If the total size does exceed the limit, you should inspect the deployment package and exclude large files that you don't actually need in runtime using the [package][5] option.

## Dependencies

The Datadog Lambda layer packages the instrumentation libraries and makes them available to use in the Lambda execution environment, therefore you do _NOT_ need to define `datadog-lambda-js` and `dd-trace` as `dependencies` in your `package.json`. If you do need the Datadog libraries for local build or tests, define them as `devDependencies` so that they get excluded from the deployment package. Similarly, `serverless-plugin-datadog` is only needed for dev, and should be defined under `devDependencies`.

Besides Datadog dependencies, you should also inspect other dependencies (the `node_modules` folder) that are included into your deployment package and only leave the ones that you need in `dependencies`.

## Webpack

Using a bundler like [Webpack][6] can dramatically reduce your deployment package size by only including the code that are used. See [Node.js Lambda Tracing and Webpack Compatibility][7] for required webpack configurations.

## Get help

If you need the Datadog support team to help investigate, please include the following information in your ticket.

1. the function's configured Lambda layers (name and version, or ARNs)
2. the function's deployment package (or a screenshot showing the content and size of the uncompressed package) to be uploaded to AWS
3. the project configuration files (don't forget to redact hardcoded secrets) - serverless.yaml, package.json, package-lock.json, yarn.lock, tsconfig.json and webpack.config.json.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-package.html#gettingstarted-package-zip
[2]: https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-package.html#gettingstarted-package-layers
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/lambda/get-layer-version.html
[4]: https://www.serverless.com/
[5]: https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml/#package
[6]: https://webpack.js.org
[7]: /serverless/guide/serverless_tracing_and_webpack/
