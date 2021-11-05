---
aliases:
  - /fr/b48-4xm-roq
  - /fr/security_monitoring/default_rules/b48-4xm-roq
  - /fr/security_monitoring/default_rules/aws-es-version
cloud: aws
disable_edit: true
integration_id: amazon-elasticsearch
kind: documentation
rule_category:
  - Cloud Configuration
scope: elasticsearch
security: conformité
source: elasticsearch
title: Le cluster Elasticsearch utilise la dernière version du moteur
type: security_rules
---
## Description

Mettez à jour le moteur d'Amazon Elasticsearch (ES) vers la dernière version.

## Raison

Utilisez la dernière version d'Amazon ES pour bénéficier des corrections de bugs, des patchs de sécurité et des fonctionnalités les plus récents.

## Remédiation

### Console

Suivez les instructions [Mettre à niveau un domaine vers une version plus récente d'Elasticsearch (console)][1] pour découvrir comment réaliser la mise à jour depuis la console AWS.

### Interface de ligne de commande

Suivez les instructions [Mettre à niveau un domaine vers une version plus récente d'Elasticsearch (AWS CLI)][1] pour réaliser la mise à jour depuis l'interface de ligne de commande d'AWS.

[1]: https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-version-migration.html#starting-upgrades
[2]: https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-version-migration.html#starting-upgrades