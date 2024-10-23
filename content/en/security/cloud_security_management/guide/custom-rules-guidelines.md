---
title: Guidelines for Writing Custom CSM Threats Rules
further_reading:
- link: "/security/threats/workload_security_rules"
  tag: "Documentation"
  text: "Managing CSM Threats Rules"
- link: "/security/threats/agent_expressions"
  tag: "Documentation"
  text: "Agent Expression Syntax"
---

At some point, you may want to write your own [custom Cloud Security Management Threats (CSM Threats) Agent rules][1]. When writing your own rules, there are a few strategies you can use to optimize for efficiency.

## Attributes

To ensure that your policy is evaluated in-kernel for maximum efficiency, always use one of the following attributes for rules on process or file activity:

- `Agent Version >= 7.27`
- `process.file.name`
- `process.file.path`
- `[event_type].file.name`
- `[event_type].file.path`

**Note**: Possible values for `[event_type]` include `open` or `exec`.

## Wildcards

Use wildcards (`*`) carefully. For example, never use `open.file.path =~ "*/myfile"`. If you must use wildcards prefixing directories, at least two levels are required: `open.file.path =~ "*/mydir/myfile")`. 

**Note**: You must append a tilde (`~`) to the [operator][2] when using wildcards.

## Approvers and discarders

CSM Threats uses the concept of approvers and discarders to filter out events that should not trigger any rules in a policy. Approvers and discarders allow or deny events at the policy level only. They do not act on individual rules.

Approvers act as an allow-list at the kernel level in the Datadog Agent. For example, the opening of a specific file could be an approver on the event `open`, whereas `open` events on files without approvers would be filtered out. Similarly, discarders act as a deny-list in the Agent. Discarders intentionally filter out events that can never match a rule. The Agent learns which events to filter out with discarders during runtime.

Approvers and discarders are generated based on your entire policy. Due to this, if a single rule does not make use of approvers for a given event (for example, `open` or `exec`), approvers cannot be used for that event for the entire policy, making every rule that uses that event less efficient.

For example, if you used explicit filenames to evaluate `open` events for every rule but one (`open.file.path == "/etc/shadow"`, `open.file.path == "/etc/secret"` and so on.), and used a wildcard in that one event (`open.file.path == "/etc/*"`), the `open` event would not generate an approver, but may generate discarders during runtime.

Approvers are generally more powerful and preferred. Using approvers, the Agent can process only what it needs to see rather than dynamically learning what to filter out.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/threats/workload_security_rules
[2]: /security/threats/agent_expressions/#operators