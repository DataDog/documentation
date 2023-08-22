### Set up the Datadog AWS integration

If you haven't already, set up the [Amazon Web Services integration][1]. For CSM Misconfigurations, you must also add the [required permissions][2] for resource collection.

### Enable CSM for your AWS accounts

Use one of the following methods to enable CSM for your AWS accounts:

#### CSM Setup page

1. On the **[Cloud Security Management Setup][3]** page, click **Cloud accounts**.
2. Expand the **AWS** section.
3. To enable resource collection for an account, click the **Resource Scanning** toggle.
4. Click **Done**.

#### Amazon Web Services integration page

1. On the **[Amazon Web Services][4]** integration page, select an AWS account.
2. On the **Resource Collection** tab, select the **Cloud Security Posture Management Collection** checkbox.
3. Click **Save**.

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: /integrations/amazon_web_services/?tab=roledelegation#cloud-security-management-misconfigurations
[3]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: https://app.datadoghq.com/integrations/amazon-web-services