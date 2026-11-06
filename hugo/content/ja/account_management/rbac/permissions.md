---
algolia:
  category: Documentation
  rank: 80
  subcategory: Datadog Role Permissions
aliases:
- /ja/account_management/faq/managing-global-role-permissions
description: Datadog の権限の完全なリファレンス。管理対象のロール、カスタムロール、機密性の高い権限、および権限リストなど。
disable_toc: true
further_reading:
- link: /account_management/rbac/
  tag: ドキュメント
  text: ロールの作成、更新、削除
- link: /api/v2/roles/#list-permissions
  tag: ドキュメント
  text: Permission API を使用してアクセス許可を管理する
title: Datadog ロールのアクセス許可
---
## 権限 {#permissions}

権限は、特定のリソースに対してユーザーが可能なアクセスの種類を定義します。多くの場合、権限は、ユーザーがオブジェクトに対して読み取り、編集、または削除の操作をする権利を付与します。権限は、3 つの管理対象のロールとカスタムロールを含むすべてのロールのアクセス権の基盤となります。

### 機密性の高い権限 {#sensitive-permissions}

Datadog の一部の権限は、以下のような注意すべきより高い特権の機能へのアクセスを提供します。

- 組織設定を変更するアクセス
- 潜在的に機密性の高いデータを読むアクセス
- 特権的な操作を実行するアクセス

機密性の高い権限は、ロールと権限のインターフェースにおいてフラグが立てられており、より厳重な監視が必要であることを示します。ベストプラクティスとして、ロールを設定する管理者はこれらの権限に特に注意を払い、これらの権限のどれが自分のロールやユーザーに割り当てられているかを確認する必要があります。

### プレビューモードの権限 {#preview-mode-permissions}

いくつかの権限は、完全に実施する前に「プレビューモード」になります。その期間には、次のようになります。

- プレビュー権限は、アプリ内で「プレビュー」バッジのマークが付けられます。
- プレビュー期間が終了するまでアクセスは制限されません。
- 通常、プレビュー期間は、実施開始前の 2 〜 4 週間です。
- 管理者はこの期間中にロールを適切に設定する必要があります。

プレビューモードにより組織の管理者には、特定の新しい権限をオプトインする機能が提供されます。これにより、かつて制限されていなかったリソースへのアクセスを失わないようにすることができます。各プレビューモード権限に関連するリリースノートに、権限が作成された時期と施行される時期が示されています。これらの権限では、プレビュー中のアクセスに制限はありませんが、Datadog では、中断を防ぐために実施の前にロール設定を更新することが推奨されています。

### 制限付き権限 {#restricted-permissions}

制限付き権限は Datadog のエクスペリエンスの主要部分をサポートしており、デフォルトですべてのロールに自動的に割り当てられます。これらのデフォルトの権限を削除すると、ユーザーが Datadog を操作する方法に影響を与える可能性があります。たとえば、ユーザーが自分のプロフィールを表示または編集できなかったり、標準的なプラットフォーム機能にアクセスできなかったりする場合があります。

以下の権限は、UI 上で直接削除できます。[Create Role][4] および [Update a Role][5] API を使用する際にそれらを除外するには、リクエスト本文に `default_permissions_opt_out: true` を設定してください。

| 権限 | 識別子 |
|---|---|
| ダッシュボードの読み取り | `dashboards_read` |
| Monitors Read | `monitors_read` |
| APM Read | `apm_read` |
| Incidents Read | `incident_read` |
| RUM Apps Read | `rum_apps_read` |
| Notebooks Read | `notebooks_read` |
| SLOs Read | `slos_read` |
| CI Visibility Read | `ci_visibility_read` |
| CD Visibility Read | `cd_visibility_read` |
| Vulnerability Management Read | `appsec_vm_read` |

制限付き権限なしでロールを作成するリクエストの例:

```sh
curl -X POST "https://api.datadoghq.com/api/v2/roles" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '{
  "data": {
    "attributes": {
      "name": "developers",
      "default_permissions_opt_out": true
    },
    "type": "roles"
  }
}'
```

以下の権限は、これまで長らくすべてのロールに暗黙的に割り当てられてきましたが、UI や API を通じて設定できるようには公開されていませんでした。これで、[Minimal Access Roles (プレビュー版)](#minimal-access-roles-preview) を有効にして、これらの権限を削除可能にし、`default_permissions_opt_out: true` が設定されている場合にデフォルトで除外できるようになりました。

| 権限 | 識別子 |
|---|---|
| Built-In Features | `built_in_features` |
| Metrics Read | `metrics_read` |
| Timeseries Query | `timeseries_query` |
| Events Read | `events_read` |
| Hosts Read | `hosts_read` |
| User Self Profile Read | `user_self_profile_read` |
| User Self Profile Write | `user_self_profile_write` |
| Static Analysis Settings Read | `static_analysis_settings_read` |
| Application Security Management Vulnerability Management Library Read | `appsec_vm_library_read` |

## ロール {#roles}

### 管理対象のロール {#managed-roles}

デフォルトでは、既存のユーザーは 3 つの管理対象ロールのいずれかに関連付けられています。

- Datadog 管理者ロール
- Datadog 標準ロール
- Datadog 読み取り専用ロール

これらのロールのいずれかを付与されたすべてのユーザーは、[個別に読み取り制限された][1] リソースを除き、それ以外のデータを読み取ることができます。管理者と標準ユーザーには、アセットに対する書き込み権限が付与されています。管理者ユーザーは、ユーザー管理、組織管理、請求、および使用に関連する機密アセットに対しての追加の読み取りおよび書き込み権限が付与されています。

管理対象のロールは、Datadog によって作成および維持されます。新機能が追加されたり、権限が変更されたりすると、Datadog によってそれらの権限が自動的に更新される場合があります。ユーザーが管理対象のロールを直接変更することはできませんが、それらのクローンを作成して、特定の権限を付与された[カスタムロール](#custom-roles)を作成することはできます。必要に応じてユーザーは、自分のアカウントから管理対象のロールを削除することができます。

### カスタムロール {#custom-roles}

権限を新しいロールに統合するには、カスタムロールを作成します。カスタムロールを使用すると、たとえば請求管理者となる人物を定義し、そのロールに適切な権限を割り当てることができます。ロールを作成した後、[Datadog でロールを更新][1] するか [Datadog Permission API][3] を使用して、このロールへアクセス許可を直接割り当てたり削除したりできます。また、ロールのページからそれらのロールを選択し、{{< ui >}}Add Permission{{< /ui >}} を押すことにより、複数のカスタムロールに一度に権限を追加することもできます。

管理対象のロールとは異なり、カスタムロールの場合は、(自動更新を受け取るように設定されているのでない限り)Datadog が新しい製品や機能をリリースした時点で新しい権限を受け取ることはありません。自動更新がオフの場合、Datadog が既存の機能を制限する新しい権限をリリースした時点で、カスタムロールは、互換性を維持するためにのみ新しい権限を受け取ります。

カスタムロールの自動更新を構成するには、次のようにします。

1. 組織設定ページに移動し、{{< ui >}}Roles{{< /ui >}} タブをクリックします。
2. 更新するロールをクリックし、{{< ui >}}Edit Role{{< /ui >}} をクリックします。
3. {{< ui >}}Automatically Receives Permissions{{< /ui >}} の下で、ドロップダウンからオプション (なし、Datadog 読み取り専用ロール、Datadog 標準ロール、または Datadog 管理者ロール) を選択します。

カスタムロールが自動更新を受け取るように構成されている場合、選択したロールテンプレートに対して新しい権限がリリースされるたびに、そのカスタムロールは新しい権限を受け取ります。すでにリリース済みの権限は追加されません。このロールから任意の権限を追加または削除したり、自動更新を受け取り続けたりすることができます。

**注**: 新しいカスタムロールをユーザーに追加する場合、そのユーザーに関連する管理対象の Datadog ロールを削除して、新しいロールの権限を厳密に適用してください。

### Minimal Access Roles (プレビュー版) {#minimal-access-roles-preview}

<div class="alert alert-info">Minimal Access Roles はプレビュー版です。アクセスをリクエストするには、Datadog の担当者にお問い合わせください。</div>

Minimal Access Roles を使用すると、組織は Datadog でユーザーが実行できる操作をより詳細に制御できるようになります。

デフォルトでは、すべてのロールに [制限付き権限](#restricted-permissions) の基本セットが含まれています。これらは Datadog 全体のコア機能をサポートしているため、削除することはできません。Minimal Access Roles を有効にすると、組織全体のカスタムロールからこれらの権限を削除できるようになります。Minimal Access Roles のみを持つユーザーは、特定の Datadog ページで機能が制限されたり、予期しないエラーが発生したりする可能性があります。

有効にすると、以下の権限が削除可能になり、専門的なワークフローのために制限付きロールを作成できるようになります。

| 権限 | 識別子 |
|---|---|
| Built-In Features | `built_in_features` |
| Metrics Read | `metrics_read` |
| Timeseries Query | `timeseries_query` |
| Events Read | `events_read` |
| Hosts Read | `hosts_read` |
| User Self Profile Read | `user_self_profile_read` |
| User Self Profile Write | `user_self_profile_write` |
| Static Analysis Settings Read | `static_analysis_settings_read` |
| Application Security Management Vulnerability Management Library Read | `appsec_vm_library_read` |

[Terraform ロールリソース][6]または直接の API 呼び出しで `default_permissions_opt_out` を使用している場合は、これらの追加権限を考慮するために自動化を更新してから、Minimal Access Roles を有効にしてください。

## 権限リスト {#permissions-list}

以下の表は、Datadog で利用可能なすべての権限の名前、説明、およびデフォルトロールの一覧です。各アセットタイプには、対応する読み取り権限と書き込み権限があります。

それぞれの管理対象のロールは、より権限の弱いロールの権限をすべて継承します。したがって、Datadog 標準ロールには、表の中で Datadog Read Only のところに記載されている権限すべてがデフォルトで付与されています。さらに、Datadog Admin Role には、Datadog 標準ロールと Datadog 読み取り専用ロールの両方の権限すべてが付与されています。

{{% permissions %}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Log Rehydration は Datadog, Inc. の商標です

[1]: /ja/account_management/rbac/granular_access
[2]: /ja/account_management/users/#edit-a-user-s-roles
[3]: /ja/api/latest/roles/#list-permissions
[4]: /ja/api/latest/roles/#create-role
[5]: /ja/api/latest/roles/#update-a-role
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/role