---
beta: true
dependencies:
- https://github.com/DataDog/dd-sdk-ios/blob/master/docs/rum_collection/swiftui.md
description: SwiftUI アプリケーションのインスツルメンテーションに RUM を使用します。
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: GitHub
  text: dd-sdk-ios ソースコード
- link: https://docs.datadoghq.com/real_user_monitoring/ios/
  tag: ドキュメント
  text: iOS と tvOS のモニタリングについて
kind: documentation
title: SwiftUI
---
## 概要

Datadog iOS SDK for RUM を使用すると、`SwiftUI` アプリケーションのビューとアクションをインストルメントすることができます。また、インスツルメンテーションは、`UIKit` と `SwiftUI` のハイブリッドアプリケーションでも機能します。

SwiftUI のサポートは、SDK [v1.9.0][1] で導入されました。

## セットアップ

設定方法については、[iOS と tvOS のモニタリング][2]をご覧ください。

### ビューをインスツルメントする

`SwiftUI.View` をインスツルメントするためには、以下のメソッドをビュー宣言に追加します。

```swift
import SwiftUI
import Datadog

struct FooView: View {

    var body: some View {
        FooContent {
            ...
        }
        .trackRUMView(name: "Foo")
    }
}
```

`trackRUMView(name:)` メソッドは、`SwiftUI` ビューがスクリーンから現れたり消えたりしたときに、RUM ビューを開始したり停止したりします。

### タップアクションをインスツルメントする

`SwiftUI.View` のタップアクションをインスツルメントするためには、以下のメソッドをビュー宣言に追加します。

```swift
import SwiftUI
import Datadog

struct BarView: View {

    var body: some View {
        Button("BarButton") { {
            ...
        }
        .trackRUMTapAction(name: "Bar")
    }
}
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-ios/releases/tag/1.9.0
[2]: /ja/real_user_monitoring/ios/#setup