### Manually track RUM views

To manually track RUM Views, provide a `view key`, `view name`, and `action name` at initialization. Depending on your needs, you can choose one of the following strategies:

```javascript
DdRum.startView('<view-key>', 'View Name', {}, Date.now());
//…
DdRum.stopView('<view-key>', { custom: 42 }, Date.now());
```

## Track view navigation

Because React Native offers a wide range of libraries to create screen navigation, only manual view tracking is supported by default. To see RUM or Error tracking sessions populate in Datadog, you need to implement view tracking.

You can manually start and stop a view using the following `startView()` and `stopView` methods.

```js
import {
    DdRum
} from '@datadog/mobile-react-native';

// Start a view with a unique view identifier, a custom view name, and an object to attach additional attributes to the view
DdRum.startView(
    '<view-key>', // <view-key> has to be unique, for example it can be ViewName-unique-id
    'View Name',
    { 'custom.foo': 'something' },
    Date.now()
);
// Stops a previously started view with the same unique view identifier, and an object to attach additional attributes to the view
DdRum.stopView('<view-key>', { 'custom.bar': 42 }, Date.now());
```

Use one of Datadog's integrations to automatically track views for the following libraries:

-   If you use the [`react-native-navigation`][10] library, then add the `@datadog/mobile-react-native-navigation` package and follow the [setup instructions][11].
-   If you use the [`react-navigation`][12] library, then add the `@datadog/mobile-react-navigation` package and follow the [setup instructions][11].

If you experience any issues setting up View tracking with `@datadog/mobile-react-navigation` you can see this Datadog [example application][13] as a reference.

## Hybrid app monitoring

See [Monitor hybrid React Native applications][19].

[1]: https://app.datadoghq.com/rum/application/create
[10]: https://github.com/wix/react-native-navigation
[11]: /real_user_monitoring/application_monitoring/react_native/integrated_libraries/
[12]: https://github.com/react-navigation/react-navigation
[13]: https://github.com/DataDog/dd-sdk-reactnative-examples/tree/main/rum-react-navigation
[19]: /real_user_monitoring/guide/monitor-hybrid-react-native-applications
