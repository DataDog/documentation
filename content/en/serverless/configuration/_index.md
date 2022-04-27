---
title: Configure Serverless Monitoring
kind: documentation
further_reading:
  - link: '/serverless/installation/'
    tag: 'Documentation'
    text: 'Installing Serverless Monitoring'
  - link: '/serverless/troubleshooting/'
    tag: 'Documentation'
    text: 'Troubleshoot Serverless Monitoring'
aliases:
    - /serverless/distributed_tracing/collect_lambda_payloads
    - /serverless/libraries_integrations/lambda_code_signing
    - /serverless/guide/forwarder_extension_migration/
    - /serverless/guide/extension_private_link/
---

First, [install][1] Datadog serverless monitoring to begin collecting metrics, traces, and logs. After installation is complete, refer to the following topics to configure your installation to suit your monitoring needs.

### Metrics
- [Collect metrics from non-Lambda resources](#collect-metrics-from-non-lambda-resources)
- [Submit custom metrics](#submit-custom-metrics)

### Logs
- [Configure logs collection](#configure-logs-collection)
- [Collect logs from non-Lambda resources](#collect-logs-from-non-lambda-resources)
- [Connect logs and traces](#connect-logs-and-traces)

### APM
- [Configure trace collection](#configure-trace-collection)
- [Collect the request and response payloads](#collect-the-request-and-response-payloads)
- [Collect traces from non-Lambda resources](#collect-traces-from-non-lambda-resources)
- [Propagate trace context over AWS resources](#propagate-trace-context-over-aws-resources)
- [Merge X-Ray and Datadog traces](#merge-x-ray-and-datadog-traces)
- [Link errors to your source code](#link-errors-to-your-source-code)

### Others
- [Connect telemetry using tags](#connect-telemetry-using-tags)
- [Send telemetry over AWS PrivateLink or a proxy](#send-telemetry-over-privatelink-or-proxy)
- [Migrate to the Datadog Lambda extension](#migrate-to-the-datadog-lambda-extension)
- [Enable AWS Lambda code signing](#enable-aws-lambda-code-signing)
- [Troubleshoot](#troubleshoot)

## Connect telemetry using tags

Connect Datadog telemetry together through the use of reserved (`env`, `service`, and `version`) and custom tags. You can use these tags to navigate seamlessly across metrics, traces, and logs. Add the extra parameters below for the installation method you use.

{{< tabs >}}
{{% tab "Datadog CLI" %}}

Ensure you are using the latest version of the [Datadog CLI][1] and run the `datadog-ci lambda instrument command` with appropriate extra arguments. For example:

```sh
datadog-ci lambda instrument \
    --env dev \
    --service web \
    --version v1.2.3 \
    --extra-tags "team:avengers,project:marvel"
    # ... other required arguments, such as function names
```

[1]: https://docs.datadoghq.com/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

Ensure you are using the latest version of the [Datadog serverless plugin][1] and apply the tags using the `env`, `service`, `version` and `tags` parameters. For example:

```yaml
custom:
  datadog:
    # ... other required parameters, such as the Datadog site and API key
    env: dev
    service: web
    version: v1.2.3
    tags: "team:avengers,project:marvel"
```

By default, if you don't define `env` and `service`, the plugin automatically uses the `stage` and `service` values from the serverless application definition. To disable this feature, set `enableTags` to `false`.

[1]: https://docs.datadoghq.com/serverless/serverless_integrations/plugin
{{% /tab %}}
{{% tab "AWS SAM" %}}

Ensure you are using the latest version of the [Datadog serverless macro][1] and apply the tags using the `env`, `service`, `version` and `tags` parameters. For example:

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... other required parameters, such as the Datadog site and API key
      env: dev
      service: web
      version: v1.2.3
      tags: "team:avengers,project:marvel"
```

[1]: https://docs.datadoghq.com/serverless/serverless_integrations/macro
{{% /tab %}}
{{% tab "AWS CDK" %}}

Ensure you are using the latest version of the [Datadog serverless cdk construct][1] and apply the tags using the `env`, `service`, `version` and `tags` parameters. For example:

```typescript
const datadog = new Datadog(this, "Datadog", {
    // ... other required parameters, such as the Datadog site and API key
    env: "dev",
    service: "web",
    version: "v1.2.3",
    tags: "team:avengers,project:marvel"
});
datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);
```

[1]: https://github.com/DataDog/datadog-cdk-constructs
{{% /tab %}}
{{% tab "Others" %}}

If you are collecting telemetry from your Lambda functions using the [Datadog Lambda extension][1], set the following environment variables on your Lambda functions. For example:
- DD_ENV: dev
- DD_SERVICE: web
- DD_VERSION: v1.2.3
- DD_TAGS: team:avengers,project:marvel

If you are collecting telemetry from your Lambda functions using the [Datadog Forwarder Lambda function][2], set the `env`, `service`, `version`, and additional tags as AWS resource tags on your Lambda functions. Ensure the `DdFetchLambdaTags` option is set to `true` on the CloudFormation stack for your Datadog Forwarder. This option defaults to true since version 3.19.0.

[1]: /serverless/libraries_integrations/extension/
[2]: /serverless/libraries_integrations/forwarder/
{{% /tab %}}
{{< /tabs >}}

Datadog can also enrich the collected telemetry with existing AWS resource tags defined on your Lambda functions.

- If you are collecting telemetry from your Lambda functions using the [Datadog Lambda extension][2], enable the [Datadog AWS integration][3].

- If you are collecting telemetry from your Lambda functions using the [Datadog Forwarder Lambda function][4], set the `DdFetchLambdaTags` option to `true` on the CloudFormation stack for your Datadog Forwarder. This option defaults to true since version 3.19.0.

## Collect the request and response payloads

<div class="alert alert-info">This feature is currently supported for Python, Node.js, Java, and .NET.</div>

Datadog can [collect and visualize the JSON request and response payloads of AWS Lambda functions][5], giving you deeper insight into your serverless applications and helping troubleshoot Lambda function failures.

This feature is disabled by default. Follow the instructions below for the installation method you use.

{{< tabs >}}
{{% tab "Datadog CLI" %}}

Ensure you are using the latest version of the [Datadog CLI][1] and run the `datadog-ci lambda instrument command` with the extra `--capture-lambda-payload` argument. For example:

```sh
datadog-ci lambda instrument \
    --capture-lambda-payload true
    # ... other required arguments, such as function names
```

[1]: https://docs.datadoghq.com/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

Ensure you are using the latest version of the [Datadog serverless plugin][1] and set the `captureLambdaPayload` to `true`. For example:

```yaml
custom:
  datadog:
    # ... other required parameters, such as the Datadog site and API key
    captureLambdaPayload: true
```

[1]: https://docs.datadoghq.com/serverless/serverless_integrations/plugin
{{% /tab %}}
{{% tab "AWS SAM" %}}

Ensure you are using the latest version of the [Datadog serverless macro][1] and set the `captureLambdaPayload` parameter to `true`. For example:

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... other required parameters, such as the Datadog site and API key
      captureLambdaPayload: true
```

[1]: https://docs.datadoghq.com/serverless/serverless_integrations/macro
{{% /tab %}}
{{% tab "AWS CDK" %}}

Ensure you are using the latest version of the [Datadog serverless cdk construct][1] and set the `captureLambdaPayload` parameter to `true`. For example:

```typescript
const datadog = new Datadog(this, "Datadog", {
    // ... other required parameters, such as the Datadog site and API key
    captureLambdaPayload: true
});
datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);
```

[1]: https://github.com/DataDog/datadog-cdk-constructs
{{% /tab %}}
{{% tab "Others" %}}

Set the environment variable `DD_CAPTURE_LAMBDA_PAYLOAD` to `true` on your Lambda functions.

{{% /tab %}}
{{< /tabs >}}

To prevent any sensitive data within request or response JSON objects from being sent to Datadog, you can to scrub specific parameters.

To do this, add a new file `datadog.yaml` in the same folder as your Lambda function code. Obfuscation of fields in the Lambda payload is then available through [the replace_tags block][6] within `apm_config` settings in `datadog.yaml`:

```yaml
apm_config:
  replace_tags:
    # Replace all the occurrences of "foobar" in any tag with "REDACTED":
    - name: "*"
      pattern: "foobar"
      repl: "REDACTED"
    # Replace "auth" from request headers with an empty string
    - name: "function.request.headers.auth"
      pattern: "(?s).*"
      repl: ""
    # Replace "apiToken" from response payload with "****"
    - name: "function.response.apiToken"
      pattern: "(?s).*"
      repl: "****"
```

As an alternative, you can also populate the `DD_APM_REPLACE_TAGS` environment variable on your Lambda function to obfuscate specific fields:

```yaml
DD_APM_REPLACE_TAGS=[
      {
        "name": "*",
        "pattern": "foobar",
        "repl": "REDACTED"
      },
      {
        "name": "function.request.headers.auth",
        "pattern": "(?s).*",
        "repl": ""
      },
      {
        "name": "function.response.apiToken",
        "pattern": "(?s).*"
        "repl": "****"
      }
]
```

## Collect metrics from non-Lambda resources

In addition to collecting real-time [Datadog Lambda enhanced metrics][7], Datadog can also help you collect metrics for AWS managed resources—such as [API Gateway][8], [AppSync][9], and [SQS][10]—to help you monitor your entire serverless application. The metrics are also enriched with the corresponding AWS resource tags.

To collect these metrics, set up the [Datadog AWS integration][3].

## Collect logs from non-Lambda resources

Logs generated by managed resources besides AWS Lambda functions can be hugely valuable in helping identify the root cause of issues in your serverless applications. Datadog recommends you [collect logs][11] from the following AWS managed resources in your environment:
- APIs: API Gateway, AppSync, ALB
- Queues & Streams: SQS, SNS, Kinesis
- Data Stores: DynamoDB, S3, RDS, etc.

## Collect traces from non-Lambda resources

<div class="alert alert-info">This feature is currently supported for Python, Node.js, Java, and .NET.</div>

Datadog can infer APM spans based on the incoming Lambda events for the AWS managed resources that trigger the Lambda function. This can be help visualize the relationship between AWS managed resources and identify performance issues in your serverless applications. See [additional product details][12].

The following resources are currently supported:

- API Gateway (REST API, HTTP API, and WebSocket)
- Function URLs
- SQS
- SNS (SNS messages delivered through SQS are also supported)
- Kinesis Streams (if data is a JSON string or base64 encoded JSON string)
- EventBridge (custom events, where `Details` is a JSON string)
- S3
- DynamoDB

To disable this feature, set `DD_TRACE_MANAGED_SERVICES` to `false`.

## Configure logs collection

### Filter or scrub information from logs

To exclude the `START` and `END` logs, set the environment variable `DD_LOGS_CONFIG_PROCESSING_RULES` to `[{"type": "exclude_at_match", "name": "exclude_start_and_end_logs", "pattern": "(START|END) RequestId"}]`. Alternatively, you can add a `datadog.yaml` file in your project root directory with the following content:

```yaml
logs_config:
  processing_rules:
    - type: exclude_at_match
      name: exclude_start_and_end_logs
      pattern: (START|END) RequestId
```

Datadog recommends keeping the `REPORT` logs, as they are used to populate the invocations list in the serverless function views.

To scrub or filter other logs before sending them to Datadog, see [Advanced Log Collection][13].

### Disable logs collection

Logs collection through the Datadog Lambda extension is enabled by default.

If you want to stop collecting logs using the Datadog Forwarder Lambda function, remove the subscription filter from your own Lambda function's CloudWatch log group.

If you want to stop collecting logs using the Datadog Lambda extension, follow the instructions below for the installation method you use:

{{< tabs >}}
{{% tab "Serverless Framework" %}}

```yaml
custom:
  datadog:
    # ... other required parameters, such as the Datadog site and API key
    enableDDLogs: false
```

{{% /tab %}}
{{% tab "AWS SAM" %}}

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... other required parameters, such as the Datadog site and API key
      enableDDLogs: false
```

{{% /tab %}}
{{% tab "AWS CDK" %}}

```typescript
const datadog = new Datadog(this, "Datadog", {
    // ... other required parameters, such as the Datadog site and API key
    enableDatadogLogs: false
});
datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);
```

{{% /tab %}}
{{% tab "Others" %}}

Set the environment variable `DD_SERVERLESS_LOGS_ENABLED` to `false` on your Lambda functions.

{{% /tab %}}
{{< /tabs >}}

## Configure trace collection

To see what libraries and frameworks are automatically instrumented by the Datadog APM client, see [Compatibility Requirements for APM][14]. To instrument custom applications, see Datadog's APM guide for [custom instrumentation][15].

### Filter or scrub sensitive information from traces

To filter traces before sending them to Datadog, see [Ignoring Unwanted Resources in APM][16].

To scrub trace attributes for data security, see [Configure the Datadog Agent or Tracer for Data Security][17].

### Disable trace collection

Trace collection through the Datadog Lambda extension is enabled by default. If you want to stop collecting traces from your Lambda functions, follow the instructions below:

{{< tabs >}}
{{% tab "Datadog CLI" %}}

```sh
datadog-ci lambda instrument \
    --tracing false
    # ... other required arguments, such as function names
```
{{% /tab %}}
{{% tab "Serverless Framework" %}}

```yaml
custom:
  datadog:
    # ... other required parameters, such as the Datadog site and API key
    enableDDTracing: false
```

{{% /tab %}}
{{% tab "AWS SAM" %}}

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... other required parameters, such as the Datadog site and API key
      enableDDTracing: false
```

{{% /tab %}}
{{% tab "AWS CDK" %}}

```typescript
const datadog = new Datadog(this, "Datadog", {
    // ... other required parameters, such as the Datadog site and API key
    enableDatadogTracing: false
});
datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);
```

{{% /tab %}}
{{% tab "Others" %}}

Set the environment variable `DD_TRACE_ENABLED` to `false` on your Lambda functions.

{{% /tab %}}
{{< /tabs >}}

## Connect logs and traces

If you are using the [Lambda extension][2] to collect traces and logs, Datadog automatically adds the AWS Lambda request ID to the `aws.lambda` span under the `request_id` tag. Additionally, Lambda logs for the same request are added under the `lambda.request_id` attribute. The Datadog trace and log views are connected using the AWS Lambda request ID.

If you are using the [Forwarder Lambda function][4] to collect traces and logs, `dd.trace_id` is automatically injected into logs (enabled by the environment variable `DD_LOGS_INJECTION`). The Datadog trace and log views are connected using the Datadog trace ID. This feature is supported for most applications using a popular runtime and logger (see the [support by runtime][18]). 

If you are using a runtime or custom logger that isn't supported, follow these steps:
- When logging in JSON, you need to obtain the Datadog trace ID using `dd-trace` and add it to your logs under the `dd.trace_id` field:
    ```javascript
    {
      "message": "This is a log",
      "dd": {
        "trace_id": "4887065908816661012"
      }
      // ... the rest of your log
    }
    ```
- When logging in plaintext, you need to:
    1. Obtain the Datadog trace ID using `dd-trace` and add it to your log.
    2. Clone the default Lambda log pipeline, which is read-only.
    3. Enable the cloned pipeline and disable the default one.
    4. Update the [Grok parser][19] rules of the cloned pipeline to parse the Datadog trace ID into the `dd.trace_id` attribute. For example, use rule `my_rule \[%{word:level}\]\s+dd.trace_id=%{word:dd.trace_id}.*` for logs that look like `[INFO] dd.trace_id=4887065908816661012 My log message`.

## Link errors to your source code

<div class="alert alert-info">This feature is supported for Go and Java.</div>

[Datadog source code integration][20] allows you to link your telemetry (such as stack traces) to the source code of your Lambda functions in GitHub. Follow the instructions below to enable the feature. **Note**: You must deploy from a local Git repository that is neither dirty nor ahead of remote.

{{< tabs >}}
{{% tab "Datadog CLI" %}}

Run `datadog-ci lambda instrument` with `--source-code-integration true` to automatically send Git metadata in the current local directory and add the required tags to your Lambda functions. 

**Note**: You must set environment variable `DATADOG_API_KEY` for `datadog-ci` to upload Git metadata. `DATADOG_API_KEY` is also set on your Lambda functions to send telemetry unless you also have `DATADOG_API_KEY_SECRET_ARN` defined, which takes precedence over `DATADOG_API_KEY`.


```sh
# ... other required environment variables, such as DATADOG_SITE

# required, to upload git metadata
export DATADOG_API_KEY=<DATADOG_API_KEY>

# optional, DATADOG_API_KEY is used if undefined
export DATADOG_API_KEY_SECRET_ARN=<DATADOG_API_KEY_SECRET_ARN>

datadog-ci lambda instrument \
    --source-code-integration true
    # ... other required arguments, such as function names
```
{{% /tab %}}
{{% tab "Serverless Framework" %}}

With `enableSourceCodeIntegration` set to `true`, the Datadog serverless plugin automatically sends Git metadata in the current local directory and adds the required tags to your Lambda functions. 

**Note**: You must set the `apiKey` parameter for the plugin to upload Git metadata. `apiKey` is also set on your Lambda functions to send telemetry unless you also have `apiKeySecretArn` defined, which takes precedence over `apiKey`.

```yaml
custom:
  datadog:
    # ... other required parameters, such as the Datadog site
    apiKey: <apiKey> # required, to upload git metadata
    apiKeySecretArn: <apiKeySecretArn> # optional, apiKey will be used if undefined
    enableSourceCodeIntegration: true # default is true
```

{{% /tab %}}
{{% tab "AWS CDK" %}}

Change your initialization function as follows to pass the gitHash value to the CDK stack:

```typescript
async function main() {
  // Make sure to add @datadog/datadog-ci via your package manager
  const datadogCi = require("@datadog/datadog-ci");
  const gitHash = await datadogCi.gitMetadata.uploadGitCommitHash('{Datadog_API_Key}', '<SITE>')

  const app = new cdk.App();
  // Pass in the hash to the ExampleStack constructor
  new ExampleStack(app, "ExampleStack", {}, gitHash);
}
```

In your stack constructor, add an optional `gitHash` parameter, and call `addGitCommitMetadata()`:

```typescript
export class ExampleStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps, gitHash?: string) {
    ...
    ...
    datadog.addGitCommitMetadata([<YOUR_FUNCTIONS>], gitHash)
  }
}
```

{{% /tab %}}
{{% tab "Others" %}}

1. Set the environment variable `DD_TAGS="git.commit.sha:<GIT_COMMIT_SHA>,git.repository_url=<REPOSITORY_URL>"` on your Lambda functions
2. Run [datadog-ci git-metadata upload][1] in your CI pipeline to upload Git metadata
3. Optionally, [install a GitHub App][2] to display inline source code snippets

[1]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/git-metadata
[2]: https://app.datadoghq.com/account/settings#integrations/github-apps
{{% /tab %}}
{{< /tabs >}}

## Submit custom metrics

You can monitor your custom business logic by [submitting custom metrics][21].

## Send telemetry over PrivateLink or proxy

The Datadog Lambda Extension needs access to the public internet to send data to Datadog. If your Lambda functions are deployed in a VPC without access to public internet, you can [send data over AWS PrivateLink][22] to the `datadoghq.com` [Datadog site][23], or [send data over a proxy][24] for all other sites.

If you are using the Datadog Forwarder, follow these [instructions][25].

## Propagate trace context over AWS resources

Datadog automatically injects the trace context into outgoing AWS SDK requests and extracts the trace context from the Lambda event. This enables Datadog to trace a request or transaction over distributed services. See [additional information][26].

## Merge X-Ray and Datadog traces

AWS X-Ray supports tracing through certain AWS managed services such as AppSync and Step Functions, which is not supported by Datadog APM natively. You can enable the [Datadog X-Ray integration][27] and merge the X-Ray traces with the Datadog native traces. See [additional details][28].

## Enable AWS Lambda code signing

[Code signing for AWS Lambda][29] helps to ensure that only trusted code is deployed from your Lambda functions to AWS. When you enable code signing on your functions, AWS validates that all of the code in your deployments is signed by a trusted source, which you define from your code signing configuration.

If your Lambda functions are configured to use code signing, you must add Datadog's Signing Profile ARN below to your function's code signing configuration before you can deploy Lambda functions using Lambda Layers published by Datadog.

```
arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc
```

## Migrate to the Datadog Lambda extension

Datadog can collect the monitoring data from your Lambda functions either using the [Forwarder Lambda function][4] or the [Lambda extension][2]. Datadog recommends the Lambda extension for new installations. If you are unsure, see [why should you migrate][30].

To migrate, compare the [installation instructions using the Datadog Lambda Extension][1] against the [instructions using the Datadog Forwarder][31]. For your convenience, the key differences are summarized below.

**Note**: Datadog recommends migrating your dev and staging applications first and migrating production applications one by one.

{{< tabs >}}
{{% tab "Datadog CLI" %}}

1. Upgrade `@datadog/datadog-ci` to the latest version
2. Update the `--layer-version` argument and set it to the latest version for your runtime.
3. Set the `--extension-version` argument to the latest extension version {{< latest-lambda-layer-version layer="extension" >}}
4. Set the required environment variable `DATADOG_SITE` and `DATADOG_API_KEY_SECRET_ARN`.
5. Remove the `--forwarder` argument.
6. If you configured the Datadog AWS integration to automatically subscribe the Forwarder to Lambda log groups, disable that after you migrate _all_ the Lambda functions in that region.

{{% /tab %}}
{{% tab "Serverless Framework" %}}

1. Upgrade `serverless-plugin-datadog` to the latest version, which installs the Datadog Lambda Extension by default, unless you set `addExtension` to `false`.
2. Set the required parameters `site` and `apiKeySecretArn`.
3. Set the `env`, `service`, and `version` parameters if you previously set them as Lambda resource tags. The plugin will automatically set them through the Datadog reserved environment variables instead, such as `DD_ENV`, when using the extension.
4. Remove the `forwarderArn` parameter, unless you want to keep the Forwarder for collecting logs from non-Lambda resources, that is, you have `subscribeToApiGatewayLogs`, `subscribeToHttpApiLogs`, or `subscribeToWebsocketLogs` set to `true`.
5. If you configured the Datadog AWS integration to automatically subscribe the Forwarder to Lambda log groups, disable that after you migrate _all_ the Lambda functions in that region.

{{% /tab %}}
{{% tab "AWS SAM" %}}

1. Update the `datadog-serverless-macro` CloudFormation stack to pick up the latest version.
2. Set the `extensionLayerVersion` parameter to the latest extension version {{< latest-lambda-layer-version layer="extension" >}}
3. Set the required parameters `site` and `apiKeySecretArn`.
4. Remove the `forwarderArn` parameter.
5. If you configured the Datadog AWS integration to automatically subscribe the Forwarder to Lambda log groups, disable that after you migrate _all_ the Lambda functions in that region.

{{% /tab %}}
{{% tab "AWS CDK" %}}

1. Upgrade `datadog-cdk-constructs` or `datadog-cdk-constructs-v2` to the latest version.
2. Set the `extensionLayerVersion` parameter to the latest extension version {{< latest-lambda-layer-version layer="extension" >}}
3. Set the required parameters `site` and `apiKeySecretArn`.
4. Set the `env`, `service`, and `version` parameters if you previously set them as Lambda resource tags. The construct will automatically set them through the Datadog reserved environment variables instead, such as `DD_ENV`, when using the extension.
5. Remove the `forwarderArn` parameter.
6. If you configured the Datadog AWS integration to automatically subscribe the Forwarder to Lambda log groups, disable that after you migrate _all_ the Lambda functions in that region.

{{% /tab %}}
{{% tab "Others" %}}

1. Upgrade the Datadog Lambda library layer for your runtime to the latest version.
2. Install the latest version of the Datadog Lambda extension.
3. Set the required environment variables `DD_SITE` and `DD_API_KEY_SECRET_ARN`.
3. Set the `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` environment variables if you previously set them as Lambda resource tags.
4. Remove the subscription filter that streams logs from your Lambda function's log group to the Datadog Forwarder.
5. If you configured the Datadog AWS integration to automatically subscribe the Forwarder to Lambda log groups, disable that after you migrate _all_ the Lambda functions in that region.

{{% /tab %}}
{{< /tabs >}}

## Troubleshoot

If you have trouble configuring your installations, set the environment variable `DD_LOG_LEVEL` to `debug` for debugging logs. For additional troubleshooting tips, see the [serverless monitoring troubleshooting guide][32].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}



[1]: /serverless/installation/
[2]: /serverless/libraries_integrations/extension/
[3]: /integrations/amazon_web_services/
[4]: /serverless/libraries_integrations/forwarder/
[5]: https://www.datadoghq.com/blog/troubleshoot-lambda-function-request-response-payloads/
[6]: /tracing/setup_overview/configure_data_security/#scrub-sensitive-data-from-your-spans
[7]: /serverless/enhanced_lambda_metrics
[8]: /integrations/amazon_api_gateway/#data-collected
[9]: /integrations/amazon_appsync/#data-collected
[10]: /integrations/amazon_sqs/#data-collected
[11]: /integrations/amazon_web_services/#log-collection
[12]: https://www.datadoghq.com/blog/monitor-aws-fully-managed-services-datadog-serverless-monitoring/
[13]: /agent/logs/advanced_log_collection/
[14]: /tracing/setup_overview/compatibility_requirements/
[15]: /tracing/setup_overview/custom_instrumentation/
[16]: /tracing/guide/ignoring_apm_resources/
[17]: /tracing/setup_overview/configure_data_security/
[18]: /tracing/connect_logs_and_traces/
[19]: /logs/log_configuration/parsing/
[20]: /integrations/guide/source-code-integration
[21]: /serverless/custom_metrics
[22]: /agent/guide/private-link/
[23]: /getting_started/site/
[24]: /agent/proxy/
[25]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#aws-privatelink-support
[26]: /serverless/distributed_tracing/serverless_trace_propagation/
[27]: /integrations/amazon_xray/
[28]: /serverless/distributed_tracing/serverless_trace_merging
[29]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html
[30]: /serverless/guide/extension_motivation/
[31]: /serverless/guide#install-using-the-datadog-forwarder
[32]: /serverless/guide/troubleshoot_serverless_monitoring/
