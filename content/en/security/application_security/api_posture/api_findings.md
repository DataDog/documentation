---
title: API Findings
description: Triage detected API risks across definitions, gateways, and live traffic.
---

The [API Findings][1] explorer provides a central triage view of the API risks detected across your definitions, gateways, and live traffic. Default rules detect common vulnerabilities and misconfigurations. You can also add [custom rules][2] for specific use cases.

{{< ui >}}API Findings{{< /ui >}} columns:

- **Severity:** Each issue is ranked by risk.
- **Endpoints:** Shows how many endpoints are affected and their services.
- **Status and Ticketing:** `Open` or `In Progress` tracks remediation progress and workflow integration.

Use the {{< ui >}}Service{{< /ui >}} facet to see each service's endpoints to identify ownership and prioritize by business impact.

## Common operations

Click a finding to view its details and perform a workflow such as Validate > Investigate > Fix > Track:

1. Validate:
   - Review {{< ui >}}What Happened{{< /ui >}} and {{< ui >}}Detected In{{< /ui >}} to confirm the detection is accurate (service, endpoint, method).
   - In {{< ui >}}Next Steps{{< /ui >}}, choose whether to {{< ui >}}Mute{{< /ui >}}, {{< ui >}}Create Ticket{{< /ui >}}, or {{< ui >}}Run Workflow{{< /ui >}} depending on ownership and impact.
2. Investigate:
   - Use the {{< ui >}}Context{{< /ui >}} tab to examine the endpoint snapshot and attributes (method, path, authentication flags, tags).
   - {{< ui >}}Detected In{{< /ui >}} provides information for routing ownership and remediation.
   - In {{< ui >}}Detection Rule Query{{< /ui >}}, you can edit an API finding rule by clicking {{< ui >}}See Detection Rule{{< /ui >}}.
3. Fix: 
   - Follow the guidance under {{< ui >}}Remediation{{< /ui >}}.
4. Track:
   - Use {{< ui >}}Create Ticket{{< /ui >}} to link the issue to your tracking system.
   - Use {{< ui >}}Reference Links{{< /ui >}} for developer education or code review.

[1]: https://app.datadoghq.com/security/appsec/inventory/finding
[2]: /security/application_security/policies/custom_rules/
