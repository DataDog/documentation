---
title: OOTB Rules
kind: documentation
type: security_rules
description: "Datadog Security detection rules"
aliases:
  - /security_monitoring/default_rules/
  - /cloud_siem/default_rules/
  - /security_platform/default_rules/
  - /security/default_rules/aws-rds-enabled-encryption
  - /security/default_rules/cis-aws-1.3.0-1.14
disable_sidebar: true
cascade:
- _target:
    path: /security/default_rules/google-cloud-storage-bucket-enumerated.md
  aliases:
    - /security_monitoring/default_rules/gcp-gcs-bucket-enumerated
- _target:
    path: /security/default_rules/*.md
  algolia:
    rank: 11
    category: Documentation
    subcategory: Security Detection Rules
---

Datadog provides out-of-the-box (OOTB) [detection rules][1] to flag attacker techniques and potential misconfigurations so you can immediately take steps to remediate. Datadog continuously develops new default rules, which are automatically imported into your account, your Application Security Management library, and the Agent, depending on your configuration. For more information, see the Detection Rules documentation.

Click on the buttons below to filter by different parts of Datadog Security. OOTB rules are available for [Cloud SIEM][2], [CSM Misconfigurations][3], which is divided into cloud or infrastructure configuration, [CSM Threats][4], and [Application Security Management][5].

[1]: /security/detection_rules/
[2]: /security/cloud_siem/
[3]: /security/misconfigurations/
[4]: /security/threats/
[5]: /security/application_security/
