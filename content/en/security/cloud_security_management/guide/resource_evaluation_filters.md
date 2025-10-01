---
title: Use Filters to Exclude Resources from Evaluation
further_reading:
  - link: "/security/cloud_security_management/guide"
    tag: "Documentation"
    text: Cloud Security Guides
  - link: "/security/cloud_security_management/setup"
    tag: "Documentation"
    text: Setting Up Cloud Security
---

You can use resource tags to create filters that include or exclude resources from being evaluated by Cloud Security. The filters must be specified as a comma-separated list of `key:value` pairs.

**Notes**:

- Resource evaluation filters can only be used with hosts that are scanned by cloud integrations.
- Tags must be applied directly to the resource. The filters do not take into account user tags added in Datadog. The only exception is for tags added on the integration tiles for AWS and Google Cloud Platform.

| Format                       | Value        |
|------------------------------|--------------|
| Allowlist                    | `key:value`  |
| Blocklist                    | `!key:value` |
| Single character wildcard    | `?`          |
| Multiple characters wildcard | `*`          |

The allowlist enables you to specify tags that must be applied to a resource in order for Cloud Security to evaluate it. Allowlist tags are evaluated as OR statements. In other words, at least one of the allowlist tags must be present in order for a resource to be evaluated. In contrast, blocklisted tags are evaluated as AND statements and take precedence over allowlist tags.

**Examples**:

- `!env:staging` excludes resources that have the `env:staging` tag.
- `datadog:monitored, env:prod*` collects metrics for resources that have at least one of these tags.
- `!env:staging, !testing` excludes resources that have both the `env:staging` and `testing` tags.
- `datadog:monitored !region:us-east1` collects metrics for resources that have the `datadog:monitored` tag, so long as the resource does not have the `region:us-east1` tag applied to it.

## Exclude cloud resources from evaluation

{{< tabs >}}
{{% tab "AWS" %}}

1. On the [**Cloud Security Setup** page][1], click **Cloud Integrations**.
1. Expand the **AWS** section and click the account you want to create resource evaluation filters for. A side panel with configuration options for that account opens.
1. Under **Evaluation Filters**, click **Limit to Specific Resources**. Then, click **Add Resource Tags**, add `key:value` tags as required, and click **Save**.

[1]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}
{{% tab "Azure" %}}

1. On the [**Cloud Security Setup** page][1], click **Cloud Integrations**.
2. Expand the **Azure** section.
3. Expand a subscription.
3. Under **Resource Evaluation Filters (Optional)**, click the **Plus** (+) icon.
4. Enter a comma-separated list of `key:value` pairs for the tags you want to allowlist or blocklist.
5. Click **Save**.

[1]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}
{{% tab "Google Cloud" %}}

1. On the [**Cloud Security Setup** page][1], click **Cloud Integrations**.
2. Expand the **GCP** section.
3. Expand a project.
3. Under **Resource Evaluation Filters (Optional)**, click the **Plus** (+) icon.
4. Enter a comma-separated list of `key:value` pairs for the tags you want to allowlist or blocklist.
5. Click **Save**.

[1]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}
{{< /tabs >}}

## Exclude containers from evaluation using the Datadog Agent

For information on how to configure your Datadog Agent to exclude containers from security monitoring, see [Container Discovery Management][1].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /containers/guide/container-discovery-management/#security-configuration