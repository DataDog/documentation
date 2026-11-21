---
title: Detect and Monitor
disable_toc: false
further_reading:
- link: "https://www.datadoghq.com/blog/detection-as-code-cloud-siem/"
  tag: "Blog"
  text: "Build, test, and scale detections as code with Datadog Cloud SIEM"
- link: "https://www.datadoghq.com/blog/cloud-siem-mitre-attack-map/"
  tag: "Blog"
  text: "Identify gaps to strengthen detection coverage with the Datadog Cloud SIEM MITRE ATT&CK Map"
- link: "https://www.datadoghq.com/blog/building-security-coverage-for-cloud-environments/"
  tag: "Blog"
  text: "Build sufficient security coverage for your cloud environment"
- link: "https://www.datadoghq.com/blog/writing-datadog-security-detection-rules/"
  tag: "Blog"
  text: "Best practices for creating custom detection rules with Datadog Cloud SIEM"
- link: "https://learn.datadoghq.com/courses/cloud-siem-detect-investigate-threats"
  tag: "Learning Center"
  text: "Detect and Investigate Threats with Cloud SIEM"
- link: "https://learn.datadoghq.com/courses/cloud-siem-custom-rules"
  tag: "Learning Center"
  text: "Write Custom Cloud SIEM Detection Rules"

---

## Overview

Monitor your Datadog telemetry and use [out-of-the-box detection rules](#out-of-the-box-detection-rules) or [create custom rules](#custom-detection-rules) to detect threats. When a threat is detected, a security signal is generated. Additionally, you can add [suppressions](#suppressions) to refine detection rules so that a signal is not generated under specific conditions. This can improve the accuracy and relevance of security signals generated.

{{< img src="security/security_monitoring/detection_rules/detection_rule_side_panel.png" alt="The side panel of a detection rule showing the conditions that trigger a signal" style="width:100%;" >}}

## Detection rules

### Out-of-the-box detection rules

Cloud SIEM provides you with an extensive list of [OOTB detection rules][1]. After you have enabled and configured Cloud SIEM content packs, OOTB detection rules automatically begin analyzing your logs, Audit Trail events, and events from Event Management.

You can edit OOTB detection rules and do the following:

- Change the name of the rule.
- Extend the query. The original query cannot be edited, but you can add a custom query to it.
- Change the severity setting in the {{< ui >}}Set conditions{{< /ui >}} section.
- Modify the playbook.

#### Assess rule health

{{< callout url="#" btn_hidden="true" header="Preview">}}
Rule health insights are in Preview.
{{< /callout >}}

Rules may become less effective as your business needs change over time. Monitoring rules for drifting logic is inherently difficult: if a rule results in few signals, that might be by design, or it might be missing issues it was intended to catch.

In the [Detection Rules explorer][8], you can use the **Health Status** facet or search for `healthStatus:needs_attention` to filter for rules that Cloud SIEM has detected potential issues with.

In the Detection Rules explorer and the side panel that appears when you click an out-of-the-box rule in that explorer, you can view information about the health of the rule:
- {{< ui >}}Health Insights{{< /ui >}}: Provides information on whether the fields that are part of a rule appear properly in the logs Cloud SIEM ingests. Datadog categorizes supported rules as either {{< ui >}}Monitoring{{< /ui >}} or {{< ui >}}Needs attention{{< /ui >}}.
- {{< ui >}}Signal activity{{< /ui >}}: A graph of how many signals the rule has created over the past 30 days.

In the rule side panel, you can view more information about individual fields referenced in the rule. For each scope (the `source` or `service` from the query), you can see:
- {{< ui >}}Field{{< /ui >}}: The field Datadog evaluated.
- {{< ui >}}Presence rate{{< /ui >}}: The percentage of logs ingested in that scope over the last 24 hours that contain that field.
- {{< ui >}}Log count change{{< /ui >}}: The number of times the field has appeared in logs over the last 24 hours, compared to the average number of times over the last 29 days. Indicates whether the presence of that field is increasing, decreasing, or staying the same.
- {{< ui >}}Status{{< /ui >}}: Indicates Datadog's assessment of the field. Values include:
  - {{< ui >}}Monitoring{{< /ui >}}: Datadog is still collecting information about the field and has not identified any issues that require action.
  - {{< ui >}}All zero{{< /ui >}}: Over the last 30 days, all values have been zero. This could indicate that the detection was never active, or that it has become inactive after the rule was created.
  - {{< ui >}}Trailing silence{{< /ui >}}: The field appeared more frequently earlier in the 30-day lookback, but appeared significantly fewer times over the last 15 consecutive business days.
  - {{< ui >}}Drifting{{< /ui >}}: For three consecutive days, the number of times the field appeared in logs was below 5% of its median number of appearances over the previous 27 days. This indicates that there was data for the field, but that it has since experienced a steep decline.

If a field's status is either {{< ui >}}Trailing silence{{< /ui >}} or {{< ui >}}Drifting{{< /ui >}}, under {{< ui >}}Health Insights{{< /ui >}}, Datadog marks the rule as {{< ui >}}Needs attention{{< /ui >}} so you can investigate whether missing or anomalous values indicate a problem.

<div class="alert alert-info">The service that analyzes field status runs once a day. If you edit a rule, the updated status appears after the service runs again.</div>

##### Investigate rule health alerts

In the side panel of the [Detection Rules explorer][8], you can click {{< ui >}}View{{< /ui >}} beside a specific scope or field to view its appearances in the Logs Explorer. With this information, you can explore whether the scope or field changed, or if the problem might have another cause, such as an issue with your pipelines.

##### Mute or unmute rule health alerts

To mute the alerts associated with a rule:
1. In the {{< ui >}}Health Insights{{< /ui >}} section of the rule side panel, click {{< ui >}}Mute Alerts{{< /ui >}}. The Mute alerts window opens.
1. Choose to mute alerts either {{< ui >}}For 30 days{{< /ui >}} or {{< ui >}}Until this rule is updated{{< /ui >}}.
1. Optionally, add a note to explain why you're muting alerts.
1. Click {{< ui >}}Mute Alerts{{< /ui >}}.

If a rule is muted, you can click {{< ui >}}Unmute Alerts{{< /ui >}} to start getting alerts for it again.

### Custom detection rules

OOTB detection rules cover the majority of threat scenarios, but you can also create custom detection rules for your specific use cases. For custom detection rules, use the log search syntax to build and join log queries so you can target individual services, accounts, or events that you want to monitor. You can also enhance those queries with information such as the geolocation of an IP address or the status code of an HTTP request.

For logs that match the query, you can set conditions to determine whether it's a threat and if a security signal should be generated, as well as indicate the severity of the threat. Security signals provide details about the threat and include a customizable playbook, which provides information such as security policies and remediation steps.

See [Custom Detection Rules][2] for more information.

### Rule deprecation

Regular audits of all out-of-the-box detection rules are performed to maintain high fidelity signal quality. Deprecated rules are replaced with an improved rule.

The rule deprecation process is as follows:

1. There is a warning with the deprecation date on the rule. In the UI, the warning is shown in the:
    - Signal side panel's {{< ui >}}Rule Details{{< /ui >}} > {{< ui >}}Playbook{{< /ui >}} section
    - [Rule editor][3] for that specific rule
2. After the rule is deprecated, the rule remains available for the length of your retention period before it is deleted. During this time, you can re-enable the rule by [cloning the rule][3] in the UI. The retention period depends on your [Cloud SIEM product][6]:
    - Standalone
      - 12 months (365 days, usage measured in GB)
      - 15 months (450 days, usage measured in millions of events)
    - Add-on with Flex Logs and Legacy: 15 months

    Organizations that adopted Standalone before gigabyte-based usage was introduced have a 15-month retention period.
3. After the rule is deleted, you can no longer clone and re-enable it.

## Suppressions

Security signals warn you about possible threats to your infrastructure, but false positives can also be generated. For example, a large number of security signals might be triggered if a sudden influx of requests are generated from load testing an application. To reduce false positives in such scenarios, you can define a suppression query in a detection rule that prevents a signal from getting generated. You can also create suppression rules to set general suppression conditions across multiple detection rules.

See [Suppressions][4] for more information.

## Dynamic severity

You can adjust the severity of security signals based on the assets they affect. You can customize severity levels, apply custom tags, and isolate changes to specific rules.

See [Dynamic Severity][7] for more information.

## MITRE ATT&CK Map

After setting up your detection rules, use the Cloud SIEM [MITRE ATT&CK Map][5] to explore and visualize your rules against the MITRE ATT&CK framework so you have visibility into attacker techniques.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/default_rules/#cat-cloud-siem-log-detection
[2]: /security/cloud_siem/detect_and_monitor/custom_detection_rules
[3]: /security/detection_rules/#clone-a-rule
[4]: /security/cloud_siem/detect_and_monitor/suppressions
[5]: /security/cloud_siem/detection_rules/mitre_attack_map/
[6]: /security/cloud_siem/guide/determine-cloud-siem-product/
[7]: /security/cloud_siem/detect_and_monitor/dynamic_severity
[8]: https://app.datadoghq.com/security/siem/rules
