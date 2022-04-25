---
beta: true
dependencies:
- https://github.com/DataDog/dd-sdk-ios/blob/master/docs/rum_collection/web_view_tracking.md
description: ハイブリッド iOS アプリケーションの Web ビューを監視します。
further_reading:
- link: /real_user_monitoring/ios/
  tag: ドキュメント
  text: iOS モニタリング
- link: /real_user_monitoring/browser/
  tag: ドキュメント
  text: ブラウザのモニタリング
kind: documentation
title: iOS Web ビュー追跡
---
## 概要

Real User Monitoring により、iOS と tvOS のハイブリッドアプリケーションの Web ビューを監視し、死角をなくすことができます。

以下を実行できます。

- モバイルアプリケーションの Web とネイティブコンポーネントにまたがるユーザージャーニーの追跡
- モバイルアプリケーションの Web ページやネイティブコンポーネントへのレイテンシーの根本原因を特定する
- モバイルデバイスで Web ページの読み込みが困難なユーザーへの対応

## セットアップ

### 前提条件

モバイル iOS および tvOS アプリケーションでレンダリングしたい Web ページを、まず Browser SDK で設定します。詳しくは、[RUM ブラウザモニタリング][1]をご覧ください。

### Web ビューをインスツルメントする

RUM iOS SDK は、Web ビュー追跡を制御するための API を提供します。Web ビュー追跡を追加するには、`WKUserContentController` の拡張として、以下を宣言します。

`trackDatadogEvents(in hosts: Set<String>)`
: 特定の `hosts` に対して、Web ビューで RUM イベント追跡を有効にします。

`stopTrackingDatadogEvents()`
: Web ビューの RUM イベント追跡を無効にします。Web ビューの割り当てが解除されようとしているとき、または Web ビューの使用が終了したときに、この API を呼び出します。

例:

```
import WebKit
import Datadog

webView.configuration.userContentController.trackDatadogEvents(in: ["example.com"])
```

## Web ビューにアクセスする

Web ビューは、[RUM エクスプローラー][4]にイベントとビューとして表示されます。iOS や tvOS のアプリケーションでフィルタリングし、セッションをクリックします。セッションのイベント一覧が表示されたサイドパネルが表示されます。

{{< img src="real_user_monitoring/ios/ios-webview-tracking.png" alt="RUM エクスプローラーのセッションで取得した Web ビューイベント" style="width:100%;">}}

**Open View waterfall** をクリックすると、セッションからビューの **Performance** タブにあるリソースウォーターフォールの視覚化へ移動します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/real_user_monitoring/browser/#npm
[2]: https://github.com/DataDog/dd-sdk-ios/releases/tag/1.10.0-beta1
[3]: https://docs.datadoghq.com/ja/real_user_monitoring/ios/
[4]: https://app.datadoghq.com/rum/explorer