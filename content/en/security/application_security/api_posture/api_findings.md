---
title: API Findings
description: Triage detected API risks across definitions, gateways, and live traffic.
---

**API Findings** provides a central triage view of all detected API risks across definitions, gateways, and live traffic. It provides a set of default rules to detect common vulnerabilities and misconfigurations. You can also set up [custom rules][1] to adapt to specific use cases.

**API Findings** columns:

- **Severity:** Each issue is ranked by risk.
- **Endpoints:** Shows how many endpoints are affected and their services.
- **Status and Ticketing:** `Open` or `In Progress` tracks remediation progress and workflow integration.

Use the **Service** facet to see each service's endpoints to identify ownership and prioritize by business impact.

## Common operations

Click a finding to view its details and perform a workflow such as Validate > Investigate > Fix > Track:

1. Validate:
   - Review **What Happened** and **Detected In** to ensure the detection is accurate (service, endpoint, method).
   - In **Next Steps**, choose whether to **Mute**, **Create Ticket**, or **Run Workflow** depending on ownership and impact.
2. Investigate:
   - Use the **Context** tab to examine the endpoint snapshot and attributes (method, path, authentication flags, tags).
   - **Detected In** provides information for routing ownership and remediation.
   - In **Detection Rule Query**, you can edit an API finding rule by clicking **See Detection Rule**.
3. Fix: 
   - Follow the guidance under **Remediation**.
4. Track:
   - Use **Create Ticket** to link the issue to your tracking system.
   - Use **Reference Links** for developer education or code review.

[1]: /security/application_security/policies/custom_rules/
