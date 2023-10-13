### Set up the Datadog Azure integration

If you haven't already, set up the [Microsoft Azure integration][1].

**Note**: To access the full set of Azure compliance rules for CSM Misconfigurations, you must enable the `Application.Read.All`, `Directory.Read.All`, `Group.Read.All`, `Policy.Read.All`, and `User.Read.All` permissions for the Microsoft Graph API.

### Enable CSM for your Azure subscriptions

Use one of the following methods to enable CSM for your Azure subscriptions:

#### CSM Setup page

1. On the [**Cloud Security Management Setup** page][2], click **Cloud accounts**.
2. Expand the **Azure** section.
3. To enable resource collection for a subscription, click the **Resource Scanning** toggle.
4. Click **Done**.

#### Azure integration page

1. On the [**Azure Integration** page][3], select an Azure app registration.
2. Under **Resource Collection**, select the **Collect resources for Cloud Security Posture Management** checkbox.
3. Click **Submit Changes**.

### Exclude resources from evaluation

You can use resource tags to create filters that include or exclude resources from being evaluated by CSM. The filters must be specified as a comma-separated list of `key:value` pairs.

**Notes**: 
- Resource evaluation filters can only be used with hosts that are scanned by cloud integrations.
- Tags must be applied directly to the resource. User tags added in Datadog are not taken into account by the filters. The only exception is for tags added on the integration tiles for AWS and Google Cloud Platform.

| Format                       | Value        |
|------------------------------|--------------|
| Allowlist                    | `key:value`  |
| Blocklist                    | `!key:value` |
| Single character wildcard    | `?`          |
| Multiple characters wildcard | `*`          |

The allowlist enables you to specify tags that must be applied to a resource in order for CSM to evaluate it. Allowlist tags are evaluated as OR statements. In other words, at least one of the allowlist tags must be present in order for a resource to be evaluated. In contrast, blocklisted tags are evaluated as AND statements and take precedence over allowlist tags.

**Examples**:

- `!env:staging` excludes resources that have the `env:staging` tag.
- `datadog:monitored, env:prod*` collects metrics for resources that have at least one of these tags.
- `!env:staging, !testing` excludes resources that have both the `env:staging` and `testing` tags.
- `datadog:monitored !region:us-east1` collects metrics for resources that have the `datadog:monitored` tag, so long as the resource does not have the `region:us-east1` tag applied to it.

1. On the [**Cloud Security Management Setup** page][2], click **Cloud accounts**.
2. Expand the **Azure** section.
3. Under **Resource Evaluation Filters (Optional)**, click the **Plus** (+) icon.
4. Enter a comma-separated list of `key:value` pairs for the tags you want to allowlist or blocklist.
5. Click **Save**.

[1]: https://docs.datadoghq.com/integrations/azure
[2]: https://app.datadoghq.com/security/configuration/csm/setup
[3]: https://app.datadoghq.com/integrations/azure