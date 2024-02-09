---
title: CSM Threats Detection Rules
kind: documentation
aliases:
  - /security_platform/cloud_workload_security/workload_security_rules
  - /security/cloud_workload_security/workload_security_rules
further_reading:
- link: "/security/threats/setup"
  tag: "Documentation"
  text: "Setting Up CSM Threats"
- link: "/security/threats/agent_expressions"
  tag: "Documentation"
  text: "Agent Expressions"
- link: "security/threats/backend"
  tag: "Documentation"
  text: "CSM Threats Events"
- link: "/security/notifications/variables/"
  tag: "Documentation"
  text: "Learn more about Security notification variables"
---

With Cloud Security Management Threats (CSM Threats) enabled, the Datadog Agent actively monitors system activity and evaluates it against a set of out-of-the-box rules to detect suspicious behavior. CSM Threats rules consist of two different components: [Agent rules](#agent-rules) and [detection rules](#detection-rules).

## Agent rules

Agent rules contain [Agent expressions](#agent-expressions) that determine which activities the Agent collects. A full set of Agent rules is called a policy. Datadog provides you with several [out-of-the-box Agent rules][6] powered by the default Agent policy.

With [Remote Configuration][7] enabled, you automatically receive new and updated CSM Threats Agent rules when they're released. These bundled Agent rules are used in the [default detection rules][1].

<div class="alert alert-info">Remote Configuration for CSM Threats is in beta. If you have any feedback or questions, contact <a href="/help">Datadog support</a>.</div>

### Agent expressions

Agent expressions use [Datadog's Security Language (SECL)][2] to define behavior based on activity in your hosts and containers, as shown in the following examples:

#### Detect when the `passwd` command is executed

To detect when the `passwd` command is executed, there are a few attributes to note.

On most Linux distributions, the `passwd` utility is installed at `/usr/bin/passwd`. Execution events include `exec`, `execve`, `fork`, and other system calls. In the CSM Threats environment, all of these events are identified by the `exec` symbol.

Putting it all together, the rule expression is `exec.file.path == "/usr/bin/passwd"`.

The `passwd` command rule is already present in the default CSM Threats Agent policy. However, Agent expressions can also be more advanced, and can define rules that match on process ancestors or use wildcards for broader detections.

#### Detect when a PHP or Nginx process launches Bash

To detect when a PHP or Nginx process launches Bash, there are a few attributes to note.

On most Linux distributions, Bash is installed at `/usr/bin/bash`. As in the previous example, to detect execution, include `exec.file.path == "/usr/bin/bash"` in your rule. This ensures the rule is accounting for the execution of Bash, and also Bash as a child process of PHP or Nginx.

A process ancestor's filename in CSM Threats is an attribute with the symbol `process.ancestors.file.name`. To check if the ancestor is Nginx, add `process.ancestors.file.name == "nginx"`. Since PHP runs as multiple processes, use a wildcard to expand the rule to any process with prefix PHP. To check if the ancestor is a PHP process, add `process.ancestors.file.name =~ "php*"`. 

Putting it all together, the rule expression is `exec.file.path == "/usr/bin/bash"  && (process.ancestors.file.name == "nginx" || process.ancestors.file.name =~ "php*")`.

## Detection rules

Detection rules run in the Datadog backend after events are sent over as logs. The logs are then evaluated based on patterns of events described in the [detection rules][3]. If the pattern matches a detection rule, a [security signal][8] is generated. Datadog continuously develops new detection rules, which are automatically imported into your account.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/default_rules/#cat-workload-security
[2]: /security/threats/agent_expressions
[3]: https://app.datadoghq.com/security/configuration/rules?product=cws
[4]: https://app.datadoghq.com/security/configuration/agent-rules
[5]: /security/notifications/variables/
[6]: https://app.datadoghq.com/security/configuration/workload/agent-rules
[7]: /security/threats/setup?tab=kuberneteshelm#enable-remote-configuration
[8]: /security/threats/security_signals