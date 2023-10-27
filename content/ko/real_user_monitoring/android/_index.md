---
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: 깃허브(Githun)
  text: dd-sdk-android를 위한 소스 코드
- link: /real_user_monitoring
  tag: 설명서
  text: Datadog RUM 탐색
kind: 설명서
title: RUM 안드로이드 및 안드로이드 TV 모니터링
---
## 개요

Datadog 실제 사용자 모니터링(RUM)을 사용하면 애플리케이션 개별 사용자의 실시간 성능 및 사용자의 활동을 시각화하고 분석할 수 있습니다.

Datadog 안드로이드 SDK는 안드로이드 5.0+(API 레벨 21) 및 안드로이드 TV를 지원합니다.

## 설정

1. Datadog RUM SDK를 종속성으로 선언합니다.
2. UI에서 애플리케이션 세부 정보를 지정합니다.
3. 애플리케이션 컨텍스트를 사용하여 Datadog SDK를 초기화합니다.
4. RUM 기능을 활성화하여 데이터 전송을 시작합니다.
5. RUM 인터셉터를 초기화하여 네트워크 이벤트를 추적합니다.

### Datadog RUM SDK를 종속성으로 선언합니다.

** 애플리케이션 모듈의 ** `build.gradle`파일에서 [dd-sdk-android-rum][1] 및 [Gradle 플러그인][12]을 종속성으로 선언합니다.

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

1.  [**UX Monitoring** > **RUM Applications** > **New Application**][2]으로 이동합니다.
2. `android`를 애플리케이션 유형으로 선택하고 애플리케이션 이름을 입력하여 고유한 Datadog 애플리케이션 ID 및 클라이언트 토큰을 생성합니다.
3. 웹 보기를 계측하려면 **Instrument your webviews** 토글을 클릭합니다. 자세한 내용은 [웹 보기 추적][13]을 참조하세요.
4. 클라이언트 IP 또는 지리적 위치 데이터에 대한 자동 사용자 데이터 수집을 비활성화하려면 해당 설정에 대한 확인란의 선택을 취소합니다. 자세한 내용은 [수집된 RUM 안드로이드 데이터][15]를 참조하세요.

   {{< img src="real_user_monitoring/android/android-new-application.png" alt="Datadog에서 Android용 RUM 애플리케이션 만들기" style="width:90%;">}}

데이터의 안전을 위해 클라이언트 토큰을 사용해야 합니다. [Datadog API 키][3]만 사용하여 Datadog SDK를 설정한 경우 안드로이드 애플리케이션의 APK 바이트 코드에서 클라이언트 측에 노출됩니다.

클라이언트 토큰 설정에 대한 자세한 내용은 [클라이언트 토큰 설명서][4]를 참조하세요.

### 애플리케이션 컨텍스트를 사용하여 Datadog SDK 초기화

초기화 스니펫에서 환경 이름, 서비스 이름 및 버전 번호를 설정합니다. 아래 예제에서는 `APP_VARIANT_NAME`가 데이터를 생성하는 애플리케이션의 변형을 지정합니다. 자세한 내용은 [태그 사용하기][14]를 참조하세요.

유럽 사용자에 대한 GDPR 준수를 추가하려면 [`trackingConsent`][6]을 확인하고, 라이브러리를 초기화하려면 [기타 설정 옵션][7]을 참조하세요.

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

초기화 자격 증명에는 애플리케이션의 변형 이름이 필요하며 `BuildConfig.FLAVOR`의 값을 사용합니다. 이 변형을 사용하면 RUM은 애플리케이션에서 보고된 오류를 Gradle 플러그인이 업로드한 매핑 파일과 일치시킬 수 있습니다. 변형이 없는 경우 자격 증명은 빈 문자열을 사용합니다.

Gradle 플러그인은 빌드 시 적절한 ProGuard `mapping.txt` 파일을 자동으로 업로드하므로 해독된 RUM 오류 스택 트레이스를 볼 수 있습니다. 자세한 내용은 [안드로이드 오류 추적][8]을 참조하세요.

### RUM 기능을 사용하여 데이터 전송 시작

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
    val rumConfig = RumConfiguration.Builder(applicationId)
      .trackInteractions()
      .trackLongTasks(durationThreshold)
      .useViewTrackingStrategy(strategy)
      .build()
    Rum.enable(rumConfig)
```
{{% /tab %}}

{{% tab "Java" %}}
```java
    RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
      .trackInteractions()
      .trackLongTasks(durationThreshold)
      .useViewTrackingStrategy(strategy)
      .build();
    Rum.enable(rumConfig);
```
{{% /tab %}}
{{< /tabs >}}

모든 보기(활동, 조각 등)를 자동으로 추적하려면 [`ViewTrackingStrategy`][5]를 확인하세요.

### RUM 인터셉터를 초기화하여 네트워크 이벤트를 추적합니다.

1. 분산 추적을 위해 트레이스 기능을 추가하고 활성화하려면 [Datadog 안드로이드 트레이스 수집 설명서][16]를 참조하세요.
2. 모듈 수준 `build.gradle` 파일에서 `dd-sdk-android-okhttp` 라이브러리에 Gradle 종속성을 추가합니다:

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
    }
    ```

3. OkHttp 요청을 리소스로 추적하려면 제공된 [인터셉터][9]를 추가합니다:

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val okHttpClient = OkHttpClient.Builder()
    .addInterceptor(DatadogInterceptor())
    .build()
```
{{% /tab %}}
{{% tab "Java" %}}
```java
OkHttpClient okHttpClient = new OkHttpClient.Builder()
    .addInterceptor(new DatadogInterceptor())
    .build();
```
{{% /tab %}}
{{< /tabs >}}

이렇게 하면 `OkHttpClient`에 의해 처리된 각 요청이 RUM의 리소스에 기록되며, 모든 관련 정보(URL, 메서드, 상태 코드 및 오류)가 자동으로 채워집니다. 보기가 활성화되어 있을때 시작된 네트워크 요청만 추적됩니다. 애플리케이션이 백그라운드에 있을 때 요청을 추적하려면 [수동으로 보기를 생성하세요][10].

**참고**: 여러 개의 인터셉터를 사용하는 경우 `DatadogInterceptor`를 먼저 추가합니다.

또한 타사 공급자 및 네트워크 요청에 대한 [리소스 타이밍 자동 추적][11]에 `OkHttpClient`에 대한 `EventListener`을 추가할 수도 있습니다.

### 백그라운드 이벤트 추적

애플리케이션이 백그라운드에 있을 때(예: 활성 보기를 사용할 수 없음) 크래시 및 네트워크 요청과 같은 이벤트를 추적할 수 있습니다.

RUM 구성 중에 다음 스니펫을 추가합니다:

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

### Kotlin 확장 프로그램

#### `Closeable` 확장

`useMonitored` 메서드를 사용하여 `Closeable` 인스턴스 사용량을 모니터링할 수 있으며, 이는 Datadog에 발생한 오류를 보고하고, 리소스를 닫습니다.

```kotlin
val closeable: Closeable = ...
closeable.useMonitored {
    // Your code here
}

```

#### 로컬 어셋을 RUM 리소스로 추적

`getAssetAsRumResource` 확장 메서드를 사용하여 어셋에 대한 액세스를 추적할 수 있습니다:

```kotlin
val inputStream = context.getAssetAsRumResource(fileName)
```

`getRawResAsRumResource` 확장 메서드를 사용하여 로컬 리소스 사용량을 추적할 수 있습니다:

```kotlin
val inputStream = context.getRawResAsRumResource(id)
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-android/tree/develop/features/dd-sdk-android-rum
[2]: https://app.datadoghq.com/rum/application/create
[3]: /ko/account_management/api-app-keys/#api-keys
[4]: /ko/account_management/api-app-keys/#client-tokens
[5]: /ko/real_user_monitoring/android/advanced_configuration/#automatically-track-views
[6]: /ko/real_user_monitoring/android/troubleshooting/#set-tracking-consent-gdpr-compliance
[7]: /ko/real_user_monitoring/android/advanced_configuration/#initialization-parameters
[8]: /ko/real_user_monitoring/error_tracking/android/#upload-your-mapping-file
[9]: https://square.github.io/okhttp/interceptors/
[10]: /ko/real_user_monitoring/android/advanced_configuration/#custom-views
[11]: /ko/real_user_monitoring/android/advanced_configuration/#automatically-track-network-requests
[12]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[13]: /ko/real_user_monitoring/android/web_view_tracking/
[14]: /ko/getting_started/tagging/using_tags/#rum--session-replay
[15]: /ko/real_user_monitoring/android/data_collected/
[16]: /ko/tracing/trace_collection/dd_libraries/android/?tab=kotlin