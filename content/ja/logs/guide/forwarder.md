---
title: Datadog Forwarder
kind: documentation
dependencies:
  - "https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/README.md"
aliases:
  - /serverless/troubleshooting/installing_the_forwarder/
  - /serverless/forwarder/
  - /serverless/libraries_integrations/forwarder/
---

## Overview

The Datadog Forwarder is an AWS Lambda function that ships logs from AWS to Datadog, specifically:

- Forward CloudWatch, ELB, S3, CloudTrail, VPC, SNS, and CloudFront logs to Datadog.
- Forward S3 events to Datadog.
- Forward Kinesis data stream events to Datadog (only CloudWatch logs are supported).
- Forward metrics, traces, and logs from AWS Lambda functions to Datadog. Datadog recommends you use the [Datadog Lambda Extension][1] to monitor your Lambda functions.

For Serverless customers using the Forwarder to forward metrics, traces, and logs from AWS Lambda logs to Datadog, you should [migrate to the Datadog Lambda Extension][3] to collect telemetry directly from the Lambda execution environments. The Forwarder is still available for use in Serverless Monitoring, but will not be updated to support the latest features.

For more information about sending AWS services logs with the Datadog Forwarder, read the [Send AWS Services Logs with the Datadog Lambda Function guide][2].

## Installation

Datadog recommends using [CloudFormation](#cloudformation) to automatically install the Forwarder. You can also complete the setup process using [Terraform](#terraform) or [manually](#manual). Once installed, you can subscribe the Forwarder to log sources such as S3 buckets or CloudWatch log groups by [setting up triggers][4].

{{< tabs >}}
{{% tab "CloudFormation" %}}

### CloudFormation

[![Launch Stack](https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png)](https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?stackName=datadog-forwarder&templateURL=https://datadog-cloudformation-template.s3.amazonaws.com/aws/forwarder/latest.yaml)

1. Log into your admin AWS account or role and deploy the CloudFormation Stack with the button above.
2. Fill in `DdApiKey` and select the appropriate `DdSite`. All other parameters are optional.
3. Click **Create stack**, and wait for the creation to complete.
4. Find the installed forwarder Lambda function under the stack's "Resources" tab with logical ID `Forwarder`.
5. [Set up triggers to the installed Forwarder][101].
6. Repeat the steps above in another region if you operate in multiple AWS regions.

If you had previously enabled your AWS Integration using the [following CloudFormation template][102] from your AWS integration page in Datadog, your account may already be provisioned with a Datadog Lambda Forwarder function if you decided to include it. In that case, you will only need to install the Datadog Lambda in additional AWS regions in your account where you wish to export logs.

**Note**: The Datadog Lambda Forwarder function code block is expected to be empty, as the logic is implemented through a Lambda layer.

[101]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#set-up-triggers
[102]: https://github.com/DataDog/cloudformation-template/tree/master/aws

{{% /tab %}}
{{% tab "Terraform" %}}

### Terraform

Install the Forwarder using the Terraform resource [`aws_cloudformation_stack`][101] as a wrapper on top of the provided CloudFormation template.

Datadog recommends creating separate Terraform configurations:

- Use the first one to store the [Datadog API key][102] in the AWS Secrets Manager, and note down the secrets ARN from the output of apply.
- Then, create a configuration for the forwarder and supply the secrets ARN through the `DdApiKeySecretArn` parameter.
- Finally, create a configuration to [set up triggers on the Forwarder][103].

By separating the configurations of the API key and the forwarder, you do not have to provide the Datadog API key when updating the forwarder. To update or upgrade the forwarder in the future, apply the forwarder configuration again.

#### Sample configuration

```tf
# Store Datadog API key in AWS Secrets Manager
variable "dd_api_key" {
  type        = string
  description = "Datadog API key"
}

resource "aws_secretsmanager_secret" "dd_api_key" {
  name        = "datadog_api_key"
  description = "Encrypted Datadog API Key"
}

resource "aws_secretsmanager_secret_version" "dd_api_key" {
  secret_id     = aws_secretsmanager_secret.dd_api_key.id
  secret_string = var.dd_api_key
}

output "dd_api_key" {
  value = aws_secretsmanager_secret.dd_api_key.arn
}
```

```tf
# Use the Datadog Forwarder to ship logs from S3 and CloudWatch, as well as observability data from Lambda functions to Datadog. For more information, see https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring
resource "aws_cloudformation_stack" "datadog_forwarder" {
  name         = "datadog-forwarder"
  capabilities = ["CAPABILITY_IAM", "CAPABILITY_NAMED_IAM", "CAPABILITY_AUTO_EXPAND"]
  parameters   = {
    DdApiKeySecretArn  = "REPLACE ME WITH THE SECRETS ARN",
    DdSite             = "<SITE>",
    FunctionName       = "datadog-forwarder"
  }
  template_url = "https://datadog-cloudformation-template.s3.amazonaws.com/aws/forwarder/latest.yaml"
}
```

**Note**: Ensure that the `DdSite` parameter matches your [Datadog site][104]. Select your site on the right side of this page. Replace `<SITE>` in the above sample configuration with {{< region-param key="dd_site" code="true" >}}.

[101]: https://www.terraform.io/docs/providers/aws/r/cloudformation_stack
[102]: https://app.datadoghq.com/organization-settings/api-keys
[103]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#set-up-triggers
[104]: https://docs.datadoghq.com/getting_started/site/#access-the-datadog-site

{{% /tab %}}
{{% tab "Manual" %}}

### Manual

If you can't install the Forwarder using the provided CloudFormation template, you can install the Forwarder manually following the steps below. Feel free to open an issue or pull request to let us know if there is anything we can improve to make the template work for you.

1. Create a Python 3.10 Lambda function using `aws-dd-forwarder-<VERSION>.zip` from the latest [releases][101].
2. Save your [Datadog API key][102] in AWS Secrets Manager, set environment variable `DD_API_KEY_SECRET_ARN` with the secret ARN on the Lambda function, and add the `secretsmanager:GetSecretValue` permission to the Lambda execution role.
3. If you need to forward logs from S3 buckets, add the `s3:GetObject` permission to the Lambda execution role.
4. Set the environment variable `DD_ENHANCED_METRICS` to `false` on the Forwarder. This stops the Forwarder from generating enhanced metrics itself, but it will still forward custom metrics from other lambdas.
5. Some AWS accounts are configured such that triggers will not automatically create resource-based policies allowing Cloudwatch log groups to invoke the forwarder. Reference the [CloudWatchLogPermissions][103] to see which permissions are required for the forwarder to be invoked by Cloudwatch Log Events.
6. [Configure triggers][104].
7. Create an S3 bucket, and set environment variable `DD_S3_BUCKET_NAME` to the bucket name. Also provide `s3:GetObject`, `s3:PutObject`, `s3:ListBucket`, and `s3:DeleteObject` permissions on this bucket to the Lambda execution role. This bucket is used to store the different tags cache i.e. Lambda, S3, Step Function and Log Group. Additionally, this bucket will be used to store unforwarded events incase of forwarding exceptions.
8. Set environment variable `DD_STORE_FAILED_EVENTS` to `true` to enable the forwarder to also store event data in the S3 bucket. In case of exceptions when sending logs, metrics or traces to intake, the forwarder will store relevant data in the S3 bucket. On custom invocations i.e. on receiving an event with the `retry` keyword set to a non empty string (which can be manually triggered - see below), the forwarder will retry sending the stored events. When successful it will clear up the storage in the bucket.

```bash
aws lambda invoke --function-name <function-name> --payload '{"retry":"true"}' out
```

[101]: https://github.com/DataDog/datadog-serverless-functions/releases
[102]: https://app.datadoghq.com/organization-settings/api-keys
[103]: https://github.com/DataDog/datadog-serverless-functions/blob/029bd46e5c6d4e8b1ae647ed3b4d1917ac3cd793/aws/logs_monitoring/template.yaml#L680
[104]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#set-up-triggers

{{% /tab %}}
{{< /tabs >}}

### Upgrade to a new version

1. Find the [datadog-forwarder (if you didn't rename it)][5] CloudFormation stack. If you installed the Forwarder as part of the [Datadog AWS integration stack][6], make sure to update the nested Forwarder stack instead of the root stack.
2. Find the actual Forwarder Lambda function from the CloudFormation stack's "Resources" tab, navigate to its configuration page. Note down the value of the tag `dd_forwarder_version`, such as `3.73.0`, in case you run into issues with the new version and need to rollback.
3. Update the stack using template `https://datadog-cloudformation-template.s3.amazonaws.com/aws/forwarder/latest.yaml`. You can also replace `latest` with a specific version, such as `3.73.0.yaml`, if needed. Make sure to review the changesets before applying the update.

If you encounter issues upgrading to the latest version, check the Troubleshooting section.

### Upgrade an older version to +3.107.0

Starting version 3.107.0 a new feature is added to enable Lambda function to store unforwarded events incase of exceptions on the intake point. If the feature is enabled using `DD_STORE_FAILED_EVENTS` env var, failing events will be stored under a defined dir in the same S3 bucket used to store tags cache. The same bucket can be used to store logs from several Lambda functions under unique subdirs.

### Upgrade an older version to +3.106.0

Starting version 3.106.0 Lambda function has been updated to add a prefix to cache filenames stored in the S3 bucket configured in `DD_S3_BUCKET_NAME`. This allows to use the same bucket to store cache files from several functions.  
Additionally, starting this version, the forwarder will attach custom S3 bucket tags by default to all logs exported to S3. For example, if a service is configured to send logs to a destiantion S3 bucket, the forwarder will add the bucket's tags to the logs while pulling and forwarding the logs.

### Upgrade an older version to +3.99.0

Since version 3.99.0 the Lambda function has been updated to require **Python 3.11**. If upgrading an older forwarder installation to +3.99.0 or above, ensure the AWS Lambda function is configured to use Python 3.11

### Upgrade an older version to +3.98.0

Since version 3.98.0 the Lambda function has been updated to require **Python 3.10**. If upgrading an older forwarder installation to 3.98.0 or above, ensure the AWS Lambda function is configured to use Python 3.10

### Upgrade an older version to +3.74.0

Since version 3.74.0 the Lambda function has been updated to require **Python 3.9**. If upgrading an older forwarder installation to 3.74.0 or above, ensure the AWS Lambda function is configured to use Python 3.9

### Upgrade an older version to +3.49.0

Since version 3.49.0 the Lambda function has been updated to require **Python 3.8**. If upgrading an older forwarder installation to 3.49.0 or above, ensure the AWS Lambda function is configured to use Python 3.8

### Upgrade an older version to +3.0.0

Since version 3.0.0, the forwarder Lambda function is managed by CloudFormation. To upgrade an older forwarder installation to 3.0.0 and above, follow the steps below.

1. Install a new Forwarder following the [installation](#installation) steps.
2. Find the installed forwarder Lambda function under the stack's "Resources" tab with logical ID `Forwarder`.
3. Manually migrate a few triggers (CloudWatch log group subscription filter and S3 bucket event notification) on the old forwarder to the new one.
4. Ensure the new forwarder is working as expected, for example, being invoked regularly without errors.
5. Ensure the logs from the migrated triggers (sources) are showing up in Datadog log explorer and look right to you.
6. Migrate all triggers to the new forwarder.
   - If you have been letting Datadog manage triggers [automatically][6] for you, update the forwarder Lambda ARN in AWS integration page **Log Collection** tab.
   - If you have been manage the triggers [manually][7], then you have to migrate them manually (or using a script).
7. Ensure the old forwarder Lambda function's invocations count drops to zero.
8. Delete the old forwarder Lambda function when you feel comfortable.
9. If you have old forwarder Lambda functions installed in multiple AWS accounts and regions, repeat the steps above in every account and region combination.

### Deleting

To safely delete the forwarder and other AWS resources created by the forwarder CloudFormation stack, follow the steps below.

1. Find the [datadog-forwarder (if you didn't rename it)][5] CloudFormation stack. Or you can find the stack from the Forwarder Lambda function's management console by clicking the link from the message "This function belongs to an application. Click here to manage it.", and then click the "Deployments" tab on the application page.
2. "Delete" the CloudFormation stack.

### Adjusting forwarder settings

1. Find the [datadog-forwarder (if you didn't rename it)][5] CloudFormation stack.
2. Update the stack using the current template.
3. Adjust parameter values.

Datadog recommends adjusting your Forwarder settings through CloudFormation rather than directly editing the Lambda function. Find the description of settings in the [`template.yaml` file][8] and the CloudFormation stack creation user interface when you launch the stack. Feel free to submit a pull request to make additional settings adjustable through the template.

## Troubleshooting

Don't forget to check if the issue has already been fixed in the recent [releases][9].

### Logging

Set the environment variable `DD_LOG_LEVEL` to `debug` on the Forwarder Lambda function to enable detailed logging temporarily (don't forget to remove it). The debugging logs should be able to show you the exact event payload the Lambda function receives and the data (log, metric or trace) payload that is sent to Datadog.

You can also add additional logging or code for deeper investigation. Find instructions for building Forwarder code with local changes from the [contributing](#contributing) section.

### Issue updating the forwarder

Manually updating the `.zip` code of the Forwarder may cause conflicts with Cloudformation updates for Forwarder installations where the code is packaged in a Lambda layer (default installation choice from version `3.33.0`) and cause invocation errors. In this case, updating the stack through Cloudformation to the latest available twice in a row (first with `InstallAsLayer` set to `false`, and then to `true`) should solve the issue as it will remove any `.zip` remnants and install the latest layer available.

If you still couldn't figure out, please create a ticket for [Datadog Support][10] with a copy of debugging logs.

### JSON-formatted logs are not appearing in Datadog

If your logs contain an attribute that Datadog parses as a timestamp, you need to make sure that the timestamp is both current and in the correct format. See [Log Date Remapper][24] to learn about which attributes are parsed as timestamps and how to make sure that the timestamp is valid.

### Issue creating S3 triggers

In case you encounter the following error when creating S3 triggers, we recommend considering following a fanout architecture proposed by AWS [in this article](https://aws.amazon.com/blogs/compute/fanout-s3-event-notifications-to-multiple-endpoints/)

```
An error occurred when creating the trigger: Configuration is ambiguously defined. Cannot have overlapping suffixes in two rules if the prefixes are overlapping for the same event type.
```

## Contributing

We love pull requests. Here's a quick guide.

1. If you would like to discuss a feature or bug fix before implementing, find us in the `#serverless` channel of the [Datadog Slack community][11].
1. Fork, clone, and create a branch:
   ```bash
   git clone git@github.com:<your-username>/datadog-serverless-functions.git
   git checkout -b <my-branch>
   ```
1. Make code changes.
1. Build with your local changes.
   ```bash
   cd aws/logs_monitoring
   ./tools/build_bundle.sh <SEMANTIC_VERSION> # any unique version is fine
   ```
1. Update your testing Forwarder with the modified code and test:
   ```bash
   # Upload in the AWS Lambda console if you don't have AWS CLI
   aws lambda update-function-code \
       --region <AWS_REGION> \
       --function-name <FORWARDER_NAME> \
       --zip-file fileb://.forwarder/aws-dd-forwarder-<SEMANTIC_VERSION>.zip
   ```
1. Run unit tests.
   ```
   python -m unittest discover . # for code in Python
   ./trace_forwarder/scripts/run_tests.sh # for code in Go
   ```
1. Run the integration tests.

   ```bash
   ./tools/integration_tests/integration_tests.sh

   # to update the snapshots if changes are expected
   ./tools/integration_tests/integration_tests.sh --update
   ```

1. If you changes affect the CloudFormation template, run the installation test against your own AWS account.
   ```bash
   ./tools/installation_test.sh
   ```
1. Push to your fork and [submit a pull request][12].

## Advanced

### Shipping logs to multiple destinations

If you need to ship logs to multiple Datadog organizations or other destinations, configure the `AdditionalTargetLambdaArns` Cloudformation parameter to let the Datadog Forwarder copy the incoming logs to the specified Lambda functions. These additional Lambda functions will be called asynchronously with the exact same `event` the Datadog Forwarder receives.

### AWS PrivateLink support

You can run the Forwarder in a VPC private subnet and send data to Datadog over AWS PrivateLink. AWS PrivateLink can only be configured with [Datadog sites][13] hosted on AWS (for example: `datadoghq.com`, not `datadoghq.eu`).

1. Follow [these instructions][14] to add the Datadog `api`, `http-logs.intake`, and `trace.agent` endpoints to your VPC.
2. Follow the [instructions][15] to add the AWS Secrets Manager and S3 endpoints to your VPC.
3. When installing the Forwarder with the CloudFormation template:
   1. Set `UseVPC` to `true`.
   2. Set `VPCSecurityGroupIds` and `VPCSubnetIds` based on your VPC settings.
   3. Set `DdFetchLambdaTags` to `false`, because AWS Resource Groups Tagging API doesn't support PrivateLink.

#### DdUsePrivateLink is deprecated

The `DdUsePrivateLink` option has been deprecated since [v3.41.0][16]. This option was previously used to instruct the Forwarder to use a special set of PrivateLink endpoints for data intake: `pvtlink.api.{{< region-param key="dd_site" code="true" >}}`, `api-pvtlink.logs.{{< region-param key="dd_site" code="true" >}}`, and `trace-pvtlink.agent.{{< region-param key="dd_site" code="true" >}}`. Since v3.41.0, the Forwarder can send data over PrivateLink to Datadog using the regular DNS names of intake endpoints: `api.{{< region-param key="dd_site" code="true" >}}`, `http-intake.logs.{{< region-param key="dd_site" code="true" >}}`, and `trace.agent.{{< region-param key="dd_site" code="true" >}}`. Therefore, the `DdUsePrivateLink` option is no longer needed.

If you have an older deployment of the Forwarder with `DdUsePrivateLink` set to `true`, then you may find mismatches between your configured PrivateLink endpoints and the [ones documented in Datadog][14], which is expected. Although the older PrivateLink endpoints were removed from that doc, they remain to function. When upgrading the Forwarder, there is no change required, that is, you can keep `DdUsePrivateLink` enabled and continue to use the older endpoints.

However, if you are interested in switching to the new endpoints, you need to follow the updated instructions above to:

1. Set up the new endpoints to `api.{{< region-param key="dd_site" code="true" >}}`, `http-intake.logs.{{< region-param key="dd_site" code="true" >}}`, and `trace.agent.{{< region-param key="dd_site" code="true" >}}`.
2. Set `DdUseVPC` to `true`.
3. Set `DdUsePrivateLink` to `false`.

### AWS VPC and proxy support

If you must deploy the Forwarder to a VPC without direct public internet access, and you cannot use AWS PrivateLink to connect to Datadog (for example, if your organization is hosted on the Datadog EU site: `datadoghq.eu`), then you can send data through a proxy.

1. Unless the Forwarder is deployed to a public subnet, follow the [instructions][15] to add endpoints for Secrets Manager and S3 to the VPC, so that the Forwarder can access those services.
2. Update your proxy with following configurations ([HAProxy][17] or [NGINX][18]). If you are using another proxy, or Web Proxy, allowlist the Datadog domain, for example: `.{{< region-param key="dd_site" code="true" >}}`.
3. When installing the Forwarder with the CloudFormation template, set `DdUseVPC`, `VPCSecurityGroupIds`, and `VPCSubnetIds`.
4. Ensure the `DdFetchLambdaTags` option is disabled, because AWS VPC does not yet offer an endpoint for the Resource Groups Tagging API.
5. If you are using HAProxy or NGINX:

- Set `DdApiUrl` to `http://<proxy_host>:3834` or `https://<proxy_host>:3834`.
- Set `DdTraceIntakeUrl` to `http://<proxy_host>:3835` or `https://<proxy_host>:3835`.
- Set `DdUrl` to `<proxy_host>` and `DdPort` to `3837`.

Otherwise, if you are using Web Proxy:

- Set `DdHttpProxyURL` to your proxy endpoint, for example: `http://<proxy_host>:<port>`, or, if your proxy has a username and password, `http://<username>:<password>@<proxy_host>:<port>`.

7. Set `DdNoSsl` to `true` if connecting to the proxy using `http`.
8. Set `DdSkipSslValidation` to `true` if connecting to the proxy using `https` with a self-signed certificate.

### Code signing

The Datadog Forwarder is signed by Datadog. To verify the integrity of the Forwarder, use the manual installation method. [Create a Code Signing Configuration][19] that includes Datadog’s Signing Profile ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) and associate it with the Forwarder Lambda function before uploading the Forwarder ZIP file.

## CloudFormation parameters

### Required

`DdApiKey`
: Your [Datadog API key][20], which can be found under **Organization Settings** > **API Keys**. The API Key is stored in AWS Secrets Manager. If you already have a Datadog API Key stored in Secrets Manager, use `DdApiKeySecretArn` instead.

`DdApiKeySecretArn`
: The ARN of the secret storing the Datadog API key, if you already have it stored in Secrets Manager. You must store the secret as a plaintext, rather than a key-value pair.

`DdSite`
: The [Datadog site][13] that your metrics and logs will be sent to. Your Datadog site is {{< region-param key="dd_site" code="true" >}}.

### Lambda function (optional)

`FunctionName`
: The name of the Datadog Forwarder Lambda function. Do not change this when updating an existing CloudFormation stack, otherwise the current forwarder function will be replaced and all the triggers will be lost.

`MemorySize`
: Memory size for the Datadog Forwarder Lambda function.

`Timeout`
: Timeout for the Datadog Forwarder Lambda function.

`ReservedConcurrency`
: Reserved concurrency for the Datadog Forwarder Lambda function. If empty, use unreserved account concurrency.
Datadog recommends using at least 10 reserved concurrency, but this defaults to 0 as you may need to increase your limits. If using unreserved account concurrency, you may limit other Lambda functions in your environment.

`LogRetentionInDays`
: CloudWatch log retention for logs generated by the Datadog Forwarder Lambda function.

### Log forwarding (optional)

`DdTags`
: Add custom tags to forwarded logs, comma-delimited string, no trailing comma, such as `env:prod,stack:classic`.

`DdMultilineLogRegexPattern`
: Use the supplied regular expression to detect for a new log line for multiline logs from S3, such as `\d{2}\/\d{2}\/\d{4}` for multiline logs beginning with pattern "11/10/2014".

`DdUseTcp`
: By default, the forwarder sends logs using HTTPS through the port 443. To send logs over an
SSL encrypted TCP connection, set this parameter to true.

`DdNoSsl`
: Disable SSL when forwarding logs, set to true when forwarding logs through a proxy.

`DdUrl`
: The endpoint URL to forward the logs to, useful for forwarding logs through a proxy.

`DdPort`
: The endpoint port to forward the logs to, useful for forwarding logs through a proxy.

`DdSkipSslValidation`
: Send logs over HTTPS, while not validating the certificate provided by the endpoint. This will still encrypt the traffic between the forwarder and the log intake endpoint, but will not verify if the destination SSL certificate is valid.

`DdUseCompression`
: Set to false to disable log compression. Only valid when sending logs over HTTP.

`DdCompressionLevel`
: Set the compression level from 0 (no compression) to 9 (best compression). The default compression level is 6. You may see some benefit with regard to decreased outbound network traffic if you increase the compression level, at the expense of increased Forwarder execution duration.

`DdForwardLog`
: Set to false to disable log forwarding, while continuing to forward other observability data, such as metrics and traces from Lambda functions.

`DdFetchLambdaTags`
: Let the Forwarder fetch Lambda tags using GetResources API calls and apply them to logs, metrics, and traces. If set to true, permission `tag:GetResources` will be automatically added to the Lambda execution IAM role.

`DdFetchLogGroupTags`
: Let the forwarder fetch Log Group tags using ListTagsLogGroup and apply them to logs, metrics, and traces. If set to true, permission `logs:ListTagsLogGroup` will be automatically added to the Lambda execution IAM role.

`DdFetchStepFunctionsTags`
: Let the Forwarder fetch Step Functions tags using GetResources API calls and apply them to logs and traces (if Step Functions tracing is enabled). If set to true, permission `tag:GetResources` will be automatically added to the Lambda execution IAM role.

### Log scrubbing (optional)

`RedactIp`
: Replace text matching `\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}` with `xxx.xxx.xxx.xxx`.

`RedactEmail`
: Replace text matching `[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+` with `xxxxx@xxxxx.com`.

`DdScrubbingRule`
: Replace text matching the supplied regular expression with `xxxxx` (default) or `DdScrubbingRuleReplacement` (if supplied). Log scrubbing rule is applied to the full JSON-formatted log, including any metadata that is automatically added by the Lambda function. Each instance of a pattern match is replaced until no more matches are found in each log. Using inefficient regular expression, such as `.*`, may slow down the Lambda function.

`DdScrubbingRuleReplacement`
: Replace text matching DdScrubbingRule with the supplied text.

### Log filtering (optional)

`ExcludeAtMatch`
: Do not send logs matching the supplied regular expression. If a log matches both the `ExcludeAtMatch` and `IncludeAtMatch`, it is excluded.

`IncludeAtMatch`
: Only send logs matching the supplied regular expression, and not excluded by `ExcludeAtMatch`.

Filtering rules are applied to the full JSON-formatted log, including any metadata that is automatically added by the Forwarder. However, transformations applied by [log pipelines][21], which occur after logs are sent to Datadog, cannot be used to filter logs in the Forwarder. Using an inefficient regular expression, such as `.*`, may slow down the Forwarder.

Some examples of regular expressions that can be used for log filtering:

- Include (or exclude) Lambda platform logs: `"(START|END) RequestId:\s`. The preceding `"` is needed to match the start of the log message, which is in a JSON blob (`{"message": "START RequestId...."}`). Datadog recommends keeping the `REPORT` logs, as they are used to populate the invocations list in the serverless function views.
- Include CloudTrail error messages only: `errorMessage`.
- Include only logs containing an HTTP 4XX or 5XX error code: `\b[4|5][0-9][0-9]\b`.
- Include only CloudWatch logs where the `message` field contains a specific JSON key/value pair: `\"awsRegion\":\"us-east-1\"`.
  - The message field of a CloudWatch log event is encoded as a string. For example,`{"awsRegion": "us-east-1"}` is encoded as `{\"awsRegion\":\"us-east-1\"}`. Therefore, the pattern you provide must include `\` escape characters, like this: `\"awsRegion\":\"us-east-1\"`.

To test different patterns against your logs, turn on [debug logs](#troubleshooting).

### Advanced (optional)

`SourceZipUrl`
: Do not change unless you know what you are doing. Override the default location of the function source code.

`PermissionsBoundaryArn`
: ARN for the Permissions Boundary Policy.

`DdUsePrivateLink` (DEPRECATED)
: Set to true to enable sending logs and metrics through AWS PrivateLink. See [Connect to Datadog over AWS PrivateLink][2].

`DdHttpProxyURL`
: Sets the standard web proxy environment variables HTTP_PROXY and HTTPS_PROXY. These are the URL endpoints your proxy server exposes. Do not use this in combination with AWS Private Link. Make sure to also set `DdSkipSslValidation` to true.

`DdNoProxy`
: Sets the standard web proxy environment variable `NO_PROXY`. It is a comma-separated list of domain names that should be excluded from the web proxy.

`VPCSecurityGroupIds`
: Comma separated list of VPC Security Group IDs. Used when AWS PrivateLink is enabled.

`VPCSubnetIds`
: Comma separated list of VPC Subnet IDs. Used when AWS PrivateLink is enabled.

`AdditionalTargetLambdaArns`
: Comma separated list of Lambda ARNs that will get called asynchronously with the same `event` the Datadog Forwarder receives.

`InstallAsLayer`
: Whether to use the layer-based installation flow. Set to false to use the legacy installation flow, which installs a second function that copies the forwarder code from GitHub to an S3 bucket. Defaults to true.

`LayerARN`
: ARN for the layer containing the forwarder code. If empty, the script will use the version of the layer the forwarder was published with. Defaults to empty.

## Permissions

To deploy the CloudFormation Stack with the default options, you need to have the permissions below to save your Datadog API key as a secret and create an S3 bucket to store the Forwarder's code (ZIP file), and create Lambda functions (including execution roles and log groups).

**IAM statements**:

```json
{
  "Effect": "Allow",
  "Action": [
    "cloudformation:*",
    "secretsmanager:CreateSecret",
    "secretsmanager:TagResource",
    "s3:CreateBucket",
    "s3:GetObject",
    "s3:PutEncryptionConfiguration",
    "s3:PutBucketPublicAccessBlock",
    "iam:CreateRole",
    "iam:GetRole",
    "iam:PassRole",
    "iam:PutRolePolicy",
    "iam:AttachRolePolicy",
    "lambda:CreateFunction",
    "lambda:GetFunction",
    "lambda:GetFunctionConfiguration",
    "lambda:GetLayerVersion",
    "lambda:InvokeFunction",
    "lambda:PutFunctionConcurrency",
    "lambda:AddPermission",
    "lambda:TagResource",
    "logs:CreateLogGroup",
    "logs:DescribeLogGroups",
    "logs:PutRetentionPolicy"
  ],
  "Resource": "*"
}
```

The following capabilities are required when creating a CloudFormation stack:

- CAPABILITY_AUTO_EXPAND, because the forwarder template uses macros such as the [AWS SAM macro][23].
- CAPABILTY_IAM/NAMED_IAM, because the Forwarder creates IAM roles.

The CloudFormation Stack creates following IAM roles:

- ForwarderRole: The execution role for the Forwarder Lambda function to read logs from S3, fetch your Datadog API key from Secrets Manager, and write its own logs.

**IAM statements**

```json
[
  {
    "Effect": "Allow",
    "Action": [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ],
    "Resource": "*"
  },
  {
    "Action": ["s3:GetObject"],
    "Resource": "arn:aws:s3:::*",
    "Effect": "Allow"
  },
  {
    "Action": ["secretsmanager:GetSecretValue"],
    "Resource": "<ARN of DdApiKeySecret>",
    "Effect": "Allow"
  }
]
```

- `ForwarderZipCopierRole`: The execution role for the ForwarderZipCopier Lambda function to download the Forwarder deployment ZIP file to a S3 bucket.

**IAM statements**:

```json
[
  {
    "Effect": "Allow",
    "Action": [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ],
    "Resource": "*"
  },
  {
    "Action": ["s3:PutObject", "s3:DeleteObject"],
    "Resource": "<S3Bucket to Store the Forwarder Zip>",
    "Effect": "Allow"
  },
  {
    "Action": ["s3:ListBucket"],
    "Resource": "<S3Bucket to Store the Forwarder Zip>",
    "Effect": "Allow"
  }
]
```

## Further Reading

Additional helpful documentation, links, and articles:

- [Send AWS Services Logs With The Datadog Lambda Function][2]

[1]: https://github.com/DataDog/datadog-lambda-extension
[2]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[3]: https://docs.datadoghq.com/serverless/guide/extension_motivation/
[4]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#set-up-triggers
[5]: https://console.aws.amazon.com/cloudformation/home#/stacks?filteringText=forwarder
[6]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#automatically-set-up-triggers
[7]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#manually-set-up-triggers
[8]: https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/template.yaml
[9]: https://github.com/DataDog/datadog-serverless-functions/releases
[10]: https://docs.datadoghq.com/help/
[11]: https://chat.datadoghq.com/
[12]: https://github.com/your-username/datadog-serverless-functions/compare/datadog:master...master
[13]: https://docs.datadoghq.com/getting_started/site/
[14]: https://docs.datadoghq.com/agent/guide/private-link/?tab=logs#create-your-vpc-endpoint
[15]: https://docs.aws.amazon.com/vpc/latest/userguide/vpce-interface.html#create-interface-endpoint
[16]: https://github.com/DataDog/datadog-serverless-functions/releases/tag/aws-dd-forwarder-3.41.0
[17]: https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/proxy_conf/haproxy.txt
[18]: https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/proxy_conf/nginx.txt
[19]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-console
[20]: https://app.datadoghq.com/organization-settings/api-keys
[21]: https://docs.datadoghq.com/logs/processing/pipelines/
[22]: https://docs.datadoghq.com/agent/guide/private-link/
[23]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-aws-serverless.html
[24]: https://docs.datadoghq.com/logs/log_configuration/processors/?tab=ui#log-date-remapper
