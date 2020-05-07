---
title: AWS RDS Cluster Deleted
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/amazon_cloudtrail/
src_img: /images/integrations_logos/amazon_cloudtrail.png
security: attack
tactic: TA0040-impact
technique: T1485-data-destruction
source: cloudtrail
scope: rds

aliases:
- a11-897-de4
---

## Overview

### Goal
Detect when an attacker is destroying a RDS Cluster.

### Strategy
This rule lets you monitor this CloudTrail API call to detect if an attacker is deleting a RDS cluster:

* [DeleteDBCluster][1]

### Triage & Response
1. Determine which user in your organization owns the API key that made this API call.
2. Contact the user to see if they intended to make this API call.
3. If the user did not make the API call:
 * Rotate the credentials.
 * Investigate if the same credentials made other unauthorized API calls.

[1]: https://docs.aws.amazon.com/cli/latest/reference/rds/delete-db-cluster.html
