---
aliases:
- /serverless/troubleshooting/installing_the_forwarder/
dependencies:
- https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/README.md
kind: documentation
title: Installing the Forwarder
---


The Datadog Forwarder is an AWS Lambda function that ships logs, custom metrics, and traces from your environment to Datadog. The Forwarder can:

- Forward CloudWatch, ELB, S3, CloudTrail, VPC and CloudFront logs to Datadog
- Forward S3 events to Datadog
- Forward Kinesis data stream events to Datadog (only CloudWatch logs are supported)
- Forward custom metrics from AWS Lambda functions using CloudWatch logs
- Forward traces from AWS Lambda functions using CloudWatch logs
- Generate and submit enhanced Lambda metrics (`aws.lambda.enhanced.*`) parsed from the AWS REPORT log: duration, billed_duration, max_memory_used, timeouts, out_of_memory, and estimated_cost

## Installation

Datadog recommends using [CloudFormation](#cloudformation) to automatically install the Forwarder. You can also complete the setup process using [Terraform](#terraform) or [manually](#manually).

<!-- xxx tabs xxx -->
<!-- xxx tab "Cloud Formation" xxx -->

### CloudFormation

[![Launch Stack][1]](https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?stackName=datadog-forwarder&templateURL=https://datadog-cloudformation-template.s3.amazonaws.com/aws/forwarder/latest.yaml)

1. Log into your admin AWS account/role and deploy the CloudFormation Stack with the button above.
2. Fill in `DdApiKey` and select the appropriate `DdSite`. All other parameters are optional.
3. Click **Create stack**, and wait for the creation to complete.
4. Find the installed forwarder Lambda function under the stack's "Resources" tab with logical ID `Forwarder`.
5. Set up triggers to the installed Forwarder either [automatically][2] or [manually][3].
6. Repeat the above steps in another region if you operate in multiple AWS regions.

<!-- xxz tab xxx -->
<!-- xxx tab "Terraform" xxx -->

### Terraform

Install the Forwarder using the Terraform resource [aws_cloudformation_stack][4] as a wrapper on top of the provided CloudFormation template.

Datadog recommends creating two separate Terraform configurations:

- Use the first one to store the Datadog API key in the AWS Secrets Manager, and note down the secrets ARN from the output of apply.
- Then create another configuration for the forwarder and supply the secretes ARN through the `DdApiKeySecretArn` parameter.

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
    DdApiKey           = "this_value_is_not_used"
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

1. Create a Python 3.7 Lambda function using `aws-dd-forwarder-<VERSION>.zip` from the latest [releases][5].
2. Save your Datadog API key in AWS Secrets Manager, set environment variable `DD_API_KEY_SECRET_ARN` with the secret ARN on the Lambda function, and add the `secretsmanager:GetSecretValue` permission to the Lambda execution role.
3. If you need to forward logs from S3 buckets, add the `s3:GetObject` permission to the Lambda execution role.
4. Set the environment variable `DD_ENHANCED_METRICS` to `false` on the Forwarder. This stops the Forwarder from generating enhanced metrics itself, but it will still forward custom metrics from other lambdas.
5. Configure [triggers][6].

<!-- xxz tab xxx -->
<!-- xxz tabs xxx -->

## AWS PrivateLink Support

You can run the Forwarder in a VPC by using AWS PrivateLink.

1. Follow the [setup instructions][7] for adding Datadog's **API** endpoint to your VPC.
2. Follow the [same procedure][7] to add Datadog's **Logs** endpoint to your VPC.
3. By default, the Forwarder's API key is stored in the Secrets Manager. The secrets manager endpoint needs to be added to the VPC. You can follow the instructions [here for adding AWS services to a VPC][8].
4. When installing the Forwarder with the CloudFormation template, enable 'DdUsePrivateLink' and set at least one Subnet Id and Security Group.

### AWS PrivateLink Limitations

* AWS PrivateLink can only be configured with Datadog organizations in the Datadog US region.
* Trace forwarding is currently unsupported via AWS PrivateLink.

## Troubleshooting

Set the environment variable `DD_LOG_LEVEL` to `debug` on the Forwarder Lambda function to enable detailed logging temporarily (don't forget to remove it). If the debug logs don't help, please contact [Datadog Support][9]. It may help to update to the latest version of the Forwarder if you haven't already.

### Upgrade to a new version

1. Find the [datadog-forwarder (if you didn't rename it)][10] CloudFormation stack. If you installed the Forwarder as part of the [Datadog AWS integration stack][11], make sure to update the nested Forwarder stack instead of the root stack.
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
   - If you have been letting Datadog manage triggers [automatically][2] for you, update the forwarder Lambda ARN in AWS integration tile "Collect Logs" tab.
   - If you have been manage the triggers [manually][3], then you have to migrate them manually (or using a script).
7. Ensure the old forwarder Lambda function's invocations count drops to zero.
8. Delete the old forwarder Lambda function when you feel comfortable.
9. If you have old forwarder Lambda functions installed in multiple AWS accounts and regions, repeat the steps above in every account and region combination.

### Deleting

To safely delete the forwarder and other AWS resources created by the forwarder CloudFormation stack, follow the steps below.

1. Find the [datadog-forwarder (if you didn't rename it)][10] CloudFormation stack. Or you can find the stack from the Forwarder Lambda function's management console by clicking the link from the message "This function belongs to an application. Click here to manage it.", and then click the "Deployments" tab on the application page.
2. "Delete" the CloudFormation stack.

### Adjusting forwarder settings

1. Find the [datadog-forwarder (if you didn't rename it)][10] CloudFormation stack.
2. Update the stack using the current template.
3. Adjust parameter values.

**Note:** Datadog reccomends adjusting your Forwarder settings through CloudFormation rather than directly editing the Lambda function. Find the description of settings in the [template.yaml][12] and the CloudFormation stack creation user interface when you launch the stack. Feel free to submit a pull request to make additional settings adjustable through the template.

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

- CAPABILITY_AUTO_EXPAND, because the forwarder template uses macros, (in particular the [AWS SAM][13] macro).
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

## CloudFormation Parameters

### Required

- `DdApiKey` - Your Datadog API Key. This can be found in Datadog, under Integrations > APIs > API Keys.
    The API Key will be stored in AWS Secrets Manager.
- `DdSite` - The Datadog site that your metrics and logs will be sent to. Should either be `datadoghq.com`
    or `datadoghq.eu`

### Lambda Function (Optional)

- `FunctionName` - The name of the Datadog Forwarder Lambda function. DO NOT change when updating an
    existing CloudFormation stack, otherwise the current forwarder function will be replaced and all the
    triggers will be lost.
- `MemorySize` - Memory size for the Datadog Forwarder Lambda function
- `Timeout` - Timeout for the Datadog Forwarder Lambda function
- `ReservedConcurrency` - Reserved concurrency for the Datadog Forwarder Lambda function
- `LogRetentionInDays` - CloudWatch log retention for logs generated by the Datadog Forwarder Lambda
    function


### Log Forwarding (Optional)

- `DdTags` - Add custom tags to forwarded logs, comma-delimited string, no trailing comma, e.g.,
    `env:prod,stack:classic`
- `DdMultilineLogRegexPattern` - Use the supplied regular expression to detect for a new log line for
    multiline logs from S3, e.g., use expression `\d{2}\/\d{2}\/\d{4}` for multiline logs beginning
    with pattern "11/10/2014".
- `DdUseTcp` - By default, the forwarder sends logs using HTTPS through the port 443. To send logs over an
    SSL encrypted TCP connection, set this parameter to true.
- `DdNoSsl` - Disable SSL when forwarding logs, set to true when forwarding logs through a proxy.
- `DdUrl` - The endpoint URL to forward the logs to, useful for forwarding logs through a proxy
- `DdPort` - The endpoint port to forward the logs to, useful for forwarding logs through a proxy
- `DdSkipSslValidation` - Send logs over HTTPS, while NOT validating the certificate provided by the
    endpoint. This will still encrypt the traffic between the forwarder and the log intake endpoint,
    but will not verify if the destination SSL certificate is valid.
- `DdUseCompression` - Set to false to disable log compression. Only valid when sending logs over HTTP.
- `DdCompressionLevel` - Set the compression level from 0 (no compression) to 9 (best compression).
    The default compression level is 6. You may see some benefit with regard to decreased outbound
    network traffic if you increase the compression level, at the expense of increased Forwarder execution
    duration.
- `DdForwardLog` - Set to false to disable log forwarding, while continuing to forward other
    observability data, such as metrics and traces from Lambda functions.

### Log Scrubbing (Optional)

- `RedactIp` - Replace text matching `\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}` with `xxx.xxx.xxx.xxx`
- `RedactEmail` - Replace text matching `[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+` with
    `xxxxx@xxxxx.com`
- `DdScrubbingRule` - Replace text matching the supplied regular expression with `xxxxx` (default) or
    `DdScrubbingRuleReplacement` (if supplied). Log scrubbing rule is applied to the full JSON-formatted
    log, including any metadata that is automatically added by the Lambda function. Each instance of a
    pattern match is replaced until no more matches are found in each log.
- `DdScrubbingRuleReplacement` - Replace text matching DdScrubbingRule with the supplied text

### Log Filtering (Optional)

- `ExcludeAtMatch` - DO NOT send logs matching the supplied regular expression. If a log matches both
    the ExcludeAtMatch and IncludeAtMatch, it is excluded. Filtering rules are applied to the full
    JSON-formatted log, including any metadata that is automatically added by the function.
- `IncludeAtMatch` - Only send logs matching the supplied regular expression and not excluded by
    ExcludeAtMatch.

### Experimental (Optional)

- `DdFetchLambdaTags` - Let the forwarder fetch Lambda tags using GetResources API calls and apply
    them to logs, metrics and traces. If set to true, permission `tag:GetResources` will be
    automatically added to the Lambda execution IAM role. The tags are cached in memory so that
    they'll only be fetched when the function cold starts or when the TTL (1 hour) expires. The
    forwarder increments the `aws.lambda.enhanced.get_resources_api_calls` metric for each API call made.

### Advanced (Optional)

- `SourceZipUrl` - DO NOT CHANGE unless you know what you are doing. Override the default location of
    the function source code.
- `PermissionBoundaryArn` - ARN for the Permissions Boundary Policy
- `DdApiKeySecretArn` - The ARN of the secret storing the Datadog API key, if you already have it
    stored in Secrets Manager. You still need to set a dummy value for "DdApiKey" to satisfy the
    requirement, though that value won't be used.
- `DdUsePrivateLink` - Set to true to enable sending logs and metrics via AWS PrivateLink. See
    https://dtdg.co/private-link.
- `VPCSecurityGroupIds` - Comma separated list of VPC Security Group Ids. Used when AWS PrivateLink is
    enabled.
- `VPCSubnetIds` - Comma separated list of VPC Subnet Ids. Used when AWS PrivateLink is enabled.
[1]: https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png
[2]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#automatically-setup-triggers
[3]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#manually-setup-triggers
[4]: https://www.terraform.io/docs/providers/aws/r/cloudformation_stack.html
[5]: https://github.com/DataDog/datadog-serverless-functions/releases
[6]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#send-aws-service-logs-to-datadog
[7]: https://docs.datadoghq.com/agent/guide/private-link/?tab=logs#create-your-vpc-endpoint
[8]: https://docs.aws.amazon.com/vpc/latest/userguide/vpce-interface.html#create-interface-endpoint
[9]: https://www.datadoghq.com/support/
[10]: https://console.aws.amazon.com/cloudformation/home#/stacks?filteringText=forwarder
[11]: https://github.com/Datadog/cloudformation-template/tree/master/aws
[12]: template.yaml
[13]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-aws-serverless.html
