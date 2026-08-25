---
aliases:
- /ko/real_user_monitoring/reactnative/integrated_libraries/
code_lang: 리액티브
code_lang_weight: 20
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: 소스 코드
  text: dd-sdk-reactnative를 위한 소스 코드
- link: /real_user_monitoring/mobile_and_tv_monitoring/integrated_libraries
  tag: 설명서
  text: 통합된 라이브러리
title: RUM용 React Native 라이브러리
type: multi-code-lang
---

이 페이지에는 React Native 애플리케이션에서 사용할 수 있는 통합 라이브러리가 목록이 있습니다.

## React Navigation

### 설정

**참고**: 이 패키지는 [`react-navigation`][1] 라이브러리용 통합 패키지이므로, 먼저 필수 `mobile-react-native` SDK를 설치하고 설정해야 합니다.

NPM으로 설치하려면 다음을 실행하세요:

```sh
npm install @datadog/mobile-react-navigation
```

Yarn으로 설치하려면 다음을 실행합니다:

```sh
yarn add @datadog/mobile-react-navigation
```

### 보기 탐색 추적
네비게이션 변경 사항을 RUM View로 추적하려면 다음과 같이 `NavigationContainer` 컴포넌트의 `onReady` 콜백을 설정하세요. 필요 시 `ViewNamePredicate` 파라미터를 사용하여 자동으로 감지된 View 이름을 사용 사례에 더 적합한 이름으로 변경할 수 있습니다.

`ViewNamePredicate`에서 `null`을 반환하면 새 RUM 보기가 생성되지 않습니다. 이전 RUM 보기는 활성 상태로 유지됩니다.

```js
import * as React from 'react';
import { DdRumReactNavigationTracking, ViewNamePredicate } from '@datadog/mobile-react-navigation';
import { Route } from "@react-navigation/native";

const viewNamePredicate: ViewNamePredicate = function customViewNamePredicate(route: Route<string, any | undefined>, trackedName: string) {
  return "My custom View Name"
}

function App() {
  const navigationRef = React.useRef(null);
  return (
    <View>
      <NavigationContainer ref={navigationRef} onReady={() => {
        DdRumReactNavigationTracking.startTrackingViews(navigationRef.current, viewNamePredicate)
      }}>
        // ...
      </NavigationContainer>
    </View>
  );
}
```

**참고**: 한 번에 하나의 `NavigationContainer`만 추적이 가능하며, 다른 컨테이너를 추적해야 하는 경우 이전 컨테이너 추적을 먼저 중지하고 `DdRumReactNavigationTracking.stopTrackingViews()`를 사용하세요.

## React Native Navigation

**참고**: 이 패키지는 `react-native-navigation` 라이브러리용 통합 패키지이므로, 먼저 필수 `mobile-react-native` SDK를 설치하고 설정해야 합니다.

### 설정

NPM으로 설치하려면 다음을 실행하세요:

```sh
npm install @datadog/mobile-react-native-navigation
```

Yarn으로 설치하려면 다음을 실행합니다:

```sh
yarn add @datadog/mobile-react-native-navigation
```

### 보기 탐색 추적

네비게이션 이벤트를 추적하려면 네비게이션을 설정하기 전에 다음 줄을 추가합니다. 필요 시 `ViewNamePredicate` 콜백을 사용하여 자동으로 감지된 View 이름을 [`ComponentDidAppearEvent`][2]를 기반으로 사용 사례에 더 적합한 이름으로 변경할 수 있습니다.

`ViewNamePredicate`에서 null을 반환하면 새 RUM 보기가 생성되지 않습니다. 이전 RUM 보기는 활성 상태로 유지됩니다.

```sh
import { DdRumReactNativeNavigationTracking, ViewNamePredicate }  from '@datadog/mobile-react-native-navigation';
import { ComponentDidAppearEvent } from 'react-native-navigation';

const viewNamePredicate: ViewNamePredicate = function customViewNamePredicate(event: ComponentDidAppearEvent, trackedName: string) {
  return "My custom View Name"
}

DdRumReactNativeNavigationTracking.startTracking(viewNamePredicate);
```

## Apollo Client

**참고**: 이 패키지는 `@apollo/client` 라이브러리용 통합 패키지이므로, 먼저 필수 `mobile-react-native` SDK를 설치하고 설정해야 합니다.

### 설정

NPM으로 설치하려면 다음을 실행하세요:

```sh
npm install @datadog/mobile-react-native-apollo-client
```

Yarn으로 설치하려면 다음을 실행합니다:

```sh
yarn add @datadog/mobile-react-native-apollo-client
```

### HttpLink로 마이그레이션

`uri` 파라미터로 `ApolloClient`를 초기화하는 경우 `HttpLink`를 사용합니다.

```javascript
import { ApolloClient, HttpLink } from '@apollo/client';

// 전
const apolloClient = new ApolloClient({
    uri: 'https://my.api.com/graphql'
});

// 후
const apolloClient = new ApolloClient({
    link: new HttpLink({ uri: 'https://my.api.com/graphql' })
});
```

### Datadog Apollo Client Link를 사용하여 정보 수집

`@datadog/mobile-react-native-apollo-client`에서 `DatadogLink`를 가져와 `ApolloClient` 초기화에서 사용하세요.

```javascript
import { ApolloClient, from, HttpLink } from '@apollo/client';
import { DatadogLink } from '@datadog/mobile-react-native-apollo-client';

const apolloClient = new ApolloClient({
    link: from([
        new DatadogLink(),
        new HttpLink({ uri: 'https://my.api.com/graphql' }) // 항상 마지막 위치에 있음
    ])
});
```

Apollo Client Link에 대한 자세한 내용은 [공식 문서][3]를 참고하세요.

### GraphQL 정보 제거

GraphQL 변수에서 민감한 데이터를 제거하려면 Datadog 구성에서 `resourceEventMapper`를 사용합니다.

```javascript
const datadogConfiguration = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true,
    true,
    true
);

datadogConfiguration.resourceEventMapper = event => {
    // 변수는 JSON 문자열로 event.context['_dd.graphql.variables']에 저장됩니다.
    if (event.context['_dd.graphql.variables']) {
        const variables = JSON.parse(event.context['_dd.graphql.variables']);
        if (variables.password) {
            variables.password = '***';
        }
        event.context['_dd.graphql.variables'] = JSON.stringify(variables);
    }

    return event;
};
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://reactnavigation.org/
[2]: https://wix.github.io/react-native-navigation/api/events/#componentdidappear
[3]: https://www.apollographql.com/docs/react/api/link/introduction/