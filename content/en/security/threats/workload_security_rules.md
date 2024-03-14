---
title: Managing CSM Threats Detection Rules
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

Agent expressions use [Datadog's Security Language (SECL)][2] to define behavior based on activity in your hosts and containers as shown in the following examples:

#### Detect when the `passwd` command is executed

To detect when the `passwd` command is executed, there are a few attributes to note.

On most Linux distributions, the `passwd` utility is installed at `/usr/bin/passwd`. Execution events include `exec`, `execve`, `fork`, and other system calls. In the CSM Threats environment, all of these events are identified by the `exec` symbol.

Putting it all together, the rule expression is `exec.file.path == "/usr/bin/passwd"`.

The `passwd` command rule is already present in the default CSM Threats Agent policy. However, Agent expressions can also be more advanced, and can define rules that match on process ancestors or use wildcards for broader detections.

#### Detect when a PHP or Nginx process launches bash

To detect when a PHP or Nginx process launches bash, there are a few attributes to note.

On most Linux distributions, Bash is installed at `/usr/bin/bash`. As in the previous example, to detect execution, include `exec.file.path == "/usr/bin/bash"` in your rule. This ensures the rule is accounting for the execution of Bash, and also Bash as a child process of PHP or Nginx.

A process ancestor's filename in CSM Threats is an attribute with symbol `process.ancestors.file.name`. To check if the ancestor is Nginx, add `process.ancestors.file.name == "nginx"`. Since PHP runs as multiple processes, use a wildcard to expand the rule to any process with prefix PHP. To check if the ancestor is a PHP process, add `process.ancestors.file.name =~ "php*"`. 

Putting it all together, the rule expression is `exec.file.path == "/usr/bin/bash"  && (process.ancestors.file.name == "nginx" || process.ancestors.file.name =~ "php*")`.

## Detection rules

Detection rules run in the Datadog backend after events are sent over as logs. The logs are then evaluated based on patterns of events described in the [detection rules][3]. If the pattern matches a detection rule, a [security signal][8] is generated. Datadog continuously develops new detection rules, which are automatically imported into your account.

## Create custom rules

In addition to the default rules, you can write custom Agent and detection rules. Custom Agent rules are deployed to the Agent in a custom policy separate from the default one. The custom policy contains custom Agent rules as well as [default rules that have been disabled](#disable-default-agent-rules).

### Define the agent rule

1. On the [**Agent Configuration**][4] page, click **New Rule**.
2. Add a name and description for the rule.
3. Define the Agent expression in the **Expression** field using Datadog Security Language (SECL) syntax.

    {{< img src="security/cws/workload_security_rules/define_agent_expression.png" alt="Adding a rule to the Expression field" >}}

    For example, to monitor for suspicious container clients:

    ```text
    exec.file.path in ["/usr/bin/docker", "/usr/local/bin/docker",
    "/usr/bin/kubectl", "/usr/local/bin/kubectl"] && container.id != ""
    ```

4. Click **Create Agent Rule**. This automatically navigates you back to the **Agent Configuration** page.

After you create a custom Agent rule, the change is saved along with other pending rule updates. To apply the change to your environment, [deploy the updated custom policy to the Agent](#deploy-the-policy-in-your-environment).

### Deploy the policy in your environment

You can use Remote Configuration to automatically deploy the custom policy to your designated hosts (all hosts or a defined subset of hosts), or alternatively, manually upload it to the Agent on each host.

<div class="alert alert-info">Remote Configuration for custom rules is in private beta. Fill out this <a href="https://docs.google.com/forms/d/e/1FAIpQLSe5Emr7y_Jg3ShcC44HlYtalxKgHUocFAz8dq87xSkjfeALTg/viewform">form</a> to request access.</div>

#### Remote Configuration

1. On the **Agent Configuration** page, click **Deploy Agent Policy**.
2. Select **Remote Configuration**.
3. Choose whether to **Deploy to All Hosts** or **Deploy to a Subset of Hosts**. To deploy the policy to a subset of hosts, specify the hosts by selecting one or more service tags.
4. Click **Deploy**.

#### Manual deployment

1. On the **Agent Configuration** page, click **Deploy Agent Policy**.
2. Select **Manual**.
3. Click **Download Agent Policy**, then click **Done**.

Next, use the following instructions to upload the policy file to each host.

{{< tabs >}}
{{% tab "Host" %}}

Copy the `default.policy` file to the target host in the `{$DD_AGENT}/runtime-security.d` folder. At a minimum, the file must have `read` and `write` access for the `dd-agent` user on the host. This may require use of a utility such as SCP or FTP.

To apply the changes, restart the [Datadog Agent][1].

[1]: /agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent

{{% /tab %}}

{{% tab "Helm" %}}

1. Create a ConfigMap containing `default.policy`, for example, `kubectl create configmap jdefaultpol --from-file=default.policy`.
2. Add the ConfigMap (`jdefaultpol`) to `values.yaml` with `datadog.securityAgent.runtime.policies.configMap`:

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

4. Restart the [Datadog Agent][1].

[1]: /agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent

{{% /tab %}}
{{< /tabs >}}

### Configure the detection rule

After you upload the new default policy file to the Agent, navigate to the [**Rules**][3] page.

1. On the [**Detection Rules**][3] page, click **New Rule**.
2. Select **Workload Security** under **Rule types**. Select a detection method such as **Threshold** or **New Value**.
3. Configure a new CSM Threats rule. A rule can have multiple rule cases combined with boolean logic, for example `(||, &&)`. You can also set the counter, group by, and roll-up window.

    {{< img src="security/cws/workload_security_rules/define_runtime_expression2.png" alt="Adding a rule to the search queries field" >}}

4. In the **Only generate a signal if there is a match** field, enter a query so that a trigger is only generated when a value is met. You can also enter suppression queries in the **This rule will not generate a signal if there is a match** field, so that a trigger is not generated when the specified values are met.
5. Define the logic for when this rule triggers a security signal. For example, `a>0` means a security signal triggers as long as the rule condition set in Step 3 is met at least once in the sliding time window. Select a severity to associate the rule with and select all relevant parties you want to notify.

    {{< img src="security/cws/workload_security_rules/rule_cases2.png" alt="Setting a rule trigger, severity, and notification" >}}

6. Set a rule trigger, severity, and notification. Name the rule and add the notification message in Markdown format. Use [Notification variables][5] to provide specific details about the signal by referencing its tags and event attributes. After the message, add multiple tags to give more context to the signals generated by your custom rule.

    **Note**: Datadog recommends including a remediation runbook in the body. As noted in the template, use substitution variables to dynamically generate contextualized content at runtime.

## Disable default Agent rules

To disable a default Agent rule, navigate to the [**Agent Configuration**][6] page and select the rule toggle. When you disable a default Agent rule, the change is saved along with other pending rule updates. To apply the change to your environment, [deploy the updated custom policy to the Agent](#deploy-the-policy-in-your-environment).

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