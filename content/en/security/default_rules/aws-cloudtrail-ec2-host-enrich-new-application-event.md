---
aliases:
- unr-9hi-6ng
- /security_monitoring/default_rules/unr-9hi-6ng
- /security_monitoring/default_rules/aws-cloudtrail-ec2-host-enrich-new-application-event
disable_edit: true
iaas: aws
integration_id: ec2
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: ec2
source: cloudtrail
title: AWS EC2 new event for application
type: security_rules
---

## Goal
Detects when an application on a host has a new, unrecognized API call.

## Strategy
Using the `New Value` detection method, find when an `application` has a new `@evt.name` on a `host`.

## Triage and response
1. Determine if the `host: {{host}}` running the `application: {{application}}` should have done the following event(s)`{{@evt.name}}`:
   * If yes, you can `Archive` the signal.
   * If no, investigate further by clicking on the **Suggested Actions** tab for the signal
2. If necessary, initiate your company's incident response process.
