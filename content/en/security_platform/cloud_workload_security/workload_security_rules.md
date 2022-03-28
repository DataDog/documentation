---
title: Cloud Workload Security Rules
kind: documentation
further_reading:
- link: "/security_platform/cloud_workload_security/getting_started"
  tag: "Documentation"
  text: "Get Started with Cloud Workload Security"
- link: "/security_platform/cloud_workload_security/agent_expressions"
  tag: "Documentation"
  text: "Agent Expressions"
- link: "security_platform/cloud_workload_security/backend"
  tag: "Documentation"
  text: "Cloud Workload Security Events"
---

## Overview

With Cloud Workload Security (CWS) enabled, the Datadog Agent actively monitors system activity and evaluates it against a set of rules to detect suspicious behavior. 

When you upgrade the Datadog Agent you receive bundled CWS Agent rules, which are used in the [default signal rules][1]. You can also write your own custom Agent rules. This guide covers Agent rules, how to create them, and how to use them to generate security signals.

### Agent rules

An Agent Rule contains [Agent Expressions][2] that determine which activities the Agent collects. These captured events are then evaluated based on patterns of events described in a [rule][3]. 

A full set of rules for the Agent is called a policy. Datadog provides you with several [out-of-the-box CWS Agent rules][1] powered by the default Agent policy.

### Agent expressions

Agent expressions define behavior based on activity in your hosts and containers. For example, if you want to detect the following behavior, “the passwd command executed”, there are a few attributes to note.

`passwd` is a Unix utility, whose file is `/usr/bin/passwd` (assumed for a first implementation). Execution events include `exec`, `execve`, `fork`, and other system calls. In the Cloud Workload Security environment, all of these events are identified by the `exec` symbol.

Putting it all together, the rule expression is `exec.file.path == "/usr/bin/passwd"`.

This example is an actual default rule that is present in the default Cloud Workload Security policy. However, Agent expressions can also be more advanced. For instance, you can define rules that match on process ancestors or use wildcards for broader detections.

For example, if you want to detect the following behavior: “When a PHP or Nginx process launches bash”, there are a few attributes to note.

`bash` is a Unix utility, whose file is `/usr/bin/bash` (assumed for a first implementation). Like in the previous example, to detect execution, include in your rule: `exec.file.path == "/usr/bin/bash"`. This ensures the rule isn't only accounting for the execution of the bash, but also bash as a child process of PHP or Nginx.

A process ancestor’s filename in Cloud Workload Security is an attribute with symbol `process.ancestors.file.name`. To check if the ancestor is Nginx, add `process.ancestors.file.name == "nginx"`. Since PHP runs as multiple processes, use a wildcard to expand the rule to any process with prefix PHP. To check if the ancestor is a PHP process, add `process.ancestors.file.name =~ "php*"`. **Note**: Use the tilde when using wildcards.

Putting it all together, the rule expression is: `exec.file.path == “/usr/bin/bash”  && (process.ancestors.file.name == “nginx” || process.ancestors.file.name =~ "php*")`

This is one part of a default rule present when using Cloud Workload Security out-of-the-box, which checks a variety of shells, shell utilities, web servers, and language engines using lists. The right side of an equality can be a list of the form `[“a”, “b”, “c”, ...]`.

At some point, you may want to write your own custom rules for the Agent to use. Below are guidelines for writing efficient rules and step-by-step instructions on how to create custom rules in Datadog.

## Guidelines for writing efficient rules

When writing your own rules, there are a few strategies you can use to optimize for efficiency.

### Attributes

To ensure that your policy is evaluated in-kernel for maximum efficiency, always use one of the following attributes for rules on process or file activity:

- `Agent Version >= 7.27`
- `process.file.name`
- `process.file.path`
- `[event_type].file.name`
- `[event_type].file.path`

**Note**: `[event_type]` can be open or `exec`, for example.

Use wildcards (`*`) carefully. For example, never use `open.file.path =~ "*/myfile"`. If you must use wildcards prefixing directories, at least two levels are required: `open.file.path =~ "*/mydir/myfile")`.

### Approvers and discarders

Cloud Workload Security uses the concept of approvers and discarders to filter out events which will not trigger any rules in your policy. Approvers and discarders do not act on individual rules; they allow or deny events.

Approvers act as an allow-list at the kernel level in the Datadog Agent. For example, the opening of a specific file could be an approver on the event open, whereas open events on files without approvers would be filtered out. Similarly, discarders act as a deny-list in the Agent. Discarders will intentionally filter out events that can never match a rule in your policy. The Agent learns which events to filter out with discarders during runtime.

Approvers and discarders are generated based on your entire policy. Because of this, if a single rule does not make use of approvers for a given event (open, exec, etc.), approvers cannot be used for that event for the entire policy, making every rule that uses that event less efficient.

For example, if you used explicit filenames to evaluate open events (for example, `open.file.path == "/etc/shadow”`) for every rule but one, and used a wildcard in that one event (for example, `open.file.path == "/etc/*”`), the open event would NOT generate an approver, but may generate discarders during runtime.

Approvers are generally more powerful and preferred. Using approvers, the Agent can process only what it needs to see rather than dynamically learning what to filter out.

## Setup and configuration

### Create a default policy file

First, create a default policy file to load to the Agent by following the instructions below.

1. In Datadog, navigate to the [Agent Configuration page][4] under **Setup & Configuration**.

2. Click **Add an Agent Rule** in the top right.

3. Add a name and description for the rule.

4. Define the Agent expression by entering the rule in the **Expression** field with Datadog Security Language (SECL).

    {{< img src="security_platform/cws/workload_security_rules/define_agent_expression.png" alt="Adding a rule to the Expression field" >}}

    For example, to monitor for suspicious container clients:

    ```text
    exec.file.path in ["/usr/bin/docker", "/usr/local/bin/docker",
    "/usr/bin/kubectl", "/usr/local/bin/kubectl"] && container.id != ""
    ```

5. Save the rule. This automatically navigates you back to the **Rules** page.

6. Click **Download Workload Security Policy** in the top right corner to download a default policy file to your local machine.

### Configure the rule

Once your new default policy file is downloaded, navigate to the [**Rules** page][3].

1. Click the **New Rule** button in the top right.
2. Select **Workload Security** under **Rule types**. Select a detection method such as **Threshold** or **New Value**.
3. Configure a new Cloud Workload Security rule. A rule can have multiple rule cases combined with boolean logic, for example `(||, &&)`. You can also set the counter, group by, and roll-up window.

    {{< img src="security_platform/cws/workload_security_rules/define_runtime_expression.png" alt="Adding a rule to the expression field" >}}

4. Define the logic for when this rule triggers a security signal. For example, `a>0` means a security signal triggers as long as the rule condition set in Step 3 is met at least once in the sliding time window. Select a severity to associate the rule with and select all relevant parties you want to notify.

    {{< img src="security_platform/cws/workload_security_rules/rule_cases.png" alt="Setting a rule trigger, severity, and notification" >}}

5. Set a rule trigger, severity, and notification. Name the rule and add the notification message in Markdown format. After the message, add multiple tags to give more context to the signals generated by your custom rule.

    **Note**: Datadog recommends including a remediation runbook in the body. As noted in the template, use substitution variables to dynamically generate contextualized content at runtime.

### Configure the policy in your environment

Complete the next steps based on your environment:

{{< tabs >}}
{{% tab "Host" %}}

Copy the `default.policy` file over to the target host in the `{$DD_AGENT}/runtime-security.d` folder. Ensure the file minimally has `read` and `write` access for the `dd-agent` user on the host.

  **Note:** This may require use of a utility such as SCP or FTP.

{{% /tab %}}

{{% tab "Helm" %}}

1. Create a ConfigMap containing `default.policy`. For example, `kubectl create configmap jdefaultpol --from-file=default.policy`.

2. Add the ConfigMap (`jdefaultpol`) into `values.yaml` with `datadog.securityAgent.runtime.policies.configMap`:

    ```yaml
    securityAgent:
      compliance:
        # [...]
      runtime:
        # datadog.securityAgent.runtime.enabled
        # Set to true to enable Security Runtime Module
        enabled: true
        policies:
          # datadog.securityAgent.runtime.policies.configMap
          # Place custom policies here
          configMap: jdefaultpol
      syscallMonitor:
        # datadog.securityAgent.runtime.syscallMonitor.enabled
        # Set to true to enable Syscall monitoring.
        enabled: false
    ```

3. Upgrade the Helm chart with `helm upgrade <RELEASENAME> -f values.yaml --set datadog.apiKey=<APIKEY> datadog/datadog`.

    **Note:** If you need to make further changes to `default.policy`, you can either use `kubectl edit cm jdefaultpol` or replace the configMap with  `kubectl create configmap jdefaultpol --from-file default.policy -o yaml --dry-run=client | kubectl replace -f -`.


{{% /tab %}}
{{< /tabs >}}

To finalize your setup, restart the [Datadog Agent][5].

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /security_platform/default_rules/#cat-workload-security
[2]: /security_platform/cloud_workload_security/agent_expressions
[3]: https://app.datadoghq.com/security/configuration/rules
[4]: https://app.datadoghq.com/security/configuration/agent-rules
[5]: /agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
