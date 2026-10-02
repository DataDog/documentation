Because React Native offers a wide range of libraries to create screen navigation, view tracking isn't automatic by default. To see RUM or Error Tracking sessions populate in Datadog, set up view tracking with one of the following methods.

## Automatically track views

Use one of Datadog's integrations to automatically track views for the following libraries:

-   If you use the [`react-native-navigation`][1] library, then add the `@datadog/mobile-react-native-navigation` package and follow the [setup instructions][2].
-   If you use the [`react-navigation`][3] library, then add the `@datadog/mobile-react-navigation` package and follow the [setup instructions][2].

If you experience any issues setting up view tracking with `@datadog/mobile-react-navigation`, see this Datadog [example application][4] as a reference.

## Manually track views

You can manually start and stop a view using the following `startView()` and `stopView()` methods. Provide a unique view key, a view name, and optional attributes:

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

## Hybrid app monitoring

See [Monitor hybrid React Native applications][5].

For the attributes collected for views, see [Data Collected][6].

[1]: https://github.com/wix/react-native-navigation
[2]: /real_user_monitoring/reference/integrated_libraries/?platform=react_native
[3]: https://github.com/react-navigation/react-navigation
[4]: https://github.com/DataDog/dd-sdk-reactnative-examples/tree/main/rum-react-navigation
[5]: /real_user_monitoring/guide/monitor-hybrid-react-native-applications
[6]: /real_user_monitoring/setup/data_collected/?platform=react_native
