---
further_reading:
- link: /real_user_monitoring/explorer
  tag: ドキュメント
  text: RUM データを Explorer で確認
- link: https://www.datadoghq.com/blog/session-replay-datadog/
  tag: ブログ
  text: Datadog Session Replay を使用してユーザージャーニーをリアルタイムで表示
title: RUM ブラウザ SDK のアップグレード
---

## 概要

このガイドに従って、Browser RUM および Browser Logs SDK のメジャーバージョン間で移行してください。SDK の特徴と機能の詳細については、[SDK ドキュメント][26]を参照してください。

## v5 から v6 へ

v6 の主な改善点はバンドル サイズの削減です。IE11 のサポートを終了し、遅延読み込みを活用することで、RUM バンドルは 10% 縮小し、Logs バンドルは約 9% 縮小しました。加えて、いくつかの初期化パラメーターのデフォルト値を変更し、将来の改善に備えました。

SDK をアップグレードする際は、以下の破壊的変更に注意してください。

### 破壊的変更

#### ブラウザサポート

IE11 とその他の旧ブラウザのサポートは終了しました。ブラウザは少なくとも ES2018 をサポートしている必要があります。古いブラウザで Datadog を使用する場合は、Browser SDK v5 以前を引き続き使用できます。

#### tracecontext プロパゲータ使用時に tracestate ヘッダーを追加

デフォルトの `tracecontext` プロパゲータは、トレースの帰属精度を高める追加メタデータを含む新しい `tracestate` ヘッダーを送信します。このプロパゲータを使用している場合は、既存の `traceparent` ヘッダーに加えて、すべてのトレース対象エンドポイントでこの新しいヘッダーを許可する必要があります:

```
Access-Control-Allow-Headers: traceparent, tracestate
```

#### `site` オプションの型を厳格化

`site` オプションには、より厳密な型定義が適用されました。 TypeScript を使用している場合、標準外の値を指定するとエラーになる可能性があります。標準外の URL に RUM データを送信するには、[プロキシ][27] の使用を推奨します。

#### Actions・Resources・LongTask のトラッキングはデフォルトで有効

ユーザー操作、リソース、ロング タスクは既定で追跡されるようになりました。この変更は課金には影響しません。オプトアウトするには、[初期化パラメーター][28] `trackUserInteractions`、`trackResources`、`trackLongTasks` を `false` に設定してください。

#### ロング アニメーション フレームをロング タスクとして収集

対応ブラウザでは、ロング タスクの代わりに [ロング アニメーション フレーム][35] を収集するようになりました。RUM Explorer でのイベント タイプは引き続き `long_task` ですが、長いアニメーション フレームに関する情報が含まれます。

#### Cookie の有効期限の延長

匿名ユーザーのトラッキングをサポートするため、セッション Cookie (`_dd_s`) の有効期限が 1 年に延長されます。オプトアウトするには、[初期化パラメーター][28] `trackAnonymousUser` を `false` に設定してください。

#### useCrossSiteSessionCookie 初期化パラメーターの削除

`useCrossSiteSessionCookie` は非推奨となり、現在はサポートされません。代わりに [初期化パラメーター][28] `usePartitionedCrossSiteSessionCookie` を使用してください。

#### Session Replay を遅延読み込み

Session Replay モジュールは [動的インポート][30] を用いた遅延読み込みになりました。Session Replay のサンプリング対象となったセッションでのみモジュールを読み込み、他のセッションのバンドル サイズを削減します。

**NPM から SDK を利用している場合**、バンドラーが動的インポートをサポートしていることを確認してください。多くのモダン バンドラーは標準でサポートしていますが、設定が必要な場合もあります。詳しくは各バンドラーのドキュメントを参照してください: [Webpack][31]、[Esbuild][32]、[Rollup][33]、[Parcel][34]。

**CDN から SDK を利用している場合**、破壊的変更はありません。ただし、メイン スクリプト (例: `datadog-rum.js`) の読み込みに加えて、必要に応じて追加チャンク (例: `recorder-d7628536637b074ddc3b-datadog-rum.js`) を動的に読み込みます。

#### サンプリングされていないトレースにはトレース コンテキストを挿入しない

初期化パラメーター `traceContextInjection` のデフォルト値は `sampled` に更新され、Browser SDK でトレースがサンプリングされていない場合でも、バックエンド サービスのサンプリング判断が反映されるようになりました。詳細は [RUM と Traces を接続するドキュメント][29] を参照してください。

**注**: `traceSampleRate` を 100% (デフォルト) に設定している場合、この変更の影響はありません。



### 今後の破壊的変更

#### Datadog 取り込みリクエストの圧縮を有効化

「Datadog 取り込みリクエストの圧縮」は将来のメジャー バージョンでデフォルト有効となる予定です。今すぐオプトインするには、[初期化パラメーター][28] `compressIntakeRequests` を使用してください。圧縮は Worker スレッドで実行されるため、Content Security Policy の設定が必要です。詳細は [CSP ガイドライン][18] を参照してください。

## v4 から v5 への移行

v5 では、以下の変更点などが導入されています。

- Session Replay の新しい構成とプライバシーのデフォルト設定
- フラストレーションシグナルの自動収集
- パフォーマンスメトリクスの更新
- SDK パラメーターと API の更新

SDK をアップグレードする際には、以下の変更点にご注意ください。変更点は、影響の分野ごとにグループ化されています。

### 一般

#### SDK 初期化パラメーター

**取るべきアクション**: 非推奨パラメーターを v5 の新しいパラメーターに置き換えてください。旧パラメーター名は v5 では使用できません。

| 非推奨パラメーター名 (v4 以前) | 新しいパラメーター名 (v5) |
|-------------------------------------------|-------------------------|
| proxyUrl | プロキシ |
| sampleRate | sessionSampleRate |
| allowedTracingOrigins | allowedTracingUrls |
| tracingSampleRate | traceSampleRate |
| trackInteractions | trackUserInteractions |
| premiumSampleRate | sessionReplaySampleRate |
| replaySampleRate | sessionReplaySampleRate |

#### パブリック API

**取るべきアクション**: 非推奨 API を新しい API に置き換えてください。旧 API は v5 では使用できません。

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

#### インテークドメイン
v5 では、以前のバージョンとは異なるインテークドメインにデータが送信されます。

**取るべきアクション**: [Content Security Policy (CSP)][18] の `connect-src` エントリを新しいドメインに更新してください。

| Datadog サイト | ドメイン |
|--------------|--------|
| US1 | `connect-src https://browser-intake-datadoghq.com` |
| US3 | `connect-src https://browser-intake-us3-datadoghq.com` |
| US5 | `connect-src https://browser-intake-us5-datadoghq.com` |
| EU1 | `connect-src https://browser-intake-datadoghq.eu` |
| US1-FED | `connect-src https://browser-intake-ddog-gov.com` |
| AP1 | `connect-src https://browser-intake-ap1-datadoghq.com` |

#### 信頼されているイベント
不正または不正確なデータの収集を避けるために、v5 ではユーザーのアクションによって生成されたイベントのみをリッスンし、スクリプトによって生成されたイベントは無視されます。詳細については、[信頼されているイベント][19]を参照してください。

**取るべきアクション**: プログラムによるイベントも SDK に考慮させたい場合は、以下のように `__ddIsTrusted` 属性を追加してください。

```javascript
const click = new Event('click')
click.__ddIsTrusted = true
document.dispatchEvent(click)
```

**取るべきアクション**: 例えば、自動化された UI テスト環境などでプログラムによるイベントに大きく依存している場合は、`allowUntrustedEvents: true` を設定して、すべての信頼されていないイベントを許可することができます。

#### `beforeSend` の戻り値の型
`beforeSend` コールバック関数はブール値を返す必要があります。

```javascript
beforeSend(event: any, context?: any) => boolean
```

実装は変更されていませんが、値が返されない場合でもイベントは破棄されません。

**取るべきアクション**: `beforeSend` が `true` を返すとイベントは保持され、`false` を返すと破棄されることを確認してください。これにより、関連する TypeScript のコンパイルエラーが解決されます。

### セッションリプレイ

#### セッションリプレイマスキング

Session Replay のデフォルトのマスキング設定 `defaultPrivacyLevel` が `mask-user-input` から `mask` に変更されました。これにより、Session Replay 記録の全データがデフォルトで非表示になり、閲覧時に機密性の高い情報が見えなくなります。詳細は [Session Replay ブラウザプライバシーオプション][20]を参照してください。

**取るべきアクション**: Session Replay で機密性のない HTML コンテンツやユーザーが入力したテキストなどのマスクされていないデータを表示したい場合は、`defaultPrivacyLevel` を `mask-user-input` または `allow` に設定してください。

#### Session Replay 用にサンプリングされたセッションの自動記録
[`sessionReplaySampleRate`][21] を使用して Session Replay 用にサンプリングされたセッションは、セッションの開始時に自動的に記録されます。つまり、記録をキャプチャするために [`startSessionReplayRecording()`][22] メソッドを呼び出す必要はありません。言い換えると、記録の取りこぼしを防ぐことができます。

**取るべきアクション**: 古い記録方法を継続し、記録の開始タイミングをカスタマイズしたい場合は、`startSessionReplayRecordingManually` を `true` に設定してください。

#### セッションが記録をキャプチャした場合にのみ Session Replay の料金が発生する
以前のバージョンの SDK では、セッションはサンプリングメカニズムによってセッションリプレイセッションと判断されています。v5 では、セッション中に記録がキャプチャされた場合のみ、セッションはセッションリプレイセッションとしてカウントされます。これにより、セッションリプレイの使用量を追跡しやすくなりました。

**アクションは必要ありません**: この動作は v5 で自動的に有効になります。

#### デフォルトの Session Replay サンプリングレート
v5 では、デフォルトの `sessionReplaySampleRate` は 100 ではなく 0 です。サンプリングレートを指定しないと、リプレイは記録されません。

**取るべきアクション**: Session Replay を使用するには、`sessionReplaySampleRate: 100` (または他のサンプリングレート) を明示的に設定してください。

### RUM

### APM インテグレーション

OpenTelemetry のサポートと利用を促進するために、デフォルトのプロパゲータタイプに `tracecontext` が `datadog` に加えて追加されました。

**取るべきアクション**: まだ `allowedTracingUrls` の初期化パラメーターで希望するプロパゲータを指定していない場合は、サーバーの Access-Control-Allow-Headers を構成して `traceparent` ヘッダーも受け付けるようにしてください。詳細は [RUM とトレースの接続][25]を参照してください。

### セッションプランフィールド

Session Replay の変更に伴い、`session.plan` フィールドはセッションイベントでのみ利用可能です。

**取るべきアクション**: 保存しているモニターやダッシュボードのクエリを更新し、非セッションイベントの `session.plan` フィールドを除外してください。

#### フラストレーションシグナルが自動的に収集される
フラストレーションシグナルを含むすべてのユーザーインタラクションを収集するには、`trackUserInteractions: true` を設定するだけです。`trackFrustrations` パラメーターを個別に設定する必要はありません。

**取るべきアクション**: フラストレーションシグナルを追跡するには、`trackUserInteractions: true` を設定してください。`trackFrustrations` パラメーターは削除しても構いません。

#### フリーズしたページではリソースの継続時間が省略される
ページがバックグラウンドになったために延長されたリソースの持続時間は、リソースコレクションで省略されます。例えば、ページの読み込み中にユーザーが別のタブをクリックした場合などです。

**アクションは必要ありません**: この動作は v5 で自動的に有効になります。

#### リソースとロングタスクの追跡
`replaySampleRate` や `premiumSampleRate` (どちらも非推奨) の代わりに `sessionReplaySampleRate` を使用する場合、リソースとロングタスクを明示的に構成する必要があります。

**取るべきアクション**: これらのイベントを収集するには、`trackResources` と `trackLongTasks` が `true` に設定されていることを確認してください。

#### リソースメソッド名が大文字
大文字と小文字の違い (POST vs post) によって同じメソッド名が異なる値として扱われるのを避けるため、メソッド名は一貫して大文字で送信されるようになりました。

**取るべきアクション**: モニターやダッシュボードのクエリを更新し、`resource.method` フィールドに大文字の値を使用してください。

#### `beforeSend` アクションイベント
`beforeSend` API は、収集したイベントのコンテキスト情報へのアクセスを許可します ([RUM データの情報付加と管理][23]を参照)。

フラストレーションシグナルの導入により、アクションイベントは複数の DOM イベントに関連付けることができます。

この更新に伴い、`context.event` 属性は削除され、`context.events` 属性が使用されるようになりました。

**取るべきアクション**: `beforeSend` のコードを更新し、`context.event` の代わりに `context.events` を使用してください。

```javascript
beforeSend: (event, context) => {
  if (event.type === 'action' && event.action.type === 'click') {
    // アクションイベントに関連するブラウザイベントにアクセス
    // 以前は単一イベント: context.event
    // 現在は複数イベント: context.events
  }
}
```

#### `beforeSend` のフォアグラウンド期間
`view.in_foreground_periods` 属性は SDK から送信されるのではなく、バックエンドで直接計算されます。

**取るべきアクション**: `beforeSend` のコードから `view.in_foreground_periods` を削除してください。特定のユースケースでこの属性に依存していた場合は、[サポート][24]にお問い合わせください。

#### `beforeSend` パフォーマンスエントリ
`beforeSend` コンテキストの `performanceEntry` 属性が JSON 表現から更新され、パフォーマンスエントリオブジェクトを直接含むようになりました。

エクスポートされた `PerformanceEntryRepresentation` 型は削除され、標準の `PerformanceEntry` 型が使用されるようになりました。

**取るべきアクション**: `beforeSend` のコードでは `PerformanceEntryRepresentation` 型の代わりに `PerformanceEntry` 型を直接使用してください。

### ログ
#### コンソールエラーのプレフィックスを削除
ログメッセージの "`console error:`" プレフィックスが削除されました。この情報は `origin` 属性で確認できます。

**取るべきアクション**: `"console error:"` プレフィックスを使用しているモニターやダッシュボードのクエリを更新し、代わりに `@origin:console` を使用してください。

#### `error.origin` を削除

すべてのログに `origin` 属性が導入されたため、`error.origin` は冗長となり、削除されました。

**取るべきアクション**: `error.origin` を使用しているモニターやダッシュボードのクエリを更新し、代わりに `origin` を使用してください。

#### メインロガーを分離
SDK がランタイムエラーやネットワーク、レポート、コンソールログを収集する際に、メインロガー (`DD_LOGS.logger`) に固有のコンテキストを追加せず、そのロガーに設定されたレベルやハンドラーを使用しません。

**取るべきアクション**: 非ロガーのログを除外するためにメインロガーのレベルに依存していた場合、代わりに専用の初期化パラメーターを使用してください。

**取るべきアクション**: 非ロガーのログにコンテキストを追加するためにメインロガーのコンテキストに依存していた場合、代わりにグローバルコンテキストを使用してください。

## v3〜v4

v4 では、RUM と Logs Browser SDK にいくつかの重大な変更が加えられました。

### 変更

#### 取込先 URL

RUM Browser SDK のデータ送信先 URL が変更になりました。[コンテンツセキュリティポリシーが最新である][1]ことを確認してください。

#### 最小限の Typescript のバージョンサポート

RUM Browser SDK v4 は、v3.8.2 より前の TypeScript と互換性がありません。TypeScript を使用する場合は、バージョンが v3.8.2 以上であることを確認してください。

#### タグの構文

`version`、`env`、`service`の初期化パラメーターは、Datadog にタグとして送信されます。RUM Browser SDK は、複数のタグが生成されないように、それらをわずかにサニタイズし、それらの値がタグの要件構文に適合しない場合は警告を表示します。

#### 初期化パラメーターの型の厳格化

TypeScript の初期化パラメーターを表す型はより厳しくなっており、以前受け取ったサポートされていないパラメーターは拒否されることがあります。もし型チェックのエラーが発生した場合は、サポートされている初期化パラメーターを指定していることを確認してください。

#### プライバシーオプションの優先順位

複数のプライバシーオプションが同じ要素に指定されている場合、Datadog は最も制限の厳しいオプションを適用し、機密データの予期せぬ漏えいを回避します。例えば、同じ要素に `dd-privacy-allow` と `dd-privacy-hidden` の両方のクラスが指定されている場合、allow の代わりに hidden が適用されます。

#### アクション名計算

RUM Browser SDK は、アクション名を計算する際に、`data-dd-action-name` 属性を持つ子要素のテキストを内側のテキストから削除しています。

例えば、次の `container` 要素の場合、以前は計算されるアクション名は `Container sensitive data` でしたが、v4 では計算されるアクション名は `Container` になります。
```html
<div id="container">
  Container
  <div data-dd-action-name="sensitive">sensitive data</div>
</div>
```

### 削除

#### XHR `_datadog_xhr` フィールド

RUM Browser SDK は、以前は `XMLHttpRequest` オブジェクトの内部状態を表す `_datadog_xhr` プロパティを使用していました。このプロパティは、外部で使用されることを想定していなかったため、代替することなく削除されました。

#### `proxyHost` 初期化パラメーター

初期化パラメーター `proxyHost` は削除されました。代わりに初期化パラメーター `proxyUrl` を使用してください。

#### プライバシーオプション対応

プライバシーオプションの `input-ignored` と `input-masked` は無効となりました。代わりに `mask-user-input` プライバシーオプションを使用してください。

具体的には、以下のように置き換えてください。

* `dd-privacy-input-ignored` および `dd-privacy-input-masked` クラス名を `dd-privacy-mask-user-input` に置き換えます。
* `dd-privacy="input-masked"` および `dd-privacy="input-ignored"` 属性値を `dd-privacy="mask-user-input"` に置き換えます。

## v2〜v3

Browser SDK v3 に [Session Replay][2] が新登場。この大きなバージョンアップデートにより、RUM および Logs Browser SDK が大きく変わります。

### 変更
#### RUM エラー

RUM Browser SDK では、失敗した XHR および Fetch 呼び出しに対する [RUM エラー][3]が作成されなくなります。このような失敗したネットワークリクエストは、依然として [RUM リソース][4]として収集され、ステータスコード属性を含みます。

引き続き、失敗したネットワークリクエストを RUM エラーとして表示するには、Datadog では [beforeSend API][5] を使用したリソースの傍受、`status_code` プロパティのチェック、そして [addError API][6] を使用したエラーの手動送信をおすすめします。

```javascript
beforeSend: (event) => {
    if (event.type === 'resource' && event.resource.status_code >= 500) {
        datadogRum.addError(`${event.resource.method} ${event.resource.url} ${event.resource.status_code}`); // "GET https://www.example.com/ 504"
    }
}
```

#### RUM エラーソース属性

RUM Browser SDK では、[addError API][6] で収集されたエラーのソースの特定ができなくなります。この API で収集されたすべてのエラーは、ソース属性が `custom` に設定されます。[addError API][6] は、コンテキストオブジェクトをその 2 番目のパラメーターとして受容し、エラーに関する追加コンテキストを渡すために使用されます。

### 削除
#### RUM API

| 旧 API       | 新 API   |
| ------------- | --------- |
| addUserAction | addAction |

#### 初期化オプション

| 旧オプション        | 新オプション |
| ------------------ | ----------- |
| publicApiKey       | clientToken |
| datacenter         | site        |
| resourceSampleRate | なし        |

#### TypeScript タイプ

| 旧タイプ                    | 新タイプ                    |
| ---------------------------- | ---------------------------- |
| RumUserConfiguration         | RumInitConfiguration         |
| RumRecorderUserConfiguration | RumRecorderInitConfiguration |
| LogsUserConfiguration        | LogsInitConfiguration        |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/faq/content_security_policy
[2]: /ja/real_user_monitoring/session_replay
[3]: /ja/real_user_monitoring/browser/collecting_browser_errors/
[4]: /ja/real_user_monitoring/browser/monitoring_resource_performance/
[5]: /ja/real_user_monitoring/browser/advanced_configuration/?tab=npm#enrich-and-control-rum-data
[6]: /ja/real_user_monitoring/browser/collecting_browser_errors/?tab=npm#collect-errors-manually
[7]: /ja/real_user_monitoring/browser/advanced_configuration/?tab=npm#clear-user-session-property
[8]: /ja/real_user_monitoring/browser/advanced_configuration/?tab=npm#add-global-context-property
[9]: /ja/real_user_monitoring/browser/advanced_configuration/?tab=npm#remove-global-context-property
[10]: /ja/real_user_monitoring/browser/advanced_configuration/?tab=npm#read-global-context
[11]: /ja/real_user_monitoring/browser/advanced_configuration/?tab=npm#replace-global-context
[12]: /ja/api/latest/rum/
[13]: /ja/api/latest/rum/
[14]: /ja/api/latest/rum/
[15]: /ja/api/latest/rum/
[16]: /ja/api/latest/rum/
[17]: /ja/api/latest/rum/
[18]: /ja/integrations/content_security_policy_logs/?tab=firefox#use-csp-with-real-user-monitoring-and-session-replay
[19]: https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted
[20]: /ja/real_user_monitoring/session_replay/browser/privacy_options/#configuration
[21]: /ja/real_user_monitoring/guide/sampling-browser-plans/#setup
[22]: /ja/real_user_monitoring/session_replay/browser/#usage
[23]: /ja/real_user_monitoring/browser/advanced_configuration/?tab=npm#enrich-and-control-rum-data
[24]: /ja/help/
[26]: /ja/real_user_monitoring/browser/
[25]: /ja/real_user_monitoring/correlate_with_other_telemetry/apm#opentelemetry-support
[27]: /ja/real_user_monitoring/guide/proxy-rum-data
[28]: /ja/real_user_monitoring/browser/setup/#initialization-parameters
[29]: /ja/real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum#:~:text=configure%20the%20traceContextInjection
[30]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import
[31]: https://webpack.js.org/guides/code-splitting/#dynamic-imports
[32]: https://esbuild.github.io/api/#splitting
[33]: https://rollupjs.org/tutorial/#code-splitting
[34]: https://parceljs.org/features/code-splitting
[35]: https://developer.chrome.com/docs/web-platform/long-animation-frames#long-frames-api