## AWS IAM Permissions

AWS IAM permissions enable Datadog to collect metrics, tags, CloudWatch events, and other data necessary to monitor your AWS environment.

To correctly set up the AWS Integration, you must attach the relevant IAM policies below to the **Datadog AWS Integration IAM Role** you have created in your AWS account.

### AWS Integration IAM Policy

The set of permissions necessary to use all the integrations for individual AWS services.

The following permissions included in the policy document use wild cards such as `List*` and `Get*`. If you require strict policies, use the complete action names as listed and reference the Amazon API documentation for your respective services.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "apigateway:GET",
                "autoscaling:Describe*",
                "backup:List*",
                "budgets:ViewBudget",
                "cloudfront:GetDistributionConfig",
                "cloudfront:ListDistributions",
                "cloudtrail:DescribeTrails",
                "cloudtrail:GetTrailStatus",
                "cloudtrail:LookupEvents",
                "cloudwatch:Describe*",
                "cloudwatch:Get*",
                "cloudwatch:List*",
                "codedeploy:List*",
                "codedeploy:BatchGet*",
                "directconnect:Describe*",
                "dynamodb:List*",
                "dynamodb:Describe*",
                "ec2:Describe*",
                "ecs:Describe*",
                "ecs:List*",
                "elasticache:Describe*",
                "elasticache:List*",
                "elasticfilesystem:DescribeFileSystems",
                "elasticfilesystem:DescribeTags",
                "elasticfilesystem:DescribeAccessPoints",
                "elasticloadbalancing:Describe*",
                "elasticmapreduce:List*",
                "elasticmapreduce:Describe*",
                "es:ListTags",
                "es:ListDomainNames",
                "es:DescribeElasticsearchDomains",
                "fsx:DescribeFileSystems",
                "fsx:ListTagsForResource",
                "health:DescribeEvents",
                "health:DescribeEventDetails",
                "health:DescribeAffectedEntities",
                "kinesis:List*",
                "kinesis:Describe*",
                "lambda:GetPolicy",
                "lambda:List*",
                "logs:DeleteSubscriptionFilter",
                "logs:DescribeLogGroups",
                "logs:DescribeLogStreams",
                "logs:DescribeSubscriptionFilters",
                "logs:FilterLogEvents",
                "logs:PutSubscriptionFilter",
                "logs:TestMetricFilter",
                "organizations:DescribeOrganization",
                "rds:Describe*",
                "rds:List*",
                "redshift:DescribeClusters",
                "redshift:DescribeLoggingStatus",
                "route53:List*",
                "s3:GetBucketLogging",
                "s3:GetBucketLocation",
                "s3:GetBucketNotification",
                "s3:GetBucketTagging",
                "s3:ListAllMyBuckets",
                "s3:PutBucketNotification",
                "ses:Get*",
                "sns:List*",
                "sns:Publish",
                "sqs:ListQueues",
                "states:ListStateMachines",
                "states:DescribeStateMachine",
                "support:DescribeTrustedAdvisor*",
                "support:RefreshTrustedAdvisorCheck",
                "tag:GetResources",
                "tag:GetTagKeys",
                "tag:GetTagValues",
                "xray:BatchGetTraces",
                "xray:GetTraceSummaries"
            ],
            "Effect": "Allow",
            "Resource": "*"
        }
    ]
}
```
### AWS Security Audit Policy

To use <a href="https://docs.datadoghq.com/integrations/amazon_web_services/#resource-collection" target="_blank">Cloud Security Posture Management</a>, attach AWS's managed <a href="https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/SecurityAudit" target="_blank">SecurityAudit Policy</a> to your Datadog IAM role.
