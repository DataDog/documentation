---
beta: true
description: ハイブリッド Android アプリケーションの Web ビューを監視します。
further_reading:
- link: /real_user_monitoring/android/
  tag: ドキュメント
  text: Android モニタリング
- link: /real_user_monitoring/browser/
  tag: ドキュメント
  text: ブラウザのモニタリング
kind: documentation
title: Android Web ビュー追跡
---

## 概要

Real User Monitoring により、Android と Android TV のハイブリッドアプリケーションの Web ビューを監視し、死角をなくすことができます。

以下を実行できます。

- モバイルアプリケーションの Web とネイティブコンポーネントにまたがるユーザージャーニーの追跡
- モバイルアプリケーションの Web ページやネイティブコンポーネントへのレイテンシーの根本原因を特定する
- モバイルデバイスで Web ページの読み込みが困難なユーザーへの対応

## セットアップ

### 前提条件

モバイル Android および Android TV アプリケーションでレンダリングしたい Web ページを、まず RUM Browser SDK で設定します。詳しくは、[RUM ブラウザモニタリング][1]をご覧ください。

### 既存の SDK のセットアップを更新する

1. RUM Android SDK の[最新バージョン][2]をダウンロードします。
2. [RUM Android Monitoring][3] から既存の Android SDK の設定を編集します。
3. 以下の例で、Web ビューの追跡を追加します。

   ```
            val configuration = Configuration.Builder(
                    rumEnabled = true
                )
               .useSite()
               .trackInteractions()
               .setWebViewTrackingHosts(hosts)
               .trackLongTasks(durationThreshold)
               .useViewTrackingStrategy(strategy)
               .build()
            val credentials = Credentials(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>, <APPLICATION_ID>)
            Datadog.initialize(this, credentials, configuration, trackingConsent)
        }
    }
   ```

4. RUM Android SDK を初期化する際に、コンフィギュレーションファイルの `DatadogEventBridge.setup(webView)` を用いて、モバイル Android アプリケーションで追跡したい Web ビューの `DatadogEventBridge` を構成します。

## Web ビューにアクセスする

Web ビューは、関連する `service` と `source` 属性とともに [RUM エクスプローラー][4]に表示されます。`service` 属性は Web ビューが生成された Web コンポーネントを示し、`source` 属性は Android などのモバイルアプリケーションのプラットフォームを表します。

Android や Android TV のアプリケーションでフィルタリングし、セッションをクリックします。セッションのイベント一覧が表示されたサイドパネルが表示されます。

{{< img src="real_user_monitoring/android/android-webview-tracking.png" alt="RUM エクスプローラーのセッションで取得した Web ビューイベント" style="width:100%;">}}

**Open View waterfall** をクリックすると、セッションからビューの **Performance** タブにあるリソースウォーターフォールの視覚化へ移動します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/browser/#npm
[2]: https://search.maven.org/artifact/com.datadoghq/dd-sdk-android/1.12.0-beta1/aar
[3]: /ja/real_user_monitoring/android/?tab=kotlin#setup
[4]: https://app.datadoghq.com/rum/explorer