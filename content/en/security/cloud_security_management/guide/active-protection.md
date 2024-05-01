---
title: Proactively block threats with Active Protection
kind: documentation
further_reading:
- link: "security/threats/workload_security_rules"
  tag: "Documentation"
  text: "CSM Threats Detection Rules"
---

This topic explains how to use the CSM Threats **Active Protection** feature to block threats automatically. 

By default, all OOTB Agent [threat detection rules][4] are enabled and actively monitoring for threats. 

Active Protection enables you to proactively block and terminate threats identified by the Datadog Agent threat detection rules.

Active Protection streamlines threat detection and targeted response, resulting in risk reduction, allowing DevSecOps and security teams to tackle evolving threats effectively:

- Security decides which threats warrant an automated action.
- DevOps decides which applications and resources are resilient enough to withstand targeted protection.

The end result is threat detection followed by immediate surgical mitigation against high confidence, true positive attacks.

## Protection options

You have three options for Agent rules:

- **Monitoring:** This is the default setting for enabled rules regardless of whether Active Protection is enabled. The Agent monitors for the enabled rule and displays detections in [Signals][1]. 
- **Blocking:** 
  - Blocking is available when Active Protection is enabled. Blocking is available on select OOTB rules that have high confidence, true positives.
  - The Agent monitors for the enabled rule, terminates the corresponding actions instantly, and displays detections in [Signals][1].
- **Disabled:** The Agent does not monitor for the rule events and does not send detections to the Datadog backend.

<div class="alert alert-info">Blocking is applied to all threats detected after blocking is enabled. Blocking is not retroactive.</div>

## Active Protection availability

Active Protection is enabled at the organization level. 

<div class="alert alert-info">Active Protection blocking functionality is available in a subset of the OOTB Agent rules only. Agent rule monitoring runs regardless of whether Active Protection is enabled.</div>

To see if Active Protection is already enabled in your organization, go to [Agent Configuration][2] and see if there is a **Protection** column in the Agent rule list.

{{< img src="security/cws/guide/protection-column.png" alt="The protection column indicates that Active Protection is enabled in the org" style="width:100%;" >}}

If Active Protection is available for a rule, then **Monitoring** or **Blocking** is listed in the **Protection** column.

If there is no **Monitoring** or **Blocking** in the **Protection** column, then Active Protection is not available for that rule yet.

When Active Protection is enabled, and applies to a rule that generated a signal, you can see it by doing the following:

1. In [Signals][1], open a signal.
2. In the signal, view **Next Steps**. 
   - If Active Protection is enabled, in **Proactively block threats**, the **Active Protection Enabled** is displayed.
   - If Active Protection is not enabled, **Active Protection Enabled** is not displayed.

If Active Protection is enabled and available for an Agent rule, you can see it by looking at the rule:

1. In [Agent Configuration][2], select a rule.
2. In the rule, if Active Protection is enabled and available, there is a **Protection** section.

## Enable Active Protection

When you enable Active Protection, you are enabling the Active Protection capability for your entire Datadog org. Active Protection is not limited to individual users.

By default, all OOTB Agent rules are in a monitoring state. Enabling Active Protection does not immediately change the default state. Enabling Active Protection allows you to change the state of a rule from monitoring to blocking.

Consequently, you do not need to worry that enabling Active Protection immediately changes the state of threat detection.

To enable Active Protection:

1. Go to CSM [Agent Configuration][2] rules.
2. Select **Enable Active Protection**.

    {{< img src="security/cws/guide/enable-active-protection.png" alt="Your image description" style="width:100%;" >}}

After Active Protection is enabled, the Agent Configuration rules list contains a **Protection** column.

The **Protection** column indicates if a rule is in the **Monitoring** or **Blocking** state. When you first enable Active Protection, rules are only in a monitoring state. You must configure the blocking option manually.

### Disabling Active Protection

After Active Protection is enabled, you can disable it on each Agent Configuration rule.

## Block threats detected by an Agent rule

After Active Protection is enabled, you can configure the **Blocking** option on an Agent rule and the Agent will terminate the corresponding actions instantly.

To enable blocking on an Agent rule:

1. In [Agent Configuration][2], open a rule that has **Monitoring** in the **Protection** column. If there is no **Monitoring** or **Blocking** in the **Protection** column, then Active Protection is not available for that rule yet.
2. In the Agent rule, in **Protection**, select **Blocking**.
   
   {{< img src="security/cws/guide/protection-blocking-option.png" alt="An Agent rule Protection section displaying the Blocking option" style="width:100%;" >}}
3. In **Where**, select **Everywhere** or **Custom**. For details on these options, see [Scoping the Agent rule][3] below.
4. Select **Save Changes**.
5. In Agent Configuration, select **Deploy Agent Policy**.


### Scoping the Agent rule

When you create or edit an Agent rule after Active Protection is enabled, you can select **Blocking** in the rule **Protection** setting. 

When you select **Blocking**, you can scope where Datadog should apply the rule using the **Everywhere** and **Custom** options. 

#### Everywhere

The rule applies to all services, hosts, images, etc.

#### Custom

In **Custom**, you can specify services or tags to automatically generate an expression for where to apply blocking protection.

<div class="alert alert-info">Any service or image that is not matched by the expression is not blocked, but it is still monitored.</div>

You can use services and tags to generate an expression. Datadog matches the rule using the service(s) or tag(s) you provide.

- **Services:** Enter one or more service names. You can use wildcards. For example, entering `a*` generates the expression `process.envp in ["DD_SERVICE=a*"]`.
- **Tags:** Enter one or more tags for container images. If you enter multiple tags, all tags must match for the **Protection** to apply. There are two options:
  - `image_tag`: the image tag only. For example, `stable-perl`.
  - `short_image`: the image name without a tag. For example, `nginx`.
  - For example, a Github Container registry image such `ghcr.io/MY_NAMESPACE/MY_IMAGE:2.5` can be referenced using:
    - `image_tag`: `2.5`.
    - `short_image`: `MY_IMAGE`.

[1]: https://app.datadoghq.com/security
[2]: https://app.datadoghq.com/security/configuration/workload/agent-rules
[3]: #scoping-the-agent-rule
[4]: /security/threats/workload_security_rules