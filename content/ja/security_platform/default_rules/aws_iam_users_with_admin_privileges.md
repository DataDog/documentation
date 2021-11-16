---
aliases:
  - /ja/542-ddc-8ba
  - /ja/security_monitoring/default_rules/542-ddc-8ba
  - /ja/security_monitoring/default_rules/aws_iam_users_with_admin_privileges
cloud: AWS
disable_edit: true
integration_id: amazon-iam
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: iam
security: コンプライアンス
source: iam
title: IAM 特権ユーザーには、AWS アカウントに対する管理者権限があります
type: security_rules
---
## 説明

AWS アカウントに、管理者権限を持つ [Amazon IAM ユーザー][1] (特権ユーザー) がいないことを確認します。

## 根拠

権限を持つ IAM ユーザーは、[AdministratorAccess IAM 管理ポリシー][2]を通じてすべての AWS サービスにアクセスしリソースをコントロールできます。アクセス権を持つべきではないにもかかわらず管理者アクセスを持つユーザーは、意図せずまたは意識的にセキュリティの問題またはデータ漏洩の原因になる恐れがあります。

## 修復

### コンソール

[ユーザーからアクセス許可ポリシーを削除][6]ドキュメントに従って、ユーザーの AdministratorAccess を取り消します。

### CLI

1. `list-users` を実行して[現在の IAM ユーザーリスト][3]を入手します。
2. `list-user-policies` を IAM `user-name` を使用して実行し、[ポリシーがアタッチされているユーザー][4]を見つけます。

    {{< code-block lang="bash" filename="list-attached-user-policies.sh" >}}
    aws iam list-user-policies --user-name Name
    {{< /code-block >}}

3. `detach-user-policy` を実行して、そのユーザーの[管理者アクセスを無効][5]にします。

    {{< code-block lang="bash" filename="list-attached-user-policies.sh" >}}
    aws iam detach-user-policy --user-name Bob --policy-arn arn:aws:iam::123456789012:policy/TesterPolicy
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html
[2]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_job-functions.html#jf_administrator
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/iam/list-users.html
[4]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/iam/list-user-policies.html#examples
[5]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/iam/detach-user-policy.html
[6]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_change-permissions.html#users_change_permissions-remove-policy-console