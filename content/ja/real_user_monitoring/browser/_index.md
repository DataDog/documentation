---
aliases:
- /ja/real_user_monitoring/setup
dependencies:
- https://github.com/DataDog/browser-sdk/blob/main/packages/rum/README.md
further_reading:
- link: /real_user_monitoring/explorer/
  tag: ドキュメント
  text: RUM エクスプローラーについて
- link: /logs/log_collection/javascript/
  tag: ドキュメント
  text: Datadog Browser SDK for Logs について
kind: ドキュメント
title: RUM ブラウザモニタリング
---
## 概要

Datadog Real User Monitoring (RUM) を使用すると、アプリケーションの個々のユーザーのパフォーマンスとユーザージャーニーをリアルタイムで視覚化して分析することができます。イベントを収集するには、RUM ブラウザ SDK をブラウザアプリケーションに追加し、初期化パラメーターを使用して収集するデータの種類を構成します。

## セットアップ

RUM ブラウザ SDK は、IE11 を含むすべてのモダンなデスクトップおよびモバイルブラウザをサポートしています。詳細については、[ブラウザサポート][8]の表を参照してください。

RUM ブラウザモニタリングを設定するには、RUM アプリケーションを作成します。

1. Datadog で、[**RUM Applications** ページ][1]に移動し、**New Application** ボタンをクリックします。
   - アプリケーションの名前を入力し、**Generate Client Token** をクリックします。これにより、アプリケーションの `clientToken` と `applicationId` が生成されます。
   - RUM ブラウザ SDK のインストールタイプを選択します。[npm](#npm)、またはホストバージョン ([CDN 非同期](#cdn-async)または [CDN 同期](#cdn-sync)) のいずれかを選択します。
   - [RUM とセッションリプレイ][19]の統合サービスタグ付けを使用するために、アプリケーションの環境名とサービス名を定義します。初期化スニペットで、デプロイされたアプリケーションのバージョン番号を設定します。詳しくは、[タグ付け](#tagging)を参照してください。
   - 収集した総ユーザーセッションのサンプリングレートを設定し、スライダーで収集した総 [Browser Premium][11] セッションのパーセンテージを設定します。Browser Premium セッションには、リソースやロングタスク、リプレイ記録が含まれます。ユーザーセッションの総量から収集される Browser Premium セッションの割合の構成については、[ブラウザおよび Browser Premium サンプリングのセットアップを構成する][21]を参照してください。
   - **Session Replay Enabled** をクリックすると、[セッションリプレイ][17]でリプレイ録画にアクセスできます。
   - ドロップダウンメニューから、セッションリプレイの[プライバシー設定][18]を選択します。
2. 変更をアプリケーションにデプロイします。実行が開始されると、ユーザーのブラウザから Datadog によってイベントが収集されます。
3. [収集したデータ][2]を[ダッシュボード][3]で視覚化したり、[RUM エクスプローラー][16]で検索クエリを作成したりします。

Datadog がデータの受信を開始するまで、アプリケーションは **RUM Applications** ページに `pending` として表示されます。

### 適切なインストール方法の選択

npm (node package manager)
: 最新の Web アプリケーションには、この方法が推奨されます。RUM ブラウザ SDK は、残りのフロントエンド JavaScript コードとともにパッケージ化されます。ページの読み込みパフォーマンスに影響は出ませんが、SDK が初期化される前にトリガーされたエラー、リソース、ユーザーアクションは取りこぼされる場合があります。Datadog では、Browser Logs SDK と一致するバージョンを使用することを推奨しています。

CDN 非同期
: この方法は、パフォーマンス目標のある Web アプリケーションに推奨されます。RUM ブラウザ SDK は、CDN から非同期的に読み込まれるため、SDK のダウンロードによるページの読み込みパフォーマンスへの影響を回避できます。ただし、SDK が初期化される前にトリガーされたエラー、リソース、ユーザーアクションは取りこぼされる場合があります。

CDN 同期
: この方法は、すべての RUM イベントを収集する場合に推奨されます。RUM ブラウザ SDK は、CDN から同期的に読み込まれるため、最初に SDK を読み込み、すべてのエラー、リソース、ユーザーアクションを収集することができます。この方法は、ページの読み込みパフォーマンスに影響を与える可能性があります。

### npm

[`@datadog/browser-rum`][4]を `package.json` ファイルに追加したら、次のコマンドを実行して初期化します。

<details open>
  <summary>最新バージョン</summary>

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
  premiumSampleRate: 100, // 含まれない場合 - デフォルト 100
  trackInteractions: true,
})
```

</details>

<details>
  <summary><code>v4.10.2</code> より前</summary>

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
  replaySampleRate: 100, // 含まれない場合 - デフォルト 100
  trackInteractions: true,
})
```

</details>

`trackInteractions` および `trackFrustrations` パラメーターは、アプリケーション内のユーザークリックの自動収集を有効にします。ページに含まれている**機密データと非公開データ**は、やり取りされた要素を特定するために含まれる場合があります。

### CDN 非同期

生成されたコードスニペットを、アプリケーションで監視するすべての HTML ページの head タグに追加します。

<details open>
  <summary>最新バージョン</summary>

<!-- prettier-ignore -->
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v4.js','DD_RUM')
  DD_RUM.onReady(function() {
    DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      site: '<DATADOG_SITE>',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // 含まれない場合 - デフォルト 100
      trackInteractions: true,
    })
  })
</script>
```

</details>

<details>
  <summary><code>v4.10.2</code> より前</summary>

<!-- prettier-ignore -->
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v4.js','DD_RUM')
  DD_RUM.onReady(function() {
    DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      site: '<DATADOG_SITE>',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // 含まれない場合 - デフォルト 100
      trackInteractions: true,
    })
  })
</script>
```

</details>

`trackInteractions` および `trackFrustrations` パラメーターは、アプリケーション内のユーザークリックの自動収集を有効にします。ページに含まれている**機密データと非公開データ**は、やり取りされた要素を特定するために含まれる場合があります。

始めの RUM API 呼び出しは `DD_RUM.onReady()` コールバックにラップされている必要があります。こうすることで、SDK が適切に読み込まれたときにのみコードが実行されるようにできます。

### CDN 同期

生成されたコードスニペットを、アプリケーションで監視するすべての HTML ページの head タグ（他のスクリプトタグの前にあるタグ）に追加します。同期型のスクリプトタグをより高い位置に含めると、Datadog RUM ですべてのパフォーマンスデータとエラーを収集できます。

<details open>
  <summary>最新バージョン</summary>

```html
<script src="https://www.datadoghq-browser-agent.com/datadog-rum-v4.js" type="text/javascript"></script>
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
      premiumSampleRate: 100, // 含まれない場合 - デフォルト 100
      trackInteractions: true,
    })
</script>
```

</details>

<details>
  <summary><code>v4.10.2</code> より前</summary>

```html
<script src="https://www.datadoghq-browser-agent.com/datadog-rum-v4.js" type="text/javascript"></script>
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
      replaySampleRate: 100, // 含まれない場合 - デフォルト 100
      trackInteractions: true,
    })
</script>
```

</details>

`trackInteractions` および `trackFrustrations` パラメーターは、アプリケーション内のユーザークリックの自動収集を有効にします。ページに含まれている**機密データと非公開データ**は、やり取りされた要素を特定するために含まれる場合があります。

`window.DD_RUM` チェックは、RUM ブラウザ SDK で読み込みエラーが起きた際に問題を防ぐために使用されます。

### TypeScript

タイプは TypeScript >= 3.8.2 と互換性があります。以前のバージョンの場合は、JavaScript ソースをインポートし、グローバル変数を使用してコンパイルの問題を回避します。

```javascript
import '@datadog/browser-rum/bundle/datadog-rum'

window.DD_RUM.init({
  applicationId: 'XXX',
  clientToken: 'XXX',
  site: 'datadoghq.com',
  sampleRate: 100,
  premiumSampleRate: 100,
})
```

## コンフィギュレーション

### 初期化パラメーター

次のパラメーターを使用できます。

`applicationId`
: 必須<br/>
**種類**: 文字列<br/>
RUM アプリケーションの ID。

`clientToken`
: 必須<br/>
**種類**: 文字列<br/>
[Datadog クライアントトークン][5]。

`site`
: 必須<br/>
**タイプ**: 文字列<br/>
**デフォルト**: `datadoghq.com`<br/>
[組織の Datadog のサイトパラメーター][14]。

`service`
: オプション<br/>
**タイプ**: 文字列<br/>
アプリケーションのサービス名。[タグの構文要件][15]に従います。

`env`
: オプション<br/>
**タイプ**: 文字列<br/>
アプリケーションの環境 (例: prod、pre-prod、staging)。[タグの構文要件][15]に従います。

`version`
: オプション<br/>
**タイプ**: 文字列<br/>
アプリケーションのバージョン。例: 1.2.3、6c44da20、2020.02.13。[タグの構文要件][15]に従います。

`trackViewsManually`
: オプション<br/>
**タイプ**: Boolean<br/>
**デフォルト**: `false` <br/>
RUM ビューの作成を制御します。[デフォルトの RUM ビュー名をオーバーライドする][10]を参照してください。

`trackInteractions`
: 任意<br/>
**種類**: Boolean<br/>
**デフォルト**: `false` <br/>
[ユーザーアクションの自動収集][6]を有効にします。

`trackFrustrations`
: オプション<br/>
**タイプ**: ブール値<br/>
**デフォルト**: `false` <br/>
[ユーザーのフラストレーションの自動収集][20]を有効にします。`trackInteractions: true` を意味します。

`defaultPrivacyLevel`
: オプション<br/>
**タイプ**: 文字列<br/>
**デフォルト**: `mask-user-input` <br/>
[セッションリプレイプライバシーオプション][13]を参照してください。

`actionNameAttribute`
: オプション <br/>
**種類**: 文字列<br/>
 [アクションに名前を付ける][9]ために使用する独自の属性を指定できます。

`sampleRate`
: オプション<br/>
**タイプ**: 数字<br/>
**デフォルト**: `100`<br/>
追跡するセッションの割合。`100` で全て、`0` でなし。追跡されたセッションのみが RUM イベントを送信します。`sampleRate` の詳細については、[サンプリング構成](#browser-and-browser-premium-sampling-configuration)を参照してください。

`replaySampleRate`
: オプション - **非推奨**<br/>
**タイプ**: 数値<br/>
**デフォルト**: `100`<br/>
`premiumSampleRate` を参照してください。

`premiumSampleRate`
: オプション<br/>
**タイプ**: 数字<br/>
**デフォルト**: `100`<br/>
[Browser Premium 料金][11]の機能を持つ追跡されたセッションの割合。`100` で全て、`0` でなし。`premiumSampleRate` の詳細については、[サンプリング構成](#browser-and-browser-premium-sampling-configuration)を参照してください。

`silentMultipleInit`
: 任意<br/>
**種類**: ブール値 <br/>
**デフォルト**: `false`<br/>
RUM ブラウザ SDK がページ上ですでに初期化されている場合、初期化が暗黙に失敗します。

`proxyUrl`
: オプション<br/>
**タイプ**: 文字列<br/>
オプションのプロキシ URL (例: https://www.proxy.com/path)。詳細については、完全な[プロキシ設定ガイド][7]を参照してください。

`allowedTracingOrigins`
: オプション<br/>
**タイプ**: リスト<br/>
トレースヘッダを注入するために使用されるリクエスト起源のリスト。詳細については、[RUM とトレースの接続][12]を参照してください。

`tracingSampleRate`
: オプション<br/>
**タイプ**: 数値<br/>
**デフォルト**: `100`<br/>
トレースするリクエストの割合: すべてなら `100`、なければ `0` です。詳細は、[RUM とトレースの接続][12]を参照してください。

`telemetrySampleRate`
: オプション<br/>
**タイプ**: 数値<br/>
**デフォルト**: `20`<br/>
SDK の実行に関するテレメトリーデータ (エラーやデバッグログなど) は、潜在的な問題を検出して解決するために、Datadog に送信されます。このオプションを `0` に設定すると、テレメトリー収集がオプトアウトされます。

`excludedActivityUrls`
: オプション<br/>
**タイプ:** リスト<br/>
ページアクティビティを計算するときに無視されるリクエスト起源のリストです。[ページアクティビティの計算方法][16]を参照してください。

Logs Browser SDK を使用している場合、一致するコンフィギュレーションが必要なオプション:

`trackSessionAcrossSubdomains`
: 任意<br/>
**種類**: ブール値<br/>
**デフォルト**: `false`<br/>
同じサイトのサブドメイン間でセッションを保持します。　

`useSecureSessionCookie`
: 任意<br/>
**種類**: ブール値<br/>
**デフォルト**: `false`<br/>
安全なセッション Cookie を使用します。これにより、安全でない (HTTPS 以外の) 接続で送信される RUM イベントが無効になります。

`useCrossSiteSessionCookie`
: 任意<br/>
**種類**: ブール値<br/>
**デフォルト**: `false`<br/>
安全なクロスサイトセッション Cookie を使用します。これにより、サイトが別のサイトから読み込まれたときに、RUM ブラウザ SDK を実行できます (iframe)。`useSecureSessionCookie` を意味します。

初期化コマンドを呼び出し、追跡を開始します。

```
init(configuration: {
    applicationId: string,
    clientToken: string,
    site?: string,
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

### タグ付け

サービスとは、一連のページにマッピングされた、独立したデプロイ可能なコードリポジトリのことです。

- ブラウザアプリケーションがモノリスとして構築されている場合、RUM アプリケーションのサービス名は 1 つです。
- ブラウザアプリケーションが複数のページに対して別々のリポジトリとして構築されている場合、アプリケーションのライフサイクルを通じてデフォルトのサービス名を編集してください。

### 内部コンテキストにアクセスする

Datadog ブラウザ RUM SDK が初期化されると、SDK の内部コンテキストにアクセスすることができます。

以下の属性を調べることができます。

| 属性      | 説明                                                       |
| -------------- | ----------------------------------------------------------------- |
| application_id | アプリケーションの ID。                                            |
| session_id     | セッションの ID。                                                |
| user_action    | アクション ID を含むオブジェクト (アクションが見つからなかった場合は未定義)。 |
| view           | 現在のビューイベントに関する詳細を含むオブジェクト。           |

詳細については、[RUM ブラウザデータ収集][2]を参照してください。

#### 例

```
{
  application_id : "xxx",
  session_id : "xxx",
  user_action: { id: "xxx" },
  view : {
    id : "xxx",
    referrer : "",
    url: "http://localhost:8080/",
    name: "homepage"
  }
}
```

オプションで `startTime` パラメーターを使用すると、特定の時刻のコンテキストを取得することができます。このパラメーターが省略された場合は、現在のコンテキストが返されます。

```
getInternalContext (startTime?: 'number' | undefined)
```

#### NPM

NPM の場合は以下を使用します。

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.getInternalContext() // { session_id: "xxxx", application_id: "xxxx" ... }
```

#### CDN 非同期

CDN 非同期の場合は以下を使用します。

```javascript
DD_RUM.onReady(function () {
  DD_RUM.getInternalContext() // { session_id: "xxxx", application_id: "xxxx" ... }
})
```

#### CDN 同期

CDN 同期の場合は以下を使用します。

```javascript
window.DD_RUM && window.DD_RUM.getInternalContext() // { session_id: "xxxx", application_id: "xxxx" ... }
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

<!-- 注: URL はすべて絶対値でなければなりません -->

[1]: https://app.datadoghq.com/rum/list
[2]: https://docs.datadoghq.com/ja/real_user_monitoring/data_collected/
[3]: https://docs.datadoghq.com/ja/real_user_monitoring/dashboards/
[4]: https://www.npmjs.com/package/@datadog/browser-rum
[5]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#client-tokens
[6]: https://docs.datadoghq.com/ja/real_user_monitoring/browser/tracking_user_actions
[7]: https://docs.datadoghq.com/ja/real_user_monitoring/guide/proxy-rum-data/
[8]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/BROWSER_SUPPORT.md
[9]: https://docs.datadoghq.com/ja/real_user_monitoring/browser/tracking_user_actions/#declare-a-name-for-click-actions
[10]: https://docs.datadoghq.com/ja/real_user_monitoring/browser/modifying_data_and_context/?tab=npm#override-default-rum-view-names
[11]: https://www.datadoghq.com/pricing/?product=real-user-monitoring--session-replay#real-user-monitoring--session-replay
[12]: https://docs.datadoghq.com/ja/real_user_monitoring/connect_rum_and_traces?tab=browserrum
[13]: https://docs.datadoghq.com/ja/real_user_monitoring/session_replay/privacy_options?tab=maskuserinput
[14]: https://docs.datadoghq.com/ja/getting_started/site/
[15]: https://docs.datadoghq.com/ja/getting_started/tagging/#defining-tags
[16]: https://docs.datadoghq.com/ja/real_user_monitoring/browser/monitoring_page_performance/#how-page-activity-is-calculated
[17]: https://docs.datadoghq.com/ja/real_user_monitoring/session_replay/
[18]: https://docs.datadoghq.com/ja/real_user_monitoring/session_replay/privacy_options
[19]: https://docs.datadoghq.com/ja/getting_started/tagging/using_tags
[20]: https://docs.datadoghq.com/ja/real_user_monitoring/frustration_signals/
[21]: https://docs.datadoghq.com/ja/real_user_monitoring/guide/sampling-browser-and-browser-premium/