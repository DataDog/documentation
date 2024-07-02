---
title: Troubleshooting Android SDK issues
kind: documentation
description: Learn how to troubleshoot issues with Android Monitoring.
aliases:
    - /real_user_monitoring/mobile_and_tv_monitoring/troubleshooting/
code_lang: android
type: multi-code-lang
code_lang_weight: 10
further_reading:
- link: "https://github.com/DataDog/dd-sdk-android"
  tag: ソースコード
  text: dd-sdk-android Source code
- link: /real_user_monitoring
  tag: Documentation
  text: Explore Real User Monitoring
---

## 概要

If you experience unexpected behavior with Datadog RUM, use this guide to resolve issues quickly. If you continue to have trouble, contact [Datadog Support][1] for further assistance.

## Datadog RUM が初期化されているかどうか確認
ユーティリティメソッド `isInitialized` を使用して SDK が適切に初期化されていることを確認します。

```kotlin
if (Datadog.isInitialized()) {
    // ご使用のコード
}
```

## デバッグ
アプリケーションを書く際、`setVerbosity` メソッドを呼び出すことで開発ログを有効にできます。指定したレベル以上の優先度を持つライブラリ内のすべての内部メッセージが Android の Logcat に記録されます。

```kotlin
Datadog.setVerbosity(Log.INFO)
```

## トラッキングの同意を設定 (GDPR の遵守)

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

## デバイスがオフラインの時のデータ送信

RUM ensures availability of data when your user device is offline. In case of low-network areas, or when the device battery is too low, all the RUM events are first stored on the local device in batches. 

各バッチはインテークの仕様に従います。ネットワークが利用可能で、Datadog SDK がエンドユーザーのエクスペリエンスに影響を与えないようにバッテリーの残量が十分にあれば、バッチはすぐに送信されます。アプリケーションがフォアグラウンドにあるときにネットワークが利用できない場合、またはデータのアップロードが失敗した場合、バッチは正常に送信されるまで保持されます。

つまり、ユーザーがオフラインでアプリケーションを開いても、データが失われることはありません。SDK がディスク容量を使いすぎないようにするため、ディスク上のデータは、古すぎる場合自動的に破棄されます。

## 2.0.0 への移行

If you've been using the SDK v1, there are some breaking changes introduced in version `2.0.0`. See the [migration guide][2] for more information.

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help
[2]: https://github.com/DataDog/dd-sdk-android/blob/develop/MIGRATION.MD
