Some Azure environments enforce constraints that affect how the Datadog integration can be deployed. Review these considerations before starting setup if your subscription has Azure Policy enforcement, custom Marketplace plans, or other enterprise governance requirements.

### Mandatory resource tags and Azure Policy

The default Datadog ARM template does not accept custom tags. If your subscription enforces an Azure Policy that requires specific resource tags, the portal-based deployment fails with a `PolicyViolation` error.

To deploy in environments with mandatory tag policies, use one of:

- The Azure CLI, with tags injected as deployment parameters.
- A [Terraform-based deployment][1000].
- A customized ARM template that adds the required tags.

### Azure Marketplace and pay-as-you-go eligibility

ARM template-based deployments require an eligible Azure Marketplace plan and active pay-as-you-go billing. Plans in `stop sell` status produce an error during ARM template validation, similar to:

`SaaS Purchase Payment Check Failed - Plan '<plan>' is defined as stop sell in offer '<offer>'`

If you see this error, deploy the integration using the manual setup method. You can also contact Azure Marketplace support to confirm plan eligibility for your subscription.

### Common ARM template errors

| Error snippet | Likely cause | Action |
|---|---|---|
| `stop sell in offer` | Marketplace plan restriction | Switch to manual setup or contact Azure Marketplace support. |
| `Forbidden` or `AuthorizationFailed` | Missing Owner role or App registration permissions | Verify the deploying principal has Owner on the subscription. |
| `PolicyViolation` | Azure Policy blocking the deployment (commonly mandatory tags) | Use the CLI or Terraform path so required tags can be injected. |

[1000]: https://github.com/DataDog/integrations-management
