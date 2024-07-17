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

## Overview

このガイドに従って、Browser RUM および Browser Logs SDK のメジャーバージョン間で移行してください。SDK の特徴と機能の詳細については、[SDK ドキュメント][26]を参照してください。

## v4 から v5 への移行

v5 では、以下の変更点などが導入されています。

- Session Replay の新しい構成とプライバシーのデフォルト設定
- フラストレーションシグナルの自動収集
- パフォーマンスメトリクスの更新
- SDK パラメーターと API の更新

SDK をアップグレードする際には、以下の変更点にご注意ください。変更点は、影響の分野ごとにグループ化されています。

### General

#### SDK 初期化パラメーター

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

| Datadog site | ドメイン |
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

### Session Replay

#### Session Replay masking

Session Replay のデフォルトのマスキング設定 `defaultPrivacyLevel` が `mask-user-input` から `mask` に変更されました。これにより、Session Replay 記録の全データがデフォルトで非表示になり、閲覧時に機密性の高い情報が見えなくなります。詳細は [Session Replay ブラウザプライバシーオプション][20]を参照してください。

**取るべきアクション**: Session Replay で機密性のない HTML コンテンツやユーザーが入力したテキストなどのマスクされていないデータを表示したい場合は、`defaultPrivacyLevel` を `mask-user-input` または `allow` に設定してください。

#### Session Replay 用にサンプリングされたセッションの自動記録
[`sessionReplaySampleRate`][21] を使用して Session Replay 用にサンプリングされたセッションは、セッションの開始時に自動的に記録されます。つまり、記録をキャプチャするために [`startSessionReplayRecording()`][22] メソッドを呼び出す必要はありません。言い換えると、記録の取りこぼしを防ぐことができます。

**取るべきアクション**: 古い記録方法を継続し、記録の開始タイミングをカスタマイズしたい場合は、`startSessionReplayRecordingManually` を `true` に設定してください。

#### セッションが記録をキャプチャした場合にのみ Session Replay の料金が発生する
In previous SDK versions, sessions are determined to be Session Replay sessions through the sampling mechanism. In v5, sessions are only counted as Session Replay sessions if a recording is captured during the session. This makes it easier to track your Session Replay usage.

**アクションは必要ありません**: この動作は v5 で自動的に有効になります。

#### デフォルトの Session Replay サンプリングレート
v5 では、デフォルトの `sessionReplaySampleRate` は 100 ではなく 0 です。サンプリングレートを指定しないと、リプレイは記録されません。

**取るべきアクション**: Session Replay を使用するには、`sessionReplaySampleRate: 100` (または他のサンプリングレート) を明示的に設定してください。

### RUM

### APM インテグレーション

OpenTelemetry のサポートと利用を促進するために、デフォルトのプロパゲータタイプに `tracecontext` が `datadog` に加えて追加されました。

**Action to take**: If you are not already specifying the desired propagator on the `allowedTracingUrls` initialization parameter, configure your server Access-Control-Allow-Headers to also accept the `traceparent` header. For more information, see [connect RUM and Traces][25].

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

### Logs
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

## From v3 to v4

Several breaking changes were made to the RUM and Logs Browser SDK with the v4 version.

### Changes

#### Intake URLs

The URLs for where the RUM Browser SDK data is sent has changed. Ensure that your [Content Security Policy is up to date][1].

#### Minimal Typescript version support

The RUM Browser SDK v4 is not compatible with TypeScript earlier than v3.8.2. If you use TypeScript, ensure that the version is at least v3.8.2.

#### Tags syntax

The `version`, `env`, and `service` initialization parameters are sent as tags to Datadog. The RUM Browser SDK slightly sanitizes them to ensure that they don't generate multiple tags, and prints a warning if those values don't meet the tag requirements syntax.

#### Stricter initialization parameters typing

TypeScript types representing initialization parameters are stricter and may reject previously accepted unsupported parameters. If you get type-checking errors, ensure you are providing supported initialization parameters.

#### Privacy options precedence

When multiple privacy options are specified on the same element, Datadog applies the most restrictive option to avoid unexpectedly leaking sensitive data. For example, if both `dd-privacy-allow` and `dd-privacy-hidden` classes are specified on the same element, it is hidden instead of allowed.

#### Action names computation

When computing action names, the RUM Browser SDK removes text of child elements with the `data-dd-action-name` attribute from inner text.

For example, for the following `container` element, where previously the computed action name would be `Container sensitive data`, in v4, the computed action name is `Container`:
```html
<div id="container">
  Container
  <div data-dd-action-name="sensitive">sensitive data</div>
</div>
```

### Removals

#### XHR `_datadog_xhr` field

The RUM Browser SDK previously used a `_datadog_xhr` property on `XMLHttpRequest` objects representing its internal state. This property has been removed without replacement as it wasn't intended to be used externally.

#### `proxyHost` initialization parameter

The `proxyHost` initialization parameter has been removed. Use the `proxyUrl` initialization parameter instead.

#### Privacy options support

プライバシーオプションの `input-ignored` と `input-masked` は無効となりました。代わりに `mask-user-input` プライバシーオプションを使用してください。

Specifically, replace:

* `dd-privacy-input-ignored` and `dd-privacy-input-masked` class names with `dd-privacy-mask-user-input`
* `dd-privacy="input-masked"` and `dd-privacy="input-ignored"` attribute values with `dd-privacy="mask-user-input"`

## From v2 to v3

The Browser SDK v3 introduces [Session Replay][2]. With this major version update, several breaking changes were made to the RUM and Logs Browser SDKs.

### Changes
#### RUM errors

The RUM Browser SDK no longer issues [RUM errors][3] for failed XHR and Fetch calls. These failed network requests are still collected as [RUM resources][4], which contain the status code attribute.

To continue seeing the failed network requests as RUM errors, Datadog recommends intercepting the resource with the [beforeSend API][5], checking the `status_code` property, and manually sending an error with the [addError API][6].

```javascript
beforeSend: (event) => {
    if (event.type === 'resource' && event.resource.status_code >= 500) {
        datadogRum.addError(`${event.resource.method} ${event.resource.url} ${event.resource.status_code}`); // "GET https://www.example.com/ 504"
    }
}
```

#### RUM error source attribute

The RUM Browser SDK no longer lets you specify the source of an error collected with the [addError API][6]. All errors collected with this API have their source attribute set to `custom`. The [addError API][6] accepts a context object as its second parameter, which should be used to pass extra context about the error.

### Removals
#### RUM API

| Old API       | New API   |
| ------------- | --------- |
| addUserAction | addAction |

#### Initialization options

| Old options        | New options |
| ------------------ | ----------- |
| publicApiKey       | clientToken |
| datacenter         | site        |
| resourceSampleRate | NONE        |

#### TypeScript types

| Old types                    | New types                    |
| ---------------------------- | ---------------------------- |
| RumUserConfiguration         | RumInitConfiguration         |
| RumRecorderUserConfiguration | RumRecorderInitConfiguration |
| LogsUserConfiguration        | LogsInitConfiguration        |

## Further Reading

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