---
title: Threat Protection Overview
disable_toc: false
further_reading:
- link: "/security/application_security/api_posture/overview/"
  tag: "Documentation"
  text: "API Posture Overview"
- link: "/security/application_security/attack_summary/"
  tag: "Documentation"
  text: "Attack Summary"
---

{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection is in Preview on Datadog Government site US1-FED.
</div>
{{< /site-region >}}

The {{< ui >}}Threat Protection{{< /ui >}} overview page shows how well your services are instrumented and protected against attacks, the security signals they generate, the services most exposed to threats, and the trends in attack activity. The following sections describe each area of the page.

{{< img src="security/application_security/overview/threat_protection.png" alt="Threat Protection overview page" >}}

## Ask Bits panel

The {{< ui >}}Ask Bits{{< /ui >}} panel is a contextual entry point to Bits AI for questions about your threat protection. It offers ready-made prompts such as {{< ui >}}Top priorities{{< /ui >}}, {{< ui >}}Summarize Last Week insights{{< /ui >}}, and {{< ui >}}What I'm exposed to?{{< /ui >}} to help you start an investigation without writing a query. The panel appears when Bits AI is enabled and you have the required access. You can dismiss it.

## App Instrumentation

The {{< ui >}}App Instrumentation{{< /ui >}} section reports how broadly App and API Protection (AAP) is activated across your services. {{< ui >}}Threat detection coverage{{< /ui >}} shows how many services are actively detecting threats in real time compared to your total services, and {{< ui >}}Recommended services activated{{< /ui >}} tracks your progress in enabling AAP on at-risk services identified by known vulnerabilities and suspicious traffic. From this section you can protect additional services or view the services already protected.

## Attack Coverage

The {{< ui >}}Attack Coverage{{< /ui >}} section shows how well your services are protected against attack vectors. {{< ui >}}Attack Tools{{< /ui >}} reports how many exposed services are protected from scanners, bots, and similar tooling through AAP monitoring and blocking, and {{< ui >}}Exploit Prevention{{< /ui >}} reports how many services are protected from exploits through Runtime Application Self-Protection (RASP). The section also highlights services that need [Threat Protection][1] enabled or a tracing library upgrade.

## Open Signals

The {{< ui >}}Open Signals{{< /ui >}} section summarizes the security signals that are open. Signals are broken down by severity (critical, high, medium, and low) with a trend comparison to the previous time window of equal length, and they are shown across {{< ui >}}Open{{< /ui >}} and {{< ui >}}Under Review{{< /ui >}} states. The section also lists the top rules triggering signals so you can see what is driving activity.

## Threats Exposure

The {{< ui >}}Threats Exposure{{< /ui >}} section ranks the services that are most exposed to threats, surfacing those that have triggered the most signals. From here you can examine a specific service to investigate the activity targeting it.

## Threat Trends

The {{< ui >}}Threat Trends{{< /ui >}} section highlights patterns in attack activity. {{< ui >}}Top attack types{{< /ui >}} shows the most common categories of detected attacks, and {{< ui >}}Top countries{{< /ui >}} shows the geographic distribution of attack sources by origin country. You can pivot to the Traces Explorer for deeper analysis of the underlying activity.

## Customize Page

Use the {{< ui >}}Customize Page{{< /ui >}} button in the page header to tailor the page to your needs. In the popover, drag sections between the {{< ui >}}Visible{{< /ui >}} and {{< ui >}}Hidden{{< /ui >}} areas to control which sections appear, and reorder visible sections by dragging them. Your changes persist locally so the page keeps your layout on future visits.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/how-it-works/#identify-services-exposed-to-application-attacks
