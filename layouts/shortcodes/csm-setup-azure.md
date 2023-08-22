### Set up the Datadog Azure integration

If you haven't already, set up the [Microsoft Azure integration][1].

**Note**: To access the full set of Azure compliance rules for CSM Misconfigurations, you must enable the `Application.Read.All`, `Directory.Read.All`, `Group.Read.All`, `Policy.Read.All`, and `User.Read.All` permissions for the Microsoft Graph API.

### Enable CSM for your Azure subscriptions

Use one of the following methods to enable CSM for your Azure subscriptions:

#### CSM Setup page

1. On the **[Cloud Security Management Setup page][2]**, click **Cloud accounts**.
2. Expand the **Azure** section.
3. To enable resource collection for a subscription, click the **Resource Scanning** toggle.
4. Click **Done**.

#### Azure integration page

1. On the **[Azure integration page][3]**, select an Azure app registration.
2. Under **Resource Collection**, select the **Collect resources for Cloud Security Posture Management** checkbox.
3. Click **Submit Changes**.

[1]: https://docs.datadoghq.com/integrations/azure
[2]: https://app.datadoghq.com/security/configuration/csm/setup
[3]: https://app.datadoghq.com/integrations/azure