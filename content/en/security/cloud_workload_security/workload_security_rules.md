---
title: Managing Cloud Workload Security Rules
kind: documentation
aliases:
  - /security_platform/cloud_workload_security/workload_security_rules
further_reading:
- link: "/security/cloud_workload_security/setup"
  tag: "Documentation"
  text: "Setting Up Cloud Workload Security"
- link: "/security/cloud_workload_security/agent_expressions"
  tag: "Documentation"
  text: "Agent Expressions"
- link: "security/cloud_workload_security/backend"
  tag: "Documentation"
  text: "Cloud Workload Security Events"
- link: "/security/notifications/variables/"
  tag: "Documentation"
  text: "Learn more about Security notification variables"
---

With Cloud Workload Security (CWS) enabled, the Datadog Agent actively monitors system activity and evaluates it against a set of out-of-the-box rules to detect suspicious behavior.

CWS rules consist of two different components: [Agent rules](#agent-rules) and [detection rules](#detection-rules).

## Agent rules

Agent rules contain [agent expressions][2] that determine which activities the Agent collects. A full set of Agent rules is called a policy. Datadog provides you with several [out-of-the-box Agent rules][1] powered by the default Agent policy.

With [Remote Configuration][7] enabled, you automatically receive new and updated CWS Agent rules when they're released. These bundled Agent rules are used in the [default detection rules][1].

<div class="alert alert-info">Remote Configuration for CWS is in beta. If you have any feedback or questions, contact <a href="/help">Datadog support</a>.</div>

### Agent expresssions

Agent expressions define behavior based on activity in your hosts and containers. For example, if you want to detect the following behavior, "the passwd command executed", there are a few attributes to note.

`passwd` is a Unix utility, whose file is `/usr/bin/passwd` (assumed for a first implementation). Execution events include `exec`, `execve`, `fork`, and other system calls. In the Cloud Workload Security environment, all of these events are identified by the `exec` symbol.

Putting it all together, the rule expression is `exec.file.path == "/usr/bin/passwd"`.

This example is an actual default rule that is present in the default Cloud Workload Security policy. However, Agent expressions can also be more advanced. For instance, you can define rules that match on process ancestors or use wildcards for broader detections.

For example, if you want to detect the following behavior: "When a PHP or Nginx process launches bash", there are a few attributes to note.

`bash` is a Unix utility, whose file is `/usr/bin/bash` (assumed for a first implementation). Like in the previous example, to detect execution, include in your rule: `exec.file.path == "/usr/bin/bash"`. This ensures the rule isn't only accounting for the execution of the bash, but also bash as a child process of PHP or Nginx.

A process ancestor's filename in Cloud Workload Security is an attribute with symbol `process.ancestors.file.name`. To check if the ancestor is Nginx, add `process.ancestors.file.name == "nginx"`. Since PHP runs as multiple processes, use a wildcard to expand the rule to any process with prefix PHP. To check if the ancestor is a PHP process, add `process.ancestors.file.name =~ "php*"`. **Note**: Use the tilde when using wildcards.

Putting it all together, the rule expression is: `exec.file.path == "/usr/bin/bash"  && (process.ancestors.file.name == "nginx" || process.ancestors.file.name =~ "php*")`

This is one part of a default rule present when using Cloud Workload Security out-of-the-box, which checks a variety of shells, shell utilities, web servers, and language engines using lists. The right side of an equality can be a list of the form `["a", "b", "c", ...]`.

At some point, you may want to write your own custom rules for the Agent to use. Below are guidelines for writing efficient rules and step-by-step instructions on how to create custom rules in Datadog.

## Detection rules

Detection rules run in the Datadog backend after events are sent over as logs. The logs are then evaluated based on patterns of events described in the [detection rules][3]. Security signals are generated as a result. Datadog continuously develops new default rules, which are automatically imported into your account.

## Create custom rules

You can also write custom Agent rules and detection rules. This guide covers Agent rules, how to create them, and how to use them to generate security signals.

**Note**: At this time, Remote Configuration is only available for default rules. Custom rules must be manually deployed to the Datadog Agent.

### Define the agent rule

1. In Datadog, navigate to the [Agent Configuration][4] page and click **New Rule**.

2. Add a name and description for the rule.

3. Define the Agent expression in the **Expression** field using Datadog Security Language (SECL) syntax.

    {{< img src="security/cws/workload_security_rules/define_agent_expression.png" alt="Adding a rule to the Expression field" >}}

    For example, to monitor for suspicious container clients:

    ```text
    exec.file.path in ["/usr/bin/docker", "/usr/local/bin/docker",
    "/usr/bin/kubectl", "/usr/local/bin/kubectl"] && container.id != ""
    ```

4. Click **Create Agent Rule**. This automatically navigates you back to the **Agent Configuration** page.

5. Click **Download Agent Policy** to download a default policy file to your local machine.

### Deploy the policy in your environment

Next, upload the policy file to the Agent using the following instructions.

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

To finalize your setup, restart the [Datadog Agent][6].

### Configure the detection rule

After you upload the new default policy file to the agent, navigate to the [**Rules**][3] page.

1. On the [**Detection Rules**][3] page, click **New Rule**.
2. Select **Workload Security** under **Rule types**. Select a detection method such as **Threshold** or **New Value**.
3. Configure a new Cloud Workload Security rule. A rule can have multiple rule cases combined with boolean logic, for example `(||, &&)`. You can also set the counter, group by, and roll-up window.

    {{< img src="security/cws/workload_security_rules/define_runtime_expression.png" alt="Adding a rule to the expression field" >}}

4. Define the logic for when this rule triggers a security signal. For example, `a>0` means a security signal triggers as long as the rule condition set in Step 3 is met at least once in the sliding time window. Select a severity to associate the rule with and select all relevant parties you want to notify.

    {{< img src="security/cws/workload_security_rules/rule_cases.png" alt="Setting a rule trigger, severity, and notification" >}}

5. Set a rule trigger, severity, and notification. Name the rule and add the notification message in Markdown format. Use [Notification Variables][5] to provide specific details about the signal by referencing its tags and event attributes. After the message, add multiple tags to give more context to the signals generated by your custom rule.

    **Note**: Datadog recommends including a remediation runbook in the body. As noted in the template, use substitution variables to dynamically generate contextualized content at runtime.

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/default_rules/#cat-workload-security
[2]: /security/cloud_workload_security/agent_expressions
[3]: https://app.datadoghq.com/security/configuration/rules?product=cws
[4]: https://app.datadoghq.com/security/configuration/agent-rules
[5]: /security/notifications/variables/
[6]: /agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[7]: /security/cloud_workload_security/setup#remote-configuration