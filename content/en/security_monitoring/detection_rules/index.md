---
title: Detection Rules
kind: documentation
aliases:
  - /security_monitoring/detection_rules/
further_reading:
- link: "/security_monitoring/explorer/"
  tag: "Documentation"
  text: "Security Signals Explorer"
---

## Overview

{{< img src="security_monitoring/detection_rules/detection-rules-overview.png" alt="Datadog Security Monitoring" width="80%" >}}

Detection Rules define conditional logic that is applied to all ingested logs and cloud configurations. When at least one case defined in a rule is matched over a given period of time, Datadog generates a Security Signal.

Security Monitoring uses Log Detection to analyze ingested logs in real time. Compliance Monitoring uses Cloud Configuration to scan the state of your cloud environment. For each monitoring option, there are [default detection rules][1] that work out-of-the-box with integration configuration. You can also create new rules to tailor to your environment.

{{< whatsnext desc="To configure detection rules:">}}
{{< nextlink href="/security_monitoring/detection_rules/security_monitoring" tag="Documentation" >}}See the default detection rules to set up an integration{{< /nextlink >}}
{{< nextlink href="/security_monitoring/detection_rules/compliance_monitoring" tag="Documentation" >}}Follow the creating new Security Monitoring rules guide{{< /nextlink >}}
{{< nextlink href="/security_monitoring/default_rules" tag="Documentation" >}}Follow the creating new Compliance Monitoring rules guide{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /security_monitoring/default_rules/
