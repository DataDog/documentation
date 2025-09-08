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
---

## Overview

Monitor your Datadog telemetry and use out-of-the-box detection rules or create custom rules to detect threats. When a threat is detected, a security signal is generated. Additionally, you can add suppressions to refine detection rules so that a signal is not generated under specific conditions. This can improve the accuracy and relevance of security signals generated.

## Out-of-the-box detection rules

Cloud SIEM provides you with an extensive list of [OOTB detection rules][1]. After you have enabled and configured Cloud SIEM content packs, OOTB detection rules automatically begin analyzing your logs, Audit Trail events, and events from Event Management.

You can [edit OOTB detection rules][2] and do the following:

- Change the name of the rule.
- Extend the query. The original query cannot be edited, but you can add a custom query to it.
- Change the severity setting in the Set conditions section.
- Modify the playbook.

## Custom detection rules

OOTB detection rules cover the majority of threat scenarios, but you can also create custom detection rules for your specific use cases. For custom detection rules, use the log search syntax to build and join log queries so you can target individual services, accounts, or events that you want to monitor. You can also enhance those queries with information such as the geolocation of an IP address or the status code of an HTTP request.

For logs that match the query, you can set conditions to determine whether it's a threat and if a security signal should be generated, as well as indicate the severity of the threat. Security signals provide details about the threat and include a customizable playbook, which provides information such as security policies and remediation steps.

See [Custom Detection Rules][3] for more information.

## Suppressions

Security signals warn you about possible threats to your infrastructure, but false positives can also be generated. For example, a large number of security signals might be triggered if a sudden influx of requests are generated from load testing an application. To reduce false positives in such scenarios, you can define a suppression query in a detection rule that prevents a signal from getting generated. You can also create suppression rules to set general suppression conditions across multiple detection rules.

See [Suppressions][4] for more information.

## MITRE ATT&CK Map

After setting up your detection rules, use the Cloud SIEM [MITRE ATT&CK Map][5] to explore and visualize your rules against the MITRE ATT&CK framework so you have visibility into attacker techniques.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/default_rules/#cat-cloud-siem-log-detection
[2]: /security/detection_rules/#manage-detection-rules
[3]: /security/cloud_siem/detect_and_monitor/custom_detection_rules
[4]: /security/cloud_siem/detect_and_monitor/suppressions
[5]: /security/cloud_siem/detection_rules/mitre_attack_map/
