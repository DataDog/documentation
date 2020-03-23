---
title: ブラウザログ収集
kind: documentation
aliases:
  - /ja/logs/log_collection/web_browser
further_reading:
  - link: 'https://www.npmjs.com/package/@datadog/browser-logs'
    tag: NPM
    text: '@datadog/browser-logs NPM パッケージ'
  - link: logs/processing
    tag: Documentation
    text: ログの処理方法
  - link: logs/explorer
    tag: Documentation
    text: ログの調査方法
---
Datadog のクライアント側 JavaScript ロギングライブラリ `datadog-logs` を利用して、Web ブラウザなどの JavaScript クライアントから Datadog にログを送信できます。

`datadog-logs` ライブラリを使用すると、JS クライアントから Datadog にログを直接送信すると共に、次の機能を利用できます。

* ライブラリをロガーとして使用する。すべてが JSON ドキュメントとして Datadog に転送されます。
* 送信される各ログに `context` およびカスタム属性を追加する。
* すべてのフロントエンドエラーを自動的にラップして転送する。
* フロントエンドエラーの送信
* 実際のクライアント IP アドレスとユーザーエージェントを記録する。
* 自動一括ポストによってネットワークの利用を最適化する。

## セットアップ

1. **Datadog クライアントトークンを取得**: セキュリティ上の理由から、[API キー][1] を使用して `datadog-logs` ライブラリを構成することはできません。JavaScript キーでクライアント側に公開されるためです。ウェブブラウザーからログを収集するには、[クライアントトークン][2]を使用する必要があります。クライアントトークンの設定に関する詳細は、[クライアントトークンに関するドキュメント][2]を参照してください。
2. [NPM を使い](#npm-setup)**Datadog ブラウザのログライブラリを構成する**か、[バンドル](#bundle-setup)をヘッドタグに直接貼り付けます。

### NPM の設定

`package.json` ファイルに [`@datadog/browser-logs`][3] を追加したら、以下を使い初期化します。

{{< tabs >}}
{{% tab "US" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.init({
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  datacenter: 'us',
  forwardErrorsToLogs: true,
  sampleRate: 100
});
```

{{% /tab %}}
{{% tab "EU" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.init({
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  datacenter: 'eu',
  forwardErrorsToLogs: true,
  sampleRate: 100
});
```

{{% /tab %}}
{{< /tabs >}}

### バンドルの設定

ログやエラーを取りこぼさないよう、ライブラリのロードと構成をページのヘッドセクションの先頭で行います。

{{< tabs >}}
{{% tab "US" %}}

```html
<html>
  <head>
    <title>Example to send logs to Datadog</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs-us.js"></script>
    <script>
      window.DD_LOGS && DD_LOGS.init({
        clientToken: '<CLIENT_TOKEN>',
        forwardErrorsToLogs: true,
        sampleRate: 100
      });
    </script>
  </head>
</html>
```

{{% /tab %}}
{{% tab "EU" %}}

```html
<html>
  <head>
    <title>Example to send logs to Datadog</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs-eu.js"></script>
    <script>
      window.DD_LOGS && DD_LOGS.init({
        clientToken: '<CLIENT_TOKEN>',
        forwardErrorsToLogs: true,
        sampleRate: 100
      });
    </script>
  </head>
</html>
```

{{% /tab %}}
{{< /tabs >}}

**注**: `window.DD_LOGS` チェックは、ライブラリで読み込みエラーが起きた際に問題を防ぐために使用されます。

### 初期化パラメーター

以下のパラメーターを使用して、Datadog にログを送信するように Datadog ブラウザのログライブラリを構成できます。

| パラメーター             | 種類    | 必須 | デフォルト | 説明                                                                                              |
|-----------------------|---------|----------|---------|----------------------------------------------------------------------------------------------------------|
| `clientToken`         | 文字列  | はい      | `-`     | [Datadog クライアントトークン][4]。                                                                             |
| `datacenter`          | 文字列  | はい      | `us`    | 所属する組織の Datadog サイト。`us` はアメリカの Datadog のサイト、 `eu` は EU の Datadog サイト。               |
| `forwardErrorsToLogs` | Boolean | いいえ       | `true`  | `false` に設定すると、console.error ログ、キャッチされない例外、ネットワークエラーは Datadog へ送信されません。 |
| `sampleRate`          | 数値  | いいえ       | `100`   | 追跡するセッションの割合。追跡されたセッションのみログを送信します。`100` は全てを、`0` は皆無を意味します。   |

## カスタムログエントリの送信

Datadog ブラウザのログライブラリが初期化されると、API を使用してカスタムログエントリを Datadog へ直接送信します。

`logger.debug | info | warn | error (message: string, messageContext = Context)`

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.logger.info('Button clicked', { name: 'buttonName', id: 123 });
```

{{% /tab %}}
{{% tab "Bundle" %}}

```javascript
window.DD_LOGS && DD_LOGS.logger.info('Button clicked', { name: 'buttonName', id: 123 });
```

**注**: `window.DD_LOGS` チェックは、ライブラリで読み込みエラーが起きた際に問題を防ぐために使用されます。

{{% /tab %}}
{{< /tabs >}}

上の結果は次のようになります。

```json
{
  "status": "info",
  "session_id": "1234",
  "name": "buttonName",
  "id": 123,
  "message": "Button clicked",
  "http": {
    "url": "...",
    "useragent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.130 Safari/537.36"
  },
  "network": {"client": {"ip": "109.30.xx.xxx"}}
}
```

ロガーは、デフォルトで次の情報を追加します。

* `view.url`
* `session_id`
* `http.useragent`
* `network.client.ip`

### パラメーターとしてのステータスの使用

Datadog ブラウザのログライブラリが初期化されると、API を使用してカスタムログエントリをそのステータスをパラメーターとして Datadog へ直接送信します。

`log (message: string, messageContext: Context, status? = 'debug' | 'info' | 'warn' | 'error')`

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>);
```

{{% /tab %}}
{{% tab "Bundle" %}}

```javascript
window.DD_LOGS && DD_LOGS.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>);
```

{{% /tab %}}
{{< /tabs >}}

| プレースホルダー         | 説明                                                                             |
|---------------------|-----------------------------------------------------------------------------------------|
| `<MESSAGE>`         | Datadog によって完全にインデックス化されたログメッセージ                                |
| `<JSON_ATTRIBUTES>` | `<MESSAGE>` にアタッチされているすべての属性を含む有効な JSON オブジェクト            |
| `<STATUS>`          | ログのステータス。使用できるステータス値は、`debug`、`info`、`warn`、`error` です。 |

## 高度な使用方法

### 複数のロガーの定義

Datadog ブラウザのログライブラリにはデフォルトのロガーが含まれていますが、さまざまなロガーを定義することもできます。これは、同じプロジェクトで複数のチームが作業している場合に便利です。

#### 新しいロガーの作成

Datadog ブラウザのログライブラリが初期化されると、API `createLogger` を使用して新しいロガーを定義します。

```text
createLogger (name: string, conf?: {
    level?: 'debug' | 'info' | 'warn' | 'error'
    handler?: 'http' | 'console' | 'silent'
    context?: Context
})
```

**注**: パラメーターは、[setLevel](#ステータスに-基づく-フィルタリング)、[setHandler](#送信先-の-変更)、[setContext](#コンテキストの-上書き) API と共に設定することができます。

#### カスタムロガーを取得

ロガーを作成すると、API を使い JavaScript コードのどこからでもロガーにアクセスすることができます。

`getLogger (name: string)`

#### 例

他のロガーと共に、`signupLogger` のロガーを次のように定義したとします。

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.createLogger('signupLogger', 'info', 'http', {'env', 'staging'})
```

これで、次のように、このロガーをコードの別の場所で使用できます。

```javascript
import { datadogLogs } from '@datadog/browser-logs';

const signupLogger = datadogLogs.getLogger('signupLogger')
signupLogger.info('Test sign up completed')
```

{{% /tab %}}
{{% tab "Bundle" %}}

```javascript
if (window.DD_LOGS) {
    const signupLogger = DD_LOGS.createLogger('signupLogger', 'info', 'http', {'env', 'staging'})
}
```

これで、次のように、このロガーをコードの別の場所で使用できます。

```javascript
if (window.DD_LOGS) {
    const signupLogger = DD_LOGS.getLogger('signupLogger')
    signupLogger.info('Test sign up completed')
}
```

**注**: `window.DD_LOGS` チェックは、ライブラリで読み込みエラーが起きた際に問題を防ぐために使用されます。

{{% /tab %}}
{{< /tabs >}}

### コンテキストの上書き

#### グローバルコンテキスト

Datadog ブラウザのログライブラリを初期化すると、以下のことが可能になります。

* `setLoggerGlobalContext (context: Context)` API を使用して、すべてのロガーのコンテキスト全てを設定。
* `addLoggerGlobalContext (key: string, value: any)` API を使用して、あなたのすべてのロガーにコンテキストを追加。

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.setLoggerGlobalContext("{'env', 'staging'}");

datadogLogs.addLoggerGlobalContext('referrer', document.referrer);
```

{{% /tab %}}
{{% tab "Bundle" %}}

```javascript
window.DD_LOGS && DD_LOGS.setLoggerGlobalContext("{'env', 'staging'}");

window.DD_LOGS && DD_LOGS.addLoggerGlobalContext('referrer', document.referrer);
```

**注**: `window.DD_LOGS` チェックは、ライブラリで読み込みエラーが起きた際に問題を防ぐために使用されます。

{{% /tab %}}
{{< /tabs >}}

#### ロガーのコンテキスト

ロガーを作成すると、以下のことができます。

* `setContext (context: Context)` API を使用して、すべてのロガーのコンテキスト全てを設定。
* `addContext (key: string, value: any)` API を使用して、あなたのロガーにコンテキストを追加。

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.setContext("{'env', 'staging'}");

datadogLogs.addContext('referrer', document.referrer);
```

{{% /tab %}}
{{% tab "Bundle" %}}

```javascript
window.DD_LOGS && DD_LOGS.setContext("{'env', 'staging'}");

window.DD_LOGS && DD_LOGS.addContext('referrer', document.referrer);
```

**注**: `window.DD_LOGS` チェックは、ライブラリで読み込みエラーが起きた際に問題を防ぐために使用されます。

{{% /tab %}}
{{< /tabs >}}

### ステータスに基づくフィルタリング

Datadog ブラウザのログライブラリが初期化されると、API を使用してロガーにの最小ログレベルを設定できます。

`setLevel (level?: 'debug' | 'info' | 'warn' | 'error')`

指定したレベル以上のステータスのログだけが送信されます。

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.logger.setLevel('<LEVEL>');
```

{{% /tab %}}
{{% tab "Bundle" %}}

```javascript
window.DD_LOGS && DD_LOGS.logger.setLevel('<LEVEL>');
```

**注**: `window.DD_LOGS` チェックは、ライブラリで読み込みエラーが起きた際に問題を防ぐために使用されます。

{{% /tab %}}
{{< /tabs >}}

### 送信先の変更

デフォルトでは、Datadog ブラウザのログライブラリが作成したロガーは、ログを Datadog に送信します。
Datadog ブラウザのログライブラリが初期化されると、ログを `console` に送信したり、ログをまったく送信しない (`silent`) よう、API を使用してロガーを構成することもできます。

`setHandler (handler?: 'http' | 'console' | 'silent')`

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.logger.setHandler('<HANDLER>');
```

{{% /tab %}}
{{% tab "Bundle" %}}

```javascript
window.DD_LOGS && DD_LOGS.logger.setHandler('<HANDLER>');
```

**注**: `window.DD_LOGS` チェックは、ライブラリで読み込みエラーが起きた際に問題を防ぐために使用されます。

{{% /tab %}}
{{< /tabs >}}

## サポートされるブラウザ

`datadog-logs` ライブラリは、最新のデスクトップブラウザとモバイルブラウザをすべてサポートします。IE10 および IE11 もサポートしています。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#api-keys
[2]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#client-tokens
[3]: https://www.npmjs.com/package/@datadog/browser-logs
[4]: /ja/account_management/api-app-keys/#client-tokens
