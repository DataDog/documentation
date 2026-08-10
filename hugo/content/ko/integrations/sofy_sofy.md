---
app_id: sofy
app_uuid: eea6fdbc-2f8d-4483-bbd3-767818b1c25a
assets:
  dashboards:
    Sofy Overview: assets/dashboards/sofy_sofy_overview.json
  integration:
    auto_install: true
    metrics:
      check: sofy.step.cpu_utilization
      metadata_path: metadata.csv
      prefix: sofy.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10353
    source_type_name: Sofy
  oauth: assets/oauth_clients.json
author:
  homepage: https://sofy.ai
  name: Sofy
  sales_email: devops@sofy.ai
  support_email: devops@sofy.ai
  vendor_id: sofy
categories:
- 테스팅
- mobile
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/sofy_sofy/README.md
display_on_public_website: true
draft: false
git_integration_title: sofy_sofy
integration_id: sofy
integration_title: Sofy
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: sofy_sofy
pricing: []
public_title: Sofy
short_description: 자동화된 테스트 사례 실행 중 장치 메트릭을 모니터링하세요
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Testing
  - Category::Mobile
  - Offering::Integration
  - 제출한 데이터 유형::메트릭
  configuration: README.md#Setup
  description: 자동화된 테스트 사례 실행 중 장치 메트릭을 모니터링하세요
  media:
  - caption: Datadog과 Sofy 연결
    image_url: images/datadog_connect.png
    media_type: image
  - caption: 애플리케이션을 활성화하여 메트릭 전송
    image_url: images/datadog_monitoring.png
    media_type: image
  - caption: Sofy 장치 메트릭
    image_url: images/datadog_metrics.png
    media_type: image
  - caption: 코드 없는 자동화 테스트 케이스 테스트 실행
    image_url: images/datadog_testperform.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/sofy-mobile-tests/
  - resource_type: 설명서
    url: https://docs.sofy.ai
  support: README.md#Support
  title: Sofy
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Sofy는 모바일 앱에서 자동화된 테스트를 생성하기 위한 코드가 없는 플랫폼입니다. 사용자는 CI/CD 파이프라인과 통합하여 실제 장치에서 테스트를 실행하고 성능 메트릭과 함께 기능 테스트 결과를 볼 수 있습니다.

이 통합은 로드 시간, 네트워크, 메모리 활용도 및 CPU와 같은 주요 메트릭과 트렌드를 시각화하여 테스트 프로세스에 대한 인사이트를 제공합니다. 즉시 사용 가능한 대시보드는 Sofy 테스트 결과에 대한 실시간 가시성을 제공하므로 시간 경과에 따른 성능을 모니터링 및 분석하고 데이터 기반 결정을 내려 전반적인 소프트웨어 품질을 향상시킬 수 있습니다.

## 수집한 데이터
### 메트릭

이 검사에서 제공되는 메트릭의 전체 목록은 [metadata.csv][1]를 참조하세요.


## 설정
 Sofy 통합 설정 방법:

1. [Datadog 통합 페이지][2]로 이동하여 Sofy 타일을 클릭합니다.

2. **Configuration** 탭으로 이동하여 하단의 **Configuration**를 클릭합니다.

3. **Connect Accounts**를 클릭하여 Sofy의 Account Settings에서 [Integration 탭][3]으로 이동합니다.

4. [Sofy][4]에 로그인한 후 Datadog 타일의 ***Connect** 버튼을 클릭하여 통합 프로세스를 시작합니다.

5. Sofy는 Datadog과의 통합을 승인하기 위해 일련의 OAuth 단계를 따르라는 메시지를 표시합니다. 다음 단계를 주의 깊게 수행하여 Sofy가 Datadog에 데이터를 보낼 수 있도록 필요한 권한을 부여합니다.

6. 통합이 완료되면 왼쪽 메뉴에서 App Manager 페이지를 선택하여 이동합니다. 거기에서 페이지 오른쪽에 있는 모니터링 탭을 클릭합니다. 적절한 스위치를 전환하여 선택한 앱에 대해 Datadog 모니터링을 활성화합니다.

7. 이제 Sofy는 선택한 앱에서 실행할 때마다 Datadog에 데이터를 보내기 시작하므로 결과를 실시간으로 모니터링하고 분석할 수 있습니다.


## 삭제
* Datadog의 [API Keys management 페이지][5]에서 Sofy를 검색하여 이 통합과 관련된 모든 API 키가 비활성화되었는지 확인하세요.

## 지원
도움이 필요하신가요? [Sofy 지원팀][6]에 문의하세요.

## 참고 자료
기타 유용한 문서, 링크 및 기사:
* [Datadog Marketplace에서 Sofy 제품으로 모바일 테스트를 모니터링하세요][7]
* [Sofy 설명서][8]


[1]: https://github.com/DataDog/integrations-extras/blob/master/sofy_sofy/metadata.csv
[2]: https://app.datadoghq.com/integrations
[3]: https://portal.sofy.ai/app/user-settings?selectedTab=integration
[4]: https://portal.sofy.ai
[5]: https://app.datadoghq.com/organization-settings/api-keys?filter=Sofy
[6]: https://support.sofy.ai/support/tickets/new
[7]: https://www.datadoghq.com/blog/sofy-mobile-tests/
[8]: https://docs.sofy.ai