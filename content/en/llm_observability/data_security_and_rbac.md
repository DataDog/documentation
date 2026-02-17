---
title: Data Security and RBAC
further_reading:
  - link: "/account_management/rbac/data_access"
    tag: "Documentation"
    text: "Learn more about data access controls"
---
{{< whatsnext desc=" ">}}
  {{< nextlink href="https://datadoghq.com/legal/hipaa-eligible-services">}}<u>HIPAA-Eligible Services</u>: Datadog Legal's list of HIPAA-eligible services{{< /nextlink >}}
{{< /whatsnext >}}

## Data Access Control

{{< callout url="#" header="false" btn_hidden="true">}}
  Data Access Control is in Limited Availability.
{{< /callout >}}

LLM Observability allows you to restrict access to potentially sensitive data associated with your ML applications to only certain teams and roles in your organization. This is particularly important when your LLM applications process sensitive information such as personal data, proprietary business information, or confidential user interactions.

Access controls in LLM Observability are built on Datadog's [Data Access Control][1] feature, which enables you to regulate access to data deemed sensitive. You can use the `ml_app` tag to identify and restrict access to specific LLM applications within your organization.

## Redacting data with span processors

You can redact or modify sensitive data at the application level before it is sent to Datadog. Use span processors in the LLM Observability SDK to conditionally modify input and output data on spans, or prevent spans from being emitted entirely.

This is useful for:
- Removing sensitive information from prompts or responses
- Filtering out internal workflows or test data
- Conditionally redacting data based on tags or other criteria

For detailed implementation examples and usage patterns, see the [Span Processing section in the SDK Reference][2].

## Sensitive Data Scanner integration

LLM Observability integrates with [Sensitive Data Scanner][3], which helps prevent data leakage by identifying and redacting any sensitive information (such as personal data, financial details, or proprietary information) that may be present in any step of your LLM application.

By proactively scanning for sensitive data, LLM Observability ensures that conversations remain secure and compliant with data protection regulations. This additional layer of security reinforces Datadog's commitment to maintaining the confidentiality and integration of user interactions with LLMs.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/data_access
[2]: /llm_observability/instrumentation/sdk/#span-processing
[3]: /security/sensitive_data_scanner/

