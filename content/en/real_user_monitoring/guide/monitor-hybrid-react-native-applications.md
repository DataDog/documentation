---
title: Monitor Hybrid React Native Applications

description: Guide for monitoring hybrid React Native applications.
further_reading:
- link: '/monitors/create/types/real_user_monitoring/'
  tag: 'Documentation'
  text: 'Learn about RUM Monitors'
---

## Overview

React Native is a JavaScript framework for developing hybrid mobile applications that can run natively on both Android and iOS.

If you have a hybrid application that is built on React Native, you can use Datadog to monitor the same application from both the native Android or iOS side and the React Native side.

RUM Events from both of these sources are reported as coming from the same application and the same source in Datadog RUM.

## Limitations

- For **errors, resources, and interactions tracking**, the SDKs can work in the following ways:
  - Through *auto-instrumentation* - Some React classes and methods are modified to automate this. Auto-instrumentation for JavaScript errors, resources, and interactions can only be started from JavaScript code.
  - Through *manual instrumentation* - For example, if you want to report something that you consider an error, but which is not going to crash the app. 
- You can share the same instance of the core SDK between native and React Native without having to initialize the SDK on both sides separately. This allows you to initialize the native SDK on either the native side or on the React Native side (by calling `DdSdkReactNative.initialize`) and have it initialized for both sides, with events appearing in the same RUM session. React Native uses the default core instance. This means that you can use *manual instrumentation* on both sides, but *auto-instrumentation* is only activated for the side that the SDK was initialized.
- You can report Datadog RUM events or logs only after the initialization. If you have not initialized the SDK yet, events and legs are not sent.
- You cannot change the source attribute of a RUM session - all your RUM events appear under the same source.

## Monitor React Native apps with native content

Before you can start monitoring Reactive Native apps with native content, you need to initialize the React Native SDK.

### Initialize the React Native SDK

In order to initialize the SDK on both the React Native and the native side, you can follow the [React Native Monitoring documentation][1]. 

With this setup, you can call both the native and React Native SDKs for logs, traces and RUM.

We recommend this solution if you haven't used our SDK on the native side before you initialize it on the React Native side.

{{< tabs >}}
{{% tab "Android" %}}
On Android, add the Datadog Android SDKs to your dependencies in your `android/app/build.gradle` file:

```java
// The version is set by @datadog/mobile-react-native
implementation "com.datadoghq:dd-sdk-android-rum"
implementation "com.datadoghq:dd-sdk-android-logs"
implementation "com.datadoghq:dd-sdk-android-trace"
implementation "com.datadoghq:dd-sdk-android-webview"
```

{{% /tab %}}
{{% tab "iOS" %}}

On iOS, add the Datadog iOS SDKs to your dependencies in your ios/Podfile to use in Objective C files:

```ruby
# Make sure the version matches the one from node_modules/@datadog/mobile-react-native/DatadogSDKReactNative.podspec
pod 'DatadogSDKObjc', '~> 2.5.0'
```

{{% /tab %}}
{{< /tabs >}}

### Tracking native RUM views

If you use a navigation library for your React Native app like `react-navigation`, using the `nativeViewTracking` configuration option creates many duplicate views.

If this is the case, track your native RUM Views manually. See documentation for [iOS][2] and for [Android][3].

### Tracking native RUM resources

If you have enabled tracing with your backend, first-party hosts for your native RUM Resources are the same as for your React Native RUM resources.

{{< tabs >}}
{{% tab "Android" %}}

If you use OkHttp, you can use Datadog's interceptor to [automatically track network requests][1]. Alternatively, you can [manually track resources][2].

[1]: https://docs.datadoghq.com/real_user_monitoring/ios/advanced_configuration/?tab=objectivec#automatically-track-network-requests
[2]: https://docs.datadoghq.com/real_user_monitoring/android/advanced_configuration/?tab=kotlin#automatically-track-network-requests

{{% /tab %}}
{{% tab "iOS" %}}

You can track network requests by monitoring your `URLSession`. Learn more about how to [automatically track network requests][3].

[3]: https://docs.datadoghq.com/real_user_monitoring/android/advanced_configuration/?tab=kotlin#custom-resources
{{% /tab %}}
{{< /tabs >}}

### Limitations

If you write any native code that relies on the Datadog SDK, make sure you execute that code **after** initializing the SDK on the React Native side. When you initialize the SDK on the React Native side, it is also initialized on the native side.

## Monitor native apps with React Native screens

Before you can start monitoring Reactive Native apps with native content, you need to initialize the React Native SDK.

### Initialize the React Native SDK

Install the React Native Datadog SDK with the following command options:

```shell
yarn add @datadog/mobile-react-native
```

or

```shell
npm install @datadog/mobile-react-native
```

{{< tabs >}}
{{% tab "Android" %}}

Add the Datadog Android SDK to your dependencies in your `android/app/build.gradle` file:

```gradle
// The version is set by @datadog/mobile-react-native
implementation "com.datadoghq:dd-sdk-android-rum"
implementation "com.datadoghq:dd-sdk-android-logs"
implementation "com.datadoghq:dd-sdk-android-trace"
implementation "com.datadoghq:dd-sdk-android-webview"
```

Initialize the SDK on the native side. See the official [Android][1] documentation for instructions.

[1]: /real_user_monitoring/mobile_and_tv_monitoring/setup/android/?tab=kotlin

{{% /tab %}}
{{% tab "iOS" %}}

Initialize the SDK on the native side. See the official [iOS][1] documentation for instructions.

[1]: /real_user_monitoring/mobile_and_tv_monitoring/setup/ios/?tab=cocoapods

{{% /tab %}}
{{< /tabs >}}

### Instrumenting React Native RUM Views

{{< tabs >}}
{{% tab "Android" %}}

Use a `ComponentPredicate` to filter out native views that are created by your navigation libraries:

```kotlin
// Adapt the Fragment type to your View tracking strategy
class RNComponentPredicate : ComponentPredicate<Fragment> {
    override fun accept(component: Fragment): Boolean {
        // Identify and drop react native screen views
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
Then, use `@datadog/mobile-react-navigation` to track your views.

If you have enabled ProGuard obfuscation, add rules to prevent obfuscation of the target packages in release builds.

{{% /tab %}}
{{% tab "iOS" %}}

Use a `UIKitRUMViewsPredicate` to filter out native views that are created by your navigation libraries:

```swift
class RNHybridPredicate: UIKitRUMViewsPredicate {
    var defaultPredicate = DefaultUIKitRUMViewsPredicate()

    func rumView(for viewController: UIViewController) -> RUMView? {
        let canonicalClassName = NSStringFromClass(type(of: viewController))
        // Dropping RN Views
        if (canonicalClassName.starts(with: "RN")) {
            return nil
        }

        return defaultPredicate.rumView(for: viewController)
    }
}

// Use it in your RUM configuration
let rumConfiguration = RUM.Configuration(
    applicationID: applicationId,
    uiKitViewsPredicate: RNHybridPredicate(),
)
```

{{% /tab %}}
{{< /tabs >}}

### Instrumenting React Native errors, interactions, and resources

Wrap your React Native app with the `DatadogProvider` component to automatically register React Native RUM errors, interactions, and resources:

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

To remove duplicated interactions on **Android**, filter out the React Native interactions on the native side with an EventMapper:

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

If you have enabled ProGuard obfuscation, add rules to prevent obfuscation of the target packages in release builds.

### Limitations

If you specified a `resourceEventMapper` or `actionEventMapper` in your React Native configuration, resources and actions won't be dropped if you return `null` in the mapper.

To keep this functionality, add the following snippets in your native configuration for your platform:

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
            // You can add your custom event mapper logic here
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
        // You can add your custom event mapper logic here
        return resourceEvent
    },
    actionEventMapper: { actionEvent in
        if actionEvent.context?.contextInfo["_dd.resource.drop_action"] != nil {
            return nil
        }
        // You can add your custom event mapper logic here
        return resourceEvent
    }
)
```

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/mobile_and_tv_monitoring/setup/reactnative/
[2]: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/ios/?tab=swift#custom-views
[3]: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/?tab=kotlin#custom-views
