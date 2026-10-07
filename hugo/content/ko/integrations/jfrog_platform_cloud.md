---
app_id: jfrog-platform-cloud
app_uuid: 798102cb-6c52-4a16-bc1b-48c2e6b54e71
assets:
  dashboards:
    JFrog Platform Cloud Log Analytics: assets/dashboards/jfrog_platform_cloud_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10419
    source_type_name: JFrog 플랫폼 클라우드
author:
  homepage: https://jfrog.com/
  name: JFrog
  sales_email: partners@jfrog.com
  support_email: support@jfrog.com
categories:
- log collection
- 쿠버네티스(Kubernetes)
- containers
- 보안
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/jfrog_platform_cloud/README.md
display_on_public_website: true
draft: false
git_integration_title: jfrog_platform_cloud
integration_id: jfrog-platform-cloud
integration_title: JFrog 플랫폼 클라우드
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: jfrog_platform_cloud
public_title: JFrog 플랫폼 클라우드
short_description: JFrog Artifactory Cloud 로그 확인 및 분석
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Offering::Integration
  - 제출한 데이터 유형::로그
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Kubernetes
  - Category::Containers
  - 카테고리::보안
  configuration: README.md#Setup
  description: JFrog Artifactory Cloud 로그 확인 및 분석
  media:
  - caption: JFrog Artifactory Logs 대시보드 - HTTP 요청
    image_url: images/jfrog_platform_cloud_logs_0.png
    media_type: image
  - caption: JFrog Artifactory Logs 대시보드 - 요청 로그
    image_url: images/jfrog_platform_cloud_logs_1.png
    media_type: image
  - caption: JFrog Artifactory Logs 대시보드 - 작업
    image_url: images/jfrog_platform_cloud_logs_2.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: JFrog 플랫폼 클라우드
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

[JFrog][1]는 범용 하이브리드 엔드 투 엔드 DevOps 플랫폼입니다. JFrog Artifactory는 소프트웨어 공급 체인에 사용할 아티팩트, 바이너리, 패키지, 파일, 컨테이너, 구성 요소를 보관하고 관리할 수 있는 단일 솔루션입니다.

JFrog Artifactory는 내 도구 및 프로세스를 통합하여 자동화를 개선하고, 무결성을 올리며, 전체 과정에 모범 사례를 포함하여 DevOps의 중앙 허브 역할을 할 수 있습니다.

JFrog의 SaaS Log Streamer는 JFrog가 SaaS 고객을 위해 구축한 로그 스트리밍 솔루션입니다. 이 솔루션을 이용하면 JFrog Artifactory 로그를 고객의 JFrog SaaS 인스턴스에서 바로 Datadog 인스턴스로 스트리밍할 수 있습니다.

JFrog와 Datadog를 모두 사용하는 고객은 사전 구성된 Datadog 대시보드 내에서 Artifactory 로그를 시각화하여 확인할 수 있습니다. 또 이 통합에는 Datadog 로그 파이프라인 기본 지원이 포함되어 있어 JFrog에서 스트리밍되는 로그가 사전 처리되어 자동으로 Datadog 로그 형식으로 전환됩니다. 이를 통해 팀의 편의에 맞게 로그에 고유한 이름을 지정할 수 있고, Artifactory 로그를 검색 가능한 패싯으로 드릴다운 할 수 있으며, JFrog SaaS 인스턴스를 모니터링할 수 있습니다.

이 통합에서는 다음 Artifactory 로그를 Datadog로 전송합니다.

- **access-audit.log**
- **artifactory-request.log**
- **artifactory-access.log**
- **access-security-audit.log**

고객은 이와 같은 로그를 사용해 누가 어떤 리포지토리에 얼마나 자주 접근했는지를 알 수 있습니다. 또 로그에는 리포지토리에 접근한 IP 주소도 표시됩니다. traffic.log, artifactory-access.log 등을 포함해 요청 로그도 업데이트를 통해 이 통합에 추가될 예정입니다.

JFrog의 SaaS Log Streaming은 현재 베타 서비스 중입니다. 베타 서비스 기간에는 일부 JFrog Enterprise 및 고객만 MyFrog 포털에서 클라우드 로그 스트리밍 기능을 이용할 수 있습니다. JFrog에서는 2024년 2분기에 이 기능을 공식 출시할 계획이며, 공식 출범 이후에는 JFrog Enterprise와 고객 전체가 이 기능을 사용할 수 있습니다.

## 설정

**참고:** 이 통합을 이용하려면 JFrog Enterprise Plus 구독을 신청해야 합니다.

### 설치

1. [Datadog API 키][2]를 생성합니다.
2. [MyJFrog Portal][3]에서 Settings > JFrog Cloud Log Streaming - BETA로 이동한 후 Log Streamer를 활성화합니다.
3. 벤더에서 Datadog를 선택합니다.
4. 내 Datadog API 키를 추가하고, 드롭다운 메뉴에서 [Datadog 사이트][4]의 Datadog 수신 URL을 입력한 후, 필요할 경우 `ddtags`를 추가합니다. Save를 클릭합니다.

로그가 24시간 이내에 Datadog로 스트리밍됩니다.

## 지원

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://jfrog.com/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://my.jfrog.com
[4]: https://docs.datadoghq.com/ko/getting_started/site/
[5]: https://support.jfrog.com/