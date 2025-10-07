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

### Test the rule

To view Agent events that match the expression, view the rule details, and then click **View Events**. The [Agent Events explorer][2] opens and displays the Agent events that match the expression. In **Agent Events**, you can see the raw telemetry: every kernel/OS event that matched the SECL rule before suppression or aggregation.

When viewing raw Agent events, do the following:
1. Confirm the rule is firing on the intended activity.
2. Measure the scope and frequency across hosts/environments.
3. Decide if this is the expected baseline or a true threat?
4. Act: Suppress/allowlist if benign, escalate/contain if suspicious.
    
To test detection rules, view the rule details, and then click **[Number] detection rules found**. The Detection Rules explorer opens and displays the backend logic layer: the detection rule, linked signals, metadata, JSON definition, tags, and version history.

When viewing the backend logic for a detection rule, do the following:

1. Confirm that the rule name, description, and JSON (net_util_in_container) clarify what the rule is supposed to catch.
2. Measure whether the rule is noisy or precise by reviewing the aggregate metrics (query histogram, signals over time, affected hosts)..
3. Decide if the detected activity is expected (baseline) or suspicious (threat).
4. Act: Suppress/allowlist if benign, escalate/contain if suspicious.

## Rule authoring tips

- Always set os: filter in the rule YAML when using OS-specific fields:
    
  {{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
  id: my_linux_rule
  expression: exec.file.path == "/usr/bin/passwd"
  filters:
    - os == "linux"
  {{< /code-block >}}
- Prefer exact matches over regex. Use glob-style `~"/path/*"` or `**` for subfolders.
- Use `in [...]` lists instead of long `OR` chains. It makes expressions faster and easier to read.
- Anchor on ancestry to reduce noise. Use `process.ancestors.file.name`.
- Treat regex as last resort. Use globs or `in` where possible.
- Use durations (for example, `> 5s`, `10m`, `2h`) to target narrow execution windows.
- Name rules by behavior, with a format that follows *What + Who + Context*.
- Tag generously: `team`, `app`, `env`, `MITRE`, `severity`.


## Operators and matchers

Exact match (==) → Fastest, lowest noise. Always prefer.

List membership (in [...]) → Best for allowlists or controlled sets of values.

Glob match (~"/path/*") → Use for path families; safer and faster than regex.

Regex (=~) → Only when globs/lists can’t solve it. Keep as narrow as possible.

Negation (not in [...], !~) → Use to carve out exceptions explicitly (e.g., trusted tools).

CIDR operators (in CIDR, not in CIDR) → Use for network boundaries.

👉 Rule of thumb: Start with == or in [...]. Reach for regex only as a last resort.

## Avoid common mistakes

| Pattern                   | Explanation                                 |
| ------------------------- | -------------------------------------------- |
| `proc.args contains "rm"` | Too broad. Matches a lot of valid use cases.  |
| `fd.name contains "/"`    | Matches nearly every file I/O event.     |
| `container.id != ""`      | Useful only if scoped with a more specific field. |


## Rule authoring framework

1. Define the attack vector:
   - **Process Execution:** Unusual binaries, suspicious args.
   - **File Access:** Unauthorized file reads/writes.
   - **Network Activity:** Suspicious connections.
   - **System Calls:** Abnormal kernel activity.
2. Use platform-specific fields that provide meaningful context:
   - Linux context:
    {{< code-block lang="secl" disable_copy="true" collapsible="true" >}}
    # High-value fields
    process.name and process.args and process.user and process.pid
    file.path and file.name and file.permissions
    network.destination.ip and network.destination.port
    {{< /code-block >}}

   - Windows context:
3. 

## Examples

### Linux examples


### Windows examples


### Cross-platform example




## Rollout strategy


## Recommended tagging


[1]: https://app.datadoghq.com/security/workload-protection/policies
[2]: https://app.datadoghq.com/security/workload-protection/agent-events