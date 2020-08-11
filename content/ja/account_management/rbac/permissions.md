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
| 管理者           | このアクセス許可は、お使いの Datadog 組織内のすべてを表示し編集する権限をロールに与えます（明示的に定義されたアクセス許可を持つものを除く）。これには、請求、使用方法、ユーザー、キー、ロール、アクセス許可、組織管理が含まれます。これには「標準アクセス」で利用可能なすべてのアクセス許可を含みます。 |
| 標準的な方法        | APM、イベント、その他アカウントの管理に関連しない機能など、お使いの Datadog 組織の中で高度な許可によって制限されていないコンポーネントを表示および編集することができます。                                                                    |

**注**: ロールに `admin` と `standard` アクセス許可の両方がないことにより定義されるため、`read-only` アクセス許可はありません。

### 高度な許可

デフォルトでは、既存のユーザーは、すぐに使用できる 3 つの Datadog 管理者、標準、または読み取り専用ロールのいずれかにすでに関連付けられているため、すべてのユーザーは全種類のデータを読み取るアクセス許可をすでに持ち、管理者または標準ユーザーはアセットの書き込みアクセス許可をすでに持っています。

**注**: ユーザーに新しいカスタムロールを追加する際、新しいロールのアクセス許可を適用するために、そのユーザーに関連付けられている既存の Datadog ロールを必ず削除してください。

一般的なアクセス許可の他に、特定のアセットやデータタイプに対しより粒度の高いアクセス許可を定義することもできます。アクセス許可は、グローバルにすることも要素のサブセットに範囲を絞ることもできます。オプションの詳細と利用可能なアクセス許可に対する影響に関しては、以下をご覧ください。

## ダッシュボード

ダッシュボードアセットのアクセス許可一覧は以下をご覧ください。

| 名前                    | 説明                             | Scopable |
| ----------------------- | --------------------------------------- | -------- |
| dashboards_read         | ダッシュボードを表示する機能              | false    |
| dashboards_write        | ダッシュボードを作成および変更する機能 | false    |
| dashboards_public_share | ダッシュボードを外部と共有する機能  | false    |

## モニター

モニターアセットのアクセス許可一覧は以下をご覧ください。

| 名前              | 説明                                  | Scopable |
| ----------------- | -------------------------------------------- | -------- |
| monitors_read     | モニターを表示する機能                     | false    |
| monitors_write    | モニターを変更、ミュート、削除する機能 | false    |
| monitors_downtime | モニターのダウンタイムを設定する機能   | false    |

## セキュリティモニタリング

セキュリティモニタリングアセットのアクセス許可一覧は以下をご覧ください。

| 名前                             | 説明                                         | Scopable |
| -------------------------------- | --------------------------------------------------- | -------- |
| security_monitoring_rules_read   | 検出ルールを閲覧可能                     | false    |
| security_monitoring_rules_write  | 検出ルールを作成、編集、削除可能 | false    |
| security_monitoring_signals_read | セキュリティシグナルを閲覧可能                    | false    |

## ログ管理

ログコンフィギュレーションアセットおよびログデータのアクセス許可一覧は、以下をご覧ください。

| 名前                         | 説明                                | Scopable |
| ---------------------------- | ------------------------------------------ | -------- |
| logs_read_data               | ログデータへの読み取りアクセス権。付与された場合、他の制限が適用されます (`logs_read_index_data` または制限クエリなど)。       | true     |
| logs_read_index_data         | サブセットログデータの読み取り (インデックスベース)       | true     |
| logs_modify_indexes          | ログインデックスの定義を更新可能       | false    |
| logs_live_tail               | Live Tail 機能にアクセス可能               | false    |
| logs_write_exclusion_filters | 除外フィルターのサブセットを更新可能   | true     |
| logs_write_pipelines         | ログパイプラインのサブセットを更新可能       | true     |
| logs_write_processors        | インデックス内のログプロセッサーを更新可能      | true     |
| logs_write_archives          | 外部アーカイブのコンフィギュレーションを更新可能 | false    |
| logs_read_archives          | アーカイブからログをリハイドレートします。アーカイブのコンフィギュレーション詳細を参照してください。 | true    |
| logs_public_config_api       | ログパブリック構成 API にアクセス可能（読み取り/書き込み）    | false    |
| logs_generate_metrics        | メトリクス生成機能にアクセス可能        | false    |

アクセス許可に関する詳細は、以下をご覧ください。

### ログコンフィギュレーションアクセス

#### logs_generate_metrics

メトリクスの生成機能を使用する能力をロールに付与します。このアクセス許可はグルーバルで、ログから生成されるすべてのメトリクスのコンフィギュレーションに適用されます。

{{< tabs >}}
{{% tab "Datadog application" %}}

[Datadog ロールのページ][1]にアクセスし、指定するロールの `other` のチェックボックスを選択します（以下参照）。
{{< img src="account_management/rbac/logs_generate_metrics_access.png" alt="カスタムロールを作成"  style="width:90%;">}}


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

[Roles API][1] から、このアクセス許可をロールに付与したり取り消すことができます。


[1]: /ja/api/v2/roles/
{{% /tab %}}
{{< /tabs >}}

#### logs_modify_indexes

ログインデックスを作成および変更する能力をロールに付与します。それには以下が含まれます。

- インデックスにルーティングするログを指定するための包含クエリを設定します。
- インデックスに対するログの保存期間を設定します。
- インデックスの読み取りアクセス権を持つロールを制限します (`logs_read_index_data`) 。
- インデックスの除外フィルターを変更できるロールを指定します (`logs_write_exclusion_filters`) 。

**注**: このアクセス許可は、すべてのログインデックスの読み取りアクセスとすべてのインデックス除外フィルターの書き込みアクセス許可も付与します。

{{< tabs >}}
{{% tab "Datadog application" %}}

[Datadog ロールのページ][1]にアクセスし、指定するロールの `other` のチェックボックスを選択します（以下参照）。
{{< img src="account_management/rbac/logs_modify_indexes_access.png" alt="カスタムロールを作成" style="width:90%;">}}


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

[Roles API][1] から、このアクセス許可をロールに付与したり取り消すことができます。


[1]: /ja/api/v2/roles/
{{% /tab %}}
{{< /tabs >}}

#### logs_write_exclusion_filters

インデックス内で除外フィルターを作成または変更する能力をロールに付与します。これは、グローバルに割り当てることも、インデックスのサブセットに制限することもできます。

{{< tabs >}}
{{% tab "Datadog application" %}}

**Global access**:

[Datadog ロールのページ][1]にアクセスし、指定するロールの `write` のチェックボックスを選択します（以下参照）。

{{< img src="account_management/rbac/logs_write_exclusion_filters_access.png" alt="カスタムロールを作成"  style="width:90%;">}}

**インデックスのサブセット**:

1. ロールのグローバルなアクセス許可を削除。
2. インデックスを編集し、"Grant editing Exclusion Filters of this index to" フィールドにロールを追加することで、[Datadog アプリの処理パイプラインページ][2]でロールにこのアクセス許可を付与できます（下のスクリーンショット）。

{{< img src="account_management/rbac/logs_write_exclusion_filters.png" alt="特定のロールにインデックス除外フィルターの書き込みアクセス権を付与する"  style="width:75%;" >}}


[1]: https://app.datadoghq.com/access/roles
[2]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

[Roles API][1] から、このアクセス許可をロールに付与したり取り消すことができます。


[1]: /ja/api/v2/roles/
{{% /tab %}}
{{< /tabs >}}

#### logs_write_pipelines

ロールにログ処理パイプラインを作成および変更する能力を付与します。これには、処理パイプラインに入るログの一致フィルターの設定、パイプラインの名前の設定、そのパイプライン内のプロセッサーへの書き込みアクセス権を持つロールの制限（`logs_write_processors`）が含まれます。

{{< tabs >}}
{{% tab "Datadog application" %}}

[Datadog ロールのページ][1]にアクセスし、指定するロールの `other` のチェックボックスを選択します（以下参照）。
{{< img src="account_management/rbac/logs_write_pipeline_access.png" alt="カスタムロールを作成"  style="width:90%;">}}


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

[Roles API][1] から、このアクセス許可をロールに付与したり取り消すことができます。

ID がそれぞれ `abcd-1234` および `bcde-2345` の 2 つの処理パイプラインにのみ書き込みアクセスを付与する場合、

1. ロールのグローバルなアクセス許可 `logs_write_pipelines` が割り当てられている場合、削除します。
2. 変更するロールの UUID を取得します。
3. [アクセス許可を取得][2] API を使用し、リージョンの `logs_write_pipelines` アクセス許可 UUID を見つけます。
4. 以下の呼び出しで、そのロールにアクセス許可を付与します。

```sh
curl -X POST \
        https://app.datadoghq.com/api/v1/role/<ROLE_UUID>/permission/<PERMISSION_UUID> \
        -H "Content-Type: application/json" \
        -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
        -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
        -d '{
                "scope": {
                    "pipelines": [
                        "abcd-1234",
                        "bcde-2345"
                    ]
                }
            }'
```


[1]: /ja/api/v2/roles/
[2]: /ja/api/v2/roles/#list-permissions
{{% /tab %}}
{{< /tabs >}}

#### logs_write_processors

処理パイプライン内でプロセッサーを作成または変更する能力をロールに付与します。

{{< tabs >}}
{{% tab "Datadog application" %}}

**Global access**:

[Datadog ロールのページ][1]にアクセスし、指定するロールの `write` のチェックボックスを選択します（以下参照）。

{{< img src="account_management/rbac/logs_write_processors_access.png" alt="カスタムロールを作成"  style="width:90%;">}}

**パイプラインのサブセット**:

1. ロールの `logs_write_processors` および `logs_write_pipelines` アクセス許可を削除します。
2. 処理パイプラインを編集し、"Grant editing Exclusion Filters of this index to" フィールドにロールを追加することで、[Datadog アプリの処理パイプラインページ][2]でロールにこのアクセス許可を付与できます（下のスクリーンショット）。

{{< img src="account_management/rbac/logs_write_processors.png" alt="特定のロールにプロセッサーの書き込みアクセス権を付与する"  style="width:75%;" >}}


[1]: https://app.datadoghq.com/access/roles
[2]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

[Roles API][1] から、このアクセス許可をロールに付与したり取り消すことができます。


[1]: /ja/api/v2/roles/
{{% /tab %}}
{{< /tabs >}}

#### logs_write_archives

ログアーカイブを作成または変更する能力を付与します。

{{< tabs >}}
{{% tab "Datadog application" %}}

[Datadog ロールのページ][1]にアクセスし、指定するロールの `other` のチェックボックスを選択します（以下参照）。
{{< img src="account_management/rbac/logs_write_archives_access.png" alt="カスタムロールを作成"  style="width:90%;">}}


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

[Roles API][1] から、このアクセス許可をロールに付与したり取り消すことができます。


[1]: /ja/api/v2/roles/
{{% /tab %}}
{{< /tabs >}}


#### logs_read_archives

アーカイブからのリハイドレートを行う許可を取得し、アーカイブコンフィギュレーションの詳細にアクセスします。このアクセス許可の対象はアーカイブのサブセットとなります。

{{< tabs >}}
{{% tab "Datadog application" %}}

[Datadog ロールのページ][1]にアクセスし、指定するロールの `read` のチェックボックスを選択します（以下参照）。
{{< img src="account_management/rbac/logs_read_archive_access.png" alt="カスタムロールを作成" style="width:90%;">}}

次に、アーカイブにロールを割り当てます。アーカイブを作成して割り当てるか、アーカイブの編集時にいつでも更新することができます。
{{< img src="account_management/rbac/logs_archive_restriction.png" alt="カスタムロールを作成" style="width:90%;">}}

アクセス制限のないアーカイブは、`logs_read_archives` アクセス許可をもつロールに属するユーザー全員が閲覧できます。アクセスが制限されているアーカイブは、`logs_read_archives` が許可されているロールを除き、登録済みのロールのいずれかに属するユーザーのみしかアクセスできません。

以下の例では、`Guest` 以外のすべてのロールに `logs_read_archive` 許可が付与されていることを前提としています。

* Staging には `Guest` ロール**のみ**に属するユーザーを除くすべてのユーザーがアクセスできます。
* Prod には `Customer Support` に属するすべてのユーザーがアクセスできます。
* Security-Audit には、`Customer Support` に属するユーザーはアクセスできません。`Audit & Security` も同時に付与されている場合はアクセスが可能です。

{{< img src="account_management/rbac/logs_archives_list.png" alt="カスタムロールを作成"  style="width:90%;">}}


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

[Roles API][1] から、`logs_read_archive` アクセス許可をロールに付与したり取り消すことができます。

[Archive API][2] を使用して、アーカイブ対象をロールのサブセットに設定することができます。


[1]: /ja/api/v2/roles/
[2]: /ja/api/v2/logs-archives/
{{% /tab %}}
{{< /tabs >}}

#### logs_public_config_api

Datadog API でログコンフィギュレーションを作成または変更する能力を付与します。

{{< tabs >}}
{{% tab "Datadog application" %}}

[Datadog ロールのページ][1]にアクセスし、指定するロールの `other` のチェックボックスを選択します（以下参照）。
{{< img src="account_management/rbac/logs_public_config_api_access.png" alt="カスタムロールを作成"  style="width:90%;">}}


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

[Roles API][1] から、このアクセス許可をロールに付与したり取り消すことができます。


[1]: /ja/api/v2/roles/
{{% /tab %}}
{{< /tabs >}}

### ログデータアクセス

次のアクセス許可を付与してログデータのサブセットの読み取りアクセス権を管理します。

* `logs_read_data`(推奨) は、ログ制限クエリに一致するログへのロールのアクセスを制限することにより、よりきめ細かなアクセス制御を提供します。
* `logs_read_index_data` は、インデックスごとにインデックス付きログデータへのデータアクセスを制限する代替アプローチです。(インデックスされたデータにアクセスする際にもこのアクセス許可が求められます)

これらのアクセス許可は一緒に使用することもできます。ロールは、ユーザーをインデックスのサブセットに制限し、さらに制限クエリを適用して、これらのインデックス内のアクセスを制限できます。

**例**: ユーザー A はインデックス `audit` とインデックス `errors` にアクセスでき、クエリ `service:api` に制限されています。
ログエクスプローラーを見ると、このユーザーには `service:api` から `audit` と `errors` インデックスへのログのみが表示されます。

さらに、Live Tail へのアクセスは、ユーザーのデータアクセス制限に関係なく、`logs_live_tail` アクセス許可で制限できます。

#### logs_read_data

ログデータへの読み取りアクセス権。付与された場合、他の制限が適用されます (`logs_read_index_data` または[制限クエリ][3]など)。

"ロールの組み合わせは許容されます。ユーザーが複数の役割に属している場合、最も制限の少ないロールが適用されます。"

**例**:

* ユーザーがログ読み取りデータのあるロールに属し、ログ読み取りデータのないロールにも属している場合、ユーザーにはデータを読み取るアクセス許可があります。
* ユーザーが 1 つのロールで `service:sandbox` に制限されており、別のロールで `env:prod` に制限されている場合、ユーザーはすべての `env:prod` と `service:sandbox` ログにアクセスできます。

{{< img src="account_management/rbac/logs_rq_roles_combination.png" alt="データ読み取りアクセス権"  style="width:70%;">}}

{{< tabs >}}
{{% tab "Datadog application" %}}

**ログデータへのグローバルな読み取りアクセス権を付与する**:

[Datadog ロールのページ][1]にアクセスし、指定するロールの `read` のチェックボックスを選択します（以下参照）。

{{< img src="account_management/rbac/logs_read_data_access.png" alt="データ読み取りアクセス権"  style="width:70%;">}}

**ログのサブセットへの読み取りアクセスを制限する**:

このコンフィギュレーションは、API を通じてのみサポートされます。
[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

[Roles API][1] を使用して、ロールからこのアクセス許可を取り消すか付与します。
[制限クエリ][2]を使用して、ログデータのサブセットにアクセス許可をスコープします。



[1]: /ja/api/#roles
[2]: /ja/api/?lang=bash#roles-restriction-queries-for-logs
{{% /tab %}}
{{< /tabs >}}


#### logs_read_index_data

いくつかのログインデックスでロールに読み取りアクセス権を付与します。これは、グローバルに割り当てることも、ログインデックスのサブセットに制限することもできます。
`logs_read_data` と制限クエリを使用する場合は、インデックスされたログにアクセスできるよう `logs_read_index_data` アクセス許可を**必ず**グローバルに設定する必要があります。

{{< tabs >}}
{{% tab "Datadog application" %}}

**Global access**:

[Datadog ロールのページ][1]にアクセスし、指定するロールの `read` のチェックボックスを選択します（以下参照）。

{{< img src="account_management/rbac/logs_read_index_data_access.png" alt="インデックスデータ読み取りアクセス権"  style="width:90%;">}}

**インデックスのサブセット**:

1. ロールの `logs_read_index_data` および `logs_modify_indexes` アクセス許可を削除します。
2. インデックスを編集し、"Grant access of this index's content to" フィールドにロールを追加することで、[Datadog アプリのインデックスコンフィギュレーションページ][2]でロールにこのアクセス許可を付与できます（下のスクリーンショット）。

{{< img src="account_management/rbac/logs_read_index_data.png" alt="特定のロールにインデックスの読み取りアクセス権を付与する"  style="width:75%;" >}}


[1]: https://app.datadoghq.com/access/roles
[2]: https://app.datadoghq.com/logs/pipelines/indexes
{{% /tab %}}
{{% tab "API" %}}

このアクセス許可は、[Roles API][3] を介してロールから付与または取り消すことができます。たとえば、`main` および `support` の名前のついた 2 つのインデックスのみの読み取りアクセスをロールに付与する場合、API 呼び出しは以下のようになります。

1. ロールのグローバルなアクセス許可 `logs_read_index_data` が割り当てられている場合、削除します。
2. 変更するロールの UUID を取得します。
3. [アクセス許可を取得][2] API を使用し、リージョンの `logs_read_index_data` アクセス許可 UUID を見つけます。
4. 以下の呼び出しで、そのロールにアクセス許可を付与します。

```bash
curl -X POST \
        https://app.datadoghq.com/api/v1/role/<ROLE_UUID>/permission/<PERMISSION_UUID> \
        -H "Content-Type: application/json" \
        -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
        -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
        -d '{
                "scope": {
                    "indexes": [
                        "main",
                        "support"
                    ]
                }
            }'
```


[1]: /ja/api/v2/roles/
[2]: /ja/api/v2/roles/#list-permissions
{{% /tab %}}
{{< /tabs >}}


#### logs_live_tail

ロールに Live Tail 機能を使用する能力を付与します。

{{< tabs >}}
{{% tab "Datadog application" %}}

[Datadog ロールのページ][1]にアクセスし、指定するロールの `read` のチェックボックスを選択します（以下参照）。
{{< img src="account_management/rbac/logs_livetail_access.png" alt="カスタムロールを作成"  style="width:90%;">}}


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

[Roles API][1] から、このアクセス許可をロールに付与したり取り消すことができます。


[1]: /ja/api/#roles
{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/users/#edit-a-user-s-roles
[2]: /ja/api/v2/roles/#list-permissions
[3]: /ja/api/v2/logs-restriction-queries/