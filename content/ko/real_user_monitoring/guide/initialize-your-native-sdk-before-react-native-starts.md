---
algolia:
  tags:
  - 봇
description: React Native가 시작되기 전에 네이티브 SDK를 초기화하는 방법 알아보기
further_reading:
- link: real_user_monitoring/reactnative/
  tag: 설명서
  text: React Native 모니터링에 대해 알아보기
title: React Native 시작 전에 네이티브 SDK 초기화
---

## 개요

기본적으로 React Native SDK는 JS 계층에서 `DdSdkReactNative.initialize(config)`를 호출하거나 `DatadogProvider` 파일을 사용할 때 네이티브 SDK를 초기화합니다. 따라서 JS 계층에서 초기화가 호출되기 전에 발생하는 네이티브 크래시는 SDK에서 캡처하지 않습니다. v2.3.0부터는 React Native 계층이 시작되기 전에 Datadog이 크래시를 캡처할 수 있도록 네이티브 SDK를 초기화할 수 있습니다.

## 구성

React Native가 시작되기 전에 네이티브 SDK를 초기화하는 방법:

1. `react-native` 프로젝트 루트에 다음 구조의 `datadog-configuration.json` 파일을 만듭니다.

   ```json
   {
     "$schema": "./node_modules/@datadog/mobile-react-native/datadog-configuration.schema.json",
     "configuration": {
     }
   }
   ```

   `"$schema"` 속성은 자동완성을 활성화하고 대부분의 최신 Integrated Development Environments(IDE)에서 구성이 불완전하거나 유효하지 않은 경우 오류를 표시하는 데 도움이 됩니다.

   {{< img src="real_user_monitoring/guide/initialize-your-native-sdk-before-react-native-starts/initialize-sdk-before-rn-1.png" alt="구성이 불완전하거나 유효하지 않은 경우 IDE에서 오류가 표시될 수 있습니다." style="width:100%" >}}

   {{< img src="real_user_monitoring/guide/initialize-your-native-sdk-before-react-native-starts/initialize-sdk-before-rn-2.png" alt="구성이 불완전하거나 유효하지 않은 경우 IDE에서 오류가 표시될 수 있습니다." style="width:100%" >}}

   {{< img src="real_user_monitoring/guide/initialize-your-native-sdk-before-react-native-starts/initialize-sdk-before-rn-3.png" alt="구성이 불완전하거나 유효하지 않은 경우 IDE에서 오류가 표시될 수 있습니다." style="width:100%" >}}

2. 네이티브 OS에 맞게 아래 단계를 따르세요.

   {{< tabs >}}
   {{% tab "Android" %}}

   1. `MainApplication.kt` 파일에 다음 스니펫을 추가합니다.

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

   2. `android/app/build.gradle` 파일에 다음 스니펫을 추가합니다.

      ```gradle
      apply from: "../../node_modules/@datadog/mobile-react-native/datadog-configuration.gradle"
      ```

      이 스크립트는 구성 파일을 빌드 자산 디렉터리에 복사합니다.

   {{% /tab %}}
   {{% tab "iOS" %}}

   1. `AppDelegate.mm` 파일에 다음 스니펫을 추가합니다.

      ```objc
      // Add this import
      #import "DdSdk.h"

      - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
      {
          [DdSdk initFromNative];
          // rest of the function
      }
      ```

   2. `datadog-configuration.json` 파일에 해당 프로젝트 리소스를 추가합니다.

   {{% /tab %}}
   {{% tab "JS" %}}

   일관성을 보장하기 위해 Datadog 초기화를 동일한 파일에서 읽도록 변경합니다.

   ```jsx
   const configuration  = new FileBasedConfiguration(require("./datadog-configuration.json"))

   <DatadogProvider configuration={configuration}>
     // Rest of the app
   </DatadogProvider>
   ```

   {{% /tab %}}
   {{< /tabs >}}

## 구성 파일 위치

OS에 따라 구성 파일의 위치가 다를 수 있습니다.

- **Android**에서는 다음 스니펫을 추가하여 파일을 복사할 위치를 지정할 수 있습니다.

  ```gradle
  project.ext.datadog = [
      configurationFilePath: "../../../datadog-configuration.json"
  ]
  ```
- **iOS**에서는 구성 파일이 어디에 있든 프로젝트 리소스 디렉터리의 맨 위에 추가됩니다.
- **React Native**에서는 `require` 패턴을 사용하여 파일의 경로를 지정할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}