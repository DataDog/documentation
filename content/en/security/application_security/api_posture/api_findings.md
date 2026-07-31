---
title: API Findings
description: Triage detected API risks across definitions, gateways, and live traffic.
---

{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection is in Preview on Datadog Government site US1-FED.
</div>
{{< /site-region >}}

The [API Findings][1] explorer provides a central triage view of the API risks detected across your definitions, gateways, and live traffic. Default rules detect common vulnerabilities and misconfigurations. You can also add [custom rules][2] for specific use cases.

**API Findings** columns:

- **Severity:** Each issue is ranked by risk.
- **Endpoints:** Shows how many endpoints are affected and their services.
- **Status and Ticketing:** `Open` or `In Progress` tracks remediation progress and workflow integration.

Use the **Service** facet to see each service's endpoints to identify ownership and prioritize by business impact.

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

## Remediation

Datadog API Posture uses [Bits Code][3] to generate code fixes for vulnerabilities.

1. In Datadog, navigate to [**Security** > **App & API Protection** > **Findings**][1].
2. Select a finding to open a side panel with details about the finding and the affected endpoint.
3. In the **Next Steps** > **Remediation** section, click **Fix with Bits**.

This opens a Bits Code session to fix this single API finding. You can review the proposed diff, ask follow-up questions, edit the patch, and create a pull request to apply the remediation to your source code repository.
View all Bits Code sessions on **Bits AI** > **Bits Code** > [**Sessions**][4].

### Remediation session details

Each Bits Code session shows the life cycle of an AI-generated fix so you can review and validate changes before merging. It includes:

- The original security finding and proposed code change
- An explanation of how and why Bits Code generated the fix
- CI results (if enabled) to validate the patch is safe to deploy
- Options to refine the fix or **Create PR** to apply the changes to your source code repository

To open the remediation session, select the API finding from the [**Findings**][1] page to open the side panel, scroll to the **Remediation** section, and select **Expand & Chat**.

You can also view all remediation sessions on [**Sessions**][4].

[1]: https://app.datadoghq.com/security/appsec/inventory/finding
[2]: /security/application_security/policies/custom_rules/
[3]: /bits_ai/bits_code
[4]: https://app.datadoghq.com/code
