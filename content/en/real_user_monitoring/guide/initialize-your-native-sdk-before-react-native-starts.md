---
title: Initialize Your Native SDK Before React Native Starts
kind: guide
description: Learn how to initialize your native SDK before React Native starts
further_reading:
- link: real_user_monitoring/reactnative/
  tag: Documentation
  text: Learn about React Native monitoring
algolia:
  tags: ['bots']
---

## Overview

By default, the React Native SDK initializes the native SDK when calling `DdSdkReactNative.initialize(config)` on the JS layer, or using the `DatadogProvider`. As a result, the SDK does not capture native crashes that occur prior to the initialization being called on the JS layer. Starting from v2.3.0, you can initialize your native SDK in order for Datadog to capture any crashes before the React Native layer starts.

## Configuration

To initialize your native SDK before React Native has started:

1. Create a `datadog-configuration.json` file at the root of the `react-native` project with the following structure:
   
   ```json
   {
     "$schema": "./node_modules/@datadog/mobile-react-native/datadog-configuration.schema.json",
     "configuration": {
     }
   }
   ```

   The `"$schema"` attribute here enables autocomplete and helps most modern Integrated Development Environments (IDE) to show errors if the configuration is incomplete or invalid.

   {{< img src="real_user_monitoring/guide/initialize-your-native-sdk-before-react-native-starts/initialize-sdk-before-rn-1.png" alt="You may see an error in your IDE if the configuration is incomplete or invalid" style="width:100%" >}}

   {{< img src="real_user_monitoring/guide/initialize-your-native-sdk-before-react-native-starts/initialize-sdk-before-rn-2.png" alt="You may see an error in your IDE if the configuration is incomplete or invalid" style="width:100%" >}}

   {{< img src="real_user_monitoring/guide/initialize-your-native-sdk-before-react-native-starts/initialize-sdk-before-rn-3.png" alt="You may see an error in your IDE if the configuration is incomplete or invalid" style="width:100%" >}}

2. Follow the steps below for your native OS.

   {{< tabs >}}
   {{% tab "Android" %}}

   1. Add the following snippet to the `MainApplication.kt` file:

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

   2. Add the following snippet to the `android/app/build.gradle` file:

      ```gradle
      apply from: "../../node_modules/@datadog/mobile-react-native/datadog-configuration.gradle"
      ```

      This script copies the configuration file to your build assets directory.

   {{% /tab %}}
   {{% tab "iOS" %}}

   1. Add the following snippet to the `AppDelegate.mm` file:

      ```objc
      // Add this import
      #import "DdSdk.h"

      - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
      {
          [DdSdk initFromNative];
          // rest of the function
      }
      ```

   2. Add the `datadog-configuration.json` file to your project resources.

   {{% /tab %}}
   {{% tab "JS" %}}

   Change the Datadog initialization to read from the same file to ensure consistency:

   ```jsx
   const configuration  = new FileBasedConfiguration(require("./datadog-configuration.json"))

   <DatadogProvider configuration={configuration}>
     // Rest of the app
   </DatadogProvider>
   ```

   {{% /tab %}}
   {{< /tabs >}}

## Configuration file location

Depending on your OS, the configuration file may be in a different location:

- In **Android**, you can specify where to get the file to copy by adding the following snippet:

  ```gradle
  project.ext.datadog = [
      configurationFilePath: "../../../datadog-configuration.json"
  ]
  ```
- In **iOS**, the configuration file gets added to the top of the project resources directory, no matter where it is located.
- In **React Native**, you can specify any path for the file using the `require` pattern.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
