---
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: ソースコード
  text: dd-sdk-android のソースコード
- link: /real_user_monitoring
  tag: ドキュメント
  text: Datadog RUM を探索する
title: 'Android Monitoring: アプリ パフォーマンス'
---
## 概要

ビュー タイミングは、ユーザーの視点からアプリケーションのパフォーマンスを理解するのに役立ちます。RUM には、標準の自動タイミング ( `Time-to-Network-Settled` と `Interaction-to-Next-View` ) に加えて、ビューの読み込み完了を通知するための正確な API も用意されています (その瞬間を確実に判断できるのは開発者であるあなた自身だけだからです)。

### Time‑to‑Network‑Settled (TNS)
**Time‑to‑Network‑Settled (TNS)** は、ビュー開始時に起動された関連ネットワーク コールがすべて完了して、ビューが完全に読み込まれるまでの時間を測定します。TNS は、RUM ビュー イベントの `@view.network_settled_time` 属性で表されます。

デフォルトでは、TNS はビューの開始から、その開始から 100 ms 以内に開始されたすべてのリソースが完了するまでの経過時間として算出されます。この動作は `TimeBasedInitialResourceIdentifier` によって制御され、該当するリソースを "initial" として分類します。

TNS の計算に用いる既定の 100 ms のしきい値は、`TimeBasedInitialResourceIdentifier` のしきい値を調整し、`setInitialResourceIdentifier()` 設定で指定することでカスタマイズできます。これにより、ビュー開始後の任意の時間ウィンドウ内に開始するリソースを含められます:

```javascript
import com.datadog.android.rum.RumConfiguration
import com.datadog.android.rum.metric.networksettled.TimeBasedInitialResourceIdentifier

val rumConfig = RumConfiguration.Builder(applicationId)
   .setInitialResourceIdentifier(TimeBasedInitialResourceIdentifier(500)) // しきい値を 0.5 s に設定
   .build()
```

TNS において "initial" と見なすリソースをより細かく制御したい場合は、`InitialResourceIdentifier` インターフェースを独自に実装できます。これにより、ID や開始時刻などのリソース プロパティに基づくカスタム分類ロジックを定義できます。

### Interaction‑to‑Next‑View (INV)
**Interaction‑to‑Next‑View (INV)** は、前のビューでの最後のユーザー インタラクションから現在のビューの開始までの時間を測定します。INV は、RUM ビュー イベントの `@view.interaction_to_next_view_time ` 属性で表されます。

デフォルトでは、INV はビュー開始の直前に発生した最後の **タップ**、**クリック**、または **スワイプ** アクションのうち、しきい値である 3 秒以内のものを起点として計測されます。この動作は `TimeBasedInteractionIdentifier` によって制御され、該当するアクションを "last interaction" として分類します。

INV の既定の 3 秒しきい値を変更するには、`TimeBasedInteractionIdentifier` のしきい値を調整し、`setLastInteractionIdentifier()` 設定で指定します。これにより、次のビューが開始する前の任意の時間ウィンドウに含まれるアクションを取り込めます。

```javascript
import com.datadog.android.rum.RumConfiguration
import com.datadog.android.rum.metric.interactiontonextview.TimeBasedInteractionIdentifier

val rumConfig = RumConfiguration.Builder(applicationId)
   .setLastInteractionIdentifier(TimeBasedInteractionIdentifier(5000)) // しきい値を 5 s に設定
   .build()
   ```

INV において "last interaction" と見なすインタラクションをさらに制御する必要がある場合は、`LastInteractionIdentifier` インターフェースを実装して、アクションの種類やタイム スタンプなどのプロパティに基づくカスタム分類ロジックを定義できます。

### ビューの読み込み完了を SDK に通知する

Android RUM は、ビューの読み込みに要する時間をトラッキングします。ビューの読み込みが完了したことを SDK に通知するには、`GlobalRumMonitor` インスタンス経由で `addViewLoadingTime(override=)` メソッドを呼び出します。ビューが完全に読み込まれ、ユーザーに表示されたタイミングでこのメソッドを呼び出してください:

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       @OptIn(ExperimentalRumApi::class)
       fun onViewLoaded() {
            GlobalRumMonitor.get().addViewLoadingTime(override = false)
       }
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
       @OptIn(markerClass = ExperimentalRumApi.class)
       public void onViewLoaded() {
            GlobalRumMonitor.get().addViewLoadingTime(override);
       }
   ```
{{% /tab %}}
{{< /tabs >}}

`override` オプションを使用すると、現在のビューに対して以前に計算された読み込み時間を置き換えられます。

読み込み時間が送信されると、`@view.loading_time` として参照でき、RUM UI に表示されます。

**注**: この API はまだ実験的であり、将来変更される可能性があります。

### 独自のパフォーマンスタイミングを追加

RUM のデフォルト属性に加えて、`addTiming` API を使用して、アプリケーションが時間を費やしている場所を測定できます。タイミング測定は、現在の RUM ビューの開始を基準にしています。たとえば、ヒーロー画像が表示されるまでにかかる時間を計ることができます。
{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
      fun onHeroImageLoaded() {
            GlobalRumMonitor.get().addTiming("hero_image")
      } 
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
       public void onHeroImageLoaded() {
            GlobalRumMonitor.get().addTiming("hero_image");
       }
   ```
{{% /tab %}}
{{< /tabs >}}

タイミングが送信されると、`@view.custom_timings.<timing_name>` として参照できます。例: `@view.custom_timings.hero_image`。RUM Analytics や Dashboards でグラフ化する前に、[メジャーを作成][1] する必要があります。

## パフォーマンス タイミングの理解
すべてのビュー タイミングは、ビューの開始を基準に測定されます。ビューがいつ開始と見なされるかの正確な定義は、ビューをトラッキングするために使用するインスツルメンテーションの種類に依存します。詳細は [ビューのインスツルメンテーション と アプリ ライフサイクル][2] を参照してください。

## トラブルシューティング
既定の `TimeBasedInitialResourceIdentifier` および `TimeBasedInteractionIdentifier` を使用している場合、特定の状況では TNS と INV のタイミングが欠落することがあります:

- `@view.interaction_to_next_view_time`(INV) は、セッションの最初のビューでは設定されません。前のビューでタップ/クリック/スワイプのいずれのアクションもトラッキングされていない場合、または最後の該当アクションから現在のビュー開始までの間隔が 3 秒を超える場合です。
- `@view.network_settled_time`(TNS) は、ビュー中にリソースがまったくトラッキングされなかった場合、またはビュー開始から最初の 100 ms 以内に開始されたリソースが存在しない場合は利用できません。

TNS と INV の精度を最大化するには、既定のプレディケートの時間しきい値をアプリの挙動に合わせて調整するか、要件に合わせたカスタム プレディケートを実装することを検討してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/explorer/search/#setup-facets-and-measures
[2]: /ja/real_user_monitoring/mobile_and_tv_monitoring/android/data_collected/#views_instrumentation_versus_app_lifecycle