---
aliases:
- 2g5-b7o-dqd
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: acm
security: compliance
source: acm
title: ACM certificate is active
type: security_rules
---

## Description

Remove expired Secure Socket Layer/Transport Layer Security (SSL/TLS) certificates with AWS Certificate Manager (ACM).

## Rationale

Expired AWS ACM SSL/TLS certificates that are deployed to another resource are at risk of triggering front-end errors and compromising the credibility of a web application.

## Remediation

### Console

Follow the [Deleting Certificates Managed by ACM][1] docs to learn how to delete SSL/TLS certifications in the AWS Console.

### CLI

1. Run `delete-certificate` with the [certificate ARN][2].

    {{< code-block lang="bash" filename="delete-certificate.sh" >}}
    aws acm delete-certificate
        --certificate-arn arn:aws:acm:region:123456789012:certificate/12345678-1234-1234-1234-123456789012
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-delete.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/acm/delete-certificate.html
