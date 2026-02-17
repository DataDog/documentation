---
aliases:
- /ja/logs/log_collection/apigee
- /ja/integrations/apigee
description: Apigee プロキシログを収集して、エラー、リクエスト応答時間、期間、レイテンシーを追跡し、1 つの場所に集約されたプロキシのパフォーマンスと問題を監視します。
further_reading:
- link: https://docs.apigee.com/api-platform/reference/policies/javascript-policy
  tag: Apigee
  text: Apigee JavaScript ポリシー
- link: logs/
  tag: ドキュメント
  text: Log Management
integration_id: apigee
name: apigee
short_description: Apigee ログの収集
title: Apigee
---

## 概要

Apigee プロキシログを収集して、エラー、応答時間、期間、レイテンシー、モニターパフォーマンス、プロキシの問題を追跡します。

## セットアップ

### ログ収集

{{% site-region region="us,eu" %}}
Apigee のログを収集する方法は 2 つあります。

1. Apigee の [JavaScript ポリシー][1]を使用して Datadog にログを送信します。
2. すでに syslog サーバーをお持ちの場合は、Apigee [MessageLogging ポリシー][2]タイプを使用して syslog アカウントにログを記録します。

#### Syslog パラメーター

API の syslog パラメーターで MessageLogging ポリシータイプを使用し、カスタムメッセージを syslog にログ出力します。以下の例では、`<site_intake_endpoint>` を {{< region-param key="web_integrations_endpoint" code="true" >}} に、`<site_port>` を {{< region-param key="web_integrations_port" code="true" >}} で置き換えてください。

```json
<MessageLogging name="LogToSyslog">
    <DisplayName>datadog-logging</DisplayName>
    <Syslog>
        <Message><YOUR API KEY> test</Message>
        <Host><site_intake_endpoint></Host>
        <Port><site_port></Port>
        <Protocol>TCP</Protocol>
    </Syslog>
    <logLevel>ALERT</logLevel>
</MessageLogging>
```

[1]: https://cloud.google.com/apigee/docs/api-platform/reference/policies/javascript-policy?hl=en
[2]: https://cloud.google.com/apigee/docs/api-platform/reference/policies/message-logging-policy

{{% /site-region %}}
#### JavaScript ポリシー

Apigee の JavaScript ポリシーを使用して Apigee プロキシのログを Datadog に送信します。詳細については [Apigee のドキュメント][1] を参照してください。

1. Datadog にログを送信する Apigee プロキシを選択します。
2. 選択したプロキシの概要ページで、**DEVELOP** タブをクリックします。
3. **New Script** を選択します。
4. JavaScript を選択し、[Apigee フロー変数リファレンス][4]に記載のフロー変数を JavaScript に追加します。

{{% collapse-content title="JavaScript のサンプルコード" level="h4" expanded=false %}}

以下の JavaScript サンプルコードを参照してください。`dd_api_url` 変数内の `<DATADOG_API_KEY>` をご自身の [Datadog API キー][3] に置き換えてください。JavaScript は、主要なフロー変数を Datadog のログ属性として取得するように構成されています。属性名は標準属性の一覧に従って命名されています。

```
// ここで Datadog API の URL を設定します。
var dd_api_url = "https://http-intake.logs.{{< region-param key="dd_site" code="true" >}}/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&ddsource=apigee";

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
var statusResponse = context.getVariable("response.reason.phrase");
var clientLatency = total_client_time;
var targetLatency = total_target_time;
var totalLatency = total_request_time;
var userAgent = context.getVariable('request.header.User-Agent');
var messageContent = context.getVariable('message.content');

// Datadog のログ属性
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
// print('ログオブジェクト' + JSON.stringify(logObject));

var myLoggingRequest = new Request(dd_api_url, "POST", headers, JSON.stringify(logObject));

// Datadog にログを送信します
httpClient.send(myLoggingRequest);
```

{{% /collapse-content %}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.apigee.com/api-platform/reference/policies/javascript-policy
[2]: /ja/logs/log_configuration/attributes_naming_convention/#standard-attributes
[4]: https://docs.apigee.com/api-platform/reference/variables-reference
[5]: /ja/help/
[3]: https://app.datadoghq.com/organization-settings/api-keys