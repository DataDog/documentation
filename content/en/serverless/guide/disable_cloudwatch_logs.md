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

<div class="alert alert-danger">Only disable CloudWatch logs for functions that are <strong>already sending logs through the Datadog Lambda extension</strong>. Verify that logs are appearing in Datadog before you disable CloudWatch Logs. If your function uses the <a href="/serverless/guide/datadog_forwarder_node">Datadog Forwarder</a> instead, migrate to the extension before disabling CloudWatch logs, as the Forwarder relies on CloudWatch to forward logs.</div>

## How it works

Each method below attaches an inline IAM deny policy named `DenyCloudWatchLogs` to the Lambda function's execution role. The policy denies the following actions on the function's log group:

- `logs:CreateLogGroup`
- `logs:CreateLogStream`
- `logs:PutLogEvents`

Because AWS evaluates Deny before Allow in IAM policy evaluation, this blocks CloudWatch logging even if the execution role has CloudWatch permissions from other policies.

To re-enable CloudWatch logging, remove the denied log groups from the policy or delete the `DenyCloudWatchLogs` policy entirely.

## Disable CloudWatch logs

{{< tabs >}}
{{% tab "Datadog CLI" %}}

The [`datadog-ci lambda cloudwatch disable`][1] command attaches an IAM deny policy to the execution role of each specified Lambda function, blocking CloudWatch log delivery.

First, perform a dry run to preview which functions are affected:

```bash
datadog-ci lambda cloudwatch disable --dry-run -f <ARN>
```

After you confirm the output, run the command without the `--dry-run` flag:

```bash
datadog-ci lambda cloudwatch disable -f <ARN>
```

To disable CloudWatch logs for multiple functions at once, use `--functions-regex`:

```bash
datadog-ci lambda cloudwatch disable --region <region> --functions-regex <REGEX>
```

**Note**: This command requires valid AWS credentials configured in your environment. See the [Datadog Serverless CLI documentation][1] for setup details.

[1]: /serverless/libraries_integrations/cli

{{% /tab %}}
{{% tab "Terraform" %}}

Add an `aws_iam_role_policy` resource that denies CloudWatch Logs actions for the function's log group:

{{< code-block lang="hcl" >}}
resource "aws_iam_role_policy" "deny_cloudwatch_logs" {
  name = "DenyCloudWatchLogs"
  role = aws_iam_role.lambda_execution.name

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Deny"
      Action   = ["logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents"]
      Resource = "arn:aws:logs:*:*:log-group:/aws/lambda/${aws_lambda_function.example.function_name}:*"
    }]
  })
}
{{< /code-block >}}

Replace `aws_iam_role.lambda_execution` and `aws_lambda_function.example` with references to your own resources.

{{% /tab %}}
{{% tab "AWS CloudFormation" %}}

Add an `AWS::IAM::Policy` resource that denies CloudWatch Logs actions for the function's log group:

{{< code-block lang="yaml" >}}
DenyCloudWatchLogsPolicy:
  Type: AWS::IAM::Policy
  Properties:
    PolicyName: DenyCloudWatchLogs
    Roles:
      - !Ref ExampleFunctionRole
    PolicyDocument:
      Version: "2012-10-17"
      Statement:
        - Effect: Deny
          Action:
            - logs:CreateLogGroup
            - logs:CreateLogStream
            - logs:PutLogEvents
          Resource: !Sub "arn:aws:logs:*:*:log-group:/aws/lambda/${ExampleFunction}:*"
{{< /code-block >}}

Replace `ExampleFunctionRole` and `ExampleFunction` with references to your own resources.

{{% /tab %}}
{{% tab "AWS SAM" %}}

Add a deny policy statement to the `Policies` property of your `AWS::Serverless::Function` resource:

{{< code-block lang="yaml" >}}
Resources:
  ExampleFunction:
    Type: AWS::Serverless::Function
    Properties:
      # ... other configuration ...
      Policies:
        - Statement:
            - Effect: Deny
              Action:
                - logs:CreateLogGroup
                - logs:CreateLogStream
                - logs:PutLogEvents
              Resource: !Sub "arn:aws:logs:*:*:log-group:/aws/lambda/${ExampleFunction}:*"
{{< /code-block >}}

{{% /tab %}}
{{% tab "AWS CDK" %}}

Use `addToPolicy` to attach a deny statement to the function's execution role:

{{< code-block lang="typescript" >}}
import * as iam from "aws-cdk-lib/aws-iam";

fn.role?.addToPolicy(new iam.PolicyStatement({
  effect: iam.Effect.DENY,
  actions: ["logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents"],
  resources: [`arn:aws:logs:*:*:log-group:/aws/lambda/${fn.functionName}:*`],
}));
{{< /code-block >}}

{{% /tab %}}
{{% tab "Serverless Framework" %}}

Add a deny statement to `provider.iam.role.statements` in your `serverless.yml`:

{{< code-block lang="yaml" >}}
provider:
  iam:
    role:
      statements:
        - Effect: Deny
          Action:
            - logs:CreateLogGroup
            - logs:CreateLogStream
            - logs:PutLogEvents
          Resource: !Sub "arn:aws:logs:*:*:log-group:/aws/lambda/${self:service}-${sls:stage}-<FUNCTION_NAME>:*"
{{< /code-block >}}

Replace `<FUNCTION_NAME>` with the name of your function as defined in the `functions` block. By default, Serverless Framework names Lambda functions `<service>-<stage>-<functionName>`.

**Note**: This applies the deny policy to the shared execution role. To disable CloudWatch logs for all functions in the service, use a wildcard:

{{< code-block lang="yaml" >}}
Resource: !Sub "arn:aws:logs:*:*:log-group:/aws/lambda/${self:service}-${sls:stage}-*:*"
{{< /code-block >}}

{{% /tab %}}
{{% tab "AWS Console" %}}

1. Open the [IAM console][2] and navigate to **Roles**.
2. Find and select the execution role for your Lambda function.
3. Under **Permissions**, choose **Add permissions** > **Create inline policy**.
4. Switch to the **JSON** editor and paste the following policy:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Deny",
         "Action": [
           "logs:CreateLogGroup",
           "logs:CreateLogStream",
           "logs:PutLogEvents"
         ],
         "Resource": "arn:aws:logs:*:*:log-group:/aws/lambda/<FUNCTION_NAME>:*"
       }
     ]
   }
   ```
   Replace `<FUNCTION_NAME>` with the name of your Lambda function.
5. Click **Next**, name the policy `DenyCloudWatchLogs`, and click **Create policy**.

[2]: https://console.aws.amazon.com/iam/home

{{% /tab %}}
{{< /tabs >}}

## Verify log delivery

After you disable CloudWatch logs, confirm that logs are still flowing to Datadog:

1. Invoke the Lambda function.
2. In Datadog, go to [**Logs > Search**][4] and filter by `source:lambda` and the function name.
3. Verify that new log entries appear.

If logs are not appearing, re-enable CloudWatch logging and verify that `DD_SERVERLESS_LOGS_ENABLED` is set to `true` on the function.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[4]: https://app.datadoghq.com/logs
