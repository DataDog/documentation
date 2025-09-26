---
description: 하이브리드 React Native 애플리케이션 모니터 가이드입니다.
further_reading:
- link: /monitors/create/types/real_user_monitoring/
  tag: 설명서
  text: RUM 모니터에 대해 알아보기
title: 하이브리드 React Native 애플리케이션 모니터링
---

## 개요

React Native는 Android와 iOS 모두에서 기본적으로 실행할 수 있는 하이브리드 모바일 애플리케이션을 개발하기 위한 자바스크립트 프레임워크입니다.

React Native로 빌드된 하이브리드 애플리케이션이 있는 경우, Datadog를 사용하여 네이티브 Android 또는 iOS 측과 React Native 측에서 동일하게 애플리케이션을 사용할 수 있습니다.

이 두 소스의 RUM 이벤트는 Datadog RUM에서 동일한 애플리케이션과 소스에서 발생한 것으로 보고됩니다.

## 한계

- **오류, 리소스 및 상호작용 추적**의 경우 SDK는 다음과 같은 방식으로 작동합니다.
  - *자동 계측을 통해* - 일부 React 클래스와 메서드는 이를 자동화하기 위해 수정되었습니다. JavaScript 오류, 리소스 및 상호 작용에 관한 자동 계측은 JavaScript 코드에서만 시작할 수 있습니다.
  - *수동 계측*을 통해 - 예를 들어 에러로 간주되지만 앱 충돌을 일으키지는 않는 경우입니다.
- 양쪽에서 SDK를 별도로 초기화할 필요 없이 네이티브와 React Native 간에 동일한 코어 인스턴스 SDK를 공유할 수 있습니다. 이렇게 하면 네이티브 또는 React Native 측에서 SDK를 초기화( `DdSdkReactNative.initialize` 호출)하고 동일한 RUM 세션에 이벤트가 나타나도록 양쪽 모두에 초기화할 수 있습니다. React Native는 기본 코어 인스턴스를 사용합니다. 즉, 양쪽에서 *수동 계측*을 사용할 수 있지만 *자동 계측*은 SDK 이 초기화된 쪽에서만 활성화됩니다.
- 초기화 후에만 Datadog RUM 이벤트 또는 로그를 신고할 수 있습니다. 아직 SDK를 초기화하지 않은 경우 이벤트 및 로그가 전송되지 않습니다.
- RUM 세션의 소스 속성은 변경할 수 없으며 RUM 이벤트는 동일한 소스 아래에 표시됩니다.

## 네이티브 콘텐츠가 포함된 React Native 앱 모니터링

네이티브 콘텐츠로 React Native 앱 모니터링을 시작하려면 먼저 React Native SDK를 초기화해야 합니다.

### React Native SDK 초기화

React Native와 네이티브 측 모두에서 SDK를 초기화하려면 [React Native 모니터링 설명서][1]를 따르세요. 

이 설정을 사용하면 네이티브 및 React Native SDK를 모두 호출하여 로그, 트레이스 및 RUM을 얻을 수 있습니다.

React Native 측에서 초기화하기 전에 네이티브 측에서 SDK를 사용해 보지 않은 경우 이 솔루션을 권장합니다.

{{< tabs >}}
{{% tab "Android" %}}
Android의 경우, `android/app/build.gradle` 파일의 종속성에 Datadog Android SDK를 추가합니다.

```java
// @datadog/mobile-react-native에서 이 버전 설정
implementation "com.datadoghq:dd-sdk-android-rum"
implementation "com.datadoghq:dd-sdk-android-logs"
implementation "com.datadoghq:dd-sdk-android-trace"
implementation "com.datadoghq:dd-sdk-android-webview"
```

{{% /tab %}}
{{% tab "iOS" %}}

iOS의 경우, Objective C 파일에서 사용할 Datadog iOS SDK를 ios/Podfile의 종속성에 추가합니다.

```ruby
# Make sure the version matches the one from node_modules/@datadog/mobile-react-native/DatadogSDKReactNative.podspec
pod 'DatadogSDKObjc', '~> 2.5.0'
```

{{% /tab %}}
{{< /tabs >}}

### 네이티브 RUM 뷰 추적

`react-navigation`와 같은 탐색 라이브러리를 사용하는 경우 `nativeViewTracking` 설정 옵션을 사용하면 중복된 뷰가 많이 생성됩니다.

이와 같은 경우 네이티브 RUM 뷰를 수동으로 추적하세요. [iOS][2] 및 [Android][3]용 설명서를 참고하세요.

### 네이티브 RUM 리소스 추적

백엔드에서 추적을 활성화한 경우, 네이티브 RUM 리소스의 자사 호스트는 React Native RUM 리소스의 호스트와 동일합니다.

{{< tabs >}}
{{% tab "Android" %}}

OkHttp를 사용하는 경우 Datadog 인터셉터를 사용하여 [네트워크 요청을 자동으로 추적][1]할 수 있습니다. 또는 [수동으로 리소스를 추적][2]할 수도 있습니다.

[1]: https://docs.datadoghq.com/ko/real_user_monitoring/ios/advanced_configuration/?tab=objectivec#automatically-track-network-requests
[2]: https://docs.datadoghq.com/ko/real_user_monitoring/android/advanced_configuration/?tab=kotlin#automatically-track-network-requests

{{% /tab %}}
{{% tab "iOS" %}}

`URLSession`을 모니터링하여 네트워크 요청을 추적할 수 있습니다. [네트워크 요청을 자동으로 추적하는 방법[3]을 자세히 알아보세요.

[3]: https://docs.datadoghq.com/ko/real_user_monitoring/android/advanced_configuration/?tab=kotlin#custom-resources
{{% /tab %}}
{{< /tabs >}}

### 한계

Datadog SDK에 의존하는 네이티브 코드를 작성하는 경우, React Native 측에서 SDK를 초기화한 후 해당 코드를 실행해야 합니다. React Native 측에서 SDK를 초기화하면 네이티브 측에서도 초기화됩니다.

## React Native 화면이 있는 네이티브 앱을 모니터링하세요.

네이티브 콘텐츠로 React Native 앱 모니터링을 시작하려면 먼저 Native 네이티브 SDK를 초기화해야 합니다.

### React Native SDK 초기화

다음 명령 옵션을 사용해 React Native Datadog SDK를 설치합니다.

```shell
yarn add @datadog/mobile-react-native
```

또는

```shell
npm install @datadog/mobile-react-native
```

{{< tabs >}}
{{% tab "Android" %}}

`android/app/build.gradle` 파일의 종속성에 Datadog Android SDK를 추가합니다.

```gradle
// @datadog/mobile-react-native가 이 버전 설정
implementation "com.datadoghq:dd-sdk-android-rum"
implementation "com.datadoghq:dd-sdk-android-logs"
implementation "com.datadoghq:dd-sdk-android-trace"
implementation "com.datadoghq:dd-sdk-android-webview"
```

네이티브 측에서 SDK를 초기화합니다. 지침은 공식 [Android][1] 설명서를 참고하세요.

[1]: /ko/real_user_monitoring/mobile_and_tv_monitoring/android/setup/?tab=kotlin

{{% /tab %}}
{{% tab "iOS" %}}

네이티브 측에서 SDK를 초기화합니다. 지침은 공식 [iOS][1] 설명서를 참고하세요.

[1]: /ko/real_user_monitoring/mobile_and_tv_monitoring/ios/setup/?tab=cocoapods

{{% /tab %}}
{{< /tabs >}}

### React Native RUM 뷰 계측

{{< tabs >}}
{{% tab "Android" %}}

`ComponentPredicate`을 사용하여 내비게이션 라이브러리에서 만든 기본 뷰를 필터링합니다.

```kotlin
// Fragment 유형을 내 View 추적 전략에 맞게 조정
class RNComponentPredicate : ComponentPredicate<Fragment> {
    override fun accept(component: Fragment): Boolean {
        // React Native 스크린 뷰 식별 및 드랍
        if (component.javaClass.name.startsWith("com.swmansion.rnscreens")) {
            return false
        }
        if (component.javaClass.name.startsWith("com.facebook.react")) {
            return false
        }
        return true
    }

    override fun getViewName(component: Fragment): String? {
        return null
    }
}

// Use it in your RUM configuration
rumConfiguration.useViewTrackingStrategy(FragmentViewTrackingStrategy(true, RNComponentPredicate()))
```
그런 다음 `@datadog/mobile-react-navigation`을 사용하여 뷰를 추적합니다.

ProGuard 난독화를 활성화한 경우, 릴리스 빌드에서 대상 패키지의 난독화를 방지하는 규칙을 추가하세요.

{{% /tab %}}
{{% tab "iOS" %}}

`UIKitRUMViewsPredicate`을 사용하여 내비게이션 라이브러리에서 만든 기본 뷰를 필터링합니다.

```swift
class RNHybridPredicate: UIKitRUMViewsPredicate {
    var defaultPredicate = DefaultUIKitRUMViewsPredicate()

    func rumView(for viewController: UIViewController) -> RUMView? {
        let canonicalClassName = NSStringFromClass(type(of: viewController))
        // RN Views 삭제
        if (canonicalClassName.starts(with: "RN")) {
            return nil
        }

        return defaultPredicate.rumView(for: viewController)
    }
}

// RUM 구성에서 사용
let rumConfiguration = RUM.Configuration(
    applicationID: applicationId,
    uiKitViewsPredicate: RNHybridPredicate(),
)
```

{{% /tab %}}
{{< /tabs >}}

### React Native 오류, 상호작용 및 리소스 계측하기

React Native 앱을 `DatadogProvider` 컴포넌트로 래핑하여 React Native RUM 오류, 상호작용 및 리소스를 자동으로 등록합니다.

```jsx
const configuration = {
    trackResources: true,
    trackErrors: true,
    trackInteractions: true
};

const RNApp = props => {
    useEffect(() => {
        /**
         * In here we can put fake values. The only goal of this call
         * is to empty the buffer of RUM events.
         */
        DatadogProvider.initialize({
            clientToken: 'fake_value',
            env: 'fake_value',
            applicationId: 'fake_value'
        });
    }, []);
    const navigationRef = useRef(null);

    return (
        <DatadogProvider configuration={configuration}>
            {/* Content of your app goes here */}
        </DatadogProvider>
    );
};

AppRegistry.registerComponent('RNApp', () => RNApp);
```

**Android**에서 중복된 상호작용을 제거하려면 이벤트 매퍼를 사용하여 네이티브 측에서 React Native 상호작용을 필터링하세요.

```kotlin
class RNActionEventMapper : EventMapper<ActionEvent> {
    override fun map(event: ActionEvent): ActionEvent? {
        var targetClassName = (event.context?.additionalProperties?.get("action.target.classname") as? String)
        if(targetClassName?.startsWith("com.facebook.react") == true) {
            return null
        }
        return event
    }
}

// Use it in your RUM configuration
rumConfiguration.setActionEventMapper(RNActionEventMapper())
```

ProGuard 난독화를 활성화한 경우, 릴리스 빌드에서 대상 패키지의 난독화를 방지하는 규칙을 추가하세요.

### 한계

React Native 설정에서 `resourceEventMapper` 또는 `actionEventMapper`를 지정한 경우, 매퍼에서 `null`을 반환하면 리소스 및 작업이 삭제되지 않습니다.

이 기능을 유지하려면 플랫폼의 기본 설정에 다음 스니펫을 추가하세요.

{{< tabs >}}
{{% tab "Android" %}}

```kotlin
val config = RumConfiguration.Builder(applicationId = appId)
 .setResourceEventMapper(object : EventMapper<ResourceEvent> {
        override fun map(event: ResourceEvent): ResourceEvent? {
            if (event.context?.additionalProperties?.containsKey("_dd.resource.drop_resource") == true) {
                return null
            }
            // You can add your custom event mapper logic here
            return event
        }
    })
 .setActionEventMapper(object : EventMapper<ActionEvent> {
        override fun map(event: ActionEvent): ActionEvent? {
            if (event.context?.additionalProperties?.containsKey("_dd.action.drop_action") == true) {
                return null
            }
            // 커스텀 이벤트 매퍼 로직 여기에 추가 
            return event
        }
    })
```

{{% /tab %}}
{{% tab "iOS" %}}

```swift
RUM.Configuration(
    applicationID: applicationId,
    resourceEventMapper: { resourceEvent in
        if resourceEvent.context?.contextInfo["_dd.resource.drop_resource"] != nil {
            return nil
        }
        // 커스텀 이벤트 매퍼 로직 여기에 추가 
        return resourceEvent
    },
    actionEventMapper: { actionEvent in
        if actionEvent.context?.contextInfo["_dd.resource.drop_action"] != nil {
            return nil
        }
        // 커스텀 이벤트 매퍼 로직 여기에 추가 
        return resourceEvent
    }
)
```

{{% /tab %}}
{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/mobile_and_tv_monitoring/react_native/setup/
[2]: /ko/real_user_monitoring/mobile_and_tv_monitoring/ios/advanced_configuration/?tab=swift#custom-views
[3]: /ko/real_user_monitoring/mobile_and_tv_monitoring/android/advanced_configuration/?tab=kotlin#custom-views