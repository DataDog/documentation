---
aliases:
- mpg-nle-oki
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: acm
security: compliance
source: acm
title: ACM certificate expires in 30 days or less
type: security_rules
---

## Description

Renew your SSL/TLS certificate managed by AWS Certificate Manager (ACM) as there are 30 days left to renew.

## Rationale

Certificates that are not renewed prior to their expiration date become invalid. Invalid certificates make communication between the client and AWS resources insecure.

## Remediation

### Console

ACM automatically renews certificates (if you are using DNS validation) or sends an email notification when expiration is approaching. Follow the [Managed renewal for ACM certificates][1] docs for more information.

### CLI

1. Run `import-certificate` using the [ARN of the SSL/TLS certificate][2] that you want to renew. This will return the ARN of the renewed SSL/TLS certificate.

  {{< code-block lang="bash" filename="import-certificate.sh" >}}
    aws acm import-certificate
      --certificate-arn <value>
      --certificate <value>
      --private-key <value>
      --certificate-chain <value>
  {{< /code-block >}}

[1]: https://docs.aws.amazon.com/acm/latest/userguide/managed-renewal.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/acm/import-certificate.html
