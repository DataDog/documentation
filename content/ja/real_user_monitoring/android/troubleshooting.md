---
dependencies:
  - https://github.com/DataDog/dd-sdk-android/blob/master/docs/troubleshooting_android.md
further_reading:
  - link: https://github.com/DataDog/dd-sdk-android
    tag: Github
    text: dd-sdk-android ソースコード
  - link: /real_user_monitoring
    tag: ホームページ
    text: Datadog RUM を探索する
kind: documentation
title: トラブルシューティング
---
## Datadog RUM が初期化されているかどうか確認
ユーティリティメソッド `isInitialized` を使用して SDK が適切に初期化されていることを確認します。

```kotlin
if (Datadog.isInitialized()) {
    // ご使用のコード
}
```

## デバッグ作業
アプリケーションを書く際、`setVerbosity` メソッドを呼び出すことで開発ログを有効にできます。指定したレベル以上の優先度を持つライブラリ内のすべての内部メッセージが Android の Logcat に記録されます。

```kotlin
Datadog.setVerbosity(Log.INFO)
```

## トラッキングの同意を設定（GDPR の遵守）

GDPR 規定を遵守するため、SDK は初期化時に追跡に関する同意を求めます。
追跡の同意は以下のいずれかの値になります。

- `TrackingConsent.PENDING`: (デフォルト) SDK はデータの収集とバッチ処理を開始しますが、
 収集エンドポイントへの送信は行われません。SDK はバッチ処理が完了したデータをどうするかについての新たな同意値が得られるまで待機します。
- `TrackingConsent.GRANTED`: SDK はデータの収集を開始し、それをデータ収集エンドポイントに送信します。
- `TrackingConsent.NOT_GRANTED`: SDK がデータを収集することはありません。手動でログやトレース、
 RUM イベントを送信することもできません。

SDK の初期化後に追跡に関する同意を更新する場合は、 `Datadog.setTrackingConsent(<NEW CONSENT>)` を呼び出します。SDK は新しい同意に応じて動作を変更します。たとえば、現在の同意内容が `TrackingConsent.PENDING` で、それを

- `TrackingConsent.GRANTED` に更新した場合: SDK は現在のバッチデータと将来的なデータをすべてデータ収集エンドポイントに直接送信します。
- `TrackingConsent.NOT_GRANTED`: SDK はすべてのバッチデータを消去し、以後のデータも収集しません。

## RUM セッションのサンプリング

アプリケーションが Datadog RUM に送信するデータを制御するには、[RumMonitor を初期化][1]し、RUM セッションのサンプリングレートを 0～100 の間に指定します。

```kotlin
val monitor = RumMonitor.Builder()
        // ここでは RUM セッションの 75% を Datadog へ送信
        .sampleRumSessions(75.0f)
        .build()
GlobalRum.registerIfAbsent(monitor)
```

## デバイスがオフラインの時のデータ送信

RUM では、ユーザーのデバイスがオフラインのときにもデータを確実に利用できます。ネットワークの状態が悪いエリアやデバイスのバッテリーが非常に少ないなどの場合でも、すべての RUM イベントは最初にローカルデバイスにバッチで格納されます。

各バッチはインテークの仕様に従います。ネットワークが利用可能で、Datadog SDK がエンドユーザーのエクスペリエンスに影響を与えないようにバッテリーの残量が十分にあれば、バッチはすぐに送信されます。アプリケーションがフォアグラウンドにあるときにネットワークが利用できない場合、またはデータのアップロードが失敗した場合、バッチは正常に送信されるまで保持されます。

つまり、ユーザーがオフラインでアプリケーションを開いても、データが失われることはありません。SDK がディスク容量を使いすぎないようにするため、ディスク上のデータは、古すぎる場合自動的に破棄されます。

## 1.0.0 への移行

SDK の旧バージョン（バージョン `0.1.x` または `0.2.x`）を使用している場合、バージョン `1.0.0` の最新の変更をご確認ください。

### Logger.Builder

1.0.0 以前

```java
logger = new LoggerBuilder()
    .withName("my-application-name") // これによりサービス名が設定
    .withNetworkInfoLogging(this)
    .build("my-api-key");
```

1.0.0 以降

```java
Datadog.initialize(context, "my-api-key");

// ...

logger = new Logger.Builder()
        .setNetworkInfoEnabled(true)
        .setServiceName("android-sample-java") // サービス名を設定
        .setLoggerName("my_logger") // ロガー名を設定 (サービス内)
        .setLogcatLogsEnabled(true)
        .build();
```


### 属性

旧バージョンでは、属性は `Logger.addField()` または `Logger.removeField()` メソッドで作成または削除されて
いました。統一のため、このメソッドの名前は現在 `Logger.addAttribute()` および `Logger.removeAttribute()` 
に変更されています。動作には変更ありません。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/real_user_monitoring/android/