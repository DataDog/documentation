---
aliases:
  - /fr/9mb-dam-hg0
  - /fr/security_monitoring/default_rules/9mb-dam-hg0
  - /fr/security_monitoring/default_rules/aws-vpc-ipattached
cloud: aws
disable_edit: true
integration_id: amazon-vpc
kind: documentation
rule_category:
  - Cloud Configuration
scope: vpc
security: conformité
source: vpc
title: L'adresse IP est associée à un host ou une ENI
type: security_rules
---
## Description

Associez votre adresse Amazon Elastic IP (EIP) à une instance EC2 dans votre compte AWS.

## Raison

Les EIP qui ne sont pas associées à une instance EC2 en exécution ou à une Elastic Network Interface (ENI) [entraînent des frais horaires sur votre facture AWS][1].

## Remédiation

### Console

Suivez les instructions [Allouer une adresse IP Elastic depuis la console][2].

### Interface de ligne de commande

Suivez les instructions [Allouer une adresse IP Elastic depuis l'interface de ligne de commande AWS][2].

[1]: https://aws.amazon.com/premiumsupport/knowledge-center/elastic-ip-charges/
[2]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html#working-with-eips