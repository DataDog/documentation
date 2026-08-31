---
aliases:
- /ko/real_user_monitoring/android/
code_lang: android
code_lang_weight: 10
further_reading:
- link: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android
  tag: 설명서
  text: RUM 안드로이드 고급 설정
- link: https://github.com/DataDog/dd-sdk-android
  tag: 소스 코드
  text: dd-sdk-android를 위한 소스 코드
- link: /real_user_monitoring
  tag: 설명서
  text: Datadog RUM 탐색
title: RUM Android 및 Android TV 모니터링 설정
type: multi-code-lang
---
## 개요

이 페이지에서는 Android SDK를 사용하여 [실제 사용자 모니터링(RUM)][1] 및 [Error Tracking][2] 모두에 애플리케이션을 계측하는 방법을 설명합니다. 아래 단계에 따라 RUM(Error Tracking 포함) 또는 Error Tracking(독립형 제품으로 구매한 경우)을 사용하여 애플리케이션을 계측할 수 있습니다.

Datadog 안드로이드 SDK는 안드로이드 5.0+(API 레벨 21) 및 안드로이드 TV를 지원합니다.

## 설정

### UI에서 애플리케이션 세부 정보를 지정합니다.

1. Datadog SDK를 종속성으로 선언합니다.
2. UI에서 애플리케이션 세부 정보를 지정합니다.
3. 애플리케이션 컨텍스트를 사용하여 Datadog SDK를 초기화합니다.
4. 데이터 전송을 시작하려면 기능을 활성화합니다.
5. 인터셉터를 초기화하여 네트워크 이벤트를 추적합니다.

### Datadog SDK를 종속성으로 선언합니다.

애플리케이션 모듈의 **애플리케이션 모듈** `build.gradle` 파일에 [dd-sdk-android-rum][3] 및 [Gradle 플러그인][4]을 종속성으로 선언합니다.

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

### UI에서 애플리케이션 세부 정보를 지정합니다.
{{< tabs >}}
{{% tab "RUM" %}}

1. [디지털 경험** > **애플리케이션 추가**][1]로 이동합니다.
2. `android`를 애플리케이션 유형으로 선택하고 애플리케이션 이름을 입력하여 고유한 Datadog 애플리케이션 ID 및 클라이언트 토큰을 생성합니다.
3. 웹 뷰를 계측하려면 **웹 뷰 계측** 토글을 클릭합니다. 자세한 내용은 [웹 뷰 트래킹][2]을 참조하세요.
4. 클라이언트 IP 또는 위치 정보 데이터에 대한 자동 사용자 데이터 수집을 사용하지 않으려면 해당 설정의 토글을 사용합니다. 자세한 내용은 [RUM Android 데이터 수집][3]을 참조하세요.

   {{< img src="real_user_monitoring/android/android-new-application.png" alt="Datadog에서 Android용 RUM 애플리케이션 만들기" style="width:90%;">}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /ko/real_user_monitoring/android/web_view_tracking/
[3]: /ko/real_user_monitoring/android/data_collected/

{{% /tab %}}
{{% tab "Error Tracking" %}}

1. [Error Tracking** > **설정** > **브라우저 및 모바일** > **애플리케이션 추가**][1]로 이동합니다.
2. `android`를 애플리케이션 유형으로 선택하고 애플리케이션 이름을 입력하여 고유한 Datadog 애플리케이션 ID 및 클라이언트 토큰을 생성합니다.
3. 웹 뷰를 계측하려면 **웹 뷰 계측** 토글을 클릭합니다. 자세한 내용은 [웹 뷰 트래킹][2]을 참조하세요.
4. 클라이언트 IP 또는 지리적 위치 데이터에 대한 자동 사용자 데이터 수집을 사용하지 않으려면 해당 설정의 토글을 사용하세요. 자세한 내용은 [Android 데이터 수집][3]을 참조하세요.

   {{< img src="real_user_monitoring/error_tracking/mobile-new-application.png" alt="Datadog에서 Android 애플리케이션 생성" style="width:90%;">}}

[1]: https://app.datadoghq.com/error-tracking/settings/setup/client
[2]: /ko/real_user_monitoring/android/web_view_tracking/
[3]: /ko/real_user_monitoring/android/data_collected/

{{% /tab %}}
{{< /tabs >}}

데이터의 안전을 보장하려면 클라이언트 토큰을 사용해야 합니다. [Datadog API 키][5]만 사용하여 Datadog SDK를 구성하는 경우 Android 애플리케이션의 APK 바이트 코드에 클라이언트 측에 노출됩니다. 

클라이언트 토큰 설정에 대한 자세한 내용은 [클라이언트 토큰 설명서][6]를 참조하세요.

### 애플리케이션 컨텍스트를 사용하여 Datadog SDK 초기화

초기화 스니펫에서 환경 이름, 서비스 이름 및 버전 번호를 설정합니다. 아래 예에서 `APP_VARIANT_NAME`은 데이터를 생성하는 애플리케이션의 변형을 지정합니다. 자세한 내용은 [태그 사용][7]을 참조하세요.

EU 사용자를 위한 GDPR 준수를 추가하려면 [`trackingConsent`][8]을 참조하세요. 라이브러리를 초기화하려면 [기타 구성 옵션][9]을 참조하세요.

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

초기화 자격 증명에는 애플리케이션의 변형 이름이 필요하며 `BuildConfig.FLAVOR` 값을 사용합니다. 이 변형을 사용하면 SDK는 애플리케이션에서 보고된 오류를 Gradle 플러그인에서 업로드한 매핑 파일과 일치시킬 수 있습니다. 변형이 없는 경우 자격 증명은 빈 문자열을 사용합니다. 

Gradle 플러그인은 빌드 시점에 적절한 ProGuard `mapping.txt` 파일을 자동으로 업로드하여 난독화된 오류 스택 추적을 볼 수 있도록 합니다. 자세한 내용은 [Android 오류 추적][10]을 참조하세요.

### 샘플 세션

<div class="alert alert-danger">세션 샘플 속도 구성은 Error Tracking에는 적용되지 않습니다.</div>

애플리케이션이 Datadog로 전송하는 데이터를 제어하려면 [RUM 초기화][11] 시 세션의 샘플 속도를 지정할 수 있습니다. 비율은 0에서 100 사이의 백분율입니다. 기본적으로 `sessionSamplingRate`은 100으로 설정되어 있습니다(모든 세션 유지).

```kotlin
val rumConfig = RumConfiguration.Builder(applicationId)
        // 여기서 RUM 세션의 75%가 Datadog으로 전송됩니다.
        .setSessionSampleRate(75.0f)
        .build()
Rum.enable(rumConfig)
```

### 추적 동의 설정(GDPR 준수)

GDPR 규정을 준수하기 위해 SDK 초기화 시 추적 동의 값을 입력해야 합니다.

추적 동의는 다음 값 중 하나를 선택할 수 있습니다.

- `TrackingConsent.PENDING`: (기본값) SDK가 데이터 수집 및 일괄 처리를 시작하지만 해당 데이터를
 데이터 수집 엔드포인트로 전송하지는 않습니다. SDK에서는 새 추적 동의 값으로 일괄 처리 데이터 작업이 결정될 때까지 대기합니다.
- `TrackingConsent.GRANTED`: SDK가 데이터를 수집하고 데이터 수집 엔드포인트로 전송합니다.
- `TrackingConsent.NOT_GRANTED`: SDK는 어떠한 데이터도 수집하지 않습니다. 로그, 추적 또는 이벤트를 수동으로 전송할 수 없습니다.

SDK를 초기화한 후 추적 동의를 업데이트하려면 `Datadog.setTrackingConsent(<NEW CONSENT>)`를 호출합니다. SDK는 새 동의에 따라 동작을 변경합니다. 예를 들어, 현재 추적 동의가 `TrackingConsent.PENDING`이고 다음으로 업데이트하는 경우:

- `TrackingConsent.GRANTED`: SDK에서 기존 일괄 처리된 전체 데이터와 향후 데이터를 데이터 수집 엔드포인트로 직접 전송합니다.
- `TrackingConsent.NOT_GRANTED`: SDK에서 일괄 처리된 데이터 전체를 삭제하고 이후 데이터를 수집하지 않습니다.


### 데이터 전송을 시작하려면 기능을 활성화하세요.

Android SDK에서 데이터 전송을 시작하도록 설정합니다.

{{< tabs >}}
{{% tab "Kotlin" %}}

```kotlin
   val rumConfig = RumConfiguration.Builder(applicationId)
     .trackInteractions()
     .trackLongTasks(durationThreshold) // Not applicable to Error Tracking
     .useViewTrackingStrategy(strategy)
     .build()
   Rum.enable(rumConfig)
```

{{% /tab %}}
{{% tab "Java" %}}

```java
   RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
     .trackInteractions()
     .trackLongTasks(durationThreshold)  // Not applicable to Error Tracking
     .useViewTrackingStrategy(strategy)
     .build();
   Rum.enable(rumConfig);
```

{{% /tab %}}
{{< /tabs >}}

모든 조회수(활동, 조각 등)를 자동으로 추적하려면 [`ViewTrackingStrategy`][12]를 참조하세요.

### 인터셉터를 초기화하여 네트워크 이벤트 추적하기

네트워크 이벤트 추적을 위한 인터셉터를 초기화합니다.

1. 분산 추적을 사용하려면 [트레이스 기능을 추가하고 활성화][13]하세요.
2. 모듈 수준 `build.gradle` 파일에서 `dd-sdk-android-okhttp` 라이브러리에 Gradle 종속성을 추가합니다:

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
    }
    ```

3. OkHttp 요청을 리소스로 추적하려면 제공된 [인터셉터][14]를 추가하세요.

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val tracedHostsWithHeaderType = mapOf(
    "example.com" to setOf(
        TracingHeaderType.DATADOG,
        TracingHeaderType.TRACECONTEXT),
    "example.eu" to  setOf(
        TracingHeaderType.DATADOG,
        TracingHeaderType.TRACECONTEXT))
val okHttpClient = OkHttpClient.Builder()
    .addInterceptor(DatadogInterceptor.Builder(tracedHostsWithHeaderType).build())
    .build()
```
{{% /tab %}}
{{% tab "Java" %}}
```java
final Map<String, Set<TracingHeaderType>> tracedHostsWithHeaderType = new HashMap<>();
final Set<TracingHeaderType> datadogAndW3HeadersTypes = new HashSet<>(Arrays.asList(TracingHeaderType.DATADOG, TracingHeaderType.TRACECONTEXT));
tracedHostsWithHeaderType.put("example.com", datadogAndW3HeadersTypes);
tracedHostsWithHeaderType.put("example.eu", datadogAndW3HeadersTypes);
OkHttpClient okHttpClient = new OkHttpClient.Builder()
    .addInterceptor(new DatadogInterceptor.Builder(tracedHostsWithHeaderType).build())
    .build();
```
{{% /tab %}}
{{< /tabs >}}

여기에는 `OkHttpClient`에서 처리된 각 요청이 리소스로 기록되며 모든 관련 정보(URL, 방법, 상태 코드 및 오류)가 자동으로 채워집니다. 보기가 활성화되어 있을 때 시작된 네트워크 요청만 추적됩니다. 애플리케이션이 백그라운드에 있을 때 요청을 추적하려면 [수동으로 보기 만들기][15]를 참조하세요.

**참고**: 여러 개의 인터셉터를 사용하는 경우 `DatadogInterceptor`를 먼저 추가합니다.

타사 제공업체 및 네트워크 요청의 [리소스 타이밍 자동 추적][16]을 위해 `OkHttpClient`에 `EventListener`를 추가할 수도 있습니다.

## 백그라운드 이벤트 추적

애플리케이션이 백그라운드에 있을 때(예: 활성 보기를 사용할 수 없음) 크래시 및 네트워크 요청과 같은 이벤트를 추적할 수 있습니다.

구성하는 동안 다음 코드 조각을 추가합니다.

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
<div class="alert alert-info"><p>백그라운드 이벤트 추적으로 추가 세션이 발생하여 청구 금액에 영향을 미칠 수 있습니다. 자세한 내용은 <a href="https://docs.datadoghq.com/help/">Datadog 지원팀에 문의하세요.</a></p>
</div>

## Kotlin 확장 프로그램

### `Closeable` 확장

`useMonitored` 메서드를 사용하여 `Closeable` 인스턴스 사용량을 모니터링하여 오류를 Datadog에 전송하고 이후 리소스를 닫을 수 있습니다. 

```kotlin
val closeable: Closeable = ...
closeable.useMonitored {
    // Your code here
}

```

### 리소스로서 로컬 자산 추적

`getAssetAsRumResource` 확장 메서드를 사용하여 어셋에 대한 액세스를 추적할 수 있습니다:

```kotlin
val inputStream = context.getAssetAsRumResource(fileName)
```

`getRawResAsRumResource` 확장 메서드를 사용하여 로컬 리소스 사용량을 추적할 수 있습니다:

```kotlin
val inputStream = context.getRawResAsRumResource(id)
```

## 디바이스가 오프라인일 때 데이터 전송

Android SDK는 사용자 장치가오프라인 상태일 때 데이터 가용성을 보장합니다. 네트워크가 연결이 원활하지 않은 지역 또는 장치 배터리가 너무 부족한 경우 모든 이벤트는 먼저 로컬 장치에 일괄적으로 저장됩니다. 

각 배치는 수집 사양을 따릅니다. 배치는 네트워크가 사용 가능한 즉시 전송됩니다. 또한 배터리는 Datadog SDK 최종 사용자 경험에 영향을 주지 않을 만큼 충분합니다. 애플리케이션이 포그라운드에 있는 동안 네트워크를 사용할 수 없거나 데이터 업로드에 실패하면 배치가 성공적으로 전송될 때까지 배치가 유지됩니다.

즉, 사용자가 오프라인 상태에서 애플리케이션을 열어도 데이터가 손실되지 않습니다. SDK가 너무 많은 디스크 공간을 사용하지 않도록 디스크의 데이터가 너무 오래되면 자동으로 삭제됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/
[2]: /ko/error_tracking/
[3]: https://github.com/DataDog/dd-sdk-android/tree/develop/features/dd-sdk-android-rum
[4]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[5]: /ko/account_management/api-app-keys/#api-keys
[6]: /ko/account_management/api-app-keys/#client-tokens
[7]: /ko/getting_started/tagging/using_tags/#rum--session-replay
[8]: #set-tracking-consent-gdpr-compliance
[9]: /ko/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/#initialization-parameters
[10]: /ko/real_user_monitoring/error_tracking/android/#upload-your-mapping-file
[11]: https://app.datadoghq.com/rum/application/create/
[12]: /ko/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/#automatically-track-views
[13]: /ko/tracing/trace_collection/dd_libraries/android/?tab=kotlin
[14]: https://square.github.io/okhttp/interceptors/
[15]: /ko/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/#custom-views
[16]: /ko/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/#automatically-track-network-requests