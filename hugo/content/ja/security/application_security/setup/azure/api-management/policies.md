---
description: Azure API Management ポリシーがどのように App and API Protection のコールアウトサービスを呼び出し、ブロックの決定を適用し、トレースコンテキストを伝播させるかを理解します。
further_reading:
- link: /security/application_security/setup/azure/api-management
  tag: ドキュメント
  text: Azure API Management 向けの App and API Protection の有効化
- link: /security/application_security/setup/azure/api-management/configuration
  tag: ドキュメント
  text: Azure API Management コールアウトの構成
- link: https://learn.microsoft.com/en-us/azure/api-management/send-request-policy
  tag: ドキュメント
  text: Azure API Management の send-request ポリシー
- link: https://github.com/DataDog/dd-trace-go/tree/main/contrib/azure/apim-callout
  tag: ソースコード
  text: App and API Protection Azure API Management コールアウトのソース
title: App and API Protection 向けの Azure API Management ポリシー
---
{{< callout url="#" btn_hidden="true" header="Azure API Management 向けの App and API Protection はプレビュー版です" >}}
Azure API Management 向けの App and API Protection のプレビューを試すには、以下のセットアップ手順を使用してください。
{{< /callout >}}

Azure API Management (APIM) 向けの App and API Protection インテグレーションでは、ネイティブの APIM [`send-request`][1] ポリシーを使用して Datadog コールアウトサービスを呼び出し、ポリシー変数から決定を読み取ります。

[`deploy/azure/policies`][2] には、3 つのポリシー文書が提供されています。

| ファイル                       | 内容                                              |
|----------------------------|-------------------------------------------------------|
| `azure-apim-full.xml`      | 両方のセクションを含む完全なポリシー文書です。    |
| `azure-apim-inbound.xml`   | インバウンドセクションのみです。                            |
| `azure-apim-outbound.xml`  | アウトバウンドセクションのみです。                           |

新しいポリシーには、完全な文書を使用してください。すでにポリシーコンテンツがある場合は、インバウンドおよびアウトバウンドのフラグメントを使用して、Datadog のステージを対応するセクションにマージしてください。

## ポリシーの適用 {#applying-the-policy}

Azure API Management は、グローバル、ワークスペース、製品、API、およびオペレーションの各スコープでポリシーを評価し、`<base />` はそれらのスコープ間の継承と順序の両方を制御します。保護するスコープ (すべての API、単一の製品、1 つの API、または 1 つのオペレーション) に Datadog ポリシーをアタッチします。

このポリシーには、プレースホルダー URL `https://<dd-apim-callout-host>:8080` が付属しています。適用する前に、その URL 全体をデプロイメントの `calloutBaseUrl` 出力に置き換えてください。`enableHttps` を `true` に設定しない限り、その出力は `http://<ACA-FQDN>` であり、ポート番号は含まれないため、ホスト名だけではなく URL 全体を置き換えてください。`deployPolicy` を `true` に設定すると、デプロイメントによって同様の置換が実行され、`targetApiIds` パラメーターによってそのポリシーを適用する API が選択されます。

`azure-apim-full.xml`は、4 つのセクションそれぞれに `<base />` 要素を含んでいます。APIM はグローバルスコープでそれらを拒否するため、ファイルをすべての API に適用する場合は、最初にすべての `<base />` 要素を削除してください。製品、API、またはオペレーションにポリシーを適用する場合は、それらを保持してください。これらは、囲んでいるスコープからの継承を制御するためです。デプロイメントには同様のルールが適用されます。つまり、すべての API を対象とするデプロイメントでは該当する要素が除外されますが、`targetApiIds` で特定の API が指定されている場合にはそれらが保持されます。

ポリシーの形式は次のとおりです。

```xml
<policies>
  <inbound>
    <base />
    <!-- Phase 1: serialize request headers, call the service, read the decision -->
    <!-- Phase 2 (conditional): send the request body when the service asks for it -->
    <!-- If blocked: return-response. Otherwise: inject x-datadog-* headers -->
  </inbound>
  <backend>
    <base />
  </backend>
  <outbound>
    <base />
    <!-- Phase 3: serialize response headers, call the service, read the decision -->
    <!-- Phase 4 (conditional): send the response body when the service asks for it -->
    <!-- If blocked: return-response -->
  </outbound>
  <on-error>
    <base />
  </on-error>
</policies>
```

## コールアウトの仕組み{#how-the-callout-works}

すべてのコールアウトは、`mode="new"`、`timeout="3"`、および`ignore-error="true"` を持つ `send-request` です。各コールアウトは、`application/json` をコールアウトサービスにポストします。ポリシーは、各レスポンスを `ddPhase1Response` から `ddPhase4Response` に、対応するパース済みの JSON ボディを `ddPhase1` から `ddPhase4` に格納します。

この交換には 4 つのフェーズがあります。

1. **リクエストヘッダー**ポリシーは、リクエストメソッド、スキーム、オーソリティ、クエリ文字列を含むパス、クライアント IP アドレス、およびヘッダーをシリアル化してから、それらをポストします。そのサービスは、リクエスト ID、トレース伝播ヘッダー、およびボディ検査が適用される場合は許容されるボディサイズを返します。ポリシーは、リクエスト ID を変数 `ddRequestId` に格納します。
2. **リクエスト本文**フェーズ 1 が許容されるボディサイズを返した場合にのみ実行されます。このポリシーは、リクエストボディを Base64 エンコードし、指定されたサイズに切り詰めた上で、リクエスト ID と共にポストします。
3. **レスポンスヘッダー**このポリシーは、リクエスト ID とともにレスポンスステータスコードとヘッダーをポストします。
4. **レスポンスボディ**フェーズ 3 が許容可能なボディサイズを返した場合にのみ実行され、フェーズ 2 と同様にボディを処理します。

リクエスト ID は、これら 4 つのフェーズすべてを単一の Datadog Web Application Firewall (WAF) 評価コンテキストに結び付けます。コールアウトサービスは、そのコンテキストをインメモリキャッシュに保持します。このキャッシュの有効期限 (TTL) はデフォルトで 30 秒であり、`DD_APIM_CALLOUT_REQUEST_TIMEOUT` によって設定されます。コンテキストはフェーズ 1 で作成され、フェーズ間では保持され、最終フェーズまたはブロックの終了後に解放されます。

## ブロック{#blocking}

WAF がブロックを決定すると、コールアウトサービスは `block` オブジェクトで応答します。

```json
{
  "block": {
    "status": 403,
    "headers": { "Content-Type": ["application/json"] },
    "content": "<base64-encoded body>"
  }
}
```

ポリシーは `block` を検出し、`return-response` を呼び出してステータスコードを送信し、`block.headers` から `Content-Type` を設定し (存在しない場合はデフォルトで `application/json`)、`block.content` を Base64 デコードしてボディを書き込みます。

`return-response` はパイプラインの残りをキャンセルするため、インバウンドフェーズ中にブロックが発生すると、バックエンドは呼び出されません。

## フェイルオープン動作{#fail-open-behavior}

すべての障害パスでトラフィックの通過が許可されます。

| シナリオ                                                     | 結果                                                                                              |
|--------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| コールアウトサービスに到達できない、または呼び出しがタイムアウトした    | `ignore-error="true"` レスポンス変数は設定されない。ポリシーはチェックをスキップし、トラフィックは継続する。|
| コールアウトが次のステータス以外で応答した `200`           | ポリシーは結果を許可として扱い、トラフィックは継続する。                                       |
| コールアウトサービスが不正な JSON を受信した                            | コールアウトサービスは `400` を含む `{}` を返し、ポリシーは結果を許可として扱う。                              |
| 後のフェーズでリクエスト ID が不明である                   | コールアウトサービスは `{}`を含む `200` で応答し、ブロックは適用されない。                                       |
| WAF がタイムアウトした、またはプロセッサがエラーを報告した         | サービスは `{}` を含む `200` を返し、ブロックは適用されない。                                       |
| キャッシュされたリクエストの状態が有効期限を超過した| 孤立した状態が解放され、トラフィックは継続される。                                              |

すべての障害パスでトラフィックが通過可能であるため、設定ミスはトラフィックの途絶ではなく、セキュリティデータの欠落として現れます。シグナルが欠落している場合は、以下をチェックしてください。

1. ポリシーは、トラフィックを送信している API に、それが適用されるスコープでアタッチされています。
2. ポリシーは正しい URL を呼び出しています。`set-url` の値を、スキームとポートを含めたデプロイメントの `calloutBaseUrl` 出力と比較してください。
3. ゲートウェイはその URL でコールアウトサービスに到達できます。決して届かないコールアウトは、`ignore-error="true"` によって隠されるため、ポリシーにトレースを残しません。
4. コールアウトサービスのログには、着信リクエストが記録されています。そうでない場合、ゲートウェイはそこに到達できていません。
5. コールアウトサービスはポート `8126` で Datadog Agent に到達でき、Agent の `DD_APM_ENABLED` と `DD_APM_NON_LOCAL_TRAFFIC` は `true` に設定されています。これらが設定されていないと、サービスはトラフィックを評価しますが、Datadog には何も届きません。

`set-body` を使用した JSON ボディの構築とレスポンス変数のパースにはそれぞれ 0.1 ミリ秒未満、条件評価には 0.01 ミリ秒未満かかります。主なコストは、コールアウトサービスへのネットワーク往復時間です。

## トレースコンテキスト伝搬 {#trace-context-propagation}

リクエストが許可されると、フェーズ 1 は伝播ヘッダーを返し、ポリシーはそれをリクエストに挿入してからバックエンドに転送します。

- `x-datadog-trace-id`
- `x-datadog-parent-id`
- `x-datadog-sampling-priority`
- `x-datadog-origin`
- `x-datadog-tags`

バックエンドへのリクエストにこれらのヘッダーが存在することは、インバウンドポリシーが実行され、そのリクエストが許可されたことを裏付けています。

## Datadog でのインテグレーションの特定{#identifying-the-integration-in-datadog}

コールアウトサービスは APM で `apim-callout` サービスとして表示され、そのスパンにはタグ `component:apim-callout` が付与されます。別のサービス名を使用するには、コールアウトコンテナで `DD_SERVICE` を設定してください。

WAF がリクエストに一致すると、スパンには`appsec.event`、`appsec.blocked`、`http.client_ip` を含む App and API Protection タグも付与されます。

クライアントの IP アドレスは、ポリシーがフェーズ 1 で送信する値から取得されます。APIM の前に別のプロキシが存在する場合でも、その値によって `http.client_ip` が設定されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/en-us/azure/api-management/send-request-policy
[2]: https://github.com/DataDog/dd-trace-go/tree/main/contrib/azure/apim-callout/deploy/azure/policies