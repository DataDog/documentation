---
beta: true
description: ハイブリッド Android アプリケーションの Web ビューを監視します。
further_reading:
- link: /real_user_monitoring/android/
  tag: ドキュメント
  text: Android モニタリング
- link: /real_user_monitoring/browser/
  tag: ドキュメント
  text: ブラウザモニタリング
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

1. Web ページからの RUM イベントを転送したい場合は、RUM Android SDK の[最新バージョン][2]をダウンロードし、[専用ガイド][3]に従って RUM 機能をセットアップしてください。
2. Web ページからのログイベントを転送したい場合は、Logs Android SDK の[最新バージョン][4]をダウンロードし、[専用ガイド][5]に従ってログ機能をセットアップしてください。
3. モジュールレベルの `build.gradle` ファイルで `dd-sdk-android-webview` ライブラリを依存関係として宣言し、Gradle 依存関係を追加します。

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-webview:x.x.x"
    }
    ```

4. 以下のコードスニペットで Web ビューの追跡を有効にします。

   ```kotlin
     WebViewTracking.enable(webView, allowedHosts)
   ```

## Web ビューにアクセスする

Web ビューは、関連する `service` と `source` 属性とともに [RUM エクスプローラー][6]に表示されます。`service` 属性は Web ビューが生成された Web コンポーネントを示し、`source` 属性は Android などのモバイルアプリケーションのプラットフォームを表します。

Android や Android TV のアプリケーションでフィルタリングし、セッションをクリックします。セッションのイベント一覧が表示されたサイドパネルが表示されます。

{{< img src="real_user_monitoring/android/android-webview-tracking.png" alt="RUM エクスプローラーのセッションで取得した Web ビューイベント" style="width:100%;">}}

**Open View waterfall** をクリックすると、セッションからビューの **Performance** タブにあるリソースウォーターフォールの視覚化へ移動します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/browser/#npm
[2]: https://search.maven.org/artifact/com.datadoghq/dd-sdk-android-rum
[3]: /ja/real_user_monitoring/android/?tab=kotlin#setup
[4]: https://search.maven.org/artifact/com.datadoghq/dd-sdk-android-logs
[5]: /ja/logs/log_collection/android/?tab=kotlin#setup
[6]: https://app.datadoghq.com/rum/explorer