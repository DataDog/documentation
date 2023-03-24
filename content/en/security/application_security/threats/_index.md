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

For additional information about how threat monitoring and protection works, read [How ASM Works][2].


## Explore threat signals

When threat data for your services is coming into Datadog, ASM Overview shows a summary of what's happening. Here, you can review security monitoring coverage, and enable ASM on services. To investigate signals of suspicious activity, click a service's **Review** link.

In the [Signals Explorer][3], filter by attributes and facets to find critical threats. Click into a signal to see details for it, including the user information and their IP address, what rule they triggered, and related traces and other security signals.

From this page you can block and unblock users and IPs, or investigate what infrastructure might have been affected.

{{< img src="security/application_security/appsec-threat-overview.mp4" alt="Overview of investigating threats in signals explorer" video="true" >}}


## Create In-App WAF rules for identifying attack patterns

You can [create In-App WAF rules][4] that define what suspicious behavior looks like in your application, augmenting the default rules that come with ASM. Then [specify custom rules][5] to generate security signals from the attack attempts triggered from these rules, raising them in the Threat Monitoring views for your investigation. 

## Slow down attacks and attackers with ASM Protect

{{% asm-protect %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services?lens=Security
[2]: /security/application_security/how-appsec-works/
[3]: /security/explorer
[4]: /security/application_security/threats/inapp_waf_rules/
[5]: /security/application_security/threats/custom_rules/
