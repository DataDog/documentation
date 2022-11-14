---
aliases:
- 49s-nqd-u7j
- /security_monitoring/default_rules/49s-nqd-u7j
- /security_monitoring/default_rules/cloudtrail-aws-ec2-host-enrich-new-eks-nodegroup-event
disable_edit: true
iaas: aws
integration_id: ec2
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: ec2
security: attack
source: cloudtrail
title: AWS EC2 new event for EKS Node Group
type: security_rules
---

## Goal
Detect when an AWS EKS node group makes a new API call.

## Strategy
This rule sets a baseline for host activity across an AWS EKS node group, and enables detection of potentially anomalous activity when a node group makes a new API call.

A new API call from a node group can indicate an attacker gaining a foothold within the system and trying API calls not normally associated with this node group.

## Triage and response
1. Investigate API activity for the AWS EKS node group to determine if the specific API call is malicious.
2. Review any other security signals for the AWS EKS node group.
3. If the activity is deemed malicious:
    * If possible, isolate the compromised hosts.
    * Determine what other API calls were made by the EKS node group.
    * Begin your organization's incident response process and investigate.
