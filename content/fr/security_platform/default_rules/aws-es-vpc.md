---
aliases:
  - /fr/3h4-mr3-76y
  - /fr/security_monitoring/default_rules/3h4-mr3-76y
  - /fr/security_monitoring/default_rules/aws-es-vpc
cloud: aws
disable_edit: true
integration_id: amazon-elasticsearch
kind: documentation
rule_category:
  - Cloud Configuration
scope: elasticsearch
security: conformité
source: elasticsearch
title: Le domaine Elasticsearch se trouve dans un VPC
type: security_rules
---
## Description

Assurez-vous que votre domaine Amazon Elasticsearch (ES) est uniquement accessible depuis un VPC AWS.

## Raison

L'utilisation d'un VPC offre à vos domaines Amazon ES une couche de sécurité supplémentaire. En déployant vos clusters au sein d'un VPC, vous aurez l'assurance que les communications entre vos clusters et les autres services AWS sont sécurisées.

## Remédiation

Une fois un domaine créé via un endpoint public, il ne peut pas être transféré vers un VPC. Consultez les instructions [Migrer d'un accès public à un accès par VPC][1] pour découvrir comment créer un nouveau domaine puis réindexer ou migrer vos données manuellement.

[1]: https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-vpc.html#es-migrating-public-to-vpc