---
title: Writing CWS Rules
kind: documentation
further_reading:
- link: "/security_platform/cloud_workload_security/getting_started"
  tag: "Blog"
  text: "Get Started with Cloud Runtime Security"
---

<div class="alert alert-warning">
Cloud Workload Security is currently in beta. Contact <a href="https://docs.datadoghq.com/help/">Datadog support</a> for more information.
</div>

## Overview

With Cloud Workload Security enabled, the Datadog Agent actively monitors system activity and evaluates it against a set of rules to detect suspicious behavior. The full set of rules for the Agent is called a policy. Datadog provides several out-of-the-box Cloud Workload Security rules for your convenience in the default policy.

At some point, you will likely want to write your own custom rules for the Agent to use. Below are example rules, guidelines for optimization, and the underlying mechanics of rule efficiency.

## Rule expressions

Rule expressions define behavior based on activity in your hosts and containers. For example, if you want to detect the following behavior, “the passwd command executed”, there are a few attributes to note.

`passwd` is a Unix utility, whose file is `/usr/bin/passwd` (assumed for a first implementation). Execution events include `exec`, `execve`, `fork`, and other system calls. In the Cloud Workload Security environment, all of these events are identified by the `exec` symbol.

Putting it all together, the rule expression is: `exec.filename == "/usr/bin/passwd"`

This example is an actual default rule that is present in the default Cloud Workload Security policy. However, rule expressions can also be more advanced. For instance, you can define rules that match on process ancestors, or use wildcards for broader detections.

For example, if you want to detect the following behavior: “when a php or nginx process launches bash”, there are a few attributes to note.

`bash` is a Unix utility, whose file is `/usr/bin/bash` (assumed for a first implementation). Like in the previous example, to detect execution, include in your rule: `exec.filename == "/usr/bin/bash"`. This ensures the rule isn't only accounting for execution of bash, but also bash as a child process of PHP or Nginx.

A process ancestor’s filename in Cloud Workload Security is an attribute with symbol `process.ancestors.name`. To check if the ancestor is Nginx, add `process.ancestors.name == "nginx"`. Since PHP runs as multiple processes, use a wildcard to expand the rule to any process with prefix PHP. To check if the ancestor is a PHP process, add `process.ancestors.name =~ "php*"`. **Note**: Use the tilde when using wildcards.

Putting it all together, the rule expression is: `exec.filename == “/usr/bin/bash”  && (process.ancestors.name == “nginx” || process.ancestors.name =~ "php*")`

This is one part of a default rule present when using Cloud Workload Security out-of-the-box, which checks a variety of shells, shell utilities, web servers, and language engines using lists. The right side of an equality can be a list of the form `[“a”, “b”, “c”, ...]`.

## Writing efficient rules

When writing your own rules, there are a few strategies you can use to optimize for efficiency.

To ensure that your policy is evaluated in-kernel for maximum efficiency, always use one of the following attributes for rules on process or file activity:

- `Agent Version 7.25`
- `Agent Version >= 7.27`
- `process.basename`
- `process.file.name`
- `process.filename`
- `process.file.path`
- `[event_type].basename`
- `[event_type].file.name`
- `[event_type].filename`
- `[event_type].file.path`

`[event_type]` can be open or exec, for example.

Use wildcards (`*`) carefully. For example, never use `open.filename == “*/myfile”`. If you must use wildcards prefixing directories, at least two levels are required: `open.filename == “*/mydir/myfile”)`.

## Rule concepts

Cloud Workload Security uses the concept of approvers and discarders to filter out events which will not trigger any rules in your policy. Approvers and discarders do not act on individual rules; they allow or deny events.

Approvers act as an allow-list at the kernel level in the Datadog agent. For example, the opening of a specific file could be an approver on the event open, whereas open events on files without approvers would be filtered out. Similarly, discarders act as a deny-list in the Agent. Discarders will intentionally filter out events that can never match a rule in your policy. The Agent learns which events to filter out with discarders during runtime.

Approvers and discarders are generated based on your entire policy. Because of this, if a single rule does not make use of approvers for a given event (open, exec, etc.), approvers cannot be used for that event for the entire policy, making every rule that uses that event less efficient.

For example, if you used explicit filenames to evaluate open events (for example, `open.filename == "/etc/shadow”`) for every rule but one, and used a wildcard in that one event (for example, `open.filename == "/etc/*”`), the open event would NOT generate an approver, but may generate discarders during runtime.

Approvers are generally more powerful and preferred. Using approvers, the Agent can process only what it needs to see rather than dynamically learning what to filter out.
