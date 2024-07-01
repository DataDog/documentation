---
aliases:
- /serverless/serverless_integrations/plugin
dependencies:
- "https://github.com/DataDog/serverless-plugin-datadog/blob/main/README.md"
kind: documentation
title: Datadog Serverless Framework Plugin
---
![build](https://github.com/DataDog/serverless-plugin-datadog/workflows/build/badge.svg)
[![Code Coverage](https://img.shields.io/codecov/c/github/DataDog/serverless-plugin-datadog)](https://codecov.io/gh/DataDog/serverless-plugin-datadog)
[![NPM](https://img.shields.io/npm/v/serverless-plugin-datadog)](https://www.npmjs.com/package/serverless-plugin-datadog)
[![Slack](https://chat.datadoghq.com/badge.svg?bg=632CA6)](https://chat.datadoghq.com/)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue)](https://github.com/DataDog/serverless-plugin-datadog/blob/master/LICENSE)

Datadog recommends the Serverless Framework Plugin for developers using the Serverless Framework to deploy their serverless applications.
The plugin automatically enables instrumentation for applications to collect metrics, traces, and logs by:

- Installing the Datadog Lambda library to your Lambda functions as a Lambda layer.
- Installing the Datadog Lambda Extension to your Lambda functions as a Lambda layer (`addExtension`) or subscribing the Datadog Forwarder to your Lambda functions' log groups (`forwarderArn`).
- Making the required configuration changes, such as adding environment variables or additional tracing layers, to your Lambda functions.

## Getting started

To quickly get started, follow the installation instructions for [Python][1], [Node.js][2], [Ruby][3], [Java][4], [Go][5], or [.NET][6] and view your function's enhanced metrics, traces, and logs in Datadog.

After installation is complete, configure the [advanced options](https://docs.datadoghq.com/serverless/configuration) to suit your monitoring needs.

## Upgrade

Each version of the plugin is published with a [specific set of versions of the Datadog Lambda layers][15]. To pick up new features and bug fixes provided by the latest versions of Datadog Lambda layers, upgrade the serverless framework plugin. Test the new version before applying it on your production applications.

## Configuration parameters

To further configure your plugin, use the following custom parameters in your `serverless.yml`:

| Parameter                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ----------------------------- |------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `site`                        | Set which Datadog site to send data to, such as `datadoghq.com` (default), `datadoghq.eu`, `us3.datadoghq.com`, `us5.datadoghq.com`, `ap1.datadoghq.com`, or `ddog-gov.com`. This parameter is required when collecting telemetry using the Datadog Lambda Extension.                                                                                                                                                        |
| `apiKey`                      | [Datadog API key][7]. This parameter is required when collecting telemetry using the Datadog Lambda Extension. Alternatively, you can also set the `DATADOG_API_KEY` environment variable in your deployment environment.                                                                                                                                                                                                    |
| `appKey`                      | Datadog app key. Only needed when the `monitors` field is defined. Alternatively, you can also set the `DATADOG_APP_KEY` environment variable in your deployment environment.                                                                                                                                                                                                                                                |
| `apiKeySecretArn`             | An alternative to using the `apiKey` field. The ARN of the secret that is storing the Datadog API key in AWS Secrets Manager. Remember to add the `secretsmanager:GetSecretValue` permission to the Lambda execution role.                                                                                                                                                                                                   |
| `apiKMSKey`                   | An alternative to using the `apiKey` field. Datadog API key encrypted using KMS. Remember to add the `kms:Decrypt` permission to the Lambda execution role.                                                                                                                                                                                                                                                                  |
| `env`                         | When set along with `addExtension`, a `DD_ENV` environment variable is added to all Lambda functions with the provided value. Otherwise, an `env` tag is added to all Lambda functions with the provided value. Defaults to the `stage` value of the serverless deployment.                                                                                                                                                  |
| `service`                     | When set along with `addExtension`, a `DD_SERVICE` environment variable is added to all Lambda functions with the provided value. Otherwise, a `service` tag is added to all Lambda functions with the provided value. Defaults to the `service` value of the serverless project.
| `version`                     | When set along with `addExtension`, a `DD_VERSION` environment variable is added to all Lambda functions with the provided value. When set along with `forwarderArn`, a `version` tag is added to all Lambda functions with the provided value.                                                                                                                                                                              |
| `tags`                        | A comma separated list of `key`:`value` pairs as a single string. When set along with `extensionLayerVersion`, a `DD_TAGS` environment variable is added to all Lambda functions with the provided value. When set along with `forwarderArn`, the plugin parses the string and sets each `key`:`value` pair as a tag on all Lambda functions.                                                                                |
| `enableXrayTracing`           | Set `true` to enable X-Ray tracing on the Lambda functions and API Gateway integrations. Defaults to `false`.                                                                                                                                                                                                                                                                                                                |
| `enableDDTracing`             | Enable Datadog tracing on the Lambda function. Defaults to `true`.                                                                                                                                                                                                                                                                                                                                                           |
| `enableASM`                   | Enable [Datadog Application Security Management (ASM)][19] on the Lambda function. Requires the Datadog extension to be present (using `addExtension` or manually added) and `enableDDTracing`. Defaults to `false`.                                                                                                                                                                                                                                                                                                                                                          |
| `enableDDLogs`                | Enable Datadog log collection using the Lambda Extension. Defaults to `true`. Note: This setting has no effect on logs sent by the Datadog Forwarder.                                                                                                                                                                                                                                                                        |
| `monitors`                    | When defined, the Datadog plugin configures monitors for the deployed function. Requires setting `DATADOG_API_KEY` and `DATADOG_APP_KEY` in your environment. To learn how to define monitors, see [To Enable and Configure a Recommended Serverless Monitor](#to-enable-and-configure-a-recommended-serverless-monitor).                                                                                                    |
| `captureLambdaPayload`        | [Captures incoming and outgoing AWS Lambda payloads][17] in the Datadog APM spans for Lambda invocations. Defaults to `false`.                                                                                                                                                                                                                                                                                               |
| `enableSourceCodeIntegration` | Enable [Datadog Source Code Integration][18] for the function. Defaults to `true`.                                                                                                                                                                                                                                                                                                                                           |
| `uploadGitMetadata`           | Enable Git metadata uploading for the function, as a part of source code integration. Set this to false if you have the Datadog Github Integration installed, as it renders Git metadata uploading unnecessary. Defaults to `true`.                                                                                                                                                                                          |
| `subscribeToAccessLogs`       | Enable automatic subscription of the Datadog Forwarder to API Gateway access log groups. Requires setting `forwarderArn`. Defaults to `true`.                                                                                                                                                                                                                                                                                |
| `subscribeToExecutionLogs`    | Enable automatic subscription of the Datadog Forwarder to HTTP API  and Websocket log groups. Requires setting `forwarderArn`. Defaults to `true`.                                                                                                                                                                                                                                                                           |
| `forwarderArn`                | The ARN of the Datadog Forwarder to be subscribed to the Lambda or API Gateway log groups.                                                                                                                                                                                                                                                                                                                                   |
| `addLayers`                   | Whether to install the Datadog Lambda library as a layer. Defaults to `true`. Set to `false` when you plan to package the Datadog Lambda library to your function's deployment package on your own so that you can install a specific version of the Datadog Lambda library ([Python][8] or [Node.js][9]).                                                                                                                   |
| `addExtension`                | Whether to install the Datadog Lambda Extension as a layer. Defaults to `true`. When enabled, it's required to set the `apiKey` and `site`.                                                                                                                                                                                                                                                                                  |
| `exclude`                     | When set, this plugin ignores all specified functions. Use this parameter if you have any functions that should not include Datadog functionality. Defaults to `[]`.                                                                                                                                                                                                                                                         |
| `enabled`                     | When set to `false`, the Datadog plugin stays inactive. Defaults to `true`. You can control this option using an environment variable. For example, use `enabled: ${strToBool(${env:DD_PLUGIN_ENABLED, true})}` to activate/deactivate the plugin during deployment. Alternatively, you can also use the value passed in through `--stage` to control this option—[see example](#disable-plugin-for-particular-environment). |
| `customHandler`               | When set, the specified handler is set as the handler for all the functions.                                                                                                                                                                                                                                                                                                                                                 |
| `failOnError`                 | When set, this plugin throws an error if any custom Datadog monitors fail to create or update. This occurs after deploy, but will cause the result of `serverless deploy` to return a nonzero exit code (to fail user CI). Defaults to `false`.                                                                                                                                                                              |
| `logLevel`                    | The log level, set to `DEBUG` for extended logging.                                                                                                                                                                                                                                                                                                                                                                          |
| `skipCloudformationOutputs`   | Set to `true` if you want to skip adding Datadog Cloudformation Outputs for your stack. This is useful if you are running into the 200 output limit which can cause the stack creation to fail.                                                                                                                                                                                                                              |
| `enableColdStartTracing`      | Set to `false` to disable Cold Start Tracing. Used in NodeJS and Python. Defaults to `true`.                                                                                                                                                                                                                                                                                                                                 |
| `coldStartTraceMinDuration`   | Sets the minimum duration (in milliseconds) for a module load event to be traced via Cold Start Tracing. Number. Defaults to `3`.                                                                                                                                                                                                                                                                                            |
| `coldStartTraceSkipLibs`      | optionally skip creating Cold Start Spans for a comma-separated list of libraries. Useful to limit depth or skip known libraries. Default depends on runtime.                                                                                                                                                                                                                                                                |
| `subdomain`                   | Set an optional subdomain to use for app URLs which are printed to output. Defaults to `app`.                                                                                                                                                                                                                                                                                                                                |
| `enableProfiling`             | Enable the Datadog Continuous Profiler with `true`. Supported in Beta for NodeJS and Python. Defaults to `false`.                                                                                                                                                                                                                                                                                                            |
| `encodeAuthorizerContext`     | When set to `true` for Lambda authorizers, the tracing context will be encoded into the response for propagation. Supported for NodeJS and Python. Defaults to `true`.                                                                                                                                                                                                                                                       |
| `decodeAuthorizerContext`     | When set to `true` for Lambdas that are authorized via Lambda authorizers, it will parse and use the encoded tracing context (if found). Supported for NodeJS and Python. Defaults to `true`.                                                                                                                                                                                                                                |
| `apmFlushDeadline`            | Used to determine when to submit spans before a timeout occurs, in milliseconds. When the remaining time in an AWS Lambda invocation is less than the value set, the tracer attempts to submit the current active spans and all finished spans. Supported for NodeJS and Python. Defaults to `100` milliseconds.                                                                                                             |
| `enableStepFunctionsTracing`    | Enable automatic subscription of the Datadog Forwarder to Step Function log groups and Step Functions tracing. If no Step Function log groups are configured, then they are automatically created. Requires setting `forwarderArn`. Defaults to `false`.                                                                                                                                                                  |
| `propagateUpstreamTrace` | When set to `true`, downstream Stepfunction invocation traces merge with upstream Stepfunction invocations. Defaults to `false`. |
| `redirectHandlers`    | Optionally disable handler redirection if set to `false`. This should only be set to `false` when APM is fully disabled. Defaults to `true`.                                                                                                                                                                  |
To use any of these parameters, add a `custom` > `datadog` section to your `serverless.yml` similar to this example:

```yaml
custom:
  datadog:
    apiKeySecretArn: "{Datadog_API_Key_Secret_ARN}"
    enableXrayTracing: false
    enableDDTracing: true
    enableDDLogs: true
    subscribeToAccessLogs: true
    forwarderArn: arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder
    exclude:
      - dd-excluded-function
```

### Webpack

If you are using a bundler, such as webpack, see [Serverless Tracing and Webpack](https://docs.datadoghq.com/serverless/guide/serverless_tracing_and_webpack/).

### TypeScript

You may encounter the error of missing type definitions. To resolve the error, add `datadog-lambda-js` and `dd-trace` to the `devDependencies` list of your project's package.json.

If you are using serverless-typescript, make sure that `serverless-datadog` is above the `serverless-typescript` entry in your `serverless.yml`. The plugin will automatically detect `.ts` files.

```yaml
plugins:
  - serverless-plugin-datadog
  - serverless-typescript
```

### Disable Plugin for Particular Environment

If you'd like to turn off the plugin based on the environment (passed via `--stage`), you can use something similar to the example below.

```yaml
provider:
  stage: ${self:opt.stage, 'dev'}

custom:
  staged: ${self:custom.stageVars.${self:provider.stage}, {}}

  stageVars:
    dev:
      dd_enabled: false

  datadog:
    enabled: ${self:custom.staged.dd_enabled, true}
```

### Serverless Monitors

There are seven recommended monitors with default values pre-configured.

|       Monitor        |                                         Metrics                                          | Threshold  | Serverless Monitor ID  |
| :------------------: | :--------------------------------------------------------------------------------------: | :--------: | :--------------------: |
|   High Error Rate    |                       `aws.lambda.errors`/`aws.lambda.invocations`                       |   >= 10%   |   `high_error_rate`    |
|       Timeout        |                      `aws.lambda.duration.max`/`aws.lambda.timeout`                      |    >= 1    |       `timeout`        |
|    Out of Memory     |                           `aws.lambda.enhanced.out_of_memory`                            |    > 0     |    `out_of_memory`     |
|  High Iterator Age   |                            `aws.lambda.iterator_age.maximum`                             | >= 24 hrs  |  `high_iterator_age`   |
| High Cold Start Rate | `aws.lambda.enhanced.invocations(cold_start:true)`/<br>`aws.lambda.enhanced.invocations` |   >= 20%   | `high_cold_start_rate` |
|    High Throttles    |                     `aws.lambda.throttles`/`aws.lambda.invocations`                      |   >= 20%   |    `high_throttles`    |
|    Increased Cost    |                           `aws.lambda.enhanced.estimated_cost`                           | &#8593;20% |    `increased_cost`    |

#### To Enable and Configure a Recommended Serverless Monitor

To create a recommended monitor, you must use its respective serverless monitor ID. Note that you must also set the `DATADOG_API_KEY` and `DATADOG_APP_KEY` in your environment.

If you’d like to further configure the parameters for a recommended monitor, you can directly define the parameter values below the serverless monitor ID. Parameters not specified under a recommended monitor will use the default recommended value. The `query` parameter for recommended monitors cannot be directly modified and will default to using the `query` valued as defined above; however, you may change the threshold value in `query` by re-defining it within the `options` parameter. To delete a monitor, remove the monitor from the `serverless.yml` template. For further documentation on how to define monitor parameters, see the [Datadog Monitors API](https://docs.datadoghq.com/api/latest/monitors/#create-a-monitor).

Monitor creation occurs after the function is deployed. In the event that a monitor is unsuccessfully created, the function will still be successfully deployed.

##### To create a recommended monitor with the default values

Define the appropriate serverless monitor ID without specifying any parameter values

```yaml
custom:
  datadog:
    addLayers: true
    monitors:
      - high_error_rate:
```

##### To configure a recommended monitor

```yaml
custom:
  datadog:
    addLayers: true
    monitors:
      - high_error_rate:
          name: "High Error Rate with Modified Warning Threshold"
          message: "More than 10% of the function’s invocations were errors in the selected time range. Notify @data.dog@datadoghq.com @slack-serverless-monitors"
          tags: ["modified_error_rate", "serverless", "error_rate"]
          require_full_window: true
          priority: 2
          options:
            include_tags: true
            notify_audit: true
            thresholds:
              ok: 0.025
              warning: 0.05
              critical: 0.1
```

##### To delete a monitor

Removing the serverless monitor ID and its parameters will delete the monitor.

#### To Enable and Configure a Custom Monitor

To define a custom monitor, you must define a unique serverless monitor ID string in addition to passing in the API key and Application key, `DATADOG_API_KEY` and `DATADOG_APP_KEY`, in your environment. The `query` parameter is required but every other parameter is optional. Define a unique serverless monitor ID string and specify the necessary parameters below. For further documentation on monitor parameters, see the [Datadog Monitors API](https://docs.datadoghq.com/api/latest/monitors/#create-a-monitor).

```yaml
custom:
  datadog:
    addLayers: true
    monitors:
      - custom_monitor_id:
          name: "Custom Monitor"
          query: "max(next_1w):forecast(avg:system.load.1{*}, 'linear', 1, interval='60m', history='1w', model='default') >= 3"
          message: "Custom message for custom monitor. Notify @data.dog@datadoghq.com @slack-serverless-monitors"
          tags: ["custom_monitor", "serverless"]
          priority: 3
          options:
            enable_logs_sample: true
            require_full_window: true
            include_tags: false
            notify_audit: true
            notify_no_data: false
            thresholds:
              ok: 1
              warning: 2
              critical: 3
```

## Breaking Changes

[**v5.0.0**](https://github.com/DataDog/serverless-plugin-datadog/releases/tag/v5.0.0)

- When used in conjunction with the Datadog Extension, this plugin sets `service` and `env` tags through environment variables instead of Lambda resource tags.
- The `enableTags` parameter was replaced by the new `service`, `env` parameters.

[**v4.0.0**](https://github.com/DataDog/serverless-plugin-datadog/releases/tag/v4.0.0)

- The Datadog Lambda Extension is now the default mechanism for transmitting telemetry to Datadog.

## Working with serverless-plugin-warmup
This library is compatible at best effort with [serverless-plugin-warmup](https://github.com/juanjoDiaz/serverless-plugin-warmup). If you want to exclude the warmer function from Datadog, use the `exclude` feature of this library.

To properly package your application, this plugin *must* be listed _after_ `serverless-plugin-warmup` in your `serverless.yml` file:
```yaml
plugins:
  - serverless-plugin-warmup
  - serverless-plugin-datadog
```

## Opening Issues

If you encounter a bug with this package, let us know by filing an issue! Before opening a new issue, please search the existing issues to avoid duplicates.

When opening an issue, include your Serverless Framework version, Python/Node.js version, and stack trace if available. Also, please include the steps to reproduce when appropriate.

You can also open an issue for a feature request.

## Contributing

If you find an issue with this package and have a fix, open a pull request following the [procedures][14].

## Community

For product feedback and questions, join the `#serverless` channel in the [Datadog community on Slack](https://chat.datadoghq.com/).

## License

Unless explicitly stated otherwise, all files in this repository are licensed under the Apache License Version 2.0.

This product includes software developed at Datadog (<https://www.datadoghq.com/>). Copyright 2021 Datadog, Inc.

[1]: https://docs.datadoghq.com/serverless/installation/python/?tab=serverlessframework
[2]: https://docs.datadoghq.com/serverless/installation/nodejs/?tab=serverlessframework
[3]: https://docs.datadoghq.com/serverless/installation/ruby/?tab=serverlessframework
[4]: https://docs.datadoghq.com/serverless/installation/java/?tab=serverlessframework
[5]: https://docs.datadoghq.com/serverless/installation/go/?tab=serverlessframework
[6]: https://docs.datadoghq.com/serverless/installation/dotnet/?tab=serverlessframework
[7]: https://docs.datadoghq.com/account_management/api-app-keys/#api-keys
[8]: https://pypi.org/project/datadog-lambda/
[9]: https://www.npmjs.com/package/datadog-lambda-js
[10]: https://webpack.js.org/configuration/externals/
[11]: https://docs.datadoghq.com/serverless/forwarder/
[12]: https://docs.datadoghq.com/serverless/datadog_lambda_library/extension/
[13]: https://docs.aws.amazon.com/lambda/latest/dg/using-extensions.html
[14]: https://github.com/DataDog/serverless-plugin-datadog/blob/master/CONTRIBUTING.md
[15]: https://github.com/DataDog/serverless-plugin-datadog/blob/master/src/layers.json
[16]: https://docs.datadoghq.com/tracing/setup_overview/configure_data_security/?tab=mongodb#replace-rules-for-tag-filtering
[17]: https://www.datadoghq.com/blog/troubleshoot-lambda-function-request-response-payloads/
[18]: https://docs.datadoghq.com/integrations/guide/source-code-integration
[19]: https://docs.datadoghq.com/security/application_security/
