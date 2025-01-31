### AWS resource collection IAM policy

You can use <a href="https://docs.datadoghq.com/integrations/amazon_web_services/#resource-collection">resource collection</a> out of the box but to avoid warning messages on the AWS integration tile for resources Datadog cannot collect. To enable resource collection, attach the AWS <a href="https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/SecurityAudit" target="_blank">SecurityAudit Policy</a> to your Datadog IAM role.

Additionally, to enable Datadog to collect account management resources from `account.GetAlternateContact` and `account.GetContactInformation`, you need to <a href="https://docs.aws.amazon.com/accounts/latest/reference/using-orgs-trusted-access.html">enable trusted access for AWS account management</a>.
