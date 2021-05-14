---
title: Default Rules
kind: documentation
type: security_rules
description: "Datadog Security Platform Rules"
aliases:
  - /security_monitoring/default_rules/
disable_sidebar: true
---

<div class="alert alert-warning">
Cloud Workload Security is currently in beta. Contact <a href="https://docs.datadoghq.com/help/">Datadog support</a> for more information.
</div>

[Detection rules][1] define conditional logic that is applied to all ingested logs. When at least one case defined in a detection rule is matched over a given period of time, Datadog generates a security signal.

Datadog provides default detection rules to flag attacker techniques and potential misconfigurations so that you can immediately take steps to improve your security posture. Datadog continuously develops new default detection rules, which are automatically imported into your account.

Filter by **Logs Detection** to see the Security monitoring rules, **Runtime Agent** to see Cloud Security Workload rules, or **Cloud Configuration** to see the Cloud Security Posture rules.

[1]: ../detection_rules
