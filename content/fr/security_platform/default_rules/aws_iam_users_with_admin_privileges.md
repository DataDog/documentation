---
aliases:
  - /fr/542-ddc-8ba
  - /fr/security_monitoring/default_rules/542-ddc-8ba
  - /fr/security_monitoring/default_rules/aws_iam_users_with_admin_privileges
cloud: aws
disable_edit: true
integration_id: amazon-iam
kind: documentation
rule_category:
  - Cloud Configuration
scope: iam
security: conformité
source: iam
title: Aucun utilisateur IAM privilégié ne dispose de droits administrateur sur votre compte AWS
type: security_rules
---
## Description

Confirmez qu'aucun [utilisateur Amazon IAM][1] (utilisateur privilégié) ne dispose de droits administrateur pour votre compte AWS.

## Raison

Un utilisateur IAM privilégié peut accéder à tous les services AWS et contrôler les ressources via la [stratégie IAM gérée AdministratorAccess][2]. Tout utilisateur disposant d'un accès administrateur alors qu'il ne devrait pas peut potentiellement, à son insu ou volontairement, provoquer des problèmes de sécurité ou des fuites de données.

## Remédiation

### Console

Suivez la documentation relative à la [suppression d'une stratégie d'autorisation pour un utilisateur][6] afin de révoquer les droits AdministratorAccess d'un utilisateur.

### Interface de ligne de commande

1. Exécutez `list-users` pour obtenir [la liste des utilisateurs IAM actuels][3].
2. Exécutez `list-user-policies` avec un `user-name` IAM pour obtenir les [stratégies associées aux utilisateurs][4].

    {{< code-block lang="bash" filename="list-attached-user-policies.sh" >}}
    aws iam list-user-policies --user-name Name
    {{< /code-block >}}

3. Exécutez `detach-user-policy` afin de [révoquer l’accès administrateur][5] de cet utilisateur.

    {{< code-block lang="bash" filename="list-attached-user-policies.sh" >}}
    aws iam detach-user-policy --user-name Bob --policy-arn arn:aws:iam::123456789012:policy/TesterPolicy
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html
[2]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_job-functions.html#jf_administrator
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/iam/list-users.html
[4]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/iam/list-user-policies.html#examples
[5]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/iam/detach-user-policy.html
[6]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_change-permissions.html#users_change_permissions-remove-policy-console