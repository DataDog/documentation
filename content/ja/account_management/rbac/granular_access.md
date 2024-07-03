---
title: Granular Access Control
---
## Manage access to individual resources

Some resources allow you to restrict access to individual resources by roles, [Teams][1], or users.

Use the different principals to control access patterns in your organization and encourage knowledge sharing and collaboration:
- Teams を使用して、組織内の機能グループに対するアクセスをマッピングします。例えば、ダッシュボードの編集を、そのダッシュボードを所有するアプリケーション チームに制限します。
- Use roles to map access to personas. For example, restrict editing of payment methods to billing administrators.
- Allocate access to individual users only when necessary.


| Supported resources with granular access control | チームベースのアクセス | Role-based access | User / service account-based access |
|--------------------------------------------------|-------------------|-------------------|-------------------------------------|
| [ダッシュボード][2]                                  | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Monitors][3]                                    |                   | {{< X >}}         |                                     |
| [Notebooks][4]                                   | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Powerpacks][8]                                  | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Security rules][5]                              | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [サービスレベル目標][6]                    | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Synthetic tests][7]                             |                   | {{< X >}}         |                                     |

### 個々のリソースへのアクセスを昇格させる

`user_access_manage` 権限を持つユーザーは、チーム、ロール、ユーザーまたはサービスアカウントに基づく制限をサポートする個々のリソースへのアクセスを昇格させることができます。ロールベースのアクセス制限のみを持つリソースはサポートされていません。アクセス権を得るには、粒度の高いアクセス制御モーダルで **Elevate Access** ボタンをクリックします。

[1]: /ja/account_management/teams/
[2]: /ja/dashboards/configure/#permissions
[3]: /ja/monitors/notify/#permissions
[4]: /ja/notebooks/#limit-edit-access
[5]: /ja/security/detection_rules/#limit-edit-access
[6]: /ja/service_management/service_level_objectives/#permissions
[7]: /ja/synthetics/browser_tests/#permissions
[8]: /ja/dashboards/widgets/powerpack/#powerpack-permissions