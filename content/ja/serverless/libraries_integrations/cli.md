---
aliases:
- /serverless/datadog_lambda_library/
- /serverless/serverless_integrations/cli/
dependencies:
- "https://github.com/DataDog/datadog-ci/blob/master/src/commands/lambda/README.md"
kind: documentation
title: Datadog Serverless CLI
---
You can use the CLI to instrument your AWS Lambda functions with Datadog. The CLI enables instrumentation by modifying existing Lambda functions' configuration and hence does *not* require redeployment. It is the quickest way to get started with Datadog serverless monitoring.

You can also add the command to your CI/CD pipelines to enable instrumentation for *all* your serverless applications. Run the command *after* your normal serverless application deployment, so that changes made by the Datadog CLI command do not get overridden.

## Installation

To instrument your Lambda functions using the `datadog-ci lambda instrument` command, follow the instructions for a specific runtime listed below:

- [.NET](https://docs.datadoghq.com/serverless/installation/dotnet/?tab=datadogcli)
- [Go](https://docs.datadoghq.com/serverless/installation/go/?tab=datadogcli)
- [Java](https://docs.datadoghq.com/serverless/installation/java/?tab=datadogcli)
- [Node.js](https://docs.datadoghq.com/serverless/installation/nodejs/?tab=datadogcli)
- [Python](https://docs.datadoghq.com/serverless/installation/python/?tab=datadogcli)
- [Ruby](https://docs.datadoghq.com/serverless/installation/ruby/?tab=datadogcli)

## Commands

### `instrument`

Run `datadog-ci lambda instrument` to apply Datadog instrumentation to a Lambda. This command adds the Datadog Lambda Library and/or the Datadog Lambda Extension as Lambda Layers to the instrumented Lambda functions and modifies their configurations.

```bash

datadog-ci lambda instrument -f <function-name> -f <another-function-name> -r us-east-1 -v 81 -e 49

# Instrument multiple functions specified by full ARNs
datadog-ci lambda instrument -f <lambda-arn> -f <another-lambda-arn> -f <a-third-lambda-arn> -v 81 -e 49

# Instrument function(s) in interactive mode
datadog-ci lambda instrument -i

# Instrument multiple functions that match a regex pattern
datadog-ci lambda instrument --functions-regex <valid-regex-pattern> -r us-east-1 -v 81 -e 49

# Dry run of all updates
datadog-ci lambda instrument -f <function-name> -f <another-function-name> -r us-east-1 -v 81 -e 49 --dry-run
```

### `uninstrument`

Run `datadog-ci lambda uninstrument` to revert Datadog instrumentation in a Lambda. This command automatically removes the Datadog configuration, such as the Datadog Lambda Library and the Datadog Lambda Extension layers, as well as other configurations applied by the datadog-ci.

```bash
# Uninstrument multiple functions specified by names
datadog-ci lambda uninstrument -f <function-name> -f <another-function-name> -r us-east-1

# Uninstrument function(s) in interactive mode
datadog-ci lambda uninstrument -i

# Uninstrument multiple functions that match a regex pattern
datadog-ci lambda uninstrument --functions-regex <valid-regex-pattern> -r us-east-1

# Dry run of all updates
datadog-ci lambda uninstrument -f <function-name> -f <another-function-name> -r us-east-1 --dry-run
```

See the configuration section for additional settings.

## Configuration

### AWS Credentials

You must have valid [AWS credentials][1] configured with access to the Lambda and CloudWatch services where you are running any `datadog-ci lambda` command.

### Environment variables

You must expose these environment variables in the environment where you are running `datadog-ci lambda instrument`:

| Environment Variable         | Description                                                                                                                                                                                                                                                                                                                                          | Example                                                            |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `DATADOG_API_KEY`            | Datadog API Key. Sets the `DD_API_KEY` environment variable on your Lambda function configuration. For more information about getting a Datadog API key, see the [API key documentation][5].                                                                                                                                                         | `export DATADOG_API_KEY=<API_KEY>`                                 |
| `DATADOG_API_KEY_SECRET_ARN` | The ARN of the secret storing the Datadog API key in AWS Secrets Manager. Sets the `DD_API_KEY_SECRET_ARN` on your Lambda function configuration. Notes: `DD_API_KEY_SECRET_ARN` is ignored when `DD_KMS_API_KEY` is set. Add the `secretsmanager:GetSecretValue` permission to the Lambda execution role.                                           | `export DATADOG_API_KEY_SECRET_ARN=<SECRETS_MANAGER_RESOURCE_ARN>` |
| `DATADOG_KMS_API_KEY`        | Datadog API Key encrypted using KMS. Sets the `DD_KMS_API_KEY` environment variable on your Lambda function configuration. Note: `DD_API_KEY` is ignored when `DD_KMS_API_KEY` is set.                                                                                                                                                               | `export DATADOG_KMS_API_KEY=<KMS_ENCRYPTED_API_KEY>`               |
| `DATADOG_SITE`               | Set which Datadog site to send data. Only needed when using the Datadog Lambda Extension. Possible values are  `datadoghq.com` , `datadoghq.eu` , `us3.datadoghq.com`, `us5.datadoghq.com`, `ap1.datadoghq.com`, and `ddog-gov.com`. The default is `datadoghq.com`. Sets the `DD_SITE` environment variable on your Lambda function configurations. | `export DATADOG_SITE="datadoghq.com"`                              |


### Arguments

Configuration can be done using command-line arguments or a JSON configuration file (see the next section).

#### `instrument`
You can pass the following arguments to `instrument` to specify its behavior. These arguments will override the values set in the configuration file, if any.

| Argument                       | Shorthand | Description                                                                                                                                                                                                                                                                                                                                   | Default |
| ------------------------------ | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `--function`                   | `-f`      | The ARN of the Lambda function to be **instrumented**, or the name of the Lambda function (`--region` must be defined).                                                                                                                                                                                                                       |         |
| `--functions-regex`            |           | A regex pattern to match with the Lambda function name.                                                                                                                                                                                                                                                                                       |         |
| `--interactive`                | `-i`      | Allows the user to interactively choose how their function gets instrumented. There is no need to provide any other flags if you choose to use interactive mode since you will be prompted for the information instead.                                                                                                                       |         |
| `--region`                     | `-r`      | Default region to use, when `--function` is specified by the function name instead of the ARN.                                                                                                                                                                                                                                                |         |
| `--service`                    |           | Use `--service` to group related functions belonging to similar workloads. Learn more about the `service` tag [here][8].                                                                                                                                                                                                                      |         |
| `--version`                    |           | Add the `--version` tag to correlate spikes in latency, load or errors to new versions. Learn more about the `version` tag [here][7].                                                                                                                                                                                                         |         |
| `--env`                        |           | Use `--env` to separate out your staging, development, and production environments. Learn more about the `env` tag [here][6].                                                                                                                                                                                                                 |         |
| `--extra-tags`                 |           | Add custom tags to your Lambda function in Datadog. Must be a list of `<key>:<value>` separated by commas such as: `layer:api,team:intake`.                                                                                                                                                                                                   |         |
| `--profile`                    |           | Specify the AWS named profile credentials to use to instrument. Learn more about AWS named profiles [here][11].                                                                                                                                                                                                                               |         |
| `--layer-version`              | `-v`      | Version of the Datadog Lambda Library layer to apply. This varies between runtimes. To see the latest layer version check the [JS][2] or [python][3] datadog-lambda-layer repo release notes.                                                                                                                                                 |         |
| `--extension-version`          | `-e`      | Version of the Datadog Lambda Extension layer to apply. When `extension-version` is set, make sure to export `DATADOG_API_KEY` (or if encrypted, `DATADOG_KMS_API_KEY` or `DATADOG_API_KEY_SECRET_ARN`) in your environment as well. While using `extension-version`, leave out `forwarder`. Learn more about the Lambda Extension [here][4]. |         |
| `--tracing`                    |           | Whether to enable dd-trace tracing on your Lambda.                                                                                                                                                                                                                                                                                            | `true`  |
| `--merge-xray-traces`          |           | Whether to join dd-trace traces to AWS X-Ray traces. Useful for tracing API Gateway spans.                                                                                                                                                                                                                                                    | `false` |
| `--flush-metrics-to-logs`      |           | Whether to send metrics via the Datadog Forwarder [asynchronously][10]. If you disable this parameter, it's required to export `DATADOG_API_KEY` (or if encrypted, `DATADOG_KMS_API_KEY` or `DATADOG_API_KEY_SECRET_ARN`).                                                                                                                    | `true`  |
| `--capture-lambda-payload`     |           | Whether to capture and store the payload and response of a lambda invocation.                                                                                                                                                                                                                                                                 | `false` |
| `--forwarder`                  |           | The ARN of the [datadog forwarder][9] to attach this function's LogGroup to.                                                                                                                                                                                                                                                                  |         |
| `--dry-run`                    | `-d`      | Preview changes running command would apply.                                                                                                                                                                                                                                                                                                  | `false` |
| `--log-level`                  |           | Set to `debug` to see additional output from the Datadog Lambda Library and/or Lambda Extension for troubleshooting purposes.                                                                                                                                                                                                                 |         |
| `--source-code-integration`    | `-s`      | Whether to enable [Datadog Source Code Integration][12]. This will tag your lambda(s) with the Git repository URL and the latest commit hash of the current local directory. **Note**: Git repository must not be ahead of remote, and must not be dirty.                                                                                     | `true`  |
| `--no-source-code-integration` |           | Disables Datadog Source Code Integration.                                                                                                                                                                                                                                                                                                     |         |
| `--upload-git-metadata`        | `-u`      | Whether to enable Git metadata uploading, as a part of source code integration. Git metadata uploading is only required if you don't have the Datadog Github Integration installed.                                                                                                                                                           | `true`  |
| `--no-upload-git-metadata`     |           | Disables Git metadata uploading, as a part of source code integration. Use this flag if you have the Datadog Github Integration installed, as it renders Git metadata uploading unnecessary.                                                                                                                                                  |         |
| `--apm-flush-deadline`         |           | Used to determine when to submit spans before a timeout occurs, in milliseconds. When the remaining time in an AWS Lambda invocation is less than the value set, the tracer attempts to submit the current active spans and all finished spans. Supported for NodeJS and Python. Defaults to `100` milliseconds.                              |         |
<br />

#### `uninstrument`
The following arguments are passed to `uninstrument` to specify its behavior. These arguments will override the values set in the configuration file, if any.

Any other argument stated on the `instrument` table, but not below, will be ignored, this to allow you to uninstrument quicker, if needed.

| Argument            | Shorthand | Description                                                                                                               | Default |
| ------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------- | ------- |
| `--function`        | `-f`      | The ARN of the Lambda function to be **uninstrumented**, or the name of the Lambda function (`--region` must be defined). |         |
| `--functions-regex` |           | A regex pattern to match with the Lambda function name to be **uninstrumented**.                                          |         |
| `--region`          | `-r`      | Default region to use, when `--function` is specified by the function name instead of the ARN.                            |         |
| `--profile`         |           | Specify the AWS named profile credentials to use to uninstrument. Learn more about AWS named profiles [here][11].         |         |
| `--forwarder`       |           | The ARN of the [datadog forwarder][9] to remove from this function.                                                       |         |
| `--dry-run`         | `-d`      | Preview changes running command would apply.                                                                              | `false` |

<br/>

### Configuration file

Instead of supplying arguments, you can create a configuration file in your project and simply run the `datadog-ci lambda {instrument|uninstrument} --config datadog-ci.json` command on each deployment. Specify the `datadog-ci.json` using the `--config` argument, and use this configuration file structure:

```json
{
    "lambda": {
        "layerVersion": 10,
        "extensionVersion": 8,
        "functions": ["arn:aws:lambda:us-east-1:000000000000:function:autoinstrument"],
        "region": "us-east-1",
        "tracing": true,
        "mergeXrayTraces": true,
        "captureLambdaPayload": true,
        "forwarder": "arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder",
        "logLevel": "debug",
        "service": "some-service",
        "version": "b17s47h3w1n",
        "profile": "my-credentials",
        "environment": "staging",
        "extraTags": "layer:api,team:intake"
    }
}
```

## Troubleshooting Lambda Instrumentation

To troubleshoot issues you encounter with Datadog monitoring on your Lambda functions, run the `datadog-ci lambda flare` command in the root of your project directory. This command collects important data about the Lambda function, such as environment variables and the config file. These files will be submitted to Datadog support via a ticket matching the provided Zendesk case ID.

**Note**: This command works whether or not your Lambda functions were instrumented using `datadog-ci lambda instrument`.

**Examples**
```bash
# Collect and send files to Datadog support for a single function
datadog-ci lambda flare -f <function-arn> -c <case-id> -e <email-on-case-id>

# Include recent CloudWatch logs
datadog-ci lambda flare -f <function-name> -r <AWS region> -c <case-id> -e <email-on-case-id> --with-logs

# Dry run: collect data, but don't send to Datadog support
datadog-ci lambda flare -f <function-arn> -c <case-id> -e <email-on-case-id> --with-logs --dry-run
```

**Arguments**

| Argument              | Shorthand | Description                                                                                                                           | Default |
| --------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `--function`          | `-f`      | The ARN of the Lambda function to gather data for, or the name of the Lambda function (`--region` must be defined).                   |         |
| `--region`            | `-r`      | Default region to use, when `--function` is specified by the function name instead of the ARN.                                        |         |
| `--case-id`           | `-c`      | The Datadog case ID to send the files to.                                                                                             |         |
| `--email`             | `-e`      | The email associated with the specified case ID.                                                                                      |         |
| `--with-logs`         |           | Collect recent CloudWatch logs for the specified function.                                                                            | `false` |
| `--start` and `--end` |           | Only gather logs within the time range (`--with-logs` must be included.) Both arguments are numbers in milliseconds since Unix Epoch. |         |
| `--dry-run`           | `-d`      | Preview collected data which would be sent to Datadog support.                                                                        | `false` |


## Community

For product feedback and questions, join the `#serverless` channel in the [Datadog community on Slack](https://chat.datadoghq.com/).

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://github.com/DataDog/datadog-lambda-layer-js/releases
[3]: https://github.com/DataDog/datadog-lambda-layer-python/releases
[4]: https://docs.datadoghq.com/serverless/datadog_lambda_library/extension
[5]: https://docs.datadoghq.com/account_management/api-app-keys/#api-keys
[6]: https://docs.datadoghq.com/serverless/troubleshooting/serverless_tagging/#the-env-tag
[7]: https://docs.datadoghq.com/serverless/troubleshooting/serverless_tagging/#the-version-tag
[8]: https://docs.datadoghq.com/serverless/troubleshooting/serverless_tagging/#the-service-tag
[9]: https://docs.datadoghq.com/serverless/forwarder/
[10]: https://docs.datadoghq.com/serverless/custom_metrics?tab=python#enabling-asynchronous-custom-metrics
[11]: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html#using-profiles
[12]: https://docs.datadoghq.com/integrations/guide/source-code-integration

<!--
  This page is single-sourced:
  https://github.com/DataDog/documentation/blob/7007931530baf7da59310e7224a26dc9a71c53c5/local/bin/py/build/configurations/pull_config_preview.yaml#L301
->
