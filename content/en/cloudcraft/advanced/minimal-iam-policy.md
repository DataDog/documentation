---
title: Create a minimal IAM policy to use with Cloudcraft
kind: guide
---

Cloudcraft uses a _read-only_ IAM (Identity and access management) role to scan your AWS (Amazon Web Services) account and reverse-engineer the service relationships between components and autogenerate a diagram of your architecture.

The easiest way to set everything up is to follow the instructions inside the application, which creates the role and sets up the permissions for you in just a few clicks. The role is assigned the AWS-managed `ReadOnlyAccess` IAM policy by default.

You also have the option to control the access granted to Cloudcraft when scanning your AWS account by creating a custom IAM policy, which you can fully customize by removing access to specific AWS services, and APIs. If you remove access to an AWS service from the policy, Cloudcraft won't discover resources for that particular service.

<section class="alert alert-info">
  <p>When using a custom IAM policy, it will be your responsibility to keep it updated as new services and features are added to Cloudcraft.</p>
</section>

## Creating a custom IAM policy

Start by opening the [IAM Policies Console](https://console.aws.amazon.com/iamv2/home#/policies) and clicking the **Create Policy** button.

{{< img src="cloudcraft/advanced/minimal-iam-policy/create-policy.png" alt="Screenshot of AWS IAM management console highlighting the Create policy button." responsive="true" style="width:100%;">}}

Switch to the JSON tab, copy the content of the policy you see below or from [the minimal IAM API endpoint](https://api.cloudcraft.co/aws/account/iamParameters/policy/custom), and then paste it into the editor box. This policy represents the minimal set of AWS permissions required for a complete environment scan by Cloudcraft.

You may customize the policy to suit your unique requirements.

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

Click the **Review policy** button at the bottom of the screen, and then fill in the name and description as you see fit. The information following is recommended to keep things organized and easier to audit.

- **Policy Name:** Cloudcraft
- **Policy Description:** Custom policy for Cloudcraft. Version 20230818.

Now, click the **Create policy** button to create the policy. The AWS console will redirect you back to the policies page, and you should see a green success message at the top of your screen.

Finally, attach the newly created policy to the [Cloudcraft IAM role](https://console.aws.amazon.com/iam/home?#/roles/cloudcraft). If you didn't create the role yet, please follow the instructions inside the application.

## Strict policy

A stricter version of the minimal IAM policy is also available.

- [JSON file for the strict IAM policy](https://api.cloudcraft.co/aws/account/iamParameters/policy/minimal)

If you have any questions, [reach out to the support team](https://app.cloudcraft.co/support), and they will be happy to help.
