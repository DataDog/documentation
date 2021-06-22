---
title: Apigee
name: apigee
kind: インテグレーション
description: Apigee プロキシログを収集して、エラー、リクエスト応答時間、期間、レイテンシーを追跡し、1 つの場所に集約されたプロキシのパフォーマンスと問題を監視します。
short_description: Apigee ログを収集して、エラー、リクエスト応答時間などを追跡
dependencies:
  - 'https://github.com/DataDog/documentation/blob/master/content/en/integrations/apigee.md'
categories:
  - ログの収集
doc_link: /integrations/apigee/
aliases:
  - /ja/logs/log_collection/apigee
has_logo: true
integration_title: Apigee
is_public: true
public_title: Datadog-Apigee
further_reading:
  - link: logs/
    tag: Documentation
    text: ログ管理
integration_id: apigee
---
## 概要

Apigee プロキシログを収集して、エラー、応答時間、期間、レイテンシーを追跡し、1 つの場所に集約されたプロキシのパフォーマンスと問題を監視します。

## セットアップ

#### ログの収集


Apigee の [JavaScript ポリシー][1]を使用して、Apigee プロキシログを Datadog に送信します。

JavaScript は、必須のフロー変数を Datadog のログ属性としてキャプチャするように構成されています。属性は、[標準属性のリスト][2]に従って名前が付けられます。

##### Apigee ログを Datadog に送信するように JavaScript ポリシーを設定する
1. Datadog にログを送信する Apigee プロキシを選択します。
2. 選択したプロキシの概要ページで、右上隅にある 'DEVELOP' タブをクリックします。

{{< img src="integrations/apigee/apigee_develop.png" alt="Develop"  style="width:75%;">}}

3. 'Navigator' で、新しい JavaScript ポリシーを追加します。次に、'Resources --> jsc' ドロップダウンで作成された JavaScript ファイルを編集します。
4. 次の JavaScript コードスニペットを追加します。必ず `dd_api_url` 変数に Datadog **API KEY** を設定してください。

```
// ここに Datadog API URL を設定します。
// 注: Datadog EU サイト (app.datadoghq.eu) にいる場合、HTTP ログエンドポイントは http-intake.logs.datadoghq.eu です。
var dd_api_url = "https://http-intake.logs.datadoghq.com/v1/input/<API_KEY>?ddsource=apigee";

// デバッグ
// print(dd_api_url);
// print('フローの名前: ' + context.flow);

// クライアント、ターゲット、合計の応答時間を計算します
var request_start_time = context.getVariable('client.received.start.timestamp');
var request_end_time = context.getVariable('client.received.end.timestamp');
var system_timestamp = context.getVariable('system.timestamp');
var target_start_time = context.getVariable('target.sent.start.timestamp');
var target_end_time = context.getVariable('target.received.end.timestamp');
var total_request_time = system_timestamp - request_start_time;
var total_target_time = target_end_time - target_start_time;
var total_client_time = total_request_time - total_target_time;
var timestamp = crypto.dateFormat('YYYY-MM-dd HH:mm:ss.SSS');
var organization = context.getVariable("organization.name");
var networkClientIP = context.getVariable("client.ip");
var httpPort = context.getVariable("client.port");
var environment = context.getVariable("environment.name");
var apiProduct = context.getVariable("apiproduct.name");
var apigeeProxyName = context.getVariable("apiproxy.name");
var apigeeProxyRevision = context.getVariable("apiproxy.revision");
var appName = context.getVariable("developer.app.name");
var httpMethod = context.getVariable("request.verb");
var httpUrl = '' + context.getVariable("client.scheme") + '://' + context.getVariable("request.header.host") + context.getVariable("request.uri");
var httpStatusCode = context.getVariable("message.status.code");
var statusResponse = context.getVariable("message.reason.phrase");
var clientLatency = total_client_time;
var targetLatency = total_target_time;
var totalLatency = total_request_time;
var userAgent = context.getVariable('request.header.User-Agent');
var messageContent = context.getVariable('message.content');


// Datadog ログ属性
var logObject = {
    "timestamp": timestamp,
    "organization": organization,
    "network.client.ip": networkClientIP,
    "env": environment,
    "apiProduct": apiProduct,
    "apigee_proxy.name": apigeeProxyName,
    "apigee_proxy.revision": apigeeProxyRevision,
    "service": appName,
    "http.method": httpMethod,
    "http.url": httpUrl,
    "http.status_code": httpStatusCode,
    "http.port": httpPort,
    "status": statusResponse,
    "clientLatency": clientLatency,
    "targetLatency": targetLatency,
    "totalLatency": totalLatency,
    "http.client.start_time_ms": request_start_time,
    "http.client.end_time_ms": request_end_time, 
    "http.useragent": userAgent,
    "message": messageContent,
};


var headers = {
 'Content-Type': 'application/json'
};


// デバッグ
// print('ロギングオブジェクト' + JSON.stringify(logObject));
var myLoggingRequest = new Request(dd_api_url, "POST", headers, JSON.stringify(logObject));

// Datadog にログを送信します
httpClient.send(myLoggingRequest);
```

**注**: 公式の [Apigee フロー変数のドキュメント][3]から JavaScript にさらにフロー変数を追加します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.apigee.com/api-platform/reference/policies/javascript-policy
[2]: https://docs.datadoghq.com/ja/logs/processing/attributes_naming_convention/#naming-conventions
[3]: https://docs.apigee.com/api-platform/reference/variables-reference
[4]: /ja/help/