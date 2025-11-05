---
aliases:
- /ja/logs/error_tracking/custom_grouping
- /ja/logs/error_tracking/default_grouping
- /ja/tracing/error_tracking/custom_grouping
- /ja/real_user_monitoring/error_tracking/custom_grouping
- /ja/real_user_monitoring/error_tracking/default_grouping
- /ja/error_tracking/default_grouping
description: エラーがどのように課題にグループ化されるかを理解します。
title: エラーのグループ化
---

## デフォルトのグルーピング

エラー追跡は、類似したエラーをインテリジェントに課題にグループ化します。このグループ化は、次のエラープロパティに基づいて行われます。

- `service`: エラーが発生したサービス。
- `error.type` または `error.kind`: エラーのクラス (種類)。
- `error.message`: エラーの説明。
- `error.stack`: 最上位の意味のあるスタック フレームのファイル名と関数名。

エラー スタック トレースは、エラーがスローされてから Datadog のインスツルメンテーションによって捕捉されるまでに辿るコード パスです。Error Tracking は、最上位のスタック フレーム (**location**: エラーの位置) を評価し、それを使ってエラーをグルーピングします。

2 つのエラーでスタック フレームのプロパティがどれか 1 つでも異なる場合、それらのエラーは別々の Issue にグルーピングされます。たとえば、Error Tracking はサービスやエラー タイプが異なるものを同じ Issue にグルーピングしません。また、Error Tracking は、数値、句読点、引用符や括弧で囲まれたものを無視します: 単語のようなトークンのみが使用されます。

<div class="alert alert-info">
<strong>ヒント:</strong> 最適なグルーピングを確実にするために、エラー メッセージ内の変数は引用符または括弧で囲んでください。
</div>

**注**: グルーピングの精度を高めるために、Error Tracking は、バージョン、ID、日付などの可変なスタック フレーム プロパティを削除します。


## カスタムグルーピング

エラー追跡は、デフォルトの戦略を使って、類似のエラーを問題としてインテリジェントにグループ化します。_カスタムフィンガープリンティング_を使えば、グループ化の決定を完全に制御し、エラースパンに対するグループ化の動作をカスタマイズすることができます。

エラーの `error.fingerprint` を提供することで、グループ化をカスタマイズできます。フィンガープリントは、エラーソースに応じて属性またはタグ で提供されます (詳細は[セットアップ](#setup)を参照)。`error.fingerprint` の値には特定の形式や要件はありませんが、内容は文字列でなければなりません。

`error.fingerprint` が指定されている場合、グループ化の動作は次のルールに従います。

* カスタムグループ化がデフォルトの戦略よりも優先されます。
* カスタムグループ化はエラーのサブセットにのみ適用可能で、デフォルトの戦略と共存できます。
* `error.fingerprint` の内容は、変更せずにそのまま使用されます (ただし、標準化されたフィンガー プリント形式に変換されます)。
* 同じサービスで発生し、同じ `error.fingerprint` 属性を持つエラーは、同じ問題としてグループ化されます。
* `service` 属性が異なるエラーは、別の問題としてグループ化されます。

## セットアップ

### APM
カスタムグループ化に必要なのは、1 つのエラースパンと、文字列で指定された 1 つの `error.fingerprint` スパンタグのみです。

まだ Datadog で APM トレースを収集していない場合は、[APM ドキュメント][1]を参照して APM をセットアップします。

#### 例

すでに APM スパンを送信している場合は、エラースパンに新しい `error.fingerprint` タグを追加します。

Python での例を次に示します。

```python
with tracer.trace("throws.an.error") as span:
  span.set_tag('error.fingerprint', 'my-custom-grouping-material')
  raise Exception("Something went wrong")
```

例外発生時点でアクティブなスパンが存在する場合は、例外情報が捕捉され、スパンにアタッチされます。
この場合、エラー追跡でこれらのエラースパンを単一の問題としてグループ化するために `my-custom-grouping-material` が使用されます。

### ログ管理
カスタムグループ化に必要なのは、1 つのエラーログと、文字列で指定された 1 つの `error.fingerprint` 属性のみです。

まだ Datadog でログを収集していない場合は、[ログ管理のドキュメント][2]を参照してログをセットアップします。

`source` タグ (言語の指定) が適切に構成されていることを確認します。

#### 例

すでに JSON 形式でログを記録している場合は、エラーログに新しい `error.fingerprint` 属性を追加してください。

Python で JSON 形式のロガーを作成する例を示します。

```python
import logging
import json_log_formatter

formatter = json_log_formatter.JSONFormatter()

json_handler = logging.FileHandler(filename='/var/log/my-log.json')
json_handler.setFormatter(formatter)

logger = logging.getLogger('my_json')
logger.addHandler(json_handler)
logger.setLevel(logging.INFO)

logger.error('Error processing request', extra={'error.fingerprint': 'my-custom-grouping-material'})
```

この場合、`my-custom-grouping-material` を使用して、エラー追跡でこれらのエラーログを 1 つの問題にグループ化します。

#### モバイルの例

Datadog のモバイル SDK では、ログの呼び出しに事前定義済みの属性を追加することで、エラーをログに記録する際にカスタムのエラーフィンガープリントを追加することができます。

{{< tabs >}}

{{% tab "Android" %}}
カスタムグループ化を使用するには、Datadog Android SDK `2.7.0` 以上が必要です。

```kotlin
val errorFingerprint = "my-custom-grouping-material"
val attributes = mapOf(LogAttributes.ERROR_FINGERPRINT to errorFingerprint)
logger.e("My error message", error, attributes)
```
{{% /tab %}}

{{% tab "Flutter" %}}
カスタムグループ化を使用するには、Datadog Flutter SDK `2.4.0` 以上が必要です。

```dart
final errorFingerprint = "my-custom-grouping-material";
logger.error(
  'My error message',
  errorStackTrace: st,
  attributes {
    DatadogAttributes.errorFingerprint: "my-custom-grouping-material",
  }
);
```
{{% /tab %}}

{{% tab "iOS" %}}
カスタムグループ化を使用するには、Datadog iOS SDK `2.8.1` 以上が必要です。

```swift
let errorFingerprint = "my-custom-grouping-material"
logger.error(
  "My error message",
  error: error,
  attributes: [
    Logs.Attributes.errorFingerprint: errorFingerprint
  ]
)
```
{{% /tab %}}

{{% tab "React Native" %}}
カスタム グルーピングを使用するには、Datadog RUM SDK `2.4.2` 以上が必要です。
```dart
DdLogs.error(
  'message',
  'my-error-type',
  'my-error-message',
  'my-stack-trace',
  { my: 'context' },
  'my-custom-fingerprint'
);
```
{{% /tab %}}
{{< /tabs >}}

または、ログマッパーでフィンガープリントを追加または調整することもできます。

{{< tabs >}}

{{% tab "Android" %}}
カスタムグループ化を使用するには、Datadog Android SDK `2.7.0` 以上が必要です。

```kotlin
val mapper = object : EventMapper<LogEvent> {
    override fun map(event: LogEvent): LogEvent {
        event.fingerprint = "my-custom-grouping-material"
        return event
    }
}
val logsConfiguration = LogsConfiguration.Builder()
    .setEventMapper(mapper)
    .build()
Logs.enable(logsConfiguration)
```
{{% /tab %}}

{{% tab "Flutter" %}}
カスタムグループ化を使用するには、Datadog Flutter SDK `2.4.0` 以上が必要です。

```dart
LogEvent? mapLogEvent(LogEvent event) {
  event.error?.fingerprint = "my-custom-grouping-material";
  return event;
}

final loggingConfiguration = DatadogLoggingConfiguration(
  eventMapper: mapLogEvent,
);

final configuration = DatadogConfiguration(
    // ...
    loggingConfiguration: loggingConfiguration,
);
```
{{% /tab %}}

{{% tab "iOS" %}}
カスタムグループ化を使用するには、Datadog iOS SDK `2.8.1` 以上が必要です。

```swift
let logsConfiguration = Logs.Configuration(
  eventMapper: { log in
      var log = log
      log.error?.fingerprint = "my-custom-grouping-material"
      return log
  }
)
Logs.enable(
  with: logsConfiguration
)
```
{{% /tab %}}

{{% tab "React Native" %}}
カスタム グルーピングを使用するには、Datadog RUM SDK `2.4.2` 以上が必要です。

```dart
configuration.errorEventMapper = event => {
  event.fingerprint = 'my-custom-fingerprint'
  return event;
};
```
{{% /tab %}}

{{< /tabs >}}

### RUM

#### 例
まだ Datadog でブラウザ RUM イベントを収集していない場合は、[RUM ブラウザモニタリングのセットアップドキュメント][3]または[RUM モバイルおよび TV モニタリングのセットアップドキュメント][4]を参照してください。

{{< tabs >}}

{{% tab "Android" %}}
カスタムグループ化を使用するには、Datadog Android SDK `2.7.0` 以上が必要です。

手動でエラーを報告する際にカスタムのフィンガープリントを追加するには、`addError` を呼び出す際に事前定義済みの属性を追加します。

```kotlin
GlobalRumMonitor.get().addError(
  "My error message",
  RumErrorSource.SOURCE,
  exception,
  mapOf(
    RumAttributes.ERROR_CUSTOM_FINGERPRINT to "my-custom-grouping-fingerprint"
  )
)
```

または、`errorEventMapper` を使用することもできます。

```kotlin
val rumConfiguration = RumConfiguration.Builder("rum-application-id")
  .setErrorEventMapper(object : EventMapper<ErrorEvent> {
    override fun map(event: ErrorEvent): ErrorEvent {
        event.error.fingerprint = "my-custom-grouping-fingerprint"
        return event
    }
  }).build()
RUM.enable(rumConfiguration)
```

{{% /tab %}}

{{% tab "Browser" %}}
カスタム グルーピングを使用するには、Datadog Browser SDK [v4.42.0 以降][2]、[ブラウザー RUM エラー][1]、および追加の文字列属性が必要です。

すでに[ブラウザエラーを収集][1]している場合は、以下のどちらかで属性を追加することが可能です。

* エラーオブジェクトに `dd_fingerprint` 属性を追加する。

```javascript
import { datadogRum } from '@datadog/browser-rum';
// カスタムエラーをコンテキスト付きで送信する
const error = new Error('Something went wrong');
error.dd_fingerprint = 'my-custom-grouping-fingerprint'
datadogRum.addError(error);
```

* または、`beforeSend` コールバックに `error.fingerprint` 属性を付けて使用する。

```javascript
DD_RUM.init({
  ...
  beforeSend: () => {
    if (event.type === 'error') {
      event.error.fingerprint = 'my-custom-grouping-fingerprint'
    }
  },
})
```

どちらの場合も、`my-custom-grouping-material` を使用して、エラー追跡でブラウザ RUM エラーを 1 つの問題にグループ化します。

[1]: /ja/real_user_monitoring/browser/collecting_browser_errors/
[2]: https://github.com/DataDog/browser-sdk/releases/tag/v4.42.0
{{% /tab %}}

{{% tab "Flutter" %}}
カスタムグループ化を使用するには、Datadog Flutter SDK `2.4.0` 以上が必要です。

手動でエラーを報告する際にカスタムのフィンガープリントを追加するには、`addError` を呼び出す際に事前定義済みの属性を追加します。

```dart
final rum = DatadogSdk.instance.rum;
rum?.addErrorInfo("My error message",
  RumErrorSource.source,
  attributes: {
    DatadogAttributes.errorFingerprint: 'my-custom-grouping-fingerprint',
  },
);
```

または、`errorEventMapper` を使用することもできます。

```dart
RumErrorEvent? mapRumErrorEvent(RumErrorEvent event) {
  event.error.fingerprint = "my-custom-grouping-fingerprint";
  return event;
}

final rumConfiguration = DatadogRumConfiguration(
  // ...
  errorEventMapper: mapRumErrorEvent,
);

final configuration = DatadogConfiguration(
    // ...
    rumConfiguration: rumConfiguration,
);
```
{{% /tab %}}

{{% tab "iOS" %}}
カスタムグループ化を使用するには、Datadog iOS SDK `2.8.1` 以上が必要です。

手動でエラーを報告する際にカスタムのフィンガープリントを追加するには、`addError` を呼び出す際に事前定義済みの属性を追加します。

```swift
RUMMonitor.shared().addError(
  message: "My error message",
  source: .source,
  attributes: [
    RUM.Attributes.errorFingerprint: "my-custom-grouping-fingerprint"
  ]
)
```

または、`errorEventMapper` を使用することもできます。

```swift
var config = RUM.Configuration(applicationID: "rum-application-id")
config.errorEventMapper = { errorEvent in
  var errorEvent = errorEvent
  errorEvent.error.fingerprint = "my-custom-grouping-fingerprint"
  return errorEvent
}
RUM.enable(with: config)
```

{{% /tab %}}


{{% tab "React Native" %}}
カスタム グルーピングを使用するには、Datadog RUM SDK `2.4.2` 以上が必要です。

```dart
DdRum.addError(
  'message',       
  'my-source',       
  'my-stack-trace',  
  { my: 'context' },
  Date.now(), 
  'my-custom-fingerprint'        
);
```
または、`errorEventMapper` を使用することもできます。

```dart
configuration.errorEventMapper = event => {
  event.fingerprint = 'my-custom-fingerprint'
  return event;
};
```

{{% /tab %}}
{{< /tabs >}}

[1]: /ja/tracing/
[2]: /ja/logs/log_collection/
[3]: /ja/real_user_monitoring/browser/
[4]: /ja/real_user_monitoring/application_monitoring/#get-started