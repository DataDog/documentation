---
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: GitHub
  text: dd-sdk-android를 위한 소스 코드
- link: /real_user_monitoring
  tag: 설명서
  text: Datadog RUM 탐색
kind: documentation
title: RUM 안드로이드 고급 설정
---
## 개요

SDK를 아직 설정하지 않은 경우 [인앱 설정 지침][1]을 따르거나 [안드로이드 RUM 설정 설명서][2]를 참조하세요.

## 사용자 세션 강화

안드로이드 RUM은 사용자 활동, 화면, 오류 및 네트워크 요청과 같은 속성을 자동으로 추적합니다. RUM 이벤트 및 기본 속성에 대한 자세한 내용은 [RUM 데이터 수집 설명서][3]를 참조하세요. 커스텀 이벤트를 추적하여 사용자 세션 정보를 강화하고 수집된 속성을 보다 세밀하게 제어할 수 있습니다.

### 커스텀 보기

[자동으로 보기 추적][4] 외에도 특정 고유한 보기(예: 활동 및 조각)가 `onResume()` 수명 주기에서 표시되고 상호 작용할 때 추적할 수도 있습니다. 보기가 더 이상 표시되지 않으면 추적을 중지합니다. 대부분의 경우 이 메서드는 가장 앞쪽 `Activity` 또는 `Fragment`에서 호출되어야 합니다:


{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       fun onResume() {
         GlobalRumMonitor.get().startView(viewKey, viewName, viewAttributes)
       }

       fun onPause() {
         GlobalRumMonitor.get().stopView(viewKey, viewAttributes)
       }
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
       public void onResume() {
            GlobalRumMonitor.get().startView(viewKey, viewName, viewAttributes);
       }

       public void onPause() {
            GlobalRumMonitor.get().stopView(viewKey, viewAttributes);
       }
   ```
{{% /tab %}}
{{< /tabs >}}

### 자체 성능 타이밍 추가

RUM의 기본 특성 외에 `addTiming` API를 사용하여 애플리케이션이 시간을 소비하는 위치를 측정할 수 있습니다. 이 타이밍 측정은 현재 RUM 보기의 시작을 기준으로 합니다. 예를 들어 영웅 이미지가 나타나는 데 걸리는 시간을 측정할 수 있습니다:
{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
      fun onHeroImageLoaded() {
            GlobalRumMonitor.get().addTiming("hero_image")
      } 
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
       public void onHeroImageLoaded() {
            GlobalRumMonitor.get().addTiming("hero_image");
       }
   ```
{{% /tab %}}
{{< /tabs >}}

타이밍이 전송되면 타이밍은 `@view.custom_timings.<timing_name>`로 액세스할 수 있습니다. 예를 들어: `@view.custom_timings.hero_image`입니다. RUM 분석 또는 대시보드에서 그래프로 표시하기 전에  [측정값을 생성][10] 해야 합니다.

### 커스텀 액션

[액션 자동 추적][5] 이외에도 `RumMonitor#addAction`를 사용하여 특정 커스텀 액션(탭, 클릭, 스크롤)을 추적할 수도 있습니다. 연속 액션 추적(예: 목록을 스크롤하는 사용자 추적)의 경우 `RumMonitor#startAction` 및 `RumMonitor#stopAction`을 사용합니다.

액션 유형은 “커스텀”, “클릭”, “탭”, “스크롤”, “스와이프” 또는 “뒤로” 중 하나를 지정해야 합니다.

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       fun onUserInteraction() { 
            GlobalRumMonitor.get().addAction(actionType, name, actionAttributes)
       }
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
       public void onUserInteraction() {
            GlobalRumMonitor.get().addAction(actionType, name, actionAttributes);
       }
   ```
{{% /tab %}}
{{< /tabs >}}

### 리소스 강화

[리소스 자동 추적][6]의 경우 추적되는 각 네트워크 요청에 커스텀 속성을 추가하기 위해 커스텀 `RumResourceAttributesProvider` 인스턴스를 제공합니다. 예를 들어, 네트워크 요청의 헤더를 추적하려면 다음과 같이 구현을 생성한 후 `DatadogInterceptor`의 컨스트럭터에게 전달합니다.

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
class CustomRumResourceAttributesProvider : RumResourceAttributesProvider {
    override fun onProvideAttributes(
        request: Request,
        response: Response?,
        throwable: Throwable?
    ): Map<String, Any?> {
        val headers = request.headers
        return headers.names().associate {
            "headers.${it.lowercase(Locale.US)}" to headers.values(it).first()
        }
    }
}
```
{{% /tab %}}
{{% tab "Java" %}}
```java
public class CustomRumResourceAttributesProvider implements RumResourceAttributesProvider {
    @NonNull
    @Override
    public Map<String, Object> onProvideAttributes(
            @NonNull Request request,
            @Nullable Response response,
            @Nullable Throwable throwable
    ) {
        Map<String, Object> result = new HashMap<>();
        Headers headers = request.headers();

        for (String key : headers.names()) {
            String attrName = "headers." + key.toLowerCase(Locale.US);
            result.put(attrName, headers.values(key).get(0));
        }

        return result;
    }
}
```
{{% /tab %}}
{{< /tabs >}}

### 커스텀 리소스

[리소스 자동 추적][6] 외에도 `RumMonitor#startResource`를 통해 리소스를 로드하는 동안 `GET` 및 `POST`와 같은 메서드를 사용해 특정 커스텀 리소스(예: 네트워크 요청 및 타사 공급자 API)를 추적할 수도 있습니다. 리소스가 완전히 로드되면 `RumMonitor#stopResource`로 추적을 중지하고, 리소스를 로드하는 동안 오류가 발생하면 `RumMonitor#stopResourceWithError`로 중지하세요.

{{< tabs >}} 
{{% tab "Kotlin" %}}
   ```kotlin
       fun loadResource() {
            GlobalRumMonitor.get().startResource(resourceKey, method, url, resourceAttributes)
            try {
              // do load the resource
              GlobalRumMonitor.get().stopResource(resourceKey, resourceKind, additionalAttributes)
            } catch (e: Exception) {
              GlobalRumMonitor.get().stopResourceWithError(resourceKey, message, origin, e)
            } 
       }
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
       public void loadResource() {
            GlobalRumMonitor.get().startResource(resourceKey, method, url, resourceAttributes);
            try {
                // do load the resource
                GlobalRumMonitor.get().stopResource(resourceKey, resourceKind, additionalAttributes);
            } catch (Exception e) {
                GlobalRumMonitor.get().stopResourceWithError(resourceKey, message, origin, e);
            }
       }
   ```
{{% /tab %}}
{{< /tabs >}}

### 커스텀 오류

특정 오류를 추적하려면 오류 발생 시 메시지, 소스, 예외 및 추가 속성과 함께 모니터에 알립니다. [오류 속성 설명서][9]를 참조하세요.

   ```kotlin
      GlobalRumMonitor.get().addError(message, source, throwable, attributes)
   ```

## 커스텀 글로벌 속성 추적

RUM Android SDK가자동으로 캡처하는 [기본 RUM 속성][3] 외에도 커스텀 속성과 같은 추가 컨텍스트 정보를 RUM 이벤트에 추가하여 Datadog 내에서 관찰 가능성을 강화할 수 있습니다. 커스텀 속성을 사용하면 관찰된 사용자 행동에 대한 정보(예: 장바구니 값, 판매자 계층, 광고 캠페인 등)를 코드 수준 정보(예: 백엔드 서비스, 세션 타임라인, 오류 로그, 네트워크 상태 등)와 함께 세분화하여 분석할 수 있습니다.

### 사용자 세션 추적

RUM 세션에 사용자 정보를 추가하면 다음 작업을 쉽게 수행할 수 있습니다:
* 지정된 사용자의 이동 경로를 따릅니다.
* 오류의 영향을 가장 많이 받는 사용자를 파악합니다.
* 가장 중요한 사용자의 성능을 모니터링합니다.

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="RUM UI의 사용자 API" >}}

다음 속성은 **선택 사항**이며, 이 중에서 **적어도 하나**를 제공해야 합니다:

| 속성  | 유형 | 설명                                                                                              |
|------------|------|----------------------------------------------------------------------------------------------------|
| usr.id    | 스트링 | 고유한 사용자 식별자.                                                                                  |
| usr.name  | 스트링 | 사용자 친화적 이름. RUM UI에 기본적으로 표시됨.                                                  |
| usr.email | 스트링 | 사용자 이메일. 사용자 이름이 없는 경우 RUM UI에 표시됨. Gravatars를 가져오는 데 사용되기도 함.  |

사용자 세션을 식별하려면 다음과 같은 `setUserInfo` API를 사용합니다:

```kotlin
Datadog.setUserInfo('1234', 'John Doe', 'john@doe.com')
```

### 속성 추적

```kotlin
    // 향후 모든 RUM 이벤트에 속성을 추가합니다.
    GlobalRumMonitor.addAttribute(key, value)

    // 향후 모든 RUM 이벤트에 대한 속성을 제거합니다.
    GlobalRumMonitor.removeAttribute(key)
```

## 위젯 추적

위젯은 SDK를 통해 자동으로 추적되지 않습니다. 위젯에서 UI 인터랙션을 수동으로 전송하려면 Datadog API를 호출하세요. [예시][7]을 참조하세요.


## 초기화 파라미터

Datadog 설정을 생성할 때 `Configuration.Builder`에서 다음 방법을 사용하여 라이브러리를 초기화할 수 있습니다:

`setFirstPartyHosts()`
: 추적을 활성화하고 RUM 리소스가 `first-party`로 분류되도록 호스트를 정의합니다.

`useSite(DatadogSite)`
: 대상 데이터를 EU1, US1, US3, US5, US1_FED 및 AP1 사이트로 전환합니다.

RUM 설정을 생성할 때 `RumConfiguration.Builder`에서 다음 방법을 사용하여 RUM 기능을 활성화할 수 있습니다: 

`trackUserInteractions(Array<ViewAttributesProvider>)`
: 사용자 상호 작용(탭, 스크롤, 스와이프 등)을 추적할 수 있습니다. 이 파라미터를 사용하면 사용자가 상호 작용한 위젯을 기반으로 커스텀 속성을 RUM 작업 이벤트에 추가할 수도 있습니다.

`useViewTrackingStrategy(strategy)`
: 보기를 추적하는 데 사용되는 전략을 정의합니다. 애플리케이션의 아키텍처에 따라 [`ViewTrackingStrategy`][4]의 여러 구현 중 하나를 선택하거나 자체적으로 구현할 수 있습니다.

`trackLongTasks(durationThreshold)`
: 기본 스레드에서 `durationThreshold`보다 더 오래 걸리는 작업을 Datadog에서 긴 작업으로 추적할 수 있습니다.

`setBatchSize([SMALL|MEDIUM|LARGE])`
: Datadog으로 전송된 요청에 대해 개별 배치 크기를 정의합니다.

`setUploadFrequency([FREQUENT|AVERAGE|RARE])`
:  요청이 사용 가능한 경우 Datadog 엔드포인트에 대한 요청 빈도를 정의합니다.

`setVitalsUpdateFrequency([FREQUENT|AVERAGE|RARE|NEVER])`
: 모바일 바이탈을 수집할 때 선호하는 빈도를 설정합니다.

`setSessionSampleRate(<sampleRate>)`
: RUM 세션 샘플 속도를 설정합니다. (값 0은 RUM 이벤트가 전송되지 않음을 의미하며, 값 100은 모든 세션이 유지됨을 의미합니다.)

`setXxxEventMapper()`
: 보기, 작업, 리소스 및 오류에 대한 데이터 스크러빙 콜백을 설정합니다.


### 보기 자동 추적

활동 및 조각과 같은 보기를 자동으로 추적하려면 초기화 시 추적 전략을 제공합니다. 애플리케이션의 아키텍처에 따라 다음 전략 중 하나를 선택할 수 있습니다:

`ActivityViewTrackingStrategy`
: 애플리케이션의 모든 활동은 별개의 보기로 간주됩니다.

`FragmentViewTrackingStrategy`
: 애플리케이션의 모든 조각은 별개의 보기로 간주됩니다.

`MixedViewTrackingStrategy`
: 애플리케이션의 모든 활동이나 조각은 별개의 보기로 간주됩니다.

`NavigationViewTrackingStrategy`
: Android Jetpack Navigation 라이브러리 사용자에게 권장됩니다. 각 내비게이션 목적지는 별개의 보기로 간주됩니다.


예를 들어, 각 조각을 별개의 보기로 설정하려면 [설정][1]에서 다음 설정을 사용합니다:

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       val rumConfig = RumConfiguration.Builder(applicationId)
        .useViewTrackingStrategy(FragmentViewTrackingStrategy(...))
        .build()
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
       RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
        .useViewTrackingStrategy(new FragmentViewTrackingStrategy(...))
        .build();
   ```
{{% /tab %}}
{{< /tabs >}}


`ActivityViewTrackingStrategy`, `FragmentViewTrackingStrategy` 또는 `MixedViewTrackingStrategy`에 대해 컨스트럭터에서 `ComponentPredicate` 구현을 제공함으로써 어떤 `Fragment` 또는 `Activity`가 RUM 보기로 추적되는지 필터링할 수 있습니다:

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       val rumConfig = RumConfiguration.Builder(applicationId)
        .useViewTrackingStrategy(
        ActivityViewTrackingStrategy(
            trackExtras = true,
            componentPredicate = object : ComponentPredicate<Activity> {
                override fun accept(component: Activity): Boolean {
                    return true
                }

                override fun getViewName(component: Activity): String? = null
            })
        )
        .build()  
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
        RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
            .useViewTrackingStrategy(new ActivityViewTrackingStrategy(
                true,
                new ComponentPredicate<Activity>() {
                    @Override
                    public boolean accept(Activity component) {
                        return true;
                    }

                    @Override
                    public String getViewName(Activity component) {
                        return null;
                    }
                }
            ))
            .build();
   ```
{{% /tab %}}
{{< /tabs >}}


**참고**: 기본적으로 라이브러리는 `ActivityViewTrackingStrategy`을 사용합니다. 보기 추적 전략을 제공하지 않을 경우 직접 `startView`과 `stopView`방식을 호출하여 수동으로 보기를 전송해야 합니다.


### 네트워크 요청 자동 추적

첫 바이트까지의 시간 또는 DNS 확인과 같은 리소스(예: 타사 공급자, 네트워크 요청)에서 타이밍 정보를 가져오려면 `OkHttpClient`를 사용자 지정하여 [EventListener][8] 팩토리를 추가합니다:

1. 모듈 수준 `build.gradle` 파일에서 `dd-sdk-android-okhttp` 라이브러리에 Gradle 종속성을 추가합니다:

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
    }
    ```

2. [EventListener][8] 팩토리를 추가합니다:

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor())
        .eventListenerFactory(DatadogEventListener.Factory())
        .build()
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
       OkHttpClient okHttpClient = new OkHttpClient.Builder()
        .addInterceptor(new DatadogInterceptor())
        .eventListenerFactory(new DatadogEventListener.Factory())
        .build();
   ```
{{% /tab %}}
{{< /tabs >}}

### 긴 작업을 자동으로 추적

메인 스레드에서 오래 실행되는 작업은 애플리케이션의 시각적 성능과 반응성에 영향을 줄 수 있습니다. 이러한 작업을 추적하려면 작업이 너무 긴 것으로 간주되는 지속 시간 임계값을 정의하세요.

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       val rumConfig = RumConfiguration.Builder(applicationId)
        // ...
        .trackLongTasks(durationThreshold)
        .build()
   ```

예를 들어, 기본 `100 ms` 기간을 바꾸려면 구성에서 커스텀 임계값을 설정합니다.

   ```kotlin
      val rumConfig = RumConfiguration.Builder(applicationId)
        // ...
        .trackLongTasks(250L) // 250ms 이상의 작업을 긴 작업으로 추적
        .build()
   ```
{{% /tab %}}
{{% tab "Java" %}}
  ```java
      RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
        // ...
        .trackLongTasks(durationThreshold)
        .build();
   ```

예를 들어, 기본 `100 ms` 기간을 바꾸려면 구성에서 커스텀 임계값을 설정합니다.

   ```java
      RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
        // ...
        .trackLongTasks(250L) // 250ms 이상의 작업을 긴 작업으로 추적
        .build();
   ```
{{% /tab %}}
{{< /tabs >}}

## RUM 이벤트 수정 또는 삭제

RUM 이벤트의 일부 속성을 수정하거나 일괄 처리하기 전에 일부 이벤트를 완전히 삭제하려면 RUM Android SDK를 초기화할 때 `EventMapper<T>` 구현을 제공하세요:


{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       val rumConfig = RumConfiguration.Builder(applicationId)
        // ...
        .setErrorEventMapper(rumErrorEventMapper)
        .setActionEventMapper(rumActionEventMapper)
        .setResourceEventMapper(rumResourceEventMapper)
        .setViewEventMapper(rumViewEventMapper)
        .setLongTaskEventMapper(rumLongTaskEventMapper)
        .build()
   ```
{{% /tab %}}
{{% tab "Java" %}}
  ```java
      RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
        // ...
        .setErrorEventMapper(rumErrorEventMapper)
        .setActionEventMapper(rumActionEventMapper)
        .setResourceEventMapper(rumResourceEventMapper)
        .setViewEventMapper(rumViewEventMapper)
        .setLongTaskEventMapper(rumLongTaskEventMapper)
        .build();

   ```
{{% /tab %}}
{{< /tabs >}}

`EventMapper<T>` 인터페이스를 구현할 때 각 이벤트 유형에 대해 일부 속성만 수정할 수 있습니다:

   | 이벤트 유형    | 속성 키      | 설명                                     |
   |---------------|--------------------|-------------------------------------------------|
   | ViewEvent     | `view.referrer`      | 페이지의 초기 보기에 연결된 URL. |
   |               | `view.url`           | 보기의 URL.                                 |
   |               | `view.name`           | 보기의 이름.                                |
   | ActionEvent   |                    |                                                 |
   |               | `action.target.name` | 타겟 이름.                                     |
   |               | `view.referrer`      | 페이지의 초기 보기에 연결된 URL. |
   |               | `view.url`           | 보기의 URL.                                 |
   |               | `view.name`           | 보기의 이름.                               |
   | ErrorEvent    |                      |                                                 |
   |               | `error.message`      | 오류 메시지.                                   |
   |               | `error.stack`        | 오류의 스택트레이스.                         |
   |               | `error.resource.url` | 리소스의 URL.                             |
   |               | `view.referrer`      | 페이지의 초기 보기에 연결된 URL. |
   |               | `view.url`           | 보기의 URL.                                 |
   |               | `view.name`           | 보기의 이름.                                |
   | ResourceEvent |                    |                                                 |
   |               | `resource.url`       | 리소스의 URL.                             |
   |               | `view.referrer`      | 페이지의 초기 보기에 연결된 URL. |
   |               | `view.url`           | 보기의 URL.                                 |
   |               | `view.name`           | 보기의 이름.                                |
   | LongTaskEvent |                    |                                                 |
   |               | `view.referrer`       | 페이지의 초기 보기에 연결된 URL. |
   |               | `view.url`            | 보기의 URL.                                 |
   |               | `view.name`           | 보기의 이름.                                |

**참고**: `EventMapper<T>` 구현에서 null을 반환하면 이벤트가 삭제됩니다.

## RUM 세션 예시

애플리케이션이 Datadog RUM으로 전송하는 데이터를 제어하려면 [RUM 기능을 초기화하면서][2] 0과 100 사이의 백분율로 RUM 세션에 대한 샘플 속도를 지정할 수 있습니다.

```kotlin
val rumConfig = RumConfiguration.Builder(applicationId)
        // 여기서 RUM 세션의 75%가 Datadog으로 전송됩니다.
        .setSessionSampleRate(75.0f)
        .build()
Rum.enable(rumConfig)
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /ko/real_user_monitoring/android
[3]: /ko/real_user_monitoring/android/data_collected
[4]: /ko/real_user_monitoring/android/advanced_configuration/#automatically-track-views
[5]: /ko/real_user_monitoring/android/advanced_configuration/#initialization-parameters
[6]: /ko/real_user_monitoring/android/advanced_configuration/#automatically-track-network-requests
[7]: https://github.com/DataDog/dd-sdk-android/tree/master/sample/kotlin/src/main/kotlin/com/datadog/android/sample/widget
[8]: https://square.github.io/okhttp/features/events/
[9]: /ko/real_user_monitoring/android/data_collected/#event-specific-attributes
[10]: /ko/real_user_monitoring/explorer/search/#setup-facets-and-measures