---
title: CSM Threats Detection Rules
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

This topic explains how Cloud Security Management Threats (CSM Threats) actively monitors system activity and evaluates it against a set of out-of-the-box (OOTB) rules to detect suspicious behavior.

## Proactively block threats with Active Protection

By default, all OOTB Agent crypto mining threat detection rules are enabled and actively monitoring for threats.

[Active Protection][12] enables you to proactively block and terminate crypto mining threats identified by the Datadog Agent threat detection rules.

## CSM Threats rules construction

CSM Threats rules consist of two different components: Agent rules and threat detection rules.

- **Agent rules:** [Agent rules][9] are evaluated on the Agent host. CSM Threats first evaluates activity within the Datadog Agent against Agent expressions to decide what activity to collect. Agent expressions use Datadog's [Security Language (SECL)][2].<br><br>
  
  For example, here is the *Agent rule* expression `cryptominer_args`: 

  ```text
  exec.args_flags in ["cpu-priority", "donate-level", ~"randomx-1gb-pages"] ||
  exec.args in [
      ~"*stratum+tcp*",
      ~"*stratum+ssl*",
      ~"*stratum1+tcp*",
      ~"*stratum1+ssl*",
      ~"*stratum2+tcp*",
      ~"*stratum2+ssl*",
      ~"*nicehash*",
      ~"*yespower*"
  ]
  ```
- **Threat detection rules:** [Threat detection rules][3] are evaluated on the Datadog backend. Threat detection rules are composed of existing Agent rules and additional expression parameters.<br><br>
  
  Here is the *threat detection rule* `Process arguments match cryptocurrency miner`. It uses the Agent rules, `cryptominer_args` and `windows_cryptominer_process`, identified by `@agent.rule_id`, with additional expression parameters:

  ```text
  @agent.rule_id:(cryptominer_args || windows_cryptominer_process) 
  -@process.executable.path:"/usr/bin/grep"
  ```

### CSM Threats rules pipeline

CSM Threats uses the following pipeline when evaluating events:

1. The Agent rules evaluate system activity on the Agent host.
2. When activity matches an Agent rule expression, the Agent generates a detection event and passes it to the Datadog backend.
3. The Datadog backend evaluates the detection event to see if it matches any threat detection rules that use the Agent rule that sent the event.
4. If there is a match, a signal is generated and displayed in [Signals][8].
5. Any [Notification Rules][10] that match the severity, detection rule type, tags, and attributes of the signal are triggered.

The following diagram illustrates this pipeline:

{{< img src="security/cws/threat_detection_pipeline_2.png" alt="CMS Threats detection pipeline" style="width:100%;" >}}

### Saving resources by design

CSM Threats detection rules are complex, correlating several datapoints, sometimes across different hosts, and including third party data. This complexity would result in considerable compute resource demands on the Agent host if all rules were evaluated there. 

Datadog solves this problem by keeping the Agent lightweight with only a few rules, and processes most rules using the threat detection rules on the Datadog backend. 

Only when the Agent observes an event that matches its rules does it send a detection to the Datadog backend. The Datadog backend then evaluates the detection to determine if it meets its threat detection rule expressions. Only if there is a match does the Datadog backend create a signal.

### Custom rule design

Understanding the dependency threat detection rules have on Agent rules is important when you want to use custom rules. Custom rules help to detect events Datadog is not detecting with its OOTB rules.

There are two use cases:

- **Create a threat detection rule using an existing Agent rule:** To create a threat detection rule that uses an existing Agent rule, you only need to create a threat detection rule that references the Agent rule and adds any additional expression parameters you need.
- **Create a threat detection rule using a new Agent rule:** To detect an event that the current Agent rules do not support, create a custom Agent rule to detect that event, and then create a custom threat detection rule that uses the custom Agent rule.

For a detailed explanation, see [CSM Threats Detection Rules][11]. 

## Agent rules summary

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

A process ancestor's filename in CSM Threats is an attribute with the symbol `process.ancestors.file.name`. To check if the ancestor is Nginx, add `process.ancestors.file.name == "nginx"`. Since PHP runs as multiple processes, use a wildcard to expand the rule to any process with the prefix `php`. To check if the ancestor is a PHP process, add `process.ancestors.file.name =~ "php*"`. 

Putting it all together, the rule expression is `exec.file.path == "/usr/bin/bash"  && (process.ancestors.file.name == "nginx" || process.ancestors.file.name =~ "php*")`.

## Detection rules summary

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
[9]: https://app.datadoghq.com/security/configuration/workload/agent-rules
[10]: https://app.datadoghq.com/security/configuration/notification-rules
[11]: /security/threats/workload_security_rules/custom_rules
[12]: /security/cloud_security_management/guide/active-protection