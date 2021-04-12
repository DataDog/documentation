---
aliases:
- 3b4-283-756
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: vpc
security: compliance
source: vpc
title: Network ACL outbound traffic is restricted
type: security_rules
---

## Description

Investigate AWS Network Access Control Lists (NACLs) for rules that utilize multiple ports and limit outbound traffic access to a specific port range.

## Rationale

Eliminate the threat of unauthorized access by setting a specified port range.

## Remediation

### Console

Follow the [Adding and deleting rules][1] docs to limit ingress traffic access based on port range.

### CLI

1. Run `replace-network-acl-entry` to create a rule that sets a specific port range for egress traffic.

    {{< code-block lang="bash" filename="replace-network-acl-entry.sh" >}}
    aws ec2 replace-network-acl-entry
        --network-acl-id id-01234567
        --egress
        --rule-number 02
        --protocol tcp
        --port-range From=000,To=000
        --rule-action allow
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html#Rules
