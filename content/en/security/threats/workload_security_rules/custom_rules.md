---
title: Creating Custom Detection Rules
kind: documentation
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

This topic explains how to create custom Datadog Agent and detection rules for [CSM Threats][8].

In addition to the out of the box (OOTB) [default Agent and detection rules][7], you can write custom Agent and detection rules. Custom rules help to detect events Datadog is not detecting with its OOTB rules.

## Custom detection rules summary

Custom detection rules depend on Agent rules. They are composed of existing, deployed Agent rules and additional expression parameters. 

There are two use cases:

- **Create a detection rule using an existing Agent rule:** To create a threat detection rule that uses an existing Agent rule, you only need to create a threat detection rule that references the Agent rule and adds any additional expression parameters you need.
- **Create a threat detection rule using a new Agent rule:** To detect an event that the current Agent rules do not support, you need to create a custom Agent rule to detect that event, and then create a custom threat detection rule that uses the custom Agent rule.

For more information, see [CSM Threats Detection Rules][7]. 

You can create custom rules using these methods:

- **Simple:** Use the **Simple rule creator** to create the custom Agent and detection rules together.
  - For steps on using the **Simple rule creator**, see [Create the custom Agent and detection rules together](#create-the-custom-agent-and-detection-rules-together).
- **Advanced:**  Create custom Agent and detection rules individually by defining their threat detection expressions. 
  - For steps on this method, see [Create a custom agent rule](#create-a-custom-agent-rule) and [Create a custom detection rule](#create-a-custom-detection-rule).

## Create the custom Agent and detection rules together

The **Simple rule creator** option helps you create the Agent and dependent detection rules together, and ensures that the Agent rule is referenced in the detection rules. Using this tool is faster than the advanced method of creating the Agent and detection rules separately.

As you define the rules using this tool, the threat expressions generated for these rules are displayed in the tool.

To use the simple rule creator:

1. In [Agent Configuration][4] or [Threat Detection Rules][3], select **New Rule**, and then select **Simple rule creator**.
2. Define the detection. To monitor your resource effectively, you have the following detection type options:
   - To detect nonstandard and suspicious changes to files, select **File integrity monitoring (FIM)**.
   - To track and analyze system software processes for malicious behavior or policy violations, select **Process activity monitoring**.
   - Enter the file/process names or paths to monitor. 
3. Specify more conditions. Enter any arguments to add to the threat rule expression. For example, the argument `foo` is added as `process.argv in ["foo"]`.
4. Set severity and notification lists. 
   - Select the severity for the signal generated when this threat is detected. 
   - Select notification lists to notify when a signal is generated.
5. Add the rule name and description.
   
   Here's an example of a new FIM rule, including the expressions generated for each rule.

    {{< img src="/security/csm/csm_threats_simple_rule_creator.png" alt="Simple rule creator example" style="width:100%;" >}}

6. Select **Create _N_ Rules**.
7. In **Generate Rules**, select **Confirm**. The rules are generated.
8. Select **Finish**. The [Agent Configuration][3] page displays the new rules.
9. In [Agent Configuration][3], select **Deploy Agent Policy**.


## Create a custom Agent rule

You can create an individual custom Agent rule, deploy it as a [new Agent policy](#deploy-the-policy-in-your-environment), and reference it in a [custom detection rule](#create-a-custom-detection-rule).

1. On the [**Agent Configuration**][4] page, select **New Rule**, and then select **Advanced rule creation**.
2. Add a name and description for the rule.
3. In **Expression**, define the Agent expression using Datadog Security Language (SECL) syntax.

    {{< img src="security/cws/workload_security_rules/define_agent_expression.png" alt="Adding a rule to the Expression field" >}}

    For example, to monitor for suspicious container clients:

    ```text
    exec.file.path in ["/usr/bin/docker", "/usr/local/bin/docker",
    "/usr/bin/kubectl", "/usr/local/bin/kubectl"] && container.id != ""
    ```

4. Click **Create Agent Rule**. This automatically navigates you back to the **Agent Configuration** page.

After you create a custom Agent rule, the change is saved along with other pending rule updates. To apply the change to your environment, [deploy the updated custom policy to the Agent](#deploy-the-policy-in-your-environment).

## Deploy the policy in your environment

Custom Agent rules are deployed to the Agent in a custom policy separate from the default policy. The custom policy contains custom Agent rules as well as [default rules that have been disabled](#disable-default-agent-rules).

You can use Remote Configuration to automatically deploy the custom policy to your designated hosts (all hosts or a defined subset of hosts), or manually upload it to the Agent on each host.

<div class="alert alert-info">Remote Configuration for custom rules is in private beta. Fill out this <a href="https://docs.google.com/forms/d/e/1FAIpQLSe5Emr7y_Jg3ShcC44HlYtalxKgHUocFAz8dq87xSkjfeALTg/viewform">form</a> to request access.</div>

### Remote Configuration

1. On the **Agent Configuration** page, click **Deploy Agent Policy**.
2. Select **Remote Configuration**.
3. Choose whether to **Deploy to All Hosts** or **Deploy to a Subset of Hosts**. To deploy the policy to a subset of hosts, specify the hosts by selecting one or more service tags.
4. Click **Deploy**.

### Manual deployment

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

## Create a custom detection rule

After you upload the new default policy file to the Agent, navigate to the [**Threat Detection Rules**][3] page.

1. On the [**Threat Detection Rules**][3] page, select **New Rule**, and then select **Advanced rule creation**.
2. **Select a rule type:**
   1. In **Detection rule types**, select **Workload Security**. 
   2. Select a detection method such as **Threshold** or **New Value**.
3. **Define search queries:**
   1. Configure a new CSM Threats rule. A rule can have multiple rule cases combined with Boolean logic, for example `(||, &&)`. You can also set the counter, group by, and roll-up window.

    {{< img src="security/cws/workload_security_rules/define_runtime_expression2.png" alt="Adding a rule to the search queries field" >}}
   - Enter a query so that a trigger is only generated when a value is met. You can also enter suppression queries in the **Suppression Rules**, so that a trigger is not generated when the specified values are met.
4. **Set rule cases:**
   1. Set a [rule case][9] for the trigger and severity.
   2. Define the logic for when this rule triggers a security signal. For example, `a>0` means a security signal triggers as long as the rule condition set in the search query is met at least once in the sliding time window.
   3. Select a severity to associate the rule with and select all relevant parties you want to notify.

    {{< img src="security/cws/workload_security_rules/rule_cases2.png" alt="Setting a rule trigger, severity, and notification" >}}
5. **Say what's happening:**
   1. Name the rule and add the notification message in Markdown format. Use [Notification variables][5] to provide specific details about the signal by referencing its tags and event attributes. After the message, add multiple tags to give more context to the signals generated by your custom rule.

      
      <div class="alert alert-info">Datadog recommends including a remediation [runbook][10] in the body. As noted in the template, use substitution variables to dynamically generate contextualized content at runtime.</div>

## Disable default Agent rules

To disable a default Agent rule, navigate to the [**Agent Configuration**][6] page and select the rule toggle. When you disable a default Agent rule, the change is saved along with other pending rule updates. To apply the change to your environment, [deploy the updated custom policy to the Agent](#deploy-the-policy-in-your-environment).

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[3]: https://app.datadoghq.com/security/configuration/workload/rules
[4]: https://app.datadoghq.com/security/configuration/agent-rules
[5]: /security/notifications/variables/?tab=cloudsiem
[6]: https://app.datadoghq.com/security/configuration/workload/agent-rules
[7]: /security/threats/workload_security_rules
[8]: /security/threats/
[9]: /security/cloud_siem/log_detection_rules/?tab=threshold#set-a-rule-case
[10]: https://app.datadoghq.com/notebook/list?type=runbook
