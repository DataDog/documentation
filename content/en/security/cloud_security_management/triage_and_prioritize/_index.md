---
title: Triage and Prioritize
further_reading:
- link: "/security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/"
  tag: "Documentation"
  text: "Runtime Prioritization Engine"
- link: "/security/cloud_security_management/triage_and_prioritize/severity_scoring/"
  tag: "Documentation"
  text: "Severity Scoring"
- link: "/security/security_inbox/"
  tag: "Documentation"
  text: "Review prioritized findings in the Security Inbox"
---

Cloud Security generates findings across vulnerabilities, misconfigurations, and identity risks. Triage and Prioritize covers two related capabilities: the engine that identifies the findings truly exposing your business-critical resources, and the scoring framework that translates that judgment into a per-finding severity score you can sort, filter, and route on.

## Runtime Prioritization Engine

The [Runtime Prioritization Engine][1] combines runtime observability and security data to identify the ~5% of findings truly exposing your business-critical resources. It evaluates each finding across five dimensions: reachability, exposure, exploitability, business criticality, and actionability. Available in Preview for Cloud Security Vulnerabilities; coverage for misconfigurations and identity risks is in development.

## Severity Scoring

[Severity Scoring][2] turns the Runtime Prioritization Engine's output into a Datadog Severity Score on each finding. For vulnerabilities, it strictly follows the [CVSS 4.0][3] algorithm, enriching the base score with temporal factors (active exploits, exploitation probability) and environmental factors (runtime context, exposure, criticality of the affected resource). For misconfigurations and identity risks, severity is computed using a likelihood × impact matrix that weighs how an adversary could abuse the finding against the damage that abuse would cause.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/
[2]: /security/cloud_security_management/triage_and_prioritize/severity_scoring/
[3]: https://www.first.org/cvss/v4-0/
