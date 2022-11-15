---
beta: true
dependencies:
- https://github.com/DataDog/dd-sdk-flutter/blob/main/packages/datadog_flutter_plugin/doc/rum/advanced_configuration.md
description: Flutter Monitoring の構成について説明します。
further_reading:
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: GitHub
  text: dd-sdk-flutter ソースコード
- link: real_user_monitoring/explorer/
  tag: ドキュメント
  text: RUM データの調査方法
kind: documentation
title: RUM Flutter の高度なコンフィギュレーション
---
## 概要

Datadog Flutter SDK for RUM をまだセットアップしていない場合は、[アプリ内セットアップ手順][1]に従うか、[RUM Flutter セットアップドキュメント][2]を参照してください。

## ユーザーセッションの充実

Flutter RUM は、ユーザーアクティビティ、ビュー (`DatadogNavigationObserver` を使用)、エラー、ネイティブクラッシュ、ネットワークリクエスト (Datadog Tracking HTTP Client を使用) などの属性を自動的に追跡します。RUM イベントおよびデフォルト属性については、[RUM データ収集ドキュメント][3]をご参照ください。カスタムイベントを追跡することで、ユーザーセッション情報を充実させ、収集された属性をより細かく制御することが可能になります。

### 独自のパフォーマンスタイミングを追加

RUM のデフォルト属性に加えて、`DdRum.addTiming` を使用して、アプリケーションが時間を費やしている場所を測定できます。タイミング測定は、現在の RUM ビューの開始を基準にしています。

たとえば、ヒーロー画像が表示されるまでにかかる時間を計ることができます。

```dart
void _onHeroImageLoaded() {
    DatadogSdk.instance.rum?.addTiming("hero_image");
} 
```

一度設定したタイミングは `@view.custom_timings.<timing_name>` としてアクセス可能です。例えば、`@view.custom_timings.hero_image` のようになります。

ダッシュボードで視覚化を作成するには、まず[メジャーの作成][4]を行います。

### ユーザーアクションの追跡

`DdRum.addUserAction` を使用すると、タップ、クリック、スクロールなどの特定のユーザーアクションを追跡することができます。

`RumUserActionType.tap` のような瞬間的な RUM アクションを手動で登録するには、`DdRum.addUserAction()` を使用します。`RumUserActionType.scroll` のような連続的な RUM アクションを登録するには、`DdRum.startUserAction()` または `DdRum.stopUserAction()` を使用します。

例:

```dart
void _downloadResourceTapped(String resourceName) {
    DatadogSdk.instance.rum?.addUserAction(
        RumUserActionType.tap,
        resourceName,
    );
}
```

`DdRum.startUserAction` と `DdRum.stopUserAction` を使用する場合、Datadog Flutter SDK がアクションの開始と完了を一致させるために、`type` アクションは同じでなければなりません。

### カスタムリソースの追跡

[Datadog Tracking HTTP Client][5] を使用して自動的にリソースを追跡するほか、[以下の方法][6]を使用して、ネットワークリクエストやサードパーティプロバイダ API など特定のカスタムリソースを追跡することが可能です。

- `DdRum.startResourceLoading`
- `DdRum.stopResourceLoading`
- `DdRum.stopResourceLoadingWithError`
- `DdRum.stopResourceLoadingWithErrorInfo`

例:

```dart
// ネットワーククライアントで

DatadogSdk.instance.rum?.startResourceLoading(
    "resource-key", 
    RumHttpMethod.get,
    url,
);

// 後で

DatadogSdk.instance.rum?.stopResourceLoading(
    "resource-key",
    200,
    RumResourceType.image
);
```

Datadog iOS SDK がリソースの開始と完了を一致させるために、両方の呼び出しで `resourceKey` に使用される `String` は、呼び出すリソースに対して一意である必要があります。

### カスタムエラーの追跡

特定のエラーを追跡するには、エラーが発生したときにメッセージ、ソース、例外、追加属性で `DdRum` に通知します。

```dart
DatadogSdk.instance.rum?.addError("This is an error message.");
```

## カスタムグローバル属性の追跡

Datadog Flutter SDK が自動的に取得する[デフォルトの RUM 属性][3]に加えて、RUM イベントにカスタム属性などのコンテキスト情報を追加して、Datadog 内の観測可能性を高めることができます。

カスタム属性を使用すると、観察されたユーザーの行動に関する情報 (カート値、マーチャント層、広告キャンペーンなど) をコードレベルの情報 (バックエンドサービス、セッションタイムライン、エラーログ、ネットワークヘルスなど) でフィルタリングおよびグループ化することができます。

### カスタムグローバル属性の設定

カスタムグローバル属性を設定するには、`DdRum.addAttribute` を使用します。

* 属性を追加または更新するには、`DdRum.addAttribute` を使用します。
* キーを削除するには、`DdRum.removeAttribute` を使用します。

### ユーザーセッションの追跡

RUM セッションにユーザー情報を追加すると、次のことが簡単になります。

* 特定のユーザーのジャーニーをたどる
* エラーの影響を最も受けているユーザーを把握する
* 最も重要なユーザーのパフォーマンスを監視する

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="RUM UI のユーザー API" style="width:90%" >}}

次の属性は**オプション**ですが、**少なくとも 1 つ**を指定します。

| 属性 | タイプ   | 説明                                                                                              |
|-----------|--------|----------------------------------------------------------------------------------------------------------|
| `usr.id`    | 文字列 | 一意のユーザー識別子。                                                                                  |
| `usr.name`  | 文字列 | RUM UI にデフォルトで表示されるユーザーフレンドリーな名前。                                                  |
| `usr.email` | 文字列 | ユーザー名が存在しない場合に RUM UI に表示されるユーザーのメール。Gravatar をフェッチするためにも使用されます。 |

ユーザーセッションを識別するには、`DdRum.setUserInfo` を使用します。

例:

```dart
DatadogSdk.instance.setUserInfo("1234", "John Doe", "john@doe.com");
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: https://docs.datadoghq.com/ja/real_user_monitoring/flutter/#setup
[3]: https://docs.datadoghq.com/ja/real_user_monitoring/flutter/data_collected
[4]: https://docs.datadoghq.com/ja/real_user_monitoring/explorer/?tab=measures#setup-facets-and-measures
[5]: https://github.com/DataDog/dd-sdk-flutter/tree/main/packages/datadog_tracking_http_client
[6]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/