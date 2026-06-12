---
title: Policy management
disable_toc: false
---

Agent rules are **organized in policies**. A policy is a set of Agent rules that you deploy together and **scope to specific infrastructure** (hosts, clusters, and so on).

In addition to the out-of-the-box (OOTB) [default Agent rules][7], you can write **custom Agent rules** to detect events that Datadog does not surface with the standard OOTB rules alone.

## Policies

### Create a policy

1. Go to [Policies][3].
2. Click **New Policy**. You can also open an existing policy, click **Actions**, and clone it.
3. Enter a name for the policy and click **Create**.
   The new policy is created, but it is not enabled or deployed.
4. Click the policy to open it.
5. In **New Rule**, add custom Agent rules to the policy. To create a new Agent rule, see [Create a custom Agent rule][14].
6. Click **Edit** next to **Deployed on 0 agents**. 
7. Add [tags][18] to the policy to target specific infrastructure.
8. To deploy the policy, toggle the switch next to **Policy is disabled** and confirm. This uses [Remote Configuration](#remote-configuration), as detailed below in that page.

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

When two policies deployed to the same host contain the same rule with a different status, the most severe action will be taken (Blocking > Monitoring > Disabled).

### Apply tags

[Tags][15] are the target location where the policy is applied (environments, clusters, hosts, etc.). Add custom tags to policies to target the policy rules at certain portions of your infrastructure.

Tags identify two things: the Agents using the policy and the infrastructure where those Agents apply the policy. For example, if a policy has the tag `cluster_name:mycluster` the Agents in that cluster use the policy on the hosts in that cluster.

1. Go to [Agent Configuration][6].
2. Open a policy and click **Edit**.
3.  Enter tags and click **Apply**. If the policy is enabled, the policy is applied to the tag targets.

When you add tags, Datadog displays how many agents the tags target as well the infrastructure running each agent. For example, `Tags match 144 agents`. 

## Create a custom Agent rule {#create-a-custom-agent-rule}

You can create a custom Agent rule and deploy it as part of a custom policy. Later, when defining a custom [detection rule][21], you reference the custom Agent rule and add expression parameters. To combine Agent and detection rules in one flow, see [Create the custom Agent and detection rules together][23].
Custom Agent rules are deployed to the Agent in a custom policy separate from the default policies. The custom policy contains only custom Agent rules.


1. Go to [Agent Configuration][6].
2. Create a new policy or open an existing one.
3. With the policy open, in **Actions**, select **Manual rule creator** to open the Agent rule editor. The same editor is also available from the [Agent rules][24] page in the app. To use the **Assisted rule creator** wizard instead—which walks you through both the Agent rule and the threat detection rule—see [Create the custom Agent and detection rules together][23].
4. Enter a **Name** and **Description** for the rule.
5. In **Expression**, define the match using [Datadog Security Language (SECL)][16].
6. For each policy that should include this rule, set the rule status: **Monitoring** or **Disabled**. If the rule supports enforcement, you can choose **Blocking** when [Active Protection][12] is turned on and your user has the `security_monitoring_cws_agent_rules_actions` permission.
7. (Optional) Add variables or actions that run when the rule matches an event. See [Variables and actions][25].
8. Click **Create Agent Rule**. You are returned to the policy.

After you create a custom Agent rule, the change is saved along with other pending rule updates. To apply the change to your environment, deploy the updated custom policy to the Agent.

## Enable and deploy policies

Enabled policies apply their rules to the infrastructure targets identified by their tags. Enabling a policy is the same as deploying it.

You can use **Remote Configuration** in the Datadog UI to automatically deploy the custom policy to the hosts designated by the policy tags (all hosts or a defined subset of hosts), or you can **manually deploy** the policy to the Agent on each host.

### Remote Configuration {#remote-configuration}

**Remote Configuration** is how Datadog delivers automatically policies to your agents. It uses a secure mechanism to guarantee that only signed and authentified policies are push to your agents. To deploy a policy using remote configuration, you just have to follow the steps detailed in Create a policy.
### Manual deployment

For **manual deployment**, you install a policy file on each Agent yourself. You can build the policy and its rules in the Datadog UI and **download** the generated file. If you already know the policy syntax, author a `.policy` file by hand. Then upload or sync that file to every Agent where the policy should run, as described below.

1. On the **Agent Configuration** page, open a policy.
2. In Actions, select **Download Policy**.

Next, use the following instructions to upload the policy file to each host.

{{< tabs >}}
{{% tab "Host" %}}

Copy the `default.policy` file to the target host in the `/etc/datadog-agent/runtime-security.d` folder. The file must have `read` and `write` access for the `root` user on the host. This may require use of a utility such as SCP or FTP.

To apply the changes, do **one** of the following:

- Reload runtime policies (no full Agent restart):

  ```bash
  sudo /opt/datadog-agent/embedded/bin/system-probe runtime policy reload
  ```

- Or restart the [Datadog Agent](/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent).

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

{{% /tab %}}
{{< /tabs >}}

## Disable default Agent rules

1. To disable an Agent rule, navigate to the [**Agent Configuration**][6] page and select the policy using the rule.
2. In the policy, open the rule.
3. Next to the rule's title, click **Monitoring**, and then select **Disable Rule**.
4. Click **Save Changes**.

Deleting a rule from [Rules configuration][24] removes it from **all policies** that included that rule.

## RBAC for custom rule management

Here are some important [role and permissions][11] to use for custom rules RBAC:

- The `security_monitoring_cws_agent_rules_actions` permission can be used to turn on and configure the [Active Protection][12] feature. Active Protection enables you to proactively block and terminate threats identified by the Datadog Agent detection rules.
  - To use the `security_monitoring_cws_agent_rules_actions` permission, a user with the Datadog Admin role must create a role containing the `security_monitoring_cws_agent_rules_actions` permission and then add only those users that manage Active Protection to this role.
- The **Datadog Standard** role enables users to create/update a custom rule by default, as long as the operation does not change the **protection** settings on the rule.


[3]: https://app.datadoghq.com/security/workload-protection/policies
[4]: https://app.datadoghq.com/security/configuration/agent-rules
[5]: /security/notifications/variables/?tab=cloudsiem
[6]: https://app.datadoghq.com/security/configuration/workload/agent-rules
[7]: /security/workload_protection/detect_and_monitor/agent_rules/#ootb-rules
[8]: /security/workload_protection/
[20]: /security/default_rules/#cat-workload-security
[9]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/?tab=threshold#set-a-rule-case
[10]: https://app.datadoghq.com/notebook/list?type=runbook
[11]: /account_management/rbac/permissions/
[12]: /security/workload_protection/guide/active-protection
[13]: #disable-default-agent-rules
[14]: #create-a-custom-agent-rule
[15]: https://app.datadoghq.com/cost/settings/tags
[16]: /security/workload_protection/agent_expressions/
[17]: #prioritize-policies
[18]: #apply-tags
[19]: https://app.datadoghq.com/fleet
[21]: /security/workload_protection/detect_and_monitor/detection_rules
[23]: /security/workload_protection/detect_and_monitor/detection_rules/#create-the-custom-agent-and-detection-rules-together
[24]: https://app.datadoghq.com/security/workload-protection/agent-rules
[25]: /security/workload_protection/detect_and_monitor/agent_rules/variables_and_actions