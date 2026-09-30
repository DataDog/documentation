---
further_reading:
- link: /real_user_monitoring/explorer
  tag: 설명서
  text: 탐색기에서 RUM 데이터 시각화
- link: /real_user_monitoring/guide/mobile-sdk-deprecation-policy
  tag: 설명서
  text: Datadog Mobile SDK 지원 중단 정책
title: RUM 모바일 SDK 업그레이드
---

## 개요

본 지침에 따라 Mobile RUM, 로그, Trace SDK 주요 버전 간에 마이그레이션하세요. SDK 문서에서 해당 기능 및 성능에 관한 자세한 내용을 참조하세요.

## v1에서 v2로
{{< tabs >}}
{{% tab "Android" %}}

v1에서 v2로의 마이그레이션은 Monolith SDK에서 모듈식 아키텍처로 마이그레이션하는 것을 뜻합니다. RUM, 트레이스, 로그, Session Replay 등에는 각각 개별 모듈이 있어 필요한 요소만 애플리케이션에 통합할 수 있습니다.

SDK v2는 iOS SDK, Android SDK, 기타 Datadog 제품 간에 통합된 API 레이아웃과 이름 정렬 서비스를 제공합니다.

SDK v2는 Android 및 iOS 애플리케이션에서 [모바일 Session Replay][1]를 사용할 수 있도록 지원합니다.

[1]: /ko/real_user_monitoring/session_replay/mobile/

{{% /tab %}}
{{% tab "iOS" %}}

v1에서 v2로의 마이그레이션은 Monolith SDK에서 모듈식 아키텍처로 마이그레이션하는 것을 뜻합니다. RUM, 트레이스, 로그, Session Replay(세션 리플레이) 등에는 각각 개별 모듈이 있어 필요한 요소만 애플리케이션에 통합할 수 있습니다.

소프트웨어 개발 키트(SDK) v2는 iOS 소프트웨어 개발 키트(SDK), Android 소프트웨어 개발 키트(SDK), 기타 Datadog 제품 간에 통합된 API 레이아웃과 명명 규칙을 제공해 드립니다.

소프트웨어 개발 키트(SDK) v2는 Android 및 iOS 애플리케이션에서 [모바일 Session Replay(세션 리플레이)][1]을 사용할 수 있도록 지원합니다.

[1]: /ko/real_user_monitoring/session_replay/mobile/

{{% /tab %}}
{{% tab "React Native" %}}

v1에서 v2로 마이그레이션하면 성능이 향상됩니다.

{{% /tab %}}
{{% tab "Flutter" %}}

v1에서 v2로 마이그레이션하면 성능이 향상되며 v2 네이티브 SDK가 제공하는 추가 기능을 사용할 수 있습니다.

{{% /tab %}}
{{< /tabs >}}
### 모듈
{{< tabs >}}
{{% tab "Android" %}}

아티팩트는 v2에서 모듈화되었습니다. 다음 아티팩트를 사용하세요.

* RUM: `com.datadoghq:dd-sdk-android-rum:x.x.x`
* 로그: `com.datadoghq:dd-sdk-android-logs:x.x.x`
* 트레이스: `com.datadoghq:dd-sdk-android-trace:x.x.x`
* Session Replay: `com.datadoghq:dd-sdk-android-session-replay:x.x.x`
* WebView Tracking: `com.datadoghq:dd-sdk-android-webview:x.x.x`
* OkHttp 계측: `com.datadoghq:dd-sdk-android-okhttp:x.x.x`

**참고**: NDK Crash Reporting 및 WebView Tracking을 사용하는 경우, 이벤트를 RUM 및 로그에 각각 보고하려면 RUM 및 로그 아티팩트를 추가해야 합니다.

이 아티팩트는 더 이상 존재하지 않으므로, Gradle 빌드 스크립트에서 `com.datadoghq:dd-sdk-android` 아티팩트의 참조를 삭제해야 합니다.

**참고**: 다른 모든 아티팩트의 Maven 좌표는 동일하게 유지됩니다.

<div class="alert alert-danger">v2는 Android API 19(KitKat)를 지원하지 않습니다. 지원하는 최소 SDK는 API 21(Lollipop)입니다. Kotlin 1.7이 필요합니다. SDK 자체는 Kotlin 1.8로 컴파일되므로, Kotlin 1.6 버전 이하 컴파일러는 SDK 클래스 메타데이터를 읽을 수 없습니다.</div>

다음과 같은 오류가 발생하는 경우

```
A failure occurred while executing com.android.build.gradle.internal.tasks.CheckDuplicatesRunnable
Duplicate class kotlin.collections.jdk8.CollectionsJDK8Kt found in modules kotlin-stdlib-1.8.10 (org.jetbrains.kotlin:kotlin-stdlib:1.8.10) and kotlin-stdlib-jdk8-1.7.20 (org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.7.20)
```

빌드 스크립트에 다음 규칙을 추가하세요. 자세한 내용은 관련 [스택 오버플로 문제][2]를 참조하세요.

```kotlin
dependencies {
    constraints {
        implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.8.10") {
            because("kotlin-stdlib-jdk7 is now a part of kotlin-stdlib")
        }
        implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.8.10") {
            because("kotlin-stdlib-jdk8 is now a part of kotlin-stdlib")
        }
    }
}
```

SDK 설정 방법 예시는 [Android 샘플 애플리케이션][3]을 참조하세요.

[2]: https://stackoverflow.com/a/75298544
[3]: https://github.com/DataDog/dd-sdk-android/tree/develop/sample

{{% /tab %}}
{{% tab "iOS" %}}

라이브러리는 v2에서 모듈화되었습니다. 다음 라이브러리를 사용하세요.

- `DatadogCore`
- `DatadogLogs`
- `DatadogTrace`
- `DatadogSessionReplay`
- `DatadogRUM`
- `DatadogWebViewTracking`

기존 `DatadogCrashReporting` 및 `DatadogObjc`에 추가로 제공됩니다.

<details>
  <summary>SPM (Recommended)</summary>

  ```swift
let package = Package(
    ...
    dependencies: [
        .package(url: "https://github.com/DataDog/dd-sdk-ios", from: "2.0.0")
    ],
    targets: [
        .target(
            ...
            dependencies: [
                .product(name: "DatadogCore", package: "dd-sdk-ios"),
                .product(name: "DatadogLogs", package: "dd-sdk-ios"),
                .product(name: "DatadogTrace", package: "dd-sdk-ios"),
                .product(name: "DatadogSessionReplay", package: "dd-sdk-ios"),
                .product(name: "DatadogRUM", package: "dd-sdk-ios"),
                .product(name: "DatadogCrashReporting", package: "dd-sdk-ios"),
                .product(name: "DatadogWebViewTracking", package: "dd-sdk-ios"),
            ]
        ),
    ]
)
  ```

</details>

<details>
  <summary>CocoaPods</summary>

  ```ruby
  pod 'DatadogCore'
  pod 'DatadogLogs'
  pod 'DatadogTrace'
  pod 'DatadogSessionReplay'
  pod 'DatadogRUM'
  pod 'DatadogCrashReporting'
  pod 'DatadogWebViewTracking'
  pod 'DatadogObjc'
  ```
</details>

<details>
  <summary>Carthage</summary>

  The `Cartfile` stays the same:
  ```
  github "DataDog/dd-sdk-ios"
  ```

  In Xcode, you **must** link the following frameworks:
  ```
  DatadogInternal.xcframework
  DatadogCore.xcframework
  ```

  Then you can select the modules you want to use:
  ```
  DatadogLogs.xcframework
  DatadogTrace.xcframework
  DatadogSessionReplay.xcframework
  DatadogRUM.xcframework
  DatadogCrashReporting.xcframework + CrashReporter.xcframework
  DatadogWebViewTracking.xcframework
  DatadogObjc.xcframework
  ```
</details>

**참고**: Crash Reporting 및 WebView Tracking을 사용하는 경우, 이벤트를 RUM 및 로그에 각각 보고하려면 RUM 및 로그 모듈을 추가해야 합니다.

{{% /tab %}}

{{% tab "React Native" %}}

package.json에서 `@datadog/mobile-react-native`을 업데이트합니다.

```json
"@datadog/mobile-react-native": "2.0.0"
```

iOS 포드를 업데이트합니다.

```bash
(cd ios && bundle exec pod update)
```

React Native `0.67` 버전 이상을 사용하는 경우, Java 버전 17을 사용합니다. React Native 버전이 `0.67` 이하인 경우 Java 버전 11을 사용합니다. Java 버전을 확인하려면 터미널에서 다음을 실행하세요.

```bash
java --version
```

### React Native < 0.73인 경우

`android/build.gradle` 파일에서 `kotlinVersion`을 지정하여 Kotlin 종속성 간의 충돌을 방지합니다.

```groovy
buildscript {
    ext {
        // targetSdkVersion = ...
        kotlinVersion = "1.8.21"
    }
}
```

### React Native < 0.68인 경우

`android/build.gradle` 파일에서 `kotlinVersion`을 지정하여 Kotlin 종속성 간의 충돌을 방지합니다.

```groovy
buildscript {
    ext {
        // targetSdkVersion = ...
        kotlinVersion = "1.8.21"
    }
}
```

`android/build.gradle`에서 `5.0` 이하 `com.android.tools.build:gradle` 버전을 사용하는 경우, `android/gradle.properties` 파일에 다음을 추가합니다.

```properties
android.jetifier.ignorelist=dd-sdk-android-core
```

### 트러블슈팅

#### Android 빌드가`Unable to make field private final java.lang.String java.io.File.path accessible` 오류로 실패합니다. 

다음과 같은 오류가 발생하여 Android 빌드가 실패하는 경우

```
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:processReleaseMainManifest'.
> Unable to make field private final java.lang.String java.io.File.path accessible: module java.base does not "opens java.io" to unnamed module @1bbf7f0e
```

React Native 버전과 호환되지 않는 Java 17을 사용하고 있습니다. 본 문제를 해결하려면 Java 11로 전환하세요.

#### Android 빌드가 `Unsupported class file major version 61` 오류로 실패합니다.

다음과 같은 오류가 발생하여 Android 빌드가 실패하는 경우

```
FAILURE: Build failed with an exception.

* What went wrong:
Could not determine the dependencies of task ':app:lintVitalRelease'.
> Could not resolve all artifacts for configuration ':app:debugRuntimeClasspath'.
   > Failed to transform dd-sdk-android-core-2.0.0.aar (com.datadoghq:dd-sdk-android-core:2.0.0) to match attributes {artifactType=android-manifest, org.gradle.category=library, org.gradle.dependency.bundling=external, org.gradle.libraryelements=aar, org.gradle.status=release, org.gradle.usage=java-runtime}.
      > Execution failed for JetifyTransform: /Users/me/.gradle/caches/modules-2/files-2.1/com.datadoghq/dd-sdk-android-core/2.0.0/a97f8a1537da1de99a86adf32c307198b477971f/dd-sdk-android-core-2.0.0.aar.
         > Failed to transform '/Users/me/.gradle/caches/modules-2/files-2.1/com.datadoghq/dd-sdk-android-core/2.0.0/a97f8a1537da1de99a86adf32c307198b477971f/dd-sdk-android-core-2.0.0.aar' using Jetifier. Reason: IllegalArgumentException, message: Unsupported class file major version 61. (Run with --stacktrace for more details.)
```

Android Gradle Plugin `5.0` 미만 버전을 사용하고 있습니다. 본 문제를 해결하려면 `android/gradle.properties` 파일에 다음을 추가하세요.

```properties
android.jetifier.ignorelist=dd-sdk-android-core
```

#### Android 빌드가 `Duplicate class kotlin.collections.jdk8.*` 오류로 실패합니다.

다음과 같은 오류가 발생하여 Android 빌드가 실패하는 경우

```
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:checkReleaseDuplicateClasses'.
> A failure occurred while executing com.android.build.gradle.internal.tasks.CheckDuplicatesRunnable
   > Duplicate class kotlin.collections.jdk8.CollectionsJDK8Kt found in modules jetified-kotlin-stdlib-1.8.10 (org.jetbrains.kotlin:kotlin-stdlib:1.8.10) and jetified-kotlin-stdlib-jdk8-1.7.20 (org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.7.20)
     Duplicate class kotlin.internal.jdk7.JDK7PlatformImplementations found in modules jetified-kotlin-stdlib-1.8.10 (org.jetbrains.kotlin:kotlin-stdlib:1.8.10) and jetified-kotlin-stdlib-jdk7-1.7.20 (org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.7.20)
```

Kotlin 종속성 간의 충돌을 방지하려면 프로젝트에 Kotlin 버전을 설정해야 합니다. `android/build.gradle` 파일에 `kotlinVersion`을 지정합니다.

```groovy
buildscript {
    ext {
        // targetSdkVersion = ...
        kotlinVersion = "1.8.21"
    }
}
```

또는 `android/app/build.gradle` 파일의 빌드 스크립트에 다음 규칙을 추가할 수 있습니다.

```groovy
dependencies {
    constraints {
        implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.8.10") {
            because("kotlin-stdlib-jdk7 is now a part of kotlin-stdlib")
        }
        implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.8.10") {
            because("kotlin-stdlib-jdk8 is now a part of kotlin-stdlib")
        }
    }
}
```

{{% /tab %}}
{{% tab "Flutter" %}}

pubspec.yaml에서 `datadog_flutter_plugin`을 업데이트합니다.

```yaml
dependencies:
  'datadog_flutter_plugin: ^2.0.0
```

## 트러블슈팅

### 중복 인터페이스(iOS)

`datadog_flutter_plugin` v2.0으로 업그레이드한 후 iOS를 빌드하는 동안 다음 오류가 표시되는 경우

```
Semantic Issue (Xcode): Duplicate interface definition for class 'DatadogSdkPlugin'
/Users/exampleuser/Projects/test_app/build/ios/Debug-iphonesimulator/datadog_flutter_plugin/datadog_flutter_plugin.framework/Headers/DatadogSdkPlugin.h:6:0
```

`flutter clean && flutter pub get`을 실행하고 다시 빌드합니다. 보통 이 방법으로 문제를 해결할 수 있습니다.

### 중복 클래스(Android)

`datadog_flutter_plugin` v2.0으로 업그레이드한 후 Android를 빌드하는 동안 다음 오류가 표시되는 경우

```
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:checkDebugDuplicateClasses'.
> A failure occurred while executing com.android.build.gradle.internal.tasks.CheckDuplicatesRunnable
```

`build.gradle` 파일에서 Kotlin 버전을 최소 1.8 이상으로 업데이트했는지 확인하세요.

{{% /tab %}}

{{< /tabs >}}

### SDK 초기화
{{< tabs >}}
{{% tab "Android" %}}
다양한 제품이 독립 모듈로 추출되어, SDK 구성은 모듈별로 구성됩니다.

`com.datadog.android.core.configuration.Configuration.Builder` 클래스에 다음과 같은 변경 사항이 있습니다.

* 클라이언트 토큰, 환경 이름, 변형 이름(기본값: 빈 문자열), 서비스 이름(기본값: 매니페스트에서 가져온 애플리케이션 ID)을 생성자에서 제공해야 합니다.
* `com.datadog.android.core.configuration.Credentials` 클래스가 제거됩니다.
* `logsEnabled`, `tracesEnabled`, `rumEnabled`은 개별 제품 구성을 위해 생성자에서 삭제되었습니다(하단 참조).
* `crashReportsEnabled` 생성자 인수가 삭제됩니다. `Configuration.Builder.setCrashReportsEnabled` 메서드로 JVM 크래시 보고를 활성화 또는 비활성화할 수 있습니다. JVM 크래시 보고는 기본적으로 활성화되어 있습니다.
* 개별 제품 구성을 위해 RUM, 로그, 트레이스 제품 구성 메서드가 `Configuration.Builder`에서 삭제되었습니다(하단 참조).

`Datadog.initialize` 메서드의 경우 인자 목록에서 `Credentials` 클래스가 제거되었습니다.

`com.datadog.android.plugin` 패키지와 모든 관련 클래스/메서드가 삭제됩니다.

### 로그

로그 제품과 관련된 모든 클래스는 `com.datadog.android.log` 패키지에 엄밀하게 포함됩니다.

로그 제품을 사용하려면 다음 아티팩트를 가져옵니다.

```kotlin
implementation("com.datadoghq:dd-sdk-android-logs:x.x.x")
```

다음 스니펫으로 로그 제품을 활성화할 수 있습니다.

```kotlin
val logsConfig = LogsConfiguration.Builder()
    ...
    .build()

Logs.enable(logsConfig)

val logger = Logger.Builder()
    ...
    .build()
```

API 변경 사항:

|`1.x`|`2.0`|
|---|---|
|`com.datadog.android.core.configuration.Configuration.Builder.setLogEventMapper`|`com.datadog.android.log.LogsConfiguration.Builder.setEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.useCustomLogsEndpoint`|`com.datadog.android.log.LogsConfiguration.Builder.useCustomEndpoint`|
|`com.datadog.android.log.Logger.Builder.setLoggerName`|`com.datadog.android.log.Logger.Builder.setName`|
|`com.datadog.android.log.Logger.Builder.setSampleRate`|`com.datadog.android.log.Logger.Builder.setRemoteSampleRate`|
|`com.datadog.android.log.Logger.Builder.setDatadogLogsEnabled`|이 메서드는 삭제되었습니다. 대신 Datadog으로 로그 전송을 비활성화하려면 `com.datadog.android.log.Logger.Builder.setRemoteSampleRate(0f)`을 사용합니다.|
|`com.datadog.android.log.Logger.Builder.setServiceName`|`com.datadog.android.log.Logger.Builder.setService`|
|`com.datadog.android.log.Logger.Builder.setDatadogLogsMinPriority`|`com.datadog.android.log.Logger.Builder.setRemoteLogThreshold`|

### 트레이스

트레이스 제품과 관련된 모든 클래스는 `com.datadog.android.trace` 패키지에 엄밀하게 포함됩니다(즉, 이전에 `com.datadog.android.tracing`에 있던 모든 클래스가 이동됨).

트레이스 제품을 사용하려면 다음 아티팩트를 가져옵니다.

```kotlin
implementation("com.datadoghq:dd-sdk-android-trace:x.x.x")
```

다음 스니펫으로 트레이스 제품을 활성화할 수 있습니다.

```kotlin
val traceConfig = TraceConfiguration.Builder()
    ...
    .build()

Trace.enable(traceConfig)

val tracer = AndroidTracer.Builder()
    ...
    .build()

GlobalTracer.registerIfAbsent(tracer)
```

API 변경 사항:

|`1.x`|`2.0`|
|---|---|
|`com.datadog.android.core.configuration.Configuration.Builder.setSpanEventMapper`|`com.datadog.android.trace.TraceConfiguration.Builder.setEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.useCustomTracesEndpoint`|`com.datadog.android.trace.TraceConfiguration.Builder.useCustomEndpoint`|
|`com.datadog.android.tracing.AndroidTracer.Builder.setSamplingRate`|`com.datadog.android.trace.AndroidTracer.Builder.setSampleRate`|
|`com.datadog.android.tracing.AndroidTracer.Builder.setServiceName`|`com.datadog.android.trace.AndroidTracer.Builder.setService`|

### RUM

RUM 제품과 관련된 모든 클래스는 `com.datadog.android.rum` 패키지에 엄밀하게 포함됩니다.

RUM 제품을 사용하려면 다음 아티팩트를 가져옵니다.

```kotlin
implementation("com.datadoghq:dd-sdk-android-rum:x.x.x")
```

다음 스니펫으로 RUM 제품을 활성화할 수 있습니다.

```kotlin
val rumConfig = RumConfiguration.Builder(rumApplicationId)
    ...
    .build()

Rum.enable(rumConfig)
```

API 변경 사항:

|`1.x`|`2.0`|
|---|---|
|`com.datadog.android.core.configuration.Configuration.Builder.setRumViewEventMapper`|`com.datadog.android.rum.RumConfiguration.Builder.setViewEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.setRumResourceEventMapper`|`com.datadog.android.rum.RumConfiguration.Builder.setResourceEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.setRumActionEventMapper`|`com.datadog.android.rum.RumConfiguration.Builder.setActionEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.setRumErrorEventMapper`|`com.datadog.android.rum.RumConfiguration.Builder.setErrorEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.setRumLongTaskEventMapper`|`com.datadog.android.rum.RumConfiguration.Builder.setLongTaskEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.useCustomRumEndpoint`|`com.datadog.android.rum.RumConfiguration.Builder.useCustomEndpoint`|
|`com.datadog.android.event.ViewEventMapper`|`com.datadog.android.rum.event.ViewEventMapper`|
|`com.datadog.android.core.configuration.VitalsUpdateFrequency`|`com.datadog.android.rum.configuration.VitalsUpdateFrequency`|
|`com.datadog.android.core.configuration.Configuration.Builder.trackInteractions`|`com.datadog.android.rum.RumConfiguration.Builder.trackUserInteractions`|
|`com.datadog.android.core.configuration.Configuration.Builder.disableInteractionTracking`|`com.datadog.android.rum.RumConfiguration.Builder.disableUserInteractionTracking`|
|`com.datadog.android.core.configuration.Configuration.Builder.sampleRumSessions`|`com.datadog.android.rum.RumConfiguration.Builder.setSessionSampleRate`|
|`com.datadog.android.core.configuration.Configuration.Builder.sampleTelemetry`|`com.datadog.android.rum.RumConfiguration.Builder.setTelemetrySampleRate`|
|`com.datadog.android.rum.RumMonitor.Builder`|이 클래스는 제거되었습니다. RUM 모니터는 `Rum.enable` 호출 중에 생성 및 등록됩니다.|
|`com.datadog.android.rum.RumMonitor.Builder.sampleRumSessions`|`com.datadog.android.rum.RumConfiguration.Builder.setSessionSampleRate`|
|`com.datadog.android.rum.RumMonitor.Builder.setSessionListener`|`com.datadog.android.rum.RumConfiguration.Builder.setSessionListener`|
|`com.datadog.android.rum.RumMonitor.addUserAction`|`com.datadog.android.rum.RumMonitor.addAction`|
|`com.datadog.android.rum.RumMonitor.startUserAction`|`com.datadog.android.rum.RumMonitor.startAction`|
|`com.datadog.android.rum.RumMonitor.stopUserAction`|`com.datadog.android.rum.RumMonitor.stopAction`|
|`com.datadog.android.rum.GlobalRum.registerIfAbsent`|이 메서드는 제거되었습니다. RUM 모니터는 `Rum.enable` 호출 중에 생성 및 등록됩니다.|
|`com.datadog.android.rum.GlobalRum`|`com.datadog.android.rum.GlobalRumMonitor`|
|`com.datadog.android.rum.GlobalRum.addAttribute`|`com.datadog.android.rum.RumMonitor.addAttribute`|
|`com.datadog.android.rum.GlobalRum.removeAttribute`|`com.datadog.android.rum.RumMonitor.removeAttribute`|

### NDK Crash Reporting

아티팩트 이름은 이전과 동일하게 유지됩니다( `com.datadoghq:dd-sdk-android-ndk:x.x.x`).

다음 스니펫으로 NDK Crash Reporting을 활성화할 수 있습니다.

```kotlin
NdkCrashReports.enable()
```

이 구성은 `com.datadog.android.core.configuration.Configuration.Builder.addPlugin` 호출을 대체합니다.

**참고**: RUM 및 로그 제품을 사용하도록 설정해야 RUM 및 로그 각각에서 NDK 크래시 보고서를 받을 수 있습니다.

### WebView Tracking

아티팩트 이름은 이전과 동일하게 유지됩니다(`com.datadoghq:dd-sdk-android-webview:x.x.x`).

다음 스니펫으로 WebView Tracking을 활성화할 수 있습니다.

```kotlin
WebViewTracking.enable(webView, allowedHosts)
```

**참고**: RUM 및 로그 제품을 사용하도록 설정해야 RUM 및 로그 각각에서 WebView에서 수신하는 이벤트를 받아볼 수 있습니다.

API 변경 사항:

|`1.x`|`2.0`|
|---|---|
|`com.datadog.android.webview.DatadogEventBridge`|이 메서드는 `internal` 클래스가 되었습니다. 대신 `WebViewTracking`을 사용하세요.|
|`com.datadog.android.rum.webview.RumWebChromeClient`|이 클래스는 제거되었습니다. 대신 `WebViewTracking`을 사용하세요.|
|`com.datadog.android.rum.webview.RumWebViewClient`|이 클래스는 제거되었습니다. 대신 `WebViewTracking`을 사용하세요.|

### OkHttp 추적

OkHttp Tracking을 사용하려면 다음 아티팩트를 가져옵니다.

```kotlin
implementation("com.datadoghq:dd-sdk-android-okhttp:x.x.x")
```

OkHttp 계측은 OkHttp 클라이언트 이후에 Datadog SDK의 초기화를 지원하므로 `com.datadog.android.okhttp.DatadogEventListener`, `com.datadog.android.okhttp.DatadogInterceptor`, `com.datadog.android.okhttp.trace.TracingInterceptor`를 Datadog SDK 초기화 전에 생성할 수 있습니다. Datadog SDK가 초기화되면 OkHttp 계측이 Datadog으로 이벤트를 보고하기 시작합니다.

`com.datadog.android.okhttp.DatadogInterceptor` 및 `com.datadog.android.okhttp.trace.TracingInterceptor` 모두 원격 구성 시스템과의 통합으로 샘플링을 동적 제어할 수 있습니다.

샘플링을 동적 제어하려면, `com.datadog.android.okhttp.DatadogInterceptor`/`com.datadog.android.okhttp.trace.TracingInterceptor` 생성자에서 `com.datadog.android.core.sampling.Sampler` 인터페이스 자체 구현을 제공합니다. 샘플링 결정을 내리기 위해 각 요청마다 쿼리됩니다.

### `dd-sdk-android-ktx` 모듈 제거

사용하는 Datadog SDK 라이브러리의 세분화 수준을 개선하기 위해 `dd-sdk-android-ktx` 모듈이 제거되었습니다. 이 코드는 다른 모듈들에 분산되어 RUM 및 트레이스 기능 모두에 대한 확장 메서드를 제공합니다.

| `1.x`                                                                                     | '2.0'                                                                                       | 모듈 이름                       |
|-------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|-----------------------------------|
| `com.datadog.android.ktx.coroutine#kotlinx.coroutines.CoroutineScope.launchTraced`        | `com.datadog.android.trace.coroutines#kotlinx.coroutines.CoroutineScope.launchTraced`       | `dd-sdk-android-trace-coroutines` |
| `com.datadog.android.ktx.coroutine#runBlockingTraced`                                     | `com.datadog.android.trace.coroutines#runBlockingTraced`                                    | `dd-sdk-android-trace-coroutines` |
| `com.datadog.android.ktx.coroutine#kotlinx.coroutines.CoroutineScope.asyncTraced`         | `com.datadog.android.trace.coroutines#kotlinx.coroutines.CoroutineScope.asyncTraced`        | `dd-sdk-android-trace-coroutines` |
| `com.datadog.android.ktx.coroutine#kotlinx.coroutines.Deferred<T>.awaitTraced`            | `com.datadog.android.trace.coroutines#kotlinx.coroutines.Deferred<T>.awaitTraced`           | `dd-sdk-android-trace-coroutines` |
| `com.datadog.android.ktx.coroutine#withContextTraced`                                     | `com.datadog.android.trace.coroutines#withContextTraced`                                    | `dd-sdk-android-trace-coroutines` |
| `com.datadog.android.ktx.coroutine.CoroutineScopeSpan`                                    | `com.datadog.android.trace.coroutines.CoroutineScopeSpan`                                   | `dd-sdk-android-trace-coroutines` |
| `com.datadog.android.ktx.sqlite#android.database.sqlite.SQLiteDatabase.transactionTraced` | `com.datadog.android.trace.sqlite#android.database.sqlite.SQLiteDatabase.transactionTraced` | `dd-sdk-android-trace`            |
| `com.datadog.android.ktx.tracing#io.opentracing.Span.setError`                            | `com.datadog.android.trace#io.opentracing.Span.setError`                                    | `dd-sdk-android-trace`            |
| `com.datadog.android.ktx.tracing#withinSpan`                                              | `com.datadog.android.trace#withinSpan`                                                      | `dd-sdk-android-trace`            |
| `com.datadog.android.ktx.coroutine#sendErrorToDatadog`                                    | `com.datadog.android.rum.coroutines#sendErrorToDatadog`                                     | `dd-sdk-android-rum-coroutines`   |
| `com.datadog.android.ktx.rum#java.io.Closeable.useMonitored`                              | `com.datadog.android.rum#java.io.Closeable.useMonitored`                                    | `dd-sdk-android-rum`              |
| `com.datadog.android.ktx.rum#android.content.Context.getAssetAsRumResource`               | `com.datadog.android.rum.resource#android.content.Context.getAssetAsRumResource`            | `dd-sdk-android-rum`              |
| `com.datadog.android.ktx.rum#android.content.Context.getRawResAsRumResource`              | `com.datadog.android.rum.resource#android.content.Context.getRawResAsRumResource`           | `dd-sdk-android-rum`              |
| `com.datadog.android.ktx.rum#java.io.InputStream.asRumResource`                           | `com.datadog.android.rum.resource#java.io.InputStream.asRumResource`                        | `dd-sdk-android-rum`              |
| `com.datadog.android.ktx.tracing#okhttp3.Request.Builder.parentSpan`                      | `com.datadog.android.okhttp.trace#okhttp3.Request.Builder.parentSpan`                       | `dd-sdk-android-okhttp`           |

### 세션 재생

모바일 Session Replay 설정 지침은 [모바일 Session Replay 설정 및 구성][4]을 참조하세요.

[4]: /ko/real_user_monitoring/session_replay/mobile/setup_and_configuration/?tab=android

{{% /tab %}}
{{% tab "iOS" %}}

다양한 제품이 독립 모듈로 추출되어, SDK 구성은 모듈별로 구성됩니다.

> 제품을 활성화하기 전에 SDK를 초기화해야 합니다.

SDK 초기화의 빌더 패턴은 스트럭처 정의를 사용하기 위해 제거되었습니다. 다음 예시는 `1.x` 초기화가 `2.0`에서 어떻게 변환되는지 보여줍니다.

**v1 초기화**
```swift
import Datadog

Datadog.initialize(
    appContext: .init(),
    trackingConsent: .granted,
    configuration: Datadog.Configuration
        .builderUsing(
            clientToken: "<client token>",
            environment: "<environment>"
        )
        .set(serviceName: "<service name>")
        .build()
```
**V2 초기화**
```swift
import DatadogCore

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        service: "<service name>"
    ),
    trackingConsent: .granted
)
```

API 변경 사항:

|`1.x`|`2.0`|
|---|---|
|`Datadog.Configuration.Builder.set(serviceName:)`|`Datadog.Configuration.service`|
|`Datadog.Configuration.Builder.set(batchSize:)`|`Datadog.Configuration.batchSize`|
|`Datadog.Configuration.Builder.set(uploadFrequency:)`|`Datadog.Configuration.uploadFrequency`|
|`Datadog.Configuration.Builder.set(proxyConfiguration:)`|`Datadog.Configuration.proxyConfiguration`|
|`Datadog.Configuration.Builder.set(encryption:)`|`Datadog.Configuration.encryption`|
|`Datadog.Configuration.Builder.set(serverDateProvider:)`|`Datadog.Configuration.serverDateProvider`|
|`Datadog.AppContext(mainBundle:)`|`Datadog.Configuration.bundle`|

### 로그

로그와 관련된 모든 클래스는 `DatadogLogs` 모듈에 엄밀하게 포함되어 있습니다. 먼저 제품을 활성화해야 합니다.

```swift
import DatadogLogs

Logs.enable(with: Logs.Configuration(...))
```

그런 다음 로거 인스턴스를 생성합니다.

```swift
import DatadogLogs

let logger = Logger.create(
    with: Logger.Configuration(name: "<logger name>")
)
```

API 변경 사항:

|`1.x`|`2.0`|
|---|---|
|`Datadog.Configuration.Builder.setLogEventMapper(_:)`|`Logs.Configuration.eventMapper`|
|`Datadog.Configuration.Builder.set(loggingSamplingRate:)`|`Logs.Configuration.eventMapper`|
|`Logger.Builder.set(serviceName:)`|`Logger.Configuration.service`|
|`Logger.Builder.set(loggerName:)`|`Logger.Configuration.name`|
|`Logger.Builder.sendNetworkInfo(_:)`|`Logger.Configuration.networkInfoEnabled`|
|`Logger.Builder.bundleWithRUM(_:)`|`Logger.Configuration.bundleWithRumEnabled`|
|`Logger.Builder.bundleWithTrace(_:)`|`Logger.Configuration.bundleWithTraceEnabled`|
|`Logger.Builder.sendLogsToDatadog(false)`|`Logger.Configuration.remoteSampleRate = 0`|
|`Logger.Builder.set(datadogReportingThreshold:)`|`Logger.Configuration.remoteLogThreshold`|
|`Logger.Builder.printLogsToConsole(_:, usingFormat)`|`Logger.Configuration.consoleLogFormat`|

### 트레이스

트레이스와 관련된 모든 클래스는 `DatadogTrace` 모듈에 엄밀하게 포함되어 있습니다. 먼저 제품을 활성화해야 합니다.

```swift
import DatadogTrace

Trace.enable(
    with: Trace.Configuration(...)
)
```

그런 다음 공유 트레이서 인스턴스에 액세스할 수 있습니다.

```swift
import DatadogTrace

let tracer = Tracer.shared()
```

API 변경 사항:

|`1.x`|`2.0`|
|---|---|
|`Datadog.Configuration.Builder.trackURLSession(_:)`|`Trace.Configuration.urlSessionTracking`|
|`Datadog.Configuration.Builder.setSpanEventMapper(_:)`|`Trace.Configuration.eventMapper`|
|`Datadog.Configuration.Builder.set(tracingSamplingRate:)`|`Trace.Configuration.sampleRate`|
|`Tracer.Configuration.serviceName`|`Trace.Configuration.service`|
|`Tracer.Configuration.sendNetworkInfo`|`Trace.Configuration.networkInfoEnabled`|
|`Tracer.Configuration.globalTags`|`Trace.Configuration.tags`|
|`Tracer.Configuration.bundleWithRUM`|`Trace.Configuration.bundleWithRumEnabled`|
|`Tracer.Configuration.samplingRate`|`Trace.Configuration.sampleRate`|

### RUM

RUM과 관련된 모든 클래스는 `DatadogRUM` 모듈에 엄밀하게 포함되어 있습니다. 먼저 제품을 활성화해야 합니다.

```swift
import DatadogRUM

RUM.enable(
    with: RUM.Configuration(applicationID: "<RUM Application ID>")
)
```

그런 다음 공유 RUM 모니터 인스턴스에 액세스할 수 있습니다.

```swift
import DatadogRUM

let monitor = RUMMonitor.shared()
```

API 변경 사항:

|`1.x`|`2.0`|
|---|---|
|`Datadog.Configuration.Builder.trackURLSession(_:)`|`RUM.Configuration.urlSessionTracking`|
|`Datadog.Configuration.Builder.set(rumSessionsSamplingRate:)`|`RUM.Configuration.sessionSampleRate`|
|`Datadog.Configuration.Builder.onRUMSessionStart`|`RUM.Configuration.onSessionStart`|
|`Datadog.Configuration.Builder.trackUIKitRUMViews(using:)`|`RUM.Configuration.uiKitViewsPredicate`|
|`Datadog.Configuration.Builder.trackUIKitRUMActions(using:)`|`RUM.Configuration.uiKitActionsPredicate`|
|`Datadog.Configuration.Builder.trackRUMLongTasks(threshold:)`|`RUM.Configuration.longTaskThreshold`|
|`Datadog.Configuration.Builder.setRUMViewEventMapper(_:)`|`RUM.Configuration.viewEventMapper`|
|`Datadog.Configuration.Builder.setRUMResourceEventMapper(_:)`|`RUM.Configuration.resourceEventMapper`|
|`Datadog.Configuration.Builder.setRUMActionEventMapper(_:)`|`RUM.Configuration.actionEventMapper`|
|`Datadog.Configuration.Builder.setRUMErrorEventMapper(_:)`|`RUM.Configuration.errorEventMapper`|
|`Datadog.Configuration.Builder.setRUMLongTaskEventMapper(_:)`|`RUM.Configuration.longTaskEventMapper`|
|`Datadog.Configuration.Builder.setRUMResourceAttributesProvider(_:)`|`RUM.Configuration.urlSessionTracking.resourceAttributesProvider`|
|`Datadog.Configuration.Builder.trackBackgroundEvents(_:)`|`RUM.Configuration.trackBackgroundEvents`|
|`Datadog.Configuration.Builder.trackFrustrations(_:)`|`RUM.Configuration.frustrationsTracking`|
|`Datadog.Configuration.Builder.set(mobileVitalsFrequency:)`|`RUM.Configuration.vitalsUpdateFrequency`|
|`Datadog.Configuration.Builder.set(sampleTelemetry:)`|`RUM.Configuration.telemetrySampleRate`|

### 충돌 보고

Crash Reporting을 활성화하려면, RUM과 로그를 활성화하여 해당 제품에 각각 보고하도록 합니다.

```swift
import DatadogCrashReporting

CrashReporting.enable()
```

|`1.x`|`2.0`|
|---|---|
|`Datadog.Configuration.Builder.enableCrashReporting()`|`CrashReporting.enable()`|

### WebView Tracking

WebView Tracking을 활성화하려면, RUM과 로그를 활성화하여 해당 제품에 각각 보고하도록 합니다.

```swift
import WebKit
import DatadogWebViewTracking

let webView = WKWebView(...)
WebViewTracking.enable(webView: webView)
```

|`1.x`|`2.0`|
|---|---|
|`WKUserContentController.startTrackingDatadogEvents`|`WebViewTracking.enable(webView:)`|

### 세션 재생

모바일 Session Replay 설정에 관한 지침은 [모바일 Session Replay 설정 및 구성][5]을 참조하세요.

[5]: /ko/real_user_monitoring/session_replay/mobile/setup_and_configuration/?tab=ios

{{% /tab %}}
{{% tab "React Native" %}}

SDK 초기화에는 변경이 필요하지 않습니다.

{{% /tab %}}

{{% tab "Flutter" %}}

## SDK 구성 변경 사항

Datadog의 기본 SDK에서 모듈화를 지원하기 위해 특정 구성 속성이 이동되거나 이름이 변경되었습니다.

다음 스트럭처의 이름이 변경되었습니다.

| `1.x` | `2.x` |
|-------|-------|
| `DdSdkConfiguration` | `DatadogConfiguration` |
| `LoggingConfiguration` | `DatadogLoggingConfiguration` |
| `RumConfiguration` | `DatadogRumConfiguration` |
| `DdSdkExistingConfiguration` | `DatadogAttachConfiguration` |

다음 속성의 이름이 변경되었습니다.

| 1.x | 2.x | 참고 |
|-------|-------|-------|
| `DdSdkConfiguration.trackingConsent`| 삭제됨 | `Datadog.initialize`의 일부 | |
| `DdSdkConfiguration.customEndpoint` | 삭제됨 | 각 기능별로 설정됨 | |
| `DdSdkConfiguration.serviceName` | `DatadogConfiguration.service` | |
| `DdSdkConfiguration.logEventMapper` | `DatadogLoggingConfiguration.eventMapper` | |
| `DdSdkConfiguration.customLogsEndpoint` | `DatadogLoggingConfiguration.customEndpoint` | |
| `DdSdkConfiguration.telemetrySampleRate` | `DatadogRumConfiguration.telemetrySampleRate` | |

아울러 다음 API가 변경되었습니다.

| 1.x | 2.x | 참고 |
|-------|-------|-------|
| `Verbosity` | 삭제됨 | `CoreLoggerLevel` 또는 `LogLevel` 확인 |
| `DdLogs DatadogSdk.logs` | `DatadogLogging DatadogSdk.logs` | 유형 변경됨 |
| `DdRum DatadogSdk.rum` | `DatadogRum DatadogSdk.rum` | 유형 변경됨
| `Verbosity DatadogSdk.sdkVerbosity` | `CoreLoggerLevel DatadogSdk.sdkVerbosity` |
| `DatadogSdk.runApp` | `DatadogSdk.runApp` | `trackingConsent` 파라미터 추가됨 |
| `DatadogSdk.initialize` | `DatadogSdk.initialize` | `trackingConsent` 파라미터 추가됨 |
| `DatadogSdk.createLogger` | `DatadogLogging.createLogger` | 이동됨 |

## Flutter Web 변경 사항

Flutter Web을 사용하는 클라이언트는 Datadog 브라우저 SDK v5를 사용하도록 업데이트해야 합니다. `index.html`에서 다음 가져오기를 변경합니다.

```diff
-  <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs-v4.js"></script>
-  <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-rum-slim-v4.js"></script>
+  <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us1/v5/datadog-logs.js"></script>
+  <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us1/v5/datadog-rum-slim.js"></script>
```

**참고**: Datadog은 사이트당 하나의 CDN 번들을 제공합니다. 모든 사이트 URL 목록은 [브라우저 SDK README](https://github.com/DataDog/browser-sdk/#cdn-bundles)를 참조하세요.

## 로그 제품 변경 사항

v1과 마찬가지로, `DatadogConfiguration.loggingConfiguration` 멤버를 설정하여 Datadog 로깅을 활성화할 수 있습니다. 그러나 v1과는 다르게 Datadog은 기본 로거를 생성하지 않습니다. `DatadogSdk.logs`는 이제 `DatadogLogging`의 인스턴스로, 이를 로그를 생성하는 데 사용할 수 있습니다. 개발자가 개별 로거에 대해 보다 세분화된 지원을 받을 수 있도록 많은 옵션이 `DatadogLoggerConfiguration`으로 이동되었습니다.

다음 API의 이름이 변경되었습니다.

| 1.x | 2.x | 참고 |
|-------|-------|-------|
| `LoggingConfiguration` | `DatadogLoggingConfiguration` | 이름이 변경된 멤버 대부분은 이제 `DatadogLoggerConfiguration`에 위치합니다. |
| `LoggingConfiguration.sendNetworkInfo` | `DatadogLoggerConfiguration.networkInfoEnabled` | |
| `LoggingConfiguration.printLogsToConsole` | `DatadogLoggerConfiguration.customConsoleLogFunction` | |
| `LoggingConfiguration.sendLogsToDatadog` | 삭제되었습니다. 대신 `remoteLogThreshold`을 사용합니다. | |
| `LoggingConfiguration.datadogReportingThreshold` | `DatadogLoggerConfiguration.remoteLogThreshold` | |
| `LoggingConfiguration.bundleWithRum` | `DatadogLoggerConfiguration.bundleWithRumEnabled` | |
| `LoggingConfiguration.bundleWithTrace` | `DatadogLoggerConfiguration.bundleWithTraceEnabled` | |
| `LoggingConfiguration.loggerName` | `DatadogLoggerConfiguration.name` | |
| `LoggingConfiguration.sampleRate` | `DatadogLoggerConfiguration.remoteSampleRate` | |

## RUM 제품 변경 사항

다음 API의 이름이 변경되었습니다.

| 1.x | 2.x | 참고 |
|-------|-------|-------|
| `RumConfiguration` | `DatadogRumConfiguration` | 유형 이름 변경됨 |
| `RumConfiguration.vitalsUpdateFrequency` | `DatadogRumConfiguration.vitalsUpdateFrequency` | 바이탈 업데이트를 비활성화하려면 `null`로 설정하세요. |
| `RumConfiguration.tracingSampleRate` | `DatadogRumConfiguration.traceSampleRate` |
| `RumConfiguration.rumViewEventMapper` | `DatadogRumConfiguration.viewEventMapper` |
| `RumConfiguration.rumActionEventMapper` | `DatadogRumConfiguration.actionEventMapper` |
| `RumConfiguration.rumResourceEventMapper` | `DatadogRumConfiguration.resourceEventMapper` |
| `RumConfiguration.rumErrorEventMapper` | `DatadogRumConfiguration.rumErrorEventMapper` |
| `RumConfiguration.rumLongTaskEventMapper` | `DatadogRumConfiguration.longTaskEventMapper` |
| `RumUserActionType` | `RumActionType` | 유형 이름 변경됨 |
| `DdRum.addUserAction` | `DdRum.addAction` | |
| `DdRum.startUserAction` | `DdRum.startAction` | |
| `DdRum.stopUserAction` | `DdRum.stopAction` | |
| `DdRum.startResourceLoading` | `DdRum.startResource` | |
| `DdRum.stopResourceLoading` | `DdRum.stopResource` | |
| `DdRum.stopResourceLoadingWithError` | `DdRum.stopResourceWithError` | |

아울러, 이벤트 매퍼는 더 이상 뷰 이름을 수정할 수 없습니다. 뷰 이름을 변경하려면 사용자 지정 [`ViewInfoExtractor`](https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/ViewInfoExtractor.html)를 대신 사용하세요.


{{% /tab %}}

{{< /tabs >}}


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}