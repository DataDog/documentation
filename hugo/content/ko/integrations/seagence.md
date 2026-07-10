---
app_id: seagence
app_uuid: 94f4e504-c98c-466f-b934-5e5ee0331944
assets:
  dashboards:
    seagence_overview: assets/dashboards/seagence_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10360
    source_type_name: Seagence
  monitors:
    Seagence detected a defect: assets/monitors/defect_detection_monitor.json
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.seagence.com/
  name: Seagence Technologies
  sales_email: sales@seagence.com
  support_email: support@seagence.com
categories:
- 경고
- 자동화
- 이벤트 관리
- 개발 툴
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/seagence/README.md
display_on_public_website: true
draft: false
git_integration_title: seagence
integration_id: seagence
integration_title: Seagence
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: seagence
public_title: Seagence
short_description: 디버깅 없이 실시간으로 결함을 감지하고 해결하는 도구.
supported_os:
- 모두
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Any
  - Submitted Data Type::Events
  - Category::Alerting
  - Category::Automation
  - '카테고리:: 이벤트 관리'
  - Category::Developer Tools
  - 제공::통합
  configuration: README.md#Setup
  description: 디버깅 없이 실시간으로 결함을 감지하고 해결하는 도구.
  media:
  - caption: Seagence Defects Overview 대시보드
    image_url: images/datadog-dashboard.png
    media_type: image
  - caption: Seagence Defect Detection 모니터
    image_url: images/seagence-datadog-monitor.png
    media_type: image
  - caption: Success 및 Defect 실행 경로
    image_url: images/defect-and-successexecution-paths-1440x810.png
    media_type: image
  - caption: Defect 및 Success 클러스터
    image_url: images/defect-and-success-clusters.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/seagence-datadog-marketplace/
  support: README.md#Support
  title: Seagence
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

[Seagence][1]는 Java 애플리케이션용 프로덕션급 실시간 결함 감지 및 해결 도구입니다. ExecutionPath 기술을 활용하여, 멀티스레딩 문제, 처리되거나 무시된 예외, 처리되지 않은 예외 등 다양한 원인으로 발생하는 알려진 결함과 알려지지 않은 결함을 감지하며, 200 성공 HTTP 응답 코드 속에 숨겨진 결함도 감지할 수 있습니다.

이 통합을 통해 Seagence 백엔드는 Seagence 에이전트의 데이터 스트림을 지속적으로 분석하여 결함을 감지하고 근본 원인을 분석합니다. 결함이 감지되면 통합을 통해 Datadog에 이벤트가 전송되어 팀에 알림을 보냅니다. 즉시 사용 가능한 대시보드를 사용하면 감지된 결함과 근본 원인을 파악하여 디버깅 및 문제 해결에 소요되는 시간을 줄일 수 있습니다. 결함에 대한 자세한 내용은 [SeagenceWeb][2]에서 확인하세요.

## 설정

### 설치

[Seagence][1]에 무료로 가입하세요. 가입 후 [Datadog Integration 페이지][3]에서 Seagence 타일로 이동하여 **Install Integration**를 클릭합니다. 타일에서 **Connect Accounts**를 클릭하면 Datadog OAuth2 절차에 따라 Seagence가 Datadog 계정에 Events를 게시하도록 권한을 부여할 수 있습니다.

계정을 연결한 후 타일의 "Assets" 탭으로 이동한 다음 **Recommended Monitors** > **Seagence Defect Detection Monitor**를 클릭합니다. 그러면 기본 모니터를 생성하는 페이지로 이동합니다. 페이지 하단의 **Create**를 클릭하여 Seagence 모니터를 설치합니다.

### 구성

`-javaagent` 옵션을 사용하여 Seagence의 Java 에이전트를 애플리케이션에 연결합니다. Seagence 계정에서 Java 에이전트를 다운로드할 수 있습니다. 자세한 내용은 [Seagence][1]에 있는 [시작 가이드][4]를 참고하세요.

## 삭제

Seagence에서 Datadog 통합을 제거하는 방법:
1. **Uninstall Integration**을 클릭하여 Datadog에서 통합을 제거하세요. 통합을 제거하면 이전 권한이 모두 취소됩니다.
2. [API Keys Management 페이지][5]에서 통합 이름을 검색하여 통합과 관련된 모든 API 키가 비활성화되었는지 확인하세요.
3. **Monitors** > **Manage Monitors**로 이동하여 연결된 모니터를 삭제합니다. **Seagence Defect Detection Monitor** 위에 마우스를 올리고 **Delete**를 클릭하세요.
4. 애플리케이션의 Java 런타임 파라미터에서 `-javaagent` 옵션을 제거합니다.


## 수집한 데이터

### 메트릭

Seagence는 메트릭을 포함하지 않습니다.

### 서비스 점검

Seagence는 서비스 점검을 포함하지 않습니다.

### 이벤트

Seagence는 결함을 감지하면 Datadog에 이벤트를 게시합니다.

## 지원

도움이 필요하신가요? [Seagence 지원팀][6]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Seagence 및 Datadog을 사용하여 Java 코드 수준 문제 감지][7]

[1]: https://www.seagence.com
[2]: https://app.seagence.com/SeagenceWeb/
[3]: https://app.datadoghq.com/integrations/seagence
[4]: https://seagence.com/product/getting-started/
[5]: https://app.datadoghq.com/organization-settings/api-keys?filter=Seagence
[6]: mailto:support@seagence.com
[7]: https://www.datadoghq.com/blog/seagence-datadog-marketplace/