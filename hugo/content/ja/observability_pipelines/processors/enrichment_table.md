---
description: Enrichment Table プロセッサを使用して、ルックアップデータセットでログにコンテキストを追加する方法を学びます。
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/observability-pipelines-reference-tables-log-enrichment/
  tag: ブログ
  text: Reference Tables と Observability Pipelines を使用して、動的に更新されるコンテキストをログに追加する
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: ブログ
  text: Observability Pipelines を使用して、AI アプリから ClickHouse および Datadog へ OTel データをルーティングする
- link: https://www.datadoghq.com/blog/observability-pipelines-servicenow-cmdb-enrichment
  tag: ブログ
  text: SIEM やログツールにルーティングする前に、ServiceNow CMDB のコンテキストでログをエンリッチする
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Enrichment Table プロセッサ
---
{{< product-availability >}}

## 概要 {#overview}

ログには、IP アドレス、ユーザー ID、サービス名など、追加のコンテキストが必要になることが多い情報が含まれている場合があります。Enrichment Table プロセッサを使用すると、Datadog の [Reference Tables][1]、ローカルファイル、または MaxMind GeoIP テーブルに保存されたルックアップデータセットを使用して、ログにコンテキストを追加できます。このプロセッサは、指定されたキーに基づいてログを照合し、ルックアップファイルからログに情報を追加します。Reference Tables を使用すると、ServiceNow、Snowflake、S3 などに直接保存された SaaS ベースのデータセットに接続し、ログをエンリッチできます。

また、Enrichment Table プロセッサをルックアップファイルとともに使用して、Datadog API キー、Splunk HEC トークン、HTTP リクエストのカスタムヘッダーなどのシークレットにマッピングし、ログのフィルタリングやルーティングを行うこともできます。詳細については、[シークレットをソース属性として使用](#use-a-secret-as-a-source-attribute)を参照してください。

### このプロセッサを使用するタイミング{#when-to-use-this-processor}

以下は、統合からのログをエンリッチするためのユースケースです。

#### クラウドオブジェクトストレージ{#cloud-object-storage}

クラウドオブジェクトストレージサービス (Amazon S3、Azure Blob Storage、Google Cloud Storage) は、大量の構造化データおよび非構造化参照データのためのスケーラブルなストレージサービスです。

Enrichment Table プロセッサを使用して、脅威インテリジェンスフィード、許可リスト/拒否リスト、資産インベントリ、CSV として保存されたコンプライアンスマッピング、または定期的に更新されるその他の種類のファイルなど、外部で管理されている参照データセットでログをエンリッチします。

#### Databricks{#databricks}

Databricks は、機械学習 (ML)、高度な分析、ビッグデータワークロードに使用されるクラウドベースのデータレイクハウスです。

Enrichment Table プロセッサを使用して、以下の操作を行います。
- 不正の可能性や異常検知結果など、ML モデルによって生成された予測やスコアを追加します。
- 顧客プロファイル、デバイス情報、セキュリティ情報など、Databricks に保存されているデータセットを参照します。

Datadog の Databricks インテグレーションドキュメントで、Databricks の Reference Tables を設定する方法については、[Reference Tables の構成][6]を参照してください。

#### Salesforce {#salesforce}

Salesforce は、販売機会、アカウント、連絡先、取引、契約を追跡および保存するために使用される顧客関係管理 (CRM) ツールです。

Enrichment Table プロセッサを使用して、以下の操作を行います。
- インシデントの優先順位付けを行うために、業種、ARR、所有者などの顧客およびアカウント情報を運用ログに添付します。
- 顧客に関連するレイテンシの急増などの運用シグナルを使用して、マーケティングや営業に焦点を当てたダッシュボードをエンリッチします。

Datadog の Salesforce インテグレーションドキュメントで、Salesforce の Reference Tables を設定する方法については、[Reference Tables の取り込みを有効にする][2]を参照してください。

#### ServiceNow (CMDB) {#servicenow-cmdb}

ServiceNow は、インフラストラクチャー資産、アプリケーション、依存関係を追跡する構成管理データベース (CMDB) を備えた IT サービス管理プラットフォームです。

Enrichment Table プロセッサを使用して、以下の操作を行います。
- ホストを所有するチームやそのチームがサポートするビジネスユニットなど、インフラストラクチャーの所有権や依存関係のコンテキストでログをエンリッチします。
- CMDB レコードから直接テレメトリに情報を追加します。

Datadog の ServiceNow CMDB ドキュメントで、ServiceNow CMDB の Reference Tables を設定する方法については、[Reference Tables][7]を参照してください。

#### Snowflake {#snowflake}

Snowflake は、構造化データおよび半構造化データを一元管理するクラウドネイティブのデータウェアハウス/レイクです。

Enrichment Table プロセッサを使用して、以下の操作を行います。
- 顧客メタデータ (アカウント階層、リージョン、SLA) をログに追加します。
- セキュリティイベントを Snowflake に保存されているユーザーまたは資産の属性と結合します。

Datadog の Snowflake インテグレーションドキュメントで、Snowflake の Reference Tables を設定する方法については、[Reference Tables][3]を参照してください。

## セットアップ {#setup}

Enrichment Table プロセッサをセットアップするには、

1. {{< ui >}}Add enrichment{{< /ui >}} をクリックします。
1. {{< ui >}}filter query{{< /ui >}} を定義します。詳細については、[ログの検索構文][8]を参照してください。
   - フィルターに一致するログのみがプロセッサを通過します。
   - フィルタークエリに一致するかどうかにかかわらず、すべてのログがパイプラインの次のステップに送信されます。
1. {{< ui >}}Set lookup mapping{{< /ui >}}セクションで、使用するルックアップデータセットのタイプを選択します。
  {{< tabs >}}
  {{% tab "Reference Table" %}}

  1. ドロップダウンメニューから Reference Table を選択します。詳細については、[Reference Tables の使用](#using-reference-tables)を参照してください。
  1. {{< ui >}}Manage{{< /ui >}} をクリックして、Reference Tables の設定ページに移動します。
  1. (オプション) ログのエンリッチメントに使用する特定の列を選択します。
      - Observability Pipelines は、デフォルトですべてのテーブル列を使用してログをエンリッチします。テーブルの各列は属性としてログに追加されます。属性名は列名、属性値は列の値となります。
      - Reference Table の特定の列を使用してログをエンリッチする場合は、ドロップダウンメニューから対応する属性を選択します。
  1. Datadog アプリケーションキー識別子を入力します。Observability Pipelines は、データのエンリッチ時に[アプリケーションキー][1]を使用して Datadog のプログラム API にアクセスします。アプリケーションキーが以下の条件を満たしていることを確認してください。
      - [サービスアカウント][2]に関連付けられていること (個人の Datadog ユーザーアカウントではないこと)。
      - [`reference_tables_read`][3] のスコープに限定されます。
  1. ログのソース属性を入力します。ソース属性の値は、Observability Pipelines が Reference Table 内で検索する対象です。詳細については、[エンリッチメントの例](#enrichment-example)を参照してください。
  1. ターゲット属性を入力します。ターゲット属性の値には、Reference Table で見つかった情報が JSON オブジェクトとして格納されます。詳細については、[エンリッチメントファイルの例](#enrichment-file-example)を参照してください。
  1. {{< ui >}}Save{{< /ui >}} をクリックします。

[1]: /ja/account_management/api-app-keys/#application-keys
[2]: /ja/account_management/org_settings/service_accounts#service-account-application-keys
[3]: /ja/account_management/rbac/permissions/#reference-tables

  {{% /tab %}}
  {{% tab "ファイル" %}}

  1. ファイルパスを入力します。
      - **注**: すべてのファイルパスは、デフォルトでは `/var/lib/observability-pipelines-worker/config/` となる構成データディレクトリからの相対パスです。ファイルは `observability-pipelines-worker group` および `observability-pipelines-worker` ユーザーが所有しているか、少なくともグループまたはユーザーが読み取り可能である必要があります。詳細については、[高度な Worker 構成][1]を参照してください。
  1. 列名を入力します。エンリッチメントテーブルの列名は、ソース属性値との照合に使用されます。詳細については、[エンリッチメントの例](#enrichment-example)を参照してください。
  1. ({{< tooltip glossary="プレビュー" case="title" >}}) シークレットをソース属性として使用している場合は、{{< ui >}}Use Secret as source attribute{{< /ui >}} をオンにします。
      - シークレットのタイプ ({{< ui >}}Datadog API Key{{< /ui >}} または {{< ui >}}Splunk HEC token{{< /ui >}}) を選択します。
      - 詳細については、[シークレットをソース属性として使用する例](#use-a-secret-as-a-source-attribute)を参照してください。
  1. シークレットを使用していない場合は、ログのソース属性を入力します。ソース属性の値は、ローカルファイルの列名と照合するためのキーとして使用されます。
  1. ターゲット属性を入力します。ターゲット属性の値には、ファイル内で見つかった情報がJSON オブジェクトとして保存されます。
  1. {{< ui >}}Save{{< /ui >}} をクリックします。

[1]: /ja/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
  {{% /tab %}}
  {{% tab "GeoIP" %}}

  1. GeoIP の場合、`<DD_OP_DATA_DIR>/config` ディレクトリを基準とした `.mmdb` ファイルへの GeoIP パスを入力します。
      - **注**: すべてのファイルパスは、デフォルトでは `/var/lib/observability-pipelines-worker/config/` となる構成データディレクトリからの相対パスです。ファイルは `observability-pipelines-worker group` および `observability-pipelines-worker` ユーザーが所有しているか、少なくともグループまたはユーザーが読み取り可能である必要があります。詳細については、[高度な Worker 構成][1]を参照してください。
  1. ログのソース属性を入力します。ソース属性の値は、Observability Pipelines が Reference Table 内で検索する対象です。詳細については、[エンリッチメントファイルの例](#enrichment-file-example)を参照してください。
  1. ターゲット属性を入力します。ターゲット属性の値には、Reference Table で見つかった情報が JSON オブジェクトとして保存されます。詳細については、[エンリッチメントファイルの例](#enrichment-file-example)を参照してください。
  1. {{< ui >}}Save{{< /ui >}} をクリックします。

[1]: /ja/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
  {{% /tab %}}
  {{< /tabs >}}

### エンリッチメントの例 {#enrichment-example}

この例では、

- これは、エンリッチメントプロセッサが使用する Reference Table またはファイルです。
  | merch_id | merchant_name   | city      | state    |
  | -------- | --------------- | --------- | -------- |
  | 803      | Andy's Ottomans | Boise     | Idaho    |
  | 536      | Cindy's Couches | Boulder   | Colorado |
  | 235      | Debra's Benches | Las Vegas | Nevada   |
- `merchant_id`はソース属性として使用され、`merchant_info`はターゲット属性として使用されます。
- `merch_id`は、プロセッサがソース属性の値を検索するために使用する列名として設定されます。**注**: ソース属性の値は、列名と一致している必要はありません。

エンリッチメントプロセッサが `"merchant_id":"536"` を含むログを受信した場合、

- プロセッサは、Reference Table の `merch_id` 列で値 `536` を検索します。
- 値が見つかると、Reference Table から情報の行全体を JSON オブジェクトとして `merchant_info` 属性に追加します。

```
merchant_info {
    "merchant_name":"Cindy's Couches",
    "city":"Boulder",
    "state":"Colorado"
}
```

### シークレットをソース属性として使用 {#use-a-secret-as-a-source-attribute}

ファイル参照オプションでは、{{< ui >}}Use Secret as source attribute{{< /ui >}} を有効にすることで、Datadog API キー、Splunk HEC トークン、HTTP リクエストのカスタムヘッダーなどのシークレットをローカル CSV ファイルにマッピングできます。シークレットは、ローカルファイルの列名と照合するためのキーとして使用されます。

**注**: Splunk HEC トークンにマッピングする場合は、[Splunk HEC ソース][9]を使用し、ソースで{{< ui >}}Store HEC token{{< /ui >}}を有効にする必要があります。

#### Splunk HEC の例 {#splunk-hec-example}

たとえば、Splunk HEC トークンに基づいてログをフィルタリングおよびルーティングする場合、

1. Splunk HEC ソースで{{< ui >}}Store HEC token{{< /ui >}}を有効にして、トークンをイベントメタデータに保存します。
1. Enrichment Table プロセッサのファイル参照オプションを使用して、イベントメタデータに保存された HEC トークンを検索キーとして使用します。Worker がイベントをエンリッチメントするため、その値に基づいてログをフィルタリングおよびルーティングできます。

Splunk HEC トークンが値にマッピングされたローカル参照 CSV ファイルの例:

| Splunk HEC トークン (シークレット) | HEC トークン値 |
| ------------------------- | --------------- |
| `abcdef`                  | `hec_token_one` |
| `uvwxyz`                  | `hec_token_two` |

この例では、プロセッサを設定する際に列名として`Splunk HEC token (secret)`を入力します。`token_value` がターゲット属性パスである場合、これはサンプルログに追加される HEC トークン値です。

```
{
  "message": "this is a test"
  "token_value": "hec_token_one"
}

```

`token_value: hec_token_one` に基づいてログをフィルタリングおよびルーティングできます。

## Health メトリクス {#health-metrics}

### Processor メトリクス {#processor-metrics}

Enrichment Table プロセッサに関するメトリクスを表示するには、プロセッサメトリクスにタグ `component_type=enrichment_table` および `component_id=<processor_id>` を追加します。

`pipelines.enrichment_rows_not_found_total`
: テーブル内に対応する行がない処理済みログの数。

`pipelines.component_errors_total`
: エラーによりエンリッチメントできないログの数。これらのエラーはタグ `error_code=did_not_enrich_event` で報告されます。
: タグ `reason` には以下の値が含まれる場合があります。<br>- `target_exists`: エンリッチされたデータを格納するターゲット値がすでに存在しており、オブジェクトではありません。<br>- `too_many_pending_lookups`: バッファまたはルックアップキューがいっぱいです。<br>- `lookup_failed`: ルックアップキーがログ内に見つからない、文字列ではない、または整数ではありません。

### Buffer メトリクス (Reference Tables を使用する場合) {#buffer-metrics-when-using-reference-tables}

Enrichment Table プロセッサのバッファは、参照テーブルからエンリッチメントを行う場合にのみ有効になります。

Enrichment Table プロセッサのバッファメトリクスを表示するには、バッファメトリクスに以下のタグを追加します。

- `component_type=enrichment_table`
- `component_id=<processor_id>`
- `buffer_id=enrichment_table_buffer`

`pipelines.buffer_events`
: **説明**: プロセッサのバッファ内のイベント数。
: **メトリクスタイプ**: ゲージ

`pipelines.buffer_size_bytes`
: **説明**: プロセッサのバッファ内のバイト数。
: **メトリクスタイプ**: ゲージ

`pipelines.buffer_received_events_total`
: **説明**: プロセッサのバッファが受信したイベント。
: **メトリクスタイプ**: カウンター

`pipelines.buffer_received_bytes_total`
: **説明**: プロセッサのバッファが受信したバイト数。
: **メトリクスタイプ**: カウンター

`pipelines.buffer_sent_events_total`
: **説明**: プロセッサのバッファによってダウンストリームに送信されたイベント。
: **メトリクスタイプ**: カウンター

`pipelines.buffer_sent_bytes_total`
: **説明**: プロセッサのバッファによってダウンストリームに送信されたバイト数。
: **メトリクスタイプ**: カウンター

### Reference Table メトリクス {#reference-table-metrics}

Reference Table を使用する Enrichment Table プロセッサに関するメトリクスを確認するには、以下のメトリクスにタグ `component_type:enrichment_table` および `component_id=<processor_id>` を追加します。タグ `reference_table_id:<table_uuid>` は、同じ Reference Table を使用するすべてのプロセッサ間で集計するためにも使用できます。

`pipelines.enrichment_rows_not_found_total`
: このカウンターは、テーブル内に対応する行がないログが処理されるたびにインクリメントされます。Worker バージョン 2.14 以降で利用可能です。

`pipelines.enrichment_cache_hits_total`
: キャッシュヒット数。つまり、バッファリングされずにエンリッチメントできたログの数です。

`pipelines.enrichment_cache_misses_total`
: キャッシュミス数。つまり、バッファリングが必要となり、Reference Tables API へのリクエスト送信が必要となったログの数です。

`pipelines.component_errors_total`
: エラーによりエンリッチメントできないログの数。これらのエラーはタグ `error_code=did_not_enrich_event` で報告されます。
: タグ `reason` には以下の値が含まれる場合があります。<br>- `target_exists`: エンリッチされたデータを格納するためのターゲット値がすでに存在しており、オブジェクトではありません。<br>- `too_many_pending_lookups`: バッファまたはルックアップキューがいっぱいです。<br>- `lookup_failed`: ルックアップキーがログ内に見つからないか、文字列または整数ではありません。<br>- `reference_table_read_error`: Reference Table の読み取り中に、回復不能なエラーが発生したか、連続して多数のエラーが発生しました。


以下のメトリクスは、同じ Reference Table を使用するすべてのプロセッサに共通で、タグ `component_type:enrichment_table`、`component_id=reference_table_<table_uuid>`、`reference_table:<table_uuid>` を使用します。

`pipelines.reference_table_cached_rows`
: このゲージメトリクスは、ローカルキャッシュに格納されている行数を報告します。タグ `found:true` はテーブル内に存在する行を報告し、`found:false` はテーブル内に存在しない行を報告します。

`pipelines.reference_table_queued_keys`
: このゲージメトリクスは、Reference Tables API からの読み取りを待機している行キーの数を報告します。キューの最大容量は 5,000 キーです。ログがこの制限を超えるキーを挿入しようとすると、そのログはエンリッチメントされずに直ちにダウンストリームへ送信されます。

`pipelines.reference_table_fetched_keys_total`
: Reference Tables API に送信される各リクエストについて、このカウンターは、そのリクエストで取得された行数分だけ増加します。

## プロセッサの仕組み {#how-the-processor-works}

### Reference Tables の使用{#using-reference-tables}

[Reference Tables][4] を使用すると、顧客の詳細、資産リスト、サービス依存関係情報などの情報を Datadog に保存できます。Enrichment Table プロセッサは、オンデマンドで Reference Tables から行を取得し、ローカルにキャッシュします。テーブルの行はキャッシュ内に約 10 分間保持されます (テーブルに行が見つからなかったネガティブなルックアップの場合は 30 分間)。その後、削除または更新されます。

プロセッサがキャッシュ内に対応する行がないログを検出すると、Reference Table から行が取得されるまで、ログデータはメモリ内にバッファリングされます。バッファが最大容量 (20,000 イベント) に達すると、バッファリングされた最も古いログから順に、エンリッチメントなしでダウンストリームへの送信が開始されます。プロセッサは、アップストリームにバックプレッシャーをかけません。

Reference Tables の読み取りリクエストは、1 秒ごと、または 250 個のキーがルックアップのためにキューに入れられたときに送信されます。

Reference Table への接続中に認証エラーが発生した場合、または一連のリクエストが失敗した場合、Datadog はログが無限に待機するのを防ぐため、バッファリングされたログをエンリッチメントなしでダウンストリームにフラッシュし、バッファは新しいログの受け入れを停止します。プロセッサは定期的にリクエストを再試行し、リクエストが成功すると自動的に通常の動作を再開します。

エンリッチメントなしでログが送信される原因となるエラーが発生した場合は、Worker ログで確認できます。また、[`pipelines.component_errors_total`](#processor-metrics) メトリクスも増加します。

Datadog では、カーディナリティが高い (10 分間の時間枠内で 10,000 以上の値が存在する) ログフィールドに対して、このプロセッサを使用することは推奨していません。Reference Tables API にはレート制限があり、Worker からのリクエストが拒否される場合があります。プロセッサの実行中に Worker ログでレート制限の警告が引き続き表示される場合は、[Datadog サポート][5]までお問い合わせください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/reference_tables/?tab=cloudstorage
[2]: /ja/integrations/salesforce/#optional-enable-ingestion-of-reference-tables
[3]: /ja/integrations/snowflake-web/#reference-tables
[4]: https://docs.datadoghq.com/ja/reference_tables/?tab=cloudstorage#reference-table-limits
[5]: /ja/help/
[6]: /ja/integrations/databricks/?tab=useaserviceprincipalforoauth#reference-table-configuration
[7]: /ja/integrations/guide/servicenow-cmdb-enrichment-setup/#reference-tables
[8]: /ja/observability_pipelines/search_syntax/logs/
[9]: /ja/observability_pipelines/sources/splunk_hec/?tab=secretsmanagement