---
title: Protection
kind: documentation
is_beta: true
further_reading:
- link: "/security/application_security/"
  tag: "Documentation"
  text: "Application Security Management with Datadog"
---

<div class="alert alert-info"><strong>Beta: IP blocking, user blocking, and suspicious request blocking (In-App WAF)</strong><br>
If your service is running <a href="/agent/guide/how_remote_config_works/#enabling-remote-configuration">an Agent with Remote Configuration enabled and a tracing library version that supports it</a>, you can block attacks and attackers from the Datadog UI without additional configuration of the Agent or tracing libraries.</div>

## Overview

Application Security Management (ASM) Protect enables you to slow down attacks and attackers by _blocking_ them. Suspicious requests are blocked in real-time by the Datadog tracing libraries. Blocks are saved in the Datadog platform, automatically and securely fetched by the Datadog Agent, deployed in your infrastructure, and applied to your services.


## Prerequisites 

To leveraging protection capabilities for your service:

- [Update your Datadog Agent][3] to at least version 7.41.1.
- [Enable ASM][1].
- [Enable Remote Configuration][2].
- Update your tracing library to at least the minimum version needed to turn on protection. For details, see the ASM capabilities support section of[Compatibility][12] for your service's language.
- If you plan to use authenticated user blocking, [add user information to traces][4].

## Blocking IPs and users

You can block attackers that are flagged in ASM [Security Signals][5] temporarily or permanently. In the Signals Explorer, click into a signal to see what users and IP addresses are generating the signal, and optionally block them.

{{< img src="/security/application_security/appsec-block-user-ip.png" alt="A security signal panel in Datadog ASM, allowing to block the attackers' IPs" width="75%">}}


From there, all ASM-protected services block incoming requests performed by the blocked IP or user, for the specified duration. All blocked traces are tagged with `security_response.block_ip` or `security_response.block_user` and displayed in the [Trace Explorer][6]. Services where ASM is disabled aren't protected.

## Denylist

Attackers' IP addresses and authenticated users that are permanently or temporarily blocked are added to the _Denylist_. Manage the list on the [Denylist page][7].

## Passlist

You can use the _Passlist_ to permanently allow an IP address, or range of addresses, access to your application. For example, you may wish to add internal IP addresses to your passlist, or IP addresses that regularly run security audits on your application. You can also add specific paths to ensure uninterrupted access. Manage the list from the [Passlist page][8].

## Blocking suspicious requests with In-App WAF

ASM In-App WAF (web application firewall) combines the detection techniques of perimeter-based WAFs with the rich context provided by Datadog, helping your teams protect their systems with confidence.

Because ASM is aware of an application's routes, protection can be applied granularly to specific services, and not necessarily across all applications and traffic. This contextual efficiency reduces your inspection effort, and it reduces the false positive rate compared to a perimeter WAF. There is no learning period, because most web frameworks provide a structured map of routes. ASM can help your team roll out protections against zero-day vulnerabilities automatically soon after the vulnerability is disclosed, while targeting vulnerable applications, limiting the risk of false positives.

### How In-App WAF blocks suspicious requests

In addition to the `monitoring` and `disabled` modes offered for each of the 130+ In-App WAF rules, rules also have `blocking` mode. Each rule specifies conditions on the incoming request to define what the library considers suspicious. When a given rule pattern matches an ongoing HTTP request, the request is blocked by the library. 

Managed policies define the mode in which each of the In-App WAF rules behave on match: `monitoring`, `blocking`, or `disabled`. Because it has the full context of your applications, ASM knows which rules to apply to protect your applications while limiting the number of false positives. 

For fine-grained control, you can clone a Datadog managed policy or create a custom policy and set the mode to meet your needs. If you set the policy to `auto-updating`, your applications are protected by the latest detections rolled out by Datadog. You also have the option to pin a policy to a specific version of the ruleset. 

As In-App WAF rules are toggled between modes, the changes are reflected in near real-time for services with [Remote Configuration enabled][2]. For other services, you can update the policy on the [In-App WAF page][9] and then [define In-App WAF rules][10] for the change in behavior to be applied.

Manage In-App WAF by navigating to Security --> Application Security --> Configuration --> [In-App WAF][9].

View blocked suspicious requests in the [Trace Explorer][11] by filtering on the facet `Blocked:true`.

{{< img src="security/application_security/blocked-true.png" alt="ASM Trace Exporer filtered using facet Blocked set to true." style="width:100%;" >}}

## Customize Protection behavior

### Customize response to blocked requests

{{% asm-protection-page-configuration %}}

{{< img src="/security/application_security/asm-blocking-page-html.png" alt="The page displayed as ASM blocks requests originating from blocked IPs" width="75%" >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/enabling/
[2]: /agent/guide/how_remote_config_works/
[3]: /agent/versions/upgrade_between_agent_minor_versions
[4]: /security/application_security/threats/add-user-info/#adding-authenticated-user-information-to-traces-and-enabling-user-blocking-capability
[5]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%22Application%20Security%22&column=time&order=desc&product=appsec&view=signal
[6]: https://app.datadoghq.com/security/appsec/traces?query=%40appsec.blocked%3Atrue
[7]: https://app.datadoghq.com/security/appsec/denylist
[8]: https://app.datadoghq.com/security/appsec/passlist
[9]: https://app.datadoghq.com/security/appsec/in-app-waf
[10]: /security/application_security/threats/inapp_waf_rules/
[11]: https://app.datadoghq.com/security/appsec/traces
[12]: /security/application_security/enabling/compatibility/
