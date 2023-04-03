---
aliases:
- /ja/logs/log_collection/web_browser
kind: documentation
title: ブラウザログ収集
---

ブラウザログ SDK を使用して、Web ブラウザページから Datadog にログを送信します。

ブラウザログ SDK を使用すると、Web ブラウザページから Datadog にログを直接送信すると共に、次の機能を利用できます。

- SDK をロガーとして使用する。すべてが JSON ドキュメントとして Datadog に転送されます。
- 送信される各ログに `context` およびカスタム属性を追加する。
- すべてのフロントエンドエラーを自動的にラップして転送する。
- フロントエンドエラーの送信
- 実際のクライアント IP アドレスとユーザーエージェントを記録する。
- 自動一括ポストによってネットワークの利用を最適化する。

## セットアップ

**Datadog クライアントトークン**: セキュリティ上の理由から、[API キー][1] を使用してブラウザログ SDK を構成することはできません。JavaScript コードでクライアント側に公開されるためです。ウェブブラウザーからログを収集するには、[クライアントトークン][2]を使用する必要があります。詳細は、[クライアントトークンに関するドキュメント][2]を参照してください。

**Datadog ブラウザログ SDK**: [NPM](#npm) を使用して SDK を構成するか、head タグで [CDN 非同期](#cdn-async) または [CDN 同期](#cdn-sync) コードスニペットを使用します。

**対応ブラウザ**: ブラウザログ SDK は、IE11 を含む最新のデスクトップブラウザとモバイルブラウザをすべてサポートします。下記の[ブラウザサポート][4]表をご参照ください。

### 適切なインストール方法の選択

| インストール方法        | 使用例                                                                                                                                                                                                                                                                                                                                                                   |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| npm (node package manager) | 最新の Web アプリケーションには、この方法が推奨されます。ブラウザログ SDK は、残りのフロントエンド JavaScript コードとともにパッケージ化されます。ページの読み込みパフォーマンスに影響は出ませんが、SDK が初期化される前にトリガーされたエラー、リソース、ユーザーアクションは取りこぼされる場合があります。**注**: 使用する場合、RUM SDK と一致するバージョンの使用が推奨されます。 |
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
  sessionSampleRate: 100,
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
      })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-logs-v4.js','DD_LOGS')
      DD_LOGS.onReady(function() {
          DD_LOGS.init({
            clientToken: 'XXX',
            site: 'datadoghq.com',
            forwardErrorsToLogs: true,
            sessionSampleRate: 100,
          })
        })
      </script>
  </head>
</html>
```

**注**: 始めの API 呼び出しは `DD_LOGS.onReady()` コールバックにラップされている必要があります。こうすることで、SDK が適切に読み込まれたときにのみコードが実行されるようにできます。

### CDN 同期

すべてのログとエラーを受信するには、ページの head セクションの先頭で SDK を読み込み構成します。

```html
<html>
  <head>
    <title>Example to send logs to Datadog</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs-v4.js"></script>
    <script>
      window.DD_LOGS &&
        DD_LOGS.init({
          clientToken: '<CLIENT_TOKEN>',
          site: '<DATADOG_SITE>',
          forwardErrorsToLogs: true,
          sessionSampleRate: 100,
        })
    </script>
  </head>
</html>
```

**注**: `window.DD_LOGS` チェックは、SDK の読み込みに失敗した場合の問題を防止します。

### TypeScript

タイプは TypeScript >= 3.8.2 と互換性があります。以前のバージョンの場合は、JS ソースをインポートし、グローバル変数を使用してコンパイルの問題を回避します。

```typescript
import '@datadog/browser-logs/bundle/datadog-logs'

window.DD_LOGS.init({
  clientToken: '<CLIENT_TOKEN>',
  site: '<DATADOG_SITE>',
  forwardErrorsToLogs: true,
  sessionSampleRate: 100,
})
```

## 構成

### 初期化パラメーター

以下のパラメーターを使用して、Datadog にログを送信するように Datadog ブラウザログ SDK を構成できます。

| パラメーター             | タイプ                                                                      | 必須 | デフォルト         | 説明                                                                                                                                                                           |
| --------------------- | ------------------------------------------------------------------------- | -------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `clientToken`         | 文字列                                                                    | はい      |                 | [Datadog クライアントトークン][2]。                                                                                                                                                          |
| `site`                | 文字列                                                                    | はい      | `datadoghq.com` | 組織の Datadog サイトパラメーター][9]。                                                                                                                                 |
| `service`             | 文字列                                                                    | いいえ       |                 | アプリケーションのサービス名。[タグの構文要件][7]に従っている必要があります。                                                                                             |
| `env`                 | 文字列                                                                    | いいえ       |                 | アプリケーションの環境 (例: prod、pre-prod、staging など)。[タグの構文要件][7]に従っている必要があります。                                                          |
| `version`             | 文字列                                                                    | いいえ       |                 | アプリケーションのバージョン。例: 1.2.3、6c44da20、2020.02.13 など。[タグの構文要件][7]に従っている必要があります。                                                          |
| `forwardErrorsToLogs` | ブール値                                                                   | いいえ       | `true`          | `false` に設定すると、console.error ログ、キャッチされない例外、ネットワークエラーは Datadog へ送信されません。                                                                              |
| `forwardConsoleLogs`  | `"all"` または `"log"` `"debug"` `"info"` `"warn"` `"error"` の配列      | いいえ       | `[]`            | `console.*` から Datadog にログを転送します。すべてを転送するには `"all”` を、サブセットのみを転送するにはコンソール API 名の配列を使用します。                                                |
| `forwardReports`      | `"all"` または `"intervention"` `"deprecation"` `"csp_violation"` の配列 | いいえ       | `[]`            | [Reporting API][8] から Datadog にレポートを転送します。すべてを転送するには `"all”` を、サブセットのみを転送するにはレポートタイプの配列を使用します。                                       |
| `sampleRate`          | 数値                                                                    | いいえ       | `100`           | **非推奨** - `sessionSampleRate` を参照してください。                                                                                                                                             |
| `sessionSampleRate`   | 数値                                                                    | いいえ       | `100`           | 追跡するセッションの割合。`100` は全てを、`0` は皆無を意味します。追跡されたセッションのみがログを送信します。                                                                                    |
| `silentMultipleInit`  | ブール値                                                                   | いいえ       |                 | 複数の init を使用しながらログエラーを防ぎます。                                                                                                                                    |
| `proxyUrl`            | 文字列                                                                    | いいえ       |                 | オプションのプロキシ URL (例: https://www.proxy.com/path)。詳細については、完全な[プロキシ設定ガイド][6]を参照してください。                                                                        |
| `telemetrySampleRate` | 数値                                                                    | いいえ       | `20`            | SDK の実行に関するテレメトリーデータ (エラー、デバッグログ) は、潜在的な問題を検出して解決するために、Datadog に送信されます。このオプションを `0` に設定すると、テレメトリー収集がオプトアウトされます。 |

`RUM` SDK を使用するときに一致するコンフィギュレーションが必要なオプション:

| パラメーター                      | タイプ    | 必須 | デフォルト | 説明                                                                                                                                                  |
| ------------------------------ | ------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `trackSessionAcrossSubdomains` | ブール値 | いいえ       | `false` | 同じサイトのサブドメイン間でセッションを保持します。                                                                                                    |
| `useSecureSessionCookie`       | ブール値 | いいえ       | `false` | 安全なセッション Cookie を使用します。これにより、安全でない (HTTPS 以外の) 接続で送信されるログが無効になります。                                                                    |
| `useCrossSiteSessionCookie`    | ブール値 | いいえ       | `false` | 安全なクロスサイトセッション Cookie を使用します。これにより、サイトが別のサイトから読み込まれたときに、logs SDK を実行できます (iframe)。`useSecureSessionCookie` を意味します。 |

## 使用方法

### カスタムログ

Datadog ブラウザログ SDK が初期化されると、API を使用してカスタムログエントリを Datadog へ直接送信します。

```
logger.debug | info | warn | error (message: string, messageContext?: Context, error?: Error)
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

**注**: 始めの API 呼び出しは `DD_LOGS.onReady()` コールバックにラップされている必要があります。こうすることで、SDK が適切に読み込まれたときにのみコードが実行されるようにできます。

#### CDN 同期

```javascript
window.DD_LOGS && DD_LOGS.logger.info('Button clicked', { name: 'buttonName', id: 123 })
```

**注**: `window.DD_LOGS` チェックは、SDK の読み込みに失敗した場合の問題を防止します。

#### 結果

結果は、NPM、CDN 非同期、CDN 同期を使用した時と同じです。

```json
{
  "status": "info",
  "session_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "name": "buttonName",
  "id": 123,
  "message": "Button clicked",
  "date": 1234567890000,
  "origin": "logger",
  "http": {
    "useragent": "Mozilla/5.0 ...",
  },
  "view": {
    "url": "https://...",
    "referrer": "https://...",
  },
  "network": {
    "client": {
      "geoip": {...}
      "ip": "xxx.xxx.xxx.xxx"
    }
  }
}
```

Logs SDK は、デフォルトで以下の情報を追加します (RUM SDK が存在する場合は、さらに多くのフィールドを追加できます)。

- `date`
- `view.url`
- `view.referrer`
- `session_id` (セッションが使用される場合のみ)

Datadog のバックエンドでは、さらに次のようなフィールドが追加されます。

- `http.useragent`
- `network.client.ip`

### エラー追跡

Datadog ブラウザログ SDK では、オプションの `error` パラメーターを使用することで、手動でのエラー追跡が可能です (SDK v4.36.0+ で使用可能)。[JavaScript エラー][10]のインスタンスが提供されると、SDK はそのエラーから関連情報 (種類、メッセージ、スタックトレース) を抽出します。

```
logger.debug | info | warn | error (message: string, messageContext?: Context, error?: Error)
```

#### NPM

```javascript
import { datadogLogs } from '@datadog/browser-logs'

try {
  ...
  throw new Error('Wrong behavior')
  ...
} catch (ex) {
  datadogLogs.logger.error('Error occurred', {}, ex)
}
```

#### CDN 非同期

```javascript
try {
  ...
  throw new Error('Wrong behavior')
  ...
} catch (ex) {
  DD_LOGS.onReady(function () {
    DD_LOGS.logger.error('Error occurred', {}, ex)
  })
}
```

**注**: 始めの API 呼び出しは `DD_LOGS.onReady()` コールバックにラップされている必要があります。こうすることで、SDK が適切に読み込まれたときにのみコードが実行されるようにできます。

#### CDN 同期

```javascript
try {
  ...
  throw new Error('Wrong behavior')
  ...
} catch (ex) {
    window.DD_LOGS && DD_LOGS.logger.error('Error occurred', {}, ex)
}
```

**注**: `window.DD_LOGS` チェックは、SDK の読み込みに失敗した場合の問題を防止します。

#### 結果

結果は、NPM、CDN 非同期、CDN 同期を使用した時と同じです。

```json
{
  "status": "error",
  "session_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "message": "Error occurred",
  "date": 1234567890000,
  "origin": "logger",
  "error" : {
    "message": "Wrong behavior",
    "kind" : "Error",
    "stack" : "Error: Wrong behavior at <anonymous> @ <anonymous>:1:1"
  },
  ...
}
```

### 汎用ロガー関数

Datadog ブラウザログ SDK では、ロガーに省略記法関数 (`.debug`、`.info`、`.warn`、`.error`) を追加し、利便性を図っています。汎用的なロガー関数も用意されており、`status` パラメーターが公開されています。
```
log (message: string, messageContext?: Context, status? = 'debug' | 'info' | 'warn' | 'error', error?: Error)
```

#### NPM

NPM の場合は以下を使用します。

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>,<ERROR>);
```

#### CDN 非同期

CDN 非同期の場合は以下を使用します。

```javascript
DD_LOGS.onReady(function() {
  DD_LOGS.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>,<ERROR>);
})
```

**注**: 始めの API 呼び出しは `DD_LOGS.onReady()` コールバックにラップされている必要があります。こうすることで、SDK が適切に読み込まれたときにのみコードが実行されるようにできます。

#### CDN 同期

CDN 同期の場合は以下を使用します。

```javascript
window.DD_LOGS && DD_LOGS.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>,<ERROR>);
```

#### プレースホルダー

上記例のプレースホルダーは、以下に説明されています。

| プレースホルダー         | 説明                                                                             |
| ------------------- | --------------------------------------------------------------------------------------- |
| `<MESSAGE>`         | Datadog によって完全にインデックス化されたログメッセージ。                               |
| `<JSON_ATTRIBUTES>` | `<MESSAGE>` にアタッチされているすべての属性を含む有効な JSON オブジェクト。         |
| `<STATUS>`          | ログのステータス。使用できるステータス値は、`debug`、`info`、`warn`、`error`。 |
| `<ERROR>`           | [JavaScript Error][10] オブジェクトのインスタンス。                                         |

## 高度な使用方法

### ブラウザログの機密データのスクラビング

ブラウザログに編集が必要な機密情報が含まれている場合は、ブラウザログコレクターを初期化するときに `beforeSend` コールバックを使用して、機密シーケンスをスクラブするように Browser SDK を構成します。

`beforeSend` コールバック関数を使用すると、Datadog に送信される前に Browser SDK によって収集された各ログにアクセスでき、プロパティを更新できます。

Web アプリケーションの URL からメールアドレスを編集するには

#### NPM

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.init({
    ...,
    beforeSend: (log) => {
        // ビューの URL からメールを削除します 
        log.view.url = log.view.url.replace(/email=[^&]*/, "email=REDACTED")
    },
    ...
});
```

#### CDN 非同期

```javascript
DD_LOGS.onReady(function() {
    DD_LOGS.init({
        ...,
        beforeSend: (log) => {
            // ビューの URL からメールを削除します
            log.view.url = log.view.url.replace(/email=[^&]*/, "email=REDACTED")
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
        beforeSend: (log) => {
            // ビューの URL からメールを削除します
            log.view.url = log.view.url.replace(/email=[^&]*/, "email=REDACTED")
        },
        ...
    });
```

次のプロパティは SDK によって自動的に収集され、機密データが含まれる可能性があります。

| 属性       | タイプ   | 説明                                                                                      |
| --------------- | ------ | ------------------------------------------------------------------------------------------------ |
| `view.url`      | 文字列 | アクティブな Web ページの URL。                                                                  |
| `view.referrer` | 文字列 | 現在リクエストされているページへのリンクがたどられた前のウェブページの URL。 |
| `message`       | 文字列 | ログの内容。                                                                          |
| `error.stack`   | 文字列 | スタックトレースまたはエラーに関する補足情報。                                    |
| `http.url`      | 文字列 | HTTP URL。                                                                                    |

### 特定のログを破棄する

`beforeSend` コールバック関数を使用すると、Datadog に送信される前にログを破棄することもできます。

ステータスが 404 の場合にネットワークエラーを破棄するには

#### NPM

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.init({
    ...,
    beforeSend: (log) => {
        // 404 ネットワークエラーを破棄します
        if (log.http && log.http.status_code === 404) {
          return false
        }
    },
    ...
});
```

#### CDN 非同期

```javascript
DD_LOGS.onReady(function() {
    DD_LOGS.init({
        ...,
        beforeSend: (log) => {
          // 404 ネットワークエラーを破棄します
          if (log.http && log.http.status_code === 404) {
            return false
          }
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
        beforeSend: (log) => {
          // 404 ネットワークエラーを破棄します
          if (log.http && log.http.status_code === 404) {
            return false
          }
        },
        ...
    });
```

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

**注**: 始めの API 呼び出しは `DD_LOGS.onReady()` コールバックにラップされている必要があります。こうすることで、SDK が適切に読み込まれたときにのみコードが実行されるようにできます。

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

**注**: `window.DD_LOGS` チェックは、SDK の読み込みに失敗した場合の問題を防止します。

### コンテキストの上書き

#### グローバルコンテキスト

Datadog ブラウザログ SDK を初期化すると、以下のことが可能になります。

-  `setGlobalContext (context: object)` API を使用して、すべてのロガーのコンテキスト全てを設定。
- `setGlobalContextProperty (key: string, value: any)` API を使用して、すべてのロガーにコンテキストを追加。
- `getGlobalContext ()` API を使用して、グローバルコンテキスト全体を取得。
- `removeGlobalContextProperty (key: string)` API を使用して、コンテキストプロパティを削除。
- `clearGlobalContext ()` API を使用して、既存のコンテキストプロパティをすべてクリア。

> Log Browser SDK v4.17.0 では、いくつかの API の名称が更新されました。
>
> - `getLoggerGlobalContext` に代わって `getGlobalContext`
> - `setLoggerGlobalContext` に代わって `setGlobalContext`
> - `addLoggerGlobalContext` に代わって `setGlobalContextProperty`
`removeLoggerGlobalContext`> - `removeLoggerGlobalContext` に代わって `removeGlobalContextProperty`

##### NPM

NPM の場合は以下を使用します。

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.setGlobalContext({ env: 'staging' })

datadogLogs.setGlobalContextProperty('referrer', document.referrer)

datadogLogs.getGlobalContext() // => {env: 'staging', referrer: ...}

datadogLogs.removeGlobalContextProperty('referrer')

datadogLogs.getGlobalContext() // => {env: 'staging'}

datadogLogs.clearGlobalContext()

datadogLogs.getGlobalContext() // => {}
```

#### CDN 非同期

CDN 非同期の場合は以下を使用します。

```javascript
DD_LOGS.onReady(function () {
  DD_LOGS.setGlobalContext({ env: 'staging' })
})

DD_LOGS.onReady(function () {
  DD_LOGS.setGlobalContextProperty('referrer', document.referrer)
})

DD_LOGS.onReady(function () {
  DD_LOGS.getGlobalContext() // => {env: 'staging', referrer: ...}
})

DD_LOGS.onReady(function () {
  DD_LOGS.removeGlobalContextProperty('referrer')
})

DD_LOGS.onReady(function () {
  DD_LOGS.getGlobalContext() // => {env: 'staging'}
})

DD_LOGS.onReady(function () {
  DD_LOGS.clearGlobalContext()
})

DD_LOGS.onReady(function () {
  DD_LOGS.getGlobalContext() // => {}
})
```

**注**: 始めの API 呼び出しは `DD_LOGS.onReady()` コールバックにラップされている必要があります。こうすることで、SDK が適切に読み込まれたときにのみコードが実行されるようにできます。

##### CDN 同期

CDN 同期の場合は以下を使用します。

```javascript
window.DD_LOGS && DD_LOGS.setGlobalContext({ env: 'staging' })

window.DD_LOGS && DD_LOGS.setGlobalContextProperty('referrer', document.referrer)

window.DD_LOGS && DD_LOGS.getGlobalContext() // => {env: 'staging', referrer: ...}

window.DD_LOGS && DD_LOGS.removeGlobalContextProperty('referrer')

window.DD_LOGS && DD_LOGS.getGlobalContext() // => {env: 'staging'}

window.DD_LOGS && DD_LOGS.clearGlobalContext()

window.DD_LOGS && DD_LOGS.getGlobalContext() // => {}
```

**注**: `window.DD_LOGS` チェックは、SDK の読み込みに失敗した場合の問題を防止します。

#### ユーザーコンテキスト

Datadog ログ SDK は、生成されたログに `User` を関連付けるための便利な関数を提供しています。

- `setUser (newUser: User)` API を使用して、すべてのロガーのユーザーを設定します。
- `setUserProperty (key: string, value: any)` API を使用して、すべてのロガーにユーザープロパティを追加または変更します。
- `getUser ()` API を使用して、現在保存されているユーザーを取得します。
- `removeUserProperty (key: string)` API を使用して、ユーザープロパティを削除します。
- `clearUser ()` API を使用して、既存のユーザープロパティをすべて消去します。

**注**: ユーザーコンテキストはグローバルコンテキストの前に適用されます。したがって、グローバルコンテキストに含まれるすべてのユーザープロパティは、ログを生成する際にユーザコンテキストをオーバーライドします。

##### NPM

NPM の場合は以下を使用します。

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.setUser({ id: '1234', name: 'John Doe', email: 'john@doe.com' })
datadogLogs.setUserProperty('type', 'customer')
datadogLogs.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com', type: 'customer'}

datadogLogs.removeUserProperty('type')
datadogLogs.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com'}

datadogLogs.clearUser()
datadogLogs.getUser() // => {}
```

#### CDN 非同期

CDN 非同期の場合は以下を使用します。

```javascript
DD_LOGS.onReady(function () {
  DD_LOGS.setUser({ id: '1234', name: 'John Doe', email: 'john@doe.com' })
})

DD_LOGS.onReady(function () {
  DD_LOGS.setUserProperty('type', 'customer')
})

DD_LOGS.onReady(function () {
  DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com', type: 'customer'}
})

DD_LOGS.onReady(function () {
  DD_LOGS.removeUserProperty('type')
})

DD_LOGS.onReady(function () {
  DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com'}
})

DD_LOGS.onReady(function () {
  DD_LOGS.clearUser()
})

DD_LOGS.onReady(function () {
  DD_LOGS.getUser() // => {}
})
```

**注**: 始めの API 呼び出しは `DD_LOGS.onReady()` コールバックにラップされている必要があります。こうすることで、SDK が適切に読み込まれたときにのみコードが実行されるようにできます。

##### CDN 同期

CDN 同期の場合は以下を使用します。

```javascript
window.DD_LOGS && DD_LOGS.setUser({ id: '1234', name: 'John Doe', email: 'john@doe.com' })

window.DD_LOGS && DD_LOGS.setUserProperty('type', 'customer')

window.DD_LOGS && DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com', type: 'customer'}

window.DD_LOGS && DD_LOGS.removeUserProperty('type')

window.DD_LOGS && DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com'}

window.DD_LOGS && DD_LOGS.clearUser()

window.DD_LOGS && DD_LOGS.getUser() // => {}
```

**注**: `window.DD_LOGS` チェックは、SDK の読み込みに失敗した場合の問題を防止します。

#### ロガーのコンテキスト

ロガーを作成すると、以下のことができます。

- `setContext (context: object)` API を使用して、すべてのロガーのコンテキスト全てを設定。
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

**注**: 始めの API 呼び出しは `DD_LOGS.onReady()` コールバックにラップされている必要があります。こうすることで、SDK が適切に読み込まれたときにのみコードが実行されるようにできます。

##### CDN 同期

CDN 同期の場合は以下を使用します。

```javascript
window.DD_LOGS && DD_LOGS.setContext("{'env': 'staging'}")

window.DD_LOGS && DD_LOGS.addContext('referrer', document.referrer)
```

**注**: `window.DD_LOGS` チェックは、SDK の読み込みに失敗した場合の問題を防止します。

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

**注**: 始めの API 呼び出しは `DD_LOGS.onReady()` コールバックにラップされている必要があります。こうすることで、SDK が適切に読み込まれたときにのみコードが実行されるようにできます。

##### CDN 同期

CDN 同期の場合は以下を使用します。

```javascript
window.DD_LOGS && DD_LOGS.logger.setLevel('<LEVEL>')
```

**注**: `window.DD_LOGS` チェックは、SDK の読み込みに失敗した場合の問題を防止します。

### 送信先の変更

デフォルトでは、Datadog ブラウザログ SDK が作成したロガーは、ログを Datadog に送信します。Datadog ブラウザログ SDK が初期化されると、ロガーを構成して以下のようにすることもできます。

- `console` と Datadog にログを送信する (`http`)
- `console` にのみログを送信する
- ログをまったく送信しない (`silent`)

```
setHandler (handler?: 'http' | 'console' | 'silent' | Array<handler>)
```

##### NPM

NPM の場合は以下を使用します。

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.logger.setHandler('<HANDLER>')
datadogLogs.logger.setHandler(['<HANDLER1>', '<HANDLER2>'])
```

#### CDN 非同期

CDN 非同期の場合は以下を使用します。

```javascript
DD_LOGS.onReady(function () {
  DD_LOGS.logger.setHandler('<HANDLER>')
  DD_LOGS.logger.setHandler(['<HANDLER1>', '<HANDLER2>'])
})
```

**注**: 始めの API 呼び出しは `DD_LOGS.onReady()` コールバックにラップされている必要があります。こうすることで、SDK が適切に読み込まれたときにのみコードが実行されるようにできます。

##### CDN 同期

CDN 同期の場合は以下を使用します。

```javascript
window.DD_LOGS && DD_LOGS.logger.setHandler('<HANDLER>')
window.DD_LOGS && DD_LOGS.logger.setHandler(['<HANDLER1>', '<HANDLER2>'])
```

**注**: `window.DD_LOGS` チェックは、SDK の読み込みに失敗した場合の問題を防止します。

### 内部コンテキストにアクセスする

Datadog ブラウザログ SDK が初期化された後、SDK の内部コンテキストにアクセスすることができます。これにより、`session_id` にアクセスすることができます。

```
getInternalContext (startTime?: 'number' | undefined)
```

オプションで `startTime` パラメーターを使用すると、特定の時刻のコンテキストを取得することができます。このパラメーターが省略された場合は、現在のコンテキストが返されます。

##### NPM

NPM の場合は、以下を使用します。

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.getInternalContext() // { session_id: "xxxx-xxxx-xxxx-xxxx" }
```

#### CDN 非同期

CDN 非同期の場合は、以下を使用します。

```javascript
DD_LOGS.onReady(function () {
  DD_LOGS.getInternalContext() // { session_id: "xxxx-xxxx-xxxx-xxxx" }
})
```

##### CDN 同期

CDN 同期の場合は、以下を使用します。

```javascript
window.DD_LOGS && window.DD_LOGS.getInternalContext() // { session_id: "xxxx-xxxx-xxxx-xxxx" }
```

<!-- 注: URL はすべて絶対値でなければなりません -->

[1]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#api-keys
[2]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#client-tokens
[3]: https://www.npmjs.com/package/@datadog/browser-logs
[4]: https://github.com/DataDog/browser-sdk/blob/main/packages/logs/BROWSER_SUPPORT.md
[5]: https://docs.datadoghq.com/ja/real_user_monitoring/guide/enrich-and-control-rum-data/
[6]: https://docs.datadoghq.com/ja/real_user_monitoring/faq/proxy_rum_data/
[7]: https://docs.datadoghq.com/ja/getting_started/tagging/#defining-tags
[8]: https://developer.mozilla.org/en-US/docs/Web/API/Reporting_API
[9]: https://docs.datadoghq.com/ja/getting_started/site/
[10]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error