---
aliases:
- 62v-0kq-n6b
- /security_monitoring/default_rules/62v-0kq-n6b
- /security_monitoring/default_rules/aws-es-encryption
disable_edit: true
integration_id: elasticsearch
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: elasticsearch
title: Elasticsearch domains are encrypted
type: security_rules
---

## Description

Implement at-rest encryption for your Amazon Elasticsearch (ES) domain with the AWS KMS service.

## Rationale

Implementing encryption at-rest protects your domain from unauthorized access and ensures security and compliance requirements are met.

## Remediation

### From the console

Follow the [Enabling Encryption of Data at Rest][1] docs to learn how to implement encryption for your domain.

### From the command line

1. Run `describe-elasticsearch-domain` with your ES domain to return configuration metadata.

    {{< code-block lang="bash" filename="describe-elasticsearch-domain.sh" >}}
    aws es describe-elasticsearch-domain
        --domain-name your-es-domain
    {{< /code-block >}}

2. Run `create-elasticsearch-domain` with your domain name and `encryption-at-rest-options`. Use the metadata returned in the previous step to [create and relaunch your ES domain to enable at-rest encryption][3].

    {{< code-block lang="bash" filename="create-elasticsearch-domain.sh" >}}
    aws es create-elasticsearch-domain
        --domain-name your-es-domain
        ...
        --encryption-at-rest-options Enabled=true,KmsKeyId="abcdabcd-aaaa-bbbb-cccc-abcdabcdabcd"
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/encryption-at-rest.html#enabling-ear
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/es/describe-elasticsearch-domain.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/es/create-elasticsearch-domain.html
