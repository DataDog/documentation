---
disable_toc: false
further_reading:
- link: logs/processing/pipelines
  tag: ドキュメント
  text: ログ処理パイプライン
products:
- icon: siem
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Workload Protection
  url: /security/workload_protection/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
title: Access Control
---
{{< product-availability >}}

## 概要 {#overview}

Datadog のアクセス管理システムはロールベースのアクセス制御を使用しており、Datadog リソースに対するユーザーのアクセスレベルを定義できます。ユーザーには、読み取り可能なデータや変更可能なアカウント管理アセットなど、アカウント管理の権限を定義するロールが割り当てられます。ロールに権限が付与されると、そのロールに関連付けられているすべてのユーザーがその権限を受け取ります。詳細については、[Account Management Access Control][1] のドキュメントを参照してください。

Datadog Security 製品では、[検出ルール](#restrict-access-to-detection-rules)、[抑制](#restrict-access-to-suppression-rules)、および[動的重大度ルール](#restrict-access-to-dynamic-severity-rules)に対して [きめ細かなアクセス制御][3] が利用可能であり、チーム、ロール、またはサービスアカウントごとにアクセスを制限できます。

セキュリティデータ自体へのアクセスを制限するには、[Data Access Control](#restrict-access-to-security-data) を使用します。

## 権限 {#permissions}

Security 製品の [権限リスト][2] を参照してください。

## 検出ルールへのアクセスを制限する {#restrict-access-to-detection-rules}

{{% security-products/detection-rules-granular-access %}}

## 抑制ルールへのアクセスを制限する {#restrict-access-to-suppression-rules}

{{% security-products/suppressions-granular-access %}}

## 動的重大度ルールへのアクセスを制限する {#restrict-access-to-dynamic-severity-rules}

{{% security-products/dynamic-severity-granular-access %}}

## セキュリティデータへのアクセスを制限する {#restrict-access-to-security-data}

[Data Access Control][4] を使用して、データ内のタグと属性に基づき、ユーザーが閲覧できるセキュリティデータを制限します。クエリを使って [Restricted Dataset][8] を定義してから、特定のチームまたはロールにアクセス権を付与します。Restricted Dataset を作成する際には、3 つのセキュリティオプションを利用できます。

- **セキュリティシグナル**: Cloud SIEM および Workload Protection のシグナル
- **Workload Protection の Agent イベント**
- **セキュリティ所見** (プレビュー版、リクエストに応じて利用可能): Cloud Security、Code Security、Workload Protection、および App and API Protection の検出結果

どの Restricted Dataset にも含まれていないセキュリティデータは、[Restricted][5] としてマークしない限り、適切な権限を持つすべてのユーザーに表示されます。

### チームの所有権による検出結果の制限 {#restrict-findings-by-team-ownership}

{{< callout btn_hidden="true" >}}
所有権ベースの Access Control はプレビュー版であり、リクエストに応じて利用可能です。
{{< /callout >}}

所有権ベースの Access Control は、チームメンバーシップに基づいてセキュリティ所見へのアクセスを制限するもので、Restricted Dataset よりも設定が簡単です。各ユーザーは、検出結果のグループごとに個別のデータセットを必要とすることなく、自身が所属する [チーム][6] が所有する検出結果を表示できます。

所有権ベースの Access Control は、Cloud Security、Code Security、Workload Protection、および App and API Protection の検出結果を対象とするセキュリティ所見で利用可能です。Datadog は、`team` タグから所有権を判断します。このタグがない検出結果は、[無制限のアクセス権][7] を持つチームおよびロールのみが閲覧できます。

[1]: /ja/account_management/rbac/#role-based-access-control
[2]: /ja/account_management/rbac/permissions/#cloud-security-platform
[3]: /ja/account_management/rbac/granular_access/
[4]: /ja/account_management/rbac/data_access/
[5]: /ja/account_management/rbac/data_access/#strict-mode
[6]: /ja/account_management/teams/
[7]: /ja/account_management/rbac/data_access/#unrestricted-user-groups
[8]: /ja/account_management/rbac/data_access/#configure-data-access