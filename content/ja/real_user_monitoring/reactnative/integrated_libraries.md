---
beta: true
dependencies:
- https://github.com/DataDog/dd-sdk-reactnative/blob/main/docs/rum_integrations.md
description: React Native プロジェクトから RUM データを収集します。
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: GitHub
  text: dd-sdk-reactnative ソースコード
- link: real_user_monitoring/explorer/
  tag: ドキュメント
  text: RUM データの調査方法
- link: https://www.datadoghq.com/blog/react-native-monitoring/
  tag: ブログ
  text: React Native アプリケーションの監視
kind: faq
title: React Native インテグレーションライブラリ
---
## RUM インテグレーション

### ReactNavigation とのインテグレーション
Datadog は、[ReactNavigation](https://reactnavigation.org/) API (最低対応バージョンは `react-navigation/native@5.6.0`) の自動インテグレーションを提供します。ソースコードに以下を追加してください。
```typescript
    const navigationRef:React.RefObject<NavigationContainerRef> = React.createRef();
    // ...
    <NavigationContainer ref={navigationRef} onReady={
        ()=>{DdRumReactNavigationTracking.startTrackingViews(navigationRef.current)}}>
        // ...
    </NavigationContainer>
```