---
title: Data Privacy, Security, and Retention
aliases:
- /llm_observability/data_privacy_security_and_rbac/
- /llm_observability/data_security_and_rbac/
description: Control access to sensitive Agent Observability data with data access controls and RBAC, redact data with span processors, and learn how long Agent Observability retains each type of data.
further_reading:
  - link: "/account_management/rbac/data_access"
    tag: "Documentation"
    text: "Learn more about data access controls"
  - link: "/llm_observability/improve/datasets/"
    tag: "Documentation"
    text: "Work with datasets and dataset versions"
  - link: "/data_security/data_retention_periods/"
    tag: "Documentation"
    text: "See default data retention periods across Datadog products"
  - link: "https://www.datadoghq.com/pricing/?product=llm-observability#products"
    tag: "Pricing"
    text: "Agent Observability pricing"
---
{{< whatsnext desc=" ">}}
  {{< nextlink href="https://datadoghq.com/legal/hipaa-eligible-services">}}<u>HIPAA-Eligible Services</u>: Datadog Legal's list of HIPAA-eligible services{{< /nextlink >}}
{{< /whatsnext >}}

## Data Access Control

Agent Observability allows you to restrict access to potentially sensitive data associated with your ML applications to only certain teams and roles in your organization. This is particularly important when your LLM applications process sensitive information such as personal data, proprietary business information, or confidential user interactions.

Access controls in Agent Observability are built on Datadog's [Data Access Control][11] feature, which enables you to regulate access to data deemed sensitive. You can use the `ml_app` tag to identify and restrict access to specific LLM applications within your organization.

## Redacting data with span processors

You can redact or modify sensitive data at the application level before it is sent to Datadog. Use span processors in the Agent Observability SDK to conditionally modify input and output data on spans, or prevent spans from being emitted entirely.

This is useful for:
- Removing sensitive information from prompts or responses
- Filtering out internal workflows or test data
- Conditionally redacting data based on tags or other criteria

For detailed implementation examples and usage patterns, see the [Span Processing section in the SDK Reference][12].

## Sensitive Data Scanner integration

Agent Observability integrates with [Sensitive Data Scanner][13], which helps prevent data leakage by identifying and redacting any sensitive information (such as personal data, financial details, or proprietary information) that may be present in any step of your LLM application.

By proactively scanning for sensitive data, Agent Observability ensures that conversations remain secure and compliant with data protection regulations. This additional layer of security reinforces Datadog's commitment to maintaining the confidentiality and integration of user interactions with LLMs.

## Data retention

Retention periods in Agent Observability depend on the type of data and on your plan. Traces from your instrumented applications follow the span retention period in your plan, while experiment definitions, datasets, and prompts have their own periods.

| Data                                         | Retention period                                                                          |
| -------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Traces and spans                             | 15 days; 30, 60, or 90 days with a retention add-on                                       |
| Experiment traces                            | On-demand plans: 15 days. Committed plans: 90 days. With a retention add-on: 6, 9, or 12 months    |
| Experiment definitions and aggregate results | 90 days from creation                                                                     |
| Annotated traces, spans, and sessions        | 90 days from the time of annotation, or your span retention period if that is longer      |
| Annotation labels                            | 90 days, matching the object they annotate                                                |
| Dataset records                              | 3 years, regardless of your span retention period                                         |
| Prompts in the prompt registry               | 3 years, extended each time the prompt is pulled                                          |
| `ml_obs.*` metrics                           | 15 months                                                                                 |

### Traces and spans

Traces and spans from your instrumented applications are retained for **15 days** on all plans by default. This applies to everything stored on the span, including per-span operational data such as cost, token counts, latency, and errors, as well as evaluation scores attached to spans.

A retention add-on extends this to **30, 60, or 90 days**. See [Changing your retention period](#changing-your-retention-period).

Retention applies to the raw spans you query in the Trace Explorer. Metrics derived from those spans are retained separately, for longer. See [Metrics](#metrics).

### Experiment traces

On committed plans, the traces produced by [experiment][3] runs are retained longer than production traces.

| Plan                                | Experiment trace retention |
| ----------------------------------- | -------------------------- |
| On-demand                           | 15 days                    |
| Committed (monthly or annual)       | 90 days                    |
| 30-day retention add-on             | 6 months                   |
| 60-day retention add-on             | 9 months                   |
| 90-day retention add-on             | 12 months                  |

If your organization has a custom contract, your retention periods may not match this table. Contact your Datadog account representative to confirm your periods.

### Experiment definitions

The experiment itself — its name, configuration, and aggregate results — is retained for **90 days** from the time it is created. Unlike experiment traces, this period is the same on every plan and does not extend with a retention add-on. Export any experiment results you need to keep beyond 90 days.

### Changing your retention period

Retention length affects what you are billed, because a longer period means Datadog stores more of your data. For rates, see the [Agent Observability pricing page][10].

Retention add-ons are arranged through your account team rather than enabled from the Datadog UI. To request a longer retention period, contact your Datadog account representative or [Datadog support][1].

When you add or extend a retention add-on, the longer period applies **retroactively to every span that has not already expired**. Spans that expired under your previous period are not recoverable.

For example, if you are on the default 15-day retention and add a 60-day add-on today, the spans from the last 15 days pick up the 60-day period, but anything older is already gone.

When you move to a shorter retention period, spans older than the new period are no longer available.

### Annotated objects

Annotating an object extends its retention. When you apply an annotation label or note to a trace, span, or session — whether directly or through an [annotation queue][2] — Datadog retains the annotated object for **90 days** from the time of annotation, even if your span retention period is shorter. Annotating a span retains its whole parent trace, and annotating a trace that belongs to a session retains the whole session.

If your organization's span retention period is longer than 90 days, annotated objects are retained for that longer period instead.

Annotation labels are retained for the same 90 days as the object they annotate, and are no longer viewable after that object expires.

Extending retention by annotating an object does not incur an additional charge.

A free-form note is not attached to a trace, span, or session, so adding one does not extend any object's retention.

### Dataset records

Records in a [dataset][4] are retained for **3 years**, regardless of your span retention period.

Records in previous versions of a dataset are retained for **90 days**. This period is extended each time a previous version is used — for example, when an experiment reads that version. After 90 consecutive days without use, a previous version becomes eligible for permanent deletion. For details on how versions are created, see [Dataset versioning][5].

### Prompts

Prompts in the [prompt registry][9] are retained for **3 years**. This period is extended each time the prompt is pulled by your application, so a prompt in active use stays available. A prompt that is not pulled for 3 years becomes eligible for permanent deletion.

### Metrics

The `ml_obs.*` metrics generated from your spans are standard [Datadog metrics][6] and follow [standard Datadog metric retention][7]: 15 months at full granularity. They are retained on this schedule regardless of your span retention period, so you can build long-term dashboards and monitors on span counts, token usage, cost, latency, and error rates even after the underlying spans expire.

For the full list of available metrics, see [Agent Observability metrics][8].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /llm_observability/investigate/annotation_queues/
[3]: /llm_observability/improve/experiments/
[4]: /llm_observability/improve/datasets/
[5]: /llm_observability/improve/datasets/#dataset-versioning
[6]: /metrics/
[7]: /data_security/data_retention_periods/
[8]: /llm_observability/investigate/metrics/
[9]: /llm_observability/configure/prompt_management/
[10]: https://www.datadoghq.com/pricing/?product=llm-observability#products
[11]: /account_management/rbac/data_access
[12]: /llm_observability/instrument/sdk/#span-processing
[13]: /security/sensitive_data_scanner/
