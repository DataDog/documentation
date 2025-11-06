---
title: AWS Account-Level Log Subscriptions
further_reading:
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn how to explore your logs"
---

## Overview

You can use account-level log subscriptions in your AWS environment to automatically forward all of your CloudWatch logs to Datadog. With an account-level log subscription, you don't need to manually configure log forwarding when you have a new log source, or when AWS releases a new service. You can also define your own selection criteria or filter pattern, for more control over which logs are forwarded.

**Note**: [Open Cybersecurity Schema Framework (OCSF)][6] format is supported by Datadog Log Management.

## Create an account-level log subscription

There are two ways to create an account-level log subscription, through [CloudFormation](#cloudformation-recommended) and through [manual setup](#manual). For the simplest setup, use CloudFormation to create an Amazon Data Firehose and associated resources in each of your selected regions.

### CloudFormation (recommended)

1. Copy the URL of the CloudFormation template:

{{< code-block lang="bash" filename="" disable_copy="false" >}}
https://datadog-cloudformation-template.s3.amazonaws.com/aws_account_level_logs/main.yaml
{{< /code-block >}}

2. Go to [CloudFormation][1] in the AWS console.
3. Click **Create stack**.
    - Select `With new resources (standard)`.
4. Leave the options to **Choose an existing template** and **Amazon S3 URL** checked.
5. In the **Amazon S3 URL** field, paste the URL of the CloudFormation template.
6. Click **Next**.
7. In the **Stack name** field, provide a descriptive name such as `datadog-account-level-logs-stack`.
8. In the **ApiKey** field, paste a valid [Datadog API key][4] value.
9. In the **Regions** field, enter a comma-separated list of AWS region codes (for example, `us-east-1`) corresponding to the regions to include for the account-level log subscription.
10. In the **DatadogHttpEndpointUrl** field, select the URL corresponding to your [Datadog site][5].
11. Click **Next**.
12. Configure additional stack options as desired.
13. Click **Next**.
14. Review the stack options, and click the checkbox stating `I acknowledge that AWS CloudFormation might create IAM resources with custom names`.
15. Click **Submit**.

### Manual

{{< tabs >}}
{{% tab "Lambda Forwarder" %}}

1. If you haven't already, set up the [Datadog Forwarder][101] Lambda function.
2. Use the [AWS CLI][102] to grant CloudWatch Logs the permission to execute your function.
   - Replace `<REGION>` with the region containing your Datadog Forwarder Lambda function.
   - Replace `<ACCOUNT_ID>` with your 12-digit AWS account ID (excluding dashes).

```bash
aws lambda add-permission \
  --region "<REGION>" \
	--function-name "forwarder-function" \
	--statement-id "forwarder-function" \
	--principal "logs.amazonaws.com" \
	--action "lambda:InvokeFunction" \
	--source-arn "arn:aws:logs:<REGION>:<ACCOUNT_ID>:log-group:*" \
	--source-account "<ACCOUNT_ID>"
```

3. Create an account-level subscription filter policy. In the example provided below, all log events that contain the string `ERROR` are streamed, except those in the log groups named `LogGroupToExclude1` and `LogGroupToExclude2`.
   - Replace `FORWARDER_ARN` with the ARN of the Datadog Forwarder Lambda function.

```bash
aws logs put-account-policy \
  --policy-name "ExamplePolicyLambda" \
  --policy-type "SUBSCRIPTION_FILTER_POLICY" \
  --policy-document '{"DestinationArn":"<FORWARDER_ARN>", "FilterPattern": "", "Distribution": "Random"}' \
  --scope "ALL"
```

**Note**: To exclude certain log groups from log forwarding, use the `--selection-criteria` option as outlined in the [command reference][103].

[101]: /logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[102]: https://aws.amazon.com/cli/
[103]: https://docs.aws.amazon.com/cli/latest/reference/logs/put-account-policy.html
{{% /tab %}}
{{% tab "Amazon Data Firehose" %}}

#### Create an S3 bucket and a role for Amazon Data Firehose

The following steps guide you through creating a bucket and IAM role. This role grants Amazon Data Firehose permission to put data into your Amazon S3 bucket in case of delivery failures.

1. Use the [AWS CLI][201] to create an S3 Bucket. Optionally, you can use an existing bucket.
   - Replace `<BUCKET_NAME>` with the name for your S3 bucket.
   - Replace `<REGION>` with the region for your S3 bucket.

```
aws s3api create-bucket \
  --bucket MY-BUCKET \
  --create-bucket-configuration LocationConstraint=<REGION>
```

2. Create a `TrustPolicyForFirehose.json` file with the following statement:

```bash
{
  "Statement": {
    "Effect": "Allow",
    "Principal": { "Service": "firehose.amazonaws.com" },
    "Action": "sts:AssumeRole"
    } 
}
```

3. Create an IAM role, specifying the trust policy file:
   **Note**: The returned **Role.Arn** value is used in a later step.

```bash
aws iam create-role \
  --role-name FirehosetoS3Role \
  --assume-role-policy-document file://./TrustPolicyForFirehose.json
```

4. Create a `PermissionsForFirehose.json` file with the following statement:
   - Replace `<BUCKET_NAME>` with the name of your S3 bucket.

```bash
{
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [ 
          "s3:AbortMultipartUpload", 
          "s3:GetBucketLocation", 
          "s3:GetObject", 
          "s3:ListBucket", 
          "s3:ListBucketMultipartUploads", 
          "s3:PutObject" ],
      "Resource": [ 
          "arn:aws:s3:::<BUCKET_NAME>", 
          "arn:aws:s3:::<BUCKET_NAME>/*" ]
    }
  ]
}
```
5. Associate the permissions policy with the role:

```bash
aws iam put-role-policy \
  --role-name FirehosetoS3Role \
  --policy-name Permissions-Policy-For-Firehose \
  --policy-document file://./PermissionsForFirehose.json
```

#### Create Amazon Data Firehose delivery stream

The following steps guide you through creating and configuring an Amazon Data Firehose delivery stream.

1. Go to [Amazon Data Firehose][202] in the AWS console.
2. Click **Create Firehose stream**.
3. In the **Source** field, select the source of your logs:
   - Select `Amazon Kinesis Data Streams` if your logs are coming from a Kinesis Data Stream
   - Select `Direct PUT` if your logs are coming directly from a CloudWatch log group
4. In the **Destination** field, select `Datadog`.
5. If your **Source** is `Amazon Kinesis Data Streams`, select your Kinesis data stream under **Source settings**.
6. Optionally, give the Firehose stream a descriptive name.
7. In the **Destination settings** section, choose the Datadog logs HTTP endpoint URL that corresponds to your [Datadog site][203].
8. For **Authentication**, a valid [Datadog API key][204] is needed. You can either:
     - Select **Use API key** and paste the key's value in the **API key** field.
     - Select **Use AWS Secrets Manager** and choose a secret containing your valid Datadog API key value in the **Secret name** dropdown.
9. For **Content encoding**, select `GZIP`.
10. Optionally, configure the **Retry duration**, the buffer settings, or add **Parameters** (which are attached as tags to your logs).  
     **Note**: Datadog recommends setting the **Buffer size** to `2` MiB if the logs are single-line messages.
11. In the **Backup settings** section, select the S3 bucket for receiving any failed events that exceed the retry duration.  
     **Note**: To ensure any logs that fail to be delivered by the delivery stream are still sent to Datadog, set the Datadog Forwarder Lambda function to [forward logs from this S3 bucket][205].
12. Click **Create Firehose stream**.

#### Create role for CloudWatch Logs

The following steps guide you through creating an IAM role for CloudWatch logs. This role grants CloudWatch Logs permission to put data into your Firehose delivery stream.

1. Create a `./TrustPolicyForCWL.json` file with the following statement:
   - Replace `<ACCOUNT_ID>` with your 12-digit AWS account ID (excluding dashes).
   - Replace `<REGION>` with the region of your CloudWatch logs.

```bash
{
  "Statement": {
    "Effect": "Allow",
    "Principal": { "Service": "logs.amazonaws.com" },
    "Action": "sts:AssumeRole",
    "Condition": { 
         "StringLike": { 
             "aws:SourceArn": "arn:aws:logs:<REGION>:<ACCOUNT_ID>:*"
         } 
     }
  }
}
```
2. Create an IAM role, specifying the trust policy file:

```bash
aws iam create-role \
  --role-name CWLtoKinesisFirehoseRole \
  --assume-role-policy-document file://./TrustPolicyForCWL.json
```
   **Note**: The returned **Role.Arn** value is used in a later step.

3. Create a `./PermissionsForCWL.json` file with the following statement:
   - Replace `<REGION>` with the region containing your Datadog Forwarder Lambda function.
   - Replace `<ACCOUNT_ID>` with your 12-digit AWS account ID (excluding dashes).
   - Replace `<DELIVERY_STREAM_NAME>` with the name of your delivery stream.

```bash
{
    "Statement":[
      {
        "Effect":"Allow",
        "Action":["firehose:PutRecord"],
        "Resource":[
            "arn:aws:firehose:<REGION>:<ACCOUNT_ID>:deliverystream/<DELIVERY_STREAM_NAME>"]
      }
    ]
}
```

4. Associate the permissions policy with the role:

```bash
aws iam put-role-policy \
  --role-name CWLtoKinesisFirehoseRole \
  --policy-name Permissions-Policy-For-CWL \
  --policy-document file://./PermissionsForCWL.json
```

#### Create the CloudWatch Logs account-level subscription filter policy

Before completing this step, the Amazon Data Firehose delivery stream must be in the `Active` state.

1. Create the CloudWatch Logs account-level subscription filter policy. The policy immediately starts the flow of real-time log data from the chosen log group to your Amazon Data Firehose delivery stream:
   - Replace `<POLICY_NAME>` with a name for the subscription filter policy.
   - Replace `<CLOUDWATCH_LOGS_ROLE>` with the ARN of the CloudWatch logs role.
   - Replace `<DELIVERY_STREAM_ARN>` with the ARN of the Amazon Data Firehose delivery stream.

```bash
aws logs put-account-policy \
    --policy-name "<POLICY_NAME>" \
    --policy-type "SUBSCRIPTION_FILTER_POLICY" \
    --policy-document '{"RoleArn":"<CLOUDWATCH_LOGS_ROLE>", "DestinationArn":"<DELIVERY_STREAM_ARN>", "FilterPattern": "", "Distribution": "Random"}' \
    --scope "ALL"
```

**Note**: To exclude certain log groups from log forwarding, use the `--selection-criteria` option as outlined in the [command reference][206].

[201]: https://aws.amazon.com/cli/
[202]: https://console.aws.amazon.com/firehose/home
[203]: /getting_started/site/
[204]: https://app.datadoghq.com/organization-settings/api-keys
[205]: /logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=automaticcloudformation#collecting-logs-from-s3-buckets
[206]: https://docs.aws.amazon.com/cli/latest/reference/logs/put-account-policy.html
{{% /tab %}}
{{< /tabs >}}

### Validation

Go to the [Log Explorer][2] and enter the search query `@aws.firehose.arn:"<FIREHOSE_ARN>"` to view logs forwarded by the Amazon Data Firehose.
   - Replace `<FIREHOSE_ARN>` with the ARN of the log-streaming [Firehose][3].

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://console.aws.amazon.com/cloudformation/home
[2]: https://app.datadoghq.com/logs
[3]: https://console.aws.amazon.com/firehose/home
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: /getting_started/site/
[6]: https://schema.ocsf.io/
