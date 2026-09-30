---
aliases: null
description: 모바일 세션 재생을 위한 성능 벤치마킹.
further_reading:
- link: /real_user_monitoring/session_replay/mobile
  tag: 설명서
  text: 모바일 세션 재생
- link: /real_user_monitoring/session_replay/mobile/privacy_options
  tag: 설명서
  text: 모바일 세션 재생 개인정보 보호 옵션
- link: /real_user_monitoring/session_replay/mobile/setup_and_configuration
  tag: 설명서
  text: 모바일 세션 재생 설정 및 구성
- link: /real_user_monitoring/session_replay/mobile/troubleshooting
  tag: 설명서
  text: 모바일 세션 재생 문제 해결
- link: /real_user_monitoring/session_replay
  tag: 설명서
  text: 세션 재생
title: 모바일 세션 재생이 앱 성능에 미치는 영향
---

## 개요
세션 재생은 Datadog SDK 코어의 일괄 처리 및 스마트 업로드의 기존 메커니즘을 활용합니다. 이러한 메커니즘을 통해 애플리케이션에서 Datadog 서버로 효율적이고 최적화된 데이터 전송이 가능합니다. 세션 재생은 여러 이벤트를 일괄 처리하고 적절한 간격과 함께 지능적으로 업로드함으로써 네트워크 및 대역폭 사용에 대한 전반적인 영향을 최소화하는 동시에 네트워크 리소스를 효율적으로 활용할 수 있도록 보장합니다.

모바일 세션 재생 SDK는 애플리케이션 성능에 영향을 주지 않고 원활한 사용자 경험을 제공합니다.

## 주요 스레드
애플리케이션의 현재 화면 캡처를 담당하는 시스템은 UI 스레드에서 실행되므로 잠재적으로 UI 업데이트가 지연될 수 있습니다. 그러나 Datadog은 고도로 최적화된 프로세스를 사용하여 SDK가 UI 스레드에서 수행하는 작업 부하를 최소화합니다.

화면은 플랫폼에 따라 64밀리초에서 100밀리초 사이에 캡처되며, 단일 화면 캡처에는 3밀리초가 소요됩니다. 수집된 데이터의 모든 처리는 애플리케이션의 성능에 영향을 주지 않고 백그라운드 스레드에서 이루어집니다.

## 네트워크
Datadog은 총 업로드 용량을 최소화하기 위해 고도로 최적화된 와이어 형식을 사용합니다. 그 결과, iOS에서 Datadog 서버로 전송되는 데이터의 평균 대역폭 사용량은 약 12KB/s, Android에서는 1.22KB/s로 예상할 수 있습니다. 이미지 녹화가 활성화된 경우, 이미지가 많은 콘텐츠가 포함된 애플리케이션은 초기 볼륨이 약간 더 높아질 수 있습니다. 디바이스가 네트워크에서 연결이 끊어진 경우, 고대역폭 연결이 다시 설정될 때까지 데이터가 장치의 디스크 스토리지에 버퍼링됩니다.

## 애플리케이션 크기
Datadog의 SDK는 엄격한 표준을 따르며 타사 종속성 포함을 최소화하는 것을 목표로 합니다. 이러한 접근 방식은 SDK가 가능한 한 많은 기본 프레임워크 코드를 활용하도록 보장합니다. Android의 경우 AAR 패키지에서 Datadog의 자체 코드가 생성하는 바이너리 크기는 480 kB입니다. 애플리케이션 크기 영향에 대한 자세한 내용은 [여기][1]를 참조하세요. iOS에서는 내보낸 `*.ipa` 파일의 크기가 약 200 kB 더 커집니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-android/blob/develop/docs/sdk_performance.md?plain=1#L119