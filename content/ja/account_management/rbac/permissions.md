---
title: Datadog ロールのアクセス許可
kind: ドキュメント
aliases:
  - /ja/account_management/faq/managing-global-role-permissions
further_reading:
  - link: /account_management/rbac/
    tag: ドキュメント
    text: ロールの作成、更新、削除
  - link: '/api/v2/roles/#list-permissions'
    tag: ドキュメント
    text: Permission API を使用してアクセス許可を管理する
---
ロールを作成すると、[Datadog アプリケーションでロールを更新][1]するか [Datadog Permission API][2] を使用して、このロールへアクセス許可を直接割り当てたり削除したりできます。利用可能なアクセス許可の一覧は次のとおりです。

## 概要

### 一般許可

一般許可は、各ロールのユーザーに対して基本的なアクセス権を許可するものです。[高度な許可](#advanced-permissions)は、一般許可に加えて付与される特定目的の許可を指します。

| 許可名称 | 説明                                                                                                                                                                                                                                                                                           |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 管理者           | 請求、使用方法、API キー、組織管理など、お使いの Datadog 組織の中で高度な許可によって制限されていないすべての機能を表示および編集することができます。次の「標準アクセス」で利用可能なすべての許可を含みます。 |
| 標準的な方法        | APM、イベント、その他アカウントの管理に関連しない機能など、お使いの Datadog 組織の中で高度な許可によって制限されていないコンポーネントを表示および編集することができます。                                                                    |

**注**: ロールに `admin` と `standard` アクセス許可の両方がないことにより定義されるため、`read-only` アクセス許可はありません。

### 高度な許可

デフォルトでは、既存のユーザーは、すぐに使用できる 3 つの Datadog 管理者、標準、または読み取り専用ロールのいずれかにすでに関連付けられているため、すべてのユーザーは全種類のデータを読み取るアクセス許可をすでに持ち、管理者または標準ユーザーはアセットの書き込みアクセス許可をすでに持っています。

**注**: ユーザーに新しいカスタムロールを追加する際、新しいロールのアクセス許可を適用するために、そのユーザーに関連付けられている既存の Datadog ロールを必ず削除してください。

一般的なアクセス許可の他に、特定のアセットやデータタイプに対しより粒度の高いアクセス許可を定義することもできます。アクセス許可は、グローバルにすることも要素のサブセットに範囲を絞ることもできます。オプションの詳細と利用可能なアクセス許可に対する影響に関しては、以下をご覧ください。

## アクセス管理

アクセス管理の許可一覧は以下をご覧ください。

| 名前                    | 説明                                                                               | Scopable |
| ----------------------- | ----------------------------------------------------------------------------------------- | -------- |
| `user_access_manage`         | ユーザーの無効化、ユーザーロールの管理、SAML とロールのマッピングを実行する権限を付与します。 | false    |
| `user_access_invite`         | 他のユーザーを組織に招待することをユーザーに許可します。                             | false    |

## API キーとアプリケーションキー

API キーとアプリケーションキーには、次のアクセス許可を使用できます。

| 名前                    | 説明                                                                                     | Scopable |
| ----------------------- | ----------------------------------------------------------------------------------------------- | -------- |
| `user_app_keys`         | ユーザーが所有するアプリケーションキーを作成、表示、管理する能力をユーザーに付与します。         | false    |
| `org_app_keys_read`     | 組織内のすべてのユーザーが所有するアプリケーションキーを一覧表示する能力をユーザーに付与します。       | false    |
| `org_app_keys_write`    | 組織内のすべてのユーザーが所有するアプリケーションキーを管理する能力をユーザーに付与します。     | false    |

## ダッシュボード

ダッシュボードアセットのアクセス許可一覧は以下をご覧ください。

| 名前                    | 説明                             | Scopable |
| ----------------------- | --------------------------------------- | -------- |
| `dashboards_read`         | ダッシュボードを表示する機能              | false    |
| `dashboards_write`        | ダッシュボードを作成および変更する機能 | false    |
| `dashboards_public_share` | ダッシュボードを外部と共有する機能  | false    |

## モニター

モニターアセットのアクセス許可一覧は以下をご覧ください。

| 名前              | 説明                                  | Scopable |
| ----------------- | -------------------------------------------- | -------- |
| `monitors_read`     | モニターを表示する機能                     | false    |
| `monitors_write`    | モニターを変更、ミュート、削除する機能 | false    |
| `monitors_downtime` | モニターのダウンタイムを設定する機能   | false    |

## セキュリティ監視

セキュリティモニタリングアセットのアクセス許可一覧は以下をご覧ください。

| 名前                             | 説明                                         | Scopable |
| -------------------------------- | --------------------------------------------------- | -------- |
| `security_monitoring_rules_read`   | 検出ルールを閲覧可能                     | false    |
| `security_monitoring_rules_write`  | 検出ルールを作成、編集、削除可能 | false    |
| `security_monitoring_signals_read` | セキュリティシグナルを閲覧可能                    | false    |

## ログ管理

以下のリストは、ログコンフィギュレーションアセットおよびログデータのアクセス許可と、この許可を与えるユーザーの一般的なカテゴリーです。チームメンバーへ許可を割り当てる方法（推奨）については、[ログ RBAC ガイド][3]をご参照ください。

| 名前                                                           | 説明                                | Scopable |  通常のユーザー |
| -------------------------------------------------------------- | ------------------------------------------ | -------- | ------------- |
| [`logs_read_data`](#logs_read_data)                            | ログデータへの読み取りアクセス                    | true     | 読み取り専用     |
| [`logs_modify_indexes`](#logs_modify_indexes)                  | ログインデックスの定義を更新可能       | false    | 管理者         |
| [`logs_write_facets`](#logs_write_facets)                      | ログファセットの作成、更新および削除       | false    | 標準的な方法      |
| [`logs_write_exclusion_filters`](#logs_write_exclusion_filters)| インデックス除外フィルターを更新する           | true     | 標準的な方法      |
| [`logs_write_pipelines`](#logs_write_pipelines)                | ログパイプラインを更新する                       | false    | 管理者         |
| [`logs_write_processors`](#logs_write_processors)              | パイプラインのログプロセッサを更新する    | true     | 標準的な方法      |
| [`logs_write_archives`](#logs_write_archives)                  | 外部アーカイブのコンフィギュレーションを更新可能 | false    | 管理者         |
| [`logs_read_archives`](#logs_read_archives)                    | アーカイブコンフィギュレーションの詳細を確認し、アーカイブからコンテンツにアクセスする | true     | 標準的な方法 |
| [`logs_write_historical_views`](#logs_write_historical_views)  | アーカイブからデータをリハイドレートする               | false    | 標準的な方法      |
| [`logs_public_config_api`](#logs_public_config_api)            | ログパブリック構成 API にアクセス可能（読み取り/書き込み）    | false    | 管理者         |
| [`logs_generate_metrics`](#logs_generate_metrics)              | メトリクス生成機能にアクセス可能        | false    | 標準的な方法      |


ログ管理 RBAC には、2 つのレガシーアクセス許可も含まれています。これは、よりきめ細かく、より広範な `logs_read_data` アクセス許可に置き換えられました。

| 名前                                              | 説明                                | Scopable |  通常のユーザー |
| ------------------------------------------------- | ------------------------------------------ | -------- | ------------- |
| [`logs_live_tail`](#logs_live_tail)               | Live Tail 機能にアクセス可能               | false    | 読み取り専用     |
| [`logs_read_index_data`](#logs_read_index_data)  | サブセットログデータの読み取り (インデックスベース)       | true     | 読み取り専用     |


{{< tabs >}}
{{% tab "UI" %}}

ロールを作成すると、[Datadog アプリケーションでロールを更新][1]して、このロールへアクセス許可を直接割り当てたり削除したりできます。

{{< img src="account_management/rbac/logs_permissions.png" alt="ログアクセス許可"  style="width:75%;" >}}


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

ロールを作成すると、[Datadog Permission API][1] を使用して、このロールへアクセス許可を直接割り当てたり削除したりできます。


[1]: /ja/api/v2/roles/
{{% /tab %}}
{{< /tabs >}}

アクセス許可に関する詳細は、以下をご覧ください。

### ログコンフィギュレーションアクセス

#### logs_generate_metrics

[Generate Metrics][4] 機能を使用する能力をロールに付与します。

このアクセス許可はグローバルで、これにより新しいメトリクスの作成と、既存のメトリクスの編集または削除の両方が可能になります。

#### logs_write_facets

ロールに [Create, Edit, and Delete facets][5] を使用する能力を付与します。

このアクセス許可はグローバルで、これにより新しいファセットの作成と、既存のメトリクスの編集または削除の両方が可能になります。

この許可は、[標準属性][6]の管理または[ファセットのエイリアス設定][7]に影響しません。

#### logs_modify_indexes

[ログインデックス][8]を作成および変更する能力をロールに付与します。これには以下が含まれます。

- インデックスにルーティングするログを指定するための[インデックスフィルター][9]を設定します。
- インデックスに対する[ログの保存期間][10]を設定します。
- 別のロールに、特定のインデックスを範囲とする[ログ読み取りインデックスデータ](#logs-read-index-data)および[ログ書き込み除外フィルター](#logs-write-exclusion-filters)アクセス許可を付与します。

このアクセス許可はグローバルで、これにより新しいインデックスの作成と、既存のインデックスの編集の両方が可能になります。

**注**: このアクセス許可は、バックグラウンドで[ログ読み取りインデックスデータ](#logs-read-index-data)および[ログ書き込み除外フィルター](#logs-write-exclusion-filters)アクセス許可も付与します。


#### logs_write_exclusion_filters

インデックス内で[除外フィルター][11]を作成または変更する能力をロールに付与します。

このアクセス許可は、グローバルに割り当てることも、インデックスのサブセットに制限することもできます。

**インデックスのサブセット**:

{{< tabs >}}
{{% tab "UI" %}}

1. ロールのグローバルなアクセス許可を削除。
2. インデックスを編集し、"Grant editing Exclusion Filters of this index to" フィールドにロールを追加することで、[Datadog アプリのインデックスページ][2]でロールにこのアクセス許可を付与できます（下のスクリーンショット）。

{{< img src="account_management/rbac/logs_write_exclusion_filters.png" alt="ログ書き込み除外フィルター"  style="width:75%;" >}}

{{% /tab %}}
{{% tab "API" %}}

このコンフィギュレーションは、UI を通じてのみサポートされます。

{{% /tab %}}
{{< /tabs >}}


#### logs_write_pipelines

[ログ処理パイプライン][12]を作成および変更する能力をロールに付与します。これには以下が含まれます。

- パイプラインの名前を設定する
- 処理パイプラインに入る必要があるログに[パイプラインフィルター][13]を設定する
- パイプラインを並べ替える
- 別のロールに、そのパイプラインを対象とした[ログ書き込みプロセッサ](#logs-write-processors)アクセス許可を付与します

**注**: このアクセス許可は、バックグラウンドで[ログ書き込みプロセッサ](#logs-write-processors) (すべてのパイプライン上のすべてのプロセッサに対して) アクセス許可も付与します。


#### logs_write_processors

プロセッサとネストされたパイプラインを作成、編集、または削除する能力をロールに付与します[12]。

このアクセス許可は、グローバルに割り当てることも、パイプラインのサブセットに制限することもできます。

{{< tabs >}}
{{% tab "UI" %}}

特定のパイプラインのモーダルでロールを割り当てます。

{{< img src="account_management/rbac/logs_write_processors.png" alt="ログ書き込みプロセッサ"  style="width:75%;" >}}

{{% /tab %}}
{{% tab "API" %}}

予備、

* 特定のパイプラインに割り当てるロールの[ロール ID を取得][1]します。
* 地域の `logs_write_processors` アクセス許可 API の[アクセス許可 ID を取得][2]します。
* このロールを割り当てるパイプラインの[パイプライン ID を取得][3]します。
* 以下の呼び出しで、そのロールにアクセス許可を付与します。

```sh
curl -X POST \
        https://app.datadoghq.com/api/v1/role/<ROLE_UUID>/permission/<PERMISSION_UUID> \
        -H "Content-Type: application/json" \
        -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
        -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
        -d '{
                "scope": {
                    "pipelines": [ "<PIPELINE-X_ID>", "<PIPELINE-Y_ID>"]
                }
            }'
```

[1]: /ja/api/v2/roles/#list-roles
[2]: /ja/api/v2/roles/#list-permissions
[3]: /ja/api/v1/logs-pipelines/#get-all-pipelines
{{% /tab %}}
{{< /tabs >}}

#### logs_write_archives

[ログアーカイブ][14]を作成、編集、または削除する能力を付与します。これには以下が含まれます。

- アーカイブにルーティングするログの[アーカイブフィルター][13]を設定する
- アーカイブの名前を設定する
- アーカイブを並べ替える
- [ログ読み取りアーカイブ](#logs-read-archives)アクセス許可をロールのサブセットに制限します。

このアクセス許可はグローバルで、これにより新しいアーカイブの作成と、既存のアーカイブの編集と削除が可能になります。

#### logs_read_archives

アーカイブコンフィギュレーションの詳細にアクセスする能力を付与します。 [ログ書き込み履歴ビュー](#logs-write-historical-view)と組み合わせて、このアクセス許可はアーカイブから[リハイドレート][15]をトリガーする能力も付与します。

このアクセス許可の対象はアーカイブのサブセットとなります。アクセス制限のないアーカイブは、`logs_read_archives` アクセス許可をもつロールに属するユーザー全員が閲覧できます。アクセスが制限されているアーカイブは、`logs_read_archives` が許可されているロールを除き、登録済みのロールのいずれかに属するユーザーのみしかアクセスできません。

以下の例では、`Guest` 以外のすべてのロールに `logs_read_archive` 許可が付与されていることを前提としています。

* Staging には `Guest` ロール**のみ**に属するユーザーを除くすべてのユーザーがアクセスできます。
* Prod には `Customer Support` に属するすべてのユーザーがアクセスできます。
* Security-Audit には、`Customer Support` に属するユーザーはアクセスできません。`Audit & Security` も同時に付与されている場合はアクセスが可能です。

{{< img src="account_management/rbac/logs_archives_list.png" alt="カスタムロールを作成"  style="width:90%;">}}

{{< tabs >}}
{{% tab "UI" %}}

アーカイブの作成に進むことも、アーカイブの編集中にいつでも更新することもできます。

{{< img src="account_management/rbac/logs_archive_restriction.png" alt="カスタムロールを作成"  style="width:90%;">}}

{{% /tab %}}
{{% tab "API" %}}

ログアーカイブ API を使用して、特定のアーカイブからロールを[割り当て][1]または[取り消し][2]します。


[1]: /ja/api/v2/logs-archives/#grant-role-to-an-archive
[2]: /ja/api/v2/logs-archives/#revoke-role-from-an-archive
{{% /tab %}}
{{< /tabs >}}

#### logs_write_historical_views

[Log Rehydration*][15] をトリガーすることを意味する、履歴ビューを書き込む能力を付与します。

このアクセス許可はグローバルです。 これにより、ユーザーは、[ログ読み取りアーカイブ](#logs_read_archives)アクセス許可を持つアーカイブのリハイドレートをトリガーできます。

{{< img src="account_management/rbac/logs_hv_roles_combination.png" alt="履歴ビューを書き込む"  style="width:70%;">}}

上記の例では

* `ADMIN` ロールメンバーは、そのアーカイブに対する履歴ビューの書き込み (リハイドレート) アクセス許可と、アーカイブの読み取りアクセス許可を持っているため、`Audit Archive` からリハイドレート**できます**。
* `AUDIT` ロールメンバーは、履歴ビューの書き込み (リハイドレート) アクセス許可を持っていないため、`Audit Archive` からリハイドレートすることは**できません**。
* `PROD` ロールメンバーは、アーカイブの読み取りアクセス許可を持っていないため、`Audit Archive` からリハイドレートすることは**できません**。


`Audit Archive` からリハイドレートされたすべてのログに `team:audit` タグを割り当てるときは、`team:audit` ログの読み取りに制限されている `Audit` ロールメンバーがリハイドレートされたコンテンツにのみアクセスできることを確認してください。タグの追加とリハイドレートの方法の詳細については、[ログアーカイブ設定セクション][14]を参照してください。

`Prod Archive` からリハイドレートされた `service:ci-cd` ログの場合、次の点に注意してください。

* [インデックスデータのログ読み取り](#logs-read-index-data)レガシーアクセス許可を使用**しない**場合、これらのログには `CI-CD` ロールメンバーがアクセスできます。
* [インデックスデータのログ読み取り](#logs-read-index-data)レガシーアクセス許可を使用**する**場合、結果の履歴ビューは `PROD` および `ADMIN` ロールメンバーに制限されるため、これらのログには `CI-CD` ロールメンバーはアクセスできません。 


#### logs_public_config_api

Datadog API でログコンフィギュレーションを作成または変更する能力を付与します。

* API を介して[アーカイブ][16]を構成する
* API を介して[インデックス][17]を構成する
* API を介して[パイプライン][18]を構成する
* API を介して[制限クエリ][19]を構成する

ログパブリックコンフィギュレーション API アクセス許可は、API を介してアクションを操作するアクセス許可のみを付与します。たとえば、[ログ書き込み除外フィルターアクセス許可](#logs-write-exclusion-filters)を持たないユーザーは、ログパブリックコンフィギュレーション API アクセス許可が付与されていても、API を介してサンプリングレートを更新できません。

### ログデータアクセス

次のアクセス許可を付与してログデータのサブセットの読み取りアクセス権を管理します。

* [ログ読み取りデータ](#logs-read-data) (推奨) は、ログ制限クエリに一致するログへのロールのアクセスを制限することにより、よりきめ細かなアクセス制御を提供します。
* [ログ読み取りインデックスデータ](#logs-read-index-data)は、インデックスごとにインデックス付きログデータへのデータアクセスを制限するレガシーアプローチです。(インデックスされたデータにアクセスする際にもこのアクセス許可を有効にすることが求められます)

#### logs_read_data

ログデータへの読み取りアクセス権。付与された場合、他の制限が適用されます (`logs_read_index_data` または[制限クエリ][19]など)。

ロールは付加的です。ユーザーが複数のロールに属している場合、ユーザーがアクセスできるデータは、各ロールからのすべてのアクセス許可の結合になります。

**例**:

* ユーザーがログ読み取りデータのあるロールに属し、ログ読み取りデータのないロールにも属している場合、ユーザーにはデータを読み取るアクセス許可があります。
* ユーザーが 1 つのロールで `service:sandbox` に制限されており、別のロールで `env:prod` に制限されている場合、ユーザーはすべての `env:prod` と `service:sandbox` ログにアクセスできます。

{{< img src="account_management/rbac/logs_rq_roles_combination.png" alt="データ読み取りアクセス権"  style="width:70%;">}}


{{< tabs >}}
{{% tab "UI" %}}

制限クエリに一致するログ以外は見られないようユーザーを制限するには、Datadog アプリの [Data Access ページ][1]を使用して以下を実行します。

1. 制限クエリを[作成](#create-a-restriction-query)。
2. その制限クエリにロール（複数可）を[割り当て](#assign-a-role-to-a-restriction-query)。
3. それぞれの制限クエリに割り当てられたロールおよびユーザーを[確認](#check-restriction-queries)。


このビューには以下が表示されます。

* **`Restricted Access` セクション**: すべての制限クエリと、それらにアタッチされているロール
* **`Unrestricted Access` セクション**: `log_read_data` 許可が付与されているすべてのロール（それ以上の制限はなし）
* **`No Access` セクション**: `log_read_data` 許可が付与されていないすべてのロール


##### 制限クエリを作成する

クエリフィルターを定義する新しい制限クエリを作成します。新しいクエリは、ロールなしで制限リストに表示されます。

{{< img src="account_management/rbac/logs_rq-create.gif" alt="制限クエリを作成"  style="width:70%;">}}


##### 制限クエリにロールを割り当てる

任意のロールを選択し、目的の制限クエリに割り当てます。

*注*: ロールを割り当てられるのは、1 つの制限クエリのみです。つまり、ロールを制限クエリに割り当てると、このロールにすでにアタッチされていた制限クエリとの関係性を失います。

{{< img src="account_management/rbac/logs_rq-assign_roles.gif" alt="制限クエリにロールを割り当て"  style="width:70%;">}}

同様に、同じ "Move" インタラクションを使用してロールに `Unrestricted Access` を付与するか、反対に `No Access` ロールに変更します。

##### 制限クエリの確認

このページには、一度に 50 以上の制限クエリ、およびセクションにつき 50 ロール以上は表示されません。多数のロールおよび制限クエリがある場合は、フィルターを使用してこのビューのスコープを限定します。

* 制限クエリフィルターを使用:

{{< img src="account_management/rbac/logs_rq-filter.png" alt="制限クエリフィルター"  style="width:70%;">}}

* ロールフィルターを使用:

{{< img src="account_management/rbac/logs_rq-view_as_role.png" alt="ロールビュー"  style="width:70%;">}}

* ユーザーフィルターを使用（複数ロールに属する特定のユーザーが実際に持つアクセス許可を確認するのに便利）:

{{< img src="account_management/rbac/logs_rq-view_as_user.png" alt="ロールビュー"  style="width:70%;">}}

[1]: https://app.datadoghq.com/logs/pipelines/data-access
{{% /tab %}}
{{% tab "API" %}}

[Roles API][1] を使用して、ロールからこのアクセス許可を取り消すか付与します。
[制限クエリ][2]を使用して、ログデータのサブセットにアクセス許可をスコープします。

[1]: /ja/api/#roles
[2]: /ja/api/?lang=bash#roles-restriction-queries-for-logs
{{% /tab %}}
{{< /tabs >}}

### レガシーアクセス許可

これらのアクセス許可は、デフォルトですべてのユーザーに対してグローバルに有効になっています。

[ログ読み取りデータ](#logs-read-data)アクセス許可は、これらのレガシーアクセス許可の上にあります。たとえば、ユーザーがクエリ `service:api` に制限されているとします。

* このユーザーが `audit` および `errors` インデックスのスコープ[読み取りインデックスデータ](#logs-read-index-data)アクセス許可を持っている場合、このユーザーにはこれらのインデックス内の `service:api` ログのみが表示されます。
* このユーザーが [livetail](#logs-livetail) アクセス許可を持っている場合、このユーザーには livetail の `service:api` ログのみが表示されます。


#### logs_read_index_data

いくつかのログインデックスでロールに読み取りアクセス権を付与します。これは、グローバルに割り当てることも、ログインデックスのサブセットに制限することもできます。

このアクセス許可の範囲をインデックスのサブセットに設定するには、まずロールの `logs_read_index_data` および `logs_modify_indexes` アクセス許可を削除します。その後、

{{< tabs >}}
{{% tab "UI" %}}

このロールに[コンフィギュレーションページ][1]のインデックスへのアクセスを許可します。

{{< img src="account_management/rbac/logs_read_index_data.png" alt="特定のロールにインデックスの読み取りアクセス権を付与する"  style="width:75%;" >}}


[1]: https://app.datadoghq.com/logs/indexes
{{% /tab %}}
{{% tab "API" %}}

* 特定のパイプラインに割り当てるロールの[ロール ID を取得][1]します。
* 地域の `logs_write_processors` アクセス許可 API の[アクセス許可 ID を取得][2]します。
* このロールを割り当てるパイプラインの[インデックス ID を取得][3]します。
* 以下の呼び出しで、そのロールにアクセス許可を付与します。

```bash
curl -X POST \
        https://app.datadoghq.com/api/v1/role/<ROLE_UUID>/permission/<PERMISSION_UUID> \
        -H "Content-Type: application/json" \
        -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
        -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
        -d '{
                "scope": {
                    "indexes": ["<INDEX-1_ID>",["<INDEX-2_ID>"]
                }
            }'
```


[1]: /ja/api/v2/roles/#list-roles
[2]: /ja/api/v2/roles/#list-permissions
[3]: /ja/api/v1/logs-indexes/#get-all-indexes
{{% /tab %}}
{{< /tabs >}}

#### logs_live_tail

ロールに [Live Tail][20] 機能を使用する能力を付与します。

このアクセス許可はグローバルで、[ログ読み取りインデックスデータ](#logs-read-index-data)アクセス許可に関係なく、livetail へのアクセスを許可します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

<br>
\*Log Rehydration は Datadog, Inc. の商標です

[1]: /ja/account_management/users/#edit-a-user-s-roles
[2]: /ja/api/v2/roles/#list-permissions
[3]: /ja/logs/guide/logs-rbac/?tab=ui#overview
[4]: /ja/logs/logs_to_metrics/
[5]: /ja/logs/explorer/facets/#overview
[6]: /ja/logs/processing/attributes_naming_convention/#standard-attributes-in-log-configuration
[7]: /ja/logs/explorer/facets/#alias-facets
[8]: /ja/logs/indexes
[9]: /ja/logs/indexes#indexes-filters
[10]: /ja/logs/indexes#update-log-retention
[11]: /ja/logs/indexes#exclusion-filters
[12]: /ja/logs/processing/pipelines/
[13]: /ja/logs/processing/pipelines/#pipeline-filters
[14]: /ja/logs/archives
[15]: /ja/logs/archives/rehydrating
[16]: /ja/api/v2/logs-archives/
[17]: /ja/api/v1/logs-indexes/
[18]: /ja/api/v1/logs-pipelines/
[19]: /ja/api/v2/logs-restriction-queries/
[20]: /ja/logs/explorer/live_tail/