---
title: Data Retention
description: Learn how long Agent Observability retains traces, experiments, annotations, datasets, prompts, and metrics.
further_reading:
  - link: "/llm_observability/data_privacy_security_and_rbac/"
    tag: "Documentation"
    text: "Control access to sensitive Agent Observability data"
  - link: "/llm_observability/improve/datasets/"
    tag: "Documentation"
    text: "Work with datasets and dataset versions"
  - link: "/llm_observability/investigate/annotation_queues/"
    tag: "Documentation"
    text: "Review traces with annotation queues"
---

Retention periods in Agent Observability depend on the type of data. Traces from your instrumented applications follow the trace retention period in your plan, while experiments, annotations, datasets, and prompts have their own periods.

## Retention by data type

| Data                                       | Retention period                                                    |
| ------------------------------------------ | ------------------------------------------------------------------- |
| Traces and spans                           | 15 days by default; 30, 60, or 90 days with a longer-retention plan |
| Experiment traces                          | 15 days without pre-purchased capacity; 90 to 365 days with it      |
| Experiment definitions and aggregate results | 90 days from creation, on all plans                               |
| Annotated traces, spans, and sessions      | 90 days from the time of annotation, or your trace retention period if that is longer |
| Dataset records (current version)          | 3 years from creation                                               |
| Dataset records (previous versions)        | 90 days, extended each time the version is used                     |
| Prompts in the prompt registry             | 3 years, extended each time the prompt is pulled                    |
| `ml_obs.*` metrics                         | 15 months                                                           |

## Traces and spans

Traces and spans from your instrumented applications are retained for **15 days** by default. This applies to everything stored on the span, including per-span operational data such as cost, token counts, latency, and errors, as well as evaluation scores attached to spans.

Longer retention is available as part of your contract, in tiers of **30, 60, or 90 days**. Because retention affects how much data Datadog stores for you, extending it changes what you are billed for and is arranged with your account team rather than enabled from the Datadog UI. To extend your retention period, contact your Datadog account representative or [Datadog support][1].

Your trace retention period also affects related data. On standard plans, a longer trace retention tier comes with a longer experiment retention period, and trace retention sets the floor for how long annotated objects are kept. See the following sections.

Retention applies to the raw spans you query in the Traces explorer. Metrics derived from those spans are retained separately, for longer. See [Metrics](#metrics).

## Experiment traces

Traces produced by [experiment][3] runs are retained longer than production traces on plans with pre-purchased capacity, because experiments are used to compare results across a development cycle. On these plans, each trace retention tier comes with a longer experiment retention period:

| Trace retention | Experiment trace retention |
| --------------- | -------------------------- |
| 15 days         | 90 days                    |
| 30 days         | 180 days                   |
| 60 days         | 270 days                   |
| 90 days         | 365 days                   |

Without pre-purchased capacity — including organizations that have no Agent Observability entitlement — experiment traces are retained for the same **15 days** as production traces.

If your organization has a custom contract, your retention periods may not follow the pairings in this table. Contact your Datadog account representative to confirm your periods.

### Experiment definitions

The experiment itself — its name, configuration, and aggregate results — is retained for **90 days** from the time it is created. Unlike experiment traces, this period is the same on every plan and does not extend with a longer trace retention tier. Export any experiment results you need to keep beyond 90 days.

## Annotated objects

Annotating an object extends its retention. When you apply an annotation label or note to a trace, span, or session — whether directly or through an [annotation queue][2] — Datadog retains the annotated object for **90 days** from the time of annotation, even if your trace retention period is shorter. Annotating a span retains its whole parent trace, and annotating a trace that belongs to a session retains the whole session.

If your organization's trace retention period is longer than 90 days, annotated objects are retained for that longer period instead.

Annotation labels are viewable for as long as the object they annotate is retained.

Free-form notes are not attached to a trace, span, or session, so no object's retention applies to them.

## Dataset records

Records in the current version of a [dataset][4] are retained for **3 years** from the time they are created.

Records in previous versions of a dataset are retained for **90 days**. This period is extended each time a previous version is used — for example, when an experiment reads that version. After 90 consecutive days without use, a previous version becomes eligible for permanent deletion.

For details on how versions are created, see [Dataset versioning][5].

## Prompts

Prompts in the [prompt registry][9] are retained for **3 years**. This period is extended each time the prompt is pulled by your application, so a prompt in active use stays available. A prompt that is not pulled for 3 years becomes eligible for permanent deletion.

## Metrics

The `ml_obs.*` metrics generated from your spans are standard [Datadog metrics][6] and follow [standard Datadog metric retention][7]: 15 months at full granularity. They are retained on this schedule regardless of your trace retention period, so you can build long-term dashboards and monitors on span counts, token usage, cost, latency, and error rates even after the underlying spans expire.

For the full list of available metrics, see [Agent Observability metrics][8].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /llm_observability/investigate/annotation_queues/
[3]: /llm_observability/improve/experiments/
[4]: /llm_observability/improve/datasets/
[5]: /llm_observability/improve/datasets/#dataset-versioning
[6]: /metrics/
[7]: /developers/guide/data-collection-resolution-retention/
[8]: /llm_observability/investigate/metrics/
[9]: /llm_observability/configure/prompt_management/
