---
code_lang: android
code_lang_weight: 10
description: Android アプリケーションに Error Tracking を設定して、クラッシュ、例外、およびアプリケーションエラーを監視します。
further_reading:
- link: /error_tracking/frontend
  tag: Documentation
  text: フロントエンドの Error Tracking
- link: https://github.com/DataDog/dd-sdk-android
  tag: Source Code
  text: ddsdkandroid のソースコード
- link: /real_user_monitoring/error_tracking/
  tag: Documentation
  text: エラー追跡を開始する
- link: /real_user_monitoring/error_tracking/explorer
  tag: Documentation
  text: エクスプローラーでエラー追跡データを視覚化する
title: Android のクラッシュレポートとエラー追跡
type: multi-code-lang
---
## 概要

Android の [Error Tracking][1] は、クラッシュ、例外、およびエラーを自動的にキャプチャすることで、モバイルアプリの健康状態を包括的に把握できます。この機能を使用すると、次のことができます。

リアルタイムでアプリの安定性を監視し、バージョン、デバイス、およびユーザーセグメント全体で即時クラッシュアラートとエラー率を追跡します。
難読化を解除されたスタックトレースと自動 ProGuard マッピングファイルのアップロードにより、問題の特定が容易になり、より迅速にデバッグできます。
クラッシュしやすい機能を特定し、エラートレンドを追跡し、ユーザー満足度を向上させるために修正の優先順位を付けることで、アプリの品質を向上させます。
集計された Android クラッシュダッシュボードおよび属性にアクセスします。
トレンド分析付きの難読化解除された Android クラッシュレポートを表示します。

Datadog Android SDK は、Android 5.0+ (API レベル 21) と Android TV をサポートします。

クラッシュレポートは [**Error Tracking**][2] に表示されます。

##セットアップ

まだ Android SDK をセットアップしていない場合は、[アプリ内セットアップ手順][3] に従うか、[Android セットアップドキュメント][4] を参照してください。

### ステップ 1  Android SDK を依存関係として宣言する

**アプリケーションモジュールの** `build.gradle` ファイルで [ddsdkandroidrum][5] と [Gradle プラグイン][6] を依存関係として宣言します。

```groovy
buildscript {
    dependencies {
        classpath("com.datadoghq:dd-sdk-android-gradle-plugin:x.x.x")
    }
}
plugins {
    id("com.datadoghq.dd-sdk-android-gradle-plugin")
    //(...)
}
android {
    //(...)
}
dependencies {
    implementation "com.datadoghq:dd-sdk-android-rum:x.x.x" 
    //(...)
}

```

### ステップ 2  UI でアプリケーションの詳細を指定する

1. [**[Errors] (エラー)** > **[Settings] (設定)** > **[Browser and Mobile] (ブラウザとモバイル)** > **[+ New Application] (+ 新しいアプリケーション)**][7] に移動します。
2. アプリケーションタイプとして `android` を選択し、新しいアプリケーション名を入力して一意の Datadog アプリケーション ID とクライアントトークンを生成します。
3. [**Create Application**] (アプリケーションの作成) をクリックします。



### ステップ 3  アプリケーションのコンテキストで Datadog SDK を初期化する

####初期化スニペットの更新

初期化スニペットでは、環境名、サービス名、およびバージョン番号を設定します。以下の例では、`APP_VARIANT_NAME` はデータを生成するアプリケーションのバリアントを指定します。詳しくは、[タグの使用方法][10] をご覧ください。

初期化中に、サンプルレート (RUM セッション) を設定し、GDPR 準拠のためのトラッキング同意を設定することもできます。ライブラリを初期化するには、[その他の設定オプション][11] を参照してください。

{{< site-region region="us" >}}
{{< tabs >}}
{{% tab "Kotlin" %}}

```kotlin
class SampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        val configuration = Configuration.Builder(
            clientToken = <CLIENT_TOKEN>,
            env = <ENV_NAME>,
            variant = <APP_VARIANT_NAME>
        ).build()
        Datadog.initialize(this, configuration, trackingConsent)
    }
}
```
{{% /tab %}}
{{% tab "Java" %}}

```java
public class SampleApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        Configuration configuration =
                new Configuration.Builder(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>)
                        .build();
        Datadog.initialize(this, configuration, trackingConsent);
    }
}
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="eu" >}}
{{< tabs >}}
{{% tab "Kotlin" %}}

```kotlin
class SampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        val configuration = Configuration.Builder(
                clientToken = <CLIENT_TOKEN>,
                env = <ENV_NAME>,
                variant = <APP_VARIANT_NAME>
            )
            .useSite(DatadogSite.EU1)
            .build()
        Datadog.initialize(this, configuration, trackingConsent)
    }
}
```
{{% /tab %}}
{{% tab "Java" %}}

```java
public class SampleApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        Configuration configuration =
                new Configuration.Builder(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>)
                        .useSite(DatadogSite.EU1)
                        .build();
        Datadog.initialize(this, configuration, trackingConsent);
    }
}
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us3" >}}
{{< tabs >}}
{{% tab "Kotlin" %}}

```kotlin
class SampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        val configuration = Configuration.Builder(
                clientToken = <CLIENT_TOKEN>,
                env = <ENV_NAME>,
                variant = <APP_VARIANT_NAME>
            )
            .useSite(DatadogSite.US3)
            .build()
        Datadog.initialize(this, configuration, trackingConsent)
    }
}
```
{{% /tab %}}
{{% tab "Java" %}}

```java
public class SampleApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        Configuration configuration =
                new Configuration.Builder(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>)
                        .useSite(DatadogSite.US3)
                        .build();
        Datadog.initialize(this, configuration, trackingConsent);
    }
}
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us5" >}}
{{< tabs >}}
{{% tab "Kotlin" %}}

```kotlin
class SampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        val configuration = Configuration.Builder(
                clientToken = <CLIENT_TOKEN>,
                env = <ENV_NAME>,
                variant = <APP_VARIANT_NAME>
            )
            .useSite(DatadogSite.US5)
            .build()
        Datadog.initialize(this, configuration, trackingConsent)
    }
}
```
{{% /tab %}}
{{% tab "Java" %}}

```java
public class SampleApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        Configuration configuration =
                new Configuration.Builder(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>)
                        .useSite(DatadogSite.US5)
                        .build();
        Datadog.initialize(this, configuration, trackingConsent);
    }
}
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="gov" >}}
{{< tabs >}}
{{% tab "Kotlin" %}}

```kotlin
class SampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        val configuration = Configuration.Builder(
                clientToken = <CLIENT_TOKEN>,
                env = <ENV_NAME>,
                variant = <APP_VARIANT_NAME>
            )
            .useSite(DatadogSite.US1_FED)
            .build()
        Datadog.initialize(this, configuration, trackingConsent)
    }
}
```
{{% /tab %}}
{{% tab "Java" %}}

```java
public class SampleApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        Configuration configuration =
                new Configuration.Builder(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>)
                        .useSite(DatadogSite.US1_FED)
                        .build();
        Datadog.initialize(this, configuration, trackingConsent);
    }
}
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="ap1" >}}
{{< tabs >}}
{{% tab "Kotlin" %}}

```kotlin
class SampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        val configuration = Configuration.Builder(
                clientToken = <CLIENT_TOKEN>,
                env = <ENV_NAME>,
                variant = <APP_VARIANT_NAME>
            )
            .useSite(DatadogSite.AP1)
            .build()
        Datadog.initialize(this, configuration, trackingConsent)
    }
}
```
{{% /tab %}}
{{% tab "Java" %}}

```java
public class SampleApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        Configuration configuration =
                new Configuration.Builder(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>)
                        .useSite(DatadogSite.AP1)
                        .build();
        Datadog.initialize(this, configuration, trackingConsent);
    }
}
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="ap2" >}}
{{< tabs >}}
{{% tab "Kotlin" %}}

```kotlin
class SampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        val configuration = Configuration.Builder(
                clientToken = <CLIENT_TOKEN>,
                env = <ENV_NAME>,
                variant = <APP_VARIANT_NAME>
            )
            .useSite(DatadogSite.AP2)
            .build()
        Datadog.initialize(this, configuration, trackingConsent)
    }
}
```
{{% /tab %}}
{{% tab "Java" %}}

```java
public class SampleApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        Configuration configuration =
                new Configuration.Builder(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>)
                        .useSite(DatadogSite.AP2)
                        .build();
        Datadog.initialize(this, configuration, trackingConsent);
    }
}
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

初期化の資格情報には、アプリケーションのバリアント名が必要で、`BuildConfig.FLAVOR` の値を使用します。バリアントを使用することで、SDK はアプリケーションから報告されたエラーを Gradle プラグインによってアップロードされたマッピングファイルに一致させることができます。バリアントがない場合、資格情報は空の文字列を使用します。

Gradle プラグインは、ビルド時に適切な ProGuard `mapping.txt` ファイルを自動的にアップロードするため、難読化解除されたエラースタックトレースを確認できます。詳しくは、[マッピングファイルをアップロードする](#uploadyourmappingfile) セクションをご覧ください。

#### 機能の有効化によるデータ送信の開始

Android SDK を有効にしてデータの送信を開始するには: 

{{< tabs >}}
{{% tab "Kotlin" %}}

```kotlin
val rumConfig = RumConfiguration.Builder(applicationId)
    .trackUserInteractions()
    .trackLongTasks(durationThreshold) // Not applicable to Error Tracking
    .useViewTrackingStrategy(strategy)
    .build()
Rum.enable(rumConfig)
```
{{% /tab %}}

{{% tab "Java" %}}

```java
RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
    .trackUserInteractions()
    .trackLongTasks(durationThreshold) // Not applicable to Error Tracking
    .useViewTrackingStrategy(strategy)
    .build();
Rum.enable(rumConfig);
```

{{% /tab %}}
{{< /tabs >}}

すべてのビュー (アクティビティ、フラグメントなど) の自動追跡を有効にするには、[`ViewTrackingStrategy`][12] を参照してください。

####Web ビューのインスツルメント化 (オプション)

Android アプリ で WebView を使用して Web コンテンツを表示している場合、それらをインスツルメントすることで、Web コンテンツ内で発生する JavaScript エラーやクラッシュを追跡できます。

Web ビューをインスツルメント化するには: 

1. `build.gradle` ファイルで ddsdkandroidwebview を依存関係として宣言し、Gradle 依存関係を追加します。

   ```groovy
   dependencies {
    implementation "com.datadoghq:dd-sdk-android-webview:<latest_version>"
   }
   ```
2. 特定の WebView インスタンスのトラッキングを有効にするには、トラッキングするホストのリストを提供します。

   ```kotlin
   WebViewTracking.enable(webView, hosts)
   ```

詳細については、[Web ビュー追跡][8] を参照してください。

### ステップ 4  NDK クラッシュレポートを追加する

Android アプリが Android NDK (Native Development Kit) を通じてネイティブコード (C/C++) を使用している場合、このネイティブコードで発生するクラッシュを追跡できます。ネイティブコードは、パフォーマンスが重要視される操作、画像処理、または既存の C/C++ ライブラリを再利用する際に使用されることがよくあります。

NDK クラッシュレポートがないと、ネイティブコードでのクラッシュはエラートラッキングに表示されず、アプリケーションのこの部分の問題をデバッグするのが難しくなります。

NDK クラッシュレポートを有効にするには、Datadog NDK プラグインを使用します。

1. `build.gradle` ファイルでライブラリを依存関係として宣言して、Gradle 依存関係を追加します。

   ```kotlin
    dependencies {
        implementation("com.datadoghq:dd-sdk-android-ndk:x.x.x")
        //(...)
    }
   ```
2. SDK の初期化後に NDK のクラッシュの収集を有効にします。

    ```kotlin
    NdkCrashReports.enable()
    ```

### ステップ 5  ANR レポートを追加する

「Application Not Responding」([ANR][18]) は、アプリケーションが長時間応答しない場合に発生する Android 固有のエラーです。アプリケーションの応答性の問題を監視するために、RUM 設定に ANR レポートを追加できます。

ANR レポートを有効にするには、次の内容を RUM 設定に追加します。

{{< tabs >}}
{{% tab "Kotlin" %}}

```kotlin
val rumConfig = RumConfiguration.Builder(applicationId)
    .trackUserInteractions()
    .trackLongTasks(durationThreshold)
    .trackNonFatalAnrs(true) // Enable non-fatal ANR reporting
    .useViewTrackingStrategy(strategy)
    .build()
Rum.enable(rumConfig)
```
{{% /tab %}}
{{% tab "Java" %}}

```java
RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
    .trackUserInteractions()
    .trackLongTasks(durationThreshold)
    .trackNonFatalAnrs(true) // Enable non-fatal ANR reporting
    .useViewTrackingStrategy(strategy)
    .build();
Rum.enable(rumConfig);
```
{{% /tab %}}
{{< /tabs >}}

ANR は SDK を通じてのみ報告されます (ログを通じては報告されません)。

####致命的な ANR の報告
致命的な ANR はクラッシュにつながります。アプリケーションが応答しなくなると、Android OS にポップアップダイアログが表示され、ユーザーはポップアップからアプリを強制終了することができます。

{{< img src="real_user_monitoring/error_tracking/rum-anr-fatal.png" alt="Error Tracking における致命的なクラッシュのレポート。" >}}

 **Error Tracking** ページでは、致命的な ANR は類似性に基づいてグループ化され、その結果、複数の **個別の問題** が作成されることがあります。
デフォルトでは、Datadog は [ApplicationExitInfo API][19] (*[Android 30+][20]* から利用可能) を通じて致命的な ANR を検知し、アプリの次回起動時に読み取ることができます。
*[Android 29][21] 以下* では、致命的な ANR の報告はできません。

#### 致命的でない ANR の報告
致命的でない ANR は、アプリケーションの終了 (クラッシュ) につながった場合もあれば、つながっていない場合もあります。

{{< img src="real_user_monitoring/error_tracking/rum-anr-non-fatal.png" alt="Error Tracking における致命的でないクラッシュのレポート。" >}}

 **Error Tracking** ページでは、致命的でない ANR は、そのノイズのレベルのため、**単一の**問題にグループ化されます。
デフォルトでは、*Android 30+* における致命的でない ANR の報告は、致命的な ANR に対してノイズが多すぎるため、**無効**になっています。しかし、*Android 29* およびそれ以下のバージョンでは、致命的な ANR を報告できないため、致命的でない ANR の報告はデフォルトで **有効** になっています。

どの Android バージョンでも、SDK の初期化時に `trackNonFatalAnrs` を `true` または `false` に設定することで、致命的でない ANR の報告のデフォルト設定をオーバーライドすることができます。


### ステップ 6  難読化解除されたスタックトレースを取得する

Android アプリが本番用にビルドする際、通常はアプリのサイズ削減と知的財産の保護のために ProGuard または R8 でコードが難読化されます。難読化により、クラッシュレポートのスタックトレースは読み取れなくなり、`a.b.c()` のような意味のないクラス名やメソッド名が表示され、`com.example.MyClass.myMethod()` のような本来の名前が表示されなくなります。

デバッグ用にこれらのスタックトレースを読みやすくするには、マッピングファイルを Datadog にアップロードする必要があります。これらのファイルには、難読化されたコードと元のコードとのマッピングが含まれており、Datadog がエラーレポート内のスタックトレースを自動的に難読化を解除できるようにします。

####仕組み

Datadog は、各ビルドに対して生成された一意のビルド ID を使用して、スタックトレースを正しいマッピングファイルと自動的に一致させます。これによって、次のことが確実にできるようになります。

 スタックトレースは、アップロードされた時期に関係なく、常に正しいマッピングファイルで難読化が解除されます。
本番前のビルドまたは本番用のビルド中にマッピングファイルをアップロードすることができます。
このプロセスは、異なるビルドバリアントや環境間でシームレスに機能します。

マッチングプロセスは、ご使用の [Android Gradle プラグイン][22] のバージョンによって異なります。

 **バージョン 1.13.0 以上**：`build_id` フィールドを使用します (Datadog Android SDK 2.8.0 以降が必要です)
 **古いバージョン**: `service`、`version`、および `variant` フィールドの組み合わせを使用します。

####マッピングファイルのアップロード

Android Gradle プラグインにより、マッピングファイルのアップロードプロセスは自動化されます。設定後、アプリをビルドするときに、各ビルドバリアントに適切な ProGuard/R8 マッピングファイルを自動的にアップロードします。

**注**: マッピングファイルを再アップロードしても、バージョンに変更がない場合は既存のものをオーバーライドしません。ファイルサイズの制限やその他の制約については、[制限事項](#limitations) セクションを参照してください。

####アップロードタスクの実行

プラグインを設定した後、Gradle タスクを実行して、Proguard/R8 マッピングファイルと NDK シンボルファイルを Datadog にアップロードします。

```bash
./gradlew uploadMappingRelease
./gradlew uploadNdkSymbolFilesRelease
```

任意のエラーについて、ファイルパス、行番号、関連するスタックトレースの各フレームのコードスニペットにアクセスすることができます。

{{< tabs >}}
{{% tab "US" %}}

1. 以下のコードスニペットを使用して、[Android Gradle プラグイン][22] を Gradle プロジェクトに追加します。

   ```kotlin
   // In your app's build.gradle script
   plugins {
       id("com.datadoghq.dd-sdk-android-gradle-plugin") version "x.y.z"
   }
   ```

2. [専用の Datadog API キーを作成][23] し、`DD_API_KEY` または `DATADOG_API_KEY` という名前の環境変数としてエクスポートします。または、タスクプロパティとして渡すか、プロジェクトのルートに `datadogci.json` ファイルがある場合は、そこから `apiKey` プロパティを取得できます。
3. 必要に応じて、プラグインを構成し、`build.gradle` スクリプトで EU リージョンにファイルをアップロードするように設定します。
   
   ```kotlin
   datadog {
       site = "EU1"
   }
   ```

4. 難読化された APK が構築されたらアップロードタスクを実行します。
    
   ```bash
   ./gradlew uploadMappingRelease
   ```

5. ネイティブコードを実行している場合は、NDK シンボルのアップロードタスクを実行します。
   ```bash
   ./gradlew uploadNdkSymbolFilesRelease
   ```

**注**: プロジェクトで追加フレーバーを使用する場合、プラグインは難読化が有効になっているそれぞれのバリアントに対してアップロードタスクを提供します。この場合、適切なバリアント名で Android SDK を初期化します (必要な API はバージョン `1.8.0` 以降で利用可能です)。

[22]: https://github.com/DataDog/ddsdkandroidgradleplugin
[23]: https://app.datadoghq.com/organizationsettings/apikeys
{{% /tab %}}
{{% tab "EU" %}}
1. 以下のコードスニペットを使用して、[Android Gradle プラグイン][22] を Gradle プロジェクトに追加します。

   ```kotlin
   // In your app's build.gradle script
   plugins {
       id("com.datadoghq.dd-sdk-android-gradle-plugin") version "x.y.z"
   }
   ```

2. [専用の Datadog API キーを作成][23] し、`DD_API_KEY` または `DATADOG_API_KEY` という名前の環境変数としてエクスポートします。または、タスクプロパティとして渡すか、プロジェクトのルートに `datadogci.json` ファイルがある場合は、そこから `apiKey` プロパティを取得できます。
3. アプリの `build.gradle` スクリプトファイルに以下のスニペットを追加して、プラグインを EU リージョンで使用するように構成します。

   ```kotlin
   datadog {
       site = "EU1"
   }
   ```

4. 難読化された APK が構築されたらアップロードタスクを実行します。
   
   ```bash
   ./gradlew uploadMappingRelease
   ```
   
5. ネイティブコードを実行している場合は、NDK シンボルのアップロードタスクを実行します。
   ```bash
   ./gradlew uploadNdkSymbolFilesRelease
   ```

**注**: プロジェクトで追加フレーバーを使用する場合、プラグインは難読化が有効になっているそれぞれのバリアントに対してアップロードタスクを提供します。この場合、適切なバリアント名で Android SDK を初期化します (必要な API はバージョン `1.8.0` 以降で利用可能です)。

[22]: https://github.com/DataDog/ddsdkandroidgradleplugin
[23]: https://app.datadoghq.com/organizationsettings/apikeys
{{% /tab %}}
{{< /tabs >}}

####アップロードされたマッピングファイルの一覧

すべてのアップロード済みシンボルを表示するには、[RUM Debug Symbols][24] ページを参照してください。

##高度なエラートラッキング機能

{{% collapse-content title="トラッキングの同意を設定 (GDPR の遵守)" level="h4" expanded=false id="set-tracking-consent" %}}

GDPR 規制を遵守するため、SDK は初期化の完了時に追跡に関する同意を求めます。

追跡に関する同意は以下のいずれかの値で示されます。

 `TrackingConsent.PENDING`: (デフォルト) SDK はデータの収集とバッチ処理を開始しますが、
 収集エンドポイントには送信しません。SDK は、バッチ処理が完了したデータをどうするかについての新たな同意値が得られるまで待機します。
`TrackingConsent.GRANTED`: SDK はデータの収集を開始し、それをデータ収集エンドポイントに送信します。
`TrackingConsent.NOT_GRANTED`: SDK はデータを収集しません。手動でログ、トレース、またはイベントを送信することはできません。

SDK の初期化後に**追跡に関する同意を更新**するには、`Datadog.setTrackingConsent(<NEW CONSENT>)` を呼び出します。SDK は新しい同意に応じて動作を変更します。たとえば、現在の同意内容が `TrackingConsent.PENDING` であり、

`TrackingConsent.GRANTED` に更新した場合: SDK は現在のバッチデータと将来的なデータをすべてデータ収集エンドポイントに直接送信します。
`TrackingConsent.NOT_GRANTED`: SDK はすべてのバッチデータを消去し、以後のデータも収集しません。

{{% /collapse-content %}}

{{% collapse-content title="セッションのサンプリングレート" level="h4" expanded=false id="sample-session-rates" %}}

アプリケーションが Datadog に送信するデータを制御するために、[RUM の初期化][11] セッションのサンプルレートを指定できます。サンプルレートは 0 から 100 の間のパーセンテージです。デフォルトでは、`sessionSamplingRate` は 100 に設定されています (すべてのセッションを保持)。

```kotlin
val rumConfig = RumConfiguration.Builder(applicationId)
        // Here 75% of the RUM sessions are sent to Datadog
        .setSessionSampleRate(75.0f)
        .build()
Rum.enable(rumConfig)
```

{{% /collapse-content %}}

{{% collapse-content title="ネットワークイベントを追跡するためにインターセプターを初期化する" level="h4" expanded=false id="interceptor" %}}

ネットワークインターセプターは、HTTP リクエストとレスポンスを自動的に追跡し、ネットワークエラー、タイムアウト、パフォーマンスの問題をキャプチャします。これにより、ネットワークの問題とアプリのクラッシュやユーザー体験の問題を関連付けるのに役立ちます。ネットワークイベントを追跡するためにインターセプターを初期化するには:

1. 分散型トレーシングのために、[トレース機能を追加して有効にしてください][13]。
2. モジュールレベルの `build.gradle` ファイルに `ddsdkandroidokhttp` ライブラリへの Gradle 依存関係を追加します。

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
    }
    ```

3. OkHttp リクエストをリソースとして追跡するには、提供された [interceptor][14] を追加します。

{{< tabs >}}
{{% tab "Kotlin" %}}

```kotlin
val tracedHostsWithHeaderType = mapOf(
    "example.com" to setOf(
        TracingHeaderType.DATADOG,
        TracingHeaderType.TRACECONTEXT),
    "example.eu" to setOf(
        TracingHeaderType.DATADOG,
        TracingHeaderType.TRACECONTEXT))
val okHttpClient = OkHttpClient.Builder()
    .addInterceptor(DatadogInterceptor.Builder(tracedHostsWithHeaderType).build())
    .build()
```
{{% /tab %}}

{{% tab "Java" %}}

```java
Map<String, Set<TracingHeaderType>> tracedHostsWithHeaderType = new HashMap<>();
Set<TracingHeaderType> datadogAndW3HeadersTypes = new HashSet<>(Arrays.asList(TracingHeaderType.DATADOG, TracingHeaderType.TRACECONTEXT));
tracedHostsWithHeaderType.put("example.com", datadogAndW3HeadersTypes);
tracedHostsWithHeaderType.put("example.eu", datadogAndW3HeadersTypes);
OkHttpClient okHttpClient = new OkHttpClient.Builder()
    .addInterceptor(new DatadogInterceptor.Builder(tracedHostsWithHeaderType).build())
    .build();
```
{{% /tab %}}
{{< /tabs >}}

4. OkHttp リクエストの RUM リソースとスパンを自動的に作成するには、`DatadogInterceptor` をインターセプターとして使用します。
    これにより、`OkHttpClient` によって処理された各リクエストがリソースとして記録され、関連するすべての情報 (URL、メソッド、ステータスコード、エラー) が自動的に入力されます。ビューがアクティブな時に開始したネットワークリクエストのみが追跡されます。アプリケーションがバックグラウンドの時にリクエストを追跡するには、[手動でビューを作成][15] します。
      
5. ネットワークのリダイレクトや再試行を監視するには、`DatadogInterceptor` を [ネットワークインターセプター][16] として使用できます。

{{< tabs >}}
{{% tab "Kotlin" %}}

```kotlin
val okHttpClient = OkHttpClient.Builder()
    .addNetworkInterceptor(DatadogInterceptor.Builder(tracedHostsWithHeaderType).build())
    .build()
```
{{% /tab %}}
{{% tab "Java" %}}

```java
OkHttpClient okHttpClient = new OkHttpClient.Builder()
    .addNetworkInterceptor(new DatadogInterceptor.Builder(tracedHostsWithHeaderType).build())
    .build();
```
{{% /tab %}}
{{< /tabs >}}

**注**:
 スパンを使用するが RUM リソースを使用しない場合は、上記のように `DatadogInterceptor` の代わりに `TracingInterceptor` を使用できます。
複数のインターセプターを使用する場合は、最初に `DatadogInterceptor` を追加してください。

また、`EventListener` を `OkHttpClient` に追加して、サードパーティプロバイダーやネットワークリクエストの [リソースタイミングを自動的に追跡][17] することもできます。

{{% /collapse-content %}}

{{% collapse-content title="バックグラウンドイベントの追跡" level="h4" expanded=false id="track-background-events" %}}

アプリケーションがバックグラウンドにあるとき (たとえば、アクティブなビューがないとき)、クラッシュやネットワークリクエストなどのイベントを追跡することができます。

構成中に以下のスニペットを追加します。

{{< tabs >}}
{{% tab "Kotlin" %}}

```kotlin
.trackBackgroundEvents(true)
```
{{% /tab %}}
{{% tab "Java" %}}

```java
.trackBackgroundEvents(true)
```
{{% /tab %}}
{{< /tabs >}}
<div class="alert alert-info"><p>バックグラウンドイベントの追跡は、追加のセッションを引き起こす可能性があり、課金に影響を与えることがあります。質問がある場合は、<a href="https://docs.datadoghq.com/help/">Datadog サポートにお問い合わせください。</a></p>
</div>

{{% /collapse-content %}}

{{% collapse-content title="デバイスがオフラインの時のデータ送信" level="h4" expanded=false id="sending-data-device-offline" %}}

Android SDK は、ユーザーのデバイスがオフラインのときにデータの可用性を確保します。ネットワークが不安定な地域やデバイスのバッテリー残量が少ない場合、すべてのイベントは最初にローカルデバイスにバッチで保存されます。

各バッチは、取り込み仕様に従います。バッチは、ネットワークが利用可能でバッテリー残量が十分に高い場合に送信され、Datadog SDK がエンドユーザーの体験に影響を与えないようになっています。アプリケーションがフォアグラウンドにある間にネットワークが利用できない場合、またはデータのアップロードが失敗した場合、送信に成功するまでバッチは保持されます。
 
つまり、ユーザーがオフラインでアプリケーションを開いても、データが失われることはありません。SDK がディスク容量を使いすぎないように、ディスク上のデータは古くなりすぎると自動的に破棄されます。

{{% /collapse-content %}}

{{% collapse-content title="プラグインコンフィギュレーションオプション" level="h4" expanded=false id="plugin-config-options" %}}

プラグイン拡張を通じて構成できるいくつかのプラグインプロパティがあります。複数のバリアントを使用している場合、特定のフレーバーに対してプロパティ値を設定できます。

たとえば、`fooBarRelease` バリアントの場合、以下のような構成になります。

```kotlin
datadog {
    foo {
        versionName = "foo"
    }
    bar {
        versionName = "bar"
    }
    fooBar {
        versionName = "fooBar"
    }
}
```

このバリアントのタスク構成は、以下の順序で提供される 3 つのフレーバー構成のすべてからマージされます。

1. `bar`
2. `foo`
3. `fooBar`

これにより、`versionName` プロパティの最終的な値は `fooBar` と解決されます。

| プロパティ名              | 説明                                                                                                                                                                                               |
|||
| `versionName`              | アプリケーションのバージョン名 (デフォルトでは、`android` ブロック内で宣言された `build.gradle` のバージョン)                                                                                                              |
| `serviceName`              | アプリケーションのサービス名 (デフォルトでは、`android` ブロック内で宣言されたアプリケーションのパッケージ名)。                                                                                                                         |
| `site`                     | データをアップロードする Datadog サイト (US1、US3、US5、EU1、US1_FED、AP1、または AP2)。                                                                                                                                      |
| `remoteRepositoryUrl`      | ソースコードがデプロイされたリモートリポジトリの URL。これが提供されていない場合、この値はタスク実行時に Git コンフィグレーション から解決されます。                    |
| `checkProjectDependencies` | このプロパティは、プラグインが Datadog Android SDK が依存関係に含まれているかどうかをチェックするかどうかを制御します。そうでない場合、`none` は無視され、`warn` は警告をログに記録し、`fail` はエラーでビルドを失敗させます (デフォルト)。|

{{% /collapse-content %}}

{{% collapse-content title="CI/CD パイプラインとのインテグレーション" level="h4" expanded=false id="plugin-config-options" %}}

デフォルトでは、アップロードマッピングタスクはビルドグラフ内の他のタスクから独立しています。マッピングをアップロードする必要があるときは、タスクを手動で実行してください。

CI/CD パイプラインでこのタスクを実行し、ビルドグラフの一部としてこのタスクが必要な場合、マッピングファイルが生成された後にアップロードタスクを実行するように設定できます。

たとえば、以下のとおりです。

```kotlin
tasks["minify${variant}WithR8"].finalizedBy { tasks["uploadMapping${variant}"] }
```
{{% /collapse-content %}}

## 制限事項

### ファイルサイズ
[マッピングファイル](#uploadyourmappingfile) のサイズは **500 MB** に制限されています。プロジェクトにこのサイズを超えるマッピングファイルがある場合、次のオプションのいずれかを使用してファイルサイズを減らします。

 `mappingFileTrimIndents` オプションを `true` に設定します。これにより、ファイルサイズが平均 5% 減少します。
`mappingFilePackagesAliases` のマップを設定します。これにより、パッケージ名が短いエイリアスに置き換えられます。**注意**: Datadog のスタックトレースは元のパッケージ名の代わりに同じエイリアスを使用するため、サードパーティの依存関係にはこのオプションの利用が推奨されます。

```kotlin
datadog {
    mappingFileTrimIndents = true
    mappingFilePackageAliases = mapOf(
        "kotlinx.coroutines" to "kx.cor",
        "com.google.android.material" to "material",
        "com.google.gson" to "gson",
        "com.squareup.picasso" to "picasso"
    )
}
```

###コレクション
RUM クラッシュレポートの動作を Android で確認する際は、以下の点を考慮してください。

 クラッシュは SDK が初期化された後にのみ検出できます。このため、アプリケーションの `onCreate` メソッド内で SDK をできるだけ早く初期化することをお勧めします。
RUM クラッシュは RUM ビューに関連付ける必要があります。ビューが表示される前 (通常は `onResume` 状態のアクティビティまたはフラグメント) にクラッシュが発生した場合や、エンドユーザーがアプリをバックグラウンドに送信した後にクラッシュが発生した場合、クラッシュはミュートされ、収集のために報告されません。これに対応するために、`trackBackgroundEvents()` [メソッド][25] を`RumConfiguration` ビルダー内で使用します。
サンプリングされたセッションで発生したクラッシュのみが保持されます。[セッションサンプリングレートが 100% でない場合][24]、一部のクラッシュは報告されません。

##実装のテスト

Android のクラッシュレポートとエラー追跡の構成を確認するには、アプリケーションでクラッシュを発生させ、Datadog にエラーが表示されることを確認する必要があります。

実装をテストするには

1. Android エミュレーターまたは実機でアプリケーションを実行します。
2. エラーやクラッシュを含むコードを実行します。たとえば、以下のとおりです。

   ```kotlin
   fun onEvent() {
       throw RuntimeException("Crash the app")
   }
   ```

3. クラッシュが発生したら、アプリケーションを再起動し、Android SDK が [**エラートラッキング**][2] にクラッシュレポートをアップロードするのを待ちます。

##Kotlin 拡張機能

### `Closeable` 拡張機能

`Closeable` インスタンスの使用状況を `useMonitored` メソッドで監視できます。発生したエラーが Datadog に報告され、その後リソースが閉じられます。

```kotlin
val closeable: Closeable = ...
closeable.useMonitored {
    // Your code here
}
```

###ローカルアセットをリソースとして追跡

`getAssetAsRumResource` 拡張メソッドを使用して、アセットへのアクセスを追跡できます。

```kotlin
val inputStream = context.getAssetAsRumResource(fileName)
```

`getRawResAsRumResource` 拡張機能メソッドを使うことで、ローカルリソースの使用状況を追跡することができます。

```kotlin
val inputStream = context.getRawResAsRumResource(id)
```

##参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/error_tracking/
[2]: https://app.datadoghq.com/rum/errortracking
[3]: https://app.datadoghq.com/rum/application/create
[4]: /ja/real_user_monitoring/application_monitoring/android/setup/#setup
[5]: https://github.com/DataDog/ddsdkandroid/tree/develop/features/ddsdkandroidrum
[6]: https://github.com/DataDog/ddsdkandroidgradleplugin
[7]: https://app.datadoghq.com/errortracking/settings/setup/client
[8]: /ja/real_user_monitoring/application_monitoring/android/web_view_tracking/
[9]: /ja/real_user_monitoring/application_monitoring/android/data_collected/
[10]: /ja/getting_started/tagging/using_tags/
[11]: /ja/real_user_monitoring/application_monitoring/android/advanced_configuration/#initializationparameters
[12]: /ja/real_user_monitoring/application_monitoring/android/advanced_configuration/#automaticallytrackviews
[13]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/android/
[14]: https://square.github.io/okhttp/features/interceptors/
[15]: /ja/real_user_monitoring/application_monitoring/android/advanced_configuration/#customviews
[16]: https://square.github.io/okhttp/features/interceptors/#networkinterceptors
[17]: /ja/real_user_monitoring/application_monitoring/android/advanced_configuration/#automaticallytracknetworkrequests
[18]: https://developer.android.com/topic/performance/vitals/anr
[19]: https://developer.android.com/reference/android/app/ApplicationExitInfo
[20]: https://developer.android.com/tools/releases/platforms#11
[21]: https://developer.android.com/tools/releases/platforms#10
[22]: https://github.com/DataDog/ddsdkandroidgradleplugin
[23]: https://app.datadoghq.com/organizationsettings/apikeys
[24]: https://app.datadoghq.com/sourcecode/setup/rum
[25]: /ja/real_user_monitoring/application_monitoring/android/setup/#trackbackgroundevents