---
title: Logs RBAC の設定方法
aliases:
  - /ja/logs/guide/restrict-access-to-log-events-with-restriction-queries
kind: ガイド
further_reading:
  - link: /logs/explorer/
    tag: Documentation
    text: ログエクスプローラーの詳細
  - link: '/logs/explorer/#patterns'
    tag: Documentation
    text: ログパターンビューの概要
  - link: /logs/live_tail/
    tag: Documentation
    text: Live Tail のご紹介
  - link: /logs/logs_to_metrics/
    tag: Documentation
    text: 収集されたログからメトリクスを生成する方法
---
## 概要

ログには、[スクラブ][1]されるか組織内の権限のあるユーザーのみがアクセスできる**機密データ**が含まれている場合があります。また、コンフィギュレーションと予算管理に関する限り、ユーザーが**互いに干渉しない**ようにユーザーをセグメント化することもできます。

このガイドでは、ユーザーが準拠した方法でログとログ機能にアクセスするための、カスタマイズされた Datadog ロールを開発する方法を紹介します。

<div class="alert alert-warning">
カスタムロールの作成と変更は、オプトイン機能です。ご使用のアカウントでこの機能を有効にしたい場合は、<a href="/help">Datadog のサポートチームにお問い合わせください</a>。
</div>

### "ACME" チーム

組織が複数のチームで構成されていると想定します。その 1 つが **ACME** (Applicative Component Making Errors) チームで、そのメンバーはトラブルシューティングと監査の目的で ACME Logs を処理します。

このガイドでは、ACME チームに次の 2 つのカテゴリのユーザーがいることも前提としています。

* **`ACME Admin`**: ACME ログ収集、パイプライン、除外フィルターを担当するユーザーのロール。
* **`ACME User`** : ユーザーが ACME ログにアクセスし、このログからモニターまたはダッシュボードを作成するためのロール。

**注**: このガイドは、シンプル化のために 1 つの ACME ロール (ACME 管理者と ACME ユーザーの両方からのアクセス許可を集中させる) に適合させることも、より詳細なアクセス許可のためにより多くのロールに適合させることもできます。

このガイドは ACME チームに焦点を当てていますが、セットアップは組織内の他のすべてのチームに複製できます。ACME チームのメンバーは、組織全体の他のチームのメンバーになることも**可能**です。Datadog ではアクセス許可は付加的であり、マルチチームユーザーは、所属先のすべてのチームから継承されたアクセス許可の結合から利益を得ることができます。

### Datadog 管理者のロール

このガイドでは、Datadog 管理者が ACME チームメンバーが (他のチームログに干渉することなく) ログを操作するための安全なプレイグラウンドをセットアップし、これらのログへのアクセスを ACME ユーザーのみに制限する方法について説明します。

**注**: このガイドを適応させて、ACME 管理者が Datadog 管理者でもあると見なすことができます。

このガイドでは、以下について説明します。

1. 管理者の[前提条件](#prerequisites)。
2. ACME チームの**ロールの設定**と**メンバーの割り当て**: [ロールを設定する](#set-up-roles)。
3. 制限クエリを使用した、Datadog アプリケーション全体の**ログへのアクセスの制限**: [ログへのアクセスを制限する](#restrict-access-to-logs)。
4. **ログアセット** (つまり、パイプライン、インデックス、アーカイブ) のアクセス許可の構成: [ログアセットへのアクセスを制限する](#restrict-access-to-log-assets)。

## 前提条件

### 受信ログにタグを付ける

ACME の受信ログに `team:acme` タグを付けます。これは、ログが Datadog を通過するときにログをトリアージするのに役立ちます。

{{< img src="logs/guide/rbac/team_tag.png" alt="ログにチームタグを適用する"  style="width:60%;">}}

たとえば、Docker ログコレクションのコンテキストでは、[タグとしての Docker ラベル][2]を持つそのコンテナから流れるログに `team:acme` タグをアタッチします。より一般的な概要については、[タグ付けセクション][3]を参照してください。

### Datadog 管理者としてログインする

そのガイドで実行する必要のあるアクションでは、Datadog 管理者ロールに属している必要があります。具体的には、次のものが必要です。

* ロールを作成し、ユーザーをロールに割り当てるためのアクセス許可 (実際の特権アクセス)。
* [ログパイプライン][4]、[ログインデックス][5]、[ログアーカイブ][6]を作成するためのアクセス許可。
* API を介してこれらのオペレーションを実行する場合は、[ログコンフィギュレーション API][7] を介して操作するためのアクセス許可。

[Datadog][8] にこれらすべてのアクセス許可があることを確認してください。不足しているものがある場合は、Datadog 管理者ユーザーに設定を依頼してください。

{{< img src="logs/guide/rbac/admin_permissions.png" alt="管理者としてのアクセス許可を確認"  style="width:60%;">}}

### API キーとアプリキーを取得する

**注**: このセクションは、管理者ユーザーからの API キーとアプリケーションキーが必要な Datadog API を使用する場合にのみ必要です。

API キーとアプリキーは、[Datadog アカウント API キーページ][9]で入手できます。詳細については、ドキュメントの [API キーとアプリキー][10]セクションをご覧ください。

使用するアプリキーが、自分のユーザーまたは同様のアクセス許可を持つユーザーにアタッチされていることを確認してください。

{{< img src="logs/guide/rbac/app-api_keys.png" alt="API キーとアプリキーを確認"  style="width:60%;">}}

このガイドをとおして、`<DATADOG_API_KEY>` および `<DATADOG_APP_KEY>` はそれぞれご使用中の Datadog API キーおよび Datadog アプリケーションキーに置き換えて進めてください。このガイドでは、`CURL` を備えた端末があることも前提としています。


### アクセス許可 ID を取得する

**注**: このセクションは、Datadog API を使用して RBAC をセットアップする場合にのみ必要です。

[Permissions API][11] を使用して、既存のすべてのアクセス許可のリストを取得します。答えは、次のような一連のアクセス許可です (`logs_read_data` アクセス許可には `<PERMISSION_ID>` `1af86ce4-7823-11ea-93dc-d7cad1b1c6cb` があり、そのアクセス許可について知っておく必要があるのはこれだけです)。

```bash
curl -X GET "https://app.datadoghq.com/api/v2/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>"
```

```json
[...]
{
    "type": "permissions",
    "id": "1af86ce4-7823-11ea-93dc-d7cad1b1c6cb",
    "attributes": {
        "name": "logs_read_data",
        "display_name": "Logs Read Data",
        [...]
    }
}
[...]
```

**注**: アクセス許可 ID は、使用している Datadog サイト (Datadog US、Datadog EU など) によって異なります。

## ロールを設定する
このセクションでは、`ACME Admin` と `ACME User` の 2 つのロールを作成する方法、両方のロールに最小限のログアクセス許可を付与する方法 (このガイドの後半で拡張)、ユーザーにどちらかのロールを割り当てる方法について説明します。

### ロールを作成

{{< tabs >}}
{{% tab "UI" %}}

Datadog の [Team Section][1] で、Role タブの Add Role ボタンを使用して、新しい `ACME Admin` と `ACME User` のロールを作成します。

{{< img src="logs/guide/rbac/add_role.png" alt="新しいロールを追加する"  style="width:60%;">}}

新しいロールを作成する場合

* 標準アクセスで作成します。
* Read Index Data と Live Tail のアクセス許可を付与します。これらは、安全に有効にできる[レガシーアクセス許可][2]です。

{{< img src="logs/guide/rbac/minimal_permissions.png" alt="最小限のアクセス許可を付与する"  style="width:60%;">}}

ロールの作成の詳細については、[アカウントの管理][3]セクションを参照してください。


[1]: https://app.datadoghq.com/access/roles
[2]: /ja/account_management/rbac/permissions?tab=ui#legacy-permissions
[3]: /ja/account_management/rbac/?tab=datadogapplication#create-a-custom-role
{{% /tab %}}
{{% tab "API" %}}

`ACME Admin` と `ACME User` のロールについて、次の手順を繰り返します。

1. ロールがまだ存在しない場合は、[Role Creation API][1] でロールを作成します。次の例では、`dcf7c550-99cb-11ea-93e6-376cebac897c` がロール ID です。

```bash
curl -X POST "https://app.datadoghq.com/api/v2/roles" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type": "roles","attributes": {"name": "ACME Admin"}}}'
```

``` json
[...]
"type": "roles",
"id": "dcf7c550-99cb-11ea-93e6-376cebac897c",
"attributes": { "name": "ACME Admin", [...] }
[...]
```

2. **または**、ロールがすでに存在する場合は、[Role List API][2] を使用してそのロール ID を取得します。

``` bash
curl -X GET "https://app.datadoghq.com/api/v2/roles?page[size]=10&page[number]=0&sort=name&filter=ACME" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>"'
```

``` json
[...]
"type": "roles",
"id": "dcf7c550-99cb-11ea-93e6-376cebac897c",
"attributes": { "name": "ACME Admin", [...] }
[...]
```

3. ロールの既存のアクセス許可を確認します (新しく作成されたロールの Read Monitors と Read Dashboards のみが必要です)。

``` bash
curl -X GET "https://app.datadoghq.com/api/v2/roles/<ROLE_ID>/permissions" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>"

```

3. [Grant Permissions API][3] を使用して、`standard`、`logs_read_index_data`、`logs_live_tail` アクセス許可をロールに割り当てます。対応する ID を取得するには、[アクセス許可 ID を取得する](#get-permission-ids)セクションを参照してください。

``` bash
curl -X POST "https://app.datadoghq.com/api/v2/roles/<ROLE_ID>/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type":"permissions","id": "<PERMISSION_ID>"}}'

```

4. **必要に応じて**、[Revoke Permissions API][4] を使用して他のすべてのログアクセス許可を取り消します。

``` bash
curl -X DELETE "https://app.datadoghq.com/api/v2/roles/<ROLE_ID>/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type":"permissions","id": "<PERMISSION_ID>"}}'

```


[1]: /ja/api/v2/roles/#create-role
[2]: /ja/api/v2/roles/#list-roles
[3]: /ja/api/v2/roles/#grant-permission-to-a-role
[4]: /ja/api/v2/roles/#revoke-permission
{{% /tab %}}
{{< /tabs >}}


### ユーザーをロールにアタッチする

ロールがアクセス許可で構成されたので、これらのロールをユーザーに割り当てます。

{{< tabs >}}
{{% tab "UI" %}}

Datadog の [Team Section][1] で、User タブに移動します。ユーザーを選択し、すでに割り当てられている可能性のあるロールに加えて、`ACME Admin` または `ACME User` のロールを割り当てます。ユーザー管理の詳細については、[アカウントの管理][2]セクションをご覧ください。

{{< img src="logs/guide/rbac/assign_user.png" alt="グリッドビューで招待を削除"  style="width:60%;">}}
{{< img src="logs/guide/rbac/assign_user2.png" alt="グリッドビューで招待を削除"  style="width:60%;">}}


[1]: https://app.datadoghq.com/access/users
[2]: /ja/account_management/users/
{{% /tab %}}
{{% tab "API" %}}

[List Users API][1] を使用して、`ACME Admin` または `ACME User` ロールのいずれかに割り当てるユーザーのユーザー ID を取得します。この API はページ区切りされているため、たとえば、ユーザーの姓をクエリパラメーターとして使用して、結果をフィルタリングする必要がある場合があります。次の例では、ユーザー ID は `1581e993-eba0-11e9-a77a-7b9b056a262c` です。

``` bash
curl -X GET "https://api.datadoghq.com/api/v2/users?page[size]=10&page[number]=0&sort=name&filter=smith" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>"
```

``` json
[...]
"type": "users",
"id": "1581e993-eba0-11e9-a77a-7b9b056a262c",
"attributes": {
    "name": "John Smith",
    "handle": "john.smith@company.com",
    [...]
},
[...]
```

**ユーザーを ACME ロールにアタッチする**

ユーザーごとに、[Assign Role API][2] を使用して、これをこのロールに追加します。

``` bash
curl -X POST "https://api.datadoghq.com/api/v2/roles/<ROLE_ID>/users" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type":"users","id":"<USER_ID>"}}'
```

**デフォルトのロールからユーザーを削除する**

ユーザーがすでにロールとその ID を持っているかどうかを確認します。これらのユーザーからデフォルトの Datadog ロールを削除したい場合があります。これは、付与したくないユーザーに追加のアクセス許可を付与する可能性があるためです。

``` bash
curl -X DELETE "https://api.datadoghq.com/api/v2/roles/<ROLE_ID>/users" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type":"users","id":"<USER_ID>"}}'
```



[1]: /ja/api/v2/users/#list-all-users
[2]: /ja/api/v2/roles/#add-a-user-to-a-role
{{% /tab %}}
{{< /tabs >}}


## ログへのアクセスを制限する

このセクションでは、ACME チームメンバー (`ACME Admin` と `ACME User` の両方のメンバー) に `team:acme` ログへのアクセスを付与する (`team:acme` ログのみ) 方法について説明します。制限クエリでスコープされた [Log Read Data][12] アクセス許可を使用します。

粒度を最大限に高め、メンテナンスを容易にするために推奨されるのは、アクセスできるログを増やすために ACME ユーザーのアクセスを拡張**しない**ことです。他のロールを同じ `team:acme` 制限クエリに制限するよりも、各ユーザーが個別にアクセスする必要があるものに基づいて、ユーザーを複数のロールに割り当てることを検討してください。

このセクションでは、次の方法について詳しく説明します。

1. `team:acme` 制限クエリを作成する。
2. その制限クエリを ACME ロールにアタッチする。

**注**: ロールには、制限クエリを **1 つだけ**アタッチできます。制限クエリをロールにアタッチすると、このロールにすでにアタッチされている制限クエリがすべて削除されます。


{{< tabs >}}
{{% tab "UI" %}}

Datadog アプリで [Data Access ページ][1]を使用して、以下を実行します。

* `team:acme` 制限クエリを作成する。
* `ACME Admin` および `ACME User` ロールを制限クエリに割り当てます。

{{< img src="logs/guide/rbac/restriction_queries.png" alt="ログへのアクセスを制限"  style="width:60%;">}}

詳細については、[`logs_read_data` アクセス許可セクション][1]を参照してください。

[1]: /ja/account_management/rbac/permissions?tab=ui#logs_read_data
{{% /tab %}}
{{% tab "API" %}}

[Create Restriction Query API][1] を使用して、新しい制限クエリを作成します。制限クエリ ID (次の例では `76b2c0e6-98fa-11ea-93e6-775bd9258d59`) を追跡します。

``` bash
curl -X POST "https://app.datadoghq.com/api/v2/logs/config/restriction_queries" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type": "logs_restriction_queries","attributes": {"restriction_query": "team:acme"}}}'
```

``` json
{
    "data": {
        "type": "logs_restriction_queries",
        "id": "76b2c0e6-98fa-11ea-93e6-775bd9258d59",
        "attributes": {
            "restriction_query": "team:acme",
            "created_at": "2020-05-18T11:26:48.887750+00:00",
            "modified_at": "2020-05-18T11:26:48.887750+00:00"
        }
    }
}

```

次に、[Restriction Query API][2] を使用して、前の制限クエリを ACME ロールにアタッチします。`ACME Admin` および `ACME User` ロール ID を使用してこの操作を繰り返します。

``` bash
curl -X POST "https://app.datadoghq.com/api/v2/logs/config/restriction_queries/<RESTRICTION_QUERY_ID>/roles" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type": "roles","id": "<ROLE_ID>"}}'
```

最後に、[Grant Permissions API][3] を使用してロールの `logs_read_data` アクセス許可を有効にします。[アクセス許可 ID を取得する](#get-permission-ids)セクションを参照して、このアクセス許可に対応する ID を取得してください。

``` bash
curl -X POST "https://app.datadoghq.com/api/v2/roles/<ROLE_ID>/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type":"permissions","id": "<PERMISSION_ID>"}}'

```

オプションで、セットアップが適切に行われていることを確認します。

* [Get Roles API][4] を使用して、クエリにアタッチされているロールのリストを取得します。結果には `ACME Admin` と `ACME User` のみが表示されます。
* 逆に、[Get Limitation Query API][5] を使用して、いずれかのロールに制限クエリをアタッチします。`team:acme` 制限クエリが表示されます。


[1]: /ja/api/v2/logs-restriction-queries/#create-a-restriction-query
[2]: /ja/api/v2/logs-restriction-queries/#grant-role-to-a-restriction-query
[3]: /ja/api/v2/roles/#grant-permission-to-a-role
[4]: /ja/api/v2/logs-restriction-queries/#list-roles-for-a-restriction-query
[5]: /ja/api/v2/logs-restriction-queries/#get-restriction-query-for-a-given-role
{{% /tab %}}
{{< /tabs >}}


## ログアセットへのアクセスを制限する

このセクションでは、`ACME Admin` ロールメンバーに ACME ログアセット (つまり、ログパイプライン、ログインデックス、ログアーカイブ) を操作するためのアクセス許可を付与する方法について詳しく説明します。

これにより、次のことが保証されます。

* `ACME Admin` メンバー (`ACME Admin` メンバーのみ) が、ACME ログアセットを操作できる。
* `ACME Admin` と `ACME User` のどちらのメンバーも、他のチームのアセットに干渉できない。
* `ACME Admin` と `ACME User` のどちらのメンバーも、どのログがアセットに流れ込むか、予算制限、[ログアクセス制限ルール](#restrict-access-to-logs)などの上位レベルの「管理者」コンフィギュレーションに干渉できない。


粒度を最大限に高め、メンテナンスを容易にするために推奨されるのは、ACME ログアセットを編集するアクセス許可を他のロールに付与**しない**ことです。代わりに、(一部の) ユーザーを対象の他のロールから `ACME Admin` ロールにも追加することを検討してください。

### ログパイプライン

`team:acme` ログ用に 1 つの[パイプライン][13]を作成します。[Write Processor][14] アクセス許可を `ACME Admin` のメンバーに割り当てますが、そのアクセス許可をこの ACME「ルート」パイプラインに**スコープ**します。

{{< img src="logs/guide/rbac/pipelines.png" alt="ACME パイプライン"  style="width:60%;">}}

### ログインデックス

`team:acme` ログ用に 1 つまたは複数の[インデックス][15]を作成します。ACME チームがきめ細かい予算管理を必要とする場合、複数のインデックスが役立つ場合があります (たとえば、保持が異なるインデックス、またはクオータが異なるインデックス)。[Write Exclusion Filters][16] アクセス許可を `ACME Admin` のメンバーに割り当てますが、そのアクセス許可をこれらの ACME インデックスに**スコープ**します。

{{< img src="logs/guide/rbac/indexes.png" alt="ACME インデックス"  style="width:60%;">}}

### ログアーカイブ

#### アーカイブを読み取る

`team:acme` ログ用に 1 つまたは複数の[アーカイブ][17]を作成します。[Read Archives][18] アクセス許可を `ACME Admin` のメンバーに割り当てますが、その ACME アーカイブに**スコープ**します。

{{< img src="logs/guide/rbac/archives.png" alt="ACME アーカイブ"  style="width:60%;">}}

ログに応じてライフサイクルポリシーが異なる場合、複数のアーカイブが役立つ場合があります (たとえば、本番ログとステージングログ)。一度に複数のアーカイブで複数のリハイドレートをトリガーできますが、リハイドレートは一度に 1 つのアーカイブに対してのみ機能することを目的としていることに注意してください。

#### 履歴ビューを書き込む

`ACME Admin` のメンバーに [Write Historical View][19] アクセス許可を割り当てます。このアクセス許可は、リハイドレートを実行する能力を付与します。

**オプションで**、ログアーカイブを設定して、そのアーカイブからリハイドレートされたすべてのログに、アーカイブにタグがあるかどうかに関係なく、最終的に `team:acme` タグが付けられるようにします。[このオプション][20]を使用すると、既存の制限ポリシーとの整合性を確保できるだけでなく、Datadog に流れないログや Datadog でインデックス付けされていないログに対応する非推奨の制限を安全に削除できます。

{{< img src="logs/guide/rbac/archives.png" alt="リハイドレートの ACME タグ"  style="width:60%;">}}

**注**: [Legacy Read Index Data Permission][21] を使用する**場合**、`ACME Admin` ロールと一緒に `ACME User` ロールを ACME アーカイブに追加してください。`ACME User` ロールメンバーにはリハイドレートを実行するアクセス許可がないため、これによって機密性の高いアクセス許可が付与されることはありません。ただし、これにより、Read Index Data アクセス許可が結果の履歴ビューに自動的にスコープされるため、コンテンツにアクセスできます。

{{< img src="logs/guide/rbac/rehydration_index.png" alt="リハイドレートインデックスアクセス許可"  style="width:60%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/logs/advanced_log_collection/?tab=configurationfile#scrub-sensitive-data-from-your-logs
[2]: /ja/agent/docker/tag/?tab=containerizedagent#extract-labels-as-tags
[3]: /ja/getting_started/tagging/
[4]: /ja/account_management/rbac/permissions?tab=ui#logs_write_pipelines
[5]: /ja/account_management/rbac/permissions?tab=ui#logs_modify_indexes
[6]: /ja/account_management/rbac/permissions?tab=ui#logs_write_archives
[7]: /ja/account_management/rbac/permissions?tab=ui#logs_public_config_api
[8]: https://app.datadoghq.com/access/users
[9]: https://app.datadoghq.com/account/settings#api
[10]: /ja/account_management/api-app-keys/
[11]: /ja/api/v2/roles/#list-permissions
[12]: /ja/account_management/rbac/permissions?tab=ui#logs_read_data
[13]: /ja/logs/processing/pipelines/
[14]: /ja/account_management/rbac/permissions?tab=ui#logs_write_processors
[15]: /ja/logs/indexes/
[16]: /ja/account_management/rbac/permissions?tab=ui#logs_write_exclusion_filters
[17]: /ja/logs/archives/
[18]: /ja/account_management/rbac/permissions?tab=ui#logs_read_archives
[19]: /ja/account_management/rbac/permissions?tab=ui#logs_write_historical_view
[20]: /ja/logs/archives#datadog-permissions
[21]: /ja/account_management/rbac/permissions?tab=ui#logs_read_index_data