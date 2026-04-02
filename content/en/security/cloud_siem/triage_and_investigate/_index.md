---
title: Triage and Investigate
disable_toc: false
further_reading:
- link: "https://www.datadoghq.com/blog/risky-behavior-cloud-environments/"
  tag: "Blog"
  text: "Identify risky behavior in cloud environments"
---

## Overview

Cloud SIEM offers integrated tools to streamline security investigations after a security signal is generated. These tools guide you through the following investigative workflow when a security signal is triggered:

- Threat assessment
- Scope comprehension
- Impact determination

Start with [Investigate Security Signals][1] to triage and investigate signals using the signals explorer. Filter by severity, entity, or timeframe to quickly assess what triggered detections and decide which signals require immediate attention.

For a more entity-centric approach, [Risk Insights][2] consolidates SIEM signals, Cloud Security findings, and identity risks into unified entity profiles representing users or assets paired with an opinionated risk score model.

To gain a broad understanding of how an actor moves throughout your ecosystem, the [Investigator][3] graphical interface maps connections between entities and activities over time.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_siem/investigate_security_signals/
[2]: /security/cloud_siem/entities_and_risk_scoring
[3]: /security/cloud_siem/investigator
