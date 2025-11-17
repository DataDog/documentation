---
aliases:
- /ja/real_user_monitoring/unity/advanced_configuration
- /ja/real_user_monitoring/otel
- /ja/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/otel
- /ja/real_user_monitoring/mobile_and_tv_monitoring/setup/otel
- /ja/real_user_monitoring/unity/otel_support/
- /ja/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/unity
description: Unity Monitoring の設定方法を学びます。
further_reading:
- link: https://github.com/DataDog/dd-sdk-unity
  tag: ソースコード
  text: dd-sdk-unity のソースコード
- link: real_user_monitoring/explorer/
  tag: ドキュメント
  text: RUM データの調査方法
title: Unity の高度な設定
---
## 概要

まだ Datadog Unity SDK for RUM をセットアップしていない場合は、[アプリ内のセットアップ手順][1] に従うか、[RUM Unity のセットアップ ドキュメント][2] を参照してください。[OpenTelemetry と RUM Unity の連携を設定する方法](#opentelemetry-setup)もご確認ください。

### 高度な初期化オプション

`Custom Endpoint`
: オプション<br/>
**型**: String<br/>
**デフォルト**: `true`<br/>
デフォルトの Datadog エンドポイントではなく、カスタム エンドポイントにデータを送信します。これは、カスタム サーバー経由でデータをプロキシする場合に便利です。

`SDK Verbosity`
: オプション<br/>
**型**: Enum<br/>
**デフォルト**: `Warn`<br/>
Datadog SDK が出力するデバッグ情報のレベル。レベルが高いほど、より多くの情報を出力します。このオプションは、想定どおりに動作しない場合に SDK からデバッグ情報を取得したり、コンソール ログから SDK 関連のデバッグ エントリを除去したりするのに役立ちます。

`Telemetry Sample Rate`
: オプション<br/>
**型**: Double<br/>
**デフォルト**: `20`
Datadog が内部テレメトリ データを送信する割合。値が 100 の場合、すべてのテレメトリ データがサンプリングされ、Datadog に送信されます。

### ビューの自動追跡

`Enable Automatic Scene Tracking` を選択すると、Datadog は Unity の `SceneManager` にフックしてシーンのロード/アンロードを検出し、RUM ビューを適切に開始します。`SceneManager` 以外の方法でシーン間を移動している場合、または `SceneManager` を伴わないビューの変更も追跡したい場合は、`DdRum.StartView` と `DdRum.StopView` を使って手動でビューを追跡する必要があります。

### ユーザーアクションの追跡

`DdRum.AddAction` を使用すると、タップ、クリック、スクロールなどの特定のユーザー アクションを追跡できます。

`RumActionType.Tap` のような瞬間的な RUM アクションを手動で登録するには、`DdRum.AddAction()` を使用します。`RumActionType.Scroll` のような連続的な RUM アクションを登録するには、`DdRum.StartAction()` または `DdRum.StopAction()` を使用します。

例:

```cs
void DownloadResourceTapped(string resourceName) {
    DatadogSdk.Instance.Rum.AddAction(
        RumActionType.Tap,
        resourceName,
    );
}
```

`DdRum.StartAction` と `DdRum.StopAction` を使用する場合、Datadog Unity SDK がアクションの開始と完了を対応付けられるよう、`type` の値は同一である必要があります。

### リソースの追跡

Datadog は、RUM ビューからのリソースおよび HTTP 呼び出しを追跡できるよう、`UnityWebRequest` のドロップイン代替として `DatadogTrackedWebRequest` を提供しています。

通常の `UnityWebRequest` と同様に使用できます。

```cs
var request = DatadogTrackedWebRequest.Get("https://httpbin.org/headers");
yield return request.SendWebRequest();

Debug.Log("Got result: " + request.downloadHandler.text);
```

### カスタムリソースの追跡

`DatadogTrackedWebRequest` による自動リソース追跡に加えて、以下のメソッドを使うと、ネットワーク リクエストやサード パーティ プロバイダーの API など、特定のカスタム リソースを追跡できます。

- `DdRum.StartResource`
- `DdRum.StopResource`
- `DdRum.StopResourceWithError`
- `DdRum.StopResourceWithErrorInfo`

例:

```cs
// ネットワーククライアントで

DatadogSdk.Instance.Rum.startResource(
    "resource-key",
    RumHttpMethod.Get,
    url,
);

// その後

DatadogSdk.Instance.Rum.stopResource(
    "resource-key",
    200,
    RumResourceType.Image
);
```

Datadog Unity SDK がリソースの開始と完了を対応付けられるよう、両方の呼び出しで `resourceKey` に用いる `string` は、対象リソースごとに一意である必要があります。

### カスタムエラーの追跡

特定のエラーを追跡するには、エラーが発生したときに例外、ソース、その他任意の属性情報を `DdRum` に通知します。

```cs
try
{
  // エラーを起こしやすいコード
}
catch(Exception e)
{
  DatadogSdk.Instance.Rum.AddError(e, RumErrorSource.Source);
}
```

## カスタムグローバル属性の追跡

Datadog Unity SDK が自動的に取得する[デフォルトの RUM 属性][3]に加えて、RUM イベントにカスタム属性などのコンテキスト情報を追加して、Datadog における可観測性を高めることができます。

カスタム属性を使用すると、観察されたユーザーの行動に関する情報 (カート値、マーチャント層、広告キャンペーンなど) をコードレベルの情報 (バックエンドサービス、セッションタイムライン、エラーログ、ネットワークヘルスなど) でフィルタリングおよびグループ化することができます。

### カスタムグローバル属性の設定

カスタム グローバル属性を設定するには、`DdRum.AddAttribute` を使用します。

* 属性を追加または更新するには、`DdRum.AddAttribute` を使用します。
* キーを削除するには、`DdRum.RemoveAttribute` を使用します。

### ユーザーセッションの追跡

RUM セッションにユーザー情報を追加すると、次のことが簡単になります。

* 特定のユーザーのジャーニーをたどる
* エラーの影響を最も受けているユーザーを把握する
* 最も重要なユーザーのパフォーマンスを監視する

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="RUM UI のユーザー API" style="width:90%" >}}

| 属性   | タイプ   | 説明                                                                     |
| ----------- | ------ | ------------------------------------------------------------------------------- |
| `usr.id`    | 文字列 | (必須) 一意のユーザー識別子                                              |
| `usr.name`  | 文字列 | (オプション) RUM UI にデフォルトで表示されるユーザー フレンドリーな名前。              |
| `usr.email` | 文字列 | (オプション) ユーザー名がない場合に RUM UI に表示されるユーザーのメール アドレス。 |

ユーザー セッションを識別するには、`DatadogSdk.SetUserInfo` を使用します。

例:

```cs
DatadogSdk.Instance.SetUserInfo("1234", "John Doe", "john@doe.com");
```

### カスタム ユーザー属性の追加

ユーザー セッションにカスタム属性を追加できます。この追加情報は、ログ、トレース、RUM イベントに自動的に適用されます。

既存の属性を削除するには、その属性に `null` を設定します。

例:

```cs
DatadogSdk.Instance.AddUserExtraInfo(new ()
{
 { "attribute_1", "foo" },
 { "attribute_2", null },
});
```

## Clear all data

`ClearAllData` を使用すると、Datadog にまだ送信されていないすべてのデータをクリアできます。

```cs
DatadogSdk.instance.ClearAllData();
```

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /ja/real_user_monitoring/mobile_and_tv_monitoring/unity/setup/
[3]: /ja/real_user_monitoring/mobile_and_tv_monitoring/unity/data_collected/