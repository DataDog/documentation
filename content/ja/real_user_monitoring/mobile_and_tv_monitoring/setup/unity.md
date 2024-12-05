---
aliases:
- /ja/real_user_monitoring/unity/
- /ja/real_user_monitoring/unity/setup
code_lang: unity
code_lang_weight: 30
description: Unity Mobile プロジェクトから RUM データを収集します。
further_reading:
- link: https://github.com/DataDog/dd-sdk-unity
  tag: ソースコード
  text: dd-sdk-unity のソースコード
- link: https://github.com/DataDog/unity-package
  tag: ソースコード
  text: Unity SDK のパッケージ URL
- link: real_user_monitoring/explorer/
  tag: ドキュメント
  text: RUM データの確認方法
is_beta: true
private: true
title: RUM Unity Monitoring のセットアップ
type: multi-code-lang
---
## 概要

{{< beta-callout url="#" btn_hidden="true" >}}
Unity Monitoring is in public beta.
{{< /beta-callout >}}

Datadog Real User Monitoring (RUM) を使用すると、アプリケーションの個々のユーザーのユーザージャーニーを視覚化して分析できます。

## セットアップ

<div class="alert alert-info">
Datadog は、Unity LTS 2022 以上の iOS と Android の Unity Monitoring をサポートしています。
</div>

Datadog does not support Desktop (Windows, Mac, or Linux), console, or web deployments from Unity. If you have a game or application and want to use Datadog RUM to monitor its performance, create a ticket with [Datadog support][7].

### インストール

1. Install [External Dependency Manager for Unity (EDM4U)][4]. This can be done using [Open UPM][5].

2. Add the Datadog SDK Unity package from its Git URL at [https://github.com/DataDog/unity-package][6].  The package URL is `https://github.com/DataDog/unity-package.git`.

3. Configure your project to use [Gradle templates][8], and enable both `Custom Main Template` and `Custom Gradle Properties Template`.

4. If you build and receive `Duplicate class` errors (common in Unity 2022.x), add the following block in the `dependencies` block in your `mainTemplate.gradle`:

   ```groovy
   constraints {
        implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.8.0") {
            because("kotlin-stdlib-jdk8 is now a part of kotlin-stdlib")
        }
   }
   ```

### UI でアプリケーションの詳細を指定

1. In Datadog, navigate to [**Digital Experience** > **Add an Application**][1].
2. Choose **Unity** as the application type.
3. アプリケーション名を入力して一意の Datadog アプリケーション ID とクライアントトークンを生成します。
4. クライアント IP またはジオロケーションデータの自動ユーザーデータ収集を無効にするには、これらの設定のチェックボックスをオフにします。

データの安全性を確保するために、クライアントトークンを使用する必要があります。クライアントトークンの設定方法については、[クライアントトークンのドキュメント][2]を参照してください。

### Specify Datadog settings in the Unity UI

After installing the Datadog Unity SDK, you need to set Datadog's settings in the Unity UI. Navigate to your `Project Settings` and click on the `Datadog` section on the left hand side. You will see the following screen:

{{<img src="real_user_monitoring/unity/datadog-setup-ui.png">}}

次のパラメーターを使用できます。

| パラメーター | Required? | 説明 |
| --------- | --------- | ----------- |
| Enable Datadog | いいえ | Whether Datadog should be enabled. Disabling Datadog does not cause any of the Datadog APIs to fail, throw exceptions, or return `null` from any calls. It only stops the SDK from sending any information. |
| Output Symbol Files | いいえ | This option enables the output of symbol files for Datadog symbolication and file/line mapping features in Datadog Error Tracking. |
| Client Token | はい | Your client token created for your application on Datadog's website. |
| Env | いいえ | The name of the environment for your application. Defaults to `"prod"`. |
| Datadog サイト | はい | The site you send your data to. |
| Custom Endpoint | いいえ | A custom endpoint or proxy to send Datadog data through. Mostly used for debugging. |
| Batch Size | はい | Sets the preferred size of batched data uploaded to Datadog. This value impacts the size and number of requests performed by the SDK (small batches mean more requests, but each request becomes smaller in size). |
| Upload Frequency | はい | Sets the preferred frequency of uploading data to Datadog. |
| Batch Processing Level | はい | Defines the maximum amount of batches processed sequentially without a delay within one reading/uploading cycle. |
| Enable Crash Reporting | いいえ | Enables crash reporting in the RUM SDK. |
| Forward Unity Logs | いいえ | Whether to forward logs made from Unity's `Debug.Log` calls to Datadog's default logger. |
| Remote Log Threshold | はい | The level at which the default logger forwards logs to Datadog. Logs below this level are not sent. |
| Enable RUM | いいえ | Whether to enable sending data from Datadog's Real User Monitoring APIs |
| Enable Automatic Scene Tracking | いいえ | Whether Datadog should automatically track new Views by interceping Unity's `SceneManager` loading. |
| RUM Application ID | Yes (if RUM is enabled) | The RUM Application ID created for your application on Datadog's website. |
| Session Sample Rate | はい | The percentage of sessions to send to Datadog. Between 0 and 100. |
| Trace Sample Rate | はい | The percentage of distributed traces to send to Datadog. Between 0 and 100. |
| First Party Hosts | いいえ | To enable distributed tracing, you must specify which hosts are considered "first party" and have trace information injected. |

### RUM セッションのサンプリング

You can control the data your application sends to Datadog RUM during instrumentation of the RUM Unity SDK. Specify the **Session Sample Rate** as a percentage between 0 and 100 in the Project Settings window in Unity.

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
    NetworkInfoEnabled = true,
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

The following parameters are available when creating a new logger:

| パラメーター | 説明 | デフォルト |
| --------- | ----------- | ------- |
| `Service` | The name of the service to associate with this logger. | The application's service name.
| `Name` | ロガーの名前。 | なし |
| `NetworkInfoEnabled` | Whether to bundle information about the user's network state with each log. | `false` |
| `BundleWithRumEnabled` | Whether to bundle RUM session information with each log. | `true` |
| `RemoteSampleRate` | The percentage of logs from this logger to send to Datadog, as a whole percent. | `100` |
| `RemoteLogThreshold` | The threshold above which logs should be sent to Datadog. | `DdLogLevel.Debug` |

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

Datadog offers `DatadogTrackedWebRequest`, which is a `UnityWebRequest` wrapper intended to be a drop-in replacement for `UnityWebRequest`. `DatadogTrackedWebRequest` enables [Datadog Distributed Tracing][3].

Datadog 分散型トレーシングを有効にするには、プロジェクトの設定で `First Party Hosts` を分散型トレーシングをサポートするドメインに設定する必要があります。また、`Tracing Sampling Rate`を設定することで、分散型トレーシングのサンプリングレートを変更することができます。

`First Party Hosts` ではワイルドカードは使用できませんが、指定されたドメインの任意のサブドメインとマッチします。例えば、api.example.com は staging.api.example.com と prod.api.example.com にはマッチしますが、news.example.com にはマッチしません。

[1]: https://app.datadoghq.com/rum/application/create
[2]: /ja/account_management/api-app-keys/#client-tokens
[3]: https://docs.datadoghq.com/ja/real_user_monitoring/platform/connect_rum_and_traces/?tab=browserrum
[4]: https://github.com/googlesamples/unity-jar-resolver
[5]: https://openupm.com/packages/com.google.external-dependency-manager/
[6]: https://github.com/DataDog/unity-package
[7]: /ja/help/
[8]: https://docs.unity3d.com/Manual/gradle-templates.html