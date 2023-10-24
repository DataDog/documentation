### Set up the Datadog AWS integration

If you haven't already, set up the [Amazon Web Services integration][1]. You must also add the [required permissions][2] for resource collection.

### Enable CSM for your AWS accounts

Use one of the following methods to enable CSM for your AWS accounts:

#### CSM Setup page

1. On the [**Cloud Security Management Setup** page][3], click **Cloud accounts**.
2. Expand the **AWS** section.
3. To enable resource collection for an account, click the **Resource Scanning** toggle.
4. Click **Done**.

#### Amazon Web Services integration page

1. On the [**Amazon Web Services Integration** page][4], select an AWS account.
2. On the **Resource Collection** tab, select the **Cloud Security Posture Management Collection** checkbox.
3. Click **Save**.

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

1. On the [**Cloud Security Management Setup** page][3], click **Cloud accounts**.
2. Expand the **AWS** section.
3. Under **Resource Evaluation Filters (Optional)**, click the **Plus** (+) icon.
4. Enter a comma-separated list of `key:value` pairs for the tags you want to allowlist or blocklist.
5. Click **Save**.

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: /integrations/amazon_web_services/?tab=roledelegation#cloud-security-management-misconfigurations
[3]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: https://app.datadoghq.com/integrations/amazon-web-services