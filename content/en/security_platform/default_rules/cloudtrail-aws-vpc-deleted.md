---
aliases:
- f6b-3b4-aef
control: cis-3.14
disable_edit: true
framework: cis-aws
kind: documentation
rule_category:
- Log Detection
scope: ec2
security: compliance
source: cloudtrail
title: AWS VPC created or modified
type: security_rules
---

### Goal
Detect when an attacker is destroying a VPC.

### Strategy
This rule lets you monitor this CloudTrail API call to detect if an attacker is deleting a VPC:

* [DeleteVpc][1]

### Triage & Response
1. Determine which user in your organization owns the API key that made this API call.
2. Contact the user to see if they intended to make this API call.
3. If the user did not make the API call:
 * Rotate the credentials.
 * Investigate if the same credentials made other unauthorized API calls.

[1]: https://docs.aws.amazon.com/cli/latest/reference/ec2/delete-vpc.html
