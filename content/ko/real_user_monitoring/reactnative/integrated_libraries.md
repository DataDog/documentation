---
description: React Native 프로젝트에서 RUM 데이터를 수집합니다.
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: GitHub
  text: dd-sdk-reactnative를 위한 소스 코드
- link: https://www.datadoghq.com/blog/react-native-monitoring/
  tag: 블로그
  text: React Native 애플리케이션 모니터링
- link: real_user_monitoring/explorer/
  tag: 설명서
  text: RUM 데이터를 탐색하는 방법 알아보기
kind: faq
title: React Native 통합 라이브러리
---
## React Navigation

### 설정

**참고**: 이 패키지는 `react-navigation` 라이브러리를 위한 통합이므로 핵심 `mobile-react-native` SDK를 먼저 설치하고 설정하세요.

NPM으로 설치하려면 다음을 실행합니다:

```sh
npm install @datadog/mobile-react-navigation
```

Yarn으로 설치하려면 다음을 실행합니다:

```sh
yarn add @datadog/mobile-react-navigation
```

### 보기 탐색 추적
탐색의 변경 사항을 RUM 보기로 추적하려면 `NavigationContainer` 구성 요소의 `onready` 콜백을 다음과 같이 설정합니다. 필요 시 `ViewNamePredicate` 파라미터를 사용하여 자동으로 감지된 보기 이름을 사용 사례와 더 관련성이 높은 이름으로 바꿀 수 있습니다.

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

**참고**: 이 패키지는 `react-native-navigation` 라이브러리를 위한 통합이므로 핵심 `mobile-react-native` SDK를 먼저 설치하고 설정하세요.

## 설정

NPM으로 설치하려면 다음을 실행합니다:

```sh
npm install @datadog/mobile-react-native-navigation
```

Yarn으로 설치하려면 다음을 실행합니다:

```sh
yarn add @datadog/mobile-react-native-navigation
```

### 보기 탐색 추적

탐색 이벤트 추적을 시작하려면 탐색을 설정하기 전에 다음 줄 추가를 호출하기만 하면 됩니다. 필요 시`ViewNamePredicate` 콜백을 사용하여 [`ComponentDidAppearEvent`][1]에 따라 자동으로 탐지된 보기 이름을 사용자의 사용 사례와 더 관련 있는 이름으로 바꿀 수 있습니다.

`ViewNamePredicate`에서 null을 반환하면 새 RUM 보기가 생성되지 않습니다. 이전 RUM 보기는 활성 상태로 유지됩니다.

```sh
import { DdRumReactNativeNavigationTracking, ViewNamePredicate }  from '@datadog/mobile-react-native-navigation';
import { ComponentDidAppearEvent } from 'react-native-navigation';

const viewNamePredicate: ViewNamePredicate = function customViewNamePredicate(event: ComponentDidAppearEvent, trackedName: string) {
  return "My custom View Name"
}

DdRumReactNativeNavigationTracking.startTracking(viewNamePredicate);
```

## RUM 통합

### React Navigation과 통합
Datadog은 [React Navigation](https://reactnavigation.org/) (최소 지원 버전은 `react-navigation/native@5.6.0`)에 대한 자동 통합을 제공합니다. 소스 코드에 다음을 추가하세요:

```typescript
    const navigationRef:React.RefObject<NavigationContainerRef> = React.createRef();
    // ...
    <NavigationContainer ref={navigationRef} onReady={
        ()=>{DdRumReactNavigationTracking.startTrackingViews(navigationRef.current)}}>
        // ...
    </NavigationContainer>
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://wix.github.io/react-native-navigation/api/events/#componentdidappear