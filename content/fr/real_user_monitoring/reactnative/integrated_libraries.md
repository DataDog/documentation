---
beta: true
dependencies:
- https://github.com/DataDog/dd-sdk-reactnative/blob/main/docs/rum_integrations.md
description: Collectez des données RUM depuis vos projets React Native.
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: GitHub
  text: Code source dd-sdk-reactnative
- link: real_user_monitoring/explorer/
  tag: Documentation
  text: Apprendre à explorer vos données RUM
- link: https://www.datadoghq.com/blog/react-native-monitoring/
  tag: Blog
  text: Surveiller des applications React Native
kind: faq
title: Bibliothèques React Native intégrées
---
## Intégrations RUM

### Intégration avec ReactNavigation
Datadog s'intègre automatiquement à l'API [ReactNavigation](https://reactnavigation.org/) (la version minimale prise en charge est `react-navigation/native@5.6.0`). Ajoutez le bloc suivant dans votre code source :
```typescript
    const navigationRef:React.RefObject<NavigationContainerRef> = React.createRef();
    // ...
    <NavigationContainer ref={navigationRef} onReady={
        ()=>{DdRumReactNavigationTracking.startTrackingViews(navigationRef.current)}}>
        // ...
    </NavigationContainer>
```