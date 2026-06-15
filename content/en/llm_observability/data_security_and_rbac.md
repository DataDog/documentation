---
title: Data Security and RBAC
description: Restrict access to sensitive Agent Observability data using data access controls, redact data with span processors, and integrate with Sensitive Data Scanner.
further_reading:
  - link: "/account_management/rbac/data_access"
    tag: "Documentation"
    text: "Learn more about data access controls"
---
{{< whatsnext desc=" ">}}
  {{< nextlink href="https://datadoghq.com/legal/hipaa-eligible-services">}}<u>HIPAA-Eligible Services</u>: Datadog Legal's list of HIPAA-eligible services{{< /nextlink >}}
{{< /whatsnext >}}

## Data Access Control

Agent Observability allows you to restrict access to potentially sensitive data associated with your ML applications to only certain teams and roles in your organization. This is particularly important when your LLM applications process sensitive information such as personal data, proprietary business information, or confidential user interactions.

Access controls in Agent Observability are built on Datadog's [Data Access Control][1] feature, which enables you to regulate access to data deemed sensitive. You can use the `ml_app` tag to identify and restrict access to specific LLM applications within your organization.

## Redacting data with span processors

You can redact or modify sensitive data at the application level before it is sent to Datadog. Use span processors in the Agent Observability SDK to conditionally modify input and output data on spans, or prevent spans from being emitted entirely.

This is useful for:
- Removing sensitive information from prompts or responses
- Filtering out internal workflows or test data
- Conditionally redacting data based on tags or other criteria

For detailed implementation examples and usage patterns, see the [Span Processing section in the SDK Reference][2].

## Sensitive Data Scanner integration

Agent Observability integrates with [Sensitive Data Scanner][3], which helps prevent data leakage by identifying and redacting any sensitive information (such as personal data, financial details, or proprietary information) that may be present in any step of your LLM application.

By proactively scanning for sensitive data, Agent Observability ensures that conversations remain secure and compliant with data protection regulations. This additional layer of security reinforces Datadog's commitment to maintaining the confidentiality and integration of user interactions with LLMs.

Sensitive Data Scanner scanning for Agent Observability uses a managed scanning group that Datadog creates automatically when you first open the [Agent Observability Settings page][4]. You cannot create additional scanning groups or delete the managed group.

You can customize the rules in the managed group:

- Add predefined rules from the [Scanning Rule Library][5].
- Disable rules you do not need.
- Add custom rules to detect additional sensitive data patterns.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/data_access
[2]: /llm_observability/instrumentation/sdk/#span-processing
[3]: /security/sensitive_data_scanner/
[4]: https://app.datadoghq.com/sensitive-data-scanner/configuration/llm-spans
[5]: /security/sensitive_data_scanner/scanning_rules/library_rules/

