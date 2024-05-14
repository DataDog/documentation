---
aliases:
- /ja/real_user_monitoring/unity/
- /ja/real_user_monitoring/unity/setup
code_lang: unity
code_lang_weight: 30
description: Unity Mobile プロジェクトから RUM データを収集します。
further_reading:
- link: https://github.com/DataDog/dd-sdk-unity
  tag: GitHub
  text: dd-sdk-unity のソースコード
- link: https://github.com/DataDog/unity-package
  tag: GitHub
  text: Unity SDK のパッケージ URL
- link: coscreen/troubleshooting
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
Unity Monitoring は非公開ベータ版です。アクセスをリクエストするには、Datadog サポートまでご連絡ください。
{{< /beta-callout >}}

Datadog Real User Monitoring (RUM) を使用すると、アプリケーションの個々のユーザーのユーザージャーニーを視覚化して分析できます。

## 計画と使用

<div class="alert alert-info">
Datadog は、Unity LTS 2022 以上の iOS と Android の Unity Monitoring をサポートしています。
</div>

Datadog は、Unity からのデスクトップ (Windows、Mac、Linux)、コンソール、Web のデプロイには対応しておりません。ゲームやアプリケーションをお持ちで、Datadog RUM を使用してパフォーマンスを監視したい場合は、[Datadog サポート](/help/)でチケットを作成してください。

### UI でアプリケーションの詳細を指定

1. Datadog で、[**UX Monitoring** > **Setup & Configurations** > **New Application**][1] へ移動します。
2. アプリケーションタイプとして `Unity` を選択します。
3. アプリケーション名を入力して一意の Datadog アプリケーション ID とクライアントトークンを生成します。
4. クライアント IP またはジオロケーションデータの自動ユーザーデータ収集を無効にするには、これらの設定のチェックボックスをオフにします。

データの安全性を確保するために、クライアントトークンを使用する必要があります。クライアントトークンの設定方法については、[クライアントトークンのドキュメント][2]を参照してください。

### インストール

1. [External Dependency Manager for Unity (EDM4U)][3] をインストールします。これは [Open UPM][4] を使用して行うことができます。

2. [https://github.com/DataDog/unity-package][5] にある Git URL から Datadog SDK Unity パッケージを追加します。

3. [Gradle テンプレート][6]を使用するようにプロジェクトを構成し、`Custom Main Template` と `Custom Gradle Properties Template` の両方を有効にします。

4. もしビルドして `Duplicate class` エラー (Unity 2022.x でよくあるエラー) が発生する場合は、`mainTemplate.gradle` の `dependencies` ブロックに以下のブロックを追加してください。

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
[7]: https://docs.datadoghq.com/ja/real_user_monitoring/connect_rum_and_traces/?tab=browserrum