Agent installation requires permissions beyond the base [AWS integration IAM policy](https://docs.datadoghq.com/integrations/amazon_web_services/#aws-iam-permissions). These permissions let Datadog:

- Store your Datadog API key (AWS Secrets Manager).
- Create and attach the IAM role used to install the Agent (IAM).
- Install the Agent on your EC2 instances (AWS Systems Manager).
- Maintain the Agent's presence (Amazon EventBridge).

<div class="alert alert-info">All write actions run inside your own AWS account through the role created by the CloudFormation stack. Datadog holds no persistent write credentials to your account.</div>

Add the following permissions to your AWS integration IAM policy:

<!-- TODO(DOCS-14545): replace the placeholder block below with the final policy from eng (Grant), formatted to match the other JSON policy blocks on the AWS integration page. The actions below are derived from the permissions table in the setup guide; the guide also requires "the matching Get and List reads" for the IAM actions, which eng still needs to enumerate. -->

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DatadogAgentInstall",
      "Effect": "Allow",
      "Action": [
        "ec2:DescribeInstances",
        "ec2:AssociateIamInstanceProfile",
        "ec2:Disassociate*",
        "ec2:DescribeIamInstanceProfileAssociations",
        "ssm:DescribeInstanceInformation",
        "ssm:GetDocument",
        "ssm:CreateDocument",
        "ssm:UpdateDocument",
        "ssm:UpdateDocumentDefaultVersion",
        "ssm:SendCommand",
        "ssm:ListCommandInvocations",
        "secretsmanager:DescribeSecret",
        "secretsmanager:CreateSecret",
        "iam:CreateRole",
        "iam:CreateInstanceProfile",
        "iam:AddRoleToInstanceProfile",
        "iam:AttachRolePolicy",
        "iam:PutRolePolicy",
        "iam:PassRole",
        "iam:Detach*",
        "iam:Delete*",
        "iam:RemoveRoleFromInstanceProfile",
        "ecs:ListClusters",
        "ecs:ListContainerInstances",
        "events:PutRule",
        "events:PutTargets",
        "events:RemoveTargets",
        "events:DeleteRule"
      ],
      "Resource": "*"
    }
  ]
}
```
