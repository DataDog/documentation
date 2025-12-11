---
aliases:
- /ko/real_user_monitoring/mobile_and_tv_monitoring/troubleshooting/kotlin-multiplatform
- /ko/real_user_monitoring/mobile_and_tv_monitoring/troubleshooting/kotlin_multiplatform
description: Kotlin Multiplatform 모니터링 문제를 해결하는 방법을 알아보세요.
further_reading:
- link: https://github.com/DataDog/dd-sdk-kotlin-multiplatform
  tag: 소스 코드
  text: dd-sdk-kotlin-multiplatform Source code
- link: /real_user_monitoring
  tag: 설명서
  text: 실제 사용자 모니터링 탐색
title: Kotlin Multiplatform SDK 트러블슈팅
---

## 개요

Datadog Kotlin Multiplatform SDK에서 예기치 않은 동작이 발생하는 경우, 이 가이드로 문제를 신속하게 해결하세요. 계속해서 문제가 발생하면 [Datadog 지원팀][1]에 문의하여 추가 지원을 받으세요.

## Datadog RUM이 초기화되었는지 확인
SDK가 올바르게 초기화되었는지 확인하려면 유틸리티 메서드 `isInitialized`를 사용하세요.

```kotlin
if (Datadog.isInitialized()) {
// 여기에 코드를 입력하세요.
}
```

## 디버깅
애플리케이션 작성 시 `setVerbosity` 메서드를 호출해 개발 로그를 활성화할 수 있습니다. 라이브러리의 모든 내부 메시지는 우선순위가 해당 레벨과 같거나 그보다 높은 경우 Android의 Logcat 또는 Xcode의 디버거 콘솔에 로깅됩니다.

```kotlin
Datadog.setVerbosity(SdkLogVerbosity.DEBUG)
```

## 추적 동의 설정(GDPR 준수)

GDPR 규정을 준수하기 위해 SDK는 초기화 시 추적 동의 값이 필요합니다. 
추적 동의는 다음 값 중 하나일 수 있습니다.

- `TrackingConsent.PENDING`: (기본값) SDK가 데이터 수집 및 일괄 처리를 시작하지만 해당 데이터를
 데이터 수집 엔드포인트로 전송하지는 않습니다. SDK에서는 새 추적 동의 값으로 일괄 처리 데이터 작업이 결정될 때까지 대기합니다.
- `TrackingConsent.GRANTED`: SDK가 데이터를 수집하고 데이터 수집 엔드포인트로 전송합니다.
- `TrackingConsent.NOT_GRANTED`: SDK에서 데이터를 수집하지 않습니다. 로그, 트레이스를 수동으로 보낼 수 없습니다
 전송할 수 없습니다.

SDK를 초기화한 후 추적 동의를 업데이트하려면 `Datadog.setTrackingConsent(<NEW CONSENT>)`를 호출합니다. SDK는 새 동의에 따라 동작을 변경합니다. 예를 들어, 현재 추적 동의가 `TrackingConsent.PENDING`이고 다음으로 업데이트하는 경우:

- `TrackingConsent.GRANTED`: SDK에서 기존 일괄 처리된 전체 데이터와 향후 데이터를 데이터 수집 엔드포인트로 직접 전송합니다.
- `TrackingConsent.NOT_GRANTED`: SDK에서 일괄 처리된 데이터 전체를 삭제하고 이후 데이터를 수집하지 않습니다.

## 일반적인 문제

### iOS 바이너리 연결

#### 누락된 `PLCrashReporter` 기호

다음과 같이 링커 검색 경로에 `PLCrashReporter` 기호가 누락되어 연결 단계 중 오류가 발생하는 경우

```
Undefined symbols for architecture arm64:
  "_OBJC_CLASS_$_PLCrashReport", referenced from:
       in DatadogCrashReporting[arm64][15](PLCrashReporterIntegration.o)
  "_OBJC_CLASS_$_PLCrashReportBinaryImageInfo", referenced from:
       in DatadogCrashReporting[arm64][7](CrashReport.o)
  "_OBJC_CLASS_$_PLCrashReportStackFrameInfo", referenced from:
       in DatadogCrashReporting[arm64][7](CrashReport.o)
  "_OBJC_CLASS_$_PLCrashReportThreadInfo", referenced from:
       in DatadogCrashReporting[arm64][7](CrashReport.o)
  "_OBJC_CLASS_$_PLCrashReporter", referenced from:
       in DatadogCrashReporting[arm64][15](PLCrashReporterIntegration.o)
  "_OBJC_CLASS_$_PLCrashReporterConfig", referenced from:
       in DatadogCrashReporting[arm64][15](PLCrashReporterIntegration.o)
```

그런 다음 `CrashReporter` 프레임워크 이름을 링커에 명시적으로 전달해야 합니다.

```kotlin
targets.withType(KotlinNativeTarget::class.java) {
   compilations.getByName("main").compileTaskProvider {
       compilerOptions {
           freeCompilerArgs.addAll(
               listOf(
                  "-linker-option",
                  "-framework CrashReporter"
               )
           )
       }
   }
}

```

#### 누락된 `swiftCompatibility` 기호

다음과 같이 링커 검색 경로에 `swiftCompatibility` 기호가 누락되어 연결 단계 중 오류가 발생하는 경우

```
Undefined symbols for architecture arm64:
  "__swift_FORCE_LOAD_$_swiftCompatibility56", referenced from:
      __swift_FORCE_LOAD_$_swiftCompatibility56_$_DatadogCrashReporting in DatadogCrashReporting[arm64][4](BacktraceReporter.o)
  "__swift_FORCE_LOAD_$_swiftCompatibilityConcurrency", referenced from:
      __swift_FORCE_LOAD_$_swiftCompatibilityConcurrency_$_DatadogCrashReporting in DatadogCrashReporting[arm64][4](BacktraceReporter.o)
```

그런 다음 이 오류를 억제할 수 있습니다.

```kotlin
targets.withType(KotlinNativeTarget::class.java) {
   compilations.getByName("main").compileTaskProvider {
       compilerOptions {
           freeCompilerArgs.addAll(
               listOf(
                  "-linker-option",
                  "-U __swift_FORCE_LOAD_\$_swiftCompatibility56",
                  "-linker-option",
                  "-U __swift_FORCE_LOAD_\$_swiftCompatibilityConcurrency"
               )
           )
       }
   }
}

```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/help