---
aliases:
- fby-542-vkr
- /security_monitoring/default_rules/fby-542-vkr
- /security_monitoring/default_rules/aws-elbv2-accesslogs
disable_edit: true
integration_id: elbv2
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: elbv2
title: ELBv2 is generating access logs
type: security_rules
---

## Description

Enable Access Logging for your Amazon Application Load Balancers (ALBs).

## Rationale

Logs contain the time a request was received, a client's IP address, latencies, request paths, and server responses. You can use this information to analyze traffic patterns and troubleshoot issues.

## Remediation

### From the console

Follow the AWS [Enable access logging][1] documentation to enable access logging using the console.

### From the command line

Follow the AWS [Enable access logging][1] documentation to enable access logging using the AWS CLI.

[1]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-access-logs.html#enable-access-logging
