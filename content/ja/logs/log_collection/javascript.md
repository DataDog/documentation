---
aliases:
  - /ja/logs/log_collection/web_browser
dependencies:
  - 'https://github.com/DataDog/browser-sdk/blob/main/packages/logs/README.md'
kind: documentation
title: ブラウザログ収集
---
ブラウザログ SDK で、Web ブラウザや JavaScript クライアントから Datadog にログを送信できます。

ブラウザログ SDK を使用すると、JS クライアントから Datadog にログを直接送信すると共に、次の機能を利用できます。

- SDK をロガーとして使用する。すべてが JSON ドキュメントとして Datadog に転送されます。
- 送信される各ログに `context` およびカスタム属性を追加する。
- すべてのフロントエンドエラーを自動的にラップして転送する。
- フロントエンドエラーの送信
- 実際のクライアント IP アドレスとユーザーエージェントを記録する。
- 自動一括ポストによってネットワークの利用を最適化する。

## セットアップ

**Datadog クライアントトークン**: セキュリティ上の理由から、[API キー][1] を使用してブラウザログ SDK を構成することはできません。JavaScript コードでクライアント側に公開されるためです。ウェブブラウザーからログを収集するには、[クライアントトークン][2]を使用する必要があります。詳細は、[クライアントトークンに関するドキュメント][2]を参照してください。

**Datadog ブラウザログ SDK**: [NPM](#npm) を使用して SDK を構成するか、head タグで [CDN 非同期](#cdn-async) または [CDN 同期](#cdn-sync) コードスニペットを使用します。

**対応ブラウザ**: ブラウザログ SDK は、IE10 および IE11 を含む最新のデスクトップブラウザとモバイルブラウザをすべてサポートします。下記の[ブラウザサポート][4]表をご参照ください。

### 適切なインストール方法の選択

| インストール方法        | 使用例                                                                                                                                                                                                                                                                                                                                                                   |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| npm (node package manager) | 最新の Web アプリケーションには、この方法が推奨されます。ブラウザログ SDK は、残りのフロントエンド JavaScript コードとともにパッケージ化されます。ページの読み込みパフォーマンスに影響は出ませんが、SDK が初期化される前にトリガーされたエラー、リソース、ユーザーアクションは取りこぼされる場合があります。**注:** 使用する場合、RUM SDK と一致するバージョンの使用が推奨されます。 |
| CDN 非同期                  | この方法は、パフォーマンス目標のある Web アプリケーションに推奨されます。ブラウザログ SDK は、CDN から非同期的に読み込まれます。この方法を使用すると、SDK のダウンロードによるページの読み込みパフォーマンスへの影響を回避できます。ただし、SDK が初期化される前にトリガーされたエラー、リソース、ユーザーアクションは取りこぼされる場合があります。                                                  |
| CDN 同期                   | この方法は、すべての RUM イベントを収集する場合に推奨されます。ブラウザログ SDK は、CDN から同期的に読み込まれます。この方法を使用すると、最初に SDK を読み込み、すべてのエラー、リソース、ユーザーアクションを収集することができます。この方法は、ページの読み込みパフォーマンスに影響を与える可能性があります。                                                                                                      |

### NPM

`package.json` ファイルに [`@datadog/browser-logs`][3] を追加したら、以下を使い初期化します。

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.init({
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  site: '<DATADOG_SITE>',
  forwardErrorsToLogs: true,
  sampleRate: 100,
})
```

### CDN 非同期

ページの head セクションで SDK の読み込みと構成を行います。

<!-- prettier-ignore -->
```html
<html>
  <head>
    <title>Example to send logs to Datadog</title>
      <script>
      (function(h,o,u,n,d) {
        h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
        d=o.createElement(u);d.async=1;d.src=n
        n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
      })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-logs.js','DD_LOGS')
      DD_LOGS.onReady(function() {
          DD_LOGS.init({
            clientToken: 'XXX',
            site: 'datadoghq.com',
            forwardErrorsToLogs: true,
            sampleRate: 100,
          })
        })
      </script>
  </head>
</html>
```

**注:** 始めの API 呼び出しは `DD_LOGS.onReady()` コールバックにラップされている必要があります。こうすることで、SDK が適切に読み込まれたときにのみコードが実行されるようにできます。

### CDN 同期

すべてのログとエラーを受信するには、ページの head セクションの先頭で SDK を読み込み構成します。

```html
<html>
  <head>
    <title>Example to send logs to Datadog</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs.js"></script>
    <script>
      window.DD_LOGS &&
        DD_LOGS.init({
          clientToken: '<CLIENT_TOKEN>',
          site: '<DATADOG_SITE>',
          forwardErrorsToLogs: true,
          sampleRate: 100,
        })
    </script>
  </head>
</html>
```

**注**: `window.DD_LOGS` チェックは、SDK で読み込みエラーが起きた際に問題を防ぐために使用されます。

### TypeScript

タイプは TypeScript >= 3.0 と互換性があります。以前のバージョンの場合は、JS ソースをインポートし、グローバル変数を使用してコンパイルの問題を回避します。

```typescript
import '@datadog/browser-logs/bundle/datadog-logs'

window.DD_LOGS.init({
  clientToken: '<CLIENT_TOKEN>',
  site: '<DATADOG_SITE>',
  forwardErrorsToLogs: true,
  sampleRate: 100,
})
```

## コンフィギュレーション

### 初期化パラメーター

以下のパラメーターを使用して、Datadog にログを送信するように Datadog ブラウザログ SDK を構成できます。

| パラメーター             | タイプ    | 必須 | デフォルト         | 説明                                                                                              |
| --------------------- | ------- | -------- | --------------- | -------------------------------------------------------------------------------------------------------- |
| `clientToken`         | 文字列  | 〇      |                 | [Datadog クライアントトークン][2]。                                                                             |
| `site`                | 文字列  | 〇      | `datadoghq.com` | 組織の Datadog サイト。US: `datadoghq.com`、EU: `datadoghq.eu`                           |
| `service`             | 文字列  | ✕       |                 | アプリケーションのサービス名。                                                                   |
| `env`                 | 文字列  | ✕       |                 | アプリケーションの環境 (例: prod、pre-prod、staging)                                |
| `version`             | 文字列  | ✕       |                 | アプリケーションのバージョン (例: 1.2.3、6c44da20、2020.02.13)                                |
| `forwardErrorsToLogs` | Boolean | ✕       | `true`          | `false` に設定すると、console.error ログ、キャッチされない例外、ネットワークエラーは Datadog へ送信されません。 |
| `sampleRate`          | 数値  | ✕       | `100`           | 追跡するセッションの割合。`100` は全てを、`0` は皆無を意味します。追跡されたセッションのみがログを送信します。       |
| `silentMultipleInit`  | Boolean | ✕       |                 | 複数の init を使用しながらログエラーを防ぎます。                                                       |

`RUM` SDK を使用するときに一致するコンフィギュレーションが必要なオプション:

| パラメーター                      | タイプ    | 必須 | デフォルト | 説明                                                                                                                                                  |
| ------------------------------ | ------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `trackSessionAcrossSubdomains` | Boolean | ✕       | `false` | 同じサイトのサブドメイン間でセッションを保持します。                                                                                                    |
| `useSecureSessionCookie`       | Boolean | ✕       | `false` | 安全なセッション Cookie を使用します。これにより、安全でない (HTTPS 以外の) 接続で送信されるログが無効になります。                                                                    |
| `useCrossSiteSessionCookie`    | Boolean | ✕       | `false` | 安全なクロスサイトセッション Cookie を使用します。これにより、サイトが別のサイトから読み込まれたときに、logs SDK を実行できます (iframe)。`useSecureSessionCookie` を意味します。 |

## 使用方法

### カスタムログ

Datadog ブラウザログ SDK が初期化されると、API を使用してカスタムログエントリを Datadog へ直接送信します。

```
logger.debug | info | warn | error (message: string, messageContext = Context)
```

#### NPM

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.logger.info('Button clicked', { name: 'buttonName', id: 123 })
```

#### CDN 非同期

```javascript
DD_LOGS.onReady(function () {
  DD_LOGS.logger.info('Button clicked', { name: 'buttonName', id: 123 })
})
```

**注:** 始めの API 呼び出しは `DD_LOGS.onReady()` コールバックにラップされている必要があります。こうすることで、SDK が適切に読み込まれたときにのみコードが実行されるようにできます。

#### CDN 同期

```javascript
window.DD_LOGS && DD_LOGS.logger.info('Button clicked', { name: 'buttonName', id: 123 })
```

**注**: `window.DD_LOGS` チェックは、SDK で読み込みエラーが起きた際に問題を防ぐために使用されます。

#### 結果

結果は、NPM、CDN 非同期、CDN 同期を使用した時と同じです。

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
  "network": { "client": { "ip": "109.30.xx.xxx" } }
}
```

ロガーは、デフォルトで次の情報を追加します。

- `view.url`
- `session_id`
- `http.useragent`
- `network.client.ip`

### ステータスのパラメーター

Datadog ブラウザログ SDK が初期化されると、ステータスをパラメーターとして使用して、API でカスタムログエントリを Datadog へ送信します。

```
log (message: string, messageContext: Context, status? = 'debug' | 'info' | 'warn' | 'error')
```

#### NPM

NPM の場合は以下を使用します。

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>);
```

#### CDN 非同期

CDN 非同期の場合は以下を使用します。

```javascript
DD_LOGS.onReady(function() {
  DD_LOGS.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>);
})
```

**注:** 始めの API 呼び出しは `DD_LOGS.onReady()` コールバックにラップされている必要があります。こうすることで、SDK が適切に読み込まれたときにのみコードが実行されるようにできます。

#### CDN 同期

CDN 同期の場合は以下を使用します。

```javascript
window.DD_LOGS && DD_LOGS.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>);
```

#### プレースホルダー

上記例のプレースホルダーは、以下に説明されています。

| プレースホルダー         | 説明                                                                             |
| ------------------- | --------------------------------------------------------------------------------------- |
| `<MESSAGE>`         | Datadog によって完全にインデックス化されたログメッセージ。                               |
| `<JSON_ATTRIBUTES>` | `<MESSAGE>` にアタッチされているすべての属性を含む有効な JSON オブジェクト。         |
| `<STATUS>`          | ログのステータス。使用できるステータス値は、`debug`、`info`、`warn`、`error`。 |

## 高度な使用方法

### Browser ログの機密データのスクラビング

Browser ログに編集が必要な機密情報が含まれている場合は、Browser Log Collector を初期化するときに `beforeSend` コールバックを使用して、機密シーケンスをスクラブするように Browser SDK を構成します。

`beforeSend` コールバック関数を使用すると、Datadog に送信される前に Browser SDK によって収集された各イベントにアクセスでき、一般的に編集されたプロパティを更新できます。

たとえば、Web アプリケーションの URL からメールアドレスを編集するには

#### NPM

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.init({
    ...,
    beforeSend: (event) => {
        // ビューの URL からメールを削除します
        event.view.url = event.view.url.replace(/email=[^&]*/, "email=REDACTED")
    },
    ...
});
```

#### CDN 非同期

```javascript
DD_LOGS.onReady(function() {
    DD_LOGS.init({
        ...,
        beforeSend: (event) => {
            // ビューの URL からメールを削除します
            event.view.url = event.view.url.replace(/email=[^&]*/, "email=REDACTED")
        },
        ...
    })
})
```

#### CDN 同期

```javascript
window.DD_LOGS &&
    window.DD_LOGS.init({
        ...,
        beforeSend: (event) => {
            // ビューの URL からメールを削除します
            event.view.url = event.view.url.replace(/email=[^&]*/, "email=REDACTED")
        },
        ...
    });
```

次のイベントプロパティを更新できます。

| 属性       | タイプ   | 説明                                                                                      |
| --------------- | ------ | ------------------------------------------------------------------------------------------------ |
| `view.url`      | 文字列 | アクティブな Web ページの URL。                                                                  |
| `view.referrer` | 文字列 | 現在リクエストされているページへのリンクがたどられた前のウェブページの URL。 |
| `message`       | 文字列 | ログの内容。                                                                          |
| `error.stack`   | 文字列 | スタックトレースまたはエラーに関する補足情報。                                    |
| `http.url`      | 文字列 | HTTP URL。                                                                                    |

**注**: Browser SDK は、上記にリストされていないイベントプロパティに加えられた変更を無視します。イベントプロパティの詳細については、[Browser SDK リポジトリ][5]を参照してください。

### 複数のロガーの定義

Datadog ブラウザログ SDK にはデフォルトのロガーが含まれていますが、さまざまなロガーを定義することもできます。

#### 新しいロガーの作成

Datadog ブラウザログ SDK を初期化したら、API `createLogger` を使用して新しいロガーを定義します。

```typescript
createLogger (name: string, conf?: {
    level?: 'debug' | 'info' | 'warn' | 'error',
    handler?: 'http' | 'console' | 'silent',
    context?: Context
})
```

**注**: パラメーターは、[setLevel](#filter-by-status)、[setHandler](#change-the-destination)、[setContext](#overwrite-context) API と共に設定することができます。

#### カスタムロガーを取得

ロガーを作成すると、API を使い JavaScript コードのどこからでもロガーにアクセスすることができます。

```typescript
getLogger(name: string)
```

##### NPM

たとえば、他のロガーと共に定義された `signupLogger` があります。

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.createLogger('signupLogger', 'info', 'http', { env: 'staging' })
```

これで、次のように、このロガーをコードの別の場所で使用できます。

```javascript
import { datadogLogs } from '@datadog/browser-logs'

const signupLogger = datadogLogs.getLogger('signupLogger')
signupLogger.info('Test sign up completed')
```

#### CDN 非同期

たとえば、他のロガーと共に定義された `signupLogger` があります。

```javascript
DD_LOGS.onReady(function () {
  const signupLogger = DD_LOGS.createLogger('signupLogger', 'info', 'http', { env: 'staging' })
})
```

これで、次のように、このロガーをコードの別の場所で使用できます。

```javascript
DD_LOGS.onReady(function () {
  const signupLogger = DD_LOGS.getLogger('signupLogger')
  signupLogger.info('Test sign up completed')
})
```

**注:** 始めの API 呼び出しは `DD_LOGS.onReady()` コールバックにラップされている必要があります。こうすることで、SDK が適切に読み込まれたときにのみコードが実行されるようにできます。

##### CDN 同期

たとえば、他のロガーと共に定義された `signupLogger` があります。

```javascript
if (window.DD_LOGS) {
  const signupLogger = DD_LOGS.createLogger('signupLogger', 'info', 'http', { env: 'staging' })
}
```

これで、次のように、このロガーをコードの別の場所で使用できます。

```javascript
if (window.DD_LOGS) {
  const signupLogger = DD_LOGS.getLogger('signupLogger')
  signupLogger.info('Test sign up completed')
}
```

**注**: `window.DD_LOGS` チェックは、SDK で読み込みエラーが起きた際に問題を防ぐために使用されます。

### コンテキストの上書き

#### グローバルコンテキスト

Datadog ブラウザログ SDK を初期化すると、以下のことが可能になります。

- `setLoggerGlobalContext (context: Context)` API を使用して、すべてのロガーのコンテキスト全てを設定。
- `addLoggerGlobalContext (key: string, value: any)` API を使用して、あなたのすべてのロガーにコンテキストを追加。
- Get the entire global context with `getLoggerGlobalContext ()` API を使用して、グローバルコンテキスト全体を取得。

##### NPM

NPM の場合は以下を使用します。

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.setLoggerGlobalContext({ env: 'staging' })

datadogLogs.addLoggerGlobalContext('referrer', document.referrer)

const context = datadogLogs.getLoggerGlobalContext() // => {env: 'staging', referrer: ...}
```

#### CDN 非同期

CDN 非同期の場合は以下を使用します。

```javascript
DD_LOGS.onReady(function () {
  DD_LOGS.setLoggerGlobalContext({ env: 'staging' })
})

DD_LOGS.onReady(function () {
  DD_LOGS.addLoggerGlobalContext('referrer', document.referrer)
})

DD_LOGS.onReady(function () {
  var context = DD_LOGS.getLoggerGlobalContext() // => {env: 'staging', referrer: ...}
})
```

**注:** 始めの API 呼び出しは `DD_LOGS.onReady()` コールバックにラップされている必要があります。こうすることで、SDK が適切に読み込まれたときにのみコードが実行されるようにできます。

##### CDN 同期

CDN 同期の場合は以下を使用します。

```javascript
window.DD_LOGS && DD_LOGS.setLoggerGlobalContext({ env: 'staging' })

window.DD_LOGS && DD_LOGS.addLoggerGlobalContext('referrer', document.referrer)

var context = window.DD_LOGS && DD_LOGS.getLoggerGlobalContext() // => {env: 'staging', referrer: ...}
```

**注**: `window.DD_LOGS` チェックは、SDK で読み込みエラーが起きた際に問題を防ぐために使用されます。

#### ロガーのコンテキスト

ロガーを作成すると、以下のことができます。

- `setContext (context: Context)` API を使用して、すべてのロガーのコンテキスト全てを設定。
- `addContext (key: string, value: any)` API を使用して、あなたのロガーにコンテキストを追加。

##### NPM

NPM の場合は以下を使用します。

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.setContext("{'env': 'staging'}")

datadogLogs.addContext('referrer', document.referrer)
```

#### CDN 非同期

CDN 非同期の場合は以下を使用します。

```javascript
DD_LOGS.onReady(function () {
  DD_LOGS.setContext("{'env': 'staging'}")
})

DD_LOGS.onReady(function () {
  DD_LOGS.addContext('referrer', document.referrer)
})
```

**注:** 始めの API 呼び出しは `DD_LOGS.onReady()` コールバックにラップされている必要があります。こうすることで、SDK が適切に読み込まれたときにのみコードが実行されるようにできます。

##### CDN 同期

CDN 同期の場合は以下を使用します。

```javascript
window.DD_LOGS && DD_LOGS.setContext("{'env': 'staging'}")

window.DD_LOGS && DD_LOGS.addContext('referrer', document.referrer)
```

**注**: `window.DD_LOGS` チェックは、SDK で読み込みエラーが起きた際に問題を防ぐために使用されます。

### ステータスに基づくフィルタリング

Datadog ブラウザログ SDK が初期化されると、API を使用してロガーの最小ログレベルが設定されます。

```
setLevel (level?: 'debug' | 'info' | 'warn' | 'error')
```

指定したレベル以上のステータスのログだけが送信されます。

##### NPM

NPM の場合は以下を使用します。

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.logger.setLevel('<LEVEL>')
```

#### CDN 非同期

CDN 非同期の場合は以下を使用します。

```javascript
DD_LOGS.onReady(function () {
  DD_LOGS.logger.setLevel('<LEVEL>')
})
```

**注:** 始めの API 呼び出しは `DD_LOGS.onReady()` コールバックにラップされている必要があります。こうすることで、SDK が適切に読み込まれたときにのみコードが実行されるようにできます。

##### CDN 同期

CDN 同期の場合は以下を使用します。

```javascript
window.DD_LOGS && DD_LOGS.logger.setLevel('<LEVEL>')
```

**注**: `window.DD_LOGS` チェックは、SDK で読み込みエラーが起きた際に問題を防ぐために使用されます。

### 送信先の変更

デフォルトでは、Datadog ブラウザログ SDK が作成したロガーは、ログを Datadog に送信します。
Datadog ブラウザログ SDK が初期化されると、ログを `console` に送信したり、ログをまったく送信しない (`silent`) よう、API を使用してロガーを構成することもできます。

```
setHandler (handler?: 'http' | 'console' | 'silent')
```

##### NPM

NPM の場合は以下を使用します。

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.logger.setHandler('<HANDLER>')
```

#### CDN 非同期

CDN 非同期の場合は以下を使用します。

```javascript
DD_LOGS.onReady(function () {
  DD_LOGS.logger.setHandler('<HANDLER>')
})
```

**注:** 始めの API 呼び出しは `DD_LOGS.onReady()` コールバックにラップされている必要があります。こうすることで、SDK が適切に読み込まれたときにのみコードが実行されるようにできます。

##### CDN 同期

CDN 同期の場合は以下を使用します。

```javascript
window.DD_LOGS && DD_LOGS.logger.setHandler('<HANDLER>')
```

**注**: `window.DD_LOGS` チェックは、SDK で読み込みエラーが起きた際に問題を防ぐために使用されます。

[1]: /ja/account_management/api-app-keys/#api-keys
[2]: /ja/account_management/api-app-keys/#client-tokens
[3]: https://www.npmjs.com/package/@datadog/browser-logs
[4]: https://github.com/DataDog/browser-sdk/blob/main/packages/logs/BROWSER_SUPPORT.md
[5]: https://github.com/DataDog/browser-sdk/blob/main/packages/logs/src/logsEvent.types.ts
