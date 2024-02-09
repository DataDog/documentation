---
title: Create a minimal IAM policy to use with Cloudcraft
kind: guide
---

Cloudcraft uses a _read-only_ IAM role to scan your AWS account and reverse-engineer the service relationships between components to autogenerate a diagram of your architecture.

The easiest way to set everything up is to follow the instructions inside the application, which creates the role and sets up the permissions for you in just a few clicks. The role is assigned the AWS-managed `ReadOnlyAccess` IAM policy by default.

You also have the option to control the access granted to Cloudcraft when scanning your AWS account by creating a custom IAM policy, which you can fully customize by removing access to specific AWS services and APIs. If you remove access to an AWS service from the policy, Cloudcraft won't discover resources for that particular service.

<div class="alert alert-info">If you use a custom IAM policy, you must keep it manually updated as new services and features are added to Cloudcraft.</div>

## Creating a custom IAM policy

Start by opening the [IAM Policies Console][1] and clicking the **Create Policy** button.

{{< img src="cloudcraft/advanced/minimal-iam-policy/create-policy.png" alt="AWS IAM management console highlighting the Create policy button." responsive="true" style="width:100%;">}}

Switch to the JSON tab, copy the policy shown in the following code block, or from [the minimal IAM API endpoint][2], and then paste it into the editor box. This policy represents the minimal set of AWS permissions required for a complete environment scan by Cloudcraft.

You can also customize the policy to suit your unique requirements.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "apigateway:Get",
        "autoscaling:Describe*",
        "cassandra:Select",
        "cloudfront:Get*",
        "cloudfront:List*",
        "cloudwatch:Describe*",
        "cloudwatch:Get*",
        "cloudwatch:List*",
        "directconnect:Describe*",
        "dynamodb:DescribeTable",
        "dynamodb:ListTables",
        "dynamodb:ListTagsOfResource",
        "ec2:Describe*",
        "ecr-public:Describe*",
        "ecr-public:List*",
        "ecr:Describe*",
        "ecr:List*",
        "ecs:Describe*",
        "ecs:List*",
        "eks:Describe*",
        "eks:List*",
        "elasticache:Describe*",
        "elasticache:List*",
        "elasticfilesystem:Describe*",
        "elasticloadbalancing:Describe*",
        "es:Describe*",
        "es:List*",
        "fsx:Describe*",
        "fsx:List*",
        "glacier:Describe*",
        "glacier:Get*",
        "glacier:List*",
        "kinesis:Describe*",
        "kinesis:List*",
        "lambda:GetFunction",
        "lambda:List*",
        "neptune:Describe*",
        "neptune:List*",
        "rds:Describe*",
        "rds:ListTagsForResource",
        "redshift:Describe*",
        "route53:Get*",
        "route53:List*",
        "s3:GetBucketAcl",
        "s3:GetBucketLocation",
        "s3:GetBucketNotification",
        "s3:GetBucketTagging",
        "s3:GetEncryptionConfiguration",
        "s3:List*",
        "ses:Get*",
        "ses:List*",
        "sns:GetSubscriptionAttributes",
        "sns:GetTopicAttributes",
        "sns:List*",
        "sqs:GetQueueAttributes",
        "sqs:GetQueueUrl",
        "sqs:ListQueues",
        "sqs:ListQueueTags",
        "tag:Get*",
        "timestream:Describe*",
        "timestream:List*",
        "wafv2:GetWebACL*",
        "wafv2:List*"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
```

Click the **Review policy** button at the bottom of the screen, and then enter a name and description. Cloudcraft recommends using the following values to keep things organized and easier to audit.

- **Policy Name:** Cloudcraft
- **Policy Description:** Custom policy for Cloudcraft. Version 20230818.

Next, click **Create policy** to create the policy. The AWS console redirects you back to the policies page.

Finally, attach the newly created policy to the [Cloudcraft IAM role][3]. If you didn't create the role yet, follow the instructions in the application.

**Note**: A [stricter version of the minimal IAM policy][4] is also available.

[1]: https://console.aws.amazon.com/iamv2/home#/policies
[2]: https://api.cloudcraft.co/aws/account/iamParameters/policy/custom
[3]: https://console.aws.amazon.com/iam/home?#/roles/cloudcraft
[4]: https://api.cloudcraft.co/aws/account/iamParameters/policy/minimal
