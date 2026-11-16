---
aliases:
- /ko/real_user_monitoring/mobile_and_tv_monitoring/
- /ko/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/
- /ko/real_user_monitoring/mobile_and_tv_monitoring/data_collected/
- /ko/real_user_monitoring/mobile_and_tv_monitoring/integrated_libraries/
- /ko/real_user_monitoring/mobile_and_tv_monitoring/other_frameworks/
- /ko/real_user_monitoring/mobile_and_tv_monitoring/setup/
- /ko/real_user_monitoring/mobile_and_tv_monitoring/troubleshooting/
description: 브라우저, 모바일 및 TV 애플리케이션에서 RUM 데이터를 수집하세요.
further_reading:
- link: /session_replay/
  tag: 설명서
  text: Session Replay
title: 애플리케이션 모니터링
---
## 개요 {#overview}

Datadog Real User Monitoring(RUM)은 애플리케이션의 프런트엔드 성능에 대한 심층적인 인사이트를 제공합니다. 실제 사용자 데이터를 모니터링하여 웹 경험을 최적화하고 탁월한 사용자 경험을 제공하세요. Synthetic 테스트, 백엔드 메트릭, 트레이스 및 로그를 한 곳에서 연관시켜 전체 스택의 성능 문제를 파악하고 해결하세요.

Datadog은 현재 사용자 경험 수준을 파악하고, 개선이 필요한 영역을 식별하며, 각 변경 및/또는 배포의 성공 여부를 측정하도록 돕습니다. 이 정보를 사용하여 사용자에게 영향을 미치기 전에 예상치 못한 프런트엔드 문제를 식별하고 해결하여 최상의 경험을 제공하세요.

사용자 데이터를 안전하게 유지하는 책임은 Datadog과 RUM SDK를 활용하는 개발자가 함께 부담합니다. [공동 책임][1]에 대해 자세히 알아보세요.

## 시작하기 {#get-started}

애플리케이션에서 RUM 데이터 수집을 시작할 플랫폼을 선택하세요.

{{< card-grid image_width="200" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/browser/setup" src="integrations_logos/javascript_large.svg" alt="browser" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/android/setup" src="integrations_logos/android_large.svg" alt="Android" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/android/setup" src="integrations_logos/android_tv_large.svg" alt="Android TV" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/cpp/setup/" src="integrations_logos/cpp_large.svg" alt="C/C++" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/flutter/setup/" src="integrations_logos/flutter_large.svg" alt="Flutter" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/ios/setup/" src="integrations_logos/ios_large.svg" alt="iOS" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/ios/setup/" src="integrations_logos/tv_os_large.svg" alt="tvOS" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/kotlin_multiplatform/setup/" src="integrations_logos/kotlin-multiplatform_large.svg" alt="kotlin-multiplatform" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/maui/setup/" src="integrations_logos/maui_large.svg" alt=".NET MAUI" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/react_native/setup/" src="integrations_logos/react-native_large.svg" alt="react-native" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/react_native/setup/codepush/" src="integrations_logos/react-codepush_large.svg" alt="react-codepush" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/react_native/setup/expo/" src="integrations_logos/rum-expo_large.svg" alt="rum-expo" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/roku/setup/" src="integrations_logos/roku_large.svg" alt="Roku" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/unity/setup" src="integrations_logos/rum-unity_large.svg" alt="RUM-Unity" >}}
{{< /card-grid >}}

[1]: /ko/data_security/real_user_monitoring/#shared-responsibility