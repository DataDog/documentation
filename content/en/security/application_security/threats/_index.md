---
title: Application Threat Monitoring and Protection
kind: documentation
further_reading:
- link: "/security/application_security/threats/add-user-info/"
  tag: "Documentation"
  text: "Tracking User Activity"
- link: "/security/application_security/threats/setup_and_configure/"
  tag: "Documentation"
  text: "Configuring your ASM setup"
- link: "/security/application_security/risk_management/"
  tag: "Documentation"
  text: "Risk Management"
- link: "/security/application_security/how-appsec-works/"
  tag: "Documentation"
  text: "How ASM Works"
---

ASM Threat Monitoring and Protection uses trace telemetry from your APM-instrumented applications to identify threats and attacks on your running services by comparing the observed behavior against known attack patterns. 

Security signals raised by Threat Monitoring are summarized and surfaced in views you already commonly visit to monitor service health and performance. The [Service Catalog][1] and individual Service Pages in APM provide quick insights into application threat signals, and let you quickly click through to investigate signals and block attackers.

{{< img src="security/application_security/threats-on-svc-cat.png" alt="Service Catalog with services showing threat signals" style="width:100%;" >}}

For additional information about how threat monitoring and protection works, read [How ASM Works][4].


## Explore threat signals

When threat data for your services is coming into Datadog, ASM Overview shows a summary of what's happening. Here, you can review security monitoring coverage, and enable ASM on services. To investigate signals of suspicious activity, click a service's **Review** link.

In the [Signals Explorer][2], filter by attributes and facets to find critical threats. Click into a signal to see details for it, including the user information and their IP address, what rule they triggered, and related traces and other security signals.

From this page you can block and unblock users and IPs, or investigate what infrastructure might have been affected.

{{< img src="security/application_security/appsec-threat-overview.mp4" alt="Overview of investigating threats in signals explorer" video="true" >}}


## Create event rules for identifying attack patterns

You can [create event rules][5] that define what suspicious behavior looks like in your application, augmenting the default rules that come with ASM. Then [specify custom rules][6] to generate security signals from these events, raising them in the Threat Monitoring views for your investigation. 

## Slow down attacks

<div class="alert alert-info"><strong>Beta: IP and user blocking</strong><br>
If your service is running with <a href="/agent/guide/how_remote_config_works/#enabling-remote-configuration">an Agent with Remote Configuration enabled and a tracing library version that supports it</a>, you can block attackers from the Datadog UI without additional configuration of the Agent or tracing libraries.</div>

Datadog ASM offers built-in protection capabilities to slow down attacks and attackers. 

IP and user blocking actions are implemented through the [tracing libraries][7], and do not introduce any new dependencies in your stack. Blocks are saved in the Datadog platform automatically, and securely fetched by the [Datadog Agent][8], deployed in your infrastructure, and applied to your application.

You can block attackers that are flagged in ASM Security Signals temporarily or permanently. In the Signals Explorer, click into a signal to see what users and IP addresses are generating the signal, and optionally block them.

{{< img src="/security/application_security/appsec-block-user-ip.png" alt="A security signal panel in Datadog ASM, allowing to block the attackers' IPs" width="75%">}}

From there, all services already protected by ASM block incoming requests performed by the blocked IP or user, for the specified duration. All blocked traces are tagged with `security_response.block_ip` and displayed in the [Trace Explorer][9]. Services where ASM is disabled aren't protected.

{{% asm-protection-page-configuration %}}

{{< img src="/security/application_security/asm-blocking-page-html.png" alt="The page displayed as ASM blocks requests originating from blocked IPs" width="75%" >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services?lens=Security
[2]: /security/explorer
[4]: /security/application_security/how-appsec-works/
[5]: /security/application_security/threats/event_rules/
[6]: /security/application_security/threats/custom_rules/
[7]: /tracing/trace_collection/dd_libraries/
[8]: /agent/guide/how_remote_config_works/
[9]: /tracing/trace_explorer/
