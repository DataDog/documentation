---
title: Knowledge Sources
aliases:
- /bits_ai/bits_ai_sre/help_bits_learn/

---

Bits AI SRE improves over time by combining three distinct sources of knowledge:
- [**Runbooks:**](#runbooks) Step-by-step troubleshooting guidance
- [**bits.md:**](#bitsmd) Context about your environment
- [**Feedback and memories:**](#feedback-and-memories) Learnings from investigations

## Runbooks
Think of onboarding Bits AI SRE as you would a new teammate: the more context you provide, the better it can investigate.

You can either add step-by-step troubleshooting instructions directly in the monitor message or link to a Confluence page that contains those instructions.

- **Include Datadog telemetry links**: When adding instructions in the monitor message, include links to the most relevant telemetry. Start with the first place you'd normally look in Datadog when the monitor triggers—for example, a dashboard, logs, traces, or a notebook with key widgets. Links don’t need special formatting; plain URLs work.

Because these links are user-defined, you have control over what Bits AI SRE reviews, ensuring it focuses on the same data you would, and giving you the flexibility to tailor investigations to your team's workflows.

- **Confluence integration**: If your runbooks live in Confluence, link the relevant pages in the monitor message. During an investigation, Bits AI SRE reads the page, extracts telemetry links, follows documented troubleshooting steps where possible, and incorporates remediation guidance into its recommendations.

To maximize the value of this integration, document the services, dependencies, and systems involved in detail, and provide clear, step-by-step instructions for resolving the issue. Well-structured, specific runbooks enable Bits AI SRE to conduct more accurate and effective investigations.

{{< img src="bits_ai/optimization_example.png" alt="Example monitor with optimization steps applied" style="width:100%;" >}}

## Bits.md

{{< callout url="https://datadoghq.com/product-preview/bits-ai-sre-pilot-features" >}}
<b>Bits.md</b> is in Preview. Click <strong>Request Access</strong> to join the Preview program.
{{< /callout >}}

`bits.md` is a Markdown file that provides structured context about your environment to Bits. It serves as lightweight guidance to improve investigation accuracy, query construction, and terminology alignment. Add team-specific knowledge such as tagging conventions, architectural patterns, glossary terms, and investigation best practices.

Go to [**Bits AI SRE** > **Settings** > **Bits.md**][2] to create and manage your `bits.md` file.

### Sample bits.md
{{< code-block lang="markdown" filename="bits.md" collapsible="true" >}}
## Scope rules
- Always carry forward explicit scope from the user (env, service, team, region, namespace).
- Treat mentioned values as hard filters in all queries.
- Do not broaden scope unless explicitly asked.

---

## Tag and naming conventions

### Environment normalization
Environment values may differ across telemetry sources (monitors, APM, logs, tickets).

Example:
- Alerts/APM: `env:blue-prod`
- Logs: `env:prod`

Rule: When switching data sources, normalize to the correct env value for that source before querying.

---

### Service name normalization
Service/application names may appear in different formats across systems (alerts, logs, tickets, asset systems).

Example:
- Alert tag: `checkout_prd`
- Ticketing system: `CHECKOUT`
- Logs: `checkout-service`

Rule:
- Derive a canonical service name.
- Use case-insensitive or wildcard matching when correlating across systems.
- Do not assume naming is identical across tools.

---

## Kubernetes quick checks
For pod issues, check Kubernetes events first:
`source:kubernetes pod_name:<pod> kube_namespace:<namespace>`

Common causes:
- `FailedMount` → missing Secret/ConfigMap
- `ImagePullBackOff` → image/registry issue
- `OOMKilled` → memory pressure

---

## Known noise and false positives
Document recurring patterns that look like incidents but are expected behavior.

Examples:
- Nightly batch jobs trigger CPU spikes between 02:00–02:30 UTC.
- Synthetic monitoring tests intentionally generate short-lived 5xx errors.
- Canary deployments temporarily increase error rates during rollout.
- Autoscaling events may cause brief latency spikes.

Rule:
- Check whether the signal matches a documented noise pattern.
- If behavior matches a known pattern, classify as expected unless additional impact is observed.

{{< /code-block >}}

## Feedback and memories

At the end of an investigation, let Bits AI SRE know whether the conclusion it made was correct.

{{< img src="bits_ai/help_bits_ai_learn_1.png" alt="An investigation conclusion with the helpful and unhelpful rating buttons highlighted" style="width:100%;" >}}

If the conclusion was inaccurate, provide Bits AI SRE with the correct root cause, highlighting what it missed, and explaining what it should do differently next time. Your feedback should:
- Identify the actual root cause (not just observed effects or symptoms)
- Specify relevant services, components, or metrics
- Include telemetry links that point to the root cause

**Example high-quality root cause feedback**: "High memory usage in auth-service pod due to memory leak in session cache, causing OOM kills every 2 hours starting at 2025-11-15 14:30 UTC. This is evidenced by `https://app.datadoghq.com/logs?<rest_of_link>`"

Every piece of feedback you provide creates a **memory**. Bits AI SRE dynamically selects which memories to use in future investigations to improve its performance. It applies past corrections in similar contexts, reuses effective queries, and refines how it prioritizes investigative steps. Over time, this enables Bits AI SRE to adapt to your environment, becoming more accurate and efficient with each investigation.

To manage memories, including viewing and deleting them, go to the **Memories** column of the [Monitor Management][1] page.

[1]: https://app.datadoghq.com/bits-ai/monitors/supported
[2]: https://app.datadoghq.com/bits-ai/settings/bits-md
