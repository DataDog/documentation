Agent installation requires permissions beyond the base [AWS integration IAM policy](https://docs.datadoghq.com/integrations/amazon_web_services/#aws-iam-permissions). These permissions let Datadog:

- Store your Datadog API key (AWS Secrets Manager).
- Create and attach the IAM role used to install the Agent (IAM).
- Install the Agent on your EC2 instances (AWS Systems Manager).
- Maintain the Agent's presence (Amazon EventBridge).

<div class="alert alert-info">All write actions run inside your own AWS account through the role created by the CloudFormation stack. Datadog holds no persistent write credentials to your account.</div>

The CloudFormation stack you approve during setup adds these permissions to your AWS integration IAM role. There is no policy to apply manually.
