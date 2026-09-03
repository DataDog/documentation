Datadog instrumentation requires permissions beyond the base [AWS integration IAM policy](https://docs.datadoghq.com/integrations/amazon_web_services/#aws-iam-permissions). The permissions you need depend on the workloads you select.

For **Amazon EC2 instances**, these permissions let Datadog:

- Store your Datadog API key (AWS Secrets Manager).
- Create and attach the IAM role used to install the Agent (IAM).
- Install the Agent on your EC2 instances (AWS Systems Manager).

For **AWS Lambda functions**, these permissions let Datadog:

- Find your functions and read their configuration and tags (AWS Lambda).
- Add and remove the Datadog Lambda layers on a function (AWS Lambda).
- Identify Lambda@Edge functions so they can be skipped (Amazon CloudFront).

Both workloads also use Amazon EventBridge to maintain instrumentation as your AWS resources change.

<div class="alert alert-info">All write actions run inside your own AWS account through the role created by the CloudFormation stack. Datadog does not hold persistent write credentials to your account.</div>

The CloudFormation stack you approve during setup adds these permissions to your AWS integration IAM role, scoped to the workloads you selected. There is no policy to apply manually.
