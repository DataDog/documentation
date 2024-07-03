---
aliases:
- /ja/real_user_monitoring/unity/
- /ja/real_user_monitoring/unity/setup
code_lang: unity
code_lang_weight: 30
description: Collect RUM data from your Unity Mobile projects.
further_reading:
- link: https://github.com/DataDog/dd-sdk-unity
  tag: ソースコード
  text: Source code for dd-sdk-unity
- link: https://github.com/DataDog/unity-package
  tag: ソースコード
  text: Package URL for Unity SDK
- link: real_user_monitoring/explorer/
  tag: Documentation
  text: Learn how to explore your RUM data
- link: https://www.datadoghq.com/blog/monitor-flutter-application-performance-with-mobile-rum/
  tag: Blog
  text: Monitor Flutter application performance with Datadog Mobile RUM
is_beta: true
kind: documentation
private: true
title: RUM Unity Monitoring Setup
type: multi-code-lang
---
## Overview

{{< beta-callout url="#" btn_hidden="true" >}}
Unity Monitoring is in public beta.
{{< /beta-callout >}}

Datadog Real User Monitoring (RUM) enables you to visualize and analyze user journeys of your application's individual users.

## セットアップ

<div class="alert alert-info">
Datadog supports Unity Monitoring for iOS and Android for Unity LTS 2022+.
</div>

Datadog does not support Desktop (Windows, Mac, or Linux), console, or web deployments from Unity. If you have a game or application and want to use Datadog RUM to monitor its performance, create a ticket with [Datadog support](/help/).

### Specify application details in the UI

1. In Datadog, navigate to [**Digital Experience** > **Add an Application**][1].
2. Choose `Unity` as the application type.
3. Provide an application name to generate a unique Datadog application ID and client token.
4. To disable automatic user data collection for either client IP or geolocation data, uncheck the boxes for those settings.

To ensure the safety of your data, you must use a client token. For more information about setting up a client token, see the [Client Token documentation][2].

### Sample RUM sessions

You can control the data your application sends to Datadog RUM during instrumentation of the RUM Unity SDK. Specify the **Session Sample Rate** as a percentage between 0 and 100 in the Project Settings window in Unity.

### Installing

1. Install [External Dependency Manager for Unity (EDM4U)][3]. This can be done using [Open UPM][4].

2. Add the Datadog SDK Unity package from its Git URL at [https://github.com/DataDog/unity-package][5].

3. Configure your project to use [Gradle templates][6], and enable both `Custom Main Template` and `Custom Gradle Properties Template`.

4. In the iOS setting for External Dependency Manager (**Assets** > **External Dependency Manager** > **iOS Resolver** > **Settings**), disable the **Link frameworks statically** option and ensure that **Allow the same pod to be in multiple targets** is enabled.

5. If you build and receive `Duplicate class` errors (common in Unity 2022.x), add the following block in the `dependencies` block in your `mainTemplate.gradle`:

   ```groovy
   constraints {
        implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.8.0") {
            because("kotlin-stdlib-jdk8 is now a part of kotlin-stdlib")
        }
   }
   ```

5. Datadog Unity SDK を追加したら、Project Settings から Datadog を構成します。

    1. Datadog と RUM を有効にする
    2. `Client Token` と `Application Id` を設定ウィンドウのフィールドにコピーします。
    3. `Site` が正しいことを確認します。

## Datadog の使用

### 追跡に関する同意の設定

データ保護とプライバシーポリシーに準拠するため、Datadog Unity SDK は追跡に関する同意の値の設定を求めます。

`trackingConsent` 設定は以下のいずれかの値で示されます。

  * `TrackingConsent.Pending`: Unity SDK はデータの収集とバッチ処理を開始しますが、Datadog には送信しません。Unity SDK は新しい追跡に関する同意の値を待って、バッチされたデータをどうするかを決定します。
  * `TrackingConsent.Granted`: Unity SDK はデータの収集を開始し、Datadog へ送信します。
  * `TrackingConsent.NotGranted`: Unity SDK はデータを収集しません。ログが Datadog に送信されることはありません。

Datadog がデータを送信する前に、ユーザーの `Tracking Consent` を確認する必要があります。これは初期化時に `TrackingConsent.Pending` に設定され、Datadog が情報を送信する前に `TrackingConsent.Granted` に設定される必要があります。

```cs
DatadogSdk.Instance.SetTrackingConsent(TrackingConsent.Granted);
```

### ロギング

プロジェクトの設定でオプションとしきい値を有効にすることで、Unity のデフォルトのデバッグロガーからログを傍受して送信できます。

Datadog は、Datadog の Logging Levels で Unity レベルを以下にマップします。

| Unity LogType  | Datadog Log Level |
| -------------- | ----------------- |
| ログ            |  情報             |
| Error          |  Error            |
| Assert         |  クリティカル         |
| Warning        |  Warn             |
| Exception      |  クリティカル         |

`DatadogSdk.DefaultLogger` プロパティを通して、このデフォルトのロガーにアクセスし、属性やタグを追加することができます。

また、しきい値、サービス名、ロガー名をより細かく制御すしたり、追加属性を供給するために、追加のロガーを作成することもできます。

```cs
var logger = DatadogSdk.Instance.CreateLogger(new DatadogLoggingOptions()
{
    SendNetworkInfo = true,
    DatadogReportingThreshold = DdLogLevel.Debug,
});
logger.Info("Hello from Unity!");

logger.Debug("Hello with attributes", new()
{
    { "my_attribute", 122 },
    { "second_attribute", "with_value" },
    { "bool_attribute", true },
    {
        "nested_attribute", new Dictionary<string, object>()
        {
            { "internal_attribute", 1.234 },
        }
    },
});
```

### Real User Monitoring (RUM)

#### シーン (ビュー) の手動追跡

新しいシーン (Datadog では `Views`) を手動で追跡するには、`StartView` と `StopView` メソッドを使用します。

```cs
public void Start()
{
    DatadogSdk.Instance.Rum.StartView("My View", new()
    {
        { "view_attribute": "active" }
    });
}
```

新しいビューを開始すると、前のビューは自動的に終了します。

#### シーンの自動追跡

Project Settings で `Enable Automatic Scene Tracking` を設定すると、アクティブなシーンを自動的に追跡できるようになります。これは Unity の `SceneManager.activeSceneChanged` イベントを使用して、自動的に新しいシーンを開始します。

#### Web リクエスト / リソース追跡

Datadog は `DatadogTrackedWebRequest` を提供しています。これは `UnityWebRequest` のラッパーであり、`UnityWebRequest` の代替として簡単に利用できることを意図しています。`DatadogTrackedWebRequest` は [Datadog 分散型トレーシング][7] を有効にします。

Datadog 分散型トレーシングを有効にするには、プロジェクトの設定で `First Party Hosts` を分散型トレーシングをサポートするドメインに設定する必要があります。また、`Tracing Sampling Rate`を設定することで、分散型トレーシングのサンプリングレートを変更することができます。

`First Party Hosts` ではワイルドカードは使用できませんが、指定されたドメインの任意のサブドメインとマッチします。例えば、api.example.com は staging.api.example.com と prod.api.example.com にはマッチしますが、news.example.com にはマッチしません。

[1]: https://app.datadoghq.com/rum/application/create
[2]: /ja/account_management/api-app-keys/#client-tokens
[3]: https://github.com/googlesamples/unity-jar-resolver
[4]: https://openupm.com/packages/com.google.external-dependency-manager/
[5]: https://github.com/DataDog/unity-package
[6]: https://docs.unity3d.com/Manual/gradle-templates.html
[7]: https://docs.datadoghq.com/ja/real_user_monitoring/platform/connect_rum_and_traces/?tab=browserrum