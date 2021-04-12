---
aliases:
- kbp-pln-54a
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: elasticsearch
security: compliance
source: elasticsearch
title: Elasticsearch domain is not publicly accessible
type: security_rules
---

## Description

Update publicly accessible Amazon Elasticsearch domains to block unsigned requests.

## Rationale

Updating your Amazon Elasticsearch domain to a private domain ensures your data cannot be accessed or altered by unauthorized users.

## Remediation

### Console

Follow the [Configuring Access Policies][1] docs to learn how to update your publicly accessible Amazon Elasticsearch domains in the AWS Console.

### CLI

1. Create a new policy JSON document. You can follow the [Amazon Elasticsearch templated policy][2] to create a custom policy that grants domain access only to a specific IP.

    {{< code-block lang="bash" filename="ip-based-policy.json" >}}
    {
    ...
    "Statement": [
        ...
        "Action": "es:*",
        "Condition": {
            "IpAddress": {
            "aws:SourceIp": [
                "54.197.25.93/32"
            ]
            }
        },
        "Resource": "arn:aws:es:123456789123:
                    domain/es-cluster/*"
        }
    ]
    }
    {{< /code-block >}}

2. Run `update-elasticsearch-domain-config` using the name of the [Elasticsearch domain][3] created in the previous step.

    {{< code-block lang="bash" filename="ip-based-policy.json" >}}
    aws es update-elasticsearch-domain-config
        --domain-name es-cluster
        --access-policies file://ip-based-policy.json
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-createupdatedomains.html#es-createdomain-configure-access-policies
[2]: https://docs.aws.amazon.com/kms/latest/developerguide/determining-access-key-policy.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/es/update-elasticsearch-domain-config.html
