---
title: Respond and Report
disable_toc: false
site_support_id: workload_security_active_protection
aliases:
  - /security/workload_protection/respond_and_report/active_protection
  - /security/workload_protection/respond_and_report/automated_response
  - /security/workload_protection/respond_and_report/response
  - /security/workload_protection/respond_and_report/remediation
  - /security/workload_protection/guide/active-protection
  - /security/cloud_security_management/guide/active-protection
further_reading:
- link: "security/workload_protection/detect_and_monitor/detection_rules"
  tag: "Documentation"
  text: "Workload Protection detection rules"
- link: "security/workload_protection/getting_started"
  tag: "Documentation"
  text: "Getting started with Workload Protection"
- link: "security/workload_protection/workload_protection_agent_config"
  tag: "Documentation"
  text: "Workload Protection Agent configuration"
- link: "https://learn.datadoghq.com/courses/workload-protection-detect-compromises"
  tag: "Learning Center"
  text: "Detect Host and Container Compromises with Workload Protection"
---

After Workload Protection surfaces runtime risk through Agent events, signals, and findings, **Respond and Report** is where you configure enforcement, drive response, and measure outcomes.

## Enable enforcement

Both **Automated response** and **Response** rely on enforcement in the Agent to kill processes or containers when a matching rule or action is triggered.

### Turn on enforcement in `system-probe`

Both response features rely on `runtime_security_config.enforcement` in `/etc/datadog-agent/system-probe.yaml`. Default values are sufficient in most setups, and both features are enabled by default. For the full parameter reference, see [Workload Protection Agent configuration][4].

In addition to disabling enforcement, you can specify binaries to protect from response actions (none by default) or control which rule sources can trigger response actions (`file` rules and `remote-config`, both enabled by default).

## Automated response

<div class="alert alert-danger">Please contact <a href="https://docs.datadoghq.com/help/">Datadog Support</a> to enable Automated response.</div>

Automated response enables you to proactively block and terminate threats identified by the Datadog Agent detection rules using the Workload Protection {{< ui >}}Automated response{{< /ui >}} feature.

Automated response streamlines threat detection and targeted response, resulting in risk reduction, allowing DevSecOps and security teams to tackle evolving threats effectively:

- Security decides which threats warrant an automated action.
- DevOps decides which applications and resources are resilient enough to withstand targeted protection.

The end result is threat detection followed by immediate surgical mitigation against high confidence, true positive attacks.

### Automated response availability

Automated response is enabled at the organization level.

<div class="alert alert-info">Automated response blocking functionality is available in a subset of the OOTB Agent rules only. Agent rule monitoring runs regardless of whether Automated response is enabled.</div>

To check if Automated response is already enabled in your organization, go to [Agent Configuration][2]. If Automated response is enabled, a {{< ui >}}Protection{{< /ui >}} column is displayed in the Agent rule list.

<!-- {{< img src="security/cws/guide/protection-column.png" alt="The protection column indicates that Automated response is enabled in the org" style="width:100%;" >}} -->

If Automated response is available for a crypto mining rule, then {{< ui >}}Monitoring{{< /ui >}} or {{< ui >}}Blocking{{< /ui >}} is listed in the {{< ui >}}Protection{{< /ui >}} column.

If there is no {{< ui >}}Monitoring{{< /ui >}} or {{< ui >}}Blocking{{< /ui >}} in the {{< ui >}}Protection{{< /ui >}} column, then Automated response is not available for that crypto mining rule yet.

When Automated response is enabled, and applies to a rule that generated a signal, you can see it by doing the following:

1. In [Signals][1], open a signal.
2. In the signal, view **Next Steps**.
   - If Automated response is enabled, in **Proactively block threats**, the **Automated response enabled** is displayed.
   - If Automated response is not enabled, **Automated response enabled** is not displayed.

If Automated response is enabled and available for an Agent rule, you can see it by looking at the rule:

1. In [Agent Configuration][2], select the rule.
2. In the rule, if Automated response is enabled and available, there is a **Protection** section.

### RBAC for Automated response

Here are some important [role and permissions][5] to use for custom rules and Automated response RBAC:

- The `security_monitoring_cws_agent_rules_actions` permission can be used to turn on and configure the Automated response feature.
  - To use the `security_monitoring_cws_agent_rules_actions` permission, a user with the Datadog Admin role must create a role containing the `security_monitoring_cws_agent_rules_actions` permission and then add only those users that manage Automated response to this role.
- The **Datadog Standard** role enables users to create/update a custom rule by default, as long as the operation does not change the **protection** settings on the rule.

### Enable Automated response

When you enable Automated response, you are enabling the Automated response capability for your entire Datadog org. Automated response is not limited to individual users.

By default, all OOTB Agent rules (such as the crypto mining) are in a monitoring state. Enabling Automated response does not immediately change the default state. Enabling Automated response allows you to change the state of a rule from monitoring to blocking.

Consequently, you do not need to worry that enabling Automated response immediately changes the state of threat detection.

To enable Automated response:

1. Go to Workload Protection [Agent Configuration][2] rules.
2. Select {{< ui >}}Enable Automated response{{< /ui >}}.

    <!-- {{< img src="security/cws/guide/enable-active-protection.png" alt="Enable Automated response button" style="width:100%;" >}} -->

After Automated response is enabled, the Agent Configuration rules list contains a {{< ui >}}Protection{{< /ui >}} column.

The {{< ui >}}Protection{{< /ui >}} column indicates if a rule is in the {{< ui >}}Monitoring{{< /ui >}} or {{< ui >}}Blocking{{< /ui >}} state. When you first enable Automated response, rules are only in a monitoring state. You must configure the blocking option manually.

### Disabling Automated response

After Automated response is enabled, you can disable it on each Agent Configuration rule.

### Configure blocking on Agent rules

After Automated response is enabled, you can change the protection option to **Blocking** on an Agent rule and the Agent will terminate the corresponding processes instantly.

#### Protection options

You have three options for Agent rules:

- **Monitoring:** This is the default setting for enabled rules, regardless of whether Automated response is enabled. The Agent monitors for the enabled rule and displays detections in [Signals][1].
- **Blocking:**
  - Blocking is available when Automated response is enabled. Blocking is available on select OOTB rules that have high confidence, true positives.
  - The Agent monitors for the enabled rule, terminates the corresponding actions instantly, and displays detections in [Signals][1].
- **Disabled:** The Agent does not monitor for the rule events and does not send detections to the Datadog backend.

<div class="alert alert-info">Blocking is applied to all threats detected after blocking is enabled. Blocking is not retroactive.</div>

To enable blocking on an Agent rule:

1. In [Agent Configuration][2], open a rule that has **Monitoring** in the **Protection** column. If there is no **Monitoring** or **Blocking** in the **Protection** column, then Automated response is not available for that rule yet.
2. In the Agent rule, in **Protection**, select **Blocking**.

   {{< img src="security/cws/guide/protection-blocking-option.png" alt="An Agent rule Protection section displaying the Blocking option" style="width:100%;" >}}
3. In **Where**, select **Everywhere** or **Custom**. For details on these options, see [Scoping the Agent rule](#scoping-the-agent-rule) below.
4. Select **Save Changes**.
5. In Agent Configuration, select **Deploy Agent Policy**.

#### Scoping the Agent rule

When you select **Blocking**, you can scope where Datadog should apply the rule using the **Everywhere** and **Custom** options.

##### Everywhere

The rule applies to all services, hosts, and images.

##### Custom

In {{< ui >}}Custom{{< /ui >}}, you can specify services or tags to automatically generate an expression for where to apply blocking protection.

<div class="alert alert-info">Any service or image that is not matched by the expression is not blocked, but it is still monitored.</div>

You can use services and tags to generate an expression. Datadog matches the rule using the services or tags you provide.

- **Services:** Enter one or more service names. You can use wildcards. For example, entering `a*` generates the expression `process.envp in ["DD_SERVICE=a*"]`.
- **Tags:** Enter one or more tags for container images. If you enter multiple tags, all tags must match for the {{< ui >}}Protection{{< /ui >}} to apply. There are two options:
  - `image_tag`: The image tag only. For example, `stable-perl`.
  - `short_image`: The image name without a tag. For example, `nginx`.
  - For example, a Github Container registry image such as `ghcr.io/MY_NAMESPACE/MY_IMAGE:2.5` can be referenced using:
    - `image_tag`: `2.5`.
    - `short_image`: `MY_IMAGE`.

### Report blocked attack attempts

After Automated response is enabled and set to {{< ui >}}Blocking{{< /ui >}} for an Agent rule, blocked threats appear in [Signals][1].

A signal for a blocked threat contains the messages `SECURITY RESPONSE` and `The malicious process <THREAT NAME> has automatically been killed.`:

{{< img src="security/cws/guide/active-protection-signal-messages.png" alt="Signal messages" style="width:100%;" >}}

## Response

If you do not want to automatically kill processes based on rules, you can respond manually after a [Workload Protection signal][6] is triggered.

<div class="alert alert-info">Response and agent enforcement capabilities depend on your Datadog subscription and organization settings. Contact <a href="https://docs.datadoghq.com/help/">Datadog Support</a> if you are unsure whether the feature is enabled for your account.</div>

You can take actions directly from the signal side panel to protect your infrastructure after a signal is generated.

### Enable the Response feature

Complete the following once per environment (hosts or containers running the Workload Protection-enabled Agent).

#### Prerequisites

- Datadog **Agent 7.78** or later on the hosts that should execute response actions.
- [**Remote Configuration**][3] is enabled so response policies can be delivered to the Agent.
- Enforcement is enabled in `system-probe` as described in [Turn on enforcement in `system-probe`](#turn-on-enforcement-in-system-probe).

#### Enable network probes for network isolation

Network isolation uses eBPF **Traffic Control** classifiers and raw packet programs. The required network probes are enabled by default in `event_monitoring_config.network` in `system-probe.yaml`.

### Available actions

The Agent supports the following **enforcement** action types for response workflows:

#### Kill

Terminate a malicious process or all processes in a compromised **container** (cgroup), depending on scope.

#### Network filter (network isolation)

Block network traffic using an eBPF-based filter (for example, drop egress to specific ports). Any isolation can be reverted.

### Action statuses

When a response action runs, the Agent reports a **status** for each action. The table below summarizes the main outcomes for each action type.

| Status | Description | Kill | Network isolation |
| --- | --- | --- | --- |
| `performed` | The action completed successfully. | {{< X >}} | {{< X >}} |
| `partially_performed` | Part of the kill succeeded (for example, some processes terminated) but not all targets could be killed. | {{< X >}} | |
| `removed` | An isolation rule was **removed** from the current ruleset while it was present before—used when **reverting** network isolation. | | {{< X >}} |
| `error` | An error occurred during the response. The action failed and the process or container is still running or not isolated. | {{< X >}} | {{< X >}} |
| `not_triggered` | The Agent did not find the targeted resource. The container or process may have exited before the response action ran. | {{< X >}} | {{< X >}} |

[1]: https://app.datadoghq.com/security
[2]: https://app.datadoghq.com/security/configuration/workload/agent-rules
[3]: /agent/remote_config/?tab=configurationyamlfile
[4]: /security/workload_protection/workload_protection_agent_config
[5]: /account_management/rbac/permissions
[6]: /security/workload_protection/investigate_and_triage/security_signals
[7]: /security/workload_protection/getting_started/kubernetes
