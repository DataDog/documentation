---
aliases:
  - /fr/fu0-rtv-2rb
  - /fr/security_monitoring/default_rules/fu0-rtv-2rb
  - /fr/security_monitoring/default_rules/aws-rds-public
cloud: aws
disable_edit: true
integration_id: amazon-rds
kind: documentation
rule_category:
  - Cloud Configuration
scope: rds
security: conformité
source: rds
title: L'instance RDS n'est pas accessible au public
type: security_rules
---
## Description

Sécurisez votre instance RDS afin qu'elle ne soit pas accessible au public.

## Raison

L'absence de restrictions d'accès à votre instance RDS permet à tout le monde sur Internet d'établir une connexion avec votre base de données, vous exposant ainsi à un risque d'attaque par brute force, DoS/DDoS ou injection SQL.

## Remédiation

### Console

Suivez les instructions [Modifier une instance de base de données Amazon RDS (Console)][2] pour découvrir comment modifier votre instance RDS depuis la console AWS.

### Interface de ligne de commande

Suivez les instructions [Modifier une instance de base de données Amazon RDS (AWS CLI)][2] pour découvrir comment modifier les paramètres de connexion à votre instance RDS.

[1]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.DBInstance.Modifying.html
[2]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.DBInstance.Modifying.html