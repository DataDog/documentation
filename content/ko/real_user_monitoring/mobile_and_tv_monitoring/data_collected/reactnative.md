---
aliases:
- /ko/real_user_monitoring/reactnative/data_collected/
code_lang: 리액티브
code_lang_weight: 40
description: React Native 모니터링이 수집한 데이터에 대해 알아봅니다.
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: 소스 코드
  text: dd-sdk-reactnative를 위한 소스 코드
- link: real_user_monitoring/explorer/
  tag: 설명서
  text: RUM 데이터를 탐색하는 방법 알아보기
- link: real_user_monitoring/guide/monitor-hybrid-react-native-applications
  tag: 설명서
  text: 하이브리드 React Native 애플리케이션 모니터링
title: 수집된 RUM React Native 데이터
type: multi-code-lang
---
## 개요

RUM용 Datadog React Native SDK는 연결된 메트릭 및 속성이 있는 이벤트를 생성합니다. 메트릭은 이벤트와 관련된 측정에 사용할 수 있는 정량화 가능한 값입니다. 속성은 RUM 탐색기에서 메트릭 데이터를 분류(그룹화)하는 데 사용되는 정량화할 수 없는 값입니다.

대부분의 React Native 모니터링 데이터는 RUM용 기본 Datadog iOS 및 Android SDK에서 수집되며 동일한 기간 동안 유지됩니다.

* iOS 이벤트별 메트릭 및 속성은 [수집된 RUM iOS 데이터][1]를 참조하세요.
* Android 이벤트별 메트릭 및 속성은 [수집된 RUM Android 데이터][2]를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/ios/data_collected/#event-specific-metrics-and-attributes
[2]: /ko/real_user_monitoring/android/data_collected/#event-specific-metrics-and-attributes