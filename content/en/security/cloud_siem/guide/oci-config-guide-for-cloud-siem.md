---
title: OCI Configuration Guide for Cloud SIEM
further_reading:
- link: "/security/default_rules/#cat-cloud-siem-log-detection"
  tag: "Documentation"
  text: "Explore Cloud SIEM default detection rules"
- link: "/security/cloud_siem/triage_and_investigate/investigate_security_signals"
  tag: "Documentation"
  text: "Learn about the Security Signals Explorer"
- link: "/security/cloud_siem/detect_and_monitor/custom_detection_rules/"
  tag: "Documentation"
  text: "Create new detection rules"
---

## Overview

Cloud SIEM applies detection rules to all processed logs in Datadog to detect threats, like a targeted attack, a threat intel listed IP communicating with your systems, or an insecure resource modification. The threats are surfaced as Security Signals in the Security Signals Explorer for triaging.

This guide walks you through the following steps to start detecting threats with your OCI Audit logs:

1. [Set up Datadog’s OCI integration](#set-up-datadogs-oci-integration)  
2. [Enable log collection](#enable-log-collection)
3. [Use Cloud SIEM to triage Security Signals](#use-cloud-siem-to-triage-security-signals)

## Set up Datadog’s OCI integration

Set up Datadog’s [OCI integration](https://docs.datadoghq.com/integrations/oracle-cloud-infrastructure/?tab=createvcnrecommended) using either the QuickStart (recommended) or Terraform methods.

## Enable log collection

Ensure that log collection is enabled in the Datadog OCI integration tile:

{{< img src="security/cloud_siem/guide/oci_config_guide/oci_logs_enabled.png" alt="The OCI integration tile in Datadog with log collection enabled" style="width:90%;" >}}

## Use Cloud SIEM to triage Security Signals

Cloud SIEM applies out-of-the-box detection rules to all processed logs, including your OCI Audit logs. When a threat is detected with a detection rule, a Security Signal is generated and can be viewed in the Security Signals Explorer.

- Go to the [Cloud SIEM Signals Explorer][1] to view and triage threats. See [Investigate Security Signals][2] for further details.  
- See [out-of-the-box detection rules][3] that are applied to your logs.  
- Create [new rules][4] to detect threats that match your specific use case.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/siem/signals
[2]: /security/cloud_siem/triage_and_investigate/investigate_security_signals/
[3]: /security/default_rules/#cat-cloud-siem
[4]: /security/detection_rules/#create-detection-rules
