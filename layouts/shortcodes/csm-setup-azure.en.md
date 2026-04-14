### Set up the Datadog Azure integration

If you haven't already, set up the [Microsoft Azure integration][1].

**Note**: To access the full set of Azure compliance rules—including [Identity Risks][5]—you must enable the following permissions for the [Microsoft Graph API][2].

- `AuditLog.Read.All`
- `AdministrativeUnit.Read.All`
- `Application.Read.All`
- `Directory.Read.All`
- `Domain.Read.All`
- `Group.Read.All`
- `Policy.Read.All`
- `PrivilegedAssignmentSchedule.Read.AzureADGroup`
- `PrivilegedEligibilitySchedule.Read.AzureADGroup`
- `RoleManagement.Read.All`
- `User.Read.All`

### Enable Cloud Security for your Azure subscriptions

1. On the [**Cloud Security Setup**][3] page, click **Cloud Integrations**.
2. Expand the **Azure** section.
3. To enable resource scanning for a subscription, switch the **Resource Scanning** toggle to the on position.
4. To create a filter that excludes certain resources from being evaluated by Cloud Security, click the **Plus** (+) icon under **Resource Evaluation Filters (Optional)**. For more information, see [Use Filters to Exclude Resources from Evaluation][4].
5. Click **Done**.

[1]: https://docs.datadoghq.com/integrations/azure
[2]: https://docs.datadoghq.com/integrations/guide/azure-graph-api-permissions/
[3]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: /security/cloud_security_management/guide/resource_evaluation_filters
[5]: https://docs.datadoghq.com/security/cloud_security_management/identity_risks
