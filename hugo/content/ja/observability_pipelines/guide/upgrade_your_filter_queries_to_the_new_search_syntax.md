---
aliases:
- /ja/observability_pipelines/guide/upgrade_to_the_new_search_syntax/
description: 新しい検索構文を使用するように Observability Pipelines のフィルタークエリを更新する方法を学習します。
disable_toc: false
further_reading:
- link: /observability_pipelines/search_syntax/logs/
  tag: ドキュメント
  text: Observability Pipelines の検索構文の詳細
title: 新しい検索構文へのフィルタークエリのアップグレード
---
## 概要{#overview}

Worker バージョン 2.11 以降では、更新された検索構文を使用します。Worker 2.10 以前からバージョン 2.11 以降にアップグレードされた Pipelines では、既存のクエリに対して引き続き古い構文が使用されます。これらの既存のクエリを Worker 2.11 以降で作成された Pipelines に移行するには、次の手順を実行します。

- [既存のクエリを新しい構文にアップグレードする](#upgrade-queries-to-the-new-search-syntax)
- [更新された検索構文の新機能](#whats-new-in-the-updated-search-syntax)を確認します

## クエリを新しい検索構文にアップグレードする {#upgrade-queries-to-the-new-search-syntax}

次のいずれかに該当するかどうかに応じて、手順を確認します。

- [UI で Pipelines を作成した場合 ](#created-the-pipeline-in-the-ui)
- [API または Terraform を使用して Pipelines を作成した場合 ](#created-the-pipeline-using-the-api-or-terraform)

### UI で Pipelines を作成した場合 {#created-the-pipeline-in-the-ui}

UI で Pipelines を作成した場合、

1. バージョン 2.11 以降に [Observability Pipelines Worker をアップグレード][1]します。アップグレード後、Pipelines は自動的に新しい検索構文を使用します。
1. [Observability Pipelines][2] に移動します。Pipelines を選択し、フィルタークエリを新しい構文に更新します。詳細については、[更新された検索構文の新機能](#whats-new-in-the-updated-search-syntax)セクションを参照してください。
1. Pipelines をデプロイします。

### API または Terraform を使用して Pipelines を作成した場合 {#created-the-pipeline-using-the-api-or-terraform}

パブリック API または Terraform を使用して Pipelines が作成された場合、
- Pipelines クエリを新しい検索構文に更新するリクエスト内で、`use_legacy_search_syntax` を `false` に設定します。

<div class="alert alert-warning">クエリを更新する際には、<b>必ず</b> <code>use_legacy_search_syntax</code> を <code>false</code> に設定する必要があります。もし <code>use_legacy_search_syntax</code> が未入力の場合、Worker 内ではデフォルトで <code>true</code> に設定されます。</div>

## 更新された検索構文の新機能 {#whats-new-in-the-updated-search-syntax}

次の表は、従来と新しい検索構文の違い一覧です。

| 従来の構文 | 新しい構文                        |
| ------------- | ------------------------------- |
| [予約済みフィールド](#legacy-syntax-reserved-fields)を参照する場合を除き、属性検索には `@` 記号が必要です。| 属性検索に `@` 記号は不要です。|
| `@` は属性検索を示すため、タグ検索に `@` は含まれず、属性 `tags` および `ddtags` の下で一致します。<br><br>`@` 記号のない属性検索クエリは、`tags` または `ddtags` 配列と照合されます。<br><br>属性検索構文の例 : `env:prod` | タグ構文は明示的に入力する必要があります。<br><br>[Live capture][5] でデータを調査し、どのフィールドと照合するかを判断します。<br><br>属性検索構文の例 : `tags:"env:prod" OR ddtags:"env:prod"`  |
| [予約済みフィールド](#legacy-syntax-reserved-fields)には `@` 記号は不要です。| 予約済みフィールドには `@` 記号は不要です。|

**注**: アップグレードされた検索構文では、属性検索に `@` 記号は不要です。既存のフィルタークエリから `@` 記号を削除する必要はありませんが、Datadog ではクエリから `@` 記号を削除することを推奨します。

次の例は、一致したログと、そのログに一致する従来の構文および新しい構文を示しています。

`{"user": "firstname.lastname"}`
: **従来の構文**: `@user:firstname.lastname`
: **新しい構文**: `user:firstname.lastname`
: **相違点**: 新しい構文では、属性検索に `@` 記号は不要です。

`{"message": {"log_level": "ERROR"}}`
: **従来の構文**: `@message.log_level:ERROR`
: **新しい構文**: `message.log_level:ERROR`
: **相違点**: 新しい構文では、属性検索に `@` 記号は不要です。

`{"status": "INFO"}`
: **従来の構文**: `status:INFO`
: **新しい構文**: `status:INFO`
: **相違点**: `status` は以前から [ 予約済みフィールド ](#legacy-syntax-reserved-fields) であり、`@` 記号を使用せずにフィルタリングできたため、変更はありません。新しい構文では、属性検索に `@` 記号を使用しません。

`{"message": "Hello, world" }`<br>`{"message: "hello world"}`<br>`{"message": "Hello-world"}`
: **従来の構文**: `message:"hello world"`
: **新しい構文**: `message:"hello world"`
: **相違点**: `message` は従来の検索構文においても予約済みフィールドであり、`@` 記号を必要としなかったため、従来の構文と新しい構文の間で変更はありません。新しい構文では、属性検索に `@` 記号を使用しません。

`{"message": "hEllo world"}`
: **従来の構文**: `HELLO OR hello OR Hello`
: **新しい構文**: `hello`
: **相違点**: 新しい構文では、[フリーテキスト検索][6]において大文字と小文字が区別されません。

`{"user": "name"}`
: **従来の構文**: `@user:(name OR Name OR nAme)`
: **新しい構文**: `user:(name OR Name OR nAme)`
: **相違点**: 新しい構文では、[属性検索][4]において大文字と小文字が区別され、属性検索に `@` 記号は不要です。

`{"tags": ["env:prod"] }`<br>`{"ddtags": ["env:prod"] }`
: **従来の構文**: `env:prod`
: **新しい構文**: `tags:"env:prod" OR ddtags:"env:prod"`
: **相違点**: 従来の構文では、構文に `@` 記号が含まれておらず、予約済みフィールドを検索していない場合、すべての用語が `tags` または `ddtags` フィールドと照合されます。新しい検索構文には予約済みフィールドが存在しないため、すべての検索を明示的に入力する必要があります。

`{"tags": ["message.log_level:INFO"] }`<br>`{"ddtags": ["message.log_level:INFO"]}}`
: **従来の構文**: `message.log_level:INFO`
: **新しい構文**: `tags:"message.log_level:INFO" OR ddtags:"message.log_level:INFO"`
: **相違点**: `env:prod` クエリと同様の理由です。

`{"source": "postgres" }`<br>`{"ddsource":"postgres" }`
: **従来の構文**: `source:postgres`
: **新しい構文**: `source:postgres OR ddsource:postgres`
: **相違点**: 従来の構文では、`source` フィールドを使用した属性検索は `source` フィールドと `ddsource` フィールドの両方に一致します。新しい構文ではこの挙動がなくなるため、`source` または `ddsource` を明示的に入力する必要があります。

**注**: 属性検索においてフィールド名にワイルドカードを使用することは、従来の構文と新しい構文のいずれでもサポートされていません。たとえば、次のようにワイルドカードを使用することはできません。

- 従来の構文: `*:something`
- 新しい構文: `*:something`

### 従来の構文における予約済みフィールド {#legacy-syntax-reserved-fields}

従来の構文における予約済みフィールドは次のとおりです。

* host
* source
* status
* service
* trace_id
* message
* timestamp
* tags

詳細については、[予約済み属性][3]を参照してください。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/observability_pipelines/install_the_worker/?tab=docker#upgrade-the-worker
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /ja/logs/log_configuration/attributes_naming_convention/#reserved-attributes
[4]: /ja/observability_pipelines/search_syntax/logs/#attribute-search
[5]: /ja/observability_pipelines/live_capture/
[6]: /ja/observability_pipelines/search_syntax/logs/#free-text-search