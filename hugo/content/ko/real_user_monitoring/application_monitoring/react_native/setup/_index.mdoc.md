---
aliases:
- /ko/real_user_monitoring/react-native/
- /ko/real_user_monitoring/reactnative/
- /ko/real_user_monitoring/mobile_and_tv_monitoring/setup/reactnative
- /ko/real_user_monitoring/mobile_and_tv_monitoring/react_native/setup
- /ko/real_user_monitoring/mobile_and_tv_monitoring/react_native/setup/reactnative/
- /ko/real_user_monitoring/application_monitoring/react_native/setup/expo/
- /ko/real_user_monitoring/reactnative/expo/
- /ko/real_user_monitoring/reactnative-expo/
- /ko/real_user_monitoring/mobile_and_tv_monitoring/setup/expo
- /ko/real_user_monitoring/mobile_and_tv_monitoring/expo/setup
- /ko/real_user_monitoring/mobile_and_tv_monitoring/react_native/setup/expo/
content_filters:
- label: Setup Method
  option_group_id: rum_react_native_framework_options
  trait_id: platform
description: React Native 프로젝트에서 RUM 및 Error Tracking 데이터를 수집합니다.
further_reading:
- link: /real_user_monitoring/application_monitoring/react_native/advanced_configuration
  tag: 설명서
  text: RUM React Native 고급 구성
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: 소스 코드
  text: dd-sdk-reactnative의 소스 코드
- link: https://www.datadoghq.com/blog/react-native-monitoring/
  tag: 블로그
  text: React Native 애플리케이션 모니터링
- link: real_user_monitoring/guide/monitor-hybrid-react-native-applications
  tag: 설명서
  text: 하이브리드 React Native 애플리케이션 모니터링
- link: real_user_monitoring/explorer/
  tag: 설명서
  text: RUM 데이터를 탐색하는 방법 알아보기
title: React Native 모니터링 설정
---
이 페이지에는 React Native SDK를 사용하여 [Real User Monitoring(RUM)][1]에 대해 애플리케이션을 계측하는 방법을 설명했습니다. RUM은 기본적으로 Error Tracking을 포함하지만, Error Tracking을 독립형 제품으로 구매한 경우 구체적인 단계는 [Error Tracking 설정 가이드][2]를 참조하세요.

React Native SDK의 최소 지원 버전은 React Native v0.65+입니다. 구형 버전과의 호환성은 기본적으로 보장되지 않습니다.

## 설정 {% #setup %}

<!-- React Native -->
{% if equals($platform, "react_native") %}
{% partial file="sdk/setup/react-native.mdoc.md" /%}
{% /if %}

<!-- Expo -->
{% if equals($platform, "expo") %}
{% partial file="sdk/setup/react-native-expo.mdoc.md" /%}
{% /if %}

## 장치가 오프라인일 때 데이터 전송 {% #sending-data-when-device-is-offline %}

React Native SDK는 사용자 장치가 오프라인일 때 데이터를 사용할 수 있게 해주는 데 유용합니다. 네트워크가 불안정한 지역이나 장치 배터리 잔량이 너무 적은 경우, 모든 이벤트는 먼저 로컬 장치에 배치 단위로 저장됩니다. 이러한 배치는 네트워크를 사용할 수 있게 되고, 배터리 잔량이 충분하여 React Native SDK가 최종 사용자의 경험에 영향을 미치지 않게 되면 즉시 전송됩니다. 애플리케이션이 포그라운드에 있는 상태에서 네트워크를 사용할 수 없거나, 데이터 업로드가 실패하면 배치를 전송할 수 있을 때까지 보관됩니다.

즉, 사용자가 오프라인 상태에서 애플리케이션을 열어도 데이터가 손실되지 않습니다.

**참고**: React Native SDK가 디스크 공간을 너무 많이 사용하지 않도록 디스크의 데이터는 너무 오래되면 자동으로 삭제됩니다.

## 백그라운드 이벤트 추적 {% #track-background-events %}

{% alert level="info" %}
백그라운드 이벤트를 추적하면 추가 세션이 발생할 수 있으며, 이는 청구에 영향을 줄 수 있습니다. 질문이 있는 경우 [Datadog 지원팀에 문의][12]하세요.
{% /alert %}

애플리케이션이 백그라운드에 있을 때(예를 들어 활성 조회를 사용할 수 없을 때) 충돌 및 네트워크 요청과 같은 이벤트를 추적할 수 있습니다.

초기화 중에 Datadog 구성에 다음 스니펫을 추가하세요.

```javascript
rumConfiguration.trackBackgroundEvents = true;
```

[1]: /ko/real_user_monitoring/
[2]: /ko/error_tracking/
[12]: https://docs.datadoghq.com/ko/help/