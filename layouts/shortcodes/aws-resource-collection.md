### AWS resource collection IAM policy

To use <a href="https://docs.datadoghq.com/integrations/amazon_web_services/#resource-collection">resource collection</a>, you must attach AWS's managed <a href="https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/SecurityAudit" target="_blank">SecurityAudit Policy</a> to your Datadog IAM role.

For the most **complete** security coverage that Datadog can provide, Datadog recommends also attaching the following **read permissions** to the IAM role:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "backup:ListRecoveryPointsByBackupVault",
                "cassandra:Select",
                "ec2:GetSnapshotBlockPublicAccessState",
                "glacier:GetVaultNotifications",
                "glue:ListRegistries",
                "lightsail:GetInstancePortStates",
                "savingsplans:DescribeSavingsPlanRates",
                "savingsplans:DescribeSavingsPlans",
                "timestream:DescribeEndpoints",
                "waf-regional:ListRuleGroups",
                "waf-regional:ListRules",
                "waf:ListRuleGroups",
                "waf:ListRules",
                "wafv2:GetIPSet",
                "wafv2:GetRegexPatternSet"
            ],
            "Effect": "Allow",
            "Resource": "*"
        }
    ]
}
```
