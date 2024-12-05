---
description: Android 애플리케이션에서 로그 수집
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: GitHub
  text: dd-sdk-android Source code
- link: logs/explorer
  tag: 설명서
  text: 로그 탐색 방법 알아보기
title: Android 로그 수집
---

## 개요

[Datadog의 `dd-sdk-android-logs` 클라이언트 측 로깅 라이브러리][1]를 사용해 Android 애플리케이션에서 Datadog로 로그를 보내고 다음 기능을 활용해 보세요.

* JSON 네이티브 형식으로 Datadog에 로깅합니다.
* `context` 및 그 외 커스텀 속성을 전송된 각 로그에 추가합니다.
* Java나 Kotlin 예외를 전송합니다.
* 실제 클라이언트 IP 주소와 User-Agents를 기록합니다.
* 자동 대량 포스트로 네트워크 사용을 최적화합니다.

## 설정

1. 모듈 수준 `build.gradle` 파일에 라이브러리를 종속성으로 선언해 Gradle 종속성을 추가합니다. 다음 예시에서 `x.x.x`를 [dd-sdk-android-logs][2] 최신 버전으로 변경해야 합니다.

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-logs:x.x.x"
    }
    ```

2. 애플리케이션 컨텍스트로 Datadog SDK, 추적 동의, [Datadog 클라이언트 토큰][3]을 초기화합니다. 보안을 위해 클라이언트 토큰을 사용해야 합니다. [Datadog API 키][4]를 사용해 Datadog SDK를 구성하면 Android 애플리케이션 APK 바이트 코드의 클라이언트 측에 노출되기 때문입니다.

   `APP_VARIANT_NAME`은 데이터를 생성하는 애플리케이션의 변형을 지정합니다. 이는 자격 증명 초기화에 필요합니다. `BuildConfig.FLAVOR` 값을 사용하거나, 변형이 없으면 문자열을 비워두세요. 빌드 시간 내에 적절한 ProGuard `mapping.txt` 파일이 자동으로 업로드되어 난독 처리가 해제된 오류 스택 트레이스를 볼 수 있습니다. 자세한 내용은 [Android 크래시 보고 및 오류 추적][5]을 참고하세요.

   클라이언트 토큰을 설정하는 방법에 관한 자세한 내용은 [클라이언트 토큰 설명서][3]를 참고하세요.

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

   GDPR 규정을 준수하려면 SDK 초기화 시 추적 동의 값이 필요합니다.
   다음 중 하나가 추적 동의 값이 될 수 있습니다.
   * `TrackingConsent.PENDING`: SDK에서 데이터를 수집 및 일괄 처리하나
     데이터 수집 엔드포인트로 전송하지는 않습니다. SDK에서는 새 추적 동의 값으로 일괄 처리 데이터 작업이 결정될 때까지 대기합니다.
   * `TrackingConsent.GRANTED`: SDK가 데이터를 수집하고 데이터 수집 엔드포인트로 전송합니다.
   * `TrackingConsent.NOT_GRANTED`: SDK에서 데이터를 수집하지 않습니다. 로그, 트레이스, 또는 RUM 이벤트를 수동으로
     전송할 수 없습니다.

   SDK가 초기화된 후 추적 동의를 업데이트하려면 `Datadog.setTrackingConsent(<NEW CONSENT>)`를 호출하세요.
   새 동의 값에 따라 SDK가 동작을 변경합니다. 예를 들어 기존 추적 동의 값 `TrackingConsent.PENDING`에서 변경한 값에 따라 다음과 같이 동작이 변경됩니다.
   * `TrackingConsent.GRANTED`: SDK에서 기존 일괄 처리된 전체 데이터와 향후 데이터를 데이터 수집 엔드포인트로 직접 전송합니다.
   * `TrackingConsent.NOT_GRANTED`: SDK에서 일괄 처리된 데이터 전체를 삭제하고 이후 데이터를 수집하지 않습니다.

   SDK가 올바르게 초기화되었는지 확인하려면 유틸리티 메서드 `isInitialized`를 사용하세요.

   ```kotlin
    if (Datadog.isInitialized()) {
        // your code here
    }
   ```

   애플리케이션을 작성할 때 `setVerbosity` 메서드를 호출해 개발 로그를 활성화할 수 있습니다. 우선 순위가 해당 수준 이상인 라이브러리의 경우 내부 메시지 전체가 Android Logcat에 로깅됩니다.
   ```kotlin
   Datadog.setVerbosity(Log.INFO)
   ```

3. 로그 기능을 구성하고 활성화합니다.

   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
        val logsConfig = LogsConfiguration.Builder().build()
        Logs.enable(logsConfig)
   ```
   {{% /tab %}}

   {{% tab "Java" %}}
   ```java
        LogsConfiguration logsConfig = new LogsConfiguration.Builder().build();
        Logs.enable(logsConfig);
   ```
   {{% /tab %}}
   {{< /tabs >}}

4. Android Logger를 구성합니다.

   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
        val logger = Logger.Builder()
           .setNetworkInfoEnabled(true)
           .setLogcatLogsEnabled(true)
           .setRemoteSampleRate(100f)
           .setBundleWithTraceEnabled(true)
           .setName("<LOGGER_NAME>")
           .build()
   ```
   {{% /tab %}}

   {{% tab "Java" %}}
   ```java
        Logger logger = new Logger.Builder()
           .setNetworkInfoEnabled(true)
           .setLogcatLogsEnabled(true)
           .setRemoteSampleRate(100f)
           .setBundleWithTraceEnabled(true)
           .setName("<LOGGER_NAME>")
           .build();
   ```
   {{% /tab %}}
   {{< /tabs >}}

5. 다음 함수 중 하나를 사용해 커스텀 로그 항목을 Datadog로 바로 보냅니다.

    ```kotlin
    logger.d("A debug message.")
    logger.i("Some relevant information ?")
    logger.w("An important warning...")
    logger.e("An error was met!")
    logger.wtf("What a Terrible Failure!")
    ```

6. 예외 항목은 메시지로 전송할 수 있습니다.
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
       try { 
           doSomething() 
       } catch (e: IOException) {
           logger.e("Error while doing something", e) 
       }
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
       try {
           doSomething();
       } catch (IOException e) {
           logger.e("Error while doing something", e);
       }
   ```
   {{% /tab %}}
   {{< /tabs >}}

    **참고**: 모든 로깅 메서드에 예외를 연결할 수 있습니다.

7. (선택 사항) 전송하는 로그에 속성을 추가하기 위해 로그 메시지에 맵을 제공하세요. 맵의 각 항목이 속성으로 추가됩니다.

   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
       logger.i("onPageStarted", attributes = mapOf("http.url" to url))
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
       Map<String, Object> attributes = new HashMap<>();
       attributes.put("http.url", url);
       logger.i("onPageStarted", null, attributes);
   ```
   {{% /tab %}}
   {{< /tabs >}}

8. 일괄 처리 전에 Log 이벤트에서 일부 속성을 수정하려면 Log 기능을 초기화할 때 `EventMapper<LogEvent>`를 구현하면 됩니다.

   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
       val logsConfig = LogsConfiguration.Builder()
                   // ...
                   .setEventMapper(logEventMapper)
                   .build()
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
       LogsConfiguration logsConfig = new LogsConfiguration.Builder()
                   // ...
                   .setEventMapper(logEventMapper)
                   .build();
   ```
   {{% /tab %}}
   {{< /tabs >}}

   **참고**: `EventMapper<LogEvent>` 구현에서 null이나 다른 인스턴스가 반환되면 이벤트가 삭제됩니다.

## 고급 로깅

### 로거 초기화

로거를 초기화하여 로그를 Datadog로 보내려고 할 때 `Logger.Builder`의 다음 메서드를 사용할 수 있습니다.

| 방법                           | 설명                                                                                                                                                                                                                                                             |
|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `setNetworkInfoEnabled(true)`    | 모든 로그에 `network.client.connectivity` 속성을 추가하세요. 기본값으로 로깅되는 데이터는 `connectivity`(`Wifi`, `3G`, `4G`...)와 `carrier_name`(`AT&T - US`)입니다. `carrier_name`은 Android API 레벨 28+에서만 로깅됩니다.                                     |
| `setService(<SERVICE_NAME>)` | `service`의 값을 Datadog로 전송하는 모든 로그에 연결된 [표준 속성][6] `<SERVICE_NAME>`으로 설정합니다.                                                                                                                                                           |
| `setLogcatLogsEnabled(true)`     | `true`로 설정해 Longcat을 로거로 사용합니다.                                                                                                                                                                                                                                  |
| `setBundleWithTraceEnabled(true)`| `true`(기본값)로 설정해 애플리케이션의 활성 트레이스와 로그를 번들합니다. 이 파라미터를 사용하면 Datadog 대시보드에 특정 트레이스에서 전송한 모든 로그를 표시합니다.                                                        |
| `setBundleWithRumEnabled(true)`| `true`(기본값)로 설정해 애플리케이션의 현재 RUM 컨텍스트와 로그를 번들합니다. 이 파라미터를 사용하면 Datadog RUM Explorer에서 특정 보기를 활성화해 모든 로그를 표시할 수 있습니다.                                                        |
| `setName(<LOGGER_NAME>)`   | `logger.name`의 값을 Datadog로 전송하는 모든 로그에 연결된 표준 속성 `<LOGGER_NAME>`으로 설정합니다.                                                                                                                                                                  |
| `setRemoteSampleRate(<SAMPLE_RATE>)`   | 이 로거의 샘플링 비율을 설정합니다. 로거 인스턴스에서 생성하는 로그는 모두 지정한 샘플링 비율(기본값 1.0=모든 로그)에 따라 무작위로 샘플링됩니다.  **참고**: Longcat 로그는 샘플링되지 않습니다.            |
| `build()`                        | 전체 옵션을 설정한 후 새 로거 인스턴스를 빌드합니다.                                                                                                                                                                                                                       |

### 전역 구성

해당 로거에서 보낸 로그 전체에서 태그나 속성을 추가/제거하려면 다음 함수를 찾으세요.

#### 전역 태그

##### 태그 추가

특정 로거에서 보낸 로그 전체에 태그를 추가하려면 `addTag("<TAG_KEY>", "<TAG_VALUE>")` 함수를 사용하세요. 

```kotlin
// 각각에 따라 "build_type:debug" 또는 "build_type:release" 태그를 추가함
logger.addTag("build_type", BuildConfig.BUILD_TYPE)

// "device:android" 태그를 추가함
logger.addTag("device", "android")
```

`<TAG_VALUE>`는 `String`이어야 합니다.

##### 태그 제거

특정 로거에서 보낸 로그 전체를 삭제하려면 `removeTagsWithKey("<TAG_KEY>")` 함수를 사용하세요.

```kotlin
// "build_type"로 시작하는 태그를 모두 삭제함
logger.removeTagsWithKey("build_type")
```

자세한 정보는 [태그 시작하기][7]를 참고하세요.

#### 전역 속성

##### 속성 추가

기본적으로 로거에서 보낸 로그 전체에 다음 속성이 추가됩니다.

* `http.useragent` 및 추출 `device`와 `OS` 속성
* `network.client.ip`와 추출된 지역 속성(`country`, `city`)

특정 로거에서 보낸 로그 전체에 커스텀 속성을 추가하려면 `addAttribute("<ATTRIBUTE_KEY>", "<ATTRIBUTE_VALUE>")` 함수를 사용하세요.

```kotlin
// 정수 값과 "version_code" 속성을 추가함
logger.addAttribute("version_code", BuildConfig.VERSION_CODE)

// 문자열 값과 "version_name" 속성을 추가함
logger.addAttribute("version_name", BuildConfig.VERSION_NAME)
```

`<ATTRIBUTE_VALUE>`는 기본 `String` 또는 Date일 수 있습니다.

##### 속성 제거

특정 로거에서 보낸 로그 전체에 커스텀 속성을 제거하려면 `removeAttribute("<ATTRIBUTE_KEY>", "<ATTRIBUTE_VALUE>")` 함수를 사용하세요.

```kotlin
// 향후 로그 전송에서 "version_code" 속성을 제거함
logger.removeAttribute("version_code")

// 향후 로그 전송에서 "version_name" 속성을 제거함
logger.removeAttribute("version_name")
```

## 배치 수집

모든 로그는 먼저 배치로 로컬 디바이스에 저장됩니다. 각 배치는 수신 사양을 따릅니다. 네트워크가 사용 가능하고 Datadog SDK가 최종 사용자 경험에 영향을 미치지 않을 만큼 배터리가 충분하면 즉시 전송됩니다. 애플리케이션이 포그라운드에 있는데 네트워크를 사용할 수 없거나 데이터 업로드가 실패하면 배치는 전송에 성공할 때까지 대기 상태로 보관됩니다.

따라서 사용자가 오프라인 중에 애플리케이션을 열어도 데이터 손실이 없습니다.

SDK가 디스크 공간을 많이 차지하지 않도록 오래된 디스크 데이터는 자동으로 삭제됩니다.

Datadog에 업로드되기 전 데이터는 애플리케이션의 캐시 디렉터리에 일반 텍스트 형식으로 저장됩니다. [Android의 애플리케이션 샌드박스][6]가 이 캐시 폴더를 보호하기 때문에 대부분의 디바이스에서는 애플리케이션의 데이터를 읽을 수 없습니다. 그러나 루팅된 모바일 디바이스나 템퍼링된 Linux 커널에서는 저장된 데이터를 읽을 수 있습니다.

## 확장

### Timber

Timber를 사용한 기존 코드베이스가 있는 경우에는 [전용 라이브러리][9]를 사용해 Datadog로 로그를 전송할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-android/tree/develop/features/dd-sdk-android-logs
[2]: https://github.com/DataDog/dd-sdk-android/blob/develop/CHANGELOG.md
[3]: /ko/account_management/api-app-keys/#client-tokens
[4]: /ko/account_management/api-app-keys/#api-keys
[5]: /ko/real_user_monitoring/error_tracking/android/#upload-your-mapping-file
[6]: /ko/logs/processing/attributes_naming_convention/
[7]: /ko/getting_started/tagging/
[8]: https://source.android.com/security/app-sandbox
[9]: https://github.com/DataDog/dd-sdk-android/tree/develop/integrations/dd-sdk-android-timber