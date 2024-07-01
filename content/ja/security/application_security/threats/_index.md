---
title: Application Threat Management
further_reading:
- link: /security/application_security/threats/add-user-info/
  tag: Documentation
  text: Tracking User Activity
- link: /security/application_security/threats/library_configuration/
  tag: Documentation
  text: Configuring your ASM setup
- link: /security/application_security/software_composition_analysis/
  tag: Documentation
  text: Software Composition Analysis
- link: /security/application_security/how-appsec-works/
  tag: Documentation
  text: How ASM Works
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Application Security Management is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

ASM Threat Management uses trace telemetry from your APM-instrumented applications to identify threats and attacks on your running services by comparing the observed behavior against known attack patterns, or by identifying business logic abuse.

Security signals raised by Threat Monitoring are summarized and surfaced in views you already commonly visit to monitor service health and performance. The [Service Catalog][1] and individual Service Pages in APM provide insights into application threat signals, allowing you to investigate vulnerabilities, block attackers, and review attack exposures.

{{< img src="security/application_security/threats/threats-on-svc-cat_3.png" alt="Service Catalog with services showing threat signals" style="width:100%;" >}}

For additional information about how Threat Management works, read [How ASM Works][4].


## Explore threat signals

When threat data for your services is coming into Datadog, [ASM Overview][7] shows a summary of what's happening. Here, you can enable vulnerability detection, review attacks, customize alerting and reporting, and enable ASM on your services. To investigate signals of suspicious activity, click a service's **Review** link.

In the [Signals Explorer][2], filter by attributes and facets to find critical threats. Click into a signal to see details for it, including the user information and their IP address, what rule they triggered, attack flow, and related traces and other security signals. From this page you can also click to create a case and declare an incident. For more information see [Investigate Security Signals][8].

{{< img src="security/application_security/threats/appsec-threat-overview.png" alt="Overview of investigating threats in signals explorer">}}


## Create In-App WAF rules for identifying attack patterns

You can [create In-App WAF rules][5] that define what suspicious behavior looks like in your application, augmenting the default rules that come with ASM. Then [specify custom rules][6] to generate security signals from the attack attempts triggered from these rules, raising them in the Threat Monitoring views for your investigation.

## Slow down attacks and attackers with ASM Protect

{{% asm-protect %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services?lens=Security
[2]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%22Application%20Security%22&column=time&order=desc&product=appsec&viz=stream&start=1694726477747&end=1695331277747&paused=false
[4]: /security/application_security/how-appsec-works/
[5]: /security/application_security/threats/inapp_waf_rules/
[6]: /security/application_security/threats/custom_rules/
[7]: https://app.datadoghq.com/security/appsec?
[8]: /security/application_security/threats/security_signals/