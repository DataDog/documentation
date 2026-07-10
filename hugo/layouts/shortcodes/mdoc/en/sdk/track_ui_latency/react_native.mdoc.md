### Notify the SDK that your view finished loading

You can notify the SDK that your view has finished loading by calling the `addViewLoadingTime` method on `DdRum`.
Call this method when your view is fully loaded and ready to be displayed to the user:

```javascript
DdRum.addViewLoadingTime(true);
```

Use the `overwrite` parameter to replace the previously calculated loading time for the current view.

After the loading time is sent, it is accessible as `@view.loading_time` and is visible in the RUM UI.

**Note**: This API is experimental.

### Add custom timings

You can add custom timings:

```javascript
DdRum.addTiming('<timing-name>');
```

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/application_monitoring/react_native
[3]: https://jestjs.io/
[4]: /account_management/api-app-keys/#client-tokens
[5]: /getting_started/tagging/#define-tags
[6]: /getting_started/site/
[7]: /real_user_monitoring/application_monitoring/browser/frustration_signals/
[8]: /real_user_monitoring/correlate_with_other_telemetry/apm?tab=reactnativerum
[9]: /real_user_monitoring/guide/proxy-mobile-rum-data/
[10]: https://github.com/wix/react-native-navigation
[11]: /real_user_monitoring/application_monitoring/react_native/integrated_libraries/
[12]: https://github.com/react-navigation/react-navigation
[13]: https://github.com/DataDog/dd-sdk-reactnative-examples/tree/main/rum-react-navigation
[14]: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/683ec4a2b420ff6bd3873a7338416ad3ec0b6595/types/react-native-side-menu/index.d.ts#L2
[15]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[16]: https://reactnative.dev/docs/global-requestIdleCallback
[17]: https://reactnative.dev/docs/interactionmanager#runafterinteractions
[18]: https://github.com/DataDog/dd-sdk-reactnative-examples/tree/main/rum-react-navigation-async
[19]: /real_user_monitoring/guide/monitor-hybrid-react-native-applications
[20]: /real_user_monitoring/error_tracking/mobile/ios/?tab=cocoapods#configure-the-app-hang-threshold
[21]: #rum-configuration
[22]: #logs-configuration
[23]: #trace-configuration
