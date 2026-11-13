---
aliases:
- /ja/real_user_monitoring/android/jetpack_compose_instrumentation/
- /ja/real_user_monitoring/mobile_and_tv_monitoring/jetpack_compose_instrumentation/android
- /ja/real_user_monitoring/mobile_and_tv_monitoring/android/jetpack_compose_instrumentation
description: Datadog Gradle プラグインを使用して、Jetpack Compose を手動または自動でインスツルメントします。
further_reading:
- link: https://github.com/DataDog/dd-sdk-android/tree/develop/integrations/dd-sdk-android-compose
  tag: ソースコード
  text: dd-sdk-android-compose のソースコード
- link: https://github.com/DataDog/dd-sdk-android-gradle-plugin
  tag: ソースコード
  text: Datadog Gradle プラグインのソースコード
- link: /real_user_monitoring
  tag: ドキュメント
  text: Datadog RUM を探索する
title: Jetpack Compose インスツルメンテーション
---
## 概要{#overview}
Jetpack Compose は、Android でネイティブ UI を構築するためのツールキットです。アプリケーションで Jetpack Compose を使用している場合、Datadog Gradle プラグインを使用して手動または自動でインスツルメントすることができます。これにより、Android の従来のビューで利用可能なものと同様の RUM (Real User Monitoring) が有効になります。

<div class="alert alert-info"><p>サポートされている最小の Kotlin バージョンは 1.9.23 です。</p></div>

初期設定後、[自動](#automatic-instrumentation)インスツルメンテーションと[手動](#manual-instrumentation)インスツルメンテーションのいずれかを選択できます。

## セットアップ{#setup}
### ステップ 1 - "dd-sdk-android-compose" を依存関係として宣言する {#step-1-declare-dd-sdk-android-compose-as-a-dependency}
`dd-sdk-android-compose` をインスツルメントする各モジュールの依存関係として追加します。これには、アプリケーションモジュール、Jetpack Compose UI モジュール、または Jetpack Compose を使用する機能モジュールが含まれます。
Jetpack Compose インスツルメンテーションに必要な `dd-sdk-android-compose` の最小バージョンは 2.21.0 です。
{{< tabs >}}
{{% tab "Groovy" %}}

```groovy
dependencies {
    implementation "com.datadoghq:dd-sdk-android-compose:x.x.x"
    //(...)
}
```
{{% /tab %}}
{{% tab "Kotlin" %}}

```kotlin
dependencies {
    implementation("com.datadoghq:dd-sdk-android-compose:x.x.x")
    //(...)
}
```
{{% /tab %}}
{{< /tabs >}}

### ステップ 2 - `RumConfiguration` でアクション追跡オプションを有効にする {#step-2-enable-actions-tracking-option-in-rumconfiguration}
依存関係を追加した後、`RumConfiguration` で Compose アクション追跡を有効にします。このステップは、インスツルメンテーションモードに関係なく必須です。
{{< tabs >}}
{{% tab "Kotlin" %}}

```kotlin
val rumConfig = RumConfiguration.Builder(applicationId)
      //other configurations that you have already set
      .enableComposeActionTracking()
      .build()
Rum.enable(rumConfig)
```
{{% /tab %}}
{{% tab "Java" %}}

```java
RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
      //other configurations that you have already set
      .enableComposeActionTracking()
      .build();
Rum.enable(rumConfig);
```
{{% /tab %}}
{{< /tabs >}}

## 自動インスツルメンテーション {#automatic-instrumentation}

最小限のセットアップで完全に RUM を使用できるようにするには、Jetpack Compose アプリケーションを自動的にインスツルメントします。

[Android セットアップセクション][2]のステップ 1 の説明に従って、ビルドスクリプトで [Datadog Gradle プラグイン][3]を宣言し、インスツルメントする各モジュールに適用します。

<div class="alert alert-info"><p>
Datadog Gradle プラグインは、 <code>@Composable</code> 関数をスキャンしてその修飾子にセマンティクスタグを追加します。これらのタグにより、Datadog RUM は正しいターゲット情報を使用して Compose コンポーネント上のユーザーインタラクションを追跡できます。このプラグインはさらに、 <code>NavHost</code> の使用状況を検出し、Jetpack Compose のナビゲーションイベントをリッスンします。
</p></div>

###  ステップ 1 - ビルドスクリプトで Datadog Gradle プラグインを宣言する {#step-1-declare-datadog-gradle-plugin-in-your-buildscript}
Jetpack Compose インスツルメンテーションに必要な Datadog Gradle プラグインの最小バージョンは 1.17.0 です。
{{< tabs >}}
{{% tab "Groovy" %}}

```groovy
buildscript {
    dependencies {
        classpath "com.datadoghq:dd-sdk-android-gradle-plugin:x.x.x"
    }
}

plugins {
    id 'com.datadoghq.dd-sdk-android-gradle-plugin'
    //(...)
}
```
{{% /tab %}}
{{% tab "Kotlin" %}}

```kotlin
buildscript {
    dependencies {
        classpath("com.datadoghq:dd-sdk-android-gradle-plugin:x.x.x")
    }
}

plugins {
    id("com.datadoghq.dd-sdk-android-gradle-plugin")
    //(...)
}
```
{{% /tab %}}
{{< /tabs >}}

### セットアップ 2 - インスツルメンテーションモードを選択する {#setup-2-select-the-instrumentation-mode}
モジュールの Gradle 設定で、目的の Compose インスツルメンテーションモードを定義します。

{{< tabs >}}
{{% tab "Groovy" %}}

```groovy
datadog {
	// Other configurations that you may set before.
	//(...)

	// Jetpack Compose instrumentation mode option.
	composeInstrumentation = "AUTO"
}
```
{{% /tab %}}
{{% tab "Kotlin" %}}

```kotlin
datadog {
  // Other configurations that you may set before.
  //(...)

  // Jetpack Compose instrumentation mode option.
  composeInstrumentation = InstrumentationMode.AUTO
}
```
{{% /tab %}}
{{< /tabs >}}

利用可能なインスツルメンテーションモードは以下のとおりです。

{{< tabs >}}
{{% tab "Groovy" %}}
- `"AUTO"`: すべての `@Composable` 関数をインスツルメントします。
- `"ANNOTATION"`: `@ComposeInstrumentation` というアノテーションが付けられた `@Composable` 関数のみをインスツルメントします。このアノテーションを使用して、自動インスツルメンテーションのスコープを定義できます。
- `"DISABLE"`: インスツルメンテーションを完全に無効にします。
{{% /tab %}}

{{% tab "Kotlin" %}}

- `InstrumentationMode.AUTO`: すべての `@Composable` 関数をインスツルメントします。
- `InstrumentationMode.ANNOTATION`: `@ComposeInstrumentation` というアノテーションが付けられた `@Composable` 関数のみをインスツルメントします。このアノテーションを使用して、自動インスツルメンテーションのスコープを定義できます。
- `InstrumentationMode.DISABLE`: インスツルメンテーションを完全に無効にします。

{{% /tab %}}
{{< /tabs >}}

**注**: `datadog` ブロック内で `composeInstrumentation` を宣言しない場合、自動インスツルメンテーションはデフォルトで無効になります。

### 自動インスツルメンテーションで名前が割り当てられる仕組み {#how-names-are-assigned-with-auto-instrumentation}
自動インスツルメンテーションが有効な場合、次のようになります。
-   **Compose ナビゲーションルート**が**ビュー名**として使用されます。
-   インタラクティブな要素をラップする**直接構成可能な関数の名前**が**アクションターゲット**として使用されます。

```kotlin
@Composable
fun AppScaffold(){
    NavHost(navController = rememberNavController(), startDestination = "Home Screen"){
      composable("Home Screen"){
        HomeScreen()
      }
    }
}

@Composable
fun CustomButton(onClick: () -> Unit) {
    Button(onClick = onClick){
       Text("Welcome Button")
    }
}
```
上記の例では、次のようになります。
-   `HomeScreen()` が読み込まれると、「Home Screen」が**ビュー名**として使用されます。
-   ボタンがクリックされると、「CustomButton」が**アクションターゲット**として使用されます。

{{< img src="real_user_monitoring/android/android-auto-instrumentation-naming.png" alt="自動インスツルメンテーションのデフォルトの命名" style="width:90%;">}}


## 手動インスツルメンテーション {#manual-instrumentation}

アクションやビューの追跡をより細かくカスタマイズまたは制御する必要がある場合は、アプリケーションを手動でインスツルメントすることができます。

### アクション追跡 {#actions-tracking}
特定の Jetpack Compose コンポーネントに対するユーザーインタラクションを追跡するには、`datadog` 修飾子を適用します。`name` 引数は、RUM イベントリストに表示されるビュー名を定義します。

```kotlin
@Composable
fun HomeScreen(){
 Column{
     Image(modifier = Modifier.datadog(name = "Welcome Image").clickable{
       // Action can be tracked if this image is clickable
     },
      // Other arguments
     )

     Text(modifier = Modifier.datadog(name = "Welcome Text").clickable{
       // Action can be tracked if this text is clickable
     },
      // Other arguments
     )
 }
}
```
上記の例では、RUM アクション追跡におけるインタラクティブな要素に対してカスタム名が使用されています。

{{< img src="real_user_monitoring/android/android-actions-tracking-1.png" alt="アクション追跡におけるコンポーネント名" style="width:90%;">}}


### ビュー追跡 {#views-tracking}
Jetpack Compose ナビゲーションに基づく RUM ビューの追跡を有効にするには、`NavigationViewTrackingEffect` API を呼び出し、アプリの `NavHostController` を渡します。

```kotlin
@Composable
fun AppScaffold(){
	val navController = rememberNavController()
	NavigationViewTrackingEffect(
	    navController = navController,
	    trackArguments = true,
	    destinationPredicate = AcceptAllNavDestinations()
	)
	NavHost(navController = navController,
	    // other arguments
	) {
	   // (...)
	}
}
```

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-android/tree/develop/integrations/dd-sdk-android-compose
[2]: https://docs.datadoghq.com/ja/real_user_monitoring/application_monitoring/android/setup?tab=rum#step-1---declare-the-android-sdk-as-a-dependency
[3]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[4]: https://developer.android.com/develop/ui/compose/accessibility/semantics