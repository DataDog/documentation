---
app_id: komodor
app_uuid: 995fe904-e761-4f2f-8dbf-148baf3f080a
assets: {}
author:
  homepage: https://komodor.com/
  name: Komodor
  sales_email: sales@komodor.com
  support_email: support@komodor.com
categories:
- ㅊ
- 쿠버네티스(Kubernetes)
- 알림
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/komodor/README.md
display_on_public_website: true
draft: false
git_integration_title: komodor
integration_id: komodor
integration_title: Komodor 자동화
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: komodor
public_title: Komodor 자동화
short_description: 전체 K8 환경 및 스택의 변경 사항 추적
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Category::Notifications
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: 전체 K8 환경 및 스택의 변경 사항 추적
  media:
  - caption: 기본 서비스 화면입니다.
    image_url: images/Komodor_screen_01.png
    media_type: image
  - caption: 서비스 보기 이벤트 라임라인 및 관련 서비스입니다.
    image_url: images/Komodor_screen_02.png
    media_type: image
  - caption: 배포 및 변경 사항을 검토하는 서비스 보기입니다.
    image_url: images/Komodor_screen_03.png
    media_type: image
  - caption: 배포의 리플리카셋, 포드와 로그 검토하기
    image_url: images/Komodor_screen_04.png
    media_type: image
  - caption: 여러 클러스터 및 배포에 대한 이벤트 타임라인입니다.
    image_url: images/Komodor_screen_05.png
    media_type: image
  - caption: Datadog 모니터링 알림을 보여주는 서비스 보기입니다.
    image_url: images/Komodor_screen_06.png
    media_type: image
  - caption: Komodor로 돌아가는 링크를 보여주는 Datadog 메트릭 보기입니다.
    image_url: images/Komodor_screen_07.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Komodor 자동화
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Komodor는 전체 K8 스택에서 변경 사항을 추적하고, 그 파급 효과를 분석하며, 효율적이고 독립적으로 문제를 해결하는 데 필요한 컨텍스트를 제공합니다. Komodor는 변경된 내용, 푸시된 코드, 푸시한 사람 등 관련 정보가 포함된 타임라인을 통해 쿠버네티스(Kubernetes) 배포에 대한 인사이트를 제공합니다. 또한 Git, 설정 맵, 인프라스트럭처, 경고, Datadog와 같은 기타 도구의 데이터를 이해하기 쉬운 하나의 중앙 집중식 디스플레이에서 볼 수 있습니다. 

이 통합을 사용하면 필요한 대시보드로 바로 연결되는 동적 배포 링크가 있는 Datadog 메트릭에 연결할 수 있습니다. 이렇게 하면 Datadog에서 감지된 가장 관련성이 높은 컨텍스트, 연결 및 서비스 종속성을 기반으로 마이크로서비스 문제를 해결할 수 있습니다.

## 설정

1. [Komodor 플랫폼][1]에 로그인합니다.
2. 헬름 차트 또는 Kustomize를 사용하여 각 쿠버네티스(Kubernetes) 클러스터에 Komodor 포드 기반 에이전트를 설치합니다. 자세한 내용은 에이전트 설치에 대한 [Komodor 설명서][2]를 참조하세요.

3. 에이전트가 설치되면 아래 단계에 따라 Datadog 통합을 설정합니다.
    - [Komodor 플랫폼 설치 통합][3] - 이 첫 번째 통합 단계는 Komodor가 API 키와 토큰 키를 통해 Datadog 계정에 액세스하고 Datadog에서 감지된 서비스 종속성을 기반으로 관련 서비스를 제안할 수 있도록 합니다.
    - [Datadog Webhook 통합][4] 설치 - 설치하면 Komodor가 Datadog 모니터에서 알림을 받을 수 있습니다. Komodor 서비스 보기에서 모든 알림을 확인할 수 있습니다.
    - Datadog 모니터 알림 설정 - Datadog [모니터 알림][6]에 Komodor [동적 링크][5]를 추가하면 Komodor에서 관련 서비스로의 직접 링크가 생성됩니다. Datadog에 연결된 알림 제공자의 알림 링크를 참조하세요.

4. 쿠버네티스(Kubernetes) [주석][7]을 사용하여 관련 Datadog 애플리케이션 성능 모니터링(APM) 대시보드 링크와 Datadog 내 특정 서비스 메트릭 및 시간 범위에 대한 동적 링크를 포함해 Komodor 서비스와 배포 화면을 구성할 수 있습니다.

## 지원

자세한 내용은 [웹사이트 방문][8]하거나 [당사에 문의][9]하세요.

[1]: https://app.komodor.com/
[2]: https://docs.komodor.com/Learn/Komodor-Agent.html
[3]: https://docs.komodor.com/Integrations/Datadog.html
[4]: https://docs.komodor.com/Integrations/datadog-webhook.html
[5]: https://docs.komodor.com/Integrations/Datadog-Monitor-Notification.html
[6]: https://docs.datadoghq.com/ko/monitors/notify/
[7]: https://docs.komodor.com/Learn/Annotations.html
[8]: https://komodor.com/sign-up/
[9]: https://komodor.com/contact-us/