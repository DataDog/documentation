---
title: Create Policies and Custom Rules
aliases:
  - /security/threats/workload_security_rules/custom_rules
---

This topic explains how to create custom Datadog Agent policies and detection rules for [Workload Protection][8].

In addition to the out of the box (OOTB) [default Agent and detection rules][7], you can write custom Agent and detection rules. Custom rules help to detect events Datadog is not detecting with its OOTB rules.

Agent rules are collected in policies. First, you create a policy, and then you add the default and custom rules you want applied by the policy.

When you create an Agent configuration policy it contains the default rules only. You can add custom rules to the policy to target specific infrastructure locations.

## RBAC for custom rule management

Here are some important [role and permissions][11] to use for custom rules RBAC:

- The `security_monitoring_cws_agent_rules_actions` permission can be used to turn on and configure the [Active Protection][12] feature. Active Protection enables you to proactively block and terminate crypto mining threats identified by the Datadog Agent threat detection rules.
  - To use the `security_monitoring_cws_agent_rules_actions` permission, a user with the Datadog Admin role must create a role containing the `security_monitoring_cws_agent_rules_actions` permission and then add only those users that manage Active Protection to this role.
- The **Datadog Standard** role enables users to create/update a custom rule by default, as long as the operation does not change the **protection** settings on the rule.

## Policies

Rules are managed and applied using [policies][3].

You can create and deploy different custom policies containing rules you want to apply to different sets of hosts in your infrastructure using [tags][18].

### Create a policy

1. Go to [Policies][3].
2. Click **New Policy**. You can also open an existing policy, click **Actions**, and clone it.
3. Enter a name for the policy and click **Create**.
   The new policy is created, but it is not enabled or deployed.
4. Click the policy to open it.
5. In **New Rule**, add custom Agent rules to the policy. For details, see [Create the custom Agent and detection rules together][14].
6. Click **Edit** next to **Deployed on 0 agents**. 
7. Add tags to the policy to target specific infrastructure.
8. To deploy the policy, toggle the switch next to **Policy is disabled** and confirm.

### Pin a Datadog-managed policy to its current version

<div class="alert alert-info">Policy pinning is supported in Agent version 7.71.0 and later. Previous Agents will continue to receive the latest policy updates automatically.</div>

When Datadog-managed policies are updated by Datadog, they are automatically deployed to your infrastructure.

To control when a new policy version is deployed to your infrastructure, you can pin the policy to its current version. Pinning a policy version prevents policy updates from being automatically rolled out when Datadog releases a new policy version. 

To pin a policy, do the following:

1. Go to [Policies][3].
2. Click a Datadog-managed policy.
3. In **Version**, click the pin option.
   If your infrastructure is running Agents below version 7.71.0, an outdated agents warning appears. View and upgrade your Agent version in [Fleet Automation][19].
4. Click **Pin**. To unpin the policy version, click the pin option again.

### Conflicting rules

When two policies deployed to the same host contain the same rule with a different status, the most severe aciton will be taken (Blocking > Monitoring > Disabled).

### Apply tags

[Tags][15] are the target location where the policy is applied (environments, clusters, hosts, etc.). Add custom tags to policies to target the policy rules at certain portions of your infrastructure.

Tags identify two things: the Agents using the policy and the infrastructure where those Agents apply the policy. For example, if a policy has the tag `cluster_name:mycluster` the Agents in that cluster use the policy on the hosts in that cluster.

1. Go to [Agent Configuration][3].
2. Open a policy and click **Edit**.
3.  Enter tags and click **Apply**. If the policy is enabled, the policy is applied to the tag targets.

When you add tags, Datadog displays how many agents the tags target as well the infrastructure running each agents. For example, `Tags match 144 agents`. 

## Custom detection rules summary

Custom detection rules depend on Agent rules. They are composed of existing, deployed Agent rules and additional expression parameters. 

There are two use cases:

- **Create a detection rule using an existing Agent rule:** To create a threat detection rule that uses an existing Agent rule, you only need to create a threat detection rule that references the Agent rule and adds any additional expression parameters you need.
- **Create a threat detection rule using a new Agent rule:** To detect an event that the current Agent rules do not support, you need to create a custom Agent rule to detect that event, and then create a custom threat detection rule that uses the custom Agent rule.

For more information, see [Workload Protection Detection Rules][7]. 

You can create custom rules using these methods:

- **Simple:** Use the **Assisted rule creator** to create the custom Agent and detection rules together.
  - For steps on using the **Assisted rule creator**, see [Create the custom Agent and detection rules together][1].
- **Advanced:**  Create custom Agent and detection rules individually by defining their threat detection expressions. 
  - For steps on this method, see [Create a custom agent rule][2] and create a custom detection rule.

## Create the custom Agent and detection rules together

When you create an Agent configuration policy it contains the default Agent rules only. You can add custom Agent rules to the policy to apply specific rules to specific Agents.

When you add an Agent configuration policy you can use the **Assisted rule creator** option to create the Agent and dependent detection rules together. This method ensures that the Agent rule is referenced in the detection rules. Using this tool is faster than creating the Agent and detection rules separately and then referencing the Agent rules in the detection rules.

As you define the rules using this tool, the threat expressions generated for these rules are displayed in the tool.

To use the Assisted rule creator:

1. Go to [Agent Configuration][3].
2. Create or open a policy.
3. In **Add Agent Rule**, select **Assisted rule creator**.
4. Define the detection. To monitor your resource effectively, you have the following detection type options:
   - To detect nonstandard and suspicious changes to files, select **File integrity monitoring (FIM)**.
   - To track and analyze system software processes for malicious behavior or policy violations, select **Process activity monitoring**.
   - Enter the file/process names or paths to monitor. 
5. Specify more conditions. Enter any arguments to add to the [threat rule expression][16]. For example, the argument `foo` is added as `process.argv in ["foo"]`.
6. Set severity and notification lists. 
   - Select the severity for the signal generated when this threat is detected. 
   - Select notification lists to notify when a signal is generated.
7. Add the rule name and description.
8. Select **Create _N_ Rules**.
9. In **Generate Rules**, select **Confirm**. The rules are generated.
10. Select **Finish**. The policy displays the new rules.

## Create a custom Agent rule

You can create a custom Agent rule and deploy it as part of a new Agent policy. Later, when defining a custom [detection rule][3], you reference the custom Agent rule and add expression parameters.

1. Go to [Agent Configuration][3].
2. Create or open a policy.
3. In **Actions**, select **Manual rule creator**.
4. Add a name and description for the rule.
5. In **Expression**, define the Agent expression using [Datadog Security Language (SECL) syntax][16].
6. Click **Create Agent Rule**. This automatically navigates you back to the policy page.

After you create a custom Agent rule, the change is saved along with other pending rule updates. To apply the change to your environment, deploy the updated custom policy to the Agent.

### Remote Configuration

To perform remote configuration, you use the Datadog UI to apply policies to infrastructure. When you enable a policy, it is applied to the infrastructure identified by the policy's tags.

1. On the **Agent Configuration** page, hover over a policy and click **Apply Tags & Deploy Policy**. You can also open a policy and click **Apply Tags & Deploy Policy**.
2. Add tags to identify the target infrastructure.
3. Select **Enabled**.
4. Click **Apply**. The policy is applied to all infrastructure targeted by the policy tags.

### Manual deployment

To perform manual deployment, you create the policy and its rules in the Datadog UI, download it, and then upload it to the Agent(s) where you want it applied.

1. On the **Agent Configuration** page, open a policy.
2. In Actions, select **Download Policy**.

Next, use the following instructions to upload the policy file to each host.

{{< tabs >}}
{{% tab "Host" %}}

Copy the `default.policy` file to the target host in the `/etc/datadog-agent/runtime-security.d` folder. The file must have `read` and `write` access for the `root` user on the host. This may require use of a utility such as SCP or FTP.

To apply the changes, restart the [Datadog Agent][1].

[1]: /agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent

{{% /tab %}}

{{% tab "Helm" %}}

1. Create a ConfigMap containing `default.policy`, for example, `kubectl create configmap jdefaultpol --from-file=default.policy`.
2. Add the ConfigMap (`jdefaultpol`) to `values.yaml` with `datadog.securityAgent.runtime.policies.configMap`:

    ```yaml
    securityAgent:
      # [...]
      runtime:
        # datadog.securityAgent.runtime.enabled
        # Set to true to enable Security Runtime Module
        enabled: true
        policies:
          # datadog.securityAgent.runtime.policies.configMap
          # Place custom policies here
          configMap: jdefaultpol
      # [...]
    ```

3. Upgrade the Helm chart with `helm upgrade <RELEASENAME> -f values.yaml --set datadog.apiKey=<APIKEY> datadog/datadog`.

    **Note:** If you need to make further changes to `default.policy`, you can either use `kubectl edit cm jdefaultpol` or replace the configMap with  `kubectl create configmap jdefaultpol --from-file default.policy -o yaml --dry-run=client | kubectl replace -f -`.

[1]: /agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent

{{% /tab %}}
{{< /tabs >}}


## Enable and deploy policies

Enabled policies apply their rules to the infrastructure targets identified by their tags. Enabling a policy is the same as deploying it.

You can use Remote Configuration in the Datadog UI to automatically deploy the custom policy to the hosts designated by the policy tags (all hosts or a defined subset of hosts), or you can manually upload the policy to the Agent on each host.

To enable a policy using Remote Configuration in the Datadog UI, do the following:

1. On [Agent Configuration][3], hover over a policy and click **Apply Tags & Deploy Policy**. You can also open a policy and click **Apply Tags & Deploy Policy**.
2. Add tags to identify the target infrastructure.
3. Select **Enabled**.
4. Click **Apply**. The policy is applied to all infrastructure targeted by the policy tags.

If you disable a policy, its rules are no longer applied to the infrastructure identified by its tags.

Custom Agent rules are deployed to the Agent in a custom policy separate from the default policies. The custom policy contains only custom Agent rules.

## Create a custom detection rule

After you upload the new default policy file to the Agent, navigate to the [**Threat Detection Rules**][3] page.

1. On [Agent Configuration][3], select **New Rule**, and then select **Manual rule creator**.
2. **Select a rule type:**
   1. In **Detection rule types**, select **Workload Security**. 
   2. Select a detection method such as **Threshold** or **New Value**.
3. **Define search queries:**
   1. Configure a new Workload Protection rule. A rule can have multiple rule cases combined with Boolean logic, for example `(||, &&)`. You can also set the counter, group by, and roll-up window.

      {{< img src="security/cws/workload_security_rules/define_runtime_expression2.png" alt="Adding a rule to the search queries field" >}}  
    
   2. Enter a query so that a trigger is only generated when a value is met. You can also enter suppression queries in the **Suppression Rules**, so that a trigger is not generated when the specified values are met.
4. **Set rule cases:**
   1. Set a [rule case][9] for the trigger and severity.
   2. Define the logic for when this rule triggers a security signal. For example, `a>0` means a security signal triggers as long as the rule condition set in the search query is met at least once in the sliding time window.
   3. Select a severity to associate the rule with and select all relevant parties you want to notify.

      {{< img src="security/cws/workload_security_rules/rule_cases2.png" alt="Setting a rule trigger, severity, and notification" >}}
5. **Say what's happening:**
   1. Name the rule and add the notification message in Markdown format. Use [Notification variables][5] to provide specific details about the signal by referencing its tags and event attributes. After the message, add multiple tags to give more context to the signals generated by your custom rule.

Datadog recommends including a remediation [runbook][10] in the body. As noted in the template, use substitution variables to dynamically generate contextualized content at runtime.

## Disable default Agent rules

1. To disable an Agent rule, navigate to the [**Agent Configuration**][6] page and select the policy using the rule.
2. In the policy, open the rule.
3. Next to the rule's title, click **Monitoring**, and then select **Disable Rule**.
4. Click **Save Changes**.

You can also disable a rule by setting the **Then...** section of a rule to **Do Nothing**.

[1]:#create-the-custom-agent-and-detection-rules-together
[2]:#create-a-custom-agent-rule
[3]: https://app.datadoghq.com/security/workload-protection/policies
[4]: https://app.datadoghq.com/security/configuration/agent-rules
[5]: /security/notifications/variables/?tab=cloudsiem
[6]: https://app.datadoghq.com/security/configuration/workload/agent-rules
[7]: /security/workload_protection/workload_security_rules
[8]: /security/workload_protection/
[9]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/?tab=threshold#set-a-rule-case
[10]: https://app.datadoghq.com/notebook/list?type=runbook
[11]: /account_management/rbac/permissions/
[12]: /security/workload_protection/guide/active-protection
[13]: #disable-default-agent-rules
[14]: #create-the-custom-agent-and-detection-rules-together
[15]: https://app.datadoghq.com/cost/settings/tags
[16]: /security/workload_protection/agent_expressions/
[17]: #prioritize-policies
[18]: #apply-tags
[19]: https://app.datadoghq.com/fleet