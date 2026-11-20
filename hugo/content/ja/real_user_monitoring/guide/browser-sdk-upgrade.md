---
description: 破壊的変更、新機能、互換性の更新を伴う RUM Browser SDK のメジャーバージョン間移行のためのアップグレードガイド。
further_reading:
- link: /real_user_monitoring/explorer
  tag: ドキュメント
  text: エクスプローラーで RUM データを視覚化する
- link: https://www.datadoghq.com/blog/session-replay-datadog/
  tag: ブログ
  text: Datadog Session Replay を使用してユーザージャーニーをリアルタイムで表示する
title: RUM Browser SDK のアップグレード
---
## 概要 {#overview}

このガイドに従って、ブラウザ RUM およびブラウザログ SDK のメジャーバージョン間の移行を行います。機能や特長の詳細については、[SDK のドキュメント][26]を参照してください。

## v6 から v7 への移行 {#from-v6-to-v7}

v7 SDK では、プライバシーのデフォルト設定が改善され、非推奨のオプションが削除され、SDK の内部構造が最新化されました。ほとんどの変更には、構成の更新が必要です。

SDK をアップグレードする際は、以下の破壊的変更に注意してください。変更内容は影響範囲ごとにグループ化されています。

<div class="alert alert-tip"> エージェントスキルをサポートする AI コーディングアシスタントを使用している場合は、<a href="https://github.com/datadog-labs/agent-skills/blob/main/dd-browser-sdk/upgrade-v7/SKILL.md"><code>upgrade-browser-sdk-v7</code> スキル</a> を適用して、以下の移行手順のほとんどを自動化できます。</div>

### コア {#core}

#### セッションマネージャーの再作成 {#session-manager-rewrite}

セッションを追跡するシステムが再作成され、データの信頼性が向上し、課金の不一致が削減されました。設定によっては、セッション数に変化が見られる場合があります。

#### 決定論的サンプリングの決定 {#deterministic-sampling-decisions}

以前は、サンプリングの決定はセッションの作成時に一度行われ、それが保持されていました。v7 では、セッション ID とサンプルレートからオンデマンドで計算されるため、どのページが SDK を初期化しても一貫性が保たれます。ページ間で異なるサンプリングレートを使用している場合、それらのレートが一貫して適用されます。

<div class="alert alert-warning">v7 へのアップグレードにより、RUM セッション ID に基づく分散トレースの決定論的サンプリングが導入されます。その結果、RUM without Limits を使用している場合、関連するトレースがサンプリングされたセッションがインデックス化される可能性が大幅に高まります。設定を変更しなくても、既存のクロスプロダクト保持フィルターによってより多くのトレースが保持されます。<br><br>クロスプロダクト保持フィルター (例: RUM にリンクされた APM トレース) を使用している場合、<strong>インデックス化されるスパンの量が増加</strong>し、<strong>コストが高くなる</strong>ことがあります。アップグレード後に、保持フィルターの設定と推定スパンボリュームを確認してください。</div>

#### セッションストアキーの名前変更 {#session-store-key-renamed}

新しいセッションマネージャーは互換性のないストレージ形式を使用するため、セッションストレージキーが `_dd_s` から `_dd_s_v2` に変更されました。アップグレード時に、既存のセッションは自動的に `_dd_s` から移行されます。

**注**: アップグレード後に v6 にロールバックした場合、v6 SDK は `_dd_s_v2` キーを読み取らないため、新しいセッションが開始されます。特定の cookie 名を許可リストに登録する CSP または cookie ポリシーがある場合は、`_dd_s_v2` を追加してください。

#### CDN バンドル URL を更新する {#update-the-cdn-bundle-url}

Datadog CDN から SDK を読み込む場合は、バンドル URL のバージョンセグメントを `v6` から `v7` に更新してください。これはすべてのバンドルに適用されます。

| バンドル   | URL                                                                     |
| -------- | ----------------------------------------------------------------------- |
| RUM      | `https://www.datadoghq-browser-agent.com/<SITE>/v7/datadog-rum.js`      |
| RUM Slim | `https://www.datadoghq-browser-agent.com/<SITE>/v7/datadog-rum-slim.js` |
| ログ     | `https://www.datadoghq-browser-agent.com/<SITE>/v7/datadog-logs.js`     |

`<SITE>` は、自分の Datadog サイト (例: `us1`、`us3`、`us5`、`eu1`、`ap1`、`ap2`、または `uk1`) に置き換えます。自分のサイトの URL は、[セットアップドキュメント][26]でご確認ください。

#### CDN バンドルが ESM 動的インポートを使用する {#cdn-bundles-use-esm-dynamic-imports}

CDN バンドルは CommonJS の代わりに ESM 動的インポートを使用するため、Webpack のオーバーヘッドとバンドル全体のサイズが削減されます。CDN スニペットを使用している場合は、script タグに `crossorigin` 属性を追加してください。

```html
<script src="https://www.datadoghq-browser-agent.com/..." crossorigin="anonymous"></script>
```

スニペットの例をすべて見るには、[セットアップドキュメント][26]を参照してください。

#### ES2020 ブラウザのベースライン {#es2020-browser-baseline}

互換性シムとポリフィルを削除するために、ES2020 より前のブラウザのサポートを終了しました。これにより、バンドルサイズが削減されます。サポートされている最小バージョンは、Chrome 80 以降、Firefox 78 以降、Safari 14 以降です。予想される影響: カバレッジが約 0.048% 減少します。

古いブラウザのサポートを継続するには、v6 以前の Browser SDK を使用してください。

#### 削除されたオプション {#removed-options}

| 非推奨のオプション (v6 以前) | 代替 (v7)                                       |
| --------------------------------- | ------------------------------------------------------ |
| `betaEncodeCookieOptions`         | cookie エンコーディングは常に有効です。                    |
| `allowFallbackToLocalStorage`     | `sessionPersistence: ['cookie', 'local-storage']` を使用します。|

### RUM {#rum}

#### `propagateTraceBaggage` がデフォルトで有効 {#propagatetracebaggage-enabled-by-default}

`propagateTraceBaggage` [初期化パラメーター][28]は、v7 ではデフォルトで`true` になります。Baggage を伝播させることで、テールベースサンプリングが可能になり、トレースからユーザーおよびアカウントのコンテキストにアクセスできるようになります。

クロスオリジンリクエストで分散型トレーシングを使用する場合は、`propagateTraceBaggage: false` を設定するか、`Access-Control-Allow-Headers` レスポンスヘッダーに `baggage` を追加してください。

```
Access-Control-Allow-Headers: traceparent, tracestate, baggage
```

#### `defaultPrivacyLevel` の新しいデフォルト {#new-default-for-defaultprivacylevel}

v7 では、`defaultPrivacyLevel` はデフォルトで `mask-user-input` に設定されます (以前は `mask` でした)。そのため、完全なマスキングの制限なしにユーザー入力をマスクするプライバシーのデフォルトが提供されます。新しいデフォルトでは、ユーザー入力はマスクされますが、その他のコンテンツは収集されます。

完全なマスキングを維持する場合は、`defaultPrivacyLevel: "mask"` を明示的に設定してください。

#### `enablePrivacyForActionName`がデフォルトで有効 {#enableprivacyforactionname-enabled-by-default}

v7 では、`enablePrivacyForActionName` はデフォルトで `true` に設定されます。クリックアクション名は、デフォルトで `defaultPrivacyLevel` 設定に従います。オプトアウトする場合は、`enablePrivacyForActionName: false` を設定してください。

#### `startDurationVital`および `stopDurationVital` API の変更 {#startdurationvital-and-stopdurationvital-api-change}

`DurationVitalReference` オブジェクトは `vitalKey` 文字列オプションに置き換えられました。これにより、API が `startResource`/`stopResource` と `startAction`/`stopAction`、およびモバイル SDK と整合するようになります。同じ名前を持つ複数の同時バイタルは引き続きサポートされます。

```js
// Before
const ref = datadogRum.startDurationVital('myVital')
datadogRum.stopDurationVital(ref)

// After
datadogRum.startDurationVital('myVital', { vitalKey: 'uniqueKey' })
datadogRum.stopDurationVital('myVital', { vitalKey: 'uniqueKey' })
```

#### 新しい `session_renewal` ビューの読み込みタイプ {#new-session-renewal-view-loading-type}

セッションが期限切れになって更新されると、新しいビューが `route_change` ではなく、`@view.loading_type:session_renewal` で作成されます。`@view.loading_type` でフィルターされているダッシュボードやモニターにもセッション更新後のビューを含める必要がある場合は、それらを更新してください。

#### ドキュメントリソースで `PerformanceNavigationTiming` {#document-resource-uses-performancenavigationtiming} が使用される

初期ドキュメントリソースイベントは、以前は Synthetic タイミングエントリを使用していました。v7 ではブラウザのネイティブ `PerformanceNavigationTiming` を直接使用するため、ドキュメントリソースの `resource.duration` 値がわずかに異なる場合があります。ドキュメントリソースの `initiatorType` が `initial_document` から `navigation` に変更されます。

ドキュメントリソースの `performanceEntry` を検査するプラグインやドメインコンテキストハンドラーを使用している場合は、`PerformanceResourceTiming` ではなく `PerformanceNavigationTiming` を想定するように更新してください。

#### FID (First Input Delay) が削除された {#first-input-delay-fid-removed}

Google は、コアウェブバイタルとして、FID の代わりに INP (Interaction to Next Paint) を使用するようになりました。バンドルサイズを削減するために、FID が SDK から削除されました。代わりに INP を使用してください。

#### プラグイン API: `strategy` が削除された {#plugin-api-strategy-removed}

`strategy` フィールドがプラグイン API から削除されました。`rum-react` やその他のインテグレーションを使用している場合は、コア SDK と併せて v7 にアップグレードしてください。

#### アクション名の計算が改善された {#improved-action-name-computation}

v7 では、SDK はアクション名を計算するための新しい方法を使用します。この方法では DOM 構造を考慮することで、要素のプライバシーレベルをより正確に適用し、シャドウ DOM コンテンツの処理を改善します。アクション名が若干異なる場合があります。`betaTrackActionsInShadowDom` オプションは削除されました。

#### バック/フォワードキャッシュの操作が常に追跡される {#bfcache-navigations-always-tracked}

バック/フォワードキャッシュの復元が、正確な読み込み時間やコアウェブバイタルを含め、`@view.loading_type:bf_cache` によって個別のビューとして追跡されます。`trackBfCacheViews` オプションは削除されました。

#### 早期リクエストが常に収集される {#early-requests-always-collected}

SDK が初期化される前に発生したリソースとリクエストは、自動的にキャプチャされます。このような早期リソースでは、ステータスコードなどのプロパティが欠落している場合があります。`trackEarlyRequests` オプションは削除されました。

#### 非同期チャンクファイル名に `datadog` がプレフィックスとして付加される {#async-chunk-file-names-prefixed-with-datadog}

非同期チャンクのファイル名には `datadog` プレフィックスが含まれます (例: `datadog-rum-recorder.js`)。古い名前と照合する CSP やキャッシュルールがある場合は、適宜更新してください。

### ログ {#logs}

#### ログにはセッションマネージャーが必要 {#logs-require-a-session-manager}

ログは常にセッションマネージャーを使用するため、ログイベントには常にセッション ID が関連付けられます。cookie もローカルストレージも利用できない場合、SDK はデータを送信せず、警告をログに記録します。以前は、ストレージがなくてもログが開始されていました。

メモリベースのセッションを明示的に有効にするには、`sessionPersistence: 'memory'` を使用してください。ワーカー環境では、このフォールバックは自動的に行われます。

#### `forwardErrorsToLogs`と `forwardConsoleLogs` は独立している {#forwarderrorstologs-and-forwardconsolelogs-are-independent}

以前は、`forwardErrorsToLogs` を有効にすると、`console.error` の呼び出しも暗黙的に転送されていました。v7 では、これらのオプションは完全に独立しています。転送対象を正確に制御できます。`forwardErrorsToLogs` は未処理のエラーのみを制御する

以前の動作を維持するには、`error` を `forwardConsoleLogs` 配列に追加します。

```js
DD_LOGS.init({
  forwardConsoleLogs: ['error', 'warn'],
})
```

#### キャンセルされたリクエストのネットワークエラーが破棄される {#network-errors-for-canceled-requests-are-dropped}

アプリケーションによってキャンセルされたリクエスト (中止されたフェッチまたは XHR) は、ネットワークエラーログを生成しなくなりました。これにより、エラー追跡におけるノイズが低減されます。

#### 削除されたオプション {#removed-options-1}

| 非推奨のオプション (v6 以前) | 代替 (v7)                                                           |
| --------------------------------- | -------------------------------------------------------------------------- |
| `usePciIntake`                    | 標準の取り込みは PCI 準拠です。必要に応じて [CSP][18] を更新してください。|

### Session Replay {#session-replay}

#### 新しいデータ形式 {#new-data-format}

v7 では、Session Replay はよりコンパクトな新しいデータ形式を使用するため、帯域幅の使用量が大幅に削減されます。Session Replay データは、Browser SDK API を通じて直接公開されないため、この変更を導入するために必要なアクションはありません。

## v5 から v6 への移行 {#from-v5-to-v6}

v6 による主な改善点は、バンドルサイズの削減です。IE11 のサポートを終了し、遅延読み込みを活用することで、RUM バンドルのサイズは 10%、ログバンドルのサイズは 9% 近く削減されました。
さらに、いくつかのデフォルトの初期化パラメーターを変更し、将来の改善に備えました。

SDK をアップグレードする際は、以下の破壊的変更に注意してください。

### 破壊的変更 {#breaking-changes}

#### ブラウザサポート {#browser-support}

IE11 およびその他の古いブラウザのサポートは終了しました。ブラウザは現在、少なくとも ES2018 をサポートしている必要があります。
それより古いブラウザで Datadog を使用するには、Browser SDK v5 以前を継続して使用してください。

#### tracecontext プロパゲーターを使用する際に tracestate ヘッダーを追加 {#add-tracestate-header-when-using-tracecontext-propagator}

デフォルトの `tracecontext` プロパゲーターは、トレースのより適切な帰属を可能にする追加のメタデータを含む新しい `tracestate` ヘッダーを送信するようになりました。このプロパゲーターを使用している場合は、既存の `traceparent` ヘッダーに加えて、すべてのトレース対象エンドポイントに対してこの新しいヘッダーを許可する必要があります。

```
Access-Control-Allow-Headers: traceparent, tracestate
```

#### `site` オプションを厳密に型指定する {#strongly-type-site-option}

`site` オプションの型定義がより厳密になりました。TypeScript を使用している場合、標準以外の値を使用するとエラーが発生する可能性があります。RUM データを非標準の URL に送信する場合は、[プロキシ][27]を使用することをお勧めします。

#### アクション、リソース、およびロングタスクの追跡がデフォルトで有効化されるようになった {#tracking-actions-resources-and-longtask-are-now-enabled-by-default}

ユーザーインタラクション、リソース、およびロングタスクが、デフォルトで追跡されるようになりました。この変更が課金に影響することはありません。オプトアウトするには、`trackUserInteractions`、`trackResources`、および `trackLongTasks` [初期化パラメーター][28]を `false` に設定してください。

#### 長いアニメーションフレームをロングタスクとして収集する {#collect-long-animation-frames-as-long-tasks}

サポートされているブラウザでは、ロングタスクの代わりに[長いアニメーションフレーム][35]が収集されるようになりました。RUM エクスプローラーのイベントタイプは `long_task` のままですが、長いアニメーションフレームに関する情報が含まれるようになります。

#### cookie の有効期限日が延長された {#increased-cookies-expiration-date}

匿名ユーザーの追跡をサポートするために、セッション cookie (`_dd_s`) の有効期限が 1 年に延長されました。オプトアウトするには、`trackAnonymousUser` [初期化パラメーター][28]を `false` に設定してください。

#### useCrossSiteSessionCookie 初期化パラメーターが削除された {#removed-usecrosssitesessioncookie-initialization-parameter}

`useCrossSiteSessionCookie` は非推奨となり、サポートされなくなりました。代わりに `usePartitionedCrossSiteSessionCookie` [初期化パラメーター][28]を使用してください。

#### Session Replay の遅延読み込み {#lazy-load-session-replay}

Session Replay モジュールが、[動的インポート][30]を使用して遅延読み込みされるようになりました。これにより、Session Replay 用にサンプリングされたセッションのモジュールのみが読み込まれるようになるため、それ以外のセッションのバンドルサイズが削減されます。

**NPM 経由で SDK を使用している場合は**、使用しているバンドラーが動的インポートをサポートしていることを確認してください。ほとんどの最新のバンドラーはこの機能を標準でサポートしていますが、設定の変更が必要な場合もあります。手順については、バンドラーのドキュメントを参照してください: [Webpack][31]、[Esbuild][32]、[Rollup][33]、[Parcel][34]。

**CDN 経由で SDK を使用している場合は**、破壊的変更はありません。ただし、読み込まれるメインスクリプト (例:
`datadog-rum.js`) に加え、SDKは必要に応じて追加のチャンクを動的に読み込みます (例:
`recorder-d7628536637b074ddc3b-datadog-rum.js`)。

#### サンプリングされていないトレースにはトレースコンテキストを挿入しない {#do-not-inject-trace-context-for-non-sampled-traces}

`traceContextInjection` 初期化パラメーターのデフォルト値が `sampled` に更新され、Browser SDK でトレースがサンプリングされない場合でも、バックエンドサービスのサンプリングに関する決定が反映されるようになりました。詳細については、[RUM とトレースの接続に関するドキュメント][29]を参照してください。

**注**: 100% (デフォルト) の `traceSampleRate` を使用している場合、この変更による影響はありません。



### 将来の破壊的変更 {#future-breaking-changes}

#### Datadog 取り込みリクエストの圧縮が有効になる {#enabling-compression-for-datadog-intake-requests}

Datadog 取り込みリクエストの圧縮は、将来のメジャーバージョンでデフォルトで有効になる予定です。
Datadog では、`compressIntakeRequests` [初期化パラメーター][28]を使用して、今すぐ圧縮をオプトインすることを推奨しています。
圧縮はワーカースレッドで実行されるため、コンテンツセキュリティポリシーの設定が必要です。詳細については、[CSP ガイドライン][18]を参照してください。

## v4 から v5 への移行 {#from-v4-to-v5}

v5 では、以下の変更点などが導入されています。

- Session Replay の新しい構成とプライバシーのデフォルト設定
- フラストレーションシグナルの自動収集
- パフォーマンスメトリクスの更新
- SDK パラメーターと API の更新

SDK をアップグレードする際は、以下の破壊的変更に注意してください。変更内容は影響範囲ごとにグループ化されています。

### 一般 {#general}

#### SDK 初期化パラメーター {#sdk-initialization-parameters}

**取るべきアクション**: 非推奨パラメーターを v5 の新しいパラメーターに置き換えてください。旧パラメーター名は v5 では使用できません。

| 非推奨パラメーター名 (v4 以前) | 新しいパラメーター名 (v5) |
|-------------------------------------------|-------------------------|
| proxyUrl | proxy |
| sampleRate | sessionSampleRate |
| allowedTracingOrigins | allowedTracingUrls |
| tracingSampleRate | traceSampleRate |
| trackInteractions | trackUserInteractions |
| premiumSampleRate | sessionReplaySampleRate |
| replaySampleRate | sessionReplaySampleRate |

#### パブリック API {#public-apis}

**取るべきアクション**: 非推奨の API を新しい同等の API に置き換えてください。旧 API は v5 では使用できません。

| 非推奨パラメーター名 (v4 以前) | 新しいパラメーター名 (v5) |
|-------------------------------------------|-------------------------|
| DD_RUM.removeUser | [DD_RUM.clearUser][7] |
| DD_RUM.addRumGlobalContext | [DD_RUM.setGlobalContextProperty][8] |
| DD_RUM.removeRumGlobalContext | [DD_RUM.removeGlobalContextProperty][9] |
| DD_RUM.getRumGlobalContext | [DD_RUM.getGlobalContext][10] |
| DD_RUM.setRumGlobalContext | [DD_RUM.setGlobalContext][11] |
| DD_LOGS.addLoggerGlobalContext | [DD_LOGS.setGlobalContextProperty][8] |
| DD_LOGS.removeLoggerGlobalContext | [DD_LOGS.removeGlobalContextProperty][9] |
| DD_LOGS.getLoggerGlobalContext | [DD_LOGS.getGlobalContext][12] |
| DD_LOGS.setLoggerGlobalContext | [DD_LOGS.setGlobalContext][13] |
| logger.addContext | [logger.setContextProperty][14] |
| logger.removeContext | [logger.removeContextProperty][15] |

#### インテークドメイン {#intake-domains}
v5 では、以前のバージョンとは異なるインテークドメインにデータが送信されます。

**取るべきアクション**: [CSP (コンテンツセキュリティポリシー)][18] `connect-src` エントリを新しいドメインに更新してください。

| Datadog サイト | ドメイン |
|--------------|--------|
| US1 | `connect-src https://browser-intake-datadoghq.com` |
| US3 | `connect-src https://browser-intake-us3-datadoghq.com` |
| US5 | `connect-src https://browser-intake-us5-datadoghq.com` |
| EU1 | `connect-src https://browser-intake-datadoghq.eu` |
| US1-FED | `connect-src https://browser-intake-ddog-gov.com` |
| US2-FED | `connect-src https://browser-intake-us2-ddog-gov.com` |
| AP1 | `connect-src https://browser-intake-ap1-datadoghq.com` |
| UK1 | `connect-src https://browser-intake-uk1-datadoghq.com` |

#### 信頼されているイベント {#trusted-events}
不正または不正確なデータの収集を避けるために、v5 ではユーザーのアクションによって生成されたイベントのみをリッスンし、スクリプトによって生成されたイベントは無視されます。詳細については、[信頼されているイベント][19]を参照してください。

**取るべきアクション**: プログラムによるイベントも SDK で考慮されるようにする場合は、以下のように `__ddIsTrusted` 属性を追加してください。

```javascript
const click = new Event('click')
click.__ddIsTrusted = true
document.dispatchEvent(click)
```

**取るべきアクション**: たとえば、自動化された UI テスト環境などでプログラムによるイベントに大きく依存している場合は、`allowUntrustedEvents: true` を設定して、すべての信頼されていないイベントを許可することができます。

#### `beforeSend`の戻り値の型 {#beforesend-return-type}
`beforeSend` コールバック関数はブール値を返す必要があります。

```javascript
beforeSend(event: any, context?: any) => boolean
```

実装は変更されていません。値が返されない場合でも、イベントは破棄されません。

**取るべきアクション**: `beforeSend` が `true` を返すとイベントは保持され、`false` を返すとイベントが破棄されることを確認してください。これにより、関連する TypeScript のコンパイルエラーが解決されます。

### Session Replay {#session-replay-1}

#### Session Replay マスキング {#session-replay-masking}

デフォルトの Session Replay マスキング設定の `defaultPrivacyLevel` が、`mask-user-input` から `mask` に変更されました。これにより、Session Replay 記録の全データがデフォルトで非表示になり、記録の閲覧時の安全性が高まります。詳細については、「Session Replay ブラウザのプライバシーオプション[20]」を参照してください。

**取るべきアクション**: Session Replay で機密性のない HTML コンテンツやユーザーが入力したテキストなどのマスクされていないデータを表示したい場合は、`defaultPrivacyLevel` を `mask-user-input` または `allow` に設定してください。

#### Session Replay 用にサンプリングされたセッションの自動記録 {#automatic-recording-of-sessions-sampled-for-session-replay}
[`sessionReplaySampleRate`][21] を使用して Session Replay 用にサンプリングされたセッションは、セッションの開始時に自動的に記録されます。つまり、記録をキャプチャするために [`startSessionReplayRecording()`][22] メソッドを呼び出す必要はありません。言い換えると、誤って記録を取り残すことはありません。

**取るべきアクション**: 古い記録方法を継続し、記録の開始タイミングをカスタマイズしたい場合は、`startSessionReplayRecordingManually` を `true` に設定してください。

#### セッションが記録をキャプチャした場合にのみ Session Replay の料金が発生する {#only-pay-for-session-replay-when-the-session-captures-a-recording}
以前の SDK バージョンでは、セッションはサンプリングメカニズムによって Session Replay セッションであると判断されていました。v5 では、セッション中に記録がキャプチャされた場合にのみ、そのセッションが Session Replay セッションであると見なされます。これにより、Session Replay の使用状況を追跡しやすくなります。

**アクションは必要ありません**: この動作は v5 で自動的に有効になります。

#### デフォルトの Session Replay サンプリングレート {#default-session-replay-sampling-rate}
v5 では、デフォルトの `sessionReplaySampleRate` は 100 ではなく 0 です。サンプリングレートを指定しないと、リプレイは記録されません。

**取るべきアクション**: Session Replay を使用するには、`sessionReplaySampleRate: 100` (または他のサンプリングレート) を明示的に設定してください。

### RUM {#rum-1}

### APM インテグレーション {#apm-integration}

OpenTelemetry のサポートと利用を促進するために、デフォルトのプロパゲータータイプに `tracecontext` が `datadog` に加えて追加されました。

**取るべきアクション**: `allowedTracingUrls` 初期化パラメーターで目的のプロパゲーターをまだ指定していない場合は、`traceparent` ヘッダーも受け付けるようにサーバーの Access-Control-Allow-Headers を構成してください。詳しくは、「[RUM とトレースの接続][25]」をご覧ください。

### セッションプランフィールド {#session-plan-field}

Session Replay の変更に伴い、`session.plan` フィールドはセッションイベントでのみ利用可能です。

**取るべきアクション**: 保存しているモニターやダッシュボードのクエリを更新し、非セッションイベントの `session.plan` フィールドを除外してください。

#### フラストレーションシグナルが自動的に収集される {#frustration-signals-are-collected-automatically}
フラストレーションシグナルを含むすべてのユーザーインタラクションを収集するには、`trackUserInteractions: true` を設定するだけで済みます。`trackFrustrations` パラメーターを個別に設定する必要はなくなりました。

**取るべきアクション**: フラストレーションシグナルを追跡するには、`trackUserInteractions: true` を設定してください。`trackFrustrations` パラメーターは削除してもかまいません。

#### フリーズしたページではリソースの継続時間が省略される {#resource-durations-are-omitted-for-frozen-pages}
ページがバックグラウンドになったために延長されたリソースの持続時間は、リソースコレクションで省略されます。たとえば、ページの読み込み中にユーザーが別のタブをクリックした場合などです。

**アクションは必要ありません**: この動作は v5 で自動的に有効になります。

#### リソースとロングタスクの追跡 {#resources-and-long-task-tracking}
`replaySampleRate` や `premiumSampleRate` (どちらも非推奨) の代わりに `sessionReplaySampleRate` を使用する場合、リソースとロングタスクを明示的に構成する必要があります。

**取るべきアクション**: これらのイベントを収集するには、`trackResources` と `trackLongTasks` が `true` に設定されていることを確認してください。

#### リソースメソッド名が大文字 {#resource-method-names-are-in-uppercase}
大文字と小文字の違い (POST vs post) によって同じメソッド名が異なる値として扱われるのを避けるため、メソッド名は一貫して大文字で送信されるようになりました。

**取るべきアクション**: モニターやダッシュボードのクエリを更新し、`resource.method` フィールドに大文字の値を使用してください。

#### `beforeSend`アクションイベント {#beforesend-action-event}
`beforeSend` API は、収集したイベントのコンテキスト情報へのアクセスを許可します (「[RUM データの情報付加と管理][23]」を参照)。

フラストレーションシグナルの導入により、アクションイベントは複数の DOM イベントに関連付けることができます。

この更新に伴い、`context.event` 属性は削除され、`context.events` 属性が使用されるようになりました。

**取るべきアクション**: `context.event` の代わりに `context.events` を使用するように `beforeSend` コードを更新してください。

```javascript
beforeSend: (event, context) => {
  if (event.type === 'action' && event.action.type === 'click') {
    // accessing browser events related to the action event
    // before, single event: context.event
    // now, multiple events: context.events
  }
}
```

#### `beforeSend` のフォアグラウンド期間 {#beforesend-in-foreground-periods}
`view.in_foreground_periods` 属性は SDK から送信されるのではなく、バックエンドで直接計算されます。

**取るべきアクション**: `beforeSend` コードから `view.in_foreground_periods` を削除してください。特定のユースケースでこの属性を利用していた場合は、[サポート][24]にお問い合わせください。

#### `beforeSend`パフォーマンスエントリ {#beforesend-performance-entry}
`beforeSend` コンテキストの `performanceEntry` 属性が JSON 表現から更新され、パフォーマンスエントリオブジェクトを直接含むようになりました。

エクスポートされた `PerformanceEntryRepresentation` 型は削除され、標準の `PerformanceEntry` 型が使用されるようになりました。

**取るべきアクション**: `beforeSend` コードでは、`PerformanceEntryRepresentation` 型の代わりに `PerformanceEntry` 型を直接使用してください。

### ログ {#logs-1}
#### コンソールエラーのプレフィックスを削除 {#remove-console-error-prefix}
ログメッセージの「`console error:`」プレフィックスが削除されました。この情報は `origin` 属性で確認できます。

**取るべきアクション**: `"console error:"` プレフィックスを使用しているモニターやダッシュボードのクエリを更新し、代わりに `@origin:console` を使用してください。

#### `error.origin` を削除 {#remove-errororigin}

すべてのログに `origin` 属性が導入されたため、`error.origin` は冗長となり、削除されました。

**取るべきアクション**: `error.origin` を使用しているモニターやダッシュボードのクエリを更新し、代わりに `origin` を使用してください。

#### メインロガーを分離 {#decouple-main-logger}
SDK がランタイムエラーやネットワーク、レポート、コンソールログを収集する際に、メインロガー (`DD_LOGS.logger`) に固有のコンテキストを追加せず、そのロガーに設定されたレベルやハンドラーを使用しません。

**取るべきアクション**: 非ロガーのログを除外するためにメインロガーのレベルに依存していた場合、代わりに専用の初期化パラメーターを使用してください。

**取るべきアクション**: 非ロガーのログにコンテキストを追加するためにメインロガーのコンテキストを利用していた場合は、代わりにグローバルコンテキストを使用してください。

## v3 から v4 への移行 {#from-v3-to-v4}

v4 では、RUM と Logs Browser SDK にいくつかの重大な変更が加えられました。

### 変更 {#changes}

#### 取込先 URL {#intake-urls}

RUM Browser SDK のデータ送信先 URL が変更されました。[コンテンツセキュリティポリシーが最新であること][1]を確認してください。

#### 最小限の Typescript のバージョンサポート {#minimal-typescript-version-support}

RUM Browser SDK v4 は、v3.8.2 より前の TypeScript と互換性がありません。TypeScript を使用する場合は、バージョンが v3.8.2 以上であることを確認してください。

#### タグの構文 {#tags-syntax}

`version`、`env`、および `service` 初期化パラメーターは、Datadog にタグとして送信されます。RUM Browser SDK は、複数のタグが生成されないように、それらをわずかにサニタイズし、それらの値がタグの要件構文に適合しない場合は警告を表示します。

#### 初期化パラメーターの型の厳格化 {#stricter-initialization-parameters-typing}

初期化パラメーターを表す TypeScript の型が厳格化されたため、以前は受け入れられていた、サポートされないパラメーターが拒否されることがあります。型チェックエラーが発生した場合は、サポートされている初期化パラメーターを指定していることを確認してください。

#### プライバシーオプションの優先順位 {#privacy-options-precedence}

複数のプライバシーオプションが同じ要素に指定されている場合、Datadog は最も制限の厳しいオプションを適用し、機密データの予期せぬ漏えいを防ぎます。たとえば、同じ要素に `dd-privacy-allow` と `dd-privacy-hidden` の両方のクラスが指定されている場合、許可されるのではなく非表示になります。

#### アクション名計算 {#action-names-computation}

RUM Browser SDK は、アクション名を計算する際に、`data-dd-action-name` 属性を持つ子要素のテキストを内側のテキストから削除しています。

たとえば、次の `container` 要素の場合、以前は計算されるアクション名は `Container sensitive data` でしたが、v4 では計算されるアクション名は `Container` になります。

```html
<div id="container">
  Container
  <div data-dd-action-name="sensitive">sensitive data</div>
</div>
```

### 削除 {#removals}

#### XHR`_datadog_xhr` フィールド{#xhr-datadog-xhr-field}

RUM Browser SDK は、以前は `XMLHttpRequest` オブジェクトの内部状態を表す `_datadog_xhr` プロパティを使用していました。このプロパティは、外部で使用されることを想定していなかったため、代替することなく削除されました。

#### `proxyHost`初期化パラメーター {#proxyhost-initialization-parameter}

`proxyHost` 初期化パラメーターは削除されました。代わりに `proxyUrl` 初期化パラメーターを使用してください。

#### プライバシーオプション対応 {#privacy-options-support}

プライバシーオプションの `input-ignored` と `input-masked` は無効になりました。代わりに、`mask-user-input` プライバシーオプションを使用してください。

具体的には、以下のように置き換えてください。

* `dd-privacy-input-ignored` および `dd-privacy-input-masked` クラス名を `dd-privacy-mask-user-input` に置き換えます。
* `dd-privacy="input-masked"` および `dd-privacy="input-ignored"` 属性値を `dd-privacy="mask-user-input"` に置き換えます。

## v2 から v3 への移行 {#from-v2-to-v3}

Browser SDK v3 では [Session Replay][2] が導入されました。このメジャーバージョンの更新に伴い、RUM および Logs Browser SDK に破壊的変更がいくつか加えられました。

### 変更 {#changes-1}
#### RUM エラー {#rum-errors}

RUM Browser SDK では、失敗した XHR および Fetch 呼び出しに対する [RUM エラー][3]が生成されなくなりました。これらの失敗したネットワークリクエストは引き続き、ステータスコード属性を含む [RUM リソース][4]として収集されます。

失敗したネットワークリクエストを引き続き RUM エラーとして表示するには、Datadog では、[beforeSend API][5] を使用したリソースの傍受、`status_code` プロパティのチェック、[addError API][6] を使用したエラーの手動送信をおすすめします。

```javascript
beforeSend: (event) => {
    if (event.type === 'resource' && event.resource.status_code >= 500) {
        datadogRum.addError(`${event.resource.method} ${event.resource.url} ${event.resource.status_code}`); // "GET https://www.example.com/ 504"
    }
}
```

#### RUM エラーソース属性 {#rum-error-source-attribute}

RUM Browser SDK では、[addError API][6] で収集されたエラーのソースを指定できなくなりました。この API で収集されたすべてのエラーのソース属性は、`custom` に設定されます。[addError API][6] は、コンテキストオブジェクトをその 2 番目のパラメーターとして受け入れます。これは、エラーに関する追加コンテキストを渡すために使用される必要があります。

### 削除 {#removals-1}
#### RUM API {#rum-api}

| 旧 API       | 新 API   |
| ------------- | --------- |
| addUserAction | addAction |

#### 初期化オプション {#initialization-options}

| 旧オプション        | 新オプション |
| ------------------ | ----------- |
| publicApiKey       | clientToken |
| datacenter         | site        |
| resourceSampleRate | なし        |

#### TypeScript タイプ {#typescript-types}

| 古いタイプ                   | 新しいタイプ                    |
| ---------------------------- | ---------------------------- |
| RumUserConfiguration         | RumInitConfiguration         |
| RumRecorderUserConfiguration | RumRecorderInitConfiguration |
| LogsUserConfiguration        | LogsInitConfiguration        |

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/faq/content_security_policy
[2]: /ja/session_replay/
[3]: /ja/real_user_monitoring/application_monitoring/browser/collecting_browser_errors/
[4]: /ja/real_user_monitoring/application_monitoring/browser/monitoring_resource_performance/
[5]: /ja/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#enrich-and-control-rum-data
[6]: /ja/real_user_monitoring/application_monitoring/browser/collecting_browser_errors/?tab=npm#collect-errors-manually
[7]: /ja/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#clear-user-session-property
[8]: /ja/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#add-global-context-property
[9]: /ja/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#remove-global-context-property
[10]: /ja/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#read-global-context
[11]: /ja/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#replace-global-context
[12]: /ja/api/latest/rum/
[13]: /ja/api/latest/rum/
[14]: /ja/api/latest/rum/
[15]: /ja/api/latest/rum/
[16]: /ja/api/latest/rum/
[17]: /ja/api/latest/rum/
[18]: /ja/integrations/content_security_policy_logs/?tab=firefox#use-csp-with-real-user-monitoring-and-session-replay
[19]: https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted
[20]: /ja/session_replay/privacy_options?platform=browser#configuration
[21]: /ja/real_user_monitoring/guide/sampling-browser-plans/#setup
[22]: /ja/session_replay/
[23]: /ja/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#enrich-and-control-rum-data
[24]: /ja/help/
[26]: /ja/real_user_monitoring/application_monitoring/browser/
[25]: /ja/real_user_monitoring/correlate_with_other_telemetry/apm#opentelemetry-support
[27]: /ja/real_user_monitoring/guide/proxy-rum-data
[28]: https://datadoghq.dev/browser-sdk/interfaces/_datadog_browser-rum.RumInitConfiguration.html
[29]: /ja/real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum#:~:text=configure%20the%20traceContextInjection
[30]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import
[31]: https://webpack.js.org/guides/code-splitting/#dynamic-imports
[32]: https://esbuild.github.io/api/#splitting
[33]: https://rollupjs.org/tutorial/#code-splitting
[34]: https://parceljs.org/features/code-splitting
[35]: https://developer.chrome.com/docs/web-platform/long-animation-frames#long-frames-api