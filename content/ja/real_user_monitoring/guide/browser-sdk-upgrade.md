---
further_reading:
- link: /real_user_monitoring/explorer
  tag: ドキュメント
  text: RUM データを Explorer で確認
- link: https://www.datadoghq.com/blog/session-replay-datadog/
  tag: ブログ
  text: Datadog Session Replay を使用してユーザージャーニーをリアルタイムで表示
kind: ガイド
title: RUM ブラウザ SDK のアップグレード
---

## 概要

Browser RUM SDK および Browser Logs SDK のメジャーバージョン間で移行するには、このガイドに従ってください。SDK の特徴と機能の詳細については、[SDK ドキュメント][26]を参照してください。

## v4 から v5 へ

V5 には、以下の変更点などがあります。

- セッションリプレイの新しい構成とプライバシーのデフォルト
- フラストレーションシグナルの自動収集
- パフォーマンスメトリクスの更新
- SDK パラメーターと API の更新

SDK をアップグレードする際には、以下の重大な変更点にご注意ください。変更点は、影響範囲ごとに分類されています。

### 一般

#### SDK 初期化パラメーター

**実行するアクション**: 非推奨のパラメーターを v5 の新しい同等のパラメーターに置き換えてください。古いパラメーター名は v5 では使用できなくなりました。

| 非推奨のパラメーター名 (v4 以前) | 新しいパラメーター名 (v5) |
|-------------------------------------------|-------------------------|
| proxyUrl | プロキシ |
| sampleRate | sessionSampleRate |
| allowedTracingOrigins | allowedTracingUrls |
| tracingSampleRate | traceSampleRate |
| trackInteractions | trackUserInteractions |
| premiumSampleRate | sessionReplaySampleRate |
| replaySampleRate | sessionReplaySampleRate |

#### 公開 API

**実行するアクション**: 非推奨の API を新しい同等の API に置き換えてください。古いAPIは v5 では使用できなくなりました。

| 非推奨のパラメーター名 (v4 以前) | 新しいパラメーター名 (v5) |
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
V5 は、以前のバージョンとは異なるインテークドメインにデータを送信します。

**実行するアクション**: [Content Security Policy (CSP)][18] の `connect-src` エントリを更新して、新しいドメインを使用するようにします。

| Datadog サイト | ドメイン |
|--------------|--------|
| US1 | `connect-src https://browser-intake-datadoghq.com` |
| US3 | `connect-src https://browser-intake-us3-datadoghq.com` |
| US5 | `connect-src https://browser-intake-us5-datadoghq.com` |
| EU1 | `connect-src https://browser-intake-datadoghq.eu` |
| US1-FED | `connect-src https://browser-intake-ddog-gov.com` |
| AP1 | `connect-src https://browser-intake-ap1-datadoghq.com` |

#### 信頼できるイベント
誤ったまたは不正なデータの収集を避けるため、v5 はユーザーのアクションによって生成されたイベントのみをリッスンし、スクリプトによって作成されたイベントは無視します。詳細は[信頼できるイベント][19]を参照してください。

**実行するアクション**: プログラムによるイベントに依存しており、SDK にこれを考慮させたい場合は、以下のように `__ddIsTrusted` 属性を追加します。

```javascript
const click = new Event('click')
click.__ddIsTrusted = true
document.dispatchEvent(click)
```

**実行するアクション**: 例えば自動化された UI テスト環境のように、プログラムによるイベントに大きく依存している場合、`allowUntrustedEvents: true` を設定することで、すべての信頼できないイベントを許可することができます。

#### `beforeSend` の戻り値型
`beforeSend` コールバック関数はブール値を返すはずです。

```javascript
beforeSend(event: any, context?: any) => boolean
```

実装は変更されていません。値が返されない場合でも、イベントは破棄されません。

**実行するアクション**: `beforeSend` が `true` を返すとイベントは保持され、`false` を返すと破棄されるようにします。これにより、関連する TypeScript のコンパイルエラーが解決されます。

### セッションリプレイ

#### セッションリプレイマスキング

セッションリプレイのデフォルトのマスキング設定 `defaultPrivacyLevel` が `mask-user-input` から `mask` に変更されました。これにより、セッションリプレイの記録のすべてのデータがデフォルトで隠され、記録の閲覧が安全になります。詳細については、[セッションリプレイブラウザのプライバシーオプション][20]を参照してください。

**実行するアクション**: センシティブでない HTML コンテンツやユーザーが入力したテキストなど、より多くのマスクされていないデータをセッションリプレイで確認したい場合は、`defaultPrivacyLevel` を `mask-user-input` または `allow` に設定してください。

#### セッションリプレイ用にサンプリングされたセッションの自動記録
[`sessionReplaySampleRate`][21] を使ってセッションリプレイ用にサンプリングされたセッションは、セッションの開始時に自動的に記録されます。これは、[`startSessionReplayRecording()`][22] メソッドを呼び出して記録をキャプチャする必要がないことを意味します。つまり、誤って記録を見逃すことがなくなります。

**実行するアクション**: 従来の記録動作を使い続け、記録開始のタイミングをカスタマイズしたい場合、`startSessionReplayRecordingManually` を `true` に設定してください。

#### セッションが記録をキャプチャした場合のみ、セッションリプレイの料金が生じる
以前のバージョンの SDK では、セッションはサンプリングメカニズムによってセッションリプレイセッションと判断されています。v5 では、セッション中に記録がキャプチャされた場合のみ、セッションはセッションリプレイセッションとしてカウントされます。これにより、セッションリプレイの使用量を追跡しやすくなりました。

**アクション不要**: この動作は v5 で自動的に有効になります。

#### セッションリプレイのデフォルトサンプリングレート
v5 ではデフォルトの `sessionReplaySampleRate` は 100 ではなく 0 です。サンプリングレートを指定しない場合、リプレイは記録されません。

**実行するアクション**: セッションリプレイを使うには、`sessionReplaySampleRate: 100` (または他のサンプリングレート) で明示的にサンプリングレートを設定してください。

### RUM

### APM インテグレーション

OpenTelemetry のサポートと利用を促進するために、デフォルトのプロパゲータタイプは `datadog` に加えて `tracecontext` を含むように変更されました。

**取るべきアクション**: まだ `allowedTracingUrls` の初期化パラメーターで希望するプロパゲータを指定していない場合は、サーバーの Access-Control-Allow-Headers を構成して `traceparent` ヘッダーも受け付けるようにしてください。詳細は [RUM とトレースの接続][25]を参照してください。

### セッションプランフィールド

セッションリプレイの変更に関連して、`session.plan` フィールドはセッションイベントでのみ使用可能です。

**実行するアクション**: セッション以外のイベントに対して、`session.plan` フィールドを除外するように、保存してあるモニターやダッシュボードのクエリを更新してください。

#### フラストレーションシグナルを自動収集
フラストレーションシグナルを含むすべてのユーザーインタラクションを収集するのに、`trackUserInteractions: true` を設定するだけでよくなりました。もう `trackFrustrations` パラメーターを個別に設定する必要はありません。

**実行するアクション**: フラストレーションシグナルを追跡するには、`trackUserInteractions: true` を設定します。`trackFrustrations` パラメーターは削除できます。

#### フリーズしたページでは、リソースの継続時間が省略される
リソース収集は、例えば、ページがロードされている間にユーザーが別のタブをクリックした場合など、ページがバックグラウンドになったために延長されたリソースの継続時間を省略します。

**アクション不要**: この動作は v5 で自動的に有効になります。

#### リソースとロングタスクの追跡
`replaySampleRate` または `premiumSampleRate` (どちらも非推奨) の代わりに `sessionReplaySampleRate` を使用する場合は、リソースとロングタスクを明示的に構成する必要があります。

**実行するアクション**: これらのイベントを収集するには、`trackResources` と `trackLongTasks` が `true` に設定されていることを確認してください。

#### リソースメソッド名は大文字
大文字/小文字 (POST と post) によって同じメソッド名でも異なる値になることを避けるため、メソッド名は一貫して大文字で送信されるようになりました。

**実行するアクション**: `resource.method` フィールドに大文字の値を使用するように、モニターまたはダッシュボードのクエリを更新してください。

#### `beforeSend` アクションイベント
`beforeSend` API は、収集したイベントのコンテキスト情報へのアクセスを可能にします ([RUM データのリッチ化と制御][23]を参照)。

フラストレーションシグナルの導入により、アクションイベントは複数の DOM イベントに関連付けることができます。

この更新に伴い、`context.event` 属性は削除され、`context.events` 属性が使用されるようになりました。

**実行するアクション**: `beforeSend` コードを更新し、`context.event` の代わりに `context.events` を使用するようにしてください。

```javascript
beforeSend: (event, context) => {
  if (event.type === 'action' && event.action.type === 'click') {
    // アクションイベントに関連するブラウザイベントへのアクセス
    // 更新前、単一のイベント: context.event
    // 更新後、複数のイベント: context.events
  }
}
```

#### フォアグラウンド期間の `beforeSend`
`view.in_foreground_periods` 属性は SDK から送信されるのではなく、バックエンドから直接計算されます。

**実行するアクション**: 
`view.in_foreground_periods` を `beforeSend` コードから削除してください。特定のユースケースでこの属性に依存していた場合は、[サポート][24]にお問い合わせください。

#### `beforeSend` パフォーマンスエントリ
`beforeSend` コンテキストの `performanceEntry` 属性が JSON 表現から更新され、パフォーマンスエントリオブジェクトを直接含むようになりました。

エクスポートされた `PerformanceEntryRepresentation` 型は削除され、標準の `PerformanceEntry` 型が使用されるようになりました。

**実行するアクション**: `beforeSend` コードでは、`PerformanceEntryRepresentation` 型の代わりに `PerformanceEntry` 型を直接使用してください。

### ログ
#### コンソールエラーのプレフィックスを削除
ログメッセージ中の "`console error:`" プレフィックスが削除されました。この情報は `origin` 属性にあります。

**実行するアクション**: `"console error:"` プレフィックスを使用しているモニターやダッシュボードのクエリを更新し、代わりに `@origin:console` を使用するようにしてください。

#### `error.origin` の削除

すべてのログに `origin` 属性が導入されたため、`error.origin` は冗長になり削除されました。

**実行するアクション**: `error.origin` を使用しているモニターやダッシュボードのクエリを更新し、代わりに `origin` を使用するようにしてください。

#### メインロガーの切り離し
SDK が実行時エラーやネットワーク、レポート、またはコンソールログを収集するとき、SDK はメインロガー (`DD_LOGS.logger`) に固有のコンテキストを追加せず、そのロガーに設定されたレベルやハンドラーを使用しません。

**実行するアクション**: ロガー以外のログを除外するためにメインのロガーレベルに依存していた場合は、代わりに専用の初期化パラメーターを使用してください。

**実行するアクション**: ロガー以外のログにコンテキストを追加するためにメインロガーコンテキストに依存していた場合は、代わりにグローバル コンテキストを使用してください。

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

プライバシーオプションの `input-ignored` と `input-masked` はもはや有効ではありません。代わりに、`mask-user-input` プライバシーオプションを使用してください。

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
[25]: /ja/real_user_monitoring/platform/connect_rum_and_traces#opentelemetry-support