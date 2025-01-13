### Set up the Datadog AWS integration

If you haven't already, set up the [Amazon Web Services integration][1]. You must also add the [required permissions][2] for resource collection.

### Enable CSM for your AWS accounts

1. On the [**Cloud Security Management Setup**][3] page, click **Cloud Integrations**.
1. Expand the **AWS** section.
1. To enable resource scanning for an account, click the **Plus** button, then switch the **Enable Resource Scanning** toggle to the on position.
1. Click **Done**.
1. To create a filter that excludes certain resources from being evaluated by CSM, click the **Plus** (+) icon under **Resource Evaluation Filters (Optional)**. For more information, see [Use Filters to Exclude Resources from Evaluation][5].
1. Click **Done**.

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: /integrations/amazon_web_services/?tab=roledelegation#cloud-security-management-misconfigurations
[3]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: https://app.datadoghq.com/integrations/amazon-web-services
[5]: /security/cloud_security_management/guide/resource_evaluation_filters