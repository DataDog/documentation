---
title: Data Security and RBAC
further_reading:
  - link: "/account_management/rbac/data_access"
    tag: "Documentation"
    text: "Learn more about data access controls"
---
{{< whatsnext desc=" ">}}
  {{< nextlink href="https://datadoghq.com/legal/hipaa-eligible-services">}}<u>HIPAA-Eligible Services</u>: Datadog Legal's list of HIPAA-eligible services{{< /nextlink >}}
  {{< nextlink href="/llm_observability/evaluations/#sensitive-data-scanner-integration">}}<u>Sensitive Data Scanning for LLM Observability</u>: Redact sensitive information in your LLM application{{< /nextlink >}}
{{< /whatsnext >}}

## Data Access Control

{{< callout url="#" header="false" btn_hidden="true">}}
  Data Access Control is in Limited Availability.
{{< /callout >}}

LLM Observability allows you to restrict access to potentially sensitive data associated with your ML applications to only certain teams and roles in your organization. This is particularly important when your LLM applications process sensitive information such as personal data, proprietary business information, or confidential user interactions.

Access controls in LLM Observability are built on Datadog's [Data Access Control][1] feature, which enables enables you to regulate access to data deemed sensitive. You can use the `ml_app` tag to identify and restrict access to specific LLM applications within your organization.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/data_access
