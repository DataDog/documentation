### AWS resource collection IAM policy

To use <a href="https://docs.datadoghq.com/integrations/amazon_web_services/#resource-collection">resource collection</a>, you must attach AWS's managed <a href="https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/SecurityAudit" target="_blank">SecurityAudit Policy</a> to your Datadog IAM role.

**Notes**:
   - Warning messages appear on the AWS integration tile in Datadog if you enable resource collection, but do not have the AWS Security Audit Policy attached to your Datadog IAM role.
   - To enable Datadog to collect account management resources from `account.GetAlternateContact` and `account.GetContactInformation`, you need to <a href="https://docs.aws.amazon.com/accounts/latest/reference/using-orgs-trusted-access.html">enable trusted access for AWS account management</a>.
   - AWS China accounts are not supported.
   - Enabling resource collection can also impact your AWS CloudWatch costs. To avoid these charges, disable **Usage** (`AWS/Usage`) metrics in the **Metric Collection** tab of the [Datadog AWS integration page][100].

[100]: https://app.datadoghq.com/integrations/amazon-web-services/

