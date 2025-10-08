### Set up the Datadog AWS integration

If you haven't already, set up the [Amazon Web Services integration][1]. You must also [enable resource collection][2] by attaching the AWS-managed SecurityAudit Policy to the Datadog IAM role in your AWS account.

### Enable Cloud Security for your AWS accounts

1. On the [**Cloud Security Setup**][3] page, click **Cloud Integrations**.
1. Expand the **AWS** section and click the account you want to enable Cloud Security for. A side panel with configuration options for that account opens.
1. Under **Features**, beside each feature you want to enable, turn on the **Enable** toggle.
1. To create a filter that excludes certain resources from being evaluated by Cloud Security, under **Evaluation Filters**, click **Limit to Specific Resources**. Then, click **Add Resource Tags**, add `key:value` tags as required, and click **Save**. For more information, see [Use Filters to Exclude Resources from Evaluation][5].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: /integrations/amazon_web_services/?tab=roledelegation#cloud-security-management
[3]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: https://app.datadoghq.com/integrations/amazon-web-services
[5]: /security/cloud_security_management/guide/resource_evaluation_filters