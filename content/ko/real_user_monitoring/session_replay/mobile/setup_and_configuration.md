---
title: 모바일 세션 리플레이 설치 및 설정
description: 모바일 세션 리플레이을 설치하고 설정합니다.
further_reading:
    - link: /real_user_monitoring/session_replay/mobile
      tag: 설명서
      text: 모바일 세션 리플레이
    - link: /real_user_monitoring/session_replay/mobile/app_performance
      tag: 설명서
      text: 모바일 세션 리플레이이 앱 성능에 미치는 영향
    - link: /real_user_monitoring/session_replay/mobile/privacy_options
      tag: 설명서
      text: 모바일 세션 리플레이 개인정보 보호 옵션
    - link: /real_user_monitoring/session_replay/mobile/troubleshooting
      tag: 설명서
      text: 모바일 세션 리플레이 문제 해결
    - link: /real_user_monitoring/session_replay
      tag: 설명서
      text: 세션 리플레이
    - link: /real_user_monitoring/mobile_and_tv_monitoring/android/web_view_tracking
      tag: 문서
      text: 웹 보기 추적
---

## 설정

{{< tabs >}}
{{% tab "Android" %}}

모든 세션 리플레이 SDK 버전은 [Maven Central Repository][1]에서 확인할 수 있습니다.

Android에서 모바일 세션 리플레이을 설정하려면:

1. 보기 계측이 활성화된 상태에서 [Datadog Android RUM SDK 설정 및 초기화][2]를 완료했는지 확인하세요.

2. Datadog 세션 리플레이을 종속성으로 선언합니다:
  {{< code-block lang="kotlin" filename="build.gradle.kts" disable_copy="false" collapsible="true" >}}
    implementation("com.datadoghq:dd-sdk-android-rum:[datadog_version]")
    implementation("com.datadoghq:dd-sdk-android-session-replay:[datadog_version]")
    // Material 지원이 필요한 경우
    implementation("com.datadoghq:dd-sdk-android-session-replay-material:[datadog_version]")
    // Jetpack Compose 지원이 필요한 경우
    implementation("com.datadoghq:dd-sdk-android-session-replay-compose:[datadog_version]")
   {{< /code-block >}}

3. 앱에서 세션 리플레이을 활성화합니다:

   {{< code-block lang="kotlin" filename="Application.kt" disable_copy="false" collapsible="true" >}}
   val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
    // Material 확장 지원이 필요한 경우
    .addExtensionSupport(MaterialExtensionSupport())
    // Jetpack Compose 지원이 필요한 경우
    .addExtensionSupport(ComposeExtensionSupport())
    .build()
   SessionReplay.enable(sessionReplayConfig)
   {{< /code-block >}}

[1]: https://central.sonatype.com/artifact/com.datadoghq/dd-sdk-android-session-replay/versions
[2]: /real_user_monitoring/android/?tab=kotlin

{{% /tab %}}
{{% tab "iOS" %}}

iOS용 모바일 세션 리플레이 설정하기:

1. 보기 계측이 활성화된 상태에서 [Datadog iOS RUM SDK 설정 및 초기화][1]를 완료했는지 확인하세요.

2. 패키지 매니저에 따라 Datadog 세션 리플레이 라이브러리를 프로젝트에 연결합니다:

   | 패키지 매니저            | 설치 단계                                                                           |
   |----------------------------|---------------------------------------------------------------------------------------------|
   | [CocoaPods][2]           | `Podfile`에 `pod 'DatadogSessionReplay'`를 추가합니다.                                         |
   | [Swift Package Manager][3] | 앱 대상에 `DatadogSessionReplay` 라이브러리를 종속성으로 추가합니다.                      |
   | [Carthage][4]            | 앱 대상에 `DatadogSessionReplay.xcframework`를 종속성으로 추가합니다.                  |

3. 앱에서 세션 리플레이을 활성화합니다:

   {{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}
   import DatadogSessionReplay

   SessionReplay.enable(
       with: SessionReplay.Configuration(
           replaySampleRate: sampleRate,
           // 실험적 SwiftUI 레코딩 활성화
           featureFlags: [.swiftui: true]
       )
   )
   {{< /code-block >}}

[1]: /real_user_monitoring/ios/?tab=swift
[2]: https://cocoapods.org/
[3]: https://www.swift.org/package-manager/
[4]: https://github.com/Carthage/Carthage

{{% /tab %}}
{{% tab "Kotlin Multiplatform" %}}

모든 세션 리플레이 SDK 버전은 [Maven Central Repository][1]에서 확인할 수 있습니다.

Kotlin Multiplatform용 모바일 세션 리플레이를 설정합니다.

1. 보기 계측이 활성화된 상태에서 [Datadog Kotlin Multiplatform RUM SDK를 설정 및 초기화][2]했는지 확인하세요.

2. `DatadogSessionReplay` iOS 라이브러리를 링크 전용 종속성으로 추가합니다. 지침을 확인하려면 [가이드][3]를 참조하세요.

3. 다음과 같이 Datadog 세션 리플레이를 종속성으로 선언합니다.
  {{< code-block lang="kotlin" filename="build.gradle.kts" disable_copy="false" collapsible="true" >}}
    kotlin {
      sourceSets {
        commonMain.dependencies {
          implementation("com.datadoghq:dd-sdk-kotlin-multiplatform-rum:[datadog_version]")
          implementation("com.datadoghq:dd-sdk-kotlin-multiplatform-session-replay:[datadog_version]")
        }

        // in case you need Material support on Android
        androidMain.dependencies {
          implementation("com.datadoghq:dd-sdk-android-session-replay-material:[datadog_version]")
        }
      }
    }
   {{< /code-block >}}

4. 앱에서 세션 리플레이를 활성화합니다.

   {{< code-block lang="kotlin" filename="Application.kt" disable_copy="false" collapsible="true" >}}
   // Common source set에서
   val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
    .build()
   SessionReplay.enable(sessionReplayConfig)
   {{< /code-block >}}

5. Android에서 Material 지원이 필요한 경우 Android 소스 세트에서 제공되는 `SessionReplayConfiguration.Builder.addExtensionSupport(MaterialExtensionSupport())` 메서드를 호출합니다.

[1]: https://central.sonatype.com/artifact/com.datadoghq/dd-sdk-kotlin-multiplatform-session-replay/versions
[2]: /real_user_monitoring/kotlin_multiplatform/
[3]: /real_user_monitoring/kotlin_multiplatform/#add-native-dependencies-for-ios

{{% /tab %}}

{{% tab "React Native" %}}

<div class="alert alert-warning">세션 리플레이를 활성화하려면 <a href="https://github.com/DataDog/dd-sdk-reactnative">Datadog React Native SDK</a> 버전 <code>2.0.4</code> 이상을 사용해야 하며, 세션 리플레이 SDK 버전이 사용 중인 React Native SDK 버전과 일치하는지 확인해야 합니다.</div>

모든 세션 리플레이 SDK 버전은 [npmjs repository][1]에서 확인할 수 있습니다.

다음에 따라 React Native용 모바일 세션 리플레이를 설정합니다.

1. 보기 계측이 활성화된 상태에서 [Datadog React Native SDK를 설정 및 초기화][2]했는지 확인하세요.

2. `@datadog/mobile-react-native-session-replay` 종속성을 추가하고 [yarn][3] 또는 [npm][4]로 `@datadog/mobile-react-native` 버전과 일치하는지 확인합니다.

   ```shell
   yarn add @datadog/mobile-react-native-session-replay
   ```

   ```shell
   npm install @datadog/mobile-react-native-session-replay
   ```

3. Datadog React Native SDK 및 세션 리플레이 SDK  종속성을 가져오기한 후 SDK를 설정할 때 다음과 같이 해당 기능을 활성화할 수 있습니다.

   - `DatadogProvider` 구성 요소를 사용하는 경우:

     {{< code-block lang="typescript" filename="App.tsx" disable_copy="false" collapsible="true" >}}

     import { DatadogProvider, DatadogProviderConfiguration } from "@datadog/mobile-react-native";
    import {
      ImagePrivacyLevel,
      SessionReplay,
      TextAndInputPrivacyLevel,
      TouchPrivacyLevel,
    } from "@datadog/mobile-react-native-session-replay";

     const configuration = new DatadogProviderConfiguration(/* ... */)

     // 이 함수를 DatadogProvider에 onInitialization prop으로 추가합니다.
     const onSDKInitialized = async () => {
         await SessionReplay.enable({
            replaySampleRate: 100,
            textAndInputPrivacyLevel: TextAndInputPrivacyLevel.MASK_SENSITIVE_INPUTS, 
            imagePrivacyLevel: ImagePrivacyLevel.MASK_NONE, 
            touchPrivacyLevel: TouchPrivacyLevel.SHOW, 
         });
     };

     const App = () => {
       const navigationRef = React.useRef(null);
       return (
         <DatadogProvider configuration={configuration} onInitialization={onSDKInitialized}>
           {/* App */}
         </DatadogProvider>
       );
     };

     export default App;
    {{< /code-block >}}

   - `DdSdkReactNative.initialize` 메서드를 사용하는 경우:

     {{< code-block lang="typescript" filename="App.tsx" disable_copy="false" collapsible="true" >}}

     import { DdSdkReactNative, DdSdkReactNativeConfiguration } from "@datadog/mobile-react-native";
     import { SessionReplay } from "@datadog/mobile-react-native-session-replay";

     const configuration = new DdSdkReactNativeConfiguration(/* ... */)

     DdSdkReactNative.initialize(configuration)
       .then(() => SessionReplay.enable())
       .catch((error) => { /* handle error */ });

    {{< /code-block >}}

4. Datadog SDK를 초기화한 후 앱에서 세션 리플레이를 활성화합니다.
   {{< code-block lang="typescript" filename="App.tsx" disable_copy="false" collapsible="true" >}}

   import { SessionReplay } from "@datadog/mobile-react-native-session-replay";

   SessionReplay.enable();

   {{< /code-block >}}

5. 다음과 같이 세션 리플레이용 설정을 정의합니다.

   {{< code-block lang="typescript" filename="App.tsx" disable_copy="false" collapsible="true" >}}

      SessionReplay.enable({
        replaySampleRate: 100, // SDK가 캡처한 모든 세션에서 세션 리플레이를 사용할 수 있음
      });

   {{< /code-block >}}

   본 단계에서 세션 리플레이에 적용되는 다중 [개인정보 보호 수준][5]을 설정할 수도 있습니다.

6. (iOS만 해당) iOS 포드를 업데이트합니다.
   ```shell
      cd ios && pod install
   ```
7. iOS 및 Android 앱을 다시 빌드합니다.

[1]: https://www.npmjs.com/package/@datadog/mobile-react-native-session-replay?activeTab=versions\
[2]: /real_user_monitoring/mobile_and_tv_monitoring/setup/reactnative/
[3]: https://yarnpkg.com/package?q=datadog%20react%20native%20ses&name=%40datadog%2Fmobile-react-native-session-replay
[4]: https://www.npmjs.com/package/@datadog/mobile-react-native-session-replay?activeTab=versions
[5]: /real_user_monitoring/session_replay/mobile/privacy_options/?tab=reactnative


{{% /tab %}}

{{< /tabs >}}

## 웹 보기 계측

iOS 또는 Android의 [웹 보기 및 기본 보기][1] 모두에서 전체 사용자 여정을 녹화한 후 단일 세션 리플레이에서 시청할 수 있습니다.

세션 리플레이는 브라우저 SDK로 녹화되며, 모바일 SDK는 웹뷰 레코딩을 일괄 처리 및 업로드합니다.

{{< tabs >}}
{{% tab "Android" %}}

다음에 따라 Android용 통합 웹 및 기본 세션 리플레이 보기를 계측합니다.

1. Android SDK 버전 [`2.8.0`][2] 이상을 사용하고 있는지 확인합니다.
2. 모바일 애플리케이션에서 [웹뷰 추적][3]을 활성화합니다.
3. 웹 애플리케이션에서 [세션 리플레이][4]를 활성화합니다.
4. 모바일 애플리케이션에서 세션 리플레이를 활성화합니다(위의 설정 지침 참조).

[1]: /real_user_monitoring/mobile_and_tv_monitoring/android/web_view_tracking/
[2]: https://github.com/DataDog/dd-sdk-android/releases/tag/2.8.0
[3]: /real_user_monitoring/mobile_and_tv_monitoring/android/web_view_tracking/?tab=android#instrument-your-web-views
[4]: /real_user_monitoring/session_replay/browser/#setup

{{% /tab %}}
{{% tab "iOS" %}}

다음에 따라 iOS용 통합 웹 및 기본 세션 리플레이 보기를 계측합니다.

1. iOS SDK 버전 [`2.13.0`][1] 이상을 사용하고 있는지 확인합니다.
2. 모바일 애플리케이션에서 [웹뷰 추적][2]을 활성화합니다.
3. 웹 애플리케이션에서 [세션 리플레이][3]를 활성화합니다.
4. 모바일 애플리케이션에서 세션 리플레이]을 활성화합니다(위의 설정 지침 참조).

[1]: https://github.com/DataDog/dd-sdk-ios/releases/tag/2.13.0
[2]: /real_user_monitoring/mobile_and_tv_monitoring/ios/web_view_tracking/?tab=ios#instrument-your-web-views
[3]: /real_user_monitoring/session_replay/browser/#setup

{{% /tab %}}
{{% tab "Kotlin Multiplatform" %}}

다음에 따라 Kotlin Multiplatform용 통합 웹 및 기본 세션 리플레이 보기를 계측합니다.

1. 모바일 애플리케이션에서 [웹뷰 추적][1]을 활성화합니다.
2. 웹 애플리케이션에서 [세션 리플레이][2]를 활성화합니다.
3. 모바일 애플리케이션에서 세션 리플레이]을 활성화합니다(위의 설정 지침 참조).

[1]: /real_user_monitoring/mobile_and_tv_monitoring/kotlin_multiplatform/web_view_tracking/?tab=kotlinmultiplatform#instrument-your-web-views
[2]: /real_user_monitoring/session_replay/browser/#setup

{{% /tab %}}
{{% tab "React Native" %}}

다음에 따라 React Native용 통합 웹 및 기본 세션 리플레이 보기를 계측합니다.

1. React Native 애플리케이션에서 [웹뷰 추적][1]을 활성화합니다.
2. 웹 애플리케이션에서 [세션 리플레이][2]를 활성화합니다.
3. 모바일 애플리케이션에서 세션 리플레이]을 활성화합니다(위의 설정 지침 참조).

**참고**: 본 기능은 Android용 React Native [New Architecture][3]와 호환되지 않습니다.

[1]: /real_user_monitoring/mobile_and_tv_monitoring/web_view_tracking/?tab=reactnative#instrument-your-web-views
[2]: /real_user_monitoring/session_replay/browser/#setup

{{% /tab %}}
{{< /tabs >}}

## 추가 설정
### 녹화된 세션의 샘플 속도가 표시되도록 설정

샘플 속도는 세션 리플레이 설정의 옵션 파라미터입니다. 해당 값은 0.0에서 100.0 사이의 숫자여야 하며, 0은 리플레이가 녹화되지 않음을 뜻하고, 100은 모든 RUM 세션에 리플레이가 포함됨을 나타냅니다. 설정에서 샘플 속도를 지정하지 않으면 기본값인 100이 적용됩니다.

이 샘플 속도는 RUM 샘플 속도에 추가로 적용됩니다. 예를 들어 RUM이 80%의 샘플 속도를 사용하고 세션 리플레이가 20%의 샘플 속도를 사용하는 경우, 모든 사용자 세션 중 80%가 RUM에 포함되고 해당 세션 내에서는 단 20%만 리플레이가 있다는 의미입니다.

{{< tabs >}}
{{% tab "Android" %}}

{{< code-block lang="kotlin" filename="Application.kt" disable_copy="false" collapsible="true" >}}
val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
  ...
  .build()
{{< /code-block >}}

{{% /tab %}}
{{% tab "iOS" %}}

{{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}
var sessionReplayConfig = SessionReplay.Configuration(
    replaySampleRate: sampleRate
)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Kotlin Multiplatform" %}}

{{< code-block lang="kotlin" filename="Application.kt" disable_copy="false" collapsible="true" >}}
val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
  ...
  .build()
{{< /code-block >}}

{{% /tab %}}
{{% tab "React Native" %}}
{{< code-block lang="typescript" filename="App.tsx" disable_copy="false" collapsible="true" >}}
import { SessionReplay } from "@datadog/mobile-react-native-session-replay";

SessionReplay.enable({
  replaySampleRate: [sampleRate]
});
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### 수동으로 레코딩 시작 또는 중지

기본적으로 세션 리플레이는 자동으로 레코딩을 시작합니다. 그러나 애플리케이션의 특정 지점에서 수동으로 레코딩을 시작하려면 아래와 같이 옵션 `startRecordingImmediately` 파라미터를 사용하고 나중에 `SessionReplay.startRecording()`를 호출합니다. `SessionReplay.stopRecording()`로 언제든 레코딩을 중지할 수 있습니다.

{{< tabs >}}
{{% tab "Android" %}}

{{< code-block lang="kotlin" filename="Application.kt" disable_copy="false" collapsible="true" >}}
    val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
        .startRecordingImmediately(false)
        .build()
    // 여기서 작업을 수행하세요.
    SessionReplay.startRecording()
    SessionReplay.stopRecording()
{{< /code-block >}}

{{% /tab %}}

{{% tab "iOS" %}}

{{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}
    let sessionReplayConfig = SessionReplay.Configuration(
        replaySampleRate: sampleRate,
        startRecordingImmediately: false
    )
    // 여기서 작업을 수행하세요.
    SessionReplay.startRecording()
    SessionReplay.stopRecording()
{{< /code-block >}}

{{% /tab %}}

{{% tab "Kotlin Multiplatform" %}}


{{< code-block lang="kotlin" filename="Application.kt" disable_copy="false" collapsible="true" >}}
    val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
        .startRecordingImmediately(false)
        .build()
    // 여기서 작업을 수행하세요.
    SessionReplay.startRecording()
    SessionReplay.stopRecording()
{{< /code-block >}}
{{% /tab %}}

{{% tab "React Native" %}}
{{< code-block lang="typescript" filename="App.tsx" disable_copy="false" collapsible="true" >}}
import { SessionReplay } from "@datadog/mobile-react-native-session-replay";

SessionReplay.enable({
  replaySampleRate: sampleRate,
  startRecordingImmediately: false
});
// 여기서 작업을 수행하세요.
SessionReplay.startRecording();
SessionReplay.stopRecording();
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### 세션 리플레이 데이터가 전송되고 있는지 확인

앱에서 세션 리플레이 데이터를 보내고 있는지 확인하기 위해 Datadog SDK에서 디버그 옵션을 활성화할 수 있습니다.

{{< tabs >}}
{{% tab "Android" %}}

{{< code-block lang="kotlin" filename="Application.kt" disable_copy="false" collapsible="true" >}}
Datadog.setVerbosity(Log.DEBUG)
{{< /code-block >}}

{{% /tab %}}
{{% tab "iOS" %}}

{{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}
Datadog.verbosityLevel = .debug
{{< /code-block >}}

문제가 없다면 앱을 실행한 후 약 30초 후에 Xcode 디버그 콘솔에서 다음과 같은 로그가 나타납니다:

{{< code-block lang="bash" filename="Xcode console" disable_copy="true" >}}

[DATADOG SDK] 🐶 → 10:21:29.812 ⏳ (session-replay) Uploading batch...
[DATADOG SDK] 🐶 → 10:21:30.442    → (session-replay) accepted, won't be retransmitted: [response code: 202 (accepted), request ID: BD445EA-...-8AFCD3F3D16]

{{< /code-block >}}

{{% /tab %}}
{{% tab "Kotlin Multiplatform" %}}

{{< code-block lang="kotlin" filename="Application.kt" disable_copy="false" collapsible="true" >}}
Datadog.setVerbosity(SdkLogVerbosity.DEBUG)
{{< /code-block >}}

{{% /tab %}}
{{% tab "React Native" %}}

SDK를 초기화할 때 상세도를 `DEBUG`로 설정합니다.

{{< code-block lang="typescript" filename="App.tsx" disable_copy="false" collapsible="true" >}}

import { SdkVerbosity } from "@datadog/mobile-react-native";

...

config.verbosity = SdkVerbosity.DEBUG;

{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### 개인정보 보호 옵션

[개인정보 보호 옵션][2]을 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/mobile_and_tv_monitoring/ios/web_view_tracking
[2]: /real_user_monitoring/session_replay/mobile/privacy_options
[3]: https://reactnative.dev/architecture/landing-page
