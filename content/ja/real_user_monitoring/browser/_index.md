---
dependencies:
  - 'https://github.com/DataDog/browser-sdk/blob/master/packages/rum/README.md'
kind: ドキュメント
title: RUM ブラウザモニタリング
---
## 概要

Datadog Real User Monitoring (RUM) を使用すると、アプリケーションの個々のユーザーのリアルタイムパフォーマンスとユーザージャーニーを視覚化して分析できます。

## セットアップ

### Datadog

Datadog RUM ブラウザモニタリングを設定するには

1. Datadog で、[リアルユーザーモニタリングのページ][1]に移動し、**New Application** ボタンをクリックします。
2. アプリケーションの名前を入力し、**Generate Client Token** をクリックします。これにより、アプリケーションの `clientToken` と `applicationId` が生成されます。
3. Datadog RUM SDK [NPM](#npm-setup) または[生成されたコードスニペット](#bundle-setup)をセットアップします。
4. 変更をアプリケーションにデプロイします。実行が開始されると、ユーザーブラウザから Datadog によってイベントが収集されます。
5. [収集されたデータ][2]は、Datadog の[ダッシュボード][3]で視覚的に確認できます。

**注**: Datadog がデータの受信を開始するまで、アプリケーションはアプリケーションリストページに「保留中」として表示されます。

### NPM

[`@datadog/browser-rum`][4]を `package.json` ファイルに追加したら、次のコマンドを実行して初期化します。

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
  applicationId: '<DATADOG_APPLICATION_ID>',
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  site: '<DATADOG_SITE>',
  //  service: 'my-web-application',
  //  env: 'production',
  //  version: '1.0.0',
  sampleRate: 100,
  trackInteractions: true,
})
```

**注**: `trackInteractions` パラメーターは、アプリケーション内のユーザークリックの自動収集を有効にします。ページに含まれている**機密データと非公開データ**は、やり取りされた要素を特定するために含まれる場合があります。

### バンドル

生成されたコードスニペットを、アプリケーションで監視するすべての HTML ページの head タグ（他のスクリプトタグの前にあるタグ）に追加します。同期型のスクリプトタグをより高い位置に含めると、Datadog RUM ですべてのパフォーマンスデータとエラーを収集できます。

```html
<script src="https://www.datadoghq-browser-agent.com/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      site: '<DATADOG_SITE>',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      trackInteractions: true,
    })
</script>
```

**注**:

- `trackInteractions` パラメーターは、アプリケーション内のユーザークリックの自動収集を有効にします。ページに含まれている**機密データと非公開データ**は、やり取りされた要素を特定するために含まれる場合があります。
- `window.DD_RUM` チェックは、RUM SDK で読み込みエラーが起きた際に問題を防ぐために使用されます。

### TypeScript

タイプは TypeScript >= 3.0 と互換性があります。以前のバージョンの場合は、JS ソースをインポートし、グローバル変数を使用してコンパイルの問題を回避します。

```javascript
import '@datadog/browser-rum/bundle/datadog-rum'

window.DD_RUM.init({
  applicationId: 'XXX',
  clientToken: 'XXX',
  site: 'datadoghq.com',
  resourceSampleRate: 100,
  sampleRate: 100,
})
```

## コンフィギュレーション

### 初期化パラメーター

次のパラメーターを使用できます。

| パラメーター               | タイプ    | 必須 | デフォルト         | 説明                                                                                              |
| ----------------------- | ------- | -------- | --------------- | -------------------------------------------------------------------------------------------------------- |
| `applicationId`         | 文字列  | 〇      |                 | RUM アプリケーションの ID。                                                                                  |
| `clientToken`           | 文字列  | 〇      |                 | [Datadog クライアントトークン][5]。                                                                             |
| `site`                  | 文字列  | 〇      | `datadoghq.com` | 組織の Datadog サイト。US: `datadoghq.com`、EU: `datadoghq.eu`                           |
| `service`               | 文字列  | ✕       |                 | アプリケーションのサービス名。                                                                   |
| `env`                   | 文字列  | ✕       |                 | アプリケーションの環境 (例: prod、pre-prod、staging)                                |
| `version`               | 文字列  | ✕       |                 | アプリケーションのバージョン (例: 1.2.3、6c44da20、2020.02.13)                                |
| `trackInteractions`     | Boolean | ✕       | `false`         | [ユーザーアクションの自動収集][6]を有効にします。                                                      |
| `resourceSampleRate`    | 数値  | ✕       | `100`           | リソースを収集するセッションのうち追跡されるセッションの割合。`100` は全てのセッションが追跡されることを、`0` は追跡されるセッションがないことを意味します。               |
| `sampleRate`            | 数値  | ✕       | `100`           | 追跡するセッションの割合。`100` は全てを、`0` は皆無を意味します。追跡されたセッションのみが rum イベントを送信します。 |
| `silentMultipleInit`    | Boolean | ✕       | `false`         | Datadog の RUM がページ上ですでに初期化されている場合、初期化が暗黙に失敗します。                       |
| `proxyHost`             | 文字列  | ✕       |                 | オプションのプロキシホスト (例: www.proxy.com)。詳細については、完全な[プロキシ設定ガイド][7]を参照してください。       |
| `allowedTracingOrigins` | リスト    | ✕       |                 | トレースヘッダーを挿入するために使用されるリクエスト元のリスト。                                                |

`logs` SDK も使用する場合、一致するコンフィギュレーションが必要なオプション:

| パラメーター                      | タイプ    | 必須 | デフォルト | 説明                                                                                                                                                  |
| ------------------------------ | ------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `trackSessionAcrossSubdomains` | Boolean | ✕       | `false` | 同じサイトのサブドメイン間でセッションを保持します。                                                                                                    |
| `useSecureSessionCookie`       | Boolean | ✕       | `false` | 安全なセッション Cookie を使用します。これにより、安全でない (HTTPS 以外の) 接続で送信される RUM イベントが無効になります。                                                              |
| `useCrossSiteSessionCookie`    | Boolean | ✕       | `false` | 安全なクロスサイトセッション Cookie を使用します。これにより、サイトが別のサイトから読み込まれたときに、logs SDK を実行できます (iframe)。`useSecureSessionCookie` を意味します。 |

#### 例

追跡を開始するには、Init を呼び出す必要があります。

```
init(configuration: {
    applicationId: string,
    clientToken: string,
    site?: string,
    resourceSampleRate?: number
    sampleRate?: number,
    silentMultipleInit?: boolean,
    trackInteractions?: boolean,
    service?: string,
    env?: string,
    version?: string,
    allowedTracingOrigins?: Array<String|Regexp>,
    trackSessionAcrossSubdomains?: boolean,
    useSecureSessionCookie?: boolean,
    useCrossSiteSessionCookie?: boolean,
})
```

### クリックアクションに名前を付ける

RUM ライブラリは、さまざまな戦略を使用して、クリックアクションに自動的に名前を付けます。さらにコントロールする必要がある場合は、クリック可能な要素 (またはその親のいずれか) に `data-dd-action-name` 属性を定義して、アクションに名前を付けます。次に例を示します。

```html
<a class="btn btn-default" href="#" role="button" data-dd-action-name="Login button">Login</a>
```

```html
<div class="alert alert-danger" role="alert" data-dd-action-name="Dismiss alert">
  <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
  <span class="sr-only">Error:</span>
  Enter a valid email address
</div>
```

[1]: https://app.datadoghq.com/rum/list
[2]: https://docs.datadoghq.com/ja/real_user_monitoring/data_collected/
[3]: https://docs.datadoghq.com/ja/real_user_monitoring/dashboards/
[4]: https://www.npmjs.com/package/@datadog/browser-rum
[5]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#client-tokens
[6]: https://docs.datadoghq.com/ja/real_user_monitoring/data_collected/user_action/#automatic-collection-of-user-actions
[7]: https://docs.datadoghq.com/ja/real_user_monitoring/faq/proxy_rum_data/