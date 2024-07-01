---
title: Troubleshooting Serverless Package Too Large Errors
kind: documentation
further_reading:
- link: /serverless/installation/nodejs
  tag: Documentation
  text: Instrumenting Node.js Applications
---

This guide helps you troubleshoot the error "Code uncompressed size is greater than max allowed size of 272629760". This error is most commonly seen when instrumenting Node.js serverless applications using the Datadog serverless plugin. The troubleshooting strategy may also apply to the same error if you see it for other languages or deployment methods.

The error indicates that your function's _uncompressed_ code size exceeds the 250 MB limit. Both your [function package][1] (the `.zip` artifact containing your function code and dependencies) and the [Lambda layers][2] configured on your function count towards this limit. Examine both to find the root cause.

## Layers

Typically Datadog adds two Lambda layers for instrumentation:

- A language-specific library that instruments the function code, and
- The extension, which aggregates, buffers, and forwards observability data to the Datadog backend.

Inspect the content and size of the Datadog Lambda layers using AWS CLI command [`aws lambda get-layer-version`][3]. For example, running the following commands gives you links to download the Lambda layers for _Datadog-{{< latest-lambda-layer-version layer="node-example-version" >}} version {{< latest-lambda-layer-version layer="node" >}} and _Datadog-Extension version {{< latest-lambda-layer-version layer="extension" >}} and inspect the uncompressed size (about 30 MB combined). The uncompressed size varies by layers and versions. Replace the layer name and version number in the following example with those used by your applications:

```
aws lambda get-layer-version \
  --layer-name arn:aws:lambda:us-east-1:464622532012:layer:Datadog-{{< latest-lambda-layer-version layer="node-example-version" >}} \
  --version-number {{< latest-lambda-layer-version layer="node" >}}

aws lambda get-layer-version \
  --layer-name arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Extension \
  --version-number {{< latest-lambda-layer-version layer="extension" >}}
```

In addition to the Datadog Lambda layers, also inspect other Lambda layers added (or to be added) to your functions. If you use the [Serverless Framework][4], you can find the CloudFormation template from the hidden `.serverless` folder after running the `deploy` or `package` command, and the list of Lambda layers from the `Layers` section.

## Package

The function deployment package can contain large files or code that you don't need. If you use the Serverless Framework, you can find the generated deployment package (`.zip` file) in the hidden `.serverless` folder after running the `deploy` or `package` command.

If the sum of the size of the deployment package and layers doesn't exceed the limit, contact AWS Support for investigation. If the total size does exceed the limit, inspect the deployment package and exclude large files that you don't need in runtime using the [package][5] option.

## Dependencies

The Datadog Lambda layer packages the instrumentation libraries and makes them available to use in the Lambda execution environment, so you do _not_ need to specify `datadog-lambda-js` and `dd-trace` as dependencies in your `package.json`. If you do need the Datadog libraries for local build or tests, specify them as `devDependencies` so that they are excluded from the deployment package. Similarly, `serverless-plugin-datadog` is needed only for development, and should be specified under `devDependencies`.

Also inspect other dependencies (the `node_modules` folder) that are included into your deployment package and only keep the ones that you need in `dependencies`.

## Bundlers

Using a bundler like [Webpack][6] or [esbuild][7] can dramatically reduce your deployment package size by only including the code that is used. See [Node.js Lambda Tracing and Bundlers Compatibility][8] for required webpack configurations.

## Datadog-ci

Depending on your use case, you may find it easier to use the `datadog-ci lambda instrument` command to work around issues with package sizes. The `datadog-ci lambda instrument` command configures the same instrumentation as serverless-plugin-datadog. For more information, see the [datadog-ci repo][9].

## Get help

If you need the Datadog support team to help investigate, include the following information in your ticket:

1. The function's configured Lambda layers (name and version, or ARNs).
2. The function's deployment package (or a screenshot showing the content and size of the uncompressed package) to be uploaded to AWS.
3. The project configuration files, with **redacted hardcoded secrets**: `serverless.yaml`, `package.json`, `package-lock.json`, `yarn.lock`, `tsconfig.json` and `webpack.config.json`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-package.html#gettingstarted-package-zip
[2]: https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-package.html#gettingstarted-package-layers
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/lambda/get-layer-version.html
[4]: https://www.serverless.com/
[5]: https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml/#package
[6]: https://webpack.js.org
[7]: https://esbuild.github.io/
[8]: /serverless/guide/serverless_tracing_and_bundlers/
[9]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/lambda#readme
