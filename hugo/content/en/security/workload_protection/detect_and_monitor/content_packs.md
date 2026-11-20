---
title: Content Packs
description: Enable Datadog-curated Content Packs to deploy optional detections for specific software stacks and threat vectors.
disable_toc: false
further_reading:
- link: "/security/workload_protection/detect_and_monitor/agent_rules/policy_management"
  tag: "Documentation"
  text: "Deploy Agent rules with policies"
- link: "/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules"
  tag: "Documentation"
  text: "Workload Protection detection rules"
- link: "/security/workload_protection/investigate_and_triage/security_signals"
  tag: "Documentation"
  text: "Investigate security signals"
---

Not every detection rule is relevant to every workload. Some detections can be too noisy for environments with specific constraints, or may not apply to particular software stacks. At the same time, new threats emerge regularly, and Datadog security research team continuously develops rules to detect novel attacks and vulnerabilities.

Workload Protection [Content Packs][1] address both challenges. Each Content Pack is a Datadog-crafted bundle of optional [Agent rules][2], [detection rules][3], and supporting content built for a specific software stack, threat vector, or emerging vulnerability. You opt in to the Content Packs you need and deploy them only to the workloads where they apply.

## Benefits

- **Deploy targeted detections to relevant workloads:** Opt into policies built for specific workloads or environments, and deploy them only where they apply. This avoids unnecessary noise and performance impact on workloads where those detections do not apply.
- **Stay ahead of emerging threats:** Get access to new rules as Datadog security research team identifies novel threats and vulnerabilities, complementing the coverage provided by default policies.

## Included content

Depending on the Content Pack, a bundle can include:

- **Agent rules** packaged in a [policy][4] scoped to the workloads the Content Pack targets
- **Detection rules** that raise [security signals][5] when matching activity is detected
- **Finding rules** that evaluate runtime security posture for the covered use case
- Configuration guidance for deploying the Content Pack in your environment

## Enable a Content Pack

1. Go to [Content Packs][1].
2. Browse the available Content Packs and select one.
3. Review the included Agent rules, detection rules, and deployment requirements.
4. Click {{< ui >}}Enable{{< /ui >}} to activate the Content Pack and go to the associated policy page.

Enabling a Content Pack adds its associated policy and rules to your organization. To start detecting threats, deploy the associated policy to your infrastructure.

## Deploy a Content Pack

Content Packs deploy through [policies][4]. After you enable a Content Pack, scope its policy to the workloads where the detections apply:

1. Go to [Policies][6].
2. Open the policy associated with the Content Pack you enabled.
3. Click {{< ui >}}Edit{{< /ui >}} next to the deployment scope.
4. Add [tags][7] to target specific hosts, clusters, or environments.
5. Toggle the policy to enabled and confirm deployment.

For more information about policy deployment, see [Policy management][4].

## Deactivate a Content Pack

1. Go to [Content Packs][1].
2. Browse the available Content Packs and select one that is activated.
3. Click {{< ui >}}Deactivate{{< /ui >}} to remove the associated policy from the policy page.

[1]: https://app.datadoghq.com/security/workload-protection/overview#content-packs
[2]: /security/workload_protection/detect_and_monitor/agent_rules
[3]: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[4]: /security/workload_protection/detect_and_monitor/agent_rules/policy_management
[5]: /security/workload_protection/investigate_and_triage/security_signals
[6]: https://app.datadoghq.com/security/workload-protection/policies
[7]: /getting_started/tagging/
