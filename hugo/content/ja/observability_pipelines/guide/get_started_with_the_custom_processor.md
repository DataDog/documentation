---
description: Base64 のデコードやエンコードなどの Custom Processor 関数の使用方法を学び、一般的なログ変換のユースケースのスクリプト例を参照します。
disable_toc: false
further_reading:
- link: /observability_pipelines/processors/custom_processor/
  tag: ドキュメント
  text: Custom Processor の詳細はこちら
- link: /observability_pipelines/set_up_pipelines/
  tag: ドキュメント
  text: Pipelines のセットアップ
- link: https://www.datadoghq.com/blog/migrate-historical-logs/
  tag: ブログ
  text: Observability Pipelines を使用して Splunk や Elasticsearch から過去のログを移行する
title: Custom Processor の利用を開始する
---
## 概要 {#overview}

Observability Pipelines を使用すると、ログを送信先に送る前に変換できます。Custom Processor を使用して、ログのフィールド、値、イベントを条件付きで変更するカスタム関数を含むスクリプトを作成します。

このガイドでは、Custom Processor スクリプトで以下の関数を使用する方法を説明します。

- [Base64 をデコードする](#decode-base64)
- [Base64 イベント全体をデコードする](#decode-an-entire-base64-encoded-event)
- [Base64 をエンコードする](#encode-base64)

また、以下のような一般的なユースケースに対応するスクリプト例についても解説します。

- [過去のログのタイムスタンプを再マッピングする](#remap-timestamps-for-historical-logs)
- [Datadog タグ配列からフィールドを抽出する (`ddtags`)](#extract-a-field-from-the-datadog-tags-array)
- [別のフィールドの値を参照する](#reference-another-fields-value)
- [null 値を含む属性を削除する](#remove-attributes-containing-null-values)
- [ネストされた属性をルートレベルにマージする](#merge-nested-attributes-to-root-level)
- [送信ログを _raw 形式でシリアル化する](#serialize-outbound-logs-in-_raw-format)

## Base64 をデコードする {#decode-base64}

Base64 でエンコードされた受信ログフィールドまたはイベントについては、[`decode_base64`][1] 関数を使用してそのフィールドまたはイベントをデコードします。この関数の構文は [`decode_base16`][1] にも使用できます。

### 例 {#example}

#### 入力 {#input}

デコードする Base64 フィールドを含むログイベントの例:

```json
{
    "timestamp": "2025-05-28T19:30:00Z",
    "level": "info",
    "source": "auth-service",
    "user_id": "user_9876",
    "payload": "VXNlciByZXF1ZXN0ZWQgYWNjZXNzIHRvIHByb3RlY3RlZCByZXNvdXJjZQ=="
}
```

#### カスタム関数 {#custom-function}

`decode_base64` 関数を使用して `payload` をデコードし、その結果を `decoded_payload` という新しいフィールドに保存します。

```yaml
.decoded_payload = decode_base64!(.payload)
```


あるいは、前の関数で `decoded_payload`を `payload` に置き換えることで、元の `payload` の値をデコードされた値で上書きすることもできます。

```yaml
.payload = decode_base64!(.payload)
```

#### 出力 {#output}

`decoded_payload` を使用してデコードされた値を保存した場合の出力です。

```json
{
    "timestamp": "2025-05-28T19:30:00Z",
    "level": "info",
    "source": "auth-service",
    "user_id": "user_9876",
    "payload": "VXNlciByZXF1ZXN0ZWQgYWNjZXNzIHRvIHByb3RlY3RlZCByZXNvdXJjZQ==",
    "decoded_payload": "User requested access to protected resource"
}
```

## Base64 エンコードされたイベント全体をデコードする {#decode-an-entire-base64-encoded-event}

### 例 {#example-1}

#### 入力{#input-1}

Base64 でエンコードされたイベントの入力例:

```json
{
    "raw": "eyJ0aW1lc3RhbXAiOiAiMjAyNS0wNS0yOFQxOTozMDowMFoiLCAibGV2ZWwiOiAiaW5mbyIsICJtessagemIjogIlVzZXIgbG9naW4gc3VjY2Vzc2Z1bCJ9"
}
```

#### カスタム関数 {#custom-function-1}

Base64 でエンコードされたイベント全体をデコードするためのスクリプト `raw`。

```yaml
.json_string = decode_base64!(.raw)`
.full_event = parse_json!(.json_string)
. = .full_event
```

**注:** `. = .full_event`という構文は、イベント全体をフィールドの内容で置き換えるための省略形です。

#### 出力 {#output-1}

```json
{
    "timestamp": "2025-05-28T19:30:00Z",
    "level": "info",
    "message": "User login successful"
}
```

## Base64 をエンコードする {#encode-base64}

Base64 でエンコードする送信ログフィールドまたはイベントの場合、[`encode_base64`][2] 関数を使用してフィールドまたはイベントをエンコードします。この関数の構文は [`encode_base16`][3] にも有効です。

### 例 {#example-2}

#### 入力 {#input-2}

Base64 でエンコードしたい `message` フィールドを含むログイベントの例:

```json
{
    "timestamp": "2025-05-28T19:30:00Z",
    "level": "info",
    "source": "auth-service",
    "user_id": "user_9876",
    "message": "User login successful"
}
```

#### カスタム関数 {#custom-function-2}

`encode_base64` 関数を使用して `message` をデコードし、その結果を `encoded_message` という新しいフィールドに保存します。

```yaml
.encoded_message = encode_base64!(.message)
```

あるいは、前の関数の `encoded_message` を `message` に置き換えることで、元のメッセージフィールド (`message`) をデコードされた値で上書きすることもできます。

```yaml
.message = encode_base64!(.message)
```

#### 出力 {#output-2}

`encoded_message` を使用してエンコードされた値を保存する場合の出力。

```json
{
    "timestamp": "2025-05-28T19:30:00Z",
    "level": "info",
    "source": "auth-service",
    "message": "User login successful",
    "encoded_message": "VXNlciBsb2dpbiBzdWNjZXNzZnVs"
}
```

## 過去のログのタイムスタンプを再マッピングする {#remap-timestamps-for-historical-logs}

他のプラットフォームからアーカイブされたログを移行する場合、それらのログが正しい履歴タイムスタンプを持っていることを確認することが不可欠です。履歴タイムスタンプを持つログを再マッピングすることで、コンプライアンス、監査、アーカイブの目的で保存されている古いログを処理できるようになります。

### 例 {#example-3}

#### 入力 {#input-3}

Worker がログ上で `timestamp` フィールドを見つけられない場合、Worker がそのログを受信した時のタイムスタンプが使用されます。これは、Worker がログを受信した時のタイムスタンプと、Worker が検索している値であるログの履歴タイムスタンプ (`historical_ts`) の両方を示すログの例です。

```json
{
    "timestamp": "2025-05-28T19:30:00Z",
    "historical_ts": "2019-03-14T17:30:00Z",
    "level": "info",
    "message": "User login successful"
}
```

#### カスタム関数 {#custom-function-3}

上記の例では、取り込まれたタイムスタンプを新しいフィールドに保存し、`timestamp` を `historical_ts` の値に再マッピングする関数を作成できます。

```yaml
#Create a new field for the ingested/processed timestamp
.ingested_ts = {{.timestamp}}

#Remap timestamp to be the historical field
.timestamp = {{.historical_ts}}

#Remove the original historical timestamp
del(.historical_ts)

```

#### 出力 {#output-3}

```json
{
    "timestamp": "2019-03-14T17:30:00Z",
    "ingested_ts": "2025-05-28T19:30:00Z",
    "level": "info",
    "message": "User login successful"
}
```

## Datadog タグ配列からフィールドを抽出する {#extract-a-field-from-the-datadog-tags-array}

Datadog タグ (`ddtags`) 配列内にネストされたフィールドには有用な情報が含まれている場合があります。これらのフィールドをトップレベルのキーと値のペアとして、または他のフィールドの値として抽出することもできます。

### 例 {#example-4}

#### 入力 {#input-4}

Datadog タグを含む `ddtags` 配列を持つサンプルログ。

```json
{
    "timestamp": "2025-005-27T05:26:18.205Z",
    "status": "info",
    "service": "chaos-engineering",
    "ddsource": "python",
    "hostname": "gke-prod-node-abc123.internal",
    "message": "2025-05-27 05:26:17,609 -- Sending request to rails: checkout_v2",
    "source_type": "datadog_agent",
    "ddtags": [
        "env:prod",
        "team:sre",
        "service:chaos-engineering",
        "version:1.0.0",
        "pod_name:load-generator-main-abcde"
    ]
}
```

#### env フィールドを抽出するカスタム関数 {#custom-function-to-extract-the-env-field}

```yaml
#Extract a tag from ddtags array and elevate as log attribute
.my_tag, err = filter(array!(.ddtags)) -> |_index, value| {
    #Keep any elements that have the key name "env"
    starts_with(value, "env:")
}
#Assign env to be value of the key
.env = split!(.my_tag[0], ":")[1]
del(.my_tag)

```

#### 出力 {#output-4}

```json
{
   "ddsource": "python",
   "ddtags": [
       "env:prod",
       "team:sre",
       "service:chaos-engineering",
       "version:1.0.0",
       "pod_name:load-generator-main-abcde"
   ],
   "env": "prod",
   "hostname": "gke-prod-node-abc123.internal",
   "message": "2025-05-27 05:26:17,609 -- Sending request to rails: checkout_v2",
   "service": "chaos-engineering",
   "source_type": "datadog_agent",
   "status": "info",
   "timestamp": "2025-005-27T05:26:18.205Z"
}
```
## ログイベントにタグを追加する {#add-a-tag-to-the-log-event}

タグは、ログを他のテレメトリやサービスと関連付けるために使用されます。これらは、引用符で囲まれた `key:value` ペアとして配列に格納されます (例: `"service:payments-app"`)。Datadog ログの場合、タグは Datadog タグ (`ddtags`) 配列内にネストされます。既存の属性からタグに変換したり、新しいタグを追加したりするには、以下のスクリプトを使用します。

### 属性をタグに変換する例 {#example-to-convert-an-attribute-to-a-tag}

#### 入力 {#input-5}

この例では、サンプルログに `ddtags` 配列が含まれており、`service` フィールドをタグとして追加するとします。

```json
{
    "timestamp": "2025-005-27T05:26:18.205Z",
    "status": "info",
    "service": "chaos-engineering",
    "ddsource": "python",
    "hostname": "gke-prod-node-abc123.internal",
    "message": "2025-05-27 05:26:17,609 -- Sending request to rails: checkout_v2",
    "source_type": "datadog_agent",
    "ddtags": [
        "env:prod",
        "team:sre",
        "version:1.0.0",
        "pod_name:load-generator-main-abcde"
    ]
}
```

#### `service` 属性をタグに変換するカスタム関数 {#custom-function-to-convert-the-service-attribute-to-a-tag}

```yaml
# First, check if the attribute 'ddtags' exists. You can replace 'ddtags' with the name of any array
if !exists(.ddtags) {
    .ddtags = []
}

# This example checks if 'service' exists, then adds the templatized value of service as a tag. Also, it converts the service value to a string
if exists(.service) {
  .ddtags = push(array!(.ddtags), "service:" + to_string!({{.service}}) )
}

```

#### 出力 {#output-5}

```json
{
    "timestamp": "2025-005-27T05:26:18.205Z",
    "status": "info",
    "service": "chaos-engineering",
    "ddsource": "python",
    "hostname": "gke-prod-node-abc123.internal",
    "message": "2025-05-27 05:26:17,609 -- Sending request to rails: checkout_v2",
    "source_type": "datadog_agent",
    "ddtags": [
        "env:prod",
        "team:sre",
        "version:1.0.0",
        "pod_name:load-generator-main-abcde"
    ]
}
```
### タグを作成して追加する例 {#example-to-create-and-add-a-tag}

#### 入力 {#input-6}

この例では、サンプルログに `ddtags` 配列が含まれており、`"system:service-mesh"` というタグを作成してその配列に追加するとします。

```json
{
    "timestamp": "2025-005-27T05:26:18.205Z",
    "status": "info",
    "service": "chaos-engineering",
    "ddsource": "python",
    "hostname": "gke-prod-node-abc123.internal",
    "message": "2025-05-27 05:26:17,609 -- Sending request to rails: checkout_v2",
    "source_type": "datadog_agent",
    "ddtags": [
        "env:prod",
        "team:sre",
        "version:1.0.0",
        "pod_name:load-generator-main-abcde"
    ]
}
```

#### `system` タグを作成して追加するカスタム関数 {#custom-function-to-create-and-add-the-system-tag}

```yaml
# First, check if the attribute 'ddtags' exists. You can replace 'ddtags' with the name of any array
if !exists(.ddtags) {
    .ddtags = []
}

# Appends a new tag to the array by defining a separate key:value pair
.ddtags = push(array!(.ddtags), "system:service-mesh")

```

#### 出力 {#output-6}

```json
{
	"ddsource": "python",
	"ddtags": [
		"env:prod",
		"team:sre",
		"version:1.0.0",
		"pod_name:load-generator-main-abcde",
		"system:service-mesh"
	],
	"hostname": "gke-prod-node-abc123.internal",
	"message": "2025-05-27 05:26:17,609 -- Sending request to rails: checkout_v2",
	"service": "chaos-engineering",
	"source_type": "datadog_agent",
	"status": "info",
	"timestamp": "2025-005-27T05:26:18.205Z"
}
```

## 別のフィールドの値を参照する {#reference-another-fields-value}

別のフィールドの値をベースにしてフィールドの値を決めたい場合は、その別のフィールドの値を動的に参照できます。

### 例 {#example-5}

#### 入力 {#input-7}

この例では、サービスフィールドに誤ったサービス名が含まれており、代わりに `app_id` の値を使用するとします。

```json
{
    "timestamp": "2025-05-27T05:26:18.205Z",
    "status": "info",
    "service": "mywrongservice",
    "app_id": "web-store"
}
```

#### カスタム関数 {#custom-function-4}

```yaml
#Overwrite service to be the value of app_id
.service = {{.app_id}}
```

#### 出力 {#output-7}

```json
{
  "timestamp": "2025-05-27T05:26:18.205Z",
  "status": "info",
  "service": "web-store",
  "app_id": "web-store"
}
```

## null 値を含む属性を削除する {#remove-attributes-containing-null-values}

null 値や空の値を持つ属性は、ログの肥大化を招く可能性があります。null 値を削除してログを整理し、情報を提供する属性のみを送信するようにします。以下のスクリプトの `empty_patterns` セクションには、ログ内でチェックする空白のパターンのリストが含まれます。ユースケースに合わせてパターンを追加および削除できます。

```json
# Define your empty patterns
empty_patterns = ["null", "NULL", "N/A", "n/a", "none", "NONE", "-", "undefined"]

# Apply generic cleanup
. = compact(map_values(., recursive: true) -> |v| {
 if is_null(v) ||
    includes(empty_patterns, v) ||
    (is_string(v) && strip_whitespace!(v) == "") ||
    (is_array(v) && length!(v) == 0) ||
    (is_object(v) && length!(v) == 0) {
   null
 } else {
   v
 }
})
```

## ネストされた属性をルートレベルにマージする {#merge-nested-attributes-to-root-level}

フィルタクエリでネストされたオブジェクトやフィールドをターゲットにする場合、複数のパスを定義する必要があるかもしれません。これはメッセージフィールドを扱う際によくあることで、解析された結果の内容はオブジェクト内にネストされます。Observability Pipelines のフィルタ構文を使用する場合、ネストされたフィールドにアクセスするには `<OUTER_PATH>.<INNER_PATH>` 表記が必要です。

例えば、このログには文字列化された JSON メッセージが含まれます。

```json
{
 "level": "info",
 "message": "{\"event_type\":\"user_login\",\"result\":\"success\",\"login_method\":\"oauth\",\"user_agent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36\",\"ip_address\":\"192.168.1.100\",\"session_id\":\"sess_abc123xyz\",\"duration_ms\":245}",
 "timestamp": "2019-03-12T11:30:00Z",
 "processed_ts": "2025-05-22T14:30:00Z",
 "user_id": "12345",
 "app_id": "streaming-services",
 "ddtags": [
   "kube_service:my-service",
   "k8_deployment:your-host",
   "kube_cronjob:myjob"
 ]
}
```

これは `message` フィールドが解析された後の出力です。解析されたコンテンツは `message` オブジェクト内にネストされています。

```json
{
   "app_id": "streaming-services",
   "ddtags": [
       "kube_service:my-service",
       "k8_deployment:your-host",
       "kube_cronjob:myjob"
   ],
   "level": "info",
   "message": {
       "duration_ms": 245,
       "event_type": "user_login",
       "ip_address": "192.168.1.100",
       "login_method": "oauth",
       "result": "success",
       "session_id": "sess_abc123xyz",
       "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
   },
   "processed_ts": "2025-05-22T14:30:00Z",
   "timestamp": "2019-03-12T11:30:00Z",
   "user_id": "12345"
}
```
この場合、`event_type` をフィルタリングするには、`@message.event_type` を指定する必要があります。`event_type` やオブジェクト内の他のフィールドを直接フィルタリングするために、Datadog ではオブジェクトをルートレベルにフラット化することを推奨しています。

`message` オブジェクトのイベントをルートレベルにマージするには、次のスクリプトを使用します。

```json
if is_object(.message) {
 . = merge!(., .message)
 del(.message)
}
```

**注**: このスクリプトは、あらゆる JSON オブジェクトで機能します。`message` 属性を、フラット化しようとしているフィールドの名前に置き換えるだけです。

その結果、属性がフラット化されたログが得られ、直接フィルタリングできます。

```json
{
   "app_id": "streaming-services",
   "ddtags": [
       "kube_service:my-service",
       "k8_deployment:your-host",
       "kube_cronjob:myjob"
   ],
   "duration_ms": 245,
   "event_type": "user_login",
   "ip_address": "192.168.1.100",
   "level": "info",
   "login_method": "oauth",
   "processed_ts": "2025-05-22T14:30:00Z",
   "result": "success",
   "session_id": "sess_abc123xyz",
   "timestamp": "2019-03-12T11:30:00Z",
   "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
   "user_id": "12345"
}
```

**注**: メッセージフィールドをフラット化すると、結果として得られるログにはメッセージオブジェクトが含まれなくなります。つまり、ログが Datadog に送信された場合、Log Explorer でログを表示しても、ログサイドパネルに {{< ui >}}Log Message{{< /ui >}} セクションは表示されません。

## 送信ログを _raw 形式でシリアル化する {#serialize-outbound-logs-in-raw-format}

Splunk および CrowdStrike は、ログの取り込みに `_raw` と呼ばれる形式を推奨しています。`_raw` でデータを送信すると、ログが正規化され、すぐに利用可能なダッシュボード、モニター、脅威検知コンテンツを活用できるようになります。`_raw` ログ形式が確実に適用されるようにするには、送信イベントを `_raw` でシリアル化します。

**注**:
- ログを `_raw` 形式でシリアル化する前に、他の処理、再マッピング、およびパースのステップを追加する必要があります。
- シリアル化後にログが正しくルーティングされるように、エンコーディングタイプとして {{< ui >}}Raw{{< /ui >}} を使用し、優先する送信先を設定します。

入力ログの例:

```json
{
   "app_id": "streaming-services",
   "level": "info",
   "message": {
       "duration_ms": 245,
       "event_type": "user_login",
       "ip_address": "192.168.1.100",
       "login_method": "oauth",
       "result": "success",
       "session_id": "sess_abc123xyz",
       "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
   },
   "processed_ts": "2025-05-22T14:30:00Z",
   "timestamp": "2019-03-12T11:30:00Z",
   "user_id": "12345"
}
```

このカスタム関数は、イベントを `_raw` 形式にシリアル化します。

```json
# Serialize the entire event into _raw
._raw = encode_key_value!(.)
# Only keep _raw
. = { "_raw": ._raw }
```

これは、カスタムスクリプトによって処理された後のログ例の出力です。

```json
{
   "_raw": "app_id=streaming-services level=info message.duration_ms=245 message.event_type=user_login message.ip_address=192.168.1.100 message.login_method=oauth message.result=success message.session_id=sess_abc123xyz message.user_agent=\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36\" processed_ts=2025-05-22T14:30:00Z timestamp=2019-03-12T11:30:00Z user_id=12345"
}
```

## 詳細情報 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/observability_pipelines/processors/custom_processor/#decode_base16
[2]: /ja/observability_pipelines/processors/custom_processor/#encode_base64
[3]: /ja/observability_pipelines/processors/custom_processor/#encode_base16