---
title: Proactively block crypto mining threats with Active Protection
site_support_id: workload_security_active_protection
aliases:
  - /security/cloud_security_management/guide/active-protection
further_reading:
- link: "security/workload_protection/workload_security_rules"
  tag: "Documentation"
  text: "Workload Protection Detection Rules"
- link: "https://learn.datadoghq.com/courses/workload-protection-detect-compromises"
  tag: "Learning Center"
  text: "Detect Host and Container Compromises with Workload Protection"

---

<div class="alert alert-danger">Please contact <a href="https://docs.datadoghq.com/help/">Datadog Support</a> to enable Active Protection.</div>

<div class="alert alert-info">Workload Protection Active Protection is in Preview.</div>

This topic explains how to use the Workload Protection **Active Protection** feature to block crypto mining threats automatically. 

By default, all OOTB Agent [threat detection rules][4] are enabled and actively monitoring for crypto threats. 

Active Protection enables you to proactively block and terminate crypto mining threats identified by the Datadog Agent threat detection rules.

Active Protection streamlines threat detection and targeted response, resulting in risk reduction, allowing DevSecOps and security teams to tackle evolving crypto mining threats effectively:

- Security decides which threats warrant an automated action.
- DevOps decides which applications and resources are resilient enough to withstand targeted protection.

The end result is crypto mining threat detection followed by immediate surgical mitigation against high confidence, true positive attacks.

## RBAC for Active Protection

Here are some important [role and permissions][11] to use for custom rules and Active Protection RBAC:

- The `security_monitoring_cws_agent_rules_actions` permission can be used to turn on and configure the Active Protection feature. 
  - To use the `security_monitoring_cws_agent_rules_actions` permission, a user with the Datadog Admin role must create a role containing the `security_monitoring_cws_agent_rules_actions` permission and then add only those users that manage Active Protection to this role.
- The **Datadog Standard** role enables users to create/update a custom rule by default, as long as the operation does not change the **protection** settings on the rule.

## Protection options

You have three options for Agent rules:

- **Monitoring:** This is the default setting for enabled rules, regardless of whether Active Protection is enabled. The Agent monitors for the enabled rule and displays detections in [{{< ui >}}Signals{{< /ui >}}][1]. 
- **Blocking:** 
  - Blocking is available when Active Protection is enabled. Blocking is available on select OOTB rules that have high confidence, true positives.
  - The Agent monitors for the enabled rule, terminates the corresponding actions instantly, and displays detections in [{{< ui >}}Signals{{< /ui >}}][1].
- **Disabled:** The Agent does not monitor for the rule events and does not send detections to the Datadog backend.

<div class="alert alert-info">Blocking is applied to all threats detected after blocking is enabled. Blocking is not retroactive.</div>

## Active Protection availability

Active Protection is enabled at the organization level. 

<div class="alert alert-info">Active Protection blocking functionality is available in a subset of the OOTB Agent rules only. Agent rule monitoring runs regardless of whether Active Protection is enabled.</div>

To check if Active Protection is already enabled in your organization, go to [Agent Configuration][2]. If Active Protection is enabled, a {{< ui >}}Protection{{< /ui >}} column is displayed in the Agent rule list.

<!-- {{< img src="security/cws/guide/protection-column.png" alt="The protection column indicates that Active Protection is enabled in the org" style="width:100%;" >}} -->

If Active Protection is available for a crypto mining rule, then {{< ui >}}Monitoring{{< /ui >}} or {{< ui >}}Blocking{{< /ui >}} is listed in the {{< ui >}}Protection{{< /ui >}} column.

If there is no {{< ui >}}Monitoring{{< /ui >}} or {{< ui >}}Blocking{{< /ui >}} in the {{< ui >}}Protection{{< /ui >}} column, then Active Protection is not available for that crypto mining rule yet.

When Active Protection is enabled, and applies to a crypto mining rule that generated a signal, you can see it by doing the following:

1. In [{{< ui >}}Signals{{< /ui >}}][1], open a signal.
2. In the signal, view {{< ui >}}Next Steps{{< /ui >}}. 
   - If Active Protection is enabled, in {{< ui >}}Proactively block threats{{< /ui >}}, the {{< ui >}}Active Protection Enabled{{< /ui >}} is displayed.
   - If Active Protection is not enabled, {{< ui >}}Active Protection Enabled{{< /ui >}} is not displayed.

If Active Protection is enabled and available for an Agent crypto mining rule, you can see it by looking at the rule:

1. In [Agent Configuration][2], select a crypto mining rule.
2. In the crypto mining rule, if Active Protection is enabled and available, there is a {{< ui >}}Protection{{< /ui >}} section.

## Enable Active Protection

When you enable Active Protection, you are enabling the Active Protection capability for your entire Datadog org. Active Protection is not limited to individual users.

By default, all OOTB Agent crypto mining rules are in a monitoring state. Enabling Active Protection does not immediately change the default state. Enabling Active Protection allows you to change the state of a crypto mining rule from monitoring to blocking.

Consequently, you do not need to worry that enabling Active Protection immediately changes the state of threat detection.

To enable Active Protection:

1. Go to CSM [Agent Configuration][2] rules.
2. Select {{< ui >}}Enable Active Protection{{< /ui >}}.

    <!-- {{< img src="security/cws/guide/enable-active-protection.png" alt="Enable Active Protection button" style="width:100%;" >}} -->

After Active Protection is enabled, the Agent Configuration rules list contains a {{< ui >}}Protection{{< /ui >}} column.

The {{< ui >}}Protection{{< /ui >}} column indicates if a rule is in the {{< ui >}}Monitoring{{< /ui >}} or {{< ui >}}Blocking{{< /ui >}} state. When you first enable Active Protection, rules are only in a monitoring state. You must configure the blocking option manually.

### Disabling Active Protection

After Active Protection is enabled, you can disable it on each Agent Configuration rule.

## Block threats detected by an Agent rule

After Active Protection is enabled, you can configure the {{< ui >}}Blocking{{< /ui >}} option on an Agent crypto mining rule and the Agent will terminate the corresponding crypto mining actions instantly.

To enable blocking on an Agent rule:

1. In [Agent Configuration][2], open a crypto mining rule that has {{< ui >}}Monitoring{{< /ui >}} in the {{< ui >}}Protection{{< /ui >}} column. If there is no {{< ui >}}Monitoring{{< /ui >}} or {{< ui >}}Blocking{{< /ui >}} in the {{< ui >}}Protection{{< /ui >}} column, then Active Protection is not available for that rule yet.
2. In the Agent rule, in {{< ui >}}Protection{{< /ui >}}, select {{< ui >}}Blocking{{< /ui >}}.
   
   {{< img src="security/cws/guide/protection-blocking-option.png" alt="An Agent rule Protection section displaying the Blocking option" style="width:100%;" >}}
3. In {{< ui >}}Where{{< /ui >}}, select {{< ui >}}Everywhere{{< /ui >}} or {{< ui >}}Custom{{< /ui >}}. For details on these options, see [Scoping the Agent rule][3] below.
4. Select {{< ui >}}Save Changes{{< /ui >}}.
5. In Agent Configuration, select {{< ui >}}Deploy Agent Policy{{< /ui >}}.


### Scoping the Agent rule

When you create or edit an Agent crypto mining rule after Active Protection is enabled, you can select {{< ui >}}Blocking{{< /ui >}} in the rule {{< ui >}}Protection{{< /ui >}} setting. 

When you select {{< ui >}}Blocking{{< /ui >}}, you can scope where Datadog should apply the rule using the {{< ui >}}Everywhere{{< /ui >}} and {{< ui >}}Custom{{< /ui >}} options. 

#### Everywhere

The rule applies to all services, hosts, and images.

#### Custom

In {{< ui >}}Custom{{< /ui >}}, you can specify services or tags to automatically generate an expression for where to apply blocking protection.

<div class="alert alert-info">Any service or image that is not matched by the expression is not blocked, but it is still monitored.</div>

You can use services and tags to generate an expression. Datadog matches the rule using the services or tags you provide.

- {{< ui >}}Services{{< /ui >}}: Enter one or more service names. You can use wildcards. For example, entering `a*` generates the expression `process.envp in ["DD_SERVICE=a*"]`.
- {{< ui >}}Tags{{< /ui >}}: Enter one or more tags for container images. If you enter multiple tags, all tags must match for the {{< ui >}}Protection{{< /ui >}} to apply. There are two options:
  - `image_tag`: The image tag only. For example, `stable-perl`.
  - `short_image`: The image name without a tag. For example, `nginx`.
  - For example, a Github Container registry image such as `ghcr.io/MY_NAMESPACE/MY_IMAGE:2.5` can be referenced using:
    - `image_tag`: `2.5`.
    - `short_image`: `MY_IMAGE`.

## Blocked attack example

After Active Protection is enabled and set to {{< ui >}}Blocking{{< /ui >}} for an Agent rule, blocked threats appear in [{{< ui >}}Signals{{< /ui >}}][1].

A signal for a blocked threat contains the messages `SECURITY RESPONSE` and `The malicious process <THREAT NAME> has automatically been killed.`:

{{< img src="security/cws/guide/active-protection-signal-messages.png" alt="Signal messages" style="width:100%;" >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security
[2]: https://app.datadoghq.com/security/configuration/workload/agent-rules
[3]: #scoping-the-agent-rule
[4]: /security/workload_protection/workload_security_rules
