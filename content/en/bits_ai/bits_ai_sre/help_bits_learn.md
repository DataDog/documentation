---
title: Help Bits learn
---

Reviewing Bits' findings helps Bits learn from any mistakes it makes, enabling it to produce faster and more accurate investigations in the future. 

At the end of an investigation, let Bits know whether the conclusion it made was correct.

{{< img src="bits_ai/help_bits_ai_learn_1.png" alt="An investigation conclusion with buttons to rate the conclusion helpful or unhelpful highlighted" style="width:100%;" >}}

If the conclusion was inaccurate, provide Bits with the correct root cause. Ensure your feedback: 
- Identifies the actual root cause (not just observed effects or symptoms) 
- Specifies relevant services, components, or metrics 
- Includes telemetry links that point to the root cause

**Example high-quality root cause feedback**: "High memory usage in auth-service pod due to memory leak in session cache, causing OOM kills every 2 hours starting at 2025-11-15 14:30 UTC. This is evidenced by `https://app.datadoghq.com/logs?<rest_of_link>`"

In addition, you can review steps that Bits took throughout the investigation and refine its behavior by selecting:
- **Improve This Step**: Share a link to a more effective query for Bits to use next time
- **Always Take This Step**: Tell Bits that this query was helpful and to run it again next time

{{< img src="bits_ai/bits_ai_sre_step_feedback.png" alt="A research step with options to provide feedback" style="width:100%;" >}}

### Bits.md

bits.md is a markdown file that provides specific context to the agent on your environment. It acts as lightweight, structured guidance to improve investigation accuracy, query construction, and terminology alignment. Include team knowledge such as tagging conventions, architectural patterns, glossary, and investigation best practices.

Sample Bits.md
{{< code-block lang="yaml" filename="bits.md" collapsible="true" >}}

## Scope Rules
- Always carry forward explicit scope from the user (env, service, team, region, namespace).
- Treat mentioned values as hard filters in all queries.
- Do not broaden scope unless explicitly asked.

---

## Tag & Naming Conventions

### Environment Normalization
Environment values may differ across telemetry sources (monitors, APM, logs, tickets).

Example:
- Alerts/APM: `env:blue-prod`
- Logs: `env:prod`

Rule: When switching data sources, normalize to the correct env value for that source before querying.

---

### Service Name Normalization
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

# Kubernetes Quick Checks
For pod issues, check Kubernetes events first:
`source:kubernetes pod_name:<pod> kube_namespace:<namespace>`

Common causes:
- `FailedMount` → missing Secret/ConfigMap  
- `ImagePullBackOff` → image/registry issue  
- `OOMKilled` → memory pressure  

---

# Known Noise / False Positives
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


### Manage memories

Every piece of feedback you give generates a **memory**. Bits uses these memories to enhance future investigations by recalling relevant patterns, queries, and corrections. You can navigate to the [Monitor Management][1] page to view and delete memories in the **Memories** column.

[1]: https://app.datadoghq.com/bits-ai/monitors/supported
