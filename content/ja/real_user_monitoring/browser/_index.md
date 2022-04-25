---
aliases:
- /ja/real_user_monitoring/setup
dependencies:
- https://github.com/DataDog/browser-sdk/blob/main/packages/rum/README.md
kind: ドキュメント
title: RUM ブラウザモニタリング
---
## 概要

Datadog Real User Monitoring (RUM) を使用すると、アプリケーションの個々のユーザーのリアルタイムパフォーマンスとユーザージャーニーを視覚化して分析できます。

## セットアップ

Datadog RUM ブラウザモニタリングを設定するには

1. Datadog で、[リアルユーザーモニタリングのページ][1]に移動し、**New Application** ボタンをクリックします。
2. アプリケーションの名前を入力し、**Generate Client Token** をクリックします。これにより、アプリケーションの `clientToken` と `applicationId` が生成されます。
3. [npm](#npm) またはホストされているバージョンの 1 つ ([CDN async](#cdn-async) または [CDN sync](#cdn-sync)) を介して Datadog RUM SDK をセットアップします。
4. 変更をアプリケーションにデプロイします。実行が開始されると、ユーザーブラウザから Datadog によってイベントが収集されます。
5. [収集されたデータ][2]は、Datadog の[ダッシュボード][3]で視覚的に確認できます。

**注**: Datadog がデータの受信を開始するまで、アプリケーションはアプリケーションリストページに「保留中」として表示されます。

**対応ブラウザ**: RUM SDK は、IE11 を含む最新のデスクトップブラウザとモバイルブラウザをすべてサポートします。下記の[ブラウザサポート][8]表をご参照ください。

### 適切なインストール方法の選択

npm (node package manager)
: 最新の Web アプリケーションには、この方法が推奨されます。RUM SDK は、残りのフロントエンド JavaScript コードとともにパッケージ化されます。ページの読み込みパフォーマンスに影響は出ませんが、SDK が初期化される前にトリガーされたエラー、リソース、ユーザーアクションは取りこぼされる場合があります。**注:** 使用する場合、ログ SDK と一致するバージョンの使用が推奨されます。

CDN 非同期
: この方法は、パフォーマンス目標のある Web アプリケーションに推奨されます。RUM SDK は、CDN から非同期的に読み込まれます。この方法を使用すると、SDK のダウンロードによるページの読み込みパフォーマンスへの影響を回避できます。ただし、SDK が初期化される前にトリガーされたエラー、リソース、ユーザーアクションは取りこぼされる場合があります。

CDN 同期
: この方法は、すべての RUM イベントを収集する場合に推奨されます。RUM SDK は、CDN から同期的に読み込まれます。この方法を使用すると、最初に SDK を読み込み、すべてのエラー、リソース、ユーザーアクションを収集することができます。この方法は、ページの読み込みパフォーマンスに影響を与える可能性があります。

### npm

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
  replaySampleRate: 100, // 含まれない場合 - デフォルト 100
  trackInteractions: true,
})
```

**注**: `trackInteractions` パラメーターは、アプリケーション内のユーザークリックの自動収集を有効にします。ページに含まれている**機密データと非公開データ**は、やり取りされた要素を特定するために含まれる場合があります。

### CDN 非同期

生成されたコードスニペットを、アプリケーションで監視するすべての HTML ページの head タグに追加します。

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

**注**:

- `trackInteractions` パラメーターは、アプリケーション内のユーザークリックの自動収集を有効にします。ページに含まれている**機密データと非公開データ**は、やり取りされた要素を特定するために含まれる場合があります。
- 始めの RUM API 呼び出しは `DD_RUM.onReady()` コールバックにラップされている必要があります。こうすることで、SDK が適切に読み込まれたときにのみコードが実行されるようにできます。

### CDN 同期

生成されたコードスニペットを、アプリケーションで監視するすべての HTML ページの head タグ（他のスクリプトタグの前にあるタグ）に追加します。同期型のスクリプトタグをより高い位置に含めると、Datadog RUM ですべてのパフォーマンスデータとエラーを収集できます。

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

**注**:

- `trackInteractions` パラメーターは、アプリケーション内のユーザークリックの自動収集を有効にします。ページに含まれている**機密データと非公開データ**は、やり取りされた要素を特定するために含まれる場合があります。
- `window.DD_RUM` チェックは、RUM SDK で読み込みエラーが起きた際に問題を防ぐために使用されます。

### TypeScript

タイプは TypeScript >= 3.8.2 と互換性があります。以前のバージョンの場合は、JS ソースをインポートし、グローバル変数を使用してコンパイルの問題を回避します。

```javascript
import '@datadog/browser-rum/bundle/datadog-rum'

window.DD_RUM.init({
  applicationId: 'XXX',
  clientToken: 'XXX',
  site: 'datadoghq.com',
  sampleRate: 100,
})
```

## 構成

### 初期化パラメーター

次のパラメーターを使用できます。

`applicationId`
: 必須<br/>
**タイプ**: 文字列<br/>
RUM アプリケーションの ID。

`clientToken`
: 必須<br/>
**タイプ**: 文字列<br/>
[Datadog クライアントトークン][5]。

`site`
: 必須<br/>
**タイプ**: 文字列<br/>
**デフォルト**: `datadoghq.com`<br/>
組織の Datadog のサイト、[Agent サイト構成][14]と同じ値です。

`service`
: オプション<br/>
**タイプ**: 文字列<br/>
アプリケーションのサービス名。[タグの構文要件][15]に従っている必要があります。

`env`
: オプション<br/>
**タイプ**: 文字列<br/>
アプリケーションの環境 (例: prod、pre-prod、staging など)。[タグの構文要件][15]に従っている必要があります。

`version`
: オプション<br/>
**タイプ**: 文字列<br/>
アプリケーションのバージョン。例: 1.2.3、6c44da20、2020.02.13 など。[タグの構文要件][15]に従っている必要があります。

`trackViewsManually`
: オプション<br/>
**タイプ**: Boolean<br/>
**デフォルト**: `false` <br/>
RUM ビューの作成を制御します。[デフォルトの RUM ビュー名をオーバーライドする][10]を参照してください。

`trackInteractions`
: オプション<br/>
**タイプ**: Boolean<br/>
**デフォルト**: `false` <br/>
[ユーザーアクションの自動収集][6]を有効にします。

`defaultPrivacyLevel`
: オプション<br/>
**タイプ**: 文字列<br/>
**デフォルト**: `mask-user-input` <br/>
[セッションリプレイプライバシーオプション][13]を参照してください。

`actionNameAttribute`
: オプション<br/>
**タイプ**: 文字列<br/>
[アクションに名前を付ける][9]ために使用する独自の属性を指定できます。

`sampleRate`
: オプション<br/>
**タイプ**: 数値<br/>
**デフォルト**: `100`<br/>
追跡するセッションの割合。`100` で全て、`0` でなし。追跡されたセッションのみが RUM イベントを送信します。`sampleRate` の詳細については、[サンプリング構成](#browser-and-session-replay-sampling-configuration)を参照してください。

`replaySampleRate`
: オプション<br/>
**タイプ**: 数値<br/>
**デフォルト**: `100`<br/>
[セッションリプレイ料金][11]の機能を持つ追跡されたセッションの割合。`100` で全て、`0` でなし。`replaySampleRate` の詳細については、[サンプリング構成](#browser-and-session-replay-sampling-configuration) を参照してください。

`silentMultipleInit`
: オプション<br/>
**タイプ**: Boolean <br/>
**デフォルト**: `false`<br/>
Datadog の RUM がページ上ですでに初期化されている場合、初期化が暗黙に失敗します。

`proxyUrl`
: オプション<br/>
**タイプ**: 文字列<br/>
オプションのプロキシ URL (例: https://www.proxy.com/path)。詳細については、完全な[プロキシ設定ガイド][7]を参照してください。

`allowedTracingOrigins`
: オプション<br/>
**タイプ**: List<br/>
トレースヘッダを注入するために使用されるリクエスト起源のリスト。[RUM とトレースの接続][12]を参照してください。

`logs` SDK も使用する場合、一致するコンフィギュレーションが必要なオプション:

`trackSessionAcrossSubdomains`
: オプション<br/>
**タイプ**: Boolean<br/>
**デフォルト**: `false`<br/>
同じサイトのサブドメイン間でセッションを保持します。

`useSecureSessionCookie`
: オプション<br/>
**タイプ**: Boolean<br/>
**デフォルト**: `false`<br/>
安全なセッション Cookie を使用します。これにより、安全でない (HTTPS 以外の) 接続で送信される RUM イベントが無効になります。

`useCrossSiteSessionCookie`
: オプション<br/>
**タイプ**: Boolean<br/>
**デフォルト**:`false`<br/>
安全なクロスサイトセッション Cookie を使用します。これにより、サイトが別のサイトから読み込まれたときに、RUM SDK を実行できます (iframe)。`useSecureSessionCookie` を意味します。

#### 例

追跡を開始するには、Init を呼び出す必要があります。

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

### ブラウザとセッションリプレイのサンプリング構成

**注**: この機能を使用するには、SDK v3.6.0+ が必要です。

新しいセッションが作成されると、次のいずれかとして追跡できます。

- [**ブラウザ RUM**][11]: _セッション_、_ビュー_、_アクション_、および_エラー_**のみ**が収集されます。`startSessionReplayRecording()` への呼び出しは無視されます。
- [**セッションリプレイ RUM**][11]: ブラウザ RUM のすべてと、_リソース_、_ロングタスク_、_リプレイ_の記録が収集されます。_リプレイ_の記録を収集するには、`startSessionReplayRecording()` の呼び出しが必要です。

セッションの追跡方法を制御するために、2 つの初期化パラメーターが利用可能です。

- `sampleRate` は、追跡されるセッション全体の割合を制御します。デフォルトは `100%` で、すべてのセッションが追跡されます。

- `replaySampleRate` は、全体のサンプルレートの**後に**適用され、セッションリプレイ RUM として追跡されるセッションの割合を制御します。デフォルトは `100%` で、すべてのセッションがセッションリプレイ RUM として追跡されます。

例えば、セッションの 100% をブラウザ RUM として追跡する場合

```
datadogRum.init({
    ....
    sampleRate: 100,
    replaySampleRate: 0
});
```

例えば、セッションの 100% をセッションリプレイ RUM として追跡する場合

```
datadogRum.init({
    ....
    sampleRate: 100,
    replaySampleRate: 100
});
```

例えば、全体のセッションの 50% のみを追跡し、半分はブラウザ RUM として、残りの半分はセッションリプレイ RUM としてトラッキングする場合、`sampleRate` と `replaySampleRate` を 50 に設定します。

```
datadogRum.init({
    ....
    sampleRate: 50,
    replaySampleRate: 50
});
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
[7]: https://docs.datadoghq.com/ja/real_user_monitoring/faq/proxy_rum_data/
[8]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/BROWSER_SUPPORT.md
[9]: https://docs.datadoghq.com/ja/real_user_monitoring/browser/tracking_user_actions#declaring-a-name-for-click-actions
[10]: https://docs.datadoghq.com/ja/real_user_monitoring/browser/modifying_data_and_context/?tab=npm#override-default-rum-view-names
[11]: https://www.datadoghq.com/pricing/?product=real-user-monitoring#real-user-monitoring
[12]: https://docs.datadoghq.com/ja/real_user_monitoring/connect_rum_and_traces?tab=browserrum
[13]: https://docs.datadoghq.com/ja/real_user_monitoring/session_replay/privacy_options?tab=maskuserinput
[14]: https://docs.datadoghq.com/ja/agent/basic_agent_usage#datadog-site
[15]: https://docs.datadoghq.com/ja/getting_started/tagging/#defining-tags