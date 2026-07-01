Agent installation requires permissions beyond the base [AWS integration IAM policy](https://docs.datadoghq.com/integrations/amazon_web_services/#aws-iam-permissions). These permissions let Datadog:

- Store your Datadog API key (AWS Secrets Manager).
- Create and attach the IAM role used to install the Agent (IAM).
- Install the Agent on your EC2 instances (AWS Systems Manager).
- Maintain the Agent's presence (Amazon EventBridge).
- Provision supporting infrastructure for EKS installations (AWS Lambda).

<div class="alert alert-info">All write actions run inside your own AWS account through the role created by the CloudFormation stack. Datadog holds no persistent write credentials to your account.</div>

Add the following permissions to your AWS integration IAM policy:

<!-- TODO(DOCS-14545): replace the placeholder block below with the final policy from eng (Grant), formatted to match the other JSON policy blocks on the AWS integration page. -->

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DatadogAgentInstall",
      "Effect": "Allow",
      "Action": [
        "secretsmanager:CreateSecret",
        "secretsmanager:PutSecretValue",
        "iam:CreateRole",
        "iam:AttachRolePolicy",
        "iam:PassRole",
        "ssm:SendCommand",
        "ssm:ListCommands",
        "events:PutRule",
        "events:PutTargets"
      ],
      "Resource": "*"
    }
  ]
}
```
