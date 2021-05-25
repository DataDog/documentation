---
dependencies:
- https://github.com/DataDog/datadog-lambda-js/blob/master/README.md
kind: documentation
title: Datadog Lambda Library for Node.js
---
![build][1]
[![Code Coverage][2]](https://codecov.io/gh/DataDog/datadog-lambda-js)
[![NPM][3]](https://www.npmjs.com/package/datadog-lambda-js)
[![Slack][4]][15]
[![License][5]](https://github.com/DataDog/datadog-lambda-js/blob/main/LICENSE)

Datadog Lambda Library for Node.js enables enhanced Lambda metrics, distributed tracing, and custom metric submission from AWS Lambda functions.

## Installation

Follow the [installation instructions][6], and view your function's enhanced metrics, traces and logs in Datadog.

## Custom Metrics

Once [installed](#installation), you should be able to submit custom metrics from your Lambda function.

Check out the instructions for [submitting custom metrics from AWS Lambda functions][7].

## Tracing

Once [installed](#installation), you should be able to view your function's traces in Datadog.

For additional details on trace collection, take a look at [collecting traces from AWS Lambda functions][8].

For additional details on trace and log connection, check out the [official documentation for Datadog trace client][9].

The `fs` module is disabled by default. If you want to enable it you have to set the environment variable `DD_TRACE_DISABLED_PLUGINS` to `''` or to a comma-separated list of the plugins you want to disable. See the full list of supported plugins [here][10].

### Trace & Log Correlation

By default, the Datadog trace id gets automatically injected into the logs for correlation, if using `console` or a logging library supported for automatic trace id injection. You have to manually inject the trace id, if using other logging libraries. See additional details on [connecting logs and traces][11].

Set the environment variable `DD_LOGS_INJECTION` to `false` to disable this feature.

## Custom logger

You can use your own logger to log layer error and debug logs instead of default `console`
usage.

For example, using the [Pino][12] logger:

```typescript
const { datadog } = require("datadog-lambda-js");
const logger = require("pino")();

// convert message string to object metadata and message
const messageToObject = (stringMessage) => {
  const { message, status, ...metadata } = JSON.parse(stringMessage);

  return [metadata, message];
};

async function myHandler(event, context) {
  // ...
}

// Use your own logger
module.exports.myHandler = datadog(myHandler, {
  logger: {
    debug: (message) => logger.debug(...messageToObject(message)),
    error: (message) => logger.error(...messageToObject(message)),
  },
});
```

## Environment Variables

### DD_FLUSH_TO_LOG

Set to `true` (recommended) to send custom metrics asynchronously (with no added latency to your Lambda function executions) through CloudWatch Logs with the help of [Datadog Forwarder][13]. Defaults to `false`. If set to `false`, you also need to set `DD_API_KEY` and `DD_SITE`.

### DD_API_KEY

If `DD_FLUSH_TO_LOG` is set to `false` (not recommended), the Datadog API Key must be defined by setting one of the following environment variables:

- DD_API_KEY - the Datadog API Key in plain-text, NOT recommended
- DD_KMS_API_KEY - the KMS-encrypted API Key, requires the `kms:Decrypt` permission

### DD_SITE

If `DD_FLUSH_TO_LOG` is set to `false` (not recommended), and your data need to be sent to the Datadog EU site, you must set `DD_SITE` to `datadoghq.eu`. Defaults to `datadoghq.com`.

### DD_LOG_LEVEL

Set to `debug` enable debug logs from the Datadog Lambda Library. Defaults to `info`.

### DD_ENHANCED_METRICS

Generate enhanced Datadog Lambda integration metrics, such as, `aws.lambda.enhanced.invocations` and `aws.lambda.enhanced.errors`. Defaults to `true`.

### DD_LAMBDA_HANDLER

Location of your original Lambda handler.

### DD_TRACE_ENABLED

Initialize the Datadog tracer when set to `true`. Defaults to `false`.

### DD_LOGS_INJECTION

Inject Datadog trace id into logs for correlation. Defaults to `true`.

### DD_MERGE_XRAY_TRACES

Set to `true` to merge the X-Ray trace and the Datadog trace, when using both the X-Ray and Datadog tracing. Defaults to `false`.

## Opening Issues

If you encounter a bug with this package, we want to hear about it. Before opening a new issue, search the existing issues to avoid duplicates.

When opening an issue, include the Datadog Lambda Layer version, Node version, and stack trace if available. In addition, include the steps to reproduce when appropriate.

You can also open an issue for a feature request.

## Contributing

If you find an issue with this package and have a fix, please feel free to open a pull request following the [procedures][14].

## Community

For product feedback and questions, join the `#serverless` channel in the [Datadog community on Slack][15].

## License

Unless explicitly stated otherwise all files in this repository are licensed under the Apache License Version 2.0.

This product includes software developed at Datadog (https://www.datadoghq.com/). Copyright 2019 Datadog, Inc.
[1]: https://github.com/DataDog/datadog-lambda-js/workflows/build/badge.svg
[2]: https://img.shields.io/codecov/c/github/DataDog/datadog-lambda-js
[3]: https://img.shields.io/npm/v/datadog-lambda-js
[4]: https://chat.datadoghq.com/badge.svg?bg=632CA6
[5]: https://img.shields.io/badge/license-Apache--2.0-blue
[6]: https://docs.datadoghq.com/serverless/installation/nodejs/
[7]: https://docs.datadoghq.com/integrations/amazon_lambda/?tab=nodejs#custom-metrics
[8]: https://docs.datadoghq.com/integrations/amazon_lambda/?tab=nodejs#trace-collection
[9]: https://datadoghq.dev/dd-trace-js/
[10]: https://docs.datadoghq.com/tracing/compatibility_requirements/nodejs/
[11]: https://docs.datadoghq.com/tracing/connect_logs_and_traces/nodejs/
[12]: https://getpino.io/
[13]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring
[14]: https://github.com/DataDog/dd-lambda-js/blob/main/CONTRIBUTING.md
[15]: https://chat.datadoghq.com/
