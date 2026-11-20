---
algolia:
  tags:
  - bots
description: React Native が起動する前にネイティブ SDK を初期化する方法を学びましょう
further_reading:
- link: real_user_monitoring/dashboards/usage
  tag: ドキュメント
  text: React Native のモニタリングについて
title: React Native 起動前にネイティブ SDK を初期化する
---

## 概要

デフォルトでは、React Native SDK は JS レイヤーで `DdSdkReactNative.initialize(config)` を呼び出すか、`DatadogProvider` を使用する際にネイティブ SDK を初期化します。そのため、JS レイヤーで初期化が呼び出される前に発生したネイティブのクラッシュは SDK によってキャプチャされません。バージョン v2.3.0 以降では、React Native レイヤーが起動する前にクラッシュを捕捉するために、ネイティブ SDK を初期化できます。

## 構成

React Native が起動する前にネイティブ SDK を初期化するには、次の手順に従います。

1. `react-native` プロジェクトのルートに、以下の構造を持つ `datadog-configuration.json` ファイルを作成します。

   ```json
   {
     "$schema": "./node_modules/@datadog/mobile-react-native/datadog-configuration.schema.json",
     "configuration": {
     }
   }
   ```

   `"$schema"` 属性を指定すると、オートコンプリートが有効になり、設定が不完全または無効な場合に多くの最新 IDE でエラーが表示されるようになります。

   {{< img src="real_user_monitoring/guide/initialize-your-native-sdk-before-react-native-starts/initialize-sdk-before-rn-1.png" alt="設定が不完全または無効な場合、IDE にエラーが表示されることがあります" style="width:100%" >}}

   {{< img src="real_user_monitoring/guide/initialize-your-native-sdk-before-react-native-starts/initialize-sdk-before-rn-2.png" alt="設定が不完全または無効な場合、IDE にエラーが表示されることがあります" style="width:100%" >}}

   {{< img src="real_user_monitoring/guide/initialize-your-native-sdk-before-react-native-starts/initialize-sdk-before-rn-3.png" alt="設定が不完全または無効な場合、IDE にエラーが表示されることがあります" style="width:100%" >}}

2. ご利用の OS に応じて、以下の手順に従ってください。

   {{< tabs >}}
   {{% tab "Android" %}}

   1. `MainApplication.kt` ファイルに次のスニペットを追加します。

      ```kotlin
      import com.datadog.reactnative.DdSdkNativeInitialization

      class MainApplication : Application(), ReactApplication {
        override fun onCreate() {
          super.onCreate()
          DdSdkNativeInitialization.initFromNative(this.applicationContext)
          // Rest of the method
        }
      }
      ```

   2. さらに、`android/app/build.gradle` ファイルに次のスニペットを追加します。

      ```gradle
      apply from: "../../node_modules/@datadog/mobile-react-native/datadog-configuration.gradle"
      ```

      このスクリプトは、ビルドのアセットディレクトリに設定ファイルをコピーします。

   {{% /tab %}}
   {{% tab "iOS" %}}

   1. `AppDelegate.mm` ファイルに次のスニペットを追加します。

      ```objc
      // Add this import
      #import "DdSdk.h"

      - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
      {
          [DdSdk initFromNative];
          // rest of the function
      }
      ```

   2. `datadog-configuration.json` ファイルをプロジェクトのリソースに追加します。

   {{% /tab %}}
   {{% tab "JS" %}}

   同一ファイルを参照して Datadog を初期化するように変更し、設定の一貫性を保ちます。

   ```jsx
   const configuration  = new FileBasedConfiguration(require("./datadog-configuration.json"))

   <DatadogProvider configuration={configuration}>
     // Rest of the app
   </DatadogProvider>
   ```

   {{% /tab %}}
   {{< /tabs >}}

## 設定ファイルの場所

OS によって設定ファイルの場所が異なります。

- **Android**: 次のスニペットを追加して、コピー元のファイルのパスを指定できます。

  ```gradle
  project.ext.datadog = [
      configurationFilePath: "../../../datadog-configuration.json"
  ]
  ```
- **iOS**: 設定ファイルは配置場所にかかわらず、ビルド時にプロジェクトの Resources ディレクトリ直下へコピーされます。
- **React Native**: `require` パターンを使用することで、任意のパスを指定できます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}