---
title: React Native Integrated Libraries
kind: faq
description: Collect RUM data from your React Native projects.
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: GitHub
  text: dd-sdk-reactnative Source code
- link: https://www.datadoghq.com/blog/react-native-monitoring/
  tag: Blog
  text: Monitor your React Native applications
- link: real_user_monitoring/explorer/
  tag: Documentation
  text: Learn how to explore your RUM data

---
## RUM Integrations

### Integrate with ReactNavigation
Datadog provides automatic integration for the [ReactNavigation](https://reactnavigation.org/) API (minimum supported version is `react-navigation/native@5.6.0`). Add the following in your source code:
```typescript
    const navigationRef:React.RefObject<NavigationContainerRef> = React.createRef();
    // ...
    <NavigationContainer ref={navigationRef} onReady={
        ()=>{DdRumReactNavigationTracking.startTrackingViews(navigationRef.current)}}>
        // ...
    </NavigationContainer>
```
