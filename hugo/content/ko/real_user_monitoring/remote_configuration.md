---
description: 브라우저, iOS 및 Android 애플리케이션에 대한 RUM SDK 설정을 원격으로 구성합니다.
further_reading:
- link: /real_user_monitoring/
  tag: 설명서
  text: Real User Monitoring
title: RUM Remote Configuration
---
## 개요 {#overview}

애플리케이션이 발전함에 따라 RUM SDK가 수집하는 데이터와 수집 빈도를 조정해야 할 수 있습니다. RUM Remote Configuration을 사용하면 애플리케이션의 새 버전을 배포하지 않고도 Datadog에서 지원되는 브라우저, iOS 및 Android SDK 설정을 업데이트할 수 있습니다.

{{< img src="/real_user_monitoring/remote_configuration/rum_remote_configuration_menu.png" alt="원격 구성에 사용할 수 있는 브라우저 RUM 설정이 나열된 SDK 구성 페이지입니다." >}}

## 전제 조건 {#prerequisites}

[원격 구성][2]을 조직에서 활성화해야 하며 다음 RUM SDK 버전이 필요합니다.

- Browser SDK 버전 7.13.0 이상
- iOS SDK 버전 3.17.0 이상
- Android SDK 버전 3.14.1 이상

<div class="alert alert-danger">네트워크나 프록시에서 허용 목록을 사용하는 경우 애플리케이션에 <code>*.browser-intake-&lt;DC_REGION&gt;-datadoghq.com</code> 을 추가하세요. 이 항목은 RUM 데이터 수집과 SDK의 원격 구성 요청을 모두 포함하며, 원격 구성 요청에서는 <code>sdk-configuration.</code> 하위 도메인을 사용합니다. 브라우저 애플리케이션의 경우, 이 도메인을 콘텐츠 보안 정책(Content Security Policy)에도 추가하세요.
<br><br> 이 도메인이 차단되면 SDK는 원격 설정을 검색할 수 없으며 별도의 오류 표시 없이 로컬 구성을 계속 사용합니다.</div>

## 작동 방식 {#how-it-works}

각 RUM 애플리케이션에는 SDK가 원격 설정을 검색하는 데 사용하는 원격 구성 ID가 있습니다.

SDK가 초기화될 때 캐시된 원격 설정을 적용합니다. 캐시된 설정을 사용할 수 없는 경우 애플리케이션에 정의된 설정을 사용합니다. SDK는 백그라운드에서 업데이트를 검사하고 다음 초기화를 위해 변경 사항을 저장합니다. 검사에 실패하면 SDK는 기존 캐시를 유지하거나 로컬 설정을 계속 사용합니다. 이 검사는 SDK 초기화를 지연시키거나 RUM 이벤트 수집을 중단하지 않습니다.

<div class="alert alert-danger">게시된 원격 설정은 애플리케이션의 해당 설정을 재정의합니다. 원격으로 활성화하지 않은 설정은 계속해서 로컬 값을 사용합니다. Datadog에서 관리하려는 설정만 활성화하세요.</div>

원격 구성은 해당 ID로 초기화된 모든 사용자 및 세션에 적용됩니다. 개별 사용자나 세션을 대상으로 지정할 수 없습니다. ID를 변경하면 SDK는 이를 새 구성으로 취급하며 이전 ID로 캐시된 설정은 사용하지 않습니다.

<div class="alert alert-warning">SDK는 공개 콘텐츠 전송 네트워크(CDN) 엔드포인트에서 원격 구성 설정을 검색합니다. 구성 값에 시크릿이나 개인 정보를 포함하지 마세요.</div>

## 권한 {#permissions}

원격 구성은 RUM 애플리케이션과 동일한 권한을 사용합니다. 구성을 활성화, 편집 또는 게시하려면 `RUM Apps Write` 권한이 필요합니다. 자세한 내용은 [Real User Monitoring 권한][1]을 참조하세요.

## 설정 {#setup}

애플리케이션에 대한 원격 설정을 구성하려면 다음 단계를 따르세요.

1. 새 애플리케이션에 지원되는 RUM SDK를 설치하거나 기존 애플리케이션의 SDK를 업데이트합니다.
2. {{< ui >}}RUM{{< /ui >}} > {{< ui >}}Manage Applications{{< /ui >}}로 이동하여 애플리케이션을 선택한 후 {{< ui >}}SDK Configuration{{< /ui >}}을 클릭합니다.
3. 원격 구성을 활성화하여 원격 구성 ID를 생성합니다.
   **참고**: Datadog은 구성을 초안으로 저장하므로 게시하기 전까지는 기존 SDK 설정이 재정의되지 않습니다.
4. SDK 초기화에 원격 구성 ID를 추가합니다.

   {{< tabs >}}
   {{% tab "브라우저" %}}

   기존 `datadogRum.init()` 호출에 `remoteConfiguration` 객체를 추가합니다.

   ```javascript
   remoteConfiguration: {
       id: '<REMOTE_CONFIGURATION_ID>',
   },
   ```

   {{% /tab %}}
   {{% tab "iOS" %}}

   `Datadog.Configuration`에 `remoteConfiguration`을 추가합니다.

   ```swift
   remoteConfiguration: .init(id: "<REMOTE_CONFIGURATION_ID>")
   ```

   {{% /tab %}}
   {{% tab "Android" %}}

   `Configuration.Builder`에서 `setRemoteConfigurationId()`를 호출합니다.

   ```kotlin
   .setRemoteConfigurationId("<REMOTE_CONFIGURATION_ID>")
   ```

   {{% /tab %}}
   {{< /tabs >}}
 
5. [원격 구성을 사용하여 SDK 설정 변경](#change-sdk-settings-with-remote-configuration) 섹션에 설명된 대로 설정을 업데이트합니다.
6. 구성을 게시하여 활성화된 설정을 적용합니다.

## 원격 구성을 사용하여 SDK 설정 변경 {#change-sdk-settings-with-remote-configuration}

원격 구성은 기본적으로 SDK 설정을 재정의하지 않습니다. 설정을 원격으로 관리하려면 Datadog에서 해당 재정의를 명시적으로 활성화한 다음 값을 구성하세요. 재정의가 활성화되지 않은 설정은 SDK에 구성된 값을 계속 사용합니다.

1. 원격으로 관리하려는 설정에 대한 재정의를 활성화합니다. 사용 중인 플랫폼에 대해 [구성 가능한 설정](#configurable-settings) 섹션에 나열된 설정 중에서 선택합니다.

   <div class="alert alert-danger">특정 설정은 iOS 및 Android SDK에서 해당 모듈을 가져와야 합니다. 애플리케이션에서 이러한 모듈을 가져오지 않으면 Session Replay, 분산 트레이싱 또는 프로파일링에 대해 원격 구성이 작동하지 않습니다.</div>

2. 상태를 선택하거나, 샘플링 비율을 변경하거나, 데이터를 추가하여 설정을 구성합니다.
3. 수정 사항을 저장합니다.

## 구성 가능한 설정 {#configurable-settings}

{{< tabs >}}
{{% tab "브라우저" %}}

**샘플링 비율**

| UI 레이블 | 파라미터 이름 |
|----------|----------------|
| Session Replay 샘플링 비율 | `rum.sessionReplaySampleRate` |
| 트레이스 샘플링 비율 | `rum.traceSampleRate` |
| 프로파일링 샘플링 비율 | `profiling.sampleRate` |

**개인정보 보호**

| UI 레이블 | 파라미터 이름 |
|----------|----------------|
| 기본 개인정보 보호 수준 | `rum.defaultPrivacyLevel` |
| 액션 이름에 대한 개인정보 보호 | `rum.enablePrivacyForActionName` |

**이벤트 추적**

| UI 레이블 | 파라미터 이름 |
|----------|----------------|
| 익명 사용자 추적 | `rum.trackAnonymousUser` |
| 사용자 상호작용 추적 | `rum.trackUserInteractions` |
| 리소스 추적 | `rum.trackResources` |
| 긴 작업 추적 | `rum.trackLongTasks` |
| 하위 도메인 간 세션 추적 | `rum.trackSessionAcrossSubdomains` |

**앱 속성**

| UI 레이블 | 파라미터 이름 |
|----------|----------------|
| 액션 이름 속성 | `rum.actionNameAttribute` |
| 트레이스 컨텍스트 주입 | `rum.traceContextInjection` |
| 허용된 트레이싱 URL | `rum.allowedTracingUrls` |
| 허용된 추적 오리진 | `rum.allowedTrackingOrigins` |

{{% /tab %}}
{{% tab "iOS" %}}

**샘플링 비율**

| UI 레이블 | 파라미터 이름 |
|----------|----------------|
| Session Replay 샘플링 비율 | `sessionReplay.sampleRate` |
| 연속 프로파일링 샘플링 비율 | `profiling.continuousSampleRate` |
| 앱 실행 프로파일링 샘플링 비율 | `profiling.applicationLaunchSampleRate` |
| 트레이스 샘플링 비율 | `trace.sampleRate` |

**개인정보 보호**

| UI 레이블 | 파라미터 이름 |
|----------|----------------|
| 텍스트 및 입력 개인정보 보호 | `sessionReplay.textAndInputPrivacy` |
| 이미지 개인정보 보호 | `sessionReplay.imagePrivacy` |
| 터치 개인정보 보호 | `sessionReplay.touchPrivacy` |

**이벤트 추적**

| UI 레이블 | 파라미터 이름 |
|----------|----------------|
| 익명 사용자 추적 | `rum.trackAnonymousUser` |
| 사용자 상호작용 추적 | `rum.trackUserInteractions` |
| 리소스 추적 | `rum.trackResources` |
| 백그라운드 이벤트 추적 | `rum.trackBackgroundEvents` |
| 좌절 신호 추적 | `rum.trackFrustrations` |
| 긴 작업 추적 | `rum.longTask.enabled` |
| 긴 작업 임계값 | `rum.longTask.threshold` |
| Vitals 업데이트 빈도 | `rum.vitalsUpdateFrequency` |
| 느린 프레임 추적 | `rum.trackSlowFrames` |
| 앱 응답 없음 추적 | `rum.appHang.enabled` |
| 앱 응답 없음 임계값 | `rum.appHang.threshold` |
| Watchdog 종료 추적 | `rum.trackWatchdogTerminations` |
| 메모리 경고 추적 | `rum.trackMemoryWarnings` |

**앱 속성**

| UI 레이블 | 파라미터 이름 |
|----------|----------------|
| 트레이스 컨텍스트 주입 | `trace.traceContextInjection` |
| 허용된 트레이싱 URL | `trace.tracedHosts` |

{{% /tab %}}
{{% tab "Android" %}}

**샘플링 비율**

| UI 레이블 | 파라미터 이름 |
|----------|----------------|
| 프로파일링 샘플링 비율 | `rum.profilingSampleRate` |
| Session Replay 샘플링 비율 | `sessionReplay.sampleRate` |
| 연속 프로파일링 샘플링 비율 | `profiling.continuousSampleRate` |
| 앱 실행 프로파일링 샘플링 비율 | `profiling.applicationLaunchSampleRate` |
| 트레이스 샘플링 비율 | `trace.sampleRate` |

**개인정보 보호**

| UI 레이블 | 파라미터 이름 |
|----------|----------------|
| 텍스트 및 입력 개인정보 보호 | `sessionReplay.textAndInputPrivacy` |
| 이미지 개인정보 보호 | `sessionReplay.imagePrivacy` |
| 터치 개인정보 보호 | `sessionReplay.touchPrivacy` |

**이벤트 추적**

| UI 레이블 | 파라미터 이름 |
|----------|----------------|
| 익명 사용자 추적 | `rum.trackAnonymousUser` |
| 사용자 상호작용 추적 | `rum.trackUserInteractions` |
| 백그라운드 이벤트 추적 | `rum.trackBackgroundEvents` |
| 좌절 신호 추적 | `rum.trackFrustrations` |
| 긴 작업 추적 | `rum.longTask.enabled` |
| 긴 작업 임계값 | `rum.longTask.threshold` |
| Vitals 업데이트 빈도 | `rum.vitalsUpdateFrequency` |
| 느린 프레임 추적 | `rum.trackSlowFrames` |
| 크래시 보고 | `rum.crashReportsEnabled` |
| 치명적이지 않은 ANR 추적 | `rum.trackNonFatalAnrs` |

**앱 속성**

| UI 레이블 | 파라미터 이름 |
|----------|----------------|
| 트레이스 컨텍스트 주입 | `trace.traceContextInjection` |
| 허용된 트레이싱 URL | `trace.tracedHosts` |

{{% /tab %}}
{{< /tabs >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/rbac/permissions/#real-user-monitoring
[2]: /ko/remote_configuration/