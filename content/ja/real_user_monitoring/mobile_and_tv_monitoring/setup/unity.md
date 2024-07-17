---
aliases:
- /ja/real_user_monitoring/unity/
- /ja/real_user_monitoring/unity/setup
code_lang: unity
code_lang_weight: 30
description: Unity Mobile プロジェクトから RUM データを収集します。
further_reading:
- link: https://github.com/DataDog/dd-sdk-unity
  tag: Source Code
  text: dd-sdk-unity のソースコード
- link: https://github.com/DataDog/unity-package
  tag: Source Code
  text: Unity SDK のパッケージ URL
- link: real_user_monitoring/explorer/
  tag: ドキュメント
  text: RUM データの確認方法
- link: https://www.datadoghq.com/blog/monitor-flutter-application-performance-with-mobile-rum/
  tag: ブログ
  text: Datadog Mobile RUM による Flutter アプリケーションのパフォーマンス監視
is_beta: true
kind: ドキュメント
private: true
title: RUM Unity Monitoring のセットアップ
type: multi-code-lang
---
## 概要

{{< beta-callout url="#" btn_hidden="true" >}}
Unity Monitoring is in public beta.
{{< /beta-callout >}}

Datadog Real User Monitoring (RUM) を使用すると、アプリケーションの個々のユーザーのユーザージャーニーを視覚化して分析できます。

## Setup

<div class="alert alert-info">
Datadog は、Unity LTS 2022 以上の iOS と Android の Unity Monitoring をサポートしています。
</div>

Datadog は、Unity からのデスクトップ (Windows、Mac、Linux)、コンソール、Web のデプロイには対応しておりません。ゲームやアプリケーションをお持ちで、Datadog RUM を使用してパフォーマンスを監視したい場合は、[Datadog サポート](/help/)でチケットを作成してください。

### UI でアプリケーションの詳細を指定

1. In Datadog, navigate to [**Digital Experience** > **Add an Application**][1].
2. アプリケーションタイプとして `Unity` を選択します。
3. アプリケーション名を入力して一意の Datadog アプリケーション ID とクライアントトークンを生成します。
4. クライアント IP またはジオロケーションデータの自動ユーザーデータ収集を無効にするには、これらの設定のチェックボックスをオフにします。

データの安全性を確保するために、クライアントトークンを使用する必要があります。クライアントトークンの設定方法については、[クライアントトークンのドキュメント][2]を参照してください。

### RUM セッションのサンプリング

You can control the data your application sends to Datadog RUM during instrumentation of the RUM Unity SDK. Specify the **Session Sample Rate** as a percentage between 0 and 100 in the Project Settings window in Unity.

### インストール

1. [External Dependency Manager for Unity (EDM4U)][3] をインストールします。これは [Open UPM][4] を使用して行うことができます。

2. [https://github.com/DataDog/unity-package][5] にある Git URL から Datadog SDK Unity パッケージを追加します。

3. [Gradle テンプレート][6]を使用するようにプロジェクトを構成し、`Custom Main Template` と `Custom Gradle Properties Template` の両方を有効にします。

4. In the iOS setting for External Dependency Manager (**Assets** > **External Dependency Manager** > **iOS Resolver** > **Settings**), disable the **Link frameworks statically** option and ensure that **Allow the same pod to be in multiple targets** is enabled.

5. If you build and receive `Duplicate class` errors (common in Unity 2022.x), add the following block in the `dependencies` block in your `mainTemplate.gradle`:

   ```groovy
   constraints {
        implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.8.0") {
            because("kotlin-stdlib-jdk8 is now a part of kotlin-stdlib")
        }
   }
   ```

5. After adding the Datadog Unity SDK, configure Datadog from your Project Settings:

    1. Enable Datadog and RUM
    2. Copy your `Client Token` and `Application Id` into the fields in the settings window.
    3. Verify that your `Site` is correct.

## Using Datadog

### Setting tracking consent

In order to be compliant with data protection and privacy policies, the Datadog Unity SDK requires setting a tracking consent value.

The `trackingConsent` setting can be one of the following values:

  * `TrackingConsent.Pending`: The Unity SDK starts collecting and batching the data but does not send it to Datadog. The Unity SDK waits for the new tracking consent value to decide what to do with the batched data.
  * `TrackingConsent.Granted`: The Unity SDK starts collecting the data and sends it to Datadog.
  * `TrackingConsent.NotGranted`: The Unity SDK does not collect any data. No logs are sent to Datadog.

Before Datadog sends any data, we need to confirm the user's `Tracking Consent`. This is set to `TrackingConsent.Pending` during initialization,
and needs to be set to `TrackingConsent.Granted` before Datadog sends any information.

```cs
DatadogSdk.Instance.SetTrackingConsent(TrackingConsent.Granted);
```

### Logging

You can intercept and send logs from Unity's default debug logger by enabling the option and threshold in your projects settings.

Datadog maps the Unity levels to the following in Datadog's Logging Levels:

| Unity LogType  | Datadog Log Level |
| -------------- | ----------------- |
| Log            |  Info             |
| Error          |  Error            |
| Assert         |  Critical         |
| Warning        |  Warn             |
| Exception      |  Critical         |

You can access this default logger to add attributes or tags through the `DatadogSdk.DefaultLogger` property.

You can also create additional loggers for more fine grained control of thresholds, service names, logger names, or to supply additional attributes.

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

#### Manual Scene (View) Tracking

To manually track new Scenes (`Views` in Datadog), use the `StartView` and `StopView` methods:

```cs
public void Start()
{
    DatadogSdk.Instance.Rum.StartView("My View", new()
    {
        { "view_attribute": "active" }
    });
}
```

Starting a new view automatically ends the previous view.

#### Automatic Scene Tracking

You can also set `Enable Automatic Scene Tracking` in your Project Settings to enable automatically tracking active scenes. This uses Unity's `SceneManager.activeSceneChanged` event to automatically start new scenes.

#### Web Requests / Resource Tracking

Datadog offers `DatadogTrackedWebRequest`, which is a `UnityWebRequest` wrapper intended to be a drop-in replacement for `UnityWebRequest`. `DatadogTrackedWebRequest` enables [Datadog Distributed Tracing][7].

To enable Datadog Distributed Tracing, you must set the `First Party Hosts` in your project settings to a domain that supports distributed tracing. You can also modify the sampling rate for distributed tracing by setting the `Tracing Sampling Rate`.

`First Party Hosts` does not allow wildcards, but matches any subdomains for a given domain. For example, api.example.com matches staging.api.example.com and prod.api.example.com, but not news.example.com.

[1]: https://app.datadoghq.com/rum/application/create
[2]: /ja/account_management/api-app-keys/#client-tokens
[3]: https://github.com/googlesamples/unity-jar-resolver
[4]: https://openupm.com/packages/com.google.external-dependency-manager/
[5]: https://github.com/DataDog/unity-package
[6]: https://docs.unity3d.com/Manual/gradle-templates.html
[7]: https://docs.datadoghq.com/ja/real_user_monitoring/platform/connect_rum_and_traces/?tab=browserrum