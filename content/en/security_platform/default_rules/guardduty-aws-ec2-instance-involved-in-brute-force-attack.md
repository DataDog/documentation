---
aliases:
- bb9-ecf-230
disable_edit: true
kind: documentation
rule_category:
- Log Detection
scope: ec2
security: attack
source: guardduty
tactic: TA0006-credential-access
technique: T1110-brute-force
title: AWS EC2 instance involved in brute force attack
type: security_rules
---

### Goal
Detect Brute Force Attacks

### Strategy
Leverage GuardDuty and detect when an attacker is performing a brute force attack. The following are GuardDuty findings trigger this signal:

* [UnauthorizedAccess:EC2/SSHBruteForce][1]
* [UnauthorizedAccess:EC2/RDPBruteForce][2]


### Triage & Response
1. Inspect the role of the EC2 instance in the attack. Find the role in the signal name - either `ACTOR` or `TARGET`.
   * If you are the `TARGET` and the instance is available on the internet, expect to see IPs scanning your systems.
   * If you are the `TARGET` and the instance is **not** available on the internet, this means a host on your internal network is scanning your EC2 instance. Open an investigation.
   * If you are the `ACTOR`, this means that your instance is performing brute force attacks on other systems. Open an investigation.

[1]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_unauthorized.html#unauthorized9
[2]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_unauthorized.html#unauthorized10
