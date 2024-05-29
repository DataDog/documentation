---
aliases:
- /ja/api/latest/tracing/
- /ja/api/v1/tracing/
- /ja/api/v2/tracing/
further_reading:
- link: /tracing/
  tag: ドキュメント
  text: Datadog の APM トレーシングについて
- link: /tracing/glossary/
  tag: ドキュメント
  text: APM の用語と概要
kind: ガイド
title: API で Agent にトレースを送信する
---

Datadog の APM を使用すると、コードをトレースしてパフォーマンスメトリクスを収集し、アプリケーションのどの部分が実行に時間がかかるか、あるいは非効率であるかを特定できます。

トレーシングデータは、インスツルメントされたコードから HTTP API を介して Datadog Agent に送信されます。Datadog トレーシングライブラリを使用することで、Datadog Agent へのメトリクスの送信を簡略化できます。ただし、それらのライブラリを使用できないアプリケーションや、公式の Datadog トレーシングライブラリがまだ提供されていない言語で書かれたアプリケーションをインスツルメントするために、API を直接使用することもできます。

トレーシング API は、サービス側の API というよりはむしろ Agent の API です。トレースをローカルエンドポイント `http://localhost:8126/v0.3/traces` に送信して、それを Agent が Datadog に転送できるようにします。

## パス

{{< code-block lang="bash" >}}
PUT http://localhost:8126/v0.3/traces
{{< /code-block >}}

## リクエスト

トレースは、次のようなトレースの配列として送信されます。

```
[ trace1, trace2, trace3 ]
```
それぞれのトレースは、次のようなスパンの配列となります。

```
trace1 = [ span, span2, span3 ]
```
各スパンは `trace_id`、`span_id`、`resource` などを持つ辞書として機能します。トレース内の各スパンは同じ `trace_id` を使用する必要がありますが、`trace_id` と span_id は異なる値でなければなりません。

### モデル

<div class="alert alert-info">Datadog トレーシングライブラリは、64 ビットおよび 128 ビットのトレースを両方サポートしています。詳しくは、<a href="/tracing/guide/span_and_trace_id_format/">トレースとスパン ID のフォーマット</a>をご覧ください。</div>

| フィールド      | タイプ    | 説明                           |
|------------|---------|---------------------------------------|
| `duration`   | int64   | リクエストの処理時間 (ナノ秒単位)。 |
| `error`      | int32   | エラーが発生したことを示すには、この値を 1 に設定します。エラーが発生した場合は、エラーメッセージ、タイプ、スタックなどの追加情報を meta プロパティで渡す必要があります。 |
| `meta`       | オブジェクト  | キー/値メタデータのセット。キーと値は文字列でなければなりません。 |
| - `<any-key>` | 文字列 | キー値メタデータの追加のプロパティ。 |
| モニター    | オブジェクト  | キー/値メタデータのセット。キーは文字列、値は 64 ビット浮動小数点数でなければなりません。 |
| - `<any-key>` | double | キー値メトリクスの追加のプロパティ。 |
| name       | 文字列  | スパン名。スパン名の長さは、最大 100 文字です。 |
| `parent_id`  | int64   | 親スパンの整数ID。 |
| `resource`   | 文字列  | トレース対象のリソース。リソース名の長さは、最大 5000 文字です。 |
| `service`    | 文字列  | トレース対象のサービス。サービス名の長さは、最大 100 文字です。 |
| `span_id`    | int64   | スパンの整数 (64 ビット符号なし) ID。 |
| `start`      | int64   | リクエストの開始時間を UNIX Epoch からのナノ秒で指定します。 |
| `trace_id`   | int64 または int128   | このスパンが含まれるトレースの一意の整数 (64 ビット符号なし、または 128 ビット符号なし) ID。 |
| `type`       | enum    | リクエストの種類。`web`、`db`、`cache`、`custom` などの enum 値を許容します。 |


### 例

{{< code-block lang="json" >}}
[
  [
    {
      "duration": 12345,
      "error": "integer",
      "meta": {
        "<any-key>": "string"
      },
      "metrics": {
        "<any-key>": "number"
      },
      "name": "span_name",
      "parent_id": "integer",
      "resource": "/home",
      "service": "service_name",
      "span_id": 987654321,
      "start": 0,
      "trace_id": 123456789,
      "type": "web"
    }
  ]
]
{{< /code-block >}}


## 応答

200
: OK

### 例

{{< tabs >}}

{{% tab "Shell" %}}

{{< code-block lang="curl" >}}
# Curl コマンド
curl -X PUT "http://localhost:8126/v0.3/traces" \
-H "Content-Type: application/json" \
-d @- << EOF
[
  [
    {
      "duration": 12345,
      "name": "span_name",
      "resource": "/home",
      "service": "service_name",
      "span_id": 987654321,
      "start": 0,
      "trace_id": 123456789
    }
  ]
]
EOF
{{< /code-block >}}

{{% /tab %}}

{{% tab "Powershell" %}}
{{< code-block lang="curl" >}}

# Invoke-RestMethod コマンド

$uri = "http://localhost:8126/v0.3/traces"
$headers = @{
    "Content-Type" = "application/json"
}
$body = @"
[
  [
    {
      "duration": 12345,
      "name": "span_name",
      "resource": "/home",
      "service": "service_name",
      "span_id": 987654321,
      "start": 0,
      "trace_id": 123456789
    }
  ]
]
"@

Invoke-RestMethod -Uri $uri -Method Put -Body $body -Headers $headers
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}