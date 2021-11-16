---
aliases:
  - /fr/7hk-tff-0fv
  - /fr/security_monitoring/default_rules/7hk-tff-0fv
  - /fr/security_monitoring/default_rules/aws-iam-trustedpolicies
cloud: aws
disable_edit: true
integration_id: amazon-iam
kind: documentation
rule_category:
  - Cloud Configuration
scope: iam
security: conformité
source: iam
title: Le rôle IAM utilise des éléments Principal de confiance
type: security_rules
---
## Description

Définissez un élément Principal au sein de votre stratégie IAM Amazon.

## Raison

Une stratégie de confiance réduit les risques associés à l'élévation des privilèges. En définissant un élément Principal au sein de votre stratégie, vous limiterez les risques d'accès non autorisé à une ressource.

## Remédiation

### Console

Suivez les instructions [Modifier des stratégies IAM][1] pour découvrir comment accorder des autorisations à un utilisateur ou compte IAM spécifique.

### Interface de ligne de commande

Suivez les instructions [Modifier des stratégies gérées (AWS CLI)][2] pour découvrir comment accorder des autorisations à un utilisateur ou compte IAM à l'aide de l'interface de ligne de commande.

[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_manage-edit.html
[2]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_manage-edit.html#edit-policies-cli-api