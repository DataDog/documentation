---
aliases:
  - /fr/542-ddc-8ba
cloud: aws
disable_edit: true
kind: documentation
rule_category:
  - Configuration du cloud
scope: iam
security: compliance
source: iam
title: Utilisateurs AWS IAM avec privilèges administrateur
type: security_rules
---
## Présentation

### Description

Confirmez qu'aucun [utilisateur Amazon IAM][1] (utilisateur privilégié) ne dispose de droits administrateur pour votre compte AWS.

### Meilleure pratique

Un utilisateur IAM privilégié peut accéder à tous les services AWS et contrôler les ressources via la [stratégie IAM gérée AdministratorAccess][2]. Tout utilisateur disposant d'un accès administrateur alors qu'il ne devrait pas peut potentiellement, à son insu ou volontairement, provoquer des problèmes de sécurité ou des fuites de données.

### Remédiation

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