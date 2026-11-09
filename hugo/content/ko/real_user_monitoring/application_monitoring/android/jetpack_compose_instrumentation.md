---
aliases:
- /ko/real_user_monitoring/android/jetpack_compose_instrumentation/
- /ko/real_user_monitoring/mobile_and_tv_monitoring/jetpack_compose_instrumentation/android
- /ko/real_user_monitoring/mobile_and_tv_monitoring/android/jetpack_compose_instrumentation
description: Datadog Gradle Plugin을 사용하여 Jetpack Compose를 수동 또는 자동으로 계측할 수 있습니다.
further_reading:
- link: https://github.com/DataDog/dd-sdk-android/tree/develop/integrations/dd-sdk-android-compose
  tag: 소스 코드
  text: dd-sdk-android-compose의 소스 코드
- link: https://github.com/DataDog/dd-sdk-android-gradle-plugin
  tag: 소스 코드
  text: Datadog Gradle Plugin의 소스 코드
- link: /real_user_monitoring
  tag: 문서
  text: Datadog RUM 탐색하기
title: Jetpack Compose 계측
---
## 개요 {#overview}
Jetpack Compose는 Android에서 네이티브 UI를 빌드하기 위한 툴킷입니다. 애플리케이션이 Jetpack Compose를 사용하는 경우 Datadog Gradle Plugin을 사용하여 수동 또는 자동으로 계측할 수 있습니다. 이를 통해 Android 클래식 보기에서 사용할 수 있는 것과 유사한 RUM(Real User Monitoring)을 활성화할 수 있습니다.

<div class="alert alert-info"><p>지원되는 최소 Kotlin 버전은 1.9.23입니다.</p></div>

초기 설정 후 [자동](#automatic-instrumentation) 계측과 [수동](#manual-instrumentation) 계측 중에서 선택할 수 있습니다.

## 설정 {#setup}
### 1단계 - 'dd-sdk-android-compose'를 종속성으로 선언 {#step-1-declare-dd-sdk-android-compose-as-a-dependency}
계측하려는 각 모듈의 종속성으로 `dd-sdk-android-compose`를 추가합니다. 여기에는 애플리케이션 모듈, 모든 Jetpack Compose UI 모듈 또는 Jetpack Compose를 사용하는 기능 모듈이 포함됩니다.
Jetpack Compose 계측을 위한 `dd-sdk-android-compose`의 최소 버전은 2.21.0입니다.
{{< tabs >}}
{{% tab "Groovy" %}}

```groovy
dependencies {
    implementation "com.datadoghq:dd-sdk-android-compose:x.x.x"
    //(...)
}
```
{{% /tab %}}
{{% tab "Kotlin" %}}

```kotlin
dependencies {
    implementation("com.datadoghq:dd-sdk-android-compose:x.x.x")
    //(...)
}
```
{{% /tab %}}
{{< /tabs >}}

### 2단계 - `RumConfiguration` {#step-2-enable-actions-tracking-option-in-rumconfiguration}에서 작업 추적 옵션 활성화
종속성을 추가한 후 `RumConfiguration`에서 Compose 작업 추적을 활성화합니다. 이 단계는 계측 모드와 관계없이 필요합니다.
{{< tabs >}}
{{% tab "Kotlin" %}}

```kotlin
val rumConfig = RumConfiguration.Builder(applicationId)
      //other configurations that you have already set
      .enableComposeActionTracking()
      .build()
Rum.enable(rumConfig)
```
{{% /tab %}}
{{% tab "Java" %}}

```java
RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
      //other configurations that you have already set
      .enableComposeActionTracking()
      .build();
Rum.enable(rumConfig);
```
{{% /tab %}}
{{< /tabs >}}

## 자동 계측 {#automatic-instrumentation}

최소한의 설정으로 전체 RUM 적용 범위를 확보하려면 Jetpack Compose 애플리케이션을 자동으로 계측할 수 있습니다.

[Android 설정 섹션][2]의 1단계에서 설명한 대로 빌드 스크립트에 [Datadog Gradle Plugin][3]을 선언하고 계측하려는 각 모듈에 적용하세요.

<div class="alert alert-info"><p>
Datadog Gradle Plugin은 <code>@Composable</code> 함수를 스캔하고 해당 수정자에 Semantics 태그를 추가합니다. 이 태그를 사용하면 Datadog RUM이 올바른 대상 정보를 사용하여 Compose 구성 요소에서 사용자 상호 작용을 추적할 수 있습니다. 또한 이 플러그인은 <code>NavHost</code> 사용 여부를 탐지하고 Jetpack Compose 탐색 이벤트를 수신합니다.
</p></div>

###  1단계 - 빌드 스크립트에 Datadog Gradle Plugin 선언 {#step-1-declare-datadog-gradle-plugin-in-your-buildscript}
Jetpack Compose 계측을 위한 Datadog Gradle Plugin의 최소 버전은 1.17.0입니다.
{{< tabs >}}
{{% tab "Groovy" %}}

```groovy
buildscript {
    dependencies {
        classpath "com.datadoghq:dd-sdk-android-gradle-plugin:x.x.x"
    }
}

plugins {
    id 'com.datadoghq.dd-sdk-android-gradle-plugin'
    //(...)
}
```
{{% /tab %}}
{{% tab "Kotlin" %}}

```kotlin
buildscript {
    dependencies {
        classpath("com.datadoghq:dd-sdk-android-gradle-plugin:x.x.x")
    }
}

plugins {
    id("com.datadoghq.dd-sdk-android-gradle-plugin")
    //(...)
}
```
{{% /tab %}}
{{< /tabs >}}

### 2단계 - 계측 모드 선택 {#setup-2-select-the-instrumentation-mode}
모듈의 Gradle 구성에서 원하는 Compose 계측 모드를 정의합니다.

{{< tabs >}}
{{% tab "Groovy" %}}

```groovy
datadog {
	// Other configurations that you may set before.
	//(...)

	// Jetpack Compose instrumentation mode option.
	composeInstrumentation = "AUTO"
}
```
{{% /tab %}}
{{% tab "Kotlin" %}}

```kotlin
datadog {
  // Other configurations that you may set before.
  //(...)

  // Jetpack Compose instrumentation mode option.
  composeInstrumentation = InstrumentationMode.AUTO
}
```
{{% /tab %}}
{{< /tabs >}}

사용 가능한 계측 모드:

{{< tabs >}}
{{% tab "Groovy" %}}
- `"AUTO"`: 모든 `@Composable` 함수를 계측합니다.
- `"ANNOTATION"`: `@ComposeInstrumentation` 주석이 달린 `@Composable` 함수만 계측합니다. 이 주석을 사용하여 자동 계측 범위를 정의할 수 있습니다.
- `"DISABLE"`: 계측을 완전히 비활성화합니다.
{{% /tab %}}

{{% tab "Kotlin" %}}

- `InstrumentationMode.AUTO`: 모든 `@Composable` 함수를 계측합니다.
- `InstrumentationMode.ANNOTATION`: `@ComposeInstrumentation` 주석이 달린 `@Composable` 함수만 계측합니다. 이 주석을 사용하여 자동 계측 범위를 정의할 수 있습니다.
- `InstrumentationMode.DISABLE`: 계측을 완전히 비활성화합니다.

{{% /tab %}}
{{< /tabs >}}

**참고**: `datadog` 블록에서 `composeInstrumentation`을 선언하지 않으면 자동 계측이 기본적으로 비활성화됩니다.

### 자동 계측 시 이름이 지정되는 방식{#how-names-are-assigned-with-auto-instrumentation}
자동 계측이 활성화된 경우:
-   **Compose 탐색 경로**가 **보기 이름**으로 사용됩니다.
-   대화형 요소를 래핑하는 **직접 컴포저블 함수의 이름**이 **작업 대상**으로 사용됩니다.

```kotlin
@Composable
fun AppScaffold(){
    NavHost(navController = rememberNavController(), startDestination = "Home Screen"){
      composable("Home Screen"){
        HomeScreen()
      }
    }
}

@Composable
fun CustomButton(onClick: () -> Unit) {
    Button(onClick = onClick){
       Text("Welcome Button")
    }
}
```
위 예시에 대해 다음이 적용됩니다.
-   `HomeScreen()`이 로드되면 **보기 이름**으로 'Home Screen'이 사용됩니다.
-   버튼을 클릭하면 **작업 대상**으로 'CustomButton'이 사용됩니다.

{{< img src="real_user_monitoring/android/android-auto-instrumentation-naming.png" alt="자동 계측의 기본 명명" style="width:90%;">}}


## 수동 계측 {#manual-instrumentation}

작업 및 보기 추적에 대한 더 많은 사용자 지정이나 제어가 필요한 경우 애플리케이션을 수동으로 계측할 수 있습니다.

### 작업 추적 {#actions-tracking}
특정 Jetpack Compose 구성 요소와의 사용자 상호 작용을 추적하려면 `datadog` 수정자를 적용하세요. `name` 인수는 RUM 이벤트 목록에 표시되는 보기 이름을 정의합니다.

```kotlin
@Composable
fun HomeScreen(){
 Column{
     Image(modifier = Modifier.datadog(name = "Welcome Image").clickable{
       // Action can be tracked if this image is clickable
     },
      // Other arguments
     )

     Text(modifier = Modifier.datadog(name = "Welcome Text").clickable{
       // Action can be tracked if this text is clickable
     },
      // Other arguments
     )
 }
}
```
위의 예시에서는 RUM 작업 추적의 대화형 요소에 사용자 지정 이름이 사용됩니다.

{{< img src="real_user_monitoring/android/android-actions-tracking-1.png" alt="작업 추적의 구성 요소 이름" style="width:90%;">}}


### 보기 추적 {#views-tracking}
Jetpack Compose 탐색을 기반으로 RUM 보기 추적을 활성화하려면 `NavigationViewTrackingEffect` API를 호출하고 앱의 `NavHostController`를 전달하세요.

```kotlin
@Composable
fun AppScaffold(){
	val navController = rememberNavController()
	NavigationViewTrackingEffect(
	    navController = navController,
	    trackArguments = true,
	    destinationPredicate = AcceptAllNavDestinations()
	)
	NavHost(navController = navController,
	    // other arguments
	) {
	   // (...)
	}
}
```

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-android/tree/develop/integrations/dd-sdk-android-compose
[2]: https://docs.datadoghq.com/ko/real_user_monitoring/application_monitoring/android/setup?tab=rum#step-1---declare-the-android-sdk-as-a-dependency
[3]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[4]: https://developer.android.com/develop/ui/compose/accessibility/semantics