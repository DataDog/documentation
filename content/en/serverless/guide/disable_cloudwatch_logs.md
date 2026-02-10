---
title: Disable CloudWatch Logs for Lambda Functions
description: How to disable CloudWatch Logs for Lambda functions that send logs through the Datadog Lambda extension.
further_reading:
- link: "/serverless/libraries_integrations/cli"
  tag: "Documentation"
  text: "Datadog Serverless CLI"
- link: "/serverless/libraries_integrations/extension"
  tag: "Documentation"
  text: "Datadog Lambda Extension"
---

When using the Datadog Lambda extension, logs are sent directly to Datadog through the Lambda Telemetry API. This makes CloudWatch Logs redundant for those functions. Disabling CloudWatch log groups for these functions reduces your AWS costs without affecting log delivery to Datadog.

<div class="alert alert-warning">Only disable CloudWatch logs for functions that are <strong>already sending logs through the Datadog Lambda extension</strong> (<code>DD_SERVERLESS_LOGS_ENABLED=true</code> or equivalent). Verify that logs are appearing in Datadog before you disable CloudWatch. If your function uses the <a href="/serverless/guide/datadog_forwarder_node">Datadog Forwarder</a> instead, <strong>do not</strong> disable CloudWatch logs, as the Forwarder relies on CloudWatch to forward logs.</div>

## Disable with the Datadog CLI

The [`datadog-ci lambda disable-cloudwatch`][1] command removes CloudWatch log groups for instrumented Lambda functions.

First, perform a dry run to preview which log groups are affected:

```bash
datadog-ci lambda disable-cloudwatch --dry-run -f <ARN>
```

After you confirm the output, run the command without the `--dry-run` flag:

```bash
datadog-ci lambda disable-cloudwatch -f <ARN>
```

To disable CloudWatch logs for multiple functions at once, use `--functions-regex`:

```bash
datadog-ci lambda disable-cloudwatch --functions-regex <REGEX>
```

**Note**: This command requires valid AWS credentials configured in your environment. See the [Datadog Serverless CLI documentation][1] for setup details.

## Disable with IaC tools

{{< tabs >}}
{{% tab "Terraform" %}}

Set the `logging_config` block on your `aws_lambda_function` resource to disable CloudWatch logging:

{{< code-block lang="hcl" >}}
resource "aws_lambda_function" "example" {
  function_name = "example"
  # ... other configuration ...

  logging_config {
    log_format = "Text"
    log_group  = ""
  }
}
{{< /code-block >}}

Alternatively, remove the associated `aws_cloudwatch_log_group` resource if you manage it explicitly.

{{% /tab %}}
{{% tab "AWS CloudFormation" %}}

Set the `LoggingConfig` property on your `AWS::Lambda::Function` resource:

{{< code-block lang="yaml" >}}
Resources:
  ExampleFunction:
    Type: AWS::Lambda::Function
    Properties:
      FunctionName: example
      # ... other configuration ...
      LoggingConfig:
        LogGroup: ""
{{< /code-block >}}

{{% /tab %}}
{{% tab "AWS SAM" %}}

Set the `LoggingConfig` property on your `AWS::Serverless::Function` resource:

{{< code-block lang="yaml" >}}
Resources:
  ExampleFunction:
    Type: AWS::Serverless::Function
    Properties:
      FunctionName: example
      # ... other configuration ...
      LoggingConfig:
        LogGroup: ""
{{< /code-block >}}

{{% /tab %}}
{{% tab "AWS CDK" %}}

Set the `loggingFormat` property to disable CloudWatch logging:

{{< code-block lang="typescript" >}}
import * as lambda from "aws-cdk-lib/aws-lambda";

const fn = new lambda.Function(this, "ExampleFunction", {
  functionName: "example",
  // ... other configuration ...
  loggingFormat: lambda.LoggingFormat.TEXT,
  logGroup: "",
});
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Disable manually in the AWS Console

1. Open the [Lambda console][2] and select the function.
2. Go to **Configuration** > **Monitoring and operations tools**.
3. Under **CloudWatch Logs**, click **Edit**.
4. Set the system log level to disabled.
5. Save your changes.

Alternatively, delete the CloudWatch log group directly from the [CloudWatch console][3]. **Note**: Lambda recreates the log group on the next invocation unless the function's execution role no longer has `logs:CreateLogGroup` and `logs:PutLogEvents` permissions.

## Verify log delivery

After you disable CloudWatch logs, confirm that logs are still flowing to Datadog:

1. Invoke the Lambda function.
2. In Datadog, go to [**Logs > Search**][4] and filter by `source:lambda` and the function name.
3. Verify that new log entries appear.

If logs are not appearing, re-enable CloudWatch logging and verify that `DD_SERVERLESS_LOGS_ENABLED` is set to `true` on the function.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /serverless/libraries_integrations/cli
[2]: https://console.aws.amazon.com/lambda/home
[3]: https://console.aws.amazon.com/cloudwatch/home#logsV2:log-groups
[4]: https://app.datadoghq.com/logs
