### Set up the Datadog Azure integration

If you haven't already, set up the [Microsoft Azure integration][1].

**Note**: To access the full set of Azure compliance rules—including [Identity Risks][5]—you must enable the `Application.Read.All`, `Directory.Read.All`, `Group.Read.All`, `Policy.Read.All`, and `User.Read.All` permissions for the [Microsoft Graph API][2].

### Enable CSM for your Azure subscriptions

1. On the [**Cloud Security Management Setup**][3] page, click **Cloud Integrations**.
2. Expand the **Azure** section.
3. To enable resource scanning for a subscription, switch the **Resource Scanning** toggle to the on position.
4. To create a filter that excludes certain resources from being evaluated by CSM, click the **Plus** (+) icon under **Resource Evaluation Filters (Optional)**. For more information, see [Use Filters to Exclude Resources from Evaluation][4].
5. Click **Done**.

[1]: https://docs.datadoghq.com/integrations/azure
[2]: https://docs.datadoghq.com/integrations/guide/azure-graph-api-permissions/
[3]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: /security/cloud_security_management/guide/resource_evaluation_filters
[5]: https://docs.datadoghq.com/security/cloud_security_management/identity_risks
