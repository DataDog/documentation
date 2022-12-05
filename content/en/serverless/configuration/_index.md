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
  - link: '/integrations/github'
    tag: 'Documentation'
    text: 'Learn about the GitHub integration'
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
- [Filter or scrub information from logs](#filter-or-scrub-information-from-logs)
- [Disable logs collection](#disable-logs-collection)
- [Collect logs from non-Lambda resources](#collect-logs-from-non-lambda-resources)
- [Parse and transform logs](#parse-and-transform-logs)
- [Connect logs and traces](#connect-logs-and-traces)

### APM
- [Configure the Datadog tracer](#configure-the-datadog-tracer)
- [Choose APM tracing sampling rates](#select-sampling-rates-for-ingesting-apm-spans)
- [Filter or scrub sensitive information from traces](#filter-or-scrub-sensitive-information-from-traces)
- [Disable trace collection](#disable-trace-collection)
- [Collect the request and response payloads](#collect-the-request-and-response-payloads)
- [Collect traces from non-Lambda resources](#collect-traces-from-non-lambda-resources)
- [Propagate trace context over AWS resources](#propagate-trace-context-over-aws-resources)
- [Merge X-Ray and Datadog traces](#merge-x-ray-and-datadog-traces)
- [Link errors to your source code](#link-errors-to-your-source-code)

### Others
- [Connect telemetry using tags](#connect-telemetry-using-tags)
- [Send telemetry over AWS PrivateLink or a proxy](#send-telemetry-over-privatelink-or-proxy)
- [Send telemetry to multiple Datadog organizations](#send-telemetry-to-multiple-datadog-organizations)
- [Migrate to the Datadog Lambda extension](#migrate-to-the-datadog-lambda-extension)
- [Enable AWS Lambda code signing](#enable-aws-lambda-code-signing)
- [Configure the Datadog Lambda extension for local testing](#configure-the-datadog-lambda-extension-for-local-testing)
- [Troubleshoot](#troubleshoot)

## Connect telemetry using tags

Connect Datadog telemetry together through the use of reserved (`env`, `service`, and `version`) and custom tags. You can use these tags to navigate seamlessly across metrics, traces, and logs. Add the extra parameters below for the installation method you use.

{{< tabs >}}
{{% tab "Datadog CLI" %}}

Ensure you are using the latest version of the [Datadog CLI][1] and run the `datadog-ci lambda instrument` command with appropriate extra arguments. For example:

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

Datadog can also enrich the collected telemetry with existing AWS resource tags defined on your Lambda functions with a delay of a few minutes.

- If you are collecting telemetry from your Lambda functions using the [Datadog Lambda extension][2], enable the [Datadog AWS integration][3]. This feature is meant to enrich your telemetry with **custom** tags. Datadog reserved tags (`env`, `service`, and `version`) must be set through the corresponding environment variables (`DD_ENV`, `DD_SERVICE`, and `DD_VERSION` respectively). Reserved tags can also be set with the parameters provided by the Datadog integrations with the serverless developer tools. This feature does not work for Lambda functions deployed with container images.

- If you are collecting telemetry from your Lambda functions using the [Datadog Forwarder Lambda function][4], set the `DdFetchLambdaTags` option to `true` on the CloudFormation stack for your Datadog Forwarder. This option defaults to true since version 3.19.0.

## Collect the request and response payloads

<div class="alert alert-info">This feature is supported for Python, Node.js, Go, and .NET.</div>

Datadog can [collect and visualize the JSON request and response payloads of AWS Lambda functions][5], giving you deeper insight into your serverless applications and helping troubleshoot Lambda function failures.

This feature is disabled by default. Follow the instructions below for the installation method you use.

{{< tabs >}}
{{% tab "Datadog CLI" %}}

Ensure you are using the latest version of the [Datadog CLI][1] and run the `datadog-ci lambda instrument` command with the extra `--capture-lambda-payload` argument. For example:

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

To prevent any sensitive data within request or response JSON objects from being sent to Datadog, you can scrub specific parameters.

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

Logs generated by managed resources besides AWS Lambda functions can be valuable in helping identify the root cause of issues in your serverless applications. Datadog recommends you [collect logs][11] from the following AWS managed resources in your environment:
- APIs: API Gateway, AppSync, ALB
- Queues & Streams: SQS, SNS, Kinesis
- Data Stores: DynamoDB, S3, RDS

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

## Filter or scrub information from logs

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

## Disable logs collection

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

## Parse and transform logs

To parse and transform your logs in Datadog, see documentation for [Datadog log pipelines][14].

## Configure the Datadog tracer

To see what libraries and frameworks are automatically instrumented by the Datadog APM client, see [Compatibility Requirements for APM][15]. To instrument custom applications, see Datadog's APM guide for [custom instrumentation][16].

## Select sampling rates for ingesting APM spans

To manage the [APM traced invocation sampling rate][17] for serverless functions, set the `DD_TRACE_SAMPLE_RATE` environment variable on the function to a value between 0.000 (no tracing of Lambda function invocations) and 1.000 (trace all Lambda function invocations).

Metrics are calculated based on 100% of the application’s traffic, and remain accurate regardless of any sampling configuration.

For high throughput services, there’s usually no need for you to collect every single request as trace data is very repetitive—an important enough problem should always show symptoms in multiple traces. [Ingestion controls][18] help you to have the visibility that you need to troubleshoot problems while remaining within budget.

The default sampling mechanism for ingestion is called [head-based sampling][19]. The decision of whether to keep or drop a trace is made at the very beginning of the trace, at the start of the root span. This decision is then propagated to other services as part of their request context, for example as an HTTP request header. Because the decision is made at the beginning of the trace and then conveyed to all parts of the trace, you must configure the sampling rate on the root service to take effect.

After spans have been ingested by Datadog, the Datadog Intelligent Retention Filter indexes a proportion of traces to help you monitor the health of your applications. You can also define custom [retention filters][20] to index trace data you want to keep for longer to support your organization's goals.

Learn more about the [Datadog Trace Pipeline][21].

## Filter or scrub sensitive information from traces

To filter traces before sending them to Datadog, see [Ignoring Unwanted Resources in APM][22].

To scrub trace attributes for data security, see [Configure the Datadog Agent or Tracer for Data Security][23].

## Disable trace collection

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

If you are using the [Forwarder Lambda function][4] to collect traces and logs, `dd.trace_id` is automatically injected into logs (enabled by the environment variable `DD_LOGS_INJECTION`). The Datadog trace and log views are connected using the Datadog trace ID. This feature is supported for most applications using a popular runtime and logger (see the [support by runtime][24]).

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
    4. Update the [Grok parser][25] rules of the cloned pipeline to parse the Datadog trace ID into the `dd.trace_id` attribute. For example, use rule `my_rule \[%{word:level}\]\s+dd.trace_id=%{word:dd.trace_id}.*` for logs that look like `[INFO] dd.trace_id=4887065908816661012 My log message`.

## Link errors to your source code

<div class="alert alert-info">This feature supports Go, Java, Python, and JavaScript.</div>

[Datadog source code integration][26] allows you to link your telemetry (such as stack traces) to the source code of your Lambda functions in GitHub. Follow the instructions below to enable the feature. **Note**: You must deploy from a local Git repository that is neither dirty nor ahead of remote.

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
[2]: https://app.datadoghq.com/integrations/github/
{{% /tab %}}
{{< /tabs >}}

## Submit custom metrics

You can monitor your custom business logic by [submitting custom metrics][27].

## Send telemetry over PrivateLink or proxy

The Datadog Lambda Extension needs access to the public internet to send data to Datadog. If your Lambda functions are deployed in a VPC without access to public internet, you can [send data over AWS PrivateLink][28] to the `datadoghq.com` [Datadog site][29], or [send data over a proxy][30] for all other sites.

If you are using the Datadog Forwarder, follow these [instructions][31].

## Send telemetry to multiple Datadog organizations

If you wish to send data to multiple organizations, you can enable dual shipping using a plaintext API key, AWS Secrets Manager, or AWS KMS.

{{< tabs >}}
{{% tab "Plaintext API Key" %}}

You can enable dual shipping using a plaintext API key by setting the following environment variables on your Lambda function.

```bash
# Enable dual shipping for metrics
DD_ADDITIONAL_ENDPOINTS={"https://app.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://app.datadoghq.eu": ["<your_api_key_4>"]}
# Enable dual shipping for APM (traces)
DD_APM_ADDITIONAL_ENDPOINTS={"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}
# Enable dual shipping for APM (profiling)
DD_APM_PROFILING_ADDITIONAL_ENDPOINTS={"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}
# Enable dual shipping for logs
DD_LOGS_CONFIG_USE_HTTP=true
DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS=[{"api_key": "<your_api_key_2>", "Host": "agent-http-intake.logs.datadoghq.com", "Port": 443, "is_reliable": true}]
```

{{% /tab %}}
{{% tab "AWS Secrets Manager" %}}

The Datadog Extension supports retrieving [AWS Secrets Manager][40] values automatically for any environment variables prefixed with `_SECRET_ARN`. You can use this to securely store your environment variables in Secrets Manager and dual ship with Datadog.

1. Set the environment variable `DD_LOGS_CONFIG_USE_HTTP=true` on your Lambda function.
2. Add the `secretsmanager:GetSecretValue` permission to your Lambda function IAM role permissions.
3. Create a new secret on Secrets Manager to store the dual shipping metrics environment variable. The contents should be similar to `{"https://app.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://app.datadoghq.eu": ["<your_api_key_4>"]}`.
4. Set the environment variable `DD_ADDITIONAL_ENDPOINTS_SECRET_ARN` on your Lambda function to the ARN from the aforementioned secret.
5. Create a new secret on Secrets Manager to store the dual shipping APM (traces) environment variable. The contents should be **similar** to `{"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}`.
6. Set the environment variable `DD_APM_ADDITIONAL_ENDPOINTS_SECRET_ARN` on your Lambda function equal to the ARN from the aforementioned secret.
7. Create a new secret on Secrets Manager to store the dual shipping APM (profiling) environment variable. The contents should be **similar** to `{"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}`.
8. Set the environment variable `DD_APM_PROFILING_ADDITIONAL_ENDPOINTS_SECRET_ARN` on your Lambda function equal to the ARN from the aforementioned secret.
9. Create a new secret on Secrets Manager to store the dual shipping logs environment variable. The contents should be **similar** to `[{"api_key": "<your_api_key_2>", "Host": "agent-http-intake.logs.datadoghq.com", "Port": 443, "is_reliable": true}]`.
10. Set the environment variable `DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS_SECRET_ARN` on your Lambda function equal to the ARN from the aforementioned secret.

{{% /tab %}}
{{% tab "AWS KMS" %}}

The Datadog Extension supports decrypting [AWS KMS][41] values automatically for any environment variables prefixed with `_KMS_ENCRYPTED`. You can use this to securely store your environment variables in KMS and dual ship with Datadog.

1. Set the environment variable `DD_LOGS_CONFIG_USE_HTTP=true` on your Lambda function.
2. Add the `kms:GenerateDataKey` and `kms:Decrypt` permissions to your Lambda function IAM role permissions.
3. For dual shipping metrics, encrypt `{"https://app.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://app.datadoghq.eu": ["<your_api_key_4>"]}` using KMS and set the `DD_ADDITIONAL_ENDPOINTS_KMS_ENCRYPTED` environment variable equal to its value.
4. For dual shipping traces, encrypt `{"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}` using KMS and set the `DD_APM_ADDITIONAL_KMS_ENCRYPTED` environment variable equal to its value.
5. For dual shipping profiling, encrypt `{"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}` using KMS and set the `DD_APM_PROFILING_ADDITIONAL_ENDPOINTS_KMS_ENCRYPTED` environment variable equal to its value.
5. For dual shipping logs, encrypt `[{"api_key": "<your_api_key_2>", "Host": "agent-http-intake.logs.datadoghq.com", "Port": 443, "is_reliable": true}]` using KMS and set the `DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS_KMS_ENCRYPTED` environment variable equal to its value.

{{% /tab %}}
{{< /tabs >}}

For more advanced usage, see the [Dual Shipping guide][32].

## Propagate trace context over AWS resources

Datadog automatically injects the trace context into outgoing AWS SDK requests and extracts the trace context from the Lambda event. This enables Datadog to trace a request or transaction over distributed services. See [Serverless Trace Propagation][33].

## Merge X-Ray and Datadog traces

AWS X-Ray supports tracing through certain AWS managed services such as AppSync and Step Functions, which is not supported by Datadog APM natively. You can enable the [Datadog X-Ray integration][34] and merge the X-Ray traces with the Datadog native traces. See [additional details][35].

## Enable AWS Lambda code signing

[Code signing for AWS Lambda][36] helps to ensure that only trusted code is deployed from your Lambda functions to AWS. When you enable code signing on your functions, AWS validates that all of the code in your deployments is signed by a trusted source, which you define from your code signing configuration.

If your Lambda functions are configured to use code signing, you must add Datadog's Signing Profile ARN to your function's code signing configuration before you can deploy Lambda functions using Lambda Layers published by Datadog.

Datadog's Signing Profile ARN:

```
arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc
```

## Migrate to the Datadog Lambda extension

Datadog can collect the monitoring data from your Lambda functions either using the [Forwarder Lambda function][4] or the [Lambda extension][2]. Datadog recommends the Lambda extension for new installations. If you are unsure, see [Deciding to migrate to the Datadog Lambda extension][37].

To migrate, compare the [installation instructions using the Datadog Lambda Extension][1] against the [instructions using the Datadog Forwarder][38]. For your convenience, the key differences are summarized below.

**Note**: Datadog recommends migrating your dev and staging applications first and migrating production applications one by one.

## Migrating between x86 to arm64 with the Datadog Lambda Extension

The Datadog Extension is a compiled binary, available in both x86 and arm64 variants. If you are migrating an x86 Lambda function to arm64 (or arm64 to x86) using a deployment tool such as CDK, Serverless Framework, or SAM, ensure that your service integration (such as API Gateway, SNS, or Kinesis) is configured to use a Lambda function's versions or aliases, otherwise the function may be unavailable for about ten seconds during deployment.

This happens because migrating a Lambda function from x86 to arm64 consists of two parallel API calls, `updateFunction` and `updateFunctionConfiguration`. During these calls, there is a brief window where the Lambda `updateFunction` call has completed and the code is updated to use the new architecture while the `updateFunctionConfiguration` call has not yet completed, so the old architecture is still configured for the Extension.

If you cannot use Layer Versions, Datadog recommends configuring the [Datadog Forwarder][38] during the architecture migration process.

{{< tabs >}}
{{% tab "Datadog CLI" %}}

1. Upgrade `@datadog/datadog-ci` to the latest version
2. Update the `--layer-version` argument and set it to the latest version for your runtime.
3. Set the `--extension-version` argument to the latest extension version. The latest extension version is `{{< latest-lambda-layer-version layer="extension" >}}`.
4. Set the required environment variables `DATADOG_SITE` and `DATADOG_API_KEY_SECRET_ARN`.
5. Remove the `--forwarder` argument.
6. If you configured the Datadog AWS integration to automatically subscribe the Forwarder to Lambda log groups, disable that after you migrate _all_ the Lambda functions in that region.

{{% /tab %}}
{{% tab "Serverless Framework" %}}

1. Upgrade `serverless-plugin-datadog` to the latest version, which installs the Datadog Lambda Extension by default, unless you set `addExtension` to `false`.
2. Set the required parameters `site` and `apiKeySecretArn`.
3. Set the `env`, `service`, and `version` parameters if you previously set them as Lambda resource tags. The plugin will automatically set them through the Datadog reserved environment variables instead, such as `DD_ENV`, when using the extension.
4. Remove the `forwarderArn` parameter, unless you want to keep the Forwarder for collecting logs from non-Lambda resources and you have `subscribeToApiGatewayLogs`, `subscribeToHttpApiLogs`, or `subscribeToWebsocketLogs` set to `true`.
5. If you configured the Datadog AWS integration to automatically subscribe the Forwarder to Lambda log groups, disable that after you migrate _all_ the Lambda functions in that region.

{{% /tab %}}
{{% tab "AWS SAM" %}}

1. Update the `datadog-serverless-macro` CloudFormation stack to pick up the latest version.
2. Set the `extensionLayerVersion` parameter to the latest extension version. The latest extension version is `{{< latest-lambda-layer-version layer="extension" >}}`.
3. Set the required parameters `site` and `apiKeySecretArn`.
4. Remove the `forwarderArn` parameter.
5. If you configured the Datadog AWS integration to automatically subscribe the Forwarder to Lambda log groups, disable that after you migrate _all_ the Lambda functions in that region.

{{% /tab %}}
{{% tab "AWS CDK" %}}

1. Upgrade `datadog-cdk-constructs` or `datadog-cdk-constructs-v2` to the latest version.
2. Set the `extensionLayerVersion` parameter to the latest extension version. The latest extension version is `{{< latest-lambda-layer-version layer="extension" >}}`.
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

## Configure the Datadog Lambda extension for local testing

To test your Lambda function's container image locally with the Datadog Lambda extension installed, you need to set `DD_LOCAL_TEST` to `true` in your local testing environment. Otherwise, the extension waits for responses from the AWS Extensions API and blocks the invocation.

## Troubleshoot

If you have trouble configuring your installations, set the environment variable `DD_LOG_LEVEL` to `debug` for debugging logs. For additional troubleshooting tips, see the [serverless monitoring troubleshooting guide][39].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}



[1]: /serverless/installation/
[2]: /serverless/libraries_integrations/extension/
[3]: /integrations/amazon_web_services/
[4]: /serverless/libraries_integrations/forwarder/
[5]: https://www.datadoghq.com/blog/troubleshoot-lambda-function-request-response-payloads/
[6]: /tracing/configure_data_security/#scrub-sensitive-data-from-your-spans
[7]: /serverless/enhanced_lambda_metrics
[8]: /integrations/amazon_api_gateway/#data-collected
[9]: /integrations/amazon_appsync/#data-collected
[10]: /integrations/amazon_sqs/#data-collected
[11]: /integrations/amazon_web_services/#log-collection
[12]: https://www.datadoghq.com/blog/monitor-aws-fully-managed-services-datadog-serverless-monitoring/
[13]: /agent/logs/advanced_log_collection/
[14]: /logs/log_configuration/pipelines/
[15]: /tracing/trace_collection/compatibility/
[16]: /tracing/trace_collection/custom_instrumentation/
[17]: /tracing/trace_pipeline/ingestion_controls/#configure-the-service-ingestion-rate
[18]: /tracing/guide/trace_ingestion_volume_control#effects-of-reducing-trace-ingestion-volume
[19]: /tracing/trace_pipeline/ingestion_mechanisms/?tabs=environmentvariables#head-based-sampling
[20]: /tracing/trace_pipeline/trace_retention/
[21]: /tracing/trace_pipeline/
[22]: /tracing/guide/ignoring_apm_resources/
[23]: /tracing/configure_data_security/
[24]: /tracing/other_telemetry/connect_logs_and_traces/
[25]: /logs/log_configuration/parsing/
[26]: /integrations/guide/source-code-integration
[27]: /serverless/custom_metrics
[28]: /agent/guide/private-link/
[29]: /getting_started/site/
[30]: /agent/proxy/
[31]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#aws-privatelink-support
[32]: /agent/guide/dual-shipping/
[33]: /serverless/distributed_tracing/serverless_trace_propagation/
[34]: /integrations/amazon_xray/
[35]: /serverless/distributed_tracing/serverless_trace_merging
[36]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html
[37]: /serverless/guide/extension_motivation/
[38]: /serverless/guide#install-using-the-datadog-forwarder
[39]: /serverless/guide/troubleshoot_serverless_monitoring/
