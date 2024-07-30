---
title: Configure Serverless Monitoring for AWS Lambda
further_reading:
  - link: '/serverless/installation/'
    tag: 'Documentation'
    text: 'Install Serverless Monitoring for AWS Lambda'
  - link: '/serverless/troubleshooting/'
    tag: 'Documentation'
    text: 'Troubleshoot Serverless Monitoring for AWS Lambda'
  - link: '/integrations/github'
    tag: 'Documentation'
    text: 'Datadog GitHub integration'
aliases:
    - /serverless/distributed_tracing/collect_lambda_payloads
    - /serverless/libraries_integrations/lambda_code_signing
    - /serverless/guide/forwarder_extension_migration/
    - /serverless/guide/extension_private_link/
    - /serverless/configuration
---

First, [install][1] Datadog Serverless Monitoring to begin collecting metrics, traces, and logs. After installation is complete, refer to the following topics to configure your installation to suit your monitoring needs.

- [Connect telemetry using tags](#connect-telemetry-using-tags)
- [Collect the request and response payloads](#collect-the-request-and-response-payloads)
- [Collect traces from non-Lambda resources](#collect-traces-from-non-lambda-resources)
- [Configure the Datadog tracer](#configure-the-datadog-tracer)
- [Select sampling rates for ingesting APM spans](#select-sampling-rates-for-ingesting-apm-spans)
- [Filter or scrub sensitive information from traces](#filter-or-scrub-sensitive-information-from-traces)
- [Enable/disable trace collection](#enabledisable-trace-collection)
- [Connect logs and traces](#connect-logs-and-traces)
- [Link errors to your source code](#link-errors-to-your-source-code)
- [Submit custom metrics][27]
- [Collect Profiling data (public beta)](#collect-profiling-data-public-beta)
- [Send telemetry over PrivateLink or proxy](#send-telemetry-over-privatelink-or-proxy)
- [Send telemetry to multiple Datadog organizations](#send-telemetry-to-multiple-datadog-organizations)
- [Propagate trace context over AWS resources](#propagate-trace-context-over-aws-resources)
- [Merge X-Ray and Datadog traces](#merge-x-ray-and-datadog-traces)
- [Enable AWS Lambda code signing](#enable-aws-lambda-code-signing)
- [Migrate to the Datadog Lambda extension](#migrate-to-the-datadog-lambda-extension)
- [Migrating between x86 to arm64 with the Datadog Lambda Extension](#migrating-between-x86-to-arm64-with-the-datadog-lambda-extension)
- [Configure the Datadog Lambda extension for local testing](#configure-the-datadog-lambda-extension-for-local-testing)
- [Instrument AWS Lambda with the OpenTelemetry API](#instrument-aws-lambda-with-the-opentelemetry-api)
- [Troubleshoot](#troubleshoot)
- [Further Reading](#further-reading)


## Enable Threat Detection to observe attack attempts

Get alerted on attackers targeting your serverless applications and respond quickly. 

To get started, first ensure that you have [tracing enabled][43] for your functions.

To enable threat monitoring, add the following environment variables to your deployment:
   ```yaml
   environment:
     DD_SERVERLESS_APPSEC_ENABLED: true
     AWS_LAMBDA_EXEC_WRAPPER: /opt/datadog_wrapper
   ```

Redeploy the function and invoke it. After a few minutes, it appears in [ASM views][3].

[3]: https://app.datadoghq.com/security/appsec?column=time&order=desc

To see Application Security Management threat detection in action, send known attack patterns to your application. For example, send an HTTP header with value `acunetix-product` to trigger a [security scanner attack][44] attempt:
   ```sh
   curl -H 'My-ASM-Test-Header: acunetix-product' https://<YOUR_FUNCTION_URL>/<EXISTING_ROUTE>
   ```
A few minutes after you enable your application and send the attack patterns, **threat information appears in the [Application Signals Explorer][41]**.

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

<div class="alert alert-info">This feature is supported for Python, Node.js, Go, Java, and .NET.</div>

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

### DD_SERVICE_MAPPING

`DD_SERVICE_MAPPING` is an environment variable that renames upstream non-Lambda [services names][46]. It operates with `old-service:new-service` pairs.

#### Syntax

`DD_SERVICE_MAPPING=key1:value1,key2:value2`...

There are two ways to interact with this variable:

#### Rename all services of a type

To rename all upstream services associated with an AWS Lambda integration, use these identifiers:

| AWS Lambda Integration | DD_SERVICE_MAPPING Value |
|---|---|
| `lambda_api_gateway` | `"lambda_api_gateway:newServiceName"` |
| `lambda_sns` | `"lambda_sns:newServiceName"` |
| `lambda_sqs` | `"lambda_sqs:newServiceName"` |
| `lambda_s3` | `"lambda_s3:newServiceName"` |
| `lambda_eventbridge` | `"lambda_eventbridge:newServiceName"` |
| `lambda_kinesis` | `"lambda_kinesis:newServiceName"` |
| `lambda_dynamodb` | `"lambda_dynamodb:newServiceName"` |
| `lambda_url` | `"lambda_url:newServiceName"` |

#### Rename specific services

For a more granular approach, use these service-specific identifiers:

| Service | Identifier | DD_SERVICE_MAPPING Value |
|---|---|---|
| API Gateway | API ID | `"r3pmxmplak:newServiceName"` |
| SNS | Topic name | `"ExampleTopic:newServiceName"` |
| SQS | Queue name | `"MyQueue:newServiceName"` |
| S3 | Bucket name | `"example-bucket:newServiceName"` |
| EventBridge | Event source | `"eventbridge.custom.event.sender:newServiceName"` |
| Kinesis | Stream name | `"MyStream:newServiceName"` |
| DynamoDB | Table name | `"ExampleTableWithStream:newServiceName"` |
| Lambda URLs | API ID | `"a8hyhsshac:newServiceName"` |

#### Examples with description

| Command | Description |
|---|---|
| `DD_SERVICE_MAPPING="lambda_api_gateway:new-service-name"` | Renames all `lambda_api_gateway` upstream services to `new-service-name` |
| `DD_SERVICE_MAPPING="08se3mvh28:new-service-name"` | Renames specific upstream service `08se3mvh28.execute-api.eu-west-1.amazonaws.com` to `new-service-name` |

For renaming downstream services, see `DD_SERVICE_MAPPING` in the [tracer's config documentation][45].

## Configure the Datadog tracer

To see what libraries and frameworks are automatically instrumented by the Datadog APM client, see [Compatibility Requirements for APM][15]. To instrument custom applications, see Datadog's APM guide for [custom instrumentation][16].

## Select sampling rates for ingesting APM spans

To manage the [APM traced invocation sampling rate][17] for serverless functions, set the `DD_TRACE_SAMPLE_RATE` environment variable on the function to a value between 0.000 (no tracing of Lambda function invocations) and 1.000 (trace all Lambda function invocations).

Metrics are calculated based on 100% of the application's traffic, and remain accurate regardless of any sampling configuration.

For high throughput services, there's usually no need for you to collect every single request as trace data is very repetitive—an important enough problem should always show symptoms in multiple traces. [Ingestion controls][18] help you to have the visibility that you need to troubleshoot problems while remaining within budget.

The default sampling mechanism for ingestion is called [head-based sampling][19]. The decision of whether to keep or drop a trace is made at the very beginning of the trace, at the start of the root span. This decision is then propagated to other services as part of their request context, for example as an HTTP request header. Because the decision is made at the beginning of the trace and then conveyed to all parts of the trace, you must configure the sampling rate on the root service to take effect.

After spans have been ingested by Datadog, the Datadog Intelligent Retention Filter indexes a proportion of traces to help you monitor the health of your applications. You can also define custom [retention filters][20] to index trace data you want to keep for longer to support your organization's goals.

Learn more about the [Datadog Trace Pipeline][21].

## Filter or scrub sensitive information from traces

To filter traces before sending them to Datadog, see [Ignoring Unwanted Resources in APM][22].

To scrub trace attributes for data security, see [Configure the Datadog Agent or Tracer for Data Security][23].

## Enable/disable trace collection

Trace collection through the Datadog Lambda extension is enabled by default. 

If you want to start collecting traces from your Lambda functions, apply the configurations below:

{{< tabs >}}
{{% tab "Datadog CLI" %}}

```sh
datadog-ci lambda instrument \
    --tracing true
    # ... other required arguments, such as function names
```
{{% /tab %}}
{{% tab "Serverless Framework" %}}

```yaml
custom:
  datadog:
    # ... other required parameters, such as the Datadog site and API key
    enableDDTracing: true
```

{{% /tab %}}
{{% tab "AWS SAM" %}}

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... other required parameters, such as the Datadog site and API key
      enableDDTracing: true
```

{{% /tab %}}
{{% tab "AWS CDK" %}}

```typescript
const datadog = new Datadog(this, "Datadog", {
    // ... other required parameters, such as the Datadog site and API key
    enableDatadogTracing: true
});
datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);
```

{{% /tab %}}
{{% tab "Others" %}}

Set the environment variable `DD_TRACE_ENABLED` to `true` on your Lambda functions.

{{% /tab %}}
{{< /tabs >}}

#### Disable trace collection

If you want to stop collecting traces from your Lambda functions, apply the configurations below:

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

[Datadog source code integration][26] allows you to link your telemetry (such as stack traces) to the source code of your Lambda functions in your Git repositories. 

For instructions on setting up the source code integration on your serverless applications, see the [Embed Git information in your build artifacts section][101].

[101]: /integrations/guide/source-code-integration/?tab=go#serverless

## Collect Profiling data (public beta)

Datadog's [Continuous Profiler][42] is available in beta for Python version 4.62.0 and layer version 62 and earlier. This optional feature is enabled by setting the `DD_PROFILING_ENABLED` environment variable to `true`.

The Continuous Profiler works by spawning a thread that periodically takes a snapshot of the CPU and heap of all running Python code. This can include the profiler itself. If you want the profiler to ignore itself, set `DD_PROFILING_IGNORE_PROFILER` to `true`.

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

The Datadog Extension supports retrieving [AWS Secrets Manager][1] values automatically for any environment variables prefixed with `_SECRET_ARN`. You can use this to securely store your environment variables in Secrets Manager and dual ship with Datadog.

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

[1]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html

{{% /tab %}}
{{% tab "AWS KMS" %}}

The Datadog Extension supports decrypting [AWS KMS][41] values automatically for any environment variables prefixed with `_KMS_ENCRYPTED`. You can use this to securely store your environment variables in KMS and dual ship with Datadog.

1. Set the environment variable `DD_LOGS_CONFIG_USE_HTTP=true` on your Lambda function.
2. Add the `kms:GenerateDataKey` and `kms:Decrypt` permissions to your Lambda function IAM role permissions.
3. For dual shipping metrics, encrypt `{"https://app.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://app.datadoghq.eu": ["<your_api_key_4>"]}` using KMS and set the `DD_ADDITIONAL_ENDPOINTS_KMS_ENCRYPTED` environment variable equal to its value.
4. For dual shipping traces, encrypt `{"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}` using KMS and set the `DD_APM_ADDITIONAL_KMS_ENCRYPTED` environment variable equal to its value.
5. For dual shipping profiling, encrypt `{"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}` using KMS and set the `DD_APM_PROFILING_ADDITIONAL_ENDPOINTS_KMS_ENCRYPTED` environment variable equal to its value.
5. For dual shipping logs, encrypt `[{"api_key": "<your_api_key_2>", "Host": "agent-http-intake.logs.datadoghq.com", "Port": 443, "is_reliable": true}]` using KMS and set the `DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS_KMS_ENCRYPTED` environment variable equal to its value.

[41]: https://docs.aws.amazon.com/kms/
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

{{< site-region region="us,us3,us5,eu,gov" >}}
```
arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc
```
{{< /site-region >}}

{{< site-region region="ap1" >}}
```
arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc
```
{{< /site-region >}}


## Migrate to the Datadog Lambda extension

Datadog can collect the monitoring data from your Lambda functions either using the [Forwarder Lambda function][4] or the [Lambda extension][2]. Datadog recommends the Lambda extension for new installations. If you are unsure, see [Deciding to migrate to the Datadog Lambda extension][37].

To migrate, compare the [installation instructions using the Datadog Lambda Extension][1] against the [instructions using the Datadog Forwarder][38]. For your convenience, the key differences are summarized below.

**Note**: Datadog recommends migrating your dev and staging applications first and migrating production applications one by one.

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

## Migrating between x86 to arm64 with the Datadog Lambda Extension

The Datadog Extension is a compiled binary, available in both x86 and arm64 variants. If you are migrating an x86 Lambda function to arm64 (or arm64 to x86) using a deployment tool such as CDK, Serverless Framework, or SAM, ensure that your service integration (such as API Gateway, SNS, or Kinesis) is configured to use a Lambda function's versions or aliases, otherwise the function may be unavailable for about ten seconds during deployment.

This happens because migrating a Lambda function from x86 to arm64 consists of two parallel API calls, `updateFunction` and `updateFunctionConfiguration`. During these calls, there is a brief window where the Lambda `updateFunction` call has completed and the code is updated to use the new architecture while the `updateFunctionConfiguration` call has not yet completed, so the old architecture is still configured for the Extension.

If you cannot use Layer Versions, Datadog recommends configuring the [Datadog Forwarder][38] during the architecture migration process.


## Configure the Datadog Lambda extension for local testing

To test your Lambda function's container image locally with the Datadog Lambda extension installed, you need to set `DD_LOCAL_TEST` to `true` in your local testing environment. Otherwise, the extension waits for responses from the AWS Extensions API and blocks the invocation.

## Instrument AWS Lambda with the OpenTelemetry API

The Datadog tracing library, which is included in the Datadog Lambda Extension upon installation, accepts the spans and traces generated by OpenTelemetry-instrumented code, processes the telemetry, and sends it to Datadog.

You can use this approach if, for example, your code has already been instrumented with the OpenTelemetry API. You may also use this approach if you want to instrument using vendor-agnostic code with the OpenTelemetry API while still gaining the benefits of using the Datadog tracing libraries.

To instrument AWS Lambda with the OpenTelemetry API, set the environment variable `DD_TRACE_OTEL_ENABLED` to `true`. See [Custom instrumentation with the OpenTelemetry API][48] for more details.

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
[27]: /serverless/aws_lambda/metrics/#submit-custom-metrics
[28]: /agent/guide/private-link/
[29]: /getting_started/site/
[30]: /agent/proxy/
[31]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#aws-privatelink-support
[32]: /agent/guide/dual-shipping/
[33]: /serverless/distributed_tracing/#trace-propagation
[34]: /integrations/amazon_xray/
[35]: /serverless/distributed_tracing/#trace-merging
[36]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html
[37]: /serverless/guide/extension_motivation/
[38]: /serverless/guide#install-using-the-datadog-forwarder
[39]: /serverless/guide/troubleshoot_serverless_monitoring/
[40]: /serverless/libraries_integrations/extension/
[41]: https://app.datadoghq.com/security/appsec?column=time&order=desc
[42]: /profiler/
[43]: /serverless/installation#installation-instructions
[44]: /security/default_rules/security-scan-detected/
[45]: https://docs.datadoghq.com/tracing/trace_collection/library_config/
[46]: https://docs.datadoghq.com/tracing/glossary/#services
[47]: /logs/
[48]: /tracing/trace_collection/otel_instrumentation/
