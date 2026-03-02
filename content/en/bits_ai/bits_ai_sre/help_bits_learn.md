---
title: Help Bits learn
---

Bits improves over time based on the feedback and guidance you provide. You can help it produce faster, more accurate investigations in three ways:

- Review and correct investigation results
- Guide how it investigates your environment
- Manage the memories it creates

## Provide feedback on investigations

At the end of an investigation, let Bits know whether the conclusion it made was correct.

{{< img src="bits_ai/help_bits_ai_learn_1.png" alt="An investigation conclusion with the helpful and unhelpful rating buttons highlighted" style="width:100%;" >}}

If the conclusion was inaccurate, provide Bits with the correct root cause. Your feedback should:
- Identify the actual root cause (not just observed effects or symptoms)
- Specify relevant services, components, or metrics
- Include telemetry links that point to the root cause

**Example high-quality root cause feedback**: "High memory usage in auth-service pod due to memory leak in session cache, causing OOM kills every 2 hours starting at 2025-11-15 14:30 UTC. This is evidenced by `https://app.datadoghq.com/logs?<rest_of_link>`"

In addition, you can review steps that Bits took throughout the investigation and refine its behavior by selecting:
- **Improve This Step**: Share a link to a more effective query for Bits to use next time.
- **Always Take This Step**: Tell Bits that this query was helpful and to run it again next time.

{{< img src="bits_ai/bits_ai_sre_step_feedback.png" alt="A completed investigation step with Improve This Step and Always Take This Step feedback options" style="width:100%;" >}}

## Configure proactive guidance with bits.md

{{< callout url="https://datadoghq.com/product-preview/bits-ai-sre-pilot-features" >}}
<b>Bits.md</b> is in Preview. Click <strong>Request Access</strong> to join the Preview program.
{{< /callout >}}

In addition to reviewing completed investigations, you can proactively guide how Bits investigates your environment by creating a `bits.md` file at [**Bits AI SRE** > **Settings** > **Bits.md**][2].

`bits.md` is a Markdown file that provides structured context about your environment to Bits. It serves as lightweight guidance to improve investigation accuracy, query construction, and terminology alignment. Add team-specific knowledge such as tagging conventions, architectural patterns, glossary terms, and investigation best practices.


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

## Manage memories

Every piece of feedback you give generates a **memory**. Bits uses these memories to enhance future investigations by recalling relevant patterns, queries, and corrections. Go to the [Monitor Management][1] page to view and delete memories in the **Memories** column.

[1]: https://app.datadoghq.com/bits-ai/monitors/supported
[2]: https://app.datadoghq.com/bits-ai/settings/bits-md
