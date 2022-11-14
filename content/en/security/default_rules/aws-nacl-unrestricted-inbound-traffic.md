---
aliases:
- 01b-a6f-d0c
- /security_monitoring/default_rules/01b-a6f-d0c
- /security_monitoring/default_rules/aws-nacl-unrestricted-inbound-traffic
disable_edit: true
integration_id: vpc
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: vpc
title: Network ACL inbound traffic is restricted
type: security_rules
---

## Description

Investigate AWS Network Access Control Lists (NACLs) for rules that enable multiple open ports and limit ingress traffic access based on port range.

## Rationale

Eliminate the threat of unauthorized access malicious activities, such as Denial of Service (DoS) or Distributed Denial of Service (DDoS) attacks, by opening only the ports that are required by your application.

## Remediation

### From the console

Follow the [Adding and deleting rules][2] docs to limit ingress traffic access based on port range.

### From the command line

1. Run `replace-network-acl-entry` to create a rule that only allows ingress traffic from a specific port range.

    {{< code-block lang="bash" filename="replace-network-acl-entry.sh" >}}
    aws ec2 replace-network-acl-entry
        --network-acl-id id-01234567
        --ingress
        --rule-number 01
        --protocol tcp
        --port-range From=000,To=000
        --rule-action allow
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html#default-network-acl
[2]: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html#Rules
