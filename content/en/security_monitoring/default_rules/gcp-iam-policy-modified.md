---
title: GCP IAM Policy Modified
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/google_cloud_platform/
src_img: /images/integrations_logos/google_cloud_platform.png
source: gcp
scope: gcp.project
security: compliance

aliases:
- b58-97e-9f1
---

## Overview

### Goal
Detect a change to the IAM policy. 

### Strategy
This rule lets you monitor GCP admin activity audit logs to determine when the `SetIamPolicy` method is invoked. 

### Triage & Response
1. Review the log and inspect the policy deltas (`@data.protoPayload.serviceData.policyDelta.bindingDeltas`) and ensure none of the actions are `REMOVE`.