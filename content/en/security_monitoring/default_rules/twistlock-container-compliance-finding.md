---
title: Container Violated Compliance Standards
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/twistlock_sm/
src_img: /images/integrations_logos/twistlock_sm.png
source: twistlock

aliases:
- c6a-b25-2e9
---

## Overview

### Goal
Detect when a container is not running within compliance standards.

### Strategy
This rule lets you monitor Twistlock logs to detect when `Critical` severity compliance issues are discovered in a running container. 

### Triage & Response
1. Determine the impact of the compliance finding.
2. Remediate the compliance finding.