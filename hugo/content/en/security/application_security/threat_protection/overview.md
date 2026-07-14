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

The **Threat Protection** overview page shows how well your services are instrumented and protected against attacks, the security signals they generate, the services most exposed to threats, and the trends in attack activity. The following sections describe each area of the page.

{{< img src="security/application_security/overview/threat_protection.png" alt="Threat Protection overview page" >}}

## Ask Bits panel

The **Ask Bits** panel is a contextual entry point to Bits AI for questions about your threat protection. It offers ready-made prompts such as **Top priorities**, **Summarize Last Week insights**, and **What I'm exposed to?** to help you start an investigation without writing a query. The panel appears when Bits AI is enabled and you have the required access. You can dismiss it.

## App Instrumentation

The **App Instrumentation** section reports how broadly App and API Protection (AAP) is activated across your services. **Threat detection coverage** shows how many services are actively detecting threats in real time compared to your total services, and **Recommended services activated** tracks your progress in enabling AAP on at-risk services identified by known vulnerabilities and suspicious traffic. From this section you can protect additional services or view the services already protected.

## Attack Coverage

The **Attack Coverage** section shows how well your services are protected against attack vectors. **Attack Tools** reports how many exposed services are protected from scanners, bots, and similar tooling through AAP monitoring and blocking, and **Exploit Prevention** reports how many services are protected from exploits through Runtime Application Self-Protection (RASP). The section also highlights services that need [Threat Protection][1] enabled or a tracing library upgrade.

## Open Signals

The **Open Signals** section summarizes the security signals that are open. Signals are broken down by severity (critical, high, medium, and low) with a trend comparison to the previous time window of equal length, and they are shown across **Open** and **Under Review** states. The section also lists the top rules triggering signals so you can see what is driving activity.

## Threats Exposure

The **Threats Exposure** section ranks the services that are most exposed to threats, surfacing those that have triggered the most signals. From here you can examine a specific service to investigate the activity targeting it.

## Threat Trends

The **Threat Trends** section highlights patterns in attack activity. **Top attack types** shows the most common categories of detected attacks, and **Top countries** shows the geographic distribution of attack sources by origin country. You can pivot to the Traces Explorer for deeper analysis of the underlying activity.

## Customize Page

Use the **Customize Page** button in the page header to tailor the page to your needs. In the popover, drag sections between the **Visible** and **Hidden** areas to control which sections appear, and reorder visible sections by dragging them. Your changes persist locally so the page keeps your layout on future visits.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/how-it-works/#identify-services-exposed-to-application-attacks
