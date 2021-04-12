---
aliases:
- 5ee-d08-7fa
control: cis-3.3
disable_edit: true
framework: cis-aws
kind: documentation
rule_category:
- Log Detection
scope: amazon
security: compliance
source: cloudtrail
title: AWS root account activity
type: security_rules
---

### Goal
Detect AWS root user activity. 

### Strategy
Monitor CloudTrail and detect when any `@userIdentity.type` has a value of `Root`, but is not invoked by an AWS service.

### Triage & Response
1. Reach out to the user to determine if the login was legitimate. 
2. If the login wasn't legitimate, rotate the credentials, enable 2FA, and open an investigation. 

For best practices, check out the [AWS Root Account Best Practices][1] documentation.

[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html
