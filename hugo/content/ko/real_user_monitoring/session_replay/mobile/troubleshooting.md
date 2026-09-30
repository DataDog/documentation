---
aliases: null
description: 모바일 세션 재생과 관련된 문제를 해결하는 방법입니다.
further_reading:
- link: /real_user_monitoring/session_replay/mobile
  tag: 설명서
  text: 모바일 세션 재생
- link: /real_user_monitoring/session_replay/mobile/setup_and_configuration
  tag: 설명서
  text: 모바일 세션 재생 설정 및 구성
- link: /real_user_monitoring/session_replay/mobile/app_performance
  tag: 설명서
  text: 모바일 세션 재생이 앱 성능에 미치는 영향
- link: /real_user_monitoring/session_replay/mobile/privacy_options
  tag: 설명서
  text: 모바일 세션 재생 개인정보 보호 옵션
- link: /real_user_monitoring/session_replay
  tag: 설명서
  text: 세션 재생
title: 모바일 세션 재생 문제 해결
---
## 세션 재생
### 애플리케이션의 일부가 비어 있거나 플레이어에 보이지 않음

모바일 세션 재생은 기본 프레임워크만 지원합니다. 이러한 프레임워크 내에는 다음과 같은 특정 구성 요소 또는 화면이 누락될 수 있습니다:

- SwiftUI(iOS) 또는 Jetpack Compose(Android)로 빌드한 화면
- 웹 보기
- Android의 actionBar, 진행 표시줄, 스피너와 같은 특정 시스템 요소
- 비디오 플레이어, 뮤직 플레이어, 지도 위젯 등 풍부한 시스템 콘텐츠
- 직접 캔버스 그리기를 사용하는 보기
- 고급 텍스트 스타일링

### 세션 재생 렌더링이 내 애플리케이션을 정확히 반영하지 않음
모바일 세션 재생의 접근 방식은 성능과 사용성을 결합합니다. 이를 위해 앱을 픽셀 단위로 완벽하게 재현하는 것이 아니라 나중에 스타일링 및 컨텍스트 이미지로 보강할 수 있는 화면의 스캐폴드를 표시하는 하이브리드 시각적 접근 방식을 취합니다.

### 매우 짧은 세션의 경우 재생이 첨부되어 있지만 재생을 볼 수 없습니다
세션이 1 나노초 길이일 경우 Datadog은 레코드를 처리할 수 없으므로 재생이 첨부되지 않습니다.

## 데이터 보안
### 모바일 세션 재생을 수집할 때 모바일 앱 동의를 고려해야 합니다
데이터를 Datadog에 업로드하기 전에 애플리케이션의 캐시 디렉토리에 일반텍스트로 저장되며 SDK를 시작할 때는 추적 동의 값을 다음 중 하나로 설정해야 합니다:

- 값이 **not granted**면 디스크에 데이터가 기록되지 않습니다.
- 값이 **pending**이면 데이터는 Datadog에 업로드할 수 없는 임시 폴더에 기록됩니다.
- 값이 **granted**면 "upload" 폴더에 데이터가 기록되며, 이 폴더는 백그라운드에서 처리되어 최종적으로 Datadog에 업로드됩니다.

호스트 앱의 수명 기간 동안 언제든지 추적 동의를 변경할 수 있습니다. 동의가 pending에서 granted로 변경되면 임시 폴더에 있는 데이터가 "upload" 폴더로 이동됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}