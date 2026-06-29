---
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: ソースコード
  text: dd-sdk-ios のソースコード
- link: /real_user_monitoring
  tag: ドキュメント
  text: Datadog RUM を探索する
title: 'iOS Monitoring: アプリ パフォーマンス'
---
## 概要

View timings help you understand the performance of your application from a user's perspective. RUM comes with both out-of-the-box automatic timings (`Time-to-Network-Settled` and `Interaction-to-Next-View`), as well as a precise API for notifying that the view has finished loading (as only you, as a developer, can know this with certainty).

### Time to network settled

The **Time-to-Network-Settled (TNS)** measures the time it takes for a view to be fully loaded with all relevant network calls initiated at the start of the view. TNS is represented by the `@view.network_settled_time` attribute in RUM view events.

デフォルトでは、TNS はビューの開始から、ビュー開始時点から 100 ms 以内に開始したすべてのリソースが完了するまでの経過時間として計算されます。この動作は `TimeBasedTNSResourcePredicate` によって制御され、該当リソースを "initial" として分類します。
TNS の計算に用いる既定の 100 ms のしきい値は、`TimeBasedTNSResourcePredicate` のしきい値を調整し、`networkSettledResourcePredicate` 構成オプションに設定することでカスタマイズできます。これにより、ビュー開始後の任意の時間ウィンドウ内に開始するリソースを含められます:

```javascript
import DatadogRUM

RUM.enable(
  with: RUM.Configuration(
    applicationID: "<rum application id>",
    networkSettledResourcePredicate: TimeBasedTNSResourcePredicate(
        threshold: 0.5 // しきい値を 0.5 s に設定
    )
  )
)

```

TNS で "initial" と見なすリソースをさらに細かく制御する必要がある場合は、`NetworkSettledResourcePredicate` プロトコルに準拠した独自のプレディケートを実装できます。これにより、URL や開始時刻といったリソース プロパティに基づくカスタム分類ロジックを定義できます。

### Interaction to next view

**Interaction‑to‑Next‑View (INV)** は、前のビューでの最後のユーザー インタラクションから現在のビューの開始までの時間を測定します。INV は、RUM ビュー イベントの `@view.interaction_to_next_view_time` 属性で表されます。


デフォルトでは、INV はビュー開始前 **3 秒** のしきい値内で発生した最後の **タップ**、**クリック**、または **スワイプ** アクションを起点として計測されます。この動作は `TimeBasedINVActionPredicate` によって制御され、該当アクションを "last interaction" として分類します。

INV の既定の 3 秒しきい値を変更するには、`TimeBasedINVActionPredicate` の `maxTimeToNextView` 値を調整し、`nextViewActionPredicate` 構成オプションに設定します。これにより、次のビュー開始前の任意の時間ウィンドウに含まれるアクションを取り込めます。

```javascript
import DatadogRUM

RUM.enable(
  with: RUM.Configuration(
    applicationID: "<rum application id>",
    nextViewActionPredicate: TimeBasedINVActionPredicate(
        maxTimeToNextView: 5 // しきい値を 5 s に設定
    )
  )
)

```

INV で "last interaction" と見なすインタラクションをさらに制御したい場合は、`NextViewActionPredicate` プロトコルに準拠した独自のプレディケートを実装できます。これにより、アクションの種類、名前、または次のビューまでの時間などのプロパティに基づくカスタム分類ロジックを定義できます。


### Notify the SDK that your view finished loading

iOS RUM は、ビューの読み込みに要する時間をトラッキングします。ビューの読み込みが完了したことを SDK に通知するには、`RUMMonitor` インスタンス経由で `addViewLoadingTime(override:)` メソッドを呼び出します。ビューが完全に読み込まれ、ユーザーに表示されたタイミングでこのメソッドを呼び出してください:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
@_spi(Experimental)
import DatadogRUM

func onHeroImageLoaded() {
    let rum = RUMMonitor.shared()
    rum.addViewLoadingTime(override: false)
}
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
(void)onHeroImageLoad {
    [[DDRUMMonitor shared] addViewLoadingTimeWithOverride:NO | YES];
}
```
{{% /tab %}}
{{< /tabs >}}

Use the `override` option to replace the previously calculated loading time for the current view.

After the loading time is sent, it is accessible as `@view.loading_time` and is visible in the RUM UI.

**Note**: This API is still experimental and might change in the future.

### 独自のパフォーマンスタイミングを追加

RUM のデフォルト属性に加えて、`addTiming(name:)` API を使用することで、アプリケーションがどこに時間を費やしているかを測定できます。タイミング計測は現在の RUM ビューの開始を基準とします。

たとえば、ヒーロー画像が表示されるまでにかかる時間を計ることができます。

{{< tabs >}}
{{% tab "Swift" %}}
```swift
func onHeroImageLoaded() {
    let rum = RUMMonitor.shared()
    rum.addTiming(name: "hero_image")
}
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
- (void)onHeroImageLoad {
    [[DDRUMMonitor shared] addTimingWithName:@"hero_image"];
}
```
{{% /tab %}}
{{< /tabs >}}

一度設定したタイミングは `@view.custom_timings.<timing_name>` としてアクセス可能です。例えば、`@view.custom_timings.hero_image` のようになります。

ダッシュボードで可視化を作成するには、まず [メジャーを作成][1] してください。

## Understanding performance timings
All view timings are measured relative to the view's start. The exact moment a view starts depends on the type of instrumentation used for tracking views. For more details, see [Views instrumentation versus app lifecycle][2].

## トラブルシューティング
When using the default `TimeBasedInitialResourceIdentifier` and `TimeBasedInteractionIdentifier`, TNS and INV timings may be missing in specific cases:

- `@view.interaction_to_next_view_time`(INV) は、セッションの最初のビューでは設定されない場合があります。前のビューで **タップ**、**クリック**、**スワイプ** のいずれのアクションもトラッキングされていない場合、または最後の該当アクションから現在のビュー開始までの間隔が 3 秒を超える場合です。
- `@view.network_settled_time` (TNS) is unavailable if no resources were tracked during the view, or if none started within the initial 100ms of the view.

To maximize the accuracy of TNS and INV, consider adjusting time thresholds in the default predicates to align with your app's behavior, or implement custom predicates tailored to your needs.

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/explorer/search/#setup-facets-and-measures
[2]: /ja/real_user_monitoring/mobile_and_tv_monitoring/ios/data_collected/#views-instrumentation-versus-app-lifecycle