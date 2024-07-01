---
description: RUM でキオスクセッションを監視するためのガイド。
further_reading:
- link: /real_user_monitoring/platform/dashboards/
  tag: ドキュメント
  text: RUM ダッシュボード
kind: ガイド
title: RUM を使用したキオスクセッションの監視
---

## 概要
ファストフードの注文機や航空会社のチェックイン端末のようなキオスクアプリケーションは、多くの場合、複数のユーザーに連続してサービスを提供します。そのため、自動的なセッションの有効期限 (15 分間の非アクティブや合計 4 時間など) を待つのではなく、ユーザーのアクションに基づいてセッションの終了をトリガーすることは、各ユーザーの正確なセッションデータとメトリクスを収集するために不可欠です。Datadog RUM SDK を使用すると、この機能を使用してセッション追跡を改善することができます。

## ユーザーがインタラクションを終了するときは `stopSession()` を使用する

SDK の `stopSession()` メソッドを使用して、ホーム画面に戻るときやログアウトするときのように、ユーザーがアプリケーションとのインタラクションを終了したときにセッションを停止します。新しいセッションは、ユーザーがアプリケーションを再び操作するか、新しいビューが開始されるとすぐに作成されます (モバイルのみ)。

セッション内でユーザーが特定されている場合、`stopSession()` を呼び出して新しくセッションを開始した後に、ユーザー情報をクリアしたい場合があるかもしれません。アプリケーションのフレームワークに応じたドキュメントを参照してください: [ブラウザ][1]、[iOS][2]、[Android][3]、[Flutter][4]、[React Native][5]

### ブラウザ

この機能を使用するには、RUM ブラウザ SDK バージョン >= v4.37.0 が必要です。インストール手順は[こちら][6]をご覧ください。

`stopSession()` メソッドはインストール方法によって異なります。

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
datadogRum.stopSession()
```

{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
DD_RUM.onReady(function() {
    DD_RUM.stopSession()
})
```

{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_RUM &&
  window.DD_RUM.stopSession()
```

{{% /tab %}}
{{< /tabs >}}

アプリケーションが**複数のブラウザタブ**で開いている場合、RUM セッションを停止すると、すべてのタブでセッションが終了します。

アプリケーションが **Logs SDK** を使用している場合、RUM セッションを停止するとログセッションも終了します。

### Mobile

`stopSession()` メソッドはモバイル SDK フレームワークによって異なります。

{{< tabs >}}
{{% tab "iOS" %}}

この機能を使用するには、RUM iOS SDK バージョン >= 1.18.0 が必要です。インストール手順は[こちら][1]をご覧ください。

```swift
// SDK v1
Global.rum.stopSession()

// SDK v2
RUMMonitor.shared().stopSession()
```

[1]: https://docs.datadoghq.com/ja/real_user_monitoring/ios/

{{% /tab %}}
{{% tab "Android" %}}

この機能を使用するには、RUM Android SDK バージョン >= 1.19.0 が必要です。インストール手順は[こちら][1]をご覧ください。

```kotlin
GlobalRum.get().stopSession()
```

[1]: https://docs.datadoghq.com/ja/real_user_monitoring/android/

{{% /tab %}}
{{% tab "Flutter" %}}

この機能を使用するには、RUM Flutter SDK バージョン >= 1.4.0 が必要です。インストール手順は[こちら][1]をご覧ください。

```dart
DatadogSdk.instance.rum?.stopSession();
```

[1]: https://docs.datadoghq.com/ja/real_user_monitoring/mobile_and_tv_monitoring/setup/flutter/

{{% /tab %}}
{{% tab "React Native" %}}

この機能を使用するには、RUM React Native SDK バージョン >= 1.6.0 が必要です。インストール手順は[こちら][1]をご覧ください。

```javascript
DdRum.stopSession()
```

[1]: https://docs.datadoghq.com/ja/real_user_monitoring/reactnative/

{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/browser/advanced_configuration/?tab=cdnsync#clear-user-session-property
[2]: /ja/real_user_monitoring/ios/advanced_configuration/?tab=swift
[3]: /ja/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/?tab=kotlin#track-user-sessions
[4]: /ja/real_user_monitoring/mobile_and_tv_monitoring/setup/flutter/advanced_configuration/#track-user-sessions
[5]: /ja/real_user_monitoring/reactnative/#user-information
[6]: /ja/real_user_monitoring/browser/