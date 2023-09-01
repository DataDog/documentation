---
title: React Native Integrated Libraries
kind: faq
description: Collect RUM data from your React Native projects.
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: GitHub
  text: Source code for dd-sdk-reactnative
- link: https://www.datadoghq.com/blog/react-native-monitoring/
  tag: Blog
  text: Monitor your React Native applications
- link: real_user_monitoring/explorer/
  tag: Documentation
  text: Learn how to explore your RUM data

---
## React Navigation

### Setup

**Note**: This package is an integration for `react-navigation` library, please make sure you first install and setup the core `mobile-react-native` SDK.

To install with NPM, run:

```sh
npm install @datadog/mobile-react-navigation
```

To install with Yarn, run:

```sh
yarn add @datadog/mobile-react-navigation
```

### Track view navigation
To track changes in navigation as RUM Views, set the `onready` callback of your `NavigationContainer` component as follow. You can use the optional `ViewNamePredicate` parameter to replace the automatically detected View name with something more relevant to your use case.

Returning `null` in the `ViewNamePredicate` prevents the new RUM View from being created. The previous RUM View remains active.

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
        // …
      </NavigationContainer>
    </View>
  );
}
```

**Note**: Only one `NavigationContainer` can be tracked at the time. If you need to track another container, stop tracking the previous one first, using `DdRumReactNavigationTracking.stopTrackingViews()`.

## React Native Navigation

**Note**: This package is an integration for `react-native-navigation` library, please make sure you first install and setup the core `mobile-react-native` SDK.

## Setup

To install with NPM, run:

```sh
npm install @datadog/mobile-react-native-navigation
```

To install with Yarn, run:

```sh
yarn add @datadog/mobile-react-native-navigation
```

### Track view navigation

In order to start tracking your navigation events, simply call the add the following lines before setting up your navigation. You can use the optional `ViewNamePredicate` callback to replace the automatically detected View name with something more relevant to your use case, based on the [`ComponentDidAppearEvent`][1].

Returning null in the `ViewNamePredicate` prevents the new RUM View from being created. The previous RUM View remains active.

```sh
import { DdRumReactNativeNavigationTracking, ViewNamePredicate }  from '@datadog/mobile-react-native-navigation';
import { ComponentDidAppearEvent } from 'react-native-navigation';

const viewNamePredicate: ViewNamePredicate = function customViewNamePredicate(event: ComponentDidAppearEvent, trackedName: string) {
  return "My custom View Name"
}

DdRumReactNativeNavigationTracking.startTracking(viewNamePredicate);
```

## RUM Integrations

### Integrate with React Navigation
Datadog provides automatic integration for [React Navigation](https://reactnavigation.org/) (minimum supported version is `react-navigation/native@5.6.0`). Add the following in your source code:

```typescript
    const navigationRef:React.RefObject<NavigationContainerRef> = React.createRef();
    // ...
    <NavigationContainer ref={navigationRef} onReady={
        ()=>{DdRumReactNavigationTracking.startTrackingViews(navigationRef.current)}}>
        // ...
    </NavigationContainer>
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://wix.github.io/react-native-navigation/api/events/#componentdidappear