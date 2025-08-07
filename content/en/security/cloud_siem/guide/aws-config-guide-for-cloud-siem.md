---
title: AWS Configuration Guide for Cloud SIEM
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
- link: "/getting_started/integrations/aws/"
  tag: "Documentation"
  text: "Getting Started with AWS"
- link: "/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/"
  tag: "Documentation"
  text: "Send AWS services logs with the Datadog Lambda function"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "See how to explore your logs"
aliases:
  - /security_platform/guide/aws-config-guide-for-cloud-siem
  - /security_platform/cloud_siem/guide/aws-config-guide-for-cloud-siem
---

## Overview

Cloud SIEM applies detection rules to all processed logs in Datadog to detect threats, like a targeted attack, a threat intel listed IP communicating with your systems, or an insecure configuration. The threats are surfaced as Security Signals in the [Security Signals Explorer][1] for triaging.

This guide walks you through the following steps so that you can start detecting threats with your AWS CloudTrail logs:

1. [Set up Datadog's AWS integration](#set-up-aws-integration-using-cloudformation)
2. [Enable AWS CloudTrail logs](#enable-aws-cloudtrail-logging)
3. [Send AWS CloudTrail logs to Datadog](#send-aws-cloudtrail-logs-to-datadog)
4. [Use Cloud SIEM to triage Security Signals](#use-cloud-siem-to-triage-security-signals)

## Set up AWS integration using CloudFormation

{{% cloud-siem-aws-setup-cloudformation %}}

## Enable AWS CloudTrail logging 

{{% cloud-siem-aws-cloudtrail-enable %}}

## Send AWS CloudTrail logs to Datadog

{{% cloud-siem-aws-cloudtrail-send-logs %}}

## Use Cloud SIEM to triage Security Signals

Cloud SIEM applies out of the box detection rules to all processed logs, including the CloudTrail logs you have just set up. When a threat is detected with a Detection Rule, a Security Signal is generated and can be viewed in the Security Signals Explorer.

- Go to the [Cloud SIEM Signals Explorer][9] to view and triage threats. See [Security Signals Explorer][10] for further details.
- You can also use the [AWS CloudTrail dashboard][11] to investigate anomalous activity.
- See [out-of-the-box detection rules][12] that are applied to your logs.
- Create [new rules][13] to detect threats that match your specific use case.

Since Cloud SIEM applies detection rules to all processed logs, see the [in-app instructions][14] on how to collect [Kubernetes audit logs][15] and logs from other sources for threat detection. You can also enable different [AWS services][16] to log to a S3 bucket and send them to Datadog for threat monitoring.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%22Log%20Detection%22
[9]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%28%22Log%20Detection%22%29%20&column=time&order=desc&product=siem
[10]: /security/cloud_siem/triage_and_investigate/investigate_security_signals
[11]: https://app.datadoghq.com/dash/integration/30459/aws-cloudtrail
[12]: https://docs.datadoghq.com/security/default_rules/#cat-cloud-siem
[13]: https://docs.datadoghq.com/security/detection_rules/
[14]: https://app.datadoghq.com/security/configuration?detect-threats=apache&secure-cloud-environment=amazon-web-services&secure-hosts-and-containers=kubernetes&selected-products=security_monitoring
[15]: https://docs.datadoghq.com/integrations/kubernetes_audit_logs/
[16]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#enable-logging-for-your-aws-service
