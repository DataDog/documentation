---
aliases: null
description: 모바일 세션 재생을 설치하고 설정합니다.
further_reading:
- link: /real_user_monitoring/session_replay/mobile
  tag: 설명서
  text: 모바일 세션 재생
- link: /real_user_monitoring/session_replay/mobile/app_performance
  tag: 설명서
  text: 모바일 세션 재생이 앱 성능에 미치는 영향
- link: /real_user_monitoring/session_replay/mobile/privacy_options
  tag: 설명서
  text: 모바일 세션 재생 개인정보 보호 옵션
- link: /real_user_monitoring/session_replay/mobile/troubleshooting
  tag: 설명서
  text: 모바일 세션 재생 문제 해결
- link: /real_user_monitoring/session_replay
  tag: 설명서
  text: 세션 재생
title: 모바일 세션 재생 설치 및 설정
---

## 설정

{{< tabs >}}
{{% tab "Android" %}}

모든 세션 재생 SDK 버전은 [메이븐 스냅샷 리포지토리][1]에서 확인할 수 있습니다.

Android에서 모바일 세션 재생을 설정하려면:

1. 보기 계측이 활성화된 상태에서 [Datadog Android RUM SDK 설정 및 초기화][2]를 완료했는지 확인하세요.

2. Datadog 세션 재생을 종속성으로 선언합니다:
  {{< code-block lang="kotlin" filename="build.gradle" disable_copy="false" collapsible="true" >}}
    implementation("com.datadoghq:dd-sdk-android-rum:[datadog_version]")
    implementation("com.datadoghq:dd-sdk-android-session-replay:[datadog_version]")
    // material 지원이 필요한 경우
    implementation("com.datadoghq:dd-sdk-android-session-replay-material:[datadog_version]")
   {{< /code-block >}}

3. 앱에서 세션 재생을 활성화합니다:

   {{< code-block lang="kotlin" filename="Application.kt" disable_copy="false" collapsible="true" >}}
   val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
    // material 확장 지원이 필요한 경우
    .addExtensionSupport(MaterialExtensionSupport()) 
    .build()
   SessionReplay.enable(sessionReplayConfig)
   {{< /code-block >}}

[1]: https://oss.sonatype.org/content/repositories/snapshots/com/datadoghq/dd-sdk-android/
[2]: https://docs.datadoghq.com/ko/real_user_monitoring/android/?tab=kotlin
[3]: https://docs.datadoghq.com/ko/real_user_monitoring/android/?tab=kotlin#declare-the-sdk-as-a-dependency

{{% /tab %}}
{{% tab "iOS" %}}

iOS용 모바일 세션 재생 설정하기:

1. 보기 계측이 활성화된 상태에서 [Datadog iOS RUM SDK 설정 및 초기화][1]를 완료했는지 확인하세요.

2. 패키지 매니저에 따라 Datadog 세션 재생 라이브러리를 프로젝트에 연결합니다:

   | 패키지 매니저            | 설치 단계                                                                           |
   |----------------------------|---------------------------------------------------------------------------------------------|
   | [CocoaPods][2]           | `Podfile`에 `pod 'DatadogSessionReplay'`를 추가합니다.                                         |
   | [Swift Package Manager][3] | 앱 대상에 `DatadogSessionReplay` 라이브러리를 종속성으로 추가합니다.                      |
   | [Carthage][4]            | 앱 대상에 `DatadogSessionReplay.xcframework`를 종속성으로 추가합니다.                  |

3. 앱에서 세션 재생을 활성화합니다:

   {{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}
   import DatadogSessionReplay

   SessionReplay.enable(
       with: SessionReplay.Configuration(
           replaySampleRate: sampleRate
       )
   )
   {{< /code-block >}}

[1]: https://docs.datadoghq.com/ko/real_user_monitoring/ios/?tab=swift
[2]: https://cocoapods.org/
[3]: https://www.swift.org/package-manager/
[4]: https://github.com/Carthage/Carthage

{{% /tab %}}
{{< /tabs >}}

## 추가 설정
### 녹화된 세션의 샘플 속도가 표시되도록 설정

샘플 속도는 세션 재생 구성에서 필수 파라미터입니다. 이 값은 0.0에서 100.0 사이의 숫자여야 하며, 0은 어떠한 재생도 녹화되지 않음을 의미하고 100은 모든 RUM 세션에 재생이 포함됨을 의미합니다.

이 샘플 속도는 RUM 샘플 속도에 추가로 적용됩니다. 예를 들어 RUM이 80%의 샘플 속도를 사용하고 세션 재생이 20%의 샘플 속도를 사용하는 경우, 모든 사용자 세션 중 80%가 RUM에 포함되고 해당 세션 내에서는 20%만 재생을 가지고 있다는 의미입니다.

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
{{< /tabs >}}

### 세션 재생 데이터가 전송되고 있는지 확인

앱에서 세션 재생 데이터를 보내고 있는지 확인하기 위해 Datadog SDK에서 디버그 옵션을 활성화할 수 있습니다.

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
{{< /tabs >}}

### 개인정보 보호 옵션

[개인정보 보호 옵션][1]을 참조하세요.

[1]: /ko/real_user_monitoring/session_replay/mobile/privacy_options

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}