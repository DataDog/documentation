---
title: Services
description: View where API findings, vulnerabilities, and runtime signals converge by service.
---

{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection is in Preview on Datadog Government site US1-FED.
</div>
{{< /site-region >}}

The [Services][1] explorer aggregates findings, vulnerabilities, and runtime signals by service, so you can assess each service's risk and security coverage.

Review your services for the following:

- **Vulnerability risk:** The {{< ui >}}Vulnerability Risk{{< /ui >}} column shows aggregated SCA and IAST results for each service. Vulnerable services have components needing patching or upgrading.
- **Signals and attacks:** Click a service to see charts showing ongoing detections for active exploit attempts or recurring attack patterns.
- **Sensitive data exposure:** Services processing PII (such as SSNs or emails) demand stricter controls and monitoring.
- **Coverage and mode:** Use the {{< ui >}}App & API Protection In Monitoring Mode{{< /ui >}}, {{< ui >}}App & API Protection In Blocking Mode{{< /ui >}}, and the {{< ui >}}Inactive{{< /ui >}} facet to identify where App and API Protection is enabled and enforcing runtime protection.
- **Trend graphs:** The {{< ui >}}Trend{{< /ui >}} column indicates activity and attack frequency over time.

## Coverage

The {{< ui >}}Coverage{{< /ui >}} column shows the active protection and analysis capabilities for each service. Use {{< ui >}}Coverage{{< /ui >}} to measure the completeness of your protection stack.

For example, here are some use cases for {{< ui >}}Coverage{{< /ui >}}:

- **Runtime protection coverage with App and API Protection**: 
  - Identify the services in {{< ui >}}Monitoring{{< /ui >}} or {{< ui >}}Blocking{{< /ui >}} mode.
  - Move ready-to-block services into blocking mode to actively stop attacks.
  - Investigate inactive services to see if instrumentation or configuration gaps are leaving APIs exposed.
- **Software Composition Analysis (SCA) coverage**:
  - Track the services with analyzed open source dependencies.
  - Enable SCA for unscanned services to detect vulnerable libraries early.
  - Prioritize patching inactive services with high dependency risk.
- **Runtime Code Analysis (IAST) coverage**:
  - Pinpoint where code-level vulnerability detection is missing.
  - Enable IAST for production or high-risk apps to uncover exploitable issues in live traffic.
  - Use results to confirm whether library vulnerabilities are actually reachable in code.

[1]: https://app.datadoghq.com/security/appsec/inventory/services
