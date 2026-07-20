---
title: API Posture Overview
disable_toc: false
further_reading:
- link: "/security/application_security/threat_protection/overview/"
  tag: "Documentation"
  text: "Threat Protection Overview"
- link: "/security/application_security/attack_summary/"
  tag: "Documentation"
  text: "Attack Summary"
---

{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection is in Preview on Datadog Government site US1-FED.
</div>
{{< /site-region >}}

The **API Posture** overview page gives you a security-focused view of your API estate. It surfaces how well your endpoints are covered, the open findings affecting them, the endpoints most exposed to risk, and the policies that protect them. The following sections describe each area of the page.

{{< img src="security/application_security/overview/api_posture.png" alt="API Posture overview page" >}}

## Ask Bits panel

The **Ask Bits** panel is a contextual entry point to Bits AI for questions about your API posture. It offers ready-made prompts such as **Top priorities**, **Summarize Last Week insights**, and **What I'm exposed to?** to help you start an investigation without writing a query. The panel appears when Bits AI is enabled and you have the required access. You can dismiss it.

## Coverage

The **Coverage** section provides an inventory overview of your API endpoints. It classifies endpoints as **Documented** (receiving traffic and described in your API definitions), **Orphan** (documented but receiving no traffic), and **Shadow** (receiving traffic but undocumented). It also breaks down the authentication posture of your endpoints across **Authenticated**, **Unauthenticated**, and **Undetected** states, and highlights the top sensitive data types observed across your endpoints.

## Open Findings

The **Open Findings** section summarizes the API security findings that are open. Findings are broken down by severity (critical, high, medium, and low) and by the rules that generate them, so you can see which issues are most pressing and which rules account for the most findings. The counts reflect the selected time range, so you can compare findings at the start and end of the period.

## Threats Exposure

The **Threats Exposure** section ranks the endpoints that are most exposed to risk, surfacing those with the highest number of critical and high-severity findings. From here you can examine a specific endpoint and the findings affecting it to prioritize remediation.

## Policies Coverage

The **Policies Coverage** section shows how your API protection is configured. It reports the deployment status of your API finding rules, including which rules are enabled and which are disabled, and it displays coverage across OWASP API Security categories so you can identify gaps in protection.

## Customize Page

Use the **Customize Page** button in the page header to tailor the page to your needs. In the popover, drag sections between the **Visible** and **Hidden** areas to control which sections appear, and reorder visible sections by dragging them. Your changes persist locally so the page keeps your layout on future visits.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
