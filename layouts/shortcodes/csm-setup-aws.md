### Set up the Datadog AWS integration

If you haven't already, set up the [Amazon Web Services integration][1]. You must also add the [required permissions][2] for resource collection.

### Enable CSM for your AWS accounts

Use one of the following methods to enable CSM for your AWS accounts:

#### CSM Setup page

1. On the [**Cloud Security Management Setup** page][3], click **Cloud accounts**.
2. Expand the **AWS** section.
3. To enable resource collection for an account, click the **Resource Scanning** toggle.
4. To create a filter that excludes certain resources from being evaluated by CSM, click the **Plus** (+) icon under **Resource Evaluation Filters (Optional)**. For more information, see [Use Filters to Exclude Resources from Evaluation][5].
5. Click **Done**.

#### Amazon Web Services integration page

1. On the [**Amazon Web Services Integration** page][4], select an AWS account.
2. On the **Resource Collection** tab, select **Enable Cloud Security Management**.
3. Click **Save**.

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: /integrations/amazon_web_services/?tab=roledelegation#cloud-security-management-misconfigurations
[3]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: https://app.datadoghq.com/integrations/amazon-web-services
[5]: /security/cloud_security_management/guide/resource_evaluation_filters