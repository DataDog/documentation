---
title: Writing Custom Rule Expressions
disable_toc: false
aliases:
  - /security/cloud_security_management/guide/custom-rules-guidelines
  - /security/workload_protection/guide/custom-rules-guidelines
---

## Quickstart

Here's a summary of the process:

1. Go to Workload Protection [Policies][1].
2. Click **New Policy** to create a policy, or select an existing policy from the list to open it.
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
9.  Insert safe exceptions. Examples: `not in [...]`, `!~`. In SECL, you can implement "allowlists" (the conditions that are included or excluded from detection) using ordinary operators like `not in`, `!~`, or conditional exclusions.
10. Name and save the rule.

### Test the rule

To view Agent events that match the expression, view the rule details, and then click **View Events**. The [Agent Events explorer][2] opens and displays the Agent events that match the expression. In **Agent Events**, you can see the raw telemetry: every kernel/OS event that matched the SECL rule before suppression or aggregation.

When viewing raw Agent events, do the following:
1. Confirm the rule is firing on the intended activity.
2. Measure the scope and frequency across hosts/environments.
3. Decide if this is the expected baseline or a true threat.
4. If events are benign, add a suppression or update your expression with allowlist conditions.
5. If events are suspicious, escalate by passing the finding into your incident process, or take action to stop or isolate the suspicious workload.
    
To test detection rules, view the rule details, and then click **[Number] detection rules found**. The Detection Rules explorer opens and displays the backend logic layer: the detection rule, linked signals, metadata, JSON definition, tags, and version history.

When viewing the backend logic for a detection rule, do the following:

1. Confirm that the rule name, description, and JSON (net_util_in_container) clarify what the rule is supposed to catch.
2. Measure whether the rule is noisy or precise by reviewing the aggregate metrics (query histogram, signals over time, affected hosts)..
3. Decide if the detected activity is expected (baseline) or suspicious (threat).
4. Suppress/allowlist if benign, escalate/contain if suspicious.

## Rollout strategy

| Phase        | Action                                                       |
| ------------ | ------------------------------------------------------------ |
| **Draft**    | Author rule with YAML metadata and proper filters.               |
| **Simulate** | Use Agent in read-only mode.                   |
| **Validate** | Run in staging workloads. Validate behavior with real events. |
| **Tune**     | Add suppressions, `not in`, `container.image`, etc.          |
| **Scale**    | Reference in backend detection rules for full rollout.        |

After validatation and deployment, continue monitoring rule performance to keep false positives low and coverage strong as workloads evolve.

[1]: https://app.datadoghq.com/security/workload-protection/policies
[2]: https://app.datadoghq.com/security/workload-protection/agent-events
[3]: /security/workload_protection/agent_expressions