Datadog instrumentation requires permissions beyond the base [AWS integration IAM policy][100].

For **Amazon EC2 instances**, Datadog needs permissions to:

- Store your Datadog API key (AWS Secrets Manager).
- Create and attach the IAM role used to install the Agent (IAM).
- Install the Agent on your EC2 instances (AWS Systems Manager).

For **AWS Lambda functions**, Datadog needs permissions to:

- Find your functions and read their configuration and tags (AWS Lambda).
- Add and remove the Datadog Lambda layers on a function (AWS Lambda).
- Identify Lambda@Edge functions so Datadog can skip them (Amazon CloudFront).

For **Amazon EKS clusters**, Datadog needs permissions to:

- Inspect clusters and manage the Datadog Operator and prerequisite add-ons (Amazon EKS).
- Store the API key and cluster-specific Service Access Token, and update the token secret when a replacement token is needed (AWS Secrets Manager).
- Manage the scoped credential synchronization role and Pod Identity association (IAM and Amazon EKS).

For all workloads, Datadog also uses Amazon EventBridge to maintain instrumentation as your AWS resources change.

<div class="alert alert-info">All AWS write actions run inside your own AWS account through the role created by the CloudFormation stack. Datadog does not hold persistent write credentials to your account.</div>

The CloudFormation stack you approve during setup adds these permissions to your AWS integration IAM role, scoped to the workloads you selected. There is no policy to apply manually.

[100]: https://docs.datadoghq.com/integrations/amazon_web_services/#aws-iam-permissions
