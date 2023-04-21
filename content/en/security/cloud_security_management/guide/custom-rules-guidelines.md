---
title: Guidelines for writing custom CWS rules
kind: guide
---

When writing your own Cloud Workload Security (CWS) rules, there are a few strategies you can use to optimize for efficiency.

## Attributes

To ensure that your policy is evaluated in-kernel for maximum efficiency, always use one of the following attributes for rules on process or file activity:

- `Agent Version >= 7.27`
- `process.file.name`
- `process.file.path`
- `[event_type].file.name`
- `[event_type].file.path`

**Note**: `[event_type]` can be open or `exec`, for example.

Use wildcards (`*`) carefully. For example, never use `open.file.path =~ "*/myfile"`. If you must use wildcards prefixing directories, at least two levels are required: `open.file.path =~ "*/mydir/myfile")`.

## Approvers and discarders

Cloud Workload Security uses the concept of approvers and discarders to filter out events which will not trigger any rules in your policy. Approvers and discarders do not act on individual rules; they allow or deny events.

Approvers act as an allow-list at the kernel level in the Datadog Agent. For example, the opening of a specific file could be an approver on the event open, whereas open events on files without approvers would be filtered out. Similarly, discarders act as a deny-list in the Agent. Discarders will intentionally filter out events that can never match a rule in your policy. The Agent learns which events to filter out with discarders during runtime.

Approvers and discarders are generated based on your entire policy. Because of this, if a single rule does not make use of approvers for a given event (open, exec, etc.), approvers cannot be used for that event for the entire policy, making every rule that uses that event less efficient.

For example, if you used explicit filenames to evaluate open events (for example, `open.file.path == "/etc/shadow"`) for every rule but one, and used a wildcard in that one event (for example, `open.file.path == "/etc/*"`), the open event would NOT generate an approver, but may generate discarders during runtime.

Approvers are generally more powerful and preferred. Using approvers, the Agent can process only what it needs to see rather than dynamically learning what to filter out.
