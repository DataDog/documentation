---
title: Knowledge
---

Bits AI SRE improves over time by combining three distinct sources of knowledge:
- **Runbooks:** Step-by-step troubleshooting guidance
- **bits.md:** Knowledge about your environment
- **Feedback and memories:** Learnings from investigations

## Runbooks
Bits AI SRE integrates with **Confluence** to find relevant documentation and runbooks. When you link a Confluence page in a monitor message, Bits reads the page during the investigation, extracts telemetry links, follows documented troubleshooting steps, where possible, and incorporates remediation guidance into its suggestions.

### Best practices: Optimize Bits' understanding of your knowledge
Help Bits interpret and act on your documentation by following these best practices:
Include relevant Datadog telemetry links in your Confluence pages. Bits queries these links to extract information for its investigation.
Provide clear, step-by-step instructions for resolving monitor issues. Bits follows these instructions precisely, so being specific leads to more accurate outcomes.
Document the services or systems involved in detail. Bits uses this information to understand the environment and guide investigations effectively.

<div class="alert alert-tip">The more precisely your Confluence page matches the issue at hand, the more helpful Bits can be.</div>

## Bits.md

{{< callout url="http://datadoghq.com/product-preview/bits-ai-sre-pilot-features" >}}
<b>Bits.md</b> is in Preview. Click <strong>Request Access</strong> to join the Preview program.
{{< /callout >}}

`bits.md` is a Markdown file that provides structured context about your environment to the agent. It serves as lightweight guidance to improve investigation accuracy, query construction, and terminology alignment. Include team-specific knowledge such as tagging conventions, architectural patterns, glossary terms, and investigation best practices.

#### Sample bits.md
{{< code-block lang="yaml" filename="bits.md" collapsible="true" >}}
### Scope rules
- Always carry forward explicit scope from the user (env, service, team, region, namespace).
- Treat mentioned values as hard filters in all queries.
- Do not broaden scope unless explicitly asked.

---
### Tag & naming conventions

#### Environment normalization
Environment values may differ across telemetry sources (monitors, APM, logs, tickets).

Example:
- Alerts/APM: `env:blue-prod`
- Logs: `env:prod`

Rule: When switching data sources, normalize to the correct env value for that source before querying.

---

#### Service Name Normalization
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

# Known noise / false Positives
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

At the end of an investigation, let Bits know whether the conclusion it made was correct.

{{< img src="bits_ai/help_bits_ai_learn_1.png" alt="An investigation conclusion with buttons to rate the conclusion helpful or unhelpful highlighted" style="width:100%;" >}}

If the conclusion was inaccurate, provide Bits with the correct root cause, highlighting what it missed, and explaining what it should do differently next time. Ensure your feedback: 
- Identifies the actual root cause (not just observed effects or symptoms) 
- Specifies relevant services, components, or metrics 
- Includes telemetry links that point to the root cause

**Example high-quality root cause feedback**: "High memory usage in auth-service pod due to memory leak in session cache, causing OOM kills every 2 hours starting at 2025-11-15 14:30 UTC. This is evidenced by `https://app.datadoghq.com/logs?<rest_of_link>`"

Every piece of feedback you rovide creates a **memory**. Bits uses these memories to improve future investigations by recalling past corrections in similar contexts, reusing effective queries, recognizing recurring failure patterns, or improving prioritization of investigative steps. Over time, this allows Bits to adapt to your environment and become more accurate and efficient with each investigation. To manage memories—including viewing and deleting them—navigate to the **Memories** column of the [Monitor Management][1] page.

[1]: https://app.datadoghq.com/bits-ai/monitors/supported
