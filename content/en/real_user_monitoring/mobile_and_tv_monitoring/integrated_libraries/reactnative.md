---
title: React Native Libraries for RUM
kind: documentation
code_lang: reactnative
type: multi-code-lang
code_lang_weight: 20
aliases:
- /real_user_monitoring/reactnative/integrated_libraries/
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: "Source Code"
  text: Source code for dd-sdk-reactnative
- link: /real_user_monitoring/mobile_and_tv_monitoring/integrated_libraries
  tag: Documentation
  text: Integrated Libraries
---

This page lists integrated libraries you can use for React Native applications.

## React Navigation

### Setup

**Note**: This package is an integration for [`react-navigation`][1] library, please make sure you first install and setup the core `mobile-react-native` SDK.

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

**Note**: This package is an integration for `react-native-navigation` library. Please make sure you first install and setup the core `mobile-react-native` SDK.

### Setup

To install with NPM, run:

```sh
npm install @datadog/mobile-react-native-navigation
```

To install with Yarn, run:

```sh
yarn add @datadog/mobile-react-native-navigation
```

### Track view navigation

To start tracking your navigation events, add the following lines before setting up your navigation. You can use the optional `ViewNamePredicate` callback to replace the automatically detected View name with something more relevant to your use case, based on the [`ComponentDidAppearEvent`][2].

Returning null in the `ViewNamePredicate` prevents the new RUM View from being created. The previous RUM View remains active.

```sh
import { DdRumReactNativeNavigationTracking, ViewNamePredicate }  from '@datadog/mobile-react-native-navigation';
import { ComponentDidAppearEvent } from 'react-native-navigation';

const viewNamePredicate: ViewNamePredicate = function customViewNamePredicate(event: ComponentDidAppearEvent, trackedName: string) {
  return "My custom View Name"
}

DdRumReactNativeNavigationTracking.startTracking(viewNamePredicate);
```

## Apollo Client

**Note**: This package is an integration for the `@apollo/client` library. Please make sure you first install and set up the core `mobile-react-native` SDK.

### Setup

To install with NPM, run:

```sh
npm install @datadog/mobile-react-native-apollo-client
```

To install with Yarn, run:

```sh
yarn add @datadog/mobile-react-native-apollo-client
```

### Migrate to HttpLink

If you initialize your `ApolloClient` with the `uri` parameter, initialize it with a `HttpLink`:

```javascript
import { ApolloClient, HttpLink } from '@apollo/client';

// before
const apolloClient = new ApolloClient({
    uri: 'https://my.api.com/graphql'
});

// after
const apolloClient = new ApolloClient({
    link: new HttpLink({ uri: 'https://my.api.com/graphql' })
});
```

### Use the Datadog Apollo Client Link to collect information

Import `DatadogLink` from `@datadog/mobile-react-native-apollo-client` and use it in your `ApolloClient` initialization:

```javascript
import { ApolloClient, from, HttpLink } from '@apollo/client';
import { DatadogLink } from '@datadog/mobile-react-native-apollo-client';

const apolloClient = new ApolloClient({
    link: from([
        new DatadogLink(),
        new HttpLink({ uri: 'https://my.api.com/graphql' }) // always in last position
    ])
});
```

For more information on Apollo Client Links, see the [official documentation][3].

### Removing GraphQL information

Use a `resourceEventMapper` in your Datadog configuration to remove sensitive data from GraphQL variables:

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
    // Variables are stored in event.context['_dd.graphql.variables'] as a JSON string when present
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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://reactnavigation.org/
[2]: https://wix.github.io/react-native-navigation/api/events/#componentdidappear
[3]: https://www.apollographql.com/docs/react/api/link/introduction/