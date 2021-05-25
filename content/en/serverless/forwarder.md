---
aliases:
- /serverless/troubleshooting/installing_the_forwarder/
dependencies:
- https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/README.md
kind: documentation
title: Datadog Forwarder
---
The Datadog Forwarder is an AWS Lambda function that ships logs, custom metrics, and traces from your environment to Datadog. The Forwarder can:

- Forward CloudWatch, ELB, S3, CloudTrail, VPC, SNS, and CloudFront logs to Datadog
- Forward S3 events to Datadog
- Forward Kinesis data stream events to Datadog (only CloudWatch logs are supported)
- Forward custom metrics from AWS Lambda functions using CloudWatch logs
- Forward traces from AWS Lambda functions using CloudWatch logs
- Generate and submit enhanced Lambda metrics (`aws.lambda.enhanced.*`) parsed from the AWS REPORT log: duration, billed_duration, max_memory_used, timeouts, out_of_memory, and estimated_cost

For additional information on sending AWS services logs with the Datadog Forwarder, see [here][1].

## Installation

Datadog recommends using [CloudFormation](#cloudformation) to automatically install the Forwarder. You can also complete the setup process using [Terraform](#terraform) or [manually](#manual).

Once installed, you can subscribe the Forwarder to log sources, such as S3 buckets or CloudWatch log groups following the [instructions][2].

<!-- xxx tabs xxx -->
<!-- xxx tab "CloudFormation" xxx -->
### CloudFormation

[![Launch Stack][3]](https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?stackName=datadog-forwarder&templateURL=https://datadog-cloudformation-template.s3.amazonaws.com/aws/forwarder/latest.yaml)

1. Log into your admin AWS account/role and deploy the CloudFormation Stack with the button above.
2. Fill in `DdApiKey` and select the appropriate `DdSite`. All other parameters are optional.
3. Click **Create stack**, and wait for the creation to complete.
4. Find the installed forwarder Lambda function under the stack's "Resources" tab with logical ID `Forwarder`.
5. [Set up triggers to the installed Forwarder][4].
6. Repeat the above steps in another region if you operate in multiple AWS regions.

**Note:** If you had previously enabled your AWS Integration using the following [CloudFormation template][5] from your AWS integration tile in Datadog, your account should already be provisioned with a Datadog Lambda Forwarder function.

<!-- xxz tab xxx -->
<!-- xxx tab "Terraform" xxx -->
### Terraform

Install the Forwarder using the Terraform resource [aws_cloudformation_stack][6] as a wrapper on top of the provided CloudFormation template.

Datadog recommends creating two separate Terraform configurations:

- Use the first one to store the Datadog API key in the AWS Secrets Manager, and note down the secrets ARN from the output of apply.
- Then create another configuration for the forwarder and supply the secrets ARN through the `DdApiKeySecretArn` parameter.

Separating the configurations of the API key and the forwarder means that you don't need to provide the Datadog API key when updating the forwarder.

**Note:** The `DdApiKey` parameter is required by the CloudFormation template, so you need to give it a placeholder value (any value) to apply. To update or upgrade the forwarder in the future, apply the forwarder configuration again.

#### Sample Configuration

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
# Datadog Forwarder to ship logs from S3 and CloudWatch, as well as observability data from Lambda functions to Datadog.
# https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring
resource "aws_cloudformation_stack" "datadog_forwarder" {
  name         = "datadog-forwarder"
  capabilities = ["CAPABILITY_IAM", "CAPABILITY_NAMED_IAM", "CAPABILITY_AUTO_EXPAND"]
  parameters   = {
    DdApiKeySecretArn  = "REPLACE ME WITH THE SECRETS ARN"
    FunctionName       = "datadog-forwarder"
  }
  template_url = "https://datadog-cloudformation-template.s3.amazonaws.com/aws/forwarder/latest.yaml"
}
```

<!-- xxz tab xxx -->
<!-- xxx tab "Manual" xxx -->
### Manual

If you can't install the Forwarder using the provided CloudFormation template, you can install the Forwarder manually following the steps below. Feel free to open an issue or pull request to let us know if there is anything we can improve to make the template work for you.

1. Create a Python 3.7 Lambda function using `aws-dd-forwarder-<VERSION>.zip` from the latest [releases][7].
2. Save your Datadog API key in AWS Secrets Manager, set environment variable `DD_API_KEY_SECRET_ARN` with the secret ARN on the Lambda function, and add the `secretsmanager:GetSecretValue` permission to the Lambda execution role.
3. If you need to forward logs from S3 buckets, add the `s3:GetObject` permission to the Lambda execution role.
4. Set the environment variable `DD_ENHANCED_METRICS` to `false` on the Forwarder. This stops the Forwarder from generating enhanced metrics itself, but it will still forward custom metrics from other lambdas.
5. Configure [triggers][8].
6. Create an S3 bucket, and set environment variable `DD_S3_BUCKET_NAME` to the bucket name. Also provide `s3:GetObject`, `s3:PutObject`, and `s3:DeleteObject` permissions on this bucket to the Lambda execution role. This bucket is used to store the Lambda tags cache.

<!-- xxz tab xxx -->
<!-- xxz tabs xxx -->

### Upgrade to a new version

1. Find the [datadog-forwarder (if you didn't rename it)][9] CloudFormation stack. If you installed the Forwarder as part of the [Datadog AWS integration stack][10], make sure to update the nested Forwarder stack instead of the root stack.
2. Find the actual Forwarder Lambda function from the CloudFormation stack's "Resources" tab, navigate to its configuration page. Note down the value of the tag `dd_forwarder_version`, e.g., `3.3.0`, in case you run into issues with the new version and need to rollback.
3. Update the stack using template `https://datadog-cloudformation-template.s3.amazonaws.com/aws/forwarder/latest.yaml`. You can also replace `latest` with a specific version, e.g., `3.0.2.yaml`, if needed. Make sure to review the changesets before applying the update.

### Upgrade an older version to +3.0.0

Since version 3.0.0, the forwarder Lambda function is managed by CloudFormation. To upgrade an older forwarder installation to 3.0.0 and above, follow the steps below.

1. Install a new Forwarder following the [installation](#installation) steps.
2. Find the installed forwarder Lambda function under the stack's "Resources" tab with logical ID `Forwarder`.
3. Manually migrate a few triggers (CloudWatch log group subscription filter and S3 bucket event notification) on the old forwarder to the new one.
4. Ensure the new forwarder is working as expected, i.e., being invoked regularly without errors.
5. Ensure the logs from the migrated triggers (sources) are showing up in Datadog log explorer and look right to you.
6. Migrate all triggers to the new forwarder.
   - If you have been letting Datadog manage triggers [automatically][11] for you, update the forwarder Lambda ARN in AWS integration tile "Collect Logs" tab.
   - If you have been manage the triggers [manually][12], then you have to migrate them manually (or using a script).
7. Ensure the old forwarder Lambda function's invocations count drops to zero.
8. Delete the old forwarder Lambda function when you feel comfortable.
9. If you have old forwarder Lambda functions installed in multiple AWS accounts and regions, repeat the steps above in every account and region combination.

### Deleting

To safely delete the forwarder and other AWS resources created by the forwarder CloudFormation stack, follow the steps below.

1. Find the [datadog-forwarder (if you didn't rename it)][9] CloudFormation stack. Or you can find the stack from the Forwarder Lambda function's management console by clicking the link from the message "This function belongs to an application. Click here to manage it.", and then click the "Deployments" tab on the application page.
2. "Delete" the CloudFormation stack.

### Adjusting forwarder settings

1. Find the [datadog-forwarder (if you didn't rename it)][9] CloudFormation stack.
2. Update the stack using the current template.
3. Adjust parameter values.

**Note:** Datadog recommends adjusting your Forwarder settings through CloudFormation rather than directly editing the Lambda function. Find the description of settings in the [template.yaml][13] and the CloudFormation stack creation user interface when you launch the stack. Feel free to submit a pull request to make additional settings adjustable through the template.

## Troubleshooting

Don't forget to check if the issue has already been fixed in the recent [releases][7].

Set the environment variable `DD_LOG_LEVEL` to `debug` on the Forwarder Lambda function to enable detailed logging temporarily (don't forget to remove it). The debugging logs should be able to show you the exact event payload the Lambda function receives and the data (log, metric or trace) payload that is sent to Datadog.

You can also add additional logging or code for deeper investigation. Find instructions for building Forwarder code with local changes from the [contributing](#contributing) section.

If you still couldn't figure out, please create a ticket for [Datadog Support][14] with a copy of debugging logs.

## Contributing

We love pull requests. Here's a quick guide. 

1. If you would like to discuss a feature or bug fix before implementing, find us in the `#serverless` channel of the [Datadog Slack community][15].
1. Fork, clone and create a branch:
    ```bash
    git clone git@github.com:<your-username>/datadog-serverless-functions.git
    git checkout -b <my-branch>
    ```
1. Make code changes
1. Build with your local changes
    ```bash
    cd aws/logs_monitoring
    ./tools/build_bundle.sh <SEMANTIC_VERSION> # any unique version is fine
    ```
1. Update your testing Forwarder with the modified code and test
    ```bash
    # Upload in the AWS Lambda console if you don't have AWS CLI
    aws lambda update-function-code \
        --region <AWS_REGION>
        --function-name <FORWARDER_NAME> \
        --zip-file fileb://.forwarder/aws-dd-forwarder-<SEMANTIC_VERSION>.zip
    ```
1. Run unit tests
    ```
    python -m unittest discover . # for code in Python
    ./trace_forwarder/scripts/run_tests.sh # for code in Go
    ```
1. Run the integration tests
    ```bash
    ./tools/integration_tests/integration_tests.sh

    # to update the snapshots if changes are expected
    ./tools/integration_tests/integration_tests.sh --update
    ```
1. If you changes affect the CloudFormation template, run the installation test against your own AWS account
    ```bash
    ./tools/installation_test.sh
    ```
1. Push to your fork and [submit a pull request][https://github.com/your-username/datadog-serverless-functions/compare/DataDog:master...master]

## Advanced

### Shipping Logs to Multiple Destinations

If you need to ship logs to multiple Datadog organizations or other destinations, configure the `AdditionalTargetLambdaARNs` Cloudformation parameter to let the Datadog Forwarder copy the incoming logs to the specified Lambda functions. These additional Lambda functions will be called asynchronously with the exact same `event` the Datadog Forwarder receives.

### AWS PrivateLink Support

You can run the Forwarder in a VPC by using AWS PrivateLink to connect to Datadog. Note that AWS PrivateLink can only be configured with Datadog organizations using the Datadog US site (i.e. datadoghq.com, not datadoghq.eu).

1. Follow the [setup instructions][16] to add an endpoint to your VPC for Datadog's **API** service.
2. Follow the [same procedure][16] to add a second endpoint to your VPC for Datadog's **Logs** service.
3. Follow the [same procedure][16] once more to add a third endpoint to your VPC for Datadog's **Traces** service.
4. Unless the Forwarder is deployed to a public subnet, follow the [instructions][17] to add endpoints for Secrets Manager and S3 to the VPC, so that the Forwarder can access those services.
5. When installing the Forwarder with the CloudFormation template, set `DdUsePrivateLink`, `VPCSecurityGroupIds` and `VPCSubnetIds`.
6. Ensure the `DdFetchLambdaTags` option is disabled, because AWS VPC does not yet offer an endpoint for the Resource Groups Tagging API.

### AWS VPC and Proxy Support

If you must deploy the Forwarder to a VPC without direct public internet access, and you cannot use AWS PrivateLink to connect to Datadog (for example, if your organization is hosted on the Datadog EU site (i.e. datadoghq.eu)), then you can send data via a proxy.

1. Unless the Forwarder is deployed to a public subnet, follow the [instructions][17] to add endpoints for Secrets Manager and S3 to the VPC, so that the Forwarder can access those services.
2. Update your proxy with following configurations ([HAProxy][18] or [Nginx][19]).
3. When installing the Forwarder with the CloudFormation template, set `DdUseVPC`, `VPCSecurityGroupIds` and `VPCSubnetIds`.
4. Ensure the `DdFetchLambdaTags` option is disabled, because AWS VPC does not yet offer an endpoint for the Resource Groups Tagging API.
5. Set `DdApiUrl` to `http://<proxy_host>:3834` or `https://<proxy_host>:3834`.
6. Set `DdTraceIntakeUrl` to `http://<proxy_host>:3835` or `https://<proxy_host>:3835`.
7. Set `DdUrl` to `<proxy_host>` and `DdPort` to `3837`.
8. Set `DdNoSsl` to `true` if connecting to the proxy using `http`.
9. Set `DdSkipSslValidation` to `true` if connecting to the proxy using `https` with a sef-signed certificate.

### Code Signing

The Datadog Forwarder is signed by Datadog. If you would like to verify the integrity of the Forwarder, please use the manual installation method. [Create a Code Signing Configuration][20] that includes Datadog’s Signing Profile ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) and associate it with the Forwarder Lambda function before uploading the Forwarder ZIP file. 

## CloudFormation Parameters

### Required

`DdApiKey`
: Your Datadog API Key. This can be found in Datadog, under Integrations > APIs > API Keys. The API Key will be stored in AWS Secrets Manager. If you already have Datadog API Key stored in Secrets Manager, use `DdApiKeySecretArn` instead.

`DdApiKeySecretArn`
: The ARN of the secret storing the Datadog API key, if you already have it stored in Secrets Manager. You must store the secret as a plaintext, rather than a key-value pair.

`DdSite`
: The Datadog site that your metrics and logs will be sent to. Possible values are `datadoghq.com`, `datadoghq.eu`, `us3.datadoghq.com` and `ddog-gov.com`.


### Lambda Function (Optional)

`FunctionName`
: The name of the Datadog Forwarder Lambda function. DO NOT change when updating an existing CloudFormation stack, otherwise the current forwarder function will be replaced and all the triggers will be lost.

`MemorySize`
: Memory size for the Datadog Forwarder Lambda function.

`Timeout`
: Timeout for the Datadog Forwarder Lambda function.

`ReservedConcurrency`
: Reserved concurrency for the Datadog Forwarder Lambda function.

`LogRetentionInDays`
: CloudWatch log retention for logs generated by the Datadog Forwarder Lambda function.


### Log Forwarding (Optional)

`DdTags`
: Add custom tags to forwarded logs, comma-delimited string, no trailing comma, e.g., `env:prod,stack:classic`

`DdMultilineLogRegexPattern`
: Use the supplied regular expression to detect for a new log line for multiline logs from S3, e.g., use expression `\d{2}\/\d{2}\/\d{4}` for multiline logs beginning with pattern "11/10/2014".

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
: Send logs over HTTPS, while NOT validating the certificate provided by the endpoint. This will still encrypt the traffic between the forwarder and the log intake endpoint, but will not verify if the destination SSL certificate is valid.

`DdUseCompression`
: Set to false to disable log compression. Only valid when sending logs over HTTP.

`DdCompressionLevel`
: Set the compression level from 0 (no compression) to 9 (best compression). The default compression level is 6. You may see some benefit with regard to decreased outbound network traffic if you increase the compression level, at the expense of increased Forwarder execution duration.

`DdForwardLog`
: Set to false to disable log forwarding, while continuing to forward other observability data, such as metrics and traces from Lambda functions.

`DdFetchLambdaTags`
: Let the Forwarder fetch Lambda tags using GetResources API calls and apply them to logs, metrics and traces. If set to true, permission `tag:GetResources` will be automatically added to the Lambda execution IAM role.


### Log Scrubbing (Optional)

`RedactIp`
: Replace text matching `\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}` with `xxx.xxx.xxx.xxx`

`RedactEmail`
: Replace text matching `[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+` with `xxxxx@xxxxx.com`

`DdScrubbingRule`
: Replace text matching the supplied regular expression with `xxxxx` (default) or `DdScrubbingRuleReplacement` (if supplied). Log scrubbing rule is applied to the full JSON-formatted log, including any metadata that is automatically added by the Lambda function. Each instance of a pattern match is replaced until no more matches are found in each log. Note, using inefficient regular expression, such as `.*`, may slow down the Lambda function.

`DdScrubbingRuleReplacement`
: Replace text matching DdScrubbingRule with the supplied text.


### Log Filtering (Optional)

`ExcludeAtMatch`
: DO NOT send logs matching the supplied regular expression. If a log matches both the ExcludeAtMatch and IncludeAtMatch, it is excluded.

`IncludeAtMatch`
: ONLY send logs matching the supplied regular expression, and not excluded by `ExcludeAtMatch`.


Filtering rules are applied to the full JSON-formatted log, including any metadata that is automatically added by the Forwarder.
However, transformations applied by [log pipelines][21],
which occur after logs are sent to Datadog, cannot be used to filter logs in the Forwarder.
Using an inefficient regular expression, such as `.*`, may slow down the Forwarder.

Some examples of regular expressions that can be used for log filtering:
- Include (or exclude) Lambda platform logs: `"(START|REPORT|END)\s`
- Include CloudTrail error messages only: `errorMessage`
- Include only logs containing an HTTP 4XX or 5XX error code: `\b[4|5][0-9][0-9]\b`
- Include only CloudWatch logs where the `message` field contains a specific JSON key/value pair: `\\"awsRegion\\":\\"us-east-1\\"`
  - The message field of a CloudWatch log event is encoded as a string. `{"awsRegion": "us-east-1"}` is encoded as `{\"awsRegion\":\"us-east-1\"}`.
    The pattern you provide must therefore include extra `\` escape characters.

To test different patterns against your logs, turn on [debug logs](#troubleshooting).

### Advanced (Optional)

`SourceZipUrl`
: DO NOT CHANGE unless you know what you are doing. Override the default location of the function source code.

`PermissionBoundaryArn`
: ARN for the Permissions Boundary Policy.

`DdUsePrivateLink`
: Set to true to enable sending logs and metrics via AWS PrivateLink. See https://dtdg.co/private-link.

`VPCSecurityGroupIds`
: Comma separated list of VPC Security Group Ids. Used when AWS PrivateLink is enabled.

`VPCSubnetIds`
: Comma separated list of VPC Subnet Ids. Used when AWS PrivateLink is enabled.

`AdditionalTargetLambdaARNs`
: Comma separated list of Lambda ARNs that will get called asynchronously with the same `event` the Datadog Forwarder receives.

## Permissions

To deploy the CloudFormation Stack with the default options, you need to have the permissions below to save your Datadog API key as a secret and create an S3 bucket to store the Forwarder's code (zip file), and create Lambda functions (including execution roles and log groups).

**IAM Statements**:

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
    "logs:CreateLogGroup",
    "logs:DescribeLogGroups",
    "logs:PutRetentionPolicy"
  ],
  "Resource": "*"
}
```

The following capabilities are required when creating a CloudFormation stack:

- CAPABILITY_AUTO_EXPAND, because the forwarder template uses macros, (in particular the [AWS SAM][22] macro).
- CAPABILTY_IAM/NAMED_IAM, because the Forwarder creates IAM roles

The CloudFormation Stack creates following IAM roles:

- ForwarderRole: The execution role for the Forwarder Lambda function to read logs from S3, fetch your Datadog API key from Secrets Manager, and write its own logs.

**IAM Statements**

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

- `ForwarderZipCopierRole`: The execution role for the ForwarderZipCopier Lambda function to download the Forwarder deployment zip file to a S3 bucket.

**IAM Statements**:

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
[1]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[2]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#set-up-triggers
[3]: https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png
[4]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#set-up-triggers
[5]: https://github.com/DataDog/cloudformation-template/tree/master/aws
[6]: https://www.terraform.io/docs/providers/aws/r/cloudformation_stack.html
[7]: https://github.com/DataDog/datadog-serverless-functions/releases
[8]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#send-aws-service-logs-to-datadog
[9]: https://console.aws.amazon.com/cloudformation/home#/stacks?filteringText=forwarder
[10]: https://github.com/Datadog/cloudformation-template/tree/master/aws
[11]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#automatically-setup-triggers
[12]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#manually-setup-triggers
[13]: https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/template.yaml
[14]: https://www.datadoghq.com/support/
[15]: https://chat.datadoghq.com/
[16]: https://docs.datadoghq.com/agent/guide/private-link/?tab=logs#create-your-vpc-endpoint
[17]: https://docs.aws.amazon.com/vpc/latest/userguide/vpce-interface.html#create-interface-endpoint
[18]: https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/proxy_conf/haproxy.txt
[19]: https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/proxy_conf/nginx.txt
[20]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-console
[21]: https://docs.datadoghq.com/logs/processing/pipelines/
[22]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-aws-serverless.html
