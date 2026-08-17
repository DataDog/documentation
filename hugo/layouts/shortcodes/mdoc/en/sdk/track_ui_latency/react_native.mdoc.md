### Time to network settled

Time to Network Settled (TNS) is calculated automatically. It measures the time between the start of a view and the completion of all resources that started within a threshold of the view's start.

To customize the threshold (0.1 seconds by default), set `initialResourceThreshold` when initializing the SDK:

```javascript
DdSdkReactNative.initialize({
    ...
    initialResourceThreshold: 0.5, // Set threshold to 0.5s
})
```

### View loading time

To notify the SDK that your view finished loading, call `addViewLoadingTime` on `DdRum` when your view is fully loaded and ready to display:

```javascript
DdRum.addViewLoadingTime(true);
```

Use the `overwrite` parameter to replace the previously calculated loading time for the current view. This API is experimental.

### Custom timings

To measure how long a specific part of your app takes, add a custom timing:

```javascript
DdRum.addTiming('<timing-name>');
```

Interaction to Next View isn't available for the React Native SDK yet.

For additional mobile performance metrics, such as slow renders and JS refresh rate, see [Mobile Vitals][1].

[1]: /real_user_monitoring/application_monitoring/mobile_vitals/?tab=reactnative
