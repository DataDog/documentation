---
aliases:
- a08-t3c-wbj
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: acm
security: compliance
source: acm
title: ACM certificate issue request is validated
type: security_rules
---

## Description

Validate all Secure Socket Layer/Transport Layer Security (SSL/TLS) certificates in Amazon Certificate Manager (ACM).

## Rationale

[Requests for AMC certificates time out if they are not not validated within 72 hours][1]. If a certificate is not validated, it can interrupt an application or service.

## Remediation

### Console

Follow the [Setting Up DNS Validation][2] or [Resending Validation Email][3] docs to validate a certificate in the AWS Console or by email.

### CLI

1. Run `resend-validation-email` using the ARN of the invalid certificate with your `domain` and `validation-domain`.

    {{< code-block lang="bash" filename="resend-validation-email.sh" >}}
    aws acm resend-validation-email
      --certificate-arn arn:aws:acm:us-east-1:1234567890:certificate/a1b2345c-d678-9123-4567-89ab12c2345d
      --domain www.example.com
      --validation-domain example.com
    {{< /code-block >}}

2. Click the link in the generated email to navigate to the Amazon Certificates Approvals page, and click the `I Approve` button.

[1]: https://docs.aws.amazon.com/acm/latest/userguide/troubleshooting-timed-out.html
[2]: https://docs.aws.amazon.com/acm/latest/userguide/dns-validation.html#setting-up-dns-validation
[3]: https://docs.aws.amazon.com/acm/latest/userguide/email-validation.html#gs-acm-resend
