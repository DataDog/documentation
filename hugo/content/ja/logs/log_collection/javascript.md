---
algolia:
  tags:
  - browser logs
aliases:
- /ja/logs/log_collection/web_browser
title: ブラウザログ収集
---
ブラウザログ SDK を使用して、Web ブラウザページから Datadog にログを送信します。

ブラウザログ SDK を使用すると、Web ブラウザページから Datadog にログを直接送信すると共に、次の機能を利用できます。

 SDK をロガーとして使用する。すべてが JSON ドキュメントとして Datadog に転送されます。
送信される各ログに `context` およびカスタム属性を追加する。
すべてのフロントエンドエラーを自動的にラップして転送する。
フロントエンドエラーを転送する。
実際のクライアント IP アドレスとユーザーエージェントを記録する。
自動一括ポストによってネットワークの利用を最適化する。
Worker および Service Worker 環境で使用する。

**注**:

 **RUM SDK とは独立**: Browser Logs SDK は RUM SDK がなくても利用できます。
**Worker 環境**: Browser Logs SDK は同じセットアップ方法により、Worker および Service Worker 環境で動作します。ただし、Worker 環境から送信されたログにはセッション情報が自動的に記録されません。

## セットアップ

### ステップ 1 - クライアントトークンを作成

Datadog で、[**Organization Settings (組織設定) > New Client Tokens (新しいクライアントトークン)**][1] に移動します。

**対応環境**: Browser Logs SDK は、すべての最新のデスクトップおよびモバイルブラウザ、そして Worker および Service Worker 環境をサポートしています。[ブラウザサポート][4] テーブルを参照してください。

<div class="alert alert-info">セキュリティ上の理由から、<a href="https://docs.datadoghq.com/account_management/api-app-keys/#api-keys">API キー</a>は Browser Logs SDK の設定に使用できません。理由は、JavaScript コード内でクライアント側に公開されるためです。Web ブラウザからログを収集するには、<a href="https://docs.datadoghq.com/account_management/api-app-keys/#client-tokens">クライアントトークン</a>を使用する必要があります。</div> 

### ステップ 2 - Logs Browser SDK をインストール

Browser SDK のインストール方法を選択します。

{{< tabs >}}
{{% tab "NPM" %}}

最新の Web アプリケーションの場合、Datadog では Node Package Manager (npm) を通じてのインストールを推奨しています。Browser SDK は、フロントエンドの JavaScript コードの残りの部分と一緒にパッケージ化されています。ページのロードパフォーマンスには影響しません。ただし、SDK は、SDK の初期化前に発生したエラーやコンソールログをキャプチャできない場合があります。Datadog では、Browser Logs SDK と一致するバージョンの使用を推奨しています。 

[`@datadog/browserlogs`][13] を `package.json` ファイルに追加してください。たとえば、npm cli を使う場合です。 

[13]: https://www.npmjs.com/package/@datadog/browserlogs

{{% /tab %}}
{{% tab "CDN 非同期" %}}

パフォーマンス目標がある Web アプリケーションは、CDN 経由で非同期にインストールする必要があります。Browser SDK は Datadog の CDN から非同期でロードされ、ページのロードパフォーマンスに影響を与えないことを保証します。ただし、SDK は、SDK の初期化前に発生したエラーやコンソールログをキャプチャできない場合があります。 

生成されたコードスニペットを、アプリケーションで監視するすべての HTML ページの head タグに追加します。

{{< site-region region="us" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v6/datadog-logs.js','DD_LOGS')
</script>
```

{{< /site-region >}}
{{< site-region region="eu" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/eu/v6/datadog-logs.js','DD_LOGS')
</script>
```

{{< /site-region >}}
{{< site-region region="ap1" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap1/v6/datadog-logs.js','DD_LOGS')
</script>
```

{{< /site-region >}}
{{< site-region region="ap2" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap2/v6/datadog-logs.js','DD_LOGS')
</script>
```

{{< /site-region >}}
{{< site-region region="us3" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us3/v6/datadog-logs.js','DD_LOGS')
</script>
```

{{< /site-region >}}
{{< site-region region="us5" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us5/v6/datadog-logs.js','DD_LOGS')
</script>
```

{{< /site-region >}}
{{< site-region region="gov" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-logs-v6.js','DD_LOGS')
</script>
```

{{< /site-region >}}

{{% /tab %}}
{{% tab "CDN 同期" %}}

すべてのイベントを収集するには、CDN 経由で同期的にインストールする必要があります。Browser SDK は Datadog の CDN から同期的にロードされ、最初にロードされること、すべてのエラー、リソース、およびユーザーアクションを収集できることを保証します。この方法はページのロードパフォーマンスに影響を与える可能性があります。 

生成されたコードスニペットを、アプリケーションで監視するすべての HTML ページの head タグ (他の script タグの前) に追加します。script タグを上部に配置し、同期的にロードすることで、Datadog RUM によりすべてのパフォーマンスデータとエラーを収集できるようになります。

{{< site-region region="us" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us1/v6/datadog-logs.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}
{{< site-region region="eu" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/eu/v6/datadog-logs.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}
{{< site-region region="ap1" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/ap1/v6/datadog-logs.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}
{{< site-region region="ap2" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/ap2/v6/datadog-logs.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}
{{< site-region region="us3" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us3/v6/datadog-logs.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}
{{< site-region region="us5" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us5/v6/datadog-logs.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}
{{< site-region region="gov" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/datadog-logs-v6.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}

{{% /tab %}}
{{< /tabs >}}

### ステップ 3 - Logs Browser SDK を初期化

SDK は、アプリケーションのライフサイクルのできる限り早い段階で初期化する必要があります。これにより、すべてのログが正しく記録されます。

初期化スニペットでは、クライアントトークンとサイトを設定します。[初期化パラメーター][4] の完全なリストを参照してください。

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.init({
  clientToken: '<CLIENT_TOKEN>',
  // `site` refers to the Datadog site parameter of your organization
  // see https://docs.datadoghq.com/getting_started/site/
  site: '<DATADOG_SITE>',
  forwardErrorsToLogs: true,
  sessionSampleRate: 100,
});

```

{{% /tab %}}
{{% tab "CDN 非同期" %}}

```javascript
<script>
  window.DD_LOGS.onReady(function() {
    window.DD_LOGS.init({
      clientToken: '<CLIENT_TOKEN>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: '<DATADOG_SITE>',
      forwardErrorsToLogs: true,
      sessionSampleRate: 100,
    });
  })
</script>
```

{{% /tab %}}
{{% tab "CDN 同期" %}}

```javascript
<script>
    window.DD_LOGS && window.DD_LOGS.init({
      clientToken: '<CLIENT_TOKEN>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: '<DATADOG_SITE>',
      forwardErrorsToLogs: true,
      sessionSampleRate: 100,
    });
</script>
```

{{% /tab %}}
{{< /tabs >}}

#### トラッキングの同意を設定 (GDPR の遵守)

GDPR、CCPA、および同様の規制に準拠するために、RUM Browser SDK では [初期化時に追跡に関する同意][5] を提供できます。

#### Content Security Policy (CSP) を設定

サイトで Datadog Content Security Policy (CSP) インテグレーションを使用している場合、追加のセットアップ手順については [CSP ドキュメント][6] を参照してください。

### ステップ 4 - データの視覚化

Logs の基本セットアップが完了したので、アプリケーションではブラウザログの収集が開始され、リアルタイムで問題の監視やデバッグを開始できます。

[ログエクスプローラー][7] でログを視覚化します。

## 使用方法

### カスタムログ

Datadog Browser Logs SDK が初期化されると、API を使用してカスタムログエントリを Datadog へ直接送信します。

```typescript
logger.debug | info | warn | error (message: string, messageContext?: Context, error?: Error)
```

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.logger.info('Button clicked', { name: 'buttonName', id: 123 })
```

{{% /tab %}}
{{% tab "CDN 非同期" %}}

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.logger.info('Button clicked', { name: 'buttonName', id: 123 })
})
```

**注**: 早期の API 呼び出しは `window.DD_LOGS.onReady()` コールバックでラップする必要があります。これにより、SDK が正しくロードされた後にのみコードが実行されるようになります。

{{% /tab %}}
{{% tab "CDN 同期" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.logger.info('Button clicked', { name: 'buttonName', id: 123 })
```

**注**: `window.DD_LOGS` チェックにより、SDK のロードに失敗した場合の問題が防止されます。

{{% /tab %}}
{{< /tabs >}}

#### 結果

結果は、NPM、CDN 非同期、CDN 同期のどれを使用したときも同じです。

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

Logs SDK は、デフォルトで次の情報を追加します (RUM SDK が存在する場合は、さらに多くのフィールドを追加
できます)。

 `date`
 `view.url`
 `view.referrer`
 `session_id` (セッションが使用される場合のみ)

Datadog のバックエンドでは、さらに次のようなフィールドが追加されます。

 `http.useragent`
 `network.client.ip`

### エラートラッキング

Datadog Browser Logs SDK では、オプションの `error` パラメーターを使用して手動でエラートラッキングを行うことができます (SDK v4.36.0 以降で利用可能)。[JavaScript Error][8] のインスタンスが渡されると、SDK ではエラーから関連情報 (種類、メッセージ、スタックトレース) を抽出します。

```typescript
logger.{debug|info|warn|error}(message: string, messageContext?: Context, error?: Error)
```

{{< tabs >}}
{{% tab "NPM" %}}

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

{{% /tab %}}
{{% tab "CDN 非同期" %}}

```javascript
try {
  ...
  throw new Error('Wrong behavior')
  ...
} catch (ex) {
  window.DD_LOGS.onReady(function () {
    window.DD_LOGS.logger.error('Error occurred', {}, ex)
  })
}
```

**注**: 早期の API 呼び出しは `window.DD_LOGS.onReady()` コールバックでラップする必要があります。これにより、SDK が正しくロードされた後にのみコードが実行されるようになります。

{{% /tab %}}
{{% tab "CDN 同期" %}}

```javascript
try {
  ...
  throw new Error('Wrong behavior')
  ...
} catch (ex) {
    window.DD_LOGS && window.DD_LOGS.logger.error('Error occurred', {}, ex)
}
```

**注**: `window.DD_LOGS` チェックにより、SDK のロードに失敗した場合の問題が防止されます。

{{% /tab %}}
{{< /tabs >}}

#### 結果

結果は、NPM、CDN 非同期、CDN 同期のどれを使用したときも同じです。

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

Datadog Browser Logs SDK では、便利なショートハンド関数 (`.debug`、`.info`、`.warn`、`.error`) をロガーに追加します。汎用ロガー関数も利用可能で、`status` パラメーターが公開されます。

```typescript
log(message: string, messageContext?: Context, status? = 'debug' | 'info' | 'warn' | 'error', error?: Error)
```

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>,<ERROR>);
```

{{% /tab %}}
{{% tab "CDN 非同期" %}}

```javascript
window.DD_LOGS.onReady(function() {
  window.DD_LOGS.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>,<ERROR>);
})
```

**注**: 早期の API 呼び出しは `window.DD_LOGS.onReady()` コールバックでラップする必要があります。これにより、SDK が正しくロードされた後にのみコードが実行されるようになります。

{{% /tab %}}
{{% tab "CDN 同期" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>,<ERROR>);
```

**注**: `window.DD_LOGS` チェックにより、SDK のロードに失敗した場合の問題が防止されます。

{{% /tab %}}
{{< /tabs >}}

#### プレースホルダー

上記例のプレースホルダーを次に説明します。

| プレースホルダー         | 説明                                                                             |
|  |  |
| `<MESSAGE>`         | Datadog によって完全にインデックス化されたログのメッセージ。                              |
| `<JSON_ATTRIBUTES>` | `<MESSAGE>` に付随するすべての属性を含む有効な JSON オブジェクト。        |
| `<STATUS>`          | ログのステータス。使用できるステータス値は `debug`、`info`、`warn`、または `error` です。|
| `<ERROR>`           | [JavaScript Error][8] オブジェクトのインスタンス。                                        |

## 高度な使用方法

### ブラウザログの機密データのスクラビング

ブラウザログに編集が必要な機密情報が含まれている場合は、ブラウザログコレクターを初期化するときに `beforeSend` コールバックを使用して、機密シーケンスをスクラブするように Browser SDK を構成します。

`beforeSend` コールバック関数は、2 つの引数 `log` イベントと `context` を指定して呼び出すことができます。この関数を使用すると、Datadog に送信される前に Browser SDK によって収集された各ログにアクセスでき、コンテキストを使用してログのプロパティを調整できます。コンテキストにはイベントに関連する追加情報が含まれていますが、必ずしもイベントに含まれているわけではありません。通常、この情報を使用してイベントを [強化][11] したり、[破棄][12] したりできます。

```javascript
function beforeSend(log, context)
```

潜在的な `context` 値は次のとおりです。

| 値 | データ型 | 使用例 |
||||
| `isAborted` | Boolean | ネットワークログイベントの場合、このプロパティは失敗したリクエストがアプリケーションによって中断されたかどうかを示します。意図的に中断された可能性があるため、このイベントを送信しない選択をすることもできます。|
| `handlingStack` | 文字列 | ログイベントが処理された場所のスタックトレース。これを使用して、ログの送信元となった [マイクロフロントエンド][9] を特定できます。|

Web アプリケーションの URL からメールアドレスを編集するには

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.init({
    ...,
    beforeSend: (log) => {
        // remove email from view url
        log.view.url = log.view.url.replace(/email=[^&]*/, "email=REDACTED")
    },
    ...
});
```

{{% /tab %}}
{{% tab "CDN 非同期" %}}

```javascript
window.DD_LOGS.onReady(function() {
    window.DD_LOGS.init({
        ...,
        beforeSend: (log) => {
            // remove email from view url
            log.view.url = log.view.url.replace(/email=[^&]*/, "email=REDACTED")
        },
        ...
    })
})
```

**注**: 早期の API 呼び出しは `window.DD_LOGS.onReady()` コールバックでラップする必要があります。これにより、SDK が正しくロードされた後にのみコードが実行されるようになります。

{{% /tab %}}
{{% tab "CDN 同期" %}}

```javascript
window.DD_LOGS &&
    window.DD_LOGS.init({
        ...,
        beforeSend: (log) => {
            // remove email from view url
            log.view.url = log.view.url.replace(/email=[^&]*/, "email=REDACTED")
        },
        ...
    });
```

**注**: `window.DD_LOGS` チェックにより、SDK のロードに失敗した場合の問題が防止されます。

{{% /tab %}}
{{< /tabs >}}

次のプロパティは SDK によって自動的に収集され、機密データが含まれる可能性があります。

| 属性       | 型   | 説明                                                                                      |
|  |  |  |
| `view.url`      | 文字列 | アクティブな Web ページの URL。                                                                 |
| `view.referrer` | 文字列 | 現在リクエストされているページへのリンクがたどられた前の Web ページの URL。|
| `message`       | 文字列 | ログの内容。                                                                         |
| `error.stack`   | 文字列 | スタックトレースまたはエラーに関する補足情報。                                   |
| `http.url`      | 文字列 | HTTP URL。                                                                                   |

### 特定のログを破棄

`beforeSend` コールバック関数を使用すると、Datadog に送信される前にログを破棄することもできます。

ステータスが 404 のネットワークエラーを破棄するには、次のようにします。

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.init({
    ...,
    beforeSend: (log) => {
        // discard 404 network errors
        if (log.http && log.http.status_code === 404) {
          return false
        }
    },
    ...
});
```

{{% /tab %}}
{{% tab "CDN 非同期" %}}

```javascript
window.DD_LOGS.onReady(function() {
    window.DD_LOGS.init({
        ...,
        beforeSend: (log) => {
          // discard 404 network errors
          if (log.http && log.http.status_code === 404) {
            return false
          }
        },
        ...
    })
})
```

**注**: 早期の API 呼び出しは `window.DD_LOGS.onReady()` コールバックでラップする必要があります。これにより、SDK が正しくロードされた後にのみコードが実行されるようになります。

{{% /tab %}}
{{% tab "CDN 同期" %}}

```javascript
window.DD_LOGS &&
    window.DD_LOGS.init({
        ...,
        beforeSend: (log) => {
          // discard 404 network errors
          if (log.http && log.http.status_code === 404) {
            return false
          }
        },
        ...
    });
```

**注**: `window.DD_LOGS` チェックにより、SDK のロードに失敗した場合の問題が防止されます。

{{% /tab %}}
{{< /tabs >}}

### 複数のロガーの定義

Datadog Browser Logs SDK にはデフォルトのロガーが含まれていますが、さまざまなロガーを定義することもできます。

#### 新しいロガーの作成

Datadog Browser Logs SDK を初期化したら、API `createLogger` を使用して新しいロガーを定義します:

```typescript
createLogger (name: string, conf?: {
    level?: 'debug' | 'info' | 'warn' | 'error',
    handler?: 'http' | 'console' | 'silent',
    context?: Context
})
```

**注**: これらのパラメーターは、[setLevel](#filterbystatus)、[setHandler](#changethedestination)、および [setContext](#overwritecontext) API と一緒に設定することができます。

#### カスタムロガーを取得

ロガーを作成すると、API を使用して JavaScript コードのどこからでもロガーにアクセスすることができます。

```typescript
getLogger(name: string)
```

{{< tabs >}}
{{% tab "NPM" %}}

たとえば、他のロガーと一緒に定義された `signupLogger` があるとします:

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.createLogger('signupLogger', {
  level: 'info',
  handler: 'http',
  context: { env: 'staging' }
})
```

これで、次のように、このロガーをコードの別の場所で使用できます。

```javascript
import { datadogLogs } from '@datadog/browser-logs'

const signupLogger = datadogLogs.getLogger('signupLogger')
signupLogger.info('Test sign up completed')
```

{{% /tab %}}
{{% tab "CDN 非同期" %}}

たとえば、他のロガーと一緒に定義された `signupLogger` があるとします:

```javascript
window.DD_LOGS.onReady(function () {
  const signupLogger = window.DD_LOGS.createLogger('signupLogger', {
    level: 'info',
    handler: 'http',
    context: { env: 'staging' }
  })
})
```

これで、次のように、このロガーをコードの別の場所で使用できます。

```javascript
window.DD_LOGS.onReady(function () {
  const signupLogger = window.DD_LOGS.getLogger('signupLogger')
  signupLogger.info('Test sign up completed')
})
```

**注**: 早期の API 呼び出しは `window.DD_LOGS.onReady()` コールバックでラップする必要があります。これにより、SDK が正しくロードされた後にのみコードが実行されるようになります。

{{% /tab %}}
{{% tab "CDN 同期" %}}

たとえば、他のロガーと一緒に定義された `signupLogger` があるとします:

```javascript
if (window.DD_LOGS) {
  const signupLogger = window.DD_LOGS.createLogger('signupLogger', {
    level: 'info',
    handler: 'http',
    context: { env: 'staging' }
  })
}
```

これで、次のように、このロガーをコードの別の場所で使用できます。

```javascript
if (window.DD_LOGS) {
  const signupLogger = window.DD_LOGS.getLogger('signupLogger')
  signupLogger.info('Test sign up completed')
}
```

**注**: `window.DD_LOGS` チェックにより、SDK のロードに失敗した場合の問題が防止されます。

{{% /tab %}}
{{< /tabs >}}

### コンテキストの上書き

#### グローバルコンテキスト

Datadog Browser Logs SDK を初期化すると、以下のことが可能になります。

 `setGlobalContext (context: object)` API を使用して、すべてのロガーのコンテキスト全体を設定します。
`setGlobalContextProperty (key: string, value: any)` API を使用して、全てのロガーにコンテキストを追加します。
`getGlobalContext ()` API を使用して、グローバルコンテキスト全体を取得します。
`removeGlobalContextProperty (key: string)` API を使用して、コンテキストプロパティを削除します。
`clearGlobalContext ()` API を使用して、既存のコンテキストプロパティをすべてクリアします。

> Log Browser SDK v4.17.0 では、いくつかの API の名前が更新されています。
>
`getLoggerGlobalContext` を >  `getGlobalContext` に変更
`setLoggerGlobalContext` を >  `setGlobalContext` に変更
`addLoggerGlobalContext` を >  `setGlobalContextProperty` に変更
`removeLoggerGlobalContext` を >  `removeGlobalContextProperty` に変更

{{< tabs >}}
{{% tab "NPM" %}}

NPM の場合は次の API を使用します。

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

{{% /tab %}}
{{% tab "CDN 非同期" %}}

CDN 非同期の場合は次の API を使用します。

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setGlobalContext({ env: 'staging' })
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setGlobalContextProperty('referrer', document.referrer)
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getGlobalContext() // => {env: 'staging', referrer: ...}
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.removeGlobalContextProperty('referrer')
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getGlobalContext() // => {env: 'staging'}
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.clearGlobalContext()
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getGlobalContext() // => {}
})
```

**注**: 早期の API 呼び出しは `window.DD_LOGS.onReady()` コールバックでラップする必要があります。これにより、SDK が正しくロードされた後にのみコードが実行されるようになります。

{{% /tab %}}
{{% tab "CDN 同期" %}}

CDN 同期の場合は次の API を使用します。

```javascript
window.DD_LOGS && window.DD_LOGS.setGlobalContext({ env: 'staging' })

window.DD_LOGS && window.DD_LOGS.setGlobalContextProperty('referrer', document.referrer)

window.DD_LOGS && window.DD_LOGS.getGlobalContext() // => {env: 'staging', referrer: ...}

window.DD_LOGS && window.DD_LOGS.removeGlobalContextProperty('referrer')

window.DD_LOGS && window.DD_LOGS.getGlobalContext() // => {env: 'staging'}

window.DD_LOGS && window.DD_LOGS.clearGlobalContext()

window.DD_LOGS && window.DD_LOGS.getGlobalContext() // => {}
```

**注**: `window.DD_LOGS` チェックにより、SDK のロードに失敗した場合の問題が防止されます。

{{% /tab %}}
{{< /tabs >}}

#### ユーザーコンテキスト

Datadog ログ SDK は、生成されたログに `User` を関連付けるための便利な関数を提供します。

`setUser (newUser: User)` API を使用して、すべてのロガーのユーザーを設定します。
`setUserProperty (key: string, value: any)` API を使用して、ユーザープロパティを変更、またはすべてのロガーに追加します。
`getUser ()` API を使用して、現在保存されているユーザーを取得します。
`removeUserProperty (key: string)` API を使用して、ユーザープロパティを削除します。
`clearUser ()` API を使用して、既存のユーザープロパティをすべてクリアします。

**注**: ユーザーコンテキストはグローバルコンテキストの前に適用されます。したがって、ログ生成時に、グローバルコンテキストに含まれるすべてのユーザープロパティによって、ユーザーコンテキストがオーバーライドされます。

{{< tabs >}}
{{% tab "NPM" %}}

NPM の場合は次の API を使用します。

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

{{% /tab %}}
{{% tab "CDN 非同期" %}}

CDN 非同期の場合は次の API を使用します。

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setUser({ id: '1234', name: 'John Doe', email: 'john@doe.com' })
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setUserProperty('type', 'customer')
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com', type: 'customer'}
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.removeUserProperty('type')
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com'}
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.clearUser()
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getUser() // => {}
})
```

**注**: 早期の API 呼び出しは `window.DD_LOGS.onReady()` コールバックでラップする必要があります。これにより、SDK が正しくロードされた後にのみコードが実行されるようになります。

{{% /tab %}}
{{% tab "CDN 同期" %}}

CDN 同期の場合は次の API を使用します。

```javascript
window.DD_LOGS && window.DD_LOGS.setUser({ id: '1234', name: 'John Doe', email: 'john@doe.com' })

window.DD_LOGS && window.DD_LOGS.setUserProperty('type', 'customer')

window.DD_LOGS && window.DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com', type: 'customer'}

window.DD_LOGS && window.DD_LOGS.removeUserProperty('type')

window.DD_LOGS && window.DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com'}

window.DD_LOGS && window.DD_LOGS.clearUser()

window.DD_LOGS && window.DD_LOGS.getUser() // => {}
```

**注**: `window.DD_LOGS` チェックにより、SDK のロードに失敗した場合の問題が防止されます。

{{% /tab %}}
{{< /tabs >}}

#### アカウントコンテキスト

Datadog ログ SDK は、生成されたログに `Account` を関連付けるための便利な関数を提供します。

`setAccount (newAccount: Account)` API を使用して、すべてのロガーのアカウントを設定します。
`setAccountProperty (key: string, value: any)` API を使用して、アカウントプロパティを変更、またはすべてのロガーに追加します。
`getAccount ()` API を使用して、現在保存されているアカウントを取得します。
`removeAccountProperty (key: string)` API を使用して、アカウントプロパティを削除します。
`clearAccount ()` API を使用して、既存のアカウントプロパティをすべてクリアします。

**注**: アカウントコンテキストはグローバルコンテキストの前に適用されます。したがって、ログ生成時に、グローバルコンテキストに含まれるすべてのアカウントプロパティによって、アカウントコンテキストがオーバーライドされます。

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.setAccount({ id: '1234', name: 'My Company Name' })
datadogLogs.setAccountProperty('type', 'premium')
datadogLogs.getAccount() // => {id: '1234', name: 'My Company Name', type: 'premium'}

datadogLogs.removeAccountProperty('type')
datadogLogs.getAccount() // => {id: '1234', name: 'My Company Name'}

datadogLogs.clearAccount()
datadogLogs.getAccount() // => {}
```

{{% /tab %}}
{{% tab "CDN 非同期" %}}

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setAccount({ id: '1234', name: 'My Company Name' })
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setAccountProperty('type', 'premium')
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getAccount() // => {id: '1234', name: 'My Company Name', type: 'premium'}
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.removeAccountProperty('type')
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getAccount() // => {id: '1234', name: 'My Company Name'}
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.clearAccount()
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getAccount() // => {}
})
```

**注**: 早期の API 呼び出しは `window.DD_LOGS.onReady()` コールバックでラップする必要があります。これにより、SDK が正しくロードされた後にのみコードが実行されるようになります。

{{% /tab %}}
{{% tab "CDN 同期" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.setAccount({ id: '1234', name: 'My Company Name' })

window.DD_LOGS && window.DD_LOGS.setAccountProperty('type', 'premium')

window.DD_LOGS && window.DD_LOGS.getAccount() // => {id: '1234', name: 'My Company Name', type: 'premium'}

window.DD_LOGS && window.DD_LOGS.removeAccountProperty('type')

window.DD_LOGS && window.DD_LOGS.getAccount() // => {id: '1234', name: 'My Company Name'}

window.DD_LOGS && window.DD_LOGS.clearAccount()

window.DD_LOGS && window.DD_LOGS.getAccount() // => {}
```

**注**: `window.DD_LOGS` チェックにより、SDK のロードに失敗した場合の問題が防止されます。

{{% /tab %}}
{{< /tabs >}}

#### コンテキストのライフサイクル

デフォルトでは、コンテキストは現在のページメモリに格納されます。つまり、これらは

ページのフルリロード後に保持されません
同じセッションの異なるタブまたはウィンドウ間で共有されません

セッションのすべてのイベントに追加するには、すべてのページにアタッチする必要があります。

ブラウザ SDK の v4.49.0 で `storeContextsAcrossPages` 構成オプションが導入され、これらのコンテキストを [`localStorage`][9] に格納できるようになり、次の動作が可能になりました。

フルリロード後にコンテキストが保持される
同じオリジンで開かれたタブ間でコンテキストが同期される

しかし、この機能にはいくつかの **制限** があります。

`localStorage` に格納されたデータはユーザーセッションよりも長持ちするため、これらのコンテキストで個人を特定できる情報 (PII) を設定することは推奨されません
この機能は `trackSessionAcrossSubdomains` オプションと互換性がありません。なぜなら `localStorage` データは同じオリジン間 (login.site.com ≠ app.site.com) でしか共有されないからです
`localStorage` はオリジンごとに 5 MiB に制限されているため、`localStorage` に格納されているアプリケーション固有のデータ、Datadog コンテキスト、およびその他のサードパーティデータは、問題を避けるためにこの制限内に収める必要があります。

#### ロガーのコンテキスト

ロガーを作成すると、次のことができます。

 `setContext (context: object)` API を使用して、ロガーのコンテキスト全体を設定します。
`setContextProperty (key: string, value: any)` API を使用して、ロガーにコンテキストプロパティを設定します。

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.setContext("{'env': 'staging'}")

datadogLogs.setContextProperty('referrer', document.referrer)
```

{{% /tab %}}
{{% tab "CDN 非同期" %}}

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setContext("{'env': 'staging'}")
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setContextProperty('referrer', document.referrer)
})
```

**注**: 早期の API 呼び出しは `window.DD_LOGS.onReady()` コールバックでラップする必要があります。これにより、SDK が正しくロードされた後にのみコードが実行されるようになります。

{{% /tab %}}
{{% tab "CDN 同期" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.setContext("{'env': 'staging'}")

window.DD_LOGS && window.DD_LOGS.setContextProperty('referrer', document.referrer)
```

**注**: `window.DD_LOGS` チェックにより、SDK のロードに失敗した場合の問題が防止されます。

{{% /tab %}}
{{< /tabs >}}

### ステータスに基づくフィルタリング

Datadog Browser Logs SDK が初期化されると、API を使用してロガーの最小ログレベルが設定されます。

```typescript
setLevel (level?: 'debug' | 'info' | 'warn' | 'error')
```

指定したレベル以上のステータスのログのみが送信されます。

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.logger.setLevel('<LEVEL>')
```

{{% /tab %}}
{{% tab "CDN 非同期" %}}

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.logger.setLevel('<LEVEL>')
})
```

**注**: 早期の API 呼び出しは `window.DD_LOGS.onReady()` コールバックでラップする必要があります。これにより、SDK が正しくロードされた後にのみコードが実行されるようになります。

{{% /tab %}}
{{% tab "CDN 同期" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.logger.setLevel('<LEVEL>')
```

**注**: `window.DD_LOGS` チェックにより、SDK のロードに失敗した場合の問題が防止されます。

{{% /tab %}}
{{< /tabs >}}

### 送信先の変更

デフォルトでは、Datadog Browser Logs SDK によって作成されたロガーは、Datadog にログを送信します。Datadog Browser Logs SDK を初期化すると、ロガーを次のように設定することが可能になります。

ログを `console` および Datadog (`http`) に送信する
ログを `console` にのみ送信する
 ログをまったく送信しない (`silent`)

```typescript
setHandler (handler?: 'http' | 'console' | 'silent' | Array<handler>)
```

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.logger.setHandler('<HANDLER>')
datadogLogs.logger.setHandler(['<HANDLER1>', '<HANDLER2>'])
```

{{% /tab %}}

{{% tab "CDN 非同期" %}}

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.logger.setHandler('<HANDLER>')
  window.DD_LOGS.logger.setHandler(['<HANDLER1>', '<HANDLER2>'])
})
```

**注**: 早期の API 呼び出しは `window.DD_LOGS.onReady()` コールバックでラップする必要があります。これにより、SDK が正しくロードされた後にのみコードが実行されるようになります。

{{% /tab %}}
{{% tab "CDN 同期" %}}

CDN 同期の場合は次の API を使用します。

```javascript
window.DD_LOGS && window.DD_LOGS.logger.setHandler('<HANDLER>')
window.DD_LOGS && window.DD_LOGS.logger.setHandler(['<HANDLER1>', '<HANDLER2>'])
```

**注**: `window.DD_LOGS` チェックにより、SDK のロードに失敗した場合の問題が防止されます。

{{% /tab %}}
{{< /tabs >}}

### ユーザー追跡の同意

GDPR、CCPA や同様の規制に準拠するために、Logs Browser SDK では初期化時に追跡に関する同意を提供できます。

`trackingConsent` の初期化パラメーターは次のいずれかの値で示されます。

1. `"granted"`: Logs Browser SDK はデータの収集を開始し、Datadog に送信します。
2. `"notgranted"`: Logs Browser SDK はデータを収集しません。

Logs Browser SDK の初期化後に追跡同意値を変更するには、`setTrackingConsent()` API 呼び出しを使用します。Logs Browser SDK は新しい値に応じて動作を変更します。

 `"granted"` から `"notgranted"` に変更すると、Logs セッションは停止し、データは Datadog に送信されなくなります。
`"notgranted"` から `"granted"` に変更すると、以前のセッションがアクティブでない場合、新しい Logs セッションが作成され、データ収集が再開されます。

この状態はタブ間で同期されず、ナビゲーション間で永続化されません。Logs Browser SDK の初期化時や、`setTrackingConsent()` を使用して、ユーザーの決定を提供するのはユーザーの責任です。

`setTrackingConsent()` が `init()` の前に使用された場合、指定された値が初期化パラメーターよりも優先されます。

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.init({
    ...,
    trackingConsent: 'not-granted'
});

acceptCookieBannerButton.addEventListener('click', function() {
    datadogLogs.setTrackingConsent('granted');
});
```

{{% /tab %}}
{{% tab "CDN 非同期" %}}

```javascript
window.DD_LOGS.onReady(function() {
    window.DD_LOGS.init({
        ...,
        trackingConsent: 'not-granted'
    });
});

acceptCookieBannerButton.addEventListener('click', () => {
    window.DD_LOGS.onReady(function() {
        window.DD_LOGS.setTrackingConsent('granted');
    });
});
```

{{% /tab %}}
{{% tab "CDN 同期" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.init({
  ...,
  trackingConsent: 'not-granted'
});

acceptCookieBannerButton.addEventListener('click', () => {
    window.DD_LOGS && window.DD_LOGS.setTrackingConsent('granted');
});
```

{{% /tab %}}
{{< /tabs >}}

### 内部コンテキストにアクセス

Datadog Browser Logs SDK が初期化されると、SDK の内部コンテキストにアクセスすることができます。これにより、`session_id` にアクセスできます。

```typescript
getInternalContext (startTime?: 'number' | undefined)
```

オプションで、`startTime` パラメーターを使用して、特定の時間のコンテキストを取得することができます。パラメーターが省略された場合、現在のコンテキストが返されます。

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.getInternalContext() // { session_id: "xxxx-xxxx-xxxx-xxxx" }
```

{{% /tab %}}

{{% tab "CDN 非同期" %}}

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getInternalContext() // { session_id: "xxxx-xxxx-xxxx-xxxx" }
})
```

{{% /tab %}}
{{% tab "CDN 同期" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.getInternalContext() // { session_id: "xxxx-xxxx-xxxx-xxxx" }
```

{{% /tab %}}
{{< /tabs >}}

<!-- Note: all URLs should be absolute -->

[1]: https://app.datadoghq.com/organizationsettings/clienttokens
[4]: https://datadoghq.dev/browsersdk/interfaces/_datadog_browserlogs.LogsInitConfiguration.html
[5]: /ja/logs/log_collection/javascript/#usertrackingconsent
[6]: /ja/integrations/content_security_policy_logs/#usecspwithrealusermonitoringandsessionreplay
[7]: /ja/logs/explorer/
[8]: <https: developer.mozilla.org en-us docs web javascript reference global_objects error>
[9]: https://developer.mozilla.org/enUS/docs/Web/API/Window/localStorage
[11]: /ja/real_user_monitoring/browser/advanced_configuration/?tab=npm#enrichandcontrolrumdata
[12]: /ja/real_user_monitoring/browser/advanced_configuration/?tab=npm#discardarumevent