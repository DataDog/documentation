---
title: Use Filters to Exclude Resources from Evaluation
further_reading:
  - link: /security/cloud_security_management/guide
    tag: Documentation
    text: Cloud Security Management Guides
  - link: /security/cloud_security_management/setup
    tag: Documentation
    text: Setting Up Cloud Security Management
---

You can use resource tags to create filters that include or exclude resources from being evaluated by Cloud Security Management (CSM). The filters must be specified as a comma-separated list of `key:value` pairs.

**Notes**:

- Resource evaluation filters can only be used with hosts that are scanned by cloud integrations.
- Tags must be applied directly to the resource. The filters do not take into account user tags added in Datadog. The only exception is for tags added on the integration tiles for AWS and Google Cloud Platform.

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

## Exclude resources from evaluation

{{< tabs >}}
{{% tab "AWS" %}}

1. On the [**Cloud Security Management Setup** page][1], click **Cloud accounts**.
2. Expand the **AWS** section.
3. Under **Resource Evaluation Filters (Optional)**, click the **Plus** (+) icon for the account you want to add the filter to.
4. Enter a comma-separated list of `key:value` pairs for the tags you want to allowlist or blocklist.
5. Click **Save**.

[1]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}
{{% tab "Azure" %}}

1. On the [**Cloud Security Management Setup** page][1], click **Cloud accounts**.
2. Expand the **Azure** section.
3. Expand a subscription.
3. Under **Resource Evaluation Filters (Optional)**, click the **Plus** (+) icon.
4. Enter a comma-separated list of `key:value` pairs for the tags you want to allowlist or blocklist.
5. Click **Save**.

[1]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}
{{% tab "Google Cloud" %}}

1. On the [**Cloud Security Management Setup** page][1], click **Cloud accounts**.
2. Expand the **GCP** section.
3. Expand a project.
3. Under **Resource Evaluation Filters (Optional)**, click the **Plus** (+) icon.
4. Enter a comma-separated list of `key:value` pairs for the tags you want to allowlist or blocklist.
5. Click **Save**.

[1]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}