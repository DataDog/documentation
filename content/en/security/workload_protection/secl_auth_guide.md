---
title: Getting Started with SECL Custom Rules
disable_toc: false
---

This guide shows you how to write effective SECL (Security Language) rules for Datadog Workload Protection. The guide includes the following:

- How agent rules and detection rules fit together
- Practical workflow for authoring rules
- Checklist of best practices
- Set of drop-in example expressions for Linux, Windows, and cross-platform use cases
- Recommendations for tagging and noise reduction
- Safe rollout plan so your team can ship low-noise, high-signal detections with confidence

## SECL overview

Datadog SECL is a custom domain-specific language used to create agent expressions and policies within Datadog Workload Protection. SECL allows security teams to define real-time threat detection rules by specifying conditions, operators, and patterns that security agents can monitor across hosts, containers, applications, and cloud infrastructure.

## How SECL rules fit together

Think of SECL as a local filter: it runs inside the Agent on each host, watching kernel and OS events. When an event matches your SECL expression, the Agent raises a detection.

Datadog threat detection rules act as backend logic: they combine one or more Agent rules (using `@agent.rule_id`), add thresholds, suppress noise, and decide how alerts are routed.

In summary, the Agent rule finds raw behavior and the detection rule turns it into a usable signal.

<div class="alert alert-info">This guide describes how to create rule expressions manually, but Workload Protection also provides the <b>Assisted rule creator</b> wizard to walk you through creating the Agent and detections rules together. See <a href="/security/threats/workload_security_rules/custom_rules/?tab=host#create-the-custom-agent-and-detection-rules-together">Create the custom Agent and detection rules together.</a></div>

### Agent expression syntax

The standard format of a SECL expression is:

{{< code-block lang="javascript" >}}
<event-type>.<event-attribute> <operator> <value> [<operator> <event-type>.<event-attribute>] ...
{{< /code-block >}}

Using this format, an example rule for a Linux system looks like this:

{{< code-block lang="javascript" >}}

open.file.path == "/etc/shadow" && process.file.path not in ["/usr/sbin/vipw"]

{{< /code-block >}}  

## Quickstart

Here's a summary of the process:

1. Go to Workload Protection [Policies][1].
2. Click **New Policy** to create a policy or open an existing policy.
3. In the policy, click **Add Agent Rule**, and then click **Manual rule creator**.
4. In **Define the agent expression**, enter your expression using the following steps.
5. Select **Linux** or **Windows**. Most expression fields are OS-specific.
6. Choose a trigger (event type). Choose a trigger that aligns with the behavior you want to catch, but not everything that could happen.
   - Examples: `exec`, `open`, `connect`, `create`, `dns`, etc.
7. Anchor the trigger on one or two stable fields. Example:
   - Linux: `exec.file.path`, `process.ancestors.file.name`.
   - Windows: `file.path`, `exec.args`, `open_key.registry.key_path`.
8. Add context to the trigger. Examples:
   - Parent ancestry: `process.ancestors.*`
   - User info: `process.user`, `process.uid`
   - Containers: `container.*`
   - Time: `process.created_at > 5s`
9.  Insert safe exceptions. Examples: `not in [...]`, `!~`, `allowlists`.
10. Name and save the rule.
11. Test the rule:
    -  To test Agent events, open the rule and click **View Events**. The [Agent Events explorer][2] opens and displays the Agent events that match the expression. 
    -  To test detection rules, open Signals: Check if the rule fires too often.
12. Ship it:
    -  Tag it for a targeted environment
    -  Reference in a detection rule
    -  Tune signal volume with suppressions


### Tips

High-Signal Attributes

Process lineage: process.ancestors.file.name → Use this to separate benign system actions from suspicious spawns.

File path: open.file.path → Match sensitive files; combine with not in [...] to allow normal tools.

Network: network.destination.ip in CIDR → Use allowlists of corp ranges to suppress noise.

Container scope: container.id, container.image → Restrict detections to workloads that matter.

Timing: process.created_at > 5s → Useful for catching odd behavior like “read secrets right after start.”

Operators & Matchers

Exact match (==) → Fastest, lowest noise. Always prefer.

List membership (in [...]) → Best for allowlists or controlled sets of values.

Glob match (~"/path/*") → Use for path families; safer and faster than regex.

Regex (=~) → Only when globs/lists can’t solve it. Keep as narrow as possible.

Negation (not in [...], !~) → Use to carve out exceptions explicitly (e.g., trusted tools).

CIDR operators (in CIDR, not in CIDR) → Use for network boundaries.

👉 Rule of thumb: Start with == or in [...]. Reach for regex only as a last resort.

## Rule authoring checklist and style guide




## Common building blocks


## Avoid common mistakes



## Examples


### Linux examples


### Windows examples


### Cross-platform example




## Rollout strategy


## Recommended tagging


[1]: https://app.datadoghq.com/security/workload-protection/policies
[2]: https://app.datadoghq.com/security/workload-protection/agent-events