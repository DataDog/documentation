---
description: ハイブリッド Flutter アプリケーションの Web ビューを監視します。
further_reading:
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: GitHub
  text: dd-sdk-flutter のソースコード
- link: real_user_monitoring/explorer/
  tag: Documentation
  text: RUM データの調査方法
kind: documentation
title: Web ビュー追跡
---

## 概要

リアルユーザーモニタリングにより、Flutter のハイブリッドアプリケーションの Web ビューを監視し、死角をなくすことができます。

以下を実行できます。

- モバイルアプリケーションの Web とネイティブコンポーネントにまたがるユーザージャーニーの追跡
- モバイルアプリケーションの Web ページやネイティブコンポーネントへのレイテンシーの根本原因を特定する
- モバイルデバイスで Web ページの読み込みが困難なユーザーへの対応

## セットアップ

### 前提条件

モバイル Flutter アプリケーションでレンダリングしたい Web ページを、まず RUM Browser SDK で設定します。詳しくは、[RUM ブラウザモニタリング][1]をご覧ください。

### Web ビューをインスツルメントする

RUM Flutter SDK は、[`webview_flutter`][2] パッケージの使用時に Web ビュー追跡を制御するための API を提供します。Web ビュー追跡を追加するには、`WebViewController` で `trackDatadogEvents` 拡張メソッドを呼び出し、許可されたホストのリストを提供します。

例:

```dart
import 'package:datadog_flutter_plugin/datadog_flutter_plugin.dart';

webViewController = WebViewController()
  ..setJavaScriptMode(JavaScriptMode.unrestricted)
  ..trackDatadogEvents(
    DatadogSdk.instance,
    ['myapp.example'],
  )
  ..loadRequest(Uri.parse('myapp.example'));
```

Android でトラッキングが機能するには、`JavaScriptMode.unrestricted` が必要です。

## Web ビューにアクセスする

Web ビューは、関連する `service` と `source` 属性を持つイベントとビューとして、[RUM エクスプローラー][3]に表示されます。`service` 属性は Web ビューが生成された Web コンポーネントを示し、`source` 属性は Flutter などのモバイルアプリケーションのプラットフォームを表します。

Flutter のアプリケーションでフィルタリングし、セッションをクリックします。セッションのイベント一覧が表示されたサイドパネルが表示されます。

{{< img src="real_user_monitoring/ios/ios-webview-tracking.png" alt="RUM エクスプローラーのセッションで取得した Web ビューイベント" style="width:100%;">}}

**Open View waterfall** をクリックすると、セッションからビューの **Performance** タブにあるリソースウォーターフォールの視覚化へ移動します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/browser/#npm
[2]: https://pub.dev/packages/webview_flutter
[3]: https://app.datadoghq.com/rum/explorer