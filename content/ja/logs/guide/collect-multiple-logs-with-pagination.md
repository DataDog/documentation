---
title: ページ区切りで複数のログを収集する
further_reading:
  - link: /logs/log_configuration/processors
    tag: ビデオ
    text: ログの処理方法について
  - link: /logs/log_configuration/parsing
    tag: ビデオ
    text: パースの詳細
  - link: /logs/live_tail/
    tag: ビデオ
    text: Datadog Live Tail 機能
  - link: /logs/explorer/
    tag: ビデオ
    text: ログの調査方法
  - link: /logs/logging_without_limits/
    tag: ビデオ
    text: 無制限のロギング*
---
## 概要

[ログ API][1] によって返される最大 1000 個のログ制限より長いログリストを取得するには、ページ区切り機能を使用する必要があります。

{{< tabs >}}

{{% tab "V1 API" %}}

まず、クエリを作成して、特定のコンテキスト、たとえば設定されたタイムフレームでの特定のクエリのログを取得します。

```bash
curl -X POST https://api.datadoghq.com/api/v1/logs-queries/list \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_CLIENT_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_CLIENT_APP_KEY}" \
-d '{
        "limit": 50,
        "query": "*",
        "sort": "desc",
        "time": {
            "from": "2019-08-06T00:00:00Z",
            "to": "2019-08-07T00:00:00Z"
        }
    }'
```

結果例:

```json
{
  "logs": ["(...)"],
  "nextLogId": "AAAAAAAAAAAAAAAABBBBBBBBBBBBBBCCCCCCCCCCDDDDDDDDDD",
  "status": "done",
  "requestId": "cDdWYB0tAm1TYHFsQVZ2R05QWm9nQXx5cFM4aExkLVFPNlhZS21RTGxTUGZ3"
}
```

`logs` パラメーターは Log オブジェクトの配列であり、最大でクエリの `limit` パラメーターで定義された数のログが含まれます。このパラメーターはデフォルトで `50` ですが、最大 `1000` に設定できます。クエリに一致したログの量が  `limit` より大きい場合、`nextLogId` パラメーターは `null` と等しくなりません。

**`nextLogId` パラメーターが `null` 以外の値を返す場合、入力したクエリが、返されたものよりも多くのログに一致したことを示します**。

ログの次のページを取得するにはクエリを再送信しますが、今回は、前の呼び出しから `nextLogId` 値を取得する `startAt` パラメーターを使用します。

```bash
curl -X POST https://api.datadoghq.com/api/v1/logs-queries/list \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_CLIENT_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_CLIENT_APP_KEY}" \
-d '{
        "limit": 1000,
        "query": "*",
        "startAt": "AAAAAAAAAAAAAAAABBBBBBBBBBBBBBCCCCCCCCCCDDDDDDDDDD",
        "sort": "desc",
        "time": {
            "from": "2019-08-06T00:00:00Z",
            "to": "2019-08-07T00:00:00Z"
        }
    }'
```

これは次の結果を返します。

```json
{
  "logs": ["(...)"],
  "nextLogId": "EEEEEEEEEEEEEEEEFFFFFFFFFFFFFFGGGGGGGGGGHHHHHHHHHH",
  "status": "done",
  "requestId": "YVhETk5jQy1TQkDFSFjqU3fhQMh5QXx6M2pSUlA1ODhXNk5PT2NOSUVndThR"
}
```

ログのすべてのページを見るには、`startAt` パラメーターが前の呼び出しから `nextLogId` 値を取得するクエリを再送信し続けます。`nextLogId` が `null` を返したら、クエリに関連付けられたログのすべてのページが返ったことになります。

**注**: ページ区切りの結果をより適切に制御するには、絶対的な `time` パラメーターを使用します。`now` キーワードは使用しないでください。

{{% /tab %}}

{{% tab "V2 API" %}}
まず、クエリを作成して、特定のコンテキスト、たとえば設定されたタイムフレームでの特定のクエリのログを取得します。

```bash
curl -X POST https://api.datadoghq.com/api/v2/logs/events/search \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_CLIENT_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_CLIENT_APP_KEY}" \
-d '{
      "filter": 
              {
                "from": "2019-08-06T00:00:00Z",
                "to": "2019-08-07T00:00:00Z",
                "query": "@datacenter:us @role:db"
               },
      "page":  
              {
                  "limit":50   
        }
}'
```
結果例:

```json
{
  "meta": {
    "page": {
      "after": "eyJhZnRlciI6IkFRQUFBWE4tV0ZVbzZFRGRnZ0FBQUFCQldFNHRWMFpwVG1jelgwRTJURjlaVjBGQlFRIn0"
    }
  },
  "data": [
    {
      "attributes": {"..."},
      "id": "AQAAAXN-WFUo6EDdggAAAABBWE4tV0ZpTmczX0E2TF9ZV0FBQQ",
      "type": "log"
    }
  ],
  "links": {
    "next": "https://api.datadoghq.com/api/v2/logs/events?filter%5Bto%5D=1595552587369&page%5Bcursor%5D=eyJhZnRlciI6IkFRQUFBWE4tV0ZVbzZFRGRnZ0FBQUFCQldFNHRWMFpwVG1jelgwRTJURjlaVjBGQlFRIn0&page%5Blimit%5D=1&filter%5Bfrom%5D=1595552579929"
  }
}
```
`data` パラメーターは Log オブジェクトの配列であり、最大でクエリの `limit` パラメーターで定義された数のログが含まれます。このパラメーターはデフォルトで `50` ですが、最大 `1000` に設定できます。

ログの次のページを見るには、前の呼び出しから `after` 値を取得する `cursor` パラメーターを含めてクエリを再送信し続けます。`data` が `null` を返したら、クエリに関連付けられたログのすべてのページが返ったことになります。

```bash
curl -X POST https://api.datadoghq.com/api/v2/logs/events/search \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_CLIENT_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_CLIENT_APP_KEY}" \
-d '{
      "filter": 
              {
                "from": "2019-08-06T00:00:00Z",
                "to": "2019-08-07T00:00:00Z",
                "query": "@datacenter:us @role:db"
               },
      "page":  
              {
                  "cursor": "eyJhZnRlciI6IkFRQUFBWE4tV0ZVbzZFRGRnZ0FBQUFCQldFNHRWMFpwVG1jelgwRTJURjlaVjBGQlFRIn0",
                  "limit": 50   
        }
}'
```
これは次の結果を返します。

```json
{
  "meta": {
    "page": {
      "after": "eyJhZnRlciI6IkFRQUFBWE4tV0VsdzZFRGRnUUFBQUFCQldFNHRWMFV5UzJjelgwRTJURjlaY1d0QlFRIn0"
    }
  },
  "data": [
    {
      "attributes": {"..."},
      "id": "AQAAAXN-WElw6EDdgQAAAABBWE4tV0UyS2czX0E2TF9ZcWtBQQ",
      "type": "log"
    }
  ],
  "links": {
    "next": "https://api.datadoghq.com/api/v2/logs/events?filter%5Bto%5D=1595552587369&page%5Bcursor%5D=eyJhZnRlciI6IkFRQUFBWE4tV0VsdzZFRGRnUUFBQUFCQldFNHRWMFV5UzJjelgwRTJURjlaY1d0QlFRIn0&page%5Blimit%5D=10&filter%5Bfrom%5D=1595552579929"
  }
}
```

{{% /tab %}}

{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

*Logging without Limits は Datadog, Inc. の商標です。

[1]: /ja/api/v1/logs/#get-a-list-of-logs