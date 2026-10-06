---
description: React Native 애플리케이션용 Datadog Feature Flags를 설정하세요.
further_reading:
- link: https://openfeature.dev/docs/reference/sdks/client/web/react/
  tag: OpenFeature
  text: OpenFeature React SDK
- link: /feature_flags/client/
  tag: 설명서
  text: 클라이언트 측 Feature Flags
- link: /real_user_monitoring/application_monitoring/react_native/
  tag: 설명서
  text: React Native 모니터링
- link: /feature_flags/guide/proxy_sdk_traffic/
  tag: 가이드
  text: Feature Flag SDK 트래픽 프록시
title: React Native Feature Flags
---
## 개요 {#overview}

이 페이지에서는 Datadog Feature Flags SDK를 사용하여 React Native 애플리케이션을 계측하는 방법을 설명합니다. Datadog Feature Flags는 앱의 기능 가용성을 원격으로 제어하고, 안전하게 실험하며, 새로운 경험을 안심하고 제공할 수 있는 통합된 방법을 제공합니다.

React Native용 Datadog Feature Flags SDK는 Feature Flags 관리를 위한 오픈 표준인 [OpenFeature][1]를 기반으로 구축되었습니다. 이 가이드에서는 SDK를 설치하고, Datadog 공급자를 구성하며, React Native 컴포넌트에서 플래그를 평가하는 방법을 설명합니다.

## 요구 사항 {#requirements}

- **React Native** 버전 0.65 이상
- **iOS** 버전 13 이상
- **Android** API 레벨 23 이상
- **Datadog React Native SDK**(`@datadog/mobile-react-native`)를 먼저 초기화해야 합니다.

## 설치 {#installation}

원하는 패키지 관리자를 사용하여 Datadog React Native SDK, OpenFeature 공급자 및 OpenFeature React SDK를 설치하세요.

{{< tabs >}}
{{% tab "npm" %}}
{{< code-block lang="bash" >}}
npm install @datadog/mobile-react-native @datadog/mobile-react-native-openfeature @openfeature/react-sdk @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}

{{% tab "yarn" %}}
{{< code-block lang="bash" >}}
yarn add @datadog/mobile-react-native @datadog/mobile-react-native-openfeature @openfeature/react-sdk @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### iOS 설정 {#ios-setup}

추가된 포드를 설치하세요.

{{< code-block lang="bash" >}}
(cd ios && pod install)
{{< /code-block >}}

### Android 설정 {#android-setup}

React Native 버전 0.68 이상을 사용하는 경우 Java 17을 사용하세요. React Native 버전 0.67 이하를 사용하는 경우 Java 11을 사용하세요.

`android/build.gradle` 파일에서 `kotlinVersion`을 지정하여 Kotlin 종속성 간의 충돌을 방지하세요.

{{< code-block lang="groovy" filename="build.gradle" >}}
buildscript {
    ext {
        kotlinVersion = "1.8.21"
    }
}
{{< /code-block >}}

## SDK 초기화 {#initialize-the-sdk}

React Native용 Datadog OpenFeature 공급자를 사용하려면 먼저 핵심 Datadog React Native SDK를 초기화한 후 Feature Flags를 활성화해야 합니다. 클라이언트 토큰을 생성하려면 [클라이언트 토큰][2]을 참조하세요.

### 옵션 1: DatadogProvider 컴포넌트 사용 {#option-1-using-datadogprovider-component}

`DatadogProvider` 컴포넌트를 사용하여 SDK를 초기화하는 경우 `onInitialized` 콜백에서 Feature Flags를 활성화하세요.

```tsx
import { DatadogProvider, DatadogProviderConfiguration, DdFlags } from '@datadog/mobile-react-native';
import { DatadogOpenFeatureProvider } from '@datadog/mobile-react-native-openfeature';
import { OpenFeature, OpenFeatureProvider } from '@openfeature/react-sdk';

const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    trackingConsent,
    {
      rumConfiguration: {
        applicationId: '<APPLICATION_ID>',
      },
      // ...
    },
);
config.site = '{{< region-param key="dd_site" code="true" >}}';

export default function App() {
    return (
        <DatadogProvider
            configuration={config}
            onInitialized={async () => {
                await DdFlags.enable();

                const provider = new DatadogOpenFeatureProvider();
                OpenFeature.setProvider(provider);
            }}
        >
            <OpenFeatureProvider>
                <Navigation />
            </OpenFeatureProvider>
        </DatadogProvider>
    );
}
```

### 옵션 2: 명령형 초기화 사용 {#option-2-using-imperative-initialization}

SDK를 명령형으로 초기화하는 경우 초기화가 완료된 후 Feature Flags를 활성화하세요.

```tsx
import { DdSdkReactNative, DdFlags, CoreConfiguration } from '@datadog/mobile-react-native';
import { DatadogOpenFeatureProvider } from '@datadog/mobile-react-native-openfeature';
import { OpenFeature } from '@openfeature/react-sdk';

(async () => {
    const config = new CoreConfiguration(
        '<CLIENT_TOKEN>',
        '<ENVIRONMENT_NAME>',
        '<APPLICATION_ID>'
    );
    config.site = '{{< region-param key="dd_site" code="true" >}}';

    await DdSdkReactNative.initialize(config);

    // Enable Feature Flags after core SDK initialization
    await DdFlags.enable();

    // Set the Datadog provider with OpenFeature
    const provider = new DatadogOpenFeatureProvider();
    OpenFeature.setProvider(provider);
})();
```

<div class="alert alert-info">Feature Flags SDK를 사용하면 플래그 평가 데이터를 Datadog으로 전송하는 기능이 자동으로 활성화됩니다. 제공 <code>rumIntegrationEnabled</code> 및 <code>trackExposures</code> 파라미터를 <code>DdFlags.enable()</code> 호출에 전달하여 이 동작을 구성하세요.</div>

## 평가 컨텍스트 설정 {#set-the-evaluation-context}

평가 컨텍스트를 사용하여 플래그 평가가 누구 또는 무엇에 적용되는지 정의합니다. 평가 컨텍스트에는 반환할 플래그 변형을 결정하는 데 사용되는 사용자 또는 세션 정보가 포함됩니다. 타겟팅 규칙에서 이러한 속성을 참조하여 각 변형을 표시할 대상을 제어하세요.

{{< code-block lang="javascript" >}}
import { OpenFeature } from '@openfeature/react-sdk';

const evaluationContext = {
  targetingKey: 'user-123',
  user_id: '123',
  email: 'user@example.com',
  tier: 'premium',
};

OpenFeature.setContext(evaluationContext);
{{< /code-block >}}

<div class="alert alert-info">해당 <code>targetingKey</code> 항목은 백분율 기반 타겟팅의 무작위화 대상으로 사용됩니다. 플래그가 대상의 백분율(예: 50%)을 타겟팅할 때, <code>targetingKey</code> 항목은 사용자가 어떤 '버킷'에 속하는지 결정합니다. 사용자의 <code>targetingKey</code> 항목이 동일한 경우 주어진 플래그에 대해 항상 동일한 변형을 받습니다.</div>

## 애플리케이션 래핑 {#wrap-your-application}

`OpenFeatureProvider` 컴포넌트로 애플리케이션을 래핑하세요. 이렇게 하면 React 컨텍스트를 통해 모든 하위 컴포넌트에서 Feature Flags를 사용할 수 있습니다.

{{< code-block lang="tsx" >}}
import { OpenFeatureProvider } from '@openfeature/react-sdk';

function App() {
    return (
        <OpenFeatureProvider>
            <YourApp />
        </OpenFeatureProvider>
    );
}
{{< /code-block >}}

## 플래그 평가 {#evaluate-flags}

OpenFeature React SDK는 컴포넌트 내에서 플래그를 평가하기 위한 훅을 제공합니다. 각 훅은 구성한 평가 컨텍스트를 기반으로 플래그 값을 반환합니다. 플래그 평가는 _로컬에서 즉시_ 수행됩니다. SDK는 로컬에 캐시된 데이터를 사용하므로 플래그를 평가할 때 네트워크 요청이 발생하지 않습니다.

### 불리언 플래그 {#boolean-flags}

on/off 또는 true/false 조건을 나타내는 플래그에는 `useBooleanFlagValue(key, defaultValue)`를 사용하세요.

{{< code-block lang="jsx" >}}
import { useBooleanFlagValue } from '@openfeature/react-sdk';

function CheckoutButton() {
  const isNewCheckoutEnabled = useBooleanFlagValue('new_checkout_button', false);

  if (isNewCheckoutEnabled) {
    return <NewCheckoutButton />;
  }

  return <LegacyCheckoutButton />;
}
{{< /code-block >}}

### String 플래그 {#string-flags}

여러 변형 또는 구성 문자열 중에서 선택하는 플래그에는 `useStringFlagValue(key, defaultValue)`를 사용하세요.

{{< code-block lang="jsx" >}}
import { useStringFlagValue } from '@openfeature/react-sdk';

function ThemedComponent() {
  const theme = useStringFlagValue('ui_theme', 'light');

  switch (theme) {
    case 'dark':
      return <DarkTheme />;
    case 'light':
    default:
      return <LightTheme />;
  }
}
{{< /code-block >}}

### 숫자 플래그 {#number-flags}

제한, 백분율, 승수와 같은 숫자 플래그에는 `useNumberFlagValue(key, defaultValue)`를 사용하세요.

{{< code-block lang="jsx" >}}
import { useNumberFlagValue } from '@openfeature/react-sdk';

function CartDisplay() {
  const maxItems = useNumberFlagValue('max_cart_items', 20);

  return <Cart maxItems={maxItems} />;
}
{{< /code-block >}}

### 개체 플래그 {#object-flags}

구조화된 구성 데이터에는 `useObjectFlagValue(key, defaultValue)`를 사용하세요.

{{< code-block lang="jsx" >}}
import { useObjectFlagValue } from '@openfeature/react-sdk';

function Banner() {
  const config = useObjectFlagValue('promo_banner', {
    color: '#00A3FF',
    message: 'Welcome!',
  });

  return <PromoBanner color={config.color} message={config.message} />;
}
{{< /code-block >}}

### Suspense 지원 {#suspense-support}

내장 [suspense](https://react.dev/reference/react/Suspense) 지원을 사용하면 공급자 초기화가 완료될 때까지 또는 컨텍스트가 변경될 때 Feature Flags가 적용된 컴포넌트가 표시되지 않도록 할 수 있습니다. 이 기능을 사용하려면 훅 옵션에 `{ suspend: true }`를 전달하세요.

예시는 다음과 같습니다.

{{< code-block lang="jsx" >}}
import { useBooleanFlagValue } from '@openfeature/react-sdk';
import { Suspense } from 'react';

function Content() {
  // Display a loading message if the component uses feature flags and the provider is not ready
  return (
    <Suspense fallback={"Loading..."}>
      <WelcomeMessage />
    </Suspense>
  );
}

function WelcomeMessage() {
  const showNewMessage = useBooleanFlagValue('show-new-welcome-message', false, { suspend: true });

  return (
    <>
      {showNewMessage ? (
        <p>Welcome! You're seeing the new experience.</p>
      ) : (
        <p>Welcome back!</p>
      )}
    </>
  );
}
{{< /code-block >}}

### 플래그 평가 세부 정보 {#flag-evaluation-details}

플래그 값 외에 추가 정보가 필요한 경우 세부 정보 훅을 사용하세요. 이 메서드는 평가된 값과 평가 이유를 설명하는 메타데이터를 모두 반환합니다.

* `useBooleanFlagDetails(key, defaultValue)`
* `useStringFlagDetails(key, defaultValue)`
* `useNumberFlagDetails(key, defaultValue)`
* `useObjectFlagDetails(key, defaultValue)`

예시는 다음과 같습니다.

{{< code-block lang="jsx" >}}
import { useStringFlagDetails } from '@openfeature/react-sdk';

function PaywallLayout() {
  const details = useStringFlagDetails('paywall_layout', 'control');

  console.log(details.value);   // Evaluated value (for example: "A", "B", or "control")
  console.log(details.variant); // Variant name, if applicable
  console.log(details.reason);  // Description of why this value was chosen

  return <Layout variant={details.value} />;
}
{{< /code-block >}}

Feature Flag 세부 정보는 평가 동작을 디버깅하고 사용자가 특정 값을 받은 이유를 이해하는 데 도움이 됩니다.

## 완전한 예 {#complete-example}

React Native 애플리케이션에서 Datadog Feature Flags를 설정하고 사용하는 방법을 보여주는 전체 예시는 다음과 같습니다.

```tsx
import { Suspense } from 'react';
import { View } from 'react-native';
import { DatadogProvider, DatadogProviderConfiguration, DdFlags } from '@datadog/mobile-react-native';
import { DatadogOpenFeatureProvider } from '@datadog/mobile-react-native-openfeature';
import { OpenFeature, OpenFeatureProvider, useBooleanFlagValue } from '@openfeature/react-sdk';

const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    trackingConsent,
    {
      rumConfiguration: {
        applicationId: '<APPLICATION_ID>',
      },
      // ...
    },
);

// Wrap your app with the DatadogProvider and OpenFeatureProvider.
export default function AppWithProviders() {
    // Based on your auth state.
    const user = getCurrentUser();

    return (
        <DatadogProvider
            configuration={config}
            onInitialized={async () => {
                await DdFlags.enable();

                const provider = new DatadogOpenFeatureProvider();

                const evaluationContext = {
                    targetingKey: user.id,
                    region: user.country,
                };

                OpenFeature.setProvider(provider, evaluationContext);
            }}
        >
          <Suspense fallback={<Loading />}>
            <OpenFeatureProvider suspendUntilReady>
                <App />
            </OpenFeatureProvider>
          </Suspense>
        </DatadogProvider>
    );
}

// Use feature flags in your components
function App() {
    const showNewFeature = useBooleanFlagValue('new_feature', false);

    return (
        <View>
            {showNewFeature ? <NewFeature /> : <ExistingFeature />}
        </View>
    );
}
```

## 평가 컨텍스트 업데이트 {#update-the-evaluation-context}

초기화 후 평가 컨텍스트를 업데이트(예: 사용자가 로그인할 때)하려면`OpenFeature.setContext()`를 사용하세요.

{{< code-block lang="tsx" >}}
import { OpenFeature } from '@openfeature/react-sdk';

// When a user logs in
function onUserLogin(user) {
    OpenFeature.setContext({
        targetingKey: user.id,
        email: user.email,
        plan: user.plan,
    });
}
{{< /code-block >}}

## Feature Flags 옵션 구성 {#configure-feature-flags-options}

Feature Flags 동작을 사용자 지정하려면 `DdFlags.enable()`에 구성 옵션을 전달하세요.

{{< code-block lang="tsx" >}}
await DdFlags.enable({
    // Send flag evaluation data to RUM for session analysis (default: true)
    rumIntegrationEnabled: true,
    // Track flag exposures for analytics (default: true)
    trackExposures: true,
});
{{< /code-block >}}

`rumIntegrationEnabled`
: `true`(기본값)인 경우 플래그 평가가 RUM에서 추적되므로 사용자 세션과 상관관계를 분석할 수 있습니다. 이를 통해 _“변형 B에서 사용자가 더 많은 오류를 경험하나요?”_와 같은 분석이 가능합니다.

`trackExposures`
: `true`(기본값)인 경우 SDK는 플래그가 평가될 때 자동으로 _노출 이벤트_를 기록합니다. 이러한 이벤트에는 어떤 플래그에 액세스했는지, 어떤 변형이 제공되었는지, 그리고 어떤 컨텍스트에서 제공되었는지에 대한 메타데이터가 포함되어 있습니다. 이러한 이벤트는 Datadog으로 전송되어 기능 채택을 분석할 수 있습니다.

## 컨텍스트 속성 요구 사항 {#context-attribute-requirements}

<div class="alert alert-warning">
평가 컨텍스트 속성은 평면 원시 값(문자열, 숫자, 불리언)이어야 합니다. 중첩된 객체와 배열은 <strong>지원되지 않으며</strong> 평가 컨텍스트에서 제외됩니다.
</div>

평가 컨텍스트에서 평면 속성을 사용하세요.

{{< code-block lang="javascript" >}}
OpenFeature.setContext({
    targetingKey: 'user-123',
    userId: 'user-123',
    tier: 'premium',
    age: 25
});
{{< /code-block >}}

중첩된 객체와 배열을 피하세요.

{{< code-block lang="javascript" >}}
// These attributes will be dropped from the evaluation context with a console warning.
OpenFeature.setContext({
    targetingKey: 'user-123',
    user: { id: 'user-123' },        // nested object - NOT SUPPORTED
    features: ['beta', 'analytics']  // array - NOT SUPPORTED
});
{{< /code-block >}}

## 테스트 {#testing}

실제 `DatadogOpenFeatureProvider`를 사용하여 전용 Datadog 테스트 환경에서 테스트하거나, OpenFeature의 `TypedInMemoryProvider`로 교체하여 테스트 코드에서 직접 플래그 값을 제어할 수 있습니다. 이 섹션에서는 테스트를 독립적이고 오프라인 상태로 유지하는 인메모리 방식을 보여줍니다. `TypedInMemoryProvider`는 React Native Feature Flags용으로 이미 설치된 `@openfeature/web-sdk`에서 내보냅니다.

{{< code-block lang="tsx" >}}
import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { OpenFeature, OpenFeatureProvider, useBooleanFlagValue } from '@openfeature/react-sdk';
import { TypedInMemoryProvider } from '@openfeature/web-sdk';

const flags = {
    new_checkout_button: {
        variants: { on: true, off: false },
        defaultVariant: 'on',
        disabled: false,
    },
};

beforeEach(async () => {
    await OpenFeature.setProviderAndWait(new TypedInMemoryProvider(flags));
});

afterAll(async () => {
    await OpenFeature.close();
});

function CheckoutButton() {
    const enabled = useBooleanFlagValue('new_checkout_button', false);
    return <Text>{enabled ? 'New checkout' : 'Legacy checkout'}</Text>;
}

test('new checkout button is enabled', () => {
    render(
        <OpenFeatureProvider>
            <CheckoutButton />
        </OpenFeatureProvider>
    );

    expect(screen.getByText('New checkout')).toBeTruthy();
});
{{< /code-block >}}

Web SDK 플래그 형태에는 `variants`, `defaultVariant` 및 `disabled`가 필요합니다. 훅이 기본 공급자를 기준으로 평가되지 않도록 컴포넌트를 렌더링하기 전에 `setProviderAndWait`를 사용하세요.

## 문제 해결 {#troubleshooting}

### 반환된 플래그 없음 {#no-flags-returned}

플래그 평가가 기본값을 반환하는 경우 다음을 확인하세요.

1. `DdFlags.enable()`을 호출하기 전에 Datadog React Native SDK가 초기화되었는지 확인하세요.
2. OpenFeature 공급자를 설정하기 전에 `DdFlags.enable()`가 완료되었는지 확인하세요.
3. 플래그를 평가하기 전에 평가 컨텍스트가 설정되었는지 확인하세요.
4. Datadog Feature Flags 대시보드에서 플래그가 존재하고 활성화되어 있는지 확인하세요.

### iOS 포드 설치 오류 {#ios-pod-install-errors}

`use_frameworks!`이 `Podfile`에서 활성화된 경우 `pod install` 중에 오류가 발생할 수 있습니다. SDK pod를 정적 라이브러리로 설치하려면 `Podfile`을 편집하세요.

{{< code-block lang="ruby" filename="Podfile" >}}
static_libraries = ['DatadogSDKReactNative']

pre_install do |installer|
  installer.pod_targets.each do |pod|
    if static_libraries.include?(pod.name)
      def pod.static_framework?;
        true
      end
      def pod.build_type;
        Pod::BuildType.static_library
      end
    end
  end
end
{{< /code-block >}}

### Feature Flags 초기화되지 않음 오류 {#feature-flags-not-initialized-error}

Feature Flags가 초기화되지 않았다는 오류가 표시되면 초기화 순서를 확인하세요.

1. 먼저 핵심 Datadog React Native SDK를 초기화하세요(`DdSdkReactNative.initialize()` 또는 `DatadogProvider`).
2. SDK 초기화 후 `DdFlags.enable()`을 호출하세요.
3. 플래그를 활성화한 후 `DatadogOpenFeatureProvider`를 생성하고 설정하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/
[2]: /ko/account_management/api-app-keys/#client-tokens